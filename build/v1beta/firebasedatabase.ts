// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Firebase Realtime Database API Client for Deno
 * ==============================================
 * 
 * The Firebase Realtime Database API enables programmatic provisioning and management of Realtime Database instances.
 * 
 * Docs: https://firebase.google.com/docs/reference/rest/database/database-management/rest/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Firebase Realtime Database API enables programmatic provisioning and
 * management of Realtime Database instances.
 */
export class FirebaseDatabase {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://firebasedatabase.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Requests that a new DatabaseInstance be created. The state of a
   * successfully created DatabaseInstance is ACTIVE. Only available for
   * projects on the Blaze plan. Projects can be upgraded using the Cloud
   * Billing API
   * https://cloud.google.com/billing/reference/rest/v1/projects/updateBillingInfo.
   * Note that it might take a few minutes for billing enablement state to
   * propagate to Firebase systems.
   *
   * @param parent Required. The parent project for which to create a database instance, in the form: `projects/{project-number}/locations/{location-id}`.
   */
  async projectsLocationsInstancesCreate(parent: string, req: DatabaseInstance, opts: ProjectsLocationsInstancesCreateOptions = {}): Promise<DatabaseInstance> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/instances`);
    if (opts.databaseId !== undefined) {
      url.searchParams.append("databaseId", String(opts.databaseId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as DatabaseInstance;
  }

  /**
   * Marks a DatabaseInstance to be deleted. The DatabaseInstance will be set
   * to the DELETED state for 20 days, and will be purged within 30 days. The
   * default database cannot be deleted. IDs for deleted database instances may
   * never be recovered or re-used. The Database may only be deleted if it is
   * already in a DISABLED state.
   *
   * @param name Required. The fully qualified resource name of the database instance, in the form: `projects/{project-number}/locations/{location-id}/instances/{database-id}`
   */
  async projectsLocationsInstancesDelete(name: string): Promise<DatabaseInstance> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as DatabaseInstance;
  }

  /**
   * Disables a DatabaseInstance. The database can be re-enabled later using
   * ReenableDatabaseInstance. When a database is disabled, all reads and writes
   * are denied, including view access in the Firebase console.
   *
   * @param name Required. The fully qualified resource name of the database instance, in the form: `projects/{project-number}/locations/{location-id}/instances/{database-id}`
   */
  async projectsLocationsInstancesDisable(name: string, req: DisableDatabaseInstanceRequest): Promise<DatabaseInstance> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }:disable`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as DatabaseInstance;
  }

  /**
   * Gets the DatabaseInstance identified by the specified resource name.
   *
   * @param name Required. The fully qualified resource name of the database instance, in the form: `projects/{project-number}/locations/{location-id}/instances/{database-id}`. `database-id` is a globally unique identifier across all parent collections. For convenience, this method allows you to supply `-` as a wildcard character in place of specific collections under `projects` and `locations`. The resulting wildcarding form of the method is: `projects/-/locations/-/instances/{database-id}`.
   */
  async projectsLocationsInstancesGet(name: string): Promise<DatabaseInstance> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as DatabaseInstance;
  }

  /**
   * Lists each DatabaseInstance associated with the specified parent project.
   * The list items are returned in no particular order, but will be a
   * consistent view of the database instances when additional requests are made
   * with a `pageToken`. The resulting list contains instances in any STATE. The
   * list results may be stale by a few seconds. Use GetDatabaseInstance for
   * consistent reads.
   *
   * @param parent Required. The parent project for which to list database instances, in the form: `projects/{project-number}/locations/{location-id}` To list across all locations, use a parent in the form: `projects/{project-number}/locations/-`
   */
  async projectsLocationsInstancesList(parent: string, opts: ProjectsLocationsInstancesListOptions = {}): Promise<ListDatabaseInstancesResponse> {
    const url = new URL(`${this.#baseUrl}v1beta/${ parent }/instances`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListDatabaseInstancesResponse;
  }

  /**
   * Enables a DatabaseInstance. The database must have been disabled
   * previously using DisableDatabaseInstance. The state of a successfully
   * reenabled DatabaseInstance is ACTIVE.
   *
   * @param name Required. The fully qualified resource name of the database instance, in the form: `projects/{project-number}/locations/{location-id}/instances/{database-id}`
   */
  async projectsLocationsInstancesReenable(name: string, req: ReenableDatabaseInstanceRequest): Promise<DatabaseInstance> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }:reenable`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as DatabaseInstance;
  }

  /**
   * Restores a DatabaseInstance that was previously marked to be deleted.
   * After the delete method is used, DatabaseInstances are set to the DELETED
   * state for 20 days, and will be purged within 30 days. Databases in the
   * DELETED state can be undeleted without losing any data. This method may
   * only be used on a DatabaseInstance in the DELETED state. Purged
   * DatabaseInstances may not be recovered.
   *
   * @param name Required. The fully qualified resource name of the database instance, in the form: `projects/{project-number}/locations/{location-id}/instances/{database-id}`
   */
  async projectsLocationsInstancesUndelete(name: string, req: UndeleteDatabaseInstanceRequest): Promise<DatabaseInstance> {
    const url = new URL(`${this.#baseUrl}v1beta/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as DatabaseInstance;
  }
}

/**
 * Representation of a Realtime Database instance. Details on interacting with
 * contents of a DatabaseInstance can be found at:
 * https://firebase.google.com/docs/database/rest/start.
 */
export interface DatabaseInstance {
  /**
   * Output only. Output Only. The globally unique hostname of the database.
   */
  readonly databaseUrl?: string;
  /**
   * The fully qualified resource name of the database instance, in the form:
   * `projects/{project-number}/locations/{location-id}/instances/{database-id}`.
   */
  name?: string;
  /**
   * Output only. The resource name of the project this instance belongs to.
   * For example: `projects/{project-number}`.
   */
  readonly project?: string;
  /**
   * Output only. The database's lifecycle state. Read-only.
   */
  readonly state?:  | "LIFECYCLE_STATE_UNSPECIFIED" | "ACTIVE" | "DISABLED" | "DELETED";
  /**
   * Immutable. The database instance type. On creation only USER_DATABASE is
   * allowed, which is also the default when omitted.
   */
  type?:  | "DATABASE_INSTANCE_TYPE_UNSPECIFIED" | "DEFAULT_DATABASE" | "USER_DATABASE";
}

/**
 * The request sent to the DisableDatabaseInstance method.
 */
export interface DisableDatabaseInstanceRequest {
}

/**
 * The response from the ListDatabaseInstances method.
 */
export interface ListDatabaseInstancesResponse {
  /**
   * List of each DatabaseInstance that is in the parent Firebase project.
   */
  instances?: DatabaseInstance[];
  /**
   * If the result list is too large to fit in a single response, then a token
   * is returned. If the string is empty, then this response is the last page of
   * results. This token can be used in a subsequent call to
   * `ListDatabaseInstances` to find the next group of database instances. Page
   * tokens are short-lived and should not be persisted.
   */
  nextPageToken?: string;
}

/**
 * Additional options for FirebaseDatabase#projectsLocationsInstancesCreate.
 */
export interface ProjectsLocationsInstancesCreateOptions {
  /**
   * The globally unique identifier of the database instance.
   */
  databaseId?: string;
  /**
   * When set to true, the request will be validated but not submitted.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for FirebaseDatabase#projectsLocationsInstancesList.
 */
export interface ProjectsLocationsInstancesListOptions {
  /**
   * The maximum number of database instances to return in the response. The
   * server may return fewer than this at its discretion. If no value is
   * specified (or too large a value is specified), then the server will impose
   * its own limit.
   */
  pageSize?: number;
  /**
   * Token returned from a previous call to `ListDatabaseInstances` indicating
   * where in the set of database instances to resume listing.
   */
  pageToken?: string;
  /**
   * Indicate that DatabaseInstances in the `DELETED` state should also be
   * returned.
   */
  showDeleted?: boolean;
}

/**
 * The request sent to the ReenableDatabaseInstance method.
 */
export interface ReenableDatabaseInstanceRequest {
}

/**
 * The request sent to UndeleteDatabaseInstance method.
 */
export interface UndeleteDatabaseInstanceRequest {
}