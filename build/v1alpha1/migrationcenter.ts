// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Migration Center API Client for Deno
 * ====================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/migration-center
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class MigrationCenter {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://migrationcenter.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Aggregates the requested fields based on provided function.
   *
   * @param parent Required. Parent value for `AggregateAssetsValuesRequest`.
   */
  async projectsLocationsAssetsAggregateValues(parent: string, req: AggregateAssetsValuesRequest): Promise<AggregateAssetsValuesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/assets:aggregateValues`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAggregateAssetsValuesResponse(data);
  }

  /**
   * Updates the parameters of a list of assets.
   *
   * @param parent Required. Parent value for batch asset update.
   */
  async projectsLocationsAssetsBatchUpdate(parent: string, req: BatchUpdateAssetsRequest): Promise<BatchUpdateAssetsResponse> {
    req = serializeBatchUpdateAssetsRequest(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/assets:batchUpdate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchUpdateAssetsResponse;
  }

  /**
   * Creates a new asset in a given project and location. Deprecated: Use
   * ReportAssetFrames instead.
   *
   * @param parent Required. Value for parent.
   */
  async projectsLocationsAssetsCreate(parent: string, req: Asset, opts: ProjectsLocationsAssetsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/assets`);
    if (opts.assetId !== undefined) {
      url.searchParams.append("assetId", String(opts.assetId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes an asset.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsAssetsDelete(name: string, opts: ProjectsLocationsAssetsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the details of an asset.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsAssetsGet(name: string, opts: ProjectsLocationsAssetsGetOptions = {}): Promise<Asset> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Asset;
  }

  /**
   * Lists all the assets in a given project and location.
   *
   * @param parent Required. Parent value for `ListAssetsRequest`.
   */
  async projectsLocationsAssetsList(parent: string, opts: ProjectsLocationsAssetsListOptions = {}): Promise<ListAssetsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/assets`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListAssetsResponse;
  }

  /**
   * Updates the parameters of an asset.
   *
   * @param name Output only. The full name of the asset.
   */
  async projectsLocationsAssetsPatch(name: string, req: Asset, opts: ProjectsLocationsAssetsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsAssetsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
    return data as Operation;
  }

  /**
   * Reports a set of frames.
   *
   * @param parent Required. Parent of the resource.
   */
  async projectsLocationsAssetsReportAssetFrames(parent: string, req: Frames, opts: ProjectsLocationsAssetsReportAssetFramesOptions = {}): Promise<ReportAssetFramesResponse> {
    req = serializeFrames(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/assets:reportAssetFrames`);
    if (opts.source !== undefined) {
      url.searchParams.append("source", String(opts.source));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReportAssetFramesResponse;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Location;
  }

  /**
   * Creates an import job.
   *
   * @param parent Required. Value for parent.
   */
  async projectsLocationsImportJobsCreate(parent: string, req: ImportJob, opts: ProjectsLocationsImportJobsCreateOptions = {}): Promise<Operation> {
    req = serializeImportJob(req);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/importJobs`);
    if (opts.importJobId !== undefined) {
      url.searchParams.append("importJobId", String(opts.importJobId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes an import job.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsImportJobsDelete(name: string, opts: ProjectsLocationsImportJobsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the details of an import job.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsImportJobsGet(name: string, opts: ProjectsLocationsImportJobsGetOptions = {}): Promise<ImportJob> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeImportJob(data);
  }

  /**
   * Lists all import jobs.
   *
   * @param parent Required. Parent value for `ListImportJobsRequest`.
   */
  async projectsLocationsImportJobsList(parent: string, opts: ProjectsLocationsImportJobsListOptions = {}): Promise<ListImportJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/importJobs`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListImportJobsResponse(data);
  }

  /**
   * Updates an import job.
   *
   * @param name Output only. The full name of the import job.
   */
  async projectsLocationsImportJobsPatch(name: string, req: ImportJob, opts: ProjectsLocationsImportJobsPatchOptions = {}): Promise<Operation> {
    req = serializeImportJob(req);
    opts = serializeProjectsLocationsImportJobsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
    return data as Operation;
  }

  /**
   * Runs an import job.
   *
   * @param name Required. The name of the import job to run.
   */
  async projectsLocationsImportJobsRun(name: string, req: RunImportJobRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:run`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Validates an import job.
   *
   * @param name Required. The name of the import job to validate.
   */
  async projectsLocationsImportJobsValidate(name: string, req: ValidateImportJobRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:validate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async projectsLocationsList(name: string, opts: ProjectsLocationsListOptions = {}): Promise<ListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }/locations`);
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
    return data as ListLocationsResponse;
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
  async projectsLocationsOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }:cancel`);
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
  async projectsLocationsOperationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
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
  async projectsLocationsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
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
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }/operations`);
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
   * Creates a new source in a given project and location.
   *
   * @param parent Required. Value for parent.
   */
  async projectsLocationsSourcesCreate(parent: string, req: Source, opts: ProjectsLocationsSourcesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/sources`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.sourceId !== undefined) {
      url.searchParams.append("sourceId", String(opts.sourceId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a source.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsSourcesDelete(name: string, opts: ProjectsLocationsSourcesDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the details of a source.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsSourcesGet(name: string): Promise<Source> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Source;
  }

  /**
   * Lists all the sources in a given project and location.
   *
   * @param parent Required. Parent value for `ListSourcesRequest`.
   */
  async projectsLocationsSourcesList(parent: string, opts: ProjectsLocationsSourcesListOptions = {}): Promise<ListSourcesResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/sources`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
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
    return data as ListSourcesResponse;
  }

  /**
   * Updates the parameters of a source.
   *
   * @param name Output only. The full name of the source.
   */
  async projectsLocationsSourcesPatch(name: string, req: Source, opts: ProjectsLocationsSourcesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsSourcesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
    return data as Operation;
  }
}

/**
 * A request to aggregate one or more values.
 */
export interface AggregateAssetsValuesRequest {
  /**
   * Array of aggregations to perform. Up to 25 aggregations can be defined.
   */
  aggregations?: Aggregation[];
  /**
   * The aggregation will be performed on assets that match the provided
   * filter.
   */
  filter?: string;
}

/**
 * A response to a request to aggregated assets values.
 */
export interface AggregateAssetsValuesResponse {
  /**
   * The aggregation results.
   */
  results?: AggregationResult[];
}

function serializeAggregateAssetsValuesResponse(data: any): AggregateAssetsValuesResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeAggregationResult(item))) : undefined,
  };
}

function deserializeAggregateAssetsValuesResponse(data: any): AggregateAssetsValuesResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeAggregationResult(item))) : undefined,
  };
}

/**
 * Message describing an aggregation. The message includes the aggregation
 * type, parameters, and the field on which to perform the aggregation.
 */
export interface Aggregation {
  /**
   * Count the number of matching objects.
   */
  count?: AggregationCount;
  /**
   * The name of the field on which to aggregate.
   */
  field?: string;
  /**
   * Creates a frequency distribution of all field values.
   */
  frequency?: AggregationFrequency;
  /**
   * Creates a bucketed histogram of field values.
   */
  histogram?: AggregationHistogram;
  /**
   * Sum over a numeric field.
   */
  sum?: AggregationSum;
}

/**
 * Object count.
 */
export interface AggregationCount {
}

/**
 * Frequency distribution of all field values.
 */
export interface AggregationFrequency {
}

/**
 * Histogram of bucketed assets counts by field value.
 */
export interface AggregationHistogram {
  /**
   * Lower bounds of buckets. The response will contain `n+1` buckets for `n`
   * bounds. The first bucket will count all assets for which the field value is
   * smaller than the first bound. Subsequent buckets will count assets for
   * which the field value is greater or equal to a lower bound and smaller than
   * the next one. The last bucket will count assets for which the field value
   * is greater or equal to the final lower bound. You can define up to 20 lower
   * bounds.
   */
  lowerBounds?: number[];
}

/**
 * Message describing a result of an aggregation.
 */
export interface AggregationResult {
  count?: AggregationResultCount;
  field?: string;
  frequency?: AggregationResultFrequency;
  histogram?: AggregationResultHistogram;
  sum?: AggregationResultSum;
}

function serializeAggregationResult(data: any): AggregationResult {
  return {
    ...data,
    count: data["count"] !== undefined ? serializeAggregationResultCount(data["count"]) : undefined,
    frequency: data["frequency"] !== undefined ? serializeAggregationResultFrequency(data["frequency"]) : undefined,
    histogram: data["histogram"] !== undefined ? serializeAggregationResultHistogram(data["histogram"]) : undefined,
  };
}

function deserializeAggregationResult(data: any): AggregationResult {
  return {
    ...data,
    count: data["count"] !== undefined ? deserializeAggregationResultCount(data["count"]) : undefined,
    frequency: data["frequency"] !== undefined ? deserializeAggregationResultFrequency(data["frequency"]) : undefined,
    histogram: data["histogram"] !== undefined ? deserializeAggregationResultHistogram(data["histogram"]) : undefined,
  };
}

/**
 * The result of a count aggregation.
 */
export interface AggregationResultCount {
  value?: bigint;
}

function serializeAggregationResultCount(data: any): AggregationResultCount {
  return {
    ...data,
    value: data["value"] !== undefined ? String(data["value"]) : undefined,
  };
}

function deserializeAggregationResultCount(data: any): AggregationResultCount {
  return {
    ...data,
    value: data["value"] !== undefined ? BigInt(data["value"]) : undefined,
  };
}

/**
 * The result of a frequency distribution aggregation.
 */
export interface AggregationResultFrequency {
  values?: {
    [key: string]: bigint
  };
}

function serializeAggregationResultFrequency(data: any): AggregationResultFrequency {
  return {
    ...data,
    values: data["values"] !== undefined ? Object.fromEntries(Object.entries(data["values"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
  };
}

function deserializeAggregationResultFrequency(data: any): AggregationResultFrequency {
  return {
    ...data,
    values: data["values"] !== undefined ? Object.fromEntries(Object.entries(data["values"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
  };
}

/**
 * The result of a bucketed histogram aggregation.
 */
export interface AggregationResultHistogram {
  /**
   * Buckets in the histogram. There will be `n+1` buckets matching `n` lower
   * bounds in the request. The first bucket will be from -infinity to the first
   * bound. Subsequent buckets will be between one bound and the next. The final
   * bucket will be from the final bound to infinity.
   */
  buckets?: AggregationResultHistogramBucket[];
}

function serializeAggregationResultHistogram(data: any): AggregationResultHistogram {
  return {
    ...data,
    buckets: data["buckets"] !== undefined ? data["buckets"].map((item: any) => (serializeAggregationResultHistogramBucket(item))) : undefined,
  };
}

function deserializeAggregationResultHistogram(data: any): AggregationResultHistogram {
  return {
    ...data,
    buckets: data["buckets"] !== undefined ? data["buckets"].map((item: any) => (deserializeAggregationResultHistogramBucket(item))) : undefined,
  };
}

/**
 * A histogram bucket with a lower and upper bound, and a count of items with a
 * field value between those bounds. The lower bound is inclusive and the upper
 * bound is exclusive. Lower bound may be -infinity and upper bound may be
 * infinity.
 */
export interface AggregationResultHistogramBucket {
  /**
   * Count of items in the bucket.
   */
  count?: bigint;
  /**
   * Lower bound - inclusive.
   */
  lowerBound?: number;
  /**
   * Upper bound - exclusive.
   */
  upperBound?: number;
}

function serializeAggregationResultHistogramBucket(data: any): AggregationResultHistogramBucket {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeAggregationResultHistogramBucket(data: any): AggregationResultHistogramBucket {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * The result of a sum aggregation.
 */
export interface AggregationResultSum {
  value?: number;
}

/**
 * Sum of field values.
 */
export interface AggregationSum {
}

/**
 * An asset represents a resource in your environment. Asset types include
 * virtual machines and databases.
 */
export interface Asset {
  /**
   * Generic asset attributes.
   */
  attributes?: {
    [key: string]: string
  };
  /**
   * Output only. The timestamp when the asset was created.
   */
  readonly createTime?: Date;
  /**
   * Labels as key value pairs.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The full name of the asset.
   */
  readonly name?: string;
  /**
   * Output only. The list of sources contributing to the asset.
   */
  readonly sources?: string[];
  /**
   * Output only. The timestamp when the asset was last updated.
   */
  readonly updateTime?: Date;
  /**
   * Output only. Asset information specific for virtual machines.
   */
  readonly virtualMachineDetails?: VirtualMachineDetails;
}

/**
 * Contains data reported from an inventory source on an asset.
 */
export interface AssetFrame {
  /**
   * Generic asset attributes.
   */
  attributes?: {
    [key: string]: string
  };
  /**
   * Labels as key value pairs.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Asset performance data samples.
   */
  performanceSamples?: PerformanceSample[];
  /**
   * The time the data was reported.
   */
  reportTime?: Date;
  /**
   * Optional. Trace token is optionally provided to assist with debugging and
   * traceability.
   */
  traceToken?: string;
  /**
   * Asset information specific for virtual machines.
   */
  virtualMachineDetails?: VirtualMachineDetails;
}

function serializeAssetFrame(data: any): AssetFrame {
  return {
    ...data,
    performanceSamples: data["performanceSamples"] !== undefined ? data["performanceSamples"].map((item: any) => (serializePerformanceSample(item))) : undefined,
    reportTime: data["reportTime"] !== undefined ? data["reportTime"].toISOString() : undefined,
    virtualMachineDetails: data["virtualMachineDetails"] !== undefined ? serializeVirtualMachineDetails(data["virtualMachineDetails"]) : undefined,
  };
}

function deserializeAssetFrame(data: any): AssetFrame {
  return {
    ...data,
    performanceSamples: data["performanceSamples"] !== undefined ? data["performanceSamples"].map((item: any) => (deserializePerformanceSample(item))) : undefined,
    reportTime: data["reportTime"] !== undefined ? new Date(data["reportTime"]) : undefined,
    virtualMachineDetails: data["virtualMachineDetails"] !== undefined ? deserializeVirtualMachineDetails(data["virtualMachineDetails"]) : undefined,
  };
}

/**
 * A request to update a list of assets.
 */
export interface BatchUpdateAssetsRequest {
  /**
   * Required. The request message specifying the resources to update. A
   * maximum of 1000 assets can be modified in a batch.
   */
  requests?: UpdateAssetRequest[];
}

function serializeBatchUpdateAssetsRequest(data: any): BatchUpdateAssetsRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeUpdateAssetRequest(item))) : undefined,
  };
}

function deserializeBatchUpdateAssetsRequest(data: any): BatchUpdateAssetsRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeUpdateAssetRequest(item))) : undefined,
  };
}

/**
 * Response for updating a list of assets.
 */
export interface BatchUpdateAssetsResponse {
  /**
   * Update asset content. The content only includes values after field mask
   * being applied.
   */
  assets?: Asset[];
}

/**
 * Details about the bios.
 */
export interface BiosDetails {
  /**
   * Bios manufacturer.
   */
  biosManufacturer?: string;
  /**
   * Bios name.
   */
  biosName?: string;
  /**
   * Bios release date.
   */
  biosReleaseDate?: string;
  /**
   * Bios version.
   */
  biosVersion?: string;
  /**
   * SMBios UUID.
   */
  smbiosUuid?: string;
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * CPU usage sample.
 */
export interface CpuUsageSample {
  /**
   * Percentage of total CPU capacity utilized. Must be in the interval [0,
   * 100]. On most systems can be calculated using 100 - idle percentage.
   */
  utilizedPercentage?: number;
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
export interface Date {
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
 * Represents civil time (or occasionally physical time). This type can
 * represent a civil time in one of a few possible ways: * When utc_offset is
 * set and time_zone is unset: a civil time on a calendar day with a particular
 * offset from UTC. * When time_zone is set and utc_offset is unset: a civil
 * time on a calendar day in a particular time zone. * When neither time_zone
 * nor utc_offset is set: a civil time on a calendar day in local time. The date
 * is relative to the Proleptic Gregorian Calendar. If year, month, or day are
 * 0, the DateTime is considered not to have a specific year, month, or day
 * respectively. This type may also be used to represent a physical time if all
 * the date and time fields are set and either case of the `time_offset` oneof
 * is set. Consider using `Timestamp` message for physical time instead. If your
 * use case also would like to store the user's timezone, that can be done in
 * another field. This type is more flexible than some applications may want.
 * Make sure to document and validate your application's limitations.
 */
export interface DateTime {
  /**
   * Optional. Day of month. Must be from 1 to 31 and valid for the year and
   * month, or 0 if specifying a datetime without a day.
   */
  day?: number;
  /**
   * Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults
   * to 0 (midnight). An API may choose to allow the value "24:00:00" for
   * scenarios like business closing time.
   */
  hours?: number;
  /**
   * Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0.
   */
  minutes?: number;
  /**
   * Optional. Month of year. Must be from 1 to 12, or 0 if specifying a
   * datetime without a month.
   */
  month?: number;
  /**
   * Optional. Fractions of seconds in nanoseconds. Must be from 0 to
   * 999,999,999, defaults to 0.
   */
  nanos?: number;
  /**
   * Optional. Seconds of minutes of the time. Must normally be from 0 to 59,
   * defaults to 0. An API may allow the value 60 if it allows leap-seconds.
   */
  seconds?: number;
  /**
   * Time zone.
   */
  timeZone?: TimeZone;
  /**
   * UTC offset. Must be whole seconds, between -18 hours and +18 hours. For
   * example, a UTC offset of -4:00 would be represented as { seconds: -14400 }.
   */
  utcOffset?: number /* Duration */;
  /**
   * Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a
   * datetime without a year.
   */
  year?: number;
}

function serializeDateTime(data: any): DateTime {
  return {
    ...data,
    utcOffset: data["utcOffset"] !== undefined ? data["utcOffset"] : undefined,
  };
}

function deserializeDateTime(data: any): DateTime {
  return {
    ...data,
    utcOffset: data["utcOffset"] !== undefined ? data["utcOffset"] : undefined,
  };
}

/**
 * Single disk entry.
 */
export interface DiskEntry {
  /**
   * Disk label.
   */
  diskLabel?: string;
  /**
   * Disk label type (e.g. BIOS/GPT)
   */
  diskLabelType?: string;
  /**
   * Disk hardware address (e.g. 0:1 for SCSI).
   */
  hwAddress?: string;
  /**
   * Disks interface type (e.g. SATA/SCSI)
   */
  interfaceType?: string;
  /**
   * Partition layout.
   */
  partitions?: DiskPartitionList;
  /**
   * Disk status (e.g. online).
   */
  status?: string;
  /**
   * Disk Capacity (required).
   */
  totalCapacityBytes?: bigint;
  /**
   * Disk Free Space.
   */
  totalFreeBytes?: bigint;
  /**
   * Optional. Optional disk VMware details.
   */
  vmwareConfig?: VmwareDiskConfig;
}

function serializeDiskEntry(data: any): DiskEntry {
  return {
    ...data,
    partitions: data["partitions"] !== undefined ? serializeDiskPartitionList(data["partitions"]) : undefined,
    totalCapacityBytes: data["totalCapacityBytes"] !== undefined ? String(data["totalCapacityBytes"]) : undefined,
    totalFreeBytes: data["totalFreeBytes"] !== undefined ? String(data["totalFreeBytes"]) : undefined,
  };
}

function deserializeDiskEntry(data: any): DiskEntry {
  return {
    ...data,
    partitions: data["partitions"] !== undefined ? deserializeDiskPartitionList(data["partitions"]) : undefined,
    totalCapacityBytes: data["totalCapacityBytes"] !== undefined ? BigInt(data["totalCapacityBytes"]) : undefined,
    totalFreeBytes: data["totalFreeBytes"] !== undefined ? BigInt(data["totalFreeBytes"]) : undefined,
  };
}

/**
 * VM disks.
 */
export interface DiskEntryList {
  /**
   * Disk entries.
   */
  entries?: DiskEntry[];
}

function serializeDiskEntryList(data: any): DiskEntryList {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeDiskEntry(item))) : undefined,
  };
}

function deserializeDiskEntryList(data: any): DiskEntryList {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeDiskEntry(item))) : undefined,
  };
}

/**
 * Disk Partition details.
 */
export interface DiskPartition {
  /**
   * Partition capacity.
   */
  capacityBytes?: bigint;
  /**
   * Partition file system.
   */
  fileSystem?: string;
  /**
   * Partition free space.
   */
  freeBytes?: bigint;
  /**
   * Mount pount (Linux/Windows) or drive letter (Windows).
   */
  mountPoint?: string;
  /**
   * Sub-partitions.
   */
  subPartitions?: DiskPartitionList;
  /**
   * Partition type (e.g. BIOS boot).
   */
  type?: string;
  /**
   * Partition UUID.
   */
  uuid?: string;
}

function serializeDiskPartition(data: any): DiskPartition {
  return {
    ...data,
    capacityBytes: data["capacityBytes"] !== undefined ? String(data["capacityBytes"]) : undefined,
    freeBytes: data["freeBytes"] !== undefined ? String(data["freeBytes"]) : undefined,
    subPartitions: data["subPartitions"] !== undefined ? serializeDiskPartitionList(data["subPartitions"]) : undefined,
  };
}

function deserializeDiskPartition(data: any): DiskPartition {
  return {
    ...data,
    capacityBytes: data["capacityBytes"] !== undefined ? BigInt(data["capacityBytes"]) : undefined,
    freeBytes: data["freeBytes"] !== undefined ? BigInt(data["freeBytes"]) : undefined,
    subPartitions: data["subPartitions"] !== undefined ? deserializeDiskPartitionList(data["subPartitions"]) : undefined,
  };
}

export interface DiskPartitionList {
  /**
   * Partition entries.
   */
  entries?: DiskPartition[];
}

function serializeDiskPartitionList(data: any): DiskPartitionList {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeDiskPartition(item))) : undefined,
  };
}

function deserializeDiskPartitionList(data: any): DiskPartitionList {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeDiskPartition(item))) : undefined,
  };
}

/**
 * Disk usage sample. Values are across all disks.
 */
export interface DiskUsageSample {
  /**
   * Average IOPS sampled over a short window. Must be non-negative.
   */
  averageIops?: number;
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
 * A resource that reports result of the import job execution.
 */
export interface ExecutionReport {
  /**
   * Validation errors encountered during the execution of the import job.
   */
  executionErrors?: ValidationReport;
  /**
   * Total number of asset frames reported for the import job.
   */
  framesReported?: number;
  /**
   * List of job-level errors. Deprecated, use the job errors under
   * execution_errors instead.
   */
  jobErrors?: ImportError[];
  /**
   * Total number of rows in the import job.
   */
  totalRowsCount?: number;
}

/**
 * A resource that aggregates the validation errors found in an import job
 * file.
 */
export interface FileValidationReport {
  /**
   * List of file level errors.
   */
  fileErrors?: ImportError[];
  /**
   * The name of the file.
   */
  fileName?: string;
  /**
   * Flag indicating that processing was aborted due to maximum number of
   * errors.
   */
  partialReport?: boolean;
  /**
   * Partial list of rows that encountered validation error.
   */
  rowErrors?: ImportRowError[];
}

/**
 * Collection of frame data.
 */
export interface Frames {
  /**
   * A repeated field of asset data.
   */
  framesData?: AssetFrame[];
}

function serializeFrames(data: any): Frames {
  return {
    ...data,
    framesData: data["framesData"] !== undefined ? data["framesData"].map((item: any) => (serializeAssetFrame(item))) : undefined,
  };
}

function deserializeFrames(data: any): Frames {
  return {
    ...data,
    framesData: data["framesData"] !== undefined ? data["framesData"].map((item: any) => (deserializeAssetFrame(item))) : undefined,
  };
}

/**
 * Single fstab entry.
 */
export interface FstabEntry {
  /**
   * The mount point for the filesystem.
   */
  file?: string;
  /**
   * Used by dump to determine which filesystems need to be dumped.
   */
  freq?: number;
  /**
   * Mount options associated with the filesystem.
   */
  mntops?: string;
  /**
   * Used by the fsck(8) program to determine the order in which filesystem
   * checks are done at reboot time.
   */
  passno?: number;
  /**
   * The block special device or remote filesystem to be mounted.
   */
  spec?: string;
  /**
   * The type of the filesystem.
   */
  vfstype?: string;
}

/**
 * Fstab content.
 */
export interface FstabEntryList {
  /**
   * Fstab entries.
   */
  entries?: FstabEntry[];
}

/**
 * A resource that represents a payload hosted on Google Cloud Storage.
 */
export interface GCSPayloadInfo {
  /**
   * The import job format.
   */
  format?:  | "IMPORT_JOB_FORMAT_UNSPECIFIED" | "IMPORT_JOB_FORMAT_CMDB" | "IMPORT_JOB_FORMAT_RVTOOLS_XLSX" | "IMPORT_JOB_FORMAT_RVTOOLS_CSV" | "IMPORT_JOB_FORMAT_JSON_FRAME";
  /**
   * The payload path in Google Cloud Storage.
   */
  path?: string;
}

/**
 * Guest OS config information.
 */
export interface GuestConfigDetails {
  /**
   * Mount list (Linux fstab).
   */
  fstab?: FstabEntryList;
  /**
   * Hosts file (/etc/hosts).
   */
  hosts?: HostsEntryList;
  /**
   * OS issue (typically /etc/issue in Linux).
   */
  issue?: string;
  /**
   * NFS exports.
   */
  nfsExports?: NfsExportList;
  /**
   * SELinux details.
   */
  selinux?: Selinux;
}

/**
 * Guest installed application information.
 */
export interface GuestInstalledApplication {
  /**
   * Installed application name .
   */
  name?: string;
  /**
   * Source path.
   */
  path?: string;
  /**
   * Date application was installed.
   */
  time?: string;
  /**
   * Installed application vendor.
   */
  vendor?: string;
  /**
   * Installed application version.
   */
  version?: string;
}

/**
 * Guest installed application list.
 */
export interface GuestInstalledApplicationList {
  entries?: GuestInstalledApplication[];
}

/**
 * Information from Guest-level collections.
 */
export interface GuestOsDetails {
  /**
   * OS and app configuration.
   */
  config?: GuestConfigDetails;
  /**
   * Runtime information.
   */
  runtime?: GuestRuntimeDetails;
}

function serializeGuestOsDetails(data: any): GuestOsDetails {
  return {
    ...data,
    runtime: data["runtime"] !== undefined ? serializeGuestRuntimeDetails(data["runtime"]) : undefined,
  };
}

function deserializeGuestOsDetails(data: any): GuestOsDetails {
  return {
    ...data,
    runtime: data["runtime"] !== undefined ? deserializeGuestRuntimeDetails(data["runtime"]) : undefined,
  };
}

/**
 * Guest OS runtime information.
 */
export interface GuestRuntimeDetails {
  /**
   * Domain, e.g. c.stratozone-development.internal.
   */
  domain?: string;
  /**
   * Installed applications information.
   */
  installedApps?: GuestInstalledApplicationList;
  /**
   * Date since last booted (last uptime date).
   */
  lastUptime?: Date;
  /**
   * Machine name.
   */
  machineName?: string;
  /**
   * Runtime network information (connections ports).
   */
  networkInfo?: RuntimeNetworkInfo;
  /**
   * Open files information.
   */
  openFileList?: OpenFileList;
  /**
   * Running processes.
   */
  processes?: RunningProcessList;
  /**
   * Running background services.
   */
  services?: RunningServiceList;
}

function serializeGuestRuntimeDetails(data: any): GuestRuntimeDetails {
  return {
    ...data,
    networkInfo: data["networkInfo"] !== undefined ? serializeRuntimeNetworkInfo(data["networkInfo"]) : undefined,
    processes: data["processes"] !== undefined ? serializeRunningProcessList(data["processes"]) : undefined,
    services: data["services"] !== undefined ? serializeRunningServiceList(data["services"]) : undefined,
  };
}

function deserializeGuestRuntimeDetails(data: any): GuestRuntimeDetails {
  return {
    ...data,
    networkInfo: data["networkInfo"] !== undefined ? deserializeRuntimeNetworkInfo(data["networkInfo"]) : undefined,
    processes: data["processes"] !== undefined ? deserializeRunningProcessList(data["processes"]) : undefined,
    services: data["services"] !== undefined ? deserializeRunningServiceList(data["services"]) : undefined,
  };
}

/**
 * Single /etc/hosts entry.
 */
export interface HostsEntry {
  /**
   * List of host names / aliases.
   */
  hostNames?: string[];
  /**
   * IP (raw, IPv4/6 agnostic).
   */
  ip?: string;
}

/**
 * Hosts content.
 */
export interface HostsEntryList {
  /**
   * Hosts entries.
   */
  entries?: HostsEntry[];
}

/**
 * A resource that reports the errors encountered while processing an import
 * job.
 */
export interface ImportError {
  /**
   * The error information.
   */
  errorDetails?: string;
  /**
   * The severity of the error.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO";
}

/**
 * A resource that represents the background job that imports asset frames.
 */
export interface ImportJob {
  /**
   * Required. Reference to a source.
   */
  assetSource?: string;
  /**
   * Output only. The timestamp when the import job was completed.
   */
  readonly completeTime?: Date;
  /**
   * Output only. The timestamp when the import job was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The report with the results of running the import job.
   */
  readonly executionReport?: ExecutionReport;
  /**
   * The payload is in Google Cloud Storage.
   */
  gcsPayload?: GCSPayloadInfo;
  /**
   * The payload is included in the request, mainly used for small import jobs.
   */
  inlinePayload?: InlinePayloadInfo;
  /**
   * Labels as key value pairs.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The full name of the import job.
   */
  readonly name?: string;
  /**
   * Output only. The state of the import job.
   */
  readonly state?:  | "IMPORT_JOB_STATE_UNSPECIFIED" | "IMPORT_JOB_STATE_PENDING" | "IMPORT_JOB_STATE_RUNNING" | "IMPORT_JOB_STATE_COMPLETED" | "IMPORT_JOB_STATE_FAILED" | "IMPORT_JOB_STATE_VALIDATING" | "IMPORT_JOB_STATE_FAILED_VALIDATION" | "IMPORT_JOB_STATE_READY";
  /**
   * Output only. The timestamp when the import job was last updated.
   */
  readonly updateTime?: Date;
  /**
   * Output only. The report with the validation results of the import job.
   */
  readonly validationReport?: ValidationReport;
}

function serializeImportJob(data: any): ImportJob {
  return {
    ...data,
    inlinePayload: data["inlinePayload"] !== undefined ? serializeInlinePayloadInfo(data["inlinePayload"]) : undefined,
  };
}

function deserializeImportJob(data: any): ImportJob {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    inlinePayload: data["inlinePayload"] !== undefined ? deserializeInlinePayloadInfo(data["inlinePayload"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A resource that reports the import job errors at row level.
 */
export interface ImportRowError {
  /**
   * The list of errors detected in the row.
   */
  errors?: ImportError[];
  /**
   * The row number where the error was detected.
   */
  rowNumber?: number;
  /**
   * The name of the VM in the row.
   */
  vmName?: string;
  /**
   * The VM UUID.
   */
  vmUuid?: string;
}

/**
 * A resource that represents the inline import job payload.
 */
export interface InlinePayloadInfo {
  /**
   * The import job format.
   */
  format?:  | "IMPORT_JOB_FORMAT_UNSPECIFIED" | "IMPORT_JOB_FORMAT_CMDB" | "IMPORT_JOB_FORMAT_RVTOOLS_XLSX" | "IMPORT_JOB_FORMAT_RVTOOLS_CSV" | "IMPORT_JOB_FORMAT_JSON_FRAME";
  /**
   * List of payload files.
   */
  payload?: PayloadFile[];
}

function serializeInlinePayloadInfo(data: any): InlinePayloadInfo {
  return {
    ...data,
    payload: data["payload"] !== undefined ? data["payload"].map((item: any) => (serializePayloadFile(item))) : undefined,
  };
}

function deserializeInlinePayloadInfo(data: any): InlinePayloadInfo {
  return {
    ...data,
    payload: data["payload"] !== undefined ? data["payload"].map((item: any) => (deserializePayloadFile(item))) : undefined,
  };
}

/**
 * Response message for listing assets.
 */
export interface ListAssetsResponse {
  /**
   * A list of assets.
   */
  assets?: Asset[];
  /**
   * A token identifying a page of results the server should return.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * A response for listing import jobs.
 */
export interface ListImportJobsResponse {
  /**
   * The list of import jobs.
   */
  importJobs?: ImportJob[];
  /**
   * A token identifying a page of results the server should return.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

function serializeListImportJobsResponse(data: any): ListImportJobsResponse {
  return {
    ...data,
    importJobs: data["importJobs"] !== undefined ? data["importJobs"].map((item: any) => (serializeImportJob(item))) : undefined,
  };
}

function deserializeListImportJobsResponse(data: any): ListImportJobsResponse {
  return {
    ...data,
    importJobs: data["importJobs"] !== undefined ? data["importJobs"].map((item: any) => (deserializeImportJob(item))) : undefined,
  };
}

/**
 * The response message for Locations.ListLocations.
 */
export interface ListLocationsResponse {
  /**
   * A list of locations that matches the specified filter in the request.
   */
  locations?: Location[];
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
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
 * Response message for listing sources.
 */
export interface ListSourcesResponse {
  /**
   * A token identifying a page of results the server should return.
   */
  nextPageToken?: string;
  /**
   * The list of sources.
   */
  sources?: Source[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * A resource that represents Google Cloud Platform location.
 */
export interface Location {
  /**
   * The friendly name for this location, typically a nearby city name. For
   * example, "Tokyo".
   */
  displayName?: string;
  /**
   * Cross-service attributes for the location. For example
   * {"cloud.googleapis.com/region": "us-east1"}
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The canonical id for this location. For example: `"us-east1"`.
   */
  locationId?: string;
  /**
   * Service-specific metadata. For example the available capacity at the given
   * location.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * Resource name for the location, which may vary between implementations.
   * For example: `"projects/example-project/locations/us-east1"`
   */
  name?: string;
}

/**
 * Memory usage sample.
 */
export interface MemoryUsageSample {
  /**
   * Percentage of system memory utilized. Must be in the interval [0, 100].
   */
  utilizedPercentage?: number;
}

/**
 * Details of network adapter.
 */
export interface NetworkAdapterDetails {
  /**
   * Network adapter type (e.g. VMXNET3).
   */
  adapterType?: string;
  /**
   * NetworkAddressList
   */
  addresses?: NetworkAddressList;
  /**
   * MAC address.
   */
  macAddress?: string;
}

export interface NetworkAdapterList {
  /**
   * Network Adapter descriptions.
   */
  networkAdapters?: NetworkAdapterDetails[];
}

/**
 * Details of network address.
 */
export interface NetworkAddress {
  /**
   * If DHCP is used to assign addresses.
   */
  assignment?:  | "ADDRESS_ASSIGNMENT_UNSPECIFIED" | "ADDRESS_ASSIGNMENT_STATIC" | "ADDRESS_ASSIGNMENT_DHCP";
  /**
   * Broadcast address.
   */
  bcast?: string;
  /**
   * Fully qualified domain name.
   */
  fqdn?: string;
  /**
   * Assigned or configured IP Address.
   */
  ipAddress?: string;
  /**
   * Subnet mask.
   */
  subnetMask?: string;
}

/**
 * List of allocated/assigned network addresses.
 */
export interface NetworkAddressList {
  addresses?: NetworkAddress[];
}

export interface NetworkConnection {
  /**
   * Local IP address.
   */
  localIpAddress?: string;
  /**
   * Local port.
   */
  localPort?: number;
  /**
   * Process ID.
   */
  pid?: bigint;
  /**
   * Process or service name.
   */
  processName?: string;
  /**
   * Connection protocol (e.g. TCP/UDP).
   */
  protocol?: string;
  /**
   * Remote IP address.
   */
  remoteIpAddress?: string;
  /**
   * Remote port.
   */
  remotePort?: number;
  /**
   * Connection state (e.g. CONNECTED).
   */
  state?: string;
}

function serializeNetworkConnection(data: any): NetworkConnection {
  return {
    ...data,
    pid: data["pid"] !== undefined ? String(data["pid"]) : undefined,
  };
}

function deserializeNetworkConnection(data: any): NetworkConnection {
  return {
    ...data,
    pid: data["pid"] !== undefined ? BigInt(data["pid"]) : undefined,
  };
}

/**
 * Network connection list.
 */
export interface NetworkConnectionList {
  entries?: NetworkConnection[];
}

function serializeNetworkConnectionList(data: any): NetworkConnectionList {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeNetworkConnection(item))) : undefined,
  };
}

function deserializeNetworkConnectionList(data: any): NetworkConnectionList {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeNetworkConnection(item))) : undefined,
  };
}

/**
 * Network usage sample. Values are across all network interfaces.
 */
export interface NetworkUsageSample {
  /**
   * Average network egress in B/s sampled over a short window. Must be
   * non-negative.
   */
  averageEgressBps?: number;
  /**
   * Average network ingress in B/s sampled over a short window. Must be
   * non-negative.
   */
  averageIngressBps?: number;
}

/**
 * NFS export.
 */
export interface NfsExport {
  /**
   * The directory being exported.
   */
  exportDirectory?: string;
  /**
   * The hosts or networks to which the export is being shared.
   */
  hosts?: string[];
}

/**
 * NFS exports.
 */
export interface NfsExportList {
  /**
   * NFS export entries.
   */
  entries?: NfsExport[];
}

/**
 * Open file Information.
 */
export interface OpenFileDetails {
  /**
   * Opened file command.
   */
  command?: string;
  /**
   * Opened file file path.
   */
  filePath?: string;
  /**
   * Opened file file type.
   */
  fileType?: string;
  /**
   * Opened file user.
   */
  user?: string;
}

/**
 * Open file list.
 */
export interface OpenFileList {
  /**
   * Open file details entries.
   */
  entries?: OpenFileDetails[];
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
 * Represents the metadata of the long-running operation.
 */
export interface OperationMetadata {
  /**
   * Output only. API version used to start the operation.
   */
  readonly apiVersion?: string;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Identifies whether the user has requested cancellation of the
   * operation. Operations that have been cancelled successfully have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   */
  readonly requestedCancellation?: boolean;
  /**
   * Output only. Human-readable status of the operation, if any.
   */
  readonly statusMessage?: string;
  /**
   * Output only. Server-defined resource path for the target of the operation.
   */
  readonly target?: string;
  /**
   * Output only. Name of the verb executed by the operation.
   */
  readonly verb?: string;
}

/**
 * Payload file for inline import job payload.
 */
export interface PayloadFile {
  /**
   * The file data.
   */
  data?: Uint8Array;
  /**
   * The file name.
   */
  name?: string;
}

function serializePayloadFile(data: any): PayloadFile {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializePayloadFile(data: any): PayloadFile {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

/**
 * Performance data sample.
 */
export interface PerformanceSample {
  /**
   * CPU usage sample.
   */
  cpu?: CpuUsageSample;
  /**
   * Disk usage sample.
   */
  disk?: DiskUsageSample;
  /**
   * Memory usage sample.
   */
  memory?: MemoryUsageSample;
  /**
   * Network usage sample.
   */
  network?: NetworkUsageSample;
  /**
   * Time the sample was collected.
   */
  sampleTime?: Date;
}

function serializePerformanceSample(data: any): PerformanceSample {
  return {
    ...data,
    sampleTime: data["sampleTime"] !== undefined ? data["sampleTime"].toISOString() : undefined,
  };
}

function deserializePerformanceSample(data: any): PerformanceSample {
  return {
    ...data,
    sampleTime: data["sampleTime"] !== undefined ? new Date(data["sampleTime"]) : undefined,
  };
}

/**
 * Information about the platform.
 */
export interface PlatformDetails {
  /**
   * VMware specific details.
   */
  vmwareDetails?: VmwarePlatformDetails;
}

/**
 * Additional options for MigrationCenter#projectsLocationsAssetsCreate.
 */
export interface ProjectsLocationsAssetsCreateOptions {
  assetId?: string;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for MigrationCenter#projectsLocationsAssetsDelete.
 */
export interface ProjectsLocationsAssetsDeleteOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes after the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for MigrationCenter#projectsLocationsAssetsGet.
 */
export interface ProjectsLocationsAssetsGetOptions {
  /**
   * View of the assets. Defaults to BASIC.
   */
  view?:  | "ASSET_VIEW_UNSPECIFIED" | "ASSET_VIEW_BASIC" | "ASSET_VIEW_FULL" | "ASSET_VIEW_STANDARD";
}

/**
 * Additional options for MigrationCenter#projectsLocationsAssetsList.
 */
export interface ProjectsLocationsAssetsListOptions {
  /**
   * Filtering results.
   */
  filter?: string;
  /**
   * Field to sort by. See https://google.aip.dev/132#ordering for more
   * details.
   */
  orderBy?: string;
  /**
   * Requested page size. Server may return fewer items than requested. If
   * unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return.
   */
  pageToken?: string;
  /**
   * View of the assets. Defaults to BASIC.
   */
  view?:  | "ASSET_VIEW_UNSPECIFIED" | "ASSET_VIEW_BASIC" | "ASSET_VIEW_FULL" | "ASSET_VIEW_STANDARD";
}

/**
 * Additional options for MigrationCenter#projectsLocationsAssetsPatch.
 */
export interface ProjectsLocationsAssetsPatchOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. Field mask is used to specify the fields to be overwritten in
   * the `Asset` resource by the update. The values specified in the
   * `update_mask` field are relative to the resource, not the full request. A
   * field will be overwritten if it is in the mask. A single * value in the
   * mask lets you to overwrite all fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAssetsPatchOptions(data: any): ProjectsLocationsAssetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAssetsPatchOptions(data: any): ProjectsLocationsAssetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * MigrationCenter#projectsLocationsAssetsReportAssetFrames.
 */
export interface ProjectsLocationsAssetsReportAssetFramesOptions {
  /**
   * Required. Reference to a source.
   */
  source?: string;
}

/**
 * Additional options for MigrationCenter#projectsLocationsImportJobsCreate.
 */
export interface ProjectsLocationsImportJobsCreateOptions {
  /**
   * Required. ID of the import job.
   */
  importJobId?: string;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for MigrationCenter#projectsLocationsImportJobsDelete.
 */
export interface ProjectsLocationsImportJobsDeleteOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes after the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for MigrationCenter#projectsLocationsImportJobsGet.
 */
export interface ProjectsLocationsImportJobsGetOptions {
  /**
   * Optional. The level of details of the import job. Default value is FULL.
   */
  view?:  | "IMPORT_JOB_VIEW_UNSPECIFIED" | "IMPORT_JOB_VIEW_BASIC" | "IMPORT_JOB_VIEW_FULL";
}

/**
 * Additional options for MigrationCenter#projectsLocationsImportJobsList.
 */
export interface ProjectsLocationsImportJobsListOptions {
  /**
   * Filtering results.
   */
  filter?: string;
  /**
   * Field to sort by. See https://google.aip.dev/132#ordering for more
   * details.
   */
  orderBy?: string;
  /**
   * Requested page size. Server may return fewer items than requested. If
   * unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server should return.
   */
  pageToken?: string;
  /**
   * Optional. The level of details of each import job. Default value is BASIC.
   */
  view?:  | "IMPORT_JOB_VIEW_UNSPECIFIED" | "IMPORT_JOB_VIEW_BASIC" | "IMPORT_JOB_VIEW_FULL";
}

/**
 * Additional options for MigrationCenter#projectsLocationsImportJobsPatch.
 */
export interface ProjectsLocationsImportJobsPatchOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. Field mask is used to specify the fields to be overwritten in
   * the `Asset` resource by the update. The values specified in the
   * `update_mask` field are relative to the resource, not the full request. A
   * field will be overwritten if it is in the mask. A single * value in the
   * mask lets you to overwrite all fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsImportJobsPatchOptions(data: any): ProjectsLocationsImportJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsImportJobsPatchOptions(data: any): ProjectsLocationsImportJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for MigrationCenter#projectsLocationsList.
 */
export interface ProjectsLocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like `"displayName=tokyo"`, and is documented in
   * more detail in [AIP-160](https://google.aip.dev/160).
   */
  filter?: string;
  /**
   * The maximum number of results to return. If not set, the service selects a
   * default.
   */
  pageSize?: number;
  /**
   * A page token received from the `next_page_token` field in the response.
   * Send that page token to receive the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for MigrationCenter#projectsLocationsOperationsList.
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
 * Additional options for MigrationCenter#projectsLocationsSourcesCreate.
 */
export interface ProjectsLocationsSourcesCreateOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. User specified ID for the source. It will become the last
   * component of the source name. The ID must be unique within the project,
   * must conform with RFC-1034, is restricted to lower-cased letters, and has a
   * maximum length of 63 characters. The ID must match the regular expression:
   * `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`.
   */
  sourceId?: string;
}

/**
 * Additional options for MigrationCenter#projectsLocationsSourcesDelete.
 */
export interface ProjectsLocationsSourcesDeleteOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes after the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for MigrationCenter#projectsLocationsSourcesList.
 */
export interface ProjectsLocationsSourcesListOptions {
  /**
   * Filtering results.
   */
  filter?: string;
  /**
   * Field to sort by. See https://google.aip.dev/132#ordering for more
   * details.
   */
  orderBy?: string;
  /**
   * Requested page size. The server may return fewer items than requested. If
   * unspecified, the server will pick an appropriate default value.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results that the server should return.
   */
  pageToken?: string;
}

/**
 * Additional options for MigrationCenter#projectsLocationsSourcesPatch.
 */
export interface ProjectsLocationsSourcesPatchOptions {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. Field mask is used to specify the fields to be overwritten in
   * the `Source` resource by the update. The values specified in the
   * `update_mask` field are relative to the resource, not the full request. A
   * field will be overwritten if it is in the mask. A single * value in the
   * mask lets you to overwrite all fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsSourcesPatchOptions(data: any): ProjectsLocationsSourcesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsSourcesPatchOptions(data: any): ProjectsLocationsSourcesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A response to a call to `ReportAssetFrame`.
 */
export interface ReportAssetFramesResponse {
}

/**
 * A request to run an import job.
 */
export interface RunImportJobRequest {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes after the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Guest OS running process details.
 */
export interface RunningProcess {
  /**
   * Process extended attributes.
   */
  attributes?: {
    [key: string]: string
  };
  /**
   * Process full command line.
   */
  cmdline?: string;
  /**
   * Process binary path.
   */
  exePath?: string;
  /**
   * Process ID.
   */
  pid?: bigint;
  /**
   * User running the process.
   */
  user?: string;
}

function serializeRunningProcess(data: any): RunningProcess {
  return {
    ...data,
    pid: data["pid"] !== undefined ? String(data["pid"]) : undefined,
  };
}

function deserializeRunningProcess(data: any): RunningProcess {
  return {
    ...data,
    pid: data["pid"] !== undefined ? BigInt(data["pid"]) : undefined,
  };
}

/**
 * List of running guest OS processes.
 */
export interface RunningProcessList {
  processes?: RunningProcess[];
}

function serializeRunningProcessList(data: any): RunningProcessList {
  return {
    ...data,
    processes: data["processes"] !== undefined ? data["processes"].map((item: any) => (serializeRunningProcess(item))) : undefined,
  };
}

function deserializeRunningProcessList(data: any): RunningProcessList {
  return {
    ...data,
    processes: data["processes"] !== undefined ? data["processes"].map((item: any) => (deserializeRunningProcess(item))) : undefined,
  };
}

/**
 * Guest OS running service details.
 */
export interface RunningService {
  /**
   * Service command line.
   */
  cmdline?: string;
  /**
   * Service binary path.
   */
  exePath?: string;
  /**
   * Service name.
   */
  name?: string;
  /**
   * Service pid.
   */
  pid?: bigint;
  /**
   * Service start mode (raw, OS-agnostic).
   */
  startMode?: string;
  /**
   * Service state (raw, OS-agnostic).
   */
  state?: string;
  /**
   * Service status.
   */
  status?: string;
}

function serializeRunningService(data: any): RunningService {
  return {
    ...data,
    pid: data["pid"] !== undefined ? String(data["pid"]) : undefined,
  };
}

function deserializeRunningService(data: any): RunningService {
  return {
    ...data,
    pid: data["pid"] !== undefined ? BigInt(data["pid"]) : undefined,
  };
}

/**
 * List of running guest OS services.
 */
export interface RunningServiceList {
  services?: RunningService[];
}

function serializeRunningServiceList(data: any): RunningServiceList {
  return {
    ...data,
    services: data["services"] !== undefined ? data["services"].map((item: any) => (serializeRunningService(item))) : undefined,
  };
}

function deserializeRunningServiceList(data: any): RunningServiceList {
  return {
    ...data,
    services: data["services"] !== undefined ? data["services"].map((item: any) => (deserializeRunningService(item))) : undefined,
  };
}

/**
 * Runtime networking information.
 */
export interface RuntimeNetworkInfo {
  /**
   * Network connections.
   */
  connections?: NetworkConnectionList;
  /**
   * Netstat (raw, OS-agnostic).
   */
  netstat?: string;
  /**
   * Netstat time collected.
   */
  netstatTime?: DateTime;
}

function serializeRuntimeNetworkInfo(data: any): RuntimeNetworkInfo {
  return {
    ...data,
    connections: data["connections"] !== undefined ? serializeNetworkConnectionList(data["connections"]) : undefined,
    netstatTime: data["netstatTime"] !== undefined ? serializeDateTime(data["netstatTime"]) : undefined,
  };
}

function deserializeRuntimeNetworkInfo(data: any): RuntimeNetworkInfo {
  return {
    ...data,
    connections: data["connections"] !== undefined ? deserializeNetworkConnectionList(data["connections"]) : undefined,
    netstatTime: data["netstatTime"] !== undefined ? deserializeDateTime(data["netstatTime"]) : undefined,
  };
}

/**
 * SELinux details.
 */
export interface Selinux {
  /**
   * Is SELinux enabled.
   */
  enabled?: boolean;
  /**
   * SELinux mode enforcing / permissive.
   */
  mode?: string;
}

/**
 * Source represents an object from which asset information is streamed to
 * Migration Center.
 */
export interface Source {
  /**
   * Output only. The timestamp when the source was created.
   */
  readonly createTime?: Date;
  /**
   * Free-text description.
   */
  description?: string;
  /**
   * User-friendly display name.
   */
  displayName?: string;
  /**
   * If `true`, the source is managed by other service(s).
   */
  isManaged?: boolean;
  /**
   * Output only. The full name of the source.
   */
  readonly name?: string;
  /**
   * Output only. Number of frames that are still being processed.
   */
  readonly pendingFrameCount?: number;
  /**
   * The information confidence of the source. The higher the value, the higher
   * the confidence.
   */
  priority?: number;
  /**
   * Data source type.
   */
  type?:  | "SOURCE_TYPE_UNKNOWN" | "SOURCE_TYPE_UPLOAD" | "SOURCE_TYPE_GUEST_OS_SCAN" | "SOURCE_TYPE_INVENTORY_SCAN" | "SOURCE_TYPE_CUSTOM";
  /**
   * Output only. The timestamp when the source was last updated.
   */
  readonly updateTime?: Date;
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
 * Represents a time zone from the [IANA Time Zone
 * Database](https://www.iana.org/time-zones).
 */
export interface TimeZone {
  /**
   * IANA Time Zone Database time zone, e.g. "America/New_York".
   */
  id?: string;
  /**
   * Optional. IANA Time Zone Database version number, e.g. "2019a".
   */
  version?: string;
}

/**
 * A request to update an asset.
 */
export interface UpdateAssetRequest {
  /**
   * Required. The resource being updated.
   */
  asset?: Asset;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. Field mask is used to specify the fields to be overwritten in
   * the `Asset` resource by the update. The values specified in the
   * `update_mask` field are relative to the resource, not the full request. A
   * field will be overwritten if it is in the mask. A single * value in the
   * mask lets you to overwrite all fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializeUpdateAssetRequest(data: any): UpdateAssetRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUpdateAssetRequest(data: any): UpdateAssetRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A request to validate an import job.
 */
export interface ValidateImportJobRequest {
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes after the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * A resource that aggregates errors across import job files.
 */
export interface ValidationReport {
  /**
   * List of errors found in files.
   */
  fileValidations?: FileValidationReport[];
  /**
   * List of job level errors.
   */
  jobErrors?: ImportError[];
}

/**
 * Details of the VM architecture.
 */
export interface VirtualMachineArchitectureDetails {
  /**
   * Bios Details.
   */
  bios?: BiosDetails;
  /**
   * CPU architecture e.g.: "x64-based PC", "x86_64", "i686" etc.
   */
  cpuArchitecture?: string;
  /**
   * CPU manufacturer e.g.: "Intel", "AMD".
   */
  cpuManufacturer?: string;
  /**
   * CPU name e.g. "Intel Xeon E5-2690", "AMD EPYC 7571" etc.
   */
  cpuName?: string;
  /**
   * Number of processor sockets allocated to the machine.
   */
  cpuSocketCount?: number;
  /**
   * Number of cpu threads allocated to the machine.
   */
  cpuThreadCount?: number;
  /**
   * Firmware (BIOS/efi).
   */
  firmware?: string;
  /**
   * CPU hyperthreading support (inner enum).
   */
  hyperthreading?:  | "HYPER_THREADING_UNSPECIFIED" | "HYPER_THREADING_DISABLED" | "HYPER_THREADING_ENABLED";
  /**
   * Hardware vendor.
   */
  vendor?: string;
}

/**
 * Details of a VirtualMachine.
 */
export interface VirtualMachineDetails {
  /**
   * Number of CPU cores in the VirtualMachine. Must be non-negative.
   */
  coreCount?: number;
  /**
   * Guest OS information.
   */
  guestOs?: GuestOsDetails;
  /**
   * The amount of memory in the VirtualMachine. Must be non-negative.
   */
  memoryMb?: number;
  /**
   * What family the OS belong to, if known.
   */
  osFamily?:  | "OS_FAMILY_UNKNOWN" | "OS_FAMILY_WINDOWS" | "OS_FAMILY_LINUX" | "OS_FAMILY_UNIX";
  /**
   * The name of the operating system running on the VirtualMachine.
   */
  osName?: string;
  /**
   * Platform information.
   */
  platform?: PlatformDetails;
  /**
   * Power state of VM (poweredOn or poweredOff).
   */
  powerState?: string;
  /**
   * Folder name in vCenter where asset resides.
   */
  vcenterFolder?: string;
  /**
   * vCenter URL used in collection.
   */
  vcenterUrl?: string;
  /**
   * vCenter VM ID.
   */
  vcenterVmId?: string;
  /**
   * VM architecture details (vendor, cpu arch).
   */
  vmArchitecture?: VirtualMachineArchitectureDetails;
  /**
   * VM disk details.
   */
  vmDisks?: VirtualMachineDiskDetails;
  /**
   * Virtual Machine display name.
   */
  vmName?: string;
  /**
   * VM network details.
   */
  vmNetwork?: VirtualMachineNetworkDetails;
  /**
   * Virtual Machine uniqe identifier.
   */
  vmUuid?: string;
}

function serializeVirtualMachineDetails(data: any): VirtualMachineDetails {
  return {
    ...data,
    guestOs: data["guestOs"] !== undefined ? serializeGuestOsDetails(data["guestOs"]) : undefined,
    vmDisks: data["vmDisks"] !== undefined ? serializeVirtualMachineDiskDetails(data["vmDisks"]) : undefined,
  };
}

function deserializeVirtualMachineDetails(data: any): VirtualMachineDetails {
  return {
    ...data,
    guestOs: data["guestOs"] !== undefined ? deserializeGuestOsDetails(data["guestOs"]) : undefined,
    vmDisks: data["vmDisks"] !== undefined ? deserializeVirtualMachineDiskDetails(data["vmDisks"]) : undefined,
  };
}

/**
 * Details of VM disks.
 */
export interface VirtualMachineDiskDetails {
  /**
   * List of disks.
   */
  disks?: DiskEntryList;
  /**
   * Disk total Capacity.
   */
  hddTotalCapacityBytes?: bigint;
  /**
   * Total Disk Free Space.
   */
  hddTotalFreeBytes?: bigint;
  /**
   * Raw lsblk output in json.
   */
  lsblkJson?: string;
}

function serializeVirtualMachineDiskDetails(data: any): VirtualMachineDiskDetails {
  return {
    ...data,
    disks: data["disks"] !== undefined ? serializeDiskEntryList(data["disks"]) : undefined,
    hddTotalCapacityBytes: data["hddTotalCapacityBytes"] !== undefined ? String(data["hddTotalCapacityBytes"]) : undefined,
    hddTotalFreeBytes: data["hddTotalFreeBytes"] !== undefined ? String(data["hddTotalFreeBytes"]) : undefined,
  };
}

function deserializeVirtualMachineDiskDetails(data: any): VirtualMachineDiskDetails {
  return {
    ...data,
    disks: data["disks"] !== undefined ? deserializeDiskEntryList(data["disks"]) : undefined,
    hddTotalCapacityBytes: data["hddTotalCapacityBytes"] !== undefined ? BigInt(data["hddTotalCapacityBytes"]) : undefined,
    hddTotalFreeBytes: data["hddTotalFreeBytes"] !== undefined ? BigInt(data["hddTotalFreeBytes"]) : undefined,
  };
}

/**
 * Details of network adapters and settings
 */
export interface VirtualMachineNetworkDetails {
  /**
   * Default GW address. Top-level object, will be later encriched by full
   * RouteInfo.
   */
  defaultGw?: string;
  /**
   * List of Network Adapters.
   */
  networkAdapters?: NetworkAdapterList;
  /**
   * IP Address of the machine.
   */
  primaryIpAddress?: string;
  /**
   * MAC Address of the machine. This property is used to uniqly identify the
   * machine.
   */
  primaryMacAddress?: string;
}

/**
 * VMware disk config details.
 */
export interface VmwareDiskConfig {
  /**
   * VMDK backing type.
   */
  backingType?:  | "BACKING_TYPE_UNSPECIFIED" | "BACKING_TYPE_FLAT_V1" | "BACKING_TYPE_FLAT_V2" | "BACKING_TYPE_PMEM" | "BACKING_TYPE_RDM_V1" | "BACKING_TYPE_RDM_V2" | "BACKING_TYPE_SESPARSE" | "BACKING_TYPE_SESPARSE_V1" | "BACKING_TYPE_SESPARSE_V2";
  /**
   * RDM compatibility mode.
   */
  rdmCompatibilityMode?: string;
  /**
   * Is VMDK shared with other VMs.
   */
  shared?: boolean;
  /**
   * VMDK disk mode.
   */
  vmdkDiskMode?: string;
}

/**
 * VMware specific details.
 */
export interface VmwarePlatformDetails {
  /**
   * ESX version.
   */
  esxVersion?: string;
  /**
   * VMware os enum -
   * https://vdc-repo.vmware.com/vmwb-repository/dcr-public/da47f910-60ac-438b-8b9b-6122f4d14524/16b7274a-bf8b-4b4c-a05e-746f2aa93c8c/doc/vim.vm.GuestOsDescriptor.GuestOsIdentifier.html.
   */
  osid?: string;
  /**
   * vCenter version.
   */
  vcenterVersion?: string;
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
