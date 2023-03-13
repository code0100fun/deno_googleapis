// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Dataform API Client for Deno
 * ============================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/dataform/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class Dataform {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://dataform.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
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
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }/locations`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.includeUnrevealedLocations !== undefined) {
      url.searchParams.append("includeUnrevealedLocations", String(opts.includeUnrevealedLocations));
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
   * Applies a Git commit to a Repository. The Repository must not have a value
   * for `git_remote_settings.url`.
   *
   * @param name Required. The repository's name.
   */
  async projectsLocationsRepositoriesCommit(name: string, req: CommitRepositoryChangesRequest): Promise<Empty> {
    req = serializeCommitRepositoryChangesRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:commit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Creates a new CompilationResult in a given project and location.
   *
   * @param parent Required. The repository in which to create the compilation result. Must be in the format `projects/*\/locations/*\/repositories/*`.
   */
  async projectsLocationsRepositoriesCompilationResultsCreate(parent: string, req: CompilationResult): Promise<CompilationResult> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/compilationResults`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CompilationResult;
  }

  /**
   * Fetches a single CompilationResult.
   *
   * @param name Required. The compilation result's name.
   */
  async projectsLocationsRepositoriesCompilationResultsGet(name: string): Promise<CompilationResult> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CompilationResult;
  }

  /**
   * Lists CompilationResults in a given Repository.
   *
   * @param parent Required. The repository in which to list compilation results. Must be in the format `projects/*\/locations/*\/repositories/*`.
   */
  async projectsLocationsRepositoriesCompilationResultsList(parent: string, opts: ProjectsLocationsRepositoriesCompilationResultsListOptions = {}): Promise<ListCompilationResultsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/compilationResults`);
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
    return data as ListCompilationResultsResponse;
  }

  /**
   * Returns CompilationResultActions in a given CompilationResult.
   *
   * @param name Required. The compilation result's name.
   */
  async projectsLocationsRepositoriesCompilationResultsQuery(name: string, opts: ProjectsLocationsRepositoriesCompilationResultsQueryOptions = {}): Promise<QueryCompilationResultActionsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:query`);
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
    return data as QueryCompilationResultActionsResponse;
  }

  /**
   * Creates a new Repository in a given project and location.
   *
   * @param parent Required. The location in which to create the repository. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsRepositoriesCreate(parent: string, req: Repository, opts: ProjectsLocationsRepositoriesCreateOptions = {}): Promise<Repository> {
    req = serializeRepository(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/repositories`);
    if (opts.repositoryId !== undefined) {
      url.searchParams.append("repositoryId", String(opts.repositoryId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRepository(data);
  }

  /**
   * Deletes a single Repository.
   *
   * @param name Required. The repository's name.
   */
  async projectsLocationsRepositoriesDelete(name: string, opts: ProjectsLocationsRepositoriesDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Fetches a Repository's history of changes. The Repository must not have a
   * value for `git_remote_settings.url`.
   *
   * @param name Required. The repository's name.
   */
  async projectsLocationsRepositoriesFetchHistory(name: string, opts: ProjectsLocationsRepositoriesFetchHistoryOptions = {}): Promise<FetchRepositoryHistoryResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:fetchHistory`);
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
    return deserializeFetchRepositoryHistoryResponse(data);
  }

  /**
   * Fetches a Repository's remote branches.
   *
   * @param name Required. The repository's name.
   */
  async projectsLocationsRepositoriesFetchRemoteBranches(name: string): Promise<FetchRemoteBranchesResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:fetchRemoteBranches`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as FetchRemoteBranchesResponse;
  }

  /**
   * Fetches a single Repository.
   *
   * @param name Required. The repository's name.
   */
  async projectsLocationsRepositoriesGet(name: string): Promise<Repository> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRepository(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRepositoriesGetIamPolicy(resource: string, opts: ProjectsLocationsRepositoriesGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ resource }:getIamPolicy`);
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
   * Lists Repositories in a given project and location.
   *
   * @param parent Required. The location in which to list repositories. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsRepositoriesList(parent: string, opts: ProjectsLocationsRepositoriesListOptions = {}): Promise<ListRepositoriesResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/repositories`);
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
    return deserializeListRepositoriesResponse(data);
  }

  /**
   * Updates a single Repository.
   *
   * @param name Output only. The repository's name.
   */
  async projectsLocationsRepositoriesPatch(name: string, req: Repository, opts: ProjectsLocationsRepositoriesPatchOptions = {}): Promise<Repository> {
    req = serializeRepository(req);
    opts = serializeProjectsLocationsRepositoriesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeRepository(data);
  }

  /**
   * Returns the contents of a given Repository directory. The Repository must
   * not have a value for `git_remote_settings.url`.
   *
   * @param name Required. The repository's name.
   */
  async projectsLocationsRepositoriesQueryDirectoryContents(name: string, opts: ProjectsLocationsRepositoriesQueryDirectoryContentsOptions = {}): Promise<QueryRepositoryDirectoryContentsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:queryDirectoryContents`);
    if (opts.commitSha !== undefined) {
      url.searchParams.append("commitSha", String(opts.commitSha));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.path !== undefined) {
      url.searchParams.append("path", String(opts.path));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as QueryRepositoryDirectoryContentsResponse;
  }

  /**
   * Returns the contents of a file (inside a Repository). The Repository must
   * not have a value for `git_remote_settings.url`.
   *
   * @param name Required. The repository's name.
   */
  async projectsLocationsRepositoriesReadFile(name: string, opts: ProjectsLocationsRepositoriesReadFileOptions = {}): Promise<ReadRepositoryFileResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:readFile`);
    if (opts.commitSha !== undefined) {
      url.searchParams.append("commitSha", String(opts.commitSha));
    }
    if (opts.path !== undefined) {
      url.searchParams.append("path", String(opts.path));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReadRepositoryFileResponse(data);
  }

  /**
   * Creates a new ReleaseConfig in a given Repository.
   *
   * @param parent Required. The repository in which to create the release config. Must be in the format `projects/*\/locations/*\/repositories/*`.
   */
  async projectsLocationsRepositoriesReleaseConfigsCreate(parent: string, req: ReleaseConfig, opts: ProjectsLocationsRepositoriesReleaseConfigsCreateOptions = {}): Promise<ReleaseConfig> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/releaseConfigs`);
    if (opts.releaseConfigId !== undefined) {
      url.searchParams.append("releaseConfigId", String(opts.releaseConfigId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReleaseConfig;
  }

  /**
   * Deletes a single ReleaseConfig.
   *
   * @param name Required. The release config's name.
   */
  async projectsLocationsRepositoriesReleaseConfigsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Fetches a single ReleaseConfig.
   *
   * @param name Required. The release config's name.
   */
  async projectsLocationsRepositoriesReleaseConfigsGet(name: string): Promise<ReleaseConfig> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ReleaseConfig;
  }

  /**
   * Lists ReleaseConfigs in a given Repository.
   *
   * @param parent Required. The repository in which to list release configs. Must be in the format `projects/*\/locations/*\/repositories/*`.
   */
  async projectsLocationsRepositoriesReleaseConfigsList(parent: string, opts: ProjectsLocationsRepositoriesReleaseConfigsListOptions = {}): Promise<ListReleaseConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/releaseConfigs`);
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
    return data as ListReleaseConfigsResponse;
  }

  /**
   * Updates a single ReleaseConfig.
   *
   * @param name Output only. The release config's name.
   */
  async projectsLocationsRepositoriesReleaseConfigsPatch(name: string, req: ReleaseConfig, opts: ProjectsLocationsRepositoriesReleaseConfigsPatchOptions = {}): Promise<ReleaseConfig> {
    opts = serializeProjectsLocationsRepositoriesReleaseConfigsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as ReleaseConfig;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRepositoriesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRepositoriesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Creates a new WorkflowConfig in a given Repository.
   *
   * @param parent Required. The repository in which to create the workflow config. Must be in the format `projects/*\/locations/*\/repositories/*`.
   */
  async projectsLocationsRepositoriesWorkflowConfigsCreate(parent: string, req: WorkflowConfig, opts: ProjectsLocationsRepositoriesWorkflowConfigsCreateOptions = {}): Promise<WorkflowConfig> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/workflowConfigs`);
    if (opts.workflowConfigId !== undefined) {
      url.searchParams.append("workflowConfigId", String(opts.workflowConfigId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as WorkflowConfig;
  }

  /**
   * Deletes a single WorkflowConfig.
   *
   * @param name Required. The workflow config's name.
   */
  async projectsLocationsRepositoriesWorkflowConfigsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Fetches a single WorkflowConfig.
   *
   * @param name Required. The workflow config's name.
   */
  async projectsLocationsRepositoriesWorkflowConfigsGet(name: string): Promise<WorkflowConfig> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as WorkflowConfig;
  }

  /**
   * Lists WorkflowConfigs in a given Repository.
   *
   * @param parent Required. The repository in which to list workflow configs. Must be in the format `projects/*\/locations/*\/repositories/*`.
   */
  async projectsLocationsRepositoriesWorkflowConfigsList(parent: string, opts: ProjectsLocationsRepositoriesWorkflowConfigsListOptions = {}): Promise<ListWorkflowConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/workflowConfigs`);
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
    return data as ListWorkflowConfigsResponse;
  }

  /**
   * Updates a single WorkflowConfig.
   *
   * @param name Output only. The workflow config's name.
   */
  async projectsLocationsRepositoriesWorkflowConfigsPatch(name: string, req: WorkflowConfig, opts: ProjectsLocationsRepositoriesWorkflowConfigsPatchOptions = {}): Promise<WorkflowConfig> {
    opts = serializeProjectsLocationsRepositoriesWorkflowConfigsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as WorkflowConfig;
  }

  /**
   * Requests cancellation of a running WorkflowInvocation.
   *
   * @param name Required. The workflow invocation resource's name.
   */
  async projectsLocationsRepositoriesWorkflowInvocationsCancel(name: string, req: CancelWorkflowInvocationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Creates a new WorkflowInvocation in a given Repository.
   *
   * @param parent Required. The repository in which to create the workflow invocation. Must be in the format `projects/*\/locations/*\/repositories/*`.
   */
  async projectsLocationsRepositoriesWorkflowInvocationsCreate(parent: string, req: WorkflowInvocation): Promise<WorkflowInvocation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/workflowInvocations`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as WorkflowInvocation;
  }

  /**
   * Deletes a single WorkflowInvocation.
   *
   * @param name Required. The workflow invocation resource's name.
   */
  async projectsLocationsRepositoriesWorkflowInvocationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Fetches a single WorkflowInvocation.
   *
   * @param name Required. The workflow invocation resource's name.
   */
  async projectsLocationsRepositoriesWorkflowInvocationsGet(name: string): Promise<WorkflowInvocation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as WorkflowInvocation;
  }

  /**
   * Lists WorkflowInvocations in a given Repository.
   *
   * @param parent Required. The parent resource of the WorkflowInvocation type. Must be in the format `projects/*\/locations/*\/repositories/*`.
   */
  async projectsLocationsRepositoriesWorkflowInvocationsList(parent: string, opts: ProjectsLocationsRepositoriesWorkflowInvocationsListOptions = {}): Promise<ListWorkflowInvocationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/workflowInvocations`);
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
    return data as ListWorkflowInvocationsResponse;
  }

  /**
   * Returns WorkflowInvocationActions in a given WorkflowInvocation.
   *
   * @param name Required. The workflow invocation's name.
   */
  async projectsLocationsRepositoriesWorkflowInvocationsQuery(name: string, opts: ProjectsLocationsRepositoriesWorkflowInvocationsQueryOptions = {}): Promise<QueryWorkflowInvocationActionsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:query`);
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
    return data as QueryWorkflowInvocationActionsResponse;
  }

  /**
   * Applies a Git commit for uncommitted files in a Workspace.
   *
   * @param name Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesCommit(name: string, req: CommitWorkspaceChangesRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:commit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Creates a new Workspace in a given Repository.
   *
   * @param parent Required. The repository in which to create the workspace. Must be in the format `projects/*\/locations/*\/repositories/*`.
   */
  async projectsLocationsRepositoriesWorkspacesCreate(parent: string, req: Workspace, opts: ProjectsLocationsRepositoriesWorkspacesCreateOptions = {}): Promise<Workspace> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/workspaces`);
    if (opts.workspaceId !== undefined) {
      url.searchParams.append("workspaceId", String(opts.workspaceId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Workspace;
  }

  /**
   * Deletes a single Workspace.
   *
   * @param name Required. The workspace resource's name.
   */
  async projectsLocationsRepositoriesWorkspacesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Fetches Git diff for an uncommitted file in a Workspace.
   *
   * @param workspace Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesFetchFileDiff(workspace: string, opts: ProjectsLocationsRepositoriesWorkspacesFetchFileDiffOptions = {}): Promise<FetchFileDiffResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ workspace }:fetchFileDiff`);
    if (opts.path !== undefined) {
      url.searchParams.append("path", String(opts.path));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as FetchFileDiffResponse;
  }

  /**
   * Fetches Git statuses for the files in a Workspace.
   *
   * @param name Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesFetchFileGitStatuses(name: string): Promise<FetchFileGitStatusesResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:fetchFileGitStatuses`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as FetchFileGitStatusesResponse;
  }

  /**
   * Fetches Git ahead/behind against a remote branch.
   *
   * @param name Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesFetchGitAheadBehind(name: string, opts: ProjectsLocationsRepositoriesWorkspacesFetchGitAheadBehindOptions = {}): Promise<FetchGitAheadBehindResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:fetchGitAheadBehind`);
    if (opts.remoteBranch !== undefined) {
      url.searchParams.append("remoteBranch", String(opts.remoteBranch));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as FetchGitAheadBehindResponse;
  }

  /**
   * Fetches a single Workspace.
   *
   * @param name Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesGet(name: string): Promise<Workspace> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Workspace;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRepositoriesWorkspacesGetIamPolicy(resource: string, opts: ProjectsLocationsRepositoriesWorkspacesGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ resource }:getIamPolicy`);
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
   * Installs dependency NPM packages (inside a Workspace).
   *
   * @param workspace Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesInstallNpmPackages(workspace: string, req: InstallNpmPackagesRequest): Promise<InstallNpmPackagesResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ workspace }:installNpmPackages`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as InstallNpmPackagesResponse;
  }

  /**
   * Lists Workspaces in a given Repository.
   *
   * @param parent Required. The repository in which to list workspaces. Must be in the format `projects/*\/locations/*\/repositories/*`.
   */
  async projectsLocationsRepositoriesWorkspacesList(parent: string, opts: ProjectsLocationsRepositoriesWorkspacesListOptions = {}): Promise<ListWorkspacesResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/workspaces`);
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
    return data as ListWorkspacesResponse;
  }

  /**
   * Creates a directory inside a Workspace.
   *
   * @param workspace Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesMakeDirectory(workspace: string, req: MakeDirectoryRequest): Promise<MakeDirectoryResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ workspace }:makeDirectory`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as MakeDirectoryResponse;
  }

  /**
   * Moves a directory (inside a Workspace), and all of its contents, to a new
   * location.
   *
   * @param workspace Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesMoveDirectory(workspace: string, req: MoveDirectoryRequest): Promise<MoveDirectoryResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ workspace }:moveDirectory`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as MoveDirectoryResponse;
  }

  /**
   * Moves a file (inside a Workspace) to a new location.
   *
   * @param workspace Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesMoveFile(workspace: string, req: MoveFileRequest): Promise<MoveFileResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ workspace }:moveFile`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as MoveFileResponse;
  }

  /**
   * Pulls Git commits from the Repository's remote into a Workspace.
   *
   * @param name Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesPull(name: string, req: PullGitCommitsRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:pull`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Pushes Git commits from a Workspace to the Repository's remote.
   *
   * @param name Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesPush(name: string, req: PushGitCommitsRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:push`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Returns the contents of a given Workspace directory.
   *
   * @param workspace Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesQueryDirectoryContents(workspace: string, opts: ProjectsLocationsRepositoriesWorkspacesQueryDirectoryContentsOptions = {}): Promise<QueryDirectoryContentsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ workspace }:queryDirectoryContents`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.path !== undefined) {
      url.searchParams.append("path", String(opts.path));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as QueryDirectoryContentsResponse;
  }

  /**
   * Returns the contents of a file (inside a Workspace).
   *
   * @param workspace Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesReadFile(workspace: string, opts: ProjectsLocationsRepositoriesWorkspacesReadFileOptions = {}): Promise<ReadFileResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ workspace }:readFile`);
    if (opts.path !== undefined) {
      url.searchParams.append("path", String(opts.path));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReadFileResponse(data);
  }

  /**
   * Deletes a directory (inside a Workspace) and all of its contents.
   *
   * @param workspace Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesRemoveDirectory(workspace: string, req: RemoveDirectoryRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ workspace }:removeDirectory`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Deletes a file (inside a Workspace).
   *
   * @param workspace Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesRemoveFile(workspace: string, req: RemoveFileRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ workspace }:removeFile`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Performs a Git reset for uncommitted files in a Workspace.
   *
   * @param name Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesReset(name: string, req: ResetWorkspaceChangesRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:reset`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRepositoriesWorkspacesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRepositoriesWorkspacesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Writes to a file (inside a Workspace).
   *
   * @param workspace Required. The workspace's name.
   */
  async projectsLocationsRepositoriesWorkspacesWriteFile(workspace: string, req: WriteFileRequest): Promise<WriteFileResponse> {
    req = serializeWriteFileRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ workspace }:writeFile`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as WriteFileResponse;
  }
}

/**
 * Represents an assertion upon a SQL query which is required return zero rows.
 */
export interface Assertion {
  /**
   * A list of actions that this action depends on.
   */
  dependencyTargets?: Target[];
  /**
   * Whether this action is disabled (i.e. should not be run).
   */
  disabled?: boolean;
  /**
   * The parent action of this assertion. Only set if this assertion was
   * automatically generated.
   */
  parentAction?: Target;
  /**
   * Descriptor for the assertion's automatically-generated view and its
   * columns.
   */
  relationDescriptor?: RelationDescriptor;
  /**
   * The SELECT query which must return zero rows in order for this assertion
   * to succeed.
   */
  selectQuery?: string;
  /**
   * Arbitrary, user-defined tags on this action.
   */
  tags?: string[];
}

/**
 * Represents a workflow action that will run against BigQuery.
 */
export interface BigQueryAction {
  /**
   * Output only. The generated BigQuery SQL script that will be executed.
   */
  readonly sqlScript?: string;
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
 * `CancelWorkflowInvocation` request message.
 */
export interface CancelWorkflowInvocationRequest {
}

/**
 * Configures various aspects of Dataform code compilation.
 */
export interface CodeCompilationConfig {
  /**
   * Optional. The default schema (BigQuery dataset ID) for assertions.
   */
  assertionSchema?: string;
  /**
   * Optional. The suffix that should be appended to all database (Google Cloud
   * project ID) names.
   */
  databaseSuffix?: string;
  /**
   * Optional. The default database (Google Cloud project ID).
   */
  defaultDatabase?: string;
  /**
   * Optional. The default BigQuery location to use. Defaults to "US". See the
   * BigQuery docs for a full list of locations:
   * https://cloud.google.com/bigquery/docs/locations.
   */
  defaultLocation?: string;
  /**
   * Optional. The default schema (BigQuery dataset ID).
   */
  defaultSchema?: string;
  /**
   * Optional. The suffix that should be appended to all schema (BigQuery
   * dataset ID) names.
   */
  schemaSuffix?: string;
  /**
   * Optional. The prefix that should be prepended to all table names.
   */
  tablePrefix?: string;
  /**
   * Optional. User-defined variables that are made available to project code
   * during compilation.
   */
  vars?: {
    [key: string]: string
  };
}

/**
 * Describes a column.
 */
export interface ColumnDescriptor {
  /**
   * A list of BigQuery policy tags that will be applied to the column.
   */
  bigqueryPolicyTags?: string[];
  /**
   * A textual description of the column.
   */
  description?: string;
  /**
   * The identifier for the column. Each entry in `path` represents one level
   * of nesting.
   */
  path?: string[];
}

/**
 * Represents the author of a Git commit.
 */
export interface CommitAuthor {
  /**
   * Required. The commit author's email address.
   */
  emailAddress?: string;
  /**
   * Required. The commit author's name.
   */
  name?: string;
}

/**
 * Represents a single commit log.
 */
export interface CommitLogEntry {
  /**
   * The commit author for this commit log entry.
   */
  author?: CommitAuthor;
  /**
   * The commit message for this commit log entry.
   */
  commitMessage?: string;
  /**
   * The commit SHA for this commit log entry.
   */
  commitSha?: string;
  /**
   * Commit timestamp.
   */
  commitTime?: Date;
}

function serializeCommitLogEntry(data: any): CommitLogEntry {
  return {
    ...data,
    commitTime: data["commitTime"] !== undefined ? data["commitTime"].toISOString() : undefined,
  };
}

function deserializeCommitLogEntry(data: any): CommitLogEntry {
  return {
    ...data,
    commitTime: data["commitTime"] !== undefined ? new Date(data["commitTime"]) : undefined,
  };
}

/**
 * Represents a Dataform Git commit.
 */
export interface CommitMetadata {
  /**
   * Required. The commit's author.
   */
  author?: CommitAuthor;
  /**
   * Optional. The commit's message.
   */
  commitMessage?: string;
}

/**
 * `CommitRepositoryChanges` request message.
 */
export interface CommitRepositoryChangesRequest {
  /**
   * Required. The changes to commit to the repository.
   */
  commitMetadata?: CommitMetadata;
  /**
   * A map to the path of the file to the operation. The path is the ull file
   * path including filename, from repository root.
   */
  fileOperations?: {
    [key: string]: FileOperation
  };
}

function serializeCommitRepositoryChangesRequest(data: any): CommitRepositoryChangesRequest {
  return {
    ...data,
    fileOperations: data["fileOperations"] !== undefined ? Object.fromEntries(Object.entries(data["fileOperations"]).map(([k, v]: [string, any]) => ([k, serializeFileOperation(v)]))) : undefined,
  };
}

function deserializeCommitRepositoryChangesRequest(data: any): CommitRepositoryChangesRequest {
  return {
    ...data,
    fileOperations: data["fileOperations"] !== undefined ? Object.fromEntries(Object.entries(data["fileOperations"]).map(([k, v]: [string, any]) => ([k, deserializeFileOperation(v)]))) : undefined,
  };
}

/**
 * `CommitWorkspaceChanges` request message.
 */
export interface CommitWorkspaceChangesRequest {
  /**
   * Required. The commit's author.
   */
  author?: CommitAuthor;
  /**
   * Optional. The commit's message.
   */
  commitMessage?: string;
  /**
   * Optional. Full file paths to commit including filename, rooted at
   * workspace root. If left empty, all files will be committed.
   */
  paths?: string[];
}

/**
 * An error encountered when attempting to compile a Dataform project.
 */
export interface CompilationError {
  /**
   * Output only. The identifier of the action where this error occurred, if
   * available.
   */
  readonly actionTarget?: Target;
  /**
   * Output only. The error's top level message.
   */
  readonly message?: string;
  /**
   * Output only. The path of the file where this error occurred, if available,
   * relative to the project root.
   */
  readonly path?: string;
  /**
   * Output only. The error's full stack trace.
   */
  readonly stack?: string;
}

/**
 * Represents the result of compiling a Dataform project.
 */
export interface CompilationResult {
  /**
   * Immutable. If set, fields of `code_compilation_config` override the
   * default compilation settings that are specified in dataform.json.
   */
  codeCompilationConfig?: CodeCompilationConfig;
  /**
   * Output only. Errors encountered during project compilation.
   */
  readonly compilationErrors?: CompilationError[];
  /**
   * Output only. The version of `@dataform/core` that was used for
   * compilation.
   */
  readonly dataformCoreVersion?: string;
  /**
   * Immutable. Git commit/tag/branch name at which the repository should be
   * compiled. Must exist in the remote repository. Examples: - a commit SHA:
   * `12ade345` - a tag: `tag1` - a branch name: `branch1`
   */
  gitCommitish?: string;
  /**
   * Output only. The compilation result's name.
   */
  readonly name?: string;
  /**
   * Immutable. The name of the release config to compile. The release config's
   * 'current_compilation_result' field will be updated to this compilation
   * result. Must be in the format
   * `projects/*\/locations/*\/repositories/*\/releaseConfigs/*`.
   */
  releaseConfig?: string;
  /**
   * Output only. The fully resolved Git commit SHA of the code that was
   * compiled. Not set for compilation results whose source is a workspace.
   */
  readonly resolvedGitCommitSha?: string;
  /**
   * Immutable. The name of the workspace to compile. Must be in the format
   * `projects/*\/locations/*\/repositories/*\/workspaces/*`.
   */
  workspace?: string;
}

/**
 * Represents a single Dataform action in a compilation result.
 */
export interface CompilationResultAction {
  /**
   * The assertion executed by this action.
   */
  assertion?: Assertion;
  /**
   * The action's identifier if the project had been compiled without any
   * overrides configured. Unique within the compilation result.
   */
  canonicalTarget?: Target;
  /**
   * The declaration declared by this action.
   */
  declaration?: Declaration;
  /**
   * The full path including filename in which this action is located, relative
   * to the workspace root.
   */
  filePath?: string;
  /**
   * The database operations executed by this action.
   */
  operations?: Operations;
  /**
   * The database relation created/updated by this action.
   */
  relation?: Relation;
  /**
   * This action's identifier. Unique within the compilation result.
   */
  target?: Target;
}

/**
 * Represents a relation which is not managed by Dataform but which may be
 * referenced by Dataform actions.
 */
export interface Declaration {
  /**
   * Descriptor for the relation and its columns. Used as documentation only,
   * i.e. values here will result in no changes to the relation's metadata.
   */
  relationDescriptor?: RelationDescriptor;
}

/**
 * Represents the delete file operation.
 */
export interface DeleteFile {
}

/**
 * Represents a single entry in a directory.
 */
export interface DirectoryEntry {
  /**
   * A child directory in the directory.
   */
  directory?: string;
  /**
   * A file in the directory.
   */
  file?: string;
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
 * `FetchFileDiff` response message.
 */
export interface FetchFileDiffResponse {
  /**
   * The raw formatted Git diff for the file.
   */
  formattedDiff?: string;
}

/**
 * `FetchFileGitStatuses` response message.
 */
export interface FetchFileGitStatusesResponse {
  /**
   * A list of all files which have uncommitted Git changes. There will only be
   * a single entry for any given file.
   */
  uncommittedFileChanges?: UncommittedFileChange[];
}

/**
 * `FetchGitAheadBehind` response message.
 */
export interface FetchGitAheadBehindResponse {
  /**
   * The number of commits in the remote branch that are not in the workspace.
   */
  commitsAhead?: number;
  /**
   * The number of commits in the workspace that are not in the remote branch.
   */
  commitsBehind?: number;
}

/**
 * `FetchRemoteBranches` response message.
 */
export interface FetchRemoteBranchesResponse {
  /**
   * The remote repository's branch names.
   */
  branches?: string[];
}

/**
 * `FetchRepositoryHistory` response message.
 */
export interface FetchRepositoryHistoryResponse {
  /**
   * A list of commit logs, ordered by 'git log' default order.
   */
  commits?: CommitLogEntry[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeFetchRepositoryHistoryResponse(data: any): FetchRepositoryHistoryResponse {
  return {
    ...data,
    commits: data["commits"] !== undefined ? data["commits"].map((item: any) => (serializeCommitLogEntry(item))) : undefined,
  };
}

function deserializeFetchRepositoryHistoryResponse(data: any): FetchRepositoryHistoryResponse {
  return {
    ...data,
    commits: data["commits"] !== undefined ? data["commits"].map((item: any) => (deserializeCommitLogEntry(item))) : undefined,
  };
}

/**
 * Represents a single file operation to the repository.
 */
export interface FileOperation {
  /**
   * Represents the delete operation.
   */
  deleteFile?: DeleteFile;
  /**
   * Represents the write operation.
   */
  writeFile?: WriteFile;
}

function serializeFileOperation(data: any): FileOperation {
  return {
    ...data,
    writeFile: data["writeFile"] !== undefined ? serializeWriteFile(data["writeFile"]) : undefined,
  };
}

function deserializeFileOperation(data: any): FileOperation {
  return {
    ...data,
    writeFile: data["writeFile"] !== undefined ? deserializeWriteFile(data["writeFile"]) : undefined,
  };
}

/**
 * Controls Git remote configuration for a repository.
 */
export interface GitRemoteSettings {
  /**
   * Required. The name of the Secret Manager secret version to use as an
   * authentication token for Git operations. Must be in the format
   * `projects/*\/secrets/*\/versions/*`.
   */
  authenticationTokenSecretVersion?: string;
  /**
   * Required. The Git remote's default branch name.
   */
  defaultBranch?: string;
  /**
   * Output only. Indicates the status of the Git access token.
   */
  readonly tokenStatus?:  | "TOKEN_STATUS_UNSPECIFIED" | "NOT_FOUND" | "INVALID" | "VALID";
  /**
   * Required. The Git remote's URL.
   */
  url?: string;
}

/**
 * Contains settings for relations of type `INCREMENTAL_TABLE`.
 */
export interface IncrementalTableConfig {
  /**
   * SQL statements to be executed after inserting new rows into the relation.
   */
  incrementalPostOperations?: string[];
  /**
   * SQL statements to be executed before inserting new rows into the relation.
   */
  incrementalPreOperations?: string[];
  /**
   * The SELECT query which returns rows which should be inserted into the
   * relation if it already exists and is not being refreshed.
   */
  incrementalSelectQuery?: string;
  /**
   * Whether this table should be protected from being refreshed.
   */
  refreshDisabled?: boolean;
  /**
   * A set of columns or SQL expressions used to define row uniqueness. If any
   * duplicates are discovered (as defined by `unique_key_parts`), only the
   * newly selected rows (as defined by `incremental_select_query`) will be
   * included in the relation.
   */
  uniqueKeyParts?: string[];
  /**
   * A SQL expression conditional used to limit the set of existing rows
   * considered for a merge operation (see `unique_key_parts` for more
   * information).
   */
  updatePartitionFilter?: string;
}

/**
 * `InstallNpmPackages` request message.
 */
export interface InstallNpmPackagesRequest {
}

/**
 * `InstallNpmPackages` response message.
 */
export interface InstallNpmPackagesResponse {
}

/**
 * Represents a time interval, encoded as a Timestamp start (inclusive) and a
 * Timestamp end (exclusive). The start must be less than or equal to the end.
 * When the start equals the end, the interval is empty (matches no time). When
 * both start and end are unspecified, the interval matches any time.
 */
export interface Interval {
  /**
   * Optional. Exclusive end of the interval. If specified, a Timestamp
   * matching this interval will have to be before the end.
   */
  endTime?: Date;
  /**
   * Optional. Inclusive start of the interval. If specified, a Timestamp
   * matching this interval will have to be the same or after the start.
   */
  startTime?: Date;
}

function serializeInterval(data: any): Interval {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeInterval(data: any): Interval {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Includes various configuration options for a workflow invocation. If both
 * `included_targets` and `included_tags` are unset, all actions will be
 * included.
 */
export interface InvocationConfig {
  /**
   * Optional. When set to true, any incremental tables will be fully
   * refreshed.
   */
  fullyRefreshIncrementalTablesEnabled?: boolean;
  /**
   * Optional. The set of tags to include.
   */
  includedTags?: string[];
  /**
   * Optional. The set of action identifiers to include.
   */
  includedTargets?: Target[];
  /**
   * Optional. When set to true, transitive dependencies of included actions
   * will be executed.
   */
  transitiveDependenciesIncluded?: boolean;
  /**
   * Optional. When set to true, transitive dependents of included actions will
   * be executed.
   */
  transitiveDependentsIncluded?: boolean;
}

/**
 * `ListCompilationResults` response message.
 */
export interface ListCompilationResultsResponse {
  /**
   * List of compilation results.
   */
  compilationResults?: CompilationResult[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Locations which could not be reached.
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
 * `ListReleaseConfigs` response message.
 */
export interface ListReleaseConfigsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * List of release configs.
   */
  releaseConfigs?: ReleaseConfig[];
  /**
   * Locations which could not be reached.
   */
  unreachable?: string[];
}

/**
 * `ListRepositories` response message.
 */
export interface ListRepositoriesResponse {
  /**
   * A token which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * List of repositories.
   */
  repositories?: Repository[];
  /**
   * Locations which could not be reached.
   */
  unreachable?: string[];
}

function serializeListRepositoriesResponse(data: any): ListRepositoriesResponse {
  return {
    ...data,
    repositories: data["repositories"] !== undefined ? data["repositories"].map((item: any) => (serializeRepository(item))) : undefined,
  };
}

function deserializeListRepositoriesResponse(data: any): ListRepositoriesResponse {
  return {
    ...data,
    repositories: data["repositories"] !== undefined ? data["repositories"].map((item: any) => (deserializeRepository(item))) : undefined,
  };
}

/**
 * `ListWorkflowConfigs` response message.
 */
export interface ListWorkflowConfigsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Locations which could not be reached.
   */
  unreachable?: string[];
  /**
   * List of workflow configs.
   */
  workflowConfigs?: WorkflowConfig[];
}

/**
 * `ListWorkflowInvocations` response message.
 */
export interface ListWorkflowInvocationsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Locations which could not be reached.
   */
  unreachable?: string[];
  /**
   * List of workflow invocations.
   */
  workflowInvocations?: WorkflowInvocation[];
}

/**
 * `ListWorkspaces` response message.
 */
export interface ListWorkspacesResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Locations which could not be reached.
   */
  unreachable?: string[];
  /**
   * List of workspaces.
   */
  workspaces?: Workspace[];
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
 * `MakeDirectory` request message.
 */
export interface MakeDirectoryRequest {
  /**
   * Required. The directory's full path including directory name, relative to
   * the workspace root.
   */
  path?: string;
}

/**
 * `MakeDirectory` response message.
 */
export interface MakeDirectoryResponse {
}

/**
 * `MoveDirectory` request message.
 */
export interface MoveDirectoryRequest {
  /**
   * Required. The new path for the directory including directory name, rooted
   * at workspace root.
   */
  newPath?: string;
  /**
   * Required. The directory's full path including directory name, relative to
   * the workspace root.
   */
  path?: string;
}

/**
 * `MoveDirectory` response message.
 */
export interface MoveDirectoryResponse {
}

/**
 * `MoveFile` request message.
 */
export interface MoveFileRequest {
  /**
   * Required. The file's new path including filename, relative to the
   * workspace root.
   */
  newPath?: string;
  /**
   * Required. The file's full path including filename, relative to the
   * workspace root.
   */
  path?: string;
}

/**
 * `MoveFile` response message.
 */
export interface MoveFileResponse {
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
 * Represents a list of arbitrary database operations.
 */
export interface Operations {
  /**
   * A list of actions that this action depends on.
   */
  dependencyTargets?: Target[];
  /**
   * Whether this action is disabled (i.e. should not be run).
   */
  disabled?: boolean;
  /**
   * Whether these operations produce an output relation.
   */
  hasOutput?: boolean;
  /**
   * A list of arbitrary SQL statements that will be executed without
   * alteration.
   */
  queries?: string[];
  /**
   * Descriptor for any output relation and its columns. Only set if
   * `has_output` is true.
   */
  relationDescriptor?: RelationDescriptor;
  /**
   * Arbitrary, user-defined tags on this action.
   */
  tags?: string[];
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
 * Additional options for Dataform#projectsLocationsList.
 */
export interface ProjectsLocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like `"displayName=tokyo"`, and is documented in
   * more detail in [AIP-160](https://google.aip.dev/160).
   */
  filter?: string;
  /**
   * If true, the returned list will include locations which are not yet
   * revealed.
   */
  includeUnrevealedLocations?: boolean;
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
 * Dataform#projectsLocationsRepositoriesCompilationResultsList.
 */
export interface ProjectsLocationsRepositoriesCompilationResultsListOptions {
  /**
   * Optional. Maximum number of compilation results to return. The server may
   * return fewer items than requested. If unspecified, the server will pick an
   * appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous `ListCompilationResults`
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to `ListCompilationResults` must match the call
   * that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesCompilationResultsQuery.
 */
export interface ProjectsLocationsRepositoriesCompilationResultsQueryOptions {
  /**
   * Optional. Optional filter for the returned list. Filtering is only
   * currently supported on the `file_path` field.
   */
  filter?: string;
  /**
   * Optional. Maximum number of compilation results to return. The server may
   * return fewer items than requested. If unspecified, the server will pick an
   * appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous
   * `QueryCompilationResultActions` call. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to
   * `QueryCompilationResultActions` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataform#projectsLocationsRepositoriesCreate.
 */
export interface ProjectsLocationsRepositoriesCreateOptions {
  /**
   * Required. The ID to use for the repository, which will become the final
   * component of the repository's resource name.
   */
  repositoryId?: string;
}

/**
 * Additional options for Dataform#projectsLocationsRepositoriesDelete.
 */
export interface ProjectsLocationsRepositoriesDeleteOptions {
  /**
   * If set to true, any child resources of this repository will also be
   * deleted. (Otherwise, the request will only succeed if the repository has no
   * child resources.)
   */
  force?: boolean;
}

/**
 * Additional options for Dataform#projectsLocationsRepositoriesFetchHistory.
 */
export interface ProjectsLocationsRepositoriesFetchHistoryOptions {
  /**
   * Optional. Maximum number of paths to return. The server may return fewer
   * items than requested. If unspecified, the server will pick an appropriate
   * default.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous `FetchRepositoryHistory`
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to `FetchRepositoryHistory` must match the call
   * that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataform#projectsLocationsRepositoriesGetIamPolicy.
 */
export interface ProjectsLocationsRepositoriesGetIamPolicyOptions {
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
 * Additional options for Dataform#projectsLocationsRepositoriesList.
 */
export interface ProjectsLocationsRepositoriesListOptions {
  /**
   * Optional. Filter for the returned list.
   */
  filter?: string;
  /**
   * Optional. This field only supports ordering by `name`. If unspecified, the
   * server will choose the ordering. If specified, the default order is
   * ascending for the `name` field.
   */
  orderBy?: string;
  /**
   * Optional. Maximum number of repositories to return. The server may return
   * fewer items than requested. If unspecified, the server will pick an
   * appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous `ListRepositories` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListRepositories` must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataform#projectsLocationsRepositoriesPatch.
 */
export interface ProjectsLocationsRepositoriesPatchOptions {
  /**
   * Optional. Specifies the fields to be updated in the repository. If left
   * unset, all fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsRepositoriesPatchOptions(data: any): ProjectsLocationsRepositoriesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsRepositoriesPatchOptions(data: any): ProjectsLocationsRepositoriesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesQueryDirectoryContents.
 */
export interface ProjectsLocationsRepositoriesQueryDirectoryContentsOptions {
  /**
   * Optional. The Commit SHA for the commit to query from. If unset, the
   * directory will be queried from HEAD.
   */
  commitSha?: string;
  /**
   * Optional. Maximum number of paths to return. The server may return fewer
   * items than requested. If unspecified, the server will pick an appropriate
   * default.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous
   * `QueryRepositoryDirectoryContents` call. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to
   * `QueryRepositoryDirectoryContents` must match the call that provided the
   * page token.
   */
  pageToken?: string;
  /**
   * Optional. The directory's full path including directory name, relative to
   * root. If left unset, the root is used.
   */
  path?: string;
}

/**
 * Additional options for Dataform#projectsLocationsRepositoriesReadFile.
 */
export interface ProjectsLocationsRepositoriesReadFileOptions {
  /**
   * Optional. The commit SHA for the commit to read from. If unset, the file
   * will be read from HEAD.
   */
  commitSha?: string;
  /**
   * Required. Full file path to read including filename, from repository root.
   */
  path?: string;
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesReleaseConfigsCreate.
 */
export interface ProjectsLocationsRepositoriesReleaseConfigsCreateOptions {
  /**
   * Required. The ID to use for the release config, which will become the
   * final component of the release config's resource name.
   */
  releaseConfigId?: string;
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesReleaseConfigsList.
 */
export interface ProjectsLocationsRepositoriesReleaseConfigsListOptions {
  /**
   * Optional. Maximum number of release configs to return. The server may
   * return fewer items than requested. If unspecified, the server will pick an
   * appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous `ListReleaseConfigs` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListReleaseConfigs` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesReleaseConfigsPatch.
 */
export interface ProjectsLocationsRepositoriesReleaseConfigsPatchOptions {
  /**
   * Optional. Specifies the fields to be updated in the release config. If
   * left unset, all fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsRepositoriesReleaseConfigsPatchOptions(data: any): ProjectsLocationsRepositoriesReleaseConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsRepositoriesReleaseConfigsPatchOptions(data: any): ProjectsLocationsRepositoriesReleaseConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesWorkflowConfigsCreate.
 */
export interface ProjectsLocationsRepositoriesWorkflowConfigsCreateOptions {
  /**
   * Required. The ID to use for the workflow config, which will become the
   * final component of the workflow config's resource name.
   */
  workflowConfigId?: string;
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesWorkflowConfigsList.
 */
export interface ProjectsLocationsRepositoriesWorkflowConfigsListOptions {
  /**
   * Optional. Maximum number of workflow configs to return. The server may
   * return fewer items than requested. If unspecified, the server will pick an
   * appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous `ListWorkflowConfigs` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListWorkflowConfigs` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesWorkflowConfigsPatch.
 */
export interface ProjectsLocationsRepositoriesWorkflowConfigsPatchOptions {
  /**
   * Optional. Specifies the fields to be updated in the workflow config. If
   * left unset, all fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsRepositoriesWorkflowConfigsPatchOptions(data: any): ProjectsLocationsRepositoriesWorkflowConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsRepositoriesWorkflowConfigsPatchOptions(data: any): ProjectsLocationsRepositoriesWorkflowConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesWorkflowInvocationsList.
 */
export interface ProjectsLocationsRepositoriesWorkflowInvocationsListOptions {
  /**
   * Optional. Filter for the returned list.
   */
  filter?: string;
  /**
   * Optional. This field only supports ordering by `name`. If unspecified, the
   * server will choose the ordering. If specified, the default order is
   * ascending for the `name` field.
   */
  orderBy?: string;
  /**
   * Optional. Maximum number of workflow invocations to return. The server may
   * return fewer items than requested. If unspecified, the server will pick an
   * appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous `ListWorkflowInvocations`
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to `ListWorkflowInvocations` must match the call
   * that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesWorkflowInvocationsQuery.
 */
export interface ProjectsLocationsRepositoriesWorkflowInvocationsQueryOptions {
  /**
   * Optional. Maximum number of workflow invocations to return. The server may
   * return fewer items than requested. If unspecified, the server will pick an
   * appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous
   * `QueryWorkflowInvocationActions` call. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to
   * `QueryWorkflowInvocationActions` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesWorkspacesCreate.
 */
export interface ProjectsLocationsRepositoriesWorkspacesCreateOptions {
  /**
   * Required. The ID to use for the workspace, which will become the final
   * component of the workspace's resource name.
   */
  workspaceId?: string;
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesWorkspacesFetchFileDiff.
 */
export interface ProjectsLocationsRepositoriesWorkspacesFetchFileDiffOptions {
  /**
   * Required. The file's full path including filename, relative to the
   * workspace root.
   */
  path?: string;
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesWorkspacesFetchGitAheadBehind.
 */
export interface ProjectsLocationsRepositoriesWorkspacesFetchGitAheadBehindOptions {
  /**
   * Optional. The name of the branch in the Git remote against which this
   * workspace should be compared. If left unset, the repository's default
   * branch name will be used.
   */
  remoteBranch?: string;
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesWorkspacesGetIamPolicy.
 */
export interface ProjectsLocationsRepositoriesWorkspacesGetIamPolicyOptions {
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
 * Additional options for Dataform#projectsLocationsRepositoriesWorkspacesList.
 */
export interface ProjectsLocationsRepositoriesWorkspacesListOptions {
  /**
   * Optional. Filter for the returned list.
   */
  filter?: string;
  /**
   * Optional. This field only supports ordering by `name`. If unspecified, the
   * server will choose the ordering. If specified, the default order is
   * ascending for the `name` field.
   */
  orderBy?: string;
  /**
   * Optional. Maximum number of workspaces to return. The server may return
   * fewer items than requested. If unspecified, the server will pick an
   * appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous `ListWorkspaces` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListWorkspaces` must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesWorkspacesQueryDirectoryContents.
 */
export interface ProjectsLocationsRepositoriesWorkspacesQueryDirectoryContentsOptions {
  /**
   * Optional. Maximum number of paths to return. The server may return fewer
   * items than requested. If unspecified, the server will pick an appropriate
   * default.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous `QueryDirectoryContents`
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to `QueryDirectoryContents` must match the call
   * that provided the page token.
   */
  pageToken?: string;
  /**
   * Optional. The directory's full path including directory name, relative to
   * the workspace root. If left unset, the workspace root is used.
   */
  path?: string;
}

/**
 * Additional options for
 * Dataform#projectsLocationsRepositoriesWorkspacesReadFile.
 */
export interface ProjectsLocationsRepositoriesWorkspacesReadFileOptions {
  /**
   * Required. The file's full path including filename, relative to the
   * workspace root.
   */
  path?: string;
}

/**
 * `PullGitCommits` request message.
 */
export interface PullGitCommitsRequest {
  /**
   * Required. The author of any merge commit which may be created as a result
   * of merging fetched Git commits into this workspace.
   */
  author?: CommitAuthor;
  /**
   * Optional. The name of the branch in the Git remote from which to pull
   * commits. If left unset, the repository's default branch name will be used.
   */
  remoteBranch?: string;
}

/**
 * `PushGitCommits` request message.
 */
export interface PushGitCommitsRequest {
  /**
   * Optional. The name of the branch in the Git remote to which commits should
   * be pushed. If left unset, the repository's default branch name will be
   * used.
   */
  remoteBranch?: string;
}

/**
 * `QueryCompilationResultActions` response message.
 */
export interface QueryCompilationResultActionsResponse {
  /**
   * List of compilation result actions.
   */
  compilationResultActions?: CompilationResultAction[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * `QueryDirectoryContents` response message.
 */
export interface QueryDirectoryContentsResponse {
  /**
   * List of entries in the directory.
   */
  directoryEntries?: DirectoryEntry[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * `QueryRepositoryDirectoryContents` response message.
 */
export interface QueryRepositoryDirectoryContentsResponse {
  /**
   * List of entries in the directory.
   */
  directoryEntries?: DirectoryEntry[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * `QueryWorkflowInvocationActions` response message.
 */
export interface QueryWorkflowInvocationActionsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * List of workflow invocation actions.
   */
  workflowInvocationActions?: WorkflowInvocationAction[];
}

/**
 * `ReadFile` response message.
 */
export interface ReadFileResponse {
  /**
   * The file's contents.
   */
  fileContents?: Uint8Array;
}

function serializeReadFileResponse(data: any): ReadFileResponse {
  return {
    ...data,
    fileContents: data["fileContents"] !== undefined ? encodeBase64(data["fileContents"]) : undefined,
  };
}

function deserializeReadFileResponse(data: any): ReadFileResponse {
  return {
    ...data,
    fileContents: data["fileContents"] !== undefined ? decodeBase64(data["fileContents"] as string) : undefined,
  };
}

/**
 * `ReadRepositoryFile` response message.
 */
export interface ReadRepositoryFileResponse {
  /**
   * The file's contents.
   */
  contents?: Uint8Array;
}

function serializeReadRepositoryFileResponse(data: any): ReadRepositoryFileResponse {
  return {
    ...data,
    contents: data["contents"] !== undefined ? encodeBase64(data["contents"]) : undefined,
  };
}

function deserializeReadRepositoryFileResponse(data: any): ReadRepositoryFileResponse {
  return {
    ...data,
    contents: data["contents"] !== undefined ? decodeBase64(data["contents"] as string) : undefined,
  };
}

/**
 * Represents a database relation.
 */
export interface Relation {
  /**
   * Additional options that will be provided as key/value pairs into the
   * options clause of a create table/view statement. See
   * https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language
   * for more information on which options are supported.
   */
  additionalOptions?: {
    [key: string]: string
  };
  /**
   * A list of columns or SQL expressions used to cluster the table.
   */
  clusterExpressions?: string[];
  /**
   * A list of actions that this action depends on.
   */
  dependencyTargets?: Target[];
  /**
   * Whether this action is disabled (i.e. should not be run).
   */
  disabled?: boolean;
  /**
   * Configures `INCREMENTAL_TABLE` settings for this relation. Only set if
   * `relation_type` is `INCREMENTAL_TABLE`.
   */
  incrementalTableConfig?: IncrementalTableConfig;
  /**
   * Sets the partition expiration in days.
   */
  partitionExpirationDays?: number;
  /**
   * The SQL expression used to partition the relation.
   */
  partitionExpression?: string;
  /**
   * SQL statements to be executed after creating the relation.
   */
  postOperations?: string[];
  /**
   * SQL statements to be executed before creating the relation.
   */
  preOperations?: string[];
  /**
   * Descriptor for the relation and its columns.
   */
  relationDescriptor?: RelationDescriptor;
  /**
   * The type of this relation.
   */
  relationType?:  | "RELATION_TYPE_UNSPECIFIED" | "TABLE" | "VIEW" | "INCREMENTAL_TABLE" | "MATERIALIZED_VIEW";
  /**
   * Specifies whether queries on this table must include a predicate filter
   * that filters on the partitioning column.
   */
  requirePartitionFilter?: boolean;
  /**
   * The SELECT query which returns rows which this relation should contain.
   */
  selectQuery?: string;
  /**
   * Arbitrary, user-defined tags on this action.
   */
  tags?: string[];
}

/**
 * Describes a relation and its columns.
 */
export interface RelationDescriptor {
  /**
   * A set of BigQuery labels that should be applied to the relation.
   */
  bigqueryLabels?: {
    [key: string]: string
  };
  /**
   * A list of descriptions of columns within the relation.
   */
  columns?: ColumnDescriptor[];
  /**
   * A text description of the relation.
   */
  description?: string;
}

/**
 * Represents a Dataform release configuration.
 */
export interface ReleaseConfig {
  /**
   * Optional. If set, fields of `code_compilation_config` override the default
   * compilation settings that are specified in dataform.json.
   */
  codeCompilationConfig?: CodeCompilationConfig;
  /**
   * Optional. Optional schedule (in cron format) for automatic creation of
   * compilation results.
   */
  cronSchedule?: string;
  /**
   * Required. Git commit/tag/branch name at which the repository should be
   * compiled. Must exist in the remote repository. Examples: - a commit SHA:
   * `12ade345` - a tag: `tag1` - a branch name: `branch1`
   */
  gitCommitish?: string;
  /**
   * Output only. The release config's name.
   */
  readonly name?: string;
  /**
   * Output only. Records of the 10 most recent scheduled release attempts.
   * Updated whenever automatic creation of a compilation result is triggered by
   * cron_schedule.
   */
  readonly recentScheduledReleaseRecords?: ScheduledReleaseRecord[];
  /**
   * Optional. The name of the currently released compilation result for this
   * release config. This value is updated when a compilation result is created
   * from this release config, or when this resource is updated by API call
   * (perhaps to roll back to an earlier release). The compilation result must
   * have been created using this release config. Must be in the format
   * `projects/*\/locations/*\/repositories/*\/compilationResults/*`.
   */
  releaseCompilationResult?: string;
  /**
   * Optional. Specifies the time zone to be used when interpreting
   * cron_schedule. Must be a time zone name from the time zone database
   * (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). If left
   * unspecified, the default is UTC.
   */
  timeZone?: string;
}

/**
 * `RemoveDirectory` request message.
 */
export interface RemoveDirectoryRequest {
  /**
   * Required. The directory's full path including directory name, relative to
   * the workspace root.
   */
  path?: string;
}

/**
 * `RemoveFile` request message.
 */
export interface RemoveFileRequest {
  /**
   * Required. The file's full path including filename, relative to the
   * workspace root.
   */
  path?: string;
}

/**
 * Represents a Dataform Git repository.
 */
export interface Repository {
  /**
   * Optional. If set, configures this repository to be linked to a Git remote.
   */
  gitRemoteSettings?: GitRemoteSettings;
  /**
   * Optional. Input only. The initial commit file contents. Represented as map
   * from file path to contents. The path is the full file path to commit
   * including filename, from repository root.
   */
  initialCommitFileContents?: {
    [key: string]: Uint8Array
  };
  /**
   * Optional. Input only. An optional initial commit metadata for the
   * Repository. The Repository must not have a value for
   * `git_remote_settings.url`.
   */
  initialCommitMetadata?: CommitMetadata;
  /**
   * Optional. Repository user labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The repository's name.
   */
  readonly name?: string;
  /**
   * Optional. The name of the Secret Manager secret version to be used to
   * interpolate variables into the .npmrc file for package installation
   * operations. Must be in the format `projects/*\/secrets/*\/versions/*`. The
   * file itself must be in a JSON format.
   */
  npmrcEnvironmentVariablesSecretVersion?: string;
  /**
   * Optional. If set, fields of `workspace_compilation_overrides` override the
   * default compilation settings that are specified in dataform.json when
   * creating workspace-scoped compilation results. See documentation for
   * `WorkspaceCompilationOverrides` for more information.
   */
  workspaceCompilationOverrides?: WorkspaceCompilationOverrides;
}

function serializeRepository(data: any): Repository {
  return {
    ...data,
    initialCommitFileContents: data["initialCommitFileContents"] !== undefined ? Object.fromEntries(Object.entries(data["initialCommitFileContents"]).map(([k, v]: [string, any]) => ([k, encodeBase64(v)]))) : undefined,
  };
}

function deserializeRepository(data: any): Repository {
  return {
    ...data,
    initialCommitFileContents: data["initialCommitFileContents"] !== undefined ? Object.fromEntries(Object.entries(data["initialCommitFileContents"]).map(([k, v]: [string, any]) => ([k, decodeBase64(v as string)]))) : undefined,
  };
}

/**
 * `ResetWorkspaceChanges` request message.
 */
export interface ResetWorkspaceChangesRequest {
  /**
   * Optional. If set to true, untracked files will be deleted.
   */
  clean?: boolean;
  /**
   * Optional. Full file paths to reset back to their committed state including
   * filename, rooted at workspace root. If left empty, all files will be reset.
   */
  paths?: string[];
}

/**
 * A record of an attempt to create a workflow invocation for this workflow
 * config.
 */
export interface ScheduledExecutionRecord {
  /**
   * The error status encountered upon this attempt to create the workflow
   * invocation, if the attempt was unsuccessful.
   */
  errorStatus?: Status;
  /**
   * The timestamp of this execution attempt.
   */
  executionTime?: Date;
  /**
   * The name of the created workflow invocation, if one was successfully
   * created. Must be in the format
   * `projects/*\/locations/*\/repositories/*\/workflowInvocations/*`.
   */
  workflowInvocation?: string;
}

function serializeScheduledExecutionRecord(data: any): ScheduledExecutionRecord {
  return {
    ...data,
    executionTime: data["executionTime"] !== undefined ? data["executionTime"].toISOString() : undefined,
  };
}

function deserializeScheduledExecutionRecord(data: any): ScheduledExecutionRecord {
  return {
    ...data,
    executionTime: data["executionTime"] !== undefined ? new Date(data["executionTime"]) : undefined,
  };
}

/**
 * A record of an attempt to create a compilation result for this release
 * config.
 */
export interface ScheduledReleaseRecord {
  /**
   * The name of the created compilation result, if one was successfully
   * created. Must be in the format
   * `projects/*\/locations/*\/repositories/*\/compilationResults/*`.
   */
  compilationResult?: string;
  /**
   * The error status encountered upon this attempt to create the compilation
   * result, if the attempt was unsuccessful.
   */
  errorStatus?: Status;
  /**
   * The timestamp of this release attempt.
   */
  releaseTime?: Date;
}

function serializeScheduledReleaseRecord(data: any): ScheduledReleaseRecord {
  return {
    ...data,
    releaseTime: data["releaseTime"] !== undefined ? data["releaseTime"].toISOString() : undefined,
  };
}

function deserializeScheduledReleaseRecord(data: any): ScheduledReleaseRecord {
  return {
    ...data,
    releaseTime: data["releaseTime"] !== undefined ? new Date(data["releaseTime"]) : undefined,
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
}

function serializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
  };
}

function deserializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
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
 * Represents an action identifier. If the action writes output, the output
 * will be written to the referenced database object.
 */
export interface Target {
  /**
   * The action's database (Google Cloud project ID) .
   */
  database?: string;
  /**
   * The action's name, within `database` and `schema`.
   */
  name?: string;
  /**
   * The action's schema (BigQuery dataset ID), within `database`.
   */
  schema?: string;
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
 * Represents the Git state of a file with uncommitted changes.
 */
export interface UncommittedFileChange {
  /**
   * The file's full path including filename, relative to the workspace root.
   */
  path?: string;
  /**
   * Indicates the status of the file.
   */
  state?:  | "STATE_UNSPECIFIED" | "ADDED" | "DELETED" | "MODIFIED" | "HAS_CONFLICTS";
}

/**
 * Represents a Dataform workflow configuration.
 */
export interface WorkflowConfig {
  /**
   * Optional. Optional schedule (in cron format) for automatic execution of
   * this workflow config.
   */
  cronSchedule?: string;
  /**
   * Optional. If left unset, a default InvocationConfig will be used.
   */
  invocationConfig?: InvocationConfig;
  /**
   * Output only. The workflow config's name.
   */
  readonly name?: string;
  /**
   * Output only. Records of the 10 most recent scheduled execution attempts.
   * Updated whenever automatic creation of a compilation result is triggered by
   * cron_schedule.
   */
  readonly recentScheduledExecutionRecords?: ScheduledExecutionRecord[];
  /**
   * Required. The name of the release config whose release_compilation_result
   * should be executed. Must be in the format
   * `projects/*\/locations/*\/repositories/*\/releaseConfigs/*`.
   */
  releaseConfig?: string;
  /**
   * Optional. Specifies the time zone to be used when interpreting
   * cron_schedule. Must be a time zone name from the time zone database
   * (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). If left
   * unspecified, the default is UTC.
   */
  timeZone?: string;
}

/**
 * Represents a single invocation of a compilation result.
 */
export interface WorkflowInvocation {
  /**
   * Immutable. The name of the compilation result to compile. Must be in the
   * format `projects/*\/locations/*\/repositories/*\/compilationResults/*`.
   */
  compilationResult?: string;
  /**
   * Immutable. If left unset, a default InvocationConfig will be used.
   */
  invocationConfig?: InvocationConfig;
  /**
   * Output only. This workflow invocation's timing details.
   */
  readonly invocationTiming?: Interval;
  /**
   * Output only. The workflow invocation's name.
   */
  readonly name?: string;
  /**
   * Output only. This workflow invocation's current state.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "CANCELLED" | "FAILED" | "CANCELING";
  /**
   * Immutable. The name of the workflow config to invoke. Must be in the
   * format `projects/*\/locations/*\/repositories/*\/workflowConfigs/*`.
   */
  workflowConfig?: string;
}

/**
 * Represents a single action in a workflow invocation.
 */
export interface WorkflowInvocationAction {
  /**
   * Output only. The workflow action's bigquery action details.
   */
  readonly bigqueryAction?: BigQueryAction;
  /**
   * Output only. The action's identifier if the project had been compiled
   * without any overrides configured. Unique within the compilation result.
   */
  readonly canonicalTarget?: Target;
  /**
   * Output only. If and only if action's state is FAILED a failure reason is
   * set.
   */
  readonly failureReason?: string;
  /**
   * Output only. This action's timing details. `start_time` will be set if the
   * action is in [RUNNING, SUCCEEDED, CANCELLED, FAILED] state. `end_time` will
   * be set if the action is in [SUCCEEDED, CANCELLED, FAILED] state.
   */
  readonly invocationTiming?: Interval;
  /**
   * Output only. This action's current state.
   */
  readonly state?:  | "PENDING" | "RUNNING" | "SKIPPED" | "DISABLED" | "SUCCEEDED" | "CANCELLED" | "FAILED";
  /**
   * Output only. This action's identifier. Unique within the workflow
   * invocation.
   */
  readonly target?: Target;
}

/**
 * Represents a Dataform Git workspace.
 */
export interface Workspace {
  /**
   * Output only. The workspace's name.
   */
  readonly name?: string;
}

/**
 * Configures workspace compilation overrides for a repository. Primarily used
 * by the UI (`console.cloud.google.com`). `schema_suffix` and `table_prefix`
 * can have a special expression - `${workspaceName}`, which refers to the
 * workspace name from which the compilation results will be created. API
 * callers are expected to resolve the expression in these overrides and provide
 * them explicitly in `code_compilation_config`
 * (https://cloud.google.com/dataform/reference/rest/v1beta1/projects.locations.repositories.compilationResults#codecompilationconfig)
 * when creating workspace-scoped compilation results.
 */
export interface WorkspaceCompilationOverrides {
  /**
   * Optional. The default database (Google Cloud project ID).
   */
  defaultDatabase?: string;
  /**
   * Optional. The suffix that should be appended to all schema (BigQuery
   * dataset ID) names.
   */
  schemaSuffix?: string;
  /**
   * Optional. The prefix that should be prepended to all table names.
   */
  tablePrefix?: string;
}

/**
 * Represents the write file operation (for files added or modified).
 */
export interface WriteFile {
  /**
   * The file's contents.
   */
  contents?: Uint8Array;
}

function serializeWriteFile(data: any): WriteFile {
  return {
    ...data,
    contents: data["contents"] !== undefined ? encodeBase64(data["contents"]) : undefined,
  };
}

function deserializeWriteFile(data: any): WriteFile {
  return {
    ...data,
    contents: data["contents"] !== undefined ? decodeBase64(data["contents"] as string) : undefined,
  };
}

/**
 * `WriteFile` request message.
 */
export interface WriteFileRequest {
  /**
   * Required. The file's contents.
   */
  contents?: Uint8Array;
  /**
   * Required. The file.
   */
  path?: string;
}

function serializeWriteFileRequest(data: any): WriteFileRequest {
  return {
    ...data,
    contents: data["contents"] !== undefined ? encodeBase64(data["contents"]) : undefined,
  };
}

function deserializeWriteFileRequest(data: any): WriteFileRequest {
  return {
    ...data,
    contents: data["contents"] !== undefined ? decodeBase64(data["contents"] as string) : undefined,
  };
}

/**
 * `WriteFile` response message.
 */
export interface WriteFileResponse {
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
