// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Analytics Hub API Client for Deno
 * =================================
 * 
 * Exchange data and analytics assets securely and efficiently.
 * 
 * Docs: https://cloud.google.com/bigquery/docs/analytics-hub-introduction
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Exchange data and analytics assets securely and efficiently.
 */
export class AnalyticsHub {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://analyticshub.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Lists all data exchanges from projects in a given organization and
   * location.
   *
   * @param organization Required. The organization resource path of the projects containing DataExchanges. e.g. `organizations/myorg/locations/US`.
   */
  async organizationsLocationsDataExchangesList(organization: string, opts: OrganizationsLocationsDataExchangesListOptions = {}): Promise<ListOrgDataExchangesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ organization }/dataExchanges`);
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
    return deserializeListOrgDataExchangesResponse(data);
  }

  /**
   * Creates a new data exchange.
   *
   * @param parent Required. The parent resource path of the data exchange. e.g. `projects/myproject/locations/US`.
   */
  async projectsLocationsDataExchangesCreate(parent: string, req: DataExchange, opts: ProjectsLocationsDataExchangesCreateOptions = {}): Promise<DataExchange> {
    req = serializeDataExchange(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dataExchanges`);
    if (opts.dataExchangeId !== undefined) {
      url.searchParams.append("dataExchangeId", String(opts.dataExchangeId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDataExchange(data);
  }

  /**
   * Deletes an existing data exchange.
   *
   * @param name Required. The full name of the data exchange resource that you want to delete. For example, `projects/myproject/locations/US/dataExchanges/123`.
   */
  async projectsLocationsDataExchangesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the details of a data exchange.
   *
   * @param name Required. The resource name of the data exchange. e.g. `projects/myproject/locations/US/dataExchanges/123`.
   */
  async projectsLocationsDataExchangesGet(name: string): Promise<DataExchange> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDataExchange(data);
  }

  /**
   * Gets the IAM policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataExchangesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists all data exchanges in a given project and location.
   *
   * @param parent Required. The parent resource path of the data exchanges. e.g. `projects/myproject/locations/US`.
   */
  async projectsLocationsDataExchangesList(parent: string, opts: ProjectsLocationsDataExchangesListOptions = {}): Promise<ListDataExchangesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dataExchanges`);
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
    return deserializeListDataExchangesResponse(data);
  }

  /**
   * Creates a new listing.
   *
   * @param parent Required. The parent resource path of the listing. e.g. `projects/myproject/locations/US/dataExchanges/123`.
   */
  async projectsLocationsDataExchangesListingsCreate(parent: string, req: Listing, opts: ProjectsLocationsDataExchangesListingsCreateOptions = {}): Promise<Listing> {
    req = serializeListing(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/listings`);
    if (opts.listingId !== undefined) {
      url.searchParams.append("listingId", String(opts.listingId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeListing(data);
  }

  /**
   * Deletes a listing.
   *
   * @param name Required. Resource name of the listing to delete. e.g. `projects/myproject/locations/US/dataExchanges/123/listings/456`.
   */
  async projectsLocationsDataExchangesListingsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the details of a listing.
   *
   * @param name Required. The resource name of the listing. e.g. `projects/myproject/locations/US/dataExchanges/123/listings/456`.
   */
  async projectsLocationsDataExchangesListingsGet(name: string): Promise<Listing> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListing(data);
  }

  /**
   * Gets the IAM policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataExchangesListingsGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists all listings in a given project and location.
   *
   * @param parent Required. The parent resource path of the listing. e.g. `projects/myproject/locations/US/dataExchanges/123`.
   */
  async projectsLocationsDataExchangesListingsList(parent: string, opts: ProjectsLocationsDataExchangesListingsListOptions = {}): Promise<ListListingsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/listings`);
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
    return deserializeListListingsResponse(data);
  }

  /**
   * Updates an existing listing.
   *
   * @param name Output only. The resource name of the listing. e.g. `projects/myproject/locations/US/dataExchanges/123/listings/456`
   */
  async projectsLocationsDataExchangesListingsPatch(name: string, req: Listing, opts: ProjectsLocationsDataExchangesListingsPatchOptions = {}): Promise<Listing> {
    req = serializeListing(req);
    opts = serializeProjectsLocationsDataExchangesListingsPatchOptions(opts);
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
    return deserializeListing(data);
  }

  /**
   * Sets the IAM policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataExchangesListingsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Subscribes to a listing. Currently, with Analytics Hub, you can create
   * listings that reference only BigQuery datasets. Upon subscription to a
   * listing for a BigQuery dataset, Analytics Hub creates a linked dataset in
   * the subscriber's project.
   *
   * @param name Required. Resource name of the listing that you want to subscribe to. e.g. `projects/myproject/locations/US/dataExchanges/123/listings/456`.
   */
  async projectsLocationsDataExchangesListingsSubscribe(name: string, req: SubscribeListingRequest): Promise<SubscribeListingResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:subscribe`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SubscribeListingResponse;
  }

  /**
   * Returns the permissions that a caller has.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataExchangesListingsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Updates an existing data exchange.
   *
   * @param name Output only. The resource name of the data exchange. e.g. `projects/myproject/locations/US/dataExchanges/123`.
   */
  async projectsLocationsDataExchangesPatch(name: string, req: DataExchange, opts: ProjectsLocationsDataExchangesPatchOptions = {}): Promise<DataExchange> {
    req = serializeDataExchange(req);
    opts = serializeProjectsLocationsDataExchangesPatchOptions(opts);
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
    return deserializeDataExchange(data);
  }

  /**
   * Sets the IAM policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataExchangesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns the permissions that a caller has.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataExchangesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }
}

/**
 * Specifies the audit configuration for a service. The configuration
 * determines which permission types are logged, and what identities, if any,
 * are exempted from logging. An AuditConfig must have one or more
 * AuditLogConfigs. If there are AuditConfigs for both `allServices` and a
 * specific service, the union of the two AuditConfigs is used for that service:
 * the log_types specified in each AuditConfig are enabled, and the
 * exempted_members in each AuditLogConfig are exempted. Example Policy with
 * multiple AuditConfigs: { "audit_configs": [ { "service": "allServices",
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" }, { "log_type":
 * "ADMIN_READ" } ] }, { "service": "sampleservice.googleapis.com",
 * "audit_log_configs": [ { "log_type": "DATA_READ" }, { "log_type":
 * "DATA_WRITE", "exempted_members": [ "user:aliya@example.com" ] } ] } ] } For
 * sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ
 * logging. It also exempts `jose@example.com` from DATA_READ logging, and
 * `aliya@example.com` from DATA_WRITE logging.
 */
export interface AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: AuditLogConfig[];
  /**
   * Specifies a service that will be enabled for audit logging. For example,
   * `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a
   * special value that covers all services.
   */
  service?: string;
}

/**
 * Provides the configuration for logging a type of permissions. Example: {
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" } ] } This enables
 * 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from
 * DATA_READ logging.
 */
export interface AuditLogConfig {
  /**
   * Specifies the identities that do not cause logging for this type of
   * permission. Follows the same format of Binding.members.
   */
  exemptedMembers?: string[];
  /**
   * The log type that this config enables.
   */
  logType?:  | "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ";
}

/**
 * A reference to a shared dataset. It is an existing BigQuery dataset with a
 * collection of objects such as tables and views that you want to share with
 * subscribers. When subscriber's subscribe to a listing, Analytics Hub creates
 * a linked dataset in the subscriber's project. A Linked dataset is an opaque,
 * read-only BigQuery dataset that serves as a _symbolic link_ to a shared
 * dataset.
 */
export interface BigQueryDatasetSource {
  /**
   * Resource name of the dataset source for this listing. e.g.
   * `projects/myproject/datasets/123`
   */
  dataset?: string;
}

/**
 * Associates `members`, or principals, with a `role`.
 */
export interface Binding {
  /**
   * The condition that is associated with this binding. If the condition
   * evaluates to `true`, then this binding applies to the current request. If
   * the condition evaluates to `false`, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding. To learn which
   * resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: Expr;
  /**
   * Specifies the principals requesting access for a Google Cloud resource.
   * `members` can have the following values: * `allUsers`: A special identifier
   * that represents anyone who is on the internet; with or without a Google
   * account. * `allAuthenticatedUsers`: A special identifier that represents
   * anyone who is authenticated with a Google account or a service account.
   * Does not include identities that come from external identity providers
   * (IdPs) through identity federation. * `user:{emailid}`: An email address
   * that represents a specific Google account. For example, `alice@example.com`
   * . * `serviceAccount:{emailid}`: An email address that represents a Google
   * service account. For example, `my-other-app@appspot.gserviceaccount.com`. *
   * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An
   * identifier for a [Kubernetes service
   * account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts).
   * For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. *
   * `group:{emailid}`: An email address that represents a Google group. For
   * example, `admins@example.com`. * `domain:{domain}`: The G Suite domain
   * (primary) that represents all the users of that domain. For example,
   * `google.com` or `example.com`. * `deleted:user:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a user that has been
   * recently deleted. For example,
   * `alice@example.com?uid=123456789012345678901`. If the user is recovered,
   * this value reverts to `user:{emailid}` and the recovered user retains the
   * role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a service account
   * that has been recently deleted. For example,
   * `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If
   * the service account is undeleted, this value reverts to
   * `serviceAccount:{emailid}` and the undeleted service account retains the
   * role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email
   * address (plus unique identifier) representing a Google group that has been
   * recently deleted. For example,
   * `admins@example.com?uid=123456789012345678901`. If the group is recovered,
   * this value reverts to `group:{emailid}` and the recovered group retains the
   * role in the binding.
   */
  members?: string[];
  /**
   * Role that is assigned to the list of `members`, or principals. For
   * example, `roles/viewer`, `roles/editor`, or `roles/owner`.
   */
  role?: string;
}

/**
 * A data exchange is a container that lets you share data. Along with the
 * descriptive information about the data exchange, it contains listings that
 * reference shared datasets.
 */
export interface DataExchange {
  /**
   * Optional. Description of the data exchange. The description must not
   * contain Unicode non-characters as well as C0 and C1 control codes except
   * tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF).
   * Default value is an empty string. Max length: 2000 bytes.
   */
  description?: string;
  /**
   * Required. Human-readable display name of the data exchange. The display
   * name must contain only Unicode letters, numbers (0-9), underscores (_),
   * dashes (-), spaces ( ), ampersands (&) and must not start or end with
   * spaces. Default value is an empty string. Max length: 63 bytes.
   */
  displayName?: string;
  /**
   * Optional. Documentation describing the data exchange.
   */
  documentation?: string;
  /**
   * Optional. Base64 encoded image representing the data exchange. Max Size:
   * 3.0MiB Expected image dimensions are 512x512 pixels, however the API only
   * performs validation on size of the encoded data. Note: For byte fields, the
   * content of the fields are base64-encoded (which increases the size of the
   * data by 33-36%) when using JSON on the wire.
   */
  icon?: Uint8Array;
  /**
   * Output only. Number of listings contained in the data exchange.
   */
  readonly listingCount?: number;
  /**
   * Output only. The resource name of the data exchange. e.g.
   * `projects/myproject/locations/US/dataExchanges/123`.
   */
  readonly name?: string;
  /**
   * Optional. Email or URL of the primary point of contact of the data
   * exchange. Max Length: 1000 bytes.
   */
  primaryContact?: string;
}

function serializeDataExchange(data: any): DataExchange {
  return {
    ...data,
    icon: data["icon"] !== undefined ? encodeBase64(data["icon"]) : undefined,
  };
}

function deserializeDataExchange(data: any): DataExchange {
  return {
    ...data,
    icon: data["icon"] !== undefined ? decodeBase64(data["icon"] as string) : undefined,
  };
}

/**
 * Contains details of the data provider.
 */
export interface DataProvider {
  /**
   * Optional. Name of the data provider.
   */
  name?: string;
  /**
   * Optional. Email or URL of the data provider. Max Length: 1000 bytes.
   */
  primaryContact?: string;
}

/**
 * Defines the destination bigquery dataset.
 */
export interface DestinationDataset {
  /**
   * Required. A reference that identifies the destination dataset.
   */
  datasetReference?: DestinationDatasetReference;
  /**
   * Optional. A user-friendly description of the dataset.
   */
  description?: string;
  /**
   * Optional. A descriptive name for the dataset.
   */
  friendlyName?: string;
  /**
   * Optional. The labels associated with this dataset. You can use these to
   * organize and group your datasets. You can set this property when inserting
   * or updating a dataset. See
   * https://cloud.google.com/resource-manager/docs/creating-managing-labels for
   * more information.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. The geographic location where the dataset should reside. See
   * https://cloud.google.com/bigquery/docs/locations for supported locations.
   */
  location?: string;
}

/**
 * Contains the reference that identifies a destination bigquery dataset.
 */
export interface DestinationDatasetReference {
  /**
   * Required. A unique ID for this dataset, without the project name. The ID
   * must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_).
   * The maximum length is 1,024 characters.
   */
  datasetId?: string;
  /**
   * Required. The ID of the project containing this dataset.
   */
  projectId?: string;
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
 * Represents a textual expression in the Common Expression Language (CEL)
 * syntax. CEL is a C-like expression language. The syntax and semantics of CEL
 * are documented at https://github.com/google/cel-spec. Example (Comparison):
 * title: "Summary size limit" description: "Determines if a summary is less
 * than 100 chars" expression: "document.summary.size() < 100" Example
 * (Equality): title: "Requestor is owner" description: "Determines if requestor
 * is the document owner" expression: "document.owner ==
 * request.auth.claims.email" Example (Logic): title: "Public documents"
 * description: "Determine whether the document should be publicly visible"
 * expression: "document.type != 'private' && document.type != 'internal'"
 * Example (Data Manipulation): title: "Notification string" description:
 * "Create a notification string with a timestamp." expression: "'New message
 * received at ' + string(document.create_time)" The exact variables and
 * functions that may be referenced within an expression are determined by the
 * service that evaluates it. See the service documentation for additional
 * information.
 */
export interface Expr {
  /**
   * Optional. Description of the expression. This is a longer text which
   * describes the expression, e.g. when hovered over it in a UI.
   */
  description?: string;
  /**
   * Textual representation of an expression in Common Expression Language
   * syntax.
   */
  expression?: string;
  /**
   * Optional. String indicating the location of the expression for error
   * reporting, e.g. a file name and a position in the file.
   */
  location?: string;
  /**
   * Optional. Title for the expression, i.e. a short string describing its
   * purpose. This can be used e.g. in UIs which allow to enter the expression.
   */
  title?: string;
}

/**
 * Request message for `GetIamPolicy` method.
 */
export interface GetIamPolicyRequest {
  /**
   * OPTIONAL: A `GetPolicyOptions` object for specifying options to
   * `GetIamPolicy`.
   */
  options?: GetPolicyOptions;
}

/**
 * Encapsulates settings provided to GetIamPolicy.
 */
export interface GetPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy. Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected. Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset. The policy in the
   * response might use the policy version that you specified, or it might use a
   * lower policy version. For example, if you specify version 3, but the policy
   * has no conditional role bindings, the response uses version 1. To learn
   * which resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  requestedPolicyVersion?: number;
}

/**
 * Message for response to the list of data exchanges.
 */
export interface ListDataExchangesResponse {
  /**
   * The list of data exchanges.
   */
  dataExchanges?: DataExchange[];
  /**
   * A token to request the next page of results.
   */
  nextPageToken?: string;
}

function serializeListDataExchangesResponse(data: any): ListDataExchangesResponse {
  return {
    ...data,
    dataExchanges: data["dataExchanges"] !== undefined ? data["dataExchanges"].map((item: any) => (serializeDataExchange(item))) : undefined,
  };
}

function deserializeListDataExchangesResponse(data: any): ListDataExchangesResponse {
  return {
    ...data,
    dataExchanges: data["dataExchanges"] !== undefined ? data["dataExchanges"].map((item: any) => (deserializeDataExchange(item))) : undefined,
  };
}

/**
 * A listing is what gets published into a data exchange that a subscriber can
 * subscribe to. It contains a reference to the data source along with
 * descriptive information that will help subscribers find and subscribe the
 * data.
 */
export interface Listing {
  /**
   * Required. Shared dataset i.e. BigQuery dataset source.
   */
  bigqueryDataset?: BigQueryDatasetSource;
  /**
   * Optional. Categories of the listing. Up to two categories are allowed.
   */
  categories?:  | "CATEGORY_UNSPECIFIED" | "CATEGORY_OTHERS" | "CATEGORY_ADVERTISING_AND_MARKETING" | "CATEGORY_COMMERCE" | "CATEGORY_CLIMATE_AND_ENVIRONMENT" | "CATEGORY_DEMOGRAPHICS" | "CATEGORY_ECONOMICS" | "CATEGORY_EDUCATION" | "CATEGORY_ENERGY" | "CATEGORY_FINANCIAL" | "CATEGORY_GAMING" | "CATEGORY_GEOSPATIAL" | "CATEGORY_HEALTHCARE_AND_LIFE_SCIENCE" | "CATEGORY_MEDIA" | "CATEGORY_PUBLIC_SECTOR" | "CATEGORY_RETAIL" | "CATEGORY_SPORTS" | "CATEGORY_SCIENCE_AND_RESEARCH" | "CATEGORY_TRANSPORTATION_AND_LOGISTICS" | "CATEGORY_TRAVEL_AND_TOURISM"[];
  /**
   * Optional. Details of the data provider who owns the source data.
   */
  dataProvider?: DataProvider;
  /**
   * Optional. Short description of the listing. The description must not
   * contain Unicode non-characters and C0 and C1 control codes except tabs
   * (HT), new lines (LF), carriage returns (CR), and page breaks (FF). Default
   * value is an empty string. Max length: 2000 bytes.
   */
  description?: string;
  /**
   * Required. Human-readable display name of the listing. The display name
   * must contain only Unicode letters, numbers (0-9), underscores (_), dashes
   * (-), spaces ( ), ampersands (&) and can't start or end with spaces. Default
   * value is an empty string. Max length: 63 bytes.
   */
  displayName?: string;
  /**
   * Optional. Documentation describing the listing.
   */
  documentation?: string;
  /**
   * Optional. Base64 encoded image representing the listing. Max Size: 3.0MiB
   * Expected image dimensions are 512x512 pixels, however the API only performs
   * validation on size of the encoded data. Note: For byte fields, the contents
   * of the field are base64-encoded (which increases the size of the data by
   * 33-36%) when using JSON on the wire.
   */
  icon?: Uint8Array;
  /**
   * Output only. The resource name of the listing. e.g.
   * `projects/myproject/locations/US/dataExchanges/123/listings/456`
   */
  readonly name?: string;
  /**
   * Optional. Email or URL of the primary point of contact of the listing. Max
   * Length: 1000 bytes.
   */
  primaryContact?: string;
  /**
   * Optional. Details of the publisher who owns the listing and who can share
   * the source data.
   */
  publisher?: Publisher;
  /**
   * Optional. Email or URL of the request access of the listing. Subscribers
   * can use this reference to request access. Max Length: 1000 bytes.
   */
  requestAccess?: string;
  /**
   * Optional. If set, restricted export configuration will be propagated and
   * enforced on the linked dataset.
   */
  restrictedExportConfig?: RestrictedExportConfig;
  /**
   * Output only. Current state of the listing.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE";
}

function serializeListing(data: any): Listing {
  return {
    ...data,
    icon: data["icon"] !== undefined ? encodeBase64(data["icon"]) : undefined,
  };
}

function deserializeListing(data: any): Listing {
  return {
    ...data,
    icon: data["icon"] !== undefined ? decodeBase64(data["icon"] as string) : undefined,
  };
}

/**
 * Message for response to the list of Listings.
 */
export interface ListListingsResponse {
  /**
   * The list of Listing.
   */
  listings?: Listing[];
  /**
   * A token to request the next page of results.
   */
  nextPageToken?: string;
}

function serializeListListingsResponse(data: any): ListListingsResponse {
  return {
    ...data,
    listings: data["listings"] !== undefined ? data["listings"].map((item: any) => (serializeListing(item))) : undefined,
  };
}

function deserializeListListingsResponse(data: any): ListListingsResponse {
  return {
    ...data,
    listings: data["listings"] !== undefined ? data["listings"].map((item: any) => (deserializeListing(item))) : undefined,
  };
}

/**
 * Message for response to listing data exchanges in an organization and
 * location.
 */
export interface ListOrgDataExchangesResponse {
  /**
   * The list of data exchanges.
   */
  dataExchanges?: DataExchange[];
  /**
   * A token to request the next page of results.
   */
  nextPageToken?: string;
}

function serializeListOrgDataExchangesResponse(data: any): ListOrgDataExchangesResponse {
  return {
    ...data,
    dataExchanges: data["dataExchanges"] !== undefined ? data["dataExchanges"].map((item: any) => (serializeDataExchange(item))) : undefined,
  };
}

function deserializeListOrgDataExchangesResponse(data: any): ListOrgDataExchangesResponse {
  return {
    ...data,
    dataExchanges: data["dataExchanges"] !== undefined ? data["dataExchanges"].map((item: any) => (deserializeDataExchange(item))) : undefined,
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
   * Output only. Identifies whether the user has requested cancellation of the
   * operation. Operations that have been cancelled successfully have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   */
  readonly cancelRequested?: boolean;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Human-readable status of the operation, if any.
   */
  readonly statusDetail?: string;
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
 * Additional options for AnalyticsHub#organizationsLocationsDataExchangesList.
 */
export interface OrganizationsLocationsDataExchangesListOptions {
  /**
   * The maximum number of results to return in a single response page.
   * Leverage the page tokens to iterate through the entire collection.
   */
  pageSize?: number;
  /**
   * Page token, returned by a previous call, to request the next page of
   * results.
   */
  pageToken?: string;
}

/**
 * An Identity and Access Management (IAM) policy, which specifies access
 * controls for Google Cloud resources. A `Policy` is a collection of
 * `bindings`. A `binding` binds one or more `members`, or principals, to a
 * single `role`. Principals can be user accounts, service accounts, Google
 * groups, and domains (such as G Suite). A `role` is a named list of
 * permissions; each `role` can be an IAM predefined role or a user-created
 * custom role. For some types of Google Cloud resources, a `binding` can also
 * specify a `condition`, which is a logical expression that allows access to a
 * resource only if the expression evaluates to `true`. A condition can add
 * constraints based on attributes of the request, the resource, or both. To
 * learn which resources support conditions in their IAM policies, see the [IAM
 * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
 * **JSON example:** { "bindings": [ { "role":
 * "roles/resourcemanager.organizationAdmin", "members": [
 * "user:mike@example.com", "group:admins@example.com", "domain:google.com",
 * "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role":
 * "roles/resourcemanager.organizationViewer", "members": [
 * "user:eve@example.com" ], "condition": { "title": "expirable access",
 * "description": "Does not grant access after Sep 2020", "expression":
 * "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } ], "etag":
 * "BwWWja0YfJA=", "version": 3 } **YAML example:** bindings: - members: -
 * user:mike@example.com - group:admins@example.com - domain:google.com -
 * serviceAccount:my-project-id@appspot.gserviceaccount.com role:
 * roles/resourcemanager.organizationAdmin - members: - user:eve@example.com
 * role: roles/resourcemanager.organizationViewer condition: title: expirable
 * access description: Does not grant access after Sep 2020 expression:
 * request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA=
 * version: 3 For a description of IAM and its features, see the [IAM
 * documentation](https://cloud.google.com/iam/docs/).
 */
export interface Policy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: AuditConfig[];
  /**
   * Associates a list of `members`, or principals, with a `role`. Optionally,
   * may specify a `condition` that determines how and when the `bindings` are
   * applied. Each of the `bindings` must contain at least one principal. The
   * `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of
   * these principals can be Google groups. Each occurrence of a principal
   * counts towards these limits. For example, if the `bindings` grant 50
   * different roles to `user:alice@example.com`, and not to any other
   * principal, then you can add another 1,450 principals to the `bindings` in
   * the `Policy`.
   */
  bindings?: Binding[];
  /**
   * `etag` is used for optimistic concurrency control as a way to help prevent
   * simultaneous updates of a policy from overwriting each other. It is
   * strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform policy updates in order to avoid race
   * conditions: An `etag` is returned in the response to `getIamPolicy`, and
   * systems are expected to put that etag in the request to `setIamPolicy` to
   * ensure that their change will be applied to the same version of the policy.
   * **Important:** If you use IAM Conditions, you must include the `etag` field
   * whenever you call `setIamPolicy`. If you omit this field, then IAM allows
   * you to overwrite a version `3` policy with a version `1` policy, and all of
   * the conditions in the version `3` policy are lost.
   */
  etag?: Uint8Array;
  /**
   * Specifies the format of the policy. Valid values are `0`, `1`, and `3`.
   * Requests that specify an invalid value are rejected. Any operation that
   * affects conditional role bindings must specify version `3`. This
   * requirement applies to the following operations: * Getting a policy that
   * includes a conditional role binding * Adding a conditional role binding to
   * a policy * Changing a conditional role binding in a policy * Removing any
   * role binding, with or without a condition, from a policy that includes
   * conditions **Important:** If you use IAM Conditions, you must include the
   * `etag` field whenever you call `setIamPolicy`. If you omit this field, then
   * IAM allows you to overwrite a version `3` policy with a version `1` policy,
   * and all of the conditions in the version `3` policy are lost. If a policy
   * does not include any conditions, operations on that policy may specify any
   * valid version or leave the field unset. To learn which resources support
   * conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
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
 * Additional options for AnalyticsHub#projectsLocationsDataExchangesCreate.
 */
export interface ProjectsLocationsDataExchangesCreateOptions {
  /**
   * Required. The ID of the data exchange. Must contain only Unicode letters,
   * numbers (0-9), underscores (_). Should not use characters that require
   * URL-escaping, or characters outside of ASCII, spaces. Max length: 100
   * bytes.
   */
  dataExchangeId?: string;
}

/**
 * Additional options for
 * AnalyticsHub#projectsLocationsDataExchangesListingsCreate.
 */
export interface ProjectsLocationsDataExchangesListingsCreateOptions {
  /**
   * Required. The ID of the listing to create. Must contain only Unicode
   * letters, numbers (0-9), underscores (_). Should not use characters that
   * require URL-escaping, or characters outside of ASCII, spaces. Max length:
   * 100 bytes.
   */
  listingId?: string;
}

/**
 * Additional options for
 * AnalyticsHub#projectsLocationsDataExchangesListingsList.
 */
export interface ProjectsLocationsDataExchangesListingsListOptions {
  /**
   * The maximum number of results to return in a single response page.
   * Leverage the page tokens to iterate through the entire collection.
   */
  pageSize?: number;
  /**
   * Page token, returned by a previous call, to request the next page of
   * results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AnalyticsHub#projectsLocationsDataExchangesListingsPatch.
 */
export interface ProjectsLocationsDataExchangesListingsPatchOptions {
  /**
   * Required. Field mask specifies the fields to update in the listing
   * resource. The fields specified in the `updateMask` are relative to the
   * resource and are not a full request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsDataExchangesListingsPatchOptions(data: any): ProjectsLocationsDataExchangesListingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDataExchangesListingsPatchOptions(data: any): ProjectsLocationsDataExchangesListingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AnalyticsHub#projectsLocationsDataExchangesList.
 */
export interface ProjectsLocationsDataExchangesListOptions {
  /**
   * The maximum number of results to return in a single response page.
   * Leverage the page tokens to iterate through the entire collection.
   */
  pageSize?: number;
  /**
   * Page token, returned by a previous call, to request the next page of
   * results.
   */
  pageToken?: string;
}

/**
 * Additional options for AnalyticsHub#projectsLocationsDataExchangesPatch.
 */
export interface ProjectsLocationsDataExchangesPatchOptions {
  /**
   * Required. Field mask specifies the fields to update in the data exchange
   * resource. The fields specified in the `updateMask` are relative to the
   * resource and are not a full request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsDataExchangesPatchOptions(data: any): ProjectsLocationsDataExchangesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDataExchangesPatchOptions(data: any): ProjectsLocationsDataExchangesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Contains details of the listing publisher.
 */
export interface Publisher {
  /**
   * Optional. Name of the listing publisher.
   */
  name?: string;
  /**
   * Optional. Email or URL of the listing publisher. Max Length: 1000 bytes.
   */
  primaryContact?: string;
}

/**
 * Restricted export config, used to configure restricted export on linked
 * dataset.
 */
export interface RestrictedExportConfig {
  /**
   * If true, enable restricted export.
   */
  enabled?: boolean;
  /**
   * If true, restrict direct table access(read api/tabledata.list) on linked
   * table.
   */
  restrictDirectTableAccess?: boolean;
  /**
   * If true, restrict export of query result derived from restricted linked
   * dataset table.
   */
  restrictQueryResult?: boolean;
}

/**
 * Request message for `SetIamPolicy` method.
 */
export interface SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: Policy;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify.
   * Only the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used: `paths: "bindings, etag"`
   */
  updateMask?: string /* FieldMask */;
}

function serializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Message for subscribing to a listing.
 */
export interface SubscribeListingRequest {
  /**
   * BigQuery destination dataset to create for the subscriber.
   */
  destinationDataset?: DestinationDataset;
}

/**
 * Message for response when you subscribe to a listing.
 */
export interface SubscribeListingResponse {
}

/**
 * Request message for `TestIamPermissions` method.
 */
export interface TestIamPermissionsRequest {
  /**
   * The set of permissions to check for the `resource`. Permissions with
   * wildcards (such as `*` or `storage.*`) are not allowed. For more
   * information see [IAM
   * Overview](https://cloud.google.com/iam/docs/overview#permissions).
   */
  permissions?: string[];
}

/**
 * Response message for `TestIamPermissions` method.
 */
export interface TestIamPermissionsResponse {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
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
