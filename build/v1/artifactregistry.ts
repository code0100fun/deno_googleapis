// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Artifact Registry API Client for Deno
 * =====================================
 * 
 * Store and manage build artifacts in a scalable and integrated service built on Google infrastructure.
 * 
 * Docs: https://cloud.google.com/artifacts/docs/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Store and manage build artifacts in a scalable and integrated service built
 * on Google infrastructure.
 */
export class ArtifactRegistry {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://artifactregistry.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Retrieves the Settings for the Project.
   *
   * @param name Required. The name of the projectSettings resource.
   */
  async projectsGetProjectSettings(name: string): Promise<ProjectSettings> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ProjectSettings;
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
   * Retrieves the VPCSC Config for the Project.
   *
   * @param name Required. The name of the VPCSCConfig resource.
   */
  async projectsLocationsGetVpcscConfig(name: string): Promise<VPCSCConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as VPCSCConfig;
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
   * Imports Apt artifacts. The returned Operation will complete once the
   * resources are imported. Package, Version, and File resources are created
   * based on the imported artifacts. Imported artifacts that conflict with
   * existing resources are ignored.
   *
   * @param parent The name of the parent resource where the artifacts will be imported.
   */
  async projectsLocationsRepositoriesAptArtifactsImport(parent: string, req: ImportAptArtifactsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/aptArtifacts:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Directly uploads an Apt artifact. The returned Operation will complete
   * once the resources are uploaded. Package, Version, and File resources are
   * created based on the imported artifact. Imported artifacts that conflict
   * with existing resources are ignored.
   *
   * @param parent The name of the parent resource where the artifacts will be uploaded.
   */
  async projectsLocationsRepositoriesAptArtifactsUpload(parent: string, req: UploadAptArtifactRequest): Promise<UploadAptArtifactMediaResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/aptArtifacts:create`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UploadAptArtifactMediaResponse;
  }

  /**
   * Creates a repository. The returned Operation will finish once the
   * repository has been created. Its response will be the created Repository.
   *
   * @param parent Required. The name of the parent resource where the repository will be created.
   */
  async projectsLocationsRepositoriesCreate(parent: string, req: Repository, opts: ProjectsLocationsRepositoriesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/repositories`);
    if (opts.repositoryId !== undefined) {
      url.searchParams.append("repositoryId", String(opts.repositoryId));
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
   * Deletes a repository and all of its contents. The returned Operation will
   * finish once the repository has been deleted. It will not have any Operation
   * metadata and will return a google.protobuf.Empty response.
   *
   * @param name Required. The name of the repository to delete.
   */
  async projectsLocationsRepositoriesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a docker image.
   *
   * @param name Required. The name of the docker images.
   */
  async projectsLocationsRepositoriesDockerImagesGet(name: string): Promise<DockerImage> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDockerImage(data);
  }

  /**
   * Lists docker images.
   *
   * @param parent Required. The name of the parent resource whose docker images will be listed.
   */
  async projectsLocationsRepositoriesDockerImagesList(parent: string, opts: ProjectsLocationsRepositoriesDockerImagesListOptions = {}): Promise<ListDockerImagesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dockerImages`);
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
    return deserializeListDockerImagesResponse(data);
  }

  /**
   * Gets a file.
   *
   * @param name Required. The name of the file to retrieve.
   */
  async projectsLocationsRepositoriesFilesGet(name: string): Promise<GoogleDevtoolsArtifactregistryV1File> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleDevtoolsArtifactregistryV1File(data);
  }

  /**
   * Lists files.
   *
   * @param parent Required. The name of the repository whose files will be listed. For example: "projects/p1/locations/us-central1/repositories/repo1
   */
  async projectsLocationsRepositoriesFilesList(parent: string, opts: ProjectsLocationsRepositoriesFilesListOptions = {}): Promise<ListFilesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/files`);
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
    return deserializeListFilesResponse(data);
  }

  /**
   * Gets a repository.
   *
   * @param name Required. The name of the repository to retrieve.
   */
  async projectsLocationsRepositoriesGet(name: string): Promise<Repository> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Repository;
  }

  /**
   * Gets the IAM policy for a given resource.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRepositoriesGetIamPolicy(resource: string, opts: ProjectsLocationsRepositoriesGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Directly uploads a KFP artifact. The returned Operation will complete once
   * the resource is uploaded. Package, Version, and File resources will be
   * created based on the uploaded artifact. Uploaded artifacts that conflict
   * with existing resources will be overwritten.
   *
   * @param parent The resource name of the repository where the KFP artifact will be uploaded.
   */
  async projectsLocationsRepositoriesKfpArtifactsUpload(parent: string, req: UploadKfpArtifactRequest): Promise<UploadKfpArtifactMediaResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/kfpArtifacts:create`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UploadKfpArtifactMediaResponse;
  }

  /**
   * Lists repositories.
   *
   * @param parent Required. The name of the parent resource whose repositories will be listed.
   */
  async projectsLocationsRepositoriesList(parent: string, opts: ProjectsLocationsRepositoriesListOptions = {}): Promise<ListRepositoriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/repositories`);
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
    return data as ListRepositoriesResponse;
  }

  /**
   * Gets a maven artifact.
   *
   * @param name Required. The name of the maven artifact.
   */
  async projectsLocationsRepositoriesMavenArtifactsGet(name: string): Promise<MavenArtifact> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as MavenArtifact;
  }

  /**
   * Lists maven artifacts.
   *
   * @param parent Required. The name of the parent resource whose maven artifacts will be listed.
   */
  async projectsLocationsRepositoriesMavenArtifactsList(parent: string, opts: ProjectsLocationsRepositoriesMavenArtifactsListOptions = {}): Promise<ListMavenArtifactsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/mavenArtifacts`);
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
    return data as ListMavenArtifactsResponse;
  }

  /**
   * Gets a npm package.
   *
   * @param name Required. The name of the npm package.
   */
  async projectsLocationsRepositoriesNpmPackagesGet(name: string): Promise<NpmPackage> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as NpmPackage;
  }

  /**
   * Lists npm packages.
   *
   * @param parent Required. The name of the parent resource whose npm packages will be listed.
   */
  async projectsLocationsRepositoriesNpmPackagesList(parent: string, opts: ProjectsLocationsRepositoriesNpmPackagesListOptions = {}): Promise<ListNpmPackagesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/npmPackages`);
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
    return data as ListNpmPackagesResponse;
  }

  /**
   * Deletes a package and all of its versions and tags. The returned operation
   * will complete once the package has been deleted.
   *
   * @param name Required. The name of the package to delete.
   */
  async projectsLocationsRepositoriesPackagesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a package.
   *
   * @param name Required. The name of the package to retrieve.
   */
  async projectsLocationsRepositoriesPackagesGet(name: string): Promise<Package> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePackage(data);
  }

  /**
   * Lists packages.
   *
   * @param parent Required. The name of the parent resource whose packages will be listed.
   */
  async projectsLocationsRepositoriesPackagesList(parent: string, opts: ProjectsLocationsRepositoriesPackagesListOptions = {}): Promise<ListPackagesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/packages`);
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
    return deserializeListPackagesResponse(data);
  }

  /**
   * Creates a tag.
   *
   * @param parent The name of the parent resource where the tag will be created.
   */
  async projectsLocationsRepositoriesPackagesTagsCreate(parent: string, req: Tag, opts: ProjectsLocationsRepositoriesPackagesTagsCreateOptions = {}): Promise<Tag> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tags`);
    if (opts.tagId !== undefined) {
      url.searchParams.append("tagId", String(opts.tagId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Tag;
  }

  /**
   * Deletes a tag.
   *
   * @param name The name of the tag to delete.
   */
  async projectsLocationsRepositoriesPackagesTagsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a tag.
   *
   * @param name The name of the tag to retrieve.
   */
  async projectsLocationsRepositoriesPackagesTagsGet(name: string): Promise<Tag> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Tag;
  }

  /**
   * Lists tags.
   *
   * @param parent The name of the parent resource whose tags will be listed.
   */
  async projectsLocationsRepositoriesPackagesTagsList(parent: string, opts: ProjectsLocationsRepositoriesPackagesTagsListOptions = {}): Promise<ListTagsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tags`);
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
    return data as ListTagsResponse;
  }

  /**
   * Updates a tag.
   *
   * @param name The name of the tag, for example: "projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/tags/tag1". If the package part contains slashes, the slashes are escaped. The tag part can only have characters in [a-zA-Z0-9\-._~:@], anything else must be URL encoded.
   */
  async projectsLocationsRepositoriesPackagesTagsPatch(name: string, req: Tag, opts: ProjectsLocationsRepositoriesPackagesTagsPatchOptions = {}): Promise<Tag> {
    opts = serializeProjectsLocationsRepositoriesPackagesTagsPatchOptions(opts);
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
    return data as Tag;
  }

  /**
   * Deletes a version and all of its content. The returned operation will
   * complete once the version has been deleted.
   *
   * @param name The name of the version to delete.
   */
  async projectsLocationsRepositoriesPackagesVersionsDelete(name: string, opts: ProjectsLocationsRepositoriesPackagesVersionsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a version
   *
   * @param name The name of the version to retrieve.
   */
  async projectsLocationsRepositoriesPackagesVersionsGet(name: string, opts: ProjectsLocationsRepositoriesPackagesVersionsGetOptions = {}): Promise<Version> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVersion(data);
  }

  /**
   * Lists versions.
   *
   * @param parent The name of the parent resource whose versions will be listed.
   */
  async projectsLocationsRepositoriesPackagesVersionsList(parent: string, opts: ProjectsLocationsRepositoriesPackagesVersionsListOptions = {}): Promise<ListVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/versions`);
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListVersionsResponse(data);
  }

  /**
   * Updates a repository.
   *
   * @param name The name of the repository, for example: "projects/p1/locations/us-central1/repositories/repo1".
   */
  async projectsLocationsRepositoriesPatch(name: string, req: Repository, opts: ProjectsLocationsRepositoriesPatchOptions = {}): Promise<Repository> {
    opts = serializeProjectsLocationsRepositoriesPatchOptions(opts);
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
    return data as Repository;
  }

  /**
   * Gets a python package.
   *
   * @param name Required. The name of the python package.
   */
  async projectsLocationsRepositoriesPythonPackagesGet(name: string): Promise<PythonPackage> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PythonPackage;
  }

  /**
   * Lists python packages.
   *
   * @param parent Required. The name of the parent resource whose python packages will be listed.
   */
  async projectsLocationsRepositoriesPythonPackagesList(parent: string, opts: ProjectsLocationsRepositoriesPythonPackagesListOptions = {}): Promise<ListPythonPackagesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/pythonPackages`);
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
    return data as ListPythonPackagesResponse;
  }

  /**
   * Updates the IAM policy for a given resource.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRepositoriesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Tests if the caller has a list of permissions on a resource.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRepositoriesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Imports Yum (RPM) artifacts. The returned Operation will complete once the
   * resources are imported. Package, Version, and File resources are created
   * based on the imported artifacts. Imported artifacts that conflict with
   * existing resources are ignored.
   *
   * @param parent The name of the parent resource where the artifacts will be imported.
   */
  async projectsLocationsRepositoriesYumArtifactsImport(parent: string, req: ImportYumArtifactsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/yumArtifacts:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Directly uploads a Yum artifact. The returned Operation will complete once
   * the resources are uploaded. Package, Version, and File resources are
   * created based on the imported artifact. Imported artifacts that conflict
   * with existing resources are ignored.
   *
   * @param parent The name of the parent resource where the artifacts will be uploaded.
   */
  async projectsLocationsRepositoriesYumArtifactsUpload(parent: string, req: UploadYumArtifactRequest): Promise<UploadYumArtifactMediaResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/yumArtifacts:create`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UploadYumArtifactMediaResponse;
  }

  /**
   * Updates the VPCSC Config for the Project.
   *
   * @param name The name of the project's VPC SC Config. Always of the form: projects/{projectID}/locations/{location}/vpcscConfig In update request: never set In response: always set
   */
  async projectsLocationsUpdateVpcscConfig(name: string, req: VPCSCConfig, opts: ProjectsLocationsUpdateVpcscConfigOptions = {}): Promise<VPCSCConfig> {
    opts = serializeProjectsLocationsUpdateVpcscConfigOptions(opts);
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
    return data as VPCSCConfig;
  }

  /**
   * Updates the Settings for the Project.
   *
   * @param name The name of the project's settings. Always of the form: projects/{project-id}/projectSettings In update request: never set In response: always set
   */
  async projectsUpdateProjectSettings(name: string, req: ProjectSettings, opts: ProjectsUpdateProjectSettingsOptions = {}): Promise<ProjectSettings> {
    opts = serializeProjectsUpdateProjectSettingsOptions(opts);
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
    return data as ProjectSettings;
  }
}

/**
 * A detailed representation of an Apt artifact. Information in the record is
 * derived from the archive's control file. See
 * https://www.debian.org/doc/debian-policy/ch-controlfields.html
 */
export interface AptArtifact {
  /**
   * Output only. Operating system architecture of the artifact.
   */
  readonly architecture?: string;
  /**
   * Output only. Repository component of the artifact.
   */
  readonly component?: string;
  /**
   * Output only. Contents of the artifact's control metadata file.
   */
  readonly controlFile?: Uint8Array;
  /**
   * Output only. The Artifact Registry resource name of the artifact.
   */
  readonly name?: string;
  /**
   * Output only. The Apt package name of the artifact.
   */
  readonly packageName?: string;
  /**
   * Output only. An artifact is a binary or source package.
   */
  readonly packageType?:  | "PACKAGE_TYPE_UNSPECIFIED" | "BINARY" | "SOURCE";
}

/**
 * The metadata of an LRO from deleting multiple versions.
 */
export interface BatchDeleteVersionsMetadata {
  /**
   * The versions the operation failed to delete.
   */
  failedVersions?: string[];
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
 * DockerImage represents a docker artifact. The following fields are returned
 * as untyped metadata in the Version resource, using camelcase keys (i.e.
 * metadata.imageSizeBytes): * imageSizeBytes * mediaType * buildTime
 */
export interface DockerImage {
  /**
   * The time this image was built. This field is returned as the
   * 'metadata.buildTime' field in the Version resource. The build time is
   * returned to the client as an RFC 3339 string, which can be easily used with
   * the JavaScript Date constructor.
   */
  buildTime?: Date;
  /**
   * Calculated size of the image. This field is returned as the
   * 'metadata.imageSizeBytes' field in the Version resource.
   */
  imageSizeBytes?: bigint;
  /**
   * Media type of this image, e.g.
   * "application/vnd.docker.distribution.manifest.v2+json". This field is
   * returned as the 'metadata.mediaType' field in the Version resource.
   */
  mediaType?: string;
  /**
   * Required. registry_location, project_id, repository_name and image id
   * forms a unique image name:`projects//locations//repository//dockerImages/`.
   * For example,
   * "projects/test-project/locations/us-west4/repositories/test-repo/dockerImages/
   * nginx@sha256:e9954c1fc875017be1c3e36eca16be2d9e9bccc4bf072163515467d6a823c7cf",
   * where "us-west4" is the registry_location, "test-project" is the
   * project_id, "test-repo" is the repository_name and
   * "nginx@sha256:e9954c1fc875017be1c3e36eca16be2d9e9bccc4bf072163515467d6a823c7cf"
   * is the image's digest.
   */
  name?: string;
  /**
   * Tags attached to this image.
   */
  tags?: string[];
  /**
   * Output only. The time when the docker image was last updated.
   */
  readonly updateTime?: Date;
  /**
   * Time the image was uploaded.
   */
  uploadTime?: Date;
  /**
   * Required. URL to access the image. Example:
   * us-west4-docker.pkg.dev/test-project/test-repo/nginx@sha256:e9954c1fc875017be1c3e36eca16be2d9e9bccc4bf072163515467d6a823c7cf
   */
  uri?: string;
}

function serializeDockerImage(data: any): DockerImage {
  return {
    ...data,
    buildTime: data["buildTime"] !== undefined ? data["buildTime"].toISOString() : undefined,
    imageSizeBytes: data["imageSizeBytes"] !== undefined ? String(data["imageSizeBytes"]) : undefined,
    uploadTime: data["uploadTime"] !== undefined ? data["uploadTime"].toISOString() : undefined,
  };
}

function deserializeDockerImage(data: any): DockerImage {
  return {
    ...data,
    buildTime: data["buildTime"] !== undefined ? new Date(data["buildTime"]) : undefined,
    imageSizeBytes: data["imageSizeBytes"] !== undefined ? BigInt(data["imageSizeBytes"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    uploadTime: data["uploadTime"] !== undefined ? new Date(data["uploadTime"]) : undefined,
  };
}

/**
 * Configuration for a Docker remote repository.
 */
export interface DockerRepository {
  /**
   * One of the publicly available Docker repositories supported by Artifact
   * Registry.
   */
  publicRepository?:  | "PUBLIC_REPOSITORY_UNSPECIFIED" | "DOCKER_HUB";
}

/**
 * DockerRepositoryConfig is docker related repository details. Provides
 * additional configuration details for repositories of the docker format type.
 */
export interface DockerRepositoryConfig {
  /**
   * The repository which enabled this flag prevents all tags from being
   * modified, moved or deleted. This does not prevent tags from being created.
   */
  immutableTags?: boolean;
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
 * Files store content that is potentially associated with Packages or
 * Versions.
 */
export interface GoogleDevtoolsArtifactregistryV1File {
  /**
   * Output only. The time when the File was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time when the last attempt to refresh the file's data was
   * made. Only set when the repository is remote.
   */
  readonly fetchTime?: Date;
  /**
   * The hashes of the file content.
   */
  hashes?: Hash[];
  /**
   * The name of the file, for example:
   * "projects/p1/locations/us-central1/repositories/repo1/files/a%2Fb%2Fc.txt".
   * If the file ID part contains slashes, they are escaped.
   */
  name?: string;
  /**
   * The name of the Package or Version that owns this file, if any.
   */
  owner?: string;
  /**
   * The size of the File in bytes.
   */
  sizeBytes?: bigint;
  /**
   * Output only. The time when the File was last updated.
   */
  readonly updateTime?: Date;
}

function serializeGoogleDevtoolsArtifactregistryV1File(data: any): GoogleDevtoolsArtifactregistryV1File {
  return {
    ...data,
    hashes: data["hashes"] !== undefined ? data["hashes"].map((item: any) => (serializeHash(item))) : undefined,
    sizeBytes: data["sizeBytes"] !== undefined ? String(data["sizeBytes"]) : undefined,
  };
}

function deserializeGoogleDevtoolsArtifactregistryV1File(data: any): GoogleDevtoolsArtifactregistryV1File {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    fetchTime: data["fetchTime"] !== undefined ? new Date(data["fetchTime"]) : undefined,
    hashes: data["hashes"] !== undefined ? data["hashes"].map((item: any) => (deserializeHash(item))) : undefined,
    sizeBytes: data["sizeBytes"] !== undefined ? BigInt(data["sizeBytes"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A hash of file content.
 */
export interface Hash {
  /**
   * The algorithm used to compute the hash value.
   */
  type?:  | "HASH_TYPE_UNSPECIFIED" | "SHA256" | "MD5";
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
 * Error information explaining why a package was not imported.
 */
export interface ImportAptArtifactsErrorInfo {
  /**
   * The detailed error status.
   */
  error?: Status;
  /**
   * Google Cloud Storage location requested.
   */
  gcsSource?: ImportAptArtifactsGcsSource;
}

/**
 * Google Cloud Storage location where the artifacts currently reside.
 */
export interface ImportAptArtifactsGcsSource {
  /**
   * Cloud Storage paths URI (e.g., gs://my_bucket//my_object).
   */
  uris?: string[];
  /**
   * Supports URI wildcards for matching multiple objects from a single URI.
   */
  useWildcards?: boolean;
}

/**
 * The operation metadata for importing artifacts.
 */
export interface ImportAptArtifactsMetadata {
}

/**
 * The request to import new apt artifacts.
 */
export interface ImportAptArtifactsRequest {
  /**
   * Google Cloud Storage location where input content is located.
   */
  gcsSource?: ImportAptArtifactsGcsSource;
}

/**
 * The response message from importing APT artifacts.
 */
export interface ImportAptArtifactsResponse {
  /**
   * The Apt artifacts imported.
   */
  aptArtifacts?: AptArtifact[];
  /**
   * Detailed error info for packages that were not imported.
   */
  errors?: ImportAptArtifactsErrorInfo[];
}

/**
 * Error information explaining why a package was not imported.
 */
export interface ImportYumArtifactsErrorInfo {
  /**
   * The detailed error status.
   */
  error?: Status;
  /**
   * Google Cloud Storage location requested.
   */
  gcsSource?: ImportYumArtifactsGcsSource;
}

/**
 * Google Cloud Storage location where the artifacts currently reside.
 */
export interface ImportYumArtifactsGcsSource {
  /**
   * Cloud Storage paths URI (e.g., gs://my_bucket//my_object).
   */
  uris?: string[];
  /**
   * Supports URI wildcards for matching multiple objects from a single URI.
   */
  useWildcards?: boolean;
}

/**
 * The operation metadata for importing artifacts.
 */
export interface ImportYumArtifactsMetadata {
}

/**
 * The request to import new yum artifacts.
 */
export interface ImportYumArtifactsRequest {
  /**
   * Google Cloud Storage location where input content is located.
   */
  gcsSource?: ImportYumArtifactsGcsSource;
}

/**
 * The response message from importing YUM artifacts.
 */
export interface ImportYumArtifactsResponse {
  /**
   * Detailed error info for packages that were not imported.
   */
  errors?: ImportYumArtifactsErrorInfo[];
  /**
   * The yum artifacts imported.
   */
  yumArtifacts?: YumArtifact[];
}

/**
 * A detailed representation of a GooGet artifact.
 */
export interface KfpArtifact {
  /**
   * Output only. Resource name of the KFP artifact. Since users don't directly
   * interact with this resource, the name will be derived from the associated
   * version. For example, when version = ".../versions/sha256:abcdef...", the
   * name will be ".../kfpArtifacts/sha256:abcdef...".
   */
  readonly name?: string;
  /**
   * The version associated with the KFP artifact. Must follow the Semantic
   * Versioning standard.
   */
  version?: string;
}

/**
 * The response from listing docker images.
 */
export interface ListDockerImagesResponse {
  /**
   * The docker images returned.
   */
  dockerImages?: DockerImage[];
  /**
   * The token to retrieve the next page of artifacts, or empty if there are no
   * more artifacts to return.
   */
  nextPageToken?: string;
}

function serializeListDockerImagesResponse(data: any): ListDockerImagesResponse {
  return {
    ...data,
    dockerImages: data["dockerImages"] !== undefined ? data["dockerImages"].map((item: any) => (serializeDockerImage(item))) : undefined,
  };
}

function deserializeListDockerImagesResponse(data: any): ListDockerImagesResponse {
  return {
    ...data,
    dockerImages: data["dockerImages"] !== undefined ? data["dockerImages"].map((item: any) => (deserializeDockerImage(item))) : undefined,
  };
}

/**
 * The response from listing files.
 */
export interface ListFilesResponse {
  /**
   * The files returned.
   */
  files?: GoogleDevtoolsArtifactregistryV1File[];
  /**
   * The token to retrieve the next page of files, or empty if there are no
   * more files to return.
   */
  nextPageToken?: string;
}

function serializeListFilesResponse(data: any): ListFilesResponse {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (serializeGoogleDevtoolsArtifactregistryV1File(item))) : undefined,
  };
}

function deserializeListFilesResponse(data: any): ListFilesResponse {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (deserializeGoogleDevtoolsArtifactregistryV1File(item))) : undefined,
  };
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
 * The response from listing maven artifacts.
 */
export interface ListMavenArtifactsResponse {
  /**
   * The maven artifacts returned.
   */
  mavenArtifacts?: MavenArtifact[];
  /**
   * The token to retrieve the next page of artifacts, or empty if there are no
   * more artifacts to return.
   */
  nextPageToken?: string;
}

/**
 * The response from listing npm packages.
 */
export interface ListNpmPackagesResponse {
  /**
   * The token to retrieve the next page of artifacts, or empty if there are no
   * more artifacts to return.
   */
  nextPageToken?: string;
  /**
   * The npm packages returned.
   */
  npmPackages?: NpmPackage[];
}

/**
 * The response from listing packages.
 */
export interface ListPackagesResponse {
  /**
   * The token to retrieve the next page of packages, or empty if there are no
   * more packages to return.
   */
  nextPageToken?: string;
  /**
   * The packages returned.
   */
  packages?: Package[];
}

function serializeListPackagesResponse(data: any): ListPackagesResponse {
  return {
    ...data,
    packages: data["packages"] !== undefined ? data["packages"].map((item: any) => (serializePackage(item))) : undefined,
  };
}

function deserializeListPackagesResponse(data: any): ListPackagesResponse {
  return {
    ...data,
    packages: data["packages"] !== undefined ? data["packages"].map((item: any) => (deserializePackage(item))) : undefined,
  };
}

/**
 * The response from listing python packages.
 */
export interface ListPythonPackagesResponse {
  /**
   * The token to retrieve the next page of artifacts, or empty if there are no
   * more artifacts to return.
   */
  nextPageToken?: string;
  /**
   * The python packages returned.
   */
  pythonPackages?: PythonPackage[];
}

/**
 * The response from listing repositories.
 */
export interface ListRepositoriesResponse {
  /**
   * The token to retrieve the next page of repositories, or empty if there are
   * no more repositories to return.
   */
  nextPageToken?: string;
  /**
   * The repositories returned.
   */
  repositories?: Repository[];
}

/**
 * The response from listing tags.
 */
export interface ListTagsResponse {
  /**
   * The token to retrieve the next page of tags, or empty if there are no more
   * tags to return.
   */
  nextPageToken?: string;
  /**
   * The tags returned.
   */
  tags?: Tag[];
}

/**
 * The response from listing versions.
 */
export interface ListVersionsResponse {
  /**
   * The token to retrieve the next page of versions, or empty if there are no
   * more versions to return.
   */
  nextPageToken?: string;
  /**
   * The versions returned.
   */
  versions?: Version[];
}

function serializeListVersionsResponse(data: any): ListVersionsResponse {
  return {
    ...data,
    versions: data["versions"] !== undefined ? data["versions"].map((item: any) => (serializeVersion(item))) : undefined,
  };
}

function deserializeListVersionsResponse(data: any): ListVersionsResponse {
  return {
    ...data,
    versions: data["versions"] !== undefined ? data["versions"].map((item: any) => (deserializeVersion(item))) : undefined,
  };
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
 * MavenArtifact represents a maven artifact.
 */
export interface MavenArtifact {
  /**
   * Artifact ID for the artifact.
   */
  artifactId?: string;
  /**
   * Output only. Time the artifact was created.
   */
  readonly createTime?: Date;
  /**
   * Group ID for the artifact. Example: com.google.guava
   */
  groupId?: string;
  /**
   * Required. registry_location, project_id, repository_name and
   * maven_artifact forms a unique artifact For example,
   * "projects/test-project/locations/us-west4/repositories/test-repo/mavenArtifacts/
   * com.google.guava:guava:31.0-jre", where "us-west4" is the
   * registry_location, "test-project" is the project_id, "test-repo" is the
   * repository_name and "com.google.guava:guava:31.0-jre" is the maven
   * artifact.
   */
  name?: string;
  /**
   * Required. URL to access the pom file of the artifact. Example:
   * us-west4-maven.pkg.dev/test-project/test-repo/com/google/guava/guava/31.0/guava-31.0.pom
   */
  pomUri?: string;
  /**
   * Output only. Time the artifact was updated.
   */
  readonly updateTime?: Date;
  /**
   * Version of this artifact.
   */
  version?: string;
}

/**
 * Configuration for a Maven remote repository.
 */
export interface MavenRepository {
  /**
   * One of the publicly available Maven repositories supported by Artifact
   * Registry.
   */
  publicRepository?:  | "PUBLIC_REPOSITORY_UNSPECIFIED" | "MAVEN_CENTRAL";
}

/**
 * MavenRepositoryConfig is maven related repository details. Provides
 * additional configuration details for repositories of the maven format type.
 */
export interface MavenRepositoryConfig {
  /**
   * The repository with this flag will allow publishing the same snapshot
   * versions.
   */
  allowSnapshotOverwrites?: boolean;
  /**
   * Version policy defines the versions that the registry will accept.
   */
  versionPolicy?:  | "VERSION_POLICY_UNSPECIFIED" | "RELEASE" | "SNAPSHOT";
}

/**
 * NpmPackage represents an npm artifact.
 */
export interface NpmPackage {
  /**
   * Output only. Time the package was created.
   */
  readonly createTime?: Date;
  /**
   * Required. registry_location, project_id, repository_name and npm_package
   * forms a unique package For example,
   * "projects/test-project/locations/us-west4/repositories/test-repo/npmPackages/
   * npm_test:1.0.0", where "us-west4" is the registry_location, "test-project"
   * is the project_id, "test-repo" is the repository_name and npm_test:1.0.0"
   * is the npm package.
   */
  name?: string;
  /**
   * Package for the artifact.
   */
  packageName?: string;
  /**
   * Tags attached to this package.
   */
  tags?: string[];
  /**
   * Output only. Time the package was updated.
   */
  readonly updateTime?: Date;
  /**
   * Version of this package.
   */
  version?: string;
}

/**
 * Configuration for a Npm remote repository.
 */
export interface NpmRepository {
  /**
   * One of the publicly available Npm repositories supported by Artifact
   * Registry.
   */
  publicRepository?:  | "PUBLIC_REPOSITORY_UNSPECIFIED" | "NPMJS";
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
 * Metadata type for longrunning-operations, currently empty.
 */
export interface OperationMetadata {
}

/**
 * Packages are named collections of versions.
 */
export interface Package {
  /**
   * The time when the package was created.
   */
  createTime?: Date;
  /**
   * The display name of the package.
   */
  displayName?: string;
  /**
   * The name of the package, for example:
   * "projects/p1/locations/us-central1/repositories/repo1/packages/pkg1". If
   * the package ID part contains slashes, the slashes are escaped.
   */
  name?: string;
  /**
   * The time when the package was last updated. This includes publishing a new
   * version of the package.
   */
  updateTime?: Date;
}

function serializePackage(data: any): Package {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializePackage(data: any): Package {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
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
 * The Artifact Registry settings that apply to a Project.
 */
export interface ProjectSettings {
  /**
   * The redirection state of the legacy repositories in this project.
   */
  legacyRedirectionState?:  | "REDIRECTION_STATE_UNSPECIFIED" | "REDIRECTION_FROM_GCR_IO_DISABLED" | "REDIRECTION_FROM_GCR_IO_ENABLED" | "REDIRECTION_FROM_GCR_IO_FINALIZED";
  /**
   * The name of the project's settings. Always of the form:
   * projects/{project-id}/projectSettings In update request: never set In
   * response: always set
   */
  name?: string;
}

/**
 * Additional options for ArtifactRegistry#projectsLocationsList.
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
 * Additional options for ArtifactRegistry#projectsLocationsRepositoriesCreate.
 */
export interface ProjectsLocationsRepositoriesCreateOptions {
  /**
   * The repository id to use for this repository.
   */
  repositoryId?: string;
}

/**
 * Additional options for
 * ArtifactRegistry#projectsLocationsRepositoriesDockerImagesList.
 */
export interface ProjectsLocationsRepositoriesDockerImagesListOptions {
  /**
   * The field to order the results by.
   */
  orderBy?: string;
  /**
   * The maximum number of artifacts to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ArtifactRegistry#projectsLocationsRepositoriesFilesList.
 */
export interface ProjectsLocationsRepositoriesFilesListOptions {
  /**
   * An expression for filtering the results of the request. Filter rules are
   * case insensitive. The fields eligible for filtering are: * `name` * `owner`
   * An example of using a filter: *
   * `name="projects/p1/locations/us-central1/repositories/repo1/files/a/b/*"`
   * --> Files with an ID starting with "a/b/". *
   * `owner="projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/1.0"`
   * --> Files owned by the version `1.0` in package `pkg1`.
   */
  filter?: string;
  /**
   * The field to order the results by.
   */
  orderBy?: string;
  /**
   * The maximum number of files to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ArtifactRegistry#projectsLocationsRepositoriesGetIamPolicy.
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
 * Additional options for ArtifactRegistry#projectsLocationsRepositoriesList.
 */
export interface ProjectsLocationsRepositoriesListOptions {
  /**
   * The maximum number of repositories to return. Maximum page size is 1,000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ArtifactRegistry#projectsLocationsRepositoriesMavenArtifactsList.
 */
export interface ProjectsLocationsRepositoriesMavenArtifactsListOptions {
  /**
   * The maximum number of artifacts to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ArtifactRegistry#projectsLocationsRepositoriesNpmPackagesList.
 */
export interface ProjectsLocationsRepositoriesNpmPackagesListOptions {
  /**
   * The maximum number of artifacts to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ArtifactRegistry#projectsLocationsRepositoriesPackagesList.
 */
export interface ProjectsLocationsRepositoriesPackagesListOptions {
  /**
   * The maximum number of packages to return. Maximum page size is 1,000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ArtifactRegistry#projectsLocationsRepositoriesPackagesTagsCreate.
 */
export interface ProjectsLocationsRepositoriesPackagesTagsCreateOptions {
  /**
   * The tag id to use for this repository.
   */
  tagId?: string;
}

/**
 * Additional options for
 * ArtifactRegistry#projectsLocationsRepositoriesPackagesTagsList.
 */
export interface ProjectsLocationsRepositoriesPackagesTagsListOptions {
  /**
   * An expression for filtering the results of the request. Filter rules are
   * case insensitive. The fields eligible for filtering are: * `version` An
   * example of using a filter: *
   * `version="projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/1.0"`
   * --> Tags that are applied to the version `1.0` in package `pkg1`.
   */
  filter?: string;
  /**
   * The maximum number of tags to return. Maximum page size is 10,000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ArtifactRegistry#projectsLocationsRepositoriesPackagesTagsPatch.
 */
export interface ProjectsLocationsRepositoriesPackagesTagsPatchOptions {
  /**
   * The update mask applies to the resource. For the `FieldMask` definition,
   * see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsRepositoriesPackagesTagsPatchOptions(data: any): ProjectsLocationsRepositoriesPackagesTagsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsRepositoriesPackagesTagsPatchOptions(data: any): ProjectsLocationsRepositoriesPackagesTagsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * ArtifactRegistry#projectsLocationsRepositoriesPackagesVersionsDelete.
 */
export interface ProjectsLocationsRepositoriesPackagesVersionsDeleteOptions {
  /**
   * By default, a version that is tagged may not be deleted. If force=true,
   * the version and any tags pointing to the version are deleted.
   */
  force?: boolean;
}

/**
 * Additional options for
 * ArtifactRegistry#projectsLocationsRepositoriesPackagesVersionsGet.
 */
export interface ProjectsLocationsRepositoriesPackagesVersionsGetOptions {
  /**
   * The view that should be returned in the response.
   */
  view?:  | "VERSION_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for
 * ArtifactRegistry#projectsLocationsRepositoriesPackagesVersionsList.
 */
export interface ProjectsLocationsRepositoriesPackagesVersionsListOptions {
  /**
   * Optional. The field to order the results by.
   */
  orderBy?: string;
  /**
   * The maximum number of versions to return. Maximum page size is 1,000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request, if any.
   */
  pageToken?: string;
  /**
   * The view that should be returned in the response.
   */
  view?:  | "VERSION_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for ArtifactRegistry#projectsLocationsRepositoriesPatch.
 */
export interface ProjectsLocationsRepositoriesPatchOptions {
  /**
   * The update mask applies to the resource. For the `FieldMask` definition,
   * see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
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
 * ArtifactRegistry#projectsLocationsRepositoriesPythonPackagesList.
 */
export interface ProjectsLocationsRepositoriesPythonPackagesListOptions {
  /**
   * The maximum number of artifacts to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for ArtifactRegistry#projectsLocationsUpdateVpcscConfig.
 */
export interface ProjectsLocationsUpdateVpcscConfigOptions {
  /**
   * Field mask to support partial updates.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsUpdateVpcscConfigOptions(data: any): ProjectsLocationsUpdateVpcscConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsUpdateVpcscConfigOptions(data: any): ProjectsLocationsUpdateVpcscConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for ArtifactRegistry#projectsUpdateProjectSettings.
 */
export interface ProjectsUpdateProjectSettingsOptions {
  /**
   * Field mask to support partial updates.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsUpdateProjectSettingsOptions(data: any): ProjectsUpdateProjectSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsUpdateProjectSettingsOptions(data: any): ProjectsUpdateProjectSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * PythonPackage represents a python artifact.
 */
export interface PythonPackage {
  /**
   * Output only. Time the package was created.
   */
  readonly createTime?: Date;
  /**
   * Required. registry_location, project_id, repository_name and
   * python_package forms a unique package
   * name:`projects//locations//repository//pythonPackages/`. For example,
   * "projects/test-project/locations/us-west4/repositories/test-repo/pythonPackages/
   * python_package:1.0.0", where "us-west4" is the registry_location,
   * "test-project" is the project_id, "test-repo" is the repository_name and
   * python_package:1.0.0" is the python package.
   */
  name?: string;
  /**
   * Package for the artifact.
   */
  packageName?: string;
  /**
   * Output only. Time the package was updated.
   */
  readonly updateTime?: Date;
  /**
   * Required. URL to access the package. Example:
   * us-west4-python.pkg.dev/test-project/test-repo/python_package/file-name-1.0.0.tar.gz
   */
  uri?: string;
  /**
   * Version of this package.
   */
  version?: string;
}

/**
 * Configuration for a Python remote repository.
 */
export interface PythonRepository {
  /**
   * One of the publicly available Python repositories supported by Artifact
   * Registry.
   */
  publicRepository?:  | "PUBLIC_REPOSITORY_UNSPECIFIED" | "PYPI";
}

/**
 * Remote repository configuration.
 */
export interface RemoteRepositoryConfig {
  /**
   * The description of the remote source.
   */
  description?: string;
  /**
   * Specific settings for a Docker remote repository.
   */
  dockerRepository?: DockerRepository;
  /**
   * Specific settings for a Maven remote repository.
   */
  mavenRepository?: MavenRepository;
  /**
   * Specific settings for an Npm remote repository.
   */
  npmRepository?: NpmRepository;
  /**
   * Specific settings for a Python remote repository.
   */
  pythonRepository?: PythonRepository;
}

/**
 * A Repository for storing artifacts with a specific format.
 */
export interface Repository {
  /**
   * Output only. The time when the repository was created.
   */
  readonly createTime?: Date;
  /**
   * The user-provided description of the repository.
   */
  description?: string;
  /**
   * Docker repository config contains repository level configuration for the
   * repositories of docker type.
   */
  dockerConfig?: DockerRepositoryConfig;
  /**
   * The format of packages that are stored in the repository.
   */
  format?:  | "FORMAT_UNSPECIFIED" | "DOCKER" | "MAVEN" | "NPM" | "APT" | "YUM" | "PYTHON" | "KFP";
  /**
   * The Cloud KMS resource name of the customer managed encryption key that's
   * used to encrypt the contents of the Repository. Has the form:
   * `projects/my-project/locations/my-region/keyRings/my-kr/cryptoKeys/my-key`.
   * This value may not be changed after the Repository has been created.
   */
  kmsKeyName?: string;
  /**
   * Labels with user-defined metadata. This field may contain up to 64
   * entries. Label keys and values may be no longer than 63 characters. Label
   * keys must begin with a lowercase letter and may only contain lowercase
   * letters, numeric characters, underscores, and dashes.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Maven repository config contains repository level configuration for the
   * repositories of maven type.
   */
  mavenConfig?: MavenRepositoryConfig;
  /**
   * The mode of the repository.
   */
  mode?:  | "MODE_UNSPECIFIED" | "STANDARD_REPOSITORY" | "VIRTUAL_REPOSITORY" | "REMOTE_REPOSITORY";
  /**
   * The name of the repository, for example:
   * "projects/p1/locations/us-central1/repositories/repo1".
   */
  name?: string;
  /**
   * Configuration specific for a Remote Repository.
   */
  remoteRepositoryConfig?: RemoteRepositoryConfig;
  /**
   * Output only. If set, the repository satisfies physical zone separation.
   */
  readonly satisfiesPzs?: boolean;
  /**
   * Output only. The size, in bytes, of all artifact storage in this
   * repository. Repositories that are generally available or in public preview
   * use this to calculate storage costs.
   */
  readonly sizeBytes?: bigint;
  /**
   * Output only. The time when the repository was last updated.
   */
  readonly updateTime?: Date;
  /**
   * Configuration specific for a Virtual Repository.
   */
  virtualRepositoryConfig?: VirtualRepositoryConfig;
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
 * Tags point to a version and represent an alternative name that can be used
 * to access the version.
 */
export interface Tag {
  /**
   * The name of the tag, for example:
   * "projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/tags/tag1".
   * If the package part contains slashes, the slashes are escaped. The tag part
   * can only have characters in [a-zA-Z0-9\-._~:@], anything else must be URL
   * encoded.
   */
  name?: string;
  /**
   * The name of the version the tag refers to, for example:
   * "projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/sha256:5243811"
   * If the package or version ID parts contain slashes, the slashes are
   * escaped.
   */
  version?: string;
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
 * The response to upload an artifact.
 */
export interface UploadAptArtifactMediaResponse {
  /**
   * Operation to be returned to the user.
   */
  operation?: Operation;
}

/**
 * The operation metadata for uploading artifacts.
 */
export interface UploadAptArtifactMetadata {
}

/**
 * The request to upload an artifact.
 */
export interface UploadAptArtifactRequest {
}

/**
 * The response of the completed artifact upload operation. This response is
 * contained in the Operation and available to users.
 */
export interface UploadAptArtifactResponse {
  /**
   * The Apt artifacts updated.
   */
  aptArtifacts?: AptArtifact[];
}

/**
 * The response to upload an artifact.
 */
export interface UploadKfpArtifactMediaResponse {
  /**
   * Operation that will be returned to the user.
   */
  operation?: Operation;
}

/**
 * The operation metadata for uploading KFP artifacts.
 */
export interface UploadKfpArtifactMetadata {
}

/**
 * The request to upload an artifact.
 */
export interface UploadKfpArtifactRequest {
  /**
   * Description of the package version.
   */
  description?: string;
  /**
   * Tags to be created with the version.
   */
  tags?: string[];
}

/**
 * The response to upload an artifact.
 */
export interface UploadYumArtifactMediaResponse {
  /**
   * Operation to be returned to the user.
   */
  operation?: Operation;
}

/**
 * The operation metadata for uploading artifacts.
 */
export interface UploadYumArtifactMetadata {
}

/**
 * The request to upload an artifact.
 */
export interface UploadYumArtifactRequest {
}

/**
 * The response of the completed artifact upload operation. This response is
 * contained in the Operation and available to users.
 */
export interface UploadYumArtifactResponse {
  /**
   * The Apt artifacts updated.
   */
  yumArtifacts?: YumArtifact[];
}

/**
 * Artifact policy configuration for the repository contents.
 */
export interface UpstreamPolicy {
  /**
   * The user-provided ID of the upstream policy.
   */
  id?: string;
  /**
   * Entries with a greater priority value take precedence in the pull order.
   */
  priority?: number;
  /**
   * A reference to the repository resource, for example:
   * "projects/p1/locations/us-central1/repositories/repo1".
   */
  repository?: string;
}

/**
 * The body of a version resource. A version resource represents a collection
 * of components, such as files and other data. This may correspond to a version
 * in many package management schemes.
 */
export interface Version {
  /**
   * The time when the version was created.
   */
  createTime?: Date;
  /**
   * Optional. Description of the version, as specified in its metadata.
   */
  description?: string;
  /**
   * Output only. Repository-specific Metadata stored against this version. The
   * fields returned are defined by the underlying repository-specific resource.
   * Currently, the resources could be: DockerImage MavenArtifact
   */
  readonly metadata?: {
    [key: string]: any
  };
  /**
   * The name of the version, for example:
   * "projects/p1/locations/us-central1/repositories/repo1/packages/pkg1/versions/art1".
   * If the package or version ID parts contain slashes, the slashes are
   * escaped.
   */
  name?: string;
  /**
   * Output only. A list of related tags. Will contain up to 100 tags that
   * reference this version.
   */
  relatedTags?: Tag[];
  /**
   * The time when the version was last updated.
   */
  updateTime?: Date;
}

function serializeVersion(data: any): Version {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeVersion(data: any): Version {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Virtual repository configuration.
 */
export interface VirtualRepositoryConfig {
  /**
   * Policies that configure the upstream artifacts distributed by the Virtual
   * Repository. Upstream policies cannot be set on a standard repository.
   */
  upstreamPolicies?: UpstreamPolicy[];
}

/**
 * The Artifact Registry VPC SC config that apply to a Project.
 */
export interface VPCSCConfig {
  /**
   * The name of the project's VPC SC Config. Always of the form:
   * projects/{projectID}/locations/{location}/vpcscConfig In update request:
   * never set In response: always set
   */
  name?: string;
  /**
   * The project per location VPC SC policy that defines the VPC SC behavior
   * for the Remote Repository (Allow/Deny).
   */
  vpcscPolicy?:  | "VPCSC_POLICY_UNSPECIFIED" | "DENY" | "ALLOW";
}

/**
 * A detailed representation of a Yum artifact.
 */
export interface YumArtifact {
  /**
   * Output only. Operating system architecture of the artifact.
   */
  readonly architecture?: string;
  /**
   * Output only. The Artifact Registry resource name of the artifact.
   */
  readonly name?: string;
  /**
   * Output only. The yum package name of the artifact.
   */
  readonly packageName?: string;
  /**
   * Output only. An artifact is a binary or source package.
   */
  readonly packageType?:  | "PACKAGE_TYPE_UNSPECIFIED" | "BINARY" | "SOURCE";
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
