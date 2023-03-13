// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Retail API Client for Deno
 * ==========================
 * 
 * Cloud Retail service enables customers to build end-to-end personalized recommendation systems without requiring a high level of expertise in machine learning, recommendation system, or Google Cloud.
 * 
 * Docs: https://cloud.google.com/recommendations
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Cloud Retail service enables customers to build end-to-end personalized
 * recommendation systems without requiring a high level of expertise in machine
 * learning, recommendation system, or Google Cloud.
 */
export class Retail {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://retail.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Adds the specified CatalogAttribute to the AttributesConfig. If the
   * CatalogAttribute to add already exists, an ALREADY_EXISTS error is
   * returned.
   *
   * @param attributesConfig Required. Full AttributesConfig resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/attributesConfig`
   */
  async projectsLocationsCatalogsAttributesConfigAddCatalogAttribute(attributesConfig: string, req: GoogleCloudRetailV2AddCatalogAttributeRequest): Promise<GoogleCloudRetailV2AttributesConfig> {
    const url = new URL(`${this.#baseUrl}v2/${ attributesConfig }:addCatalogAttribute`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudRetailV2AttributesConfig;
  }

  /**
   * Removes the specified CatalogAttribute from the AttributesConfig. If the
   * CatalogAttribute to remove does not exist, a NOT_FOUND error is returned.
   *
   * @param attributesConfig Required. Full AttributesConfig resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/attributesConfig`
   */
  async projectsLocationsCatalogsAttributesConfigRemoveCatalogAttribute(attributesConfig: string, req: GoogleCloudRetailV2RemoveCatalogAttributeRequest): Promise<GoogleCloudRetailV2AttributesConfig> {
    const url = new URL(`${this.#baseUrl}v2/${ attributesConfig }:removeCatalogAttribute`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudRetailV2AttributesConfig;
  }

  /**
   * Replaces the specified CatalogAttribute in the AttributesConfig by
   * updating the catalog attribute with the same CatalogAttribute.key. If the
   * CatalogAttribute to replace does not exist, a NOT_FOUND error is returned.
   *
   * @param attributesConfig Required. Full AttributesConfig resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/attributesConfig`
   */
  async projectsLocationsCatalogsAttributesConfigReplaceCatalogAttribute(attributesConfig: string, req: GoogleCloudRetailV2ReplaceCatalogAttributeRequest): Promise<GoogleCloudRetailV2AttributesConfig> {
    req = serializeGoogleCloudRetailV2ReplaceCatalogAttributeRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ attributesConfig }:replaceCatalogAttribute`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudRetailV2AttributesConfig;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsCatalogsBranchesOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * It is recommended to use the ProductService.AddLocalInventories method
   * instead of ProductService.AddFulfillmentPlaces.
   * ProductService.AddLocalInventories achieves the same results but provides
   * more fine-grained control over ingesting local inventory data.
   * Incrementally adds place IDs to Product.fulfillment_info.place_ids. This
   * process is asynchronous and does not require the Product to exist before
   * updating fulfillment information. If the request is valid, the update will
   * be enqueued and processed downstream. As a consequence, when a response is
   * returned, the added place IDs are not immediately manifested in the Product
   * queried by ProductService.GetProduct or ProductService.ListProducts. The
   * returned Operations will be obsolete after 1 day, and GetOperation API will
   * return NOT_FOUND afterwards. If conflicting updates are issued, the
   * Operations associated with the stale updates will not be marked as done
   * until being obsolete.
   *
   * @param product Required. Full resource name of Product, such as `projects/*\/locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`. If the caller does not have permission to access the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned.
   */
  async projectsLocationsCatalogsBranchesProductsAddFulfillmentPlaces(product: string, req: GoogleCloudRetailV2AddFulfillmentPlacesRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudRetailV2AddFulfillmentPlacesRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ product }:addFulfillmentPlaces`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Updates local inventory information for a Product at a list of places,
   * while respecting the last update timestamps of each inventory field. This
   * process is asynchronous and does not require the Product to exist before
   * updating inventory information. If the request is valid, the update will be
   * enqueued and processed downstream. As a consequence, when a response is
   * returned, updates are not immediately manifested in the Product queried by
   * ProductService.GetProduct or ProductService.ListProducts. Local inventory
   * information can only be modified using this method.
   * ProductService.CreateProduct and ProductService.UpdateProduct has no effect
   * on local inventories. The returned Operations will be obsolete after 1 day,
   * and GetOperation API will return NOT_FOUND afterwards. If conflicting
   * updates are issued, the Operations associated with the stale updates will
   * not be marked as done until being obsolete.
   *
   * @param product Required. Full resource name of Product, such as `projects/*\/locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`. If the caller does not have permission to access the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned.
   */
  async projectsLocationsCatalogsBranchesProductsAddLocalInventories(product: string, req: GoogleCloudRetailV2AddLocalInventoriesRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudRetailV2AddLocalInventoriesRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ product }:addLocalInventories`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Creates a Product.
   *
   * @param parent Required. The parent catalog resource name, such as `projects/*\/locations/global/catalogs/default_catalog/branches/default_branch`.
   */
  async projectsLocationsCatalogsBranchesProductsCreate(parent: string, req: GoogleCloudRetailV2Product, opts: ProjectsLocationsCatalogsBranchesProductsCreateOptions = {}): Promise<GoogleCloudRetailV2Product> {
    req = serializeGoogleCloudRetailV2Product(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/products`);
    if (opts.productId !== undefined) {
      url.searchParams.append("productId", String(opts.productId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRetailV2Product(data);
  }

  /**
   * Deletes a Product.
   *
   * @param name Required. Full resource name of Product, such as `projects/*\/locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`. If the caller does not have permission to delete the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. If the Product to delete does not exist, a NOT_FOUND error is returned. The Product to delete can neither be a Product.Type.COLLECTION Product member nor a Product.Type.PRIMARY Product with more than one variants. Otherwise, an INVALID_ARGUMENT error is returned. All inventory information for the named Product will be deleted.
   */
  async projectsLocationsCatalogsBranchesProductsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a Product.
   *
   * @param name Required. Full resource name of Product, such as `projects/*\/locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`. If the caller does not have permission to access the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. If the requested Product does not exist, a NOT_FOUND error is returned.
   */
  async projectsLocationsCatalogsBranchesProductsGet(name: string): Promise<GoogleCloudRetailV2Product> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRetailV2Product(data);
  }

  /**
   * Bulk import of multiple Products. Request processing may be synchronous.
   * Non-existing items are created. Note that it is possible for a subset of
   * the Products to be successfully updated.
   *
   * @param parent Required. `projects/1234/locations/global/catalogs/default_catalog/branches/default_branch` If no updateMask is specified, requires products.create permission. If updateMask is specified, requires products.update permission.
   */
  async projectsLocationsCatalogsBranchesProductsImport(parent: string, req: GoogleCloudRetailV2ImportProductsRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudRetailV2ImportProductsRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/products:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets a list of Products.
   *
   * @param parent Required. The parent branch resource name, such as `projects/*\/locations/global/catalogs/default_catalog/branches/0`. Use `default_branch` as the branch ID, to list products under the default branch. If the caller does not have permission to list Products under this branch, regardless of whether or not this branch exists, a PERMISSION_DENIED error is returned.
   */
  async projectsLocationsCatalogsBranchesProductsList(parent: string, opts: ProjectsLocationsCatalogsBranchesProductsListOptions = {}): Promise<GoogleCloudRetailV2ListProductsResponse> {
    opts = serializeProjectsLocationsCatalogsBranchesProductsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/products`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    return deserializeGoogleCloudRetailV2ListProductsResponse(data);
  }

  /**
   * Updates a Product.
   *
   * @param name Immutable. Full resource name of the product, such as `projects/*\/locations/global/catalogs/default_catalog/branches/default_branch/products/product_id`.
   */
  async projectsLocationsCatalogsBranchesProductsPatch(name: string, req: GoogleCloudRetailV2Product, opts: ProjectsLocationsCatalogsBranchesProductsPatchOptions = {}): Promise<GoogleCloudRetailV2Product> {
    req = serializeGoogleCloudRetailV2Product(req);
    opts = serializeProjectsLocationsCatalogsBranchesProductsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
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
    return deserializeGoogleCloudRetailV2Product(data);
  }

  /**
   * It is recommended to use the ProductService.RemoveLocalInventories method
   * instead of ProductService.RemoveFulfillmentPlaces.
   * ProductService.RemoveLocalInventories achieves the same results but
   * provides more fine-grained control over ingesting local inventory data.
   * Incrementally removes place IDs from a Product.fulfillment_info.place_ids.
   * This process is asynchronous and does not require the Product to exist
   * before updating fulfillment information. If the request is valid, the
   * update will be enqueued and processed downstream. As a consequence, when a
   * response is returned, the removed place IDs are not immediately manifested
   * in the Product queried by ProductService.GetProduct or
   * ProductService.ListProducts. The returned Operations will be obsolete after
   * 1 day, and GetOperation API will return NOT_FOUND afterwards. If
   * conflicting updates are issued, the Operations associated with the stale
   * updates will not be marked as done until being obsolete.
   *
   * @param product Required. Full resource name of Product, such as `projects/*\/locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`. If the caller does not have permission to access the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned.
   */
  async projectsLocationsCatalogsBranchesProductsRemoveFulfillmentPlaces(product: string, req: GoogleCloudRetailV2RemoveFulfillmentPlacesRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudRetailV2RemoveFulfillmentPlacesRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ product }:removeFulfillmentPlaces`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Remove local inventory information for a Product at a list of places at a
   * removal timestamp. This process is asynchronous. If the request is valid,
   * the removal will be enqueued and processed downstream. As a consequence,
   * when a response is returned, removals are not immediately manifested in the
   * Product queried by ProductService.GetProduct or
   * ProductService.ListProducts. Local inventory information can only be
   * removed using this method. ProductService.CreateProduct and
   * ProductService.UpdateProduct has no effect on local inventories. The
   * returned Operations will be obsolete after 1 day, and GetOperation API will
   * return NOT_FOUND afterwards. If conflicting updates are issued, the
   * Operations associated with the stale updates will not be marked as done
   * until being obsolete.
   *
   * @param product Required. Full resource name of Product, such as `projects/*\/locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`. If the caller does not have permission to access the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned.
   */
  async projectsLocationsCatalogsBranchesProductsRemoveLocalInventories(product: string, req: GoogleCloudRetailV2RemoveLocalInventoriesRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudRetailV2RemoveLocalInventoriesRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ product }:removeLocalInventories`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Updates inventory information for a Product while respecting the last
   * update timestamps of each inventory field. This process is asynchronous and
   * does not require the Product to exist before updating fulfillment
   * information. If the request is valid, the update is enqueued and processed
   * downstream. As a consequence, when a response is returned, updates are not
   * immediately manifested in the Product queried by ProductService.GetProduct
   * or ProductService.ListProducts. When inventory is updated with
   * ProductService.CreateProduct and ProductService.UpdateProduct, the
   * specified inventory field value(s) overwrite any existing value(s) while
   * ignoring the last update time for this field. Furthermore, the last update
   * times for the specified inventory fields are overwritten by the times of
   * the ProductService.CreateProduct or ProductService.UpdateProduct request.
   * If no inventory fields are set in CreateProductRequest.product, then any
   * pre-existing inventory information for this product is used. If no
   * inventory fields are set in SetInventoryRequest.set_mask, then any existing
   * inventory information is preserved. Pre-existing inventory information can
   * only be updated with ProductService.SetInventory,
   * ProductService.AddFulfillmentPlaces, and
   * ProductService.RemoveFulfillmentPlaces. The returned Operations is obsolete
   * after one day, and the GetOperation API returns `NOT_FOUND` afterwards. If
   * conflicting updates are issued, the Operations associated with the stale
   * updates are not marked as done until they are obsolete.
   *
   * @param name Immutable. Full resource name of the product, such as `projects/*\/locations/global/catalogs/default_catalog/branches/default_branch/products/product_id`.
   */
  async projectsLocationsCatalogsBranchesProductsSetInventory(name: string, req: GoogleCloudRetailV2SetInventoryRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudRetailV2SetInventoryRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }:setInventory`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Completes the specified prefix with keyword suggestions. This feature is
   * only available for users who have Retail Search enabled. Enable Retail
   * Search on Cloud Console before using this feature.
   *
   * @param catalog Required. Catalog for which the completion is performed. Full resource name of catalog, such as `projects/*\/locations/global/catalogs/default_catalog`.
   */
  async projectsLocationsCatalogsCompleteQuery(catalog: string, opts: ProjectsLocationsCatalogsCompleteQueryOptions = {}): Promise<GoogleCloudRetailV2CompleteQueryResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ catalog }:completeQuery`);
    if (opts.dataset !== undefined) {
      url.searchParams.append("dataset", String(opts.dataset));
    }
    if (opts.deviceType !== undefined) {
      url.searchParams.append("deviceType", String(opts.deviceType));
    }
    if (opts.languageCodes !== undefined) {
      url.searchParams.append("languageCodes", String(opts.languageCodes));
    }
    if (opts.maxSuggestions !== undefined) {
      url.searchParams.append("maxSuggestions", String(opts.maxSuggestions));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    if (opts.visitorId !== undefined) {
      url.searchParams.append("visitorId", String(opts.visitorId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudRetailV2CompleteQueryResponse;
  }

  /**
   * Bulk import of processed completion dataset. Request processing is
   * asynchronous. Partial updating is not supported. The operation is
   * successfully finished only after the imported suggestions are indexed
   * successfully and ready for serving. The process takes hours. This feature
   * is only available for users who have Retail Search enabled. Enable Retail
   * Search on Cloud Console before using this feature.
   *
   * @param parent Required. The catalog which the suggestions dataset belongs to. Format: `projects/1234/locations/global/catalogs/default_catalog`.
   */
  async projectsLocationsCatalogsCompletionDataImport(parent: string, req: GoogleCloudRetailV2ImportCompletionDataRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/completionData:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Creates a Control. If the Control to create already exists, an
   * ALREADY_EXISTS error is returned.
   *
   * @param parent Required. Full resource name of parent catalog. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}`
   */
  async projectsLocationsCatalogsControlsCreate(parent: string, req: GoogleCloudRetailV2Control, opts: ProjectsLocationsCatalogsControlsCreateOptions = {}): Promise<GoogleCloudRetailV2Control> {
    req = serializeGoogleCloudRetailV2Control(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/controls`);
    if (opts.controlId !== undefined) {
      url.searchParams.append("controlId", String(opts.controlId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRetailV2Control(data);
  }

  /**
   * Deletes a Control. If the Control to delete does not exist, a NOT_FOUND
   * error is returned.
   *
   * @param name Required. The resource name of the Control to delete. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/controls/{control_id}`
   */
  async projectsLocationsCatalogsControlsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a Control.
   *
   * @param name Required. The resource name of the Control to get. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/controls/{control_id}`
   */
  async projectsLocationsCatalogsControlsGet(name: string): Promise<GoogleCloudRetailV2Control> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRetailV2Control(data);
  }

  /**
   * Lists all Controls by their parent Catalog.
   *
   * @param parent Required. The catalog resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}`
   */
  async projectsLocationsCatalogsControlsList(parent: string, opts: ProjectsLocationsCatalogsControlsListOptions = {}): Promise<GoogleCloudRetailV2ListControlsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/controls`);
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
    return deserializeGoogleCloudRetailV2ListControlsResponse(data);
  }

  /**
   * Updates a Control. Control cannot be set to a different oneof field, if so
   * an INVALID_ARGUMENT is returned. If the Control to update does not exist, a
   * NOT_FOUND error is returned.
   *
   * @param name Immutable. Fully qualified name `projects/*\/locations/global/catalogs/*\/controls/*`
   */
  async projectsLocationsCatalogsControlsPatch(name: string, req: GoogleCloudRetailV2Control, opts: ProjectsLocationsCatalogsControlsPatchOptions = {}): Promise<GoogleCloudRetailV2Control> {
    req = serializeGoogleCloudRetailV2Control(req);
    opts = serializeProjectsLocationsCatalogsControlsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoogleCloudRetailV2Control(data);
  }

  /**
   * Gets an AttributesConfig.
   *
   * @param name Required. Full AttributesConfig resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/attributesConfig`
   */
  async projectsLocationsCatalogsGetAttributesConfig(name: string): Promise<GoogleCloudRetailV2AttributesConfig> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudRetailV2AttributesConfig;
  }

  /**
   * Gets a CompletionConfig.
   *
   * @param name Required. Full CompletionConfig resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/completionConfig`
   */
  async projectsLocationsCatalogsGetCompletionConfig(name: string): Promise<GoogleCloudRetailV2CompletionConfig> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudRetailV2CompletionConfig;
  }

  /**
   * Get which branch is currently default branch set by
   * CatalogService.SetDefaultBranch method under a specified parent catalog.
   *
   * @param catalog The parent catalog resource name, such as `projects/*\/locations/global/catalogs/default_catalog`.
   */
  async projectsLocationsCatalogsGetDefaultBranch(catalog: string): Promise<GoogleCloudRetailV2GetDefaultBranchResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ catalog }:getDefaultBranch`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRetailV2GetDefaultBranchResponse(data);
  }

  /**
   * Lists all the Catalogs associated with the project.
   *
   * @param parent Required. The account resource name with an associated location. If the caller does not have permission to list Catalogs under this location, regardless of whether or not this location exists, a PERMISSION_DENIED error is returned.
   */
  async projectsLocationsCatalogsList(parent: string, opts: ProjectsLocationsCatalogsListOptions = {}): Promise<GoogleCloudRetailV2ListCatalogsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/catalogs`);
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
    return data as GoogleCloudRetailV2ListCatalogsResponse;
  }

  /**
   * Creates a new model.
   *
   * @param parent Required. The parent resource under which to create the model. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}`
   */
  async projectsLocationsCatalogsModelsCreate(parent: string, req: GoogleCloudRetailV2Model, opts: ProjectsLocationsCatalogsModelsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/models`);
    if (opts.dryRun !== undefined) {
      url.searchParams.append("dryRun", String(opts.dryRun));
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
   * Deletes an existing model.
   *
   * @param name Required. The resource name of the Model to delete. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}`
   */
  async projectsLocationsCatalogsModelsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a model.
   *
   * @param name Required. The resource name of the Model to get. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog}/models/{model_id}`
   */
  async projectsLocationsCatalogsModelsGet(name: string): Promise<GoogleCloudRetailV2Model> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudRetailV2Model;
  }

  /**
   * Lists all the models linked to this event store.
   *
   * @param parent Required. The parent for which to list models. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}`
   */
  async projectsLocationsCatalogsModelsList(parent: string, opts: ProjectsLocationsCatalogsModelsListOptions = {}): Promise<GoogleCloudRetailV2ListModelsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/models`);
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
    return data as GoogleCloudRetailV2ListModelsResponse;
  }

  /**
   * Update of model metadata. Only fields that currently can be updated are:
   * `filtering_option` and `periodic_tuning_state`. If other values are
   * provided, this API method ignores them.
   *
   * @param name Required. The fully qualified resource name of the model. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` catalog_id has char limit of 50. recommendation_model_id has char limit of 40.
   */
  async projectsLocationsCatalogsModelsPatch(name: string, req: GoogleCloudRetailV2Model, opts: ProjectsLocationsCatalogsModelsPatchOptions = {}): Promise<GoogleCloudRetailV2Model> {
    opts = serializeProjectsLocationsCatalogsModelsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudRetailV2Model;
  }

  /**
   * Pauses the training of an existing model.
   *
   * @param name Required. The name of the model to pause. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}`
   */
  async projectsLocationsCatalogsModelsPause(name: string, req: GoogleCloudRetailV2PauseModelRequest): Promise<GoogleCloudRetailV2Model> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:pause`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudRetailV2Model;
  }

  /**
   * Resumes the training of an existing model.
   *
   * @param name Required. The name of the model to resume. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}`
   */
  async projectsLocationsCatalogsModelsResume(name: string, req: GoogleCloudRetailV2ResumeModelRequest): Promise<GoogleCloudRetailV2Model> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:resume`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudRetailV2Model;
  }

  /**
   * Tunes an existing model.
   *
   * @param name Required. The resource name of the model to tune. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}`
   */
  async projectsLocationsCatalogsModelsTune(name: string, req: GoogleCloudRetailV2TuneModelRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:tune`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsCatalogsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
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
  async projectsLocationsCatalogsOperationsList(name: string, opts: ProjectsLocationsCatalogsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/operations`);
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
   * Updates the Catalogs.
   *
   * @param name Required. Immutable. The fully qualified resource name of the catalog.
   */
  async projectsLocationsCatalogsPatch(name: string, req: GoogleCloudRetailV2Catalog, opts: ProjectsLocationsCatalogsPatchOptions = {}): Promise<GoogleCloudRetailV2Catalog> {
    opts = serializeProjectsLocationsCatalogsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudRetailV2Catalog;
  }

  /**
   * Makes a recommendation prediction.
   *
   * @param placement Required. Full resource name of the format: `{placement=projects/*\/locations/global/catalogs/default_catalog/servingConfigs/*}` or `{placement=projects/*\/locations/global/catalogs/default_catalog/placements/*}`. We recommend using the `servingConfigs` resource. `placements` is a legacy resource. The ID of the Recommendations AI serving config or placement. Before you can request predictions from your model, you must create at least one serving config or placement for it. For more information, see [Manage serving configs] (https://cloud.google.com/retail/docs/manage-configs). The full list of available serving configs can be seen at https://console.cloud.google.com/ai/retail/catalogs/default_catalog/configs
   */
  async projectsLocationsCatalogsPlacementsPredict(placement: string, req: GoogleCloudRetailV2PredictRequest): Promise<GoogleCloudRetailV2PredictResponse> {
    req = serializeGoogleCloudRetailV2PredictRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ placement }:predict`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudRetailV2PredictResponse;
  }

  /**
   * Performs a search. This feature is only available for users who have
   * Retail Search enabled. Enable Retail Search on Cloud Console before using
   * this feature.
   *
   * @param placement Required. The resource name of the Retail Search serving config, such as `projects/*\/locations/global/catalogs/default_catalog/servingConfigs/default_serving_config` or the name of the legacy placement resource, such as `projects/*\/locations/global/catalogs/default_catalog/placements/default_search`. This field is used to identify the serving config name and the set of models that will be used to make the search.
   */
  async projectsLocationsCatalogsPlacementsSearch(placement: string, req: GoogleCloudRetailV2SearchRequest): Promise<GoogleCloudRetailV2SearchResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ placement }:search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRetailV2SearchResponse(data);
  }

  /**
   * Enables a Control on the specified ServingConfig. The control is added in
   * the last position of the list of controls it belongs to (e.g. if it's a
   * facet spec control it will be applied in the last position of
   * servingConfig.facetSpecIds) Returns a ALREADY_EXISTS error if the control
   * has already been applied. Returns a FAILED_PRECONDITION error if the
   * addition could exceed maximum number of control allowed for that type of
   * control.
   *
   * @param servingConfig Required. The source ServingConfig resource name . Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/servingConfigs/{serving_config_id}`
   */
  async projectsLocationsCatalogsServingConfigsAddControl(servingConfig: string, req: GoogleCloudRetailV2AddControlRequest): Promise<GoogleCloudRetailV2ServingConfig> {
    const url = new URL(`${this.#baseUrl}v2/${ servingConfig }:addControl`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudRetailV2ServingConfig;
  }

  /**
   * Creates a ServingConfig. A maximum of 100 ServingConfigs are allowed in a
   * Catalog, otherwise a FAILED_PRECONDITION error is returned.
   *
   * @param parent Required. Full resource name of parent. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}`
   */
  async projectsLocationsCatalogsServingConfigsCreate(parent: string, req: GoogleCloudRetailV2ServingConfig, opts: ProjectsLocationsCatalogsServingConfigsCreateOptions = {}): Promise<GoogleCloudRetailV2ServingConfig> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/servingConfigs`);
    if (opts.servingConfigId !== undefined) {
      url.searchParams.append("servingConfigId", String(opts.servingConfigId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudRetailV2ServingConfig;
  }

  /**
   * Deletes a ServingConfig. Returns a NotFound error if the ServingConfig
   * does not exist.
   *
   * @param name Required. The resource name of the ServingConfig to delete. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/servingConfigs/{serving_config_id}`
   */
  async projectsLocationsCatalogsServingConfigsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a ServingConfig. Returns a NotFound error if the ServingConfig does
   * not exist.
   *
   * @param name Required. The resource name of the ServingConfig to get. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/servingConfigs/{serving_config_id}`
   */
  async projectsLocationsCatalogsServingConfigsGet(name: string): Promise<GoogleCloudRetailV2ServingConfig> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudRetailV2ServingConfig;
  }

  /**
   * Lists all ServingConfigs linked to this catalog.
   *
   * @param parent Required. The catalog resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}`
   */
  async projectsLocationsCatalogsServingConfigsList(parent: string, opts: ProjectsLocationsCatalogsServingConfigsListOptions = {}): Promise<GoogleCloudRetailV2ListServingConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/servingConfigs`);
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
    return data as GoogleCloudRetailV2ListServingConfigsResponse;
  }

  /**
   * Updates a ServingConfig.
   *
   * @param name Immutable. Fully qualified name `projects/*\/locations/global/catalogs/*\/servingConfig/*`
   */
  async projectsLocationsCatalogsServingConfigsPatch(name: string, req: GoogleCloudRetailV2ServingConfig, opts: ProjectsLocationsCatalogsServingConfigsPatchOptions = {}): Promise<GoogleCloudRetailV2ServingConfig> {
    opts = serializeProjectsLocationsCatalogsServingConfigsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudRetailV2ServingConfig;
  }

  /**
   * Makes a recommendation prediction.
   *
   * @param placement Required. Full resource name of the format: `{placement=projects/*\/locations/global/catalogs/default_catalog/servingConfigs/*}` or `{placement=projects/*\/locations/global/catalogs/default_catalog/placements/*}`. We recommend using the `servingConfigs` resource. `placements` is a legacy resource. The ID of the Recommendations AI serving config or placement. Before you can request predictions from your model, you must create at least one serving config or placement for it. For more information, see [Manage serving configs] (https://cloud.google.com/retail/docs/manage-configs). The full list of available serving configs can be seen at https://console.cloud.google.com/ai/retail/catalogs/default_catalog/configs
   */
  async projectsLocationsCatalogsServingConfigsPredict(placement: string, req: GoogleCloudRetailV2PredictRequest): Promise<GoogleCloudRetailV2PredictResponse> {
    req = serializeGoogleCloudRetailV2PredictRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ placement }:predict`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudRetailV2PredictResponse;
  }

  /**
   * Disables a Control on the specified ServingConfig. The control is removed
   * from the ServingConfig. Returns a NOT_FOUND error if the Control is not
   * enabled for the ServingConfig.
   *
   * @param servingConfig Required. The source ServingConfig resource name . Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/servingConfigs/{serving_config_id}`
   */
  async projectsLocationsCatalogsServingConfigsRemoveControl(servingConfig: string, req: GoogleCloudRetailV2RemoveControlRequest): Promise<GoogleCloudRetailV2ServingConfig> {
    const url = new URL(`${this.#baseUrl}v2/${ servingConfig }:removeControl`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudRetailV2ServingConfig;
  }

  /**
   * Performs a search. This feature is only available for users who have
   * Retail Search enabled. Enable Retail Search on Cloud Console before using
   * this feature.
   *
   * @param placement Required. The resource name of the Retail Search serving config, such as `projects/*\/locations/global/catalogs/default_catalog/servingConfigs/default_serving_config` or the name of the legacy placement resource, such as `projects/*\/locations/global/catalogs/default_catalog/placements/default_search`. This field is used to identify the serving config name and the set of models that will be used to make the search.
   */
  async projectsLocationsCatalogsServingConfigsSearch(placement: string, req: GoogleCloudRetailV2SearchRequest): Promise<GoogleCloudRetailV2SearchResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ placement }:search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRetailV2SearchResponse(data);
  }

  /**
   * Set a specified branch id as default branch. API methods such as
   * SearchService.Search, ProductService.GetProduct,
   * ProductService.ListProducts will treat requests using "default_branch" to
   * the actual branch id set as default. For example, if
   * `projects/*\/locations/*\/catalogs/*\/branches/1` is set as default,
   * setting SearchRequest.branch to
   * `projects/*\/locations/*\/catalogs/*\/branches/default_branch` is
   * equivalent to setting SearchRequest.branch to
   * `projects/*\/locations/*\/catalogs/*\/branches/1`. Using multiple branches
   * can be useful when developers would like to have a staging branch to test
   * and verify for future usage. When it becomes ready, developers switch on
   * the staging branch using this API while keeping using
   * `projects/*\/locations/*\/catalogs/*\/branches/default_branch` as
   * SearchRequest.branch to route the traffic to this staging branch. CAUTION:
   * If you have live predict/search traffic, switching the default branch could
   * potentially cause outages if the ID space of the new branch is very
   * different from the old one. More specifically: * PredictionService will
   * only return product IDs from branch {newBranch}. * SearchService will only
   * return product IDs from branch {newBranch} (if branch is not explicitly
   * set). * UserEventService will only join events with products from branch
   * {newBranch}.
   *
   * @param catalog Full resource name of the catalog, such as `projects/*\/locations/global/catalogs/default_catalog`.
   */
  async projectsLocationsCatalogsSetDefaultBranch(catalog: string, req: GoogleCloudRetailV2SetDefaultBranchRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ catalog }:setDefaultBranch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Updates the AttributesConfig. The catalog attributes in the request will
   * be updated in the catalog, or inserted if they do not exist. Existing
   * catalog attributes not included in the request will remain unchanged.
   * Attributes that are assigned to products, but do not exist at the catalog
   * level, are always included in the response. The product attribute is
   * assigned default values for missing catalog attribute fields, e.g.,
   * searchable and dynamic facetable options.
   *
   * @param name Required. Immutable. The fully qualified resource name of the attribute config. Format: `projects/*\/locations/*\/catalogs/*\/attributesConfig`
   */
  async projectsLocationsCatalogsUpdateAttributesConfig(name: string, req: GoogleCloudRetailV2AttributesConfig, opts: ProjectsLocationsCatalogsUpdateAttributesConfigOptions = {}): Promise<GoogleCloudRetailV2AttributesConfig> {
    opts = serializeProjectsLocationsCatalogsUpdateAttributesConfigOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudRetailV2AttributesConfig;
  }

  /**
   * Updates the CompletionConfigs.
   *
   * @param name Required. Immutable. Fully qualified name `projects/*\/locations/*\/catalogs/*\/completionConfig`
   */
  async projectsLocationsCatalogsUpdateCompletionConfig(name: string, req: GoogleCloudRetailV2CompletionConfig, opts: ProjectsLocationsCatalogsUpdateCompletionConfigOptions = {}): Promise<GoogleCloudRetailV2CompletionConfig> {
    opts = serializeProjectsLocationsCatalogsUpdateCompletionConfigOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudRetailV2CompletionConfig;
  }

  /**
   * Writes a single user event from the browser. This uses a GET request to
   * due to browser restriction of POST-ing to a 3rd party domain. This method
   * is used only by the Retail API JavaScript pixel and Google Tag Manager.
   * Users should not call this method directly.
   *
   * @param parent Required. The parent catalog name, such as `projects/1234/locations/global/catalogs/default_catalog`.
   */
  async projectsLocationsCatalogsUserEventsCollect(parent: string, opts: ProjectsLocationsCatalogsUserEventsCollectOptions = {}): Promise<GoogleApiHttpBody> {
    opts = serializeProjectsLocationsCatalogsUserEventsCollectOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/userEvents:collect`);
    if (opts.ets !== undefined) {
      url.searchParams.append("ets", String(opts.ets));
    }
    if (opts.prebuiltRule !== undefined) {
      url.searchParams.append("prebuiltRule", String(opts.prebuiltRule));
    }
    if (opts.rawJson !== undefined) {
      url.searchParams.append("rawJson", String(opts.rawJson));
    }
    if (opts.uri !== undefined) {
      url.searchParams.append("uri", String(opts.uri));
    }
    if (opts.userEvent !== undefined) {
      url.searchParams.append("userEvent", String(opts.userEvent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleApiHttpBody(data);
  }

  /**
   * Bulk import of User events. Request processing might be synchronous.
   * Events that already exist are skipped. Use this method for backfilling
   * historical user events. `Operation.response` is of type `ImportResponse`.
   * Note that it is possible for a subset of the items to be successfully
   * inserted. `Operation.metadata` is of type `ImportMetadata`.
   *
   * @param parent Required. `projects/1234/locations/global/catalogs/default_catalog`
   */
  async projectsLocationsCatalogsUserEventsImport(parent: string, req: GoogleCloudRetailV2ImportUserEventsRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudRetailV2ImportUserEventsRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/userEvents:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes permanently all user events specified by the filter provided.
   * Depending on the number of events specified by the filter, this operation
   * could take hours or days to complete. To test a filter, use the list
   * command first.
   *
   * @param parent Required. The resource name of the catalog under which the events are created. The format is `projects/${projectId}/locations/global/catalogs/${catalogId}`
   */
  async projectsLocationsCatalogsUserEventsPurge(parent: string, req: GoogleCloudRetailV2PurgeUserEventsRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/userEvents:purge`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Starts a user-event rejoin operation with latest product catalog. Events
   * are not annotated with detailed product information for products that are
   * missing from the catalog when the user event is ingested. These events are
   * stored as unjoined events with limited usage on training and serving. You
   * can use this method to start a join operation on specified events with the
   * latest version of product catalog. You can also use this method to correct
   * events joined with the wrong product catalog. A rejoin operation can take
   * hours or days to complete.
   *
   * @param parent Required. The parent catalog resource name, such as `projects/1234/locations/global/catalogs/default_catalog`.
   */
  async projectsLocationsCatalogsUserEventsRejoin(parent: string, req: GoogleCloudRetailV2RejoinUserEventsRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/userEvents:rejoin`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Writes a single user event.
   *
   * @param parent Required. The parent catalog resource name, such as `projects/1234/locations/global/catalogs/default_catalog`.
   */
  async projectsLocationsCatalogsUserEventsWrite(parent: string, req: GoogleCloudRetailV2UserEvent, opts: ProjectsLocationsCatalogsUserEventsWriteOptions = {}): Promise<GoogleCloudRetailV2UserEvent> {
    req = serializeGoogleCloudRetailV2UserEvent(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/userEvents:write`);
    if (opts.writeAsync !== undefined) {
      url.searchParams.append("writeAsync", String(opts.writeAsync));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRetailV2UserEvent(data);
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
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
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/operations`);
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
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
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
  async projectsOperationsList(name: string, opts: ProjectsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/operations`);
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

/**
 * A description of the context in which an error occurred.
 */
export interface GoogleCloudRetailLoggingErrorContext {
  /**
   * The HTTP request which was processed when the error was triggered.
   */
  httpRequest?: GoogleCloudRetailLoggingHttpRequestContext;
  /**
   * The location in the source code where the decision was made to report the
   * error, usually the place where it was logged.
   */
  reportLocation?: GoogleCloudRetailLoggingSourceLocation;
}

/**
 * An error log which is reported to the Error Reporting system. This proto a
 * superset of google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent.
 */
export interface GoogleCloudRetailLoggingErrorLog {
  /**
   * A description of the context in which the error occurred.
   */
  context?: GoogleCloudRetailLoggingErrorContext;
  /**
   * The error payload that is populated on LRO import APIs.
   */
  importPayload?: GoogleCloudRetailLoggingImportErrorContext;
  /**
   * A message describing the error.
   */
  message?: string;
  /**
   * The API request payload, represented as a protocol buffer. Most API
   * request types are supported. For example:
   * "type.googleapis.com/google.cloud.retail.v2.ProductService.CreateProductRequest"
   * "type.googleapis.com/google.cloud.retail.v2.UserEventService.WriteUserEventRequest"
   */
  requestPayload?: {
    [key: string]: any
  };
  /**
   * The API response payload, represented as a protocol buffer. This is used
   * to log some "soft errors", where the response is valid but we consider
   * there are some quality issues like unjoined events. The following API
   * responses are supported and no PII is included:
   * "google.cloud.retail.v2.PredictionService.Predict"
   * "google.cloud.retail.v2.UserEventService.WriteUserEvent"
   * "google.cloud.retail.v2.UserEventService.CollectUserEvent"
   */
  responsePayload?: {
    [key: string]: any
  };
  /**
   * The service context in which this error has occurred.
   */
  serviceContext?: GoogleCloudRetailLoggingServiceContext;
  /**
   * The RPC status associated with the error log.
   */
  status?: GoogleRpcStatus;
}

/**
 * HTTP request data that is related to a reported error.
 */
export interface GoogleCloudRetailLoggingHttpRequestContext {
  /**
   * The HTTP response status code for the request.
   */
  responseStatusCode?: number;
}

/**
 * The error payload that is populated on LRO import APIs, including
 * "google.cloud.retail.v2.ProductService.ImportProducts" and
 * "google.cloud.retail.v2.EventService.ImportUserEvents".
 */
export interface GoogleCloudRetailLoggingImportErrorContext {
  /**
   * The detailed content which caused the error on importing a catalog item.
   */
  catalogItem?: string;
  /**
   * Cloud Storage file path of the import source. Can be set for batch
   * operation error.
   */
  gcsPath?: string;
  /**
   * Line number of the content in file. Should be empty for permission or
   * batch operation error.
   */
  lineNumber?: string;
  /**
   * The operation resource name of the LRO.
   */
  operationName?: string;
  /**
   * The detailed content which caused the error on importing a product.
   */
  product?: string;
  /**
   * The detailed content which caused the error on importing a user event.
   */
  userEvent?: string;
}

/**
 * Describes a running service that sends errors.
 */
export interface GoogleCloudRetailLoggingServiceContext {
  /**
   * An identifier of the service. For example, "retail.googleapis.com".
   */
  service?: string;
}

/**
 * Indicates a location in the source code of the service for which errors are
 * reported.
 */
export interface GoogleCloudRetailLoggingSourceLocation {
  /**
   * Human-readable name of a function or method. For example,
   * "google.cloud.retail.v2.UserEventService.ImportUserEvents".
   */
  functionName?: string;
}

/**
 * Request for CatalogService.AddCatalogAttribute method.
 */
export interface GoogleCloudRetailV2AddCatalogAttributeRequest {
  /**
   * Required. The CatalogAttribute to add.
   */
  catalogAttribute?: GoogleCloudRetailV2CatalogAttribute;
}

/**
 * Request for AddControl method.
 */
export interface GoogleCloudRetailV2AddControlRequest {
  /**
   * Required. The id of the control to apply. Assumed to be in the same
   * catalog as the serving config - if id is not found a NOT_FOUND error is
   * returned.
   */
  controlId?: string;
}

/**
 * Metadata related to the progress of the AddFulfillmentPlaces operation.
 * Currently empty because there is no meaningful metadata populated from the
 * ProductService.AddFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2AddFulfillmentPlacesMetadata {
}

/**
 * Request message for ProductService.AddFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2AddFulfillmentPlacesRequest {
  /**
   * The time when the fulfillment updates are issued, used to prevent
   * out-of-order updates on fulfillment information. If not provided, the
   * internal system time will be used.
   */
  addTime?: Date;
  /**
   * If set to true, and the Product is not found, the fulfillment information
   * will still be processed and retained for at most 1 day and processed once
   * the Product is created. If set to false, a NOT_FOUND error is returned if
   * the Product is not found.
   */
  allowMissing?: boolean;
  /**
   * Required. The IDs for this type, such as the store IDs for
   * "pickup-in-store" or the region IDs for "same-day-delivery" to be added for
   * this type. Duplicate IDs will be automatically ignored. At least 1 value is
   * required, and a maximum of 2000 values are allowed. Each value must be a
   * string with a length limit of 10 characters, matching the pattern
   * `[a-zA-Z0-9_-]+`, such as "store1" or "REGION-2". Otherwise, an
   * INVALID_ARGUMENT error is returned. If the total number of place IDs
   * exceeds 2000 for this type after adding, then the update will be rejected.
   */
  placeIds?: string[];
  /**
   * Required. The fulfillment type, including commonly used types (such as
   * pickup in store and same day delivery), and custom types. Supported values:
   * * "pickup-in-store" * "ship-to-store" * "same-day-delivery" *
   * "next-day-delivery" * "custom-type-1" * "custom-type-2" * "custom-type-3" *
   * "custom-type-4" * "custom-type-5" If this field is set to an invalid value
   * other than these, an INVALID_ARGUMENT error is returned. This field
   * directly corresponds to Product.fulfillment_info.type.
   */
  type?: string;
}

function serializeGoogleCloudRetailV2AddFulfillmentPlacesRequest(data: any): GoogleCloudRetailV2AddFulfillmentPlacesRequest {
  return {
    ...data,
    addTime: data["addTime"] !== undefined ? data["addTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRetailV2AddFulfillmentPlacesRequest(data: any): GoogleCloudRetailV2AddFulfillmentPlacesRequest {
  return {
    ...data,
    addTime: data["addTime"] !== undefined ? new Date(data["addTime"]) : undefined,
  };
}

/**
 * Response of the AddFulfillmentPlacesRequest. Currently empty because there
 * is no meaningful response populated from the
 * ProductService.AddFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2AddFulfillmentPlacesResponse {
}

/**
 * Metadata related to the progress of the AddLocalInventories operation.
 * Currently empty because there is no meaningful metadata populated from the
 * ProductService.AddLocalInventories method.
 */
export interface GoogleCloudRetailV2AddLocalInventoriesMetadata {
}

/**
 * Request message for ProductService.AddLocalInventories method.
 */
export interface GoogleCloudRetailV2AddLocalInventoriesRequest {
  /**
   * Indicates which inventory fields in the provided list of LocalInventory to
   * update. The field is updated to the provided value. If a field is set while
   * the place does not have a previous local inventory, the local inventory at
   * that store is created. If a field is set while the value of that field is
   * not provided, the original field value, if it exists, is deleted. If the
   * mask is not set or set with empty paths, all inventory fields will be
   * updated. If an unsupported or unknown field is provided, an
   * INVALID_ARGUMENT error is returned and the entire update will be ignored.
   */
  addMask?: string /* FieldMask */;
  /**
   * The time when the inventory updates are issued. Used to prevent
   * out-of-order updates on local inventory fields. If not provided, the
   * internal system time will be used.
   */
  addTime?: Date;
  /**
   * If set to true, and the Product is not found, the local inventory will
   * still be processed and retained for at most 1 day and processed once the
   * Product is created. If set to false, a NOT_FOUND error is returned if the
   * Product is not found.
   */
  allowMissing?: boolean;
  /**
   * Required. A list of inventory information at difference places. Each place
   * is identified by its place ID. At most 3000 inventories are allowed per
   * request.
   */
  localInventories?: GoogleCloudRetailV2LocalInventory[];
}

function serializeGoogleCloudRetailV2AddLocalInventoriesRequest(data: any): GoogleCloudRetailV2AddLocalInventoriesRequest {
  return {
    ...data,
    addMask: data["addMask"] !== undefined ? data["addMask"] : undefined,
    addTime: data["addTime"] !== undefined ? data["addTime"].toISOString() : undefined,
    localInventories: data["localInventories"] !== undefined ? data["localInventories"].map((item: any) => (serializeGoogleCloudRetailV2LocalInventory(item))) : undefined,
  };
}

function deserializeGoogleCloudRetailV2AddLocalInventoriesRequest(data: any): GoogleCloudRetailV2AddLocalInventoriesRequest {
  return {
    ...data,
    addMask: data["addMask"] !== undefined ? data["addMask"] : undefined,
    addTime: data["addTime"] !== undefined ? new Date(data["addTime"]) : undefined,
    localInventories: data["localInventories"] !== undefined ? data["localInventories"].map((item: any) => (deserializeGoogleCloudRetailV2LocalInventory(item))) : undefined,
  };
}

/**
 * Response of the ProductService.AddLocalInventories API. Currently empty
 * because there is no meaningful response populated from the
 * ProductService.AddLocalInventories method.
 */
export interface GoogleCloudRetailV2AddLocalInventoriesResponse {
}

/**
 * Metadata related to the progress of the AddFulfillmentPlaces operation.
 * Currently empty because there is no meaningful metadata populated from the
 * ProductService.AddFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2alphaAddFulfillmentPlacesMetadata {
}

/**
 * Response of the AddFulfillmentPlacesRequest. Currently empty because there
 * is no meaningful response populated from the
 * ProductService.AddFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2alphaAddFulfillmentPlacesResponse {
}

/**
 * Metadata related to the progress of the AddLocalInventories operation.
 * Currently empty because there is no meaningful metadata populated from the
 * ProductService.AddLocalInventories method.
 */
export interface GoogleCloudRetailV2alphaAddLocalInventoriesMetadata {
}

/**
 * Response of the ProductService.AddLocalInventories API. Currently empty
 * because there is no meaningful response populated from the
 * ProductService.AddLocalInventories method.
 */
export interface GoogleCloudRetailV2alphaAddLocalInventoriesResponse {
}

/**
 * A BigQuery output result.
 */
export interface GoogleCloudRetailV2alphaBigQueryOutputResult {
  /**
   * The ID of a BigQuery Dataset.
   */
  datasetId?: string;
  /**
   * The ID of a BigQuery Table.
   */
  tableId?: string;
}

/**
 * Metadata associated with a create operation.
 */
export interface GoogleCloudRetailV2alphaCreateModelMetadata {
  /**
   * The resource name of the model that this create applies to. Format:
   * `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}`
   */
  model?: string;
}

/**
 * Configuration of destination for Export related errors.
 */
export interface GoogleCloudRetailV2alphaExportErrorsConfig {
  /**
   * Google Cloud Storage path for import errors. This must be an empty,
   * existing Cloud Storage bucket. Export errors will be written to a file in
   * this bucket, one per line, as a JSON-encoded `google.rpc.Status` message.
   */
  gcsPrefix?: string;
}

/**
 * Metadata related to the progress of the Export operation. This is returned
 * by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudRetailV2alphaExportMetadata {
  /**
   * Operation create time.
   */
  createTime?: Date;
  /**
   * Operation last update time. If the operation is done, this is also the
   * finish time.
   */
  updateTime?: Date;
}

function serializeGoogleCloudRetailV2alphaExportMetadata(data: any): GoogleCloudRetailV2alphaExportMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRetailV2alphaExportMetadata(data: any): GoogleCloudRetailV2alphaExportMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Response of the ExportProductsRequest. If the long running operation is
 * done, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudRetailV2alphaExportProductsResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * This field is never set.
   */
  errorsConfig?: GoogleCloudRetailV2alphaExportErrorsConfig;
  /**
   * Output result indicating where the data were exported to.
   */
  outputResult?: GoogleCloudRetailV2alphaOutputResult;
}

/**
 * Response of the ExportUserEventsRequest. If the long running operation was
 * successful, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudRetailV2alphaExportUserEventsResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * This field is never set.
   */
  errorsConfig?: GoogleCloudRetailV2alphaExportErrorsConfig;
  /**
   * Output result indicating where the data were exported to.
   */
  outputResult?: GoogleCloudRetailV2alphaOutputResult;
}

/**
 * A Gcs output result.
 */
export interface GoogleCloudRetailV2alphaGcsOutputResult {
  /**
   * The uri of Gcs output
   */
  outputUri?: string;
}

/**
 * Response of the ImportCompletionDataRequest. If the long running operation
 * is done, this message is returned by the
 * google.longrunning.Operations.response field if the operation is successful.
 */
export interface GoogleCloudRetailV2alphaImportCompletionDataResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
}

/**
 * Configuration of destination for Import related errors.
 */
export interface GoogleCloudRetailV2alphaImportErrorsConfig {
  /**
   * Google Cloud Storage prefix for import errors. This must be an empty,
   * existing Cloud Storage directory. Import errors are written to sharded
   * files in this directory, one per line, as a JSON-encoded
   * `google.rpc.Status` message.
   */
  gcsPrefix?: string;
}

/**
 * Metadata related to the progress of the Import operation. This is returned
 * by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudRetailV2alphaImportMetadata {
  /**
   * Operation create time.
   */
  createTime?: Date;
  /**
   * Count of entries that encountered errors while processing.
   */
  failureCount?: bigint;
  /**
   * Pub/Sub topic for receiving notification. If this field is set, when the
   * import is finished, a notification is sent to specified Pub/Sub topic. The
   * message data is JSON string of a Operation. Format of the Pub/Sub topic is
   * `projects/{project}/topics/{topic}`.
   */
  notificationPubsubTopic?: string;
  /**
   * Deprecated. This field is never set.
   */
  requestId?: string;
  /**
   * Count of entries that were processed successfully.
   */
  successCount?: bigint;
  /**
   * Metadata related to transform user events.
   */
  transformedUserEventsMetadata?: GoogleCloudRetailV2alphaTransformedUserEventsMetadata;
  /**
   * Operation last update time. If the operation is done, this is also the
   * finish time.
   */
  updateTime?: Date;
}

function serializeGoogleCloudRetailV2alphaImportMetadata(data: any): GoogleCloudRetailV2alphaImportMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    failureCount: data["failureCount"] !== undefined ? String(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? String(data["successCount"]) : undefined,
    transformedUserEventsMetadata: data["transformedUserEventsMetadata"] !== undefined ? serializeGoogleCloudRetailV2alphaTransformedUserEventsMetadata(data["transformedUserEventsMetadata"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRetailV2alphaImportMetadata(data: any): GoogleCloudRetailV2alphaImportMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    failureCount: data["failureCount"] !== undefined ? BigInt(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? BigInt(data["successCount"]) : undefined,
    transformedUserEventsMetadata: data["transformedUserEventsMetadata"] !== undefined ? deserializeGoogleCloudRetailV2alphaTransformedUserEventsMetadata(data["transformedUserEventsMetadata"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Response of the ImportProductsRequest. If the long running operation is
 * done, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudRetailV2alphaImportProductsResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * Echoes the destination for the complete errors in the request if set.
   */
  errorsConfig?: GoogleCloudRetailV2alphaImportErrorsConfig;
}

/**
 * Response of the ImportUserEventsRequest. If the long running operation was
 * successful, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudRetailV2alphaImportUserEventsResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * Echoes the destination for the complete errors if this field was set in
   * the request.
   */
  errorsConfig?: GoogleCloudRetailV2alphaImportErrorsConfig;
  /**
   * Aggregated statistics of user event import status.
   */
  importSummary?: GoogleCloudRetailV2alphaUserEventImportSummary;
}

function serializeGoogleCloudRetailV2alphaImportUserEventsResponse(data: any): GoogleCloudRetailV2alphaImportUserEventsResponse {
  return {
    ...data,
    importSummary: data["importSummary"] !== undefined ? serializeGoogleCloudRetailV2alphaUserEventImportSummary(data["importSummary"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2alphaImportUserEventsResponse(data: any): GoogleCloudRetailV2alphaImportUserEventsResponse {
  return {
    ...data,
    importSummary: data["importSummary"] !== undefined ? deserializeGoogleCloudRetailV2alphaUserEventImportSummary(data["importSummary"]) : undefined,
  };
}

/**
 * Metadata that describes the training and serving parameters of a Model. A
 * Model can be associated with a ServingConfig and then queried through the
 * Predict API.
 */
export interface GoogleCloudRetailV2alphaModel {
  /**
   * Output only. Timestamp the Recommendation Model was created at.
   */
  readonly createTime?: Date;
  /**
   * Output only. The state of data requirements for this model: `DATA_OK` and
   * `DATA_ERROR`. Recommendation model cannot be trained if the data is in
   * `DATA_ERROR` state. Recommendation model can have `DATA_ERROR` state even
   * if serving state is `ACTIVE`: models were trained successfully before, but
   * cannot be refreshed because model no longer has sufficient data for
   * training.
   */
  readonly dataState?:  | "DATA_STATE_UNSPECIFIED" | "DATA_OK" | "DATA_ERROR";
  /**
   * Required. The display name of the model. Should be human readable, used to
   * display Recommendation Models in the Retail Cloud Console Dashboard. UTF-8
   * encoded string with limit of 1024 characters.
   */
  displayName?: string;
  /**
   * Optional. If `RECOMMENDATIONS_FILTERING_ENABLED`, recommendation filtering
   * by attributes is enabled for the model.
   */
  filteringOption?:  | "RECOMMENDATIONS_FILTERING_OPTION_UNSPECIFIED" | "RECOMMENDATIONS_FILTERING_DISABLED" | "RECOMMENDATIONS_FILTERING_ENABLED";
  /**
   * Output only. The timestamp when the latest successful tune finished.
   */
  readonly lastTuneTime?: Date;
  /**
   * Required. The fully qualified resource name of the model. Format:
   * `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}`
   * catalog_id has char limit of 50. recommendation_model_id has char limit of
   * 40.
   */
  name?: string;
  /**
   * Optional. The optimization objective e.g. `cvr`. Currently supported
   * values: `ctr`, `cvr`, `revenue-per-order`. If not specified, we choose
   * default based on model type. Default depends on type of recommendation:
   * `recommended-for-you` => `ctr` `others-you-may-like` => `ctr`
   * `frequently-bought-together` => `revenue_per_order` This field together
   * with optimization_objective describe model metadata to use to control model
   * training and serving. See https://cloud.google.com/retail/docs/models for
   * more details on what the model metadata control and which combination of
   * parameters are valid. For invalid combinations of parameters (e.g. type =
   * `frequently-bought-together` and optimization_objective = `ctr`), you
   * receive an error 400 if you try to create/update a recommendation with this
   * set of knobs.
   */
  optimizationObjective?: string;
  /**
   * Optional. The page optimization config.
   */
  pageOptimizationConfig?: GoogleCloudRetailV2alphaModelPageOptimizationConfig;
  /**
   * Optional. The state of periodic tuning. The period we use is 3 months - to
   * do a one-off tune earlier use the `TuneModel` method. Default value is
   * `PERIODIC_TUNING_ENABLED`.
   */
  periodicTuningState?:  | "PERIODIC_TUNING_STATE_UNSPECIFIED" | "PERIODIC_TUNING_DISABLED" | "ALL_TUNING_DISABLED" | "PERIODIC_TUNING_ENABLED";
  /**
   * Output only. The list of valid serving configs associated with the
   * PageOptimizationConfig.
   */
  readonly servingConfigLists?: GoogleCloudRetailV2alphaModelServingConfigList[];
  /**
   * Output only. The serving state of the model: `ACTIVE`, `NOT_ACTIVE`.
   */
  readonly servingState?:  | "SERVING_STATE_UNSPECIFIED" | "INACTIVE" | "ACTIVE" | "TUNED";
  /**
   * Optional. The training state that the model is in (e.g. `TRAINING` or
   * `PAUSED`). Since part of the cost of running the service is frequency of
   * training - this can be used to determine when to train model in order to
   * control cost. If not specified: the default value for `CreateModel` method
   * is `TRAINING`. The default value for `UpdateModel` method is to keep the
   * state the same as before.
   */
  trainingState?:  | "TRAINING_STATE_UNSPECIFIED" | "PAUSED" | "TRAINING";
  /**
   * Output only. The tune operation associated with the model. Can be used to
   * determine if there is an ongoing tune for this recommendation. Empty field
   * implies no tune is goig on.
   */
  readonly tuningOperation?: string;
  /**
   * Required. The type of model e.g. `home-page`. Currently supported values:
   * `recommended-for-you`, `others-you-may-like`, `frequently-bought-together`,
   * `page-optimization`, `similar-items`, `buy-it-again`, `on-sale-items`, and
   * `recently-viewed`(readonly value). This field together with
   * optimization_objective describe model metadata to use to control model
   * training and serving. See https://cloud.google.com/retail/docs/models for
   * more details on what the model metadata control and which combination of
   * parameters are valid. For invalid combinations of parameters (e.g. type =
   * `frequently-bought-together` and optimization_objective = `ctr`), you
   * receive an error 400 if you try to create/update a recommendation with this
   * set of knobs.
   */
  type?: string;
  /**
   * Output only. Timestamp the Recommendation Model was last updated. E.g. if
   * a Recommendation Model was paused - this would be the time the pause was
   * initiated.
   */
  readonly updateTime?: Date;
}

/**
 * The PageOptimizationConfig for model training. This determines how many
 * panels to optimize for, and which serving configs to consider for each panel.
 * The purpose of this model is to optimize which ServingConfig to show on which
 * panels in way that optimizes the visitors shopping journey.
 */
export interface GoogleCloudRetailV2alphaModelPageOptimizationConfig {
  /**
   * Required. The type of UserEvent this page optimization is shown for. Each
   * page has an associated event type - this will be the corresponding event
   * type for the page that the page optimization model is used on. Supported
   * types: * `add-to-cart`: Products being added to cart. * `detail-page-view`:
   * Products detail page viewed. * `home-page-view`: Homepage viewed *
   * `category-page-view`: Homepage viewed * `shopping-cart-page-view`: User
   * viewing a shopping cart. `home-page-view` only allows models with type
   * `recommended-for-you`. All other page_optimization_event_type allow all
   * Model.types.
   */
  pageOptimizationEventType?: string;
  /**
   * Required. A list of panel configurations. Limit = 5.
   */
  panels?: GoogleCloudRetailV2alphaModelPageOptimizationConfigPanel[];
  /**
   * Optional. How to restrict results across panels e.g. can the same
   * ServingConfig be shown on multiple panels at once. If unspecified, default
   * to `UNIQUE_MODEL_RESTRICTION`.
   */
  restriction?:  | "RESTRICTION_UNSPECIFIED" | "NO_RESTRICTION" | "UNIQUE_SERVING_CONFIG_RESTRICTION" | "UNIQUE_MODEL_RESTRICTION" | "UNIQUE_MODEL_TYPE_RESTRICTION";
}

/**
 * A candidate to consider for a given panel. Currently only ServingConfig are
 * valid candidates.
 */
export interface GoogleCloudRetailV2alphaModelPageOptimizationConfigCandidate {
  /**
   * This has to be a valid ServingConfig identifier. For example, for a
   * ServingConfig with full name:
   * `projects/*\/locations/global/catalogs/default_catalog/servingConfigs/my_candidate_config`,
   * this would be `my_candidate_config`.
   */
  servingConfigId?: string;
}

/**
 * An individual panel with a list of ServingConfigs to consider for it.
 */
export interface GoogleCloudRetailV2alphaModelPageOptimizationConfigPanel {
  /**
   * Required. The candidates to consider on the panel.
   */
  candidates?: GoogleCloudRetailV2alphaModelPageOptimizationConfigCandidate[];
  /**
   * Required. The default candidate. If the model fails at serving time, we
   * fall back to the default.
   */
  defaultCandidate?: GoogleCloudRetailV2alphaModelPageOptimizationConfigCandidate;
  /**
   * Optional. The name to display for the panel.
   */
  displayName?: string;
}

/**
 * Represents an ordered combination of valid serving configs, which can be
 * used for `PAGE_OPTIMIZATION` recommendations.
 */
export interface GoogleCloudRetailV2alphaModelServingConfigList {
  /**
   * Optional. A set of valid serving configs that may be used for
   * `PAGE_OPTIMIZATION`.
   */
  servingConfigIds?: string[];
}

/**
 * Output result that stores the information about where the exported data is
 * stored.
 */
export interface GoogleCloudRetailV2alphaOutputResult {
  /**
   * The BigQuery location where the result is stored.
   */
  bigqueryResult?: GoogleCloudRetailV2alphaBigQueryOutputResult[];
  /**
   * The Google Cloud Storage location where the result is stored.
   */
  gcsResult?: GoogleCloudRetailV2alphaGcsOutputResult[];
}

/**
 * Metadata related to the progress of the Purge operation. This will be
 * returned by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudRetailV2alphaPurgeMetadata {
}

/**
 * Metadata related to the progress of the PurgeProducts operation. This will
 * be returned by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudRetailV2alphaPurgeProductsMetadata {
  /**
   * Operation create time.
   */
  createTime?: Date;
  /**
   * Count of entries that encountered errors while processing.
   */
  failureCount?: bigint;
  /**
   * Count of entries that were deleted successfully.
   */
  successCount?: bigint;
  /**
   * Operation last update time. If the operation is done, this is also the
   * finish time.
   */
  updateTime?: Date;
}

function serializeGoogleCloudRetailV2alphaPurgeProductsMetadata(data: any): GoogleCloudRetailV2alphaPurgeProductsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    failureCount: data["failureCount"] !== undefined ? String(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? String(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRetailV2alphaPurgeProductsMetadata(data: any): GoogleCloudRetailV2alphaPurgeProductsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    failureCount: data["failureCount"] !== undefined ? BigInt(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? BigInt(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Response of the PurgeProductsRequest. If the long running operation is
 * successfully done, then this message is returned by the
 * google.longrunning.Operations.response field.
 */
export interface GoogleCloudRetailV2alphaPurgeProductsResponse {
  /**
   * The total count of products purged as a result of the operation.
   */
  purgeCount?: bigint;
  /**
   * A sample of the product names that will be deleted. Only populated if
   * `force` is set to false. A max of 100 names will be returned and the names
   * are chosen at random.
   */
  purgeSample?: string[];
}

function serializeGoogleCloudRetailV2alphaPurgeProductsResponse(data: any): GoogleCloudRetailV2alphaPurgeProductsResponse {
  return {
    ...data,
    purgeCount: data["purgeCount"] !== undefined ? String(data["purgeCount"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2alphaPurgeProductsResponse(data: any): GoogleCloudRetailV2alphaPurgeProductsResponse {
  return {
    ...data,
    purgeCount: data["purgeCount"] !== undefined ? BigInt(data["purgeCount"]) : undefined,
  };
}

/**
 * Response of the PurgeUserEventsRequest. If the long running operation is
 * successfully done, then this message is returned by the
 * google.longrunning.Operations.response field.
 */
export interface GoogleCloudRetailV2alphaPurgeUserEventsResponse {
  /**
   * The total count of events purged as a result of the operation.
   */
  purgedEventsCount?: bigint;
}

function serializeGoogleCloudRetailV2alphaPurgeUserEventsResponse(data: any): GoogleCloudRetailV2alphaPurgeUserEventsResponse {
  return {
    ...data,
    purgedEventsCount: data["purgedEventsCount"] !== undefined ? String(data["purgedEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2alphaPurgeUserEventsResponse(data: any): GoogleCloudRetailV2alphaPurgeUserEventsResponse {
  return {
    ...data,
    purgedEventsCount: data["purgedEventsCount"] !== undefined ? BigInt(data["purgedEventsCount"]) : undefined,
  };
}

/**
 * Metadata for `RejoinUserEvents` method.
 */
export interface GoogleCloudRetailV2alphaRejoinUserEventsMetadata {
}

/**
 * Response message for `RejoinUserEvents` method.
 */
export interface GoogleCloudRetailV2alphaRejoinUserEventsResponse {
  /**
   * Number of user events that were joined with latest product catalog.
   */
  rejoinedUserEventsCount?: bigint;
}

function serializeGoogleCloudRetailV2alphaRejoinUserEventsResponse(data: any): GoogleCloudRetailV2alphaRejoinUserEventsResponse {
  return {
    ...data,
    rejoinedUserEventsCount: data["rejoinedUserEventsCount"] !== undefined ? String(data["rejoinedUserEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2alphaRejoinUserEventsResponse(data: any): GoogleCloudRetailV2alphaRejoinUserEventsResponse {
  return {
    ...data,
    rejoinedUserEventsCount: data["rejoinedUserEventsCount"] !== undefined ? BigInt(data["rejoinedUserEventsCount"]) : undefined,
  };
}

/**
 * Metadata related to the progress of the RemoveFulfillmentPlaces operation.
 * Currently empty because there is no meaningful metadata populated from the
 * ProductService.RemoveFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2alphaRemoveFulfillmentPlacesMetadata {
}

/**
 * Response of the RemoveFulfillmentPlacesRequest. Currently empty because
 * there is no meaningful response populated from the
 * ProductService.RemoveFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2alphaRemoveFulfillmentPlacesResponse {
}

/**
 * Metadata related to the progress of the RemoveLocalInventories operation.
 * Currently empty because there is no meaningful metadata populated from the
 * ProductService.RemoveLocalInventories method.
 */
export interface GoogleCloudRetailV2alphaRemoveLocalInventoriesMetadata {
}

/**
 * Response of the ProductService.RemoveLocalInventories API. Currently empty
 * because there is no meaningful response populated from the
 * ProductService.RemoveLocalInventories method.
 */
export interface GoogleCloudRetailV2alphaRemoveLocalInventoriesResponse {
}

/**
 * Metadata related to the progress of the SetInventory operation. Currently
 * empty because there is no meaningful metadata populated from the
 * ProductService.SetInventory method.
 */
export interface GoogleCloudRetailV2alphaSetInventoryMetadata {
}

/**
 * Response of the SetInventoryRequest. Currently empty because there is no
 * meaningful response populated from the ProductService.SetInventory method.
 */
export interface GoogleCloudRetailV2alphaSetInventoryResponse {
}

/**
 * Metadata related to transform user events operation.
 */
export interface GoogleCloudRetailV2alphaTransformedUserEventsMetadata {
  /**
   * Count of entries in the source user events BigQuery table.
   */
  sourceEventsCount?: bigint;
  /**
   * Count of entries in the transformed user events BigQuery table, which
   * could be different from the actually imported number of user events.
   */
  transformedEventsCount?: bigint;
}

function serializeGoogleCloudRetailV2alphaTransformedUserEventsMetadata(data: any): GoogleCloudRetailV2alphaTransformedUserEventsMetadata {
  return {
    ...data,
    sourceEventsCount: data["sourceEventsCount"] !== undefined ? String(data["sourceEventsCount"]) : undefined,
    transformedEventsCount: data["transformedEventsCount"] !== undefined ? String(data["transformedEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2alphaTransformedUserEventsMetadata(data: any): GoogleCloudRetailV2alphaTransformedUserEventsMetadata {
  return {
    ...data,
    sourceEventsCount: data["sourceEventsCount"] !== undefined ? BigInt(data["sourceEventsCount"]) : undefined,
    transformedEventsCount: data["transformedEventsCount"] !== undefined ? BigInt(data["transformedEventsCount"]) : undefined,
  };
}

/**
 * Metadata associated with a tune operation.
 */
export interface GoogleCloudRetailV2alphaTuneModelMetadata {
  /**
   * The resource name of the model that this tune applies to. Format:
   * `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}`
   */
  model?: string;
}

/**
 * Response associated with a tune operation.
 */
export interface GoogleCloudRetailV2alphaTuneModelResponse {
}

/**
 * A summary of import result. The UserEventImportSummary summarizes the import
 * status for user events.
 */
export interface GoogleCloudRetailV2alphaUserEventImportSummary {
  /**
   * Count of user events imported with complete existing catalog information.
   */
  joinedEventsCount?: bigint;
  /**
   * Count of user events imported, but with catalog information not found in
   * the imported catalog.
   */
  unjoinedEventsCount?: bigint;
}

function serializeGoogleCloudRetailV2alphaUserEventImportSummary(data: any): GoogleCloudRetailV2alphaUserEventImportSummary {
  return {
    ...data,
    joinedEventsCount: data["joinedEventsCount"] !== undefined ? String(data["joinedEventsCount"]) : undefined,
    unjoinedEventsCount: data["unjoinedEventsCount"] !== undefined ? String(data["unjoinedEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2alphaUserEventImportSummary(data: any): GoogleCloudRetailV2alphaUserEventImportSummary {
  return {
    ...data,
    joinedEventsCount: data["joinedEventsCount"] !== undefined ? BigInt(data["joinedEventsCount"]) : undefined,
    unjoinedEventsCount: data["unjoinedEventsCount"] !== undefined ? BigInt(data["unjoinedEventsCount"]) : undefined,
  };
}

/**
 * Catalog level attribute config.
 */
export interface GoogleCloudRetailV2AttributesConfig {
  /**
   * Output only. The AttributeConfigLevel used for this catalog.
   */
  readonly attributeConfigLevel?:  | "ATTRIBUTE_CONFIG_LEVEL_UNSPECIFIED" | "PRODUCT_LEVEL_ATTRIBUTE_CONFIG" | "CATALOG_LEVEL_ATTRIBUTE_CONFIG";
  /**
   * Enable attribute(s) config at catalog level. For example, indexable,
   * dynamic_facetable, or searchable for each attribute. The key is catalog
   * attribute's name. For example: `color`, `brands`,
   * `attributes.custom_attribute`, such as `attributes.xyz`. The maximum number
   * of catalog attributes allowed in a request is 1000.
   */
  catalogAttributes?: {
    [key: string]: GoogleCloudRetailV2CatalogAttribute
  };
  /**
   * Required. Immutable. The fully qualified resource name of the attribute
   * config. Format: `projects/*\/locations/*\/catalogs/*\/attributesConfig`
   */
  name?: string;
}

/**
 * An intended audience of the Product for whom it's sold.
 */
export interface GoogleCloudRetailV2Audience {
  /**
   * The age groups of the audience. Strongly encouraged to use the standard
   * values: "newborn" (up to 3 months old), "infant" (3–12 months old),
   * "toddler" (1–5 years old), "kids" (5–13 years old), "adult" (typically
   * teens or older). At most 5 values are allowed. Each value must be a UTF-8
   * encoded string with a length limit of 128 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned. Google Merchant Center property
   * [age_group](https://support.google.com/merchants/answer/6324463).
   * Schema.org property
   * [Product.audience.suggestedMinAge](https://schema.org/suggestedMinAge) and
   * [Product.audience.suggestedMaxAge](https://schema.org/suggestedMaxAge).
   */
  ageGroups?: string[];
  /**
   * The genders of the audience. Strongly encouraged to use the standard
   * values: "male", "female", "unisex". At most 5 values are allowed. Each
   * value must be a UTF-8 encoded string with a length limit of 128 characters.
   * Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center
   * property [gender](https://support.google.com/merchants/answer/6324479).
   * Schema.org property
   * [Product.audience.suggestedGender](https://schema.org/suggestedGender).
   */
  genders?: string[];
}

/**
 * Metadata related to the progress of the AddFulfillmentPlaces operation.
 * Currently empty because there is no meaningful metadata populated from the
 * ProductService.AddFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2betaAddFulfillmentPlacesMetadata {
}

/**
 * Response of the AddFulfillmentPlacesRequest. Currently empty because there
 * is no meaningful response populated from the
 * ProductService.AddFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2betaAddFulfillmentPlacesResponse {
}

/**
 * Metadata related to the progress of the AddLocalInventories operation.
 * Currently empty because there is no meaningful metadata populated from the
 * ProductService.AddLocalInventories method.
 */
export interface GoogleCloudRetailV2betaAddLocalInventoriesMetadata {
}

/**
 * Response of the ProductService.AddLocalInventories API. Currently empty
 * because there is no meaningful response populated from the
 * ProductService.AddLocalInventories method.
 */
export interface GoogleCloudRetailV2betaAddLocalInventoriesResponse {
}

/**
 * A BigQuery output result.
 */
export interface GoogleCloudRetailV2betaBigQueryOutputResult {
  /**
   * The ID of a BigQuery Dataset.
   */
  datasetId?: string;
  /**
   * The ID of a BigQuery Table.
   */
  tableId?: string;
}

/**
 * Metadata associated with a create operation.
 */
export interface GoogleCloudRetailV2betaCreateModelMetadata {
  /**
   * The resource name of the model that this create applies to. Format:
   * `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}`
   */
  model?: string;
}

/**
 * Configuration of destination for Export related errors.
 */
export interface GoogleCloudRetailV2betaExportErrorsConfig {
  /**
   * Google Cloud Storage path for import errors. This must be an empty,
   * existing Cloud Storage bucket. Export errors will be written to a file in
   * this bucket, one per line, as a JSON-encoded `google.rpc.Status` message.
   */
  gcsPrefix?: string;
}

/**
 * Metadata related to the progress of the Export operation. This is returned
 * by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudRetailV2betaExportMetadata {
  /**
   * Operation create time.
   */
  createTime?: Date;
  /**
   * Operation last update time. If the operation is done, this is also the
   * finish time.
   */
  updateTime?: Date;
}

function serializeGoogleCloudRetailV2betaExportMetadata(data: any): GoogleCloudRetailV2betaExportMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRetailV2betaExportMetadata(data: any): GoogleCloudRetailV2betaExportMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Response of the ExportProductsRequest. If the long running operation is
 * done, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudRetailV2betaExportProductsResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * This field is never set.
   */
  errorsConfig?: GoogleCloudRetailV2betaExportErrorsConfig;
  /**
   * Output result indicating where the data were exported to.
   */
  outputResult?: GoogleCloudRetailV2betaOutputResult;
}

/**
 * Response of the ExportUserEventsRequest. If the long running operation was
 * successful, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudRetailV2betaExportUserEventsResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * This field is never set.
   */
  errorsConfig?: GoogleCloudRetailV2betaExportErrorsConfig;
  /**
   * Output result indicating where the data were exported to.
   */
  outputResult?: GoogleCloudRetailV2betaOutputResult;
}

/**
 * A Gcs output result.
 */
export interface GoogleCloudRetailV2betaGcsOutputResult {
  /**
   * The uri of Gcs output
   */
  outputUri?: string;
}

/**
 * Response of the ImportCompletionDataRequest. If the long running operation
 * is done, this message is returned by the
 * google.longrunning.Operations.response field if the operation is successful.
 */
export interface GoogleCloudRetailV2betaImportCompletionDataResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
}

/**
 * Configuration of destination for Import related errors.
 */
export interface GoogleCloudRetailV2betaImportErrorsConfig {
  /**
   * Google Cloud Storage prefix for import errors. This must be an empty,
   * existing Cloud Storage directory. Import errors are written to sharded
   * files in this directory, one per line, as a JSON-encoded
   * `google.rpc.Status` message.
   */
  gcsPrefix?: string;
}

/**
 * Metadata related to the progress of the Import operation. This is returned
 * by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudRetailV2betaImportMetadata {
  /**
   * Operation create time.
   */
  createTime?: Date;
  /**
   * Count of entries that encountered errors while processing.
   */
  failureCount?: bigint;
  /**
   * Pub/Sub topic for receiving notification. If this field is set, when the
   * import is finished, a notification is sent to specified Pub/Sub topic. The
   * message data is JSON string of a Operation. Format of the Pub/Sub topic is
   * `projects/{project}/topics/{topic}`.
   */
  notificationPubsubTopic?: string;
  /**
   * Deprecated. This field is never set.
   */
  requestId?: string;
  /**
   * Count of entries that were processed successfully.
   */
  successCount?: bigint;
  /**
   * Operation last update time. If the operation is done, this is also the
   * finish time.
   */
  updateTime?: Date;
}

function serializeGoogleCloudRetailV2betaImportMetadata(data: any): GoogleCloudRetailV2betaImportMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    failureCount: data["failureCount"] !== undefined ? String(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? String(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRetailV2betaImportMetadata(data: any): GoogleCloudRetailV2betaImportMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    failureCount: data["failureCount"] !== undefined ? BigInt(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? BigInt(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Response of the ImportProductsRequest. If the long running operation is
 * done, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudRetailV2betaImportProductsResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * Echoes the destination for the complete errors in the request if set.
   */
  errorsConfig?: GoogleCloudRetailV2betaImportErrorsConfig;
}

/**
 * Response of the ImportUserEventsRequest. If the long running operation was
 * successful, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudRetailV2betaImportUserEventsResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * Echoes the destination for the complete errors if this field was set in
   * the request.
   */
  errorsConfig?: GoogleCloudRetailV2betaImportErrorsConfig;
  /**
   * Aggregated statistics of user event import status.
   */
  importSummary?: GoogleCloudRetailV2betaUserEventImportSummary;
}

function serializeGoogleCloudRetailV2betaImportUserEventsResponse(data: any): GoogleCloudRetailV2betaImportUserEventsResponse {
  return {
    ...data,
    importSummary: data["importSummary"] !== undefined ? serializeGoogleCloudRetailV2betaUserEventImportSummary(data["importSummary"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2betaImportUserEventsResponse(data: any): GoogleCloudRetailV2betaImportUserEventsResponse {
  return {
    ...data,
    importSummary: data["importSummary"] !== undefined ? deserializeGoogleCloudRetailV2betaUserEventImportSummary(data["importSummary"]) : undefined,
  };
}

/**
 * Metadata that describes the training and serving parameters of a Model. A
 * Model can be associated with a ServingConfig and then queried through the
 * Predict API.
 */
export interface GoogleCloudRetailV2betaModel {
  /**
   * Output only. Timestamp the Recommendation Model was created at.
   */
  readonly createTime?: Date;
  /**
   * Output only. The state of data requirements for this model: `DATA_OK` and
   * `DATA_ERROR`. Recommendation model cannot be trained if the data is in
   * `DATA_ERROR` state. Recommendation model can have `DATA_ERROR` state even
   * if serving state is `ACTIVE`: models were trained successfully before, but
   * cannot be refreshed because model no longer has sufficient data for
   * training.
   */
  readonly dataState?:  | "DATA_STATE_UNSPECIFIED" | "DATA_OK" | "DATA_ERROR";
  /**
   * Required. The display name of the model. Should be human readable, used to
   * display Recommendation Models in the Retail Cloud Console Dashboard. UTF-8
   * encoded string with limit of 1024 characters.
   */
  displayName?: string;
  /**
   * Optional. If `RECOMMENDATIONS_FILTERING_ENABLED`, recommendation filtering
   * by attributes is enabled for the model.
   */
  filteringOption?:  | "RECOMMENDATIONS_FILTERING_OPTION_UNSPECIFIED" | "RECOMMENDATIONS_FILTERING_DISABLED" | "RECOMMENDATIONS_FILTERING_ENABLED";
  /**
   * Output only. The timestamp when the latest successful tune finished.
   */
  readonly lastTuneTime?: Date;
  /**
   * Required. The fully qualified resource name of the model. Format:
   * `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}`
   * catalog_id has char limit of 50. recommendation_model_id has char limit of
   * 40.
   */
  name?: string;
  /**
   * Optional. The optimization objective e.g. `cvr`. Currently supported
   * values: `ctr`, `cvr`, `revenue-per-order`. If not specified, we choose
   * default based on model type. Default depends on type of recommendation:
   * `recommended-for-you` => `ctr` `others-you-may-like` => `ctr`
   * `frequently-bought-together` => `revenue_per_order` This field together
   * with optimization_objective describe model metadata to use to control model
   * training and serving. See https://cloud.google.com/retail/docs/models for
   * more details on what the model metadata control and which combination of
   * parameters are valid. For invalid combinations of parameters (e.g. type =
   * `frequently-bought-together` and optimization_objective = `ctr`), you
   * receive an error 400 if you try to create/update a recommendation with this
   * set of knobs.
   */
  optimizationObjective?: string;
  /**
   * Optional. The state of periodic tuning. The period we use is 3 months - to
   * do a one-off tune earlier use the `TuneModel` method. Default value is
   * `PERIODIC_TUNING_ENABLED`.
   */
  periodicTuningState?:  | "PERIODIC_TUNING_STATE_UNSPECIFIED" | "PERIODIC_TUNING_DISABLED" | "ALL_TUNING_DISABLED" | "PERIODIC_TUNING_ENABLED";
  /**
   * Output only. The list of valid serving configs associated with the
   * PageOptimizationConfig.
   */
  readonly servingConfigLists?: GoogleCloudRetailV2betaModelServingConfigList[];
  /**
   * Output only. The serving state of the model: `ACTIVE`, `NOT_ACTIVE`.
   */
  readonly servingState?:  | "SERVING_STATE_UNSPECIFIED" | "INACTIVE" | "ACTIVE" | "TUNED";
  /**
   * Optional. The training state that the model is in (e.g. `TRAINING` or
   * `PAUSED`). Since part of the cost of running the service is frequency of
   * training - this can be used to determine when to train model in order to
   * control cost. If not specified: the default value for `CreateModel` method
   * is `TRAINING`. The default value for `UpdateModel` method is to keep the
   * state the same as before.
   */
  trainingState?:  | "TRAINING_STATE_UNSPECIFIED" | "PAUSED" | "TRAINING";
  /**
   * Output only. The tune operation associated with the model. Can be used to
   * determine if there is an ongoing tune for this recommendation. Empty field
   * implies no tune is goig on.
   */
  readonly tuningOperation?: string;
  /**
   * Required. The type of model e.g. `home-page`. Currently supported values:
   * `recommended-for-you`, `others-you-may-like`, `frequently-bought-together`,
   * `page-optimization`, `similar-items`, `buy-it-again`, `on-sale-items`, and
   * `recently-viewed`(readonly value). This field together with
   * optimization_objective describe model metadata to use to control model
   * training and serving. See https://cloud.google.com/retail/docs/models for
   * more details on what the model metadata control and which combination of
   * parameters are valid. For invalid combinations of parameters (e.g. type =
   * `frequently-bought-together` and optimization_objective = `ctr`), you
   * receive an error 400 if you try to create/update a recommendation with this
   * set of knobs.
   */
  type?: string;
  /**
   * Output only. Timestamp the Recommendation Model was last updated. E.g. if
   * a Recommendation Model was paused - this would be the time the pause was
   * initiated.
   */
  readonly updateTime?: Date;
}

/**
 * Represents an ordered combination of valid serving configs, which can be
 * used for `PAGE_OPTIMIZATION` recommendations.
 */
export interface GoogleCloudRetailV2betaModelServingConfigList {
  /**
   * Optional. A set of valid serving configs that may be used for
   * `PAGE_OPTIMIZATION`.
   */
  servingConfigIds?: string[];
}

/**
 * Output result that stores the information about where the exported data is
 * stored.
 */
export interface GoogleCloudRetailV2betaOutputResult {
  /**
   * The BigQuery location where the result is stored.
   */
  bigqueryResult?: GoogleCloudRetailV2betaBigQueryOutputResult[];
  /**
   * The Google Cloud Storage location where the result is stored.
   */
  gcsResult?: GoogleCloudRetailV2betaGcsOutputResult[];
}

/**
 * Metadata related to the progress of the Purge operation. This will be
 * returned by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudRetailV2betaPurgeMetadata {
}

/**
 * Response of the PurgeUserEventsRequest. If the long running operation is
 * successfully done, then this message is returned by the
 * google.longrunning.Operations.response field.
 */
export interface GoogleCloudRetailV2betaPurgeUserEventsResponse {
  /**
   * The total count of events purged as a result of the operation.
   */
  purgedEventsCount?: bigint;
}

function serializeGoogleCloudRetailV2betaPurgeUserEventsResponse(data: any): GoogleCloudRetailV2betaPurgeUserEventsResponse {
  return {
    ...data,
    purgedEventsCount: data["purgedEventsCount"] !== undefined ? String(data["purgedEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2betaPurgeUserEventsResponse(data: any): GoogleCloudRetailV2betaPurgeUserEventsResponse {
  return {
    ...data,
    purgedEventsCount: data["purgedEventsCount"] !== undefined ? BigInt(data["purgedEventsCount"]) : undefined,
  };
}

/**
 * Metadata for `RejoinUserEvents` method.
 */
export interface GoogleCloudRetailV2betaRejoinUserEventsMetadata {
}

/**
 * Response message for `RejoinUserEvents` method.
 */
export interface GoogleCloudRetailV2betaRejoinUserEventsResponse {
  /**
   * Number of user events that were joined with latest product catalog.
   */
  rejoinedUserEventsCount?: bigint;
}

function serializeGoogleCloudRetailV2betaRejoinUserEventsResponse(data: any): GoogleCloudRetailV2betaRejoinUserEventsResponse {
  return {
    ...data,
    rejoinedUserEventsCount: data["rejoinedUserEventsCount"] !== undefined ? String(data["rejoinedUserEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2betaRejoinUserEventsResponse(data: any): GoogleCloudRetailV2betaRejoinUserEventsResponse {
  return {
    ...data,
    rejoinedUserEventsCount: data["rejoinedUserEventsCount"] !== undefined ? BigInt(data["rejoinedUserEventsCount"]) : undefined,
  };
}

/**
 * Metadata related to the progress of the RemoveFulfillmentPlaces operation.
 * Currently empty because there is no meaningful metadata populated from the
 * ProductService.RemoveFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2betaRemoveFulfillmentPlacesMetadata {
}

/**
 * Response of the RemoveFulfillmentPlacesRequest. Currently empty because
 * there is no meaningful response populated from the
 * ProductService.RemoveFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2betaRemoveFulfillmentPlacesResponse {
}

/**
 * Metadata related to the progress of the RemoveLocalInventories operation.
 * Currently empty because there is no meaningful metadata populated from the
 * ProductService.RemoveLocalInventories method.
 */
export interface GoogleCloudRetailV2betaRemoveLocalInventoriesMetadata {
}

/**
 * Response of the ProductService.RemoveLocalInventories API. Currently empty
 * because there is no meaningful response populated from the
 * ProductService.RemoveLocalInventories method.
 */
export interface GoogleCloudRetailV2betaRemoveLocalInventoriesResponse {
}

/**
 * Metadata related to the progress of the SetInventory operation. Currently
 * empty because there is no meaningful metadata populated from the
 * ProductService.SetInventory method.
 */
export interface GoogleCloudRetailV2betaSetInventoryMetadata {
}

/**
 * Response of the SetInventoryRequest. Currently empty because there is no
 * meaningful response populated from the ProductService.SetInventory method.
 */
export interface GoogleCloudRetailV2betaSetInventoryResponse {
}

/**
 * Metadata associated with a tune operation.
 */
export interface GoogleCloudRetailV2betaTuneModelMetadata {
  /**
   * The resource name of the model that this tune applies to. Format:
   * `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}`
   */
  model?: string;
}

/**
 * Response associated with a tune operation.
 */
export interface GoogleCloudRetailV2betaTuneModelResponse {
}

/**
 * A summary of import result. The UserEventImportSummary summarizes the import
 * status for user events.
 */
export interface GoogleCloudRetailV2betaUserEventImportSummary {
  /**
   * Count of user events imported with complete existing catalog information.
   */
  joinedEventsCount?: bigint;
  /**
   * Count of user events imported, but with catalog information not found in
   * the imported catalog.
   */
  unjoinedEventsCount?: bigint;
}

function serializeGoogleCloudRetailV2betaUserEventImportSummary(data: any): GoogleCloudRetailV2betaUserEventImportSummary {
  return {
    ...data,
    joinedEventsCount: data["joinedEventsCount"] !== undefined ? String(data["joinedEventsCount"]) : undefined,
    unjoinedEventsCount: data["unjoinedEventsCount"] !== undefined ? String(data["unjoinedEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2betaUserEventImportSummary(data: any): GoogleCloudRetailV2betaUserEventImportSummary {
  return {
    ...data,
    joinedEventsCount: data["joinedEventsCount"] !== undefined ? BigInt(data["joinedEventsCount"]) : undefined,
    unjoinedEventsCount: data["unjoinedEventsCount"] !== undefined ? BigInt(data["unjoinedEventsCount"]) : undefined,
  };
}

/**
 * BigQuery source import data from.
 */
export interface GoogleCloudRetailV2BigQuerySource {
  /**
   * The schema to use when parsing the data from the source. Supported values
   * for product imports: * `product` (default): One JSON Product per line. Each
   * product must have a valid Product.id. * `product_merchant_center`: See
   * [Importing catalog data from Merchant
   * Center](https://cloud.google.com/retail/recommendations-ai/docs/upload-catalog#mc).
   * Supported values for user events imports: * `user_event` (default): One
   * JSON UserEvent per line. * `user_event_ga360`: The schema is available
   * here: https://support.google.com/analytics/answer/3437719. *
   * `user_event_ga4`: The schema is available here:
   * https://support.google.com/analytics/answer/7029846. Supported values for
   * autocomplete imports: * `suggestions` (default): One JSON completion
   * suggestion per line. * `denylist`: One JSON deny suggestion per line. *
   * `allowlist`: One JSON allow suggestion per line.
   */
  dataSchema?: string;
  /**
   * Required. The BigQuery data set to copy the data from with a length limit
   * of 1,024 characters.
   */
  datasetId?: string;
  /**
   * Intermediate Cloud Storage directory used for the import with a length
   * limit of 2,000 characters. Can be specified if one wants to have the
   * BigQuery export to a specific Cloud Storage directory.
   */
  gcsStagingDir?: string;
  /**
   * BigQuery time partitioned table's _PARTITIONDATE in YYYY-MM-DD format.
   * Only supported in ImportProductsRequest.
   */
  partitionDate?: GoogleTypeDate;
  /**
   * The project ID (can be project # or ID) that the BigQuery source is in
   * with a length limit of 128 characters. If not specified, inherits the
   * project ID from the parent request.
   */
  projectId?: string;
  /**
   * Required. The BigQuery table to copy the data from with a length limit of
   * 1,024 characters.
   */
  tableId?: string;
}

/**
 * The catalog configuration.
 */
export interface GoogleCloudRetailV2Catalog {
  /**
   * Required. Immutable. The catalog display name. This field must be a UTF-8
   * encoded string with a length limit of 128 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned.
   */
  displayName?: string;
  /**
   * Required. Immutable. The fully qualified resource name of the catalog.
   */
  name?: string;
  /**
   * Required. The product level configuration.
   */
  productLevelConfig?: GoogleCloudRetailV2ProductLevelConfig;
}

/**
 * Catalog level attribute config for an attribute. For example, if customers
 * want to enable/disable facet for a specific attribute.
 */
export interface GoogleCloudRetailV2CatalogAttribute {
  /**
   * If DYNAMIC_FACETABLE_ENABLED, attribute values are available for dynamic
   * facet. Could only be DYNAMIC_FACETABLE_DISABLED if
   * CatalogAttribute.indexable_option is INDEXABLE_DISABLED. Otherwise, an
   * INVALID_ARGUMENT error is returned. Must be specified, otherwise throws
   * INVALID_FORMAT error.
   */
  dynamicFacetableOption?:  | "DYNAMIC_FACETABLE_OPTION_UNSPECIFIED" | "DYNAMIC_FACETABLE_ENABLED" | "DYNAMIC_FACETABLE_DISABLED";
  /**
   * If EXACT_SEARCHABLE_ENABLED, attribute values will be exact searchable.
   * This property only applies to textual custom attributes and requires
   * indexable set to enabled to enable exact-searchable. If unset, the server
   * behavior defaults to EXACT_SEARCHABLE_DISABLED.
   */
  exactSearchableOption?:  | "EXACT_SEARCHABLE_OPTION_UNSPECIFIED" | "EXACT_SEARCHABLE_ENABLED" | "EXACT_SEARCHABLE_DISABLED";
  /**
   * When AttributesConfig.attribute_config_level is
   * CATALOG_LEVEL_ATTRIBUTE_CONFIG, if INDEXABLE_ENABLED attribute values are
   * indexed so that it can be filtered, faceted, or boosted in
   * SearchService.Search. Must be specified, otherwise throws INVALID_FORMAT
   * error.
   */
  indexableOption?:  | "INDEXABLE_OPTION_UNSPECIFIED" | "INDEXABLE_ENABLED" | "INDEXABLE_DISABLED";
  /**
   * Output only. Indicates whether this attribute has been used by any
   * products. `True` if at least one Product is using this attribute in
   * Product.attributes. Otherwise, this field is `False`. CatalogAttribute can
   * be pre-loaded by using CatalogService.AddCatalogAttribute,
   * CatalogService.ImportCatalogAttributes, or
   * CatalogService.UpdateAttributesConfig APIs. This field is `False` for
   * pre-loaded CatalogAttributes. Only pre-loaded catalog attributes that are
   * neither in use by products nor predefined can be deleted. Catalog
   * attributes that are either in use by products or are predefined attributes
   * cannot be deleted; however, their configuration properties will reset to
   * default values upon removal request. After catalog changes, it takes about
   * 10 minutes for this field to update.
   */
  readonly inUse?: boolean;
  /**
   * Required. Attribute name. For example: `color`, `brands`,
   * `attributes.custom_attribute`, such as `attributes.xyz`. To be indexable,
   * the attribute name can contain only alpha-numeric characters and
   * underscores. For example, an attribute named `attributes.abc_xyz` can be
   * indexed, but an attribute named `attributes.abc-xyz` cannot be indexed. If
   * the attribute key starts with `attributes.`, then the attribute is a custom
   * attribute. Attributes such as `brands`, `patterns`, and `title` are
   * built-in and called system attributes.
   */
  key?: string;
  /**
   * If RETRIEVABLE_ENABLED, attribute values are retrievable in the search
   * results. If unset, the server behavior defaults to RETRIEVABLE_DISABLED.
   */
  retrievableOption?:  | "RETRIEVABLE_OPTION_UNSPECIFIED" | "RETRIEVABLE_ENABLED" | "RETRIEVABLE_DISABLED";
  /**
   * When AttributesConfig.attribute_config_level is
   * CATALOG_LEVEL_ATTRIBUTE_CONFIG, if SEARCHABLE_ENABLED, attribute values are
   * searchable by text queries in SearchService.Search. If SEARCHABLE_ENABLED
   * but attribute type is numerical, attribute values will not be searchable by
   * text queries in SearchService.Search, as there are no text values
   * associated to numerical attributes. Must be specified, otherwise throws
   * INVALID_FORMAT error.
   */
  searchableOption?:  | "SEARCHABLE_OPTION_UNSPECIFIED" | "SEARCHABLE_ENABLED" | "SEARCHABLE_DISABLED";
  /**
   * Output only. The type of this attribute. This is derived from the
   * attribute in Product.attributes.
   */
  readonly type?:  | "UNKNOWN" | "TEXTUAL" | "NUMERICAL";
}

/**
 * The color information of a Product.
 */
export interface GoogleCloudRetailV2ColorInfo {
  /**
   * The standard color families. Strongly recommended to use the following
   * standard color groups: "Red", "Pink", "Orange", "Yellow", "Purple",
   * "Green", "Cyan", "Blue", "Brown", "White", "Gray", "Black" and "Mixed".
   * Normally it is expected to have only 1 color family. May consider using
   * single "Mixed" instead of multiple values. A maximum of 5 values are
   * allowed. Each value must be a UTF-8 encoded string with a length limit of
   * 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google
   * Merchant Center property
   * [color](https://support.google.com/merchants/answer/6324487). Schema.org
   * property [Product.color](https://schema.org/color).
   */
  colorFamilies?: string[];
  /**
   * The color display names, which may be different from standard color family
   * names, such as the color aliases used in the website frontend. Normally it
   * is expected to have only 1 color. May consider using single "Mixed" instead
   * of multiple values. A maximum of 75 colors are allowed. Each value must be
   * a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned. Google Merchant Center property
   * [color](https://support.google.com/merchants/answer/6324487). Schema.org
   * property [Product.color](https://schema.org/color).
   */
  colors?: string[];
}

/**
 * Response of the autocomplete query.
 */
export interface GoogleCloudRetailV2CompleteQueryResponse {
  /**
   * A unique complete token. This should be included in the
   * UserEvent.completion_detail for search events resulting from this
   * completion, which enables accurate attribution of complete model
   * performance.
   */
  attributionToken?: string;
  /**
   * Results of the matching suggestions. The result list is ordered and the
   * first result is top suggestion.
   */
  completionResults?: GoogleCloudRetailV2CompleteQueryResponseCompletionResult[];
  /**
   * Matched recent searches of this user. The maximum number of recent
   * searches is 10. This field is a restricted feature. Contact Retail Search
   * support team if you are interested in enabling it. This feature is only
   * available when CompleteQueryRequest.visitor_id field is set and UserEvent
   * is imported. The recent searches satisfy the follow rules: * They are
   * ordered from latest to oldest. * They are matched with
   * CompleteQueryRequest.query case insensitively. * They are transformed to
   * lower case. * They are UTF-8 safe. Recent searches are deduplicated. More
   * recent searches will be reserved when duplication happens.
   */
  recentSearchResults?: GoogleCloudRetailV2CompleteQueryResponseRecentSearchResult[];
}

/**
 * Resource that represents completion results.
 */
export interface GoogleCloudRetailV2CompleteQueryResponseCompletionResult {
  /**
   * Custom attributes for the suggestion term. * For "user-data", the
   * attributes are additional custom attributes ingested through BigQuery. *
   * For "cloud-retail", the attributes are product attributes generated by
   * Cloud Retail. It requires UserEvent.product_details is imported properly.
   */
  attributes?: {
    [key: string]: GoogleCloudRetailV2CustomAttribute
  };
  /**
   * The suggestion for the query.
   */
  suggestion?: string;
}

/**
 * Recent search of this user.
 */
export interface GoogleCloudRetailV2CompleteQueryResponseRecentSearchResult {
  /**
   * The recent search query.
   */
  recentSearch?: string;
}

/**
 * Catalog level autocomplete config for customers to customize autocomplete
 * feature's settings.
 */
export interface GoogleCloudRetailV2CompletionConfig {
  /**
   * Output only. The source data for the latest import of the autocomplete
   * allowlist phrases.
   */
  readonly allowlistInputConfig?: GoogleCloudRetailV2CompletionDataInputConfig;
  /**
   * If set to true, the auto learning function is enabled. Auto learning uses
   * user data to generate suggestions using ML techniques. Default value is
   * false. Only after enabling auto learning can users use `cloud-retail` data
   * in CompleteQueryRequest.
   */
  autoLearning?: boolean;
  /**
   * Output only. The source data for the latest import of the autocomplete
   * denylist phrases.
   */
  readonly denylistInputConfig?: GoogleCloudRetailV2CompletionDataInputConfig;
  /**
   * Output only. Name of the LRO corresponding to the latest allowlist import.
   * Can use GetOperation API to retrieve the latest state of the Long Running
   * Operation.
   */
  readonly lastAllowlistImportOperation?: string;
  /**
   * Output only. Name of the LRO corresponding to the latest denylist import.
   * Can use GetOperation API to retrieve the latest state of the Long Running
   * Operation.
   */
  readonly lastDenylistImportOperation?: string;
  /**
   * Output only. Name of the LRO corresponding to the latest suggestion terms
   * list import. Can use GetOperation API to retrieve the latest state of the
   * Long Running Operation.
   */
  readonly lastSuggestionsImportOperation?: string;
  /**
   * Specifies the matching order for autocomplete suggestions, e.g., a query
   * consisting of 'sh' with 'out-of-order' specified would suggest "women's
   * shoes", whereas a query of 'red s' with 'exact-prefix' specified would
   * suggest "red shoes". Currently supported values: * 'out-of-order' *
   * 'exact-prefix' Default value: 'exact-prefix'.
   */
  matchingOrder?: string;
  /**
   * The maximum number of autocomplete suggestions returned per term. Default
   * value is 20. If left unset or set to 0, then will fallback to default
   * value. Value range is 1 to 20.
   */
  maxSuggestions?: number;
  /**
   * The minimum number of characters needed to be typed in order to get
   * suggestions. Default value is 2. If left unset or set to 0, then will
   * fallback to default value. Value range is 1 to 20.
   */
  minPrefixLength?: number;
  /**
   * Required. Immutable. Fully qualified name
   * `projects/*\/locations/*\/catalogs/*\/completionConfig`
   */
  name?: string;
  /**
   * Output only. The source data for the latest import of the autocomplete
   * suggestion phrases.
   */
  readonly suggestionsInputConfig?: GoogleCloudRetailV2CompletionDataInputConfig;
}

/**
 * The input config source for completion data.
 */
export interface GoogleCloudRetailV2CompletionDataInputConfig {
  /**
   * Required. BigQuery input source. Add the IAM permission "BigQuery Data
   * Viewer" for cloud-retail-customer-data-access@system.gserviceaccount.com
   * before using this feature otherwise an error is thrown.
   */
  bigQuerySource?: GoogleCloudRetailV2BigQuerySource;
}

/**
 * Detailed completion information including completion attribution token and
 * clicked completion info.
 */
export interface GoogleCloudRetailV2CompletionDetail {
  /**
   * Completion attribution token in CompleteQueryResponse.attribution_token.
   */
  completionAttributionToken?: string;
  /**
   * End user selected CompleteQueryResponse.CompletionResult.suggestion
   * position, starting from 0.
   */
  selectedPosition?: number;
  /**
   * End user selected CompleteQueryResponse.CompletionResult.suggestion.
   */
  selectedSuggestion?: string;
}

/**
 * Metadata that is used to define a condition that triggers an action. A valid
 * condition must specify at least one of 'query_terms' or 'products_filter'. If
 * multiple fields are specified, the condition is met if all the fields are
 * satisfied e.g. if a set of query terms and product_filter are set, then only
 * items matching the product_filter for requests with a query matching the
 * query terms wil get boosted.
 */
export interface GoogleCloudRetailV2Condition {
  /**
   * Range of time(s) specifying when Condition is active. Condition true if
   * any time range matches.
   */
  activeTimeRange?: GoogleCloudRetailV2ConditionTimeRange[];
  /**
   * A list (up to 10 entries) of terms to match the query on. If not
   * specified, match all queries. If many query terms are specified, the
   * condition is matched if any of the terms is a match (i.e. using the OR
   * operator).
   */
  queryTerms?: GoogleCloudRetailV2ConditionQueryTerm[];
}

function serializeGoogleCloudRetailV2Condition(data: any): GoogleCloudRetailV2Condition {
  return {
    ...data,
    activeTimeRange: data["activeTimeRange"] !== undefined ? data["activeTimeRange"].map((item: any) => (serializeGoogleCloudRetailV2ConditionTimeRange(item))) : undefined,
  };
}

function deserializeGoogleCloudRetailV2Condition(data: any): GoogleCloudRetailV2Condition {
  return {
    ...data,
    activeTimeRange: data["activeTimeRange"] !== undefined ? data["activeTimeRange"].map((item: any) => (deserializeGoogleCloudRetailV2ConditionTimeRange(item))) : undefined,
  };
}

/**
 * Query terms that we want to match on.
 */
export interface GoogleCloudRetailV2ConditionQueryTerm {
  /**
   * Whether this is supposed to be a full or partial match.
   */
  fullMatch?: boolean;
  /**
   * The value of the term to match on. Value cannot be empty. Value can have
   * at most 3 terms if specified as a partial match. Each space separated
   * string is considered as one term. For example, "a b c" is 3 terms and
   * allowed, but " a b c d" is 4 terms and not allowed for a partial match.
   */
  value?: string;
}

/**
 * Used for time-dependent conditions. Example: Want to have rule applied for
 * week long sale.
 */
export interface GoogleCloudRetailV2ConditionTimeRange {
  /**
   * End of time range. Range is inclusive.
   */
  endTime?: Date;
  /**
   * Start of time range. Range is inclusive.
   */
  startTime?: Date;
}

function serializeGoogleCloudRetailV2ConditionTimeRange(data: any): GoogleCloudRetailV2ConditionTimeRange {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRetailV2ConditionTimeRange(data: any): GoogleCloudRetailV2ConditionTimeRange {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Configures dynamic metadata that can be linked to a ServingConfig and affect
 * search or recommendation results at serving time.
 */
export interface GoogleCloudRetailV2Control {
  /**
   * Output only. List of serving config ids that are associated with this
   * control in the same Catalog. Note the association is managed via the
   * ServingConfig, this is an output only denormalized view.
   */
  readonly associatedServingConfigIds?: string[];
  /**
   * Required. The human readable control display name. Used in Retail UI. This
   * field must be a UTF-8 encoded string with a length limit of 128 characters.
   * Otherwise, an INVALID_ARGUMENT error is thrown.
   */
  displayName?: string;
  /**
   * Immutable. Fully qualified name
   * `projects/*\/locations/global/catalogs/*\/controls/*`
   */
  name?: string;
  /**
   * A rule control - a condition-action pair. Enacts a set action when the
   * condition is triggered. For example: Boost "gShoe" when query full matches
   * "Running Shoes".
   */
  rule?: GoogleCloudRetailV2Rule;
  /**
   * Specifies the use case for the control. Affects what condition fields can
   * be set. Only settable by search controls. Will default to
   * SEARCH_SOLUTION_USE_CASE_SEARCH if not specified. Currently only allow one
   * search_solution_use_case per control.
   */
  searchSolutionUseCase?:  | "SEARCH_SOLUTION_USE_CASE_UNSPECIFIED" | "SEARCH_SOLUTION_USE_CASE_SEARCH" | "SEARCH_SOLUTION_USE_CASE_BROWSE"[];
  /**
   * Required. Immutable. The solution types that the control is used for.
   * Currently we support setting only one type of solution at creation time.
   * Only `SOLUTION_TYPE_SEARCH` value is supported at the moment. If no
   * solution type is provided at creation time, will default to
   * SOLUTION_TYPE_SEARCH.
   */
  solutionTypes?:  | "SOLUTION_TYPE_UNSPECIFIED" | "SOLUTION_TYPE_RECOMMENDATION" | "SOLUTION_TYPE_SEARCH"[];
}

function serializeGoogleCloudRetailV2Control(data: any): GoogleCloudRetailV2Control {
  return {
    ...data,
    rule: data["rule"] !== undefined ? serializeGoogleCloudRetailV2Rule(data["rule"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2Control(data: any): GoogleCloudRetailV2Control {
  return {
    ...data,
    rule: data["rule"] !== undefined ? deserializeGoogleCloudRetailV2Rule(data["rule"]) : undefined,
  };
}

/**
 * Metadata associated with a create operation.
 */
export interface GoogleCloudRetailV2CreateModelMetadata {
  /**
   * The resource name of the model that this create applies to. Format:
   * `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}`
   */
  model?: string;
}

/**
 * A custom attribute that is not explicitly modeled in Product.
 */
export interface GoogleCloudRetailV2CustomAttribute {
  /**
   * This field is normally ignored unless
   * AttributesConfig.attribute_config_level of the Catalog is set to the
   * deprecated 'PRODUCT_LEVEL_ATTRIBUTE_CONFIG' mode. For information about
   * product-level attribute configuration, see [Configuration
   * modes](https://cloud.google.com/retail/docs/attribute-config#config-modes).
   * If true, custom attribute values are indexed, so that they can be filtered,
   * faceted or boosted in SearchService.Search. This field is ignored in a
   * UserEvent. See SearchRequest.filter, SearchRequest.facet_specs and
   * SearchRequest.boost_spec for more details.
   */
  indexable?: boolean;
  /**
   * The numerical values of this custom attribute. For example, `[2.3, 15.4]`
   * when the key is "lengths_cm". Exactly one of text or numbers should be set.
   * Otherwise, an INVALID_ARGUMENT error is returned.
   */
  numbers?: number[];
  /**
   * This field is normally ignored unless
   * AttributesConfig.attribute_config_level of the Catalog is set to the
   * deprecated 'PRODUCT_LEVEL_ATTRIBUTE_CONFIG' mode. For information about
   * product-level attribute configuration, see [Configuration
   * modes](https://cloud.google.com/retail/docs/attribute-config#config-modes).
   * If true, custom attribute values are searchable by text queries in
   * SearchService.Search. This field is ignored in a UserEvent. Only set if
   * type text is set. Otherwise, a INVALID_ARGUMENT error is returned.
   */
  searchable?: boolean;
  /**
   * The textual values of this custom attribute. For example, `["yellow",
   * "green"]` when the key is "color". Empty string is not allowed. Otherwise,
   * an INVALID_ARGUMENT error is returned. Exactly one of text or numbers
   * should be set. Otherwise, an INVALID_ARGUMENT error is returned.
   */
  text?: string[];
}

/**
 * Metadata for active A/B testing Experiments.
 */
export interface GoogleCloudRetailV2ExperimentInfo {
  /**
   * The fully qualified resource name of the experiment that provides the
   * serving config under test, should an active experiment exist. For example:
   * `projects/*\/locations/global/catalogs/default_catalog/experiments/experiment_id`
   */
  experimentName?: string;
  /**
   * A/B test between existing Cloud Retail Search ServingConfigs.
   */
  servingConfigExperiment?: GoogleCloudRetailV2ExperimentInfoServingConfigExperiment;
}

/**
 * Metadata for active serving config A/B tests.
 */
export interface GoogleCloudRetailV2ExperimentInfoServingConfigExperiment {
  /**
   * The fully qualified resource name of the serving config
   * VariantArm.serving_config_id responsible for generating the search
   * response. For example:
   * `projects/*\/locations/*\/catalogs/*\/servingConfigs/*`.
   */
  experimentServingConfig?: string;
  /**
   * The fully qualified resource name of the original SearchRequest.placement
   * in the search request prior to reassignment by experiment API. For example:
   * `projects/*\/locations/*\/catalogs/*\/servingConfigs/*`.
   */
  originalServingConfig?: string;
}

/**
 * Fulfillment information, such as the store IDs for in-store pickup or region
 * IDs for different shipping methods.
 */
export interface GoogleCloudRetailV2FulfillmentInfo {
  /**
   * The IDs for this type, such as the store IDs for
   * FulfillmentInfo.type.pickup-in-store or the region IDs for
   * FulfillmentInfo.type.same-day-delivery. A maximum of 3000 values are
   * allowed. Each value must be a string with a length limit of 30 characters,
   * matching the pattern `[a-zA-Z0-9_-]+`, such as "store1" or "REGION-2".
   * Otherwise, an INVALID_ARGUMENT error is returned.
   */
  placeIds?: string[];
  /**
   * The fulfillment type, including commonly used types (such as pickup in
   * store and same day delivery), and custom types. Customers have to map
   * custom types to their display names before rendering UI. Supported values:
   * * "pickup-in-store" * "ship-to-store" * "same-day-delivery" *
   * "next-day-delivery" * "custom-type-1" * "custom-type-2" * "custom-type-3" *
   * "custom-type-4" * "custom-type-5" If this field is set to an invalid value
   * other than these, an INVALID_ARGUMENT error is returned.
   */
  type?: string;
}

/**
 * Google Cloud Storage location for input content.
 */
export interface GoogleCloudRetailV2GcsSource {
  /**
   * The schema to use when parsing the data from the source. Supported values
   * for product imports: * `product` (default): One JSON Product per line. Each
   * product must have a valid Product.id. * `product_merchant_center`: See
   * [Importing catalog data from Merchant
   * Center](https://cloud.google.com/retail/recommendations-ai/docs/upload-catalog#mc).
   * Supported values for user events imports: * `user_event` (default): One
   * JSON UserEvent per line. * `user_event_ga360`: Using
   * https://support.google.com/analytics/answer/3437719. Supported values for
   * control imports: * `control` (default): One JSON Control per line.
   * Supported values for catalog attribute imports: * `catalog_attribute`
   * (default): One CSV CatalogAttribute per line.
   */
  dataSchema?: string;
  /**
   * Required. Google Cloud Storage URIs to input files. URI can be up to 2000
   * characters long. URIs can match the full object path (for example,
   * `gs://bucket/directory/object.json`) or a pattern matching one or more
   * files, such as `gs://bucket/directory/*.json`. A request can contain at
   * most 100 files, and each file can be up to 2 GB. See [Importing product
   * information](https://cloud.google.com/retail/recommendations-ai/docs/upload-catalog)
   * for the expected file format and setup instructions.
   */
  inputUris?: string[];
}

/**
 * Response message of CatalogService.GetDefaultBranch.
 */
export interface GoogleCloudRetailV2GetDefaultBranchResponse {
  /**
   * Full resource name of the branch id currently set as default branch.
   */
  branch?: string;
  /**
   * This corresponds to SetDefaultBranchRequest.note field, when this branch
   * was set as default.
   */
  note?: string;
  /**
   * The time when this branch is set to default.
   */
  setTime?: Date;
}

function serializeGoogleCloudRetailV2GetDefaultBranchResponse(data: any): GoogleCloudRetailV2GetDefaultBranchResponse {
  return {
    ...data,
    setTime: data["setTime"] !== undefined ? data["setTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRetailV2GetDefaultBranchResponse(data: any): GoogleCloudRetailV2GetDefaultBranchResponse {
  return {
    ...data,
    setTime: data["setTime"] !== undefined ? new Date(data["setTime"]) : undefined,
  };
}

/**
 * Product image. Recommendations AI and Retail Search do not use product
 * images to improve prediction and search results. However, product images can
 * be returned in results, and are shown in prediction or search previews in the
 * console.
 */
export interface GoogleCloudRetailV2Image {
  /**
   * Height of the image in number of pixels. This field must be nonnegative.
   * Otherwise, an INVALID_ARGUMENT error is returned.
   */
  height?: number;
  /**
   * Required. URI of the image. This field must be a valid UTF-8 encoded URI
   * with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT
   * error is returned. Google Merchant Center property
   * [image_link](https://support.google.com/merchants/answer/6324350).
   * Schema.org property [Product.image](https://schema.org/image).
   */
  uri?: string;
  /**
   * Width of the image in number of pixels. This field must be nonnegative.
   * Otherwise, an INVALID_ARGUMENT error is returned.
   */
  width?: number;
}

/**
 * Request message for ImportCompletionData methods.
 */
export interface GoogleCloudRetailV2ImportCompletionDataRequest {
  /**
   * Required. The desired input location of the data.
   */
  inputConfig?: GoogleCloudRetailV2CompletionDataInputConfig;
  /**
   * Pub/Sub topic for receiving notification. If this field is set, when the
   * import is finished, a notification is sent to specified Pub/Sub topic. The
   * message data is JSON string of a Operation. Format of the Pub/Sub topic is
   * `projects/{project}/topics/{topic}`.
   */
  notificationPubsubTopic?: string;
}

/**
 * Response of the ImportCompletionDataRequest. If the long running operation
 * is done, this message is returned by the
 * google.longrunning.Operations.response field if the operation is successful.
 */
export interface GoogleCloudRetailV2ImportCompletionDataResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
}

/**
 * Configuration of destination for Import related errors.
 */
export interface GoogleCloudRetailV2ImportErrorsConfig {
  /**
   * Google Cloud Storage prefix for import errors. This must be an empty,
   * existing Cloud Storage directory. Import errors are written to sharded
   * files in this directory, one per line, as a JSON-encoded
   * `google.rpc.Status` message.
   */
  gcsPrefix?: string;
}

/**
 * Metadata related to the progress of the Import operation. This is returned
 * by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudRetailV2ImportMetadata {
  /**
   * Operation create time.
   */
  createTime?: Date;
  /**
   * Count of entries that encountered errors while processing.
   */
  failureCount?: bigint;
  /**
   * Pub/Sub topic for receiving notification. If this field is set, when the
   * import is finished, a notification is sent to specified Pub/Sub topic. The
   * message data is JSON string of a Operation. Format of the Pub/Sub topic is
   * `projects/{project}/topics/{topic}`.
   */
  notificationPubsubTopic?: string;
  /**
   * Deprecated. This field is never set.
   */
  requestId?: string;
  /**
   * Count of entries that were processed successfully.
   */
  successCount?: bigint;
  /**
   * Operation last update time. If the operation is done, this is also the
   * finish time.
   */
  updateTime?: Date;
}

function serializeGoogleCloudRetailV2ImportMetadata(data: any): GoogleCloudRetailV2ImportMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    failureCount: data["failureCount"] !== undefined ? String(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? String(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRetailV2ImportMetadata(data: any): GoogleCloudRetailV2ImportMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    failureCount: data["failureCount"] !== undefined ? BigInt(data["failureCount"]) : undefined,
    successCount: data["successCount"] !== undefined ? BigInt(data["successCount"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Request message for Import methods.
 */
export interface GoogleCloudRetailV2ImportProductsRequest {
  /**
   * The desired location of errors incurred during the Import.
   */
  errorsConfig?: GoogleCloudRetailV2ImportErrorsConfig;
  /**
   * Required. The desired input location of the data.
   */
  inputConfig?: GoogleCloudRetailV2ProductInputConfig;
  /**
   * Full Pub/Sub topic name for receiving notification. If this field is set,
   * when the import is finished, a notification is sent to specified Pub/Sub
   * topic. The message data is JSON string of a Operation. Format of the
   * Pub/Sub topic is `projects/{project}/topics/{topic}`. It has to be within
   * the same project as ImportProductsRequest.parent. Make sure that
   * `service-@gcp-sa-retail.iam.gserviceaccount.com` has the
   * `pubsub.topics.publish` IAM permission on the topic.
   */
  notificationPubsubTopic?: string;
  /**
   * The mode of reconciliation between existing products and the products to
   * be imported. Defaults to ReconciliationMode.INCREMENTAL.
   */
  reconciliationMode?:  | "RECONCILIATION_MODE_UNSPECIFIED" | "INCREMENTAL" | "FULL";
  /**
   * Deprecated. This field has no effect.
   */
  requestId?: string;
  /**
   * Indicates which fields in the provided imported `products` to update. If
   * not set, all fields are updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleCloudRetailV2ImportProductsRequest(data: any): GoogleCloudRetailV2ImportProductsRequest {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? serializeGoogleCloudRetailV2ProductInputConfig(data["inputConfig"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleCloudRetailV2ImportProductsRequest(data: any): GoogleCloudRetailV2ImportProductsRequest {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? deserializeGoogleCloudRetailV2ProductInputConfig(data["inputConfig"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Response of the ImportProductsRequest. If the long running operation is
 * done, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudRetailV2ImportProductsResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * Echoes the destination for the complete errors in the request if set.
   */
  errorsConfig?: GoogleCloudRetailV2ImportErrorsConfig;
}

/**
 * Request message for the ImportUserEvents request.
 */
export interface GoogleCloudRetailV2ImportUserEventsRequest {
  /**
   * The desired location of errors incurred during the Import. Cannot be set
   * for inline user event imports.
   */
  errorsConfig?: GoogleCloudRetailV2ImportErrorsConfig;
  /**
   * Required. The desired input location of the data.
   */
  inputConfig?: GoogleCloudRetailV2UserEventInputConfig;
}

function serializeGoogleCloudRetailV2ImportUserEventsRequest(data: any): GoogleCloudRetailV2ImportUserEventsRequest {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? serializeGoogleCloudRetailV2UserEventInputConfig(data["inputConfig"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2ImportUserEventsRequest(data: any): GoogleCloudRetailV2ImportUserEventsRequest {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? deserializeGoogleCloudRetailV2UserEventInputConfig(data["inputConfig"]) : undefined,
  };
}

/**
 * Response of the ImportUserEventsRequest. If the long running operation was
 * successful, then this message is returned by the
 * google.longrunning.Operations.response field if the operation was successful.
 */
export interface GoogleCloudRetailV2ImportUserEventsResponse {
  /**
   * A sample of errors encountered while processing the request.
   */
  errorSamples?: GoogleRpcStatus[];
  /**
   * Echoes the destination for the complete errors if this field was set in
   * the request.
   */
  errorsConfig?: GoogleCloudRetailV2ImportErrorsConfig;
  /**
   * Aggregated statistics of user event import status.
   */
  importSummary?: GoogleCloudRetailV2UserEventImportSummary;
}

function serializeGoogleCloudRetailV2ImportUserEventsResponse(data: any): GoogleCloudRetailV2ImportUserEventsResponse {
  return {
    ...data,
    importSummary: data["importSummary"] !== undefined ? serializeGoogleCloudRetailV2UserEventImportSummary(data["importSummary"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2ImportUserEventsResponse(data: any): GoogleCloudRetailV2ImportUserEventsResponse {
  return {
    ...data,
    importSummary: data["importSummary"] !== undefined ? deserializeGoogleCloudRetailV2UserEventImportSummary(data["importSummary"]) : undefined,
  };
}

/**
 * A floating point interval.
 */
export interface GoogleCloudRetailV2Interval {
  /**
   * Exclusive upper bound.
   */
  exclusiveMaximum?: number;
  /**
   * Exclusive lower bound.
   */
  exclusiveMinimum?: number;
  /**
   * Inclusive upper bound.
   */
  maximum?: number;
  /**
   * Inclusive lower bound.
   */
  minimum?: number;
}

/**
 * Response for CatalogService.ListCatalogs method.
 */
export interface GoogleCloudRetailV2ListCatalogsResponse {
  /**
   * All the customer's Catalogs.
   */
  catalogs?: GoogleCloudRetailV2Catalog[];
  /**
   * A token that can be sent as ListCatalogsRequest.page_token to retrieve the
   * next page. If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response for ListControls method.
 */
export interface GoogleCloudRetailV2ListControlsResponse {
  /**
   * All the Controls for a given catalog.
   */
  controls?: GoogleCloudRetailV2Control[];
  /**
   * Pagination token, if not returned indicates the last page.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudRetailV2ListControlsResponse(data: any): GoogleCloudRetailV2ListControlsResponse {
  return {
    ...data,
    controls: data["controls"] !== undefined ? data["controls"].map((item: any) => (serializeGoogleCloudRetailV2Control(item))) : undefined,
  };
}

function deserializeGoogleCloudRetailV2ListControlsResponse(data: any): GoogleCloudRetailV2ListControlsResponse {
  return {
    ...data,
    controls: data["controls"] !== undefined ? data["controls"].map((item: any) => (deserializeGoogleCloudRetailV2Control(item))) : undefined,
  };
}

/**
 * Response to a ListModelRequest.
 */
export interface GoogleCloudRetailV2ListModelsResponse {
  /**
   * List of Models.
   */
  models?: GoogleCloudRetailV2Model[];
  /**
   * Pagination token, if not returned indicates the last page.
   */
  nextPageToken?: string;
}

/**
 * Response message for ProductService.ListProducts method.
 */
export interface GoogleCloudRetailV2ListProductsResponse {
  /**
   * A token that can be sent as ListProductsRequest.page_token to retrieve the
   * next page. If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The Products.
   */
  products?: GoogleCloudRetailV2Product[];
}

function serializeGoogleCloudRetailV2ListProductsResponse(data: any): GoogleCloudRetailV2ListProductsResponse {
  return {
    ...data,
    products: data["products"] !== undefined ? data["products"].map((item: any) => (serializeGoogleCloudRetailV2Product(item))) : undefined,
  };
}

function deserializeGoogleCloudRetailV2ListProductsResponse(data: any): GoogleCloudRetailV2ListProductsResponse {
  return {
    ...data,
    products: data["products"] !== undefined ? data["products"].map((item: any) => (deserializeGoogleCloudRetailV2Product(item))) : undefined,
  };
}

/**
 * Response for ListServingConfigs method.
 */
export interface GoogleCloudRetailV2ListServingConfigsResponse {
  /**
   * Pagination token, if not returned indicates the last page.
   */
  nextPageToken?: string;
  /**
   * All the ServingConfigs for a given catalog.
   */
  servingConfigs?: GoogleCloudRetailV2ServingConfig[];
}

/**
 * The inventory information at a place (e.g. a store) identified by a place
 * ID.
 */
export interface GoogleCloudRetailV2LocalInventory {
  /**
   * Additional local inventory attributes, for example, store name, promotion
   * tags, etc. This field needs to pass all below criteria, otherwise an
   * INVALID_ARGUMENT error is returned: * At most 30 attributes are allowed. *
   * The key must be a UTF-8 encoded string with a length limit of 32
   * characters. * The key must match the pattern: `a-zA-Z0-9*`. For example,
   * key0LikeThis or KEY_1_LIKE_THIS. * The attribute values must be of the same
   * type (text or number). * Only 1 value is allowed for each attribute. * For
   * text values, the length limit is 256 UTF-8 characters. * The attribute does
   * not support search. The `searchable` field should be unset or set to false.
   * * The max summed total bytes of custom attribute keys and values per
   * product is 5MiB.
   */
  attributes?: {
    [key: string]: GoogleCloudRetailV2CustomAttribute
  };
  /**
   * Input only. Supported fulfillment types. Valid fulfillment type values
   * include commonly used types (such as pickup in store and same day
   * delivery), and custom types. Customers have to map custom types to their
   * display names before rendering UI. Supported values: * "pickup-in-store" *
   * "ship-to-store" * "same-day-delivery" * "next-day-delivery" *
   * "custom-type-1" * "custom-type-2" * "custom-type-3" * "custom-type-4" *
   * "custom-type-5" If this field is set to an invalid value other than these,
   * an INVALID_ARGUMENT error is returned. All the elements must be distinct.
   * Otherwise, an INVALID_ARGUMENT error is returned.
   */
  fulfillmentTypes?: string[];
  /**
   * The place ID for the current set of inventory information.
   */
  placeId?: string;
  /**
   * Product price and cost information. Google Merchant Center property
   * [price](https://support.google.com/merchants/answer/6324371).
   */
  priceInfo?: GoogleCloudRetailV2PriceInfo;
}

function serializeGoogleCloudRetailV2LocalInventory(data: any): GoogleCloudRetailV2LocalInventory {
  return {
    ...data,
    priceInfo: data["priceInfo"] !== undefined ? serializeGoogleCloudRetailV2PriceInfo(data["priceInfo"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2LocalInventory(data: any): GoogleCloudRetailV2LocalInventory {
  return {
    ...data,
    priceInfo: data["priceInfo"] !== undefined ? deserializeGoogleCloudRetailV2PriceInfo(data["priceInfo"]) : undefined,
  };
}

/**
 * Metadata that describes the training and serving parameters of a Model. A
 * Model can be associated with a ServingConfig and then queried through the
 * Predict API.
 */
export interface GoogleCloudRetailV2Model {
  /**
   * Output only. Timestamp the Recommendation Model was created at.
   */
  readonly createTime?: Date;
  /**
   * Output only. The state of data requirements for this model: `DATA_OK` and
   * `DATA_ERROR`. Recommendation model cannot be trained if the data is in
   * `DATA_ERROR` state. Recommendation model can have `DATA_ERROR` state even
   * if serving state is `ACTIVE`: models were trained successfully before, but
   * cannot be refreshed because model no longer has sufficient data for
   * training.
   */
  readonly dataState?:  | "DATA_STATE_UNSPECIFIED" | "DATA_OK" | "DATA_ERROR";
  /**
   * Required. The display name of the model. Should be human readable, used to
   * display Recommendation Models in the Retail Cloud Console Dashboard. UTF-8
   * encoded string with limit of 1024 characters.
   */
  displayName?: string;
  /**
   * Optional. If `RECOMMENDATIONS_FILTERING_ENABLED`, recommendation filtering
   * by attributes is enabled for the model.
   */
  filteringOption?:  | "RECOMMENDATIONS_FILTERING_OPTION_UNSPECIFIED" | "RECOMMENDATIONS_FILTERING_DISABLED" | "RECOMMENDATIONS_FILTERING_ENABLED";
  /**
   * Output only. The timestamp when the latest successful tune finished.
   */
  readonly lastTuneTime?: Date;
  /**
   * Required. The fully qualified resource name of the model. Format:
   * `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}`
   * catalog_id has char limit of 50. recommendation_model_id has char limit of
   * 40.
   */
  name?: string;
  /**
   * Optional. The optimization objective e.g. `cvr`. Currently supported
   * values: `ctr`, `cvr`, `revenue-per-order`. If not specified, we choose
   * default based on model type. Default depends on type of recommendation:
   * `recommended-for-you` => `ctr` `others-you-may-like` => `ctr`
   * `frequently-bought-together` => `revenue_per_order` This field together
   * with optimization_objective describe model metadata to use to control model
   * training and serving. See https://cloud.google.com/retail/docs/models for
   * more details on what the model metadata control and which combination of
   * parameters are valid. For invalid combinations of parameters (e.g. type =
   * `frequently-bought-together` and optimization_objective = `ctr`), you
   * receive an error 400 if you try to create/update a recommendation with this
   * set of knobs.
   */
  optimizationObjective?: string;
  /**
   * Optional. The state of periodic tuning. The period we use is 3 months - to
   * do a one-off tune earlier use the `TuneModel` method. Default value is
   * `PERIODIC_TUNING_ENABLED`.
   */
  periodicTuningState?:  | "PERIODIC_TUNING_STATE_UNSPECIFIED" | "PERIODIC_TUNING_DISABLED" | "ALL_TUNING_DISABLED" | "PERIODIC_TUNING_ENABLED";
  /**
   * Output only. The list of valid serving configs associated with the
   * PageOptimizationConfig.
   */
  readonly servingConfigLists?: GoogleCloudRetailV2ModelServingConfigList[];
  /**
   * Output only. The serving state of the model: `ACTIVE`, `NOT_ACTIVE`.
   */
  readonly servingState?:  | "SERVING_STATE_UNSPECIFIED" | "INACTIVE" | "ACTIVE" | "TUNED";
  /**
   * Optional. The training state that the model is in (e.g. `TRAINING` or
   * `PAUSED`). Since part of the cost of running the service is frequency of
   * training - this can be used to determine when to train model in order to
   * control cost. If not specified: the default value for `CreateModel` method
   * is `TRAINING`. The default value for `UpdateModel` method is to keep the
   * state the same as before.
   */
  trainingState?:  | "TRAINING_STATE_UNSPECIFIED" | "PAUSED" | "TRAINING";
  /**
   * Output only. The tune operation associated with the model. Can be used to
   * determine if there is an ongoing tune for this recommendation. Empty field
   * implies no tune is goig on.
   */
  readonly tuningOperation?: string;
  /**
   * Required. The type of model e.g. `home-page`. Currently supported values:
   * `recommended-for-you`, `others-you-may-like`, `frequently-bought-together`,
   * `page-optimization`, `similar-items`, `buy-it-again`, `on-sale-items`, and
   * `recently-viewed`(readonly value). This field together with
   * optimization_objective describe model metadata to use to control model
   * training and serving. See https://cloud.google.com/retail/docs/models for
   * more details on what the model metadata control and which combination of
   * parameters are valid. For invalid combinations of parameters (e.g. type =
   * `frequently-bought-together` and optimization_objective = `ctr`), you
   * receive an error 400 if you try to create/update a recommendation with this
   * set of knobs.
   */
  type?: string;
  /**
   * Output only. Timestamp the Recommendation Model was last updated. E.g. if
   * a Recommendation Model was paused - this would be the time the pause was
   * initiated.
   */
  readonly updateTime?: Date;
}

/**
 * Represents an ordered combination of valid serving configs, which can be
 * used for `PAGE_OPTIMIZATION` recommendations.
 */
export interface GoogleCloudRetailV2ModelServingConfigList {
  /**
   * Optional. A set of valid serving configs that may be used for
   * `PAGE_OPTIMIZATION`.
   */
  servingConfigIds?: string[];
}

/**
 * Request for pausing training of a model.
 */
export interface GoogleCloudRetailV2PauseModelRequest {
}

/**
 * Request message for Predict method.
 */
export interface GoogleCloudRetailV2PredictRequest {
  /**
   * Filter for restricting prediction results with a length limit of 5,000
   * characters. Accepts values for tags and the `filterOutOfStockItems` flag. *
   * Tag expressions. Restricts predictions to products that match all of the
   * specified tags. Boolean operators `OR` and `NOT` are supported if the
   * expression is enclosed in parentheses, and must be separated from the tag
   * values by a space. `-"tagA"` is also supported and is equivalent to `NOT
   * "tagA"`. Tag values must be double quoted UTF-8 encoded strings with a size
   * limit of 1,000 characters. Note: "Recently viewed" models don't support tag
   * filtering at the moment. * filterOutOfStockItems. Restricts predictions to
   * products that do not have a stockState value of OUT_OF_STOCK. Examples: *
   * tag=("Red" OR "Blue") tag="New-Arrival" tag=(NOT "promotional") *
   * filterOutOfStockItems tag=(-"promotional") * filterOutOfStockItems If your
   * filter blocks all prediction results, the API will return *no* results. If
   * instead you want empty result sets to return generic (unfiltered) popular
   * products, set `strictFiltering` to False in `PredictRequest.params`. Note
   * that the API will never return items with storageStatus of "EXPIRED" or
   * "DELETED" regardless of filter choices. If `filterSyntaxV2` is set to true
   * under the `params` field, then attribute-based expressions are expected
   * instead of the above described tag-based syntax. Examples: * (colors:
   * ANY("Red", "Blue")) AND NOT (categories: ANY("Phones")) * (brands:
   * ANY("Pixel")) AND (colors: ANY("Red") OR categories: ANY("Phones")) For
   * more information, see [Filter
   * recommendations](https://cloud.google.com/retail/docs/filter-recs).
   */
  filter?: string;
  /**
   * The labels applied to a resource must meet the following requirements: *
   * Each resource can have multiple labels, up to a maximum of 64. * Each label
   * must be a key-value pair. * Keys have a minimum length of 1 character and a
   * maximum length of 63 characters and cannot be empty. Values can be empty
   * and have a maximum length of 63 characters. * Keys and values can contain
   * only lowercase letters, numeric characters, underscores, and dashes. All
   * characters must use UTF-8 encoding, and international characters are
   * allowed. * The key portion of a label must be unique. However, you can use
   * the same key with multiple resources. * Keys must start with a lowercase
   * letter or international character. See [Google Cloud
   * Document](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements)
   * for more details.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Maximum number of results to return. Set this property to the number of
   * prediction results needed. If zero, the service will choose a reasonable
   * default. The maximum allowed value is 100. Values above 100 will be coerced
   * to 100.
   */
  pageSize?: number;
  /**
   * This field is not used; leave it unset.
   */
  pageToken?: string;
  /**
   * Additional domain specific parameters for the predictions. Allowed values:
   * * `returnProduct`: Boolean. If set to true, the associated product object
   * will be returned in the `results.metadata` field in the prediction
   * response. * `returnScore`: Boolean. If set to true, the prediction 'score'
   * corresponding to each returned product will be set in the
   * `results.metadata` field in the prediction response. The given 'score'
   * indicates the probability of a product being clicked/purchased given the
   * user's context and history. * `strictFiltering`: Boolean. True by default.
   * If set to false, the service will return generic (unfiltered) popular
   * products instead of empty if your filter blocks all prediction results. *
   * `priceRerankLevel`: String. Default empty. If set to be non-empty, then it
   * needs to be one of {'no-price-reranking', 'low-price-reranking',
   * 'medium-price-reranking', 'high-price-reranking'}. This gives request-level
   * control and adjusts prediction results based on product price. *
   * `diversityLevel`: String. Default empty. If set to be non-empty, then it
   * needs to be one of {'no-diversity', 'low-diversity', 'medium-diversity',
   * 'high-diversity', 'auto-diversity'}. This gives request-level control and
   * adjusts prediction results based on product category. * `filterSyntaxV2`:
   * Boolean. False by default. If set to true, the `filter` field is
   * interpreteted according to the new, attribute-based syntax.
   */
  params?: {
    [key: string]: any
  };
  /**
   * Required. Context about the user, what they are looking at and what action
   * they took to trigger the predict request. Note that this user event detail
   * won't be ingested to userEvent logs. Thus, a separate userEvent write
   * request is required for event logging. Don't set UserEvent.visitor_id or
   * UserInfo.user_id to the same fixed ID for different users. If you are
   * trying to receive non-personalized recommendations (not recommended; this
   * can negatively impact model performance), instead set UserEvent.visitor_id
   * to a random unique ID and leave UserInfo.user_id unset.
   */
  userEvent?: GoogleCloudRetailV2UserEvent;
  /**
   * Use validate only mode for this prediction query. If set to true, a dummy
   * model will be used that returns arbitrary products. Note that the validate
   * only mode should only be used for testing the API, or if the model is not
   * ready.
   */
  validateOnly?: boolean;
}

function serializeGoogleCloudRetailV2PredictRequest(data: any): GoogleCloudRetailV2PredictRequest {
  return {
    ...data,
    userEvent: data["userEvent"] !== undefined ? serializeGoogleCloudRetailV2UserEvent(data["userEvent"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2PredictRequest(data: any): GoogleCloudRetailV2PredictRequest {
  return {
    ...data,
    userEvent: data["userEvent"] !== undefined ? deserializeGoogleCloudRetailV2UserEvent(data["userEvent"]) : undefined,
  };
}

/**
 * Response message for predict method.
 */
export interface GoogleCloudRetailV2PredictResponse {
  /**
   * A unique attribution token. This should be included in the UserEvent logs
   * resulting from this recommendation, which enables accurate attribution of
   * recommendation model performance.
   */
  attributionToken?: string;
  /**
   * IDs of products in the request that were missing from the inventory.
   */
  missingIds?: string[];
  /**
   * A list of recommended products. The order represents the ranking (from the
   * most relevant product to the least).
   */
  results?: GoogleCloudRetailV2PredictResponsePredictionResult[];
  /**
   * True if the validateOnly property was set in the request.
   */
  validateOnly?: boolean;
}

/**
 * PredictionResult represents the recommendation prediction results.
 */
export interface GoogleCloudRetailV2PredictResponsePredictionResult {
  /**
   * ID of the recommended product
   */
  id?: string;
  /**
   * Additional product metadata / annotations. Possible values: * `product`:
   * JSON representation of the product. Is set if `returnProduct` is set to
   * true in `PredictRequest.params`. * `score`: Prediction score in double
   * value. Is set if `returnScore` is set to true in `PredictRequest.params`.
   */
  metadata?: {
    [key: string]: any
  };
}

/**
 * The price information of a Product.
 */
export interface GoogleCloudRetailV2PriceInfo {
  /**
   * The costs associated with the sale of a particular product. Used for gross
   * profit reporting. * Profit = price - cost Google Merchant Center property
   * [cost_of_goods_sold](https://support.google.com/merchants/answer/9017895).
   */
  cost?: number;
  /**
   * The 3-letter currency code defined in [ISO
   * 4217](https://www.iso.org/iso-4217-currency-codes.html). If this field is
   * an unrecognizable currency code, an INVALID_ARGUMENT error is returned. The
   * Product.Type.VARIANT Products with the same Product.primary_product_id must
   * share the same currency_code. Otherwise, a FAILED_PRECONDITION error is
   * returned.
   */
  currencyCode?: string;
  /**
   * Price of the product without any discount. If zero, by default set to be
   * the price. If set, original_price should be greater than or equal to price,
   * otherwise an INVALID_ARGUMENT error is thrown.
   */
  originalPrice?: number;
  /**
   * Price of the product. Google Merchant Center property
   * [price](https://support.google.com/merchants/answer/6324371). Schema.org
   * property [Offer.price](https://schema.org/price).
   */
  price?: number;
  /**
   * The timestamp when the price starts to be effective. This can be set as a
   * future timestamp, and the price is only used for search after
   * price_effective_time. If so, the original_price must be set and
   * original_price is used before price_effective_time. Do not set if price is
   * always effective because it will cause additional latency during search.
   */
  priceEffectiveTime?: Date;
  /**
   * The timestamp when the price stops to be effective. The price is used for
   * search before price_expire_time. If this field is set, the original_price
   * must be set and original_price is used after price_expire_time. Do not set
   * if price is always effective because it will cause additional latency
   * during search.
   */
  priceExpireTime?: Date;
  /**
   * Output only. The price range of all the child Product.Type.VARIANT
   * Products grouped together on the Product.Type.PRIMARY Product. Only
   * populated for Product.Type.PRIMARY Products. Note: This field is
   * OUTPUT_ONLY for ProductService.GetProduct. Do not set this field in API
   * requests.
   */
  readonly priceRange?: GoogleCloudRetailV2PriceInfoPriceRange;
}

function serializeGoogleCloudRetailV2PriceInfo(data: any): GoogleCloudRetailV2PriceInfo {
  return {
    ...data,
    priceEffectiveTime: data["priceEffectiveTime"] !== undefined ? data["priceEffectiveTime"].toISOString() : undefined,
    priceExpireTime: data["priceExpireTime"] !== undefined ? data["priceExpireTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRetailV2PriceInfo(data: any): GoogleCloudRetailV2PriceInfo {
  return {
    ...data,
    priceEffectiveTime: data["priceEffectiveTime"] !== undefined ? new Date(data["priceEffectiveTime"]) : undefined,
    priceExpireTime: data["priceExpireTime"] !== undefined ? new Date(data["priceExpireTime"]) : undefined,
  };
}

/**
 * The price range of all variant Product having the same
 * Product.primary_product_id.
 */
export interface GoogleCloudRetailV2PriceInfoPriceRange {
  /**
   * The inclusive Product.pricing_info.original_price internal of all variant
   * Product having the same Product.primary_product_id.
   */
  originalPrice?: GoogleCloudRetailV2Interval;
  /**
   * The inclusive Product.pricing_info.price interval of all variant Product
   * having the same Product.primary_product_id.
   */
  price?: GoogleCloudRetailV2Interval;
}

/**
 * Product captures all metadata information of items to be recommended or
 * searched.
 */
export interface GoogleCloudRetailV2Product {
  /**
   * Highly encouraged. Extra product attributes to be included. For example,
   * for products, this could include the store name, vendor, style, color, etc.
   * These are very strong signals for recommendation model, thus we highly
   * recommend providing the attributes here. Features that can take on one of a
   * limited number of possible values. Two types of features can be set are:
   * Textual features. some examples would be the brand/maker of a product, or
   * country of a customer. Numerical features. Some examples would be the
   * height/weight of a product, or age of a customer. For example: `{ "vendor":
   * {"text": ["vendor123", "vendor456"]}, "lengths_cm": {"numbers":[2.3,
   * 15.4]}, "heights_cm": {"numbers":[8.1, 6.4]} }`. This field needs to pass
   * all below criteria, otherwise an INVALID_ARGUMENT error is returned: * Max
   * entries count: 200. * The key must be a UTF-8 encoded string with a length
   * limit of 128 characters. * For indexable attribute, the key must match the
   * pattern: `a-zA-Z0-9*`. For example, `key0LikeThis` or `KEY_1_LIKE_THIS`. *
   * For text attributes, at most 400 values are allowed. Empty values are not
   * allowed. Each value must be a non-empty UTF-8 encoded string with a length
   * limit of 256 characters. * For number attributes, at most 400 values are
   * allowed.
   */
  attributes?: {
    [key: string]: GoogleCloudRetailV2CustomAttribute
  };
  /**
   * The target group associated with a given audience (e.g. male, veterans,
   * car owners, musicians, etc.) of the product.
   */
  audience?: GoogleCloudRetailV2Audience;
  /**
   * The online availability of the Product. Default to Availability.IN_STOCK.
   * Corresponding properties: Google Merchant Center property
   * [availability](https://support.google.com/merchants/answer/6324448).
   * Schema.org property [Offer.availability](https://schema.org/availability).
   */
  availability?:  | "AVAILABILITY_UNSPECIFIED" | "IN_STOCK" | "OUT_OF_STOCK" | "PREORDER" | "BACKORDER";
  /**
   * The available quantity of the item.
   */
  availableQuantity?: number;
  /**
   * The timestamp when this Product becomes available for
   * SearchService.Search. Note that this is only applicable to Type.PRIMARY and
   * Type.COLLECTION, and ignored for Type.VARIANT.
   */
  availableTime?: Date;
  /**
   * The brands of the product. A maximum of 30 brands are allowed. Each brand
   * must be a UTF-8 encoded string with a length limit of 1,000 characters.
   * Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties:
   * Google Merchant Center property
   * [brand](https://support.google.com/merchants/answer/6324351). Schema.org
   * property [Product.brand](https://schema.org/brand).
   */
  brands?: string[];
  /**
   * Product categories. This field is repeated for supporting one product
   * belonging to several parallel categories. Strongly recommended using the
   * full path for better search / recommendation quality. To represent full
   * path of category, use '>' sign to separate different hierarchies. If '>' is
   * part of the category name, replace it with other character(s). For example,
   * if a shoes product belongs to both ["Shoes & Accessories" -> "Shoes"] and
   * ["Sports & Fitness" -> "Athletic Clothing" -> "Shoes"], it could be
   * represented as: "categories": [ "Shoes & Accessories > Shoes", "Sports &
   * Fitness > Athletic Clothing > Shoes" ] Must be set for Type.PRIMARY Product
   * otherwise an INVALID_ARGUMENT error is returned. At most 250 values are
   * allowed per Product. Empty values are not allowed. Each value must be a
   * UTF-8 encoded string with a length limit of 5,000 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned. Corresponding properties: Google
   * Merchant Center property google_product_category. Schema.org property
   * [Product.category] (https://schema.org/category).
   * [mc_google_product_category]:
   * https://support.google.com/merchants/answer/6324436
   */
  categories?: string[];
  /**
   * The id of the collection members when type is Type.COLLECTION.
   * Non-existent product ids are allowed. The type of the members must be
   * either Type.PRIMARY or Type.VARIANT otherwise an INVALID_ARGUMENT error is
   * thrown. Should not set it for other types. A maximum of 1000 values are
   * allowed. Otherwise, an INVALID_ARGUMENT error is return.
   */
  collectionMemberIds?: string[];
  /**
   * The color of the product. Corresponding properties: Google Merchant Center
   * property [color](https://support.google.com/merchants/answer/6324487).
   * Schema.org property [Product.color](https://schema.org/color).
   */
  colorInfo?: GoogleCloudRetailV2ColorInfo;
  /**
   * The condition of the product. Strongly encouraged to use the standard
   * values: "new", "refurbished", "used". A maximum of 1 value is allowed per
   * Product. Each value must be a UTF-8 encoded string with a length limit of
   * 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.
   * Corresponding properties: Google Merchant Center property
   * [condition](https://support.google.com/merchants/answer/6324469).
   * Schema.org property
   * [Offer.itemCondition](https://schema.org/itemCondition).
   */
  conditions?: string[];
  /**
   * Product description. This field must be a UTF-8 encoded string with a
   * length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is
   * returned. Corresponding properties: Google Merchant Center property
   * [description](https://support.google.com/merchants/answer/6324468).
   * Schema.org property [Product.description](https://schema.org/description).
   */
  description?: string;
  /**
   * The timestamp when this product becomes unavailable for
   * SearchService.Search. Note that this is only applicable to Type.PRIMARY and
   * Type.COLLECTION, and ignored for Type.VARIANT. In general, we suggest the
   * users to delete the stale products explicitly, instead of using this field
   * to determine staleness. If it is set, the Product is not available for
   * SearchService.Search after expire_time. However, the product can still be
   * retrieved by ProductService.GetProduct and ProductService.ListProducts.
   * expire_time must be later than available_time and publish_time, otherwise
   * an INVALID_ARGUMENT error is thrown. Corresponding properties: Google
   * Merchant Center property
   * [expiration_date](https://support.google.com/merchants/answer/6324499).
   */
  expireTime?: Date;
  /**
   * Fulfillment information, such as the store IDs for in-store pickup or
   * region IDs for different shipping methods. All the elements must have
   * distinct FulfillmentInfo.type. Otherwise, an INVALID_ARGUMENT error is
   * returned.
   */
  fulfillmentInfo?: GoogleCloudRetailV2FulfillmentInfo[];
  /**
   * The Global Trade Item Number (GTIN) of the product. This field must be a
   * UTF-8 encoded string with a length limit of 128 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned. This field must be a Unigram.
   * Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties:
   * Google Merchant Center property
   * [gtin](https://support.google.com/merchants/answer/6324461). Schema.org
   * property [Product.isbn](https://schema.org/isbn),
   * [Product.gtin8](https://schema.org/gtin8),
   * [Product.gtin12](https://schema.org/gtin12),
   * [Product.gtin13](https://schema.org/gtin13), or
   * [Product.gtin14](https://schema.org/gtin14). If the value is not a valid
   * GTIN, an INVALID_ARGUMENT error is returned.
   */
  gtin?: string;
  /**
   * Immutable. Product identifier, which is the final component of name. For
   * example, this field is "id_1", if name is
   * `projects/*\/locations/global/catalogs/default_catalog/branches/default_branch/products/id_1`.
   * This field must be a UTF-8 encoded string with a length limit of 128
   * characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding
   * properties: Google Merchant Center property
   * [id](https://support.google.com/merchants/answer/6324405). Schema.org
   * property [Product.sku](https://schema.org/sku).
   */
  id?: string;
  /**
   * Product images for the product. We highly recommend putting the main image
   * first. A maximum of 300 images are allowed. Corresponding properties:
   * Google Merchant Center property
   * [image_link](https://support.google.com/merchants/answer/6324350).
   * Schema.org property [Product.image](https://schema.org/image).
   */
  images?: GoogleCloudRetailV2Image[];
  /**
   * Language of the title/description and other string attributes. Use
   * language tags defined by [BCP
   * 47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). For product prediction,
   * this field is ignored and the model automatically detects the text
   * language. The Product can include text in different languages, but
   * duplicating Products to provide text in multiple languages can result in
   * degraded model performance. For product search this field is in use. It
   * defaults to "en-US" if unset.
   */
  languageCode?: string;
  /**
   * Output only. A list of local inventories specific to different places.
   * This field can be managed by ProductService.AddLocalInventories and
   * ProductService.RemoveLocalInventories APIs if fine-grained, high-volume
   * updates are necessary.
   */
  readonly localInventories?: GoogleCloudRetailV2LocalInventory[];
  /**
   * The material of the product. For example, "leather", "wooden". A maximum
   * of 20 values are allowed. Each value must be a UTF-8 encoded string with a
   * length limit of 200 characters. Otherwise, an INVALID_ARGUMENT error is
   * returned. Corresponding properties: Google Merchant Center property
   * [material](https://support.google.com/merchants/answer/6324410). Schema.org
   * property [Product.material](https://schema.org/material).
   */
  materials?: string[];
  /**
   * Immutable. Full resource name of the product, such as
   * `projects/*\/locations/global/catalogs/default_catalog/branches/default_branch/products/product_id`.
   */
  name?: string;
  /**
   * The pattern or graphic print of the product. For example, "striped",
   * "polka dot", "paisley". A maximum of 20 values are allowed per Product.
   * Each value must be a UTF-8 encoded string with a length limit of 128
   * characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding
   * properties: Google Merchant Center property
   * [pattern](https://support.google.com/merchants/answer/6324483). Schema.org
   * property [Product.pattern](https://schema.org/pattern).
   */
  patterns?: string[];
  /**
   * Product price and cost information. Corresponding properties: Google
   * Merchant Center property
   * [price](https://support.google.com/merchants/answer/6324371).
   */
  priceInfo?: GoogleCloudRetailV2PriceInfo;
  /**
   * Variant group identifier. Must be an id, with the same parent branch with
   * this product. Otherwise, an error is thrown. For Type.PRIMARY Products,
   * this field can only be empty or set to the same value as id. For VARIANT
   * Products, this field cannot be empty. A maximum of 2,000 products are
   * allowed to share the same Type.PRIMARY Product. Otherwise, an
   * INVALID_ARGUMENT error is returned. Corresponding properties: Google
   * Merchant Center property
   * [item_group_id](https://support.google.com/merchants/answer/6324507).
   * Schema.org property
   * [Product.inProductGroupWithID](https://schema.org/inProductGroupWithID).
   */
  primaryProductId?: string;
  /**
   * The promotions applied to the product. A maximum of 10 values are allowed
   * per Product. Only Promotion.promotion_id will be used, other fields will be
   * ignored if set.
   */
  promotions?: GoogleCloudRetailV2Promotion[];
  /**
   * The timestamp when the product is published by the retailer for the first
   * time, which indicates the freshness of the products. Note that this field
   * is different from available_time, given it purely describes product
   * freshness regardless of when it is available on search and recommendation.
   */
  publishTime?: Date;
  /**
   * The rating of this product.
   */
  rating?: GoogleCloudRetailV2Rating;
  /**
   * Indicates which fields in the Products are returned in SearchResponse.
   * Supported fields for all types: * audience * availability * brands *
   * color_info * conditions * gtin * materials * name * patterns * price_info *
   * rating * sizes * title * uri Supported fields only for Type.PRIMARY and
   * Type.COLLECTION: * categories * description * images Supported fields only
   * for Type.VARIANT: * Only the first image in images To mark attributes as
   * retrievable, include paths of the form "attributes.key" where "key" is the
   * key of a custom attribute, as specified in attributes. For Type.PRIMARY and
   * Type.COLLECTION, the following fields are always returned in SearchResponse
   * by default: * name For Type.VARIANT, the following fields are always
   * returned in by default: * name * color_info The maximum number of paths is
   * 30. Otherwise, an INVALID_ARGUMENT error is returned. Note: Returning more
   * fields in SearchResponse can increase response payload size and serving
   * latency. This field is deprecated. Use the retrievable site-wide control
   * instead.
   */
  retrievableFields?: string /* FieldMask */;
  /**
   * The size of the product. To represent different size systems or size
   * types, consider using this format: [[[size_system:]size_type:]size_value].
   * For example, in "US:MENS:M", "US" represents size system; "MENS" represents
   * size type; "M" represents size value. In "GIRLS:27", size system is empty;
   * "GIRLS" represents size type; "27" represents size value. In "32 inches",
   * both size system and size type are empty, while size value is "32 inches".
   * A maximum of 20 values are allowed per Product. Each value must be a UTF-8
   * encoded string with a length limit of 128 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned. Corresponding properties: Google
   * Merchant Center property
   * [size](https://support.google.com/merchants/answer/6324492),
   * [size_type](https://support.google.com/merchants/answer/6324497), and
   * [size_system](https://support.google.com/merchants/answer/6324502).
   * Schema.org property [Product.size](https://schema.org/size).
   */
  sizes?: string[];
  /**
   * Custom tags associated with the product. At most 250 values are allowed
   * per Product. This value must be a UTF-8 encoded string with a length limit
   * of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. This
   * tag can be used for filtering recommendation results by passing the tag as
   * part of the PredictRequest.filter. Corresponding properties: Google
   * Merchant Center property
   * [custom_label_0–4](https://support.google.com/merchants/answer/6324473).
   */
  tags?: string[];
  /**
   * Required. Product title. This field must be a UTF-8 encoded string with a
   * length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is
   * returned. Corresponding properties: Google Merchant Center property
   * [title](https://support.google.com/merchants/answer/6324415). Schema.org
   * property [Product.name](https://schema.org/name).
   */
  title?: string;
  /**
   * Input only. The TTL (time to live) of the product. Note that this is only
   * applicable to Type.PRIMARY and Type.COLLECTION, and ignored for
   * Type.VARIANT. In general, we suggest the users to delete the stale products
   * explicitly, instead of using this field to determine staleness. If it is
   * set, it must be a non-negative value, and expire_time is set as current
   * timestamp plus ttl. The derived expire_time is returned in the output and
   * ttl is left blank when retrieving the Product. If it is set, the product is
   * not available for SearchService.Search after current timestamp plus ttl.
   * However, the product can still be retrieved by ProductService.GetProduct
   * and ProductService.ListProducts.
   */
  ttl?: number /* Duration */;
  /**
   * Immutable. The type of the product. Default to
   * Catalog.product_level_config.ingestion_product_type if unset.
   */
  type?:  | "TYPE_UNSPECIFIED" | "PRIMARY" | "VARIANT" | "COLLECTION";
  /**
   * Canonical URL directly linking to the product detail page. It is strongly
   * recommended to provide a valid uri for the product, otherwise the service
   * performance could be significantly degraded. This field must be a UTF-8
   * encoded string with a length limit of 5,000 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned. Corresponding properties: Google
   * Merchant Center property
   * [link](https://support.google.com/merchants/answer/6324416). Schema.org
   * property [Offer.url](https://schema.org/url).
   */
  uri?: string;
  /**
   * Output only. Product variants grouped together on primary product which
   * share similar product attributes. It's automatically grouped by
   * primary_product_id for all the product variants. Only populated for
   * Type.PRIMARY Products. Note: This field is OUTPUT_ONLY for
   * ProductService.GetProduct. Do not set this field in API requests.
   */
  readonly variants?: GoogleCloudRetailV2Product[];
}

function serializeGoogleCloudRetailV2Product(data: any): GoogleCloudRetailV2Product {
  return {
    ...data,
    availableTime: data["availableTime"] !== undefined ? data["availableTime"].toISOString() : undefined,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
    priceInfo: data["priceInfo"] !== undefined ? serializeGoogleCloudRetailV2PriceInfo(data["priceInfo"]) : undefined,
    publishTime: data["publishTime"] !== undefined ? data["publishTime"].toISOString() : undefined,
    retrievableFields: data["retrievableFields"] !== undefined ? data["retrievableFields"] : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

function deserializeGoogleCloudRetailV2Product(data: any): GoogleCloudRetailV2Product {
  return {
    ...data,
    availableTime: data["availableTime"] !== undefined ? new Date(data["availableTime"]) : undefined,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    localInventories: data["localInventories"] !== undefined ? data["localInventories"].map((item: any) => (deserializeGoogleCloudRetailV2LocalInventory(item))) : undefined,
    priceInfo: data["priceInfo"] !== undefined ? deserializeGoogleCloudRetailV2PriceInfo(data["priceInfo"]) : undefined,
    publishTime: data["publishTime"] !== undefined ? new Date(data["publishTime"]) : undefined,
    retrievableFields: data["retrievableFields"] !== undefined ? data["retrievableFields"] : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
    variants: data["variants"] !== undefined ? data["variants"].map((item: any) => (deserializeGoogleCloudRetailV2Product(item))) : undefined,
  };
}

/**
 * Detailed product information associated with a user event.
 */
export interface GoogleCloudRetailV2ProductDetail {
  /**
   * Required. Product information. Required field(s): * Product.id Optional
   * override field(s): * Product.price_info If any supported optional fields
   * are provided, we will treat them as a full override when looking up product
   * information from the catalog. Thus, it is important to ensure that the
   * overriding fields are accurate and complete. All other product fields are
   * ignored and instead populated via catalog lookup after event ingestion.
   */
  product?: GoogleCloudRetailV2Product;
  /**
   * Quantity of the product associated with the user event. For example, this
   * field will be 2 if two products are added to the shopping cart for
   * `purchase-complete` event. Required for `add-to-cart` and
   * `purchase-complete` event types.
   */
  quantity?: number;
}

function serializeGoogleCloudRetailV2ProductDetail(data: any): GoogleCloudRetailV2ProductDetail {
  return {
    ...data,
    product: data["product"] !== undefined ? serializeGoogleCloudRetailV2Product(data["product"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2ProductDetail(data: any): GoogleCloudRetailV2ProductDetail {
  return {
    ...data,
    product: data["product"] !== undefined ? deserializeGoogleCloudRetailV2Product(data["product"]) : undefined,
  };
}

/**
 * The inline source for the input config for ImportProducts method.
 */
export interface GoogleCloudRetailV2ProductInlineSource {
  /**
   * Required. A list of products to update/create. Each product must have a
   * valid Product.id. Recommended max of 100 items.
   */
  products?: GoogleCloudRetailV2Product[];
}

function serializeGoogleCloudRetailV2ProductInlineSource(data: any): GoogleCloudRetailV2ProductInlineSource {
  return {
    ...data,
    products: data["products"] !== undefined ? data["products"].map((item: any) => (serializeGoogleCloudRetailV2Product(item))) : undefined,
  };
}

function deserializeGoogleCloudRetailV2ProductInlineSource(data: any): GoogleCloudRetailV2ProductInlineSource {
  return {
    ...data,
    products: data["products"] !== undefined ? data["products"].map((item: any) => (deserializeGoogleCloudRetailV2Product(item))) : undefined,
  };
}

/**
 * The input config source for products.
 */
export interface GoogleCloudRetailV2ProductInputConfig {
  /**
   * BigQuery input source.
   */
  bigQuerySource?: GoogleCloudRetailV2BigQuerySource;
  /**
   * Google Cloud Storage location for the input content.
   */
  gcsSource?: GoogleCloudRetailV2GcsSource;
  /**
   * The Inline source for the input content for products.
   */
  productInlineSource?: GoogleCloudRetailV2ProductInlineSource;
}

function serializeGoogleCloudRetailV2ProductInputConfig(data: any): GoogleCloudRetailV2ProductInputConfig {
  return {
    ...data,
    productInlineSource: data["productInlineSource"] !== undefined ? serializeGoogleCloudRetailV2ProductInlineSource(data["productInlineSource"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2ProductInputConfig(data: any): GoogleCloudRetailV2ProductInputConfig {
  return {
    ...data,
    productInlineSource: data["productInlineSource"] !== undefined ? deserializeGoogleCloudRetailV2ProductInlineSource(data["productInlineSource"]) : undefined,
  };
}

/**
 * Configures what level the product should be uploaded with regards to how
 * users will be send events and how predictions will be made.
 */
export interface GoogleCloudRetailV2ProductLevelConfig {
  /**
   * The type of Products allowed to be ingested into the catalog. Acceptable
   * values are: * `primary` (default): You can ingest Products of all types.
   * When ingesting a Product, its type will default to Product.Type.PRIMARY if
   * unset. * `variant` (incompatible with Retail Search): You can only ingest
   * Product.Type.VARIANT Products. This means Product.primary_product_id cannot
   * be empty. If this field is set to an invalid value other than these, an
   * INVALID_ARGUMENT error is returned. If this field is `variant` and
   * merchant_center_product_id_field is `itemGroupId`, an INVALID_ARGUMENT
   * error is returned. See [Product
   * levels](https://cloud.google.com/retail/docs/catalog#product-levels) for
   * more details.
   */
  ingestionProductType?: string;
  /**
   * Which field of [Merchant Center
   * Product](/bigquery-transfer/docs/merchant-center-products-schema) should be
   * imported as Product.id. Acceptable values are: * `offerId` (default):
   * Import `offerId` as the product ID. * `itemGroupId`: Import `itemGroupId`
   * as the product ID. Notice that Retail API will choose one item from the
   * ones with the same `itemGroupId`, and use it to represent the item group.
   * If this field is set to an invalid value other than these, an
   * INVALID_ARGUMENT error is returned. If this field is `itemGroupId` and
   * ingestion_product_type is `variant`, an INVALID_ARGUMENT error is returned.
   * See [Product
   * levels](https://cloud.google.com/retail/docs/catalog#product-levels) for
   * more details.
   */
  merchantCenterProductIdField?: string;
}

/**
 * Promotion specification.
 */
export interface GoogleCloudRetailV2Promotion {
  /**
   * Promotion identifier, which is the final component of name. For example,
   * this field is "free_gift", if name is
   * `projects/*\/locations/global/catalogs/default_catalog/promotions/free_gift`.
   * The value must be a UTF-8 encoded string with a length limit of 128
   * characters, and match the pattern: `a-zA-Z*`. For example, id0LikeThis or
   * ID_1_LIKE_THIS. Otherwise, an INVALID_ARGUMENT error is returned.
   * Corresponds to Google Merchant Center property
   * [promotion_id](https://support.google.com/merchants/answer/7050148).
   */
  promotionId?: string;
}

/**
 * A transaction represents the entire purchase transaction.
 */
export interface GoogleCloudRetailV2PurchaseTransaction {
  /**
   * All the costs associated with the products. These can be manufacturing
   * costs, shipping expenses not borne by the end user, or any other costs,
   * such that: * Profit = revenue - tax - cost
   */
  cost?: number;
  /**
   * Required. Currency code. Use three-character ISO-4217 code.
   */
  currencyCode?: string;
  /**
   * The transaction ID with a length limit of 128 characters.
   */
  id?: string;
  /**
   * Required. Total non-zero revenue or grand total associated with the
   * transaction. This value include shipping, tax, or other adjustments to
   * total revenue that you want to include as part of your revenue
   * calculations.
   */
  revenue?: number;
  /**
   * All the taxes associated with the transaction.
   */
  tax?: number;
}

/**
 * Metadata related to the progress of the Purge operation. This will be
 * returned by the google.longrunning.Operation.metadata field.
 */
export interface GoogleCloudRetailV2PurgeMetadata {
}

/**
 * Request message for PurgeUserEvents method.
 */
export interface GoogleCloudRetailV2PurgeUserEventsRequest {
  /**
   * Required. The filter string to specify the events to be deleted with a
   * length limit of 5,000 characters. Empty string filter is not allowed. The
   * eligible fields for filtering are: * `eventType`: Double quoted
   * UserEvent.event_type string. * `eventTime`: in ISO 8601 "zulu" format. *
   * `visitorId`: Double quoted string. Specifying this will delete all events
   * associated with a visitor. * `userId`: Double quoted string. Specifying
   * this will delete all events associated with a user. Examples: * Deleting
   * all events in a time range: `eventTime > "2012-04-23T18:25:43.511Z"
   * eventTime < "2012-04-23T18:30:43.511Z"` * Deleting specific eventType in
   * time range: `eventTime > "2012-04-23T18:25:43.511Z" eventType =
   * "detail-page-view"` * Deleting all events for a specific visitor:
   * `visitorId = "visitor1024"` The filtering fields are assumed to have an
   * implicit AND.
   */
  filter?: string;
  /**
   * Actually perform the purge. If `force` is set to false, the method will
   * return the expected purge count without deleting any user events.
   */
  force?: boolean;
}

/**
 * Response of the PurgeUserEventsRequest. If the long running operation is
 * successfully done, then this message is returned by the
 * google.longrunning.Operations.response field.
 */
export interface GoogleCloudRetailV2PurgeUserEventsResponse {
  /**
   * The total count of events purged as a result of the operation.
   */
  purgedEventsCount?: bigint;
}

function serializeGoogleCloudRetailV2PurgeUserEventsResponse(data: any): GoogleCloudRetailV2PurgeUserEventsResponse {
  return {
    ...data,
    purgedEventsCount: data["purgedEventsCount"] !== undefined ? String(data["purgedEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2PurgeUserEventsResponse(data: any): GoogleCloudRetailV2PurgeUserEventsResponse {
  return {
    ...data,
    purgedEventsCount: data["purgedEventsCount"] !== undefined ? BigInt(data["purgedEventsCount"]) : undefined,
  };
}

/**
 * The rating of a Product.
 */
export interface GoogleCloudRetailV2Rating {
  /**
   * The average rating of the Product. The rating is scaled at 1-5. Otherwise,
   * an INVALID_ARGUMENT error is returned.
   */
  averageRating?: number;
  /**
   * The total number of ratings. This value is independent of the value of
   * rating_histogram. This value must be nonnegative. Otherwise, an
   * INVALID_ARGUMENT error is returned.
   */
  ratingCount?: number;
  /**
   * List of rating counts per rating value (index = rating - 1). The list is
   * empty if there is no rating. If the list is non-empty, its size is always
   * 5. Otherwise, an INVALID_ARGUMENT error is returned. For example, [41, 14,
   * 13, 47, 303]. It means that the Product got 41 ratings with 1 star, 14
   * ratings with 2 star, and so on.
   */
  ratingHistogram?: number[];
}

/**
 * Metadata for `RejoinUserEvents` method.
 */
export interface GoogleCloudRetailV2RejoinUserEventsMetadata {
}

/**
 * Request message for RejoinUserEvents method.
 */
export interface GoogleCloudRetailV2RejoinUserEventsRequest {
  /**
   * The type of the user event rejoin to define the scope and range of the
   * user events to be rejoined with the latest product catalog. Defaults to
   * `USER_EVENT_REJOIN_SCOPE_UNSPECIFIED` if this field is not set, or set to
   * an invalid integer value.
   */
  userEventRejoinScope?:  | "USER_EVENT_REJOIN_SCOPE_UNSPECIFIED" | "JOINED_EVENTS" | "UNJOINED_EVENTS";
}

/**
 * Response message for `RejoinUserEvents` method.
 */
export interface GoogleCloudRetailV2RejoinUserEventsResponse {
  /**
   * Number of user events that were joined with latest product catalog.
   */
  rejoinedUserEventsCount?: bigint;
}

function serializeGoogleCloudRetailV2RejoinUserEventsResponse(data: any): GoogleCloudRetailV2RejoinUserEventsResponse {
  return {
    ...data,
    rejoinedUserEventsCount: data["rejoinedUserEventsCount"] !== undefined ? String(data["rejoinedUserEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2RejoinUserEventsResponse(data: any): GoogleCloudRetailV2RejoinUserEventsResponse {
  return {
    ...data,
    rejoinedUserEventsCount: data["rejoinedUserEventsCount"] !== undefined ? BigInt(data["rejoinedUserEventsCount"]) : undefined,
  };
}

/**
 * Request for CatalogService.RemoveCatalogAttribute method.
 */
export interface GoogleCloudRetailV2RemoveCatalogAttributeRequest {
  /**
   * Required. The attribute name key of the CatalogAttribute to remove.
   */
  key?: string;
}

/**
 * Request for RemoveControl method.
 */
export interface GoogleCloudRetailV2RemoveControlRequest {
  /**
   * Required. The id of the control to apply. Assumed to be in the same
   * catalog as the serving config.
   */
  controlId?: string;
}

/**
 * Metadata related to the progress of the RemoveFulfillmentPlaces operation.
 * Currently empty because there is no meaningful metadata populated from the
 * ProductService.RemoveFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2RemoveFulfillmentPlacesMetadata {
}

/**
 * Request message for ProductService.RemoveFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2RemoveFulfillmentPlacesRequest {
  /**
   * If set to true, and the Product is not found, the fulfillment information
   * will still be processed and retained for at most 1 day and processed once
   * the Product is created. If set to false, a NOT_FOUND error is returned if
   * the Product is not found.
   */
  allowMissing?: boolean;
  /**
   * Required. The IDs for this type, such as the store IDs for
   * "pickup-in-store" or the region IDs for "same-day-delivery", to be removed
   * for this type. At least 1 value is required, and a maximum of 2000 values
   * are allowed. Each value must be a string with a length limit of 10
   * characters, matching the pattern `[a-zA-Z0-9_-]+`, such as "store1" or
   * "REGION-2". Otherwise, an INVALID_ARGUMENT error is returned.
   */
  placeIds?: string[];
  /**
   * The time when the fulfillment updates are issued, used to prevent
   * out-of-order updates on fulfillment information. If not provided, the
   * internal system time will be used.
   */
  removeTime?: Date;
  /**
   * Required. The fulfillment type, including commonly used types (such as
   * pickup in store and same day delivery), and custom types. Supported values:
   * * "pickup-in-store" * "ship-to-store" * "same-day-delivery" *
   * "next-day-delivery" * "custom-type-1" * "custom-type-2" * "custom-type-3" *
   * "custom-type-4" * "custom-type-5" If this field is set to an invalid value
   * other than these, an INVALID_ARGUMENT error is returned. This field
   * directly corresponds to Product.fulfillment_info.type.
   */
  type?: string;
}

function serializeGoogleCloudRetailV2RemoveFulfillmentPlacesRequest(data: any): GoogleCloudRetailV2RemoveFulfillmentPlacesRequest {
  return {
    ...data,
    removeTime: data["removeTime"] !== undefined ? data["removeTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRetailV2RemoveFulfillmentPlacesRequest(data: any): GoogleCloudRetailV2RemoveFulfillmentPlacesRequest {
  return {
    ...data,
    removeTime: data["removeTime"] !== undefined ? new Date(data["removeTime"]) : undefined,
  };
}

/**
 * Response of the RemoveFulfillmentPlacesRequest. Currently empty because
 * there is no meaningful response populated from the
 * ProductService.RemoveFulfillmentPlaces method.
 */
export interface GoogleCloudRetailV2RemoveFulfillmentPlacesResponse {
}

/**
 * Metadata related to the progress of the RemoveLocalInventories operation.
 * Currently empty because there is no meaningful metadata populated from the
 * ProductService.RemoveLocalInventories method.
 */
export interface GoogleCloudRetailV2RemoveLocalInventoriesMetadata {
}

/**
 * Request message for ProductService.RemoveLocalInventories method.
 */
export interface GoogleCloudRetailV2RemoveLocalInventoriesRequest {
  /**
   * If set to true, and the Product is not found, the local inventory removal
   * request will still be processed and retained for at most 1 day and
   * processed once the Product is created. If set to false, a NOT_FOUND error
   * is returned if the Product is not found.
   */
  allowMissing?: boolean;
  /**
   * Required. A list of place IDs to have their inventory deleted. At most
   * 3000 place IDs are allowed per request.
   */
  placeIds?: string[];
  /**
   * The time when the inventory deletions are issued. Used to prevent
   * out-of-order updates and deletions on local inventory fields. If not
   * provided, the internal system time will be used.
   */
  removeTime?: Date;
}

function serializeGoogleCloudRetailV2RemoveLocalInventoriesRequest(data: any): GoogleCloudRetailV2RemoveLocalInventoriesRequest {
  return {
    ...data,
    removeTime: data["removeTime"] !== undefined ? data["removeTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRetailV2RemoveLocalInventoriesRequest(data: any): GoogleCloudRetailV2RemoveLocalInventoriesRequest {
  return {
    ...data,
    removeTime: data["removeTime"] !== undefined ? new Date(data["removeTime"]) : undefined,
  };
}

/**
 * Response of the ProductService.RemoveLocalInventories API. Currently empty
 * because there is no meaningful response populated from the
 * ProductService.RemoveLocalInventories method.
 */
export interface GoogleCloudRetailV2RemoveLocalInventoriesResponse {
}

/**
 * Request for CatalogService.ReplaceCatalogAttribute method.
 */
export interface GoogleCloudRetailV2ReplaceCatalogAttributeRequest {
  /**
   * Required. The updated CatalogAttribute.
   */
  catalogAttribute?: GoogleCloudRetailV2CatalogAttribute;
  /**
   * Indicates which fields in the provided CatalogAttribute to update. The
   * following are NOT supported: * CatalogAttribute.key If not set, all
   * supported fields are updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleCloudRetailV2ReplaceCatalogAttributeRequest(data: any): GoogleCloudRetailV2ReplaceCatalogAttributeRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleCloudRetailV2ReplaceCatalogAttributeRequest(data: any): GoogleCloudRetailV2ReplaceCatalogAttributeRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request for resuming training of a model.
 */
export interface GoogleCloudRetailV2ResumeModelRequest {
}

/**
 * A rule is a condition-action pair * A condition defines when a rule is to be
 * triggered. * An action specifies what occurs on that trigger. Currently rules
 * only work for controls with SOLUTION_TYPE_SEARCH.
 */
export interface GoogleCloudRetailV2Rule {
  /**
   * A boost action.
   */
  boostAction?: GoogleCloudRetailV2RuleBoostAction;
  /**
   * Required. The condition that triggers the rule. If the condition is empty,
   * the rule will always apply.
   */
  condition?: GoogleCloudRetailV2Condition;
  /**
   * Prevents term from being associated with other terms.
   */
  doNotAssociateAction?: GoogleCloudRetailV2RuleDoNotAssociateAction;
  /**
   * Filters results.
   */
  filterAction?: GoogleCloudRetailV2RuleFilterAction;
  /**
   * Ignores specific terms from query during search.
   */
  ignoreAction?: GoogleCloudRetailV2RuleIgnoreAction;
  /**
   * Treats specific term as a synonym with a group of terms. Group of terms
   * will not be treated as synonyms with the specific term.
   */
  onewaySynonymsAction?: GoogleCloudRetailV2RuleOnewaySynonymsAction;
  /**
   * Redirects a shopper to a specific page.
   */
  redirectAction?: GoogleCloudRetailV2RuleRedirectAction;
  /**
   * Replaces specific terms in the query.
   */
  replacementAction?: GoogleCloudRetailV2RuleReplacementAction;
  /**
   * Treats a set of terms as synonyms of one another.
   */
  twowaySynonymsAction?: GoogleCloudRetailV2RuleTwowaySynonymsAction;
}

function serializeGoogleCloudRetailV2Rule(data: any): GoogleCloudRetailV2Rule {
  return {
    ...data,
    condition: data["condition"] !== undefined ? serializeGoogleCloudRetailV2Condition(data["condition"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2Rule(data: any): GoogleCloudRetailV2Rule {
  return {
    ...data,
    condition: data["condition"] !== undefined ? deserializeGoogleCloudRetailV2Condition(data["condition"]) : undefined,
  };
}

/**
 * A boost action to apply to results matching condition specified above.
 */
export interface GoogleCloudRetailV2RuleBoostAction {
  /**
   * Strength of the condition boost, which must be in [-1, 1]. Negative boost
   * means demotion. Default is 0.0. Setting to 1.0 gives the item a big
   * promotion. However, it does not necessarily mean that the boosted item will
   * be the top result at all times, nor that other items will be excluded.
   * Results could still be shown even when none of them matches the condition.
   * And results that are significantly more relevant to the search query can
   * still trump your heavily favored but irrelevant items. Setting to -1.0
   * gives the item a big demotion. However, results that are deeply relevant
   * might still be shown. The item will have an upstream battle to get a fairly
   * high ranking, but it is not blocked out completely. Setting to 0.0 means no
   * boost applied. The boosting condition is ignored.
   */
  boost?: number;
  /**
   * The filter can have a max size of 5000 characters. An expression which
   * specifies which products to apply an action to. The syntax and supported
   * fields are the same as a filter expression. See SearchRequest.filter for
   * detail syntax and limitations. Examples: * To boost products with product
   * ID "product_1" or "product_2", and color "Red" or "Blue": *(id:
   * ANY("product_1", "product_2")) * *AND * *(colorFamilies: ANY("Red",
   * "Blue")) *
   */
  productsFilter?: string;
}

/**
 * Prevents `query_term` from being associated with specified terms during
 * search. Example: Don't associate "gShoe" and "cheap".
 */
export interface GoogleCloudRetailV2RuleDoNotAssociateAction {
  /**
   * Cannot contain duplicates or the query term. Can specify up to 100 terms.
   */
  doNotAssociateTerms?: string[];
  /**
   * Terms from the search query. Will not consider do_not_associate_terms for
   * search if in search query. Can specify up to 100 terms.
   */
  queryTerms?: string[];
  /**
   * Will be [deprecated = true] post migration;
   */
  terms?: string[];
}

/**
 * * Rule Condition: - No Condition.query_terms provided is a global match. - 1
 * or more Condition.query_terms provided are combined with OR operator. *
 * Action Input: The request query and filter that are applied to the retrieved
 * products, in addition to any filters already provided with the SearchRequest.
 * The AND operator is used to combine the query's existing filters with the
 * filter rule(s). NOTE: May result in 0 results when filters conflict. * Action
 * Result: Filters the returned objects to be ONLY those that passed the filter.
 */
export interface GoogleCloudRetailV2RuleFilterAction {
  /**
   * A filter to apply on the matching condition results. Supported features: *
   * filter must be set. * Filter syntax is identical to SearchRequest.filter.
   * See more details at the Retail Search [user
   * guide](/retail/search/docs/filter-and-order#filter). * To filter products
   * with product ID "product_1" or "product_2", and color "Red" or "Blue":
   * *(id: ANY("product_1", "product_2")) * *AND * *(colorFamilies: ANY("Red",
   * "Blue")) *
   */
  filter?: string;
}

/**
 * Prevents a term in the query from being used in search. Example: Don't
 * search for "shoddy".
 */
export interface GoogleCloudRetailV2RuleIgnoreAction {
  /**
   * Terms to ignore in the search query.
   */
  ignoreTerms?: string[];
}

/**
 * Maps a set of terms to a set of synonyms. Set of synonyms will be treated as
 * synonyms of each query term only. `query_terms` will not be treated as
 * synonyms of each other. Example: "sneakers" will use a synonym of "shoes".
 * "shoes" will not use a synonym of "sneakers".
 */
export interface GoogleCloudRetailV2RuleOnewaySynonymsAction {
  /**
   * Will be [deprecated = true] post migration;
   */
  onewayTerms?: string[];
  /**
   * Terms from the search query. Will treat synonyms as their synonyms. Not
   * themselves synonyms of the synonyms. Can specify up to 100 terms.
   */
  queryTerms?: string[];
  /**
   * Defines a set of synonyms. Cannot contain duplicates. Can specify up to
   * 100 synonyms.
   */
  synonyms?: string[];
}

/**
 * Redirects a shopper to a specific page. * Rule Condition: - Must specify
 * Condition.query_terms. * Action Input: Request Query * Action Result:
 * Redirects shopper to provided uri.
 */
export interface GoogleCloudRetailV2RuleRedirectAction {
  /**
   * URL must have length equal or less than 2000 characters.
   */
  redirectUri?: string;
}

/**
 * Replaces a term in the query. Multiple replacement candidates can be
 * specified. All `query_terms` will be replaced with the replacement term.
 * Example: Replace "gShoe" with "google shoe".
 */
export interface GoogleCloudRetailV2RuleReplacementAction {
  /**
   * Terms from the search query. Will be replaced by replacement term. Can
   * specify up to 100 terms.
   */
  queryTerms?: string[];
  /**
   * Term that will be used for replacement.
   */
  replacementTerm?: string;
  /**
   * Will be [deprecated = true] post migration;
   */
  term?: string;
}

/**
 * Creates a set of terms that will be treated as synonyms of each other.
 * Example: synonyms of "sneakers" and "shoes": * "sneakers" will use a synonym
 * of "shoes". * "shoes" will use a synonym of "sneakers".
 */
export interface GoogleCloudRetailV2RuleTwowaySynonymsAction {
  /**
   * Defines a set of synonyms. Can specify up to 100 synonyms. Must specify at
   * least 2 synonyms.
   */
  synonyms?: string[];
}

/**
 * Request message for SearchService.Search method.
 */
export interface GoogleCloudRetailV2SearchRequest {
  /**
   * Boost specification to boost certain products. See more details at this
   * [user guide](https://cloud.google.com/retail/docs/boosting). Notice that if
   * both ServingConfig.boost_control_ids and SearchRequest.boost_spec are set,
   * the boost conditions from both places are evaluated. If a search request
   * matches multiple boost conditions, the final boost score is equal to the
   * sum of the boost scores from all matched boost conditions.
   */
  boostSpec?: GoogleCloudRetailV2SearchRequestBoostSpec;
  /**
   * The branch resource name, such as
   * `projects/*\/locations/global/catalogs/default_catalog/branches/0`. Use
   * "default_branch" as the branch ID or leave this field empty, to search
   * products under the default branch.
   */
  branch?: string;
  /**
   * The default filter that is applied when a user performs a search without
   * checking any filters on the search page. The filter applied to every search
   * request when quality improvement such as query expansion is needed. For
   * example, if a query does not have enough results, an expanded query with
   * SearchRequest.canonical_filter will be returned as a supplement of the
   * original query. This field is strongly recommended to achieve high search
   * quality. See SearchRequest.filter for more details about filter syntax.
   */
  canonicalFilter?: string;
  /**
   * Deprecated. Refer to https://cloud.google.com/retail/docs/configs#dynamic
   * to enable dynamic facets. Do not set this field. The specification for
   * dynamically generated facets. Notice that only textual facets can be
   * dynamically generated.
   */
  dynamicFacetSpec?: GoogleCloudRetailV2SearchRequestDynamicFacetSpec;
  /**
   * Facet specifications for faceted search. If empty, no facets are returned.
   * A maximum of 100 values are allowed. Otherwise, an INVALID_ARGUMENT error
   * is returned.
   */
  facetSpecs?: GoogleCloudRetailV2SearchRequestFacetSpec[];
  /**
   * The filter syntax consists of an expression language for constructing a
   * predicate from one or more fields of the products being filtered. Filter
   * expression is case-sensitive. See more details at this [user
   * guide](https://cloud.google.com/retail/docs/filter-and-order#filter). If
   * this field is unrecognizable, an INVALID_ARGUMENT is returned.
   */
  filter?: string;
  /**
   * The labels applied to a resource must meet the following requirements: *
   * Each resource can have multiple labels, up to a maximum of 64. * Each label
   * must be a key-value pair. * Keys have a minimum length of 1 character and a
   * maximum length of 63 characters and cannot be empty. Values can be empty
   * and have a maximum length of 63 characters. * Keys and values can contain
   * only lowercase letters, numeric characters, underscores, and dashes. All
   * characters must use UTF-8 encoding, and international characters are
   * allowed. * The key portion of a label must be unique. However, you can use
   * the same key with multiple resources. * Keys must start with a lowercase
   * letter or international character. See [Google Cloud
   * Document](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements)
   * for more details.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * A 0-indexed integer that specifies the current offset (that is, starting
   * result location, amongst the Products deemed by the API as relevant) in
   * search results. This field is only considered if page_token is unset. If
   * this field is negative, an INVALID_ARGUMENT is returned.
   */
  offset?: number;
  /**
   * The order in which products are returned. Products can be ordered by a
   * field in an Product object. Leave it unset if ordered by relevance. OrderBy
   * expression is case-sensitive. See more details at this [user
   * guide](https://cloud.google.com/retail/docs/filter-and-order#order). If
   * this field is unrecognizable, an INVALID_ARGUMENT is returned.
   */
  orderBy?: string;
  /**
   * The categories associated with a category page. Required for category
   * navigation queries to achieve good search quality. The format should be the
   * same as UserEvent.page_categories; To represent full path of category, use
   * '>' sign to separate different hierarchies. If '>' is part of the category
   * name, replace it with other character(s). Category pages include special
   * pages such as sales or promotions. For instance, a special sale page may
   * have the category hierarchy: "pageCategories" : ["Sales > 2017 Black Friday
   * Deals"].
   */
  pageCategories?: string[];
  /**
   * Maximum number of Products to return. If unspecified, defaults to a
   * reasonable value. The maximum allowed value is 120. Values above 120 will
   * be coerced to 120. If this field is negative, an INVALID_ARGUMENT is
   * returned.
   */
  pageSize?: number;
  /**
   * A page token SearchResponse.next_page_token, received from a previous
   * SearchService.Search call. Provide this to retrieve the subsequent page.
   * When paginating, all other parameters provided to SearchService.Search must
   * match the call that provided the page token. Otherwise, an INVALID_ARGUMENT
   * error is returned.
   */
  pageToken?: string;
  /**
   * The specification for personalization. Notice that if both
   * ServingConfig.personalization_spec and SearchRequest.personalization_spec
   * are set. SearchRequest.personalization_spec will override
   * ServingConfig.personalization_spec.
   */
  personalizationSpec?: GoogleCloudRetailV2SearchRequestPersonalizationSpec;
  /**
   * Raw search query. If this field is empty, the request is considered a
   * category browsing request and returned results are based on filter and
   * page_categories.
   */
  query?: string;
  /**
   * The query expansion specification that specifies the conditions under
   * which query expansion will occur. See more details at this [user
   * guide](https://cloud.google.com/retail/docs/result-size#query_expansion).
   */
  queryExpansionSpec?: GoogleCloudRetailV2SearchRequestQueryExpansionSpec;
  /**
   * The search mode of the search request. If not specified, a single search
   * request triggers both product search and faceted search.
   */
  searchMode?:  | "SEARCH_MODE_UNSPECIFIED" | "PRODUCT_SEARCH_ONLY" | "FACETED_SEARCH_ONLY";
  /**
   * The spell correction specification that specifies the mode under which
   * spell correction will take effect.
   */
  spellCorrectionSpec?: GoogleCloudRetailV2SearchRequestSpellCorrectionSpec;
  /**
   * User information.
   */
  userInfo?: GoogleCloudRetailV2UserInfo;
  /**
   * The keys to fetch and rollup the matching variant Products attributes,
   * FulfillmentInfo or LocalInventorys attributes. The attributes from all the
   * matching variant Products or LocalInventorys are merged and de-duplicated.
   * Notice that rollup attributes will lead to extra query latency. Maximum
   * number of keys is 30. For FulfillmentInfo, a fulfillment type and a
   * fulfillment ID must be provided in the format of
   * "fulfillmentType.fulfillmentId". E.g., in "pickupInStore.store123",
   * "pickupInStore" is fulfillment type and "store123" is the store ID.
   * Supported keys are: * colorFamilies * price * originalPrice * discount *
   * variantId * inventory(place_id,price) * inventory(place_id,original_price)
   * * inventory(place_id,attributes.key), where key is any key in the
   * Product.local_inventories.attributes map. * attributes.key, where key is
   * any key in the Product.attributes map. * pickupInStore.id, where id is any
   * FulfillmentInfo.place_ids for FulfillmentInfo.type "pickup-in-store". *
   * shipToStore.id, where id is any FulfillmentInfo.place_ids for
   * FulfillmentInfo.type "ship-to-store". * sameDayDelivery.id, where id is any
   * FulfillmentInfo.place_ids for FulfillmentInfo.type "same-day-delivery". *
   * nextDayDelivery.id, where id is any FulfillmentInfo.place_ids for
   * FulfillmentInfo.type "next-day-delivery". * customFulfillment1.id, where id
   * is any FulfillmentInfo.place_ids for FulfillmentInfo.type "custom-type-1".
   * * customFulfillment2.id, where id is any FulfillmentInfo.place_ids for
   * FulfillmentInfo.type "custom-type-2". * customFulfillment3.id, where id is
   * any FulfillmentInfo.place_ids for FulfillmentInfo.type "custom-type-3". *
   * customFulfillment4.id, where id is any FulfillmentInfo.place_ids for
   * FulfillmentInfo.type "custom-type-4". * customFulfillment5.id, where id is
   * any FulfillmentInfo.place_ids for FulfillmentInfo.type "custom-type-5". If
   * this field is set to an invalid value other than these, an INVALID_ARGUMENT
   * error is returned.
   */
  variantRollupKeys?: string[];
  /**
   * Required. A unique identifier for tracking visitors. For example, this
   * could be implemented with an HTTP cookie, which should be able to uniquely
   * identify a visitor on a single device. This unique identifier should not
   * change if the visitor logs in or out of the website. This should be the
   * same identifier as UserEvent.visitor_id. The field must be a UTF-8 encoded
   * string with a length limit of 128 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned.
   */
  visitorId?: string;
}

/**
 * Boost specification to boost certain items.
 */
export interface GoogleCloudRetailV2SearchRequestBoostSpec {
  /**
   * Condition boost specifications. If a product matches multiple conditions
   * in the specifictions, boost scores from these specifications are all
   * applied and combined in a non-linear way. Maximum number of specifications
   * is 20.
   */
  conditionBoostSpecs?: GoogleCloudRetailV2SearchRequestBoostSpecConditionBoostSpec[];
  /**
   * Whether to skip boostspec validation. If this field is set to true,
   * invalid BoostSpec.condition_boost_specs will be ignored and valid
   * BoostSpec.condition_boost_specs will still be applied.
   */
  skipBoostSpecValidation?: boolean;
}

/**
 * Boost applies to products which match a condition.
 */
export interface GoogleCloudRetailV2SearchRequestBoostSpecConditionBoostSpec {
  /**
   * Strength of the condition boost, which should be in [-1, 1]. Negative
   * boost means demotion. Default is 0.0. Setting to 1.0 gives the item a big
   * promotion. However, it does not necessarily mean that the boosted item will
   * be the top result at all times, nor that other items will be excluded.
   * Results could still be shown even when none of them matches the condition.
   * And results that are significantly more relevant to the search query can
   * still trump your heavily favored but irrelevant items. Setting to -1.0
   * gives the item a big demotion. However, results that are deeply relevant
   * might still be shown. The item will have an upstream battle to get a fairly
   * high ranking, but it is not blocked out completely. Setting to 0.0 means no
   * boost applied. The boosting condition is ignored.
   */
  boost?: number;
  /**
   * An expression which specifies a boost condition. The syntax and supported
   * fields are the same as a filter expression. See SearchRequest.filter for
   * detail syntax and limitations. Examples: * To boost products with product
   * ID "product_1" or "product_2", and color "Red" or "Blue": * (id:
   * ANY("product_1", "product_2")) AND (colorFamilies: ANY("Red","Blue"))
   */
  condition?: string;
}

/**
 * The specifications of dynamically generated facets.
 */
export interface GoogleCloudRetailV2SearchRequestDynamicFacetSpec {
  /**
   * Mode of the DynamicFacet feature. Defaults to Mode.DISABLED if it's unset.
   */
  mode?:  | "MODE_UNSPECIFIED" | "DISABLED" | "ENABLED";
}

/**
 * A facet specification to perform faceted search.
 */
export interface GoogleCloudRetailV2SearchRequestFacetSpec {
  /**
   * Enables dynamic position for this facet. If set to true, the position of
   * this facet among all facets in the response is determined by Google Retail
   * Search. It will be ordered together with dynamic facets if dynamic facets
   * is enabled. If set to false, the position of this facet in the response
   * will be the same as in the request, and it will be ranked before the facets
   * with dynamic position enable and all dynamic facets. For example, you may
   * always want to have rating facet returned in the response, but it's not
   * necessarily to always display the rating facet at the top. In that case,
   * you can set enable_dynamic_position to true so that the position of rating
   * facet in response will be determined by Google Retail Search. Another
   * example, assuming you have the following facets in the request: * "rating",
   * enable_dynamic_position = true * "price", enable_dynamic_position = false *
   * "brands", enable_dynamic_position = false And also you have a dynamic
   * facets enable, which will generate a facet 'gender'. Then the final order
   * of the facets in the response can be ("price", "brands", "rating",
   * "gender") or ("price", "brands", "gender", "rating") depends on how Google
   * Retail Search orders "gender" and "rating" facets. However, notice that
   * "price" and "brands" will always be ranked at 1st and 2nd position since
   * their enable_dynamic_position are false.
   */
  enableDynamicPosition?: boolean;
  /**
   * List of keys to exclude when faceting. By default, FacetKey.key is not
   * excluded from the filter unless it is listed in this field. Listing a facet
   * key in this field allows its values to appear as facet results, even when
   * they are filtered out of search results. Using this field does not affect
   * what search results are returned. For example, suppose there are 100
   * products with the color facet "Red" and 200 products with the color facet
   * "Blue". A query containing the filter "colorFamilies:ANY("Red")" and having
   * "colorFamilies" as FacetKey.key would by default return only "Red" products
   * in the search results, and also return "Red" with count 100 as the only
   * color facet. Although there are also blue products available, "Blue" would
   * not be shown as an available facet value. If "colorFamilies" is listed in
   * "excludedFilterKeys", then the query returns the facet values "Red" with
   * count 100 and "Blue" with count 200, because the "colorFamilies" key is now
   * excluded from the filter. Because this field doesn't affect search results,
   * the search results are still correctly filtered to return only "Red"
   * products. A maximum of 100 values are allowed. Otherwise, an
   * INVALID_ARGUMENT error is returned.
   */
  excludedFilterKeys?: string[];
  /**
   * Required. The facet key specification.
   */
  facetKey?: GoogleCloudRetailV2SearchRequestFacetSpecFacetKey;
  /**
   * Maximum of facet values that should be returned for this facet. If
   * unspecified, defaults to 50. The maximum allowed value is 300. Values above
   * 300 will be coerced to 300. If this field is negative, an INVALID_ARGUMENT
   * is returned.
   */
  limit?: number;
}

/**
 * Specifies how a facet is computed.
 */
export interface GoogleCloudRetailV2SearchRequestFacetSpecFacetKey {
  /**
   * True to make facet keys case insensitive when getting faceting values with
   * prefixes or contains; false otherwise.
   */
  caseInsensitive?: boolean;
  /**
   * Only get facet values that contains the given strings. For example,
   * suppose "categories" has three values "Women > Shoe", "Women > Dress" and
   * "Men > Shoe". If set "contains" to "Shoe", the "categories" facet will give
   * only "Women > Shoe" and "Men > Shoe". Only supported on textual fields.
   * Maximum is 10.
   */
  contains?: string[];
  /**
   * Set only if values should be bucketized into intervals. Must be set for
   * facets with numerical values. Must not be set for facet with text values.
   * Maximum number of intervals is 30.
   */
  intervals?: GoogleCloudRetailV2Interval[];
  /**
   * Required. Supported textual and numerical facet keys in Product object,
   * over which the facet values are computed. Facet key is case-sensitive.
   * Allowed facet keys when FacetKey.query is not specified: * textual_field =
   * * "brands" * "categories" * "genders" * "ageGroups" * "availability" *
   * "colorFamilies" * "colors" * "sizes" * "materials" * "patterns" *
   * "conditions" * "attributes.key" * "pickupInStore" * "shipToStore" *
   * "sameDayDelivery" * "nextDayDelivery" * "customFulfillment1" *
   * "customFulfillment2" * "customFulfillment3" * "customFulfillment4" *
   * "customFulfillment5" * "inventory(place_id,attributes.key)" *
   * numerical_field = * "price" * "discount" * "rating" * "ratingCount" *
   * "attributes.key" * "inventory(place_id,price)" *
   * "inventory(place_id,original_price)" * "inventory(place_id,attributes.key)"
   */
  key?: string;
  /**
   * The order in which SearchResponse.Facet.values are returned. Allowed
   * values are: * "count desc", which means order by
   * SearchResponse.Facet.values.count descending. * "value desc", which means
   * order by SearchResponse.Facet.values.value descending. Only applies to
   * textual facets. If not set, textual values are sorted in [natural
   * order](https://en.wikipedia.org/wiki/Natural_sort_order); numerical
   * intervals are sorted in the order given by FacetSpec.FacetKey.intervals;
   * FulfillmentInfo.place_ids are sorted in the order given by
   * FacetSpec.FacetKey.restricted_values.
   */
  orderBy?: string;
  /**
   * Only get facet values that start with the given string prefix. For
   * example, suppose "categories" has three values "Women > Shoe", "Women >
   * Dress" and "Men > Shoe". If set "prefixes" to "Women", the "categories"
   * facet will give only "Women > Shoe" and "Women > Dress". Only supported on
   * textual fields. Maximum is 10.
   */
  prefixes?: string[];
  /**
   * The query that is used to compute facet for the given facet key. When
   * provided, it will override the default behavior of facet computation. The
   * query syntax is the same as a filter expression. See SearchRequest.filter
   * for detail syntax and limitations. Notice that there is no limitation on
   * FacetKey.key when query is specified. In the response,
   * SearchResponse.Facet.values.value will be always "1" and
   * SearchResponse.Facet.values.count will be the number of results that match
   * the query. For example, you can set a customized facet for "shipToStore",
   * where FacetKey.key is "customizedShipToStore", and FacetKey.query is
   * "availability: ANY(\"IN_STOCK\") AND shipToStore: ANY(\"123\")". Then the
   * facet will count the products that are both in stock and ship to store
   * "123".
   */
  query?: string;
  /**
   * Only get facet for the given restricted values. For example, when using
   * "pickupInStore" as key and set restricted values to ["store123",
   * "store456"], only facets for "store123" and "store456" are returned. Only
   * supported on predefined textual fields, custom textual attributes and
   * fulfillments. Maximum is 20. Must be set for the fulfillment facet keys: *
   * pickupInStore * shipToStore * sameDayDelivery * nextDayDelivery *
   * customFulfillment1 * customFulfillment2 * customFulfillment3 *
   * customFulfillment4 * customFulfillment5
   */
  restrictedValues?: string[];
  /**
   * Returns the min and max value for each numerical facet intervals. Ignored
   * for textual facets.
   */
  returnMinMax?: boolean;
}

/**
 * The specification for personalization.
 */
export interface GoogleCloudRetailV2SearchRequestPersonalizationSpec {
  /**
   * Defaults to Mode.AUTO.
   */
  mode?:  | "MODE_UNSPECIFIED" | "AUTO" | "DISABLED";
}

/**
 * Specification to determine under which conditions query expansion should
 * occur.
 */
export interface GoogleCloudRetailV2SearchRequestQueryExpansionSpec {
  /**
   * The condition under which query expansion should occur. Default to
   * Condition.DISABLED.
   */
  condition?:  | "CONDITION_UNSPECIFIED" | "DISABLED" | "AUTO";
  /**
   * Whether to pin unexpanded results. If this field is set to true,
   * unexpanded products are always at the top of the search results, followed
   * by the expanded results.
   */
  pinUnexpandedResults?: boolean;
}

/**
 * The specification for query spell correction.
 */
export interface GoogleCloudRetailV2SearchRequestSpellCorrectionSpec {
  /**
   * The mode under which spell correction should take effect to replace the
   * original search query. Default to Mode.AUTO.
   */
  mode?:  | "MODE_UNSPECIFIED" | "SUGGESTION_ONLY" | "AUTO";
}

/**
 * Response message for SearchService.Search method.
 */
export interface GoogleCloudRetailV2SearchResponse {
  /**
   * The fully qualified resource name of applied
   * [controls](https://cloud.google.com/retail/docs/serving-control-rules).
   */
  appliedControls?: string[];
  /**
   * A unique search token. This should be included in the UserEvent logs
   * resulting from this search, which enables accurate attribution of search
   * model performance.
   */
  attributionToken?: string;
  /**
   * Contains the spell corrected query, if found. If the spell correction type
   * is AUTOMATIC, then the search results are based on corrected_query.
   * Otherwise the original query is used for search.
   */
  correctedQuery?: string;
  /**
   * Metadata related to A/B testing Experiment associated with this response.
   * Only exists when an experiment is triggered.
   */
  experimentInfo?: GoogleCloudRetailV2ExperimentInfo[];
  /**
   * Results of facets requested by user.
   */
  facets?: GoogleCloudRetailV2SearchResponseFacet[];
  /**
   * The invalid SearchRequest.BoostSpec.condition_boost_specs that are not
   * applied during serving.
   */
  invalidConditionBoostSpecs?: GoogleCloudRetailV2SearchRequestBoostSpecConditionBoostSpec[];
  /**
   * A token that can be sent as SearchRequest.page_token to retrieve the next
   * page. If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Query expansion information for the returned results.
   */
  queryExpansionInfo?: GoogleCloudRetailV2SearchResponseQueryExpansionInfo;
  /**
   * The URI of a customer-defined redirect page. If redirect action is
   * triggered, no search is performed, and only redirect_uri and
   * attribution_token are set in the response.
   */
  redirectUri?: string;
  /**
   * A list of matched items. The order represents the ranking.
   */
  results?: GoogleCloudRetailV2SearchResponseSearchResult[];
  /**
   * The estimated total count of matched items irrespective of pagination. The
   * count of results returned by pagination may be less than the total_size
   * that matches.
   */
  totalSize?: number;
}

function serializeGoogleCloudRetailV2SearchResponse(data: any): GoogleCloudRetailV2SearchResponse {
  return {
    ...data,
    facets: data["facets"] !== undefined ? data["facets"].map((item: any) => (serializeGoogleCloudRetailV2SearchResponseFacet(item))) : undefined,
    queryExpansionInfo: data["queryExpansionInfo"] !== undefined ? serializeGoogleCloudRetailV2SearchResponseQueryExpansionInfo(data["queryExpansionInfo"]) : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeGoogleCloudRetailV2SearchResponseSearchResult(item))) : undefined,
  };
}

function deserializeGoogleCloudRetailV2SearchResponse(data: any): GoogleCloudRetailV2SearchResponse {
  return {
    ...data,
    facets: data["facets"] !== undefined ? data["facets"].map((item: any) => (deserializeGoogleCloudRetailV2SearchResponseFacet(item))) : undefined,
    queryExpansionInfo: data["queryExpansionInfo"] !== undefined ? deserializeGoogleCloudRetailV2SearchResponseQueryExpansionInfo(data["queryExpansionInfo"]) : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeGoogleCloudRetailV2SearchResponseSearchResult(item))) : undefined,
  };
}

/**
 * A facet result.
 */
export interface GoogleCloudRetailV2SearchResponseFacet {
  /**
   * Whether the facet is dynamically generated.
   */
  dynamicFacet?: boolean;
  /**
   * The key for this facet. E.g., "colorFamilies" or "price" or
   * "attributes.attr1".
   */
  key?: string;
  /**
   * The facet values for this field.
   */
  values?: GoogleCloudRetailV2SearchResponseFacetFacetValue[];
}

function serializeGoogleCloudRetailV2SearchResponseFacet(data: any): GoogleCloudRetailV2SearchResponseFacet {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (serializeGoogleCloudRetailV2SearchResponseFacetFacetValue(item))) : undefined,
  };
}

function deserializeGoogleCloudRetailV2SearchResponseFacet(data: any): GoogleCloudRetailV2SearchResponseFacet {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (deserializeGoogleCloudRetailV2SearchResponseFacetFacetValue(item))) : undefined,
  };
}

/**
 * A facet value which contains value names and their count.
 */
export interface GoogleCloudRetailV2SearchResponseFacetFacetValue {
  /**
   * Number of items that have this facet value.
   */
  count?: bigint;
  /**
   * Interval value for a facet, such as [10, 20) for facet "price".
   */
  interval?: GoogleCloudRetailV2Interval;
  /**
   * The maximum value in the FacetValue.interval. Only supported on numerical
   * facets and returned if SearchRequest.FacetSpec.FacetKey.return_min_max is
   * true.
   */
  maxValue?: number;
  /**
   * The minimum value in the FacetValue.interval. Only supported on numerical
   * facets and returned if SearchRequest.FacetSpec.FacetKey.return_min_max is
   * true.
   */
  minValue?: number;
  /**
   * Text value of a facet, such as "Black" for facet "colorFamilies".
   */
  value?: string;
}

function serializeGoogleCloudRetailV2SearchResponseFacetFacetValue(data: any): GoogleCloudRetailV2SearchResponseFacetFacetValue {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2SearchResponseFacetFacetValue(data: any): GoogleCloudRetailV2SearchResponseFacetFacetValue {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * Information describing query expansion including whether expansion has
 * occurred.
 */
export interface GoogleCloudRetailV2SearchResponseQueryExpansionInfo {
  /**
   * Bool describing whether query expansion has occurred.
   */
  expandedQuery?: boolean;
  /**
   * Number of pinned results. This field will only be set when expansion
   * happens and SearchRequest.QueryExpansionSpec.pin_unexpanded_results is set
   * to true.
   */
  pinnedResultCount?: bigint;
}

function serializeGoogleCloudRetailV2SearchResponseQueryExpansionInfo(data: any): GoogleCloudRetailV2SearchResponseQueryExpansionInfo {
  return {
    ...data,
    pinnedResultCount: data["pinnedResultCount"] !== undefined ? String(data["pinnedResultCount"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2SearchResponseQueryExpansionInfo(data: any): GoogleCloudRetailV2SearchResponseQueryExpansionInfo {
  return {
    ...data,
    pinnedResultCount: data["pinnedResultCount"] !== undefined ? BigInt(data["pinnedResultCount"]) : undefined,
  };
}

/**
 * Represents the search results.
 */
export interface GoogleCloudRetailV2SearchResponseSearchResult {
  /**
   * Product.id of the searched Product.
   */
  id?: string;
  /**
   * The count of matched variant Products.
   */
  matchingVariantCount?: number;
  /**
   * If a variant Product matches the search query, this map indicates which
   * Product fields are matched. The key is the Product.name, the value is a
   * field mask of the matched Product fields. If matched attributes cannot be
   * determined, this map will be empty. For example, a key "sku1" with field
   * mask "products.color_info" indicates there is a match between "sku1"
   * ColorInfo and the query.
   */
  matchingVariantFields?: {
    [key: string]: string /* FieldMask */
  };
  /**
   * Specifies previous events related to this product for this user based on
   * UserEvent with same SearchRequest.visitor_id or UserInfo.user_id. This is
   * set only when SearchRequest.PersonalizationSpec.mode is
   * SearchRequest.PersonalizationSpec.Mode.AUTO. Possible values: *
   * `purchased`: Indicates that this product has been purchased before.
   */
  personalLabels?: string[];
  /**
   * The product data snippet in the search response. Only Product.name is
   * guaranteed to be populated. Product.variants contains the product variants
   * that match the search query. If there are multiple product variants
   * matching the query, top 5 most relevant product variants are returned and
   * ordered by relevancy. If relevancy can be deternmined, use
   * matching_variant_fields to look up matched product variants fields. If
   * relevancy cannot be determined, e.g. when searching "shoe" all products in
   * a shoe product can be a match, 5 product variants are returned but order is
   * meaningless.
   */
  product?: GoogleCloudRetailV2Product;
  /**
   * The rollup matching variant Product attributes. The key is one of the
   * SearchRequest.variant_rollup_keys. The values are the merged and
   * de-duplicated Product attributes. Notice that the rollup values are respect
   * filter. For example, when filtering by "colorFamilies:ANY(\"red\")" and
   * rollup "colorFamilies", only "red" is returned. For textual and numerical
   * attributes, the rollup values is a list of string or double values with
   * type google.protobuf.ListValue. For example, if there are two variants with
   * colors "red" and "blue", the rollup values are { key: "colorFamilies" value
   * { list_value { values { string_value: "red" } values { string_value: "blue"
   * } } } } For FulfillmentInfo, the rollup values is a double value with type
   * google.protobuf.Value. For example, `{key: "pickupInStore.store1" value {
   * number_value: 10 }}` means a there are 10 variants in this product are
   * available in the store "store1".
   */
  variantRollupValues?: {
    [key: string]: any
  };
}

function serializeGoogleCloudRetailV2SearchResponseSearchResult(data: any): GoogleCloudRetailV2SearchResponseSearchResult {
  return {
    ...data,
    matchingVariantFields: data["matchingVariantFields"] !== undefined ? Object.fromEntries(Object.entries(data["matchingVariantFields"]).map(([k, v]: [string, any]) => ([k, v]))) : undefined,
    product: data["product"] !== undefined ? serializeGoogleCloudRetailV2Product(data["product"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2SearchResponseSearchResult(data: any): GoogleCloudRetailV2SearchResponseSearchResult {
  return {
    ...data,
    matchingVariantFields: data["matchingVariantFields"] !== undefined ? Object.fromEntries(Object.entries(data["matchingVariantFields"]).map(([k, v]: [string, any]) => ([k, v]))) : undefined,
    product: data["product"] !== undefined ? deserializeGoogleCloudRetailV2Product(data["product"]) : undefined,
  };
}

/**
 * Configures metadata that is used to generate serving time results (e.g.
 * search results or recommendation predictions).
 */
export interface GoogleCloudRetailV2ServingConfig {
  /**
   * Condition boost specifications. If a product matches multiple conditions
   * in the specifications, boost scores from these specifications are all
   * applied and combined in a non-linear way. Maximum number of specifications
   * is 100. Notice that if both ServingConfig.boost_control_ids and
   * SearchRequest.boost_spec are set, the boost conditions from both places are
   * evaluated. If a search request matches multiple boost conditions, the final
   * boost score is equal to the sum of the boost scores from all matched boost
   * conditions. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.
   */
  boostControlIds?: string[];
  /**
   * Required. The human readable serving config display name. Used in Retail
   * UI. This field must be a UTF-8 encoded string with a length limit of 128
   * characters. Otherwise, an INVALID_ARGUMENT error is returned.
   */
  displayName?: string;
  /**
   * How much diversity to use in recommendation model results e.g.
   * `medium-diversity` or `high-diversity`. Currently supported values: *
   * `no-diversity` * `low-diversity` * `medium-diversity` * `high-diversity` *
   * `auto-diversity` If not specified, we choose default based on
   * recommendation model type. Default value: `no-diversity`. Can only be set
   * if solution_types is SOLUTION_TYPE_RECOMMENDATION.
   */
  diversityLevel?: string;
  /**
   * What kind of diversity to use - data driven or rule based. If unset, the
   * server behavior defaults to RULE_BASED_DIVERSITY.
   */
  diversityType?:  | "DIVERSITY_TYPE_UNSPECIFIED" | "RULE_BASED_DIVERSITY" | "DATA_DRIVEN_DIVERSITY";
  /**
   * Condition do not associate specifications. If multiple do not associate
   * conditions match, all matching do not associate controls in the list will
   * execute. - Order does not matter. - Maximum number of specifications is
   * 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.
   */
  doNotAssociateControlIds?: string[];
  /**
   * The specification for dynamically generated facets. Notice that only
   * textual facets can be dynamically generated. Can only be set if
   * solution_types is SOLUTION_TYPE_SEARCH.
   */
  dynamicFacetSpec?: GoogleCloudRetailV2SearchRequestDynamicFacetSpec;
  /**
   * Whether to add additional category filters on the `similar-items` model.
   * If not specified, we enable it by default. Allowed values are: *
   * `no-category-match`: No additional filtering of original results from the
   * model and the customer's filters. * `relaxed-category-match`: Only keep
   * results with categories that match at least one item categories in the
   * PredictRequests's context item. * If customer also sends filters in the
   * PredictRequest, then the results will satisfy both conditions (user given
   * and category match). Can only be set if solution_types is
   * SOLUTION_TYPE_RECOMMENDATION.
   */
  enableCategoryFilterLevel?: string;
  /**
   * Facet specifications for faceted search. If empty, no facets are returned.
   * The ids refer to the ids of Control resources with only the Facet control
   * set. These controls are assumed to be in the same Catalog as the
   * ServingConfig. A maximum of 100 values are allowed. Otherwise, an
   * INVALID_ARGUMENT error is returned. Can only be set if solution_types is
   * SOLUTION_TYPE_SEARCH.
   */
  facetControlIds?: string[];
  /**
   * Condition filter specifications. If a product matches multiple conditions
   * in the specifications, filters from these specifications are all applied
   * and combined via the AND operator. Maximum number of specifications is 100.
   * Can only be set if solution_types is SOLUTION_TYPE_SEARCH.
   */
  filterControlIds?: string[];
  /**
   * Condition ignore specifications. If multiple ignore conditions match, all
   * matching ignore controls in the list will execute. - Order does not matter.
   * - Maximum number of specifications is 100. Can only be set if
   * solution_types is SOLUTION_TYPE_SEARCH.
   */
  ignoreControlIds?: string[];
  /**
   * The id of the model in the same Catalog to use at serving time. Currently
   * only RecommendationModels are supported:
   * https://cloud.google.com/retail/recommendations-ai/docs/create-models Can
   * be changed but only to a compatible model (e.g. others-you-may-like CTR to
   * others-you-may-like CVR). Required when solution_types is
   * SOLUTION_TYPE_RECOMMENDATION.
   */
  modelId?: string;
  /**
   * Immutable. Fully qualified name
   * `projects/*\/locations/global/catalogs/*\/servingConfig/*`
   */
  name?: string;
  /**
   * Condition oneway synonyms specifications. If multiple oneway synonyms
   * conditions match, all matching oneway synonyms controls in the list will
   * execute. Order of controls in the list will not matter. Maximum number of
   * specifications is 100. Can only be set if solution_types is
   * SOLUTION_TYPE_SEARCH.
   */
  onewaySynonymsControlIds?: string[];
  /**
   * The specification for personalization spec. Can only be set if
   * solution_types is SOLUTION_TYPE_SEARCH. Notice that if both
   * ServingConfig.personalization_spec and SearchRequest.personalization_spec
   * are set. SearchRequest.personalization_spec will override
   * ServingConfig.personalization_spec.
   */
  personalizationSpec?: GoogleCloudRetailV2SearchRequestPersonalizationSpec;
  /**
   * How much price ranking we want in serving results. Price reranking causes
   * product items with a similar recommendation probability to be ordered by
   * price, with the highest-priced items first. This setting could result in a
   * decrease in click-through and conversion rates. Allowed values are: *
   * `no-price-reranking` * `low-price-reranking` * `medium-price-reranking` *
   * `high-price-reranking` If not specified, we choose default based on model
   * type. Default value: `no-price-reranking`. Can only be set if
   * solution_types is SOLUTION_TYPE_RECOMMENDATION.
   */
  priceRerankingLevel?: string;
  /**
   * Condition redirect specifications. Only the first triggered redirect
   * action is applied, even if multiple apply. Maximum number of specifications
   * is 1000. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.
   */
  redirectControlIds?: string[];
  /**
   * Condition replacement specifications. - Applied according to the order in
   * the list. - A previously replaced term can not be re-replaced. - Maximum
   * number of specifications is 100. Can only be set if solution_types is
   * SOLUTION_TYPE_SEARCH.
   */
  replacementControlIds?: string[];
  /**
   * Required. Immutable. Specifies the solution types that a serving config
   * can be associated with. Currently we support setting only one type of
   * solution.
   */
  solutionTypes?:  | "SOLUTION_TYPE_UNSPECIFIED" | "SOLUTION_TYPE_RECOMMENDATION" | "SOLUTION_TYPE_SEARCH"[];
  /**
   * Condition synonyms specifications. If multiple syonyms conditions match,
   * all matching synonyms control in the list will execute. Order of controls
   * in the list will not matter. Maximum number of specifications is 100. Can
   * only be set if solution_types is SOLUTION_TYPE_SEARCH.
   */
  twowaySynonymsControlIds?: string[];
}

/**
 * Request message to set a specified branch as new default_branch.
 */
export interface GoogleCloudRetailV2SetDefaultBranchRequest {
  /**
   * The final component of the resource name of a branch. This field must be
   * one of "0", "1" or "2". Otherwise, an INVALID_ARGUMENT error is returned.
   * If there are no sufficient active products in the targeted branch and force
   * is not set, a FAILED_PRECONDITION error is returned.
   */
  branchId?: string;
  /**
   * If set to true, it permits switching to a branch with branch_id even if it
   * has no sufficient active products.
   */
  force?: boolean;
  /**
   * Some note on this request, this can be retrieved by
   * CatalogService.GetDefaultBranch before next valid default branch set
   * occurs. This field must be a UTF-8 encoded string with a length limit of
   * 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned.
   */
  note?: string;
}

/**
 * Metadata related to the progress of the SetInventory operation. Currently
 * empty because there is no meaningful metadata populated from the
 * ProductService.SetInventory method.
 */
export interface GoogleCloudRetailV2SetInventoryMetadata {
}

/**
 * Request message for ProductService.SetInventory method.
 */
export interface GoogleCloudRetailV2SetInventoryRequest {
  /**
   * If set to true, and the Product with name Product.name is not found, the
   * inventory update will still be processed and retained for at most 1 day
   * until the Product is created. If set to false, a NOT_FOUND error is
   * returned if the Product is not found.
   */
  allowMissing?: boolean;
  /**
   * Required. The inventory information to update. The allowable fields to
   * update are: * Product.price_info * Product.availability *
   * Product.available_quantity * Product.fulfillment_info The updated inventory
   * fields must be specified in SetInventoryRequest.set_mask. If
   * SetInventoryRequest.inventory.name is empty or invalid, an INVALID_ARGUMENT
   * error is returned. If the caller does not have permission to update the
   * Product named in Product.name, regardless of whether or not it exists, a
   * PERMISSION_DENIED error is returned. If the Product to update does not have
   * existing inventory information, the provided inventory information will be
   * inserted. If the Product to update has existing inventory information, the
   * provided inventory information will be merged while respecting the last
   * update time for each inventory field, using the provided or default value
   * for SetInventoryRequest.set_time. The caller can replace place IDs for a
   * subset of fulfillment types in the following ways: * Adds
   * "fulfillment_info" in SetInventoryRequest.set_mask * Specifies only the
   * desired fulfillment types and corresponding place IDs to update in
   * SetInventoryRequest.inventory.fulfillment_info The caller can clear all
   * place IDs from a subset of fulfillment types in the following ways: * Adds
   * "fulfillment_info" in SetInventoryRequest.set_mask * Specifies only the
   * desired fulfillment types to clear in
   * SetInventoryRequest.inventory.fulfillment_info * Checks that only the
   * desired fulfillment info types have empty
   * SetInventoryRequest.inventory.fulfillment_info.place_ids The last update
   * time is recorded for the following inventory fields: * Product.price_info *
   * Product.availability * Product.available_quantity *
   * Product.fulfillment_info If a full overwrite of inventory information while
   * ignoring timestamps is needed, ProductService.UpdateProduct should be
   * invoked instead.
   */
  inventory?: GoogleCloudRetailV2Product;
  /**
   * Indicates which inventory fields in the provided Product to update. At
   * least one field must be provided. If an unsupported or unknown field is
   * provided, an INVALID_ARGUMENT error is returned and the entire update will
   * be ignored.
   */
  setMask?: string /* FieldMask */;
  /**
   * The time when the request is issued, used to prevent out-of-order updates
   * on inventory fields with the last update time recorded. If not provided,
   * the internal system time will be used.
   */
  setTime?: Date;
}

function serializeGoogleCloudRetailV2SetInventoryRequest(data: any): GoogleCloudRetailV2SetInventoryRequest {
  return {
    ...data,
    inventory: data["inventory"] !== undefined ? serializeGoogleCloudRetailV2Product(data["inventory"]) : undefined,
    setMask: data["setMask"] !== undefined ? data["setMask"] : undefined,
    setTime: data["setTime"] !== undefined ? data["setTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRetailV2SetInventoryRequest(data: any): GoogleCloudRetailV2SetInventoryRequest {
  return {
    ...data,
    inventory: data["inventory"] !== undefined ? deserializeGoogleCloudRetailV2Product(data["inventory"]) : undefined,
    setMask: data["setMask"] !== undefined ? data["setMask"] : undefined,
    setTime: data["setTime"] !== undefined ? new Date(data["setTime"]) : undefined,
  };
}

/**
 * Response of the SetInventoryRequest. Currently empty because there is no
 * meaningful response populated from the ProductService.SetInventory method.
 */
export interface GoogleCloudRetailV2SetInventoryResponse {
}

/**
 * Metadata associated with a tune operation.
 */
export interface GoogleCloudRetailV2TuneModelMetadata {
  /**
   * The resource name of the model that this tune applies to. Format:
   * `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}`
   */
  model?: string;
}

/**
 * Request to manually start a tuning process now (instead of waiting for the
 * periodically scheduled tuning to happen).
 */
export interface GoogleCloudRetailV2TuneModelRequest {
}

/**
 * Response associated with a tune operation.
 */
export interface GoogleCloudRetailV2TuneModelResponse {
}

/**
 * UserEvent captures all metadata information Retail API needs to know about
 * how end users interact with customers' website.
 */
export interface GoogleCloudRetailV2UserEvent {
  /**
   * Extra user event features to include in the recommendation model. If you
   * provide custom attributes for ingested user events, also include them in
   * the user events that you associate with prediction requests. Custom
   * attribute formatting must be consistent between imported events and events
   * provided with prediction requests. This lets the Retail API use those
   * custom attributes when training models and serving predictions, which helps
   * improve recommendation quality. This field needs to pass all below
   * criteria, otherwise an INVALID_ARGUMENT error is returned: * The key must
   * be a UTF-8 encoded string with a length limit of 5,000 characters. * For
   * text attributes, at most 400 values are allowed. Empty values are not
   * allowed. Each value must be a UTF-8 encoded string with a length limit of
   * 256 characters. * For number attributes, at most 400 values are allowed.
   * For product recommendations, an example of extra user information is
   * traffic_channel, which is how a user arrives at the site. Users can arrive
   * at the site by coming to the site directly, coming through Google search,
   * or in other ways.
   */
  attributes?: {
    [key: string]: GoogleCloudRetailV2CustomAttribute
  };
  /**
   * Highly recommended for user events that are the result of
   * PredictionService.Predict. This field enables accurate attribution of
   * recommendation model performance. The value must be a valid
   * PredictResponse.attribution_token for user events that are the result of
   * PredictionService.Predict. The value must be a valid
   * SearchResponse.attribution_token for user events that are the result of
   * SearchService.Search. This token enables us to accurately attribute page
   * view or purchase back to the event and the particular predict response
   * containing this clicked/purchased product. If user clicks on product K in
   * the recommendation results, pass PredictResponse.attribution_token as a URL
   * parameter to product K's page. When recording events on product K's page,
   * log the PredictResponse.attribution_token to this field.
   */
  attributionToken?: string;
  /**
   * The ID or name of the associated shopping cart. This ID is used to
   * associate multiple items added or present in the cart before purchase. This
   * can only be set for `add-to-cart`, `purchase-complete`, or
   * `shopping-cart-page-view` events.
   */
  cartId?: string;
  /**
   * The main auto-completion details related to the event. This field should
   * be set for `search` event when autocomplete function is enabled and the
   * user clicks a suggestion for search.
   */
  completionDetail?: GoogleCloudRetailV2CompletionDetail;
  /**
   * Represents the domain of the user event, for projects that combine
   * domains. For example: retailer can have events from multiple domains like
   * retailer-main, retailer-baby, retailer-meds, etc. under one project.
   */
  domain?: string;
  /**
   * Only required for UserEventService.ImportUserEvents method. Timestamp of
   * when the user event happened.
   */
  eventTime?: Date;
  /**
   * Required. User event type. Allowed values are: * `add-to-cart`: Products
   * being added to cart. * `category-page-view`: Special pages such as sale or
   * promotion pages viewed. * `detail-page-view`: Products detail page viewed.
   * * `home-page-view`: Homepage viewed. * `promotion-offered`: Promotion is
   * offered to a user. * `promotion-not-offered`: Promotion is not offered to a
   * user. * `purchase-complete`: User finishing a purchase. * `search`: Product
   * search. * `shopping-cart-page-view`: User viewing a shopping cart.
   */
  eventType?: string;
  /**
   * A list of identifiers for the independent experiment groups this user
   * event belongs to. This is used to distinguish between user events
   * associated with different experiment setups (e.g. using Retail API, using
   * different recommendation models).
   */
  experimentIds?: string[];
  /**
   * The filter syntax consists of an expression language for constructing a
   * predicate from one or more fields of the products being filtered. See
   * SearchRequest.filter for definition and syntax. The value must be a UTF-8
   * encoded string with a length limit of 1,000 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned.
   */
  filter?: string;
  /**
   * An integer that specifies the current offset for pagination (the 0-indexed
   * starting location, amongst the products deemed by the API as relevant). See
   * SearchRequest.offset for definition. If this field is negative, an
   * INVALID_ARGUMENT is returned. This can only be set for `search` events.
   * Other event types should not set this field. Otherwise, an INVALID_ARGUMENT
   * error is returned.
   */
  offset?: number;
  /**
   * The order in which products are returned. See SearchRequest.order_by for
   * definition and syntax. The value must be a UTF-8 encoded string with a
   * length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is
   * returned. This can only be set for `search` events. Other event types
   * should not set this field. Otherwise, an INVALID_ARGUMENT error is
   * returned.
   */
  orderBy?: string;
  /**
   * The categories associated with a category page. To represent full path of
   * category, use '>' sign to separate different hierarchies. If '>' is part of
   * the category name, replace it with other character(s). Category pages
   * include special pages such as sales or promotions. For instance, a special
   * sale page may have the category hierarchy: "pageCategories" : ["Sales >
   * 2017 Black Friday Deals"]. Required for `category-page-view` events. At
   * least one of search_query or page_categories is required for `search`
   * events. Other event types should not set this field. Otherwise, an
   * INVALID_ARGUMENT error is returned.
   */
  pageCategories?: string[];
  /**
   * A unique ID of a web page view. This should be kept the same for all user
   * events triggered from the same pageview. For example, an item detail page
   * view could trigger multiple events as the user is browsing the page. The
   * `pageViewId` property should be kept the same for all these events so that
   * they can be grouped together properly. When using the client side event
   * reporting with JavaScript pixel and Google Tag Manager, this value is
   * filled in automatically.
   */
  pageViewId?: string;
  /**
   * The main product details related to the event. This field is optional
   * except for the following event types: * `add-to-cart` * `detail-page-view`
   * * `purchase-complete` In a `search` event, this field represents the
   * products returned to the end user on the current page (the end user may
   * have not finished browsing the whole page yet). When a new page is returned
   * to the end user, after pagination/filtering/ordering even for the same
   * query, a new `search` event with different product_details is desired. The
   * end user may have not finished browsing the whole page yet.
   */
  productDetails?: GoogleCloudRetailV2ProductDetail[];
  /**
   * A transaction represents the entire purchase transaction. Required for
   * `purchase-complete` events. Other event types should not set this field.
   * Otherwise, an INVALID_ARGUMENT error is returned.
   */
  purchaseTransaction?: GoogleCloudRetailV2PurchaseTransaction;
  /**
   * The referrer URL of the current page. When using the client side event
   * reporting with JavaScript pixel and Google Tag Manager, this value is
   * filled in automatically.
   */
  referrerUri?: string;
  /**
   * The user's search query. See SearchRequest.query for definition. The value
   * must be a UTF-8 encoded string with a length limit of 5,000 characters.
   * Otherwise, an INVALID_ARGUMENT error is returned. At least one of
   * search_query or page_categories is required for `search` events. Other
   * event types should not set this field. Otherwise, an INVALID_ARGUMENT error
   * is returned.
   */
  searchQuery?: string;
  /**
   * A unique identifier for tracking a visitor session with a length limit of
   * 128 bytes. A session is an aggregation of an end user behavior in a time
   * span. A general guideline to populate the sesion_id: 1. If user has no
   * activity for 30 min, a new session_id should be assigned. 2. The session_id
   * should be unique across users, suggest use uuid or add visitor_id as
   * prefix.
   */
  sessionId?: string;
  /**
   * Complete URL (window.location.href) of the user's current page. When using
   * the client side event reporting with JavaScript pixel and Google Tag
   * Manager, this value is filled in automatically. Maximum length 5,000
   * characters.
   */
  uri?: string;
  /**
   * User information.
   */
  userInfo?: GoogleCloudRetailV2UserInfo;
  /**
   * Required. A unique identifier for tracking visitors. For example, this
   * could be implemented with an HTTP cookie, which should be able to uniquely
   * identify a visitor on a single device. This unique identifier should not
   * change if the visitor log in/out of the website. Don't set the field to the
   * same fixed ID for different users. This mixes the event history of those
   * users together, which results in degraded model quality. The field must be
   * a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned. The field should not contain PII or
   * user-data. We recommend to use Google Analytics [Client
   * ID](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#clientId)
   * for this field.
   */
  visitorId?: string;
}

function serializeGoogleCloudRetailV2UserEvent(data: any): GoogleCloudRetailV2UserEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? data["eventTime"].toISOString() : undefined,
    productDetails: data["productDetails"] !== undefined ? data["productDetails"].map((item: any) => (serializeGoogleCloudRetailV2ProductDetail(item))) : undefined,
  };
}

function deserializeGoogleCloudRetailV2UserEvent(data: any): GoogleCloudRetailV2UserEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? new Date(data["eventTime"]) : undefined,
    productDetails: data["productDetails"] !== undefined ? data["productDetails"].map((item: any) => (deserializeGoogleCloudRetailV2ProductDetail(item))) : undefined,
  };
}

/**
 * A summary of import result. The UserEventImportSummary summarizes the import
 * status for user events.
 */
export interface GoogleCloudRetailV2UserEventImportSummary {
  /**
   * Count of user events imported with complete existing catalog information.
   */
  joinedEventsCount?: bigint;
  /**
   * Count of user events imported, but with catalog information not found in
   * the imported catalog.
   */
  unjoinedEventsCount?: bigint;
}

function serializeGoogleCloudRetailV2UserEventImportSummary(data: any): GoogleCloudRetailV2UserEventImportSummary {
  return {
    ...data,
    joinedEventsCount: data["joinedEventsCount"] !== undefined ? String(data["joinedEventsCount"]) : undefined,
    unjoinedEventsCount: data["unjoinedEventsCount"] !== undefined ? String(data["unjoinedEventsCount"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2UserEventImportSummary(data: any): GoogleCloudRetailV2UserEventImportSummary {
  return {
    ...data,
    joinedEventsCount: data["joinedEventsCount"] !== undefined ? BigInt(data["joinedEventsCount"]) : undefined,
    unjoinedEventsCount: data["unjoinedEventsCount"] !== undefined ? BigInt(data["unjoinedEventsCount"]) : undefined,
  };
}

/**
 * The inline source for the input config for ImportUserEvents method.
 */
export interface GoogleCloudRetailV2UserEventInlineSource {
  /**
   * Required. A list of user events to import. Recommended max of 10k items.
   */
  userEvents?: GoogleCloudRetailV2UserEvent[];
}

function serializeGoogleCloudRetailV2UserEventInlineSource(data: any): GoogleCloudRetailV2UserEventInlineSource {
  return {
    ...data,
    userEvents: data["userEvents"] !== undefined ? data["userEvents"].map((item: any) => (serializeGoogleCloudRetailV2UserEvent(item))) : undefined,
  };
}

function deserializeGoogleCloudRetailV2UserEventInlineSource(data: any): GoogleCloudRetailV2UserEventInlineSource {
  return {
    ...data,
    userEvents: data["userEvents"] !== undefined ? data["userEvents"].map((item: any) => (deserializeGoogleCloudRetailV2UserEvent(item))) : undefined,
  };
}

/**
 * The input config source for user events.
 */
export interface GoogleCloudRetailV2UserEventInputConfig {
  /**
   * Required. BigQuery input source.
   */
  bigQuerySource?: GoogleCloudRetailV2BigQuerySource;
  /**
   * Required. Google Cloud Storage location for the input content.
   */
  gcsSource?: GoogleCloudRetailV2GcsSource;
  /**
   * Required. The Inline source for the input content for UserEvents.
   */
  userEventInlineSource?: GoogleCloudRetailV2UserEventInlineSource;
}

function serializeGoogleCloudRetailV2UserEventInputConfig(data: any): GoogleCloudRetailV2UserEventInputConfig {
  return {
    ...data,
    userEventInlineSource: data["userEventInlineSource"] !== undefined ? serializeGoogleCloudRetailV2UserEventInlineSource(data["userEventInlineSource"]) : undefined,
  };
}

function deserializeGoogleCloudRetailV2UserEventInputConfig(data: any): GoogleCloudRetailV2UserEventInputConfig {
  return {
    ...data,
    userEventInlineSource: data["userEventInlineSource"] !== undefined ? deserializeGoogleCloudRetailV2UserEventInlineSource(data["userEventInlineSource"]) : undefined,
  };
}

/**
 * Information of an end user.
 */
export interface GoogleCloudRetailV2UserInfo {
  /**
   * True if the request is made directly from the end user, in which case the
   * ip_address and user_agent can be populated from the HTTP request. This flag
   * should be set only if the API request is made directly from the end user
   * such as a mobile app (and not if a gateway or a server is processing and
   * pushing the user events). This should not be set when using the JavaScript
   * tag in UserEventService.CollectUserEvent.
   */
  directUserRequest?: boolean;
  /**
   * The end user's IP address. This field is used to extract location
   * information for personalization. This field must be either an IPv4 address
   * (e.g. "104.133.9.80") or an IPv6 address (e.g.
   * "2001:0db8:85a3:0000:0000:8a2e:0370:7334"). Otherwise, an INVALID_ARGUMENT
   * error is returned. This should not be set when: * setting
   * SearchRequest.user_info. * using the JavaScript tag in
   * UserEventService.CollectUserEvent or if direct_user_request is set.
   */
  ipAddress?: string;
  /**
   * User agent as included in the HTTP header. Required for getting
   * SearchResponse.sponsored_results. The field must be a UTF-8 encoded string
   * with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT
   * error is returned. This should not be set when using the client side event
   * reporting with GTM or JavaScript tag in UserEventService.CollectUserEvent
   * or if direct_user_request is set.
   */
  userAgent?: string;
  /**
   * Highly recommended for logged-in users. Unique identifier for logged-in
   * user, such as a user name. Don't set for anonymous users. Always use a
   * hashed value for this ID. Don't set the field to the same fixed ID for
   * different users. This mixes the event history of those users together,
   * which results in degraded model quality. The field must be a UTF-8 encoded
   * string with a length limit of 128 characters. Otherwise, an
   * INVALID_ARGUMENT error is returned.
   */
  userId?: string;
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
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following: * A full date, with non-zero year, month, and day values. * A
 * month and day, with a zero year (for example, an anniversary). * A year on
 * its own, with a zero month and a zero day. * A year and month, with a zero
 * day (for example, a credit card expiration date). Related types: *
 * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp
 */
export interface GoogleTypeDate {
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
 * Additional options for
 * Retail#projectsLocationsCatalogsBranchesProductsCreate.
 */
export interface ProjectsLocationsCatalogsBranchesProductsCreateOptions {
  /**
   * Required. The ID to use for the Product, which will become the final
   * component of the Product.name. If the caller does not have permission to
   * create the Product, regardless of whether or not it exists, a
   * PERMISSION_DENIED error is returned. This field must be unique among all
   * Products with the same parent. Otherwise, an ALREADY_EXISTS error is
   * returned. This field must be a UTF-8 encoded string with a length limit of
   * 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.
   */
  productId?: string;
}

/**
 * Additional options for Retail#projectsLocationsCatalogsBranchesProductsList.
 */
export interface ProjectsLocationsCatalogsBranchesProductsListOptions {
  /**
   * A filter to apply on the list results. Supported features: * List all the
   * products under the parent branch if filter is unset. * List
   * Product.Type.VARIANT Products sharing the same Product.Type.PRIMARY
   * Product. For example: `primary_product_id = "some_product_id"` * List
   * Products bundled in a Product.Type.COLLECTION Product. For example:
   * `collection_product_id = "some_product_id"` * List Products with a
   * partibular type. For example: `type = "PRIMARY"` `type = "VARIANT"` `type =
   * "COLLECTION"` If the field is unrecognizable, an INVALID_ARGUMENT error is
   * returned. If the specified Product.Type.PRIMARY Product or
   * Product.Type.COLLECTION Product does not exist, a NOT_FOUND error is
   * returned.
   */
  filter?: string;
  /**
   * Maximum number of Products to return. If unspecified, defaults to 100. The
   * maximum allowed value is 1000. Values above 1000 will be coerced to 1000.
   * If this field is negative, an INVALID_ARGUMENT error is returned.
   */
  pageSize?: number;
  /**
   * A page token ListProductsResponse.next_page_token, received from a
   * previous ProductService.ListProducts call. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to
   * ProductService.ListProducts must match the call that provided the page
   * token. Otherwise, an INVALID_ARGUMENT error is returned.
   */
  pageToken?: string;
  /**
   * The fields of Product to return in the responses. If not set or empty, the
   * following fields are returned: * Product.name * Product.id * Product.title
   * * Product.uri * Product.images * Product.price_info * Product.brands If "*"
   * is provided, all fields are returned. Product.name is always returned no
   * matter what mask is set. If an unsupported or unknown field is provided, an
   * INVALID_ARGUMENT error is returned.
   */
  readMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCatalogsBranchesProductsListOptions(data: any): ProjectsLocationsCatalogsBranchesProductsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeProjectsLocationsCatalogsBranchesProductsListOptions(data: any): ProjectsLocationsCatalogsBranchesProductsListOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Additional options for
 * Retail#projectsLocationsCatalogsBranchesProductsPatch.
 */
export interface ProjectsLocationsCatalogsBranchesProductsPatchOptions {
  /**
   * If set to true, and the Product is not found, a new Product will be
   * created. In this situation, `update_mask` is ignored.
   */
  allowMissing?: boolean;
  /**
   * Indicates which fields in the provided Product to update. The immutable
   * and output only fields are NOT supported. If not set, all supported fields
   * (the fields that are neither immutable nor output only) are updated. If an
   * unsupported or unknown field is provided, an INVALID_ARGUMENT error is
   * returned. The attribute key can be updated by setting the mask path as
   * "attributes.${key_name}". If a key name is present in the mask but not in
   * the patching product from the request, this key will be deleted after the
   * update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCatalogsBranchesProductsPatchOptions(data: any): ProjectsLocationsCatalogsBranchesProductsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCatalogsBranchesProductsPatchOptions(data: any): ProjectsLocationsCatalogsBranchesProductsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Retail#projectsLocationsCatalogsCompleteQuery.
 */
export interface ProjectsLocationsCatalogsCompleteQueryOptions {
  /**
   * Determines which dataset to use for fetching completion. "user-data" will
   * use the imported dataset through CompletionService.ImportCompletionData.
   * "cloud-retail" will use the dataset generated by cloud retail based on user
   * events. If leave empty, it will use the "user-data". Current supported
   * values: * user-data * cloud-retail: This option requires enabling
   * auto-learning function first. See
   * [guidelines](https://cloud.google.com/retail/docs/completion-overview#generated-completion-dataset).
   */
  dataset?: string;
  /**
   * The device type context for completion suggestions. We recommend that you
   * leave this field empty. It can apply different suggestions on different
   * device types, e.g. `DESKTOP`, `MOBILE`. If it is empty, the suggestions are
   * across all device types. Supported formats: * `UNKNOWN_DEVICE_TYPE` *
   * `DESKTOP` * `MOBILE` * A customized string starts with `OTHER_`, e.g.
   * `OTHER_IPHONE`.
   */
  deviceType?: string;
  /**
   * Note that this field applies for `user-data` dataset only. For requests
   * with `cloud-retail` dataset, setting this field has no effect. The language
   * filters applied to the output suggestions. If set, it should contain the
   * language of the query. If not set, suggestions are returned without
   * considering language restrictions. This is the BCP-47 language code, such
   * as "en-US" or "sr-Latn". For more information, see [Tags for Identifying
   * Languages](https://tools.ietf.org/html/bcp47). The maximum number of
   * language codes is 3.
   */
  languageCodes?: string;
  /**
   * Completion max suggestions. If left unset or set to 0, then will fallback
   * to the configured value CompletionConfig.max_suggestions. The maximum
   * allowed max suggestions is 20. If it is set higher, it will be capped by
   * 20.
   */
  maxSuggestions?: number;
  /**
   * Required. The query used to generate suggestions. The maximum number of
   * allowed characters is 255.
   */
  query?: string;
  /**
   * Required field. A unique identifier for tracking visitors. For example,
   * this could be implemented with an HTTP cookie, which should be able to
   * uniquely identify a visitor on a single device. This unique identifier
   * should not change if the visitor logs in or out of the website. The field
   * must be a UTF-8 encoded string with a length limit of 128 characters.
   * Otherwise, an INVALID_ARGUMENT error is returned.
   */
  visitorId?: string;
}

/**
 * Additional options for Retail#projectsLocationsCatalogsControlsCreate.
 */
export interface ProjectsLocationsCatalogsControlsCreateOptions {
  /**
   * Required. The ID to use for the Control, which will become the final
   * component of the Control's resource name. This value should be 4-63
   * characters, and valid characters are /a-z-_/.
   */
  controlId?: string;
}

/**
 * Additional options for Retail#projectsLocationsCatalogsControlsList.
 */
export interface ProjectsLocationsCatalogsControlsListOptions {
  /**
   * Optional. A filter to apply on the list results. Supported features: *
   * List all the products under the parent branch if filter is unset. * List
   * controls that are used in a single ServingConfig: 'serving_config =
   * "boosted_home_page_cvr"'
   */
  filter?: string;
  /**
   * Optional. Maximum number of results to return. If unspecified, defaults to
   * 50. Max allowed value is 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListControls` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for Retail#projectsLocationsCatalogsControlsPatch.
 */
export interface ProjectsLocationsCatalogsControlsPatchOptions {
  /**
   * Indicates which fields in the provided Control to update. The following
   * are NOT supported: * Control.name If not set or empty, all supported fields
   * are updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCatalogsControlsPatchOptions(data: any): ProjectsLocationsCatalogsControlsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCatalogsControlsPatchOptions(data: any): ProjectsLocationsCatalogsControlsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Retail#projectsLocationsCatalogsList.
 */
export interface ProjectsLocationsCatalogsListOptions {
  /**
   * Maximum number of Catalogs to return. If unspecified, defaults to 50. The
   * maximum allowed value is 1000. Values above 1000 will be coerced to 1000.
   * If this field is negative, an INVALID_ARGUMENT is returned.
   */
  pageSize?: number;
  /**
   * A page token ListCatalogsResponse.next_page_token, received from a
   * previous CatalogService.ListCatalogs call. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to
   * CatalogService.ListCatalogs must match the call that provided the page
   * token. Otherwise, an INVALID_ARGUMENT error is returned.
   */
  pageToken?: string;
}

/**
 * Additional options for Retail#projectsLocationsCatalogsModelsCreate.
 */
export interface ProjectsLocationsCatalogsModelsCreateOptions {
  /**
   * Optional. Whether to run a dry run to validate the request (without
   * actually creating the model).
   */
  dryRun?: boolean;
}

/**
 * Additional options for Retail#projectsLocationsCatalogsModelsList.
 */
export interface ProjectsLocationsCatalogsModelsListOptions {
  /**
   * Optional. Maximum number of results to return. If unspecified, defaults to
   * 50. Max allowed value is 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListModels` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for Retail#projectsLocationsCatalogsModelsPatch.
 */
export interface ProjectsLocationsCatalogsModelsPatchOptions {
  /**
   * Optional. Indicates which fields in the provided 'model' to update. If not
   * set, by default updates all fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCatalogsModelsPatchOptions(data: any): ProjectsLocationsCatalogsModelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCatalogsModelsPatchOptions(data: any): ProjectsLocationsCatalogsModelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Retail#projectsLocationsCatalogsOperationsList.
 */
export interface ProjectsLocationsCatalogsOperationsListOptions {
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
 * Additional options for Retail#projectsLocationsCatalogsPatch.
 */
export interface ProjectsLocationsCatalogsPatchOptions {
  /**
   * Indicates which fields in the provided Catalog to update. If an
   * unsupported or unknown field is provided, an INVALID_ARGUMENT error is
   * returned.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCatalogsPatchOptions(data: any): ProjectsLocationsCatalogsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCatalogsPatchOptions(data: any): ProjectsLocationsCatalogsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Retail#projectsLocationsCatalogsServingConfigsCreate.
 */
export interface ProjectsLocationsCatalogsServingConfigsCreateOptions {
  /**
   * Required. The ID to use for the ServingConfig, which will become the final
   * component of the ServingConfig's resource name. This value should be 4-63
   * characters, and valid characters are /a-z-_/.
   */
  servingConfigId?: string;
}

/**
 * Additional options for Retail#projectsLocationsCatalogsServingConfigsList.
 */
export interface ProjectsLocationsCatalogsServingConfigsListOptions {
  /**
   * Optional. Maximum number of results to return. If unspecified, defaults to
   * 100. If a value greater than 100 is provided, at most 100 results are
   * returned.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListServingConfigs`
   * call. Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for Retail#projectsLocationsCatalogsServingConfigsPatch.
 */
export interface ProjectsLocationsCatalogsServingConfigsPatchOptions {
  /**
   * Indicates which fields in the provided ServingConfig to update. The
   * following are NOT supported: * ServingConfig.name If not set, all supported
   * fields are updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCatalogsServingConfigsPatchOptions(data: any): ProjectsLocationsCatalogsServingConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCatalogsServingConfigsPatchOptions(data: any): ProjectsLocationsCatalogsServingConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Retail#projectsLocationsCatalogsUpdateAttributesConfig.
 */
export interface ProjectsLocationsCatalogsUpdateAttributesConfigOptions {
  /**
   * Indicates which fields in the provided AttributesConfig to update. The
   * following is the only supported field: *
   * AttributesConfig.catalog_attributes If not set, all supported fields are
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCatalogsUpdateAttributesConfigOptions(data: any): ProjectsLocationsCatalogsUpdateAttributesConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCatalogsUpdateAttributesConfigOptions(data: any): ProjectsLocationsCatalogsUpdateAttributesConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Retail#projectsLocationsCatalogsUpdateCompletionConfig.
 */
export interface ProjectsLocationsCatalogsUpdateCompletionConfigOptions {
  /**
   * Indicates which fields in the provided CompletionConfig to update. The
   * following are the only supported fields: * CompletionConfig.matching_order
   * * CompletionConfig.max_suggestions * CompletionConfig.min_prefix_length *
   * CompletionConfig.auto_learning If not set, all supported fields are
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCatalogsUpdateCompletionConfigOptions(data: any): ProjectsLocationsCatalogsUpdateCompletionConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCatalogsUpdateCompletionConfigOptions(data: any): ProjectsLocationsCatalogsUpdateCompletionConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Retail#projectsLocationsCatalogsUserEventsCollect.
 */
export interface ProjectsLocationsCatalogsUserEventsCollectOptions {
  /**
   * The event timestamp in milliseconds. This prevents browser caching of
   * otherwise identical get requests. The name is abbreviated to reduce the
   * payload bytes.
   */
  ets?: bigint;
  /**
   * The prebuilt rule name that can convert a specific type of raw_json. For
   * example: "ga4_bq" rule for the GA4 user event schema.
   */
  prebuiltRule?: string;
  /**
   * An arbitrary serialized JSON string that contains necessary information
   * that can comprise a user event. When this field is specified, the
   * user_event field will be ignored. Note: line-delimited JSON is not
   * supported, a single JSON only.
   */
  rawJson?: string;
  /**
   * The URL including cgi-parameters but excluding the hash fragment with a
   * length limit of 5,000 characters. This is often more useful than the
   * referer URL, because many browsers only send the domain for 3rd party
   * requests.
   */
  uri?: string;
  /**
   * Required. URL encoded UserEvent proto with a length limit of 2,000,000
   * characters.
   */
  userEvent?: string;
}

function serializeProjectsLocationsCatalogsUserEventsCollectOptions(data: any): ProjectsLocationsCatalogsUserEventsCollectOptions {
  return {
    ...data,
    ets: data["ets"] !== undefined ? String(data["ets"]) : undefined,
  };
}

function deserializeProjectsLocationsCatalogsUserEventsCollectOptions(data: any): ProjectsLocationsCatalogsUserEventsCollectOptions {
  return {
    ...data,
    ets: data["ets"] !== undefined ? BigInt(data["ets"]) : undefined,
  };
}

/**
 * Additional options for Retail#projectsLocationsCatalogsUserEventsWrite.
 */
export interface ProjectsLocationsCatalogsUserEventsWriteOptions {
  /**
   * If set to true, the user event will be written asynchronously after
   * validation, and the API will respond without waiting for the write.
   * Therefore, silent failures can occur even if the API returns success. In
   * case of silent failures, error messages can be found in Stackdriver logs.
   */
  writeAsync?: boolean;
}

/**
 * Additional options for Retail#projectsLocationsOperationsList.
 */
export interface ProjectsLocationsOperationsListOptions {
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
 * Additional options for Retail#projectsOperationsList.
 */
export interface ProjectsOperationsListOptions {
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
