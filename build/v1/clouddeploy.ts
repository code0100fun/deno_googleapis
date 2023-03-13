// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Cloud Deploy API Client for Deno
 * =======================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/deploy/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class CloudDeploy {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://clouddeploy.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new DeliveryPipeline in a given project and location.
   *
   * @param parent Required. The parent collection in which the `DeliveryPipeline` should be created. Format should be projects/{project_id}/locations/{location_name}.
   */
  async projectsLocationsDeliveryPipelinesCreate(parent: string, req: DeliveryPipeline, opts: ProjectsLocationsDeliveryPipelinesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deliveryPipelines`);
    if (opts.deliveryPipelineId !== undefined) {
      url.searchParams.append("deliveryPipelineId", String(opts.deliveryPipelineId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Deletes a single DeliveryPipeline.
   *
   * @param name Required. The name of the `DeliveryPipeline` to delete. Format should be projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}.
   */
  async projectsLocationsDeliveryPipelinesDelete(name: string, opts: ProjectsLocationsDeliveryPipelinesDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Gets details of a single DeliveryPipeline.
   *
   * @param name Required. Name of the `DeliveryPipeline`. Format must be projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}.
   */
  async projectsLocationsDeliveryPipelinesGet(name: string): Promise<DeliveryPipeline> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as DeliveryPipeline;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDeliveryPipelinesGetIamPolicy(resource: string, opts: ProjectsLocationsDeliveryPipelinesGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists DeliveryPipelines in a given project and location.
   *
   * @param parent Required. The parent, which owns this collection of pipelines. Format must be projects/{project_id}/locations/{location_name}.
   */
  async projectsLocationsDeliveryPipelinesList(parent: string, opts: ProjectsLocationsDeliveryPipelinesListOptions = {}): Promise<ListDeliveryPipelinesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/deliveryPipelines`);
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
    return data as ListDeliveryPipelinesResponse;
  }

  /**
   * Updates the parameters of a single DeliveryPipeline.
   *
   * @param name Optional. Name of the `DeliveryPipeline`. Format is projects/{project}/ locations/{location}/deliveryPipelines/a-z{0,62}.
   */
  async projectsLocationsDeliveryPipelinesPatch(name: string, req: DeliveryPipeline, opts: ProjectsLocationsDeliveryPipelinesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsDeliveryPipelinesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Abandons a Release in the Delivery Pipeline.
   *
   * @param name Required. Name of the Release. Format is projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/ releases/{release}.
   */
  async projectsLocationsDeliveryPipelinesReleasesAbandon(name: string, req: AbandonReleaseRequest): Promise<AbandonReleaseResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:abandon`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AbandonReleaseResponse;
  }

  /**
   * Creates a new Release in a given project and location.
   *
   * @param parent Required. The parent collection in which the `Release` should be created. Format should be projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}.
   */
  async projectsLocationsDeliveryPipelinesReleasesCreate(parent: string, req: Release, opts: ProjectsLocationsDeliveryPipelinesReleasesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/releases`);
    if (opts.releaseId !== undefined) {
      url.searchParams.append("releaseId", String(opts.releaseId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Gets details of a single Release.
   *
   * @param name Required. Name of the `Release`. Format must be projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/releases/{release_name}.
   */
  async projectsLocationsDeliveryPipelinesReleasesGet(name: string): Promise<Release> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Release;
  }

  /**
   * Lists Releases in a given project and location.
   *
   * @param parent Required. The `DeliveryPipeline` which owns this collection of `Release` objects.
   */
  async projectsLocationsDeliveryPipelinesReleasesList(parent: string, opts: ProjectsLocationsDeliveryPipelinesReleasesListOptions = {}): Promise<ListReleasesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/releases`);
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
    return data as ListReleasesResponse;
  }

  /**
   * Approves a Rollout.
   *
   * @param name Required. Name of the Rollout. Format is projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/ releases/{release}/rollouts/{rollout}.
   */
  async projectsLocationsDeliveryPipelinesReleasesRolloutsApprove(name: string, req: ApproveRolloutRequest): Promise<ApproveRolloutResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:approve`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ApproveRolloutResponse;
  }

  /**
   * Creates a new Rollout in a given project and location.
   *
   * @param parent Required. The parent collection in which the `Rollout` should be created. Format should be projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/releases/{release_name}.
   */
  async projectsLocationsDeliveryPipelinesReleasesRolloutsCreate(parent: string, req: Rollout, opts: ProjectsLocationsDeliveryPipelinesReleasesRolloutsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/rollouts`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.rolloutId !== undefined) {
      url.searchParams.append("rolloutId", String(opts.rolloutId));
    }
    if (opts.startingPhaseId !== undefined) {
      url.searchParams.append("startingPhaseId", String(opts.startingPhaseId));
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
   * Gets details of a single Rollout.
   *
   * @param name Required. Name of the `Rollout`. Format must be projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/releases/{release_name}/rollouts/{rollout_name}.
   */
  async projectsLocationsDeliveryPipelinesReleasesRolloutsGet(name: string): Promise<Rollout> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Rollout;
  }

  /**
   * Gets details of a single JobRun.
   *
   * @param name Required. Name of the `JobRun`. Format must be projects/{project_id}/locations/{location_name}/deliveryPipelines/{pipeline_name}/releases/{release_name}/rollouts/{rollout_name}/jobRuns/{job_run_name}.
   */
  async projectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsGet(name: string): Promise<JobRun> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as JobRun;
  }

  /**
   * Lists JobRuns in a given project and location.
   *
   * @param parent Required. The `Rollout` which owns this collection of `JobRun` objects.
   */
  async projectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsList(parent: string, opts: ProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsListOptions = {}): Promise<ListJobRunsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/jobRuns`);
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
    return data as ListJobRunsResponse;
  }

  /**
   * Lists Rollouts in a given project and location.
   *
   * @param parent Required. The `Release` which owns this collection of `Rollout` objects.
   */
  async projectsLocationsDeliveryPipelinesReleasesRolloutsList(parent: string, opts: ProjectsLocationsDeliveryPipelinesReleasesRolloutsListOptions = {}): Promise<ListRolloutsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/rollouts`);
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
    return data as ListRolloutsResponse;
  }

  /**
   * Retries the specified Job in a Rollout.
   *
   * @param rollout Required. Name of the Rollout. Format is projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/ releases/{release}/rollouts/{rollout}.
   */
  async projectsLocationsDeliveryPipelinesReleasesRolloutsRetryJob(rollout: string, req: RetryJobRequest): Promise<RetryJobResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ rollout }:retryJob`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as RetryJobResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDeliveryPipelinesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsDeliveryPipelinesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Gets the configuration for a location.
   *
   * @param name Required. Name of requested configuration.
   */
  async projectsLocationsGetConfig(name: string): Promise<Config> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeConfig(data);
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
   * Creates a new Target in a given project and location.
   *
   * @param parent Required. The parent collection in which the `Target` should be created. Format should be projects/{project_id}/locations/{location_name}.
   */
  async projectsLocationsTargetsCreate(parent: string, req: Target, opts: ProjectsLocationsTargetsCreateOptions = {}): Promise<Operation> {
    req = serializeTarget(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/targets`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.targetId !== undefined) {
      url.searchParams.append("targetId", String(opts.targetId));
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
   * Deletes a single Target.
   *
   * @param name Required. The name of the `Target` to delete. Format should be projects/{project_id}/locations/{location_name}/targets/{target_name}.
   */
  async projectsLocationsTargetsDelete(name: string, opts: ProjectsLocationsTargetsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Gets details of a single Target.
   *
   * @param name Required. Name of the `Target`. Format must be projects/{project_id}/locations/{location_name}/targets/{target_name}.
   */
  async projectsLocationsTargetsGet(name: string): Promise<Target> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTarget(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsTargetsGetIamPolicy(resource: string, opts: ProjectsLocationsTargetsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists Targets in a given project and location.
   *
   * @param parent Required. The parent, which owns this collection of targets. Format must be projects/{project_id}/locations/{location_name}.
   */
  async projectsLocationsTargetsList(parent: string, opts: ProjectsLocationsTargetsListOptions = {}): Promise<ListTargetsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/targets`);
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
    return deserializeListTargetsResponse(data);
  }

  /**
   * Updates the parameters of a single Target.
   *
   * @param name Optional. Name of the `Target`. Format is projects/{project}/locations/{location}/targets/a-z{0,62}.
   */
  async projectsLocationsTargetsPatch(name: string, req: Target, opts: ProjectsLocationsTargetsPatchOptions = {}): Promise<Operation> {
    req = serializeTarget(req);
    opts = serializeProjectsLocationsTargetsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
  async projectsLocationsTargetsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsTargetsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
 * The request object used by `AbandonRelease`.
 */
export interface AbandonReleaseRequest {
}

/**
 * The response object for `AbandonRelease`.
 */
export interface AbandonReleaseResponse {
}

/**
 * An advanceChildRollout Job.
 */
export interface AdvanceChildRolloutJob {
}

/**
 * AdvanceChildRolloutJobRun contains information specific to a
 * advanceChildRollout `JobRun`.
 */
export interface AdvanceChildRolloutJobRun {
  /**
   * Output only. Name of the `ChildRollout`. Format is projects/{project}/
   * locations/{location}/deliveryPipelines/{deliveryPipeline}/
   * releases/{release}/rollouts/a-z{0,62}.
   */
  readonly rollout?: string;
  /**
   * Output only. the ID of the ChildRollout's Phase.
   */
  readonly rolloutPhaseId?: string;
}

/**
 * Information specifying an Anthos Cluster.
 */
export interface AnthosCluster {
  /**
   * Membership of the GKE Hub-registered cluster to which to apply the
   * Skaffold configuration. Format is
   * `projects/{project}/locations/{location}/memberships/{membership_name}`.
   */
  membership?: string;
}

/**
 * The request object used by `ApproveRollout`.
 */
export interface ApproveRolloutRequest {
  /**
   * Required. True = approve; false = reject
   */
  approved?: boolean;
}

/**
 * The response object from `ApproveRollout`.
 */
export interface ApproveRolloutResponse {
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
 * Description of an a image to use during Skaffold rendering.
 */
export interface BuildArtifact {
  /**
   * Image name in Skaffold configuration.
   */
  image?: string;
  /**
   * Image tag to use. This will generally be the full path to an image, such
   * as "gcr.io/my-project/busybox:1.2.3" or
   * "gcr.io/my-project/busybox@sha256:abc123".
   */
  tag?: string;
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * ChildRollouts job composition
 */
export interface ChildRolloutJobs {
  /**
   * Output only. List of AdvanceChildRolloutJobs
   */
  readonly advanceRolloutJobs?: Job[];
  /**
   * Output only. List of CreateChildRolloutJobs
   */
  readonly createRolloutJobs?: Job[];
}

/**
 * Information specifying where to deploy a Cloud Run Service.
 */
export interface CloudRunLocation {
  /**
   * Required. The location for the Cloud Run Service. Format must be
   * `projects/{project}/locations/{location}`.
   */
  location?: string;
}

/**
 * CloudRunMetadata contains information from a Cloud Run deployment.
 */
export interface CloudRunMetadata {
  /**
   * Output only. The Cloud Run Revision id associated with a `Rollout`.
   */
  readonly revision?: string;
  /**
   * Output only. The name of the Cloud Run Service that is associated with a
   * `Rollout`. Format is
   * projects/{project}/locations/{location}/services/{service}.
   */
  readonly service?: string;
  /**
   * Output only. The Cloud Run Service urls that are associated with a
   * `Rollout`.
   */
  readonly serviceUrls?: string[];
}

/**
 * Service-wide configuration.
 */
export interface Config {
  /**
   * Default Skaffold version that is assigned when a Release is created
   * without specifying a Skaffold version.
   */
  defaultSkaffoldVersion?: string;
  /**
   * Name of the configuration.
   */
  name?: string;
  /**
   * All supported versions of Skaffold.
   */
  supportedVersions?: SkaffoldVersion[];
}

function serializeConfig(data: any): Config {
  return {
    ...data,
    supportedVersions: data["supportedVersions"] !== undefined ? data["supportedVersions"].map((item: any) => (serializeSkaffoldVersion(item))) : undefined,
  };
}

function deserializeConfig(data: any): Config {
  return {
    ...data,
    supportedVersions: data["supportedVersions"] !== undefined ? data["supportedVersions"].map((item: any) => (deserializeSkaffoldVersion(item))) : undefined,
  };
}

/**
 * A createChildRollout Job.
 */
export interface CreateChildRolloutJob {
}

/**
 * CreateChildRolloutJobRun contains information specific to a
 * createChildRollout `JobRun`.
 */
export interface CreateChildRolloutJobRun {
  /**
   * Output only. Name of the `ChildRollout`. Format is projects/{project}/
   * locations/{location}/deliveryPipelines/{deliveryPipeline}/
   * releases/{release}/rollouts/a-z{0,62}.
   */
  readonly rollout?: string;
  /**
   * Output only. The ID of the childRollout Phase initiated by this JobRun.
   */
  readonly rolloutPhaseId?: string;
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
export interface Date {
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
 * Execution using the default Cloud Build pool.
 */
export interface DefaultPool {
  /**
   * Optional. Cloud Storage location where execution outputs should be stored.
   * This can either be a bucket ("gs://my-bucket") or a path within a bucket
   * ("gs://my-bucket/my-dir"). If unspecified, a default bucket located in the
   * same region will be used.
   */
  artifactStorage?: string;
  /**
   * Optional. Google service account to use for execution. If unspecified, the
   * project execution service account (-compute@developer.gserviceaccount.com)
   * will be used.
   */
  serviceAccount?: string;
}

/**
 * A `DeliveryPipeline` resource in the Google Cloud Deploy API. A
 * `DeliveryPipeline` defines a pipeline through which a Skaffold configuration
 * can progress.
 */
export interface DeliveryPipeline {
  /**
   * User annotations. These attributes can only be set and used by the user,
   * and not by Google Cloud Deploy.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. Information around the state of the Delivery Pipeline.
   */
  readonly condition?: PipelineCondition;
  /**
   * Output only. Time at which the pipeline was created.
   */
  readonly createTime?: Date;
  /**
   * Description of the `DeliveryPipeline`. Max length is 255 characters.
   */
  description?: string;
  /**
   * This checksum is computed by the server based on the value of other
   * fields, and may be sent on update and delete requests to ensure the client
   * has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Labels are attributes that can be set and used by both the user and by
   * Google Cloud Deploy. Labels must meet the following constraints: * Keys and
   * values can contain only lowercase letters, numeric characters, underscores,
   * and dashes. * All characters must use UTF-8 encoding, and international
   * characters are allowed. * Keys must start with a lowercase letter or
   * international character. * Each resource is limited to a maximum of 64
   * labels. Both keys and values are additionally constrained to be <= 128
   * bytes.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. Name of the `DeliveryPipeline`. Format is projects/{project}/
   * locations/{location}/deliveryPipelines/a-z{0,62}.
   */
  name?: string;
  /**
   * SerialPipeline defines a sequential set of stages for a
   * `DeliveryPipeline`.
   */
  serialPipeline?: SerialPipeline;
  /**
   * When suspended, no new releases or rollouts can be created, but
   * in-progress ones will complete.
   */
  suspended?: boolean;
  /**
   * Output only. Unique identifier of the `DeliveryPipeline`.
   */
  readonly uid?: string;
  /**
   * Output only. Most recent time at which the pipeline was updated.
   */
  readonly updateTime?: Date;
}

/**
 * Payload proto for "clouddeploy.googleapis.com/deliverypipeline_notification"
 * Platform Log event that describes the failure to send delivery pipeline
 * status change Pub/Sub notification.
 */
export interface DeliveryPipelineNotificationEvent {
  /**
   * The name of the `Delivery Pipeline`.
   */
  deliveryPipeline?: string;
  /**
   * Debug message for when a notification fails to send.
   */
  message?: string;
  /**
   * Type of this notification, e.g. for a Pub/Sub failure.
   */
  type?:  | "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RENDER_STATUES_CHANGE";
}

/**
 * A deploy Job.
 */
export interface DeployJob {
}

/**
 * DeployJobRun contains information specific to a deploy `JobRun`.
 */
export interface DeployJobRun {
  /**
   * Output only. The resource name of the Cloud Build `Build` object that is
   * used to deploy. Format is
   * projects/{project}/locations/{location}/builds/{build}.
   */
  readonly build?: string;
  /**
   * Output only. The reason the deploy failed. This will always be unspecified
   * while the deploy is in progress or if it succeeded.
   */
  readonly failureCause?:  | "FAILURE_CAUSE_UNSPECIFIED" | "CLOUD_BUILD_UNAVAILABLE" | "EXECUTION_FAILED" | "DEADLINE_EXCEEDED" | "CLOUD_BUILD_REQUEST_FAILED";
  /**
   * Output only. Additional information about the deploy failure, if
   * available.
   */
  readonly failureMessage?: string;
  /**
   * Output only. Metadata containing information about the deploy job run.
   */
  readonly metadata?: DeployJobRunMetadata;
}

/**
 * DeployJobRunMetadata surfaces information associated with a `DeployJobRun`
 * to the user.
 */
export interface DeployJobRunMetadata {
  /**
   * Output only. The name of the Cloud Run Service that is associated with a
   * `DeployJobRun`.
   */
  readonly cloudRun?: CloudRunMetadata;
}

/**
 * Deployment job composition.
 */
export interface DeploymentJobs {
  /**
   * Output only. The deploy Job. This is the first job run in the phase.
   */
  readonly deployJob?: Job;
  /**
   * Output only. The verify Job. Runs after a deploy if the deploy succeeds.
   */
  readonly verifyJob?: Job;
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
 * Configuration of the environment to use when calling Skaffold.
 */
export interface ExecutionConfig {
  /**
   * Optional. Cloud Storage location in which to store execution outputs. This
   * can either be a bucket ("gs://my-bucket") or a path within a bucket
   * ("gs://my-bucket/my-dir"). If unspecified, a default bucket located in the
   * same region will be used.
   */
  artifactStorage?: string;
  /**
   * Optional. Use default Cloud Build pool.
   */
  defaultPool?: DefaultPool;
  /**
   * Optional. Execution timeout for a Cloud Build Execution. This must be
   * between 10m and 24h in seconds format. If unspecified, a default timeout of
   * 1h is used.
   */
  executionTimeout?: number /* Duration */;
  /**
   * Optional. Use private Cloud Build pool.
   */
  privatePool?: PrivatePool;
  /**
   * Optional. Google service account to use for execution. If unspecified, the
   * project execution service account (-compute@developer.gserviceaccount.com)
   * is used.
   */
  serviceAccount?: string;
  /**
   * Required. Usages when this configuration should be applied.
   */
  usages?:  | "EXECUTION_ENVIRONMENT_USAGE_UNSPECIFIED" | "RENDER" | "DEPLOY" | "VERIFY"[];
  /**
   * Optional. The resource name of the `WorkerPool`, with the format
   * `projects/{project}/locations/{location}/workerPools/{worker_pool}`. If
   * this optional field is unspecified, the default Cloud Build pool will be
   * used.
   */
  workerPool?: string;
}

function serializeExecutionConfig(data: any): ExecutionConfig {
  return {
    ...data,
    executionTimeout: data["executionTimeout"] !== undefined ? data["executionTimeout"] : undefined,
  };
}

function deserializeExecutionConfig(data: any): ExecutionConfig {
  return {
    ...data,
    executionTimeout: data["executionTimeout"] !== undefined ? data["executionTimeout"] : undefined,
  };
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
 * Information specifying a GKE Cluster.
 */
export interface GkeCluster {
  /**
   * Information specifying a GKE Cluster. Format is
   * `projects/{project_id}/locations/{location_id}/clusters/{cluster_id}.
   */
  cluster?: string;
  /**
   * Optional. If true, `cluster` is accessed using the private IP address of
   * the control plane endpoint. Otherwise, the default IP address of the
   * control plane endpoint is used. The default IP address is the private IP
   * address for clusters with private control-plane endpoints and the public IP
   * address otherwise. Only specify this option when `cluster` is a [private
   * GKE
   * cluster](https://cloud.google.com/kubernetes-engine/docs/concepts/private-cluster-concept).
   */
  internalIp?: boolean;
}

/**
 * Job represents an operation for a `Rollout`.
 */
export interface Job {
  /**
   * Output only. An advanceChildRollout Job.
   */
  readonly advanceChildRolloutJob?: AdvanceChildRolloutJob;
  /**
   * Output only. A createChildRollout Job.
   */
  readonly createChildRolloutJob?: CreateChildRolloutJob;
  /**
   * Output only. A deploy Job.
   */
  readonly deployJob?: DeployJob;
  /**
   * Output only. The ID of the Job.
   */
  readonly id?: string;
  /**
   * Output only. The name of the `JobRun` responsible for the most recent
   * invocation of this Job.
   */
  readonly jobRun?: string;
  /**
   * Output only. The current state of the Job.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "DISABLED" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "ABORTED";
  /**
   * Output only. A verify Job.
   */
  readonly verifyJob?: VerifyJob;
}

/**
 * A `JobRun` resource in the Google Cloud Deploy API. A `JobRun` contains
 * information of a single `Rollout` job evaluation.
 */
export interface JobRun {
  /**
   * Output only. Information specific to an advanceChildRollout `JobRun`
   */
  readonly advanceChildRolloutJobRun?: AdvanceChildRolloutJobRun;
  /**
   * Output only. Information specific to a createChildRollout `JobRun`.
   */
  readonly createChildRolloutJobRun?: CreateChildRolloutJobRun;
  /**
   * Output only. Time at which the `JobRun` was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Information specific to a deploy `JobRun`.
   */
  readonly deployJobRun?: DeployJobRun;
  /**
   * Output only. Time at which the `JobRun` ended.
   */
  readonly endTime?: Date;
  /**
   * Output only. This checksum is computed by the server based on the value of
   * other fields, and may be sent on update and delete requests to ensure the
   * client has an up-to-date value before proceeding.
   */
  readonly etag?: string;
  /**
   * Output only. ID of the `Rollout` job this `JobRun` corresponds to.
   */
  readonly jobId?: string;
  /**
   * Optional. Name of the `JobRun`. Format is
   * projects/{project}/locations/{location}/
   * deliveryPipelines/{deliveryPipeline}/releases/{releases}/rollouts/
   * {rollouts}/jobRuns/{uuid}.
   */
  name?: string;
  /**
   * Output only. ID of the `Rollout` phase this `JobRun` belongs in.
   */
  readonly phaseId?: string;
  /**
   * Output only. Time at which the `JobRun` was started.
   */
  readonly startTime?: Date;
  /**
   * Output only. The current state of the `JobRun`.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED";
  /**
   * Output only. Unique identifier of the `JobRun`.
   */
  readonly uid?: string;
  /**
   * Output only. Information specific to a verify `JobRun`.
   */
  readonly verifyJobRun?: VerifyJobRun;
}

/**
 * Payload proto for "clouddeploy.googleapis.com/jobrun_notification" Platform
 * Log event that describes the failure to send JobRun resource update Pub/Sub
 * notification.
 */
export interface JobRunNotificationEvent {
  /**
   * The name of the `JobRun`.
   */
  jobRun?: string;
  /**
   * Debug message for when a notification fails to send.
   */
  message?: string;
  /**
   * Unique identifier of the `DeliveryPipeline`.
   */
  pipelineUid?: string;
  /**
   * Unique identifier of the `Release`.
   */
  releaseUid?: string;
  /**
   * Unique identifier of the `Rollout`.
   */
  rolloutUid?: string;
  /**
   * ID of the `Target`.
   */
  targetId?: string;
  /**
   * Type of this notification, e.g. for a Pub/Sub failure.
   */
  type?:  | "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RENDER_STATUES_CHANGE";
}

/**
 * The response object from `ListDeliveryPipelines`.
 */
export interface ListDeliveryPipelinesResponse {
  /**
   * The `DeliveryPipeline` objects.
   */
  deliveryPipelines?: DeliveryPipeline[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * ListJobRunsResponse is the response object returned by `ListJobRuns`.
 */
export interface ListJobRunsResponse {
  /**
   * The `JobRun` objects.
   */
  jobRuns?: JobRun[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached
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
 * The response object from `ListReleases`.
 */
export interface ListReleasesResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The `Release` objects.
   */
  releases?: Release[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * ListRolloutsResponse is the response object reutrned by `ListRollouts`.
 */
export interface ListRolloutsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The `Rollout` objects.
   */
  rollouts?: Rollout[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * The response object from `ListTargets`.
 */
export interface ListTargetsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The `Target` objects.
   */
  targets?: Target[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

function serializeListTargetsResponse(data: any): ListTargetsResponse {
  return {
    ...data,
    targets: data["targets"] !== undefined ? data["targets"].map((item: any) => (serializeTarget(item))) : undefined,
  };
}

function deserializeListTargetsResponse(data: any): ListTargetsResponse {
  return {
    ...data,
    targets: data["targets"] !== undefined ? data["targets"].map((item: any) => (deserializeTarget(item))) : undefined,
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
 * Metadata includes information associated with a `Rollout`.
 */
export interface Metadata {
  /**
   * Output only. The name of the Cloud Run Service that is associated with a
   * `Rollout`.
   */
  readonly cloudRun?: CloudRunMetadata;
}

/**
 * Information specifying a multiTarget.
 */
export interface MultiTarget {
  /**
   * Required. The target_ids of this multiTarget.
   */
  targetIds?: string[];
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
 * Phase represents a collection of jobs that are logically grouped together
 * for a `Rollout`.
 */
export interface Phase {
  /**
   * Output only. ChildRollout job composition.
   */
  readonly childRolloutJobs?: ChildRolloutJobs;
  /**
   * Output only. Deployment job composition.
   */
  readonly deploymentJobs?: DeploymentJobs;
  /**
   * Output only. The ID of the Phase.
   */
  readonly id?: string;
  /**
   * Output only. Current state of the Phase.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "ABORTED";
}

/**
 * PipelineCondition contains all conditions relevant to a Delivery Pipeline.
 */
export interface PipelineCondition {
  /**
   * Details around the Pipeline's overall status.
   */
  pipelineReadyCondition?: PipelineReadyCondition;
  /**
   * Details around targets enumerated in the pipeline.
   */
  targetsPresentCondition?: TargetsPresentCondition;
  /**
   * Details on the whether the targets enumerated in the pipeline are of the
   * same type.
   */
  targetsTypeCondition?: TargetsTypeCondition;
}

function serializePipelineCondition(data: any): PipelineCondition {
  return {
    ...data,
    pipelineReadyCondition: data["pipelineReadyCondition"] !== undefined ? serializePipelineReadyCondition(data["pipelineReadyCondition"]) : undefined,
    targetsPresentCondition: data["targetsPresentCondition"] !== undefined ? serializeTargetsPresentCondition(data["targetsPresentCondition"]) : undefined,
  };
}

function deserializePipelineCondition(data: any): PipelineCondition {
  return {
    ...data,
    pipelineReadyCondition: data["pipelineReadyCondition"] !== undefined ? deserializePipelineReadyCondition(data["pipelineReadyCondition"]) : undefined,
    targetsPresentCondition: data["targetsPresentCondition"] !== undefined ? deserializeTargetsPresentCondition(data["targetsPresentCondition"]) : undefined,
  };
}

/**
 * PipelineReadyCondition contains information around the status of the
 * Pipeline.
 */
export interface PipelineReadyCondition {
  /**
   * True if the Pipeline is in a valid state. Otherwise at least one condition
   * in `PipelineCondition` is in an invalid state. Iterate over those
   * conditions and see which condition(s) has status = false to find out what
   * is wrong with the Pipeline.
   */
  status?: boolean;
  /**
   * Last time the condition was updated.
   */
  updateTime?: Date;
}

function serializePipelineReadyCondition(data: any): PipelineReadyCondition {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializePipelineReadyCondition(data: any): PipelineReadyCondition {
  return {
    ...data,
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
 * Execution using a private Cloud Build pool.
 */
export interface PrivatePool {
  /**
   * Optional. Cloud Storage location where execution outputs should be stored.
   * This can either be a bucket ("gs://my-bucket") or a path within a bucket
   * ("gs://my-bucket/my-dir"). If unspecified, a default bucket located in the
   * same region will be used.
   */
  artifactStorage?: string;
  /**
   * Optional. Google service account to use for execution. If unspecified, the
   * project execution service account (-compute@developer.gserviceaccount.com)
   * will be used.
   */
  serviceAccount?: string;
  /**
   * Required. Resource name of the Cloud Build worker pool to use. The format
   * is `projects/{project}/locations/{location}/workerPools/{pool}`.
   */
  workerPool?: string;
}

/**
 * Additional options for CloudDeploy#projectsLocationsDeliveryPipelinesCreate.
 */
export interface ProjectsLocationsDeliveryPipelinesCreateOptions {
  /**
   * Required. ID of the `DeliveryPipeline`.
   */
  deliveryPipelineId?: string;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes since the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set to true, the request is validated and the user is
   * provided with an expected result, but no actual change is made.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for CloudDeploy#projectsLocationsDeliveryPipelinesDelete.
 */
export interface ProjectsLocationsDeliveryPipelinesDeleteOptions {
  /**
   * Optional. If set to true, then deleting an already deleted or non-existing
   * `DeliveryPipeline` will succeed.
   */
  allowMissing?: boolean;
  /**
   * Optional. This checksum is computed by the server based on the value of
   * other fields, and may be sent on update and delete requests to ensure the
   * client has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Optional. If set to true, all child resources under this pipeline will
   * also be deleted. Otherwise, the request will only work if the pipeline has
   * no child resources.
   */
  force?: boolean;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes after the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set, validate the request and preview the review, but do not
   * actually post it.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * CloudDeploy#projectsLocationsDeliveryPipelinesGetIamPolicy.
 */
export interface ProjectsLocationsDeliveryPipelinesGetIamPolicyOptions {
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
 * Additional options for CloudDeploy#projectsLocationsDeliveryPipelinesList.
 */
export interface ProjectsLocationsDeliveryPipelinesListOptions {
  /**
   * Filter pipelines to be returned. See https://google.aip.dev/160 for more
   * details.
   */
  filter?: string;
  /**
   * Field to sort by. See https://google.aip.dev/132#ordering for more
   * details.
   */
  orderBy?: string;
  /**
   * The maximum number of pipelines to return. The service may return fewer
   * than this value. If unspecified, at most 50 pipelines will be returned. The
   * maximum value is 1000; values above 1000 will be set to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListDeliveryPipelines` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * provided parameters match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudDeploy#projectsLocationsDeliveryPipelinesPatch.
 */
export interface ProjectsLocationsDeliveryPipelinesPatchOptions {
  /**
   * Optional. If set to true, updating a `DeliveryPipeline` that does not
   * exist will result in the creation of a new `DeliveryPipeline`.
   */
  allowMissing?: boolean;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes since the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. Field mask is used to specify the fields to be overwritten in
   * the `DeliveryPipeline` resource by the update. The fields specified in the
   * update_mask are relative to the resource, not the full request. A field
   * will be overwritten if it is in the mask. If the user does not provide a
   * mask then all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. If set to true, the request is validated and the user is
   * provided with an expected result, but no actual change is made.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsDeliveryPipelinesPatchOptions(data: any): ProjectsLocationsDeliveryPipelinesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDeliveryPipelinesPatchOptions(data: any): ProjectsLocationsDeliveryPipelinesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * CloudDeploy#projectsLocationsDeliveryPipelinesReleasesCreate.
 */
export interface ProjectsLocationsDeliveryPipelinesReleasesCreateOptions {
  /**
   * Required. ID of the `Release`.
   */
  releaseId?: string;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes since the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set to true, the request is validated and the user is
   * provided with an expected result, but no actual change is made.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * CloudDeploy#projectsLocationsDeliveryPipelinesReleasesList.
 */
export interface ProjectsLocationsDeliveryPipelinesReleasesListOptions {
  /**
   * Optional. Filter releases to be returned. See https://google.aip.dev/160
   * for more details.
   */
  filter?: string;
  /**
   * Optional. Field to sort by. See https://google.aip.dev/132#ordering for
   * more details.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of `Release` objects to return. The service
   * may return fewer than this value. If unspecified, at most 50 `Release`
   * objects will be returned. The maximum value is 1000; values above 1000 will
   * be set to 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListReleases` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * provided parameters match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * CloudDeploy#projectsLocationsDeliveryPipelinesReleasesRolloutsCreate.
 */
export interface ProjectsLocationsDeliveryPipelinesReleasesRolloutsCreateOptions {
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes since the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. ID of the `Rollout`.
   */
  rolloutId?: string;
  /**
   * Optional. The starting phase ID for the `Rollout`. If empty the `Rollout`
   * will start at the first phase.
   */
  startingPhaseId?: string;
  /**
   * Optional. If set to true, the request is validated and the user is
   * provided with an expected result, but no actual change is made.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * CloudDeploy#projectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsList.
 */
export interface ProjectsLocationsDeliveryPipelinesReleasesRolloutsJobRunsListOptions {
  /**
   * Optional. Filter results to be returned. See https://google.aip.dev/160
   * for more details.
   */
  filter?: string;
  /**
   * Optional. Field to sort by. See https://google.aip.dev/132#ordering for
   * more details.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of `JobRun` objects to return. The service
   * may return fewer than this value. If unspecified, at most 50 `JobRun`
   * objects will be returned. The maximum value is 1000; values above 1000 will
   * be set to 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListJobRuns` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * provided parameters match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * CloudDeploy#projectsLocationsDeliveryPipelinesReleasesRolloutsList.
 */
export interface ProjectsLocationsDeliveryPipelinesReleasesRolloutsListOptions {
  /**
   * Optional. Filter rollouts to be returned. See https://google.aip.dev/160
   * for more details.
   */
  filter?: string;
  /**
   * Optional. Field to sort by. See https://google.aip.dev/132#ordering for
   * more details.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of `Rollout` objects to return. The service
   * may return fewer than this value. If unspecified, at most 50 `Rollout`
   * objects will be returned. The maximum value is 1000; values above 1000 will
   * be set to 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListRollouts` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * provided parameters match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudDeploy#projectsLocationsList.
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
 * Additional options for CloudDeploy#projectsLocationsOperationsList.
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
 * Additional options for CloudDeploy#projectsLocationsTargetsCreate.
 */
export interface ProjectsLocationsTargetsCreateOptions {
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes since the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. ID of the `Target`.
   */
  targetId?: string;
  /**
   * Optional. If set to true, the request is validated and the user is
   * provided with an expected result, but no actual change is made.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for CloudDeploy#projectsLocationsTargetsDelete.
 */
export interface ProjectsLocationsTargetsDeleteOptions {
  /**
   * Optional. If set to true, then deleting an already deleted or non-existing
   * DeliveryPipeline will succeed.
   */
  allowMissing?: boolean;
  /**
   * Optional. This checksum is computed by the server based on the value of
   * other fields, and may be sent on update and delete requests to ensure the
   * client has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes after the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. If set, validate the request and preview the review, but do not
   * actually post it.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for CloudDeploy#projectsLocationsTargetsGetIamPolicy.
 */
export interface ProjectsLocationsTargetsGetIamPolicyOptions {
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
 * Additional options for CloudDeploy#projectsLocationsTargetsList.
 */
export interface ProjectsLocationsTargetsListOptions {
  /**
   * Optional. Filter targets to be returned. See https://google.aip.dev/160
   * for more details.
   */
  filter?: string;
  /**
   * Optional. Field to sort by. See https://google.aip.dev/132#ordering for
   * more details.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of `Target` objects to return. The service
   * may return fewer than this value. If unspecified, at most 50 `Target`
   * objects will be returned. The maximum value is 1000; values above 1000 will
   * be set to 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListTargets` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * provided parameters match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudDeploy#projectsLocationsTargetsPatch.
 */
export interface ProjectsLocationsTargetsPatchOptions {
  /**
   * Optional. If set to true, updating a `Target` that does not exist will
   * result in the creation of a new `Target`.
   */
  allowMissing?: boolean;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes since the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. Field mask is used to specify the fields to be overwritten in
   * the Target resource by the update. The fields specified in the update_mask
   * are relative to the resource, not the full request. A field will be
   * overwritten if it is in the mask. If the user does not provide a mask then
   * all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. If set to true, the request is validated and the user is
   * provided with an expected result, but no actual change is made.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsTargetsPatchOptions(data: any): ProjectsLocationsTargetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsTargetsPatchOptions(data: any): ProjectsLocationsTargetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A `Release` resource in the Google Cloud Deploy API. A `Release` defines a
 * specific Skaffold configuration instance that can be deployed.
 */
export interface Release {
  /**
   * Output only. Indicates whether this is an abandoned release.
   */
  readonly abandoned?: boolean;
  /**
   * User annotations. These attributes can only be set and used by the user,
   * and not by Google Cloud Deploy. See https://google.aip.dev/128#annotations
   * for more details such as format and size limitations.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * List of artifacts to pass through to Skaffold command.
   */
  buildArtifacts?: BuildArtifact[];
  /**
   * Output only. Information around the state of the Release.
   */
  readonly condition?: ReleaseCondition;
  /**
   * Output only. Time at which the `Release` was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Snapshot of the parent pipeline taken at release creation
   * time.
   */
  readonly deliveryPipelineSnapshot?: DeliveryPipeline;
  /**
   * Description of the `Release`. Max length is 255 characters.
   */
  description?: string;
  /**
   * This checksum is computed by the server based on the value of other
   * fields, and may be sent on update and delete requests to ensure the client
   * has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Labels are attributes that can be set and used by both the user and by
   * Google Cloud Deploy. Labels must meet the following constraints: * Keys and
   * values can contain only lowercase letters, numeric characters, underscores,
   * and dashes. * All characters must use UTF-8 encoding, and international
   * characters are allowed. * Keys must start with a lowercase letter or
   * international character. * Each resource is limited to a maximum of 64
   * labels. Both keys and values are additionally constrained to be <= 128
   * bytes.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. Name of the `Release`. Format is projects/{project}/
   * locations/{location}/deliveryPipelines/{deliveryPipeline}/
   * releases/a-z{0,62}.
   */
  name?: string;
  /**
   * Output only. Time at which the render completed.
   */
  readonly renderEndTime?: Date;
  /**
   * Output only. Time at which the render began.
   */
  readonly renderStartTime?: Date;
  /**
   * Output only. Current state of the render operation.
   */
  readonly renderState?:  | "RENDER_STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "IN_PROGRESS";
  /**
   * Filepath of the Skaffold config inside of the config URI.
   */
  skaffoldConfigPath?: string;
  /**
   * Cloud Storage URI of tar.gz archive containing Skaffold configuration.
   */
  skaffoldConfigUri?: string;
  /**
   * The Skaffold version to use when operating on this release, such as
   * "1.20.0". Not all versions are valid; Google Cloud Deploy supports a
   * specific set of versions. If unset, the most recent supported Skaffold
   * version will be used.
   */
  skaffoldVersion?: string;
  /**
   * Output only. Map from target ID to the target artifacts created during the
   * render operation.
   */
  readonly targetArtifacts?: {
    [key: string]: TargetArtifact
  };
  /**
   * Output only. Map from target ID to details of the render operation for
   * that target.
   */
  readonly targetRenders?: {
    [key: string]: TargetRender
  };
  /**
   * Output only. Snapshot of the targets taken at release creation time.
   */
  readonly targetSnapshots?: Target[];
  /**
   * Output only. Unique identifier of the `Release`.
   */
  readonly uid?: string;
}

/**
 * ReleaseCondition contains all conditions relevant to a Release.
 */
export interface ReleaseCondition {
  /**
   * Details around the Releases's overall status.
   */
  releaseReadyCondition?: ReleaseReadyCondition;
  /**
   * Details around the support state of the release's skaffold version.
   */
  skaffoldSupportedCondition?: SkaffoldSupportedCondition;
}

function serializeReleaseCondition(data: any): ReleaseCondition {
  return {
    ...data,
    skaffoldSupportedCondition: data["skaffoldSupportedCondition"] !== undefined ? serializeSkaffoldSupportedCondition(data["skaffoldSupportedCondition"]) : undefined,
  };
}

function deserializeReleaseCondition(data: any): ReleaseCondition {
  return {
    ...data,
    skaffoldSupportedCondition: data["skaffoldSupportedCondition"] !== undefined ? deserializeSkaffoldSupportedCondition(data["skaffoldSupportedCondition"]) : undefined,
  };
}

/**
 * Payload proto for "clouddeploy.googleapis.com/release_notification" Platform
 * Log event that describes the failure to send release status change Pub/Sub
 * notification.
 */
export interface ReleaseNotificationEvent {
  /**
   * Debug message for when a notification fails to send.
   */
  message?: string;
  /**
   * The name of the `Release`.
   */
  release?: string;
  /**
   * Type of this notification, e.g. for a Pub/Sub failure.
   */
  type?:  | "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RENDER_STATUES_CHANGE";
}

/**
 * ReleaseReadyCondition contains information around the status of the Release.
 * If a release is not ready, you cannot create a rollout with the release.
 */
export interface ReleaseReadyCondition {
  /**
   * True if the Release is in a valid state. Otherwise at least one condition
   * in `ReleaseCondition` is in an invalid state. Iterate over those conditions
   * and see which condition(s) has status = false to find out what is wrong
   * with the Release.
   */
  status?: boolean;
}

/**
 * Payload proto for "clouddeploy.googleapis.com/release_render" Platform Log
 * event that describes the render status change.
 */
export interface ReleaseRenderEvent {
  /**
   * Debug message for when a render transition occurs. Provides further
   * details as rendering progresses through render states.
   */
  message?: string;
  /**
   * The name of the `Release`.
   */
  release?: string;
}

/**
 * RetryJobRequest is the request object used by `RetryJob`.
 */
export interface RetryJobRequest {
  /**
   * Required. The job ID for the Job to retry.
   */
  jobId?: string;
  /**
   * Required. The phase ID the Job to retry belongs to.
   */
  phaseId?: string;
}

/**
 * The response object from 'RetryJob'.
 */
export interface RetryJobResponse {
}

/**
 * A `Rollout` resource in the Google Cloud Deploy API. A `Rollout` contains
 * information around a specific deployment to a `Target`.
 */
export interface Rollout {
  /**
   * User annotations. These attributes can only be set and used by the user,
   * and not by Google Cloud Deploy. See https://google.aip.dev/128#annotations
   * for more details such as format and size limitations.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. Approval state of the `Rollout`.
   */
  readonly approvalState?:  | "APPROVAL_STATE_UNSPECIFIED" | "NEEDS_APPROVAL" | "DOES_NOT_NEED_APPROVAL" | "APPROVED" | "REJECTED";
  /**
   * Output only. Time at which the `Rollout` was approved.
   */
  readonly approveTime?: Date;
  /**
   * Output only. Name of the `ControllerRollout`. Format is
   * projects/{project}/
   * locations/{location}/deliveryPipelines/{deliveryPipeline}/
   * releases/{release}/rollouts/a-z{0,62}.
   */
  readonly controllerRollout?: string;
  /**
   * Output only. Time at which the `Rollout` was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. Time at which the `Rollout` finished deploying.
   */
  readonly deployEndTime?: Date;
  /**
   * Output only. The reason this rollout failed. This will always be
   * unspecified while the rollout is in progress.
   */
  readonly deployFailureCause?:  | "FAILURE_CAUSE_UNSPECIFIED" | "CLOUD_BUILD_UNAVAILABLE" | "EXECUTION_FAILED" | "DEADLINE_EXCEEDED" | "RELEASE_FAILED" | "RELEASE_ABANDONED" | "VERIFICATION_CONFIG_NOT_FOUND" | "CLOUD_BUILD_REQUEST_FAILED";
  /**
   * Output only. The resource name of the Cloud Build `Build` object that is
   * used to deploy the Rollout. Format is
   * `projects/{project}/locations/{location}/builds/{build}`.
   */
  readonly deployingBuild?: string;
  /**
   * Output only. Time at which the `Rollout` started deploying.
   */
  readonly deployStartTime?: Date;
  /**
   * Description of the `Rollout` for user purposes. Max length is 255
   * characters.
   */
  description?: string;
  /**
   * Output only. Time at which the `Rollout` was enqueued.
   */
  readonly enqueueTime?: Date;
  /**
   * This checksum is computed by the server based on the value of other
   * fields, and may be sent on update and delete requests to ensure the client
   * has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Output only. Additional information about the rollout failure, if
   * available.
   */
  readonly failureReason?: string;
  /**
   * Labels are attributes that can be set and used by both the user and by
   * Google Cloud Deploy. Labels must meet the following constraints: * Keys and
   * values can contain only lowercase letters, numeric characters, underscores,
   * and dashes. * All characters must use UTF-8 encoding, and international
   * characters are allowed. * Keys must start with a lowercase letter or
   * international character. * Each resource is limited to a maximum of 64
   * labels. Both keys and values are additionally constrained to be <= 128
   * bytes.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. Metadata contains information about the rollout.
   */
  readonly metadata?: Metadata;
  /**
   * Optional. Name of the `Rollout`. Format is projects/{project}/
   * locations/{location}/deliveryPipelines/{deliveryPipeline}/
   * releases/{release}/rollouts/a-z{0,62}.
   */
  name?: string;
  /**
   * Output only. The phases that represent the workflows of this `Rollout`.
   */
  readonly phases?: Phase[];
  /**
   * Output only. Current state of the `Rollout`.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "IN_PROGRESS" | "PENDING_APPROVAL" | "APPROVAL_REJECTED" | "PENDING" | "PENDING_RELEASE";
  /**
   * Required. The ID of Target to which this `Rollout` is deploying.
   */
  targetId?: string;
  /**
   * Output only. Unique identifier of the `Rollout`.
   */
  readonly uid?: string;
}

/**
 * Payload proto for "clouddeploy.googleapis.com/rollout_notification" Platform
 * Log event that describes the failure to send rollout status change Pub/Sub
 * notification.
 */
export interface RolloutNotificationEvent {
  /**
   * Debug message for when a notification fails to send.
   */
  message?: string;
  /**
   * Unique identifier of the `DeliveryPipeline`.
   */
  pipelineUid?: string;
  /**
   * Unique identifier of the `Release`.
   */
  releaseUid?: string;
  /**
   * The name of the `Rollout`.
   */
  rollout?: string;
  /**
   * ID of the `Target` that the rollout is deployed to.
   */
  targetId?: string;
  /**
   * Type of this notification, e.g. for a Pub/Sub failure.
   */
  type?:  | "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RENDER_STATUES_CHANGE";
}

/**
 * SerialPipeline defines a sequential set of stages for a `DeliveryPipeline`.
 */
export interface SerialPipeline {
  /**
   * Each stage specifies configuration for a `Target`. The ordering of this
   * list defines the promotion flow.
   */
  stages?: Stage[];
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
 * SkaffoldSupportedCondition contains information about when support for the
 * release's version of skaffold ends.
 */
export interface SkaffoldSupportedCondition {
  /**
   * The time at which this release's version of skaffold will enter
   * maintenance mode.
   */
  maintenanceModeTime?: Date;
  /**
   * The skaffold support state for this release's version of skaffold.
   */
  skaffoldSupportState?:  | "SKAFFOLD_SUPPORT_STATE_UNSPECIFIED" | "SKAFFOLD_SUPPORT_STATE_SUPPORTED" | "SKAFFOLD_SUPPORT_STATE_MAINTENANCE_MODE" | "SKAFFOLD_SUPPORT_STATE_UNSUPPORTED";
  /**
   * True if the version of skaffold used by this release is supported.
   */
  status?: boolean;
  /**
   * The time at which this release's version of skaffold will no longer be
   * supported.
   */
  supportExpirationTime?: Date;
}

function serializeSkaffoldSupportedCondition(data: any): SkaffoldSupportedCondition {
  return {
    ...data,
    maintenanceModeTime: data["maintenanceModeTime"] !== undefined ? data["maintenanceModeTime"].toISOString() : undefined,
    supportExpirationTime: data["supportExpirationTime"] !== undefined ? data["supportExpirationTime"].toISOString() : undefined,
  };
}

function deserializeSkaffoldSupportedCondition(data: any): SkaffoldSupportedCondition {
  return {
    ...data,
    maintenanceModeTime: data["maintenanceModeTime"] !== undefined ? new Date(data["maintenanceModeTime"]) : undefined,
    supportExpirationTime: data["supportExpirationTime"] !== undefined ? new Date(data["supportExpirationTime"]) : undefined,
  };
}

/**
 * Details of a supported Skaffold version.
 */
export interface SkaffoldVersion {
  /**
   * The time at which this version of skaffold will enter maintenance mode.
   */
  maintenanceModeTime?: Date;
  /**
   * Date when this version is expected to no longer be supported.
   */
  supportEndDate?: Date;
  /**
   * The time at which this version of skaffold will no longer be supported.
   */
  supportExpirationTime?: Date;
  /**
   * Release version number. For example, "1.20.3".
   */
  version?: string;
}

function serializeSkaffoldVersion(data: any): SkaffoldVersion {
  return {
    ...data,
    maintenanceModeTime: data["maintenanceModeTime"] !== undefined ? data["maintenanceModeTime"].toISOString() : undefined,
    supportExpirationTime: data["supportExpirationTime"] !== undefined ? data["supportExpirationTime"].toISOString() : undefined,
  };
}

function deserializeSkaffoldVersion(data: any): SkaffoldVersion {
  return {
    ...data,
    maintenanceModeTime: data["maintenanceModeTime"] !== undefined ? new Date(data["maintenanceModeTime"]) : undefined,
    supportExpirationTime: data["supportExpirationTime"] !== undefined ? new Date(data["supportExpirationTime"]) : undefined,
  };
}

/**
 * Stage specifies a location to which to deploy.
 */
export interface Stage {
  /**
   * Skaffold profiles to use when rendering the manifest for this stage's
   * `Target`.
   */
  profiles?: string[];
  /**
   * Optional. The strategy to use for a `Rollout` to this stage.
   */
  strategy?: Strategy;
  /**
   * The target_id to which this stage points. This field refers exclusively to
   * the last segment of a target name. For example, this field would just be
   * `my-target` (rather than
   * `projects/project/locations/location/targets/my-target`). The location of
   * the `Target` is inferred to be the same as the location of the
   * `DeliveryPipeline` that contains this `Stage`.
   */
  targetId?: string;
}

/**
 * Standard represents the standard deployment strategy.
 */
export interface Standard {
  /**
   * Whether to verify a deployment.
   */
  verify?: boolean;
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
 * Strategy contains deployment strategy information.
 */
export interface Strategy {
  /**
   * Standard deployment strategy executes a single deploy and allows verifying
   * the deployment.
   */
  standard?: Standard;
}

/**
 * A `Target` resource in the Google Cloud Deploy API. A `Target` defines a
 * location to which a Skaffold configuration can be deployed.
 */
export interface Target {
  /**
   * Optional. User annotations. These attributes can only be set and used by
   * the user, and not by Google Cloud Deploy. See
   * https://google.aip.dev/128#annotations for more details such as format and
   * size limitations.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Information specifying an Anthos Cluster.
   */
  anthosCluster?: AnthosCluster;
  /**
   * Output only. Time at which the `Target` was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. Description of the `Target`. Max length is 255 characters.
   */
  description?: string;
  /**
   * Optional. This checksum is computed by the server based on the value of
   * other fields, and may be sent on update and delete requests to ensure the
   * client has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Configurations for all execution that relates to this `Target`. Each
   * `ExecutionEnvironmentUsage` value may only be used in a single
   * configuration; using the same value multiple times is an error. When one or
   * more configurations are specified, they must include the `RENDER` and
   * `DEPLOY` `ExecutionEnvironmentUsage` values. When no configurations are
   * specified, execution will use the default specified in `DefaultPool`.
   */
  executionConfigs?: ExecutionConfig[];
  /**
   * Information specifying a GKE Cluster.
   */
  gke?: GkeCluster;
  /**
   * Optional. Labels are attributes that can be set and used by both the user
   * and by Google Cloud Deploy. Labels must meet the following constraints: *
   * Keys and values can contain only lowercase letters, numeric characters,
   * underscores, and dashes. * All characters must use UTF-8 encoding, and
   * international characters are allowed. * Keys must start with a lowercase
   * letter or international character. * Each resource is limited to a maximum
   * of 64 labels. Both keys and values are additionally constrained to be <=
   * 128 bytes.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Information specifying a multiTarget.
   */
  multiTarget?: MultiTarget;
  /**
   * Optional. Name of the `Target`. Format is
   * projects/{project}/locations/{location}/targets/a-z{0,62}.
   */
  name?: string;
  /**
   * Optional. Whether or not the `Target` requires approval.
   */
  requireApproval?: boolean;
  /**
   * Information specifying a Cloud Run deployment target.
   */
  run?: CloudRunLocation;
  /**
   * Output only. Resource id of the `Target`.
   */
  readonly targetId?: string;
  /**
   * Output only. Unique identifier of the `Target`.
   */
  readonly uid?: string;
  /**
   * Output only. Most recent time at which the `Target` was updated.
   */
  readonly updateTime?: Date;
}

function serializeTarget(data: any): Target {
  return {
    ...data,
    executionConfigs: data["executionConfigs"] !== undefined ? data["executionConfigs"].map((item: any) => (serializeExecutionConfig(item))) : undefined,
  };
}

function deserializeTarget(data: any): Target {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    executionConfigs: data["executionConfigs"] !== undefined ? data["executionConfigs"].map((item: any) => (deserializeExecutionConfig(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The artifacts produced by a target render operation.
 */
export interface TargetArtifact {
  /**
   * Output only. URI of a directory containing the artifacts. This contains
   * deployment configuration used by Skaffold during a rollout, and all paths
   * are relative to this location.
   */
  readonly artifactUri?: string;
  /**
   * Output only. File path of the rendered manifest relative to the URI.
   */
  readonly manifestPath?: string;
  /**
   * Output only. File path of the resolved Skaffold configuration relative to
   * the URI.
   */
  readonly skaffoldConfigPath?: string;
}

/**
 * Payload proto for "clouddeploy.googleapis.com/target_notification" Platform
 * Log event that describes the failure to send target status change Pub/Sub
 * notification.
 */
export interface TargetNotificationEvent {
  /**
   * Debug message for when a notification fails to send.
   */
  message?: string;
  /**
   * The name of the `Target`.
   */
  target?: string;
  /**
   * Type of this notification, e.g. for a Pub/Sub failure.
   */
  type?:  | "TYPE_UNSPECIFIED" | "TYPE_PUBSUB_NOTIFICATION_FAILURE" | "TYPE_RENDER_STATUES_CHANGE";
}

/**
 * Details of rendering for a single target.
 */
export interface TargetRender {
  /**
   * Output only. Reason this render failed. This will always be unspecified
   * while the render in progress.
   */
  readonly failureCause?:  | "FAILURE_CAUSE_UNSPECIFIED" | "CLOUD_BUILD_UNAVAILABLE" | "EXECUTION_FAILED" | "CLOUD_BUILD_REQUEST_FAILED";
  /**
   * Output only. Additional information about the render failure, if
   * available.
   */
  readonly failureMessage?: string;
  /**
   * Output only. The resource name of the Cloud Build `Build` object that is
   * used to render the manifest for this target. Format is
   * `projects/{project}/locations/{location}/builds/{build}`.
   */
  readonly renderingBuild?: string;
  /**
   * Output only. Current state of the render operation for this Target.
   */
  readonly renderingState?:  | "TARGET_RENDER_STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "IN_PROGRESS";
}

/**
 * TargetsPresentCondition contains information on any Targets defined in the
 * Delivery Pipeline that do not actually exist.
 */
export interface TargetsPresentCondition {
  /**
   * The list of Target names that do not exist. For example,
   * projects/{project_id}/locations/{location_name}/targets/{target_name}.
   */
  missingTargets?: string[];
  /**
   * True if there aren't any missing Targets.
   */
  status?: boolean;
  /**
   * Last time the condition was updated.
   */
  updateTime?: Date;
}

function serializeTargetsPresentCondition(data: any): TargetsPresentCondition {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeTargetsPresentCondition(data: any): TargetsPresentCondition {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * TargetsTypeCondition contains information on whether the Targets defined in
 * the Delivery Pipeline are of the same type.
 */
export interface TargetsTypeCondition {
  /**
   * Human readable error message.
   */
  errorDetails?: string;
  /**
   * True if the targets are all a comparable type. For example this is true if
   * all targets are GKE clusters. This is false if some targets are Cloud Run
   * targets and others are GKE clusters.
   */
  status?: boolean;
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
 * A verify Job.
 */
export interface VerifyJob {
}

/**
 * VerifyJobRun contains information specific to a verify `JobRun`.
 */
export interface VerifyJobRun {
  /**
   * Output only. URI of a directory containing the verify artifacts. This
   * contains the Skaffold event log.
   */
  readonly artifactUri?: string;
  /**
   * Output only. The resource name of the Cloud Build `Build` object that is
   * used to verify. Format is
   * projects/{project}/locations/{location}/builds/{build}.
   */
  readonly build?: string;
  /**
   * Output only. File path of the Skaffold event log relative to the artifact
   * URI.
   */
  readonly eventLogPath?: string;
  /**
   * Output only. The reason the verify failed. This will always be unspecified
   * while the verify is in progress or if it succeeded.
   */
  readonly failureCause?:  | "FAILURE_CAUSE_UNSPECIFIED" | "CLOUD_BUILD_UNAVAILABLE" | "EXECUTION_FAILED" | "DEADLINE_EXCEEDED" | "VERIFICATION_CONFIG_NOT_FOUND" | "CLOUD_BUILD_REQUEST_FAILED";
  /**
   * Output only. Additional information about the verify failure, if
   * available.
   */
  readonly failureMessage?: string;
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
