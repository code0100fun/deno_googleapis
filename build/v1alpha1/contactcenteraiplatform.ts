// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Contact Center AI Platform API Client for Deno
 * ==============================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/solutions/contact-center-ai-platform
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class ContactCenterAIPlatform {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://contactcenteraiplatform.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new ContactCenter in a given project and location.
   *
   * @param parent Required. Value for parent.
   */
  async projectsLocationsContactCentersCreate(parent: string, req: ContactCenter, opts: ProjectsLocationsContactCentersCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/contactCenters`);
    if (opts.contactCenterId !== undefined) {
      url.searchParams.append("contactCenterId", String(opts.contactCenterId));
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
   * Deletes a single ContactCenter.
   *
   * @param name Required. Name of the resource
   */
  async projectsLocationsContactCentersDelete(name: string, opts: ProjectsLocationsContactCentersDeleteOptions = {}): Promise<Operation> {
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
   * Gets details of a single ContactCenter.
   *
   * @param name Required. Name of the resource
   */
  async projectsLocationsContactCentersGet(name: string): Promise<ContactCenter> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ContactCenter;
  }

  /**
   * Lists ContactCenters in a given project and location.
   *
   * @param parent Required. Parent value for ListContactCentersRequest
   */
  async projectsLocationsContactCentersList(parent: string, opts: ProjectsLocationsContactCentersListOptions = {}): Promise<ListContactCentersResponse> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }/contactCenters`);
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
    return data as ListContactCentersResponse;
  }

  /**
   * Updates the parameters of a single ContactCenter.
   *
   * @param name name of resource
   */
  async projectsLocationsContactCentersPatch(name: string, req: ContactCenter, opts: ProjectsLocationsContactCentersPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsContactCentersPatchOptions(opts);
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
   * Queries the contact center quota, an aggregation over all the projects,
   * that belongs to the billing account, which the input project belongs to.
   *
   * @param parent Required. Parent project resource id.
   */
  async projectsLocationsQueryContactCenterQuota(parent: string): Promise<ContactCenterQuota> {
    const url = new URL(`${this.#baseUrl}v1alpha1/${ parent }:queryContactCenterQuota`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ContactCenterQuota;
  }
}

/**
 * Message storing info about the first admin user. Next ID: 3
 */
export interface AdminUser {
  /**
   * Optional. Last/family name of the first admin user.
   */
  familyName?: string;
  /**
   * Optional. First/given name of the first admin user.
   */
  givenName?: string;
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Message describing ContactCenter object Next ID: 14
 */
export interface ContactCenter {
  /**
   * Optional. Info about the first admin user, such as given name and family
   * name.
   */
  adminUser?: AdminUser;
  /**
   * Optional. Whether to enable users to be created in the CCAIP-instance
   * concurrently to having users in Cloud identity
   */
  ccaipManagedUsers?: boolean;
  /**
   * Output only. [Output only] Create time stamp
   */
  readonly createTime?: Date;
  /**
   * Required. Immutable. At least 2 and max 16 char long, must conform to [RFC
   * 1035](https://www.ietf.org/rfc/rfc1035.txt).
   */
  customerDomainPrefix?: string;
  /**
   * Required. A user friendly name for the ContactCenter.
   */
  displayName?: string;
  /**
   * The configuration of this instance, it is currently immutable once
   * created.
   */
  instanceConfig?: InstanceConfig;
  /**
   * Labels as key value pairs
   */
  labels?: {
    [key: string]: string
  };
  /**
   * name of resource
   */
  name?: string;
  /**
   * Optional. Params that sets up Google as IdP.
   */
  samlParams?: SAMLParams;
  /**
   * Output only. The state of this contact center.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "STATE_DEPLOYING" | "STATE_DEPLOYED" | "STATE_TERMINATING" | "STATE_FAILED" | "STATE_TERMINATING_FAILED" | "STATE_TERMINATED";
  /**
   * Output only. [Output only] Update time stamp
   */
  readonly updateTime?: Date;
  /**
   * Output only. URIs to access the deployed ContactCenters.
   */
  readonly uris?: URIs;
  /**
   * Optional. Email address of the first admin user.
   */
  userEmail?: string;
}

/**
 * Represents a quota for contact centers.
 */
export interface ContactCenterQuota {
  /**
   * Reflects the count limit of contact centers on a billing account.
   */
  contactCenterCountLimit?: number;
  /**
   * Reflects the count sum of contact centers on a billing account.
   */
  contactCenterCountSum?: number;
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
 * Message storing the instance configuration.
 */
export interface InstanceConfig {
  /**
   * The instance size of this the instance configuration.
   */
  instanceSize?:  | "INSTANCE_SIZE_UNSPECIFIED" | "STANDARD_SMALL" | "STANDARD_MEDIUM" | "STANDARD_LARGE" | "STANDARD_XLARGE" | "STANDARD_2XLARGE" | "STANDARD_3XLARGE";
}

/**
 * Message for response to listing ContactCenters
 */
export interface ListContactCentersResponse {
  /**
   * The list of ContactCenter
   */
  contactCenters?: ContactCenter[];
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
   * Contact center information for this request
   */
  contactCenter?: ContactCenter;
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
 * Additional options for
 * ContactCenterAIPlatform#projectsLocationsContactCentersCreate.
 */
export interface ProjectsLocationsContactCentersCreateOptions {
  /**
   * Required. Id of the requesting object If auto-generating Id server-side,
   * remove this field and contact_center_id from the method_signature of Create
   * RPC
   */
  contactCenterId?: string;
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
 * Additional options for
 * ContactCenterAIPlatform#projectsLocationsContactCentersDelete.
 */
export interface ProjectsLocationsContactCentersDeleteOptions {
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
 * Additional options for
 * ContactCenterAIPlatform#projectsLocationsContactCentersList.
 */
export interface ProjectsLocationsContactCentersListOptions {
  /**
   * Filtering results
   */
  filter?: string;
  /**
   * Hint for how to order the results
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
}

/**
 * Additional options for
 * ContactCenterAIPlatform#projectsLocationsContactCentersPatch.
 */
export interface ProjectsLocationsContactCentersPatchOptions {
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
   * the ContactCenter resource by the update. The fields specified in the
   * update_mask are relative to the resource, not the full request. A field
   * will be overwritten if it is in the mask. If the user does not provide a
   * mask then all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsContactCentersPatchOptions(data: any): ProjectsLocationsContactCentersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsContactCentersPatchOptions(data: any): ProjectsLocationsContactCentersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for ContactCenterAIPlatform#projectsLocationsList.
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
 * Additional options for
 * ContactCenterAIPlatform#projectsLocationsOperationsList.
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
 * Message storing SAML params to enable Google as IDP.
 */
export interface SAMLParams {
  /**
   * SAML certificate
   */
  certificate?: string;
  /**
   * Entity id URL
   */
  entityId?: string;
  /**
   * Single sign-on URL
   */
  ssoUri?: string;
  /**
   * Email address of the first admin users.
   */
  userEmail?: string;
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
 * Message storing the URIs of the ContactCenter.
 */
export interface URIs {
  /**
   * Chat Bot Uri of the ContactCenter
   */
  chatBotUri?: string;
  /**
   * Media Uri of the ContactCenter.
   */
  mediaUri?: string;
  /**
   * Root Uri of the ContactCenter.
   */
  rootUri?: string;
  /**
   * Virtual Agent Streaming Service Uri of the ContactCenter.
   */
  virtualAgentStreamingServiceUri?: string;
}