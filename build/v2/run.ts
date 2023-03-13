// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Run Admin API Client for Deno
 * ===================================
 * 
 * Deploy and manage user provided container images that scale automatically based on incoming requests. The Cloud Run Admin API v1 follows the Knative Serving API specification, while v2 is aligned with Google Cloud AIP-based API standards, as described in https://google.aip.dev/.
 * 
 * Docs: https://cloud.google.com/run/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Deploy and manage user provided container images that scale automatically
 * based on incoming requests. The Cloud Run Admin API v1 follows the Knative
 * Serving API specification, while v2 is aligned with Google Cloud AIP-based
 * API standards, as described in https://google.aip.dev/.
 */
export class Run {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://run.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a Job.
   *
   * @param parent Required. The location and project in which this Job should be created. Format: projects/{project}/locations/{location}, where {project} can be project id or number.
   */
  async projectsLocationsJobsCreate(parent: string, req: GoogleCloudRunV2Job, opts: ProjectsLocationsJobsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudRunV2Job(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/jobs`);
    if (opts.jobId !== undefined) {
      url.searchParams.append("jobId", String(opts.jobId));
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a Job.
   *
   * @param name Required. The full name of the Job. Format: projects/{project}/locations/{location}/jobs/{job}, where {project} can be project id or number.
   */
  async projectsLocationsJobsDelete(name: string, opts: ProjectsLocationsJobsDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an Execution.
   *
   * @param name Required. The name of the Execution to delete. Format: projects/{project}/locations/{location}/jobs/{job}/executions/{execution}, where {project} can be project id or number.
   */
  async projectsLocationsJobsExecutionsDelete(name: string, opts: ProjectsLocationsJobsExecutionsDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets information about an Execution.
   *
   * @param name Required. The full name of the Execution. Format: projects/{project}/locations/{location}/jobs/{job}/executions/{execution}, where {project} can be project id or number.
   */
  async projectsLocationsJobsExecutionsGet(name: string): Promise<GoogleCloudRunV2Execution> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudRunV2Execution;
  }

  /**
   * Lists Executions from a Job.
   *
   * @param parent Required. The Execution from which the Executions should be listed. To list all Executions across Jobs, use "-" instead of Job name. Format: projects/{project}/locations/{location}/jobs/{job}, where {project} can be project id or number.
   */
  async projectsLocationsJobsExecutionsList(parent: string, opts: ProjectsLocationsJobsExecutionsListOptions = {}): Promise<GoogleCloudRunV2ListExecutionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/executions`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudRunV2ListExecutionsResponse;
  }

  /**
   * Gets information about a Task.
   *
   * @param name Required. The full name of the Task. Format: projects/{project}/locations/{location}/jobs/{job}/executions/{execution}/tasks/{task}
   */
  async projectsLocationsJobsExecutionsTasksGet(name: string): Promise<GoogleCloudRunV2Task> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRunV2Task(data);
  }

  /**
   * Lists Tasks from an Execution of a Job.
   *
   * @param parent Required. The Execution from which the Tasks should be listed. To list all Tasks across Executions of a Job, use "-" instead of Execution name. To list all Tasks across Jobs, use "-" instead of Job name. Format: projects/{project}/locations/{location}/jobs/{job}/executions/{execution}
   */
  async projectsLocationsJobsExecutionsTasksList(parent: string, opts: ProjectsLocationsJobsExecutionsTasksListOptions = {}): Promise<GoogleCloudRunV2ListTasksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/tasks`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRunV2ListTasksResponse(data);
  }

  /**
   * Gets information about a Job.
   *
   * @param name Required. The full name of the Job. Format: projects/{project}/locations/{location}/jobs/{job}, where {project} can be project id or number.
   */
  async projectsLocationsJobsGet(name: string): Promise<GoogleCloudRunV2Job> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRunV2Job(data);
  }

  /**
   * Gets the IAM Access Control policy currently in effect for the given Job.
   * This result does not include any inherited policies.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsJobsGetIamPolicy(resource: string, opts: ProjectsLocationsJobsGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists Jobs.
   *
   * @param parent Required. The location and project to list resources on. Format: projects/{project}/locations/{location}, where {project} can be project id or number.
   */
  async projectsLocationsJobsList(parent: string, opts: ProjectsLocationsJobsListOptions = {}): Promise<GoogleCloudRunV2ListJobsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/jobs`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRunV2ListJobsResponse(data);
  }

  /**
   * Updates a Job.
   *
   * @param name The fully qualified name of this Job. Format: projects/{project}/locations/{location}/jobs/{job}
   */
  async projectsLocationsJobsPatch(name: string, req: GoogleCloudRunV2Job, opts: ProjectsLocationsJobsPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudRunV2Job(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Triggers creation of a new Execution of this Job.
   *
   * @param name Required. The full name of the Job. Format: projects/{project}/locations/{location}/jobs/{job}, where {project} can be project id or number.
   */
  async projectsLocationsJobsRun(name: string, req: GoogleCloudRunV2RunJobRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:run`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Sets the IAM Access control policy for the specified Job. Overwrites any
   * existing policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsJobsSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Returns permissions that a caller has on the specified Project. There are
   * no permissions required for making this API call.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsJobsTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async projectsLocationsOperationsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name Required. To query for all of the operations for a project.
   */
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/operations`);
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
    return data as GoogleLongrunningListOperationsResponse;
  }

  /**
   * Waits until the specified long-running operation is done or reaches at
   * most a specified timeout, returning the latest state. If the operation is
   * already done, the latest state is immediately returned. If the timeout
   * specified is greater than the default HTTP/RPC timeout, the HTTP/RPC
   * timeout is used. If the server does not support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort
   * basis. It may return the latest state before the specified timeout
   * (including immediately), meaning even an immediate response is no guarantee
   * that the operation is done.
   *
   * @param name The name of the operation resource to wait on.
   */
  async projectsLocationsOperationsWait(name: string, req: GoogleLongrunningWaitOperationRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleLongrunningWaitOperationRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }:wait`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Creates a new Service in a given project and location.
   *
   * @param parent Required. The location and project in which this service should be created. Format: projects/{project}/locations/{location}, where {project} can be project id or number. Only lowercase characters, digits, and hyphens.
   */
  async projectsLocationsServicesCreate(parent: string, req: GoogleCloudRunV2Service, opts: ProjectsLocationsServicesCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudRunV2Service(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/services`);
    if (opts.serviceId !== undefined) {
      url.searchParams.append("serviceId", String(opts.serviceId));
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a Service. This will cause the Service to stop serving traffic and
   * will delete all revisions.
   *
   * @param name Required. The full name of the Service. Format: projects/{project}/locations/{location}/services/{service}, where {project} can be project id or number.
   */
  async projectsLocationsServicesDelete(name: string, opts: ProjectsLocationsServicesDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets information about a Service.
   *
   * @param name Required. The full name of the Service. Format: projects/{project}/locations/{location}/services/{service}, where {project} can be project id or number.
   */
  async projectsLocationsServicesGet(name: string): Promise<GoogleCloudRunV2Service> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRunV2Service(data);
  }

  /**
   * Gets the IAM Access Control policy currently in effect for the given Cloud
   * Run Service. This result does not include any inherited policies.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServicesGetIamPolicy(resource: string, opts: ProjectsLocationsServicesGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists Services.
   *
   * @param parent Required. The location and project to list resources on. Location must be a valid Google Cloud region, and cannot be the "-" wildcard. Format: projects/{project}/locations/{location}, where {project} can be project id or number.
   */
  async projectsLocationsServicesList(parent: string, opts: ProjectsLocationsServicesListOptions = {}): Promise<GoogleCloudRunV2ListServicesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/services`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRunV2ListServicesResponse(data);
  }

  /**
   * Updates a Service.
   *
   * @param name The fully qualified name of this Service. In CreateServiceRequest, this field is ignored, and instead composed from CreateServiceRequest.parent and CreateServiceRequest.service_id. Format: projects/{project}/locations/{location}/services/{service_id}
   */
  async projectsLocationsServicesPatch(name: string, req: GoogleCloudRunV2Service, opts: ProjectsLocationsServicesPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudRunV2Service(req);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a Revision.
   *
   * @param name Required. The name of the Revision to delete. Format: projects/{project}/locations/{location}/services/{service}/revisions/{revision}
   */
  async projectsLocationsServicesRevisionsDelete(name: string, opts: ProjectsLocationsServicesRevisionsDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
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
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets information about a Revision.
   *
   * @param name Required. The full name of the Revision. Format: projects/{project}/locations/{location}/services/{service}/revisions/{revision}
   */
  async projectsLocationsServicesRevisionsGet(name: string): Promise<GoogleCloudRunV2Revision> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRunV2Revision(data);
  }

  /**
   * Lists Revisions from a given Service, or from a given location.
   *
   * @param parent Required. The Service from which the Revisions should be listed. To list all Revisions across Services, use "-" instead of Service name. Format: projects/{project}/locations/{location}/services/{service}
   */
  async projectsLocationsServicesRevisionsList(parent: string, opts: ProjectsLocationsServicesRevisionsListOptions = {}): Promise<GoogleCloudRunV2ListRevisionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/revisions`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.showDeleted !== undefined) {
      url.searchParams.append("showDeleted", String(opts.showDeleted));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRunV2ListRevisionsResponse(data);
  }

  /**
   * Sets the IAM Access control policy for the specified Service. Overwrites
   * any existing policy.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServicesSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Returns permissions that a caller has on the specified Project. There are
   * no permissions required for making this API call.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServicesTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }
}

/**
 * Settings for Binary Authorization feature.
 */
export interface GoogleCloudRunV2BinaryAuthorization {
  /**
   * If present, indicates to use Breakglass using this justification. If
   * use_default is False, then it must be empty. For more information on
   * breakglass, see
   * https://cloud.google.com/binary-authorization/docs/using-breakglass
   */
  breakglassJustification?: string;
  /**
   * If True, indicates to use the default project's binary authorization
   * policy. If False, binary authorization will be disabled.
   */
  useDefault?: boolean;
}

/**
 * Represents a set of Cloud SQL instances. Each one will be available under
 * /cloudsql/[instance]. Visit
 * https://cloud.google.com/sql/docs/mysql/connect-run for more information on
 * how to connect Cloud SQL and Cloud Run.
 */
export interface GoogleCloudRunV2CloudSqlInstance {
  /**
   * The Cloud SQL instance connection names, as can be found in
   * https://console.cloud.google.com/sql/instances. Visit
   * https://cloud.google.com/sql/docs/mysql/connect-run for more information on
   * how to connect Cloud SQL and Cloud Run. Format:
   * {project}:{location}:{instance}
   */
  instances?: string[];
}

/**
 * Defines a status condition for a resource.
 */
export interface GoogleCloudRunV2Condition {
  /**
   * A reason for the execution condition.
   */
  executionReason?:  | "EXECUTION_REASON_UNDEFINED" | "JOB_STATUS_SERVICE_POLLING_ERROR" | "NON_ZERO_EXIT_CODE" | "CANCELLED";
  /**
   * Last time the condition transitioned from one status to another.
   */
  lastTransitionTime?: Date;
  /**
   * Human readable message indicating details about the current status.
   */
  message?: string;
  /**
   * A common (service-level) reason for this condition.
   */
  reason?:  | "COMMON_REASON_UNDEFINED" | "UNKNOWN" | "REVISION_FAILED" | "PROGRESS_DEADLINE_EXCEEDED" | "CONTAINER_MISSING" | "CONTAINER_PERMISSION_DENIED" | "CONTAINER_IMAGE_UNAUTHORIZED" | "CONTAINER_IMAGE_AUTHORIZATION_CHECK_FAILED" | "ENCRYPTION_KEY_PERMISSION_DENIED" | "ENCRYPTION_KEY_CHECK_FAILED" | "SECRETS_ACCESS_CHECK_FAILED" | "WAITING_FOR_OPERATION" | "IMMEDIATE_RETRY" | "POSTPONED_RETRY" | "INTERNAL";
  /**
   * A reason for the revision condition.
   */
  revisionReason?:  | "REVISION_REASON_UNDEFINED" | "PENDING" | "RESERVE" | "RETIRED" | "RETIRING" | "RECREATING" | "HEALTH_CHECK_CONTAINER_ERROR" | "CUSTOMIZED_PATH_RESPONSE_PENDING" | "MIN_INSTANCES_NOT_PROVISIONED" | "ACTIVE_REVISION_LIMIT_REACHED" | "NO_DEPLOYMENT" | "HEALTH_CHECK_SKIPPED" | "MIN_INSTANCES_WARMING";
  /**
   * How to interpret failures of this condition, one of Error, Warning, Info
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO";
  /**
   * State of the condition.
   */
  state?:  | "STATE_UNSPECIFIED" | "CONDITION_PENDING" | "CONDITION_RECONCILING" | "CONDITION_FAILED" | "CONDITION_SUCCEEDED";
  /**
   * type is used to communicate the status of the reconciliation process. See
   * also:
   * https://github.com/knative/serving/blob/main/docs/spec/errors.md#error-conditions-and-reporting
   * Types common to all resources include: * "Ready": True when the Resource is
   * ready.
   */
  type?: string;
}

function serializeGoogleCloudRunV2Condition(data: any): GoogleCloudRunV2Condition {
  return {
    ...data,
    lastTransitionTime: data["lastTransitionTime"] !== undefined ? data["lastTransitionTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRunV2Condition(data: any): GoogleCloudRunV2Condition {
  return {
    ...data,
    lastTransitionTime: data["lastTransitionTime"] !== undefined ? new Date(data["lastTransitionTime"]) : undefined,
  };
}

/**
 * A single application container. This specifies both the container to run,
 * the command to run in the container and the arguments to supply to it. Note
 * that additional arguments may be supplied by the system to the container at
 * runtime.
 */
export interface GoogleCloudRunV2Container {
  /**
   * Arguments to the entrypoint. The docker image's CMD is used if this is not
   * provided. Variable references $(VAR_NAME) are expanded using the
   * container's environment. If a variable cannot be resolved, the reference in
   * the input string will be unchanged. The $(VAR_NAME) syntax can be escaped
   * with a double $$, ie: $$(VAR_NAME). Escaped references will never be
   * expanded, regardless of whether the variable exists or not. More info:
   * https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
   */
  args?: string[];
  /**
   * Entrypoint array. Not executed within a shell. The docker image's
   * ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME)
   * are expanded using the container's environment. If a variable cannot be
   * resolved, the reference in the input string will be unchanged. The
   * $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME).
   * Escaped references will never be expanded, regardless of whether the
   * variable exists or not. More info:
   * https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
   */
  command?: string[];
  /**
   * List of environment variables to set in the container.
   */
  env?: GoogleCloudRunV2EnvVar[];
  /**
   * Required. Name of the container image in Dockerhub, Google Artifact
   * Registry, or Google Container Registry. If the host is not provided,
   * Dockerhub is assumed. More info:
   * https://kubernetes.io/docs/concepts/containers/images
   */
  image?: string;
  /**
   * Periodic probe of container liveness. Container will be restarted if the
   * probe fails. More info:
   * https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  livenessProbe?: GoogleCloudRunV2Probe;
  /**
   * Name of the container specified as a DNS_LABEL (RFC 1123).
   */
  name?: string;
  /**
   * List of ports to expose from the container. Only a single port can be
   * specified. The specified ports must be listening on all interfaces
   * (0.0.0.0) within the container to be accessible. If omitted, a port number
   * will be chosen and passed to the container through the PORT environment
   * variable for the container to listen on.
   */
  ports?: GoogleCloudRunV2ContainerPort[];
  /**
   * Compute Resource requirements by this container. More info:
   * https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
   */
  resources?: GoogleCloudRunV2ResourceRequirements;
  /**
   * Startup probe of application within the container. All other probes are
   * disabled if a startup probe is provided, until it succeeds. Container will
   * not be added to service endpoints if the probe fails. More info:
   * https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  startupProbe?: GoogleCloudRunV2Probe;
  /**
   * Volume to mount into the container's filesystem.
   */
  volumeMounts?: GoogleCloudRunV2VolumeMount[];
  /**
   * Container's working directory. If not specified, the container runtime's
   * default will be used, which might be configured in the container image.
   */
  workingDir?: string;
}

/**
 * ContainerPort represents a network port in a single container.
 */
export interface GoogleCloudRunV2ContainerPort {
  /**
   * Port number the container listens on. This must be a valid TCP port
   * number, 0 < container_port < 65536.
   */
  containerPort?: number;
  /**
   * If specified, used to specify which protocol to use. Allowed values are
   * "http1" and "h2c".
   */
  name?: string;
}

/**
 * EnvVar represents an environment variable present in a Container.
 */
export interface GoogleCloudRunV2EnvVar {
  /**
   * Required. Name of the environment variable. Must be a C_IDENTIFIER, and
   * mnay not exceed 32768 characters.
   */
  name?: string;
  /**
   * Variable references $(VAR_NAME) are expanded using the previous defined
   * environment variables in the container and any route environment variables.
   * If a variable cannot be resolved, the reference in the input string will be
   * unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie:
   * $$(VAR_NAME). Escaped references will never be expanded, regardless of
   * whether the variable exists or not. Defaults to "", and the maximum length
   * is 32768 bytes.
   */
  value?: string;
  /**
   * Source for the environment variable's value.
   */
  valueSource?: GoogleCloudRunV2EnvVarSource;
}

/**
 * EnvVarSource represents a source for the value of an EnvVar.
 */
export interface GoogleCloudRunV2EnvVarSource {
  /**
   * Selects a secret and a specific version from Cloud Secret Manager.
   */
  secretKeyRef?: GoogleCloudRunV2SecretKeySelector;
}

/**
 * Execution represents the configuration of a single execution. A execution an
 * immutable resource that references a container image which is run to
 * completion.
 */
export interface GoogleCloudRunV2Execution {
  /**
   * KRM-style annotations for the resource.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. The number of tasks which reached phase Cancelled.
   */
  readonly cancelledCount?: number;
  /**
   * Output only. Represents time when the execution was completed. It is not
   * guaranteed to be set in happens-before order across separate operations.
   */
  readonly completionTime?: Date;
  /**
   * Output only. The Condition of this Execution, containing its readiness
   * status, and detailed error information in case it did not reach the desired
   * state.
   */
  readonly conditions?: GoogleCloudRunV2Condition[];
  /**
   * Output only. Represents time when the execution was acknowledged by the
   * execution controller. It is not guaranteed to be set in happens-before
   * order across separate operations.
   */
  readonly createTime?: Date;
  /**
   * Output only. For a deleted resource, the deletion time. It is only
   * populated as a response to a Delete request.
   */
  readonly deleteTime?: Date;
  /**
   * Output only. A system-generated fingerprint for this version of the
   * resource. May be used to detect modification conflict during updates.
   */
  readonly etag?: string;
  /**
   * Output only. For a deleted resource, the time after which it will be
   * permamently deleted. It is only populated as a response to a Delete
   * request.
   */
  readonly expireTime?: Date;
  /**
   * Output only. The number of tasks which reached phase Failed.
   */
  readonly failedCount?: number;
  /**
   * Output only. A number that monotonically increases every time the user
   * modifies the desired state.
   */
  readonly generation?: bigint;
  /**
   * Output only. The name of the parent Job.
   */
  readonly job?: string;
  /**
   * KRM-style labels for the resource. User-provided labels are shared with
   * Google's billing system, so they can be used to filter, or break down
   * billing charges by team, component, environment, state, etc. For more
   * information, visit
   * https://cloud.google.com/resource-manager/docs/creating-managing-labels or
   * https://cloud.google.com/run/docs/configuring/labels
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Set the launch stage to a preview stage on write to allow use of preview
   * features in that stage. On read, describes whether the resource uses
   * preview features. Launch Stages are defined at [Google Cloud Platform
   * Launch Stages](https://cloud.google.com/terms/launch-stages).
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * Output only. URI where logs for this execution can be found in Cloud
   * Console.
   */
  readonly logUri?: string;
  /**
   * Output only. The unique name of this Execution.
   */
  readonly name?: string;
  /**
   * Output only. The generation of this Execution. See comments in
   * `reconciling` for additional information on reconciliation process in Cloud
   * Run.
   */
  readonly observedGeneration?: bigint;
  /**
   * Output only. Specifies the maximum desired number of tasks the execution
   * should run at any given time. Must be <= task_count. The actual number of
   * tasks running in steady state will be less than this number when
   * ((.spec.task_count - .status.successful) < .spec.parallelism), i.e. when
   * the work left to do is less than max parallelism. More info:
   * https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/
   */
  readonly parallelism?: number;
  /**
   * Output only. Indicates whether the resource's reconciliation is still in
   * progress. See comments in `Job.reconciling` for additional information on
   * reconciliation process in Cloud Run.
   */
  readonly reconciling?: boolean;
  /**
   * Output only. The number of tasks which have retried at least once.
   */
  readonly retriedCount?: number;
  /**
   * Output only. The number of actively running tasks.
   */
  readonly runningCount?: number;
  /**
   * Output only. Reserved for future use.
   */
  readonly satisfiesPzs?: boolean;
  /**
   * Output only. Represents time when the execution started to run. It is not
   * guaranteed to be set in happens-before order across separate operations.
   */
  readonly startTime?: Date;
  /**
   * Output only. The number of tasks which reached phase Succeeded.
   */
  readonly succeededCount?: number;
  /**
   * Output only. Specifies the desired number of tasks the execution should
   * run. Setting to 1 means that parallelism is limited to 1 and the success of
   * that task signals the success of the execution. More info:
   * https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/
   */
  readonly taskCount?: number;
  /**
   * Output only. The template used to create tasks for this execution.
   */
  readonly template?: GoogleCloudRunV2TaskTemplate;
  /**
   * Output only. Server assigned unique identifier for the Execution. The
   * value is a UUID4 string and guaranteed to remain unchanged until the
   * resource is deleted.
   */
  readonly uid?: string;
  /**
   * Output only. The last-modified time.
   */
  readonly updateTime?: Date;
}

/**
 * Reference to an Execution. Use /Executions.GetExecution with the given name
 * to get full execution including the latest status.
 */
export interface GoogleCloudRunV2ExecutionReference {
  /**
   * Creation timestamp of the execution.
   */
  completionTime?: Date;
  /**
   * Creation timestamp of the execution.
   */
  createTime?: Date;
  /**
   * Name of the execution.
   */
  name?: string;
}

function serializeGoogleCloudRunV2ExecutionReference(data: any): GoogleCloudRunV2ExecutionReference {
  return {
    ...data,
    completionTime: data["completionTime"] !== undefined ? data["completionTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRunV2ExecutionReference(data: any): GoogleCloudRunV2ExecutionReference {
  return {
    ...data,
    completionTime: data["completionTime"] !== undefined ? new Date(data["completionTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * ExecutionTemplate describes the data an execution should have when created
 * from a template.
 */
export interface GoogleCloudRunV2ExecutionTemplate {
  /**
   * KRM-style annotations for the resource. Cloud Run API v2 does not support
   * annotations with `run.googleapis.com`, `cloud.googleapis.com`,
   * `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they
   * will be rejected. All system annotations in v1 now have a corresponding
   * field in v2 ExecutionTemplate.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * KRM-style labels for the resource. Cloud Run API v2 does not support
   * labels with `run.googleapis.com`, `cloud.googleapis.com`,
   * `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they
   * will be rejected. All system labels in v1 now have a corresponding field in
   * v2 ExecutionTemplate.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Specifies the maximum desired number of tasks the execution should run at
   * given time. Must be <= task_count. When the job is run, if this field is 0
   * or unset, the maximum possible value will be used for that execution. The
   * actual number of tasks running in steady state will be less than this
   * number when there are fewer tasks waiting to be completed remaining, i.e.
   * when the work left to do is less than max parallelism.
   */
  parallelism?: number;
  /**
   * Specifies the desired number of tasks the execution should run. Setting to
   * 1 means that parallelism is limited to 1 and the success of that task
   * signals the success of the execution. Defaults to 1.
   */
  taskCount?: number;
  /**
   * Required. Describes the task(s) that will be created when executing an
   * execution.
   */
  template?: GoogleCloudRunV2TaskTemplate;
}

function serializeGoogleCloudRunV2ExecutionTemplate(data: any): GoogleCloudRunV2ExecutionTemplate {
  return {
    ...data,
    template: data["template"] !== undefined ? serializeGoogleCloudRunV2TaskTemplate(data["template"]) : undefined,
  };
}

function deserializeGoogleCloudRunV2ExecutionTemplate(data: any): GoogleCloudRunV2ExecutionTemplate {
  return {
    ...data,
    template: data["template"] !== undefined ? deserializeGoogleCloudRunV2TaskTemplate(data["template"]) : undefined,
  };
}

/**
 * GRPCAction describes an action involving a GRPC port.
 */
export interface GoogleCloudRunV2GRPCAction {
  /**
   * Port number of the gRPC service. Number must be in the range 1 to 65535.
   * If not specified, defaults to the exposed port of the container, which is
   * the value of container.ports[0].containerPort.
   */
  port?: number;
  /**
   * Service is the name of the service to place in the gRPC HealthCheckRequest
   * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md). If
   * this is not specified, the default behavior is defined by gRPC.
   */
  service?: string;
}

/**
 * HTTPGetAction describes an action based on HTTP Get requests.
 */
export interface GoogleCloudRunV2HTTPGetAction {
  /**
   * Custom headers to set in the request. HTTP allows repeated headers.
   */
  httpHeaders?: GoogleCloudRunV2HTTPHeader[];
  /**
   * Path to access on the HTTP server. Defaults to '/'.
   */
  path?: string;
  /**
   * Port number to access on the container. Must be in the range 1 to 65535.
   * If not specified, defaults to the exposed port of the container, which is
   * the value of container.ports[0].containerPort.
   */
  port?: number;
}

/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 */
export interface GoogleCloudRunV2HTTPHeader {
  /**
   * Required. The header field name
   */
  name?: string;
  /**
   * The header field value
   */
  value?: string;
}

/**
 * Job represents the configuration of a single job, which references a
 * container image that is run to completion.
 */
export interface GoogleCloudRunV2Job {
  /**
   * KRM-style annotations for the resource. Unstructured key value map that
   * may be set by external tools to store and arbitrary metadata. They are not
   * queryable and should be preserved when modifying objects. Cloud Run API v2
   * does not support annotations with `run.googleapis.com`,
   * `cloud.googleapis.com`, `serving.knative.dev`, or `autoscaling.knative.dev`
   * namespaces, and they will be rejected. All system annotations in v1 now
   * have a corresponding field in v2 Job. This field follows Kubernetes
   * annotations' namespacing, limits, and rules. More info:
   * https://kubernetes.io/docs/user-guide/annotations
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Settings for the Binary Authorization feature.
   */
  binaryAuthorization?: GoogleCloudRunV2BinaryAuthorization;
  /**
   * Arbitrary identifier for the API client.
   */
  client?: string;
  /**
   * Arbitrary version identifier for the API client.
   */
  clientVersion?: string;
  /**
   * Output only. The Conditions of all other associated sub-resources. They
   * contain additional diagnostics information in case the Job does not reach
   * its desired state. See comments in `reconciling` for additional information
   * on reconciliation process in Cloud Run.
   */
  readonly conditions?: GoogleCloudRunV2Condition[];
  /**
   * Output only. The creation time.
   */
  readonly createTime?: Date;
  /**
   * Output only. Email address of the authenticated creator.
   */
  readonly creator?: string;
  /**
   * Output only. The deletion time.
   */
  readonly deleteTime?: Date;
  /**
   * Output only. A system-generated fingerprint for this version of the
   * resource. May be used to detect modification conflict during updates.
   */
  readonly etag?: string;
  /**
   * Output only. Number of executions created for this job.
   */
  readonly executionCount?: number;
  /**
   * Output only. For a deleted resource, the time after which it will be
   * permamently deleted.
   */
  readonly expireTime?: Date;
  /**
   * Output only. A number that monotonically increases every time the user
   * modifies the desired state.
   */
  readonly generation?: bigint;
  /**
   * KRM-style labels for the resource. User-provided labels are shared with
   * Google's billing system, so they can be used to filter, or break down
   * billing charges by team, component, environment, state, etc. For more
   * information, visit
   * https://cloud.google.com/resource-manager/docs/creating-managing-labels or
   * https://cloud.google.com/run/docs/configuring/labels Cloud Run API v2 does
   * not support labels with `run.googleapis.com`, `cloud.googleapis.com`,
   * `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they
   * will be rejected. All system labels in v1 now have a corresponding field in
   * v2 Job.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. Email address of the last authenticated modifier.
   */
  readonly lastModifier?: string;
  /**
   * Output only. Name of the last created execution.
   */
  readonly latestCreatedExecution?: GoogleCloudRunV2ExecutionReference;
  /**
   * The launch stage as defined by [Google Cloud Platform Launch
   * Stages](https://cloud.google.com/terms/launch-stages). Cloud Run supports
   * `ALPHA`, `BETA`, and `GA`. If no value is specified, GA is assumed.
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * The fully qualified name of this Job. Format:
   * projects/{project}/locations/{location}/jobs/{job}
   */
  name?: string;
  /**
   * Output only. The generation of this Job. See comments in `reconciling` for
   * additional information on reconciliation process in Cloud Run.
   */
  readonly observedGeneration?: bigint;
  /**
   * Output only. Returns true if the Job is currently being acted upon by the
   * system to bring it into the desired state. When a new Job is created, or an
   * existing one is updated, Cloud Run will asynchronously perform all
   * necessary steps to bring the Job to the desired state. This process is
   * called reconciliation. While reconciliation is in process,
   * `observed_generation` and `latest_succeeded_execution`, will have transient
   * values that might mismatch the intended state: Once reconciliation is over
   * (and this field is false), there are two possible outcomes: reconciliation
   * succeeded and the state matches the Job, or there was an error, and
   * reconciliation failed. This state can be found in
   * `terminal_condition.state`. If reconciliation succeeded, the following
   * fields will match: `observed_generation` and `generation`,
   * `latest_succeeded_execution` and `latest_created_execution`. If
   * reconciliation failed, `observed_generation` and
   * `latest_succeeded_execution` will have the state of the last succeeded
   * execution or empty for newly created Job. Additional information on the
   * failure can be found in `terminal_condition` and `conditions`.
   */
  readonly reconciling?: boolean;
  /**
   * Output only. Reserved for future use.
   */
  readonly satisfiesPzs?: boolean;
  /**
   * Required. The template used to create executions for this Job.
   */
  template?: GoogleCloudRunV2ExecutionTemplate;
  /**
   * Output only. The Condition of this Job, containing its readiness status,
   * and detailed error information in case it did not reach the desired state.
   */
  readonly terminalCondition?: GoogleCloudRunV2Condition;
  /**
   * Output only. Server assigned unique identifier for the Execution. The
   * value is a UUID4 string and guaranteed to remain unchanged until the
   * resource is deleted.
   */
  readonly uid?: string;
  /**
   * Output only. The last-modified time.
   */
  readonly updateTime?: Date;
}

function serializeGoogleCloudRunV2Job(data: any): GoogleCloudRunV2Job {
  return {
    ...data,
    template: data["template"] !== undefined ? serializeGoogleCloudRunV2ExecutionTemplate(data["template"]) : undefined,
  };
}

function deserializeGoogleCloudRunV2Job(data: any): GoogleCloudRunV2Job {
  return {
    ...data,
    conditions: data["conditions"] !== undefined ? data["conditions"].map((item: any) => (deserializeGoogleCloudRunV2Condition(item))) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deleteTime: data["deleteTime"] !== undefined ? new Date(data["deleteTime"]) : undefined,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
    latestCreatedExecution: data["latestCreatedExecution"] !== undefined ? deserializeGoogleCloudRunV2ExecutionReference(data["latestCreatedExecution"]) : undefined,
    observedGeneration: data["observedGeneration"] !== undefined ? BigInt(data["observedGeneration"]) : undefined,
    template: data["template"] !== undefined ? deserializeGoogleCloudRunV2ExecutionTemplate(data["template"]) : undefined,
    terminalCondition: data["terminalCondition"] !== undefined ? deserializeGoogleCloudRunV2Condition(data["terminalCondition"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Response message containing a list of Executions.
 */
export interface GoogleCloudRunV2ListExecutionsResponse {
  /**
   * The resulting list of Executions.
   */
  executions?: GoogleCloudRunV2Execution[];
  /**
   * A token indicating there are more items than page_size. Use it in the next
   * ListExecutions request to continue.
   */
  nextPageToken?: string;
}

/**
 * Response message containing a list of Jobs.
 */
export interface GoogleCloudRunV2ListJobsResponse {
  /**
   * The resulting list of Jobs.
   */
  jobs?: GoogleCloudRunV2Job[];
  /**
   * A token indicating there are more items than page_size. Use it in the next
   * ListJobs request to continue.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudRunV2ListJobsResponse(data: any): GoogleCloudRunV2ListJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (serializeGoogleCloudRunV2Job(item))) : undefined,
  };
}

function deserializeGoogleCloudRunV2ListJobsResponse(data: any): GoogleCloudRunV2ListJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (deserializeGoogleCloudRunV2Job(item))) : undefined,
  };
}

/**
 * Response message containing a list of Revisions.
 */
export interface GoogleCloudRunV2ListRevisionsResponse {
  /**
   * A token indicating there are more items than page_size. Use it in the next
   * ListRevisions request to continue.
   */
  nextPageToken?: string;
  /**
   * The resulting list of Revisions.
   */
  revisions?: GoogleCloudRunV2Revision[];
}

function serializeGoogleCloudRunV2ListRevisionsResponse(data: any): GoogleCloudRunV2ListRevisionsResponse {
  return {
    ...data,
    revisions: data["revisions"] !== undefined ? data["revisions"].map((item: any) => (serializeGoogleCloudRunV2Revision(item))) : undefined,
  };
}

function deserializeGoogleCloudRunV2ListRevisionsResponse(data: any): GoogleCloudRunV2ListRevisionsResponse {
  return {
    ...data,
    revisions: data["revisions"] !== undefined ? data["revisions"].map((item: any) => (deserializeGoogleCloudRunV2Revision(item))) : undefined,
  };
}

/**
 * Response message containing a list of Services.
 */
export interface GoogleCloudRunV2ListServicesResponse {
  /**
   * A token indicating there are more items than page_size. Use it in the next
   * ListServices request to continue.
   */
  nextPageToken?: string;
  /**
   * The resulting list of Services.
   */
  services?: GoogleCloudRunV2Service[];
}

function serializeGoogleCloudRunV2ListServicesResponse(data: any): GoogleCloudRunV2ListServicesResponse {
  return {
    ...data,
    services: data["services"] !== undefined ? data["services"].map((item: any) => (serializeGoogleCloudRunV2Service(item))) : undefined,
  };
}

function deserializeGoogleCloudRunV2ListServicesResponse(data: any): GoogleCloudRunV2ListServicesResponse {
  return {
    ...data,
    services: data["services"] !== undefined ? data["services"].map((item: any) => (deserializeGoogleCloudRunV2Service(item))) : undefined,
  };
}

/**
 * Response message containing a list of Tasks.
 */
export interface GoogleCloudRunV2ListTasksResponse {
  /**
   * A token indicating there are more items than page_size. Use it in the next
   * ListTasks request to continue.
   */
  nextPageToken?: string;
  /**
   * The resulting list of Tasks.
   */
  tasks?: GoogleCloudRunV2Task[];
}

function serializeGoogleCloudRunV2ListTasksResponse(data: any): GoogleCloudRunV2ListTasksResponse {
  return {
    ...data,
    tasks: data["tasks"] !== undefined ? data["tasks"].map((item: any) => (serializeGoogleCloudRunV2Task(item))) : undefined,
  };
}

function deserializeGoogleCloudRunV2ListTasksResponse(data: any): GoogleCloudRunV2ListTasksResponse {
  return {
    ...data,
    tasks: data["tasks"] !== undefined ? data["tasks"].map((item: any) => (deserializeGoogleCloudRunV2Task(item))) : undefined,
  };
}

/**
 * Probe describes a health check to be performed against a container to
 * determine whether it is alive or ready to receive traffic.
 */
export interface GoogleCloudRunV2Probe {
  /**
   * Minimum consecutive failures for the probe to be considered failed after
   * having succeeded. Defaults to 3. Minimum value is 1.
   */
  failureThreshold?: number;
  /**
   * GRPC specifies an action involving a gRPC port. Exactly one of httpGet,
   * tcpSocket, or grpc must be specified.
   */
  grpc?: GoogleCloudRunV2GRPCAction;
  /**
   * HTTPGet specifies the http request to perform. Exactly one of httpGet,
   * tcpSocket, or grpc must be specified.
   */
  httpGet?: GoogleCloudRunV2HTTPGetAction;
  /**
   * Number of seconds after the container has started before the probe is
   * initiated. Defaults to 0 seconds. Minimum value is 0. Maximum value for
   * liveness probe is 3600. Maximum value for startup probe is 240. More info:
   * https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  initialDelaySeconds?: number;
  /**
   * How often (in seconds) to perform the probe. Default to 10 seconds.
   * Minimum value is 1. Maximum value for liveness probe is 3600. Maximum value
   * for startup probe is 240. Must be greater or equal than timeout_seconds.
   */
  periodSeconds?: number;
  /**
   * TCPSocket specifies an action involving a TCP port. Exactly one of
   * httpGet, tcpSocket, or grpc must be specified.
   */
  tcpSocket?: GoogleCloudRunV2TCPSocketAction;
  /**
   * Number of seconds after which the probe times out. Defaults to 1 second.
   * Minimum value is 1. Maximum value is 3600. Must be smaller than
   * period_seconds. More info:
   * https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
   */
  timeoutSeconds?: number;
}

/**
 * ResourceRequirements describes the compute resource requirements.
 */
export interface GoogleCloudRunV2ResourceRequirements {
  /**
   * Determines whether CPU should be throttled or not outside of requests.
   */
  cpuIdle?: boolean;
  /**
   * Only memory and CPU are supported. Note: The only supported values for CPU
   * are '1', '2', '4', and '8'. Setting 4 CPU requires at least 2Gi of memory.
   * The values of the map is string form of the 'quantity' k8s type:
   * https://github.com/kubernetes/kubernetes/blob/master/staging/src/k8s.io/apimachinery/pkg/api/resource/quantity.go
   */
  limits?: {
    [key: string]: string
  };
}

/**
 * A Revision is an immutable snapshot of code and configuration. A Revision
 * references a container image. Revisions are only created by updates to its
 * parent Service.
 */
export interface GoogleCloudRunV2Revision {
  /**
   * KRM-style annotations for the resource.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. The Condition of this Revision, containing its readiness
   * status, and detailed error information in case it did not reach a serving
   * state.
   */
  readonly conditions?: GoogleCloudRunV2Condition[];
  /**
   * Holds the single container that defines the unit of execution for this
   * Revision.
   */
  containers?: GoogleCloudRunV2Container[];
  /**
   * Output only. The creation time.
   */
  readonly createTime?: Date;
  /**
   * Output only. For a deleted resource, the deletion time. It is only
   * populated as a response to a Delete request.
   */
  readonly deleteTime?: Date;
  /**
   * A reference to a customer managed encryption key (CMEK) to use to encrypt
   * this container image. For more information, go to
   * https://cloud.google.com/run/docs/securing/using-cmek
   */
  encryptionKey?: string;
  /**
   * The action to take if the encryption key is revoked.
   */
  encryptionKeyRevocationAction?:  | "ENCRYPTION_KEY_REVOCATION_ACTION_UNSPECIFIED" | "PREVENT_NEW" | "SHUTDOWN";
  /**
   * If encryption_key_revocation_action is SHUTDOWN, the duration before
   * shutting down all instances. The minimum increment is 1 hour.
   */
  encryptionKeyShutdownDuration?: number /* Duration */;
  /**
   * Output only. A system-generated fingerprint for this version of the
   * resource. May be used to detect modification conflict during updates.
   */
  readonly etag?: string;
  /**
   * The execution environment being used to host this Revision.
   */
  executionEnvironment?:  | "EXECUTION_ENVIRONMENT_UNSPECIFIED" | "EXECUTION_ENVIRONMENT_GEN1" | "EXECUTION_ENVIRONMENT_GEN2";
  /**
   * Output only. For a deleted resource, the time after which it will be
   * permamently deleted. It is only populated as a response to a Delete
   * request.
   */
  readonly expireTime?: Date;
  /**
   * Output only. A number that monotonically increases every time the user
   * modifies the desired state.
   */
  readonly generation?: bigint;
  /**
   * KRM-style labels for the resource. User-provided labels are shared with
   * Google's billing system, so they can be used to filter, or break down
   * billing charges by team, component, environment, state, etc. For more
   * information, visit
   * https://cloud.google.com/resource-manager/docs/creating-managing-labels or
   * https://cloud.google.com/run/docs/configuring/labels
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Set the launch stage to a preview stage on write to allow use of preview
   * features in that stage. On read, describes whether the resource uses
   * preview features. Launch Stages are defined at [Google Cloud Platform
   * Launch Stages](https://cloud.google.com/terms/launch-stages).
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * Output only. The Google Console URI to obtain logs for the Revision.
   */
  readonly logUri?: string;
  /**
   * Sets the maximum number of requests that each serving instance can
   * receive.
   */
  maxInstanceRequestConcurrency?: number;
  /**
   * Output only. The unique name of this Revision.
   */
  readonly name?: string;
  /**
   * Output only. The generation of this Revision currently serving traffic.
   * See comments in `reconciling` for additional information on reconciliation
   * process in Cloud Run.
   */
  readonly observedGeneration?: bigint;
  /**
   * Output only. Indicates whether the resource's reconciliation is still in
   * progress. See comments in `Service.reconciling` for additional information
   * on reconciliation process in Cloud Run.
   */
  readonly reconciling?: boolean;
  /**
   * Output only. Reserved for future use.
   */
  readonly satisfiesPzs?: boolean;
  /**
   * Scaling settings for this revision.
   */
  scaling?: GoogleCloudRunV2RevisionScaling;
  /**
   * Output only. The name of the parent service.
   */
  readonly service?: string;
  /**
   * Email address of the IAM service account associated with the revision of
   * the service. The service account represents the identity of the running
   * revision, and determines what permissions the revision has.
   */
  serviceAccount?: string;
  /**
   * Max allowed time for an instance to respond to a request.
   */
  timeout?: number /* Duration */;
  /**
   * Output only. Server assigned unique identifier for the Revision. The value
   * is a UUID4 string and guaranteed to remain unchanged until the resource is
   * deleted.
   */
  readonly uid?: string;
  /**
   * Output only. The last-modified time.
   */
  readonly updateTime?: Date;
  /**
   * A list of Volumes to make available to containers.
   */
  volumes?: GoogleCloudRunV2Volume[];
  /**
   * VPC Access configuration for this Revision. For more information, visit
   * https://cloud.google.com/run/docs/configuring/connecting-vpc.
   */
  vpcAccess?: GoogleCloudRunV2VpcAccess;
}

function serializeGoogleCloudRunV2Revision(data: any): GoogleCloudRunV2Revision {
  return {
    ...data,
    encryptionKeyShutdownDuration: data["encryptionKeyShutdownDuration"] !== undefined ? data["encryptionKeyShutdownDuration"] : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeGoogleCloudRunV2Revision(data: any): GoogleCloudRunV2Revision {
  return {
    ...data,
    conditions: data["conditions"] !== undefined ? data["conditions"].map((item: any) => (deserializeGoogleCloudRunV2Condition(item))) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deleteTime: data["deleteTime"] !== undefined ? new Date(data["deleteTime"]) : undefined,
    encryptionKeyShutdownDuration: data["encryptionKeyShutdownDuration"] !== undefined ? data["encryptionKeyShutdownDuration"] : undefined,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
    observedGeneration: data["observedGeneration"] !== undefined ? BigInt(data["observedGeneration"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Settings for revision-level scaling settings.
 */
export interface GoogleCloudRunV2RevisionScaling {
  /**
   * Maximum number of serving instances that this resource should have.
   */
  maxInstanceCount?: number;
  /**
   * Minimum number of serving instances that this resource should have.
   */
  minInstanceCount?: number;
}

/**
 * RevisionTemplate describes the data a revision should have when created from
 * a template.
 */
export interface GoogleCloudRunV2RevisionTemplate {
  /**
   * KRM-style annotations for the resource. Cloud Run API v2 does not support
   * annotations with `run.googleapis.com`, `cloud.googleapis.com`,
   * `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they
   * will be rejected. All system annotations in v1 now have a corresponding
   * field in v2 RevisionTemplate.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Holds the single container that defines the unit of execution for this
   * Revision.
   */
  containers?: GoogleCloudRunV2Container[];
  /**
   * A reference to a customer managed encryption key (CMEK) to use to encrypt
   * this container image. For more information, go to
   * https://cloud.google.com/run/docs/securing/using-cmek
   */
  encryptionKey?: string;
  /**
   * The sandbox environment to host this Revision.
   */
  executionEnvironment?:  | "EXECUTION_ENVIRONMENT_UNSPECIFIED" | "EXECUTION_ENVIRONMENT_GEN1" | "EXECUTION_ENVIRONMENT_GEN2";
  /**
   * KRM-style labels for the resource. Cloud Run API v2 does not support
   * labels with `run.googleapis.com`, `cloud.googleapis.com`,
   * `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they
   * will be rejected. All system labels in v1 now have a corresponding field in
   * v2 RevisionTemplate.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Sets the maximum number of requests that each serving instance can
   * receive.
   */
  maxInstanceRequestConcurrency?: number;
  /**
   * The unique name for the revision. If this field is omitted, it will be
   * automatically generated based on the Service name.
   */
  revision?: string;
  /**
   * Scaling settings for this Revision.
   */
  scaling?: GoogleCloudRunV2RevisionScaling;
  /**
   * Email address of the IAM service account associated with the revision of
   * the service. The service account represents the identity of the running
   * revision, and determines what permissions the revision has. If not
   * provided, the revision will use the project's default service account.
   */
  serviceAccount?: string;
  /**
   * Max allowed time for an instance to respond to a request.
   */
  timeout?: number /* Duration */;
  /**
   * A list of Volumes to make available to containers.
   */
  volumes?: GoogleCloudRunV2Volume[];
  /**
   * VPC Access configuration to use for this Revision. For more information,
   * visit https://cloud.google.com/run/docs/configuring/connecting-vpc.
   */
  vpcAccess?: GoogleCloudRunV2VpcAccess;
}

function serializeGoogleCloudRunV2RevisionTemplate(data: any): GoogleCloudRunV2RevisionTemplate {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeGoogleCloudRunV2RevisionTemplate(data: any): GoogleCloudRunV2RevisionTemplate {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * Request message to create a new Execution of a Job.
 */
export interface GoogleCloudRunV2RunJobRequest {
  /**
   * A system-generated fingerprint for this version of the resource. May be
   * used to detect modification conflict during updates.
   */
  etag?: string;
  /**
   * Indicates that the request should be validated without actually deleting
   * any resources.
   */
  validateOnly?: boolean;
}

/**
 * SecretEnvVarSource represents a source for the value of an EnvVar.
 */
export interface GoogleCloudRunV2SecretKeySelector {
  /**
   * Required. The name of the secret in Cloud Secret Manager. Format:
   * {secret_name} if the secret is in the same project.
   * projects/{project}/secrets/{secret_name} if the secret is in a different
   * project.
   */
  secret?: string;
  /**
   * The Cloud Secret Manager secret version. Can be 'latest' for the latest
   * version, an integer for a specific version, or a version alias.
   */
  version?: string;
}

/**
 * The secret's value will be presented as the content of a file whose name is
 * defined in the item path. If no items are defined, the name of the file is
 * the secret.
 */
export interface GoogleCloudRunV2SecretVolumeSource {
  /**
   * Integer representation of mode bits to use on created files by default.
   * Must be a value between 0000 and 0777 (octal), defaulting to 0444.
   * Directories within the path are not affected by this setting. Notes *
   * Internally, a umask of 0222 will be applied to any non-zero value. * This
   * is an integer representation of the mode bits. So, the octal integer value
   * should look exactly as the chmod numeric notation with a leading zero. Some
   * examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511 (base-10). For
   * chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10). For chmod 755
   * (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). * This might be in
   * conflict with other options that affect the file mode, like fsGroup, and
   * the result can be other mode bits set. This might be in conflict with other
   * options that affect the file mode, like fsGroup, and as a result, other
   * mode bits could be set.
   */
  defaultMode?: number;
  /**
   * If unspecified, the volume will expose a file whose name is the secret,
   * relative to VolumeMount.mount_path. If specified, the key will be used as
   * the version to fetch from Cloud Secret Manager and the path will be the
   * name of the file exposed in the volume. When items are defined, they must
   * specify a path and a version.
   */
  items?: GoogleCloudRunV2VersionToPath[];
  /**
   * Required. The name of the secret in Cloud Secret Manager. Format: {secret}
   * if the secret is in the same project. projects/{project}/secrets/{secret}
   * if the secret is in a different project.
   */
  secret?: string;
}

/**
 * Service acts as a top-level container that manages a set of configurations
 * and revision templates which implement a network service. Service exists to
 * provide a singular abstraction which can be access controlled, reasoned
 * about, and which encapsulates software lifecycle decisions such as rollout
 * policy and team resource ownership.
 */
export interface GoogleCloudRunV2Service {
  /**
   * Unstructured key value map that may be set by external tools to store and
   * arbitrary metadata. They are not queryable and should be preserved when
   * modifying objects. Cloud Run API v2 does not support annotations with
   * `run.googleapis.com`, `cloud.googleapis.com`, `serving.knative.dev`, or
   * `autoscaling.knative.dev` namespaces, and they will be rejected. All system
   * annotations in v1 now have a corresponding field in v2 Service. This field
   * follows Kubernetes annotations' namespacing, limits, and rules. More info:
   * https://kubernetes.io/docs/user-guide/annotations
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Settings for the Binary Authorization feature.
   */
  binaryAuthorization?: GoogleCloudRunV2BinaryAuthorization;
  /**
   * Arbitrary identifier for the API client.
   */
  client?: string;
  /**
   * Arbitrary version identifier for the API client.
   */
  clientVersion?: string;
  /**
   * Output only. The Conditions of all other associated sub-resources. They
   * contain additional diagnostics information in case the Service does not
   * reach its Serving state. See comments in `reconciling` for additional
   * information on reconciliation process in Cloud Run.
   */
  readonly conditions?: GoogleCloudRunV2Condition[];
  /**
   * Output only. The creation time.
   */
  readonly createTime?: Date;
  /**
   * Output only. Email address of the authenticated creator.
   */
  readonly creator?: string;
  /**
   * Output only. The deletion time.
   */
  readonly deleteTime?: Date;
  /**
   * User-provided description of the Service. This field currently has a
   * 512-character limit.
   */
  description?: string;
  /**
   * Output only. A system-generated fingerprint for this version of the
   * resource. May be used to detect modification conflict during updates.
   */
  readonly etag?: string;
  /**
   * Output only. For a deleted resource, the time after which it will be
   * permamently deleted.
   */
  readonly expireTime?: Date;
  /**
   * Output only. A number that monotonically increases every time the user
   * modifies the desired state. Please note that unlike v1, this is an int64
   * value. As with most Google APIs, its JSON representation will be a `string`
   * instead of an `integer`.
   */
  readonly generation?: bigint;
  /**
   * Provides the ingress settings for this Service. On output, returns the
   * currently observed ingress settings, or INGRESS_TRAFFIC_UNSPECIFIED if no
   * revision is active.
   */
  ingress?:  | "INGRESS_TRAFFIC_UNSPECIFIED" | "INGRESS_TRAFFIC_ALL" | "INGRESS_TRAFFIC_INTERNAL_ONLY" | "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER";
  /**
   * Map of string keys and values that can be used to organize and categorize
   * objects. User-provided labels are shared with Google's billing system, so
   * they can be used to filter, or break down billing charges by team,
   * component, environment, state, etc. For more information, visit
   * https://cloud.google.com/resource-manager/docs/creating-managing-labels or
   * https://cloud.google.com/run/docs/configuring/labels Cloud Run API v2 does
   * not support labels with `run.googleapis.com`, `cloud.googleapis.com`,
   * `serving.knative.dev`, or `autoscaling.knative.dev` namespaces, and they
   * will be rejected. All system labels in v1 now have a corresponding field in
   * v2 Service.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. Email address of the last authenticated modifier.
   */
  readonly lastModifier?: string;
  /**
   * Output only. Name of the last created revision. See comments in
   * `reconciling` for additional information on reconciliation process in Cloud
   * Run.
   */
  readonly latestCreatedRevision?: string;
  /**
   * Output only. Name of the latest revision that is serving traffic. See
   * comments in `reconciling` for additional information on reconciliation
   * process in Cloud Run.
   */
  readonly latestReadyRevision?: string;
  /**
   * The launch stage as defined by [Google Cloud Platform Launch
   * Stages](https://cloud.google.com/terms/launch-stages). Cloud Run supports
   * `ALPHA`, `BETA`, and `GA`. If no value is specified, GA is assumed.
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * The fully qualified name of this Service. In CreateServiceRequest, this
   * field is ignored, and instead composed from CreateServiceRequest.parent and
   * CreateServiceRequest.service_id. Format:
   * projects/{project}/locations/{location}/services/{service_id}
   */
  name?: string;
  /**
   * Output only. The generation of this Service currently serving traffic. See
   * comments in `reconciling` for additional information on reconciliation
   * process in Cloud Run. Please note that unlike v1, this is an int64 value.
   * As with most Google APIs, its JSON representation will be a `string`
   * instead of an `integer`.
   */
  readonly observedGeneration?: bigint;
  /**
   * Output only. Returns true if the Service is currently being acted upon by
   * the system to bring it into the desired state. When a new Service is
   * created, or an existing one is updated, Cloud Run will asynchronously
   * perform all necessary steps to bring the Service to the desired serving
   * state. This process is called reconciliation. While reconciliation is in
   * process, `observed_generation`, `latest_ready_revison`, `traffic_statuses`,
   * and `uri` will have transient values that might mismatch the intended
   * state: Once reconciliation is over (and this field is false), there are two
   * possible outcomes: reconciliation succeeded and the serving state matches
   * the Service, or there was an error, and reconciliation failed. This state
   * can be found in `terminal_condition.state`. If reconciliation succeeded,
   * the following fields will match: `traffic` and `traffic_statuses`,
   * `observed_generation` and `generation`, `latest_ready_revision` and
   * `latest_created_revision`. If reconciliation failed, `traffic_statuses`,
   * `observed_generation`, and `latest_ready_revision` will have the state of
   * the last serving revision, or empty for newly created Services. Additional
   * information on the failure can be found in `terminal_condition` and
   * `conditions`.
   */
  readonly reconciling?: boolean;
  /**
   * Output only. Reserved for future use.
   */
  readonly satisfiesPzs?: boolean;
  /**
   * Required. The template used to create revisions for this Service.
   */
  template?: GoogleCloudRunV2RevisionTemplate;
  /**
   * Output only. The Condition of this Service, containing its readiness
   * status, and detailed error information in case it did not reach a serving
   * state. See comments in `reconciling` for additional information on
   * reconciliation process in Cloud Run.
   */
  readonly terminalCondition?: GoogleCloudRunV2Condition;
  /**
   * Specifies how to distribute traffic over a collection of Revisions
   * belonging to the Service. If traffic is empty or not provided, defaults to
   * 100% traffic to the latest `Ready` Revision.
   */
  traffic?: GoogleCloudRunV2TrafficTarget[];
  /**
   * Output only. Detailed status information for corresponding traffic
   * targets. See comments in `reconciling` for additional information on
   * reconciliation process in Cloud Run.
   */
  readonly trafficStatuses?: GoogleCloudRunV2TrafficTargetStatus[];
  /**
   * Output only. Server assigned unique identifier for the trigger. The value
   * is a UUID4 string and guaranteed to remain unchanged until the resource is
   * deleted.
   */
  readonly uid?: string;
  /**
   * Output only. The last-modified time.
   */
  readonly updateTime?: Date;
  /**
   * Output only. The main URI in which this Service is serving traffic.
   */
  readonly uri?: string;
}

function serializeGoogleCloudRunV2Service(data: any): GoogleCloudRunV2Service {
  return {
    ...data,
    template: data["template"] !== undefined ? serializeGoogleCloudRunV2RevisionTemplate(data["template"]) : undefined,
  };
}

function deserializeGoogleCloudRunV2Service(data: any): GoogleCloudRunV2Service {
  return {
    ...data,
    conditions: data["conditions"] !== undefined ? data["conditions"].map((item: any) => (deserializeGoogleCloudRunV2Condition(item))) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deleteTime: data["deleteTime"] !== undefined ? new Date(data["deleteTime"]) : undefined,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
    observedGeneration: data["observedGeneration"] !== undefined ? BigInt(data["observedGeneration"]) : undefined,
    template: data["template"] !== undefined ? deserializeGoogleCloudRunV2RevisionTemplate(data["template"]) : undefined,
    terminalCondition: data["terminalCondition"] !== undefined ? deserializeGoogleCloudRunV2Condition(data["terminalCondition"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Task represents a single run of a container to completion.
 */
export interface GoogleCloudRunV2Task {
  /**
   * KRM-style annotations for the resource.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. Represents time when the Task was completed. It is not
   * guaranteed to be set in happens-before order across separate operations.
   */
  readonly completionTime?: Date;
  /**
   * Output only. The Condition of this Task, containing its readiness status,
   * and detailed error information in case it did not reach the desired state.
   */
  readonly conditions?: GoogleCloudRunV2Condition[];
  /**
   * Holds the single container that defines the unit of execution for this
   * task.
   */
  containers?: GoogleCloudRunV2Container[];
  /**
   * Output only. Represents time when the task was created by the job
   * controller. It is not guaranteed to be set in happens-before order across
   * separate operations.
   */
  readonly createTime?: Date;
  /**
   * Output only. For a deleted resource, the deletion time. It is only
   * populated as a response to a Delete request.
   */
  readonly deleteTime?: Date;
  /**
   * Output only. A reference to a customer managed encryption key (CMEK) to
   * use to encrypt this container image. For more information, go to
   * https://cloud.google.com/run/docs/securing/using-cmek
   */
  readonly encryptionKey?: string;
  /**
   * Output only. A system-generated fingerprint for this version of the
   * resource. May be used to detect modification conflict during updates.
   */
  readonly etag?: string;
  /**
   * Output only. The name of the parent Execution.
   */
  readonly execution?: string;
  /**
   * The execution environment being used to host this Task.
   */
  executionEnvironment?:  | "EXECUTION_ENVIRONMENT_UNSPECIFIED" | "EXECUTION_ENVIRONMENT_GEN1" | "EXECUTION_ENVIRONMENT_GEN2";
  /**
   * Output only. For a deleted resource, the time after which it will be
   * permamently deleted. It is only populated as a response to a Delete
   * request.
   */
  readonly expireTime?: Date;
  /**
   * Output only. A number that monotonically increases every time the user
   * modifies the desired state.
   */
  readonly generation?: bigint;
  /**
   * Output only. Index of the Task, unique per execution, and beginning at 0.
   */
  readonly index?: number;
  /**
   * Output only. The name of the parent Job.
   */
  readonly job?: string;
  /**
   * KRM-style labels for the resource. User-provided labels are shared with
   * Google's billing system, so they can be used to filter, or break down
   * billing charges by team, component, environment, state, etc. For more
   * information, visit
   * https://cloud.google.com/resource-manager/docs/creating-managing-labels or
   * https://cloud.google.com/run/docs/configuring/labels
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. Result of the last attempt of this Task.
   */
  readonly lastAttemptResult?: GoogleCloudRunV2TaskAttemptResult;
  /**
   * Output only. URI where logs for this execution can be found in Cloud
   * Console.
   */
  readonly logUri?: string;
  /**
   * Number of retries allowed per Task, before marking this Task failed.
   */
  maxRetries?: number;
  /**
   * Output only. The unique name of this Task.
   */
  readonly name?: string;
  /**
   * Output only. The generation of this Task. See comments in
   * `Job.reconciling` for additional information on reconciliation process in
   * Cloud Run.
   */
  readonly observedGeneration?: bigint;
  /**
   * Output only. Indicates whether the resource's reconciliation is still in
   * progress. See comments in `Job.reconciling` for additional information on
   * reconciliation process in Cloud Run.
   */
  readonly reconciling?: boolean;
  /**
   * Output only. The number of times this Task was retried. Tasks are retried
   * when they fail up to the maxRetries limit.
   */
  readonly retried?: number;
  /**
   * Output only. Reserved for future use.
   */
  readonly satisfiesPzs?: boolean;
  /**
   * Email address of the IAM service account associated with the Task of a
   * Job. The service account represents the identity of the running task, and
   * determines what permissions the task has. If not provided, the task will
   * use the project's default service account.
   */
  serviceAccount?: string;
  /**
   * Output only. Represents time when the task started to run. It is not
   * guaranteed to be set in happens-before order across separate operations.
   */
  readonly startTime?: Date;
  /**
   * Max allowed time duration the Task may be active before the system will
   * actively try to mark it failed and kill associated containers. This applies
   * per attempt of a task, meaning each retry can run for the full timeout.
   */
  timeout?: number /* Duration */;
  /**
   * Output only. Server assigned unique identifier for the Task. The value is
   * a UUID4 string and guaranteed to remain unchanged until the resource is
   * deleted.
   */
  readonly uid?: string;
  /**
   * Output only. The last-modified time.
   */
  readonly updateTime?: Date;
  /**
   * A list of Volumes to make available to containers.
   */
  volumes?: GoogleCloudRunV2Volume[];
  /**
   * Output only. VPC Access configuration to use for this Task. For more
   * information, visit
   * https://cloud.google.com/run/docs/configuring/connecting-vpc.
   */
  readonly vpcAccess?: GoogleCloudRunV2VpcAccess;
}

function serializeGoogleCloudRunV2Task(data: any): GoogleCloudRunV2Task {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeGoogleCloudRunV2Task(data: any): GoogleCloudRunV2Task {
  return {
    ...data,
    completionTime: data["completionTime"] !== undefined ? new Date(data["completionTime"]) : undefined,
    conditions: data["conditions"] !== undefined ? data["conditions"].map((item: any) => (deserializeGoogleCloudRunV2Condition(item))) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deleteTime: data["deleteTime"] !== undefined ? new Date(data["deleteTime"]) : undefined,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
    observedGeneration: data["observedGeneration"] !== undefined ? BigInt(data["observedGeneration"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Result of a task attempt.
 */
export interface GoogleCloudRunV2TaskAttemptResult {
  /**
   * Output only. The exit code of this attempt. This may be unset if the
   * container was unable to exit cleanly with a code due to some other failure.
   * See status field for possible failure details.
   */
  readonly exitCode?: number;
  /**
   * Output only. The status of this attempt. If the status code is OK, then
   * the attempt succeeded.
   */
  readonly status?: GoogleRpcStatus;
}

/**
 * TaskTemplate describes the data a task should have when created from a
 * template.
 */
export interface GoogleCloudRunV2TaskTemplate {
  /**
   * Holds the single container that defines the unit of execution for this
   * task.
   */
  containers?: GoogleCloudRunV2Container[];
  /**
   * A reference to a customer managed encryption key (CMEK) to use to encrypt
   * this container image. For more information, go to
   * https://cloud.google.com/run/docs/securing/using-cmek
   */
  encryptionKey?: string;
  /**
   * The execution environment being used to host this Task.
   */
  executionEnvironment?:  | "EXECUTION_ENVIRONMENT_UNSPECIFIED" | "EXECUTION_ENVIRONMENT_GEN1" | "EXECUTION_ENVIRONMENT_GEN2";
  /**
   * Number of retries allowed per Task, before marking this Task failed.
   * Defaults to 3.
   */
  maxRetries?: number;
  /**
   * Email address of the IAM service account associated with the Task of a
   * Job. The service account represents the identity of the running task, and
   * determines what permissions the task has. If not provided, the task will
   * use the project's default service account.
   */
  serviceAccount?: string;
  /**
   * Max allowed time duration the Task may be active before the system will
   * actively try to mark it failed and kill associated containers. This applies
   * per attempt of a task, meaning each retry can run for the full timeout.
   * Defaults to 600 seconds.
   */
  timeout?: number /* Duration */;
  /**
   * A list of Volumes to make available to containers.
   */
  volumes?: GoogleCloudRunV2Volume[];
  /**
   * VPC Access configuration to use for this Task. For more information, visit
   * https://cloud.google.com/run/docs/configuring/connecting-vpc.
   */
  vpcAccess?: GoogleCloudRunV2VpcAccess;
}

function serializeGoogleCloudRunV2TaskTemplate(data: any): GoogleCloudRunV2TaskTemplate {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeGoogleCloudRunV2TaskTemplate(data: any): GoogleCloudRunV2TaskTemplate {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * TCPSocketAction describes an action based on opening a socket
 */
export interface GoogleCloudRunV2TCPSocketAction {
  /**
   * Port number to access on the container. Must be in the range 1 to 65535.
   * If not specified, defaults to the exposed port of the container, which is
   * the value of container.ports[0].containerPort.
   */
  port?: number;
}

/**
 * Holds a single traffic routing entry for the Service. Allocations can be
 * done to a specific Revision name, or pointing to the latest Ready Revision.
 */
export interface GoogleCloudRunV2TrafficTarget {
  /**
   * Specifies percent of the traffic to this Revision. This defaults to zero
   * if unspecified.
   */
  percent?: number;
  /**
   * Revision to which to send this portion of traffic, if traffic allocation
   * is by revision.
   */
  revision?: string;
  /**
   * Indicates a string to be part of the URI to exclusively reference this
   * target.
   */
  tag?: string;
  /**
   * The allocation type for this traffic target.
   */
  type?:  | "TRAFFIC_TARGET_ALLOCATION_TYPE_UNSPECIFIED" | "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST" | "TRAFFIC_TARGET_ALLOCATION_TYPE_REVISION";
}

/**
 * Represents the observed state of a single `TrafficTarget` entry.
 */
export interface GoogleCloudRunV2TrafficTargetStatus {
  /**
   * Specifies percent of the traffic to this Revision.
   */
  percent?: number;
  /**
   * Revision to which this traffic is sent.
   */
  revision?: string;
  /**
   * Indicates the string used in the URI to exclusively reference this target.
   */
  tag?: string;
  /**
   * The allocation type for this traffic target.
   */
  type?:  | "TRAFFIC_TARGET_ALLOCATION_TYPE_UNSPECIFIED" | "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST" | "TRAFFIC_TARGET_ALLOCATION_TYPE_REVISION";
  /**
   * Displays the target URI.
   */
  uri?: string;
}

/**
 * VersionToPath maps a specific version of a secret to a relative file to
 * mount to, relative to VolumeMount's mount_path.
 */
export interface GoogleCloudRunV2VersionToPath {
  /**
   * Integer octal mode bits to use on this file, must be a value between 01
   * and 0777 (octal). If 0 or not set, the Volume's default mode will be used.
   * Notes * Internally, a umask of 0222 will be applied to any non-zero value.
   * * This is an integer representation of the mode bits. So, the octal integer
   * value should look exactly as the chmod numeric notation with a leading
   * zero. Some examples: for chmod 777 (a=rwx), set to 0777 (octal) or 511
   * (base-10). For chmod 640 (u=rw,g=r), set to 0640 (octal) or 416 (base-10).
   * For chmod 755 (u=rwx,g=rx,o=rx), set to 0755 (octal) or 493 (base-10). *
   * This might be in conflict with other options that affect the file mode,
   * like fsGroup, and the result can be other mode bits set.
   */
  mode?: number;
  /**
   * Required. The relative path of the secret in the container.
   */
  path?: string;
  /**
   * The Cloud Secret Manager secret version. Can be 'latest' for the latest
   * value, or an integer or a secret alias for a specific version.
   */
  version?: string;
}

/**
 * Volume represents a named volume in a container.
 */
export interface GoogleCloudRunV2Volume {
  /**
   * For Cloud SQL volumes, contains the specific instances that should be
   * mounted. Visit https://cloud.google.com/sql/docs/mysql/connect-run for more
   * information on how to connect Cloud SQL and Cloud Run.
   */
  cloudSqlInstance?: GoogleCloudRunV2CloudSqlInstance;
  /**
   * Required. Volume's name.
   */
  name?: string;
  /**
   * Secret represents a secret that should populate this volume. More info:
   * https://kubernetes.io/docs/concepts/storage/volumes#secret
   */
  secret?: GoogleCloudRunV2SecretVolumeSource;
}

/**
 * VolumeMount describes a mounting of a Volume within a container.
 */
export interface GoogleCloudRunV2VolumeMount {
  /**
   * Required. Path within the container at which the volume should be mounted.
   * Must not contain ':'. For Cloud SQL volumes, it can be left empty, or must
   * otherwise be `/cloudsql`. All instances defined in the Volume will be
   * available as `/cloudsql/[instance]`. For more information on Cloud SQL
   * volumes, visit https://cloud.google.com/sql/docs/mysql/connect-run
   */
  mountPath?: string;
  /**
   * Required. This must match the Name of a Volume.
   */
  name?: string;
}

/**
 * VPC Access settings. For more information on creating a VPC Connector, visit
 * https://cloud.google.com/vpc/docs/configure-serverless-vpc-access For
 * information on how to configure Cloud Run with an existing VPC Connector,
 * visit https://cloud.google.com/run/docs/configuring/connecting-vpc
 */
export interface GoogleCloudRunV2VpcAccess {
  /**
   * VPC Access connector name. Format:
   * projects/{project}/locations/{location}/connectors/{connector}, where
   * {project} can be project id or number.
   */
  connector?: string;
  /**
   * Traffic VPC egress settings.
   */
  egress?:  | "VPC_EGRESS_UNSPECIFIED" | "ALL_TRAFFIC" | "PRIVATE_RANGES_ONLY";
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
export interface GoogleIamV1AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: GoogleIamV1AuditLogConfig[];
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
export interface GoogleIamV1AuditLogConfig {
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
export interface GoogleIamV1Binding {
  /**
   * The condition that is associated with this binding. If the condition
   * evaluates to `true`, then this binding applies to the current request. If
   * the condition evaluates to `false`, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding. To learn which
   * resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: GoogleTypeExpr;
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
export interface GoogleIamV1Policy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: GoogleIamV1AuditConfig[];
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
  bindings?: GoogleIamV1Binding[];
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

function serializeGoogleIamV1Policy(data: any): GoogleIamV1Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializeGoogleIamV1Policy(data: any): GoogleIamV1Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * Request message for `SetIamPolicy` method.
 */
export interface GoogleIamV1SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: GoogleIamV1Policy;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify.
   * Only the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used: `paths: "bindings, etag"`
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleIamV1SetIamPolicyRequest(data: any): GoogleIamV1SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeGoogleIamV1Policy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleIamV1SetIamPolicyRequest(data: any): GoogleIamV1SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializeGoogleIamV1Policy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request message for `TestIamPermissions` method.
 */
export interface GoogleIamV1TestIamPermissionsRequest {
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
export interface GoogleIamV1TestIamPermissionsResponse {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
   */
  permissions?: string[];
}

/**
 * The response message for Operations.ListOperations.
 */
export interface GoogleLongrunningListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: GoogleLongrunningOperation[];
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface GoogleLongrunningOperation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: GoogleRpcStatus;
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
 * The request message for Operations.WaitOperation.
 */
export interface GoogleLongrunningWaitOperationRequest {
  /**
   * The maximum duration to wait before timing out. If left blank, the wait
   * will be at most the time permitted by the underlying HTTP/RPC protocol. If
   * RPC context deadline is also specified, the shorter one will be used.
   */
  timeout?: number /* Duration */;
}

function serializeGoogleLongrunningWaitOperationRequest(data: any): GoogleLongrunningWaitOperationRequest {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeGoogleLongrunningWaitOperationRequest(data: any): GoogleLongrunningWaitOperationRequest {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
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
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
 */
export interface GoogleRpcStatus {
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
 * Additional options for Run#projectsLocationsJobsCreate.
 */
export interface ProjectsLocationsJobsCreateOptions {
  /**
   * Required. The unique identifier for the Job. The name of the job becomes
   * {parent}/jobs/{job_id}.
   */
  jobId?: string;
  /**
   * Indicates that the request should be validated and default values
   * populated, without persisting the request or creating any resources.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Run#projectsLocationsJobsDelete.
 */
export interface ProjectsLocationsJobsDeleteOptions {
  /**
   * A system-generated fingerprint for this version of the resource. May be
   * used to detect modification conflict during updates.
   */
  etag?: string;
  /**
   * Indicates that the request should be validated without actually deleting
   * any resources.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Run#projectsLocationsJobsExecutionsDelete.
 */
export interface ProjectsLocationsJobsExecutionsDeleteOptions {
  /**
   * A system-generated fingerprint for this version of the resource. This may
   * be used to detect modification conflict during updates.
   */
  etag?: string;
  /**
   * Indicates that the request should be validated without actually deleting
   * any resources.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Run#projectsLocationsJobsExecutionsList.
 */
export interface ProjectsLocationsJobsExecutionsListOptions {
  /**
   * Maximum number of Executions to return in this call.
   */
  pageSize?: number;
  /**
   * A page token received from a previous call to ListExecutions. All other
   * parameters must match.
   */
  pageToken?: string;
  /**
   * If true, returns deleted (but unexpired) resources along with active ones.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for Run#projectsLocationsJobsExecutionsTasksList.
 */
export interface ProjectsLocationsJobsExecutionsTasksListOptions {
  /**
   * Maximum number of Tasks to return in this call.
   */
  pageSize?: number;
  /**
   * A page token received from a previous call to ListTasks. All other
   * parameters must match.
   */
  pageToken?: string;
  /**
   * If true, returns deleted (but unexpired) resources along with active ones.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for Run#projectsLocationsJobsGetIamPolicy.
 */
export interface ProjectsLocationsJobsGetIamPolicyOptions {
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
 * Additional options for Run#projectsLocationsJobsList.
 */
export interface ProjectsLocationsJobsListOptions {
  /**
   * Maximum number of Jobs to return in this call.
   */
  pageSize?: number;
  /**
   * A page token received from a previous call to ListJobs. All other
   * parameters must match.
   */
  pageToken?: string;
  /**
   * If true, returns deleted (but unexpired) resources along with active ones.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for Run#projectsLocationsJobsPatch.
 */
export interface ProjectsLocationsJobsPatchOptions {
  /**
   * If set to true, and if the Job does not exist, it will create a new one.
   * Caller must have both create and update permissions for this call if this
   * is set to true.
   */
  allowMissing?: boolean;
  /**
   * Indicates that the request should be validated and default values
   * populated, without persisting the request or updating any resources.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Run#projectsLocationsOperationsList.
 */
export interface ProjectsLocationsOperationsListOptions {
  /**
   * Optional. A filter for matching the completed or in-progress operations.
   * The supported formats of *filter* are: To query for only completed
   * operations: done:true To query for only ongoing operations: done:false Must
   * be empty to query for all of the latest operations for the given parent
   * project.
   */
  filter?: string;
  /**
   * The maximum number of records that should be returned. Requested page size
   * cannot exceed 100. If not set or set to less than or equal to 0, the
   * default page size is 100. .
   */
  pageSize?: number;
  /**
   * Token identifying which result to start with, which is returned by a
   * previous list call.
   */
  pageToken?: string;
}

/**
 * Additional options for Run#projectsLocationsServicesCreate.
 */
export interface ProjectsLocationsServicesCreateOptions {
  /**
   * Required. The unique identifier for the Service. It must begin with
   * letter, and cannot end with hyphen; must contain fewer than 50 characters.
   * The name of the service becomes {parent}/services/{service_id}.
   */
  serviceId?: string;
  /**
   * Indicates that the request should be validated and default values
   * populated, without persisting the request or creating any resources.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Run#projectsLocationsServicesDelete.
 */
export interface ProjectsLocationsServicesDeleteOptions {
  /**
   * A system-generated fingerprint for this version of the resource. May be
   * used to detect modification conflict during updates.
   */
  etag?: string;
  /**
   * Indicates that the request should be validated without actually deleting
   * any resources.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Run#projectsLocationsServicesGetIamPolicy.
 */
export interface ProjectsLocationsServicesGetIamPolicyOptions {
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
 * Additional options for Run#projectsLocationsServicesList.
 */
export interface ProjectsLocationsServicesListOptions {
  /**
   * Maximum number of Services to return in this call.
   */
  pageSize?: number;
  /**
   * A page token received from a previous call to ListServices. All other
   * parameters must match.
   */
  pageToken?: string;
  /**
   * If true, returns deleted (but unexpired) resources along with active ones.
   */
  showDeleted?: boolean;
}

/**
 * Additional options for Run#projectsLocationsServicesPatch.
 */
export interface ProjectsLocationsServicesPatchOptions {
  /**
   * If set to true, and if the Service does not exist, it will create a new
   * one. Caller must have both create and update permissions for this call if
   * this is set to true.
   */
  allowMissing?: boolean;
  /**
   * Indicates that the request should be validated and default values
   * populated, without persisting the request or updating any resources.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Run#projectsLocationsServicesRevisionsDelete.
 */
export interface ProjectsLocationsServicesRevisionsDeleteOptions {
  /**
   * A system-generated fingerprint for this version of the resource. This may
   * be used to detect modification conflict during updates.
   */
  etag?: string;
  /**
   * Indicates that the request should be validated without actually deleting
   * any resources.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Run#projectsLocationsServicesRevisionsList.
 */
export interface ProjectsLocationsServicesRevisionsListOptions {
  /**
   * Maximum number of revisions to return in this call.
   */
  pageSize?: number;
  /**
   * A page token received from a previous call to ListRevisions. All other
   * parameters must match.
   */
  pageToken?: string;
  /**
   * If true, returns deleted (but unexpired) resources along with active ones.
   */
  showDeleted?: boolean;
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
