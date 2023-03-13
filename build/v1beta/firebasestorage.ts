// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Storage for Firebase API Client for Deno
 * ==============================================
 * 
 * The Cloud Storage for Firebase API enables programmatic management of Cloud Storage buckets for use in Firebase projects
 * 
 * Docs: https://firebase.google.com/docs/storage
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Cloud Storage for Firebase API enables programmatic management of Cloud
 * Storage buckets for use in Firebase projects
 */
export class FirebaseStorage {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://firebasestorage.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Links a Google Cloud Storage bucket to a Firebase project.
   *
   * @param bucket Required. Resource name of the bucket, mirrors the ID of the underlying Google Cloud Storage bucket, `projects/{project_number}/buckets/{bucket_id}`.
   */
  async projectsBucketsAddFirebase(bucket: string, req: AddFirebaseRequest): Promise<Bucket> {
    const url = new URL(`${this.#baseUrl}v1beta/${ bucket }:addFirebase`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Bucket;
  }

  /**
   * Gets a single linked storage bucket.
   *
   * @param name Required. Resource name of the bucket, mirrors the ID of the underlying Google Cloud Storage bucket, `projects/{project_number}/buckets/{bucket_id}`.
   */
  async projectsBucketsGet(name: string): Promise<Bucket> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Bucket;
  }

  /**
   * Lists the linked storage buckets for a project.
   *
   * @param parent Required. Resource name of the parent Firebase project, `projects/{project_number}`.
   */
  async projectsBucketsList(parent: string, opts: ProjectsBucketsListOptions = {}): Promise<ListBucketsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/buckets`);
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
   * Unlinks a linked Google Cloud Storage bucket from a Firebase project.
   *
   * @param bucket Required. Resource name of the bucket, mirrors the ID of the underlying Google Cloud Storage bucket, `projects/{project_number}/buckets/{bucket_id}`.
   */
  async projectsBucketsRemoveFirebase(bucket: string, req: RemoveFirebaseRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta/${ bucket }:removeFirebase`);
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
 * The request used to link a Google Cloud Storage bucket to a Firebase
 * project.
 */
export interface AddFirebaseRequest {
}

/**
 * A storage bucket and its relation to a parent Firebase project.
 */
export interface Bucket {
  /**
   * Resource name of the bucket.
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
 * Metadata for MigrateLocationDestructively LRO.
 */
export interface GoogleFirebaseStorageControlplaneV1alphaMigrateLocationDestructivelyMetadata {
  /**
   * The time the LRO was created.
   */
  createTime?: Date;
  /**
   * The time the LRO was last updated.
   */
  lastUpdateTime?: Date;
  /**
   * The current state of the migration.
   */
  state?:  | "STATE_UNSPECIFIED" | "PENDING" | "CREATING_TEMP_BUCKET" | "TRANSFERRING_TO_TEMP" | "DELETING_SOURCE_BUCKET" | "CREATING_DESTINATION_BUCKET" | "TRANSFERRING_TO_DESTINATION" | "DELETING_TEMP_BUCKET" | "SUCCEEDED" | "FAILED" | "ROLLING_BACK" | "ROLLED_BACK";
}

function serializeGoogleFirebaseStorageControlplaneV1alphaMigrateLocationDestructivelyMetadata(data: any): GoogleFirebaseStorageControlplaneV1alphaMigrateLocationDestructivelyMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? data["lastUpdateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleFirebaseStorageControlplaneV1alphaMigrateLocationDestructivelyMetadata(data: any): GoogleFirebaseStorageControlplaneV1alphaMigrateLocationDestructivelyMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? new Date(data["lastUpdateTime"]) : undefined,
  };
}

/**
 * Metadata for MigrateLocationDestructively LRO.
 */
export interface GoogleFirebaseStorageControlplaneV1betaMigrateLocationDestructivelyMetadata {
  /**
   * The time the LRO was created.
   */
  createTime?: Date;
  /**
   * The time the LRO was last updated.
   */
  lastUpdateTime?: Date;
  /**
   * The current state of the migration.
   */
  state?:  | "STATE_UNSPECIFIED" | "PENDING" | "CREATING_TEMP_BUCKET" | "TRANSFERRING_TO_TEMP" | "DELETING_SOURCE_BUCKET" | "CREATING_DESTINATION_BUCKET" | "TRANSFERRING_TO_DESTINATION" | "DELETING_TEMP_BUCKET" | "SUCCEEDED" | "FAILED" | "ROLLING_BACK" | "ROLLED_BACK";
}

function serializeGoogleFirebaseStorageControlplaneV1betaMigrateLocationDestructivelyMetadata(data: any): GoogleFirebaseStorageControlplaneV1betaMigrateLocationDestructivelyMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? data["lastUpdateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleFirebaseStorageControlplaneV1betaMigrateLocationDestructivelyMetadata(data: any): GoogleFirebaseStorageControlplaneV1betaMigrateLocationDestructivelyMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? new Date(data["lastUpdateTime"]) : undefined,
  };
}

/**
 * The response returned by `ListBuckets`.
 */
export interface ListBucketsResponse {
  /**
   * The list of linked buckets.
   */
  buckets?: Bucket[];
  /**
   * A token that can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Additional options for FirebaseStorage#projectsBucketsList.
 */
export interface ProjectsBucketsListOptions {
  /**
   * The maximum number of buckets to return. If not set, the server will use a
   * reasonable default.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListBuckets` call. Provide this to
   * retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListBuckets` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * The request used to unlink a Google Cloud Storage bucket from a Firebase
 * project.
 */
export interface RemoveFirebaseRequest {
}