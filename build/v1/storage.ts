// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Storage JSON API Client for Deno
 * ======================================
 * 
 * Stores and retrieves potentially large, immutable data objects.
 * 
 * Docs: https://developers.google.com/storage/docs/json_api/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Stores and retrieves potentially large, immutable data objects.
 */
export class Storage {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://storage.googleapis.com/storage/v1/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Permanently deletes the ACL entry for the specified entity on the
   * specified bucket.
   *
   * @param bucket Name of a bucket.
   * @param entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
   */
  async bucketAccessControlsDelete(bucket: string, entity: string, opts: BucketAccessControlsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/acl/${ entity }`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns the ACL entry for the specified entity on the specified bucket.
   *
   * @param bucket Name of a bucket.
   * @param entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
   */
  async bucketAccessControlsGet(bucket: string, entity: string, opts: BucketAccessControlsGetOptions = {}): Promise<BucketAccessControl> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/acl/${ entity }`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as BucketAccessControl;
  }

  /**
   * Creates a new ACL entry on the specified bucket.
   *
   * @param bucket Name of a bucket.
   */
  async bucketAccessControlsInsert(bucket: string, req: BucketAccessControl, opts: BucketAccessControlsInsertOptions = {}): Promise<BucketAccessControl> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/acl`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BucketAccessControl;
  }

  /**
   * Retrieves ACL entries on the specified bucket.
   *
   * @param bucket Name of a bucket.
   */
  async bucketAccessControlsList(bucket: string, opts: BucketAccessControlsListOptions = {}): Promise<BucketAccessControls> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/acl`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as BucketAccessControls;
  }

  /**
   * Patches an ACL entry on the specified bucket.
   *
   * @param bucket Name of a bucket.
   * @param entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
   */
  async bucketAccessControlsPatch(bucket: string, entity: string, req: BucketAccessControl, opts: BucketAccessControlsPatchOptions = {}): Promise<BucketAccessControl> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/acl/${ entity }`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as BucketAccessControl;
  }

  /**
   * Updates an ACL entry on the specified bucket.
   *
   * @param bucket Name of a bucket.
   * @param entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
   */
  async bucketAccessControlsUpdate(bucket: string, entity: string, req: BucketAccessControl, opts: BucketAccessControlsUpdateOptions = {}): Promise<BucketAccessControl> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/acl/${ entity }`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as BucketAccessControl;
  }

  /**
   * Permanently deletes an empty bucket.
   *
   * @param bucket Name of a bucket.
   */
  async bucketsDelete(bucket: string, opts: BucketsDeleteOptions = {}): Promise<void> {
    opts = serializeBucketsDeleteOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }`);
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.ifMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifMetagenerationNotMatch", String(opts.ifMetagenerationNotMatch));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns metadata for the specified bucket.
   *
   * @param bucket Name of a bucket.
   */
  async bucketsGet(bucket: string, opts: BucketsGetOptions = {}): Promise<Bucket> {
    opts = serializeBucketsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }`);
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.ifMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifMetagenerationNotMatch", String(opts.ifMetagenerationNotMatch));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBucket(data);
  }

  /**
   * Returns an IAM policy for the specified bucket.
   *
   * @param bucket Name of a bucket.
   */
  async bucketsGetIamPolicy(bucket: string, opts: BucketsGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/iam`);
    if (opts.optionsRequestedPolicyVersion !== undefined) {
      url.searchParams.append("optionsRequestedPolicyVersion", String(opts.optionsRequestedPolicyVersion));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Creates a new bucket.
   *
   */
  async bucketsInsert(req: Bucket, opts: BucketsInsertOptions = {}): Promise<Bucket> {
    req = serializeBucket(req);
    const url = new URL(`${this.#baseUrl}b`);
    if (opts.predefinedAcl !== undefined) {
      url.searchParams.append("predefinedAcl", String(opts.predefinedAcl));
    }
    if (opts.predefinedDefaultObjectAcl !== undefined) {
      url.searchParams.append("predefinedDefaultObjectAcl", String(opts.predefinedDefaultObjectAcl));
    }
    if (opts.project !== undefined) {
      url.searchParams.append("project", String(opts.project));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBucket(data);
  }

  /**
   * Retrieves a list of buckets for a given project.
   *
   */
  async bucketsList(opts: BucketsListOptions = {}): Promise<Buckets> {
    const url = new URL(`${this.#baseUrl}b`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.prefix !== undefined) {
      url.searchParams.append("prefix", String(opts.prefix));
    }
    if (opts.project !== undefined) {
      url.searchParams.append("project", String(opts.project));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBuckets(data);
  }

  /**
   * Locks retention policy on a bucket.
   *
   * @param bucket Name of a bucket.
   */
  async bucketsLockRetentionPolicy(bucket: string, opts: BucketsLockRetentionPolicyOptions = {}): Promise<Bucket> {
    opts = serializeBucketsLockRetentionPolicyOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/lockRetentionPolicy`);
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeBucket(data);
  }

  /**
   * Patches a bucket. Changes to the bucket will be readable immediately after
   * writing, but configuration changes may take time to propagate.
   *
   * @param bucket Name of a bucket.
   */
  async bucketsPatch(bucket: string, req: Bucket, opts: BucketsPatchOptions = {}): Promise<Bucket> {
    req = serializeBucket(req);
    opts = serializeBucketsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }`);
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.ifMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifMetagenerationNotMatch", String(opts.ifMetagenerationNotMatch));
    }
    if (opts.predefinedAcl !== undefined) {
      url.searchParams.append("predefinedAcl", String(opts.predefinedAcl));
    }
    if (opts.predefinedDefaultObjectAcl !== undefined) {
      url.searchParams.append("predefinedDefaultObjectAcl", String(opts.predefinedDefaultObjectAcl));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeBucket(data);
  }

  /**
   * Updates an IAM policy for the specified bucket.
   *
   * @param bucket Name of a bucket.
   */
  async bucketsSetIamPolicy(bucket: string, req: Policy, opts: BucketsSetIamPolicyOptions = {}): Promise<Policy> {
    req = serializePolicy(req);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/iam`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Tests a set of permissions on the given bucket to see which, if any, are
   * held by the caller.
   *
   * @param bucket Name of a bucket.
   */
  async bucketsTestIamPermissions(bucket: string, opts: BucketsTestIamPermissionsOptions = {}): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/iam/testPermissions`);
    if (opts.permissions !== undefined) {
      url.searchParams.append("permissions", String(opts.permissions));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Updates a bucket. Changes to the bucket will be readable immediately after
   * writing, but configuration changes may take time to propagate.
   *
   * @param bucket Name of a bucket.
   */
  async bucketsUpdate(bucket: string, req: Bucket, opts: BucketsUpdateOptions = {}): Promise<Bucket> {
    req = serializeBucket(req);
    opts = serializeBucketsUpdateOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }`);
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.ifMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifMetagenerationNotMatch", String(opts.ifMetagenerationNotMatch));
    }
    if (opts.predefinedAcl !== undefined) {
      url.searchParams.append("predefinedAcl", String(opts.predefinedAcl));
    }
    if (opts.predefinedDefaultObjectAcl !== undefined) {
      url.searchParams.append("predefinedDefaultObjectAcl", String(opts.predefinedDefaultObjectAcl));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeBucket(data);
  }

  /**
   * Stop watching resources through this channel
   *
   */
  async channelsStop(req: Channel): Promise<void> {
    req = serializeChannel(req);
    const url = new URL(`${this.#baseUrl}channels/stop`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * Permanently deletes the default object ACL entry for the specified entity
   * on the specified bucket.
   *
   * @param bucket Name of a bucket.
   * @param entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
   */
  async defaultObjectAccessControlsDelete(bucket: string, entity: string, opts: DefaultObjectAccessControlsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/defaultObjectAcl/${ entity }`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns the default object ACL entry for the specified entity on the
   * specified bucket.
   *
   * @param bucket Name of a bucket.
   * @param entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
   */
  async defaultObjectAccessControlsGet(bucket: string, entity: string, opts: DefaultObjectAccessControlsGetOptions = {}): Promise<ObjectAccessControl> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/defaultObjectAcl/${ entity }`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeObjectAccessControl(data);
  }

  /**
   * Creates a new default object ACL entry on the specified bucket.
   *
   * @param bucket Name of a bucket.
   */
  async defaultObjectAccessControlsInsert(bucket: string, req: ObjectAccessControl, opts: DefaultObjectAccessControlsInsertOptions = {}): Promise<ObjectAccessControl> {
    req = serializeObjectAccessControl(req);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/defaultObjectAcl`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeObjectAccessControl(data);
  }

  /**
   * Retrieves default object ACL entries on the specified bucket.
   *
   * @param bucket Name of a bucket.
   */
  async defaultObjectAccessControlsList(bucket: string, opts: DefaultObjectAccessControlsListOptions = {}): Promise<ObjectAccessControls> {
    opts = serializeDefaultObjectAccessControlsListOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/defaultObjectAcl`);
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.ifMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifMetagenerationNotMatch", String(opts.ifMetagenerationNotMatch));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeObjectAccessControls(data);
  }

  /**
   * Patches a default object ACL entry on the specified bucket.
   *
   * @param bucket Name of a bucket.
   * @param entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
   */
  async defaultObjectAccessControlsPatch(bucket: string, entity: string, req: ObjectAccessControl, opts: DefaultObjectAccessControlsPatchOptions = {}): Promise<ObjectAccessControl> {
    req = serializeObjectAccessControl(req);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/defaultObjectAcl/${ entity }`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeObjectAccessControl(data);
  }

  /**
   * Updates a default object ACL entry on the specified bucket.
   *
   * @param bucket Name of a bucket.
   * @param entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
   */
  async defaultObjectAccessControlsUpdate(bucket: string, entity: string, req: ObjectAccessControl, opts: DefaultObjectAccessControlsUpdateOptions = {}): Promise<ObjectAccessControl> {
    req = serializeObjectAccessControl(req);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/defaultObjectAcl/${ entity }`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeObjectAccessControl(data);
  }

  /**
   * Permanently deletes a notification subscription.
   *
   * @param bucket The parent bucket of the notification.
   * @param notification ID of the notification to delete.
   */
  async notificationsDelete(bucket: string, notification: string, opts: NotificationsDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/notificationConfigs/${ notification }`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * View a notification configuration.
   *
   * @param bucket The parent bucket of the notification.
   * @param notification Notification ID
   */
  async notificationsGet(bucket: string, notification: string, opts: NotificationsGetOptions = {}): Promise<Notification> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/notificationConfigs/${ notification }`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Notification;
  }

  /**
   * Creates a notification subscription for a given bucket.
   *
   * @param bucket The parent bucket of the notification.
   */
  async notificationsInsert(bucket: string, req: Notification, opts: NotificationsInsertOptions = {}): Promise<Notification> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/notificationConfigs`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Notification;
  }

  /**
   * Retrieves a list of notification subscriptions for a given bucket.
   *
   * @param bucket Name of a Google Cloud Storage bucket.
   */
  async notificationsList(bucket: string, opts: NotificationsListOptions = {}): Promise<Notifications> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/notificationConfigs`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Notifications;
  }

  /**
   * Permanently deletes the ACL entry for the specified entity on the
   * specified object.
   *
   * @param bucket Name of a bucket.
   * @param entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
   * @param object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectAccessControlsDelete(bucket: string, entity: string, object: string, opts: ObjectAccessControlsDeleteOptions = {}): Promise<void> {
    opts = serializeObjectAccessControlsDeleteOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/${ object }/acl/${ entity }`);
    if (opts.generation !== undefined) {
      url.searchParams.append("generation", String(opts.generation));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns the ACL entry for the specified entity on the specified object.
   *
   * @param bucket Name of a bucket.
   * @param entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
   * @param object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectAccessControlsGet(bucket: string, entity: string, object: string, opts: ObjectAccessControlsGetOptions = {}): Promise<ObjectAccessControl> {
    opts = serializeObjectAccessControlsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/${ object }/acl/${ entity }`);
    if (opts.generation !== undefined) {
      url.searchParams.append("generation", String(opts.generation));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeObjectAccessControl(data);
  }

  /**
   * Creates a new ACL entry on the specified object.
   *
   * @param bucket Name of a bucket.
   * @param object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectAccessControlsInsert(bucket: string, object: string, req: ObjectAccessControl, opts: ObjectAccessControlsInsertOptions = {}): Promise<ObjectAccessControl> {
    req = serializeObjectAccessControl(req);
    opts = serializeObjectAccessControlsInsertOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/${ object }/acl`);
    if (opts.generation !== undefined) {
      url.searchParams.append("generation", String(opts.generation));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeObjectAccessControl(data);
  }

  /**
   * Retrieves ACL entries on the specified object.
   *
   * @param bucket Name of a bucket.
   * @param object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectAccessControlsList(bucket: string, object: string, opts: ObjectAccessControlsListOptions = {}): Promise<ObjectAccessControls> {
    opts = serializeObjectAccessControlsListOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/${ object }/acl`);
    if (opts.generation !== undefined) {
      url.searchParams.append("generation", String(opts.generation));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeObjectAccessControls(data);
  }

  /**
   * Patches an ACL entry on the specified object.
   *
   * @param bucket Name of a bucket.
   * @param entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
   * @param object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectAccessControlsPatch(bucket: string, entity: string, object: string, req: ObjectAccessControl, opts: ObjectAccessControlsPatchOptions = {}): Promise<ObjectAccessControl> {
    req = serializeObjectAccessControl(req);
    opts = serializeObjectAccessControlsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/${ object }/acl/${ entity }`);
    if (opts.generation !== undefined) {
      url.searchParams.append("generation", String(opts.generation));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeObjectAccessControl(data);
  }

  /**
   * Updates an ACL entry on the specified object.
   *
   * @param bucket Name of a bucket.
   * @param entity The entity holding the permission. Can be user-userId, user-emailAddress, group-groupId, group-emailAddress, allUsers, or allAuthenticatedUsers.
   * @param object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectAccessControlsUpdate(bucket: string, entity: string, object: string, req: ObjectAccessControl, opts: ObjectAccessControlsUpdateOptions = {}): Promise<ObjectAccessControl> {
    req = serializeObjectAccessControl(req);
    opts = serializeObjectAccessControlsUpdateOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/${ object }/acl/${ entity }`);
    if (opts.generation !== undefined) {
      url.searchParams.append("generation", String(opts.generation));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeObjectAccessControl(data);
  }

  /**
   * Concatenates a list of existing objects into a new object in the same
   * bucket.
   *
   * @param destinationBucket Name of the bucket containing the source objects. The destination object is stored in this bucket.
   * @param destinationObject Name of the new object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectsCompose(destinationBucket: string, destinationObject: string, req: ComposeRequest, opts: ObjectsComposeOptions = {}): Promise<Object> {
    req = serializeComposeRequest(req);
    opts = serializeObjectsComposeOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ destinationBucket }/o/${ destinationObject }/compose`);
    if (opts.destinationPredefinedAcl !== undefined) {
      url.searchParams.append("destinationPredefinedAcl", String(opts.destinationPredefinedAcl));
    }
    if (opts.ifGenerationMatch !== undefined) {
      url.searchParams.append("ifGenerationMatch", String(opts.ifGenerationMatch));
    }
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.kmsKeyName !== undefined) {
      url.searchParams.append("kmsKeyName", String(opts.kmsKeyName));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeObject(data);
  }

  /**
   * Copies a source object to a destination object. Optionally overrides
   * metadata.
   *
   * @param destinationBucket Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   * @param destinationObject Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any.
   * @param sourceBucket Name of the bucket in which to find the source object.
   * @param sourceObject Name of the source object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectsCopy(destinationBucket: string, destinationObject: string, sourceBucket: string, sourceObject: string, req: Object, opts: ObjectsCopyOptions = {}): Promise<Object> {
    req = serializeObject(req);
    opts = serializeObjectsCopyOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ sourceBucket }/o/${ sourceObject }/copyTo/b/${ destinationBucket }/o/${ destinationObject }`);
    if (opts.destinationKmsKeyName !== undefined) {
      url.searchParams.append("destinationKmsKeyName", String(opts.destinationKmsKeyName));
    }
    if (opts.destinationPredefinedAcl !== undefined) {
      url.searchParams.append("destinationPredefinedAcl", String(opts.destinationPredefinedAcl));
    }
    if (opts.ifGenerationMatch !== undefined) {
      url.searchParams.append("ifGenerationMatch", String(opts.ifGenerationMatch));
    }
    if (opts.ifGenerationNotMatch !== undefined) {
      url.searchParams.append("ifGenerationNotMatch", String(opts.ifGenerationNotMatch));
    }
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.ifMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifMetagenerationNotMatch", String(opts.ifMetagenerationNotMatch));
    }
    if (opts.ifSourceGenerationMatch !== undefined) {
      url.searchParams.append("ifSourceGenerationMatch", String(opts.ifSourceGenerationMatch));
    }
    if (opts.ifSourceGenerationNotMatch !== undefined) {
      url.searchParams.append("ifSourceGenerationNotMatch", String(opts.ifSourceGenerationNotMatch));
    }
    if (opts.ifSourceMetagenerationMatch !== undefined) {
      url.searchParams.append("ifSourceMetagenerationMatch", String(opts.ifSourceMetagenerationMatch));
    }
    if (opts.ifSourceMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifSourceMetagenerationNotMatch", String(opts.ifSourceMetagenerationNotMatch));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.sourceGeneration !== undefined) {
      url.searchParams.append("sourceGeneration", String(opts.sourceGeneration));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeObject(data);
  }

  /**
   * Deletes an object and its metadata. Deletions are permanent if versioning
   * is not enabled for the bucket, or if the generation parameter is used.
   *
   * @param bucket Name of the bucket in which the object resides.
   * @param object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectsDelete(bucket: string, object: string, opts: ObjectsDeleteOptions = {}): Promise<void> {
    opts = serializeObjectsDeleteOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/${ object }`);
    if (opts.generation !== undefined) {
      url.searchParams.append("generation", String(opts.generation));
    }
    if (opts.ifGenerationMatch !== undefined) {
      url.searchParams.append("ifGenerationMatch", String(opts.ifGenerationMatch));
    }
    if (opts.ifGenerationNotMatch !== undefined) {
      url.searchParams.append("ifGenerationNotMatch", String(opts.ifGenerationNotMatch));
    }
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.ifMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifMetagenerationNotMatch", String(opts.ifMetagenerationNotMatch));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves an object or its metadata.
   *
   * @param bucket Name of the bucket in which the object resides.
   * @param object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectsGet(bucket: string, object: string, opts: ObjectsGetOptions = {}): Promise<Object> {
    opts = serializeObjectsGetOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/${ object }`);
    if (opts.generation !== undefined) {
      url.searchParams.append("generation", String(opts.generation));
    }
    if (opts.ifGenerationMatch !== undefined) {
      url.searchParams.append("ifGenerationMatch", String(opts.ifGenerationMatch));
    }
    if (opts.ifGenerationNotMatch !== undefined) {
      url.searchParams.append("ifGenerationNotMatch", String(opts.ifGenerationNotMatch));
    }
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.ifMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifMetagenerationNotMatch", String(opts.ifMetagenerationNotMatch));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeObject(data);
  }

  /**
   * Returns an IAM policy for the specified object.
   *
   * @param bucket Name of the bucket in which the object resides.
   * @param object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectsGetIamPolicy(bucket: string, object: string, opts: ObjectsGetIamPolicyOptions = {}): Promise<Policy> {
    opts = serializeObjectsGetIamPolicyOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/${ object }/iam`);
    if (opts.generation !== undefined) {
      url.searchParams.append("generation", String(opts.generation));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Stores a new object and metadata.
   *
   * @param bucket Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.
   */
  async objectsInsert(bucket: string, req: Object, opts: ObjectsInsertOptions = {}): Promise<Object> {
    req = serializeObject(req);
    opts = serializeObjectsInsertOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o`);
    if (opts.contentEncoding !== undefined) {
      url.searchParams.append("contentEncoding", String(opts.contentEncoding));
    }
    if (opts.ifGenerationMatch !== undefined) {
      url.searchParams.append("ifGenerationMatch", String(opts.ifGenerationMatch));
    }
    if (opts.ifGenerationNotMatch !== undefined) {
      url.searchParams.append("ifGenerationNotMatch", String(opts.ifGenerationNotMatch));
    }
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.ifMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifMetagenerationNotMatch", String(opts.ifMetagenerationNotMatch));
    }
    if (opts.kmsKeyName !== undefined) {
      url.searchParams.append("kmsKeyName", String(opts.kmsKeyName));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    if (opts.predefinedAcl !== undefined) {
      url.searchParams.append("predefinedAcl", String(opts.predefinedAcl));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeObject(data);
  }

  /**
   * Retrieves a list of objects matching the criteria.
   *
   * @param bucket Name of the bucket in which to look for objects.
   */
  async objectsList(bucket: string, opts: ObjectsListOptions = {}): Promise<Objects> {
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o`);
    if (opts.delimiter !== undefined) {
      url.searchParams.append("delimiter", String(opts.delimiter));
    }
    if (opts.endOffset !== undefined) {
      url.searchParams.append("endOffset", String(opts.endOffset));
    }
    if (opts.includeTrailingDelimiter !== undefined) {
      url.searchParams.append("includeTrailingDelimiter", String(opts.includeTrailingDelimiter));
    }
    if (opts.matchGlob !== undefined) {
      url.searchParams.append("matchGlob", String(opts.matchGlob));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.prefix !== undefined) {
      url.searchParams.append("prefix", String(opts.prefix));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.startOffset !== undefined) {
      url.searchParams.append("startOffset", String(opts.startOffset));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    if (opts.versions !== undefined) {
      url.searchParams.append("versions", String(opts.versions));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeObjects(data);
  }

  /**
   * Patches an object's metadata.
   *
   * @param bucket Name of the bucket in which the object resides.
   * @param object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectsPatch(bucket: string, object: string, req: Object, opts: ObjectsPatchOptions = {}): Promise<Object> {
    req = serializeObject(req);
    opts = serializeObjectsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/${ object }`);
    if (opts.generation !== undefined) {
      url.searchParams.append("generation", String(opts.generation));
    }
    if (opts.ifGenerationMatch !== undefined) {
      url.searchParams.append("ifGenerationMatch", String(opts.ifGenerationMatch));
    }
    if (opts.ifGenerationNotMatch !== undefined) {
      url.searchParams.append("ifGenerationNotMatch", String(opts.ifGenerationNotMatch));
    }
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.ifMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifMetagenerationNotMatch", String(opts.ifMetagenerationNotMatch));
    }
    if (opts.predefinedAcl !== undefined) {
      url.searchParams.append("predefinedAcl", String(opts.predefinedAcl));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeObject(data);
  }

  /**
   * Rewrites a source object to a destination object. Optionally overrides
   * metadata.
   *
   * @param destinationBucket Name of the bucket in which to store the new object. Overrides the provided object metadata's bucket value, if any.
   * @param destinationObject Name of the new object. Required when the object metadata is not otherwise provided. Overrides the object metadata's name value, if any. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   * @param sourceBucket Name of the bucket in which to find the source object.
   * @param sourceObject Name of the source object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectsRewrite(destinationBucket: string, destinationObject: string, sourceBucket: string, sourceObject: string, req: Object, opts: ObjectsRewriteOptions = {}): Promise<RewriteResponse> {
    req = serializeObject(req);
    opts = serializeObjectsRewriteOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ sourceBucket }/o/${ sourceObject }/rewriteTo/b/${ destinationBucket }/o/${ destinationObject }`);
    if (opts.destinationKmsKeyName !== undefined) {
      url.searchParams.append("destinationKmsKeyName", String(opts.destinationKmsKeyName));
    }
    if (opts.destinationPredefinedAcl !== undefined) {
      url.searchParams.append("destinationPredefinedAcl", String(opts.destinationPredefinedAcl));
    }
    if (opts.ifGenerationMatch !== undefined) {
      url.searchParams.append("ifGenerationMatch", String(opts.ifGenerationMatch));
    }
    if (opts.ifGenerationNotMatch !== undefined) {
      url.searchParams.append("ifGenerationNotMatch", String(opts.ifGenerationNotMatch));
    }
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.ifMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifMetagenerationNotMatch", String(opts.ifMetagenerationNotMatch));
    }
    if (opts.ifSourceGenerationMatch !== undefined) {
      url.searchParams.append("ifSourceGenerationMatch", String(opts.ifSourceGenerationMatch));
    }
    if (opts.ifSourceGenerationNotMatch !== undefined) {
      url.searchParams.append("ifSourceGenerationNotMatch", String(opts.ifSourceGenerationNotMatch));
    }
    if (opts.ifSourceMetagenerationMatch !== undefined) {
      url.searchParams.append("ifSourceMetagenerationMatch", String(opts.ifSourceMetagenerationMatch));
    }
    if (opts.ifSourceMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifSourceMetagenerationNotMatch", String(opts.ifSourceMetagenerationNotMatch));
    }
    if (opts.maxBytesRewrittenPerCall !== undefined) {
      url.searchParams.append("maxBytesRewrittenPerCall", String(opts.maxBytesRewrittenPerCall));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.rewriteToken !== undefined) {
      url.searchParams.append("rewriteToken", String(opts.rewriteToken));
    }
    if (opts.sourceGeneration !== undefined) {
      url.searchParams.append("sourceGeneration", String(opts.sourceGeneration));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRewriteResponse(data);
  }

  /**
   * Updates an IAM policy for the specified object.
   *
   * @param bucket Name of the bucket in which the object resides.
   * @param object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectsSetIamPolicy(bucket: string, object: string, req: Policy, opts: ObjectsSetIamPolicyOptions = {}): Promise<Policy> {
    req = serializePolicy(req);
    opts = serializeObjectsSetIamPolicyOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/${ object }/iam`);
    if (opts.generation !== undefined) {
      url.searchParams.append("generation", String(opts.generation));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Tests a set of permissions on the given object to see which, if any, are
   * held by the caller.
   *
   * @param bucket Name of the bucket in which the object resides.
   * @param object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectsTestIamPermissions(bucket: string, object: string, opts: ObjectsTestIamPermissionsOptions = {}): Promise<TestIamPermissionsResponse> {
    opts = serializeObjectsTestIamPermissionsOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/${ object }/iam/testPermissions`);
    if (opts.generation !== undefined) {
      url.searchParams.append("generation", String(opts.generation));
    }
    if (opts.permissions !== undefined) {
      url.searchParams.append("permissions", String(opts.permissions));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Updates an object's metadata.
   *
   * @param bucket Name of the bucket in which the object resides.
   * @param object Name of the object. For information about how to URL encode object names to be path safe, see Encoding URI Path Parts.
   */
  async objectsUpdate(bucket: string, object: string, req: Object, opts: ObjectsUpdateOptions = {}): Promise<Object> {
    req = serializeObject(req);
    opts = serializeObjectsUpdateOptions(opts);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/${ object }`);
    if (opts.generation !== undefined) {
      url.searchParams.append("generation", String(opts.generation));
    }
    if (opts.ifGenerationMatch !== undefined) {
      url.searchParams.append("ifGenerationMatch", String(opts.ifGenerationMatch));
    }
    if (opts.ifGenerationNotMatch !== undefined) {
      url.searchParams.append("ifGenerationNotMatch", String(opts.ifGenerationNotMatch));
    }
    if (opts.ifMetagenerationMatch !== undefined) {
      url.searchParams.append("ifMetagenerationMatch", String(opts.ifMetagenerationMatch));
    }
    if (opts.ifMetagenerationNotMatch !== undefined) {
      url.searchParams.append("ifMetagenerationNotMatch", String(opts.ifMetagenerationNotMatch));
    }
    if (opts.predefinedAcl !== undefined) {
      url.searchParams.append("predefinedAcl", String(opts.predefinedAcl));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeObject(data);
  }

  /**
   * Watch for changes on all objects in a bucket.
   *
   * @param bucket Name of the bucket in which to look for objects.
   */
  async objectsWatchAll(bucket: string, req: Channel, opts: ObjectsWatchAllOptions = {}): Promise<Channel> {
    req = serializeChannel(req);
    const url = new URL(`${this.#baseUrl}b/${ bucket }/o/watch`);
    if (opts.delimiter !== undefined) {
      url.searchParams.append("delimiter", String(opts.delimiter));
    }
    if (opts.endOffset !== undefined) {
      url.searchParams.append("endOffset", String(opts.endOffset));
    }
    if (opts.includeTrailingDelimiter !== undefined) {
      url.searchParams.append("includeTrailingDelimiter", String(opts.includeTrailingDelimiter));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.prefix !== undefined) {
      url.searchParams.append("prefix", String(opts.prefix));
    }
    if (opts.projection !== undefined) {
      url.searchParams.append("projection", String(opts.projection));
    }
    if (opts.startOffset !== undefined) {
      url.searchParams.append("startOffset", String(opts.startOffset));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    if (opts.versions !== undefined) {
      url.searchParams.append("versions", String(opts.versions));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeChannel(data);
  }

  /**
   * Creates a new HMAC key for the specified service account.
   *
   * @param projectId Project ID owning the service account.
   */
  async projectsHmacKeysCreate(projectId: string, opts: ProjectsHmacKeysCreateOptions = {}): Promise<HmacKey> {
    const url = new URL(`${this.#baseUrl}projects/${ projectId }/hmacKeys`);
    if (opts.serviceAccountEmail !== undefined) {
      url.searchParams.append("serviceAccountEmail", String(opts.serviceAccountEmail));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeHmacKey(data);
  }

  /**
   * Deletes an HMAC key.
   *
   * @param accessId Name of the HMAC key to be deleted.
   * @param projectId Project ID owning the requested key
   */
  async projectsHmacKeysDelete(accessId: string, projectId: string, opts: ProjectsHmacKeysDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}projects/${ projectId }/hmacKeys/${ accessId }`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Retrieves an HMAC key's metadata
   *
   * @param accessId Name of the HMAC key.
   * @param projectId Project ID owning the service account of the requested key.
   */
  async projectsHmacKeysGet(accessId: string, projectId: string, opts: ProjectsHmacKeysGetOptions = {}): Promise<HmacKeyMetadata> {
    const url = new URL(`${this.#baseUrl}projects/${ projectId }/hmacKeys/${ accessId }`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHmacKeyMetadata(data);
  }

  /**
   * Retrieves a list of HMAC keys matching the criteria.
   *
   * @param projectId Name of the project in which to look for HMAC keys.
   */
  async projectsHmacKeysList(projectId: string, opts: ProjectsHmacKeysListOptions = {}): Promise<HmacKeysMetadata> {
    const url = new URL(`${this.#baseUrl}projects/${ projectId }/hmacKeys`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.serviceAccountEmail !== undefined) {
      url.searchParams.append("serviceAccountEmail", String(opts.serviceAccountEmail));
    }
    if (opts.showDeletedKeys !== undefined) {
      url.searchParams.append("showDeletedKeys", String(opts.showDeletedKeys));
    }
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHmacKeysMetadata(data);
  }

  /**
   * Updates the state of an HMAC key. See the HMAC Key resource descriptor for
   * valid states.
   *
   * @param accessId Name of the HMAC key being updated.
   * @param projectId Project ID owning the service account of the updated key.
   */
  async projectsHmacKeysUpdate(accessId: string, projectId: string, req: HmacKeyMetadata, opts: ProjectsHmacKeysUpdateOptions = {}): Promise<HmacKeyMetadata> {
    req = serializeHmacKeyMetadata(req);
    const url = new URL(`${this.#baseUrl}projects/${ projectId }/hmacKeys/${ accessId }`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeHmacKeyMetadata(data);
  }

  /**
   * Get the email address of this project's Google Cloud Storage service
   * account.
   *
   * @param projectId Project ID
   */
  async projectsServiceAccountGet(projectId: string, opts: ProjectsServiceAccountGetOptions = {}): Promise<ServiceAccount> {
    const url = new URL(`${this.#baseUrl}projects/${ projectId }/serviceAccount`);
    if (opts.userProject !== undefined) {
      url.searchParams.append("userProject", String(opts.userProject));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ServiceAccount;
  }
}

/**
 * A bucket.
 */
export interface Bucket {
  /**
   * Access controls on the bucket.
   */
  acl?: BucketAccessControl[];
  /**
   * The bucket's Autoclass configuration.
   */
  autoclass?: {
    enabled?: boolean;
    toggleTime?: Date;
  };
  /**
   * The bucket's billing configuration.
   */
  billing?: {
    requesterPays?: boolean;
  };
  /**
   * The bucket's Cross-Origin Resource Sharing (CORS) configuration.
   */
  cors?: {
    maxAgeSeconds?: number;
    method?: string[];
    origin?: string[];
    responseHeader?: string[];
  }[];
  /**
   * The bucket's custom placement configuration for Custom Dual Regions.
   */
  customPlacementConfig?: {
    dataLocations?: string[];
  };
  /**
   * The default value for event-based hold on newly created objects in this
   * bucket. Event-based hold is a way to retain objects indefinitely until an
   * event occurs, signified by the hold's release. After being released, such
   * objects will be subject to bucket-level retention (if any). One sample use
   * case of this flag is for banks to hold loan documents for at least 3 years
   * after loan is paid in full. Here, bucket-level retention is 3 years and the
   * event is loan being paid in full. In this example, these objects will be
   * held intact for any number of years until the event has occurred
   * (event-based hold on the object is released) and then 3 more years after
   * that. That means retention duration of the objects begins from the moment
   * event-based hold transitioned from true to false. Objects under event-based
   * hold cannot be deleted, overwritten or archived until the hold is removed.
   */
  defaultEventBasedHold?: boolean;
  /**
   * Default access controls to apply to new objects when no ACL is provided.
   */
  defaultObjectAcl?: ObjectAccessControl[];
  /**
   * Encryption configuration for a bucket.
   */
  encryption?: {
    defaultKmsKeyName?: string;
  };
  /**
   * HTTP 1.1 Entity tag for the bucket.
   */
  etag?: string;
  /**
   * The bucket's IAM configuration.
   */
  iamConfiguration?: {
    bucketPolicyOnly?: {
      enabled?: boolean;
      lockedTime?: Date;
    };
    publicAccessPrevention?: string;
    uniformBucketLevelAccess?: {
      enabled?: boolean;
      lockedTime?: Date;
    };
  };
  /**
   * The ID of the bucket. For buckets, the id and name properties are the
   * same.
   */
  id?: string;
  /**
   * The kind of item this is. For buckets, this is always storage#bucket.
   */
  kind?: string;
  /**
   * User-provided labels, in key/value pairs.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The bucket's lifecycle configuration. See lifecycle management for more
   * information.
   */
  lifecycle?: {
    rule?: {
      action?: {
        storageClass?: string;
        type?: string;
      };
      condition?: {
        age?: number;
        createdBefore?: Date;
        customTimeBefore?: Date;
        daysSinceCustomTime?: number;
        daysSinceNoncurrentTime?: number;
        isLive?: boolean;
        matchesPattern?: string;
        matchesPrefix?: string[];
        matchesStorageClass?: string[];
        matchesSuffix?: string[];
        noncurrentTimeBefore?: Date;
        numNewerVersions?: number;
      };
    }[];
  };
  /**
   * The location of the bucket. Object data for objects in the bucket resides
   * in physical storage within this region. Defaults to US. See the developer's
   * guide for the authoritative list.
   */
  location?: string;
  /**
   * The type of the bucket location.
   */
  locationType?: string;
  /**
   * The bucket's logging configuration, which defines the destination bucket
   * and optional name prefix for the current bucket's logs.
   */
  logging?: {
    logBucket?: string;
    logObjectPrefix?: string;
  };
  /**
   * The metadata generation of this bucket.
   */
  metageneration?: bigint;
  /**
   * The name of the bucket.
   */
  name?: string;
  /**
   * The owner of the bucket. This is always the project team's owner group.
   */
  owner?: {
    entity?: string;
    entityId?: string;
  };
  /**
   * The project number of the project the bucket belongs to.
   */
  projectNumber?: bigint;
  /**
   * The bucket's retention policy. The retention policy enforces a minimum
   * retention time for all objects contained in the bucket, based on their
   * creation time. Any attempt to overwrite or delete objects younger than the
   * retention period will result in a PERMISSION_DENIED error. An unlocked
   * retention policy can be modified or removed from the bucket via a
   * storage.buckets.update operation. A locked retention policy cannot be
   * removed or shortened in duration for the lifetime of the bucket. Attempting
   * to remove or decrease period of a locked retention policy will result in a
   * PERMISSION_DENIED error.
   */
  retentionPolicy?: {
    effectiveTime?: Date;
    isLocked?: boolean;
    retentionPeriod?: bigint;
  };
  /**
   * The Recovery Point Objective (RPO) of this bucket. Set to ASYNC_TURBO to
   * turn on Turbo Replication on a bucket.
   */
  rpo?: string;
  /**
   * Reserved for future use.
   */
  satisfiesPZS?: boolean;
  /**
   * The URI of this bucket.
   */
  selfLink?: string;
  /**
   * The bucket's default storage class, used whenever no storageClass is
   * specified for a newly-created object. This defines how objects in the
   * bucket are stored and determines the SLA and the cost of storage. Values
   * include MULTI_REGIONAL, REGIONAL, STANDARD, NEARLINE, COLDLINE, ARCHIVE,
   * and DURABLE_REDUCED_AVAILABILITY. If this value is not specified when the
   * bucket is created, it will default to STANDARD. For more information, see
   * storage classes.
   */
  storageClass?: string;
  /**
   * The creation time of the bucket in RFC 3339 format.
   */
  timeCreated?: Date;
  /**
   * The modification time of the bucket in RFC 3339 format.
   */
  updated?: Date;
  /**
   * The bucket's versioning configuration.
   */
  versioning?: {
    enabled?: boolean;
  };
  /**
   * The bucket's website configuration, controlling how the service behaves
   * when accessing bucket contents as a web site. See the Static Website
   * Examples for more information.
   */
  website?: {
    mainPageSuffix?: string;
    notFoundPage?: string;
  };
}

function serializeBucket(data: any): Bucket {
  return {
    ...data,
    autoclass: data["autoclass"] !== undefined ? {
      ...data["autoclass"],
      toggleTime: data["autoclass"]["toggleTime"] !== undefined ? data["autoclass"]["toggleTime"].toISOString() : undefined,
    } : undefined,
    defaultObjectAcl: data["defaultObjectAcl"] !== undefined ? data["defaultObjectAcl"].map((item: any) => (serializeObjectAccessControl(item))) : undefined,
    iamConfiguration: data["iamConfiguration"] !== undefined ? {
      ...data["iamConfiguration"],
      bucketPolicyOnly: data["iamConfiguration"]["bucketPolicyOnly"] !== undefined ? {
        ...data["iamConfiguration"]["bucketPolicyOnly"],
        lockedTime: data["iamConfiguration"]["bucketPolicyOnly"]["lockedTime"] !== undefined ? data["iamConfiguration"]["bucketPolicyOnly"]["lockedTime"].toISOString() : undefined,
      } : undefined,
      uniformBucketLevelAccess: data["iamConfiguration"]["uniformBucketLevelAccess"] !== undefined ? {
        ...data["iamConfiguration"]["uniformBucketLevelAccess"],
        lockedTime: data["iamConfiguration"]["uniformBucketLevelAccess"]["lockedTime"] !== undefined ? data["iamConfiguration"]["uniformBucketLevelAccess"]["lockedTime"].toISOString() : undefined,
      } : undefined,
    } : undefined,
    lifecycle: data["lifecycle"] !== undefined ? {
      ...data["lifecycle"],
      rule: data["lifecycle"]["rule"] !== undefined ? data["lifecycle"]["rule"].map((item: any) => ({
        ...item,
        condition: item["condition"] !== undefined ? {
          ...item["condition"],
          createdBefore: item["condition"]["createdBefore"] !== undefined ? item["condition"]["createdBefore"].toISOString() : undefined,
          customTimeBefore: item["condition"]["customTimeBefore"] !== undefined ? item["condition"]["customTimeBefore"].toISOString() : undefined,
          noncurrentTimeBefore: item["condition"]["noncurrentTimeBefore"] !== undefined ? item["condition"]["noncurrentTimeBefore"].toISOString() : undefined,
        } : undefined,
      })) : undefined,
    } : undefined,
    metageneration: data["metageneration"] !== undefined ? String(data["metageneration"]) : undefined,
    projectNumber: data["projectNumber"] !== undefined ? String(data["projectNumber"]) : undefined,
    retentionPolicy: data["retentionPolicy"] !== undefined ? {
      ...data["retentionPolicy"],
      effectiveTime: data["retentionPolicy"]["effectiveTime"] !== undefined ? data["retentionPolicy"]["effectiveTime"].toISOString() : undefined,
      retentionPeriod: data["retentionPolicy"]["retentionPeriod"] !== undefined ? String(data["retentionPolicy"]["retentionPeriod"]) : undefined,
    } : undefined,
    timeCreated: data["timeCreated"] !== undefined ? data["timeCreated"].toISOString() : undefined,
    updated: data["updated"] !== undefined ? data["updated"].toISOString() : undefined,
  };
}

function deserializeBucket(data: any): Bucket {
  return {
    ...data,
    autoclass: data["autoclass"] !== undefined ? {
      ...data["autoclass"],
      toggleTime: data["autoclass"]["toggleTime"] !== undefined ? new Date(data["autoclass"]["toggleTime"]) : undefined,
    } : undefined,
    defaultObjectAcl: data["defaultObjectAcl"] !== undefined ? data["defaultObjectAcl"].map((item: any) => (deserializeObjectAccessControl(item))) : undefined,
    iamConfiguration: data["iamConfiguration"] !== undefined ? {
      ...data["iamConfiguration"],
      bucketPolicyOnly: data["iamConfiguration"]["bucketPolicyOnly"] !== undefined ? {
        ...data["iamConfiguration"]["bucketPolicyOnly"],
        lockedTime: data["iamConfiguration"]["bucketPolicyOnly"]["lockedTime"] !== undefined ? new Date(data["iamConfiguration"]["bucketPolicyOnly"]["lockedTime"]) : undefined,
      } : undefined,
      uniformBucketLevelAccess: data["iamConfiguration"]["uniformBucketLevelAccess"] !== undefined ? {
        ...data["iamConfiguration"]["uniformBucketLevelAccess"],
        lockedTime: data["iamConfiguration"]["uniformBucketLevelAccess"]["lockedTime"] !== undefined ? new Date(data["iamConfiguration"]["uniformBucketLevelAccess"]["lockedTime"]) : undefined,
      } : undefined,
    } : undefined,
    lifecycle: data["lifecycle"] !== undefined ? {
      ...data["lifecycle"],
      rule: data["lifecycle"]["rule"] !== undefined ? data["lifecycle"]["rule"].map((item: any) => ({
        ...item,
        condition: item["condition"] !== undefined ? {
          ...item["condition"],
          createdBefore: item["condition"]["createdBefore"] !== undefined ? new Date(item["condition"]["createdBefore"]) : undefined,
          customTimeBefore: item["condition"]["customTimeBefore"] !== undefined ? new Date(item["condition"]["customTimeBefore"]) : undefined,
          noncurrentTimeBefore: item["condition"]["noncurrentTimeBefore"] !== undefined ? new Date(item["condition"]["noncurrentTimeBefore"]) : undefined,
        } : undefined,
      })) : undefined,
    } : undefined,
    metageneration: data["metageneration"] !== undefined ? BigInt(data["metageneration"]) : undefined,
    projectNumber: data["projectNumber"] !== undefined ? BigInt(data["projectNumber"]) : undefined,
    retentionPolicy: data["retentionPolicy"] !== undefined ? {
      ...data["retentionPolicy"],
      effectiveTime: data["retentionPolicy"]["effectiveTime"] !== undefined ? new Date(data["retentionPolicy"]["effectiveTime"]) : undefined,
      retentionPeriod: data["retentionPolicy"]["retentionPeriod"] !== undefined ? BigInt(data["retentionPolicy"]["retentionPeriod"]) : undefined,
    } : undefined,
    timeCreated: data["timeCreated"] !== undefined ? new Date(data["timeCreated"]) : undefined,
    updated: data["updated"] !== undefined ? new Date(data["updated"]) : undefined,
  };
}

/**
 * An access-control entry.
 */
export interface BucketAccessControl {
  /**
   * The name of the bucket.
   */
  bucket?: string;
  /**
   * The domain associated with the entity, if any.
   */
  domain?: string;
  /**
   * The email address associated with the entity, if any.
   */
  email?: string;
  /**
   * The entity holding the permission, in one of the following forms: -
   * user-userId - user-email - group-groupId - group-email - domain-domain -
   * project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The
   * user liz@example.com would be user-liz@example.com. - The group
   * example@googlegroups.com would be group-example@googlegroups.com. - To
   * refer to all members of the Google Apps for Business domain example.com,
   * the entity would be domain-example.com.
   */
  entity?: string;
  /**
   * The ID for the entity, if any.
   */
  entityId?: string;
  /**
   * HTTP 1.1 Entity tag for the access-control entry.
   */
  etag?: string;
  /**
   * The ID of the access-control entry.
   */
  id?: string;
  /**
   * The kind of item this is. For bucket access control entries, this is
   * always storage#bucketAccessControl.
   */
  kind?: string;
  /**
   * The project team associated with the entity, if any.
   */
  projectTeam?: {
    projectNumber?: string;
    team?: string;
  };
  /**
   * The access permission for the entity.
   */
  role?: string;
  /**
   * The link to this access-control entry.
   */
  selfLink?: string;
}

/**
 * An access-control list.
 */
export interface BucketAccessControls {
  /**
   * The list of items.
   */
  items?: BucketAccessControl[];
  /**
   * The kind of item this is. For lists of bucket access control entries, this
   * is always storage#bucketAccessControls.
   */
  kind?: string;
}

/**
 * Additional options for Storage#bucketAccessControlsDelete.
 */
export interface BucketAccessControlsDeleteOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#bucketAccessControlsGet.
 */
export interface BucketAccessControlsGetOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#bucketAccessControlsInsert.
 */
export interface BucketAccessControlsInsertOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#bucketAccessControlsList.
 */
export interface BucketAccessControlsListOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#bucketAccessControlsPatch.
 */
export interface BucketAccessControlsPatchOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#bucketAccessControlsUpdate.
 */
export interface BucketAccessControlsUpdateOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * A list of buckets.
 */
export interface Buckets {
  /**
   * The list of items.
   */
  items?: Bucket[];
  /**
   * The kind of item this is. For lists of buckets, this is always
   * storage#buckets.
   */
  kind?: string;
  /**
   * The continuation token, used to page through large result sets. Provide
   * this value in a subsequent request to return the next page of results.
   */
  nextPageToken?: string;
}

function serializeBuckets(data: any): Buckets {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeBucket(item))) : undefined,
  };
}

function deserializeBuckets(data: any): Buckets {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeBucket(item))) : undefined,
  };
}

/**
 * Additional options for Storage#bucketsDelete.
 */
export interface BucketsDeleteOptions {
  /**
   * If set, only deletes the bucket if its metageneration matches this value.
   */
  ifMetagenerationMatch?: bigint;
  /**
   * If set, only deletes the bucket if its metageneration does not match this
   * value.
   */
  ifMetagenerationNotMatch?: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeBucketsDeleteOptions(data: any): BucketsDeleteOptions {
  return {
    ...data,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? String(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? String(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

function deserializeBucketsDeleteOptions(data: any): BucketsDeleteOptions {
  return {
    ...data,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? BigInt(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? BigInt(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

/**
 * Additional options for Storage#bucketsGetIamPolicy.
 */
export interface BucketsGetIamPolicyOptions {
  /**
   * The IAM policy format version to be returned. If the
   * optionsRequestedPolicyVersion is for an older version that doesn't support
   * part of the requested IAM policy, the request fails.
   */
  optionsRequestedPolicyVersion?: number;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#bucketsGet.
 */
export interface BucketsGetOptions {
  /**
   * Makes the return of the bucket metadata conditional on whether the
   * bucket's current metageneration matches the given value.
   */
  ifMetagenerationMatch?: bigint;
  /**
   * Makes the return of the bucket metadata conditional on whether the
   * bucket's current metageneration does not match the given value.
   */
  ifMetagenerationNotMatch?: bigint;
  /**
   * Set of properties to return. Defaults to noAcl.
   */
  projection?:  | "full" | "noAcl";
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeBucketsGetOptions(data: any): BucketsGetOptions {
  return {
    ...data,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? String(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? String(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

function deserializeBucketsGetOptions(data: any): BucketsGetOptions {
  return {
    ...data,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? BigInt(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? BigInt(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

/**
 * Additional options for Storage#bucketsInsert.
 */
export interface BucketsInsertOptions {
  /**
   * Apply a predefined set of access controls to this bucket.
   */
  predefinedAcl?:  | "authenticatedRead" | "private" | "projectPrivate" | "publicRead" | "publicReadWrite";
  /**
   * Apply a predefined set of default object access controls to this bucket.
   */
  predefinedDefaultObjectAcl?:  | "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead";
  /**
   * A valid API project identifier.
   */
  project: string;
  /**
   * Set of properties to return. Defaults to noAcl, unless the bucket resource
   * specifies acl or defaultObjectAcl properties, when it defaults to full.
   */
  projection?:  | "full" | "noAcl";
  /**
   * The project to be billed for this request.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#bucketsList.
 */
export interface BucketsListOptions {
  /**
   * Maximum number of buckets to return in a single response. The service will
   * use this parameter or 1,000 items, whichever is smaller.
   */
  maxResults?: number;
  /**
   * A previously-returned page token representing part of the larger set of
   * results to view.
   */
  pageToken?: string;
  /**
   * Filter results to buckets whose names begin with this prefix.
   */
  prefix?: string;
  /**
   * A valid API project identifier.
   */
  project: string;
  /**
   * Set of properties to return. Defaults to noAcl.
   */
  projection?:  | "full" | "noAcl";
  /**
   * The project to be billed for this request.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#bucketsLockRetentionPolicy.
 */
export interface BucketsLockRetentionPolicyOptions {
  /**
   * Makes the operation conditional on whether bucket's current metageneration
   * matches the given value.
   */
  ifMetagenerationMatch: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeBucketsLockRetentionPolicyOptions(data: any): BucketsLockRetentionPolicyOptions {
  return {
    ...data,
    ifMetagenerationMatch: String(data["ifMetagenerationMatch"]),
  };
}

function deserializeBucketsLockRetentionPolicyOptions(data: any): BucketsLockRetentionPolicyOptions {
  return {
    ...data,
    ifMetagenerationMatch: BigInt(data["ifMetagenerationMatch"]),
  };
}

/**
 * Additional options for Storage#bucketsPatch.
 */
export interface BucketsPatchOptions {
  /**
   * Makes the return of the bucket metadata conditional on whether the
   * bucket's current metageneration matches the given value.
   */
  ifMetagenerationMatch?: bigint;
  /**
   * Makes the return of the bucket metadata conditional on whether the
   * bucket's current metageneration does not match the given value.
   */
  ifMetagenerationNotMatch?: bigint;
  /**
   * Apply a predefined set of access controls to this bucket.
   */
  predefinedAcl?:  | "authenticatedRead" | "private" | "projectPrivate" | "publicRead" | "publicReadWrite";
  /**
   * Apply a predefined set of default object access controls to this bucket.
   */
  predefinedDefaultObjectAcl?:  | "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead";
  /**
   * Set of properties to return. Defaults to full.
   */
  projection?:  | "full" | "noAcl";
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeBucketsPatchOptions(data: any): BucketsPatchOptions {
  return {
    ...data,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? String(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? String(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

function deserializeBucketsPatchOptions(data: any): BucketsPatchOptions {
  return {
    ...data,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? BigInt(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? BigInt(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

/**
 * Additional options for Storage#bucketsSetIamPolicy.
 */
export interface BucketsSetIamPolicyOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#bucketsTestIamPermissions.
 */
export interface BucketsTestIamPermissionsOptions {
  /**
   * Permissions to test.
   */
  permissions: string;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#bucketsUpdate.
 */
export interface BucketsUpdateOptions {
  /**
   * Makes the return of the bucket metadata conditional on whether the
   * bucket's current metageneration matches the given value.
   */
  ifMetagenerationMatch?: bigint;
  /**
   * Makes the return of the bucket metadata conditional on whether the
   * bucket's current metageneration does not match the given value.
   */
  ifMetagenerationNotMatch?: bigint;
  /**
   * Apply a predefined set of access controls to this bucket.
   */
  predefinedAcl?:  | "authenticatedRead" | "private" | "projectPrivate" | "publicRead" | "publicReadWrite";
  /**
   * Apply a predefined set of default object access controls to this bucket.
   */
  predefinedDefaultObjectAcl?:  | "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead";
  /**
   * Set of properties to return. Defaults to full.
   */
  projection?:  | "full" | "noAcl";
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeBucketsUpdateOptions(data: any): BucketsUpdateOptions {
  return {
    ...data,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? String(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? String(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

function deserializeBucketsUpdateOptions(data: any): BucketsUpdateOptions {
  return {
    ...data,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? BigInt(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? BigInt(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

/**
 * An notification channel used to watch for resource changes.
 */
export interface Channel {
  /**
   * The address where notifications are delivered for this channel.
   */
  address?: string;
  /**
   * Date and time of notification channel expiration, expressed as a Unix
   * timestamp, in milliseconds. Optional.
   */
  expiration?: bigint;
  /**
   * A UUID or similar unique string that identifies this channel.
   */
  id?: string;
  /**
   * Identifies this as a notification channel used to watch for changes to a
   * resource, which is "api#channel".
   */
  kind?: string;
  /**
   * Additional parameters controlling delivery channel behavior. Optional.
   */
  params?: {
    [key: string]: string
  };
  /**
   * A Boolean value to indicate whether payload is wanted. Optional.
   */
  payload?: boolean;
  /**
   * An opaque ID that identifies the resource being watched on this channel.
   * Stable across different API versions.
   */
  resourceId?: string;
  /**
   * A version-specific identifier for the watched resource.
   */
  resourceUri?: string;
  /**
   * An arbitrary string delivered to the target address with each notification
   * delivered over this channel. Optional.
   */
  token?: string;
  /**
   * The type of delivery mechanism used for this channel.
   */
  type?: string;
}

function serializeChannel(data: any): Channel {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? String(data["expiration"]) : undefined,
  };
}

function deserializeChannel(data: any): Channel {
  return {
    ...data,
    expiration: data["expiration"] !== undefined ? BigInt(data["expiration"]) : undefined,
  };
}

/**
 * A Compose request.
 */
export interface ComposeRequest {
  /**
   * Properties of the resulting object.
   */
  destination?: Object;
  /**
   * The kind of item this is.
   */
  kind?: string;
  /**
   * The list of source objects that will be concatenated into a single object.
   */
  sourceObjects?: {
    generation?: bigint;
    name?: string;
    objectPreconditions?: {
      ifGenerationMatch?: bigint;
    };
  }[];
}

function serializeComposeRequest(data: any): ComposeRequest {
  return {
    ...data,
    destination: data["destination"] !== undefined ? serializeObject(data["destination"]) : undefined,
    sourceObjects: data["sourceObjects"] !== undefined ? data["sourceObjects"].map((item: any) => ({
      ...item,
      generation: item["generation"] !== undefined ? String(item["generation"]) : undefined,
      objectPreconditions: item["objectPreconditions"] !== undefined ? {
        ...item["objectPreconditions"],
        ifGenerationMatch: item["objectPreconditions"]["ifGenerationMatch"] !== undefined ? String(item["objectPreconditions"]["ifGenerationMatch"]) : undefined,
      } : undefined,
    })) : undefined,
  };
}

function deserializeComposeRequest(data: any): ComposeRequest {
  return {
    ...data,
    destination: data["destination"] !== undefined ? deserializeObject(data["destination"]) : undefined,
    sourceObjects: data["sourceObjects"] !== undefined ? data["sourceObjects"].map((item: any) => ({
      ...item,
      generation: item["generation"] !== undefined ? BigInt(item["generation"]) : undefined,
      objectPreconditions: item["objectPreconditions"] !== undefined ? {
        ...item["objectPreconditions"],
        ifGenerationMatch: item["objectPreconditions"]["ifGenerationMatch"] !== undefined ? BigInt(item["objectPreconditions"]["ifGenerationMatch"]) : undefined,
      } : undefined,
    })) : undefined,
  };
}

/**
 * Additional options for Storage#defaultObjectAccessControlsDelete.
 */
export interface DefaultObjectAccessControlsDeleteOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#defaultObjectAccessControlsGet.
 */
export interface DefaultObjectAccessControlsGetOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#defaultObjectAccessControlsInsert.
 */
export interface DefaultObjectAccessControlsInsertOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#defaultObjectAccessControlsList.
 */
export interface DefaultObjectAccessControlsListOptions {
  /**
   * If present, only return default ACL listing if the bucket's current
   * metageneration matches this value.
   */
  ifMetagenerationMatch?: bigint;
  /**
   * If present, only return default ACL listing if the bucket's current
   * metageneration does not match the given value.
   */
  ifMetagenerationNotMatch?: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeDefaultObjectAccessControlsListOptions(data: any): DefaultObjectAccessControlsListOptions {
  return {
    ...data,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? String(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? String(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

function deserializeDefaultObjectAccessControlsListOptions(data: any): DefaultObjectAccessControlsListOptions {
  return {
    ...data,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? BigInt(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? BigInt(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

/**
 * Additional options for Storage#defaultObjectAccessControlsPatch.
 */
export interface DefaultObjectAccessControlsPatchOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#defaultObjectAccessControlsUpdate.
 */
export interface DefaultObjectAccessControlsUpdateOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Represents an expression text. Example: title: "User account presence"
 * description: "Determines whether the request has a user account" expression:
 * "size(request.user) > 0"
 */
export interface Expr {
  /**
   * An optional description of the expression. This is a longer text which
   * describes the expression, e.g. when hovered over it in a UI.
   */
  description?: string;
  /**
   * Textual representation of an expression in Common Expression Language
   * syntax. The application context of the containing message determines which
   * well-known feature set of CEL is supported.
   */
  expression?: string;
  /**
   * An optional string indicating the location of the expression for error
   * reporting, e.g. a file name and a position in the file.
   */
  location?: string;
  /**
   * An optional title for the expression, i.e. a short string describing its
   * purpose. This can be used e.g. in UIs which allow to enter the expression.
   */
  title?: string;
}

/**
 * JSON template to produce a JSON-style HMAC Key resource for Create
 * responses.
 */
export interface HmacKey {
  /**
   * The kind of item this is. For HMAC keys, this is always storage#hmacKey.
   */
  kind?: string;
  /**
   * Key metadata.
   */
  metadata?: HmacKeyMetadata;
  /**
   * HMAC secret key material.
   */
  secret?: string;
}

function serializeHmacKey(data: any): HmacKey {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? serializeHmacKeyMetadata(data["metadata"]) : undefined,
  };
}

function deserializeHmacKey(data: any): HmacKey {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? deserializeHmacKeyMetadata(data["metadata"]) : undefined,
  };
}

/**
 * JSON template to produce a JSON-style HMAC Key metadata resource.
 */
export interface HmacKeyMetadata {
  /**
   * The ID of the HMAC Key.
   */
  accessId?: string;
  /**
   * HTTP 1.1 Entity tag for the HMAC key.
   */
  etag?: string;
  /**
   * The ID of the HMAC key, including the Project ID and the Access ID.
   */
  id?: string;
  /**
   * The kind of item this is. For HMAC Key metadata, this is always
   * storage#hmacKeyMetadata.
   */
  kind?: string;
  /**
   * Project ID owning the service account to which the key authenticates.
   */
  projectId?: string;
  /**
   * The link to this resource.
   */
  selfLink?: string;
  /**
   * The email address of the key's associated service account.
   */
  serviceAccountEmail?: string;
  /**
   * The state of the key. Can be one of ACTIVE, INACTIVE, or DELETED.
   */
  state?: string;
  /**
   * The creation time of the HMAC key in RFC 3339 format.
   */
  timeCreated?: Date;
  /**
   * The last modification time of the HMAC key metadata in RFC 3339 format.
   */
  updated?: Date;
}

function serializeHmacKeyMetadata(data: any): HmacKeyMetadata {
  return {
    ...data,
    timeCreated: data["timeCreated"] !== undefined ? data["timeCreated"].toISOString() : undefined,
    updated: data["updated"] !== undefined ? data["updated"].toISOString() : undefined,
  };
}

function deserializeHmacKeyMetadata(data: any): HmacKeyMetadata {
  return {
    ...data,
    timeCreated: data["timeCreated"] !== undefined ? new Date(data["timeCreated"]) : undefined,
    updated: data["updated"] !== undefined ? new Date(data["updated"]) : undefined,
  };
}

/**
 * A list of hmacKeys.
 */
export interface HmacKeysMetadata {
  /**
   * The list of items.
   */
  items?: HmacKeyMetadata[];
  /**
   * The kind of item this is. For lists of hmacKeys, this is always
   * storage#hmacKeysMetadata.
   */
  kind?: string;
  /**
   * The continuation token, used to page through large result sets. Provide
   * this value in a subsequent request to return the next page of results.
   */
  nextPageToken?: string;
}

function serializeHmacKeysMetadata(data: any): HmacKeysMetadata {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeHmacKeyMetadata(item))) : undefined,
  };
}

function deserializeHmacKeysMetadata(data: any): HmacKeysMetadata {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeHmacKeyMetadata(item))) : undefined,
  };
}

/**
 * A subscription to receive Google PubSub notifications.
 */
export interface Notification {
  /**
   * An optional list of additional attributes to attach to each Cloud PubSub
   * message published for this notification subscription.
   */
  custom_attributes?: {
    [key: string]: string
  };
  /**
   * HTTP 1.1 Entity tag for this subscription notification.
   */
  etag?: string;
  /**
   * If present, only send notifications about listed event types. If empty,
   * sent notifications for all event types.
   */
  event_types?: string[];
  /**
   * The ID of the notification.
   */
  id?: string;
  /**
   * The kind of item this is. For notifications, this is always
   * storage#notification.
   */
  kind?: string;
  /**
   * If present, only apply this notification configuration to object names
   * that begin with this prefix.
   */
  object_name_prefix?: string;
  /**
   * The desired content of the Payload.
   */
  payload_format?: string;
  /**
   * The canonical URL of this notification.
   */
  selfLink?: string;
  /**
   * The Cloud PubSub topic to which this subscription publishes. Formatted as:
   * '//pubsub.googleapis.com/projects/{project-identifier}/topics/{my-topic}'
   */
  topic?: string;
}

/**
 * A list of notification subscriptions.
 */
export interface Notifications {
  /**
   * The list of items.
   */
  items?: Notification[];
  /**
   * The kind of item this is. For lists of notifications, this is always
   * storage#notifications.
   */
  kind?: string;
}

/**
 * Additional options for Storage#notificationsDelete.
 */
export interface NotificationsDeleteOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#notificationsGet.
 */
export interface NotificationsGetOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#notificationsInsert.
 */
export interface NotificationsInsertOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#notificationsList.
 */
export interface NotificationsListOptions {
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

/**
 * An object.
 */
export interface Object {
  /**
   * Access controls on the object.
   */
  acl?: ObjectAccessControl[];
  /**
   * The name of the bucket containing this object.
   */
  bucket?: string;
  /**
   * Cache-Control directive for the object data. If omitted, and the object is
   * accessible to all anonymous users, the default will be public,
   * max-age=3600.
   */
  cacheControl?: string;
  /**
   * Number of underlying components that make up this object. Components are
   * accumulated by compose operations.
   */
  componentCount?: number;
  /**
   * Content-Disposition of the object data.
   */
  contentDisposition?: string;
  /**
   * Content-Encoding of the object data.
   */
  contentEncoding?: string;
  /**
   * Content-Language of the object data.
   */
  contentLanguage?: string;
  /**
   * Content-Type of the object data. If an object is stored without a
   * Content-Type, it is served as application/octet-stream.
   */
  contentType?: string;
  /**
   * CRC32c checksum, as described in RFC 4960, Appendix B; encoded using
   * base64 in big-endian byte order. For more information about using the
   * CRC32c checksum, see Hashes and ETags: Best Practices.
   */
  crc32c?: string;
  /**
   * Metadata of customer-supplied encryption key, if the object is encrypted
   * by such a key.
   */
  customerEncryption?: {
    encryptionAlgorithm?: string;
    keySha256?: string;
  };
  /**
   * A timestamp in RFC 3339 format specified by the user for an object.
   */
  customTime?: Date;
  /**
   * HTTP 1.1 Entity tag for the object.
   */
  etag?: string;
  /**
   * Whether an object is under event-based hold. Event-based hold is a way to
   * retain objects until an event occurs, which is signified by the hold's
   * release (i.e. this value is set to false). After being released (set to
   * false), such objects will be subject to bucket-level retention (if any).
   * One sample use case of this flag is for banks to hold loan documents for at
   * least 3 years after loan is paid in full. Here, bucket-level retention is 3
   * years and the event is the loan being paid in full. In this example, these
   * objects will be held intact for any number of years until the event has
   * occurred (event-based hold on the object is released) and then 3 more years
   * after that. That means retention duration of the objects begins from the
   * moment event-based hold transitioned from true to false.
   */
  eventBasedHold?: boolean;
  /**
   * The content generation of this object. Used for object versioning.
   */
  generation?: bigint;
  /**
   * The ID of the object, including the bucket name, object name, and
   * generation number.
   */
  id?: string;
  /**
   * The kind of item this is. For objects, this is always storage#object.
   */
  kind?: string;
  /**
   * Not currently supported. Specifying the parameter causes the request to
   * fail with status code 400 - Bad Request.
   */
  kmsKeyName?: string;
  /**
   * MD5 hash of the data; encoded using base64. For more information about
   * using the MD5 hash, see Hashes and ETags: Best Practices.
   */
  md5Hash?: string;
  /**
   * Media download link.
   */
  mediaLink?: string;
  /**
   * User-provided metadata, in key/value pairs.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * The version of the metadata for this object at this generation. Used for
   * preconditions and for detecting changes in metadata. A metageneration
   * number is only meaningful in the context of a particular generation of a
   * particular object.
   */
  metageneration?: bigint;
  /**
   * The name of the object. Required if not specified by URL parameter.
   */
  name?: string;
  /**
   * The owner of the object. This will always be the uploader of the object.
   */
  owner?: {
    entity?: string;
    entityId?: string;
  };
  /**
   * A server-determined value that specifies the earliest time that the
   * object's retention period expires. This value is in RFC 3339 format. Note
   * 1: This field is not provided for objects with an active event-based hold,
   * since retention expiration is unknown until the hold is removed. Note 2:
   * This value can be provided even when temporary hold is set (so that the
   * user can reason about policy without having to first unset the temporary
   * hold).
   */
  retentionExpirationTime?: Date;
  /**
   * The link to this object.
   */
  selfLink?: string;
  /**
   * Content-Length of the data in bytes.
   */
  size?: bigint;
  /**
   * Storage class of the object.
   */
  storageClass?: string;
  /**
   * Whether an object is under temporary hold. While this flag is set to true,
   * the object is protected against deletion and overwrites. A common use case
   * of this flag is regulatory investigations where objects need to be retained
   * while the investigation is ongoing. Note that unlike event-based hold,
   * temporary hold does not impact retention expiration time of an object.
   */
  temporaryHold?: boolean;
  /**
   * The creation time of the object in RFC 3339 format.
   */
  timeCreated?: Date;
  /**
   * The deletion time of the object in RFC 3339 format. Will be returned if
   * and only if this version of the object has been deleted.
   */
  timeDeleted?: Date;
  /**
   * The time at which the object's storage class was last changed. When the
   * object is initially created, it will be set to timeCreated.
   */
  timeStorageClassUpdated?: Date;
  /**
   * The modification time of the object metadata in RFC 3339 format. Set
   * initially to object creation time and then updated whenever any metadata of
   * the object changes. This includes changes made by a requester, such as
   * modifying custom metadata, as well as changes made by Cloud Storage on
   * behalf of a requester, such as changing the storage class based on an
   * Object Lifecycle Configuration.
   */
  updated?: Date;
}

function serializeObject(data: any): Object {
  return {
    ...data,
    acl: data["acl"] !== undefined ? data["acl"].map((item: any) => (serializeObjectAccessControl(item))) : undefined,
    customTime: data["customTime"] !== undefined ? data["customTime"].toISOString() : undefined,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
    metageneration: data["metageneration"] !== undefined ? String(data["metageneration"]) : undefined,
    retentionExpirationTime: data["retentionExpirationTime"] !== undefined ? data["retentionExpirationTime"].toISOString() : undefined,
    size: data["size"] !== undefined ? String(data["size"]) : undefined,
    timeCreated: data["timeCreated"] !== undefined ? data["timeCreated"].toISOString() : undefined,
    timeDeleted: data["timeDeleted"] !== undefined ? data["timeDeleted"].toISOString() : undefined,
    timeStorageClassUpdated: data["timeStorageClassUpdated"] !== undefined ? data["timeStorageClassUpdated"].toISOString() : undefined,
    updated: data["updated"] !== undefined ? data["updated"].toISOString() : undefined,
  };
}

function deserializeObject(data: any): Object {
  return {
    ...data,
    acl: data["acl"] !== undefined ? data["acl"].map((item: any) => (deserializeObjectAccessControl(item))) : undefined,
    customTime: data["customTime"] !== undefined ? new Date(data["customTime"]) : undefined,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
    metageneration: data["metageneration"] !== undefined ? BigInt(data["metageneration"]) : undefined,
    retentionExpirationTime: data["retentionExpirationTime"] !== undefined ? new Date(data["retentionExpirationTime"]) : undefined,
    size: data["size"] !== undefined ? BigInt(data["size"]) : undefined,
    timeCreated: data["timeCreated"] !== undefined ? new Date(data["timeCreated"]) : undefined,
    timeDeleted: data["timeDeleted"] !== undefined ? new Date(data["timeDeleted"]) : undefined,
    timeStorageClassUpdated: data["timeStorageClassUpdated"] !== undefined ? new Date(data["timeStorageClassUpdated"]) : undefined,
    updated: data["updated"] !== undefined ? new Date(data["updated"]) : undefined,
  };
}

/**
 * An access-control entry.
 */
export interface ObjectAccessControl {
  /**
   * The name of the bucket.
   */
  bucket?: string;
  /**
   * The domain associated with the entity, if any.
   */
  domain?: string;
  /**
   * The email address associated with the entity, if any.
   */
  email?: string;
  /**
   * The entity holding the permission, in one of the following forms: -
   * user-userId - user-email - group-groupId - group-email - domain-domain -
   * project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The
   * user liz@example.com would be user-liz@example.com. - The group
   * example@googlegroups.com would be group-example@googlegroups.com. - To
   * refer to all members of the Google Apps for Business domain example.com,
   * the entity would be domain-example.com.
   */
  entity?: string;
  /**
   * The ID for the entity, if any.
   */
  entityId?: string;
  /**
   * HTTP 1.1 Entity tag for the access-control entry.
   */
  etag?: string;
  /**
   * The content generation of the object, if applied to an object.
   */
  generation?: bigint;
  /**
   * The ID of the access-control entry.
   */
  id?: string;
  /**
   * The kind of item this is. For object access control entries, this is
   * always storage#objectAccessControl.
   */
  kind?: string;
  /**
   * The name of the object, if applied to an object.
   */
  object?: string;
  /**
   * The project team associated with the entity, if any.
   */
  projectTeam?: {
    projectNumber?: string;
    team?: string;
  };
  /**
   * The access permission for the entity.
   */
  role?: string;
  /**
   * The link to this access-control entry.
   */
  selfLink?: string;
}

function serializeObjectAccessControl(data: any): ObjectAccessControl {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeObjectAccessControl(data: any): ObjectAccessControl {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * An access-control list.
 */
export interface ObjectAccessControls {
  /**
   * The list of items.
   */
  items?: ObjectAccessControl[];
  /**
   * The kind of item this is. For lists of object access control entries, this
   * is always storage#objectAccessControls.
   */
  kind?: string;
}

function serializeObjectAccessControls(data: any): ObjectAccessControls {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeObjectAccessControl(item))) : undefined,
  };
}

function deserializeObjectAccessControls(data: any): ObjectAccessControls {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeObjectAccessControl(item))) : undefined,
  };
}

/**
 * Additional options for Storage#objectAccessControlsDelete.
 */
export interface ObjectAccessControlsDeleteOptions {
  /**
   * If present, selects a specific revision of this object (as opposed to the
   * latest version, the default).
   */
  generation?: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectAccessControlsDeleteOptions(data: any): ObjectAccessControlsDeleteOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeObjectAccessControlsDeleteOptions(data: any): ObjectAccessControlsDeleteOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectAccessControlsGet.
 */
export interface ObjectAccessControlsGetOptions {
  /**
   * If present, selects a specific revision of this object (as opposed to the
   * latest version, the default).
   */
  generation?: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectAccessControlsGetOptions(data: any): ObjectAccessControlsGetOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeObjectAccessControlsGetOptions(data: any): ObjectAccessControlsGetOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectAccessControlsInsert.
 */
export interface ObjectAccessControlsInsertOptions {
  /**
   * If present, selects a specific revision of this object (as opposed to the
   * latest version, the default).
   */
  generation?: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectAccessControlsInsertOptions(data: any): ObjectAccessControlsInsertOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeObjectAccessControlsInsertOptions(data: any): ObjectAccessControlsInsertOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectAccessControlsList.
 */
export interface ObjectAccessControlsListOptions {
  /**
   * If present, selects a specific revision of this object (as opposed to the
   * latest version, the default).
   */
  generation?: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectAccessControlsListOptions(data: any): ObjectAccessControlsListOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeObjectAccessControlsListOptions(data: any): ObjectAccessControlsListOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectAccessControlsPatch.
 */
export interface ObjectAccessControlsPatchOptions {
  /**
   * If present, selects a specific revision of this object (as opposed to the
   * latest version, the default).
   */
  generation?: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectAccessControlsPatchOptions(data: any): ObjectAccessControlsPatchOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeObjectAccessControlsPatchOptions(data: any): ObjectAccessControlsPatchOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectAccessControlsUpdate.
 */
export interface ObjectAccessControlsUpdateOptions {
  /**
   * If present, selects a specific revision of this object (as opposed to the
   * latest version, the default).
   */
  generation?: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectAccessControlsUpdateOptions(data: any): ObjectAccessControlsUpdateOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeObjectAccessControlsUpdateOptions(data: any): ObjectAccessControlsUpdateOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * A list of objects.
 */
export interface Objects {
  /**
   * The list of items.
   */
  items?: Object[];
  /**
   * The kind of item this is. For lists of objects, this is always
   * storage#objects.
   */
  kind?: string;
  /**
   * The continuation token, used to page through large result sets. Provide
   * this value in a subsequent request to return the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of prefixes of objects matching-but-not-listed up to and
   * including the requested delimiter.
   */
  prefixes?: string[];
}

function serializeObjects(data: any): Objects {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeObject(item))) : undefined,
  };
}

function deserializeObjects(data: any): Objects {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeObject(item))) : undefined,
  };
}

/**
 * Additional options for Storage#objectsCompose.
 */
export interface ObjectsComposeOptions {
  /**
   * Apply a predefined set of access controls to the destination object.
   */
  destinationPredefinedAcl?:  | "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead";
  /**
   * Makes the operation conditional on whether the object's current generation
   * matches the given value. Setting to 0 makes the operation succeed only if
   * there are no live versions of the object.
   */
  ifGenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current
   * metageneration matches the given value.
   */
  ifMetagenerationMatch?: bigint;
  /**
   * Resource name of the Cloud KMS key, of the form
   * projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that
   * will be used to encrypt the object. Overrides the object metadata's
   * kms_key_name value, if any.
   */
  kmsKeyName?: string;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectsComposeOptions(data: any): ObjectsComposeOptions {
  return {
    ...data,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? String(data["ifGenerationMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? String(data["ifMetagenerationMatch"]) : undefined,
  };
}

function deserializeObjectsComposeOptions(data: any): ObjectsComposeOptions {
  return {
    ...data,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? BigInt(data["ifGenerationMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? BigInt(data["ifMetagenerationMatch"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectsCopy.
 */
export interface ObjectsCopyOptions {
  /**
   * Resource name of the Cloud KMS key, of the form
   * projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that
   * will be used to encrypt the object. Overrides the object metadata's
   * kms_key_name value, if any.
   */
  destinationKmsKeyName?: string;
  /**
   * Apply a predefined set of access controls to the destination object.
   */
  destinationPredefinedAcl?:  | "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead";
  /**
   * Makes the operation conditional on whether the destination object's
   * current generation matches the given value. Setting to 0 makes the
   * operation succeed only if there are no live versions of the object.
   */
  ifGenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the destination object's
   * current generation does not match the given value. If no live object
   * exists, the precondition fails. Setting to 0 makes the operation succeed
   * only if there is a live version of the object.
   */
  ifGenerationNotMatch?: bigint;
  /**
   * Makes the operation conditional on whether the destination object's
   * current metageneration matches the given value.
   */
  ifMetagenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the destination object's
   * current metageneration does not match the given value.
   */
  ifMetagenerationNotMatch?: bigint;
  /**
   * Makes the operation conditional on whether the source object's current
   * generation matches the given value.
   */
  ifSourceGenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the source object's current
   * generation does not match the given value.
   */
  ifSourceGenerationNotMatch?: bigint;
  /**
   * Makes the operation conditional on whether the source object's current
   * metageneration matches the given value.
   */
  ifSourceMetagenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the source object's current
   * metageneration does not match the given value.
   */
  ifSourceMetagenerationNotMatch?: bigint;
  /**
   * Set of properties to return. Defaults to noAcl, unless the object resource
   * specifies the acl property, when it defaults to full.
   */
  projection?:  | "full" | "noAcl";
  /**
   * If present, selects a specific revision of the source object (as opposed
   * to the latest version, the default).
   */
  sourceGeneration?: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectsCopyOptions(data: any): ObjectsCopyOptions {
  return {
    ...data,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? String(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? String(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? String(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? String(data["ifMetagenerationNotMatch"]) : undefined,
    ifSourceGenerationMatch: data["ifSourceGenerationMatch"] !== undefined ? String(data["ifSourceGenerationMatch"]) : undefined,
    ifSourceGenerationNotMatch: data["ifSourceGenerationNotMatch"] !== undefined ? String(data["ifSourceGenerationNotMatch"]) : undefined,
    ifSourceMetagenerationMatch: data["ifSourceMetagenerationMatch"] !== undefined ? String(data["ifSourceMetagenerationMatch"]) : undefined,
    ifSourceMetagenerationNotMatch: data["ifSourceMetagenerationNotMatch"] !== undefined ? String(data["ifSourceMetagenerationNotMatch"]) : undefined,
    sourceGeneration: data["sourceGeneration"] !== undefined ? String(data["sourceGeneration"]) : undefined,
  };
}

function deserializeObjectsCopyOptions(data: any): ObjectsCopyOptions {
  return {
    ...data,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? BigInt(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? BigInt(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? BigInt(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? BigInt(data["ifMetagenerationNotMatch"]) : undefined,
    ifSourceGenerationMatch: data["ifSourceGenerationMatch"] !== undefined ? BigInt(data["ifSourceGenerationMatch"]) : undefined,
    ifSourceGenerationNotMatch: data["ifSourceGenerationNotMatch"] !== undefined ? BigInt(data["ifSourceGenerationNotMatch"]) : undefined,
    ifSourceMetagenerationMatch: data["ifSourceMetagenerationMatch"] !== undefined ? BigInt(data["ifSourceMetagenerationMatch"]) : undefined,
    ifSourceMetagenerationNotMatch: data["ifSourceMetagenerationNotMatch"] !== undefined ? BigInt(data["ifSourceMetagenerationNotMatch"]) : undefined,
    sourceGeneration: data["sourceGeneration"] !== undefined ? BigInt(data["sourceGeneration"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectsDelete.
 */
export interface ObjectsDeleteOptions {
  /**
   * If present, permanently deletes a specific revision of this object (as
   * opposed to the latest version, the default).
   */
  generation?: bigint;
  /**
   * Makes the operation conditional on whether the object's current generation
   * matches the given value. Setting to 0 makes the operation succeed only if
   * there are no live versions of the object.
   */
  ifGenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current generation
   * does not match the given value. If no live object exists, the precondition
   * fails. Setting to 0 makes the operation succeed only if there is a live
   * version of the object.
   */
  ifGenerationNotMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current
   * metageneration matches the given value.
   */
  ifMetagenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current
   * metageneration does not match the given value.
   */
  ifMetagenerationNotMatch?: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectsDeleteOptions(data: any): ObjectsDeleteOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? String(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? String(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? String(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? String(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

function deserializeObjectsDeleteOptions(data: any): ObjectsDeleteOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? BigInt(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? BigInt(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? BigInt(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? BigInt(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectsGetIamPolicy.
 */
export interface ObjectsGetIamPolicyOptions {
  /**
   * If present, selects a specific revision of this object (as opposed to the
   * latest version, the default).
   */
  generation?: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectsGetIamPolicyOptions(data: any): ObjectsGetIamPolicyOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeObjectsGetIamPolicyOptions(data: any): ObjectsGetIamPolicyOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectsGet.
 */
export interface ObjectsGetOptions {
  /**
   * If present, selects a specific revision of this object (as opposed to the
   * latest version, the default).
   */
  generation?: bigint;
  /**
   * Makes the operation conditional on whether the object's current generation
   * matches the given value. Setting to 0 makes the operation succeed only if
   * there are no live versions of the object.
   */
  ifGenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current generation
   * does not match the given value. If no live object exists, the precondition
   * fails. Setting to 0 makes the operation succeed only if there is a live
   * version of the object.
   */
  ifGenerationNotMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current
   * metageneration matches the given value.
   */
  ifMetagenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current
   * metageneration does not match the given value.
   */
  ifMetagenerationNotMatch?: bigint;
  /**
   * Set of properties to return. Defaults to noAcl.
   */
  projection?:  | "full" | "noAcl";
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectsGetOptions(data: any): ObjectsGetOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? String(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? String(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? String(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? String(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

function deserializeObjectsGetOptions(data: any): ObjectsGetOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? BigInt(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? BigInt(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? BigInt(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? BigInt(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectsInsert.
 */
export interface ObjectsInsertOptions {
  /**
   * If set, sets the contentEncoding property of the final object to this
   * value. Setting this parameter is equivalent to setting the contentEncoding
   * metadata property. This can be useful when uploading an object with
   * uploadType=media to indicate the encoding of the content being uploaded.
   */
  contentEncoding?: string;
  /**
   * Makes the operation conditional on whether the object's current generation
   * matches the given value. Setting to 0 makes the operation succeed only if
   * there are no live versions of the object.
   */
  ifGenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current generation
   * does not match the given value. If no live object exists, the precondition
   * fails. Setting to 0 makes the operation succeed only if there is a live
   * version of the object.
   */
  ifGenerationNotMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current
   * metageneration matches the given value.
   */
  ifMetagenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current
   * metageneration does not match the given value.
   */
  ifMetagenerationNotMatch?: bigint;
  /**
   * Resource name of the Cloud KMS key, of the form
   * projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that
   * will be used to encrypt the object. Overrides the object metadata's
   * kms_key_name value, if any.
   */
  kmsKeyName?: string;
  /**
   * Name of the object. Required when the object metadata is not otherwise
   * provided. Overrides the object metadata's name value, if any. For
   * information about how to URL encode object names to be path safe, see
   * Encoding URI Path Parts.
   */
  name?: string;
  /**
   * Apply a predefined set of access controls to this object.
   */
  predefinedAcl?:  | "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead";
  /**
   * Set of properties to return. Defaults to noAcl, unless the object resource
   * specifies the acl property, when it defaults to full.
   */
  projection?:  | "full" | "noAcl";
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectsInsertOptions(data: any): ObjectsInsertOptions {
  return {
    ...data,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? String(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? String(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? String(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? String(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

function deserializeObjectsInsertOptions(data: any): ObjectsInsertOptions {
  return {
    ...data,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? BigInt(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? BigInt(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? BigInt(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? BigInt(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectsList.
 */
export interface ObjectsListOptions {
  /**
   * Returns results in a directory-like mode. items will contain only objects
   * whose names, aside from the prefix, do not contain delimiter. Objects whose
   * names, aside from the prefix, contain delimiter will have their name,
   * truncated after the delimiter, returned in prefixes. Duplicate prefixes are
   * omitted.
   */
  delimiter?: string;
  /**
   * Filter results to objects whose names are lexicographically before
   * endOffset. If startOffset is also set, the objects listed will have names
   * between startOffset (inclusive) and endOffset (exclusive).
   */
  endOffset?: string;
  /**
   * If true, objects that end in exactly one instance of delimiter will have
   * their metadata included in items in addition to prefixes.
   */
  includeTrailingDelimiter?: boolean;
  /**
   * Filter results to objects and prefixes that match this glob pattern.
   */
  matchGlob?: string;
  /**
   * Maximum number of items plus prefixes to return in a single page of
   * responses. As duplicate prefixes are omitted, fewer total results may be
   * returned than requested. The service will use this parameter or 1,000
   * items, whichever is smaller.
   */
  maxResults?: number;
  /**
   * A previously-returned page token representing part of the larger set of
   * results to view.
   */
  pageToken?: string;
  /**
   * Filter results to objects whose names begin with this prefix.
   */
  prefix?: string;
  /**
   * Set of properties to return. Defaults to noAcl.
   */
  projection?:  | "full" | "noAcl";
  /**
   * Filter results to objects whose names are lexicographically equal to or
   * after startOffset. If endOffset is also set, the objects listed will have
   * names between startOffset (inclusive) and endOffset (exclusive).
   */
  startOffset?: string;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
  /**
   * If true, lists all versions of an object as distinct results. The default
   * is false. For more information, see Object Versioning.
   */
  versions?: boolean;
}

/**
 * Additional options for Storage#objectsPatch.
 */
export interface ObjectsPatchOptions {
  /**
   * If present, selects a specific revision of this object (as opposed to the
   * latest version, the default).
   */
  generation?: bigint;
  /**
   * Makes the operation conditional on whether the object's current generation
   * matches the given value. Setting to 0 makes the operation succeed only if
   * there are no live versions of the object.
   */
  ifGenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current generation
   * does not match the given value. If no live object exists, the precondition
   * fails. Setting to 0 makes the operation succeed only if there is a live
   * version of the object.
   */
  ifGenerationNotMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current
   * metageneration matches the given value.
   */
  ifMetagenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current
   * metageneration does not match the given value.
   */
  ifMetagenerationNotMatch?: bigint;
  /**
   * Apply a predefined set of access controls to this object.
   */
  predefinedAcl?:  | "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead";
  /**
   * Set of properties to return. Defaults to full.
   */
  projection?:  | "full" | "noAcl";
  /**
   * The project to be billed for this request, for Requester Pays buckets.
   */
  userProject?: string;
}

function serializeObjectsPatchOptions(data: any): ObjectsPatchOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? String(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? String(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? String(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? String(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

function deserializeObjectsPatchOptions(data: any): ObjectsPatchOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? BigInt(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? BigInt(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? BigInt(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? BigInt(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectsRewrite.
 */
export interface ObjectsRewriteOptions {
  /**
   * Resource name of the Cloud KMS key, of the form
   * projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key, that
   * will be used to encrypt the object. Overrides the object metadata's
   * kms_key_name value, if any.
   */
  destinationKmsKeyName?: string;
  /**
   * Apply a predefined set of access controls to the destination object.
   */
  destinationPredefinedAcl?:  | "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead";
  /**
   * Makes the operation conditional on whether the object's current generation
   * matches the given value. Setting to 0 makes the operation succeed only if
   * there are no live versions of the object.
   */
  ifGenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current generation
   * does not match the given value. If no live object exists, the precondition
   * fails. Setting to 0 makes the operation succeed only if there is a live
   * version of the object.
   */
  ifGenerationNotMatch?: bigint;
  /**
   * Makes the operation conditional on whether the destination object's
   * current metageneration matches the given value.
   */
  ifMetagenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the destination object's
   * current metageneration does not match the given value.
   */
  ifMetagenerationNotMatch?: bigint;
  /**
   * Makes the operation conditional on whether the source object's current
   * generation matches the given value.
   */
  ifSourceGenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the source object's current
   * generation does not match the given value.
   */
  ifSourceGenerationNotMatch?: bigint;
  /**
   * Makes the operation conditional on whether the source object's current
   * metageneration matches the given value.
   */
  ifSourceMetagenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the source object's current
   * metageneration does not match the given value.
   */
  ifSourceMetagenerationNotMatch?: bigint;
  /**
   * The maximum number of bytes that will be rewritten per rewrite request.
   * Most callers shouldn't need to specify this parameter - it is primarily in
   * place to support testing. If specified the value must be an integral
   * multiple of 1 MiB (1048576). Also, this only applies to requests where the
   * source and destination span locations and/or storage classes. Finally, this
   * value must not change across rewrite calls else you'll get an error that
   * the rewriteToken is invalid.
   */
  maxBytesRewrittenPerCall?: bigint;
  /**
   * Set of properties to return. Defaults to noAcl, unless the object resource
   * specifies the acl property, when it defaults to full.
   */
  projection?:  | "full" | "noAcl";
  /**
   * Include this field (from the previous rewrite response) on each rewrite
   * request after the first one, until the rewrite response 'done' flag is
   * true. Calls that provide a rewriteToken can omit all other request fields,
   * but if included those fields must match the values provided in the first
   * rewrite request.
   */
  rewriteToken?: string;
  /**
   * If present, selects a specific revision of the source object (as opposed
   * to the latest version, the default).
   */
  sourceGeneration?: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectsRewriteOptions(data: any): ObjectsRewriteOptions {
  return {
    ...data,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? String(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? String(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? String(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? String(data["ifMetagenerationNotMatch"]) : undefined,
    ifSourceGenerationMatch: data["ifSourceGenerationMatch"] !== undefined ? String(data["ifSourceGenerationMatch"]) : undefined,
    ifSourceGenerationNotMatch: data["ifSourceGenerationNotMatch"] !== undefined ? String(data["ifSourceGenerationNotMatch"]) : undefined,
    ifSourceMetagenerationMatch: data["ifSourceMetagenerationMatch"] !== undefined ? String(data["ifSourceMetagenerationMatch"]) : undefined,
    ifSourceMetagenerationNotMatch: data["ifSourceMetagenerationNotMatch"] !== undefined ? String(data["ifSourceMetagenerationNotMatch"]) : undefined,
    maxBytesRewrittenPerCall: data["maxBytesRewrittenPerCall"] !== undefined ? String(data["maxBytesRewrittenPerCall"]) : undefined,
    sourceGeneration: data["sourceGeneration"] !== undefined ? String(data["sourceGeneration"]) : undefined,
  };
}

function deserializeObjectsRewriteOptions(data: any): ObjectsRewriteOptions {
  return {
    ...data,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? BigInt(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? BigInt(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? BigInt(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? BigInt(data["ifMetagenerationNotMatch"]) : undefined,
    ifSourceGenerationMatch: data["ifSourceGenerationMatch"] !== undefined ? BigInt(data["ifSourceGenerationMatch"]) : undefined,
    ifSourceGenerationNotMatch: data["ifSourceGenerationNotMatch"] !== undefined ? BigInt(data["ifSourceGenerationNotMatch"]) : undefined,
    ifSourceMetagenerationMatch: data["ifSourceMetagenerationMatch"] !== undefined ? BigInt(data["ifSourceMetagenerationMatch"]) : undefined,
    ifSourceMetagenerationNotMatch: data["ifSourceMetagenerationNotMatch"] !== undefined ? BigInt(data["ifSourceMetagenerationNotMatch"]) : undefined,
    maxBytesRewrittenPerCall: data["maxBytesRewrittenPerCall"] !== undefined ? BigInt(data["maxBytesRewrittenPerCall"]) : undefined,
    sourceGeneration: data["sourceGeneration"] !== undefined ? BigInt(data["sourceGeneration"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectsSetIamPolicy.
 */
export interface ObjectsSetIamPolicyOptions {
  /**
   * If present, selects a specific revision of this object (as opposed to the
   * latest version, the default).
   */
  generation?: bigint;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectsSetIamPolicyOptions(data: any): ObjectsSetIamPolicyOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeObjectsSetIamPolicyOptions(data: any): ObjectsSetIamPolicyOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectsTestIamPermissions.
 */
export interface ObjectsTestIamPermissionsOptions {
  /**
   * If present, selects a specific revision of this object (as opposed to the
   * latest version, the default).
   */
  generation?: bigint;
  /**
   * Permissions to test.
   */
  permissions: string;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectsTestIamPermissionsOptions(data: any): ObjectsTestIamPermissionsOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeObjectsTestIamPermissionsOptions(data: any): ObjectsTestIamPermissionsOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectsUpdate.
 */
export interface ObjectsUpdateOptions {
  /**
   * If present, selects a specific revision of this object (as opposed to the
   * latest version, the default).
   */
  generation?: bigint;
  /**
   * Makes the operation conditional on whether the object's current generation
   * matches the given value. Setting to 0 makes the operation succeed only if
   * there are no live versions of the object.
   */
  ifGenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current generation
   * does not match the given value. If no live object exists, the precondition
   * fails. Setting to 0 makes the operation succeed only if there is a live
   * version of the object.
   */
  ifGenerationNotMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current
   * metageneration matches the given value.
   */
  ifMetagenerationMatch?: bigint;
  /**
   * Makes the operation conditional on whether the object's current
   * metageneration does not match the given value.
   */
  ifMetagenerationNotMatch?: bigint;
  /**
   * Apply a predefined set of access controls to this object.
   */
  predefinedAcl?:  | "authenticatedRead" | "bucketOwnerFullControl" | "bucketOwnerRead" | "private" | "projectPrivate" | "publicRead";
  /**
   * Set of properties to return. Defaults to full.
   */
  projection?:  | "full" | "noAcl";
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
}

function serializeObjectsUpdateOptions(data: any): ObjectsUpdateOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? String(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? String(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? String(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? String(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

function deserializeObjectsUpdateOptions(data: any): ObjectsUpdateOptions {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
    ifGenerationMatch: data["ifGenerationMatch"] !== undefined ? BigInt(data["ifGenerationMatch"]) : undefined,
    ifGenerationNotMatch: data["ifGenerationNotMatch"] !== undefined ? BigInt(data["ifGenerationNotMatch"]) : undefined,
    ifMetagenerationMatch: data["ifMetagenerationMatch"] !== undefined ? BigInt(data["ifMetagenerationMatch"]) : undefined,
    ifMetagenerationNotMatch: data["ifMetagenerationNotMatch"] !== undefined ? BigInt(data["ifMetagenerationNotMatch"]) : undefined,
  };
}

/**
 * Additional options for Storage#objectsWatchAll.
 */
export interface ObjectsWatchAllOptions {
  /**
   * Returns results in a directory-like mode. items will contain only objects
   * whose names, aside from the prefix, do not contain delimiter. Objects whose
   * names, aside from the prefix, contain delimiter will have their name,
   * truncated after the delimiter, returned in prefixes. Duplicate prefixes are
   * omitted.
   */
  delimiter?: string;
  /**
   * Filter results to objects whose names are lexicographically before
   * endOffset. If startOffset is also set, the objects listed will have names
   * between startOffset (inclusive) and endOffset (exclusive).
   */
  endOffset?: string;
  /**
   * If true, objects that end in exactly one instance of delimiter will have
   * their metadata included in items in addition to prefixes.
   */
  includeTrailingDelimiter?: boolean;
  /**
   * Maximum number of items plus prefixes to return in a single page of
   * responses. As duplicate prefixes are omitted, fewer total results may be
   * returned than requested. The service will use this parameter or 1,000
   * items, whichever is smaller.
   */
  maxResults?: number;
  /**
   * A previously-returned page token representing part of the larger set of
   * results to view.
   */
  pageToken?: string;
  /**
   * Filter results to objects whose names begin with this prefix.
   */
  prefix?: string;
  /**
   * Set of properties to return. Defaults to noAcl.
   */
  projection?:  | "full" | "noAcl";
  /**
   * Filter results to objects whose names are lexicographically equal to or
   * after startOffset. If endOffset is also set, the objects listed will have
   * names between startOffset (inclusive) and endOffset (exclusive).
   */
  startOffset?: string;
  /**
   * The project to be billed for this request. Required for Requester Pays
   * buckets.
   */
  userProject?: string;
  /**
   * If true, lists all versions of an object as distinct results. The default
   * is false. For more information, see Object Versioning.
   */
  versions?: boolean;
}

/**
 * A bucket/object IAM policy.
 */
export interface Policy {
  /**
   * An association between a role, which comes with a set of permissions, and
   * members who may assume that role.
   */
  bindings?: {
    condition?: Expr;
    members?: string[];
    role?: string;
  }[];
  /**
   * HTTP 1.1 Entity tag for the policy.
   */
  etag?: Uint8Array;
  /**
   * The kind of item this is. For policies, this is always storage#policy.
   * This field is ignored on input.
   */
  kind?: string;
  /**
   * The ID of the resource to which this policy belongs. Will be of the form
   * projects/_/buckets/bucket for buckets, and
   * projects/_/buckets/bucket/objects/object for objects. A specific generation
   * may be specified by appending #generationNumber to the end of the object
   * name, e.g. projects/_/buckets/my-bucket/objects/data.txt#17. The current
   * generation can be denoted with #0. This field is ignored on input.
   */
  resourceId?: string;
  /**
   * The IAM policy format version.
   */
  version?: number;
}

function serializePolicy(data: any): Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializePolicy(data: any): Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * Additional options for Storage#projectsHmacKeysCreate.
 */
export interface ProjectsHmacKeysCreateOptions {
  /**
   * Email address of the service account.
   */
  serviceAccountEmail: string;
  /**
   * The project to be billed for this request.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#projectsHmacKeysDelete.
 */
export interface ProjectsHmacKeysDeleteOptions {
  /**
   * The project to be billed for this request.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#projectsHmacKeysGet.
 */
export interface ProjectsHmacKeysGetOptions {
  /**
   * The project to be billed for this request.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#projectsHmacKeysList.
 */
export interface ProjectsHmacKeysListOptions {
  /**
   * Maximum number of items to return in a single page of responses. The
   * service uses this parameter or 250 items, whichever is smaller. The max
   * number of items per page will also be limited by the number of distinct
   * service accounts in the response. If the number of service accounts in a
   * single response is too high, the page will truncated and a next page token
   * will be returned.
   */
  maxResults?: number;
  /**
   * A previously-returned page token representing part of the larger set of
   * results to view.
   */
  pageToken?: string;
  /**
   * If present, only keys for the given service account are returned.
   */
  serviceAccountEmail?: string;
  /**
   * Whether or not to show keys in the DELETED state.
   */
  showDeletedKeys?: boolean;
  /**
   * The project to be billed for this request.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#projectsHmacKeysUpdate.
 */
export interface ProjectsHmacKeysUpdateOptions {
  /**
   * The project to be billed for this request.
   */
  userProject?: string;
}

/**
 * Additional options for Storage#projectsServiceAccountGet.
 */
export interface ProjectsServiceAccountGetOptions {
  /**
   * The project to be billed for this request.
   */
  userProject?: string;
}

/**
 * A rewrite response.
 */
export interface RewriteResponse {
  /**
   * true if the copy is finished; otherwise, false if the copy is in progress.
   * This property is always present in the response.
   */
  done?: boolean;
  /**
   * The kind of item this is.
   */
  kind?: string;
  /**
   * The total size of the object being copied in bytes. This property is
   * always present in the response.
   */
  objectSize?: bigint;
  /**
   * A resource containing the metadata for the copied-to object. This property
   * is present in the response only when copying completes.
   */
  resource?: Object;
  /**
   * A token to use in subsequent requests to continue copying data. This token
   * is present in the response only when there is more data to copy.
   */
  rewriteToken?: string;
  /**
   * The total bytes written so far, which can be used to provide a waiting
   * user with a progress indicator. This property is always present in the
   * response.
   */
  totalBytesRewritten?: bigint;
}

function serializeRewriteResponse(data: any): RewriteResponse {
  return {
    ...data,
    objectSize: data["objectSize"] !== undefined ? String(data["objectSize"]) : undefined,
    resource: data["resource"] !== undefined ? serializeObject(data["resource"]) : undefined,
    totalBytesRewritten: data["totalBytesRewritten"] !== undefined ? String(data["totalBytesRewritten"]) : undefined,
  };
}

function deserializeRewriteResponse(data: any): RewriteResponse {
  return {
    ...data,
    objectSize: data["objectSize"] !== undefined ? BigInt(data["objectSize"]) : undefined,
    resource: data["resource"] !== undefined ? deserializeObject(data["resource"]) : undefined,
    totalBytesRewritten: data["totalBytesRewritten"] !== undefined ? BigInt(data["totalBytesRewritten"]) : undefined,
  };
}

/**
 * A subscription to receive Google PubSub notifications.
 */
export interface ServiceAccount {
  /**
   * The ID of the notification.
   */
  email_address?: string;
  /**
   * The kind of item this is. For notifications, this is always
   * storage#notification.
   */
  kind?: string;
}

/**
 * A storage.(buckets|objects).testIamPermissions response.
 */
export interface TestIamPermissionsResponse {
  /**
   * The kind of item this is.
   */
  kind?: string;
  /**
   * The permissions held by the caller. Permissions are always of the format
   * storage.resource.capability, where resource is one of buckets or objects.
   * The supported permissions are as follows: - storage.buckets.delete — Delete
   * bucket. - storage.buckets.get — Read bucket metadata. -
   * storage.buckets.getIamPolicy — Read bucket IAM policy. -
   * storage.buckets.create — Create bucket. - storage.buckets.list — List
   * buckets. - storage.buckets.setIamPolicy — Update bucket IAM policy. -
   * storage.buckets.update — Update bucket metadata. - storage.objects.delete —
   * Delete object. - storage.objects.get — Read object data and metadata. -
   * storage.objects.getIamPolicy — Read object IAM policy. -
   * storage.objects.create — Create object. - storage.objects.list — List
   * objects. - storage.objects.setIamPolicy — Update object IAM policy. -
   * storage.objects.update — Update object metadata.
   */
  permissions?: string[];
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
