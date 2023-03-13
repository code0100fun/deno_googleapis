// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Storage Transfer API Client for Deno
 * ====================================
 * 
 * Transfers data from external data sources to a Google Cloud Storage bucket or between Google Cloud Storage buckets. 
 * 
 * Docs: https://cloud.google.com/storage-transfer/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Transfers data from external data sources to a Google Cloud Storage bucket
 * or between Google Cloud Storage buckets.
 */
export class StorageTransfer {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://storagetransfer.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns the Google service account that is used by Storage Transfer
   * Service to access buckets in the project where transfers run or in other
   * projects. Each Google service account is associated with one Google Cloud
   * project. Users should add this service account to the Google Cloud Storage
   * bucket ACLs to grant access to Storage Transfer Service. This service
   * account is created and owned by Storage Transfer Service and can only be
   * used by Storage Transfer Service.
   *
   * @param projectId Required. The ID of the Google Cloud project that the Google service account is associated with.
   */
  async googleServiceAccountsGet(projectId: string): Promise<GoogleServiceAccount> {
    const url = new URL(`${this.#baseUrl}v1/googleServiceAccounts/${ projectId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleServiceAccount;
  }

  /**
   * Creates an agent pool resource.
   *
   * @param projectId Required. The ID of the Google Cloud project that owns the agent pool.
   */
  async projectsAgentPoolsCreate(projectId: string, req: AgentPool, opts: ProjectsAgentPoolsCreateOptions = {}): Promise<AgentPool> {
    req = serializeAgentPool(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/agentPools`);
    if (opts.agentPoolId !== undefined) {
      url.searchParams.append("agentPoolId", String(opts.agentPoolId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAgentPool(data);
  }

  /**
   * Deletes an agent pool.
   *
   * @param name Required. The name of the agent pool to delete.
   */
  async projectsAgentPoolsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets an agent pool.
   *
   * @param name Required. The name of the agent pool to get.
   */
  async projectsAgentPoolsGet(name: string): Promise<AgentPool> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAgentPool(data);
  }

  /**
   * Lists agent pools.
   *
   * @param projectId Required. The ID of the Google Cloud project that owns the job.
   */
  async projectsAgentPoolsList(projectId: string, opts: ProjectsAgentPoolsListOptions = {}): Promise<ListAgentPoolsResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/agentPools`);
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
    return deserializeListAgentPoolsResponse(data);
  }

  /**
   * Updates an existing agent pool resource.
   *
   * @param name Required. Specifies a unique string that identifies the agent pool. Format: `projects/{project_id}/agentPools/{agent_pool_id}`
   */
  async projectsAgentPoolsPatch(name: string, req: AgentPool, opts: ProjectsAgentPoolsPatchOptions = {}): Promise<AgentPool> {
    req = serializeAgentPool(req);
    opts = serializeProjectsAgentPoolsPatchOptions(opts);
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
    return deserializeAgentPool(data);
  }

  /**
   * Creates a transfer job that runs periodically.
   *
   */
  async transferJobsCreate(req: TransferJob): Promise<TransferJob> {
    req = serializeTransferJob(req);
    const url = new URL(`${this.#baseUrl}v1/transferJobs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTransferJob(data);
  }

  /**
   * Deletes a transfer job. Deleting a transfer job sets its status to
   * DELETED.
   *
   * @param jobName Required. The job to delete.
   */
  async transferJobsDelete(jobName: string, opts: TransferJobsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ jobName }`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a transfer job.
   *
   * @param jobName Required. The job to get.
   */
  async transferJobsGet(jobName: string, opts: TransferJobsGetOptions = {}): Promise<TransferJob> {
    const url = new URL(`${this.#baseUrl}v1/${ jobName }`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTransferJob(data);
  }

  /**
   * Lists transfer jobs.
   *
   */
  async transferJobsList(opts: TransferJobsListOptions = {}): Promise<ListTransferJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1/transferJobs`);
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
    return deserializeListTransferJobsResponse(data);
  }

  /**
   * Updates a transfer job. Updating a job's transfer spec does not affect
   * transfer operations that are running already. **Note:** The job's status
   * field can be modified using this RPC (for example, to set a job's status to
   * DELETED, DISABLED, or ENABLED).
   *
   * @param jobName Required. The name of job to update.
   */
  async transferJobsPatch(jobName: string, req: UpdateTransferJobRequest): Promise<TransferJob> {
    req = serializeUpdateTransferJobRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ jobName }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeTransferJob(data);
  }

  /**
   * Starts a new operation for the specified transfer job. A `TransferJob` has
   * a maximum of one active `TransferOperation`. If this method is called while
   * a `TransferOperation` is active, an error is returned.
   *
   * @param jobName Required. The name of the transfer job.
   */
  async transferJobsRun(jobName: string, req: RunTransferJobRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ jobName }:run`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Cancels a transfer. Use the transferOperations.get method to check if the
   * cancellation succeeded or if the operation completed despite the `cancel`
   * request. When you cancel an operation, the currently running transfer is
   * interrupted. For recurring transfer jobs, the next instance of the transfer
   * job will still run. For example, if your job is configured to run every day
   * at 1pm and you cancel Monday's operation at 1:05pm, Monday's transfer will
   * stop. However, a transfer job will still be attempted on Tuesday. This
   * applies only to currently running operations. If an operation is not
   * currently running, `cancel` does nothing. *Caution:* Canceling a transfer
   * job can leave your data in an unknown state. We recommend that you restore
   * the state at both the destination and the source after the `cancel` request
   * completes so that your data is in a consistent state. When you cancel a
   * job, the next job computes a delta of files and may repair any inconsistent
   * state. For instance, if you run a job every day, and today's job found 10
   * new files and transferred five files before you canceled the job,
   * tomorrow's transfer operation will compute a new delta with the five files
   * that were not copied today plus any new files discovered tomorrow.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async transferOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
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
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async transferOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists transfer operations. Operations are ordered by their creation time
   * in reverse chronological order.
   *
   * @param name Required. The name of the type being listed; must be `transferOperations`.
   */
  async transferOperationsList(name: string, opts: TransferOperationsListOptions = {}): Promise<ListOperationsResponse> {
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
   * Pauses a transfer operation.
   *
   * @param name Required. The name of the transfer operation.
   */
  async transferOperationsPause(name: string, req: PauseTransferOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:pause`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Resumes a transfer operation that is paused.
   *
   * @param name Required. The name of the transfer operation.
   */
  async transferOperationsResume(name: string, req: ResumeTransferOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:resume`);
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
 * Represents an On-Premises Agent pool.
 */
export interface AgentPool {
  /**
   * Specifies the bandwidth limit details. If this field is unspecified, the
   * default value is set as 'No Limit'.
   */
  bandwidthLimit?: BandwidthLimit;
  /**
   * Specifies the client-specified AgentPool description.
   */
  displayName?: string;
  /**
   * Required. Specifies a unique string that identifies the agent pool.
   * Format: `projects/{project_id}/agentPools/{agent_pool_id}`
   */
  name?: string;
  /**
   * Output only. Specifies the state of the AgentPool.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "CREATED" | "DELETING";
}

function serializeAgentPool(data: any): AgentPool {
  return {
    ...data,
    bandwidthLimit: data["bandwidthLimit"] !== undefined ? serializeBandwidthLimit(data["bandwidthLimit"]) : undefined,
  };
}

function deserializeAgentPool(data: any): AgentPool {
  return {
    ...data,
    bandwidthLimit: data["bandwidthLimit"] !== undefined ? deserializeBandwidthLimit(data["bandwidthLimit"]) : undefined,
  };
}

/**
 * AWS access key (see [AWS Security
 * Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html)).
 * For information on our data retention policy for user credentials, see [User
 * credentials](/storage-transfer/docs/data-retention#user-credentials).
 */
export interface AwsAccessKey {
  /**
   * Required. AWS access key ID.
   */
  accessKeyId?: string;
  /**
   * Required. AWS secret access key. This field is not returned in RPC
   * responses.
   */
  secretAccessKey?: string;
}

/**
 * An AwsS3CompatibleData resource.
 */
export interface AwsS3CompatibleData {
  /**
   * Required. Specifies the name of the bucket.
   */
  bucketName?: string;
  /**
   * Required. Specifies the endpoint of the storage service.
   */
  endpoint?: string;
  /**
   * Specifies the root path to transfer objects. Must be an empty string or
   * full path name that ends with a '/'. This field is treated as an object
   * prefix. As such, it should generally not begin with a '/'.
   */
  path?: string;
  /**
   * Specifies the region to sign requests with. This can be left blank if
   * requests should be signed with an empty region.
   */
  region?: string;
  /**
   * A S3 compatible metadata.
   */
  s3Metadata?: S3CompatibleMetadata;
}

/**
 * An AwsS3Data resource can be a data source, but not a data sink. In an
 * AwsS3Data resource, an object's name is the S3 object's key name.
 */
export interface AwsS3Data {
  /**
   * Input only. AWS access key used to sign the API requests to the AWS S3
   * bucket. Permissions on the bucket must be granted to the access ID of the
   * AWS access key. For information on our data retention policy for user
   * credentials, see [User
   * credentials](/storage-transfer/docs/data-retention#user-credentials).
   */
  awsAccessKey?: AwsAccessKey;
  /**
   * Required. S3 Bucket name (see [Creating a
   * bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/create-bucket-get-location-example.html)).
   */
  bucketName?: string;
  /**
   * Root path to transfer objects. Must be an empty string or full path name
   * that ends with a '/'. This field is treated as an object prefix. As such,
   * it should generally not begin with a '/'.
   */
  path?: string;
  /**
   * The Amazon Resource Name (ARN) of the role to support temporary
   * credentials via `AssumeRoleWithWebIdentity`. For more information about
   * ARNs, see [IAM
   * ARNs](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns).
   * When a role ARN is provided, Transfer Service fetches temporary credentials
   * for the session using a `AssumeRoleWithWebIdentity` call for the provided
   * role using the GoogleServiceAccount for this project.
   */
  roleArn?: string;
}

/**
 * An AzureBlobStorageData resource can be a data source, but not a data sink.
 * An AzureBlobStorageData resource represents one Azure container. The storage
 * account determines the [Azure
 * endpoint](https://docs.microsoft.com/en-us/azure/storage/common/storage-create-storage-account#storage-account-endpoints).
 * In an AzureBlobStorageData resource, a blobs's name is the [Azure Blob
 * Storage blob's key
 * name](https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata#blob-names).
 */
export interface AzureBlobStorageData {
  /**
   * Required. Input only. Credentials used to authenticate API requests to
   * Azure. For information on our data retention policy for user credentials,
   * see [User
   * credentials](/storage-transfer/docs/data-retention#user-credentials).
   */
  azureCredentials?: AzureCredentials;
  /**
   * Required. The container to transfer from the Azure Storage account.
   */
  container?: string;
  /**
   * Root path to transfer objects. Must be an empty string or full path name
   * that ends with a '/'. This field is treated as an object prefix. As such,
   * it should generally not begin with a '/'.
   */
  path?: string;
  /**
   * Required. The name of the Azure Storage account.
   */
  storageAccount?: string;
}

/**
 * Azure credentials For information on our data retention policy for user
 * credentials, see [User
 * credentials](/storage-transfer/docs/data-retention#user-credentials).
 */
export interface AzureCredentials {
  /**
   * Required. Azure shared access signature (SAS). For more information about
   * SAS, see [Grant limited access to Azure Storage resources using shared
   * access signatures
   * (SAS)](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview).
   */
  sasToken?: string;
}

/**
 * Specifies a bandwidth limit for an agent pool.
 */
export interface BandwidthLimit {
  /**
   * Bandwidth rate in megabytes per second, distributed across all the agents
   * in the pool.
   */
  limitMbps?: bigint;
}

function serializeBandwidthLimit(data: any): BandwidthLimit {
  return {
    ...data,
    limitMbps: data["limitMbps"] !== undefined ? String(data["limitMbps"]) : undefined,
  };
}

function deserializeBandwidthLimit(data: any): BandwidthLimit {
  return {
    ...data,
    limitMbps: data["limitMbps"] !== undefined ? BigInt(data["limitMbps"]) : undefined,
  };
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
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
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface Empty {
}

/**
 * An entry describing an error that has occurred.
 */
export interface ErrorLogEntry {
  /**
   * A list of messages that carry the error details.
   */
  errorDetails?: string[];
  /**
   * Required. A URL that refers to the target (a data source, a data sink, or
   * an object) with which the error is associated.
   */
  url?: string;
}

/**
 * A summary of errors by error code, plus a count and sample error log
 * entries.
 */
export interface ErrorSummary {
  /**
   * Required.
   */
  errorCode?:  | "OK" | "CANCELLED" | "UNKNOWN" | "INVALID_ARGUMENT" | "DEADLINE_EXCEEDED" | "NOT_FOUND" | "ALREADY_EXISTS" | "PERMISSION_DENIED" | "UNAUTHENTICATED" | "RESOURCE_EXHAUSTED" | "FAILED_PRECONDITION" | "ABORTED" | "OUT_OF_RANGE" | "UNIMPLEMENTED" | "INTERNAL" | "UNAVAILABLE" | "DATA_LOSS";
  /**
   * Required. Count of this type of error.
   */
  errorCount?: bigint;
  /**
   * Error samples. At most 5 error log entries are recorded for a given error
   * code for a single transfer operation.
   */
  errorLogEntries?: ErrorLogEntry[];
}

function serializeErrorSummary(data: any): ErrorSummary {
  return {
    ...data,
    errorCount: data["errorCount"] !== undefined ? String(data["errorCount"]) : undefined,
  };
}

function deserializeErrorSummary(data: any): ErrorSummary {
  return {
    ...data,
    errorCount: data["errorCount"] !== undefined ? BigInt(data["errorCount"]) : undefined,
  };
}

/**
 * Specifies the Event-driven transfer options. Event-driven transfers listen
 * to an event stream to transfer updated files.
 */
export interface EventStream {
  /**
   * Specifies the data and time at which Storage Transfer Service stops
   * listening for events from this stream. After this time, any transfers in
   * progress will complete, but no new transfers are initiated.
   */
  eventStreamExpirationTime?: Date;
  /**
   * Specifies the date and time that Storage Transfer Service starts listening
   * for events from this stream. If no start time is specified or start time is
   * in the past, Storage Transfer Service starts listening immediately.
   */
  eventStreamStartTime?: Date;
  /**
   * Required. Specifies a unique name of the resource such as AWS SQS ARN in
   * the form 'arn:aws:sqs:region:account_id:queue_name', or Pub/Sub
   * subscription resource name in the form
   * 'projects/{project}/subscriptions/{sub}'.
   */
  name?: string;
}

function serializeEventStream(data: any): EventStream {
  return {
    ...data,
    eventStreamExpirationTime: data["eventStreamExpirationTime"] !== undefined ? data["eventStreamExpirationTime"].toISOString() : undefined,
    eventStreamStartTime: data["eventStreamStartTime"] !== undefined ? data["eventStreamStartTime"].toISOString() : undefined,
  };
}

function deserializeEventStream(data: any): EventStream {
  return {
    ...data,
    eventStreamExpirationTime: data["eventStreamExpirationTime"] !== undefined ? new Date(data["eventStreamExpirationTime"]) : undefined,
    eventStreamStartTime: data["eventStreamStartTime"] !== undefined ? new Date(data["eventStreamStartTime"]) : undefined,
  };
}

/**
 * In a GcsData resource, an object's name is the Cloud Storage object's name
 * and its "last modification time" refers to the object's `updated` property of
 * Cloud Storage objects, which changes when the content or the metadata of the
 * object is updated.
 */
export interface GcsData {
  /**
   * Required. Cloud Storage bucket name. Must meet [Bucket Name
   * Requirements](/storage/docs/naming#requirements).
   */
  bucketName?: string;
  /**
   * Root path to transfer objects. Must be an empty string or full path name
   * that ends with a '/'. This field is treated as an object prefix. As such,
   * it should generally not begin with a '/'. The root path value must meet
   * [Object Name Requirements](/storage/docs/naming#objectnames).
   */
  path?: string;
}

/**
 * Google service account
 */
export interface GoogleServiceAccount {
  /**
   * Email address of the service account.
   */
  accountEmail?: string;
  /**
   * Unique identifier for the service account.
   */
  subjectId?: string;
}

/**
 * An HttpData resource specifies a list of objects on the web to be
 * transferred over HTTP. The information of the objects to be transferred is
 * contained in a file referenced by a URL. The first line in the file must be
 * `"TsvHttpData-1.0"`, which specifies the format of the file. Subsequent lines
 * specify the information of the list of objects, one object per list entry.
 * Each entry has the following tab-delimited fields: * **HTTP URL** — The
 * location of the object. * **Length** — The size of the object in bytes. *
 * **MD5** — The base64-encoded MD5 hash of the object. For an example of a
 * valid TSV file, see [Transferring data from
 * URLs](https://cloud.google.com/storage-transfer/docs/create-url-list). When
 * transferring data based on a URL list, keep the following in mind: * When an
 * object located at `http(s)://hostname:port/` is transferred to a data sink,
 * the name of the object at the data sink is `/`. * If the specified size of an
 * object does not match the actual size of the object fetched, the object is
 * not transferred. * If the specified MD5 does not match the MD5 computed from
 * the transferred bytes, the object transfer fails. * Ensure that each URL you
 * specify is publicly accessible. For example, in Cloud Storage you can [share
 * an object publicly] (/storage/docs/cloud-console#_sharingdata) and get a link
 * to it. * Storage Transfer Service obeys `robots.txt` rules and requires the
 * source HTTP server to support `Range` requests and to return a
 * `Content-Length` header in each response. * ObjectConditions have no effect
 * when filtering objects to transfer.
 */
export interface HttpData {
  /**
   * Required. The URL that points to the file that stores the object list
   * entries. This file must allow public access. Currently, only URLs with HTTP
   * and HTTPS schemes are supported.
   */
  listUrl?: string;
}

/**
 * Response from ListAgentPools.
 */
export interface ListAgentPoolsResponse {
  /**
   * A list of agent pools.
   */
  agentPools?: AgentPool[];
  /**
   * The list next page token.
   */
  nextPageToken?: string;
}

function serializeListAgentPoolsResponse(data: any): ListAgentPoolsResponse {
  return {
    ...data,
    agentPools: data["agentPools"] !== undefined ? data["agentPools"].map((item: any) => (serializeAgentPool(item))) : undefined,
  };
}

function deserializeListAgentPoolsResponse(data: any): ListAgentPoolsResponse {
  return {
    ...data,
    agentPools: data["agentPools"] !== undefined ? data["agentPools"].map((item: any) => (deserializeAgentPool(item))) : undefined,
  };
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
 * Response from ListTransferJobs.
 */
export interface ListTransferJobsResponse {
  /**
   * The list next page token.
   */
  nextPageToken?: string;
  /**
   * A list of transfer jobs.
   */
  transferJobs?: TransferJob[];
}

function serializeListTransferJobsResponse(data: any): ListTransferJobsResponse {
  return {
    ...data,
    transferJobs: data["transferJobs"] !== undefined ? data["transferJobs"].map((item: any) => (serializeTransferJob(item))) : undefined,
  };
}

function deserializeListTransferJobsResponse(data: any): ListTransferJobsResponse {
  return {
    ...data,
    transferJobs: data["transferJobs"] !== undefined ? data["transferJobs"].map((item: any) => (deserializeTransferJob(item))) : undefined,
  };
}

/**
 * Specifies the logging behavior for transfer operations. For cloud-to-cloud
 * transfers, logs are sent to Cloud Logging. See [Read transfer
 * logs](https://cloud.google.com/storage-transfer/docs/read-transfer-logs) for
 * details. For transfers to or from a POSIX file system, logs are stored in the
 * Cloud Storage bucket that is the source or sink of the transfer. See
 * [Managing Transfer for on-premises jobs]
 * (https://cloud.google.com/storage-transfer/docs/managing-on-prem-jobs#viewing-logs)
 * for details.
 */
export interface LoggingConfig {
  /**
   * For transfers with a PosixFilesystem source, this option enables the Cloud
   * Storage transfer logs for this transfer.
   */
  enableOnpremGcsTransferLogs?: boolean;
  /**
   * Specifies the actions to be logged. If empty, no logs are generated. Not
   * supported for transfers with PosixFilesystem data sources; use
   * enable_onprem_gcs_transfer_logs instead.
   */
  logActions?:  | "LOGGABLE_ACTION_UNSPECIFIED" | "FIND" | "DELETE" | "COPY"[];
  /**
   * States in which `log_actions` are logged. If empty, no logs are generated.
   * Not supported for transfers with PosixFilesystem data sources; use
   * enable_onprem_gcs_transfer_logs instead.
   */
  logActionStates?:  | "LOGGABLE_ACTION_STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED"[];
}

/**
 * Specifies the metadata options for running a transfer.
 */
export interface MetadataOptions {
  /**
   * Specifies how each object's ACLs should be preserved for transfers between
   * Google Cloud Storage buckets. If unspecified, the default behavior is the
   * same as ACL_DESTINATION_BUCKET_DEFAULT.
   */
  acl?:  | "ACL_UNSPECIFIED" | "ACL_DESTINATION_BUCKET_DEFAULT" | "ACL_PRESERVE";
  /**
   * Specifies how each file's POSIX group ID (GID) attribute should be handled
   * by the transfer. By default, GID is not preserved. Only applicable to
   * transfers involving POSIX file systems, and ignored for other transfers.
   */
  gid?:  | "GID_UNSPECIFIED" | "GID_SKIP" | "GID_NUMBER";
  /**
   * Specifies how each object's Cloud KMS customer-managed encryption key
   * (CMEK) is preserved for transfers between Google Cloud Storage buckets. If
   * unspecified, the default behavior is the same as
   * KMS_KEY_DESTINATION_BUCKET_DEFAULT.
   */
  kmsKey?:  | "KMS_KEY_UNSPECIFIED" | "KMS_KEY_DESTINATION_BUCKET_DEFAULT" | "KMS_KEY_PRESERVE";
  /**
   * Specifies how each file's mode attribute should be handled by the
   * transfer. By default, mode is not preserved. Only applicable to transfers
   * involving POSIX file systems, and ignored for other transfers.
   */
  mode?:  | "MODE_UNSPECIFIED" | "MODE_SKIP" | "MODE_PRESERVE";
  /**
   * Specifies the storage class to set on objects being transferred to Google
   * Cloud Storage buckets. If unspecified, the default behavior is the same as
   * STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT.
   */
  storageClass?:  | "STORAGE_CLASS_UNSPECIFIED" | "STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT" | "STORAGE_CLASS_PRESERVE" | "STORAGE_CLASS_STANDARD" | "STORAGE_CLASS_NEARLINE" | "STORAGE_CLASS_COLDLINE" | "STORAGE_CLASS_ARCHIVE";
  /**
   * Specifies how symlinks should be handled by the transfer. By default,
   * symlinks are not preserved. Only applicable to transfers involving POSIX
   * file systems, and ignored for other transfers.
   */
  symlink?:  | "SYMLINK_UNSPECIFIED" | "SYMLINK_SKIP" | "SYMLINK_PRESERVE";
  /**
   * Specifies how each object's temporary hold status should be preserved for
   * transfers between Google Cloud Storage buckets. If unspecified, the default
   * behavior is the same as TEMPORARY_HOLD_PRESERVE.
   */
  temporaryHold?:  | "TEMPORARY_HOLD_UNSPECIFIED" | "TEMPORARY_HOLD_SKIP" | "TEMPORARY_HOLD_PRESERVE";
  /**
   * Specifies how each object's `timeCreated` metadata is preserved for
   * transfers between Google Cloud Storage buckets. If unspecified, the default
   * behavior is the same as TIME_CREATED_SKIP.
   */
  timeCreated?:  | "TIME_CREATED_UNSPECIFIED" | "TIME_CREATED_SKIP" | "TIME_CREATED_PRESERVE_AS_CUSTOM_TIME";
  /**
   * Specifies how each file's POSIX user ID (UID) attribute should be handled
   * by the transfer. By default, UID is not preserved. Only applicable to
   * transfers involving POSIX file systems, and ignored for other transfers.
   */
  uid?:  | "UID_UNSPECIFIED" | "UID_SKIP" | "UID_NUMBER";
}

/**
 * Specification to configure notifications published to Pub/Sub. Notifications
 * are published to the customer-provided topic using the following
 * `PubsubMessage.attributes`: * `"eventType"`: one of the EventType values *
 * `"payloadFormat"`: one of the PayloadFormat values * `"projectId"`: the
 * project_id of the `TransferOperation` * `"transferJobName"`: the
 * transfer_job_name of the `TransferOperation` * `"transferOperationName"`: the
 * name of the `TransferOperation` The `PubsubMessage.data` contains a
 * TransferOperation resource formatted according to the specified
 * `PayloadFormat`.
 */
export interface NotificationConfig {
  /**
   * Event types for which a notification is desired. If empty, send
   * notifications for all event types.
   */
  eventTypes?:  | "EVENT_TYPE_UNSPECIFIED" | "TRANSFER_OPERATION_SUCCESS" | "TRANSFER_OPERATION_FAILED" | "TRANSFER_OPERATION_ABORTED"[];
  /**
   * Required. The desired format of the notification message payloads.
   */
  payloadFormat?:  | "PAYLOAD_FORMAT_UNSPECIFIED" | "NONE" | "JSON";
  /**
   * Required. The `Topic.name` of the Pub/Sub topic to which to publish
   * notifications. Must be of the format: `projects/{project}/topics/{topic}`.
   * Not matching this format results in an INVALID_ARGUMENT error.
   */
  pubsubTopic?: string;
}

/**
 * Conditions that determine which objects are transferred. Applies only to
 * Cloud Data Sources such as S3, Azure, and Cloud Storage. The "last
 * modification time" refers to the time of the last change to the object's
 * content or metadata — specifically, this is the `updated` property of Cloud
 * Storage objects, the `LastModified` field of S3 objects, and the
 * `Last-Modified` header of Azure blobs. Transfers with a PosixFilesystem
 * source or destination don't support `ObjectConditions`.
 */
export interface ObjectConditions {
  /**
   * If you specify `exclude_prefixes`, Storage Transfer Service uses the items
   * in the `exclude_prefixes` array to determine which objects to exclude from
   * a transfer. Objects must not start with one of the matching
   * `exclude_prefixes` for inclusion in a transfer. The following are
   * requirements of `exclude_prefixes`: * Each exclude-prefix can contain any
   * sequence of Unicode characters, to a max length of 1024 bytes when
   * UTF8-encoded, and must not contain Carriage Return or Line Feed characters.
   * Wildcard matching and regular expression matching are not supported. * Each
   * exclude-prefix must omit the leading slash. For example, to exclude the
   * object `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the
   * exclude-prefix as `logs/y=2015/requests.gz`. * None of the exclude-prefix
   * values can be empty, if specified. * Each exclude-prefix must exclude a
   * distinct portion of the object namespace. No exclude-prefix may be a prefix
   * of another exclude-prefix. * If include_prefixes is specified, then each
   * exclude-prefix must start with the value of a path explicitly included by
   * `include_prefixes`. The max size of `exclude_prefixes` is 1000. For more
   * information, see [Filtering objects from
   * transfers](/storage-transfer/docs/filtering-objects-from-transfers).
   */
  excludePrefixes?: string[];
  /**
   * If you specify `include_prefixes`, Storage Transfer Service uses the items
   * in the `include_prefixes` array to determine which objects to include in a
   * transfer. Objects must start with one of the matching `include_prefixes`
   * for inclusion in the transfer. If exclude_prefixes is specified, objects
   * must not start with any of the `exclude_prefixes` specified for inclusion
   * in the transfer. The following are requirements of `include_prefixes`: *
   * Each include-prefix can contain any sequence of Unicode characters, to a
   * max length of 1024 bytes when UTF8-encoded, and must not contain Carriage
   * Return or Line Feed characters. Wildcard matching and regular expression
   * matching are not supported. * Each include-prefix must omit the leading
   * slash. For example, to include the object
   * `s3://my-aws-bucket/logs/y=2015/requests.gz`, specify the include-prefix as
   * `logs/y=2015/requests.gz`. * None of the include-prefix values can be
   * empty, if specified. * Each include-prefix must include a distinct portion
   * of the object namespace. No include-prefix may be a prefix of another
   * include-prefix. The max size of `include_prefixes` is 1000. For more
   * information, see [Filtering objects from
   * transfers](/storage-transfer/docs/filtering-objects-from-transfers).
   */
  includePrefixes?: string[];
  /**
   * If specified, only objects with a "last modification time" before this
   * timestamp and objects that don't have a "last modification time" are
   * transferred.
   */
  lastModifiedBefore?: Date;
  /**
   * If specified, only objects with a "last modification time" on or after
   * this timestamp and objects that don't have a "last modification time" are
   * transferred. The `last_modified_since` and `last_modified_before` fields
   * can be used together for chunked data processing. For example, consider a
   * script that processes each day's worth of data at a time. For that you'd
   * set each of the fields as follows: * `last_modified_since` to the start of
   * the day * `last_modified_before` to the end of the day
   */
  lastModifiedSince?: Date;
  /**
   * Ensures that objects are not transferred if a specific maximum time has
   * elapsed since the "last modification time". When a TransferOperation
   * begins, objects with a "last modification time" are transferred only if the
   * elapsed time between the start_time of the `TransferOperation`and the "last
   * modification time" of the object is less than the value of
   * max_time_elapsed_since_last_modification`. Objects that do not have a "last
   * modification time" are also transferred.
   */
  maxTimeElapsedSinceLastModification?: number /* Duration */;
  /**
   * Ensures that objects are not transferred until a specific minimum time has
   * elapsed after the "last modification time". When a TransferOperation
   * begins, objects with a "last modification time" are transferred only if the
   * elapsed time between the start_time of the `TransferOperation` and the
   * "last modification time" of the object is equal to or greater than the
   * value of min_time_elapsed_since_last_modification`. Objects that do not
   * have a "last modification time" are also transferred.
   */
  minTimeElapsedSinceLastModification?: number /* Duration */;
}

function serializeObjectConditions(data: any): ObjectConditions {
  return {
    ...data,
    lastModifiedBefore: data["lastModifiedBefore"] !== undefined ? data["lastModifiedBefore"].toISOString() : undefined,
    lastModifiedSince: data["lastModifiedSince"] !== undefined ? data["lastModifiedSince"].toISOString() : undefined,
    maxTimeElapsedSinceLastModification: data["maxTimeElapsedSinceLastModification"] !== undefined ? data["maxTimeElapsedSinceLastModification"] : undefined,
    minTimeElapsedSinceLastModification: data["minTimeElapsedSinceLastModification"] !== undefined ? data["minTimeElapsedSinceLastModification"] : undefined,
  };
}

function deserializeObjectConditions(data: any): ObjectConditions {
  return {
    ...data,
    lastModifiedBefore: data["lastModifiedBefore"] !== undefined ? new Date(data["lastModifiedBefore"]) : undefined,
    lastModifiedSince: data["lastModifiedSince"] !== undefined ? new Date(data["lastModifiedSince"]) : undefined,
    maxTimeElapsedSinceLastModification: data["maxTimeElapsedSinceLastModification"] !== undefined ? data["maxTimeElapsedSinceLastModification"] : undefined,
    minTimeElapsedSinceLastModification: data["minTimeElapsedSinceLastModification"] !== undefined ? data["minTimeElapsedSinceLastModification"] : undefined,
  };
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
   * Represents the transfer operation object. To request a TransferOperation
   * object, use transferOperations.get.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * The server-assigned unique name. The format of `name` is
   * `transferOperations/some/unique/name`.
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
 * Request passed to PauseTransferOperation.
 */
export interface PauseTransferOperationRequest {
}

/**
 * A POSIX filesystem resource.
 */
export interface PosixFilesystem {
  /**
   * Root directory path to the filesystem.
   */
  rootDirectory?: string;
}

/**
 * Additional options for StorageTransfer#projectsAgentPoolsCreate.
 */
export interface ProjectsAgentPoolsCreateOptions {
  /**
   * Required. The ID of the agent pool to create. The `agent_pool_id` must
   * meet the following requirements: * Length of 128 characters or less. * Not
   * start with the string `goog`. * Start with a lowercase ASCII character,
   * followed by: * Zero or more: lowercase Latin alphabet characters, numerals,
   * hyphens (`-`), periods (`.`), underscores (`_`), or tildes (`~`). * One or
   * more numerals or lowercase ASCII characters. As expressed by the regular
   * expression: `^(?!goog)[a-z]([a-z0-9-._~]*[a-z0-9])?$`.
   */
  agentPoolId?: string;
}

/**
 * Additional options for StorageTransfer#projectsAgentPoolsList.
 */
export interface ProjectsAgentPoolsListOptions {
  /**
   * An optional list of query parameters specified as JSON text in the form
   * of: `{"agentPoolNames":["agentpool1","agentpool2",...]}` Since
   * `agentPoolNames` support multiple values, its values must be specified with
   * array notation. When the filter is either empty or not provided, the list
   * returns all agent pools for the project.
   */
  filter?: string;
  /**
   * The list page size. The max allowed value is `256`.
   */
  pageSize?: number;
  /**
   * The list page token.
   */
  pageToken?: string;
}

/**
 * Additional options for StorageTransfer#projectsAgentPoolsPatch.
 */
export interface ProjectsAgentPoolsPatchOptions {
  /**
   * The [field mask]
   * (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf)
   * of the fields in `agentPool` to update in this request. The following
   * `agentPool` fields can be updated: * display_name * bandwidth_limit
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsAgentPoolsPatchOptions(data: any): ProjectsAgentPoolsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsAgentPoolsPatchOptions(data: any): ProjectsAgentPoolsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request passed to ResumeTransferOperation.
 */
export interface ResumeTransferOperationRequest {
}

/**
 * Request passed to RunTransferJob.
 */
export interface RunTransferJobRequest {
  /**
   * Required. The ID of the Google Cloud project that owns the transfer job.
   */
  projectId?: string;
}

/**
 * S3CompatibleMetadata contains the metadata fields that apply to the basic
 * types of S3-compatible data providers.
 */
export interface S3CompatibleMetadata {
  /**
   * Specifies the authentication and authorization method used by the storage
   * service. When not specified, Transfer Service will attempt to determine
   * right auth method to use.
   */
  authMethod?:  | "AUTH_METHOD_UNSPECIFIED" | "AUTH_METHOD_AWS_SIGNATURE_V4" | "AUTH_METHOD_AWS_SIGNATURE_V2";
  /**
   * The Listing API to use for discovering objects. When not specified,
   * Transfer Service will attempt to determine the right API to use.
   */
  listApi?:  | "LIST_API_UNSPECIFIED" | "LIST_OBJECTS_V2" | "LIST_OBJECTS";
  /**
   * Specifies the network protocol of the agent. When not specified, the
   * default value of NetworkProtocol NETWORK_PROTOCOL_HTTPS is used.
   */
  protocol?:  | "NETWORK_PROTOCOL_UNSPECIFIED" | "NETWORK_PROTOCOL_HTTPS" | "NETWORK_PROTOCOL_HTTP";
  /**
   * Specifies the API request model used to call the storage service. When not
   * specified, the default value of RequestModel
   * REQUEST_MODEL_VIRTUAL_HOSTED_STYLE is used.
   */
  requestModel?:  | "REQUEST_MODEL_UNSPECIFIED" | "REQUEST_MODEL_VIRTUAL_HOSTED_STYLE" | "REQUEST_MODEL_PATH_STYLE";
}

/**
 * Transfers can be scheduled to recur or to run just once.
 */
export interface Schedule {
  /**
   * The time in UTC that no further transfer operations are scheduled.
   * Combined with schedule_end_date, `end_time_of_day` specifies the end date
   * and time for starting new transfer operations. This field must be greater
   * than or equal to the timestamp corresponding to the combintation of
   * schedule_start_date and start_time_of_day, and is subject to the following:
   * * If `end_time_of_day` is not set and `schedule_end_date` is set, then a
   * default value of `23:59:59` is used for `end_time_of_day`. * If
   * `end_time_of_day` is set and `schedule_end_date` is not set, then
   * INVALID_ARGUMENT is returned.
   */
  endTimeOfDay?: TimeOfDay;
  /**
   * Interval between the start of each scheduled TransferOperation. If
   * unspecified, the default value is 24 hours. This value may not be less than
   * 1 hour.
   */
  repeatInterval?: number /* Duration */;
  /**
   * The last day a transfer runs. Date boundaries are determined relative to
   * UTC time. A job runs once per 24 hours within the following guidelines: *
   * If `schedule_end_date` and schedule_start_date are the same and in the
   * future relative to UTC, the transfer is executed only one time. * If
   * `schedule_end_date` is later than `schedule_start_date` and
   * `schedule_end_date` is in the future relative to UTC, the job runs each day
   * at start_time_of_day through `schedule_end_date`.
   */
  scheduleEndDate?: Date;
  /**
   * Required. The start date of a transfer. Date boundaries are determined
   * relative to UTC time. If `schedule_start_date` and start_time_of_day are in
   * the past relative to the job's creation time, the transfer starts the day
   * after you schedule the transfer request. **Note:** When starting jobs at or
   * near midnight UTC it is possible that a job starts later than expected. For
   * example, if you send an outbound request on June 1 one millisecond prior to
   * midnight UTC and the Storage Transfer Service server receives the request
   * on June 2, then it creates a TransferJob with `schedule_start_date` set to
   * June 2 and a `start_time_of_day` set to midnight UTC. The first scheduled
   * TransferOperation takes place on June 3 at midnight UTC.
   */
  scheduleStartDate?: Date;
  /**
   * The time in UTC that a transfer job is scheduled to run. Transfers may
   * start later than this time. If `start_time_of_day` is not specified: *
   * One-time transfers run immediately. * Recurring transfers run immediately,
   * and each day at midnight UTC, through schedule_end_date. If
   * `start_time_of_day` is specified: * One-time transfers run at the specified
   * time. * Recurring transfers run at the specified time each day, through
   * `schedule_end_date`.
   */
  startTimeOfDay?: TimeOfDay;
}

function serializeSchedule(data: any): Schedule {
  return {
    ...data,
    repeatInterval: data["repeatInterval"] !== undefined ? data["repeatInterval"] : undefined,
  };
}

function deserializeSchedule(data: any): Schedule {
  return {
    ...data,
    repeatInterval: data["repeatInterval"] !== undefined ? data["repeatInterval"] : undefined,
  };
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
 * Represents a time of day. The date and time zone are either not significant
 * or are specified elsewhere. An API may choose to allow leap seconds. Related
 * types are google.type.Date and `google.protobuf.Timestamp`.
 */
export interface TimeOfDay {
  /**
   * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose
   * to allow the value "24:00:00" for scenarios like business closing time.
   */
  hours?: number;
  /**
   * Minutes of hour of day. Must be from 0 to 59.
   */
  minutes?: number;
  /**
   * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
   */
  nanos?: number;
  /**
   * Seconds of minutes of the time. Must normally be from 0 to 59. An API may
   * allow the value 60 if it allows leap-seconds.
   */
  seconds?: number;
}

/**
 * A collection of counters that report the progress of a transfer operation.
 */
export interface TransferCounters {
  /**
   * Bytes that are copied to the data sink.
   */
  bytesCopiedToSink?: bigint;
  /**
   * Bytes that are deleted from the data sink.
   */
  bytesDeletedFromSink?: bigint;
  /**
   * Bytes that are deleted from the data source.
   */
  bytesDeletedFromSource?: bigint;
  /**
   * Bytes that failed to be deleted from the data sink.
   */
  bytesFailedToDeleteFromSink?: bigint;
  /**
   * Bytes found in the data source that are scheduled to be transferred,
   * excluding any that are filtered based on object conditions or skipped due
   * to sync.
   */
  bytesFoundFromSource?: bigint;
  /**
   * Bytes found only in the data sink that are scheduled to be deleted.
   */
  bytesFoundOnlyFromSink?: bigint;
  /**
   * Bytes in the data source that failed to be transferred or that failed to
   * be deleted after being transferred.
   */
  bytesFromSourceFailed?: bigint;
  /**
   * Bytes in the data source that are not transferred because they already
   * exist in the data sink.
   */
  bytesFromSourceSkippedBySync?: bigint;
  /**
   * For transfers involving PosixFilesystem only. Number of listing failures
   * for each directory found at the source. Potential failures when listing a
   * directory include permission failure or block failure. If listing a
   * directory fails, no files in the directory are transferred.
   */
  directoriesFailedToListFromSource?: bigint;
  /**
   * For transfers involving PosixFilesystem only. Number of directories found
   * while listing. For example, if the root directory of the transfer is
   * `base/` and there are two other directories, `a/` and `b/` under this
   * directory, the count after listing `base/`, `base/a/` and `base/b/` is 3.
   */
  directoriesFoundFromSource?: bigint;
  /**
   * For transfers involving PosixFilesystem only. Number of successful
   * listings for each directory found at the source.
   */
  directoriesSuccessfullyListedFromSource?: bigint;
  /**
   * Number of successfully cleaned up intermediate objects.
   */
  intermediateObjectsCleanedUp?: bigint;
  /**
   * Number of intermediate objects failed cleaned up.
   */
  intermediateObjectsFailedCleanedUp?: bigint;
  /**
   * Objects that are copied to the data sink.
   */
  objectsCopiedToSink?: bigint;
  /**
   * Objects that are deleted from the data sink.
   */
  objectsDeletedFromSink?: bigint;
  /**
   * Objects that are deleted from the data source.
   */
  objectsDeletedFromSource?: bigint;
  /**
   * Objects that failed to be deleted from the data sink.
   */
  objectsFailedToDeleteFromSink?: bigint;
  /**
   * Objects found in the data source that are scheduled to be transferred,
   * excluding any that are filtered based on object conditions or skipped due
   * to sync.
   */
  objectsFoundFromSource?: bigint;
  /**
   * Objects found only in the data sink that are scheduled to be deleted.
   */
  objectsFoundOnlyFromSink?: bigint;
  /**
   * Objects in the data source that failed to be transferred or that failed to
   * be deleted after being transferred.
   */
  objectsFromSourceFailed?: bigint;
  /**
   * Objects in the data source that are not transferred because they already
   * exist in the data sink.
   */
  objectsFromSourceSkippedBySync?: bigint;
}

function serializeTransferCounters(data: any): TransferCounters {
  return {
    ...data,
    bytesCopiedToSink: data["bytesCopiedToSink"] !== undefined ? String(data["bytesCopiedToSink"]) : undefined,
    bytesDeletedFromSink: data["bytesDeletedFromSink"] !== undefined ? String(data["bytesDeletedFromSink"]) : undefined,
    bytesDeletedFromSource: data["bytesDeletedFromSource"] !== undefined ? String(data["bytesDeletedFromSource"]) : undefined,
    bytesFailedToDeleteFromSink: data["bytesFailedToDeleteFromSink"] !== undefined ? String(data["bytesFailedToDeleteFromSink"]) : undefined,
    bytesFoundFromSource: data["bytesFoundFromSource"] !== undefined ? String(data["bytesFoundFromSource"]) : undefined,
    bytesFoundOnlyFromSink: data["bytesFoundOnlyFromSink"] !== undefined ? String(data["bytesFoundOnlyFromSink"]) : undefined,
    bytesFromSourceFailed: data["bytesFromSourceFailed"] !== undefined ? String(data["bytesFromSourceFailed"]) : undefined,
    bytesFromSourceSkippedBySync: data["bytesFromSourceSkippedBySync"] !== undefined ? String(data["bytesFromSourceSkippedBySync"]) : undefined,
    directoriesFailedToListFromSource: data["directoriesFailedToListFromSource"] !== undefined ? String(data["directoriesFailedToListFromSource"]) : undefined,
    directoriesFoundFromSource: data["directoriesFoundFromSource"] !== undefined ? String(data["directoriesFoundFromSource"]) : undefined,
    directoriesSuccessfullyListedFromSource: data["directoriesSuccessfullyListedFromSource"] !== undefined ? String(data["directoriesSuccessfullyListedFromSource"]) : undefined,
    intermediateObjectsCleanedUp: data["intermediateObjectsCleanedUp"] !== undefined ? String(data["intermediateObjectsCleanedUp"]) : undefined,
    intermediateObjectsFailedCleanedUp: data["intermediateObjectsFailedCleanedUp"] !== undefined ? String(data["intermediateObjectsFailedCleanedUp"]) : undefined,
    objectsCopiedToSink: data["objectsCopiedToSink"] !== undefined ? String(data["objectsCopiedToSink"]) : undefined,
    objectsDeletedFromSink: data["objectsDeletedFromSink"] !== undefined ? String(data["objectsDeletedFromSink"]) : undefined,
    objectsDeletedFromSource: data["objectsDeletedFromSource"] !== undefined ? String(data["objectsDeletedFromSource"]) : undefined,
    objectsFailedToDeleteFromSink: data["objectsFailedToDeleteFromSink"] !== undefined ? String(data["objectsFailedToDeleteFromSink"]) : undefined,
    objectsFoundFromSource: data["objectsFoundFromSource"] !== undefined ? String(data["objectsFoundFromSource"]) : undefined,
    objectsFoundOnlyFromSink: data["objectsFoundOnlyFromSink"] !== undefined ? String(data["objectsFoundOnlyFromSink"]) : undefined,
    objectsFromSourceFailed: data["objectsFromSourceFailed"] !== undefined ? String(data["objectsFromSourceFailed"]) : undefined,
    objectsFromSourceSkippedBySync: data["objectsFromSourceSkippedBySync"] !== undefined ? String(data["objectsFromSourceSkippedBySync"]) : undefined,
  };
}

function deserializeTransferCounters(data: any): TransferCounters {
  return {
    ...data,
    bytesCopiedToSink: data["bytesCopiedToSink"] !== undefined ? BigInt(data["bytesCopiedToSink"]) : undefined,
    bytesDeletedFromSink: data["bytesDeletedFromSink"] !== undefined ? BigInt(data["bytesDeletedFromSink"]) : undefined,
    bytesDeletedFromSource: data["bytesDeletedFromSource"] !== undefined ? BigInt(data["bytesDeletedFromSource"]) : undefined,
    bytesFailedToDeleteFromSink: data["bytesFailedToDeleteFromSink"] !== undefined ? BigInt(data["bytesFailedToDeleteFromSink"]) : undefined,
    bytesFoundFromSource: data["bytesFoundFromSource"] !== undefined ? BigInt(data["bytesFoundFromSource"]) : undefined,
    bytesFoundOnlyFromSink: data["bytesFoundOnlyFromSink"] !== undefined ? BigInt(data["bytesFoundOnlyFromSink"]) : undefined,
    bytesFromSourceFailed: data["bytesFromSourceFailed"] !== undefined ? BigInt(data["bytesFromSourceFailed"]) : undefined,
    bytesFromSourceSkippedBySync: data["bytesFromSourceSkippedBySync"] !== undefined ? BigInt(data["bytesFromSourceSkippedBySync"]) : undefined,
    directoriesFailedToListFromSource: data["directoriesFailedToListFromSource"] !== undefined ? BigInt(data["directoriesFailedToListFromSource"]) : undefined,
    directoriesFoundFromSource: data["directoriesFoundFromSource"] !== undefined ? BigInt(data["directoriesFoundFromSource"]) : undefined,
    directoriesSuccessfullyListedFromSource: data["directoriesSuccessfullyListedFromSource"] !== undefined ? BigInt(data["directoriesSuccessfullyListedFromSource"]) : undefined,
    intermediateObjectsCleanedUp: data["intermediateObjectsCleanedUp"] !== undefined ? BigInt(data["intermediateObjectsCleanedUp"]) : undefined,
    intermediateObjectsFailedCleanedUp: data["intermediateObjectsFailedCleanedUp"] !== undefined ? BigInt(data["intermediateObjectsFailedCleanedUp"]) : undefined,
    objectsCopiedToSink: data["objectsCopiedToSink"] !== undefined ? BigInt(data["objectsCopiedToSink"]) : undefined,
    objectsDeletedFromSink: data["objectsDeletedFromSink"] !== undefined ? BigInt(data["objectsDeletedFromSink"]) : undefined,
    objectsDeletedFromSource: data["objectsDeletedFromSource"] !== undefined ? BigInt(data["objectsDeletedFromSource"]) : undefined,
    objectsFailedToDeleteFromSink: data["objectsFailedToDeleteFromSink"] !== undefined ? BigInt(data["objectsFailedToDeleteFromSink"]) : undefined,
    objectsFoundFromSource: data["objectsFoundFromSource"] !== undefined ? BigInt(data["objectsFoundFromSource"]) : undefined,
    objectsFoundOnlyFromSink: data["objectsFoundOnlyFromSink"] !== undefined ? BigInt(data["objectsFoundOnlyFromSink"]) : undefined,
    objectsFromSourceFailed: data["objectsFromSourceFailed"] !== undefined ? BigInt(data["objectsFromSourceFailed"]) : undefined,
    objectsFromSourceSkippedBySync: data["objectsFromSourceSkippedBySync"] !== undefined ? BigInt(data["objectsFromSourceSkippedBySync"]) : undefined,
  };
}

/**
 * This resource represents the configuration of a transfer job that runs
 * periodically.
 */
export interface TransferJob {
  /**
   * Output only. The time that the transfer job was created.
   */
  readonly creationTime?: Date;
  /**
   * Output only. The time that the transfer job was deleted.
   */
  readonly deletionTime?: Date;
  /**
   * A description provided by the user for the job. Its max length is 1024
   * bytes when Unicode-encoded.
   */
  description?: string;
  /**
   * Specifies the event stream for the transfer job for event-driven
   * transfers. When EventStream is specified, the Schedule fields are ignored.
   */
  eventStream?: EventStream;
  /**
   * Output only. The time that the transfer job was last modified.
   */
  readonly lastModificationTime?: Date;
  /**
   * The name of the most recently started TransferOperation of this JobConfig.
   * Present if a TransferOperation has been created for this JobConfig.
   */
  latestOperationName?: string;
  /**
   * Logging configuration.
   */
  loggingConfig?: LoggingConfig;
  /**
   * A unique name (within the transfer project) assigned when the job is
   * created. If this field is empty in a CreateTransferJobRequest, Storage
   * Transfer Service assigns a unique name. Otherwise, the specified name is
   * used as the unique name for this job. If the specified name is in use by a
   * job, the creation request fails with an ALREADY_EXISTS error. This name
   * must start with `"transferJobs/"` prefix and end with a letter or a number,
   * and should be no more than 128 characters. For transfers involving
   * PosixFilesystem, this name must start with `transferJobs/OPI` specifically.
   * For all other transfer types, this name must not start with
   * `transferJobs/OPI`. Non-PosixFilesystem example:
   * `"transferJobs/^(?!OPI)[A-Za-z0-9-._~]*[A-Za-z0-9]$"` PosixFilesystem
   * example: `"transferJobs/OPI^[A-Za-z0-9-._~]*[A-Za-z0-9]$"` Applications
   * must not rely on the enforcement of naming requirements involving OPI.
   * Invalid job names fail with an INVALID_ARGUMENT error.
   */
  name?: string;
  /**
   * Notification configuration. This is not supported for transfers involving
   * PosixFilesystem.
   */
  notificationConfig?: NotificationConfig;
  /**
   * The ID of the Google Cloud project that owns the job.
   */
  projectId?: string;
  /**
   * Specifies schedule for the transfer job. This is an optional field. When
   * the field is not set, the job never executes a transfer, unless you invoke
   * RunTransferJob or update the job to have a non-empty schedule.
   */
  schedule?: Schedule;
  /**
   * Status of the job. This value MUST be specified for
   * `CreateTransferJobRequests`. **Note:** The effect of the new job status
   * takes place during a subsequent job run. For example, if you change the job
   * status from ENABLED to DISABLED, and an operation spawned by the transfer
   * is running, the status change would not affect the current operation.
   */
  status?:  | "STATUS_UNSPECIFIED" | "ENABLED" | "DISABLED" | "DELETED";
  /**
   * Transfer specification.
   */
  transferSpec?: TransferSpec;
}

function serializeTransferJob(data: any): TransferJob {
  return {
    ...data,
    eventStream: data["eventStream"] !== undefined ? serializeEventStream(data["eventStream"]) : undefined,
    schedule: data["schedule"] !== undefined ? serializeSchedule(data["schedule"]) : undefined,
    transferSpec: data["transferSpec"] !== undefined ? serializeTransferSpec(data["transferSpec"]) : undefined,
  };
}

function deserializeTransferJob(data: any): TransferJob {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
    deletionTime: data["deletionTime"] !== undefined ? new Date(data["deletionTime"]) : undefined,
    eventStream: data["eventStream"] !== undefined ? deserializeEventStream(data["eventStream"]) : undefined,
    lastModificationTime: data["lastModificationTime"] !== undefined ? new Date(data["lastModificationTime"]) : undefined,
    schedule: data["schedule"] !== undefined ? deserializeSchedule(data["schedule"]) : undefined,
    transferSpec: data["transferSpec"] !== undefined ? deserializeTransferSpec(data["transferSpec"]) : undefined,
  };
}

/**
 * Additional options for StorageTransfer#transferJobsDelete.
 */
export interface TransferJobsDeleteOptions {
  /**
   * Required. The ID of the Google Cloud project that owns the job.
   */
  projectId: string;
}

/**
 * Additional options for StorageTransfer#transferJobsGet.
 */
export interface TransferJobsGetOptions {
  /**
   * Required. The ID of the Google Cloud project that owns the job.
   */
  projectId: string;
}

/**
 * Additional options for StorageTransfer#transferJobsList.
 */
export interface TransferJobsListOptions {
  /**
   * Required. A list of query parameters specified as JSON text in the form
   * of: `{"projectId":"my_project_id", "jobNames":["jobid1","jobid2",...],
   * "jobStatuses":["status1","status2",...]}` Since `jobNames` and
   * `jobStatuses` support multiple values, their values must be specified with
   * array notation. `projectId` is required. `jobNames` and `jobStatuses` are
   * optional. The valid values for `jobStatuses` are case-insensitive: ENABLED,
   * DISABLED, and DELETED.
   */
  filter: string;
  /**
   * The list page size. The max allowed value is 256.
   */
  pageSize?: number;
  /**
   * The list page token.
   */
  pageToken?: string;
}

/**
 * Specifies where the manifest is located.
 */
export interface TransferManifest {
  /**
   * Specifies the path to the manifest in Cloud Storage. The Google-managed
   * service account for the transfer must have `storage.objects.get` permission
   * for this object. An example path is `gs://bucket_name/path/manifest.csv`.
   */
  location?: string;
}

/**
 * A description of the execution of a transfer.
 */
export interface TransferOperation {
  /**
   * Information about the progress of the transfer operation.
   */
  counters?: TransferCounters;
  /**
   * End time of this transfer execution.
   */
  endTime?: Date;
  /**
   * Summarizes errors encountered with sample error log entries.
   */
  errorBreakdowns?: ErrorSummary[];
  /**
   * Cloud Logging configuration.
   */
  loggingConfig?: LoggingConfig;
  /**
   * A globally unique ID assigned by the system.
   */
  name?: string;
  /**
   * Notification configuration.
   */
  notificationConfig?: NotificationConfig;
  /**
   * The ID of the Google Cloud project that owns the operation.
   */
  projectId?: string;
  /**
   * Start time of this transfer execution.
   */
  startTime?: Date;
  /**
   * Status of the transfer operation.
   */
  status?:  | "STATUS_UNSPECIFIED" | "IN_PROGRESS" | "PAUSED" | "SUCCESS" | "FAILED" | "ABORTED" | "QUEUED" | "SUSPENDING";
  /**
   * The name of the transfer job that triggers this transfer operation.
   */
  transferJobName?: string;
  /**
   * Transfer specification.
   */
  transferSpec?: TransferSpec;
}

function serializeTransferOperation(data: any): TransferOperation {
  return {
    ...data,
    counters: data["counters"] !== undefined ? serializeTransferCounters(data["counters"]) : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    errorBreakdowns: data["errorBreakdowns"] !== undefined ? data["errorBreakdowns"].map((item: any) => (serializeErrorSummary(item))) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    transferSpec: data["transferSpec"] !== undefined ? serializeTransferSpec(data["transferSpec"]) : undefined,
  };
}

function deserializeTransferOperation(data: any): TransferOperation {
  return {
    ...data,
    counters: data["counters"] !== undefined ? deserializeTransferCounters(data["counters"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    errorBreakdowns: data["errorBreakdowns"] !== undefined ? data["errorBreakdowns"].map((item: any) => (deserializeErrorSummary(item))) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    transferSpec: data["transferSpec"] !== undefined ? deserializeTransferSpec(data["transferSpec"]) : undefined,
  };
}

/**
 * Additional options for StorageTransfer#transferOperationsList.
 */
export interface TransferOperationsListOptions {
  /**
   * Required. A list of query parameters specified as JSON text in the form
   * of: `{"projectId":"my_project_id", "jobNames":["jobid1","jobid2",...],
   * "operationNames":["opid1","opid2",...],
   * "transferStatuses":["status1","status2",...]}` Since `jobNames`,
   * `operationNames`, and `transferStatuses` support multiple values, they must
   * be specified with array notation. `projectId` is required. `jobNames`,
   * `operationNames`, and `transferStatuses` are optional. The valid values for
   * `transferStatuses` are case-insensitive: IN_PROGRESS, PAUSED, SUCCESS,
   * FAILED, and ABORTED.
   */
  filter: string;
  /**
   * The list page size. The max allowed value is 256.
   */
  pageSize?: number;
  /**
   * The list page token.
   */
  pageToken?: string;
}

/**
 * TransferOptions define the actions to be performed on objects in a transfer.
 */
export interface TransferOptions {
  /**
   * Whether objects should be deleted from the source after they are
   * transferred to the sink. **Note:** This option and
   * delete_objects_unique_in_sink are mutually exclusive.
   */
  deleteObjectsFromSourceAfterTransfer?: boolean;
  /**
   * Whether objects that exist only in the sink should be deleted. **Note:**
   * This option and delete_objects_from_source_after_transfer are mutually
   * exclusive.
   */
  deleteObjectsUniqueInSink?: boolean;
  /**
   * Represents the selected metadata options for a transfer job.
   */
  metadataOptions?: MetadataOptions;
  /**
   * When to overwrite objects that already exist in the sink. The default is
   * that only objects that are different from the source are ovewritten. If
   * true, all objects in the sink whose name matches an object in the source
   * are overwritten with the source object.
   */
  overwriteObjectsAlreadyExistingInSink?: boolean;
  /**
   * When to overwrite objects that already exist in the sink. If not set,
   * overwrite behavior is determined by
   * overwrite_objects_already_existing_in_sink.
   */
  overwriteWhen?:  | "OVERWRITE_WHEN_UNSPECIFIED" | "DIFFERENT" | "NEVER" | "ALWAYS";
}

/**
 * Configuration for running a transfer.
 */
export interface TransferSpec {
  /**
   * An AWS S3 compatible data source.
   */
  awsS3CompatibleDataSource?: AwsS3CompatibleData;
  /**
   * An AWS S3 data source.
   */
  awsS3DataSource?: AwsS3Data;
  /**
   * An Azure Blob Storage data source.
   */
  azureBlobStorageDataSource?: AzureBlobStorageData;
  /**
   * A Cloud Storage data sink.
   */
  gcsDataSink?: GcsData;
  /**
   * A Cloud Storage data source.
   */
  gcsDataSource?: GcsData;
  /**
   * Cloud Storage intermediate data location.
   */
  gcsIntermediateDataLocation?: GcsData;
  /**
   * An HTTP URL data source.
   */
  httpDataSource?: HttpData;
  /**
   * Only objects that satisfy these object conditions are included in the set
   * of data source and data sink objects. Object conditions based on objects'
   * "last modification time" do not exclude objects in a data sink.
   */
  objectConditions?: ObjectConditions;
  /**
   * A POSIX Filesystem data sink.
   */
  posixDataSink?: PosixFilesystem;
  /**
   * A POSIX Filesystem data source.
   */
  posixDataSource?: PosixFilesystem;
  /**
   * Specifies the agent pool name associated with the posix data sink. When
   * unspecified, the default name is used.
   */
  sinkAgentPoolName?: string;
  /**
   * Specifies the agent pool name associated with the posix data source. When
   * unspecified, the default name is used.
   */
  sourceAgentPoolName?: string;
  /**
   * A manifest file provides a list of objects to be transferred from the data
   * source. This field points to the location of the manifest file. Otherwise,
   * the entire source bucket is used. ObjectConditions still apply.
   */
  transferManifest?: TransferManifest;
  /**
   * If the option delete_objects_unique_in_sink is `true` and time-based
   * object conditions such as 'last modification time' are specified, the
   * request fails with an INVALID_ARGUMENT error.
   */
  transferOptions?: TransferOptions;
}

function serializeTransferSpec(data: any): TransferSpec {
  return {
    ...data,
    objectConditions: data["objectConditions"] !== undefined ? serializeObjectConditions(data["objectConditions"]) : undefined,
  };
}

function deserializeTransferSpec(data: any): TransferSpec {
  return {
    ...data,
    objectConditions: data["objectConditions"] !== undefined ? deserializeObjectConditions(data["objectConditions"]) : undefined,
  };
}

/**
 * Request passed to UpdateTransferJob.
 */
export interface UpdateTransferJobRequest {
  /**
   * Required. The ID of the Google Cloud project that owns the job.
   */
  projectId?: string;
  /**
   * Required. The job to update. `transferJob` is expected to specify one or
   * more of five fields: description, transfer_spec, notification_config,
   * logging_config, and status. An `UpdateTransferJobRequest` that specifies
   * other fields are rejected with the error INVALID_ARGUMENT. Updating a job
   * status to DELETED requires `storagetransfer.jobs.delete` permission.
   */
  transferJob?: TransferJob;
  /**
   * The field mask of the fields in `transferJob` that are to be updated in
   * this request. Fields in `transferJob` that can be updated are: description,
   * transfer_spec, notification_config, logging_config, and status. To update
   * the `transfer_spec` of the job, a complete transfer specification must be
   * provided. An incomplete specification missing any required fields is
   * rejected with the error INVALID_ARGUMENT.
   */
  updateTransferJobFieldMask?: string /* FieldMask */;
}

function serializeUpdateTransferJobRequest(data: any): UpdateTransferJobRequest {
  return {
    ...data,
    transferJob: data["transferJob"] !== undefined ? serializeTransferJob(data["transferJob"]) : undefined,
    updateTransferJobFieldMask: data["updateTransferJobFieldMask"] !== undefined ? data["updateTransferJobFieldMask"] : undefined,
  };
}

function deserializeUpdateTransferJobRequest(data: any): UpdateTransferJobRequest {
  return {
    ...data,
    transferJob: data["transferJob"] !== undefined ? deserializeTransferJob(data["transferJob"]) : undefined,
    updateTransferJobFieldMask: data["updateTransferJobFieldMask"] !== undefined ? data["updateTransferJobFieldMask"] : undefined,
  };
}