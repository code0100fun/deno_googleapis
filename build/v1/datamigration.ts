// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Database Migration API Client for Deno
 * ======================================
 * 
 * Manage Cloud Database Migration Service resources on Google Cloud Platform.
 * 
 * Docs: https://cloud.google.com/database-migration/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manage Cloud Database Migration Service resources on Google Cloud Platform.
 */
export class dataMigration {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://datamigration.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new connection profile in a given project and location.
   *
   * @param parent Required. The parent which owns this collection of connection profiles.
   */
  async projectsLocationsConnectionProfilesCreate(parent: string, req: ConnectionProfile, opts: ProjectsLocationsConnectionProfilesCreateOptions = {}): Promise<Operation> {
    req = serializeConnectionProfile(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/connectionProfiles`);
    if (opts.connectionProfileId !== undefined) {
      url.searchParams.append("connectionProfileId", String(opts.connectionProfileId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.skipValidation !== undefined) {
      url.searchParams.append("skipValidation", String(opts.skipValidation));
    }
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
   * Deletes a single Database Migration Service connection profile. A
   * connection profile can only be deleted if it is not in use by any active
   * migration jobs.
   *
   * @param name Required. Name of the connection profile resource to delete.
   */
  async projectsLocationsConnectionProfilesDelete(name: string, opts: ProjectsLocationsConnectionProfilesDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single connection profile.
   *
   * @param name Required. Name of the connection profile resource to get.
   */
  async projectsLocationsConnectionProfilesGet(name: string): Promise<ConnectionProfile> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeConnectionProfile(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsConnectionProfilesGetIamPolicy(resource: string, opts: ProjectsLocationsConnectionProfilesGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Retrieves a list of all connection profiles in a given project and
   * location.
   *
   * @param parent Required. The parent which owns this collection of connection profiles.
   */
  async projectsLocationsConnectionProfilesList(parent: string, opts: ProjectsLocationsConnectionProfilesListOptions = {}): Promise<ListConnectionProfilesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/connectionProfiles`);
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
    return deserializeListConnectionProfilesResponse(data);
  }

  /**
   * Update the configuration of a single connection profile.
   *
   * @param name The name of this connection profile resource in the form of projects/{project}/locations/{location}/connectionProfiles/{connectionProfile}.
   */
  async projectsLocationsConnectionProfilesPatch(name: string, req: ConnectionProfile, opts: ProjectsLocationsConnectionProfilesPatchOptions = {}): Promise<Operation> {
    req = serializeConnectionProfile(req);
    opts = serializeProjectsLocationsConnectionProfilesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.skipValidation !== undefined) {
      url.searchParams.append("skipValidation", String(opts.skipValidation));
    }
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsConnectionProfilesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsConnectionProfilesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Applies draft tree onto a specific destination database.
   *
   * @param name Required. The name of the conversion workspace resource for which to apply the draft tree. Must be in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}.
   */
  async projectsLocationsConversionWorkspacesApply(name: string, req: ApplyConversionWorkspaceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:apply`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Marks all the data in the conversion workspace as committed.
   *
   * @param name Required. Name of the conversion workspace resource to commit.
   */
  async projectsLocationsConversionWorkspacesCommit(name: string, req: CommitConversionWorkspaceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:commit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a draft tree schema for the destination database.
   *
   * @param name Name of the conversion workspace resource to convert in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}.
   */
  async projectsLocationsConversionWorkspacesConvert(name: string, req: ConvertConversionWorkspaceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:convert`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a new conversion workspace in a given project and location.
   *
   * @param parent Required. The parent which owns this collection of conversion workspaces.
   */
  async projectsLocationsConversionWorkspacesCreate(parent: string, req: ConversionWorkspace, opts: ProjectsLocationsConversionWorkspacesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/conversionWorkspaces`);
    if (opts.conversionWorkspaceId !== undefined) {
      url.searchParams.append("conversionWorkspaceId", String(opts.conversionWorkspaceId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Deletes a single conversion workspace.
   *
   * @param name Required. Name of the conversion workspace resource to delete.
   */
  async projectsLocationsConversionWorkspacesDelete(name: string, opts: ProjectsLocationsConversionWorkspacesDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieves a list of committed revisions of a specific conversion
   * workspace.
   *
   * @param conversionWorkspace Required. Name of the conversion workspace resource whose revisions are listed. Must be in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}.
   */
  async projectsLocationsConversionWorkspacesDescribeConversionWorkspaceRevisions(conversionWorkspace: string, opts: ProjectsLocationsConversionWorkspacesDescribeConversionWorkspaceRevisionsOptions = {}): Promise<DescribeConversionWorkspaceRevisionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ conversionWorkspace }:describeConversionWorkspaceRevisions`);
    if (opts.commitId !== undefined) {
      url.searchParams.append("commitId", String(opts.commitId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as DescribeConversionWorkspaceRevisionsResponse;
  }

  /**
   * Describes the database entities tree for a specific conversion workspace
   * and a specific tree type. Database entities are not resources like
   * conversion workspaces or mapping rules, and they can't be created, updated
   * or deleted. Instead, they are simple data objects describing the structure
   * of the client database.
   *
   * @param conversionWorkspace Required. Name of the conversion workspace resource whose database entities are described. Must be in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}.
   */
  async projectsLocationsConversionWorkspacesDescribeDatabaseEntities(conversionWorkspace: string, opts: ProjectsLocationsConversionWorkspacesDescribeDatabaseEntitiesOptions = {}): Promise<DescribeDatabaseEntitiesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ conversionWorkspace }:describeDatabaseEntities`);
    if (opts.commitId !== undefined) {
      url.searchParams.append("commitId", String(opts.commitId));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.tree !== undefined) {
      url.searchParams.append("tree", String(opts.tree));
    }
    if (opts.uncommitted !== undefined) {
      url.searchParams.append("uncommitted", String(opts.uncommitted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDescribeDatabaseEntitiesResponse(data);
  }

  /**
   * Gets details of a single conversion workspace.
   *
   * @param name Required. Name of the conversion workspace resource to get.
   */
  async projectsLocationsConversionWorkspacesGet(name: string): Promise<ConversionWorkspace> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ConversionWorkspace;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsConversionWorkspacesGetIamPolicy(resource: string, opts: ProjectsLocationsConversionWorkspacesGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists conversion workspaces in a given project and location.
   *
   * @param parent Required. The parent which owns this collection of conversion workspaces.
   */
  async projectsLocationsConversionWorkspacesList(parent: string, opts: ProjectsLocationsConversionWorkspacesListOptions = {}): Promise<ListConversionWorkspacesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/conversionWorkspaces`);
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
    return data as ListConversionWorkspacesResponse;
  }

  /**
   * Imports the mapping rules for a given conversion workspace. Supports
   * various formats of external rules files.
   *
   * @param parent Required. Name of the conversion workspace resource to import the rules to in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}.
   */
  async projectsLocationsConversionWorkspacesMappingRulesImport(parent: string, req: ImportMappingRulesRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/mappingRules:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates the parameters of a single conversion workspace.
   *
   * @param name Full name of the workspace resource, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}.
   */
  async projectsLocationsConversionWorkspacesPatch(name: string, req: ConversionWorkspace, opts: ProjectsLocationsConversionWorkspacesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsConversionWorkspacesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
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
   * Rolls back a conversion workspace to the last committed snapshot.
   *
   * @param name Required. Name of the conversion workspace resource to roll back to.
   */
  async projectsLocationsConversionWorkspacesRollback(name: string, req: RollbackConversionWorkspaceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:rollback`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Searches/lists the background jobs for a specific conversion workspace.
   * The background jobs are not resources like conversion workspaces or mapping
   * rules, and they can't be created, updated or deleted. Instead, they are a
   * way to expose the data plane jobs log.
   *
   * @param conversionWorkspace Required. Name of the conversion workspace resource whose jobs are listed, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}.
   */
  async projectsLocationsConversionWorkspacesSearchBackgroundJobs(conversionWorkspace: string, opts: ProjectsLocationsConversionWorkspacesSearchBackgroundJobsOptions = {}): Promise<SearchBackgroundJobsResponse> {
    opts = serializeProjectsLocationsConversionWorkspacesSearchBackgroundJobsOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ conversionWorkspace }:searchBackgroundJobs`);
    if (opts.completedUntilTime !== undefined) {
      url.searchParams.append("completedUntilTime", String(opts.completedUntilTime));
    }
    if (opts.maxSize !== undefined) {
      url.searchParams.append("maxSize", String(opts.maxSize));
    }
    if (opts.returnMostRecentPerJobType !== undefined) {
      url.searchParams.append("returnMostRecentPerJobType", String(opts.returnMostRecentPerJobType));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSearchBackgroundJobsResponse(data);
  }

  /**
   * Imports a snapshot of the source database into the conversion workspace.
   *
   * @param name Name of the conversion workspace resource to seed with new database structure, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}.
   */
  async projectsLocationsConversionWorkspacesSeed(name: string, req: SeedConversionWorkspaceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:seed`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsConversionWorkspacesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsConversionWorkspacesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Fetches a set of static IP addresses that need to be allowlisted by the
   * customer when using the static-IP connectivity method.
   *
   * @param name Required. The resource name for the location for which static IPs should be returned. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsFetchStaticIps(name: string, opts: ProjectsLocationsFetchStaticIpsOptions = {}): Promise<FetchStaticIpsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:fetchStaticIps`);
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
    return data as FetchStaticIpsResponse;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
    const url = new URL(`${this.#baseUrl}v1/${ name }/locations`);
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
    return data as ListLocationsResponse;
  }

  /**
   * Creates a new migration job in a given project and location.
   *
   * @param parent Required. The parent which owns this collection of migration jobs.
   */
  async projectsLocationsMigrationJobsCreate(parent: string, req: MigrationJob, opts: ProjectsLocationsMigrationJobsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/migrationJobs`);
    if (opts.migrationJobId !== undefined) {
      url.searchParams.append("migrationJobId", String(opts.migrationJobId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Deletes a single migration job.
   *
   * @param name Required. Name of the migration job resource to delete.
   */
  async projectsLocationsMigrationJobsDelete(name: string, opts: ProjectsLocationsMigrationJobsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Generate a SSH configuration script to configure the reverse SSH
   * connectivity.
   *
   * @param migrationJob Name of the migration job resource to generate the SSH script.
   */
  async projectsLocationsMigrationJobsGenerateSshScript(migrationJob: string, req: GenerateSshScriptRequest): Promise<SshScript> {
    const url = new URL(`${this.#baseUrl}v1/${ migrationJob }:generateSshScript`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SshScript;
  }

  /**
   * Gets details of a single migration job.
   *
   * @param name Required. Name of the migration job resource to get.
   */
  async projectsLocationsMigrationJobsGet(name: string): Promise<MigrationJob> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as MigrationJob;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsMigrationJobsGetIamPolicy(resource: string, opts: ProjectsLocationsMigrationJobsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists migration jobs in a given project and location.
   *
   * @param parent Required. The parent which owns this collection of migrationJobs.
   */
  async projectsLocationsMigrationJobsList(parent: string, opts: ProjectsLocationsMigrationJobsListOptions = {}): Promise<ListMigrationJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/migrationJobs`);
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
    return data as ListMigrationJobsResponse;
  }

  /**
   * Updates the parameters of a single migration job.
   *
   * @param name The name (URI) of this migration job resource, in the form of: projects/{project}/locations/{location}/migrationJobs/{migrationJob}.
   */
  async projectsLocationsMigrationJobsPatch(name: string, req: MigrationJob, opts: ProjectsLocationsMigrationJobsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsMigrationJobsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
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
   * Promote a migration job, stopping replication to the destination and
   * promoting the destination to be a standalone database.
   *
   * @param name Name of the migration job resource to promote.
   */
  async projectsLocationsMigrationJobsPromote(name: string, req: PromoteMigrationJobRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:promote`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Restart a stopped or failed migration job, resetting the destination
   * instance to its original state and starting the migration process from
   * scratch.
   *
   * @param name Name of the migration job resource to restart.
   */
  async projectsLocationsMigrationJobsRestart(name: string, req: RestartMigrationJobRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:restart`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Resume a migration job that is currently stopped and is resumable (was
   * stopped during CDC phase).
   *
   * @param name Name of the migration job resource to resume.
   */
  async projectsLocationsMigrationJobsResume(name: string, req: ResumeMigrationJobRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:resume`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsMigrationJobsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Start an already created migration job.
   *
   * @param name Name of the migration job resource to start.
   */
  async projectsLocationsMigrationJobsStart(name: string, req: StartMigrationJobRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:start`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Stops a running migration job.
   *
   * @param name Name of the migration job resource to stop.
   */
  async projectsLocationsMigrationJobsStop(name: string, req: StopMigrationJobRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:stop`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
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
  async projectsLocationsMigrationJobsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Verify a migration job, making sure the destination can reach the source
   * and that all configuration and prerequisites are met.
   *
   * @param name Name of the migration job resource to verify.
   */
  async projectsLocationsMigrationJobsVerify(name: string, req: VerifyMigrationJobRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:verify`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
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
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async projectsLocationsOperationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
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
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`. NOTE: the
   * `name` binding allows API services to override the binding to use different
   * resource name schemes, such as `users/*\/operations`. To override the
   * binding, API services can add a binding such as
   * `"/v1/{name=users/*}/operations"` to their service configuration. For
   * backwards compatibility, the default name includes the operations
   * collection id, however overriding users must ensure the name binding is the
   * parent resource, without the operations collection id.
   *
   * @param name The name of the operation's parent resource.
   */
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
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
    return data as ListOperationsResponse;
  }

  /**
   * Creates a new private connection in a given project and location.
   *
   * @param parent Required. The parent that owns the collection of PrivateConnections.
   */
  async projectsLocationsPrivateConnectionsCreate(parent: string, req: PrivateConnection, opts: ProjectsLocationsPrivateConnectionsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/privateConnections`);
    if (opts.privateConnectionId !== undefined) {
      url.searchParams.append("privateConnectionId", String(opts.privateConnectionId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.skipValidation !== undefined) {
      url.searchParams.append("skipValidation", String(opts.skipValidation));
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
   * Deletes a single Database Migration Service private connection.
   *
   * @param name Required. The name of the private connection to delete.
   */
  async projectsLocationsPrivateConnectionsDelete(name: string, opts: ProjectsLocationsPrivateConnectionsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single private connection.
   *
   * @param name Required. The name of the private connection to get.
   */
  async projectsLocationsPrivateConnectionsGet(name: string): Promise<PrivateConnection> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PrivateConnection;
  }

  /**
   * Retrieves a list of private connections in a given project and location.
   *
   * @param parent Required. The parent that owns the collection of private connections.
   */
  async projectsLocationsPrivateConnectionsList(parent: string, opts: ProjectsLocationsPrivateConnectionsListOptions = {}): Promise<ListPrivateConnectionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/privateConnections`);
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
    return data as ListPrivateConnectionsResponse;
  }
}

/**
 * Specifies required connection parameters, and the parameters required to
 * create an AlloyDB destination cluster.
 */
export interface AlloyDbConnectionProfile {
  /**
   * Required. The AlloyDB cluster ID that this connection profile is
   * associated with.
   */
  clusterId?: string;
  /**
   * Immutable. Metadata used to create the destination AlloyDB cluster.
   */
  settings?: AlloyDbSettings;
}

/**
 * Settings for creating an AlloyDB cluster.
 */
export interface AlloyDbSettings {
  /**
   * Required. Input only. Initial user to setup during cluster creation.
   * Required.
   */
  initialUser?: UserPassword;
  /**
   * Labels for the AlloyDB cluster created by DMS. An object containing a list
   * of 'key', 'value' pairs.
   */
  labels?: {
    [key: string]: string
  };
  primaryInstanceSettings?: PrimaryInstanceSettings;
  /**
   * Required. The resource link for the VPC network in which cluster resources
   * are created and from which they are accessible via Private IP. The network
   * must belong to the same project as the cluster. It is specified in the
   * form: "projects/{project_number}/global/networks/{network_id}". This is
   * required to create a cluster.
   */
  vpcNetwork?: string;
}

/**
 * Request message for 'ApplyConversionWorkspace' request.
 */
export interface ApplyConversionWorkspaceRequest {
  /**
   * Fully qualified (Uri) name of the destination connection profile.
   */
  connectionProfile?: string;
  /**
   * Filter which entities to apply. Leaving this field empty will apply all of
   * the entities. Supports Google AIP 160 based filtering.
   */
  filter?: string;
}

/**
 * Details regarding an Apply background job.
 */
export interface ApplyJobDetails {
  /**
   * The connection profile which was used for the apply job.
   */
  connectionProfile?: string;
  /**
   * AIP-160 based filter used to specify the entities to apply
   */
  filter?: string;
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
 * Execution log of a background job.
 */
export interface BackgroundJobLogEntry {
  /**
   * Apply job details.
   */
  applyJobDetails?: ApplyJobDetails;
  /**
   * Job completion comment, such as how many entities were seeded, how many
   * warnings were found during conversion, and similar information.
   */
  completionComment?: string;
  /**
   * Job completion state, i.e. the final state after the job completed.
   */
  completionState?:  | "JOB_COMPLETION_STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED";
  /**
   * Convert job details.
   */
  convertJobDetails?: ConvertJobDetails;
  /**
   * The timestamp when the background job was finished.
   */
  finishTime?: Date;
  /**
   * The background job log entry ID.
   */
  id?: string;
  /**
   * Import rules job details.
   */
  importRulesJobDetails?: ImportRulesJobDetails;
  /**
   * The type of job that was executed.
   */
  jobType?:  | "BACKGROUND_JOB_TYPE_UNSPECIFIED" | "BACKGROUND_JOB_TYPE_SOURCE_SEED" | "BACKGROUND_JOB_TYPE_CONVERT" | "BACKGROUND_JOB_TYPE_APPLY_DESTINATION" | "BACKGROUND_JOB_TYPE_IMPORT_RULES_FILE";
  /**
   * Whether the client requested the conversion workspace to be committed
   * after a successful completion of the job.
   */
  requestAutocommit?: boolean;
  /**
   * Seed job details.
   */
  seedJobDetails?: SeedJobDetails;
  /**
   * The timestamp when the background job was started.
   */
  startTime?: Date;
}

function serializeBackgroundJobLogEntry(data: any): BackgroundJobLogEntry {
  return {
    ...data,
    finishTime: data["finishTime"] !== undefined ? data["finishTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeBackgroundJobLogEntry(data: any): BackgroundJobLogEntry {
  return {
    ...data,
    finishTime: data["finishTime"] !== undefined ? new Date(data["finishTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
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
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Specifies required connection parameters, and, optionally, the parameters
 * required to create a Cloud SQL destination database instance.
 */
export interface CloudSqlConnectionProfile {
  /**
   * Output only. The Cloud SQL database instance's additional (outgoing)
   * public IP. Used when the Cloud SQL database availability type is REGIONAL
   * (i.e. multiple zones / highly available).
   */
  readonly additionalPublicIp?: string;
  /**
   * Output only. The Cloud SQL instance ID that this connection profile is
   * associated with.
   */
  readonly cloudSqlId?: string;
  /**
   * Output only. The Cloud SQL database instance's private IP.
   */
  readonly privateIp?: string;
  /**
   * Output only. The Cloud SQL database instance's public IP.
   */
  readonly publicIp?: string;
  /**
   * Immutable. Metadata used to create the destination Cloud SQL database.
   */
  settings?: CloudSqlSettings;
}

function serializeCloudSqlConnectionProfile(data: any): CloudSqlConnectionProfile {
  return {
    ...data,
    settings: data["settings"] !== undefined ? serializeCloudSqlSettings(data["settings"]) : undefined,
  };
}

function deserializeCloudSqlConnectionProfile(data: any): CloudSqlConnectionProfile {
  return {
    ...data,
    settings: data["settings"] !== undefined ? deserializeCloudSqlSettings(data["settings"]) : undefined,
  };
}

/**
 * Settings for creating a Cloud SQL database instance.
 */
export interface CloudSqlSettings {
  /**
   * The activation policy specifies when the instance is activated; it is
   * applicable only when the instance state is 'RUNNABLE'. Valid values:
   * 'ALWAYS': The instance is on, and remains so even in the absence of
   * connection requests. `NEVER`: The instance is off; it is not activated,
   * even if a connection request arrives.
   */
  activationPolicy?:  | "SQL_ACTIVATION_POLICY_UNSPECIFIED" | "ALWAYS" | "NEVER";
  /**
   * [default: ON] If you enable this setting, Cloud SQL checks your available
   * storage every 30 seconds. If the available storage falls below a threshold
   * size, Cloud SQL automatically adds additional storage capacity. If the
   * available storage repeatedly falls below the threshold size, Cloud SQL
   * continues to add storage until it reaches the maximum of 30 TB.
   */
  autoStorageIncrease?: boolean;
  /**
   * Optional. Availability type. Potential values: * `ZONAL`: The instance
   * serves data from only one zone. Outages in that zone affect data
   * availability. * `REGIONAL`: The instance can serve data from more than one
   * zone in a region (it is highly available).
   */
  availabilityType?:  | "SQL_AVAILABILITY_TYPE_UNSPECIFIED" | "ZONAL" | "REGIONAL";
  /**
   * The KMS key name used for the csql instance.
   */
  cmekKeyName?: string;
  /**
   * The Cloud SQL default instance level collation.
   */
  collation?: string;
  /**
   * The database flags passed to the Cloud SQL instance at startup. An object
   * containing a list of "key": value pairs. Example: { "name": "wrench",
   * "mass": "1.3kg", "count": "3" }.
   */
  databaseFlags?: {
    [key: string]: string
  };
  /**
   * The database engine type and version.
   */
  databaseVersion?:  | "SQL_DATABASE_VERSION_UNSPECIFIED" | "MYSQL_5_6" | "MYSQL_5_7" | "POSTGRES_9_6" | "POSTGRES_11" | "POSTGRES_10" | "MYSQL_8_0" | "POSTGRES_12" | "POSTGRES_13" | "POSTGRES_14";
  /**
   * The storage capacity available to the database, in GB. The minimum (and
   * default) size is 10GB.
   */
  dataDiskSizeGb?: bigint;
  /**
   * The type of storage: `PD_SSD` (default) or `PD_HDD`.
   */
  dataDiskType?:  | "SQL_DATA_DISK_TYPE_UNSPECIFIED" | "PD_SSD" | "PD_HDD";
  /**
   * The settings for IP Management. This allows to enable or disable the
   * instance IP and manage which external networks can connect to the instance.
   * The IPv4 address cannot be disabled.
   */
  ipConfig?: SqlIpConfig;
  /**
   * Input only. Initial root password.
   */
  rootPassword?: string;
  /**
   * Output only. Indicates If this connection profile root password is stored.
   */
  readonly rootPasswordSet?: boolean;
  /**
   * Optional. The Google Cloud Platform zone where the failover Cloud SQL
   * database instance is located. Used when the Cloud SQL database availability
   * type is REGIONAL (i.e. multiple zones / highly available).
   */
  secondaryZone?: string;
  /**
   * The Database Migration Service source connection profile ID, in the
   * format:
   * `projects/my_project_name/locations/us-central1/connectionProfiles/connection_profile_ID`
   */
  sourceId?: string;
  /**
   * The maximum size to which storage capacity can be automatically increased.
   * The default value is 0, which specifies that there is no limit.
   */
  storageAutoResizeLimit?: bigint;
  /**
   * The tier (or machine type) for this instance, for example:
   * `db-n1-standard-1` (MySQL instances) or `db-custom-1-3840` (PostgreSQL
   * instances). For more information, see [Cloud SQL Instance
   * Settings](https://cloud.google.com/sql/docs/mysql/instance-settings).
   */
  tier?: string;
  /**
   * The resource labels for a Cloud SQL instance to use to annotate any
   * related underlying resources such as Compute Engine VMs. An object
   * containing a list of "key": "value" pairs. Example: `{ "name": "wrench",
   * "mass": "18kg", "count": "3" }`.
   */
  userLabels?: {
    [key: string]: string
  };
  /**
   * The Google Cloud Platform zone where your Cloud SQL database instance is
   * located.
   */
  zone?: string;
}

function serializeCloudSqlSettings(data: any): CloudSqlSettings {
  return {
    ...data,
    dataDiskSizeGb: data["dataDiskSizeGb"] !== undefined ? String(data["dataDiskSizeGb"]) : undefined,
    ipConfig: data["ipConfig"] !== undefined ? serializeSqlIpConfig(data["ipConfig"]) : undefined,
    storageAutoResizeLimit: data["storageAutoResizeLimit"] !== undefined ? String(data["storageAutoResizeLimit"]) : undefined,
  };
}

function deserializeCloudSqlSettings(data: any): CloudSqlSettings {
  return {
    ...data,
    dataDiskSizeGb: data["dataDiskSizeGb"] !== undefined ? BigInt(data["dataDiskSizeGb"]) : undefined,
    ipConfig: data["ipConfig"] !== undefined ? deserializeSqlIpConfig(data["ipConfig"]) : undefined,
    storageAutoResizeLimit: data["storageAutoResizeLimit"] !== undefined ? BigInt(data["storageAutoResizeLimit"]) : undefined,
  };
}

/**
 * Column is not used as an independent entity, it is retrieved as part of a
 * Table entity.
 */
export interface ColumnEntity {
  /**
   * Is the column of array type.
   */
  array?: boolean;
  /**
   * If the column is array, of which length.
   */
  arrayLength?: number;
  /**
   * Is the column auto-generated/identity.
   */
  autoGenerated?: boolean;
  /**
   * Charset override - instead of table level charset.
   */
  charset?: string;
  /**
   * Collation override - instead of table level collation.
   */
  collation?: string;
  /**
   * Comment associated with the column.
   */
  comment?: string;
  /**
   * Custom engine specific features.
   */
  customFeatures?: {
    [key: string]: any
  };
  /**
   * Column data type.
   */
  dataType?: string;
  /**
   * Default value of the column.
   */
  defaultValue?: string;
  /**
   * Column fractional second precision - used for timestamp based datatypes.
   */
  fractionalSecondsPrecision?: number;
  /**
   * Column length - e.g. varchar (50).
   */
  length?: bigint;
  /**
   * Column name.
   */
  name?: string;
  /**
   * Is the column nullable.
   */
  nullable?: boolean;
  /**
   * Column order in the table.
   */
  ordinalPosition?: number;
  /**
   * Column precision - when relevant.
   */
  precision?: number;
  /**
   * Column scale - when relevant.
   */
  scale?: number;
  /**
   * Specifies the list of values allowed in the column. Only used for set data
   * type.
   */
  setValues?: string[];
  /**
   * Is the column a UDT.
   */
  udt?: boolean;
}

function serializeColumnEntity(data: any): ColumnEntity {
  return {
    ...data,
    length: data["length"] !== undefined ? String(data["length"]) : undefined,
  };
}

function deserializeColumnEntity(data: any): ColumnEntity {
  return {
    ...data,
    length: data["length"] !== undefined ? BigInt(data["length"]) : undefined,
  };
}

/**
 * Request message for 'CommitConversionWorkspace' request.
 */
export interface CommitConversionWorkspaceRequest {
  /**
   * Optional. Optional name of the commit.
   */
  commitName?: string;
}

/**
 * A connection profile definition.
 */
export interface ConnectionProfile {
  /**
   * An AlloyDB cluster connection profile.
   */
  alloydb?: AlloyDbConnectionProfile;
  /**
   * A CloudSQL database connection profile.
   */
  cloudsql?: CloudSqlConnectionProfile;
  /**
   * Output only. The timestamp when the resource was created. A timestamp in
   * RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example:
   * "2014-10-02T15:01:23.045123456Z".
   */
  readonly createTime?: Date;
  /**
   * The connection profile display name.
   */
  displayName?: string;
  /**
   * Output only. The error details in case of state FAILED.
   */
  readonly error?: Status;
  /**
   * The resource labels for connection profile to use to annotate any related
   * underlying resources such as Compute Engine VMs. An object containing a
   * list of "key": "value" pairs. Example: `{ "name": "wrench", "mass":
   * "1.3kg", "count": "3" }`.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * A MySQL database connection profile.
   */
  mysql?: MySqlConnectionProfile;
  /**
   * The name of this connection profile resource in the form of
   * projects/{project}/locations/{location}/connectionProfiles/{connectionProfile}.
   */
  name?: string;
  /**
   * An Oracle database connection profile.
   */
  oracle?: OracleConnectionProfile;
  /**
   * A PostgreSQL database connection profile.
   */
  postgresql?: PostgreSqlConnectionProfile;
  /**
   * The database provider.
   */
  provider?:  | "DATABASE_PROVIDER_UNSPECIFIED" | "CLOUDSQL" | "RDS" | "AURORA" | "ALLOYDB";
  /**
   * The current connection profile state (e.g. DRAFT, READY, or FAILED).
   */
  state?:  | "STATE_UNSPECIFIED" | "DRAFT" | "CREATING" | "READY" | "UPDATING" | "DELETING" | "DELETED" | "FAILED";
  /**
   * Output only. The timestamp when the resource was last updated. A timestamp
   * in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example:
   * "2014-10-02T15:01:23.045123456Z".
   */
  readonly updateTime?: Date;
}

function serializeConnectionProfile(data: any): ConnectionProfile {
  return {
    ...data,
    cloudsql: data["cloudsql"] !== undefined ? serializeCloudSqlConnectionProfile(data["cloudsql"]) : undefined,
  };
}

function deserializeConnectionProfile(data: any): ConnectionProfile {
  return {
    ...data,
    cloudsql: data["cloudsql"] !== undefined ? deserializeCloudSqlConnectionProfile(data["cloudsql"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Constraint is not used as an independent entity, it is retrieved as part of
 * another entity such as Table or View.
 */
export interface ConstraintEntity {
  /**
   * Custom engine specific features.
   */
  customFeatures?: {
    [key: string]: any
  };
  /**
   * The name of the table constraint.
   */
  name?: string;
  /**
   * Reference columns which may be associated with the constraint. For
   * example, if the constraint is a FOREIGN_KEY, this represents the list of
   * full names of referenced columns by the foreign key.
   */
  referenceColumns?: string[];
  /**
   * Reference table which may be associated with the constraint. For example,
   * if the constraint is a FOREIGN_KEY, this represents the list of full name
   * of the referenced table by the foreign key.
   */
  referenceTable?: string;
  /**
   * Table columns used as part of the Constraint, for example primary key
   * constraint should list the columns which constitutes the key.
   */
  tableColumns?: string[];
  /**
   * Table which is associated with the constraint. In case the constraint is
   * defined on a table, this field is left empty as this information is stored
   * in parent_name. However, if constraint is defined on a view, this field
   * stores the table name on which the view is defined.
   */
  tableName?: string;
  /**
   * Type of constraint, for example unique, primary key, foreign key
   * (currently only primary key is supported).
   */
  type?: string;
}

/**
 * The main conversion workspace resource entity.
 */
export interface ConversionWorkspace {
  /**
   * Output only. The timestamp when the workspace resource was created.
   */
  readonly createTime?: Date;
  /**
   * Required. The destination engine details.
   */
  destination?: DatabaseEngineInfo;
  /**
   * The display name for the workspace.
   */
  displayName?: string;
  /**
   * A generic list of settings for the workspace. The settings are database
   * pair dependant and can indicate default behavior for the mapping rules
   * engine or turn on or off specific features. Such examples can be:
   * convert_foreign_key_to_interleave=true, skip_triggers=false,
   * ignore_non_table_synonyms=true
   */
  globalSettings?: {
    [key: string]: string
  };
  /**
   * Output only. Whether the workspace has uncommitted changes (changes which
   * were made after the workspace was committed).
   */
  readonly hasUncommittedChanges?: boolean;
  /**
   * Output only. The latest commit ID.
   */
  readonly latestCommitId?: string;
  /**
   * Output only. The timestamp when the workspace was committed.
   */
  readonly latestCommitTime?: Date;
  /**
   * Full name of the workspace resource, in the form of:
   * projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}.
   */
  name?: string;
  /**
   * Required. The source engine details.
   */
  source?: DatabaseEngineInfo;
  /**
   * Output only. The timestamp when the workspace resource was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * A conversion workspace's version.
 */
export interface ConversionWorkspaceInfo {
  /**
   * The commit ID of the conversion workspace.
   */
  commitId?: string;
  /**
   * The resource name (URI) of the conversion workspace.
   */
  name?: string;
}

/**
 * Request message for 'ConvertConversionWorkspace' request.
 */
export interface ConvertConversionWorkspaceRequest {
  /**
   * Specifies whether the conversion workspace is to be committed
   * automatically after the conversion.
   */
  autoCommit?: boolean;
  /**
   * Filter the entities to convert. Leaving this field empty will convert all
   * of the entities. Supports Google AIP-160 style filtering.
   */
  filter?: string;
}

/**
 * Details regarding a Convert background job.
 */
export interface ConvertJobDetails {
  /**
   * AIP-160 based filter used to specify the entities to convert
   */
  filter?: string;
}

/**
 * The type and version of a source or destination database.
 */
export interface DatabaseEngineInfo {
  /**
   * Required. Engine type.
   */
  engine?:  | "DATABASE_ENGINE_UNSPECIFIED" | "MYSQL" | "POSTGRESQL" | "ORACLE";
  /**
   * Required. Engine named version, for example 12.c.1.
   */
  version?: string;
}

/**
 * The base entity type for all the database related entities. The message
 * contains the entity name, the name of its parent, the entity type, and the
 * specific details per entity type.
 */
export interface DatabaseEntity {
  /**
   * Function.
   */
  databaseFunction?: FunctionEntity;
  /**
   * Package.
   */
  databasePackage?: PackageEntity;
  /**
   * The type of the database entity (table, view, index, ...).
   */
  entityType?:  | "DATABASE_ENTITY_TYPE_UNSPECIFIED" | "DATABASE_ENTITY_TYPE_SCHEMA" | "DATABASE_ENTITY_TYPE_TABLE" | "DATABASE_ENTITY_TYPE_COLUMN" | "DATABASE_ENTITY_TYPE_CONSTRAINT" | "DATABASE_ENTITY_TYPE_INDEX" | "DATABASE_ENTITY_TYPE_TRIGGER" | "DATABASE_ENTITY_TYPE_VIEW" | "DATABASE_ENTITY_TYPE_SEQUENCE" | "DATABASE_ENTITY_TYPE_STORED_PROCEDURE" | "DATABASE_ENTITY_TYPE_FUNCTION" | "DATABASE_ENTITY_TYPE_SYNONYM" | "DATABASE_ENTITY_TYPE_DATABASE_PACKAGE" | "DATABASE_ENTITY_TYPE_UDT" | "DATABASE_ENTITY_TYPE_MATERIAL_VIEW" | "DATABASE_ENTITY_TYPE_DATABASE";
  /**
   * Details about entity mappings. For source tree entities, this holds the
   * draft entities which were generated by the mapping rules. For draft tree
   * entities, this holds the source entities which were converted to form the
   * draft entity. Destination entities will have no mapping details.
   */
  mappings?: EntityMapping[];
  /**
   * The full name of the parent entity (e.g. schema name).
   */
  parentEntity?: string;
  /**
   * Schema.
   */
  schema?: SchemaEntity;
  /**
   * Sequence.
   */
  sequence?: SequenceEntity;
  /**
   * The short name (e.g. table name) of the entity.
   */
  shortName?: string;
  /**
   * Stored procedure.
   */
  storedProcedure?: StoredProcedureEntity;
  /**
   * Synonym.
   */
  synonym?: SynonymEntity;
  /**
   * Table.
   */
  table?: TableEntity;
  /**
   * The type of tree the entity belongs to.
   */
  tree?:  | "TREE_TYPE_UNSPECIFIED" | "SOURCE" | "DRAFT" | "DESTINATION";
  /**
   * View.
   */
  view?: ViewEntity;
}

function serializeDatabaseEntity(data: any): DatabaseEntity {
  return {
    ...data,
    sequence: data["sequence"] !== undefined ? serializeSequenceEntity(data["sequence"]) : undefined,
    table: data["table"] !== undefined ? serializeTableEntity(data["table"]) : undefined,
  };
}

function deserializeDatabaseEntity(data: any): DatabaseEntity {
  return {
    ...data,
    sequence: data["sequence"] !== undefined ? deserializeSequenceEntity(data["sequence"]) : undefined,
    table: data["table"] !== undefined ? deserializeTableEntity(data["table"]) : undefined,
  };
}

/**
 * A message defining the database engine and provider.
 */
export interface DatabaseType {
  /**
   * The database engine.
   */
  engine?:  | "DATABASE_ENGINE_UNSPECIFIED" | "MYSQL" | "POSTGRESQL" | "ORACLE";
  /**
   * The database provider.
   */
  provider?:  | "DATABASE_PROVIDER_UNSPECIFIED" | "CLOUDSQL" | "RDS" | "AURORA" | "ALLOYDB";
}

/**
 * Response message for 'DescribeConversionWorkspaceRevisions' request.
 */
export interface DescribeConversionWorkspaceRevisionsResponse {
  /**
   * The list of conversion workspace revisions.
   */
  revisions?: ConversionWorkspace[];
}

/**
 * Response message for 'DescribeDatabaseEntities' request.
 */
export interface DescribeDatabaseEntitiesResponse {
  /**
   * The list of database entities for the conversion workspace.
   */
  databaseEntities?: DatabaseEntity[];
  /**
   * A token which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeDescribeDatabaseEntitiesResponse(data: any): DescribeDatabaseEntitiesResponse {
  return {
    ...data,
    databaseEntities: data["databaseEntities"] !== undefined ? data["databaseEntities"].map((item: any) => (serializeDatabaseEntity(item))) : undefined,
  };
}

function deserializeDescribeDatabaseEntitiesResponse(data: any): DescribeDatabaseEntitiesResponse {
  return {
    ...data,
    databaseEntities: data["databaseEntities"] !== undefined ? data["databaseEntities"].map((item: any) => (deserializeDatabaseEntity(item))) : undefined,
  };
}

/**
 * Dump flag definition.
 */
export interface DumpFlag {
  /**
   * The name of the flag
   */
  name?: string;
  /**
   * The value of the flag.
   */
  value?: string;
}

/**
 * Dump flags definition.
 */
export interface DumpFlags {
  /**
   * The flags for the initial dump.
   */
  dumpFlags?: DumpFlag[];
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
 * Details of the mappings of a database entity.
 */
export interface EntityMapping {
  /**
   * Target entity full name. The draft entity can also include a column, index
   * or constraint using the same naming notation schema.table.column.
   */
  draftEntity?: string;
  /**
   * Entity mapping log entries. Multiple rules can be effective and contribute
   * changes to a converted entity, such as a rule can handle the entity name,
   * another rule can handle an entity type. In addition, rules which did not
   * change the entity are also logged along with the reason preventing them to
   * do so.
   */
  mappingLog?: EntityMappingLogEntry[];
  /**
   * Source entity full name. The source entity can also be a column, index or
   * constraint using the same naming notation schema.table.column.
   */
  sourceEntity?: string;
}

/**
 * A single record of a rule which was used for a mapping.
 */
export interface EntityMappingLogEntry {
  /**
   * Comment.
   */
  mappingComment?: string;
  /**
   * Which rule caused this log entry.
   */
  ruleId?: string;
  /**
   * Rule revision ID.
   */
  ruleRevisionId?: string;
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
 * Response message for a 'FetchStaticIps' request.
 */
export interface FetchStaticIpsResponse {
  /**
   * A token that can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * List of static IPs.
   */
  staticIps?: string[];
}

/**
 * Forward SSH Tunnel connectivity.
 */
export interface ForwardSshTunnelConnectivity {
  /**
   * Required. Hostname for the SSH tunnel.
   */
  hostname?: string;
  /**
   * Input only. SSH password.
   */
  password?: string;
  /**
   * Port for the SSH tunnel, default value is 22.
   */
  port?: number;
  /**
   * Input only. SSH private key.
   */
  privateKey?: string;
  /**
   * Required. Username for the SSH tunnel.
   */
  username?: string;
}

/**
 * Function's parent is a schema.
 */
export interface FunctionEntity {
  /**
   * Custom engine specific features.
   */
  customFeatures?: {
    [key: string]: any
  };
  /**
   * The SQL code which creates the function.
   */
  sqlCode?: string;
}

/**
 * Request message for 'GenerateSshScript' request.
 */
export interface GenerateSshScriptRequest {
  /**
   * Required. Bastion VM Instance name to use or to create.
   */
  vm?: string;
  /**
   * The VM creation configuration
   */
  vmCreationConfig?: VmCreationConfig;
  /**
   * The port that will be open on the bastion host.
   */
  vmPort?: number;
  /**
   * The VM selection configuration
   */
  vmSelectionConfig?: VmSelectionConfig;
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudClouddmsV1OperationMetadata {
  /**
   * Output only. API version used to start the operation.
   */
  readonly apiVersion?: string;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Identifies whether the user has requested cancellation of the
   * operation. Operations that have successfully been cancelled have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   */
  readonly requestedCancellation?: boolean;
  /**
   * Output only. Human-readable status of the operation, if any.
   */
  readonly statusMessage?: string;
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
 * Request message for 'ImportMappingRules' request.
 */
export interface ImportMappingRulesRequest {
  /**
   * Should the conversion workspace be committed automatically after the
   * import operation.
   */
  autoCommit?: boolean;
  /**
   * One or more rules files.
   */
  rulesFiles?: RulesFile[];
  /**
   * The format of the rules content file.
   */
  rulesFormat?:  | "IMPORT_RULES_FILE_FORMAT_UNSPECIFIED" | "IMPORT_RULES_FILE_FORMAT_HARBOUR_BRIDGE_SESSION_FILE" | "IMPORT_RULES_FILE_FORMAT_ORATOPG_CONFIG_FILE";
}

/**
 * Details regarding an Import Rules background job.
 */
export interface ImportRulesJobDetails {
  /**
   * The requested file format.
   */
  fileFormat?:  | "IMPORT_RULES_FILE_FORMAT_UNSPECIFIED" | "IMPORT_RULES_FILE_FORMAT_HARBOUR_BRIDGE_SESSION_FILE" | "IMPORT_RULES_FILE_FORMAT_ORATOPG_CONFIG_FILE";
  /**
   * File names used for the import rules job.
   */
  files?: string[];
}

/**
 * Index is not used as an independent entity, it is retrieved as part of a
 * Table entity.
 */
export interface IndexEntity {
  /**
   * Custom engine specific features.
   */
  customFeatures?: {
    [key: string]: any
  };
  /**
   * The name of the index.
   */
  name?: string;
  /**
   * Table columns used as part of the Index, for example B-TREE index should
   * list the columns which constitutes the index.
   */
  tableColumns?: string[];
  /**
   * Type of index, for example B-TREE.
   */
  type?: string;
  /**
   * Boolean value indicating whether the index is unique.
   */
  unique?: boolean;
}

/**
 * Response message for 'ListConnectionProfiles' request.
 */
export interface ListConnectionProfilesResponse {
  /**
   * The response list of connection profiles.
   */
  connectionProfiles?: ConnectionProfile[];
  /**
   * A token which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

function serializeListConnectionProfilesResponse(data: any): ListConnectionProfilesResponse {
  return {
    ...data,
    connectionProfiles: data["connectionProfiles"] !== undefined ? data["connectionProfiles"].map((item: any) => (serializeConnectionProfile(item))) : undefined,
  };
}

function deserializeListConnectionProfilesResponse(data: any): ListConnectionProfilesResponse {
  return {
    ...data,
    connectionProfiles: data["connectionProfiles"] !== undefined ? data["connectionProfiles"].map((item: any) => (deserializeConnectionProfile(item))) : undefined,
  };
}

/**
 * Response message for 'ListConversionWorkspaces' request.
 */
export interface ListConversionWorkspacesResponse {
  /**
   * The list of conversion workspace objects.
   */
  conversionWorkspaces?: ConversionWorkspace[];
  /**
   * A token which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
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
 * Response message for 'ListMigrationJobs' request.
 */
export interface ListMigrationJobsResponse {
  /**
   * The list of migration jobs objects.
   */
  migrationJobs?: MigrationJob[];
  /**
   * A token which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * The response message for Operations.ListOperations.
 */
export interface ListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: Operation[];
}

/**
 * Response message for 'ListPrivateConnections' request.
 */
export interface ListPrivateConnectionsResponse {
  /**
   * A token which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * List of private connections.
   */
  privateConnections?: PrivateConnection[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
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
 * MachineConfig describes the configuration of a machine.
 */
export interface MachineConfig {
  /**
   * The number of CPU's in the VM instance.
   */
  cpuCount?: number;
}

/**
 * Represents a Database Migration Service migration job object.
 */
export interface MigrationJob {
  /**
   * The conversion workspace used by the migration.
   */
  conversionWorkspace?: ConversionWorkspaceInfo;
  /**
   * Output only. The timestamp when the migration job resource was created. A
   * timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example:
   * "2014-10-02T15:01:23.045123456Z".
   */
  readonly createTime?: Date;
  /**
   * Required. The resource name (URI) of the destination connection profile.
   */
  destination?: string;
  /**
   * The database engine type and provider of the destination.
   */
  destinationDatabase?: DatabaseType;
  /**
   * The migration job display name.
   */
  displayName?: string;
  /**
   * The initial dump flags. This field and the "dump_path" field are mutually
   * exclusive.
   */
  dumpFlags?: DumpFlags;
  /**
   * The path to the dump file in Google Cloud Storage, in the format:
   * (gs://[BUCKET_NAME]/[OBJECT_NAME]). This field and the "dump_flags" field
   * are mutually exclusive.
   */
  dumpPath?: string;
  /**
   * Output only. The duration of the migration job (in seconds). A duration in
   * seconds with up to nine fractional digits, terminated by 's'. Example:
   * "3.5s".
   */
  readonly duration?: number /* Duration */;
  /**
   * Output only. If the migration job is completed, the time when it was
   * completed.
   */
  readonly endTime?: Date;
  /**
   * Output only. The error details in case of state FAILED.
   */
  readonly error?: Status;
  /**
   * This field can be used to select the entities to migrate as part of the
   * migration job. It uses AIP-160 notation to select a subset of the entities
   * configured on the associated conversion-workspace. This field should not be
   * set on migration-jobs that are not associated with a conversion workspace.
   */
  filter?: string;
  /**
   * The resource labels for migration job to use to annotate any related
   * underlying resources such as Compute Engine VMs. An object containing a
   * list of "key": "value" pairs. Example: `{ "name": "wrench", "mass":
   * "1.3kg", "count": "3" }`.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The name (URI) of this migration job resource, in the form of:
   * projects/{project}/locations/{location}/migrationJobs/{migrationJob}.
   */
  name?: string;
  /**
   * Output only. The current migration job phase.
   */
  readonly phase?:  | "PHASE_UNSPECIFIED" | "FULL_DUMP" | "CDC" | "PROMOTE_IN_PROGRESS" | "WAITING_FOR_SOURCE_WRITES_TO_STOP" | "PREPARING_THE_DUMP";
  /**
   * The details needed to communicate to the source over Reverse SSH tunnel
   * connectivity.
   */
  reverseSshConnectivity?: ReverseSshConnectivity;
  /**
   * Required. The resource name (URI) of the source connection profile.
   */
  source?: string;
  /**
   * The database engine type and provider of the source.
   */
  sourceDatabase?: DatabaseType;
  /**
   * The current migration job state.
   */
  state?:  | "STATE_UNSPECIFIED" | "MAINTENANCE" | "DRAFT" | "CREATING" | "NOT_STARTED" | "RUNNING" | "FAILED" | "COMPLETED" | "DELETING" | "STOPPING" | "STOPPED" | "DELETED" | "UPDATING" | "STARTING" | "RESTARTING" | "RESUMING";
  /**
   * static ip connectivity data (default, no additional details needed).
   */
  staticIpConnectivity?: StaticIpConnectivity;
  /**
   * Required. The migration job type.
   */
  type?:  | "TYPE_UNSPECIFIED" | "ONE_TIME" | "CONTINUOUS";
  /**
   * Output only. The timestamp when the migration job resource was last
   * updated. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds.
   * Example: "2014-10-02T15:01:23.045123456Z".
   */
  readonly updateTime?: Date;
  /**
   * The details of the VPC network that the source database is located in.
   */
  vpcPeeringConnectivity?: VpcPeeringConnectivity;
}

/**
 * Error message of a verification Migration job.
 */
export interface MigrationJobVerificationError {
  /**
   * Output only. An instance of ErrorCode specifying the error that occurred.
   */
  readonly errorCode?:  | "ERROR_CODE_UNSPECIFIED" | "CONNECTION_FAILURE" | "AUTHENTICATION_FAILURE" | "INVALID_CONNECTION_PROFILE_CONFIG" | "VERSION_INCOMPATIBILITY" | "CONNECTION_PROFILE_TYPES_INCOMPATIBILITY" | "NO_PGLOGICAL_INSTALLED" | "PGLOGICAL_NODE_ALREADY_EXISTS" | "INVALID_WAL_LEVEL" | "INVALID_SHARED_PRELOAD_LIBRARY" | "INSUFFICIENT_MAX_REPLICATION_SLOTS" | "INSUFFICIENT_MAX_WAL_SENDERS" | "INSUFFICIENT_MAX_WORKER_PROCESSES" | "UNSUPPORTED_EXTENSIONS" | "UNSUPPORTED_MIGRATION_TYPE" | "INVALID_RDS_LOGICAL_REPLICATION" | "UNSUPPORTED_GTID_MODE" | "UNSUPPORTED_TABLE_DEFINITION" | "UNSUPPORTED_DEFINER" | "CANT_RESTART_RUNNING_MIGRATION" | "TABLES_WITH_LIMITED_SUPPORT";
  /**
   * Output only. A specific detailed error message, if supplied by the engine.
   */
  readonly errorDetailMessage?: string;
  /**
   * Output only. A formatted message with further details about the error and
   * a CTA.
   */
  readonly errorMessage?: string;
}

/**
 * Specifies connection parameters required specifically for MySQL databases.
 */
export interface MySqlConnectionProfile {
  /**
   * If the source is a Cloud SQL database, use this field to provide the Cloud
   * SQL instance ID of the source.
   */
  cloudSqlId?: string;
  /**
   * Required. The IP or hostname of the source MySQL database.
   */
  host?: string;
  /**
   * Required. Input only. The password for the user that Database Migration
   * Service will be using to connect to the database. This field is not
   * returned on request, and the value is encrypted when stored in Database
   * Migration Service.
   */
  password?: string;
  /**
   * Output only. Indicates If this connection profile password is stored.
   */
  readonly passwordSet?: boolean;
  /**
   * Required. The network port of the source MySQL database.
   */
  port?: number;
  /**
   * SSL configuration for the destination to connect to the source database.
   */
  ssl?: SslConfig;
  /**
   * Required. The username that Database Migration Service will use to connect
   * to the database. The value is encrypted when stored in Database Migration
   * Service.
   */
  username?: string;
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
 * Specifies connection parameters required specifically for Oracle databases.
 */
export interface OracleConnectionProfile {
  /**
   * Required. Database service for the Oracle connection.
   */
  databaseService?: string;
  /**
   * Forward SSH tunnel connectivity.
   */
  forwardSshConnectivity?: ForwardSshTunnelConnectivity;
  /**
   * Required. The IP or hostname of the source Oracle database.
   */
  host?: string;
  /**
   * Required. Input only. The password for the user that Database Migration
   * Service will be using to connect to the database. This field is not
   * returned on request, and the value is encrypted when stored in Database
   * Migration Service.
   */
  password?: string;
  /**
   * Output only. Indicates whether a new password is included in the request.
   */
  readonly passwordSet?: boolean;
  /**
   * Required. The network port of the source Oracle database.
   */
  port?: number;
  /**
   * Private connectivity.
   */
  privateConnectivity?: PrivateConnectivity;
  /**
   * Static Service IP connectivity.
   */
  staticServiceIpConnectivity?: StaticServiceIpConnectivity;
  /**
   * Required. The username that Database Migration Service will use to connect
   * to the database. The value is encrypted when stored in Database Migration
   * Service.
   */
  username?: string;
}

/**
 * Package's parent is a schema.
 */
export interface PackageEntity {
  /**
   * Custom engine specific features.
   */
  customFeatures?: {
    [key: string]: any
  };
  /**
   * The SQL code which creates the package body. If the package specification
   * has cursors or subprograms, then the package body is mandatory.
   */
  packageBody?: string;
  /**
   * The SQL code which creates the package.
   */
  packageSqlCode?: string;
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
 * Specifies connection parameters required specifically for PostgreSQL
 * databases.
 */
export interface PostgreSqlConnectionProfile {
  /**
   * If the source is a Cloud SQL database, use this field to provide the Cloud
   * SQL instance ID of the source.
   */
  cloudSqlId?: string;
  /**
   * Required. The IP or hostname of the source PostgreSQL database.
   */
  host?: string;
  /**
   * Output only. If the source is a Cloud SQL database, this field indicates
   * the network architecture it's associated with.
   */
  readonly networkArchitecture?:  | "NETWORK_ARCHITECTURE_UNSPECIFIED" | "NETWORK_ARCHITECTURE_OLD_CSQL_PRODUCER" | "NETWORK_ARCHITECTURE_NEW_CSQL_PRODUCER";
  /**
   * Required. Input only. The password for the user that Database Migration
   * Service will be using to connect to the database. This field is not
   * returned on request, and the value is encrypted when stored in Database
   * Migration Service.
   */
  password?: string;
  /**
   * Output only. Indicates If this connection profile password is stored.
   */
  readonly passwordSet?: boolean;
  /**
   * Required. The network port of the source PostgreSQL database.
   */
  port?: number;
  /**
   * Private service connect connectivity.
   */
  privateServiceConnectConnectivity?: PrivateServiceConnectConnectivity;
  /**
   * SSL configuration for the destination to connect to the source database.
   */
  ssl?: SslConfig;
  /**
   * Static ip connectivity data (default, no additional details needed).
   */
  staticIpConnectivity?: StaticIpConnectivity;
  /**
   * Required. The username that Database Migration Service will use to connect
   * to the database. The value is encrypted when stored in Database Migration
   * Service.
   */
  username?: string;
}

/**
 * Settings for the cluster's primary instance
 */
export interface PrimaryInstanceSettings {
  /**
   * Database flags to pass to AlloyDB when DMS is creating the AlloyDB cluster
   * and instances. See the AlloyDB documentation for how these can be used.
   */
  databaseFlags?: {
    [key: string]: string
  };
  /**
   * Required. The ID of the AlloyDB primary instance. The ID must satisfy the
   * regex expression "[a-z0-9-]+".
   */
  id?: string;
  /**
   * Labels for the AlloyDB primary instance created by DMS. An object
   * containing a list of 'key', 'value' pairs.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Configuration for the machines that host the underlying database engine.
   */
  machineConfig?: MachineConfig;
  /**
   * Output only. The private IP address for the Instance. This is the
   * connection endpoint for an end-user application.
   */
  readonly privateIp?: string;
}

/**
 * The PrivateConnection resource is used to establish private connectivity
 * with the customer's network.
 */
export interface PrivateConnection {
  /**
   * Output only. The create time of the resource.
   */
  readonly createTime?: Date;
  /**
   * The private connection display name.
   */
  displayName?: string;
  /**
   * Output only. The error details in case of state FAILED.
   */
  readonly error?: Status;
  /**
   * The resource labels for private connections to use to annotate any related
   * underlying resources such as Compute Engine VMs. An object containing a
   * list of "key": "value" pairs. Example: `{ "name": "wrench", "mass":
   * "1.3kg", "count": "3" }`.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The name of the resource.
   */
  name?: string;
  /**
   * Output only. The state of the private connection.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "CREATED" | "FAILED" | "DELETING" | "FAILED_TO_DELETE" | "DELETED";
  /**
   * Output only. The last update time of the resource.
   */
  readonly updateTime?: Date;
  /**
   * VPC peering configuration.
   */
  vpcPeeringConfig?: VpcPeeringConfig;
}

/**
 * Private Connectivity.
 */
export interface PrivateConnectivity {
  /**
   * Required. The resource name (URI) of the private connection.
   */
  privateConnection?: string;
}

/**
 * Private Service Connect connectivity
 * (https://cloud.google.com/vpc/docs/private-service-connect#benefits-services)
 */
export interface PrivateServiceConnectConnectivity {
  /**
   * Required. A service attachment that exposes a database, and has the
   * following format:
   * projects/{project}/regions/{region}/serviceAttachments/{service_attachment_name}
   */
  serviceAttachment?: string;
}

/**
 * Additional options for
 * dataMigration#projectsLocationsConnectionProfilesCreate.
 */
export interface ProjectsLocationsConnectionProfilesCreateOptions {
  /**
   * Required. The connection profile identifier.
   */
  connectionProfileId?: string;
  /**
   * Optional. A unique ID used to identify the request. If the server receives
   * two requests with the same ID, then the second request is ignored. It is
   * recommended to always set this value to a UUID. The ID must contain only
   * letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The
   * maximum length is 40 characters.
   */
  requestId?: string;
  /**
   * Optional. Create the connection profile without validating it. The default
   * is false. Only supported for Oracle connection profiles.
   */
  skipValidation?: boolean;
  /**
   * Optional. Only validate the connection profile, but don't create any
   * resources. The default is false. Only supported for Oracle connection
   * profiles.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * dataMigration#projectsLocationsConnectionProfilesDelete.
 */
export interface ProjectsLocationsConnectionProfilesDeleteOptions {
  /**
   * In case of force delete, the CloudSQL replica database is also deleted
   * (only for CloudSQL connection profile).
   */
  force?: boolean;
  /**
   * A unique ID used to identify the request. If the server receives two
   * requests with the same ID, then the second request is ignored. It is
   * recommended to always set this value to a UUID. The ID must contain only
   * letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The
   * maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * Additional options for
 * dataMigration#projectsLocationsConnectionProfilesGetIamPolicy.
 */
export interface ProjectsLocationsConnectionProfilesGetIamPolicyOptions {
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
 * Additional options for
 * dataMigration#projectsLocationsConnectionProfilesList.
 */
export interface ProjectsLocationsConnectionProfilesListOptions {
  /**
   * A filter expression that filters connection profiles listed in the
   * response. The expression must specify the field name, a comparison
   * operator, and the value that you want to use for filtering. The value must
   * be a string, a number, or a boolean. The comparison operator must be either
   * =, !=, >, or <. For example, list connection profiles created this year by
   * specifying **createTime %gt; 2020-01-01T00:00:00.000000000Z**. You can also
   * filter nested fields. For example, you could specify **mySql.username =
   * %lt;my_username%gt;** to list all connection profiles configured to connect
   * with a specific username.
   */
  filter?: string;
  /**
   * A comma-separated list of fields to order results according to.
   */
  orderBy?: string;
  /**
   * The maximum number of connection profiles to return. The service may
   * return fewer than this value. If unspecified, at most 50 connection
   * profiles will be returned. The maximum value is 1000; values above 1000 are
   * coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListConnectionProfiles` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListConnectionProfiles` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * dataMigration#projectsLocationsConnectionProfilesPatch.
 */
export interface ProjectsLocationsConnectionProfilesPatchOptions {
  /**
   * Optional. A unique ID used to identify the request. If the server receives
   * two requests with the same ID, then the second request is ignored. It is
   * recommended to always set this value to a UUID. The ID must contain only
   * letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The
   * maximum length is 40 characters.
   */
  requestId?: string;
  /**
   * Optional. Update the connection profile without validating it. The default
   * is false. Only supported for Oracle connection profiles.
   */
  skipValidation?: boolean;
  /**
   * Required. Field mask is used to specify the fields to be overwritten by
   * the update in the conversion workspace resource.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the connection profile, but don't update any
   * resources. The default is false. Only supported for Oracle connection
   * profiles.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsConnectionProfilesPatchOptions(data: any): ProjectsLocationsConnectionProfilesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsConnectionProfilesPatchOptions(data: any): ProjectsLocationsConnectionProfilesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * dataMigration#projectsLocationsConversionWorkspacesCreate.
 */
export interface ProjectsLocationsConversionWorkspacesCreateOptions {
  /**
   * Required. The ID of the conversion workspace to create.
   */
  conversionWorkspaceId?: string;
  /**
   * A unique ID used to identify the request. If the server receives two
   * requests with the same ID, then the second request is ignored. It is
   * recommended to always set this value to a UUID. The ID must contain only
   * letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The
   * maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * Additional options for
 * dataMigration#projectsLocationsConversionWorkspacesDelete.
 */
export interface ProjectsLocationsConversionWorkspacesDeleteOptions {
  /**
   * A unique ID used to identify the request. If the server receives two
   * requests with the same ID, then the second request is ignored. It is
   * recommended to always set this value to a UUID. The ID must contain only
   * letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The
   * maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * Additional options for
 * dataMigration#projectsLocationsConversionWorkspacesDescribeConversionWorkspaceRevisions.
 */
export interface ProjectsLocationsConversionWorkspacesDescribeConversionWorkspaceRevisionsOptions {
  /**
   * Optional. Optional filter to request a specific commit ID.
   */
  commitId?: string;
}

/**
 * Additional options for
 * dataMigration#projectsLocationsConversionWorkspacesDescribeDatabaseEntities.
 */
export interface ProjectsLocationsConversionWorkspacesDescribeDatabaseEntitiesOptions {
  /**
   * Request a specific commit ID. If not specified, the entities from the
   * latest commit are returned.
   */
  commitId?: string;
  /**
   * Filter the returned entities based on AIP-160 standard.
   */
  filter?: string;
  /**
   * The maximum number of entities to return. The service may return fewer
   * entities than the value specifies.
   */
  pageSize?: number;
  /**
   * The nextPageToken value received in the previous call to
   * conversionWorkspace.describeDatabaseEntities, used in the subsequent
   * request to retrieve the next page of results. On first call this should be
   * left blank. When paginating, all other parameters provided to
   * conversionWorkspace.describeDatabaseEntities must match the call that
   * provided the page token.
   */
  pageToken?: string;
  /**
   * The tree to fetch.
   */
  tree?:  | "DB_TREE_TYPE_UNSPECIFIED" | "SOURCE_TREE" | "DRAFT_TREE" | "DESTINATION_TREE";
  /**
   * Whether to retrieve the latest committed version of the entities or the
   * latest version. This field is ignored if a specific commit_id is specified.
   */
  uncommitted?: boolean;
}

/**
 * Additional options for
 * dataMigration#projectsLocationsConversionWorkspacesGetIamPolicy.
 */
export interface ProjectsLocationsConversionWorkspacesGetIamPolicyOptions {
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
 * Additional options for
 * dataMigration#projectsLocationsConversionWorkspacesList.
 */
export interface ProjectsLocationsConversionWorkspacesListOptions {
  /**
   * A filter expression that filters conversion workspaces listed in the
   * response. The expression must specify the field name, a comparison
   * operator, and the value that you want to use for filtering. The value must
   * be a string, a number, or a boolean. The comparison operator must be either
   * =, !=, >, or <. For example, list conversion workspaces created this year
   * by specifying **createTime %gt; 2020-01-01T00:00:00.000000000Z.** You can
   * also filter nested fields. For example, you could specify **source.version
   * = "12.c.1"** to select all conversion workspaces with source database
   * version equal to 12.c.1.
   */
  filter?: string;
  /**
   * The maximum number of conversion workspaces to return. The service may
   * return fewer than this value. If unspecified, at most 50 sets are returned.
   */
  pageSize?: number;
  /**
   * The nextPageToken value received in the previous call to
   * conversionWorkspaces.list, used in the subsequent request to retrieve the
   * next page of results. On first call this should be left blank. When
   * paginating, all other parameters provided to conversionWorkspaces.list must
   * match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * dataMigration#projectsLocationsConversionWorkspacesPatch.
 */
export interface ProjectsLocationsConversionWorkspacesPatchOptions {
  /**
   * A unique ID used to identify the request. If the server receives two
   * requests with the same ID, then the second request is ignored. It is
   * recommended to always set this value to a UUID. The ID must contain only
   * letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The
   * maximum length is 40 characters.
   */
  requestId?: string;
  /**
   * Required. Field mask is used to specify the fields to be overwritten by
   * the update in the conversion workspace resource.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsConversionWorkspacesPatchOptions(data: any): ProjectsLocationsConversionWorkspacesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsConversionWorkspacesPatchOptions(data: any): ProjectsLocationsConversionWorkspacesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * dataMigration#projectsLocationsConversionWorkspacesSearchBackgroundJobs.
 */
export interface ProjectsLocationsConversionWorkspacesSearchBackgroundJobsOptions {
  /**
   * Optional. If provided, only returns jobs that completed until (not
   * including) the given timestamp.
   */
  completedUntilTime?: Date;
  /**
   * Optional. The maximum number of jobs to return. The service may return
   * fewer than this value. If unspecified, at most 100 jobs are returned. The
   * maximum value is 100; values above 100 are coerced to 100.
   */
  maxSize?: number;
  /**
   * Optional. Whether or not to return just the most recent job per job type,
   */
  returnMostRecentPerJobType?: boolean;
}

function serializeProjectsLocationsConversionWorkspacesSearchBackgroundJobsOptions(data: any): ProjectsLocationsConversionWorkspacesSearchBackgroundJobsOptions {
  return {
    ...data,
    completedUntilTime: data["completedUntilTime"] !== undefined ? data["completedUntilTime"].toISOString() : undefined,
  };
}

function deserializeProjectsLocationsConversionWorkspacesSearchBackgroundJobsOptions(data: any): ProjectsLocationsConversionWorkspacesSearchBackgroundJobsOptions {
  return {
    ...data,
    completedUntilTime: data["completedUntilTime"] !== undefined ? new Date(data["completedUntilTime"]) : undefined,
  };
}

/**
 * Additional options for dataMigration#projectsLocationsFetchStaticIps.
 */
export interface ProjectsLocationsFetchStaticIpsOptions {
  /**
   * Maximum number of IPs to return.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `FetchStaticIps` call.
   */
  pageToken?: string;
}

/**
 * Additional options for dataMigration#projectsLocationsList.
 */
export interface ProjectsLocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like `"displayName=tokyo"`, and is documented in
   * more detail in [AIP-160](https://google.aip.dev/160).
   */
  filter?: string;
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
 * Additional options for dataMigration#projectsLocationsMigrationJobsCreate.
 */
export interface ProjectsLocationsMigrationJobsCreateOptions {
  /**
   * Required. The ID of the instance to create.
   */
  migrationJobId?: string;
  /**
   * A unique ID used to identify the request. If the server receives two
   * requests with the same ID, then the second request is ignored. It is
   * recommended to always set this value to a UUID. The ID must contain only
   * letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The
   * maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * Additional options for dataMigration#projectsLocationsMigrationJobsDelete.
 */
export interface ProjectsLocationsMigrationJobsDeleteOptions {
  /**
   * The destination CloudSQL connection profile is always deleted with the
   * migration job. In case of force delete, the destination CloudSQL replica
   * database is also deleted.
   */
  force?: boolean;
  /**
   * A unique ID used to identify the request. If the server receives two
   * requests with the same ID, then the second request is ignored. It is
   * recommended to always set this value to a UUID. The ID must contain only
   * letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The
   * maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * Additional options for
 * dataMigration#projectsLocationsMigrationJobsGetIamPolicy.
 */
export interface ProjectsLocationsMigrationJobsGetIamPolicyOptions {
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
 * Additional options for dataMigration#projectsLocationsMigrationJobsList.
 */
export interface ProjectsLocationsMigrationJobsListOptions {
  /**
   * A filter expression that filters migration jobs listed in the response.
   * The expression must specify the field name, a comparison operator, and the
   * value that you want to use for filtering. The value must be a string, a
   * number, or a boolean. The comparison operator must be either =, !=, >, or
   * <. For example, list migration jobs created this year by specifying
   * **createTime %gt; 2020-01-01T00:00:00.000000000Z.** You can also filter
   * nested fields. For example, you could specify **reverseSshConnectivity.vmIp
   * = "1.2.3.4"** to select all migration jobs connecting through the specific
   * SSH tunnel bastion.
   */
  filter?: string;
  /**
   * Sort the results based on the migration job name. Valid values are:
   * "name", "name asc", and "name desc".
   */
  orderBy?: string;
  /**
   * The maximum number of migration jobs to return. The service may return
   * fewer than this value. If unspecified, at most 50 migration jobs will be
   * returned. The maximum value is 1000; values above 1000 are coerced to 1000.
   */
  pageSize?: number;
  /**
   * The nextPageToken value received in the previous call to
   * migrationJobs.list, used in the subsequent request to retrieve the next
   * page of results. On first call this should be left blank. When paginating,
   * all other parameters provided to migrationJobs.list must match the call
   * that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for dataMigration#projectsLocationsMigrationJobsPatch.
 */
export interface ProjectsLocationsMigrationJobsPatchOptions {
  /**
   * A unique ID used to identify the request. If the server receives two
   * requests with the same ID, then the second request is ignored. It is
   * recommended to always set this value to a UUID. The ID must contain only
   * letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The
   * maximum length is 40 characters.
   */
  requestId?: string;
  /**
   * Required. Field mask is used to specify the fields to be overwritten by
   * the update in the conversion workspace resource.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsMigrationJobsPatchOptions(data: any): ProjectsLocationsMigrationJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsMigrationJobsPatchOptions(data: any): ProjectsLocationsMigrationJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for dataMigration#projectsLocationsOperationsList.
 */
export interface ProjectsLocationsOperationsListOptions {
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
 * dataMigration#projectsLocationsPrivateConnectionsCreate.
 */
export interface ProjectsLocationsPrivateConnectionsCreateOptions {
  /**
   * Required. The private connection identifier.
   */
  privateConnectionId?: string;
  /**
   * Optional. A unique ID used to identify the request. If the server receives
   * two requests with the same ID, then the second request is ignored. It is
   * recommended to always set this value to a UUID. The ID must contain only
   * letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The
   * maximum length is 40 characters.
   */
  requestId?: string;
  /**
   * Optional. If set to true, will skip validations.
   */
  skipValidation?: boolean;
}

/**
 * Additional options for
 * dataMigration#projectsLocationsPrivateConnectionsDelete.
 */
export interface ProjectsLocationsPrivateConnectionsDeleteOptions {
  /**
   * Optional. A unique ID used to identify the request. If the server receives
   * two requests with the same ID, then the second request is ignored. It is
   * recommended to always set this value to a UUID. The ID must contain only
   * letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-). The
   * maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * Additional options for
 * dataMigration#projectsLocationsPrivateConnectionsList.
 */
export interface ProjectsLocationsPrivateConnectionsListOptions {
  /**
   * A filter expression that filters private connections listed in the
   * response. The expression must specify the field name, a comparison
   * operator, and the value that you want to use for filtering. The value must
   * be a string, a number, or a boolean. The comparison operator must be either
   * =, !=, >, or <. For example, list private connections created this year by
   * specifying **createTime %gt; 2021-01-01T00:00:00.000000000Z**.
   */
  filter?: string;
  /**
   * Order by fields for the result.
   */
  orderBy?: string;
  /**
   * Maximum number of private connections to return. If unspecified, at most
   * 50 private connections that are returned. The maximum value is 1000; values
   * above 1000 are coerced to 1000.
   */
  pageSize?: number;
  /**
   * Page token received from a previous `ListPrivateConnections` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListPrivateConnections` must match the call that provided the
   * page token.
   */
  pageToken?: string;
}

/**
 * Request message for 'PromoteMigrationJob' request.
 */
export interface PromoteMigrationJobRequest {
}

/**
 * Request message for 'RestartMigrationJob' request.
 */
export interface RestartMigrationJobRequest {
}

/**
 * Request message for 'ResumeMigrationJob' request.
 */
export interface ResumeMigrationJobRequest {
}

/**
 * The details needed to configure a reverse SSH tunnel between the source and
 * destination databases. These details will be used when calling the
 * generateSshScript method (see
 * https://cloud.google.com/database-migration/docs/reference/rest/v1/projects.locations.migrationJobs/generateSshScript)
 * to produce the script that will help set up the reverse SSH tunnel, and to
 * set up the VPC peering between the Cloud SQL private network and the VPC.
 */
export interface ReverseSshConnectivity {
  /**
   * The name of the virtual machine (Compute Engine) used as the bastion
   * server for the SSH tunnel.
   */
  vm?: string;
  /**
   * Required. The IP of the virtual machine (Compute Engine) used as the
   * bastion server for the SSH tunnel.
   */
  vmIp?: string;
  /**
   * Required. The forwarding port of the virtual machine (Compute Engine) used
   * as the bastion server for the SSH tunnel.
   */
  vmPort?: number;
  /**
   * The name of the VPC to peer with the Cloud SQL private network.
   */
  vpc?: string;
}

/**
 * Request message for 'RollbackConversionWorkspace' request.
 */
export interface RollbackConversionWorkspaceRequest {
}

/**
 * Details of a single rules file.
 */
export interface RulesFile {
  /**
   * The text content of the rules that needs to be converted.
   */
  rulesContent?: string;
  /**
   * The filename of the rules that needs to be converted. The filename is used
   * mainly so that future logs of the import rules job contain it, and can
   * therefore be searched by it.
   */
  rulesSourceFilename?: string;
}

/**
 * Schema typically has no parent entity, but can have a parent entity
 * DatabaseInstance (for database engines which support it). For some database
 * engines, the terms schema and user can be used interchangeably when they
 * refer to a namespace or a collection of other database entities. Can store
 * additional information which is schema specific.
 */
export interface SchemaEntity {
  /**
   * Custom engine specific features.
   */
  customFeatures?: {
    [key: string]: any
  };
}

/**
 * Response message for 'SearchBackgroundJobs' request.
 */
export interface SearchBackgroundJobsResponse {
  /**
   * The list of conversion workspace mapping rules.
   */
  jobs?: BackgroundJobLogEntry[];
}

function serializeSearchBackgroundJobsResponse(data: any): SearchBackgroundJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (serializeBackgroundJobLogEntry(item))) : undefined,
  };
}

function deserializeSearchBackgroundJobsResponse(data: any): SearchBackgroundJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (deserializeBackgroundJobLogEntry(item))) : undefined,
  };
}

/**
 * Request message for 'SeedConversionWorkspace' request.
 */
export interface SeedConversionWorkspaceRequest {
  /**
   * Should the conversion workspace be committed automatically after the seed
   * operation.
   */
  autoCommit?: boolean;
  /**
   * Fully qualified (Uri) name of the destination connection profile.
   */
  destinationConnectionProfile?: string;
  /**
   * Fully qualified (Uri) name of the source connection profile.
   */
  sourceConnectionProfile?: string;
}

/**
 * Details regarding a Seed background job.
 */
export interface SeedJobDetails {
  /**
   * The connection profile which was used for the seed job.
   */
  connectionProfile?: string;
}

/**
 * Sequence's parent is a schema.
 */
export interface SequenceEntity {
  /**
   * Indicates number of entries to cache / precreate.
   */
  cache?: bigint;
  /**
   * Custom engine specific features.
   */
  customFeatures?: {
    [key: string]: any
  };
  /**
   * Indicates whether the sequence value should cycle through.
   */
  cycle?: boolean;
  /**
   * Increment value for the sequence.
   */
  increment?: bigint;
  /**
   * Maximum number for the sequence represented as bytes to accommodate large.
   * numbers
   */
  maxValue?: Uint8Array;
  /**
   * Minimum number for the sequence represented as bytes to accommodate large.
   * numbers
   */
  minValue?: Uint8Array;
  /**
   * Start number for the sequence represented as bytes to accommodate large.
   * numbers
   */
  startValue?: Uint8Array;
}

function serializeSequenceEntity(data: any): SequenceEntity {
  return {
    ...data,
    cache: data["cache"] !== undefined ? String(data["cache"]) : undefined,
    increment: data["increment"] !== undefined ? String(data["increment"]) : undefined,
    maxValue: data["maxValue"] !== undefined ? encodeBase64(data["maxValue"]) : undefined,
    minValue: data["minValue"] !== undefined ? encodeBase64(data["minValue"]) : undefined,
    startValue: data["startValue"] !== undefined ? encodeBase64(data["startValue"]) : undefined,
  };
}

function deserializeSequenceEntity(data: any): SequenceEntity {
  return {
    ...data,
    cache: data["cache"] !== undefined ? BigInt(data["cache"]) : undefined,
    increment: data["increment"] !== undefined ? BigInt(data["increment"]) : undefined,
    maxValue: data["maxValue"] !== undefined ? decodeBase64(data["maxValue"] as string) : undefined,
    minValue: data["minValue"] !== undefined ? decodeBase64(data["minValue"] as string) : undefined,
    startValue: data["startValue"] !== undefined ? decodeBase64(data["startValue"] as string) : undefined,
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
 * An entry for an Access Control list.
 */
export interface SqlAclEntry {
  /**
   * The time when this access control entry expires in [RFC
   * 3339](https://tools.ietf.org/html/rfc3339) format, for example:
   * `2012-11-15T16:19:00.094Z`.
   */
  expireTime?: Date;
  /**
   * A label to identify this entry.
   */
  label?: string;
  /**
   * Input only. The time-to-leave of this access control entry.
   */
  ttl?: number /* Duration */;
  /**
   * The allowlisted value for the access control list.
   */
  value?: string;
}

function serializeSqlAclEntry(data: any): SqlAclEntry {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

function deserializeSqlAclEntry(data: any): SqlAclEntry {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

/**
 * IP Management configuration.
 */
export interface SqlIpConfig {
  /**
   * The list of external networks that are allowed to connect to the instance
   * using the IP. See
   * https://en.wikipedia.org/wiki/CIDR_notation#CIDR_notation, also known as
   * 'slash' notation (e.g. `192.168.100.0/24`).
   */
  authorizedNetworks?: SqlAclEntry[];
  /**
   * Whether the instance should be assigned an IPv4 address or not.
   */
  enableIpv4?: boolean;
  /**
   * The resource link for the VPC network from which the Cloud SQL instance is
   * accessible for private IP. For example,
   * `projects/myProject/global/networks/default`. This setting can be updated,
   * but it cannot be removed after it is set.
   */
  privateNetwork?: string;
  /**
   * Whether SSL connections over IP should be enforced or not.
   */
  requireSsl?: boolean;
}

function serializeSqlIpConfig(data: any): SqlIpConfig {
  return {
    ...data,
    authorizedNetworks: data["authorizedNetworks"] !== undefined ? data["authorizedNetworks"].map((item: any) => (serializeSqlAclEntry(item))) : undefined,
  };
}

function deserializeSqlIpConfig(data: any): SqlIpConfig {
  return {
    ...data,
    authorizedNetworks: data["authorizedNetworks"] !== undefined ? data["authorizedNetworks"].map((item: any) => (deserializeSqlAclEntry(item))) : undefined,
  };
}

/**
 * Response message for 'GenerateSshScript' request.
 */
export interface SshScript {
  /**
   * The ssh configuration script.
   */
  script?: string;
}

/**
 * SSL configuration information.
 */
export interface SslConfig {
  /**
   * Required. Input only. The x509 PEM-encoded certificate of the CA that
   * signed the source database server's certificate. The replica will use this
   * certificate to verify it's connecting to the right host.
   */
  caCertificate?: string;
  /**
   * Input only. The x509 PEM-encoded certificate that will be used by the
   * replica to authenticate against the source database server.If this field is
   * used then the 'client_key' field is mandatory.
   */
  clientCertificate?: string;
  /**
   * Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key
   * associated with the Client Certificate. If this field is used then the
   * 'client_certificate' field is mandatory.
   */
  clientKey?: string;
  /**
   * Output only. The ssl config type according to 'client_key',
   * 'client_certificate' and 'ca_certificate'.
   */
  readonly type?:  | "SSL_TYPE_UNSPECIFIED" | "SERVER_ONLY" | "SERVER_CLIENT";
}

/**
 * Request message for 'StartMigrationJob' request.
 */
export interface StartMigrationJobRequest {
}

/**
 * The source database will allow incoming connections from the public IP of
 * the destination database. You can retrieve the public IP of the Cloud SQL
 * instance from the Cloud SQL console or using Cloud SQL APIs. No additional
 * configuration is required.
 */
export interface StaticIpConnectivity {
}

/**
 * Static IP address connectivity configured on service project.
 */
export interface StaticServiceIpConnectivity {
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
 * Request message for 'StopMigrationJob' request.
 */
export interface StopMigrationJobRequest {
}

/**
 * Stored procedure's parent is a schema.
 */
export interface StoredProcedureEntity {
  /**
   * Custom engine specific features.
   */
  customFeatures?: {
    [key: string]: any
  };
  /**
   * The SQL code which creates the stored procedure.
   */
  sqlCode?: string;
}

/**
 * Synonym's parent is a schema.
 */
export interface SynonymEntity {
  /**
   * Custom engine specific features.
   */
  customFeatures?: {
    [key: string]: any
  };
  /**
   * The name of the entity for which the synonym is being created (the
   * source).
   */
  sourceEntity?: string;
  /**
   * The type of the entity for which the synonym is being created (usually a
   * table or a sequence).
   */
  sourceType?:  | "DATABASE_ENTITY_TYPE_UNSPECIFIED" | "DATABASE_ENTITY_TYPE_SCHEMA" | "DATABASE_ENTITY_TYPE_TABLE" | "DATABASE_ENTITY_TYPE_COLUMN" | "DATABASE_ENTITY_TYPE_CONSTRAINT" | "DATABASE_ENTITY_TYPE_INDEX" | "DATABASE_ENTITY_TYPE_TRIGGER" | "DATABASE_ENTITY_TYPE_VIEW" | "DATABASE_ENTITY_TYPE_SEQUENCE" | "DATABASE_ENTITY_TYPE_STORED_PROCEDURE" | "DATABASE_ENTITY_TYPE_FUNCTION" | "DATABASE_ENTITY_TYPE_SYNONYM" | "DATABASE_ENTITY_TYPE_DATABASE_PACKAGE" | "DATABASE_ENTITY_TYPE_UDT" | "DATABASE_ENTITY_TYPE_MATERIAL_VIEW" | "DATABASE_ENTITY_TYPE_DATABASE";
}

/**
 * Table's parent is a schema.
 */
export interface TableEntity {
  /**
   * Table columns.
   */
  columns?: ColumnEntity[];
  /**
   * Comment associated with the table.
   */
  comment?: string;
  /**
   * Table constraints.
   */
  constraints?: ConstraintEntity[];
  /**
   * Custom engine specific features.
   */
  customFeatures?: {
    [key: string]: any
  };
  /**
   * Table indices.
   */
  indices?: IndexEntity[];
  /**
   * Table triggers.
   */
  triggers?: TriggerEntity[];
}

function serializeTableEntity(data: any): TableEntity {
  return {
    ...data,
    columns: data["columns"] !== undefined ? data["columns"].map((item: any) => (serializeColumnEntity(item))) : undefined,
  };
}

function deserializeTableEntity(data: any): TableEntity {
  return {
    ...data,
    columns: data["columns"] !== undefined ? data["columns"].map((item: any) => (deserializeColumnEntity(item))) : undefined,
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
 * Trigger is not used as an independent entity, it is retrieved as part of a
 * Table entity.
 */
export interface TriggerEntity {
  /**
   * Custom engine specific features.
   */
  customFeatures?: {
    [key: string]: any
  };
  /**
   * The name of the trigger.
   */
  name?: string;
  /**
   * The SQL code which creates the trigger.
   */
  sqlCode?: string;
  /**
   * The DML, DDL, or database events that fire the trigger, for example
   * INSERT, UPDATE.
   */
  triggeringEvents?: string[];
  /**
   * Indicates when the trigger fires, for example BEFORE STATEMENT, AFTER EACH
   * ROW.
   */
  triggerType?: string;
}

/**
 * The username/password for a database user. Used for specifying initial users
 * at cluster creation time.
 */
export interface UserPassword {
  /**
   * The initial password for the user.
   */
  password?: string;
  /**
   * Output only. Indicates if the initial_user.password field has been set.
   */
  readonly passwordSet?: boolean;
  /**
   * The database username.
   */
  user?: string;
}

/**
 * Request message for 'VerifyMigrationJob' request.
 */
export interface VerifyMigrationJobRequest {
}

/**
 * View's parent is a schema.
 */
export interface ViewEntity {
  /**
   * View constraints.
   */
  constraints?: ConstraintEntity[];
  /**
   * Custom engine specific features.
   */
  customFeatures?: {
    [key: string]: any
  };
  /**
   * The SQL code which creates the view.
   */
  sqlCode?: string;
}

/**
 * VM creation configuration message
 */
export interface VmCreationConfig {
  /**
   * The subnet name the vm needs to be created in.
   */
  subnet?: string;
  /**
   * Required. VM instance machine type to create.
   */
  vmMachineType?: string;
  /**
   * The Google Cloud Platform zone to create the VM in.
   */
  vmZone?: string;
}

/**
 * VM selection configuration message
 */
export interface VmSelectionConfig {
  /**
   * Required. The Google Cloud Platform zone the VM is located.
   */
  vmZone?: string;
}

/**
 * The VPC peering configuration is used to create VPC peering with the
 * consumer's VPC.
 */
export interface VpcPeeringConfig {
  /**
   * Required. A free subnet for peering. (CIDR of /29)
   */
  subnet?: string;
  /**
   * Required. Fully qualified name of the VPC that Database Migration Service
   * will peer to.
   */
  vpcName?: string;
}

/**
 * The details of the VPC where the source database is located in Google Cloud.
 * We will use this information to set up the VPC peering connection between
 * Cloud SQL and this VPC.
 */
export interface VpcPeeringConnectivity {
  /**
   * The name of the VPC network to peer with the Cloud SQL private network.
   */
  vpc?: string;
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
