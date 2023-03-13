// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * AI Platform Training & Prediction API Client for Deno
 * =====================================================
 * 
 * An API to enable creating and using machine learning models.
 * 
 * Docs: https://cloud.google.com/ml/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * An API to enable creating and using machine learning models.
 */
export class ml {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://ml.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Performs explanation on the data in the request. {% dynamic include
   * "/ai-platform/includes/___explain-request" %}
   *
   * @param name Required. The resource name of a model or a version. Authorization: requires the `predict` permission on the specified resource.
   */
  async projectsExplain(name: string, req: GoogleCloudMlV1__ExplainRequest): Promise<GoogleApi__HttpBody> {
    req = serializeGoogleCloudMlV1__ExplainRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:explain`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleApi__HttpBody(data);
  }

  /**
   * Get the service account information associated with your project. You need
   * this information in order to grant the service account permissions for the
   * Google Cloud Storage location where you put your model training code for
   * training the model with Google Cloud Machine Learning.
   *
   * @param name Required. The project name.
   */
  async projectsGetConfig(name: string): Promise<GoogleCloudMlV1__GetConfigResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getConfig`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudMlV1__GetConfigResponse(data);
  }

  /**
   * Cancels a running job.
   *
   * @param name Required. The name of the job to cancel.
   */
  async projectsJobsCancel(name: string, req: GoogleCloudMlV1__CancelJobRequest): Promise<GoogleProtobuf__Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobuf__Empty;
  }

  /**
   * Creates a training or a batch prediction job.
   *
   * @param parent Required. The project name.
   */
  async projectsJobsCreate(parent: string, req: GoogleCloudMlV1__Job): Promise<GoogleCloudMlV1__Job> {
    req = serializeGoogleCloudMlV1__Job(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/jobs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudMlV1__Job(data);
  }

  /**
   * Describes a job.
   *
   * @param name Required. The name of the job to get the description of.
   */
  async projectsJobsGet(name: string): Promise<GoogleCloudMlV1__Job> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudMlV1__Job(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsJobsGetIamPolicy(resource: string, opts: ProjectsJobsGetIamPolicyOptions = {}): Promise<GoogleIamV1__Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1__Policy(data);
  }

  /**
   * Lists the jobs in the project. If there are no jobs that match the request
   * parameters, the list request returns an empty response body: {}.
   *
   * @param parent Required. The name of the project for which to list jobs.
   */
  async projectsJobsList(parent: string, opts: ProjectsJobsListOptions = {}): Promise<GoogleCloudMlV1__ListJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/jobs`);
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
    return deserializeGoogleCloudMlV1__ListJobsResponse(data);
  }

  /**
   * Updates a specific job resource. Currently the only supported fields to
   * update are `labels`.
   *
   * @param name Required. The job name.
   */
  async projectsJobsPatch(name: string, req: GoogleCloudMlV1__Job, opts: ProjectsJobsPatchOptions = {}): Promise<GoogleCloudMlV1__Job> {
    req = serializeGoogleCloudMlV1__Job(req);
    opts = serializeProjectsJobsPatchOptions(opts);
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
    return deserializeGoogleCloudMlV1__Job(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsJobsSetIamPolicy(resource: string, req: GoogleIamV1__SetIamPolicyRequest): Promise<GoogleIamV1__Policy> {
    req = serializeGoogleIamV1__SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1__Policy(data);
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
  async projectsJobsTestIamPermissions(resource: string, req: GoogleIamV1__TestIamPermissionsRequest): Promise<GoogleIamV1__TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1__TestIamPermissionsResponse;
  }

  /**
   * Get the complete list of CMLE capabilities in a location, along with their
   * location-specific properties.
   *
   * @param name Required. The name of the location.
   */
  async projectsLocationsGet(name: string): Promise<GoogleCloudMlV1__Location> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudMlV1__Location;
  }

  /**
   * List all locations that provides at least one type of CMLE capability.
   *
   * @param parent Required. The name of the project for which available locations are to be listed (since some locations might be whitelisted for specific projects).
   */
  async projectsLocationsList(parent: string, opts: ProjectsLocationsListOptions = {}): Promise<GoogleCloudMlV1__ListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/locations`);
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
    return data as GoogleCloudMlV1__ListLocationsResponse;
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
  async projectsLocationsOperationsCancel(name: string): Promise<GoogleProtobuf__Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as GoogleProtobuf__Empty;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsOperationsGet(name: string): Promise<GoogleLongrunning__Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunning__Operation;
  }

  /**
   * Creates a study.
   *
   * @param parent Required. The project and location that the study belongs to. Format: projects/{project}/locations/{location}
   */
  async projectsLocationsStudiesCreate(parent: string, req: GoogleCloudMlV1__Study, opts: ProjectsLocationsStudiesCreateOptions = {}): Promise<GoogleCloudMlV1__Study> {
    req = serializeGoogleCloudMlV1__Study(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/studies`);
    if (opts.studyId !== undefined) {
      url.searchParams.append("studyId", String(opts.studyId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudMlV1__Study(data);
  }

  /**
   * Deletes a study.
   *
   * @param name Required. The study name.
   */
  async projectsLocationsStudiesDelete(name: string): Promise<GoogleProtobuf__Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobuf__Empty;
  }

  /**
   * Gets a study.
   *
   * @param name Required. The study name.
   */
  async projectsLocationsStudiesGet(name: string): Promise<GoogleCloudMlV1__Study> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudMlV1__Study(data);
  }

  /**
   * Lists all the studies in a region for an associated project.
   *
   * @param parent Required. The project and location that the study belongs to. Format: projects/{project}/locations/{location}
   */
  async projectsLocationsStudiesList(parent: string): Promise<GoogleCloudMlV1__ListStudiesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/studies`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudMlV1__ListStudiesResponse(data);
  }

  /**
   * Adds a measurement of the objective metrics to a trial. This measurement
   * is assumed to have been taken before the trial is complete.
   *
   * @param name Required. The trial name.
   */
  async projectsLocationsStudiesTrialsAddMeasurement(name: string, req: GoogleCloudMlV1__AddTrialMeasurementRequest): Promise<GoogleCloudMlV1__Trial> {
    req = serializeGoogleCloudMlV1__AddTrialMeasurementRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:addMeasurement`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudMlV1__Trial(data);
  }

  /**
   * Checks whether a trial should stop or not. Returns a long-running
   * operation. When the operation is successful, it will contain a
   * CheckTrialEarlyStoppingStateResponse.
   *
   * @param name Required. The trial name.
   */
  async projectsLocationsStudiesTrialsCheckEarlyStoppingState(name: string, req: GoogleCloudMlV1__CheckTrialEarlyStoppingStateRequest): Promise<GoogleLongrunning__Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:checkEarlyStoppingState`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunning__Operation;
  }

  /**
   * Marks a trial as complete.
   *
   * @param name Required. The trial name.metat
   */
  async projectsLocationsStudiesTrialsComplete(name: string, req: GoogleCloudMlV1__CompleteTrialRequest): Promise<GoogleCloudMlV1__Trial> {
    req = serializeGoogleCloudMlV1__CompleteTrialRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:complete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudMlV1__Trial(data);
  }

  /**
   * Adds a user provided trial to a study.
   *
   * @param parent Required. The name of the study that the trial belongs to.
   */
  async projectsLocationsStudiesTrialsCreate(parent: string, req: GoogleCloudMlV1__Trial): Promise<GoogleCloudMlV1__Trial> {
    req = serializeGoogleCloudMlV1__Trial(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/trials`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudMlV1__Trial(data);
  }

  /**
   * Deletes a trial.
   *
   * @param name Required. The trial name.
   */
  async projectsLocationsStudiesTrialsDelete(name: string): Promise<GoogleProtobuf__Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobuf__Empty;
  }

  /**
   * Gets a trial.
   *
   * @param name Required. The trial name.
   */
  async projectsLocationsStudiesTrialsGet(name: string): Promise<GoogleCloudMlV1__Trial> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudMlV1__Trial(data);
  }

  /**
   * Lists the trials associated with a study.
   *
   * @param parent Required. The name of the study that the trial belongs to.
   */
  async projectsLocationsStudiesTrialsList(parent: string): Promise<GoogleCloudMlV1__ListTrialsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/trials`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudMlV1__ListTrialsResponse(data);
  }

  /**
   * Lists the pareto-optimal trials for multi-objective study or the optimal
   * trials for single-objective study. The definition of pareto-optimal can be
   * checked in wiki page. https://en.wikipedia.org/wiki/Pareto_efficiency
   *
   * @param parent Required. The name of the study that the pareto-optimal trial belongs to.
   */
  async projectsLocationsStudiesTrialsListOptimalTrials(parent: string, req: GoogleCloudMlV1__ListOptimalTrialsRequest): Promise<GoogleCloudMlV1__ListOptimalTrialsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/trials:listOptimalTrials`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudMlV1__ListOptimalTrialsResponse(data);
  }

  /**
   * Stops a trial.
   *
   * @param name Required. The trial name.
   */
  async projectsLocationsStudiesTrialsStop(name: string, req: GoogleCloudMlV1__StopTrialRequest): Promise<GoogleCloudMlV1__Trial> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:stop`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudMlV1__Trial(data);
  }

  /**
   * Adds one or more trials to a study, with parameter values suggested by AI
   * Platform Vizier. Returns a long-running operation associated with the
   * generation of trial suggestions. When this long-running operation succeeds,
   * it will contain a SuggestTrialsResponse.
   *
   * @param parent Required. The name of the study that the trial belongs to.
   */
  async projectsLocationsStudiesTrialsSuggest(parent: string, req: GoogleCloudMlV1__SuggestTrialsRequest): Promise<GoogleLongrunning__Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/trials:suggest`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunning__Operation;
  }

  /**
   * Creates a model which will later contain one or more versions. You must
   * add at least one version before you can request predictions from the model.
   * Add versions by calling projects.models.versions.create.
   *
   * @param parent Required. The project name.
   */
  async projectsModelsCreate(parent: string, req: GoogleCloudMlV1__Model): Promise<GoogleCloudMlV1__Model> {
    req = serializeGoogleCloudMlV1__Model(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/models`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudMlV1__Model(data);
  }

  /**
   * Deletes a model. You can only delete a model if there are no versions in
   * it. You can delete versions by calling projects.models.versions.delete.
   *
   * @param name Required. The name of the model.
   */
  async projectsModelsDelete(name: string): Promise<GoogleLongrunning__Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunning__Operation;
  }

  /**
   * Gets information about a model, including its name, the description (if
   * set), and the default version (if at least one version of the model has
   * been deployed).
   *
   * @param name Required. The name of the model.
   */
  async projectsModelsGet(name: string): Promise<GoogleCloudMlV1__Model> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudMlV1__Model(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsModelsGetIamPolicy(resource: string, opts: ProjectsModelsGetIamPolicyOptions = {}): Promise<GoogleIamV1__Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1__Policy(data);
  }

  /**
   * Lists the models in a project. Each project can contain multiple models,
   * and each model can have multiple versions. If there are no models that
   * match the request parameters, the list request returns an empty response
   * body: {}.
   *
   * @param parent Required. The name of the project whose models are to be listed.
   */
  async projectsModelsList(parent: string, opts: ProjectsModelsListOptions = {}): Promise<GoogleCloudMlV1__ListModelsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/models`);
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
    return deserializeGoogleCloudMlV1__ListModelsResponse(data);
  }

  /**
   * Updates a specific model resource. Currently the only supported fields to
   * update are `description` and `default_version.name`.
   *
   * @param name Required. The project name.
   */
  async projectsModelsPatch(name: string, req: GoogleCloudMlV1__Model, opts: ProjectsModelsPatchOptions = {}): Promise<GoogleLongrunning__Operation> {
    req = serializeGoogleCloudMlV1__Model(req);
    opts = serializeProjectsModelsPatchOptions(opts);
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
    return data as GoogleLongrunning__Operation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsModelsSetIamPolicy(resource: string, req: GoogleIamV1__SetIamPolicyRequest): Promise<GoogleIamV1__Policy> {
    req = serializeGoogleIamV1__SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1__Policy(data);
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
  async projectsModelsTestIamPermissions(resource: string, req: GoogleIamV1__TestIamPermissionsRequest): Promise<GoogleIamV1__TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1__TestIamPermissionsResponse;
  }

  /**
   * Creates a new version of a model from a trained TensorFlow model. If the
   * version created in the cloud by this call is the first deployed version of
   * the specified model, it will be made the default version of the model. When
   * you add a version to a model that already has one or more versions, the
   * default version does not automatically change. If you want a new version to
   * be the default, you must call projects.models.versions.setDefault.
   *
   * @param parent Required. The name of the model.
   */
  async projectsModelsVersionsCreate(parent: string, req: GoogleCloudMlV1__Version): Promise<GoogleLongrunning__Operation> {
    req = serializeGoogleCloudMlV1__Version(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/versions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunning__Operation;
  }

  /**
   * Deletes a model version. Each model can have multiple versions deployed
   * and in use at any given time. Use this method to remove a single version.
   * Note: You cannot delete the version that is set as the default version of
   * the model unless it is the only remaining version.
   *
   * @param name Required. The name of the version. You can get the names of all the versions of a model by calling projects.models.versions.list.
   */
  async projectsModelsVersionsDelete(name: string): Promise<GoogleLongrunning__Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunning__Operation;
  }

  /**
   * Gets information about a model version. Models can have multiple versions.
   * You can call projects.models.versions.list to get the same information that
   * this method returns for all of the versions of a model.
   *
   * @param name Required. The name of the version.
   */
  async projectsModelsVersionsGet(name: string): Promise<GoogleCloudMlV1__Version> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudMlV1__Version(data);
  }

  /**
   * Gets basic information about all the versions of a model. If you expect
   * that a model has many versions, or if you need to handle only a limited
   * number of results at a time, you can request that the list be retrieved in
   * batches (called pages). If there are no versions that match the request
   * parameters, the list request returns an empty response body: {}.
   *
   * @param parent Required. The name of the model for which to list the version.
   */
  async projectsModelsVersionsList(parent: string, opts: ProjectsModelsVersionsListOptions = {}): Promise<GoogleCloudMlV1__ListVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/versions`);
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
    return deserializeGoogleCloudMlV1__ListVersionsResponse(data);
  }

  /**
   * Updates the specified Version resource. Currently the only update-able
   * fields are `description`, `requestLoggingConfig`, `autoScaling.minNodes`,
   * and `manualScaling.nodes`.
   *
   * @param name Required. The name of the model.
   */
  async projectsModelsVersionsPatch(name: string, req: GoogleCloudMlV1__Version, opts: ProjectsModelsVersionsPatchOptions = {}): Promise<GoogleLongrunning__Operation> {
    req = serializeGoogleCloudMlV1__Version(req);
    opts = serializeProjectsModelsVersionsPatchOptions(opts);
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
    return data as GoogleLongrunning__Operation;
  }

  /**
   * Designates a version to be the default for the model. The default version
   * is used for prediction requests made against the model that don't specify a
   * version. The first version to be created for a model is automatically set
   * as the default. You must make any subsequent changes to the default version
   * setting manually using this method.
   *
   * @param name Required. The name of the version to make the default for the model. You can get the names of all the versions of a model by calling projects.models.versions.list.
   */
  async projectsModelsVersionsSetDefault(name: string, req: GoogleCloudMlV1__SetDefaultVersionRequest): Promise<GoogleCloudMlV1__Version> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setDefault`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudMlV1__Version(data);
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
  async projectsOperationsCancel(name: string): Promise<GoogleProtobuf__Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as GoogleProtobuf__Empty;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsOperationsGet(name: string): Promise<GoogleLongrunning__Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunning__Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name The name of the operation's parent resource.
   */
  async projectsOperationsList(name: string, opts: ProjectsOperationsListOptions = {}): Promise<GoogleLongrunning__ListOperationsResponse> {
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
    return data as GoogleLongrunning__ListOperationsResponse;
  }

  /**
   * Performs online prediction on the data in the request. {% dynamic include
   * "/ai-platform/includes/___predict-request" %}
   *
   * @param name Required. The resource name of a model or a version. Authorization: requires the `predict` permission on the specified resource.
   */
  async projectsPredict(name: string, req: GoogleCloudMlV1__PredictRequest): Promise<GoogleApi__HttpBody> {
    req = serializeGoogleCloudMlV1__PredictRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:predict`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleApi__HttpBody(data);
  }
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
export interface GoogleApi__HttpBody {
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

function serializeGoogleApi__HttpBody(data: any): GoogleApi__HttpBody {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializeGoogleApi__HttpBody(data: any): GoogleApi__HttpBody {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

/**
 * Represents a hardware accelerator request config. Note that the
 * AcceleratorConfig can be used in both Jobs and Versions. Learn more about
 * [accelerators for training](/ml-engine/docs/using-gpus) and [accelerators for
 * online prediction](/ml-engine/docs/machine-types-online-prediction#gpus).
 */
export interface GoogleCloudMlV1__AcceleratorConfig {
  /**
   * The number of accelerators to attach to each machine running the job.
   */
  count?: bigint;
  /**
   * The type of accelerator to use.
   */
  type?:  | "ACCELERATOR_TYPE_UNSPECIFIED" | "NVIDIA_TESLA_K80" | "NVIDIA_TESLA_P100" | "NVIDIA_TESLA_V100" | "NVIDIA_TESLA_P4" | "NVIDIA_TESLA_T4" | "NVIDIA_TESLA_A100" | "TPU_V2" | "TPU_V3" | "TPU_V2_POD" | "TPU_V3_POD" | "TPU_V4_POD";
}

function serializeGoogleCloudMlV1__AcceleratorConfig(data: any): GoogleCloudMlV1__AcceleratorConfig {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__AcceleratorConfig(data: any): GoogleCloudMlV1__AcceleratorConfig {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * The request message for the AddTrialMeasurement service method.
 */
export interface GoogleCloudMlV1__AddTrialMeasurementRequest {
  /**
   * Required. The measurement to be added to a trial.
   */
  measurement?: GoogleCloudMlV1__Measurement;
}

function serializeGoogleCloudMlV1__AddTrialMeasurementRequest(data: any): GoogleCloudMlV1__AddTrialMeasurementRequest {
  return {
    ...data,
    measurement: data["measurement"] !== undefined ? serializeGoogleCloudMlV1__Measurement(data["measurement"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__AddTrialMeasurementRequest(data: any): GoogleCloudMlV1__AddTrialMeasurementRequest {
  return {
    ...data,
    measurement: data["measurement"] !== undefined ? deserializeGoogleCloudMlV1__Measurement(data["measurement"]) : undefined,
  };
}

/**
 * Configuration for Automated Early Stopping of Trials. If no
 * implementation_config is set, automated early stopping will not be run.
 */
export interface GoogleCloudMlV1__AutomatedStoppingConfig {
  decayCurveStoppingConfig?: GoogleCloudMlV1_AutomatedStoppingConfig_DecayCurveAutomatedStoppingConfig;
  medianAutomatedStoppingConfig?: GoogleCloudMlV1_AutomatedStoppingConfig_MedianAutomatedStoppingConfig;
}

/**
 * Options for automatically scaling a model.
 */
export interface GoogleCloudMlV1__AutoScaling {
  /**
   * The maximum number of nodes to scale this model under load. The actual
   * value will depend on resource quota and availability.
   */
  maxNodes?: number;
  /**
   * MetricSpec contains the specifications to use to calculate the desired
   * nodes count.
   */
  metrics?: GoogleCloudMlV1__MetricSpec[];
  /**
   * Optional. The minimum number of nodes to allocate for this model. These
   * nodes are always up, starting from the time the model is deployed.
   * Therefore, the cost of operating this model will be at least `rate` *
   * `min_nodes` * number of hours since last billing cycle, where `rate` is the
   * cost per node-hour as documented in the [pricing
   * guide](/ml-engine/docs/pricing), even if no predictions are performed.
   * There is additional cost for each prediction performed. Unlike manual
   * scaling, if the load gets too heavy for the nodes that are up, the service
   * will automatically add nodes to handle the increased load as well as scale
   * back as traffic drops, always maintaining at least `min_nodes`. You will be
   * charged for the time in which additional nodes are used. If `min_nodes` is
   * not specified and AutoScaling is used with a [legacy (MLS1) machine
   * type](/ml-engine/docs/machine-types-online-prediction), `min_nodes`
   * defaults to 0, in which case, when traffic to a model stops (and after a
   * cool-down period), nodes will be shut down and no charges will be incurred
   * until traffic to the model resumes. If `min_nodes` is not specified and
   * AutoScaling is used with a [Compute Engine (N1) machine
   * type](/ml-engine/docs/machine-types-online-prediction), `min_nodes`
   * defaults to 1. `min_nodes` must be at least 1 for use with a Compute Engine
   * machine type. You can set `min_nodes` when creating the model version, and
   * you can also update `min_nodes` for an existing version: update_body.json:
   * { 'autoScaling': { 'minNodes': 5 } } HTTP request: PATCH
   * https://ml.googleapis.com/v1/{name=projects/*\/models/*\/versions/*}?update_mask=autoScaling.minNodes
   * -d @./update_body.json
   */
  minNodes?: number;
}

/**
 * Represents output related to a built-in algorithm Job.
 */
export interface GoogleCloudMlV1__BuiltInAlgorithmOutput {
  /**
   * Framework on which the built-in algorithm was trained.
   */
  framework?: string;
  /**
   * The Cloud Storage path to the `model/` directory where the training job
   * saves the trained model. Only set for successful jobs that don't use
   * hyperparameter tuning.
   */
  modelPath?: string;
  /**
   * Python version on which the built-in algorithm was trained.
   */
  pythonVersion?: string;
  /**
   * AI Platform runtime version on which the built-in algorithm was trained.
   */
  runtimeVersion?: string;
}

/**
 * Request message for the CancelJob method.
 */
export interface GoogleCloudMlV1__CancelJobRequest {
}

export interface GoogleCloudMlV1__Capability {
  /**
   * Available accelerators for the capability.
   */
  availableAccelerators?:  | "ACCELERATOR_TYPE_UNSPECIFIED" | "NVIDIA_TESLA_K80" | "NVIDIA_TESLA_P100" | "NVIDIA_TESLA_V100" | "NVIDIA_TESLA_P4" | "NVIDIA_TESLA_T4" | "NVIDIA_TESLA_A100" | "TPU_V2" | "TPU_V3" | "TPU_V2_POD" | "TPU_V3_POD" | "TPU_V4_POD"[];
  type?:  | "TYPE_UNSPECIFIED" | "TRAINING" | "BATCH_PREDICTION" | "ONLINE_PREDICTION";
}

/**
 * This message will be placed in the metadata field of a
 * google.longrunning.Operation associated with a CheckTrialEarlyStoppingState
 * request.
 */
export interface GoogleCloudMlV1__CheckTrialEarlyStoppingStateMetatdata {
  /**
   * The time at which the operation was submitted.
   */
  createTime?: Date;
  /**
   * The name of the study that the trial belongs to.
   */
  study?: string;
  /**
   * The trial name.
   */
  trial?: string;
}

function serializeGoogleCloudMlV1__CheckTrialEarlyStoppingStateMetatdata(data: any): GoogleCloudMlV1__CheckTrialEarlyStoppingStateMetatdata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudMlV1__CheckTrialEarlyStoppingStateMetatdata(data: any): GoogleCloudMlV1__CheckTrialEarlyStoppingStateMetatdata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * The request message for the CheckTrialEarlyStoppingState service method.
 */
export interface GoogleCloudMlV1__CheckTrialEarlyStoppingStateRequest {
}

/**
 * The message will be placed in the response field of a completed
 * google.longrunning.Operation associated with a CheckTrialEarlyStoppingState
 * request.
 */
export interface GoogleCloudMlV1__CheckTrialEarlyStoppingStateResponse {
  /**
   * The time at which operation processing completed.
   */
  endTime?: Date;
  /**
   * True if the Trial should stop.
   */
  shouldStop?: boolean;
  /**
   * The time at which the operation was started.
   */
  startTime?: Date;
}

function serializeGoogleCloudMlV1__CheckTrialEarlyStoppingStateResponse(data: any): GoogleCloudMlV1__CheckTrialEarlyStoppingStateResponse {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudMlV1__CheckTrialEarlyStoppingStateResponse(data: any): GoogleCloudMlV1__CheckTrialEarlyStoppingStateResponse {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The request message for the CompleteTrial service method.
 */
export interface GoogleCloudMlV1__CompleteTrialRequest {
  /**
   * Optional. If provided, it will be used as the completed trial's
   * final_measurement; Otherwise, the service will auto-select a previously
   * reported measurement as the final-measurement
   */
  finalMeasurement?: GoogleCloudMlV1__Measurement;
  /**
   * Optional. A human readable reason why the trial was infeasible. This
   * should only be provided if `trial_infeasible` is true.
   */
  infeasibleReason?: string;
  /**
   * Optional. True if the trial cannot be run with the given Parameter, and
   * final_measurement will be ignored.
   */
  trialInfeasible?: boolean;
}

function serializeGoogleCloudMlV1__CompleteTrialRequest(data: any): GoogleCloudMlV1__CompleteTrialRequest {
  return {
    ...data,
    finalMeasurement: data["finalMeasurement"] !== undefined ? serializeGoogleCloudMlV1__Measurement(data["finalMeasurement"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__CompleteTrialRequest(data: any): GoogleCloudMlV1__CompleteTrialRequest {
  return {
    ...data,
    finalMeasurement: data["finalMeasurement"] !== undefined ? deserializeGoogleCloudMlV1__Measurement(data["finalMeasurement"]) : undefined,
  };
}

export interface GoogleCloudMlV1__Config {
  /**
   * The service account Cloud ML uses to run on TPU node.
   */
  tpuServiceAccount?: string;
}

/**
 * Represents a network port in a single container. This message is a subset of
 * the [Kubernetes ContainerPort v1 core
 * specification](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#containerport-v1-core).
 */
export interface GoogleCloudMlV1__ContainerPort {
  /**
   * Number of the port to expose on the container. This must be a valid port
   * number: 0 < PORT_NUMBER < 65536.
   */
  containerPort?: number;
}

/**
 * Specification of a custom container for serving predictions. This message is
 * a subset of the [Kubernetes Container v1 core
 * specification](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#container-v1-core).
 */
export interface GoogleCloudMlV1__ContainerSpec {
  /**
   * Immutable. Specifies arguments for the command that runs when the
   * container starts. This overrides the container's
   * [`CMD`](https://docs.docker.com/engine/reference/builder/#cmd). Specify
   * this field as an array of executable and arguments, similar to a Docker
   * `CMD`'s "default parameters" form. If you don't specify this field but do
   * specify the command field, then the command from the `command` field runs
   * without any additional arguments. See the [Kubernetes documentation about
   * how the `command` and `args` fields interact with a container's
   * `ENTRYPOINT` and
   * `CMD`](https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#notes).
   * If you don't specify this field and don't specify the `commmand` field,
   * then the container's
   * [`ENTRYPOINT`](https://docs.docker.com/engine/reference/builder/#cmd) and
   * `CMD` determine what runs based on their default behavior. See the [Docker
   * documentation about how `CMD` and `ENTRYPOINT`
   * interact](https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact).
   * In this field, you can reference [environment variables set by AI Platform
   * Prediction](/ai-platform/prediction/docs/custom-container-requirements#aip-variables)
   * and environment variables set in the env field. You cannot reference
   * environment variables set in the Docker image. In order for environment
   * variables to be expanded, reference them by using the following syntax: $(
   * VARIABLE_NAME) Note that this differs from Bash variable expansion, which
   * does not use parentheses. If a variable cannot be resolved, the reference
   * in the input string is used unchanged. To avoid variable expansion, you can
   * escape this syntax with `$$`; for example: $$(VARIABLE_NAME) This field
   * corresponds to the `args` field of the [Kubernetes Containers v1 core
   * API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#container-v1-core).
   */
  args?: string[];
  /**
   * Immutable. Specifies the command that runs when the container starts. This
   * overrides the container's
   * [`ENTRYPOINT`](https://docs.docker.com/engine/reference/builder/#entrypoint).
   * Specify this field as an array of executable and arguments, similar to a
   * Docker `ENTRYPOINT`'s "exec" form, not its "shell" form. If you do not
   * specify this field, then the container's `ENTRYPOINT` runs, in conjunction
   * with the args field or the container's
   * [`CMD`](https://docs.docker.com/engine/reference/builder/#cmd), if either
   * exists. If this field is not specified and the container does not have an
   * `ENTRYPOINT`, then refer to the [Docker documentation about how `CMD` and
   * `ENTRYPOINT`
   * interact](https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact).
   * If you specify this field, then you can also specify the `args` field to
   * provide additional arguments for this command. However, if you specify this
   * field, then the container's `CMD` is ignored. See the [Kubernetes
   * documentation about how the `command` and `args` fields interact with a
   * container's `ENTRYPOINT` and
   * `CMD`](https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#notes).
   * In this field, you can reference [environment variables set by AI Platform
   * Prediction](/ai-platform/prediction/docs/custom-container-requirements#aip-variables)
   * and environment variables set in the env field. You cannot reference
   * environment variables set in the Docker image. In order for environment
   * variables to be expanded, reference them by using the following syntax: $(
   * VARIABLE_NAME) Note that this differs from Bash variable expansion, which
   * does not use parentheses. If a variable cannot be resolved, the reference
   * in the input string is used unchanged. To avoid variable expansion, you can
   * escape this syntax with `$$`; for example: $$(VARIABLE_NAME) This field
   * corresponds to the `command` field of the [Kubernetes Containers v1 core
   * API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#container-v1-core).
   */
  command?: string[];
  /**
   * Immutable. List of environment variables to set in the container. After
   * the container starts running, code running in the container can read these
   * environment variables. Additionally, the command and args fields can
   * reference these variables. Later entries in this list can also reference
   * earlier entries. For example, the following example sets the variable
   * `VAR_2` to have the value `foo bar`: ```json [ { "name": "VAR_1", "value":
   * "foo" }, { "name": "VAR_2", "value": "$(VAR_1) bar" } ] ``` If you switch
   * the order of the variables in the example, then the expansion does not
   * occur. This field corresponds to the `env` field of the [Kubernetes
   * Containers v1 core
   * API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#container-v1-core).
   */
  env?: GoogleCloudMlV1__EnvVar[];
  /**
   * URI of the Docker image to be used as the custom container for serving
   * predictions. This URI must identify [an image in Artifact
   * Registry](/artifact-registry/docs/overview) and begin with the hostname
   * `{REGION}-docker.pkg.dev`, where `{REGION}` is replaced by the region that
   * matches AI Platform Prediction [regional
   * endpoint](/ai-platform/prediction/docs/regional-endpoints) that you are
   * using. For example, if you are using the `us-central1-ml.googleapis.com`
   * endpoint, then this URI must begin with `us-central1-docker.pkg.dev`. To
   * use a custom container, the [AI Platform Google-managed service
   * account](/ai-platform/prediction/docs/custom-service-account#default) must
   * have permission to pull (read) the Docker image at this URI. The AI
   * Platform Google-managed service account has the following format:
   * `service-{PROJECT_NUMBER}@cloud-ml.google.com.iam.gserviceaccount.com`
   * {PROJECT_NUMBER} is replaced by your Google Cloud project number. By
   * default, this service account has necessary permissions to pull an Artifact
   * Registry image in the same Google Cloud project where you are using AI
   * Platform Prediction. In this case, no configuration is necessary. If you
   * want to use an image from a different Google Cloud project, learn how to
   * [grant the Artifact Registry Reader (roles/artifactregistry.reader) role
   * for a repository](/artifact-registry/docs/access-control#grant-repo) to
   * your projet's AI Platform Google-managed service account. To learn about
   * the requirements for the Docker image itself, read [Custom container
   * requirements](/ai-platform/prediction/docs/custom-container-requirements).
   */
  image?: string;
  /**
   * Immutable. List of ports to expose from the container. AI Platform
   * Prediction sends any prediction requests that it receives to the first port
   * on this list. AI Platform Prediction also sends [liveness and health
   * checks](/ai-platform/prediction/docs/custom-container-requirements#health)
   * to this port. If you do not specify this field, it defaults to following
   * value: ```json [ { "containerPort": 8080 } ] ``` AI Platform Prediction
   * does not use ports other than the first one listed. This field corresponds
   * to the `ports` field of the [Kubernetes Containers v1 core
   * API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#container-v1-core).
   */
  ports?: GoogleCloudMlV1__ContainerPort[];
}

/**
 * Represents the config of disk options.
 */
export interface GoogleCloudMlV1__DiskConfig {
  /**
   * Size in GB of the boot disk (default is 100GB).
   */
  bootDiskSizeGb?: number;
  /**
   * Type of the boot disk (default is "pd-ssd"). Valid values: "pd-ssd"
   * (Persistent Disk Solid State Drive) or "pd-standard" (Persistent Disk Hard
   * Disk Drive).
   */
  bootDiskType?: string;
}

/**
 * Represents a custom encryption key configuration that can be applied to a
 * resource.
 */
export interface GoogleCloudMlV1__EncryptionConfig {
  /**
   * The Cloud KMS resource identifier of the customer-managed encryption key
   * used to protect a resource, such as a training job. It has the following
   * format:
   * `projects/{PROJECT_ID}/locations/{REGION}/keyRings/{KEY_RING_NAME}/cryptoKeys/{KEY_NAME}`
   */
  kmsKeyName?: string;
}

/**
 * Represents an environment variable to be made available in a container. This
 * message is a subset of the [Kubernetes EnvVar v1 core
 * specification](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/#envvar-v1-core).
 */
export interface GoogleCloudMlV1__EnvVar {
  /**
   * Name of the environment variable. Must be a [valid C
   * identifier](https://github.com/kubernetes/kubernetes/blob/v1.18.8/staging/src/k8s.io/apimachinery/pkg/util/validation/validation.go#L258)
   * and must not begin with the prefix `AIP_`.
   */
  name?: string;
  /**
   * Value of the environment variable. Defaults to an empty string. In this
   * field, you can reference [environment variables set by AI Platform
   * Prediction](/ai-platform/prediction/docs/custom-container-requirements#aip-variables)
   * and environment variables set earlier in the same env field as where this
   * message occurs. You cannot reference environment variables set in the
   * Docker image. In order for environment variables to be expanded, reference
   * them by using the following syntax: $(VARIABLE_NAME) Note that this differs
   * from Bash variable expansion, which does not use parentheses. If a variable
   * cannot be resolved, the reference in the input string is used unchanged. To
   * avoid variable expansion, you can escape this syntax with `$$`; for
   * example: $$(VARIABLE_NAME)
   */
  value?: string;
}

/**
 * Request for explanations to be issued against a trained model.
 */
export interface GoogleCloudMlV1__ExplainRequest {
  /**
   * Required. The explanation request body.
   */
  httpBody?: GoogleApi__HttpBody;
}

function serializeGoogleCloudMlV1__ExplainRequest(data: any): GoogleCloudMlV1__ExplainRequest {
  return {
    ...data,
    httpBody: data["httpBody"] !== undefined ? serializeGoogleApi__HttpBody(data["httpBody"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__ExplainRequest(data: any): GoogleCloudMlV1__ExplainRequest {
  return {
    ...data,
    httpBody: data["httpBody"] !== undefined ? deserializeGoogleApi__HttpBody(data["httpBody"]) : undefined,
  };
}

/**
 * Message holding configuration options for explaining model predictions.
 * There are three feature attribution methods supported for TensorFlow models:
 * integrated gradients, sampled Shapley, and XRAI. [Learn more about feature
 * attributions.](/ai-platform/prediction/docs/ai-explanations/overview)
 */
export interface GoogleCloudMlV1__ExplanationConfig {
  /**
   * Attributes credit by computing the Aumann-Shapley value taking advantage
   * of the model's fully differentiable structure. Refer to this paper for more
   * details: https://arxiv.org/abs/1703.01365
   */
  integratedGradientsAttribution?: GoogleCloudMlV1__IntegratedGradientsAttribution;
  /**
   * An attribution method that approximates Shapley values for features that
   * contribute to the label being predicted. A sampling strategy is used to
   * approximate the value rather than considering all subsets of features.
   */
  sampledShapleyAttribution?: GoogleCloudMlV1__SampledShapleyAttribution;
  /**
   * Attributes credit by computing the XRAI taking advantage of the model's
   * fully differentiable structure. Refer to this paper for more details:
   * https://arxiv.org/abs/1906.02825 Currently only implemented for models with
   * natural image inputs.
   */
  xraiAttribution?: GoogleCloudMlV1__XraiAttribution;
}

/**
 * Returns service account information associated with a project.
 */
export interface GoogleCloudMlV1__GetConfigResponse {
  config?: GoogleCloudMlV1__Config;
  /**
   * The service account Cloud ML uses to access resources in the project.
   */
  serviceAccount?: string;
  /**
   * The project number for `service_account`.
   */
  serviceAccountProject?: bigint;
}

function serializeGoogleCloudMlV1__GetConfigResponse(data: any): GoogleCloudMlV1__GetConfigResponse {
  return {
    ...data,
    serviceAccountProject: data["serviceAccountProject"] !== undefined ? String(data["serviceAccountProject"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__GetConfigResponse(data: any): GoogleCloudMlV1__GetConfigResponse {
  return {
    ...data,
    serviceAccountProject: data["serviceAccountProject"] !== undefined ? BigInt(data["serviceAccountProject"]) : undefined,
  };
}

/**
 * Represents the result of a single hyperparameter tuning trial from a
 * training job. The TrainingOutput object that is returned on successful
 * completion of a training job with hyperparameter tuning includes a list of
 * HyperparameterOutput objects, one for each successful trial.
 */
export interface GoogleCloudMlV1__HyperparameterOutput {
  /**
   * All recorded object metrics for this trial. This field is not currently
   * populated.
   */
  allMetrics?: GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric[];
  /**
   * Details related to built-in algorithms jobs. Only set for trials of
   * built-in algorithms jobs that have succeeded.
   */
  builtInAlgorithmOutput?: GoogleCloudMlV1__BuiltInAlgorithmOutput;
  /**
   * Output only. End time for the trial.
   */
  endTime?: Date;
  /**
   * The final objective metric seen for this trial.
   */
  finalMetric?: GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric;
  /**
   * The hyperparameters given to this trial.
   */
  hyperparameters?: {
    [key: string]: string
  };
  /**
   * True if the trial is stopped early.
   */
  isTrialStoppedEarly?: boolean;
  /**
   * Output only. Start time for the trial.
   */
  startTime?: Date;
  /**
   * Output only. The detailed state of the trial.
   */
  state?:  | "STATE_UNSPECIFIED" | "QUEUED" | "PREPARING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLING" | "CANCELLED";
  /**
   * The trial id for these results.
   */
  trialId?: string;
  /**
   * URIs for accessing [interactive
   * shells](https://cloud.google.com/ai-platform/training/docs/monitor-debug-interactive-shell)
   * (one URI for each training node). Only available if this trial is part of a
   * hyperparameter tuning job and the job's training_input.enable_web_access is
   * `true`. The keys are names of each node in the training job; for example,
   * `master-replica-0` for the master node, `worker-replica-0` for the first
   * worker, and `ps-replica-0` for the first parameter server. The values are
   * the URIs for each node's interactive shell.
   */
  webAccessUris?: {
    [key: string]: string
  };
}

function serializeGoogleCloudMlV1__HyperparameterOutput(data: any): GoogleCloudMlV1__HyperparameterOutput {
  return {
    ...data,
    allMetrics: data["allMetrics"] !== undefined ? data["allMetrics"].map((item: any) => (serializeGoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric(item))) : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    finalMetric: data["finalMetric"] !== undefined ? serializeGoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric(data["finalMetric"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudMlV1__HyperparameterOutput(data: any): GoogleCloudMlV1__HyperparameterOutput {
  return {
    ...data,
    allMetrics: data["allMetrics"] !== undefined ? data["allMetrics"].map((item: any) => (deserializeGoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric(item))) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    finalMetric: data["finalMetric"] !== undefined ? deserializeGoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric(data["finalMetric"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Represents a set of hyperparameters to optimize.
 */
export interface GoogleCloudMlV1__HyperparameterSpec {
  /**
   * Optional. The search algorithm specified for the hyperparameter tuning
   * job. Uses the default AI Platform hyperparameter tuning algorithm if
   * unspecified.
   */
  algorithm?:  | "ALGORITHM_UNSPECIFIED" | "GRID_SEARCH" | "RANDOM_SEARCH";
  /**
   * Optional. Indicates if the hyperparameter tuning job enables auto trial
   * early stopping.
   */
  enableTrialEarlyStopping?: boolean;
  /**
   * Required. The type of goal to use for tuning. Available types are
   * `MAXIMIZE` and `MINIMIZE`. Defaults to `MAXIMIZE`.
   */
  goal?:  | "GOAL_TYPE_UNSPECIFIED" | "MAXIMIZE" | "MINIMIZE";
  /**
   * Optional. The TensorFlow summary tag name to use for optimizing trials.
   * For current versions of TensorFlow, this tag name should exactly match what
   * is shown in TensorBoard, including all scopes. For versions of TensorFlow
   * prior to 0.12, this should be only the tag passed to tf.Summary. By
   * default, "training/hptuning/metric" will be used.
   */
  hyperparameterMetricTag?: string;
  /**
   * Optional. The number of failed trials that need to be seen before failing
   * the hyperparameter tuning job. You can specify this field to override the
   * default failing criteria for AI Platform hyperparameter tuning jobs.
   * Defaults to zero, which means the service decides when a hyperparameter job
   * should fail.
   */
  maxFailedTrials?: number;
  /**
   * Optional. The number of training trials to run concurrently. You can
   * reduce the time it takes to perform hyperparameter tuning by adding trials
   * in parallel. However, each trail only benefits from the information gained
   * in completed trials. That means that a trial does not get access to the
   * results of trials running at the same time, which could reduce the quality
   * of the overall optimization. Each trial will use the same scale tier and
   * machine types. Defaults to one.
   */
  maxParallelTrials?: number;
  /**
   * Optional. How many training trials should be attempted to optimize the
   * specified hyperparameters. Defaults to one.
   */
  maxTrials?: number;
  /**
   * Required. The set of parameters to tune.
   */
  params?: GoogleCloudMlV1__ParameterSpec[];
  /**
   * Optional. The prior hyperparameter tuning job id that users hope to
   * continue with. The job id will be used to find the corresponding vizier
   * study guid and resume the study.
   */
  resumePreviousJobId?: string;
}

/**
 * Attributes credit by computing the Aumann-Shapley value taking advantage of
 * the model's fully differentiable structure. Refer to this paper for more
 * details: https://arxiv.org/abs/1703.01365
 */
export interface GoogleCloudMlV1__IntegratedGradientsAttribution {
  /**
   * Number of steps for approximating the path integral. A good value to start
   * is 50 and gradually increase until the sum to diff property is met within
   * the desired error range.
   */
  numIntegralSteps?: number;
}

/**
 * Represents a training or prediction job.
 */
export interface GoogleCloudMlV1__Job {
  /**
   * Output only. When the job was created.
   */
  createTime?: Date;
  /**
   * Output only. When the job processing was completed.
   */
  endTime?: Date;
  /**
   * Output only. The details of a failure or a cancellation.
   */
  errorMessage?: string;
  /**
   * `etag` is used for optimistic concurrency control as a way to help prevent
   * simultaneous updates of a job from overwriting each other. It is strongly
   * suggested that systems make use of the `etag` in the read-modify-write
   * cycle to perform job updates in order to avoid race conditions: An `etag`
   * is returned in the response to `GetJob`, and systems are expected to put
   * that etag in the request to `UpdateJob` to ensure that their change will be
   * applied to the same version of the job.
   */
  etag?: Uint8Array;
  /**
   * Required. The user-specified id of the job.
   */
  jobId?: string;
  /**
   * Output only. It's only effect when the job is in QUEUED state. If it's
   * positive, it indicates the job's position in the job scheduler. It's 0 when
   * the job is already scheduled.
   */
  readonly jobPosition?: bigint;
  /**
   * Optional. One or more labels that you can add, to organize your jobs. Each
   * label is a key-value pair, where both the key and the value are arbitrary
   * strings that you supply. For more information, see the documentation on
   * using labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Input parameters to create a prediction job.
   */
  predictionInput?: GoogleCloudMlV1__PredictionInput;
  /**
   * The current prediction job result.
   */
  predictionOutput?: GoogleCloudMlV1__PredictionOutput;
  /**
   * Output only. When the job processing was started.
   */
  startTime?: Date;
  /**
   * Output only. The detailed state of a job.
   */
  state?:  | "STATE_UNSPECIFIED" | "QUEUED" | "PREPARING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLING" | "CANCELLED";
  /**
   * Input parameters to create a training job.
   */
  trainingInput?: GoogleCloudMlV1__TrainingInput;
  /**
   * The current training job result.
   */
  trainingOutput?: GoogleCloudMlV1__TrainingOutput;
}

function serializeGoogleCloudMlV1__Job(data: any): GoogleCloudMlV1__Job {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
    predictionInput: data["predictionInput"] !== undefined ? serializeGoogleCloudMlV1__PredictionInput(data["predictionInput"]) : undefined,
    predictionOutput: data["predictionOutput"] !== undefined ? serializeGoogleCloudMlV1__PredictionOutput(data["predictionOutput"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    trainingInput: data["trainingInput"] !== undefined ? serializeGoogleCloudMlV1__TrainingInput(data["trainingInput"]) : undefined,
    trainingOutput: data["trainingOutput"] !== undefined ? serializeGoogleCloudMlV1__TrainingOutput(data["trainingOutput"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__Job(data: any): GoogleCloudMlV1__Job {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
    jobPosition: data["jobPosition"] !== undefined ? BigInt(data["jobPosition"]) : undefined,
    predictionInput: data["predictionInput"] !== undefined ? deserializeGoogleCloudMlV1__PredictionInput(data["predictionInput"]) : undefined,
    predictionOutput: data["predictionOutput"] !== undefined ? deserializeGoogleCloudMlV1__PredictionOutput(data["predictionOutput"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    trainingInput: data["trainingInput"] !== undefined ? deserializeGoogleCloudMlV1__TrainingInput(data["trainingInput"]) : undefined,
    trainingOutput: data["trainingOutput"] !== undefined ? deserializeGoogleCloudMlV1__TrainingOutput(data["trainingOutput"]) : undefined,
  };
}

/**
 * Response message for the ListJobs method.
 */
export interface GoogleCloudMlV1__ListJobsResponse {
  /**
   * The list of jobs.
   */
  jobs?: GoogleCloudMlV1__Job[];
  /**
   * Optional. Pass this token as the `page_token` field of the request for a
   * subsequent call.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudMlV1__ListJobsResponse(data: any): GoogleCloudMlV1__ListJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (serializeGoogleCloudMlV1__Job(item))) : undefined,
  };
}

function deserializeGoogleCloudMlV1__ListJobsResponse(data: any): GoogleCloudMlV1__ListJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (deserializeGoogleCloudMlV1__Job(item))) : undefined,
  };
}

export interface GoogleCloudMlV1__ListLocationsResponse {
  /**
   * Locations where at least one type of CMLE capability is available.
   */
  locations?: GoogleCloudMlV1__Location[];
  /**
   * Optional. Pass this token as the `page_token` field of the request for a
   * subsequent call.
   */
  nextPageToken?: string;
}

/**
 * Response message for the ListModels method.
 */
export interface GoogleCloudMlV1__ListModelsResponse {
  /**
   * The list of models.
   */
  models?: GoogleCloudMlV1__Model[];
  /**
   * Optional. Pass this token as the `page_token` field of the request for a
   * subsequent call.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudMlV1__ListModelsResponse(data: any): GoogleCloudMlV1__ListModelsResponse {
  return {
    ...data,
    models: data["models"] !== undefined ? data["models"].map((item: any) => (serializeGoogleCloudMlV1__Model(item))) : undefined,
  };
}

function deserializeGoogleCloudMlV1__ListModelsResponse(data: any): GoogleCloudMlV1__ListModelsResponse {
  return {
    ...data,
    models: data["models"] !== undefined ? data["models"].map((item: any) => (deserializeGoogleCloudMlV1__Model(item))) : undefined,
  };
}

/**
 * The request message for the ListTrials service method.
 */
export interface GoogleCloudMlV1__ListOptimalTrialsRequest {
}

/**
 * The response message for the ListOptimalTrials method.
 */
export interface GoogleCloudMlV1__ListOptimalTrialsResponse {
  /**
   * The pareto-optimal trials for multiple objective study or the optimal
   * trial for single objective study. The definition of pareto-optimal can be
   * checked in wiki page. https://en.wikipedia.org/wiki/Pareto_efficiency
   */
  trials?: GoogleCloudMlV1__Trial[];
}

function serializeGoogleCloudMlV1__ListOptimalTrialsResponse(data: any): GoogleCloudMlV1__ListOptimalTrialsResponse {
  return {
    ...data,
    trials: data["trials"] !== undefined ? data["trials"].map((item: any) => (serializeGoogleCloudMlV1__Trial(item))) : undefined,
  };
}

function deserializeGoogleCloudMlV1__ListOptimalTrialsResponse(data: any): GoogleCloudMlV1__ListOptimalTrialsResponse {
  return {
    ...data,
    trials: data["trials"] !== undefined ? data["trials"].map((item: any) => (deserializeGoogleCloudMlV1__Trial(item))) : undefined,
  };
}

export interface GoogleCloudMlV1__ListStudiesResponse {
  /**
   * The studies associated with the project.
   */
  studies?: GoogleCloudMlV1__Study[];
}

function serializeGoogleCloudMlV1__ListStudiesResponse(data: any): GoogleCloudMlV1__ListStudiesResponse {
  return {
    ...data,
    studies: data["studies"] !== undefined ? data["studies"].map((item: any) => (serializeGoogleCloudMlV1__Study(item))) : undefined,
  };
}

function deserializeGoogleCloudMlV1__ListStudiesResponse(data: any): GoogleCloudMlV1__ListStudiesResponse {
  return {
    ...data,
    studies: data["studies"] !== undefined ? data["studies"].map((item: any) => (deserializeGoogleCloudMlV1__Study(item))) : undefined,
  };
}

/**
 * The response message for the ListTrials method.
 */
export interface GoogleCloudMlV1__ListTrialsResponse {
  /**
   * The trials associated with the study.
   */
  trials?: GoogleCloudMlV1__Trial[];
}

function serializeGoogleCloudMlV1__ListTrialsResponse(data: any): GoogleCloudMlV1__ListTrialsResponse {
  return {
    ...data,
    trials: data["trials"] !== undefined ? data["trials"].map((item: any) => (serializeGoogleCloudMlV1__Trial(item))) : undefined,
  };
}

function deserializeGoogleCloudMlV1__ListTrialsResponse(data: any): GoogleCloudMlV1__ListTrialsResponse {
  return {
    ...data,
    trials: data["trials"] !== undefined ? data["trials"].map((item: any) => (deserializeGoogleCloudMlV1__Trial(item))) : undefined,
  };
}

/**
 * Response message for the ListVersions method.
 */
export interface GoogleCloudMlV1__ListVersionsResponse {
  /**
   * Optional. Pass this token as the `page_token` field of the request for a
   * subsequent call.
   */
  nextPageToken?: string;
  /**
   * The list of versions.
   */
  versions?: GoogleCloudMlV1__Version[];
}

function serializeGoogleCloudMlV1__ListVersionsResponse(data: any): GoogleCloudMlV1__ListVersionsResponse {
  return {
    ...data,
    versions: data["versions"] !== undefined ? data["versions"].map((item: any) => (serializeGoogleCloudMlV1__Version(item))) : undefined,
  };
}

function deserializeGoogleCloudMlV1__ListVersionsResponse(data: any): GoogleCloudMlV1__ListVersionsResponse {
  return {
    ...data,
    versions: data["versions"] !== undefined ? data["versions"].map((item: any) => (deserializeGoogleCloudMlV1__Version(item))) : undefined,
  };
}

export interface GoogleCloudMlV1__Location {
  /**
   * Capabilities available in the location.
   */
  capabilities?: GoogleCloudMlV1__Capability[];
  name?: string;
}

/**
 * Options for manually scaling a model.
 */
export interface GoogleCloudMlV1__ManualScaling {
  /**
   * The number of nodes to allocate for this model. These nodes are always up,
   * starting from the time the model is deployed, so the cost of operating this
   * model will be proportional to `nodes` * number of hours since last billing
   * cycle plus the cost for each prediction performed.
   */
  nodes?: number;
}

/**
 * A message representing a measurement.
 */
export interface GoogleCloudMlV1__Measurement {
  /**
   * Output only. Time that the trial has been running at the point of this
   * measurement.
   */
  elapsedTime?: number /* Duration */;
  /**
   * Provides a list of metrics that act as inputs into the objective function.
   */
  metrics?: GoogleCloudMlV1_Measurement_Metric[];
  /**
   * The number of steps a machine learning model has been trained for. Must be
   * non-negative.
   */
  stepCount?: bigint;
}

function serializeGoogleCloudMlV1__Measurement(data: any): GoogleCloudMlV1__Measurement {
  return {
    ...data,
    elapsedTime: data["elapsedTime"] !== undefined ? data["elapsedTime"] : undefined,
    stepCount: data["stepCount"] !== undefined ? String(data["stepCount"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__Measurement(data: any): GoogleCloudMlV1__Measurement {
  return {
    ...data,
    elapsedTime: data["elapsedTime"] !== undefined ? data["elapsedTime"] : undefined,
    stepCount: data["stepCount"] !== undefined ? BigInt(data["stepCount"]) : undefined,
  };
}

/**
 * MetricSpec contains the specifications to use to calculate the desired nodes
 * count when autoscaling is enabled.
 */
export interface GoogleCloudMlV1__MetricSpec {
  /**
   * metric name.
   */
  name?:  | "METRIC_NAME_UNSPECIFIED" | "CPU_USAGE" | "GPU_DUTY_CYCLE";
  /**
   * Target specifies the target value for the given metric; once real metric
   * deviates from the threshold by a certain percentage, the node count
   * changes.
   */
  target?: number;
}

/**
 * Represents a machine learning solution. A model can have multiple versions,
 * each of which is a deployed, trained model ready to receive prediction
 * requests. The model itself is just a container.
 */
export interface GoogleCloudMlV1__Model {
  /**
   * Output only. The default version of the model. This version will be used
   * to handle prediction requests that do not specify a version. You can change
   * the default version by calling projects.models.versions.setDefault.
   */
  defaultVersion?: GoogleCloudMlV1__Version;
  /**
   * Optional. The description specified for the model when it was created.
   */
  description?: string;
  /**
   * `etag` is used for optimistic concurrency control as a way to help prevent
   * simultaneous updates of a model from overwriting each other. It is strongly
   * suggested that systems make use of the `etag` in the read-modify-write
   * cycle to perform model updates in order to avoid race conditions: An `etag`
   * is returned in the response to `GetModel`, and systems are expected to put
   * that etag in the request to `UpdateModel` to ensure that their change will
   * be applied to the model as intended.
   */
  etag?: Uint8Array;
  /**
   * Optional. One or more labels that you can add, to organize your models.
   * Each label is a key-value pair, where both the key and the value are
   * arbitrary strings that you supply. For more information, see the
   * documentation on using labels. Note that this field is not updatable for
   * mls1* models.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. The name specified for the model when it was created. The model
   * name must be unique within the project it is created in.
   */
  name?: string;
  /**
   * Optional. If true, online prediction nodes send `stderr` and `stdout`
   * streams to Cloud Logging. These can be more verbose than the standard
   * access logs (see `onlinePredictionLogging`) and can incur higher cost.
   * However, they are helpful for debugging. Note that [logs may incur a
   * cost](/stackdriver/pricing), especially if your project receives prediction
   * requests at a high QPS. Estimate your costs before enabling this option.
   * Default is false.
   */
  onlinePredictionConsoleLogging?: boolean;
  /**
   * Optional. If true, online prediction access logs are sent to Cloud
   * Logging. These logs are like standard server access logs, containing
   * information like timestamp and latency for each request. Note that [logs
   * may incur a cost](/stackdriver/pricing), especially if your project
   * receives prediction requests at a high queries per second rate (QPS).
   * Estimate your costs before enabling this option. Default is false.
   */
  onlinePredictionLogging?: boolean;
  /**
   * Optional. The list of regions where the model is going to be deployed.
   * Only one region per model is supported. Defaults to 'us-central1' if
   * nothing is set. See the available regions for AI Platform services. Note: *
   * No matter where a model is deployed, it can always be accessed by users
   * from anywhere, both for online and batch prediction. * The region for a
   * batch prediction job is set by the region field when submitting the batch
   * prediction job and does not take its value from this field.
   */
  regions?: string[];
}

function serializeGoogleCloudMlV1__Model(data: any): GoogleCloudMlV1__Model {
  return {
    ...data,
    defaultVersion: data["defaultVersion"] !== undefined ? serializeGoogleCloudMlV1__Version(data["defaultVersion"]) : undefined,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__Model(data: any): GoogleCloudMlV1__Model {
  return {
    ...data,
    defaultVersion: data["defaultVersion"] !== undefined ? deserializeGoogleCloudMlV1__Version(data["defaultVersion"]) : undefined,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudMlV1__OperationMetadata {
  /**
   * The time the operation was submitted.
   */
  createTime?: Date;
  /**
   * The time operation processing completed.
   */
  endTime?: Date;
  /**
   * Indicates whether a request to cancel this operation has been made.
   */
  isCancellationRequested?: boolean;
  /**
   * The user labels, inherited from the model or the model version being
   * operated on.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Contains the name of the model associated with the operation.
   */
  modelName?: string;
  /**
   * The operation type.
   */
  operationType?:  | "OPERATION_TYPE_UNSPECIFIED" | "CREATE_VERSION" | "DELETE_VERSION" | "DELETE_MODEL" | "UPDATE_MODEL" | "UPDATE_VERSION" | "UPDATE_CONFIG";
  /**
   * Contains the project number associated with the operation.
   */
  projectNumber?: bigint;
  /**
   * The time operation processing started.
   */
  startTime?: Date;
  /**
   * Contains the version associated with the operation.
   */
  version?: GoogleCloudMlV1__Version;
}

function serializeGoogleCloudMlV1__OperationMetadata(data: any): GoogleCloudMlV1__OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    projectNumber: data["projectNumber"] !== undefined ? String(data["projectNumber"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    version: data["version"] !== undefined ? serializeGoogleCloudMlV1__Version(data["version"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__OperationMetadata(data: any): GoogleCloudMlV1__OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    projectNumber: data["projectNumber"] !== undefined ? BigInt(data["projectNumber"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    version: data["version"] !== undefined ? deserializeGoogleCloudMlV1__Version(data["version"]) : undefined,
  };
}

/**
 * Represents a single hyperparameter to optimize.
 */
export interface GoogleCloudMlV1__ParameterSpec {
  /**
   * Required if type is `CATEGORICAL`. The list of possible categories.
   */
  categoricalValues?: string[];
  /**
   * Required if type is `DISCRETE`. A list of feasible points. The list should
   * be in strictly increasing order. For instance, this parameter might have
   * possible settings of 1.5, 2.5, and 4.0. This list should not contain more
   * than 1,000 values.
   */
  discreteValues?: number[];
  /**
   * Required if type is `DOUBLE` or `INTEGER`. This field should be unset if
   * type is `CATEGORICAL`. This value should be integers if type is `INTEGER`.
   */
  maxValue?: number;
  /**
   * Required if type is `DOUBLE` or `INTEGER`. This field should be unset if
   * type is `CATEGORICAL`. This value should be integers if type is INTEGER.
   */
  minValue?: number;
  /**
   * Required. The parameter name must be unique amongst all ParameterConfigs
   * in a HyperparameterSpec message. E.g., "learning_rate".
   */
  parameterName?: string;
  /**
   * Optional. How the parameter should be scaled to the hypercube. Leave unset
   * for categorical parameters. Some kind of scaling is strongly recommended
   * for real or integral parameters (e.g., `UNIT_LINEAR_SCALE`).
   */
  scaleType?:  | "NONE" | "UNIT_LINEAR_SCALE" | "UNIT_LOG_SCALE" | "UNIT_REVERSE_LOG_SCALE";
  /**
   * Required. The type of the parameter.
   */
  type?:  | "PARAMETER_TYPE_UNSPECIFIED" | "DOUBLE" | "INTEGER" | "CATEGORICAL" | "DISCRETE";
}

/**
 * Represents input parameters for a prediction job.
 */
export interface GoogleCloudMlV1__PredictionInput {
  /**
   * Optional. Number of records per batch, defaults to 64. The service will
   * buffer batch_size number of records in memory before invoking one
   * Tensorflow prediction call internally. So take the record size and memory
   * available into consideration when setting this parameter.
   */
  batchSize?: bigint;
  /**
   * Required. The format of the input data files.
   */
  dataFormat?:  | "DATA_FORMAT_UNSPECIFIED" | "JSON" | "TEXT" | "TF_RECORD" | "TF_RECORD_GZIP" | "CSV";
  /**
   * Required. The Cloud Storage location of the input data files. May contain
   * wildcards.
   */
  inputPaths?: string[];
  /**
   * Optional. The maximum number of workers to be used for parallel
   * processing. Defaults to 10 if not specified.
   */
  maxWorkerCount?: bigint;
  /**
   * Use this field if you want to use the default version for the specified
   * model. The string must use the following format:
   * `"projects/YOUR_PROJECT/models/YOUR_MODEL"`
   */
  modelName?: string;
  /**
   * Optional. Format of the output data files, defaults to JSON.
   */
  outputDataFormat?:  | "DATA_FORMAT_UNSPECIFIED" | "JSON" | "TEXT" | "TF_RECORD" | "TF_RECORD_GZIP" | "CSV";
  /**
   * Required. The output Google Cloud Storage location.
   */
  outputPath?: string;
  /**
   * Required. The Google Compute Engine region to run the prediction job in.
   * See the available regions for AI Platform services.
   */
  region?: string;
  /**
   * Optional. The AI Platform runtime version to use for this batch
   * prediction. If not set, AI Platform will pick the runtime version used
   * during the CreateVersion request for this model version, or choose the
   * latest stable version when model version information is not available such
   * as when the model is specified by uri.
   */
  runtimeVersion?: string;
  /**
   * Optional. The name of the signature defined in the SavedModel to use for
   * this job. Please refer to
   * [SavedModel](https://tensorflow.github.io/serving/serving_basic.html) for
   * information about how to use signatures. Defaults to
   * [DEFAULT_SERVING_SIGNATURE_DEF_KEY](https://www.tensorflow.org/api_docs/python/tf/saved_model/signature_constants)
   * , which is "serving_default".
   */
  signatureName?: string;
  /**
   * Use this field if you want to specify a Google Cloud Storage path for the
   * model to use.
   */
  uri?: string;
  /**
   * Use this field if you want to specify a version of the model to use. The
   * string is formatted the same way as `model_version`, with the addition of
   * the version information:
   * `"projects/YOUR_PROJECT/models/YOUR_MODEL/versions/YOUR_VERSION"`
   */
  versionName?: string;
}

function serializeGoogleCloudMlV1__PredictionInput(data: any): GoogleCloudMlV1__PredictionInput {
  return {
    ...data,
    batchSize: data["batchSize"] !== undefined ? String(data["batchSize"]) : undefined,
    maxWorkerCount: data["maxWorkerCount"] !== undefined ? String(data["maxWorkerCount"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__PredictionInput(data: any): GoogleCloudMlV1__PredictionInput {
  return {
    ...data,
    batchSize: data["batchSize"] !== undefined ? BigInt(data["batchSize"]) : undefined,
    maxWorkerCount: data["maxWorkerCount"] !== undefined ? BigInt(data["maxWorkerCount"]) : undefined,
  };
}

/**
 * Represents results of a prediction job.
 */
export interface GoogleCloudMlV1__PredictionOutput {
  /**
   * The number of data instances which resulted in errors.
   */
  errorCount?: bigint;
  /**
   * Node hours used by the batch prediction job.
   */
  nodeHours?: number;
  /**
   * The output Google Cloud Storage location provided at the job creation
   * time.
   */
  outputPath?: string;
  /**
   * The number of generated predictions.
   */
  predictionCount?: bigint;
}

function serializeGoogleCloudMlV1__PredictionOutput(data: any): GoogleCloudMlV1__PredictionOutput {
  return {
    ...data,
    errorCount: data["errorCount"] !== undefined ? String(data["errorCount"]) : undefined,
    predictionCount: data["predictionCount"] !== undefined ? String(data["predictionCount"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__PredictionOutput(data: any): GoogleCloudMlV1__PredictionOutput {
  return {
    ...data,
    errorCount: data["errorCount"] !== undefined ? BigInt(data["errorCount"]) : undefined,
    predictionCount: data["predictionCount"] !== undefined ? BigInt(data["predictionCount"]) : undefined,
  };
}

/**
 * Request for predictions to be issued against a trained model.
 */
export interface GoogleCloudMlV1__PredictRequest {
  /**
   * Required. The prediction request body. Refer to the [request body details
   * section](#request-body-details) for more information on how to structure
   * your request.
   */
  httpBody?: GoogleApi__HttpBody;
}

function serializeGoogleCloudMlV1__PredictRequest(data: any): GoogleCloudMlV1__PredictRequest {
  return {
    ...data,
    httpBody: data["httpBody"] !== undefined ? serializeGoogleApi__HttpBody(data["httpBody"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__PredictRequest(data: any): GoogleCloudMlV1__PredictRequest {
  return {
    ...data,
    httpBody: data["httpBody"] !== undefined ? deserializeGoogleApi__HttpBody(data["httpBody"]) : undefined,
  };
}

/**
 * Represents the configuration for a replica in a cluster.
 */
export interface GoogleCloudMlV1__ReplicaConfig {
  /**
   * Represents the type and number of accelerators used by the replica. [Learn
   * about restrictions on accelerator configurations for
   * training.](/ai-platform/training/docs/using-gpus#compute-engine-machine-types-with-gpu)
   */
  acceleratorConfig?: GoogleCloudMlV1__AcceleratorConfig;
  /**
   * Arguments to the entrypoint command. The following rules apply for
   * container_command and container_args: - If you do not supply command or
   * args: The defaults defined in the Docker image are used. - If you supply a
   * command but no args: The default EntryPoint and the default Cmd defined in
   * the Docker image are ignored. Your command is run without any arguments. -
   * If you supply only args: The default Entrypoint defined in the Docker image
   * is run with the args that you supplied. - If you supply a command and args:
   * The default Entrypoint and the default Cmd defined in the Docker image are
   * ignored. Your command is run with your args. It cannot be set if custom
   * container image is not provided. Note that this field and
   * [TrainingInput.args] are mutually exclusive, i.e., both cannot be set at
   * the same time.
   */
  containerArgs?: string[];
  /**
   * The command with which the replica's custom container is run. If provided,
   * it will override default ENTRYPOINT of the docker image. If not provided,
   * the docker image's ENTRYPOINT is used. It cannot be set if custom container
   * image is not provided. Note that this field and [TrainingInput.args] are
   * mutually exclusive, i.e., both cannot be set at the same time.
   */
  containerCommand?: string[];
  /**
   * Represents the configuration of disk options.
   */
  diskConfig?: GoogleCloudMlV1__DiskConfig;
  /**
   * The Docker image to run on the replica. This image must be in Container
   * Registry. Learn more about [configuring custom
   * containers](/ai-platform/training/docs/distributed-training-containers).
   */
  imageUri?: string;
  /**
   * The AI Platform runtime version that includes a TensorFlow version
   * matching the one used in the custom container. This field is required if
   * the replica is a TPU worker that uses a custom container. Otherwise, do not
   * specify this field. This must be a [runtime version that currently supports
   * training with
   * TPUs](/ml-engine/docs/tensorflow/runtime-version-list#tpu-support). Note
   * that the version of TensorFlow included in a runtime version may differ
   * from the numbering of the runtime version itself, because it may have a
   * different [patch
   * version](https://www.tensorflow.org/guide/version_compat#semantic_versioning_20).
   * In this field, you must specify the runtime version (TensorFlow minor
   * version). For example, if your custom container runs TensorFlow `1.x.y`,
   * specify `1.x`.
   */
  tpuTfVersion?: string;
}

function serializeGoogleCloudMlV1__ReplicaConfig(data: any): GoogleCloudMlV1__ReplicaConfig {
  return {
    ...data,
    acceleratorConfig: data["acceleratorConfig"] !== undefined ? serializeGoogleCloudMlV1__AcceleratorConfig(data["acceleratorConfig"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__ReplicaConfig(data: any): GoogleCloudMlV1__ReplicaConfig {
  return {
    ...data,
    acceleratorConfig: data["acceleratorConfig"] !== undefined ? deserializeGoogleCloudMlV1__AcceleratorConfig(data["acceleratorConfig"]) : undefined,
  };
}

/**
 * Configuration for logging request-response pairs to a BigQuery table. Online
 * prediction requests to a model version and the responses to these requests
 * are converted to raw strings and saved to the specified BigQuery table.
 * Logging is constrained by [BigQuery quotas and limits](/bigquery/quotas). If
 * your project exceeds BigQuery quotas or limits, AI Platform Prediction does
 * not log request-response pairs, but it continues to serve predictions. If you
 * are using [continuous evaluation](/ml-engine/docs/continuous-evaluation/),
 * you do not need to specify this configuration manually. Setting up continuous
 * evaluation automatically enables logging of request-response pairs.
 */
export interface GoogleCloudMlV1__RequestLoggingConfig {
  /**
   * Required. Fully qualified BigQuery table name in the following format: "
   * project_id.dataset_name.table_name" The specified table must already exist,
   * and the "Cloud ML Service Agent" for your project must have permission to
   * write to it. The table must have the following
   * [schema](/bigquery/docs/schemas): Field nameType Mode model STRING REQUIRED
   * model_version STRING REQUIRED time TIMESTAMP REQUIRED raw_data STRING
   * REQUIRED raw_prediction STRING NULLABLE groundtruth STRING NULLABLE
   */
  bigqueryTableName?: string;
  /**
   * Percentage of requests to be logged, expressed as a fraction from 0 to 1.
   * For example, if you want to log 10% of requests, enter `0.1`. The sampling
   * window is the lifetime of the model version. Defaults to 0.
   */
  samplingPercentage?: number;
}

/**
 * Specifies HTTP paths served by a custom container. AI Platform Prediction
 * sends requests to these paths on the container; the custom container must run
 * an HTTP server that responds to these requests with appropriate responses.
 * Read [Custom container
 * requirements](/ai-platform/prediction/docs/custom-container-requirements) for
 * details on how to create your container image to meet these requirements.
 */
export interface GoogleCloudMlV1__RouteMap {
  /**
   * HTTP path on the container to send health checkss to. AI Platform
   * Prediction intermittently sends GET requests to this path on the
   * container's IP address and port to check that the container is healthy.
   * Read more about [health
   * checks](/ai-platform/prediction/docs/custom-container-requirements#checks).
   * For example, if you set this field to `/bar`, then AI Platform Prediction
   * intermittently sends a GET request to the `/bar` path on the port of your
   * container specified by the first value of Version.container.ports. If you
   * don't specify this field, it defaults to the following value: /v1/models/
   * MODEL/versions/VERSION The placeholders in this value are replaced as
   * follows: * MODEL: The name of the parent Model. This does not include the
   * "projects/PROJECT_ID/models/" prefix that the API returns in output; it is
   * the bare model name, as provided to projects.models.create. * VERSION: The
   * name of the model version. This does not include the "projects/PROJECT_ID
   * /models/MODEL/versions/" prefix that the API returns in output; it is the
   * bare version name, as provided to projects.models.versions.create.
   */
  health?: string;
  /**
   * HTTP path on the container to send prediction requests to. AI Platform
   * Prediction forwards requests sent using projects.predict to this path on
   * the container's IP address and port. AI Platform Prediction then returns
   * the container's response in the API response. For example, if you set this
   * field to `/foo`, then when AI Platform Prediction receives a prediction
   * request, it forwards the request body in a POST request to the `/foo` path
   * on the port of your container specified by the first value of
   * Version.container.ports. If you don't specify this field, it defaults to
   * the following value: /v1/models/MODEL/versions/VERSION:predict The
   * placeholders in this value are replaced as follows: * MODEL: The name of
   * the parent Model. This does not include the "projects/PROJECT_ID/models/"
   * prefix that the API returns in output; it is the bare model name, as
   * provided to projects.models.create. * VERSION: The name of the model
   * version. This does not include the
   * "projects/PROJECT_ID/models/MODEL/versions/" prefix that the API returns in
   * output; it is the bare version name, as provided to
   * projects.models.versions.create.
   */
  predict?: string;
}

/**
 * An attribution method that approximates Shapley values for features that
 * contribute to the label being predicted. A sampling strategy is used to
 * approximate the value rather than considering all subsets of features.
 */
export interface GoogleCloudMlV1__SampledShapleyAttribution {
  /**
   * The number of feature permutations to consider when approximating the
   * Shapley values.
   */
  numPaths?: number;
}

/**
 * All parameters related to scheduling of training jobs.
 */
export interface GoogleCloudMlV1__Scheduling {
  /**
   * Optional. The maximum job running time, expressed in seconds. The field
   * can contain up to nine fractional digits, terminated by `s`. If not
   * specified, this field defaults to `604800s` (seven days). If the training
   * job is still running after this duration, AI Platform Training cancels it.
   * The duration is measured from when the job enters the `RUNNING` state;
   * therefore it does not overlap with the duration limited by
   * Scheduling.max_wait_time. For example, if you want to ensure your job runs
   * for no more than 2 hours, set this field to `7200s` (2 hours * 60 minutes /
   * hour * 60 seconds / minute). If you submit your training job using the
   * `gcloud` tool, you can [specify this field in a `config.yaml`
   * file](/ai-platform/training/docs/training-jobs#formatting_your_configuration_parameters).
   * For example: ```yaml trainingInput: scheduling: maxRunningTime: 7200s ```
   */
  maxRunningTime?: number /* Duration */;
  /**
   * Optional. The maximum job wait time, expressed in seconds. The field can
   * contain up to nine fractional digits, terminated by `s`. If not specified,
   * there is no limit to the wait time. The minimum for this field is `1800s`
   * (30 minutes). If the training job has not entered the `RUNNING` state after
   * this duration, AI Platform Training cancels it. After the job begins
   * running, it can no longer be cancelled due to the maximum wait time.
   * Therefore the duration limited by this field does not overlap with the
   * duration limited by Scheduling.max_running_time. For example, if the job
   * temporarily stops running and retries due to a [VM
   * restart](/ai-platform/training/docs/overview#restarts), this cannot lead to
   * a maximum wait time cancellation. However, independently of this
   * constraint, AI Platform Training might stop a job if there are too many
   * retries due to exhausted resources in a region. The following example
   * describes how you might use this field: To cancel your job if it doesn't
   * start running within 1 hour, set this field to `3600s` (1 hour * 60 minutes
   * / hour * 60 seconds / minute). If the job is still in the `QUEUED` or
   * `PREPARING` state after an hour of waiting, AI Platform Training cancels
   * the job. If you submit your training job using the `gcloud` tool, you can
   * [specify this field in a `config.yaml`
   * file](/ai-platform/training/docs/training-jobs#formatting_your_configuration_parameters).
   * For example: ```yaml trainingInput: scheduling: maxWaitTime: 3600s ```
   */
  maxWaitTime?: number /* Duration */;
  /**
   * Optional. Job scheduling will be based on this priority, which in the
   * range [0, 1000]. The bigger the number, the higher the priority. Default to
   * 0 if not set. If there are multiple jobs requesting same type of
   * accelerators, the high priority job will be scheduled prior to ones with
   * low priority.
   */
  priority?: number;
}

function serializeGoogleCloudMlV1__Scheduling(data: any): GoogleCloudMlV1__Scheduling {
  return {
    ...data,
    maxRunningTime: data["maxRunningTime"] !== undefined ? data["maxRunningTime"] : undefined,
    maxWaitTime: data["maxWaitTime"] !== undefined ? data["maxWaitTime"] : undefined,
  };
}

function deserializeGoogleCloudMlV1__Scheduling(data: any): GoogleCloudMlV1__Scheduling {
  return {
    ...data,
    maxRunningTime: data["maxRunningTime"] !== undefined ? data["maxRunningTime"] : undefined,
    maxWaitTime: data["maxWaitTime"] !== undefined ? data["maxWaitTime"] : undefined,
  };
}

/**
 * Request message for the SetDefaultVersion request.
 */
export interface GoogleCloudMlV1__SetDefaultVersionRequest {
}

export interface GoogleCloudMlV1__StopTrialRequest {
}

/**
 * A message representing a Study.
 */
export interface GoogleCloudMlV1__Study {
  /**
   * Output only. Time at which the study was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. A human readable reason why the Study is inactive. This
   * should be empty if a study is ACTIVE or COMPLETED.
   */
  readonly inactiveReason?: string;
  /**
   * Output only. The name of a study.
   */
  readonly name?: string;
  /**
   * Output only. The detailed state of a study.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | "COMPLETED";
  /**
   * Required. Configuration of the study.
   */
  studyConfig?: GoogleCloudMlV1__StudyConfig;
}

function serializeGoogleCloudMlV1__Study(data: any): GoogleCloudMlV1__Study {
  return {
    ...data,
    studyConfig: data["studyConfig"] !== undefined ? serializeGoogleCloudMlV1__StudyConfig(data["studyConfig"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__Study(data: any): GoogleCloudMlV1__Study {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    studyConfig: data["studyConfig"] !== undefined ? deserializeGoogleCloudMlV1__StudyConfig(data["studyConfig"]) : undefined,
  };
}

/**
 * Represents configuration of a study.
 */
export interface GoogleCloudMlV1__StudyConfig {
  /**
   * The search algorithm specified for the study.
   */
  algorithm?:  | "ALGORITHM_UNSPECIFIED" | "GAUSSIAN_PROCESS_BANDIT" | "GRID_SEARCH" | "RANDOM_SEARCH";
  /**
   * Configuration for automated stopping of unpromising Trials.
   */
  automatedStoppingConfig?: GoogleCloudMlV1__AutomatedStoppingConfig;
  /**
   * Metric specs for the study.
   */
  metrics?: GoogleCloudMlV1_StudyConfig_MetricSpec[];
  /**
   * Required. The set of parameters to tune.
   */
  parameters?: GoogleCloudMlV1_StudyConfig_ParameterSpec[];
}

function serializeGoogleCloudMlV1__StudyConfig(data: any): GoogleCloudMlV1__StudyConfig {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (serializeGoogleCloudMlV1_StudyConfig_ParameterSpec(item))) : undefined,
  };
}

function deserializeGoogleCloudMlV1__StudyConfig(data: any): GoogleCloudMlV1__StudyConfig {
  return {
    ...data,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (deserializeGoogleCloudMlV1_StudyConfig_ParameterSpec(item))) : undefined,
  };
}

/**
 * Metadata field of a google.longrunning.Operation associated with a
 * SuggestTrialsRequest.
 */
export interface GoogleCloudMlV1__SuggestTrialsMetadata {
  /**
   * The identifier of the client that is requesting the suggestion.
   */
  clientId?: string;
  /**
   * The time operation was submitted.
   */
  createTime?: Date;
  /**
   * The name of the study that the trial belongs to.
   */
  study?: string;
  /**
   * The number of suggestions requested.
   */
  suggestionCount?: number;
}

function serializeGoogleCloudMlV1__SuggestTrialsMetadata(data: any): GoogleCloudMlV1__SuggestTrialsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudMlV1__SuggestTrialsMetadata(data: any): GoogleCloudMlV1__SuggestTrialsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * The request message for the SuggestTrial service method.
 */
export interface GoogleCloudMlV1__SuggestTrialsRequest {
  /**
   * Required. The identifier of the client that is requesting the suggestion.
   * If multiple SuggestTrialsRequests have the same `client_id`, the service
   * will return the identical suggested trial if the trial is pending, and
   * provide a new trial if the last suggested trial was completed.
   */
  clientId?: string;
  /**
   * Required. The number of suggestions requested.
   */
  suggestionCount?: number;
}

/**
 * This message will be placed in the response field of a completed
 * google.longrunning.Operation associated with a SuggestTrials request.
 */
export interface GoogleCloudMlV1__SuggestTrialsResponse {
  /**
   * The time at which operation processing completed.
   */
  endTime?: Date;
  /**
   * The time at which the operation was started.
   */
  startTime?: Date;
  /**
   * The state of the study.
   */
  studyState?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | "COMPLETED";
  /**
   * A list of trials.
   */
  trials?: GoogleCloudMlV1__Trial[];
}

function serializeGoogleCloudMlV1__SuggestTrialsResponse(data: any): GoogleCloudMlV1__SuggestTrialsResponse {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    trials: data["trials"] !== undefined ? data["trials"].map((item: any) => (serializeGoogleCloudMlV1__Trial(item))) : undefined,
  };
}

function deserializeGoogleCloudMlV1__SuggestTrialsResponse(data: any): GoogleCloudMlV1__SuggestTrialsResponse {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    trials: data["trials"] !== undefined ? data["trials"].map((item: any) => (deserializeGoogleCloudMlV1__Trial(item))) : undefined,
  };
}

/**
 * Represents input parameters for a training job. When using the gcloud
 * command to submit your training job, you can specify the input parameters as
 * command-line arguments and/or in a YAML configuration file referenced from
 * the --config command-line argument. For details, see the guide to [submitting
 * a training job](/ai-platform/training/docs/training-jobs).
 */
export interface GoogleCloudMlV1__TrainingInput {
  /**
   * Optional. Command-line arguments passed to the training application when
   * it starts. If your job uses a custom container, then the arguments are
   * passed to the container's `ENTRYPOINT` command.
   */
  args?: string[];
  /**
   * Optional. Whether you want AI Platform Training to enable [interactive
   * shell
   * access](https://cloud.google.com/ai-platform/training/docs/monitor-debug-interactive-shell)
   * to training containers. If set to `true`, you can access interactive shells
   * at the URIs given by TrainingOutput.web_access_uris or
   * HyperparameterOutput.web_access_uris (within TrainingOutput.trials).
   */
  enableWebAccess?: boolean;
  /**
   * Optional. Options for using customer-managed encryption keys (CMEK) to
   * protect resources created by a training job, instead of using Google's
   * default encryption. If this is set, then all resources created by the
   * training job will be encrypted with the customer-managed encryption key
   * that you specify. [Learn how and when to use CMEK with AI Platform
   * Training](/ai-platform/training/docs/cmek).
   */
  encryptionConfig?: GoogleCloudMlV1__EncryptionConfig;
  /**
   * Optional. The configuration for evaluators. You should only set
   * `evaluatorConfig.acceleratorConfig` if `evaluatorType` is set to a Compute
   * Engine machine type. [Learn about restrictions on accelerator
   * configurations for
   * training.](/ai-platform/training/docs/using-gpus#compute-engine-machine-types-with-gpu)
   * Set `evaluatorConfig.imageUri` only if you build a custom image for your
   * evaluator. If `evaluatorConfig.imageUri` has not been set, AI Platform uses
   * the value of `masterConfig.imageUri`. Learn more about [configuring custom
   * containers](/ai-platform/training/docs/distributed-training-containers).
   */
  evaluatorConfig?: GoogleCloudMlV1__ReplicaConfig;
  /**
   * Optional. The number of evaluator replicas to use for the training job.
   * Each replica in the cluster will be of the type specified in
   * `evaluator_type`. This value can only be used when `scale_tier` is set to
   * `CUSTOM`. If you set this value, you must also set `evaluator_type`. The
   * default value is zero.
   */
  evaluatorCount?: bigint;
  /**
   * Optional. Specifies the type of virtual machine to use for your training
   * job's evaluator nodes. The supported values are the same as those described
   * in the entry for `masterType`. This value must be consistent with the
   * category of machine type that `masterType` uses. In other words, both must
   * be Compute Engine machine types or both must be legacy machine types. This
   * value must be present when `scaleTier` is set to `CUSTOM` and
   * `evaluatorCount` is greater than zero.
   */
  evaluatorType?: string;
  /**
   * Optional. The set of Hyperparameters to tune.
   */
  hyperparameters?: GoogleCloudMlV1__HyperparameterSpec;
  /**
   * Optional. A Google Cloud Storage path in which to store training outputs
   * and other data needed for training. This path is passed to your TensorFlow
   * program as the '--job-dir' command-line argument. The benefit of specifying
   * this field is that Cloud ML validates the path for use in training.
   */
  jobDir?: string;
  /**
   * Optional. The configuration for your master worker. You should only set
   * `masterConfig.acceleratorConfig` if `masterType` is set to a Compute Engine
   * machine type. Learn about [restrictions on accelerator configurations for
   * training.](/ai-platform/training/docs/using-gpus#compute-engine-machine-types-with-gpu)
   * Set `masterConfig.imageUri` only if you build a custom image. Only one of
   * `masterConfig.imageUri` and `runtimeVersion` should be set. Learn more
   * about [configuring custom
   * containers](/ai-platform/training/docs/distributed-training-containers).
   */
  masterConfig?: GoogleCloudMlV1__ReplicaConfig;
  /**
   * Optional. Specifies the type of virtual machine to use for your training
   * job's master worker. You must specify this field when `scaleTier` is set to
   * `CUSTOM`. You can use certain Compute Engine machine types directly in this
   * field. See the [list of compatible Compute Engine machine
   * types](/ai-platform/training/docs/machine-types#compute-engine-machine-types).
   * Alternatively, you can use the certain legacy machine types in this field.
   * See the [list of legacy machine
   * types](/ai-platform/training/docs/machine-types#legacy-machine-types).
   * Finally, if you want to use a TPU for training, specify `cloud_tpu` in this
   * field. Learn more about the [special configuration options for training
   * with
   * TPUs](/ai-platform/training/docs/using-tpus#configuring_a_custom_tpu_machine).
   */
  masterType?: string;
  /**
   * Optional. The full name of the [Compute Engine network](/vpc/docs/vpc) to
   * which the Job is peered. For example,
   * `projects/12345/global/networks/myVPC`. The format of this field is
   * `projects/{project}/global/networks/{network}`, where {project} is a
   * project number (like `12345`) and {network} is network name. Private
   * services access must already be configured for the network. If left
   * unspecified, the Job is not peered with any network. [Learn about using VPC
   * Network Peering.](/ai-platform/training/docs/vpc-peering).
   */
  network?: string;
  /**
   * Required. The Google Cloud Storage location of the packages with the
   * training program and any additional dependencies. The maximum number of
   * package URIs is 100.
   */
  packageUris?: string[];
  /**
   * Optional. The configuration for parameter servers. You should only set
   * `parameterServerConfig.acceleratorConfig` if `parameterServerType` is set
   * to a Compute Engine machine type. [Learn about restrictions on accelerator
   * configurations for
   * training.](/ai-platform/training/docs/using-gpus#compute-engine-machine-types-with-gpu)
   * Set `parameterServerConfig.imageUri` only if you build a custom image for
   * your parameter server. If `parameterServerConfig.imageUri` has not been
   * set, AI Platform uses the value of `masterConfig.imageUri`. Learn more
   * about [configuring custom
   * containers](/ai-platform/training/docs/distributed-training-containers).
   */
  parameterServerConfig?: GoogleCloudMlV1__ReplicaConfig;
  /**
   * Optional. The number of parameter server replicas to use for the training
   * job. Each replica in the cluster will be of the type specified in
   * `parameter_server_type`. This value can only be used when `scale_tier` is
   * set to `CUSTOM`. If you set this value, you must also set
   * `parameter_server_type`. The default value is zero.
   */
  parameterServerCount?: bigint;
  /**
   * Optional. Specifies the type of virtual machine to use for your training
   * job's parameter server. The supported values are the same as those
   * described in the entry for `master_type`. This value must be consistent
   * with the category of machine type that `masterType` uses. In other words,
   * both must be Compute Engine machine types or both must be legacy machine
   * types. This value must be present when `scaleTier` is set to `CUSTOM` and
   * `parameter_server_count` is greater than zero.
   */
  parameterServerType?: string;
  /**
   * Required. The Python module name to run after installing the packages.
   */
  pythonModule?: string;
  /**
   * Optional. The version of Python used in training. You must either specify
   * this field or specify `masterConfig.imageUri`. The following Python
   * versions are available: * Python '3.7' is available when `runtime_version`
   * is set to '1.15' or later. * Python '3.5' is available when
   * `runtime_version` is set to a version from '1.4' to '1.14'. * Python '2.7'
   * is available when `runtime_version` is set to '1.15' or earlier. Read more
   * about the Python versions available for [each runtime
   * version](/ml-engine/docs/runtime-version-list).
   */
  pythonVersion?: string;
  /**
   * Required. The region to run the training job in. See the [available
   * regions](/ai-platform/training/docs/regions) for AI Platform Training.
   */
  region?: string;
  /**
   * Optional. The AI Platform runtime version to use for training. You must
   * either specify this field or specify `masterConfig.imageUri`. For more
   * information, see the [runtime version
   * list](/ai-platform/training/docs/runtime-version-list) and learn [how to
   * manage runtime versions](/ai-platform/training/docs/versioning).
   */
  runtimeVersion?: string;
  /**
   * Required. Specifies the machine types, the number of replicas for workers
   * and parameter servers.
   */
  scaleTier?:  | "BASIC" | "STANDARD_1" | "PREMIUM_1" | "BASIC_GPU" | "BASIC_TPU" | "CUSTOM";
  /**
   * Optional. Scheduling options for a training job.
   */
  scheduling?: GoogleCloudMlV1__Scheduling;
  /**
   * Optional. The email address of a service account to use when running the
   * training appplication. You must have the `iam.serviceAccounts.actAs`
   * permission for the specified service account. In addition, the AI Platform
   * Training Google-managed service account must have the
   * `roles/iam.serviceAccountAdmin` role for the specified service account.
   * [Learn more about configuring a service
   * account.](/ai-platform/training/docs/custom-service-account) If not
   * specified, the AI Platform Training Google-managed service account is used
   * by default.
   */
  serviceAccount?: string;
  /**
   * Optional. Use `chief` instead of `master` in the `TF_CONFIG` environment
   * variable when training with a custom container. Defaults to `false`. [Learn
   * more about this
   * field.](/ai-platform/training/docs/distributed-training-details#chief-versus-master)
   * This field has no effect for training jobs that don't use a custom
   * container.
   */
  useChiefInTfConfig?: boolean;
  /**
   * Optional. The configuration for workers. You should only set
   * `workerConfig.acceleratorConfig` if `workerType` is set to a Compute Engine
   * machine type. [Learn about restrictions on accelerator configurations for
   * training.](/ai-platform/training/docs/using-gpus#compute-engine-machine-types-with-gpu)
   * Set `workerConfig.imageUri` only if you build a custom image for your
   * worker. If `workerConfig.imageUri` has not been set, AI Platform uses the
   * value of `masterConfig.imageUri`. Learn more about [configuring custom
   * containers](/ai-platform/training/docs/distributed-training-containers).
   */
  workerConfig?: GoogleCloudMlV1__ReplicaConfig;
  /**
   * Optional. The number of worker replicas to use for the training job. Each
   * replica in the cluster will be of the type specified in `worker_type`. This
   * value can only be used when `scale_tier` is set to `CUSTOM`. If you set
   * this value, you must also set `worker_type`. The default value is zero.
   */
  workerCount?: bigint;
  /**
   * Optional. Specifies the type of virtual machine to use for your training
   * job's worker nodes. The supported values are the same as those described in
   * the entry for `masterType`. This value must be consistent with the category
   * of machine type that `masterType` uses. In other words, both must be
   * Compute Engine machine types or both must be legacy machine types. If you
   * use `cloud_tpu` for this value, see special instructions for [configuring a
   * custom TPU
   * machine](/ml-engine/docs/tensorflow/using-tpus#configuring_a_custom_tpu_machine).
   * This value must be present when `scaleTier` is set to `CUSTOM` and
   * `workerCount` is greater than zero.
   */
  workerType?: string;
}

function serializeGoogleCloudMlV1__TrainingInput(data: any): GoogleCloudMlV1__TrainingInput {
  return {
    ...data,
    evaluatorConfig: data["evaluatorConfig"] !== undefined ? serializeGoogleCloudMlV1__ReplicaConfig(data["evaluatorConfig"]) : undefined,
    evaluatorCount: data["evaluatorCount"] !== undefined ? String(data["evaluatorCount"]) : undefined,
    masterConfig: data["masterConfig"] !== undefined ? serializeGoogleCloudMlV1__ReplicaConfig(data["masterConfig"]) : undefined,
    parameterServerConfig: data["parameterServerConfig"] !== undefined ? serializeGoogleCloudMlV1__ReplicaConfig(data["parameterServerConfig"]) : undefined,
    parameterServerCount: data["parameterServerCount"] !== undefined ? String(data["parameterServerCount"]) : undefined,
    scheduling: data["scheduling"] !== undefined ? serializeGoogleCloudMlV1__Scheduling(data["scheduling"]) : undefined,
    workerConfig: data["workerConfig"] !== undefined ? serializeGoogleCloudMlV1__ReplicaConfig(data["workerConfig"]) : undefined,
    workerCount: data["workerCount"] !== undefined ? String(data["workerCount"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1__TrainingInput(data: any): GoogleCloudMlV1__TrainingInput {
  return {
    ...data,
    evaluatorConfig: data["evaluatorConfig"] !== undefined ? deserializeGoogleCloudMlV1__ReplicaConfig(data["evaluatorConfig"]) : undefined,
    evaluatorCount: data["evaluatorCount"] !== undefined ? BigInt(data["evaluatorCount"]) : undefined,
    masterConfig: data["masterConfig"] !== undefined ? deserializeGoogleCloudMlV1__ReplicaConfig(data["masterConfig"]) : undefined,
    parameterServerConfig: data["parameterServerConfig"] !== undefined ? deserializeGoogleCloudMlV1__ReplicaConfig(data["parameterServerConfig"]) : undefined,
    parameterServerCount: data["parameterServerCount"] !== undefined ? BigInt(data["parameterServerCount"]) : undefined,
    scheduling: data["scheduling"] !== undefined ? deserializeGoogleCloudMlV1__Scheduling(data["scheduling"]) : undefined,
    workerConfig: data["workerConfig"] !== undefined ? deserializeGoogleCloudMlV1__ReplicaConfig(data["workerConfig"]) : undefined,
    workerCount: data["workerCount"] !== undefined ? BigInt(data["workerCount"]) : undefined,
  };
}

/**
 * Represents results of a training job. Output only.
 */
export interface GoogleCloudMlV1__TrainingOutput {
  /**
   * Details related to built-in algorithms jobs. Only set for built-in
   * algorithms jobs.
   */
  builtInAlgorithmOutput?: GoogleCloudMlV1__BuiltInAlgorithmOutput;
  /**
   * The number of hyperparameter tuning trials that completed successfully.
   * Only set for hyperparameter tuning jobs.
   */
  completedTrialCount?: bigint;
  /**
   * The amount of ML units consumed by the job.
   */
  consumedMLUnits?: number;
  /**
   * The TensorFlow summary tag name used for optimizing hyperparameter tuning
   * trials. See
   * [`HyperparameterSpec.hyperparameterMetricTag`](#HyperparameterSpec.FIELDS.hyperparameter_metric_tag)
   * for more information. Only set for hyperparameter tuning jobs.
   */
  hyperparameterMetricTag?: string;
  /**
   * Whether this job is a built-in Algorithm job.
   */
  isBuiltInAlgorithmJob?: boolean;
  /**
   * Whether this job is a hyperparameter tuning job.
   */
  isHyperparameterTuningJob?: boolean;
  /**
   * Results for individual Hyperparameter trials. Only set for hyperparameter
   * tuning jobs.
   */
  trials?: GoogleCloudMlV1__HyperparameterOutput[];
  /**
   * Output only. URIs for accessing [interactive
   * shells](https://cloud.google.com/ai-platform/training/docs/monitor-debug-interactive-shell)
   * (one URI for each training node). Only available if
   * training_input.enable_web_access is `true`. The keys are names of each node
   * in the training job; for example, `master-replica-0` for the master node,
   * `worker-replica-0` for the first worker, and `ps-replica-0` for the first
   * parameter server. The values are the URIs for each node's interactive
   * shell.
   */
  readonly webAccessUris?: {
    [key: string]: string
  };
}

function serializeGoogleCloudMlV1__TrainingOutput(data: any): GoogleCloudMlV1__TrainingOutput {
  return {
    ...data,
    completedTrialCount: data["completedTrialCount"] !== undefined ? String(data["completedTrialCount"]) : undefined,
    trials: data["trials"] !== undefined ? data["trials"].map((item: any) => (serializeGoogleCloudMlV1__HyperparameterOutput(item))) : undefined,
  };
}

function deserializeGoogleCloudMlV1__TrainingOutput(data: any): GoogleCloudMlV1__TrainingOutput {
  return {
    ...data,
    completedTrialCount: data["completedTrialCount"] !== undefined ? BigInt(data["completedTrialCount"]) : undefined,
    trials: data["trials"] !== undefined ? data["trials"].map((item: any) => (deserializeGoogleCloudMlV1__HyperparameterOutput(item))) : undefined,
  };
}

/**
 * A message representing a trial.
 */
export interface GoogleCloudMlV1__Trial {
  /**
   * Output only. The identifier of the client that originally requested this
   * trial.
   */
  readonly clientId?: string;
  /**
   * Output only. Time at which the trial's status changed to COMPLETED.
   */
  readonly endTime?: Date;
  /**
   * The final measurement containing the objective value.
   */
  finalMeasurement?: GoogleCloudMlV1__Measurement;
  /**
   * Output only. A human readable string describing why the trial is
   * infeasible. This should only be set if trial_infeasible is true.
   */
  readonly infeasibleReason?: string;
  /**
   * A list of measurements that are strictly lexicographically ordered by
   * their induced tuples (steps, elapsed_time). These are used for early
   * stopping computations.
   */
  measurements?: GoogleCloudMlV1__Measurement[];
  /**
   * Output only. Name of the trial assigned by the service.
   */
  readonly name?: string;
  /**
   * The parameters of the trial.
   */
  parameters?: GoogleCloudMlV1_Trial_Parameter[];
  /**
   * Output only. Time at which the trial was started.
   */
  readonly startTime?: Date;
  /**
   * The detailed state of a trial.
   */
  state?:  | "STATE_UNSPECIFIED" | "REQUESTED" | "ACTIVE" | "COMPLETED" | "STOPPING";
  /**
   * Output only. If true, the parameters in this trial are not attempted
   * again.
   */
  readonly trialInfeasible?: boolean;
}

function serializeGoogleCloudMlV1__Trial(data: any): GoogleCloudMlV1__Trial {
  return {
    ...data,
    finalMeasurement: data["finalMeasurement"] !== undefined ? serializeGoogleCloudMlV1__Measurement(data["finalMeasurement"]) : undefined,
    measurements: data["measurements"] !== undefined ? data["measurements"].map((item: any) => (serializeGoogleCloudMlV1__Measurement(item))) : undefined,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (serializeGoogleCloudMlV1_Trial_Parameter(item))) : undefined,
  };
}

function deserializeGoogleCloudMlV1__Trial(data: any): GoogleCloudMlV1__Trial {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    finalMeasurement: data["finalMeasurement"] !== undefined ? deserializeGoogleCloudMlV1__Measurement(data["finalMeasurement"]) : undefined,
    measurements: data["measurements"] !== undefined ? data["measurements"].map((item: any) => (deserializeGoogleCloudMlV1__Measurement(item))) : undefined,
    parameters: data["parameters"] !== undefined ? data["parameters"].map((item: any) => (deserializeGoogleCloudMlV1_Trial_Parameter(item))) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Represents a version of the model. Each version is a trained model deployed
 * in the cloud, ready to handle prediction requests. A model can have multiple
 * versions. You can get information about all of the versions of a given model
 * by calling projects.models.versions.list.
 */
export interface GoogleCloudMlV1__Version {
  /**
   * Optional. Accelerator config for using GPUs for online prediction (beta).
   * Only specify this field if you have specified a Compute Engine (N1) machine
   * type in the `machineType` field. Learn more about [using GPUs for online
   * prediction](/ml-engine/docs/machine-types-online-prediction#gpus).
   */
  acceleratorConfig?: GoogleCloudMlV1__AcceleratorConfig;
  /**
   * Automatically scale the number of nodes used to serve the model in
   * response to increases and decreases in traffic. Care should be taken to
   * ramp up traffic according to the model's ability to scale or you will start
   * seeing increases in latency and 429 response codes.
   */
  autoScaling?: GoogleCloudMlV1__AutoScaling;
  /**
   * Optional. Specifies a custom container to use for serving predictions. If
   * you specify this field, then `machineType` is required. If you specify this
   * field, then `deploymentUri` is optional. If you specify this field, then
   * you must not specify `runtimeVersion`, `packageUris`, `framework`,
   * `pythonVersion`, or `predictionClass`.
   */
  container?: GoogleCloudMlV1__ContainerSpec;
  /**
   * Output only. The time the version was created.
   */
  createTime?: Date;
  /**
   * The Cloud Storage URI of a directory containing trained model artifacts to
   * be used to create the model version. See the [guide to deploying
   * models](/ai-platform/prediction/docs/deploying-models) for more
   * information. The total number of files under this directory must not exceed
   * 1000. During projects.models.versions.create, AI Platform Prediction copies
   * all files from the specified directory to a location managed by the
   * service. From then on, AI Platform Prediction uses these copies of the
   * model artifacts to serve predictions, not the original files in Cloud
   * Storage, so this location is useful only as a historical record. If you
   * specify container, then this field is optional. Otherwise, it is required.
   * Learn [how to use this field with a custom
   * container](/ai-platform/prediction/docs/custom-container-requirements#artifacts).
   */
  deploymentUri?: string;
  /**
   * Optional. The description specified for the version when it was created.
   */
  description?: string;
  /**
   * Output only. The details of a failure or a cancellation.
   */
  errorMessage?: string;
  /**
   * `etag` is used for optimistic concurrency control as a way to help prevent
   * simultaneous updates of a model from overwriting each other. It is strongly
   * suggested that systems make use of the `etag` in the read-modify-write
   * cycle to perform model updates in order to avoid race conditions: An `etag`
   * is returned in the response to `GetVersion`, and systems are expected to
   * put that etag in the request to `UpdateVersion` to ensure that their change
   * will be applied to the model as intended.
   */
  etag?: Uint8Array;
  /**
   * Optional. Configures explainability features on the model's version. Some
   * explanation features require additional metadata to be loaded as part of
   * the model payload.
   */
  explanationConfig?: GoogleCloudMlV1__ExplanationConfig;
  /**
   * Optional. The machine learning framework AI Platform uses to train this
   * version of the model. Valid values are `TENSORFLOW`, `SCIKIT_LEARN`,
   * `XGBOOST`. If you do not specify a framework, AI Platform will analyze
   * files in the deployment_uri to determine a framework. If you choose
   * `SCIKIT_LEARN` or `XGBOOST`, you must also set the runtime version of the
   * model to 1.4 or greater. Do **not** specify a framework if you're deploying
   * a [custom prediction
   * routine](/ai-platform/prediction/docs/custom-prediction-routines) or if
   * you're using a [custom
   * container](/ai-platform/prediction/docs/use-custom-container).
   */
  framework?:  | "FRAMEWORK_UNSPECIFIED" | "TENSORFLOW" | "SCIKIT_LEARN" | "XGBOOST";
  /**
   * Output only. If true, this version will be used to handle prediction
   * requests that do not specify a version. You can change the default version
   * by calling projects.methods.versions.setDefault.
   */
  isDefault?: boolean;
  /**
   * Optional. One or more labels that you can add, to organize your model
   * versions. Each label is a key-value pair, where both the key and the value
   * are arbitrary strings that you supply. For more information, see the
   * documentation on using labels. Note that this field is not updatable for
   * mls1* models.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The [AI Platform (Unified)
   * `Model`](https://cloud.google.com/ai-platform-unified/docs/reference/rest/v1beta1/projects.locations.models)
   * ID for the last [model
   * migration](https://cloud.google.com/ai-platform-unified/docs/start/migrating-to-ai-platform-unified).
   */
  readonly lastMigrationModelId?: string;
  /**
   * Output only. The last time this version was successfully [migrated to AI
   * Platform
   * (Unified)](https://cloud.google.com/ai-platform-unified/docs/start/migrating-to-ai-platform-unified).
   */
  readonly lastMigrationTime?: Date;
  /**
   * Output only. The time the version was last used for prediction.
   */
  lastUseTime?: Date;
  /**
   * Optional. The type of machine on which to serve the model. Currently only
   * applies to online prediction service. To learn about valid values for this
   * field, read [Choosing a machine type for online
   * prediction](/ai-platform/prediction/docs/machine-types-online-prediction).
   * If this field is not specified and you are using a [regional
   * endpoint](/ai-platform/prediction/docs/regional-endpoints), then the
   * machine type defaults to `n1-standard-2`. If this field is not specified
   * and you are using the global endpoint (`ml.googleapis.com`), then the
   * machine type defaults to `mls1-c1-m2`.
   */
  machineType?: string;
  /**
   * Manually select the number of nodes to use for serving the model. You
   * should generally use `auto_scaling` with an appropriate `min_nodes`
   * instead, but this option is available if you want more predictable billing.
   * Beware that latency and error rates will increase if the traffic exceeds
   * that capability of the system to serve it based on the selected number of
   * nodes.
   */
  manualScaling?: GoogleCloudMlV1__ManualScaling;
  /**
   * Required. The name specified for the version when it was created. The
   * version name must be unique within the model it is created in.
   */
  name?: string;
  /**
   * Optional. Cloud Storage paths (`gs://…`) of packages for [custom
   * prediction routines](/ml-engine/docs/tensorflow/custom-prediction-routines)
   * or [scikit-learn pipelines with custom
   * code](/ml-engine/docs/scikit/exporting-for-prediction#custom-pipeline-code).
   * For a custom prediction routine, one of these packages must contain your
   * Predictor class (see
   * [`predictionClass`](#Version.FIELDS.prediction_class)). Additionally,
   * include any dependencies used by your Predictor or scikit-learn pipeline
   * uses that are not already included in your selected [runtime
   * version](/ml-engine/docs/tensorflow/runtime-version-list). If you specify
   * this field, you must also set
   * [`runtimeVersion`](#Version.FIELDS.runtime_version) to 1.4 or greater.
   */
  packageUris?: string[];
  /**
   * Optional. The fully qualified name (module_name.class_name) of a class
   * that implements the Predictor interface described in this reference field.
   * The module containing this class should be included in a package provided
   * to the [`packageUris` field](#Version.FIELDS.package_uris). Specify this
   * field if and only if you are deploying a [custom prediction routine
   * (beta)](/ml-engine/docs/tensorflow/custom-prediction-routines). If you
   * specify this field, you must set
   * [`runtimeVersion`](#Version.FIELDS.runtime_version) to 1.4 or greater and
   * you must set `machineType` to a [legacy (MLS1) machine
   * type](/ml-engine/docs/machine-types-online-prediction). The following code
   * sample provides the Predictor interface: class Predictor(object):
   * """Interface for constructing custom predictors.""" def predict(self,
   * instances, **kwargs): """Performs custom prediction. Instances are the
   * decoded values from the request. They have already been deserialized from
   * JSON. Args: instances: A list of prediction input instances. **kwargs: A
   * dictionary of keyword args provided as additional fields on the predict
   * request body. Returns: A list of outputs containing the prediction results.
   * This list must be JSON serializable. """ raise NotImplementedError()
   * @classmethod def from_path(cls, model_dir): """Creates an instance of
   * Predictor using the given path. Loading of the predictor should be done in
   * this method. Args: model_dir: The local directory that contains the
   * exported model file along with any additional files uploaded when creating
   * the version resource. Returns: An instance implementing this Predictor
   * class. """ raise NotImplementedError() Learn more about [the Predictor
   * interface and custom prediction
   * routines](/ml-engine/docs/tensorflow/custom-prediction-routines).
   */
  predictionClass?: string;
  /**
   * Required. The version of Python used in prediction. The following Python
   * versions are available: * Python '3.7' is available when `runtime_version`
   * is set to '1.15' or later. * Python '3.5' is available when
   * `runtime_version` is set to a version from '1.4' to '1.14'. * Python '2.7'
   * is available when `runtime_version` is set to '1.15' or earlier. Read more
   * about the Python versions available for [each runtime
   * version](/ml-engine/docs/runtime-version-list).
   */
  pythonVersion?: string;
  /**
   * Optional. *Only* specify this field in a projects.models.versions.patch
   * request. Specifying it in a projects.models.versions.create request has no
   * effect. Configures the request-response pair logging on predictions from
   * this Version.
   */
  requestLoggingConfig?: GoogleCloudMlV1__RequestLoggingConfig;
  /**
   * Optional. Specifies paths on a custom container's HTTP server where AI
   * Platform Prediction sends certain requests. If you specify this field, then
   * you must also specify the `container` field. If you specify the `container`
   * field and do not specify this field, it defaults to the following: ```json
   * { "predict": "/v1/models/MODEL/versions/VERSION:predict", "health":
   * "/v1/models/MODEL/versions/VERSION" } ``` See RouteMap for more details
   * about these default values.
   */
  routes?: GoogleCloudMlV1__RouteMap;
  /**
   * Required. The AI Platform runtime version to use for this deployment. For
   * more information, see the [runtime version
   * list](/ml-engine/docs/runtime-version-list) and [how to manage runtime
   * versions](/ml-engine/docs/versioning).
   */
  runtimeVersion?: string;
  /**
   * Optional. Specifies the service account for resource access control. If
   * you specify this field, then you must also specify either the
   * `containerSpec` or the `predictionClass` field. Learn more about [using a
   * custom service
   * account](/ai-platform/prediction/docs/custom-service-account).
   */
  serviceAccount?: string;
  /**
   * Output only. The state of a version.
   */
  state?:  | "UNKNOWN" | "READY" | "CREATING" | "FAILED" | "DELETING" | "UPDATING";
}

function serializeGoogleCloudMlV1__Version(data: any): GoogleCloudMlV1__Version {
  return {
    ...data,
    acceleratorConfig: data["acceleratorConfig"] !== undefined ? serializeGoogleCloudMlV1__AcceleratorConfig(data["acceleratorConfig"]) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
    lastUseTime: data["lastUseTime"] !== undefined ? data["lastUseTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudMlV1__Version(data: any): GoogleCloudMlV1__Version {
  return {
    ...data,
    acceleratorConfig: data["acceleratorConfig"] !== undefined ? deserializeGoogleCloudMlV1__AcceleratorConfig(data["acceleratorConfig"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
    lastMigrationTime: data["lastMigrationTime"] !== undefined ? new Date(data["lastMigrationTime"]) : undefined,
    lastUseTime: data["lastUseTime"] !== undefined ? new Date(data["lastUseTime"]) : undefined,
  };
}

/**
 * Attributes credit by computing the XRAI taking advantage of the model's
 * fully differentiable structure. Refer to this paper for more details:
 * https://arxiv.org/abs/1906.02825 Currently only implemented for models with
 * natural image inputs.
 */
export interface GoogleCloudMlV1__XraiAttribution {
  /**
   * Number of steps for approximating the path integral. A good value to start
   * is 50 and gradually increase until the sum to diff property is met within
   * the desired error range.
   */
  numIntegralSteps?: number;
}

export interface GoogleCloudMlV1_AutomatedStoppingConfig_DecayCurveAutomatedStoppingConfig {
  /**
   * If true, measurement.elapsed_time is used as the x-axis of each Trials
   * Decay Curve. Otherwise, Measurement.steps will be used as the x-axis.
   */
  useElapsedTime?: boolean;
}

/**
 * The median automated stopping rule stops a pending trial if the trial's best
 * objective_value is strictly below the median 'performance' of all completed
 * trials reported up to the trial's last measurement. Currently, 'performance'
 * refers to the running average of the objective values reported by the trial
 * in each measurement.
 */
export interface GoogleCloudMlV1_AutomatedStoppingConfig_MedianAutomatedStoppingConfig {
  /**
   * If true, the median automated stopping rule applies to
   * measurement.use_elapsed_time, which means the elapsed_time field of the
   * current trial's latest measurement is used to compute the median objective
   * value for each completed trial.
   */
  useElapsedTime?: boolean;
}

/**
 * An observed value of a metric.
 */
export interface GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric {
  /**
   * The objective value at this training step.
   */
  objectiveValue?: number;
  /**
   * The global training step for this metric.
   */
  trainingStep?: bigint;
}

function serializeGoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric(data: any): GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric {
  return {
    ...data,
    trainingStep: data["trainingStep"] !== undefined ? String(data["trainingStep"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric(data: any): GoogleCloudMlV1_HyperparameterOutput_HyperparameterMetric {
  return {
    ...data,
    trainingStep: data["trainingStep"] !== undefined ? BigInt(data["trainingStep"]) : undefined,
  };
}

/**
 * A message representing a metric in the measurement.
 */
export interface GoogleCloudMlV1_Measurement_Metric {
  /**
   * Required. Metric name.
   */
  metric?: string;
  /**
   * Required. The value for this metric.
   */
  value?: number;
}

/**
 * Represents a metric to optimize.
 */
export interface GoogleCloudMlV1_StudyConfig_MetricSpec {
  /**
   * Required. The optimization goal of the metric.
   */
  goal?:  | "GOAL_TYPE_UNSPECIFIED" | "MAXIMIZE" | "MINIMIZE";
  /**
   * Required. The name of the metric.
   */
  metric?: string;
}

/**
 * Represents a single parameter to optimize.
 */
export interface GoogleCloudMlV1_StudyConfig_ParameterSpec {
  /**
   * The value spec for a 'CATEGORICAL' parameter.
   */
  categoricalValueSpec?: GoogleCloudMlV1_StudyConfigParameterSpec_CategoricalValueSpec;
  /**
   * A child node is active if the parameter's value matches the child node's
   * matching_parent_values. If two items in child_parameter_specs have the same
   * name, they must have disjoint matching_parent_values.
   */
  childParameterSpecs?: GoogleCloudMlV1_StudyConfig_ParameterSpec[];
  /**
   * The value spec for a 'DISCRETE' parameter.
   */
  discreteValueSpec?: GoogleCloudMlV1_StudyConfigParameterSpec_DiscreteValueSpec;
  /**
   * The value spec for a 'DOUBLE' parameter.
   */
  doubleValueSpec?: GoogleCloudMlV1_StudyConfigParameterSpec_DoubleValueSpec;
  /**
   * The value spec for an 'INTEGER' parameter.
   */
  integerValueSpec?: GoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec;
  /**
   * Required. The parameter name must be unique amongst all ParameterSpecs.
   */
  parameter?: string;
  parentCategoricalValues?: GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentCategoricalValueSpec;
  parentDiscreteValues?: GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentDiscreteValueSpec;
  parentIntValues?: GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec;
  /**
   * How the parameter should be scaled. Leave unset for categorical
   * parameters.
   */
  scaleType?:  | "SCALE_TYPE_UNSPECIFIED" | "UNIT_LINEAR_SCALE" | "UNIT_LOG_SCALE" | "UNIT_REVERSE_LOG_SCALE";
  /**
   * Required. The type of the parameter.
   */
  type?:  | "PARAMETER_TYPE_UNSPECIFIED" | "DOUBLE" | "INTEGER" | "CATEGORICAL" | "DISCRETE";
}

function serializeGoogleCloudMlV1_StudyConfig_ParameterSpec(data: any): GoogleCloudMlV1_StudyConfig_ParameterSpec {
  return {
    ...data,
    childParameterSpecs: data["childParameterSpecs"] !== undefined ? data["childParameterSpecs"].map((item: any) => (serializeGoogleCloudMlV1_StudyConfig_ParameterSpec(item))) : undefined,
    integerValueSpec: data["integerValueSpec"] !== undefined ? serializeGoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec(data["integerValueSpec"]) : undefined,
    parentIntValues: data["parentIntValues"] !== undefined ? serializeGoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec(data["parentIntValues"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1_StudyConfig_ParameterSpec(data: any): GoogleCloudMlV1_StudyConfig_ParameterSpec {
  return {
    ...data,
    childParameterSpecs: data["childParameterSpecs"] !== undefined ? data["childParameterSpecs"].map((item: any) => (deserializeGoogleCloudMlV1_StudyConfig_ParameterSpec(item))) : undefined,
    integerValueSpec: data["integerValueSpec"] !== undefined ? deserializeGoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec(data["integerValueSpec"]) : undefined,
    parentIntValues: data["parentIntValues"] !== undefined ? deserializeGoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec(data["parentIntValues"]) : undefined,
  };
}

export interface GoogleCloudMlV1_StudyConfigParameterSpec_CategoricalValueSpec {
  /**
   * Must be specified if type is `CATEGORICAL`. The list of possible
   * categories.
   */
  values?: string[];
}

export interface GoogleCloudMlV1_StudyConfigParameterSpec_DiscreteValueSpec {
  /**
   * Must be specified if type is `DISCRETE`. A list of feasible points. The
   * list should be in strictly increasing order. For instance, this parameter
   * might have possible settings of 1.5, 2.5, and 4.0. This list should not
   * contain more than 1,000 values.
   */
  values?: number[];
}

export interface GoogleCloudMlV1_StudyConfigParameterSpec_DoubleValueSpec {
  /**
   * Must be specified if type is `DOUBLE`. Maximum value of the parameter.
   */
  maxValue?: number;
  /**
   * Must be specified if type is `DOUBLE`. Minimum value of the parameter.
   */
  minValue?: number;
}

export interface GoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec {
  /**
   * Must be specified if type is `INTEGER`. Maximum value of the parameter.
   */
  maxValue?: bigint;
  /**
   * Must be specified if type is `INTEGER`. Minimum value of the parameter.
   */
  minValue?: bigint;
}

function serializeGoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec(data: any): GoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec {
  return {
    ...data,
    maxValue: data["maxValue"] !== undefined ? String(data["maxValue"]) : undefined,
    minValue: data["minValue"] !== undefined ? String(data["minValue"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec(data: any): GoogleCloudMlV1_StudyConfigParameterSpec_IntegerValueSpec {
  return {
    ...data,
    maxValue: data["maxValue"] !== undefined ? BigInt(data["maxValue"]) : undefined,
    minValue: data["minValue"] !== undefined ? BigInt(data["minValue"]) : undefined,
  };
}

/**
 * Represents the spec to match categorical values from parent parameter.
 */
export interface GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentCategoricalValueSpec {
  /**
   * Matches values of the parent parameter with type 'CATEGORICAL'. All values
   * must exist in `categorical_value_spec` of parent parameter.
   */
  values?: string[];
}

/**
 * Represents the spec to match discrete values from parent parameter.
 */
export interface GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentDiscreteValueSpec {
  /**
   * Matches values of the parent parameter with type 'DISCRETE'. All values
   * must exist in `discrete_value_spec` of parent parameter.
   */
  values?: number[];
}

/**
 * Represents the spec to match integer values from parent parameter.
 */
export interface GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec {
  /**
   * Matches values of the parent parameter with type 'INTEGER'. All values
   * must lie in `integer_value_spec` of parent parameter.
   */
  values?: bigint[];
}

function serializeGoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec(data: any): GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeGoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec(data: any): GoogleCloudMlV1_StudyConfigParameterSpec_MatchingParentIntValueSpec {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * A message representing a parameter to be tuned. Contains the name of the
 * parameter and the suggested value to use for this trial.
 */
export interface GoogleCloudMlV1_Trial_Parameter {
  /**
   * Must be set if ParameterType is DOUBLE or DISCRETE.
   */
  floatValue?: number;
  /**
   * Must be set if ParameterType is INTEGER
   */
  intValue?: bigint;
  /**
   * The name of the parameter.
   */
  parameter?: string;
  /**
   * Must be set if ParameterTypeis CATEGORICAL
   */
  stringValue?: string;
}

function serializeGoogleCloudMlV1_Trial_Parameter(data: any): GoogleCloudMlV1_Trial_Parameter {
  return {
    ...data,
    intValue: data["intValue"] !== undefined ? String(data["intValue"]) : undefined,
  };
}

function deserializeGoogleCloudMlV1_Trial_Parameter(data: any): GoogleCloudMlV1_Trial_Parameter {
  return {
    ...data,
    intValue: data["intValue"] !== undefined ? BigInt(data["intValue"]) : undefined,
  };
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
export interface GoogleIamV1__AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: GoogleIamV1__AuditLogConfig[];
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
export interface GoogleIamV1__AuditLogConfig {
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
export interface GoogleIamV1__Binding {
  /**
   * The condition that is associated with this binding. If the condition
   * evaluates to `true`, then this binding applies to the current request. If
   * the condition evaluates to `false`, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding. To learn which
   * resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: GoogleType__Expr;
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
export interface GoogleIamV1__Policy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: GoogleIamV1__AuditConfig[];
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
  bindings?: GoogleIamV1__Binding[];
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

function serializeGoogleIamV1__Policy(data: any): GoogleIamV1__Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializeGoogleIamV1__Policy(data: any): GoogleIamV1__Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * Request message for `SetIamPolicy` method.
 */
export interface GoogleIamV1__SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: GoogleIamV1__Policy;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify.
   * Only the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used: `paths: "bindings, etag"`
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleIamV1__SetIamPolicyRequest(data: any): GoogleIamV1__SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeGoogleIamV1__Policy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleIamV1__SetIamPolicyRequest(data: any): GoogleIamV1__SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializeGoogleIamV1__Policy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request message for `TestIamPermissions` method.
 */
export interface GoogleIamV1__TestIamPermissionsRequest {
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
export interface GoogleIamV1__TestIamPermissionsResponse {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
   */
  permissions?: string[];
}

/**
 * The response message for Operations.ListOperations.
 */
export interface GoogleLongrunning__ListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: GoogleLongrunning__Operation[];
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface GoogleLongrunning__Operation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: GoogleRpc__Status;
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
export interface GoogleProtobuf__Empty {
}

/**
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
 */
export interface GoogleRpc__Status {
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
export interface GoogleType__Expr {
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
 * Additional options for ml#projectsJobsGetIamPolicy.
 */
export interface ProjectsJobsGetIamPolicyOptions {
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
 * Additional options for ml#projectsJobsList.
 */
export interface ProjectsJobsListOptions {
  /**
   * Optional. Specifies the subset of jobs to retrieve. You can filter on the
   * value of one or more attributes of the job object. For example, retrieve
   * jobs with a job identifier that starts with 'census': gcloud ai-platform
   * jobs list --filter='jobId:census*' List all failed jobs with names that
   * start with 'rnn': gcloud ai-platform jobs list --filter='jobId:rnn* AND
   * state:FAILED' For more examples, see the guide to monitoring jobs.
   */
  filter?: string;
  /**
   * Optional. The number of jobs to retrieve per "page" of results. If there
   * are more remaining results than this number, the response message will
   * contain a valid value in the `next_page_token` field. The default value is
   * 20, and the maximum page size is 100.
   */
  pageSize?: number;
  /**
   * Optional. A page token to request the next page of results. You get the
   * token from the `next_page_token` field of the response from the previous
   * call.
   */
  pageToken?: string;
}

/**
 * Additional options for ml#projectsJobsPatch.
 */
export interface ProjectsJobsPatchOptions {
  /**
   * Required. Specifies the path, relative to `Job`, of the field to update.
   * To adopt etag mechanism, include `etag` field in the mask, and include the
   * `etag` value in your job resource. For example, to change the labels of a
   * job, the `update_mask` parameter would be specified as `labels`, `etag`,
   * and the `PATCH` request body would specify the new value, as follows: {
   * "labels": { "owner": "Google", "color": "Blue" } "etag":
   * "33a64df551425fcc55e4d42a148795d9f25f89d4" } If `etag` matches the one on
   * the server, the labels of the job will be replaced with the given ones, and
   * the server end `etag` will be recalculated. Currently the only supported
   * update masks are `labels` and `etag`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsJobsPatchOptions(data: any): ProjectsJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsJobsPatchOptions(data: any): ProjectsJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for ml#projectsLocationsList.
 */
export interface ProjectsLocationsListOptions {
  /**
   * Optional. The number of locations to retrieve per "page" of results. If
   * there are more remaining results than this number, the response message
   * will contain a valid value in the `next_page_token` field. The default
   * value is 20, and the maximum page size is 100.
   */
  pageSize?: number;
  /**
   * Optional. A page token to request the next page of results. You get the
   * token from the `next_page_token` field of the response from the previous
   * call.
   */
  pageToken?: string;
}

/**
 * Additional options for ml#projectsLocationsStudiesCreate.
 */
export interface ProjectsLocationsStudiesCreateOptions {
  /**
   * Required. The ID to use for the study, which will become the final
   * component of the study's resource name.
   */
  studyId?: string;
}

/**
 * Additional options for ml#projectsModelsGetIamPolicy.
 */
export interface ProjectsModelsGetIamPolicyOptions {
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
 * Additional options for ml#projectsModelsList.
 */
export interface ProjectsModelsListOptions {
  /**
   * Optional. Specifies the subset of models to retrieve.
   */
  filter?: string;
  /**
   * Optional. The number of models to retrieve per "page" of results. If there
   * are more remaining results than this number, the response message will
   * contain a valid value in the `next_page_token` field. The default value is
   * 20, and the maximum page size is 100.
   */
  pageSize?: number;
  /**
   * Optional. A page token to request the next page of results. You get the
   * token from the `next_page_token` field of the response from the previous
   * call.
   */
  pageToken?: string;
}

/**
 * Additional options for ml#projectsModelsPatch.
 */
export interface ProjectsModelsPatchOptions {
  /**
   * Required. Specifies the path, relative to `Model`, of the field to update.
   * For example, to change the description of a model to "foo" and set its
   * default version to "version_1", the `update_mask` parameter would be
   * specified as `description`, `default_version.name`, and the `PATCH` request
   * body would specify the new value, as follows: { "description": "foo",
   * "defaultVersion": { "name":"version_1" } } Currently the supported update
   * masks are `description` and `default_version.name`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsModelsPatchOptions(data: any): ProjectsModelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsModelsPatchOptions(data: any): ProjectsModelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for ml#projectsModelsVersionsList.
 */
export interface ProjectsModelsVersionsListOptions {
  /**
   * Optional. Specifies the subset of versions to retrieve.
   */
  filter?: string;
  /**
   * Optional. The number of versions to retrieve per "page" of results. If
   * there are more remaining results than this number, the response message
   * will contain a valid value in the `next_page_token` field. The default
   * value is 20, and the maximum page size is 100.
   */
  pageSize?: number;
  /**
   * Optional. A page token to request the next page of results. You get the
   * token from the `next_page_token` field of the response from the previous
   * call.
   */
  pageToken?: string;
}

/**
 * Additional options for ml#projectsModelsVersionsPatch.
 */
export interface ProjectsModelsVersionsPatchOptions {
  /**
   * Required. Specifies the path, relative to `Version`, of the field to
   * update. Must be present and non-empty. For example, to change the
   * description of a version to "foo", the `update_mask` parameter would be
   * specified as `description`, and the `PATCH` request body would specify the
   * new value, as follows: ``` { "description": "foo" } ``` Currently the only
   * supported update mask fields are `description`, `requestLoggingConfig`,
   * `autoScaling.minNodes`, and `manualScaling.nodes`. However, you can only
   * update `manualScaling.nodes` if the version uses a [Compute Engine (N1)
   * machine type](/ml-engine/docs/machine-types-online-prediction).
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsModelsVersionsPatchOptions(data: any): ProjectsModelsVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsModelsVersionsPatchOptions(data: any): ProjectsModelsVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for ml#projectsOperationsList.
 */
export interface ProjectsOperationsListOptions {
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
