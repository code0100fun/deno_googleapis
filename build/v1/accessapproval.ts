// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Access Approval API Client for Deno
 * ===================================
 * 
 * An API for controlling access to data by Google personnel.
 * 
 * Docs: https://cloud.google.com/cloud-provider-access-management/access-approval/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * An API for controlling access to data by Google personnel.
 */
export class AccessApproval {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://accessapproval.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Approves a request and returns the updated ApprovalRequest. Returns
   * NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the
   * request exists but is not in a pending state.
   *
   * @param name Name of the approval request to approve.
   */
  async foldersApprovalRequestsApprove(name: string, req: ApproveApprovalRequestMessage): Promise<ApprovalRequest> {
    req = serializeApproveApprovalRequestMessage(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:approve`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApprovalRequest(data);
  }

  /**
   * Dismisses a request. Returns the updated ApprovalRequest. NOTE: This does
   * not deny access to the resource if another request has been made and
   * approved. It is equivalent in effect to ignoring the request altogether.
   * Returns NOT_FOUND if the request does not exist. Returns
   * FAILED_PRECONDITION if the request exists but is not in a pending state.
   *
   * @param name Name of the ApprovalRequest to dismiss.
   */
  async foldersApprovalRequestsDismiss(name: string, req: DismissApprovalRequestMessage): Promise<ApprovalRequest> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:dismiss`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApprovalRequest(data);
  }

  /**
   * Gets an approval request. Returns NOT_FOUND if the request does not exist.
   *
   * @param name The name of the approval request to retrieve. Format: "{projects|folders|organizations}/{id}/approvalRequests/{approval_request}"
   */
  async foldersApprovalRequestsGet(name: string): Promise<ApprovalRequest> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeApprovalRequest(data);
  }

  /**
   * Invalidates an existing ApprovalRequest. Returns the updated
   * ApprovalRequest. NOTE: This does not deny access to the resource if another
   * request has been made and approved. It only invalidates a single approval.
   * Returns FAILED_PRECONDITION if the request exists but is not in an approved
   * state.
   *
   * @param name Name of the ApprovalRequest to invalidate.
   */
  async foldersApprovalRequestsInvalidate(name: string, req: InvalidateApprovalRequestMessage): Promise<ApprovalRequest> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:invalidate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApprovalRequest(data);
  }

  /**
   * Lists approval requests associated with a project, folder, or
   * organization. Approval requests can be filtered by state (pending, active,
   * dismissed). The order is reverse chronological.
   *
   * @param parent The parent resource. This may be "projects/{project}", "folders/{folder}", or "organizations/{organization}".
   */
  async foldersApprovalRequestsList(parent: string, opts: FoldersApprovalRequestsListOptions = {}): Promise<ListApprovalRequestsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/approvalRequests`);
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
    return deserializeListApprovalRequestsResponse(data);
  }

  /**
   * Deletes the settings associated with a project, folder, or organization.
   * This will have the effect of disabling Access Approval for the project,
   * folder, or organization, but only if all ancestors also have Access
   * Approval disabled. If Access Approval is enabled at a higher level of the
   * hierarchy, then Access Approval will still be enabled at this level as the
   * settings are inherited.
   *
   * @param name Name of the AccessApprovalSettings to delete.
   */
  async foldersDeleteAccessApprovalSettings(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the settings associated with a project, folder, or organization.
   *
   * @param name The name of the AccessApprovalSettings to retrieve. Format: "{projects|folders|organizations}/{id}/accessApprovalSettings"
   */
  async foldersGetAccessApprovalSettings(name: string): Promise<AccessApprovalSettings> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AccessApprovalSettings;
  }

  /**
   * Retrieves the service account that is used by Access Approval to access
   * KMS keys for signing approved approval requests.
   *
   * @param name Name of the AccessApprovalServiceAccount to retrieve.
   */
  async foldersGetServiceAccount(name: string): Promise<AccessApprovalServiceAccount> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AccessApprovalServiceAccount;
  }

  /**
   * Updates the settings associated with a project, folder, or organization.
   * Settings to update are determined by the value of field_mask.
   *
   * @param name The resource name of the settings. Format is one of: * "projects/{project}/accessApprovalSettings" * "folders/{folder}/accessApprovalSettings" * "organizations/{organization}/accessApprovalSettings"
   */
  async foldersUpdateAccessApprovalSettings(name: string, req: AccessApprovalSettings, opts: FoldersUpdateAccessApprovalSettingsOptions = {}): Promise<AccessApprovalSettings> {
    opts = serializeFoldersUpdateAccessApprovalSettingsOptions(opts);
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
    return data as AccessApprovalSettings;
  }

  /**
   * Approves a request and returns the updated ApprovalRequest. Returns
   * NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the
   * request exists but is not in a pending state.
   *
   * @param name Name of the approval request to approve.
   */
  async organizationsApprovalRequestsApprove(name: string, req: ApproveApprovalRequestMessage): Promise<ApprovalRequest> {
    req = serializeApproveApprovalRequestMessage(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:approve`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApprovalRequest(data);
  }

  /**
   * Dismisses a request. Returns the updated ApprovalRequest. NOTE: This does
   * not deny access to the resource if another request has been made and
   * approved. It is equivalent in effect to ignoring the request altogether.
   * Returns NOT_FOUND if the request does not exist. Returns
   * FAILED_PRECONDITION if the request exists but is not in a pending state.
   *
   * @param name Name of the ApprovalRequest to dismiss.
   */
  async organizationsApprovalRequestsDismiss(name: string, req: DismissApprovalRequestMessage): Promise<ApprovalRequest> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:dismiss`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApprovalRequest(data);
  }

  /**
   * Gets an approval request. Returns NOT_FOUND if the request does not exist.
   *
   * @param name The name of the approval request to retrieve. Format: "{projects|folders|organizations}/{id}/approvalRequests/{approval_request}"
   */
  async organizationsApprovalRequestsGet(name: string): Promise<ApprovalRequest> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeApprovalRequest(data);
  }

  /**
   * Invalidates an existing ApprovalRequest. Returns the updated
   * ApprovalRequest. NOTE: This does not deny access to the resource if another
   * request has been made and approved. It only invalidates a single approval.
   * Returns FAILED_PRECONDITION if the request exists but is not in an approved
   * state.
   *
   * @param name Name of the ApprovalRequest to invalidate.
   */
  async organizationsApprovalRequestsInvalidate(name: string, req: InvalidateApprovalRequestMessage): Promise<ApprovalRequest> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:invalidate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApprovalRequest(data);
  }

  /**
   * Lists approval requests associated with a project, folder, or
   * organization. Approval requests can be filtered by state (pending, active,
   * dismissed). The order is reverse chronological.
   *
   * @param parent The parent resource. This may be "projects/{project}", "folders/{folder}", or "organizations/{organization}".
   */
  async organizationsApprovalRequestsList(parent: string, opts: OrganizationsApprovalRequestsListOptions = {}): Promise<ListApprovalRequestsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/approvalRequests`);
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
    return deserializeListApprovalRequestsResponse(data);
  }

  /**
   * Deletes the settings associated with a project, folder, or organization.
   * This will have the effect of disabling Access Approval for the project,
   * folder, or organization, but only if all ancestors also have Access
   * Approval disabled. If Access Approval is enabled at a higher level of the
   * hierarchy, then Access Approval will still be enabled at this level as the
   * settings are inherited.
   *
   * @param name Name of the AccessApprovalSettings to delete.
   */
  async organizationsDeleteAccessApprovalSettings(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the settings associated with a project, folder, or organization.
   *
   * @param name The name of the AccessApprovalSettings to retrieve. Format: "{projects|folders|organizations}/{id}/accessApprovalSettings"
   */
  async organizationsGetAccessApprovalSettings(name: string): Promise<AccessApprovalSettings> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AccessApprovalSettings;
  }

  /**
   * Retrieves the service account that is used by Access Approval to access
   * KMS keys for signing approved approval requests.
   *
   * @param name Name of the AccessApprovalServiceAccount to retrieve.
   */
  async organizationsGetServiceAccount(name: string): Promise<AccessApprovalServiceAccount> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AccessApprovalServiceAccount;
  }

  /**
   * Updates the settings associated with a project, folder, or organization.
   * Settings to update are determined by the value of field_mask.
   *
   * @param name The resource name of the settings. Format is one of: * "projects/{project}/accessApprovalSettings" * "folders/{folder}/accessApprovalSettings" * "organizations/{organization}/accessApprovalSettings"
   */
  async organizationsUpdateAccessApprovalSettings(name: string, req: AccessApprovalSettings, opts: OrganizationsUpdateAccessApprovalSettingsOptions = {}): Promise<AccessApprovalSettings> {
    opts = serializeOrganizationsUpdateAccessApprovalSettingsOptions(opts);
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
    return data as AccessApprovalSettings;
  }

  /**
   * Approves a request and returns the updated ApprovalRequest. Returns
   * NOT_FOUND if the request does not exist. Returns FAILED_PRECONDITION if the
   * request exists but is not in a pending state.
   *
   * @param name Name of the approval request to approve.
   */
  async projectsApprovalRequestsApprove(name: string, req: ApproveApprovalRequestMessage): Promise<ApprovalRequest> {
    req = serializeApproveApprovalRequestMessage(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:approve`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApprovalRequest(data);
  }

  /**
   * Dismisses a request. Returns the updated ApprovalRequest. NOTE: This does
   * not deny access to the resource if another request has been made and
   * approved. It is equivalent in effect to ignoring the request altogether.
   * Returns NOT_FOUND if the request does not exist. Returns
   * FAILED_PRECONDITION if the request exists but is not in a pending state.
   *
   * @param name Name of the ApprovalRequest to dismiss.
   */
  async projectsApprovalRequestsDismiss(name: string, req: DismissApprovalRequestMessage): Promise<ApprovalRequest> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:dismiss`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApprovalRequest(data);
  }

  /**
   * Gets an approval request. Returns NOT_FOUND if the request does not exist.
   *
   * @param name The name of the approval request to retrieve. Format: "{projects|folders|organizations}/{id}/approvalRequests/{approval_request}"
   */
  async projectsApprovalRequestsGet(name: string): Promise<ApprovalRequest> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeApprovalRequest(data);
  }

  /**
   * Invalidates an existing ApprovalRequest. Returns the updated
   * ApprovalRequest. NOTE: This does not deny access to the resource if another
   * request has been made and approved. It only invalidates a single approval.
   * Returns FAILED_PRECONDITION if the request exists but is not in an approved
   * state.
   *
   * @param name Name of the ApprovalRequest to invalidate.
   */
  async projectsApprovalRequestsInvalidate(name: string, req: InvalidateApprovalRequestMessage): Promise<ApprovalRequest> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:invalidate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApprovalRequest(data);
  }

  /**
   * Lists approval requests associated with a project, folder, or
   * organization. Approval requests can be filtered by state (pending, active,
   * dismissed). The order is reverse chronological.
   *
   * @param parent The parent resource. This may be "projects/{project}", "folders/{folder}", or "organizations/{organization}".
   */
  async projectsApprovalRequestsList(parent: string, opts: ProjectsApprovalRequestsListOptions = {}): Promise<ListApprovalRequestsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/approvalRequests`);
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
    return deserializeListApprovalRequestsResponse(data);
  }

  /**
   * Deletes the settings associated with a project, folder, or organization.
   * This will have the effect of disabling Access Approval for the project,
   * folder, or organization, but only if all ancestors also have Access
   * Approval disabled. If Access Approval is enabled at a higher level of the
   * hierarchy, then Access Approval will still be enabled at this level as the
   * settings are inherited.
   *
   * @param name Name of the AccessApprovalSettings to delete.
   */
  async projectsDeleteAccessApprovalSettings(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the settings associated with a project, folder, or organization.
   *
   * @param name The name of the AccessApprovalSettings to retrieve. Format: "{projects|folders|organizations}/{id}/accessApprovalSettings"
   */
  async projectsGetAccessApprovalSettings(name: string): Promise<AccessApprovalSettings> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AccessApprovalSettings;
  }

  /**
   * Retrieves the service account that is used by Access Approval to access
   * KMS keys for signing approved approval requests.
   *
   * @param name Name of the AccessApprovalServiceAccount to retrieve.
   */
  async projectsGetServiceAccount(name: string): Promise<AccessApprovalServiceAccount> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AccessApprovalServiceAccount;
  }

  /**
   * Updates the settings associated with a project, folder, or organization.
   * Settings to update are determined by the value of field_mask.
   *
   * @param name The resource name of the settings. Format is one of: * "projects/{project}/accessApprovalSettings" * "folders/{folder}/accessApprovalSettings" * "organizations/{organization}/accessApprovalSettings"
   */
  async projectsUpdateAccessApprovalSettings(name: string, req: AccessApprovalSettings, opts: ProjectsUpdateAccessApprovalSettingsOptions = {}): Promise<AccessApprovalSettings> {
    opts = serializeProjectsUpdateAccessApprovalSettingsOptions(opts);
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
    return data as AccessApprovalSettings;
  }
}

/**
 * Access Approval service account related to a project/folder/organization.
 */
export interface AccessApprovalServiceAccount {
  /**
   * Email address of the service account.
   */
  accountEmail?: string;
  /**
   * The resource name of the Access Approval service account. Format is one
   * of: * "projects/{project}/serviceAccount" *
   * "folders/{folder}/serviceAccount" *
   * "organizations/{organization}/serviceAccount"
   */
  name?: string;
}

/**
 * Settings on a Project/Folder/Organization related to Access Approval.
 */
export interface AccessApprovalSettings {
  /**
   * The asymmetric crypto key version to use for signing approval requests.
   * Empty active_key_version indicates that a Google-managed key should be used
   * for signing. This property will be ignored if set by an ancestor of this
   * resource, and new non-empty values may not be set.
   */
  activeKeyVersion?: string;
  /**
   * Output only. This field is read only (not settable via
   * UpdateAccessApprovalSettings method). If the field is true, that indicates
   * that an ancestor of this Project or Folder has set active_key_version (this
   * field will always be unset for the organization since organizations do not
   * have ancestors).
   */
  readonly ancestorHasActiveKeyVersion?: boolean;
  /**
   * Output only. This field is read only (not settable via
   * UpdateAccessApprovalSettings method). If the field is true, that indicates
   * that at least one service is enrolled for Access Approval in one or more
   * ancestors of the Project or Folder (this field will always be unset for the
   * organization since organizations do not have ancestors).
   */
  readonly enrolledAncestor?: boolean;
  /**
   * A list of Google Cloud Services for which the given resource has Access
   * Approval enrolled. Access requests for the resource given by name against
   * any of these services contained here will be required to have explicit
   * approval. If name refers to an organization, enrollment can be done for
   * individual services. If name refers to a folder or project, enrollment can
   * only be done on an all or nothing basis. If a cloud_product is repeated in
   * this list, the first entry will be honored and all following entries will
   * be discarded. A maximum of 10 enrolled services will be enforced, to be
   * expanded as the set of supported services is expanded.
   */
  enrolledServices?: EnrolledService[];
  /**
   * Output only. This field is read only (not settable via
   * UpdateAccessApprovalSettings method). If the field is true, that indicates
   * that there is some configuration issue with the active_key_version
   * configured at this level in the resource hierarchy (e.g. it doesn't exist
   * or the Access Approval service account doesn't have the correct permissions
   * on it, etc.) This key version is not necessarily the effective key version
   * at this level, as key versions are inherited top-down.
   */
  readonly invalidKeyVersion?: boolean;
  /**
   * The resource name of the settings. Format is one of: *
   * "projects/{project}/accessApprovalSettings" *
   * "folders/{folder}/accessApprovalSettings" *
   * "organizations/{organization}/accessApprovalSettings"
   */
  name?: string;
  /**
   * A list of email addresses to which notifications relating to approval
   * requests should be sent. Notifications relating to a resource will be sent
   * to all emails in the settings of ancestor resources of that resource. A
   * maximum of 50 email addresses are allowed.
   */
  notificationEmails?: string[];
}

/**
 * Home office and physical location of the principal.
 */
export interface AccessLocations {
  /**
   * The "home office" location of the principal. A two-letter country code
   * (ISO 3166-1 alpha-2), such as "US", "DE" or "GB" or a region code. In some
   * limited situations Google systems may refer refer to a region code instead
   * of a country code. Possible Region Codes: * ASI: Asia * EUR: Europe * OCE:
   * Oceania * AFR: Africa * NAM: North America * SAM: South America * ANT:
   * Antarctica * ANY: Any location
   */
  principalOfficeCountry?: string;
  /**
   * Physical location of the principal at the time of the access. A two-letter
   * country code (ISO 3166-1 alpha-2), such as "US", "DE" or "GB" or a region
   * code. In some limited situations Google systems may refer refer to a region
   * code instead of a country code. Possible Region Codes: * ASI: Asia * EUR:
   * Europe * OCE: Oceania * AFR: Africa * NAM: North America * SAM: South
   * America * ANT: Antarctica * ANY: Any location
   */
  principalPhysicalLocationCountry?: string;
}

export interface AccessReason {
  /**
   * More detail about certain reason types. See comments for each type above.
   */
  detail?: string;
  /**
   * Type of access justification.
   */
  type?:  | "TYPE_UNSPECIFIED" | "CUSTOMER_INITIATED_SUPPORT" | "GOOGLE_INITIATED_SERVICE" | "GOOGLE_INITIATED_REVIEW" | "THIRD_PARTY_DATA_REQUEST" | "GOOGLE_RESPONSE_TO_PRODUCTION_ALERT";
}

/**
 * A request for the customer to approve access to a resource.
 */
export interface ApprovalRequest {
  /**
   * Access was approved.
   */
  approve?: ApproveDecision;
  /**
   * The request was dismissed.
   */
  dismiss?: DismissDecision;
  /**
   * The resource name of the request. Format is
   * "{projects|folders|organizations}/{id}/approvalRequests/{approval_request}".
   */
  name?: string;
  /**
   * The requested expiration for the approval. If the request is approved,
   * access will be granted from the time of approval until the expiration time.
   */
  requestedExpiration?: Date;
  /**
   * The locations for which approval is being requested.
   */
  requestedLocations?: AccessLocations;
  /**
   * The justification for which approval is being requested.
   */
  requestedReason?: AccessReason;
  /**
   * The resource for which approval is being requested. The format of the
   * resource name is defined at
   * https://cloud.google.com/apis/design/resource_names. The resource name here
   * may either be a "full" resource name (e.g.
   * "//library.googleapis.com/shelves/shelf1/books/book2") or a "relative"
   * resource name (e.g. "shelves/shelf1/books/book2") as described in the
   * resource name specification.
   */
  requestedResourceName?: string;
  /**
   * Properties related to the resource represented by requested_resource_name.
   */
  requestedResourceProperties?: ResourceProperties;
  /**
   * The time at which approval was requested.
   */
  requestTime?: Date;
}

function serializeApprovalRequest(data: any): ApprovalRequest {
  return {
    ...data,
    approve: data["approve"] !== undefined ? serializeApproveDecision(data["approve"]) : undefined,
    dismiss: data["dismiss"] !== undefined ? serializeDismissDecision(data["dismiss"]) : undefined,
    requestedExpiration: data["requestedExpiration"] !== undefined ? data["requestedExpiration"].toISOString() : undefined,
    requestTime: data["requestTime"] !== undefined ? data["requestTime"].toISOString() : undefined,
  };
}

function deserializeApprovalRequest(data: any): ApprovalRequest {
  return {
    ...data,
    approve: data["approve"] !== undefined ? deserializeApproveDecision(data["approve"]) : undefined,
    dismiss: data["dismiss"] !== undefined ? deserializeDismissDecision(data["dismiss"]) : undefined,
    requestedExpiration: data["requestedExpiration"] !== undefined ? new Date(data["requestedExpiration"]) : undefined,
    requestTime: data["requestTime"] !== undefined ? new Date(data["requestTime"]) : undefined,
  };
}

/**
 * Request to approve an ApprovalRequest.
 */
export interface ApproveApprovalRequestMessage {
  /**
   * The expiration time of this approval.
   */
  expireTime?: Date;
}

function serializeApproveApprovalRequestMessage(data: any): ApproveApprovalRequestMessage {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
  };
}

function deserializeApproveApprovalRequestMessage(data: any): ApproveApprovalRequestMessage {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
  };
}

/**
 * A decision that has been made to approve access to a resource.
 */
export interface ApproveDecision {
  /**
   * The time at which approval was granted.
   */
  approveTime?: Date;
  /**
   * True when the request has been auto-approved.
   */
  autoApproved?: boolean;
  /**
   * The time at which the approval expires.
   */
  expireTime?: Date;
  /**
   * If set, denotes the timestamp at which the approval is invalidated.
   */
  invalidateTime?: Date;
  /**
   * The signature for the ApprovalRequest and details on how it was signed.
   */
  signatureInfo?: SignatureInfo;
}

function serializeApproveDecision(data: any): ApproveDecision {
  return {
    ...data,
    approveTime: data["approveTime"] !== undefined ? data["approveTime"].toISOString() : undefined,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
    invalidateTime: data["invalidateTime"] !== undefined ? data["invalidateTime"].toISOString() : undefined,
    signatureInfo: data["signatureInfo"] !== undefined ? serializeSignatureInfo(data["signatureInfo"]) : undefined,
  };
}

function deserializeApproveDecision(data: any): ApproveDecision {
  return {
    ...data,
    approveTime: data["approveTime"] !== undefined ? new Date(data["approveTime"]) : undefined,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    invalidateTime: data["invalidateTime"] !== undefined ? new Date(data["invalidateTime"]) : undefined,
    signatureInfo: data["signatureInfo"] !== undefined ? deserializeSignatureInfo(data["signatureInfo"]) : undefined,
  };
}

/**
 * Request to dismiss an approval request.
 */
export interface DismissApprovalRequestMessage {
}

/**
 * A decision that has been made to dismiss an approval request.
 */
export interface DismissDecision {
  /**
   * The time at which the approval request was dismissed.
   */
  dismissTime?: Date;
  /**
   * This field will be true if the ApprovalRequest was implicitly dismissed
   * due to inaction by the access approval approvers (the request is not acted
   * on by the approvers before the exiration time).
   */
  implicit?: boolean;
}

function serializeDismissDecision(data: any): DismissDecision {
  return {
    ...data,
    dismissTime: data["dismissTime"] !== undefined ? data["dismissTime"].toISOString() : undefined,
  };
}

function deserializeDismissDecision(data: any): DismissDecision {
  return {
    ...data,
    dismissTime: data["dismissTime"] !== undefined ? new Date(data["dismissTime"]) : undefined,
  };
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
 * Represents the enrollment of a cloud resource into a specific service.
 */
export interface EnrolledService {
  /**
   * The product for which Access Approval will be enrolled. Allowed values are
   * listed below (case-sensitive): * all * GA * App Engine * Artifact Registry
   * * BigQuery * Certificate Authority Service * Cloud Bigtable * Cloud Key
   * Management Service * Compute Engine * Cloud Composer * Cloud Dataflow *
   * Cloud Dataproc * Cloud DLP * Cloud EKM * Cloud HSM * Cloud Identity and
   * Access Management * Cloud Logging * Cloud NAT * Cloud Pub/Sub * Cloud
   * Spanner * Cloud SQL * Cloud Storage * Google Kubernetes Engine *
   * Organization Policy Serivice * Persistent Disk * Resource Manager * Secret
   * Manager * Speaker ID Note: These values are supported as input for legacy
   * purposes, but will not be returned from the API. * all * ga-only *
   * appengine.googleapis.com * artifactregistry.googleapis.com *
   * bigquery.googleapis.com * bigtable.googleapis.com *
   * container.googleapis.com * cloudkms.googleapis.com *
   * cloudresourcemanager.googleapis.com * cloudsql.googleapis.com *
   * compute.googleapis.com * dataflow.googleapis.com * dataproc.googleapis.com
   * * dlp.googleapis.com * iam.googleapis.com * logging.googleapis.com *
   * orgpolicy.googleapis.com * pubsub.googleapis.com * spanner.googleapis.com *
   * secretmanager.googleapis.com * speakerid.googleapis.com *
   * storage.googleapis.com Calls to UpdateAccessApprovalSettings using 'all' or
   * any of the XXX.googleapis.com will be translated to the associated product
   * name ('all', 'App Engine', etc.). Note: 'all' will enroll the resource in
   * all products supported at both 'GA' and 'Preview' levels. More information
   * about levels of support is available at
   * https://cloud.google.com/access-approval/docs/supported-services
   */
  cloudProduct?: string;
  /**
   * The enrollment level of the service.
   */
  enrollmentLevel?:  | "ENROLLMENT_LEVEL_UNSPECIFIED" | "BLOCK_ALL";
}

/**
 * Additional options for AccessApproval#foldersApprovalRequestsList.
 */
export interface FoldersApprovalRequestsListOptions {
  /**
   * A filter on the type of approval requests to retrieve. Must be one of the
   * following values: * [not set]: Requests that are pending or have active
   * approvals. * ALL: All requests. * PENDING: Only pending requests. * ACTIVE:
   * Only active (i.e. currently approved) requests. * DISMISSED: Only requests
   * that have been dismissed, or requests that are not approved and past
   * expiration. * EXPIRED: Only requests that have been approved, and the
   * approval has expired. * HISTORY: Active, dismissed and expired requests.
   */
  filter?: string;
  /**
   * Requested page size.
   */
  pageSize?: number;
  /**
   * A token identifying the page of results to return.
   */
  pageToken?: string;
}

/**
 * Additional options for AccessApproval#foldersUpdateAccessApprovalSettings.
 */
export interface FoldersUpdateAccessApprovalSettingsOptions {
  /**
   * The update mask applies to the settings. Only the top level fields of
   * AccessApprovalSettings (notification_emails & enrolled_services) are
   * supported. For each field, if it is included, the currently stored value
   * will be entirely overwritten with the value of the field passed in this
   * request. For the `FieldMask` definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   * If this field is left unset, only the notification_emails field will be
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersUpdateAccessApprovalSettingsOptions(data: any): FoldersUpdateAccessApprovalSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersUpdateAccessApprovalSettingsOptions(data: any): FoldersUpdateAccessApprovalSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request to invalidate an existing approval.
 */
export interface InvalidateApprovalRequestMessage {
}

/**
 * Response to listing of ApprovalRequest objects.
 */
export interface ListApprovalRequestsResponse {
  /**
   * Approval request details.
   */
  approvalRequests?: ApprovalRequest[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more.
   */
  nextPageToken?: string;
}

function serializeListApprovalRequestsResponse(data: any): ListApprovalRequestsResponse {
  return {
    ...data,
    approvalRequests: data["approvalRequests"] !== undefined ? data["approvalRequests"].map((item: any) => (serializeApprovalRequest(item))) : undefined,
  };
}

function deserializeListApprovalRequestsResponse(data: any): ListApprovalRequestsResponse {
  return {
    ...data,
    approvalRequests: data["approvalRequests"] !== undefined ? data["approvalRequests"].map((item: any) => (deserializeApprovalRequest(item))) : undefined,
  };
}

/**
 * Additional options for AccessApproval#organizationsApprovalRequestsList.
 */
export interface OrganizationsApprovalRequestsListOptions {
  /**
   * A filter on the type of approval requests to retrieve. Must be one of the
   * following values: * [not set]: Requests that are pending or have active
   * approvals. * ALL: All requests. * PENDING: Only pending requests. * ACTIVE:
   * Only active (i.e. currently approved) requests. * DISMISSED: Only requests
   * that have been dismissed, or requests that are not approved and past
   * expiration. * EXPIRED: Only requests that have been approved, and the
   * approval has expired. * HISTORY: Active, dismissed and expired requests.
   */
  filter?: string;
  /**
   * Requested page size.
   */
  pageSize?: number;
  /**
   * A token identifying the page of results to return.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AccessApproval#organizationsUpdateAccessApprovalSettings.
 */
export interface OrganizationsUpdateAccessApprovalSettingsOptions {
  /**
   * The update mask applies to the settings. Only the top level fields of
   * AccessApprovalSettings (notification_emails & enrolled_services) are
   * supported. For each field, if it is included, the currently stored value
   * will be entirely overwritten with the value of the field passed in this
   * request. For the `FieldMask` definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   * If this field is left unset, only the notification_emails field will be
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsUpdateAccessApprovalSettingsOptions(data: any): OrganizationsUpdateAccessApprovalSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsUpdateAccessApprovalSettingsOptions(data: any): OrganizationsUpdateAccessApprovalSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for AccessApproval#projectsApprovalRequestsList.
 */
export interface ProjectsApprovalRequestsListOptions {
  /**
   * A filter on the type of approval requests to retrieve. Must be one of the
   * following values: * [not set]: Requests that are pending or have active
   * approvals. * ALL: All requests. * PENDING: Only pending requests. * ACTIVE:
   * Only active (i.e. currently approved) requests. * DISMISSED: Only requests
   * that have been dismissed, or requests that are not approved and past
   * expiration. * EXPIRED: Only requests that have been approved, and the
   * approval has expired. * HISTORY: Active, dismissed and expired requests.
   */
  filter?: string;
  /**
   * Requested page size.
   */
  pageSize?: number;
  /**
   * A token identifying the page of results to return.
   */
  pageToken?: string;
}

/**
 * Additional options for AccessApproval#projectsUpdateAccessApprovalSettings.
 */
export interface ProjectsUpdateAccessApprovalSettingsOptions {
  /**
   * The update mask applies to the settings. Only the top level fields of
   * AccessApprovalSettings (notification_emails & enrolled_services) are
   * supported. For each field, if it is included, the currently stored value
   * will be entirely overwritten with the value of the field passed in this
   * request. For the `FieldMask` definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   * If this field is left unset, only the notification_emails field will be
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsUpdateAccessApprovalSettingsOptions(data: any): ProjectsUpdateAccessApprovalSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsUpdateAccessApprovalSettingsOptions(data: any): ProjectsUpdateAccessApprovalSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * The properties associated with the resource of the request.
 */
export interface ResourceProperties {
  /**
   * Whether an approval will exclude the descendants of the resource being
   * requested.
   */
  excludesDescendants?: boolean;
}

/**
 * Information about the digital signature of the resource.
 */
export interface SignatureInfo {
  /**
   * The resource name of the customer CryptoKeyVersion used for signing.
   */
  customerKmsKeyVersion?: string;
  /**
   * The public key for the Google default signing, encoded in PEM format. The
   * signature was created using a private key which may be verified using this
   * public key.
   */
  googlePublicKeyPem?: string;
  /**
   * The digital signature.
   */
  signature?: Uint8Array;
}

function serializeSignatureInfo(data: any): SignatureInfo {
  return {
    ...data,
    signature: data["signature"] !== undefined ? encodeBase64(data["signature"]) : undefined,
  };
}

function deserializeSignatureInfo(data: any): SignatureInfo {
  return {
    ...data,
    signature: data["signature"] !== undefined ? decodeBase64(data["signature"] as string) : undefined,
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
