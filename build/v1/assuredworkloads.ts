// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Assured Workloads API Client for Deno
 * =====================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/learnmoreurl
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class AssuredWorkloads {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://assuredworkloads.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async organizationsLocationsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name The name of the operation's parent resource.
   */
  async organizationsLocationsOperationsList(name: string, opts: OrganizationsLocationsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/operations`);
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
    return data as GoogleLongrunningListOperationsResponse;
  }

  /**
   * Creates Assured Workload.
   *
   * @param parent Required. The resource name of the new Workload's parent. Must be of the form `organizations/{org_id}/locations/{location_id}`.
   */
  async organizationsLocationsWorkloadsCreate(parent: string, req: GoogleCloudAssuredworkloadsV1Workload, opts: OrganizationsLocationsWorkloadsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudAssuredworkloadsV1Workload(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/workloads`);
    if (opts.externalId !== undefined) {
      url.searchParams.append("externalId", String(opts.externalId));
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
   * Deletes the workload. Make sure that workload's direct children are
   * already in a deleted state, otherwise the request will fail with a
   * FAILED_PRECONDITION error.
   *
   * @param name Required. The `name` field is used to identify the workload. Format: organizations/{org_id}/locations/{location_id}/workloads/{workload_id}
   */
  async organizationsLocationsWorkloadsDelete(name: string, opts: OrganizationsLocationsWorkloadsDeleteOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets Assured Workload associated with a CRM Node
   *
   * @param name Required. The resource name of the Workload to fetch. This is the workload's relative path in the API, formatted as "organizations/{organization_id}/locations/{location_id}/workloads/{workload_id}". For example, "organizations/123/locations/us-east1/workloads/assured-workload-1".
   */
  async organizationsLocationsWorkloadsGet(name: string): Promise<GoogleCloudAssuredworkloadsV1Workload> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudAssuredworkloadsV1Workload(data);
  }

  /**
   * Lists Assured Workloads under a CRM Node.
   *
   * @param parent Required. Parent Resource to list workloads from. Must be of the form `organizations/{org_id}/locations/{location}`.
   */
  async organizationsLocationsWorkloadsList(parent: string, opts: OrganizationsLocationsWorkloadsListOptions = {}): Promise<GoogleCloudAssuredworkloadsV1ListWorkloadsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/workloads`);
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
    return deserializeGoogleCloudAssuredworkloadsV1ListWorkloadsResponse(data);
  }

  /**
   * Update the permissions settings for an existing partner workload. For
   * force updates don't set etag field in the Workload. Only one update
   * operation per workload can be in progress.
   *
   * @param name Required. The `name` field is used to identify the workload. Format: organizations/{org_id}/locations/{location_id}/workloads/{workload_id}
   */
  async organizationsLocationsWorkloadsMutatePartnerPermissions(name: string, req: GoogleCloudAssuredworkloadsV1MutatePartnerPermissionsRequest): Promise<GoogleCloudAssuredworkloadsV1Workload> {
    req = serializeGoogleCloudAssuredworkloadsV1MutatePartnerPermissionsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:mutatePartnerPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoogleCloudAssuredworkloadsV1Workload(data);
  }

  /**
   * Updates an existing workload. Currently allows updating of workload
   * display_name and labels. For force updates don't set etag field in the
   * Workload. Only one update operation per workload can be in progress.
   *
   * @param name Optional. The resource name of the workload. Format: organizations/{organization}/locations/{location}/workloads/{workload} Read-only.
   */
  async organizationsLocationsWorkloadsPatch(name: string, req: GoogleCloudAssuredworkloadsV1Workload, opts: OrganizationsLocationsWorkloadsPatchOptions = {}): Promise<GoogleCloudAssuredworkloadsV1Workload> {
    req = serializeGoogleCloudAssuredworkloadsV1Workload(req);
    opts = serializeOrganizationsLocationsWorkloadsPatchOptions(opts);
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
    return deserializeGoogleCloudAssuredworkloadsV1Workload(data);
  }

  /**
   * Restrict the list of resources allowed in the Workload environment. The
   * current list of allowed products can be found at
   * https://cloud.google.com/assured-workloads/docs/supported-products In
   * addition to assuredworkloads.workload.update permission, the user should
   * also have orgpolicy.policy.set permission on the folder resource to use
   * this functionality.
   *
   * @param name Required. The resource name of the Workload. This is the workloads's relative path in the API, formatted as "organizations/{organization_id}/locations/{location_id}/workloads/{workload_id}". For example, "organizations/123/locations/us-east1/workloads/assured-workload-1".
   */
  async organizationsLocationsWorkloadsRestrictAllowedResources(name: string, req: GoogleCloudAssuredworkloadsV1RestrictAllowedResourcesRequest): Promise<GoogleCloudAssuredworkloadsV1RestrictAllowedResourcesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:restrictAllowedResources`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudAssuredworkloadsV1RestrictAllowedResourcesResponse;
  }

  /**
   * Acknowledges an existing violation. By acknowledging a violation, users
   * acknowledge the existence of a compliance violation in their workload and
   * decide to ignore it due to a valid business justification. Acknowledgement
   * is a permanent operation and it cannot be reverted.
   *
   * @param name Required. The resource name of the Violation to acknowledge. Format: organizations/{organization}/locations/{location}/workloads/{workload}/violations/{violation}
   */
  async organizationsLocationsWorkloadsViolationsAcknowledge(name: string, req: GoogleCloudAssuredworkloadsV1AcknowledgeViolationRequest): Promise<GoogleCloudAssuredworkloadsV1AcknowledgeViolationResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:acknowledge`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudAssuredworkloadsV1AcknowledgeViolationResponse;
  }

  /**
   * Retrieves Assured Workload Violation based on ID.
   *
   * @param name Required. The resource name of the Violation to fetch (ie. Violation.name). Format: organizations/{organization}/locations/{location}/workloads/{workload}/violations/{violation}
   */
  async organizationsLocationsWorkloadsViolationsGet(name: string): Promise<GoogleCloudAssuredworkloadsV1Violation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudAssuredworkloadsV1Violation(data);
  }

  /**
   * Lists the Violations in the AssuredWorkload Environment. Callers may also
   * choose to read across multiple Workloads as per
   * [AIP-159](https://google.aip.dev/159) by using '-' (the hyphen or dash
   * character) as a wildcard character instead of workload-id in the parent.
   * Format `organizations/{org_id}/locations/{location}/workloads/-`
   *
   * @param parent Required. The Workload name. Format `organizations/{org_id}/locations/{location}/workloads/{workload}`.
   */
  async organizationsLocationsWorkloadsViolationsList(parent: string, opts: OrganizationsLocationsWorkloadsViolationsListOptions = {}): Promise<GoogleCloudAssuredworkloadsV1ListViolationsResponse> {
    opts = serializeOrganizationsLocationsWorkloadsViolationsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/violations`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts["interval.endTime"] !== undefined) {
      url.searchParams.append("interval.endTime", String(opts["interval.endTime"]));
    }
    if (opts["interval.startTime"] !== undefined) {
      url.searchParams.append("interval.startTime", String(opts["interval.startTime"]));
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
    return deserializeGoogleCloudAssuredworkloadsV1ListViolationsResponse(data);
  }
}

/**
 * Request for acknowledging the violation Next Id: 4
 */
export interface GoogleCloudAssuredworkloadsV1AcknowledgeViolationRequest {
  /**
   * Required. Business justification explaining the need for violation
   * acknowledgement
   */
  comment?: string;
  /**
   * Optional. This field is deprecated and will be removed in future version
   * of the API. Name of the OrgPolicy which was modified with non-compliant
   * change and resulted in this violation. Format:
   * projects/{project_number}/policies/{constraint_name}
   * folders/{folder_id}/policies/{constraint_name}
   * organizations/{organization_id}/policies/{constraint_name}
   */
  nonCompliantOrgPolicy?: string;
}

/**
 * Response for violation acknowledgement
 */
export interface GoogleCloudAssuredworkloadsV1AcknowledgeViolationResponse {
}

/**
 * Operation metadata to give request details of CreateWorkload.
 */
export interface GoogleCloudAssuredworkloadsV1CreateWorkloadOperationMetadata {
  /**
   * Optional. Compliance controls that should be applied to the resources
   * managed by the workload.
   */
  complianceRegime?:  | "COMPLIANCE_REGIME_UNSPECIFIED" | "IL4" | "CJIS" | "FEDRAMP_HIGH" | "FEDRAMP_MODERATE" | "US_REGIONAL_ACCESS" | "HIPAA" | "HITRUST" | "EU_REGIONS_AND_SUPPORT" | "CA_REGIONS_AND_SUPPORT" | "ITAR" | "AU_REGIONS_AND_US_SUPPORT" | "ASSURED_WORKLOADS_FOR_PARTNERS" | "ISR_REGIONS" | "ISR_REGIONS_AND_SUPPORT" | "CA_PROTECTED_B";
  /**
   * Optional. Time when the operation was created.
   */
  createTime?: Date;
  /**
   * Optional. The display name of the workload.
   */
  displayName?: string;
  /**
   * Optional. The parent of the workload.
   */
  parent?: string;
}

function serializeGoogleCloudAssuredworkloadsV1CreateWorkloadOperationMetadata(data: any): GoogleCloudAssuredworkloadsV1CreateWorkloadOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudAssuredworkloadsV1CreateWorkloadOperationMetadata(data: any): GoogleCloudAssuredworkloadsV1CreateWorkloadOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Response of ListViolations endpoint.
 */
export interface GoogleCloudAssuredworkloadsV1ListViolationsResponse {
  /**
   * The next page token. Returns empty if reached the last page.
   */
  nextPageToken?: string;
  /**
   * List of Violations under a Workload.
   */
  violations?: GoogleCloudAssuredworkloadsV1Violation[];
}

function serializeGoogleCloudAssuredworkloadsV1ListViolationsResponse(data: any): GoogleCloudAssuredworkloadsV1ListViolationsResponse {
  return {
    ...data,
    violations: data["violations"] !== undefined ? data["violations"].map((item: any) => (serializeGoogleCloudAssuredworkloadsV1Violation(item))) : undefined,
  };
}

function deserializeGoogleCloudAssuredworkloadsV1ListViolationsResponse(data: any): GoogleCloudAssuredworkloadsV1ListViolationsResponse {
  return {
    ...data,
    violations: data["violations"] !== undefined ? data["violations"].map((item: any) => (deserializeGoogleCloudAssuredworkloadsV1Violation(item))) : undefined,
  };
}

/**
 * Response of ListWorkloads endpoint.
 */
export interface GoogleCloudAssuredworkloadsV1ListWorkloadsResponse {
  /**
   * The next page token. Return empty if reached the last page.
   */
  nextPageToken?: string;
  /**
   * List of Workloads under a given parent.
   */
  workloads?: GoogleCloudAssuredworkloadsV1Workload[];
}

function serializeGoogleCloudAssuredworkloadsV1ListWorkloadsResponse(data: any): GoogleCloudAssuredworkloadsV1ListWorkloadsResponse {
  return {
    ...data,
    workloads: data["workloads"] !== undefined ? data["workloads"].map((item: any) => (serializeGoogleCloudAssuredworkloadsV1Workload(item))) : undefined,
  };
}

function deserializeGoogleCloudAssuredworkloadsV1ListWorkloadsResponse(data: any): GoogleCloudAssuredworkloadsV1ListWorkloadsResponse {
  return {
    ...data,
    workloads: data["workloads"] !== undefined ? data["workloads"].map((item: any) => (deserializeGoogleCloudAssuredworkloadsV1Workload(item))) : undefined,
  };
}

/**
 * Request of updating permission settings for a partner workload.
 */
export interface GoogleCloudAssuredworkloadsV1MutatePartnerPermissionsRequest {
  /**
   * Optional. The etag of the workload. If this is provided, it must match the
   * server's etag.
   */
  etag?: string;
  /**
   * Required. The partner permissions to be updated.
   */
  partnerPermissions?: GoogleCloudAssuredworkloadsV1WorkloadPartnerPermissions;
  /**
   * Required. The list of fields to be updated. E.g. update_mask { paths:
   * "partner_permissions.data_logs_viewer"}
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleCloudAssuredworkloadsV1MutatePartnerPermissionsRequest(data: any): GoogleCloudAssuredworkloadsV1MutatePartnerPermissionsRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleCloudAssuredworkloadsV1MutatePartnerPermissionsRequest(data: any): GoogleCloudAssuredworkloadsV1MutatePartnerPermissionsRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request for restricting list of available resources in Workload environment.
 */
export interface GoogleCloudAssuredworkloadsV1RestrictAllowedResourcesRequest {
  /**
   * Required. The type of restriction for using gcp products in the Workload
   * environment.
   */
  restrictionType?:  | "RESTRICTION_TYPE_UNSPECIFIED" | "ALLOW_ALL_GCP_RESOURCES" | "ALLOW_COMPLIANT_RESOURCES" | "APPEND_COMPLIANT_RESOURCES";
}

/**
 * Response for restricting the list of allowed resources.
 */
export interface GoogleCloudAssuredworkloadsV1RestrictAllowedResourcesResponse {
}

/**
 * Workload monitoring Violation. Next Id: 22
 */
export interface GoogleCloudAssuredworkloadsV1Violation {
  /**
   * A boolean that indicates if the violation is acknowledged
   */
  acknowledged?: boolean;
  /**
   * Optional. Timestamp when this violation was acknowledged last. This will
   * be absent when acknowledged field is marked as false.
   */
  acknowledgementTime?: Date;
  /**
   * Output only. Immutable. Audit Log Link for violated resource Format:
   * https://console.cloud.google.com/logs/query;query={logName}{protoPayload.resourceName}{timeRange}{folder}
   */
  readonly auditLogLink?: string;
  /**
   * Output only. Time of the event which triggered the Violation.
   */
  readonly beginTime?: Date;
  /**
   * Output only. Category under which this violation is mapped. e.g. Location,
   * Service Usage, Access, Encryption, etc.
   */
  readonly category?: string;
  /**
   * Output only. Description for the Violation. e.g. OrgPolicy
   * gcp.resourceLocations has non compliant value.
   */
  readonly description?: string;
  /**
   * Output only. Immutable. Audit Log link to find business justification
   * provided for violation exception. Format:
   * https://console.cloud.google.com/logs/query;query={logName}{protoPayload.resourceName}{protoPayload.methodName}{timeRange}{organization}
   */
  readonly exceptionAuditLogLink?: string;
  /**
   * Output only. Immutable. Name of the Violation. Format:
   * organizations/{organization}/locations/{location}/workloads/{workload_id}/violations/{violations_id}
   */
  readonly name?: string;
  /**
   * Output only. Immutable. Name of the OrgPolicy which was modified with
   * non-compliant change and resulted this violation. Format:
   * projects/{project_number}/policies/{constraint_name}
   * folders/{folder_id}/policies/{constraint_name}
   * organizations/{organization_id}/policies/{constraint_name}
   */
  readonly nonCompliantOrgPolicy?: string;
  /**
   * Output only. Immutable. The org-policy-constraint that was incorrectly
   * changed, which resulted in this violation.
   */
  readonly orgPolicyConstraint?: string;
  /**
   * Output only. Compliance violation remediation
   */
  readonly remediation?: GoogleCloudAssuredworkloadsV1ViolationRemediation;
  /**
   * Output only. Time of the event which fixed the Violation. If the violation
   * is ACTIVE this will be empty.
   */
  readonly resolveTime?: Date;
  /**
   * Output only. State of the violation
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "RESOLVED" | "UNRESOLVED" | "EXCEPTION";
  /**
   * Output only. The last time when the Violation record was updated.
   */
  readonly updateTime?: Date;
}

function serializeGoogleCloudAssuredworkloadsV1Violation(data: any): GoogleCloudAssuredworkloadsV1Violation {
  return {
    ...data,
    acknowledgementTime: data["acknowledgementTime"] !== undefined ? data["acknowledgementTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudAssuredworkloadsV1Violation(data: any): GoogleCloudAssuredworkloadsV1Violation {
  return {
    ...data,
    acknowledgementTime: data["acknowledgementTime"] !== undefined ? new Date(data["acknowledgementTime"]) : undefined,
    beginTime: data["beginTime"] !== undefined ? new Date(data["beginTime"]) : undefined,
    resolveTime: data["resolveTime"] !== undefined ? new Date(data["resolveTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Represents remediation guidance to resolve compliance violation for
 * AssuredWorkload
 */
export interface GoogleCloudAssuredworkloadsV1ViolationRemediation {
  /**
   * Values that can resolve the violation For example: for list org policy
   * violations, this will either be the list of allowed or denied values
   */
  compliantValues?: string[];
  /**
   * Required. Remediation instructions to resolve violations
   */
  instructions?: GoogleCloudAssuredworkloadsV1ViolationRemediationInstructions;
  /**
   * Output only. Reemediation type based on the type of org policy values
   * violated
   */
  readonly remediationType?:  | "REMEDIATION_TYPE_UNSPECIFIED" | "REMEDIATION_BOOLEAN_ORG_POLICY_VIOLATION" | "REMEDIATION_LIST_ALLOWED_VALUES_ORG_POLICY_VIOLATION" | "REMEDIATION_LIST_DENIED_VALUES_ORG_POLICY_VIOLATION" | "REMEDIATION_RESTRICT_CMEK_CRYPTO_KEY_PROJECTS_ORG_POLICY_VIOLATION";
}

/**
 * Instructions to remediate violation
 */
export interface GoogleCloudAssuredworkloadsV1ViolationRemediationInstructions {
  /**
   * Remediation instructions to resolve violation via cloud console
   */
  consoleInstructions?: GoogleCloudAssuredworkloadsV1ViolationRemediationInstructionsConsole;
  /**
   * Remediation instructions to resolve violation via gcloud cli
   */
  gcloudInstructions?: GoogleCloudAssuredworkloadsV1ViolationRemediationInstructionsGcloud;
}

/**
 * Remediation instructions to resolve violation via cloud console
 */
export interface GoogleCloudAssuredworkloadsV1ViolationRemediationInstructionsConsole {
  /**
   * Additional urls for more information about steps
   */
  additionalLinks?: string[];
  /**
   * Link to console page where violations can be resolved
   */
  consoleUris?: string[];
  /**
   * Steps to resolve violation via cloud console
   */
  steps?: string[];
}

/**
 * Remediation instructions to resolve violation via gcloud cli
 */
export interface GoogleCloudAssuredworkloadsV1ViolationRemediationInstructionsGcloud {
  /**
   * Additional urls for more information about steps
   */
  additionalLinks?: string[];
  /**
   * Gcloud command to resolve violation
   */
  gcloudCommands?: string[];
  /**
   * Steps to resolve violation via gcloud cli
   */
  steps?: string[];
}

/**
 * A Workload object for managing highly regulated workloads of cloud
 * customers.
 */
export interface GoogleCloudAssuredworkloadsV1Workload {
  /**
   * Optional. The billing account used for the resources which are direct
   * children of workload. This billing account is initially associated with the
   * resources created as part of Workload creation. After the initial creation
   * of these resources, the customer can change the assigned billing account.
   * The resource name has the form `billingAccounts/{billing_account_id}`. For
   * example, `billingAccounts/012345-567890-ABCDEF`.
   */
  billingAccount?: string;
  /**
   * Required. Immutable. Compliance Regime associated with this workload.
   */
  complianceRegime?:  | "COMPLIANCE_REGIME_UNSPECIFIED" | "IL4" | "CJIS" | "FEDRAMP_HIGH" | "FEDRAMP_MODERATE" | "US_REGIONAL_ACCESS" | "HIPAA" | "HITRUST" | "EU_REGIONS_AND_SUPPORT" | "CA_REGIONS_AND_SUPPORT" | "ITAR" | "AU_REGIONS_AND_US_SUPPORT" | "ASSURED_WORKLOADS_FOR_PARTNERS" | "ISR_REGIONS" | "ISR_REGIONS_AND_SUPPORT" | "CA_PROTECTED_B";
  /**
   * Output only. Count of active Violations in the Workload.
   */
  readonly complianceStatus?: GoogleCloudAssuredworkloadsV1WorkloadComplianceStatus;
  /**
   * Output only. Urls for services which are compliant for this Assured
   * Workload, but which are currently disallowed by the
   * ResourceUsageRestriction org policy. Invoke RestrictAllowedResources
   * endpoint to allow your project developers to use these services in their
   * environment."
   */
  readonly compliantButDisallowedServices?: string[];
  /**
   * Output only. Immutable. The Workload creation timestamp.
   */
  readonly createTime?: Date;
  /**
   * Required. The user-assigned display name of the Workload. When present it
   * must be between 4 to 30 characters. Allowed characters are: lowercase and
   * uppercase letters, numbers, hyphen, and spaces. Example: My Workload
   */
  displayName?: string;
  /**
   * Optional. Represents the Ekm Provisioning State of the given workload.
   */
  ekmProvisioningResponse?: GoogleCloudAssuredworkloadsV1WorkloadEkmProvisioningResponse;
  /**
   * Optional. Indicates the sovereignty status of the given workload.
   * Currently meant to be used by Europe/Canada customers.
   */
  enableSovereignControls?: boolean;
  /**
   * Optional. ETag of the workload, it is calculated on the basis of the
   * Workload contents. It will be used in Update & Delete operations.
   */
  etag?: string;
  /**
   * Output only. Represents the KAJ enrollment state of the given workload.
   */
  readonly kajEnrollmentState?:  | "KAJ_ENROLLMENT_STATE_UNSPECIFIED" | "KAJ_ENROLLMENT_STATE_PENDING" | "KAJ_ENROLLMENT_STATE_COMPLETE";
  /**
   * Input only. Settings used to create a CMEK crypto key. When set, a project
   * with a KMS CMEK key is provisioned. This field is deprecated as of Feb 28,
   * 2022. In order to create a Keyring, callers should specify,
   * ENCRYPTION_KEYS_PROJECT or KEYRING in ResourceSettings.resource_type field.
   */
  kmsSettings?: GoogleCloudAssuredworkloadsV1WorkloadKMSSettings;
  /**
   * Optional. Labels applied to the workload.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. The resource name of the workload. Format:
   * organizations/{organization}/locations/{location}/workloads/{workload}
   * Read-only.
   */
  name?: string;
  /**
   * Optional. Partner regime associated with this workload.
   */
  partner?:  | "PARTNER_UNSPECIFIED" | "LOCAL_CONTROLS_BY_S3NS" | "SOVEREIGN_CONTROLS_BY_T_SYSTEMS";
  /**
   * Input only. The parent resource for the resources managed by this Assured
   * Workload. May be either empty or a folder resource which is a child of the
   * Workload parent. If not specified all resources are created under the
   * parent organization. Format: folders/{folder_id}
   */
  provisionedResourcesParent?: string;
  /**
   * Output only. The resources associated with this workload. These resources
   * will be created when creating the workload. If any of the projects already
   * exist, the workload creation will fail. Always read only.
   */
  readonly resources?: GoogleCloudAssuredworkloadsV1WorkloadResourceInfo[];
  /**
   * Input only. Resource properties that are used to customize workload
   * resources. These properties (such as custom project id) will be used to
   * create workload resources if possible. This field is optional.
   */
  resourceSettings?: GoogleCloudAssuredworkloadsV1WorkloadResourceSettings[];
  /**
   * Output only. Represents the SAA enrollment response of the given workload.
   * SAA enrollment response is queried during GetWorkload call. In failure
   * cases, user friendly error message is shown in SAA details page.
   */
  readonly saaEnrollmentResponse?: GoogleCloudAssuredworkloadsV1WorkloadSaaEnrollmentResponse;
}

function serializeGoogleCloudAssuredworkloadsV1Workload(data: any): GoogleCloudAssuredworkloadsV1Workload {
  return {
    ...data,
    kmsSettings: data["kmsSettings"] !== undefined ? serializeGoogleCloudAssuredworkloadsV1WorkloadKMSSettings(data["kmsSettings"]) : undefined,
  };
}

function deserializeGoogleCloudAssuredworkloadsV1Workload(data: any): GoogleCloudAssuredworkloadsV1Workload {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    kmsSettings: data["kmsSettings"] !== undefined ? deserializeGoogleCloudAssuredworkloadsV1WorkloadKMSSettings(data["kmsSettings"]) : undefined,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeGoogleCloudAssuredworkloadsV1WorkloadResourceInfo(item))) : undefined,
  };
}

/**
 * Represents the Compliance Status of this workload
 */
export interface GoogleCloudAssuredworkloadsV1WorkloadComplianceStatus {
  /**
   * Count of active Violations which are acknowledged in the Workload.
   */
  acknowledgedViolationCount?: number;
  /**
   * Count of active Violations which haven't been acknowledged.
   */
  activeViolationCount?: number;
}

/**
 * External key management systems(EKM) Provisioning response
 */
export interface GoogleCloudAssuredworkloadsV1WorkloadEkmProvisioningResponse {
  /**
   * Indicates Ekm provisioning error if any.
   */
  ekmProvisioningErrorDomain?:  | "EKM_PROVISIONING_ERROR_DOMAIN_UNSPECIFIED" | "UNSPECIFIED_ERROR" | "GOOGLE_SERVER_ERROR" | "EXTERNAL_USER_ERROR" | "EXTERNAL_PARTNER_ERROR" | "TIMEOUT_ERROR";
  /**
   * Detailed error message if Ekm provisioning fails
   */
  ekmProvisioningErrorMessage?: string;
  /**
   * Indicates Ekm enrollment Provisioning of a given workload.
   */
  ekmProvisioningState?:  | "EKM_PROVISIONING_STATE_UNSPECIFIED" | "EKM_PROVISIONING_STATE_PENDING" | "EKM_PROVISIONING_STATE_FAILED" | "EKM_PROVISIONING_STATE_COMPLETED";
}

/**
 * Settings specific to the Key Management Service. This message is deprecated.
 * In order to create a Keyring, callers should specify, ENCRYPTION_KEYS_PROJECT
 * or KEYRING in ResourceSettings.resource_type field.
 */
export interface GoogleCloudAssuredworkloadsV1WorkloadKMSSettings {
  /**
   * Required. Input only. Immutable. The time at which the Key Management
   * Service will automatically create a new version of the crypto key and mark
   * it as the primary.
   */
  nextRotationTime?: Date;
  /**
   * Required. Input only. Immutable. [next_rotation_time] will be advanced by
   * this period when the Key Management Service automatically rotates a key.
   * Must be at least 24 hours and at most 876,000 hours.
   */
  rotationPeriod?: number /* Duration */;
}

function serializeGoogleCloudAssuredworkloadsV1WorkloadKMSSettings(data: any): GoogleCloudAssuredworkloadsV1WorkloadKMSSettings {
  return {
    ...data,
    nextRotationTime: data["nextRotationTime"] !== undefined ? data["nextRotationTime"].toISOString() : undefined,
    rotationPeriod: data["rotationPeriod"] !== undefined ? data["rotationPeriod"] : undefined,
  };
}

function deserializeGoogleCloudAssuredworkloadsV1WorkloadKMSSettings(data: any): GoogleCloudAssuredworkloadsV1WorkloadKMSSettings {
  return {
    ...data,
    nextRotationTime: data["nextRotationTime"] !== undefined ? new Date(data["nextRotationTime"]) : undefined,
    rotationPeriod: data["rotationPeriod"] !== undefined ? data["rotationPeriod"] : undefined,
  };
}

/**
 * Permissions granted to the AW Partner SA account for the customer workload
 */
export interface GoogleCloudAssuredworkloadsV1WorkloadPartnerPermissions {
  /**
   * Allow the partner to view inspectability logs and monitoring violations.
   */
  dataLogsViewer?: boolean;
  /**
   * Allow partner to monitor folder and remediate violations
   */
  remediateFolderViolations?: boolean;
  /**
   * Allow partner to approve or reject Service Access requests
   */
  serviceAccessApprover?: boolean;
}

/**
 * Represent the resources that are children of this Workload.
 */
export interface GoogleCloudAssuredworkloadsV1WorkloadResourceInfo {
  /**
   * Resource identifier. For a project this represents project_number.
   */
  resourceId?: bigint;
  /**
   * Indicates the type of resource.
   */
  resourceType?:  | "RESOURCE_TYPE_UNSPECIFIED" | "CONSUMER_PROJECT" | "CONSUMER_FOLDER" | "ENCRYPTION_KEYS_PROJECT" | "KEYRING";
}

function serializeGoogleCloudAssuredworkloadsV1WorkloadResourceInfo(data: any): GoogleCloudAssuredworkloadsV1WorkloadResourceInfo {
  return {
    ...data,
    resourceId: data["resourceId"] !== undefined ? String(data["resourceId"]) : undefined,
  };
}

function deserializeGoogleCloudAssuredworkloadsV1WorkloadResourceInfo(data: any): GoogleCloudAssuredworkloadsV1WorkloadResourceInfo {
  return {
    ...data,
    resourceId: data["resourceId"] !== undefined ? BigInt(data["resourceId"]) : undefined,
  };
}

/**
 * Represent the custom settings for the resources to be created.
 */
export interface GoogleCloudAssuredworkloadsV1WorkloadResourceSettings {
  /**
   * User-assigned resource display name. If not empty it will be used to
   * create a resource with the specified name.
   */
  displayName?: string;
  /**
   * Resource identifier. For a project this represents project_id. If the
   * project is already taken, the workload creation will fail. For KeyRing,
   * this represents the keyring_id. For a folder, don't set this value as
   * folder_id is assigned by Google.
   */
  resourceId?: string;
  /**
   * Indicates the type of resource. This field should be specified to
   * correspond the id to the right resource type (CONSUMER_FOLDER or
   * ENCRYPTION_KEYS_PROJECT)
   */
  resourceType?:  | "RESOURCE_TYPE_UNSPECIFIED" | "CONSUMER_PROJECT" | "CONSUMER_FOLDER" | "ENCRYPTION_KEYS_PROJECT" | "KEYRING";
}

/**
 * Signed Access Approvals (SAA) enrollment response.
 */
export interface GoogleCloudAssuredworkloadsV1WorkloadSaaEnrollmentResponse {
  /**
   * Indicates SAA enrollment setup error if any.
   */
  setupErrors?:  | "SETUP_ERROR_UNSPECIFIED" | "ERROR_INVALID_BASE_SETUP" | "ERROR_MISSING_EXTERNAL_SIGNING_KEY" | "ERROR_NOT_ALL_SERVICES_ENROLLED" | "ERROR_SETUP_CHECK_FAILED"[];
  /**
   * Indicates SAA enrollment status of a given workload.
   */
  setupStatus?:  | "SETUP_STATE_UNSPECIFIED" | "STATUS_PENDING" | "STATUS_COMPLETE";
}

/**
 * The response message for Operations.ListOperations.
 */
export interface GoogleLongrunningListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: GoogleLongrunningOperation[];
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
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface GoogleProtobufEmpty {
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
 * Additional options for
 * AssuredWorkloads#organizationsLocationsOperationsList.
 */
export interface OrganizationsLocationsOperationsListOptions {
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
 * Additional options for
 * AssuredWorkloads#organizationsLocationsWorkloadsCreate.
 */
export interface OrganizationsLocationsWorkloadsCreateOptions {
  /**
   * Optional. A identifier associated with the workload and underlying
   * projects which allows for the break down of billing costs for a workload.
   * The value provided for the identifier will add a label to the workload and
   * contained projects with the identifier as the value.
   */
  externalId?: string;
}

/**
 * Additional options for
 * AssuredWorkloads#organizationsLocationsWorkloadsDelete.
 */
export interface OrganizationsLocationsWorkloadsDeleteOptions {
  /**
   * Optional. The etag of the workload. If this is provided, it must match the
   * server's etag.
   */
  etag?: string;
}

/**
 * Additional options for AssuredWorkloads#organizationsLocationsWorkloadsList.
 */
export interface OrganizationsLocationsWorkloadsListOptions {
  /**
   * A custom filter for filtering by properties of a workload. At this time,
   * only filtering by labels is supported.
   */
  filter?: string;
  /**
   * Page size.
   */
  pageSize?: number;
  /**
   * Page token returned from previous request. Page token contains context
   * from previous request. Page token needs to be passed in the second and
   * following requests.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * AssuredWorkloads#organizationsLocationsWorkloadsPatch.
 */
export interface OrganizationsLocationsWorkloadsPatchOptions {
  /**
   * Required. The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsLocationsWorkloadsPatchOptions(data: any): OrganizationsLocationsWorkloadsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsLocationsWorkloadsPatchOptions(data: any): OrganizationsLocationsWorkloadsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * AssuredWorkloads#organizationsLocationsWorkloadsViolationsList.
 */
export interface OrganizationsLocationsWorkloadsViolationsListOptions {
  /**
   * Optional. A custom filter for filtering by the Violations properties.
   */
  filter?: string;
  /**
   * The end of the time window.
   */
  ["interval.endTime"]?: Date;
  /**
   * The start of the time window.
   */
  ["interval.startTime"]?: Date;
  /**
   * Optional. Page size.
   */
  pageSize?: number;
  /**
   * Optional. Page token returned from previous request.
   */
  pageToken?: string;
}

function serializeOrganizationsLocationsWorkloadsViolationsListOptions(data: any): OrganizationsLocationsWorkloadsViolationsListOptions {
  return {
    ...data,
    ["interval.endTime"]: data["interval.endTime"] !== undefined ? data["interval.endTime"].toISOString() : undefined,
    ["interval.startTime"]: data["interval.startTime"] !== undefined ? data["interval.startTime"].toISOString() : undefined,
  };
}

function deserializeOrganizationsLocationsWorkloadsViolationsListOptions(data: any): OrganizationsLocationsWorkloadsViolationsListOptions {
  return {
    ...data,
    ["interval.endTime"]: data["interval.endTime"] !== undefined ? new Date(data["interval.endTime"]) : undefined,
    ["interval.startTime"]: data["interval.startTime"] !== undefined ? new Date(data["interval.startTime"]) : undefined,
  };
}