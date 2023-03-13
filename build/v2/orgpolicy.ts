// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Organization Policy API Client for Deno
 * =======================================
 * 
 * The Org Policy API allows users to configure governance rules on their GCP resources across the Cloud Resource Hierarchy.
 * 
 * Docs: https://cloud.google.com/orgpolicy/docs/reference/rest/index.html
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Org Policy API allows users to configure governance rules on their GCP
 * resources across the Cloud Resource Hierarchy.
 */
export class orgPolicy {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://orgpolicy.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Lists constraints that could be applied on the specified resource.
   *
   * @param parent Required. The Google Cloud resource that parents the constraint. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`
   */
  async foldersConstraintsList(parent: string, opts: FoldersConstraintsListOptions = {}): Promise<GoogleCloudOrgpolicyV2ListConstraintsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/constraints`);
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
    return data as GoogleCloudOrgpolicyV2ListConstraintsResponse;
  }

  /**
   * Creates a policy. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the constraint does not exist. Returns a
   * `google.rpc.Status` with `google.rpc.Code.ALREADY_EXISTS` if the policy
   * already exists on the given Google Cloud resource.
   *
   * @param parent Required. The Google Cloud resource that will parent the new policy. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`
   */
  async foldersPoliciesCreate(parent: string, req: GoogleCloudOrgpolicyV2Policy): Promise<GoogleCloudOrgpolicyV2Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/policies`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudOrgpolicyV2Policy;
  }

  /**
   * Deletes a policy. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the constraint or organization policy does
   * not exist.
   *
   * @param name Required. Name of the policy to delete. See the policy entry for naming rules.
   */
  async foldersPoliciesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a policy on a resource. If no policy is set on the resource,
   * `NOT_FOUND` is returned. The `etag` value can be used with `UpdatePolicy()`
   * to update a policy during read-modify-write.
   *
   * @param name Required. Resource name of the policy. See `Policy` for naming requirements.
   */
  async foldersPoliciesGet(name: string): Promise<GoogleCloudOrgpolicyV2Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudOrgpolicyV2Policy;
  }

  /**
   * Gets the effective policy on a resource. This is the result of merging
   * policies in the resource hierarchy and evaluating conditions. The returned
   * policy will not have an `etag` or `condition` set because it is an
   * evaluated policy across multiple resources. Subtrees of Resource Manager
   * resource hierarchy with 'under:' prefix will not be expanded.
   *
   * @param name Required. The effective policy to compute. See `Policy` for naming rules.
   */
  async foldersPoliciesGetEffectivePolicy(name: string): Promise<GoogleCloudOrgpolicyV2Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:getEffectivePolicy`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudOrgpolicyV2Policy;
  }

  /**
   * Retrieves all of the policies that exist on a particular resource.
   *
   * @param parent Required. The target Google Cloud resource that parents the set of constraints and policies that will be returned from this call. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`
   */
  async foldersPoliciesList(parent: string, opts: FoldersPoliciesListOptions = {}): Promise<GoogleCloudOrgpolicyV2ListPoliciesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/policies`);
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
    return data as GoogleCloudOrgpolicyV2ListPoliciesResponse;
  }

  /**
   * Updates a policy. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the constraint or the policy do not exist.
   * Returns a `google.rpc.Status` with `google.rpc.Code.ABORTED` if the etag
   * supplied in the request does not match the persisted etag of the policy
   * Note: the supplied policy will perform a full overwrite of all fields.
   *
   * @param name Immutable. The resource name of the policy. Must be one of the following forms, where constraint_name is the name of the constraint which this policy configures: * `projects/{project_number}/policies/{constraint_name}` * `folders/{folder_id}/policies/{constraint_name}` * `organizations/{organization_id}/policies/{constraint_name}` For example, "projects/123/policies/compute.disableSerialPortAccess". Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number.
   */
  async foldersPoliciesPatch(name: string, req: GoogleCloudOrgpolicyV2Policy, opts: FoldersPoliciesPatchOptions = {}): Promise<GoogleCloudOrgpolicyV2Policy> {
    opts = serializeFoldersPoliciesPatchOptions(opts);
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
    return data as GoogleCloudOrgpolicyV2Policy;
  }

  /**
   * Lists constraints that could be applied on the specified resource.
   *
   * @param parent Required. The Google Cloud resource that parents the constraint. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`
   */
  async organizationsConstraintsList(parent: string, opts: OrganizationsConstraintsListOptions = {}): Promise<GoogleCloudOrgpolicyV2ListConstraintsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/constraints`);
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
    return data as GoogleCloudOrgpolicyV2ListConstraintsResponse;
  }

  /**
   * Creates a custom constraint. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the organization does not exist. Returns a
   * `google.rpc.Status` with `google.rpc.Code.ALREADY_EXISTS` if the constraint
   * already exists on the given organization.
   *
   * @param parent Required. Must be in the following form: * `organizations/{organization_id}`
   */
  async organizationsCustomConstraintsCreate(parent: string, req: GoogleCloudOrgpolicyV2CustomConstraint): Promise<GoogleCloudOrgpolicyV2CustomConstraint> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/customConstraints`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudOrgpolicyV2CustomConstraint;
  }

  /**
   * Deletes a custom constraint. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the constraint does not exist.
   *
   * @param name Required. Name of the custom constraint to delete. See the custom constraint entry for naming rules.
   */
  async organizationsCustomConstraintsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a custom constraint. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the custom constraint does not exist.
   *
   * @param name Required. Resource name of the custom constraint. See the custom constraint entry for naming requirements.
   */
  async organizationsCustomConstraintsGet(name: string): Promise<GoogleCloudOrgpolicyV2CustomConstraint> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudOrgpolicyV2CustomConstraint;
  }

  /**
   * Retrieves all of the custom constraints that exist on a particular
   * organization resource.
   *
   * @param parent Required. The target Google Cloud resource that parents the set of custom constraints that will be returned from this call. Must be in one of the following forms: * `organizations/{organization_id}`
   */
  async organizationsCustomConstraintsList(parent: string, opts: OrganizationsCustomConstraintsListOptions = {}): Promise<GoogleCloudOrgpolicyV2ListCustomConstraintsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/customConstraints`);
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
    return data as GoogleCloudOrgpolicyV2ListCustomConstraintsResponse;
  }

  /**
   * Updates a custom constraint. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the constraint does not exist. Note: the
   * supplied policy will perform a full overwrite of all fields.
   *
   * @param name Immutable. Name of the constraint. This is unique within the organization. Format of the name should be * `organizations/{organization_id}/customConstraints/{custom_constraint_id}` Example: `organizations/123/customConstraints/custom.createOnlyE2TypeVms` The max length is 70 characters and the minimum length is 1. Note that the prefix `organizations/{organization_id}/customConstraints/` is not counted.
   */
  async organizationsCustomConstraintsPatch(name: string, req: GoogleCloudOrgpolicyV2CustomConstraint): Promise<GoogleCloudOrgpolicyV2CustomConstraint> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudOrgpolicyV2CustomConstraint;
  }

  /**
   * Creates a policy. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the constraint does not exist. Returns a
   * `google.rpc.Status` with `google.rpc.Code.ALREADY_EXISTS` if the policy
   * already exists on the given Google Cloud resource.
   *
   * @param parent Required. The Google Cloud resource that will parent the new policy. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`
   */
  async organizationsPoliciesCreate(parent: string, req: GoogleCloudOrgpolicyV2Policy): Promise<GoogleCloudOrgpolicyV2Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/policies`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudOrgpolicyV2Policy;
  }

  /**
   * Deletes a policy. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the constraint or organization policy does
   * not exist.
   *
   * @param name Required. Name of the policy to delete. See the policy entry for naming rules.
   */
  async organizationsPoliciesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a policy on a resource. If no policy is set on the resource,
   * `NOT_FOUND` is returned. The `etag` value can be used with `UpdatePolicy()`
   * to update a policy during read-modify-write.
   *
   * @param name Required. Resource name of the policy. See `Policy` for naming requirements.
   */
  async organizationsPoliciesGet(name: string): Promise<GoogleCloudOrgpolicyV2Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudOrgpolicyV2Policy;
  }

  /**
   * Gets the effective policy on a resource. This is the result of merging
   * policies in the resource hierarchy and evaluating conditions. The returned
   * policy will not have an `etag` or `condition` set because it is an
   * evaluated policy across multiple resources. Subtrees of Resource Manager
   * resource hierarchy with 'under:' prefix will not be expanded.
   *
   * @param name Required. The effective policy to compute. See `Policy` for naming rules.
   */
  async organizationsPoliciesGetEffectivePolicy(name: string): Promise<GoogleCloudOrgpolicyV2Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:getEffectivePolicy`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudOrgpolicyV2Policy;
  }

  /**
   * Retrieves all of the policies that exist on a particular resource.
   *
   * @param parent Required. The target Google Cloud resource that parents the set of constraints and policies that will be returned from this call. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`
   */
  async organizationsPoliciesList(parent: string, opts: OrganizationsPoliciesListOptions = {}): Promise<GoogleCloudOrgpolicyV2ListPoliciesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/policies`);
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
    return data as GoogleCloudOrgpolicyV2ListPoliciesResponse;
  }

  /**
   * Updates a policy. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the constraint or the policy do not exist.
   * Returns a `google.rpc.Status` with `google.rpc.Code.ABORTED` if the etag
   * supplied in the request does not match the persisted etag of the policy
   * Note: the supplied policy will perform a full overwrite of all fields.
   *
   * @param name Immutable. The resource name of the policy. Must be one of the following forms, where constraint_name is the name of the constraint which this policy configures: * `projects/{project_number}/policies/{constraint_name}` * `folders/{folder_id}/policies/{constraint_name}` * `organizations/{organization_id}/policies/{constraint_name}` For example, "projects/123/policies/compute.disableSerialPortAccess". Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number.
   */
  async organizationsPoliciesPatch(name: string, req: GoogleCloudOrgpolicyV2Policy, opts: OrganizationsPoliciesPatchOptions = {}): Promise<GoogleCloudOrgpolicyV2Policy> {
    opts = serializeOrganizationsPoliciesPatchOptions(opts);
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
    return data as GoogleCloudOrgpolicyV2Policy;
  }

  /**
   * Lists constraints that could be applied on the specified resource.
   *
   * @param parent Required. The Google Cloud resource that parents the constraint. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`
   */
  async projectsConstraintsList(parent: string, opts: ProjectsConstraintsListOptions = {}): Promise<GoogleCloudOrgpolicyV2ListConstraintsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/constraints`);
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
    return data as GoogleCloudOrgpolicyV2ListConstraintsResponse;
  }

  /**
   * Creates a policy. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the constraint does not exist. Returns a
   * `google.rpc.Status` with `google.rpc.Code.ALREADY_EXISTS` if the policy
   * already exists on the given Google Cloud resource.
   *
   * @param parent Required. The Google Cloud resource that will parent the new policy. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`
   */
  async projectsPoliciesCreate(parent: string, req: GoogleCloudOrgpolicyV2Policy): Promise<GoogleCloudOrgpolicyV2Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/policies`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudOrgpolicyV2Policy;
  }

  /**
   * Deletes a policy. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the constraint or organization policy does
   * not exist.
   *
   * @param name Required. Name of the policy to delete. See the policy entry for naming rules.
   */
  async projectsPoliciesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a policy on a resource. If no policy is set on the resource,
   * `NOT_FOUND` is returned. The `etag` value can be used with `UpdatePolicy()`
   * to update a policy during read-modify-write.
   *
   * @param name Required. Resource name of the policy. See `Policy` for naming requirements.
   */
  async projectsPoliciesGet(name: string): Promise<GoogleCloudOrgpolicyV2Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudOrgpolicyV2Policy;
  }

  /**
   * Gets the effective policy on a resource. This is the result of merging
   * policies in the resource hierarchy and evaluating conditions. The returned
   * policy will not have an `etag` or `condition` set because it is an
   * evaluated policy across multiple resources. Subtrees of Resource Manager
   * resource hierarchy with 'under:' prefix will not be expanded.
   *
   * @param name Required. The effective policy to compute. See `Policy` for naming rules.
   */
  async projectsPoliciesGetEffectivePolicy(name: string): Promise<GoogleCloudOrgpolicyV2Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:getEffectivePolicy`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudOrgpolicyV2Policy;
  }

  /**
   * Retrieves all of the policies that exist on a particular resource.
   *
   * @param parent Required. The target Google Cloud resource that parents the set of constraints and policies that will be returned from this call. Must be in one of the following forms: * `projects/{project_number}` * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`
   */
  async projectsPoliciesList(parent: string, opts: ProjectsPoliciesListOptions = {}): Promise<GoogleCloudOrgpolicyV2ListPoliciesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/policies`);
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
    return data as GoogleCloudOrgpolicyV2ListPoliciesResponse;
  }

  /**
   * Updates a policy. Returns a `google.rpc.Status` with
   * `google.rpc.Code.NOT_FOUND` if the constraint or the policy do not exist.
   * Returns a `google.rpc.Status` with `google.rpc.Code.ABORTED` if the etag
   * supplied in the request does not match the persisted etag of the policy
   * Note: the supplied policy will perform a full overwrite of all fields.
   *
   * @param name Immutable. The resource name of the policy. Must be one of the following forms, where constraint_name is the name of the constraint which this policy configures: * `projects/{project_number}/policies/{constraint_name}` * `folders/{folder_id}/policies/{constraint_name}` * `organizations/{organization_id}/policies/{constraint_name}` For example, "projects/123/policies/compute.disableSerialPortAccess". Note: `projects/{project_id}/policies/{constraint_name}` is also an acceptable name for API requests, but responses will return the name using the equivalent project number.
   */
  async projectsPoliciesPatch(name: string, req: GoogleCloudOrgpolicyV2Policy, opts: ProjectsPoliciesPatchOptions = {}): Promise<GoogleCloudOrgpolicyV2Policy> {
    opts = serializeProjectsPoliciesPatchOptions(opts);
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
    return data as GoogleCloudOrgpolicyV2Policy;
  }
}

/**
 * Additional options for orgPolicy#foldersConstraintsList.
 */
export interface FoldersConstraintsListOptions {
  /**
   * Size of the pages to be returned. This is currently unsupported and will
   * be ignored. The server may at any point start using this field to limit
   * page size.
   */
  pageSize?: number;
  /**
   * Page token used to retrieve the next page. This is currently unsupported
   * and will be ignored. The server may at any point start using this field.
   */
  pageToken?: string;
}

/**
 * Additional options for orgPolicy#foldersPoliciesList.
 */
export interface FoldersPoliciesListOptions {
  /**
   * Size of the pages to be returned. This is currently unsupported and will
   * be ignored. The server may at any point start using this field to limit
   * page size.
   */
  pageSize?: number;
  /**
   * Page token used to retrieve the next page. This is currently unsupported
   * and will be ignored. The server may at any point start using this field.
   */
  pageToken?: string;
}

/**
 * Additional options for orgPolicy#foldersPoliciesPatch.
 */
export interface FoldersPoliciesPatchOptions {
  /**
   * Field mask used to specify the fields to be overwritten in the policy by
   * the set. The fields specified in the update_mask are relative to the
   * policy, not the full request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersPoliciesPatchOptions(data: any): FoldersPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersPoliciesPatchOptions(data: any): FoldersPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Similar to PolicySpec but with an extra 'launch' field for launch reference.
 * The PolicySpec here is specific for dry-run/darklaunch.
 */
export interface GoogleCloudOrgpolicyV2AlternatePolicySpec {
  /**
   * Reference to the launch that will be used while audit logging and to
   * control the launch. Should be set only in the alternate policy.
   */
  launch?: string;
  /**
   * Specify constraint for configurations of Google Cloud resources.
   */
  spec?: GoogleCloudOrgpolicyV2PolicySpec;
}

/**
 * A constraint describes a way to restrict resource's configuration. For
 * example, you could enforce a constraint that controls which Google Cloud
 * services can be activated across an organization, or whether a Compute Engine
 * instance can have serial port connections established. Constraints can be
 * configured by the organization policy administrator to fit the needs of the
 * organization by setting a policy that includes constraints at different
 * locations in the organization's resource hierarchy. Policies are inherited
 * down the resource hierarchy from higher levels, but can also be overridden.
 * For details about the inheritance rules please read about `policies`.
 * Constraints have a default behavior determined by the `constraint_default`
 * field, which is the enforcement behavior that is used in the absence of a
 * policy being defined or inherited for the resource in question.
 */
export interface GoogleCloudOrgpolicyV2Constraint {
  /**
   * Defines this constraint as being a BooleanConstraint.
   */
  booleanConstraint?: GoogleCloudOrgpolicyV2ConstraintBooleanConstraint;
  /**
   * The evaluation behavior of this constraint in the absence of a policy.
   */
  constraintDefault?:  | "CONSTRAINT_DEFAULT_UNSPECIFIED" | "ALLOW" | "DENY";
  /**
   * Detailed description of what this constraint controls as well as how and
   * where it is enforced. Mutable.
   */
  description?: string;
  /**
   * The human readable name. Mutable.
   */
  displayName?: string;
  /**
   * Defines this constraint as being a ListConstraint.
   */
  listConstraint?: GoogleCloudOrgpolicyV2ConstraintListConstraint;
  /**
   * Immutable. The resource name of the constraint. Must be in one of the
   * following forms: *
   * `projects/{project_number}/constraints/{constraint_name}` *
   * `folders/{folder_id}/constraints/{constraint_name}` *
   * `organizations/{organization_id}/constraints/{constraint_name}` For
   * example, "/projects/123/constraints/compute.disableSerialPortAccess".
   */
  name?: string;
  /**
   * Shows if dry run is supported for this constraint or not.
   */
  supportsDryRun?: boolean;
}

/**
 * A constraint that is either enforced or not. For example, a constraint
 * `constraints/compute.disableSerialPortAccess`. If it is enforced on a VM
 * instance, serial port connections will not be opened to that instance.
 */
export interface GoogleCloudOrgpolicyV2ConstraintBooleanConstraint {
}

/**
 * A constraint that allows or disallows a list of string values, which are
 * configured by an Organization Policy administrator with a policy.
 */
export interface GoogleCloudOrgpolicyV2ConstraintListConstraint {
  /**
   * Indicates whether values grouped into categories can be used in
   * `Policy.allowed_values` and `Policy.denied_values`. For example,
   * `"in:Python"` would match any value in the 'Python' group.
   */
  supportsIn?: boolean;
  /**
   * Indicates whether subtrees of the Resource Manager resource hierarchy can
   * be used in `Policy.allowed_values` and `Policy.denied_values`. For example,
   * `"under:folders/123"` would match any resource under the 'folders/123'
   * folder.
   */
  supportsUnder?: boolean;
}

/**
 * A custom constraint defined by customers which can *only* be applied to the
 * given resource types and organization. By creating a custom constraint,
 * customers can apply policies of this custom constraint. *Creating a custom
 * constraint itself does NOT apply any policy enforcement*.
 */
export interface GoogleCloudOrgpolicyV2CustomConstraint {
  /**
   * Allow or deny type.
   */
  actionType?:  | "ACTION_TYPE_UNSPECIFIED" | "ALLOW" | "DENY";
  /**
   * Org policy condition/expression. For example:
   * `resource.instanceName.matches("[production|test]_.*_(\d)+")'` or,
   * `resource.management.auto_upgrade == true` The max length of the condition
   * is 1000 characters.
   */
  condition?: string;
  /**
   * Detailed information about this custom policy constraint. The max length
   * of the description is 2000 characters.
   */
  description?: string;
  /**
   * One line display name for the UI. The max length of the display_name is
   * 200 characters.
   */
  displayName?: string;
  /**
   * All the operations being applied for this constraint.
   */
  methodTypes?:  | "METHOD_TYPE_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE"[];
  /**
   * Immutable. Name of the constraint. This is unique within the organization.
   * Format of the name should be *
   * `organizations/{organization_id}/customConstraints/{custom_constraint_id}`
   * Example: `organizations/123/customConstraints/custom.createOnlyE2TypeVms`
   * The max length is 70 characters and the minimum length is 1. Note that the
   * prefix `organizations/{organization_id}/customConstraints/` is not counted.
   */
  name?: string;
  /**
   * Immutable. The resource instance type on which this policy applies. Format
   * will be of the form : "/" Example: * `compute.googleapis.com/Instance`.
   */
  resourceTypes?: string[];
  /**
   * Output only. The last time this custom constraint was updated. This
   * represents the last time that the `CreateCustomConstraint` or
   * `UpdateCustomConstraint` RPC was called
   */
  readonly updateTime?: Date;
}

/**
 * The response returned from the ListConstraints method.
 */
export interface GoogleCloudOrgpolicyV2ListConstraintsResponse {
  /**
   * The collection of constraints that are available on the targeted resource.
   */
  constraints?: GoogleCloudOrgpolicyV2Constraint[];
  /**
   * Page token used to retrieve the next page. This is currently not used.
   */
  nextPageToken?: string;
}

/**
 * The response returned from the ListCustomConstraints method. It will be
 * empty if no custom constraints are set on the organization resource.
 */
export interface GoogleCloudOrgpolicyV2ListCustomConstraintsResponse {
  /**
   * All custom constraints that exist on the organization resource. It will be
   * empty if no custom constraints are set.
   */
  customConstraints?: GoogleCloudOrgpolicyV2CustomConstraint[];
  /**
   * Page token used to retrieve the next page. This is currently not used, but
   * the server may at any point start supplying a valid token.
   */
  nextPageToken?: string;
}

/**
 * The response returned from the ListPolicies method. It will be empty if no
 * policies are set on the resource.
 */
export interface GoogleCloudOrgpolicyV2ListPoliciesResponse {
  /**
   * Page token used to retrieve the next page. This is currently not used, but
   * the server may at any point start supplying a valid token.
   */
  nextPageToken?: string;
  /**
   * All policies that exist on the resource. It will be empty if no policies
   * are set.
   */
  policies?: GoogleCloudOrgpolicyV2Policy[];
}

/**
 * Defines an organization policy which is used to specify constraints for
 * configurations of Google Cloud resources.
 */
export interface GoogleCloudOrgpolicyV2Policy {
  /**
   * Deprecated.
   */
  alternate?: GoogleCloudOrgpolicyV2AlternatePolicySpec;
  /**
   * Dry-run policy. Audit-only policy, can be used to monitor how the policy
   * would have impacted the existing and future resources if it's enforced.
   */
  dryRunSpec?: GoogleCloudOrgpolicyV2PolicySpec;
  /**
   * Immutable. The resource name of the policy. Must be one of the following
   * forms, where constraint_name is the name of the constraint which this
   * policy configures: * `projects/{project_number}/policies/{constraint_name}`
   * * `folders/{folder_id}/policies/{constraint_name}` *
   * `organizations/{organization_id}/policies/{constraint_name}` For example,
   * "projects/123/policies/compute.disableSerialPortAccess". Note:
   * `projects/{project_id}/policies/{constraint_name}` is also an acceptable
   * name for API requests, but responses will return the name using the
   * equivalent project number.
   */
  name?: string;
  /**
   * Basic information about the Organization Policy.
   */
  spec?: GoogleCloudOrgpolicyV2PolicySpec;
}

/**
 * Defines a Google Cloud policy specification which is used to specify
 * constraints for configurations of Google Cloud resources.
 */
export interface GoogleCloudOrgpolicyV2PolicySpec {
  /**
   * An opaque tag indicating the current version of the policy, used for
   * concurrency control. This field is ignored if used in a `CreatePolicy`
   * request. When the policy` is returned from either a `GetPolicy` or a
   * `ListPolicies` request, this `etag` indicates the version of the current
   * policy to use when executing a read-modify-write loop. When the policy is
   * returned from a `GetEffectivePolicy` request, the `etag` will be unset.
   */
  etag?: string;
  /**
   * Determines the inheritance behavior for this policy. If
   * `inherit_from_parent` is true, policy rules set higher up in the hierarchy
   * (up to the closest root) are inherited and present in the effective policy.
   * If it is false, then no rules are inherited, and this policy becomes the
   * new root for evaluation. This field can be set only for policies which
   * configure list constraints.
   */
  inheritFromParent?: boolean;
  /**
   * Ignores policies set above this resource and restores the
   * `constraint_default` enforcement behavior of the specific constraint at
   * this resource. This field can be set in policies for either list or boolean
   * constraints. If set, `rules` must be empty and `inherit_from_parent` must
   * be set to false.
   */
  reset?: boolean;
  /**
   * Up to 10 policy rules are allowed. In policies for boolean constraints,
   * the following requirements apply: - There must be one and only one policy
   * rule where condition is unset. - Boolean policy rules with conditions must
   * set `enforced` to the opposite of the policy rule without a condition. -
   * During policy evaluation, policy rules with conditions that are true for a
   * target resource take precedence.
   */
  rules?: GoogleCloudOrgpolicyV2PolicySpecPolicyRule[];
  /**
   * Output only. The time stamp this was previously updated. This represents
   * the last time a call to `CreatePolicy` or `UpdatePolicy` was made for that
   * policy.
   */
  readonly updateTime?: Date;
}

/**
 * A rule used to express this policy.
 */
export interface GoogleCloudOrgpolicyV2PolicySpecPolicyRule {
  /**
   * Setting this to true means that all values are allowed. This field can be
   * set only in policies for list constraints.
   */
  allowAll?: boolean;
  /**
   * A condition which determines whether this rule is used in the evaluation
   * of the policy. When set, the `expression` field in the `Expr' must include
   * from 1 to 10 subexpressions, joined by the "||" or "&&" operators. Each
   * subexpression must be of the form "resource.matchTag('/tag_key_short_name,
   * 'tag_value_short_name')". or "resource.matchTagId('tagKeys/key_id',
   * 'tagValues/value_id')". where key_name and value_name are the resource
   * names for Label Keys and Values. These names are available from the Tag
   * Manager Service. An example expression is:
   * "resource.matchTag('123456789/environment, 'prod')". or
   * "resource.matchTagId('tagKeys/123', 'tagValues/456')".
   */
  condition?: GoogleTypeExpr;
  /**
   * Setting this to true means that all values are denied. This field can be
   * set only in policies for list constraints.
   */
  denyAll?: boolean;
  /**
   * If `true`, then the policy is enforced. If `false`, then any configuration
   * is acceptable. This field can be set only in policies for boolean
   * constraints.
   */
  enforce?: boolean;
  /**
   * List of values to be used for this policy rule. This field can be set only
   * in policies for list constraints.
   */
  values?: GoogleCloudOrgpolicyV2PolicySpecPolicyRuleStringValues;
}

/**
 * A message that holds specific allowed and denied values. This message can
 * define specific values and subtrees of the Resource Manager resource
 * hierarchy (`Organizations`, `Folders`, `Projects`) that are allowed or
 * denied. This is achieved by using the `under:` and optional `is:` prefixes.
 * The `under:` prefix is used to denote resource subtree values. The `is:`
 * prefix is used to denote specific values, and is required only if the value
 * contains a ":". Values prefixed with "is:" are treated the same as values
 * with no prefix. Ancestry subtrees must be in one of the following formats: -
 * "projects/", e.g. "projects/tokyo-rain-123" - "folders/", e.g. "folders/1234"
 * - "organizations/", e.g. "organizations/1234" The `supports_under` field of
 * the associated `Constraint` defines whether ancestry prefixes can be used.
 */
export interface GoogleCloudOrgpolicyV2PolicySpecPolicyRuleStringValues {
  /**
   * List of values allowed at this resource.
   */
  allowedValues?: string[];
  /**
   * List of values denied at this resource.
   */
  deniedValues?: string[];
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
 * Additional options for orgPolicy#organizationsConstraintsList.
 */
export interface OrganizationsConstraintsListOptions {
  /**
   * Size of the pages to be returned. This is currently unsupported and will
   * be ignored. The server may at any point start using this field to limit
   * page size.
   */
  pageSize?: number;
  /**
   * Page token used to retrieve the next page. This is currently unsupported
   * and will be ignored. The server may at any point start using this field.
   */
  pageToken?: string;
}

/**
 * Additional options for orgPolicy#organizationsCustomConstraintsList.
 */
export interface OrganizationsCustomConstraintsListOptions {
  /**
   * Size of the pages to be returned. This is currently unsupported and will
   * be ignored. The server may at any point start using this field to limit
   * page size.
   */
  pageSize?: number;
  /**
   * Page token used to retrieve the next page. This is currently unsupported
   * and will be ignored. The server may at any point start using this field.
   */
  pageToken?: string;
}

/**
 * Additional options for orgPolicy#organizationsPoliciesList.
 */
export interface OrganizationsPoliciesListOptions {
  /**
   * Size of the pages to be returned. This is currently unsupported and will
   * be ignored. The server may at any point start using this field to limit
   * page size.
   */
  pageSize?: number;
  /**
   * Page token used to retrieve the next page. This is currently unsupported
   * and will be ignored. The server may at any point start using this field.
   */
  pageToken?: string;
}

/**
 * Additional options for orgPolicy#organizationsPoliciesPatch.
 */
export interface OrganizationsPoliciesPatchOptions {
  /**
   * Field mask used to specify the fields to be overwritten in the policy by
   * the set. The fields specified in the update_mask are relative to the
   * policy, not the full request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeOrganizationsPoliciesPatchOptions(data: any): OrganizationsPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsPoliciesPatchOptions(data: any): OrganizationsPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for orgPolicy#projectsConstraintsList.
 */
export interface ProjectsConstraintsListOptions {
  /**
   * Size of the pages to be returned. This is currently unsupported and will
   * be ignored. The server may at any point start using this field to limit
   * page size.
   */
  pageSize?: number;
  /**
   * Page token used to retrieve the next page. This is currently unsupported
   * and will be ignored. The server may at any point start using this field.
   */
  pageToken?: string;
}

/**
 * Additional options for orgPolicy#projectsPoliciesList.
 */
export interface ProjectsPoliciesListOptions {
  /**
   * Size of the pages to be returned. This is currently unsupported and will
   * be ignored. The server may at any point start using this field to limit
   * page size.
   */
  pageSize?: number;
  /**
   * Page token used to retrieve the next page. This is currently unsupported
   * and will be ignored. The server may at any point start using this field.
   */
  pageToken?: string;
}

/**
 * Additional options for orgPolicy#projectsPoliciesPatch.
 */
export interface ProjectsPoliciesPatchOptions {
  /**
   * Field mask used to specify the fields to be overwritten in the policy by
   * the set. The fields specified in the update_mask are relative to the
   * policy, not the full request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsPoliciesPatchOptions(data: any): ProjectsPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsPoliciesPatchOptions(data: any): ProjectsPoliciesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}