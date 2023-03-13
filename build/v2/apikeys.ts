// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * API Keys API Client for Deno
 * ============================
 * 
 * Manages the API keys associated with developer projects.
 * 
 * Docs: https://cloud.google.com/api-keys/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages the API keys associated with developer projects.
 */
export class APIKeys {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://apikeys.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Find the parent project and resource name of the API key that matches the
   * key string in the request. If the API key has been purged, resource name
   * will not be set. The service account must have the `apikeys.keys.lookup`
   * permission on the parent project.
   *
   */
  async keysLookupKey(opts: KeysLookupKeyOptions = {}): Promise<V2LookupKeyResponse> {
    const url = new URL(`${this.#baseUrl}v2/keys:lookupKey`);
    if (opts.keyString !== undefined) {
      url.searchParams.append("keyString", String(opts.keyString));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as V2LookupKeyResponse;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async operationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Creates a new API key. NOTE: Key is a global resource; hence the only
   * supported value for location is `global`.
   *
   * @param parent Required. The project in which the API key is created.
   */
  async projectsLocationsKeysCreate(parent: string, req: V2Key, opts: ProjectsLocationsKeysCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/keys`);
    if (opts.keyId !== undefined) {
      url.searchParams.append("keyId", String(opts.keyId));
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
   * Deletes an API key. Deleted key can be retrieved within 30 days of
   * deletion. Afterward, key will be purged from the project. NOTE: Key is a
   * global resource; hence the only supported value for location is `global`.
   *
   * @param name Required. The resource name of the API key to be deleted.
   */
  async projectsLocationsKeysDelete(name: string, opts: ProjectsLocationsKeysDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the metadata for an API key. The key string of the API key isn't
   * included in the response. NOTE: Key is a global resource; hence the only
   * supported value for location is `global`.
   *
   * @param name Required. The resource name of the API key to get.
   */
  async projectsLocationsKeysGet(name: string): Promise<V2Key> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as V2Key;
  }

  /**
   * Get the key string for an API key. NOTE: Key is a global resource; hence
   * the only supported value for location is `global`.
   *
   * @param name Required. The resource name of the API key to be retrieved.
   */
  async projectsLocationsKeysGetKeyString(name: string): Promise<V2GetKeyStringResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/keyString`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as V2GetKeyStringResponse;
  }

  /**
   * Lists the API keys owned by a project. The key string of the API key isn't
   * included in the response. NOTE: Key is a global resource; hence the only
   * supported value for location is `global`.
   *
   * @param parent Required. Lists all API keys associated with this project.
   */
  async projectsLocationsKeysList(parent: string, opts: ProjectsLocationsKeysListOptions = {}): Promise<V2ListKeysResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/keys`);
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
    return data as V2ListKeysResponse;
  }

  /**
   * Patches the modifiable fields of an API key. The key string of the API key
   * isn't included in the response. NOTE: Key is a global resource; hence the
   * only supported value for location is `global`.
   *
   * @param name Output only. The resource name of the key. The `name` has the form: `projects//locations/global/keys/`. For example: `projects/123456867718/locations/global/keys/b7ff1f9f-8275-410a-94dd-3855ee9b5dd2` NOTE: Key is a global resource; hence the only supported value for location is `global`.
   */
  async projectsLocationsKeysPatch(name: string, req: V2Key, opts: ProjectsLocationsKeysPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsKeysPatchOptions(opts);
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
    return data as Operation;
  }

  /**
   * Undeletes an API key which was deleted within 30 days. NOTE: Key is a
   * global resource; hence the only supported value for location is `global`.
   *
   * @param name Required. The resource name of the API key to be undeleted.
   */
  async projectsLocationsKeysUndelete(name: string, req: V2UndeleteKeyRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }
}

/**
 * Additional options for APIKeys#keysLookupKey.
 */
export interface KeysLookupKeyOptions {
  /**
   * Required. Finds the project that owns the key string value.
   */
  keyString?: string;
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
 * Additional options for APIKeys#projectsLocationsKeysCreate.
 */
export interface ProjectsLocationsKeysCreateOptions {
  /**
   * User specified key id (optional). If specified, it will become the final
   * component of the key resource name. The id must be unique within the
   * project, must conform with RFC-1034, is restricted to lower-cased letters,
   * and has a maximum length of 63 characters. In another word, the id must
   * match the regular expression: `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. The id
   * must NOT be a UUID-like string.
   */
  keyId?: string;
}

/**
 * Additional options for APIKeys#projectsLocationsKeysDelete.
 */
export interface ProjectsLocationsKeysDeleteOptions {
  /**
   * Optional. The etag known to the client for the expected state of the key.
   * This is to be used for optimistic concurrency.
   */
  etag?: string;
}

/**
 * Additional options for APIKeys#projectsLocationsKeysList.
 */
export interface ProjectsLocationsKeysListOptions {
  /**
   * Optional. Specifies the maximum number of results to be returned at a
   * time.
   */
  pageSize?: number;
  /**
   * Optional. Requests a specific page of results.
   */
  pageToken?: string;
  /**
   * Optional. Indicate that keys deleted in the past 30 days should also be
   * returned.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for APIKeys#projectsLocationsKeysPatch.
 */
export interface ProjectsLocationsKeysPatchOptions {
  /**
   * The field mask specifies which fields to be updated as part of this
   * request. All other fields are ignored. Mutable fields are: `display_name`,
   * `restrictions`, and `annotations`. If an update mask is not provided, the
   * service treats it as an implied mask equivalent to all allowed fields that
   * are set on the wire. If the field mask has a special value "*", the service
   * treats it equivalent to replace all allowed mutable fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsKeysPatchOptions(data: any): ProjectsLocationsKeysPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsKeysPatchOptions(data: any): ProjectsLocationsKeysPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
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
 * Identifier of an Android application for key use.
 */
export interface V2AndroidApplication {
  /**
   * The package name of the application.
   */
  packageName?: string;
  /**
   * The SHA1 fingerprint of the application. For example, both sha1 formats
   * are acceptable :
   * DA:39:A3:EE:5E:6B:4B:0D:32:55:BF:EF:95:60:18:90:AF:D8:07:09 or
   * DA39A3EE5E6B4B0D3255BFEF95601890AFD80709. Output format is the latter.
   */
  sha1Fingerprint?: string;
}

/**
 * The Android apps that are allowed to use the key.
 */
export interface V2AndroidKeyRestrictions {
  /**
   * A list of Android applications that are allowed to make API calls with
   * this key.
   */
  allowedApplications?: V2AndroidApplication[];
}

/**
 * A restriction for a specific service and optionally one or multiple specific
 * methods. Both fields are case insensitive.
 */
export interface V2ApiTarget {
  /**
   * Optional. List of one or more methods that can be called. If empty, all
   * methods for the service are allowed. A wildcard (*) can be used as the last
   * symbol. Valid examples:
   * `google.cloud.translate.v2.TranslateService.GetSupportedLanguage`
   * `TranslateText` `Get*` `translate.googleapis.com.Get*`
   */
  methods?: string[];
  /**
   * The service for this restriction. It should be the canonical service name,
   * for example: `translate.googleapis.com`. You can use [`gcloud services
   * list`](/sdk/gcloud/reference/services/list) to get a list of services that
   * are enabled in the project.
   */
  service?: string;
}

/**
 * The HTTP referrers (websites) that are allowed to use the key.
 */
export interface V2BrowserKeyRestrictions {
  /**
   * A list of regular expressions for the referrer URLs that are allowed to
   * make API calls with this key.
   */
  allowedReferrers?: string[];
}

/**
 * Response message for `GetKeyString` method.
 */
export interface V2GetKeyStringResponse {
  /**
   * An encrypted and signed value of the key.
   */
  keyString?: string;
}

/**
 * The iOS apps that are allowed to use the key.
 */
export interface V2IosKeyRestrictions {
  /**
   * A list of bundle IDs that are allowed when making API calls with this key.
   */
  allowedBundleIds?: string[];
}

/**
 * The representation of a key managed by the API Keys API.
 */
export interface V2Key {
  /**
   * Annotations is an unstructured key-value map stored with a policy that may
   * be set by external tools to store and retrieve arbitrary metadata. They are
   * not queryable and should be preserved when modifying objects.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. A timestamp identifying the time this key was originally
   * created.
   */
  readonly createTime?: Date;
  /**
   * Output only. A timestamp when this key was deleted. If the resource is not
   * deleted, this must be empty.
   */
  readonly deleteTime?: Date;
  /**
   * Human-readable display name of this key that you can modify. The maximum
   * length is 63 characters.
   */
  displayName?: string;
  /**
   * Output only. A checksum computed by the server based on the current value
   * of the Key resource. This may be sent on update and delete requests to
   * ensure the client has an up-to-date value before proceeding. See
   * https://google.aip.dev/154.
   */
  readonly etag?: string;
  /**
   * Output only. An encrypted and signed value held by this key. This field
   * can be accessed only through the `GetKeyString` method.
   */
  readonly keyString?: string;
  /**
   * Output only. The resource name of the key. The `name` has the form:
   * `projects//locations/global/keys/`. For example:
   * `projects/123456867718/locations/global/keys/b7ff1f9f-8275-410a-94dd-3855ee9b5dd2`
   * NOTE: Key is a global resource; hence the only supported value for location
   * is `global`.
   */
  readonly name?: string;
  /**
   * Key restrictions.
   */
  restrictions?: V2Restrictions;
  /**
   * Output only. Unique id in UUID4 format.
   */
  readonly uid?: string;
  /**
   * Output only. A timestamp identifying the time this key was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * Response message for `ListKeys` method.
 */
export interface V2ListKeysResponse {
  /**
   * A list of API keys.
   */
  keys?: V2Key[];
  /**
   * The pagination token for the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for `LookupKey` method.
 */
export interface V2LookupKeyResponse {
  /**
   * The resource name of the API key. If the API key has been purged, resource
   * name is empty.
   */
  name?: string;
  /**
   * The project that owns the key with the value specified in the request.
   */
  parent?: string;
}

/**
 * Describes the restrictions on the key.
 */
export interface V2Restrictions {
  /**
   * The Android apps that are allowed to use the key.
   */
  androidKeyRestrictions?: V2AndroidKeyRestrictions;
  /**
   * A restriction for a specific service and optionally one or more specific
   * methods. Requests are allowed if they match any of these restrictions. If
   * no restrictions are specified, all targets are allowed.
   */
  apiTargets?: V2ApiTarget[];
  /**
   * The HTTP referrers (websites) that are allowed to use the key.
   */
  browserKeyRestrictions?: V2BrowserKeyRestrictions;
  /**
   * The iOS apps that are allowed to use the key.
   */
  iosKeyRestrictions?: V2IosKeyRestrictions;
  /**
   * The IP addresses of callers that are allowed to use the key.
   */
  serverKeyRestrictions?: V2ServerKeyRestrictions;
}

/**
 * The IP addresses of callers that are allowed to use the key.
 */
export interface V2ServerKeyRestrictions {
  /**
   * A list of the caller IP addresses that are allowed to make API calls with
   * this key.
   */
  allowedIps?: string[];
}

/**
 * Request message for `UndeleteKey` method.
 */
export interface V2UndeleteKeyRequest {
}