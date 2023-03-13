// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Vision API Client for Deno
 * ================================
 * 
 * Integrates Google Vision features, including image labeling, face, logo, and landmark detection, optical character recognition (OCR), and detection of explicit content, into applications.
 * 
 * Docs: https://cloud.google.com/vision/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Integrates Google Vision features, including image labeling, face, logo, and
 * landmark detection, optical character recognition (OCR), and detection of
 * explicit content, into applications.
 */
export class Vision {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://vision.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Service that performs image detection and annotation for a batch of files.
   * Now only "application/pdf", "image/tiff" and "image/gif" are supported.
   * This service will extract at most 5 (customers can specify which 5 in
   * AnnotateFileRequest.pages) frames (gif) or pages (pdf or tiff) from each
   * file provided and perform detection and annotation for each image
   * extracted.
   *
   */
  async filesAnnotate(req: BatchAnnotateFilesRequest): Promise<BatchAnnotateFilesResponse> {
    req = serializeBatchAnnotateFilesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/files:annotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchAnnotateFilesResponse(data);
  }

  /**
   * Run asynchronous image detection and annotation for a list of generic
   * files, such as PDF files, which may contain multiple pages and multiple
   * images per page. Progress and results can be retrieved through the
   * `google.longrunning.Operations` interface. `Operation.metadata` contains
   * `OperationMetadata` (metadata). `Operation.response` contains
   * `AsyncBatchAnnotateFilesResponse` (results).
   *
   */
  async filesAsyncBatchAnnotate(req: AsyncBatchAnnotateFilesRequest): Promise<Operation> {
    req = serializeAsyncBatchAnnotateFilesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/files:asyncBatchAnnotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Run image detection and annotation for a batch of images.
   *
   */
  async imagesAnnotate(req: BatchAnnotateImagesRequest): Promise<BatchAnnotateImagesResponse> {
    req = serializeBatchAnnotateImagesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/images:annotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchAnnotateImagesResponse(data);
  }

  /**
   * Run asynchronous image detection and annotation for a list of images.
   * Progress and results can be retrieved through the
   * `google.longrunning.Operations` interface. `Operation.metadata` contains
   * `OperationMetadata` (metadata). `Operation.response` contains
   * `AsyncBatchAnnotateImagesResponse` (results). This service will write image
   * annotation outputs to json files in customer GCS bucket, each json file
   * containing BatchAnnotateImagesResponse proto.
   *
   */
  async imagesAsyncBatchAnnotate(req: AsyncBatchAnnotateImagesRequest): Promise<Operation> {
    req = serializeAsyncBatchAnnotateImagesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/images:asyncBatchAnnotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async locationsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Starts asynchronous cancellation on a long-running operation. The server
   * makes a best effort to cancel the operation, but success is not guaranteed.
   * If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async operationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async operationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async operationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name The name of the operation's parent resource.
   */
  async operationsList(name: string, opts: OperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
    return data as ListOperationsResponse;
  }

  /**
   * Service that performs image detection and annotation for a batch of files.
   * Now only "application/pdf", "image/tiff" and "image/gif" are supported.
   * This service will extract at most 5 (customers can specify which 5 in
   * AnnotateFileRequest.pages) frames (gif) or pages (pdf or tiff) from each
   * file provided and perform detection and annotation for each image
   * extracted.
   *
   * @param parent Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`.
   */
  async projectsFilesAnnotate(parent: string, req: BatchAnnotateFilesRequest): Promise<BatchAnnotateFilesResponse> {
    req = serializeBatchAnnotateFilesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/files:annotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchAnnotateFilesResponse(data);
  }

  /**
   * Run asynchronous image detection and annotation for a list of generic
   * files, such as PDF files, which may contain multiple pages and multiple
   * images per page. Progress and results can be retrieved through the
   * `google.longrunning.Operations` interface. `Operation.metadata` contains
   * `OperationMetadata` (metadata). `Operation.response` contains
   * `AsyncBatchAnnotateFilesResponse` (results).
   *
   * @param parent Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`.
   */
  async projectsFilesAsyncBatchAnnotate(parent: string, req: AsyncBatchAnnotateFilesRequest): Promise<Operation> {
    req = serializeAsyncBatchAnnotateFilesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/files:asyncBatchAnnotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Run image detection and annotation for a batch of images.
   *
   * @param parent Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`.
   */
  async projectsImagesAnnotate(parent: string, req: BatchAnnotateImagesRequest): Promise<BatchAnnotateImagesResponse> {
    req = serializeBatchAnnotateImagesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/images:annotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchAnnotateImagesResponse(data);
  }

  /**
   * Run asynchronous image detection and annotation for a list of images.
   * Progress and results can be retrieved through the
   * `google.longrunning.Operations` interface. `Operation.metadata` contains
   * `OperationMetadata` (metadata). `Operation.response` contains
   * `AsyncBatchAnnotateImagesResponse` (results). This service will write image
   * annotation outputs to json files in customer GCS bucket, each json file
   * containing BatchAnnotateImagesResponse proto.
   *
   * @param parent Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`.
   */
  async projectsImagesAsyncBatchAnnotate(parent: string, req: AsyncBatchAnnotateImagesRequest): Promise<Operation> {
    req = serializeAsyncBatchAnnotateImagesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/images:asyncBatchAnnotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Service that performs image detection and annotation for a batch of files.
   * Now only "application/pdf", "image/tiff" and "image/gif" are supported.
   * This service will extract at most 5 (customers can specify which 5 in
   * AnnotateFileRequest.pages) frames (gif) or pages (pdf or tiff) from each
   * file provided and perform detection and annotation for each image
   * extracted.
   *
   * @param parent Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`.
   */
  async projectsLocationsFilesAnnotate(parent: string, req: BatchAnnotateFilesRequest): Promise<BatchAnnotateFilesResponse> {
    req = serializeBatchAnnotateFilesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/files:annotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchAnnotateFilesResponse(data);
  }

  /**
   * Run asynchronous image detection and annotation for a list of generic
   * files, such as PDF files, which may contain multiple pages and multiple
   * images per page. Progress and results can be retrieved through the
   * `google.longrunning.Operations` interface. `Operation.metadata` contains
   * `OperationMetadata` (metadata). `Operation.response` contains
   * `AsyncBatchAnnotateFilesResponse` (results).
   *
   * @param parent Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`.
   */
  async projectsLocationsFilesAsyncBatchAnnotate(parent: string, req: AsyncBatchAnnotateFilesRequest): Promise<Operation> {
    req = serializeAsyncBatchAnnotateFilesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/files:asyncBatchAnnotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Run image detection and annotation for a batch of images.
   *
   * @param parent Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`.
   */
  async projectsLocationsImagesAnnotate(parent: string, req: BatchAnnotateImagesRequest): Promise<BatchAnnotateImagesResponse> {
    req = serializeBatchAnnotateImagesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/images:annotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchAnnotateImagesResponse(data);
  }

  /**
   * Run asynchronous image detection and annotation for a list of images.
   * Progress and results can be retrieved through the
   * `google.longrunning.Operations` interface. `Operation.metadata` contains
   * `OperationMetadata` (metadata). `Operation.response` contains
   * `AsyncBatchAnnotateImagesResponse` (results). This service will write image
   * annotation outputs to json files in customer GCS bucket, each json file
   * containing BatchAnnotateImagesResponse proto.
   *
   * @param parent Optional. Target project and location to make a call. Format: `projects/{project-id}/locations/{location-id}`. If no parent is specified, a region will be chosen automatically. Supported location-ids: `us`: USA country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The European Union. Example: `projects/project-A/locations/eu`.
   */
  async projectsLocationsImagesAsyncBatchAnnotate(parent: string, req: AsyncBatchAnnotateImagesRequest): Promise<Operation> {
    req = serializeAsyncBatchAnnotateImagesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/images:asyncBatchAnnotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Creates and returns a new product resource. Possible errors: * Returns
   * INVALID_ARGUMENT if display_name is missing or longer than 4096 characters.
   * * Returns INVALID_ARGUMENT if description is longer than 4096 characters. *
   * Returns INVALID_ARGUMENT if product_category is missing or invalid.
   *
   * @param parent Required. The project in which the Product should be created. Format is `projects/PROJECT_ID/locations/LOC_ID`.
   */
  async projectsLocationsProductsCreate(parent: string, req: Product, opts: ProjectsLocationsProductsCreateOptions = {}): Promise<Product> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/products`);
    if (opts.productId !== undefined) {
      url.searchParams.append("productId", String(opts.productId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Product;
  }

  /**
   * Permanently deletes a product and its reference images. Metadata of the
   * product and all its images will be deleted right away, but search queries
   * against ProductSets containing the product may still work until all related
   * caches are refreshed.
   *
   * @param name Required. Resource name of product to delete. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`
   */
  async projectsLocationsProductsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Adds a Product to the specified ProductSet. If the Product is already
   * present, no change is made. One Product can be added to at most 100
   * ProductSets. Possible errors: * Returns NOT_FOUND if the Product or the
   * ProductSet doesn't exist.
   *
   * @param name Required. The resource name for the ProductSet to modify. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID`
   */
  async projectsLocationsProductSetsAddProduct(name: string, req: AddProductToProductSetRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:addProduct`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Creates and returns a new ProductSet resource. Possible errors: * Returns
   * INVALID_ARGUMENT if display_name is missing, or is longer than 4096
   * characters.
   *
   * @param parent Required. The project in which the ProductSet should be created. Format is `projects/PROJECT_ID/locations/LOC_ID`.
   */
  async projectsLocationsProductSetsCreate(parent: string, req: ProductSet, opts: ProjectsLocationsProductSetsCreateOptions = {}): Promise<ProductSet> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/productSets`);
    if (opts.productSetId !== undefined) {
      url.searchParams.append("productSetId", String(opts.productSetId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ProductSet;
  }

  /**
   * Permanently deletes a ProductSet. Products and ReferenceImages in the
   * ProductSet are not deleted. The actual image files are not deleted from
   * Google Cloud Storage.
   *
   * @param name Required. Resource name of the ProductSet to delete. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID`
   */
  async projectsLocationsProductSetsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets information associated with a ProductSet. Possible errors: * Returns
   * NOT_FOUND if the ProductSet does not exist.
   *
   * @param name Required. Resource name of the ProductSet to get. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID`
   */
  async projectsLocationsProductSetsGet(name: string): Promise<ProductSet> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ProductSet;
  }

  /**
   * Asynchronous API that imports a list of reference images to specified
   * product sets based on a list of image information. The
   * google.longrunning.Operation API can be used to keep track of the progress
   * and results of the request. `Operation.metadata` contains
   * `BatchOperationMetadata`. (progress) `Operation.response` contains
   * `ImportProductSetsResponse`. (results) The input source of this method is a
   * csv file on Google Cloud Storage. For the format of the csv file please see
   * ImportProductSetsGcsSource.csv_file_uri.
   *
   * @param parent Required. The project in which the ProductSets should be imported. Format is `projects/PROJECT_ID/locations/LOC_ID`.
   */
  async projectsLocationsProductSetsImport(parent: string, req: ImportProductSetsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/productSets:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists ProductSets in an unspecified order. Possible errors: * Returns
   * INVALID_ARGUMENT if page_size is greater than 100, or less than 1.
   *
   * @param parent Required. The project from which ProductSets should be listed. Format is `projects/PROJECT_ID/locations/LOC_ID`.
   */
  async projectsLocationsProductSetsList(parent: string, opts: ProjectsLocationsProductSetsListOptions = {}): Promise<ListProductSetsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/productSets`);
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
    return data as ListProductSetsResponse;
  }

  /**
   * Makes changes to a ProductSet resource. Only display_name can be updated
   * currently. Possible errors: * Returns NOT_FOUND if the ProductSet does not
   * exist. * Returns INVALID_ARGUMENT if display_name is present in update_mask
   * but missing from the request or longer than 4096 characters.
   *
   * @param name The resource name of the ProductSet. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID`. This field is ignored when creating a ProductSet.
   */
  async projectsLocationsProductSetsPatch(name: string, req: ProductSet, opts: ProjectsLocationsProductSetsPatchOptions = {}): Promise<ProductSet> {
    opts = serializeProjectsLocationsProductSetsPatchOptions(opts);
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
    return data as ProductSet;
  }

  /**
   * Lists the Products in a ProductSet, in an unspecified order. If the
   * ProductSet does not exist, the products field of the response will be
   * empty. Possible errors: * Returns INVALID_ARGUMENT if page_size is greater
   * than 100 or less than 1.
   *
   * @param name Required. The ProductSet resource for which to retrieve Products. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID`
   */
  async projectsLocationsProductSetsProductsList(name: string, opts: ProjectsLocationsProductSetsProductsListOptions = {}): Promise<ListProductsInProductSetResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/products`);
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
    return data as ListProductsInProductSetResponse;
  }

  /**
   * Removes a Product from the specified ProductSet.
   *
   * @param name Required. The resource name for the ProductSet to modify. Format is: `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID`
   */
  async projectsLocationsProductSetsRemoveProduct(name: string, req: RemoveProductFromProductSetRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:removeProduct`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Gets information associated with a Product. Possible errors: * Returns
   * NOT_FOUND if the Product does not exist.
   *
   * @param name Required. Resource name of the Product to get. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`
   */
  async projectsLocationsProductsGet(name: string): Promise<Product> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Product;
  }

  /**
   * Lists products in an unspecified order. Possible errors: * Returns
   * INVALID_ARGUMENT if page_size is greater than 100 or less than 1.
   *
   * @param parent Required. The project OR ProductSet from which Products should be listed. Format: `projects/PROJECT_ID/locations/LOC_ID`
   */
  async projectsLocationsProductsList(parent: string, opts: ProjectsLocationsProductsListOptions = {}): Promise<ListProductsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/products`);
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
    return data as ListProductsResponse;
  }

  /**
   * Makes changes to a Product resource. Only the `display_name`,
   * `description`, and `labels` fields can be updated right now. If labels are
   * updated, the change will not be reflected in queries until the next index
   * time. Possible errors: * Returns NOT_FOUND if the Product does not exist. *
   * Returns INVALID_ARGUMENT if display_name is present in update_mask but is
   * missing from the request or longer than 4096 characters. * Returns
   * INVALID_ARGUMENT if description is present in update_mask but is longer
   * than 4096 characters. * Returns INVALID_ARGUMENT if product_category is
   * present in update_mask.
   *
   * @param name The resource name of the product. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. This field is ignored when creating a product.
   */
  async projectsLocationsProductsPatch(name: string, req: Product, opts: ProjectsLocationsProductsPatchOptions = {}): Promise<Product> {
    opts = serializeProjectsLocationsProductsPatchOptions(opts);
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
    return data as Product;
  }

  /**
   * Asynchronous API to delete all Products in a ProductSet or all Products
   * that are in no ProductSet. If a Product is a member of the specified
   * ProductSet in addition to other ProductSets, the Product will still be
   * deleted. It is recommended to not delete the specified ProductSet until
   * after this operation has completed. It is also recommended to not add any
   * of the Products involved in the batch delete to a new ProductSet while this
   * operation is running because those Products may still end up deleted. It's
   * not possible to undo the PurgeProducts operation. Therefore, it is
   * recommended to keep the csv files used in ImportProductSets (if that was
   * how you originally built the Product Set) before starting PurgeProducts, in
   * case you need to re-import the data after deletion. If the plan is to purge
   * all of the Products from a ProductSet and then re-use the empty ProductSet
   * to re-import new Products into the empty ProductSet, you must wait until
   * the PurgeProducts operation has finished for that ProductSet. The
   * google.longrunning.Operation API can be used to keep track of the progress
   * and results of the request. `Operation.metadata` contains
   * `BatchOperationMetadata`. (progress)
   *
   * @param parent Required. The project and location in which the Products should be deleted. Format is `projects/PROJECT_ID/locations/LOC_ID`.
   */
  async projectsLocationsProductsPurge(parent: string, req: PurgeProductsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/products:purge`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates and returns a new ReferenceImage resource. The `bounding_poly`
   * field is optional. If `bounding_poly` is not specified, the system will try
   * to detect regions of interest in the image that are compatible with the
   * product_category on the parent product. If it is specified, detection is
   * ALWAYS skipped. The system converts polygons into non-rotated rectangles.
   * Note that the pipeline will resize the image if the image resolution is too
   * large to process (above 50MP). Possible errors: * Returns INVALID_ARGUMENT
   * if the image_uri is missing or longer than 4096 characters. * Returns
   * INVALID_ARGUMENT if the product does not exist. * Returns INVALID_ARGUMENT
   * if bounding_poly is not provided, and nothing compatible with the parent
   * product's product_category is detected. * Returns INVALID_ARGUMENT if
   * bounding_poly contains more than 10 polygons.
   *
   * @param parent Required. Resource name of the product in which to create the reference image. Format is `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`.
   */
  async projectsLocationsProductsReferenceImagesCreate(parent: string, req: ReferenceImage, opts: ProjectsLocationsProductsReferenceImagesCreateOptions = {}): Promise<ReferenceImage> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/referenceImages`);
    if (opts.referenceImageId !== undefined) {
      url.searchParams.append("referenceImageId", String(opts.referenceImageId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReferenceImage;
  }

  /**
   * Permanently deletes a reference image. The image metadata will be deleted
   * right away, but search queries against ProductSets containing the image may
   * still work until all related caches are refreshed. The actual image files
   * are not deleted from Google Cloud Storage.
   *
   * @param name Required. The resource name of the reference image to delete. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID/referenceImages/IMAGE_ID`
   */
  async projectsLocationsProductsReferenceImagesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets information associated with a ReferenceImage. Possible errors: *
   * Returns NOT_FOUND if the specified image does not exist.
   *
   * @param name Required. The resource name of the ReferenceImage to get. Format is: `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID/referenceImages/IMAGE_ID`.
   */
  async projectsLocationsProductsReferenceImagesGet(name: string): Promise<ReferenceImage> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ReferenceImage;
  }

  /**
   * Lists reference images. Possible errors: * Returns NOT_FOUND if the parent
   * product does not exist. * Returns INVALID_ARGUMENT if the page_size is
   * greater than 100, or less than 1.
   *
   * @param parent Required. Resource name of the product containing the reference images. Format is `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`.
   */
  async projectsLocationsProductsReferenceImagesList(parent: string, opts: ProjectsLocationsProductsReferenceImagesListOptions = {}): Promise<ListReferenceImagesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/referenceImages`);
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
    return data as ListReferenceImagesResponse;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }
}

/**
 * Request message for the `AddProductToProductSet` method.
 */
export interface AddProductToProductSetRequest {
  /**
   * Required. The resource name for the Product to be added to this
   * ProductSet. Format is:
   * `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`
   */
  product?: string;
}

/**
 * A request to annotate one single file, e.g. a PDF, TIFF or GIF file.
 */
export interface AnnotateFileRequest {
  /**
   * Required. Requested features.
   */
  features?: Feature[];
  /**
   * Additional context that may accompany the image(s) in the file.
   */
  imageContext?: ImageContext;
  /**
   * Required. Information about the input file.
   */
  inputConfig?: InputConfig;
  /**
   * Pages of the file to perform image annotation. Pages starts from 1, we
   * assume the first page of the file is page 1. At most 5 pages are supported
   * per request. Pages can be negative. Page 1 means the first page. Page 2
   * means the second page. Page -1 means the last page. Page -2 means the
   * second to the last page. If the file is GIF instead of PDF or TIFF, page
   * refers to GIF frames. If this field is empty, by default the service
   * performs image annotation for the first 5 pages of the file.
   */
  pages?: number[];
}

function serializeAnnotateFileRequest(data: any): AnnotateFileRequest {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? serializeInputConfig(data["inputConfig"]) : undefined,
  };
}

function deserializeAnnotateFileRequest(data: any): AnnotateFileRequest {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? deserializeInputConfig(data["inputConfig"]) : undefined,
  };
}

/**
 * Response to a single file annotation request. A file may contain one or more
 * images, which individually have their own responses.
 */
export interface AnnotateFileResponse {
  /**
   * If set, represents the error message for the failed request. The
   * `responses` field will not be set in this case.
   */
  error?: Status;
  /**
   * Information about the file for which this response is generated.
   */
  inputConfig?: InputConfig;
  /**
   * Individual responses to images found within the file. This field will be
   * empty if the `error` field is set.
   */
  responses?: AnnotateImageResponse[];
  /**
   * This field gives the total number of pages in the file.
   */
  totalPages?: number;
}

function serializeAnnotateFileResponse(data: any): AnnotateFileResponse {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? serializeInputConfig(data["inputConfig"]) : undefined,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (serializeAnnotateImageResponse(item))) : undefined,
  };
}

function deserializeAnnotateFileResponse(data: any): AnnotateFileResponse {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? deserializeInputConfig(data["inputConfig"]) : undefined,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (deserializeAnnotateImageResponse(item))) : undefined,
  };
}

/**
 * Request for performing Google Cloud Vision API tasks over a user-provided
 * image, with user-requested features, and with context information.
 */
export interface AnnotateImageRequest {
  /**
   * Requested features.
   */
  features?: Feature[];
  /**
   * The image to be processed.
   */
  image?: Image;
  /**
   * Additional context that may accompany the image.
   */
  imageContext?: ImageContext;
}

function serializeAnnotateImageRequest(data: any): AnnotateImageRequest {
  return {
    ...data,
    image: data["image"] !== undefined ? serializeImage(data["image"]) : undefined,
  };
}

function deserializeAnnotateImageRequest(data: any): AnnotateImageRequest {
  return {
    ...data,
    image: data["image"] !== undefined ? deserializeImage(data["image"]) : undefined,
  };
}

/**
 * Response to an image annotation request.
 */
export interface AnnotateImageResponse {
  /**
   * If present, contextual information is needed to understand where this
   * image comes from.
   */
  context?: ImageAnnotationContext;
  /**
   * If present, crop hints have completed successfully.
   */
  cropHintsAnnotation?: CropHintsAnnotation;
  /**
   * If set, represents the error message for the operation. Note that
   * filled-in image annotations are guaranteed to be correct, even when `error`
   * is set.
   */
  error?: Status;
  /**
   * If present, face detection has completed successfully.
   */
  faceAnnotations?: FaceAnnotation[];
  /**
   * If present, text (OCR) detection or document (OCR) text detection has
   * completed successfully. This annotation provides the structural hierarchy
   * for the OCR detected text.
   */
  fullTextAnnotation?: TextAnnotation;
  /**
   * If present, image properties were extracted successfully.
   */
  imagePropertiesAnnotation?: ImageProperties;
  /**
   * If present, label detection has completed successfully.
   */
  labelAnnotations?: EntityAnnotation[];
  /**
   * If present, landmark detection has completed successfully.
   */
  landmarkAnnotations?: EntityAnnotation[];
  /**
   * If present, localized object detection has completed successfully. This
   * will be sorted descending by confidence score.
   */
  localizedObjectAnnotations?: LocalizedObjectAnnotation[];
  /**
   * If present, logo detection has completed successfully.
   */
  logoAnnotations?: EntityAnnotation[];
  /**
   * If present, product search has completed successfully.
   */
  productSearchResults?: ProductSearchResults;
  /**
   * If present, safe-search annotation has completed successfully.
   */
  safeSearchAnnotation?: SafeSearchAnnotation;
  /**
   * If present, text (OCR) detection has completed successfully.
   */
  textAnnotations?: EntityAnnotation[];
  /**
   * If present, web detection has completed successfully.
   */
  webDetection?: WebDetection;
}

function serializeAnnotateImageResponse(data: any): AnnotateImageResponse {
  return {
    ...data,
    labelAnnotations: data["labelAnnotations"] !== undefined ? data["labelAnnotations"].map((item: any) => (serializeEntityAnnotation(item))) : undefined,
    landmarkAnnotations: data["landmarkAnnotations"] !== undefined ? data["landmarkAnnotations"].map((item: any) => (serializeEntityAnnotation(item))) : undefined,
    logoAnnotations: data["logoAnnotations"] !== undefined ? data["logoAnnotations"].map((item: any) => (serializeEntityAnnotation(item))) : undefined,
    productSearchResults: data["productSearchResults"] !== undefined ? serializeProductSearchResults(data["productSearchResults"]) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (serializeEntityAnnotation(item))) : undefined,
  };
}

function deserializeAnnotateImageResponse(data: any): AnnotateImageResponse {
  return {
    ...data,
    labelAnnotations: data["labelAnnotations"] !== undefined ? data["labelAnnotations"].map((item: any) => (deserializeEntityAnnotation(item))) : undefined,
    landmarkAnnotations: data["landmarkAnnotations"] !== undefined ? data["landmarkAnnotations"].map((item: any) => (deserializeEntityAnnotation(item))) : undefined,
    logoAnnotations: data["logoAnnotations"] !== undefined ? data["logoAnnotations"].map((item: any) => (deserializeEntityAnnotation(item))) : undefined,
    productSearchResults: data["productSearchResults"] !== undefined ? deserializeProductSearchResults(data["productSearchResults"]) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (deserializeEntityAnnotation(item))) : undefined,
  };
}

/**
 * An offline file annotation request.
 */
export interface AsyncAnnotateFileRequest {
  /**
   * Required. Requested features.
   */
  features?: Feature[];
  /**
   * Additional context that may accompany the image(s) in the file.
   */
  imageContext?: ImageContext;
  /**
   * Required. Information about the input file.
   */
  inputConfig?: InputConfig;
  /**
   * Required. The desired output location and metadata (e.g. format).
   */
  outputConfig?: OutputConfig;
}

function serializeAsyncAnnotateFileRequest(data: any): AsyncAnnotateFileRequest {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? serializeInputConfig(data["inputConfig"]) : undefined,
  };
}

function deserializeAsyncAnnotateFileRequest(data: any): AsyncAnnotateFileRequest {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? deserializeInputConfig(data["inputConfig"]) : undefined,
  };
}

/**
 * The response for a single offline file annotation request.
 */
export interface AsyncAnnotateFileResponse {
  /**
   * The output location and metadata from AsyncAnnotateFileRequest.
   */
  outputConfig?: OutputConfig;
}

/**
 * Multiple async file annotation requests are batched into a single service
 * call.
 */
export interface AsyncBatchAnnotateFilesRequest {
  /**
   * Optional. Target project and location to make a call. Format:
   * `projects/{project-id}/locations/{location-id}`. If no parent is specified,
   * a region will be chosen automatically. Supported location-ids: `us`: USA
   * country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The
   * European Union. Example: `projects/project-A/locations/eu`.
   */
  parent?: string;
  /**
   * Required. Individual async file annotation requests for this batch.
   */
  requests?: AsyncAnnotateFileRequest[];
}

function serializeAsyncBatchAnnotateFilesRequest(data: any): AsyncBatchAnnotateFilesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeAsyncAnnotateFileRequest(item))) : undefined,
  };
}

function deserializeAsyncBatchAnnotateFilesRequest(data: any): AsyncBatchAnnotateFilesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeAsyncAnnotateFileRequest(item))) : undefined,
  };
}

/**
 * Response to an async batch file annotation request.
 */
export interface AsyncBatchAnnotateFilesResponse {
  /**
   * The list of file annotation responses, one for each request in
   * AsyncBatchAnnotateFilesRequest.
   */
  responses?: AsyncAnnotateFileResponse[];
}

/**
 * Request for async image annotation for a list of images.
 */
export interface AsyncBatchAnnotateImagesRequest {
  /**
   * Required. The desired output location and metadata (e.g. format).
   */
  outputConfig?: OutputConfig;
  /**
   * Optional. Target project and location to make a call. Format:
   * `projects/{project-id}/locations/{location-id}`. If no parent is specified,
   * a region will be chosen automatically. Supported location-ids: `us`: USA
   * country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The
   * European Union. Example: `projects/project-A/locations/eu`.
   */
  parent?: string;
  /**
   * Required. Individual image annotation requests for this batch.
   */
  requests?: AnnotateImageRequest[];
}

function serializeAsyncBatchAnnotateImagesRequest(data: any): AsyncBatchAnnotateImagesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeAnnotateImageRequest(item))) : undefined,
  };
}

function deserializeAsyncBatchAnnotateImagesRequest(data: any): AsyncBatchAnnotateImagesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeAnnotateImageRequest(item))) : undefined,
  };
}

/**
 * Response to an async batch image annotation request.
 */
export interface AsyncBatchAnnotateImagesResponse {
  /**
   * The output location and metadata from AsyncBatchAnnotateImagesRequest.
   */
  outputConfig?: OutputConfig;
}

/**
 * A list of requests to annotate files using the BatchAnnotateFiles API.
 */
export interface BatchAnnotateFilesRequest {
  /**
   * Optional. Target project and location to make a call. Format:
   * `projects/{project-id}/locations/{location-id}`. If no parent is specified,
   * a region will be chosen automatically. Supported location-ids: `us`: USA
   * country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The
   * European Union. Example: `projects/project-A/locations/eu`.
   */
  parent?: string;
  /**
   * Required. The list of file annotation requests. Right now we support only
   * one AnnotateFileRequest in BatchAnnotateFilesRequest.
   */
  requests?: AnnotateFileRequest[];
}

function serializeBatchAnnotateFilesRequest(data: any): BatchAnnotateFilesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeAnnotateFileRequest(item))) : undefined,
  };
}

function deserializeBatchAnnotateFilesRequest(data: any): BatchAnnotateFilesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeAnnotateFileRequest(item))) : undefined,
  };
}

/**
 * A list of file annotation responses.
 */
export interface BatchAnnotateFilesResponse {
  /**
   * The list of file annotation responses, each response corresponding to each
   * AnnotateFileRequest in BatchAnnotateFilesRequest.
   */
  responses?: AnnotateFileResponse[];
}

function serializeBatchAnnotateFilesResponse(data: any): BatchAnnotateFilesResponse {
  return {
    ...data,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (serializeAnnotateFileResponse(item))) : undefined,
  };
}

function deserializeBatchAnnotateFilesResponse(data: any): BatchAnnotateFilesResponse {
  return {
    ...data,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (deserializeAnnotateFileResponse(item))) : undefined,
  };
}

/**
 * Multiple image annotation requests are batched into a single service call.
 */
export interface BatchAnnotateImagesRequest {
  /**
   * Optional. Target project and location to make a call. Format:
   * `projects/{project-id}/locations/{location-id}`. If no parent is specified,
   * a region will be chosen automatically. Supported location-ids: `us`: USA
   * country only, `asia`: East asia areas, like Japan, Taiwan, `eu`: The
   * European Union. Example: `projects/project-A/locations/eu`.
   */
  parent?: string;
  /**
   * Required. Individual image annotation requests for this batch.
   */
  requests?: AnnotateImageRequest[];
}

function serializeBatchAnnotateImagesRequest(data: any): BatchAnnotateImagesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeAnnotateImageRequest(item))) : undefined,
  };
}

function deserializeBatchAnnotateImagesRequest(data: any): BatchAnnotateImagesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeAnnotateImageRequest(item))) : undefined,
  };
}

/**
 * Response to a batch image annotation request.
 */
export interface BatchAnnotateImagesResponse {
  /**
   * Individual responses to image annotation requests within the batch.
   */
  responses?: AnnotateImageResponse[];
}

function serializeBatchAnnotateImagesResponse(data: any): BatchAnnotateImagesResponse {
  return {
    ...data,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (serializeAnnotateImageResponse(item))) : undefined,
  };
}

function deserializeBatchAnnotateImagesResponse(data: any): BatchAnnotateImagesResponse {
  return {
    ...data,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (deserializeAnnotateImageResponse(item))) : undefined,
  };
}

/**
 * Metadata for the batch operations such as the current state. This is
 * included in the `metadata` field of the `Operation` returned by the
 * `GetOperation` call of the `google::longrunning::Operations` service.
 */
export interface BatchOperationMetadata {
  /**
   * The time when the batch request is finished and
   * google.longrunning.Operation.done is set to true.
   */
  endTime?: Date;
  /**
   * The current state of the batch operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "PROCESSING" | "SUCCESSFUL" | "FAILED" | "CANCELLED";
  /**
   * The time when the batch request was submitted to the server.
   */
  submitTime?: Date;
}

function serializeBatchOperationMetadata(data: any): BatchOperationMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    submitTime: data["submitTime"] !== undefined ? data["submitTime"].toISOString() : undefined,
  };
}

function deserializeBatchOperationMetadata(data: any): BatchOperationMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    submitTime: data["submitTime"] !== undefined ? new Date(data["submitTime"]) : undefined,
  };
}

/**
 * Logical element on the page.
 */
export interface Block {
  /**
   * Detected block type (text, image etc) for this block.
   */
  blockType?:  | "UNKNOWN" | "TEXT" | "TABLE" | "PICTURE" | "RULER" | "BARCODE";
  /**
   * The bounding box for the block. The vertices are in the order of top-left,
   * top-right, bottom-right, bottom-left. When a rotation of the bounding box
   * is detected the rotation is represented as around the top-left corner as
   * defined when the text is read in the 'natural' orientation. For example: *
   * when the text is horizontal it might look like: 0----1 | | 3----2 * when
   * it's rotated 180 degrees around the top-left corner it becomes: 2----3 | |
   * 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: BoundingPoly;
  /**
   * Confidence of the OCR results on the block. Range [0, 1].
   */
  confidence?: number;
  /**
   * List of paragraphs in this block (if this blocks is of type text).
   */
  paragraphs?: Paragraph[];
  /**
   * Additional information detected for the block.
   */
  property?: TextProperty;
}

/**
 * A bounding polygon for the detected image annotation.
 */
export interface BoundingPoly {
  /**
   * The bounding polygon normalized vertices.
   */
  normalizedVertices?: NormalizedVertex[];
  /**
   * The bounding polygon vertices.
   */
  vertices?: Vertex[];
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Represents a color in the RGBA color space. This representation is designed
 * for simplicity of conversion to/from color representations in various
 * languages over compactness. For example, the fields of this representation
 * can be trivially provided to the constructor of `java.awt.Color` in Java; it
 * can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha`
 * method in iOS; and, with just a little work, it can be easily formatted into
 * a CSS `rgba()` string in JavaScript. This reference page doesn't carry
 * information about the absolute color space that should be used to interpret
 * the RGB value (e.g. sRGB, Adobe RGB, DCI-P3, BT.2020, etc.). By default,
 * applications should assume the sRGB color space. When color equality needs to
 * be decided, implementations, unless documented otherwise, treat two colors as
 * equal if all their red, green, blue, and alpha values each differ by at most
 * 1e-5. Example (Java): import com.google.type.Color; // ... public static
 * java.awt.Color fromProto(Color protocolor) { float alpha =
 * protocolor.hasAlpha() ? protocolor.getAlpha().getValue() : 1.0; return new
 * java.awt.Color( protocolor.getRed(), protocolor.getGreen(),
 * protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color
 * color) { float red = (float) color.getRed(); float green = (float)
 * color.getGreen(); float blue = (float) color.getBlue(); float denominator =
 * 255.0; Color.Builder resultBuilder = Color .newBuilder() .setRed(red /
 * denominator) .setGreen(green / denominator) .setBlue(blue / denominator); int
 * alpha = color.getAlpha(); if (alpha != 255) { result.setAlpha( FloatValue
 * .newBuilder() .setValue(((float) alpha) / denominator) .build()); } return
 * resultBuilder.build(); } // ... Example (iOS / Obj-C): // ... static UIColor*
 * fromProto(Color* protocolor) { float red = [protocolor red]; float green =
 * [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper
 * = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper != nil) { alpha =
 * [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green
 * blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat
 * red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue
 * alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result
 * setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <=
 * 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result
 * autorelease]; return result; } // ... Example (JavaScript): // ... var
 * protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0;
 * var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0;
 * var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255);
 * var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return
 * rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value ||
 * 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(',
 * rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor =
 * function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green
 * << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 -
 * hexString.length; var resultBuilder = ['#']; for (var i = 0; i <
 * missingZeros; i++) { resultBuilder.push('0'); }
 * resultBuilder.push(hexString); return resultBuilder.join(''); }; // ...
 */
export interface Color {
  /**
   * The fraction of this color that should be applied to the pixel. That is,
   * the final pixel color is defined by the equation: `pixel color = alpha *
   * (this color) + (1.0 - alpha) * (background color)` This means that a value
   * of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to
   * a completely transparent color. This uses a wrapper message rather than a
   * simple float scalar so that it is possible to distinguish between a default
   * value and the value being unset. If omitted, this color object is rendered
   * as a solid color (as if the alpha value had been explicitly given a value
   * of 1.0).
   */
  alpha?: number;
  /**
   * The amount of blue in the color as a value in the interval [0, 1].
   */
  blue?: number;
  /**
   * The amount of green in the color as a value in the interval [0, 1].
   */
  green?: number;
  /**
   * The amount of red in the color as a value in the interval [0, 1].
   */
  red?: number;
}

/**
 * Color information consists of RGB channels, score, and the fraction of the
 * image that the color occupies in the image.
 */
export interface ColorInfo {
  /**
   * RGB components of the color.
   */
  color?: Color;
  /**
   * The fraction of pixels the color occupies in the image. Value in range [0,
   * 1].
   */
  pixelFraction?: number;
  /**
   * Image-specific score for this color. Value in range [0, 1].
   */
  score?: number;
}

/**
 * Single crop hint that is used to generate a new crop when serving an image.
 */
export interface CropHint {
  /**
   * The bounding polygon for the crop region. The coordinates of the bounding
   * box are in the original image's scale.
   */
  boundingPoly?: BoundingPoly;
  /**
   * Confidence of this being a salient region. Range [0, 1].
   */
  confidence?: number;
  /**
   * Fraction of importance of this salient region with respect to the original
   * image.
   */
  importanceFraction?: number;
}

/**
 * Set of crop hints that are used to generate new crops when serving images.
 */
export interface CropHintsAnnotation {
  /**
   * Crop hint results.
   */
  cropHints?: CropHint[];
}

/**
 * Parameters for crop hints annotation request.
 */
export interface CropHintsParams {
  /**
   * Aspect ratios in floats, representing the ratio of the width to the height
   * of the image. For example, if the desired aspect ratio is 4/3, the
   * corresponding float value should be 1.33333. If not specified, the best
   * possible crop is returned. The number of provided aspect ratios is limited
   * to a maximum of 16; any aspect ratios provided after the 16th are ignored.
   */
  aspectRatios?: number[];
}

/**
 * Detected start or end of a structural component.
 */
export interface DetectedBreak {
  /**
   * True if break prepends the element.
   */
  isPrefix?: boolean;
  /**
   * Detected break type.
   */
  type?:  | "UNKNOWN" | "SPACE" | "SURE_SPACE" | "EOL_SURE_SPACE" | "HYPHEN" | "LINE_BREAK";
}

/**
 * Detected language for a structural component.
 */
export interface DetectedLanguage {
  /**
   * Confidence of detected language. Range [0, 1].
   */
  confidence?: number;
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

/**
 * Set of dominant colors and their corresponding scores.
 */
export interface DominantColorsAnnotation {
  /**
   * RGB color values with their score and pixel fraction.
   */
  colors?: ColorInfo[];
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
 * Set of detected entity features.
 */
export interface EntityAnnotation {
  /**
   * Image region to which this entity belongs. Not produced for
   * `LABEL_DETECTION` features.
   */
  boundingPoly?: BoundingPoly;
  /**
   * **Deprecated. Use `score` instead.** The accuracy of the entity detection
   * in an image. For example, for an image in which the "Eiffel Tower" entity
   * is detected, this field represents the confidence that there is a tower in
   * the query image. Range [0, 1].
   */
  confidence?: number;
  /**
   * Entity textual description, expressed in its `locale` language.
   */
  description?: string;
  /**
   * The language code for the locale in which the entity textual `description`
   * is expressed.
   */
  locale?: string;
  /**
   * The location information for the detected entity. Multiple `LocationInfo`
   * elements can be present because one location may indicate the location of
   * the scene in the image, and another location may indicate the location of
   * the place where the image was taken. Location information is usually
   * present for landmarks.
   */
  locations?: LocationInfo[];
  /**
   * Opaque entity ID. Some IDs may be available in [Google Knowledge Graph
   * Search API](https://developers.google.com/knowledge-graph/).
   */
  mid?: string;
  /**
   * Some entities may have optional user-supplied `Property` (name/value)
   * fields, such a score or string that qualifies the entity.
   */
  properties?: Property[];
  /**
   * Overall score of the result. Range [0, 1].
   */
  score?: number;
  /**
   * The relevancy of the ICA (Image Content Annotation) label to the image.
   * For example, the relevancy of "tower" is likely higher to an image
   * containing the detected "Eiffel Tower" than to an image containing a
   * detected distant towering building, even though the confidence that there
   * is a tower in each image may be the same. Range [0, 1].
   */
  topicality?: number;
}

function serializeEntityAnnotation(data: any): EntityAnnotation {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (serializeProperty(item))) : undefined,
  };
}

function deserializeEntityAnnotation(data: any): EntityAnnotation {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (deserializeProperty(item))) : undefined,
  };
}

/**
 * A face annotation object contains the results of face detection.
 */
export interface FaceAnnotation {
  /**
   * Anger likelihood.
   */
  angerLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Blurred likelihood.
   */
  blurredLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * The bounding polygon around the face. The coordinates of the bounding box
   * are in the original image's scale. The bounding box is computed to "frame"
   * the face in accordance with human expectations. It is based on the
   * landmarker results. Note that one or more x and/or y coordinates may not be
   * generated in the `BoundingPoly` (the polygon will be unbounded) if only a
   * partial face appears in the image to be annotated.
   */
  boundingPoly?: BoundingPoly;
  /**
   * Detection confidence. Range [0, 1].
   */
  detectionConfidence?: number;
  /**
   * The `fd_bounding_poly` bounding polygon is tighter than the
   * `boundingPoly`, and encloses only the skin part of the face. Typically, it
   * is used to eliminate the face from any image analysis that detects the
   * "amount of skin" visible in an image. It is not based on the landmarker
   * results, only on the initial face detection, hence the fd (face detection)
   * prefix.
   */
  fdBoundingPoly?: BoundingPoly;
  /**
   * Headwear likelihood.
   */
  headwearLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Joy likelihood.
   */
  joyLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Face landmarking confidence. Range [0, 1].
   */
  landmarkingConfidence?: number;
  /**
   * Detected face landmarks.
   */
  landmarks?: Landmark[];
  /**
   * Yaw angle, which indicates the leftward/rightward angle that the face is
   * pointing relative to the vertical plane perpendicular to the image. Range
   * [-180,180].
   */
  panAngle?: number;
  /**
   * Roll angle, which indicates the amount of clockwise/anti-clockwise
   * rotation of the face relative to the image vertical about the axis
   * perpendicular to the face. Range [-180,180].
   */
  rollAngle?: number;
  /**
   * Sorrow likelihood.
   */
  sorrowLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Surprise likelihood.
   */
  surpriseLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Pitch angle, which indicates the upwards/downwards angle that the face is
   * pointing relative to the image's horizontal plane. Range [-180,180].
   */
  tiltAngle?: number;
  /**
   * Under-exposed likelihood.
   */
  underExposedLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
}

/**
 * The type of Google Cloud Vision API detection to perform, and the maximum
 * number of results to return for that type. Multiple `Feature` objects can be
 * specified in the `features` list.
 */
export interface Feature {
  /**
   * Maximum number of results of this type. Does not apply to
   * `TEXT_DETECTION`, `DOCUMENT_TEXT_DETECTION`, or `CROP_HINTS`.
   */
  maxResults?: number;
  /**
   * Model to use for the feature. Supported values: "builtin/stable" (the
   * default if unset) and "builtin/latest". `DOCUMENT_TEXT_DETECTION` and
   * `TEXT_DETECTION` also support "builtin/weekly" for the bleeding edge
   * release updated weekly.
   */
  model?: string;
  /**
   * The feature type.
   */
  type?:  | "TYPE_UNSPECIFIED" | "FACE_DETECTION" | "LANDMARK_DETECTION" | "LOGO_DETECTION" | "LABEL_DETECTION" | "TEXT_DETECTION" | "DOCUMENT_TEXT_DETECTION" | "SAFE_SEARCH_DETECTION" | "IMAGE_PROPERTIES" | "CROP_HINTS" | "WEB_DETECTION" | "PRODUCT_SEARCH" | "OBJECT_LOCALIZATION";
}

/**
 * The Google Cloud Storage location where the output will be written to.
 */
export interface GcsDestination {
  /**
   * Google Cloud Storage URI prefix where the results will be stored. Results
   * will be in JSON format and preceded by its corresponding input URI prefix.
   * This field can either represent a gcs file prefix or gcs directory. In
   * either case, the uri should be unique because in order to get all of the
   * output files, you will need to do a wildcard gcs search on the uri prefix
   * you provide. Examples: * File Prefix: gs://bucket-name/here/filenameprefix
   * The output files will be created in gs://bucket-name/here/ and the names of
   * the output files will begin with "filenameprefix". * Directory Prefix:
   * gs://bucket-name/some/location/ The output files will be created in
   * gs://bucket-name/some/location/ and the names of the output files could be
   * anything because there was no filename prefix specified. If multiple
   * outputs, each response is still AnnotateFileResponse, each of which
   * contains some subset of the full list of AnnotateImageResponse. Multiple
   * outputs can happen if, for example, the output JSON is too large and
   * overflows into multiple sharded files.
   */
  uri?: string;
}

/**
 * The Google Cloud Storage location where the input will be read from.
 */
export interface GcsSource {
  /**
   * Google Cloud Storage URI for the input file. This must only be a Google
   * Cloud Storage object. Wildcards are not currently supported.
   */
  uri?: string;
}

/**
 * Response to a single file annotation request. A file may contain one or more
 * images, which individually have their own responses.
 */
export interface GoogleCloudVisionV1p1beta1AnnotateFileResponse {
  /**
   * If set, represents the error message for the failed request. The
   * `responses` field will not be set in this case.
   */
  error?: Status;
  /**
   * Information about the file for which this response is generated.
   */
  inputConfig?: GoogleCloudVisionV1p1beta1InputConfig;
  /**
   * Individual responses to images found within the file. This field will be
   * empty if the `error` field is set.
   */
  responses?: GoogleCloudVisionV1p1beta1AnnotateImageResponse[];
  /**
   * This field gives the total number of pages in the file.
   */
  totalPages?: number;
}

function serializeGoogleCloudVisionV1p1beta1AnnotateFileResponse(data: any): GoogleCloudVisionV1p1beta1AnnotateFileResponse {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? serializeGoogleCloudVisionV1p1beta1InputConfig(data["inputConfig"]) : undefined,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (serializeGoogleCloudVisionV1p1beta1AnnotateImageResponse(item))) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p1beta1AnnotateFileResponse(data: any): GoogleCloudVisionV1p1beta1AnnotateFileResponse {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? deserializeGoogleCloudVisionV1p1beta1InputConfig(data["inputConfig"]) : undefined,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (deserializeGoogleCloudVisionV1p1beta1AnnotateImageResponse(item))) : undefined,
  };
}

/**
 * Response to an image annotation request.
 */
export interface GoogleCloudVisionV1p1beta1AnnotateImageResponse {
  /**
   * If present, contextual information is needed to understand where this
   * image comes from.
   */
  context?: GoogleCloudVisionV1p1beta1ImageAnnotationContext;
  /**
   * If present, crop hints have completed successfully.
   */
  cropHintsAnnotation?: GoogleCloudVisionV1p1beta1CropHintsAnnotation;
  /**
   * If set, represents the error message for the operation. Note that
   * filled-in image annotations are guaranteed to be correct, even when `error`
   * is set.
   */
  error?: Status;
  /**
   * If present, face detection has completed successfully.
   */
  faceAnnotations?: GoogleCloudVisionV1p1beta1FaceAnnotation[];
  /**
   * If present, text (OCR) detection or document (OCR) text detection has
   * completed successfully. This annotation provides the structural hierarchy
   * for the OCR detected text.
   */
  fullTextAnnotation?: GoogleCloudVisionV1p1beta1TextAnnotation;
  /**
   * If present, image properties were extracted successfully.
   */
  imagePropertiesAnnotation?: GoogleCloudVisionV1p1beta1ImageProperties;
  /**
   * If present, label detection has completed successfully.
   */
  labelAnnotations?: GoogleCloudVisionV1p1beta1EntityAnnotation[];
  /**
   * If present, landmark detection has completed successfully.
   */
  landmarkAnnotations?: GoogleCloudVisionV1p1beta1EntityAnnotation[];
  /**
   * If present, localized object detection has completed successfully. This
   * will be sorted descending by confidence score.
   */
  localizedObjectAnnotations?: GoogleCloudVisionV1p1beta1LocalizedObjectAnnotation[];
  /**
   * If present, logo detection has completed successfully.
   */
  logoAnnotations?: GoogleCloudVisionV1p1beta1EntityAnnotation[];
  /**
   * If present, product search has completed successfully.
   */
  productSearchResults?: GoogleCloudVisionV1p1beta1ProductSearchResults;
  /**
   * If present, safe-search annotation has completed successfully.
   */
  safeSearchAnnotation?: GoogleCloudVisionV1p1beta1SafeSearchAnnotation;
  /**
   * If present, text (OCR) detection has completed successfully.
   */
  textAnnotations?: GoogleCloudVisionV1p1beta1EntityAnnotation[];
  /**
   * If present, web detection has completed successfully.
   */
  webDetection?: GoogleCloudVisionV1p1beta1WebDetection;
}

function serializeGoogleCloudVisionV1p1beta1AnnotateImageResponse(data: any): GoogleCloudVisionV1p1beta1AnnotateImageResponse {
  return {
    ...data,
    labelAnnotations: data["labelAnnotations"] !== undefined ? data["labelAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p1beta1EntityAnnotation(item))) : undefined,
    landmarkAnnotations: data["landmarkAnnotations"] !== undefined ? data["landmarkAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p1beta1EntityAnnotation(item))) : undefined,
    logoAnnotations: data["logoAnnotations"] !== undefined ? data["logoAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p1beta1EntityAnnotation(item))) : undefined,
    productSearchResults: data["productSearchResults"] !== undefined ? serializeGoogleCloudVisionV1p1beta1ProductSearchResults(data["productSearchResults"]) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p1beta1EntityAnnotation(item))) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p1beta1AnnotateImageResponse(data: any): GoogleCloudVisionV1p1beta1AnnotateImageResponse {
  return {
    ...data,
    labelAnnotations: data["labelAnnotations"] !== undefined ? data["labelAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p1beta1EntityAnnotation(item))) : undefined,
    landmarkAnnotations: data["landmarkAnnotations"] !== undefined ? data["landmarkAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p1beta1EntityAnnotation(item))) : undefined,
    logoAnnotations: data["logoAnnotations"] !== undefined ? data["logoAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p1beta1EntityAnnotation(item))) : undefined,
    productSearchResults: data["productSearchResults"] !== undefined ? deserializeGoogleCloudVisionV1p1beta1ProductSearchResults(data["productSearchResults"]) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p1beta1EntityAnnotation(item))) : undefined,
  };
}

/**
 * The response for a single offline file annotation request.
 */
export interface GoogleCloudVisionV1p1beta1AsyncAnnotateFileResponse {
  /**
   * The output location and metadata from AsyncAnnotateFileRequest.
   */
  outputConfig?: GoogleCloudVisionV1p1beta1OutputConfig;
}

/**
 * Response to an async batch file annotation request.
 */
export interface GoogleCloudVisionV1p1beta1AsyncBatchAnnotateFilesResponse {
  /**
   * The list of file annotation responses, one for each request in
   * AsyncBatchAnnotateFilesRequest.
   */
  responses?: GoogleCloudVisionV1p1beta1AsyncAnnotateFileResponse[];
}

/**
 * Logical element on the page.
 */
export interface GoogleCloudVisionV1p1beta1Block {
  /**
   * Detected block type (text, image etc) for this block.
   */
  blockType?:  | "UNKNOWN" | "TEXT" | "TABLE" | "PICTURE" | "RULER" | "BARCODE";
  /**
   * The bounding box for the block. The vertices are in the order of top-left,
   * top-right, bottom-right, bottom-left. When a rotation of the bounding box
   * is detected the rotation is represented as around the top-left corner as
   * defined when the text is read in the 'natural' orientation. For example: *
   * when the text is horizontal it might look like: 0----1 | | 3----2 * when
   * it's rotated 180 degrees around the top-left corner it becomes: 2----3 | |
   * 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /**
   * Confidence of the OCR results on the block. Range [0, 1].
   */
  confidence?: number;
  /**
   * List of paragraphs in this block (if this blocks is of type text).
   */
  paragraphs?: GoogleCloudVisionV1p1beta1Paragraph[];
  /**
   * Additional information detected for the block.
   */
  property?: GoogleCloudVisionV1p1beta1TextAnnotationTextProperty;
}

/**
 * A bounding polygon for the detected image annotation.
 */
export interface GoogleCloudVisionV1p1beta1BoundingPoly {
  /**
   * The bounding polygon normalized vertices.
   */
  normalizedVertices?: GoogleCloudVisionV1p1beta1NormalizedVertex[];
  /**
   * The bounding polygon vertices.
   */
  vertices?: GoogleCloudVisionV1p1beta1Vertex[];
}

/**
 * Color information consists of RGB channels, score, and the fraction of the
 * image that the color occupies in the image.
 */
export interface GoogleCloudVisionV1p1beta1ColorInfo {
  /**
   * RGB components of the color.
   */
  color?: Color;
  /**
   * The fraction of pixels the color occupies in the image. Value in range [0,
   * 1].
   */
  pixelFraction?: number;
  /**
   * Image-specific score for this color. Value in range [0, 1].
   */
  score?: number;
}

/**
 * Single crop hint that is used to generate a new crop when serving an image.
 */
export interface GoogleCloudVisionV1p1beta1CropHint {
  /**
   * The bounding polygon for the crop region. The coordinates of the bounding
   * box are in the original image's scale.
   */
  boundingPoly?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /**
   * Confidence of this being a salient region. Range [0, 1].
   */
  confidence?: number;
  /**
   * Fraction of importance of this salient region with respect to the original
   * image.
   */
  importanceFraction?: number;
}

/**
 * Set of crop hints that are used to generate new crops when serving images.
 */
export interface GoogleCloudVisionV1p1beta1CropHintsAnnotation {
  /**
   * Crop hint results.
   */
  cropHints?: GoogleCloudVisionV1p1beta1CropHint[];
}

/**
 * Set of dominant colors and their corresponding scores.
 */
export interface GoogleCloudVisionV1p1beta1DominantColorsAnnotation {
  /**
   * RGB color values with their score and pixel fraction.
   */
  colors?: GoogleCloudVisionV1p1beta1ColorInfo[];
}

/**
 * Set of detected entity features.
 */
export interface GoogleCloudVisionV1p1beta1EntityAnnotation {
  /**
   * Image region to which this entity belongs. Not produced for
   * `LABEL_DETECTION` features.
   */
  boundingPoly?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /**
   * **Deprecated. Use `score` instead.** The accuracy of the entity detection
   * in an image. For example, for an image in which the "Eiffel Tower" entity
   * is detected, this field represents the confidence that there is a tower in
   * the query image. Range [0, 1].
   */
  confidence?: number;
  /**
   * Entity textual description, expressed in its `locale` language.
   */
  description?: string;
  /**
   * The language code for the locale in which the entity textual `description`
   * is expressed.
   */
  locale?: string;
  /**
   * The location information for the detected entity. Multiple `LocationInfo`
   * elements can be present because one location may indicate the location of
   * the scene in the image, and another location may indicate the location of
   * the place where the image was taken. Location information is usually
   * present for landmarks.
   */
  locations?: GoogleCloudVisionV1p1beta1LocationInfo[];
  /**
   * Opaque entity ID. Some IDs may be available in [Google Knowledge Graph
   * Search API](https://developers.google.com/knowledge-graph/).
   */
  mid?: string;
  /**
   * Some entities may have optional user-supplied `Property` (name/value)
   * fields, such a score or string that qualifies the entity.
   */
  properties?: GoogleCloudVisionV1p1beta1Property[];
  /**
   * Overall score of the result. Range [0, 1].
   */
  score?: number;
  /**
   * The relevancy of the ICA (Image Content Annotation) label to the image.
   * For example, the relevancy of "tower" is likely higher to an image
   * containing the detected "Eiffel Tower" than to an image containing a
   * detected distant towering building, even though the confidence that there
   * is a tower in each image may be the same. Range [0, 1].
   */
  topicality?: number;
}

function serializeGoogleCloudVisionV1p1beta1EntityAnnotation(data: any): GoogleCloudVisionV1p1beta1EntityAnnotation {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (serializeGoogleCloudVisionV1p1beta1Property(item))) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p1beta1EntityAnnotation(data: any): GoogleCloudVisionV1p1beta1EntityAnnotation {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (deserializeGoogleCloudVisionV1p1beta1Property(item))) : undefined,
  };
}

/**
 * A face annotation object contains the results of face detection.
 */
export interface GoogleCloudVisionV1p1beta1FaceAnnotation {
  /**
   * Anger likelihood.
   */
  angerLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Blurred likelihood.
   */
  blurredLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * The bounding polygon around the face. The coordinates of the bounding box
   * are in the original image's scale. The bounding box is computed to "frame"
   * the face in accordance with human expectations. It is based on the
   * landmarker results. Note that one or more x and/or y coordinates may not be
   * generated in the `BoundingPoly` (the polygon will be unbounded) if only a
   * partial face appears in the image to be annotated.
   */
  boundingPoly?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /**
   * Detection confidence. Range [0, 1].
   */
  detectionConfidence?: number;
  /**
   * The `fd_bounding_poly` bounding polygon is tighter than the
   * `boundingPoly`, and encloses only the skin part of the face. Typically, it
   * is used to eliminate the face from any image analysis that detects the
   * "amount of skin" visible in an image. It is not based on the landmarker
   * results, only on the initial face detection, hence the fd (face detection)
   * prefix.
   */
  fdBoundingPoly?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /**
   * Headwear likelihood.
   */
  headwearLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Joy likelihood.
   */
  joyLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Face landmarking confidence. Range [0, 1].
   */
  landmarkingConfidence?: number;
  /**
   * Detected face landmarks.
   */
  landmarks?: GoogleCloudVisionV1p1beta1FaceAnnotationLandmark[];
  /**
   * Yaw angle, which indicates the leftward/rightward angle that the face is
   * pointing relative to the vertical plane perpendicular to the image. Range
   * [-180,180].
   */
  panAngle?: number;
  /**
   * Roll angle, which indicates the amount of clockwise/anti-clockwise
   * rotation of the face relative to the image vertical about the axis
   * perpendicular to the face. Range [-180,180].
   */
  rollAngle?: number;
  /**
   * Sorrow likelihood.
   */
  sorrowLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Surprise likelihood.
   */
  surpriseLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Pitch angle, which indicates the upwards/downwards angle that the face is
   * pointing relative to the image's horizontal plane. Range [-180,180].
   */
  tiltAngle?: number;
  /**
   * Under-exposed likelihood.
   */
  underExposedLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
}

/**
 * A face-specific landmark (for example, a face feature).
 */
export interface GoogleCloudVisionV1p1beta1FaceAnnotationLandmark {
  /**
   * Face landmark position.
   */
  position?: GoogleCloudVisionV1p1beta1Position;
  /**
   * Face landmark type.
   */
  type?:  | "UNKNOWN_LANDMARK" | "LEFT_EYE" | "RIGHT_EYE" | "LEFT_OF_LEFT_EYEBROW" | "RIGHT_OF_LEFT_EYEBROW" | "LEFT_OF_RIGHT_EYEBROW" | "RIGHT_OF_RIGHT_EYEBROW" | "MIDPOINT_BETWEEN_EYES" | "NOSE_TIP" | "UPPER_LIP" | "LOWER_LIP" | "MOUTH_LEFT" | "MOUTH_RIGHT" | "MOUTH_CENTER" | "NOSE_BOTTOM_RIGHT" | "NOSE_BOTTOM_LEFT" | "NOSE_BOTTOM_CENTER" | "LEFT_EYE_TOP_BOUNDARY" | "LEFT_EYE_RIGHT_CORNER" | "LEFT_EYE_BOTTOM_BOUNDARY" | "LEFT_EYE_LEFT_CORNER" | "RIGHT_EYE_TOP_BOUNDARY" | "RIGHT_EYE_RIGHT_CORNER" | "RIGHT_EYE_BOTTOM_BOUNDARY" | "RIGHT_EYE_LEFT_CORNER" | "LEFT_EYEBROW_UPPER_MIDPOINT" | "RIGHT_EYEBROW_UPPER_MIDPOINT" | "LEFT_EAR_TRAGION" | "RIGHT_EAR_TRAGION" | "LEFT_EYE_PUPIL" | "RIGHT_EYE_PUPIL" | "FOREHEAD_GLABELLA" | "CHIN_GNATHION" | "CHIN_LEFT_GONION" | "CHIN_RIGHT_GONION" | "LEFT_CHEEK_CENTER" | "RIGHT_CHEEK_CENTER";
}

/**
 * The Google Cloud Storage location where the output will be written to.
 */
export interface GoogleCloudVisionV1p1beta1GcsDestination {
  /**
   * Google Cloud Storage URI prefix where the results will be stored. Results
   * will be in JSON format and preceded by its corresponding input URI prefix.
   * This field can either represent a gcs file prefix or gcs directory. In
   * either case, the uri should be unique because in order to get all of the
   * output files, you will need to do a wildcard gcs search on the uri prefix
   * you provide. Examples: * File Prefix: gs://bucket-name/here/filenameprefix
   * The output files will be created in gs://bucket-name/here/ and the names of
   * the output files will begin with "filenameprefix". * Directory Prefix:
   * gs://bucket-name/some/location/ The output files will be created in
   * gs://bucket-name/some/location/ and the names of the output files could be
   * anything because there was no filename prefix specified. If multiple
   * outputs, each response is still AnnotateFileResponse, each of which
   * contains some subset of the full list of AnnotateImageResponse. Multiple
   * outputs can happen if, for example, the output JSON is too large and
   * overflows into multiple sharded files.
   */
  uri?: string;
}

/**
 * The Google Cloud Storage location where the input will be read from.
 */
export interface GoogleCloudVisionV1p1beta1GcsSource {
  /**
   * Google Cloud Storage URI for the input file. This must only be a Google
   * Cloud Storage object. Wildcards are not currently supported.
   */
  uri?: string;
}

/**
 * If an image was produced from a file (e.g. a PDF), this message gives
 * information about the source of that image.
 */
export interface GoogleCloudVisionV1p1beta1ImageAnnotationContext {
  /**
   * If the file was a PDF or TIFF, this field gives the page number within the
   * file used to produce the image.
   */
  pageNumber?: number;
  /**
   * The URI of the file used to produce the image.
   */
  uri?: string;
}

/**
 * Stores image properties, such as dominant colors.
 */
export interface GoogleCloudVisionV1p1beta1ImageProperties {
  /**
   * If present, dominant colors completed successfully.
   */
  dominantColors?: GoogleCloudVisionV1p1beta1DominantColorsAnnotation;
}

/**
 * The desired input location and metadata.
 */
export interface GoogleCloudVisionV1p1beta1InputConfig {
  /**
   * File content, represented as a stream of bytes. Note: As with all `bytes`
   * fields, protobuffers use a pure binary representation, whereas JSON
   * representations use base64. Currently, this field only works for
   * BatchAnnotateFiles requests. It does not work for AsyncBatchAnnotateFiles
   * requests.
   */
  content?: Uint8Array;
  /**
   * The Google Cloud Storage location to read the input from.
   */
  gcsSource?: GoogleCloudVisionV1p1beta1GcsSource;
  /**
   * The type of the file. Currently only "application/pdf", "image/tiff" and
   * "image/gif" are supported. Wildcards are not supported.
   */
  mimeType?: string;
}

function serializeGoogleCloudVisionV1p1beta1InputConfig(data: any): GoogleCloudVisionV1p1beta1InputConfig {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p1beta1InputConfig(data: any): GoogleCloudVisionV1p1beta1InputConfig {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * Set of detected objects with bounding boxes.
 */
export interface GoogleCloudVisionV1p1beta1LocalizedObjectAnnotation {
  /**
   * Image region to which this object belongs. This must be populated.
   */
  boundingPoly?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * Object ID that should align with EntityAnnotation mid.
   */
  mid?: string;
  /**
   * Object name, expressed in its `language_code` language.
   */
  name?: string;
  /**
   * Score of the result. Range [0, 1].
   */
  score?: number;
}

/**
 * Detected entity location information.
 */
export interface GoogleCloudVisionV1p1beta1LocationInfo {
  /**
   * lat/long location coordinates.
   */
  latLng?: LatLng;
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface GoogleCloudVisionV1p1beta1NormalizedVertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
}

/**
 * Contains metadata for the BatchAnnotateImages operation.
 */
export interface GoogleCloudVisionV1p1beta1OperationMetadata {
  /**
   * The time when the batch request was received.
   */
  createTime?: Date;
  /**
   * Current state of the batch operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "CREATED" | "RUNNING" | "DONE" | "CANCELLED";
  /**
   * The time when the operation result was last updated.
   */
  updateTime?: Date;
}

function serializeGoogleCloudVisionV1p1beta1OperationMetadata(data: any): GoogleCloudVisionV1p1beta1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVisionV1p1beta1OperationMetadata(data: any): GoogleCloudVisionV1p1beta1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The desired output location and metadata.
 */
export interface GoogleCloudVisionV1p1beta1OutputConfig {
  /**
   * The max number of response protos to put into each output JSON file on
   * Google Cloud Storage. The valid range is [1, 100]. If not specified, the
   * default value is 20. For example, for one pdf file with 100 pages, 100
   * response protos will be generated. If `batch_size` = 20, then 5 json files
   * each containing 20 response protos will be written under the prefix
   * `gcs_destination`.`uri`. Currently, batch_size only applies to
   * GcsDestination, with potential future support for other output
   * configurations.
   */
  batchSize?: number;
  /**
   * The Google Cloud Storage location to write the output(s) to.
   */
  gcsDestination?: GoogleCloudVisionV1p1beta1GcsDestination;
}

/**
 * Detected page from OCR.
 */
export interface GoogleCloudVisionV1p1beta1Page {
  /**
   * List of blocks of text, images etc on this page.
   */
  blocks?: GoogleCloudVisionV1p1beta1Block[];
  /**
   * Confidence of the OCR results on the page. Range [0, 1].
   */
  confidence?: number;
  /**
   * Page height. For PDFs the unit is points. For images (including TIFFs) the
   * unit is pixels.
   */
  height?: number;
  /**
   * Additional information detected on the page.
   */
  property?: GoogleCloudVisionV1p1beta1TextAnnotationTextProperty;
  /**
   * Page width. For PDFs the unit is points. For images (including TIFFs) the
   * unit is pixels.
   */
  width?: number;
}

/**
 * Structural unit of text representing a number of words in certain order.
 */
export interface GoogleCloudVisionV1p1beta1Paragraph {
  /**
   * The bounding box for the paragraph. The vertices are in the order of
   * top-left, top-right, bottom-right, bottom-left. When a rotation of the
   * bounding box is detected the rotation is represented as around the top-left
   * corner as defined when the text is read in the 'natural' orientation. For
   * example: * when the text is horizontal it might look like: 0----1 | |
   * 3----2 * when it's rotated 180 degrees around the top-left corner it
   * becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /**
   * Confidence of the OCR results for the paragraph. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the paragraph.
   */
  property?: GoogleCloudVisionV1p1beta1TextAnnotationTextProperty;
  /**
   * List of all words in this paragraph.
   */
  words?: GoogleCloudVisionV1p1beta1Word[];
}

/**
 * A 3D position in the image, used primarily for Face detection landmarks. A
 * valid Position must have both x and y coordinates. The position coordinates
 * are in the same scale as the original image.
 */
export interface GoogleCloudVisionV1p1beta1Position {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
  /**
   * Z coordinate (or depth).
   */
  z?: number;
}

/**
 * A Product contains ReferenceImages.
 */
export interface GoogleCloudVisionV1p1beta1Product {
  /**
   * User-provided metadata to be stored with this product. Must be at most
   * 4096 characters long.
   */
  description?: string;
  /**
   * The user-provided name for this Product. Must not be empty. Must be at
   * most 4096 characters long.
   */
  displayName?: string;
  /**
   * The resource name of the product. Format is:
   * `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. This field is
   * ignored when creating a product.
   */
  name?: string;
  /**
   * Immutable. The category for the product identified by the reference image.
   * This should be one of "homegoods-v2", "apparel-v2", "toys-v2",
   * "packagedgoods-v1" or "general-v1". The legacy categories "homegoods",
   * "apparel", and "toys" are still supported, but these should not be used for
   * new products.
   */
  productCategory?: string;
  /**
   * Key-value pairs that can be attached to a product. At query time,
   * constraints can be specified based on the product_labels. Note that integer
   * values can be provided as strings, e.g. "1199". Only strings with integer
   * values can match a range-based restriction which is to be supported soon.
   * Multiple values can be assigned to the same key. One product may have up to
   * 500 product_labels. Notice that the total number of distinct product_labels
   * over all products in one ProductSet cannot exceed 1M, otherwise the product
   * search pipeline will refuse to work for that ProductSet.
   */
  productLabels?: GoogleCloudVisionV1p1beta1ProductKeyValue[];
}

/**
 * A product label represented as a key-value pair.
 */
export interface GoogleCloudVisionV1p1beta1ProductKeyValue {
  /**
   * The key of the label attached to the product. Cannot be empty and cannot
   * exceed 128 bytes.
   */
  key?: string;
  /**
   * The value of the label attached to the product. Cannot be empty and cannot
   * exceed 128 bytes.
   */
  value?: string;
}

/**
 * Results for a product search request.
 */
export interface GoogleCloudVisionV1p1beta1ProductSearchResults {
  /**
   * Timestamp of the index which provided these results. Products added to the
   * product set and products removed from the product set after this time are
   * not reflected in the current results.
   */
  indexTime?: Date;
  /**
   * List of results grouped by products detected in the query image. Each
   * entry corresponds to one bounding polygon in the query image, and contains
   * the matching products specific to that region. There may be duplicate
   * product matches in the union of all the per-product results.
   */
  productGroupedResults?: GoogleCloudVisionV1p1beta1ProductSearchResultsGroupedResult[];
  /**
   * List of results, one for each product match.
   */
  results?: GoogleCloudVisionV1p1beta1ProductSearchResultsResult[];
}

function serializeGoogleCloudVisionV1p1beta1ProductSearchResults(data: any): GoogleCloudVisionV1p1beta1ProductSearchResults {
  return {
    ...data,
    indexTime: data["indexTime"] !== undefined ? data["indexTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVisionV1p1beta1ProductSearchResults(data: any): GoogleCloudVisionV1p1beta1ProductSearchResults {
  return {
    ...data,
    indexTime: data["indexTime"] !== undefined ? new Date(data["indexTime"]) : undefined,
  };
}

/**
 * Information about the products similar to a single product in a query image.
 */
export interface GoogleCloudVisionV1p1beta1ProductSearchResultsGroupedResult {
  /**
   * The bounding polygon around the product detected in the query image.
   */
  boundingPoly?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /**
   * List of generic predictions for the object in the bounding box.
   */
  objectAnnotations?: GoogleCloudVisionV1p1beta1ProductSearchResultsObjectAnnotation[];
  /**
   * List of results, one for each product match.
   */
  results?: GoogleCloudVisionV1p1beta1ProductSearchResultsResult[];
}

/**
 * Prediction for what the object in the bounding box is.
 */
export interface GoogleCloudVisionV1p1beta1ProductSearchResultsObjectAnnotation {
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * Object ID that should align with EntityAnnotation mid.
   */
  mid?: string;
  /**
   * Object name, expressed in its `language_code` language.
   */
  name?: string;
  /**
   * Score of the result. Range [0, 1].
   */
  score?: number;
}

/**
 * Information about a product.
 */
export interface GoogleCloudVisionV1p1beta1ProductSearchResultsResult {
  /**
   * The resource name of the image from the product that is the closest match
   * to the query.
   */
  image?: string;
  /**
   * The Product.
   */
  product?: GoogleCloudVisionV1p1beta1Product;
  /**
   * A confidence level on the match, ranging from 0 (no confidence) to 1 (full
   * confidence).
   */
  score?: number;
}

/**
 * A `Property` consists of a user-supplied name/value pair.
 */
export interface GoogleCloudVisionV1p1beta1Property {
  /**
   * Name of the property.
   */
  name?: string;
  /**
   * Value of numeric properties.
   */
  uint64Value?: bigint;
  /**
   * Value of the property.
   */
  value?: string;
}

function serializeGoogleCloudVisionV1p1beta1Property(data: any): GoogleCloudVisionV1p1beta1Property {
  return {
    ...data,
    uint64Value: data["uint64Value"] !== undefined ? String(data["uint64Value"]) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p1beta1Property(data: any): GoogleCloudVisionV1p1beta1Property {
  return {
    ...data,
    uint64Value: data["uint64Value"] !== undefined ? BigInt(data["uint64Value"]) : undefined,
  };
}

/**
 * Set of features pertaining to the image, computed by computer vision methods
 * over safe-search verticals (for example, adult, spoof, medical, violence).
 */
export interface GoogleCloudVisionV1p1beta1SafeSearchAnnotation {
  /**
   * Represents the adult content likelihood for the image. Adult content may
   * contain elements such as nudity, pornographic images or cartoons, or sexual
   * activities.
   */
  adult?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that this is a medical image.
   */
  medical?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that the request image contains racy content. Racy content may
   * include (but is not limited to) skimpy or sheer clothing, strategically
   * covered nudity, lewd or provocative poses, or close-ups of sensitive body
   * areas.
   */
  racy?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Spoof likelihood. The likelihood that an modification was made to the
   * image's canonical version to make it appear funny or offensive.
   */
  spoof?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that this image contains violent content.
   */
  violence?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
}

/**
 * A single symbol representation.
 */
export interface GoogleCloudVisionV1p1beta1Symbol {
  /**
   * The bounding box for the symbol. The vertices are in the order of
   * top-left, top-right, bottom-right, bottom-left. When a rotation of the
   * bounding box is detected the rotation is represented as around the top-left
   * corner as defined when the text is read in the 'natural' orientation. For
   * example: * when the text is horizontal it might look like: 0----1 | |
   * 3----2 * when it's rotated 180 degrees around the top-left corner it
   * becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /**
   * Confidence of the OCR results for the symbol. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the symbol.
   */
  property?: GoogleCloudVisionV1p1beta1TextAnnotationTextProperty;
  /**
   * The actual UTF-8 representation of the symbol.
   */
  text?: string;
}

/**
 * TextAnnotation contains a structured representation of OCR extracted text.
 * The hierarchy of an OCR extracted text structure is like this: TextAnnotation
 * -> Page -> Block -> Paragraph -> Word -> Symbol Each structural component,
 * starting from Page, may further have their own properties. Properties
 * describe detected languages, breaks etc.. Please refer to the
 * TextAnnotation.TextProperty message definition below for more detail.
 */
export interface GoogleCloudVisionV1p1beta1TextAnnotation {
  /**
   * List of pages detected by OCR.
   */
  pages?: GoogleCloudVisionV1p1beta1Page[];
  /**
   * UTF-8 text detected on the pages.
   */
  text?: string;
}

/**
 * Detected start or end of a structural component.
 */
export interface GoogleCloudVisionV1p1beta1TextAnnotationDetectedBreak {
  /**
   * True if break prepends the element.
   */
  isPrefix?: boolean;
  /**
   * Detected break type.
   */
  type?:  | "UNKNOWN" | "SPACE" | "SURE_SPACE" | "EOL_SURE_SPACE" | "HYPHEN" | "LINE_BREAK";
}

/**
 * Detected language for a structural component.
 */
export interface GoogleCloudVisionV1p1beta1TextAnnotationDetectedLanguage {
  /**
   * Confidence of detected language. Range [0, 1].
   */
  confidence?: number;
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

/**
 * Additional information detected on the structural component.
 */
export interface GoogleCloudVisionV1p1beta1TextAnnotationTextProperty {
  /**
   * Detected start or end of a text segment.
   */
  detectedBreak?: GoogleCloudVisionV1p1beta1TextAnnotationDetectedBreak;
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudVisionV1p1beta1TextAnnotationDetectedLanguage[];
}

/**
 * A vertex represents a 2D point in the image. NOTE: the vertex coordinates
 * are in the same scale as the original image.
 */
export interface GoogleCloudVisionV1p1beta1Vertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
}

/**
 * Relevant information for the image from the Internet.
 */
export interface GoogleCloudVisionV1p1beta1WebDetection {
  /**
   * The service's best guess as to the topic of the request image. Inferred
   * from similar images on the open web.
   */
  bestGuessLabels?: GoogleCloudVisionV1p1beta1WebDetectionWebLabel[];
  /**
   * Fully matching images from the Internet. Can include resized copies of the
   * query image.
   */
  fullMatchingImages?: GoogleCloudVisionV1p1beta1WebDetectionWebImage[];
  /**
   * Web pages containing the matching images from the Internet.
   */
  pagesWithMatchingImages?: GoogleCloudVisionV1p1beta1WebDetectionWebPage[];
  /**
   * Partial matching images from the Internet. Those images are similar enough
   * to share some key-point features. For example an original image will likely
   * have partial matching for its crops.
   */
  partialMatchingImages?: GoogleCloudVisionV1p1beta1WebDetectionWebImage[];
  /**
   * The visually similar image results.
   */
  visuallySimilarImages?: GoogleCloudVisionV1p1beta1WebDetectionWebImage[];
  /**
   * Deduced entities from similar images on the Internet.
   */
  webEntities?: GoogleCloudVisionV1p1beta1WebDetectionWebEntity[];
}

/**
 * Entity deduced from similar images on the Internet.
 */
export interface GoogleCloudVisionV1p1beta1WebDetectionWebEntity {
  /**
   * Canonical description of the entity, in English.
   */
  description?: string;
  /**
   * Opaque entity ID.
   */
  entityId?: string;
  /**
   * Overall relevancy score for the entity. Not normalized and not comparable
   * across different image queries.
   */
  score?: number;
}

/**
 * Metadata for online images.
 */
export interface GoogleCloudVisionV1p1beta1WebDetectionWebImage {
  /**
   * (Deprecated) Overall relevancy score for the image.
   */
  score?: number;
  /**
   * The result image URL.
   */
  url?: string;
}

/**
 * Label to provide extra metadata for the web detection.
 */
export interface GoogleCloudVisionV1p1beta1WebDetectionWebLabel {
  /**
   * Label for extra metadata.
   */
  label?: string;
  /**
   * The BCP-47 language code for `label`, such as "en-US" or "sr-Latn". For
   * more information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

/**
 * Metadata for web pages.
 */
export interface GoogleCloudVisionV1p1beta1WebDetectionWebPage {
  /**
   * Fully matching images on the page. Can include resized copies of the query
   * image.
   */
  fullMatchingImages?: GoogleCloudVisionV1p1beta1WebDetectionWebImage[];
  /**
   * Title for the web page, may contain HTML markups.
   */
  pageTitle?: string;
  /**
   * Partial matching images on the page. Those images are similar enough to
   * share some key-point features. For example an original image will likely
   * have partial matching for its crops.
   */
  partialMatchingImages?: GoogleCloudVisionV1p1beta1WebDetectionWebImage[];
  /**
   * (Deprecated) Overall relevancy score for the web page.
   */
  score?: number;
  /**
   * The result web page URL.
   */
  url?: string;
}

/**
 * A word representation.
 */
export interface GoogleCloudVisionV1p1beta1Word {
  /**
   * The bounding box for the word. The vertices are in the order of top-left,
   * top-right, bottom-right, bottom-left. When a rotation of the bounding box
   * is detected the rotation is represented as around the top-left corner as
   * defined when the text is read in the 'natural' orientation. For example: *
   * when the text is horizontal it might look like: 0----1 | | 3----2 * when
   * it's rotated 180 degrees around the top-left corner it becomes: 2----3 | |
   * 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p1beta1BoundingPoly;
  /**
   * Confidence of the OCR results for the word. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the word.
   */
  property?: GoogleCloudVisionV1p1beta1TextAnnotationTextProperty;
  /**
   * List of symbols in the word. The order of the symbols follows the natural
   * reading order.
   */
  symbols?: GoogleCloudVisionV1p1beta1Symbol[];
}

/**
 * Response to a single file annotation request. A file may contain one or more
 * images, which individually have their own responses.
 */
export interface GoogleCloudVisionV1p2beta1AnnotateFileResponse {
  /**
   * If set, represents the error message for the failed request. The
   * `responses` field will not be set in this case.
   */
  error?: Status;
  /**
   * Information about the file for which this response is generated.
   */
  inputConfig?: GoogleCloudVisionV1p2beta1InputConfig;
  /**
   * Individual responses to images found within the file. This field will be
   * empty if the `error` field is set.
   */
  responses?: GoogleCloudVisionV1p2beta1AnnotateImageResponse[];
  /**
   * This field gives the total number of pages in the file.
   */
  totalPages?: number;
}

function serializeGoogleCloudVisionV1p2beta1AnnotateFileResponse(data: any): GoogleCloudVisionV1p2beta1AnnotateFileResponse {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? serializeGoogleCloudVisionV1p2beta1InputConfig(data["inputConfig"]) : undefined,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (serializeGoogleCloudVisionV1p2beta1AnnotateImageResponse(item))) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p2beta1AnnotateFileResponse(data: any): GoogleCloudVisionV1p2beta1AnnotateFileResponse {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? deserializeGoogleCloudVisionV1p2beta1InputConfig(data["inputConfig"]) : undefined,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (deserializeGoogleCloudVisionV1p2beta1AnnotateImageResponse(item))) : undefined,
  };
}

/**
 * Response to an image annotation request.
 */
export interface GoogleCloudVisionV1p2beta1AnnotateImageResponse {
  /**
   * If present, contextual information is needed to understand where this
   * image comes from.
   */
  context?: GoogleCloudVisionV1p2beta1ImageAnnotationContext;
  /**
   * If present, crop hints have completed successfully.
   */
  cropHintsAnnotation?: GoogleCloudVisionV1p2beta1CropHintsAnnotation;
  /**
   * If set, represents the error message for the operation. Note that
   * filled-in image annotations are guaranteed to be correct, even when `error`
   * is set.
   */
  error?: Status;
  /**
   * If present, face detection has completed successfully.
   */
  faceAnnotations?: GoogleCloudVisionV1p2beta1FaceAnnotation[];
  /**
   * If present, text (OCR) detection or document (OCR) text detection has
   * completed successfully. This annotation provides the structural hierarchy
   * for the OCR detected text.
   */
  fullTextAnnotation?: GoogleCloudVisionV1p2beta1TextAnnotation;
  /**
   * If present, image properties were extracted successfully.
   */
  imagePropertiesAnnotation?: GoogleCloudVisionV1p2beta1ImageProperties;
  /**
   * If present, label detection has completed successfully.
   */
  labelAnnotations?: GoogleCloudVisionV1p2beta1EntityAnnotation[];
  /**
   * If present, landmark detection has completed successfully.
   */
  landmarkAnnotations?: GoogleCloudVisionV1p2beta1EntityAnnotation[];
  /**
   * If present, localized object detection has completed successfully. This
   * will be sorted descending by confidence score.
   */
  localizedObjectAnnotations?: GoogleCloudVisionV1p2beta1LocalizedObjectAnnotation[];
  /**
   * If present, logo detection has completed successfully.
   */
  logoAnnotations?: GoogleCloudVisionV1p2beta1EntityAnnotation[];
  /**
   * If present, product search has completed successfully.
   */
  productSearchResults?: GoogleCloudVisionV1p2beta1ProductSearchResults;
  /**
   * If present, safe-search annotation has completed successfully.
   */
  safeSearchAnnotation?: GoogleCloudVisionV1p2beta1SafeSearchAnnotation;
  /**
   * If present, text (OCR) detection has completed successfully.
   */
  textAnnotations?: GoogleCloudVisionV1p2beta1EntityAnnotation[];
  /**
   * If present, web detection has completed successfully.
   */
  webDetection?: GoogleCloudVisionV1p2beta1WebDetection;
}

function serializeGoogleCloudVisionV1p2beta1AnnotateImageResponse(data: any): GoogleCloudVisionV1p2beta1AnnotateImageResponse {
  return {
    ...data,
    labelAnnotations: data["labelAnnotations"] !== undefined ? data["labelAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p2beta1EntityAnnotation(item))) : undefined,
    landmarkAnnotations: data["landmarkAnnotations"] !== undefined ? data["landmarkAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p2beta1EntityAnnotation(item))) : undefined,
    logoAnnotations: data["logoAnnotations"] !== undefined ? data["logoAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p2beta1EntityAnnotation(item))) : undefined,
    productSearchResults: data["productSearchResults"] !== undefined ? serializeGoogleCloudVisionV1p2beta1ProductSearchResults(data["productSearchResults"]) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p2beta1EntityAnnotation(item))) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p2beta1AnnotateImageResponse(data: any): GoogleCloudVisionV1p2beta1AnnotateImageResponse {
  return {
    ...data,
    labelAnnotations: data["labelAnnotations"] !== undefined ? data["labelAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p2beta1EntityAnnotation(item))) : undefined,
    landmarkAnnotations: data["landmarkAnnotations"] !== undefined ? data["landmarkAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p2beta1EntityAnnotation(item))) : undefined,
    logoAnnotations: data["logoAnnotations"] !== undefined ? data["logoAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p2beta1EntityAnnotation(item))) : undefined,
    productSearchResults: data["productSearchResults"] !== undefined ? deserializeGoogleCloudVisionV1p2beta1ProductSearchResults(data["productSearchResults"]) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p2beta1EntityAnnotation(item))) : undefined,
  };
}

/**
 * The response for a single offline file annotation request.
 */
export interface GoogleCloudVisionV1p2beta1AsyncAnnotateFileResponse {
  /**
   * The output location and metadata from AsyncAnnotateFileRequest.
   */
  outputConfig?: GoogleCloudVisionV1p2beta1OutputConfig;
}

/**
 * Response to an async batch file annotation request.
 */
export interface GoogleCloudVisionV1p2beta1AsyncBatchAnnotateFilesResponse {
  /**
   * The list of file annotation responses, one for each request in
   * AsyncBatchAnnotateFilesRequest.
   */
  responses?: GoogleCloudVisionV1p2beta1AsyncAnnotateFileResponse[];
}

/**
 * Logical element on the page.
 */
export interface GoogleCloudVisionV1p2beta1Block {
  /**
   * Detected block type (text, image etc) for this block.
   */
  blockType?:  | "UNKNOWN" | "TEXT" | "TABLE" | "PICTURE" | "RULER" | "BARCODE";
  /**
   * The bounding box for the block. The vertices are in the order of top-left,
   * top-right, bottom-right, bottom-left. When a rotation of the bounding box
   * is detected the rotation is represented as around the top-left corner as
   * defined when the text is read in the 'natural' orientation. For example: *
   * when the text is horizontal it might look like: 0----1 | | 3----2 * when
   * it's rotated 180 degrees around the top-left corner it becomes: 2----3 | |
   * 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /**
   * Confidence of the OCR results on the block. Range [0, 1].
   */
  confidence?: number;
  /**
   * List of paragraphs in this block (if this blocks is of type text).
   */
  paragraphs?: GoogleCloudVisionV1p2beta1Paragraph[];
  /**
   * Additional information detected for the block.
   */
  property?: GoogleCloudVisionV1p2beta1TextAnnotationTextProperty;
}

/**
 * A bounding polygon for the detected image annotation.
 */
export interface GoogleCloudVisionV1p2beta1BoundingPoly {
  /**
   * The bounding polygon normalized vertices.
   */
  normalizedVertices?: GoogleCloudVisionV1p2beta1NormalizedVertex[];
  /**
   * The bounding polygon vertices.
   */
  vertices?: GoogleCloudVisionV1p2beta1Vertex[];
}

/**
 * Color information consists of RGB channels, score, and the fraction of the
 * image that the color occupies in the image.
 */
export interface GoogleCloudVisionV1p2beta1ColorInfo {
  /**
   * RGB components of the color.
   */
  color?: Color;
  /**
   * The fraction of pixels the color occupies in the image. Value in range [0,
   * 1].
   */
  pixelFraction?: number;
  /**
   * Image-specific score for this color. Value in range [0, 1].
   */
  score?: number;
}

/**
 * Single crop hint that is used to generate a new crop when serving an image.
 */
export interface GoogleCloudVisionV1p2beta1CropHint {
  /**
   * The bounding polygon for the crop region. The coordinates of the bounding
   * box are in the original image's scale.
   */
  boundingPoly?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /**
   * Confidence of this being a salient region. Range [0, 1].
   */
  confidence?: number;
  /**
   * Fraction of importance of this salient region with respect to the original
   * image.
   */
  importanceFraction?: number;
}

/**
 * Set of crop hints that are used to generate new crops when serving images.
 */
export interface GoogleCloudVisionV1p2beta1CropHintsAnnotation {
  /**
   * Crop hint results.
   */
  cropHints?: GoogleCloudVisionV1p2beta1CropHint[];
}

/**
 * Set of dominant colors and their corresponding scores.
 */
export interface GoogleCloudVisionV1p2beta1DominantColorsAnnotation {
  /**
   * RGB color values with their score and pixel fraction.
   */
  colors?: GoogleCloudVisionV1p2beta1ColorInfo[];
}

/**
 * Set of detected entity features.
 */
export interface GoogleCloudVisionV1p2beta1EntityAnnotation {
  /**
   * Image region to which this entity belongs. Not produced for
   * `LABEL_DETECTION` features.
   */
  boundingPoly?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /**
   * **Deprecated. Use `score` instead.** The accuracy of the entity detection
   * in an image. For example, for an image in which the "Eiffel Tower" entity
   * is detected, this field represents the confidence that there is a tower in
   * the query image. Range [0, 1].
   */
  confidence?: number;
  /**
   * Entity textual description, expressed in its `locale` language.
   */
  description?: string;
  /**
   * The language code for the locale in which the entity textual `description`
   * is expressed.
   */
  locale?: string;
  /**
   * The location information for the detected entity. Multiple `LocationInfo`
   * elements can be present because one location may indicate the location of
   * the scene in the image, and another location may indicate the location of
   * the place where the image was taken. Location information is usually
   * present for landmarks.
   */
  locations?: GoogleCloudVisionV1p2beta1LocationInfo[];
  /**
   * Opaque entity ID. Some IDs may be available in [Google Knowledge Graph
   * Search API](https://developers.google.com/knowledge-graph/).
   */
  mid?: string;
  /**
   * Some entities may have optional user-supplied `Property` (name/value)
   * fields, such a score or string that qualifies the entity.
   */
  properties?: GoogleCloudVisionV1p2beta1Property[];
  /**
   * Overall score of the result. Range [0, 1].
   */
  score?: number;
  /**
   * The relevancy of the ICA (Image Content Annotation) label to the image.
   * For example, the relevancy of "tower" is likely higher to an image
   * containing the detected "Eiffel Tower" than to an image containing a
   * detected distant towering building, even though the confidence that there
   * is a tower in each image may be the same. Range [0, 1].
   */
  topicality?: number;
}

function serializeGoogleCloudVisionV1p2beta1EntityAnnotation(data: any): GoogleCloudVisionV1p2beta1EntityAnnotation {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (serializeGoogleCloudVisionV1p2beta1Property(item))) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p2beta1EntityAnnotation(data: any): GoogleCloudVisionV1p2beta1EntityAnnotation {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (deserializeGoogleCloudVisionV1p2beta1Property(item))) : undefined,
  };
}

/**
 * A face annotation object contains the results of face detection.
 */
export interface GoogleCloudVisionV1p2beta1FaceAnnotation {
  /**
   * Anger likelihood.
   */
  angerLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Blurred likelihood.
   */
  blurredLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * The bounding polygon around the face. The coordinates of the bounding box
   * are in the original image's scale. The bounding box is computed to "frame"
   * the face in accordance with human expectations. It is based on the
   * landmarker results. Note that one or more x and/or y coordinates may not be
   * generated in the `BoundingPoly` (the polygon will be unbounded) if only a
   * partial face appears in the image to be annotated.
   */
  boundingPoly?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /**
   * Detection confidence. Range [0, 1].
   */
  detectionConfidence?: number;
  /**
   * The `fd_bounding_poly` bounding polygon is tighter than the
   * `boundingPoly`, and encloses only the skin part of the face. Typically, it
   * is used to eliminate the face from any image analysis that detects the
   * "amount of skin" visible in an image. It is not based on the landmarker
   * results, only on the initial face detection, hence the fd (face detection)
   * prefix.
   */
  fdBoundingPoly?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /**
   * Headwear likelihood.
   */
  headwearLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Joy likelihood.
   */
  joyLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Face landmarking confidence. Range [0, 1].
   */
  landmarkingConfidence?: number;
  /**
   * Detected face landmarks.
   */
  landmarks?: GoogleCloudVisionV1p2beta1FaceAnnotationLandmark[];
  /**
   * Yaw angle, which indicates the leftward/rightward angle that the face is
   * pointing relative to the vertical plane perpendicular to the image. Range
   * [-180,180].
   */
  panAngle?: number;
  /**
   * Roll angle, which indicates the amount of clockwise/anti-clockwise
   * rotation of the face relative to the image vertical about the axis
   * perpendicular to the face. Range [-180,180].
   */
  rollAngle?: number;
  /**
   * Sorrow likelihood.
   */
  sorrowLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Surprise likelihood.
   */
  surpriseLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Pitch angle, which indicates the upwards/downwards angle that the face is
   * pointing relative to the image's horizontal plane. Range [-180,180].
   */
  tiltAngle?: number;
  /**
   * Under-exposed likelihood.
   */
  underExposedLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
}

/**
 * A face-specific landmark (for example, a face feature).
 */
export interface GoogleCloudVisionV1p2beta1FaceAnnotationLandmark {
  /**
   * Face landmark position.
   */
  position?: GoogleCloudVisionV1p2beta1Position;
  /**
   * Face landmark type.
   */
  type?:  | "UNKNOWN_LANDMARK" | "LEFT_EYE" | "RIGHT_EYE" | "LEFT_OF_LEFT_EYEBROW" | "RIGHT_OF_LEFT_EYEBROW" | "LEFT_OF_RIGHT_EYEBROW" | "RIGHT_OF_RIGHT_EYEBROW" | "MIDPOINT_BETWEEN_EYES" | "NOSE_TIP" | "UPPER_LIP" | "LOWER_LIP" | "MOUTH_LEFT" | "MOUTH_RIGHT" | "MOUTH_CENTER" | "NOSE_BOTTOM_RIGHT" | "NOSE_BOTTOM_LEFT" | "NOSE_BOTTOM_CENTER" | "LEFT_EYE_TOP_BOUNDARY" | "LEFT_EYE_RIGHT_CORNER" | "LEFT_EYE_BOTTOM_BOUNDARY" | "LEFT_EYE_LEFT_CORNER" | "RIGHT_EYE_TOP_BOUNDARY" | "RIGHT_EYE_RIGHT_CORNER" | "RIGHT_EYE_BOTTOM_BOUNDARY" | "RIGHT_EYE_LEFT_CORNER" | "LEFT_EYEBROW_UPPER_MIDPOINT" | "RIGHT_EYEBROW_UPPER_MIDPOINT" | "LEFT_EAR_TRAGION" | "RIGHT_EAR_TRAGION" | "LEFT_EYE_PUPIL" | "RIGHT_EYE_PUPIL" | "FOREHEAD_GLABELLA" | "CHIN_GNATHION" | "CHIN_LEFT_GONION" | "CHIN_RIGHT_GONION" | "LEFT_CHEEK_CENTER" | "RIGHT_CHEEK_CENTER";
}

/**
 * The Google Cloud Storage location where the output will be written to.
 */
export interface GoogleCloudVisionV1p2beta1GcsDestination {
  /**
   * Google Cloud Storage URI prefix where the results will be stored. Results
   * will be in JSON format and preceded by its corresponding input URI prefix.
   * This field can either represent a gcs file prefix or gcs directory. In
   * either case, the uri should be unique because in order to get all of the
   * output files, you will need to do a wildcard gcs search on the uri prefix
   * you provide. Examples: * File Prefix: gs://bucket-name/here/filenameprefix
   * The output files will be created in gs://bucket-name/here/ and the names of
   * the output files will begin with "filenameprefix". * Directory Prefix:
   * gs://bucket-name/some/location/ The output files will be created in
   * gs://bucket-name/some/location/ and the names of the output files could be
   * anything because there was no filename prefix specified. If multiple
   * outputs, each response is still AnnotateFileResponse, each of which
   * contains some subset of the full list of AnnotateImageResponse. Multiple
   * outputs can happen if, for example, the output JSON is too large and
   * overflows into multiple sharded files.
   */
  uri?: string;
}

/**
 * The Google Cloud Storage location where the input will be read from.
 */
export interface GoogleCloudVisionV1p2beta1GcsSource {
  /**
   * Google Cloud Storage URI for the input file. This must only be a Google
   * Cloud Storage object. Wildcards are not currently supported.
   */
  uri?: string;
}

/**
 * If an image was produced from a file (e.g. a PDF), this message gives
 * information about the source of that image.
 */
export interface GoogleCloudVisionV1p2beta1ImageAnnotationContext {
  /**
   * If the file was a PDF or TIFF, this field gives the page number within the
   * file used to produce the image.
   */
  pageNumber?: number;
  /**
   * The URI of the file used to produce the image.
   */
  uri?: string;
}

/**
 * Stores image properties, such as dominant colors.
 */
export interface GoogleCloudVisionV1p2beta1ImageProperties {
  /**
   * If present, dominant colors completed successfully.
   */
  dominantColors?: GoogleCloudVisionV1p2beta1DominantColorsAnnotation;
}

/**
 * The desired input location and metadata.
 */
export interface GoogleCloudVisionV1p2beta1InputConfig {
  /**
   * File content, represented as a stream of bytes. Note: As with all `bytes`
   * fields, protobuffers use a pure binary representation, whereas JSON
   * representations use base64. Currently, this field only works for
   * BatchAnnotateFiles requests. It does not work for AsyncBatchAnnotateFiles
   * requests.
   */
  content?: Uint8Array;
  /**
   * The Google Cloud Storage location to read the input from.
   */
  gcsSource?: GoogleCloudVisionV1p2beta1GcsSource;
  /**
   * The type of the file. Currently only "application/pdf", "image/tiff" and
   * "image/gif" are supported. Wildcards are not supported.
   */
  mimeType?: string;
}

function serializeGoogleCloudVisionV1p2beta1InputConfig(data: any): GoogleCloudVisionV1p2beta1InputConfig {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p2beta1InputConfig(data: any): GoogleCloudVisionV1p2beta1InputConfig {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * Set of detected objects with bounding boxes.
 */
export interface GoogleCloudVisionV1p2beta1LocalizedObjectAnnotation {
  /**
   * Image region to which this object belongs. This must be populated.
   */
  boundingPoly?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * Object ID that should align with EntityAnnotation mid.
   */
  mid?: string;
  /**
   * Object name, expressed in its `language_code` language.
   */
  name?: string;
  /**
   * Score of the result. Range [0, 1].
   */
  score?: number;
}

/**
 * Detected entity location information.
 */
export interface GoogleCloudVisionV1p2beta1LocationInfo {
  /**
   * lat/long location coordinates.
   */
  latLng?: LatLng;
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface GoogleCloudVisionV1p2beta1NormalizedVertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
}

/**
 * Contains metadata for the BatchAnnotateImages operation.
 */
export interface GoogleCloudVisionV1p2beta1OperationMetadata {
  /**
   * The time when the batch request was received.
   */
  createTime?: Date;
  /**
   * Current state of the batch operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "CREATED" | "RUNNING" | "DONE" | "CANCELLED";
  /**
   * The time when the operation result was last updated.
   */
  updateTime?: Date;
}

function serializeGoogleCloudVisionV1p2beta1OperationMetadata(data: any): GoogleCloudVisionV1p2beta1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVisionV1p2beta1OperationMetadata(data: any): GoogleCloudVisionV1p2beta1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The desired output location and metadata.
 */
export interface GoogleCloudVisionV1p2beta1OutputConfig {
  /**
   * The max number of response protos to put into each output JSON file on
   * Google Cloud Storage. The valid range is [1, 100]. If not specified, the
   * default value is 20. For example, for one pdf file with 100 pages, 100
   * response protos will be generated. If `batch_size` = 20, then 5 json files
   * each containing 20 response protos will be written under the prefix
   * `gcs_destination`.`uri`. Currently, batch_size only applies to
   * GcsDestination, with potential future support for other output
   * configurations.
   */
  batchSize?: number;
  /**
   * The Google Cloud Storage location to write the output(s) to.
   */
  gcsDestination?: GoogleCloudVisionV1p2beta1GcsDestination;
}

/**
 * Detected page from OCR.
 */
export interface GoogleCloudVisionV1p2beta1Page {
  /**
   * List of blocks of text, images etc on this page.
   */
  blocks?: GoogleCloudVisionV1p2beta1Block[];
  /**
   * Confidence of the OCR results on the page. Range [0, 1].
   */
  confidence?: number;
  /**
   * Page height. For PDFs the unit is points. For images (including TIFFs) the
   * unit is pixels.
   */
  height?: number;
  /**
   * Additional information detected on the page.
   */
  property?: GoogleCloudVisionV1p2beta1TextAnnotationTextProperty;
  /**
   * Page width. For PDFs the unit is points. For images (including TIFFs) the
   * unit is pixels.
   */
  width?: number;
}

/**
 * Structural unit of text representing a number of words in certain order.
 */
export interface GoogleCloudVisionV1p2beta1Paragraph {
  /**
   * The bounding box for the paragraph. The vertices are in the order of
   * top-left, top-right, bottom-right, bottom-left. When a rotation of the
   * bounding box is detected the rotation is represented as around the top-left
   * corner as defined when the text is read in the 'natural' orientation. For
   * example: * when the text is horizontal it might look like: 0----1 | |
   * 3----2 * when it's rotated 180 degrees around the top-left corner it
   * becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /**
   * Confidence of the OCR results for the paragraph. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the paragraph.
   */
  property?: GoogleCloudVisionV1p2beta1TextAnnotationTextProperty;
  /**
   * List of all words in this paragraph.
   */
  words?: GoogleCloudVisionV1p2beta1Word[];
}

/**
 * A 3D position in the image, used primarily for Face detection landmarks. A
 * valid Position must have both x and y coordinates. The position coordinates
 * are in the same scale as the original image.
 */
export interface GoogleCloudVisionV1p2beta1Position {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
  /**
   * Z coordinate (or depth).
   */
  z?: number;
}

/**
 * A Product contains ReferenceImages.
 */
export interface GoogleCloudVisionV1p2beta1Product {
  /**
   * User-provided metadata to be stored with this product. Must be at most
   * 4096 characters long.
   */
  description?: string;
  /**
   * The user-provided name for this Product. Must not be empty. Must be at
   * most 4096 characters long.
   */
  displayName?: string;
  /**
   * The resource name of the product. Format is:
   * `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. This field is
   * ignored when creating a product.
   */
  name?: string;
  /**
   * Immutable. The category for the product identified by the reference image.
   * This should be one of "homegoods-v2", "apparel-v2", "toys-v2",
   * "packagedgoods-v1" or "general-v1". The legacy categories "homegoods",
   * "apparel", and "toys" are still supported, but these should not be used for
   * new products.
   */
  productCategory?: string;
  /**
   * Key-value pairs that can be attached to a product. At query time,
   * constraints can be specified based on the product_labels. Note that integer
   * values can be provided as strings, e.g. "1199". Only strings with integer
   * values can match a range-based restriction which is to be supported soon.
   * Multiple values can be assigned to the same key. One product may have up to
   * 500 product_labels. Notice that the total number of distinct product_labels
   * over all products in one ProductSet cannot exceed 1M, otherwise the product
   * search pipeline will refuse to work for that ProductSet.
   */
  productLabels?: GoogleCloudVisionV1p2beta1ProductKeyValue[];
}

/**
 * A product label represented as a key-value pair.
 */
export interface GoogleCloudVisionV1p2beta1ProductKeyValue {
  /**
   * The key of the label attached to the product. Cannot be empty and cannot
   * exceed 128 bytes.
   */
  key?: string;
  /**
   * The value of the label attached to the product. Cannot be empty and cannot
   * exceed 128 bytes.
   */
  value?: string;
}

/**
 * Results for a product search request.
 */
export interface GoogleCloudVisionV1p2beta1ProductSearchResults {
  /**
   * Timestamp of the index which provided these results. Products added to the
   * product set and products removed from the product set after this time are
   * not reflected in the current results.
   */
  indexTime?: Date;
  /**
   * List of results grouped by products detected in the query image. Each
   * entry corresponds to one bounding polygon in the query image, and contains
   * the matching products specific to that region. There may be duplicate
   * product matches in the union of all the per-product results.
   */
  productGroupedResults?: GoogleCloudVisionV1p2beta1ProductSearchResultsGroupedResult[];
  /**
   * List of results, one for each product match.
   */
  results?: GoogleCloudVisionV1p2beta1ProductSearchResultsResult[];
}

function serializeGoogleCloudVisionV1p2beta1ProductSearchResults(data: any): GoogleCloudVisionV1p2beta1ProductSearchResults {
  return {
    ...data,
    indexTime: data["indexTime"] !== undefined ? data["indexTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVisionV1p2beta1ProductSearchResults(data: any): GoogleCloudVisionV1p2beta1ProductSearchResults {
  return {
    ...data,
    indexTime: data["indexTime"] !== undefined ? new Date(data["indexTime"]) : undefined,
  };
}

/**
 * Information about the products similar to a single product in a query image.
 */
export interface GoogleCloudVisionV1p2beta1ProductSearchResultsGroupedResult {
  /**
   * The bounding polygon around the product detected in the query image.
   */
  boundingPoly?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /**
   * List of generic predictions for the object in the bounding box.
   */
  objectAnnotations?: GoogleCloudVisionV1p2beta1ProductSearchResultsObjectAnnotation[];
  /**
   * List of results, one for each product match.
   */
  results?: GoogleCloudVisionV1p2beta1ProductSearchResultsResult[];
}

/**
 * Prediction for what the object in the bounding box is.
 */
export interface GoogleCloudVisionV1p2beta1ProductSearchResultsObjectAnnotation {
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * Object ID that should align with EntityAnnotation mid.
   */
  mid?: string;
  /**
   * Object name, expressed in its `language_code` language.
   */
  name?: string;
  /**
   * Score of the result. Range [0, 1].
   */
  score?: number;
}

/**
 * Information about a product.
 */
export interface GoogleCloudVisionV1p2beta1ProductSearchResultsResult {
  /**
   * The resource name of the image from the product that is the closest match
   * to the query.
   */
  image?: string;
  /**
   * The Product.
   */
  product?: GoogleCloudVisionV1p2beta1Product;
  /**
   * A confidence level on the match, ranging from 0 (no confidence) to 1 (full
   * confidence).
   */
  score?: number;
}

/**
 * A `Property` consists of a user-supplied name/value pair.
 */
export interface GoogleCloudVisionV1p2beta1Property {
  /**
   * Name of the property.
   */
  name?: string;
  /**
   * Value of numeric properties.
   */
  uint64Value?: bigint;
  /**
   * Value of the property.
   */
  value?: string;
}

function serializeGoogleCloudVisionV1p2beta1Property(data: any): GoogleCloudVisionV1p2beta1Property {
  return {
    ...data,
    uint64Value: data["uint64Value"] !== undefined ? String(data["uint64Value"]) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p2beta1Property(data: any): GoogleCloudVisionV1p2beta1Property {
  return {
    ...data,
    uint64Value: data["uint64Value"] !== undefined ? BigInt(data["uint64Value"]) : undefined,
  };
}

/**
 * Set of features pertaining to the image, computed by computer vision methods
 * over safe-search verticals (for example, adult, spoof, medical, violence).
 */
export interface GoogleCloudVisionV1p2beta1SafeSearchAnnotation {
  /**
   * Represents the adult content likelihood for the image. Adult content may
   * contain elements such as nudity, pornographic images or cartoons, or sexual
   * activities.
   */
  adult?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that this is a medical image.
   */
  medical?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that the request image contains racy content. Racy content may
   * include (but is not limited to) skimpy or sheer clothing, strategically
   * covered nudity, lewd or provocative poses, or close-ups of sensitive body
   * areas.
   */
  racy?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Spoof likelihood. The likelihood that an modification was made to the
   * image's canonical version to make it appear funny or offensive.
   */
  spoof?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that this image contains violent content.
   */
  violence?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
}

/**
 * A single symbol representation.
 */
export interface GoogleCloudVisionV1p2beta1Symbol {
  /**
   * The bounding box for the symbol. The vertices are in the order of
   * top-left, top-right, bottom-right, bottom-left. When a rotation of the
   * bounding box is detected the rotation is represented as around the top-left
   * corner as defined when the text is read in the 'natural' orientation. For
   * example: * when the text is horizontal it might look like: 0----1 | |
   * 3----2 * when it's rotated 180 degrees around the top-left corner it
   * becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /**
   * Confidence of the OCR results for the symbol. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the symbol.
   */
  property?: GoogleCloudVisionV1p2beta1TextAnnotationTextProperty;
  /**
   * The actual UTF-8 representation of the symbol.
   */
  text?: string;
}

/**
 * TextAnnotation contains a structured representation of OCR extracted text.
 * The hierarchy of an OCR extracted text structure is like this: TextAnnotation
 * -> Page -> Block -> Paragraph -> Word -> Symbol Each structural component,
 * starting from Page, may further have their own properties. Properties
 * describe detected languages, breaks etc.. Please refer to the
 * TextAnnotation.TextProperty message definition below for more detail.
 */
export interface GoogleCloudVisionV1p2beta1TextAnnotation {
  /**
   * List of pages detected by OCR.
   */
  pages?: GoogleCloudVisionV1p2beta1Page[];
  /**
   * UTF-8 text detected on the pages.
   */
  text?: string;
}

/**
 * Detected start or end of a structural component.
 */
export interface GoogleCloudVisionV1p2beta1TextAnnotationDetectedBreak {
  /**
   * True if break prepends the element.
   */
  isPrefix?: boolean;
  /**
   * Detected break type.
   */
  type?:  | "UNKNOWN" | "SPACE" | "SURE_SPACE" | "EOL_SURE_SPACE" | "HYPHEN" | "LINE_BREAK";
}

/**
 * Detected language for a structural component.
 */
export interface GoogleCloudVisionV1p2beta1TextAnnotationDetectedLanguage {
  /**
   * Confidence of detected language. Range [0, 1].
   */
  confidence?: number;
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

/**
 * Additional information detected on the structural component.
 */
export interface GoogleCloudVisionV1p2beta1TextAnnotationTextProperty {
  /**
   * Detected start or end of a text segment.
   */
  detectedBreak?: GoogleCloudVisionV1p2beta1TextAnnotationDetectedBreak;
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudVisionV1p2beta1TextAnnotationDetectedLanguage[];
}

/**
 * A vertex represents a 2D point in the image. NOTE: the vertex coordinates
 * are in the same scale as the original image.
 */
export interface GoogleCloudVisionV1p2beta1Vertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
}

/**
 * Relevant information for the image from the Internet.
 */
export interface GoogleCloudVisionV1p2beta1WebDetection {
  /**
   * The service's best guess as to the topic of the request image. Inferred
   * from similar images on the open web.
   */
  bestGuessLabels?: GoogleCloudVisionV1p2beta1WebDetectionWebLabel[];
  /**
   * Fully matching images from the Internet. Can include resized copies of the
   * query image.
   */
  fullMatchingImages?: GoogleCloudVisionV1p2beta1WebDetectionWebImage[];
  /**
   * Web pages containing the matching images from the Internet.
   */
  pagesWithMatchingImages?: GoogleCloudVisionV1p2beta1WebDetectionWebPage[];
  /**
   * Partial matching images from the Internet. Those images are similar enough
   * to share some key-point features. For example an original image will likely
   * have partial matching for its crops.
   */
  partialMatchingImages?: GoogleCloudVisionV1p2beta1WebDetectionWebImage[];
  /**
   * The visually similar image results.
   */
  visuallySimilarImages?: GoogleCloudVisionV1p2beta1WebDetectionWebImage[];
  /**
   * Deduced entities from similar images on the Internet.
   */
  webEntities?: GoogleCloudVisionV1p2beta1WebDetectionWebEntity[];
}

/**
 * Entity deduced from similar images on the Internet.
 */
export interface GoogleCloudVisionV1p2beta1WebDetectionWebEntity {
  /**
   * Canonical description of the entity, in English.
   */
  description?: string;
  /**
   * Opaque entity ID.
   */
  entityId?: string;
  /**
   * Overall relevancy score for the entity. Not normalized and not comparable
   * across different image queries.
   */
  score?: number;
}

/**
 * Metadata for online images.
 */
export interface GoogleCloudVisionV1p2beta1WebDetectionWebImage {
  /**
   * (Deprecated) Overall relevancy score for the image.
   */
  score?: number;
  /**
   * The result image URL.
   */
  url?: string;
}

/**
 * Label to provide extra metadata for the web detection.
 */
export interface GoogleCloudVisionV1p2beta1WebDetectionWebLabel {
  /**
   * Label for extra metadata.
   */
  label?: string;
  /**
   * The BCP-47 language code for `label`, such as "en-US" or "sr-Latn". For
   * more information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

/**
 * Metadata for web pages.
 */
export interface GoogleCloudVisionV1p2beta1WebDetectionWebPage {
  /**
   * Fully matching images on the page. Can include resized copies of the query
   * image.
   */
  fullMatchingImages?: GoogleCloudVisionV1p2beta1WebDetectionWebImage[];
  /**
   * Title for the web page, may contain HTML markups.
   */
  pageTitle?: string;
  /**
   * Partial matching images on the page. Those images are similar enough to
   * share some key-point features. For example an original image will likely
   * have partial matching for its crops.
   */
  partialMatchingImages?: GoogleCloudVisionV1p2beta1WebDetectionWebImage[];
  /**
   * (Deprecated) Overall relevancy score for the web page.
   */
  score?: number;
  /**
   * The result web page URL.
   */
  url?: string;
}

/**
 * A word representation.
 */
export interface GoogleCloudVisionV1p2beta1Word {
  /**
   * The bounding box for the word. The vertices are in the order of top-left,
   * top-right, bottom-right, bottom-left. When a rotation of the bounding box
   * is detected the rotation is represented as around the top-left corner as
   * defined when the text is read in the 'natural' orientation. For example: *
   * when the text is horizontal it might look like: 0----1 | | 3----2 * when
   * it's rotated 180 degrees around the top-left corner it becomes: 2----3 | |
   * 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p2beta1BoundingPoly;
  /**
   * Confidence of the OCR results for the word. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the word.
   */
  property?: GoogleCloudVisionV1p2beta1TextAnnotationTextProperty;
  /**
   * List of symbols in the word. The order of the symbols follows the natural
   * reading order.
   */
  symbols?: GoogleCloudVisionV1p2beta1Symbol[];
}

/**
 * Response to a single file annotation request. A file may contain one or more
 * images, which individually have their own responses.
 */
export interface GoogleCloudVisionV1p3beta1AnnotateFileResponse {
  /**
   * If set, represents the error message for the failed request. The
   * `responses` field will not be set in this case.
   */
  error?: Status;
  /**
   * Information about the file for which this response is generated.
   */
  inputConfig?: GoogleCloudVisionV1p3beta1InputConfig;
  /**
   * Individual responses to images found within the file. This field will be
   * empty if the `error` field is set.
   */
  responses?: GoogleCloudVisionV1p3beta1AnnotateImageResponse[];
  /**
   * This field gives the total number of pages in the file.
   */
  totalPages?: number;
}

function serializeGoogleCloudVisionV1p3beta1AnnotateFileResponse(data: any): GoogleCloudVisionV1p3beta1AnnotateFileResponse {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? serializeGoogleCloudVisionV1p3beta1InputConfig(data["inputConfig"]) : undefined,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (serializeGoogleCloudVisionV1p3beta1AnnotateImageResponse(item))) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p3beta1AnnotateFileResponse(data: any): GoogleCloudVisionV1p3beta1AnnotateFileResponse {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? deserializeGoogleCloudVisionV1p3beta1InputConfig(data["inputConfig"]) : undefined,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (deserializeGoogleCloudVisionV1p3beta1AnnotateImageResponse(item))) : undefined,
  };
}

/**
 * Response to an image annotation request.
 */
export interface GoogleCloudVisionV1p3beta1AnnotateImageResponse {
  /**
   * If present, contextual information is needed to understand where this
   * image comes from.
   */
  context?: GoogleCloudVisionV1p3beta1ImageAnnotationContext;
  /**
   * If present, crop hints have completed successfully.
   */
  cropHintsAnnotation?: GoogleCloudVisionV1p3beta1CropHintsAnnotation;
  /**
   * If set, represents the error message for the operation. Note that
   * filled-in image annotations are guaranteed to be correct, even when `error`
   * is set.
   */
  error?: Status;
  /**
   * If present, face detection has completed successfully.
   */
  faceAnnotations?: GoogleCloudVisionV1p3beta1FaceAnnotation[];
  /**
   * If present, text (OCR) detection or document (OCR) text detection has
   * completed successfully. This annotation provides the structural hierarchy
   * for the OCR detected text.
   */
  fullTextAnnotation?: GoogleCloudVisionV1p3beta1TextAnnotation;
  /**
   * If present, image properties were extracted successfully.
   */
  imagePropertiesAnnotation?: GoogleCloudVisionV1p3beta1ImageProperties;
  /**
   * If present, label detection has completed successfully.
   */
  labelAnnotations?: GoogleCloudVisionV1p3beta1EntityAnnotation[];
  /**
   * If present, landmark detection has completed successfully.
   */
  landmarkAnnotations?: GoogleCloudVisionV1p3beta1EntityAnnotation[];
  /**
   * If present, localized object detection has completed successfully. This
   * will be sorted descending by confidence score.
   */
  localizedObjectAnnotations?: GoogleCloudVisionV1p3beta1LocalizedObjectAnnotation[];
  /**
   * If present, logo detection has completed successfully.
   */
  logoAnnotations?: GoogleCloudVisionV1p3beta1EntityAnnotation[];
  /**
   * If present, product search has completed successfully.
   */
  productSearchResults?: GoogleCloudVisionV1p3beta1ProductSearchResults;
  /**
   * If present, safe-search annotation has completed successfully.
   */
  safeSearchAnnotation?: GoogleCloudVisionV1p3beta1SafeSearchAnnotation;
  /**
   * If present, text (OCR) detection has completed successfully.
   */
  textAnnotations?: GoogleCloudVisionV1p3beta1EntityAnnotation[];
  /**
   * If present, web detection has completed successfully.
   */
  webDetection?: GoogleCloudVisionV1p3beta1WebDetection;
}

function serializeGoogleCloudVisionV1p3beta1AnnotateImageResponse(data: any): GoogleCloudVisionV1p3beta1AnnotateImageResponse {
  return {
    ...data,
    labelAnnotations: data["labelAnnotations"] !== undefined ? data["labelAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p3beta1EntityAnnotation(item))) : undefined,
    landmarkAnnotations: data["landmarkAnnotations"] !== undefined ? data["landmarkAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p3beta1EntityAnnotation(item))) : undefined,
    logoAnnotations: data["logoAnnotations"] !== undefined ? data["logoAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p3beta1EntityAnnotation(item))) : undefined,
    productSearchResults: data["productSearchResults"] !== undefined ? serializeGoogleCloudVisionV1p3beta1ProductSearchResults(data["productSearchResults"]) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p3beta1EntityAnnotation(item))) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p3beta1AnnotateImageResponse(data: any): GoogleCloudVisionV1p3beta1AnnotateImageResponse {
  return {
    ...data,
    labelAnnotations: data["labelAnnotations"] !== undefined ? data["labelAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p3beta1EntityAnnotation(item))) : undefined,
    landmarkAnnotations: data["landmarkAnnotations"] !== undefined ? data["landmarkAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p3beta1EntityAnnotation(item))) : undefined,
    logoAnnotations: data["logoAnnotations"] !== undefined ? data["logoAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p3beta1EntityAnnotation(item))) : undefined,
    productSearchResults: data["productSearchResults"] !== undefined ? deserializeGoogleCloudVisionV1p3beta1ProductSearchResults(data["productSearchResults"]) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p3beta1EntityAnnotation(item))) : undefined,
  };
}

/**
 * The response for a single offline file annotation request.
 */
export interface GoogleCloudVisionV1p3beta1AsyncAnnotateFileResponse {
  /**
   * The output location and metadata from AsyncAnnotateFileRequest.
   */
  outputConfig?: GoogleCloudVisionV1p3beta1OutputConfig;
}

/**
 * Response to an async batch file annotation request.
 */
export interface GoogleCloudVisionV1p3beta1AsyncBatchAnnotateFilesResponse {
  /**
   * The list of file annotation responses, one for each request in
   * AsyncBatchAnnotateFilesRequest.
   */
  responses?: GoogleCloudVisionV1p3beta1AsyncAnnotateFileResponse[];
}

/**
 * Metadata for the batch operations such as the current state. This is
 * included in the `metadata` field of the `Operation` returned by the
 * `GetOperation` call of the `google::longrunning::Operations` service.
 */
export interface GoogleCloudVisionV1p3beta1BatchOperationMetadata {
  /**
   * The time when the batch request is finished and
   * google.longrunning.Operation.done is set to true.
   */
  endTime?: Date;
  /**
   * The current state of the batch operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "PROCESSING" | "SUCCESSFUL" | "FAILED" | "CANCELLED";
  /**
   * The time when the batch request was submitted to the server.
   */
  submitTime?: Date;
}

function serializeGoogleCloudVisionV1p3beta1BatchOperationMetadata(data: any): GoogleCloudVisionV1p3beta1BatchOperationMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    submitTime: data["submitTime"] !== undefined ? data["submitTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVisionV1p3beta1BatchOperationMetadata(data: any): GoogleCloudVisionV1p3beta1BatchOperationMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    submitTime: data["submitTime"] !== undefined ? new Date(data["submitTime"]) : undefined,
  };
}

/**
 * Logical element on the page.
 */
export interface GoogleCloudVisionV1p3beta1Block {
  /**
   * Detected block type (text, image etc) for this block.
   */
  blockType?:  | "UNKNOWN" | "TEXT" | "TABLE" | "PICTURE" | "RULER" | "BARCODE";
  /**
   * The bounding box for the block. The vertices are in the order of top-left,
   * top-right, bottom-right, bottom-left. When a rotation of the bounding box
   * is detected the rotation is represented as around the top-left corner as
   * defined when the text is read in the 'natural' orientation. For example: *
   * when the text is horizontal it might look like: 0----1 | | 3----2 * when
   * it's rotated 180 degrees around the top-left corner it becomes: 2----3 | |
   * 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /**
   * Confidence of the OCR results on the block. Range [0, 1].
   */
  confidence?: number;
  /**
   * List of paragraphs in this block (if this blocks is of type text).
   */
  paragraphs?: GoogleCloudVisionV1p3beta1Paragraph[];
  /**
   * Additional information detected for the block.
   */
  property?: GoogleCloudVisionV1p3beta1TextAnnotationTextProperty;
}

/**
 * A bounding polygon for the detected image annotation.
 */
export interface GoogleCloudVisionV1p3beta1BoundingPoly {
  /**
   * The bounding polygon normalized vertices.
   */
  normalizedVertices?: GoogleCloudVisionV1p3beta1NormalizedVertex[];
  /**
   * The bounding polygon vertices.
   */
  vertices?: GoogleCloudVisionV1p3beta1Vertex[];
}

/**
 * Color information consists of RGB channels, score, and the fraction of the
 * image that the color occupies in the image.
 */
export interface GoogleCloudVisionV1p3beta1ColorInfo {
  /**
   * RGB components of the color.
   */
  color?: Color;
  /**
   * The fraction of pixels the color occupies in the image. Value in range [0,
   * 1].
   */
  pixelFraction?: number;
  /**
   * Image-specific score for this color. Value in range [0, 1].
   */
  score?: number;
}

/**
 * Single crop hint that is used to generate a new crop when serving an image.
 */
export interface GoogleCloudVisionV1p3beta1CropHint {
  /**
   * The bounding polygon for the crop region. The coordinates of the bounding
   * box are in the original image's scale.
   */
  boundingPoly?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /**
   * Confidence of this being a salient region. Range [0, 1].
   */
  confidence?: number;
  /**
   * Fraction of importance of this salient region with respect to the original
   * image.
   */
  importanceFraction?: number;
}

/**
 * Set of crop hints that are used to generate new crops when serving images.
 */
export interface GoogleCloudVisionV1p3beta1CropHintsAnnotation {
  /**
   * Crop hint results.
   */
  cropHints?: GoogleCloudVisionV1p3beta1CropHint[];
}

/**
 * Set of dominant colors and their corresponding scores.
 */
export interface GoogleCloudVisionV1p3beta1DominantColorsAnnotation {
  /**
   * RGB color values with their score and pixel fraction.
   */
  colors?: GoogleCloudVisionV1p3beta1ColorInfo[];
}

/**
 * Set of detected entity features.
 */
export interface GoogleCloudVisionV1p3beta1EntityAnnotation {
  /**
   * Image region to which this entity belongs. Not produced for
   * `LABEL_DETECTION` features.
   */
  boundingPoly?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /**
   * **Deprecated. Use `score` instead.** The accuracy of the entity detection
   * in an image. For example, for an image in which the "Eiffel Tower" entity
   * is detected, this field represents the confidence that there is a tower in
   * the query image. Range [0, 1].
   */
  confidence?: number;
  /**
   * Entity textual description, expressed in its `locale` language.
   */
  description?: string;
  /**
   * The language code for the locale in which the entity textual `description`
   * is expressed.
   */
  locale?: string;
  /**
   * The location information for the detected entity. Multiple `LocationInfo`
   * elements can be present because one location may indicate the location of
   * the scene in the image, and another location may indicate the location of
   * the place where the image was taken. Location information is usually
   * present for landmarks.
   */
  locations?: GoogleCloudVisionV1p3beta1LocationInfo[];
  /**
   * Opaque entity ID. Some IDs may be available in [Google Knowledge Graph
   * Search API](https://developers.google.com/knowledge-graph/).
   */
  mid?: string;
  /**
   * Some entities may have optional user-supplied `Property` (name/value)
   * fields, such a score or string that qualifies the entity.
   */
  properties?: GoogleCloudVisionV1p3beta1Property[];
  /**
   * Overall score of the result. Range [0, 1].
   */
  score?: number;
  /**
   * The relevancy of the ICA (Image Content Annotation) label to the image.
   * For example, the relevancy of "tower" is likely higher to an image
   * containing the detected "Eiffel Tower" than to an image containing a
   * detected distant towering building, even though the confidence that there
   * is a tower in each image may be the same. Range [0, 1].
   */
  topicality?: number;
}

function serializeGoogleCloudVisionV1p3beta1EntityAnnotation(data: any): GoogleCloudVisionV1p3beta1EntityAnnotation {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (serializeGoogleCloudVisionV1p3beta1Property(item))) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p3beta1EntityAnnotation(data: any): GoogleCloudVisionV1p3beta1EntityAnnotation {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (deserializeGoogleCloudVisionV1p3beta1Property(item))) : undefined,
  };
}

/**
 * A face annotation object contains the results of face detection.
 */
export interface GoogleCloudVisionV1p3beta1FaceAnnotation {
  /**
   * Anger likelihood.
   */
  angerLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Blurred likelihood.
   */
  blurredLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * The bounding polygon around the face. The coordinates of the bounding box
   * are in the original image's scale. The bounding box is computed to "frame"
   * the face in accordance with human expectations. It is based on the
   * landmarker results. Note that one or more x and/or y coordinates may not be
   * generated in the `BoundingPoly` (the polygon will be unbounded) if only a
   * partial face appears in the image to be annotated.
   */
  boundingPoly?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /**
   * Detection confidence. Range [0, 1].
   */
  detectionConfidence?: number;
  /**
   * The `fd_bounding_poly` bounding polygon is tighter than the
   * `boundingPoly`, and encloses only the skin part of the face. Typically, it
   * is used to eliminate the face from any image analysis that detects the
   * "amount of skin" visible in an image. It is not based on the landmarker
   * results, only on the initial face detection, hence the fd (face detection)
   * prefix.
   */
  fdBoundingPoly?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /**
   * Headwear likelihood.
   */
  headwearLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Joy likelihood.
   */
  joyLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Face landmarking confidence. Range [0, 1].
   */
  landmarkingConfidence?: number;
  /**
   * Detected face landmarks.
   */
  landmarks?: GoogleCloudVisionV1p3beta1FaceAnnotationLandmark[];
  /**
   * Yaw angle, which indicates the leftward/rightward angle that the face is
   * pointing relative to the vertical plane perpendicular to the image. Range
   * [-180,180].
   */
  panAngle?: number;
  /**
   * Roll angle, which indicates the amount of clockwise/anti-clockwise
   * rotation of the face relative to the image vertical about the axis
   * perpendicular to the face. Range [-180,180].
   */
  rollAngle?: number;
  /**
   * Sorrow likelihood.
   */
  sorrowLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Surprise likelihood.
   */
  surpriseLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Pitch angle, which indicates the upwards/downwards angle that the face is
   * pointing relative to the image's horizontal plane. Range [-180,180].
   */
  tiltAngle?: number;
  /**
   * Under-exposed likelihood.
   */
  underExposedLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
}

/**
 * A face-specific landmark (for example, a face feature).
 */
export interface GoogleCloudVisionV1p3beta1FaceAnnotationLandmark {
  /**
   * Face landmark position.
   */
  position?: GoogleCloudVisionV1p3beta1Position;
  /**
   * Face landmark type.
   */
  type?:  | "UNKNOWN_LANDMARK" | "LEFT_EYE" | "RIGHT_EYE" | "LEFT_OF_LEFT_EYEBROW" | "RIGHT_OF_LEFT_EYEBROW" | "LEFT_OF_RIGHT_EYEBROW" | "RIGHT_OF_RIGHT_EYEBROW" | "MIDPOINT_BETWEEN_EYES" | "NOSE_TIP" | "UPPER_LIP" | "LOWER_LIP" | "MOUTH_LEFT" | "MOUTH_RIGHT" | "MOUTH_CENTER" | "NOSE_BOTTOM_RIGHT" | "NOSE_BOTTOM_LEFT" | "NOSE_BOTTOM_CENTER" | "LEFT_EYE_TOP_BOUNDARY" | "LEFT_EYE_RIGHT_CORNER" | "LEFT_EYE_BOTTOM_BOUNDARY" | "LEFT_EYE_LEFT_CORNER" | "RIGHT_EYE_TOP_BOUNDARY" | "RIGHT_EYE_RIGHT_CORNER" | "RIGHT_EYE_BOTTOM_BOUNDARY" | "RIGHT_EYE_LEFT_CORNER" | "LEFT_EYEBROW_UPPER_MIDPOINT" | "RIGHT_EYEBROW_UPPER_MIDPOINT" | "LEFT_EAR_TRAGION" | "RIGHT_EAR_TRAGION" | "LEFT_EYE_PUPIL" | "RIGHT_EYE_PUPIL" | "FOREHEAD_GLABELLA" | "CHIN_GNATHION" | "CHIN_LEFT_GONION" | "CHIN_RIGHT_GONION" | "LEFT_CHEEK_CENTER" | "RIGHT_CHEEK_CENTER";
}

/**
 * The Google Cloud Storage location where the output will be written to.
 */
export interface GoogleCloudVisionV1p3beta1GcsDestination {
  /**
   * Google Cloud Storage URI prefix where the results will be stored. Results
   * will be in JSON format and preceded by its corresponding input URI prefix.
   * This field can either represent a gcs file prefix or gcs directory. In
   * either case, the uri should be unique because in order to get all of the
   * output files, you will need to do a wildcard gcs search on the uri prefix
   * you provide. Examples: * File Prefix: gs://bucket-name/here/filenameprefix
   * The output files will be created in gs://bucket-name/here/ and the names of
   * the output files will begin with "filenameprefix". * Directory Prefix:
   * gs://bucket-name/some/location/ The output files will be created in
   * gs://bucket-name/some/location/ and the names of the output files could be
   * anything because there was no filename prefix specified. If multiple
   * outputs, each response is still AnnotateFileResponse, each of which
   * contains some subset of the full list of AnnotateImageResponse. Multiple
   * outputs can happen if, for example, the output JSON is too large and
   * overflows into multiple sharded files.
   */
  uri?: string;
}

/**
 * The Google Cloud Storage location where the input will be read from.
 */
export interface GoogleCloudVisionV1p3beta1GcsSource {
  /**
   * Google Cloud Storage URI for the input file. This must only be a Google
   * Cloud Storage object. Wildcards are not currently supported.
   */
  uri?: string;
}

/**
 * If an image was produced from a file (e.g. a PDF), this message gives
 * information about the source of that image.
 */
export interface GoogleCloudVisionV1p3beta1ImageAnnotationContext {
  /**
   * If the file was a PDF or TIFF, this field gives the page number within the
   * file used to produce the image.
   */
  pageNumber?: number;
  /**
   * The URI of the file used to produce the image.
   */
  uri?: string;
}

/**
 * Stores image properties, such as dominant colors.
 */
export interface GoogleCloudVisionV1p3beta1ImageProperties {
  /**
   * If present, dominant colors completed successfully.
   */
  dominantColors?: GoogleCloudVisionV1p3beta1DominantColorsAnnotation;
}

/**
 * Response message for the `ImportProductSets` method. This message is
 * returned by the google.longrunning.Operations.GetOperation method in the
 * returned google.longrunning.Operation.response field.
 */
export interface GoogleCloudVisionV1p3beta1ImportProductSetsResponse {
  /**
   * The list of reference_images that are imported successfully.
   */
  referenceImages?: GoogleCloudVisionV1p3beta1ReferenceImage[];
  /**
   * The rpc status for each ImportProductSet request, including both successes
   * and errors. The number of statuses here matches the number of lines in the
   * csv file, and statuses[i] stores the success or failure status of
   * processing the i-th line of the csv, starting from line 0.
   */
  statuses?: Status[];
}

/**
 * The desired input location and metadata.
 */
export interface GoogleCloudVisionV1p3beta1InputConfig {
  /**
   * File content, represented as a stream of bytes. Note: As with all `bytes`
   * fields, protobuffers use a pure binary representation, whereas JSON
   * representations use base64. Currently, this field only works for
   * BatchAnnotateFiles requests. It does not work for AsyncBatchAnnotateFiles
   * requests.
   */
  content?: Uint8Array;
  /**
   * The Google Cloud Storage location to read the input from.
   */
  gcsSource?: GoogleCloudVisionV1p3beta1GcsSource;
  /**
   * The type of the file. Currently only "application/pdf", "image/tiff" and
   * "image/gif" are supported. Wildcards are not supported.
   */
  mimeType?: string;
}

function serializeGoogleCloudVisionV1p3beta1InputConfig(data: any): GoogleCloudVisionV1p3beta1InputConfig {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p3beta1InputConfig(data: any): GoogleCloudVisionV1p3beta1InputConfig {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * Set of detected objects with bounding boxes.
 */
export interface GoogleCloudVisionV1p3beta1LocalizedObjectAnnotation {
  /**
   * Image region to which this object belongs. This must be populated.
   */
  boundingPoly?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * Object ID that should align with EntityAnnotation mid.
   */
  mid?: string;
  /**
   * Object name, expressed in its `language_code` language.
   */
  name?: string;
  /**
   * Score of the result. Range [0, 1].
   */
  score?: number;
}

/**
 * Detected entity location information.
 */
export interface GoogleCloudVisionV1p3beta1LocationInfo {
  /**
   * lat/long location coordinates.
   */
  latLng?: LatLng;
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface GoogleCloudVisionV1p3beta1NormalizedVertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
}

/**
 * Contains metadata for the BatchAnnotateImages operation.
 */
export interface GoogleCloudVisionV1p3beta1OperationMetadata {
  /**
   * The time when the batch request was received.
   */
  createTime?: Date;
  /**
   * Current state of the batch operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "CREATED" | "RUNNING" | "DONE" | "CANCELLED";
  /**
   * The time when the operation result was last updated.
   */
  updateTime?: Date;
}

function serializeGoogleCloudVisionV1p3beta1OperationMetadata(data: any): GoogleCloudVisionV1p3beta1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVisionV1p3beta1OperationMetadata(data: any): GoogleCloudVisionV1p3beta1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The desired output location and metadata.
 */
export interface GoogleCloudVisionV1p3beta1OutputConfig {
  /**
   * The max number of response protos to put into each output JSON file on
   * Google Cloud Storage. The valid range is [1, 100]. If not specified, the
   * default value is 20. For example, for one pdf file with 100 pages, 100
   * response protos will be generated. If `batch_size` = 20, then 5 json files
   * each containing 20 response protos will be written under the prefix
   * `gcs_destination`.`uri`. Currently, batch_size only applies to
   * GcsDestination, with potential future support for other output
   * configurations.
   */
  batchSize?: number;
  /**
   * The Google Cloud Storage location to write the output(s) to.
   */
  gcsDestination?: GoogleCloudVisionV1p3beta1GcsDestination;
}

/**
 * Detected page from OCR.
 */
export interface GoogleCloudVisionV1p3beta1Page {
  /**
   * List of blocks of text, images etc on this page.
   */
  blocks?: GoogleCloudVisionV1p3beta1Block[];
  /**
   * Confidence of the OCR results on the page. Range [0, 1].
   */
  confidence?: number;
  /**
   * Page height. For PDFs the unit is points. For images (including TIFFs) the
   * unit is pixels.
   */
  height?: number;
  /**
   * Additional information detected on the page.
   */
  property?: GoogleCloudVisionV1p3beta1TextAnnotationTextProperty;
  /**
   * Page width. For PDFs the unit is points. For images (including TIFFs) the
   * unit is pixels.
   */
  width?: number;
}

/**
 * Structural unit of text representing a number of words in certain order.
 */
export interface GoogleCloudVisionV1p3beta1Paragraph {
  /**
   * The bounding box for the paragraph. The vertices are in the order of
   * top-left, top-right, bottom-right, bottom-left. When a rotation of the
   * bounding box is detected the rotation is represented as around the top-left
   * corner as defined when the text is read in the 'natural' orientation. For
   * example: * when the text is horizontal it might look like: 0----1 | |
   * 3----2 * when it's rotated 180 degrees around the top-left corner it
   * becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /**
   * Confidence of the OCR results for the paragraph. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the paragraph.
   */
  property?: GoogleCloudVisionV1p3beta1TextAnnotationTextProperty;
  /**
   * List of all words in this paragraph.
   */
  words?: GoogleCloudVisionV1p3beta1Word[];
}

/**
 * A 3D position in the image, used primarily for Face detection landmarks. A
 * valid Position must have both x and y coordinates. The position coordinates
 * are in the same scale as the original image.
 */
export interface GoogleCloudVisionV1p3beta1Position {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
  /**
   * Z coordinate (or depth).
   */
  z?: number;
}

/**
 * A Product contains ReferenceImages.
 */
export interface GoogleCloudVisionV1p3beta1Product {
  /**
   * User-provided metadata to be stored with this product. Must be at most
   * 4096 characters long.
   */
  description?: string;
  /**
   * The user-provided name for this Product. Must not be empty. Must be at
   * most 4096 characters long.
   */
  displayName?: string;
  /**
   * The resource name of the product. Format is:
   * `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. This field is
   * ignored when creating a product.
   */
  name?: string;
  /**
   * Immutable. The category for the product identified by the reference image.
   * This should be one of "homegoods-v2", "apparel-v2", "toys-v2",
   * "packagedgoods-v1" or "general-v1". The legacy categories "homegoods",
   * "apparel", and "toys" are still supported, but these should not be used for
   * new products.
   */
  productCategory?: string;
  /**
   * Key-value pairs that can be attached to a product. At query time,
   * constraints can be specified based on the product_labels. Note that integer
   * values can be provided as strings, e.g. "1199". Only strings with integer
   * values can match a range-based restriction which is to be supported soon.
   * Multiple values can be assigned to the same key. One product may have up to
   * 500 product_labels. Notice that the total number of distinct product_labels
   * over all products in one ProductSet cannot exceed 1M, otherwise the product
   * search pipeline will refuse to work for that ProductSet.
   */
  productLabels?: GoogleCloudVisionV1p3beta1ProductKeyValue[];
}

/**
 * A product label represented as a key-value pair.
 */
export interface GoogleCloudVisionV1p3beta1ProductKeyValue {
  /**
   * The key of the label attached to the product. Cannot be empty and cannot
   * exceed 128 bytes.
   */
  key?: string;
  /**
   * The value of the label attached to the product. Cannot be empty and cannot
   * exceed 128 bytes.
   */
  value?: string;
}

/**
 * Results for a product search request.
 */
export interface GoogleCloudVisionV1p3beta1ProductSearchResults {
  /**
   * Timestamp of the index which provided these results. Products added to the
   * product set and products removed from the product set after this time are
   * not reflected in the current results.
   */
  indexTime?: Date;
  /**
   * List of results grouped by products detected in the query image. Each
   * entry corresponds to one bounding polygon in the query image, and contains
   * the matching products specific to that region. There may be duplicate
   * product matches in the union of all the per-product results.
   */
  productGroupedResults?: GoogleCloudVisionV1p3beta1ProductSearchResultsGroupedResult[];
  /**
   * List of results, one for each product match.
   */
  results?: GoogleCloudVisionV1p3beta1ProductSearchResultsResult[];
}

function serializeGoogleCloudVisionV1p3beta1ProductSearchResults(data: any): GoogleCloudVisionV1p3beta1ProductSearchResults {
  return {
    ...data,
    indexTime: data["indexTime"] !== undefined ? data["indexTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVisionV1p3beta1ProductSearchResults(data: any): GoogleCloudVisionV1p3beta1ProductSearchResults {
  return {
    ...data,
    indexTime: data["indexTime"] !== undefined ? new Date(data["indexTime"]) : undefined,
  };
}

/**
 * Information about the products similar to a single product in a query image.
 */
export interface GoogleCloudVisionV1p3beta1ProductSearchResultsGroupedResult {
  /**
   * The bounding polygon around the product detected in the query image.
   */
  boundingPoly?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /**
   * List of generic predictions for the object in the bounding box.
   */
  objectAnnotations?: GoogleCloudVisionV1p3beta1ProductSearchResultsObjectAnnotation[];
  /**
   * List of results, one for each product match.
   */
  results?: GoogleCloudVisionV1p3beta1ProductSearchResultsResult[];
}

/**
 * Prediction for what the object in the bounding box is.
 */
export interface GoogleCloudVisionV1p3beta1ProductSearchResultsObjectAnnotation {
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * Object ID that should align with EntityAnnotation mid.
   */
  mid?: string;
  /**
   * Object name, expressed in its `language_code` language.
   */
  name?: string;
  /**
   * Score of the result. Range [0, 1].
   */
  score?: number;
}

/**
 * Information about a product.
 */
export interface GoogleCloudVisionV1p3beta1ProductSearchResultsResult {
  /**
   * The resource name of the image from the product that is the closest match
   * to the query.
   */
  image?: string;
  /**
   * The Product.
   */
  product?: GoogleCloudVisionV1p3beta1Product;
  /**
   * A confidence level on the match, ranging from 0 (no confidence) to 1 (full
   * confidence).
   */
  score?: number;
}

/**
 * A `Property` consists of a user-supplied name/value pair.
 */
export interface GoogleCloudVisionV1p3beta1Property {
  /**
   * Name of the property.
   */
  name?: string;
  /**
   * Value of numeric properties.
   */
  uint64Value?: bigint;
  /**
   * Value of the property.
   */
  value?: string;
}

function serializeGoogleCloudVisionV1p3beta1Property(data: any): GoogleCloudVisionV1p3beta1Property {
  return {
    ...data,
    uint64Value: data["uint64Value"] !== undefined ? String(data["uint64Value"]) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p3beta1Property(data: any): GoogleCloudVisionV1p3beta1Property {
  return {
    ...data,
    uint64Value: data["uint64Value"] !== undefined ? BigInt(data["uint64Value"]) : undefined,
  };
}

/**
 * A `ReferenceImage` represents a product image and its associated metadata,
 * such as bounding boxes.
 */
export interface GoogleCloudVisionV1p3beta1ReferenceImage {
  /**
   * Optional. Bounding polygons around the areas of interest in the reference
   * image. If this field is empty, the system will try to detect regions of
   * interest. At most 10 bounding polygons will be used. The provided shape is
   * converted into a non-rotated rectangle. Once converted, the small edge of
   * the rectangle must be greater than or equal to 300 pixels. The aspect ratio
   * must be 1:4 or less (i.e. 1:3 is ok; 1:5 is not).
   */
  boundingPolys?: GoogleCloudVisionV1p3beta1BoundingPoly[];
  /**
   * The resource name of the reference image. Format is:
   * `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID/referenceImages/IMAGE_ID`.
   * This field is ignored when creating a reference image.
   */
  name?: string;
  /**
   * Required. The Google Cloud Storage URI of the reference image. The URI
   * must start with `gs://`.
   */
  uri?: string;
}

/**
 * Set of features pertaining to the image, computed by computer vision methods
 * over safe-search verticals (for example, adult, spoof, medical, violence).
 */
export interface GoogleCloudVisionV1p3beta1SafeSearchAnnotation {
  /**
   * Represents the adult content likelihood for the image. Adult content may
   * contain elements such as nudity, pornographic images or cartoons, or sexual
   * activities.
   */
  adult?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that this is a medical image.
   */
  medical?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that the request image contains racy content. Racy content may
   * include (but is not limited to) skimpy or sheer clothing, strategically
   * covered nudity, lewd or provocative poses, or close-ups of sensitive body
   * areas.
   */
  racy?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Spoof likelihood. The likelihood that an modification was made to the
   * image's canonical version to make it appear funny or offensive.
   */
  spoof?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that this image contains violent content.
   */
  violence?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
}

/**
 * A single symbol representation.
 */
export interface GoogleCloudVisionV1p3beta1Symbol {
  /**
   * The bounding box for the symbol. The vertices are in the order of
   * top-left, top-right, bottom-right, bottom-left. When a rotation of the
   * bounding box is detected the rotation is represented as around the top-left
   * corner as defined when the text is read in the 'natural' orientation. For
   * example: * when the text is horizontal it might look like: 0----1 | |
   * 3----2 * when it's rotated 180 degrees around the top-left corner it
   * becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /**
   * Confidence of the OCR results for the symbol. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the symbol.
   */
  property?: GoogleCloudVisionV1p3beta1TextAnnotationTextProperty;
  /**
   * The actual UTF-8 representation of the symbol.
   */
  text?: string;
}

/**
 * TextAnnotation contains a structured representation of OCR extracted text.
 * The hierarchy of an OCR extracted text structure is like this: TextAnnotation
 * -> Page -> Block -> Paragraph -> Word -> Symbol Each structural component,
 * starting from Page, may further have their own properties. Properties
 * describe detected languages, breaks etc.. Please refer to the
 * TextAnnotation.TextProperty message definition below for more detail.
 */
export interface GoogleCloudVisionV1p3beta1TextAnnotation {
  /**
   * List of pages detected by OCR.
   */
  pages?: GoogleCloudVisionV1p3beta1Page[];
  /**
   * UTF-8 text detected on the pages.
   */
  text?: string;
}

/**
 * Detected start or end of a structural component.
 */
export interface GoogleCloudVisionV1p3beta1TextAnnotationDetectedBreak {
  /**
   * True if break prepends the element.
   */
  isPrefix?: boolean;
  /**
   * Detected break type.
   */
  type?:  | "UNKNOWN" | "SPACE" | "SURE_SPACE" | "EOL_SURE_SPACE" | "HYPHEN" | "LINE_BREAK";
}

/**
 * Detected language for a structural component.
 */
export interface GoogleCloudVisionV1p3beta1TextAnnotationDetectedLanguage {
  /**
   * Confidence of detected language. Range [0, 1].
   */
  confidence?: number;
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

/**
 * Additional information detected on the structural component.
 */
export interface GoogleCloudVisionV1p3beta1TextAnnotationTextProperty {
  /**
   * Detected start or end of a text segment.
   */
  detectedBreak?: GoogleCloudVisionV1p3beta1TextAnnotationDetectedBreak;
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudVisionV1p3beta1TextAnnotationDetectedLanguage[];
}

/**
 * A vertex represents a 2D point in the image. NOTE: the vertex coordinates
 * are in the same scale as the original image.
 */
export interface GoogleCloudVisionV1p3beta1Vertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
}

/**
 * Relevant information for the image from the Internet.
 */
export interface GoogleCloudVisionV1p3beta1WebDetection {
  /**
   * The service's best guess as to the topic of the request image. Inferred
   * from similar images on the open web.
   */
  bestGuessLabels?: GoogleCloudVisionV1p3beta1WebDetectionWebLabel[];
  /**
   * Fully matching images from the Internet. Can include resized copies of the
   * query image.
   */
  fullMatchingImages?: GoogleCloudVisionV1p3beta1WebDetectionWebImage[];
  /**
   * Web pages containing the matching images from the Internet.
   */
  pagesWithMatchingImages?: GoogleCloudVisionV1p3beta1WebDetectionWebPage[];
  /**
   * Partial matching images from the Internet. Those images are similar enough
   * to share some key-point features. For example an original image will likely
   * have partial matching for its crops.
   */
  partialMatchingImages?: GoogleCloudVisionV1p3beta1WebDetectionWebImage[];
  /**
   * The visually similar image results.
   */
  visuallySimilarImages?: GoogleCloudVisionV1p3beta1WebDetectionWebImage[];
  /**
   * Deduced entities from similar images on the Internet.
   */
  webEntities?: GoogleCloudVisionV1p3beta1WebDetectionWebEntity[];
}

/**
 * Entity deduced from similar images on the Internet.
 */
export interface GoogleCloudVisionV1p3beta1WebDetectionWebEntity {
  /**
   * Canonical description of the entity, in English.
   */
  description?: string;
  /**
   * Opaque entity ID.
   */
  entityId?: string;
  /**
   * Overall relevancy score for the entity. Not normalized and not comparable
   * across different image queries.
   */
  score?: number;
}

/**
 * Metadata for online images.
 */
export interface GoogleCloudVisionV1p3beta1WebDetectionWebImage {
  /**
   * (Deprecated) Overall relevancy score for the image.
   */
  score?: number;
  /**
   * The result image URL.
   */
  url?: string;
}

/**
 * Label to provide extra metadata for the web detection.
 */
export interface GoogleCloudVisionV1p3beta1WebDetectionWebLabel {
  /**
   * Label for extra metadata.
   */
  label?: string;
  /**
   * The BCP-47 language code for `label`, such as "en-US" or "sr-Latn". For
   * more information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

/**
 * Metadata for web pages.
 */
export interface GoogleCloudVisionV1p3beta1WebDetectionWebPage {
  /**
   * Fully matching images on the page. Can include resized copies of the query
   * image.
   */
  fullMatchingImages?: GoogleCloudVisionV1p3beta1WebDetectionWebImage[];
  /**
   * Title for the web page, may contain HTML markups.
   */
  pageTitle?: string;
  /**
   * Partial matching images on the page. Those images are similar enough to
   * share some key-point features. For example an original image will likely
   * have partial matching for its crops.
   */
  partialMatchingImages?: GoogleCloudVisionV1p3beta1WebDetectionWebImage[];
  /**
   * (Deprecated) Overall relevancy score for the web page.
   */
  score?: number;
  /**
   * The result web page URL.
   */
  url?: string;
}

/**
 * A word representation.
 */
export interface GoogleCloudVisionV1p3beta1Word {
  /**
   * The bounding box for the word. The vertices are in the order of top-left,
   * top-right, bottom-right, bottom-left. When a rotation of the bounding box
   * is detected the rotation is represented as around the top-left corner as
   * defined when the text is read in the 'natural' orientation. For example: *
   * when the text is horizontal it might look like: 0----1 | | 3----2 * when
   * it's rotated 180 degrees around the top-left corner it becomes: 2----3 | |
   * 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p3beta1BoundingPoly;
  /**
   * Confidence of the OCR results for the word. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the word.
   */
  property?: GoogleCloudVisionV1p3beta1TextAnnotationTextProperty;
  /**
   * List of symbols in the word. The order of the symbols follows the natural
   * reading order.
   */
  symbols?: GoogleCloudVisionV1p3beta1Symbol[];
}

/**
 * Response to a single file annotation request. A file may contain one or more
 * images, which individually have their own responses.
 */
export interface GoogleCloudVisionV1p4beta1AnnotateFileResponse {
  /**
   * If set, represents the error message for the failed request. The
   * `responses` field will not be set in this case.
   */
  error?: Status;
  /**
   * Information about the file for which this response is generated.
   */
  inputConfig?: GoogleCloudVisionV1p4beta1InputConfig;
  /**
   * Individual responses to images found within the file. This field will be
   * empty if the `error` field is set.
   */
  responses?: GoogleCloudVisionV1p4beta1AnnotateImageResponse[];
  /**
   * This field gives the total number of pages in the file.
   */
  totalPages?: number;
}

function serializeGoogleCloudVisionV1p4beta1AnnotateFileResponse(data: any): GoogleCloudVisionV1p4beta1AnnotateFileResponse {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? serializeGoogleCloudVisionV1p4beta1InputConfig(data["inputConfig"]) : undefined,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (serializeGoogleCloudVisionV1p4beta1AnnotateImageResponse(item))) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p4beta1AnnotateFileResponse(data: any): GoogleCloudVisionV1p4beta1AnnotateFileResponse {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? deserializeGoogleCloudVisionV1p4beta1InputConfig(data["inputConfig"]) : undefined,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (deserializeGoogleCloudVisionV1p4beta1AnnotateImageResponse(item))) : undefined,
  };
}

/**
 * Response to an image annotation request.
 */
export interface GoogleCloudVisionV1p4beta1AnnotateImageResponse {
  /**
   * If present, contextual information is needed to understand where this
   * image comes from.
   */
  context?: GoogleCloudVisionV1p4beta1ImageAnnotationContext;
  /**
   * If present, crop hints have completed successfully.
   */
  cropHintsAnnotation?: GoogleCloudVisionV1p4beta1CropHintsAnnotation;
  /**
   * If set, represents the error message for the operation. Note that
   * filled-in image annotations are guaranteed to be correct, even when `error`
   * is set.
   */
  error?: Status;
  /**
   * If present, face detection has completed successfully.
   */
  faceAnnotations?: GoogleCloudVisionV1p4beta1FaceAnnotation[];
  /**
   * If present, text (OCR) detection or document (OCR) text detection has
   * completed successfully. This annotation provides the structural hierarchy
   * for the OCR detected text.
   */
  fullTextAnnotation?: GoogleCloudVisionV1p4beta1TextAnnotation;
  /**
   * If present, image properties were extracted successfully.
   */
  imagePropertiesAnnotation?: GoogleCloudVisionV1p4beta1ImageProperties;
  /**
   * If present, label detection has completed successfully.
   */
  labelAnnotations?: GoogleCloudVisionV1p4beta1EntityAnnotation[];
  /**
   * If present, landmark detection has completed successfully.
   */
  landmarkAnnotations?: GoogleCloudVisionV1p4beta1EntityAnnotation[];
  /**
   * If present, localized object detection has completed successfully. This
   * will be sorted descending by confidence score.
   */
  localizedObjectAnnotations?: GoogleCloudVisionV1p4beta1LocalizedObjectAnnotation[];
  /**
   * If present, logo detection has completed successfully.
   */
  logoAnnotations?: GoogleCloudVisionV1p4beta1EntityAnnotation[];
  /**
   * If present, product search has completed successfully.
   */
  productSearchResults?: GoogleCloudVisionV1p4beta1ProductSearchResults;
  /**
   * If present, safe-search annotation has completed successfully.
   */
  safeSearchAnnotation?: GoogleCloudVisionV1p4beta1SafeSearchAnnotation;
  /**
   * If present, text (OCR) detection has completed successfully.
   */
  textAnnotations?: GoogleCloudVisionV1p4beta1EntityAnnotation[];
  /**
   * If present, web detection has completed successfully.
   */
  webDetection?: GoogleCloudVisionV1p4beta1WebDetection;
}

function serializeGoogleCloudVisionV1p4beta1AnnotateImageResponse(data: any): GoogleCloudVisionV1p4beta1AnnotateImageResponse {
  return {
    ...data,
    labelAnnotations: data["labelAnnotations"] !== undefined ? data["labelAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p4beta1EntityAnnotation(item))) : undefined,
    landmarkAnnotations: data["landmarkAnnotations"] !== undefined ? data["landmarkAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p4beta1EntityAnnotation(item))) : undefined,
    logoAnnotations: data["logoAnnotations"] !== undefined ? data["logoAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p4beta1EntityAnnotation(item))) : undefined,
    productSearchResults: data["productSearchResults"] !== undefined ? serializeGoogleCloudVisionV1p4beta1ProductSearchResults(data["productSearchResults"]) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (serializeGoogleCloudVisionV1p4beta1EntityAnnotation(item))) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p4beta1AnnotateImageResponse(data: any): GoogleCloudVisionV1p4beta1AnnotateImageResponse {
  return {
    ...data,
    labelAnnotations: data["labelAnnotations"] !== undefined ? data["labelAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p4beta1EntityAnnotation(item))) : undefined,
    landmarkAnnotations: data["landmarkAnnotations"] !== undefined ? data["landmarkAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p4beta1EntityAnnotation(item))) : undefined,
    logoAnnotations: data["logoAnnotations"] !== undefined ? data["logoAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p4beta1EntityAnnotation(item))) : undefined,
    productSearchResults: data["productSearchResults"] !== undefined ? deserializeGoogleCloudVisionV1p4beta1ProductSearchResults(data["productSearchResults"]) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (deserializeGoogleCloudVisionV1p4beta1EntityAnnotation(item))) : undefined,
  };
}

/**
 * The response for a single offline file annotation request.
 */
export interface GoogleCloudVisionV1p4beta1AsyncAnnotateFileResponse {
  /**
   * The output location and metadata from AsyncAnnotateFileRequest.
   */
  outputConfig?: GoogleCloudVisionV1p4beta1OutputConfig;
}

/**
 * Response to an async batch file annotation request.
 */
export interface GoogleCloudVisionV1p4beta1AsyncBatchAnnotateFilesResponse {
  /**
   * The list of file annotation responses, one for each request in
   * AsyncBatchAnnotateFilesRequest.
   */
  responses?: GoogleCloudVisionV1p4beta1AsyncAnnotateFileResponse[];
}

/**
 * Response to an async batch image annotation request.
 */
export interface GoogleCloudVisionV1p4beta1AsyncBatchAnnotateImagesResponse {
  /**
   * The output location and metadata from AsyncBatchAnnotateImagesRequest.
   */
  outputConfig?: GoogleCloudVisionV1p4beta1OutputConfig;
}

/**
 * A list of file annotation responses.
 */
export interface GoogleCloudVisionV1p4beta1BatchAnnotateFilesResponse {
  /**
   * The list of file annotation responses, each response corresponding to each
   * AnnotateFileRequest in BatchAnnotateFilesRequest.
   */
  responses?: GoogleCloudVisionV1p4beta1AnnotateFileResponse[];
}

function serializeGoogleCloudVisionV1p4beta1BatchAnnotateFilesResponse(data: any): GoogleCloudVisionV1p4beta1BatchAnnotateFilesResponse {
  return {
    ...data,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (serializeGoogleCloudVisionV1p4beta1AnnotateFileResponse(item))) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p4beta1BatchAnnotateFilesResponse(data: any): GoogleCloudVisionV1p4beta1BatchAnnotateFilesResponse {
  return {
    ...data,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (deserializeGoogleCloudVisionV1p4beta1AnnotateFileResponse(item))) : undefined,
  };
}

/**
 * Metadata for the batch operations such as the current state. This is
 * included in the `metadata` field of the `Operation` returned by the
 * `GetOperation` call of the `google::longrunning::Operations` service.
 */
export interface GoogleCloudVisionV1p4beta1BatchOperationMetadata {
  /**
   * The time when the batch request is finished and
   * google.longrunning.Operation.done is set to true.
   */
  endTime?: Date;
  /**
   * The current state of the batch operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "PROCESSING" | "SUCCESSFUL" | "FAILED" | "CANCELLED";
  /**
   * The time when the batch request was submitted to the server.
   */
  submitTime?: Date;
}

function serializeGoogleCloudVisionV1p4beta1BatchOperationMetadata(data: any): GoogleCloudVisionV1p4beta1BatchOperationMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    submitTime: data["submitTime"] !== undefined ? data["submitTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVisionV1p4beta1BatchOperationMetadata(data: any): GoogleCloudVisionV1p4beta1BatchOperationMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    submitTime: data["submitTime"] !== undefined ? new Date(data["submitTime"]) : undefined,
  };
}

/**
 * Logical element on the page.
 */
export interface GoogleCloudVisionV1p4beta1Block {
  /**
   * Detected block type (text, image etc) for this block.
   */
  blockType?:  | "UNKNOWN" | "TEXT" | "TABLE" | "PICTURE" | "RULER" | "BARCODE";
  /**
   * The bounding box for the block. The vertices are in the order of top-left,
   * top-right, bottom-right, bottom-left. When a rotation of the bounding box
   * is detected the rotation is represented as around the top-left corner as
   * defined when the text is read in the 'natural' orientation. For example: *
   * when the text is horizontal it might look like: 0----1 | | 3----2 * when
   * it's rotated 180 degrees around the top-left corner it becomes: 2----3 | |
   * 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /**
   * Confidence of the OCR results on the block. Range [0, 1].
   */
  confidence?: number;
  /**
   * List of paragraphs in this block (if this blocks is of type text).
   */
  paragraphs?: GoogleCloudVisionV1p4beta1Paragraph[];
  /**
   * Additional information detected for the block.
   */
  property?: GoogleCloudVisionV1p4beta1TextAnnotationTextProperty;
}

/**
 * A bounding polygon for the detected image annotation.
 */
export interface GoogleCloudVisionV1p4beta1BoundingPoly {
  /**
   * The bounding polygon normalized vertices.
   */
  normalizedVertices?: GoogleCloudVisionV1p4beta1NormalizedVertex[];
  /**
   * The bounding polygon vertices.
   */
  vertices?: GoogleCloudVisionV1p4beta1Vertex[];
}

/**
 * A Celebrity is a group of Faces with an identity.
 */
export interface GoogleCloudVisionV1p4beta1Celebrity {
  /**
   * The Celebrity's description.
   */
  description?: string;
  /**
   * The Celebrity's display name.
   */
  displayName?: string;
  /**
   * The resource name of the preloaded Celebrity. Has the format
   * `builtin/{mid}`.
   */
  name?: string;
}

/**
 * Color information consists of RGB channels, score, and the fraction of the
 * image that the color occupies in the image.
 */
export interface GoogleCloudVisionV1p4beta1ColorInfo {
  /**
   * RGB components of the color.
   */
  color?: Color;
  /**
   * The fraction of pixels the color occupies in the image. Value in range [0,
   * 1].
   */
  pixelFraction?: number;
  /**
   * Image-specific score for this color. Value in range [0, 1].
   */
  score?: number;
}

/**
 * Single crop hint that is used to generate a new crop when serving an image.
 */
export interface GoogleCloudVisionV1p4beta1CropHint {
  /**
   * The bounding polygon for the crop region. The coordinates of the bounding
   * box are in the original image's scale.
   */
  boundingPoly?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /**
   * Confidence of this being a salient region. Range [0, 1].
   */
  confidence?: number;
  /**
   * Fraction of importance of this salient region with respect to the original
   * image.
   */
  importanceFraction?: number;
}

/**
 * Set of crop hints that are used to generate new crops when serving images.
 */
export interface GoogleCloudVisionV1p4beta1CropHintsAnnotation {
  /**
   * Crop hint results.
   */
  cropHints?: GoogleCloudVisionV1p4beta1CropHint[];
}

/**
 * Set of dominant colors and their corresponding scores.
 */
export interface GoogleCloudVisionV1p4beta1DominantColorsAnnotation {
  /**
   * RGB color values with their score and pixel fraction.
   */
  colors?: GoogleCloudVisionV1p4beta1ColorInfo[];
}

/**
 * Set of detected entity features.
 */
export interface GoogleCloudVisionV1p4beta1EntityAnnotation {
  /**
   * Image region to which this entity belongs. Not produced for
   * `LABEL_DETECTION` features.
   */
  boundingPoly?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /**
   * **Deprecated. Use `score` instead.** The accuracy of the entity detection
   * in an image. For example, for an image in which the "Eiffel Tower" entity
   * is detected, this field represents the confidence that there is a tower in
   * the query image. Range [0, 1].
   */
  confidence?: number;
  /**
   * Entity textual description, expressed in its `locale` language.
   */
  description?: string;
  /**
   * The language code for the locale in which the entity textual `description`
   * is expressed.
   */
  locale?: string;
  /**
   * The location information for the detected entity. Multiple `LocationInfo`
   * elements can be present because one location may indicate the location of
   * the scene in the image, and another location may indicate the location of
   * the place where the image was taken. Location information is usually
   * present for landmarks.
   */
  locations?: GoogleCloudVisionV1p4beta1LocationInfo[];
  /**
   * Opaque entity ID. Some IDs may be available in [Google Knowledge Graph
   * Search API](https://developers.google.com/knowledge-graph/).
   */
  mid?: string;
  /**
   * Some entities may have optional user-supplied `Property` (name/value)
   * fields, such a score or string that qualifies the entity.
   */
  properties?: GoogleCloudVisionV1p4beta1Property[];
  /**
   * Overall score of the result. Range [0, 1].
   */
  score?: number;
  /**
   * The relevancy of the ICA (Image Content Annotation) label to the image.
   * For example, the relevancy of "tower" is likely higher to an image
   * containing the detected "Eiffel Tower" than to an image containing a
   * detected distant towering building, even though the confidence that there
   * is a tower in each image may be the same. Range [0, 1].
   */
  topicality?: number;
}

function serializeGoogleCloudVisionV1p4beta1EntityAnnotation(data: any): GoogleCloudVisionV1p4beta1EntityAnnotation {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (serializeGoogleCloudVisionV1p4beta1Property(item))) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p4beta1EntityAnnotation(data: any): GoogleCloudVisionV1p4beta1EntityAnnotation {
  return {
    ...data,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (deserializeGoogleCloudVisionV1p4beta1Property(item))) : undefined,
  };
}

/**
 * A face annotation object contains the results of face detection.
 */
export interface GoogleCloudVisionV1p4beta1FaceAnnotation {
  /**
   * Anger likelihood.
   */
  angerLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Blurred likelihood.
   */
  blurredLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * The bounding polygon around the face. The coordinates of the bounding box
   * are in the original image's scale. The bounding box is computed to "frame"
   * the face in accordance with human expectations. It is based on the
   * landmarker results. Note that one or more x and/or y coordinates may not be
   * generated in the `BoundingPoly` (the polygon will be unbounded) if only a
   * partial face appears in the image to be annotated.
   */
  boundingPoly?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /**
   * Detection confidence. Range [0, 1].
   */
  detectionConfidence?: number;
  /**
   * The `fd_bounding_poly` bounding polygon is tighter than the
   * `boundingPoly`, and encloses only the skin part of the face. Typically, it
   * is used to eliminate the face from any image analysis that detects the
   * "amount of skin" visible in an image. It is not based on the landmarker
   * results, only on the initial face detection, hence the fd (face detection)
   * prefix.
   */
  fdBoundingPoly?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /**
   * Headwear likelihood.
   */
  headwearLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Joy likelihood.
   */
  joyLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Face landmarking confidence. Range [0, 1].
   */
  landmarkingConfidence?: number;
  /**
   * Detected face landmarks.
   */
  landmarks?: GoogleCloudVisionV1p4beta1FaceAnnotationLandmark[];
  /**
   * Yaw angle, which indicates the leftward/rightward angle that the face is
   * pointing relative to the vertical plane perpendicular to the image. Range
   * [-180,180].
   */
  panAngle?: number;
  /**
   * Additional recognition information. Only computed if
   * image_context.face_recognition_params is provided, **and** a match is found
   * to a Celebrity in the input CelebritySet. This field is sorted in order of
   * decreasing confidence values.
   */
  recognitionResult?: GoogleCloudVisionV1p4beta1FaceRecognitionResult[];
  /**
   * Roll angle, which indicates the amount of clockwise/anti-clockwise
   * rotation of the face relative to the image vertical about the axis
   * perpendicular to the face. Range [-180,180].
   */
  rollAngle?: number;
  /**
   * Sorrow likelihood.
   */
  sorrowLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Surprise likelihood.
   */
  surpriseLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Pitch angle, which indicates the upwards/downwards angle that the face is
   * pointing relative to the image's horizontal plane. Range [-180,180].
   */
  tiltAngle?: number;
  /**
   * Under-exposed likelihood.
   */
  underExposedLikelihood?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
}

/**
 * A face-specific landmark (for example, a face feature).
 */
export interface GoogleCloudVisionV1p4beta1FaceAnnotationLandmark {
  /**
   * Face landmark position.
   */
  position?: GoogleCloudVisionV1p4beta1Position;
  /**
   * Face landmark type.
   */
  type?:  | "UNKNOWN_LANDMARK" | "LEFT_EYE" | "RIGHT_EYE" | "LEFT_OF_LEFT_EYEBROW" | "RIGHT_OF_LEFT_EYEBROW" | "LEFT_OF_RIGHT_EYEBROW" | "RIGHT_OF_RIGHT_EYEBROW" | "MIDPOINT_BETWEEN_EYES" | "NOSE_TIP" | "UPPER_LIP" | "LOWER_LIP" | "MOUTH_LEFT" | "MOUTH_RIGHT" | "MOUTH_CENTER" | "NOSE_BOTTOM_RIGHT" | "NOSE_BOTTOM_LEFT" | "NOSE_BOTTOM_CENTER" | "LEFT_EYE_TOP_BOUNDARY" | "LEFT_EYE_RIGHT_CORNER" | "LEFT_EYE_BOTTOM_BOUNDARY" | "LEFT_EYE_LEFT_CORNER" | "RIGHT_EYE_TOP_BOUNDARY" | "RIGHT_EYE_RIGHT_CORNER" | "RIGHT_EYE_BOTTOM_BOUNDARY" | "RIGHT_EYE_LEFT_CORNER" | "LEFT_EYEBROW_UPPER_MIDPOINT" | "RIGHT_EYEBROW_UPPER_MIDPOINT" | "LEFT_EAR_TRAGION" | "RIGHT_EAR_TRAGION" | "LEFT_EYE_PUPIL" | "RIGHT_EYE_PUPIL" | "FOREHEAD_GLABELLA" | "CHIN_GNATHION" | "CHIN_LEFT_GONION" | "CHIN_RIGHT_GONION" | "LEFT_CHEEK_CENTER" | "RIGHT_CHEEK_CENTER";
}

/**
 * Information about a face's identity.
 */
export interface GoogleCloudVisionV1p4beta1FaceRecognitionResult {
  /**
   * The Celebrity that this face was matched to.
   */
  celebrity?: GoogleCloudVisionV1p4beta1Celebrity;
  /**
   * Recognition confidence. Range [0, 1].
   */
  confidence?: number;
}

/**
 * The Google Cloud Storage location where the output will be written to.
 */
export interface GoogleCloudVisionV1p4beta1GcsDestination {
  /**
   * Google Cloud Storage URI prefix where the results will be stored. Results
   * will be in JSON format and preceded by its corresponding input URI prefix.
   * This field can either represent a gcs file prefix or gcs directory. In
   * either case, the uri should be unique because in order to get all of the
   * output files, you will need to do a wildcard gcs search on the uri prefix
   * you provide. Examples: * File Prefix: gs://bucket-name/here/filenameprefix
   * The output files will be created in gs://bucket-name/here/ and the names of
   * the output files will begin with "filenameprefix". * Directory Prefix:
   * gs://bucket-name/some/location/ The output files will be created in
   * gs://bucket-name/some/location/ and the names of the output files could be
   * anything because there was no filename prefix specified. If multiple
   * outputs, each response is still AnnotateFileResponse, each of which
   * contains some subset of the full list of AnnotateImageResponse. Multiple
   * outputs can happen if, for example, the output JSON is too large and
   * overflows into multiple sharded files.
   */
  uri?: string;
}

/**
 * The Google Cloud Storage location where the input will be read from.
 */
export interface GoogleCloudVisionV1p4beta1GcsSource {
  /**
   * Google Cloud Storage URI for the input file. This must only be a Google
   * Cloud Storage object. Wildcards are not currently supported.
   */
  uri?: string;
}

/**
 * If an image was produced from a file (e.g. a PDF), this message gives
 * information about the source of that image.
 */
export interface GoogleCloudVisionV1p4beta1ImageAnnotationContext {
  /**
   * If the file was a PDF or TIFF, this field gives the page number within the
   * file used to produce the image.
   */
  pageNumber?: number;
  /**
   * The URI of the file used to produce the image.
   */
  uri?: string;
}

/**
 * Stores image properties, such as dominant colors.
 */
export interface GoogleCloudVisionV1p4beta1ImageProperties {
  /**
   * If present, dominant colors completed successfully.
   */
  dominantColors?: GoogleCloudVisionV1p4beta1DominantColorsAnnotation;
}

/**
 * Response message for the `ImportProductSets` method. This message is
 * returned by the google.longrunning.Operations.GetOperation method in the
 * returned google.longrunning.Operation.response field.
 */
export interface GoogleCloudVisionV1p4beta1ImportProductSetsResponse {
  /**
   * The list of reference_images that are imported successfully.
   */
  referenceImages?: GoogleCloudVisionV1p4beta1ReferenceImage[];
  /**
   * The rpc status for each ImportProductSet request, including both successes
   * and errors. The number of statuses here matches the number of lines in the
   * csv file, and statuses[i] stores the success or failure status of
   * processing the i-th line of the csv, starting from line 0.
   */
  statuses?: Status[];
}

/**
 * The desired input location and metadata.
 */
export interface GoogleCloudVisionV1p4beta1InputConfig {
  /**
   * File content, represented as a stream of bytes. Note: As with all `bytes`
   * fields, protobuffers use a pure binary representation, whereas JSON
   * representations use base64. Currently, this field only works for
   * BatchAnnotateFiles requests. It does not work for AsyncBatchAnnotateFiles
   * requests.
   */
  content?: Uint8Array;
  /**
   * The Google Cloud Storage location to read the input from.
   */
  gcsSource?: GoogleCloudVisionV1p4beta1GcsSource;
  /**
   * The type of the file. Currently only "application/pdf", "image/tiff" and
   * "image/gif" are supported. Wildcards are not supported.
   */
  mimeType?: string;
}

function serializeGoogleCloudVisionV1p4beta1InputConfig(data: any): GoogleCloudVisionV1p4beta1InputConfig {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p4beta1InputConfig(data: any): GoogleCloudVisionV1p4beta1InputConfig {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * Set of detected objects with bounding boxes.
 */
export interface GoogleCloudVisionV1p4beta1LocalizedObjectAnnotation {
  /**
   * Image region to which this object belongs. This must be populated.
   */
  boundingPoly?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * Object ID that should align with EntityAnnotation mid.
   */
  mid?: string;
  /**
   * Object name, expressed in its `language_code` language.
   */
  name?: string;
  /**
   * Score of the result. Range [0, 1].
   */
  score?: number;
}

/**
 * Detected entity location information.
 */
export interface GoogleCloudVisionV1p4beta1LocationInfo {
  /**
   * lat/long location coordinates.
   */
  latLng?: LatLng;
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface GoogleCloudVisionV1p4beta1NormalizedVertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
}

/**
 * Contains metadata for the BatchAnnotateImages operation.
 */
export interface GoogleCloudVisionV1p4beta1OperationMetadata {
  /**
   * The time when the batch request was received.
   */
  createTime?: Date;
  /**
   * Current state of the batch operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "CREATED" | "RUNNING" | "DONE" | "CANCELLED";
  /**
   * The time when the operation result was last updated.
   */
  updateTime?: Date;
}

function serializeGoogleCloudVisionV1p4beta1OperationMetadata(data: any): GoogleCloudVisionV1p4beta1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVisionV1p4beta1OperationMetadata(data: any): GoogleCloudVisionV1p4beta1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The desired output location and metadata.
 */
export interface GoogleCloudVisionV1p4beta1OutputConfig {
  /**
   * The max number of response protos to put into each output JSON file on
   * Google Cloud Storage. The valid range is [1, 100]. If not specified, the
   * default value is 20. For example, for one pdf file with 100 pages, 100
   * response protos will be generated. If `batch_size` = 20, then 5 json files
   * each containing 20 response protos will be written under the prefix
   * `gcs_destination`.`uri`. Currently, batch_size only applies to
   * GcsDestination, with potential future support for other output
   * configurations.
   */
  batchSize?: number;
  /**
   * The Google Cloud Storage location to write the output(s) to.
   */
  gcsDestination?: GoogleCloudVisionV1p4beta1GcsDestination;
}

/**
 * Detected page from OCR.
 */
export interface GoogleCloudVisionV1p4beta1Page {
  /**
   * List of blocks of text, images etc on this page.
   */
  blocks?: GoogleCloudVisionV1p4beta1Block[];
  /**
   * Confidence of the OCR results on the page. Range [0, 1].
   */
  confidence?: number;
  /**
   * Page height. For PDFs the unit is points. For images (including TIFFs) the
   * unit is pixels.
   */
  height?: number;
  /**
   * Additional information detected on the page.
   */
  property?: GoogleCloudVisionV1p4beta1TextAnnotationTextProperty;
  /**
   * Page width. For PDFs the unit is points. For images (including TIFFs) the
   * unit is pixels.
   */
  width?: number;
}

/**
 * Structural unit of text representing a number of words in certain order.
 */
export interface GoogleCloudVisionV1p4beta1Paragraph {
  /**
   * The bounding box for the paragraph. The vertices are in the order of
   * top-left, top-right, bottom-right, bottom-left. When a rotation of the
   * bounding box is detected the rotation is represented as around the top-left
   * corner as defined when the text is read in the 'natural' orientation. For
   * example: * when the text is horizontal it might look like: 0----1 | |
   * 3----2 * when it's rotated 180 degrees around the top-left corner it
   * becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /**
   * Confidence of the OCR results for the paragraph. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the paragraph.
   */
  property?: GoogleCloudVisionV1p4beta1TextAnnotationTextProperty;
  /**
   * List of all words in this paragraph.
   */
  words?: GoogleCloudVisionV1p4beta1Word[];
}

/**
 * A 3D position in the image, used primarily for Face detection landmarks. A
 * valid Position must have both x and y coordinates. The position coordinates
 * are in the same scale as the original image.
 */
export interface GoogleCloudVisionV1p4beta1Position {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
  /**
   * Z coordinate (or depth).
   */
  z?: number;
}

/**
 * A Product contains ReferenceImages.
 */
export interface GoogleCloudVisionV1p4beta1Product {
  /**
   * User-provided metadata to be stored with this product. Must be at most
   * 4096 characters long.
   */
  description?: string;
  /**
   * The user-provided name for this Product. Must not be empty. Must be at
   * most 4096 characters long.
   */
  displayName?: string;
  /**
   * The resource name of the product. Format is:
   * `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. This field is
   * ignored when creating a product.
   */
  name?: string;
  /**
   * Immutable. The category for the product identified by the reference image.
   * This should be one of "homegoods-v2", "apparel-v2", "toys-v2",
   * "packagedgoods-v1" or "general-v1". The legacy categories "homegoods",
   * "apparel", and "toys" are still supported, but these should not be used for
   * new products.
   */
  productCategory?: string;
  /**
   * Key-value pairs that can be attached to a product. At query time,
   * constraints can be specified based on the product_labels. Note that integer
   * values can be provided as strings, e.g. "1199". Only strings with integer
   * values can match a range-based restriction which is to be supported soon.
   * Multiple values can be assigned to the same key. One product may have up to
   * 500 product_labels. Notice that the total number of distinct product_labels
   * over all products in one ProductSet cannot exceed 1M, otherwise the product
   * search pipeline will refuse to work for that ProductSet.
   */
  productLabels?: GoogleCloudVisionV1p4beta1ProductKeyValue[];
}

/**
 * A product label represented as a key-value pair.
 */
export interface GoogleCloudVisionV1p4beta1ProductKeyValue {
  /**
   * The key of the label attached to the product. Cannot be empty and cannot
   * exceed 128 bytes.
   */
  key?: string;
  /**
   * The value of the label attached to the product. Cannot be empty and cannot
   * exceed 128 bytes.
   */
  value?: string;
}

/**
 * Results for a product search request.
 */
export interface GoogleCloudVisionV1p4beta1ProductSearchResults {
  /**
   * Timestamp of the index which provided these results. Products added to the
   * product set and products removed from the product set after this time are
   * not reflected in the current results.
   */
  indexTime?: Date;
  /**
   * List of results grouped by products detected in the query image. Each
   * entry corresponds to one bounding polygon in the query image, and contains
   * the matching products specific to that region. There may be duplicate
   * product matches in the union of all the per-product results.
   */
  productGroupedResults?: GoogleCloudVisionV1p4beta1ProductSearchResultsGroupedResult[];
  /**
   * List of results, one for each product match.
   */
  results?: GoogleCloudVisionV1p4beta1ProductSearchResultsResult[];
}

function serializeGoogleCloudVisionV1p4beta1ProductSearchResults(data: any): GoogleCloudVisionV1p4beta1ProductSearchResults {
  return {
    ...data,
    indexTime: data["indexTime"] !== undefined ? data["indexTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVisionV1p4beta1ProductSearchResults(data: any): GoogleCloudVisionV1p4beta1ProductSearchResults {
  return {
    ...data,
    indexTime: data["indexTime"] !== undefined ? new Date(data["indexTime"]) : undefined,
  };
}

/**
 * Information about the products similar to a single product in a query image.
 */
export interface GoogleCloudVisionV1p4beta1ProductSearchResultsGroupedResult {
  /**
   * The bounding polygon around the product detected in the query image.
   */
  boundingPoly?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /**
   * List of generic predictions for the object in the bounding box.
   */
  objectAnnotations?: GoogleCloudVisionV1p4beta1ProductSearchResultsObjectAnnotation[];
  /**
   * List of results, one for each product match.
   */
  results?: GoogleCloudVisionV1p4beta1ProductSearchResultsResult[];
}

/**
 * Prediction for what the object in the bounding box is.
 */
export interface GoogleCloudVisionV1p4beta1ProductSearchResultsObjectAnnotation {
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * Object ID that should align with EntityAnnotation mid.
   */
  mid?: string;
  /**
   * Object name, expressed in its `language_code` language.
   */
  name?: string;
  /**
   * Score of the result. Range [0, 1].
   */
  score?: number;
}

/**
 * Information about a product.
 */
export interface GoogleCloudVisionV1p4beta1ProductSearchResultsResult {
  /**
   * The resource name of the image from the product that is the closest match
   * to the query.
   */
  image?: string;
  /**
   * The Product.
   */
  product?: GoogleCloudVisionV1p4beta1Product;
  /**
   * A confidence level on the match, ranging from 0 (no confidence) to 1 (full
   * confidence).
   */
  score?: number;
}

/**
 * A `Property` consists of a user-supplied name/value pair.
 */
export interface GoogleCloudVisionV1p4beta1Property {
  /**
   * Name of the property.
   */
  name?: string;
  /**
   * Value of numeric properties.
   */
  uint64Value?: bigint;
  /**
   * Value of the property.
   */
  value?: string;
}

function serializeGoogleCloudVisionV1p4beta1Property(data: any): GoogleCloudVisionV1p4beta1Property {
  return {
    ...data,
    uint64Value: data["uint64Value"] !== undefined ? String(data["uint64Value"]) : undefined,
  };
}

function deserializeGoogleCloudVisionV1p4beta1Property(data: any): GoogleCloudVisionV1p4beta1Property {
  return {
    ...data,
    uint64Value: data["uint64Value"] !== undefined ? BigInt(data["uint64Value"]) : undefined,
  };
}

/**
 * A `ReferenceImage` represents a product image and its associated metadata,
 * such as bounding boxes.
 */
export interface GoogleCloudVisionV1p4beta1ReferenceImage {
  /**
   * Optional. Bounding polygons around the areas of interest in the reference
   * image. If this field is empty, the system will try to detect regions of
   * interest. At most 10 bounding polygons will be used. The provided shape is
   * converted into a non-rotated rectangle. Once converted, the small edge of
   * the rectangle must be greater than or equal to 300 pixels. The aspect ratio
   * must be 1:4 or less (i.e. 1:3 is ok; 1:5 is not).
   */
  boundingPolys?: GoogleCloudVisionV1p4beta1BoundingPoly[];
  /**
   * The resource name of the reference image. Format is:
   * `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID/referenceImages/IMAGE_ID`.
   * This field is ignored when creating a reference image.
   */
  name?: string;
  /**
   * Required. The Google Cloud Storage URI of the reference image. The URI
   * must start with `gs://`.
   */
  uri?: string;
}

/**
 * Set of features pertaining to the image, computed by computer vision methods
 * over safe-search verticals (for example, adult, spoof, medical, violence).
 */
export interface GoogleCloudVisionV1p4beta1SafeSearchAnnotation {
  /**
   * Represents the adult content likelihood for the image. Adult content may
   * contain elements such as nudity, pornographic images or cartoons, or sexual
   * activities.
   */
  adult?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that this is a medical image.
   */
  medical?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that the request image contains racy content. Racy content may
   * include (but is not limited to) skimpy or sheer clothing, strategically
   * covered nudity, lewd or provocative poses, or close-ups of sensitive body
   * areas.
   */
  racy?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Spoof likelihood. The likelihood that an modification was made to the
   * image's canonical version to make it appear funny or offensive.
   */
  spoof?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that this image contains violent content.
   */
  violence?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
}

/**
 * A single symbol representation.
 */
export interface GoogleCloudVisionV1p4beta1Symbol {
  /**
   * The bounding box for the symbol. The vertices are in the order of
   * top-left, top-right, bottom-right, bottom-left. When a rotation of the
   * bounding box is detected the rotation is represented as around the top-left
   * corner as defined when the text is read in the 'natural' orientation. For
   * example: * when the text is horizontal it might look like: 0----1 | |
   * 3----2 * when it's rotated 180 degrees around the top-left corner it
   * becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /**
   * Confidence of the OCR results for the symbol. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the symbol.
   */
  property?: GoogleCloudVisionV1p4beta1TextAnnotationTextProperty;
  /**
   * The actual UTF-8 representation of the symbol.
   */
  text?: string;
}

/**
 * TextAnnotation contains a structured representation of OCR extracted text.
 * The hierarchy of an OCR extracted text structure is like this: TextAnnotation
 * -> Page -> Block -> Paragraph -> Word -> Symbol Each structural component,
 * starting from Page, may further have their own properties. Properties
 * describe detected languages, breaks etc.. Please refer to the
 * TextAnnotation.TextProperty message definition below for more detail.
 */
export interface GoogleCloudVisionV1p4beta1TextAnnotation {
  /**
   * List of pages detected by OCR.
   */
  pages?: GoogleCloudVisionV1p4beta1Page[];
  /**
   * UTF-8 text detected on the pages.
   */
  text?: string;
}

/**
 * Detected start or end of a structural component.
 */
export interface GoogleCloudVisionV1p4beta1TextAnnotationDetectedBreak {
  /**
   * True if break prepends the element.
   */
  isPrefix?: boolean;
  /**
   * Detected break type.
   */
  type?:  | "UNKNOWN" | "SPACE" | "SURE_SPACE" | "EOL_SURE_SPACE" | "HYPHEN" | "LINE_BREAK";
}

/**
 * Detected language for a structural component.
 */
export interface GoogleCloudVisionV1p4beta1TextAnnotationDetectedLanguage {
  /**
   * Confidence of detected language. Range [0, 1].
   */
  confidence?: number;
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

/**
 * Additional information detected on the structural component.
 */
export interface GoogleCloudVisionV1p4beta1TextAnnotationTextProperty {
  /**
   * Detected start or end of a text segment.
   */
  detectedBreak?: GoogleCloudVisionV1p4beta1TextAnnotationDetectedBreak;
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudVisionV1p4beta1TextAnnotationDetectedLanguage[];
}

/**
 * A vertex represents a 2D point in the image. NOTE: the vertex coordinates
 * are in the same scale as the original image.
 */
export interface GoogleCloudVisionV1p4beta1Vertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
}

/**
 * Relevant information for the image from the Internet.
 */
export interface GoogleCloudVisionV1p4beta1WebDetection {
  /**
   * The service's best guess as to the topic of the request image. Inferred
   * from similar images on the open web.
   */
  bestGuessLabels?: GoogleCloudVisionV1p4beta1WebDetectionWebLabel[];
  /**
   * Fully matching images from the Internet. Can include resized copies of the
   * query image.
   */
  fullMatchingImages?: GoogleCloudVisionV1p4beta1WebDetectionWebImage[];
  /**
   * Web pages containing the matching images from the Internet.
   */
  pagesWithMatchingImages?: GoogleCloudVisionV1p4beta1WebDetectionWebPage[];
  /**
   * Partial matching images from the Internet. Those images are similar enough
   * to share some key-point features. For example an original image will likely
   * have partial matching for its crops.
   */
  partialMatchingImages?: GoogleCloudVisionV1p4beta1WebDetectionWebImage[];
  /**
   * The visually similar image results.
   */
  visuallySimilarImages?: GoogleCloudVisionV1p4beta1WebDetectionWebImage[];
  /**
   * Deduced entities from similar images on the Internet.
   */
  webEntities?: GoogleCloudVisionV1p4beta1WebDetectionWebEntity[];
}

/**
 * Entity deduced from similar images on the Internet.
 */
export interface GoogleCloudVisionV1p4beta1WebDetectionWebEntity {
  /**
   * Canonical description of the entity, in English.
   */
  description?: string;
  /**
   * Opaque entity ID.
   */
  entityId?: string;
  /**
   * Overall relevancy score for the entity. Not normalized and not comparable
   * across different image queries.
   */
  score?: number;
}

/**
 * Metadata for online images.
 */
export interface GoogleCloudVisionV1p4beta1WebDetectionWebImage {
  /**
   * (Deprecated) Overall relevancy score for the image.
   */
  score?: number;
  /**
   * The result image URL.
   */
  url?: string;
}

/**
 * Label to provide extra metadata for the web detection.
 */
export interface GoogleCloudVisionV1p4beta1WebDetectionWebLabel {
  /**
   * Label for extra metadata.
   */
  label?: string;
  /**
   * The BCP-47 language code for `label`, such as "en-US" or "sr-Latn". For
   * more information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

/**
 * Metadata for web pages.
 */
export interface GoogleCloudVisionV1p4beta1WebDetectionWebPage {
  /**
   * Fully matching images on the page. Can include resized copies of the query
   * image.
   */
  fullMatchingImages?: GoogleCloudVisionV1p4beta1WebDetectionWebImage[];
  /**
   * Title for the web page, may contain HTML markups.
   */
  pageTitle?: string;
  /**
   * Partial matching images on the page. Those images are similar enough to
   * share some key-point features. For example an original image will likely
   * have partial matching for its crops.
   */
  partialMatchingImages?: GoogleCloudVisionV1p4beta1WebDetectionWebImage[];
  /**
   * (Deprecated) Overall relevancy score for the web page.
   */
  score?: number;
  /**
   * The result web page URL.
   */
  url?: string;
}

/**
 * A word representation.
 */
export interface GoogleCloudVisionV1p4beta1Word {
  /**
   * The bounding box for the word. The vertices are in the order of top-left,
   * top-right, bottom-right, bottom-left. When a rotation of the bounding box
   * is detected the rotation is represented as around the top-left corner as
   * defined when the text is read in the 'natural' orientation. For example: *
   * when the text is horizontal it might look like: 0----1 | | 3----2 * when
   * it's rotated 180 degrees around the top-left corner it becomes: 2----3 | |
   * 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: GoogleCloudVisionV1p4beta1BoundingPoly;
  /**
   * Confidence of the OCR results for the word. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the word.
   */
  property?: GoogleCloudVisionV1p4beta1TextAnnotationTextProperty;
  /**
   * List of symbols in the word. The order of the symbols follows the natural
   * reading order.
   */
  symbols?: GoogleCloudVisionV1p4beta1Symbol[];
}

/**
 * Information about the products similar to a single product in a query image.
 */
export interface GroupedResult {
  /**
   * The bounding polygon around the product detected in the query image.
   */
  boundingPoly?: BoundingPoly;
  /**
   * List of generic predictions for the object in the bounding box.
   */
  objectAnnotations?: ObjectAnnotation[];
  /**
   * List of results, one for each product match.
   */
  results?: Result[];
}

/**
 * Client image to perform Google Cloud Vision API tasks over.
 */
export interface Image {
  /**
   * Image content, represented as a stream of bytes. Note: As with all `bytes`
   * fields, protobuffers use a pure binary representation, whereas JSON
   * representations use base64. Currently, this field only works for
   * BatchAnnotateImages requests. It does not work for AsyncBatchAnnotateImages
   * requests.
   */
  content?: Uint8Array;
  /**
   * Google Cloud Storage image location, or publicly-accessible image URL. If
   * both `content` and `source` are provided for an image, `content` takes
   * precedence and is used to perform the image annotation request.
   */
  source?: ImageSource;
}

function serializeImage(data: any): Image {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeImage(data: any): Image {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * If an image was produced from a file (e.g. a PDF), this message gives
 * information about the source of that image.
 */
export interface ImageAnnotationContext {
  /**
   * If the file was a PDF or TIFF, this field gives the page number within the
   * file used to produce the image.
   */
  pageNumber?: number;
  /**
   * The URI of the file used to produce the image.
   */
  uri?: string;
}

/**
 * Image context and/or feature-specific parameters.
 */
export interface ImageContext {
  /**
   * Parameters for crop hints annotation request.
   */
  cropHintsParams?: CropHintsParams;
  /**
   * List of languages to use for TEXT_DETECTION. In most cases, an empty value
   * yields the best results since it enables automatic language detection. For
   * languages based on the Latin alphabet, setting `language_hints` is not
   * needed. In rare cases, when the language of the text in the image is known,
   * setting a hint will help get better results (although it will be a
   * significant hindrance if the hint is wrong). Text detection returns an
   * error if one or more of the specified languages is not one of the
   * [supported languages](https://cloud.google.com/vision/docs/languages).
   */
  languageHints?: string[];
  /**
   * Not used.
   */
  latLongRect?: LatLongRect;
  /**
   * Parameters for product search.
   */
  productSearchParams?: ProductSearchParams;
  /**
   * Parameters for text detection and document text detection.
   */
  textDetectionParams?: TextDetectionParams;
  /**
   * Parameters for web detection.
   */
  webDetectionParams?: WebDetectionParams;
}

/**
 * Stores image properties, such as dominant colors.
 */
export interface ImageProperties {
  /**
   * If present, dominant colors completed successfully.
   */
  dominantColors?: DominantColorsAnnotation;
}

/**
 * External image source (Google Cloud Storage or web URL image location).
 */
export interface ImageSource {
  /**
   * **Use `image_uri` instead.** The Google Cloud Storage URI of the form
   * `gs://bucket_name/object_name`. Object versioning is not supported. See
   * [Google Cloud Storage Request
   * URIs](https://cloud.google.com/storage/docs/reference-uris) for more info.
   */
  gcsImageUri?: string;
  /**
   * The URI of the source image. Can be either: 1. A Google Cloud Storage URI
   * of the form `gs://bucket_name/object_name`. Object versioning is not
   * supported. See [Google Cloud Storage Request
   * URIs](https://cloud.google.com/storage/docs/reference-uris) for more info.
   * 2. A publicly-accessible image HTTP/HTTPS URL. When fetching images from
   * HTTP/HTTPS URLs, Google cannot guarantee that the request will be
   * completed. Your request may fail if the specified host denies the request
   * (e.g. due to request throttling or DOS prevention), or if Google throttles
   * requests to the site for abuse prevention. You should not depend on
   * externally-hosted images for production applications. When both
   * `gcs_image_uri` and `image_uri` are specified, `image_uri` takes
   * precedence.
   */
  imageUri?: string;
}

/**
 * The Google Cloud Storage location for a csv file which preserves a list of
 * ImportProductSetRequests in each line.
 */
export interface ImportProductSetsGcsSource {
  /**
   * The Google Cloud Storage URI of the input csv file. The URI must start
   * with `gs://`. The format of the input csv file should be one image per
   * line. In each line, there are 8 columns. 1. image-uri 2. image-id 3.
   * product-set-id 4. product-id 5. product-category 6. product-display-name 7.
   * labels 8. bounding-poly The `image-uri`, `product-set-id`, `product-id`,
   * and `product-category` columns are required. All other columns are
   * optional. If the `ProductSet` or `Product` specified by the
   * `product-set-id` and `product-id` values does not exist, then the system
   * will create a new `ProductSet` or `Product` for the image. In this case,
   * the `product-display-name` column refers to display_name, the
   * `product-category` column refers to product_category, and the `labels`
   * column refers to product_labels. The `image-id` column is optional but must
   * be unique if provided. If it is empty, the system will automatically assign
   * a unique id to the image. The `product-display-name` column is optional. If
   * it is empty, the system sets the display_name field for the product to a
   * space (" "). You can update the `display_name` later by using the API. If a
   * `Product` with the specified `product-id` already exists, then the system
   * ignores the `product-display-name`, `product-category`, and `labels`
   * columns. The `labels` column (optional) is a line containing a list of
   * comma-separated key-value pairs, in the following format:
   * "key_1=value_1,key_2=value_2,...,key_n=value_n" The `bounding-poly` column
   * (optional) identifies one region of interest from the image in the same
   * manner as `CreateReferenceImage`. If you do not specify the `bounding-poly`
   * column, then the system will try to detect regions of interest
   * automatically. At most one `bounding-poly` column is allowed per line. If
   * the image contains multiple regions of interest, add a line to the CSV file
   * that includes the same product information, and the `bounding-poly` values
   * for each region of interest. The `bounding-poly` column must contain an
   * even number of comma-separated numbers, in the format
   * "p1_x,p1_y,p2_x,p2_y,...,pn_x,pn_y". Use non-negative integers for absolute
   * bounding polygons, and float values in [0, 1] for normalized bounding
   * polygons. The system will resize the image if the image resolution is too
   * large to process (larger than 20MP).
   */
  csvFileUri?: string;
}

/**
 * The input content for the `ImportProductSets` method.
 */
export interface ImportProductSetsInputConfig {
  /**
   * The Google Cloud Storage location for a csv file which preserves a list of
   * ImportProductSetRequests in each line.
   */
  gcsSource?: ImportProductSetsGcsSource;
}

/**
 * Request message for the `ImportProductSets` method.
 */
export interface ImportProductSetsRequest {
  /**
   * Required. The input content for the list of requests.
   */
  inputConfig?: ImportProductSetsInputConfig;
}

/**
 * Response message for the `ImportProductSets` method. This message is
 * returned by the google.longrunning.Operations.GetOperation method in the
 * returned google.longrunning.Operation.response field.
 */
export interface ImportProductSetsResponse {
  /**
   * The list of reference_images that are imported successfully.
   */
  referenceImages?: ReferenceImage[];
  /**
   * The rpc status for each ImportProductSet request, including both successes
   * and errors. The number of statuses here matches the number of lines in the
   * csv file, and statuses[i] stores the success or failure status of
   * processing the i-th line of the csv, starting from line 0.
   */
  statuses?: Status[];
}

/**
 * The desired input location and metadata.
 */
export interface InputConfig {
  /**
   * File content, represented as a stream of bytes. Note: As with all `bytes`
   * fields, protobuffers use a pure binary representation, whereas JSON
   * representations use base64. Currently, this field only works for
   * BatchAnnotateFiles requests. It does not work for AsyncBatchAnnotateFiles
   * requests.
   */
  content?: Uint8Array;
  /**
   * The Google Cloud Storage location to read the input from.
   */
  gcsSource?: GcsSource;
  /**
   * The type of the file. Currently only "application/pdf", "image/tiff" and
   * "image/gif" are supported. Wildcards are not supported.
   */
  mimeType?: string;
}

function serializeInputConfig(data: any): InputConfig {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeInputConfig(data: any): InputConfig {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * A product label represented as a key-value pair.
 */
export interface KeyValue {
  /**
   * The key of the label attached to the product. Cannot be empty and cannot
   * exceed 128 bytes.
   */
  key?: string;
  /**
   * The value of the label attached to the product. Cannot be empty and cannot
   * exceed 128 bytes.
   */
  value?: string;
}

/**
 * A face-specific landmark (for example, a face feature).
 */
export interface Landmark {
  /**
   * Face landmark position.
   */
  position?: Position;
  /**
   * Face landmark type.
   */
  type?:  | "UNKNOWN_LANDMARK" | "LEFT_EYE" | "RIGHT_EYE" | "LEFT_OF_LEFT_EYEBROW" | "RIGHT_OF_LEFT_EYEBROW" | "LEFT_OF_RIGHT_EYEBROW" | "RIGHT_OF_RIGHT_EYEBROW" | "MIDPOINT_BETWEEN_EYES" | "NOSE_TIP" | "UPPER_LIP" | "LOWER_LIP" | "MOUTH_LEFT" | "MOUTH_RIGHT" | "MOUTH_CENTER" | "NOSE_BOTTOM_RIGHT" | "NOSE_BOTTOM_LEFT" | "NOSE_BOTTOM_CENTER" | "LEFT_EYE_TOP_BOUNDARY" | "LEFT_EYE_RIGHT_CORNER" | "LEFT_EYE_BOTTOM_BOUNDARY" | "LEFT_EYE_LEFT_CORNER" | "RIGHT_EYE_TOP_BOUNDARY" | "RIGHT_EYE_RIGHT_CORNER" | "RIGHT_EYE_BOTTOM_BOUNDARY" | "RIGHT_EYE_LEFT_CORNER" | "LEFT_EYEBROW_UPPER_MIDPOINT" | "RIGHT_EYEBROW_UPPER_MIDPOINT" | "LEFT_EAR_TRAGION" | "RIGHT_EAR_TRAGION" | "LEFT_EYE_PUPIL" | "RIGHT_EYE_PUPIL" | "FOREHEAD_GLABELLA" | "CHIN_GNATHION" | "CHIN_LEFT_GONION" | "CHIN_RIGHT_GONION" | "LEFT_CHEEK_CENTER" | "RIGHT_CHEEK_CENTER";
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
 * Rectangle determined by min and max `LatLng` pairs.
 */
export interface LatLongRect {
  /**
   * Max lat/long pair.
   */
  maxLatLng?: LatLng;
  /**
   * Min lat/long pair.
   */
  minLatLng?: LatLng;
}

/**
 * The response message for Operations.ListOperations.
 */
export interface ListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: Operation[];
}

/**
 * Response message for the `ListProductSets` method.
 */
export interface ListProductSetsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * List of ProductSets.
   */
  productSets?: ProductSet[];
}

/**
 * Response message for the `ListProductsInProductSet` method.
 */
export interface ListProductsInProductSetResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The list of Products.
   */
  products?: Product[];
}

/**
 * Response message for the `ListProducts` method.
 */
export interface ListProductsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * List of products.
   */
  products?: Product[];
}

/**
 * Response message for the `ListReferenceImages` method.
 */
export interface ListReferenceImagesResponse {
  /**
   * The next_page_token returned from a previous List request, if any.
   */
  nextPageToken?: string;
  /**
   * The maximum number of items to return. Default 10, maximum 100.
   */
  pageSize?: number;
  /**
   * The list of reference images.
   */
  referenceImages?: ReferenceImage[];
}

/**
 * Set of detected objects with bounding boxes.
 */
export interface LocalizedObjectAnnotation {
  /**
   * Image region to which this object belongs. This must be populated.
   */
  boundingPoly?: BoundingPoly;
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * Object ID that should align with EntityAnnotation mid.
   */
  mid?: string;
  /**
   * Object name, expressed in its `language_code` language.
   */
  name?: string;
  /**
   * Score of the result. Range [0, 1].
   */
  score?: number;
}

/**
 * Detected entity location information.
 */
export interface LocationInfo {
  /**
   * lat/long location coordinates.
   */
  latLng?: LatLng;
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface NormalizedVertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
}

/**
 * Prediction for what the object in the bounding box is.
 */
export interface ObjectAnnotation {
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * Object ID that should align with EntityAnnotation mid.
   */
  mid?: string;
  /**
   * Object name, expressed in its `language_code` language.
   */
  name?: string;
  /**
   * Score of the result. Range [0, 1].
   */
  score?: number;
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface Operation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: Status;
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
 * Contains metadata for the BatchAnnotateImages operation.
 */
export interface OperationMetadata {
  /**
   * The time when the batch request was received.
   */
  createTime?: Date;
  /**
   * Current state of the batch operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "CREATED" | "RUNNING" | "DONE" | "CANCELLED";
  /**
   * The time when the operation result was last updated.
   */
  updateTime?: Date;
}

function serializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Additional options for Vision#operationsList.
 */
export interface OperationsListOptions {
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
 * The desired output location and metadata.
 */
export interface OutputConfig {
  /**
   * The max number of response protos to put into each output JSON file on
   * Google Cloud Storage. The valid range is [1, 100]. If not specified, the
   * default value is 20. For example, for one pdf file with 100 pages, 100
   * response protos will be generated. If `batch_size` = 20, then 5 json files
   * each containing 20 response protos will be written under the prefix
   * `gcs_destination`.`uri`. Currently, batch_size only applies to
   * GcsDestination, with potential future support for other output
   * configurations.
   */
  batchSize?: number;
  /**
   * The Google Cloud Storage location to write the output(s) to.
   */
  gcsDestination?: GcsDestination;
}

/**
 * Detected page from OCR.
 */
export interface Page {
  /**
   * List of blocks of text, images etc on this page.
   */
  blocks?: Block[];
  /**
   * Confidence of the OCR results on the page. Range [0, 1].
   */
  confidence?: number;
  /**
   * Page height. For PDFs the unit is points. For images (including TIFFs) the
   * unit is pixels.
   */
  height?: number;
  /**
   * Additional information detected on the page.
   */
  property?: TextProperty;
  /**
   * Page width. For PDFs the unit is points. For images (including TIFFs) the
   * unit is pixels.
   */
  width?: number;
}

/**
 * Structural unit of text representing a number of words in certain order.
 */
export interface Paragraph {
  /**
   * The bounding box for the paragraph. The vertices are in the order of
   * top-left, top-right, bottom-right, bottom-left. When a rotation of the
   * bounding box is detected the rotation is represented as around the top-left
   * corner as defined when the text is read in the 'natural' orientation. For
   * example: * when the text is horizontal it might look like: 0----1 | |
   * 3----2 * when it's rotated 180 degrees around the top-left corner it
   * becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: BoundingPoly;
  /**
   * Confidence of the OCR results for the paragraph. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the paragraph.
   */
  property?: TextProperty;
  /**
   * List of all words in this paragraph.
   */
  words?: Word[];
}

/**
 * A 3D position in the image, used primarily for Face detection landmarks. A
 * valid Position must have both x and y coordinates. The position coordinates
 * are in the same scale as the original image.
 */
export interface Position {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
  /**
   * Z coordinate (or depth).
   */
  z?: number;
}

/**
 * A Product contains ReferenceImages.
 */
export interface Product {
  /**
   * User-provided metadata to be stored with this product. Must be at most
   * 4096 characters long.
   */
  description?: string;
  /**
   * The user-provided name for this Product. Must not be empty. Must be at
   * most 4096 characters long.
   */
  displayName?: string;
  /**
   * The resource name of the product. Format is:
   * `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`. This field is
   * ignored when creating a product.
   */
  name?: string;
  /**
   * Immutable. The category for the product identified by the reference image.
   * This should be one of "homegoods-v2", "apparel-v2", "toys-v2",
   * "packagedgoods-v1" or "general-v1". The legacy categories "homegoods",
   * "apparel", and "toys" are still supported, but these should not be used for
   * new products.
   */
  productCategory?: string;
  /**
   * Key-value pairs that can be attached to a product. At query time,
   * constraints can be specified based on the product_labels. Note that integer
   * values can be provided as strings, e.g. "1199". Only strings with integer
   * values can match a range-based restriction which is to be supported soon.
   * Multiple values can be assigned to the same key. One product may have up to
   * 500 product_labels. Notice that the total number of distinct product_labels
   * over all products in one ProductSet cannot exceed 1M, otherwise the product
   * search pipeline will refuse to work for that ProductSet.
   */
  productLabels?: KeyValue[];
}

/**
 * Parameters for a product search request.
 */
export interface ProductSearchParams {
  /**
   * The bounding polygon around the area of interest in the image. If it is
   * not specified, system discretion will be applied.
   */
  boundingPoly?: BoundingPoly;
  /**
   * The filtering expression. This can be used to restrict search results
   * based on Product labels. We currently support an AND of OR of key-value
   * expressions, where each expression within an OR must have the same key. An
   * '=' should be used to connect the key and value. For example, "(color = red
   * OR color = blue) AND brand = Google" is acceptable, but "(color = red OR
   * brand = Google)" is not acceptable. "color: red" is not acceptable because
   * it uses a ':' instead of an '='.
   */
  filter?: string;
  /**
   * The list of product categories to search in. Currently, we only consider
   * the first category, and either "homegoods-v2", "apparel-v2", "toys-v2",
   * "packagedgoods-v1", or "general-v1" should be specified. The legacy
   * categories "homegoods", "apparel", and "toys" are still supported but will
   * be deprecated. For new products, please use "homegoods-v2", "apparel-v2",
   * or "toys-v2" for better product search accuracy. It is recommended to
   * migrate existing products to these categories as well.
   */
  productCategories?: string[];
  /**
   * The resource name of a ProductSet to be searched for similar images.
   * Format is:
   * `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID`.
   */
  productSet?: string;
}

/**
 * Results for a product search request.
 */
export interface ProductSearchResults {
  /**
   * Timestamp of the index which provided these results. Products added to the
   * product set and products removed from the product set after this time are
   * not reflected in the current results.
   */
  indexTime?: Date;
  /**
   * List of results grouped by products detected in the query image. Each
   * entry corresponds to one bounding polygon in the query image, and contains
   * the matching products specific to that region. There may be duplicate
   * product matches in the union of all the per-product results.
   */
  productGroupedResults?: GroupedResult[];
  /**
   * List of results, one for each product match.
   */
  results?: Result[];
}

function serializeProductSearchResults(data: any): ProductSearchResults {
  return {
    ...data,
    indexTime: data["indexTime"] !== undefined ? data["indexTime"].toISOString() : undefined,
  };
}

function deserializeProductSearchResults(data: any): ProductSearchResults {
  return {
    ...data,
    indexTime: data["indexTime"] !== undefined ? new Date(data["indexTime"]) : undefined,
  };
}

/**
 * A ProductSet contains Products. A ProductSet can contain a maximum of 1
 * million reference images. If the limit is exceeded, periodic indexing will
 * fail.
 */
export interface ProductSet {
  /**
   * The user-provided name for this ProductSet. Must not be empty. Must be at
   * most 4096 characters long.
   */
  displayName?: string;
  /**
   * Output only. If there was an error with indexing the product set, the
   * field is populated. This field is ignored when creating a ProductSet.
   */
  readonly indexError?: Status;
  /**
   * Output only. The time at which this ProductSet was last indexed. Query
   * results will reflect all updates before this time. If this ProductSet has
   * never been indexed, this timestamp is the default value
   * "1970-01-01T00:00:00Z". This field is ignored when creating a ProductSet.
   */
  readonly indexTime?: Date;
  /**
   * The resource name of the ProductSet. Format is:
   * `projects/PROJECT_ID/locations/LOC_ID/productSets/PRODUCT_SET_ID`. This
   * field is ignored when creating a ProductSet.
   */
  name?: string;
}

/**
 * Config to control which ProductSet contains the Products to be deleted.
 */
export interface ProductSetPurgeConfig {
  /**
   * The ProductSet that contains the Products to delete. If a Product is a
   * member of product_set_id in addition to other ProductSets, the Product will
   * still be deleted.
   */
  productSetId?: string;
}

/**
 * Additional options for Vision#projectsLocationsProductsCreate.
 */
export interface ProjectsLocationsProductsCreateOptions {
  /**
   * A user-supplied resource id for this Product. If set, the server will
   * attempt to use this value as the resource id. If it is already in use, an
   * error is returned with code ALREADY_EXISTS. Must be at most 128 characters
   * long. It cannot contain the character `/`.
   */
  productId?: string;
}

/**
 * Additional options for Vision#projectsLocationsProductSetsCreate.
 */
export interface ProjectsLocationsProductSetsCreateOptions {
  /**
   * A user-supplied resource id for this ProductSet. If set, the server will
   * attempt to use this value as the resource id. If it is already in use, an
   * error is returned with code ALREADY_EXISTS. Must be at most 128 characters
   * long. It cannot contain the character `/`.
   */
  productSetId?: string;
}

/**
 * Additional options for Vision#projectsLocationsProductSetsList.
 */
export interface ProjectsLocationsProductSetsListOptions {
  /**
   * The maximum number of items to return. Default 10, maximum 100.
   */
  pageSize?: number;
  /**
   * The next_page_token returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for Vision#projectsLocationsProductSetsPatch.
 */
export interface ProjectsLocationsProductSetsPatchOptions {
  /**
   * The FieldMask that specifies which fields to update. If update_mask isn't
   * specified, all mutable fields are to be updated. Valid mask path is
   * `display_name`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProductSetsPatchOptions(data: any): ProjectsLocationsProductSetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsProductSetsPatchOptions(data: any): ProjectsLocationsProductSetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Vision#projectsLocationsProductSetsProductsList.
 */
export interface ProjectsLocationsProductSetsProductsListOptions {
  /**
   * The maximum number of items to return. Default 10, maximum 100.
   */
  pageSize?: number;
  /**
   * The next_page_token returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for Vision#projectsLocationsProductsList.
 */
export interface ProjectsLocationsProductsListOptions {
  /**
   * The maximum number of items to return. Default 10, maximum 100.
   */
  pageSize?: number;
  /**
   * The next_page_token returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for Vision#projectsLocationsProductsPatch.
 */
export interface ProjectsLocationsProductsPatchOptions {
  /**
   * The FieldMask that specifies which fields to update. If update_mask isn't
   * specified, all mutable fields are to be updated. Valid mask paths include
   * `product_labels`, `display_name`, and `description`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProductsPatchOptions(data: any): ProjectsLocationsProductsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsProductsPatchOptions(data: any): ProjectsLocationsProductsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Vision#projectsLocationsProductsReferenceImagesCreate.
 */
export interface ProjectsLocationsProductsReferenceImagesCreateOptions {
  /**
   * A user-supplied resource id for the ReferenceImage to be added. If set,
   * the server will attempt to use this value as the resource id. If it is
   * already in use, an error is returned with code ALREADY_EXISTS. Must be at
   * most 128 characters long. It cannot contain the character `/`.
   */
  referenceImageId?: string;
}

/**
 * Additional options for Vision#projectsLocationsProductsReferenceImagesList.
 */
export interface ProjectsLocationsProductsReferenceImagesListOptions {
  /**
   * The maximum number of items to return. Default 10, maximum 100.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results to be returned. This is the value of
   * `nextPageToken` returned in a previous reference image list request.
   * Defaults to the first page if not specified.
   */
  pageToken?: string;
}

/**
 * A `Property` consists of a user-supplied name/value pair.
 */
export interface Property {
  /**
   * Name of the property.
   */
  name?: string;
  /**
   * Value of numeric properties.
   */
  uint64Value?: bigint;
  /**
   * Value of the property.
   */
  value?: string;
}

function serializeProperty(data: any): Property {
  return {
    ...data,
    uint64Value: data["uint64Value"] !== undefined ? String(data["uint64Value"]) : undefined,
  };
}

function deserializeProperty(data: any): Property {
  return {
    ...data,
    uint64Value: data["uint64Value"] !== undefined ? BigInt(data["uint64Value"]) : undefined,
  };
}

/**
 * Request message for the `PurgeProducts` method.
 */
export interface PurgeProductsRequest {
  /**
   * If delete_orphan_products is true, all Products that are not in any
   * ProductSet will be deleted.
   */
  deleteOrphanProducts?: boolean;
  /**
   * The default value is false. Override this value to true to actually
   * perform the purge.
   */
  force?: boolean;
  /**
   * Specify which ProductSet contains the Products to be deleted.
   */
  productSetPurgeConfig?: ProductSetPurgeConfig;
}

/**
 * A `ReferenceImage` represents a product image and its associated metadata,
 * such as bounding boxes.
 */
export interface ReferenceImage {
  /**
   * Optional. Bounding polygons around the areas of interest in the reference
   * image. If this field is empty, the system will try to detect regions of
   * interest. At most 10 bounding polygons will be used. The provided shape is
   * converted into a non-rotated rectangle. Once converted, the small edge of
   * the rectangle must be greater than or equal to 300 pixels. The aspect ratio
   * must be 1:4 or less (i.e. 1:3 is ok; 1:5 is not).
   */
  boundingPolys?: BoundingPoly[];
  /**
   * The resource name of the reference image. Format is:
   * `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID/referenceImages/IMAGE_ID`.
   * This field is ignored when creating a reference image.
   */
  name?: string;
  /**
   * Required. The Google Cloud Storage URI of the reference image. The URI
   * must start with `gs://`.
   */
  uri?: string;
}

/**
 * Request message for the `RemoveProductFromProductSet` method.
 */
export interface RemoveProductFromProductSetRequest {
  /**
   * Required. The resource name for the Product to be removed from this
   * ProductSet. Format is:
   * `projects/PROJECT_ID/locations/LOC_ID/products/PRODUCT_ID`
   */
  product?: string;
}

/**
 * Information about a product.
 */
export interface Result {
  /**
   * The resource name of the image from the product that is the closest match
   * to the query.
   */
  image?: string;
  /**
   * The Product.
   */
  product?: Product;
  /**
   * A confidence level on the match, ranging from 0 (no confidence) to 1 (full
   * confidence).
   */
  score?: number;
}

/**
 * Set of features pertaining to the image, computed by computer vision methods
 * over safe-search verticals (for example, adult, spoof, medical, violence).
 */
export interface SafeSearchAnnotation {
  /**
   * Represents the adult content likelihood for the image. Adult content may
   * contain elements such as nudity, pornographic images or cartoons, or sexual
   * activities.
   */
  adult?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that this is a medical image.
   */
  medical?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that the request image contains racy content. Racy content may
   * include (but is not limited to) skimpy or sheer clothing, strategically
   * covered nudity, lewd or provocative poses, or close-ups of sensitive body
   * areas.
   */
  racy?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Spoof likelihood. The likelihood that an modification was made to the
   * image's canonical version to make it appear funny or offensive.
   */
  spoof?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Likelihood that this image contains violent content.
   */
  violence?:  | "UNKNOWN" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
}

/**
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
 */
export interface Status {
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
 * A single symbol representation.
 */
export interface Symbol {
  /**
   * The bounding box for the symbol. The vertices are in the order of
   * top-left, top-right, bottom-right, bottom-left. When a rotation of the
   * bounding box is detected the rotation is represented as around the top-left
   * corner as defined when the text is read in the 'natural' orientation. For
   * example: * when the text is horizontal it might look like: 0----1 | |
   * 3----2 * when it's rotated 180 degrees around the top-left corner it
   * becomes: 2----3 | | 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: BoundingPoly;
  /**
   * Confidence of the OCR results for the symbol. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the symbol.
   */
  property?: TextProperty;
  /**
   * The actual UTF-8 representation of the symbol.
   */
  text?: string;
}

/**
 * TextAnnotation contains a structured representation of OCR extracted text.
 * The hierarchy of an OCR extracted text structure is like this: TextAnnotation
 * -> Page -> Block -> Paragraph -> Word -> Symbol Each structural component,
 * starting from Page, may further have their own properties. Properties
 * describe detected languages, breaks etc.. Please refer to the
 * TextAnnotation.TextProperty message definition below for more detail.
 */
export interface TextAnnotation {
  /**
   * List of pages detected by OCR.
   */
  pages?: Page[];
  /**
   * UTF-8 text detected on the pages.
   */
  text?: string;
}

/**
 * Parameters for text detections. This is used to control TEXT_DETECTION and
 * DOCUMENT_TEXT_DETECTION features.
 */
export interface TextDetectionParams {
  /**
   * A list of advanced OCR options to fine-tune OCR behavior.
   */
  advancedOcrOptions?: string[];
  /**
   * By default, Cloud Vision API only includes confidence score for
   * DOCUMENT_TEXT_DETECTION result. Set the flag to true to include confidence
   * score for TEXT_DETECTION as well.
   */
  enableTextDetectionConfidenceScore?: boolean;
}

/**
 * Additional information detected on the structural component.
 */
export interface TextProperty {
  /**
   * Detected start or end of a text segment.
   */
  detectedBreak?: DetectedBreak;
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: DetectedLanguage[];
}

/**
 * A vertex represents a 2D point in the image. NOTE: the vertex coordinates
 * are in the same scale as the original image.
 */
export interface Vertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
}

/**
 * Relevant information for the image from the Internet.
 */
export interface WebDetection {
  /**
   * The service's best guess as to the topic of the request image. Inferred
   * from similar images on the open web.
   */
  bestGuessLabels?: WebLabel[];
  /**
   * Fully matching images from the Internet. Can include resized copies of the
   * query image.
   */
  fullMatchingImages?: WebImage[];
  /**
   * Web pages containing the matching images from the Internet.
   */
  pagesWithMatchingImages?: WebPage[];
  /**
   * Partial matching images from the Internet. Those images are similar enough
   * to share some key-point features. For example an original image will likely
   * have partial matching for its crops.
   */
  partialMatchingImages?: WebImage[];
  /**
   * The visually similar image results.
   */
  visuallySimilarImages?: WebImage[];
  /**
   * Deduced entities from similar images on the Internet.
   */
  webEntities?: WebEntity[];
}

/**
 * Parameters for web detection request.
 */
export interface WebDetectionParams {
  /**
   * Whether to include results derived from the geo information in the image.
   */
  includeGeoResults?: boolean;
}

/**
 * Entity deduced from similar images on the Internet.
 */
export interface WebEntity {
  /**
   * Canonical description of the entity, in English.
   */
  description?: string;
  /**
   * Opaque entity ID.
   */
  entityId?: string;
  /**
   * Overall relevancy score for the entity. Not normalized and not comparable
   * across different image queries.
   */
  score?: number;
}

/**
 * Metadata for online images.
 */
export interface WebImage {
  /**
   * (Deprecated) Overall relevancy score for the image.
   */
  score?: number;
  /**
   * The result image URL.
   */
  url?: string;
}

/**
 * Label to provide extra metadata for the web detection.
 */
export interface WebLabel {
  /**
   * Label for extra metadata.
   */
  label?: string;
  /**
   * The BCP-47 language code for `label`, such as "en-US" or "sr-Latn". For
   * more information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

/**
 * Metadata for web pages.
 */
export interface WebPage {
  /**
   * Fully matching images on the page. Can include resized copies of the query
   * image.
   */
  fullMatchingImages?: WebImage[];
  /**
   * Title for the web page, may contain HTML markups.
   */
  pageTitle?: string;
  /**
   * Partial matching images on the page. Those images are similar enough to
   * share some key-point features. For example an original image will likely
   * have partial matching for its crops.
   */
  partialMatchingImages?: WebImage[];
  /**
   * (Deprecated) Overall relevancy score for the web page.
   */
  score?: number;
  /**
   * The result web page URL.
   */
  url?: string;
}

/**
 * A word representation.
 */
export interface Word {
  /**
   * The bounding box for the word. The vertices are in the order of top-left,
   * top-right, bottom-right, bottom-left. When a rotation of the bounding box
   * is detected the rotation is represented as around the top-left corner as
   * defined when the text is read in the 'natural' orientation. For example: *
   * when the text is horizontal it might look like: 0----1 | | 3----2 * when
   * it's rotated 180 degrees around the top-left corner it becomes: 2----3 | |
   * 1----0 and the vertex order will still be (0, 1, 2, 3).
   */
  boundingBox?: BoundingPoly;
  /**
   * Confidence of the OCR results for the word. Range [0, 1].
   */
  confidence?: number;
  /**
   * Additional information detected for the word.
   */
  property?: TextProperty;
  /**
   * List of symbols in the word. The order of the symbols follows the natural
   * reading order.
   */
  symbols?: Symbol[];
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
