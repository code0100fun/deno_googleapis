// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * OS Config API Client for Deno
 * =============================
 * 
 * OS management tools that can be used for patch management, patch compliance, and configuration management on VM instances.
 * 
 * Docs: https://cloud.google.com/compute/docs/osconfig/rest
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * OS management tools that can be used for patch management, patch compliance,
 * and configuration management on VM instances.
 */
export class OSConfig {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://osconfig.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Get inventory data for the specified VM instance. If the VM has no
   * associated inventory, the message `NOT_FOUND` is returned.
   *
   * @param name Required. API resource name for inventory resource. Format: `projects/{project}/locations/{location}/instances/{instance}/inventory` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance}`, either Compute Engine `instance-id` or `instance-name` can be provided.
   */
  async projectsLocationsInstancesInventoriesGet(name: string, opts: ProjectsLocationsInstancesInventoriesGetOptions = {}): Promise<Inventory> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeInventory(data);
  }

  /**
   * List inventory data for all VM instances in the specified zone.
   *
   * @param parent Required. The parent resource name. Format: `projects/{project}/locations/{location}/instances/-` For `{project}`, either `project-number` or `project-id` can be provided.
   */
  async projectsLocationsInstancesInventoriesList(parent: string, opts: ProjectsLocationsInstancesInventoriesListOptions = {}): Promise<ListInventoriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/inventories`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    return deserializeListInventoriesResponse(data);
  }

  /**
   * Get the OS policy asssignment report for the specified Compute Engine VM
   * instance.
   *
   * @param name Required. API resource name for OS policy assignment report. Format: `/projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/{assignment}/report` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance_id}`, either Compute Engine `instance-id` or `instance-name` can be provided. For `{assignment_id}`, the OSPolicyAssignment id must be provided.
   */
  async projectsLocationsInstancesOsPolicyAssignmentsReportsGet(name: string): Promise<OSPolicyAssignmentReport> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOSPolicyAssignmentReport(data);
  }

  /**
   * List OS policy asssignment reports for all Compute Engine VM instances in
   * the specified zone.
   *
   * @param parent Required. The parent resource name. Format: `projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/{assignment}/reports` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance}`, either `instance-name`, `instance-id`, or `-` can be provided. If '-' is provided, the response will include OSPolicyAssignmentReports for all instances in the project/location. For `{assignment}`, either `assignment-id` or `-` can be provided. If '-' is provided, the response will include OSPolicyAssignmentReports for all OSPolicyAssignments in the project/location. Either {instance} or {assignment} must be `-`. For example: `projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/-/reports` returns all reports for the instance `projects/{project}/locations/{location}/instances/-/osPolicyAssignments/{assignment-id}/reports` returns all the reports for the given assignment across all instances. `projects/{project}/locations/{location}/instances/-/osPolicyAssignments/-/reports` returns all the reports for all assignments across all instances.
   */
  async projectsLocationsInstancesOsPolicyAssignmentsReportsList(parent: string, opts: ProjectsLocationsInstancesOsPolicyAssignmentsReportsListOptions = {}): Promise<ListOSPolicyAssignmentReportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/reports`);
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
    return deserializeListOSPolicyAssignmentReportsResponse(data);
  }

  /**
   * Gets the vulnerability report for the specified VM instance. Only VMs with
   * inventory data have vulnerability reports associated with them.
   *
   * @param name Required. API resource name for vulnerability resource. Format: `projects/{project}/locations/{location}/instances/{instance}/vulnerabilityReport` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance}`, either Compute Engine `instance-id` or `instance-name` can be provided.
   */
  async projectsLocationsInstancesVulnerabilityReportsGet(name: string): Promise<VulnerabilityReport> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as VulnerabilityReport;
  }

  /**
   * List vulnerability reports for all VM instances in the specified zone.
   *
   * @param parent Required. The parent resource name. Format: `projects/{project}/locations/{location}/instances/-` For `{project}`, either `project-number` or `project-id` can be provided.
   */
  async projectsLocationsInstancesVulnerabilityReportsList(parent: string, opts: ProjectsLocationsInstancesVulnerabilityReportsListOptions = {}): Promise<ListVulnerabilityReportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/vulnerabilityReports`);
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
    return data as ListVulnerabilityReportsResponse;
  }

  /**
   * Create an OS policy assignment. This method also creates the first
   * revision of the OS policy assignment. This method returns a long running
   * operation (LRO) that contains the rollout details. The rollout can be
   * cancelled by cancelling the LRO. For more information, see [Method:
   * projects.locations.osPolicyAssignments.operations.cancel](https://cloud.google.com/compute/docs/osconfig/rest/v1/projects.locations.osPolicyAssignments.operations/cancel).
   *
   * @param parent Required. The parent resource name in the form: projects/{project}/locations/{location}. Note: Specify the zone of your VMs as the location.
   */
  async projectsLocationsOsPolicyAssignmentsCreate(parent: string, req: OSPolicyAssignment, opts: ProjectsLocationsOsPolicyAssignmentsCreateOptions = {}): Promise<Operation> {
    req = serializeOSPolicyAssignment(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/osPolicyAssignments`);
    if (opts.osPolicyAssignmentId !== undefined) {
      url.searchParams.append("osPolicyAssignmentId", String(opts.osPolicyAssignmentId));
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
   * Delete the OS policy assignment. This method creates a new revision of the
   * OS policy assignment. This method returns a long running operation (LRO)
   * that contains the rollout details. The rollout can be cancelled by
   * cancelling the LRO. If the LRO completes and is not cancelled, all
   * revisions associated with the OS policy assignment are deleted. For more
   * information, see [Method:
   * projects.locations.osPolicyAssignments.operations.cancel](https://cloud.google.com/compute/docs/osconfig/rest/v1/projects.locations.osPolicyAssignments.operations/cancel).
   *
   * @param name Required. The name of the OS policy assignment to be deleted
   */
  async projectsLocationsOsPolicyAssignmentsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieve an existing OS policy assignment. This method always returns the
   * latest revision. In order to retrieve a previous revision of the
   * assignment, also provide the revision ID in the `name` parameter.
   *
   * @param name Required. The resource name of OS policy assignment. Format: `projects/{project}/locations/{location}/osPolicyAssignments/{os_policy_assignment}@{revisionId}`
   */
  async projectsLocationsOsPolicyAssignmentsGet(name: string): Promise<OSPolicyAssignment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOSPolicyAssignment(data);
  }

  /**
   * List the OS policy assignments under the parent resource. For each OS
   * policy assignment, the latest revision is returned.
   *
   * @param parent Required. The parent resource name.
   */
  async projectsLocationsOsPolicyAssignmentsList(parent: string, opts: ProjectsLocationsOsPolicyAssignmentsListOptions = {}): Promise<ListOSPolicyAssignmentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/osPolicyAssignments`);
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
    return deserializeListOSPolicyAssignmentsResponse(data);
  }

  /**
   * List the OS policy assignment revisions for a given OS policy assignment.
   *
   * @param name Required. The name of the OS policy assignment to list revisions for.
   */
  async projectsLocationsOsPolicyAssignmentsListRevisions(name: string, opts: ProjectsLocationsOsPolicyAssignmentsListRevisionsOptions = {}): Promise<ListOSPolicyAssignmentRevisionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:listRevisions`);
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
    return deserializeListOSPolicyAssignmentRevisionsResponse(data);
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
  async projectsLocationsOsPolicyAssignmentsOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
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
  async projectsLocationsOsPolicyAssignmentsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Update an existing OS policy assignment. This method creates a new
   * revision of the OS policy assignment. This method returns a long running
   * operation (LRO) that contains the rollout details. The rollout can be
   * cancelled by cancelling the LRO. For more information, see [Method:
   * projects.locations.osPolicyAssignments.operations.cancel](https://cloud.google.com/compute/docs/osconfig/rest/v1/projects.locations.osPolicyAssignments.operations/cancel).
   *
   * @param name Resource name. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id}` This field is ignored when you create an OS policy assignment.
   */
  async projectsLocationsOsPolicyAssignmentsPatch(name: string, req: OSPolicyAssignment, opts: ProjectsLocationsOsPolicyAssignmentsPatchOptions = {}): Promise<Operation> {
    req = serializeOSPolicyAssignment(req);
    opts = serializeProjectsLocationsOsPolicyAssignmentsPatchOptions(opts);
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
   * Create an OS Config patch deployment.
   *
   * @param parent Required. The project to apply this patch deployment to in the form `projects/*`.
   */
  async projectsPatchDeploymentsCreate(parent: string, req: PatchDeployment, opts: ProjectsPatchDeploymentsCreateOptions = {}): Promise<PatchDeployment> {
    req = serializePatchDeployment(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/patchDeployments`);
    if (opts.patchDeploymentId !== undefined) {
      url.searchParams.append("patchDeploymentId", String(opts.patchDeploymentId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePatchDeployment(data);
  }

  /**
   * Delete an OS Config patch deployment.
   *
   * @param name Required. The resource name of the patch deployment in the form `projects/*\/patchDeployments/*`.
   */
  async projectsPatchDeploymentsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Get an OS Config patch deployment.
   *
   * @param name Required. The resource name of the patch deployment in the form `projects/*\/patchDeployments/*`.
   */
  async projectsPatchDeploymentsGet(name: string): Promise<PatchDeployment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePatchDeployment(data);
  }

  /**
   * Get a page of OS Config patch deployments.
   *
   * @param parent Required. The resource name of the parent in the form `projects/*`.
   */
  async projectsPatchDeploymentsList(parent: string, opts: ProjectsPatchDeploymentsListOptions = {}): Promise<ListPatchDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/patchDeployments`);
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
    return deserializeListPatchDeploymentsResponse(data);
  }

  /**
   * Update an OS Config patch deployment.
   *
   * @param name Unique name for the patch deployment resource in a project. The patch deployment name is in the form: `projects/{project_id}/patchDeployments/{patch_deployment_id}`. This field is ignored when you create a new patch deployment.
   */
  async projectsPatchDeploymentsPatch(name: string, req: PatchDeployment, opts: ProjectsPatchDeploymentsPatchOptions = {}): Promise<PatchDeployment> {
    req = serializePatchDeployment(req);
    opts = serializeProjectsPatchDeploymentsPatchOptions(opts);
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
    return deserializePatchDeployment(data);
  }

  /**
   * Change state of patch deployment to "PAUSED". Patch deployment in paused
   * state doesn't generate patch jobs.
   *
   * @param name Required. The resource name of the patch deployment in the form `projects/*\/patchDeployments/*`.
   */
  async projectsPatchDeploymentsPause(name: string, req: PausePatchDeploymentRequest): Promise<PatchDeployment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:pause`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePatchDeployment(data);
  }

  /**
   * Change state of patch deployment back to "ACTIVE". Patch deployment in
   * active state continues to generate patch jobs.
   *
   * @param name Required. The resource name of the patch deployment in the form `projects/*\/patchDeployments/*`.
   */
  async projectsPatchDeploymentsResume(name: string, req: ResumePatchDeploymentRequest): Promise<PatchDeployment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:resume`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePatchDeployment(data);
  }

  /**
   * Cancel a patch job. The patch job must be active. Canceled patch jobs
   * cannot be restarted.
   *
   * @param name Required. Name of the patch in the form `projects/*\/patchJobs/*`
   */
  async projectsPatchJobsCancel(name: string, req: CancelPatchJobRequest): Promise<PatchJob> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePatchJob(data);
  }

  /**
   * Patch VM instances by creating and running a patch job.
   *
   * @param parent Required. The project in which to run this patch in the form `projects/*`
   */
  async projectsPatchJobsExecute(parent: string, req: ExecutePatchJobRequest): Promise<PatchJob> {
    req = serializeExecutePatchJobRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/patchJobs:execute`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePatchJob(data);
  }

  /**
   * Get the patch job. This can be used to track the progress of an ongoing
   * patch job or review the details of completed jobs.
   *
   * @param name Required. Name of the patch in the form `projects/*\/patchJobs/*`
   */
  async projectsPatchJobsGet(name: string): Promise<PatchJob> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePatchJob(data);
  }

  /**
   * Get a list of instance details for a given patch job.
   *
   * @param parent Required. The parent for the instances are in the form of `projects/*\/patchJobs/*`.
   */
  async projectsPatchJobsInstanceDetailsList(parent: string, opts: ProjectsPatchJobsInstanceDetailsListOptions = {}): Promise<ListPatchJobInstanceDetailsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/instanceDetails`);
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
    return deserializeListPatchJobInstanceDetailsResponse(data);
  }

  /**
   * Get a list of patch jobs.
   *
   * @param parent Required. In the form of `projects/*`
   */
  async projectsPatchJobsList(parent: string, opts: ProjectsPatchJobsListOptions = {}): Promise<ListPatchJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/patchJobs`);
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
    return deserializeListPatchJobsResponse(data);
  }
}

/**
 * Apt patching is completed by executing `apt-get update && apt-get upgrade`.
 * Additional options can be set to control how this is executed.
 */
export interface AptSettings {
  /**
   * List of packages to exclude from update. These packages will be excluded
   */
  excludes?: string[];
  /**
   * An exclusive list of packages to be updated. These are the only packages
   * that will be updated. If these packages are not installed, they will be
   * ignored. This field cannot be specified with any other patch configuration
   * fields.
   */
  exclusivePackages?: string[];
  /**
   * By changing the type to DIST, the patching is performed using `apt-get
   * dist-upgrade` instead.
   */
  type?:  | "TYPE_UNSPECIFIED" | "DIST" | "UPGRADE";
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Message for canceling a patch job.
 */
export interface CancelPatchJobRequest {
}

/**
 * Common Vulnerability Scoring System version 3. For details, see
 * https://www.first.org/cvss/specification-document
 */
export interface CVSSv3 {
  /**
   * This metric describes the conditions beyond the attacker's control that
   * must exist in order to exploit the vulnerability.
   */
  attackComplexity?:  | "ATTACK_COMPLEXITY_UNSPECIFIED" | "ATTACK_COMPLEXITY_LOW" | "ATTACK_COMPLEXITY_HIGH";
  /**
   * This metric reflects the context by which vulnerability exploitation is
   * possible.
   */
  attackVector?:  | "ATTACK_VECTOR_UNSPECIFIED" | "ATTACK_VECTOR_NETWORK" | "ATTACK_VECTOR_ADJACENT" | "ATTACK_VECTOR_LOCAL" | "ATTACK_VECTOR_PHYSICAL";
  /**
   * This metric measures the impact to the availability of the impacted
   * component resulting from a successfully exploited vulnerability.
   */
  availabilityImpact?:  | "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE";
  /**
   * The base score is a function of the base metric scores.
   * https://www.first.org/cvss/specification-document#Base-Metrics
   */
  baseScore?: number;
  /**
   * This metric measures the impact to the confidentiality of the information
   * resources managed by a software component due to a successfully exploited
   * vulnerability.
   */
  confidentialityImpact?:  | "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE";
  /**
   * The Exploitability sub-score equation is derived from the Base
   * Exploitability metrics.
   * https://www.first.org/cvss/specification-document#2-1-Exploitability-Metrics
   */
  exploitabilityScore?: number;
  /**
   * The Impact sub-score equation is derived from the Base Impact metrics.
   */
  impactScore?: number;
  /**
   * This metric measures the impact to integrity of a successfully exploited
   * vulnerability.
   */
  integrityImpact?:  | "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE";
  /**
   * This metric describes the level of privileges an attacker must possess
   * before successfully exploiting the vulnerability.
   */
  privilegesRequired?:  | "PRIVILEGES_REQUIRED_UNSPECIFIED" | "PRIVILEGES_REQUIRED_NONE" | "PRIVILEGES_REQUIRED_LOW" | "PRIVILEGES_REQUIRED_HIGH";
  /**
   * The Scope metric captures whether a vulnerability in one vulnerable
   * component impacts resources in components beyond its security scope.
   */
  scope?:  | "SCOPE_UNSPECIFIED" | "SCOPE_UNCHANGED" | "SCOPE_CHANGED";
  /**
   * This metric captures the requirement for a human user, other than the
   * attacker, to participate in the successful compromise of the vulnerable
   * component.
   */
  userInteraction?:  | "USER_INTERACTION_UNSPECIFIED" | "USER_INTERACTION_NONE" | "USER_INTERACTION_REQUIRED";
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
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface Empty {
}

/**
 * A step that runs an executable for a PatchJob.
 */
export interface ExecStep {
  /**
   * The ExecStepConfig for all Linux VMs targeted by the PatchJob.
   */
  linuxExecStepConfig?: ExecStepConfig;
  /**
   * The ExecStepConfig for all Windows VMs targeted by the PatchJob.
   */
  windowsExecStepConfig?: ExecStepConfig;
}

function serializeExecStep(data: any): ExecStep {
  return {
    ...data,
    linuxExecStepConfig: data["linuxExecStepConfig"] !== undefined ? serializeExecStepConfig(data["linuxExecStepConfig"]) : undefined,
    windowsExecStepConfig: data["windowsExecStepConfig"] !== undefined ? serializeExecStepConfig(data["windowsExecStepConfig"]) : undefined,
  };
}

function deserializeExecStep(data: any): ExecStep {
  return {
    ...data,
    linuxExecStepConfig: data["linuxExecStepConfig"] !== undefined ? deserializeExecStepConfig(data["linuxExecStepConfig"]) : undefined,
    windowsExecStepConfig: data["windowsExecStepConfig"] !== undefined ? deserializeExecStepConfig(data["windowsExecStepConfig"]) : undefined,
  };
}

/**
 * Common configurations for an ExecStep.
 */
export interface ExecStepConfig {
  /**
   * Defaults to [0]. A list of possible return values that the execution can
   * return to indicate a success.
   */
  allowedSuccessCodes?: number[];
  /**
   * A Cloud Storage object containing the executable.
   */
  gcsObject?: GcsObject;
  /**
   * The script interpreter to use to run the script. If no interpreter is
   * specified the script will be executed directly, which will likely only
   * succeed for scripts with [shebang lines]
   * (https://en.wikipedia.org/wiki/Shebang_\(Unix\)).
   */
  interpreter?:  | "INTERPRETER_UNSPECIFIED" | "NONE" | "SHELL" | "POWERSHELL";
  /**
   * An absolute path to the executable on the VM.
   */
  localPath?: string;
}

function serializeExecStepConfig(data: any): ExecStepConfig {
  return {
    ...data,
    gcsObject: data["gcsObject"] !== undefined ? serializeGcsObject(data["gcsObject"]) : undefined,
  };
}

function deserializeExecStepConfig(data: any): ExecStepConfig {
  return {
    ...data,
    gcsObject: data["gcsObject"] !== undefined ? deserializeGcsObject(data["gcsObject"]) : undefined,
  };
}

/**
 * A request message to initiate patching across Compute Engine instances.
 */
export interface ExecutePatchJobRequest {
  /**
   * Description of the patch job. Length of the description is limited to 1024
   * characters.
   */
  description?: string;
  /**
   * Display name for this patch job. This does not have to be unique.
   */
  displayName?: string;
  /**
   * If this patch is a dry-run only, instances are contacted but will do
   * nothing.
   */
  dryRun?: boolean;
  /**
   * Duration of the patch job. After the duration ends, the patch job times
   * out.
   */
  duration?: number /* Duration */;
  /**
   * Required. Instances to patch, either explicitly or filtered by some
   * criteria such as zone or labels.
   */
  instanceFilter?: PatchInstanceFilter;
  /**
   * Patch configuration being applied. If omitted, instances are patched using
   * the default configurations.
   */
  patchConfig?: PatchConfig;
  /**
   * Rollout strategy of the patch job.
   */
  rollout?: PatchRollout;
}

function serializeExecutePatchJobRequest(data: any): ExecutePatchJobRequest {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    patchConfig: data["patchConfig"] !== undefined ? serializePatchConfig(data["patchConfig"]) : undefined,
  };
}

function deserializeExecutePatchJobRequest(data: any): ExecutePatchJobRequest {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    patchConfig: data["patchConfig"] !== undefined ? deserializePatchConfig(data["patchConfig"]) : undefined,
  };
}

/**
 * Message encapsulating a value that can be either absolute ("fixed") or
 * relative ("percent") to a value.
 */
export interface FixedOrPercent {
  /**
   * Specifies a fixed value.
   */
  fixed?: number;
  /**
   * Specifies the relative value defined as a percentage, which will be
   * multiplied by a reference value.
   */
  percent?: number;
}

/**
 * Cloud Storage object representation.
 */
export interface GcsObject {
  /**
   * Required. Bucket of the Cloud Storage object.
   */
  bucket?: string;
  /**
   * Required. Generation number of the Cloud Storage object. This is used to
   * ensure that the ExecStep specified by this PatchJob does not change.
   */
  generationNumber?: bigint;
  /**
   * Required. Name of the Cloud Storage object.
   */
  object?: string;
}

function serializeGcsObject(data: any): GcsObject {
  return {
    ...data,
    generationNumber: data["generationNumber"] !== undefined ? String(data["generationNumber"]) : undefined,
  };
}

function deserializeGcsObject(data: any): GcsObject {
  return {
    ...data,
    generationNumber: data["generationNumber"] !== undefined ? BigInt(data["generationNumber"]) : undefined,
  };
}

/**
 * OS policy assignment operation metadata provided by OS policy assignment API
 * methods that return long running operations.
 */
export interface GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata {
  /**
   * The OS policy assignment API method.
   */
  apiMethod?:  | "API_METHOD_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE";
  /**
   * Reference to the `OSPolicyAssignment` API resource. Format:
   * `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}`
   */
  osPolicyAssignment?: string;
  /**
   * Rollout start time
   */
  rolloutStartTime?: Date;
  /**
   * State of the rollout
   */
  rolloutState?:  | "ROLLOUT_STATE_UNSPECIFIED" | "IN_PROGRESS" | "CANCELLING" | "CANCELLED" | "SUCCEEDED";
  /**
   * Rollout update time
   */
  rolloutUpdateTime?: Date;
}

function serializeGoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata(data: any): GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata {
  return {
    ...data,
    rolloutStartTime: data["rolloutStartTime"] !== undefined ? data["rolloutStartTime"].toISOString() : undefined,
    rolloutUpdateTime: data["rolloutUpdateTime"] !== undefined ? data["rolloutUpdateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata(data: any): GoogleCloudOsconfigV1__OSPolicyAssignmentOperationMetadata {
  return {
    ...data,
    rolloutStartTime: data["rolloutStartTime"] !== undefined ? new Date(data["rolloutStartTime"]) : undefined,
    rolloutUpdateTime: data["rolloutUpdateTime"] !== undefined ? new Date(data["rolloutUpdateTime"]) : undefined,
  };
}

/**
 * Googet patching is performed by running `googet update`.
 */
export interface GooSettings {
}

/**
 * This API resource represents the available inventory data for a Compute
 * Engine virtual machine (VM) instance at a given point in time. You can use
 * this API resource to determine the inventory data of your VM. For more
 * information, see [Information provided by OS inventory
 * management](https://cloud.google.com/compute/docs/instances/os-inventory-management#data-collected).
 */
export interface Inventory {
  /**
   * Inventory items related to the VM keyed by an opaque unique identifier for
   * each inventory item. The identifier is unique to each distinct and
   * addressable inventory item and will change, when there is a new package
   * version.
   */
  items?: {
    [key: string]: InventoryItem
  };
  /**
   * Output only. The `Inventory` API resource name. Format:
   * `projects/{project_number}/locations/{location}/instances/{instance_id}/inventory`
   */
  readonly name?: string;
  /**
   * Base level operating system information for the VM.
   */
  osInfo?: InventoryOsInfo;
  /**
   * Output only. Timestamp of the last reported inventory for the VM.
   */
  readonly updateTime?: Date;
}

function serializeInventory(data: any): Inventory {
  return {
    ...data,
    items: data["items"] !== undefined ? Object.fromEntries(Object.entries(data["items"]).map(([k, v]: [string, any]) => ([k, serializeInventoryItem(v)]))) : undefined,
  };
}

function deserializeInventory(data: any): Inventory {
  return {
    ...data,
    items: data["items"] !== undefined ? Object.fromEntries(Object.entries(data["items"]).map(([k, v]: [string, any]) => ([k, deserializeInventoryItem(v)]))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A single piece of inventory on a VM.
 */
export interface InventoryItem {
  /**
   * Software package available to be installed on the VM instance.
   */
  availablePackage?: InventorySoftwarePackage;
  /**
   * When this inventory item was first detected.
   */
  createTime?: Date;
  /**
   * Identifier for this item, unique across items for this VM.
   */
  id?: string;
  /**
   * Software package present on the VM instance.
   */
  installedPackage?: InventorySoftwarePackage;
  /**
   * The origin of this inventory item.
   */
  originType?:  | "ORIGIN_TYPE_UNSPECIFIED" | "INVENTORY_REPORT";
  /**
   * The specific type of inventory, correlating to its specific details.
   */
  type?:  | "TYPE_UNSPECIFIED" | "INSTALLED_PACKAGE" | "AVAILABLE_PACKAGE";
  /**
   * When this inventory item was last modified.
   */
  updateTime?: Date;
}

function serializeInventoryItem(data: any): InventoryItem {
  return {
    ...data,
    availablePackage: data["availablePackage"] !== undefined ? serializeInventorySoftwarePackage(data["availablePackage"]) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    installedPackage: data["installedPackage"] !== undefined ? serializeInventorySoftwarePackage(data["installedPackage"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeInventoryItem(data: any): InventoryItem {
  return {
    ...data,
    availablePackage: data["availablePackage"] !== undefined ? deserializeInventorySoftwarePackage(data["availablePackage"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    installedPackage: data["installedPackage"] !== undefined ? deserializeInventorySoftwarePackage(data["installedPackage"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Operating system information for the VM.
 */
export interface InventoryOsInfo {
  /**
   * The system architecture of the operating system.
   */
  architecture?: string;
  /**
   * The VM hostname.
   */
  hostname?: string;
  /**
   * The kernel release of the operating system.
   */
  kernelRelease?: string;
  /**
   * The kernel version of the operating system.
   */
  kernelVersion?: string;
  /**
   * The operating system long name. For example 'Debian GNU/Linux 9' or
   * 'Microsoft Window Server 2019 Datacenter'.
   */
  longName?: string;
  /**
   * The current version of the OS Config agent running on the VM.
   */
  osconfigAgentVersion?: string;
  /**
   * The operating system short name. For example, 'windows' or 'debian'.
   */
  shortName?: string;
  /**
   * The version of the operating system.
   */
  version?: string;
}

/**
 * Software package information of the operating system.
 */
export interface InventorySoftwarePackage {
  /**
   * Details of an APT package. For details about the apt package manager, see
   * https://wiki.debian.org/Apt.
   */
  aptPackage?: InventoryVersionedPackage;
  /**
   * Details of a COS package.
   */
  cosPackage?: InventoryVersionedPackage;
  /**
   * Details of a Googet package. For details about the googet package manager,
   * see https://github.com/google/googet.
   */
  googetPackage?: InventoryVersionedPackage;
  /**
   * Details of a Windows Quick Fix engineering package. See
   * https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering
   * for info in Windows Quick Fix Engineering.
   */
  qfePackage?: InventoryWindowsQuickFixEngineeringPackage;
  /**
   * Details of Windows Application.
   */
  windowsApplication?: InventoryWindowsApplication;
  /**
   * Details of a Windows Update package. See
   * https://docs.microsoft.com/en-us/windows/win32/api/_wua/ for information
   * about Windows Update.
   */
  wuaPackage?: InventoryWindowsUpdatePackage;
  /**
   * Yum package info. For details about the yum package manager, see
   * https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/ch-yum.
   */
  yumPackage?: InventoryVersionedPackage;
  /**
   * Details of a Zypper package. For details about the Zypper package manager,
   * see https://en.opensuse.org/SDB:Zypper_manual.
   */
  zypperPackage?: InventoryVersionedPackage;
  /**
   * Details of a Zypper patch. For details about the Zypper package manager,
   * see https://en.opensuse.org/SDB:Zypper_manual.
   */
  zypperPatch?: InventoryZypperPatch;
}

function serializeInventorySoftwarePackage(data: any): InventorySoftwarePackage {
  return {
    ...data,
    qfePackage: data["qfePackage"] !== undefined ? serializeInventoryWindowsQuickFixEngineeringPackage(data["qfePackage"]) : undefined,
    wuaPackage: data["wuaPackage"] !== undefined ? serializeInventoryWindowsUpdatePackage(data["wuaPackage"]) : undefined,
  };
}

function deserializeInventorySoftwarePackage(data: any): InventorySoftwarePackage {
  return {
    ...data,
    qfePackage: data["qfePackage"] !== undefined ? deserializeInventoryWindowsQuickFixEngineeringPackage(data["qfePackage"]) : undefined,
    wuaPackage: data["wuaPackage"] !== undefined ? deserializeInventoryWindowsUpdatePackage(data["wuaPackage"]) : undefined,
  };
}

/**
 * Information related to the a standard versioned package. This includes
 * package info for APT, Yum, Zypper, and Googet package managers.
 */
export interface InventoryVersionedPackage {
  /**
   * The system architecture this package is intended for.
   */
  architecture?: string;
  /**
   * The name of the package.
   */
  packageName?: string;
  /**
   * The version of the package.
   */
  version?: string;
}

/**
 * Contains information about a Windows application that is retrieved from the
 * Windows Registry. For more information about these fields, see:
 * https://docs.microsoft.com/en-us/windows/win32/msi/uninstall-registry-key
 */
export interface InventoryWindowsApplication {
  /**
   * The name of the application or product.
   */
  displayName?: string;
  /**
   * The version of the product or application in string format.
   */
  displayVersion?: string;
  /**
   * The internet address for technical support.
   */
  helpLink?: string;
  /**
   * The last time this product received service. The value of this property is
   * replaced each time a patch is applied or removed from the product or the
   * command-line option is used to repair the product.
   */
  installDate?: Date;
  /**
   * The name of the manufacturer for the product or application.
   */
  publisher?: string;
}

/**
 * Information related to a Quick Fix Engineering package. Fields are taken
 * from Windows QuickFixEngineering Interface and match the source names:
 * https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering
 */
export interface InventoryWindowsQuickFixEngineeringPackage {
  /**
   * A short textual description of the QFE update.
   */
  caption?: string;
  /**
   * A textual description of the QFE update.
   */
  description?: string;
  /**
   * Unique identifier associated with a particular QFE update.
   */
  hotFixId?: string;
  /**
   * Date that the QFE update was installed. Mapped from installed_on field.
   */
  installTime?: Date;
}

function serializeInventoryWindowsQuickFixEngineeringPackage(data: any): InventoryWindowsQuickFixEngineeringPackage {
  return {
    ...data,
    installTime: data["installTime"] !== undefined ? data["installTime"].toISOString() : undefined,
  };
}

function deserializeInventoryWindowsQuickFixEngineeringPackage(data: any): InventoryWindowsQuickFixEngineeringPackage {
  return {
    ...data,
    installTime: data["installTime"] !== undefined ? new Date(data["installTime"]) : undefined,
  };
}

/**
 * Details related to a Windows Update package. Field data and names are taken
 * from Windows Update API IUpdate Interface:
 * https://docs.microsoft.com/en-us/windows/win32/api/_wua/ Descriptive fields
 * like title, and description are localized based on the locale of the VM being
 * updated.
 */
export interface InventoryWindowsUpdatePackage {
  /**
   * The categories that are associated with this update package.
   */
  categories?: InventoryWindowsUpdatePackageWindowsUpdateCategory[];
  /**
   * The localized description of the update package.
   */
  description?: string;
  /**
   * A collection of Microsoft Knowledge Base article IDs that are associated
   * with the update package.
   */
  kbArticleIds?: string[];
  /**
   * The last published date of the update, in (UTC) date and time.
   */
  lastDeploymentChangeTime?: Date;
  /**
   * A collection of URLs that provide more information about the update
   * package.
   */
  moreInfoUrls?: string[];
  /**
   * The revision number of this update package.
   */
  revisionNumber?: number;
  /**
   * A hyperlink to the language-specific support information for the update.
   */
  supportUrl?: string;
  /**
   * The localized title of the update package.
   */
  title?: string;
  /**
   * Gets the identifier of an update package. Stays the same across revisions.
   */
  updateId?: string;
}

function serializeInventoryWindowsUpdatePackage(data: any): InventoryWindowsUpdatePackage {
  return {
    ...data,
    lastDeploymentChangeTime: data["lastDeploymentChangeTime"] !== undefined ? data["lastDeploymentChangeTime"].toISOString() : undefined,
  };
}

function deserializeInventoryWindowsUpdatePackage(data: any): InventoryWindowsUpdatePackage {
  return {
    ...data,
    lastDeploymentChangeTime: data["lastDeploymentChangeTime"] !== undefined ? new Date(data["lastDeploymentChangeTime"]) : undefined,
  };
}

/**
 * Categories specified by the Windows Update.
 */
export interface InventoryWindowsUpdatePackageWindowsUpdateCategory {
  /**
   * The identifier of the windows update category.
   */
  id?: string;
  /**
   * The name of the windows update category.
   */
  name?: string;
}

/**
 * Details related to a Zypper Patch.
 */
export interface InventoryZypperPatch {
  /**
   * The category of the patch.
   */
  category?: string;
  /**
   * The name of the patch.
   */
  patchName?: string;
  /**
   * The severity specified for this patch
   */
  severity?: string;
  /**
   * Any summary information provided about this patch.
   */
  summary?: string;
}

/**
 * A response message for listing inventory data for all VMs in a specified
 * location.
 */
export interface ListInventoriesResponse {
  /**
   * List of inventory objects.
   */
  inventories?: Inventory[];
  /**
   * The pagination token to retrieve the next page of inventory objects.
   */
  nextPageToken?: string;
}

function serializeListInventoriesResponse(data: any): ListInventoriesResponse {
  return {
    ...data,
    inventories: data["inventories"] !== undefined ? data["inventories"].map((item: any) => (serializeInventory(item))) : undefined,
  };
}

function deserializeListInventoriesResponse(data: any): ListInventoriesResponse {
  return {
    ...data,
    inventories: data["inventories"] !== undefined ? data["inventories"].map((item: any) => (deserializeInventory(item))) : undefined,
  };
}

/**
 * A response message for listing OS Policy assignment reports including the
 * page of results and page token.
 */
export interface ListOSPolicyAssignmentReportsResponse {
  /**
   * The pagination token to retrieve the next page of OS policy assignment
   * report objects.
   */
  nextPageToken?: string;
  /**
   * List of OS policy assignment reports.
   */
  osPolicyAssignmentReports?: OSPolicyAssignmentReport[];
}

function serializeListOSPolicyAssignmentReportsResponse(data: any): ListOSPolicyAssignmentReportsResponse {
  return {
    ...data,
    osPolicyAssignmentReports: data["osPolicyAssignmentReports"] !== undefined ? data["osPolicyAssignmentReports"].map((item: any) => (serializeOSPolicyAssignmentReport(item))) : undefined,
  };
}

function deserializeListOSPolicyAssignmentReportsResponse(data: any): ListOSPolicyAssignmentReportsResponse {
  return {
    ...data,
    osPolicyAssignmentReports: data["osPolicyAssignmentReports"] !== undefined ? data["osPolicyAssignmentReports"].map((item: any) => (deserializeOSPolicyAssignmentReport(item))) : undefined,
  };
}

/**
 * A response message for listing all revisions for a OS policy assignment.
 */
export interface ListOSPolicyAssignmentRevisionsResponse {
  /**
   * The pagination token to retrieve the next page of OS policy assignment
   * revisions.
   */
  nextPageToken?: string;
  /**
   * The OS policy assignment revisions
   */
  osPolicyAssignments?: OSPolicyAssignment[];
}

function serializeListOSPolicyAssignmentRevisionsResponse(data: any): ListOSPolicyAssignmentRevisionsResponse {
  return {
    ...data,
    osPolicyAssignments: data["osPolicyAssignments"] !== undefined ? data["osPolicyAssignments"].map((item: any) => (serializeOSPolicyAssignment(item))) : undefined,
  };
}

function deserializeListOSPolicyAssignmentRevisionsResponse(data: any): ListOSPolicyAssignmentRevisionsResponse {
  return {
    ...data,
    osPolicyAssignments: data["osPolicyAssignments"] !== undefined ? data["osPolicyAssignments"].map((item: any) => (deserializeOSPolicyAssignment(item))) : undefined,
  };
}

/**
 * A response message for listing all assignments under given parent.
 */
export interface ListOSPolicyAssignmentsResponse {
  /**
   * The pagination token to retrieve the next page of OS policy assignments.
   */
  nextPageToken?: string;
  /**
   * The list of assignments
   */
  osPolicyAssignments?: OSPolicyAssignment[];
}

function serializeListOSPolicyAssignmentsResponse(data: any): ListOSPolicyAssignmentsResponse {
  return {
    ...data,
    osPolicyAssignments: data["osPolicyAssignments"] !== undefined ? data["osPolicyAssignments"].map((item: any) => (serializeOSPolicyAssignment(item))) : undefined,
  };
}

function deserializeListOSPolicyAssignmentsResponse(data: any): ListOSPolicyAssignmentsResponse {
  return {
    ...data,
    osPolicyAssignments: data["osPolicyAssignments"] !== undefined ? data["osPolicyAssignments"].map((item: any) => (deserializeOSPolicyAssignment(item))) : undefined,
  };
}

/**
 * A response message for listing patch deployments.
 */
export interface ListPatchDeploymentsResponse {
  /**
   * A pagination token that can be used to get the next page of patch
   * deployments.
   */
  nextPageToken?: string;
  /**
   * The list of patch deployments.
   */
  patchDeployments?: PatchDeployment[];
}

function serializeListPatchDeploymentsResponse(data: any): ListPatchDeploymentsResponse {
  return {
    ...data,
    patchDeployments: data["patchDeployments"] !== undefined ? data["patchDeployments"].map((item: any) => (serializePatchDeployment(item))) : undefined,
  };
}

function deserializeListPatchDeploymentsResponse(data: any): ListPatchDeploymentsResponse {
  return {
    ...data,
    patchDeployments: data["patchDeployments"] !== undefined ? data["patchDeployments"].map((item: any) => (deserializePatchDeployment(item))) : undefined,
  };
}

/**
 * A response message for listing the instances details for a patch job.
 */
export interface ListPatchJobInstanceDetailsResponse {
  /**
   * A pagination token that can be used to get the next page of results.
   */
  nextPageToken?: string;
  /**
   * A list of instance status.
   */
  patchJobInstanceDetails?: PatchJobInstanceDetails[];
}

function serializeListPatchJobInstanceDetailsResponse(data: any): ListPatchJobInstanceDetailsResponse {
  return {
    ...data,
    patchJobInstanceDetails: data["patchJobInstanceDetails"] !== undefined ? data["patchJobInstanceDetails"].map((item: any) => (serializePatchJobInstanceDetails(item))) : undefined,
  };
}

function deserializeListPatchJobInstanceDetailsResponse(data: any): ListPatchJobInstanceDetailsResponse {
  return {
    ...data,
    patchJobInstanceDetails: data["patchJobInstanceDetails"] !== undefined ? data["patchJobInstanceDetails"].map((item: any) => (deserializePatchJobInstanceDetails(item))) : undefined,
  };
}

/**
 * A response message for listing patch jobs.
 */
export interface ListPatchJobsResponse {
  /**
   * A pagination token that can be used to get the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of patch jobs.
   */
  patchJobs?: PatchJob[];
}

function serializeListPatchJobsResponse(data: any): ListPatchJobsResponse {
  return {
    ...data,
    patchJobs: data["patchJobs"] !== undefined ? data["patchJobs"].map((item: any) => (serializePatchJob(item))) : undefined,
  };
}

function deserializeListPatchJobsResponse(data: any): ListPatchJobsResponse {
  return {
    ...data,
    patchJobs: data["patchJobs"] !== undefined ? data["patchJobs"].map((item: any) => (deserializePatchJob(item))) : undefined,
  };
}

/**
 * A response message for listing vulnerability reports for all VM instances in
 * the specified location.
 */
export interface ListVulnerabilityReportsResponse {
  /**
   * The pagination token to retrieve the next page of vulnerabilityReports
   * object.
   */
  nextPageToken?: string;
  /**
   * List of vulnerabilityReport objects.
   */
  vulnerabilityReports?: VulnerabilityReport[];
}

/**
 * Represents a monthly schedule. An example of a valid monthly schedule is "on
 * the third Tuesday of the month" or "on the 15th of the month".
 */
export interface MonthlySchedule {
  /**
   * Required. One day of the month. 1-31 indicates the 1st to the 31st day. -1
   * indicates the last day of the month. Months without the target day will be
   * skipped. For example, a schedule to run "every month on the 31st" will not
   * run in February, April, June, etc.
   */
  monthDay?: number;
  /**
   * Required. Week day in a month.
   */
  weekDayOfMonth?: WeekDayOfMonth;
}

/**
 * Sets the time for a one time patch deployment. Timestamp is in
 * [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.
 */
export interface OneTimeSchedule {
  /**
   * Required. The desired patch job execution time.
   */
  executeTime?: Date;
}

function serializeOneTimeSchedule(data: any): OneTimeSchedule {
  return {
    ...data,
    executeTime: data["executeTime"] !== undefined ? data["executeTime"].toISOString() : undefined,
  };
}

function deserializeOneTimeSchedule(data: any): OneTimeSchedule {
  return {
    ...data,
    executeTime: data["executeTime"] !== undefined ? new Date(data["executeTime"]) : undefined,
  };
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
 * An OS policy defines the desired state configuration for a VM.
 */
export interface OSPolicy {
  /**
   * This flag determines the OS policy compliance status when none of the
   * resource groups within the policy are applicable for a VM. Set this value
   * to `true` if the policy needs to be reported as compliant even if the
   * policy has nothing to validate or enforce.
   */
  allowNoResourceGroupMatch?: boolean;
  /**
   * Policy description. Length of the description is limited to 1024
   * characters.
   */
  description?: string;
  /**
   * Required. The id of the OS policy with the following restrictions: * Must
   * contain only lowercase letters, numbers, and hyphens. * Must start with a
   * letter. * Must be between 1-63 characters. * Must end with a number or a
   * letter. * Must be unique within the assignment.
   */
  id?: string;
  /**
   * Required. Policy mode
   */
  mode?:  | "MODE_UNSPECIFIED" | "VALIDATION" | "ENFORCEMENT";
  /**
   * Required. List of resource groups for the policy. For a particular VM,
   * resource groups are evaluated in the order specified and the first resource
   * group that is applicable is selected and the rest are ignored. If none of
   * the resource groups are applicable for a VM, the VM is considered to be
   * non-compliant w.r.t this policy. This behavior can be toggled by the flag
   * `allow_no_resource_group_match`
   */
  resourceGroups?: OSPolicyResourceGroup[];
}

function serializeOSPolicy(data: any): OSPolicy {
  return {
    ...data,
    resourceGroups: data["resourceGroups"] !== undefined ? data["resourceGroups"].map((item: any) => (serializeOSPolicyResourceGroup(item))) : undefined,
  };
}

function deserializeOSPolicy(data: any): OSPolicy {
  return {
    ...data,
    resourceGroups: data["resourceGroups"] !== undefined ? data["resourceGroups"].map((item: any) => (deserializeOSPolicyResourceGroup(item))) : undefined,
  };
}

/**
 * OS policy assignment is an API resource that is used to apply a set of OS
 * policies to a dynamically targeted group of Compute Engine VM instances. An
 * OS policy is used to define the desired state configuration for a Compute
 * Engine VM instance through a set of configuration resources that provide
 * capabilities such as installing or removing software packages, or executing a
 * script. For more information about the OS policy resource definitions and
 * examples, see [OS policy and OS policy
 * assignment](https://cloud.google.com/compute/docs/os-configuration-management/working-with-os-policies).
 */
export interface OSPolicyAssignment {
  /**
   * Output only. Indicates that this revision has been successfully rolled out
   * in this zone and new VMs will be assigned OS policies from this revision.
   * For a given OS policy assignment, there is only one revision with a value
   * of `true` for this field.
   */
  readonly baseline?: boolean;
  /**
   * Output only. Indicates that this revision deletes the OS policy
   * assignment.
   */
  readonly deleted?: boolean;
  /**
   * OS policy assignment description. Length of the description is limited to
   * 1024 characters.
   */
  description?: string;
  /**
   * The etag for this OS policy assignment. If this is provided on update, it
   * must match the server's etag.
   */
  etag?: string;
  /**
   * Required. Filter to select VMs.
   */
  instanceFilter?: OSPolicyAssignmentInstanceFilter;
  /**
   * Resource name. Format:
   * `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id}`
   * This field is ignored when you create an OS policy assignment.
   */
  name?: string;
  /**
   * Required. List of OS policies to be applied to the VMs.
   */
  osPolicies?: OSPolicy[];
  /**
   * Output only. Indicates that reconciliation is in progress for the
   * revision. This value is `true` when the `rollout_state` is one of: *
   * IN_PROGRESS * CANCELLING
   */
  readonly reconciling?: boolean;
  /**
   * Output only. The timestamp that the revision was created.
   */
  readonly revisionCreateTime?: Date;
  /**
   * Output only. The assignment revision ID A new revision is committed
   * whenever a rollout is triggered for a OS policy assignment
   */
  readonly revisionId?: string;
  /**
   * Required. Rollout to deploy the OS policy assignment. A rollout is
   * triggered in the following situations: 1) OSPolicyAssignment is created. 2)
   * OSPolicyAssignment is updated and the update contains changes to one of the
   * following fields: - instance_filter - os_policies 3) OSPolicyAssignment is
   * deleted.
   */
  rollout?: OSPolicyAssignmentRollout;
  /**
   * Output only. OS policy assignment rollout state
   */
  readonly rolloutState?:  | "ROLLOUT_STATE_UNSPECIFIED" | "IN_PROGRESS" | "CANCELLING" | "CANCELLED" | "SUCCEEDED";
  /**
   * Output only. Server generated unique id for the OS policy assignment
   * resource.
   */
  readonly uid?: string;
}

function serializeOSPolicyAssignment(data: any): OSPolicyAssignment {
  return {
    ...data,
    osPolicies: data["osPolicies"] !== undefined ? data["osPolicies"].map((item: any) => (serializeOSPolicy(item))) : undefined,
    rollout: data["rollout"] !== undefined ? serializeOSPolicyAssignmentRollout(data["rollout"]) : undefined,
  };
}

function deserializeOSPolicyAssignment(data: any): OSPolicyAssignment {
  return {
    ...data,
    osPolicies: data["osPolicies"] !== undefined ? data["osPolicies"].map((item: any) => (deserializeOSPolicy(item))) : undefined,
    revisionCreateTime: data["revisionCreateTime"] !== undefined ? new Date(data["revisionCreateTime"]) : undefined,
    rollout: data["rollout"] !== undefined ? deserializeOSPolicyAssignmentRollout(data["rollout"]) : undefined,
  };
}

/**
 * Filters to select target VMs for an assignment. If more than one filter
 * criteria is specified below, a VM will be selected if and only if it
 * satisfies all of them.
 */
export interface OSPolicyAssignmentInstanceFilter {
  /**
   * Target all VMs in the project. If true, no other criteria is permitted.
   */
  all?: boolean;
  /**
   * List of label sets used for VM exclusion. If the list has more than one
   * label set, the VM is excluded if any of the label sets are applicable for
   * the VM.
   */
  exclusionLabels?: OSPolicyAssignmentLabelSet[];
  /**
   * List of label sets used for VM inclusion. If the list has more than one
   * `LabelSet`, the VM is included if any of the label sets are applicable for
   * the VM.
   */
  inclusionLabels?: OSPolicyAssignmentLabelSet[];
  /**
   * List of inventories to select VMs. A VM is selected if its inventory data
   * matches at least one of the following inventories.
   */
  inventories?: OSPolicyAssignmentInstanceFilterInventory[];
}

/**
 * VM inventory details.
 */
export interface OSPolicyAssignmentInstanceFilterInventory {
  /**
   * Required. The OS short name
   */
  osShortName?: string;
  /**
   * The OS version Prefix matches are supported if asterisk(*) is provided as
   * the last character. For example, to match all versions with a major version
   * of `7`, specify the following value for this field `7.*` An empty string
   * matches all OS versions.
   */
  osVersion?: string;
}

/**
 * Message representing label set. * A label is a key value pair set for a VM.
 * * A LabelSet is a set of labels. * Labels within a LabelSet are ANDed. In
 * other words, a LabelSet is applicable for a VM only if it matches all the
 * labels in the LabelSet. * Example: A LabelSet with 2 labels: `env=prod` and
 * `type=webserver` will only be applicable for those VMs with both labels
 * present.
 */
export interface OSPolicyAssignmentLabelSet {
  /**
   * Labels are identified by key/value pairs in this map. A VM should contain
   * all the key/value pairs specified in this map to be selected.
   */
  labels?: {
    [key: string]: string
  };
}

/**
 * OS policy assignment operation metadata provided by OS policy assignment API
 * methods that return long running operations.
 */
export interface OSPolicyAssignmentOperationMetadata {
  /**
   * The OS policy assignment API method.
   */
  apiMethod?:  | "API_METHOD_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE";
  /**
   * Reference to the `OSPolicyAssignment` API resource. Format:
   * `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}`
   */
  osPolicyAssignment?: string;
  /**
   * Rollout start time
   */
  rolloutStartTime?: Date;
  /**
   * State of the rollout
   */
  rolloutState?:  | "ROLLOUT_STATE_UNSPECIFIED" | "IN_PROGRESS" | "CANCELLING" | "CANCELLED" | "SUCCEEDED";
  /**
   * Rollout update time
   */
  rolloutUpdateTime?: Date;
}

function serializeOSPolicyAssignmentOperationMetadata(data: any): OSPolicyAssignmentOperationMetadata {
  return {
    ...data,
    rolloutStartTime: data["rolloutStartTime"] !== undefined ? data["rolloutStartTime"].toISOString() : undefined,
    rolloutUpdateTime: data["rolloutUpdateTime"] !== undefined ? data["rolloutUpdateTime"].toISOString() : undefined,
  };
}

function deserializeOSPolicyAssignmentOperationMetadata(data: any): OSPolicyAssignmentOperationMetadata {
  return {
    ...data,
    rolloutStartTime: data["rolloutStartTime"] !== undefined ? new Date(data["rolloutStartTime"]) : undefined,
    rolloutUpdateTime: data["rolloutUpdateTime"] !== undefined ? new Date(data["rolloutUpdateTime"]) : undefined,
  };
}

/**
 * A report of the OS policy assignment status for a given instance.
 */
export interface OSPolicyAssignmentReport {
  /**
   * The Compute Engine VM instance name.
   */
  instance?: string;
  /**
   * Unique identifier of the last attempted run to apply the OS policies
   * associated with this assignment on the VM. This ID is logged by the OS
   * Config agent while applying the OS policies associated with this assignment
   * on the VM. NOTE: If the service is unable to successfully connect to the
   * agent for this run, then this id will not be available in the agent logs.
   */
  lastRunId?: string;
  /**
   * The `OSPolicyAssignmentReport` API resource name. Format:
   * `projects/{project_number}/locations/{location}/instances/{instance_id}/osPolicyAssignments/{os_policy_assignment_id}/report`
   */
  name?: string;
  /**
   * Reference to the `OSPolicyAssignment` API resource that the `OSPolicy`
   * belongs to. Format:
   * `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id@revision_id}`
   */
  osPolicyAssignment?: string;
  /**
   * Compliance data for each `OSPolicy` that is applied to the VM.
   */
  osPolicyCompliances?: OSPolicyAssignmentReportOSPolicyCompliance[];
  /**
   * Timestamp for when the report was last generated.
   */
  updateTime?: Date;
}

function serializeOSPolicyAssignmentReport(data: any): OSPolicyAssignmentReport {
  return {
    ...data,
    osPolicyCompliances: data["osPolicyCompliances"] !== undefined ? data["osPolicyCompliances"].map((item: any) => (serializeOSPolicyAssignmentReportOSPolicyCompliance(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeOSPolicyAssignmentReport(data: any): OSPolicyAssignmentReport {
  return {
    ...data,
    osPolicyCompliances: data["osPolicyCompliances"] !== undefined ? data["osPolicyCompliances"].map((item: any) => (deserializeOSPolicyAssignmentReportOSPolicyCompliance(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Compliance data for an OS policy
 */
export interface OSPolicyAssignmentReportOSPolicyCompliance {
  /**
   * The compliance state of the OS policy.
   */
  complianceState?:  | "UNKNOWN" | "COMPLIANT" | "NON_COMPLIANT";
  /**
   * The reason for the OS policy to be in an unknown compliance state. This
   * field is always populated when `compliance_state` is `UNKNOWN`. If
   * populated, the field can contain one of the following values: *
   * `vm-not-running`: The VM was not running. *
   * `os-policies-not-supported-by-agent`: The version of the OS Config agent
   * running on the VM does not support running OS policies. *
   * `no-agent-detected`: The OS Config agent is not detected for the VM. *
   * `resource-execution-errors`: The OS Config agent encountered errors while
   * executing one or more resources in the policy. See
   * `os_policy_resource_compliances` for details. * `task-timeout`: The task
   * sent to the agent to apply the policy timed out. *
   * `unexpected-agent-state`: The OS Config agent did not report the final
   * status of the task that attempted to apply the policy. Instead, the agent
   * unexpectedly started working on a different task. This mostly happens when
   * the agent or VM unexpectedly restarts while applying OS policies. *
   * `internal-service-errors`: Internal service errors were encountered while
   * attempting to apply the policy.
   */
  complianceStateReason?: string;
  /**
   * The OS policy id
   */
  osPolicyId?: string;
  /**
   * Compliance data for each resource within the policy that is applied to the
   * VM.
   */
  osPolicyResourceCompliances?: OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance[];
}

function serializeOSPolicyAssignmentReportOSPolicyCompliance(data: any): OSPolicyAssignmentReportOSPolicyCompliance {
  return {
    ...data,
    osPolicyResourceCompliances: data["osPolicyResourceCompliances"] !== undefined ? data["osPolicyResourceCompliances"].map((item: any) => (serializeOSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance(item))) : undefined,
  };
}

function deserializeOSPolicyAssignmentReportOSPolicyCompliance(data: any): OSPolicyAssignmentReportOSPolicyCompliance {
  return {
    ...data,
    osPolicyResourceCompliances: data["osPolicyResourceCompliances"] !== undefined ? data["osPolicyResourceCompliances"].map((item: any) => (deserializeOSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance(item))) : undefined,
  };
}

/**
 * Compliance data for an OS policy resource.
 */
export interface OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance {
  /**
   * The compliance state of the resource.
   */
  complianceState?:  | "UNKNOWN" | "COMPLIANT" | "NON_COMPLIANT";
  /**
   * A reason for the resource to be in the given compliance state. This field
   * is always populated when `compliance_state` is `UNKNOWN`. The following
   * values are supported when `compliance_state == UNKNOWN` *
   * `execution-errors`: Errors were encountered by the agent while executing
   * the resource and the compliance state couldn't be determined. *
   * `execution-skipped-by-agent`: Resource execution was skipped by the agent
   * because errors were encountered while executing prior resources in the OS
   * policy. * `os-policy-execution-attempt-failed`: The execution of the OS
   * policy containing this resource failed and the compliance state couldn't be
   * determined.
   */
  complianceStateReason?: string;
  /**
   * Ordered list of configuration completed by the agent for the OS policy
   * resource.
   */
  configSteps?: OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep[];
  /**
   * ExecResource specific output.
   */
  execResourceOutput?: OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput;
  /**
   * The ID of the OS policy resource.
   */
  osPolicyResourceId?: string;
}

function serializeOSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance(data: any): OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance {
  return {
    ...data,
    execResourceOutput: data["execResourceOutput"] !== undefined ? serializeOSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput(data["execResourceOutput"]) : undefined,
  };
}

function deserializeOSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance(data: any): OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceCompliance {
  return {
    ...data,
    execResourceOutput: data["execResourceOutput"] !== undefined ? deserializeOSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput(data["execResourceOutput"]) : undefined,
  };
}

/**
 * ExecResource specific output.
 */
export interface OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput {
  /**
   * Output from enforcement phase output file (if run). Output size is limited
   * to 100K bytes.
   */
  enforcementOutput?: Uint8Array;
}

function serializeOSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput(data: any): OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput {
  return {
    ...data,
    enforcementOutput: data["enforcementOutput"] !== undefined ? encodeBase64(data["enforcementOutput"]) : undefined,
  };
}

function deserializeOSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput(data: any): OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceExecResourceOutput {
  return {
    ...data,
    enforcementOutput: data["enforcementOutput"] !== undefined ? decodeBase64(data["enforcementOutput"] as string) : undefined,
  };
}

/**
 * Step performed by the OS Config agent for configuring an `OSPolicy` resource
 * to its desired state.
 */
export interface OSPolicyAssignmentReportOSPolicyComplianceOSPolicyResourceComplianceOSPolicyResourceConfigStep {
  /**
   * An error message recorded during the execution of this step. Only
   * populated if errors were encountered during this step execution.
   */
  errorMessage?: string;
  /**
   * Configuration step type.
   */
  type?:  | "TYPE_UNSPECIFIED" | "VALIDATION" | "DESIRED_STATE_CHECK" | "DESIRED_STATE_ENFORCEMENT" | "DESIRED_STATE_CHECK_POST_ENFORCEMENT";
}

/**
 * Message to configure the rollout at the zonal level for the OS policy
 * assignment.
 */
export interface OSPolicyAssignmentRollout {
  /**
   * Required. The maximum number (or percentage) of VMs per zone to disrupt at
   * any given moment.
   */
  disruptionBudget?: FixedOrPercent;
  /**
   * Required. This determines the minimum duration of time to wait after the
   * configuration changes are applied through the current rollout. A VM
   * continues to count towards the `disruption_budget` at least until this
   * duration of time has passed after configuration changes are applied.
   */
  minWaitDuration?: number /* Duration */;
}

function serializeOSPolicyAssignmentRollout(data: any): OSPolicyAssignmentRollout {
  return {
    ...data,
    minWaitDuration: data["minWaitDuration"] !== undefined ? data["minWaitDuration"] : undefined,
  };
}

function deserializeOSPolicyAssignmentRollout(data: any): OSPolicyAssignmentRollout {
  return {
    ...data,
    minWaitDuration: data["minWaitDuration"] !== undefined ? data["minWaitDuration"] : undefined,
  };
}

/**
 * Filtering criteria to select VMs based on inventory details.
 */
export interface OSPolicyInventoryFilter {
  /**
   * Required. The OS short name
   */
  osShortName?: string;
  /**
   * The OS version Prefix matches are supported if asterisk(*) is provided as
   * the last character. For example, to match all versions with a major version
   * of `7`, specify the following value for this field `7.*` An empty string
   * matches all OS versions.
   */
  osVersion?: string;
}

/**
 * An OS policy resource is used to define the desired state configuration and
 * provides a specific functionality like installing/removing packages,
 * executing a script etc. The system ensures that resources are always in their
 * desired state by taking necessary actions if they have drifted from their
 * desired state.
 */
export interface OSPolicyResource {
  /**
   * Exec resource
   */
  exec?: OSPolicyResourceExecResource;
  /**
   * File resource
   */
  file?: OSPolicyResourceFileResource;
  /**
   * Required. The id of the resource with the following restrictions: * Must
   * contain only lowercase letters, numbers, and hyphens. * Must start with a
   * letter. * Must be between 1-63 characters. * Must end with a number or a
   * letter. * Must be unique within the OS policy.
   */
  id?: string;
  /**
   * Package resource
   */
  pkg?: OSPolicyResourcePackageResource;
  /**
   * Package repository resource
   */
  repository?: OSPolicyResourceRepositoryResource;
}

function serializeOSPolicyResource(data: any): OSPolicyResource {
  return {
    ...data,
    exec: data["exec"] !== undefined ? serializeOSPolicyResourceExecResource(data["exec"]) : undefined,
    file: data["file"] !== undefined ? serializeOSPolicyResourceFileResource(data["file"]) : undefined,
    pkg: data["pkg"] !== undefined ? serializeOSPolicyResourcePackageResource(data["pkg"]) : undefined,
  };
}

function deserializeOSPolicyResource(data: any): OSPolicyResource {
  return {
    ...data,
    exec: data["exec"] !== undefined ? deserializeOSPolicyResourceExecResource(data["exec"]) : undefined,
    file: data["file"] !== undefined ? deserializeOSPolicyResourceFileResource(data["file"]) : undefined,
    pkg: data["pkg"] !== undefined ? deserializeOSPolicyResourcePackageResource(data["pkg"]) : undefined,
  };
}

/**
 * A resource that allows executing scripts on the VM. The `ExecResource` has 2
 * stages: `validate` and `enforce` and both stages accept a script as an
 * argument to execute. When the `ExecResource` is applied by the agent, it
 * first executes the script in the `validate` stage. The `validate` stage can
 * signal that the `ExecResource` is already in the desired state by returning
 * an exit code of `100`. If the `ExecResource` is not in the desired state, it
 * should return an exit code of `101`. Any other exit code returned by this
 * stage is considered an error. If the `ExecResource` is not in the desired
 * state based on the exit code from the `validate` stage, the agent proceeds to
 * execute the script from the `enforce` stage. If the `ExecResource` is already
 * in the desired state, the `enforce` stage will not be run. Similar to
 * `validate` stage, the `enforce` stage should return an exit code of `100` to
 * indicate that the resource in now in its desired state. Any other exit code
 * is considered an error. NOTE: An exit code of `100` was chosen over `0` (and
 * `101` vs `1`) to have an explicit indicator of `in desired state`, `not in
 * desired state` and errors. Because, for example, Powershell will always
 * return an exit code of `0` unless an `exit` statement is provided in the
 * script. So, for reasons of consistency and being explicit, exit codes `100`
 * and `101` were chosen.
 */
export interface OSPolicyResourceExecResource {
  /**
   * What to run to bring this resource into the desired state. An exit code of
   * 100 indicates "success", any other exit code indicates a failure running
   * enforce.
   */
  enforce?: OSPolicyResourceExecResourceExec;
  /**
   * Required. What to run to validate this resource is in the desired state.
   * An exit code of 100 indicates "in desired state", and exit code of 101
   * indicates "not in desired state". Any other exit code indicates a failure
   * running validate.
   */
  validate?: OSPolicyResourceExecResourceExec;
}

function serializeOSPolicyResourceExecResource(data: any): OSPolicyResourceExecResource {
  return {
    ...data,
    enforce: data["enforce"] !== undefined ? serializeOSPolicyResourceExecResourceExec(data["enforce"]) : undefined,
    validate: data["validate"] !== undefined ? serializeOSPolicyResourceExecResourceExec(data["validate"]) : undefined,
  };
}

function deserializeOSPolicyResourceExecResource(data: any): OSPolicyResourceExecResource {
  return {
    ...data,
    enforce: data["enforce"] !== undefined ? deserializeOSPolicyResourceExecResourceExec(data["enforce"]) : undefined,
    validate: data["validate"] !== undefined ? deserializeOSPolicyResourceExecResourceExec(data["validate"]) : undefined,
  };
}

/**
 * A file or script to execute.
 */
export interface OSPolicyResourceExecResourceExec {
  /**
   * Optional arguments to pass to the source during execution.
   */
  args?: string[];
  /**
   * A remote or local file.
   */
  file?: OSPolicyResourceFile;
  /**
   * Required. The script interpreter to use.
   */
  interpreter?:  | "INTERPRETER_UNSPECIFIED" | "NONE" | "SHELL" | "POWERSHELL";
  /**
   * Only recorded for enforce Exec. Path to an output file (that is created by
   * this Exec) whose content will be recorded in OSPolicyResourceCompliance
   * after a successful run. Absence or failure to read this file will result in
   * this ExecResource being non-compliant. Output file size is limited to 100K
   * bytes.
   */
  outputFilePath?: string;
  /**
   * An inline script. The size of the script is limited to 32KiB.
   */
  script?: string;
}

function serializeOSPolicyResourceExecResourceExec(data: any): OSPolicyResourceExecResourceExec {
  return {
    ...data,
    file: data["file"] !== undefined ? serializeOSPolicyResourceFile(data["file"]) : undefined,
  };
}

function deserializeOSPolicyResourceExecResourceExec(data: any): OSPolicyResourceExecResourceExec {
  return {
    ...data,
    file: data["file"] !== undefined ? deserializeOSPolicyResourceFile(data["file"]) : undefined,
  };
}

/**
 * A remote or local file.
 */
export interface OSPolicyResourceFile {
  /**
   * Defaults to false. When false, files are subject to validations based on
   * the file type: Remote: A checksum must be specified. Cloud Storage: An
   * object generation number must be specified.
   */
  allowInsecure?: boolean;
  /**
   * A Cloud Storage object.
   */
  gcs?: OSPolicyResourceFileGcs;
  /**
   * A local path within the VM to use.
   */
  localPath?: string;
  /**
   * A generic remote file.
   */
  remote?: OSPolicyResourceFileRemote;
}

function serializeOSPolicyResourceFile(data: any): OSPolicyResourceFile {
  return {
    ...data,
    gcs: data["gcs"] !== undefined ? serializeOSPolicyResourceFileGcs(data["gcs"]) : undefined,
  };
}

function deserializeOSPolicyResourceFile(data: any): OSPolicyResourceFile {
  return {
    ...data,
    gcs: data["gcs"] !== undefined ? deserializeOSPolicyResourceFileGcs(data["gcs"]) : undefined,
  };
}

/**
 * Specifies a file available as a Cloud Storage Object.
 */
export interface OSPolicyResourceFileGcs {
  /**
   * Required. Bucket of the Cloud Storage object.
   */
  bucket?: string;
  /**
   * Generation number of the Cloud Storage object.
   */
  generation?: bigint;
  /**
   * Required. Name of the Cloud Storage object.
   */
  object?: string;
}

function serializeOSPolicyResourceFileGcs(data: any): OSPolicyResourceFileGcs {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeOSPolicyResourceFileGcs(data: any): OSPolicyResourceFileGcs {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Specifies a file available via some URI.
 */
export interface OSPolicyResourceFileRemote {
  /**
   * SHA256 checksum of the remote file.
   */
  sha256Checksum?: string;
  /**
   * Required. URI from which to fetch the object. It should contain both the
   * protocol and path following the format `{protocol}://{location}`.
   */
  uri?: string;
}

/**
 * A resource that manages the state of a file.
 */
export interface OSPolicyResourceFileResource {
  /**
   * A a file with this content. The size of the content is limited to 32KiB.
   */
  content?: string;
  /**
   * A remote or local source.
   */
  file?: OSPolicyResourceFile;
  /**
   * Required. The absolute path of the file within the VM.
   */
  path?: string;
  /**
   * Consists of three octal digits which represent, in order, the permissions
   * of the owner, group, and other users for the file (similarly to the numeric
   * mode used in the linux chmod utility). Each digit represents a three bit
   * number with the 4 bit corresponding to the read permissions, the 2 bit
   * corresponds to the write bit, and the one bit corresponds to the execute
   * permission. Default behavior is 755. Below are some examples of permissions
   * and their associated values: read, write, and execute: 7 read and execute:
   * 5 read and write: 6 read only: 4
   */
  permissions?: string;
  /**
   * Required. Desired state of the file.
   */
  state?:  | "DESIRED_STATE_UNSPECIFIED" | "PRESENT" | "ABSENT" | "CONTENTS_MATCH";
}

function serializeOSPolicyResourceFileResource(data: any): OSPolicyResourceFileResource {
  return {
    ...data,
    file: data["file"] !== undefined ? serializeOSPolicyResourceFile(data["file"]) : undefined,
  };
}

function deserializeOSPolicyResourceFileResource(data: any): OSPolicyResourceFileResource {
  return {
    ...data,
    file: data["file"] !== undefined ? deserializeOSPolicyResourceFile(data["file"]) : undefined,
  };
}

/**
 * Resource groups provide a mechanism to group OS policy resources. Resource
 * groups enable OS policy authors to create a single OS policy to be applied to
 * VMs running different operating Systems. When the OS policy is applied to a
 * target VM, the appropriate resource group within the OS policy is selected
 * based on the `OSFilter` specified within the resource group.
 */
export interface OSPolicyResourceGroup {
  /**
   * List of inventory filters for the resource group. The resources in this
   * resource group are applied to the target VM if it satisfies at least one of
   * the following inventory filters. For example, to apply this resource group
   * to VMs running either `RHEL` or `CentOS` operating systems, specify 2 items
   * for the list with following values:
   * inventory_filters[0].os_short_name='rhel' and
   * inventory_filters[1].os_short_name='centos' If the list is empty, this
   * resource group will be applied to the target VM unconditionally.
   */
  inventoryFilters?: OSPolicyInventoryFilter[];
  /**
   * Required. List of resources configured for this resource group. The
   * resources are executed in the exact order specified here.
   */
  resources?: OSPolicyResource[];
}

function serializeOSPolicyResourceGroup(data: any): OSPolicyResourceGroup {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (serializeOSPolicyResource(item))) : undefined,
  };
}

function deserializeOSPolicyResourceGroup(data: any): OSPolicyResourceGroup {
  return {
    ...data,
    resources: data["resources"] !== undefined ? data["resources"].map((item: any) => (deserializeOSPolicyResource(item))) : undefined,
  };
}

/**
 * A resource that manages a system package.
 */
export interface OSPolicyResourcePackageResource {
  /**
   * A package managed by Apt.
   */
  apt?: OSPolicyResourcePackageResourceAPT;
  /**
   * A deb package file.
   */
  deb?: OSPolicyResourcePackageResourceDeb;
  /**
   * Required. The desired state the agent should maintain for this package.
   */
  desiredState?:  | "DESIRED_STATE_UNSPECIFIED" | "INSTALLED" | "REMOVED";
  /**
   * A package managed by GooGet.
   */
  googet?: OSPolicyResourcePackageResourceGooGet;
  /**
   * An MSI package.
   */
  msi?: OSPolicyResourcePackageResourceMSI;
  /**
   * An rpm package file.
   */
  rpm?: OSPolicyResourcePackageResourceRPM;
  /**
   * A package managed by YUM.
   */
  yum?: OSPolicyResourcePackageResourceYUM;
  /**
   * A package managed by Zypper.
   */
  zypper?: OSPolicyResourcePackageResourceZypper;
}

function serializeOSPolicyResourcePackageResource(data: any): OSPolicyResourcePackageResource {
  return {
    ...data,
    deb: data["deb"] !== undefined ? serializeOSPolicyResourcePackageResourceDeb(data["deb"]) : undefined,
    msi: data["msi"] !== undefined ? serializeOSPolicyResourcePackageResourceMSI(data["msi"]) : undefined,
    rpm: data["rpm"] !== undefined ? serializeOSPolicyResourcePackageResourceRPM(data["rpm"]) : undefined,
  };
}

function deserializeOSPolicyResourcePackageResource(data: any): OSPolicyResourcePackageResource {
  return {
    ...data,
    deb: data["deb"] !== undefined ? deserializeOSPolicyResourcePackageResourceDeb(data["deb"]) : undefined,
    msi: data["msi"] !== undefined ? deserializeOSPolicyResourcePackageResourceMSI(data["msi"]) : undefined,
    rpm: data["rpm"] !== undefined ? deserializeOSPolicyResourcePackageResourceRPM(data["rpm"]) : undefined,
  };
}

/**
 * A package managed by APT. - install: `apt-get update && apt-get -y install
 * [name]` - remove: `apt-get -y remove [name]`
 */
export interface OSPolicyResourcePackageResourceAPT {
  /**
   * Required. Package name.
   */
  name?: string;
}

/**
 * A deb package file. dpkg packages only support INSTALLED state.
 */
export interface OSPolicyResourcePackageResourceDeb {
  /**
   * Whether dependencies should also be installed. - install when false: `dpkg
   * -i package` - install when true: `apt-get update && apt-get -y install
   * package.deb`
   */
  pullDeps?: boolean;
  /**
   * Required. A deb package.
   */
  source?: OSPolicyResourceFile;
}

function serializeOSPolicyResourcePackageResourceDeb(data: any): OSPolicyResourcePackageResourceDeb {
  return {
    ...data,
    source: data["source"] !== undefined ? serializeOSPolicyResourceFile(data["source"]) : undefined,
  };
}

function deserializeOSPolicyResourcePackageResourceDeb(data: any): OSPolicyResourcePackageResourceDeb {
  return {
    ...data,
    source: data["source"] !== undefined ? deserializeOSPolicyResourceFile(data["source"]) : undefined,
  };
}

/**
 * A package managed by GooGet. - install: `googet -noconfirm install package`
 * - remove: `googet -noconfirm remove package`
 */
export interface OSPolicyResourcePackageResourceGooGet {
  /**
   * Required. Package name.
   */
  name?: string;
}

/**
 * An MSI package. MSI packages only support INSTALLED state.
 */
export interface OSPolicyResourcePackageResourceMSI {
  /**
   * Additional properties to use during installation. This should be in the
   * format of Property=Setting. Appended to the defaults of `ACTION=INSTALL
   * REBOOT=ReallySuppress`.
   */
  properties?: string[];
  /**
   * Required. The MSI package.
   */
  source?: OSPolicyResourceFile;
}

function serializeOSPolicyResourcePackageResourceMSI(data: any): OSPolicyResourcePackageResourceMSI {
  return {
    ...data,
    source: data["source"] !== undefined ? serializeOSPolicyResourceFile(data["source"]) : undefined,
  };
}

function deserializeOSPolicyResourcePackageResourceMSI(data: any): OSPolicyResourcePackageResourceMSI {
  return {
    ...data,
    source: data["source"] !== undefined ? deserializeOSPolicyResourceFile(data["source"]) : undefined,
  };
}

/**
 * An RPM package file. RPM packages only support INSTALLED state.
 */
export interface OSPolicyResourcePackageResourceRPM {
  /**
   * Whether dependencies should also be installed. - install when false: `rpm
   * --upgrade --replacepkgs package.rpm` - install when true: `yum -y install
   * package.rpm` or `zypper -y install package.rpm`
   */
  pullDeps?: boolean;
  /**
   * Required. An rpm package.
   */
  source?: OSPolicyResourceFile;
}

function serializeOSPolicyResourcePackageResourceRPM(data: any): OSPolicyResourcePackageResourceRPM {
  return {
    ...data,
    source: data["source"] !== undefined ? serializeOSPolicyResourceFile(data["source"]) : undefined,
  };
}

function deserializeOSPolicyResourcePackageResourceRPM(data: any): OSPolicyResourcePackageResourceRPM {
  return {
    ...data,
    source: data["source"] !== undefined ? deserializeOSPolicyResourceFile(data["source"]) : undefined,
  };
}

/**
 * A package managed by YUM. - install: `yum -y install package` - remove: `yum
 * -y remove package`
 */
export interface OSPolicyResourcePackageResourceYUM {
  /**
   * Required. Package name.
   */
  name?: string;
}

/**
 * A package managed by Zypper. - install: `zypper -y install package` -
 * remove: `zypper -y rm package`
 */
export interface OSPolicyResourcePackageResourceZypper {
  /**
   * Required. Package name.
   */
  name?: string;
}

/**
 * A resource that manages a package repository.
 */
export interface OSPolicyResourceRepositoryResource {
  /**
   * An Apt Repository.
   */
  apt?: OSPolicyResourceRepositoryResourceAptRepository;
  /**
   * A Goo Repository.
   */
  goo?: OSPolicyResourceRepositoryResourceGooRepository;
  /**
   * A Yum Repository.
   */
  yum?: OSPolicyResourceRepositoryResourceYumRepository;
  /**
   * A Zypper Repository.
   */
  zypper?: OSPolicyResourceRepositoryResourceZypperRepository;
}

/**
 * Represents a single apt package repository. These will be added to a repo
 * file that will be managed at `/etc/apt/sources.list.d/google_osconfig.list`.
 */
export interface OSPolicyResourceRepositoryResourceAptRepository {
  /**
   * Required. Type of archive files in this repository.
   */
  archiveType?:  | "ARCHIVE_TYPE_UNSPECIFIED" | "DEB" | "DEB_SRC";
  /**
   * Required. List of components for this repository. Must contain at least
   * one item.
   */
  components?: string[];
  /**
   * Required. Distribution of this repository.
   */
  distribution?: string;
  /**
   * URI of the key file for this repository. The agent maintains a keyring at
   * `/etc/apt/trusted.gpg.d/osconfig_agent_managed.gpg`.
   */
  gpgKey?: string;
  /**
   * Required. URI for this repository.
   */
  uri?: string;
}

/**
 * Represents a Goo package repository. These are added to a repo file that is
 * managed at `C:/ProgramData/GooGet/repos/google_osconfig.repo`.
 */
export interface OSPolicyResourceRepositoryResourceGooRepository {
  /**
   * Required. The name of the repository.
   */
  name?: string;
  /**
   * Required. The url of the repository.
   */
  url?: string;
}

/**
 * Represents a single yum package repository. These are added to a repo file
 * that is managed at `/etc/yum.repos.d/google_osconfig.repo`.
 */
export interface OSPolicyResourceRepositoryResourceYumRepository {
  /**
   * Required. The location of the repository directory.
   */
  baseUrl?: string;
  /**
   * The display name of the repository.
   */
  displayName?: string;
  /**
   * URIs of GPG keys.
   */
  gpgKeys?: string[];
  /**
   * Required. A one word, unique name for this repository. This is the `repo
   * id` in the yum config file and also the `display_name` if `display_name` is
   * omitted. This id is also used as the unique identifier when checking for
   * resource conflicts.
   */
  id?: string;
}

/**
 * Represents a single zypper package repository. These are added to a repo
 * file that is managed at `/etc/zypp/repos.d/google_osconfig.repo`.
 */
export interface OSPolicyResourceRepositoryResourceZypperRepository {
  /**
   * Required. The location of the repository directory.
   */
  baseUrl?: string;
  /**
   * The display name of the repository.
   */
  displayName?: string;
  /**
   * URIs of GPG keys.
   */
  gpgKeys?: string[];
  /**
   * Required. A one word, unique name for this repository. This is the `repo
   * id` in the zypper config file and also the `display_name` if `display_name`
   * is omitted. This id is also used as the unique identifier when checking for
   * GuestPolicy conflicts.
   */
  id?: string;
}

/**
 * Patch configuration specifications. Contains details on how to apply the
 * patch(es) to a VM instance.
 */
export interface PatchConfig {
  /**
   * Apt update settings. Use this setting to override the default `apt` patch
   * rules.
   */
  apt?: AptSettings;
  /**
   * Goo update settings. Use this setting to override the default `goo` patch
   * rules.
   */
  goo?: GooSettings;
  /**
   * Allows the patch job to run on Managed instance groups (MIGs).
   */
  migInstancesAllowed?: boolean;
  /**
   * The `ExecStep` to run after the patch update.
   */
  postStep?: ExecStep;
  /**
   * The `ExecStep` to run before the patch update.
   */
  preStep?: ExecStep;
  /**
   * Post-patch reboot settings.
   */
  rebootConfig?:  | "REBOOT_CONFIG_UNSPECIFIED" | "DEFAULT" | "ALWAYS" | "NEVER";
  /**
   * Windows update settings. Use this override the default windows patch
   * rules.
   */
  windowsUpdate?: WindowsUpdateSettings;
  /**
   * Yum update settings. Use this setting to override the default `yum` patch
   * rules.
   */
  yum?: YumSettings;
  /**
   * Zypper update settings. Use this setting to override the default `zypper`
   * patch rules.
   */
  zypper?: ZypperSettings;
}

function serializePatchConfig(data: any): PatchConfig {
  return {
    ...data,
    postStep: data["postStep"] !== undefined ? serializeExecStep(data["postStep"]) : undefined,
    preStep: data["preStep"] !== undefined ? serializeExecStep(data["preStep"]) : undefined,
  };
}

function deserializePatchConfig(data: any): PatchConfig {
  return {
    ...data,
    postStep: data["postStep"] !== undefined ? deserializeExecStep(data["postStep"]) : undefined,
    preStep: data["preStep"] !== undefined ? deserializeExecStep(data["preStep"]) : undefined,
  };
}

/**
 * Patch deployments are configurations that individual patch jobs use to
 * complete a patch. These configurations include instance filter, package
 * repository settings, and a schedule. For more information about creating and
 * managing patch deployments, see [Scheduling patch
 * jobs](https://cloud.google.com/compute/docs/os-patch-management/schedule-patch-jobs).
 */
export interface PatchDeployment {
  /**
   * Output only. Time the patch deployment was created. Timestamp is in
   * [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.
   */
  readonly createTime?: Date;
  /**
   * Optional. Description of the patch deployment. Length of the description
   * is limited to 1024 characters.
   */
  description?: string;
  /**
   * Optional. Duration of the patch. After the duration ends, the patch times
   * out.
   */
  duration?: number /* Duration */;
  /**
   * Required. VM instances to patch.
   */
  instanceFilter?: PatchInstanceFilter;
  /**
   * Output only. The last time a patch job was started by this deployment.
   * Timestamp is in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text
   * format.
   */
  readonly lastExecuteTime?: Date;
  /**
   * Unique name for the patch deployment resource in a project. The patch
   * deployment name is in the form:
   * `projects/{project_id}/patchDeployments/{patch_deployment_id}`. This field
   * is ignored when you create a new patch deployment.
   */
  name?: string;
  /**
   * Required. Schedule a one-time execution.
   */
  oneTimeSchedule?: OneTimeSchedule;
  /**
   * Optional. Patch configuration that is applied.
   */
  patchConfig?: PatchConfig;
  /**
   * Required. Schedule recurring executions.
   */
  recurringSchedule?: RecurringSchedule;
  /**
   * Optional. Rollout strategy of the patch job.
   */
  rollout?: PatchRollout;
  /**
   * Output only. Current state of the patch deployment.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "PAUSED";
  /**
   * Output only. Time the patch deployment was last updated. Timestamp is in
   * [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.
   */
  readonly updateTime?: Date;
}

function serializePatchDeployment(data: any): PatchDeployment {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    oneTimeSchedule: data["oneTimeSchedule"] !== undefined ? serializeOneTimeSchedule(data["oneTimeSchedule"]) : undefined,
    patchConfig: data["patchConfig"] !== undefined ? serializePatchConfig(data["patchConfig"]) : undefined,
    recurringSchedule: data["recurringSchedule"] !== undefined ? serializeRecurringSchedule(data["recurringSchedule"]) : undefined,
  };
}

function deserializePatchDeployment(data: any): PatchDeployment {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    lastExecuteTime: data["lastExecuteTime"] !== undefined ? new Date(data["lastExecuteTime"]) : undefined,
    oneTimeSchedule: data["oneTimeSchedule"] !== undefined ? deserializeOneTimeSchedule(data["oneTimeSchedule"]) : undefined,
    patchConfig: data["patchConfig"] !== undefined ? deserializePatchConfig(data["patchConfig"]) : undefined,
    recurringSchedule: data["recurringSchedule"] !== undefined ? deserializeRecurringSchedule(data["recurringSchedule"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A filter to target VM instances for patching. The targeted VMs must meet all
 * criteria specified. So if both labels and zones are specified, the patch job
 * targets only VMs with those labels and in those zones.
 */
export interface PatchInstanceFilter {
  /**
   * Target all VM instances in the project. If true, no other criteria is
   * permitted.
   */
  all?: boolean;
  /**
   * Targets VM instances matching ANY of these GroupLabels. This allows
   * targeting of disparate groups of VM instances.
   */
  groupLabels?: PatchInstanceFilterGroupLabel[];
  /**
   * Targets VMs whose name starts with one of these prefixes. Similar to
   * labels, this is another way to group VMs when targeting configs, for
   * example prefix="prod-".
   */
  instanceNamePrefixes?: string[];
  /**
   * Targets any of the VM instances specified. Instances are specified by
   * their URI in the form `zones/[ZONE]/instances/[INSTANCE_NAME]`,
   * `projects/[PROJECT_ID]/zones/[ZONE]/instances/[INSTANCE_NAME]`, or
   * `https://www.googleapis.com/compute/v1/projects/[PROJECT_ID]/zones/[ZONE]/instances/[INSTANCE_NAME]`
   */
  instances?: string[];
  /**
   * Targets VM instances in ANY of these zones. Leave empty to target VM
   * instances in any zone.
   */
  zones?: string[];
}

/**
 * Targets a group of VM instances by using their [assigned
 * labels](https://cloud.google.com/compute/docs/labeling-resources). Labels are
 * key-value pairs. A `GroupLabel` is a combination of labels that is used to
 * target VMs for a patch job. For example, a patch job can target VMs that have
 * the following `GroupLabel`: `{"env":"test", "app":"web"}`. This means that
 * the patch job is applied to VMs that have both the labels `env=test` and
 * `app=web`.
 */
export interface PatchInstanceFilterGroupLabel {
  /**
   * Compute Engine instance labels that must be present for a VM instance to
   * be targeted by this filter.
   */
  labels?: {
    [key: string]: string
  };
}

/**
 * A high level representation of a patch job that is either in progress or has
 * completed. Instance details are not included in the job. To paginate through
 * instance details, use ListPatchJobInstanceDetails. For more information about
 * patch jobs, see [Creating patch
 * jobs](https://cloud.google.com/compute/docs/os-patch-management/create-patch-job).
 */
export interface PatchJob {
  /**
   * Time this patch job was created.
   */
  createTime?: Date;
  /**
   * Description of the patch job. Length of the description is limited to 1024
   * characters.
   */
  description?: string;
  /**
   * Display name for this patch job. This is not a unique identifier.
   */
  displayName?: string;
  /**
   * If this patch job is a dry run, the agent reports that it has finished
   * without running any updates on the VM instance.
   */
  dryRun?: boolean;
  /**
   * Duration of the patch job. After the duration ends, the patch job times
   * out.
   */
  duration?: number /* Duration */;
  /**
   * If this patch job failed, this message provides information about the
   * failure.
   */
  errorMessage?: string;
  /**
   * Summary of instance details.
   */
  instanceDetailsSummary?: PatchJobInstanceDetailsSummary;
  /**
   * Instances to patch.
   */
  instanceFilter?: PatchInstanceFilter;
  /**
   * Unique identifier for this patch job in the form `projects/*\/patchJobs/*`
   */
  name?: string;
  /**
   * Patch configuration being applied.
   */
  patchConfig?: PatchConfig;
  /**
   * Output only. Name of the patch deployment that created this patch job.
   */
  readonly patchDeployment?: string;
  /**
   * Reflects the overall progress of the patch job in the range of 0.0 being
   * no progress to 100.0 being complete.
   */
  percentComplete?: number;
  /**
   * Rollout strategy being applied.
   */
  rollout?: PatchRollout;
  /**
   * The current state of the PatchJob.
   */
  state?:  | "STATE_UNSPECIFIED" | "STARTED" | "INSTANCE_LOOKUP" | "PATCHING" | "SUCCEEDED" | "COMPLETED_WITH_ERRORS" | "CANCELED" | "TIMED_OUT";
  /**
   * Last time this patch job was updated.
   */
  updateTime?: Date;
}

function serializePatchJob(data: any): PatchJob {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    instanceDetailsSummary: data["instanceDetailsSummary"] !== undefined ? serializePatchJobInstanceDetailsSummary(data["instanceDetailsSummary"]) : undefined,
    patchConfig: data["patchConfig"] !== undefined ? serializePatchConfig(data["patchConfig"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializePatchJob(data: any): PatchJob {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    instanceDetailsSummary: data["instanceDetailsSummary"] !== undefined ? deserializePatchJobInstanceDetailsSummary(data["instanceDetailsSummary"]) : undefined,
    patchConfig: data["patchConfig"] !== undefined ? deserializePatchConfig(data["patchConfig"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Patch details for a VM instance. For more information about reviewing VM
 * instance details, see [Listing all VM instance details for a specific patch
 * job](https://cloud.google.com/compute/docs/os-patch-management/manage-patch-jobs#list-instance-details).
 */
export interface PatchJobInstanceDetails {
  /**
   * The number of times the agent that the agent attempts to apply the patch.
   */
  attemptCount?: bigint;
  /**
   * If the patch fails, this field provides the reason.
   */
  failureReason?: string;
  /**
   * The unique identifier for the instance. This identifier is defined by the
   * server.
   */
  instanceSystemId?: string;
  /**
   * The instance name in the form `projects/*\/zones/*\/instances/*`
   */
  name?: string;
  /**
   * Current state of instance patch.
   */
  state?:  | "PATCH_STATE_UNSPECIFIED" | "PENDING" | "INACTIVE" | "NOTIFIED" | "STARTED" | "DOWNLOADING_PATCHES" | "APPLYING_PATCHES" | "REBOOTING" | "SUCCEEDED" | "SUCCEEDED_REBOOT_REQUIRED" | "FAILED" | "ACKED" | "TIMED_OUT" | "RUNNING_PRE_PATCH_STEP" | "RUNNING_POST_PATCH_STEP" | "NO_AGENT_DETECTED";
}

function serializePatchJobInstanceDetails(data: any): PatchJobInstanceDetails {
  return {
    ...data,
    attemptCount: data["attemptCount"] !== undefined ? String(data["attemptCount"]) : undefined,
  };
}

function deserializePatchJobInstanceDetails(data: any): PatchJobInstanceDetails {
  return {
    ...data,
    attemptCount: data["attemptCount"] !== undefined ? BigInt(data["attemptCount"]) : undefined,
  };
}

/**
 * A summary of the current patch state across all instances that this patch
 * job affects. Contains counts of instances in different states. These states
 * map to `InstancePatchState`. List patch job instance details to see the
 * specific states of each instance.
 */
export interface PatchJobInstanceDetailsSummary {
  /**
   * Number of instances that have acked and will start shortly.
   */
  ackedInstanceCount?: bigint;
  /**
   * Number of instances that are applying patches.
   */
  applyingPatchesInstanceCount?: bigint;
  /**
   * Number of instances that are downloading patches.
   */
  downloadingPatchesInstanceCount?: bigint;
  /**
   * Number of instances that failed.
   */
  failedInstanceCount?: bigint;
  /**
   * Number of instances that are inactive.
   */
  inactiveInstanceCount?: bigint;
  /**
   * Number of instances that do not appear to be running the agent. Check to
   * ensure that the agent is installed, running, and able to communicate with
   * the service.
   */
  noAgentDetectedInstanceCount?: bigint;
  /**
   * Number of instances notified about patch job.
   */
  notifiedInstanceCount?: bigint;
  /**
   * Number of instances pending patch job.
   */
  pendingInstanceCount?: bigint;
  /**
   * Number of instances that are running the post-patch step.
   */
  postPatchStepInstanceCount?: bigint;
  /**
   * Number of instances that are running the pre-patch step.
   */
  prePatchStepInstanceCount?: bigint;
  /**
   * Number of instances rebooting.
   */
  rebootingInstanceCount?: bigint;
  /**
   * Number of instances that have started.
   */
  startedInstanceCount?: bigint;
  /**
   * Number of instances that have completed successfully.
   */
  succeededInstanceCount?: bigint;
  /**
   * Number of instances that require reboot.
   */
  succeededRebootRequiredInstanceCount?: bigint;
  /**
   * Number of instances that exceeded the time out while applying the patch.
   */
  timedOutInstanceCount?: bigint;
}

function serializePatchJobInstanceDetailsSummary(data: any): PatchJobInstanceDetailsSummary {
  return {
    ...data,
    ackedInstanceCount: data["ackedInstanceCount"] !== undefined ? String(data["ackedInstanceCount"]) : undefined,
    applyingPatchesInstanceCount: data["applyingPatchesInstanceCount"] !== undefined ? String(data["applyingPatchesInstanceCount"]) : undefined,
    downloadingPatchesInstanceCount: data["downloadingPatchesInstanceCount"] !== undefined ? String(data["downloadingPatchesInstanceCount"]) : undefined,
    failedInstanceCount: data["failedInstanceCount"] !== undefined ? String(data["failedInstanceCount"]) : undefined,
    inactiveInstanceCount: data["inactiveInstanceCount"] !== undefined ? String(data["inactiveInstanceCount"]) : undefined,
    noAgentDetectedInstanceCount: data["noAgentDetectedInstanceCount"] !== undefined ? String(data["noAgentDetectedInstanceCount"]) : undefined,
    notifiedInstanceCount: data["notifiedInstanceCount"] !== undefined ? String(data["notifiedInstanceCount"]) : undefined,
    pendingInstanceCount: data["pendingInstanceCount"] !== undefined ? String(data["pendingInstanceCount"]) : undefined,
    postPatchStepInstanceCount: data["postPatchStepInstanceCount"] !== undefined ? String(data["postPatchStepInstanceCount"]) : undefined,
    prePatchStepInstanceCount: data["prePatchStepInstanceCount"] !== undefined ? String(data["prePatchStepInstanceCount"]) : undefined,
    rebootingInstanceCount: data["rebootingInstanceCount"] !== undefined ? String(data["rebootingInstanceCount"]) : undefined,
    startedInstanceCount: data["startedInstanceCount"] !== undefined ? String(data["startedInstanceCount"]) : undefined,
    succeededInstanceCount: data["succeededInstanceCount"] !== undefined ? String(data["succeededInstanceCount"]) : undefined,
    succeededRebootRequiredInstanceCount: data["succeededRebootRequiredInstanceCount"] !== undefined ? String(data["succeededRebootRequiredInstanceCount"]) : undefined,
    timedOutInstanceCount: data["timedOutInstanceCount"] !== undefined ? String(data["timedOutInstanceCount"]) : undefined,
  };
}

function deserializePatchJobInstanceDetailsSummary(data: any): PatchJobInstanceDetailsSummary {
  return {
    ...data,
    ackedInstanceCount: data["ackedInstanceCount"] !== undefined ? BigInt(data["ackedInstanceCount"]) : undefined,
    applyingPatchesInstanceCount: data["applyingPatchesInstanceCount"] !== undefined ? BigInt(data["applyingPatchesInstanceCount"]) : undefined,
    downloadingPatchesInstanceCount: data["downloadingPatchesInstanceCount"] !== undefined ? BigInt(data["downloadingPatchesInstanceCount"]) : undefined,
    failedInstanceCount: data["failedInstanceCount"] !== undefined ? BigInt(data["failedInstanceCount"]) : undefined,
    inactiveInstanceCount: data["inactiveInstanceCount"] !== undefined ? BigInt(data["inactiveInstanceCount"]) : undefined,
    noAgentDetectedInstanceCount: data["noAgentDetectedInstanceCount"] !== undefined ? BigInt(data["noAgentDetectedInstanceCount"]) : undefined,
    notifiedInstanceCount: data["notifiedInstanceCount"] !== undefined ? BigInt(data["notifiedInstanceCount"]) : undefined,
    pendingInstanceCount: data["pendingInstanceCount"] !== undefined ? BigInt(data["pendingInstanceCount"]) : undefined,
    postPatchStepInstanceCount: data["postPatchStepInstanceCount"] !== undefined ? BigInt(data["postPatchStepInstanceCount"]) : undefined,
    prePatchStepInstanceCount: data["prePatchStepInstanceCount"] !== undefined ? BigInt(data["prePatchStepInstanceCount"]) : undefined,
    rebootingInstanceCount: data["rebootingInstanceCount"] !== undefined ? BigInt(data["rebootingInstanceCount"]) : undefined,
    startedInstanceCount: data["startedInstanceCount"] !== undefined ? BigInt(data["startedInstanceCount"]) : undefined,
    succeededInstanceCount: data["succeededInstanceCount"] !== undefined ? BigInt(data["succeededInstanceCount"]) : undefined,
    succeededRebootRequiredInstanceCount: data["succeededRebootRequiredInstanceCount"] !== undefined ? BigInt(data["succeededRebootRequiredInstanceCount"]) : undefined,
    timedOutInstanceCount: data["timedOutInstanceCount"] !== undefined ? BigInt(data["timedOutInstanceCount"]) : undefined,
  };
}

/**
 * Patch rollout configuration specifications. Contains details on the
 * concurrency control when applying patch(es) to all targeted VMs.
 */
export interface PatchRollout {
  /**
   * The maximum number (or percentage) of VMs per zone to disrupt at any given
   * moment. The number of VMs calculated from multiplying the percentage by the
   * total number of VMs in a zone is rounded up. During patching, a VM is
   * considered disrupted from the time the agent is notified to begin until
   * patching has completed. This disruption time includes the time to complete
   * reboot and any post-patch steps. A VM contributes to the disruption budget
   * if its patching operation fails either when applying the patches, running
   * pre or post patch steps, or if it fails to respond with a success
   * notification before timing out. VMs that are not running or do not have an
   * active agent do not count toward this disruption budget. For zone-by-zone
   * rollouts, if the disruption budget in a zone is exceeded, the patch job
   * stops, because continuing to the next zone requires completion of the patch
   * process in the previous zone. For example, if the disruption budget has a
   * fixed value of `10`, and 8 VMs fail to patch in the current zone, the patch
   * job continues to patch 2 VMs at a time until the zone is completed. When
   * that zone is completed successfully, patching begins with 10 VMs at a time
   * in the next zone. If 10 VMs in the next zone fail to patch, the patch job
   * stops.
   */
  disruptionBudget?: FixedOrPercent;
  /**
   * Mode of the patch rollout.
   */
  mode?:  | "MODE_UNSPECIFIED" | "ZONE_BY_ZONE" | "CONCURRENT_ZONES";
}

/**
 * A request message for pausing a patch deployment.
 */
export interface PausePatchDeploymentRequest {
}

/**
 * Additional options for OSConfig#projectsLocationsInstancesInventoriesGet.
 */
export interface ProjectsLocationsInstancesInventoriesGetOptions {
  /**
   * Inventory view indicating what information should be included in the
   * inventory resource. If unspecified, the default view is BASIC.
   */
  view?:  | "INVENTORY_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for OSConfig#projectsLocationsInstancesInventoriesList.
 */
export interface ProjectsLocationsInstancesInventoriesListOptions {
  /**
   * If provided, this field specifies the criteria that must be met by a
   * `Inventory` API resource to be included in the response.
   */
  filter?: string;
  /**
   * The maximum number of results to return.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to `ListInventories` that
   * indicates where this listing should continue from.
   */
  pageToken?: string;
  /**
   * Inventory view indicating what information should be included in the
   * inventory resource. If unspecified, the default view is BASIC.
   */
  view?:  | "INVENTORY_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for
 * OSConfig#projectsLocationsInstancesOsPolicyAssignmentsReportsList.
 */
export interface ProjectsLocationsInstancesOsPolicyAssignmentsReportsListOptions {
  /**
   * If provided, this field specifies the criteria that must be met by the
   * `OSPolicyAssignmentReport` API resource that is included in the response.
   */
  filter?: string;
  /**
   * The maximum number of results to return.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to the
   * `ListOSPolicyAssignmentReports` method that indicates where this listing
   * should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * OSConfig#projectsLocationsInstancesVulnerabilityReportsList.
 */
export interface ProjectsLocationsInstancesVulnerabilityReportsListOptions {
  /**
   * This field supports filtering by the severity level for the vulnerability.
   * For a list of severity levels, see [Severity levels for
   * vulnerabilities](https://cloud.google.com/container-analysis/docs/container-scanning-overview#severity_levels_for_vulnerabilities).
   * The filter field follows the rules described in the
   * [AIP-160](https://google.aip.dev/160) guidelines as follows: + **Filter for
   * a specific severity type**: you can list reports that contain
   * vulnerabilities that are classified as medium by specifying
   * `vulnerabilities.details.severity:MEDIUM`. + **Filter for a range of
   * severities** : you can list reports that have vulnerabilities that are
   * classified as critical or high by specifying
   * `vulnerabilities.details.severity:HIGH OR
   * vulnerabilities.details.severity:CRITICAL`
   */
  filter?: string;
  /**
   * The maximum number of results to return.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to
   * `ListVulnerabilityReports` that indicates where this listing should
   * continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for OSConfig#projectsLocationsOsPolicyAssignmentsCreate.
 */
export interface ProjectsLocationsOsPolicyAssignmentsCreateOptions {
  /**
   * Required. The logical name of the OS policy assignment in the project with
   * the following restrictions: * Must contain only lowercase letters, numbers,
   * and hyphens. * Must start with a letter. * Must be between 1-63 characters.
   * * Must end with a number or a letter. * Must be unique within the project.
   */
  osPolicyAssignmentId?: string;
}

/**
 * Additional options for OSConfig#projectsLocationsOsPolicyAssignmentsList.
 */
export interface ProjectsLocationsOsPolicyAssignmentsListOptions {
  /**
   * The maximum number of assignments to return.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to
   * `ListOSPolicyAssignments` that indicates where this listing should continue
   * from.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * OSConfig#projectsLocationsOsPolicyAssignmentsListRevisions.
 */
export interface ProjectsLocationsOsPolicyAssignmentsListRevisionsOptions {
  /**
   * The maximum number of revisions to return.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call to
   * `ListOSPolicyAssignmentRevisions` that indicates where this listing should
   * continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for OSConfig#projectsLocationsOsPolicyAssignmentsPatch.
 */
export interface ProjectsLocationsOsPolicyAssignmentsPatchOptions {
  /**
   * Optional. Field mask that controls which fields of the assignment should
   * be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsOsPolicyAssignmentsPatchOptions(data: any): ProjectsLocationsOsPolicyAssignmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsOsPolicyAssignmentsPatchOptions(data: any): ProjectsLocationsOsPolicyAssignmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for OSConfig#projectsPatchDeploymentsCreate.
 */
export interface ProjectsPatchDeploymentsCreateOptions {
  /**
   * Required. A name for the patch deployment in the project. When creating a
   * name the following rules apply: * Must contain only lowercase letters,
   * numbers, and hyphens. * Must start with a letter. * Must be between 1-63
   * characters. * Must end with a number or a letter. * Must be unique within
   * the project.
   */
  patchDeploymentId?: string;
}

/**
 * Additional options for OSConfig#projectsPatchDeploymentsList.
 */
export interface ProjectsPatchDeploymentsListOptions {
  /**
   * Optional. The maximum number of patch deployments to return. Default is
   * 100.
   */
  pageSize?: number;
  /**
   * Optional. A pagination token returned from a previous call to
   * ListPatchDeployments that indicates where this listing should continue
   * from.
   */
  pageToken?: string;
}

/**
 * Additional options for OSConfig#projectsPatchDeploymentsPatch.
 */
export interface ProjectsPatchDeploymentsPatchOptions {
  /**
   * Optional. Field mask that controls which fields of the patch deployment
   * should be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsPatchDeploymentsPatchOptions(data: any): ProjectsPatchDeploymentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsPatchDeploymentsPatchOptions(data: any): ProjectsPatchDeploymentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for OSConfig#projectsPatchJobsInstanceDetailsList.
 */
export interface ProjectsPatchJobsInstanceDetailsListOptions {
  /**
   * A filter expression that filters results listed in the response. This
   * field supports filtering results by instance zone, name, state, or
   * `failure_reason`.
   */
  filter?: string;
  /**
   * The maximum number of instance details records to return. Default is 100.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call that indicates where this
   * listing should continue from.
   */
  pageToken?: string;
}

/**
 * Additional options for OSConfig#projectsPatchJobsList.
 */
export interface ProjectsPatchJobsListOptions {
  /**
   * If provided, this field specifies the criteria that must be met by patch
   * jobs to be included in the response. Currently, filtering is only available
   * on the patch_deployment field.
   */
  filter?: string;
  /**
   * The maximum number of instance status to return.
   */
  pageSize?: number;
  /**
   * A pagination token returned from a previous call that indicates where this
   * listing should continue from.
   */
  pageToken?: string;
}

/**
 * Sets the time for recurring patch deployments.
 */
export interface RecurringSchedule {
  /**
   * Optional. The end time at which a recurring patch deployment schedule is
   * no longer active.
   */
  endTime?: Date;
  /**
   * Required. The frequency unit of this recurring schedule.
   */
  frequency?:  | "FREQUENCY_UNSPECIFIED" | "WEEKLY" | "MONTHLY" | "DAILY";
  /**
   * Output only. The time the last patch job ran successfully.
   */
  readonly lastExecuteTime?: Date;
  /**
   * Required. Schedule with monthly executions.
   */
  monthly?: MonthlySchedule;
  /**
   * Output only. The time the next patch job is scheduled to run.
   */
  readonly nextExecuteTime?: Date;
  /**
   * Optional. The time that the recurring schedule becomes effective. Defaults
   * to `create_time` of the patch deployment.
   */
  startTime?: Date;
  /**
   * Required. Time of the day to run a recurring deployment.
   */
  timeOfDay?: TimeOfDay;
  /**
   * Required. Defines the time zone that `time_of_day` is relative to. The
   * rules for daylight saving time are determined by the chosen time zone.
   */
  timeZone?: TimeZone;
  /**
   * Required. Schedule with weekly executions.
   */
  weekly?: WeeklySchedule;
}

function serializeRecurringSchedule(data: any): RecurringSchedule {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeRecurringSchedule(data: any): RecurringSchedule {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    lastExecuteTime: data["lastExecuteTime"] !== undefined ? new Date(data["lastExecuteTime"]) : undefined,
    nextExecuteTime: data["nextExecuteTime"] !== undefined ? new Date(data["nextExecuteTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * A request message for resuming a patch deployment.
 */
export interface ResumePatchDeploymentRequest {
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
 * Represents a time of day. The date and time zone are either not significant
 * or are specified elsewhere. An API may choose to allow leap seconds. Related
 * types are google.type.Date and `google.protobuf.Timestamp`.
 */
export interface TimeOfDay {
  /**
   * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose
   * to allow the value "24:00:00" for scenarios like business closing time.
   */
  hours?: number;
  /**
   * Minutes of hour of day. Must be from 0 to 59.
   */
  minutes?: number;
  /**
   * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
   */
  nanos?: number;
  /**
   * Seconds of minutes of the time. Must normally be from 0 to 59. An API may
   * allow the value 60 if it allows leap-seconds.
   */
  seconds?: number;
}

/**
 * Represents a time zone from the [IANA Time Zone
 * Database](https://www.iana.org/time-zones).
 */
export interface TimeZone {
  /**
   * IANA Time Zone Database time zone, e.g. "America/New_York".
   */
  id?: string;
  /**
   * Optional. IANA Time Zone Database version number, e.g. "2019a".
   */
  version?: string;
}

/**
 * This API resource represents the vulnerability report for a specified
 * Compute Engine virtual machine (VM) instance at a given point in time. For
 * more information, see [Vulnerability
 * reports](https://cloud.google.com/compute/docs/instances/os-inventory-management#vulnerability-reports).
 */
export interface VulnerabilityReport {
  /**
   * Output only. The `vulnerabilityReport` API resource name. Format:
   * `projects/{project_number}/locations/{location}/instances/{instance_id}/vulnerabilityReport`
   */
  readonly name?: string;
  /**
   * Output only. The timestamp for when the last vulnerability report was
   * generated for the VM.
   */
  readonly updateTime?: Date;
  /**
   * Output only. List of vulnerabilities affecting the VM.
   */
  readonly vulnerabilities?: VulnerabilityReportVulnerability[];
}

/**
 * A vulnerability affecting the VM instance.
 */
export interface VulnerabilityReportVulnerability {
  /**
   * Corresponds to the `AVAILABLE_PACKAGE` inventory item on the VM. If the
   * vulnerability report was not updated after the VM inventory update, these
   * values might not display in VM inventory. If there is no available fix, the
   * field is empty. The `inventory_item` value specifies the latest
   * `SoftwarePackage` available to the VM that fixes the vulnerability.
   */
  availableInventoryItemIds?: string[];
  /**
   * The timestamp for when the vulnerability was first detected.
   */
  createTime?: Date;
  /**
   * Contains metadata as per the upstream feed of the operating system and
   * NVD.
   */
  details?: VulnerabilityReportVulnerabilityDetails;
  /**
   * Corresponds to the `INSTALLED_PACKAGE` inventory item on the VM. This
   * field displays the inventory items affected by this vulnerability. If the
   * vulnerability report was not updated after the VM inventory update, these
   * values might not display in VM inventory. For some distros, this field may
   * be empty.
   */
  installedInventoryItemIds?: string[];
  /**
   * List of items affected by the vulnerability.
   */
  items?: VulnerabilityReportVulnerabilityItem[];
  /**
   * The timestamp for when the vulnerability was last modified.
   */
  updateTime?: Date;
}

function serializeVulnerabilityReportVulnerability(data: any): VulnerabilityReportVulnerability {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeVulnerabilityReportVulnerability(data: any): VulnerabilityReportVulnerability {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Contains metadata information for the vulnerability. This information is
 * collected from the upstream feed of the operating system.
 */
export interface VulnerabilityReportVulnerabilityDetails {
  /**
   * The CVE of the vulnerability. CVE cannot be empty and the combination of
   * should be unique across vulnerabilities for a VM.
   */
  cve?: string;
  /**
   * The CVSS V2 score of this vulnerability. CVSS V2 score is on a scale of 0
   * - 10 where 0 indicates low severity and 10 indicates high severity.
   */
  cvssV2Score?: number;
  /**
   * The full description of the CVSSv3 for this vulnerability from NVD.
   */
  cvssV3?: CVSSv3;
  /**
   * The note or description describing the vulnerability from the distro.
   */
  description?: string;
  /**
   * Corresponds to the references attached to the `VulnerabilityDetails`.
   */
  references?: VulnerabilityReportVulnerabilityDetailsReference[];
  /**
   * Assigned severity/impact ranking from the distro.
   */
  severity?: string;
}

/**
 * A reference for this vulnerability.
 */
export interface VulnerabilityReportVulnerabilityDetailsReference {
  /**
   * The source of the reference e.g. NVD.
   */
  source?: string;
  /**
   * The url of the reference.
   */
  url?: string;
}

/**
 * OS inventory item that is affected by a vulnerability or fixed as a result
 * of a vulnerability.
 */
export interface VulnerabilityReportVulnerabilityItem {
  /**
   * Corresponds to the `AVAILABLE_PACKAGE` inventory item on the VM. If the
   * vulnerability report was not updated after the VM inventory update, these
   * values might not display in VM inventory. If there is no available fix, the
   * field is empty. The `inventory_item` value specifies the latest
   * `SoftwarePackage` available to the VM that fixes the vulnerability.
   */
  availableInventoryItemId?: string;
  /**
   * The recommended [CPE URI](https://cpe.mitre.org/specification/) update
   * that contains a fix for this vulnerability.
   */
  fixedCpeUri?: string;
  /**
   * Corresponds to the `INSTALLED_PACKAGE` inventory item on the VM. This
   * field displays the inventory items affected by this vulnerability. If the
   * vulnerability report was not updated after the VM inventory update, these
   * values might not display in VM inventory. For some operating systems, this
   * field might be empty.
   */
  installedInventoryItemId?: string;
  /**
   * The upstream OS patch, packages or KB that fixes the vulnerability.
   */
  upstreamFix?: string;
}

/**
 * Represents one week day in a month. An example is "the 4th Sunday".
 */
export interface WeekDayOfMonth {
  /**
   * Optional. Represents the number of days before or after the given week day
   * of month that the patch deployment is scheduled for. For example if
   * `week_ordinal` and `day_of_week` values point to the second day of the
   * month and this `day_offset` value is set to `3`, the patch deployment takes
   * place three days after the second Tuesday of the month. If this value is
   * negative, for example -5, the patches are deployed five days before before
   * the second Tuesday of the month. Allowed values are in range [-30, 30].
   */
  dayOffset?: number;
  /**
   * Required. A day of the week.
   */
  dayOfWeek?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Required. Week number in a month. 1-4 indicates the 1st to 4th week of the
   * month. -1 indicates the last week of the month.
   */
  weekOrdinal?: number;
}

/**
 * Represents a weekly schedule.
 */
export interface WeeklySchedule {
  /**
   * Required. Day of the week.
   */
  dayOfWeek?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
}

/**
 * Windows patching is performed using the Windows Update Agent.
 */
export interface WindowsUpdateSettings {
  /**
   * Only apply updates of these windows update classifications. If empty, all
   * updates are applied.
   */
  classifications?:  | "CLASSIFICATION_UNSPECIFIED" | "CRITICAL" | "SECURITY" | "DEFINITION" | "DRIVER" | "FEATURE_PACK" | "SERVICE_PACK" | "TOOL" | "UPDATE_ROLLUP" | "UPDATE"[];
  /**
   * List of KBs to exclude from update.
   */
  excludes?: string[];
  /**
   * An exclusive list of kbs to be updated. These are the only patches that
   * will be updated. This field must not be used with other patch
   * configurations.
   */
  exclusivePatches?: string[];
}

/**
 * Yum patching is performed by executing `yum update`. Additional options can
 * be set to control how this is executed. Note that not all settings are
 * supported on all platforms.
 */
export interface YumSettings {
  /**
   * List of packages to exclude from update. These packages are excluded by
   * using the yum `--exclude` flag.
   */
  excludes?: string[];
  /**
   * An exclusive list of packages to be updated. These are the only packages
   * that will be updated. If these packages are not installed, they will be
   * ignored. This field must not be specified with any other patch
   * configuration fields.
   */
  exclusivePackages?: string[];
  /**
   * Will cause patch to run `yum update-minimal` instead.
   */
  minimal?: boolean;
  /**
   * Adds the `--security` flag to `yum update`. Not supported on all
   * platforms.
   */
  security?: boolean;
}

/**
 * Zypper patching is performed by running `zypper patch`. See also
 * https://en.opensuse.org/SDB:Zypper_manual.
 */
export interface ZypperSettings {
  /**
   * Install only patches with these categories. Common categories include
   * security, recommended, and feature.
   */
  categories?: string[];
  /**
   * List of patches to exclude from update.
   */
  excludes?: string[];
  /**
   * An exclusive list of patches to be updated. These are the only patches
   * that will be installed using 'zypper patch patch:' command. This field must
   * not be used with any other patch configuration fields.
   */
  exclusivePatches?: string[];
  /**
   * Install only patches with these severities. Common severities include
   * critical, important, moderate, and low.
   */
  severities?: string[];
  /**
   * Adds the `--with-optional` flag to `zypper patch`.
   */
  withOptional?: boolean;
  /**
   * Adds the `--with-update` flag, to `zypper patch`.
   */
  withUpdate?: boolean;
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
