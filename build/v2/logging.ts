// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Logging API Client for Deno
 * =================================
 * 
 * Writes log entries and manages your Cloud Logging configuration.
 * 
 * Docs: https://cloud.google.com/logging/docs/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Writes log entries and manages your Cloud Logging configuration.
 */
export class Logging {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://logging.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new exclusion in the _Default sink in a specified parent
   * resource. Only log entries belonging to that resource can be excluded. You
   * can have up to 10 exclusions in a resource.
   *
   * @param parent Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-logging-project" "organizations/123456789"
   */
  async billingAccountsExclusionsCreate(parent: string, req: LogExclusion): Promise<LogExclusion> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/exclusions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogExclusion;
  }

  /**
   * Deletes an exclusion in the _Default sink.
   *
   * @param name Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async billingAccountsExclusionsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the description of an exclusion in the _Default sink.
   *
   * @param name Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async billingAccountsExclusionsGet(name: string): Promise<LogExclusion> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogExclusion;
  }

  /**
   * Lists all the exclusions on the _Default sink in a parent resource.
   *
   * @param parent Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" 
   */
  async billingAccountsExclusionsList(parent: string, opts: BillingAccountsExclusionsListOptions = {}): Promise<ListExclusionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/exclusions`);
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
    return data as ListExclusionsResponse;
  }

  /**
   * Changes one or more properties of an existing exclusion in the _Default
   * sink.
   *
   * @param name Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async billingAccountsExclusionsPatch(name: string, req: LogExclusion, opts: BillingAccountsExclusionsPatchOptions = {}): Promise<LogExclusion> {
    opts = serializeBillingAccountsExclusionsPatchOptions(opts);
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
    return data as LogExclusion;
  }

  /**
   * Gets the Logging CMEK settings for the given resource.Note: CMEK for the
   * Log Router can be configured for Google Cloud projects, folders,
   * organizations and billing accounts. Once configured for an organization, it
   * applies to all projects and folders in the Google Cloud organization.See
   * Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   *
   * @param name Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.
   */
  async billingAccountsGetCmekSettings(name: string): Promise<CmekSettings> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/cmekSettings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CmekSettings;
  }

  /**
   * Gets the Log Router settings for the given resource.Note: Settings for the
   * Log Router can be get for Google Cloud projects, folders, organizations and
   * billing accounts. Currently it can only be configured for organizations.
   * Once configured for an organization, it applies to all projects and folders
   * in the Google Cloud organization.See Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   *
   * @param name Required. The resource for which to retrieve settings. "projects/[PROJECT_ID]/settings" "organizations/[ORGANIZATION_ID]/settings" "billingAccounts/[BILLING_ACCOUNT_ID]/settings" "folders/[FOLDER_ID]/settings" For example:"organizations/12345/settings"Note: Settings for the Log Router can be get for Google Cloud projects, folders, organizations and billing accounts. Currently it can only be configured for organizations. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.
   */
  async billingAccountsGetSettings(name: string): Promise<Settings> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/settings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Settings;
  }

  /**
   * Creates a log bucket that can be used to store log entries. After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param parent Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global"
   */
  async billingAccountsLocationsBucketsCreate(parent: string, req: LogBucket, opts: BillingAccountsLocationsBucketsCreateOptions = {}): Promise<LogBucket> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets`);
    if (opts.bucketId !== undefined) {
      url.searchParams.append("bucketId", String(opts.bucketId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogBucket;
  }

  /**
   * Creates a log bucket asynchronously that can be used to store log
   * entries.After a bucket has been created, the bucket's location cannot be
   * changed.
   *
   * @param parent Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global"
   */
  async billingAccountsLocationsBucketsCreateAsync(parent: string, req: LogBucket, opts: BillingAccountsLocationsBucketsCreateAsyncOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets:createAsync`);
    if (opts.bucketId !== undefined) {
      url.searchParams.append("bucketId", String(opts.bucketId));
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
   * Deletes a log bucket.Changes the bucket's lifecycle_state to the
   * DELETE_REQUESTED state. After 7 days, the bucket will be purged and all log
   * entries in the bucket will be permanently deleted.
   *
   * @param name Required. The full resource name of the bucket to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async billingAccountsLocationsBucketsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a log bucket.
   *
   * @param name Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async billingAccountsLocationsBucketsGet(name: string): Promise<LogBucket> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogBucket;
  }

  /**
   * Asynchronously creates linked dataset in BigQuery which makes it possible
   * to use BugQuery to read the logs stored in the bucket. A bucket may
   * currently only contain one link.
   *
   * @param parent Required. The full resource name of the bucket to create a link for. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" 
   */
  async billingAccountsLocationsBucketsLinksCreate(parent: string, req: Link, opts: BillingAccountsLocationsBucketsLinksCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/links`);
    if (opts.linkId !== undefined) {
      url.searchParams.append("linkId", String(opts.linkId));
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
   * Deletes a link. This will also delete the corresponding BigQuery linked
   * dataset.
   *
   * @param name Required. The full resource name of the link to delete."projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID"
   */
  async billingAccountsLocationsBucketsLinksDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a link.
   *
   * @param name Required. The resource name of the link:"projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID
   */
  async billingAccountsLocationsBucketsLinksGet(name: string): Promise<Link> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Link;
  }

  /**
   * Lists links.
   *
   * @param parent Required. The parent resource whose links are to be listed:"projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/
   */
  async billingAccountsLocationsBucketsLinksList(parent: string, opts: BillingAccountsLocationsBucketsLinksListOptions = {}): Promise<ListLinksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/links`);
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
    return data as ListLinksResponse;
  }

  /**
   * Lists log buckets.
   *
   * @param parent Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
   */
  async billingAccountsLocationsBucketsList(parent: string, opts: BillingAccountsLocationsBucketsListOptions = {}): Promise<ListBucketsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets`);
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
    return data as ListBucketsResponse;
  }

  /**
   * Updates a log bucket.If the bucket has a lifecycle_state of
   * DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async billingAccountsLocationsBucketsPatch(name: string, req: LogBucket, opts: BillingAccountsLocationsBucketsPatchOptions = {}): Promise<LogBucket> {
    opts = serializeBillingAccountsLocationsBucketsPatchOptions(opts);
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
    return data as LogBucket;
  }

  /**
   * Undeletes a log bucket. A bucket that has been deleted can be undeleted
   * within the grace period of 7 days.
   *
   * @param name Required. The full resource name of the bucket to undelete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async billingAccountsLocationsBucketsUndelete(name: string, req: UndeleteBucketRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Updates a log bucket asynchronously.If the bucket has a lifecycle_state of
   * DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async billingAccountsLocationsBucketsUpdateAsync(name: string, req: LogBucket, opts: BillingAccountsLocationsBucketsUpdateAsyncOptions = {}): Promise<Operation> {
    opts = serializeBillingAccountsLocationsBucketsUpdateAsyncOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }:updateAsync`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
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
   * Creates a view over log entries in a log bucket. A bucket may contain a
   * maximum of 30 views.
   *
   * @param parent Required. The bucket in which to create the view `"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"` For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async billingAccountsLocationsBucketsViewsCreate(parent: string, req: LogView, opts: BillingAccountsLocationsBucketsViewsCreateOptions = {}): Promise<LogView> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/views`);
    if (opts.viewId !== undefined) {
      url.searchParams.append("viewId", String(opts.viewId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogView;
  }

  /**
   * Deletes a view on a log bucket. If an UNAVAILABLE error is returned, this
   * indicates that system is not in a state where it can delete the view. If
   * this occurs, please try again in a few minutes.
   *
   * @param name Required. The full resource name of the view to delete: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async billingAccountsLocationsBucketsViewsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a view on a log bucket..
   *
   * @param name Required. The resource name of the policy: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async billingAccountsLocationsBucketsViewsGet(name: string): Promise<LogView> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogView;
  }

  /**
   * Lists views on a log bucket.
   *
   * @param parent Required. The bucket whose views are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" 
   */
  async billingAccountsLocationsBucketsViewsList(parent: string, opts: BillingAccountsLocationsBucketsViewsListOptions = {}): Promise<ListViewsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/views`);
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
    return data as ListViewsResponse;
  }

  /**
   * Lists the logs in projects, organizations, folders, or billing accounts.
   * Only logs that have entries are listed.
   *
   * @param parent Required. The resource name that owns the logs: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]
   */
  async billingAccountsLocationsBucketsViewsLogsList(parent: string, opts: BillingAccountsLocationsBucketsViewsLogsListOptions = {}): Promise<ListLogsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/logs`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.resourceNames !== undefined) {
      url.searchParams.append("resourceNames", String(opts.resourceNames));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListLogsResponse;
  }

  /**
   * Updates a view on a log bucket. This method replaces the following fields
   * in the existing view with values from the new view: filter. If an
   * UNAVAILABLE error is returned, this indicates that system is not in a state
   * where it can update the view. If this occurs, please try again in a few
   * minutes.
   *
   * @param name Required. The full resource name of the view to update "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async billingAccountsLocationsBucketsViewsPatch(name: string, req: LogView, opts: BillingAccountsLocationsBucketsViewsPatchOptions = {}): Promise<LogView> {
    opts = serializeBillingAccountsLocationsBucketsViewsPatchOptions(opts);
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
    return data as LogView;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async billingAccountsLocationsGet(name: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Location;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async billingAccountsLocationsList(name: string, opts: BillingAccountsLocationsListOptions = {}): Promise<ListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/locations`);
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
   * google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * Code.CANCELLED.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async billingAccountsLocationsOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
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
  async billingAccountsLocationsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns UNIMPLEMENTED.
   *
   * @param name The name of the operation's parent resource.
   */
  async billingAccountsLocationsOperationsList(name: string, opts: BillingAccountsLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
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
    return data as ListOperationsResponse;
  }

  /**
   * Deletes all the log entries in a log for the _Default Log Bucket. The log
   * reappears if it receives new entries. Log entries written shortly before
   * the delete operation might not be deleted. Entries received after the
   * delete operation with a timestamp before the operation will be deleted.
   *
   * @param logName Required. The resource name of the log to delete: projects/[PROJECT_ID]/logs/[LOG_ID] organizations/[ORGANIZATION_ID]/logs/[LOG_ID] billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID] folders/[FOLDER_ID]/logs/[LOG_ID][LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/123/logs/cloudaudit.googleapis.com%2Factivity".For more information about log names, see LogEntry.
   */
  async billingAccountsLogsDelete(logName: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ logName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists the logs in projects, organizations, folders, or billing accounts.
   * Only logs that have entries are listed.
   *
   * @param parent Required. The resource name that owns the logs: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]
   */
  async billingAccountsLogsList(parent: string, opts: BillingAccountsLogsListOptions = {}): Promise<ListLogsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/logs`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.resourceNames !== undefined) {
      url.searchParams.append("resourceNames", String(opts.resourceNames));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListLogsResponse;
  }

  /**
   * Creates a sink that exports specified log entries to a destination. The
   * export of newly-ingested log entries begins immediately, unless the sink's
   * writer_identity is not permitted to write to the destination. A sink can
   * export log entries only from the resource owning the sink.
   *
   * @param parent Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-project" "organizations/123456789"
   */
  async billingAccountsSinksCreate(parent: string, req: LogSink, opts: BillingAccountsSinksCreateOptions = {}): Promise<LogSink> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/sinks`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogSink;
  }

  /**
   * Deletes a sink. If the sink has a unique writer_identity, then that
   * service account is also deleted.
   *
   * @param sinkName Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async billingAccountsSinksDelete(sinkName: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a sink.
   *
   * @param sinkName Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async billingAccountsSinksGet(sinkName: string): Promise<LogSink> {
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogSink;
  }

  /**
   * Lists sinks.
   *
   * @param parent Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" 
   */
  async billingAccountsSinksList(parent: string, opts: BillingAccountsSinksListOptions = {}): Promise<ListSinksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/sinks`);
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
    return data as ListSinksResponse;
  }

  /**
   * Updates a sink. This method replaces the following fields in the existing
   * sink with values from the new sink: destination, and filter.The updated
   * sink might also have a new writer_identity; see the unique_writer_identity
   * field.
   *
   * @param sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async billingAccountsSinksPatch(sinkName: string, req: LogSink, opts: BillingAccountsSinksPatchOptions = {}): Promise<LogSink> {
    opts = serializeBillingAccountsSinksPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
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
    return data as LogSink;
  }

  /**
   * Updates a sink. This method replaces the following fields in the existing
   * sink with values from the new sink: destination, and filter.The updated
   * sink might also have a new writer_identity; see the unique_writer_identity
   * field.
   *
   * @param sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async billingAccountsSinksUpdate(sinkName: string, req: LogSink, opts: BillingAccountsSinksUpdateOptions = {}): Promise<LogSink> {
    opts = serializeBillingAccountsSinksUpdateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as LogSink;
  }

  /**
   * Copies a set of log entries from a log bucket to a Cloud Storage bucket.
   *
   */
  async entriesCopy(req: CopyLogEntriesRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/entries:copy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists log entries. Use this method to retrieve log entries that originated
   * from a project/folder/organization/billing account. For ways to export log
   * entries, see Exporting Logs (https://cloud.google.com/logging/docs/export).
   *
   */
  async entriesList(req: ListLogEntriesRequest): Promise<ListLogEntriesResponse> {
    const url = new URL(`${this.#baseUrl}v2/entries:list`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeListLogEntriesResponse(data);
  }

  /**
   * Streaming read of log entries as they are ingested. Until the stream is
   * terminated, it will continue reading logs.
   *
   */
  async entriesTail(req: TailLogEntriesRequest): Promise<TailLogEntriesResponse> {
    req = serializeTailLogEntriesRequest(req);
    const url = new URL(`${this.#baseUrl}v2/entries:tail`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTailLogEntriesResponse(data);
  }

  /**
   * Writes log entries to Logging. This API method is the only way to send log
   * entries to Logging. This method is used, directly or indirectly, by the
   * Logging agent (fluentd) and all logging libraries configured to use
   * Logging. A single request may contain log entries for a maximum of 1000
   * different resources (projects, organizations, billing accounts or folders)
   *
   */
  async entriesWrite(req: WriteLogEntriesRequest): Promise<WriteLogEntriesResponse> {
    req = serializeWriteLogEntriesRequest(req);
    const url = new URL(`${this.#baseUrl}v2/entries:write`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as WriteLogEntriesResponse;
  }

  /**
   * Creates a new exclusion in the _Default sink in a specified parent
   * resource. Only log entries belonging to that resource can be excluded. You
   * can have up to 10 exclusions in a resource.
   *
   * @param parent Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-logging-project" "organizations/123456789"
   */
  async exclusionsCreate(parent: string, req: LogExclusion): Promise<LogExclusion> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/exclusions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogExclusion;
  }

  /**
   * Deletes an exclusion in the _Default sink.
   *
   * @param name Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async exclusionsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the description of an exclusion in the _Default sink.
   *
   * @param name Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async exclusionsGet(name: string): Promise<LogExclusion> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogExclusion;
  }

  /**
   * Lists all the exclusions on the _Default sink in a parent resource.
   *
   * @param parent Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" 
   */
  async exclusionsList(parent: string, opts: ExclusionsListOptions = {}): Promise<ListExclusionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/exclusions`);
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
    return data as ListExclusionsResponse;
  }

  /**
   * Changes one or more properties of an existing exclusion in the _Default
   * sink.
   *
   * @param name Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async exclusionsPatch(name: string, req: LogExclusion, opts: ExclusionsPatchOptions = {}): Promise<LogExclusion> {
    opts = serializeExclusionsPatchOptions(opts);
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
    return data as LogExclusion;
  }

  /**
   * Creates a new exclusion in the _Default sink in a specified parent
   * resource. Only log entries belonging to that resource can be excluded. You
   * can have up to 10 exclusions in a resource.
   *
   * @param parent Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-logging-project" "organizations/123456789"
   */
  async foldersExclusionsCreate(parent: string, req: LogExclusion): Promise<LogExclusion> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/exclusions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogExclusion;
  }

  /**
   * Deletes an exclusion in the _Default sink.
   *
   * @param name Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async foldersExclusionsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the description of an exclusion in the _Default sink.
   *
   * @param name Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async foldersExclusionsGet(name: string): Promise<LogExclusion> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogExclusion;
  }

  /**
   * Lists all the exclusions on the _Default sink in a parent resource.
   *
   * @param parent Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" 
   */
  async foldersExclusionsList(parent: string, opts: FoldersExclusionsListOptions = {}): Promise<ListExclusionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/exclusions`);
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
    return data as ListExclusionsResponse;
  }

  /**
   * Changes one or more properties of an existing exclusion in the _Default
   * sink.
   *
   * @param name Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async foldersExclusionsPatch(name: string, req: LogExclusion, opts: FoldersExclusionsPatchOptions = {}): Promise<LogExclusion> {
    opts = serializeFoldersExclusionsPatchOptions(opts);
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
    return data as LogExclusion;
  }

  /**
   * Gets the Logging CMEK settings for the given resource.Note: CMEK for the
   * Log Router can be configured for Google Cloud projects, folders,
   * organizations and billing accounts. Once configured for an organization, it
   * applies to all projects and folders in the Google Cloud organization.See
   * Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   *
   * @param name Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.
   */
  async foldersGetCmekSettings(name: string): Promise<CmekSettings> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/cmekSettings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CmekSettings;
  }

  /**
   * Gets the Log Router settings for the given resource.Note: Settings for the
   * Log Router can be get for Google Cloud projects, folders, organizations and
   * billing accounts. Currently it can only be configured for organizations.
   * Once configured for an organization, it applies to all projects and folders
   * in the Google Cloud organization.See Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   *
   * @param name Required. The resource for which to retrieve settings. "projects/[PROJECT_ID]/settings" "organizations/[ORGANIZATION_ID]/settings" "billingAccounts/[BILLING_ACCOUNT_ID]/settings" "folders/[FOLDER_ID]/settings" For example:"organizations/12345/settings"Note: Settings for the Log Router can be get for Google Cloud projects, folders, organizations and billing accounts. Currently it can only be configured for organizations. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.
   */
  async foldersGetSettings(name: string): Promise<Settings> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/settings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Settings;
  }

  /**
   * Creates a log bucket that can be used to store log entries. After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param parent Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global"
   */
  async foldersLocationsBucketsCreate(parent: string, req: LogBucket, opts: FoldersLocationsBucketsCreateOptions = {}): Promise<LogBucket> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets`);
    if (opts.bucketId !== undefined) {
      url.searchParams.append("bucketId", String(opts.bucketId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogBucket;
  }

  /**
   * Creates a log bucket asynchronously that can be used to store log
   * entries.After a bucket has been created, the bucket's location cannot be
   * changed.
   *
   * @param parent Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global"
   */
  async foldersLocationsBucketsCreateAsync(parent: string, req: LogBucket, opts: FoldersLocationsBucketsCreateAsyncOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets:createAsync`);
    if (opts.bucketId !== undefined) {
      url.searchParams.append("bucketId", String(opts.bucketId));
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
   * Deletes a log bucket.Changes the bucket's lifecycle_state to the
   * DELETE_REQUESTED state. After 7 days, the bucket will be purged and all log
   * entries in the bucket will be permanently deleted.
   *
   * @param name Required. The full resource name of the bucket to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async foldersLocationsBucketsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a log bucket.
   *
   * @param name Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async foldersLocationsBucketsGet(name: string): Promise<LogBucket> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogBucket;
  }

  /**
   * Asynchronously creates linked dataset in BigQuery which makes it possible
   * to use BugQuery to read the logs stored in the bucket. A bucket may
   * currently only contain one link.
   *
   * @param parent Required. The full resource name of the bucket to create a link for. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" 
   */
  async foldersLocationsBucketsLinksCreate(parent: string, req: Link, opts: FoldersLocationsBucketsLinksCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/links`);
    if (opts.linkId !== undefined) {
      url.searchParams.append("linkId", String(opts.linkId));
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
   * Deletes a link. This will also delete the corresponding BigQuery linked
   * dataset.
   *
   * @param name Required. The full resource name of the link to delete."projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID"
   */
  async foldersLocationsBucketsLinksDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a link.
   *
   * @param name Required. The resource name of the link:"projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID
   */
  async foldersLocationsBucketsLinksGet(name: string): Promise<Link> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Link;
  }

  /**
   * Lists links.
   *
   * @param parent Required. The parent resource whose links are to be listed:"projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/
   */
  async foldersLocationsBucketsLinksList(parent: string, opts: FoldersLocationsBucketsLinksListOptions = {}): Promise<ListLinksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/links`);
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
    return data as ListLinksResponse;
  }

  /**
   * Lists log buckets.
   *
   * @param parent Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
   */
  async foldersLocationsBucketsList(parent: string, opts: FoldersLocationsBucketsListOptions = {}): Promise<ListBucketsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets`);
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
    return data as ListBucketsResponse;
  }

  /**
   * Updates a log bucket.If the bucket has a lifecycle_state of
   * DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async foldersLocationsBucketsPatch(name: string, req: LogBucket, opts: FoldersLocationsBucketsPatchOptions = {}): Promise<LogBucket> {
    opts = serializeFoldersLocationsBucketsPatchOptions(opts);
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
    return data as LogBucket;
  }

  /**
   * Undeletes a log bucket. A bucket that has been deleted can be undeleted
   * within the grace period of 7 days.
   *
   * @param name Required. The full resource name of the bucket to undelete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async foldersLocationsBucketsUndelete(name: string, req: UndeleteBucketRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Updates a log bucket asynchronously.If the bucket has a lifecycle_state of
   * DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async foldersLocationsBucketsUpdateAsync(name: string, req: LogBucket, opts: FoldersLocationsBucketsUpdateAsyncOptions = {}): Promise<Operation> {
    opts = serializeFoldersLocationsBucketsUpdateAsyncOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }:updateAsync`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
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
   * Creates a view over log entries in a log bucket. A bucket may contain a
   * maximum of 30 views.
   *
   * @param parent Required. The bucket in which to create the view `"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"` For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async foldersLocationsBucketsViewsCreate(parent: string, req: LogView, opts: FoldersLocationsBucketsViewsCreateOptions = {}): Promise<LogView> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/views`);
    if (opts.viewId !== undefined) {
      url.searchParams.append("viewId", String(opts.viewId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogView;
  }

  /**
   * Deletes a view on a log bucket. If an UNAVAILABLE error is returned, this
   * indicates that system is not in a state where it can delete the view. If
   * this occurs, please try again in a few minutes.
   *
   * @param name Required. The full resource name of the view to delete: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async foldersLocationsBucketsViewsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a view on a log bucket..
   *
   * @param name Required. The resource name of the policy: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async foldersLocationsBucketsViewsGet(name: string): Promise<LogView> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogView;
  }

  /**
   * Lists views on a log bucket.
   *
   * @param parent Required. The bucket whose views are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" 
   */
  async foldersLocationsBucketsViewsList(parent: string, opts: FoldersLocationsBucketsViewsListOptions = {}): Promise<ListViewsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/views`);
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
    return data as ListViewsResponse;
  }

  /**
   * Lists the logs in projects, organizations, folders, or billing accounts.
   * Only logs that have entries are listed.
   *
   * @param parent Required. The resource name that owns the logs: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]
   */
  async foldersLocationsBucketsViewsLogsList(parent: string, opts: FoldersLocationsBucketsViewsLogsListOptions = {}): Promise<ListLogsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/logs`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.resourceNames !== undefined) {
      url.searchParams.append("resourceNames", String(opts.resourceNames));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListLogsResponse;
  }

  /**
   * Updates a view on a log bucket. This method replaces the following fields
   * in the existing view with values from the new view: filter. If an
   * UNAVAILABLE error is returned, this indicates that system is not in a state
   * where it can update the view. If this occurs, please try again in a few
   * minutes.
   *
   * @param name Required. The full resource name of the view to update "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async foldersLocationsBucketsViewsPatch(name: string, req: LogView, opts: FoldersLocationsBucketsViewsPatchOptions = {}): Promise<LogView> {
    opts = serializeFoldersLocationsBucketsViewsPatchOptions(opts);
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
    return data as LogView;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async foldersLocationsGet(name: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Location;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async foldersLocationsList(name: string, opts: FoldersLocationsListOptions = {}): Promise<ListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/locations`);
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
   * google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * Code.CANCELLED.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async foldersLocationsOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
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
  async foldersLocationsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns UNIMPLEMENTED.
   *
   * @param name The name of the operation's parent resource.
   */
  async foldersLocationsOperationsList(name: string, opts: FoldersLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
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
    return data as ListOperationsResponse;
  }

  /**
   * Deletes all the log entries in a log for the _Default Log Bucket. The log
   * reappears if it receives new entries. Log entries written shortly before
   * the delete operation might not be deleted. Entries received after the
   * delete operation with a timestamp before the operation will be deleted.
   *
   * @param logName Required. The resource name of the log to delete: projects/[PROJECT_ID]/logs/[LOG_ID] organizations/[ORGANIZATION_ID]/logs/[LOG_ID] billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID] folders/[FOLDER_ID]/logs/[LOG_ID][LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/123/logs/cloudaudit.googleapis.com%2Factivity".For more information about log names, see LogEntry.
   */
  async foldersLogsDelete(logName: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ logName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists the logs in projects, organizations, folders, or billing accounts.
   * Only logs that have entries are listed.
   *
   * @param parent Required. The resource name that owns the logs: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]
   */
  async foldersLogsList(parent: string, opts: FoldersLogsListOptions = {}): Promise<ListLogsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/logs`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.resourceNames !== undefined) {
      url.searchParams.append("resourceNames", String(opts.resourceNames));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListLogsResponse;
  }

  /**
   * Creates a sink that exports specified log entries to a destination. The
   * export of newly-ingested log entries begins immediately, unless the sink's
   * writer_identity is not permitted to write to the destination. A sink can
   * export log entries only from the resource owning the sink.
   *
   * @param parent Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-project" "organizations/123456789"
   */
  async foldersSinksCreate(parent: string, req: LogSink, opts: FoldersSinksCreateOptions = {}): Promise<LogSink> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/sinks`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogSink;
  }

  /**
   * Deletes a sink. If the sink has a unique writer_identity, then that
   * service account is also deleted.
   *
   * @param sinkName Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async foldersSinksDelete(sinkName: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a sink.
   *
   * @param sinkName Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async foldersSinksGet(sinkName: string): Promise<LogSink> {
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogSink;
  }

  /**
   * Lists sinks.
   *
   * @param parent Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" 
   */
  async foldersSinksList(parent: string, opts: FoldersSinksListOptions = {}): Promise<ListSinksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/sinks`);
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
    return data as ListSinksResponse;
  }

  /**
   * Updates a sink. This method replaces the following fields in the existing
   * sink with values from the new sink: destination, and filter.The updated
   * sink might also have a new writer_identity; see the unique_writer_identity
   * field.
   *
   * @param sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async foldersSinksPatch(sinkName: string, req: LogSink, opts: FoldersSinksPatchOptions = {}): Promise<LogSink> {
    opts = serializeFoldersSinksPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
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
    return data as LogSink;
  }

  /**
   * Updates a sink. This method replaces the following fields in the existing
   * sink with values from the new sink: destination, and filter.The updated
   * sink might also have a new writer_identity; see the unique_writer_identity
   * field.
   *
   * @param sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async foldersSinksUpdate(sinkName: string, req: LogSink, opts: FoldersSinksUpdateOptions = {}): Promise<LogSink> {
    opts = serializeFoldersSinksUpdateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as LogSink;
  }

  /**
   * Updates the Log Router settings for the given resource.Note: Settings for
   * the Log Router can currently only be configured for Google Cloud
   * organizations. Once configured, it applies to all projects and folders in
   * the Google Cloud organization.UpdateSettings will fail if 1) kms_key_name
   * is invalid, or 2) the associated service account does not have the required
   * roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key, or 3)
   * access to the key is disabled. 4) location_id is not supported by Logging.
   * 5) location_id violate OrgPolicy.See Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   *
   * @param name Required. The resource name for the settings to update. "organizations/[ORGANIZATION_ID]/settings" For example:"organizations/12345/settings"Note: Settings for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization.
   */
  async foldersUpdateSettings(name: string, req: Settings, opts: FoldersUpdateSettingsOptions = {}): Promise<Settings> {
    opts = serializeFoldersUpdateSettingsOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }/settings`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Settings;
  }

  /**
   * Creates a log bucket that can be used to store log entries. After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param parent Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global"
   */
  async locationsBucketsCreate(parent: string, req: LogBucket, opts: LocationsBucketsCreateOptions = {}): Promise<LogBucket> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets`);
    if (opts.bucketId !== undefined) {
      url.searchParams.append("bucketId", String(opts.bucketId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogBucket;
  }

  /**
   * Creates a log bucket asynchronously that can be used to store log
   * entries.After a bucket has been created, the bucket's location cannot be
   * changed.
   *
   * @param parent Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global"
   */
  async locationsBucketsCreateAsync(parent: string, req: LogBucket, opts: LocationsBucketsCreateAsyncOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets:createAsync`);
    if (opts.bucketId !== undefined) {
      url.searchParams.append("bucketId", String(opts.bucketId));
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
   * Deletes a log bucket.Changes the bucket's lifecycle_state to the
   * DELETE_REQUESTED state. After 7 days, the bucket will be purged and all log
   * entries in the bucket will be permanently deleted.
   *
   * @param name Required. The full resource name of the bucket to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async locationsBucketsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a log bucket.
   *
   * @param name Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async locationsBucketsGet(name: string): Promise<LogBucket> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogBucket;
  }

  /**
   * Asynchronously creates linked dataset in BigQuery which makes it possible
   * to use BugQuery to read the logs stored in the bucket. A bucket may
   * currently only contain one link.
   *
   * @param parent Required. The full resource name of the bucket to create a link for. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" 
   */
  async locationsBucketsLinksCreate(parent: string, req: Link, opts: LocationsBucketsLinksCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/links`);
    if (opts.linkId !== undefined) {
      url.searchParams.append("linkId", String(opts.linkId));
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
   * Deletes a link. This will also delete the corresponding BigQuery linked
   * dataset.
   *
   * @param name Required. The full resource name of the link to delete."projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID"
   */
  async locationsBucketsLinksDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a link.
   *
   * @param name Required. The resource name of the link:"projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID
   */
  async locationsBucketsLinksGet(name: string): Promise<Link> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Link;
  }

  /**
   * Lists links.
   *
   * @param parent Required. The parent resource whose links are to be listed:"projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/
   */
  async locationsBucketsLinksList(parent: string, opts: LocationsBucketsLinksListOptions = {}): Promise<ListLinksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/links`);
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
    return data as ListLinksResponse;
  }

  /**
   * Lists log buckets.
   *
   * @param parent Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
   */
  async locationsBucketsList(parent: string, opts: LocationsBucketsListOptions = {}): Promise<ListBucketsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets`);
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
    return data as ListBucketsResponse;
  }

  /**
   * Updates a log bucket.If the bucket has a lifecycle_state of
   * DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async locationsBucketsPatch(name: string, req: LogBucket, opts: LocationsBucketsPatchOptions = {}): Promise<LogBucket> {
    opts = serializeLocationsBucketsPatchOptions(opts);
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
    return data as LogBucket;
  }

  /**
   * Undeletes a log bucket. A bucket that has been deleted can be undeleted
   * within the grace period of 7 days.
   *
   * @param name Required. The full resource name of the bucket to undelete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async locationsBucketsUndelete(name: string, req: UndeleteBucketRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Updates a log bucket asynchronously.If the bucket has a lifecycle_state of
   * DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async locationsBucketsUpdateAsync(name: string, req: LogBucket, opts: LocationsBucketsUpdateAsyncOptions = {}): Promise<Operation> {
    opts = serializeLocationsBucketsUpdateAsyncOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }:updateAsync`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
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
   * Creates a view over log entries in a log bucket. A bucket may contain a
   * maximum of 30 views.
   *
   * @param parent Required. The bucket in which to create the view `"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"` For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async locationsBucketsViewsCreate(parent: string, req: LogView, opts: LocationsBucketsViewsCreateOptions = {}): Promise<LogView> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/views`);
    if (opts.viewId !== undefined) {
      url.searchParams.append("viewId", String(opts.viewId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogView;
  }

  /**
   * Deletes a view on a log bucket. If an UNAVAILABLE error is returned, this
   * indicates that system is not in a state where it can delete the view. If
   * this occurs, please try again in a few minutes.
   *
   * @param name Required. The full resource name of the view to delete: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async locationsBucketsViewsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a view on a log bucket..
   *
   * @param name Required. The resource name of the policy: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async locationsBucketsViewsGet(name: string): Promise<LogView> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogView;
  }

  /**
   * Lists views on a log bucket.
   *
   * @param parent Required. The bucket whose views are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" 
   */
  async locationsBucketsViewsList(parent: string, opts: LocationsBucketsViewsListOptions = {}): Promise<ListViewsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/views`);
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
    return data as ListViewsResponse;
  }

  /**
   * Updates a view on a log bucket. This method replaces the following fields
   * in the existing view with values from the new view: filter. If an
   * UNAVAILABLE error is returned, this indicates that system is not in a state
   * where it can update the view. If this occurs, please try again in a few
   * minutes.
   *
   * @param name Required. The full resource name of the view to update "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async locationsBucketsViewsPatch(name: string, req: LogView, opts: LocationsBucketsViewsPatchOptions = {}): Promise<LogView> {
    opts = serializeLocationsBucketsViewsPatchOptions(opts);
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
    return data as LogView;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async locationsGet(name: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Location;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async locationsList(name: string, opts: LocationsListOptions = {}): Promise<ListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/locations`);
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
   * google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * Code.CANCELLED.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async locationsOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
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
  async locationsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns UNIMPLEMENTED.
   *
   * @param name The name of the operation's parent resource.
   */
  async locationsOperationsList(name: string, opts: LocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
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
    return data as ListOperationsResponse;
  }

  /**
   * Deletes all the log entries in a log for the _Default Log Bucket. The log
   * reappears if it receives new entries. Log entries written shortly before
   * the delete operation might not be deleted. Entries received after the
   * delete operation with a timestamp before the operation will be deleted.
   *
   * @param logName Required. The resource name of the log to delete: projects/[PROJECT_ID]/logs/[LOG_ID] organizations/[ORGANIZATION_ID]/logs/[LOG_ID] billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID] folders/[FOLDER_ID]/logs/[LOG_ID][LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/123/logs/cloudaudit.googleapis.com%2Factivity".For more information about log names, see LogEntry.
   */
  async logsDelete(logName: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ logName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists the logs in projects, organizations, folders, or billing accounts.
   * Only logs that have entries are listed.
   *
   * @param parent Required. The resource name that owns the logs: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]
   */
  async logsList(parent: string, opts: LogsListOptions = {}): Promise<ListLogsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/logs`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.resourceNames !== undefined) {
      url.searchParams.append("resourceNames", String(opts.resourceNames));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListLogsResponse;
  }

  /**
   * Lists the descriptors for monitored resource types used by Logging.
   *
   */
  async monitoredResourceDescriptorsList(opts: MonitoredResourceDescriptorsListOptions = {}): Promise<ListMonitoredResourceDescriptorsResponse> {
    const url = new URL(`${this.#baseUrl}v2/monitoredResourceDescriptors`);
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
    return data as ListMonitoredResourceDescriptorsResponse;
  }

  /**
   * Creates a new exclusion in the _Default sink in a specified parent
   * resource. Only log entries belonging to that resource can be excluded. You
   * can have up to 10 exclusions in a resource.
   *
   * @param parent Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-logging-project" "organizations/123456789"
   */
  async organizationsExclusionsCreate(parent: string, req: LogExclusion): Promise<LogExclusion> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/exclusions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogExclusion;
  }

  /**
   * Deletes an exclusion in the _Default sink.
   *
   * @param name Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async organizationsExclusionsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the description of an exclusion in the _Default sink.
   *
   * @param name Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async organizationsExclusionsGet(name: string): Promise<LogExclusion> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogExclusion;
  }

  /**
   * Lists all the exclusions on the _Default sink in a parent resource.
   *
   * @param parent Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" 
   */
  async organizationsExclusionsList(parent: string, opts: OrganizationsExclusionsListOptions = {}): Promise<ListExclusionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/exclusions`);
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
    return data as ListExclusionsResponse;
  }

  /**
   * Changes one or more properties of an existing exclusion in the _Default
   * sink.
   *
   * @param name Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async organizationsExclusionsPatch(name: string, req: LogExclusion, opts: OrganizationsExclusionsPatchOptions = {}): Promise<LogExclusion> {
    opts = serializeOrganizationsExclusionsPatchOptions(opts);
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
    return data as LogExclusion;
  }

  /**
   * Gets the Logging CMEK settings for the given resource.Note: CMEK for the
   * Log Router can be configured for Google Cloud projects, folders,
   * organizations and billing accounts. Once configured for an organization, it
   * applies to all projects and folders in the Google Cloud organization.See
   * Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   *
   * @param name Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.
   */
  async organizationsGetCmekSettings(name: string): Promise<CmekSettings> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/cmekSettings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CmekSettings;
  }

  /**
   * Gets the Log Router settings for the given resource.Note: Settings for the
   * Log Router can be get for Google Cloud projects, folders, organizations and
   * billing accounts. Currently it can only be configured for organizations.
   * Once configured for an organization, it applies to all projects and folders
   * in the Google Cloud organization.See Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   *
   * @param name Required. The resource for which to retrieve settings. "projects/[PROJECT_ID]/settings" "organizations/[ORGANIZATION_ID]/settings" "billingAccounts/[BILLING_ACCOUNT_ID]/settings" "folders/[FOLDER_ID]/settings" For example:"organizations/12345/settings"Note: Settings for the Log Router can be get for Google Cloud projects, folders, organizations and billing accounts. Currently it can only be configured for organizations. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.
   */
  async organizationsGetSettings(name: string): Promise<Settings> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/settings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Settings;
  }

  /**
   * Creates a log bucket that can be used to store log entries. After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param parent Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global"
   */
  async organizationsLocationsBucketsCreate(parent: string, req: LogBucket, opts: OrganizationsLocationsBucketsCreateOptions = {}): Promise<LogBucket> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets`);
    if (opts.bucketId !== undefined) {
      url.searchParams.append("bucketId", String(opts.bucketId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogBucket;
  }

  /**
   * Creates a log bucket asynchronously that can be used to store log
   * entries.After a bucket has been created, the bucket's location cannot be
   * changed.
   *
   * @param parent Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global"
   */
  async organizationsLocationsBucketsCreateAsync(parent: string, req: LogBucket, opts: OrganizationsLocationsBucketsCreateAsyncOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets:createAsync`);
    if (opts.bucketId !== undefined) {
      url.searchParams.append("bucketId", String(opts.bucketId));
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
   * Deletes a log bucket.Changes the bucket's lifecycle_state to the
   * DELETE_REQUESTED state. After 7 days, the bucket will be purged and all log
   * entries in the bucket will be permanently deleted.
   *
   * @param name Required. The full resource name of the bucket to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async organizationsLocationsBucketsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a log bucket.
   *
   * @param name Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async organizationsLocationsBucketsGet(name: string): Promise<LogBucket> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogBucket;
  }

  /**
   * Asynchronously creates linked dataset in BigQuery which makes it possible
   * to use BugQuery to read the logs stored in the bucket. A bucket may
   * currently only contain one link.
   *
   * @param parent Required. The full resource name of the bucket to create a link for. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" 
   */
  async organizationsLocationsBucketsLinksCreate(parent: string, req: Link, opts: OrganizationsLocationsBucketsLinksCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/links`);
    if (opts.linkId !== undefined) {
      url.searchParams.append("linkId", String(opts.linkId));
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
   * Deletes a link. This will also delete the corresponding BigQuery linked
   * dataset.
   *
   * @param name Required. The full resource name of the link to delete."projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID"
   */
  async organizationsLocationsBucketsLinksDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a link.
   *
   * @param name Required. The resource name of the link:"projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID
   */
  async organizationsLocationsBucketsLinksGet(name: string): Promise<Link> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Link;
  }

  /**
   * Lists links.
   *
   * @param parent Required. The parent resource whose links are to be listed:"projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/
   */
  async organizationsLocationsBucketsLinksList(parent: string, opts: OrganizationsLocationsBucketsLinksListOptions = {}): Promise<ListLinksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/links`);
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
    return data as ListLinksResponse;
  }

  /**
   * Lists log buckets.
   *
   * @param parent Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
   */
  async organizationsLocationsBucketsList(parent: string, opts: OrganizationsLocationsBucketsListOptions = {}): Promise<ListBucketsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets`);
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
    return data as ListBucketsResponse;
  }

  /**
   * Updates a log bucket.If the bucket has a lifecycle_state of
   * DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async organizationsLocationsBucketsPatch(name: string, req: LogBucket, opts: OrganizationsLocationsBucketsPatchOptions = {}): Promise<LogBucket> {
    opts = serializeOrganizationsLocationsBucketsPatchOptions(opts);
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
    return data as LogBucket;
  }

  /**
   * Undeletes a log bucket. A bucket that has been deleted can be undeleted
   * within the grace period of 7 days.
   *
   * @param name Required. The full resource name of the bucket to undelete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async organizationsLocationsBucketsUndelete(name: string, req: UndeleteBucketRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Updates a log bucket asynchronously.If the bucket has a lifecycle_state of
   * DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async organizationsLocationsBucketsUpdateAsync(name: string, req: LogBucket, opts: OrganizationsLocationsBucketsUpdateAsyncOptions = {}): Promise<Operation> {
    opts = serializeOrganizationsLocationsBucketsUpdateAsyncOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }:updateAsync`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
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
   * Creates a view over log entries in a log bucket. A bucket may contain a
   * maximum of 30 views.
   *
   * @param parent Required. The bucket in which to create the view `"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"` For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async organizationsLocationsBucketsViewsCreate(parent: string, req: LogView, opts: OrganizationsLocationsBucketsViewsCreateOptions = {}): Promise<LogView> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/views`);
    if (opts.viewId !== undefined) {
      url.searchParams.append("viewId", String(opts.viewId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogView;
  }

  /**
   * Deletes a view on a log bucket. If an UNAVAILABLE error is returned, this
   * indicates that system is not in a state where it can delete the view. If
   * this occurs, please try again in a few minutes.
   *
   * @param name Required. The full resource name of the view to delete: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async organizationsLocationsBucketsViewsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a view on a log bucket..
   *
   * @param name Required. The resource name of the policy: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async organizationsLocationsBucketsViewsGet(name: string): Promise<LogView> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogView;
  }

  /**
   * Lists views on a log bucket.
   *
   * @param parent Required. The bucket whose views are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" 
   */
  async organizationsLocationsBucketsViewsList(parent: string, opts: OrganizationsLocationsBucketsViewsListOptions = {}): Promise<ListViewsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/views`);
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
    return data as ListViewsResponse;
  }

  /**
   * Lists the logs in projects, organizations, folders, or billing accounts.
   * Only logs that have entries are listed.
   *
   * @param parent Required. The resource name that owns the logs: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]
   */
  async organizationsLocationsBucketsViewsLogsList(parent: string, opts: OrganizationsLocationsBucketsViewsLogsListOptions = {}): Promise<ListLogsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/logs`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.resourceNames !== undefined) {
      url.searchParams.append("resourceNames", String(opts.resourceNames));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListLogsResponse;
  }

  /**
   * Updates a view on a log bucket. This method replaces the following fields
   * in the existing view with values from the new view: filter. If an
   * UNAVAILABLE error is returned, this indicates that system is not in a state
   * where it can update the view. If this occurs, please try again in a few
   * minutes.
   *
   * @param name Required. The full resource name of the view to update "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async organizationsLocationsBucketsViewsPatch(name: string, req: LogView, opts: OrganizationsLocationsBucketsViewsPatchOptions = {}): Promise<LogView> {
    opts = serializeOrganizationsLocationsBucketsViewsPatchOptions(opts);
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
    return data as LogView;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async organizationsLocationsGet(name: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Location;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async organizationsLocationsList(name: string, opts: OrganizationsLocationsListOptions = {}): Promise<ListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/locations`);
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
   * google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * Code.CANCELLED.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async organizationsLocationsOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
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
  async organizationsLocationsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns UNIMPLEMENTED.
   *
   * @param name The name of the operation's parent resource.
   */
  async organizationsLocationsOperationsList(name: string, opts: OrganizationsLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
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
    return data as ListOperationsResponse;
  }

  /**
   * Deletes all the log entries in a log for the _Default Log Bucket. The log
   * reappears if it receives new entries. Log entries written shortly before
   * the delete operation might not be deleted. Entries received after the
   * delete operation with a timestamp before the operation will be deleted.
   *
   * @param logName Required. The resource name of the log to delete: projects/[PROJECT_ID]/logs/[LOG_ID] organizations/[ORGANIZATION_ID]/logs/[LOG_ID] billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID] folders/[FOLDER_ID]/logs/[LOG_ID][LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/123/logs/cloudaudit.googleapis.com%2Factivity".For more information about log names, see LogEntry.
   */
  async organizationsLogsDelete(logName: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ logName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists the logs in projects, organizations, folders, or billing accounts.
   * Only logs that have entries are listed.
   *
   * @param parent Required. The resource name that owns the logs: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]
   */
  async organizationsLogsList(parent: string, opts: OrganizationsLogsListOptions = {}): Promise<ListLogsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/logs`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.resourceNames !== undefined) {
      url.searchParams.append("resourceNames", String(opts.resourceNames));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListLogsResponse;
  }

  /**
   * Creates a sink that exports specified log entries to a destination. The
   * export of newly-ingested log entries begins immediately, unless the sink's
   * writer_identity is not permitted to write to the destination. A sink can
   * export log entries only from the resource owning the sink.
   *
   * @param parent Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-project" "organizations/123456789"
   */
  async organizationsSinksCreate(parent: string, req: LogSink, opts: OrganizationsSinksCreateOptions = {}): Promise<LogSink> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/sinks`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogSink;
  }

  /**
   * Deletes a sink. If the sink has a unique writer_identity, then that
   * service account is also deleted.
   *
   * @param sinkName Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async organizationsSinksDelete(sinkName: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a sink.
   *
   * @param sinkName Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async organizationsSinksGet(sinkName: string): Promise<LogSink> {
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogSink;
  }

  /**
   * Lists sinks.
   *
   * @param parent Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" 
   */
  async organizationsSinksList(parent: string, opts: OrganizationsSinksListOptions = {}): Promise<ListSinksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/sinks`);
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
    return data as ListSinksResponse;
  }

  /**
   * Updates a sink. This method replaces the following fields in the existing
   * sink with values from the new sink: destination, and filter.The updated
   * sink might also have a new writer_identity; see the unique_writer_identity
   * field.
   *
   * @param sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async organizationsSinksPatch(sinkName: string, req: LogSink, opts: OrganizationsSinksPatchOptions = {}): Promise<LogSink> {
    opts = serializeOrganizationsSinksPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
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
    return data as LogSink;
  }

  /**
   * Updates a sink. This method replaces the following fields in the existing
   * sink with values from the new sink: destination, and filter.The updated
   * sink might also have a new writer_identity; see the unique_writer_identity
   * field.
   *
   * @param sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async organizationsSinksUpdate(sinkName: string, req: LogSink, opts: OrganizationsSinksUpdateOptions = {}): Promise<LogSink> {
    opts = serializeOrganizationsSinksUpdateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as LogSink;
  }

  /**
   * Updates the Log Router CMEK settings for the given resource.Note: CMEK for
   * the Log Router can currently only be configured for Google Cloud
   * organizations. Once configured, it applies to all projects and folders in
   * the Google Cloud organization.UpdateCmekSettings will fail if 1)
   * kms_key_name is invalid, or 2) the associated service account does not have
   * the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for
   * the key, or 3) access to the key is disabled.See Enabling CMEK for Log
   * Router (https://cloud.google.com/logging/docs/routing/managed-encryption)
   * for more information.
   *
   * @param name Required. The resource name for the CMEK settings to update. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization.
   */
  async organizationsUpdateCmekSettings(name: string, req: CmekSettings, opts: OrganizationsUpdateCmekSettingsOptions = {}): Promise<CmekSettings> {
    opts = serializeOrganizationsUpdateCmekSettingsOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }/cmekSettings`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as CmekSettings;
  }

  /**
   * Updates the Log Router settings for the given resource.Note: Settings for
   * the Log Router can currently only be configured for Google Cloud
   * organizations. Once configured, it applies to all projects and folders in
   * the Google Cloud organization.UpdateSettings will fail if 1) kms_key_name
   * is invalid, or 2) the associated service account does not have the required
   * roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key, or 3)
   * access to the key is disabled. 4) location_id is not supported by Logging.
   * 5) location_id violate OrgPolicy.See Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   *
   * @param name Required. The resource name for the settings to update. "organizations/[ORGANIZATION_ID]/settings" For example:"organizations/12345/settings"Note: Settings for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization.
   */
  async organizationsUpdateSettings(name: string, req: Settings, opts: OrganizationsUpdateSettingsOptions = {}): Promise<Settings> {
    opts = serializeOrganizationsUpdateSettingsOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }/settings`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Settings;
  }

  /**
   * Creates a new exclusion in the _Default sink in a specified parent
   * resource. Only log entries belonging to that resource can be excluded. You
   * can have up to 10 exclusions in a resource.
   *
   * @param parent Required. The parent resource in which to create the exclusion: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-logging-project" "organizations/123456789"
   */
  async projectsExclusionsCreate(parent: string, req: LogExclusion): Promise<LogExclusion> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/exclusions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogExclusion;
  }

  /**
   * Deletes an exclusion in the _Default sink.
   *
   * @param name Required. The resource name of an existing exclusion to delete: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async projectsExclusionsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the description of an exclusion in the _Default sink.
   *
   * @param name Required. The resource name of an existing exclusion: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async projectsExclusionsGet(name: string): Promise<LogExclusion> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogExclusion;
  }

  /**
   * Lists all the exclusions on the _Default sink in a parent resource.
   *
   * @param parent Required. The parent resource whose exclusions are to be listed. "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" 
   */
  async projectsExclusionsList(parent: string, opts: ProjectsExclusionsListOptions = {}): Promise<ListExclusionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/exclusions`);
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
    return data as ListExclusionsResponse;
  }

  /**
   * Changes one or more properties of an existing exclusion in the _Default
   * sink.
   *
   * @param name Required. The resource name of the exclusion to update: "projects/[PROJECT_ID]/exclusions/[EXCLUSION_ID]" "organizations/[ORGANIZATION_ID]/exclusions/[EXCLUSION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/exclusions/[EXCLUSION_ID]" "folders/[FOLDER_ID]/exclusions/[EXCLUSION_ID]" For example:"projects/my-project/exclusions/my-exclusion"
   */
  async projectsExclusionsPatch(name: string, req: LogExclusion, opts: ProjectsExclusionsPatchOptions = {}): Promise<LogExclusion> {
    opts = serializeProjectsExclusionsPatchOptions(opts);
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
    return data as LogExclusion;
  }

  /**
   * Gets the Logging CMEK settings for the given resource.Note: CMEK for the
   * Log Router can be configured for Google Cloud projects, folders,
   * organizations and billing accounts. Once configured for an organization, it
   * applies to all projects and folders in the Google Cloud organization.See
   * Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   *
   * @param name Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.
   */
  async projectsGetCmekSettings(name: string): Promise<CmekSettings> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/cmekSettings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CmekSettings;
  }

  /**
   * Gets the Log Router settings for the given resource.Note: Settings for the
   * Log Router can be get for Google Cloud projects, folders, organizations and
   * billing accounts. Currently it can only be configured for organizations.
   * Once configured for an organization, it applies to all projects and folders
   * in the Google Cloud organization.See Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   *
   * @param name Required. The resource for which to retrieve settings. "projects/[PROJECT_ID]/settings" "organizations/[ORGANIZATION_ID]/settings" "billingAccounts/[BILLING_ACCOUNT_ID]/settings" "folders/[FOLDER_ID]/settings" For example:"organizations/12345/settings"Note: Settings for the Log Router can be get for Google Cloud projects, folders, organizations and billing accounts. Currently it can only be configured for organizations. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.
   */
  async projectsGetSettings(name: string): Promise<Settings> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/settings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Settings;
  }

  /**
   * Creates a log bucket that can be used to store log entries. After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param parent Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global"
   */
  async projectsLocationsBucketsCreate(parent: string, req: LogBucket, opts: ProjectsLocationsBucketsCreateOptions = {}): Promise<LogBucket> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets`);
    if (opts.bucketId !== undefined) {
      url.searchParams.append("bucketId", String(opts.bucketId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogBucket;
  }

  /**
   * Creates a log bucket asynchronously that can be used to store log
   * entries.After a bucket has been created, the bucket's location cannot be
   * changed.
   *
   * @param parent Required. The resource in which to create the log bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For example:"projects/my-project/locations/global"
   */
  async projectsLocationsBucketsCreateAsync(parent: string, req: LogBucket, opts: ProjectsLocationsBucketsCreateAsyncOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets:createAsync`);
    if (opts.bucketId !== undefined) {
      url.searchParams.append("bucketId", String(opts.bucketId));
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
   * Deletes a log bucket.Changes the bucket's lifecycle_state to the
   * DELETE_REQUESTED state. After 7 days, the bucket will be purged and all log
   * entries in the bucket will be permanently deleted.
   *
   * @param name Required. The full resource name of the bucket to delete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async projectsLocationsBucketsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a log bucket.
   *
   * @param name Required. The resource name of the bucket: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async projectsLocationsBucketsGet(name: string): Promise<LogBucket> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogBucket;
  }

  /**
   * Asynchronously creates linked dataset in BigQuery which makes it possible
   * to use BugQuery to read the logs stored in the bucket. A bucket may
   * currently only contain one link.
   *
   * @param parent Required. The full resource name of the bucket to create a link for. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" 
   */
  async projectsLocationsBucketsLinksCreate(parent: string, req: Link, opts: ProjectsLocationsBucketsLinksCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/links`);
    if (opts.linkId !== undefined) {
      url.searchParams.append("linkId", String(opts.linkId));
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
   * Deletes a link. This will also delete the corresponding BigQuery linked
   * dataset.
   *
   * @param name Required. The full resource name of the link to delete."projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID"
   */
  async projectsLocationsBucketsLinksDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a link.
   *
   * @param name Required. The resource name of the link:"projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID
   */
  async projectsLocationsBucketsLinksGet(name: string): Promise<Link> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Link;
  }

  /**
   * Lists links.
   *
   * @param parent Required. The parent resource whose links are to be listed:"projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/" "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/" "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/" "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/
   */
  async projectsLocationsBucketsLinksList(parent: string, opts: ProjectsLocationsBucketsLinksListOptions = {}): Promise<ListLinksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/links`);
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
    return data as ListLinksResponse;
  }

  /**
   * Lists log buckets.
   *
   * @param parent Required. The parent resource whose buckets are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]" Note: The locations portion of the resource must be specified, but supplying the character - in place of LOCATION_ID will return all buckets.
   */
  async projectsLocationsBucketsList(parent: string, opts: ProjectsLocationsBucketsListOptions = {}): Promise<ListBucketsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/buckets`);
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
    return data as ListBucketsResponse;
  }

  /**
   * Updates a log bucket.If the bucket has a lifecycle_state of
   * DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async projectsLocationsBucketsPatch(name: string, req: LogBucket, opts: ProjectsLocationsBucketsPatchOptions = {}): Promise<LogBucket> {
    opts = serializeProjectsLocationsBucketsPatchOptions(opts);
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
    return data as LogBucket;
  }

  /**
   * Undeletes a log bucket. A bucket that has been deleted can be undeleted
   * within the grace period of 7 days.
   *
   * @param name Required. The full resource name of the bucket to undelete. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async projectsLocationsBucketsUndelete(name: string, req: UndeleteBucketRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Updates a log bucket asynchronously.If the bucket has a lifecycle_state of
   * DELETE_REQUESTED, then FAILED_PRECONDITION will be returned.After a bucket
   * has been created, the bucket's location cannot be changed.
   *
   * @param name Required. The full resource name of the bucket to update. "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async projectsLocationsBucketsUpdateAsync(name: string, req: LogBucket, opts: ProjectsLocationsBucketsUpdateAsyncOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsBucketsUpdateAsyncOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }:updateAsync`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
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
   * Creates a view over log entries in a log bucket. A bucket may contain a
   * maximum of 30 views.
   *
   * @param parent Required. The bucket in which to create the view `"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"` For example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  async projectsLocationsBucketsViewsCreate(parent: string, req: LogView, opts: ProjectsLocationsBucketsViewsCreateOptions = {}): Promise<LogView> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/views`);
    if (opts.viewId !== undefined) {
      url.searchParams.append("viewId", String(opts.viewId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogView;
  }

  /**
   * Deletes a view on a log bucket. If an UNAVAILABLE error is returned, this
   * indicates that system is not in a state where it can delete the view. If
   * this occurs, please try again in a few minutes.
   *
   * @param name Required. The full resource name of the view to delete: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async projectsLocationsBucketsViewsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a view on a log bucket..
   *
   * @param name Required. The resource name of the policy: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async projectsLocationsBucketsViewsGet(name: string): Promise<LogView> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogView;
  }

  /**
   * Lists views on a log bucket.
   *
   * @param parent Required. The bucket whose views are to be listed: "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" 
   */
  async projectsLocationsBucketsViewsList(parent: string, opts: ProjectsLocationsBucketsViewsListOptions = {}): Promise<ListViewsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/views`);
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
    return data as ListViewsResponse;
  }

  /**
   * Lists the logs in projects, organizations, folders, or billing accounts.
   * Only logs that have entries are listed.
   *
   * @param parent Required. The resource name that owns the logs: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]
   */
  async projectsLocationsBucketsViewsLogsList(parent: string, opts: ProjectsLocationsBucketsViewsLogsListOptions = {}): Promise<ListLogsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/logs`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.resourceNames !== undefined) {
      url.searchParams.append("resourceNames", String(opts.resourceNames));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListLogsResponse;
  }

  /**
   * Updates a view on a log bucket. This method replaces the following fields
   * in the existing view with values from the new view: filter. If an
   * UNAVAILABLE error is returned, this indicates that system is not in a state
   * where it can update the view. If this occurs, please try again in a few
   * minutes.
   *
   * @param name Required. The full resource name of the view to update "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]" For example:"projects/my-project/locations/global/buckets/my-bucket/views/my-view"
   */
  async projectsLocationsBucketsViewsPatch(name: string, req: LogView, opts: ProjectsLocationsBucketsViewsPatchOptions = {}): Promise<LogView> {
    opts = serializeProjectsLocationsBucketsViewsPatchOptions(opts);
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
    return data as LogView;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Location;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async projectsLocationsList(name: string, opts: ProjectsLocationsListOptions = {}): Promise<ListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/locations`);
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
   * google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * Code.CANCELLED.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async projectsLocationsOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
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
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns UNIMPLEMENTED.
   *
   * @param name The name of the operation's parent resource.
   */
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
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
    return data as ListOperationsResponse;
  }

  /**
   * Deletes all the log entries in a log for the _Default Log Bucket. The log
   * reappears if it receives new entries. Log entries written shortly before
   * the delete operation might not be deleted. Entries received after the
   * delete operation with a timestamp before the operation will be deleted.
   *
   * @param logName Required. The resource name of the log to delete: projects/[PROJECT_ID]/logs/[LOG_ID] organizations/[ORGANIZATION_ID]/logs/[LOG_ID] billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID] folders/[FOLDER_ID]/logs/[LOG_ID][LOG_ID] must be URL-encoded. For example, "projects/my-project-id/logs/syslog", "organizations/123/logs/cloudaudit.googleapis.com%2Factivity".For more information about log names, see LogEntry.
   */
  async projectsLogsDelete(logName: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ logName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists the logs in projects, organizations, folders, or billing accounts.
   * Only logs that have entries are listed.
   *
   * @param parent Required. The resource name that owns the logs: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]
   */
  async projectsLogsList(parent: string, opts: ProjectsLogsListOptions = {}): Promise<ListLogsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/logs`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.resourceNames !== undefined) {
      url.searchParams.append("resourceNames", String(opts.resourceNames));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListLogsResponse;
  }

  /**
   * Creates a logs-based metric.
   *
   * @param parent Required. The resource name of the project in which to create the metric: "projects/[PROJECT_ID]" The new metric must be provided in the request.
   */
  async projectsMetricsCreate(parent: string, req: LogMetric): Promise<LogMetric> {
    req = serializeLogMetric(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/metrics`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLogMetric(data);
  }

  /**
   * Deletes a logs-based metric.
   *
   * @param metricName Required. The resource name of the metric to delete: "projects/[PROJECT_ID]/metrics/[METRIC_ID]" 
   */
  async projectsMetricsDelete(metricName: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ metricName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a logs-based metric.
   *
   * @param metricName Required. The resource name of the desired metric: "projects/[PROJECT_ID]/metrics/[METRIC_ID]" 
   */
  async projectsMetricsGet(metricName: string): Promise<LogMetric> {
    const url = new URL(`${this.#baseUrl}v2/${ metricName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLogMetric(data);
  }

  /**
   * Lists logs-based metrics.
   *
   * @param parent Required. The name of the project containing the metrics: "projects/[PROJECT_ID]" 
   */
  async projectsMetricsList(parent: string, opts: ProjectsMetricsListOptions = {}): Promise<ListLogMetricsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/metrics`);
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
    return deserializeListLogMetricsResponse(data);
  }

  /**
   * Creates or updates a logs-based metric.
   *
   * @param metricName Required. The resource name of the metric to update: "projects/[PROJECT_ID]/metrics/[METRIC_ID]" The updated metric must be provided in the request and it's name field must be the same as [METRIC_ID] If the metric does not exist in [PROJECT_ID], then a new metric is created.
   */
  async projectsMetricsUpdate(metricName: string, req: LogMetric): Promise<LogMetric> {
    req = serializeLogMetric(req);
    const url = new URL(`${this.#baseUrl}v2/${ metricName }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeLogMetric(data);
  }

  /**
   * Creates a sink that exports specified log entries to a destination. The
   * export of newly-ingested log entries begins immediately, unless the sink's
   * writer_identity is not permitted to write to the destination. A sink can
   * export log entries only from the resource owning the sink.
   *
   * @param parent Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-project" "organizations/123456789"
   */
  async projectsSinksCreate(parent: string, req: LogSink, opts: ProjectsSinksCreateOptions = {}): Promise<LogSink> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/sinks`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogSink;
  }

  /**
   * Deletes a sink. If the sink has a unique writer_identity, then that
   * service account is also deleted.
   *
   * @param sinkName Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async projectsSinksDelete(sinkName: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a sink.
   *
   * @param sinkName Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async projectsSinksGet(sinkName: string): Promise<LogSink> {
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogSink;
  }

  /**
   * Lists sinks.
   *
   * @param parent Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" 
   */
  async projectsSinksList(parent: string, opts: ProjectsSinksListOptions = {}): Promise<ListSinksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/sinks`);
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
    return data as ListSinksResponse;
  }

  /**
   * Updates a sink. This method replaces the following fields in the existing
   * sink with values from the new sink: destination, and filter.The updated
   * sink might also have a new writer_identity; see the unique_writer_identity
   * field.
   *
   * @param sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async projectsSinksPatch(sinkName: string, req: LogSink, opts: ProjectsSinksPatchOptions = {}): Promise<LogSink> {
    opts = serializeProjectsSinksPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
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
    return data as LogSink;
  }

  /**
   * Updates a sink. This method replaces the following fields in the existing
   * sink with values from the new sink: destination, and filter.The updated
   * sink might also have a new writer_identity; see the unique_writer_identity
   * field.
   *
   * @param sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async projectsSinksUpdate(sinkName: string, req: LogSink, opts: ProjectsSinksUpdateOptions = {}): Promise<LogSink> {
    opts = serializeProjectsSinksUpdateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as LogSink;
  }

  /**
   * Creates a sink that exports specified log entries to a destination. The
   * export of newly-ingested log entries begins immediately, unless the sink's
   * writer_identity is not permitted to write to the destination. A sink can
   * export log entries only from the resource owning the sink.
   *
   * @param parent Required. The resource in which to create the sink: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" For examples:"projects/my-project" "organizations/123456789"
   */
  async sinksCreate(parent: string, req: LogSink, opts: SinksCreateOptions = {}): Promise<LogSink> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/sinks`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as LogSink;
  }

  /**
   * Deletes a sink. If the sink has a unique writer_identity, then that
   * service account is also deleted.
   *
   * @param sinkName Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async sinksDelete(sinkName: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a sink.
   *
   * @param sinkName Required. The resource name of the sink: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async sinksGet(sinkName: string): Promise<LogSink> {
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as LogSink;
  }

  /**
   * Lists sinks.
   *
   * @param parent Required. The parent resource whose sinks are to be listed: "projects/[PROJECT_ID]" "organizations/[ORGANIZATION_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]" "folders/[FOLDER_ID]" 
   */
  async sinksList(parent: string, opts: SinksListOptions = {}): Promise<ListSinksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/sinks`);
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
    return data as ListSinksResponse;
  }

  /**
   * Updates a sink. This method replaces the following fields in the existing
   * sink with values from the new sink: destination, and filter.The updated
   * sink might also have a new writer_identity; see the unique_writer_identity
   * field.
   *
   * @param sinkName Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/[PROJECT_ID]/sinks/[SINK_ID]" "organizations/[ORGANIZATION_ID]/sinks/[SINK_ID]" "billingAccounts/[BILLING_ACCOUNT_ID]/sinks/[SINK_ID]" "folders/[FOLDER_ID]/sinks/[SINK_ID]" For example:"projects/my-project/sinks/my-sink"
   */
  async sinksUpdate(sinkName: string, req: LogSink, opts: SinksUpdateOptions = {}): Promise<LogSink> {
    opts = serializeSinksUpdateOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ sinkName }`);
    if (opts.uniqueWriterIdentity !== undefined) {
      url.searchParams.append("uniqueWriterIdentity", String(opts.uniqueWriterIdentity));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as LogSink;
  }

  /**
   * Gets the Logging CMEK settings for the given resource.Note: CMEK for the
   * Log Router can be configured for Google Cloud projects, folders,
   * organizations and billing accounts. Once configured for an organization, it
   * applies to all projects and folders in the Google Cloud organization.See
   * Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   *
   * @param name Required. The resource for which to retrieve CMEK settings. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.
   */
  async v2GetCmekSettings(name: string): Promise<CmekSettings> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/cmekSettings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CmekSettings;
  }

  /**
   * Gets the Log Router settings for the given resource.Note: Settings for the
   * Log Router can be get for Google Cloud projects, folders, organizations and
   * billing accounts. Currently it can only be configured for organizations.
   * Once configured for an organization, it applies to all projects and folders
   * in the Google Cloud organization.See Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   *
   * @param name Required. The resource for which to retrieve settings. "projects/[PROJECT_ID]/settings" "organizations/[ORGANIZATION_ID]/settings" "billingAccounts/[BILLING_ACCOUNT_ID]/settings" "folders/[FOLDER_ID]/settings" For example:"organizations/12345/settings"Note: Settings for the Log Router can be get for Google Cloud projects, folders, organizations and billing accounts. Currently it can only be configured for organizations. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.
   */
  async v2GetSettings(name: string): Promise<Settings> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/settings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Settings;
  }

  /**
   * Updates the Log Router CMEK settings for the given resource.Note: CMEK for
   * the Log Router can currently only be configured for Google Cloud
   * organizations. Once configured, it applies to all projects and folders in
   * the Google Cloud organization.UpdateCmekSettings will fail if 1)
   * kms_key_name is invalid, or 2) the associated service account does not have
   * the required roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for
   * the key, or 3) access to the key is disabled.See Enabling CMEK for Log
   * Router (https://cloud.google.com/logging/docs/routing/managed-encryption)
   * for more information.
   *
   * @param name Required. The resource name for the CMEK settings to update. "projects/[PROJECT_ID]/cmekSettings" "organizations/[ORGANIZATION_ID]/cmekSettings" "billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings" "folders/[FOLDER_ID]/cmekSettings" For example:"organizations/12345/cmekSettings"Note: CMEK for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization.
   */
  async v2UpdateCmekSettings(name: string, req: CmekSettings, opts: V2UpdateCmekSettingsOptions = {}): Promise<CmekSettings> {
    opts = serializeV2UpdateCmekSettingsOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }/cmekSettings`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as CmekSettings;
  }

  /**
   * Updates the Log Router settings for the given resource.Note: Settings for
   * the Log Router can currently only be configured for Google Cloud
   * organizations. Once configured, it applies to all projects and folders in
   * the Google Cloud organization.UpdateSettings will fail if 1) kms_key_name
   * is invalid, or 2) the associated service account does not have the required
   * roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key, or 3)
   * access to the key is disabled. 4) location_id is not supported by Logging.
   * 5) location_id violate OrgPolicy.See Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   *
   * @param name Required. The resource name for the settings to update. "organizations/[ORGANIZATION_ID]/settings" For example:"organizations/12345/settings"Note: Settings for the Log Router can currently only be configured for Google Cloud organizations. Once configured, it applies to all projects and folders in the Google Cloud organization.
   */
  async v2UpdateSettings(name: string, req: Settings, opts: V2UpdateSettingsOptions = {}): Promise<Settings> {
    opts = serializeV2UpdateSettingsOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }/settings`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Settings;
  }
}

/**
 * Describes a BigQuery dataset that was created by a link.
 */
export interface BigQueryDataset {
  /**
   * Output only. The full resource name of the BigQuery dataset. The
   * DATASET_ID will match the ID of the link, so the link must match the naming
   * restrictions of BigQuery datasets (alphanumeric characters and underscores
   * only).The dataset will have a resource path of
   * "bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID"
   */
  readonly datasetId?: string;
}

/**
 * Options that change functionality of a sink exporting data to BigQuery.
 */
export interface BigQueryOptions {
  /**
   * Optional. Whether to use BigQuery's partition tables
   * (https://cloud.google.com/bigquery/docs/partitioned-tables). By default,
   * Cloud Logging creates dated tables based on the log entries' timestamps,
   * e.g. syslog_20170523. With partitioned tables the date suffix is no longer
   * present and special query syntax
   * (https://cloud.google.com/bigquery/docs/querying-partitioned-tables) has to
   * be used instead. In both cases, tables are sharded based on UTC timezone.
   */
  usePartitionedTables?: boolean;
  /**
   * Output only. True if new timestamp column based partitioning is in use,
   * false if legacy ingestion-time partitioning is in use.All new sinks will
   * have this field set true and will use timestamp column based partitioning.
   * If use_partitioned_tables is false, this value has no meaning and will be
   * false. Legacy sinks using partitioned tables will have this field set to
   * false.
   */
  readonly usesTimestampColumnPartitioning?: boolean;
}

/**
 * Additional options for Logging#billingAccountsExclusionsList.
 */
export interface BillingAccountsExclusionsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#billingAccountsExclusionsPatch.
 */
export interface BillingAccountsExclusionsPatchOptions {
  /**
   * Required. A non-empty list of fields to change in the existing exclusion.
   * New values for the fields are taken from the corresponding fields in the
   * LogExclusion included in this request. Fields not mentioned in update_mask
   * are not changed and are ignored in the request.For example, to change the
   * filter and description of an exclusion, specify an update_mask of
   * "filter,description".
   */
  updateMask?: string /* FieldMask */;
}

function serializeBillingAccountsExclusionsPatchOptions(data: any): BillingAccountsExclusionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBillingAccountsExclusionsPatchOptions(data: any): BillingAccountsExclusionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#billingAccountsLocationsBucketsCreateAsync.
 */
export interface BillingAccountsLocationsBucketsCreateAsyncOptions {
  /**
   * Required. A client-assigned identifier such as "my-bucket". Identifiers
   * are limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  bucketId?: string;
}

/**
 * Additional options for Logging#billingAccountsLocationsBucketsCreate.
 */
export interface BillingAccountsLocationsBucketsCreateOptions {
  /**
   * Required. A client-assigned identifier such as "my-bucket". Identifiers
   * are limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  bucketId?: string;
}

/**
 * Additional options for Logging#billingAccountsLocationsBucketsLinksCreate.
 */
export interface BillingAccountsLocationsBucketsLinksCreateOptions {
  /**
   * Required. The ID to use for the link. The link_id can have up to 100
   * characters. A valid link_id must only have alphanumeric characters and
   * underscores within it.
   */
  linkId?: string;
}

/**
 * Additional options for Logging#billingAccountsLocationsBucketsLinksList.
 */
export interface BillingAccountsLocationsBucketsLinksListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#billingAccountsLocationsBucketsList.
 */
export interface BillingAccountsLocationsBucketsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#billingAccountsLocationsBucketsPatch.
 */
export interface BillingAccountsLocationsBucketsPatchOptions {
  /**
   * Required. Field mask that specifies the fields in bucket that need an
   * update. A bucket field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see:
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=retention_days
   */
  updateMask?: string /* FieldMask */;
}

function serializeBillingAccountsLocationsBucketsPatchOptions(data: any): BillingAccountsLocationsBucketsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBillingAccountsLocationsBucketsPatchOptions(data: any): BillingAccountsLocationsBucketsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#billingAccountsLocationsBucketsUpdateAsync.
 */
export interface BillingAccountsLocationsBucketsUpdateAsyncOptions {
  /**
   * Required. Field mask that specifies the fields in bucket that need an
   * update. A bucket field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see:
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=retention_days
   */
  updateMask?: string /* FieldMask */;
}

function serializeBillingAccountsLocationsBucketsUpdateAsyncOptions(data: any): BillingAccountsLocationsBucketsUpdateAsyncOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBillingAccountsLocationsBucketsUpdateAsyncOptions(data: any): BillingAccountsLocationsBucketsUpdateAsyncOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#billingAccountsLocationsBucketsViewsCreate.
 */
export interface BillingAccountsLocationsBucketsViewsCreateOptions {
  /**
   * Required. A client-assigned identifier such as "my-view". Identifiers are
   * limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  viewId?: string;
}

/**
 * Additional options for Logging#billingAccountsLocationsBucketsViewsList.
 */
export interface BillingAccountsLocationsBucketsViewsListOptions {
  /**
   * Optional. The maximum number of results to return from this
   * request.Non-positive values are ignored. The presence of nextPageToken in
   * the response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#billingAccountsLocationsBucketsViewsLogsList.
 */
export interface BillingAccountsLocationsBucketsViewsLogsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
  /**
   * Optional. The resource name that owns the logs:
   * projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To
   * support legacy queries, it could also be: projects/[PROJECT_ID]
   * organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID]
   * folders/[FOLDER_ID]
   */
  resourceNames?: string;
}

/**
 * Additional options for Logging#billingAccountsLocationsBucketsViewsPatch.
 */
export interface BillingAccountsLocationsBucketsViewsPatchOptions {
  /**
   * Optional. Field mask that specifies the fields in view that need an
   * update. A field will be overwritten if, and only if, it is in the update
   * mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeBillingAccountsLocationsBucketsViewsPatchOptions(data: any): BillingAccountsLocationsBucketsViewsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBillingAccountsLocationsBucketsViewsPatchOptions(data: any): BillingAccountsLocationsBucketsViewsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#billingAccountsLocationsList.
 */
export interface BillingAccountsLocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like "displayName=tokyo", and is documented in
   * more detail in AIP-160 (https://google.aip.dev/160).
   */
  filter?: string;
  /**
   * The maximum number of results to return. If not set, the service selects a
   * default.
   */
  pageSize?: number;
  /**
   * A page token received from the next_page_token field in the response. Send
   * that page token to receive the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#billingAccountsLocationsOperationsList.
 */
export interface BillingAccountsLocationsOperationsListOptions {
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
 * Additional options for Logging#billingAccountsLogsList.
 */
export interface BillingAccountsLogsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
  /**
   * Optional. The resource name that owns the logs:
   * projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To
   * support legacy queries, it could also be: projects/[PROJECT_ID]
   * organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID]
   * folders/[FOLDER_ID]
   */
  resourceNames?: string;
}

/**
 * Additional options for Logging#billingAccountsSinksCreate.
 */
export interface BillingAccountsSinksCreateOptions {
  /**
   * Optional. Determines the kind of IAM identity returned as writer_identity
   * in the new sink. If this value is omitted or set to false, and if the
   * sink's parent is a project, then the value returned as writer_identity is
   * the same group or service account used by Cloud Logging before the addition
   * of writer identities to this API. The sink's destination must be in the
   * same project as the sink itself.If this field is set to true, or if the
   * sink is owned by a non-project resource such as an organization, then the
   * value of writer_identity will be a unique service account used only for
   * exports from the new sink. For more information, see writer_identity in
   * LogSink.
   */
  uniqueWriterIdentity?: boolean;
}

/**
 * Additional options for Logging#billingAccountsSinksList.
 */
export interface BillingAccountsSinksListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#billingAccountsSinksPatch.
 */
export interface BillingAccountsSinksPatchOptions {
  /**
   * Optional. See sinks.create for a description of this field. When updating
   * a sink, the effect of this field on the value of writer_identity in the
   * updated sink depends on both the old and new values of this field: If the
   * old and new values of this field are both false or both true, then there is
   * no change to the sink's writer_identity. If the old value is false and the
   * new value is true, then writer_identity is changed to a unique service
   * account. It is an error if the old value is true and the new value is set
   * to false or defaulted to false.
   */
  uniqueWriterIdentity?: boolean;
  /**
   * Optional. Field mask that specifies the fields in sink that need an
   * update. A sink field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.An empty
   * updateMask is temporarily treated as using the following mask for backwards
   * compatibility purposes:destination,filter,includeChildrenAt some point in
   * the future, behavior will be removed and specifying an empty updateMask
   * will be an error.For a detailed FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeBillingAccountsSinksPatchOptions(data: any): BillingAccountsSinksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBillingAccountsSinksPatchOptions(data: any): BillingAccountsSinksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#billingAccountsSinksUpdate.
 */
export interface BillingAccountsSinksUpdateOptions {
  /**
   * Optional. See sinks.create for a description of this field. When updating
   * a sink, the effect of this field on the value of writer_identity in the
   * updated sink depends on both the old and new values of this field: If the
   * old and new values of this field are both false or both true, then there is
   * no change to the sink's writer_identity. If the old value is false and the
   * new value is true, then writer_identity is changed to a unique service
   * account. It is an error if the old value is true and the new value is set
   * to false or defaulted to false.
   */
  uniqueWriterIdentity?: boolean;
  /**
   * Optional. Field mask that specifies the fields in sink that need an
   * update. A sink field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.An empty
   * updateMask is temporarily treated as using the following mask for backwards
   * compatibility purposes:destination,filter,includeChildrenAt some point in
   * the future, behavior will be removed and specifying an empty updateMask
   * will be an error.For a detailed FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeBillingAccountsSinksUpdateOptions(data: any): BillingAccountsSinksUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBillingAccountsSinksUpdateOptions(data: any): BillingAccountsSinksUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Metadata for LongRunningUpdateBucket Operations.
 */
export interface BucketMetadata {
  /**
   * LongRunningCreateBucket RPC request.
   */
  createBucketRequest?: CreateBucketRequest;
  /**
   * The end time of an operation.
   */
  endTime?: Date;
  /**
   * The create time of an operation.
   */
  startTime?: Date;
  /**
   * State of an operation.
   */
  state?:  | "OPERATION_STATE_UNSPECIFIED" | "OPERATION_STATE_SCHEDULED" | "OPERATION_STATE_WAITING_FOR_PERMISSIONS" | "OPERATION_STATE_RUNNING" | "OPERATION_STATE_SUCCEEDED" | "OPERATION_STATE_FAILED" | "OPERATION_STATE_CANCELLED";
  /**
   * LongRunningUpdateBucket RPC request.
   */
  updateBucketRequest?: UpdateBucketRequest;
}

function serializeBucketMetadata(data: any): BucketMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updateBucketRequest: data["updateBucketRequest"] !== undefined ? serializeUpdateBucketRequest(data["updateBucketRequest"]) : undefined,
  };
}

function deserializeBucketMetadata(data: any): BucketMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateBucketRequest: data["updateBucketRequest"] !== undefined ? deserializeUpdateBucketRequest(data["updateBucketRequest"]) : undefined,
  };
}

/**
 * BucketOptions describes the bucket boundaries used to create a histogram for
 * the distribution. The buckets can be in a linear sequence, an exponential
 * sequence, or each bucket can be specified explicitly. BucketOptions does not
 * include the number of values in each bucket.A bucket has an inclusive lower
 * bound and exclusive upper bound for the values that are counted for that
 * bucket. The upper bound of a bucket must be strictly greater than the lower
 * bound. The sequence of N buckets for a distribution consists of an underflow
 * bucket (number 0), zero or more finite buckets (number 1 through N - 2) and
 * an overflow bucket (number N - 1). The buckets are contiguous: the lower
 * bound of bucket i (i > 0) is the same as the upper bound of bucket i - 1. The
 * buckets span the whole range of finite values: lower bound of the underflow
 * bucket is -infinity and the upper bound of the overflow bucket is +infinity.
 * The finite buckets are so-called because both bounds are finite.
 */
export interface BucketOptions {
  /**
   * The explicit buckets.
   */
  explicitBuckets?: Explicit;
  /**
   * The exponential buckets.
   */
  exponentialBuckets?: Exponential;
  /**
   * The linear bucket.
   */
  linearBuckets?: Linear;
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Describes the customer-managed encryption key (CMEK) settings associated
 * with a project, folder, organization, billing account, or flexible
 * resource.Note: CMEK for the Log Router can currently only be configured for
 * Google Cloud organizations. Once configured, it applies to all projects and
 * folders in the Google Cloud organization.See Enabling CMEK for Log Router
 * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
 * information.
 */
export interface CmekSettings {
  /**
   * The resource name for the configured Cloud KMS key.KMS key name format:
   * "projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]"
   * For
   * example:"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key"To
   * enable CMEK for the Log Router, set this field to a valid kms_key_name for
   * which the associated service account has the required
   * cloudkms.cryptoKeyEncrypterDecrypter roles assigned for the key.The Cloud
   * KMS key used by the Log Router can be updated by changing the kms_key_name
   * to a new valid key name or disabled by setting the key name to an empty
   * string. Encryption operations that are in progress will be completed with
   * the key that was in use when they started. Decryption operations will be
   * completed using the key that was used at the time of encryption unless
   * access to that key has been revoked.To disable CMEK for the Log Router, set
   * this field to an empty string.See Enabling CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   */
  kmsKeyName?: string;
  /**
   * The CryptoKeyVersion resource name for the configured Cloud KMS key.KMS
   * key name format:
   * "projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]/cryptoKeyVersions/[VERSION]"
   * For
   * example:"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key/cryptoKeyVersions/1"This
   * is a read-only field used to convey the specific configured
   * CryptoKeyVersion of kms_key that has been configured. It will be populated
   * in cases where the CMEK settings are bound to a single key version.If this
   * field is populated, the kms_key is tied to a specific CryptoKeyVersion.
   */
  kmsKeyVersionName?: string;
  /**
   * Output only. The resource name of the CMEK settings.
   */
  readonly name?: string;
  /**
   * Output only. The service account that will be used by the Log Router to
   * access your Cloud KMS key.Before enabling CMEK for Log Router, you must
   * first assign the cloudkms.cryptoKeyEncrypterDecrypter role to the service
   * account that the Log Router will use to access your Cloud KMS key. Use
   * GetCmekSettings to obtain the service account ID.See Enabling CMEK for Log
   * Router (https://cloud.google.com/logging/docs/routing/managed-encryption)
   * for more information.
   */
  readonly serviceAccountId?: string;
}

/**
 * Metadata for CopyLogEntries long running operations.
 */
export interface CopyLogEntriesMetadata {
  /**
   * Identifies whether the user has requested cancellation of the operation.
   */
  cancellationRequested?: boolean;
  /**
   * The end time of an operation.
   */
  endTime?: Date;
  /**
   * Estimated progress of the operation (0 - 100%).
   */
  progress?: number;
  /**
   * CopyLogEntries RPC request.
   */
  request?: CopyLogEntriesRequest;
  /**
   * The create time of an operation.
   */
  startTime?: Date;
  /**
   * State of an operation.
   */
  state?:  | "OPERATION_STATE_UNSPECIFIED" | "OPERATION_STATE_SCHEDULED" | "OPERATION_STATE_WAITING_FOR_PERMISSIONS" | "OPERATION_STATE_RUNNING" | "OPERATION_STATE_SUCCEEDED" | "OPERATION_STATE_FAILED" | "OPERATION_STATE_CANCELLED";
  /**
   * The IAM identity of a service account that must be granted access to the
   * destination.If the service account is not granted permission to the
   * destination within an hour, the operation will be cancelled.For example:
   * "serviceAccount:foo@bar.com"
   */
  writerIdentity?: string;
}

function serializeCopyLogEntriesMetadata(data: any): CopyLogEntriesMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeCopyLogEntriesMetadata(data: any): CopyLogEntriesMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The parameters to CopyLogEntries.
 */
export interface CopyLogEntriesRequest {
  /**
   * Required. Destination to which to copy log entries.
   */
  destination?: string;
  /**
   * Optional. A filter specifying which log entries to copy. The filter must
   * be no more than 20k characters. An empty filter matches all log entries.
   */
  filter?: string;
  /**
   * Required. Log bucket from which to copy log entries.For
   * example:"projects/my-project/locations/global/buckets/my-source-bucket"
   */
  name?: string;
}

/**
 * Response type for CopyLogEntries long running operations.
 */
export interface CopyLogEntriesResponse {
  /**
   * Number of log entries copied.
   */
  logEntriesCopiedCount?: bigint;
}

function serializeCopyLogEntriesResponse(data: any): CopyLogEntriesResponse {
  return {
    ...data,
    logEntriesCopiedCount: data["logEntriesCopiedCount"] !== undefined ? String(data["logEntriesCopiedCount"]) : undefined,
  };
}

function deserializeCopyLogEntriesResponse(data: any): CopyLogEntriesResponse {
  return {
    ...data,
    logEntriesCopiedCount: data["logEntriesCopiedCount"] !== undefined ? BigInt(data["logEntriesCopiedCount"]) : undefined,
  };
}

/**
 * The parameters to CreateBucket.
 */
export interface CreateBucketRequest {
  /**
   * Required. The new bucket. The region specified in the new bucket must be
   * compliant with any Location Restriction Org Policy. The name field in the
   * bucket is ignored.
   */
  bucket?: LogBucket;
  /**
   * Required. A client-assigned identifier such as "my-bucket". Identifiers
   * are limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  bucketId?: string;
  /**
   * Required. The resource in which to create the log bucket:
   * "projects/[PROJECT_ID]/locations/[LOCATION_ID]" For
   * example:"projects/my-project/locations/global"
   */
  parent?: string;
}

/**
 * The parameters to CreateLink.
 */
export interface CreateLinkRequest {
  /**
   * Required. The new link.
   */
  link?: Link;
  /**
   * Required. The ID to use for the link. The link_id can have up to 100
   * characters. A valid link_id must only have alphanumeric characters and
   * underscores within it.
   */
  linkId?: string;
  /**
   * Required. The full resource name of the bucket to create a link for.
   * "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
   * "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
   * "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
   * "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
   */
  parent?: string;
}

/**
 * The parameters to DeleteLink.
 */
export interface DeleteLinkRequest {
  /**
   * Required. The full resource name of the link to
   * delete."projects/PROJECT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID"
   * "organizations/ORGANIZATION_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID"
   * "billingAccounts/BILLING_ACCOUNT_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID"
   * "folders/FOLDER_ID/locations/LOCATION_ID/buckets/BUCKET_ID/links/LINK_ID"
   */
  name?: string;
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
 * Additional options for Logging#exclusionsList.
 */
export interface ExclusionsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#exclusionsPatch.
 */
export interface ExclusionsPatchOptions {
  /**
   * Required. A non-empty list of fields to change in the existing exclusion.
   * New values for the fields are taken from the corresponding fields in the
   * LogExclusion included in this request. Fields not mentioned in update_mask
   * are not changed and are ignored in the request.For example, to change the
   * filter and description of an exclusion, specify an update_mask of
   * "filter,description".
   */
  updateMask?: string /* FieldMask */;
}

function serializeExclusionsPatchOptions(data: any): ExclusionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeExclusionsPatchOptions(data: any): ExclusionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Specifies a set of buckets with arbitrary widths.There are size(bounds) + 1
 * (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i <
 * N-1): boundsi Lower bound (1 <= i < N); boundsi - 1The bounds field must
 * contain at least one element. If bounds has only one element, then there are
 * no finite buckets, and that single element is the common boundary of the
 * overflow and underflow buckets.
 */
export interface Explicit {
  /**
   * The values must be monotonically increasing.
   */
  bounds?: number[];
}

/**
 * Specifies an exponential sequence of buckets that have a width that is
 * proportional to the value of the lower bound. Each bucket represents a
 * constant relative uncertainty on a specific value in the bucket.There are
 * num_finite_buckets + 2 (= N) buckets. Bucket i has the following
 * boundaries:Upper bound (0 <= i < N-1): scale * (growth_factor ^ i). Lower
 * bound (1 <= i < N): scale * (growth_factor ^ (i - 1)).
 */
export interface Exponential {
  /**
   * Must be greater than 1.
   */
  growthFactor?: number;
  /**
   * Must be greater than 0.
   */
  numFiniteBuckets?: number;
  /**
   * Must be greater than 0.
   */
  scale?: number;
}

/**
 * Additional options for Logging#foldersExclusionsList.
 */
export interface FoldersExclusionsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#foldersExclusionsPatch.
 */
export interface FoldersExclusionsPatchOptions {
  /**
   * Required. A non-empty list of fields to change in the existing exclusion.
   * New values for the fields are taken from the corresponding fields in the
   * LogExclusion included in this request. Fields not mentioned in update_mask
   * are not changed and are ignored in the request.For example, to change the
   * filter and description of an exclusion, specify an update_mask of
   * "filter,description".
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersExclusionsPatchOptions(data: any): FoldersExclusionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersExclusionsPatchOptions(data: any): FoldersExclusionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#foldersLocationsBucketsCreateAsync.
 */
export interface FoldersLocationsBucketsCreateAsyncOptions {
  /**
   * Required. A client-assigned identifier such as "my-bucket". Identifiers
   * are limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  bucketId?: string;
}

/**
 * Additional options for Logging#foldersLocationsBucketsCreate.
 */
export interface FoldersLocationsBucketsCreateOptions {
  /**
   * Required. A client-assigned identifier such as "my-bucket". Identifiers
   * are limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  bucketId?: string;
}

/**
 * Additional options for Logging#foldersLocationsBucketsLinksCreate.
 */
export interface FoldersLocationsBucketsLinksCreateOptions {
  /**
   * Required. The ID to use for the link. The link_id can have up to 100
   * characters. A valid link_id must only have alphanumeric characters and
   * underscores within it.
   */
  linkId?: string;
}

/**
 * Additional options for Logging#foldersLocationsBucketsLinksList.
 */
export interface FoldersLocationsBucketsLinksListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#foldersLocationsBucketsList.
 */
export interface FoldersLocationsBucketsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#foldersLocationsBucketsPatch.
 */
export interface FoldersLocationsBucketsPatchOptions {
  /**
   * Required. Field mask that specifies the fields in bucket that need an
   * update. A bucket field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see:
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=retention_days
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersLocationsBucketsPatchOptions(data: any): FoldersLocationsBucketsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersLocationsBucketsPatchOptions(data: any): FoldersLocationsBucketsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#foldersLocationsBucketsUpdateAsync.
 */
export interface FoldersLocationsBucketsUpdateAsyncOptions {
  /**
   * Required. Field mask that specifies the fields in bucket that need an
   * update. A bucket field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see:
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=retention_days
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersLocationsBucketsUpdateAsyncOptions(data: any): FoldersLocationsBucketsUpdateAsyncOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersLocationsBucketsUpdateAsyncOptions(data: any): FoldersLocationsBucketsUpdateAsyncOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#foldersLocationsBucketsViewsCreate.
 */
export interface FoldersLocationsBucketsViewsCreateOptions {
  /**
   * Required. A client-assigned identifier such as "my-view". Identifiers are
   * limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  viewId?: string;
}

/**
 * Additional options for Logging#foldersLocationsBucketsViewsList.
 */
export interface FoldersLocationsBucketsViewsListOptions {
  /**
   * Optional. The maximum number of results to return from this
   * request.Non-positive values are ignored. The presence of nextPageToken in
   * the response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#foldersLocationsBucketsViewsLogsList.
 */
export interface FoldersLocationsBucketsViewsLogsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
  /**
   * Optional. The resource name that owns the logs:
   * projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To
   * support legacy queries, it could also be: projects/[PROJECT_ID]
   * organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID]
   * folders/[FOLDER_ID]
   */
  resourceNames?: string;
}

/**
 * Additional options for Logging#foldersLocationsBucketsViewsPatch.
 */
export interface FoldersLocationsBucketsViewsPatchOptions {
  /**
   * Optional. Field mask that specifies the fields in view that need an
   * update. A field will be overwritten if, and only if, it is in the update
   * mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersLocationsBucketsViewsPatchOptions(data: any): FoldersLocationsBucketsViewsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersLocationsBucketsViewsPatchOptions(data: any): FoldersLocationsBucketsViewsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#foldersLocationsList.
 */
export interface FoldersLocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like "displayName=tokyo", and is documented in
   * more detail in AIP-160 (https://google.aip.dev/160).
   */
  filter?: string;
  /**
   * The maximum number of results to return. If not set, the service selects a
   * default.
   */
  pageSize?: number;
  /**
   * A page token received from the next_page_token field in the response. Send
   * that page token to receive the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#foldersLocationsOperationsList.
 */
export interface FoldersLocationsOperationsListOptions {
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
 * Additional options for Logging#foldersLogsList.
 */
export interface FoldersLogsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
  /**
   * Optional. The resource name that owns the logs:
   * projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To
   * support legacy queries, it could also be: projects/[PROJECT_ID]
   * organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID]
   * folders/[FOLDER_ID]
   */
  resourceNames?: string;
}

/**
 * Additional options for Logging#foldersSinksCreate.
 */
export interface FoldersSinksCreateOptions {
  /**
   * Optional. Determines the kind of IAM identity returned as writer_identity
   * in the new sink. If this value is omitted or set to false, and if the
   * sink's parent is a project, then the value returned as writer_identity is
   * the same group or service account used by Cloud Logging before the addition
   * of writer identities to this API. The sink's destination must be in the
   * same project as the sink itself.If this field is set to true, or if the
   * sink is owned by a non-project resource such as an organization, then the
   * value of writer_identity will be a unique service account used only for
   * exports from the new sink. For more information, see writer_identity in
   * LogSink.
   */
  uniqueWriterIdentity?: boolean;
}

/**
 * Additional options for Logging#foldersSinksList.
 */
export interface FoldersSinksListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#foldersSinksPatch.
 */
export interface FoldersSinksPatchOptions {
  /**
   * Optional. See sinks.create for a description of this field. When updating
   * a sink, the effect of this field on the value of writer_identity in the
   * updated sink depends on both the old and new values of this field: If the
   * old and new values of this field are both false or both true, then there is
   * no change to the sink's writer_identity. If the old value is false and the
   * new value is true, then writer_identity is changed to a unique service
   * account. It is an error if the old value is true and the new value is set
   * to false or defaulted to false.
   */
  uniqueWriterIdentity?: boolean;
  /**
   * Optional. Field mask that specifies the fields in sink that need an
   * update. A sink field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.An empty
   * updateMask is temporarily treated as using the following mask for backwards
   * compatibility purposes:destination,filter,includeChildrenAt some point in
   * the future, behavior will be removed and specifying an empty updateMask
   * will be an error.For a detailed FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersSinksPatchOptions(data: any): FoldersSinksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersSinksPatchOptions(data: any): FoldersSinksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#foldersSinksUpdate.
 */
export interface FoldersSinksUpdateOptions {
  /**
   * Optional. See sinks.create for a description of this field. When updating
   * a sink, the effect of this field on the value of writer_identity in the
   * updated sink depends on both the old and new values of this field: If the
   * old and new values of this field are both false or both true, then there is
   * no change to the sink's writer_identity. If the old value is false and the
   * new value is true, then writer_identity is changed to a unique service
   * account. It is an error if the old value is true and the new value is set
   * to false or defaulted to false.
   */
  uniqueWriterIdentity?: boolean;
  /**
   * Optional. Field mask that specifies the fields in sink that need an
   * update. A sink field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.An empty
   * updateMask is temporarily treated as using the following mask for backwards
   * compatibility purposes:destination,filter,includeChildrenAt some point in
   * the future, behavior will be removed and specifying an empty updateMask
   * will be an error.For a detailed FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersSinksUpdateOptions(data: any): FoldersSinksUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersSinksUpdateOptions(data: any): FoldersSinksUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#foldersUpdateSettings.
 */
export interface FoldersUpdateSettingsOptions {
  /**
   * Optional. Field mask identifying which fields from settings should be
   * updated. A field will be overwritten if and only if it is in the update
   * mask. Output only fields cannot be updated.See FieldMask for more
   * information.For example: "updateMask=kmsKeyName"
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersUpdateSettingsOptions(data: any): FoldersUpdateSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersUpdateSettingsOptions(data: any): FoldersUpdateSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A common proto for logging HTTP requests. Only contains semantics defined by
 * the HTTP specification. Product-specific logging information MUST be defined
 * in a separate message.
 */
export interface HttpRequest {
  /**
   * The number of HTTP response bytes inserted into cache. Set only when a
   * cache fill was attempted.
   */
  cacheFillBytes?: bigint;
  /**
   * Whether or not an entity was served from cache (with or without
   * validation).
   */
  cacheHit?: boolean;
  /**
   * Whether or not a cache lookup was attempted.
   */
  cacheLookup?: boolean;
  /**
   * Whether or not the response was validated with the origin server before
   * being served from cache. This field is only meaningful if cache_hit is
   * True.
   */
  cacheValidatedWithOriginServer?: boolean;
  /**
   * The request processing latency on the server, from the time the request
   * was received until the response was sent.
   */
  latency?: number /* Duration */;
  /**
   * Protocol used for the request. Examples: "HTTP/1.1", "HTTP/2", "websocket"
   */
  protocol?: string;
  /**
   * The referer URL of the request, as defined in HTTP/1.1 Header Field
   * Definitions (http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html).
   */
  referer?: string;
  /**
   * The IP address (IPv4 or IPv6) of the client that issued the HTTP request.
   * This field can include port information. Examples: "192.168.1.1",
   * "10.0.0.1:80", "FE80::0202:B3FF:FE1E:8329".
   */
  remoteIp?: string;
  /**
   * The request method. Examples: "GET", "HEAD", "PUT", "POST".
   */
  requestMethod?: string;
  /**
   * The size of the HTTP request message in bytes, including the request
   * headers and the request body.
   */
  requestSize?: bigint;
  /**
   * The scheme (http, https), the host name, the path and the query portion of
   * the URL that was requested. Example:
   * "http://example.com/some/info?color=red".
   */
  requestUrl?: string;
  /**
   * The size of the HTTP response message sent back to the client, in bytes,
   * including the response headers and the response body.
   */
  responseSize?: bigint;
  /**
   * The IP address (IPv4 or IPv6) of the origin server that the request was
   * sent to. This field can include port information. Examples: "192.168.1.1",
   * "10.0.0.1:80", "FE80::0202:B3FF:FE1E:8329".
   */
  serverIp?: string;
  /**
   * The response code indicating the status of response. Examples: 200, 404.
   */
  status?: number;
  /**
   * The user agent sent by the client. Example: "Mozilla/4.0 (compatible; MSIE
   * 6.0; Windows 98; Q312461; .NET CLR 1.0.3705)".
   */
  userAgent?: string;
}

function serializeHttpRequest(data: any): HttpRequest {
  return {
    ...data,
    cacheFillBytes: data["cacheFillBytes"] !== undefined ? String(data["cacheFillBytes"]) : undefined,
    latency: data["latency"] !== undefined ? data["latency"] : undefined,
    requestSize: data["requestSize"] !== undefined ? String(data["requestSize"]) : undefined,
    responseSize: data["responseSize"] !== undefined ? String(data["responseSize"]) : undefined,
  };
}

function deserializeHttpRequest(data: any): HttpRequest {
  return {
    ...data,
    cacheFillBytes: data["cacheFillBytes"] !== undefined ? BigInt(data["cacheFillBytes"]) : undefined,
    latency: data["latency"] !== undefined ? data["latency"] : undefined,
    requestSize: data["requestSize"] !== undefined ? BigInt(data["requestSize"]) : undefined,
    responseSize: data["responseSize"] !== undefined ? BigInt(data["responseSize"]) : undefined,
  };
}

/**
 * Configuration for an indexed field.
 */
export interface IndexConfig {
  /**
   * Output only. The timestamp when the index was last modified.This is used
   * to return the timestamp, and will be ignored if supplied during update.
   */
  readonly createTime?: Date;
  /**
   * Required. The LogEntry field path to index.Note that some paths are
   * automatically indexed, and other paths are not eligible for indexing. See
   * indexing documentation(
   * https://cloud.google.com/logging/docs/view/advanced-queries#indexed-fields)
   * for details.For example: jsonPayload.request.status
   */
  fieldPath?: string;
  /**
   * Required. The type of data in this index.
   */
  type?:  | "INDEX_TYPE_UNSPECIFIED" | "INDEX_TYPE_STRING" | "INDEX_TYPE_INTEGER";
}

/**
 * A description of a label.
 */
export interface LabelDescriptor {
  /**
   * A human-readable description for the label.
   */
  description?: string;
  /**
   * The label key.
   */
  key?: string;
  /**
   * The type of data that can be assigned to the label.
   */
  valueType?:  | "STRING" | "BOOL" | "INT64";
}

/**
 * Specifies a linear sequence of buckets that all have the same width (except
 * overflow and underflow). Each bucket represents a constant absolute
 * uncertainty on the specific value in the bucket.There are num_finite_buckets
 * + 2 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i
 * < N-1): offset + (width * i). Lower bound (1 <= i < N): offset + (width * (i
 * - 1)).
 */
export interface Linear {
  /**
   * Must be greater than 0.
   */
  numFiniteBuckets?: number;
  /**
   * Lower bound of the first bucket.
   */
  offset?: number;
  /**
   * Must be greater than 0.
   */
  width?: number;
}

/**
 * Describes a link connected to an analytics enabled bucket.
 */
export interface Link {
  /**
   * The information of a BigQuery Dataset. When a link is created, a BigQuery
   * dataset is created along with it, in the same project as the LogBucket it's
   * linked to. This dataset will also have BigQuery Views corresponding to the
   * LogViews in the bucket.
   */
  bigqueryDataset?: BigQueryDataset;
  /**
   * Output only. The creation timestamp of the link.
   */
  readonly createTime?: Date;
  /**
   * Describes this link.The maximum length of the description is 8000
   * characters.
   */
  description?: string;
  /**
   * Output only. The resource lifecycle state.
   */
  readonly lifecycleState?:  | "LIFECYCLE_STATE_UNSPECIFIED" | "ACTIVE" | "DELETE_REQUESTED" | "UPDATING" | "CREATING" | "FAILED";
  /**
   * The resource name of the link. The name can have up to 100 characters. A
   * valid link id (at the end of the link name) must only have alphanumeric
   * characters and underscores within it.
   * "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]"
   * "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]"
   * "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]"
   * "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/links/[LINK_ID]"
   * For
   * example:`projects/my-project/locations/global/buckets/my-bucket/links/my_link
   */
  name?: string;
}

/**
 * Metadata for long running Link operations.
 */
export interface LinkMetadata {
  /**
   * CreateLink RPC request.
   */
  createLinkRequest?: CreateLinkRequest;
  /**
   * DeleteLink RPC request.
   */
  deleteLinkRequest?: DeleteLinkRequest;
  /**
   * The end time of an operation.
   */
  endTime?: Date;
  /**
   * The start time of an operation.
   */
  startTime?: Date;
  /**
   * State of an operation.
   */
  state?:  | "OPERATION_STATE_UNSPECIFIED" | "OPERATION_STATE_SCHEDULED" | "OPERATION_STATE_WAITING_FOR_PERMISSIONS" | "OPERATION_STATE_RUNNING" | "OPERATION_STATE_SUCCEEDED" | "OPERATION_STATE_FAILED" | "OPERATION_STATE_CANCELLED";
}

function serializeLinkMetadata(data: any): LinkMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeLinkMetadata(data: any): LinkMetadata {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The response from ListBuckets.
 */
export interface ListBucketsResponse {
  /**
   * A list of buckets.
   */
  buckets?: LogBucket[];
  /**
   * If there might be more results than appear in this response, then
   * nextPageToken is included. To get the next set of results, call the same
   * method again using the value of nextPageToken as pageToken.
   */
  nextPageToken?: string;
}

/**
 * Result returned from ListExclusions.
 */
export interface ListExclusionsResponse {
  /**
   * A list of exclusions.
   */
  exclusions?: LogExclusion[];
  /**
   * If there might be more results than appear in this response, then
   * nextPageToken is included. To get the next set of results, call the same
   * method again using the value of nextPageToken as pageToken.
   */
  nextPageToken?: string;
}

/**
 * The response from ListLinks.
 */
export interface ListLinksResponse {
  /**
   * A list of links.
   */
  links?: Link[];
  /**
   * If there might be more results than those appearing in this response, then
   * nextPageToken is included. To get the next set of results, call the same
   * method again using the value of nextPageToken as pageToken.
   */
  nextPageToken?: string;
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
 * The parameters to ListLogEntries.
 */
export interface ListLogEntriesRequest {
  /**
   * Optional. Only log entries that match the filter are returned. An empty
   * filter matches all log entries in the resources listed in resource_names.
   * Referencing a parent resource that is not listed in resource_names will
   * cause the filter to return no results. The maximum length of a filter is
   * 20,000 characters.
   */
  filter?: string;
  /**
   * Optional. How the results should be sorted. Presently, the only permitted
   * values are "timestamp asc" (default) and "timestamp desc". The first option
   * returns entries in order of increasing values of LogEntry.timestamp (oldest
   * first), and the second option returns entries in order of decreasing
   * timestamps (newest first). Entries with equal timestamps are returned in
   * order of their insert_id values.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of results to return from this request.
   * Default is 50. If the value is negative or exceeds 1000, the request is
   * rejected. The presence of next_page_token in the response indicates that
   * more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. page_token must be the value of
   * next_page_token from the previous response. The values of other method
   * parameters should be identical to those in the previous call.
   */
  pageToken?: string;
  /**
   * Optional. Deprecated. Use resource_names instead. One or more project
   * identifiers or project numbers from which to retrieve log entries. Example:
   * "my-project-1A".
   */
  projectIds?: string[];
  /**
   * Required. Names of one or more parent resources from which to retrieve log
   * entries: projects/[PROJECT_ID] organizations/[ORGANIZATION_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]May alternatively
   * be one or more views:
   * projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]Projects
   * listed in the project_ids field are added to this list. A maximum of 100
   * resources may be specified in a single request.
   */
  resourceNames?: string[];
}

/**
 * Result returned from ListLogEntries.
 */
export interface ListLogEntriesResponse {
  /**
   * A list of log entries. If entries is empty, nextPageToken may still be
   * returned, indicating that more entries may exist. See nextPageToken for
   * more information.
   */
  entries?: LogEntry[];
  /**
   * If there might be more results than those appearing in this response, then
   * nextPageToken is included. To get the next set of results, call this method
   * again using the value of nextPageToken as pageToken.If a value for
   * next_page_token appears and the entries field is empty, it means that the
   * search found no log entries so far but it did not have time to search all
   * the possible log entries. Retry the method with this value for page_token
   * to continue the search. Alternatively, consider speeding up the search by
   * changing your filter to specify a single log name or resource type, or to
   * narrow the time range of the search.
   */
  nextPageToken?: string;
}

function serializeListLogEntriesResponse(data: any): ListLogEntriesResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeLogEntry(item))) : undefined,
  };
}

function deserializeListLogEntriesResponse(data: any): ListLogEntriesResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeLogEntry(item))) : undefined,
  };
}

/**
 * Result returned from ListLogMetrics.
 */
export interface ListLogMetricsResponse {
  /**
   * A list of logs-based metrics.
   */
  metrics?: LogMetric[];
  /**
   * If there might be more results than appear in this response, then
   * nextPageToken is included. To get the next set of results, call this method
   * again using the value of nextPageToken as pageToken.
   */
  nextPageToken?: string;
}

function serializeListLogMetricsResponse(data: any): ListLogMetricsResponse {
  return {
    ...data,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (serializeLogMetric(item))) : undefined,
  };
}

function deserializeListLogMetricsResponse(data: any): ListLogMetricsResponse {
  return {
    ...data,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (deserializeLogMetric(item))) : undefined,
  };
}

/**
 * Result returned from ListLogs.
 */
export interface ListLogsResponse {
  /**
   * A list of log names. For example, "projects/my-project/logs/syslog" or
   * "organizations/123/logs/cloudresourcemanager.googleapis.com%2Factivity".
   */
  logNames?: string[];
  /**
   * If there might be more results than those appearing in this response, then
   * nextPageToken is included. To get the next set of results, call this method
   * again using the value of nextPageToken as pageToken.
   */
  nextPageToken?: string;
}

/**
 * Result returned from ListMonitoredResourceDescriptors.
 */
export interface ListMonitoredResourceDescriptorsResponse {
  /**
   * If there might be more results than those appearing in this response, then
   * nextPageToken is included. To get the next set of results, call this method
   * again using the value of nextPageToken as pageToken.
   */
  nextPageToken?: string;
  /**
   * A list of resource descriptors.
   */
  resourceDescriptors?: MonitoredResourceDescriptor[];
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
 * Result returned from ListSinks.
 */
export interface ListSinksResponse {
  /**
   * If there might be more results than appear in this response, then
   * nextPageToken is included. To get the next set of results, call the same
   * method again using the value of nextPageToken as pageToken.
   */
  nextPageToken?: string;
  /**
   * A list of sinks.
   */
  sinks?: LogSink[];
}

/**
 * The response from ListViews.
 */
export interface ListViewsResponse {
  /**
   * If there might be more results than appear in this response, then
   * nextPageToken is included. To get the next set of results, call the same
   * method again using the value of nextPageToken as pageToken.
   */
  nextPageToken?: string;
  /**
   * A list of views.
   */
  views?: LogView[];
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
   * The canonical id for this location. For example: "us-east1".
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
   * For example: "projects/example-project/locations/us-east1"
   */
  name?: string;
}

/**
 * Cloud Logging specific location metadata.
 */
export interface LocationMetadata {
  /**
   * Indicates whether or not Log Analytics features are supported in the given
   * location.
   */
  logAnalyticsEnabled?: boolean;
}

/**
 * Additional options for Logging#locationsBucketsCreateAsync.
 */
export interface LocationsBucketsCreateAsyncOptions {
  /**
   * Required. A client-assigned identifier such as "my-bucket". Identifiers
   * are limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  bucketId?: string;
}

/**
 * Additional options for Logging#locationsBucketsCreate.
 */
export interface LocationsBucketsCreateOptions {
  /**
   * Required. A client-assigned identifier such as "my-bucket". Identifiers
   * are limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  bucketId?: string;
}

/**
 * Additional options for Logging#locationsBucketsLinksCreate.
 */
export interface LocationsBucketsLinksCreateOptions {
  /**
   * Required. The ID to use for the link. The link_id can have up to 100
   * characters. A valid link_id must only have alphanumeric characters and
   * underscores within it.
   */
  linkId?: string;
}

/**
 * Additional options for Logging#locationsBucketsLinksList.
 */
export interface LocationsBucketsLinksListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#locationsBucketsList.
 */
export interface LocationsBucketsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#locationsBucketsPatch.
 */
export interface LocationsBucketsPatchOptions {
  /**
   * Required. Field mask that specifies the fields in bucket that need an
   * update. A bucket field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see:
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=retention_days
   */
  updateMask?: string /* FieldMask */;
}

function serializeLocationsBucketsPatchOptions(data: any): LocationsBucketsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeLocationsBucketsPatchOptions(data: any): LocationsBucketsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#locationsBucketsUpdateAsync.
 */
export interface LocationsBucketsUpdateAsyncOptions {
  /**
   * Required. Field mask that specifies the fields in bucket that need an
   * update. A bucket field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see:
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=retention_days
   */
  updateMask?: string /* FieldMask */;
}

function serializeLocationsBucketsUpdateAsyncOptions(data: any): LocationsBucketsUpdateAsyncOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeLocationsBucketsUpdateAsyncOptions(data: any): LocationsBucketsUpdateAsyncOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#locationsBucketsViewsCreate.
 */
export interface LocationsBucketsViewsCreateOptions {
  /**
   * Required. A client-assigned identifier such as "my-view". Identifiers are
   * limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  viewId?: string;
}

/**
 * Additional options for Logging#locationsBucketsViewsList.
 */
export interface LocationsBucketsViewsListOptions {
  /**
   * Optional. The maximum number of results to return from this
   * request.Non-positive values are ignored. The presence of nextPageToken in
   * the response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#locationsBucketsViewsPatch.
 */
export interface LocationsBucketsViewsPatchOptions {
  /**
   * Optional. Field mask that specifies the fields in view that need an
   * update. A field will be overwritten if, and only if, it is in the update
   * mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeLocationsBucketsViewsPatchOptions(data: any): LocationsBucketsViewsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeLocationsBucketsViewsPatchOptions(data: any): LocationsBucketsViewsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#locationsList.
 */
export interface LocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like "displayName=tokyo", and is documented in
   * more detail in AIP-160 (https://google.aip.dev/160).
   */
  filter?: string;
  /**
   * The maximum number of results to return. If not set, the service selects a
   * default.
   */
  pageSize?: number;
  /**
   * A page token received from the next_page_token field in the response. Send
   * that page token to receive the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#locationsOperationsList.
 */
export interface LocationsOperationsListOptions {
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
 * Describes a repository in which log entries are stored.
 */
export interface LogBucket {
  /**
   * Whether log analytics is enabled for this bucket.Once enabled, log
   * analytics features cannot be disabled.
   */
  analyticsEnabled?: boolean;
  /**
   * The CMEK settings of the log bucket. If present, new log entries written
   * to this log bucket are encrypted using the CMEK key provided in this
   * configuration. If a log bucket has CMEK settings, the CMEK settings cannot
   * be disabled later by updating the log bucket. Changing the KMS key is
   * allowed.
   */
  cmekSettings?: CmekSettings;
  /**
   * Output only. The creation timestamp of the bucket. This is not set for any
   * of the default buckets.
   */
  readonly createTime?: Date;
  /**
   * Describes this bucket.
   */
  description?: string;
  /**
   * A list of indexed fields and related configuration data.
   */
  indexConfigs?: IndexConfig[];
  /**
   * Output only. The bucket lifecycle state.
   */
  readonly lifecycleState?:  | "LIFECYCLE_STATE_UNSPECIFIED" | "ACTIVE" | "DELETE_REQUESTED" | "UPDATING" | "CREATING" | "FAILED";
  /**
   * Whether the bucket is locked.The retention period on a locked bucket
   * cannot be changed. Locked buckets may only be deleted if they are empty.
   */
  locked?: boolean;
  /**
   * Output only. The resource name of the bucket.For
   * example:projects/my-project/locations/global/buckets/my-bucketFor a list of
   * supported locations, see Supported Regions
   * (https://cloud.google.com/logging/docs/region-support)For the location of
   * global it is unspecified where log entries are actually stored.After a
   * bucket has been created, the location cannot be changed.
   */
  readonly name?: string;
  /**
   * Log entry field paths that are denied access in this bucket.The following
   * fields and their children are eligible: textPayload, jsonPayload,
   * protoPayload, httpRequest, labels, sourceLocation.Restricting a repeated
   * field will restrict all values. Adding a parent will block all child
   * fields. (e.g. foo.bar will block foo.bar.baz)
   */
  restrictedFields?: string[];
  /**
   * Logs will be retained by default for this amount of time, after which they
   * will automatically be deleted. The minimum retention period is 1 day. If
   * this value is set to zero at bucket creation time, the default time of 30
   * days will be used.
   */
  retentionDays?: number;
  /**
   * Output only. The last update timestamp of the bucket.
   */
  readonly updateTime?: Date;
}

/**
 * An individual entry in a log.
 */
export interface LogEntry {
  /**
   * Optional. Information about the HTTP request associated with this log
   * entry, if applicable.
   */
  httpRequest?: HttpRequest;
  /**
   * Optional. A unique identifier for the log entry. If you provide a value,
   * then Logging considers other log entries in the same project, with the same
   * timestamp, and with the same insert_id to be duplicates which are removed
   * in a single query result. However, there are no guarantees of
   * de-duplication in the export of logs.If the insert_id is omitted when
   * writing a log entry, the Logging API assigns its own unique identifier in
   * this field.In queries, the insert_id is also used to order log entries that
   * have the same log_name and timestamp values.
   */
  insertId?: string;
  /**
   * The log entry payload, represented as a structure that is expressed as a
   * JSON object.
   */
  jsonPayload?: {
    [key: string]: any
  };
  /**
   * Optional. A map of key, value pairs that provides additional information
   * about the log entry. The labels can be user-defined or
   * system-defined.User-defined labels are arbitrary key, value pairs that you
   * can use to classify logs.System-defined labels are defined by GCP services
   * for platform logs. They have two components - a service namespace component
   * and the attribute name. For example:
   * compute.googleapis.com/resource_name.Cloud Logging truncates label keys
   * that exceed 512 B and label values that exceed 64 KB upon their associated
   * log entry being written. The truncation is indicated by an ellipsis at the
   * end of the character string.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. The resource name of the log to which this log entry belongs:
   * "projects/[PROJECT_ID]/logs/[LOG_ID]"
   * "organizations/[ORGANIZATION_ID]/logs/[LOG_ID]"
   * "billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]"
   * "folders/[FOLDER_ID]/logs/[LOG_ID]" A project number may be used in place
   * of PROJECT_ID. The project number is translated to its corresponding
   * PROJECT_ID internally and the log_name field will contain PROJECT_ID in
   * queries and exports.[LOG_ID] must be URL-encoded within log_name. Example:
   * "organizations/1234567890/logs/cloudresourcemanager.googleapis.com%2Factivity".[LOG_ID]
   * must be less than 512 characters long and can only include the following
   * characters: upper and lower case alphanumeric characters, forward-slash,
   * underscore, hyphen, and period.For backward compatibility, if log_name
   * begins with a forward-slash, such as /projects/..., then the log entry is
   * ingested as usual, but the forward-slash is removed. Listing the log entry
   * will not show the leading slash and filtering for a log name with a leading
   * slash will never return any results.
   */
  logName?: string;
  /**
   * Output only. Deprecated. This field is not used by Logging. Any value
   * written to it is cleared.
   */
  readonly metadata?: MonitoredResourceMetadata;
  /**
   * Optional. Information about an operation associated with the log entry, if
   * applicable.
   */
  operation?: LogEntryOperation;
  /**
   * The log entry payload, represented as a protocol buffer. Some Google Cloud
   * Platform services use this field for their log entry payloads.The following
   * protocol buffer types are supported; user-defined types are not
   * supported:"type.googleapis.com/google.cloud.audit.AuditLog"
   * "type.googleapis.com/google.appengine.logging.v1.RequestLog"
   */
  protoPayload?: {
    [key: string]: any
  };
  /**
   * Output only. The time the log entry was received by Logging.
   */
  readonly receiveTimestamp?: Date;
  /**
   * Required. The monitored resource that produced this log entry.Example: a
   * log entry that reports a database error would be associated with the
   * monitored resource designating the particular database that reported the
   * error.
   */
  resource?: MonitoredResource;
  /**
   * Optional. The severity of the log entry. The default value is
   * LogSeverity.DEFAULT.
   */
  severity?:  | "DEFAULT" | "DEBUG" | "INFO" | "NOTICE" | "WARNING" | "ERROR" | "CRITICAL" | "ALERT" | "EMERGENCY";
  /**
   * Optional. Source code location information associated with the log entry,
   * if any.
   */
  sourceLocation?: LogEntrySourceLocation;
  /**
   * Optional. The ID of the Cloud Trace (https://cloud.google.com/trace) span
   * associated with the current operation in which the log is being written.
   * For example, if a span has the REST resource name of
   * "projects/some-project/traces/some-trace/spans/some-span-id", then the
   * span_id field is "some-span-id".A Span
   * (https://cloud.google.com/trace/docs/reference/v2/rest/v2/projects.traces/batchWrite#Span)
   * represents a single operation within a trace. Whereas a trace may involve
   * multiple different microservices running on multiple different machines, a
   * span generally corresponds to a single logical operation being performed in
   * a single instance of a microservice on one specific machine. Spans are the
   * nodes within the tree that is a trace.Applications that are instrumented
   * for tracing (https://cloud.google.com/trace/docs/setup) will generally
   * assign a new, unique span ID on each incoming request. It is also common to
   * create and record additional spans corresponding to internal processing
   * elements as well as issuing requests to dependencies.The span ID is
   * expected to be a 16-character, hexadecimal encoding of an 8-byte array and
   * should not be zero. It should be unique within the trace and should,
   * ideally, be generated in a manner that is uniformly random.Example values:
   * 000000000000004a 7a2190356c3fc94b 0000f00300090021 d39223e101960076
   */
  spanId?: string;
  /**
   * Optional. Information indicating this LogEntry is part of a sequence of
   * multiple log entries split from a single LogEntry.
   */
  split?: LogSplit;
  /**
   * The log entry payload, represented as a Unicode string (UTF-8).
   */
  textPayload?: string;
  /**
   * Optional. The time the event described by the log entry occurred. This
   * time is used to compute the log entry's age and to enforce the logs
   * retention period. If this field is omitted in a new log entry, then Logging
   * assigns it the current time. Timestamps have nanosecond accuracy, but
   * trailing zeros in the fractional seconds might be omitted when the
   * timestamp is displayed.Incoming log entries must have timestamps that don't
   * exceed the logs retention period
   * (https://cloud.google.com/logging/quotas#logs_retention_periods) in the
   * past, and that don't exceed 24 hours in the future. Log entries outside
   * those time boundaries aren't ingested by Logging.
   */
  timestamp?: Date;
  /**
   * Optional. The REST resource name of the trace being written to Cloud Trace
   * (https://cloud.google.com/trace) in association with this log entry. For
   * example, if your trace data is stored in the Cloud project
   * "my-trace-project" and if the service that is creating the log entry
   * receives a trace header that includes the trace ID "12345", then the
   * service should use "projects/my-tracing-project/traces/12345".The trace
   * field provides the link between logs and traces. By using this field, you
   * can navigate from a log entry to a trace.
   */
  trace?: string;
  /**
   * Optional. The sampling decision of the trace associated with the log
   * entry.True means that the trace resource name in the trace field was
   * sampled for storage in a trace backend. False means that the trace was not
   * sampled for storage when this log entry was written, or the sampling
   * decision was unknown at the time. A non-sampled trace value is still useful
   * as a request correlation identifier. The default is False.
   */
  traceSampled?: boolean;
}

function serializeLogEntry(data: any): LogEntry {
  return {
    ...data,
    httpRequest: data["httpRequest"] !== undefined ? serializeHttpRequest(data["httpRequest"]) : undefined,
    sourceLocation: data["sourceLocation"] !== undefined ? serializeLogEntrySourceLocation(data["sourceLocation"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
  };
}

function deserializeLogEntry(data: any): LogEntry {
  return {
    ...data,
    httpRequest: data["httpRequest"] !== undefined ? deserializeHttpRequest(data["httpRequest"]) : undefined,
    receiveTimestamp: data["receiveTimestamp"] !== undefined ? new Date(data["receiveTimestamp"]) : undefined,
    sourceLocation: data["sourceLocation"] !== undefined ? deserializeLogEntrySourceLocation(data["sourceLocation"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
  };
}

/**
 * Additional information about a potentially long-running operation with which
 * a log entry is associated.
 */
export interface LogEntryOperation {
  /**
   * Optional. Set this to True if this is the first log entry in the
   * operation.
   */
  first?: boolean;
  /**
   * Optional. An arbitrary operation identifier. Log entries with the same
   * identifier are assumed to be part of the same operation.
   */
  id?: string;
  /**
   * Optional. Set this to True if this is the last log entry in the operation.
   */
  last?: boolean;
  /**
   * Optional. An arbitrary producer identifier. The combination of id and
   * producer must be globally unique. Examples for producer:
   * "MyDivision.MyBigCompany.com", "github.com/MyProject/MyApplication".
   */
  producer?: string;
}

/**
 * Additional information about the source code location that produced the log
 * entry.
 */
export interface LogEntrySourceLocation {
  /**
   * Optional. Source file name. Depending on the runtime environment, this
   * might be a simple name or a fully-qualified name.
   */
  file?: string;
  /**
   * Optional. Human-readable name of the function or method being invoked,
   * with optional context such as the class or package name. This information
   * may be used in contexts such as the logs viewer, where a file and line
   * number are less meaningful. The format can vary by language. For example:
   * qual.if.ied.Class.method (Java), dir/package.func (Go), function (Python).
   */
  function?: string;
  /**
   * Optional. Line within the source file. 1-based; 0 indicates no line number
   * available.
   */
  line?: bigint;
}

function serializeLogEntrySourceLocation(data: any): LogEntrySourceLocation {
  return {
    ...data,
    line: data["line"] !== undefined ? String(data["line"]) : undefined,
  };
}

function deserializeLogEntrySourceLocation(data: any): LogEntrySourceLocation {
  return {
    ...data,
    line: data["line"] !== undefined ? BigInt(data["line"]) : undefined,
  };
}

/**
 * Specifies a set of log entries that are filtered out by a sink. If your
 * Google Cloud resource receives a large volume of log entries, you can use
 * exclusions to reduce your chargeable logs. Note that exclusions on
 * organization-level and folder-level sinks don't apply to child resources.
 * Note also that you cannot modify the _Required sink or exclude logs from it.
 */
export interface LogExclusion {
  /**
   * Output only. The creation timestamp of the exclusion.This field may not be
   * present for older exclusions.
   */
  readonly createTime?: Date;
  /**
   * Optional. A description of this exclusion.
   */
  description?: string;
  /**
   * Optional. If set to True, then this exclusion is disabled and it does not
   * exclude any log entries. You can update an exclusion to change the value of
   * this field.
   */
  disabled?: boolean;
  /**
   * Required. An advanced logs filter
   * (https://cloud.google.com/logging/docs/view/advanced-queries) that matches
   * the log entries to be excluded. By using the sample function
   * (https://cloud.google.com/logging/docs/view/advanced-queries#sample), you
   * can exclude less than 100% of the matching log entries.For example, the
   * following query matches 99% of low-severity log entries from Google Cloud
   * Storage buckets:resource.type=gcs_bucket severity<ERROR sample(insertId,
   * 0.99)
   */
  filter?: string;
  /**
   * Required. A client-assigned identifier, such as "load-balancer-exclusion".
   * Identifiers are limited to 100 characters and can include only letters,
   * digits, underscores, hyphens, and periods. First character has to be
   * alphanumeric.
   */
  name?: string;
  /**
   * Output only. The last update timestamp of the exclusion.This field may not
   * be present for older exclusions.
   */
  readonly updateTime?: Date;
}

/**
 * Application log line emitted while processing a request.
 */
export interface LogLine {
  /**
   * App-provided log message.
   */
  logMessage?: string;
  /**
   * Severity of this log entry.
   */
  severity?:  | "DEFAULT" | "DEBUG" | "INFO" | "NOTICE" | "WARNING" | "ERROR" | "CRITICAL" | "ALERT" | "EMERGENCY";
  /**
   * Where in the source code this log message was written.
   */
  sourceLocation?: SourceLocation;
  /**
   * Approximate time when this log entry was made.
   */
  time?: Date;
}

function serializeLogLine(data: any): LogLine {
  return {
    ...data,
    sourceLocation: data["sourceLocation"] !== undefined ? serializeSourceLocation(data["sourceLocation"]) : undefined,
    time: data["time"] !== undefined ? data["time"].toISOString() : undefined,
  };
}

function deserializeLogLine(data: any): LogLine {
  return {
    ...data,
    sourceLocation: data["sourceLocation"] !== undefined ? deserializeSourceLocation(data["sourceLocation"]) : undefined,
    time: data["time"] !== undefined ? new Date(data["time"]) : undefined,
  };
}

/**
 * Describes a logs-based metric. The value of the metric is the number of log
 * entries that match a logs filter in a given time interval.Logs-based metrics
 * can also be used to extract values from logs and create a distribution of the
 * values. The distribution records the statistics of the extracted values along
 * with an optional histogram of the values as specified by the bucket options.
 */
export interface LogMetric {
  /**
   * Optional. The resource name of the Log Bucket that owns the Log Metric.
   * Only Log Buckets in projects are supported. The bucket has to be in the
   * same project as the metric.For
   * example:projects/my-project/locations/global/buckets/my-bucketIf empty,
   * then the Log Metric is considered a non-Bucket Log Metric.
   */
  bucketName?: string;
  /**
   * Optional. The bucket_options are required when the logs-based metric is
   * using a DISTRIBUTION value type and it describes the bucket boundaries used
   * to create a histogram of the extracted values.
   */
  bucketOptions?: BucketOptions;
  /**
   * Output only. The creation timestamp of the metric.This field may not be
   * present for older metrics.
   */
  readonly createTime?: Date;
  /**
   * Optional. A description of this metric, which is used in documentation.
   * The maximum length of the description is 8000 characters.
   */
  description?: string;
  /**
   * Optional. If set to True, then this metric is disabled and it does not
   * generate any points.
   */
  disabled?: boolean;
  /**
   * Required. An advanced logs filter
   * (https://cloud.google.com/logging/docs/view/advanced_filters) which is used
   * to match log entries. Example: "resource.type=gae_app AND severity>=ERROR"
   * The maximum length of the filter is 20000 characters.
   */
  filter?: string;
  /**
   * Optional. A map from a label key string to an extractor expression which
   * is used to extract data from a log entry field and assign as the label
   * value. Each label key specified in the LabelDescriptor must have an
   * associated extractor expression in this map. The syntax of the extractor
   * expression is the same as for the value_extractor field.The extracted value
   * is converted to the type defined in the label descriptor. If either the
   * extraction or the type conversion fails, the label will have a default
   * value. The default value for a string label is an empty string, for an
   * integer label its 0, and for a boolean label its false.Note that there are
   * upper bounds on the maximum number of labels and the number of active time
   * series that are allowed in a project.
   */
  labelExtractors?: {
    [key: string]: string
  };
  /**
   * Optional. The metric descriptor associated with the logs-based metric. If
   * unspecified, it uses a default metric descriptor with a DELTA metric kind,
   * INT64 value type, with no labels and a unit of "1". Such a metric counts
   * the number of log entries matching the filter expression.The name, type,
   * and description fields in the metric_descriptor are output only, and is
   * constructed using the name and description field in the LogMetric.To create
   * a logs-based metric that records a distribution of log values, a DELTA
   * metric kind with a DISTRIBUTION value type must be used along with a
   * value_extractor expression in the LogMetric.Each label in the metric
   * descriptor must have a matching label name as the key and an extractor
   * expression as the value in the label_extractors map.The metric_kind and
   * value_type fields in the metric_descriptor cannot be updated once initially
   * configured. New labels can be added in the metric_descriptor, but existing
   * labels cannot be modified except for their description.
   */
  metricDescriptor?: MetricDescriptor;
  /**
   * Required. The client-assigned metric identifier. Examples: "error_count",
   * "nginx/requests".Metric identifiers are limited to 100 characters and can
   * include only the following characters: A-Z, a-z, 0-9, and the special
   * characters _-.,+!*',()%/. The forward-slash character (/) denotes a
   * hierarchy of name pieces, and it cannot be the first character of the
   * name.This field is the [METRIC_ID] part of a metric resource name in the
   * format "projects/PROJECT_ID/metrics/METRIC_ID". Example: If the resource
   * name of a metric is "projects/my-project/metrics/nginx%2Frequests", this
   * field's value is "nginx/requests".
   */
  name?: string;
  /**
   * Output only. The last update timestamp of the metric.This field may not be
   * present for older metrics.
   */
  readonly updateTime?: Date;
  /**
   * Optional. A value_extractor is required when using a distribution
   * logs-based metric to extract the values to record from a log entry. Two
   * functions are supported for value extraction: EXTRACT(field) or
   * REGEXP_EXTRACT(field, regex). The arguments are: field: The name of the log
   * entry field from which the value is to be extracted. regex: A regular
   * expression using the Google RE2 syntax
   * (https://github.com/google/re2/wiki/Syntax) with a single capture group to
   * extract data from the specified log entry field. The value of the field is
   * converted to a string before applying the regex. It is an error to specify
   * a regex that does not include exactly one capture group.The result of the
   * extraction must be convertible to a double type, as the distribution always
   * records double values. If either the extraction or the conversion to double
   * fails, then those values are not recorded in the distribution.Example:
   * REGEXP_EXTRACT(jsonPayload.request, ".*quantity=(\d+).*")
   */
  valueExtractor?: string;
  /**
   * Deprecated. The API version that created or updated this metric. The v2
   * format is used by default and cannot be changed.
   */
  version?:  | "V2" | "V1";
}

function serializeLogMetric(data: any): LogMetric {
  return {
    ...data,
    metricDescriptor: data["metricDescriptor"] !== undefined ? serializeMetricDescriptor(data["metricDescriptor"]) : undefined,
  };
}

function deserializeLogMetric(data: any): LogMetric {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    metricDescriptor: data["metricDescriptor"] !== undefined ? deserializeMetricDescriptor(data["metricDescriptor"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Describes a sink used to export log entries to one of the following
 * destinations in any project: a Cloud Storage bucket, a BigQuery dataset, a
 * Pub/Sub topic or a Cloud Logging log bucket. A logs filter controls which log
 * entries are exported. The sink must be created within a project,
 * organization, billing account, or folder.
 */
export interface LogSink {
  /**
   * Optional. Options that affect sinks exporting data to BigQuery.
   */
  bigqueryOptions?: BigQueryOptions;
  /**
   * Output only. The creation timestamp of the sink.This field may not be
   * present for older sinks.
   */
  readonly createTime?: Date;
  /**
   * Optional. A description of this sink.The maximum length of the description
   * is 8000 characters.
   */
  description?: string;
  /**
   * Required. The export destination: "storage.googleapis.com/[GCS_BUCKET]"
   * "bigquery.googleapis.com/projects/[PROJECT_ID]/datasets/[DATASET]"
   * "pubsub.googleapis.com/projects/[PROJECT_ID]/topics/[TOPIC_ID]" The sink's
   * writer_identity, set when the sink is created, must have permission to
   * write to the destination or else the log entries are not exported. For more
   * information, see Exporting Logs with Sinks
   * (https://cloud.google.com/logging/docs/api/tasks/exporting-logs).
   */
  destination?: string;
  /**
   * Optional. If set to true, then this sink is disabled and it does not
   * export any log entries.
   */
  disabled?: boolean;
  /**
   * Optional. Log entries that match any of these exclusion filters will not
   * be exported.If a log entry is matched by both filter and one of
   * exclusion_filters it will not be exported.
   */
  exclusions?: LogExclusion[];
  /**
   * Optional. An advanced logs filter
   * (https://cloud.google.com/logging/docs/view/advanced-queries). The only
   * exported log entries are those that are in the resource owning the sink and
   * that match the filter.For
   * example:logName="projects/[PROJECT_ID]/logs/[LOG_ID]" AND severity>=ERROR
   */
  filter?: string;
  /**
   * Optional. This field applies only to sinks owned by organizations and
   * folders. If the field is false, the default, only the logs owned by the
   * sink's parent resource are available for export. If the field is true, then
   * log entries from all the projects, folders, and billing accounts contained
   * in the sink's parent resource are also available for export. Whether a
   * particular log entry from the children is exported depends on the sink's
   * filter expression.For example, if this field is true, then the filter
   * resource.type=gce_instance would export all Compute Engine VM instance log
   * entries from all projects in the sink's parent.To only export entries from
   * certain child projects, filter on the project part of the log
   * name:logName:("projects/test-project1/" OR "projects/test-project2/") AND
   * resource.type=gce_instance
   */
  includeChildren?: boolean;
  /**
   * Required. The client-assigned sink identifier, unique within the
   * project.For example: "my-syslog-errors-to-pubsub". Sink identifiers are
   * limited to 100 characters and can include only the following characters:
   * upper and lower-case alphanumeric characters, underscores, hyphens, and
   * periods. First character has to be alphanumeric.
   */
  name?: string;
  /**
   * Deprecated. This field is unused.
   */
  outputVersionFormat?:  | "VERSION_FORMAT_UNSPECIFIED" | "V2" | "V1";
  /**
   * Output only. The last update timestamp of the sink.This field may not be
   * present for older sinks.
   */
  readonly updateTime?: Date;
  /**
   * Output only. An IAM identity—a service account or group—under which Cloud
   * Logging writes the exported log entries to the sink's destination. This
   * field is either set by specifying custom_writer_identity or set
   * automatically by sinks.create and sinks.update based on the value of
   * unique_writer_identity in those methods.Until you grant this identity
   * write-access to the destination, log entry exports from this sink will
   * fail. For more information, see Granting Access for a Resource
   * (https://cloud.google.com/iam/docs/granting-roles-to-service-accounts#granting_access_to_a_service_account_for_a_resource).
   * Consult the destination service's documentation to determine the
   * appropriate IAM roles to assign to the identity.Sinks that have a
   * destination that is a log bucket in the same project as the sink cannot
   * have a writer_identity and no additional permissions are required.
   */
  readonly writerIdentity?: string;
}

/**
 * Additional options for Logging#logsList.
 */
export interface LogsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
  /**
   * Optional. The resource name that owns the logs:
   * projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To
   * support legacy queries, it could also be: projects/[PROJECT_ID]
   * organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID]
   * folders/[FOLDER_ID]
   */
  resourceNames?: string;
}

/**
 * Additional information used to correlate multiple log entries. Used when a
 * single LogEntry would exceed the Google Cloud Logging size limit and is split
 * across multiple log entries.
 */
export interface LogSplit {
  /**
   * The index of this LogEntry in the sequence of split log entries. Log
   * entries are given |index| values 0, 1, ..., n-1 for a sequence of n log
   * entries.
   */
  index?: number;
  /**
   * The total number of log entries that the original LogEntry was split into.
   */
  totalSplits?: number;
  /**
   * A globally unique identifier for all log entries in a sequence of split
   * log entries. All log entries with the same |LogSplit.uid| are assumed to be
   * part of the same sequence of split log entries.
   */
  uid?: string;
}

/**
 * Describes a view over log entries in a bucket.
 */
export interface LogView {
  /**
   * Output only. The creation timestamp of the view.
   */
  readonly createTime?: Date;
  /**
   * Describes this view.
   */
  description?: string;
  /**
   * Filter that restricts which log entries in a bucket are visible in this
   * view.Filters are restricted to be a logical AND of ==/!= of any of the
   * following: originating project/folder/organization/billing account.
   * resource type log idFor example:SOURCE("projects/myproject") AND
   * resource.type = "gce_instance" AND LOG_ID("stdout")
   */
  filter?: string;
  /**
   * The resource name of the view.For
   * example:projects/my-project/locations/global/buckets/my-bucket/views/my-view
   */
  name?: string;
  /**
   * Output only. The last update timestamp of the view.
   */
  readonly updateTime?: Date;
}

/**
 * Defines a metric type and its schema. Once a metric descriptor is created,
 * deleting or altering it stops data collection and makes the metric type's
 * existing data unusable.
 */
export interface MetricDescriptor {
  /**
   * A detailed description of the metric, which can be used in documentation.
   */
  description?: string;
  /**
   * A concise name for the metric, which can be displayed in user interfaces.
   * Use sentence case without an ending period, for example "Request count".
   * This field is optional but it is recommended to be set for any metrics
   * associated with user-visible concepts, such as Quota.
   */
  displayName?: string;
  /**
   * The set of labels that can be used to describe a specific instance of this
   * metric type. For example, the
   * appengine.googleapis.com/http/server/response_latencies metric type has a
   * label for the HTTP response code, response_code, so you can look at
   * latencies for successful responses or just for responses that failed.
   */
  labels?: LabelDescriptor[];
  /**
   * Optional. The launch stage of the metric definition.
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * Optional. Metadata which can be used to guide usage of the metric.
   */
  metadata?: MetricDescriptorMetadata;
  /**
   * Whether the metric records instantaneous values, changes to a value, etc.
   * Some combinations of metric_kind and value_type might not be supported.
   */
  metricKind?:  | "METRIC_KIND_UNSPECIFIED" | "GAUGE" | "DELTA" | "CUMULATIVE";
  /**
   * Read-only. If present, then a time series, which is identified partially
   * by a metric type and a MonitoredResourceDescriptor, that is associated with
   * this metric type can only be associated with one of the monitored resource
   * types listed here.
   */
  monitoredResourceTypes?: string[];
  /**
   * The resource name of the metric descriptor.
   */
  name?: string;
  /**
   * The metric type, including its DNS name prefix. The type is not
   * URL-encoded. All user-defined metric types have the DNS name
   * custom.googleapis.com or external.googleapis.com. Metric types should use a
   * natural hierarchical grouping. For example:
   * "custom.googleapis.com/invoice/paid/amount"
   * "external.googleapis.com/prometheus/up"
   * "appengine.googleapis.com/http/server/response_latencies"
   */
  type?: string;
  /**
   * The units in which the metric value is reported. It is only applicable if
   * the value_type is INT64, DOUBLE, or DISTRIBUTION. The unit defines the
   * representation of the stored metric values.Different systems might scale
   * the values to be more easily displayed (so a value of 0.02kBy might be
   * displayed as 20By, and a value of 3523kBy might be displayed as 3.5MBy).
   * However, if the unit is kBy, then the value of the metric is always in
   * thousands of bytes, no matter how it might be displayed.If you want a
   * custom metric to record the exact number of CPU-seconds used by a job, you
   * can create an INT64 CUMULATIVE metric whose unit is s{CPU} (or equivalently
   * 1s{CPU} or just s). If the job uses 12,005 CPU-seconds, then the value is
   * written as 12005.Alternatively, if you want a custom metric to record data
   * in a more granular way, you can create a DOUBLE CUMULATIVE metric whose
   * unit is ks{CPU}, and then write the value 12.005 (which is 12005/1000), or
   * use Kis{CPU} and write 11.723 (which is 12005/1024).The supported units are
   * a subset of The Unified Code for Units of Measure
   * (https://unitsofmeasure.org/ucum.html) standard:Basic units (UNIT) bit bit
   * By byte s second min minute h hour d day 1 dimensionlessPrefixes (PREFIX) k
   * kilo (10^3) M mega (10^6) G giga (10^9) T tera (10^12) P peta (10^15) E exa
   * (10^18) Z zetta (10^21) Y yotta (10^24) m milli (10^-3) u micro (10^-6) n
   * nano (10^-9) p pico (10^-12) f femto (10^-15) a atto (10^-18) z zepto
   * (10^-21) y yocto (10^-24) Ki kibi (2^10) Mi mebi (2^20) Gi gibi (2^30) Ti
   * tebi (2^40) Pi pebi (2^50)GrammarThe grammar also includes these
   * connectors: / division or ratio (as an infix operator). For examples,
   * kBy/{email} or MiBy/10ms (although you should almost never have /s in a
   * metric unit; rates should always be computed at query time from the
   * underlying cumulative or delta value). . multiplication or composition (as
   * an infix operator). For examples, GBy.d or k{watt}.h.The grammar for a unit
   * is as follows: Expression = Component { "." Component } { "/" Component } ;
   * Component = ( [ PREFIX ] UNIT | "%" ) [ Annotation ] | Annotation | "1" ;
   * Annotation = "{" NAME "}" ; Notes: Annotation is just a comment if it
   * follows a UNIT. If the annotation is used alone, then the unit is
   * equivalent to 1. For examples, {request}/s == 1/s, By{transmitted}/s ==
   * By/s. NAME is a sequence of non-blank printable ASCII characters not
   * containing { or }. 1 represents a unitary dimensionless unit
   * (https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in
   * 1/s. It is typically used when none of the basic units are appropriate. For
   * example, "new users per day" can be represented as 1/d or {new-users}/d
   * (and a metric value 5 would mean "5 new users). Alternatively, "thousands
   * of page views per day" would be represented as 1000/d or k1/d or
   * k{page_views}/d (and a metric value of 5.3 would mean "5300 page views per
   * day"). % represents dimensionless value of 1/100, and annotates values
   * giving a percentage (so the metric values are typically in the range of
   * 0..100, and a metric value 3 means "3 percent"). 10^2.% indicates a metric
   * contains a ratio, typically in the range 0..1, that will be multiplied by
   * 100 and displayed as a percentage (so a metric value 0.03 means "3
   * percent").
   */
  unit?: string;
  /**
   * Whether the measurement is an integer, a floating-point number, etc. Some
   * combinations of metric_kind and value_type might not be supported.
   */
  valueType?:  | "VALUE_TYPE_UNSPECIFIED" | "BOOL" | "INT64" | "DOUBLE" | "STRING" | "DISTRIBUTION" | "MONEY";
}

function serializeMetricDescriptor(data: any): MetricDescriptor {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? serializeMetricDescriptorMetadata(data["metadata"]) : undefined,
  };
}

function deserializeMetricDescriptor(data: any): MetricDescriptor {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? deserializeMetricDescriptorMetadata(data["metadata"]) : undefined,
  };
}

/**
 * Additional annotations that can be used to guide the usage of a metric.
 */
export interface MetricDescriptorMetadata {
  /**
   * The delay of data points caused by ingestion. Data points older than this
   * age are guaranteed to be ingested and available to be read, excluding data
   * loss due to errors.
   */
  ingestDelay?: number /* Duration */;
  /**
   * Deprecated. Must use the MetricDescriptor.launch_stage instead.
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * The sampling period of metric data points. For metrics which are written
   * periodically, consecutive data points are stored at this time interval,
   * excluding data loss due to errors. Metrics with a higher granularity have a
   * smaller sampling period.
   */
  samplePeriod?: number /* Duration */;
}

function serializeMetricDescriptorMetadata(data: any): MetricDescriptorMetadata {
  return {
    ...data,
    ingestDelay: data["ingestDelay"] !== undefined ? data["ingestDelay"] : undefined,
    samplePeriod: data["samplePeriod"] !== undefined ? data["samplePeriod"] : undefined,
  };
}

function deserializeMetricDescriptorMetadata(data: any): MetricDescriptorMetadata {
  return {
    ...data,
    ingestDelay: data["ingestDelay"] !== undefined ? data["ingestDelay"] : undefined,
    samplePeriod: data["samplePeriod"] !== undefined ? data["samplePeriod"] : undefined,
  };
}

/**
 * An object representing a resource that can be used for monitoring, logging,
 * billing, or other purposes. Examples include virtual machine instances,
 * databases, and storage devices such as disks. The type field identifies a
 * MonitoredResourceDescriptor object that describes the resource's schema.
 * Information in the labels field identifies the actual resource and its
 * attributes according to the schema. For example, a particular Compute Engine
 * VM instance could be represented by the following object, because the
 * MonitoredResourceDescriptor for "gce_instance" has labels "project_id",
 * "instance_id" and "zone": { "type": "gce_instance", "labels": { "project_id":
 * "my-project", "instance_id": "12345678901234", "zone": "us-central1-a" }}
 */
export interface MonitoredResource {
  /**
   * Required. Values for all of the labels listed in the associated monitored
   * resource descriptor. For example, Compute Engine VM instances use the
   * labels "project_id", "instance_id", and "zone".
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. The monitored resource type. This field must match the type
   * field of a MonitoredResourceDescriptor object. For example, the type of a
   * Compute Engine VM instance is gce_instance. Some descriptors include the
   * service name in the type; for example, the type of a Datastream stream is
   * datastream.googleapis.com/Stream.
   */
  type?: string;
}

/**
 * An object that describes the schema of a MonitoredResource object using a
 * type name and a set of labels. For example, the monitored resource descriptor
 * for Google Compute Engine VM instances has a type of "gce_instance" and
 * specifies the use of the labels "instance_id" and "zone" to identify
 * particular VM instances.Different APIs can support different monitored
 * resource types. APIs generally provide a list method that returns the
 * monitored resource descriptors used by the API.
 */
export interface MonitoredResourceDescriptor {
  /**
   * Optional. A detailed description of the monitored resource type that might
   * be used in documentation.
   */
  description?: string;
  /**
   * Optional. A concise name for the monitored resource type that might be
   * displayed in user interfaces. It should be a Title Cased Noun Phrase,
   * without any article or other determiners. For example, "Google Cloud SQL
   * Database".
   */
  displayName?: string;
  /**
   * Required. A set of labels used to describe instances of this monitored
   * resource type. For example, an individual Google Cloud SQL database is
   * identified by values for the labels "database_id" and "zone".
   */
  labels?: LabelDescriptor[];
  /**
   * Optional. The launch stage of the monitored resource definition.
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * Optional. The resource name of the monitored resource descriptor:
   * "projects/{project_id}/monitoredResourceDescriptors/{type}" where {type} is
   * the value of the type field in this object and {project_id} is a project ID
   * that provides API-specific context for accessing the type. APIs that do not
   * use project information can use the resource name format
   * "monitoredResourceDescriptors/{type}".
   */
  name?: string;
  /**
   * Required. The monitored resource type. For example, the type
   * "cloudsql_database" represents databases in Google Cloud SQL. For a list of
   * types, see Monitoring resource types
   * (https://cloud.google.com/monitoring/api/resources) and Logging resource
   * types (https://cloud.google.com/logging/docs/api/v2/resource-list).
   */
  type?: string;
}

/**
 * Additional options for Logging#monitoredResourceDescriptorsList.
 */
export interface MonitoredResourceDescriptorsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Auxiliary metadata for a MonitoredResource object. MonitoredResource objects
 * contain the minimum set of information to uniquely identify a monitored
 * resource instance. There is some other useful auxiliary metadata. Monitoring
 * and Logging use an ingestion pipeline to extract metadata for cloud resources
 * of all types, and store the metadata in this message.
 */
export interface MonitoredResourceMetadata {
  /**
   * Output only. Values for predefined system metadata labels. System labels
   * are a kind of metadata extracted by Google, including "machine_image",
   * "vpc", "subnet_id", "security_group", "name", etc. System label values can
   * be only strings, Boolean values, or a list of strings. For example: {
   * "name": "my-test-instance", "security_group": ["a", "b", "c"],
   * "spot_instance": false }
   */
  systemLabels?: {
    [key: string]: any
  };
  /**
   * Output only. A map of user-defined metadata labels.
   */
  userLabels?: {
    [key: string]: string
  };
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface Operation {
  /**
   * If the value is false, it means the operation is still in progress. If
   * true, the operation is completed, and either error or response is
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
   * that originally returns it. If you use the default HTTP mapping, the name
   * should be a resource name ending with operations/{unique_id}.
   */
  name?: string;
  /**
   * The normal response of the operation in case of success. If the original
   * method returns no data on success, such as Delete, the response is
   * google.protobuf.Empty. If the original method is standard
   * Get/Create/Update, the response should be the resource. For other methods,
   * the response should have the type XxxResponse, where Xxx is the original
   * method name. For example, if the original method name is TakeSnapshot(),
   * the inferred response type is TakeSnapshotResponse.
   */
  response?: {
    [key: string]: any
  };
}

/**
 * Additional options for Logging#organizationsExclusionsList.
 */
export interface OrganizationsExclusionsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#organizationsExclusionsPatch.
 */
export interface OrganizationsExclusionsPatchOptions {
  /**
   * Required. A non-empty list of fields to change in the existing exclusion.
   * New values for the fields are taken from the corresponding fields in the
   * LogExclusion included in this request. Fields not mentioned in update_mask
   * are not changed and are ignored in the request.For example, to change the
   * filter and description of an exclusion, specify an update_mask of
   * "filter,description".
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsExclusionsPatchOptions(data: any): OrganizationsExclusionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsExclusionsPatchOptions(data: any): OrganizationsExclusionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#organizationsLocationsBucketsCreateAsync.
 */
export interface OrganizationsLocationsBucketsCreateAsyncOptions {
  /**
   * Required. A client-assigned identifier such as "my-bucket". Identifiers
   * are limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  bucketId?: string;
}

/**
 * Additional options for Logging#organizationsLocationsBucketsCreate.
 */
export interface OrganizationsLocationsBucketsCreateOptions {
  /**
   * Required. A client-assigned identifier such as "my-bucket". Identifiers
   * are limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  bucketId?: string;
}

/**
 * Additional options for Logging#organizationsLocationsBucketsLinksCreate.
 */
export interface OrganizationsLocationsBucketsLinksCreateOptions {
  /**
   * Required. The ID to use for the link. The link_id can have up to 100
   * characters. A valid link_id must only have alphanumeric characters and
   * underscores within it.
   */
  linkId?: string;
}

/**
 * Additional options for Logging#organizationsLocationsBucketsLinksList.
 */
export interface OrganizationsLocationsBucketsLinksListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#organizationsLocationsBucketsList.
 */
export interface OrganizationsLocationsBucketsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#organizationsLocationsBucketsPatch.
 */
export interface OrganizationsLocationsBucketsPatchOptions {
  /**
   * Required. Field mask that specifies the fields in bucket that need an
   * update. A bucket field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see:
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=retention_days
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsLocationsBucketsPatchOptions(data: any): OrganizationsLocationsBucketsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsLocationsBucketsPatchOptions(data: any): OrganizationsLocationsBucketsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#organizationsLocationsBucketsUpdateAsync.
 */
export interface OrganizationsLocationsBucketsUpdateAsyncOptions {
  /**
   * Required. Field mask that specifies the fields in bucket that need an
   * update. A bucket field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see:
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=retention_days
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsLocationsBucketsUpdateAsyncOptions(data: any): OrganizationsLocationsBucketsUpdateAsyncOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsLocationsBucketsUpdateAsyncOptions(data: any): OrganizationsLocationsBucketsUpdateAsyncOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#organizationsLocationsBucketsViewsCreate.
 */
export interface OrganizationsLocationsBucketsViewsCreateOptions {
  /**
   * Required. A client-assigned identifier such as "my-view". Identifiers are
   * limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  viewId?: string;
}

/**
 * Additional options for Logging#organizationsLocationsBucketsViewsList.
 */
export interface OrganizationsLocationsBucketsViewsListOptions {
  /**
   * Optional. The maximum number of results to return from this
   * request.Non-positive values are ignored. The presence of nextPageToken in
   * the response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#organizationsLocationsBucketsViewsLogsList.
 */
export interface OrganizationsLocationsBucketsViewsLogsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
  /**
   * Optional. The resource name that owns the logs:
   * projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To
   * support legacy queries, it could also be: projects/[PROJECT_ID]
   * organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID]
   * folders/[FOLDER_ID]
   */
  resourceNames?: string;
}

/**
 * Additional options for Logging#organizationsLocationsBucketsViewsPatch.
 */
export interface OrganizationsLocationsBucketsViewsPatchOptions {
  /**
   * Optional. Field mask that specifies the fields in view that need an
   * update. A field will be overwritten if, and only if, it is in the update
   * mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsLocationsBucketsViewsPatchOptions(data: any): OrganizationsLocationsBucketsViewsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsLocationsBucketsViewsPatchOptions(data: any): OrganizationsLocationsBucketsViewsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#organizationsLocationsList.
 */
export interface OrganizationsLocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like "displayName=tokyo", and is documented in
   * more detail in AIP-160 (https://google.aip.dev/160).
   */
  filter?: string;
  /**
   * The maximum number of results to return. If not set, the service selects a
   * default.
   */
  pageSize?: number;
  /**
   * A page token received from the next_page_token field in the response. Send
   * that page token to receive the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#organizationsLocationsOperationsList.
 */
export interface OrganizationsLocationsOperationsListOptions {
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
 * Additional options for Logging#organizationsLogsList.
 */
export interface OrganizationsLogsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
  /**
   * Optional. The resource name that owns the logs:
   * projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To
   * support legacy queries, it could also be: projects/[PROJECT_ID]
   * organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID]
   * folders/[FOLDER_ID]
   */
  resourceNames?: string;
}

/**
 * Additional options for Logging#organizationsSinksCreate.
 */
export interface OrganizationsSinksCreateOptions {
  /**
   * Optional. Determines the kind of IAM identity returned as writer_identity
   * in the new sink. If this value is omitted or set to false, and if the
   * sink's parent is a project, then the value returned as writer_identity is
   * the same group or service account used by Cloud Logging before the addition
   * of writer identities to this API. The sink's destination must be in the
   * same project as the sink itself.If this field is set to true, or if the
   * sink is owned by a non-project resource such as an organization, then the
   * value of writer_identity will be a unique service account used only for
   * exports from the new sink. For more information, see writer_identity in
   * LogSink.
   */
  uniqueWriterIdentity?: boolean;
}

/**
 * Additional options for Logging#organizationsSinksList.
 */
export interface OrganizationsSinksListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#organizationsSinksPatch.
 */
export interface OrganizationsSinksPatchOptions {
  /**
   * Optional. See sinks.create for a description of this field. When updating
   * a sink, the effect of this field on the value of writer_identity in the
   * updated sink depends on both the old and new values of this field: If the
   * old and new values of this field are both false or both true, then there is
   * no change to the sink's writer_identity. If the old value is false and the
   * new value is true, then writer_identity is changed to a unique service
   * account. It is an error if the old value is true and the new value is set
   * to false or defaulted to false.
   */
  uniqueWriterIdentity?: boolean;
  /**
   * Optional. Field mask that specifies the fields in sink that need an
   * update. A sink field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.An empty
   * updateMask is temporarily treated as using the following mask for backwards
   * compatibility purposes:destination,filter,includeChildrenAt some point in
   * the future, behavior will be removed and specifying an empty updateMask
   * will be an error.For a detailed FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsSinksPatchOptions(data: any): OrganizationsSinksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsSinksPatchOptions(data: any): OrganizationsSinksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#organizationsSinksUpdate.
 */
export interface OrganizationsSinksUpdateOptions {
  /**
   * Optional. See sinks.create for a description of this field. When updating
   * a sink, the effect of this field on the value of writer_identity in the
   * updated sink depends on both the old and new values of this field: If the
   * old and new values of this field are both false or both true, then there is
   * no change to the sink's writer_identity. If the old value is false and the
   * new value is true, then writer_identity is changed to a unique service
   * account. It is an error if the old value is true and the new value is set
   * to false or defaulted to false.
   */
  uniqueWriterIdentity?: boolean;
  /**
   * Optional. Field mask that specifies the fields in sink that need an
   * update. A sink field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.An empty
   * updateMask is temporarily treated as using the following mask for backwards
   * compatibility purposes:destination,filter,includeChildrenAt some point in
   * the future, behavior will be removed and specifying an empty updateMask
   * will be an error.For a detailed FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsSinksUpdateOptions(data: any): OrganizationsSinksUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsSinksUpdateOptions(data: any): OrganizationsSinksUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#organizationsUpdateCmekSettings.
 */
export interface OrganizationsUpdateCmekSettingsOptions {
  /**
   * Optional. Field mask identifying which fields from cmek_settings should be
   * updated. A field will be overwritten if and only if it is in the update
   * mask. Output only fields cannot be updated.See FieldMask for more
   * information.For example: "updateMask=kmsKeyName"
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsUpdateCmekSettingsOptions(data: any): OrganizationsUpdateCmekSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsUpdateCmekSettingsOptions(data: any): OrganizationsUpdateCmekSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#organizationsUpdateSettings.
 */
export interface OrganizationsUpdateSettingsOptions {
  /**
   * Optional. Field mask identifying which fields from settings should be
   * updated. A field will be overwritten if and only if it is in the update
   * mask. Output only fields cannot be updated.See FieldMask for more
   * information.For example: "updateMask=kmsKeyName"
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsUpdateSettingsOptions(data: any): OrganizationsUpdateSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsUpdateSettingsOptions(data: any): OrganizationsUpdateSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#projectsExclusionsList.
 */
export interface ProjectsExclusionsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#projectsExclusionsPatch.
 */
export interface ProjectsExclusionsPatchOptions {
  /**
   * Required. A non-empty list of fields to change in the existing exclusion.
   * New values for the fields are taken from the corresponding fields in the
   * LogExclusion included in this request. Fields not mentioned in update_mask
   * are not changed and are ignored in the request.For example, to change the
   * filter and description of an exclusion, specify an update_mask of
   * "filter,description".
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsExclusionsPatchOptions(data: any): ProjectsExclusionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsExclusionsPatchOptions(data: any): ProjectsExclusionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#projectsLocationsBucketsCreateAsync.
 */
export interface ProjectsLocationsBucketsCreateAsyncOptions {
  /**
   * Required. A client-assigned identifier such as "my-bucket". Identifiers
   * are limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  bucketId?: string;
}

/**
 * Additional options for Logging#projectsLocationsBucketsCreate.
 */
export interface ProjectsLocationsBucketsCreateOptions {
  /**
   * Required. A client-assigned identifier such as "my-bucket". Identifiers
   * are limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  bucketId?: string;
}

/**
 * Additional options for Logging#projectsLocationsBucketsLinksCreate.
 */
export interface ProjectsLocationsBucketsLinksCreateOptions {
  /**
   * Required. The ID to use for the link. The link_id can have up to 100
   * characters. A valid link_id must only have alphanumeric characters and
   * underscores within it.
   */
  linkId?: string;
}

/**
 * Additional options for Logging#projectsLocationsBucketsLinksList.
 */
export interface ProjectsLocationsBucketsLinksListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#projectsLocationsBucketsList.
 */
export interface ProjectsLocationsBucketsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#projectsLocationsBucketsPatch.
 */
export interface ProjectsLocationsBucketsPatchOptions {
  /**
   * Required. Field mask that specifies the fields in bucket that need an
   * update. A bucket field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see:
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=retention_days
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsBucketsPatchOptions(data: any): ProjectsLocationsBucketsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsBucketsPatchOptions(data: any): ProjectsLocationsBucketsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#projectsLocationsBucketsUpdateAsync.
 */
export interface ProjectsLocationsBucketsUpdateAsyncOptions {
  /**
   * Required. Field mask that specifies the fields in bucket that need an
   * update. A bucket field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see:
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=retention_days
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsBucketsUpdateAsyncOptions(data: any): ProjectsLocationsBucketsUpdateAsyncOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsBucketsUpdateAsyncOptions(data: any): ProjectsLocationsBucketsUpdateAsyncOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#projectsLocationsBucketsViewsCreate.
 */
export interface ProjectsLocationsBucketsViewsCreateOptions {
  /**
   * Required. A client-assigned identifier such as "my-view". Identifiers are
   * limited to 100 characters and can include only letters, digits,
   * underscores, hyphens, and periods.
   */
  viewId?: string;
}

/**
 * Additional options for Logging#projectsLocationsBucketsViewsList.
 */
export interface ProjectsLocationsBucketsViewsListOptions {
  /**
   * Optional. The maximum number of results to return from this
   * request.Non-positive values are ignored. The presence of nextPageToken in
   * the response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#projectsLocationsBucketsViewsLogsList.
 */
export interface ProjectsLocationsBucketsViewsLogsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
  /**
   * Optional. The resource name that owns the logs:
   * projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To
   * support legacy queries, it could also be: projects/[PROJECT_ID]
   * organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID]
   * folders/[FOLDER_ID]
   */
  resourceNames?: string;
}

/**
 * Additional options for Logging#projectsLocationsBucketsViewsPatch.
 */
export interface ProjectsLocationsBucketsViewsPatchOptions {
  /**
   * Optional. Field mask that specifies the fields in view that need an
   * update. A field will be overwritten if, and only if, it is in the update
   * mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsBucketsViewsPatchOptions(data: any): ProjectsLocationsBucketsViewsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsBucketsViewsPatchOptions(data: any): ProjectsLocationsBucketsViewsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#projectsLocationsList.
 */
export interface ProjectsLocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like "displayName=tokyo", and is documented in
   * more detail in AIP-160 (https://google.aip.dev/160).
   */
  filter?: string;
  /**
   * The maximum number of results to return. If not set, the service selects a
   * default.
   */
  pageSize?: number;
  /**
   * A page token received from the next_page_token field in the response. Send
   * that page token to receive the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#projectsLocationsOperationsList.
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
 * Additional options for Logging#projectsLogsList.
 */
export interface ProjectsLogsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
  /**
   * Optional. The resource name that owns the logs:
   * projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]To
   * support legacy queries, it could also be: projects/[PROJECT_ID]
   * organizations/[ORGANIZATION_ID] billingAccounts/[BILLING_ACCOUNT_ID]
   * folders/[FOLDER_ID]
   */
  resourceNames?: string;
}

/**
 * Additional options for Logging#projectsMetricsList.
 */
export interface ProjectsMetricsListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#projectsSinksCreate.
 */
export interface ProjectsSinksCreateOptions {
  /**
   * Optional. Determines the kind of IAM identity returned as writer_identity
   * in the new sink. If this value is omitted or set to false, and if the
   * sink's parent is a project, then the value returned as writer_identity is
   * the same group or service account used by Cloud Logging before the addition
   * of writer identities to this API. The sink's destination must be in the
   * same project as the sink itself.If this field is set to true, or if the
   * sink is owned by a non-project resource such as an organization, then the
   * value of writer_identity will be a unique service account used only for
   * exports from the new sink. For more information, see writer_identity in
   * LogSink.
   */
  uniqueWriterIdentity?: boolean;
}

/**
 * Additional options for Logging#projectsSinksList.
 */
export interface ProjectsSinksListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#projectsSinksPatch.
 */
export interface ProjectsSinksPatchOptions {
  /**
   * Optional. See sinks.create for a description of this field. When updating
   * a sink, the effect of this field on the value of writer_identity in the
   * updated sink depends on both the old and new values of this field: If the
   * old and new values of this field are both false or both true, then there is
   * no change to the sink's writer_identity. If the old value is false and the
   * new value is true, then writer_identity is changed to a unique service
   * account. It is an error if the old value is true and the new value is set
   * to false or defaulted to false.
   */
  uniqueWriterIdentity?: boolean;
  /**
   * Optional. Field mask that specifies the fields in sink that need an
   * update. A sink field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.An empty
   * updateMask is temporarily treated as using the following mask for backwards
   * compatibility purposes:destination,filter,includeChildrenAt some point in
   * the future, behavior will be removed and specifying an empty updateMask
   * will be an error.For a detailed FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsSinksPatchOptions(data: any): ProjectsSinksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsSinksPatchOptions(data: any): ProjectsSinksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#projectsSinksUpdate.
 */
export interface ProjectsSinksUpdateOptions {
  /**
   * Optional. See sinks.create for a description of this field. When updating
   * a sink, the effect of this field on the value of writer_identity in the
   * updated sink depends on both the old and new values of this field: If the
   * old and new values of this field are both false or both true, then there is
   * no change to the sink's writer_identity. If the old value is false and the
   * new value is true, then writer_identity is changed to a unique service
   * account. It is an error if the old value is true and the new value is set
   * to false or defaulted to false.
   */
  uniqueWriterIdentity?: boolean;
  /**
   * Optional. Field mask that specifies the fields in sink that need an
   * update. A sink field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.An empty
   * updateMask is temporarily treated as using the following mask for backwards
   * compatibility purposes:destination,filter,includeChildrenAt some point in
   * the future, behavior will be removed and specifying an empty updateMask
   * will be an error.For a detailed FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsSinksUpdateOptions(data: any): ProjectsSinksUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsSinksUpdateOptions(data: any): ProjectsSinksUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Complete log information about a single HTTP request to an App Engine
 * application.
 */
export interface RequestLog {
  /**
   * App Engine release version.
   */
  appEngineRelease?: string;
  /**
   * Application that handled this request.
   */
  appId?: string;
  /**
   * An indication of the relative cost of serving this request.
   */
  cost?: number;
  /**
   * Time when the request finished.
   */
  endTime?: Date;
  /**
   * Whether this request is finished or active.
   */
  finished?: boolean;
  /**
   * Whether this is the first RequestLog entry for this request. If an active
   * request has several RequestLog entries written to Stackdriver Logging, then
   * this field will be set for one of them.
   */
  first?: boolean;
  /**
   * Internet host and port number of the resource being requested.
   */
  host?: string;
  /**
   * HTTP version of request. Example: "HTTP/1.1".
   */
  httpVersion?: string;
  /**
   * An identifier for the instance that handled the request.
   */
  instanceId?: string;
  /**
   * If the instance processing this request belongs to a manually scaled
   * module, then this is the 0-based index of the instance. Otherwise, this
   * value is -1.
   */
  instanceIndex?: number;
  /**
   * Origin IP address.
   */
  ip?: string;
  /**
   * Latency of the request.
   */
  latency?: number /* Duration */;
  /**
   * A list of log lines emitted by the application while serving this request.
   */
  line?: LogLine[];
  /**
   * Number of CPU megacycles used to process request.
   */
  megaCycles?: bigint;
  /**
   * Request method. Example: "GET", "HEAD", "PUT", "POST", "DELETE".
   */
  method?: string;
  /**
   * Module of the application that handled this request.
   */
  moduleId?: string;
  /**
   * The logged-in user who made the request.Most likely, this is the part of
   * the user's email before the @ sign. The field value is the same for
   * different requests from the same user, but different users can have similar
   * names. This information is also available to the application via the App
   * Engine Users API.This field will be populated starting with App Engine
   * 1.9.21.
   */
  nickname?: string;
  /**
   * Time this request spent in the pending request queue.
   */
  pendingTime?: number /* Duration */;
  /**
   * Referrer URL of request.
   */
  referrer?: string;
  /**
   * Globally unique identifier for a request, which is based on the request
   * start time. Request IDs for requests which started later will compare
   * greater as strings than those for requests which started earlier.
   */
  requestId?: string;
  /**
   * Contains the path and query portion of the URL that was requested. For
   * example, if the URL was "http://example.com/app?name=val", the resource
   * would be "/app?name=val". The fragment identifier, which is identified by
   * the # character, is not included.
   */
  resource?: string;
  /**
   * Size in bytes sent back to client by request.
   */
  responseSize?: bigint;
  /**
   * Source code for the application that handled this request. There can be
   * more than one source reference per deployed application if source code is
   * distributed among multiple repositories.
   */
  sourceReference?: SourceReference[];
  /**
   * Stackdriver Trace span identifier for this request.
   */
  spanId?: string;
  /**
   * Time when the request started.
   */
  startTime?: Date;
  /**
   * HTTP response status code. Example: 200, 404.
   */
  status?: number;
  /**
   * Task name of the request, in the case of an offline request.
   */
  taskName?: string;
  /**
   * Queue name of the request, in the case of an offline request.
   */
  taskQueueName?: string;
  /**
   * Stackdriver Trace identifier for this request.
   */
  traceId?: string;
  /**
   * If true, the value in the 'trace_id' field was sampled for storage in a
   * trace backend.
   */
  traceSampled?: boolean;
  /**
   * File or class that handled the request.
   */
  urlMapEntry?: string;
  /**
   * User agent that made the request.
   */
  userAgent?: string;
  /**
   * Version of the application that handled this request.
   */
  versionId?: string;
  /**
   * Whether this was a loading request for the instance.
   */
  wasLoadingRequest?: boolean;
}

function serializeRequestLog(data: any): RequestLog {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    latency: data["latency"] !== undefined ? data["latency"] : undefined,
    line: data["line"] !== undefined ? data["line"].map((item: any) => (serializeLogLine(item))) : undefined,
    megaCycles: data["megaCycles"] !== undefined ? String(data["megaCycles"]) : undefined,
    pendingTime: data["pendingTime"] !== undefined ? data["pendingTime"] : undefined,
    responseSize: data["responseSize"] !== undefined ? String(data["responseSize"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeRequestLog(data: any): RequestLog {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    latency: data["latency"] !== undefined ? data["latency"] : undefined,
    line: data["line"] !== undefined ? data["line"].map((item: any) => (deserializeLogLine(item))) : undefined,
    megaCycles: data["megaCycles"] !== undefined ? BigInt(data["megaCycles"]) : undefined,
    pendingTime: data["pendingTime"] !== undefined ? data["pendingTime"] : undefined,
    responseSize: data["responseSize"] !== undefined ? BigInt(data["responseSize"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Describes the settings associated with a project, folder, organization,
 * billing account, or flexible resource.
 */
export interface Settings {
  /**
   * Optional. If set to true, the _Default sink in newly created projects and
   * folders will created in a disabled state. This can be used to automatically
   * disable log ingestion if there is already an aggregated sink configured in
   * the hierarchy. The _Default sink can be re-enabled manually if needed.
   */
  disableDefaultSink?: boolean;
  /**
   * Optional. The resource name for the configured Cloud KMS key.KMS key name
   * format:
   * "projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]"
   * For
   * example:"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key"To
   * enable CMEK for the Log Router, set this field to a valid kms_key_name for
   * which the associated service account has the required
   * roles/cloudkms.cryptoKeyEncrypterDecrypter role assigned for the key.The
   * Cloud KMS key used by the Log Router can be updated by changing the
   * kms_key_name to a new valid key name. Encryption operations that are in
   * progress will be completed with the key that was in use when they started.
   * Decryption operations will be completed using the key that was used at the
   * time of encryption unless access to that key has been revoked.To disable
   * CMEK for the Log Router, set this field to an empty string.See Enabling
   * CMEK for Log Router
   * (https://cloud.google.com/logging/docs/routing/managed-encryption) for more
   * information.
   */
  kmsKeyName?: string;
  /**
   * Output only. The service account that will be used by the Log Router to
   * access your Cloud KMS key.Before enabling CMEK for Log Router, you must
   * first assign the role roles/cloudkms.cryptoKeyEncrypterDecrypter to the
   * service account that the Log Router will use to access your Cloud KMS key.
   * Use GetSettings to obtain the service account ID.See Enabling CMEK for Log
   * Router (https://cloud.google.com/logging/docs/routing/managed-encryption)
   * for more information.
   */
  readonly kmsServiceAccountId?: string;
  /**
   * Output only. The resource name of the settings.
   */
  readonly name?: string;
  /**
   * Optional. The Cloud region that will be used for _Default and _Required
   * log buckets for newly created projects and folders. For example
   * europe-west1. This setting does not affect the location of custom log
   * buckets.
   */
  storageLocation?: string;
}

/**
 * Additional options for Logging#sinksCreate.
 */
export interface SinksCreateOptions {
  /**
   * Optional. Determines the kind of IAM identity returned as writer_identity
   * in the new sink. If this value is omitted or set to false, and if the
   * sink's parent is a project, then the value returned as writer_identity is
   * the same group or service account used by Cloud Logging before the addition
   * of writer identities to this API. The sink's destination must be in the
   * same project as the sink itself.If this field is set to true, or if the
   * sink is owned by a non-project resource such as an organization, then the
   * value of writer_identity will be a unique service account used only for
   * exports from the new sink. For more information, see writer_identity in
   * LogSink.
   */
  uniqueWriterIdentity?: boolean;
}

/**
 * Additional options for Logging#sinksList.
 */
export interface SinksListOptions {
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. The presence of nextPageToken in the
   * response indicates that more results might be available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. pageToken must be the value of nextPageToken
   * from the previous response. The values of other method parameters should be
   * identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for Logging#sinksUpdate.
 */
export interface SinksUpdateOptions {
  /**
   * Optional. See sinks.create for a description of this field. When updating
   * a sink, the effect of this field on the value of writer_identity in the
   * updated sink depends on both the old and new values of this field: If the
   * old and new values of this field are both false or both true, then there is
   * no change to the sink's writer_identity. If the old value is false and the
   * new value is true, then writer_identity is changed to a unique service
   * account. It is an error if the old value is true and the new value is set
   * to false or defaulted to false.
   */
  uniqueWriterIdentity?: boolean;
  /**
   * Optional. Field mask that specifies the fields in sink that need an
   * update. A sink field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.An empty
   * updateMask is temporarily treated as using the following mask for backwards
   * compatibility purposes:destination,filter,includeChildrenAt some point in
   * the future, behavior will be removed and specifying an empty updateMask
   * will be an error.For a detailed FieldMask definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=filter
   */
  updateMask?: string /* FieldMask */;
}

function serializeSinksUpdateOptions(data: any): SinksUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeSinksUpdateOptions(data: any): SinksUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Specifies a location in a source code file.
 */
export interface SourceLocation {
  /**
   * Source file name. Depending on the runtime environment, this might be a
   * simple name or a fully-qualified name.
   */
  file?: string;
  /**
   * Human-readable name of the function or method being invoked, with optional
   * context such as the class or package name. This information is used in
   * contexts such as the logs viewer, where a file and line number are less
   * meaningful. The format can vary by language. For example:
   * qual.if.ied.Class.method (Java), dir/package.func (Go), function (Python).
   */
  functionName?: string;
  /**
   * Line within the source file.
   */
  line?: bigint;
}

function serializeSourceLocation(data: any): SourceLocation {
  return {
    ...data,
    line: data["line"] !== undefined ? String(data["line"]) : undefined,
  };
}

function deserializeSourceLocation(data: any): SourceLocation {
  return {
    ...data,
    line: data["line"] !== undefined ? BigInt(data["line"]) : undefined,
  };
}

/**
 * A reference to a particular snapshot of the source tree used to build and
 * deploy an application.
 */
export interface SourceReference {
  /**
   * Optional. A URI string identifying the repository. Example:
   * "https://github.com/GoogleCloudPlatform/kubernetes.git"
   */
  repository?: string;
  /**
   * The canonical and persistent identifier of the deployed revision. Example
   * (git): "0035781c50ec7aa23385dc841529ce8a4b70db1b"
   */
  revisionId?: string;
}

/**
 * The Status type defines a logical error model that is suitable for different
 * programming environments, including REST APIs and RPC APIs. It is used by
 * gRPC (https://github.com/grpc). Each Status message contains three pieces of
 * data: error code, error message, and error details.You can find out more
 * about this error model and how to work with it in the API Design Guide
 * (https://cloud.google.com/apis/design/errors).
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
 * Information about entries that were omitted from the session.
 */
export interface SuppressionInfo {
  /**
   * The reason that entries were omitted from the session.
   */
  reason?:  | "REASON_UNSPECIFIED" | "RATE_LIMIT" | "NOT_CONSUMED";
  /**
   * A lower bound on the count of entries omitted due to reason.
   */
  suppressedCount?: number;
}

/**
 * The parameters to TailLogEntries.
 */
export interface TailLogEntriesRequest {
  /**
   * Optional. The amount of time to buffer log entries at the server before
   * being returned to prevent out of order results due to late arriving log
   * entries. Valid values are between 0-60000 milliseconds. Defaults to 2000
   * milliseconds.
   */
  bufferWindow?: number /* Duration */;
  /**
   * Optional. Only log entries that match the filter are returned. An empty
   * filter matches all log entries in the resources listed in resource_names.
   * Referencing a parent resource that is not listed in resource_names will
   * cause the filter to return no results. The maximum length of a filter is
   * 20,000 characters.
   */
  filter?: string;
  /**
   * Required. Name of a parent resource from which to retrieve log entries:
   * projects/[PROJECT_ID] organizations/[ORGANIZATION_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID] folders/[FOLDER_ID]May alternatively
   * be one or more views:
   * projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   * folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]
   */
  resourceNames?: string[];
}

function serializeTailLogEntriesRequest(data: any): TailLogEntriesRequest {
  return {
    ...data,
    bufferWindow: data["bufferWindow"] !== undefined ? data["bufferWindow"] : undefined,
  };
}

function deserializeTailLogEntriesRequest(data: any): TailLogEntriesRequest {
  return {
    ...data,
    bufferWindow: data["bufferWindow"] !== undefined ? data["bufferWindow"] : undefined,
  };
}

/**
 * Result returned from TailLogEntries.
 */
export interface TailLogEntriesResponse {
  /**
   * A list of log entries. Each response in the stream will order entries with
   * increasing values of LogEntry.timestamp. Ordering is not guaranteed between
   * separate responses.
   */
  entries?: LogEntry[];
  /**
   * If entries that otherwise would have been included in the session were not
   * sent back to the client, counts of relevant entries omitted from the
   * session with the reason that they were not included. There will be at most
   * one of each reason per response. The counts represent the number of
   * suppressed entries since the last streamed response.
   */
  suppressionInfo?: SuppressionInfo[];
}

function serializeTailLogEntriesResponse(data: any): TailLogEntriesResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeLogEntry(item))) : undefined,
  };
}

function deserializeTailLogEntriesResponse(data: any): TailLogEntriesResponse {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeLogEntry(item))) : undefined,
  };
}

/**
 * The parameters to UndeleteBucket.
 */
export interface UndeleteBucketRequest {
}

/**
 * The parameters to UpdateBucket.
 */
export interface UpdateBucketRequest {
  /**
   * Required. The updated bucket.
   */
  bucket?: LogBucket;
  /**
   * Required. The full resource name of the bucket to update.
   * "projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
   * "organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
   * "billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
   * "folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]" For
   * example:"projects/my-project/locations/global/buckets/my-bucket"
   */
  name?: string;
  /**
   * Required. Field mask that specifies the fields in bucket that need an
   * update. A bucket field will be overwritten if, and only if, it is in the
   * update mask. name and output only fields cannot be updated.For a detailed
   * FieldMask definition, see:
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.FieldMaskFor
   * example: updateMask=retention_days
   */
  updateMask?: string /* FieldMask */;
}

function serializeUpdateBucketRequest(data: any): UpdateBucketRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUpdateBucketRequest(data: any): UpdateBucketRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#v2UpdateCmekSettings.
 */
export interface V2UpdateCmekSettingsOptions {
  /**
   * Optional. Field mask identifying which fields from cmek_settings should be
   * updated. A field will be overwritten if and only if it is in the update
   * mask. Output only fields cannot be updated.See FieldMask for more
   * information.For example: "updateMask=kmsKeyName"
   */
  updateMask?: string /* FieldMask */;
}

function serializeV2UpdateCmekSettingsOptions(data: any): V2UpdateCmekSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeV2UpdateCmekSettingsOptions(data: any): V2UpdateCmekSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Logging#v2UpdateSettings.
 */
export interface V2UpdateSettingsOptions {
  /**
   * Optional. Field mask identifying which fields from settings should be
   * updated. A field will be overwritten if and only if it is in the update
   * mask. Output only fields cannot be updated.See FieldMask for more
   * information.For example: "updateMask=kmsKeyName"
   */
  updateMask?: string /* FieldMask */;
}

function serializeV2UpdateSettingsOptions(data: any): V2UpdateSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeV2UpdateSettingsOptions(data: any): V2UpdateSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * The parameters to WriteLogEntries.
 */
export interface WriteLogEntriesRequest {
  /**
   * Optional. If true, the request should expect normal response, but the
   * entries won't be persisted nor exported. Useful for checking whether the
   * logging API endpoints are working properly before sending valuable data.
   */
  dryRun?: boolean;
  /**
   * Required. The log entries to send to Logging. The order of log entries in
   * this list does not matter. Values supplied in this method's log_name,
   * resource, and labels fields are copied into those log entries in this list
   * that do not include values for their corresponding fields. For more
   * information, see the LogEntry type.If the timestamp or insert_id fields are
   * missing in log entries, then this method supplies the current time or a
   * unique identifier, respectively. The supplied values are chosen so that,
   * among the log entries that did not supply their own values, the entries
   * earlier in the list will sort before the entries later in the list. See the
   * entries.list method.Log entries with timestamps that are more than the logs
   * retention period (https://cloud.google.com/logging/quotas) in the past or
   * more than 24 hours in the future will not be available when calling
   * entries.list. However, those log entries can still be exported with
   * LogSinks
   * (https://cloud.google.com/logging/docs/api/tasks/exporting-logs).To improve
   * throughput and to avoid exceeding the quota limit
   * (https://cloud.google.com/logging/quotas) for calls to entries.write, you
   * should try to include several log entries in this list, rather than calling
   * this method for each individual log entry.
   */
  entries?: LogEntry[];
  /**
   * Optional. Default labels that are added to the labels field of all log
   * entries in entries. If a log entry already has a label with the same key as
   * a label in this parameter, then the log entry's label is not changed. See
   * LogEntry.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. A default log resource name that is assigned to all log entries
   * in entries that do not specify a value for log_name:
   * projects/[PROJECT_ID]/logs/[LOG_ID]
   * organizations/[ORGANIZATION_ID]/logs/[LOG_ID]
   * billingAccounts/[BILLING_ACCOUNT_ID]/logs/[LOG_ID]
   * folders/[FOLDER_ID]/logs/[LOG_ID][LOG_ID] must be URL-encoded. For example:
   * "projects/my-project-id/logs/syslog"
   * "organizations/123/logs/cloudaudit.googleapis.com%2Factivity" The
   * permission logging.logEntries.create is needed on each project,
   * organization, billing account, or folder that is receiving new log entries,
   * whether the resource is specified in logName or in an individual log entry.
   */
  logName?: string;
  /**
   * Optional. Whether a batch's valid entries should be written even if some
   * other entry failed due to a permanent error such as INVALID_ARGUMENT or
   * PERMISSION_DENIED. If any entry failed, then the response status is the
   * response status of one of the failed entries. The response will include
   * error details in WriteLogEntriesPartialErrors.log_entry_errors keyed by the
   * entries' zero-based index in the entries. Failed requests for which no
   * entries are written will not include per-entry errors.
   */
  partialSuccess?: boolean;
  /**
   * Optional. A default monitored resource object that is assigned to all log
   * entries in entries that do not specify a value for resource. Example: {
   * "type": "gce_instance", "labels": { "zone": "us-central1-a", "instance_id":
   * "00000000000000000000" }} See LogEntry.
   */
  resource?: MonitoredResource;
}

function serializeWriteLogEntriesRequest(data: any): WriteLogEntriesRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeLogEntry(item))) : undefined,
  };
}

function deserializeWriteLogEntriesRequest(data: any): WriteLogEntriesRequest {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeLogEntry(item))) : undefined,
  };
}

/**
 * Result returned from WriteLogEntries.
 */
export interface WriteLogEntriesResponse {
}