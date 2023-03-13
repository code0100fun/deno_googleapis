// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Shell API Client for Deno
 * ===============================
 * 
 * Allows users to start, configure, and connect to interactive shell sessions running in the cloud. 
 * 
 * Docs: https://cloud.google.com/shell/docs/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Allows users to start, configure, and connect to interactive shell sessions
 * running in the cloud.
 */
export class CloudShell {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudshell.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
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
   * Adds a public SSH key to an environment, allowing clients with the
   * corresponding private key to connect to that environment via SSH. If a key
   * with the same content already exists, this will error with ALREADY_EXISTS.
   *
   * @param environment Environment this key should be added to, e.g. `users/me/environments/default`.
   */
  async usersEnvironmentsAddPublicKey(environment: string, req: AddPublicKeyRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ environment }:addPublicKey`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sends OAuth credentials to a running environment on behalf of a user. When
   * this completes, the environment will be authorized to run various Google
   * Cloud command line tools without requiring the user to manually
   * authenticate.
   *
   * @param name Name of the resource that should receive the credentials, for example `users/me/environments/default` or `users/someone@example.com/environments/default`.
   */
  async usersEnvironmentsAuthorize(name: string, req: AuthorizeEnvironmentRequest): Promise<Operation> {
    req = serializeAuthorizeEnvironmentRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:authorize`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets an environment. Returns NOT_FOUND if the environment does not exist.
   *
   * @param name Required. Name of the requested resource, for example `users/me/environments/default` or `users/someone@example.com/environments/default`.
   */
  async usersEnvironmentsGet(name: string): Promise<Environment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Environment;
  }

  /**
   * Removes a public SSH key from an environment. Clients will no longer be
   * able to connect to the environment using the corresponding private key. If
   * a key with the same content is not present, this will error with NOT_FOUND.
   *
   * @param environment Environment this key should be removed from, e.g. `users/me/environments/default`.
   */
  async usersEnvironmentsRemovePublicKey(environment: string, req: RemovePublicKeyRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ environment }:removePublicKey`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Starts an existing environment, allowing clients to connect to it. The
   * returned operation will contain an instance of StartEnvironmentMetadata in
   * its metadata field. Users can wait for the environment to start by polling
   * this operation via GetOperation. Once the environment has finished starting
   * and is ready to accept connections, the operation will contain a
   * StartEnvironmentResponse in its response field.
   *
   * @param name Name of the resource that should be started, for example `users/me/environments/default` or `users/someone@example.com/environments/default`.
   */
  async usersEnvironmentsStart(name: string, req: StartEnvironmentRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:start`);
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
 * Message included in the metadata field of operations returned from
 * AddPublicKey.
 */
export interface AddPublicKeyMetadata {
}

/**
 * Request message for AddPublicKey.
 */
export interface AddPublicKeyRequest {
  /**
   * Key that should be added to the environment. Supported formats are
   * `ssh-dss` (see RFC4253), `ssh-rsa` (see RFC4253), `ecdsa-sha2-nistp256`
   * (see RFC5656), `ecdsa-sha2-nistp384` (see RFC5656) and
   * `ecdsa-sha2-nistp521` (see RFC5656). It should be structured as <format>
   * <content>, where <content> part is encoded with Base64.
   */
  key?: string;
}

/**
 * Response message for AddPublicKey.
 */
export interface AddPublicKeyResponse {
  /**
   * Key that was added to the environment.
   */
  key?: string;
}

/**
 * Message included in the metadata field of operations returned from
 * AuthorizeEnvironment.
 */
export interface AuthorizeEnvironmentMetadata {
}

/**
 * Request message for AuthorizeEnvironment.
 */
export interface AuthorizeEnvironmentRequest {
  /**
   * The OAuth access token that should be sent to the environment.
   */
  accessToken?: string;
  /**
   * The time when the credentials expire. If not set, defaults to one hour
   * from when the server received the request.
   */
  expireTime?: Date;
  /**
   * The OAuth ID token that should be sent to the environment.
   */
  idToken?: string;
}

function serializeAuthorizeEnvironmentRequest(data: any): AuthorizeEnvironmentRequest {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
  };
}

function deserializeAuthorizeEnvironmentRequest(data: any): AuthorizeEnvironmentRequest {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
  };
}

/**
 * Response message for AuthorizeEnvironment.
 */
export interface AuthorizeEnvironmentResponse {
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Message included in the metadata field of operations returned from
 * CreateEnvironment.
 */
export interface CreateEnvironmentMetadata {
}

/**
 * Message included in the metadata field of operations returned from
 * DeleteEnvironment.
 */
export interface DeleteEnvironmentMetadata {
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
 * A Cloud Shell environment, which is defined as the combination of a Docker
 * image specifying what is installed on the environment and a home directory
 * containing the user's data that will remain across sessions. Each user has at
 * least an environment with the ID "default".
 */
export interface Environment {
  /**
   * Required. Immutable. Full path to the Docker image used to run this
   * environment, e.g. "gcr.io/dev-con/cloud-devshell:latest".
   */
  dockerImage?: string;
  /**
   * Output only. The environment's identifier, unique among the user's
   * environments.
   */
  readonly id?: string;
  /**
   * Immutable. Full name of this resource, in the format
   * `users/{owner_email}/environments/{environment_id}`. `{owner_email}` is the
   * email address of the user to whom this environment belongs, and
   * `{environment_id}` is the identifier of this environment. For example,
   * `users/someone@example.com/environments/default`.
   */
  name?: string;
  /**
   * Output only. Public keys associated with the environment. Clients can
   * connect to this environment via SSH only if they possess a private key
   * corresponding to at least one of these public keys. Keys can be added to or
   * removed from the environment using the AddPublicKey and RemovePublicKey
   * methods.
   */
  readonly publicKeys?: string[];
  /**
   * Output only. Host to which clients can connect to initiate SSH sessions
   * with the environment.
   */
  readonly sshHost?: string;
  /**
   * Output only. Port to which clients can connect to initiate SSH sessions
   * with the environment.
   */
  readonly sshPort?: number;
  /**
   * Output only. Username that clients should use when initiating SSH sessions
   * with the environment.
   */
  readonly sshUsername?: string;
  /**
   * Output only. Current execution state of this environment.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "SUSPENDED" | "PENDING" | "RUNNING" | "DELETING";
  /**
   * Output only. Host to which clients can connect to initiate HTTPS or WSS
   * connections with the environment.
   */
  readonly webHost?: string;
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
 * Additional options for CloudShell#operationsList.
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
 * Message included in the metadata field of operations returned from
 * RemovePublicKey.
 */
export interface RemovePublicKeyMetadata {
}

/**
 * Request message for RemovePublicKey.
 */
export interface RemovePublicKeyRequest {
  /**
   * Key that should be removed from the environment.
   */
  key?: string;
}

/**
 * Response message for RemovePublicKey.
 */
export interface RemovePublicKeyResponse {
}

/**
 * Message included in the metadata field of operations returned from
 * StartEnvironment.
 */
export interface StartEnvironmentMetadata {
  /**
   * Current state of the environment being started.
   */
  state?:  | "STATE_UNSPECIFIED" | "STARTING" | "UNARCHIVING_DISK" | "AWAITING_COMPUTE_RESOURCES" | "FINISHED";
}

/**
 * Request message for StartEnvironment.
 */
export interface StartEnvironmentRequest {
  /**
   * The initial access token passed to the environment. If this is present and
   * valid, the environment will be pre-authenticated with gcloud so that the
   * user can run gcloud commands in Cloud Shell without having to log in. This
   * code can be updated later by calling AuthorizeEnvironment.
   */
  accessToken?: string;
  /**
   * Public keys that should be added to the environment before it is started.
   */
  publicKeys?: string[];
}

/**
 * Message included in the response field of operations returned from
 * StartEnvironment once the operation is complete.
 */
export interface StartEnvironmentResponse {
  /**
   * Environment that was started.
   */
  environment?: Environment;
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