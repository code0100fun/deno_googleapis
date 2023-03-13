// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Chrome Policy API Client for Deno
 * =================================
 * 
 * The Chrome Policy API is a suite of services that allows Chrome administrators to control the policies applied to their managed Chrome OS devices and Chrome browsers.
 * 
 * Docs: http://developers.google.com/chrome/policy
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Chrome Policy API is a suite of services that allows Chrome
 * administrators to control the policies applied to their managed Chrome OS
 * devices and Chrome browsers.
 */
export class ChromePolicy {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://chromepolicy.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Delete multiple policy values that are applied to a specific group. All
   * targets must have the same target format. That is to say that they must
   * point to the same target resource and must have the same keys specified in
   * `additionalTargetKeyNames`, though the values for those keys may be
   * different. On failure the request will return the error details as part of
   * the google.rpc.Status.
   *
   * @param customer ID of the Google Workspace account or literal "my_customer" for the customer associated to the request.
   */
  async customersPoliciesGroupsBatchDelete(customer: string, req: GoogleChromePolicyVersionsV1BatchDeleteGroupPoliciesRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/policies/groups:batchDelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Modify multiple policy values that are applied to a specific group. All
   * targets must have the same target format. That is to say that they must
   * point to the same target resource and must have the same keys specified in
   * `additionalTargetKeyNames`, though the values for those keys may be
   * different. On failure the request will return the error details as part of
   * the google.rpc.Status.
   *
   * @param customer ID of the Google Workspace account or literal "my_customer" for the customer associated to the request.
   */
  async customersPoliciesGroupsBatchModify(customer: string, req: GoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest): Promise<GoogleProtobufEmpty> {
    req = serializeGoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ customer }/policies/groups:batchModify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Retrieve a group priority ordering for an app. The target app must be
   * supplied in `additionalTargetKeyNames` in the PolicyTargetKey. On failure
   * the request will return the error details as part of the google.rpc.Status.
   *
   * @param customer Required. ID of the Google Workspace account or literal "my_customer" for the customer associated to the request.
   */
  async customersPoliciesGroupsListGroupPriorityOrdering(customer: string, req: GoogleChromePolicyVersionsV1ListGroupPriorityOrderingRequest): Promise<GoogleChromePolicyVersionsV1ListGroupPriorityOrderingResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/policies/groups:listGroupPriorityOrdering`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleChromePolicyVersionsV1ListGroupPriorityOrderingResponse;
  }

  /**
   * Update a group priority ordering for an app. The target app must be
   * supplied in `additionalTargetKeyNames` in the PolicyTargetKey. On failure
   * the request will return the error details as part of the google.rpc.Status.
   *
   * @param customer Required. ID of the Google Workspace account or literal "my_customer" for the customer associated to the request.
   */
  async customersPoliciesGroupsUpdateGroupPriorityOrdering(customer: string, req: GoogleChromePolicyVersionsV1UpdateGroupPriorityOrderingRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/policies/groups:updateGroupPriorityOrdering`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Creates a certificate at a specified OU for a customer.
   *
   * @param customer Required. The customer for which the certificate will apply.
   */
  async customersPoliciesNetworksDefineCertificate(customer: string, req: GoogleChromePolicyVersionsV1DefineCertificateRequest): Promise<GoogleChromePolicyVersionsV1DefineCertificateResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/policies/networks:defineCertificate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleChromePolicyVersionsV1DefineCertificateResponse;
  }

  /**
   * Define a new network.
   *
   * @param customer Required. The customer who will own this new network.
   */
  async customersPoliciesNetworksDefineNetwork(customer: string, req: GoogleChromePolicyVersionsV1DefineNetworkRequest): Promise<GoogleChromePolicyVersionsV1DefineNetworkResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/policies/networks:defineNetwork`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleChromePolicyVersionsV1DefineNetworkResponse;
  }

  /**
   * Remove an existing certificate by guid.
   *
   * @param customer Required. The customer whose certificate will be removed.
   */
  async customersPoliciesNetworksRemoveCertificate(customer: string, req: GoogleChromePolicyVersionsV1RemoveCertificateRequest): Promise<GoogleChromePolicyVersionsV1RemoveCertificateResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/policies/networks:removeCertificate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleChromePolicyVersionsV1RemoveCertificateResponse;
  }

  /**
   * Remove an existing network by guid.
   *
   * @param customer Required. The customer whose network will be removed.
   */
  async customersPoliciesNetworksRemoveNetwork(customer: string, req: GoogleChromePolicyVersionsV1RemoveNetworkRequest): Promise<GoogleChromePolicyVersionsV1RemoveNetworkResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/policies/networks:removeNetwork`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleChromePolicyVersionsV1RemoveNetworkResponse;
  }

  /**
   * Modify multiple policy values that are applied to a specific org unit so
   * that they now inherit the value from a parent (if applicable). All targets
   * must have the same target format. That is to say that they must point to
   * the same target resource and must have the same keys specified in
   * `additionalTargetKeyNames`, though the values for those keys may be
   * different. On failure the request will return the error details as part of
   * the google.rpc.Status.
   *
   * @param customer ID of the G Suite account or literal "my_customer" for the customer associated to the request.
   */
  async customersPoliciesOrgunitsBatchInherit(customer: string, req: GoogleChromePolicyVersionsV1BatchInheritOrgUnitPoliciesRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/policies/orgunits:batchInherit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Modify multiple policy values that are applied to a specific org unit. All
   * targets must have the same target format. That is to say that they must
   * point to the same target resource and must have the same keys specified in
   * `additionalTargetKeyNames`, though the values for those keys may be
   * different. On failure the request will return the error details as part of
   * the google.rpc.Status.
   *
   * @param customer ID of the G Suite account or literal "my_customer" for the customer associated to the request.
   */
  async customersPoliciesOrgunitsBatchModify(customer: string, req: GoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest): Promise<GoogleProtobufEmpty> {
    req = serializeGoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ customer }/policies/orgunits:batchModify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets the resolved policy values for a list of policies that match a search
   * query.
   *
   * @param customer ID of the G Suite account or literal "my_customer" for the customer associated to the request.
   */
  async customersPoliciesResolve(customer: string, req: GoogleChromePolicyVersionsV1ResolveRequest): Promise<GoogleChromePolicyVersionsV1ResolveResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/policies:resolve`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleChromePolicyVersionsV1ResolveResponse;
  }

  /**
   * Get a specific policy schema for a customer by its resource name.
   *
   * @param name Required. The policy schema resource name to query.
   */
  async customersPolicySchemasGet(name: string): Promise<GoogleChromePolicyVersionsV1PolicySchema> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleChromePolicyVersionsV1PolicySchema;
  }

  /**
   * Gets a list of policy schemas that match a specified filter value for a
   * given customer.
   *
   * @param parent Required. The customer for which the listing request will apply.
   */
  async customersPolicySchemasList(parent: string, opts: CustomersPolicySchemasListOptions = {}): Promise<GoogleChromePolicyVersionsV1ListPolicySchemasResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/policySchemas`);
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
    return data as GoogleChromePolicyVersionsV1ListPolicySchemasResponse;
  }

  /**
   * Creates an enterprise file from the content provided by user. Returns a
   * public download url for end user.
   *
   * @param customer Required. The customer for which the file upload will apply.
   */
  async mediaUpload(customer: string, req: GoogleChromePolicyVersionsV1UploadPolicyFileRequest): Promise<GoogleChromePolicyVersionsV1UploadPolicyFileResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ customer }/policies/files:uploadPolicyFile`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleChromePolicyVersionsV1UploadPolicyFileResponse;
  }
}

export interface ChromeCrosDpanelAutosettingsProtoPolicyApiLifecycle {
  /**
   * In the event that this policy was deprecated in favor of another policy,
   * the fully qualified namespace(s) of the new policies as they will show in
   * PolicyAPI.
   */
  deprecatedInFavorOf?: string[];
  /**
   * Description about current life cycle.
   */
  description?: string;
  /**
   * End supporting date for current policy.
   */
  endSupport?: GoogleTypeDate;
  /**
   * Indicate current life cycle stage of the policy API.
   */
  policyApiLifecycleStage?:  | "API_UNSPECIFIED" | "API_PREVIEW" | "API_DEVELOPMENT" | "API_CURRENT" | "API_DEPRECATED";
}

/**
 * Additional options for ChromePolicy#customersPolicySchemasList.
 */
export interface CustomersPolicySchemasListOptions {
  /**
   * The schema filter used to find a particular schema based on fields like
   * its resource name, description and `additionalTargetKeyNames`.
   */
  filter?: string;
  /**
   * The maximum number of policy schemas to return, defaults to 100 and has a
   * maximum of 1000.
   */
  pageSize?: number;
  /**
   * The page token used to retrieve a specific page of the listing request.
   */
  pageToken?: string;
}

/**
 * Additional key names that will be used to identify the target of the policy
 * value.
 */
export interface GoogleChromePolicyVersionsV1AdditionalTargetKeyName {
  /**
   * Key name.
   */
  key?: string;
  /**
   * Key description.
   */
  keyDescription?: string;
}

/**
 * Request message for specifying that multiple policy values will be deleted.
 */
export interface GoogleChromePolicyVersionsV1BatchDeleteGroupPoliciesRequest {
  /**
   * List of policies that will be deleted as defined by the `requests`. All
   * requests in the list must follow these restrictions: 1. All schemas in the
   * list must have the same root namespace. 2. All
   * `policyTargetKey.targetResource` values must point to a group resource. 3.
   * All `policyTargetKey` values must have the same `app_id` key name in the
   * `additionalTargetKeys`. 4. No two modification requests can reference the
   * same `policySchema` + ` policyTargetKey` pair.
   */
  requests?: GoogleChromePolicyVersionsV1DeleteGroupPolicyRequest[];
}

/**
 * Request message for specifying that multiple policy values inherit their
 * value from their parents.
 */
export interface GoogleChromePolicyVersionsV1BatchInheritOrgUnitPoliciesRequest {
  /**
   * List of policies that have to inherit their values as defined by the
   * `requests`. All requests in the list must follow these restrictions: 1. All
   * schemas in the list must have the same root namespace. 2. All
   * `policyTargetKey.targetResource` values must point to an org unit resource.
   * 3. All `policyTargetKey` values must have the same key names in the `
   * additionalTargetKeys`. This also means if one of the targets has an empty
   * `additionalTargetKeys` map, all of the targets must have an empty
   * `additionalTargetKeys` map. 4. No two modification requests can reference
   * the same `policySchema` + ` policyTargetKey` pair.
   */
  requests?: GoogleChromePolicyVersionsV1InheritOrgUnitPolicyRequest[];
}

/**
 * Request message for modifying multiple policy values for a specific
 * group-based target.
 */
export interface GoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest {
  /**
   * List of policies to modify as defined by the `requests`. All requests in
   * the list must follow these restrictions: 1. All schemas in the list must
   * have the same root namespace. 2. All `policyTargetKey.targetResource`
   * values must point to a group resource. 3. All `policyTargetKey` values must
   * have the same `app_id` key name in the `additionalTargetKeys`. 4. No two
   * modification requests can reference the same `policySchema` + `
   * policyTargetKey` pair.
   */
  requests?: GoogleChromePolicyVersionsV1ModifyGroupPolicyRequest[];
}

function serializeGoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest(data: any): GoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeGoogleChromePolicyVersionsV1ModifyGroupPolicyRequest(item))) : undefined,
  };
}

function deserializeGoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest(data: any): GoogleChromePolicyVersionsV1BatchModifyGroupPoliciesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeGoogleChromePolicyVersionsV1ModifyGroupPolicyRequest(item))) : undefined,
  };
}

/**
 * Request message for modifying multiple policy values for a specific target.
 */
export interface GoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest {
  /**
   * List of policies to modify as defined by the `requests`. All requests in
   * the list must follow these restrictions: 1. All schemas in the list must
   * have the same root namespace. 2. All `policyTargetKey.targetResource`
   * values must point to an org unit resource. 3. All `policyTargetKey` values
   * must have the same key names in the ` additionalTargetKeys`. This also
   * means if one of the targets has an empty `additionalTargetKeys` map, all of
   * the targets must have an empty `additionalTargetKeys` map. 4. No two
   * modification requests can reference the same `policySchema` + `
   * policyTargetKey` pair.
   */
  requests?: GoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest[];
}

function serializeGoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest(data: any): GoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (serializeGoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest(item))) : undefined,
  };
}

function deserializeGoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest(data: any): GoogleChromePolicyVersionsV1BatchModifyOrgUnitPoliciesRequest {
  return {
    ...data,
    requests: data["requests"] !== undefined ? data["requests"].map((item: any) => (deserializeGoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest(item))) : undefined,
  };
}

/**
 * Error information for removing of a specific certificate on a specific
 * target. A reference to a certificate.
 */
export interface GoogleChromePolicyVersionsV1CertificateReference {
  /**
   * Output only. The name of the referencing network.
   */
  readonly network?: string;
  /**
   * Output only. The obfuscated id of the org unit the referencing network is
   * in.
   */
  readonly orgUnitId?: string;
}

/**
 * Request object for creating a certificate.
 */
export interface GoogleChromePolicyVersionsV1DefineCertificateRequest {
  /**
   * Optional. The optional name of the certificate. If not specified, the
   * certificate issuer will be used as the name.
   */
  ceritificateName?: string;
  /**
   * Required. The raw contents of the .PEM, .CRT, or .CER file.
   */
  certificate?: string;
  /**
   * Optional. Certificate settings within the chrome.networks.certificates
   * namespace.
   */
  settings?: GoogleChromePolicyVersionsV1NetworkSetting[];
  /**
   * Required. The target resource on which this certificate is applied. The
   * following resources are supported: * Organizational Unit
   * ("orgunits/{orgunit_id}")
   */
  targetResource?: string;
}

/**
 * Response object for creating a certificate.
 */
export interface GoogleChromePolicyVersionsV1DefineCertificateResponse {
  /**
   * The guid of the certificate created by the action.
   */
  networkId?: string;
  /**
   * the affiliated settings of the certificate (NOT IMPLEMENTED)
   */
  settings?: GoogleChromePolicyVersionsV1NetworkSetting[];
  /**
   * the resource at which the certificate is defined.
   */
  targetResource?: string;
}

/**
 * Request object for creating a new network.
 */
export interface GoogleChromePolicyVersionsV1DefineNetworkRequest {
  /**
   * Required. Name of the new created network.
   */
  name?: string;
  /**
   * Required. Detailed network settings.
   */
  settings?: GoogleChromePolicyVersionsV1NetworkSetting[];
  /**
   * Required. The target resource on which this new network will be defined.
   * The following resources are supported: * Organizational Unit
   * ("orgunits/{orgunit_id}")
   */
  targetResource?: string;
}

/**
 * Response object for creating a network.
 */
export interface GoogleChromePolicyVersionsV1DefineNetworkResponse {
  /**
   * Network ID of the new created network.
   */
  networkId?: string;
  /**
   * Detailed network settings of the new created network
   */
  settings?: GoogleChromePolicyVersionsV1NetworkSetting[];
  /**
   * The target resource on which this new network will be defined. The
   * following resources are supported: * Organizational Unit
   * ("orgunits/{orgunit_id}")
   */
  targetResource?: string;
}

/**
 * Request parameters for deleting the policy value of a specific group target.
 */
export interface GoogleChromePolicyVersionsV1DeleteGroupPolicyRequest {
  /**
   * The fully qualified name of the policy schema that is being inherited.
   */
  policySchema?: string;
  /**
   * Required. The key of the target for which we want to modify a policy. The
   * target resource must point to a Group.
   */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
}

/**
 * Information about any range constraints.
 */
export interface GoogleChromePolicyVersionsV1FieldConstraints {
  /**
   * The allowed range for numeric fields.
   */
  numericRangeConstraint?: GoogleChromePolicyVersionsV1NumericRangeConstraint;
}

function serializeGoogleChromePolicyVersionsV1FieldConstraints(data: any): GoogleChromePolicyVersionsV1FieldConstraints {
  return {
    ...data,
    numericRangeConstraint: data["numericRangeConstraint"] !== undefined ? serializeGoogleChromePolicyVersionsV1NumericRangeConstraint(data["numericRangeConstraint"]) : undefined,
  };
}

function deserializeGoogleChromePolicyVersionsV1FieldConstraints(data: any): GoogleChromePolicyVersionsV1FieldConstraints {
  return {
    ...data,
    numericRangeConstraint: data["numericRangeConstraint"] !== undefined ? deserializeGoogleChromePolicyVersionsV1NumericRangeConstraint(data["numericRangeConstraint"]) : undefined,
  };
}

/**
 * Request parameters for inheriting policy value of a specific org unit target
 * from the policy value of its parent org unit.
 */
export interface GoogleChromePolicyVersionsV1InheritOrgUnitPolicyRequest {
  /**
   * The fully qualified name of the policy schema that is being inherited.
   */
  policySchema?: string;
  /**
   * Required. The key of the target for which we want to modify a policy. The
   * target resource must point to an Org Unit.
   */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
}

/**
 * Request message for listing the group priority ordering of an app.
 */
export interface GoogleChromePolicyVersionsV1ListGroupPriorityOrderingRequest {
  /**
   * Required. The namespace of the policy type for the request.
   */
  policyNamespace?: string;
  /**
   * Required. The key of the target for which we want to retrieve the group
   * priority ordering. The target resource must point to an app.
   */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
}

/**
 * Response message for listing the group priority ordering of an app.
 */
export interface GoogleChromePolicyVersionsV1ListGroupPriorityOrderingResponse {
  /**
   * Output only. The group IDs, in priority ordering.
   */
  readonly groupIds?: string[];
  /**
   * Output only. The namespace of the policy type of the group IDs.
   */
  readonly policyNamespace?: string;
  /**
   * Output only. The target resource for which the group priority ordering has
   * been retrieved.
   */
  readonly policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
}

/**
 * Response message for listing policy schemas that match a filter.
 */
export interface GoogleChromePolicyVersionsV1ListPolicySchemasResponse {
  /**
   * The page token used to get the next page of policy schemas.
   */
  nextPageToken?: string;
  /**
   * The list of policy schemas that match the query.
   */
  policySchemas?: GoogleChromePolicyVersionsV1PolicySchema[];
}

/**
 * Request parameters for modifying a policy value for a specific group target.
 */
export interface GoogleChromePolicyVersionsV1ModifyGroupPolicyRequest {
  /**
   * Required. The key of the target for which we want to modify a policy. The
   * target resource must point to a Group.
   */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /**
   * The new value for the policy.
   */
  policyValue?: GoogleChromePolicyVersionsV1PolicyValue;
  /**
   * Required. Policy fields to update. Only fields in this mask will be
   * updated; other fields in `policy_value` will be ignored (even if they have
   * values). If a field is in this list it must have a value in 'policy_value'.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleChromePolicyVersionsV1ModifyGroupPolicyRequest(data: any): GoogleChromePolicyVersionsV1ModifyGroupPolicyRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleChromePolicyVersionsV1ModifyGroupPolicyRequest(data: any): GoogleChromePolicyVersionsV1ModifyGroupPolicyRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request parameters for modifying a policy value for a specific org unit
 * target.
 */
export interface GoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest {
  /**
   * Required. The key of the target for which we want to modify a policy. The
   * target resource must point to an Org Unit.
   */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /**
   * The new value for the policy.
   */
  policyValue?: GoogleChromePolicyVersionsV1PolicyValue;
  /**
   * Required. Policy fields to update. Only fields in this mask will be
   * updated; other fields in `policy_value` will be ignored (even if they have
   * values). If a field is in this list it must have a value in 'policy_value'.
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest(data: any): GoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest(data: any): GoogleChromePolicyVersionsV1ModifyOrgUnitPolicyRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A network setting contains network configurations.
 */
export interface GoogleChromePolicyVersionsV1NetworkSetting {
  /**
   * The fully qualified name of the network setting.
   */
  policySchema?: string;
  /**
   * The value of the network setting.
   */
  value?: {
    [key: string]: any
  };
}

/**
 * A constraint on upper and/or lower bounds, with at least one being set.
 */
export interface GoogleChromePolicyVersionsV1NumericRangeConstraint {
  /**
   * Maximum value.
   */
  maximum?: bigint;
  /**
   * Minimum value.
   */
  minimum?: bigint;
}

function serializeGoogleChromePolicyVersionsV1NumericRangeConstraint(data: any): GoogleChromePolicyVersionsV1NumericRangeConstraint {
  return {
    ...data,
    maximum: data["maximum"] !== undefined ? String(data["maximum"]) : undefined,
    minimum: data["minimum"] !== undefined ? String(data["minimum"]) : undefined,
  };
}

function deserializeGoogleChromePolicyVersionsV1NumericRangeConstraint(data: any): GoogleChromePolicyVersionsV1NumericRangeConstraint {
  return {
    ...data,
    maximum: data["maximum"] !== undefined ? BigInt(data["maximum"]) : undefined,
    minimum: data["minimum"] !== undefined ? BigInt(data["minimum"]) : undefined,
  };
}

/**
 * Error information for a modification request of a specific policy on a
 * specific target.
 */
export interface GoogleChromePolicyVersionsV1PolicyModificationError {
  /**
   * Output only. The non-field errors related to the modification.
   */
  readonly errors?: string[];
  /**
   * Output only. The error messages related to the modification.
   */
  readonly fieldErrors?: GoogleChromePolicyVersionsV1PolicyModificationFieldError[];
  /**
   * Output only. The specific policy schema modification that had an error.
   */
  readonly policySchema?: string;
  /**
   * Output only. The specific policy target modification that had error.
   */
  readonly policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
}

/**
 * Details of the errors encountered during a policy modification request. This
 * message will be returned as part of the details of a google.rpc.Status
 * returned to the user when there is an error in their request.
 */
export interface GoogleChromePolicyVersionsV1PolicyModificationErrorDetails {
  /**
   * Output only. List of specific policy modifications errors that may have
   * occurred during a modifying request.
   */
  readonly modificationErrors?: GoogleChromePolicyVersionsV1PolicyModificationError[];
}

/**
 * Error information for a modification request of a specific field on a
 * specific policy.
 */
export interface GoogleChromePolicyVersionsV1PolicyModificationFieldError {
  /**
   * Output only. The error message related to the field.
   */
  readonly error?: string;
  /**
   * Output only. The name of the field with the error.
   */
  readonly field?: string;
}

/**
 * Resource representing a policy schema.
 */
export interface GoogleChromePolicyVersionsV1PolicySchema {
  /**
   * Output only. Specific access restrictions related to this policy.
   */
  readonly accessRestrictions?: string[];
  /**
   * Output only. Additional key names that will be used to identify the target
   * of the policy value. When specifying a `policyTargetKey`, each of the
   * additional keys specified here will have to be included in the
   * `additionalTargetKeys` map.
   */
  readonly additionalTargetKeyNames?: GoogleChromePolicyVersionsV1AdditionalTargetKeyName[];
  /**
   * Title of the category in which a setting belongs.
   */
  categoryTitle?: string;
  /**
   * Schema definition using proto descriptor.
   */
  definition?: Proto2FileDescriptorProto;
  /**
   * Output only. Detailed description of each field that is part of the
   * schema.
   */
  readonly fieldDescriptions?: GoogleChromePolicyVersionsV1PolicySchemaFieldDescription[];
  /**
   * Format: name=customers/{customer}/policySchemas/{schema_namespace}
   */
  name?: string;
  /**
   * Output only. Special notice messages related to setting certain values in
   * certain fields in the schema.
   */
  readonly notices?: GoogleChromePolicyVersionsV1PolicySchemaNoticeDescription[];
  /**
   * Output only. Current lifecycle information.
   */
  readonly policyApiLifecycle?: ChromeCrosDpanelAutosettingsProtoPolicyApiLifecycle;
  /**
   * Output only. Description about the policy schema for user consumption.
   */
  readonly policyDescription?: string;
  /**
   * Output only. The fully qualified name of the policy schema. This value is
   * used to fill the field `policy_schema` in PolicyValue when calling
   * BatchInheritOrgUnitPolicies BatchModifyOrgUnitPolicies
   * BatchModifyGroupPolicies or BatchDeleteGroupPolicies.
   */
  readonly schemaName?: string;
  /**
   * Output only. URI to related support article for this schema.
   */
  readonly supportUri?: string;
  /**
   * Output only. Information about applicable target resources for the policy.
   */
  readonly validTargetResources?:  | "TARGET_RESOURCE_UNSPECIFIED" | "ORG_UNIT" | "GROUP"[];
}

/**
 * The field and the value it must have for another field to be allowed to be
 * set.
 */
export interface GoogleChromePolicyVersionsV1PolicySchemaFieldDependencies {
  /**
   * The source field which this field depends on.
   */
  sourceField?: string;
  /**
   * The value which the source field must have for this field to be allowed to
   * be set.
   */
  sourceFieldValue?: string;
}

/**
 * Provides detailed information for a particular field that is part of a
 * PolicySchema.
 */
export interface GoogleChromePolicyVersionsV1PolicySchemaFieldDescription {
  /**
   * Output only. Client default if the policy is unset.
   */
  readonly defaultValue?: any;
  /**
   * Deprecated. Use name and field_description instead. The description for
   * the field.
   */
  description?: string;
  /**
   * Output only. The name of the field for associated with this description.
   */
  readonly field?: string;
  /**
   * Output only. Information on any input constraints associated on the values
   * for the field.
   */
  readonly fieldConstraints?: GoogleChromePolicyVersionsV1FieldConstraints;
  /**
   * Output only. Provides a list of fields and values. At least one of the
   * fields must have the corresponding value in order for this field to be
   * allowed to be set.
   */
  readonly fieldDependencies?: GoogleChromePolicyVersionsV1PolicySchemaFieldDependencies[];
  /**
   * Output only. The description of the field.
   */
  readonly fieldDescription?: string;
  /**
   * Output only. Any input constraints associated on the values for the field.
   */
  readonly inputConstraint?: string;
  /**
   * Output only. If the field has a set of known values, this field will
   * provide a description for these values.
   */
  readonly knownValueDescriptions?: GoogleChromePolicyVersionsV1PolicySchemaFieldKnownValueDescription[];
  /**
   * Output only. The name of the field.
   */
  readonly name?: string;
  /**
   * Output only. Provides the description of the fields nested in this field,
   * if the field is a message type that defines multiple fields.
   */
  readonly nestedFieldDescriptions?: GoogleChromePolicyVersionsV1PolicySchemaFieldDescription[];
  /**
   * Output only. Provides a list of fields that are required to be set if this
   * field has a certain value.
   */
  readonly requiredItems?: GoogleChromePolicyVersionsV1PolicySchemaRequiredItems[];
}

/**
 * Provides detailed information about a known value that is allowed for a
 * particular field in a PolicySchema.
 */
export interface GoogleChromePolicyVersionsV1PolicySchemaFieldKnownValueDescription {
  /**
   * Output only. Additional description for this value.
   */
  readonly description?: string;
  /**
   * Output only. The string represenstation of the value that can be set for
   * the field.
   */
  readonly value?: string;
}

/**
 * Provides special notice messages related to a particular value in a field
 * that is part of a PolicySchema.
 */
export interface GoogleChromePolicyVersionsV1PolicySchemaNoticeDescription {
  /**
   * Output only. Whether the user needs to acknowledge the notice message
   * before the value can be set.
   */
  readonly acknowledgementRequired?: boolean;
  /**
   * Output only. The field name associated with the notice.
   */
  readonly field?: string;
  /**
   * Output only. The notice message associate with the value of the field.
   */
  readonly noticeMessage?: string;
  /**
   * Output only. The value of the field that has a notice. When setting the
   * field to this value, the user may be required to acknowledge the notice
   * message in order for the value to be set.
   */
  readonly noticeValue?: string;
}

/**
 * The fields that will become required based on the value of this field.
 */
export interface GoogleChromePolicyVersionsV1PolicySchemaRequiredItems {
  /**
   * The value(s) of the field that provoke required field enforcement. An
   * empty field_conditions implies that any value assigned to this field will
   * provoke required field enforcement.
   */
  fieldConditions?: string[];
  /**
   * The fields that are required as a consequence of the field conditions.
   */
  requiredFields?: string[];
}

/**
 * The key used to identify the target on which the policy will be applied.
 */
export interface GoogleChromePolicyVersionsV1PolicyTargetKey {
  /**
   * Map containing the additional target key name and value pairs used to
   * further identify the target of the policy.
   */
  additionalTargetKeys?: {
    [key: string]: string
  };
  /**
   * The target resource on which this policy is applied. The following
   * resources are supported: * Organizational Unit ("orgunits/{orgunit_id}") *
   * Group ("groups/{group_id}")
   */
  targetResource?: string;
}

/**
 * A particular value for a policy managed by the service.
 */
export interface GoogleChromePolicyVersionsV1PolicyValue {
  /**
   * The fully qualified name of the policy schema associated with this policy.
   */
  policySchema?: string;
  /**
   * The value of the policy that is compatible with the schema that it is
   * associated with.
   */
  value?: {
    [key: string]: any
  };
}

/**
 * Details of the errors encountered during a remove certificate request. This
 * message will be returned as part of the details of a google.rpc.Status
 * returned to the user when there is an error in their request.
 */
export interface GoogleChromePolicyVersionsV1RemoveCertificateErrorDetails {
  /**
   * Output only. If the certificate was not removed, a list of references to
   * the certificate that prevented it from being removed. Only unreferenced
   * certificates can be removed.
   */
  readonly certificateReferences?: GoogleChromePolicyVersionsV1CertificateReference[];
}

/**
 * Request object for removing a certificate.
 */
export interface GoogleChromePolicyVersionsV1RemoveCertificateRequest {
  /**
   * Required. The GUID of the certificate to remove.
   */
  networkId?: string;
  /**
   * Required. The target resource on which this certificate will be removed.
   * The following resources are supported: * Organizational Unit
   * ("orgunits/{orgunit_id}")
   */
  targetResource?: string;
}

/**
 * Response object for removing a certificate.
 */
export interface GoogleChromePolicyVersionsV1RemoveCertificateResponse {
}

/**
 * Request object for removing a network
 */
export interface GoogleChromePolicyVersionsV1RemoveNetworkRequest {
  /**
   * Required. The GUID of the network to remove.
   */
  networkId?: string;
  /**
   * Required. The target resource on which this network will be removed. The
   * following resources are supported: * Organizational Unit
   * ("orgunits/{orgunit_id}")
   */
  targetResource?: string;
}

/**
 * Response object for removing a network.
 */
export interface GoogleChromePolicyVersionsV1RemoveNetworkResponse {
}

/**
 * The resolved value of a policy for a given target.
 */
export interface GoogleChromePolicyVersionsV1ResolvedPolicy {
  /**
   * Output only. The added source key establishes at which level an entity was
   * explicitly added for management. This is useful for certain type of
   * policies that are only applied if they are explicitly added for management.
   * For example: apps and networks. An entity can only be deleted from
   * management in an Organizational Unit that it was explicitly added to. If
   * this is not present it means that the policy is managed without the need to
   * explicitly add an entity, for example: standard user or device policies.
   */
  readonly addedSourceKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /**
   * Output only. The source resource from which this policy value is obtained.
   * May be the same as `targetKey` if the policy is directly modified on the
   * target, otherwise it would be another resource from which the policy gets
   * its value (if applicable). If not present, the source is the default value
   * for the customer.
   */
  readonly sourceKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /**
   * Output only. The target resource for which the resolved policy value
   * applies.
   */
  readonly targetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
  /**
   * Output only. The resolved value of the policy.
   */
  readonly value?: GoogleChromePolicyVersionsV1PolicyValue;
}

/**
 * Request message for getting the resolved policy value for a specific target.
 */
export interface GoogleChromePolicyVersionsV1ResolveRequest {
  /**
   * The maximum number of policies to return, defaults to 100 and has a
   * maximum of 1000.
   */
  pageSize?: number;
  /**
   * The page token used to retrieve a specific page of the request.
   */
  pageToken?: string;
  /**
   * Required. The schema filter to apply to the resolve request. Specify a
   * schema name to view a particular schema, for example:
   * chrome.users.ShowLogoutButton Wildcards are supported, but only in the leaf
   * portion of the schema name. Wildcards cannot be used in namespace directly.
   * Please read
   * https://developers.google.com/chrome/policy/guides/policy-schemas for
   * details on schema namespaces. For example: Valid: "chrome.users.*",
   * "chrome.users.apps.*", "chrome.printers.*" Invalid: "*", "*.users",
   * "chrome.*", "chrome.*.apps.*"
   */
  policySchemaFilter?: string;
  /**
   * Required. The key of the target resource on which the policies should be
   * resolved.
   */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
}

/**
 * Response message for getting the resolved policy value for a specific
 * target.
 */
export interface GoogleChromePolicyVersionsV1ResolveResponse {
  /**
   * The page token used to get the next set of resolved policies found by the
   * request.
   */
  nextPageToken?: string;
  /**
   * The list of resolved policies found by the resolve request.
   */
  resolvedPolicies?: GoogleChromePolicyVersionsV1ResolvedPolicy[];
}

/**
 * Request message for updating the group priority ordering of an app.
 */
export interface GoogleChromePolicyVersionsV1UpdateGroupPriorityOrderingRequest {
  /**
   * Required. The group IDs, in desired priority ordering.
   */
  groupIds?: string[];
  /**
   * Required. The namespace of the policy type for the request.
   */
  policyNamespace?: string;
  /**
   * Required. The key of the target for which we want to update the group
   * priority ordering. The target resource must point to an app.
   */
  policyTargetKey?: GoogleChromePolicyVersionsV1PolicyTargetKey;
}

/**
 * Request message for uploading a file for a policy.
 */
export interface GoogleChromePolicyVersionsV1UploadPolicyFileRequest {
  /**
   * Required. The fully qualified policy schema and field name this file is
   * uploaded for. This information will be used to validate the content type of
   * the file.
   */
  policyField?: string;
}

/**
 * Response message for downloading an uploaded file.
 */
export interface GoogleChromePolicyVersionsV1UploadPolicyFileResponse {
  /**
   * The uri for end user to download the file.
   */
  downloadUri?: string;
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
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following: * A full date, with non-zero year, month, and day values. * A
 * month and day, with a zero year (for example, an anniversary). * A year on
 * its own, with a zero month and a zero day. * A year and month, with a zero
 * day (for example, a credit card expiration date). Related types: *
 * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp
 */
export interface GoogleTypeDate {
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  day?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  month?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  year?: number;
}

/**
 * Describes a message type.
 */
export interface Proto2DescriptorProto {
  enumType?: Proto2EnumDescriptorProto[];
  field?: Proto2FieldDescriptorProto[];
  name?: string;
  nestedType?: Proto2DescriptorProto[];
  oneofDecl?: Proto2OneofDescriptorProto[];
}

/**
 * Describes an enum type.
 */
export interface Proto2EnumDescriptorProto {
  name?: string;
  value?: Proto2EnumValueDescriptorProto[];
}

/**
 * Describes a value within an enum.
 */
export interface Proto2EnumValueDescriptorProto {
  name?: string;
  number?: number;
}

/**
 * Describes a field within a message.
 */
export interface Proto2FieldDescriptorProto {
  /**
   * For numeric types, contains the original text representation of the value.
   * For booleans, "true" or "false". For strings, contains the default text
   * contents (not escaped in any way). For bytes, contains the C escaped value.
   * All bytes >= 128 are escaped.
   */
  defaultValue?: string;
  /**
   * JSON name of this field. The value is set by protocol compiler. If the
   * user has set a "json_name" option on this field, that option's value will
   * be used. Otherwise, it's deduced from the field's name by converting it to
   * camelCase.
   */
  jsonName?: string;
  label?:  | "LABEL_OPTIONAL" | "LABEL_REQUIRED" | "LABEL_REPEATED";
  name?: string;
  number?: number;
  /**
   * If set, gives the index of a oneof in the containing type's oneof_decl
   * list. This field is a member of that oneof.
   */
  oneofIndex?: number;
  /**
   * If true, this is a proto3 "optional". When a proto3 field is optional, it
   * tracks presence regardless of field type. When proto3_optional is true,
   * this field must be belong to a oneof to signal to old proto3 clients that
   * presence is tracked for this field. This oneof is known as a "synthetic"
   * oneof, and this field must be its sole member (each proto3 optional field
   * gets its own synthetic oneof). Synthetic oneofs exist in the descriptor
   * only, and do not generate any API. Synthetic oneofs must be ordered after
   * all "real" oneofs. For message fields, proto3_optional doesn't create any
   * semantic change, since non-repeated message fields always track presence.
   * However it still indicates the semantic detail of whether the user wrote
   * "optional" or not. This can be useful for round-tripping the .proto file.
   * For consistency we give message fields a synthetic oneof also, even though
   * it is not required to track presence. This is especially important because
   * the parser can't tell if a field is a message or an enum, so it must always
   * create a synthetic oneof. Proto2 optional fields do not set this flag,
   * because they already indicate optional with `LABEL_OPTIONAL`.
   */
  proto3Optional?: boolean;
  /**
   * If type_name is set, this need not be set. If both this and type_name are
   * set, this must be one of TYPE_ENUM, TYPE_MESSAGE or TYPE_GROUP.
   */
  type?:  | "TYPE_DOUBLE" | "TYPE_FLOAT" | "TYPE_INT64" | "TYPE_UINT64" | "TYPE_INT32" | "TYPE_FIXED64" | "TYPE_FIXED32" | "TYPE_BOOL" | "TYPE_STRING" | "TYPE_GROUP" | "TYPE_MESSAGE" | "TYPE_BYTES" | "TYPE_UINT32" | "TYPE_ENUM" | "TYPE_SFIXED32" | "TYPE_SFIXED64" | "TYPE_SINT32" | "TYPE_SINT64";
  /**
   * For message and enum types, this is the name of the type. If the name
   * starts with a '.', it is fully-qualified. Otherwise, C++-like scoping rules
   * are used to find the type (i.e. first the nested types within this message
   * are searched, then within the parent, on up to the root namespace).
   */
  typeName?: string;
}

/**
 * Describes a complete .proto file.
 */
export interface Proto2FileDescriptorProto {
  enumType?: Proto2EnumDescriptorProto[];
  /**
   * All top-level definitions in this file.
   */
  messageType?: Proto2DescriptorProto[];
  /**
   * file name, relative to root of source tree
   */
  name?: string;
  /**
   * e.g. "foo", "foo.bar", etc.
   */
  package?: string;
  /**
   * The syntax of the proto file. The supported values are "proto2", "proto3",
   * and "editions". If `edition` is present, this value must be "editions".
   */
  syntax?: string;
}

/**
 * Describes a oneof.
 */
export interface Proto2OneofDescriptorProto {
  name?: string;
}