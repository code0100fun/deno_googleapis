// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Talent Solution API Client for Deno
 * =========================================
 * 
 * Cloud Talent Solution provides the capability to create, read, update, and delete job postings, as well as search jobs based on keywords and filters. 
 * 
 * Docs: https://cloud.google.com/talent-solution/job-search/docs/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Cloud Talent Solution provides the capability to create, read, update, and
 * delete job postings, as well as search jobs based on keywords and filters.
 */
export class jobs {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://jobs.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v4/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Report events issued when end user interacts with customer's application
   * that uses Cloud Talent Solution. You may inspect the created events in
   * [self service
   * tools](https://console.cloud.google.com/talent-solution/overview). [Learn
   * more](https://cloud.google.com/talent-solution/docs/management-tools) about
   * self service tools.
   *
   * @param parent Required. Resource name of the tenant under which the event is created. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar".
   */
  async projectsTenantsClientEventsCreate(parent: string, req: ClientEvent): Promise<ClientEvent> {
    req = serializeClientEvent(req);
    const url = new URL(`${this.#baseUrl}v4/${ parent }/clientEvents`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeClientEvent(data);
  }

  /**
   * Creates a new company entity.
   *
   * @param parent Required. Resource name of the tenant under which the company is created. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar".
   */
  async projectsTenantsCompaniesCreate(parent: string, req: Company): Promise<Company> {
    const url = new URL(`${this.#baseUrl}v4/${ parent }/companies`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Company;
  }

  /**
   * Deletes specified company. Prerequisite: The company has no jobs
   * associated with it.
   *
   * @param name Required. The resource name of the company to be deleted. The format is "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}", for example, "projects/foo/tenants/bar/companies/baz".
   */
  async projectsTenantsCompaniesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v4/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Retrieves specified company.
   *
   * @param name Required. The resource name of the company to be retrieved. The format is "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}", for example, "projects/api-test-project/tenants/foo/companies/bar".
   */
  async projectsTenantsCompaniesGet(name: string): Promise<Company> {
    const url = new URL(`${this.#baseUrl}v4/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Company;
  }

  /**
   * Lists all companies associated with the project.
   *
   * @param parent Required. Resource name of the tenant under which the company is created. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar".
   */
  async projectsTenantsCompaniesList(parent: string, opts: ProjectsTenantsCompaniesListOptions = {}): Promise<ListCompaniesResponse> {
    const url = new URL(`${this.#baseUrl}v4/${ parent }/companies`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.requireOpenJobs !== undefined) {
      url.searchParams.append("requireOpenJobs", String(opts.requireOpenJobs));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListCompaniesResponse;
  }

  /**
   * Updates specified company.
   *
   * @param name Required during company update. The resource name for a company. This is generated by the service when a company is created. The format is "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}", for example, "projects/foo/tenants/bar/companies/baz".
   */
  async projectsTenantsCompaniesPatch(name: string, req: Company, opts: ProjectsTenantsCompaniesPatchOptions = {}): Promise<Company> {
    opts = serializeProjectsTenantsCompaniesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v4/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Company;
  }

  /**
   * Completes the specified prefix with keyword suggestions. Intended for use
   * by a job search auto-complete search box.
   *
   * @param tenant Required. Resource name of tenant the completion is performed within. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar".
   */
  async projectsTenantsCompleteQuery(tenant: string, opts: ProjectsTenantsCompleteQueryOptions = {}): Promise<CompleteQueryResponse> {
    const url = new URL(`${this.#baseUrl}v4/${ tenant }:completeQuery`);
    if (opts.company !== undefined) {
      url.searchParams.append("company", String(opts.company));
    }
    if (opts.languageCodes !== undefined) {
      url.searchParams.append("languageCodes", String(opts.languageCodes));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    if (opts.scope !== undefined) {
      url.searchParams.append("scope", String(opts.scope));
    }
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CompleteQueryResponse;
  }

  /**
   * Creates a new tenant entity.
   *
   * @param parent Required. Resource name of the project under which the tenant is created. The format is "projects/{project_id}", for example, "projects/foo".
   */
  async projectsTenantsCreate(parent: string, req: Tenant): Promise<Tenant> {
    const url = new URL(`${this.#baseUrl}v4/${ parent }/tenants`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Tenant;
  }

  /**
   * Deletes specified tenant.
   *
   * @param name Required. The resource name of the tenant to be deleted. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar".
   */
  async projectsTenantsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v4/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Retrieves specified tenant.
   *
   * @param name Required. The resource name of the tenant to be retrieved. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar".
   */
  async projectsTenantsGet(name: string): Promise<Tenant> {
    const url = new URL(`${this.#baseUrl}v4/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Tenant;
  }

  /**
   * Begins executing a batch create jobs operation.
   *
   * @param parent Required. The resource name of the tenant under which the job is created. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar".
   */
  async projectsTenantsJobsBatchCreate(parent: string, req: BatchCreateJobsRequest): Promise<Operation> {
    req = serializeBatchCreateJobsRequest(req);
    const url = new URL(`${this.#baseUrl}v4/${ parent }/jobs:batchCreate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Begins executing a batch delete jobs operation.
   *
   * @param parent Required. The resource name of the tenant under which the job is created. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar". The parent of all of the jobs specified in `names` must match this field.
   */
  async projectsTenantsJobsBatchDelete(parent: string, req: BatchDeleteJobsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v4/${ parent }/jobs:batchDelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Begins executing a batch update jobs operation.
   *
   * @param parent Required. The resource name of the tenant under which the job is created. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar".
   */
  async projectsTenantsJobsBatchUpdate(parent: string, req: BatchUpdateJobsRequest): Promise<Operation> {
    req = serializeBatchUpdateJobsRequest(req);
    const url = new URL(`${this.#baseUrl}v4/${ parent }/jobs:batchUpdate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a new job. Typically, the job becomes searchable within 10
   * seconds, but it may take up to 5 minutes.
   *
   * @param parent Required. The resource name of the tenant under which the job is created. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar".
   */
  async projectsTenantsJobsCreate(parent: string, req: Job): Promise<Job> {
    req = serializeJob(req);
    const url = new URL(`${this.#baseUrl}v4/${ parent }/jobs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeJob(data);
  }

  /**
   * Deletes the specified job. Typically, the job becomes unsearchable within
   * 10 seconds, but it may take up to 5 minutes.
   *
   * @param name Required. The resource name of the job to be deleted. The format is "projects/{project_id}/tenants/{tenant_id}/jobs/{job_id}". For example, "projects/foo/tenants/bar/jobs/baz".
   */
  async projectsTenantsJobsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v4/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Retrieves the specified job, whose status is OPEN or recently EXPIRED
   * within the last 90 days.
   *
   * @param name Required. The resource name of the job to retrieve. The format is "projects/{project_id}/tenants/{tenant_id}/jobs/{job_id}". For example, "projects/foo/tenants/bar/jobs/baz".
   */
  async projectsTenantsJobsGet(name: string): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v4/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeJob(data);
  }

  /**
   * Lists jobs by filter.
   *
   * @param parent Required. The resource name of the tenant under which the job is created. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar".
   */
  async projectsTenantsJobsList(parent: string, opts: ProjectsTenantsJobsListOptions = {}): Promise<ListJobsResponse> {
    const url = new URL(`${this.#baseUrl}v4/${ parent }/jobs`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.jobView !== undefined) {
      url.searchParams.append("jobView", String(opts.jobView));
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
    return deserializeListJobsResponse(data);
  }

  /**
   * Updates specified job. Typically, updated contents become visible in
   * search results within 10 seconds, but it may take up to 5 minutes.
   *
   * @param name Required during job update. The resource name for the job. This is generated by the service when a job is created. The format is "projects/{project_id}/tenants/{tenant_id}/jobs/{job_id}". For example, "projects/foo/tenants/bar/jobs/baz". Use of this field in job queries and API calls is preferred over the use of requisition_id since this value is unique.
   */
  async projectsTenantsJobsPatch(name: string, req: Job, opts: ProjectsTenantsJobsPatchOptions = {}): Promise<Job> {
    req = serializeJob(req);
    opts = serializeProjectsTenantsJobsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v4/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeJob(data);
  }

  /**
   * Searches for jobs using the provided SearchJobsRequest. This call
   * constrains the visibility of jobs present in the database, and only returns
   * jobs that the caller has permission to search against.
   *
   * @param parent Required. The resource name of the tenant to search within. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar".
   */
  async projectsTenantsJobsSearch(parent: string, req: SearchJobsRequest): Promise<SearchJobsResponse> {
    req = serializeSearchJobsRequest(req);
    const url = new URL(`${this.#baseUrl}v4/${ parent }/jobs:search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSearchJobsResponse(data);
  }

  /**
   * Searches for jobs using the provided SearchJobsRequest. This API call is
   * intended for the use case of targeting passive job seekers (for example,
   * job seekers who have signed up to receive email alerts about potential job
   * opportunities), it has different algorithmic adjustments that are designed
   * to specifically target passive job seekers. This call constrains the
   * visibility of jobs present in the database, and only returns jobs the
   * caller has permission to search against.
   *
   * @param parent Required. The resource name of the tenant to search within. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar".
   */
  async projectsTenantsJobsSearchForAlert(parent: string, req: SearchJobsRequest): Promise<SearchJobsResponse> {
    req = serializeSearchJobsRequest(req);
    const url = new URL(`${this.#baseUrl}v4/${ parent }/jobs:searchForAlert`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSearchJobsResponse(data);
  }

  /**
   * Lists all tenants associated with the project.
   *
   * @param parent Required. Resource name of the project under which the tenant is created. The format is "projects/{project_id}", for example, "projects/foo".
   */
  async projectsTenantsList(parent: string, opts: ProjectsTenantsListOptions = {}): Promise<ListTenantsResponse> {
    const url = new URL(`${this.#baseUrl}v4/${ parent }/tenants`);
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
    return data as ListTenantsResponse;
  }

  /**
   * Updates specified tenant.
   *
   * @param name Required during tenant update. The resource name for a tenant. This is generated by the service when a tenant is created. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar".
   */
  async projectsTenantsPatch(name: string, req: Tenant, opts: ProjectsTenantsPatchOptions = {}): Promise<Tenant> {
    opts = serializeProjectsTenantsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v4/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Tenant;
  }
}

/**
 * Application related details of a job posting.
 */
export interface ApplicationInfo {
  /**
   * Use this field to specify email address(es) to which resumes or
   * applications can be sent. The maximum number of allowed characters for each
   * entry is 255.
   */
  emails?: string[];
  /**
   * Use this field to provide instructions, such as "Mail your application to
   * ...", that a candidate can follow to apply for the job. This field accepts
   * and sanitizes HTML input, and also accepts bold, italic, ordered list, and
   * unordered list markup tags. The maximum number of allowed characters is
   * 3,000.
   */
  instruction?: string;
  /**
   * Use this URI field to direct an applicant to a website, for example to
   * link to an online application form. The maximum number of allowed
   * characters for each entry is 2,000.
   */
  uris?: string[];
}

/**
 * Request to create a batch of jobs.
 */
export interface BatchCreateJobsRequest {
  /**
   * Required. The jobs to be created. A maximum of 200 jobs can be created in
   * a batch.
   */
  jobs?: Job[];
}

function serializeBatchCreateJobsRequest(data: any): BatchCreateJobsRequest {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (serializeJob(item))) : undefined,
  };
}

function deserializeBatchCreateJobsRequest(data: any): BatchCreateJobsRequest {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (deserializeJob(item))) : undefined,
  };
}

/**
 * The result of JobService.BatchCreateJobs. It's used to replace
 * google.longrunning.Operation.response in case of success.
 */
export interface BatchCreateJobsResponse {
  /**
   * List of job mutation results from a batch create operation. It can change
   * until operation status is FINISHED, FAILED or CANCELLED.
   */
  jobResults?: JobResult[];
}

function serializeBatchCreateJobsResponse(data: any): BatchCreateJobsResponse {
  return {
    ...data,
    jobResults: data["jobResults"] !== undefined ? data["jobResults"].map((item: any) => (serializeJobResult(item))) : undefined,
  };
}

function deserializeBatchCreateJobsResponse(data: any): BatchCreateJobsResponse {
  return {
    ...data,
    jobResults: data["jobResults"] !== undefined ? data["jobResults"].map((item: any) => (deserializeJobResult(item))) : undefined,
  };
}

/**
 * Request to delete a batch of jobs.
 */
export interface BatchDeleteJobsRequest {
  /**
   * The names of the jobs to delete. The format is
   * "projects/{project_id}/tenants/{tenant_id}/jobs/{job_id}". For example,
   * "projects/foo/tenants/bar/jobs/baz". A maximum of 200 jobs can be deleted
   * in a batch.
   */
  names?: string[];
}

/**
 * The result of JobService.BatchDeleteJobs. It's used to replace
 * google.longrunning.Operation.response in case of success.
 */
export interface BatchDeleteJobsResponse {
  /**
   * List of job mutation results from a batch delete operation. It can change
   * until operation status is FINISHED, FAILED or CANCELLED.
   */
  jobResults?: JobResult[];
}

function serializeBatchDeleteJobsResponse(data: any): BatchDeleteJobsResponse {
  return {
    ...data,
    jobResults: data["jobResults"] !== undefined ? data["jobResults"].map((item: any) => (serializeJobResult(item))) : undefined,
  };
}

function deserializeBatchDeleteJobsResponse(data: any): BatchDeleteJobsResponse {
  return {
    ...data,
    jobResults: data["jobResults"] !== undefined ? data["jobResults"].map((item: any) => (deserializeJobResult(item))) : undefined,
  };
}

/**
 * Metadata used for long running operations returned by CTS batch APIs. It's
 * used to replace google.longrunning.Operation.metadata.
 */
export interface BatchOperationMetadata {
  /**
   * The time when the batch operation is created.
   */
  createTime?: Date;
  /**
   * The time when the batch operation is finished and
   * google.longrunning.Operation.done is set to `true`.
   */
  endTime?: Date;
  /**
   * Count of failed item(s) inside an operation.
   */
  failureCount?: number;
  /**
   * The state of a long running operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "SUCCEEDED" | "FAILED" | "CANCELLING" | "CANCELLED";
  /**
   * More detailed information about operation state.
   */
  stateDescription?: string;
  /**
   * Count of successful item(s) inside an operation.
   */
  successCount?: number;
  /**
   * Count of total item(s) inside an operation.
   */
  totalCount?: number;
  /**
   * The time when the batch operation status is updated. The metadata and the
   * update_time is refreshed every minute otherwise cached data is returned.
   */
  updateTime?: Date;
}

function serializeBatchOperationMetadata(data: any): BatchOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeBatchOperationMetadata(data: any): BatchOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Request to update a batch of jobs.
 */
export interface BatchUpdateJobsRequest {
  /**
   * Required. The jobs to be updated. A maximum of 200 jobs can be updated in
   * a batch.
   */
  jobs?: Job[];
  /**
   * Strongly recommended for the best service experience. Be aware that it
   * will also increase latency when checking the status of a batch operation.
   * If update_mask is provided, only the specified fields in Job are updated.
   * Otherwise all the fields are updated. A field mask to restrict the fields
   * that are updated. Only top level fields of Job are supported. If
   * update_mask is provided, The Job inside JobResult will only contains fields
   * that is updated, plus the Id of the Job. Otherwise, Job will include all
   * fields, which can yield a very large response.
   */
  updateMask?: string /* FieldMask */;
}

function serializeBatchUpdateJobsRequest(data: any): BatchUpdateJobsRequest {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (serializeJob(item))) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBatchUpdateJobsRequest(data: any): BatchUpdateJobsRequest {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (deserializeJob(item))) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * The result of JobService.BatchUpdateJobs. It's used to replace
 * google.longrunning.Operation.response in case of success.
 */
export interface BatchUpdateJobsResponse {
  /**
   * List of job mutation results from a batch update operation. It can change
   * until operation status is FINISHED, FAILED or CANCELLED.
   */
  jobResults?: JobResult[];
}

function serializeBatchUpdateJobsResponse(data: any): BatchUpdateJobsResponse {
  return {
    ...data,
    jobResults: data["jobResults"] !== undefined ? data["jobResults"].map((item: any) => (serializeJobResult(item))) : undefined,
  };
}

function deserializeBatchUpdateJobsResponse(data: any): BatchUpdateJobsResponse {
  return {
    ...data,
    jobResults: data["jobResults"] !== undefined ? data["jobResults"].map((item: any) => (deserializeJobResult(item))) : undefined,
  };
}

/**
 * An event issued when an end user interacts with the application that
 * implements Cloud Talent Solution. Providing this information improves the
 * quality of results for the API clients, enabling the service to perform
 * optimally. The number of events sent must be consistent with other calls,
 * such as job searches, issued to the service by the client.
 */
export interface ClientEvent {
  /**
   * Required. The timestamp of the event.
   */
  createTime?: Date;
  /**
   * Required. A unique identifier, generated by the client application.
   */
  eventId?: string;
  /**
   * Notes about the event provided by recruiters or other users, for example,
   * feedback on why a job was bookmarked.
   */
  eventNotes?: string;
  /**
   * An event issued when a job seeker interacts with the application that
   * implements Cloud Talent Solution.
   */
  jobEvent?: JobEvent;
  /**
   * Strongly recommended for the best service experience. A unique ID
   * generated in the API responses. It can be found in
   * ResponseMetadata.request_id.
   */
  requestId?: string;
}

function serializeClientEvent(data: any): ClientEvent {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeClientEvent(data: any): ClientEvent {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Parameters needed for commute search.
 */
export interface CommuteFilter {
  /**
   * If `true`, jobs without street level addresses may also be returned. For
   * city level addresses, the city center is used. For state and coarser level
   * addresses, text matching is used. If this field is set to `false` or isn't
   * specified, only jobs that include street level addresses will be returned
   * by commute search.
   */
  allowImpreciseAddresses?: boolean;
  /**
   * Required. The method of transportation to calculate the commute time for.
   */
  commuteMethod?:  | "COMMUTE_METHOD_UNSPECIFIED" | "DRIVING" | "TRANSIT" | "WALKING" | "CYCLING" | "TRANSIT_ACCESSIBLE";
  /**
   * The departure time used to calculate traffic impact, represented as
   * google.type.TimeOfDay in local time zone. Currently traffic model is
   * restricted to hour level resolution.
   */
  departureTime?: TimeOfDay;
  /**
   * Specifies the traffic density to use when calculating commute time.
   */
  roadTraffic?:  | "ROAD_TRAFFIC_UNSPECIFIED" | "TRAFFIC_FREE" | "BUSY_HOUR";
  /**
   * Required. The latitude and longitude of the location to calculate the
   * commute time from.
   */
  startCoordinates?: LatLng;
  /**
   * Required. The maximum travel time in seconds. The maximum allowed value is
   * `3600s` (one hour). Format is `123s`.
   */
  travelDuration?: number /* Duration */;
}

function serializeCommuteFilter(data: any): CommuteFilter {
  return {
    ...data,
    travelDuration: data["travelDuration"] !== undefined ? data["travelDuration"] : undefined,
  };
}

function deserializeCommuteFilter(data: any): CommuteFilter {
  return {
    ...data,
    travelDuration: data["travelDuration"] !== undefined ? data["travelDuration"] : undefined,
  };
}

/**
 * Commute details related to this job.
 */
export interface CommuteInfo {
  /**
   * Location used as the destination in the commute calculation.
   */
  jobLocation?: Location;
  /**
   * The number of seconds required to travel to the job location from the
   * query location. A duration of 0 seconds indicates that the job isn't
   * reachable within the requested duration, but was returned as part of an
   * expanded query.
   */
  travelDuration?: number /* Duration */;
}

function serializeCommuteInfo(data: any): CommuteInfo {
  return {
    ...data,
    travelDuration: data["travelDuration"] !== undefined ? data["travelDuration"] : undefined,
  };
}

function deserializeCommuteInfo(data: any): CommuteInfo {
  return {
    ...data,
    travelDuration: data["travelDuration"] !== undefined ? data["travelDuration"] : undefined,
  };
}

/**
 * A Company resource represents a company in the service. A company is the
 * entity that owns job postings, that is, the hiring entity responsible for
 * employing applicants for the job position.
 */
export interface Company {
  /**
   * The URI to employer's career site or careers page on the employer's web
   * site, for example, "https://careers.google.com".
   */
  careerSiteUri?: string;
  /**
   * Output only. Derived details about the company.
   */
  readonly derivedInfo?: CompanyDerivedInfo;
  /**
   * Required. The display name of the company, for example, "Google LLC".
   */
  displayName?: string;
  /**
   * Equal Employment Opportunity legal disclaimer text to be associated with
   * all jobs, and typically to be displayed in all roles. The maximum number of
   * allowed characters is 500.
   */
  eeoText?: string;
  /**
   * Required. Client side company identifier, used to uniquely identify the
   * company. The maximum number of allowed characters is 255.
   */
  externalId?: string;
  /**
   * The street address of the company's main headquarters, which may be
   * different from the job location. The service attempts to geolocate the
   * provided address, and populates a more specific location wherever possible
   * in DerivedInfo.headquarters_location.
   */
  headquartersAddress?: string;
  /**
   * Set to true if it is the hiring agency that post jobs for other employers.
   * Defaults to false if not provided.
   */
  hiringAgency?: boolean;
  /**
   * A URI that hosts the employer's company logo.
   */
  imageUri?: string;
  /**
   * This field is deprecated. Please set the searchability of the custom
   * attribute in the Job.custom_attributes going forward. A list of keys of
   * filterable Job.custom_attributes, whose corresponding `string_values` are
   * used in keyword searches. Jobs with `string_values` under these specified
   * field keys are returned if any of the values match the search keyword.
   * Custom field values with parenthesis, brackets and special symbols are not
   * searchable as-is, and those keyword queries must be surrounded by quotes.
   */
  keywordSearchableJobCustomAttributes?: string[];
  /**
   * Required during company update. The resource name for a company. This is
   * generated by the service when a company is created. The format is
   * "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}", for
   * example, "projects/foo/tenants/bar/companies/baz".
   */
  name?: string;
  /**
   * The employer's company size.
   */
  size?:  | "COMPANY_SIZE_UNSPECIFIED" | "MINI" | "SMALL" | "SMEDIUM" | "MEDIUM" | "BIG" | "BIGGER" | "GIANT";
  /**
   * Output only. Indicates whether a company is flagged to be suspended from
   * public availability by the service when job content appears suspicious,
   * abusive, or spammy.
   */
  readonly suspended?: boolean;
  /**
   * The URI representing the company's primary web site or home page, for
   * example, "https://www.google.com". The maximum number of allowed characters
   * is 255.
   */
  websiteUri?: string;
}

/**
 * Derived details about the company.
 */
export interface CompanyDerivedInfo {
  /**
   * A structured headquarters location of the company, resolved from
   * Company.headquarters_address if provided.
   */
  headquartersLocation?: Location;
}

/**
 * A compensation entry that represents one component of compensation, such as
 * base pay, bonus, or other compensation type. Annualization: One compensation
 * entry can be annualized if - it contains valid amount or range. - and its
 * expected_units_per_year is set or can be derived. Its annualized range is
 * determined as (amount or range) times expected_units_per_year.
 */
export interface CompensationEntry {
  /**
   * Compensation amount.
   */
  amount?: Money;
  /**
   * Compensation description. For example, could indicate equity terms or
   * provide additional context to an estimated bonus.
   */
  description?: string;
  /**
   * Expected number of units paid each year. If not specified, when
   * Job.employment_types is FULLTIME, a default value is inferred based on
   * unit. Default values: - HOURLY: 2080 - DAILY: 260 - WEEKLY: 52 - MONTHLY:
   * 12 - ANNUAL: 1
   */
  expectedUnitsPerYear?: number;
  /**
   * Compensation range.
   */
  range?: CompensationRange;
  /**
   * Compensation type. Default is
   * CompensationType.COMPENSATION_TYPE_UNSPECIFIED.
   */
  type?:  | "COMPENSATION_TYPE_UNSPECIFIED" | "BASE" | "BONUS" | "SIGNING_BONUS" | "EQUITY" | "PROFIT_SHARING" | "COMMISSIONS" | "TIPS" | "OTHER_COMPENSATION_TYPE";
  /**
   * Frequency of the specified amount. Default is
   * CompensationUnit.COMPENSATION_UNIT_UNSPECIFIED.
   */
  unit?:  | "COMPENSATION_UNIT_UNSPECIFIED" | "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "ONE_TIME" | "OTHER_COMPENSATION_UNIT";
}

function serializeCompensationEntry(data: any): CompensationEntry {
  return {
    ...data,
    amount: data["amount"] !== undefined ? serializeMoney(data["amount"]) : undefined,
    range: data["range"] !== undefined ? serializeCompensationRange(data["range"]) : undefined,
  };
}

function deserializeCompensationEntry(data: any): CompensationEntry {
  return {
    ...data,
    amount: data["amount"] !== undefined ? deserializeMoney(data["amount"]) : undefined,
    range: data["range"] !== undefined ? deserializeCompensationRange(data["range"]) : undefined,
  };
}

/**
 * Filter on job compensation type and amount.
 */
export interface CompensationFilter {
  /**
   * If set to true, jobs with unspecified compensation range fields are
   * included.
   */
  includeJobsWithUnspecifiedCompensationRange?: boolean;
  /**
   * Compensation range.
   */
  range?: CompensationRange;
  /**
   * Required. Type of filter.
   */
  type?:  | "FILTER_TYPE_UNSPECIFIED" | "UNIT_ONLY" | "UNIT_AND_AMOUNT" | "ANNUALIZED_BASE_AMOUNT" | "ANNUALIZED_TOTAL_AMOUNT";
  /**
   * Required. Specify desired `base compensation entry's`
   * CompensationInfo.CompensationUnit.
   */
  units?:  | "COMPENSATION_UNIT_UNSPECIFIED" | "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "ONE_TIME" | "OTHER_COMPENSATION_UNIT"[];
}

function serializeCompensationFilter(data: any): CompensationFilter {
  return {
    ...data,
    range: data["range"] !== undefined ? serializeCompensationRange(data["range"]) : undefined,
  };
}

function deserializeCompensationFilter(data: any): CompensationFilter {
  return {
    ...data,
    range: data["range"] !== undefined ? deserializeCompensationRange(data["range"]) : undefined,
  };
}

/**
 * Job compensation details.
 */
export interface CompensationInfo {
  /**
   * Output only. Annualized base compensation range. Computed as base
   * compensation entry's CompensationEntry.amount times
   * CompensationEntry.expected_units_per_year. See CompensationEntry for
   * explanation on compensation annualization.
   */
  readonly annualizedBaseCompensationRange?: CompensationRange;
  /**
   * Output only. Annualized total compensation range. Computed as all
   * compensation entries' CompensationEntry.amount times
   * CompensationEntry.expected_units_per_year. See CompensationEntry for
   * explanation on compensation annualization.
   */
  readonly annualizedTotalCompensationRange?: CompensationRange;
  /**
   * Job compensation information. At most one entry can be of type
   * CompensationInfo.CompensationType.BASE, which is referred as **base
   * compensation entry** for the job.
   */
  entries?: CompensationEntry[];
}

function serializeCompensationInfo(data: any): CompensationInfo {
  return {
    ...data,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (serializeCompensationEntry(item))) : undefined,
  };
}

function deserializeCompensationInfo(data: any): CompensationInfo {
  return {
    ...data,
    annualizedBaseCompensationRange: data["annualizedBaseCompensationRange"] !== undefined ? deserializeCompensationRange(data["annualizedBaseCompensationRange"]) : undefined,
    annualizedTotalCompensationRange: data["annualizedTotalCompensationRange"] !== undefined ? deserializeCompensationRange(data["annualizedTotalCompensationRange"]) : undefined,
    entries: data["entries"] !== undefined ? data["entries"].map((item: any) => (deserializeCompensationEntry(item))) : undefined,
  };
}

/**
 * Compensation range.
 */
export interface CompensationRange {
  /**
   * The maximum amount of compensation. If left empty, the value is set to a
   * maximal compensation value and the currency code is set to match the
   * currency code of min_compensation.
   */
  maxCompensation?: Money;
  /**
   * The minimum amount of compensation. If left empty, the value is set to
   * zero and the currency code is set to match the currency code of
   * max_compensation.
   */
  minCompensation?: Money;
}

function serializeCompensationRange(data: any): CompensationRange {
  return {
    ...data,
    maxCompensation: data["maxCompensation"] !== undefined ? serializeMoney(data["maxCompensation"]) : undefined,
    minCompensation: data["minCompensation"] !== undefined ? serializeMoney(data["minCompensation"]) : undefined,
  };
}

function deserializeCompensationRange(data: any): CompensationRange {
  return {
    ...data,
    maxCompensation: data["maxCompensation"] !== undefined ? deserializeMoney(data["maxCompensation"]) : undefined,
    minCompensation: data["minCompensation"] !== undefined ? deserializeMoney(data["minCompensation"]) : undefined,
  };
}

/**
 * Response of auto-complete query.
 */
export interface CompleteQueryResponse {
  /**
   * Results of the matching job/company candidates.
   */
  completionResults?: CompletionResult[];
  /**
   * Additional information for the API invocation, such as the request
   * tracking id.
   */
  metadata?: ResponseMetadata;
}

/**
 * Resource that represents completion results.
 */
export interface CompletionResult {
  /**
   * The URI of the company image for COMPANY_NAME.
   */
  imageUri?: string;
  /**
   * The suggestion for the query.
   */
  suggestion?: string;
  /**
   * The completion topic.
   */
  type?:  | "COMPLETION_TYPE_UNSPECIFIED" | "JOB_TITLE" | "COMPANY_NAME" | "COMBINED";
}

/**
 * Custom attribute values that are either filterable or non-filterable.
 */
export interface CustomAttribute {
  /**
   * If the `filterable` flag is true, the custom field values may be used for
   * custom attribute filters JobQuery.custom_attribute_filter. If false, these
   * values may not be used for custom attribute filters. Default is false.
   */
  filterable?: boolean;
  /**
   * If the `keyword_searchable` flag is true, the keywords in custom fields
   * are searchable by keyword match. If false, the values are not searchable by
   * keyword match. Default is false.
   */
  keywordSearchable?: boolean;
  /**
   * Exactly one of string_values or long_values must be specified. This field
   * is used to perform number range search. (`EQ`, `GT`, `GE`, `LE`, `LT`) over
   * filterable `long_value`. Currently at most 1 long_values is supported.
   */
  longValues?: bigint[];
  /**
   * Exactly one of string_values or long_values must be specified. This field
   * is used to perform a string match (`CASE_SENSITIVE_MATCH` or
   * `CASE_INSENSITIVE_MATCH`) search. For filterable `string_value`s, a maximum
   * total number of 200 values is allowed, with each `string_value` has a byte
   * size of no more than 500B. For unfilterable `string_values`, the maximum
   * total byte size of unfilterable `string_values` is 50KB. Empty string isn't
   * allowed.
   */
  stringValues?: string[];
}

function serializeCustomAttribute(data: any): CustomAttribute {
  return {
    ...data,
    longValues: data["longValues"] !== undefined ? data["longValues"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeCustomAttribute(data: any): CustomAttribute {
  return {
    ...data,
    longValues: data["longValues"] !== undefined ? data["longValues"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Custom ranking information for SearchJobsRequest.
 */
export interface CustomRankingInfo {
  /**
   * Required. Controls over how important the score of
   * CustomRankingInfo.ranking_expression gets applied to job's final ranking
   * position. An error is thrown if not specified.
   */
  importanceLevel?:  | "IMPORTANCE_LEVEL_UNSPECIFIED" | "NONE" | "LOW" | "MILD" | "MEDIUM" | "HIGH" | "EXTREME";
  /**
   * Required. Controls over how job documents get ranked on top of existing
   * relevance score (determined by API algorithm). A combination of the ranking
   * expression and relevance score is used to determine job's final ranking
   * position. The syntax for this expression is a subset of Google SQL syntax.
   * Supported operators are: +, -, *, /, where the left and right side of the
   * operator is either a numeric Job.custom_attributes key, integer/double
   * value or an expression that can be evaluated to a number. Parenthesis are
   * supported to adjust calculation precedence. The expression must be < 200
   * characters in length. The expression is considered invalid for a job if the
   * expression references custom attributes that are not populated on the job
   * or if the expression results in a divide by zero. If an expression is
   * invalid for a job, that job is demoted to the end of the results. Sample
   * ranking expression (year + 25) * 0.25 - (freshness / 0.5)
   */
  rankingExpression?: string;
}

/**
 * Device information collected from the job seeker, candidate, or other entity
 * conducting the job search. Providing this information improves the quality of
 * the search results across devices.
 */
export interface DeviceInfo {
  /**
   * Type of the device.
   */
  deviceType?:  | "DEVICE_TYPE_UNSPECIFIED" | "WEB" | "MOBILE_WEB" | "ANDROID" | "IOS" | "BOT" | "OTHER";
  /**
   * A device-specific ID. The ID must be a unique identifier that
   * distinguishes the device from other devices.
   */
  id?: string;
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
 * The histogram request.
 */
export interface HistogramQuery {
  /**
   * An expression specifies a histogram request against matching jobs for
   * searches. See SearchJobsRequest.histogram_queries for details about syntax.
   */
  histogramQuery?: string;
}

/**
 * Histogram result that matches HistogramQuery specified in searches.
 */
export interface HistogramQueryResult {
  /**
   * A map from the values of the facet associated with distinct values to the
   * number of matching entries with corresponding value. The key format is: *
   * (for string histogram) string values stored in the field. * (for named
   * numeric bucket) name specified in `bucket()` function, like for `bucket(0,
   * MAX, "non-negative")`, the key will be `non-negative`. * (for anonymous
   * numeric bucket) range formatted as `-`, for example, `0-1000`, `MIN-0`, and
   * `0-MAX`.
   */
  histogram?: {
    [key: string]: bigint
  };
  /**
   * Requested histogram expression.
   */
  histogramQuery?: string;
}

function serializeHistogramQueryResult(data: any): HistogramQueryResult {
  return {
    ...data,
    histogram: data["histogram"] !== undefined ? Object.fromEntries(Object.entries(data["histogram"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
  };
}

function deserializeHistogramQueryResult(data: any): HistogramQueryResult {
  return {
    ...data,
    histogram: data["histogram"] !== undefined ? Object.fromEntries(Object.entries(data["histogram"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
  };
}

/**
 * A Job resource represents a job posting (also referred to as a "job listing"
 * or "job requisition"). A job belongs to a Company, which is the hiring entity
 * responsible for the job.
 */
export interface Job {
  /**
   * Strongly recommended for the best service experience. Location(s) where
   * the employer is looking to hire for this job posting. Specifying the full
   * street address(es) of the hiring location enables better API results,
   * especially job searches by commute time. At most 50 locations are allowed
   * for best search performance. If a job has more locations, it is suggested
   * to split it into multiple jobs with unique requisition_ids (e.g. 'ReqA'
   * becomes 'ReqA-1', 'ReqA-2', and so on.) as multiple jobs with the same
   * company, language_code and requisition_id are not allowed. If the original
   * requisition_id must be preserved, a custom field should be used for
   * storage. It is also suggested to group the locations that close to each
   * other in the same job for better search experience. Jobs with multiple
   * addresses must have their addresses with the same LocationType to allow
   * location filtering to work properly. (For example, a Job with addresses
   * "1600 Amphitheatre Parkway, Mountain View, CA, USA" and "London, UK" may
   * not have location filters applied correctly at search time since the first
   * is a LocationType.STREET_ADDRESS and the second is a
   * LocationType.LOCALITY.) If a job needs to have multiple addresses, it is
   * suggested to split it into multiple jobs with same LocationTypes. The
   * maximum number of allowed characters is 500.
   */
  addresses?: string[];
  /**
   * Job application information.
   */
  applicationInfo?: ApplicationInfo;
  /**
   * Required. The resource name of the company listing the job. The format is
   * "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}". For
   * example, "projects/foo/tenants/bar/companies/baz".
   */
  company?: string;
  /**
   * Output only. Display name of the company listing the job.
   */
  readonly companyDisplayName?: string;
  /**
   * Job compensation information (a.k.a. "pay rate") i.e., the compensation
   * that will paid to the employee.
   */
  compensationInfo?: CompensationInfo;
  /**
   * A map of fields to hold both filterable and non-filterable custom job
   * attributes that are not covered by the provided structured fields. The keys
   * of the map are strings up to 64 bytes and must match the pattern:
   * `a-zA-Z*`. For example, key0LikeThis or KEY_1_LIKE_THIS. At most 100
   * filterable and at most 100 unfilterable keys are supported. For filterable
   * `string_values`, across all keys at most 200 values are allowed, with each
   * string no more than 255 characters. For unfilterable `string_values`, the
   * maximum total size of `string_values` across all keys is 50KB.
   */
  customAttributes?: {
    [key: string]: CustomAttribute
  };
  /**
   * The desired education degrees for the job, such as Bachelors, Masters.
   */
  degreeTypes?:  | "DEGREE_TYPE_UNSPECIFIED" | "PRIMARY_EDUCATION" | "LOWER_SECONDARY_EDUCATION" | "UPPER_SECONDARY_EDUCATION" | "ADULT_REMEDIAL_EDUCATION" | "ASSOCIATES_OR_EQUIVALENT" | "BACHELORS_OR_EQUIVALENT" | "MASTERS_OR_EQUIVALENT" | "DOCTORAL_OR_EQUIVALENT"[];
  /**
   * The department or functional area within the company with the open
   * position. The maximum number of allowed characters is 255.
   */
  department?: string;
  /**
   * Output only. Derived details about the job posting.
   */
  readonly derivedInfo?: JobDerivedInfo;
  /**
   * Required. The description of the job, which typically includes a
   * multi-paragraph description of the company and related information.
   * Separate fields are provided on the job object for responsibilities,
   * qualifications, and other job characteristics. Use of these separate job
   * fields is recommended. This field accepts and sanitizes HTML input, and
   * also accepts bold, italic, ordered list, and unordered list markup tags.
   * The maximum number of allowed characters is 100,000.
   */
  description?: string;
  /**
   * The employment type(s) of a job, for example, full time or part time.
   */
  employmentTypes?:  | "EMPLOYMENT_TYPE_UNSPECIFIED" | "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "CONTRACT_TO_HIRE" | "TEMPORARY" | "INTERN" | "VOLUNTEER" | "PER_DIEM" | "FLY_IN_FLY_OUT" | "OTHER_EMPLOYMENT_TYPE"[];
  /**
   * A description of bonus, commission, and other compensation incentives
   * associated with the job not including salary or pay. The maximum number of
   * allowed characters is 10,000.
   */
  incentives?: string;
  /**
   * The benefits included with the job.
   */
  jobBenefits?:  | "JOB_BENEFIT_UNSPECIFIED" | "CHILD_CARE" | "DENTAL" | "DOMESTIC_PARTNER" | "FLEXIBLE_HOURS" | "MEDICAL" | "LIFE_INSURANCE" | "PARENTAL_LEAVE" | "RETIREMENT_PLAN" | "SICK_DAYS" | "VACATION" | "VISION"[];
  /**
   * The end timestamp of the job. Typically this field is used for contracting
   * engagements. Invalid timestamps are ignored.
   */
  jobEndTime?: Date;
  /**
   * The experience level associated with the job, such as "Entry Level".
   */
  jobLevel?:  | "JOB_LEVEL_UNSPECIFIED" | "ENTRY_LEVEL" | "EXPERIENCED" | "MANAGER" | "DIRECTOR" | "EXECUTIVE";
  /**
   * The start timestamp of the job in UTC time zone. Typically this field is
   * used for contracting engagements. Invalid timestamps are ignored.
   */
  jobStartTime?: Date;
  /**
   * The language of the posting. This field is distinct from any requirements
   * for fluency that are associated with the job. Language codes must be in
   * BCP-47 format, such as "en-US" or "sr-Latn". For more information, see
   * [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47){:
   * class="external" target="_blank" }. If this field is unspecified and
   * Job.description is present, detected language code based on Job.description
   * is assigned, otherwise defaults to 'en_US'.
   */
  languageCode?: string;
  /**
   * Required during job update. The resource name for the job. This is
   * generated by the service when a job is created. The format is
   * "projects/{project_id}/tenants/{tenant_id}/jobs/{job_id}". For example,
   * "projects/foo/tenants/bar/jobs/baz". Use of this field in job queries and
   * API calls is preferred over the use of requisition_id since this value is
   * unique.
   */
  name?: string;
  /**
   * Output only. The timestamp when this job posting was created.
   */
  readonly postingCreateTime?: Date;
  /**
   * Strongly recommended for the best service experience. The expiration
   * timestamp of the job. After this timestamp, the job is marked as expired,
   * and it no longer appears in search results. The expired job can't be listed
   * by the ListJobs API, but it can be retrieved with the GetJob API or updated
   * with the UpdateJob API or deleted with the DeleteJob API. An expired job
   * can be updated and opened again by using a future expiration timestamp.
   * Updating an expired job fails if there is another existing open job with
   * same company, language_code and requisition_id. The expired jobs are
   * retained in our system for 90 days. However, the overall expired job count
   * cannot exceed 3 times the maximum number of open jobs over previous 7 days.
   * If this threshold is exceeded, expired jobs are cleaned out in order of
   * earliest expire time. Expired jobs are no longer accessible after they are
   * cleaned out. Invalid timestamps are ignored, and treated as expire time not
   * provided. If the timestamp is before the instant request is made, the job
   * is treated as expired immediately on creation. This kind of job can not be
   * updated. And when creating a job with past timestamp, the
   * posting_publish_time must be set before posting_expire_time. The purpose of
   * this feature is to allow other objects, such as Application, to refer a job
   * that didn't exist in the system prior to becoming expired. If you want to
   * modify a job that was expired on creation, delete it and create a new one.
   * If this value isn't provided at the time of job creation or is invalid, the
   * job posting expires after 30 days from the job's creation time. For
   * example, if the job was created on 2017/01/01 13:00AM UTC with an
   * unspecified expiration date, the job expires after 2017/01/31 13:00AM UTC.
   * If this value isn't provided on job update, it depends on the field masks
   * set by UpdateJobRequest.update_mask. If the field masks include
   * job_end_time, or the masks are empty meaning that every field is updated,
   * the job posting expires after 30 days from the job's last update time.
   * Otherwise the expiration date isn't updated.
   */
  postingExpireTime?: Date;
  /**
   * The timestamp this job posting was most recently published. The default
   * value is the time the request arrives at the server. Invalid timestamps are
   * ignored.
   */
  postingPublishTime?: Date;
  /**
   * The job PostingRegion (for example, state, country) throughout which the
   * job is available. If this field is set, a LocationFilter in a search query
   * within the job region finds this job posting if an exact location match
   * isn't specified. If this field is set to PostingRegion.NATION or
   * PostingRegion.ADMINISTRATIVE_AREA, setting job Job.addresses to the same
   * location level as this field is strongly recommended.
   */
  postingRegion?:  | "POSTING_REGION_UNSPECIFIED" | "ADMINISTRATIVE_AREA" | "NATION" | "TELECOMMUTE";
  /**
   * Output only. The timestamp when this job posting was last updated.
   */
  readonly postingUpdateTime?: Date;
  /**
   * Options for job processing.
   */
  processingOptions?: ProcessingOptions;
  /**
   * A promotion value of the job, as determined by the client. The value
   * determines the sort order of the jobs returned when searching for jobs
   * using the featured jobs search call, with higher promotional values being
   * returned first and ties being resolved by relevance sort. Only the jobs
   * with a promotionValue >0 are returned in a FEATURED_JOB_SEARCH. Default
   * value is 0, and negative values are treated as 0.
   */
  promotionValue?: number;
  /**
   * A description of the qualifications required to perform the job. The use
   * of this field is recommended as an alternative to using the more general
   * description field. This field accepts and sanitizes HTML input, and also
   * accepts bold, italic, ordered list, and unordered list markup tags. The
   * maximum number of allowed characters is 10,000.
   */
  qualifications?: string;
  /**
   * Required. The requisition ID, also referred to as the posting ID, is
   * assigned by the client to identify a job. This field is intended to be used
   * by clients for client identification and tracking of postings. A job isn't
   * allowed to be created if there is another job with the same company,
   * language_code and requisition_id. The maximum number of allowed characters
   * is 255.
   */
  requisitionId?: string;
  /**
   * A description of job responsibilities. The use of this field is
   * recommended as an alternative to using the more general description field.
   * This field accepts and sanitizes HTML input, and also accepts bold, italic,
   * ordered list, and unordered list markup tags. The maximum number of allowed
   * characters is 10,000.
   */
  responsibilities?: string;
  /**
   * Required. The title of the job, such as "Software Engineer" The maximum
   * number of allowed characters is 500.
   */
  title?: string;
  /**
   * Deprecated. The job is only visible to the owner. The visibility of the
   * job. Defaults to Visibility.ACCOUNT_ONLY if not specified.
   */
  visibility?:  | "VISIBILITY_UNSPECIFIED" | "ACCOUNT_ONLY" | "SHARED_WITH_GOOGLE" | "SHARED_WITH_PUBLIC";
}

function serializeJob(data: any): Job {
  return {
    ...data,
    compensationInfo: data["compensationInfo"] !== undefined ? serializeCompensationInfo(data["compensationInfo"]) : undefined,
    customAttributes: data["customAttributes"] !== undefined ? Object.fromEntries(Object.entries(data["customAttributes"]).map(([k, v]: [string, any]) => ([k, serializeCustomAttribute(v)]))) : undefined,
    jobEndTime: data["jobEndTime"] !== undefined ? data["jobEndTime"].toISOString() : undefined,
    jobStartTime: data["jobStartTime"] !== undefined ? data["jobStartTime"].toISOString() : undefined,
    postingExpireTime: data["postingExpireTime"] !== undefined ? data["postingExpireTime"].toISOString() : undefined,
    postingPublishTime: data["postingPublishTime"] !== undefined ? data["postingPublishTime"].toISOString() : undefined,
  };
}

function deserializeJob(data: any): Job {
  return {
    ...data,
    compensationInfo: data["compensationInfo"] !== undefined ? deserializeCompensationInfo(data["compensationInfo"]) : undefined,
    customAttributes: data["customAttributes"] !== undefined ? Object.fromEntries(Object.entries(data["customAttributes"]).map(([k, v]: [string, any]) => ([k, deserializeCustomAttribute(v)]))) : undefined,
    jobEndTime: data["jobEndTime"] !== undefined ? new Date(data["jobEndTime"]) : undefined,
    jobStartTime: data["jobStartTime"] !== undefined ? new Date(data["jobStartTime"]) : undefined,
    postingCreateTime: data["postingCreateTime"] !== undefined ? new Date(data["postingCreateTime"]) : undefined,
    postingExpireTime: data["postingExpireTime"] !== undefined ? new Date(data["postingExpireTime"]) : undefined,
    postingPublishTime: data["postingPublishTime"] !== undefined ? new Date(data["postingPublishTime"]) : undefined,
    postingUpdateTime: data["postingUpdateTime"] !== undefined ? new Date(data["postingUpdateTime"]) : undefined,
  };
}

/**
 * Derived details about the job posting.
 */
export interface JobDerivedInfo {
  /**
   * Job categories derived from Job.title and Job.description.
   */
  jobCategories?:  | "JOB_CATEGORY_UNSPECIFIED" | "ACCOUNTING_AND_FINANCE" | "ADMINISTRATIVE_AND_OFFICE" | "ADVERTISING_AND_MARKETING" | "ANIMAL_CARE" | "ART_FASHION_AND_DESIGN" | "BUSINESS_OPERATIONS" | "CLEANING_AND_FACILITIES" | "COMPUTER_AND_IT" | "CONSTRUCTION" | "CUSTOMER_SERVICE" | "EDUCATION" | "ENTERTAINMENT_AND_TRAVEL" | "FARMING_AND_OUTDOORS" | "HEALTHCARE" | "HUMAN_RESOURCES" | "INSTALLATION_MAINTENANCE_AND_REPAIR" | "LEGAL" | "MANAGEMENT" | "MANUFACTURING_AND_WAREHOUSE" | "MEDIA_COMMUNICATIONS_AND_WRITING" | "OIL_GAS_AND_MINING" | "PERSONAL_CARE_AND_SERVICES" | "PROTECTIVE_SERVICES" | "REAL_ESTATE" | "RESTAURANT_AND_HOSPITALITY" | "SALES_AND_RETAIL" | "SCIENCE_AND_ENGINEERING" | "SOCIAL_SERVICES_AND_NON_PROFIT" | "SPORTS_FITNESS_AND_RECREATION" | "TRANSPORTATION_AND_LOGISTICS"[];
  /**
   * Structured locations of the job, resolved from Job.addresses. locations
   * are exactly matched to Job.addresses in the same order.
   */
  locations?: Location[];
}

/**
 * An event issued when a job seeker interacts with the application that
 * implements Cloud Talent Solution.
 */
export interface JobEvent {
  /**
   * Required. The job name(s) associated with this event. For example, if this
   * is an impression event, this field contains the identifiers of all jobs
   * shown to the job seeker. If this was a view event, this field contains the
   * identifier of the viewed job. The format is
   * "projects/{project_id}/tenants/{tenant_id}/jobs/{job_id}", for example,
   * "projects/foo/tenants/bar/jobs/baz".
   */
  jobs?: string[];
  /**
   * Required. The type of the event (see JobEventType).
   */
  type?:  | "JOB_EVENT_TYPE_UNSPECIFIED" | "IMPRESSION" | "VIEW" | "VIEW_REDIRECT" | "APPLICATION_START" | "APPLICATION_FINISH" | "APPLICATION_QUICK_SUBMISSION" | "APPLICATION_REDIRECT" | "APPLICATION_START_FROM_SEARCH" | "APPLICATION_REDIRECT_FROM_SEARCH" | "APPLICATION_COMPANY_SUBMIT" | "BOOKMARK" | "NOTIFICATION" | "HIRED" | "SENT_CV" | "INTERVIEW_GRANTED";
}

/**
 * The query required to perform a search query.
 */
export interface JobQuery {
  /**
   * Allows filtering jobs by commute time with different travel methods (for
   * example, driving or public transit). Note: This only works when you specify
   * a CommuteMethod. In this case, location_filters is ignored. Currently we
   * don't support sorting by commute time.
   */
  commuteFilter?: CommuteFilter;
  /**
   * This filter specifies the company entities to search against. If a value
   * isn't specified, jobs are searched for against all companies. If multiple
   * values are specified, jobs are searched against the companies specified.
   * The format is
   * "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}". For
   * example, "projects/foo/tenants/bar/companies/baz". At most 20 company
   * filters are allowed.
   */
  companies?: string[];
  /**
   * This filter specifies the company Company.display_name of the jobs to
   * search against. The company name must match the value exactly.
   * Alternatively, the value being searched for can be wrapped in different
   * match operators. `SUBSTRING_MATCH([value])` The company name must contain a
   * case insensitive substring match of the value. Using this function may
   * increase latency. Sample Value: `SUBSTRING_MATCH(google)`
   * `MULTI_WORD_TOKEN_MATCH([value])` The value will be treated as a multi word
   * token and the company name must contain a case insensitive match of the
   * value. Using this function may increase latency. Sample Value:
   * `MULTI_WORD_TOKEN_MATCH(google)` If a value isn't specified, jobs within
   * the search results are associated with any company. If multiple values are
   * specified, jobs within the search results may be associated with any of the
   * specified companies. At most 20 company display name filters are allowed.
   */
  companyDisplayNames?: string[];
  /**
   * This search filter is applied only to Job.compensation_info. For example,
   * if the filter is specified as "Hourly job with per-hour compensation >
   * $15", only jobs meeting these criteria are searched. If a filter isn't
   * defined, all open jobs are searched.
   */
  compensationFilter?: CompensationFilter;
  /**
   * This filter specifies a structured syntax to match against the
   * Job.custom_attributes marked as `filterable`. The syntax for this
   * expression is a subset of SQL syntax. Supported operators are: `=`, `!=`,
   * `<`, `<=`, `>`, and `>=` where the left of the operator is a custom field
   * key and the right of the operator is a number or a quoted string. You must
   * escape backslash (\\) and quote (\") characters. Supported functions are
   * `LOWER([field_name])` to perform a case insensitive match and
   * `EMPTY([field_name])` to filter on the existence of a key. Boolean
   * expressions (AND/OR/NOT) are supported up to 3 levels of nesting (for
   * example, "((A AND B AND C) OR NOT D) AND E"), a maximum of 100 comparisons
   * or functions are allowed in the expression. The expression must be < 10000
   * bytes in length. Sample Query: `(LOWER(driving_license)="class \"a\"" OR
   * EMPTY(driving_license)) AND driving_years > 10`
   */
  customAttributeFilter?: string;
  /**
   * This flag controls the spell-check feature. If false, the service attempts
   * to correct a misspelled query, for example, "enginee" is corrected to
   * "engineer". Defaults to false: a spell check is performed.
   */
  disableSpellCheck?: boolean;
  /**
   * The employment type filter specifies the employment type of jobs to search
   * against, such as EmploymentType.FULL_TIME. If a value isn't specified, jobs
   * in the search results includes any employment type. If multiple values are
   * specified, jobs in the search results include any of the specified
   * employment types.
   */
  employmentTypes?:  | "EMPLOYMENT_TYPE_UNSPECIFIED" | "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "CONTRACT_TO_HIRE" | "TEMPORARY" | "INTERN" | "VOLUNTEER" | "PER_DIEM" | "FLY_IN_FLY_OUT" | "OTHER_EMPLOYMENT_TYPE"[];
  /**
   * This filter specifies a list of job names to be excluded during search. At
   * most 400 excluded job names are allowed.
   */
  excludedJobs?: string[];
  /**
   * The category filter specifies the categories of jobs to search against.
   * See JobCategory for more information. If a value isn't specified, jobs from
   * any category are searched against. If multiple values are specified, jobs
   * from any of the specified categories are searched against.
   */
  jobCategories?:  | "JOB_CATEGORY_UNSPECIFIED" | "ACCOUNTING_AND_FINANCE" | "ADMINISTRATIVE_AND_OFFICE" | "ADVERTISING_AND_MARKETING" | "ANIMAL_CARE" | "ART_FASHION_AND_DESIGN" | "BUSINESS_OPERATIONS" | "CLEANING_AND_FACILITIES" | "COMPUTER_AND_IT" | "CONSTRUCTION" | "CUSTOMER_SERVICE" | "EDUCATION" | "ENTERTAINMENT_AND_TRAVEL" | "FARMING_AND_OUTDOORS" | "HEALTHCARE" | "HUMAN_RESOURCES" | "INSTALLATION_MAINTENANCE_AND_REPAIR" | "LEGAL" | "MANAGEMENT" | "MANUFACTURING_AND_WAREHOUSE" | "MEDIA_COMMUNICATIONS_AND_WRITING" | "OIL_GAS_AND_MINING" | "PERSONAL_CARE_AND_SERVICES" | "PROTECTIVE_SERVICES" | "REAL_ESTATE" | "RESTAURANT_AND_HOSPITALITY" | "SALES_AND_RETAIL" | "SCIENCE_AND_ENGINEERING" | "SOCIAL_SERVICES_AND_NON_PROFIT" | "SPORTS_FITNESS_AND_RECREATION" | "TRANSPORTATION_AND_LOGISTICS"[];
  /**
   * This filter specifies the locale of jobs to search against, for example,
   * "en-US". If a value isn't specified, the search results can contain jobs in
   * any locale. Language codes should be in BCP-47 format, such as "en-US" or
   * "sr-Latn". For more information, see [Tags for Identifying
   * Languages](https://tools.ietf.org/html/bcp47). At most 10 language code
   * filters are allowed.
   */
  languageCodes?: string[];
  /**
   * The location filter specifies geo-regions containing the jobs to search
   * against. See LocationFilter for more information. If a location value isn't
   * specified, jobs fitting the other search criteria are retrieved regardless
   * of where they're located. If multiple values are specified, jobs are
   * retrieved from any of the specified locations. If different values are
   * specified for the LocationFilter.distance_in_miles parameter, the maximum
   * provided distance is used for all locations. At most 5 location filters are
   * allowed.
   */
  locationFilters?: LocationFilter[];
  /**
   * Jobs published within a range specified by this filter are searched
   * against.
   */
  publishTimeRange?: TimestampRange;
  /**
   * The query string that matches against the job title, description, and
   * location fields. The maximum number of allowed characters is 255.
   */
  query?: string;
  /**
   * The language code of query. For example, "en-US". This field helps to
   * better interpret the query. If a value isn't specified, the query language
   * code is automatically detected, which may not be accurate. Language code
   * should be in BCP-47 format, such as "en-US" or "sr-Latn". For more
   * information, see [Tags for Identifying
   * Languages](https://tools.ietf.org/html/bcp47).
   */
  queryLanguageCode?: string;
}

function serializeJobQuery(data: any): JobQuery {
  return {
    ...data,
    commuteFilter: data["commuteFilter"] !== undefined ? serializeCommuteFilter(data["commuteFilter"]) : undefined,
    compensationFilter: data["compensationFilter"] !== undefined ? serializeCompensationFilter(data["compensationFilter"]) : undefined,
    publishTimeRange: data["publishTimeRange"] !== undefined ? serializeTimestampRange(data["publishTimeRange"]) : undefined,
  };
}

function deserializeJobQuery(data: any): JobQuery {
  return {
    ...data,
    commuteFilter: data["commuteFilter"] !== undefined ? deserializeCommuteFilter(data["commuteFilter"]) : undefined,
    compensationFilter: data["compensationFilter"] !== undefined ? deserializeCompensationFilter(data["compensationFilter"]) : undefined,
    publishTimeRange: data["publishTimeRange"] !== undefined ? deserializeTimestampRange(data["publishTimeRange"]) : undefined,
  };
}

/**
 * Mutation result of a job from a batch operation.
 */
export interface JobResult {
  /**
   * Here Job only contains basic information including name, company,
   * language_code and requisition_id, use getJob method to retrieve detailed
   * information of the created/updated job.
   */
  job?: Job;
  /**
   * The status of the job processed. This field is populated if the processing
   * of the job fails.
   */
  status?: Status;
}

function serializeJobResult(data: any): JobResult {
  return {
    ...data,
    job: data["job"] !== undefined ? serializeJob(data["job"]) : undefined,
  };
}

function deserializeJobResult(data: any): JobResult {
  return {
    ...data,
    job: data["job"] !== undefined ? deserializeJob(data["job"]) : undefined,
  };
}

/**
 * An object that represents a latitude/longitude pair. This is expressed as a
 * pair of doubles to represent degrees latitude and degrees longitude. Unless
 * specified otherwise, this object must conform to the WGS84 standard. Values
 * must be within normalized ranges.
 */
export interface LatLng {
  /**
   * The latitude in degrees. It must be in the range [-90.0, +90.0].
   */
  latitude?: number;
  /**
   * The longitude in degrees. It must be in the range [-180.0, +180.0].
   */
  longitude?: number;
}

/**
 * The List companies response object.
 */
export interface ListCompaniesResponse {
  /**
   * Companies for the current client.
   */
  companies?: Company[];
  /**
   * Additional information for the API invocation, such as the request
   * tracking id.
   */
  metadata?: ResponseMetadata;
  /**
   * A token to retrieve the next page of results.
   */
  nextPageToken?: string;
}

/**
 * List jobs response.
 */
export interface ListJobsResponse {
  /**
   * The Jobs for a given company. The maximum number of items returned is
   * based on the limit field provided in the request.
   */
  jobs?: Job[];
  /**
   * Additional information for the API invocation, such as the request
   * tracking id.
   */
  metadata?: ResponseMetadata;
  /**
   * A token to retrieve the next page of results.
   */
  nextPageToken?: string;
}

function serializeListJobsResponse(data: any): ListJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (serializeJob(item))) : undefined,
  };
}

function deserializeListJobsResponse(data: any): ListJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (deserializeJob(item))) : undefined,
  };
}

/**
 * The List tenants response object.
 */
export interface ListTenantsResponse {
  /**
   * Additional information for the API invocation, such as the request
   * tracking id.
   */
  metadata?: ResponseMetadata;
  /**
   * A token to retrieve the next page of results.
   */
  nextPageToken?: string;
  /**
   * Tenants for the current client.
   */
  tenants?: Tenant[];
}

/**
 * A resource that represents a location with full geographic information.
 */
export interface Location {
  /**
   * An object representing a latitude/longitude pair.
   */
  latLng?: LatLng;
  /**
   * The type of a location, which corresponds to the address lines field of
   * google.type.PostalAddress. For example, "Downtown, Atlanta, GA, USA" has a
   * type of LocationType.NEIGHBORHOOD, and "Kansas City, KS, USA" has a type of
   * LocationType.LOCALITY.
   */
  locationType?:  | "LOCATION_TYPE_UNSPECIFIED" | "COUNTRY" | "ADMINISTRATIVE_AREA" | "SUB_ADMINISTRATIVE_AREA" | "LOCALITY" | "POSTAL_CODE" | "SUB_LOCALITY" | "SUB_LOCALITY_1" | "SUB_LOCALITY_2" | "NEIGHBORHOOD" | "STREET_ADDRESS";
  /**
   * Postal address of the location that includes human readable information,
   * such as postal delivery and payments addresses. Given a postal address, a
   * postal service can deliver items to a premises, P.O. Box, or other delivery
   * location.
   */
  postalAddress?: PostalAddress;
  /**
   * Radius in miles of the job location. This value is derived from the
   * location bounding box in which a circle with the specified radius centered
   * from google.type.LatLng covers the area associated with the job location.
   * For example, currently, "Mountain View, CA, USA" has a radius of 6.17
   * miles.
   */
  radiusMiles?: number;
}

/**
 * Geographic region of the search.
 */
export interface LocationFilter {
  /**
   * The address name, such as "Mountain View" or "Bay Area".
   */
  address?: string;
  /**
   * The distance_in_miles is applied when the location being searched for is
   * identified as a city or smaller. This field is ignored if the location
   * being searched for is a state or larger.
   */
  distanceInMiles?: number;
  /**
   * The latitude and longitude of the geographic center to search from. This
   * field is ignored if `address` is provided.
   */
  latLng?: LatLng;
  /**
   * CLDR region code of the country/region. This field may be used in two
   * ways: 1) If telecommute preference is not set, this field is used address
   * ambiguity of the user-input address. For example, "Liverpool" may refer to
   * "Liverpool, NY, US" or "Liverpool, UK". This region code biases the address
   * resolution toward a specific country or territory. If this field is not
   * set, address resolution is biased toward the United States by default. 2)
   * If telecommute preference is set to TELECOMMUTE_ALLOWED, the telecommute
   * location filter will be limited to the region specified in this field. If
   * this field is not set, the telecommute job locations will not be See
   * https://unicode-org.github.io/cldr-staging/charts/latest/supplemental/territory_information.html
   * for details. Example: "CH" for Switzerland.
   */
  regionCode?: string;
  /**
   * Allows the client to return jobs without a set location, specifically,
   * telecommuting jobs (telecommuting is considered by the service as a special
   * location). Job.posting_region indicates if a job permits telecommuting. If
   * this field is set to TelecommutePreference.TELECOMMUTE_ALLOWED,
   * telecommuting jobs are searched, and address and lat_lng are ignored. If
   * not set or set to TelecommutePreference.TELECOMMUTE_EXCLUDED, the
   * telecommute status of the jobs is ignored. Jobs that have
   * PostingRegion.TELECOMMUTE and have additional Job.addresses may still be
   * matched based on other location filters using address or latlng. This
   * filter can be used by itself to search exclusively for telecommuting jobs,
   * or it can be combined with another location filter to search for a
   * combination of job locations, such as "Mountain View" or "telecommuting"
   * jobs. However, when used in combination with other location filters,
   * telecommuting jobs can be treated as less relevant than other jobs in the
   * search response. This field is only used for job search requests.
   */
  telecommutePreference?:  | "TELECOMMUTE_PREFERENCE_UNSPECIFIED" | "TELECOMMUTE_EXCLUDED" | "TELECOMMUTE_ALLOWED" | "TELECOMMUTE_JOBS_EXCLUDED";
}

/**
 * Job entry with metadata inside SearchJobsResponse.
 */
export interface MatchingJob {
  /**
   * Commute information which is generated based on specified CommuteFilter.
   */
  commuteInfo?: CommuteInfo;
  /**
   * Job resource that matches the specified SearchJobsRequest.
   */
  job?: Job;
  /**
   * A summary of the job with core information that's displayed on the search
   * results listing page.
   */
  jobSummary?: string;
  /**
   * Contains snippets of text from the Job.title field most closely matching a
   * search query's keywords, if available. The matching query keywords are
   * enclosed in HTML bold tags.
   */
  jobTitleSnippet?: string;
  /**
   * Contains snippets of text from the Job.description and similar fields that
   * most closely match a search query's keywords, if available. All HTML tags
   * in the original fields are stripped when returned in this field, and
   * matching query keywords are enclosed in HTML bold tags.
   */
  searchTextSnippet?: string;
}

function serializeMatchingJob(data: any): MatchingJob {
  return {
    ...data,
    commuteInfo: data["commuteInfo"] !== undefined ? serializeCommuteInfo(data["commuteInfo"]) : undefined,
    job: data["job"] !== undefined ? serializeJob(data["job"]) : undefined,
  };
}

function deserializeMatchingJob(data: any): MatchingJob {
  return {
    ...data,
    commuteInfo: data["commuteInfo"] !== undefined ? deserializeCommuteInfo(data["commuteInfo"]) : undefined,
    job: data["job"] !== undefined ? deserializeJob(data["job"]) : undefined,
  };
}

/**
 * Message representing input to a Mendel server for debug forcing. See
 * go/mendel-debug-forcing for more details. Next ID: 2
 */
export interface MendelDebugInput {
  /**
   * When a request spans multiple servers, a MendelDebugInput may travel with
   * the request and take effect in all the servers. This field is a map of
   * namespaces to NamespacedMendelDebugInput protos. In a single server, up to
   * two NamespacedMendelDebugInput protos are applied: 1.
   * NamespacedMendelDebugInput with the global namespace (key == ""). 2.
   * NamespacedMendelDebugInput with the server's namespace. When both
   * NamespacedMendelDebugInput protos are present, they are merged. See
   * go/mendel-debug-forcing for more details.
   */
  namespacedDebugInput?: {
    [key: string]: NamespacedDebugInput
  };
}

/**
 * Represents an amount of money with its currency type.
 */
export interface Money {
  /**
   * The three-letter currency code defined in ISO 4217.
   */
  currencyCode?: string;
  /**
   * Number of nano (10^-9) units of the amount. The value must be between
   * -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos`
   * must be positive or zero. If `units` is zero, `nanos` can be positive,
   * zero, or negative. If `units` is negative, `nanos` must be negative or
   * zero. For example $-1.75 is represented as `units`=-1 and
   * `nanos`=-750,000,000.
   */
  nanos?: number;
  /**
   * The whole units of the amount. For example if `currencyCode` is `"USD"`,
   * then 1 unit is one US dollar.
   */
  units?: bigint;
}

function serializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? String(data["units"]) : undefined,
  };
}

function deserializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? BigInt(data["units"]) : undefined,
  };
}

/**
 * Next ID: 16
 */
export interface NamespacedDebugInput {
  /**
   * Set of experiment names to be absolutely forced. These experiments will be
   * forced without evaluating the conditions.
   */
  absolutelyForcedExpNames?: string[];
  /**
   * Set of experiment ids to be absolutely forced. These ids will be forced
   * without evaluating the conditions.
   */
  absolutelyForcedExps?: number[];
  /**
   * Set of experiment tags to be absolutely forced. The experiments with these
   * tags will be forced without evaluating the conditions.
   */
  absolutelyForcedExpTags?: string[];
  /**
   * Set of experiment names to be conditionally forced. These experiments will
   * be forced only if their conditions and their parent domain's conditions are
   * true.
   */
  conditionallyForcedExpNames?: string[];
  /**
   * Set of experiment ids to be conditionally forced. These ids will be forced
   * only if their conditions and their parent domain's conditions are true.
   */
  conditionallyForcedExps?: number[];
  /**
   * Set of experiment tags to be conditionally forced. The experiments with
   * these tags will be forced only if their conditions and their parent
   * domain's conditions are true.
   */
  conditionallyForcedExpTags?: string[];
  /**
   * If true, disable automatic enrollment selection (at all diversion points).
   * Automatic enrollment selection means experiment selection process based on
   * the experiment's automatic enrollment condition. This does not disable
   * selection of forced experiments. Setting this field to false does not
   * change anything in the experiment selection process.
   */
  disableAutomaticEnrollmentSelection?: boolean;
  /**
   * Set of experiment names to be disabled. If an experiment is disabled, it
   * is never selected nor forced. If an aggregate experiment is disabled, its
   * partitions are disabled together. If an experiment with an enrollment is
   * disabled, the enrollment is disabled together. If a name corresponds to a
   * domain, the domain itself and all descendant experiments and domains are
   * disabled together.
   */
  disableExpNames?: string[];
  /**
   * Set of experiment ids to be disabled. If an experiment is disabled, it is
   * never selected nor forced. If an aggregate experiment is disabled, its
   * partitions are disabled together. If an experiment with an enrollment is
   * disabled, the enrollment is disabled together. If an ID corresponds to a
   * domain, the domain itself and all descendant experiments and domains are
   * disabled together.
   */
  disableExps?: number[];
  /**
   * Set of experiment tags to be disabled. All experiments that are tagged
   * with one or more of these tags are disabled. If an experiment is disabled,
   * it is never selected nor forced. If an aggregate experiment is disabled,
   * its partitions are disabled together. If an experiment with an enrollment
   * is disabled, the enrollment is disabled together.
   */
  disableExpTags?: string[];
  /**
   * If true, disable manual enrollment selection (at all diversion points).
   * Manual enrollment selection means experiment selection process based on the
   * request's manual enrollment states (a.k.a. opt-in experiments). This does
   * not disable selection of forced experiments. Setting this field to false
   * does not change anything in the experiment selection process.
   */
  disableManualEnrollmentSelection?: boolean;
  /**
   * If true, disable organic experiment selection (at all diversion points).
   * Organic selection means experiment selection process based on traffic
   * allocation and diversion condition evaluation. This does not disable
   * selection of forced experiments. This is useful in cases when it is not
   * known whether experiment selection behavior is responsible for a error or
   * breakage. Disabling organic selection may help to isolate the cause of a
   * given problem. Setting this field to false does not change anything in the
   * experiment selection process.
   */
  disableOrganicSelection?: boolean;
  /**
   * Flags to force in a particular experiment state. Map from flag name to
   * flag value.
   */
  forcedFlags?: {
    [key: string]: string
  };
  /**
   * Rollouts to force in a particular experiment state. Map from rollout name
   * to rollout value.
   */
  forcedRollouts?: {
    [key: string]: boolean
  };
  /**
   * Sets different testing modes. See the documentation in the TestingMode
   * message for more information.
   */
  testingMode?:  | "TESTING_MODE_UNSPECIFIED" | "TESTING_MODE_ALL_OFF" | "TESTING_MODE_ALL_ON";
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
 * Represents a postal address, e.g. for postal delivery or payments addresses.
 * Given a postal address, a postal service can deliver items to a premise, P.O.
 * Box or similar. It is not intended to model geographical locations (roads,
 * towns, mountains). In typical usage an address would be created via user
 * input or from importing existing data, depending on the type of process.
 * Advice on address input / editing: - Use an internationalization-ready
 * address widget such as https://github.com/google/libaddressinput) - Users
 * should not be presented with UI elements for input or editing of fields
 * outside countries where that field is used. For more guidance on how to use
 * this schema, please see: https://support.google.com/business/answer/6397478
 */
export interface PostalAddress {
  /**
   * Unstructured address lines describing the lower levels of an address.
   * Because values in address_lines do not have type information and may
   * sometimes contain multiple values in a single field (e.g. "Austin, TX"), it
   * is important that the line order is clear. The order of address lines
   * should be "envelope order" for the country/region of the address. In places
   * where this can vary (e.g. Japan), address_language is used to make it
   * explicit (e.g. "ja" for large-to-small ordering and "ja-Latn" or "en" for
   * small-to-large). This way, the most specific line of an address can be
   * selected based on the language. The minimum permitted structural
   * representation of an address consists of a region_code with all remaining
   * information placed in the address_lines. It would be possible to format
   * such an address very approximately without geocoding, but no semantic
   * reasoning could be made about any of the address components until it was at
   * least partially resolved. Creating an address only containing a region_code
   * and address_lines, and then geocoding is the recommended way to handle
   * completely unstructured addresses (as opposed to guessing which parts of
   * the address should be localities or administrative areas).
   */
  addressLines?: string[];
  /**
   * Optional. Highest administrative subdivision which is used for postal
   * addresses of a country or region. For example, this can be a state, a
   * province, an oblast, or a prefecture. Specifically, for Spain this is the
   * province and not the autonomous community (e.g. "Barcelona" and not
   * "Catalonia"). Many countries don't use an administrative area in postal
   * addresses. E.g. in Switzerland this should be left unpopulated.
   */
  administrativeArea?: string;
  /**
   * Optional. BCP-47 language code of the contents of this address (if known).
   * This is often the UI language of the input form or is expected to match one
   * of the languages used in the address' country/region, or their
   * transliterated equivalents. This can affect formatting in certain
   * countries, but is not critical to the correctness of the data and will
   * never affect any validation or other non-formatting related operations. If
   * this value is not known, it should be omitted (rather than specifying a
   * possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".
   */
  languageCode?: string;
  /**
   * Optional. Generally refers to the city/town portion of the address.
   * Examples: US city, IT comune, UK post town. In regions of the world where
   * localities are not well defined or do not fit into this structure well,
   * leave locality empty and use address_lines.
   */
  locality?: string;
  /**
   * Optional. The name of the organization at the address.
   */
  organization?: string;
  /**
   * Optional. Postal code of the address. Not all countries use or require
   * postal codes to be present, but where they are used, they may trigger
   * additional validation with other parts of the address (e.g. state/zip
   * validation in the U.S.A.).
   */
  postalCode?: string;
  /**
   * Optional. The recipient at the address. This field may, under certain
   * circumstances, contain multiline information. For example, it might contain
   * "care of" information.
   */
  recipients?: string[];
  /**
   * Required. CLDR region code of the country/region of the address. This is
   * never inferred and it is up to the user to ensure the value is correct. See
   * https://cldr.unicode.org/ and
   * https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html
   * for details. Example: "CH" for Switzerland.
   */
  regionCode?: string;
  /**
   * The schema revision of the `PostalAddress`. This must be set to 0, which
   * is the latest revision. All new revisions **must** be backward compatible
   * with old revisions.
   */
  revision?: number;
  /**
   * Optional. Additional, country-specific, sorting code. This is not used in
   * most regions. Where it is used, the value is either a string like "CEDEX",
   * optionally followed by a number (e.g. "CEDEX 7"), or just a number alone,
   * representing the "sector code" (Jamaica), "delivery area indicator"
   * (Malawi) or "post office indicator" (e.g. Côte d'Ivoire).
   */
  sortingCode?: string;
  /**
   * Optional. Sublocality of the address. For example, this can be
   * neighborhoods, boroughs, districts.
   */
  sublocality?: string;
}

/**
 * Options for job processing.
 */
export interface ProcessingOptions {
  /**
   * If set to `true`, the service does not attempt to resolve a more precise
   * address for the job.
   */
  disableStreetAddressResolution?: boolean;
  /**
   * Option for job HTML content sanitization. Applied fields are: *
   * description * applicationInfo.instruction * incentives * qualifications *
   * responsibilities HTML tags in these fields may be stripped if sanitiazation
   * isn't disabled. Defaults to HtmlSanitization.SIMPLE_FORMATTING_ONLY.
   */
  htmlSanitization?:  | "HTML_SANITIZATION_UNSPECIFIED" | "HTML_SANITIZATION_DISABLED" | "SIMPLE_FORMATTING_ONLY";
}

/**
 * Additional options for jobs#projectsTenantsCompaniesList.
 */
export interface ProjectsTenantsCompaniesListOptions {
  /**
   * The maximum number of companies to be returned, at most 100. Default is
   * 100 if a non-positive number is provided.
   */
  pageSize?: number;
  /**
   * The starting indicator from which to return results.
   */
  pageToken?: string;
  /**
   * Set to true if the companies requested must have open jobs. Defaults to
   * false. If true, at most page_size of companies are fetched, among which
   * only those with open jobs are returned.
   */
  requireOpenJobs?: boolean;
}

/**
 * Additional options for jobs#projectsTenantsCompaniesPatch.
 */
export interface ProjectsTenantsCompaniesPatchOptions {
  /**
   * Strongly recommended for the best service experience. If update_mask is
   * provided, only the specified fields in company are updated. Otherwise all
   * the fields are updated. A field mask to specify the company fields to be
   * updated. Only top level fields of Company are supported.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsTenantsCompaniesPatchOptions(data: any): ProjectsTenantsCompaniesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsTenantsCompaniesPatchOptions(data: any): ProjectsTenantsCompaniesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for jobs#projectsTenantsCompleteQuery.
 */
export interface ProjectsTenantsCompleteQueryOptions {
  /**
   * If provided, restricts completion to specified company. The format is
   * "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}", for
   * example, "projects/foo/tenants/bar/companies/baz".
   */
  company?: string;
  /**
   * The list of languages of the query. This is the BCP-47 language code, such
   * as "en-US" or "sr-Latn". For more information, see [Tags for Identifying
   * Languages](https://tools.ietf.org/html/bcp47). The maximum number of
   * allowed characters is 255.
   */
  languageCodes?: string;
  /**
   * Required. Completion result count. The maximum allowed page size is 10.
   */
  pageSize?: number;
  /**
   * Required. The query used to generate suggestions. The maximum number of
   * allowed characters is 255.
   */
  query?: string;
  /**
   * The scope of the completion. The defaults is CompletionScope.PUBLIC.
   */
  scope?:  | "COMPLETION_SCOPE_UNSPECIFIED" | "TENANT" | "PUBLIC";
  /**
   * The completion topic. The default is CompletionType.COMBINED.
   */
  type?:  | "COMPLETION_TYPE_UNSPECIFIED" | "JOB_TITLE" | "COMPANY_NAME" | "COMBINED";
}

/**
 * Additional options for jobs#projectsTenantsJobsList.
 */
export interface ProjectsTenantsJobsListOptions {
  /**
   * Required. The filter string specifies the jobs to be enumerated. Supported
   * operator: =, AND The fields eligible for filtering are: * `companyName` *
   * `requisitionId` * `status` Available values: OPEN, EXPIRED, ALL. Defaults
   * to OPEN if no value is specified. At least one of `companyName` and
   * `requisitionId` must present or an INVALID_ARGUMENT error is thrown. Sample
   * Query: * companyName = "projects/foo/tenants/bar/companies/baz" *
   * companyName = "projects/foo/tenants/bar/companies/baz" AND requisitionId =
   * "req-1" * companyName = "projects/foo/tenants/bar/companies/baz" AND status
   * = "EXPIRED" * requisitionId = "req-1" * requisitionId = "req-1" AND status
   * = "EXPIRED"
   */
  filter?: string;
  /**
   * The desired job attributes returned for jobs in the search response.
   * Defaults to JobView.JOB_VIEW_FULL if no value is specified.
   */
  jobView?:  | "JOB_VIEW_UNSPECIFIED" | "JOB_VIEW_ID_ONLY" | "JOB_VIEW_MINIMAL" | "JOB_VIEW_SMALL" | "JOB_VIEW_FULL";
  /**
   * The maximum number of jobs to be returned per page of results. If job_view
   * is set to JobView.JOB_VIEW_ID_ONLY, the maximum allowed page size is 1000.
   * Otherwise, the maximum allowed page size is 100. Default is 100 if empty or
   * a number < 1 is specified.
   */
  pageSize?: number;
  /**
   * The starting point of a query result.
   */
  pageToken?: string;
}

/**
 * Additional options for jobs#projectsTenantsJobsPatch.
 */
export interface ProjectsTenantsJobsPatchOptions {
  /**
   * Strongly recommended for the best service experience. If update_mask is
   * provided, only the specified fields in job are updated. Otherwise all the
   * fields are updated. A field mask to restrict the fields that are updated.
   * Only top level fields of Job are supported.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsTenantsJobsPatchOptions(data: any): ProjectsTenantsJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsTenantsJobsPatchOptions(data: any): ProjectsTenantsJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for jobs#projectsTenantsList.
 */
export interface ProjectsTenantsListOptions {
  /**
   * The maximum number of tenants to be returned, at most 100. Default is 100
   * if a non-positive number is provided.
   */
  pageSize?: number;
  /**
   * The starting indicator from which to return results.
   */
  pageToken?: string;
}

/**
 * Additional options for jobs#projectsTenantsPatch.
 */
export interface ProjectsTenantsPatchOptions {
  /**
   * Strongly recommended for the best service experience. If update_mask is
   * provided, only the specified fields in tenant are updated. Otherwise all
   * the fields are updated. A field mask to specify the tenant fields to be
   * updated. Only top level fields of Tenant are supported.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsTenantsPatchOptions(data: any): ProjectsTenantsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsTenantsPatchOptions(data: any): ProjectsTenantsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Meta information related to the job searcher or entity conducting the job
 * search. This information is used to improve the performance of the service.
 */
export interface RequestMetadata {
  /**
   * Only set when any of domain, session_id and user_id isn't available for
   * some reason. It is highly recommended not to set this field and provide
   * accurate domain, session_id and user_id for the best service experience.
   */
  allowMissingIds?: boolean;
  /**
   * The type of device used by the job seeker at the time of the call to the
   * service.
   */
  deviceInfo?: DeviceInfo;
  /**
   * Required if allow_missing_ids is unset or `false`. The client-defined
   * scope or source of the service call, which typically is the domain on which
   * the service has been implemented and is currently being run. For example,
   * if the service is being run by client *Foo, Inc.*, on job board www.foo.com
   * and career site www.bar.com, then this field is set to "foo.com" for use on
   * the job board, and "bar.com" for use on the career site. Note that any
   * improvements to the model for a particular tenant site rely on this field
   * being set correctly to a unique domain. The maximum number of allowed
   * characters is 255.
   */
  domain?: string;
  /**
   * Required if allow_missing_ids is unset or `false`. A unique session
   * identification string. A session is defined as the duration of an end
   * user's interaction with the service over a certain period. Obfuscate this
   * field for privacy concerns before providing it to the service. Note that
   * any improvements to the model for a particular tenant site rely on this
   * field being set correctly to a unique session ID. The maximum number of
   * allowed characters is 255.
   */
  sessionId?: string;
  /**
   * Required if allow_missing_ids is unset or `false`. A unique user
   * identification string, as determined by the client. To have the strongest
   * positive impact on search quality make sure the client-level is unique.
   * Obfuscate this field for privacy concerns before providing it to the
   * service. Note that any improvements to the model for a particular tenant
   * site rely on this field being set correctly to a unique user ID. The
   * maximum number of allowed characters is 255.
   */
  userId?: string;
}

/**
 * Additional information returned to client, such as debugging information.
 */
export interface ResponseMetadata {
  /**
   * A unique id associated with this call. This id is logged for tracking
   * purposes.
   */
  requestId?: string;
}

/**
 * The Request body of the `SearchJobs` call.
 */
export interface SearchJobsRequest {
  /**
   * Controls over how job documents get ranked on top of existing relevance
   * score (determined by API algorithm).
   */
  customRankingInfo?: CustomRankingInfo;
  /**
   * This field is deprecated. Please use SearchJobsRequest.keyword_match_mode
   * going forward. To migrate, disable_keyword_match set to false maps to
   * KeywordMatchMode.KEYWORD_MATCH_ALL, and disable_keyword_match set to true
   * maps to KeywordMatchMode.KEYWORD_MATCH_DISABLED. If
   * SearchJobsRequest.keyword_match_mode is set, this field is ignored.
   * Controls whether to disable exact keyword match on Job.title,
   * Job.description, Job.company_display_name, Job.addresses,
   * Job.qualifications. When disable keyword match is turned off, a keyword
   * match returns jobs that do not match given category filters when there are
   * matching keywords. For example, for the query "program manager," a result
   * is returned even if the job posting has the title "software developer,"
   * which doesn't fall into "program manager" ontology, but does have "program
   * manager" appearing in its description. For queries like "cloud" that don't
   * contain title or location specific ontology, jobs with "cloud" keyword
   * matches are returned regardless of this flag's value. Use
   * Company.keyword_searchable_job_custom_attributes if company-specific
   * globally matched custom field/attribute string values are needed. Enabling
   * keyword match improves recall of subsequent search requests. Defaults to
   * false.
   */
  disableKeywordMatch?: boolean;
  /**
   * Controls whether highly similar jobs are returned next to each other in
   * the search results. Jobs are identified as highly similar based on their
   * titles, job categories, and locations. Highly similar results are clustered
   * so that only one representative job of the cluster is displayed to the job
   * seeker higher up in the results, with the other jobs being displayed lower
   * down in the results. Defaults to DiversificationLevel.SIMPLE if no value is
   * specified.
   */
  diversificationLevel?:  | "DIVERSIFICATION_LEVEL_UNSPECIFIED" | "DISABLED" | "SIMPLE" | "ONE_PER_COMPANY" | "TWO_PER_COMPANY" | "DIVERSIFY_BY_LOOSER_SIMILARITY";
  /**
   * Controls whether to broaden the search when it produces sparse results.
   * Broadened queries append results to the end of the matching results list.
   * Defaults to false.
   */
  enableBroadening?: boolean;
  /**
   * An expression specifies a histogram request against matching jobs.
   * Expression syntax is an aggregation function call with histogram facets and
   * other options. Available aggregation function calls are: *
   * `count(string_histogram_facet)`: Count the number of matching entities, for
   * each distinct attribute value. * `count(numeric_histogram_facet, list of
   * buckets)`: Count the number of matching entities within each bucket. A
   * maximum of 200 histogram buckets are supported. Data types: * Histogram
   * facet: facet names with format `a-zA-Z+`. * String: string like "any string
   * with backslash escape for quote(\")." * Number: whole number and floating
   * point number like 10, -1 and -0.01. * List: list of elements with comma(,)
   * separator surrounded by square brackets, for example, [1, 2, 3] and ["one",
   * "two", "three"]. Built-in constants: * MIN (minimum number similar to java
   * Double.MIN_VALUE) * MAX (maximum number similar to java Double.MAX_VALUE)
   * Built-in functions: * bucket(start, end[, label]): bucket built-in function
   * creates a bucket with range of start, end). Note that the end is exclusive,
   * for example, bucket(1, MAX, "positive number") or bucket(1, 10). Job
   * histogram facets: * company_display_name: histogram by
   * [Job.company_display_name. * employment_type: histogram by
   * Job.employment_types, for example, "FULL_TIME", "PART_TIME". * company_size
   * (DEPRECATED): histogram by CompanySize, for example, "SMALL", "MEDIUM",
   * "BIG". * publish_time_in_day: histogram by the Job.posting_publish_time in
   * days. Must specify list of numeric buckets in spec. *
   * publish_time_in_month: histogram by the Job.posting_publish_time in months.
   * Must specify list of numeric buckets in spec. * publish_time_in_year:
   * histogram by the Job.posting_publish_time in years. Must specify list of
   * numeric buckets in spec. * degree_types: histogram by the Job.degree_types,
   * for example, "Bachelors", "Masters". * job_level: histogram by the
   * Job.job_level, for example, "Entry Level". * country: histogram by the
   * country code of jobs, for example, "US", "FR". * admin1: histogram by the
   * admin1 code of jobs, which is a global placeholder referring to the state,
   * province, or the particular term a country uses to define the geographic
   * structure below the country level, for example, "CA", "IL". * city:
   * histogram by a combination of the "city name, admin1 code". For example,
   * "Mountain View, CA", "New York, NY". * admin1_country: histogram by a
   * combination of the "admin1 code, country", for example, "CA, US", "IL, US".
   * * city_coordinate: histogram by the city center's GPS coordinates (latitude
   * and longitude), for example, 37.4038522,-122.0987765. Since the coordinates
   * of a city center can change, customers may need to refresh them
   * periodically. * locale: histogram by the Job.language_code, for example,
   * "en-US", "fr-FR". * language: histogram by the language subtag of the
   * Job.language_code, for example, "en", "fr". * category: histogram by the
   * JobCategory, for example, "COMPUTER_AND_IT", "HEALTHCARE". *
   * base_compensation_unit: histogram by the CompensationInfo.CompensationUnit
   * of base salary, for example, "WEEKLY", "MONTHLY". * base_compensation:
   * histogram by the base salary. Must specify list of numeric buckets to group
   * results by. * annualized_base_compensation: histogram by the base
   * annualized salary. Must specify list of numeric buckets to group results
   * by. * annualized_total_compensation: histogram by the total annualized
   * salary. Must specify list of numeric buckets to group results by. *
   * string_custom_attribute: histogram by string Job.custom_attributes. Values
   * can be accessed via square bracket notations like
   * string_custom_attribute["key1"]. * numeric_custom_attribute: histogram by
   * numeric Job.custom_attributes. Values can be accessed via square bracket
   * notations like numeric_custom_attribute["key1"]. Must specify list of
   * numeric buckets to group results by. Example expressions: * `count(admin1)`
   * * `count(base_compensation, [bucket(1000, 10000), bucket(10000, 100000),
   * bucket(100000, MAX)])` *
   * `count(string_custom_attribute["some-string-custom-attribute"])` *
   * `count(numeric_custom_attribute["some-numeric-custom-attribute"],
   * [bucket(MIN, 0, "negative"), bucket(0, MAX, "non-negative")])`
   */
  histogramQueries?: HistogramQuery[];
  /**
   * Query used to search against jobs, such as keyword, location filters, etc.
   */
  jobQuery?: JobQuery;
  /**
   * The desired job attributes returned for jobs in the search response.
   * Defaults to JobView.JOB_VIEW_SMALL if no value is specified.
   */
  jobView?:  | "JOB_VIEW_UNSPECIFIED" | "JOB_VIEW_ID_ONLY" | "JOB_VIEW_MINIMAL" | "JOB_VIEW_SMALL" | "JOB_VIEW_FULL";
  /**
   * Controls what keyword match options to use. If both keyword_match_mode and
   * disable_keyword_match are set, keyword_match_mode will take precedence.
   * Defaults to KeywordMatchMode.KEYWORD_MATCH_ALL if no value is specified.
   */
  keywordMatchMode?:  | "KEYWORD_MATCH_MODE_UNSPECIFIED" | "KEYWORD_MATCH_DISABLED" | "KEYWORD_MATCH_ALL" | "KEYWORD_MATCH_TITLE_ONLY";
  /**
   * A limit on the number of jobs returned in the search results. Increasing
   * this value above the default value of 10 can increase search response time.
   * The value can be between 1 and 100.
   */
  maxPageSize?: number;
  /**
   * An integer that specifies the current offset (that is, starting result
   * location, amongst the jobs deemed by the API as relevant) in search
   * results. This field is only considered if page_token is unset. The maximum
   * allowed value is 5000. Otherwise an error is thrown. For example, 0 means
   * to return results starting from the first matching job, and 10 means to
   * return from the 11th job. This can be used for pagination, (for example,
   * pageSize = 10 and offset = 10 means to return from the second page).
   */
  offset?: number;
  /**
   * The criteria determining how search results are sorted. Default is
   * `"relevance desc"`. Supported options are: * `"relevance desc"`: By
   * relevance descending, as determined by the API algorithms. Relevance
   * thresholding of query results is only available with this ordering. *
   * `"posting_publish_time desc"`: By Job.posting_publish_time descending. *
   * `"posting_update_time desc"`: By Job.posting_update_time descending. *
   * `"title"`: By Job.title ascending. * `"title desc"`: By Job.title
   * descending. * `"annualized_base_compensation"`: By job's
   * CompensationInfo.annualized_base_compensation_range ascending. Jobs whose
   * annualized base compensation is unspecified are put at the end of search
   * results. * `"annualized_base_compensation desc"`: By job's
   * CompensationInfo.annualized_base_compensation_range descending. Jobs whose
   * annualized base compensation is unspecified are put at the end of search
   * results. * `"annualized_total_compensation"`: By job's
   * CompensationInfo.annualized_total_compensation_range ascending. Jobs whose
   * annualized base compensation is unspecified are put at the end of search
   * results. * `"annualized_total_compensation desc"`: By job's
   * CompensationInfo.annualized_total_compensation_range descending. Jobs whose
   * annualized base compensation is unspecified are put at the end of search
   * results. * `"custom_ranking desc"`: By the relevance score adjusted to the
   * SearchJobsRequest.CustomRankingInfo.ranking_expression with weight factor
   * assigned by SearchJobsRequest.CustomRankingInfo.importance_level in
   * descending order. * Location sorting: Use the special syntax to order jobs
   * by distance: `"distance_from('Hawaii')"`: Order by distance from Hawaii.
   * `"distance_from(19.89, 155.5)"`: Order by distance from a coordinate.
   * `"distance_from('Hawaii'), distance_from('Puerto Rico')"`: Order by
   * multiple locations. See details below. `"distance_from('Hawaii'),
   * distance_from(19.89, 155.5)"`: Order by multiple locations. See details
   * below. The string can have a maximum of 256 characters. When multiple
   * distance centers are provided, a job that is close to any of the distance
   * centers would have a high rank. When a job has multiple locations, the job
   * location closest to one of the distance centers will be used. Jobs that
   * don't have locations will be ranked at the bottom. Distance is calculated
   * with a precision of 11.3 meters (37.4 feet). Diversification strategy is
   * still applied unless explicitly disabled in diversification_level.
   */
  orderBy?: string;
  /**
   * The token specifying the current offset within search results. See
   * SearchJobsResponse.next_page_token for an explanation of how to obtain the
   * next set of query results.
   */
  pageToken?: string;
  /**
   * Required. The meta information collected about the job searcher, used to
   * improve the search quality of the service. The identifiers (such as
   * `user_id`) are provided by users, and must be unique and consistent.
   */
  requestMetadata?: RequestMetadata;
  /**
   * Mode of a search. Defaults to SearchMode.JOB_SEARCH.
   */
  searchMode?:  | "SEARCH_MODE_UNSPECIFIED" | "JOB_SEARCH" | "FEATURED_JOB_SEARCH";
}

function serializeSearchJobsRequest(data: any): SearchJobsRequest {
  return {
    ...data,
    jobQuery: data["jobQuery"] !== undefined ? serializeJobQuery(data["jobQuery"]) : undefined,
  };
}

function deserializeSearchJobsRequest(data: any): SearchJobsRequest {
  return {
    ...data,
    jobQuery: data["jobQuery"] !== undefined ? deserializeJobQuery(data["jobQuery"]) : undefined,
  };
}

/**
 * Response for SearchJob method.
 */
export interface SearchJobsResponse {
  /**
   * If query broadening is enabled, we may append additional results from the
   * broadened query. This number indicates how many of the jobs returned in the
   * jobs field are from the broadened query. These results are always at the
   * end of the jobs list. In particular, a value of 0, or if the field isn't
   * set, all the jobs in the jobs list are from the original (without
   * broadening) query. If this field is non-zero, subsequent requests with
   * offset after this result set should contain all broadened results.
   */
  broadenedQueryJobsCount?: number;
  /**
   * The histogram results that match with specified
   * SearchJobsRequest.histogram_queries.
   */
  histogramQueryResults?: HistogramQueryResult[];
  /**
   * The location filters that the service applied to the specified query. If
   * any filters are lat-lng based, the Location.location_type is
   * Location.LocationType.LOCATION_TYPE_UNSPECIFIED.
   */
  locationFilters?: Location[];
  /**
   * The Job entities that match the specified SearchJobsRequest.
   */
  matchingJobs?: MatchingJob[];
  /**
   * Additional information for the API invocation, such as the request
   * tracking id.
   */
  metadata?: ResponseMetadata;
  /**
   * The token that specifies the starting position of the next page of
   * results. This field is empty if there are no more results.
   */
  nextPageToken?: string;
  /**
   * The spell checking result, and correction.
   */
  spellCorrection?: SpellingCorrection;
  /**
   * Number of jobs that match the specified query. Note: This size is precise
   * only if the total is less than 100,000.
   */
  totalSize?: number;
}

function serializeSearchJobsResponse(data: any): SearchJobsResponse {
  return {
    ...data,
    histogramQueryResults: data["histogramQueryResults"] !== undefined ? data["histogramQueryResults"].map((item: any) => (serializeHistogramQueryResult(item))) : undefined,
    matchingJobs: data["matchingJobs"] !== undefined ? data["matchingJobs"].map((item: any) => (serializeMatchingJob(item))) : undefined,
  };
}

function deserializeSearchJobsResponse(data: any): SearchJobsResponse {
  return {
    ...data,
    histogramQueryResults: data["histogramQueryResults"] !== undefined ? data["histogramQueryResults"].map((item: any) => (deserializeHistogramQueryResult(item))) : undefined,
    matchingJobs: data["matchingJobs"] !== undefined ? data["matchingJobs"].map((item: any) => (deserializeMatchingJob(item))) : undefined,
  };
}

/**
 * Spell check result.
 */
export interface SpellingCorrection {
  /**
   * Indicates if the query was corrected by the spell checker.
   */
  corrected?: boolean;
  /**
   * Corrected output with html tags to highlight the corrected words.
   * Corrected words are called out with the "*...*" html tags. For example, the
   * user input query is "software enginear", where the second word, "enginear,"
   * is incorrect. It should be "engineer". When spelling correction is enabled,
   * this value is "software *engineer*".
   */
  correctedHtml?: string;
  /**
   * Correction output consisting of the corrected keyword string.
   */
  correctedText?: string;
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
 * A Tenant resource represents a tenant in the service. A tenant is a group or
 * entity that shares common access with specific privileges for resources like
 * jobs. Customer may create multiple tenants to provide data isolation for
 * different groups.
 */
export interface Tenant {
  /**
   * Required. Client side tenant identifier, used to uniquely identify the
   * tenant. The maximum number of allowed characters is 255.
   */
  externalId?: string;
  /**
   * Required during tenant update. The resource name for a tenant. This is
   * generated by the service when a tenant is created. The format is
   * "projects/{project_id}/tenants/{tenant_id}", for example,
   * "projects/foo/tenants/bar".
   */
  name?: string;
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
 * Message representing a period of time between two timestamps.
 */
export interface TimestampRange {
  /**
   * End of the period (exclusive).
   */
  endTime?: Date;
  /**
   * Begin of the period (inclusive).
   */
  startTime?: Date;
}

function serializeTimestampRange(data: any): TimestampRange {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeTimestampRange(data: any): TimestampRange {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}