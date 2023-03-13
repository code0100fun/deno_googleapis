// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Dataproc API Client for Deno
 * ==================================
 * 
 * Manages Hadoop-based clusters and jobs on Google Cloud Platform.
 * 
 * Docs: https://cloud.google.com/dataproc/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages Hadoop-based clusters and jobs on Google Cloud Platform.
 */
export class Dataproc {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://dataproc.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates new autoscaling policy.
   *
   * @param parent Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.create, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.create, the resource name of the location has the following format: projects/{project_id}/locations/{location}
   */
  async projectsLocationsAutoscalingPoliciesCreate(parent: string, req: AutoscalingPolicy): Promise<AutoscalingPolicy> {
    req = serializeAutoscalingPolicy(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/autoscalingPolicies`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAutoscalingPolicy(data);
  }

  /**
   * Deletes an autoscaling policy. It is an error to delete an autoscaling
   * policy that is in use by one or more clusters.
   *
   * @param name Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.delete, the resource name of the policy has the following format: projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.delete, the resource name of the policy has the following format: projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
   */
  async projectsLocationsAutoscalingPoliciesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Retrieves autoscaling policy.
   *
   * @param name Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.get, the resource name of the policy has the following format: projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.get, the resource name of the policy has the following format: projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
   */
  async projectsLocationsAutoscalingPoliciesGet(name: string): Promise<AutoscalingPolicy> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAutoscalingPolicy(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsAutoscalingPoliciesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists autoscaling policies in the project.
   *
   * @param parent Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.list, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.list, the resource name of the location has the following format: projects/{project_id}/locations/{location}
   */
  async projectsLocationsAutoscalingPoliciesList(parent: string, opts: ProjectsLocationsAutoscalingPoliciesListOptions = {}): Promise<ListAutoscalingPoliciesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/autoscalingPolicies`);
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
    return data as ListAutoscalingPoliciesResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsAutoscalingPoliciesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsAutoscalingPoliciesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Updates (replaces) autoscaling policy.Disabled check for update_mask,
   * because all updates will be full replacements.
   *
   * @param name Output only. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies, the resource name of the policy has the following format: projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies, the resource name of the policy has the following format: projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
   */
  async projectsLocationsAutoscalingPoliciesUpdate(name: string, req: AutoscalingPolicy): Promise<AutoscalingPolicy> {
    req = serializeAutoscalingPolicy(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeAutoscalingPolicy(data);
  }

  /**
   * Creates a batch workload that executes asynchronously.
   *
   * @param parent Required. The parent resource where this batch will be created.
   */
  async projectsLocationsBatchesCreate(parent: string, req: Batch, opts: ProjectsLocationsBatchesCreateOptions = {}): Promise<Operation> {
    req = serializeBatch(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/batches`);
    if (opts.batchId !== undefined) {
      url.searchParams.append("batchId", String(opts.batchId));
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
   * Deletes the batch workload resource. If the batch is not in terminal
   * state, the delete fails and the response returns FAILED_PRECONDITION.
   *
   * @param name Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID"
   */
  async projectsLocationsBatchesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the batch workload resource representation.
   *
   * @param name Required. The fully qualified name of the batch to retrieve in the format "projects/PROJECT_ID/locations/DATAPROC_REGION/batches/BATCH_ID"
   */
  async projectsLocationsBatchesGet(name: string): Promise<Batch> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBatch(data);
  }

  /**
   * Lists batch workloads.
   *
   * @param parent Required. The parent, which owns this collection of batches.
   */
  async projectsLocationsBatchesList(parent: string, opts: ProjectsLocationsBatchesListOptions = {}): Promise<ListBatchesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/batches`);
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
    return deserializeListBatchesResponse(data);
  }

  /**
   * Starts asynchronous cancellation on a long-running operation. The server
   * makes a best effort to cancel the operation, but success is not guaranteed.
   * If the server doesn't support this method, it returns
   * google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * Code.CANCELLED.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async projectsLocationsOperationsCancel(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * google.rpc.Code.UNIMPLEMENTED.
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
   * server doesn't support this method, it returns UNIMPLEMENTED.NOTE: the name
   * binding allows API services to override the binding to use different
   * resource name schemes, such as users/*\/operations. To override the
   * binding, API services can add a binding such as
   * "/v1/{name=users/*}/operations" to their service configuration. For
   * backwards compatibility, the default name includes the operations
   * collection id, however overriding users must ensure the name binding is the
   * parent resource, without the operations collection id.
   *
   * @param name The name of the operation's parent resource.
   */
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * Creates new workflow template.
   *
   * @param parent Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.create, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.create, the resource name of the location has the following format: projects/{project_id}/locations/{location}
   */
  async projectsLocationsWorkflowTemplatesCreate(parent: string, req: WorkflowTemplate): Promise<WorkflowTemplate> {
    req = serializeWorkflowTemplate(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/workflowTemplates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeWorkflowTemplate(data);
  }

  /**
   * Deletes a workflow template. It does not cancel in-progress workflows.
   *
   * @param name Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.delete, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
   */
  async projectsLocationsWorkflowTemplatesDelete(name: string, opts: ProjectsLocationsWorkflowTemplatesDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.version !== undefined) {
      url.searchParams.append("version", String(opts.version));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Retrieves the latest workflow template.Can retrieve previously
   * instantiated template by specifying optional version parameter.
   *
   * @param name Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.get, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.get, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
   */
  async projectsLocationsWorkflowTemplatesGet(name: string, opts: ProjectsLocationsWorkflowTemplatesGetOptions = {}): Promise<WorkflowTemplate> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.version !== undefined) {
      url.searchParams.append("version", String(opts.version));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeWorkflowTemplate(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsWorkflowTemplatesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Instantiates a template and begins execution.The returned Operation can be
   * used to track execution of workflow by polling operations.get. The
   * Operation will complete when entire workflow is finished.The running
   * workflow can be aborted via operations.cancel. This will cause any inflight
   * jobs to be cancelled and workflow-owned clusters to be deleted.The
   * Operation.metadata will be WorkflowMetadata
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#workflowmetadata).
   * Also see Using WorkflowMetadata
   * (https://cloud.google.com/dataproc/docs/concepts/workflows/debugging#using_workflowmetadata).On
   * successful completion, Operation.response will be Empty.
   *
   * @param name Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.instantiate, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
   */
  async projectsLocationsWorkflowTemplatesInstantiate(name: string, req: InstantiateWorkflowTemplateRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:instantiate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Instantiates a template and begins execution.This method is equivalent to
   * executing the sequence CreateWorkflowTemplate, InstantiateWorkflowTemplate,
   * DeleteWorkflowTemplate.The returned Operation can be used to track
   * execution of workflow by polling operations.get. The Operation will
   * complete when entire workflow is finished.The running workflow can be
   * aborted via operations.cancel. This will cause any inflight jobs to be
   * cancelled and workflow-owned clusters to be deleted.The Operation.metadata
   * will be WorkflowMetadata
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#workflowmetadata).
   * Also see Using WorkflowMetadata
   * (https://cloud.google.com/dataproc/docs/concepts/workflows/debugging#using_workflowmetadata).On
   * successful completion, Operation.response will be Empty.
   *
   * @param parent Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,instantiateinline, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.instantiateinline, the resource name of the location has the following format: projects/{project_id}/locations/{location}
   */
  async projectsLocationsWorkflowTemplatesInstantiateInline(parent: string, req: WorkflowTemplate, opts: ProjectsLocationsWorkflowTemplatesInstantiateInlineOptions = {}): Promise<Operation> {
    req = serializeWorkflowTemplate(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/workflowTemplates:instantiateInline`);
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
   * Lists workflows that match the specified filter in the request.
   *
   * @param parent Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,list, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.list, the resource name of the location has the following format: projects/{project_id}/locations/{location}
   */
  async projectsLocationsWorkflowTemplatesList(parent: string, opts: ProjectsLocationsWorkflowTemplatesListOptions = {}): Promise<ListWorkflowTemplatesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/workflowTemplates`);
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
    return data as ListWorkflowTemplatesResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsWorkflowTemplatesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsWorkflowTemplatesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Updates (replaces) workflow template. The updated template must contain
   * version that matches the current server version.
   *
   * @param name Output only. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
   */
  async projectsLocationsWorkflowTemplatesUpdate(name: string, req: WorkflowTemplate): Promise<WorkflowTemplate> {
    req = serializeWorkflowTemplate(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeWorkflowTemplate(data);
  }

  /**
   * Creates new autoscaling policy.
   *
   * @param parent Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.create, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.create, the resource name of the location has the following format: projects/{project_id}/locations/{location}
   */
  async projectsRegionsAutoscalingPoliciesCreate(parent: string, req: AutoscalingPolicy): Promise<AutoscalingPolicy> {
    req = serializeAutoscalingPolicy(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/autoscalingPolicies`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAutoscalingPolicy(data);
  }

  /**
   * Deletes an autoscaling policy. It is an error to delete an autoscaling
   * policy that is in use by one or more clusters.
   *
   * @param name Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.delete, the resource name of the policy has the following format: projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.delete, the resource name of the policy has the following format: projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
   */
  async projectsRegionsAutoscalingPoliciesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Retrieves autoscaling policy.
   *
   * @param name Required. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.get, the resource name of the policy has the following format: projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies.get, the resource name of the policy has the following format: projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
   */
  async projectsRegionsAutoscalingPoliciesGet(name: string): Promise<AutoscalingPolicy> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAutoscalingPolicy(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsAutoscalingPoliciesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists autoscaling policies in the project.
   *
   * @param parent Required. The "resource name" of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies.list, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.autoscalingPolicies.list, the resource name of the location has the following format: projects/{project_id}/locations/{location}
   */
  async projectsRegionsAutoscalingPoliciesList(parent: string, opts: ProjectsRegionsAutoscalingPoliciesListOptions = {}): Promise<ListAutoscalingPoliciesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/autoscalingPolicies`);
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
    return data as ListAutoscalingPoliciesResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsAutoscalingPoliciesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsAutoscalingPoliciesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Updates (replaces) autoscaling policy.Disabled check for update_mask,
   * because all updates will be full replacements.
   *
   * @param name Output only. The "resource name" of the autoscaling policy, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.autoscalingPolicies, the resource name of the policy has the following format: projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For projects.locations.autoscalingPolicies, the resource name of the policy has the following format: projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
   */
  async projectsRegionsAutoscalingPoliciesUpdate(name: string, req: AutoscalingPolicy): Promise<AutoscalingPolicy> {
    req = serializeAutoscalingPolicy(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeAutoscalingPolicy(data);
  }

  /**
   * Creates a cluster in a project. The returned Operation.metadata will be
   * ClusterOperationMetadata
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#clusteroperationmetadata).
   *
   * @param projectId Required. The ID of the Google Cloud Platform project that the cluster belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsClustersCreate(projectId: string, region: string, req: Cluster, opts: ProjectsRegionsClustersCreateOptions = {}): Promise<Operation> {
    req = serializeCluster(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/clusters`);
    if (opts.actionOnFailedPrimaryWorkers !== undefined) {
      url.searchParams.append("actionOnFailedPrimaryWorkers", String(opts.actionOnFailedPrimaryWorkers));
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
   * Deletes a cluster in a project. The returned Operation.metadata will be
   * ClusterOperationMetadata
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#clusteroperationmetadata).
   *
   * @param clusterName Required. The cluster name.
   * @param projectId Required. The ID of the Google Cloud Platform project that the cluster belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsClustersDelete(clusterName: string, projectId: string, region: string, opts: ProjectsRegionsClustersDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/clusters/${ clusterName }`);
    if (opts.clusterUuid !== undefined) {
      url.searchParams.append("clusterUuid", String(opts.clusterUuid));
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
   * Gets cluster diagnostic information. The returned Operation.metadata will
   * be ClusterOperationMetadata
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#clusteroperationmetadata).
   * After the operation completes, Operation.response contains
   * DiagnoseClusterResults
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#diagnoseclusterresults).
   *
   * @param clusterName Required. The cluster name.
   * @param projectId Required. The ID of the Google Cloud Platform project that the cluster belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsClustersDiagnose(clusterName: string, projectId: string, region: string, req: DiagnoseClusterRequest): Promise<Operation> {
    req = serializeDiagnoseClusterRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/clusters/${ clusterName }:diagnose`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the resource representation for a cluster in a project.
   *
   * @param clusterName Required. The cluster name.
   * @param projectId Required. The ID of the Google Cloud Platform project that the cluster belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsClustersGet(clusterName: string, projectId: string, region: string): Promise<Cluster> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/clusters/${ clusterName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCluster(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsClustersGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Inject encrypted credentials into all of the VMs in a cluster.The target
   * cluster must be a personal auth cluster assigned to the user who is issuing
   * the RPC.
   *
   * @param cluster Required. The cluster, in the form clusters/.
   * @param project Required. The ID of the Google Cloud Platform project the cluster belongs to, of the form projects/.
   * @param region Required. The region containing the cluster, of the form regions/.
   */
  async projectsRegionsClustersInjectCredentials(cluster: string, project: string, region: string, req: InjectCredentialsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ project }/${ region }/${ cluster }:injectCredentials`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists all regions/{region}/clusters in a project alphabetically.
   *
   * @param projectId Required. The ID of the Google Cloud Platform project that the cluster belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsClustersList(projectId: string, region: string, opts: ProjectsRegionsClustersListOptions = {}): Promise<ListClustersResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/clusters`);
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
    return data as ListClustersResponse;
  }

  /**
   * Creates a node group in a cluster. The returned Operation.metadata is
   * NodeGroupOperationMetadata
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#nodegroupoperationmetadata).
   *
   * @param parent Required. The parent resource where this node group will be created. Format: projects/{project}/regions/{region}/clusters/{cluster}
   */
  async projectsRegionsClustersNodeGroupsCreate(parent: string, req: NodeGroup, opts: ProjectsRegionsClustersNodeGroupsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/nodeGroups`);
    if (opts.nodeGroupId !== undefined) {
      url.searchParams.append("nodeGroupId", String(opts.nodeGroupId));
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
   * Gets the resource representation for a node group in a cluster.
   *
   * @param name Required. The name of the node group to retrieve. Format: projects/{project}/regions/{region}/clusters/{cluster}/nodeGroups/{nodeGroup}
   */
  async projectsRegionsClustersNodeGroupsGet(name: string): Promise<NodeGroup> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as NodeGroup;
  }

  /**
   * Resizes a node group in a cluster. The returned Operation.metadata is
   * NodeGroupOperationMetadata
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#nodegroupoperationmetadata).
   *
   * @param name Required. The name of the node group to resize. Format: projects/{project}/regions/{region}/clusters/{cluster}/nodeGroups/{nodeGroup}
   */
  async projectsRegionsClustersNodeGroupsResize(name: string, req: ResizeNodeGroupRequest): Promise<Operation> {
    req = serializeResizeNodeGroupRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:resize`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates a cluster in a project. The returned Operation.metadata will be
   * ClusterOperationMetadata
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#clusteroperationmetadata).
   * The cluster must be in a RUNNING state or an error is returned.
   *
   * @param clusterName Required. The cluster name.
   * @param projectId Required. The ID of the Google Cloud Platform project the cluster belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsClustersPatch(clusterName: string, projectId: string, region: string, req: Cluster, opts: ProjectsRegionsClustersPatchOptions = {}): Promise<Operation> {
    req = serializeCluster(req);
    opts = serializeProjectsRegionsClustersPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/clusters/${ clusterName }`);
    if (opts.gracefulDecommissionTimeout !== undefined) {
      url.searchParams.append("gracefulDecommissionTimeout", String(opts.gracefulDecommissionTimeout));
    }
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
   * Repairs a cluster.
   *
   * @param clusterName Required. The cluster name.
   * @param projectId Required. The ID of the Google Cloud Platform project the cluster belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsClustersRepair(clusterName: string, projectId: string, region: string, req: RepairClusterRequest): Promise<Operation> {
    req = serializeRepairClusterRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/clusters/${ clusterName }:repair`);
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
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsClustersSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Starts a cluster in a project.
   *
   * @param clusterName Required. The cluster name.
   * @param projectId Required. The ID of the Google Cloud Platform project the cluster belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsClustersStart(clusterName: string, projectId: string, region: string, req: StartClusterRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/clusters/${ clusterName }:start`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Stops a cluster in a project.
   *
   * @param clusterName Required. The cluster name.
   * @param projectId Required. The ID of the Google Cloud Platform project the cluster belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsClustersStop(clusterName: string, projectId: string, region: string, req: StopClusterRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/clusters/${ clusterName }:stop`);
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
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsClustersTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Starts a job cancellation request. To access the job resource after
   * cancellation, call regions/{region}/jobs.list
   * (https://cloud.google.com/dataproc/docs/reference/rest/v1/projects.regions.jobs/list)
   * or regions/{region}/jobs.get
   * (https://cloud.google.com/dataproc/docs/reference/rest/v1/projects.regions.jobs/get).
   *
   * @param jobId Required. The job ID.
   * @param projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsJobsCancel(jobId: string, projectId: string, region: string, req: CancelJobRequest): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/jobs/${ jobId }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Job;
  }

  /**
   * Deletes the job from the project. If the job is active, the delete fails,
   * and the response returns FAILED_PRECONDITION.
   *
   * @param jobId Required. The job ID.
   * @param projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsJobsDelete(jobId: string, projectId: string, region: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/jobs/${ jobId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the resource representation for a job in a project.
   *
   * @param jobId Required. The job ID.
   * @param projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsJobsGet(jobId: string, projectId: string, region: string): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/jobs/${ jobId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Job;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsJobsGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists regions/{region}/jobs in a project.
   *
   * @param projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsJobsList(projectId: string, region: string, opts: ProjectsRegionsJobsListOptions = {}): Promise<ListJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/jobs`);
    if (opts.clusterName !== undefined) {
      url.searchParams.append("clusterName", String(opts.clusterName));
    }
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.jobStateMatcher !== undefined) {
      url.searchParams.append("jobStateMatcher", String(opts.jobStateMatcher));
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
    return data as ListJobsResponse;
  }

  /**
   * Updates a job in a project.
   *
   * @param jobId Required. The job ID.
   * @param projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsJobsPatch(jobId: string, projectId: string, region: string, req: Job, opts: ProjectsRegionsJobsPatchOptions = {}): Promise<Job> {
    opts = serializeProjectsRegionsJobsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/jobs/${ jobId }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Job;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsJobsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Submits a job to a cluster.
   *
   * @param projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsJobsSubmit(projectId: string, region: string, req: SubmitJobRequest): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/jobs:submit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Job;
  }

  /**
   * Submits job to a cluster.
   *
   * @param projectId Required. The ID of the Google Cloud Platform project that the job belongs to.
   * @param region Required. The Dataproc region in which to handle the request.
   */
  async projectsRegionsJobsSubmitAsOperation(projectId: string, region: string, req: SubmitJobRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/regions/${ region }/jobs:submitAsOperation`);
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
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsJobsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Starts asynchronous cancellation on a long-running operation. The server
   * makes a best effort to cancel the operation, but success is not guaranteed.
   * If the server doesn't support this method, it returns
   * google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * Code.CANCELLED.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async projectsRegionsOperationsCancel(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Empty;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * google.rpc.Code.UNIMPLEMENTED.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async projectsRegionsOperationsDelete(name: string): Promise<Empty> {
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
  async projectsRegionsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsOperationsGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns UNIMPLEMENTED.NOTE: the name
   * binding allows API services to override the binding to use different
   * resource name schemes, such as users/*\/operations. To override the
   * binding, API services can add a binding such as
   * "/v1/{name=users/*}/operations" to their service configuration. For
   * backwards compatibility, the default name includes the operations
   * collection id, however overriding users must ensure the name binding is the
   * parent resource, without the operations collection id.
   *
   * @param name The name of the operation's parent resource.
   */
  async projectsRegionsOperationsList(name: string, opts: ProjectsRegionsOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsOperationsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsOperationsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates new workflow template.
   *
   * @param parent Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.create, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.create, the resource name of the location has the following format: projects/{project_id}/locations/{location}
   */
  async projectsRegionsWorkflowTemplatesCreate(parent: string, req: WorkflowTemplate): Promise<WorkflowTemplate> {
    req = serializeWorkflowTemplate(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/workflowTemplates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeWorkflowTemplate(data);
  }

  /**
   * Deletes a workflow template. It does not cancel in-progress workflows.
   *
   * @param name Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.delete, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
   */
  async projectsRegionsWorkflowTemplatesDelete(name: string, opts: ProjectsRegionsWorkflowTemplatesDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.version !== undefined) {
      url.searchParams.append("version", String(opts.version));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Retrieves the latest workflow template.Can retrieve previously
   * instantiated template by specifying optional version parameter.
   *
   * @param name Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.get, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.get, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
   */
  async projectsRegionsWorkflowTemplatesGet(name: string, opts: ProjectsRegionsWorkflowTemplatesGetOptions = {}): Promise<WorkflowTemplate> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.version !== undefined) {
      url.searchParams.append("version", String(opts.version));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeWorkflowTemplate(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsWorkflowTemplatesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Instantiates a template and begins execution.The returned Operation can be
   * used to track execution of workflow by polling operations.get. The
   * Operation will complete when entire workflow is finished.The running
   * workflow can be aborted via operations.cancel. This will cause any inflight
   * jobs to be cancelled and workflow-owned clusters to be deleted.The
   * Operation.metadata will be WorkflowMetadata
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#workflowmetadata).
   * Also see Using WorkflowMetadata
   * (https://cloud.google.com/dataproc/docs/concepts/workflows/debugging#using_workflowmetadata).On
   * successful completion, Operation.response will be Empty.
   *
   * @param name Required. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates.instantiate, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates.instantiate, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
   */
  async projectsRegionsWorkflowTemplatesInstantiate(name: string, req: InstantiateWorkflowTemplateRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:instantiate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Instantiates a template and begins execution.This method is equivalent to
   * executing the sequence CreateWorkflowTemplate, InstantiateWorkflowTemplate,
   * DeleteWorkflowTemplate.The returned Operation can be used to track
   * execution of workflow by polling operations.get. The Operation will
   * complete when entire workflow is finished.The running workflow can be
   * aborted via operations.cancel. This will cause any inflight jobs to be
   * cancelled and workflow-owned clusters to be deleted.The Operation.metadata
   * will be WorkflowMetadata
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#workflowmetadata).
   * Also see Using WorkflowMetadata
   * (https://cloud.google.com/dataproc/docs/concepts/workflows/debugging#using_workflowmetadata).On
   * successful completion, Operation.response will be Empty.
   *
   * @param parent Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,instantiateinline, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.instantiateinline, the resource name of the location has the following format: projects/{project_id}/locations/{location}
   */
  async projectsRegionsWorkflowTemplatesInstantiateInline(parent: string, req: WorkflowTemplate, opts: ProjectsRegionsWorkflowTemplatesInstantiateInlineOptions = {}): Promise<Operation> {
    req = serializeWorkflowTemplate(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/workflowTemplates:instantiateInline`);
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
   * Lists workflows that match the specified filter in the request.
   *
   * @param parent Required. The resource name of the region or location, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates,list, the resource name of the region has the following format: projects/{project_id}/regions/{region} For projects.locations.workflowTemplates.list, the resource name of the location has the following format: projects/{project_id}/locations/{location}
   */
  async projectsRegionsWorkflowTemplatesList(parent: string, opts: ProjectsRegionsWorkflowTemplatesListOptions = {}): Promise<ListWorkflowTemplatesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/workflowTemplates`);
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
    return data as ListWorkflowTemplatesResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsWorkflowTemplatesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsRegionsWorkflowTemplatesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Updates (replaces) workflow template. The updated template must contain
   * version that matches the current server version.
   *
   * @param name Output only. The resource name of the workflow template, as described in https://cloud.google.com/apis/design/resource_names. For projects.regions.workflowTemplates, the resource name of the template has the following format: projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For projects.locations.workflowTemplates, the resource name of the template has the following format: projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
   */
  async projectsRegionsWorkflowTemplatesUpdate(name: string, req: WorkflowTemplate): Promise<WorkflowTemplate> {
    req = serializeWorkflowTemplate(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeWorkflowTemplate(data);
  }
}

/**
 * Specifies the type and number of accelerator cards attached to the instances
 * of an instance. See GPUs on Compute Engine
 * (https://cloud.google.com/compute/docs/gpus/).
 */
export interface AcceleratorConfig {
  /**
   * The number of the accelerator cards of this type exposed to this instance.
   */
  acceleratorCount?: number;
  /**
   * Full URL, partial URI, or short name of the accelerator type resource to
   * expose to this instance. See Compute Engine AcceleratorTypes
   * (https://cloud.google.com/compute/docs/reference/v1/acceleratorTypes).Examples:
   * https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/acceleratorTypes/nvidia-tesla-k80
   * projects/[project_id]/zones/[zone]/acceleratorTypes/nvidia-tesla-k80
   * nvidia-tesla-k80Auto Zone Exception: If you are using the Dataproc Auto
   * Zone Placement
   * (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement)
   * feature, you must use the short name of the accelerator type resource, for
   * example, nvidia-tesla-k80.
   */
  acceleratorTypeUri?: string;
}

/**
 * Autoscaling Policy config associated with the cluster.
 */
export interface AutoscalingConfig {
  /**
   * Optional. The autoscaling policy used by the cluster.Only resource names
   * including projectid and location (region) are valid. Examples:
   * https://www.googleapis.com/compute/v1/projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]
   * projects/[project_id]/locations/[dataproc_region]/autoscalingPolicies/[policy_id]Note
   * that the policy must be in the same project and Dataproc region.
   */
  policyUri?: string;
}

/**
 * Describes an autoscaling policy for Dataproc cluster autoscaler.
 */
export interface AutoscalingPolicy {
  basicAlgorithm?: BasicAutoscalingAlgorithm;
  /**
   * Required. The policy id.The id must contain only letters (a-z, A-Z),
   * numbers (0-9), underscores (_), and hyphens (-). Cannot begin or end with
   * underscore or hyphen. Must consist of between 3 and 50 characters.
   */
  id?: string;
  /**
   * Optional. The labels to associate with this autoscaling policy. Label keys
   * must contain 1 to 63 characters, and must conform to RFC 1035
   * (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if
   * present, must contain 1 to 63 characters, and must conform to RFC 1035
   * (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be
   * associated with an autoscaling policy.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The "resource name" of the autoscaling policy, as described
   * in https://cloud.google.com/apis/design/resource_names. For
   * projects.regions.autoscalingPolicies, the resource name of the policy has
   * the following format:
   * projects/{project_id}/regions/{region}/autoscalingPolicies/{policy_id} For
   * projects.locations.autoscalingPolicies, the resource name of the policy has
   * the following format:
   * projects/{project_id}/locations/{location}/autoscalingPolicies/{policy_id}
   */
  readonly name?: string;
  /**
   * Optional. Describes how the autoscaler will operate for secondary workers.
   */
  secondaryWorkerConfig?: InstanceGroupAutoscalingPolicyConfig;
  /**
   * Required. Describes how the autoscaler will operate for primary workers.
   */
  workerConfig?: InstanceGroupAutoscalingPolicyConfig;
}

function serializeAutoscalingPolicy(data: any): AutoscalingPolicy {
  return {
    ...data,
    basicAlgorithm: data["basicAlgorithm"] !== undefined ? serializeBasicAutoscalingAlgorithm(data["basicAlgorithm"]) : undefined,
  };
}

function deserializeAutoscalingPolicy(data: any): AutoscalingPolicy {
  return {
    ...data,
    basicAlgorithm: data["basicAlgorithm"] !== undefined ? deserializeBasicAutoscalingAlgorithm(data["basicAlgorithm"]) : undefined,
  };
}

/**
 * Node group identification and configuration information.
 */
export interface AuxiliaryNodeGroup {
  /**
   * Required. Node group configuration.
   */
  nodeGroup?: NodeGroup;
  /**
   * Optional. A node group ID. Generated if not specified.The ID must contain
   * only letters (a-z, A-Z), numbers (0-9), underscores (_), and hyphens (-).
   * Cannot begin or end with underscore or hyphen. Must consist of from 3 to 33
   * characters.
   */
  nodeGroupId?: string;
}

/**
 * Auxiliary services configuration for a Cluster.
 */
export interface AuxiliaryServicesConfig {
  /**
   * Optional. The Hive Metastore configuration for this workload.
   */
  metastoreConfig?: MetastoreConfig;
  /**
   * Optional. The Spark History Server configuration for the workload.
   */
  sparkHistoryServerConfig?: SparkHistoryServerConfig;
}

/**
 * Basic algorithm for autoscaling.
 */
export interface BasicAutoscalingAlgorithm {
  /**
   * Optional. Duration between scaling events. A scaling period starts after
   * the update operation from the previous event has completed.Bounds: 2m, 1d.
   * Default: 2m.
   */
  cooldownPeriod?: number /* Duration */;
  /**
   * Optional. Spark Standalone autoscaling configuration
   */
  sparkStandaloneConfig?: SparkStandaloneAutoscalingConfig;
  /**
   * Optional. YARN autoscaling configuration.
   */
  yarnConfig?: BasicYarnAutoscalingConfig;
}

function serializeBasicAutoscalingAlgorithm(data: any): BasicAutoscalingAlgorithm {
  return {
    ...data,
    cooldownPeriod: data["cooldownPeriod"] !== undefined ? data["cooldownPeriod"] : undefined,
    sparkStandaloneConfig: data["sparkStandaloneConfig"] !== undefined ? serializeSparkStandaloneAutoscalingConfig(data["sparkStandaloneConfig"]) : undefined,
    yarnConfig: data["yarnConfig"] !== undefined ? serializeBasicYarnAutoscalingConfig(data["yarnConfig"]) : undefined,
  };
}

function deserializeBasicAutoscalingAlgorithm(data: any): BasicAutoscalingAlgorithm {
  return {
    ...data,
    cooldownPeriod: data["cooldownPeriod"] !== undefined ? data["cooldownPeriod"] : undefined,
    sparkStandaloneConfig: data["sparkStandaloneConfig"] !== undefined ? deserializeSparkStandaloneAutoscalingConfig(data["sparkStandaloneConfig"]) : undefined,
    yarnConfig: data["yarnConfig"] !== undefined ? deserializeBasicYarnAutoscalingConfig(data["yarnConfig"]) : undefined,
  };
}

/**
 * Basic autoscaling configurations for YARN.
 */
export interface BasicYarnAutoscalingConfig {
  /**
   * Required. Timeout for YARN graceful decommissioning of Node Managers.
   * Specifies the duration to wait for jobs to complete before forcefully
   * removing workers (and potentially interrupting jobs). Only applicable to
   * downscaling operations.Bounds: 0s, 1d.
   */
  gracefulDecommissionTimeout?: number /* Duration */;
  /**
   * Required. Fraction of average YARN pending memory in the last cooldown
   * period for which to remove workers. A scale-down factor of 1 will result in
   * scaling down so that there is no available memory remaining after the
   * update (more aggressive scaling). A scale-down factor of 0 disables
   * removing workers, which can be beneficial for autoscaling a single job. See
   * How autoscaling works
   * (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/autoscaling#how_autoscaling_works)
   * for more information.Bounds: 0.0, 1.0.
   */
  scaleDownFactor?: number;
  /**
   * Optional. Minimum scale-down threshold as a fraction of total cluster size
   * before scaling occurs. For example, in a 20-worker cluster, a threshold of
   * 0.1 means the autoscaler must recommend at least a 2 worker scale-down for
   * the cluster to scale. A threshold of 0 means the autoscaler will scale down
   * on any recommended change.Bounds: 0.0, 1.0. Default: 0.0.
   */
  scaleDownMinWorkerFraction?: number;
  /**
   * Required. Fraction of average YARN pending memory in the last cooldown
   * period for which to add workers. A scale-up factor of 1.0 will result in
   * scaling up so that there is no pending memory remaining after the update
   * (more aggressive scaling). A scale-up factor closer to 0 will result in a
   * smaller magnitude of scaling up (less aggressive scaling). See How
   * autoscaling works
   * (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/autoscaling#how_autoscaling_works)
   * for more information.Bounds: 0.0, 1.0.
   */
  scaleUpFactor?: number;
  /**
   * Optional. Minimum scale-up threshold as a fraction of total cluster size
   * before scaling occurs. For example, in a 20-worker cluster, a threshold of
   * 0.1 means the autoscaler must recommend at least a 2-worker scale-up for
   * the cluster to scale. A threshold of 0 means the autoscaler will scale up
   * on any recommended change.Bounds: 0.0, 1.0. Default: 0.0.
   */
  scaleUpMinWorkerFraction?: number;
}

function serializeBasicYarnAutoscalingConfig(data: any): BasicYarnAutoscalingConfig {
  return {
    ...data,
    gracefulDecommissionTimeout: data["gracefulDecommissionTimeout"] !== undefined ? data["gracefulDecommissionTimeout"] : undefined,
  };
}

function deserializeBasicYarnAutoscalingConfig(data: any): BasicYarnAutoscalingConfig {
  return {
    ...data,
    gracefulDecommissionTimeout: data["gracefulDecommissionTimeout"] !== undefined ? data["gracefulDecommissionTimeout"] : undefined,
  };
}

/**
 * A representation of a batch workload in the service.
 */
export interface Batch {
  /**
   * Output only. The time when the batch was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The email address of the user who created the batch.
   */
  readonly creator?: string;
  /**
   * Optional. Environment configuration for the batch execution.
   */
  environmentConfig?: EnvironmentConfig;
  /**
   * Optional. The labels to associate with this batch. Label keys must contain
   * 1 to 63 characters, and must conform to RFC 1035
   * (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if
   * present, must contain 1 to 63 characters, and must conform to RFC 1035
   * (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be
   * associated with a batch.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The resource name of the batch.
   */
  readonly name?: string;
  /**
   * Output only. The resource name of the operation associated with this
   * batch.
   */
  readonly operation?: string;
  /**
   * Optional. PySpark batch config.
   */
  pysparkBatch?: PySparkBatch;
  /**
   * Optional. Runtime configuration for the batch execution.
   */
  runtimeConfig?: RuntimeConfig;
  /**
   * Output only. Runtime information about batch execution.
   */
  readonly runtimeInfo?: RuntimeInfo;
  /**
   * Optional. Spark batch config.
   */
  sparkBatch?: SparkBatch;
  /**
   * Optional. SparkR batch config.
   */
  sparkRBatch?: SparkRBatch;
  /**
   * Optional. SparkSql batch config.
   */
  sparkSqlBatch?: SparkSqlBatch;
  /**
   * Output only. The state of the batch.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "CANCELLING" | "CANCELLED" | "SUCCEEDED" | "FAILED";
  /**
   * Output only. Historical state information for the batch.
   */
  readonly stateHistory?: StateHistory[];
  /**
   * Output only. Batch state details, such as a failure description if the
   * state is FAILED.
   */
  readonly stateMessage?: string;
  /**
   * Output only. The time when the batch entered a current state.
   */
  readonly stateTime?: Date;
  /**
   * Output only. A batch UUID (Unique Universal Identifier). The service
   * generates this value when it creates the batch.
   */
  readonly uuid?: string;
}

function serializeBatch(data: any): Batch {
  return {
    ...data,
    environmentConfig: data["environmentConfig"] !== undefined ? serializeEnvironmentConfig(data["environmentConfig"]) : undefined,
  };
}

function deserializeBatch(data: any): Batch {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    environmentConfig: data["environmentConfig"] !== undefined ? deserializeEnvironmentConfig(data["environmentConfig"]) : undefined,
    stateTime: data["stateTime"] !== undefined ? new Date(data["stateTime"]) : undefined,
  };
}

/**
 * Metadata describing the Batch operation.
 */
export interface BatchOperationMetadata {
  /**
   * Name of the batch for the operation.
   */
  batch?: string;
  /**
   * Batch UUID for the operation.
   */
  batchUuid?: string;
  /**
   * The time when the operation was created.
   */
  createTime?: Date;
  /**
   * Short description of the operation.
   */
  description?: string;
  /**
   * The time when the operation finished.
   */
  doneTime?: Date;
  /**
   * Labels associated with the operation.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The operation type.
   */
  operationType?:  | "BATCH_OPERATION_TYPE_UNSPECIFIED" | "BATCH";
  /**
   * Warnings encountered during operation execution.
   */
  warnings?: string[];
}

function serializeBatchOperationMetadata(data: any): BatchOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    doneTime: data["doneTime"] !== undefined ? data["doneTime"].toISOString() : undefined,
  };
}

function deserializeBatchOperationMetadata(data: any): BatchOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    doneTime: data["doneTime"] !== undefined ? new Date(data["doneTime"]) : undefined,
  };
}

/**
 * Associates members, or principals, with a role.
 */
export interface Binding {
  /**
   * The condition that is associated with this binding.If the condition
   * evaluates to true, then this binding applies to the current request.If the
   * condition evaluates to false, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding.To learn which
   * resources support conditions in their IAM policies, see the IAM
   * documentation
   * (https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: Expr;
  /**
   * Specifies the principals requesting access for a Google Cloud resource.
   * members can have the following values: allUsers: A special identifier that
   * represents anyone who is on the internet; with or without a Google account.
   * allAuthenticatedUsers: A special identifier that represents anyone who is
   * authenticated with a Google account or a service account. Does not include
   * identities that come from external identity providers (IdPs) through
   * identity federation. user:{emailid}: An email address that represents a
   * specific Google account. For example, alice@example.com .
   * serviceAccount:{emailid}: An email address that represents a Google service
   * account. For example, my-other-app@appspot.gserviceaccount.com.
   * serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]: An
   * identifier for a Kubernetes service account
   * (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts).
   * For example, my-project.svc.id.goog[my-namespace/my-kubernetes-sa].
   * group:{emailid}: An email address that represents a Google group. For
   * example, admins@example.com. domain:{domain}: The G Suite domain (primary)
   * that represents all the users of that domain. For example, google.com or
   * example.com. deleted:user:{emailid}?uid={uniqueid}: An email address (plus
   * unique identifier) representing a user that has been recently deleted. For
   * example, alice@example.com?uid=123456789012345678901. If the user is
   * recovered, this value reverts to user:{emailid} and the recovered user
   * retains the role in the binding.
   * deleted:serviceAccount:{emailid}?uid={uniqueid}: An email address (plus
   * unique identifier) representing a service account that has been recently
   * deleted. For example,
   * my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901. If the
   * service account is undeleted, this value reverts to
   * serviceAccount:{emailid} and the undeleted service account retains the role
   * in the binding. deleted:group:{emailid}?uid={uniqueid}: An email address
   * (plus unique identifier) representing a Google group that has been recently
   * deleted. For example, admins@example.com?uid=123456789012345678901. If the
   * group is recovered, this value reverts to group:{emailid} and the recovered
   * group retains the role in the binding.
   */
  members?: string[];
  /**
   * Role that is assigned to the list of members, or principals. For example,
   * roles/viewer, roles/editor, or roles/owner.
   */
  role?: string;
}

/**
 * A request to cancel a job.
 */
export interface CancelJobRequest {
}

/**
 * Describes the identifying information, config, and status of a Dataproc
 * cluster
 */
export interface Cluster {
  /**
   * Required. The cluster name, which must be unique within a project. The
   * name must start with a lowercase letter, and can contain up to 51 lowercase
   * letters, numbers, and hyphens. It cannot end with a hyphen. The name of a
   * deleted cluster can be reused.
   */
  clusterName?: string;
  /**
   * Output only. A cluster UUID (Unique Universal Identifier). Dataproc
   * generates this value when it creates the cluster.
   */
  readonly clusterUuid?: string;
  /**
   * Optional. The cluster config for a cluster of Compute Engine Instances.
   * Note that Dataproc may set default values, and values may change when
   * clusters are updated.Exactly one of ClusterConfig or VirtualClusterConfig
   * must be specified.
   */
  config?: ClusterConfig;
  /**
   * Optional. The labels to associate with this cluster. Label keys must
   * contain 1 to 63 characters, and must conform to RFC 1035
   * (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if
   * present, must contain 1 to 63 characters, and must conform to RFC 1035
   * (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be
   * associated with a cluster.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. Contains cluster daemon metrics such as HDFS and YARN
   * stats.Beta Feature: This report is available for testing purposes only. It
   * may be changed before final release.
   */
  readonly metrics?: ClusterMetrics;
  /**
   * Required. The Google Cloud Platform project ID that the cluster belongs
   * to.
   */
  projectId?: string;
  /**
   * Output only. Cluster status.
   */
  readonly status?: ClusterStatus;
  /**
   * Output only. The previous cluster status.
   */
  readonly statusHistory?: ClusterStatus[];
  /**
   * Optional. The virtual cluster config is used when creating a Dataproc
   * cluster that does not directly control the underlying compute resources,
   * for example, when creating a Dataproc-on-GKE cluster
   * (https://cloud.google.com/dataproc/docs/guides/dpgke/dataproc-gke-overview).
   * Dataproc may set default values, and values may change when clusters are
   * updated. Exactly one of config or virtual_cluster_config must be specified.
   */
  virtualClusterConfig?: VirtualClusterConfig;
}

function serializeCluster(data: any): Cluster {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeClusterConfig(data["config"]) : undefined,
    virtualClusterConfig: data["virtualClusterConfig"] !== undefined ? serializeVirtualClusterConfig(data["virtualClusterConfig"]) : undefined,
  };
}

function deserializeCluster(data: any): Cluster {
  return {
    ...data,
    config: data["config"] !== undefined ? deserializeClusterConfig(data["config"]) : undefined,
    metrics: data["metrics"] !== undefined ? deserializeClusterMetrics(data["metrics"]) : undefined,
    virtualClusterConfig: data["virtualClusterConfig"] !== undefined ? deserializeVirtualClusterConfig(data["virtualClusterConfig"]) : undefined,
  };
}

/**
 * The cluster config.
 */
export interface ClusterConfig {
  /**
   * Optional. Autoscaling config for the policy associated with the cluster.
   * Cluster does not autoscale if this field is unset.
   */
  autoscalingConfig?: AutoscalingConfig;
  /**
   * Optional. The node group settings.
   */
  auxiliaryNodeGroups?: AuxiliaryNodeGroup[];
  /**
   * Optional. A Cloud Storage bucket used to stage job dependencies, config
   * files, and job driver console output. If you do not specify a staging
   * bucket, Cloud Dataproc will determine a Cloud Storage location (US, ASIA,
   * or EU) for your cluster's staging bucket according to the Compute Engine
   * zone where your cluster is deployed, and then create and manage this
   * project-level, per-location bucket (see Dataproc staging and temp buckets
   * (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket)).
   * This field requires a Cloud Storage bucket name, not a gs://... URI to a
   * Cloud Storage bucket.
   */
  configBucket?: string;
  /**
   * Optional. The config for Dataproc metrics.
   */
  dataprocMetricConfig?: DataprocMetricConfig;
  /**
   * Optional. Encryption settings for the cluster.
   */
  encryptionConfig?: EncryptionConfig;
  /**
   * Optional. Port/endpoint configuration for this cluster
   */
  endpointConfig?: EndpointConfig;
  /**
   * Optional. The shared Compute Engine config settings for all instances in a
   * cluster.
   */
  gceClusterConfig?: GceClusterConfig;
  /**
   * Optional. BETA. The Kubernetes Engine config for Dataproc clusters
   * deployed to The Kubernetes Engine config for Dataproc clusters deployed to
   * Kubernetes. These config settings are mutually exclusive with Compute
   * Engine-based options, such as gce_cluster_config, master_config,
   * worker_config, secondary_worker_config, and autoscaling_config.
   */
  gkeClusterConfig?: GkeClusterConfig;
  /**
   * Optional. Commands to execute on each node after config is completed. By
   * default, executables are run on master and all worker nodes. You can test a
   * node's role metadata to run an executable on a master or worker node, as
   * shown below using curl (you can also use wget): ROLE=$(curl -H
   * Metadata-Flavor:Google
   * http://metadata/computeMetadata/v1/instance/attributes/dataproc-role) if [[
   * "${ROLE}" == 'Master' ]]; then ... master specific actions ... else ...
   * worker specific actions ... fi
   */
  initializationActions?: NodeInitializationAction[];
  /**
   * Optional. Lifecycle setting for the cluster.
   */
  lifecycleConfig?: LifecycleConfig;
  /**
   * Optional. The Compute Engine config settings for the cluster's master
   * instance.
   */
  masterConfig?: InstanceGroupConfig;
  /**
   * Optional. Metastore configuration.
   */
  metastoreConfig?: MetastoreConfig;
  /**
   * Optional. The Compute Engine config settings for a cluster's secondary
   * worker instances
   */
  secondaryWorkerConfig?: InstanceGroupConfig;
  /**
   * Optional. Security settings for the cluster.
   */
  securityConfig?: SecurityConfig;
  /**
   * Optional. The config settings for cluster software.
   */
  softwareConfig?: SoftwareConfig;
  /**
   * Optional. A Cloud Storage bucket used to store ephemeral cluster and jobs
   * data, such as Spark and MapReduce history files. If you do not specify a
   * temp bucket, Dataproc will determine a Cloud Storage location (US, ASIA, or
   * EU) for your cluster's temp bucket according to the Compute Engine zone
   * where your cluster is deployed, and then create and manage this
   * project-level, per-location bucket. The default bucket has a TTL of 90
   * days, but you can use any TTL (or none) if you specify a bucket (see
   * Dataproc staging and temp buckets
   * (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket)).
   * This field requires a Cloud Storage bucket name, not a gs://... URI to a
   * Cloud Storage bucket.
   */
  tempBucket?: string;
  /**
   * Optional. The Compute Engine config settings for the cluster's worker
   * instances.
   */
  workerConfig?: InstanceGroupConfig;
}

function serializeClusterConfig(data: any): ClusterConfig {
  return {
    ...data,
    gkeClusterConfig: data["gkeClusterConfig"] !== undefined ? serializeGkeClusterConfig(data["gkeClusterConfig"]) : undefined,
    initializationActions: data["initializationActions"] !== undefined ? data["initializationActions"].map((item: any) => (serializeNodeInitializationAction(item))) : undefined,
    lifecycleConfig: data["lifecycleConfig"] !== undefined ? serializeLifecycleConfig(data["lifecycleConfig"]) : undefined,
  };
}

function deserializeClusterConfig(data: any): ClusterConfig {
  return {
    ...data,
    gkeClusterConfig: data["gkeClusterConfig"] !== undefined ? deserializeGkeClusterConfig(data["gkeClusterConfig"]) : undefined,
    initializationActions: data["initializationActions"] !== undefined ? data["initializationActions"].map((item: any) => (deserializeNodeInitializationAction(item))) : undefined,
    lifecycleConfig: data["lifecycleConfig"] !== undefined ? deserializeLifecycleConfig(data["lifecycleConfig"]) : undefined,
  };
}

/**
 * Contains cluster daemon metrics, such as HDFS and YARN stats.Beta Feature:
 * This report is available for testing purposes only. It may be changed before
 * final release.
 */
export interface ClusterMetrics {
  /**
   * The HDFS metrics.
   */
  hdfsMetrics?: {
    [key: string]: bigint
  };
  /**
   * YARN metrics.
   */
  yarnMetrics?: {
    [key: string]: bigint
  };
}

function serializeClusterMetrics(data: any): ClusterMetrics {
  return {
    ...data,
    hdfsMetrics: data["hdfsMetrics"] !== undefined ? Object.fromEntries(Object.entries(data["hdfsMetrics"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
    yarnMetrics: data["yarnMetrics"] !== undefined ? Object.fromEntries(Object.entries(data["yarnMetrics"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
  };
}

function deserializeClusterMetrics(data: any): ClusterMetrics {
  return {
    ...data,
    hdfsMetrics: data["hdfsMetrics"] !== undefined ? Object.fromEntries(Object.entries(data["hdfsMetrics"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
    yarnMetrics: data["yarnMetrics"] !== undefined ? Object.fromEntries(Object.entries(data["yarnMetrics"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
  };
}

/**
 * The cluster operation triggered by a workflow.
 */
export interface ClusterOperation {
  /**
   * Output only. Indicates the operation is done.
   */
  readonly done?: boolean;
  /**
   * Output only. Error, if operation failed.
   */
  readonly error?: string;
  /**
   * Output only. The id of the cluster operation.
   */
  readonly operationId?: string;
}

/**
 * Metadata describing the operation.
 */
export interface ClusterOperationMetadata {
  /**
   * Output only. Child operation ids
   */
  readonly childOperationIds?: string[];
  /**
   * Output only. Name of the cluster for the operation.
   */
  readonly clusterName?: string;
  /**
   * Output only. Cluster UUID for the operation.
   */
  readonly clusterUuid?: string;
  /**
   * Output only. Short description of operation.
   */
  readonly description?: string;
  /**
   * Output only. Labels associated with the operation
   */
  readonly labels?: {
    [key: string]: string
  };
  /**
   * Output only. The operation type.
   */
  readonly operationType?: string;
  /**
   * Output only. Current operation status.
   */
  readonly status?: ClusterOperationStatus;
  /**
   * Output only. The previous operation status.
   */
  readonly statusHistory?: ClusterOperationStatus[];
  /**
   * Output only. Errors encountered during operation execution.
   */
  readonly warnings?: string[];
}

/**
 * The status of the operation.
 */
export interface ClusterOperationStatus {
  /**
   * Output only. A message containing any operation metadata details.
   */
  readonly details?: string;
  /**
   * Output only. A message containing the detailed operation state.
   */
  readonly innerState?: string;
  /**
   * Output only. A message containing the operation state.
   */
  readonly state?:  | "UNKNOWN" | "PENDING" | "RUNNING" | "DONE";
  /**
   * Output only. The time this state was entered.
   */
  readonly stateStartTime?: Date;
}

/**
 * A selector that chooses target cluster for jobs based on metadata.
 */
export interface ClusterSelector {
  /**
   * Required. The cluster labels. Cluster must have all labels to match.
   */
  clusterLabels?: {
    [key: string]: string
  };
  /**
   * Optional. The zone where workflow process executes. This parameter does
   * not affect the selection of the cluster.If unspecified, the zone of the
   * first cluster matching the selector is used.
   */
  zone?: string;
}

/**
 * The status of a cluster and its instances.
 */
export interface ClusterStatus {
  /**
   * Optional. Output only. Details of cluster's state.
   */
  readonly detail?: string;
  /**
   * Output only. The cluster's state.
   */
  readonly state?:  | "UNKNOWN" | "CREATING" | "RUNNING" | "ERROR" | "ERROR_DUE_TO_UPDATE" | "DELETING" | "UPDATING" | "STOPPING" | "STOPPED" | "STARTING" | "REPAIRING";
  /**
   * Output only. Time when this state was entered (see JSON representation of
   * Timestamp
   * (https://developers.google.com/protocol-buffers/docs/proto3#json)).
   */
  readonly stateStartTime?: Date;
  /**
   * Output only. Additional state information that includes status reported by
   * the agent.
   */
  readonly substate?:  | "UNSPECIFIED" | "UNHEALTHY" | "STALE_STATUS";
}

/**
 * Confidential Instance Config for clusters using Confidential VMs
 * (https://cloud.google.com/compute/confidential-vm/docs)
 */
export interface ConfidentialInstanceConfig {
  /**
   * Optional. Defines whether the instance should have confidential compute
   * enabled.
   */
  enableConfidentialCompute?: boolean;
}

/**
 * Dataproc metric config.
 */
export interface DataprocMetricConfig {
  /**
   * Required. Metrics sources to enable.
   */
  metrics?: Metric[];
}

/**
 * A request to collect cluster diagnostic information.
 */
export interface DiagnoseClusterRequest {
  /**
   * Optional. Time interval in which diagnosis should be carried out on the
   * cluster.
   */
  diagnosisInterval?: Interval;
  /**
   * Optional. DEPRECATED Specifies the job on which diagnosis is to be
   * performed. Format: projects/{project}/regions/{region}/jobs/{job}
   */
  job?: string;
  /**
   * Optional. DEPRECATED Specifies the yarn application on which diagnosis is
   * to be performed.
   */
  yarnApplicationId?: string;
}

function serializeDiagnoseClusterRequest(data: any): DiagnoseClusterRequest {
  return {
    ...data,
    diagnosisInterval: data["diagnosisInterval"] !== undefined ? serializeInterval(data["diagnosisInterval"]) : undefined,
  };
}

function deserializeDiagnoseClusterRequest(data: any): DiagnoseClusterRequest {
  return {
    ...data,
    diagnosisInterval: data["diagnosisInterval"] !== undefined ? deserializeInterval(data["diagnosisInterval"]) : undefined,
  };
}

/**
 * The location of diagnostic output.
 */
export interface DiagnoseClusterResults {
  /**
   * Output only. The Cloud Storage URI of the diagnostic output. The output
   * report is a plain text file with a summary of collected diagnostics.
   */
  readonly outputUri?: string;
}

/**
 * Specifies the config of disk options for a group of VM instances.
 */
export interface DiskConfig {
  /**
   * Optional. Size in GB of the boot disk (default is 500GB).
   */
  bootDiskSizeGb?: number;
  /**
   * Optional. Type of the boot disk (default is "pd-standard"). Valid values:
   * "pd-balanced" (Persistent Disk Balanced Solid State Drive), "pd-ssd"
   * (Persistent Disk Solid State Drive), or "pd-standard" (Persistent Disk Hard
   * Disk Drive). See Disk types
   * (https://cloud.google.com/compute/docs/disks#disk-types).
   */
  bootDiskType?: string;
  /**
   * Optional. Interface type of local SSDs (default is "scsi"). Valid values:
   * "scsi" (Small Computer System Interface), "nvme" (Non-Volatile Memory
   * Express). See local SSD performance
   * (https://cloud.google.com/compute/docs/disks/local-ssd#performance).
   */
  localSsdInterface?: string;
  /**
   * Optional. Number of attached SSDs, from 0 to 8 (default is 0). If SSDs are
   * not attached, the boot disk is used to store runtime logs and HDFS
   * (https://hadoop.apache.org/docs/r1.2.1/hdfs_user_guide.html) data. If one
   * or more SSDs are attached, this runtime bulk data is spread across them,
   * and the boot disk contains only basic config and installed binaries.Note:
   * Local SSD options may vary by machine type and number of vCPUs selected.
   */
  numLocalSsds?: number;
}

/**
 * Driver scheduling configuration.
 */
export interface DriverSchedulingConfig {
  /**
   * Required. The amount of memory in MB the driver is requesting.
   */
  memoryMb?: number;
  /**
   * Required. The number of vCPUs the driver is requesting.
   */
  vcores?: number;
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
 * Encryption settings for the cluster.
 */
export interface EncryptionConfig {
  /**
   * Optional. The Cloud KMS key name to use for PD disk encryption for all
   * instances in the cluster.
   */
  gcePdKmsKeyName?: string;
  /**
   * Optional. The Cloud KMS key name to use for encrypting customer core
   * content and cluster PD disk for all instances in the cluster.
   */
  kmsKey?: string;
}

/**
 * Endpoint config for this cluster
 */
export interface EndpointConfig {
  /**
   * Optional. If true, enable http access to specific ports on the cluster
   * from external sources. Defaults to false.
   */
  enableHttpPortAccess?: boolean;
  /**
   * Output only. The map of port descriptions to URLs. Will only be populated
   * if enable_http_port_access is true.
   */
  readonly httpPorts?: {
    [key: string]: string
  };
}

/**
 * Environment configuration for a workload.
 */
export interface EnvironmentConfig {
  /**
   * Optional. Execution configuration for a workload.
   */
  executionConfig?: ExecutionConfig;
  /**
   * Optional. Peripherals configuration that workload has access to.
   */
  peripheralsConfig?: PeripheralsConfig;
}

function serializeEnvironmentConfig(data: any): EnvironmentConfig {
  return {
    ...data,
    executionConfig: data["executionConfig"] !== undefined ? serializeExecutionConfig(data["executionConfig"]) : undefined,
  };
}

function deserializeEnvironmentConfig(data: any): EnvironmentConfig {
  return {
    ...data,
    executionConfig: data["executionConfig"] !== undefined ? deserializeExecutionConfig(data["executionConfig"]) : undefined,
  };
}

/**
 * Execution configuration for a workload.
 */
export interface ExecutionConfig {
  /**
   * Optional. The duration to keep the session alive while it's idling.
   * Passing this threshold will cause the session to be terminated. Minimum
   * value is 10 minutes; maximum value is 14 days (see JSON representation of
   * Duration
   * (https://developers.google.com/protocol-buffers/docs/proto3#json)).
   * Defaults to 4 hours if not set. If both ttl and idle_ttl are specified, the
   * conditions are treated as and OR: the workload will be terminated when it
   * has been idle for idle_ttl or when the ttl has passed, whichever comes
   * first.
   */
  idleTtl?: number /* Duration */;
  /**
   * Optional. The Cloud KMS key to use for encryption.
   */
  kmsKey?: string;
  /**
   * Optional. Tags used for network traffic control.
   */
  networkTags?: string[];
  /**
   * Optional. Network URI to connect workload to.
   */
  networkUri?: string;
  /**
   * Optional. Service account that used to execute workload.
   */
  serviceAccount?: string;
  /**
   * Optional. A Cloud Storage bucket used to stage workload dependencies,
   * config files, and store workload output and other ephemeral data, such as
   * Spark history files. If you do not specify a staging bucket, Cloud Dataproc
   * will determine a Cloud Storage location according to the region where your
   * workload is running, and then create and manage project-level, per-location
   * staging and temporary buckets. This field requires a Cloud Storage bucket
   * name, not a gs://... URI to a Cloud Storage bucket.
   */
  stagingBucket?: string;
  /**
   * Optional. Subnetwork URI to connect workload to.
   */
  subnetworkUri?: string;
  /**
   * Optional. The duration after which the workload will be terminated. When
   * the workload passes this ttl, it will be unconditionally killed without
   * waiting for ongoing work to finish. Minimum value is 10 minutes; maximum
   * value is 14 days (see JSON representation of Duration
   * (https://developers.google.com/protocol-buffers/docs/proto3#json)). If both
   * ttl and idle_ttl are specified, the conditions are treated as and OR: the
   * workload will be terminated when it has been idle for idle_ttl or when the
   * ttl has passed, whichever comes first. If ttl is not specified for a
   * session, it defaults to 24h.
   */
  ttl?: number /* Duration */;
}

function serializeExecutionConfig(data: any): ExecutionConfig {
  return {
    ...data,
    idleTtl: data["idleTtl"] !== undefined ? data["idleTtl"] : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

function deserializeExecutionConfig(data: any): ExecutionConfig {
  return {
    ...data,
    idleTtl: data["idleTtl"] !== undefined ? data["idleTtl"] : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

/**
 * Represents a textual expression in the Common Expression Language (CEL)
 * syntax. CEL is a C-like expression language. The syntax and semantics of CEL
 * are documented at https://github.com/google/cel-spec.Example (Comparison):
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
 * Common config settings for resources of Compute Engine cluster instances,
 * applicable to all instances in the cluster.
 */
export interface GceClusterConfig {
  /**
   * Optional. Confidential Instance Config for clusters using Confidential VMs
   * (https://cloud.google.com/compute/confidential-vm/docs).
   */
  confidentialInstanceConfig?: ConfidentialInstanceConfig;
  /**
   * Optional. If true, all instances in the cluster will only have internal IP
   * addresses. By default, clusters are not restricted to internal IP
   * addresses, and will have ephemeral external IP addresses assigned to each
   * instance. This internal_ip_only restriction can only be enabled for
   * subnetwork enabled networks, and all off-cluster dependencies must be
   * configured to be accessible without external IP addresses.
   */
  internalIpOnly?: boolean;
  /**
   * The Compute Engine metadata entries to add to all instances (see Project
   * and instance metadata
   * (https://cloud.google.com/compute/docs/storing-retrieving-metadata#project_and_instance_metadata)).
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * Optional. The Compute Engine network to be used for machine
   * communications. Cannot be specified with subnetwork_uri. If neither
   * network_uri nor subnetwork_uri is specified, the "default" network of the
   * project is used, if it exists. Cannot be a "Custom Subnet Network" (see
   * Using Subnetworks (https://cloud.google.com/compute/docs/subnetworks) for
   * more information).A full URL, partial URI, or short name are valid.
   * Examples:
   * https://www.googleapis.com/compute/v1/projects/[project_id]/global/networks/default
   * projects/[project_id]/global/networks/default default
   */
  networkUri?: string;
  /**
   * Optional. Node Group Affinity for sole-tenant clusters.
   */
  nodeGroupAffinity?: NodeGroupAffinity;
  /**
   * Optional. The type of IPv6 access for a cluster.
   */
  privateIpv6GoogleAccess?:  | "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED" | "INHERIT_FROM_SUBNETWORK" | "OUTBOUND" | "BIDIRECTIONAL";
  /**
   * Optional. Reservation Affinity for consuming Zonal reservation.
   */
  reservationAffinity?: ReservationAffinity;
  /**
   * Optional. The Dataproc service account
   * (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/service-accounts#service_accounts_in_dataproc)
   * (also see VM Data Plane identity
   * (https://cloud.google.com/dataproc/docs/concepts/iam/dataproc-principals#vm_service_account_data_plane_identity))
   * used by Dataproc cluster VM instances to access Google Cloud Platform
   * services.If not specified, the Compute Engine default service account
   * (https://cloud.google.com/compute/docs/access/service-accounts#default_service_account)
   * is used.
   */
  serviceAccount?: string;
  /**
   * Optional. The URIs of service account scopes to be included in Compute
   * Engine instances. The following base set of scopes is always included:
   * https://www.googleapis.com/auth/cloud.useraccounts.readonly
   * https://www.googleapis.com/auth/devstorage.read_write
   * https://www.googleapis.com/auth/logging.writeIf no scopes are specified,
   * the following defaults are also provided:
   * https://www.googleapis.com/auth/bigquery
   * https://www.googleapis.com/auth/bigtable.admin.table
   * https://www.googleapis.com/auth/bigtable.data
   * https://www.googleapis.com/auth/devstorage.full_control
   */
  serviceAccountScopes?: string[];
  /**
   * Optional. Shielded Instance Config for clusters using Compute Engine
   * Shielded VMs
   * (https://cloud.google.com/security/shielded-cloud/shielded-vm).
   */
  shieldedInstanceConfig?: ShieldedInstanceConfig;
  /**
   * Optional. The Compute Engine subnetwork to be used for machine
   * communications. Cannot be specified with network_uri.A full URL, partial
   * URI, or short name are valid. Examples:
   * https://www.googleapis.com/compute/v1/projects/[project_id]/regions/[region]/subnetworks/sub0
   * projects/[project_id]/regions/[region]/subnetworks/sub0 sub0
   */
  subnetworkUri?: string;
  /**
   * The Compute Engine tags to add to all instances (see Tagging instances
   * (https://cloud.google.com/compute/docs/label-or-tag-resources#tags)).
   */
  tags?: string[];
  /**
   * Optional. The Compute Engine zone where the Dataproc cluster will be
   * located. If omitted, the service will pick a zone in the cluster's Compute
   * Engine region. On a get request, zone will always be present.A full URL,
   * partial URI, or short name are valid. Examples:
   * https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]
   * projects/[project_id]/zones/[zone] [zone]
   */
  zoneUri?: string;
}

/**
 * Request message for GetIamPolicy method.
 */
export interface GetIamPolicyRequest {
  /**
   * OPTIONAL: A GetPolicyOptions object for specifying options to
   * GetIamPolicy.
   */
  options?: GetPolicyOptions;
}

/**
 * Encapsulates settings provided to GetIamPolicy.
 */
export interface GetPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy.Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected.Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset.The policy in the response
   * might use the policy version that you specified, or it might use a lower
   * policy version. For example, if you specify version 3, but the policy has
   * no conditional role bindings, the response uses version 1.To learn which
   * resources support conditions in their IAM policies, see the IAM
   * documentation
   * (https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  requestedPolicyVersion?: number;
}

/**
 * The cluster's GKE config.
 */
export interface GkeClusterConfig {
  /**
   * Optional. A target GKE cluster to deploy to. It must be in the same
   * project and region as the Dataproc cluster (the GKE cluster can be zonal or
   * regional). Format:
   * 'projects/{project}/locations/{location}/clusters/{cluster_id}'
   */
  gkeClusterTarget?: string;
  /**
   * Optional. Deprecated. Use gkeClusterTarget. Used only for the deprecated
   * beta. A target for the deployment.
   */
  namespacedGkeDeploymentTarget?: NamespacedGkeDeploymentTarget;
  /**
   * Optional. GKE node pools where workloads will be scheduled. At least one
   * node pool must be assigned the DEFAULT GkeNodePoolTarget.Role. If a
   * GkeNodePoolTarget is not specified, Dataproc constructs a DEFAULT
   * GkeNodePoolTarget. Each role can be given to only one GkeNodePoolTarget.
   * All node pools must have the same location settings.
   */
  nodePoolTarget?: GkeNodePoolTarget[];
}

function serializeGkeClusterConfig(data: any): GkeClusterConfig {
  return {
    ...data,
    nodePoolTarget: data["nodePoolTarget"] !== undefined ? data["nodePoolTarget"].map((item: any) => (serializeGkeNodePoolTarget(item))) : undefined,
  };
}

function deserializeGkeClusterConfig(data: any): GkeClusterConfig {
  return {
    ...data,
    nodePoolTarget: data["nodePoolTarget"] !== undefined ? data["nodePoolTarget"].map((item: any) => (deserializeGkeNodePoolTarget(item))) : undefined,
  };
}

/**
 * Parameters that describe cluster nodes.
 */
export interface GkeNodeConfig {
  /**
   * Optional. A list of hardware accelerators
   * (https://cloud.google.com/compute/docs/gpus) to attach to each node.
   */
  accelerators?: GkeNodePoolAcceleratorConfig[];
  /**
   * Optional. The Customer Managed Encryption Key (CMEK)
   * (https://cloud.google.com/kubernetes-engine/docs/how-to/using-cmek) used to
   * encrypt the boot disk attached to each node in the node pool. Specify the
   * key using the following format: projects/KEY_PROJECT_ID/locations/LOCATION
   * /keyRings/RING_NAME/cryptoKeys/KEY_NAME.
   */
  bootDiskKmsKey?: string;
  /**
   * Optional. The number of local SSD disks to attach to the node, which is
   * limited by the maximum number of disks allowable per zone (see Adding Local
   * SSDs (https://cloud.google.com/compute/docs/disks/local-ssd)).
   */
  localSsdCount?: number;
  /**
   * Optional. The name of a Compute Engine machine type
   * (https://cloud.google.com/compute/docs/machine-types).
   */
  machineType?: string;
  /**
   * Optional. Minimum CPU platform
   * (https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform)
   * to be used by this instance. The instance may be scheduled on the specified
   * or a newer CPU platform. Specify the friendly names of CPU platforms, such
   * as "Intel Haswell"` or Intel Sandy Bridge".
   */
  minCpuPlatform?: string;
  /**
   * Optional. Whether the nodes are created as legacy preemptible VM instances
   * (https://cloud.google.com/compute/docs/instances/preemptible). Also see
   * Spot VMs, preemptible VM instances without a maximum lifetime. Legacy and
   * Spot preemptible nodes cannot be used in a node pool with the CONTROLLER
   * role or in the DEFAULT node pool if the CONTROLLER role is not assigned
   * (the DEFAULT node pool will assume the CONTROLLER role).
   */
  preemptible?: boolean;
  /**
   * Optional. Whether the nodes are created as Spot VM instances
   * (https://cloud.google.com/compute/docs/instances/spot). Spot VMs are the
   * latest update to legacy preemptible VMs. Spot VMs do not have a maximum
   * lifetime. Legacy and Spot preemptible nodes cannot be used in a node pool
   * with the CONTROLLER role or in the DEFAULT node pool if the CONTROLLER role
   * is not assigned (the DEFAULT node pool will assume the CONTROLLER role).
   */
  spot?: boolean;
}

function serializeGkeNodeConfig(data: any): GkeNodeConfig {
  return {
    ...data,
    accelerators: data["accelerators"] !== undefined ? data["accelerators"].map((item: any) => (serializeGkeNodePoolAcceleratorConfig(item))) : undefined,
  };
}

function deserializeGkeNodeConfig(data: any): GkeNodeConfig {
  return {
    ...data,
    accelerators: data["accelerators"] !== undefined ? data["accelerators"].map((item: any) => (deserializeGkeNodePoolAcceleratorConfig(item))) : undefined,
  };
}

/**
 * A GkeNodeConfigAcceleratorConfig represents a Hardware Accelerator request
 * for a node pool.
 */
export interface GkeNodePoolAcceleratorConfig {
  /**
   * The number of accelerator cards exposed to an instance.
   */
  acceleratorCount?: bigint;
  /**
   * The accelerator type resource namename (see GPUs on Compute Engine).
   */
  acceleratorType?: string;
  /**
   * Size of partitions to create on the GPU. Valid values are described in the
   * NVIDIA mig user guide
   * (https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning).
   */
  gpuPartitionSize?: string;
}

function serializeGkeNodePoolAcceleratorConfig(data: any): GkeNodePoolAcceleratorConfig {
  return {
    ...data,
    acceleratorCount: data["acceleratorCount"] !== undefined ? String(data["acceleratorCount"]) : undefined,
  };
}

function deserializeGkeNodePoolAcceleratorConfig(data: any): GkeNodePoolAcceleratorConfig {
  return {
    ...data,
    acceleratorCount: data["acceleratorCount"] !== undefined ? BigInt(data["acceleratorCount"]) : undefined,
  };
}

/**
 * GkeNodePoolAutoscaling contains information the cluster autoscaler needs to
 * adjust the size of the node pool to the current cluster usage.
 */
export interface GkeNodePoolAutoscalingConfig {
  /**
   * The maximum number of nodes in the node pool. Must be >= min_node_count,
   * and must be > 0. Note: Quota must be sufficient to scale up the cluster.
   */
  maxNodeCount?: number;
  /**
   * The minimum number of nodes in the node pool. Must be >= 0 and <=
   * max_node_count.
   */
  minNodeCount?: number;
}

/**
 * The configuration of a GKE node pool used by a Dataproc-on-GKE cluster
 * (https://cloud.google.com/dataproc/docs/concepts/jobs/dataproc-gke#create-a-dataproc-on-gke-cluster).
 */
export interface GkeNodePoolConfig {
  /**
   * Optional. The autoscaler configuration for this node pool. The autoscaler
   * is enabled only when a valid configuration is present.
   */
  autoscaling?: GkeNodePoolAutoscalingConfig;
  /**
   * Optional. The node pool configuration.
   */
  config?: GkeNodeConfig;
  /**
   * Optional. The list of Compute Engine zones
   * (https://cloud.google.com/compute/docs/zones#available) where node pool
   * nodes associated with a Dataproc on GKE virtual cluster will be
   * located.Note: All node pools associated with a virtual cluster must be
   * located in the same region as the virtual cluster, and they must be located
   * in the same zone within that region.If a location is not specified during
   * node pool creation, Dataproc on GKE will choose the zone.
   */
  locations?: string[];
}

function serializeGkeNodePoolConfig(data: any): GkeNodePoolConfig {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeGkeNodeConfig(data["config"]) : undefined,
  };
}

function deserializeGkeNodePoolConfig(data: any): GkeNodePoolConfig {
  return {
    ...data,
    config: data["config"] !== undefined ? deserializeGkeNodeConfig(data["config"]) : undefined,
  };
}

/**
 * GKE node pools that Dataproc workloads run on.
 */
export interface GkeNodePoolTarget {
  /**
   * Required. The target GKE node pool. Format:
   * 'projects/{project}/locations/{location}/clusters/{cluster}/nodePools/{node_pool}'
   */
  nodePool?: string;
  /**
   * Input only. The configuration for the GKE node pool.If specified, Dataproc
   * attempts to create a node pool with the specified shape. If one with the
   * same name already exists, it is verified against all specified fields. If a
   * field differs, the virtual cluster creation will fail.If omitted, any node
   * pool with the specified name is used. If a node pool with the specified
   * name does not exist, Dataproc create a node pool with default values.This
   * is an input only field. It will not be returned by the API.
   */
  nodePoolConfig?: GkeNodePoolConfig;
  /**
   * Required. The roles associated with the GKE node pool.
   */
  roles?:  | "ROLE_UNSPECIFIED" | "DEFAULT" | "CONTROLLER" | "SPARK_DRIVER" | "SPARK_EXECUTOR"[];
}

function serializeGkeNodePoolTarget(data: any): GkeNodePoolTarget {
  return {
    ...data,
    nodePoolConfig: data["nodePoolConfig"] !== undefined ? serializeGkeNodePoolConfig(data["nodePoolConfig"]) : undefined,
  };
}

function deserializeGkeNodePoolTarget(data: any): GkeNodePoolTarget {
  return {
    ...data,
    nodePoolConfig: data["nodePoolConfig"] !== undefined ? deserializeGkeNodePoolConfig(data["nodePoolConfig"]) : undefined,
  };
}

/**
 * A Dataproc job for running Apache Hadoop MapReduce
 * (https://hadoop.apache.org/docs/current/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html)
 * jobs on Apache Hadoop YARN
 * (https://hadoop.apache.org/docs/r2.7.1/hadoop-yarn/hadoop-yarn-site/YARN.html).
 */
export interface HadoopJob {
  /**
   * Optional. HCFS URIs of archives to be extracted in the working directory
   * of Hadoop drivers and tasks. Supported file types: .jar, .tar, .tar.gz,
   * .tgz, or .zip.
   */
  archiveUris?: string[];
  /**
   * Optional. The arguments to pass to the driver. Do not include arguments,
   * such as -libjars or -Dfoo=bar, that can be set as job properties, since a
   * collision may occur that causes an incorrect job submission.
   */
  args?: string[];
  /**
   * Optional. HCFS (Hadoop Compatible Filesystem) URIs of files to be copied
   * to the working directory of Hadoop drivers and distributed tasks. Useful
   * for naively parallel tasks.
   */
  fileUris?: string[];
  /**
   * Optional. Jar file URIs to add to the CLASSPATHs of the Hadoop driver and
   * tasks.
   */
  jarFileUris?: string[];
  /**
   * Optional. The runtime log config for job execution.
   */
  loggingConfig?: LoggingConfig;
  /**
   * The name of the driver's main class. The jar file containing the class
   * must be in the default CLASSPATH or specified in jar_file_uris.
   */
  mainClass?: string;
  /**
   * The HCFS URI of the jar file containing the main class. Examples:
   * 'gs://foo-bucket/analytics-binaries/extract-useful-metrics-mr.jar'
   * 'hdfs:/tmp/test-samples/custom-wordcount.jar'
   * 'file:///home/usr/lib/hadoop-mapreduce/hadoop-mapreduce-examples.jar'
   */
  mainJarFileUri?: string;
  /**
   * Optional. A mapping of property names to values, used to configure Hadoop.
   * Properties that conflict with values set by the Dataproc API may be
   * overwritten. Can include properties set in /etc/hadoop/conf/*-site and
   * classes in user code.
   */
  properties?: {
    [key: string]: string
  };
}

/**
 * A Dataproc job for running Apache Hive (https://hive.apache.org/) queries on
 * YARN.
 */
export interface HiveJob {
  /**
   * Optional. Whether to continue executing queries if a query fails. The
   * default value is false. Setting to true can be useful when executing
   * independent parallel queries.
   */
  continueOnFailure?: boolean;
  /**
   * Optional. HCFS URIs of jar files to add to the CLASSPATH of the Hive
   * server and Hadoop MapReduce (MR) tasks. Can contain Hive SerDes and UDFs.
   */
  jarFileUris?: string[];
  /**
   * Optional. A mapping of property names and values, used to configure Hive.
   * Properties that conflict with values set by the Dataproc API may be
   * overwritten. Can include properties set in /etc/hadoop/conf/*-site.xml,
   * /etc/hive/conf/hive-site.xml, and classes in user code.
   */
  properties?: {
    [key: string]: string
  };
  /**
   * The HCFS URI of the script that contains Hive queries.
   */
  queryFileUri?: string;
  /**
   * A list of queries.
   */
  queryList?: QueryList;
  /**
   * Optional. Mapping of query variable names to values (equivalent to the
   * Hive command: SET name="value";).
   */
  scriptVariables?: {
    [key: string]: string
  };
}

/**
 * Identity related configuration, including service account based secure
 * multi-tenancy user mappings.
 */
export interface IdentityConfig {
  /**
   * Required. Map of user to service account.
   */
  userServiceAccountMapping?: {
    [key: string]: string
  };
}

/**
 * A request to inject credentials into a cluster.
 */
export interface InjectCredentialsRequest {
  /**
   * Required. The cluster UUID.
   */
  clusterUuid?: string;
  /**
   * Required. The encrypted credentials being injected in to the cluster.The
   * client is responsible for encrypting the credentials in a way that is
   * supported by the cluster.A wrapped value is used here so that the actual
   * contents of the encrypted credentials are not written to audit logs.
   */
  credentialsCiphertext?: string;
}

/**
 * Configuration for the size bounds of an instance group, including its
 * proportional size to other groups.
 */
export interface InstanceGroupAutoscalingPolicyConfig {
  /**
   * Required. Maximum number of instances for this group. Required for primary
   * workers. Note that by default, clusters will not use secondary workers.
   * Required for secondary workers if the minimum secondary instances is
   * set.Primary workers - Bounds: [min_instances, ). Secondary workers -
   * Bounds: [min_instances, ). Default: 0.
   */
  maxInstances?: number;
  /**
   * Optional. Minimum number of instances for this group.Primary workers -
   * Bounds: 2, max_instances. Default: 2. Secondary workers - Bounds: 0,
   * max_instances. Default: 0.
   */
  minInstances?: number;
  /**
   * Optional. Weight for the instance group, which is used to determine the
   * fraction of total workers in the cluster from this instance group. For
   * example, if primary workers have weight 2, and secondary workers have
   * weight 1, the cluster will have approximately 2 primary workers for each
   * secondary worker.The cluster may not reach the specified balance if
   * constrained by min/max bounds or other autoscaling settings. For example,
   * if max_instances for secondary workers is 0, then only primary workers will
   * be added. The cluster can also be out of balance when created.If weight is
   * not set on any instance group, the cluster will default to equal weight for
   * all groups: the cluster will attempt to maintain an equal number of workers
   * in each group within the configured size bounds for each group. If weight
   * is set for one group only, the cluster will default to zero weight on the
   * unset group. For example if weight is set only on primary workers, the
   * cluster will use primary workers only and no secondary workers.
   */
  weight?: number;
}

/**
 * The config settings for Compute Engine resources in an instance group, such
 * as a master or worker group.
 */
export interface InstanceGroupConfig {
  /**
   * Optional. The Compute Engine accelerator configuration for these
   * instances.
   */
  accelerators?: AcceleratorConfig[];
  /**
   * Optional. Disk option config settings.
   */
  diskConfig?: DiskConfig;
  /**
   * Optional. The Compute Engine image resource used for cluster instances.The
   * URI can represent an image or image family.Image examples:
   * https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/[image-id]
   * projects/[project_id]/global/images/[image-id] image-idImage family
   * examples. Dataproc will use the most recent image from the family:
   * https://www.googleapis.com/compute/v1/projects/[project_id]/global/images/family/[custom-image-family-name]
   * projects/[project_id]/global/images/family/[custom-image-family-name]If the
   * URI is unspecified, it will be inferred from SoftwareConfig.image_version
   * or the system default.
   */
  imageUri?: string;
  /**
   * Output only. The list of instance names. Dataproc derives the names from
   * cluster_name, num_instances, and the instance group.
   */
  readonly instanceNames?: string[];
  /**
   * Output only. List of references to Compute Engine instances.
   */
  readonly instanceReferences?: InstanceReference[];
  /**
   * Output only. Specifies that this instance group contains preemptible
   * instances.
   */
  readonly isPreemptible?: boolean;
  /**
   * Optional. The Compute Engine machine type used for cluster instances.A
   * full URL, partial URI, or short name are valid. Examples:
   * https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2
   * projects/[project_id]/zones/[zone]/machineTypes/n1-standard-2
   * n1-standard-2Auto Zone Exception: If you are using the Dataproc Auto Zone
   * Placement
   * (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/auto-zone#using_auto_zone_placement)
   * feature, you must use the short name of the machine type resource, for
   * example, n1-standard-2.
   */
  machineTypeUri?: string;
  /**
   * Output only. The config for Compute Engine Instance Group Manager that
   * manages this group. This is only used for preemptible instance groups.
   */
  readonly managedGroupConfig?: ManagedGroupConfig;
  /**
   * Optional. Specifies the minimum cpu platform for the Instance Group. See
   * Dataproc -> Minimum CPU Platform
   * (https://cloud.google.com/dataproc/docs/concepts/compute/dataproc-min-cpu).
   */
  minCpuPlatform?: string;
  /**
   * Optional. The number of VM instances in the instance group. For HA cluster
   * master_config groups, must be set to 3. For standard cluster master_config
   * groups, must be set to 1.
   */
  numInstances?: number;
  /**
   * Optional. Specifies the preemptibility of the instance group.The default
   * value for master and worker groups is NON_PREEMPTIBLE. This default cannot
   * be changed.The default value for secondary instances is PREEMPTIBLE.
   */
  preemptibility?:  | "PREEMPTIBILITY_UNSPECIFIED" | "NON_PREEMPTIBLE" | "PREEMPTIBLE" | "SPOT";
}

/**
 * A reference to a Compute Engine instance.
 */
export interface InstanceReference {
  /**
   * The unique identifier of the Compute Engine instance.
   */
  instanceId?: string;
  /**
   * The user-friendly name of the Compute Engine instance.
   */
  instanceName?: string;
  /**
   * The public ECIES key used for sharing data with this instance.
   */
  publicEciesKey?: string;
  /**
   * The public RSA key used for sharing data with this instance.
   */
  publicKey?: string;
}

/**
 * A request to instantiate a workflow template.
 */
export interface InstantiateWorkflowTemplateRequest {
  /**
   * Optional. Map from parameter names to values that should be used for those
   * parameters. Values may not exceed 1000 characters.
   */
  parameters?: {
    [key: string]: string
  };
  /**
   * Optional. A tag that prevents multiple concurrent workflow instances with
   * the same tag from running. This mitigates risk of concurrent instances
   * started due to retries.It is recommended to always set this value to a UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier).The tag must
   * contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). The maximum length is 40 characters.
   */
  requestId?: string;
  /**
   * Optional. The version of workflow template to instantiate. If specified,
   * the workflow will be instantiated only if the current version of the
   * workflow template has the supplied version.This option cannot be used to
   * instantiate a previous version of workflow template.
   */
  version?: number;
}

/**
 * Represents a time interval, encoded as a Timestamp start (inclusive) and a
 * Timestamp end (exclusive).The start must be less than or equal to the end.
 * When the start equals the end, the interval is empty (matches no time). When
 * both start and end are unspecified, the interval matches any time.
 */
export interface Interval {
  /**
   * Optional. Exclusive end of the interval.If specified, a Timestamp matching
   * this interval will have to be before the end.
   */
  endTime?: Date;
  /**
   * Optional. Inclusive start of the interval.If specified, a Timestamp
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
 * A Dataproc job resource.
 */
export interface Job {
  /**
   * Output only. Indicates whether the job is completed. If the value is
   * false, the job is still in progress. If true, the job is completed, and
   * status.state field will indicate if it was successful, failed, or
   * cancelled.
   */
  readonly done?: boolean;
  /**
   * Output only. If present, the location of miscellaneous control files which
   * may be used as part of job setup and handling. If not present, control
   * files may be placed in the same location as driver_output_uri.
   */
  readonly driverControlFilesUri?: string;
  /**
   * Output only. A URI pointing to the location of the stdout of the job's
   * driver program.
   */
  readonly driverOutputResourceUri?: string;
  /**
   * Optional. Driver scheduling configuration.
   */
  driverSchedulingConfig?: DriverSchedulingConfig;
  /**
   * Optional. Job is a Hadoop job.
   */
  hadoopJob?: HadoopJob;
  /**
   * Optional. Job is a Hive job.
   */
  hiveJob?: HiveJob;
  /**
   * Output only. A UUID that uniquely identifies a job within the project over
   * time. This is in contrast to a user-settable reference.job_id that may be
   * reused over time.
   */
  readonly jobUuid?: string;
  /**
   * Optional. The labels to associate with this job. Label keys must contain 1
   * to 63 characters, and must conform to RFC 1035
   * (https://www.ietf.org/rfc/rfc1035.txt). Label values may be empty, but, if
   * present, must contain 1 to 63 characters, and must conform to RFC 1035
   * (https://www.ietf.org/rfc/rfc1035.txt). No more than 32 labels can be
   * associated with a job.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. Job is a Pig job.
   */
  pigJob?: PigJob;
  /**
   * Required. Job information, including how, when, and where to run the job.
   */
  placement?: JobPlacement;
  /**
   * Optional. Job is a Presto job.
   */
  prestoJob?: PrestoJob;
  /**
   * Optional. Job is a PySpark job.
   */
  pysparkJob?: PySparkJob;
  /**
   * Optional. The fully qualified reference to the job, which can be used to
   * obtain the equivalent REST path of the job resource. If this property is
   * not specified when a job is created, the server generates a job_id.
   */
  reference?: JobReference;
  /**
   * Optional. Job scheduling configuration.
   */
  scheduling?: JobScheduling;
  /**
   * Optional. Job is a Spark job.
   */
  sparkJob?: SparkJob;
  /**
   * Optional. Job is a SparkR job.
   */
  sparkRJob?: SparkRJob;
  /**
   * Optional. Job is a SparkSql job.
   */
  sparkSqlJob?: SparkSqlJob;
  /**
   * Output only. The job status. Additional application-specific status
   * information may be contained in the type_job and yarn_applications fields.
   */
  readonly status?: JobStatus;
  /**
   * Output only. The previous job status.
   */
  readonly statusHistory?: JobStatus[];
  /**
   * Optional. Job is a Trino job.
   */
  trinoJob?: TrinoJob;
  /**
   * Output only. The collection of YARN applications spun up by this job.Beta
   * Feature: This report is available for testing purposes only. It may be
   * changed before final release.
   */
  readonly yarnApplications?: YarnApplication[];
}

/**
 * Job Operation metadata.
 */
export interface JobMetadata {
  /**
   * Output only. The job id.
   */
  readonly jobId?: string;
  /**
   * Output only. Operation type.
   */
  readonly operationType?: string;
  /**
   * Output only. Job submission time.
   */
  readonly startTime?: Date;
  /**
   * Output only. Most recent job status.
   */
  readonly status?: JobStatus;
}

/**
 * Dataproc job config.
 */
export interface JobPlacement {
  /**
   * Optional. Cluster labels to identify a cluster where the job will be
   * submitted.
   */
  clusterLabels?: {
    [key: string]: string
  };
  /**
   * Required. The name of the cluster where the job will be submitted.
   */
  clusterName?: string;
  /**
   * Output only. A cluster UUID generated by the Dataproc service when the job
   * is submitted.
   */
  readonly clusterUuid?: string;
}

/**
 * Encapsulates the full scoping used to reference a job.
 */
export interface JobReference {
  /**
   * Optional. The job ID, which must be unique within the project.The ID must
   * contain only letters (a-z, A-Z), numbers (0-9), underscores (_), or hyphens
   * (-). The maximum length is 100 characters.If not specified by the caller,
   * the job ID will be provided by the server.
   */
  jobId?: string;
  /**
   * Optional. The ID of the Google Cloud Platform project that the job belongs
   * to. If specified, must match the request project ID.
   */
  projectId?: string;
}

/**
 * Job scheduling options.
 */
export interface JobScheduling {
  /**
   * Optional. Maximum number of times per hour a driver may be restarted as a
   * result of driver exiting with non-zero code before job is reported failed.A
   * job may be reported as thrashing if the driver exits with a non-zero code
   * four times within a 10-minute window.Maximum value is 10.Note: This
   * restartable job option is not supported in Dataproc workflow templates
   * (https://cloud.google.com/dataproc/docs/concepts/workflows/using-workflows#adding_jobs_to_a_template).
   */
  maxFailuresPerHour?: number;
  /**
   * Optional. Maximum total number of times a driver may be restarted as a
   * result of the driver exiting with a non-zero code. After the maximum number
   * is reached, the job will be reported as failed.Maximum value is 240.Note:
   * Currently, this restartable job option is not supported in Dataproc
   * workflow templates
   * (https://cloud.google.com/dataproc/docs/concepts/workflows/using-workflows#adding_jobs_to_a_template).
   */
  maxFailuresTotal?: number;
}

/**
 * Dataproc job status.
 */
export interface JobStatus {
  /**
   * Optional. Output only. Job state details, such as an error description if
   * the state is ERROR.
   */
  readonly details?: string;
  /**
   * Output only. A state message specifying the overall job state.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "SETUP_DONE" | "RUNNING" | "CANCEL_PENDING" | "CANCEL_STARTED" | "CANCELLED" | "DONE" | "ERROR" | "ATTEMPT_FAILURE";
  /**
   * Output only. The time when this state was entered.
   */
  readonly stateStartTime?: Date;
  /**
   * Output only. Additional state information, which includes status reported
   * by the agent.
   */
  readonly substate?:  | "UNSPECIFIED" | "SUBMITTED" | "QUEUED" | "STALE_STATUS";
}

/**
 * Specifies Kerberos related configuration.
 */
export interface KerberosConfig {
  /**
   * Optional. The admin server (IP or hostname) for the remote trusted realm
   * in a cross realm trust relationship.
   */
  crossRealmTrustAdminServer?: string;
  /**
   * Optional. The KDC (IP or hostname) for the remote trusted realm in a cross
   * realm trust relationship.
   */
  crossRealmTrustKdc?: string;
  /**
   * Optional. The remote realm the Dataproc on-cluster KDC will trust, should
   * the user enable cross realm trust.
   */
  crossRealmTrustRealm?: string;
  /**
   * Optional. The Cloud Storage URI of a KMS encrypted file containing the
   * shared password between the on-cluster Kerberos realm and the remote
   * trusted realm, in a cross realm trust relationship.
   */
  crossRealmTrustSharedPasswordUri?: string;
  /**
   * Optional. Flag to indicate whether to Kerberize the cluster (default:
   * false). Set this field to true to enable Kerberos on a cluster.
   */
  enableKerberos?: boolean;
  /**
   * Optional. The Cloud Storage URI of a KMS encrypted file containing the
   * master key of the KDC database.
   */
  kdcDbKeyUri?: string;
  /**
   * Optional. The Cloud Storage URI of a KMS encrypted file containing the
   * password to the user provided key. For the self-signed certificate, this
   * password is generated by Dataproc.
   */
  keyPasswordUri?: string;
  /**
   * Optional. The Cloud Storage URI of a KMS encrypted file containing the
   * password to the user provided keystore. For the self-signed certificate,
   * this password is generated by Dataproc.
   */
  keystorePasswordUri?: string;
  /**
   * Optional. The Cloud Storage URI of the keystore file used for SSL
   * encryption. If not provided, Dataproc will provide a self-signed
   * certificate.
   */
  keystoreUri?: string;
  /**
   * Optional. The uri of the KMS key used to encrypt various sensitive files.
   */
  kmsKeyUri?: string;
  /**
   * Optional. The name of the on-cluster Kerberos realm. If not specified, the
   * uppercased domain of hostnames will be the realm.
   */
  realm?: string;
  /**
   * Optional. The Cloud Storage URI of a KMS encrypted file containing the
   * root principal password.
   */
  rootPrincipalPasswordUri?: string;
  /**
   * Optional. The lifetime of the ticket granting ticket, in hours. If not
   * specified, or user specifies 0, then default value 10 will be used.
   */
  tgtLifetimeHours?: number;
  /**
   * Optional. The Cloud Storage URI of a KMS encrypted file containing the
   * password to the user provided truststore. For the self-signed certificate,
   * this password is generated by Dataproc.
   */
  truststorePasswordUri?: string;
  /**
   * Optional. The Cloud Storage URI of the truststore file used for SSL
   * encryption. If not provided, Dataproc will provide a self-signed
   * certificate.
   */
  truststoreUri?: string;
}

/**
 * The configuration for running the Dataproc cluster on Kubernetes.
 */
export interface KubernetesClusterConfig {
  /**
   * Required. The configuration for running the Dataproc cluster on GKE.
   */
  gkeClusterConfig?: GkeClusterConfig;
  /**
   * Optional. A namespace within the Kubernetes cluster to deploy into. If
   * this namespace does not exist, it is created. If it exists, Dataproc
   * verifies that another Dataproc VirtualCluster is not installed into it. If
   * not specified, the name of the Dataproc Cluster is used.
   */
  kubernetesNamespace?: string;
  /**
   * Optional. The software configuration for this Dataproc cluster running on
   * Kubernetes.
   */
  kubernetesSoftwareConfig?: KubernetesSoftwareConfig;
}

function serializeKubernetesClusterConfig(data: any): KubernetesClusterConfig {
  return {
    ...data,
    gkeClusterConfig: data["gkeClusterConfig"] !== undefined ? serializeGkeClusterConfig(data["gkeClusterConfig"]) : undefined,
  };
}

function deserializeKubernetesClusterConfig(data: any): KubernetesClusterConfig {
  return {
    ...data,
    gkeClusterConfig: data["gkeClusterConfig"] !== undefined ? deserializeGkeClusterConfig(data["gkeClusterConfig"]) : undefined,
  };
}

/**
 * The software configuration for this Dataproc cluster running on Kubernetes.
 */
export interface KubernetesSoftwareConfig {
  /**
   * The components that should be installed in this Dataproc cluster. The key
   * must be a string from the KubernetesComponent enumeration. The value is the
   * version of the software to be installed. At least one entry must be
   * specified.
   */
  componentVersion?: {
    [key: string]: string
  };
  /**
   * The properties to set on daemon config files.Property keys are specified
   * in prefix:property format, for example
   * spark:spark.kubernetes.container.image. The following are supported
   * prefixes and their mappings: spark: spark-defaults.confFor more
   * information, see Cluster properties
   * (https://cloud.google.com/dataproc/docs/concepts/cluster-properties).
   */
  properties?: {
    [key: string]: string
  };
}

/**
 * Specifies the cluster auto-delete schedule configuration.
 */
export interface LifecycleConfig {
  /**
   * Optional. The time when cluster will be auto-deleted (see JSON
   * representation of Timestamp
   * (https://developers.google.com/protocol-buffers/docs/proto3#json)).
   */
  autoDeleteTime?: Date;
  /**
   * Optional. The lifetime duration of cluster. The cluster will be
   * auto-deleted at the end of this period. Minimum value is 10 minutes;
   * maximum value is 14 days (see JSON representation of Duration
   * (https://developers.google.com/protocol-buffers/docs/proto3#json)).
   */
  autoDeleteTtl?: number /* Duration */;
  /**
   * Optional. The duration to keep the cluster alive while idling (when no
   * jobs are running). Passing this threshold will cause the cluster to be
   * deleted. Minimum value is 5 minutes; maximum value is 14 days (see JSON
   * representation of Duration
   * (https://developers.google.com/protocol-buffers/docs/proto3#json)).
   */
  idleDeleteTtl?: number /* Duration */;
  /**
   * Output only. The time when cluster became idle (most recent job finished)
   * and became eligible for deletion due to idleness (see JSON representation
   * of Timestamp
   * (https://developers.google.com/protocol-buffers/docs/proto3#json)).
   */
  readonly idleStartTime?: Date;
}

function serializeLifecycleConfig(data: any): LifecycleConfig {
  return {
    ...data,
    autoDeleteTime: data["autoDeleteTime"] !== undefined ? data["autoDeleteTime"].toISOString() : undefined,
    autoDeleteTtl: data["autoDeleteTtl"] !== undefined ? data["autoDeleteTtl"] : undefined,
    idleDeleteTtl: data["idleDeleteTtl"] !== undefined ? data["idleDeleteTtl"] : undefined,
  };
}

function deserializeLifecycleConfig(data: any): LifecycleConfig {
  return {
    ...data,
    autoDeleteTime: data["autoDeleteTime"] !== undefined ? new Date(data["autoDeleteTime"]) : undefined,
    autoDeleteTtl: data["autoDeleteTtl"] !== undefined ? data["autoDeleteTtl"] : undefined,
    idleDeleteTtl: data["idleDeleteTtl"] !== undefined ? data["idleDeleteTtl"] : undefined,
    idleStartTime: data["idleStartTime"] !== undefined ? new Date(data["idleStartTime"]) : undefined,
  };
}

/**
 * A response to a request to list autoscaling policies in a project.
 */
export interface ListAutoscalingPoliciesResponse {
  /**
   * Output only. This token is included in the response if there are more
   * results to fetch.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. Autoscaling policies list.
   */
  readonly policies?: AutoscalingPolicy[];
}

/**
 * A list of batch workloads.
 */
export interface ListBatchesResponse {
  /**
   * The batches from the specified collection.
   */
  batches?: Batch[];
  /**
   * A token, which can be sent as page_token to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeListBatchesResponse(data: any): ListBatchesResponse {
  return {
    ...data,
    batches: data["batches"] !== undefined ? data["batches"].map((item: any) => (serializeBatch(item))) : undefined,
  };
}

function deserializeListBatchesResponse(data: any): ListBatchesResponse {
  return {
    ...data,
    batches: data["batches"] !== undefined ? data["batches"].map((item: any) => (deserializeBatch(item))) : undefined,
  };
}

/**
 * The list of all clusters in a project.
 */
export interface ListClustersResponse {
  /**
   * Output only. The clusters in the project.
   */
  readonly clusters?: Cluster[];
  /**
   * Output only. This token is included in the response if there are more
   * results to fetch. To fetch additional results, provide this value as the
   * page_token in a subsequent ListClustersRequest.
   */
  readonly nextPageToken?: string;
}

/**
 * A list of jobs in a project.
 */
export interface ListJobsResponse {
  /**
   * Output only. Jobs list.
   */
  readonly jobs?: Job[];
  /**
   * Optional. This token is included in the response if there are more results
   * to fetch. To fetch additional results, provide this value as the page_token
   * in a subsequent ListJobsRequest.
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
 * A response to a request to list workflow templates in a project.
 */
export interface ListWorkflowTemplatesResponse {
  /**
   * Output only. This token is included in the response if there are more
   * results to fetch. To fetch additional results, provide this value as the
   * page_token in a subsequent ListWorkflowTemplatesRequest.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. WorkflowTemplates list.
   */
  readonly templates?: WorkflowTemplate[];
}

/**
 * The runtime logging config of the job.
 */
export interface LoggingConfig {
  /**
   * The per-package log levels for the driver. This may include "root" package
   * name to configure rootLogger. Examples: 'com.google = FATAL', 'root =
   * INFO', 'org.apache = DEBUG'
   */
  driverLogLevels?: {
    [key: string]:  | "LEVEL_UNSPECIFIED" | "ALL" | "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL" | "OFF"
  };
}

/**
 * Cluster that is managed by the workflow.
 */
export interface ManagedCluster {
  /**
   * Required. The cluster name prefix. A unique cluster name will be formed by
   * appending a random suffix.The name must contain only lower-case letters
   * (a-z), numbers (0-9), and hyphens (-). Must begin with a letter. Cannot
   * begin or end with hyphen. Must consist of between 2 and 35 characters.
   */
  clusterName?: string;
  /**
   * Required. The cluster configuration.
   */
  config?: ClusterConfig;
  /**
   * Optional. The labels to associate with this cluster.Label keys must be
   * between 1 and 63 characters long, and must conform to the following PCRE
   * regular expression: \p{Ll}\p{Lo}{0,62}Label values must be between 1 and 63
   * characters long, and must conform to the following PCRE regular expression:
   * \p{Ll}\p{Lo}\p{N}_-{0,63}No more than 32 labels can be associated with a
   * given cluster.
   */
  labels?: {
    [key: string]: string
  };
}

function serializeManagedCluster(data: any): ManagedCluster {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeClusterConfig(data["config"]) : undefined,
  };
}

function deserializeManagedCluster(data: any): ManagedCluster {
  return {
    ...data,
    config: data["config"] !== undefined ? deserializeClusterConfig(data["config"]) : undefined,
  };
}

/**
 * Specifies the resources used to actively manage an instance group.
 */
export interface ManagedGroupConfig {
  /**
   * Output only. The name of the Instance Group Manager for this group.
   */
  readonly instanceGroupManagerName?: string;
  /**
   * Output only. The name of the Instance Template used for the Managed
   * Instance Group.
   */
  readonly instanceTemplateName?: string;
}

/**
 * Specifies a Metastore configuration.
 */
export interface MetastoreConfig {
  /**
   * Required. Resource name of an existing Dataproc Metastore service.Example:
   * projects/[project_id]/locations/[dataproc_region]/services/[service-name]
   */
  dataprocMetastoreService?: string;
}

/**
 * A Dataproc OSS metric.
 */
export interface Metric {
  /**
   * Optional. Specify one or more available OSS metrics
   * (https://cloud.google.com/dataproc/docs/guides/monitoring#available_oss_metrics)
   * to collect for the metric course (for the SPARK metric source, any Spark
   * metric (https://spark.apache.org/docs/latest/monitoring.html#metrics) can
   * be specified).Provide metrics in the following format: METRIC_SOURCE:
   * INSTANCE:GROUP:METRIC Use camelcase as appropriate.Examples:
   * yarn:ResourceManager:QueueMetrics:AppsCompleted
   * spark:driver:DAGScheduler:job.allJobs
   * sparkHistoryServer:JVM:Memory:NonHeapMemoryUsage.committed
   * hiveserver2:JVM:Memory:NonHeapMemoryUsage.used Notes: Only the specified
   * overridden metrics will be collected for the metric source. For example, if
   * one or more spark:executive metrics are listed as metric overrides, other
   * SPARK metrics will not be collected. The collection of the default metrics
   * for other OSS metric sources is unaffected. For example, if both SPARK andd
   * YARN metric sources are enabled, and overrides are provided for Spark
   * metrics only, all default YARN metrics will be collected.
   */
  metricOverrides?: string[];
  /**
   * Required. Default metrics are collected unless metricOverrides are
   * specified for the metric source (see Available OSS metrics
   * (https://cloud.google.com/dataproc/docs/guides/monitoring#available_oss_metrics)
   * for more information).
   */
  metricSource?:  | "METRIC_SOURCE_UNSPECIFIED" | "MONITORING_AGENT_DEFAULTS" | "HDFS" | "SPARK" | "YARN" | "SPARK_HISTORY_SERVER" | "HIVESERVER2" | "HIVEMETASTORE";
}

/**
 * Deprecated. Used only for the deprecated beta. A full, namespace-isolated
 * deployment target for an existing GKE cluster.
 */
export interface NamespacedGkeDeploymentTarget {
  /**
   * Optional. A namespace within the GKE cluster to deploy into.
   */
  clusterNamespace?: string;
  /**
   * Optional. The target GKE cluster to deploy to. Format:
   * 'projects/{project}/locations/{location}/clusters/{cluster_id}'
   */
  targetGkeCluster?: string;
}

/**
 * Dataproc Node Group. The Dataproc NodeGroup resource is not related to the
 * Dataproc NodeGroupAffinity resource.
 */
export interface NodeGroup {
  /**
   * Optional. Node group labels. Label keys must consist of from 1 to 63
   * characters and conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt).
   * Label values can be empty. If specified, they must consist of from 1 to 63
   * characters and conform to RFC 1035 (https://www.ietf.org/rfc/rfc1035.txt).
   * The node group must have no more than 32 labelsn.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The Node group resource name (https://aip.dev/122).
   */
  name?: string;
  /**
   * Optional. The node group instance group configuration.
   */
  nodeGroupConfig?: InstanceGroupConfig;
  /**
   * Required. Node group roles.
   */
  roles?:  | "ROLE_UNSPECIFIED" | "DRIVER"[];
}

/**
 * Node Group Affinity for clusters using sole-tenant node groups. The Dataproc
 * NodeGroupAffinity resource is not related to the Dataproc NodeGroup resource.
 */
export interface NodeGroupAffinity {
  /**
   * Required. The URI of a sole-tenant node group resource
   * (https://cloud.google.com/compute/docs/reference/rest/v1/nodeGroups) that
   * the cluster will be created on.A full URL, partial URI, or node group name
   * are valid. Examples:
   * https://www.googleapis.com/compute/v1/projects/[project_id]/zones/[zone]/nodeGroups/node-group-1
   * projects/[project_id]/zones/[zone]/nodeGroups/node-group-1 node-group-1
   */
  nodeGroupUri?: string;
}

/**
 * Metadata describing the node group operation.
 */
export interface NodeGroupOperationMetadata {
  /**
   * Output only. Cluster UUID associated with the node group operation.
   */
  readonly clusterUuid?: string;
  /**
   * Output only. Short description of operation.
   */
  readonly description?: string;
  /**
   * Output only. Labels associated with the operation.
   */
  readonly labels?: {
    [key: string]: string
  };
  /**
   * Output only. Node group ID for the operation.
   */
  readonly nodeGroupId?: string;
  /**
   * The operation type.
   */
  operationType?:  | "NODE_GROUP_OPERATION_TYPE_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | "RESIZE";
  /**
   * Output only. Current operation status.
   */
  readonly status?: ClusterOperationStatus;
  /**
   * Output only. The previous operation status.
   */
  readonly statusHistory?: ClusterOperationStatus[];
  /**
   * Output only. Errors encountered during operation execution.
   */
  readonly warnings?: string[];
}

/**
 * Specifies an executable to run on a fully configured node and a timeout
 * period for executable completion.
 */
export interface NodeInitializationAction {
  /**
   * Required. Cloud Storage URI of executable file.
   */
  executableFile?: string;
  /**
   * Optional. Amount of time executable has to complete. Default is 10 minutes
   * (see JSON representation of Duration
   * (https://developers.google.com/protocol-buffers/docs/proto3#json)).Cluster
   * creation fails with an explanatory error message (the name of the
   * executable that caused the error and the exceeded timeout period) if the
   * executable is not completed at end of the timeout period.
   */
  executionTimeout?: number /* Duration */;
}

function serializeNodeInitializationAction(data: any): NodeInitializationAction {
  return {
    ...data,
    executionTimeout: data["executionTimeout"] !== undefined ? data["executionTimeout"] : undefined,
  };
}

function deserializeNodeInitializationAction(data: any): NodeInitializationAction {
  return {
    ...data,
    executionTimeout: data["executionTimeout"] !== undefined ? data["executionTimeout"] : undefined,
  };
}

/**
 * indicating a list of workers of same type
 */
export interface NodePool {
  /**
   * Required. A unique id of the node pool. Primary and Secondary workers can
   * be specified using special reserved ids PRIMARY_WORKER_POOL and
   * SECONDARY_WORKER_POOL respectively. Aux node pools can be referenced using
   * corresponding pool id.
   */
  id?: string;
  /**
   * Name of instances to be repaired. These instances must belong to specified
   * node pool.
   */
  instanceNames?: string[];
  /**
   * Required. Repair action to take on specified resources of the node pool.
   */
  repairAction?:  | "REPAIR_ACTION_UNSPECIFIED" | "DELETE";
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface Operation {
  /**
   * If the value is false, it means the operation is still in progress. If
   * true, the operation is completed, and either error or response is
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
   * that originally returns it. If you use the default HTTP mapping, the name
   * should be a resource name ending with operations/{unique_id}.
   */
  name?: string;
  /**
   * The normal response of the operation in case of success. If the original
   * method returns no data on success, such as Delete, the response is
   * google.protobuf.Empty. If the original method is standard
   * Get/Create/Update, the response should be the resource. For other methods,
   * the response should have the type XxxResponse, where Xxx is the original
   * method name. For example, if the original method name is TakeSnapshot(),
   * the inferred response type is TakeSnapshotResponse.
   */
  response?: {
    [key: string]: any
  };
}

/**
 * A job executed by the workflow.
 */
export interface OrderedJob {
  /**
   * Optional. Job is a Hadoop job.
   */
  hadoopJob?: HadoopJob;
  /**
   * Optional. Job is a Hive job.
   */
  hiveJob?: HiveJob;
  /**
   * Optional. The labels to associate with this job.Label keys must be between
   * 1 and 63 characters long, and must conform to the following regular
   * expression: \p{Ll}\p{Lo}{0,62}Label values must be between 1 and 63
   * characters long, and must conform to the following regular expression:
   * \p{Ll}\p{Lo}\p{N}_-{0,63}No more than 32 labels can be associated with a
   * given job.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. Job is a Pig job.
   */
  pigJob?: PigJob;
  /**
   * Optional. The optional list of prerequisite job step_ids. If not
   * specified, the job will start at the beginning of workflow.
   */
  prerequisiteStepIds?: string[];
  /**
   * Optional. Job is a Presto job.
   */
  prestoJob?: PrestoJob;
  /**
   * Optional. Job is a PySpark job.
   */
  pysparkJob?: PySparkJob;
  /**
   * Optional. Job scheduling configuration.
   */
  scheduling?: JobScheduling;
  /**
   * Optional. Job is a Spark job.
   */
  sparkJob?: SparkJob;
  /**
   * Optional. Job is a SparkR job.
   */
  sparkRJob?: SparkRJob;
  /**
   * Optional. Job is a SparkSql job.
   */
  sparkSqlJob?: SparkSqlJob;
  /**
   * Required. The step id. The id must be unique among all jobs within the
   * template.The step id is used as prefix for job id, as job
   * goog-dataproc-workflow-step-id label, and in prerequisiteStepIds field from
   * other steps.The id must contain only letters (a-z, A-Z), numbers (0-9),
   * underscores (_), and hyphens (-). Cannot begin or end with underscore or
   * hyphen. Must consist of between 3 and 50 characters.
   */
  stepId?: string;
  /**
   * Optional. Job is a Trino job.
   */
  trinoJob?: TrinoJob;
}

/**
 * Configuration for parameter validation.
 */
export interface ParameterValidation {
  /**
   * Validation based on regular expressions.
   */
  regex?: RegexValidation;
  /**
   * Validation based on a list of allowed values.
   */
  values?: ValueValidation;
}

/**
 * Auxiliary services configuration for a workload.
 */
export interface PeripheralsConfig {
  /**
   * Optional. Resource name of an existing Dataproc Metastore service.Example:
   * projects/[project_id]/locations/[region]/services/[service_id]
   */
  metastoreService?: string;
  /**
   * Optional. The Spark History Server configuration for the workload.
   */
  sparkHistoryServerConfig?: SparkHistoryServerConfig;
}

/**
 * A Dataproc job for running Apache Pig (https://pig.apache.org/) queries on
 * YARN.
 */
export interface PigJob {
  /**
   * Optional. Whether to continue executing queries if a query fails. The
   * default value is false. Setting to true can be useful when executing
   * independent parallel queries.
   */
  continueOnFailure?: boolean;
  /**
   * Optional. HCFS URIs of jar files to add to the CLASSPATH of the Pig Client
   * and Hadoop MapReduce (MR) tasks. Can contain Pig UDFs.
   */
  jarFileUris?: string[];
  /**
   * Optional. The runtime log config for job execution.
   */
  loggingConfig?: LoggingConfig;
  /**
   * Optional. A mapping of property names to values, used to configure Pig.
   * Properties that conflict with values set by the Dataproc API may be
   * overwritten. Can include properties set in /etc/hadoop/conf/*-site.xml,
   * /etc/pig/conf/pig.properties, and classes in user code.
   */
  properties?: {
    [key: string]: string
  };
  /**
   * The HCFS URI of the script that contains the Pig queries.
   */
  queryFileUri?: string;
  /**
   * A list of queries.
   */
  queryList?: QueryList;
  /**
   * Optional. Mapping of query variable names to values (equivalent to the Pig
   * command: name=[value]).
   */
  scriptVariables?: {
    [key: string]: string
  };
}

/**
 * An Identity and Access Management (IAM) policy, which specifies access
 * controls for Google Cloud resources.A Policy is a collection of bindings. A
 * binding binds one or more members, or principals, to a single role.
 * Principals can be user accounts, service accounts, Google groups, and domains
 * (such as G Suite). A role is a named list of permissions; each role can be an
 * IAM predefined role or a user-created custom role.For some types of Google
 * Cloud resources, a binding can also specify a condition, which is a logical
 * expression that allows access to a resource only if the expression evaluates
 * to true. A condition can add constraints based on attributes of the request,
 * the resource, or both. To learn which resources support conditions in their
 * IAM policies, see the IAM documentation
 * (https://cloud.google.com/iam/help/conditions/resource-policies).JSON
 * example: { "bindings": [ { "role": "roles/resourcemanager.organizationAdmin",
 * "members": [ "user:mike@example.com", "group:admins@example.com",
 * "domain:google.com",
 * "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role":
 * "roles/resourcemanager.organizationViewer", "members": [
 * "user:eve@example.com" ], "condition": { "title": "expirable access",
 * "description": "Does not grant access after Sep 2020", "expression":
 * "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } ], "etag":
 * "BwWWja0YfJA=", "version": 3 } YAML example: bindings: - members: -
 * user:mike@example.com - group:admins@example.com - domain:google.com -
 * serviceAccount:my-project-id@appspot.gserviceaccount.com role:
 * roles/resourcemanager.organizationAdmin - members: - user:eve@example.com
 * role: roles/resourcemanager.organizationViewer condition: title: expirable
 * access description: Does not grant access after Sep 2020 expression:
 * request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA=
 * version: 3 For a description of IAM and its features, see the IAM
 * documentation (https://cloud.google.com/iam/docs/).
 */
export interface Policy {
  /**
   * Associates a list of members, or principals, with a role. Optionally, may
   * specify a condition that determines how and when the bindings are applied.
   * Each of the bindings must contain at least one principal.The bindings in a
   * Policy can refer to up to 1,500 principals; up to 250 of these principals
   * can be Google groups. Each occurrence of a principal counts towards these
   * limits. For example, if the bindings grant 50 different roles to
   * user:alice@example.com, and not to any other principal, then you can add
   * another 1,450 principals to the bindings in the Policy.
   */
  bindings?: Binding[];
  /**
   * etag is used for optimistic concurrency control as a way to help prevent
   * simultaneous updates of a policy from overwriting each other. It is
   * strongly suggested that systems make use of the etag in the
   * read-modify-write cycle to perform policy updates in order to avoid race
   * conditions: An etag is returned in the response to getIamPolicy, and
   * systems are expected to put that etag in the request to setIamPolicy to
   * ensure that their change will be applied to the same version of the
   * policy.Important: If you use IAM Conditions, you must include the etag
   * field whenever you call setIamPolicy. If you omit this field, then IAM
   * allows you to overwrite a version 3 policy with a version 1 policy, and all
   * of the conditions in the version 3 policy are lost.
   */
  etag?: Uint8Array;
  /**
   * Specifies the format of the policy.Valid values are 0, 1, and 3. Requests
   * that specify an invalid value are rejected.Any operation that affects
   * conditional role bindings must specify version 3. This requirement applies
   * to the following operations: Getting a policy that includes a conditional
   * role binding Adding a conditional role binding to a policy Changing a
   * conditional role binding in a policy Removing any role binding, with or
   * without a condition, from a policy that includes conditionsImportant: If
   * you use IAM Conditions, you must include the etag field whenever you call
   * setIamPolicy. If you omit this field, then IAM allows you to overwrite a
   * version 3 policy with a version 1 policy, and all of the conditions in the
   * version 3 policy are lost.If a policy does not include any conditions,
   * operations on that policy may specify any valid version or leave the field
   * unset.To learn which resources support conditions in their IAM policies,
   * see the IAM documentation
   * (https://cloud.google.com/iam/help/conditions/resource-policies).
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
 * A Dataproc job for running Presto (https://prestosql.io/) queries.
 * IMPORTANT: The Dataproc Presto Optional Component
 * (https://cloud.google.com/dataproc/docs/concepts/components/presto) must be
 * enabled when the cluster is created to submit a Presto job to the cluster.
 */
export interface PrestoJob {
  /**
   * Optional. Presto client tags to attach to this query
   */
  clientTags?: string[];
  /**
   * Optional. Whether to continue executing queries if a query fails. The
   * default value is false. Setting to true can be useful when executing
   * independent parallel queries.
   */
  continueOnFailure?: boolean;
  /**
   * Optional. The runtime log config for job execution.
   */
  loggingConfig?: LoggingConfig;
  /**
   * Optional. The format in which query output will be displayed. See the
   * Presto documentation for supported output formats
   */
  outputFormat?: string;
  /**
   * Optional. A mapping of property names to values. Used to set Presto
   * session properties (https://prestodb.io/docs/current/sql/set-session.html)
   * Equivalent to using the --session flag in the Presto CLI
   */
  properties?: {
    [key: string]: string
  };
  /**
   * The HCFS URI of the script that contains SQL queries.
   */
  queryFileUri?: string;
  /**
   * A list of queries.
   */
  queryList?: QueryList;
}

/**
 * Additional options for Dataproc#projectsLocationsAutoscalingPoliciesList.
 */
export interface ProjectsLocationsAutoscalingPoliciesListOptions {
  /**
   * Optional. The maximum number of results to return in each response. Must
   * be less than or equal to 1000. Defaults to 100.
   */
  pageSize?: number;
  /**
   * Optional. The page token, returned by a previous call, to request the next
   * page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataproc#projectsLocationsBatchesCreate.
 */
export interface ProjectsLocationsBatchesCreateOptions {
  /**
   * Optional. The ID to use for the batch, which will become the final
   * component of the batch's resource name.This value must be 4-63 characters.
   * Valid characters are /[a-z][0-9]-/.
   */
  batchId?: string;
  /**
   * Optional. A unique ID used to identify the request. If the service
   * receives two CreateBatchRequest
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.CreateBatchRequest)s
   * with the same request_id, the second request is ignored and the Operation
   * that corresponds to the first Batch created and stored in the backend is
   * returned.Recommendation: Set this value to a UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier).The value
   * must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). The maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * Additional options for Dataproc#projectsLocationsBatchesList.
 */
export interface ProjectsLocationsBatchesListOptions {
  /**
   * Optional. A filter for the batches to return in the response.A filter is a
   * logical expression constraining the values of various fields in each batch
   * resource. Filters are case sensitive, and may contain multiple clauses
   * combined with logical operators (AND/OR). Supported fields are batch_id,
   * batch_uuid, state, and create_time.e.g. state = RUNNING and create_time <
   * "2023-01-01T00:00:00Z" filters for batches in state RUNNING that were
   * created before 2023-01-01See
   * https://google.aip.dev/assets/misc/ebnf-filtering.txt for a detailed
   * description of the filter syntax and a list of supported comparisons.
   */
  filter?: string;
  /**
   * Optional. Field(s) on which to sort the list of batches.Currently the only
   * supported sort orders are unspecified (empty) and create_time desc to sort
   * by most recently created batches first.See
   * https://google.aip.dev/132#ordering for more details.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of batches to return in each response. The
   * service may return fewer than this value. The default page size is 20; the
   * maximum page size is 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token received from a previous ListBatches call. Provide
   * this token to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataproc#projectsLocationsOperationsList.
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
 * Additional options for Dataproc#projectsLocationsWorkflowTemplatesDelete.
 */
export interface ProjectsLocationsWorkflowTemplatesDeleteOptions {
  /**
   * Optional. The version of workflow template to delete. If specified, will
   * only delete the template if the current server version matches specified
   * version.
   */
  version?: number;
}

/**
 * Additional options for Dataproc#projectsLocationsWorkflowTemplatesGet.
 */
export interface ProjectsLocationsWorkflowTemplatesGetOptions {
  /**
   * Optional. The version of workflow template to retrieve. Only previously
   * instantiated versions can be retrieved.If unspecified, retrieves the
   * current version.
   */
  version?: number;
}

/**
 * Additional options for
 * Dataproc#projectsLocationsWorkflowTemplatesInstantiateInline.
 */
export interface ProjectsLocationsWorkflowTemplatesInstantiateInlineOptions {
  /**
   * Optional. A tag that prevents multiple concurrent workflow instances with
   * the same tag from running. This mitigates risk of concurrent instances
   * started due to retries.It is recommended to always set this value to a UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier).The tag must
   * contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). The maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * Additional options for Dataproc#projectsLocationsWorkflowTemplatesList.
 */
export interface ProjectsLocationsWorkflowTemplatesListOptions {
  /**
   * Optional. The maximum number of results to return in each response.
   */
  pageSize?: number;
  /**
   * Optional. The page token, returned by a previous call, to request the next
   * page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataproc#projectsRegionsAutoscalingPoliciesList.
 */
export interface ProjectsRegionsAutoscalingPoliciesListOptions {
  /**
   * Optional. The maximum number of results to return in each response. Must
   * be less than or equal to 1000. Defaults to 100.
   */
  pageSize?: number;
  /**
   * Optional. The page token, returned by a previous call, to request the next
   * page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataproc#projectsRegionsClustersCreate.
 */
export interface ProjectsRegionsClustersCreateOptions {
  /**
   * Optional. Failure action when primary worker creation fails.
   */
  actionOnFailedPrimaryWorkers?:  | "FAILURE_ACTION_UNSPECIFIED" | "NO_ACTION" | "DELETE";
  /**
   * Optional. A unique ID used to identify the request. If the server receives
   * two CreateClusterRequest
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.CreateClusterRequest)s
   * with the same id, then the second request will be ignored and the first
   * google.longrunning.Operation created and stored in the backend is
   * returned.It is recommended to always set this value to a UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must
   * contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). The maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * Additional options for Dataproc#projectsRegionsClustersDelete.
 */
export interface ProjectsRegionsClustersDeleteOptions {
  /**
   * Optional. Specifying the cluster_uuid means the RPC should fail (with
   * error NOT_FOUND) if cluster with specified UUID does not exist.
   */
  clusterUuid?: string;
  /**
   * Optional. A unique ID used to identify the request. If the server receives
   * two DeleteClusterRequest
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.DeleteClusterRequest)s
   * with the same id, then the second request will be ignored and the first
   * google.longrunning.Operation created and stored in the backend is
   * returned.It is recommended to always set this value to a UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must
   * contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). The maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * Additional options for Dataproc#projectsRegionsClustersList.
 */
export interface ProjectsRegionsClustersListOptions {
  /**
   * Optional. A filter constraining the clusters to list. Filters are
   * case-sensitive and have the following syntax:field = value AND field =
   * value ...where field is one of status.state, clusterName, or labels.[KEY],
   * and [KEY] is a label key. value can be * to match all values. status.state
   * can be one of the following: ACTIVE, INACTIVE, CREATING, RUNNING, ERROR,
   * DELETING, or UPDATING. ACTIVE contains the CREATING, UPDATING, and RUNNING
   * states. INACTIVE contains the DELETING and ERROR states. clusterName is the
   * name of the cluster provided at creation time. Only the logical AND
   * operator is supported; space-separated items are treated as having an
   * implicit AND operator.Example filter:status.state = ACTIVE AND clusterName
   * = mycluster AND labels.env = staging AND labels.starred = *
   */
  filter?: string;
  /**
   * Optional. The standard List page size.
   */
  pageSize?: number;
  /**
   * Optional. The standard List page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataproc#projectsRegionsClustersNodeGroupsCreate.
 */
export interface ProjectsRegionsClustersNodeGroupsCreateOptions {
  /**
   * Optional. An optional node group ID. Generated if not specified.The ID
   * must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). Cannot begin or end with underscore or hyphen. Must consist of
   * from 3 to 33 characters.
   */
  nodeGroupId?: string;
  /**
   * Optional. A unique ID used to identify the request. If the server receives
   * two CreateNodeGroupRequest
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.CreateNodeGroupRequests)
   * with the same ID, the second request is ignored and the first
   * google.longrunning.Operation created and stored in the backend is
   * returned.Recommendation: Set this value to a UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must
   * contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). The maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * Additional options for Dataproc#projectsRegionsClustersPatch.
 */
export interface ProjectsRegionsClustersPatchOptions {
  /**
   * Optional. Timeout for graceful YARN decommissioning. Graceful
   * decommissioning allows removing nodes from the cluster without interrupting
   * jobs in progress. Timeout specifies how long to wait for jobs in progress
   * to finish before forcefully removing nodes (and potentially interrupting
   * jobs). Default timeout is 0 (for forceful decommission), and the maximum
   * allowed timeout is 1 day. (see JSON representation of Duration
   * (https://developers.google.com/protocol-buffers/docs/proto3#json)).Only
   * supported on Dataproc image versions 1.2 and higher.
   */
  gracefulDecommissionTimeout?: number /* Duration */;
  /**
   * Optional. A unique ID used to identify the request. If the server receives
   * two UpdateClusterRequest
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.UpdateClusterRequest)s
   * with the same id, then the second request will be ignored and the first
   * google.longrunning.Operation created and stored in the backend is
   * returned.It is recommended to always set this value to a UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must
   * contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). The maximum length is 40 characters.
   */
  requestId?: string;
  /**
   * Required. Specifies the path, relative to Cluster, of the field to update.
   * For example, to change the number of workers in a cluster to 5, the
   * update_mask parameter would be specified as
   * config.worker_config.num_instances, and the PATCH request body would
   * specify the new value, as follows: { "config":{ "workerConfig":{
   * "numInstances":"5" } } } Similarly, to change the number of preemptible
   * workers in a cluster to 5, the update_mask parameter would be
   * config.secondary_worker_config.num_instances, and the PATCH request body
   * would be set as follows: { "config":{ "secondaryWorkerConfig":{
   * "numInstances":"5" } } } *Note:* Currently, only the following fields can
   * be updated: *Mask* *Purpose* *labels* Update labels
   * *config.worker_config.num_instances* Resize primary worker group
   * *config.secondary_worker_config.num_instances* Resize secondary worker
   * group config.autoscaling_config.policy_uri Use, stop using, or change
   * autoscaling policies
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsRegionsClustersPatchOptions(data: any): ProjectsRegionsClustersPatchOptions {
  return {
    ...data,
    gracefulDecommissionTimeout: data["gracefulDecommissionTimeout"] !== undefined ? data["gracefulDecommissionTimeout"] : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsRegionsClustersPatchOptions(data: any): ProjectsRegionsClustersPatchOptions {
  return {
    ...data,
    gracefulDecommissionTimeout: data["gracefulDecommissionTimeout"] !== undefined ? data["gracefulDecommissionTimeout"] : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dataproc#projectsRegionsJobsList.
 */
export interface ProjectsRegionsJobsListOptions {
  /**
   * Optional. If set, the returned jobs list includes only jobs that were
   * submitted to the named cluster.
   */
  clusterName?: string;
  /**
   * Optional. A filter constraining the jobs to list. Filters are
   * case-sensitive and have the following syntax:field = value AND field =
   * value ...where field is status.state or labels.[KEY], and [KEY] is a label
   * key. value can be * to match all values. status.state can be either ACTIVE
   * or NON_ACTIVE. Only the logical AND operator is supported; space-separated
   * items are treated as having an implicit AND operator.Example
   * filter:status.state = ACTIVE AND labels.env = staging AND labels.starred =
   * *
   */
  filter?: string;
  /**
   * Optional. Specifies enumerated categories of jobs to list. (default =
   * match ALL jobs).If filter is provided, jobStateMatcher will be ignored.
   */
  jobStateMatcher?:  | "ALL" | "ACTIVE" | "NON_ACTIVE";
  /**
   * Optional. The number of results to return in each response.
   */
  pageSize?: number;
  /**
   * Optional. The page token, returned by a previous call, to request the next
   * page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataproc#projectsRegionsJobsPatch.
 */
export interface ProjectsRegionsJobsPatchOptions {
  /**
   * Required. Specifies the path, relative to Job, of the field to update. For
   * example, to update the labels of a Job the update_mask parameter would be
   * specified as labels, and the PATCH request body would specify the new
   * value. *Note:* Currently, labels is the only field that can be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsRegionsJobsPatchOptions(data: any): ProjectsRegionsJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsRegionsJobsPatchOptions(data: any): ProjectsRegionsJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dataproc#projectsRegionsOperationsList.
 */
export interface ProjectsRegionsOperationsListOptions {
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
 * Additional options for Dataproc#projectsRegionsWorkflowTemplatesDelete.
 */
export interface ProjectsRegionsWorkflowTemplatesDeleteOptions {
  /**
   * Optional. The version of workflow template to delete. If specified, will
   * only delete the template if the current server version matches specified
   * version.
   */
  version?: number;
}

/**
 * Additional options for Dataproc#projectsRegionsWorkflowTemplatesGet.
 */
export interface ProjectsRegionsWorkflowTemplatesGetOptions {
  /**
   * Optional. The version of workflow template to retrieve. Only previously
   * instantiated versions can be retrieved.If unspecified, retrieves the
   * current version.
   */
  version?: number;
}

/**
 * Additional options for
 * Dataproc#projectsRegionsWorkflowTemplatesInstantiateInline.
 */
export interface ProjectsRegionsWorkflowTemplatesInstantiateInlineOptions {
  /**
   * Optional. A tag that prevents multiple concurrent workflow instances with
   * the same tag from running. This mitigates risk of concurrent instances
   * started due to retries.It is recommended to always set this value to a UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier).The tag must
   * contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). The maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * Additional options for Dataproc#projectsRegionsWorkflowTemplatesList.
 */
export interface ProjectsRegionsWorkflowTemplatesListOptions {
  /**
   * Optional. The maximum number of results to return in each response.
   */
  pageSize?: number;
  /**
   * Optional. The page token, returned by a previous call, to request the next
   * page of results.
   */
  pageToken?: string;
}

/**
 * A configuration for running an Apache PySpark
 * (https://spark.apache.org/docs/latest/api/python/getting_started/quickstart.html)
 * batch workload.
 */
export interface PySparkBatch {
  /**
   * Optional. HCFS URIs of archives to be extracted into the working directory
   * of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and
   * .zip.
   */
  archiveUris?: string[];
  /**
   * Optional. The arguments to pass to the driver. Do not include arguments
   * that can be set as batch properties, such as --conf, since a collision can
   * occur that causes an incorrect batch submission.
   */
  args?: string[];
  /**
   * Optional. HCFS URIs of files to be placed in the working directory of each
   * executor.
   */
  fileUris?: string[];
  /**
   * Optional. HCFS URIs of jar files to add to the classpath of the Spark
   * driver and tasks.
   */
  jarFileUris?: string[];
  /**
   * Required. The HCFS URI of the main Python file to use as the Spark driver.
   * Must be a .py file.
   */
  mainPythonFileUri?: string;
  /**
   * Optional. HCFS file URIs of Python files to pass to the PySpark framework.
   * Supported file types: .py, .egg, and .zip.
   */
  pythonFileUris?: string[];
}

/**
 * A Dataproc job for running Apache PySpark
 * (https://spark.apache.org/docs/0.9.0/python-programming-guide.html)
 * applications on YARN.
 */
export interface PySparkJob {
  /**
   * Optional. HCFS URIs of archives to be extracted into the working directory
   * of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and
   * .zip.
   */
  archiveUris?: string[];
  /**
   * Optional. The arguments to pass to the driver. Do not include arguments,
   * such as --conf, that can be set as job properties, since a collision may
   * occur that causes an incorrect job submission.
   */
  args?: string[];
  /**
   * Optional. HCFS URIs of files to be placed in the working directory of each
   * executor. Useful for naively parallel tasks.
   */
  fileUris?: string[];
  /**
   * Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Python
   * driver and tasks.
   */
  jarFileUris?: string[];
  /**
   * Optional. The runtime log config for job execution.
   */
  loggingConfig?: LoggingConfig;
  /**
   * Required. The HCFS URI of the main Python file to use as the driver. Must
   * be a .py file.
   */
  mainPythonFileUri?: string;
  /**
   * Optional. A mapping of property names to values, used to configure
   * PySpark. Properties that conflict with values set by the Dataproc API may
   * be overwritten. Can include properties set in
   * /etc/spark/conf/spark-defaults.conf and classes in user code.
   */
  properties?: {
    [key: string]: string
  };
  /**
   * Optional. HCFS file URIs of Python files to pass to the PySpark framework.
   * Supported file types: .py, .egg, and .zip.
   */
  pythonFileUris?: string[];
}

/**
 * A list of queries to run on a cluster.
 */
export interface QueryList {
  /**
   * Required. The queries to execute. You do not need to end a query
   * expression with a semicolon. Multiple queries can be specified in one
   * string by separating each with a semicolon. Here is an example of a
   * Dataproc API snippet that uses a QueryList to specify a HiveJob: "hiveJob":
   * { "queryList": { "queries": [ "query1", "query2", "query3;query4", ] } }
   */
  queries?: string[];
}

/**
 * Validation based on regular expressions.
 */
export interface RegexValidation {
  /**
   * Required. RE2 regular expressions used to validate the parameter's value.
   * The value must match the regex in its entirety (substring matches are not
   * sufficient).
   */
  regexes?: string[];
}

/**
 * A request to repair a cluster.
 */
export interface RepairClusterRequest {
  /**
   * Optional. Specifying the cluster_uuid means the RPC will fail (with error
   * NOT_FOUND) if a cluster with the specified UUID does not exist.
   */
  clusterUuid?: string;
  /**
   * Optional. Timeout for graceful YARN decommissioning. Graceful
   * decommissioning facilitates the removal of cluster nodes without
   * interrupting jobs in progress. The timeout specifies the amount of time to
   * wait for jobs finish before forcefully removing nodes. The default timeout
   * is 0 for forceful decommissioning, and the maximum timeout period is 1 day.
   * (see JSON Mapping—Duration
   * (https://developers.google.com/protocol-buffers/docs/proto3#json)).graceful_decommission_timeout
   * is supported in Dataproc image versions 1.2+.
   */
  gracefulDecommissionTimeout?: number /* Duration */;
  /**
   * Optional. Node pools and corresponding repair action to be taken. All node
   * pools should be unique in this request. i.e. Multiple entries for the same
   * node pool id are not allowed.
   */
  nodePools?: NodePool[];
  /**
   * Optional. operation id of the parent operation sending the repair request
   */
  parentOperationId?: string;
  /**
   * Optional. A unique ID used to identify the request. If the server receives
   * two RepairClusterRequests with the same ID, the second request is ignored,
   * and the first google.longrunning.Operation created and stored in the
   * backend is returned.Recommendation: Set this value to a UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must
   * contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). The maximum length is 40 characters.
   */
  requestId?: string;
}

function serializeRepairClusterRequest(data: any): RepairClusterRequest {
  return {
    ...data,
    gracefulDecommissionTimeout: data["gracefulDecommissionTimeout"] !== undefined ? data["gracefulDecommissionTimeout"] : undefined,
  };
}

function deserializeRepairClusterRequest(data: any): RepairClusterRequest {
  return {
    ...data,
    gracefulDecommissionTimeout: data["gracefulDecommissionTimeout"] !== undefined ? data["gracefulDecommissionTimeout"] : undefined,
  };
}

/**
 * Reservation Affinity for consuming Zonal reservation.
 */
export interface ReservationAffinity {
  /**
   * Optional. Type of reservation to consume
   */
  consumeReservationType?:  | "TYPE_UNSPECIFIED" | "NO_RESERVATION" | "ANY_RESERVATION" | "SPECIFIC_RESERVATION";
  /**
   * Optional. Corresponds to the label key of reservation resource.
   */
  key?: string;
  /**
   * Optional. Corresponds to the label values of reservation resource.
   */
  values?: string[];
}

/**
 * A request to resize a node group.
 */
export interface ResizeNodeGroupRequest {
  /**
   * Optional. Timeout for graceful YARN decomissioning. Graceful
   * decommissioning
   * (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/scaling-clusters#graceful_decommissioning)
   * allows the removal of nodes from the Compute Engine node group without
   * interrupting jobs in progress. This timeout specifies how long to wait for
   * jobs in progress to finish before forcefully removing nodes (and
   * potentially interrupting jobs). Default timeout is 0 (for forceful
   * decommission), and the maximum allowed timeout is 1 day. (see JSON
   * representation of Duration
   * (https://developers.google.com/protocol-buffers/docs/proto3#json)).Only
   * supported on Dataproc image versions 1.2 and higher.
   */
  gracefulDecommissionTimeout?: number /* Duration */;
  /**
   * Optional. A unique ID used to identify the request. If the server receives
   * two ResizeNodeGroupRequest
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.ResizeNodeGroupRequests)
   * with the same ID, the second request is ignored and the first
   * google.longrunning.Operation created and stored in the backend is
   * returned.Recommendation: Set this value to a UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must
   * contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). The maximum length is 40 characters.
   */
  requestId?: string;
  /**
   * Required. The number of running instances for the node group to maintain.
   * The group adds or removes instances to maintain the number of instances
   * specified by this parameter.
   */
  size?: number;
}

function serializeResizeNodeGroupRequest(data: any): ResizeNodeGroupRequest {
  return {
    ...data,
    gracefulDecommissionTimeout: data["gracefulDecommissionTimeout"] !== undefined ? data["gracefulDecommissionTimeout"] : undefined,
  };
}

function deserializeResizeNodeGroupRequest(data: any): ResizeNodeGroupRequest {
  return {
    ...data,
    gracefulDecommissionTimeout: data["gracefulDecommissionTimeout"] !== undefined ? data["gracefulDecommissionTimeout"] : undefined,
  };
}

/**
 * Runtime configuration for a workload.
 */
export interface RuntimeConfig {
  /**
   * Optional. Optional custom container image for the job runtime environment.
   * If not specified, a default container image will be used.
   */
  containerImage?: string;
  /**
   * Optional. A mapping of property names to values, which are used to
   * configure workload execution.
   */
  properties?: {
    [key: string]: string
  };
  /**
   * Optional. Version of the batch runtime.
   */
  version?: string;
}

/**
 * Runtime information about workload execution.
 */
export interface RuntimeInfo {
  /**
   * Output only. Approximate workload resource usage calculated after workload
   * finishes (see Dataproc Serverless pricing
   * (https://cloud.google.com/dataproc-serverless/pricing)).
   */
  readonly approximateUsage?: UsageMetrics;
  /**
   * Output only. Snapshot of current workload resource usage.
   */
  readonly currentUsage?: UsageSnapshot;
  /**
   * Output only. A URI pointing to the location of the diagnostics tarball.
   */
  readonly diagnosticOutputUri?: string;
  /**
   * Output only. Map of remote access endpoints (such as web interfaces and
   * APIs) to their URIs.
   */
  readonly endpoints?: {
    [key: string]: string
  };
  /**
   * Output only. A URI pointing to the location of the stdout and stderr of
   * the workload.
   */
  readonly outputUri?: string;
}

/**
 * Security related configuration, including encryption, Kerberos, etc.
 */
export interface SecurityConfig {
  /**
   * Optional. Identity related configuration, including service account based
   * secure multi-tenancy user mappings.
   */
  identityConfig?: IdentityConfig;
  /**
   * Optional. Kerberos related configuration.
   */
  kerberosConfig?: KerberosConfig;
}

/**
 * Metadata describing the Session operation.
 */
export interface SessionOperationMetadata {
  /**
   * The time when the operation was created.
   */
  createTime?: Date;
  /**
   * Short description of the operation.
   */
  description?: string;
  /**
   * The time when the operation was finished.
   */
  doneTime?: Date;
  /**
   * Labels associated with the operation.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The operation type.
   */
  operationType?:  | "SESSION_OPERATION_TYPE_UNSPECIFIED" | "CREATE" | "TERMINATE" | "DELETE";
  /**
   * Name of the session for the operation.
   */
  session?: string;
  /**
   * Session UUID for the operation.
   */
  sessionUuid?: string;
  /**
   * Warnings encountered during operation execution.
   */
  warnings?: string[];
}

function serializeSessionOperationMetadata(data: any): SessionOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    doneTime: data["doneTime"] !== undefined ? data["doneTime"].toISOString() : undefined,
  };
}

function deserializeSessionOperationMetadata(data: any): SessionOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    doneTime: data["doneTime"] !== undefined ? new Date(data["doneTime"]) : undefined,
  };
}

/**
 * Request message for SetIamPolicy method.
 */
export interface SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the resource. The size of
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
 * Shielded Instance Config for clusters using Compute Engine Shielded VMs
 * (https://cloud.google.com/security/shielded-cloud/shielded-vm).
 */
export interface ShieldedInstanceConfig {
  /**
   * Optional. Defines whether instances have integrity monitoring enabled.
   */
  enableIntegrityMonitoring?: boolean;
  /**
   * Optional. Defines whether instances have Secure Boot enabled.
   */
  enableSecureBoot?: boolean;
  /**
   * Optional. Defines whether instances have the vTPM enabled.
   */
  enableVtpm?: boolean;
}

/**
 * Specifies the selection and config of software inside the cluster.
 */
export interface SoftwareConfig {
  /**
   * Optional. The version of software inside the cluster. It must be one of
   * the supported Dataproc Versions
   * (https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#supported_dataproc_versions),
   * such as "1.2" (including a subminor version, such as "1.2.29"), or the
   * "preview" version
   * (https://cloud.google.com/dataproc/docs/concepts/versioning/dataproc-versions#other_versions).
   * If unspecified, it defaults to the latest Debian version.
   */
  imageVersion?: string;
  /**
   * Optional. The set of components to activate on the cluster.
   */
  optionalComponents?:  | "COMPONENT_UNSPECIFIED" | "ANACONDA" | "DOCKER" | "DRUID" | "FLINK" | "HBASE" | "HIVE_WEBHCAT" | "HUDI" | "JUPYTER" | "PRESTO" | "TRINO" | "RANGER" | "SOLR" | "ZEPPELIN" | "ZOOKEEPER"[];
  /**
   * Optional. The properties to set on daemon config files.Property keys are
   * specified in prefix:property format, for example core:hadoop.tmp.dir. The
   * following are supported prefixes and their mappings: capacity-scheduler:
   * capacity-scheduler.xml core: core-site.xml distcp: distcp-default.xml hdfs:
   * hdfs-site.xml hive: hive-site.xml mapred: mapred-site.xml pig:
   * pig.properties spark: spark-defaults.conf yarn: yarn-site.xmlFor more
   * information, see Cluster properties
   * (https://cloud.google.com/dataproc/docs/concepts/cluster-properties).
   */
  properties?: {
    [key: string]: string
  };
}

/**
 * A configuration for running an Apache Spark (https://spark.apache.org/)
 * batch workload.
 */
export interface SparkBatch {
  /**
   * Optional. HCFS URIs of archives to be extracted into the working directory
   * of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and
   * .zip.
   */
  archiveUris?: string[];
  /**
   * Optional. The arguments to pass to the driver. Do not include arguments
   * that can be set as batch properties, such as --conf, since a collision can
   * occur that causes an incorrect batch submission.
   */
  args?: string[];
  /**
   * Optional. HCFS URIs of files to be placed in the working directory of each
   * executor.
   */
  fileUris?: string[];
  /**
   * Optional. HCFS URIs of jar files to add to the classpath of the Spark
   * driver and tasks.
   */
  jarFileUris?: string[];
  /**
   * Optional. The name of the driver main class. The jar file that contains
   * the class must be in the classpath or specified in jar_file_uris.
   */
  mainClass?: string;
  /**
   * Optional. The HCFS URI of the jar file that contains the main class.
   */
  mainJarFileUri?: string;
}

/**
 * Spark History Server configuration for the workload.
 */
export interface SparkHistoryServerConfig {
  /**
   * Optional. Resource name of an existing Dataproc Cluster to act as a Spark
   * History Server for the workload.Example:
   * projects/[project_id]/regions/[region]/clusters/[cluster_name]
   */
  dataprocCluster?: string;
}

/**
 * A Dataproc job for running Apache Spark (https://spark.apache.org/)
 * applications on YARN.
 */
export interface SparkJob {
  /**
   * Optional. HCFS URIs of archives to be extracted into the working directory
   * of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and
   * .zip.
   */
  archiveUris?: string[];
  /**
   * Optional. The arguments to pass to the driver. Do not include arguments,
   * such as --conf, that can be set as job properties, since a collision may
   * occur that causes an incorrect job submission.
   */
  args?: string[];
  /**
   * Optional. HCFS URIs of files to be placed in the working directory of each
   * executor. Useful for naively parallel tasks.
   */
  fileUris?: string[];
  /**
   * Optional. HCFS URIs of jar files to add to the CLASSPATHs of the Spark
   * driver and tasks.
   */
  jarFileUris?: string[];
  /**
   * Optional. The runtime log config for job execution.
   */
  loggingConfig?: LoggingConfig;
  /**
   * The name of the driver's main class. The jar file that contains the class
   * must be in the default CLASSPATH or specified in jar_file_uris.
   */
  mainClass?: string;
  /**
   * The HCFS URI of the jar file that contains the main class.
   */
  mainJarFileUri?: string;
  /**
   * Optional. A mapping of property names to values, used to configure Spark.
   * Properties that conflict with values set by the Dataproc API may be
   * overwritten. Can include properties set in
   * /etc/spark/conf/spark-defaults.conf and classes in user code.
   */
  properties?: {
    [key: string]: string
  };
}

/**
 * A configuration for running an Apache SparkR
 * (https://spark.apache.org/docs/latest/sparkr.html) batch workload.
 */
export interface SparkRBatch {
  /**
   * Optional. HCFS URIs of archives to be extracted into the working directory
   * of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and
   * .zip.
   */
  archiveUris?: string[];
  /**
   * Optional. The arguments to pass to the Spark driver. Do not include
   * arguments that can be set as batch properties, such as --conf, since a
   * collision can occur that causes an incorrect batch submission.
   */
  args?: string[];
  /**
   * Optional. HCFS URIs of files to be placed in the working directory of each
   * executor.
   */
  fileUris?: string[];
  /**
   * Required. The HCFS URI of the main R file to use as the driver. Must be a
   * .R or .r file.
   */
  mainRFileUri?: string;
}

/**
 * A Dataproc job for running Apache SparkR
 * (https://spark.apache.org/docs/latest/sparkr.html) applications on YARN.
 */
export interface SparkRJob {
  /**
   * Optional. HCFS URIs of archives to be extracted into the working directory
   * of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and
   * .zip.
   */
  archiveUris?: string[];
  /**
   * Optional. The arguments to pass to the driver. Do not include arguments,
   * such as --conf, that can be set as job properties, since a collision may
   * occur that causes an incorrect job submission.
   */
  args?: string[];
  /**
   * Optional. HCFS URIs of files to be placed in the working directory of each
   * executor. Useful for naively parallel tasks.
   */
  fileUris?: string[];
  /**
   * Optional. The runtime log config for job execution.
   */
  loggingConfig?: LoggingConfig;
  /**
   * Required. The HCFS URI of the main R file to use as the driver. Must be a
   * .R file.
   */
  mainRFileUri?: string;
  /**
   * Optional. A mapping of property names to values, used to configure SparkR.
   * Properties that conflict with values set by the Dataproc API may be
   * overwritten. Can include properties set in
   * /etc/spark/conf/spark-defaults.conf and classes in user code.
   */
  properties?: {
    [key: string]: string
  };
}

/**
 * A configuration for running Apache Spark SQL (https://spark.apache.org/sql/)
 * queries as a batch workload.
 */
export interface SparkSqlBatch {
  /**
   * Optional. HCFS URIs of jar files to be added to the Spark CLASSPATH.
   */
  jarFileUris?: string[];
  /**
   * Required. The HCFS URI of the script that contains Spark SQL queries to
   * execute.
   */
  queryFileUri?: string;
  /**
   * Optional. Mapping of query variable names to values (equivalent to the
   * Spark SQL command: SET name="value";).
   */
  queryVariables?: {
    [key: string]: string
  };
}

/**
 * A Dataproc job for running Apache Spark SQL (https://spark.apache.org/sql/)
 * queries.
 */
export interface SparkSqlJob {
  /**
   * Optional. HCFS URIs of jar files to be added to the Spark CLASSPATH.
   */
  jarFileUris?: string[];
  /**
   * Optional. The runtime log config for job execution.
   */
  loggingConfig?: LoggingConfig;
  /**
   * Optional. A mapping of property names to values, used to configure Spark
   * SQL's SparkConf. Properties that conflict with values set by the Dataproc
   * API may be overwritten.
   */
  properties?: {
    [key: string]: string
  };
  /**
   * The HCFS URI of the script that contains SQL queries.
   */
  queryFileUri?: string;
  /**
   * A list of queries.
   */
  queryList?: QueryList;
  /**
   * Optional. Mapping of query variable names to values (equivalent to the
   * Spark SQL command: SET name="value";).
   */
  scriptVariables?: {
    [key: string]: string
  };
}

/**
 * Basic autoscaling configurations for Spark Standalone.
 */
export interface SparkStandaloneAutoscalingConfig {
  /**
   * Required. Timeout for Spark graceful decommissioning of spark workers.
   * Specifies the duration to wait for spark worker to complete spark
   * decomissioning tasks before forcefully removing workers. Only applicable to
   * downscaling operations.Bounds: 0s, 1d.
   */
  gracefulDecommissionTimeout?: number /* Duration */;
  /**
   * Required. Fraction of required executors to remove from Spark Serverless
   * clusters. A scale-down factor of 1.0 will result in scaling down so that
   * there are no more executors for the Spark Job.(more aggressive scaling). A
   * scale-down factor closer to 0 will result in a smaller magnitude of scaling
   * donw (less aggressive scaling).Bounds: 0.0, 1.0.
   */
  scaleDownFactor?: number;
  /**
   * Optional. Minimum scale-down threshold as a fraction of total cluster size
   * before scaling occurs. For example, in a 20-worker cluster, a threshold of
   * 0.1 means the autoscaler must recommend at least a 2 worker scale-down for
   * the cluster to scale. A threshold of 0 means the autoscaler will scale down
   * on any recommended change.Bounds: 0.0, 1.0. Default: 0.0.
   */
  scaleDownMinWorkerFraction?: number;
  /**
   * Required. Fraction of required workers to add to Spark Standalone
   * clusters. A scale-up factor of 1.0 will result in scaling up so that there
   * are no more required workers for the Spark Job (more aggressive scaling). A
   * scale-up factor closer to 0 will result in a smaller magnitude of scaling
   * up (less aggressive scaling).Bounds: 0.0, 1.0.
   */
  scaleUpFactor?: number;
  /**
   * Optional. Minimum scale-up threshold as a fraction of total cluster size
   * before scaling occurs. For example, in a 20-worker cluster, a threshold of
   * 0.1 means the autoscaler must recommend at least a 2-worker scale-up for
   * the cluster to scale. A threshold of 0 means the autoscaler will scale up
   * on any recommended change.Bounds: 0.0, 1.0. Default: 0.0.
   */
  scaleUpMinWorkerFraction?: number;
}

function serializeSparkStandaloneAutoscalingConfig(data: any): SparkStandaloneAutoscalingConfig {
  return {
    ...data,
    gracefulDecommissionTimeout: data["gracefulDecommissionTimeout"] !== undefined ? data["gracefulDecommissionTimeout"] : undefined,
  };
}

function deserializeSparkStandaloneAutoscalingConfig(data: any): SparkStandaloneAutoscalingConfig {
  return {
    ...data,
    gracefulDecommissionTimeout: data["gracefulDecommissionTimeout"] !== undefined ? data["gracefulDecommissionTimeout"] : undefined,
  };
}

/**
 * A request to start a cluster.
 */
export interface StartClusterRequest {
  /**
   * Optional. Specifying the cluster_uuid means the RPC will fail (with error
   * NOT_FOUND) if a cluster with the specified UUID does not exist.
   */
  clusterUuid?: string;
  /**
   * Optional. A unique ID used to identify the request. If the server receives
   * two StartClusterRequest
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.StartClusterRequest)s
   * with the same id, then the second request will be ignored and the first
   * google.longrunning.Operation created and stored in the backend is
   * returned.Recommendation: Set this value to a UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must
   * contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). The maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * Historical state information.
 */
export interface StateHistory {
  /**
   * Output only. The state of the batch at this point in history.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "CANCELLING" | "CANCELLED" | "SUCCEEDED" | "FAILED";
  /**
   * Output only. Details about the state at this point in history.
   */
  readonly stateMessage?: string;
  /**
   * Output only. The time when the batch entered the historical state.
   */
  readonly stateStartTime?: Date;
}

/**
 * The Status type defines a logical error model that is suitable for different
 * programming environments, including REST APIs and RPC APIs. It is used by
 * gRPC (https://github.com/grpc). Each Status message contains three pieces of
 * data: error code, error message, and error details.You can find out more
 * about this error model and how to work with it in the API Design Guide
 * (https://cloud.google.com/apis/design/errors).
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
 * A request to stop a cluster.
 */
export interface StopClusterRequest {
  /**
   * Optional. Specifying the cluster_uuid means the RPC will fail (with error
   * NOT_FOUND) if a cluster with the specified UUID does not exist.
   */
  clusterUuid?: string;
  /**
   * Optional. A unique ID used to identify the request. If the server receives
   * two StopClusterRequest
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.StopClusterRequest)s
   * with the same id, then the second request will be ignored and the first
   * google.longrunning.Operation created and stored in the backend is
   * returned.Recommendation: Set this value to a UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier).The ID must
   * contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). The maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * A request to submit a job.
 */
export interface SubmitJobRequest {
  /**
   * Required. The job resource.
   */
  job?: Job;
  /**
   * Optional. A unique id used to identify the request. If the server receives
   * two SubmitJobRequest
   * (https://cloud.google.com/dataproc/docs/reference/rpc/google.cloud.dataproc.v1#google.cloud.dataproc.v1.SubmitJobRequest)s
   * with the same id, then the second request will be ignored and the first Job
   * created and stored in the backend is returned.It is recommended to always
   * set this value to a UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier).The id must
   * contain only letters (a-z, A-Z), numbers (0-9), underscores (_), and
   * hyphens (-). The maximum length is 40 characters.
   */
  requestId?: string;
}

/**
 * A configurable parameter that replaces one or more fields in the template.
 * Parameterizable fields: - Labels - File uris - Job properties - Job arguments
 * - Script variables - Main class (in HadoopJob and SparkJob) - Zone (in
 * ClusterSelector)
 */
export interface TemplateParameter {
  /**
   * Optional. Brief description of the parameter. Must not exceed 1024
   * characters.
   */
  description?: string;
  /**
   * Required. Paths to all fields that the parameter replaces. A field is
   * allowed to appear in at most one parameter's list of field paths.A field
   * path is similar in syntax to a google.protobuf.FieldMask. For example, a
   * field path that references the zone field of a workflow template's cluster
   * selector would be specified as placement.clusterSelector.zone.Also, field
   * paths can reference fields using the following syntax: Values in maps can
   * be referenced by key: labels'key'
   * placement.clusterSelector.clusterLabels'key'
   * placement.managedCluster.labels'key'
   * placement.clusterSelector.clusterLabels'key' jobs'step-id'.labels'key' Jobs
   * in the jobs list can be referenced by step-id:
   * jobs'step-id'.hadoopJob.mainJarFileUri jobs'step-id'.hiveJob.queryFileUri
   * jobs'step-id'.pySparkJob.mainPythonFileUri
   * jobs'step-id'.hadoopJob.jarFileUris0 jobs'step-id'.hadoopJob.archiveUris0
   * jobs'step-id'.hadoopJob.fileUris0 jobs'step-id'.pySparkJob.pythonFileUris0
   * Items in repeated fields can be referenced by a zero-based index:
   * jobs'step-id'.sparkJob.args0 Other examples:
   * jobs'step-id'.hadoopJob.properties'key' jobs'step-id'.hadoopJob.args0
   * jobs'step-id'.hiveJob.scriptVariables'key'
   * jobs'step-id'.hadoopJob.mainJarFileUri placement.clusterSelector.zoneIt may
   * not be possible to parameterize maps and repeated fields in their entirety
   * since only individual map values and individual items in repeated fields
   * can be referenced. For example, the following field paths are invalid:
   * placement.clusterSelector.clusterLabels jobs'step-id'.sparkJob.args
   */
  fields?: string[];
  /**
   * Required. Parameter name. The parameter name is used as the key, and
   * paired with the parameter value, which are passed to the template when the
   * template is instantiated. The name must contain only capital letters (A-Z),
   * numbers (0-9), and underscores (_), and must not start with a number. The
   * maximum length is 40 characters.
   */
  name?: string;
  /**
   * Optional. Validation rules to be applied to this parameter's value.
   */
  validation?: ParameterValidation;
}

/**
 * Request message for TestIamPermissions method.
 */
export interface TestIamPermissionsRequest {
  /**
   * The set of permissions to check for the resource. Permissions with
   * wildcards (such as * or storage.*) are not allowed. For more information
   * see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions).
   */
  permissions?: string[];
}

/**
 * Response message for TestIamPermissions method.
 */
export interface TestIamPermissionsResponse {
  /**
   * A subset of TestPermissionsRequest.permissions that the caller is allowed.
   */
  permissions?: string[];
}

/**
 * A Dataproc job for running Trino (https://trino.io/) queries. IMPORTANT: The
 * Dataproc Trino Optional Component
 * (https://cloud.google.com/dataproc/docs/concepts/components/trino) must be
 * enabled when the cluster is created to submit a Trino job to the cluster.
 */
export interface TrinoJob {
  /**
   * Optional. Trino client tags to attach to this query
   */
  clientTags?: string[];
  /**
   * Optional. Whether to continue executing queries if a query fails. The
   * default value is false. Setting to true can be useful when executing
   * independent parallel queries.
   */
  continueOnFailure?: boolean;
  /**
   * Optional. The runtime log config for job execution.
   */
  loggingConfig?: LoggingConfig;
  /**
   * Optional. The format in which query output will be displayed. See the
   * Trino documentation for supported output formats
   */
  outputFormat?: string;
  /**
   * Optional. A mapping of property names to values. Used to set Trino session
   * properties (https://trino.io/docs/current/sql/set-session.html) Equivalent
   * to using the --session flag in the Trino CLI
   */
  properties?: {
    [key: string]: string
  };
  /**
   * The HCFS URI of the script that contains SQL queries.
   */
  queryFileUri?: string;
  /**
   * A list of queries.
   */
  queryList?: QueryList;
}

/**
 * Usage metrics represent approximate total resources consumed by a workload.
 */
export interface UsageMetrics {
  /**
   * Optional. DCU (Dataproc Compute Units) usage in (milliDCU x seconds) (see
   * Dataproc Serverless pricing
   * (https://cloud.google.com/dataproc-serverless/pricing)).
   */
  milliDcuSeconds?: bigint;
  /**
   * Optional. Shuffle storage usage in (GB x seconds) (see Dataproc Serverless
   * pricing (https://cloud.google.com/dataproc-serverless/pricing)).
   */
  shuffleStorageGbSeconds?: bigint;
}

function serializeUsageMetrics(data: any): UsageMetrics {
  return {
    ...data,
    milliDcuSeconds: data["milliDcuSeconds"] !== undefined ? String(data["milliDcuSeconds"]) : undefined,
    shuffleStorageGbSeconds: data["shuffleStorageGbSeconds"] !== undefined ? String(data["shuffleStorageGbSeconds"]) : undefined,
  };
}

function deserializeUsageMetrics(data: any): UsageMetrics {
  return {
    ...data,
    milliDcuSeconds: data["milliDcuSeconds"] !== undefined ? BigInt(data["milliDcuSeconds"]) : undefined,
    shuffleStorageGbSeconds: data["shuffleStorageGbSeconds"] !== undefined ? BigInt(data["shuffleStorageGbSeconds"]) : undefined,
  };
}

/**
 * The usage snaphot represents the resources consumed by a workload at a
 * specified time.
 */
export interface UsageSnapshot {
  /**
   * Optional. Milli (one-thousandth) Dataproc Compute Units (DCUs) (see
   * Dataproc Serverless pricing
   * (https://cloud.google.com/dataproc-serverless/pricing)).
   */
  milliDcu?: bigint;
  /**
   * Optional. Shuffle Storage in gigabytes (GB). (see Dataproc Serverless
   * pricing (https://cloud.google.com/dataproc-serverless/pricing))
   */
  shuffleStorageGb?: bigint;
  /**
   * Optional. The timestamp of the usage snapshot.
   */
  snapshotTime?: Date;
}

function serializeUsageSnapshot(data: any): UsageSnapshot {
  return {
    ...data,
    milliDcu: data["milliDcu"] !== undefined ? String(data["milliDcu"]) : undefined,
    shuffleStorageGb: data["shuffleStorageGb"] !== undefined ? String(data["shuffleStorageGb"]) : undefined,
    snapshotTime: data["snapshotTime"] !== undefined ? data["snapshotTime"].toISOString() : undefined,
  };
}

function deserializeUsageSnapshot(data: any): UsageSnapshot {
  return {
    ...data,
    milliDcu: data["milliDcu"] !== undefined ? BigInt(data["milliDcu"]) : undefined,
    shuffleStorageGb: data["shuffleStorageGb"] !== undefined ? BigInt(data["shuffleStorageGb"]) : undefined,
    snapshotTime: data["snapshotTime"] !== undefined ? new Date(data["snapshotTime"]) : undefined,
  };
}

/**
 * Validation based on a list of allowed values.
 */
export interface ValueValidation {
  /**
   * Required. List of allowed values for the parameter.
   */
  values?: string[];
}

/**
 * The Dataproc cluster config for a cluster that does not directly control the
 * underlying compute resources, such as a Dataproc-on-GKE cluster
 * (https://cloud.google.com/dataproc/docs/guides/dpgke/dataproc-gke-overview).
 */
export interface VirtualClusterConfig {
  /**
   * Optional. Configuration of auxiliary services used by this cluster.
   */
  auxiliaryServicesConfig?: AuxiliaryServicesConfig;
  /**
   * Required. The configuration for running the Dataproc cluster on
   * Kubernetes.
   */
  kubernetesClusterConfig?: KubernetesClusterConfig;
  /**
   * Optional. A Cloud Storage bucket used to stage job dependencies, config
   * files, and job driver console output. If you do not specify a staging
   * bucket, Cloud Dataproc will determine a Cloud Storage location (US, ASIA,
   * or EU) for your cluster's staging bucket according to the Compute Engine
   * zone where your cluster is deployed, and then create and manage this
   * project-level, per-location bucket (see Dataproc staging and temp buckets
   * (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/staging-bucket)).
   * This field requires a Cloud Storage bucket name, not a gs://... URI to a
   * Cloud Storage bucket.
   */
  stagingBucket?: string;
}

function serializeVirtualClusterConfig(data: any): VirtualClusterConfig {
  return {
    ...data,
    kubernetesClusterConfig: data["kubernetesClusterConfig"] !== undefined ? serializeKubernetesClusterConfig(data["kubernetesClusterConfig"]) : undefined,
  };
}

function deserializeVirtualClusterConfig(data: any): VirtualClusterConfig {
  return {
    ...data,
    kubernetesClusterConfig: data["kubernetesClusterConfig"] !== undefined ? deserializeKubernetesClusterConfig(data["kubernetesClusterConfig"]) : undefined,
  };
}

/**
 * The workflow graph.
 */
export interface WorkflowGraph {
  /**
   * Output only. The workflow nodes.
   */
  readonly nodes?: WorkflowNode[];
}

/**
 * A Dataproc workflow template resource.
 */
export interface WorkflowMetadata {
  /**
   * Output only. The name of the target cluster.
   */
  readonly clusterName?: string;
  /**
   * Output only. The UUID of target cluster.
   */
  readonly clusterUuid?: string;
  /**
   * Output only. The create cluster operation metadata.
   */
  readonly createCluster?: ClusterOperation;
  /**
   * Output only. DAG end time, only set for workflows with dag_timeout when
   * DAG ends.
   */
  readonly dagEndTime?: Date;
  /**
   * Output only. DAG start time, only set for workflows with dag_timeout when
   * DAG begins.
   */
  readonly dagStartTime?: Date;
  /**
   * Output only. The timeout duration for the DAG of jobs, expressed in
   * seconds (see JSON representation of duration
   * (https://developers.google.com/protocol-buffers/docs/proto3#json)).
   */
  readonly dagTimeout?: number /* Duration */;
  /**
   * Output only. The delete cluster operation metadata.
   */
  readonly deleteCluster?: ClusterOperation;
  /**
   * Output only. Workflow end time.
   */
  readonly endTime?: Date;
  /**
   * Output only. The workflow graph.
   */
  readonly graph?: WorkflowGraph;
  /**
   * Map from parameter names to values that were used for those parameters.
   */
  parameters?: {
    [key: string]: string
  };
  /**
   * Output only. Workflow start time.
   */
  readonly startTime?: Date;
  /**
   * Output only. The workflow state.
   */
  readonly state?:  | "UNKNOWN" | "PENDING" | "RUNNING" | "DONE";
  /**
   * Output only. The resource name of the workflow template as described in
   * https://cloud.google.com/apis/design/resource_names. For
   * projects.regions.workflowTemplates, the resource name of the template has
   * the following format:
   * projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For
   * projects.locations.workflowTemplates, the resource name of the template has
   * the following format:
   * projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
   */
  readonly template?: string;
  /**
   * Output only. The version of template at the time of workflow
   * instantiation.
   */
  readonly version?: number;
}

/**
 * The workflow node.
 */
export interface WorkflowNode {
  /**
   * Output only. The error detail.
   */
  readonly error?: string;
  /**
   * Output only. The job id; populated after the node enters RUNNING state.
   */
  readonly jobId?: string;
  /**
   * Output only. Node's prerequisite nodes.
   */
  readonly prerequisiteStepIds?: string[];
  /**
   * Output only. The node state.
   */
  readonly state?:  | "NODE_STATE_UNSPECIFIED" | "BLOCKED" | "RUNNABLE" | "RUNNING" | "COMPLETED" | "FAILED";
  /**
   * Output only. The name of the node.
   */
  readonly stepId?: string;
}

/**
 * A Dataproc workflow template resource.
 */
export interface WorkflowTemplate {
  /**
   * Output only. The time template was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. Timeout duration for the DAG of jobs, expressed in seconds (see
   * JSON representation of duration
   * (https://developers.google.com/protocol-buffers/docs/proto3#json)). The
   * timeout duration must be from 10 minutes ("600s") to 24 hours ("86400s").
   * The timer begins when the first job is submitted. If the workflow is
   * running at the end of the timeout period, any remaining jobs are cancelled,
   * the workflow is ended, and if the workflow was running on a managed
   * cluster, the cluster is deleted.
   */
  dagTimeout?: number /* Duration */;
  id?: string;
  /**
   * Required. The Directed Acyclic Graph of Jobs to submit.
   */
  jobs?: OrderedJob[];
  /**
   * Optional. The labels to associate with this template. These labels will be
   * propagated to all jobs and clusters created by the workflow instance.Label
   * keys must contain 1 to 63 characters, and must conform to RFC 1035
   * (https://www.ietf.org/rfc/rfc1035.txt).Label values may be empty, but, if
   * present, must contain 1 to 63 characters, and must conform to RFC 1035
   * (https://www.ietf.org/rfc/rfc1035.txt).No more than 32 labels can be
   * associated with a template.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The resource name of the workflow template, as described in
   * https://cloud.google.com/apis/design/resource_names. For
   * projects.regions.workflowTemplates, the resource name of the template has
   * the following format:
   * projects/{project_id}/regions/{region}/workflowTemplates/{template_id} For
   * projects.locations.workflowTemplates, the resource name of the template has
   * the following format:
   * projects/{project_id}/locations/{location}/workflowTemplates/{template_id}
   */
  readonly name?: string;
  /**
   * Optional. Template parameters whose values are substituted into the
   * template. Values for parameters must be provided when the template is
   * instantiated.
   */
  parameters?: TemplateParameter[];
  /**
   * Required. WorkflowTemplate scheduling information.
   */
  placement?: WorkflowTemplatePlacement;
  /**
   * Output only. The time template was last updated.
   */
  readonly updateTime?: Date;
  /**
   * Optional. Used to perform a consistent read-modify-write.This field should
   * be left blank for a CreateWorkflowTemplate request. It is required for an
   * UpdateWorkflowTemplate request, and must match the current server version.
   * A typical update template flow would fetch the current template with a
   * GetWorkflowTemplate request, which will return the current template with
   * the version field filled in with the current server version. The user
   * updates other fields in the template, then returns it as part of the
   * UpdateWorkflowTemplate request.
   */
  version?: number;
}

function serializeWorkflowTemplate(data: any): WorkflowTemplate {
  return {
    ...data,
    dagTimeout: data["dagTimeout"] !== undefined ? data["dagTimeout"] : undefined,
    placement: data["placement"] !== undefined ? serializeWorkflowTemplatePlacement(data["placement"]) : undefined,
  };
}

function deserializeWorkflowTemplate(data: any): WorkflowTemplate {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    dagTimeout: data["dagTimeout"] !== undefined ? data["dagTimeout"] : undefined,
    placement: data["placement"] !== undefined ? deserializeWorkflowTemplatePlacement(data["placement"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Specifies workflow execution target.Either managed_cluster or
 * cluster_selector is required.
 */
export interface WorkflowTemplatePlacement {
  /**
   * Optional. A selector that chooses target cluster for jobs based on
   * metadata.The selector is evaluated at the time each job is submitted.
   */
  clusterSelector?: ClusterSelector;
  /**
   * A cluster that is managed by the workflow.
   */
  managedCluster?: ManagedCluster;
}

function serializeWorkflowTemplatePlacement(data: any): WorkflowTemplatePlacement {
  return {
    ...data,
    managedCluster: data["managedCluster"] !== undefined ? serializeManagedCluster(data["managedCluster"]) : undefined,
  };
}

function deserializeWorkflowTemplatePlacement(data: any): WorkflowTemplatePlacement {
  return {
    ...data,
    managedCluster: data["managedCluster"] !== undefined ? deserializeManagedCluster(data["managedCluster"]) : undefined,
  };
}

/**
 * A YARN application created by a job. Application information is a subset of
 * org.apache.hadoop.yarn.proto.YarnProtos.ApplicationReportProto.Beta Feature:
 * This report is available for testing purposes only. It may be changed before
 * final release.
 */
export interface YarnApplication {
  /**
   * Required. The application name.
   */
  name?: string;
  /**
   * Required. The numerical progress of the application, from 1 to 100.
   */
  progress?: number;
  /**
   * Required. The application state.
   */
  state?:  | "STATE_UNSPECIFIED" | "NEW" | "NEW_SAVING" | "SUBMITTED" | "ACCEPTED" | "RUNNING" | "FINISHED" | "FAILED" | "KILLED";
  /**
   * Optional. The HTTP URL of the ApplicationMaster, HistoryServer, or
   * TimelineServer that provides application-specific information. The URL uses
   * the internal hostname, and requires a proxy server for resolution and,
   * possibly, access.
   */
  trackingUrl?: string;
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
