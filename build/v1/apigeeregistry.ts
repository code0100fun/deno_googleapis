// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Apigee Registry API Client for Deno
 * ===================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/apigee/docs/api-hub/what-is-api-hub
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class ApigeeRegistry {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://apigeeregistry.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a specified artifact.
   *
   * @param parent Required. The parent, which owns this collection of artifacts. Format: `{parent}`
   */
  async projectsLocationsApisArtifactsCreate(parent: string, req: Artifact, opts: ProjectsLocationsApisArtifactsCreateOptions = {}): Promise<Artifact> {
    req = serializeArtifact(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/artifacts`);
    if (opts.artifactId !== undefined) {
      url.searchParams.append("artifactId", String(opts.artifactId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeArtifact(data);
  }

  /**
   * Removes a specified artifact.
   *
   * @param name Required. The name of the artifact to delete. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsApisArtifactsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns a specified artifact.
   *
   * @param name Required. The name of the artifact to retrieve. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsApisArtifactsGet(name: string): Promise<Artifact> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeArtifact(data);
  }

  /**
   * Returns the contents of a specified artifact. If artifacts are stored with
   * GZip compression, the default behavior is to return the artifact
   * uncompressed (the mime_type response field indicates the exact format
   * returned).
   *
   * @param name Required. The name of the artifact whose contents should be retrieved. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsApisArtifactsGetContents(name: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getContents`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisArtifactsGetIamPolicy(resource: string, opts: ProjectsLocationsApisArtifactsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Returns matching artifacts.
   *
   * @param parent Required. The parent, which owns this collection of artifacts. Format: `{parent}`
   */
  async projectsLocationsApisArtifactsList(parent: string, opts: ProjectsLocationsApisArtifactsListOptions = {}): Promise<ListArtifactsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/artifacts`);
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
    return deserializeListArtifactsResponse(data);
  }

  /**
   * Used to replace a specified artifact.
   *
   * @param name Resource name.
   */
  async projectsLocationsApisArtifactsReplaceArtifact(name: string, req: Artifact): Promise<Artifact> {
    req = serializeArtifact(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeArtifact(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisArtifactsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsApisArtifactsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a specified API.
   *
   * @param parent Required. The parent, which owns this collection of APIs. Format: `projects/*\/locations/*`
   */
  async projectsLocationsApisCreate(parent: string, req: Api, opts: ProjectsLocationsApisCreateOptions = {}): Promise<Api> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apis`);
    if (opts.apiId !== undefined) {
      url.searchParams.append("apiId", String(opts.apiId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Api;
  }

  /**
   * Removes a specified API and all of the resources that it owns.
   *
   * @param name Required. The name of the API to delete. Format: `projects/*\/locations/*\/apis/*`
   */
  async projectsLocationsApisDelete(name: string, opts: ProjectsLocationsApisDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * Creates a specified artifact.
   *
   * @param parent Required. The parent, which owns this collection of artifacts. Format: `{parent}`
   */
  async projectsLocationsApisDeploymentsArtifactsCreate(parent: string, req: Artifact, opts: ProjectsLocationsApisDeploymentsArtifactsCreateOptions = {}): Promise<Artifact> {
    req = serializeArtifact(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/artifacts`);
    if (opts.artifactId !== undefined) {
      url.searchParams.append("artifactId", String(opts.artifactId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeArtifact(data);
  }

  /**
   * Removes a specified artifact.
   *
   * @param name Required. The name of the artifact to delete. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsApisDeploymentsArtifactsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns a specified artifact.
   *
   * @param name Required. The name of the artifact to retrieve. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsApisDeploymentsArtifactsGet(name: string): Promise<Artifact> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeArtifact(data);
  }

  /**
   * Returns the contents of a specified artifact. If artifacts are stored with
   * GZip compression, the default behavior is to return the artifact
   * uncompressed (the mime_type response field indicates the exact format
   * returned).
   *
   * @param name Required. The name of the artifact whose contents should be retrieved. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsApisDeploymentsArtifactsGetContents(name: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getContents`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Returns matching artifacts.
   *
   * @param parent Required. The parent, which owns this collection of artifacts. Format: `{parent}`
   */
  async projectsLocationsApisDeploymentsArtifactsList(parent: string, opts: ProjectsLocationsApisDeploymentsArtifactsListOptions = {}): Promise<ListArtifactsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/artifacts`);
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
    return deserializeListArtifactsResponse(data);
  }

  /**
   * Used to replace a specified artifact.
   *
   * @param name Resource name.
   */
  async projectsLocationsApisDeploymentsArtifactsReplaceArtifact(name: string, req: Artifact): Promise<Artifact> {
    req = serializeArtifact(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeArtifact(data);
  }

  /**
   * Creates a specified deployment.
   *
   * @param parent Required. The parent, which owns this collection of deployments. Format: `projects/*\/locations/*\/apis/*`
   */
  async projectsLocationsApisDeploymentsCreate(parent: string, req: ApiDeployment, opts: ProjectsLocationsApisDeploymentsCreateOptions = {}): Promise<ApiDeployment> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deployments`);
    if (opts.apiDeploymentId !== undefined) {
      url.searchParams.append("apiDeploymentId", String(opts.apiDeploymentId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ApiDeployment;
  }

  /**
   * Removes a specified deployment, all revisions, and all child resources
   * (e.g., artifacts).
   *
   * @param name Required. The name of the deployment to delete. Format: `projects/*\/locations/*\/apis/*\/deployments/*`
   */
  async projectsLocationsApisDeploymentsDelete(name: string, opts: ProjectsLocationsApisDeploymentsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * Deletes a revision of a deployment.
   *
   * @param name Required. The name of the deployment revision to be deleted, with a revision ID explicitly included. Example: `projects/sample/locations/global/apis/petstore/deployments/prod@c7cfa2a8`
   */
  async projectsLocationsApisDeploymentsDeleteRevision(name: string): Promise<ApiDeployment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:deleteRevision`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as ApiDeployment;
  }

  /**
   * Returns a specified deployment.
   *
   * @param name Required. The name of the deployment to retrieve. Format: `projects/*\/locations/*\/apis/*\/deployments/*`
   */
  async projectsLocationsApisDeploymentsGet(name: string): Promise<ApiDeployment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ApiDeployment;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisDeploymentsGetIamPolicy(resource: string, opts: ProjectsLocationsApisDeploymentsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Returns matching deployments.
   *
   * @param parent Required. The parent, which owns this collection of deployments. Format: `projects/*\/locations/*\/apis/*`
   */
  async projectsLocationsApisDeploymentsList(parent: string, opts: ProjectsLocationsApisDeploymentsListOptions = {}): Promise<ListApiDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deployments`);
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
    return data as ListApiDeploymentsResponse;
  }

  /**
   * Lists all revisions of a deployment. Revisions are returned in descending
   * order of revision creation time.
   *
   * @param name Required. The name of the deployment to list revisions for.
   */
  async projectsLocationsApisDeploymentsListRevisions(name: string, opts: ProjectsLocationsApisDeploymentsListRevisionsOptions = {}): Promise<ListApiDeploymentRevisionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:listRevisions`);
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
    return data as ListApiDeploymentRevisionsResponse;
  }

  /**
   * Used to modify a specified deployment.
   *
   * @param name Resource name.
   */
  async projectsLocationsApisDeploymentsPatch(name: string, req: ApiDeployment, opts: ProjectsLocationsApisDeploymentsPatchOptions = {}): Promise<ApiDeployment> {
    opts = serializeProjectsLocationsApisDeploymentsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
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
    return data as ApiDeployment;
  }

  /**
   * Sets the current revision to a specified prior revision. Note that this
   * creates a new revision with a new revision ID.
   *
   * @param name Required. The deployment being rolled back.
   */
  async projectsLocationsApisDeploymentsRollback(name: string, req: RollbackApiDeploymentRequest): Promise<ApiDeployment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:rollback`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ApiDeployment;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisDeploymentsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Adds a tag to a specified revision of a deployment.
   *
   * @param name Required. The name of the deployment to be tagged, including the revision ID.
   */
  async projectsLocationsApisDeploymentsTagRevision(name: string, req: TagApiDeploymentRevisionRequest): Promise<ApiDeployment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:tagRevision`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ApiDeployment;
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
  async projectsLocationsApisDeploymentsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Returns a specified API.
   *
   * @param name Required. The name of the API to retrieve. Format: `projects/*\/locations/*\/apis/*`
   */
  async projectsLocationsApisGet(name: string): Promise<Api> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Api;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisGetIamPolicy(resource: string, opts: ProjectsLocationsApisGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Returns matching APIs.
   *
   * @param parent Required. The parent, which owns this collection of APIs. Format: `projects/*\/locations/*`
   */
  async projectsLocationsApisList(parent: string, opts: ProjectsLocationsApisListOptions = {}): Promise<ListApisResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/apis`);
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
    return data as ListApisResponse;
  }

  /**
   * Used to modify a specified API.
   *
   * @param name Resource name.
   */
  async projectsLocationsApisPatch(name: string, req: Api, opts: ProjectsLocationsApisPatchOptions = {}): Promise<Api> {
    opts = serializeProjectsLocationsApisPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
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
    return data as Api;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsApisTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a specified artifact.
   *
   * @param parent Required. The parent, which owns this collection of artifacts. Format: `{parent}`
   */
  async projectsLocationsApisVersionsArtifactsCreate(parent: string, req: Artifact, opts: ProjectsLocationsApisVersionsArtifactsCreateOptions = {}): Promise<Artifact> {
    req = serializeArtifact(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/artifacts`);
    if (opts.artifactId !== undefined) {
      url.searchParams.append("artifactId", String(opts.artifactId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeArtifact(data);
  }

  /**
   * Removes a specified artifact.
   *
   * @param name Required. The name of the artifact to delete. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsApisVersionsArtifactsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns a specified artifact.
   *
   * @param name Required. The name of the artifact to retrieve. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsApisVersionsArtifactsGet(name: string): Promise<Artifact> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeArtifact(data);
  }

  /**
   * Returns the contents of a specified artifact. If artifacts are stored with
   * GZip compression, the default behavior is to return the artifact
   * uncompressed (the mime_type response field indicates the exact format
   * returned).
   *
   * @param name Required. The name of the artifact whose contents should be retrieved. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsApisVersionsArtifactsGetContents(name: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getContents`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisVersionsArtifactsGetIamPolicy(resource: string, opts: ProjectsLocationsApisVersionsArtifactsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Returns matching artifacts.
   *
   * @param parent Required. The parent, which owns this collection of artifacts. Format: `{parent}`
   */
  async projectsLocationsApisVersionsArtifactsList(parent: string, opts: ProjectsLocationsApisVersionsArtifactsListOptions = {}): Promise<ListArtifactsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/artifacts`);
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
    return deserializeListArtifactsResponse(data);
  }

  /**
   * Used to replace a specified artifact.
   *
   * @param name Resource name.
   */
  async projectsLocationsApisVersionsArtifactsReplaceArtifact(name: string, req: Artifact): Promise<Artifact> {
    req = serializeArtifact(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeArtifact(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisVersionsArtifactsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsApisVersionsArtifactsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a specified version.
   *
   * @param parent Required. The parent, which owns this collection of versions. Format: `projects/*\/locations/*\/apis/*`
   */
  async projectsLocationsApisVersionsCreate(parent: string, req: ApiVersion, opts: ProjectsLocationsApisVersionsCreateOptions = {}): Promise<ApiVersion> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/versions`);
    if (opts.apiVersionId !== undefined) {
      url.searchParams.append("apiVersionId", String(opts.apiVersionId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ApiVersion;
  }

  /**
   * Removes a specified version and all of the resources that it owns.
   *
   * @param name Required. The name of the version to delete. Format: `projects/*\/locations/*\/apis/*\/versions/*`
   */
  async projectsLocationsApisVersionsDelete(name: string, opts: ProjectsLocationsApisVersionsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * Returns a specified version.
   *
   * @param name Required. The name of the version to retrieve. Format: `projects/*\/locations/*\/apis/*\/versions/*`
   */
  async projectsLocationsApisVersionsGet(name: string): Promise<ApiVersion> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ApiVersion;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisVersionsGetIamPolicy(resource: string, opts: ProjectsLocationsApisVersionsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Returns matching versions.
   *
   * @param parent Required. The parent, which owns this collection of versions. Format: `projects/*\/locations/*\/apis/*`
   */
  async projectsLocationsApisVersionsList(parent: string, opts: ProjectsLocationsApisVersionsListOptions = {}): Promise<ListApiVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/versions`);
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
    return data as ListApiVersionsResponse;
  }

  /**
   * Used to modify a specified version.
   *
   * @param name Resource name.
   */
  async projectsLocationsApisVersionsPatch(name: string, req: ApiVersion, opts: ProjectsLocationsApisVersionsPatchOptions = {}): Promise<ApiVersion> {
    opts = serializeProjectsLocationsApisVersionsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
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
    return data as ApiVersion;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisVersionsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Creates a specified artifact.
   *
   * @param parent Required. The parent, which owns this collection of artifacts. Format: `{parent}`
   */
  async projectsLocationsApisVersionsSpecsArtifactsCreate(parent: string, req: Artifact, opts: ProjectsLocationsApisVersionsSpecsArtifactsCreateOptions = {}): Promise<Artifact> {
    req = serializeArtifact(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/artifacts`);
    if (opts.artifactId !== undefined) {
      url.searchParams.append("artifactId", String(opts.artifactId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeArtifact(data);
  }

  /**
   * Removes a specified artifact.
   *
   * @param name Required. The name of the artifact to delete. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsApisVersionsSpecsArtifactsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns a specified artifact.
   *
   * @param name Required. The name of the artifact to retrieve. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsApisVersionsSpecsArtifactsGet(name: string): Promise<Artifact> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeArtifact(data);
  }

  /**
   * Returns the contents of a specified artifact. If artifacts are stored with
   * GZip compression, the default behavior is to return the artifact
   * uncompressed (the mime_type response field indicates the exact format
   * returned).
   *
   * @param name Required. The name of the artifact whose contents should be retrieved. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsApisVersionsSpecsArtifactsGetContents(name: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getContents`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisVersionsSpecsArtifactsGetIamPolicy(resource: string, opts: ProjectsLocationsApisVersionsSpecsArtifactsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Returns matching artifacts.
   *
   * @param parent Required. The parent, which owns this collection of artifacts. Format: `{parent}`
   */
  async projectsLocationsApisVersionsSpecsArtifactsList(parent: string, opts: ProjectsLocationsApisVersionsSpecsArtifactsListOptions = {}): Promise<ListArtifactsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/artifacts`);
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
    return deserializeListArtifactsResponse(data);
  }

  /**
   * Used to replace a specified artifact.
   *
   * @param name Resource name.
   */
  async projectsLocationsApisVersionsSpecsArtifactsReplaceArtifact(name: string, req: Artifact): Promise<Artifact> {
    req = serializeArtifact(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeArtifact(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisVersionsSpecsArtifactsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsApisVersionsSpecsArtifactsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a specified spec.
   *
   * @param parent Required. The parent, which owns this collection of specs. Format: `projects/*\/locations/*\/apis/*\/versions/*`
   */
  async projectsLocationsApisVersionsSpecsCreate(parent: string, req: ApiSpec, opts: ProjectsLocationsApisVersionsSpecsCreateOptions = {}): Promise<ApiSpec> {
    req = serializeApiSpec(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/specs`);
    if (opts.apiSpecId !== undefined) {
      url.searchParams.append("apiSpecId", String(opts.apiSpecId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApiSpec(data);
  }

  /**
   * Removes a specified spec, all revisions, and all child resources (e.g.,
   * artifacts).
   *
   * @param name Required. The name of the spec to delete. Format: `projects/*\/locations/*\/apis/*\/versions/*\/specs/*`
   */
  async projectsLocationsApisVersionsSpecsDelete(name: string, opts: ProjectsLocationsApisVersionsSpecsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * Deletes a revision of a spec.
   *
   * @param name Required. The name of the spec revision to be deleted, with a revision ID explicitly included. Example: `projects/sample/locations/global/apis/petstore/versions/1.0.0/specs/openapi.yaml@c7cfa2a8`
   */
  async projectsLocationsApisVersionsSpecsDeleteRevision(name: string): Promise<ApiSpec> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:deleteRevision`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return deserializeApiSpec(data);
  }

  /**
   * Returns a specified spec.
   *
   * @param name Required. The name of the spec to retrieve. Format: `projects/*\/locations/*\/apis/*\/versions/*\/specs/*`
   */
  async projectsLocationsApisVersionsSpecsGet(name: string): Promise<ApiSpec> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeApiSpec(data);
  }

  /**
   * Returns the contents of a specified spec. If specs are stored with GZip
   * compression, the default behavior is to return the spec uncompressed (the
   * mime_type response field indicates the exact format returned).
   *
   * @param name Required. The name of the spec whose contents should be retrieved. Format: `projects/*\/locations/*\/apis/*\/versions/*\/specs/*`
   */
  async projectsLocationsApisVersionsSpecsGetContents(name: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getContents`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisVersionsSpecsGetIamPolicy(resource: string, opts: ProjectsLocationsApisVersionsSpecsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Returns matching specs.
   *
   * @param parent Required. The parent, which owns this collection of specs. Format: `projects/*\/locations/*\/apis/*\/versions/*`
   */
  async projectsLocationsApisVersionsSpecsList(parent: string, opts: ProjectsLocationsApisVersionsSpecsListOptions = {}): Promise<ListApiSpecsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/specs`);
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
    return deserializeListApiSpecsResponse(data);
  }

  /**
   * Lists all revisions of a spec. Revisions are returned in descending order
   * of revision creation time.
   *
   * @param name Required. The name of the spec to list revisions for.
   */
  async projectsLocationsApisVersionsSpecsListRevisions(name: string, opts: ProjectsLocationsApisVersionsSpecsListRevisionsOptions = {}): Promise<ListApiSpecRevisionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:listRevisions`);
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
    return deserializeListApiSpecRevisionsResponse(data);
  }

  /**
   * Used to modify a specified spec.
   *
   * @param name Resource name.
   */
  async projectsLocationsApisVersionsSpecsPatch(name: string, req: ApiSpec, opts: ProjectsLocationsApisVersionsSpecsPatchOptions = {}): Promise<ApiSpec> {
    req = serializeApiSpec(req);
    opts = serializeProjectsLocationsApisVersionsSpecsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
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
    return deserializeApiSpec(data);
  }

  /**
   * Sets the current revision to a specified prior revision. Note that this
   * creates a new revision with a new revision ID.
   *
   * @param name Required. The spec being rolled back.
   */
  async projectsLocationsApisVersionsSpecsRollback(name: string, req: RollbackApiSpecRequest): Promise<ApiSpec> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:rollback`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApiSpec(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisVersionsSpecsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Adds a tag to a specified revision of a spec.
   *
   * @param name Required. The name of the spec to be tagged, including the revision ID.
   */
  async projectsLocationsApisVersionsSpecsTagRevision(name: string, req: TagApiSpecRevisionRequest): Promise<ApiSpec> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:tagRevision`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeApiSpec(data);
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
  async projectsLocationsApisVersionsSpecsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsApisVersionsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a specified artifact.
   *
   * @param parent Required. The parent, which owns this collection of artifacts. Format: `{parent}`
   */
  async projectsLocationsArtifactsCreate(parent: string, req: Artifact, opts: ProjectsLocationsArtifactsCreateOptions = {}): Promise<Artifact> {
    req = serializeArtifact(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/artifacts`);
    if (opts.artifactId !== undefined) {
      url.searchParams.append("artifactId", String(opts.artifactId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeArtifact(data);
  }

  /**
   * Removes a specified artifact.
   *
   * @param name Required. The name of the artifact to delete. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsArtifactsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns a specified artifact.
   *
   * @param name Required. The name of the artifact to retrieve. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsArtifactsGet(name: string): Promise<Artifact> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeArtifact(data);
  }

  /**
   * Returns the contents of a specified artifact. If artifacts are stored with
   * GZip compression, the default behavior is to return the artifact
   * uncompressed (the mime_type response field indicates the exact format
   * returned).
   *
   * @param name Required. The name of the artifact whose contents should be retrieved. Format: `{parent}/artifacts/*`
   */
  async projectsLocationsArtifactsGetContents(name: string): Promise<HttpBody> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getContents`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeHttpBody(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsArtifactsGetIamPolicy(resource: string, opts: ProjectsLocationsArtifactsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Returns matching artifacts.
   *
   * @param parent Required. The parent, which owns this collection of artifacts. Format: `{parent}`
   */
  async projectsLocationsArtifactsList(parent: string, opts: ProjectsLocationsArtifactsListOptions = {}): Promise<ListArtifactsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/artifacts`);
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
    return deserializeListArtifactsResponse(data);
  }

  /**
   * Used to replace a specified artifact.
   *
   * @param name Resource name.
   */
  async projectsLocationsArtifactsReplaceArtifact(name: string, req: Artifact): Promise<Artifact> {
    req = serializeArtifact(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeArtifact(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsArtifactsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsArtifactsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Provisions instance resources for the Registry.
   *
   * @param parent Required. Parent resource of the Instance, of the form: `projects/*\/locations/*`
   */
  async projectsLocationsInstancesCreate(parent: string, req: Instance, opts: ProjectsLocationsInstancesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/instances`);
    if (opts.instanceId !== undefined) {
      url.searchParams.append("instanceId", String(opts.instanceId));
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
   * Deletes the Registry instance.
   *
   * @param name Required. The name of the Instance to delete. Format: `projects/*\/locations/*\/instances/*`.
   */
  async projectsLocationsInstancesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single Instance.
   *
   * @param name Required. The name of the Instance to retrieve. Format: `projects/*\/locations/*\/instances/*`.
   */
  async projectsLocationsInstancesGet(name: string): Promise<Instance> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Instance;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsInstancesGetIamPolicy(resource: string, opts: ProjectsLocationsInstancesGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsInstancesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsInstancesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRuntimeGetIamPolicy(resource: string, opts: ProjectsLocationsRuntimeGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRuntimeSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsRuntimeTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
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
 * A top-level description of an API. Produced by producers and are commitments
 * to provide services.
 */
export interface Api {
  /**
   * Annotations attach non-identifying metadata to resources. Annotation keys
   * and values are less restricted than those of labels, but should be
   * generally used for small values of broad interest. Larger, topic- specific
   * metadata should be stored in Artifacts.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * A user-definable description of the availability of this service. Format:
   * free-form, but we expect single words that describe availability, e.g.,
   * "NONE", "TESTING", "PREVIEW", "GENERAL", "DEPRECATED", "SHUTDOWN".
   */
  availability?: string;
  /**
   * Output only. Creation timestamp.
   */
  readonly createTime?: Date;
  /**
   * A detailed description.
   */
  description?: string;
  /**
   * Human-meaningful name.
   */
  displayName?: string;
  /**
   * Labels attach identifying metadata to resources. Identifying metadata can
   * be used to filter list operations. Label keys and values can be no longer
   * than 64 characters (Unicode codepoints), can only contain lowercase
   * letters, numeric characters, underscores, and dashes. International
   * characters are allowed. No more than 64 user labels can be associated with
   * one resource (System labels are excluded). See https://goo.gl/xmQnxf for
   * more information and examples of labels. System reserved label keys are
   * prefixed with `apigeeregistry.googleapis.com/` and cannot be changed.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Resource name.
   */
  name?: string;
  /**
   * The recommended deployment of the API. Format:
   * `projects/{project}/locations/{location}/apis/{api}/deployments/{deployment}`
   */
  recommendedDeployment?: string;
  /**
   * The recommended version of the API. Format:
   * `projects/{project}/locations/{location}/apis/{api}/versions/{version}`
   */
  recommendedVersion?: string;
  /**
   * Output only. Last update timestamp.
   */
  readonly updateTime?: Date;
}

/**
 * Describes a service running at particular address that provides a particular
 * version of an API. ApiDeployments have revisions which correspond to
 * different configurations of a single deployment in time. Revision identifiers
 * should be updated whenever the served API spec or endpoint address changes.
 */
export interface ApiDeployment {
  /**
   * Text briefly describing how to access the endpoint. Changes to this value
   * will not affect the revision.
   */
  accessGuidance?: string;
  /**
   * Annotations attach non-identifying metadata to resources. Annotation keys
   * and values are less restricted than those of labels, but should be
   * generally used for small values of broad interest. Larger, topic- specific
   * metadata should be stored in Artifacts.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * The full resource name (including revision ID) of the spec of the API
   * being served by the deployment. Changes to this value will update the
   * revision. Format:
   * `projects/{project}/locations/{location}/apis/{api}/versions/{version}/specs/{spec@revision}`
   */
  apiSpecRevision?: string;
  /**
   * Output only. Creation timestamp; when the deployment resource was created.
   */
  readonly createTime?: Date;
  /**
   * A detailed description.
   */
  description?: string;
  /**
   * Human-meaningful name.
   */
  displayName?: string;
  /**
   * The address where the deployment is serving. Changes to this value will
   * update the revision.
   */
  endpointUri?: string;
  /**
   * The address of the external channel of the API (e.g., the Developer
   * Portal). Changes to this value will not affect the revision.
   */
  externalChannelUri?: string;
  /**
   * Text briefly identifying the intended audience of the API. Changes to this
   * value will not affect the revision.
   */
  intendedAudience?: string;
  /**
   * Labels attach identifying metadata to resources. Identifying metadata can
   * be used to filter list operations. Label keys and values can be no longer
   * than 64 characters (Unicode codepoints), can only contain lowercase
   * letters, numeric characters, underscores and dashes. International
   * characters are allowed. No more than 64 user labels can be associated with
   * one resource (System labels are excluded). See https://goo.gl/xmQnxf for
   * more information and examples of labels. System reserved label keys are
   * prefixed with `apigeeregistry.googleapis.com/` and cannot be changed.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Resource name.
   */
  name?: string;
  /**
   * Output only. Revision creation timestamp; when the represented revision
   * was created.
   */
  readonly revisionCreateTime?: Date;
  /**
   * Output only. Immutable. The revision ID of the deployment. A new revision
   * is committed whenever the deployment contents are changed. The format is an
   * 8-character hexadecimal string.
   */
  readonly revisionId?: string;
  /**
   * Output only. Last update timestamp: when the represented revision was last
   * modified.
   */
  readonly revisionUpdateTime?: Date;
}

/**
 * Describes a version of an API in a structured way. ApiSpecs provide formal
 * descriptions that consumers can use to use a version. ApiSpec resources are
 * intended to be fully-resolved descriptions of an ApiVersion. When specs
 * consist of multiple files, these should be bundled together (e.g., in a zip
 * archive) and stored as a unit. Multiple specs can exist to provide
 * representations in different API description formats. Synchronization of
 * these representations would be provided by tooling and background services.
 */
export interface ApiSpec {
  /**
   * Annotations attach non-identifying metadata to resources. Annotation keys
   * and values are less restricted than those of labels, but should be
   * generally used for small values of broad interest. Larger, topic- specific
   * metadata should be stored in Artifacts.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Input only. The contents of the spec. Provided by API callers when specs
   * are created or updated. To access the contents of a spec, use
   * GetApiSpecContents.
   */
  contents?: Uint8Array;
  /**
   * Output only. Creation timestamp; when the spec resource was created.
   */
  readonly createTime?: Date;
  /**
   * A detailed description.
   */
  description?: string;
  /**
   * A possibly-hierarchical name used to refer to the spec from other specs.
   */
  filename?: string;
  /**
   * Output only. A SHA-256 hash of the spec's contents. If the spec is
   * gzipped, this is the hash of the uncompressed spec.
   */
  readonly hash?: string;
  /**
   * Labels attach identifying metadata to resources. Identifying metadata can
   * be used to filter list operations. Label keys and values can be no longer
   * than 64 characters (Unicode codepoints), can only contain lowercase
   * letters, numeric characters, underscores and dashes. International
   * characters are allowed. No more than 64 user labels can be associated with
   * one resource (System labels are excluded). See https://goo.gl/xmQnxf for
   * more information and examples of labels. System reserved label keys are
   * prefixed with `apigeeregistry.googleapis.com/` and cannot be changed.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * A style (format) descriptor for this spec that is specified as a Media
   * Type (https://en.wikipedia.org/wiki/Media_type). Possible values include
   * `application/vnd.apigee.proto`, `application/vnd.apigee.openapi`, and
   * `application/vnd.apigee.graphql`, with possible suffixes representing
   * compression types. These hypothetical names are defined in the vendor tree
   * defined in RFC6838 (https://tools.ietf.org/html/rfc6838) and are not final.
   * Content types can specify compression. Currently only GZip compression is
   * supported (indicated with "+gzip").
   */
  mimeType?: string;
  /**
   * Resource name.
   */
  name?: string;
  /**
   * Output only. Revision creation timestamp; when the represented revision
   * was created.
   */
  readonly revisionCreateTime?: Date;
  /**
   * Output only. Immutable. The revision ID of the spec. A new revision is
   * committed whenever the spec contents are changed. The format is an
   * 8-character hexadecimal string.
   */
  readonly revisionId?: string;
  /**
   * Output only. Last update timestamp: when the represented revision was last
   * modified.
   */
  readonly revisionUpdateTime?: Date;
  /**
   * Output only. The size of the spec file in bytes. If the spec is gzipped,
   * this is the size of the uncompressed spec.
   */
  readonly sizeBytes?: number;
  /**
   * The original source URI of the spec (if one exists). This is an external
   * location that can be used for reference purposes but which may not be
   * authoritative since this external resource may change after the spec is
   * retrieved.
   */
  sourceUri?: string;
}

function serializeApiSpec(data: any): ApiSpec {
  return {
    ...data,
    contents: data["contents"] !== undefined ? encodeBase64(data["contents"]) : undefined,
  };
}

function deserializeApiSpec(data: any): ApiSpec {
  return {
    ...data,
    contents: data["contents"] !== undefined ? decodeBase64(data["contents"] as string) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    revisionCreateTime: data["revisionCreateTime"] !== undefined ? new Date(data["revisionCreateTime"]) : undefined,
    revisionUpdateTime: data["revisionUpdateTime"] !== undefined ? new Date(data["revisionUpdateTime"]) : undefined,
  };
}

/**
 * Describes a particular version of an API. ApiVersions are what consumers
 * actually use.
 */
export interface ApiVersion {
  /**
   * Annotations attach non-identifying metadata to resources. Annotation keys
   * and values are less restricted than those of labels, but should be
   * generally used for small values of broad interest. Larger, topic- specific
   * metadata should be stored in Artifacts.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. Creation timestamp.
   */
  readonly createTime?: Date;
  /**
   * A detailed description.
   */
  description?: string;
  /**
   * Human-meaningful name.
   */
  displayName?: string;
  /**
   * Labels attach identifying metadata to resources. Identifying metadata can
   * be used to filter list operations. Label keys and values can be no longer
   * than 64 characters (Unicode codepoints), can only contain lowercase
   * letters, numeric characters, underscores and dashes. International
   * characters are allowed. No more than 64 user labels can be associated with
   * one resource (System labels are excluded). See https://goo.gl/xmQnxf for
   * more information and examples of labels. System reserved label keys are
   * prefixed with `apigeeregistry.googleapis.com/` and cannot be changed.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Resource name.
   */
  name?: string;
  /**
   * The primary spec for this version. Format:
   * projects/{project}/locations/{location}/apis/{api}/versions/{version}/specs/{spec}
   */
  primarySpec?: string;
  /**
   * A user-definable description of the lifecycle phase of this API version.
   * Format: free-form, but we expect single words that describe API maturity,
   * e.g., "CONCEPT", "DESIGN", "DEVELOPMENT", "STAGING", "PRODUCTION",
   * "DEPRECATED", "RETIRED".
   */
  state?: string;
  /**
   * Output only. Last update timestamp.
   */
  readonly updateTime?: Date;
}

/**
 * Artifacts of resources. Artifacts are unique (single-value) per resource and
 * are used to store metadata that is too large or numerous to be stored
 * directly on the resource. Since artifacts are stored separately from parent
 * resources, they should generally be used for metadata that is needed
 * infrequently, i.e., not for display in primary views of the resource but
 * perhaps displayed or downloaded upon request. The `ListArtifacts` method
 * allows artifacts to be quickly enumerated and checked for presence without
 * downloading their (potentially-large) contents.
 */
export interface Artifact {
  /**
   * Annotations attach non-identifying metadata to resources. Annotation keys
   * and values are less restricted than those of labels, but should be
   * generally used for small values of broad interest. Larger, topic- specific
   * metadata should be stored in Artifacts.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Input only. The contents of the artifact. Provided by API callers when
   * artifacts are created or replaced. To access the contents of an artifact,
   * use GetArtifactContents.
   */
  contents?: Uint8Array;
  /**
   * Output only. Creation timestamp.
   */
  readonly createTime?: Date;
  /**
   * Output only. A SHA-256 hash of the artifact's contents. If the artifact is
   * gzipped, this is the hash of the uncompressed artifact.
   */
  readonly hash?: string;
  /**
   * Labels attach identifying metadata to resources. Identifying metadata can
   * be used to filter list operations. Label keys and values can be no longer
   * than 64 characters (Unicode codepoints), can only contain lowercase
   * letters, numeric characters, underscores and dashes. International
   * characters are allowed. No more than 64 user labels can be associated with
   * one resource (System labels are excluded). See https://goo.gl/xmQnxf for
   * more information and examples of labels. System reserved label keys are
   * prefixed with "registry.googleapis.com/" and cannot be changed.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * A content type specifier for the artifact. Content type specifiers are
   * Media Types (https://en.wikipedia.org/wiki/Media_type) with a possible
   * "schema" parameter that specifies a schema for the stored information.
   * Content types can specify compression. Currently only GZip compression is
   * supported (indicated with "+gzip").
   */
  mimeType?: string;
  /**
   * Resource name.
   */
  name?: string;
  /**
   * Output only. The size of the artifact in bytes. If the artifact is
   * gzipped, this is the size of the uncompressed artifact.
   */
  readonly sizeBytes?: number;
  /**
   * Output only. Last update timestamp.
   */
  readonly updateTime?: Date;
}

function serializeArtifact(data: any): Artifact {
  return {
    ...data,
    contents: data["contents"] !== undefined ? encodeBase64(data["contents"]) : undefined,
  };
}

function deserializeArtifact(data: any): Artifact {
  return {
    ...data,
    contents: data["contents"] !== undefined ? decodeBase64(data["contents"] as string) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
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
 * Build information of the Instance if it's in `ACTIVE` state.
 */
export interface Build {
  /**
   * Output only. Commit ID of the latest commit in the build.
   */
  readonly commitId?: string;
  /**
   * Output only. Commit time of the latest commit in the build.
   */
  readonly commitTime?: Date;
  /**
   * Output only. Path of the open source repository:
   * github.com/apigee/registry.
   */
  readonly repo?: string;
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Available configurations to provision an Instance.
 */
export interface Config {
  /**
   * Required. The Customer Managed Encryption Key (CMEK) used for data
   * encryption. The CMEK name should follow the format of
   * `projects/([^/]+)/locations/([^/]+)/keyRings/([^/]+)/cryptoKeys/([^/]+)`,
   * where the `location` must match InstanceConfig.location.
   */
  cmekKeyName?: string;
  /**
   * Output only. The GCP location where the Instance resides.
   */
  readonly location?: string;
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
 * An Instance represents the instance resources of the Registry. Currently,
 * only one instance is allowed for each project.
 */
export interface Instance {
  /**
   * Output only. Build info of the Instance if it's in `ACTIVE` state.
   */
  readonly build?: Build;
  /**
   * Required. Config of the Instance.
   */
  config?: Config;
  /**
   * Output only. Creation timestamp.
   */
  readonly createTime?: Date;
  /**
   * Format: `projects/*\/locations/*\/instance`. Currently only
   * `locations/global` is supported.
   */
  name?: string;
  /**
   * Output only. The current state of the Instance.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "INACTIVE" | "CREATING" | "ACTIVE" | "UPDATING" | "DELETING" | "FAILED";
  /**
   * Output only. Extra information of Instance.State if the state is `FAILED`.
   */
  readonly stateMessage?: string;
  /**
   * Output only. Last update timestamp.
   */
  readonly updateTime?: Date;
}

/**
 * Response message for ListApiDeploymentRevisionsResponse.
 */
export interface ListApiDeploymentRevisionsResponse {
  /**
   * The revisions of the deployment.
   */
  apiDeployments?: ApiDeployment[];
  /**
   * A token that can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListApiDeployments.
 */
export interface ListApiDeploymentsResponse {
  /**
   * The deployments from the specified publisher.
   */
  apiDeployments?: ApiDeployment[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListApiSpecRevisionsResponse.
 */
export interface ListApiSpecRevisionsResponse {
  /**
   * The revisions of the spec.
   */
  apiSpecs?: ApiSpec[];
  /**
   * A token that can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeListApiSpecRevisionsResponse(data: any): ListApiSpecRevisionsResponse {
  return {
    ...data,
    apiSpecs: data["apiSpecs"] !== undefined ? data["apiSpecs"].map((item: any) => (serializeApiSpec(item))) : undefined,
  };
}

function deserializeListApiSpecRevisionsResponse(data: any): ListApiSpecRevisionsResponse {
  return {
    ...data,
    apiSpecs: data["apiSpecs"] !== undefined ? data["apiSpecs"].map((item: any) => (deserializeApiSpec(item))) : undefined,
  };
}

/**
 * Response message for ListApiSpecs.
 */
export interface ListApiSpecsResponse {
  /**
   * The specs from the specified publisher.
   */
  apiSpecs?: ApiSpec[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeListApiSpecsResponse(data: any): ListApiSpecsResponse {
  return {
    ...data,
    apiSpecs: data["apiSpecs"] !== undefined ? data["apiSpecs"].map((item: any) => (serializeApiSpec(item))) : undefined,
  };
}

function deserializeListApiSpecsResponse(data: any): ListApiSpecsResponse {
  return {
    ...data,
    apiSpecs: data["apiSpecs"] !== undefined ? data["apiSpecs"].map((item: any) => (deserializeApiSpec(item))) : undefined,
  };
}

/**
 * Response message for ListApis.
 */
export interface ListApisResponse {
  /**
   * The APIs from the specified publisher.
   */
  apis?: Api[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListApiVersions.
 */
export interface ListApiVersionsResponse {
  /**
   * The versions from the specified publisher.
   */
  apiVersions?: ApiVersion[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListArtifacts.
 */
export interface ListArtifactsResponse {
  /**
   * The artifacts from the specified publisher.
   */
  artifacts?: Artifact[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeListArtifactsResponse(data: any): ListArtifactsResponse {
  return {
    ...data,
    artifacts: data["artifacts"] !== undefined ? data["artifacts"].map((item: any) => (serializeArtifact(item))) : undefined,
  };
}

function deserializeListArtifactsResponse(data: any): ListArtifactsResponse {
  return {
    ...data,
    artifacts: data["artifacts"] !== undefined ? data["artifacts"].map((item: any) => (deserializeArtifact(item))) : undefined,
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
   * API version used to start the operation.
   */
  apiVersion?: string;
  /**
   * Identifies whether the user has requested cancellation of the operation.
   * Operations that have successfully been cancelled have Operation.error value
   * with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
   */
  cancellationRequested?: boolean;
  /**
   * The time the operation was created.
   */
  createTime?: Date;
  /**
   * The time the operation finished running.
   */
  endTime?: Date;
  /**
   * Human-readable status of the operation, if any.
   */
  statusMessage?: string;
  /**
   * Server-defined resource path for the target of the operation.
   */
  target?: string;
  /**
   * Name of the verb executed by the operation.
   */
  verb?: string;
}

function serializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
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
 * Additional options for ApigeeRegistry#projectsLocationsApisArtifactsCreate.
 */
export interface ProjectsLocationsApisArtifactsCreateOptions {
  /**
   * Required. The ID to use for the artifact, which will become the final
   * component of the artifact's resource name. This value should be 4-63
   * characters, and valid characters are /a-z-/. Following AIP-162, IDs must
   * not have the form of a UUID.
   */
  artifactId?: string;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisArtifactsGetIamPolicy.
 */
export interface ProjectsLocationsApisArtifactsGetIamPolicyOptions {
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
 * Additional options for ApigeeRegistry#projectsLocationsApisArtifactsList.
 */
export interface ProjectsLocationsApisArtifactsListOptions {
  /**
   * An expression that can be used to filter the list. Filters use the Common
   * Expression Language and can refer to all message fields except contents.
   */
  filter?: string;
  /**
   * A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in
   * descending order using the "desc" identifier, e.g. "foo desc,bar"
   */
  orderBy?: string;
  /**
   * The maximum number of artifacts to return. The service may return fewer
   * than this value. If unspecified, at most 50 values will be returned. The
   * maximum is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListArtifacts` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListArtifacts` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for ApigeeRegistry#projectsLocationsApisCreate.
 */
export interface ProjectsLocationsApisCreateOptions {
  /**
   * Required. The ID to use for the API, which will become the final component
   * of the API's resource name. This value should be 4-63 characters, and valid
   * characters are /a-z-/. Following AIP-162, IDs must not have the form of a
   * UUID.
   */
  apiId?: string;
}

/**
 * Additional options for ApigeeRegistry#projectsLocationsApisDelete.
 */
export interface ProjectsLocationsApisDeleteOptions {
  /**
   * If set to true, any child resources will also be deleted. (Otherwise, the
   * request will only work if there are no child resources.)
   */
  force?: boolean;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisDeploymentsArtifactsCreate.
 */
export interface ProjectsLocationsApisDeploymentsArtifactsCreateOptions {
  /**
   * Required. The ID to use for the artifact, which will become the final
   * component of the artifact's resource name. This value should be 4-63
   * characters, and valid characters are /a-z-/. Following AIP-162, IDs must
   * not have the form of a UUID.
   */
  artifactId?: string;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisDeploymentsArtifactsList.
 */
export interface ProjectsLocationsApisDeploymentsArtifactsListOptions {
  /**
   * An expression that can be used to filter the list. Filters use the Common
   * Expression Language and can refer to all message fields except contents.
   */
  filter?: string;
  /**
   * A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in
   * descending order using the "desc" identifier, e.g. "foo desc,bar"
   */
  orderBy?: string;
  /**
   * The maximum number of artifacts to return. The service may return fewer
   * than this value. If unspecified, at most 50 values will be returned. The
   * maximum is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListArtifacts` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListArtifacts` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisDeploymentsCreate.
 */
export interface ProjectsLocationsApisDeploymentsCreateOptions {
  /**
   * Required. The ID to use for the deployment, which will become the final
   * component of the deployment's resource name. This value should be 4-63
   * characters, and valid characters are /a-z-/. Following AIP-162, IDs must
   * not have the form of a UUID.
   */
  apiDeploymentId?: string;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisDeploymentsDelete.
 */
export interface ProjectsLocationsApisDeploymentsDeleteOptions {
  /**
   * If set to true, any child resources will also be deleted. (Otherwise, the
   * request will only work if there are no child resources.)
   */
  force?: boolean;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisDeploymentsGetIamPolicy.
 */
export interface ProjectsLocationsApisDeploymentsGetIamPolicyOptions {
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
 * Additional options for ApigeeRegistry#projectsLocationsApisDeploymentsList.
 */
export interface ProjectsLocationsApisDeploymentsListOptions {
  /**
   * An expression that can be used to filter the list. Filters use the Common
   * Expression Language and can refer to all message fields.
   */
  filter?: string;
  /**
   * A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in
   * descending order using the "desc" identifier, e.g. "foo desc,bar"
   */
  orderBy?: string;
  /**
   * The maximum number of deployments to return. The service may return fewer
   * than this value. If unspecified, at most 50 values will be returned. The
   * maximum is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListApiDeployments` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListApiDeployments` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisDeploymentsListRevisions.
 */
export interface ProjectsLocationsApisDeploymentsListRevisionsOptions {
  /**
   * An expression that can be used to filter the list. Filters use the Common
   * Expression Language and can refer to all message fields.
   */
  filter?: string;
  /**
   * The maximum number of revisions to return per page.
   */
  pageSize?: number;
  /**
   * The page token, received from a previous ListApiDeploymentRevisions call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for ApigeeRegistry#projectsLocationsApisDeploymentsPatch.
 */
export interface ProjectsLocationsApisDeploymentsPatchOptions {
  /**
   * If set to true, and the deployment is not found, a new deployment will be
   * created. In this situation, `update_mask` is ignored.
   */
  allowMissing?: boolean;
  /**
   * The list of fields to be updated. If omitted, all fields are updated that
   * are set in the request message (fields set to default values are ignored).
   * If an asterisk "*" is specified, all fields are updated, including fields
   * that are unspecified/default in the request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsApisDeploymentsPatchOptions(data: any): ProjectsLocationsApisDeploymentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsApisDeploymentsPatchOptions(data: any): ProjectsLocationsApisDeploymentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for ApigeeRegistry#projectsLocationsApisGetIamPolicy.
 */
export interface ProjectsLocationsApisGetIamPolicyOptions {
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
 * Additional options for ApigeeRegistry#projectsLocationsApisList.
 */
export interface ProjectsLocationsApisListOptions {
  /**
   * An expression that can be used to filter the list. Filters use the Common
   * Expression Language and can refer to all message fields.
   */
  filter?: string;
  /**
   * A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in
   * descending order using the "desc" identifier, e.g. "foo desc,bar"
   */
  orderBy?: string;
  /**
   * The maximum number of APIs to return. The service may return fewer than
   * this value. If unspecified, at most 50 values will be returned. The maximum
   * is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListApis` call. Provide this to
   * retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListApis` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for ApigeeRegistry#projectsLocationsApisPatch.
 */
export interface ProjectsLocationsApisPatchOptions {
  /**
   * If set to true, and the API is not found, a new API will be created. In
   * this situation, `update_mask` is ignored.
   */
  allowMissing?: boolean;
  /**
   * The list of fields to be updated. If omitted, all fields are updated that
   * are set in the request message (fields set to default values are ignored).
   * If an asterisk "*" is specified, all fields are updated, including fields
   * that are unspecified/default in the request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsApisPatchOptions(data: any): ProjectsLocationsApisPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsApisPatchOptions(data: any): ProjectsLocationsApisPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisVersionsArtifactsCreate.
 */
export interface ProjectsLocationsApisVersionsArtifactsCreateOptions {
  /**
   * Required. The ID to use for the artifact, which will become the final
   * component of the artifact's resource name. This value should be 4-63
   * characters, and valid characters are /a-z-/. Following AIP-162, IDs must
   * not have the form of a UUID.
   */
  artifactId?: string;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisVersionsArtifactsGetIamPolicy.
 */
export interface ProjectsLocationsApisVersionsArtifactsGetIamPolicyOptions {
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
 * ApigeeRegistry#projectsLocationsApisVersionsArtifactsList.
 */
export interface ProjectsLocationsApisVersionsArtifactsListOptions {
  /**
   * An expression that can be used to filter the list. Filters use the Common
   * Expression Language and can refer to all message fields except contents.
   */
  filter?: string;
  /**
   * A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in
   * descending order using the "desc" identifier, e.g. "foo desc,bar"
   */
  orderBy?: string;
  /**
   * The maximum number of artifacts to return. The service may return fewer
   * than this value. If unspecified, at most 50 values will be returned. The
   * maximum is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListArtifacts` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListArtifacts` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for ApigeeRegistry#projectsLocationsApisVersionsCreate.
 */
export interface ProjectsLocationsApisVersionsCreateOptions {
  /**
   * Required. The ID to use for the version, which will become the final
   * component of the version's resource name. This value should be 1-63
   * characters, and valid characters are /a-z-/. Following AIP-162, IDs must
   * not have the form of a UUID.
   */
  apiVersionId?: string;
}

/**
 * Additional options for ApigeeRegistry#projectsLocationsApisVersionsDelete.
 */
export interface ProjectsLocationsApisVersionsDeleteOptions {
  /**
   * If set to true, any child resources will also be deleted. (Otherwise, the
   * request will only work if there are no child resources.)
   */
  force?: boolean;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisVersionsGetIamPolicy.
 */
export interface ProjectsLocationsApisVersionsGetIamPolicyOptions {
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
 * Additional options for ApigeeRegistry#projectsLocationsApisVersionsList.
 */
export interface ProjectsLocationsApisVersionsListOptions {
  /**
   * An expression that can be used to filter the list. Filters use the Common
   * Expression Language and can refer to all message fields.
   */
  filter?: string;
  /**
   * A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in
   * descending order using the "desc" identifier, e.g. "foo desc,bar"
   */
  orderBy?: string;
  /**
   * The maximum number of versions to return. The service may return fewer
   * than this value. If unspecified, at most 50 values will be returned. The
   * maximum is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListApiVersions` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListApiVersions` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for ApigeeRegistry#projectsLocationsApisVersionsPatch.
 */
export interface ProjectsLocationsApisVersionsPatchOptions {
  /**
   * If set to true, and the version is not found, a new version will be
   * created. In this situation, `update_mask` is ignored.
   */
  allowMissing?: boolean;
  /**
   * The list of fields to be updated. If omitted, all fields are updated that
   * are set in the request message (fields set to default values are ignored).
   * If an asterisk "*" is specified, all fields are updated, including fields
   * that are unspecified/default in the request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsApisVersionsPatchOptions(data: any): ProjectsLocationsApisVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsApisVersionsPatchOptions(data: any): ProjectsLocationsApisVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisVersionsSpecsArtifactsCreate.
 */
export interface ProjectsLocationsApisVersionsSpecsArtifactsCreateOptions {
  /**
   * Required. The ID to use for the artifact, which will become the final
   * component of the artifact's resource name. This value should be 4-63
   * characters, and valid characters are /a-z-/. Following AIP-162, IDs must
   * not have the form of a UUID.
   */
  artifactId?: string;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisVersionsSpecsArtifactsGetIamPolicy.
 */
export interface ProjectsLocationsApisVersionsSpecsArtifactsGetIamPolicyOptions {
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
 * ApigeeRegistry#projectsLocationsApisVersionsSpecsArtifactsList.
 */
export interface ProjectsLocationsApisVersionsSpecsArtifactsListOptions {
  /**
   * An expression that can be used to filter the list. Filters use the Common
   * Expression Language and can refer to all message fields except contents.
   */
  filter?: string;
  /**
   * A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in
   * descending order using the "desc" identifier, e.g. "foo desc,bar"
   */
  orderBy?: string;
  /**
   * The maximum number of artifacts to return. The service may return fewer
   * than this value. If unspecified, at most 50 values will be returned. The
   * maximum is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListArtifacts` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListArtifacts` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisVersionsSpecsCreate.
 */
export interface ProjectsLocationsApisVersionsSpecsCreateOptions {
  /**
   * Required. The ID to use for the spec, which will become the final
   * component of the spec's resource name. This value should be 4-63
   * characters, and valid characters are /a-z-/. Following AIP-162, IDs must
   * not have the form of a UUID.
   */
  apiSpecId?: string;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisVersionsSpecsDelete.
 */
export interface ProjectsLocationsApisVersionsSpecsDeleteOptions {
  /**
   * If set to true, any child resources will also be deleted. (Otherwise, the
   * request will only work if there are no child resources.)
   */
  force?: boolean;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisVersionsSpecsGetIamPolicy.
 */
export interface ProjectsLocationsApisVersionsSpecsGetIamPolicyOptions {
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
 * ApigeeRegistry#projectsLocationsApisVersionsSpecsList.
 */
export interface ProjectsLocationsApisVersionsSpecsListOptions {
  /**
   * An expression that can be used to filter the list. Filters use the Common
   * Expression Language and can refer to all message fields except contents.
   */
  filter?: string;
  /**
   * A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in
   * descending order using the "desc" identifier, e.g. "foo desc,bar"
   */
  orderBy?: string;
  /**
   * The maximum number of specs to return. The service may return fewer than
   * this value. If unspecified, at most 50 values will be returned. The maximum
   * is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListApiSpecs` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListApiSpecs` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisVersionsSpecsListRevisions.
 */
export interface ProjectsLocationsApisVersionsSpecsListRevisionsOptions {
  /**
   * An expression that can be used to filter the list. Filters use the Common
   * Expression Language and can refer to all message fields.
   */
  filter?: string;
  /**
   * The maximum number of revisions to return per page.
   */
  pageSize?: number;
  /**
   * The page token, received from a previous ListApiSpecRevisions call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsApisVersionsSpecsPatch.
 */
export interface ProjectsLocationsApisVersionsSpecsPatchOptions {
  /**
   * If set to true, and the spec is not found, a new spec will be created. In
   * this situation, `update_mask` is ignored.
   */
  allowMissing?: boolean;
  /**
   * The list of fields to be updated. If omitted, all fields are updated that
   * are set in the request message (fields set to default values are ignored).
   * If an asterisk "*" is specified, all fields are updated, including fields
   * that are unspecified/default in the request.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsApisVersionsSpecsPatchOptions(data: any): ProjectsLocationsApisVersionsSpecsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsApisVersionsSpecsPatchOptions(data: any): ProjectsLocationsApisVersionsSpecsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for ApigeeRegistry#projectsLocationsArtifactsCreate.
 */
export interface ProjectsLocationsArtifactsCreateOptions {
  /**
   * Required. The ID to use for the artifact, which will become the final
   * component of the artifact's resource name. This value should be 4-63
   * characters, and valid characters are /a-z-/. Following AIP-162, IDs must
   * not have the form of a UUID.
   */
  artifactId?: string;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsArtifactsGetIamPolicy.
 */
export interface ProjectsLocationsArtifactsGetIamPolicyOptions {
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
 * Additional options for ApigeeRegistry#projectsLocationsArtifactsList.
 */
export interface ProjectsLocationsArtifactsListOptions {
  /**
   * An expression that can be used to filter the list. Filters use the Common
   * Expression Language and can refer to all message fields except contents.
   */
  filter?: string;
  /**
   * A comma-separated list of fields, e.g. "foo,bar" Fields can be sorted in
   * descending order using the "desc" identifier, e.g. "foo desc,bar"
   */
  orderBy?: string;
  /**
   * The maximum number of artifacts to return. The service may return fewer
   * than this value. If unspecified, at most 50 values will be returned. The
   * maximum is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListArtifacts` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListArtifacts` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for ApigeeRegistry#projectsLocationsInstancesCreate.
 */
export interface ProjectsLocationsInstancesCreateOptions {
  /**
   * Required. Identifier to assign to the Instance. Must be unique within
   * scope of the parent resource.
   */
  instanceId?: string;
}

/**
 * Additional options for
 * ApigeeRegistry#projectsLocationsInstancesGetIamPolicy.
 */
export interface ProjectsLocationsInstancesGetIamPolicyOptions {
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
 * Additional options for ApigeeRegistry#projectsLocationsList.
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
 * Additional options for ApigeeRegistry#projectsLocationsOperationsList.
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
 * Additional options for ApigeeRegistry#projectsLocationsRuntimeGetIamPolicy.
 */
export interface ProjectsLocationsRuntimeGetIamPolicyOptions {
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
 * Request message for RollbackApiDeployment.
 */
export interface RollbackApiDeploymentRequest {
  /**
   * Required. The revision ID to roll back to. It must be a revision of the
   * same deployment. Example: `c7cfa2a8`
   */
  revisionId?: string;
}

/**
 * Request message for RollbackApiSpec.
 */
export interface RollbackApiSpecRequest {
  /**
   * Required. The revision ID to roll back to. It must be a revision of the
   * same spec. Example: `c7cfa2a8`
   */
  revisionId?: string;
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
 * Request message for TagApiDeploymentRevision.
 */
export interface TagApiDeploymentRevisionRequest {
  /**
   * Required. The tag to apply. The tag should be at most 40 characters, and
   * match `a-z{3,39}`.
   */
  tag?: string;
}

/**
 * Request message for TagApiSpecRevision.
 */
export interface TagApiSpecRevisionRequest {
  /**
   * Required. The tag to apply. The tag should be at most 40 characters, and
   * match `a-z{3,39}`.
   */
  tag?: string;
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
