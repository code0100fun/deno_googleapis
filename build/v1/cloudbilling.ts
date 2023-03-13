// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Billing API Client for Deno
 * =================================
 * 
 * Allows developers to manage billing for their Google Cloud Platform projects programmatically.
 * 
 * Docs: https://cloud.google.com/billing/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Allows developers to manage billing for their Google Cloud Platform projects
 * programmatically.
 */
export class CloudBilling {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudbilling.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * This method creates [billing
   * subaccounts](https://cloud.google.com/billing/docs/concepts#subaccounts).
   * Google Cloud resellers should use the Channel Services APIs,
   * [accounts.customers.create](https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers/create)
   * and
   * [accounts.customers.entitlements.create](https://cloud.google.com/channel/docs/reference/rest/v1/accounts.customers.entitlements/create).
   * When creating a subaccount, the current authenticated user must have the
   * `billing.accounts.update` IAM permission on the parent account, which is
   * typically given to billing account
   * [administrators](https://cloud.google.com/billing/docs/how-to/billing-access).
   * This method will return an error if the parent account has not been
   * provisioned as a reseller account.
   *
   */
  async billingAccountsCreate(req: BillingAccount): Promise<BillingAccount> {
    const url = new URL(`${this.#baseUrl}v1/billingAccounts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BillingAccount;
  }

  /**
   * Gets information about a billing account. The current authenticated user
   * must be a [viewer of the billing
   * account](https://cloud.google.com/billing/docs/how-to/billing-access).
   *
   * @param name Required. The resource name of the billing account to retrieve. For example, `billingAccounts/012345-567890-ABCDEF`.
   */
  async billingAccountsGet(name: string): Promise<BillingAccount> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as BillingAccount;
  }

  /**
   * Gets the access control policy for a billing account. The caller must have
   * the `billing.accounts.getIamPolicy` permission on the account, which is
   * often given to billing account
   * [viewers](https://cloud.google.com/billing/docs/how-to/billing-access).
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async billingAccountsGetIamPolicy(resource: string, opts: BillingAccountsGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Lists the billing accounts that the current authenticated user has
   * permission to
   * [view](https://cloud.google.com/billing/docs/how-to/billing-access).
   *
   */
  async billingAccountsList(opts: BillingAccountsListOptions = {}): Promise<ListBillingAccountsResponse> {
    const url = new URL(`${this.#baseUrl}v1/billingAccounts`);
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
    return data as ListBillingAccountsResponse;
  }

  /**
   * Updates a billing account's fields. Currently the only field that can be
   * edited is `display_name`. The current authenticated user must have the
   * `billing.accounts.update` IAM permission, which is typically given to the
   * [administrator](https://cloud.google.com/billing/docs/how-to/billing-access)
   * of the billing account.
   *
   * @param name Required. The name of the billing account resource to be updated.
   */
  async billingAccountsPatch(name: string, req: BillingAccount, opts: BillingAccountsPatchOptions = {}): Promise<BillingAccount> {
    opts = serializeBillingAccountsPatchOptions(opts);
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
    return data as BillingAccount;
  }

  /**
   * Lists the projects associated with a billing account. The current
   * authenticated user must have the `billing.resourceAssociations.list` IAM
   * permission, which is often given to billing account
   * [viewers](https://cloud.google.com/billing/docs/how-to/billing-access).
   *
   * @param name Required. The resource name of the billing account associated with the projects that you want to list. For example, `billingAccounts/012345-567890-ABCDEF`.
   */
  async billingAccountsProjectsList(name: string, opts: BillingAccountsProjectsListOptions = {}): Promise<ListProjectBillingInfoResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/projects`);
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
    return data as ListProjectBillingInfoResponse;
  }

  /**
   * Sets the access control policy for a billing account. Replaces any
   * existing policy. The caller must have the `billing.accounts.setIamPolicy`
   * permission on the account, which is often given to billing account
   * [administrators](https://cloud.google.com/billing/docs/how-to/billing-access).
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async billingAccountsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Tests the access control policy for a billing account. This method takes
   * the resource and a set of permissions as input and returns the subset of
   * the input permissions that the caller is allowed for that resource.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async billingAccountsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Gets the billing information for a project. The current authenticated user
   * must have the `resourcemanager.projects.get` permission for the project,
   * which can be granted by assigning the [Project
   * Viewer](https://cloud.google.com/iam/docs/understanding-roles#predefined_roles)
   * role.
   *
   * @param name Required. The resource name of the project for which billing information is retrieved. For example, `projects/tokyo-rain-123`.
   */
  async projectsGetBillingInfo(name: string): Promise<ProjectBillingInfo> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/billingInfo`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ProjectBillingInfo;
  }

  /**
   * Sets or updates the billing account associated with a project. You specify
   * the new billing account by setting the `billing_account_name` in the
   * `ProjectBillingInfo` resource to the resource name of a billing account.
   * Associating a project with an open billing account enables billing on the
   * project and allows charges for resource usage. If the project already had a
   * billing account, this method changes the billing account used for resource
   * usage charges. *Note:* Incurred charges that have not yet been reported in
   * the transaction history of the Google Cloud Console might be billed to the
   * new billing account, even if the charge occurred before the new billing
   * account was assigned to the project. The current authenticated user must
   * have ownership privileges for both the
   * [project](https://cloud.google.com/docs/permissions-overview#h.bgs0oxofvnoo
   * ) and the [billing
   * account](https://cloud.google.com/billing/docs/how-to/billing-access). You
   * can disable billing on the project by setting the `billing_account_name`
   * field to empty. This action disassociates the current billing account from
   * the project. Any billable activity of your in-use services will stop, and
   * your application could stop functioning as expected. Any unbilled charges
   * to date will be billed to the previously associated account. The current
   * authenticated user must be either an owner of the project or an owner of
   * the billing account for the project. Note that associating a project with a
   * *closed* billing account will have much the same effect as disabling
   * billing on the project: any paid resources used by the project will be shut
   * down. Thus, unless you wish to disable billing, you should always call this
   * method with the name of an *open* billing account.
   *
   * @param name Required. The resource name of the project associated with the billing information that you want to update. For example, `projects/tokyo-rain-123`.
   */
  async projectsUpdateBillingInfo(name: string, req: ProjectBillingInfo): Promise<ProjectBillingInfo> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/billingInfo`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as ProjectBillingInfo;
  }

  /**
   * Lists all public cloud services.
   *
   */
  async servicesList(opts: ServicesListOptions = {}): Promise<ListServicesResponse> {
    const url = new URL(`${this.#baseUrl}v1/services`);
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
    return data as ListServicesResponse;
  }

  /**
   * Lists all publicly available SKUs for a given cloud service.
   *
   * @param parent Required. The name of the service. Example: "services/DA34-426B-A397"
   */
  async servicesSkusList(parent: string, opts: ServicesSkusListOptions = {}): Promise<ListSkusResponse> {
    opts = serializeServicesSkusListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/skus`);
    if (opts.currencyCode !== undefined) {
      url.searchParams.append("currencyCode", String(opts.currencyCode));
    }
    if (opts.endTime !== undefined) {
      url.searchParams.append("endTime", String(opts.endTime));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListSkusResponse(data);
  }
}

/**
 * Represents the aggregation level and interval for pricing of a single SKU.
 */
export interface AggregationInfo {
  /**
   * The number of intervals to aggregate over. Example: If aggregation_level
   * is "DAILY" and aggregation_count is 14, aggregation will be over 14 days.
   */
  aggregationCount?: number;
  aggregationInterval?:  | "AGGREGATION_INTERVAL_UNSPECIFIED" | "DAILY" | "MONTHLY";
  aggregationLevel?:  | "AGGREGATION_LEVEL_UNSPECIFIED" | "ACCOUNT" | "PROJECT";
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
 * A billing account in the [Google Cloud
 * Console](https://console.cloud.google.com/). You can assign a billing account
 * to one or more projects.
 */
export interface BillingAccount {
  /**
   * The display name given to the billing account, such as `My Billing
   * Account`. This name is displayed in the Google Cloud Console.
   */
  displayName?: string;
  /**
   * If this account is a
   * [subaccount](https://cloud.google.com/billing/docs/concepts), then this
   * will be the resource name of the parent billing account that it is being
   * resold through. Otherwise this will be empty.
   */
  masterBillingAccount?: string;
  /**
   * Output only. The resource name of the billing account. The resource name
   * has the form `billingAccounts/{billing_account_id}`. For example,
   * `billingAccounts/012345-567890-ABCDEF` would be the resource name for
   * billing account `012345-567890-ABCDEF`.
   */
  readonly name?: string;
  /**
   * Output only. True if the billing account is open, and will therefore be
   * charged for any usage on associated projects. False if the billing account
   * is closed, and therefore projects associated with it will be unable to use
   * paid services.
   */
  readonly open?: boolean;
}

/**
 * Additional options for CloudBilling#billingAccountsGetIamPolicy.
 */
export interface BillingAccountsGetIamPolicyOptions {
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
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for CloudBilling#billingAccountsList.
 */
export interface BillingAccountsListOptions {
  /**
   * Options for how to filter the returned billing accounts. Currently this
   * only supports filtering for
   * [subaccounts](https://cloud.google.com/billing/docs/concepts) under a
   * single provided reseller billing account. (e.g.
   * "master_billing_account=billingAccounts/012345-678901-ABCDEF"). Boolean
   * algebra and other fields are not currently supported.
   */
  filter?: string;
  /**
   * Requested page size. The maximum page size is 100; this is also the
   * default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results to return. This should be a
   * `next_page_token` value returned from a previous `ListBillingAccounts`
   * call. If unspecified, the first page of results is returned.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudBilling#billingAccountsPatch.
 */
export interface BillingAccountsPatchOptions {
  /**
   * The update mask applied to the resource. Only "display_name" is currently
   * supported.
   */
  updateMask?: string /* FieldMask */;
}

function serializeBillingAccountsPatchOptions(data: any): BillingAccountsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBillingAccountsPatchOptions(data: any): BillingAccountsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudBilling#billingAccountsProjectsList.
 */
export interface BillingAccountsProjectsListOptions {
  /**
   * Requested page size. The maximum page size is 100; this is also the
   * default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results to be returned. This should be a
   * `next_page_token` value returned from a previous `ListProjectBillingInfo`
   * call. If unspecified, the first page of results is returned.
   */
  pageToken?: string;
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
 * Represents the category hierarchy of a SKU.
 */
export interface Category {
  /**
   * The type of product the SKU refers to. Example: "Compute", "Storage",
   * "Network", "ApplicationServices" etc.
   */
  resourceFamily?: string;
  /**
   * A group classification for related SKUs. Example: "RAM", "GPU",
   * "Prediction", "Ops", "GoogleEgress" etc.
   */
  resourceGroup?: string;
  /**
   * The display name of the service this SKU belongs to.
   */
  serviceDisplayName?: string;
  /**
   * Represents how the SKU is consumed. Example: "OnDemand", "Preemptible",
   * "Commit1Mo", "Commit1Yr" etc.
   */
  usageType?: string;
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
 * Encapsulates the geographic taxonomy data for a sku.
 */
export interface GeoTaxonomy {
  /**
   * The list of regions associated with a sku. Empty for Global skus, which
   * are associated with all Google Cloud regions.
   */
  regions?: string[];
  /**
   * The type of Geo Taxonomy: GLOBAL, REGIONAL, or MULTI_REGIONAL.
   */
  type?:  | "TYPE_UNSPECIFIED" | "GLOBAL" | "REGIONAL" | "MULTI_REGIONAL";
}

/**
 * Response message for `ListBillingAccounts`.
 */
export interface ListBillingAccountsResponse {
  /**
   * A list of billing accounts.
   */
  billingAccounts?: BillingAccount[];
  /**
   * A token to retrieve the next page of results. To retrieve the next page,
   * call `ListBillingAccounts` again with the `page_token` field set to this
   * value. This field is empty if there are no more results to retrieve.
   */
  nextPageToken?: string;
}

/**
 * Request message for `ListProjectBillingInfoResponse`.
 */
export interface ListProjectBillingInfoResponse {
  /**
   * A token to retrieve the next page of results. To retrieve the next page,
   * call `ListProjectBillingInfo` again with the `page_token` field set to this
   * value. This field is empty if there are no more results to retrieve.
   */
  nextPageToken?: string;
  /**
   * A list of `ProjectBillingInfo` resources representing the projects
   * associated with the billing account.
   */
  projectBillingInfo?: ProjectBillingInfo[];
}

/**
 * Response message for `ListServices`.
 */
export interface ListServicesResponse {
  /**
   * A token to retrieve the next page of results. To retrieve the next page,
   * call `ListServices` again with the `page_token` field set to this value.
   * This field is empty if there are no more results to retrieve.
   */
  nextPageToken?: string;
  /**
   * A list of services.
   */
  services?: Service[];
}

/**
 * Response message for `ListSkus`.
 */
export interface ListSkusResponse {
  /**
   * A token to retrieve the next page of results. To retrieve the next page,
   * call `ListSkus` again with the `page_token` field set to this value. This
   * field is empty if there are no more results to retrieve.
   */
  nextPageToken?: string;
  /**
   * The list of public SKUs of the given service.
   */
  skus?: Sku[];
}

function serializeListSkusResponse(data: any): ListSkusResponse {
  return {
    ...data,
    skus: data["skus"] !== undefined ? data["skus"].map((item: any) => (serializeSku(item))) : undefined,
  };
}

function deserializeListSkusResponse(data: any): ListSkusResponse {
  return {
    ...data,
    skus: data["skus"] !== undefined ? data["skus"].map((item: any) => (deserializeSku(item))) : undefined,
  };
}

/**
 * Represents an amount of money with its currency type.
 */
export interface Money {
  /**
   * The three-letter currency code defined in ISO 4217.
   */
  currencyCode?: string;
  /**
   * Number of nano (10^-9) units of the amount. The value must be between
   * -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos`
   * must be positive or zero. If `units` is zero, `nanos` can be positive,
   * zero, or negative. If `units` is negative, `nanos` must be negative or
   * zero. For example $-1.75 is represented as `units`=-1 and
   * `nanos`=-750,000,000.
   */
  nanos?: number;
  /**
   * The whole units of the amount. For example if `currencyCode` is `"USD"`,
   * then 1 unit is one US dollar.
   */
  units?: bigint;
}

function serializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? String(data["units"]) : undefined,
  };
}

function deserializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? BigInt(data["units"]) : undefined,
  };
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
 * Expresses a mathematical pricing formula. For Example:- `usage_unit: GBy`
 * `tiered_rates:` `[start_usage_amount: 20, unit_price: $10]`
 * `[start_usage_amount: 100, unit_price: $5]` The above expresses a pricing
 * formula where the first 20GB is free, the next 80GB is priced at $10 per GB
 * followed by $5 per GB for additional usage.
 */
export interface PricingExpression {
  /**
   * The base unit for the SKU which is the unit used in usage exports.
   * Example: "By"
   */
  baseUnit?: string;
  /**
   * Conversion factor for converting from price per usage_unit to price per
   * base_unit, and start_usage_amount to start_usage_amount in base_unit.
   * unit_price / base_unit_conversion_factor = price per base_unit.
   * start_usage_amount * base_unit_conversion_factor = start_usage_amount in
   * base_unit.
   */
  baseUnitConversionFactor?: number;
  /**
   * The base unit in human readable form. Example: "byte".
   */
  baseUnitDescription?: string;
  /**
   * The recommended quantity of units for displaying pricing info. When
   * displaying pricing info it is recommended to display: (unit_price *
   * display_quantity) per display_quantity usage_unit. This field does not
   * affect the pricing formula and is for display purposes only. Example: If
   * the unit_price is "0.0001 USD", the usage_unit is "GB" and the
   * display_quantity is "1000" then the recommended way of displaying the
   * pricing info is "0.10 USD per 1000 GB"
   */
  displayQuantity?: number;
  /**
   * The list of tiered rates for this pricing. The total cost is computed by
   * applying each of the tiered rates on usage. This repeated list is sorted by
   * ascending order of start_usage_amount.
   */
  tieredRates?: TierRate[];
  /**
   * The short hand for unit of usage this pricing is specified in. Example:
   * usage_unit of "GiBy" means that usage is specified in "Gibi Byte".
   */
  usageUnit?: string;
  /**
   * The unit of usage in human readable form. Example: "gibi byte".
   */
  usageUnitDescription?: string;
}

function serializePricingExpression(data: any): PricingExpression {
  return {
    ...data,
    tieredRates: data["tieredRates"] !== undefined ? data["tieredRates"].map((item: any) => (serializeTierRate(item))) : undefined,
  };
}

function deserializePricingExpression(data: any): PricingExpression {
  return {
    ...data,
    tieredRates: data["tieredRates"] !== undefined ? data["tieredRates"].map((item: any) => (deserializeTierRate(item))) : undefined,
  };
}

/**
 * Represents the pricing information for a SKU at a single point of time.
 */
export interface PricingInfo {
  /**
   * Aggregation Info. This can be left unspecified if the pricing expression
   * doesn't require aggregation.
   */
  aggregationInfo?: AggregationInfo;
  /**
   * Conversion rate used for currency conversion, from USD to the currency
   * specified in the request. This includes any surcharge collected for billing
   * in non USD currency. If a currency is not specified in the request this
   * defaults to 1.0. Example: USD * currency_conversion_rate = JPY
   */
  currencyConversionRate?: number;
  /**
   * The timestamp from which this pricing was effective within the requested
   * time range. This is guaranteed to be greater than or equal to the
   * start_time field in the request and less than the end_time field in the
   * request. If a time range was not specified in the request this field will
   * be equivalent to a time within the last 12 hours, indicating the latest
   * pricing info.
   */
  effectiveTime?: Date;
  /**
   * Expresses the pricing formula. See `PricingExpression` for an example.
   */
  pricingExpression?: PricingExpression;
  /**
   * An optional human readable summary of the pricing information, has a
   * maximum length of 256 characters.
   */
  summary?: string;
}

function serializePricingInfo(data: any): PricingInfo {
  return {
    ...data,
    effectiveTime: data["effectiveTime"] !== undefined ? data["effectiveTime"].toISOString() : undefined,
    pricingExpression: data["pricingExpression"] !== undefined ? serializePricingExpression(data["pricingExpression"]) : undefined,
  };
}

function deserializePricingInfo(data: any): PricingInfo {
  return {
    ...data,
    effectiveTime: data["effectiveTime"] !== undefined ? new Date(data["effectiveTime"]) : undefined,
    pricingExpression: data["pricingExpression"] !== undefined ? deserializePricingExpression(data["pricingExpression"]) : undefined,
  };
}

/**
 * Encapsulation of billing information for a Google Cloud Console project. A
 * project has at most one associated billing account at a time (but a billing
 * account can be assigned to multiple projects).
 */
export interface ProjectBillingInfo {
  /**
   * The resource name of the billing account associated with the project, if
   * any. For example, `billingAccounts/012345-567890-ABCDEF`.
   */
  billingAccountName?: string;
  /**
   * True if the project is associated with an open billing account, to which
   * usage on the project is charged. False if the project is associated with a
   * closed billing account, or no billing account at all, and therefore cannot
   * use paid services. This field is read-only.
   */
  billingEnabled?: boolean;
  /**
   * The resource name for the `ProjectBillingInfo`; has the form
   * `projects/{project_id}/billingInfo`. For example, the resource name for the
   * billing information for project `tokyo-rain-123` would be
   * `projects/tokyo-rain-123/billingInfo`. This field is read-only.
   */
  name?: string;
  /**
   * The ID of the project that this `ProjectBillingInfo` represents, such as
   * `tokyo-rain-123`. This is a convenience field so that you don't need to
   * parse the `name` field to obtain a project ID. This field is read-only.
   */
  projectId?: string;
}

/**
 * Encapsulates a single service in Google Cloud Platform.
 */
export interface Service {
  /**
   * The business under which the service is offered. Ex.
   * "businessEntities/GCP", "businessEntities/Maps"
   */
  businessEntityName?: string;
  /**
   * A human readable display name for this service.
   */
  displayName?: string;
  /**
   * The resource name for the service. Example: "services/DA34-426B-A397"
   */
  name?: string;
  /**
   * The identifier for the service. Example: "DA34-426B-A397"
   */
  serviceId?: string;
}

/**
 * Additional options for CloudBilling#servicesList.
 */
export interface ServicesListOptions {
  /**
   * Requested page size. Defaults to 5000.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results to return. This should be a
   * `next_page_token` value returned from a previous `ListServices` call. If
   * unspecified, the first page of results is returned.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudBilling#servicesSkusList.
 */
export interface ServicesSkusListOptions {
  /**
   * The ISO 4217 currency code for the pricing info in the response proto.
   * Will use the conversion rate as of start_time. Optional. If not specified
   * USD will be used.
   */
  currencyCode?: string;
  /**
   * Optional exclusive end time of the time range for which the pricing
   * versions will be returned. Timestamps in the future are not allowed. The
   * time range has to be within a single calendar month in America/Los_Angeles
   * timezone. Time range as a whole is optional. If not specified, the latest
   * pricing will be returned (up to 12 hours old at most).
   */
  endTime?: Date;
  /**
   * Requested page size. Defaults to 5000.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results to return. This should be a
   * `next_page_token` value returned from a previous `ListSkus` call. If
   * unspecified, the first page of results is returned.
   */
  pageToken?: string;
  /**
   * Optional inclusive start time of the time range for which the pricing
   * versions will be returned. Timestamps in the future are not allowed. The
   * time range has to be within a single calendar month in America/Los_Angeles
   * timezone. Time range as a whole is optional. If not specified, the latest
   * pricing will be returned (up to 12 hours old at most).
   */
  startTime?: Date;
}

function serializeServicesSkusListOptions(data: any): ServicesSkusListOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeServicesSkusListOptions(data: any): ServicesSkusListOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
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
 * Encapsulates a single SKU in Google Cloud Platform
 */
export interface Sku {
  /**
   * The category hierarchy of this SKU, purely for organizational purpose.
   */
  category?: Category;
  /**
   * A human readable description of the SKU, has a maximum length of 256
   * characters.
   */
  description?: string;
  /**
   * The geographic taxonomy for this sku.
   */
  geoTaxonomy?: GeoTaxonomy;
  /**
   * The resource name for the SKU. Example:
   * "services/DA34-426B-A397/skus/AA95-CD31-42FE"
   */
  name?: string;
  /**
   * A timeline of pricing info for this SKU in chronological order.
   */
  pricingInfo?: PricingInfo[];
  /**
   * Identifies the service provider. This is 'Google' for first party services
   * in Google Cloud Platform.
   */
  serviceProviderName?: string;
  /**
   * List of service regions this SKU is offered at. Example: "asia-east1"
   * Service regions can be found at https://cloud.google.com/about/locations/
   */
  serviceRegions?: string[];
  /**
   * The identifier for the SKU. Example: "AA95-CD31-42FE"
   */
  skuId?: string;
}

function serializeSku(data: any): Sku {
  return {
    ...data,
    pricingInfo: data["pricingInfo"] !== undefined ? data["pricingInfo"].map((item: any) => (serializePricingInfo(item))) : undefined,
  };
}

function deserializeSku(data: any): Sku {
  return {
    ...data,
    pricingInfo: data["pricingInfo"] !== undefined ? data["pricingInfo"].map((item: any) => (deserializePricingInfo(item))) : undefined,
  };
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

/**
 * The price rate indicating starting usage and its corresponding price.
 */
export interface TierRate {
  /**
   * Usage is priced at this rate only after this amount. Example:
   * start_usage_amount of 10 indicates that the usage will be priced at the
   * unit_price after the first 10 usage_units.
   */
  startUsageAmount?: number;
  /**
   * The price per unit of usage. Example: unit_price of amount $10 indicates
   * that each unit will cost $10.
   */
  unitPrice?: Money;
}

function serializeTierRate(data: any): TierRate {
  return {
    ...data,
    unitPrice: data["unitPrice"] !== undefined ? serializeMoney(data["unitPrice"]) : undefined,
  };
}

function deserializeTierRate(data: any): TierRate {
  return {
    ...data,
    unitPrice: data["unitPrice"] !== undefined ? deserializeMoney(data["unitPrice"]) : undefined,
  };
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
