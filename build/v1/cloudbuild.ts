// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Build API Client for Deno
 * ===============================
 * 
 * Creates and manages builds on Google Cloud Platform.
 * 
 * Docs: https://cloud.google.com/cloud-build/docs/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Creates and manages builds on Google Cloud Platform.
 */
export class CloudBuild {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudbuild.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * ReceiveGitHubDotComWebhook is called when the API receives a github.com
   * webhook.
   *
   */
  async githubDotComWebhookReceive(req: HttpBody, opts: GithubDotComWebhookReceiveOptions = {}): Promise<Empty> {
    req = serializeHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/githubDotComWebhook:receive`);
    if (opts.webhookKey !== undefined) {
      url.searchParams.append("webhookKey", String(opts.webhookKey));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * ReceiveRegionalWebhook is called when the API receives a regional GitHub
   * webhook.
   *
   * @param location Required. The location where the webhook should be sent.
   */
  async locationsRegionalWebhook(location: string, req: HttpBody, opts: LocationsRegionalWebhookOptions = {}): Promise<Empty> {
    req = serializeHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ location }/regionalWebhook`);
    if (opts.webhookKey !== undefined) {
      url.searchParams.append("webhookKey", String(opts.webhookKey));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
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
  async operationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
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
  async operationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Approves or rejects a pending build. If approved, the returned LRO will be
   * analogous to the LRO returned from a CreateBuild call. If rejected, the
   * returned LRO will be immediately done.
   *
   * @param name Required. Name of the target build. For example: "projects/{$project_id}/builds/{$build_id}"
   */
  async projectsBuildsApprove(name: string, req: ApproveBuildRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:approve`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Cancels a build in progress.
   *
   * @param id Required. ID of the build.
   * @param projectId Required. ID of the project.
   */
  async projectsBuildsCancel(id: string, projectId: string, req: CancelBuildRequest): Promise<Build> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/builds/${ id }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBuild(data);
  }

  /**
   * Starts a build with the specified configuration. This method returns a
   * long-running `Operation`, which includes the build ID. Pass the build ID to
   * `GetBuild` to determine the build status (such as `SUCCESS` or `FAILURE`).
   *
   * @param projectId Required. ID of the project.
   */
  async projectsBuildsCreate(projectId: string, req: Build, opts: ProjectsBuildsCreateOptions = {}): Promise<Operation> {
    req = serializeBuild(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/builds`);
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
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
   * Returns information about a previously requested build. The `Build` that
   * is returned includes its status (such as `SUCCESS`, `FAILURE`, or
   * `WORKING`), and timing information.
   *
   * @param id Required. ID of the build.
   * @param projectId Required. ID of the project.
   */
  async projectsBuildsGet(id: string, projectId: string, opts: ProjectsBuildsGetOptions = {}): Promise<Build> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/builds/${ id }`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBuild(data);
  }

  /**
   * Lists previously requested builds. Previously requested builds may still
   * be in-progress, or may have finished successfully or unsuccessfully.
   *
   * @param projectId Required. ID of the project.
   */
  async projectsBuildsList(projectId: string, opts: ProjectsBuildsListOptions = {}): Promise<ListBuildsResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/builds`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
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
    return deserializeListBuildsResponse(data);
  }

  /**
   * Creates a new build based on the specified build. This method creates a
   * new build using the original build request, which may or may not result in
   * an identical build. For triggered builds: * Triggered builds resolve to a
   * precise revision; therefore a retry of a triggered build will result in a
   * build that uses the same revision. For non-triggered builds that specify
   * `RepoSource`: * If the original build built from the tip of a branch, the
   * retried build will build from the tip of that branch, which may not be the
   * same revision as the original build. * If the original build specified a
   * commit sha or revision ID, the retried build will use the identical source.
   * For builds that specify `StorageSource`: * If the original build pulled
   * source from Google Cloud Storage without specifying the generation of the
   * object, the new build will use the current object, which may be different
   * from the original build source. * If the original build pulled source from
   * Cloud Storage and specified the generation of the object, the new build
   * will attempt to use the same object, which may or may not be available
   * depending on the bucket's lifecycle management settings.
   *
   * @param id Required. Build ID of the original build.
   * @param projectId Required. ID of the project.
   */
  async projectsBuildsRetry(id: string, projectId: string, req: RetryBuildRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/builds/${ id }:retry`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Create an association between a GCP project and a GitHub Enterprise
   * server.
   *
   * @param parent Name of the parent project. For example: projects/{$project_number} or projects/{$project_id}
   */
  async projectsGithubEnterpriseConfigsCreate(parent: string, req: GitHubEnterpriseConfig, opts: ProjectsGithubEnterpriseConfigsCreateOptions = {}): Promise<Operation> {
    req = serializeGitHubEnterpriseConfig(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/githubEnterpriseConfigs`);
    if (opts.gheConfigId !== undefined) {
      url.searchParams.append("gheConfigId", String(opts.gheConfigId));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
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
   * Delete an association between a GCP project and a GitHub Enterprise
   * server.
   *
   * @param name This field should contain the name of the enterprise config resource. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}"
   */
  async projectsGithubEnterpriseConfigsDelete(name: string, opts: ProjectsGithubEnterpriseConfigsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.configId !== undefined) {
      url.searchParams.append("configId", String(opts.configId));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieve a GitHubEnterpriseConfig.
   *
   * @param name This field should contain the name of the enterprise config resource. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}"
   */
  async projectsGithubEnterpriseConfigsGet(name: string, opts: ProjectsGithubEnterpriseConfigsGetOptions = {}): Promise<GitHubEnterpriseConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.configId !== undefined) {
      url.searchParams.append("configId", String(opts.configId));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGitHubEnterpriseConfig(data);
  }

  /**
   * List all GitHubEnterpriseConfigs for a given project.
   *
   * @param parent Name of the parent project. For example: projects/{$project_number} or projects/{$project_id}
   */
  async projectsGithubEnterpriseConfigsList(parent: string, opts: ProjectsGithubEnterpriseConfigsListOptions = {}): Promise<ListGithubEnterpriseConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/githubEnterpriseConfigs`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListGithubEnterpriseConfigsResponse(data);
  }

  /**
   * Update an association between a GCP project and a GitHub Enterprise
   * server.
   *
   * @param name Optional. The full resource name for the GitHubEnterpriseConfig For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}"
   */
  async projectsGithubEnterpriseConfigsPatch(name: string, req: GitHubEnterpriseConfig, opts: ProjectsGithubEnterpriseConfigsPatchOptions = {}): Promise<Operation> {
    req = serializeGitHubEnterpriseConfig(req);
    opts = serializeProjectsGithubEnterpriseConfigsPatchOptions(opts);
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
    return data as Operation;
  }

  /**
   * Batch connecting Bitbucket Server repositories to Cloud Build.
   *
   * @param parent The name of the `BitbucketServerConfig` that added connected repository. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}`
   */
  async projectsLocationsBitbucketServerConfigsConnectedRepositoriesBatchCreate(parent: string, req: BatchCreateBitbucketServerConnectedRepositoriesRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/connectedRepositories:batchCreate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a new `BitbucketServerConfig`. This API is experimental.
   *
   * @param parent Required. Name of the parent resource.
   */
  async projectsLocationsBitbucketServerConfigsCreate(parent: string, req: BitbucketServerConfig, opts: ProjectsLocationsBitbucketServerConfigsCreateOptions = {}): Promise<Operation> {
    req = serializeBitbucketServerConfig(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/bitbucketServerConfigs`);
    if (opts.bitbucketServerConfigId !== undefined) {
      url.searchParams.append("bitbucketServerConfigId", String(opts.bitbucketServerConfigId));
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
   * Delete a `BitbucketServerConfig`. This API is experimental.
   *
   * @param name Required. The config resource name.
   */
  async projectsLocationsBitbucketServerConfigsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieve a `BitbucketServerConfig`. This API is experimental.
   *
   * @param name Required. The config resource name.
   */
  async projectsLocationsBitbucketServerConfigsGet(name: string): Promise<BitbucketServerConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBitbucketServerConfig(data);
  }

  /**
   * List all `BitbucketServerConfigs` for a given project. This API is
   * experimental.
   *
   * @param parent Required. Name of the parent resource.
   */
  async projectsLocationsBitbucketServerConfigsList(parent: string, opts: ProjectsLocationsBitbucketServerConfigsListOptions = {}): Promise<ListBitbucketServerConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/bitbucketServerConfigs`);
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
    return deserializeListBitbucketServerConfigsResponse(data);
  }

  /**
   * Updates an existing `BitbucketServerConfig`. This API is experimental.
   *
   * @param name The resource name for the config.
   */
  async projectsLocationsBitbucketServerConfigsPatch(name: string, req: BitbucketServerConfig, opts: ProjectsLocationsBitbucketServerConfigsPatchOptions = {}): Promise<Operation> {
    req = serializeBitbucketServerConfig(req);
    opts = serializeProjectsLocationsBitbucketServerConfigsPatchOptions(opts);
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
    return data as Operation;
  }

  /**
   * Remove a Bitbucket Server repository from a given BitbucketServerConfig's
   * connected repositories. This API is experimental.
   *
   * @param config Required. The name of the `BitbucketServerConfig` to remove a connected repository. Format: `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}`
   */
  async projectsLocationsBitbucketServerConfigsRemoveBitbucketServerConnectedRepository(config: string, req: RemoveBitbucketServerConnectedRepositoryRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ config }:removeBitbucketServerConnectedRepository`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * List all repositories for a given `BitbucketServerConfig`. This API is
   * experimental.
   *
   * @param parent Required. Name of the parent resource.
   */
  async projectsLocationsBitbucketServerConfigsReposList(parent: string, opts: ProjectsLocationsBitbucketServerConfigsReposListOptions = {}): Promise<ListBitbucketServerRepositoriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/repos`);
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
    return data as ListBitbucketServerRepositoriesResponse;
  }

  /**
   * Approves or rejects a pending build. If approved, the returned LRO will be
   * analogous to the LRO returned from a CreateBuild call. If rejected, the
   * returned LRO will be immediately done.
   *
   * @param name Required. Name of the target build. For example: "projects/{$project_id}/builds/{$build_id}"
   */
  async projectsLocationsBuildsApprove(name: string, req: ApproveBuildRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:approve`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Cancels a build in progress.
   *
   * @param name The name of the `Build` to cancel. Format: `projects/{project}/locations/{location}/builds/{build}`
   */
  async projectsLocationsBuildsCancel(name: string, req: CancelBuildRequest): Promise<Build> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBuild(data);
  }

  /**
   * Starts a build with the specified configuration. This method returns a
   * long-running `Operation`, which includes the build ID. Pass the build ID to
   * `GetBuild` to determine the build status (such as `SUCCESS` or `FAILURE`).
   *
   * @param parent The parent resource where this build will be created. Format: `projects/{project}/locations/{location}`
   */
  async projectsLocationsBuildsCreate(parent: string, req: Build, opts: ProjectsLocationsBuildsCreateOptions = {}): Promise<Operation> {
    req = serializeBuild(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/builds`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
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
   * Returns information about a previously requested build. The `Build` that
   * is returned includes its status (such as `SUCCESS`, `FAILURE`, or
   * `WORKING`), and timing information.
   *
   * @param name The name of the `Build` to retrieve. Format: `projects/{project}/locations/{location}/builds/{build}`
   */
  async projectsLocationsBuildsGet(name: string, opts: ProjectsLocationsBuildsGetOptions = {}): Promise<Build> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.id !== undefined) {
      url.searchParams.append("id", String(opts.id));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBuild(data);
  }

  /**
   * Lists previously requested builds. Previously requested builds may still
   * be in-progress, or may have finished successfully or unsuccessfully.
   *
   * @param parent The parent of the collection of `Builds`. Format: `projects/{project}/locations/{location}`
   */
  async projectsLocationsBuildsList(parent: string, opts: ProjectsLocationsBuildsListOptions = {}): Promise<ListBuildsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/builds`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListBuildsResponse(data);
  }

  /**
   * Creates a new build based on the specified build. This method creates a
   * new build using the original build request, which may or may not result in
   * an identical build. For triggered builds: * Triggered builds resolve to a
   * precise revision; therefore a retry of a triggered build will result in a
   * build that uses the same revision. For non-triggered builds that specify
   * `RepoSource`: * If the original build built from the tip of a branch, the
   * retried build will build from the tip of that branch, which may not be the
   * same revision as the original build. * If the original build specified a
   * commit sha or revision ID, the retried build will use the identical source.
   * For builds that specify `StorageSource`: * If the original build pulled
   * source from Google Cloud Storage without specifying the generation of the
   * object, the new build will use the current object, which may be different
   * from the original build source. * If the original build pulled source from
   * Cloud Storage and specified the generation of the object, the new build
   * will attempt to use the same object, which may or may not be available
   * depending on the bucket's lifecycle management settings.
   *
   * @param name The name of the `Build` to retry. Format: `projects/{project}/locations/{location}/builds/{build}`
   */
  async projectsLocationsBuildsRetry(name: string, req: RetryBuildRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:retry`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Create an association between a GCP project and a GitHub Enterprise
   * server.
   *
   * @param parent Name of the parent project. For example: projects/{$project_number} or projects/{$project_id}
   */
  async projectsLocationsGithubEnterpriseConfigsCreate(parent: string, req: GitHubEnterpriseConfig, opts: ProjectsLocationsGithubEnterpriseConfigsCreateOptions = {}): Promise<Operation> {
    req = serializeGitHubEnterpriseConfig(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/githubEnterpriseConfigs`);
    if (opts.gheConfigId !== undefined) {
      url.searchParams.append("gheConfigId", String(opts.gheConfigId));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
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
   * Delete an association between a GCP project and a GitHub Enterprise
   * server.
   *
   * @param name This field should contain the name of the enterprise config resource. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}"
   */
  async projectsLocationsGithubEnterpriseConfigsDelete(name: string, opts: ProjectsLocationsGithubEnterpriseConfigsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.configId !== undefined) {
      url.searchParams.append("configId", String(opts.configId));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieve a GitHubEnterpriseConfig.
   *
   * @param name This field should contain the name of the enterprise config resource. For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}"
   */
  async projectsLocationsGithubEnterpriseConfigsGet(name: string, opts: ProjectsLocationsGithubEnterpriseConfigsGetOptions = {}): Promise<GitHubEnterpriseConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.configId !== undefined) {
      url.searchParams.append("configId", String(opts.configId));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGitHubEnterpriseConfig(data);
  }

  /**
   * List all GitHubEnterpriseConfigs for a given project.
   *
   * @param parent Name of the parent project. For example: projects/{$project_number} or projects/{$project_id}
   */
  async projectsLocationsGithubEnterpriseConfigsList(parent: string, opts: ProjectsLocationsGithubEnterpriseConfigsListOptions = {}): Promise<ListGithubEnterpriseConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/githubEnterpriseConfigs`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListGithubEnterpriseConfigsResponse(data);
  }

  /**
   * Update an association between a GCP project and a GitHub Enterprise
   * server.
   *
   * @param name Optional. The full resource name for the GitHubEnterpriseConfig For example: "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}"
   */
  async projectsLocationsGithubEnterpriseConfigsPatch(name: string, req: GitHubEnterpriseConfig, opts: ProjectsLocationsGithubEnterpriseConfigsPatchOptions = {}): Promise<Operation> {
    req = serializeGitHubEnterpriseConfig(req);
    opts = serializeProjectsLocationsGithubEnterpriseConfigsPatchOptions(opts);
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
    return data as Operation;
  }

  /**
   * Batch connecting GitLab repositories to Cloud Build. This API is
   * experimental.
   *
   * @param parent The name of the `GitLabConfig` that adds connected repositories. Format: `projects/{project}/locations/{location}/gitLabConfigs/{config}`
   */
  async projectsLocationsGitLabConfigsConnectedRepositoriesBatchCreate(parent: string, req: BatchCreateGitLabConnectedRepositoriesRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/connectedRepositories:batchCreate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a new `GitLabConfig`. This API is experimental
   *
   * @param parent Required. Name of the parent resource.
   */
  async projectsLocationsGitLabConfigsCreate(parent: string, req: GitLabConfig, opts: ProjectsLocationsGitLabConfigsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/gitLabConfigs`);
    if (opts.gitlabConfigId !== undefined) {
      url.searchParams.append("gitlabConfigId", String(opts.gitlabConfigId));
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
   * Delete a `GitLabConfig`. This API is experimental
   *
   * @param name Required. The config resource name.
   */
  async projectsLocationsGitLabConfigsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieves a `GitLabConfig`. This API is experimental
   *
   * @param name Required. The config resource name.
   */
  async projectsLocationsGitLabConfigsGet(name: string): Promise<GitLabConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GitLabConfig;
  }

  /**
   * List all `GitLabConfigs` for a given project. This API is experimental
   *
   * @param parent Required. Name of the parent resource
   */
  async projectsLocationsGitLabConfigsList(parent: string, opts: ProjectsLocationsGitLabConfigsListOptions = {}): Promise<ListGitLabConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/gitLabConfigs`);
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
    return data as ListGitLabConfigsResponse;
  }

  /**
   * Updates an existing `GitLabConfig`. This API is experimental
   *
   * @param name The resource name for the config.
   */
  async projectsLocationsGitLabConfigsPatch(name: string, req: GitLabConfig, opts: ProjectsLocationsGitLabConfigsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsGitLabConfigsPatchOptions(opts);
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
    return data as Operation;
  }

  /**
   * Remove a GitLab repository from a given GitLabConfig's connected
   * repositories. This API is experimental.
   *
   * @param config Required. The name of the `GitLabConfig` to remove a connected repository. Format: `projects/{project}/locations/{location}/gitLabConfigs/{config}`
   */
  async projectsLocationsGitLabConfigsRemoveGitLabConnectedRepository(config: string, req: RemoveGitLabConnectedRepositoryRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ config }:removeGitLabConnectedRepository`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * List all repositories for a given `GitLabConfig`. This API is experimental
   *
   * @param parent Required. Name of the parent resource.
   */
  async projectsLocationsGitLabConfigsReposList(parent: string, opts: ProjectsLocationsGitLabConfigsReposListOptions = {}): Promise<ListGitLabRepositoriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/repos`);
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
    return data as ListGitLabRepositoriesResponse;
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
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
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
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Creates a new `BuildTrigger`. This API is experimental.
   *
   * @param parent The parent resource where this trigger will be created. Format: `projects/{project}/locations/{location}`
   */
  async projectsLocationsTriggersCreate(parent: string, req: BuildTrigger, opts: ProjectsLocationsTriggersCreateOptions = {}): Promise<BuildTrigger> {
    req = serializeBuildTrigger(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/triggers`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBuildTrigger(data);
  }

  /**
   * Deletes a `BuildTrigger` by its project ID and trigger ID. This API is
   * experimental.
   *
   * @param name The name of the `Trigger` to delete. Format: `projects/{project}/locations/{location}/triggers/{trigger}`
   */
  async projectsLocationsTriggersDelete(name: string, opts: ProjectsLocationsTriggersDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.triggerId !== undefined) {
      url.searchParams.append("triggerId", String(opts.triggerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns information about a `BuildTrigger`. This API is experimental.
   *
   * @param name The name of the `Trigger` to retrieve. Format: `projects/{project}/locations/{location}/triggers/{trigger}`
   */
  async projectsLocationsTriggersGet(name: string, opts: ProjectsLocationsTriggersGetOptions = {}): Promise<BuildTrigger> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.triggerId !== undefined) {
      url.searchParams.append("triggerId", String(opts.triggerId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBuildTrigger(data);
  }

  /**
   * Lists existing `BuildTrigger`s. This API is experimental.
   *
   * @param parent The parent of the collection of `Triggers`. Format: `projects/{project}/locations/{location}`
   */
  async projectsLocationsTriggersList(parent: string, opts: ProjectsLocationsTriggersListOptions = {}): Promise<ListBuildTriggersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/triggers`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListBuildTriggersResponse(data);
  }

  /**
   * Updates a `BuildTrigger` by its project ID and trigger ID. This API is
   * experimental.
   *
   * @param resourceName The `Trigger` name with format: `projects/{project}/locations/{location}/triggers/{trigger}`, where {trigger} is a unique identifier generated by the service.
   */
  async projectsLocationsTriggersPatch(resourceName: string, req: BuildTrigger, opts: ProjectsLocationsTriggersPatchOptions = {}): Promise<BuildTrigger> {
    req = serializeBuildTrigger(req);
    const url = new URL(`${this.#baseUrl}v1/${ resourceName }`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.triggerId !== undefined) {
      url.searchParams.append("triggerId", String(opts.triggerId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeBuildTrigger(data);
  }

  /**
   * Runs a `BuildTrigger` at a particular source revision. To run a regional
   * or global trigger, use the POST request that includes the location endpoint
   * in the path (ex.
   * v1/projects/{projectId}/locations/{region}/triggers/{triggerId}:run). The
   * POST request that does not include the location endpoint in the path can
   * only be used when running global triggers.
   *
   * @param name The name of the `Trigger` to run. Format: `projects/{project}/locations/{location}/triggers/{trigger}`
   */
  async projectsLocationsTriggersRun(name: string, req: RunBuildTriggerRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:run`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * ReceiveTriggerWebhook [Experimental] is called when the API receives a
   * webhook request targeted at a specific trigger.
   *
   * @param name The name of the `ReceiveTriggerWebhook` to retrieve. Format: `projects/{project}/locations/{location}/triggers/{trigger}`
   */
  async projectsLocationsTriggersWebhook(name: string, req: HttpBody, opts: ProjectsLocationsTriggersWebhookOptions = {}): Promise<ReceiveTriggerWebhookResponse> {
    req = serializeHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:webhook`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.secret !== undefined) {
      url.searchParams.append("secret", String(opts.secret));
    }
    if (opts.trigger !== undefined) {
      url.searchParams.append("trigger", String(opts.trigger));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReceiveTriggerWebhookResponse;
  }

  /**
   * Creates a `WorkerPool`.
   *
   * @param parent Required. The parent resource where this worker pool will be created. Format: `projects/{project}/locations/{location}`.
   */
  async projectsLocationsWorkerPoolsCreate(parent: string, req: WorkerPool, opts: ProjectsLocationsWorkerPoolsCreateOptions = {}): Promise<Operation> {
    req = serializeWorkerPool(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/workerPools`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    if (opts.workerPoolId !== undefined) {
      url.searchParams.append("workerPoolId", String(opts.workerPoolId));
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
   * Deletes a `WorkerPool`.
   *
   * @param name Required. The name of the `WorkerPool` to delete. Format: `projects/{project}/locations/{location}/workerPools/{workerPool}`.
   */
  async projectsLocationsWorkerPoolsDelete(name: string, opts: ProjectsLocationsWorkerPoolsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
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
   * Returns details of a `WorkerPool`.
   *
   * @param name Required. The name of the `WorkerPool` to retrieve. Format: `projects/{project}/locations/{location}/workerPools/{workerPool}`.
   */
  async projectsLocationsWorkerPoolsGet(name: string): Promise<WorkerPool> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeWorkerPool(data);
  }

  /**
   * Lists `WorkerPool`s.
   *
   * @param parent Required. The parent of the collection of `WorkerPools`. Format: `projects/{project}/locations/{location}`.
   */
  async projectsLocationsWorkerPoolsList(parent: string, opts: ProjectsLocationsWorkerPoolsListOptions = {}): Promise<ListWorkerPoolsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/workerPools`);
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
    return deserializeListWorkerPoolsResponse(data);
  }

  /**
   * Updates a `WorkerPool`.
   *
   * @param name Output only. The resource name of the `WorkerPool`, with format `projects/{project}/locations/{location}/workerPools/{worker_pool}`. The value of `{worker_pool}` is provided by `worker_pool_id` in `CreateWorkerPool` request and the value of `{location}` is determined by the endpoint accessed.
   */
  async projectsLocationsWorkerPoolsPatch(name: string, req: WorkerPool, opts: ProjectsLocationsWorkerPoolsPatchOptions = {}): Promise<Operation> {
    req = serializeWorkerPool(req);
    opts = serializeProjectsLocationsWorkerPoolsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * Creates a new `BuildTrigger`. This API is experimental.
   *
   * @param projectId Required. ID of the project for which to configure automatic builds.
   */
  async projectsTriggersCreate(projectId: string, req: BuildTrigger, opts: ProjectsTriggersCreateOptions = {}): Promise<BuildTrigger> {
    req = serializeBuildTrigger(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/triggers`);
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBuildTrigger(data);
  }

  /**
   * Deletes a `BuildTrigger` by its project ID and trigger ID. This API is
   * experimental.
   *
   * @param projectId Required. ID of the project that owns the trigger.
   * @param triggerId Required. ID of the `BuildTrigger` to delete.
   */
  async projectsTriggersDelete(projectId: string, triggerId: string, opts: ProjectsTriggersDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/triggers/${ triggerId }`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns information about a `BuildTrigger`. This API is experimental.
   *
   * @param projectId Required. ID of the project that owns the trigger.
   * @param triggerId Required. Identifier (`id` or `name`) of the `BuildTrigger` to get.
   */
  async projectsTriggersGet(projectId: string, triggerId: string, opts: ProjectsTriggersGetOptions = {}): Promise<BuildTrigger> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/triggers/${ triggerId }`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBuildTrigger(data);
  }

  /**
   * Lists existing `BuildTrigger`s. This API is experimental.
   *
   * @param projectId Required. ID of the project for which to list BuildTriggers.
   */
  async projectsTriggersList(projectId: string, opts: ProjectsTriggersListOptions = {}): Promise<ListBuildTriggersResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/triggers`);
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
    return deserializeListBuildTriggersResponse(data);
  }

  /**
   * Updates a `BuildTrigger` by its project ID and trigger ID. This API is
   * experimental.
   *
   * @param projectId Required. ID of the project that owns the trigger.
   * @param triggerId Required. ID of the `BuildTrigger` to update.
   */
  async projectsTriggersPatch(projectId: string, triggerId: string, req: BuildTrigger): Promise<BuildTrigger> {
    req = serializeBuildTrigger(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/triggers/${ triggerId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeBuildTrigger(data);
  }

  /**
   * Runs a `BuildTrigger` at a particular source revision. To run a regional
   * or global trigger, use the POST request that includes the location endpoint
   * in the path (ex.
   * v1/projects/{projectId}/locations/{region}/triggers/{triggerId}:run). The
   * POST request that does not include the location endpoint in the path can
   * only be used when running global triggers.
   *
   * @param projectId Required. ID of the project.
   * @param triggerId Required. ID of the trigger.
   */
  async projectsTriggersRun(projectId: string, triggerId: string, req: RepoSource, opts: ProjectsTriggersRunOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/triggers/${ triggerId }:run`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
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
   * ReceiveTriggerWebhook [Experimental] is called when the API receives a
   * webhook request targeted at a specific trigger.
   *
   * @param projectId Project in which the specified trigger lives
   * @param trigger Name of the trigger to run the payload against
   */
  async projectsTriggersWebhook(projectId: string, trigger: string, req: HttpBody, opts: ProjectsTriggersWebhookOptions = {}): Promise<ReceiveTriggerWebhookResponse> {
    req = serializeHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/triggers/${ trigger }:webhook`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    if (opts.secret !== undefined) {
      url.searchParams.append("secret", String(opts.secret));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReceiveTriggerWebhookResponse;
  }

  /**
   * ReceiveWebhook is called when the API receives a GitHub webhook.
   *
   */
  async v1Webhook(req: HttpBody, opts: V1WebhookOptions = {}): Promise<Empty> {
    req = serializeHttpBody(req);
    const url = new URL(`${this.#baseUrl}v1/webhook`);
    if (opts.webhookKey !== undefined) {
      url.searchParams.append("webhookKey", String(opts.webhookKey));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }
}

/**
 * ApprovalConfig describes configuration for manual approval of a build.
 */
export interface ApprovalConfig {
  /**
   * Whether or not approval is needed. If this is set on a build, it will
   * become pending when created, and will need to be explicitly approved to
   * start.
   */
  approvalRequired?: boolean;
}

/**
 * ApprovalResult describes the decision and associated metadata of a manual
 * approval of a build.
 */
export interface ApprovalResult {
  /**
   * Output only. The time when the approval decision was made.
   */
  readonly approvalTime?: Date;
  /**
   * Output only. Email of the user that called the ApproveBuild API to approve
   * or reject a build at the time that the API was called.
   */
  readonly approverAccount?: string;
  /**
   * Optional. An optional comment for this manual approval result.
   */
  comment?: string;
  /**
   * Required. The decision of this manual approval.
   */
  decision?:  | "DECISION_UNSPECIFIED" | "APPROVED" | "REJECTED";
  /**
   * Optional. An optional URL tied to this manual approval result. This field
   * is essentially the same as comment, except that it will be rendered by the
   * UI differently. An example use case is a link to an external job that
   * approved this Build.
   */
  url?: string;
}

/**
 * Request to approve or reject a pending build.
 */
export interface ApproveBuildRequest {
  /**
   * Approval decision and metadata.
   */
  approvalResult?: ApprovalResult;
}

/**
 * Files in the workspace to upload to Cloud Storage upon successful completion
 * of all build steps.
 */
export interface ArtifactObjects {
  /**
   * Cloud Storage bucket and optional object path, in the form
   * "gs://bucket/path/to/somewhere/". (see [Bucket Name
   * Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).
   * Files in the workspace matching any path pattern will be uploaded to Cloud
   * Storage with this location as a prefix.
   */
  location?: string;
  /**
   * Path globs used to match files in the build's workspace.
   */
  paths?: string[];
  /**
   * Output only. Stores timing information for pushing all artifact objects.
   */
  readonly timing?: TimeSpan;
}

/**
 * An artifact that was uploaded during a build. This is a single record in the
 * artifact manifest JSON file.
 */
export interface ArtifactResult {
  /**
   * The file hash of the artifact.
   */
  fileHash?: FileHashes[];
  /**
   * The path of an artifact in a Google Cloud Storage bucket, with the
   * generation number. For example,
   * `gs://mybucket/path/to/output.jar#generation`.
   */
  location?: string;
}

function serializeArtifactResult(data: any): ArtifactResult {
  return {
    ...data,
    fileHash: data["fileHash"] !== undefined ? data["fileHash"].map((item: any) => (serializeFileHashes(item))) : undefined,
  };
}

function deserializeArtifactResult(data: any): ArtifactResult {
  return {
    ...data,
    fileHash: data["fileHash"] !== undefined ? data["fileHash"].map((item: any) => (deserializeFileHashes(item))) : undefined,
  };
}

/**
 * Artifacts produced by a build that should be uploaded upon successful
 * completion of all build steps.
 */
export interface Artifacts {
  /**
   * A list of images to be pushed upon the successful completion of all build
   * steps. The images will be pushed using the builder service account's
   * credentials. The digests of the pushed images will be stored in the Build
   * resource's results field. If any of the images fail to be pushed, the build
   * is marked FAILURE.
   */
  images?: string[];
  /**
   * A list of Maven artifacts to be uploaded to Artifact Registry upon
   * successful completion of all build steps. Artifacts in the workspace
   * matching specified paths globs will be uploaded to the specified Artifact
   * Registry repository using the builder service account's credentials. If any
   * artifacts fail to be pushed, the build is marked FAILURE.
   */
  mavenArtifacts?: MavenArtifact[];
  /**
   * A list of objects to be uploaded to Cloud Storage upon successful
   * completion of all build steps. Files in the workspace matching specified
   * paths globs will be uploaded to the specified Cloud Storage location using
   * the builder service account's credentials. The location and generation of
   * the uploaded objects will be stored in the Build resource's results field.
   * If any objects fail to be pushed, the build is marked FAILURE.
   */
  objects?: ArtifactObjects;
  /**
   * A list of Python packages to be uploaded to Artifact Registry upon
   * successful completion of all build steps. The build service account
   * credentials will be used to perform the upload. If any objects fail to be
   * pushed, the build is marked FAILURE.
   */
  pythonPackages?: PythonPackage[];
}

/**
 * RPC request object accepted by
 * BatchCreateBitbucketServerConnectedRepositories RPC method.
 */
export interface BatchCreateBitbucketServerConnectedRepositoriesRequest {
  /**
   * Required. Requests to connect Bitbucket Server repositories.
   */
  requests?: CreateBitbucketServerConnectedRepositoryRequest[];
}

/**
 * Response of BatchCreateBitbucketServerConnectedRepositories RPC method
 * including all successfully connected Bitbucket Server repositories.
 */
export interface BatchCreateBitbucketServerConnectedRepositoriesResponse {
  /**
   * The connected Bitbucket Server repositories.
   */
  bitbucketServerConnectedRepositories?: BitbucketServerConnectedRepository[];
}

/**
 * Metadata for `BatchCreateBitbucketServerConnectedRepositories` operation.
 */
export interface BatchCreateBitbucketServerConnectedRepositoriesResponseMetadata {
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * The name of the `BitbucketServerConfig` that added connected repositories.
   * Format:
   * `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}`
   */
  config?: string;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
}

function serializeBatchCreateBitbucketServerConnectedRepositoriesResponseMetadata(data: any): BatchCreateBitbucketServerConnectedRepositoriesResponseMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeBatchCreateBitbucketServerConnectedRepositoriesResponseMetadata(data: any): BatchCreateBitbucketServerConnectedRepositoriesResponseMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * RPC request object accepted by BatchCreateGitLabConnectedRepositories RPC
 * method.
 */
export interface BatchCreateGitLabConnectedRepositoriesRequest {
  /**
   * Required. Requests to connect GitLab repositories.
   */
  requests?: CreateGitLabConnectedRepositoryRequest[];
}

/**
 * Response of BatchCreateGitLabConnectedRepositories RPC method.
 */
export interface BatchCreateGitLabConnectedRepositoriesResponse {
  /**
   * The GitLab connected repository requests' responses.
   */
  gitlabConnectedRepositories?: GitLabConnectedRepository[];
}

/**
 * Metadata for `BatchCreateGitLabConnectedRepositories` operation.
 */
export interface BatchCreateGitLabConnectedRepositoriesResponseMetadata {
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * The name of the `GitLabConfig` that added connected repositories. Format:
   * `projects/{project}/locations/{location}/gitLabConfigs/{config}`
   */
  config?: string;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
}

function serializeBatchCreateGitLabConnectedRepositoriesResponseMetadata(data: any): BatchCreateGitLabConnectedRepositoriesResponseMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeBatchCreateGitLabConnectedRepositoriesResponseMetadata(data: any): BatchCreateGitLabConnectedRepositoriesResponseMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * BitbucketServerConfig represents the configuration for a Bitbucket Server.
 */
export interface BitbucketServerConfig {
  /**
   * Required. Immutable. API Key that will be attached to webhook. Once this
   * field has been set, it cannot be changed. If you need to change it, please
   * create another BitbucketServerConfig.
   */
  apiKey?: string;
  /**
   * Output only. Connected Bitbucket Server repositories for this config.
   */
  readonly connectedRepositories?: BitbucketServerRepositoryId[];
  /**
   * Time when the config was created.
   */
  createTime?: Date;
  /**
   * Required. Immutable. The URI of the Bitbucket Server host. Once this field
   * has been set, it cannot be changed. If you need to change it, please create
   * another BitbucketServerConfig.
   */
  hostUri?: string;
  /**
   * The resource name for the config.
   */
  name?: string;
  /**
   * Optional. The network to be used when reaching out to the Bitbucket Server
   * instance. The VPC network must be enabled for private service connection.
   * This should be set if the Bitbucket Server instance is hosted on-premises
   * and not reachable by public internet. If this field is left empty, no
   * network peering will occur and calls to the Bitbucket Server instance will
   * be made over the public internet. Must be in the format
   * `projects/{project}/global/networks/{network}`, where {project} is a
   * project number or id and {network} is the name of a VPC network in the
   * project.
   */
  peeredNetwork?: string;
  /**
   * Required. Secret Manager secrets needed by the config.
   */
  secrets?: BitbucketServerSecrets;
  /**
   * Optional. SSL certificate to use for requests to Bitbucket Server. The
   * format should be PEM format but the extension can be one of .pem, .cer, or
   * .crt.
   */
  sslCa?: string;
  /**
   * Username of the account Cloud Build will use on Bitbucket Server.
   */
  username?: string;
  /**
   * Output only. UUID included in webhook requests. The UUID is used to look
   * up the corresponding config.
   */
  readonly webhookKey?: string;
}

function serializeBitbucketServerConfig(data: any): BitbucketServerConfig {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeBitbucketServerConfig(data: any): BitbucketServerConfig {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * / BitbucketServerConnectedRepository represents a connected Bitbucket Server
 * / repository.
 */
export interface BitbucketServerConnectedRepository {
  /**
   * The name of the `BitbucketServerConfig` that added connected repository.
   * Format:
   * `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}`
   */
  parent?: string;
  /**
   * The Bitbucket Server repositories to connect.
   */
  repo?: BitbucketServerRepositoryId;
  /**
   * Output only. The status of the repo connection request.
   */
  readonly status?: Status;
}

/**
 * BitbucketServerRepository represents a repository hosted on a Bitbucket
 * Server.
 */
export interface BitbucketServerRepository {
  /**
   * Link to the browse repo page on the Bitbucket Server instance.
   */
  browseUri?: string;
  /**
   * Description of the repository.
   */
  description?: string;
  /**
   * Display name of the repository.
   */
  displayName?: string;
  /**
   * The resource name of the repository.
   */
  name?: string;
  /**
   * Identifier for a repository hosted on a Bitbucket Server.
   */
  repoId?: BitbucketServerRepositoryId;
}

/**
 * BitbucketServerRepositoryId identifies a specific repository hosted on a
 * Bitbucket Server.
 */
export interface BitbucketServerRepositoryId {
  /**
   * Required. Identifier for the project storing the repository.
   */
  projectKey?: string;
  /**
   * Required. Identifier for the repository.
   */
  repoSlug?: string;
  /**
   * Output only. The ID of the webhook that was created for receiving events
   * from this repo. We only create and manage a single webhook for each repo.
   */
  readonly webhookId?: number;
}

/**
 * BitbucketServerSecrets represents the secrets in Secret Manager for a
 * Bitbucket Server.
 */
export interface BitbucketServerSecrets {
  /**
   * Required. The resource name for the admin access token's secret version.
   */
  adminAccessTokenVersionName?: string;
  /**
   * Required. The resource name for the read access token's secret version.
   */
  readAccessTokenVersionName?: string;
  /**
   * Required. Immutable. The resource name for the webhook secret's secret
   * version. Once this field has been set, it cannot be changed. If you need to
   * change it, please create another BitbucketServerConfig.
   */
  webhookSecretVersionName?: string;
}

/**
 * BitbucketServerTriggerConfig describes the configuration of a trigger that
 * creates a build whenever a Bitbucket Server event is received.
 */
export interface BitbucketServerTriggerConfig {
  /**
   * Output only. The BitbucketServerConfig specified in the
   * bitbucket_server_config_resource field.
   */
  readonly bitbucketServerConfig?: BitbucketServerConfig;
  /**
   * Required. The Bitbucket server config resource that this trigger config
   * maps to.
   */
  bitbucketServerConfigResource?: string;
  /**
   * Required. Key of the project that the repo is in. For example: The key for
   * https://mybitbucket.server/projects/TEST/repos/test-repo is "TEST".
   */
  projectKey?: string;
  /**
   * Filter to match changes in pull requests.
   */
  pullRequest?: PullRequestFilter;
  /**
   * Filter to match changes in refs like branches, tags.
   */
  push?: PushFilter;
  /**
   * Required. Slug of the repository. A repository slug is a URL-friendly
   * version of a repository name, automatically generated by Bitbucket for use
   * in the URL. For example, if the repository name is 'test repo', in the URL
   * it would become 'test-repo' as in
   * https://mybitbucket.server/projects/TEST/repos/test-repo.
   */
  repoSlug?: string;
}

/**
 * A build resource in the Cloud Build API. At a high level, a `Build`
 * describes where to find source code, how to build it (for example, the
 * builder image to run on the source), and where to store the built artifacts.
 * Fields can include the following variables, which will be expanded when the
 * build is created: - $PROJECT_ID: the project ID of the build. -
 * $PROJECT_NUMBER: the project number of the build. - $LOCATION: the
 * location/region of the build. - $BUILD_ID: the autogenerated ID of the build.
 * - $REPO_NAME: the source repository name specified by RepoSource. -
 * $BRANCH_NAME: the branch name specified by RepoSource. - $TAG_NAME: the tag
 * name specified by RepoSource. - $REVISION_ID or $COMMIT_SHA: the commit SHA
 * specified by RepoSource or resolved from the specified branch or tag. -
 * $SHORT_SHA: first 7 characters of $REVISION_ID or $COMMIT_SHA.
 */
export interface Build {
  /**
   * Output only. Describes this build's approval configuration, status, and
   * result.
   */
  readonly approval?: BuildApproval;
  /**
   * Artifacts produced by the build that should be uploaded upon successful
   * completion of all build steps.
   */
  artifacts?: Artifacts;
  /**
   * Secrets and secret environment variables.
   */
  availableSecrets?: Secrets;
  /**
   * Output only. The ID of the `BuildTrigger` that triggered this build, if it
   * was triggered automatically.
   */
  readonly buildTriggerId?: string;
  /**
   * Output only. Time at which the request to create the build was received.
   */
  readonly createTime?: Date;
  /**
   * Output only. Contains information about the build when status=FAILURE.
   */
  readonly failureInfo?: FailureInfo;
  /**
   * Output only. Time at which execution of the build was finished. The
   * difference between finish_time and start_time is the duration of the
   * build's execution.
   */
  readonly finishTime?: Date;
  /**
   * Output only. Unique identifier of the build.
   */
  readonly id?: string;
  /**
   * A list of images to be pushed upon the successful completion of all build
   * steps. The images are pushed using the builder service account's
   * credentials. The digests of the pushed images will be stored in the `Build`
   * resource's results field. If any of the images fail to be pushed, the build
   * status is marked `FAILURE`.
   */
  images?: string[];
  /**
   * Google Cloud Storage bucket where logs should be written (see [Bucket Name
   * Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).
   * Logs file names will be of the format `${logs_bucket}/log-${build_id}.txt`.
   */
  logsBucket?: string;
  /**
   * Output only. URL to logs for this build in Google Cloud Console.
   */
  readonly logUrl?: string;
  /**
   * Output only. The 'Build' name with format:
   * `projects/{project}/locations/{location}/builds/{build}`, where {build} is
   * a unique identifier generated by the service.
   */
  readonly name?: string;
  /**
   * Special options for this build.
   */
  options?: BuildOptions;
  /**
   * Output only. ID of the project.
   */
  readonly projectId?: string;
  /**
   * TTL in queue for this build. If provided and the build is enqueued longer
   * than this value, the build will expire and the build status will be
   * `EXPIRED`. The TTL starts ticking from create_time.
   */
  queueTtl?: number /* Duration */;
  /**
   * Output only. Results of the build.
   */
  readonly results?: Results;
  /**
   * Secrets to decrypt using Cloud Key Management Service. Note: Secret
   * Manager is the recommended technique for managing sensitive data with Cloud
   * Build. Use `available_secrets` to configure builds to access secrets from
   * Secret Manager. For instructions, see:
   * https://cloud.google.com/cloud-build/docs/securing-builds/use-secrets
   */
  secrets?: Secret[];
  /**
   * IAM service account whose credentials will be used at build runtime. Must
   * be of the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. ACCOUNT
   * can be email address or uniqueId of the service account.
   */
  serviceAccount?: string;
  /**
   * The location of the source files to build.
   */
  source?: Source;
  /**
   * Output only. A permanent fixed identifier for source.
   */
  readonly sourceProvenance?: SourceProvenance;
  /**
   * Output only. Time at which execution of the build was started.
   */
  readonly startTime?: Date;
  /**
   * Output only. Status of the build.
   */
  readonly status?:  | "STATUS_UNKNOWN" | "PENDING" | "QUEUED" | "WORKING" | "SUCCESS" | "FAILURE" | "INTERNAL_ERROR" | "TIMEOUT" | "CANCELLED" | "EXPIRED";
  /**
   * Output only. Customer-readable message about the current status.
   */
  readonly statusDetail?: string;
  /**
   * Required. The operations to be performed on the workspace.
   */
  steps?: BuildStep[];
  /**
   * Substitutions data for `Build` resource.
   */
  substitutions?: {
    [key: string]: string
  };
  /**
   * Tags for annotation of a `Build`. These are not docker tags.
   */
  tags?: string[];
  /**
   * Amount of time that this build should be allowed to run, to second
   * granularity. If this amount of time elapses, work on the build will cease
   * and the build status will be `TIMEOUT`. `timeout` starts ticking from
   * `startTime`. Default time is 60 minutes.
   */
  timeout?: number /* Duration */;
  /**
   * Output only. Stores timing information for phases of the build. Valid keys
   * are: * BUILD: time to execute all build steps. * PUSH: time to push all
   * artifacts including docker images and non docker artifacts. * FETCHSOURCE:
   * time to fetch source. * SETUPBUILD: time to set up build. If the build does
   * not specify source or images, these keys will not be included.
   */
  readonly timing?: {
    [key: string]: TimeSpan
  };
  /**
   * Output only. Non-fatal problems encountered during the execution of the
   * build.
   */
  readonly warnings?: Warning[];
}

function serializeBuild(data: any): Build {
  return {
    ...data,
    availableSecrets: data["availableSecrets"] !== undefined ? serializeSecrets(data["availableSecrets"]) : undefined,
    options: data["options"] !== undefined ? serializeBuildOptions(data["options"]) : undefined,
    queueTtl: data["queueTtl"] !== undefined ? data["queueTtl"] : undefined,
    secrets: data["secrets"] !== undefined ? data["secrets"].map((item: any) => (serializeSecret(item))) : undefined,
    source: data["source"] !== undefined ? serializeSource(data["source"]) : undefined,
    steps: data["steps"] !== undefined ? data["steps"].map((item: any) => (serializeBuildStep(item))) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeBuild(data: any): Build {
  return {
    ...data,
    availableSecrets: data["availableSecrets"] !== undefined ? deserializeSecrets(data["availableSecrets"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    finishTime: data["finishTime"] !== undefined ? new Date(data["finishTime"]) : undefined,
    options: data["options"] !== undefined ? deserializeBuildOptions(data["options"]) : undefined,
    queueTtl: data["queueTtl"] !== undefined ? data["queueTtl"] : undefined,
    results: data["results"] !== undefined ? deserializeResults(data["results"]) : undefined,
    secrets: data["secrets"] !== undefined ? data["secrets"].map((item: any) => (deserializeSecret(item))) : undefined,
    source: data["source"] !== undefined ? deserializeSource(data["source"]) : undefined,
    sourceProvenance: data["sourceProvenance"] !== undefined ? deserializeSourceProvenance(data["sourceProvenance"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    steps: data["steps"] !== undefined ? data["steps"].map((item: any) => (deserializeBuildStep(item))) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
    timing: data["timing"] !== undefined ? Object.fromEntries(Object.entries(data["timing"]).map(([k, v]: [string, any]) => ([k, deserializeTimeSpan(v)]))) : undefined,
  };
}

/**
 * BuildApproval describes a build's approval configuration, state, and result.
 */
export interface BuildApproval {
  /**
   * Output only. Configuration for manual approval of this build.
   */
  readonly config?: ApprovalConfig;
  /**
   * Output only. Result of manual approval for this Build.
   */
  readonly result?: ApprovalResult;
  /**
   * Output only. The state of this build's approval.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
}

/**
 * Metadata for build operations.
 */
export interface BuildOperationMetadata {
  /**
   * The build that the operation is tracking.
   */
  build?: Build;
}

function serializeBuildOperationMetadata(data: any): BuildOperationMetadata {
  return {
    ...data,
    build: data["build"] !== undefined ? serializeBuild(data["build"]) : undefined,
  };
}

function deserializeBuildOperationMetadata(data: any): BuildOperationMetadata {
  return {
    ...data,
    build: data["build"] !== undefined ? deserializeBuild(data["build"]) : undefined,
  };
}

/**
 * Optional arguments to enable specific features of builds.
 */
export interface BuildOptions {
  /**
   * Requested disk size for the VM that runs the build. Note that this is
   * *NOT* "disk free"; some of the space will be used by the operating system
   * and build utilities. Also note that this is the minimum disk size that will
   * be allocated for the build -- the build may run with a larger disk than
   * requested. At present, the maximum disk size is 2000GB; builds that request
   * more than the maximum are rejected with an error.
   */
  diskSizeGb?: bigint;
  /**
   * Option to specify whether or not to apply bash style string operations to
   * the substitutions. NOTE: this is always enabled for triggered builds and
   * cannot be overridden in the build configuration file.
   */
  dynamicSubstitutions?: boolean;
  /**
   * A list of global environment variable definitions that will exist for all
   * build steps in this build. If a variable is defined in both globally and in
   * a build step, the variable will use the build step value. The elements are
   * of the form "KEY=VALUE" for the environment variable "KEY" being given the
   * value "VALUE".
   */
  env?: string[];
  /**
   * Option to specify the logging mode, which determines if and where build
   * logs are stored.
   */
  logging?:  | "LOGGING_UNSPECIFIED" | "LEGACY" | "GCS_ONLY" | "STACKDRIVER_ONLY" | "CLOUD_LOGGING_ONLY" | "NONE";
  /**
   * Option to define build log streaming behavior to Google Cloud Storage.
   */
  logStreamingOption?:  | "STREAM_DEFAULT" | "STREAM_ON" | "STREAM_OFF";
  /**
   * Compute Engine machine type on which to run the build.
   */
  machineType?:  | "UNSPECIFIED" | "N1_HIGHCPU_8" | "N1_HIGHCPU_32" | "E2_HIGHCPU_8" | "E2_HIGHCPU_32";
  /**
   * Optional. Specification for execution on a `WorkerPool`. See [running
   * builds in a private
   * pool](https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool)
   * for more information.
   */
  pool?: PoolOption;
  /**
   * Requested verifiability options.
   */
  requestedVerifyOption?:  | "NOT_VERIFIED" | "VERIFIED";
  /**
   * A list of global environment variables, which are encrypted using a Cloud
   * Key Management Service crypto key. These values must be specified in the
   * build's `Secret`. These variables will be available to all build steps in
   * this build.
   */
  secretEnv?: string[];
  /**
   * Requested hash for SourceProvenance.
   */
  sourceProvenanceHash?:  | "NONE" | "SHA256" | "MD5"[];
  /**
   * Option to specify behavior when there is an error in the substitution
   * checks. NOTE: this is always set to ALLOW_LOOSE for triggered builds and
   * cannot be overridden in the build configuration file.
   */
  substitutionOption?:  | "MUST_MATCH" | "ALLOW_LOOSE";
  /**
   * Global list of volumes to mount for ALL build steps Each volume is created
   * as an empty volume prior to starting the build process. Upon completion of
   * the build, volumes and their contents are discarded. Global volume names
   * and paths cannot conflict with the volumes defined a build step. Using a
   * global volume in a build with only one step is not valid as it is
   * indicative of a build request with an incorrect configuration.
   */
  volumes?: Volume[];
  /**
   * This field deprecated; please use `pool.name` instead.
   */
  workerPool?: string;
}

function serializeBuildOptions(data: any): BuildOptions {
  return {
    ...data,
    diskSizeGb: data["diskSizeGb"] !== undefined ? String(data["diskSizeGb"]) : undefined,
  };
}

function deserializeBuildOptions(data: any): BuildOptions {
  return {
    ...data,
    diskSizeGb: data["diskSizeGb"] !== undefined ? BigInt(data["diskSizeGb"]) : undefined,
  };
}

/**
 * A step in the build pipeline.
 */
export interface BuildStep {
  /**
   * Allow this build step to fail without failing the entire build if and only
   * if the exit code is one of the specified codes. If allow_failure is also
   * specified, this field will take precedence.
   */
  allowExitCodes?: number[];
  /**
   * Allow this build step to fail without failing the entire build. If false,
   * the entire build will fail if this step fails. Otherwise, the build will
   * succeed, but this step will still have a failure status. Error information
   * will be reported in the failure_detail field.
   */
  allowFailure?: boolean;
  /**
   * A list of arguments that will be presented to the step when it is started.
   * If the image used to run the step's container has an entrypoint, the `args`
   * are used as arguments to that entrypoint. If the image does not define an
   * entrypoint, the first element in args is used as the entrypoint, and the
   * remainder will be used as arguments.
   */
  args?: string[];
  /**
   * Working directory to use when running this step's container. If this value
   * is a relative path, it is relative to the build's working directory. If
   * this value is absolute, it may be outside the build's working directory, in
   * which case the contents of the path may not be persisted across build step
   * executions, unless a `volume` for that path is specified. If the build
   * specifies a `RepoSource` with `dir` and a step with a `dir`, which
   * specifies an absolute path, the `RepoSource` `dir` is ignored for the
   * step's execution.
   */
  dir?: string;
  /**
   * Entrypoint to be used instead of the build step image's default
   * entrypoint. If unset, the image's default entrypoint is used.
   */
  entrypoint?: string;
  /**
   * A list of environment variable definitions to be used when running a step.
   * The elements are of the form "KEY=VALUE" for the environment variable "KEY"
   * being given the value "VALUE".
   */
  env?: string[];
  /**
   * Output only. Return code from running the step.
   */
  readonly exitCode?: number;
  /**
   * Unique identifier for this build step, used in `wait_for` to reference
   * this build step as a dependency.
   */
  id?: string;
  /**
   * Required. The name of the container image that will run this particular
   * build step. If the image is available in the host's Docker daemon's cache,
   * it will be run directly. If not, the host will attempt to pull the image
   * first, using the builder service account's credentials if necessary. The
   * Docker daemon's cache will already have the latest versions of all of the
   * officially supported build steps
   * ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)).
   * The Docker daemon will also have cached many of the layers for some popular
   * images, like "ubuntu", "debian", but they will be refreshed at the time you
   * attempt to use them. If you built an image in a previous build step, it
   * will be stored in the host's Docker daemon's cache and is available to use
   * as the name for a later build step.
   */
  name?: string;
  /**
   * Output only. Stores timing information for pulling this build step's
   * builder image only.
   */
  readonly pullTiming?: TimeSpan;
  /**
   * A shell script to be executed in the step. When script is provided, the
   * user cannot specify the entrypoint or args.
   */
  script?: string;
  /**
   * A list of environment variables which are encrypted using a Cloud Key
   * Management Service crypto key. These values must be specified in the
   * build's `Secret`.
   */
  secretEnv?: string[];
  /**
   * Output only. Status of the build step. At this time, build step status is
   * only updated on build completion; step status is not updated in real-time
   * as the build progresses.
   */
  readonly status?:  | "STATUS_UNKNOWN" | "PENDING" | "QUEUED" | "WORKING" | "SUCCESS" | "FAILURE" | "INTERNAL_ERROR" | "TIMEOUT" | "CANCELLED" | "EXPIRED";
  /**
   * Time limit for executing this build step. If not defined, the step has no
   * time limit and will be allowed to continue to run until either it completes
   * or the build itself times out.
   */
  timeout?: number /* Duration */;
  /**
   * Output only. Stores timing information for executing this build step.
   */
  readonly timing?: TimeSpan;
  /**
   * List of volumes to mount into the build step. Each volume is created as an
   * empty volume prior to execution of the build step. Upon completion of the
   * build, volumes and their contents are discarded. Using a named volume in
   * only one step is not valid as it is indicative of a build request with an
   * incorrect configuration.
   */
  volumes?: Volume[];
  /**
   * The ID(s) of the step(s) that this build step depends on. This build step
   * will not start until all the build steps in `wait_for` have completed
   * successfully. If `wait_for` is empty, this build step will start when all
   * previous build steps in the `Build.Steps` list have completed successfully.
   */
  waitFor?: string[];
}

function serializeBuildStep(data: any): BuildStep {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeBuildStep(data: any): BuildStep {
  return {
    ...data,
    pullTiming: data["pullTiming"] !== undefined ? deserializeTimeSpan(data["pullTiming"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
    timing: data["timing"] !== undefined ? deserializeTimeSpan(data["timing"]) : undefined,
  };
}

/**
 * Configuration for an automated build in response to source repository
 * changes.
 */
export interface BuildTrigger {
  /**
   * Configuration for manual approval to start a build invocation of this
   * BuildTrigger.
   */
  approvalConfig?: ApprovalConfig;
  /**
   * Autodetect build configuration. The following precedence is used (case
   * insensitive): 1. cloudbuild.yaml 2. cloudbuild.yml 3. cloudbuild.json 4.
   * Dockerfile Currently only available for GitHub App Triggers.
   */
  autodetect?: boolean;
  /**
   * BitbucketServerTriggerConfig describes the configuration of a trigger that
   * creates a build whenever a Bitbucket Server event is received.
   */
  bitbucketServerTriggerConfig?: BitbucketServerTriggerConfig;
  /**
   * Contents of the build template.
   */
  build?: Build;
  /**
   * Output only. Time when the trigger was created.
   */
  readonly createTime?: Date;
  /**
   * Human-readable description of this trigger.
   */
  description?: string;
  /**
   * If true, the trigger will never automatically execute a build.
   */
  disabled?: boolean;
  /**
   * EventType allows the user to explicitly set the type of event to which
   * this BuildTrigger should respond. This field will be validated against the
   * rest of the configuration if it is set.
   */
  eventType?:  | "EVENT_TYPE_UNSPECIFIED" | "REPO" | "WEBHOOK" | "PUBSUB" | "MANUAL";
  /**
   * Path, from the source root, to the build configuration file (i.e.
   * cloudbuild.yaml).
   */
  filename?: string;
  /**
   * A Common Expression Language string.
   */
  filter?: string;
  /**
   * The file source describing the local or remote Build template.
   */
  gitFileSource?: GitFileSource;
  /**
   * GitHubEventsConfig describes the configuration of a trigger that creates a
   * build whenever a GitHub event is received. Mutually exclusive with
   * `trigger_template`.
   */
  github?: GitHubEventsConfig;
  /**
   * GitLabEnterpriseEventsConfig describes the configuration of a trigger that
   * creates a build whenever a GitLab Enterprise event is received.
   */
  gitlabEnterpriseEventsConfig?: GitLabEventsConfig;
  /**
   * Output only. Unique identifier of the trigger.
   */
  readonly id?: string;
  /**
   * ignored_files and included_files are file glob matches using
   * https://golang.org/pkg/path/filepath/#Match extended with support for "**".
   * If ignored_files and changed files are both empty, then they are not used
   * to determine whether or not to trigger a build. If ignored_files is not
   * empty, then we ignore any files that match any of the ignored_file globs.
   * If the change has no files that are outside of the ignored_files globs,
   * then we do not trigger a build.
   */
  ignoredFiles?: string[];
  /**
   * If set to INCLUDE_BUILD_LOGS_WITH_STATUS, log url will be shown on GitHub
   * page when build status is final. Setting this field to
   * INCLUDE_BUILD_LOGS_WITH_STATUS for non GitHub triggers results in
   * INVALID_ARGUMENT error.
   */
  includeBuildLogs?:  | "INCLUDE_BUILD_LOGS_UNSPECIFIED" | "INCLUDE_BUILD_LOGS_WITH_STATUS";
  /**
   * If any of the files altered in the commit pass the ignored_files filter
   * and included_files is empty, then as far as this filter is concerned, we
   * should trigger the build. If any of the files altered in the commit pass
   * the ignored_files filter and included_files is not empty, then we make sure
   * that at least one of those files matches a included_files glob. If not,
   * then we do not trigger a build.
   */
  includedFiles?: string[];
  /**
   * User-assigned name of the trigger. Must be unique within the project.
   * Trigger names must meet the following requirements: + They must contain
   * only alphanumeric characters and dashes. + They can be 1-64 characters
   * long. + They must begin and end with an alphanumeric character.
   */
  name?: string;
  /**
   * PubsubConfig describes the configuration of a trigger that creates a build
   * whenever a Pub/Sub message is published.
   */
  pubsubConfig?: PubsubConfig;
  /**
   * The configuration of a trigger that creates a build whenever an event from
   * Repo API is received.
   */
  repositoryEventConfig?: RepositoryEventConfig;
  /**
   * The `Trigger` name with format:
   * `projects/{project}/locations/{location}/triggers/{trigger}`, where
   * {trigger} is a unique identifier generated by the service.
   */
  resourceName?: string;
  /**
   * The service account used for all user-controlled operations including
   * UpdateBuildTrigger, RunBuildTrigger, CreateBuild, and CancelBuild. If no
   * service account is set, then the standard Cloud Build service account
   * ([PROJECT_NUM]@system.gserviceaccount.com) will be used instead. Format:
   * `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT_ID_OR_EMAIL}`
   */
  serviceAccount?: string;
  /**
   * The repo and ref of the repository from which to build. This field is used
   * only for those triggers that do not respond to SCM events. Triggers that
   * respond to such events build source at whatever commit caused the event.
   * This field is currently only used by Webhook, Pub/Sub, Manual, and Cron
   * triggers.
   */
  sourceToBuild?: GitRepoSource;
  /**
   * Substitutions for Build resource. The keys must match the following
   * regular expression: `^_[A-Z0-9_]+$`.
   */
  substitutions?: {
    [key: string]: string
  };
  /**
   * Tags for annotation of a `BuildTrigger`
   */
  tags?: string[];
  /**
   * Template describing the types of source changes to trigger a build. Branch
   * and tag names in trigger templates are interpreted as regular expressions.
   * Any branch or tag change that matches that regular expression will trigger
   * a build. Mutually exclusive with `github`.
   */
  triggerTemplate?: RepoSource;
  /**
   * WebhookConfig describes the configuration of a trigger that creates a
   * build whenever a webhook is sent to a trigger's webhook URL.
   */
  webhookConfig?: WebhookConfig;
}

function serializeBuildTrigger(data: any): BuildTrigger {
  return {
    ...data,
    build: data["build"] !== undefined ? serializeBuild(data["build"]) : undefined,
    github: data["github"] !== undefined ? serializeGitHubEventsConfig(data["github"]) : undefined,
  };
}

function deserializeBuildTrigger(data: any): BuildTrigger {
  return {
    ...data,
    build: data["build"] !== undefined ? deserializeBuild(data["build"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    github: data["github"] !== undefined ? deserializeGitHubEventsConfig(data["github"]) : undefined,
  };
}

/**
 * An image built by the pipeline.
 */
export interface BuiltImage {
  /**
   * Docker Registry 2.0 digest.
   */
  digest?: string;
  /**
   * Name used to push the container image to Google Container Registry, as
   * presented to `docker push`.
   */
  name?: string;
  /**
   * Output only. Stores timing information for pushing the specified image.
   */
  readonly pushTiming?: TimeSpan;
}

/**
 * Request to cancel an ongoing build.
 */
export interface CancelBuildRequest {
  /**
   * Required. ID of the build.
   */
  id?: string;
  /**
   * The name of the `Build` to cancel. Format:
   * `projects/{project}/locations/{location}/builds/{build}`
   */
  name?: string;
  /**
   * Required. ID of the project.
   */
  projectId?: string;
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Metadata for `CreateBitbucketServerConfig` operation.
 */
export interface CreateBitbucketServerConfigOperationMetadata {
  /**
   * The resource name of the BitbucketServerConfig to be created. Format:
   * `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`.
   */
  bitbucketServerConfig?: string;
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
}

function serializeCreateBitbucketServerConfigOperationMetadata(data: any): CreateBitbucketServerConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeCreateBitbucketServerConfigOperationMetadata(data: any): CreateBitbucketServerConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Request to connect a repository from a connected Bitbucket Server host.
 */
export interface CreateBitbucketServerConnectedRepositoryRequest {
  /**
   * Required. The Bitbucket Server repository to connect.
   */
  bitbucketServerConnectedRepository?: BitbucketServerConnectedRepository;
  /**
   * Required. The name of the `BitbucketServerConfig` that added connected
   * repository. Format:
   * `projects/{project}/locations/{location}/bitbucketServerConfigs/{config}`
   */
  parent?: string;
}

/**
 * Metadata for `CreateGithubEnterpriseConfig` operation.
 */
export interface CreateGitHubEnterpriseConfigOperationMetadata {
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
  /**
   * The resource name of the GitHubEnterprise to be created. Format:
   * `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`.
   */
  githubEnterpriseConfig?: string;
}

function serializeCreateGitHubEnterpriseConfigOperationMetadata(data: any): CreateGitHubEnterpriseConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeCreateGitHubEnterpriseConfigOperationMetadata(data: any): CreateGitHubEnterpriseConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata for `CreateGitLabConfig` operation.
 */
export interface CreateGitLabConfigOperationMetadata {
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
  /**
   * The resource name of the GitLabConfig to be created. Format:
   * `projects/{project}/locations/{location}/gitlabConfigs/{id}`.
   */
  gitlabConfig?: string;
}

function serializeCreateGitLabConfigOperationMetadata(data: any): CreateGitLabConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeCreateGitLabConfigOperationMetadata(data: any): CreateGitLabConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Request to connect a repository from a connected GitLab host.
 */
export interface CreateGitLabConnectedRepositoryRequest {
  /**
   * Required. The GitLab repository to connect.
   */
  gitlabConnectedRepository?: GitLabConnectedRepository;
  /**
   * Required. The name of the `GitLabConfig` that adds connected repository.
   * Format: `projects/{project}/locations/{location}/gitLabConfigs/{config}`
   */
  parent?: string;
}

/**
 * Metadata for the `CreateWorkerPool` operation.
 */
export interface CreateWorkerPoolOperationMetadata {
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
  /**
   * The resource name of the `WorkerPool` to create. Format:
   * `projects/{project}/locations/{location}/workerPools/{worker_pool}`.
   */
  workerPool?: string;
}

function serializeCreateWorkerPoolOperationMetadata(data: any): CreateWorkerPoolOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeCreateWorkerPoolOperationMetadata(data: any): CreateWorkerPoolOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata for `DeleteBitbucketServerConfig` operation.
 */
export interface DeleteBitbucketServerConfigOperationMetadata {
  /**
   * The resource name of the BitbucketServerConfig to be deleted. Format:
   * `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`.
   */
  bitbucketServerConfig?: string;
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
}

function serializeDeleteBitbucketServerConfigOperationMetadata(data: any): DeleteBitbucketServerConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeDeleteBitbucketServerConfigOperationMetadata(data: any): DeleteBitbucketServerConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata for `DeleteGitHubEnterpriseConfig` operation.
 */
export interface DeleteGitHubEnterpriseConfigOperationMetadata {
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
  /**
   * The resource name of the GitHubEnterprise to be deleted. Format:
   * `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`.
   */
  githubEnterpriseConfig?: string;
}

function serializeDeleteGitHubEnterpriseConfigOperationMetadata(data: any): DeleteGitHubEnterpriseConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeDeleteGitHubEnterpriseConfigOperationMetadata(data: any): DeleteGitHubEnterpriseConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata for `DeleteGitLabConfig` operation.
 */
export interface DeleteGitLabConfigOperationMetadata {
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
  /**
   * The resource name of the GitLabConfig to be created. Format:
   * `projects/{project}/locations/{location}/gitlabConfigs/{id}`.
   */
  gitlabConfig?: string;
}

function serializeDeleteGitLabConfigOperationMetadata(data: any): DeleteGitLabConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeDeleteGitLabConfigOperationMetadata(data: any): DeleteGitLabConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata for the `DeleteWorkerPool` operation.
 */
export interface DeleteWorkerPoolOperationMetadata {
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
  /**
   * The resource name of the `WorkerPool` being deleted. Format:
   * `projects/{project}/locations/{location}/workerPools/{worker_pool}`.
   */
  workerPool?: string;
}

function serializeDeleteWorkerPoolOperationMetadata(data: any): DeleteWorkerPoolOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeDeleteWorkerPoolOperationMetadata(data: any): DeleteWorkerPoolOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
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
 * A fatal problem encountered during the execution of the build.
 */
export interface FailureInfo {
  /**
   * Explains the failure issue in more detail using hard-coded text.
   */
  detail?: string;
  /**
   * The name of the failure.
   */
  type?:  | "FAILURE_TYPE_UNSPECIFIED" | "PUSH_FAILED" | "PUSH_IMAGE_NOT_FOUND" | "PUSH_NOT_AUTHORIZED" | "LOGGING_FAILURE" | "USER_BUILD_STEP" | "FETCH_SOURCE_FAILED";
}

/**
 * Container message for hashes of byte content of files, used in
 * SourceProvenance messages to verify integrity of source input to the build.
 */
export interface FileHashes {
  /**
   * Collection of file hashes.
   */
  fileHash?: Hash[];
}

function serializeFileHashes(data: any): FileHashes {
  return {
    ...data,
    fileHash: data["fileHash"] !== undefined ? data["fileHash"].map((item: any) => (serializeHash(item))) : undefined,
  };
}

function deserializeFileHashes(data: any): FileHashes {
  return {
    ...data,
    fileHash: data["fileHash"] !== undefined ? data["fileHash"].map((item: any) => (deserializeHash(item))) : undefined,
  };
}

/**
 * GitFileSource describes a file within a (possibly remote) code repository.
 */
export interface GitFileSource {
  /**
   * The full resource name of the bitbucket server config. Format:
   * `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`.
   */
  bitbucketServerConfig?: string;
  /**
   * The full resource name of the github enterprise config. Format:
   * `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`.
   * `projects/{project}/githubEnterpriseConfigs/{id}`.
   */
  githubEnterpriseConfig?: string;
  /**
   * The path of the file, with the repo root as the root of the path.
   */
  path?: string;
  /**
   * See RepoType above.
   */
  repoType?:  | "UNKNOWN" | "CLOUD_SOURCE_REPOSITORIES" | "GITHUB" | "BITBUCKET_SERVER" | "GITLAB";
  /**
   * The branch, tag, arbitrary ref, or SHA version of the repo to use when
   * resolving the filename (optional). This field respects the same
   * syntax/resolution as described here: https://git-scm.com/docs/gitrevisions
   * If unspecified, the revision from which the trigger invocation originated
   * is assumed to be the revision from which to read the specified path.
   */
  revision?: string;
  /**
   * The URI of the repo. Either uri or repository can be specified. If
   * unspecified, the repo from which the trigger invocation originated is
   * assumed to be the repo from which to read the specified path.
   */
  uri?: string;
}

/**
 * Additional options for CloudBuild#githubDotComWebhookReceive.
 */
export interface GithubDotComWebhookReceiveOptions {
  /**
   * For GitHub Enterprise webhooks, this key is used to associate the webhook
   * request with the GitHubEnterpriseConfig to use for validation.
   */
  webhookKey?: string;
}

/**
 * GitHubEnterpriseConfig represents a configuration for a GitHub Enterprise
 * server.
 */
export interface GitHubEnterpriseConfig {
  /**
   * Required. The GitHub app id of the Cloud Build app on the GitHub
   * Enterprise server.
   */
  appId?: bigint;
  /**
   * Output only. Time when the installation was associated with the project.
   */
  readonly createTime?: Date;
  /**
   * Name to display for this config.
   */
  displayName?: string;
  /**
   * The URL of the github enterprise host the configuration is for.
   */
  hostUrl?: string;
  /**
   * Optional. The full resource name for the GitHubEnterpriseConfig For
   * example:
   * "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}"
   */
  name?: string;
  /**
   * Optional. The network to be used when reaching out to the GitHub
   * Enterprise server. The VPC network must be enabled for private service
   * connection. This should be set if the GitHub Enterprise server is hosted
   * on-premises and not reachable by public internet. If this field is left
   * empty, no network peering will occur and calls to the GitHub Enterprise
   * server will be made over the public internet. Must be in the format
   * `projects/{project}/global/networks/{network}`, where {project} is a
   * project number or id and {network} is the name of a VPC network in the
   * project.
   */
  peeredNetwork?: string;
  /**
   * Names of secrets in Secret Manager.
   */
  secrets?: GitHubEnterpriseSecrets;
  /**
   * Optional. SSL certificate to use for requests to GitHub Enterprise.
   */
  sslCa?: string;
  /**
   * The key that should be attached to webhook calls to the ReceiveWebhook
   * endpoint.
   */
  webhookKey?: string;
}

function serializeGitHubEnterpriseConfig(data: any): GitHubEnterpriseConfig {
  return {
    ...data,
    appId: data["appId"] !== undefined ? String(data["appId"]) : undefined,
  };
}

function deserializeGitHubEnterpriseConfig(data: any): GitHubEnterpriseConfig {
  return {
    ...data,
    appId: data["appId"] !== undefined ? BigInt(data["appId"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * GitHubEnterpriseSecrets represents the names of all necessary secrets in
 * Secret Manager for a GitHub Enterprise server. Format is: projects//secrets/.
 */
export interface GitHubEnterpriseSecrets {
  /**
   * The resource name for the OAuth client ID secret in Secret Manager.
   */
  oauthClientIdName?: string;
  /**
   * The resource name for the OAuth client ID secret version in Secret
   * Manager.
   */
  oauthClientIdVersionName?: string;
  /**
   * The resource name for the OAuth secret in Secret Manager.
   */
  oauthSecretName?: string;
  /**
   * The resource name for the OAuth secret secret version in Secret Manager.
   */
  oauthSecretVersionName?: string;
  /**
   * The resource name for the private key secret.
   */
  privateKeyName?: string;
  /**
   * The resource name for the private key secret version.
   */
  privateKeyVersionName?: string;
  /**
   * The resource name for the webhook secret in Secret Manager.
   */
  webhookSecretName?: string;
  /**
   * The resource name for the webhook secret secret version in Secret Manager.
   */
  webhookSecretVersionName?: string;
}

/**
 * GitHubEventsConfig describes the configuration of a trigger that creates a
 * build whenever a GitHub event is received.
 */
export interface GitHubEventsConfig {
  /**
   * Optional. The resource name of the github enterprise config that should be
   * applied to this installation. For example:
   * "projects/{$project_id}/locations/{$location_id}/githubEnterpriseConfigs/{$config_id}"
   */
  enterpriseConfigResourceName?: string;
  /**
   * The installationID that emits the GitHub event.
   */
  installationId?: bigint;
  /**
   * Name of the repository. For example: The name for
   * https://github.com/googlecloudplatform/cloud-builders is "cloud-builders".
   */
  name?: string;
  /**
   * Owner of the repository. For example: The owner for
   * https://github.com/googlecloudplatform/cloud-builders is
   * "googlecloudplatform".
   */
  owner?: string;
  /**
   * filter to match changes in pull requests.
   */
  pullRequest?: PullRequestFilter;
  /**
   * filter to match changes in refs like branches, tags.
   */
  push?: PushFilter;
}

function serializeGitHubEventsConfig(data: any): GitHubEventsConfig {
  return {
    ...data,
    installationId: data["installationId"] !== undefined ? String(data["installationId"]) : undefined,
  };
}

function deserializeGitHubEventsConfig(data: any): GitHubEventsConfig {
  return {
    ...data,
    installationId: data["installationId"] !== undefined ? BigInt(data["installationId"]) : undefined,
  };
}

/**
 * GitLabConfig represents the configuration for a GitLab integration.
 */
export interface GitLabConfig {
  /**
   * Connected GitLab.com or GitLabEnterprise repositories for this config.
   */
  connectedRepositories?: GitLabRepositoryId[];
  /**
   * Output only. Time when the config was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. GitLabEnterprise config.
   */
  enterpriseConfig?: GitLabEnterpriseConfig;
  /**
   * The resource name for the config.
   */
  name?: string;
  /**
   * Required. Secret Manager secrets needed by the config.
   */
  secrets?: GitLabSecrets;
  /**
   * Username of the GitLab.com or GitLab Enterprise account Cloud Build will
   * use.
   */
  username?: string;
  /**
   * Output only. UUID included in webhook requests. The UUID is used to look
   * up the corresponding config.
   */
  readonly webhookKey?: string;
}

/**
 * GitLabConnectedRepository represents a GitLab connected repository request
 * response.
 */
export interface GitLabConnectedRepository {
  /**
   * The name of the `GitLabConfig` that added connected repository. Format:
   * `projects/{project}/locations/{location}/gitLabConfigs/{config}`
   */
  parent?: string;
  /**
   * The GitLab repositories to connect.
   */
  repo?: GitLabRepositoryId;
  /**
   * Output only. The status of the repo connection request.
   */
  readonly status?: Status;
}

/**
 * GitLabEnterpriseConfig represents the configuration for a GitLabEnterprise
 * integration.
 */
export interface GitLabEnterpriseConfig {
  /**
   * Immutable. The URI of the GitlabEnterprise host.
   */
  hostUri?: string;
  /**
   * The Service Directory configuration to be used when reaching out to the
   * GitLab Enterprise instance.
   */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /**
   * The SSL certificate to use in requests to GitLab Enterprise instances.
   */
  sslCa?: string;
}

/**
 * GitLabEventsConfig describes the configuration of a trigger that creates a
 * build whenever a GitLab event is received.
 */
export interface GitLabEventsConfig {
  /**
   * Output only. The GitLabConfig specified in the gitlab_config_resource
   * field.
   */
  readonly gitlabConfig?: GitLabConfig;
  /**
   * The GitLab config resource that this trigger config maps to.
   */
  gitlabConfigResource?: string;
  /**
   * Namespace of the GitLab project.
   */
  projectNamespace?: string;
  /**
   * Filter to match changes in pull requests.
   */
  pullRequest?: PullRequestFilter;
  /**
   * Filter to match changes in refs like branches, tags.
   */
  push?: PushFilter;
}

/**
 * Proto Representing a GitLabRepository
 */
export interface GitLabRepository {
  /**
   * Link to the browse repo page on the GitLab instance
   */
  browseUri?: string;
  /**
   * Description of the repository
   */
  description?: string;
  /**
   * Display name of the repository
   */
  displayName?: string;
  /**
   * The resource name of the repository
   */
  name?: string;
  /**
   * Identifier for a repository
   */
  repositoryId?: GitLabRepositoryId;
}

/**
 * GitLabRepositoryId identifies a specific repository hosted on GitLab.com or
 * GitLabEnterprise
 */
export interface GitLabRepositoryId {
  /**
   * Required. Identifier for the repository. example:
   * "namespace/project-slug", namespace is usually the username or group ID
   */
  id?: string;
  /**
   * Output only. The ID of the webhook that was created for receiving events
   * from this repo. We only create and manage a single webhook for each repo.
   */
  readonly webhookId?: number;
}

/**
 * GitLabSecrets represents the secrets in Secret Manager for a GitLab
 * integration.
 */
export interface GitLabSecrets {
  /**
   * Required. The resource name for the api access token’s secret version
   */
  apiAccessTokenVersion?: string;
  /**
   * Required. Immutable. API Key that will be attached to webhook requests
   * from GitLab to Cloud Build.
   */
  apiKeyVersion?: string;
  /**
   * Required. The resource name for the read access token’s secret version
   */
  readAccessTokenVersion?: string;
  /**
   * Required. Immutable. The resource name for the webhook secret’s secret
   * version. Once this field has been set, it cannot be changed. If you need to
   * change it, please create another GitLabConfig.
   */
  webhookSecretVersion?: string;
}

/**
 * GitRepoSource describes a repo and ref of a code repository.
 */
export interface GitRepoSource {
  /**
   * The full resource name of the bitbucket server config. Format:
   * `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`.
   */
  bitbucketServerConfig?: string;
  /**
   * The full resource name of the github enterprise config. Format:
   * `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`.
   * `projects/{project}/githubEnterpriseConfigs/{id}`.
   */
  githubEnterpriseConfig?: string;
  /**
   * The branch or tag to use. Must start with "refs/" (required).
   */
  ref?: string;
  /**
   * See RepoType below.
   */
  repoType?:  | "UNKNOWN" | "CLOUD_SOURCE_REPOSITORIES" | "GITHUB" | "BITBUCKET_SERVER" | "GITLAB";
  /**
   * The URI of the repo. Either uri or repository can be specified and is
   * required.
   */
  uri?: string;
}

/**
 * Container message for hash values.
 */
export interface Hash {
  /**
   * The type of hash that was performed.
   */
  type?:  | "NONE" | "SHA256" | "MD5";
  /**
   * The hash value.
   */
  value?: Uint8Array;
}

function serializeHash(data: any): Hash {
  return {
    ...data,
    value: data["value"] !== undefined ? encodeBase64(data["value"]) : undefined,
  };
}

function deserializeHash(data: any): Hash {
  return {
    ...data,
    value: data["value"] !== undefined ? decodeBase64(data["value"] as string) : undefined,
  };
}

/**
 * Message that represents an arbitrary HTTP body. It should only be used for
 * payload formats that can't be represented as JSON, such as raw binary or an
 * HTML page. This message can be used both in streaming and non-streaming API
 * methods in the request as well as the response. It can be used as a top-level
 * request field, which is convenient if one wants to extract parameters from
 * either the URL or HTTP template into the request fields and also want access
 * to the raw HTTP body. Example: message GetResourceRequest { // A unique
 * request id. string request_id = 1; // The raw HTTP body is bound to this
 * field. google.api.HttpBody http_body = 2; } service ResourceService { rpc
 * GetResource(GetResourceRequest) returns (google.api.HttpBody); rpc
 * UpdateResource(google.api.HttpBody) returns (google.protobuf.Empty); }
 * Example with streaming methods: service CaldavService { rpc
 * GetCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody);
 * rpc UpdateCalendar(stream google.api.HttpBody) returns (stream
 * google.api.HttpBody); } Use of this type only changes how the request and
 * response bodies are handled, all other features will continue to work
 * unchanged.
 */
export interface HttpBody {
  /**
   * The HTTP Content-Type header value specifying the content type of the
   * body.
   */
  contentType?: string;
  /**
   * The HTTP request/response body as raw binary.
   */
  data?: Uint8Array;
  /**
   * Application specific response metadata. Must be set in the first response
   * for streaming APIs.
   */
  extensions?: {
    [key: string]: any
  }[];
}

function serializeHttpBody(data: any): HttpBody {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializeHttpBody(data: any): HttpBody {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

/**
 * Pairs a set of secret environment variables mapped to encrypted values with
 * the Cloud KMS key to use to decrypt the value.
 */
export interface InlineSecret {
  /**
   * Map of environment variable name to its encrypted value. Secret
   * environment variables must be unique across all of a build's secrets, and
   * must be used by at least one build step. Values can be at most 64 KB in
   * size. There can be at most 100 secret values across all of a build's
   * secrets.
   */
  envMap?: {
    [key: string]: Uint8Array
  };
  /**
   * Resource name of Cloud KMS crypto key to decrypt the encrypted value. In
   * format: projects/*\/locations/*\/keyRings/*\/cryptoKeys/*
   */
  kmsKeyName?: string;
}

function serializeInlineSecret(data: any): InlineSecret {
  return {
    ...data,
    envMap: data["envMap"] !== undefined ? Object.fromEntries(Object.entries(data["envMap"]).map(([k, v]: [string, any]) => ([k, encodeBase64(v)]))) : undefined,
  };
}

function deserializeInlineSecret(data: any): InlineSecret {
  return {
    ...data,
    envMap: data["envMap"] !== undefined ? Object.fromEntries(Object.entries(data["envMap"]).map(([k, v]: [string, any]) => ([k, decodeBase64(v as string)]))) : undefined,
  };
}

/**
 * RPC response object returned by ListBitbucketServerConfigs RPC method.
 */
export interface ListBitbucketServerConfigsResponse {
  /**
   * A list of BitbucketServerConfigs
   */
  bitbucketServerConfigs?: BitbucketServerConfig[];
  /**
   * A token that can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeListBitbucketServerConfigsResponse(data: any): ListBitbucketServerConfigsResponse {
  return {
    ...data,
    bitbucketServerConfigs: data["bitbucketServerConfigs"] !== undefined ? data["bitbucketServerConfigs"].map((item: any) => (serializeBitbucketServerConfig(item))) : undefined,
  };
}

function deserializeListBitbucketServerConfigsResponse(data: any): ListBitbucketServerConfigsResponse {
  return {
    ...data,
    bitbucketServerConfigs: data["bitbucketServerConfigs"] !== undefined ? data["bitbucketServerConfigs"].map((item: any) => (deserializeBitbucketServerConfig(item))) : undefined,
  };
}

/**
 * RPC response object returned by the ListBitbucketServerRepositories RPC
 * method.
 */
export interface ListBitbucketServerRepositoriesResponse {
  /**
   * List of Bitbucket Server repositories.
   */
  bitbucketServerRepositories?: BitbucketServerRepository[];
  /**
   * A token that can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response including listed builds.
 */
export interface ListBuildsResponse {
  /**
   * Builds will be sorted by `create_time`, descending.
   */
  builds?: Build[];
  /**
   * Token to receive the next page of results. This will be absent if the end
   * of the response list has been reached.
   */
  nextPageToken?: string;
}

function serializeListBuildsResponse(data: any): ListBuildsResponse {
  return {
    ...data,
    builds: data["builds"] !== undefined ? data["builds"].map((item: any) => (serializeBuild(item))) : undefined,
  };
}

function deserializeListBuildsResponse(data: any): ListBuildsResponse {
  return {
    ...data,
    builds: data["builds"] !== undefined ? data["builds"].map((item: any) => (deserializeBuild(item))) : undefined,
  };
}

/**
 * Response containing existing `BuildTriggers`.
 */
export interface ListBuildTriggersResponse {
  /**
   * Token to receive the next page of results.
   */
  nextPageToken?: string;
  /**
   * `BuildTriggers` for the project, sorted by `create_time` descending.
   */
  triggers?: BuildTrigger[];
}

function serializeListBuildTriggersResponse(data: any): ListBuildTriggersResponse {
  return {
    ...data,
    triggers: data["triggers"] !== undefined ? data["triggers"].map((item: any) => (serializeBuildTrigger(item))) : undefined,
  };
}

function deserializeListBuildTriggersResponse(data: any): ListBuildTriggersResponse {
  return {
    ...data,
    triggers: data["triggers"] !== undefined ? data["triggers"].map((item: any) => (deserializeBuildTrigger(item))) : undefined,
  };
}

/**
 * RPC response object returned by ListGithubEnterpriseConfigs RPC method.
 */
export interface ListGithubEnterpriseConfigsResponse {
  /**
   * A list of GitHubEnterpriseConfigs
   */
  configs?: GitHubEnterpriseConfig[];
}

function serializeListGithubEnterpriseConfigsResponse(data: any): ListGithubEnterpriseConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (serializeGitHubEnterpriseConfig(item))) : undefined,
  };
}

function deserializeListGithubEnterpriseConfigsResponse(data: any): ListGithubEnterpriseConfigsResponse {
  return {
    ...data,
    configs: data["configs"] !== undefined ? data["configs"].map((item: any) => (deserializeGitHubEnterpriseConfig(item))) : undefined,
  };
}

/**
 * RPC response object returned by ListGitLabConfigs RPC method.
 */
export interface ListGitLabConfigsResponse {
  /**
   * A list of GitLabConfigs
   */
  gitlabConfigs?: GitLabConfig[];
  /**
   * A token that can be sent as `page_token` to retrieve the next page If this
   * field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * RPC response object returned by the ListGitLabRepositories RPC method.
 */
export interface ListGitLabRepositoriesResponse {
  /**
   * List of GitLab repositories
   */
  gitlabRepositories?: GitLabRepository[];
  /**
   * A token that can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response containing existing `WorkerPools`.
 */
export interface ListWorkerPoolsResponse {
  /**
   * Continuation token used to page through large result sets. Provide this
   * value in a subsequent ListWorkerPoolsRequest to return the next page of
   * results.
   */
  nextPageToken?: string;
  /**
   * `WorkerPools` for the specified project.
   */
  workerPools?: WorkerPool[];
}

function serializeListWorkerPoolsResponse(data: any): ListWorkerPoolsResponse {
  return {
    ...data,
    workerPools: data["workerPools"] !== undefined ? data["workerPools"].map((item: any) => (serializeWorkerPool(item))) : undefined,
  };
}

function deserializeListWorkerPoolsResponse(data: any): ListWorkerPoolsResponse {
  return {
    ...data,
    workerPools: data["workerPools"] !== undefined ? data["workerPools"].map((item: any) => (deserializeWorkerPool(item))) : undefined,
  };
}

/**
 * Additional options for CloudBuild#locationsRegionalWebhook.
 */
export interface LocationsRegionalWebhookOptions {
  /**
   * For GitHub Enterprise webhooks, this key is used to associate the webhook
   * request with the GitHubEnterpriseConfig to use for validation.
   */
  webhookKey?: string;
}

/**
 * A Maven artifact to upload to Artifact Registry upon successful completion
 * of all build steps.
 */
export interface MavenArtifact {
  /**
   * Maven `artifactId` value used when uploading the artifact to Artifact
   * Registry.
   */
  artifactId?: string;
  /**
   * Maven `groupId` value used when uploading the artifact to Artifact
   * Registry.
   */
  groupId?: string;
  /**
   * Path to an artifact in the build's workspace to be uploaded to Artifact
   * Registry. This can be either an absolute path, e.g.
   * /workspace/my-app/target/my-app-1.0.SNAPSHOT.jar or a relative path from
   * /workspace, e.g. my-app/target/my-app-1.0.SNAPSHOT.jar.
   */
  path?: string;
  /**
   * Artifact Registry repository, in the form
   * "https://$REGION-maven.pkg.dev/$PROJECT/$REPOSITORY" Artifact in the
   * workspace specified by path will be uploaded to Artifact Registry with this
   * location as a prefix.
   */
  repository?: string;
  /**
   * Maven `version` value used when uploading the artifact to Artifact
   * Registry.
   */
  version?: string;
}

/**
 * Defines the network configuration for the pool.
 */
export interface NetworkConfig {
  /**
   * Option to configure network egress for the workers.
   */
  egressOption?:  | "EGRESS_OPTION_UNSPECIFIED" | "NO_PUBLIC_EGRESS" | "PUBLIC_EGRESS";
  /**
   * Required. Immutable. The network definition that the workers are peered
   * to. If this section is left empty, the workers will be peered to
   * `WorkerPool.project_id` on the service producer network. Must be in the
   * format `projects/{project}/global/networks/{network}`, where `{project}` is
   * a project number, such as `12345`, and `{network}` is the name of a VPC
   * network in the project. See [Understanding network configuration
   * options](https://cloud.google.com/build/docs/private-pools/set-up-private-pool-environment)
   */
  peeredNetwork?: string;
  /**
   * Immutable. Subnet IP range within the peered network. This is specified in
   * CIDR notation with a slash and the subnet prefix size. You can optionally
   * specify an IP address before the subnet prefix value. e.g. `192.168.0.0/29`
   * would specify an IP range starting at 192.168.0.0 with a prefix size of 29
   * bits. `/16` would specify a prefix size of 16 bits, with an automatically
   * determined IP within the peered VPC. If unspecified, a value of `/24` will
   * be used.
   */
  peeredNetworkIpRange?: string;
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
 * Details about how a build should be executed on a `WorkerPool`. See [running
 * builds in a private
 * pool](https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool)
 * for more information.
 */
export interface PoolOption {
  /**
   * The `WorkerPool` resource to execute the build on. You must have
   * `cloudbuild.workerpools.use` on the project hosting the WorkerPool. Format
   * projects/{project}/locations/{location}/workerPools/{workerPoolId}
   */
  name?: string;
}

/**
 * Configuration for a V1 `PrivatePool`.
 */
export interface PrivatePoolV1Config {
  /**
   * Network configuration for the pool.
   */
  networkConfig?: NetworkConfig;
  /**
   * Machine configuration for the workers in the pool.
   */
  workerConfig?: WorkerConfig;
}

function serializePrivatePoolV1Config(data: any): PrivatePoolV1Config {
  return {
    ...data,
    workerConfig: data["workerConfig"] !== undefined ? serializeWorkerConfig(data["workerConfig"]) : undefined,
  };
}

function deserializePrivatePoolV1Config(data: any): PrivatePoolV1Config {
  return {
    ...data,
    workerConfig: data["workerConfig"] !== undefined ? deserializeWorkerConfig(data["workerConfig"]) : undefined,
  };
}

/**
 * Metadata for `ProcessAppManifestCallback` operation.
 */
export interface ProcessAppManifestCallbackOperationMetadata {
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
  /**
   * The resource name of the GitHubEnterprise to be created. Format:
   * `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`.
   */
  githubEnterpriseConfig?: string;
}

function serializeProcessAppManifestCallbackOperationMetadata(data: any): ProcessAppManifestCallbackOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeProcessAppManifestCallbackOperationMetadata(data: any): ProcessAppManifestCallbackOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Additional options for CloudBuild#projectsBuildsCreate.
 */
export interface ProjectsBuildsCreateOptions {
  /**
   * The parent resource where this build will be created. Format:
   * `projects/{project}/locations/{location}`
   */
  parent?: string;
}

/**
 * Additional options for CloudBuild#projectsBuildsGet.
 */
export interface ProjectsBuildsGetOptions {
  /**
   * The name of the `Build` to retrieve. Format:
   * `projects/{project}/locations/{location}/builds/{build}`
   */
  name?: string;
}

/**
 * Additional options for CloudBuild#projectsBuildsList.
 */
export interface ProjectsBuildsListOptions {
  /**
   * The raw filter text to constrain the results.
   */
  filter?: string;
  /**
   * Number of results to return in the list.
   */
  pageSize?: number;
  /**
   * The page token for the next page of Builds. If unspecified, the first page
   * of results is returned. If the token is rejected for any reason,
   * INVALID_ARGUMENT will be thrown. In this case, the token should be
   * discarded, and pagination should be restarted from the first page of
   * results. See https://google.aip.dev/158 for more.
   */
  pageToken?: string;
  /**
   * The parent of the collection of `Builds`. Format:
   * `projects/{project}/locations/{location}`
   */
  parent?: string;
}

/**
 * Additional options for CloudBuild#projectsGithubEnterpriseConfigsCreate.
 */
export interface ProjectsGithubEnterpriseConfigsCreateOptions {
  /**
   * Optional. The ID to use for the GithubEnterpriseConfig, which will become
   * the final component of the GithubEnterpriseConfig's resource name.
   * ghe_config_id must meet the following requirements: + They must contain
   * only alphanumeric characters and dashes. + They can be 1-64 characters
   * long. + They must begin and end with an alphanumeric character
   */
  gheConfigId?: string;
  /**
   * ID of the project.
   */
  projectId?: string;
}

/**
 * Additional options for CloudBuild#projectsGithubEnterpriseConfigsDelete.
 */
export interface ProjectsGithubEnterpriseConfigsDeleteOptions {
  /**
   * Unique identifier of the `GitHubEnterpriseConfig`
   */
  configId?: string;
  /**
   * ID of the project
   */
  projectId?: string;
}

/**
 * Additional options for CloudBuild#projectsGithubEnterpriseConfigsGet.
 */
export interface ProjectsGithubEnterpriseConfigsGetOptions {
  /**
   * Unique identifier of the `GitHubEnterpriseConfig`
   */
  configId?: string;
  /**
   * ID of the project
   */
  projectId?: string;
}

/**
 * Additional options for CloudBuild#projectsGithubEnterpriseConfigsList.
 */
export interface ProjectsGithubEnterpriseConfigsListOptions {
  /**
   * ID of the project
   */
  projectId?: string;
}

/**
 * Additional options for CloudBuild#projectsGithubEnterpriseConfigsPatch.
 */
export interface ProjectsGithubEnterpriseConfigsPatchOptions {
  /**
   * Update mask for the resource. If this is set, the server will only update
   * the fields specified in the field mask. Otherwise, a full update of the
   * mutable resource fields will be performed.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsGithubEnterpriseConfigsPatchOptions(data: any): ProjectsGithubEnterpriseConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsGithubEnterpriseConfigsPatchOptions(data: any): ProjectsGithubEnterpriseConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * CloudBuild#projectsLocationsBitbucketServerConfigsCreate.
 */
export interface ProjectsLocationsBitbucketServerConfigsCreateOptions {
  /**
   * Optional. The ID to use for the BitbucketServerConfig, which will become
   * the final component of the BitbucketServerConfig's resource name.
   * bitbucket_server_config_id must meet the following requirements: + They
   * must contain only alphanumeric characters and dashes. + They can be 1-64
   * characters long. + They must begin and end with an alphanumeric character.
   */
  bitbucketServerConfigId?: string;
}

/**
 * Additional options for
 * CloudBuild#projectsLocationsBitbucketServerConfigsList.
 */
export interface ProjectsLocationsBitbucketServerConfigsListOptions {
  /**
   * The maximum number of configs to return. The service may return fewer than
   * this value. If unspecified, at most 50 configs will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListBitbucketServerConfigsRequest`
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to `ListBitbucketServerConfigsRequest` must match
   * the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * CloudBuild#projectsLocationsBitbucketServerConfigsPatch.
 */
export interface ProjectsLocationsBitbucketServerConfigsPatchOptions {
  /**
   * Update mask for the resource. If this is set, the server will only update
   * the fields specified in the field mask. Otherwise, a full update of the
   * mutable resource fields will be performed.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsBitbucketServerConfigsPatchOptions(data: any): ProjectsLocationsBitbucketServerConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsBitbucketServerConfigsPatchOptions(data: any): ProjectsLocationsBitbucketServerConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * CloudBuild#projectsLocationsBitbucketServerConfigsReposList.
 */
export interface ProjectsLocationsBitbucketServerConfigsReposListOptions {
  /**
   * The maximum number of configs to return. The service may return fewer than
   * this value. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous
   * `ListBitbucketServerRepositoriesRequest` call. Provide this to retrieve the
   * subsequent page. When paginating, all other parameters provided to
   * `ListBitbucketServerConfigsRequest` must match the call that provided the
   * page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsBuildsCreate.
 */
export interface ProjectsLocationsBuildsCreateOptions {
  /**
   * Required. ID of the project.
   */
  projectId?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsBuildsGet.
 */
export interface ProjectsLocationsBuildsGetOptions {
  /**
   * Required. ID of the build.
   */
  id?: string;
  /**
   * Required. ID of the project.
   */
  projectId?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsBuildsList.
 */
export interface ProjectsLocationsBuildsListOptions {
  /**
   * The raw filter text to constrain the results.
   */
  filter?: string;
  /**
   * Number of results to return in the list.
   */
  pageSize?: number;
  /**
   * The page token for the next page of Builds. If unspecified, the first page
   * of results is returned. If the token is rejected for any reason,
   * INVALID_ARGUMENT will be thrown. In this case, the token should be
   * discarded, and pagination should be restarted from the first page of
   * results. See https://google.aip.dev/158 for more.
   */
  pageToken?: string;
  /**
   * Required. ID of the project.
   */
  projectId?: string;
}

/**
 * Additional options for
 * CloudBuild#projectsLocationsGithubEnterpriseConfigsCreate.
 */
export interface ProjectsLocationsGithubEnterpriseConfigsCreateOptions {
  /**
   * Optional. The ID to use for the GithubEnterpriseConfig, which will become
   * the final component of the GithubEnterpriseConfig's resource name.
   * ghe_config_id must meet the following requirements: + They must contain
   * only alphanumeric characters and dashes. + They can be 1-64 characters
   * long. + They must begin and end with an alphanumeric character
   */
  gheConfigId?: string;
  /**
   * ID of the project.
   */
  projectId?: string;
}

/**
 * Additional options for
 * CloudBuild#projectsLocationsGithubEnterpriseConfigsDelete.
 */
export interface ProjectsLocationsGithubEnterpriseConfigsDeleteOptions {
  /**
   * Unique identifier of the `GitHubEnterpriseConfig`
   */
  configId?: string;
  /**
   * ID of the project
   */
  projectId?: string;
}

/**
 * Additional options for
 * CloudBuild#projectsLocationsGithubEnterpriseConfigsGet.
 */
export interface ProjectsLocationsGithubEnterpriseConfigsGetOptions {
  /**
   * Unique identifier of the `GitHubEnterpriseConfig`
   */
  configId?: string;
  /**
   * ID of the project
   */
  projectId?: string;
}

/**
 * Additional options for
 * CloudBuild#projectsLocationsGithubEnterpriseConfigsList.
 */
export interface ProjectsLocationsGithubEnterpriseConfigsListOptions {
  /**
   * ID of the project
   */
  projectId?: string;
}

/**
 * Additional options for
 * CloudBuild#projectsLocationsGithubEnterpriseConfigsPatch.
 */
export interface ProjectsLocationsGithubEnterpriseConfigsPatchOptions {
  /**
   * Update mask for the resource. If this is set, the server will only update
   * the fields specified in the field mask. Otherwise, a full update of the
   * mutable resource fields will be performed.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsGithubEnterpriseConfigsPatchOptions(data: any): ProjectsLocationsGithubEnterpriseConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsGithubEnterpriseConfigsPatchOptions(data: any): ProjectsLocationsGithubEnterpriseConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudBuild#projectsLocationsGitLabConfigsCreate.
 */
export interface ProjectsLocationsGitLabConfigsCreateOptions {
  /**
   * Optional. The ID to use for the GitLabConfig, which will become the final
   * component of the GitLabConfig’s resource name. gitlab_config_id must meet
   * the following requirements: + They must contain only alphanumeric
   * characters and dashes. + They can be 1-64 characters long. + They must
   * begin and end with an alphanumeric character
   */
  gitlabConfigId?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsGitLabConfigsList.
 */
export interface ProjectsLocationsGitLabConfigsListOptions {
  /**
   * The maximum number of configs to return. The service may return fewer than
   * this value. If unspecified, at most 50 configs will be returned. The
   * maximum value is 1000;, values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous ‘ListGitlabConfigsRequest’ call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to ‘ListGitlabConfigsRequest’ must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsGitLabConfigsPatch.
 */
export interface ProjectsLocationsGitLabConfigsPatchOptions {
  /**
   * Update mask for the resource. If this is set, the server will only update
   * the fields specified in the field mask. Otherwise, a full update of the
   * mutable resource fields will be performed.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsGitLabConfigsPatchOptions(data: any): ProjectsLocationsGitLabConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsGitLabConfigsPatchOptions(data: any): ProjectsLocationsGitLabConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudBuild#projectsLocationsGitLabConfigsReposList.
 */
export interface ProjectsLocationsGitLabConfigsReposListOptions {
  /**
   * The maximum number of repositories to return. The service may return fewer
   * than this value.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous ListGitLabRepositoriesRequest`
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to `ListGitLabRepositoriesRequest` must match the
   * call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsTriggersCreate.
 */
export interface ProjectsLocationsTriggersCreateOptions {
  /**
   * Required. ID of the project for which to configure automatic builds.
   */
  projectId?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsTriggersDelete.
 */
export interface ProjectsLocationsTriggersDeleteOptions {
  /**
   * Required. ID of the project that owns the trigger.
   */
  projectId?: string;
  /**
   * Required. ID of the `BuildTrigger` to delete.
   */
  triggerId?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsTriggersGet.
 */
export interface ProjectsLocationsTriggersGetOptions {
  /**
   * Required. ID of the project that owns the trigger.
   */
  projectId?: string;
  /**
   * Required. Identifier (`id` or `name`) of the `BuildTrigger` to get.
   */
  triggerId?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsTriggersList.
 */
export interface ProjectsLocationsTriggersListOptions {
  /**
   * Number of results to return in the list.
   */
  pageSize?: number;
  /**
   * Token to provide to skip to a particular spot in the list.
   */
  pageToken?: string;
  /**
   * Required. ID of the project for which to list BuildTriggers.
   */
  projectId?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsTriggersPatch.
 */
export interface ProjectsLocationsTriggersPatchOptions {
  /**
   * Required. ID of the project that owns the trigger.
   */
  projectId?: string;
  /**
   * Required. ID of the `BuildTrigger` to update.
   */
  triggerId?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsTriggersWebhook.
 */
export interface ProjectsLocationsTriggersWebhookOptions {
  /**
   * Project in which the specified trigger lives
   */
  projectId?: string;
  /**
   * Secret token used for authorization if an OAuth token isn't provided.
   */
  secret?: string;
  /**
   * Name of the trigger to run the payload against
   */
  trigger?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsWorkerPoolsCreate.
 */
export interface ProjectsLocationsWorkerPoolsCreateOptions {
  /**
   * If set, validate the request and preview the response, but do not actually
   * post it.
   */
  validateOnly?: boolean;
  /**
   * Required. Immutable. The ID to use for the `WorkerPool`, which will become
   * the final component of the resource name. This value should be 1-63
   * characters, and valid characters are /a-z-/.
   */
  workerPoolId?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsWorkerPoolsDelete.
 */
export interface ProjectsLocationsWorkerPoolsDeleteOptions {
  /**
   * If set to true, and the `WorkerPool` is not found, the request will
   * succeed but no action will be taken on the server.
   */
  allowMissing?: boolean;
  /**
   * Optional. If provided, it must match the server's etag on the workerpool
   * for the request to be processed.
   */
  etag?: string;
  /**
   * If set, validate the request and preview the response, but do not actually
   * post it.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for CloudBuild#projectsLocationsWorkerPoolsList.
 */
export interface ProjectsLocationsWorkerPoolsListOptions {
  /**
   * The maximum number of `WorkerPool`s to return. The service may return
   * fewer than this value. If omitted, the server will use a sensible default.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListWorkerPools` call. Provide
   * this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudBuild#projectsLocationsWorkerPoolsPatch.
 */
export interface ProjectsLocationsWorkerPoolsPatchOptions {
  /**
   * A mask specifying which fields in `worker_pool` to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * If set, validate the request and preview the response, but do not actually
   * post it.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsWorkerPoolsPatchOptions(data: any): ProjectsLocationsWorkerPoolsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsWorkerPoolsPatchOptions(data: any): ProjectsLocationsWorkerPoolsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudBuild#projectsTriggersCreate.
 */
export interface ProjectsTriggersCreateOptions {
  /**
   * The parent resource where this trigger will be created. Format:
   * `projects/{project}/locations/{location}`
   */
  parent?: string;
}

/**
 * Additional options for CloudBuild#projectsTriggersDelete.
 */
export interface ProjectsTriggersDeleteOptions {
  /**
   * The name of the `Trigger` to delete. Format:
   * `projects/{project}/locations/{location}/triggers/{trigger}`
   */
  name?: string;
}

/**
 * Additional options for CloudBuild#projectsTriggersGet.
 */
export interface ProjectsTriggersGetOptions {
  /**
   * The name of the `Trigger` to retrieve. Format:
   * `projects/{project}/locations/{location}/triggers/{trigger}`
   */
  name?: string;
}

/**
 * Additional options for CloudBuild#projectsTriggersList.
 */
export interface ProjectsTriggersListOptions {
  /**
   * Number of results to return in the list.
   */
  pageSize?: number;
  /**
   * Token to provide to skip to a particular spot in the list.
   */
  pageToken?: string;
  /**
   * The parent of the collection of `Triggers`. Format:
   * `projects/{project}/locations/{location}`
   */
  parent?: string;
}

/**
 * Additional options for CloudBuild#projectsTriggersRun.
 */
export interface ProjectsTriggersRunOptions {
  /**
   * The name of the `Trigger` to run. Format:
   * `projects/{project}/locations/{location}/triggers/{trigger}`
   */
  name?: string;
}

/**
 * Additional options for CloudBuild#projectsTriggersWebhook.
 */
export interface ProjectsTriggersWebhookOptions {
  /**
   * The name of the `ReceiveTriggerWebhook` to retrieve. Format:
   * `projects/{project}/locations/{location}/triggers/{trigger}`
   */
  name?: string;
  /**
   * Secret token used for authorization if an OAuth token isn't provided.
   */
  secret?: string;
}

/**
 * PubsubConfig describes the configuration of a trigger that creates a build
 * whenever a Pub/Sub message is published.
 */
export interface PubsubConfig {
  /**
   * Service account that will make the push request.
   */
  serviceAccountEmail?: string;
  /**
   * Potential issues with the underlying Pub/Sub subscription configuration.
   * Only populated on get requests.
   */
  state?:  | "STATE_UNSPECIFIED" | "OK" | "SUBSCRIPTION_DELETED" | "TOPIC_DELETED" | "SUBSCRIPTION_MISCONFIGURED";
  /**
   * Output only. Name of the subscription. Format is
   * `projects/{project}/subscriptions/{subscription}`.
   */
  readonly subscription?: string;
  /**
   * The name of the topic from which this subscription is receiving messages.
   * Format is `projects/{project}/topics/{topic}`.
   */
  topic?: string;
}

/**
 * PullRequestFilter contains filter properties for matching GitHub Pull
 * Requests.
 */
export interface PullRequestFilter {
  /**
   * Regex of branches to match. The syntax of the regular expressions accepted
   * is the syntax accepted by RE2 and described at
   * https://github.com/google/re2/wiki/Syntax
   */
  branch?: string;
  /**
   * Configure builds to run whether a repository owner or collaborator need to
   * comment `/gcbrun`.
   */
  commentControl?:  | "COMMENTS_DISABLED" | "COMMENTS_ENABLED" | "COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY";
  /**
   * If true, branches that do NOT match the git_ref will trigger a build.
   */
  invertRegex?: boolean;
}

/**
 * Push contains filter properties for matching GitHub git pushes.
 */
export interface PushFilter {
  /**
   * Regexes matching branches to build. The syntax of the regular expressions
   * accepted is the syntax accepted by RE2 and described at
   * https://github.com/google/re2/wiki/Syntax
   */
  branch?: string;
  /**
   * When true, only trigger a build if the revision regex does NOT match the
   * git_ref regex.
   */
  invertRegex?: boolean;
  /**
   * Regexes matching tags to build. The syntax of the regular expressions
   * accepted is the syntax accepted by RE2 and described at
   * https://github.com/google/re2/wiki/Syntax
   */
  tag?: string;
}

/**
 * Python package to upload to Artifact Registry upon successful completion of
 * all build steps. A package can encapsulate multiple objects to be uploaded to
 * a single repository.
 */
export interface PythonPackage {
  /**
   * Path globs used to match files in the build's workspace. For Python/
   * Twine, this is usually `dist/*`, and sometimes additionally an `.asc` file.
   */
  paths?: string[];
  /**
   * Artifact Registry repository, in the form
   * "https://$REGION-python.pkg.dev/$PROJECT/$REPOSITORY" Files in the
   * workspace matching any path pattern will be uploaded to Artifact Registry
   * with this location as a prefix.
   */
  repository?: string;
}

/**
 * ReceiveTriggerWebhookResponse [Experimental] is the response object for the
 * ReceiveTriggerWebhook method.
 */
export interface ReceiveTriggerWebhookResponse {
}

/**
 * RPC request object accepted by RemoveBitbucketServerConnectedRepository RPC
 * method.
 */
export interface RemoveBitbucketServerConnectedRepositoryRequest {
  /**
   * The connected repository to remove.
   */
  connectedRepository?: BitbucketServerRepositoryId;
}

/**
 * RPC request object accepted by RemoveGitLabConnectedRepository RPC method.
 */
export interface RemoveGitLabConnectedRepositoryRequest {
  /**
   * The connected repository to remove.
   */
  connectedRepository?: GitLabRepositoryId;
}

/**
 * The configuration of a trigger that creates a build whenever an event from
 * Repo API is received.
 */
export interface RepositoryEventConfig {
  /**
   * Filter to match changes in pull requests.
   */
  pullRequest?: PullRequestFilter;
  /**
   * Filter to match changes in refs like branches, tags.
   */
  push?: PushFilter;
  /**
   * The resource name of the Repo API resource.
   */
  repository?: string;
  /**
   * Output only. The type of the SCM vendor the repository points to.
   */
  readonly repositoryType?:  | "REPOSITORY_TYPE_UNSPECIFIED" | "GITHUB" | "GITHUB_ENTERPRISE" | "GITLAB_ENTERPRISE";
}

/**
 * Location of the source in a Google Cloud Source Repository.
 */
export interface RepoSource {
  /**
   * Regex matching branches to build. The syntax of the regular expressions
   * accepted is the syntax accepted by RE2 and described at
   * https://github.com/google/re2/wiki/Syntax
   */
  branchName?: string;
  /**
   * Explicit commit SHA to build.
   */
  commitSha?: string;
  /**
   * Directory, relative to the source root, in which to run the build. This
   * must be a relative path. If a step's `dir` is specified and is an absolute
   * path, this value is ignored for that step's execution.
   */
  dir?: string;
  /**
   * Only trigger a build if the revision regex does NOT match the revision
   * regex.
   */
  invertRegex?: boolean;
  /**
   * ID of the project that owns the Cloud Source Repository. If omitted, the
   * project ID requesting the build is assumed.
   */
  projectId?: string;
  /**
   * Name of the Cloud Source Repository.
   */
  repoName?: string;
  /**
   * Substitutions to use in a triggered build. Should only be used with
   * RunBuildTrigger
   */
  substitutions?: {
    [key: string]: string
  };
  /**
   * Regex matching tags to build. The syntax of the regular expressions
   * accepted is the syntax accepted by RE2 and described at
   * https://github.com/google/re2/wiki/Syntax
   */
  tagName?: string;
}

/**
 * Artifacts created by the build pipeline.
 */
export interface Results {
  /**
   * Path to the artifact manifest for non-container artifacts uploaded to
   * Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage.
   */
  artifactManifest?: string;
  /**
   * Time to push all non-container artifacts to Cloud Storage.
   */
  artifactTiming?: TimeSpan;
  /**
   * List of build step digests, in the order corresponding to build step
   * indices.
   */
  buildStepImages?: string[];
  /**
   * List of build step outputs, produced by builder images, in the order
   * corresponding to build step indices. [Cloud
   * Builders](https://cloud.google.com/cloud-build/docs/cloud-builders) can
   * produce this output by writing to `$BUILDER_OUTPUT/output`. Only the first
   * 4KB of data is stored.
   */
  buildStepOutputs?: Uint8Array[];
  /**
   * Container images that were built as a part of the build.
   */
  images?: BuiltImage[];
  /**
   * Maven artifacts uploaded to Artifact Registry at the end of the build.
   */
  mavenArtifacts?: UploadedMavenArtifact[];
  /**
   * Number of non-container artifacts uploaded to Cloud Storage. Only
   * populated when artifacts are uploaded to Cloud Storage.
   */
  numArtifacts?: bigint;
  /**
   * Python artifacts uploaded to Artifact Registry at the end of the build.
   */
  pythonPackages?: UploadedPythonPackage[];
}

function serializeResults(data: any): Results {
  return {
    ...data,
    artifactTiming: data["artifactTiming"] !== undefined ? serializeTimeSpan(data["artifactTiming"]) : undefined,
    buildStepOutputs: data["buildStepOutputs"] !== undefined ? data["buildStepOutputs"].map((item: any) => (encodeBase64(item))) : undefined,
    mavenArtifacts: data["mavenArtifacts"] !== undefined ? data["mavenArtifacts"].map((item: any) => (serializeUploadedMavenArtifact(item))) : undefined,
    numArtifacts: data["numArtifacts"] !== undefined ? String(data["numArtifacts"]) : undefined,
    pythonPackages: data["pythonPackages"] !== undefined ? data["pythonPackages"].map((item: any) => (serializeUploadedPythonPackage(item))) : undefined,
  };
}

function deserializeResults(data: any): Results {
  return {
    ...data,
    artifactTiming: data["artifactTiming"] !== undefined ? deserializeTimeSpan(data["artifactTiming"]) : undefined,
    buildStepOutputs: data["buildStepOutputs"] !== undefined ? data["buildStepOutputs"].map((item: any) => (decodeBase64(item as string))) : undefined,
    mavenArtifacts: data["mavenArtifacts"] !== undefined ? data["mavenArtifacts"].map((item: any) => (deserializeUploadedMavenArtifact(item))) : undefined,
    numArtifacts: data["numArtifacts"] !== undefined ? BigInt(data["numArtifacts"]) : undefined,
    pythonPackages: data["pythonPackages"] !== undefined ? data["pythonPackages"].map((item: any) => (deserializeUploadedPythonPackage(item))) : undefined,
  };
}

/**
 * Specifies a build to retry.
 */
export interface RetryBuildRequest {
  /**
   * Required. Build ID of the original build.
   */
  id?: string;
  /**
   * The name of the `Build` to retry. Format:
   * `projects/{project}/locations/{location}/builds/{build}`
   */
  name?: string;
  /**
   * Required. ID of the project.
   */
  projectId?: string;
}

/**
 * Specifies a build trigger to run and the source to use.
 */
export interface RunBuildTriggerRequest {
  /**
   * Required. ID of the project.
   */
  projectId?: string;
  /**
   * Source to build against this trigger. Branch and tag names cannot consist
   * of regular expressions.
   */
  source?: RepoSource;
  /**
   * Required. ID of the trigger.
   */
  triggerId?: string;
}

/**
 * Pairs a set of secret environment variables containing encrypted values with
 * the Cloud KMS key to use to decrypt the value. Note: Use `kmsKeyName` with
 * `available_secrets` instead of using `kmsKeyName` with `secret`. For
 * instructions see:
 * https://cloud.google.com/cloud-build/docs/securing-builds/use-encrypted-credentials.
 */
export interface Secret {
  /**
   * Cloud KMS key name to use to decrypt these envs.
   */
  kmsKeyName?: string;
  /**
   * Map of environment variable name to its encrypted value. Secret
   * environment variables must be unique across all of a build's secrets, and
   * must be used by at least one build step. Values can be at most 64 KB in
   * size. There can be at most 100 secret values across all of a build's
   * secrets.
   */
  secretEnv?: {
    [key: string]: Uint8Array
  };
}

function serializeSecret(data: any): Secret {
  return {
    ...data,
    secretEnv: data["secretEnv"] !== undefined ? Object.fromEntries(Object.entries(data["secretEnv"]).map(([k, v]: [string, any]) => ([k, encodeBase64(v)]))) : undefined,
  };
}

function deserializeSecret(data: any): Secret {
  return {
    ...data,
    secretEnv: data["secretEnv"] !== undefined ? Object.fromEntries(Object.entries(data["secretEnv"]).map(([k, v]: [string, any]) => ([k, decodeBase64(v as string)]))) : undefined,
  };
}

/**
 * Pairs a secret environment variable with a SecretVersion in Secret Manager.
 */
export interface SecretManagerSecret {
  /**
   * Environment variable name to associate with the secret. Secret environment
   * variables must be unique across all of a build's secrets, and must be used
   * by at least one build step.
   */
  env?: string;
  /**
   * Resource name of the SecretVersion. In format:
   * projects/*\/secrets/*\/versions/*
   */
  versionName?: string;
}

/**
 * Secrets and secret environment variables.
 */
export interface Secrets {
  /**
   * Secrets encrypted with KMS key and the associated secret environment
   * variable.
   */
  inline?: InlineSecret[];
  /**
   * Secrets in Secret Manager and associated secret environment variable.
   */
  secretManager?: SecretManagerSecret[];
}

function serializeSecrets(data: any): Secrets {
  return {
    ...data,
    inline: data["inline"] !== undefined ? data["inline"].map((item: any) => (serializeInlineSecret(item))) : undefined,
  };
}

function deserializeSecrets(data: any): Secrets {
  return {
    ...data,
    inline: data["inline"] !== undefined ? data["inline"].map((item: any) => (deserializeInlineSecret(item))) : undefined,
  };
}

/**
 * ServiceDirectoryConfig represents Service Directory configuration for a SCM
 * host connection.
 */
export interface ServiceDirectoryConfig {
  /**
   * The Service Directory service name. Format:
   * projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}.
   */
  service?: string;
}

/**
 * Location of the source in a supported storage service.
 */
export interface Source {
  /**
   * If provided, get the source from this location in a Cloud Source
   * Repository.
   */
  repoSource?: RepoSource;
  /**
   * If provided, get the source from this location in Google Cloud Storage.
   */
  storageSource?: StorageSource;
  /**
   * If provided, get the source from this manifest in Google Cloud Storage.
   * This feature is in Preview; see description
   * [here](https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher).
   */
  storageSourceManifest?: StorageSourceManifest;
}

function serializeSource(data: any): Source {
  return {
    ...data,
    storageSource: data["storageSource"] !== undefined ? serializeStorageSource(data["storageSource"]) : undefined,
    storageSourceManifest: data["storageSourceManifest"] !== undefined ? serializeStorageSourceManifest(data["storageSourceManifest"]) : undefined,
  };
}

function deserializeSource(data: any): Source {
  return {
    ...data,
    storageSource: data["storageSource"] !== undefined ? deserializeStorageSource(data["storageSource"]) : undefined,
    storageSourceManifest: data["storageSourceManifest"] !== undefined ? deserializeStorageSourceManifest(data["storageSourceManifest"]) : undefined,
  };
}

/**
 * Provenance of the source. Ways to find the original source, or verify that
 * some source was used for this build.
 */
export interface SourceProvenance {
  /**
   * Output only. Hash(es) of the build source, which can be used to verify
   * that the original source integrity was maintained in the build. Note that
   * `FileHashes` will only be populated if `BuildOptions` has requested a
   * `SourceProvenanceHash`. The keys to this map are file paths used as build
   * source and the values contain the hash values for those files. If the build
   * source came in a single package such as a gzipped tarfile (`.tar.gz`), the
   * `FileHash` will be for the single path to that file.
   */
  readonly fileHashes?: {
    [key: string]: FileHashes
  };
  /**
   * A copy of the build's `source.repo_source`, if exists, with any revisions
   * resolved.
   */
  resolvedRepoSource?: RepoSource;
  /**
   * A copy of the build's `source.storage_source`, if exists, with any
   * generations resolved.
   */
  resolvedStorageSource?: StorageSource;
  /**
   * A copy of the build's `source.storage_source_manifest`, if exists, with
   * any revisions resolved. This feature is in Preview.
   */
  resolvedStorageSourceManifest?: StorageSourceManifest;
}

function serializeSourceProvenance(data: any): SourceProvenance {
  return {
    ...data,
    resolvedStorageSource: data["resolvedStorageSource"] !== undefined ? serializeStorageSource(data["resolvedStorageSource"]) : undefined,
    resolvedStorageSourceManifest: data["resolvedStorageSourceManifest"] !== undefined ? serializeStorageSourceManifest(data["resolvedStorageSourceManifest"]) : undefined,
  };
}

function deserializeSourceProvenance(data: any): SourceProvenance {
  return {
    ...data,
    fileHashes: data["fileHashes"] !== undefined ? Object.fromEntries(Object.entries(data["fileHashes"]).map(([k, v]: [string, any]) => ([k, deserializeFileHashes(v)]))) : undefined,
    resolvedStorageSource: data["resolvedStorageSource"] !== undefined ? deserializeStorageSource(data["resolvedStorageSource"]) : undefined,
    resolvedStorageSourceManifest: data["resolvedStorageSourceManifest"] !== undefined ? deserializeStorageSourceManifest(data["resolvedStorageSourceManifest"]) : undefined,
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
 * Location of the source in an archive file in Google Cloud Storage.
 */
export interface StorageSource {
  /**
   * Google Cloud Storage bucket containing the source (see [Bucket Name
   * Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).
   */
  bucket?: string;
  /**
   * Google Cloud Storage generation for the object. If the generation is
   * omitted, the latest generation will be used.
   */
  generation?: bigint;
  /**
   * Google Cloud Storage object containing the source. This object must be a
   * zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to
   * build.
   */
  object?: string;
}

function serializeStorageSource(data: any): StorageSource {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeStorageSource(data: any): StorageSource {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Location of the source manifest in Google Cloud Storage. This feature is in
 * Preview; see description
 * [here](https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher).
 */
export interface StorageSourceManifest {
  /**
   * Google Cloud Storage bucket containing the source manifest (see [Bucket
   * Name
   * Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).
   */
  bucket?: string;
  /**
   * Google Cloud Storage generation for the object. If the generation is
   * omitted, the latest generation will be used.
   */
  generation?: bigint;
  /**
   * Google Cloud Storage object containing the source manifest. This object
   * must be a JSON file.
   */
  object?: string;
}

function serializeStorageSourceManifest(data: any): StorageSourceManifest {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeStorageSourceManifest(data: any): StorageSourceManifest {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Start and end times for a build execution phase.
 */
export interface TimeSpan {
  /**
   * End of time span.
   */
  endTime?: Date;
  /**
   * Start of time span.
   */
  startTime?: Date;
}

function serializeTimeSpan(data: any): TimeSpan {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeTimeSpan(data: any): TimeSpan {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Metadata for `UpdateBitbucketServerConfig` operation.
 */
export interface UpdateBitbucketServerConfigOperationMetadata {
  /**
   * The resource name of the BitbucketServerConfig to be updated. Format:
   * `projects/{project}/locations/{location}/bitbucketServerConfigs/{id}`.
   */
  bitbucketServerConfig?: string;
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
}

function serializeUpdateBitbucketServerConfigOperationMetadata(data: any): UpdateBitbucketServerConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeUpdateBitbucketServerConfigOperationMetadata(data: any): UpdateBitbucketServerConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata for `UpdateGitHubEnterpriseConfig` operation.
 */
export interface UpdateGitHubEnterpriseConfigOperationMetadata {
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
  /**
   * The resource name of the GitHubEnterprise to be updated. Format:
   * `projects/{project}/locations/{location}/githubEnterpriseConfigs/{id}`.
   */
  githubEnterpriseConfig?: string;
}

function serializeUpdateGitHubEnterpriseConfigOperationMetadata(data: any): UpdateGitHubEnterpriseConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeUpdateGitHubEnterpriseConfigOperationMetadata(data: any): UpdateGitHubEnterpriseConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata for `UpdateGitLabConfig` operation.
 */
export interface UpdateGitLabConfigOperationMetadata {
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
  /**
   * The resource name of the GitLabConfig to be created. Format:
   * `projects/{project}/locations/{location}/gitlabConfigs/{id}`.
   */
  gitlabConfig?: string;
}

function serializeUpdateGitLabConfigOperationMetadata(data: any): UpdateGitLabConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeUpdateGitLabConfigOperationMetadata(data: any): UpdateGitLabConfigOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata for the `UpdateWorkerPool` operation.
 */
export interface UpdateWorkerPoolOperationMetadata {
  /**
   * Time the operation was completed.
   */
  completeTime?: Date;
  /**
   * Time the operation was created.
   */
  createTime?: Date;
  /**
   * The resource name of the `WorkerPool` being updated. Format:
   * `projects/{project}/locations/{location}/workerPools/{worker_pool}`.
   */
  workerPool?: string;
}

function serializeUpdateWorkerPoolOperationMetadata(data: any): UpdateWorkerPoolOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? data["completeTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeUpdateWorkerPoolOperationMetadata(data: any): UpdateWorkerPoolOperationMetadata {
  return {
    ...data,
    completeTime: data["completeTime"] !== undefined ? new Date(data["completeTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * A Maven artifact uploaded using the MavenArtifact directive.
 */
export interface UploadedMavenArtifact {
  /**
   * Hash types and values of the Maven Artifact.
   */
  fileHashes?: FileHashes;
  /**
   * Output only. Stores timing information for pushing the specified artifact.
   */
  readonly pushTiming?: TimeSpan;
  /**
   * URI of the uploaded artifact.
   */
  uri?: string;
}

function serializeUploadedMavenArtifact(data: any): UploadedMavenArtifact {
  return {
    ...data,
    fileHashes: data["fileHashes"] !== undefined ? serializeFileHashes(data["fileHashes"]) : undefined,
  };
}

function deserializeUploadedMavenArtifact(data: any): UploadedMavenArtifact {
  return {
    ...data,
    fileHashes: data["fileHashes"] !== undefined ? deserializeFileHashes(data["fileHashes"]) : undefined,
    pushTiming: data["pushTiming"] !== undefined ? deserializeTimeSpan(data["pushTiming"]) : undefined,
  };
}

/**
 * Artifact uploaded using the PythonPackage directive.
 */
export interface UploadedPythonPackage {
  /**
   * Hash types and values of the Python Artifact.
   */
  fileHashes?: FileHashes;
  /**
   * Output only. Stores timing information for pushing the specified artifact.
   */
  readonly pushTiming?: TimeSpan;
  /**
   * URI of the uploaded artifact.
   */
  uri?: string;
}

function serializeUploadedPythonPackage(data: any): UploadedPythonPackage {
  return {
    ...data,
    fileHashes: data["fileHashes"] !== undefined ? serializeFileHashes(data["fileHashes"]) : undefined,
  };
}

function deserializeUploadedPythonPackage(data: any): UploadedPythonPackage {
  return {
    ...data,
    fileHashes: data["fileHashes"] !== undefined ? deserializeFileHashes(data["fileHashes"]) : undefined,
    pushTiming: data["pushTiming"] !== undefined ? deserializeTimeSpan(data["pushTiming"]) : undefined,
  };
}

/**
 * Additional options for CloudBuild#v1Webhook.
 */
export interface V1WebhookOptions {
  /**
   * For GitHub Enterprise webhooks, this key is used to associate the webhook
   * request with the GitHubEnterpriseConfig to use for validation.
   */
  webhookKey?: string;
}

/**
 * Volume describes a Docker container volume which is mounted into build steps
 * in order to persist files across build step execution.
 */
export interface Volume {
  /**
   * Name of the volume to mount. Volume names must be unique per build step
   * and must be valid names for Docker volumes. Each named volume must be used
   * by at least two build steps.
   */
  name?: string;
  /**
   * Path at which to mount the volume. Paths must be absolute and cannot
   * conflict with other volume paths on the same build step or with certain
   * reserved volume paths.
   */
  path?: string;
}

/**
 * A non-fatal problem encountered during the execution of the build.
 */
export interface Warning {
  /**
   * The priority for this warning.
   */
  priority?:  | "PRIORITY_UNSPECIFIED" | "INFO" | "WARNING" | "ALERT";
  /**
   * Explanation of the warning generated.
   */
  text?: string;
}

/**
 * WebhookConfig describes the configuration of a trigger that creates a build
 * whenever a webhook is sent to a trigger's webhook URL.
 */
export interface WebhookConfig {
  /**
   * Required. Resource name for the secret required as a URL parameter.
   */
  secret?: string;
  /**
   * Potential issues with the underlying Pub/Sub subscription configuration.
   * Only populated on get requests.
   */
  state?:  | "STATE_UNSPECIFIED" | "OK" | "SECRET_DELETED";
}

/**
 * Defines the configuration to be used for creating workers in the pool.
 */
export interface WorkerConfig {
  /**
   * Size of the disk attached to the worker, in GB. See [Worker pool config
   * file](https://cloud.google.com/build/docs/private-pools/worker-pool-config-file-schema).
   * Specify a value of up to 2000. If `0` is specified, Cloud Build will use a
   * standard disk size.
   */
  diskSizeGb?: bigint;
  /**
   * Machine type of a worker, such as `e2-medium`. See [Worker pool config
   * file](https://cloud.google.com/build/docs/private-pools/worker-pool-config-file-schema).
   * If left blank, Cloud Build will use a sensible default.
   */
  machineType?: string;
}

function serializeWorkerConfig(data: any): WorkerConfig {
  return {
    ...data,
    diskSizeGb: data["diskSizeGb"] !== undefined ? String(data["diskSizeGb"]) : undefined,
  };
}

function deserializeWorkerConfig(data: any): WorkerConfig {
  return {
    ...data,
    diskSizeGb: data["diskSizeGb"] !== undefined ? BigInt(data["diskSizeGb"]) : undefined,
  };
}

/**
 * Configuration for a `WorkerPool`. Cloud Build owns and maintains a pool of
 * workers for general use and have no access to a project's private network. By
 * default, builds submitted to Cloud Build will use a worker from this pool. If
 * your build needs access to resources on a private network, create and use a
 * `WorkerPool` to run your builds. Private `WorkerPool`s give your builds
 * access to any single VPC network that you administer, including any on-prem
 * resources connected to that VPC network. For an overview of private pools,
 * see [Private pools
 * overview](https://cloud.google.com/build/docs/private-pools/private-pools-overview).
 */
export interface WorkerPool {
  /**
   * User specified annotations. See https://google.aip.dev/128#annotations for
   * more details such as format and size limitations.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. Time at which the request to create the `WorkerPool` was
   * received.
   */
  readonly createTime?: Date;
  /**
   * Output only. Time at which the request to delete the `WorkerPool` was
   * received.
   */
  readonly deleteTime?: Date;
  /**
   * A user-specified, human-readable name for the `WorkerPool`. If provided,
   * this value must be 1-63 characters.
   */
  displayName?: string;
  /**
   * Output only. Checksum computed by the server. May be sent on update and
   * delete requests to ensure that the client has an up-to-date value before
   * proceeding.
   */
  readonly etag?: string;
  /**
   * Output only. The resource name of the `WorkerPool`, with format
   * `projects/{project}/locations/{location}/workerPools/{worker_pool}`. The
   * value of `{worker_pool}` is provided by `worker_pool_id` in
   * `CreateWorkerPool` request and the value of `{location}` is determined by
   * the endpoint accessed.
   */
  readonly name?: string;
  /**
   * Legacy Private Pool configuration.
   */
  privatePoolV1Config?: PrivatePoolV1Config;
  /**
   * Output only. `WorkerPool` state.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "RUNNING" | "DELETING" | "DELETED" | "UPDATING";
  /**
   * Output only. A unique identifier for the `WorkerPool`.
   */
  readonly uid?: string;
  /**
   * Output only. Time at which the request to update the `WorkerPool` was
   * received.
   */
  readonly updateTime?: Date;
}

function serializeWorkerPool(data: any): WorkerPool {
  return {
    ...data,
    privatePoolV1Config: data["privatePoolV1Config"] !== undefined ? serializePrivatePoolV1Config(data["privatePoolV1Config"]) : undefined,
  };
}

function deserializeWorkerPool(data: any): WorkerPool {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deleteTime: data["deleteTime"] !== undefined ? new Date(data["deleteTime"]) : undefined,
    privatePoolV1Config: data["privatePoolV1Config"] !== undefined ? deserializePrivatePoolV1Config(data["privatePoolV1Config"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
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
