// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Identity and Access Management (IAM) API Client for Deno
 * ========================================================
 * 
 * Manages identity and access control for Google Cloud Platform resources, including the creation of service accounts, which you can use to authenticate to Google and make API calls. 
 * 
 * Docs: https://cloud.google.com/iam/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages identity and access control for Google Cloud Platform resources,
 * including the creation of service accounts, which you can use to authenticate
 * to Google and make API calls.
 */
export class iam {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://iam.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a policy.
   *
   * @param parent Required. The resource that the policy is attached to, along with the kind of policy to create. Format: `policies/{attachment_point}/denypolicies` The attachment point is identified by its URL-encoded full resource name, which means that the forward-slash character, `/`, must be written as `%2F`. For example, `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies`. For organizations and folders, use the numeric ID in the full resource name. For projects, you can use the alphanumeric or the numeric ID.
   */
  async policiesCreatePolicy(parent: string, req: GoogleIamV2Policy, opts: PoliciesCreatePolicyOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }`);
    if (opts.policyId !== undefined) {
      url.searchParams.append("policyId", String(opts.policyId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a policy. This action is permanent.
   *
   * @param name Required. The resource name of the policy to delete. Format: `policies/{attachment_point}/denypolicies/{policy_id}` Use the URL-encoded full resource name, which means that the forward-slash character, `/`, must be written as `%2F`. For example, `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies/my-policy`. For organizations and folders, use the numeric ID in the full resource name. For projects, you can use the alphanumeric or the numeric ID.
   */
  async policiesDelete(name: string, opts: PoliciesDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets a policy.
   *
   * @param name Required. The resource name of the policy to retrieve. Format: `policies/{attachment_point}/denypolicies/{policy_id}` Use the URL-encoded full resource name, which means that the forward-slash character, `/`, must be written as `%2F`. For example, `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies/my-policy`. For organizations and folders, use the numeric ID in the full resource name. For projects, you can use the alphanumeric or the numeric ID.
   */
  async policiesGet(name: string): Promise<GoogleIamV2Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleIamV2Policy;
  }

  /**
   * Retrieves the policies of the specified kind that are attached to a
   * resource. The response lists only policy metadata. In particular, policy
   * rules are omitted.
   *
   * @param parent Required. The resource that the policy is attached to, along with the kind of policy to list. Format: `policies/{attachment_point}/denypolicies` The attachment point is identified by its URL-encoded full resource name, which means that the forward-slash character, `/`, must be written as `%2F`. For example, `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies`. For organizations and folders, use the numeric ID in the full resource name. For projects, you can use the alphanumeric or the numeric ID.
   */
  async policiesListPolicies(parent: string, opts: PoliciesListPoliciesOptions = {}): Promise<GoogleIamV2ListPoliciesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }`);
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
    return data as GoogleIamV2ListPoliciesResponse;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async policiesOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Updates the specified policy. You can update only the rules and the
   * display name for the policy. To update a policy, you should use a
   * read-modify-write loop: 1. Use GetPolicy to read the current version of the
   * policy. 2. Modify the policy as needed. 3. Use `UpdatePolicy` to write the
   * updated policy. This pattern helps prevent conflicts between concurrent
   * updates.
   *
   * @param name Immutable. The resource name of the `Policy`, which must be unique. Format: `policies/{attachment_point}/denypolicies/{policy_id}` The attachment point is identified by its URL-encoded full resource name, which means that the forward-slash character, `/`, must be written as `%2F`. For example, `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies/my-deny-policy`. For organizations and folders, use the numeric ID in the full resource name. For projects, requests can use the alphanumeric or the numeric ID. Responses always contain the numeric ID.
   */
  async policiesUpdate(name: string, req: GoogleIamV2Policy): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as GoogleLongrunningOperation;
  }
}

/**
 * Audit log information specific to Cloud IAM admin APIs. This message is
 * serialized as an `Any` type in the `ServiceData` message of an `AuditLog`
 * message.
 */
export interface GoogleIamAdminV1AuditData {
  /**
   * The permission_delta when when creating or updating a Role.
   */
  permissionDelta?: GoogleIamAdminV1AuditDataPermissionDelta;
}

/**
 * A PermissionDelta message to record the added_permissions and
 * removed_permissions inside a role.
 */
export interface GoogleIamAdminV1AuditDataPermissionDelta {
  /**
   * Added permissions.
   */
  addedPermissions?: string[];
  /**
   * Removed permissions.
   */
  removedPermissions?: string[];
}

/**
 * Metadata for long-running WorkloadIdentityPool operations.
 */
export interface GoogleIamV1betaWorkloadIdentityPoolOperationMetadata {
}

/**
 * One delta entry for Binding. Each individual change (only one member in each
 * entry) to a binding will be a separate entry.
 */
export interface GoogleIamV1BindingDelta {
  /**
   * The action that was performed on a Binding. Required
   */
  action?:  | "ACTION_UNSPECIFIED" | "ADD" | "REMOVE";
  /**
   * The condition that is associated with this binding.
   */
  condition?: GoogleTypeExpr;
  /**
   * A single identity requesting access for a Google Cloud resource. Follows
   * the same format of Binding.members. Required
   */
  member?: string;
  /**
   * Role that is assigned to `members`. For example, `roles/viewer`,
   * `roles/editor`, or `roles/owner`. Required
   */
  role?: string;
}

/**
 * Audit log information specific to Cloud IAM. This message is serialized as
 * an `Any` type in the `ServiceData` message of an `AuditLog` message.
 */
export interface GoogleIamV1LoggingAuditData {
  /**
   * Policy delta between the original policy and the newly set policy.
   */
  policyDelta?: GoogleIamV1PolicyDelta;
}

/**
 * The difference delta between two policies.
 */
export interface GoogleIamV1PolicyDelta {
  /**
   * The delta for Bindings between two policies.
   */
  bindingDeltas?: GoogleIamV1BindingDelta[];
}

/**
 * A deny rule in an IAM deny policy.
 */
export interface GoogleIamV2DenyRule {
  /**
   * The condition that determines whether this deny rule applies to a request.
   * If the condition expression evaluates to `true`, then the deny rule is
   * applied; otherwise, the deny rule is not applied. Each deny rule is
   * evaluated independently. If this deny rule does not apply to a request,
   * other deny rules might still apply. The condition can use CEL functions
   * that evaluate [resource
   * tags](https://cloud.google.com/iam/help/conditions/resource-tags). Other
   * functions and operators are not supported.
   */
  denialCondition?: GoogleTypeExpr;
  /**
   * The permissions that are explicitly denied by this rule. Each permission
   * uses the format `{service_fqdn}/{resource}.{verb}`, where `{service_fqdn}`
   * is the fully qualified domain name for the service. For example,
   * `iam.googleapis.com/roles.list`.
   */
  deniedPermissions?: string[];
  /**
   * The identities that are prevented from using one or more permissions on
   * Google Cloud resources. This field can contain the following values: *
   * `principalSet://goog/public:all`: A special identifier that represents any
   * principal that is on the internet, even if they do not have a Google
   * Account or are not logged in. * `principal://goog/subject/{email_id}`: A
   * specific Google Account. Includes Gmail, Cloud Identity, and Google
   * Workspace user accounts. For example,
   * `principal://goog/subject/alice@example.com`. *
   * `deleted:principal://goog/subject/{email_id}?uid={uid}`: A specific Google
   * Account that was deleted recently. For example,
   * `deleted:principal://goog/subject/alice@example.com?uid=1234567890`. If the
   * Google Account is recovered, this identifier reverts to the standard
   * identifier for a Google Account. * `principalSet://goog/group/{group_id}`:
   * A Google group. For example,
   * `principalSet://goog/group/admins@example.com`. *
   * `deleted:principalSet://goog/group/{group_id}?uid={uid}`: A Google group
   * that was deleted recently. For example,
   * `deleted:principalSet://goog/group/admins@example.com?uid=1234567890`. If
   * the Google group is restored, this identifier reverts to the standard
   * identifier for a Google group. *
   * `principal://iam.googleapis.com/projects/-/serviceAccounts/{service_account_id}`:
   * A Google Cloud service account. For example,
   * `principal://iam.googleapis.com/projects/-/serviceAccounts/my-service-account@iam.gserviceaccount.com`.
   * *
   * `deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/{service_account_id}?uid={uid}`:
   * A Google Cloud service account that was deleted recently. For example,
   * `deleted:principal://iam.googleapis.com/projects/-/serviceAccounts/my-service-account@iam.gserviceaccount.com?uid=1234567890`.
   * If the service account is undeleted, this identifier reverts to the
   * standard identifier for a service account. *
   * `principalSet://goog/cloudIdentityCustomerId/{customer_id}`: All of the
   * principals associated with the specified Google Workspace or Cloud Identity
   * customer ID. For example,
   * `principalSet://goog/cloudIdentityCustomerId/C01Abc35`.
   */
  deniedPrincipals?: string[];
  /**
   * Specifies the permissions that this rule excludes from the set of denied
   * permissions given by `denied_permissions`. If a permission appears in
   * `denied_permissions` _and_ in `exception_permissions` then it will _not_ be
   * denied. The excluded permissions can be specified using the same syntax as
   * `denied_permissions`.
   */
  exceptionPermissions?: string[];
  /**
   * The identities that are excluded from the deny rule, even if they are
   * listed in the `denied_principals`. For example, you could add a Google
   * group to the `denied_principals`, then exclude specific users who belong to
   * that group. This field can contain the same values as the
   * `denied_principals` field, excluding `principalSet://goog/public:all`,
   * which represents all users on the internet.
   */
  exceptionPrincipals?: string[];
}

/**
 * Response message for `ListPolicies`.
 */
export interface GoogleIamV2ListPoliciesResponse {
  /**
   * A page token that you can use in a ListPoliciesRequest to retrieve the
   * next page. If this field is omitted, there are no additional pages.
   */
  nextPageToken?: string;
  /**
   * Metadata for the policies that are attached to the resource.
   */
  policies?: GoogleIamV2Policy[];
}

/**
 * Data for an IAM policy.
 */
export interface GoogleIamV2Policy {
  /**
   * A key-value map to store arbitrary metadata for the `Policy`. Keys can be
   * up to 63 characters. Values can be up to 255 characters.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. The time when the `Policy` was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time when the `Policy` was deleted. Empty if the policy
   * is not deleted.
   */
  readonly deleteTime?: Date;
  /**
   * A user-specified description of the `Policy`. This value can be up to 63
   * characters.
   */
  displayName?: string;
  /**
   * An opaque tag that identifies the current version of the `Policy`. IAM
   * uses this value to help manage concurrent updates, so they do not cause one
   * update to be overwritten by another. If this field is present in a
   * CreatePolicy request, the value is ignored.
   */
  etag?: string;
  /**
   * Output only. The kind of the `Policy`. Always contains the value
   * `DenyPolicy`.
   */
  readonly kind?: string;
  /**
   * Immutable. The resource name of the `Policy`, which must be unique.
   * Format: `policies/{attachment_point}/denypolicies/{policy_id}` The
   * attachment point is identified by its URL-encoded full resource name, which
   * means that the forward-slash character, `/`, must be written as `%2F`. For
   * example,
   * `policies/cloudresourcemanager.googleapis.com%2Fprojects%2Fmy-project/denypolicies/my-deny-policy`.
   * For organizations and folders, use the numeric ID in the full resource
   * name. For projects, requests can use the alphanumeric or the numeric ID.
   * Responses always contain the numeric ID.
   */
  name?: string;
  /**
   * A list of rules that specify the behavior of the `Policy`. All of the
   * rules should be of the `kind` specified in the `Policy`.
   */
  rules?: GoogleIamV2PolicyRule[];
  /**
   * Immutable. The globally unique ID of the `Policy`. Assigned automatically
   * when the `Policy` is created.
   */
  uid?: string;
  /**
   * Output only. The time when the `Policy` was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * Metadata for long-running `Policy` operations.
 */
export interface GoogleIamV2PolicyOperationMetadata {
  /**
   * Timestamp when the `google.longrunning.Operation` was created.
   */
  createTime?: Date;
}

function serializeGoogleIamV2PolicyOperationMetadata(data: any): GoogleIamV2PolicyOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleIamV2PolicyOperationMetadata(data: any): GoogleIamV2PolicyOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * A single rule in a `Policy`.
 */
export interface GoogleIamV2PolicyRule {
  /**
   * A rule for a deny policy.
   */
  denyRule?: GoogleIamV2DenyRule;
  /**
   * A user-specified description of the rule. This value can be up to 256
   * characters.
   */
  description?: string;
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface GoogleLongrunningOperation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: GoogleRpcStatus;
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
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
 */
export interface GoogleRpcStatus {
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
export interface GoogleTypeExpr {
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
 * Additional options for iam#policiesCreatePolicy.
 */
export interface PoliciesCreatePolicyOptions {
  /**
   * The ID to use for this policy, which will become the final component of
   * the policy's resource name. The ID must contain 3 to 63 characters. It can
   * contain lowercase letters and numbers, as well as dashes (`-`) and periods
   * (`.`). The first character must be a lowercase letter.
   */
  policyId?: string;
}

/**
 * Additional options for iam#policiesDelete.
 */
export interface PoliciesDeleteOptions {
  /**
   * Optional. The expected `etag` of the policy to delete. If the value does
   * not match the value that is stored in IAM, the request fails with a `409`
   * error code and `ABORTED` status. If you omit this field, the policy is
   * deleted regardless of its current `etag`.
   */
  etag?: string;
}

/**
 * Additional options for iam#policiesListPolicies.
 */
export interface PoliciesListPoliciesOptions {
  /**
   * The maximum number of policies to return. IAM ignores this value and uses
   * the value 1000.
   */
  pageSize?: number;
  /**
   * A page token received in a ListPoliciesResponse. Provide this token to
   * retrieve the next page.
   */
  pageToken?: string;
}