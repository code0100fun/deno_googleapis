// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Resource Manager API Client for Deno
 * ==========================================
 * 
 * Creates, reads, and updates metadata for Google Cloud Platform resource containers.
 * 
 * Docs: https://cloud.google.com/resource-manager
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Creates, reads, and updates metadata for Google Cloud Platform resource
 * containers.
 */
export class CloudResourceManager {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudresourcemanager.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Return a list of effective tags for the given Google Cloud resource, as
   * specified in `parent`.
   *
   */
  async effectiveTagsList(opts: EffectiveTagsListOptions = {}): Promise<ListEffectiveTagsResponse> {
    const url = new URL(`${this.#baseUrl}v3/effectiveTags`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListEffectiveTagsResponse;
  }

  /**
   * Creates a folder in the resource hierarchy. Returns an `Operation` which
   * can be used to track the progress of the folder creation workflow. Upon
   * success, the `Operation.response` field will be populated with the created
   * Folder. In order to succeed, the addition of this new folder must not
   * violate the folder naming, height, or fanout constraints. + The folder's
   * `display_name` must be distinct from all other folders that share its
   * parent. + The addition of the folder must not cause the active folder
   * hierarchy to exceed a height of 10. Note, the full active + deleted folder
   * hierarchy is allowed to reach a height of 20; this provides additional
   * headroom when moving folders that contain deleted folders. + The addition
   * of the folder must not cause the total number of folders under its parent
   * to exceed 300. If the operation fails due to a folder constraint violation,
   * some errors may be returned by the `CreateFolder` request, with status code
   * `FAILED_PRECONDITION` and an error description. Other folder constraint
   * violations will be communicated in the `Operation`, with the specific
   * `PreconditionFailure` returned in the details list in the `Operation.error`
   * field. The caller must have `resourcemanager.folders.create` permission on
   * the identified parent.
   *
   */
  async foldersCreate(req: Folder): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/folders`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Requests deletion of a folder. The folder is moved into the
   * DELETE_REQUESTED state immediately, and is deleted approximately 30 days
   * later. This method may only be called on an empty folder, where a folder is
   * empty if it doesn't contain any folders or projects in the ACTIVE state. If
   * called on a folder in DELETE_REQUESTED state the operation will result in a
   * no-op success. The caller must have `resourcemanager.folders.delete`
   * permission on the identified folder.
   *
   * @param name Required. The resource name of the folder to be deleted. Must be of the form `folders/{folder_id}`.
   */
  async foldersDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieves a folder identified by the supplied resource name. Valid folder
   * resource names have the format `folders/{folder_id}` (for example,
   * `folders/1234`). The caller must have `resourcemanager.folders.get`
   * permission on the identified folder.
   *
   * @param name Required. The resource name of the folder to retrieve. Must be of the form `folders/{folder_id}`.
   */
  async foldersGet(name: string): Promise<Folder> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Folder;
  }

  /**
   * Gets the access control policy for a folder. The returned policy may be
   * empty if no such policy or resource exists. The `resource` field should be
   * the folder's resource name, for example: "folders/1234". The caller must
   * have `resourcemanager.folders.getIamPolicy` permission on the identified
   * folder.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async foldersGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v3/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists the folders that are direct descendants of supplied parent resource.
   * `list()` provides a strongly consistent view of the folders underneath the
   * specified parent resource. `list()` returns folders sorted based upon the
   * (ascending) lexical ordering of their display_name. The caller must have
   * `resourcemanager.folders.list` permission on the identified parent.
   *
   */
  async foldersList(opts: FoldersListOptions = {}): Promise<ListFoldersResponse> {
    const url = new URL(`${this.#baseUrl}v3/folders`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListFoldersResponse;
  }

  /**
   * Moves a folder under a new resource parent. Returns an `Operation` which
   * can be used to track the progress of the folder move workflow. Upon
   * success, the `Operation.response` field will be populated with the moved
   * folder. Upon failure, a `FolderOperationError` categorizing the failure
   * cause will be returned - if the failure occurs synchronously then the
   * `FolderOperationError` will be returned in the `Status.details` field. If
   * it occurs asynchronously, then the FolderOperation will be returned in the
   * `Operation.error` field. In addition, the `Operation.metadata` field will
   * be populated with a `FolderOperation` message as an aid to stateless
   * clients. Folder moves will be rejected if they violate either the naming,
   * height, or fanout constraints described in the CreateFolder documentation.
   * The caller must have `resourcemanager.folders.move` permission on the
   * folder's current and proposed new parent.
   *
   * @param name Required. The resource name of the Folder to move. Must be of the form folders/{folder_id}
   */
  async foldersMove(name: string, req: MoveFolderRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:move`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates a folder, changing its `display_name`. Changes to the folder
   * `display_name` will be rejected if they violate either the `display_name`
   * formatting rules or the naming constraints described in the CreateFolder
   * documentation. The folder's `display_name` must start and end with a letter
   * or digit, may contain letters, digits, spaces, hyphens and underscores and
   * can be between 3 and 30 characters. This is captured by the regular
   * expression: `\p{L}\p{N}{1,28}[\p{L}\p{N}]`. The caller must have
   * `resourcemanager.folders.update` permission on the identified folder. If
   * the update fails due to the unique name constraint then a
   * `PreconditionFailure` explaining this violation will be returned in the
   * Status.details field.
   *
   * @param name Output only. The resource name of the folder. Its format is `folders/{folder_id}`, for example: "folders/1234".
   */
  async foldersPatch(name: string, req: Folder, opts: FoldersPatchOptions = {}): Promise<Operation> {
    opts = serializeFoldersPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
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
   * Search for folders that match specific filter criteria. `search()`
   * provides an eventually consistent view of the folders a user has access to
   * which meet the specified filter criteria. This will only return folders on
   * which the caller has the permission `resourcemanager.folders.get`.
   *
   */
  async foldersSearch(opts: FoldersSearchOptions = {}): Promise<SearchFoldersResponse> {
    const url = new URL(`${this.#baseUrl}v3/folders:search`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SearchFoldersResponse;
  }

  /**
   * Sets the access control policy on a folder, replacing any existing policy.
   * The `resource` field should be the folder's resource name, for example:
   * "folders/1234". The caller must have `resourcemanager.folders.setIamPolicy`
   * permission on the identified folder.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async foldersSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified folder. The
   * `resource` field should be the folder's resource name, for example:
   * "folders/1234". There are no permissions required for making this API call.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async foldersTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Cancels the deletion request for a folder. This method may be called on a
   * folder in any state. If the folder is in the ACTIVE state the result will
   * be a no-op success. In order to succeed, the folder's parent must be in the
   * ACTIVE state. In addition, reintroducing the folder into the tree must not
   * violate folder naming, height, and fanout constraints described in the
   * CreateFolder documentation. The caller must have
   * `resourcemanager.folders.undelete` permission on the identified folder.
   *
   * @param name Required. The resource name of the folder to undelete. Must be of the form `folders/{folder_id}`.
   */
  async foldersUndelete(name: string, req: UndeleteFolderRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Create a Lien which applies to the resource denoted by the `parent` field.
   * Callers of this method will require permission on the `parent` resource.
   * For example, applying to `projects/1234` requires permission
   * `resourcemanager.projects.updateLiens`. NOTE: Some resources may limit the
   * number of Liens which may be applied.
   *
   */
  async liensCreate(req: Lien): Promise<Lien> {
    req = serializeLien(req);
    const url = new URL(`${this.#baseUrl}v3/liens`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLien(data);
  }

  /**
   * Delete a Lien by `name`. Callers of this method will require permission on
   * the `parent` resource. For example, a Lien with a `parent` of
   * `projects/1234` requires permission `resourcemanager.projects.updateLiens`.
   *
   * @param name Required. The name/identifier of the Lien to delete.
   */
  async liensDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Retrieve a Lien by `name`. Callers of this method will require permission
   * on the `parent` resource. For example, a Lien with a `parent` of
   * `projects/1234` requires permission `resourcemanager.projects.get`
   *
   * @param name Required. The name/identifier of the Lien.
   */
  async liensGet(name: string): Promise<Lien> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLien(data);
  }

  /**
   * List all Liens applied to the `parent` resource. Callers of this method
   * will require permission on the `parent` resource. For example, a Lien with
   * a `parent` of `projects/1234` requires permission
   * `resourcemanager.projects.get`.
   *
   */
  async liensList(opts: LiensListOptions = {}): Promise<ListLiensResponse> {
    const url = new URL(`${this.#baseUrl}v3/liens`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListLiensResponse(data);
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async operationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Fetches an organization resource identified by the specified resource
   * name.
   *
   * @param name Required. The resource name of the Organization to fetch. This is the organization's relative path in the API, formatted as "organizations/[organizationId]". For example, "organizations/1234".
   */
  async organizationsGet(name: string): Promise<Organization> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Organization;
  }

  /**
   * Gets the access control policy for an organization resource. The policy
   * may be empty if no such policy or resource exists. The `resource` field
   * should be the organization's resource name, for example:
   * "organizations/123". Authorization requires the IAM permission
   * `resourcemanager.organizations.getIamPolicy` on the specified organization.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async organizationsGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v3/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Searches organization resources that are visible to the user and satisfy
   * the specified filter. This method returns organizations in an unspecified
   * order. New organizations do not necessarily appear at the end of the
   * results, and may take a small amount of time to appear. Search will only
   * return organizations on which the user has the permission
   * `resourcemanager.organizations.get`
   *
   */
  async organizationsSearch(opts: OrganizationsSearchOptions = {}): Promise<SearchOrganizationsResponse> {
    const url = new URL(`${this.#baseUrl}v3/organizations:search`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SearchOrganizationsResponse;
  }

  /**
   * Sets the access control policy on an organization resource. Replaces any
   * existing policy. The `resource` field should be the organization's resource
   * name, for example: "organizations/123". Authorization requires the IAM
   * permission `resourcemanager.organizations.setIamPolicy` on the specified
   * organization.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async organizationsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns the permissions that a caller has on the specified organization.
   * The `resource` field should be the organization's resource name, for
   * example: "organizations/123". There are no permissions required for making
   * this API call.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async organizationsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Request that a new project be created. The result is an `Operation` which
   * can be used to track the creation process. This process usually takes a few
   * seconds, but can sometimes take much longer. The tracking `Operation` is
   * automatically deleted after a few hours, so there is no need to call
   * `DeleteOperation`.
   *
   */
  async projectsCreate(req: Project): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/projects`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Marks the project identified by the specified `name` (for example,
   * `projects/415104041262`) for deletion. This method will only affect the
   * project if it has a lifecycle state of ACTIVE. This method changes the
   * Project's lifecycle state from ACTIVE to DELETE_REQUESTED. The deletion
   * starts at an unspecified time, at which point the Project is no longer
   * accessible. Until the deletion completes, you can check the lifecycle state
   * checked by retrieving the project with GetProject, and the project remains
   * visible to ListProjects. However, you cannot update the project. After the
   * deletion completes, the project is not retrievable by the GetProject,
   * ListProjects, and SearchProjects methods. This method behaves idempotently,
   * such that deleting a `DELETE_REQUESTED` project will not cause an error,
   * but also won't do anything. The caller must have
   * `resourcemanager.projects.delete` permissions for this project.
   *
   * @param name Required. The name of the Project (for example, `projects/415104041262`).
   */
  async projectsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieves the project identified by the specified `name` (for example,
   * `projects/415104041262`). The caller must have
   * `resourcemanager.projects.get` permission for this project.
   *
   * @param name Required. The name of the project (for example, `projects/415104041262`).
   */
  async projectsGet(name: string): Promise<Project> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Project;
  }

  /**
   * Returns the IAM access control policy for the specified project, in the
   * format `projects/{ProjectIdOrNumber}` e.g. projects/123. Permission is
   * denied if the policy or the resource do not exist.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v3/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists projects that are direct children of the specified folder or
   * organization resource. `list()` provides a strongly consistent view of the
   * projects underneath the specified parent resource. `list()` returns
   * projects sorted based upon the (ascending) lexical ordering of their
   * `display_name`. The caller must have `resourcemanager.projects.list`
   * permission on the identified parent.
   *
   */
  async projectsList(opts: ProjectsListOptions = {}): Promise<ListProjectsResponse> {
    const url = new URL(`${this.#baseUrl}v3/projects`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListProjectsResponse;
  }

  /**
   * Move a project to another place in your resource hierarchy, under a new
   * resource parent. Returns an operation which can be used to track the
   * process of the project move workflow. Upon success, the
   * `Operation.response` field will be populated with the moved project. The
   * caller must have `resourcemanager.projects.move` permission on the project,
   * on the project's current and proposed new parent. If project has no current
   * parent, or it currently does not have an associated organization resource,
   * you will also need the `resourcemanager.projects.setIamPolicy` permission
   * in the project.
   *
   * @param name Required. The name of the project to move.
   */
  async projectsMove(name: string, req: MoveProjectRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:move`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates the `display_name` and labels of the project identified by the
   * specified `name` (for example, `projects/415104041262`). Deleting all
   * labels requires an update mask for labels field. The caller must have
   * `resourcemanager.projects.update` permission for this project.
   *
   * @param name Output only. The unique resource name of the project. It is an int64 generated number prefixed by "projects/". Example: `projects/415104041262`
   */
  async projectsPatch(name: string, req: Project, opts: ProjectsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
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
   * Search for projects that the caller has both
   * `resourcemanager.projects.get` permission on, and also satisfy the
   * specified query. This method returns projects in an unspecified order. This
   * method is eventually consistent with project mutations; this means that a
   * newly created project may not appear in the results or recent updates to an
   * existing project may not be reflected in the results. To retrieve the
   * latest state of a project, use the GetProject method.
   *
   */
  async projectsSearch(opts: ProjectsSearchOptions = {}): Promise<SearchProjectsResponse> {
    const url = new URL(`${this.#baseUrl}v3/projects:search`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SearchProjectsResponse;
  }

  /**
   * Sets the IAM access control policy for the specified project, in the
   * format `projects/{ProjectIdOrNumber}` e.g. projects/123. CAUTION: This
   * method will replace the existing policy, and cannot be used to append
   * additional IAM settings. Note: Removing service accounts from policies or
   * changing their roles can render services completely inoperable. It is
   * important to understand how the service account is being used before
   * removing or updating its roles. The following constraints apply when using
   * `setIamPolicy()`: + Project does not support `allUsers` and
   * `allAuthenticatedUsers` as `members` in a `Binding` of a `Policy`. + The
   * owner role can be granted to a `user`, `serviceAccount`, or a group that is
   * part of an organization. For example, group@myownpersonaldomain.com could
   * be added as an owner to a project in the myownpersonaldomain.com
   * organization, but not the examplepetstore.com organization. + Service
   * accounts can be made owners of a project directly without any restrictions.
   * However, to be added as an owner, a user must be invited using the Cloud
   * Platform console and must accept the invitation. + A user cannot be granted
   * the owner role using `setIamPolicy()`. The user must be granted the owner
   * role using the Cloud Platform Console and must explicitly accept the
   * invitation. + Invitations to grant the owner role cannot be sent using
   * `setIamPolicy()`; they must be sent only using the Cloud Platform Console.
   * + If the project is not part of an organization, there must be at least one
   * owner who has accepted the Terms of Service (ToS) agreement in the policy.
   * Calling `setIamPolicy()` to remove the last ToS-accepted owner from the
   * policy will fail. This restriction also applies to legacy projects that no
   * longer have owners who have accepted the ToS. Edits to IAM policies will be
   * rejected until the lack of a ToS-accepting owner is rectified. If the
   * project is part of an organization, you can remove all owners, potentially
   * making the organization inaccessible.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified project, in the
   * format `projects/{ProjectIdOrNumber}` e.g. projects/123..
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Restores the project identified by the specified `name` (for example,
   * `projects/415104041262`). You can only use this method for a project that
   * has a lifecycle state of DELETE_REQUESTED. After deletion starts, the
   * project cannot be restored. The caller must have
   * `resourcemanager.projects.undelete` permission for this project.
   *
   * @param name Required. The name of the project (for example, `projects/415104041262`). Required.
   */
  async projectsUndelete(name: string, req: UndeleteProjectRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:undelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a TagBinding between a TagValue and a Google Cloud resource.
   *
   */
  async tagBindingsCreate(req: TagBinding, opts: TagBindingsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/tagBindings`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Deletes a TagBinding.
   *
   * @param name Required. The name of the TagBinding. This is a String of the form: `tagBindings/{id}` (e.g. `tagBindings/%2F%2Fcloudresourcemanager.googleapis.com%2Fprojects%2F123/tagValues/456`).
   */
  async tagBindingsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Lists the TagBindings for the given Google Cloud resource, as specified
   * with `parent`. NOTE: The `parent` field is expected to be a full resource
   * name:
   * https://cloud.google.com/apis/design/resource_names#full_resource_name
   *
   */
  async tagBindingsList(opts: TagBindingsListOptions = {}): Promise<ListTagBindingsResponse> {
    const url = new URL(`${this.#baseUrl}v3/tagBindings`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListTagBindingsResponse;
  }

  /**
   * Creates a new TagKey. If another request with the same parameters is sent
   * while the original request is in process, the second request will receive
   * an error. A maximum of 1000 TagKeys can exist under a parent at any given
   * time.
   *
   */
  async tagKeysCreate(req: TagKey, opts: TagKeysCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/tagKeys`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Deletes a TagKey. The TagKey cannot be deleted if it has any child
   * TagValues.
   *
   * @param name Required. The resource name of a TagKey to be deleted in the format `tagKeys/123`. The TagKey cannot be a parent of any existing TagValues or it will not be deleted successfully.
   */
  async tagKeysDelete(name: string, opts: TagKeysDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieves a TagKey. This method will return `PERMISSION_DENIED` if the key
   * does not exist or the user does not have permission to view it.
   *
   * @param name Required. A resource name in the format `tagKeys/{id}`, such as `tagKeys/123`.
   */
  async tagKeysGet(name: string): Promise<TagKey> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as TagKey;
  }

  /**
   * Gets the access control policy for a TagKey. The returned policy may be
   * empty if no such policy or resource exists. The `resource` field should be
   * the TagKey's resource name. For example, "tagKeys/1234". The caller must
   * have `cloudresourcemanager.googleapis.com/tagKeys.getIamPolicy` permission
   * on the specified TagKey.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async tagKeysGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v3/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists all TagKeys for a parent resource.
   *
   */
  async tagKeysList(opts: TagKeysListOptions = {}): Promise<ListTagKeysResponse> {
    const url = new URL(`${this.#baseUrl}v3/tagKeys`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListTagKeysResponse;
  }

  /**
   * Updates the attributes of the TagKey resource.
   *
   * @param name Immutable. The resource name for a TagKey. Must be in the format `tagKeys/{tag_key_id}`, where `tag_key_id` is the generated numeric id for the TagKey.
   */
  async tagKeysPatch(name: string, req: TagKey, opts: TagKeysPatchOptions = {}): Promise<Operation> {
    opts = serializeTagKeysPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Sets the access control policy on a TagKey, replacing any existing policy.
   * The `resource` field should be the TagKey's resource name. For example,
   * "tagKeys/1234". The caller must have `resourcemanager.tagKeys.setIamPolicy`
   * permission on the identified tagValue.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async tagKeysSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified TagKey. The
   * `resource` field should be the TagKey's resource name. For example,
   * "tagKeys/1234". There are no permissions required for making this API call.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async tagKeysTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Creates a TagValue as a child of the specified TagKey. If a another
   * request with the same parameters is sent while the original request is in
   * process the second request will receive an error. A maximum of 1000
   * TagValues can exist under a TagKey at any given time.
   *
   */
  async tagValuesCreate(req: TagValue, opts: TagValuesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/tagValues`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Deletes a TagValue. The TagValue cannot have any bindings when it is
   * deleted.
   *
   * @param name Required. Resource name for TagValue to be deleted in the format tagValues/456.
   */
  async tagValuesDelete(name: string, opts: TagValuesDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieves a TagValue. This method will return `PERMISSION_DENIED` if the
   * value does not exist or the user does not have permission to view it.
   *
   * @param name Required. Resource name for TagValue to be fetched in the format `tagValues/456`.
   */
  async tagValuesGet(name: string): Promise<TagValue> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as TagValue;
  }

  /**
   * Gets the access control policy for a TagValue. The returned policy may be
   * empty if no such policy or resource exists. The `resource` field should be
   * the TagValue's resource name. For example: `tagValues/1234`. The caller
   * must have the `cloudresourcemanager.googleapis.com/tagValues.getIamPolicy`
   * permission on the identified TagValue to get the access control policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async tagValuesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v3/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists all TagValues for a specific TagKey.
   *
   */
  async tagValuesList(opts: TagValuesListOptions = {}): Promise<ListTagValuesResponse> {
    const url = new URL(`${this.#baseUrl}v3/tagValues`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListTagValuesResponse;
  }

  /**
   * Updates the attributes of the TagValue resource.
   *
   * @param name Immutable. Resource name for TagValue in the format `tagValues/456`.
   */
  async tagValuesPatch(name: string, req: TagValue, opts: TagValuesPatchOptions = {}): Promise<Operation> {
    opts = serializeTagValuesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Sets the access control policy on a TagValue, replacing any existing
   * policy. The `resource` field should be the TagValue's resource name. For
   * example: `tagValues/1234`. The caller must have
   * `resourcemanager.tagValues.setIamPolicy` permission on the identified
   * tagValue.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async tagValuesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Creates a TagHold. Returns ALREADY_EXISTS if a TagHold with the same
   * resource and origin exists under the same TagValue.
   *
   * @param parent Required. The resource name of the TagHold's parent TagValue. Must be of the form: `tagValues/{tag-value-id}`.
   */
  async tagValuesTagHoldsCreate(parent: string, req: TagHold, opts: TagValuesTagHoldsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/tagHolds`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
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
   * Deletes a TagHold.
   *
   * @param name Required. The resource name of the TagHold to delete. Must be of the form: `tagValues/{tag-value-id}/tagHolds/{tag-hold-id}`.
   */
  async tagValuesTagHoldsDelete(name: string, opts: TagValuesTagHoldsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Lists TagHolds under a TagValue.
   *
   * @param parent Required. The resource name of the parent TagValue. Must be of the form: `tagValues/{tag-value-id}`.
   */
  async tagValuesTagHoldsList(parent: string, opts: TagValuesTagHoldsListOptions = {}): Promise<ListTagHoldsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/tagHolds`);
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
    return data as ListTagHoldsResponse;
  }

  /**
   * Returns permissions that a caller has on the specified TagValue. The
   * `resource` field should be the TagValue's resource name. For example:
   * `tagValues/1234`. There are no permissions required for making this API
   * call.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async tagValuesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ resource }:testIamPermissions`);
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
 * Metadata describing a long running folder operation
 */
export interface CloudresourcemanagerGoogleCloudResourcemanagerV2alpha1FolderOperation {
  /**
   * The resource name of the folder or organization we are either creating the
   * folder under or moving the folder to.
   */
  destinationParent?: string;
  /**
   * The display name of the folder.
   */
  displayName?: string;
  /**
   * The type of this operation.
   */
  operationType?:  | "OPERATION_TYPE_UNSPECIFIED" | "CREATE" | "MOVE";
  /**
   * The resource name of the folder's parent. Only applicable when the
   * operation_type is MOVE.
   */
  sourceParent?: string;
}

/**
 * Metadata describing a long running folder operation
 */
export interface CloudresourcemanagerGoogleCloudResourcemanagerV2beta1FolderOperation {
  /**
   * The resource name of the folder or organization we are either creating the
   * folder under or moving the folder to.
   */
  destinationParent?: string;
  /**
   * The display name of the folder.
   */
  displayName?: string;
  /**
   * The type of this operation.
   */
  operationType?:  | "OPERATION_TYPE_UNSPECIFIED" | "CREATE" | "MOVE";
  /**
   * The resource name of the folder's parent. Only applicable when the
   * operation_type is MOVE.
   */
  sourceParent?: string;
}

/**
 * Metadata pertaining to the Folder creation process.
 */
export interface CreateFolderMetadata {
  /**
   * The display name of the folder.
   */
  displayName?: string;
  /**
   * The resource name of the folder or organization we are creating the folder
   * under.
   */
  parent?: string;
}

/**
 * A status object which is used as the `metadata` field for the Operation
 * returned by CreateProject. It provides insight for when significant phases of
 * Project creation have completed.
 */
export interface CreateProjectMetadata {
  /**
   * Creation time of the project creation workflow.
   */
  createTime?: Date;
  /**
   * True if the project can be retrieved using `GetProject`. No other
   * operations on the project are guaranteed to work until the project creation
   * is complete.
   */
  gettable?: boolean;
  /**
   * True if the project creation process is complete.
   */
  ready?: boolean;
}

function serializeCreateProjectMetadata(data: any): CreateProjectMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeCreateProjectMetadata(data: any): CreateProjectMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Runtime operation information for creating a TagValue.
 */
export interface CreateTagBindingMetadata {
}

/**
 * Runtime operation information for creating a TagKey.
 */
export interface CreateTagKeyMetadata {
}

/**
 * Runtime operation information for creating a TagValue.
 */
export interface CreateTagValueMetadata {
}

/**
 * A status object which is used as the `metadata` field for the `Operation`
 * returned by `DeleteFolder`.
 */
export interface DeleteFolderMetadata {
}

/**
 * A status object which is used as the `metadata` field for the operation
 * returned by DeleteOrganization.
 */
export interface DeleteOrganizationMetadata {
}

/**
 * A status object which is used as the `metadata` field for the Operation
 * returned by `DeleteProject`.
 */
export interface DeleteProjectMetadata {
}

/**
 * Runtime operation information for deleting a TagBinding.
 */
export interface DeleteTagBindingMetadata {
}

/**
 * Runtime operation information for deleting a TagKey.
 */
export interface DeleteTagKeyMetadata {
}

/**
 * Runtime operation information for deleting a TagValue.
 */
export interface DeleteTagValueMetadata {
}

/**
 * An EffectiveTag represents a tag that applies to a resource during policy
 * evaluation. Tags can be either directly bound to a resource or inherited from
 * its ancestor. EffectiveTag contains the name and namespaced_name of the tag
 * value and tag key, with additional fields of `inherited` to indicate the
 * inheritance status of the effective tag.
 */
export interface EffectiveTag {
  /**
   * Indicates the inheritance status of a tag value attached to the given
   * resource. If the tag value is inherited from one of the resource's
   * ancestors, inherited will be true. If false, then the tag value is directly
   * attached to the resource, inherited will be false.
   */
  inherited?: boolean;
  /**
   * The namespaced_name of the TagKey. Now only supported in the format of
   * `{organization_id}/{tag_key_short_name}`. Other formats will be supported
   * when we add non-org parented tags.
   */
  namespacedTagKey?: string;
  /**
   * Namespaced name of the TagValue. Now only supported in the format
   * `{organization_id}/{tag_key_short_name}/{tag_value_short_name}`. Other
   * formats will be supported when we add non-org parented tags.
   */
  namespacedTagValue?: string;
  /**
   * The name of the TagKey, in the format `tagKeys/{id}`, such as
   * `tagKeys/123`.
   */
  tagKey?: string;
  /**
   * The parent name of the tag key. Must be in the format
   * `organizations/{organization_id}`.
   */
  tagKeyParentName?: string;
  /**
   * Resource name for TagValue in the format `tagValues/456`.
   */
  tagValue?: string;
}

/**
 * Additional options for CloudResourceManager#effectiveTagsList.
 */
export interface EffectiveTagsListOptions {
  /**
   * Optional. The maximum number of effective tags to return in the response.
   * The server allows a maximum of 300 effective tags to return in a single
   * page. If unspecified, the server will use 100 as the default.
   */
  pageSize?: number;
  /**
   * Optional. A pagination token returned from a previous call to
   * `ListEffectiveTags` that indicates from where this listing should continue.
   */
  pageToken?: string;
  /**
   * Required. The full resource name of a resource for which you want to list
   * the effective tags. E.g.
   * "//cloudresourcemanager.googleapis.com/projects/123"
   */
  parent?: string;
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
 * A folder in an organization's resource hierarchy, used to organize that
 * organization's resources.
 */
export interface Folder {
  /**
   * Output only. Timestamp when the folder was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Timestamp when the folder was requested to be deleted.
   */
  readonly deleteTime?: Date;
  /**
   * The folder's display name. A folder's display name must be unique amongst
   * its siblings. For example, no two folders with the same parent can share
   * the same display name. The display name must start and end with a letter or
   * digit, may contain letters, digits, spaces, hyphens and underscores and can
   * be no longer than 30 characters. This is captured by the regular
   * expression: `[\p{L}\p{N}]([\p{L}\p{N}_- ]{0,28}[\p{L}\p{N}])?`.
   */
  displayName?: string;
  /**
   * Output only. A checksum computed by the server based on the current value
   * of the folder resource. This may be sent on update and delete requests to
   * ensure the client has an up-to-date value before proceeding.
   */
  readonly etag?: string;
  /**
   * Output only. The resource name of the folder. Its format is
   * `folders/{folder_id}`, for example: "folders/1234".
   */
  readonly name?: string;
  /**
   * Required. The folder's parent's resource name. Updates to the folder's
   * parent must be performed using MoveFolder.
   */
  parent?: string;
  /**
   * Output only. The lifecycle state of the folder. Updates to the state must
   * be performed using DeleteFolder and UndeleteFolder.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "DELETE_REQUESTED";
  /**
   * Output only. Timestamp when the folder was last modified.
   */
  readonly updateTime?: Date;
}

/**
 * Metadata describing a long running folder operation
 */
export interface FolderOperation {
  /**
   * The resource name of the folder or organization we are either creating the
   * folder under or moving the folder to.
   */
  destinationParent?: string;
  /**
   * The display name of the folder.
   */
  displayName?: string;
  /**
   * The type of this operation.
   */
  operationType?:  | "OPERATION_TYPE_UNSPECIFIED" | "CREATE" | "MOVE";
  /**
   * The resource name of the folder's parent. Only applicable when the
   * operation_type is MOVE.
   */
  sourceParent?: string;
}

/**
 * A classification of the Folder Operation error.
 */
export interface FolderOperationError {
  /**
   * The type of operation error experienced.
   */
  errorMessageId?:  | "ERROR_TYPE_UNSPECIFIED" | "ACTIVE_FOLDER_HEIGHT_VIOLATION" | "MAX_CHILD_FOLDERS_VIOLATION" | "FOLDER_NAME_UNIQUENESS_VIOLATION" | "RESOURCE_DELETED_VIOLATION" | "PARENT_DELETED_VIOLATION" | "CYCLE_INTRODUCED_VIOLATION" | "FOLDER_BEING_MOVED_VIOLATION" | "FOLDER_TO_DELETE_NON_EMPTY_VIOLATION" | "DELETED_FOLDER_HEIGHT_VIOLATION";
}

/**
 * Additional options for CloudResourceManager#foldersList.
 */
export interface FoldersListOptions {
  /**
   * Optional. The maximum number of folders to return in the response. The
   * server can return fewer folders than requested. If unspecified, server
   * picks an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. A pagination token returned from a previous call to
   * `ListFolders` that indicates where this listing should continue from.
   */
  pageToken?: string;
  /**
   * Required. The name of the parent resource whose folders are being listed.
   * Only children of this parent resource are listed; descendants are not
   * listed. If the parent is a folder, use the value `folders/{folder_id}`. If
   * the parent is an organization, use the value `organizations/{org_id}`.
   * Access to this method is controlled by checking the
   * `resourcemanager.folders.list` permission on the `parent`.
   */
  parent?: string;
  /**
   * Optional. Controls whether folders in the DELETE_REQUESTED state should be
   * returned. Defaults to false.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for CloudResourceManager#foldersPatch.
 */
export interface FoldersPatchOptions {
  /**
   * Required. Fields to be updated. Only the `display_name` can be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeFoldersPatchOptions(data: any): FoldersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeFoldersPatchOptions(data: any): FoldersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudResourceManager#foldersSearch.
 */
export interface FoldersSearchOptions {
  /**
   * Optional. The maximum number of folders to return in the response. The
   * server can return fewer folders than requested. If unspecified, server
   * picks an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. A pagination token returned from a previous call to
   * `SearchFolders` that indicates from where search should continue.
   */
  pageToken?: string;
  /**
   * Optional. Search criteria used to select the folders to return. If no
   * search criteria is specified then all accessible folders will be returned.
   * Query expressions can be used to restrict results based upon displayName,
   * state and parent, where the operators `=` (`:`) `NOT`, `AND` and `OR` can
   * be used along with the suffix wildcard symbol `*`. The `displayName` field
   * in a query expression should use escaped quotes for values that include
   * whitespace to prevent unexpected behavior. ``` | Field | Description |
   * |-------------------------|----------------------------------------| |
   * displayName | Filters by displayName. | | parent | Filters by parent (for
   * example: folders/123). | | state, lifecycleState | Filters by state. | ```
   * Some example queries are: * Query `displayName=Test*` returns Folder
   * resources whose display name starts with "Test". * Query `state=ACTIVE`
   * returns Folder resources with `state` set to `ACTIVE`. * Query
   * `parent=folders/123` returns Folder resources that have `folders/123` as a
   * parent resource. * Query `parent=folders/123 AND state=ACTIVE` returns
   * active Folder resources that have `folders/123` as a parent resource. *
   * Query `displayName=\\"Test String\\"` returns Folder resources with display
   * names that include both "Test" and "String".
   */
  query?: string;
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
 * A Lien represents an encumbrance on the actions that can be performed on a
 * resource.
 */
export interface Lien {
  /**
   * The creation time of this Lien.
   */
  createTime?: Date;
  /**
   * A system-generated unique identifier for this Lien. Example:
   * `liens/1234abcd`
   */
  name?: string;
  /**
   * A stable, user-visible/meaningful string identifying the origin of the
   * Lien, intended to be inspected programmatically. Maximum length of 200
   * characters. Example: 'compute.googleapis.com'
   */
  origin?: string;
  /**
   * A reference to the resource this Lien is attached to. The server will
   * validate the parent against those for which Liens are supported. Example:
   * `projects/1234`
   */
  parent?: string;
  /**
   * Concise user-visible strings indicating why an action cannot be performed
   * on a resource. Maximum length of 200 characters. Example: 'Holds production
   * API key'
   */
  reason?: string;
  /**
   * The types of operations which should be blocked as a result of this Lien.
   * Each value should correspond to an IAM permission. The server will validate
   * the permissions against those for which Liens are supported. An empty list
   * is meaningless and will be rejected. Example:
   * ['resourcemanager.projects.delete']
   */
  restrictions?: string[];
}

function serializeLien(data: any): Lien {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeLien(data: any): Lien {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Additional options for CloudResourceManager#liensList.
 */
export interface LiensListOptions {
  /**
   * The maximum number of items to return. This is a suggestion for the
   * server. The server can return fewer liens than requested. If unspecified,
   * server picks an appropriate default.
   */
  pageSize?: number;
  /**
   * The `next_page_token` value returned from a previous List request, if any.
   */
  pageToken?: string;
  /**
   * Required. The name of the resource to list all attached Liens. For
   * example, `projects/1234`. (google.api.field_policy).resource_type
   * annotation is not set since the parent depends on the meta api
   * implementation. This field could be a project or other sub project
   * resources.
   */
  parent?: string;
}

/**
 * The response of ListEffectiveTags.
 */
export interface ListEffectiveTagsResponse {
  /**
   * A possibly paginated list of effective tags for the specified resource.
   */
  effectiveTags?: EffectiveTag[];
  /**
   * Pagination token. If the result set is too large to fit in a single
   * response, this token is returned. It encodes the position of the current
   * result cursor. Feeding this value into a new list request with the
   * `page_token` parameter gives the next page of the results. When
   * `next_page_token` is not filled in, there is no next page and the list
   * returned is the last page in the result set. Pagination tokens have a
   * limited lifetime.
   */
  nextPageToken?: string;
}

/**
 * The ListFolders response message.
 */
export interface ListFoldersResponse {
  /**
   * A possibly paginated list of folders that are direct descendants of the
   * specified parent resource.
   */
  folders?: Folder[];
  /**
   * A pagination token returned from a previous call to `ListFolders` that
   * indicates from where listing should continue.
   */
  nextPageToken?: string;
}

/**
 * The response message for Liens.ListLiens.
 */
export interface ListLiensResponse {
  /**
   * A list of Liens.
   */
  liens?: Lien[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeListLiensResponse(data: any): ListLiensResponse {
  return {
    ...data,
    liens: data["liens"] !== undefined ? data["liens"].map((item: any) => (serializeLien(item))) : undefined,
  };
}

function deserializeListLiensResponse(data: any): ListLiensResponse {
  return {
    ...data,
    liens: data["liens"] !== undefined ? data["liens"].map((item: any) => (deserializeLien(item))) : undefined,
  };
}

/**
 * A page of the response received from the ListProjects method. A paginated
 * response where more pages are available has `next_page_token` set. This token
 * can be used in a subsequent request to retrieve the next request page. NOTE:
 * A response may contain fewer elements than the request `page_size` and still
 * have a `next_page_token`.
 */
export interface ListProjectsResponse {
  /**
   * Pagination token. If the result set is too large to fit in a single
   * response, this token is returned. It encodes the position of the current
   * result cursor. Feeding this value into a new list request with the
   * `page_token` parameter gives the next page of the results. When
   * `next_page_token` is not filled in, there is no next page and the list
   * returned is the last page in the result set. Pagination tokens have a
   * limited lifetime.
   */
  nextPageToken?: string;
  /**
   * The list of Projects under the parent. This list can be paginated.
   */
  projects?: Project[];
}

/**
 * The ListTagBindings response.
 */
export interface ListTagBindingsResponse {
  /**
   * Pagination token. If the result set is too large to fit in a single
   * response, this token is returned. It encodes the position of the current
   * result cursor. Feeding this value into a new list request with the
   * `page_token` parameter gives the next page of the results. When
   * `next_page_token` is not filled in, there is no next page and the list
   * returned is the last page in the result set. Pagination tokens have a
   * limited lifetime.
   */
  nextPageToken?: string;
  /**
   * A possibly paginated list of TagBindings for the specified resource.
   */
  tagBindings?: TagBinding[];
}

/**
 * The ListTagHolds response.
 */
export interface ListTagHoldsResponse {
  /**
   * Pagination token. If the result set is too large to fit in a single
   * response, this token is returned. It encodes the position of the current
   * result cursor. Feeding this value into a new list request with the
   * `page_token` parameter gives the next page of the results. When
   * `next_page_token` is not filled in, there is no next page and the list
   * returned is the last page in the result set. Pagination tokens have a
   * limited lifetime.
   */
  nextPageToken?: string;
  /**
   * A possibly paginated list of TagHolds.
   */
  tagHolds?: TagHold[];
}

/**
 * The ListTagKeys response message.
 */
export interface ListTagKeysResponse {
  /**
   * A pagination token returned from a previous call to `ListTagKeys` that
   * indicates from where listing should continue.
   */
  nextPageToken?: string;
  /**
   * List of TagKeys that live under the specified parent in the request.
   */
  tagKeys?: TagKey[];
}

/**
 * The ListTagValues response.
 */
export interface ListTagValuesResponse {
  /**
   * A pagination token returned from a previous call to `ListTagValues` that
   * indicates from where listing should continue. This is currently not used,
   * but the server may at any point start supplying a valid token.
   */
  nextPageToken?: string;
  /**
   * A possibly paginated list of TagValues that are direct descendants of the
   * specified parent TagKey.
   */
  tagValues?: TagValue[];
}

/**
 * Metadata pertaining to the folder move process.
 */
export interface MoveFolderMetadata {
  /**
   * The resource name of the folder or organization to move the folder to.
   */
  destinationParent?: string;
  /**
   * The display name of the folder.
   */
  displayName?: string;
  /**
   * The resource name of the folder's parent.
   */
  sourceParent?: string;
}

/**
 * The MoveFolder request message.
 */
export interface MoveFolderRequest {
  /**
   * Required. The resource name of the folder or organization which should be
   * the folder's new parent. Must be of the form `folders/{folder_id}` or
   * `organizations/{org_id}`.
   */
  destinationParent?: string;
}

/**
 * A status object which is used as the `metadata` field for the Operation
 * returned by MoveProject.
 */
export interface MoveProjectMetadata {
}

/**
 * The request sent to MoveProject method.
 */
export interface MoveProjectRequest {
  /**
   * Required. The new parent to move the Project under.
   */
  destinationParent?: string;
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
 * The root node in the resource hierarchy to which a particular entity's (a
 * company, for example) resources belong.
 */
export interface Organization {
  /**
   * Output only. Timestamp when the Organization was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Timestamp when the Organization was requested for deletion.
   */
  readonly deleteTime?: Date;
  /**
   * Immutable. The G Suite / Workspace customer id used in the Directory API.
   */
  directoryCustomerId?: string;
  /**
   * Output only. A human-readable string that refers to the organization in
   * the Google Cloud Console. This string is set by the server and cannot be
   * changed. The string will be set to the primary domain (for example,
   * "google.com") of the Google Workspace customer that owns the organization.
   */
  readonly displayName?: string;
  /**
   * Output only. A checksum computed by the server based on the current value
   * of the Organization resource. This may be sent on update and delete
   * requests to ensure the client has an up-to-date value before proceeding.
   */
  readonly etag?: string;
  /**
   * Output only. The resource name of the organization. This is the
   * organization's relative path in the API. Its format is
   * "organizations/[organization_id]". For example, "organizations/1234".
   */
  readonly name?: string;
  /**
   * Output only. The organization's current lifecycle state.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "DELETE_REQUESTED";
  /**
   * Output only. Timestamp when the Organization was last modified.
   */
  readonly updateTime?: Date;
}

/**
 * Additional options for CloudResourceManager#organizationsSearch.
 */
export interface OrganizationsSearchOptions {
  /**
   * Optional. The maximum number of organizations to return in the response.
   * The server can return fewer organizations than requested. If unspecified,
   * server picks an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. A pagination token returned from a previous call to
   * `SearchOrganizations` that indicates from where listing should continue.
   */
  pageToken?: string;
  /**
   * Optional. An optional query string used to filter the Organizations to
   * return in the response. Query rules are case-insensitive. ``` | Field |
   * Description |
   * |------------------|--------------------------------------------| |
   * directoryCustomerId, owner.directoryCustomerId | Filters by directory
   * customer id. | | domain | Filters by domain. | ``` Organizations may be
   * queried by `directoryCustomerId` or by `domain`, where the domain is a G
   * Suite domain, for example: * Query `directorycustomerid:123456789` returns
   * Organization resources with `owner.directory_customer_id` equal to
   * `123456789`. * Query `domain:google.com` returns Organization resources
   * corresponding to the domain `google.com`.
   */
  query?: string;
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
 * A project is a high-level Google Cloud entity. It is a container for ACLs,
 * APIs, App Engine Apps, VMs, and other Google Cloud Platform resources.
 */
export interface Project {
  /**
   * Output only. Creation time.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time at which this resource was requested for deletion.
   */
  readonly deleteTime?: Date;
  /**
   * Optional. A user-assigned display name of the project. When present it
   * must be between 4 to 30 characters. Allowed characters are: lowercase and
   * uppercase letters, numbers, hyphen, single-quote, double-quote, space, and
   * exclamation point. Example: `My Project`
   */
  displayName?: string;
  /**
   * Output only. A checksum computed by the server based on the current value
   * of the Project resource. This may be sent on update and delete requests to
   * ensure the client has an up-to-date value before proceeding.
   */
  readonly etag?: string;
  /**
   * Optional. The labels associated with this project. Label keys must be
   * between 1 and 63 characters long and must conform to the following regular
   * expression: \[a-z\](\[-a-z0-9\]*\[a-z0-9\])?. Label values must be between
   * 0 and 63 characters long and must conform to the regular expression
   * (\[a-z\](\[-a-z0-9\]*\[a-z0-9\])?)?. No more than 64 labels can be
   * associated with a given resource. Clients should store labels in a
   * representation such as JSON that does not depend on specific characters
   * being disallowed. Example: `"myBusinessDimension" : "businessValue"`
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The unique resource name of the project. It is an int64
   * generated number prefixed by "projects/". Example: `projects/415104041262`
   */
  readonly name?: string;
  /**
   * Optional. A reference to a parent Resource. eg., `organizations/123` or
   * `folders/876`.
   */
  parent?: string;
  /**
   * Immutable. The unique, user-assigned id of the project. It must be 6 to 30
   * lowercase ASCII letters, digits, or hyphens. It must start with a letter.
   * Trailing hyphens are prohibited. Example: `tokyo-rain-123`
   */
  projectId?: string;
  /**
   * Output only. The project lifecycle state.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "DELETE_REQUESTED";
  /**
   * Output only. The most recent time this resource was modified.
   */
  readonly updateTime?: Date;
}

/**
 * A status object which is used as the `metadata` field for the Operation
 * returned by CreateProject. It provides insight for when significant phases of
 * Project creation have completed.
 */
export interface ProjectCreationStatus {
  /**
   * Creation time of the project creation workflow.
   */
  createTime?: Date;
  /**
   * True if the project can be retrieved using GetProject. No other operations
   * on the project are guaranteed to work until the project creation is
   * complete.
   */
  gettable?: boolean;
  /**
   * True if the project creation process is complete.
   */
  ready?: boolean;
}

function serializeProjectCreationStatus(data: any): ProjectCreationStatus {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeProjectCreationStatus(data: any): ProjectCreationStatus {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Additional options for CloudResourceManager#projectsList.
 */
export interface ProjectsListOptions {
  /**
   * Optional. The maximum number of projects to return in the response. The
   * server can return fewer projects than requested. If unspecified, server
   * picks an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. A pagination token returned from a previous call to ListProjects
   * that indicates from where listing should continue.
   */
  pageToken?: string;
  /**
   * Required. The name of the parent resource whose projects are being listed.
   * Only children of this parent resource are listed; descendants are not
   * listed. If the parent is a folder, use the value `folders/{folder_id}`. If
   * the parent is an organization, use the value `organizations/{org_id}`.
   */
  parent?: string;
  /**
   * Optional. Indicate that projects in the `DELETE_REQUESTED` state should
   * also be returned. Normally only `ACTIVE` projects are returned.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for CloudResourceManager#projectsPatch.
 */
export interface ProjectsPatchOptions {
  /**
   * Optional. An update mask to selectively update fields.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsPatchOptions(data: any): ProjectsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsPatchOptions(data: any): ProjectsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudResourceManager#projectsSearch.
 */
export interface ProjectsSearchOptions {
  /**
   * Optional. The maximum number of projects to return in the response. The
   * server can return fewer projects than requested. If unspecified, server
   * picks an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. A pagination token returned from a previous call to ListProjects
   * that indicates from where listing should continue.
   */
  pageToken?: string;
  /**
   * Optional. A query string for searching for projects that the caller has
   * `resourcemanager.projects.get` permission to. If multiple fields are
   * included in the query, then it will return results that match any of the
   * fields. Some eligible fields are: ``` | Field | Description |
   * |-------------------------|----------------------------------------------|
   * | displayName, name | Filters by displayName. | | parent | Project's parent
   * (for example: folders/123, organizations/*). Prefer parent field over
   * parent.type and parent.id.| | parent.type | Parent's type: `folder` or
   * `organization`. | | parent.id | Parent's id number (for example: 123) | |
   * id, projectId | Filters by projectId. | | state, lifecycleState | Filters
   * by state. | | labels | Filters by label name or value. | | labels.\ (where
   * *key* is the name of a label) | Filters by label name.| ``` Search
   * expressions are case insensitive. Some examples queries: ``` | Query |
   * Description |
   * |------------------|-----------------------------------------------------|
   * | name:how* | The project's name starts with "how". | | name:Howl | The
   * project's name is `Howl` or `howl`. | | name:HOWL | Equivalent to above. |
   * | NAME:howl | Equivalent to above. | | labels.color:* | The project has the
   * label `color`. | | labels.color:red | The project's label `color` has the
   * value `red`. | | labels.color:red labels.size:big | The project's label
   * `color` has the value `red` or its label `size` has the value `big`. | ```
   * If no query is specified, the call will return projects for which the user
   * has the `resourcemanager.projects.get` permission.
   */
  query?: string;
}

/**
 * The response message for searching folders.
 */
export interface SearchFoldersResponse {
  /**
   * A possibly paginated folder search results. the specified parent resource.
   */
  folders?: Folder[];
  /**
   * A pagination token returned from a previous call to `SearchFolders` that
   * indicates from where searching should continue.
   */
  nextPageToken?: string;
}

/**
 * The response returned from the `SearchOrganizations` method.
 */
export interface SearchOrganizationsResponse {
  /**
   * A pagination token to be used to retrieve the next page of results. If the
   * result is too large to fit within the page size specified in the request,
   * this field will be set with a token that can be used to fetch the next page
   * of results. If this field is empty, it indicates that this response
   * contains the last page of results.
   */
  nextPageToken?: string;
  /**
   * The list of Organizations that matched the search query, possibly
   * paginated.
   */
  organizations?: Organization[];
}

/**
 * A page of the response received from the SearchProjects method. A paginated
 * response where more pages are available has `next_page_token` set. This token
 * can be used in a subsequent request to retrieve the next request page.
 */
export interface SearchProjectsResponse {
  /**
   * Pagination token. If the result set is too large to fit in a single
   * response, this token is returned. It encodes the position of the current
   * result cursor. Feeding this value into a new list request with the
   * `page_token` parameter gives the next page of the results. When
   * `next_page_token` is not filled in, there is no next page and the list
   * returned is the last page in the result set. Pagination tokens have a
   * limited lifetime.
   */
  nextPageToken?: string;
  /**
   * The list of Projects that matched the list filter query. This list can be
   * paginated.
   */
  projects?: Project[];
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
 * A TagBinding represents a connection between a TagValue and a cloud resource
 * Once a TagBinding is created, the TagValue is applied to all the descendants
 * of the Google Cloud resource.
 */
export interface TagBinding {
  /**
   * Output only. The name of the TagBinding. This is a String of the form:
   * `tagBindings/{full-resource-name}/{tag-value-name}` (e.g.
   * `tagBindings/%2F%2Fcloudresourcemanager.googleapis.com%2Fprojects%2F123/tagValues/456`).
   */
  readonly name?: string;
  /**
   * The full resource name of the resource the TagValue is bound to. E.g.
   * `//cloudresourcemanager.googleapis.com/projects/123`
   */
  parent?: string;
  /**
   * The TagValue of the TagBinding. Must be of the form `tagValues/456`.
   */
  tagValue?: string;
}

/**
 * Additional options for CloudResourceManager#tagBindingsCreate.
 */
export interface TagBindingsCreateOptions {
  /**
   * Optional. Set to true to perform the validations necessary for creating
   * the resource, but not actually perform the action.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for CloudResourceManager#tagBindingsList.
 */
export interface TagBindingsListOptions {
  /**
   * Optional. The maximum number of TagBindings to return in the response. The
   * server allows a maximum of 300 TagBindings to return. If unspecified, the
   * server will use 100 as the default.
   */
  pageSize?: number;
  /**
   * Optional. A pagination token returned from a previous call to
   * `ListTagBindings` that indicates where this listing should continue from.
   */
  pageToken?: string;
  /**
   * Required. The full resource name of a resource for which you want to list
   * existing TagBindings. E.g.
   * "//cloudresourcemanager.googleapis.com/projects/123"
   */
  parent?: string;
}

/**
 * A TagHold represents the use of a TagValue that is not captured by
 * TagBindings. If a TagValue has any TagHolds, deletion will be blocked. This
 * resource is intended to be created in the same cloud location as the
 * `holder`.
 */
export interface TagHold {
  /**
   * Output only. The time this TagHold was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. A URL where an end user can learn more about removing this hold.
   * E.g.
   * `https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing`
   */
  helpLink?: string;
  /**
   * Required. The name of the resource where the TagValue is being used. Must
   * be less than 200 characters. E.g.
   * `//compute.googleapis.com/compute/projects/myproject/regions/us-east-1/instanceGroupManagers/instance-group`
   */
  holder?: string;
  /**
   * Output only. The resource name of a TagHold. This is a String of the form:
   * `tagValues/{tag-value-id}/tagHolds/{tag-hold-id}` (e.g.
   * `tagValues/123/tagHolds/456`). This resource name is generated by the
   * server.
   */
  readonly name?: string;
  /**
   * Optional. An optional string representing the origin of this request. This
   * field should include human-understandable information to distinguish
   * origins from each other. Must be less than 200 characters. E.g.
   * `migs-35678234`
   */
  origin?: string;
}

/**
 * A TagKey, used to group a set of TagValues.
 */
export interface TagKey {
  /**
   * Output only. Creation time.
   */
  readonly createTime?: Date;
  /**
   * Optional. User-assigned description of the TagKey. Must not exceed 256
   * characters. Read-write.
   */
  description?: string;
  /**
   * Optional. Entity tag which users can pass to prevent race conditions. This
   * field is always set in server responses. See UpdateTagKeyRequest for
   * details.
   */
  etag?: string;
  /**
   * Immutable. The resource name for a TagKey. Must be in the format
   * `tagKeys/{tag_key_id}`, where `tag_key_id` is the generated numeric id for
   * the TagKey.
   */
  name?: string;
  /**
   * Output only. Immutable. Namespaced name of the TagKey.
   */
  readonly namespacedName?: string;
  /**
   * Immutable. The resource name of the new TagKey's parent. Must be of the
   * form `organizations/{org_id}`.
   */
  parent?: string;
  /**
   * Optional. A purpose denotes that this Tag is intended for use in policies
   * of a specific policy engine, and will involve that policy engine in
   * management operations involving this Tag. A purpose does not grant a policy
   * engine exclusive rights to the Tag, and it may be referenced by other
   * policy engines. A purpose cannot be changed once set.
   */
  purpose?:  | "PURPOSE_UNSPECIFIED" | "GCE_FIREWALL";
  /**
   * Optional. Purpose data corresponds to the policy system that the tag is
   * intended for. See documentation for `Purpose` for formatting of this field.
   * Purpose data cannot be changed once set.
   */
  purposeData?: {
    [key: string]: string
  };
  /**
   * Required. Immutable. The user friendly name for a TagKey. The short name
   * should be unique for TagKeys within the same tag namespace. The short name
   * must be 1-63 characters, beginning and ending with an alphanumeric
   * character ([a-z0-9A-Z]) with dashes (-), underscores (_), dots (.), and
   * alphanumerics between.
   */
  shortName?: string;
  /**
   * Output only. Update time.
   */
  readonly updateTime?: Date;
}

/**
 * Additional options for CloudResourceManager#tagKeysCreate.
 */
export interface TagKeysCreateOptions {
  /**
   * Optional. Set to true to perform validations necessary for creating the
   * resource, but not actually perform the action.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for CloudResourceManager#tagKeysDelete.
 */
export interface TagKeysDeleteOptions {
  /**
   * Optional. The etag known to the client for the expected state of the
   * TagKey. This is to be used for optimistic concurrency.
   */
  etag?: string;
  /**
   * Optional. Set as true to perform validations necessary for deletion, but
   * not actually perform the action.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for CloudResourceManager#tagKeysList.
 */
export interface TagKeysListOptions {
  /**
   * Optional. The maximum number of TagKeys to return in the response. The
   * server allows a maximum of 300 TagKeys to return. If unspecified, the
   * server will use 100 as the default.
   */
  pageSize?: number;
  /**
   * Optional. A pagination token returned from a previous call to `ListTagKey`
   * that indicates where this listing should continue from.
   */
  pageToken?: string;
  /**
   * Required. The resource name of the new TagKey's parent. Must be of the
   * form `folders/{folder_id}` or `organizations/{org_id}`.
   */
  parent?: string;
}

/**
 * Additional options for CloudResourceManager#tagKeysPatch.
 */
export interface TagKeysPatchOptions {
  /**
   * Fields to be updated. The mask may only contain `description` or `etag`.
   * If omitted entirely, both `description` and `etag` are assumed to be
   * significant.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Set as true to perform validations necessary for updating the resource,
   * but not actually perform the action.
   */
  validateOnly?: boolean;
}

function serializeTagKeysPatchOptions(data: any): TagKeysPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeTagKeysPatchOptions(data: any): TagKeysPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A TagValue is a child of a particular TagKey. This is used to group cloud
 * resources for the purpose of controlling them using policies.
 */
export interface TagValue {
  /**
   * Output only. Creation time.
   */
  readonly createTime?: Date;
  /**
   * Optional. User-assigned description of the TagValue. Must not exceed 256
   * characters. Read-write.
   */
  description?: string;
  /**
   * Optional. Entity tag which users can pass to prevent race conditions. This
   * field is always set in server responses. See UpdateTagValueRequest for
   * details.
   */
  etag?: string;
  /**
   * Immutable. Resource name for TagValue in the format `tagValues/456`.
   */
  name?: string;
  /**
   * Output only. Namespaced name of the TagValue. Now only supported in the
   * format `{organization_id}/{tag_key_short_name}/{short_name}`. Other formats
   * will be supported when we add non-org parented tags.
   */
  readonly namespacedName?: string;
  /**
   * Immutable. The resource name of the new TagValue's parent TagKey. Must be
   * of the form `tagKeys/{tag_key_id}`.
   */
  parent?: string;
  /**
   * Required. Immutable. User-assigned short name for TagValue. The short name
   * should be unique for TagValues within the same parent TagKey. The short
   * name must be 63 characters or less, beginning and ending with an
   * alphanumeric character ([a-z0-9A-Z]) with dashes (-), underscores (_), dots
   * (.), and alphanumerics between.
   */
  shortName?: string;
  /**
   * Output only. Update time.
   */
  readonly updateTime?: Date;
}

/**
 * Additional options for CloudResourceManager#tagValuesCreate.
 */
export interface TagValuesCreateOptions {
  /**
   * Optional. Set as true to perform the validations necessary for creating
   * the resource, but not actually perform the action.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for CloudResourceManager#tagValuesDelete.
 */
export interface TagValuesDeleteOptions {
  /**
   * Optional. The etag known to the client for the expected state of the
   * TagValue. This is to be used for optimistic concurrency.
   */
  etag?: string;
  /**
   * Optional. Set as true to perform the validations necessary for deletion,
   * but not actually perform the action.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for CloudResourceManager#tagValuesList.
 */
export interface TagValuesListOptions {
  /**
   * Optional. The maximum number of TagValues to return in the response. The
   * server allows a maximum of 300 TagValues to return. If unspecified, the
   * server will use 100 as the default.
   */
  pageSize?: number;
  /**
   * Optional. A pagination token returned from a previous call to
   * `ListTagValues` that indicates where this listing should continue from.
   */
  pageToken?: string;
  /**
   * Required.
   */
  parent?: string;
}

/**
 * Additional options for CloudResourceManager#tagValuesPatch.
 */
export interface TagValuesPatchOptions {
  /**
   * Optional. Fields to be updated.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. True to perform validations necessary for updating the resource,
   * but not actually perform the action.
   */
  validateOnly?: boolean;
}

function serializeTagValuesPatchOptions(data: any): TagValuesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeTagValuesPatchOptions(data: any): TagValuesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudResourceManager#tagValuesTagHoldsCreate.
 */
export interface TagValuesTagHoldsCreateOptions {
  /**
   * Optional. Set to true to perform the validations necessary for creating
   * the resource, but not actually perform the action.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for CloudResourceManager#tagValuesTagHoldsDelete.
 */
export interface TagValuesTagHoldsDeleteOptions {
  /**
   * Optional. Set to true to perform the validations necessary for deleting
   * the resource, but not actually perform the action.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for CloudResourceManager#tagValuesTagHoldsList.
 */
export interface TagValuesTagHoldsListOptions {
  /**
   * Optional. Criteria used to select a subset of TagHolds parented by the
   * TagValue to return. This field follows the syntax defined by aip.dev/160;
   * the `holder` and `origin` fields are supported for filtering. Currently
   * only `AND` syntax is supported. Some example queries are: * `holder =
   * //compute.googleapis.com/compute/projects/myproject/regions/us-east-1/instanceGroupManagers/instance-group`
   * * `origin = 35678234` * `holder =
   * //compute.googleapis.com/compute/projects/myproject/regions/us-east-1/instanceGroupManagers/instance-group
   * AND origin = 35678234`
   */
  filter?: string;
  /**
   * Optional. The maximum number of TagHolds to return in the response. The
   * server allows a maximum of 300 TagHolds to return. If unspecified, the
   * server will use 100 as the default.
   */
  pageSize?: number;
  /**
   * Optional. A pagination token returned from a previous call to
   * `ListTagHolds` that indicates where this listing should continue from.
   */
  pageToken?: string;
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
 * A status object which is used as the `metadata` field for the `Operation`
 * returned by `UndeleteFolder`.
 */
export interface UndeleteFolderMetadata {
}

/**
 * The UndeleteFolder request message.
 */
export interface UndeleteFolderRequest {
}

/**
 * A status object which is used as the `metadata` field for the Operation
 * returned by UndeleteOrganization.
 */
export interface UndeleteOrganizationMetadata {
}

/**
 * A status object which is used as the `metadata` field for the Operation
 * returned by `UndeleteProject`.
 */
export interface UndeleteProjectMetadata {
}

/**
 * The request sent to the UndeleteProject method.
 */
export interface UndeleteProjectRequest {
}

/**
 * A status object which is used as the `metadata` field for the Operation
 * returned by UpdateFolder.
 */
export interface UpdateFolderMetadata {
}

/**
 * A status object which is used as the `metadata` field for the Operation
 * returned by UpdateProject.
 */
export interface UpdateProjectMetadata {
}

/**
 * Runtime operation information for updating a TagKey.
 */
export interface UpdateTagKeyMetadata {
}

/**
 * Runtime operation information for updating a TagValue.
 */
export interface UpdateTagValueMetadata {
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
