// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Dataflow API Client for Deno
 * ============================
 * 
 * Manages Google Cloud Dataflow projects on Google Cloud Platform.
 * 
 * Docs: https://cloud.google.com/dataflow
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages Google Cloud Dataflow projects on Google Cloud Platform.
 */
export class Dataflow {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://dataflow.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Deletes a snapshot.
   *
   * @param projectId The ID of the Cloud Platform project that the snapshot belongs to.
   */
  async projectsDeleteSnapshots(projectId: string, opts: ProjectsDeleteSnapshotsOptions = {}): Promise<DeleteSnapshotResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/snapshots`);
    if (opts.location !== undefined) {
      url.searchParams.append("location", String(opts.location));
    }
    if (opts.snapshotId !== undefined) {
      url.searchParams.append("snapshotId", String(opts.snapshotId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as DeleteSnapshotResponse;
  }

  /**
   * List the jobs of a project across all regions.
   *
   * @param projectId The project which owns the jobs.
   */
  async projectsJobsAggregated(projectId: string, opts: ProjectsJobsAggregatedOptions = {}): Promise<ListJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/jobs:aggregated`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.location !== undefined) {
      url.searchParams.append("location", String(opts.location));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
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
    return deserializeListJobsResponse(data);
  }

  /**
   * Creates a Cloud Dataflow job. To create a job, we recommend using
   * `projects.locations.jobs.create` with a [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using
   * `projects.jobs.create` is not recommended, as your job will always start in
   * `us-central1`. Do not enter confidential information when you supply string
   * values using the API.
   *
   * @param projectId The ID of the Cloud Platform project that the job belongs to.
   */
  async projectsJobsCreate(projectId: string, req: Job, opts: ProjectsJobsCreateOptions = {}): Promise<Job> {
    req = serializeJob(req);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/jobs`);
    if (opts.location !== undefined) {
      url.searchParams.append("location", String(opts.location));
    }
    if (opts.replaceJobId !== undefined) {
      url.searchParams.append("replaceJobId", String(opts.replaceJobId));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeJob(data);
  }

  /**
   * Get encoded debug configuration for component. Not cacheable.
   *
   * @param jobId The job id.
   * @param projectId The project id.
   */
  async projectsJobsDebugGetConfig(jobId: string, projectId: string, req: GetDebugConfigRequest): Promise<GetDebugConfigResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/jobs/${ jobId }/debug/getConfig`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GetDebugConfigResponse;
  }

  /**
   * Send encoded debug capture data for component.
   *
   * @param jobId The job id.
   * @param projectId The project id.
   */
  async projectsJobsDebugSendCapture(jobId: string, projectId: string, req: SendDebugCaptureRequest): Promise<SendDebugCaptureResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/jobs/${ jobId }/debug/sendCapture`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SendDebugCaptureResponse;
  }

  /**
   * Gets the state of the specified Cloud Dataflow job. To get the state of a
   * job, we recommend using `projects.locations.jobs.get` with a [regional
   * endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using
   * `projects.jobs.get` is not recommended, as you can only get the state of
   * jobs that are running in `us-central1`.
   *
   * @param jobId The job ID.
   * @param projectId The ID of the Cloud Platform project that the job belongs to.
   */
  async projectsJobsGet(jobId: string, projectId: string, opts: ProjectsJobsGetOptions = {}): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/jobs/${ jobId }`);
    if (opts.location !== undefined) {
      url.searchParams.append("location", String(opts.location));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeJob(data);
  }

  /**
   * Request the job status. To request the status of a job, we recommend using
   * `projects.locations.jobs.getMetrics` with a [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using
   * `projects.jobs.getMetrics` is not recommended, as you can only request the
   * status of jobs that are running in `us-central1`.
   *
   * @param jobId The job to get metrics for.
   * @param projectId A project id.
   */
  async projectsJobsGetMetrics(jobId: string, projectId: string, opts: ProjectsJobsGetMetricsOptions = {}): Promise<JobMetrics> {
    opts = serializeProjectsJobsGetMetricsOptions(opts);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/jobs/${ jobId }/metrics`);
    if (opts.location !== undefined) {
      url.searchParams.append("location", String(opts.location));
    }
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeJobMetrics(data);
  }

  /**
   * List the jobs of a project. To list the jobs of a project in a region, we
   * recommend using `projects.locations.jobs.list` with a [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). To
   * list the all jobs across all regions, use `projects.jobs.aggregated`. Using
   * `projects.jobs.list` is not recommended, as you can only get the list of
   * jobs that are running in `us-central1`.
   *
   * @param projectId The project which owns the jobs.
   */
  async projectsJobsList(projectId: string, opts: ProjectsJobsListOptions = {}): Promise<ListJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/jobs`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.location !== undefined) {
      url.searchParams.append("location", String(opts.location));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
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
    return deserializeListJobsResponse(data);
  }

  /**
   * Request the job status. To request the status of a job, we recommend using
   * `projects.locations.jobs.messages.list` with a [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using
   * `projects.jobs.messages.list` is not recommended, as you can only request
   * the status of jobs that are running in `us-central1`.
   *
   * @param jobId The job to get messages about.
   * @param projectId A project id.
   */
  async projectsJobsMessagesList(jobId: string, projectId: string, opts: ProjectsJobsMessagesListOptions = {}): Promise<ListJobMessagesResponse> {
    opts = serializeProjectsJobsMessagesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/jobs/${ jobId }/messages`);
    if (opts.endTime !== undefined) {
      url.searchParams.append("endTime", String(opts.endTime));
    }
    if (opts.location !== undefined) {
      url.searchParams.append("location", String(opts.location));
    }
    if (opts.minimumImportance !== undefined) {
      url.searchParams.append("minimumImportance", String(opts.minimumImportance));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListJobMessagesResponse(data);
  }

  /**
   * Snapshot the state of a streaming job.
   *
   * @param jobId The job to be snapshotted.
   * @param projectId The project which owns the job to be snapshotted.
   */
  async projectsJobsSnapshot(jobId: string, projectId: string, req: SnapshotJobRequest): Promise<Snapshot> {
    req = serializeSnapshotJobRequest(req);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/jobs/${ jobId }:snapshot`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSnapshot(data);
  }

  /**
   * Updates the state of an existing Cloud Dataflow job. To update the state
   * of an existing job, we recommend using `projects.locations.jobs.update`
   * with a [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using
   * `projects.jobs.update` is not recommended, as you can only update the state
   * of jobs that are running in `us-central1`.
   *
   * @param jobId The job ID.
   * @param projectId The ID of the Cloud Platform project that the job belongs to.
   */
  async projectsJobsUpdate(jobId: string, projectId: string, req: Job, opts: ProjectsJobsUpdateOptions = {}): Promise<Job> {
    req = serializeJob(req);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/jobs/${ jobId }`);
    if (opts.location !== undefined) {
      url.searchParams.append("location", String(opts.location));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeJob(data);
  }

  /**
   * Leases a dataflow WorkItem to run.
   *
   * @param jobId Identifies the workflow job this worker belongs to.
   * @param projectId Identifies the project this worker belongs to.
   */
  async projectsJobsWorkItemsLease(jobId: string, projectId: string, req: LeaseWorkItemRequest): Promise<LeaseWorkItemResponse> {
    req = serializeLeaseWorkItemRequest(req);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/jobs/${ jobId }/workItems:lease`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLeaseWorkItemResponse(data);
  }

  /**
   * Reports the status of dataflow WorkItems leased by a worker.
   *
   * @param jobId The job which the WorkItem is part of.
   * @param projectId The project which owns the WorkItem's job.
   */
  async projectsJobsWorkItemsReportStatus(jobId: string, projectId: string, req: ReportWorkItemStatusRequest): Promise<ReportWorkItemStatusResponse> {
    req = serializeReportWorkItemStatusRequest(req);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/jobs/${ jobId }/workItems:reportStatus`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeReportWorkItemStatusResponse(data);
  }

  /**
   * Launch a job with a FlexTemplate.
   *
   * @param location Required. The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request. E.g., us-central1, us-west1.
   * @param projectId Required. The ID of the Cloud Platform project that the job belongs to.
   */
  async projectsLocationsFlexTemplatesLaunch(location: string, projectId: string, req: LaunchFlexTemplateRequest): Promise<LaunchFlexTemplateResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/flexTemplates:launch`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLaunchFlexTemplateResponse(data);
  }

  /**
   * Creates a Cloud Dataflow job. To create a job, we recommend using
   * `projects.locations.jobs.create` with a [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using
   * `projects.jobs.create` is not recommended, as your job will always start in
   * `us-central1`. Do not enter confidential information when you supply string
   * values using the API.
   *
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job.
   * @param projectId The ID of the Cloud Platform project that the job belongs to.
   */
  async projectsLocationsJobsCreate(location: string, projectId: string, req: Job, opts: ProjectsLocationsJobsCreateOptions = {}): Promise<Job> {
    req = serializeJob(req);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs`);
    if (opts.replaceJobId !== undefined) {
      url.searchParams.append("replaceJobId", String(opts.replaceJobId));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeJob(data);
  }

  /**
   * Get encoded debug configuration for component. Not cacheable.
   *
   * @param jobId The job id.
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id.
   * @param projectId The project id.
   */
  async projectsLocationsJobsDebugGetConfig(jobId: string, location: string, projectId: string, req: GetDebugConfigRequest): Promise<GetDebugConfigResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs/${ jobId }/debug/getConfig`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GetDebugConfigResponse;
  }

  /**
   * Send encoded debug capture data for component.
   *
   * @param jobId The job id.
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id.
   * @param projectId The project id.
   */
  async projectsLocationsJobsDebugSendCapture(jobId: string, location: string, projectId: string, req: SendDebugCaptureRequest): Promise<SendDebugCaptureResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs/${ jobId }/debug/sendCapture`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SendDebugCaptureResponse;
  }

  /**
   * Gets the state of the specified Cloud Dataflow job. To get the state of a
   * job, we recommend using `projects.locations.jobs.get` with a [regional
   * endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using
   * `projects.jobs.get` is not recommended, as you can only get the state of
   * jobs that are running in `us-central1`.
   *
   * @param jobId The job ID.
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job.
   * @param projectId The ID of the Cloud Platform project that the job belongs to.
   */
  async projectsLocationsJobsGet(jobId: string, location: string, projectId: string, opts: ProjectsLocationsJobsGetOptions = {}): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs/${ jobId }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeJob(data);
  }

  /**
   * Request detailed information about the execution status of the job.
   * EXPERIMENTAL. This API is subject to change or removal without notice.
   *
   * @param jobId The job to get execution details for.
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id.
   * @param projectId A project id.
   */
  async projectsLocationsJobsGetExecutionDetails(jobId: string, location: string, projectId: string, opts: ProjectsLocationsJobsGetExecutionDetailsOptions = {}): Promise<JobExecutionDetails> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs/${ jobId }/executionDetails`);
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
    return deserializeJobExecutionDetails(data);
  }

  /**
   * Request the job status. To request the status of a job, we recommend using
   * `projects.locations.jobs.getMetrics` with a [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using
   * `projects.jobs.getMetrics` is not recommended, as you can only request the
   * status of jobs that are running in `us-central1`.
   *
   * @param jobId The job to get metrics for.
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id.
   * @param projectId A project id.
   */
  async projectsLocationsJobsGetMetrics(jobId: string, location: string, projectId: string, opts: ProjectsLocationsJobsGetMetricsOptions = {}): Promise<JobMetrics> {
    opts = serializeProjectsLocationsJobsGetMetricsOptions(opts);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs/${ jobId }/metrics`);
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeJobMetrics(data);
  }

  /**
   * List the jobs of a project. To list the jobs of a project in a region, we
   * recommend using `projects.locations.jobs.list` with a [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). To
   * list the all jobs across all regions, use `projects.jobs.aggregated`. Using
   * `projects.jobs.list` is not recommended, as you can only get the list of
   * jobs that are running in `us-central1`.
   *
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job.
   * @param projectId The project which owns the jobs.
   */
  async projectsLocationsJobsList(location: string, projectId: string, opts: ProjectsLocationsJobsListOptions = {}): Promise<ListJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
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
    return deserializeListJobsResponse(data);
  }

  /**
   * Request the job status. To request the status of a job, we recommend using
   * `projects.locations.jobs.messages.list` with a [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using
   * `projects.jobs.messages.list` is not recommended, as you can only request
   * the status of jobs that are running in `us-central1`.
   *
   * @param jobId The job to get messages about.
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id.
   * @param projectId A project id.
   */
  async projectsLocationsJobsMessagesList(jobId: string, location: string, projectId: string, opts: ProjectsLocationsJobsMessagesListOptions = {}): Promise<ListJobMessagesResponse> {
    opts = serializeProjectsLocationsJobsMessagesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs/${ jobId }/messages`);
    if (opts.endTime !== undefined) {
      url.searchParams.append("endTime", String(opts.endTime));
    }
    if (opts.minimumImportance !== undefined) {
      url.searchParams.append("minimumImportance", String(opts.minimumImportance));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListJobMessagesResponse(data);
  }

  /**
   * Snapshot the state of a streaming job.
   *
   * @param jobId The job to be snapshotted.
   * @param location The location that contains this job.
   * @param projectId The project which owns the job to be snapshotted.
   */
  async projectsLocationsJobsSnapshot(jobId: string, location: string, projectId: string, req: SnapshotJobRequest): Promise<Snapshot> {
    req = serializeSnapshotJobRequest(req);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs/${ jobId }:snapshot`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSnapshot(data);
  }

  /**
   * Lists snapshots.
   *
   * @param jobId If specified, list snapshots created from this job.
   * @param location The location to list snapshots in.
   * @param projectId The project ID to list snapshots for.
   */
  async projectsLocationsJobsSnapshotsList(jobId: string, location: string, projectId: string): Promise<ListSnapshotsResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs/${ jobId }/snapshots`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListSnapshotsResponse(data);
  }

  /**
   * Request detailed information about the execution status of a stage of the
   * job. EXPERIMENTAL. This API is subject to change or removal without notice.
   *
   * @param jobId The job to get execution details for.
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job specified by job_id.
   * @param projectId A project id.
   * @param stageId The stage for which to fetch information.
   */
  async projectsLocationsJobsStagesGetExecutionDetails(jobId: string, location: string, projectId: string, stageId: string, opts: ProjectsLocationsJobsStagesGetExecutionDetailsOptions = {}): Promise<StageExecutionDetails> {
    opts = serializeProjectsLocationsJobsStagesGetExecutionDetailsOptions(opts);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs/${ jobId }/stages/${ stageId }/executionDetails`);
    if (opts.endTime !== undefined) {
      url.searchParams.append("endTime", String(opts.endTime));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.startTime !== undefined) {
      url.searchParams.append("startTime", String(opts.startTime));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeStageExecutionDetails(data);
  }

  /**
   * Updates the state of an existing Cloud Dataflow job. To update the state
   * of an existing job, we recommend using `projects.locations.jobs.update`
   * with a [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints). Using
   * `projects.jobs.update` is not recommended, as you can only update the state
   * of jobs that are running in `us-central1`.
   *
   * @param jobId The job ID.
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains this job.
   * @param projectId The ID of the Cloud Platform project that the job belongs to.
   */
  async projectsLocationsJobsUpdate(jobId: string, location: string, projectId: string, req: Job): Promise<Job> {
    req = serializeJob(req);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs/${ jobId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeJob(data);
  }

  /**
   * Leases a dataflow WorkItem to run.
   *
   * @param jobId Identifies the workflow job this worker belongs to.
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the WorkItem's job.
   * @param projectId Identifies the project this worker belongs to.
   */
  async projectsLocationsJobsWorkItemsLease(jobId: string, location: string, projectId: string, req: LeaseWorkItemRequest): Promise<LeaseWorkItemResponse> {
    req = serializeLeaseWorkItemRequest(req);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs/${ jobId }/workItems:lease`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeLeaseWorkItemResponse(data);
  }

  /**
   * Reports the status of dataflow WorkItems leased by a worker.
   *
   * @param jobId The job which the WorkItem is part of.
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the WorkItem's job.
   * @param projectId The project which owns the WorkItem's job.
   */
  async projectsLocationsJobsWorkItemsReportStatus(jobId: string, location: string, projectId: string, req: ReportWorkItemStatusRequest): Promise<ReportWorkItemStatusResponse> {
    req = serializeReportWorkItemStatusRequest(req);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/jobs/${ jobId }/workItems:reportStatus`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeReportWorkItemStatusResponse(data);
  }

  /**
   * Deletes a snapshot.
   *
   * @param location The location that contains this snapshot.
   * @param projectId The ID of the Cloud Platform project that the snapshot belongs to.
   * @param snapshotId The ID of the snapshot.
   */
  async projectsLocationsSnapshotsDelete(location: string, projectId: string, snapshotId: string): Promise<DeleteSnapshotResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/snapshots/${ snapshotId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as DeleteSnapshotResponse;
  }

  /**
   * Gets information about a snapshot.
   *
   * @param location The location that contains this snapshot.
   * @param projectId The ID of the Cloud Platform project that the snapshot belongs to.
   * @param snapshotId The ID of the snapshot.
   */
  async projectsLocationsSnapshotsGet(location: string, projectId: string, snapshotId: string): Promise<Snapshot> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/snapshots/${ snapshotId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSnapshot(data);
  }

  /**
   * Lists snapshots.
   *
   * @param location The location to list snapshots in.
   * @param projectId The project ID to list snapshots for.
   */
  async projectsLocationsSnapshotsList(location: string, projectId: string, opts: ProjectsLocationsSnapshotsListOptions = {}): Promise<ListSnapshotsResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/snapshots`);
    if (opts.jobId !== undefined) {
      url.searchParams.append("jobId", String(opts.jobId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListSnapshotsResponse(data);
  }

  /**
   * Creates a Cloud Dataflow job from a template. Do not enter confidential
   * information when you supply string values using the API.
   *
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request.
   * @param projectId Required. The ID of the Cloud Platform project that the job belongs to.
   */
  async projectsLocationsTemplatesCreate(location: string, projectId: string, req: CreateJobFromTemplateRequest): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/templates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeJob(data);
  }

  /**
   * Get the template associated with a template.
   *
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request.
   * @param projectId Required. The ID of the Cloud Platform project that the job belongs to.
   */
  async projectsLocationsTemplatesGet(location: string, projectId: string, opts: ProjectsLocationsTemplatesGetOptions = {}): Promise<GetTemplateResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/templates:get`);
    if (opts.gcsPath !== undefined) {
      url.searchParams.append("gcsPath", String(opts.gcsPath));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GetTemplateResponse;
  }

  /**
   * Launch a template.
   *
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to which to direct the request.
   * @param projectId Required. The ID of the Cloud Platform project that the job belongs to.
   */
  async projectsLocationsTemplatesLaunch(location: string, projectId: string, req: LaunchTemplateParameters, opts: ProjectsLocationsTemplatesLaunchOptions = {}): Promise<LaunchTemplateResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/templates:launch`);
    if (opts["dynamicTemplate.gcsPath"] !== undefined) {
      url.searchParams.append("dynamicTemplate.gcsPath", String(opts["dynamicTemplate.gcsPath"]));
    }
    if (opts["dynamicTemplate.stagingLocation"] !== undefined) {
      url.searchParams.append("dynamicTemplate.stagingLocation", String(opts["dynamicTemplate.stagingLocation"]));
    }
    if (opts.gcsPath !== undefined) {
      url.searchParams.append("gcsPath", String(opts.gcsPath));
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
    return deserializeLaunchTemplateResponse(data);
  }

  /**
   * Send a worker_message to the service.
   *
   * @param location The [regional endpoint] (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that contains the job.
   * @param projectId The project to send the WorkerMessages to.
   */
  async projectsLocationsWorkerMessages(location: string, projectId: string, req: SendWorkerMessagesRequest): Promise<SendWorkerMessagesResponse> {
    req = serializeSendWorkerMessagesRequest(req);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/locations/${ location }/WorkerMessages`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSendWorkerMessagesResponse(data);
  }

  /**
   * Gets information about a snapshot.
   *
   * @param projectId The ID of the Cloud Platform project that the snapshot belongs to.
   * @param snapshotId The ID of the snapshot.
   */
  async projectsSnapshotsGet(projectId: string, snapshotId: string, opts: ProjectsSnapshotsGetOptions = {}): Promise<Snapshot> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/snapshots/${ snapshotId }`);
    if (opts.location !== undefined) {
      url.searchParams.append("location", String(opts.location));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSnapshot(data);
  }

  /**
   * Lists snapshots.
   *
   * @param projectId The project ID to list snapshots for.
   */
  async projectsSnapshotsList(projectId: string, opts: ProjectsSnapshotsListOptions = {}): Promise<ListSnapshotsResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/snapshots`);
    if (opts.jobId !== undefined) {
      url.searchParams.append("jobId", String(opts.jobId));
    }
    if (opts.location !== undefined) {
      url.searchParams.append("location", String(opts.location));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListSnapshotsResponse(data);
  }

  /**
   * Creates a Cloud Dataflow job from a template. Do not enter confidential
   * information when you supply string values using the API.
   *
   * @param projectId Required. The ID of the Cloud Platform project that the job belongs to.
   */
  async projectsTemplatesCreate(projectId: string, req: CreateJobFromTemplateRequest): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/templates`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeJob(data);
  }

  /**
   * Get the template associated with a template.
   *
   * @param projectId Required. The ID of the Cloud Platform project that the job belongs to.
   */
  async projectsTemplatesGet(projectId: string, opts: ProjectsTemplatesGetOptions = {}): Promise<GetTemplateResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/templates:get`);
    if (opts.gcsPath !== undefined) {
      url.searchParams.append("gcsPath", String(opts.gcsPath));
    }
    if (opts.location !== undefined) {
      url.searchParams.append("location", String(opts.location));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GetTemplateResponse;
  }

  /**
   * Launch a template.
   *
   * @param projectId Required. The ID of the Cloud Platform project that the job belongs to.
   */
  async projectsTemplatesLaunch(projectId: string, req: LaunchTemplateParameters, opts: ProjectsTemplatesLaunchOptions = {}): Promise<LaunchTemplateResponse> {
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/templates:launch`);
    if (opts["dynamicTemplate.gcsPath"] !== undefined) {
      url.searchParams.append("dynamicTemplate.gcsPath", String(opts["dynamicTemplate.gcsPath"]));
    }
    if (opts["dynamicTemplate.stagingLocation"] !== undefined) {
      url.searchParams.append("dynamicTemplate.stagingLocation", String(opts["dynamicTemplate.stagingLocation"]));
    }
    if (opts.gcsPath !== undefined) {
      url.searchParams.append("gcsPath", String(opts.gcsPath));
    }
    if (opts.location !== undefined) {
      url.searchParams.append("location", String(opts.location));
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
    return deserializeLaunchTemplateResponse(data);
  }

  /**
   * Send a worker_message to the service.
   *
   * @param projectId The project to send the WorkerMessages to.
   */
  async projectsWorkerMessages(projectId: string, req: SendWorkerMessagesRequest): Promise<SendWorkerMessagesResponse> {
    req = serializeSendWorkerMessagesRequest(req);
    const url = new URL(`${this.#baseUrl}v1b3/projects/${ projectId }/WorkerMessages`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSendWorkerMessagesResponse(data);
  }
}

/**
 * Obsolete in favor of ApproximateReportedProgress and
 * ApproximateSplitRequest.
 */
export interface ApproximateProgress {
  /**
   * Obsolete.
   */
  percentComplete?: number;
  /**
   * Obsolete.
   */
  position?: Position;
  /**
   * Obsolete.
   */
  remainingTime?: number /* Duration */;
}

function serializeApproximateProgress(data: any): ApproximateProgress {
  return {
    ...data,
    position: data["position"] !== undefined ? serializePosition(data["position"]) : undefined,
    remainingTime: data["remainingTime"] !== undefined ? data["remainingTime"] : undefined,
  };
}

function deserializeApproximateProgress(data: any): ApproximateProgress {
  return {
    ...data,
    position: data["position"] !== undefined ? deserializePosition(data["position"]) : undefined,
    remainingTime: data["remainingTime"] !== undefined ? data["remainingTime"] : undefined,
  };
}

/**
 * A progress measurement of a WorkItem by a worker.
 */
export interface ApproximateReportedProgress {
  /**
   * Total amount of parallelism in the portion of input of this task that has
   * already been consumed and is no longer active. In the first two examples
   * above (see remaining_parallelism), the value should be 29 or 2
   * respectively. The sum of remaining_parallelism and consumed_parallelism
   * should equal the total amount of parallelism in this work item. If
   * specified, must be finite.
   */
  consumedParallelism?: ReportedParallelism;
  /**
   * Completion as fraction of the input consumed, from 0.0 (beginning, nothing
   * consumed), to 1.0 (end of the input, entire input consumed).
   */
  fractionConsumed?: number;
  /**
   * A Position within the work to represent a progress.
   */
  position?: Position;
  /**
   * Total amount of parallelism in the input of this task that remains, (i.e.
   * can be delegated to this task and any new tasks via dynamic splitting).
   * Always at least 1 for non-finished work items and 0 for finished. "Amount
   * of parallelism" refers to how many non-empty parts of the input can be read
   * in parallel. This does not necessarily equal number of records. An input
   * that can be read in parallel down to the individual records is called
   * "perfectly splittable". An example of non-perfectly parallelizable input is
   * a block-compressed file format where a block of records has to be read as a
   * whole, but different blocks can be read in parallel. Examples: * If we are
   * processing record #30 (starting at 1) out of 50 in a perfectly splittable
   * 50-record input, this value should be 21 (20 remaining + 1 current). * If
   * we are reading through block 3 in a block-compressed file consisting of 5
   * blocks, this value should be 3 (since blocks 4 and 5 can be processed in
   * parallel by new tasks via dynamic splitting and the current task remains
   * processing block 3). * If we are reading through the last block in a
   * block-compressed file, or reading or processing the last record in a
   * perfectly splittable input, this value should be 1, because apart from the
   * current task, no additional remainder can be split off.
   */
  remainingParallelism?: ReportedParallelism;
}

function serializeApproximateReportedProgress(data: any): ApproximateReportedProgress {
  return {
    ...data,
    position: data["position"] !== undefined ? serializePosition(data["position"]) : undefined,
  };
}

function deserializeApproximateReportedProgress(data: any): ApproximateReportedProgress {
  return {
    ...data,
    position: data["position"] !== undefined ? deserializePosition(data["position"]) : undefined,
  };
}

/**
 * A suggestion by the service to the worker to dynamically split the WorkItem.
 */
export interface ApproximateSplitRequest {
  /**
   * A fraction at which to split the work item, from 0.0 (beginning of the
   * input) to 1.0 (end of the input).
   */
  fractionConsumed?: number;
  /**
   * The fraction of the remainder of work to split the work item at, from 0.0
   * (split at the current position) to 1.0 (end of the input).
   */
  fractionOfRemainder?: number;
  /**
   * A Position at which to split the work item.
   */
  position?: Position;
}

function serializeApproximateSplitRequest(data: any): ApproximateSplitRequest {
  return {
    ...data,
    position: data["position"] !== undefined ? serializePosition(data["position"]) : undefined,
  };
}

function deserializeApproximateSplitRequest(data: any): ApproximateSplitRequest {
  return {
    ...data,
    position: data["position"] !== undefined ? deserializePosition(data["position"]) : undefined,
  };
}

/**
 * A structured message reporting an autoscaling decision made by the Dataflow
 * service.
 */
export interface AutoscalingEvent {
  /**
   * The current number of workers the job has.
   */
  currentNumWorkers?: bigint;
  /**
   * A message describing why the system decided to adjust the current number
   * of workers, why it failed, or why the system decided to not make any
   * changes to the number of workers.
   */
  description?: StructuredMessage;
  /**
   * The type of autoscaling event to report.
   */
  eventType?:  | "TYPE_UNKNOWN" | "TARGET_NUM_WORKERS_CHANGED" | "CURRENT_NUM_WORKERS_CHANGED" | "ACTUATION_FAILURE" | "NO_CHANGE";
  /**
   * The target number of workers the worker pool wants to resize to use.
   */
  targetNumWorkers?: bigint;
  /**
   * The time this event was emitted to indicate a new target or current
   * num_workers value.
   */
  time?: Date;
  /**
   * A short and friendly name for the worker pool this event refers to.
   */
  workerPool?: string;
}

function serializeAutoscalingEvent(data: any): AutoscalingEvent {
  return {
    ...data,
    currentNumWorkers: data["currentNumWorkers"] !== undefined ? String(data["currentNumWorkers"]) : undefined,
    targetNumWorkers: data["targetNumWorkers"] !== undefined ? String(data["targetNumWorkers"]) : undefined,
    time: data["time"] !== undefined ? data["time"].toISOString() : undefined,
  };
}

function deserializeAutoscalingEvent(data: any): AutoscalingEvent {
  return {
    ...data,
    currentNumWorkers: data["currentNumWorkers"] !== undefined ? BigInt(data["currentNumWorkers"]) : undefined,
    targetNumWorkers: data["targetNumWorkers"] !== undefined ? BigInt(data["targetNumWorkers"]) : undefined,
    time: data["time"] !== undefined ? new Date(data["time"]) : undefined,
  };
}

/**
 * Settings for WorkerPool autoscaling.
 */
export interface AutoscalingSettings {
  /**
   * The algorithm to use for autoscaling.
   */
  algorithm?:  | "AUTOSCALING_ALGORITHM_UNKNOWN" | "AUTOSCALING_ALGORITHM_NONE" | "AUTOSCALING_ALGORITHM_BASIC";
  /**
   * The maximum number of workers to cap scaling at.
   */
  maxNumWorkers?: number;
}

/**
 * Metadata for a BigQuery connector used by the job.
 */
export interface BigQueryIODetails {
  /**
   * Dataset accessed in the connection.
   */
  dataset?: string;
  /**
   * Project accessed in the connection.
   */
  projectId?: string;
  /**
   * Query used to access data in the connection.
   */
  query?: string;
  /**
   * Table accessed in the connection.
   */
  table?: string;
}

/**
 * Metadata for a Cloud Bigtable connector used by the job.
 */
export interface BigTableIODetails {
  /**
   * InstanceId accessed in the connection.
   */
  instanceId?: string;
  /**
   * ProjectId accessed in the connection.
   */
  projectId?: string;
  /**
   * TableId accessed in the connection.
   */
  tableId?: string;
}

/**
 * Description of an interstitial value between transforms in an execution
 * stage.
 */
export interface ComponentSource {
  /**
   * Dataflow service generated name for this source.
   */
  name?: string;
  /**
   * User name for the original user transform or collection with which this
   * source is most closely associated.
   */
  originalTransformOrCollection?: string;
  /**
   * Human-readable name for this transform; may be user or system generated.
   */
  userName?: string;
}

/**
 * Description of a transform executed as part of an execution stage.
 */
export interface ComponentTransform {
  /**
   * Dataflow service generated name for this source.
   */
  name?: string;
  /**
   * User name for the original user transform with which this transform is
   * most closely associated.
   */
  originalTransform?: string;
  /**
   * Human-readable name for this transform; may be user or system generated.
   */
  userName?: string;
}

/**
 * All configuration data for a particular Computation.
 */
export interface ComputationTopology {
  /**
   * The ID of the computation.
   */
  computationId?: string;
  /**
   * The inputs to the computation.
   */
  inputs?: StreamLocation[];
  /**
   * The key ranges processed by the computation.
   */
  keyRanges?: KeyRangeLocation[];
  /**
   * The outputs from the computation.
   */
  outputs?: StreamLocation[];
  /**
   * The state family values.
   */
  stateFamilies?: StateFamilyConfig[];
  /**
   * The system stage name.
   */
  systemStageName?: string;
}

/**
 * A position that encapsulates an inner position and an index for the inner
 * position. A ConcatPosition can be used by a reader of a source that
 * encapsulates a set of other sources.
 */
export interface ConcatPosition {
  /**
   * Index of the inner source.
   */
  index?: number;
  /**
   * Position within the inner source.
   */
  position?: Position;
}

function serializeConcatPosition(data: any): ConcatPosition {
  return {
    ...data,
    position: data["position"] !== undefined ? serializePosition(data["position"]) : undefined,
  };
}

function deserializeConcatPosition(data: any): ConcatPosition {
  return {
    ...data,
    position: data["position"] !== undefined ? deserializePosition(data["position"]) : undefined,
  };
}

/**
 * Container Spec.
 */
export interface ContainerSpec {
  /**
   * Default runtime environment for the job.
   */
  defaultEnvironment?: FlexTemplateRuntimeEnvironment;
  /**
   * Name of the docker container image. E.g., gcr.io/project/some-image
   */
  image?: string;
  /**
   * Cloud Storage path to self-signed certificate of private registry.
   */
  imageRepositoryCertPath?: string;
  /**
   * Secret Manager secret id for password to authenticate to private registry.
   */
  imageRepositoryPasswordSecretId?: string;
  /**
   * Secret Manager secret id for username to authenticate to private registry.
   */
  imageRepositoryUsernameSecretId?: string;
  /**
   * Metadata describing a template including description and validation rules.
   */
  metadata?: TemplateMetadata;
  /**
   * Required. SDK info of the Flex Template.
   */
  sdkInfo?: SDKInfo;
}

/**
 * CounterMetadata includes all static non-name non-value counter attributes.
 */
export interface CounterMetadata {
  /**
   * Human-readable description of the counter semantics.
   */
  description?: string;
  /**
   * Counter aggregation kind.
   */
  kind?:  | "INVALID" | "SUM" | "MAX" | "MIN" | "MEAN" | "OR" | "AND" | "SET" | "DISTRIBUTION" | "LATEST_VALUE";
  /**
   * A string referring to the unit type.
   */
  otherUnits?: string;
  /**
   * System defined Units, see above enum.
   */
  standardUnits?:  | "BYTES" | "BYTES_PER_SEC" | "MILLISECONDS" | "MICROSECONDS" | "NANOSECONDS" | "TIMESTAMP_MSEC" | "TIMESTAMP_USEC" | "TIMESTAMP_NSEC";
}

/**
 * Identifies a counter within a per-job namespace. Counters whose structured
 * names are the same get merged into a single value for the job.
 */
export interface CounterStructuredName {
  /**
   * Name of the optimized step being executed by the workers.
   */
  componentStepName?: string;
  /**
   * Name of the stage. An execution step contains multiple component steps.
   */
  executionStepName?: string;
  /**
   * Index of an input collection that's being read from/written to as a side
   * input. The index identifies a step's side inputs starting by 1 (e.g. the
   * first side input has input_index 1, the third has input_index 3). Side
   * inputs are identified by a pair of (original_step_name, input_index). This
   * field helps uniquely identify them.
   */
  inputIndex?: number;
  /**
   * Counter name. Not necessarily globally-unique, but unique within the
   * context of the other fields. Required.
   */
  name?: string;
  /**
   * One of the standard Origins defined above.
   */
  origin?:  | "SYSTEM" | "USER";
  /**
   * The step name requesting an operation, such as GBK. I.e. the ParDo causing
   * a read/write from shuffle to occur, or a read from side inputs.
   */
  originalRequestingStepName?: string;
  /**
   * System generated name of the original step in the user's graph, before
   * optimization.
   */
  originalStepName?: string;
  /**
   * A string containing a more specific namespace of the counter's origin.
   */
  originNamespace?: string;
  /**
   * Portion of this counter, either key or value.
   */
  portion?:  | "ALL" | "KEY" | "VALUE";
  /**
   * ID of a particular worker.
   */
  workerId?: string;
}

/**
 * A single message which encapsulates structured name and metadata for a given
 * counter.
 */
export interface CounterStructuredNameAndMetadata {
  /**
   * Metadata associated with a counter
   */
  metadata?: CounterMetadata;
  /**
   * Structured name of the counter.
   */
  name?: CounterStructuredName;
}

/**
 * An update to a Counter sent from a worker.
 */
export interface CounterUpdate {
  /**
   * Boolean value for And, Or.
   */
  boolean?: boolean;
  /**
   * True if this counter is reported as the total cumulative aggregate value
   * accumulated since the worker started working on this WorkItem. By default
   * this is false, indicating that this counter is reported as a delta.
   */
  cumulative?: boolean;
  /**
   * Distribution data
   */
  distribution?: DistributionUpdate;
  /**
   * Floating point value for Sum, Max, Min.
   */
  floatingPoint?: number;
  /**
   * List of floating point numbers, for Set.
   */
  floatingPointList?: FloatingPointList;
  /**
   * Floating point mean aggregation value for Mean.
   */
  floatingPointMean?: FloatingPointMean;
  /**
   * Integer value for Sum, Max, Min.
   */
  integer?: SplitInt64;
  /**
   * Gauge data
   */
  integerGauge?: IntegerGauge;
  /**
   * List of integers, for Set.
   */
  integerList?: IntegerList;
  /**
   * Integer mean aggregation value for Mean.
   */
  integerMean?: IntegerMean;
  /**
   * Value for internally-defined counters used by the Dataflow service.
   */
  internal?: any;
  /**
   * Counter name and aggregation type.
   */
  nameAndKind?: NameAndKind;
  /**
   * The service-generated short identifier for this counter. The short_id ->
   * (name, metadata) mapping is constant for the lifetime of a job.
   */
  shortId?: bigint;
  /**
   * List of strings, for Set.
   */
  stringList?: StringList;
  /**
   * Counter structured name and metadata.
   */
  structuredNameAndMetadata?: CounterStructuredNameAndMetadata;
}

function serializeCounterUpdate(data: any): CounterUpdate {
  return {
    ...data,
    distribution: data["distribution"] !== undefined ? serializeDistributionUpdate(data["distribution"]) : undefined,
    integerGauge: data["integerGauge"] !== undefined ? serializeIntegerGauge(data["integerGauge"]) : undefined,
    shortId: data["shortId"] !== undefined ? String(data["shortId"]) : undefined,
  };
}

function deserializeCounterUpdate(data: any): CounterUpdate {
  return {
    ...data,
    distribution: data["distribution"] !== undefined ? deserializeDistributionUpdate(data["distribution"]) : undefined,
    integerGauge: data["integerGauge"] !== undefined ? deserializeIntegerGauge(data["integerGauge"]) : undefined,
    shortId: data["shortId"] !== undefined ? BigInt(data["shortId"]) : undefined,
  };
}

/**
 * Modeled after information exposed by /proc/stat.
 */
export interface CPUTime {
  /**
   * Average CPU utilization rate (% non-idle cpu / second) since previous
   * sample.
   */
  rate?: number;
  /**
   * Timestamp of the measurement.
   */
  timestamp?: Date;
  /**
   * Total active CPU time across all cores (ie., non-idle) in milliseconds
   * since start-up.
   */
  totalMs?: bigint;
}

function serializeCPUTime(data: any): CPUTime {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
    totalMs: data["totalMs"] !== undefined ? String(data["totalMs"]) : undefined,
  };
}

function deserializeCPUTime(data: any): CPUTime {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
    totalMs: data["totalMs"] !== undefined ? BigInt(data["totalMs"]) : undefined,
  };
}

/**
 * A request to create a Cloud Dataflow job from a template.
 */
export interface CreateJobFromTemplateRequest {
  /**
   * The runtime environment for the job.
   */
  environment?: RuntimeEnvironment;
  /**
   * Required. A Cloud Storage path to the template from which to create the
   * job. Must be a valid Cloud Storage URL, beginning with `gs://`.
   */
  gcsPath?: string;
  /**
   * Required. The job name to use for the created job.
   */
  jobName?: string;
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to
   * which to direct the request.
   */
  location?: string;
  /**
   * The runtime parameters to pass to the job.
   */
  parameters?: {
    [key: string]: string
  };
}

/**
 * Identifies the location of a custom souce.
 */
export interface CustomSourceLocation {
  /**
   * Whether this source is stateful.
   */
  stateful?: boolean;
}

/**
 * Data disk assignment for a given VM instance.
 */
export interface DataDiskAssignment {
  /**
   * Mounted data disks. The order is important a data disk's 0-based index in
   * this list defines which persistent directory the disk is mounted to, for
   * example the list of { "myproject-1014-104817-4c2-harness-0-disk-0" }, {
   * "myproject-1014-104817-4c2-harness-0-disk-1" }.
   */
  dataDisks?: string[];
  /**
   * VM instance name the data disks mounted to, for example
   * "myproject-1014-104817-4c2-harness-0".
   */
  vmInstance?: string;
}

/**
 * Metadata for a Datastore connector used by the job.
 */
export interface DatastoreIODetails {
  /**
   * Namespace used in the connection.
   */
  namespace?: string;
  /**
   * ProjectId accessed in the connection.
   */
  projectId?: string;
}

/**
 * Describes any options that have an effect on the debugging of pipelines.
 */
export interface DebugOptions {
  /**
   * When true, enables the logging of the literal hot key to the user's Cloud
   * Logging.
   */
  enableHotKeyLogging?: boolean;
}

/**
 * Response from deleting a snapshot.
 */
export interface DeleteSnapshotResponse {
}

/**
 * Specification of one of the bundles produced as a result of splitting a
 * Source (e.g. when executing a SourceSplitRequest, or when splitting an active
 * task using WorkItemStatus.dynamic_source_split), relative to the source being
 * split.
 */
export interface DerivedSource {
  /**
   * What source to base the produced source on (if any).
   */
  derivationMode?:  | "SOURCE_DERIVATION_MODE_UNKNOWN" | "SOURCE_DERIVATION_MODE_INDEPENDENT" | "SOURCE_DERIVATION_MODE_CHILD_OF_CURRENT" | "SOURCE_DERIVATION_MODE_SIBLING_OF_CURRENT";
  /**
   * Specification of the source.
   */
  source?: Source;
}

function serializeDerivedSource(data: any): DerivedSource {
  return {
    ...data,
    source: data["source"] !== undefined ? serializeSource(data["source"]) : undefined,
  };
}

function deserializeDerivedSource(data: any): DerivedSource {
  return {
    ...data,
    source: data["source"] !== undefined ? deserializeSource(data["source"]) : undefined,
  };
}

/**
 * Describes the data disk used by a workflow job.
 */
export interface Disk {
  /**
   * Disk storage type, as defined by Google Compute Engine. This must be a
   * disk type appropriate to the project and zone in which the workers will
   * run. If unknown or unspecified, the service will attempt to choose a
   * reasonable default. For example, the standard persistent disk type is a
   * resource name typically ending in "pd-standard". If SSD persistent disks
   * are available, the resource name typically ends with "pd-ssd". The actual
   * valid values are defined the Google Compute Engine API, not by the Cloud
   * Dataflow API; consult the Google Compute Engine documentation for more
   * information about determining the set of available disk types for a
   * particular project and zone. Google Compute Engine Disk types are local to
   * a particular project in a particular zone, and so the resource name will
   * typically look something like this:
   * compute.googleapis.com/projects/project-id/zones/zone/diskTypes/pd-standard
   */
  diskType?: string;
  /**
   * Directory in a VM where disk is mounted.
   */
  mountPoint?: string;
  /**
   * Size of disk in GB. If zero or unspecified, the service will attempt to
   * choose a reasonable default.
   */
  sizeGb?: number;
}

/**
 * Data provided with a pipeline or transform to provide descriptive info.
 */
export interface DisplayData {
  /**
   * Contains value if the data is of a boolean type.
   */
  boolValue?: boolean;
  /**
   * Contains value if the data is of duration type.
   */
  durationValue?: number /* Duration */;
  /**
   * Contains value if the data is of float type.
   */
  floatValue?: number;
  /**
   * Contains value if the data is of int64 type.
   */
  int64Value?: bigint;
  /**
   * Contains value if the data is of java class type.
   */
  javaClassValue?: string;
  /**
   * The key identifying the display data. This is intended to be used as a
   * label for the display data when viewed in a dax monitoring system.
   */
  key?: string;
  /**
   * An optional label to display in a dax UI for the element.
   */
  label?: string;
  /**
   * The namespace for the key. This is usually a class name or programming
   * language namespace (i.e. python module) which defines the display data.
   * This allows a dax monitoring system to specially handle the data and
   * perform custom rendering.
   */
  namespace?: string;
  /**
   * A possible additional shorter value to display. For example a
   * java_class_name_value of com.mypackage.MyDoFn will be stored with MyDoFn as
   * the short_str_value and com.mypackage.MyDoFn as the java_class_name value.
   * short_str_value can be displayed and java_class_name_value will be
   * displayed as a tooltip.
   */
  shortStrValue?: string;
  /**
   * Contains value if the data is of string type.
   */
  strValue?: string;
  /**
   * Contains value if the data is of timestamp type.
   */
  timestampValue?: Date;
  /**
   * An optional full URL.
   */
  url?: string;
}

function serializeDisplayData(data: any): DisplayData {
  return {
    ...data,
    durationValue: data["durationValue"] !== undefined ? data["durationValue"] : undefined,
    int64Value: data["int64Value"] !== undefined ? String(data["int64Value"]) : undefined,
    timestampValue: data["timestampValue"] !== undefined ? data["timestampValue"].toISOString() : undefined,
  };
}

function deserializeDisplayData(data: any): DisplayData {
  return {
    ...data,
    durationValue: data["durationValue"] !== undefined ? data["durationValue"] : undefined,
    int64Value: data["int64Value"] !== undefined ? BigInt(data["int64Value"]) : undefined,
    timestampValue: data["timestampValue"] !== undefined ? new Date(data["timestampValue"]) : undefined,
  };
}

/**
 * A metric value representing a distribution.
 */
export interface DistributionUpdate {
  /**
   * The count of the number of elements present in the distribution.
   */
  count?: SplitInt64;
  /**
   * (Optional) Histogram of value counts for the distribution.
   */
  histogram?: Histogram;
  /**
   * The maximum value present in the distribution.
   */
  max?: SplitInt64;
  /**
   * The minimum value present in the distribution.
   */
  min?: SplitInt64;
  /**
   * Use an int64 since we'd prefer the added precision. If overflow is a
   * common problem we can detect it and use an additional int64 or a double.
   */
  sum?: SplitInt64;
  /**
   * Use a double since the sum of squares is likely to overflow int64.
   */
  sumOfSquares?: number;
}

function serializeDistributionUpdate(data: any): DistributionUpdate {
  return {
    ...data,
    histogram: data["histogram"] !== undefined ? serializeHistogram(data["histogram"]) : undefined,
  };
}

function deserializeDistributionUpdate(data: any): DistributionUpdate {
  return {
    ...data,
    histogram: data["histogram"] !== undefined ? deserializeHistogram(data["histogram"]) : undefined,
  };
}

/**
 * When a task splits using WorkItemStatus.dynamic_source_split, this message
 * describes the two parts of the split relative to the description of the
 * current task's input.
 */
export interface DynamicSourceSplit {
  /**
   * Primary part (continued to be processed by worker). Specified relative to
   * the previously-current source. Becomes current.
   */
  primary?: DerivedSource;
  /**
   * Residual part (returned to the pool of work). Specified relative to the
   * previously-current source.
   */
  residual?: DerivedSource;
}

function serializeDynamicSourceSplit(data: any): DynamicSourceSplit {
  return {
    ...data,
    primary: data["primary"] !== undefined ? serializeDerivedSource(data["primary"]) : undefined,
    residual: data["residual"] !== undefined ? serializeDerivedSource(data["residual"]) : undefined,
  };
}

function deserializeDynamicSourceSplit(data: any): DynamicSourceSplit {
  return {
    ...data,
    primary: data["primary"] !== undefined ? deserializeDerivedSource(data["primary"]) : undefined,
    residual: data["residual"] !== undefined ? deserializeDerivedSource(data["residual"]) : undefined,
  };
}

/**
 * Describes the environment in which a Dataflow Job runs.
 */
export interface Environment {
  /**
   * The type of cluster manager API to use. If unknown or unspecified, the
   * service will attempt to choose a reasonable default. This should be in the
   * form of the API service name, e.g. "compute.googleapis.com".
   */
  clusterManagerApiService?: string;
  /**
   * The dataset for the current project where various workflow related tables
   * are stored. The supported resource type is: Google BigQuery:
   * bigquery.googleapis.com/{dataset}
   */
  dataset?: string;
  /**
   * Any debugging options to be supplied to the job.
   */
  debugOptions?: DebugOptions;
  /**
   * The list of experiments to enable. This field should be used for SDK
   * related experiments and not for service related experiments. The proper
   * field for service related experiments is service_options.
   */
  experiments?: string[];
  /**
   * Which Flexible Resource Scheduling mode to run in.
   */
  flexResourceSchedulingGoal?:  | "FLEXRS_UNSPECIFIED" | "FLEXRS_SPEED_OPTIMIZED" | "FLEXRS_COST_OPTIMIZED";
  /**
   * Experimental settings.
   */
  internalExperiments?: {
    [key: string]: any
  };
  /**
   * The Cloud Dataflow SDK pipeline options specified by the user. These
   * options are passed through the service and are used to recreate the SDK
   * pipeline options on the worker in a language agnostic and platform
   * independent way.
   */
  sdkPipelineOptions?: {
    [key: string]: any
  };
  /**
   * Identity to run virtual machines as. Defaults to the default account.
   */
  serviceAccountEmail?: string;
  /**
   * If set, contains the Cloud KMS key identifier used to encrypt data at
   * rest, AKA a Customer Managed Encryption Key (CMEK). Format:
   * projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY
   */
  serviceKmsKeyName?: string;
  /**
   * The list of service options to enable. This field should be used for
   * service related experiments only. These experiments, when graduating to GA,
   * should be replaced by dedicated fields or become default (i.e. always on).
   */
  serviceOptions?: string[];
  /**
   * Output only. The shuffle mode used for the job.
   */
  readonly shuffleMode?:  | "SHUFFLE_MODE_UNSPECIFIED" | "VM_BASED" | "SERVICE_BASED";
  /**
   * The prefix of the resources the system should use for temporary storage.
   * The system will append the suffix "/temp-{JOBNAME} to this resource prefix,
   * where {JOBNAME} is the value of the job_name field. The resulting bucket
   * and object prefix is used as the prefix of the resources used to store
   * temporary data needed during the job execution. NOTE: This will override
   * the value in taskrunner_settings. The supported resource type is: Google
   * Cloud Storage: storage.googleapis.com/{bucket}/{object}
   * bucket.storage.googleapis.com/{object}
   */
  tempStoragePrefix?: string;
  /**
   * A description of the process that generated the request.
   */
  userAgent?: {
    [key: string]: any
  };
  /**
   * A structure describing which components and their versions of the service
   * are required in order to run the job.
   */
  version?: {
    [key: string]: any
  };
  /**
   * The worker pools. At least one "harness" worker pool must be specified in
   * order for the job to have workers.
   */
  workerPools?: WorkerPool[];
  /**
   * The Compute Engine region
   * (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in
   * which worker processing should occur, e.g. "us-west1". Mutually exclusive
   * with worker_zone. If neither worker_region nor worker_zone is specified,
   * default to the control plane's region.
   */
  workerRegion?: string;
  /**
   * The Compute Engine zone
   * (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in
   * which worker processing should occur, e.g. "us-west1-a". Mutually exclusive
   * with worker_region. If neither worker_region nor worker_zone is specified,
   * a zone in the control plane's region is chosen based on available capacity.
   */
  workerZone?: string;
}

/**
 * A message describing the state of a particular execution stage.
 */
export interface ExecutionStageState {
  /**
   * The time at which the stage transitioned to this state.
   */
  currentStateTime?: Date;
  /**
   * The name of the execution stage.
   */
  executionStageName?: string;
  /**
   * Executions stage states allow the same set of values as JobState.
   */
  executionStageState?:  | "JOB_STATE_UNKNOWN" | "JOB_STATE_STOPPED" | "JOB_STATE_RUNNING" | "JOB_STATE_DONE" | "JOB_STATE_FAILED" | "JOB_STATE_CANCELLED" | "JOB_STATE_UPDATED" | "JOB_STATE_DRAINING" | "JOB_STATE_DRAINED" | "JOB_STATE_PENDING" | "JOB_STATE_CANCELLING" | "JOB_STATE_QUEUED" | "JOB_STATE_RESOURCE_CLEANING_UP";
}

function serializeExecutionStageState(data: any): ExecutionStageState {
  return {
    ...data,
    currentStateTime: data["currentStateTime"] !== undefined ? data["currentStateTime"].toISOString() : undefined,
  };
}

function deserializeExecutionStageState(data: any): ExecutionStageState {
  return {
    ...data,
    currentStateTime: data["currentStateTime"] !== undefined ? new Date(data["currentStateTime"]) : undefined,
  };
}

/**
 * Description of the composing transforms, names/ids, and input/outputs of a
 * stage of execution. Some composing transforms and sources may have been
 * generated by the Dataflow service during execution planning.
 */
export interface ExecutionStageSummary {
  /**
   * Collections produced and consumed by component transforms of this stage.
   */
  componentSource?: ComponentSource[];
  /**
   * Transforms that comprise this execution stage.
   */
  componentTransform?: ComponentTransform[];
  /**
   * Dataflow service generated id for this stage.
   */
  id?: string;
  /**
   * Input sources for this stage.
   */
  inputSource?: StageSource[];
  /**
   * Type of transform this stage is executing.
   */
  kind?:  | "UNKNOWN_KIND" | "PAR_DO_KIND" | "GROUP_BY_KEY_KIND" | "FLATTEN_KIND" | "READ_KIND" | "WRITE_KIND" | "CONSTANT_KIND" | "SINGLETON_KIND" | "SHUFFLE_KIND";
  /**
   * Dataflow service generated name for this stage.
   */
  name?: string;
  /**
   * Output sources for this stage.
   */
  outputSource?: StageSource[];
  /**
   * Other stages that must complete before this stage can run.
   */
  prerequisiteStage?: string[];
}

function serializeExecutionStageSummary(data: any): ExecutionStageSummary {
  return {
    ...data,
    inputSource: data["inputSource"] !== undefined ? data["inputSource"].map((item: any) => (serializeStageSource(item))) : undefined,
    outputSource: data["outputSource"] !== undefined ? data["outputSource"].map((item: any) => (serializeStageSource(item))) : undefined,
  };
}

function deserializeExecutionStageSummary(data: any): ExecutionStageSummary {
  return {
    ...data,
    inputSource: data["inputSource"] !== undefined ? data["inputSource"].map((item: any) => (deserializeStageSource(item))) : undefined,
    outputSource: data["outputSource"] !== undefined ? data["outputSource"].map((item: any) => (deserializeStageSource(item))) : undefined,
  };
}

/**
 * Indicates which [regional endpoint]
 * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) failed
 * to respond to a request for data.
 */
export interface FailedLocation {
  /**
   * The name of the [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * failed to respond.
   */
  name?: string;
}

/**
 * Metadata for a File connector used by the job.
 */
export interface FileIODetails {
  /**
   * File Pattern used to access files by the connector.
   */
  filePattern?: string;
}

/**
 * An instruction that copies its inputs (zero or more) to its (single) output.
 */
export interface FlattenInstruction {
  /**
   * Describes the inputs to the flatten instruction.
   */
  inputs?: InstructionInput[];
}

/**
 * The environment values to be set at runtime for flex template.
 */
export interface FlexTemplateRuntimeEnvironment {
  /**
   * Additional experiment flags for the job.
   */
  additionalExperiments?: string[];
  /**
   * Additional user labels to be specified for the job. Keys and values must
   * follow the restrictions specified in the [labeling
   * restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions)
   * page. An object containing a list of "key": value pairs. Example: { "name":
   * "wrench", "mass": "1kg", "count": "3" }.
   */
  additionalUserLabels?: {
    [key: string]: string
  };
  /**
   * The algorithm to use for autoscaling
   */
  autoscalingAlgorithm?:  | "AUTOSCALING_ALGORITHM_UNKNOWN" | "AUTOSCALING_ALGORITHM_NONE" | "AUTOSCALING_ALGORITHM_BASIC";
  /**
   * Worker disk size, in gigabytes.
   */
  diskSizeGb?: number;
  /**
   * If true, when processing time is spent almost entirely on garbage
   * collection (GC), saves a heap dump before ending the thread or process. If
   * false, ends the thread or process without saving a heap dump. Does not save
   * a heap dump when the Java Virtual Machine (JVM) has an out of memory error
   * during processing. The location of the heap file is either echoed back to
   * the user, or the user is given the opportunity to download the heap file.
   */
  dumpHeapOnOom?: boolean;
  /**
   * If true serial port logging will be enabled for the launcher VM.
   */
  enableLauncherVmSerialPortLogging?: boolean;
  /**
   * Whether to enable Streaming Engine for the job.
   */
  enableStreamingEngine?: boolean;
  /**
   * Set FlexRS goal for the job.
   * https://cloud.google.com/dataflow/docs/guides/flexrs
   */
  flexrsGoal?:  | "FLEXRS_UNSPECIFIED" | "FLEXRS_SPEED_OPTIMIZED" | "FLEXRS_COST_OPTIMIZED";
  /**
   * Configuration for VM IPs.
   */
  ipConfiguration?:  | "WORKER_IP_UNSPECIFIED" | "WORKER_IP_PUBLIC" | "WORKER_IP_PRIVATE";
  /**
   * Name for the Cloud KMS key for the job. Key format is:
   * projects//locations//keyRings//cryptoKeys/
   */
  kmsKeyName?: string;
  /**
   * The machine type to use for launching the job. The default is
   * n1-standard-1.
   */
  launcherMachineType?: string;
  /**
   * The machine type to use for the job. Defaults to the value from the
   * template if not specified.
   */
  machineType?: string;
  /**
   * The maximum number of Google Compute Engine instances to be made available
   * to your pipeline during execution, from 1 to 1000.
   */
  maxWorkers?: number;
  /**
   * Network to which VMs will be assigned. If empty or unspecified, the
   * service will use the network "default".
   */
  network?: string;
  /**
   * The initial number of Google Compute Engine instances for the job.
   */
  numWorkers?: number;
  /**
   * Cloud Storage bucket (directory) to upload heap dumps to. Enabling this
   * field implies that `dump_heap_on_oom` is set to true.
   */
  saveHeapDumpsToGcsPath?: string;
  /**
   * Docker registry location of container image to use for the 'worker
   * harness. Default is the container for the version of the SDK. Note this
   * field is only valid for portable pipelines.
   */
  sdkContainerImage?: string;
  /**
   * The email address of the service account to run the job as.
   */
  serviceAccountEmail?: string;
  /**
   * The Cloud Storage path for staging local files. Must be a valid Cloud
   * Storage URL, beginning with `gs://`.
   */
  stagingLocation?: string;
  /**
   * Subnetwork to which VMs will be assigned, if desired. You can specify a
   * subnetwork using either a complete URL or an abbreviated path. Expected to
   * be of the form
   * "https://www.googleapis.com/compute/v1/projects/HOST_PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK"
   * or "regions/REGION/subnetworks/SUBNETWORK". If the subnetwork is located in
   * a Shared VPC network, you must use the complete URL.
   */
  subnetwork?: string;
  /**
   * The Cloud Storage path to use for temporary files. Must be a valid Cloud
   * Storage URL, beginning with `gs://`.
   */
  tempLocation?: string;
  /**
   * The Compute Engine region
   * (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in
   * which worker processing should occur, e.g. "us-west1". Mutually exclusive
   * with worker_zone. If neither worker_region nor worker_zone is specified,
   * default to the control plane's region.
   */
  workerRegion?: string;
  /**
   * The Compute Engine zone
   * (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in
   * which worker processing should occur, e.g. "us-west1-a". Mutually exclusive
   * with worker_region. If neither worker_region nor worker_zone is specified,
   * a zone in the control plane's region is chosen based on available capacity.
   * If both `worker_zone` and `zone` are set, `worker_zone` takes precedence.
   */
  workerZone?: string;
  /**
   * The Compute Engine [availability
   * zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones)
   * for launching worker instances to run your pipeline. In the future,
   * worker_zone will take precedence.
   */
  zone?: string;
}

/**
 * A metric value representing a list of floating point numbers.
 */
export interface FloatingPointList {
  /**
   * Elements of the list.
   */
  elements?: number[];
}

/**
 * A representation of a floating point mean metric contribution.
 */
export interface FloatingPointMean {
  /**
   * The number of values being aggregated.
   */
  count?: SplitInt64;
  /**
   * The sum of all values being aggregated.
   */
  sum?: number;
}

/**
 * Request to get updated debug configuration for component.
 */
export interface GetDebugConfigRequest {
  /**
   * The internal component id for which debug configuration is requested.
   */
  componentId?: string;
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * contains the job specified by job_id.
   */
  location?: string;
  /**
   * The worker id, i.e., VM hostname.
   */
  workerId?: string;
}

/**
 * Response to a get debug configuration request.
 */
export interface GetDebugConfigResponse {
  /**
   * The encoded debug configuration for the requested component.
   */
  config?: string;
}

/**
 * The response to a GetTemplate request.
 */
export interface GetTemplateResponse {
  /**
   * The template metadata describing the template name, available parameters,
   * etc.
   */
  metadata?: TemplateMetadata;
  /**
   * Describes the runtime metadata with SDKInfo and available parameters.
   */
  runtimeMetadata?: RuntimeMetadata;
  /**
   * The status of the get template request. Any problems with the request will
   * be indicated in the error_details.
   */
  status?: Status;
  /**
   * Template Type.
   */
  templateType?:  | "UNKNOWN" | "LEGACY" | "FLEX";
}

/**
 * Histogram of value counts for a distribution. Buckets have an inclusive
 * lower bound and exclusive upper bound and use "1,2,5 bucketing": The first
 * bucket range is from [0,1) and all subsequent bucket boundaries are powers of
 * ten multiplied by 1, 2, or 5. Thus, bucket boundaries are 0, 1, 2, 5, 10, 20,
 * 50, 100, 200, 500, 1000, ... Negative values are not supported.
 */
export interface Histogram {
  /**
   * Counts of values in each bucket. For efficiency, prefix and trailing
   * buckets with count = 0 are elided. Buckets can store the full range of
   * values of an unsigned long, with ULLONG_MAX falling into the 59th bucket
   * with range [1e19, 2e19).
   */
  bucketCounts?: bigint[];
  /**
   * Starting index of first stored bucket. The non-inclusive upper-bound of
   * the ith bucket is given by: pow(10,(i-first_bucket_offset)/3) *
   * (1,2,5)[(i-first_bucket_offset)%3]
   */
  firstBucketOffset?: number;
}

function serializeHistogram(data: any): Histogram {
  return {
    ...data,
    bucketCounts: data["bucketCounts"] !== undefined ? data["bucketCounts"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeHistogram(data: any): Histogram {
  return {
    ...data,
    bucketCounts: data["bucketCounts"] !== undefined ? data["bucketCounts"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * Information useful for debugging a hot key detection.
 */
export interface HotKeyDebuggingInfo {
  /**
   * Debugging information for each detected hot key. Keyed by a hash of the
   * key.
   */
  detectedHotKeys?: {
    [key: string]: HotKeyInfo
  };
}

function serializeHotKeyDebuggingInfo(data: any): HotKeyDebuggingInfo {
  return {
    ...data,
    detectedHotKeys: data["detectedHotKeys"] !== undefined ? Object.fromEntries(Object.entries(data["detectedHotKeys"]).map(([k, v]: [string, any]) => ([k, serializeHotKeyInfo(v)]))) : undefined,
  };
}

function deserializeHotKeyDebuggingInfo(data: any): HotKeyDebuggingInfo {
  return {
    ...data,
    detectedHotKeys: data["detectedHotKeys"] !== undefined ? Object.fromEntries(Object.entries(data["detectedHotKeys"]).map(([k, v]: [string, any]) => ([k, deserializeHotKeyInfo(v)]))) : undefined,
  };
}

/**
 * Proto describing a hot key detected on a given WorkItem.
 */
export interface HotKeyDetection {
  /**
   * The age of the hot key measured from when it was first detected.
   */
  hotKeyAge?: number /* Duration */;
  /**
   * System-defined name of the step containing this hot key. Unique across the
   * workflow.
   */
  systemName?: string;
  /**
   * User-provided name of the step that contains this hot key.
   */
  userStepName?: string;
}

function serializeHotKeyDetection(data: any): HotKeyDetection {
  return {
    ...data,
    hotKeyAge: data["hotKeyAge"] !== undefined ? data["hotKeyAge"] : undefined,
  };
}

function deserializeHotKeyDetection(data: any): HotKeyDetection {
  return {
    ...data,
    hotKeyAge: data["hotKeyAge"] !== undefined ? data["hotKeyAge"] : undefined,
  };
}

/**
 * Information about a hot key.
 */
export interface HotKeyInfo {
  /**
   * The age of the hot key measured from when it was first detected.
   */
  hotKeyAge?: number /* Duration */;
  /**
   * A detected hot key that is causing limited parallelism. This field will be
   * populated only if the following flag is set to true:
   * "--enable_hot_key_logging".
   */
  key?: string;
  /**
   * If true, then the above key is truncated and cannot be deserialized. This
   * occurs if the key above is populated and the key size is >5MB.
   */
  keyTruncated?: boolean;
}

function serializeHotKeyInfo(data: any): HotKeyInfo {
  return {
    ...data,
    hotKeyAge: data["hotKeyAge"] !== undefined ? data["hotKeyAge"] : undefined,
  };
}

function deserializeHotKeyInfo(data: any): HotKeyInfo {
  return {
    ...data,
    hotKeyAge: data["hotKeyAge"] !== undefined ? data["hotKeyAge"] : undefined,
  };
}

/**
 * An input of an instruction, as a reference to an output of a producer
 * instruction.
 */
export interface InstructionInput {
  /**
   * The output index (origin zero) within the producer.
   */
  outputNum?: number;
  /**
   * The index (origin zero) of the parallel instruction that produces the
   * output to be consumed by this input. This index is relative to the list of
   * instructions in this input's instruction's containing MapTask.
   */
  producerInstructionIndex?: number;
}

/**
 * An output of an instruction.
 */
export interface InstructionOutput {
  /**
   * The codec to use to encode data being written via this output.
   */
  codec?: {
    [key: string]: any
  };
  /**
   * The user-provided name of this output.
   */
  name?: string;
  /**
   * For system-generated byte and mean byte metrics, certain instructions
   * should only report the key size.
   */
  onlyCountKeyBytes?: boolean;
  /**
   * For system-generated byte and mean byte metrics, certain instructions
   * should only report the value size.
   */
  onlyCountValueBytes?: boolean;
  /**
   * System-defined name for this output in the original workflow graph.
   * Outputs that do not contribute to an original instruction do not set this.
   */
  originalName?: string;
  /**
   * System-defined name of this output. Unique across the workflow.
   */
  systemName?: string;
}

/**
 * A metric value representing temporal values of a variable.
 */
export interface IntegerGauge {
  /**
   * The time at which this value was measured. Measured as msecs from epoch.
   */
  timestamp?: Date;
  /**
   * The value of the variable represented by this gauge.
   */
  value?: SplitInt64;
}

function serializeIntegerGauge(data: any): IntegerGauge {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
  };
}

function deserializeIntegerGauge(data: any): IntegerGauge {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
  };
}

/**
 * A metric value representing a list of integers.
 */
export interface IntegerList {
  /**
   * Elements of the list.
   */
  elements?: SplitInt64[];
}

/**
 * A representation of an integer mean metric contribution.
 */
export interface IntegerMean {
  /**
   * The number of values being aggregated.
   */
  count?: SplitInt64;
  /**
   * The sum of all values being aggregated.
   */
  sum?: SplitInt64;
}

/**
 * Defines a job to be run by the Cloud Dataflow service. Do not enter
 * confidential information when you supply string values using the API.
 */
export interface Job {
  /**
   * The client's unique identifier of the job, re-used across retried
   * attempts. If this field is set, the service will ensure its uniqueness. The
   * request to create a job will fail if the service has knowledge of a
   * previously submitted job with the same client's ID and job name. The caller
   * may use this field to ensure idempotence of job creation across retried
   * attempts to create a job. By default, the field is empty and, in that case,
   * the service ignores it.
   */
  clientRequestId?: string;
  /**
   * If this is specified, the job's initial state is populated from the given
   * snapshot.
   */
  createdFromSnapshotId?: string;
  /**
   * The timestamp when the job was initially created. Immutable and set by the
   * Cloud Dataflow service.
   */
  createTime?: Date;
  /**
   * The current state of the job. Jobs are created in the `JOB_STATE_STOPPED`
   * state unless otherwise specified. A job in the `JOB_STATE_RUNNING` state
   * may asynchronously enter a terminal state. After a job has reached a
   * terminal state, no further state updates may be made. This field may be
   * mutated by the Cloud Dataflow service; callers cannot mutate it.
   */
  currentState?:  | "JOB_STATE_UNKNOWN" | "JOB_STATE_STOPPED" | "JOB_STATE_RUNNING" | "JOB_STATE_DONE" | "JOB_STATE_FAILED" | "JOB_STATE_CANCELLED" | "JOB_STATE_UPDATED" | "JOB_STATE_DRAINING" | "JOB_STATE_DRAINED" | "JOB_STATE_PENDING" | "JOB_STATE_CANCELLING" | "JOB_STATE_QUEUED" | "JOB_STATE_RESOURCE_CLEANING_UP";
  /**
   * The timestamp associated with the current state.
   */
  currentStateTime?: Date;
  /**
   * The environment for the job.
   */
  environment?: Environment;
  /**
   * Deprecated.
   */
  executionInfo?: JobExecutionInfo;
  /**
   * The unique ID of this job. This field is set by the Cloud Dataflow service
   * when the Job is created, and is immutable for the life of the job.
   */
  id?: string;
  /**
   * This field is populated by the Dataflow service to support filtering jobs
   * by the metadata values provided here. Populated for ListJobs and all GetJob
   * views SUMMARY and higher.
   */
  jobMetadata?: JobMetadata;
  /**
   * User-defined labels for this job. The labels map can contain no more than
   * 64 entries. Entries of the labels map are UTF8 strings that comply with the
   * following restrictions: * Keys must conform to regexp: \p{Ll}\p{Lo}{0,62} *
   * Values must conform to regexp: [\p{Ll}\p{Lo}\p{N}_-]{0,63} * Both keys and
   * values are additionally constrained to be <= 128 bytes in size.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * contains this job.
   */
  location?: string;
  /**
   * The user-specified Cloud Dataflow job name. Only one Job with a given name
   * can exist in a project within one region at any given time. Jobs in
   * different regions can have the same name. If a caller attempts to create a
   * Job with the same name as an already-existing Job, the attempt returns the
   * existing Job. The name must match the regular expression
   * `[a-z]([-a-z0-9]{0,1022}[a-z0-9])?`
   */
  name?: string;
  /**
   * Preliminary field: The format of this data may change at any time. A
   * description of the user pipeline and stages through which it is executed.
   * Created by Cloud Dataflow service. Only retrieved with JOB_VIEW_DESCRIPTION
   * or JOB_VIEW_ALL.
   */
  pipelineDescription?: PipelineDescription;
  /**
   * The ID of the Cloud Platform project that the job belongs to.
   */
  projectId?: string;
  /**
   * If another job is an update of this job (and thus, this job is in
   * `JOB_STATE_UPDATED`), this field contains the ID of that job.
   */
  replacedByJobId?: string;
  /**
   * If this job is an update of an existing job, this field is the job ID of
   * the job it replaced. When sending a `CreateJobRequest`, you can update a
   * job by specifying it here. The job named here is stopped, and its
   * intermediate state is transferred to this job.
   */
  replaceJobId?: string;
  /**
   * The job's requested state. `UpdateJob` may be used to switch between the
   * `JOB_STATE_STOPPED` and `JOB_STATE_RUNNING` states, by setting
   * requested_state. `UpdateJob` may also be used to directly set a job's
   * requested state to `JOB_STATE_CANCELLED` or `JOB_STATE_DONE`, irrevocably
   * terminating the job if it has not already reached a terminal state.
   */
  requestedState?:  | "JOB_STATE_UNKNOWN" | "JOB_STATE_STOPPED" | "JOB_STATE_RUNNING" | "JOB_STATE_DONE" | "JOB_STATE_FAILED" | "JOB_STATE_CANCELLED" | "JOB_STATE_UPDATED" | "JOB_STATE_DRAINING" | "JOB_STATE_DRAINED" | "JOB_STATE_PENDING" | "JOB_STATE_CANCELLING" | "JOB_STATE_QUEUED" | "JOB_STATE_RESOURCE_CLEANING_UP";
  /**
   * Reserved for future use. This field is set only in responses from the
   * server; it is ignored if it is set in any requests.
   */
  satisfiesPzs?: boolean;
  /**
   * This field may be mutated by the Cloud Dataflow service; callers cannot
   * mutate it.
   */
  stageStates?: ExecutionStageState[];
  /**
   * The timestamp when the job was started (transitioned to
   * JOB_STATE_PENDING). Flexible resource scheduling jobs are started with some
   * delay after job creation, so start_time is unset before start and is
   * updated when the job is started by the Cloud Dataflow service. For other
   * jobs, start_time always equals to create_time and is immutable and set by
   * the Cloud Dataflow service.
   */
  startTime?: Date;
  /**
   * Exactly one of step or steps_location should be specified. The top-level
   * steps that constitute the entire job. Only retrieved with JOB_VIEW_ALL.
   */
  steps?: Step[];
  /**
   * The Cloud Storage location where the steps are stored.
   */
  stepsLocation?: string;
  /**
   * A set of files the system should be aware of that are used for temporary
   * storage. These temporary files will be removed on job completion. No
   * duplicates are allowed. No file patterns are supported. The supported files
   * are: Google Cloud Storage: storage.googleapis.com/{bucket}/{object}
   * bucket.storage.googleapis.com/{object}
   */
  tempFiles?: string[];
  /**
   * The map of transform name prefixes of the job to be replaced to the
   * corresponding name prefixes of the new job.
   */
  transformNameMapping?: {
    [key: string]: string
  };
  /**
   * The type of Cloud Dataflow job.
   */
  type?:  | "JOB_TYPE_UNKNOWN" | "JOB_TYPE_BATCH" | "JOB_TYPE_STREAMING";
}

function serializeJob(data: any): Job {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    currentStateTime: data["currentStateTime"] !== undefined ? data["currentStateTime"].toISOString() : undefined,
    pipelineDescription: data["pipelineDescription"] !== undefined ? serializePipelineDescription(data["pipelineDescription"]) : undefined,
    stageStates: data["stageStates"] !== undefined ? data["stageStates"].map((item: any) => (serializeExecutionStageState(item))) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeJob(data: any): Job {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    currentStateTime: data["currentStateTime"] !== undefined ? new Date(data["currentStateTime"]) : undefined,
    pipelineDescription: data["pipelineDescription"] !== undefined ? deserializePipelineDescription(data["pipelineDescription"]) : undefined,
    stageStates: data["stageStates"] !== undefined ? data["stageStates"].map((item: any) => (deserializeExecutionStageState(item))) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Information about the execution of a job.
 */
export interface JobExecutionDetails {
  /**
   * If present, this response does not contain all requested tasks. To obtain
   * the next page of results, repeat the request with page_token set to this
   * value.
   */
  nextPageToken?: string;
  /**
   * The stages of the job execution.
   */
  stages?: StageSummary[];
}

function serializeJobExecutionDetails(data: any): JobExecutionDetails {
  return {
    ...data,
    stages: data["stages"] !== undefined ? data["stages"].map((item: any) => (serializeStageSummary(item))) : undefined,
  };
}

function deserializeJobExecutionDetails(data: any): JobExecutionDetails {
  return {
    ...data,
    stages: data["stages"] !== undefined ? data["stages"].map((item: any) => (deserializeStageSummary(item))) : undefined,
  };
}

/**
 * Additional information about how a Cloud Dataflow job will be executed that
 * isn't contained in the submitted job.
 */
export interface JobExecutionInfo {
  /**
   * A mapping from each stage to the information about that stage.
   */
  stages?: {
    [key: string]: JobExecutionStageInfo
  };
}

/**
 * Contains information about how a particular google.dataflow.v1beta3.Step
 * will be executed.
 */
export interface JobExecutionStageInfo {
  /**
   * The steps associated with the execution stage. Note that stages may have
   * several steps, and that a given step might be run by more than one stage.
   */
  stepName?: string[];
}

/**
 * A particular message pertaining to a Dataflow job.
 */
export interface JobMessage {
  /**
   * Deprecated.
   */
  id?: string;
  /**
   * Importance level of the message.
   */
  messageImportance?:  | "JOB_MESSAGE_IMPORTANCE_UNKNOWN" | "JOB_MESSAGE_DEBUG" | "JOB_MESSAGE_DETAILED" | "JOB_MESSAGE_BASIC" | "JOB_MESSAGE_WARNING" | "JOB_MESSAGE_ERROR";
  /**
   * The text of the message.
   */
  messageText?: string;
  /**
   * The timestamp of the message.
   */
  time?: Date;
}

function serializeJobMessage(data: any): JobMessage {
  return {
    ...data,
    time: data["time"] !== undefined ? data["time"].toISOString() : undefined,
  };
}

function deserializeJobMessage(data: any): JobMessage {
  return {
    ...data,
    time: data["time"] !== undefined ? new Date(data["time"]) : undefined,
  };
}

/**
 * Metadata available primarily for filtering jobs. Will be included in the
 * ListJob response and Job SUMMARY view.
 */
export interface JobMetadata {
  /**
   * Identification of a BigQuery source used in the Dataflow job.
   */
  bigqueryDetails?: BigQueryIODetails[];
  /**
   * Identification of a Cloud Bigtable source used in the Dataflow job.
   */
  bigTableDetails?: BigTableIODetails[];
  /**
   * Identification of a Datastore source used in the Dataflow job.
   */
  datastoreDetails?: DatastoreIODetails[];
  /**
   * Identification of a File source used in the Dataflow job.
   */
  fileDetails?: FileIODetails[];
  /**
   * Identification of a Pub/Sub source used in the Dataflow job.
   */
  pubsubDetails?: PubSubIODetails[];
  /**
   * The SDK version used to run the job.
   */
  sdkVersion?: SdkVersion;
  /**
   * Identification of a Spanner source used in the Dataflow job.
   */
  spannerDetails?: SpannerIODetails[];
}

/**
 * JobMetrics contains a collection of metrics describing the detailed progress
 * of a Dataflow job. Metrics correspond to user-defined and system-defined
 * metrics in the job. For more information, see [Dataflow job metrics]
 * (https://cloud.google.com/dataflow/docs/guides/using-monitoring-intf). This
 * resource captures only the most recent values of each metric; time-series
 * data can be queried for them (under the same metric names) from Cloud
 * Monitoring.
 */
export interface JobMetrics {
  /**
   * All metrics for this job.
   */
  metrics?: MetricUpdate[];
  /**
   * Timestamp as of which metric values are current.
   */
  metricTime?: Date;
}

function serializeJobMetrics(data: any): JobMetrics {
  return {
    ...data,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (serializeMetricUpdate(item))) : undefined,
    metricTime: data["metricTime"] !== undefined ? data["metricTime"].toISOString() : undefined,
  };
}

function deserializeJobMetrics(data: any): JobMetrics {
  return {
    ...data,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (deserializeMetricUpdate(item))) : undefined,
    metricTime: data["metricTime"] !== undefined ? new Date(data["metricTime"]) : undefined,
  };
}

/**
 * Data disk assignment information for a specific key-range of a sharded
 * computation. Currently we only support UTF-8 character splits to simplify
 * encoding into JSON.
 */
export interface KeyRangeDataDiskAssignment {
  /**
   * The name of the data disk where data for this range is stored. This name
   * is local to the Google Cloud Platform project and uniquely identifies the
   * disk within that project, for example
   * "myproject-1014-104817-4c2-harness-0-disk-1".
   */
  dataDisk?: string;
  /**
   * The end (exclusive) of the key range.
   */
  end?: string;
  /**
   * The start (inclusive) of the key range.
   */
  start?: string;
}

/**
 * Location information for a specific key-range of a sharded computation.
 * Currently we only support UTF-8 character splits to simplify encoding into
 * JSON.
 */
export interface KeyRangeLocation {
  /**
   * The name of the data disk where data for this range is stored. This name
   * is local to the Google Cloud Platform project and uniquely identifies the
   * disk within that project, for example
   * "myproject-1014-104817-4c2-harness-0-disk-1".
   */
  dataDisk?: string;
  /**
   * The physical location of this range assignment to be used for streaming
   * computation cross-worker message delivery.
   */
  deliveryEndpoint?: string;
  /**
   * DEPRECATED. The location of the persistent state for this range, as a
   * persistent directory in the worker local filesystem.
   */
  deprecatedPersistentDirectory?: string;
  /**
   * The end (exclusive) of the key range.
   */
  end?: string;
  /**
   * The start (inclusive) of the key range.
   */
  start?: string;
}

/**
 * Launch FlexTemplate Parameter.
 */
export interface LaunchFlexTemplateParameter {
  /**
   * Spec about the container image to launch.
   */
  containerSpec?: ContainerSpec;
  /**
   * Cloud Storage path to a file with json serialized ContainerSpec as
   * content.
   */
  containerSpecGcsPath?: string;
  /**
   * The runtime environment for the FlexTemplate job
   */
  environment?: FlexTemplateRuntimeEnvironment;
  /**
   * Required. The job name to use for the created job. For update job request,
   * job name should be same as the existing running job.
   */
  jobName?: string;
  /**
   * Launch options for this flex template job. This is a common set of options
   * across languages and templates. This should not be used to pass job
   * parameters.
   */
  launchOptions?: {
    [key: string]: string
  };
  /**
   * The parameters for FlexTemplate. Ex. {"num_workers":"5"}
   */
  parameters?: {
    [key: string]: string
  };
  /**
   * Use this to pass transform_name_mappings for streaming update jobs.
   * Ex:{"oldTransformName":"newTransformName",...}'
   */
  transformNameMappings?: {
    [key: string]: string
  };
  /**
   * Set this to true if you are sending a request to update a running
   * streaming job. When set, the job name should be the same as the running
   * job.
   */
  update?: boolean;
}

/**
 * A request to launch a Cloud Dataflow job from a FlexTemplate.
 */
export interface LaunchFlexTemplateRequest {
  /**
   * Required. Parameter to launch a job form Flex Template.
   */
  launchParameter?: LaunchFlexTemplateParameter;
  /**
   * If true, the request is validated but not actually executed. Defaults to
   * false.
   */
  validateOnly?: boolean;
}

/**
 * Response to the request to launch a job from Flex Template.
 */
export interface LaunchFlexTemplateResponse {
  /**
   * The job that was launched, if the request was not a dry run and the job
   * was successfully launched.
   */
  job?: Job;
}

function serializeLaunchFlexTemplateResponse(data: any): LaunchFlexTemplateResponse {
  return {
    ...data,
    job: data["job"] !== undefined ? serializeJob(data["job"]) : undefined,
  };
}

function deserializeLaunchFlexTemplateResponse(data: any): LaunchFlexTemplateResponse {
  return {
    ...data,
    job: data["job"] !== undefined ? deserializeJob(data["job"]) : undefined,
  };
}

/**
 * Parameters to provide to the template being launched. Note that the
 * [metadata in the pipeline code]
 * (https://cloud.google.com/dataflow/docs/guides/templates/creating-templates#metadata)
 * determines which runtime parameters are valid.
 */
export interface LaunchTemplateParameters {
  /**
   * The runtime environment for the job.
   */
  environment?: RuntimeEnvironment;
  /**
   * Required. The job name to use for the created job. The name must match the
   * regular expression `[a-z]([-a-z0-9]{0,1022}[a-z0-9])?`
   */
  jobName?: string;
  /**
   * The runtime parameters to pass to the job.
   */
  parameters?: {
    [key: string]: string
  };
  /**
   * Only applicable when updating a pipeline. Map of transform name prefixes
   * of the job to be replaced to the corresponding name prefixes of the new
   * job.
   */
  transformNameMapping?: {
    [key: string]: string
  };
  /**
   * If set, replace the existing pipeline with the name specified by jobName
   * with this pipeline, preserving state.
   */
  update?: boolean;
}

/**
 * Response to the request to launch a template.
 */
export interface LaunchTemplateResponse {
  /**
   * The job that was launched, if the request was not a dry run and the job
   * was successfully launched.
   */
  job?: Job;
}

function serializeLaunchTemplateResponse(data: any): LaunchTemplateResponse {
  return {
    ...data,
    job: data["job"] !== undefined ? serializeJob(data["job"]) : undefined,
  };
}

function deserializeLaunchTemplateResponse(data: any): LaunchTemplateResponse {
  return {
    ...data,
    job: data["job"] !== undefined ? deserializeJob(data["job"]) : undefined,
  };
}

/**
 * Request to lease WorkItems.
 */
export interface LeaseWorkItemRequest {
  /**
   * The current timestamp at the worker.
   */
  currentWorkerTime?: Date;
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * contains the WorkItem's job.
   */
  location?: string;
  /**
   * The initial lease period.
   */
  requestedLeaseDuration?: number /* Duration */;
  /**
   * Untranslated bag-of-bytes WorkRequest from UnifiedWorker.
   */
  unifiedWorkerRequest?: {
    [key: string]: any
  };
  /**
   * Worker capabilities. WorkItems might be limited to workers with specific
   * capabilities.
   */
  workerCapabilities?: string[];
  /**
   * Identifies the worker leasing work -- typically the ID of the virtual
   * machine running the worker.
   */
  workerId?: string;
  /**
   * Filter for WorkItem type.
   */
  workItemTypes?: string[];
}

function serializeLeaseWorkItemRequest(data: any): LeaseWorkItemRequest {
  return {
    ...data,
    currentWorkerTime: data["currentWorkerTime"] !== undefined ? data["currentWorkerTime"].toISOString() : undefined,
    requestedLeaseDuration: data["requestedLeaseDuration"] !== undefined ? data["requestedLeaseDuration"] : undefined,
  };
}

function deserializeLeaseWorkItemRequest(data: any): LeaseWorkItemRequest {
  return {
    ...data,
    currentWorkerTime: data["currentWorkerTime"] !== undefined ? new Date(data["currentWorkerTime"]) : undefined,
    requestedLeaseDuration: data["requestedLeaseDuration"] !== undefined ? data["requestedLeaseDuration"] : undefined,
  };
}

/**
 * Response to a request to lease WorkItems.
 */
export interface LeaseWorkItemResponse {
  /**
   * Untranslated bag-of-bytes WorkResponse for UnifiedWorker.
   */
  unifiedWorkerResponse?: {
    [key: string]: any
  };
  /**
   * A list of the leased WorkItems.
   */
  workItems?: WorkItem[];
}

function serializeLeaseWorkItemResponse(data: any): LeaseWorkItemResponse {
  return {
    ...data,
    workItems: data["workItems"] !== undefined ? data["workItems"].map((item: any) => (serializeWorkItem(item))) : undefined,
  };
}

function deserializeLeaseWorkItemResponse(data: any): LeaseWorkItemResponse {
  return {
    ...data,
    workItems: data["workItems"] !== undefined ? data["workItems"].map((item: any) => (deserializeWorkItem(item))) : undefined,
  };
}

/**
 * Response to a request to list job messages.
 */
export interface ListJobMessagesResponse {
  /**
   * Autoscaling events in ascending timestamp order.
   */
  autoscalingEvents?: AutoscalingEvent[];
  /**
   * Messages in ascending timestamp order.
   */
  jobMessages?: JobMessage[];
  /**
   * The token to obtain the next page of results if there are more.
   */
  nextPageToken?: string;
}

function serializeListJobMessagesResponse(data: any): ListJobMessagesResponse {
  return {
    ...data,
    autoscalingEvents: data["autoscalingEvents"] !== undefined ? data["autoscalingEvents"].map((item: any) => (serializeAutoscalingEvent(item))) : undefined,
    jobMessages: data["jobMessages"] !== undefined ? data["jobMessages"].map((item: any) => (serializeJobMessage(item))) : undefined,
  };
}

function deserializeListJobMessagesResponse(data: any): ListJobMessagesResponse {
  return {
    ...data,
    autoscalingEvents: data["autoscalingEvents"] !== undefined ? data["autoscalingEvents"].map((item: any) => (deserializeAutoscalingEvent(item))) : undefined,
    jobMessages: data["jobMessages"] !== undefined ? data["jobMessages"].map((item: any) => (deserializeJobMessage(item))) : undefined,
  };
}

/**
 * Response to a request to list Cloud Dataflow jobs in a project. This might
 * be a partial response, depending on the page size in the ListJobsRequest.
 * However, if the project does not have any jobs, an instance of
 * ListJobsResponse is not returned and the requests's response body is empty
 * {}.
 */
export interface ListJobsResponse {
  /**
   * Zero or more messages describing the [regional endpoints]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * failed to respond.
   */
  failedLocation?: FailedLocation[];
  /**
   * A subset of the requested job information.
   */
  jobs?: Job[];
  /**
   * Set if there may be more results than fit in this response.
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
 * List of snapshots.
 */
export interface ListSnapshotsResponse {
  /**
   * Returned snapshots.
   */
  snapshots?: Snapshot[];
}

function serializeListSnapshotsResponse(data: any): ListSnapshotsResponse {
  return {
    ...data,
    snapshots: data["snapshots"] !== undefined ? data["snapshots"].map((item: any) => (serializeSnapshot(item))) : undefined,
  };
}

function deserializeListSnapshotsResponse(data: any): ListSnapshotsResponse {
  return {
    ...data,
    snapshots: data["snapshots"] !== undefined ? data["snapshots"].map((item: any) => (deserializeSnapshot(item))) : undefined,
  };
}

/**
 * MapTask consists of an ordered set of instructions, each of which describes
 * one particular low-level operation for the worker to perform in order to
 * accomplish the MapTask's WorkItem. Each instruction must appear in the list
 * before any instructions which depends on its output.
 */
export interface MapTask {
  /**
   * Counter prefix that can be used to prefix counters. Not currently used in
   * Dataflow.
   */
  counterPrefix?: string;
  /**
   * The instructions in the MapTask.
   */
  instructions?: ParallelInstruction[];
  /**
   * System-defined name of the stage containing this MapTask. Unique across
   * the workflow.
   */
  stageName?: string;
  /**
   * System-defined name of this MapTask. Unique across the workflow.
   */
  systemName?: string;
}

function serializeMapTask(data: any): MapTask {
  return {
    ...data,
    instructions: data["instructions"] !== undefined ? data["instructions"].map((item: any) => (serializeParallelInstruction(item))) : undefined,
  };
}

function deserializeMapTask(data: any): MapTask {
  return {
    ...data,
    instructions: data["instructions"] !== undefined ? data["instructions"].map((item: any) => (deserializeParallelInstruction(item))) : undefined,
  };
}

/**
 * Information about the memory usage of a worker or a container within a
 * worker.
 */
export interface MemInfo {
  /**
   * Instantenous memory limit in bytes.
   */
  currentLimitBytes?: bigint;
  /**
   * Number of Out of Memory (OOM) events recorded since the previous
   * measurement.
   */
  currentOoms?: bigint;
  /**
   * Instantenous memory (RSS) size in bytes.
   */
  currentRssBytes?: bigint;
  /**
   * Timestamp of the measurement.
   */
  timestamp?: Date;
  /**
   * Total memory (RSS) usage since start up in GB * ms.
   */
  totalGbMs?: bigint;
}

function serializeMemInfo(data: any): MemInfo {
  return {
    ...data,
    currentLimitBytes: data["currentLimitBytes"] !== undefined ? String(data["currentLimitBytes"]) : undefined,
    currentOoms: data["currentOoms"] !== undefined ? String(data["currentOoms"]) : undefined,
    currentRssBytes: data["currentRssBytes"] !== undefined ? String(data["currentRssBytes"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
    totalGbMs: data["totalGbMs"] !== undefined ? String(data["totalGbMs"]) : undefined,
  };
}

function deserializeMemInfo(data: any): MemInfo {
  return {
    ...data,
    currentLimitBytes: data["currentLimitBytes"] !== undefined ? BigInt(data["currentLimitBytes"]) : undefined,
    currentOoms: data["currentOoms"] !== undefined ? BigInt(data["currentOoms"]) : undefined,
    currentRssBytes: data["currentRssBytes"] !== undefined ? BigInt(data["currentRssBytes"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
    totalGbMs: data["totalGbMs"] !== undefined ? BigInt(data["totalGbMs"]) : undefined,
  };
}

/**
 * The metric short id is returned to the user alongside an offset into
 * ReportWorkItemStatusRequest
 */
export interface MetricShortId {
  /**
   * The index of the corresponding metric in the ReportWorkItemStatusRequest.
   * Required.
   */
  metricIndex?: number;
  /**
   * The service-generated short identifier for the metric.
   */
  shortId?: bigint;
}

function serializeMetricShortId(data: any): MetricShortId {
  return {
    ...data,
    shortId: data["shortId"] !== undefined ? String(data["shortId"]) : undefined,
  };
}

function deserializeMetricShortId(data: any): MetricShortId {
  return {
    ...data,
    shortId: data["shortId"] !== undefined ? BigInt(data["shortId"]) : undefined,
  };
}

/**
 * Identifies a metric, by describing the source which generated the metric.
 */
export interface MetricStructuredName {
  /**
   * Zero or more labeled fields which identify the part of the job this metric
   * is associated with, such as the name of a step or collection. For example,
   * built-in counters associated with steps will have context['step'] = .
   * Counters associated with PCollections in the SDK will have
   * context['pcollection'] = .
   */
  context?: {
    [key: string]: string
  };
  /**
   * Worker-defined metric name.
   */
  name?: string;
  /**
   * Origin (namespace) of metric name. May be blank for user-define metrics;
   * will be "dataflow" for metrics defined by the Dataflow service or SDK.
   */
  origin?: string;
}

/**
 * Describes the state of a metric.
 */
export interface MetricUpdate {
  /**
   * True if this metric is reported as the total cumulative aggregate value
   * accumulated since the worker started working on this WorkItem. By default
   * this is false, indicating that this metric is reported as a delta that is
   * not associated with any WorkItem.
   */
  cumulative?: boolean;
  /**
   * A struct value describing properties of a distribution of numeric values.
   */
  distribution?: any;
  /**
   * A struct value describing properties of a Gauge. Metrics of gauge type
   * show the value of a metric across time, and is aggregated based on the
   * newest value.
   */
  gauge?: any;
  /**
   * Worker-computed aggregate value for internal use by the Dataflow service.
   */
  internal?: any;
  /**
   * Metric aggregation kind. The possible metric aggregation kinds are "Sum",
   * "Max", "Min", "Mean", "Set", "And", "Or", and "Distribution". The specified
   * aggregation kind is case-insensitive. If omitted, this is not an aggregated
   * value but instead a single metric sample value.
   */
  kind?: string;
  /**
   * Worker-computed aggregate value for the "Mean" aggregation kind. This
   * holds the count of the aggregated values and is used in combination with
   * mean_sum above to obtain the actual mean aggregate value. The only possible
   * value type is Long.
   */
  meanCount?: any;
  /**
   * Worker-computed aggregate value for the "Mean" aggregation kind. This
   * holds the sum of the aggregated values and is used in combination with
   * mean_count below to obtain the actual mean aggregate value. The only
   * possible value types are Long and Double.
   */
  meanSum?: any;
  /**
   * Name of the metric.
   */
  name?: MetricStructuredName;
  /**
   * Worker-computed aggregate value for aggregation kinds "Sum", "Max", "Min",
   * "And", and "Or". The possible value types are Long, Double, and Boolean.
   */
  scalar?: any;
  /**
   * Worker-computed aggregate value for the "Set" aggregation kind. The only
   * possible value type is a list of Values whose type can be Long, Double, or
   * String, according to the metric's type. All Values in the list must be of
   * the same type.
   */
  set?: any;
  /**
   * Timestamp associated with the metric value. Optional when workers are
   * reporting work progress; it will be filled in responses from the metrics
   * API.
   */
  updateTime?: Date;
}

function serializeMetricUpdate(data: any): MetricUpdate {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeMetricUpdate(data: any): MetricUpdate {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Describes mounted data disk.
 */
export interface MountedDataDisk {
  /**
   * The name of the data disk. This name is local to the Google Cloud Platform
   * project and uniquely identifies the disk within that project, for example
   * "myproject-1014-104817-4c2-harness-0-disk-1".
   */
  dataDisk?: string;
}

/**
 * Information about an output of a multi-output DoFn.
 */
export interface MultiOutputInfo {
  /**
   * The id of the tag the user code will emit to this output by; this should
   * correspond to the tag of some SideInputInfo.
   */
  tag?: string;
}

/**
 * Basic metadata about a counter.
 */
export interface NameAndKind {
  /**
   * Counter aggregation kind.
   */
  kind?:  | "INVALID" | "SUM" | "MAX" | "MIN" | "MEAN" | "OR" | "AND" | "SET" | "DISTRIBUTION" | "LATEST_VALUE";
  /**
   * Name of the counter.
   */
  name?: string;
}

/**
 * The packages that must be installed in order for a worker to run the steps
 * of the Cloud Dataflow job that will be assigned to its worker pool. This is
 * the mechanism by which the Cloud Dataflow SDK causes code to be loaded onto
 * the workers. For example, the Cloud Dataflow Java SDK might use this to
 * install jars containing the user's code and all of the various dependencies
 * (libraries, data files, etc.) required in order for that code to run.
 */
export interface Package {
  /**
   * The resource to read the package from. The supported resource type is:
   * Google Cloud Storage: storage.googleapis.com/{bucket}
   * bucket.storage.googleapis.com/
   */
  location?: string;
  /**
   * The name of the package.
   */
  name?: string;
}

/**
 * Describes a particular operation comprising a MapTask.
 */
export interface ParallelInstruction {
  /**
   * Additional information for Flatten instructions.
   */
  flatten?: FlattenInstruction;
  /**
   * User-provided name of this operation.
   */
  name?: string;
  /**
   * System-defined name for the operation in the original workflow graph.
   */
  originalName?: string;
  /**
   * Describes the outputs of the instruction.
   */
  outputs?: InstructionOutput[];
  /**
   * Additional information for ParDo instructions.
   */
  parDo?: ParDoInstruction;
  /**
   * Additional information for PartialGroupByKey instructions.
   */
  partialGroupByKey?: PartialGroupByKeyInstruction;
  /**
   * Additional information for Read instructions.
   */
  read?: ReadInstruction;
  /**
   * System-defined name of this operation. Unique across the workflow.
   */
  systemName?: string;
  /**
   * Additional information for Write instructions.
   */
  write?: WriteInstruction;
}

function serializeParallelInstruction(data: any): ParallelInstruction {
  return {
    ...data,
    parDo: data["parDo"] !== undefined ? serializeParDoInstruction(data["parDo"]) : undefined,
    partialGroupByKey: data["partialGroupByKey"] !== undefined ? serializePartialGroupByKeyInstruction(data["partialGroupByKey"]) : undefined,
    read: data["read"] !== undefined ? serializeReadInstruction(data["read"]) : undefined,
  };
}

function deserializeParallelInstruction(data: any): ParallelInstruction {
  return {
    ...data,
    parDo: data["parDo"] !== undefined ? deserializeParDoInstruction(data["parDo"]) : undefined,
    partialGroupByKey: data["partialGroupByKey"] !== undefined ? deserializePartialGroupByKeyInstruction(data["partialGroupByKey"]) : undefined,
    read: data["read"] !== undefined ? deserializeReadInstruction(data["read"]) : undefined,
  };
}

/**
 * Structured data associated with this message.
 */
export interface Parameter {
  /**
   * Key or name for this parameter.
   */
  key?: string;
  /**
   * Value for this parameter.
   */
  value?: any;
}

/**
 * Metadata for a specific parameter.
 */
export interface ParameterMetadata {
  /**
   * Optional. Additional metadata for describing this parameter.
   */
  customMetadata?: {
    [key: string]: string
  };
  /**
   * Required. The help text to display for the parameter.
   */
  helpText?: string;
  /**
   * Optional. Whether the parameter is optional. Defaults to false.
   */
  isOptional?: boolean;
  /**
   * Required. The label to display for the parameter.
   */
  label?: string;
  /**
   * Required. The name of the parameter.
   */
  name?: string;
  /**
   * Optional. The type of the parameter. Used for selecting input picker.
   */
  paramType?:  | "DEFAULT" | "TEXT" | "GCS_READ_BUCKET" | "GCS_WRITE_BUCKET" | "GCS_READ_FILE" | "GCS_WRITE_FILE" | "GCS_READ_FOLDER" | "GCS_WRITE_FOLDER" | "PUBSUB_TOPIC" | "PUBSUB_SUBSCRIPTION" | "BIGQUERY_TABLE" | "JAVASCRIPT_UDF_FILE";
  /**
   * Optional. Regexes that the parameter must match.
   */
  regexes?: string[];
}

/**
 * An instruction that does a ParDo operation. Takes one main input and zero or
 * more side inputs, and produces zero or more outputs. Runs user code.
 */
export interface ParDoInstruction {
  /**
   * The input.
   */
  input?: InstructionInput;
  /**
   * Information about each of the outputs, if user_fn is a MultiDoFn.
   */
  multiOutputInfos?: MultiOutputInfo[];
  /**
   * The number of outputs.
   */
  numOutputs?: number;
  /**
   * Zero or more side inputs.
   */
  sideInputs?: SideInputInfo[];
  /**
   * The user function to invoke.
   */
  userFn?: {
    [key: string]: any
  };
}

function serializeParDoInstruction(data: any): ParDoInstruction {
  return {
    ...data,
    sideInputs: data["sideInputs"] !== undefined ? data["sideInputs"].map((item: any) => (serializeSideInputInfo(item))) : undefined,
  };
}

function deserializeParDoInstruction(data: any): ParDoInstruction {
  return {
    ...data,
    sideInputs: data["sideInputs"] !== undefined ? data["sideInputs"].map((item: any) => (deserializeSideInputInfo(item))) : undefined,
  };
}

/**
 * An instruction that does a partial group-by-key. One input and one output.
 */
export interface PartialGroupByKeyInstruction {
  /**
   * Describes the input to the partial group-by-key instruction.
   */
  input?: InstructionInput;
  /**
   * The codec to use for interpreting an element in the input PTable.
   */
  inputElementCodec?: {
    [key: string]: any
  };
  /**
   * If this instruction includes a combining function this is the name of the
   * intermediate store between the GBK and the CombineValues.
   */
  originalCombineValuesInputStoreName?: string;
  /**
   * If this instruction includes a combining function, this is the name of the
   * CombineValues instruction lifted into this instruction.
   */
  originalCombineValuesStepName?: string;
  /**
   * Zero or more side inputs.
   */
  sideInputs?: SideInputInfo[];
  /**
   * The value combining function to invoke.
   */
  valueCombiningFn?: {
    [key: string]: any
  };
}

function serializePartialGroupByKeyInstruction(data: any): PartialGroupByKeyInstruction {
  return {
    ...data,
    sideInputs: data["sideInputs"] !== undefined ? data["sideInputs"].map((item: any) => (serializeSideInputInfo(item))) : undefined,
  };
}

function deserializePartialGroupByKeyInstruction(data: any): PartialGroupByKeyInstruction {
  return {
    ...data,
    sideInputs: data["sideInputs"] !== undefined ? data["sideInputs"].map((item: any) => (deserializeSideInputInfo(item))) : undefined,
  };
}

/**
 * A descriptive representation of submitted pipeline as well as the executed
 * form. This data is provided by the Dataflow service for ease of visualizing
 * the pipeline and interpreting Dataflow provided metrics.
 */
export interface PipelineDescription {
  /**
   * Pipeline level display data.
   */
  displayData?: DisplayData[];
  /**
   * Description of each stage of execution of the pipeline.
   */
  executionPipelineStage?: ExecutionStageSummary[];
  /**
   * Description of each transform in the pipeline and collections between
   * them.
   */
  originalPipelineTransform?: TransformSummary[];
  /**
   * A hash value of the submitted pipeline portable graph step names if
   * exists.
   */
  stepNamesHash?: string;
}

function serializePipelineDescription(data: any): PipelineDescription {
  return {
    ...data,
    displayData: data["displayData"] !== undefined ? data["displayData"].map((item: any) => (serializeDisplayData(item))) : undefined,
    executionPipelineStage: data["executionPipelineStage"] !== undefined ? data["executionPipelineStage"].map((item: any) => (serializeExecutionStageSummary(item))) : undefined,
    originalPipelineTransform: data["originalPipelineTransform"] !== undefined ? data["originalPipelineTransform"].map((item: any) => (serializeTransformSummary(item))) : undefined,
  };
}

function deserializePipelineDescription(data: any): PipelineDescription {
  return {
    ...data,
    displayData: data["displayData"] !== undefined ? data["displayData"].map((item: any) => (deserializeDisplayData(item))) : undefined,
    executionPipelineStage: data["executionPipelineStage"] !== undefined ? data["executionPipelineStage"].map((item: any) => (deserializeExecutionStageSummary(item))) : undefined,
    originalPipelineTransform: data["originalPipelineTransform"] !== undefined ? data["originalPipelineTransform"].map((item: any) => (deserializeTransformSummary(item))) : undefined,
  };
}

/**
 * A point in the timeseries.
 */
export interface Point {
  /**
   * The timestamp of the point.
   */
  time?: Date;
  /**
   * The value of the point.
   */
  value?: number;
}

function serializePoint(data: any): Point {
  return {
    ...data,
    time: data["time"] !== undefined ? data["time"].toISOString() : undefined,
  };
}

function deserializePoint(data: any): Point {
  return {
    ...data,
    time: data["time"] !== undefined ? new Date(data["time"]) : undefined,
  };
}

/**
 * Position defines a position within a collection of data. The value can be
 * either the end position, a key (used with ordered collections), a byte
 * offset, or a record index.
 */
export interface Position {
  /**
   * Position is a byte offset.
   */
  byteOffset?: bigint;
  /**
   * CloudPosition is a concat position.
   */
  concatPosition?: ConcatPosition;
  /**
   * Position is past all other positions. Also useful for the end position of
   * an unbounded range.
   */
  end?: boolean;
  /**
   * Position is a string key, ordered lexicographically.
   */
  key?: string;
  /**
   * Position is a record index.
   */
  recordIndex?: bigint;
  /**
   * CloudPosition is a base64 encoded BatchShufflePosition (with FIXED
   * sharding).
   */
  shufflePosition?: string;
}

function serializePosition(data: any): Position {
  return {
    ...data,
    byteOffset: data["byteOffset"] !== undefined ? String(data["byteOffset"]) : undefined,
    concatPosition: data["concatPosition"] !== undefined ? serializeConcatPosition(data["concatPosition"]) : undefined,
    recordIndex: data["recordIndex"] !== undefined ? String(data["recordIndex"]) : undefined,
  };
}

function deserializePosition(data: any): Position {
  return {
    ...data,
    byteOffset: data["byteOffset"] !== undefined ? BigInt(data["byteOffset"]) : undefined,
    concatPosition: data["concatPosition"] !== undefined ? deserializeConcatPosition(data["concatPosition"]) : undefined,
    recordIndex: data["recordIndex"] !== undefined ? BigInt(data["recordIndex"]) : undefined,
  };
}

/**
 * Information about the progress of some component of job execution.
 */
export interface ProgressTimeseries {
  /**
   * The current progress of the component, in the range [0,1].
   */
  currentProgress?: number;
  /**
   * History of progress for the component. Points are sorted by time.
   */
  dataPoints?: Point[];
}

function serializeProgressTimeseries(data: any): ProgressTimeseries {
  return {
    ...data,
    dataPoints: data["dataPoints"] !== undefined ? data["dataPoints"].map((item: any) => (serializePoint(item))) : undefined,
  };
}

function deserializeProgressTimeseries(data: any): ProgressTimeseries {
  return {
    ...data,
    dataPoints: data["dataPoints"] !== undefined ? data["dataPoints"].map((item: any) => (deserializePoint(item))) : undefined,
  };
}

/**
 * Additional options for Dataflow#projectsDeleteSnapshots.
 */
export interface ProjectsDeleteSnapshotsOptions {
  /**
   * The location that contains this snapshot.
   */
  location?: string;
  /**
   * The ID of the snapshot.
   */
  snapshotId?: string;
}

/**
 * Additional options for Dataflow#projectsJobsAggregated.
 */
export interface ProjectsJobsAggregatedOptions {
  /**
   * The kind of filter to use.
   */
  filter?:  | "UNKNOWN" | "ALL" | "TERMINATED" | "ACTIVE";
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * contains this job.
   */
  location?: string;
  /**
   * Optional. The job name. Optional.
   */
  name?: string;
  /**
   * If there are many jobs, limit response to at most this many. The actual
   * number of jobs returned will be the lesser of max_responses and an
   * unspecified server-defined limit.
   */
  pageSize?: number;
  /**
   * Set this to the 'next_page_token' field of a previous response to request
   * additional results in a long list.
   */
  pageToken?: string;
  /**
   * Deprecated. ListJobs always returns summaries now. Use GetJob for other
   * JobViews.
   */
  view?:  | "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION";
}

/**
 * Additional options for Dataflow#projectsJobsCreate.
 */
export interface ProjectsJobsCreateOptions {
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * contains this job.
   */
  location?: string;
  /**
   * Deprecated. This field is now in the Job message.
   */
  replaceJobId?: string;
  /**
   * The level of information requested in response.
   */
  view?:  | "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION";
}

/**
 * Additional options for Dataflow#projectsJobsGetMetrics.
 */
export interface ProjectsJobsGetMetricsOptions {
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * contains the job specified by job_id.
   */
  location?: string;
  /**
   * Return only metric data that has changed since this time. Default is to
   * return all information about all metrics for the job.
   */
  startTime?: Date;
}

function serializeProjectsJobsGetMetricsOptions(data: any): ProjectsJobsGetMetricsOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeProjectsJobsGetMetricsOptions(data: any): ProjectsJobsGetMetricsOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Additional options for Dataflow#projectsJobsGet.
 */
export interface ProjectsJobsGetOptions {
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * contains this job.
   */
  location?: string;
  /**
   * The level of information requested in response.
   */
  view?:  | "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION";
}

/**
 * Additional options for Dataflow#projectsJobsList.
 */
export interface ProjectsJobsListOptions {
  /**
   * The kind of filter to use.
   */
  filter?:  | "UNKNOWN" | "ALL" | "TERMINATED" | "ACTIVE";
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * contains this job.
   */
  location?: string;
  /**
   * Optional. The job name. Optional.
   */
  name?: string;
  /**
   * If there are many jobs, limit response to at most this many. The actual
   * number of jobs returned will be the lesser of max_responses and an
   * unspecified server-defined limit.
   */
  pageSize?: number;
  /**
   * Set this to the 'next_page_token' field of a previous response to request
   * additional results in a long list.
   */
  pageToken?: string;
  /**
   * Deprecated. ListJobs always returns summaries now. Use GetJob for other
   * JobViews.
   */
  view?:  | "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION";
}

/**
 * Additional options for Dataflow#projectsJobsMessagesList.
 */
export interface ProjectsJobsMessagesListOptions {
  /**
   * Return only messages with timestamps < end_time. The default is now (i.e.
   * return up to the latest messages available).
   */
  endTime?: Date;
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * contains the job specified by job_id.
   */
  location?: string;
  /**
   * Filter to only get messages with importance >= level
   */
  minimumImportance?:  | "JOB_MESSAGE_IMPORTANCE_UNKNOWN" | "JOB_MESSAGE_DEBUG" | "JOB_MESSAGE_DETAILED" | "JOB_MESSAGE_BASIC" | "JOB_MESSAGE_WARNING" | "JOB_MESSAGE_ERROR";
  /**
   * If specified, determines the maximum number of messages to return. If
   * unspecified, the service may choose an appropriate default, or may return
   * an arbitrarily large number of results.
   */
  pageSize?: number;
  /**
   * If supplied, this should be the value of next_page_token returned by an
   * earlier call. This will cause the next page of results to be returned.
   */
  pageToken?: string;
  /**
   * If specified, return only messages with timestamps >= start_time. The
   * default is the job creation time (i.e. beginning of messages).
   */
  startTime?: Date;
}

function serializeProjectsJobsMessagesListOptions(data: any): ProjectsJobsMessagesListOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeProjectsJobsMessagesListOptions(data: any): ProjectsJobsMessagesListOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Additional options for Dataflow#projectsJobsUpdate.
 */
export interface ProjectsJobsUpdateOptions {
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * contains this job.
   */
  location?: string;
}

/**
 * Additional options for Dataflow#projectsLocationsJobsCreate.
 */
export interface ProjectsLocationsJobsCreateOptions {
  /**
   * Deprecated. This field is now in the Job message.
   */
  replaceJobId?: string;
  /**
   * The level of information requested in response.
   */
  view?:  | "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION";
}

/**
 * Additional options for Dataflow#projectsLocationsJobsGetExecutionDetails.
 */
export interface ProjectsLocationsJobsGetExecutionDetailsOptions {
  /**
   * If specified, determines the maximum number of stages to return. If
   * unspecified, the service may choose an appropriate default, or may return
   * an arbitrarily large number of results.
   */
  pageSize?: number;
  /**
   * If supplied, this should be the value of next_page_token returned by an
   * earlier call. This will cause the next page of results to be returned.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataflow#projectsLocationsJobsGetMetrics.
 */
export interface ProjectsLocationsJobsGetMetricsOptions {
  /**
   * Return only metric data that has changed since this time. Default is to
   * return all information about all metrics for the job.
   */
  startTime?: Date;
}

function serializeProjectsLocationsJobsGetMetricsOptions(data: any): ProjectsLocationsJobsGetMetricsOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeProjectsLocationsJobsGetMetricsOptions(data: any): ProjectsLocationsJobsGetMetricsOptions {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Additional options for Dataflow#projectsLocationsJobsGet.
 */
export interface ProjectsLocationsJobsGetOptions {
  /**
   * The level of information requested in response.
   */
  view?:  | "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION";
}

/**
 * Additional options for Dataflow#projectsLocationsJobsList.
 */
export interface ProjectsLocationsJobsListOptions {
  /**
   * The kind of filter to use.
   */
  filter?:  | "UNKNOWN" | "ALL" | "TERMINATED" | "ACTIVE";
  /**
   * Optional. The job name. Optional.
   */
  name?: string;
  /**
   * If there are many jobs, limit response to at most this many. The actual
   * number of jobs returned will be the lesser of max_responses and an
   * unspecified server-defined limit.
   */
  pageSize?: number;
  /**
   * Set this to the 'next_page_token' field of a previous response to request
   * additional results in a long list.
   */
  pageToken?: string;
  /**
   * Deprecated. ListJobs always returns summaries now. Use GetJob for other
   * JobViews.
   */
  view?:  | "JOB_VIEW_UNKNOWN" | "JOB_VIEW_SUMMARY" | "JOB_VIEW_ALL" | "JOB_VIEW_DESCRIPTION";
}

/**
 * Additional options for Dataflow#projectsLocationsJobsMessagesList.
 */
export interface ProjectsLocationsJobsMessagesListOptions {
  /**
   * Return only messages with timestamps < end_time. The default is now (i.e.
   * return up to the latest messages available).
   */
  endTime?: Date;
  /**
   * Filter to only get messages with importance >= level
   */
  minimumImportance?:  | "JOB_MESSAGE_IMPORTANCE_UNKNOWN" | "JOB_MESSAGE_DEBUG" | "JOB_MESSAGE_DETAILED" | "JOB_MESSAGE_BASIC" | "JOB_MESSAGE_WARNING" | "JOB_MESSAGE_ERROR";
  /**
   * If specified, determines the maximum number of messages to return. If
   * unspecified, the service may choose an appropriate default, or may return
   * an arbitrarily large number of results.
   */
  pageSize?: number;
  /**
   * If supplied, this should be the value of next_page_token returned by an
   * earlier call. This will cause the next page of results to be returned.
   */
  pageToken?: string;
  /**
   * If specified, return only messages with timestamps >= start_time. The
   * default is the job creation time (i.e. beginning of messages).
   */
  startTime?: Date;
}

function serializeProjectsLocationsJobsMessagesListOptions(data: any): ProjectsLocationsJobsMessagesListOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeProjectsLocationsJobsMessagesListOptions(data: any): ProjectsLocationsJobsMessagesListOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Additional options for
 * Dataflow#projectsLocationsJobsStagesGetExecutionDetails.
 */
export interface ProjectsLocationsJobsStagesGetExecutionDetailsOptions {
  /**
   * Upper time bound of work items to include, by start time.
   */
  endTime?: Date;
  /**
   * If specified, determines the maximum number of work items to return. If
   * unspecified, the service may choose an appropriate default, or may return
   * an arbitrarily large number of results.
   */
  pageSize?: number;
  /**
   * If supplied, this should be the value of next_page_token returned by an
   * earlier call. This will cause the next page of results to be returned.
   */
  pageToken?: string;
  /**
   * Lower time bound of work items to include, by start time.
   */
  startTime?: Date;
}

function serializeProjectsLocationsJobsStagesGetExecutionDetailsOptions(data: any): ProjectsLocationsJobsStagesGetExecutionDetailsOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeProjectsLocationsJobsStagesGetExecutionDetailsOptions(data: any): ProjectsLocationsJobsStagesGetExecutionDetailsOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Additional options for Dataflow#projectsLocationsSnapshotsList.
 */
export interface ProjectsLocationsSnapshotsListOptions {
  /**
   * If specified, list snapshots created from this job.
   */
  jobId?: string;
}

/**
 * Additional options for Dataflow#projectsLocationsTemplatesGet.
 */
export interface ProjectsLocationsTemplatesGetOptions {
  /**
   * Required. A Cloud Storage path to the template from which to create the
   * job. Must be valid Cloud Storage URL, beginning with 'gs://'.
   */
  gcsPath?: string;
  /**
   * The view to retrieve. Defaults to METADATA_ONLY.
   */
  view?:  | "METADATA_ONLY";
}

/**
 * Additional options for Dataflow#projectsLocationsTemplatesLaunch.
 */
export interface ProjectsLocationsTemplatesLaunchOptions {
  /**
   * Path to dynamic template spec file on Cloud Storage. The file must be a
   * Json serialized DynamicTemplateFieSpec object.
   */
  ["dynamicTemplate.gcsPath"]?: string;
  /**
   * Cloud Storage path for staging dependencies. Must be a valid Cloud Storage
   * URL, beginning with `gs://`.
   */
  ["dynamicTemplate.stagingLocation"]?: string;
  /**
   * A Cloud Storage path to the template from which to create the job. Must be
   * valid Cloud Storage URL, beginning with 'gs://'.
   */
  gcsPath?: string;
  /**
   * If true, the request is validated but not actually executed. Defaults to
   * false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Dataflow#projectsSnapshotsGet.
 */
export interface ProjectsSnapshotsGetOptions {
  /**
   * The location that contains this snapshot.
   */
  location?: string;
}

/**
 * Additional options for Dataflow#projectsSnapshotsList.
 */
export interface ProjectsSnapshotsListOptions {
  /**
   * If specified, list snapshots created from this job.
   */
  jobId?: string;
  /**
   * The location to list snapshots in.
   */
  location?: string;
}

/**
 * Additional options for Dataflow#projectsTemplatesGet.
 */
export interface ProjectsTemplatesGetOptions {
  /**
   * Required. A Cloud Storage path to the template from which to create the
   * job. Must be valid Cloud Storage URL, beginning with 'gs://'.
   */
  gcsPath?: string;
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to
   * which to direct the request.
   */
  location?: string;
  /**
   * The view to retrieve. Defaults to METADATA_ONLY.
   */
  view?:  | "METADATA_ONLY";
}

/**
 * Additional options for Dataflow#projectsTemplatesLaunch.
 */
export interface ProjectsTemplatesLaunchOptions {
  /**
   * Path to dynamic template spec file on Cloud Storage. The file must be a
   * Json serialized DynamicTemplateFieSpec object.
   */
  ["dynamicTemplate.gcsPath"]?: string;
  /**
   * Cloud Storage path for staging dependencies. Must be a valid Cloud Storage
   * URL, beginning with `gs://`.
   */
  ["dynamicTemplate.stagingLocation"]?: string;
  /**
   * A Cloud Storage path to the template from which to create the job. Must be
   * valid Cloud Storage URL, beginning with 'gs://'.
   */
  gcsPath?: string;
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to
   * which to direct the request.
   */
  location?: string;
  /**
   * If true, the request is validated but not actually executed. Defaults to
   * false.
   */
  validateOnly?: boolean;
}

/**
 * Metadata for a Pub/Sub connector used by the job.
 */
export interface PubSubIODetails {
  /**
   * Subscription used in the connection.
   */
  subscription?: string;
  /**
   * Topic accessed in the connection.
   */
  topic?: string;
}

/**
 * Identifies a pubsub location to use for transferring data into or out of a
 * streaming Dataflow job.
 */
export interface PubsubLocation {
  /**
   * Indicates whether the pipeline allows late-arriving data.
   */
  dropLateData?: boolean;
  /**
   * If set, contains a pubsub label from which to extract record ids. If left
   * empty, record deduplication will be strictly best effort.
   */
  idLabel?: string;
  /**
   * A pubsub subscription, in the form of
   * "pubsub.googleapis.com/subscriptions//"
   */
  subscription?: string;
  /**
   * If set, contains a pubsub label from which to extract record timestamps.
   * If left empty, record timestamps will be generated upon arrival.
   */
  timestampLabel?: string;
  /**
   * A pubsub topic, in the form of "pubsub.googleapis.com/topics//"
   */
  topic?: string;
  /**
   * If set, specifies the pubsub subscription that will be used for tracking
   * custom time timestamps for watermark estimation.
   */
  trackingSubscription?: string;
  /**
   * If true, then the client has requested to get pubsub attributes.
   */
  withAttributes?: boolean;
}

/**
 * Represents a Pubsub snapshot.
 */
export interface PubsubSnapshotMetadata {
  /**
   * The expire time of the Pubsub snapshot.
   */
  expireTime?: Date;
  /**
   * The name of the Pubsub snapshot.
   */
  snapshotName?: string;
  /**
   * The name of the Pubsub topic.
   */
  topicName?: string;
}

function serializePubsubSnapshotMetadata(data: any): PubsubSnapshotMetadata {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
  };
}

function deserializePubsubSnapshotMetadata(data: any): PubsubSnapshotMetadata {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
  };
}

/**
 * An instruction that reads records. Takes no inputs, produces one output.
 */
export interface ReadInstruction {
  /**
   * The source to read from.
   */
  source?: Source;
}

function serializeReadInstruction(data: any): ReadInstruction {
  return {
    ...data,
    source: data["source"] !== undefined ? serializeSource(data["source"]) : undefined,
  };
}

function deserializeReadInstruction(data: any): ReadInstruction {
  return {
    ...data,
    source: data["source"] !== undefined ? deserializeSource(data["source"]) : undefined,
  };
}

/**
 * Represents the level of parallelism in a WorkItem's input, reported by the
 * worker.
 */
export interface ReportedParallelism {
  /**
   * Specifies whether the parallelism is infinite. If true, "value" is
   * ignored. Infinite parallelism means the service will assume that the work
   * item can always be split into more non-empty work items by dynamic
   * splitting. This is a work-around for lack of support for infinity by the
   * current JSON-based Java RPC stack.
   */
  isInfinite?: boolean;
  /**
   * Specifies the level of parallelism in case it is finite.
   */
  value?: number;
}

/**
 * Request to report the status of WorkItems.
 */
export interface ReportWorkItemStatusRequest {
  /**
   * The current timestamp at the worker.
   */
  currentWorkerTime?: Date;
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * contains the WorkItem's job.
   */
  location?: string;
  /**
   * Untranslated bag-of-bytes WorkProgressUpdateRequest from UnifiedWorker.
   */
  unifiedWorkerRequest?: {
    [key: string]: any
  };
  /**
   * The ID of the worker reporting the WorkItem status. If this does not match
   * the ID of the worker which the Dataflow service believes currently has the
   * lease on the WorkItem, the report will be dropped (with an error response).
   */
  workerId?: string;
  /**
   * The order is unimportant, except that the order of the
   * WorkItemServiceState messages in the ReportWorkItemStatusResponse
   * corresponds to the order of WorkItemStatus messages here.
   */
  workItemStatuses?: WorkItemStatus[];
}

function serializeReportWorkItemStatusRequest(data: any): ReportWorkItemStatusRequest {
  return {
    ...data,
    currentWorkerTime: data["currentWorkerTime"] !== undefined ? data["currentWorkerTime"].toISOString() : undefined,
    workItemStatuses: data["workItemStatuses"] !== undefined ? data["workItemStatuses"].map((item: any) => (serializeWorkItemStatus(item))) : undefined,
  };
}

function deserializeReportWorkItemStatusRequest(data: any): ReportWorkItemStatusRequest {
  return {
    ...data,
    currentWorkerTime: data["currentWorkerTime"] !== undefined ? new Date(data["currentWorkerTime"]) : undefined,
    workItemStatuses: data["workItemStatuses"] !== undefined ? data["workItemStatuses"].map((item: any) => (deserializeWorkItemStatus(item))) : undefined,
  };
}

/**
 * Response from a request to report the status of WorkItems.
 */
export interface ReportWorkItemStatusResponse {
  /**
   * Untranslated bag-of-bytes WorkProgressUpdateResponse for UnifiedWorker.
   */
  unifiedWorkerResponse?: {
    [key: string]: any
  };
  /**
   * A set of messages indicating the service-side state for each WorkItem
   * whose status was reported, in the same order as the WorkItemStatus messages
   * in the ReportWorkItemStatusRequest which resulting in this response.
   */
  workItemServiceStates?: WorkItemServiceState[];
}

function serializeReportWorkItemStatusResponse(data: any): ReportWorkItemStatusResponse {
  return {
    ...data,
    workItemServiceStates: data["workItemServiceStates"] !== undefined ? data["workItemServiceStates"].map((item: any) => (serializeWorkItemServiceState(item))) : undefined,
  };
}

function deserializeReportWorkItemStatusResponse(data: any): ReportWorkItemStatusResponse {
  return {
    ...data,
    workItemServiceStates: data["workItemServiceStates"] !== undefined ? data["workItemServiceStates"].map((item: any) => (deserializeWorkItemServiceState(item))) : undefined,
  };
}

/**
 * Worker metrics exported from workers. This contains resource utilization
 * metrics accumulated from a variety of sources. For more information, see
 * go/df-resource-signals.
 */
export interface ResourceUtilizationReport {
  /**
   * Per container information. Key: container name.
   */
  containers?: {
    [key: string]: ResourceUtilizationReport
  };
  /**
   * CPU utilization samples.
   */
  cpuTime?: CPUTime[];
  /**
   * Memory utilization samples.
   */
  memoryInfo?: MemInfo[];
}

function serializeResourceUtilizationReport(data: any): ResourceUtilizationReport {
  return {
    ...data,
    containers: data["containers"] !== undefined ? Object.fromEntries(Object.entries(data["containers"]).map(([k, v]: [string, any]) => ([k, serializeResourceUtilizationReport(v)]))) : undefined,
    cpuTime: data["cpuTime"] !== undefined ? data["cpuTime"].map((item: any) => (serializeCPUTime(item))) : undefined,
    memoryInfo: data["memoryInfo"] !== undefined ? data["memoryInfo"].map((item: any) => (serializeMemInfo(item))) : undefined,
  };
}

function deserializeResourceUtilizationReport(data: any): ResourceUtilizationReport {
  return {
    ...data,
    containers: data["containers"] !== undefined ? Object.fromEntries(Object.entries(data["containers"]).map(([k, v]: [string, any]) => ([k, deserializeResourceUtilizationReport(v)]))) : undefined,
    cpuTime: data["cpuTime"] !== undefined ? data["cpuTime"].map((item: any) => (deserializeCPUTime(item))) : undefined,
    memoryInfo: data["memoryInfo"] !== undefined ? data["memoryInfo"].map((item: any) => (deserializeMemInfo(item))) : undefined,
  };
}

/**
 * Service-side response to WorkerMessage reporting resource utilization.
 */
export interface ResourceUtilizationReportResponse {
}

/**
 * The environment values to set at runtime.
 */
export interface RuntimeEnvironment {
  /**
   * Optional. Additional experiment flags for the job, specified with the
   * `--experiments` option.
   */
  additionalExperiments?: string[];
  /**
   * Optional. Additional user labels to be specified for the job. Keys and
   * values should follow the restrictions specified in the [labeling
   * restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions)
   * page. An object containing a list of "key": value pairs. Example: { "name":
   * "wrench", "mass": "1kg", "count": "3" }.
   */
  additionalUserLabels?: {
    [key: string]: string
  };
  /**
   * Optional. Whether to bypass the safety checks for the job's temporary
   * directory. Use with caution.
   */
  bypassTempDirValidation?: boolean;
  /**
   * Optional. Whether to enable Streaming Engine for the job.
   */
  enableStreamingEngine?: boolean;
  /**
   * Optional. Configuration for VM IPs.
   */
  ipConfiguration?:  | "WORKER_IP_UNSPECIFIED" | "WORKER_IP_PUBLIC" | "WORKER_IP_PRIVATE";
  /**
   * Optional. Name for the Cloud KMS key for the job. Key format is:
   * projects//locations//keyRings//cryptoKeys/
   */
  kmsKeyName?: string;
  /**
   * Optional. The machine type to use for the job. Defaults to the value from
   * the template if not specified.
   */
  machineType?: string;
  /**
   * Optional. The maximum number of Google Compute Engine instances to be made
   * available to your pipeline during execution, from 1 to 1000. The default
   * value is 1.
   */
  maxWorkers?: number;
  /**
   * Optional. Network to which VMs will be assigned. If empty or unspecified,
   * the service will use the network "default".
   */
  network?: string;
  /**
   * Optional. The initial number of Google Compute Engine instances for the
   * job. The default value is 11.
   */
  numWorkers?: number;
  /**
   * Optional. The email address of the service account to run the job as.
   */
  serviceAccountEmail?: string;
  /**
   * Optional. Subnetwork to which VMs will be assigned, if desired. You can
   * specify a subnetwork using either a complete URL or an abbreviated path.
   * Expected to be of the form
   * "https://www.googleapis.com/compute/v1/projects/HOST_PROJECT_ID/regions/REGION/subnetworks/SUBNETWORK"
   * or "regions/REGION/subnetworks/SUBNETWORK". If the subnetwork is located in
   * a Shared VPC network, you must use the complete URL.
   */
  subnetwork?: string;
  /**
   * Required. The Cloud Storage path to use for temporary files. Must be a
   * valid Cloud Storage URL, beginning with `gs://`.
   */
  tempLocation?: string;
  /**
   * Required. The Compute Engine region
   * (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in
   * which worker processing should occur, e.g. "us-west1". Mutually exclusive
   * with worker_zone. If neither worker_region nor worker_zone is specified,
   * default to the control plane's region.
   */
  workerRegion?: string;
  /**
   * Optional. The Compute Engine zone
   * (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in
   * which worker processing should occur, e.g. "us-west1-a". Mutually exclusive
   * with worker_region. If neither worker_region nor worker_zone is specified,
   * a zone in the control plane's region is chosen based on available capacity.
   * If both `worker_zone` and `zone` are set, `worker_zone` takes precedence.
   */
  workerZone?: string;
  /**
   * Optional. The Compute Engine [availability
   * zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones)
   * for launching worker instances to run your pipeline. In the future,
   * worker_zone will take precedence.
   */
  zone?: string;
}

/**
 * RuntimeMetadata describing a runtime environment.
 */
export interface RuntimeMetadata {
  /**
   * The parameters for the template.
   */
  parameters?: ParameterMetadata[];
  /**
   * SDK Info for the template.
   */
  sdkInfo?: SDKInfo;
}

/**
 * Defines an SDK harness container for executing Dataflow pipelines.
 */
export interface SdkHarnessContainerImage {
  /**
   * The set of capabilities enumerated in the above Environment proto. See
   * also
   * [beam_runner_api.proto](https://github.com/apache/beam/blob/master/model/pipeline/src/main/proto/org/apache/beam/model/pipeline/v1/beam_runner_api.proto)
   */
  capabilities?: string[];
  /**
   * A docker container image that resides in Google Container Registry.
   */
  containerImage?: string;
  /**
   * Environment ID for the Beam runner API proto Environment that corresponds
   * to the current SDK Harness.
   */
  environmentId?: string;
  /**
   * If true, recommends the Dataflow service to use only one core per SDK
   * container instance with this image. If false (or unset) recommends using
   * more than one core per SDK container instance with this image for
   * efficiency. Note that Dataflow service may choose to override this property
   * if needed.
   */
  useSingleCorePerContainer?: boolean;
}

/**
 * SDK Information.
 */
export interface SDKInfo {
  /**
   * Required. The SDK Language.
   */
  language?:  | "UNKNOWN" | "JAVA" | "PYTHON" | "GO";
  /**
   * Optional. The SDK version.
   */
  version?: string;
}

/**
 * The version of the SDK used to run the job.
 */
export interface SdkVersion {
  /**
   * The support status for this SDK version.
   */
  sdkSupportStatus?:  | "UNKNOWN" | "SUPPORTED" | "STALE" | "DEPRECATED" | "UNSUPPORTED";
  /**
   * The version of the SDK used to run the job.
   */
  version?: string;
  /**
   * A readable string describing the version of the SDK.
   */
  versionDisplayName?: string;
}

/**
 * Request to send encoded debug information. Next ID: 8
 */
export interface SendDebugCaptureRequest {
  /**
   * The internal component id for which debug information is sent.
   */
  componentId?: string;
  /**
   * The encoded debug information.
   */
  data?: string;
  /**
   * Format for the data field above (id=5).
   */
  dataFormat?:  | "DATA_FORMAT_UNSPECIFIED" | "RAW" | "JSON" | "ZLIB" | "BROTLI";
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * contains the job specified by job_id.
   */
  location?: string;
  /**
   * The worker id, i.e., VM hostname.
   */
  workerId?: string;
}

/**
 * Response to a send capture request. nothing
 */
export interface SendDebugCaptureResponse {
}

/**
 * A request for sending worker messages to the service.
 */
export interface SendWorkerMessagesRequest {
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) that
   * contains the job.
   */
  location?: string;
  /**
   * The WorkerMessages to send.
   */
  workerMessages?: WorkerMessage[];
}

function serializeSendWorkerMessagesRequest(data: any): SendWorkerMessagesRequest {
  return {
    ...data,
    workerMessages: data["workerMessages"] !== undefined ? data["workerMessages"].map((item: any) => (serializeWorkerMessage(item))) : undefined,
  };
}

function deserializeSendWorkerMessagesRequest(data: any): SendWorkerMessagesRequest {
  return {
    ...data,
    workerMessages: data["workerMessages"] !== undefined ? data["workerMessages"].map((item: any) => (deserializeWorkerMessage(item))) : undefined,
  };
}

/**
 * The response to the worker messages.
 */
export interface SendWorkerMessagesResponse {
  /**
   * The servers response to the worker messages.
   */
  workerMessageResponses?: WorkerMessageResponse[];
}

function serializeSendWorkerMessagesResponse(data: any): SendWorkerMessagesResponse {
  return {
    ...data,
    workerMessageResponses: data["workerMessageResponses"] !== undefined ? data["workerMessageResponses"].map((item: any) => (serializeWorkerMessageResponse(item))) : undefined,
  };
}

function deserializeSendWorkerMessagesResponse(data: any): SendWorkerMessagesResponse {
  return {
    ...data,
    workerMessageResponses: data["workerMessageResponses"] !== undefined ? data["workerMessageResponses"].map((item: any) => (deserializeWorkerMessageResponse(item))) : undefined,
  };
}

/**
 * Describes a particular function to invoke.
 */
export interface SeqMapTask {
  /**
   * Information about each of the inputs.
   */
  inputs?: SideInputInfo[];
  /**
   * The user-provided name of the SeqDo operation.
   */
  name?: string;
  /**
   * Information about each of the outputs.
   */
  outputInfos?: SeqMapTaskOutputInfo[];
  /**
   * System-defined name of the stage containing the SeqDo operation. Unique
   * across the workflow.
   */
  stageName?: string;
  /**
   * System-defined name of the SeqDo operation. Unique across the workflow.
   */
  systemName?: string;
  /**
   * The user function to invoke.
   */
  userFn?: {
    [key: string]: any
  };
}

function serializeSeqMapTask(data: any): SeqMapTask {
  return {
    ...data,
    inputs: data["inputs"] !== undefined ? data["inputs"].map((item: any) => (serializeSideInputInfo(item))) : undefined,
  };
}

function deserializeSeqMapTask(data: any): SeqMapTask {
  return {
    ...data,
    inputs: data["inputs"] !== undefined ? data["inputs"].map((item: any) => (deserializeSideInputInfo(item))) : undefined,
  };
}

/**
 * Information about an output of a SeqMapTask.
 */
export interface SeqMapTaskOutputInfo {
  /**
   * The sink to write the output value to.
   */
  sink?: Sink;
  /**
   * The id of the TupleTag the user code will tag the output value by.
   */
  tag?: string;
}

/**
 * A task which consists of a shell command for the worker to execute.
 */
export interface ShellTask {
  /**
   * The shell command to run.
   */
  command?: string;
  /**
   * Exit code for the task.
   */
  exitCode?: number;
}

/**
 * Information about a side input of a DoFn or an input of a SeqDoFn.
 */
export interface SideInputInfo {
  /**
   * How to interpret the source element(s) as a side input value.
   */
  kind?: {
    [key: string]: any
  };
  /**
   * The source(s) to read element(s) from to get the value of this side input.
   * If more than one source, then the elements are taken from the sources, in
   * the specified order if order matters. At least one source is required.
   */
  sources?: Source[];
  /**
   * The id of the tag the user code will access this side input by; this
   * should correspond to the tag of some MultiOutputInfo.
   */
  tag?: string;
}

function serializeSideInputInfo(data: any): SideInputInfo {
  return {
    ...data,
    sources: data["sources"] !== undefined ? data["sources"].map((item: any) => (serializeSource(item))) : undefined,
  };
}

function deserializeSideInputInfo(data: any): SideInputInfo {
  return {
    ...data,
    sources: data["sources"] !== undefined ? data["sources"].map((item: any) => (deserializeSource(item))) : undefined,
  };
}

/**
 * A sink that records can be encoded and written to.
 */
export interface Sink {
  /**
   * The codec to use to encode data written to the sink.
   */
  codec?: {
    [key: string]: any
  };
  /**
   * The sink to write to, plus its parameters.
   */
  spec?: {
    [key: string]: any
  };
}

/**
 * Represents a snapshot of a job.
 */
export interface Snapshot {
  /**
   * The time this snapshot was created.
   */
  creationTime?: Date;
  /**
   * User specified description of the snapshot. Maybe empty.
   */
  description?: string;
  /**
   * The disk byte size of the snapshot. Only available for snapshots in READY
   * state.
   */
  diskSizeBytes?: bigint;
  /**
   * The unique ID of this snapshot.
   */
  id?: string;
  /**
   * The project this snapshot belongs to.
   */
  projectId?: string;
  /**
   * Pub/Sub snapshot metadata.
   */
  pubsubMetadata?: PubsubSnapshotMetadata[];
  /**
   * Cloud region where this snapshot lives in, e.g., "us-central1".
   */
  region?: string;
  /**
   * The job this snapshot was created from.
   */
  sourceJobId?: string;
  /**
   * State of the snapshot.
   */
  state?:  | "UNKNOWN_SNAPSHOT_STATE" | "PENDING" | "RUNNING" | "READY" | "FAILED" | "DELETED";
  /**
   * The time after which this snapshot will be automatically deleted.
   */
  ttl?: number /* Duration */;
}

function serializeSnapshot(data: any): Snapshot {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? data["creationTime"].toISOString() : undefined,
    diskSizeBytes: data["diskSizeBytes"] !== undefined ? String(data["diskSizeBytes"]) : undefined,
    pubsubMetadata: data["pubsubMetadata"] !== undefined ? data["pubsubMetadata"].map((item: any) => (serializePubsubSnapshotMetadata(item))) : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

function deserializeSnapshot(data: any): Snapshot {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
    diskSizeBytes: data["diskSizeBytes"] !== undefined ? BigInt(data["diskSizeBytes"]) : undefined,
    pubsubMetadata: data["pubsubMetadata"] !== undefined ? data["pubsubMetadata"].map((item: any) => (deserializePubsubSnapshotMetadata(item))) : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

/**
 * Request to create a snapshot of a job.
 */
export interface SnapshotJobRequest {
  /**
   * User specified description of the snapshot. Maybe empty.
   */
  description?: string;
  /**
   * The location that contains this job.
   */
  location?: string;
  /**
   * If true, perform snapshots for sources which support this.
   */
  snapshotSources?: boolean;
  /**
   * TTL for the snapshot.
   */
  ttl?: number /* Duration */;
}

function serializeSnapshotJobRequest(data: any): SnapshotJobRequest {
  return {
    ...data,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

function deserializeSnapshotJobRequest(data: any): SnapshotJobRequest {
  return {
    ...data,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

/**
 * A source that records can be read and decoded from.
 */
export interface Source {
  /**
   * While splitting, sources may specify the produced bundles as differences
   * against another source, in order to save backend-side memory and allow
   * bigger jobs. For details, see SourceSplitRequest. To support this use case,
   * the full set of parameters of the source is logically obtained by taking
   * the latest explicitly specified value of each parameter in the order:
   * base_specs (later items win), spec (overrides anything in base_specs).
   */
  baseSpecs?: {
    [key: string]: any
  }[];
  /**
   * The codec to use to decode data read from the source.
   */
  codec?: {
    [key: string]: any
  };
  /**
   * Setting this value to true hints to the framework that the source doesn't
   * need splitting, and using SourceSplitRequest on it would yield
   * SOURCE_SPLIT_OUTCOME_USE_CURRENT. E.g. a file splitter may set this to true
   * when splitting a single file into a set of byte ranges of appropriate size,
   * and set this to false when splitting a filepattern into individual files.
   * However, for efficiency, a file splitter may decide to produce file
   * subranges directly from the filepattern to avoid a splitting round-trip.
   * See SourceSplitRequest for an overview of the splitting process. This field
   * is meaningful only in the Source objects populated by the user (e.g. when
   * filling in a DerivedSource). Source objects supplied by the framework to
   * the user don't have this field populated.
   */
  doesNotNeedSplitting?: boolean;
  /**
   * Optionally, metadata for this source can be supplied right away, avoiding
   * a SourceGetMetadataOperation roundtrip (see SourceOperationRequest). This
   * field is meaningful only in the Source objects populated by the user (e.g.
   * when filling in a DerivedSource). Source objects supplied by the framework
   * to the user don't have this field populated.
   */
  metadata?: SourceMetadata;
  /**
   * The source to read from, plus its parameters.
   */
  spec?: {
    [key: string]: any
  };
}

function serializeSource(data: any): Source {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? serializeSourceMetadata(data["metadata"]) : undefined,
  };
}

function deserializeSource(data: any): Source {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? deserializeSourceMetadata(data["metadata"]) : undefined,
  };
}

/**
 * DEPRECATED in favor of DynamicSourceSplit.
 */
export interface SourceFork {
  /**
   * DEPRECATED
   */
  primary?: SourceSplitShard;
  /**
   * DEPRECATED
   */
  primarySource?: DerivedSource;
  /**
   * DEPRECATED
   */
  residual?: SourceSplitShard;
  /**
   * DEPRECATED
   */
  residualSource?: DerivedSource;
}

function serializeSourceFork(data: any): SourceFork {
  return {
    ...data,
    primary: data["primary"] !== undefined ? serializeSourceSplitShard(data["primary"]) : undefined,
    primarySource: data["primarySource"] !== undefined ? serializeDerivedSource(data["primarySource"]) : undefined,
    residual: data["residual"] !== undefined ? serializeSourceSplitShard(data["residual"]) : undefined,
    residualSource: data["residualSource"] !== undefined ? serializeDerivedSource(data["residualSource"]) : undefined,
  };
}

function deserializeSourceFork(data: any): SourceFork {
  return {
    ...data,
    primary: data["primary"] !== undefined ? deserializeSourceSplitShard(data["primary"]) : undefined,
    primarySource: data["primarySource"] !== undefined ? deserializeDerivedSource(data["primarySource"]) : undefined,
    residual: data["residual"] !== undefined ? deserializeSourceSplitShard(data["residual"]) : undefined,
    residualSource: data["residualSource"] !== undefined ? deserializeDerivedSource(data["residualSource"]) : undefined,
  };
}

/**
 * A request to compute the SourceMetadata of a Source.
 */
export interface SourceGetMetadataRequest {
  /**
   * Specification of the source whose metadata should be computed.
   */
  source?: Source;
}

function serializeSourceGetMetadataRequest(data: any): SourceGetMetadataRequest {
  return {
    ...data,
    source: data["source"] !== undefined ? serializeSource(data["source"]) : undefined,
  };
}

function deserializeSourceGetMetadataRequest(data: any): SourceGetMetadataRequest {
  return {
    ...data,
    source: data["source"] !== undefined ? deserializeSource(data["source"]) : undefined,
  };
}

/**
 * The result of a SourceGetMetadataOperation.
 */
export interface SourceGetMetadataResponse {
  /**
   * The computed metadata.
   */
  metadata?: SourceMetadata;
}

function serializeSourceGetMetadataResponse(data: any): SourceGetMetadataResponse {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? serializeSourceMetadata(data["metadata"]) : undefined,
  };
}

function deserializeSourceGetMetadataResponse(data: any): SourceGetMetadataResponse {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? deserializeSourceMetadata(data["metadata"]) : undefined,
  };
}

/**
 * Metadata about a Source useful for automatically optimizing and tuning the
 * pipeline, etc.
 */
export interface SourceMetadata {
  /**
   * An estimate of the total size (in bytes) of the data that would be read
   * from this source. This estimate is in terms of external storage size,
   * before any decompression or other processing done by the reader.
   */
  estimatedSizeBytes?: bigint;
  /**
   * Specifies that the size of this source is known to be infinite (this is a
   * streaming source).
   */
  infinite?: boolean;
  /**
   * Whether this source is known to produce key/value pairs with the (encoded)
   * keys in lexicographically sorted order.
   */
  producesSortedKeys?: boolean;
}

function serializeSourceMetadata(data: any): SourceMetadata {
  return {
    ...data,
    estimatedSizeBytes: data["estimatedSizeBytes"] !== undefined ? String(data["estimatedSizeBytes"]) : undefined,
  };
}

function deserializeSourceMetadata(data: any): SourceMetadata {
  return {
    ...data,
    estimatedSizeBytes: data["estimatedSizeBytes"] !== undefined ? BigInt(data["estimatedSizeBytes"]) : undefined,
  };
}

/**
 * A work item that represents the different operations that can be performed
 * on a user-defined Source specification.
 */
export interface SourceOperationRequest {
  /**
   * Information about a request to get metadata about a source.
   */
  getMetadata?: SourceGetMetadataRequest;
  /**
   * User-provided name of the Read instruction for this source.
   */
  name?: string;
  /**
   * System-defined name for the Read instruction for this source in the
   * original workflow graph.
   */
  originalName?: string;
  /**
   * Information about a request to split a source.
   */
  split?: SourceSplitRequest;
  /**
   * System-defined name of the stage containing the source operation. Unique
   * across the workflow.
   */
  stageName?: string;
  /**
   * System-defined name of the Read instruction for this source. Unique across
   * the workflow.
   */
  systemName?: string;
}

function serializeSourceOperationRequest(data: any): SourceOperationRequest {
  return {
    ...data,
    getMetadata: data["getMetadata"] !== undefined ? serializeSourceGetMetadataRequest(data["getMetadata"]) : undefined,
    split: data["split"] !== undefined ? serializeSourceSplitRequest(data["split"]) : undefined,
  };
}

function deserializeSourceOperationRequest(data: any): SourceOperationRequest {
  return {
    ...data,
    getMetadata: data["getMetadata"] !== undefined ? deserializeSourceGetMetadataRequest(data["getMetadata"]) : undefined,
    split: data["split"] !== undefined ? deserializeSourceSplitRequest(data["split"]) : undefined,
  };
}

/**
 * The result of a SourceOperationRequest, specified in
 * ReportWorkItemStatusRequest.source_operation when the work item is completed.
 */
export interface SourceOperationResponse {
  /**
   * A response to a request to get metadata about a source.
   */
  getMetadata?: SourceGetMetadataResponse;
  /**
   * A response to a request to split a source.
   */
  split?: SourceSplitResponse;
}

function serializeSourceOperationResponse(data: any): SourceOperationResponse {
  return {
    ...data,
    getMetadata: data["getMetadata"] !== undefined ? serializeSourceGetMetadataResponse(data["getMetadata"]) : undefined,
    split: data["split"] !== undefined ? serializeSourceSplitResponse(data["split"]) : undefined,
  };
}

function deserializeSourceOperationResponse(data: any): SourceOperationResponse {
  return {
    ...data,
    getMetadata: data["getMetadata"] !== undefined ? deserializeSourceGetMetadataResponse(data["getMetadata"]) : undefined,
    split: data["split"] !== undefined ? deserializeSourceSplitResponse(data["split"]) : undefined,
  };
}

/**
 * Hints for splitting a Source into bundles (parts for parallel processing)
 * using SourceSplitRequest.
 */
export interface SourceSplitOptions {
  /**
   * The source should be split into a set of bundles where the estimated size
   * of each is approximately this many bytes.
   */
  desiredBundleSizeBytes?: bigint;
  /**
   * DEPRECATED in favor of desired_bundle_size_bytes.
   */
  desiredShardSizeBytes?: bigint;
}

function serializeSourceSplitOptions(data: any): SourceSplitOptions {
  return {
    ...data,
    desiredBundleSizeBytes: data["desiredBundleSizeBytes"] !== undefined ? String(data["desiredBundleSizeBytes"]) : undefined,
    desiredShardSizeBytes: data["desiredShardSizeBytes"] !== undefined ? String(data["desiredShardSizeBytes"]) : undefined,
  };
}

function deserializeSourceSplitOptions(data: any): SourceSplitOptions {
  return {
    ...data,
    desiredBundleSizeBytes: data["desiredBundleSizeBytes"] !== undefined ? BigInt(data["desiredBundleSizeBytes"]) : undefined,
    desiredShardSizeBytes: data["desiredShardSizeBytes"] !== undefined ? BigInt(data["desiredShardSizeBytes"]) : undefined,
  };
}

/**
 * Represents the operation to split a high-level Source specification into
 * bundles (parts for parallel processing). At a high level, splitting of a
 * source into bundles happens as follows: SourceSplitRequest is applied to the
 * source. If it returns SOURCE_SPLIT_OUTCOME_USE_CURRENT, no further splitting
 * happens and the source is used "as is". Otherwise, splitting is applied
 * recursively to each produced DerivedSource. As an optimization, for any
 * Source, if its does_not_need_splitting is true, the framework assumes that
 * splitting this source would return SOURCE_SPLIT_OUTCOME_USE_CURRENT, and
 * doesn't initiate a SourceSplitRequest. This applies both to the initial
 * source being split and to bundles produced from it.
 */
export interface SourceSplitRequest {
  /**
   * Hints for tuning the splitting process.
   */
  options?: SourceSplitOptions;
  /**
   * Specification of the source to be split.
   */
  source?: Source;
}

function serializeSourceSplitRequest(data: any): SourceSplitRequest {
  return {
    ...data,
    options: data["options"] !== undefined ? serializeSourceSplitOptions(data["options"]) : undefined,
    source: data["source"] !== undefined ? serializeSource(data["source"]) : undefined,
  };
}

function deserializeSourceSplitRequest(data: any): SourceSplitRequest {
  return {
    ...data,
    options: data["options"] !== undefined ? deserializeSourceSplitOptions(data["options"]) : undefined,
    source: data["source"] !== undefined ? deserializeSource(data["source"]) : undefined,
  };
}

/**
 * The response to a SourceSplitRequest.
 */
export interface SourceSplitResponse {
  /**
   * If outcome is SPLITTING_HAPPENED, then this is a list of bundles into
   * which the source was split. Otherwise this field is ignored. This list can
   * be empty, which means the source represents an empty input.
   */
  bundles?: DerivedSource[];
  /**
   * Indicates whether splitting happened and produced a list of bundles. If
   * this is USE_CURRENT_SOURCE_AS_IS, the current source should be processed
   * "as is" without splitting. "bundles" is ignored in this case. If this is
   * SPLITTING_HAPPENED, then "bundles" contains a list of bundles into which
   * the source was split.
   */
  outcome?:  | "SOURCE_SPLIT_OUTCOME_UNKNOWN" | "SOURCE_SPLIT_OUTCOME_USE_CURRENT" | "SOURCE_SPLIT_OUTCOME_SPLITTING_HAPPENED";
  /**
   * DEPRECATED in favor of bundles.
   */
  shards?: SourceSplitShard[];
}

function serializeSourceSplitResponse(data: any): SourceSplitResponse {
  return {
    ...data,
    bundles: data["bundles"] !== undefined ? data["bundles"].map((item: any) => (serializeDerivedSource(item))) : undefined,
    shards: data["shards"] !== undefined ? data["shards"].map((item: any) => (serializeSourceSplitShard(item))) : undefined,
  };
}

function deserializeSourceSplitResponse(data: any): SourceSplitResponse {
  return {
    ...data,
    bundles: data["bundles"] !== undefined ? data["bundles"].map((item: any) => (deserializeDerivedSource(item))) : undefined,
    shards: data["shards"] !== undefined ? data["shards"].map((item: any) => (deserializeSourceSplitShard(item))) : undefined,
  };
}

/**
 * DEPRECATED in favor of DerivedSource.
 */
export interface SourceSplitShard {
  /**
   * DEPRECATED
   */
  derivationMode?:  | "SOURCE_DERIVATION_MODE_UNKNOWN" | "SOURCE_DERIVATION_MODE_INDEPENDENT" | "SOURCE_DERIVATION_MODE_CHILD_OF_CURRENT" | "SOURCE_DERIVATION_MODE_SIBLING_OF_CURRENT";
  /**
   * DEPRECATED
   */
  source?: Source;
}

function serializeSourceSplitShard(data: any): SourceSplitShard {
  return {
    ...data,
    source: data["source"] !== undefined ? serializeSource(data["source"]) : undefined,
  };
}

function deserializeSourceSplitShard(data: any): SourceSplitShard {
  return {
    ...data,
    source: data["source"] !== undefined ? deserializeSource(data["source"]) : undefined,
  };
}

/**
 * Metadata for a Spanner connector used by the job.
 */
export interface SpannerIODetails {
  /**
   * DatabaseId accessed in the connection.
   */
  databaseId?: string;
  /**
   * InstanceId accessed in the connection.
   */
  instanceId?: string;
  /**
   * ProjectId accessed in the connection.
   */
  projectId?: string;
}

/**
 * A representation of an int64, n, that is immune to precision loss when
 * encoded in JSON.
 */
export interface SplitInt64 {
  /**
   * The high order bits, including the sign: n >> 32.
   */
  highBits?: number;
  /**
   * The low order bits: n & 0xffffffff.
   */
  lowBits?: number;
}

/**
 * Information about the workers and work items within a stage.
 */
export interface StageExecutionDetails {
  /**
   * If present, this response does not contain all requested tasks. To obtain
   * the next page of results, repeat the request with page_token set to this
   * value.
   */
  nextPageToken?: string;
  /**
   * Workers that have done work on the stage.
   */
  workers?: WorkerDetails[];
}

function serializeStageExecutionDetails(data: any): StageExecutionDetails {
  return {
    ...data,
    workers: data["workers"] !== undefined ? data["workers"].map((item: any) => (serializeWorkerDetails(item))) : undefined,
  };
}

function deserializeStageExecutionDetails(data: any): StageExecutionDetails {
  return {
    ...data,
    workers: data["workers"] !== undefined ? data["workers"].map((item: any) => (deserializeWorkerDetails(item))) : undefined,
  };
}

/**
 * Description of an input or output of an execution stage.
 */
export interface StageSource {
  /**
   * Dataflow service generated name for this source.
   */
  name?: string;
  /**
   * User name for the original user transform or collection with which this
   * source is most closely associated.
   */
  originalTransformOrCollection?: string;
  /**
   * Size of the source, if measurable.
   */
  sizeBytes?: bigint;
  /**
   * Human-readable name for this source; may be user or system generated.
   */
  userName?: string;
}

function serializeStageSource(data: any): StageSource {
  return {
    ...data,
    sizeBytes: data["sizeBytes"] !== undefined ? String(data["sizeBytes"]) : undefined,
  };
}

function deserializeStageSource(data: any): StageSource {
  return {
    ...data,
    sizeBytes: data["sizeBytes"] !== undefined ? BigInt(data["sizeBytes"]) : undefined,
  };
}

/**
 * Information about a particular execution stage of a job.
 */
export interface StageSummary {
  /**
   * End time of this stage. If the work item is completed, this is the actual
   * end time of the stage. Otherwise, it is the predicted end time.
   */
  endTime?: Date;
  /**
   * Metrics for this stage.
   */
  metrics?: MetricUpdate[];
  /**
   * Progress for this stage. Only applicable to Batch jobs.
   */
  progress?: ProgressTimeseries;
  /**
   * ID of this stage
   */
  stageId?: string;
  /**
   * Start time of this stage.
   */
  startTime?: Date;
  /**
   * State of this stage.
   */
  state?:  | "EXECUTION_STATE_UNKNOWN" | "EXECUTION_STATE_NOT_STARTED" | "EXECUTION_STATE_RUNNING" | "EXECUTION_STATE_SUCCEEDED" | "EXECUTION_STATE_FAILED" | "EXECUTION_STATE_CANCELLED";
  /**
   * Straggler summary for this stage.
   */
  stragglerSummary?: StragglerSummary;
}

function serializeStageSummary(data: any): StageSummary {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (serializeMetricUpdate(item))) : undefined,
    progress: data["progress"] !== undefined ? serializeProgressTimeseries(data["progress"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    stragglerSummary: data["stragglerSummary"] !== undefined ? serializeStragglerSummary(data["stragglerSummary"]) : undefined,
  };
}

function deserializeStageSummary(data: any): StageSummary {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (deserializeMetricUpdate(item))) : undefined,
    progress: data["progress"] !== undefined ? deserializeProgressTimeseries(data["progress"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    stragglerSummary: data["stragglerSummary"] !== undefined ? deserializeStragglerSummary(data["stragglerSummary"]) : undefined,
  };
}

/**
 * State family configuration.
 */
export interface StateFamilyConfig {
  /**
   * If true, this family corresponds to a read operation.
   */
  isRead?: boolean;
  /**
   * The state family value.
   */
  stateFamily?: string;
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
 * Defines a particular step within a Cloud Dataflow job. A job consists of
 * multiple steps, each of which performs some specific operation as part of the
 * overall job. Data is typically passed from one step to another as part of the
 * job. **Note:** The properties of this object are not stable and might change.
 * Here's an example of a sequence of steps which together implement a
 * Map-Reduce job: * Read a collection of data from some source, parsing the
 * collection's elements. * Validate the elements. * Apply a user-defined
 * function to map each element to some value and extract an element-specific
 * key value. * Group elements with the same key into a single element with that
 * key, transforming a multiply-keyed collection into a uniquely-keyed
 * collection. * Write the elements out to some data sink. Note that the Cloud
 * Dataflow service may be used to run many different types of jobs, not just
 * Map-Reduce.
 */
export interface Step {
  /**
   * The kind of step in the Cloud Dataflow job.
   */
  kind?: string;
  /**
   * The name that identifies the step. This must be unique for each step with
   * respect to all other steps in the Cloud Dataflow job.
   */
  name?: string;
  /**
   * Named properties associated with the step. Each kind of predefined step
   * has its own required set of properties. Must be provided on Create. Only
   * retrieved with JOB_VIEW_ALL.
   */
  properties?: {
    [key: string]: any
  };
}

/**
 * Information for a straggler.
 */
export interface Straggler {
  /**
   * Batch straggler identification and debugging information.
   */
  batchStraggler?: StragglerInfo;
  /**
   * Streaming straggler identification and debugging information.
   */
  streamingStraggler?: StreamingStragglerInfo;
}

function serializeStraggler(data: any): Straggler {
  return {
    ...data,
    batchStraggler: data["batchStraggler"] !== undefined ? serializeStragglerInfo(data["batchStraggler"]) : undefined,
    streamingStraggler: data["streamingStraggler"] !== undefined ? serializeStreamingStragglerInfo(data["streamingStraggler"]) : undefined,
  };
}

function deserializeStraggler(data: any): Straggler {
  return {
    ...data,
    batchStraggler: data["batchStraggler"] !== undefined ? deserializeStragglerInfo(data["batchStraggler"]) : undefined,
    streamingStraggler: data["streamingStraggler"] !== undefined ? deserializeStreamingStragglerInfo(data["streamingStraggler"]) : undefined,
  };
}

/**
 * Information useful for debugging a straggler. Each type will provide
 * specialized debugging information relevant for a particular cause. The
 * StragglerDebuggingInfo will be 1:1 mapping to the StragglerCause enum.
 */
export interface StragglerDebuggingInfo {
  /**
   * Hot key debugging details.
   */
  hotKey?: HotKeyDebuggingInfo;
}

function serializeStragglerDebuggingInfo(data: any): StragglerDebuggingInfo {
  return {
    ...data,
    hotKey: data["hotKey"] !== undefined ? serializeHotKeyDebuggingInfo(data["hotKey"]) : undefined,
  };
}

function deserializeStragglerDebuggingInfo(data: any): StragglerDebuggingInfo {
  return {
    ...data,
    hotKey: data["hotKey"] !== undefined ? deserializeHotKeyDebuggingInfo(data["hotKey"]) : undefined,
  };
}

/**
 * Information useful for straggler identification and debugging.
 */
export interface StragglerInfo {
  /**
   * The straggler causes, keyed by the string representation of the
   * StragglerCause enum and contains specialized debugging information for each
   * straggler cause.
   */
  causes?: {
    [key: string]: StragglerDebuggingInfo
  };
  /**
   * The time when the work item attempt became a straggler.
   */
  startTime?: Date;
}

function serializeStragglerInfo(data: any): StragglerInfo {
  return {
    ...data,
    causes: data["causes"] !== undefined ? Object.fromEntries(Object.entries(data["causes"]).map(([k, v]: [string, any]) => ([k, serializeStragglerDebuggingInfo(v)]))) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeStragglerInfo(data: any): StragglerInfo {
  return {
    ...data,
    causes: data["causes"] !== undefined ? Object.fromEntries(Object.entries(data["causes"]).map(([k, v]: [string, any]) => ([k, deserializeStragglerDebuggingInfo(v)]))) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Summarized straggler identification details.
 */
export interface StragglerSummary {
  /**
   * The most recent stragglers.
   */
  recentStragglers?: Straggler[];
  /**
   * Aggregated counts of straggler causes, keyed by the string representation
   * of the StragglerCause enum.
   */
  stragglerCauseCount?: {
    [key: string]: bigint
  };
  /**
   * The total count of stragglers.
   */
  totalStragglerCount?: bigint;
}

function serializeStragglerSummary(data: any): StragglerSummary {
  return {
    ...data,
    recentStragglers: data["recentStragglers"] !== undefined ? data["recentStragglers"].map((item: any) => (serializeStraggler(item))) : undefined,
    stragglerCauseCount: data["stragglerCauseCount"] !== undefined ? Object.fromEntries(Object.entries(data["stragglerCauseCount"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
    totalStragglerCount: data["totalStragglerCount"] !== undefined ? String(data["totalStragglerCount"]) : undefined,
  };
}

function deserializeStragglerSummary(data: any): StragglerSummary {
  return {
    ...data,
    recentStragglers: data["recentStragglers"] !== undefined ? data["recentStragglers"].map((item: any) => (deserializeStraggler(item))) : undefined,
    stragglerCauseCount: data["stragglerCauseCount"] !== undefined ? Object.fromEntries(Object.entries(data["stragglerCauseCount"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
    totalStragglerCount: data["totalStragglerCount"] !== undefined ? BigInt(data["totalStragglerCount"]) : undefined,
  };
}

/**
 * Streaming appliance snapshot configuration.
 */
export interface StreamingApplianceSnapshotConfig {
  /**
   * Indicates which endpoint is used to import appliance state.
   */
  importStateEndpoint?: string;
  /**
   * If set, indicates the snapshot id for the snapshot being performed.
   */
  snapshotId?: string;
}

/**
 * Configuration information for a single streaming computation.
 */
export interface StreamingComputationConfig {
  /**
   * Unique identifier for this computation.
   */
  computationId?: string;
  /**
   * Instructions that comprise the computation.
   */
  instructions?: ParallelInstruction[];
  /**
   * Stage name of this computation.
   */
  stageName?: string;
  /**
   * System defined name for this computation.
   */
  systemName?: string;
  /**
   * Map from user name of stateful transforms in this stage to their state
   * family.
   */
  transformUserNameToStateFamily?: {
    [key: string]: string
  };
}

function serializeStreamingComputationConfig(data: any): StreamingComputationConfig {
  return {
    ...data,
    instructions: data["instructions"] !== undefined ? data["instructions"].map((item: any) => (serializeParallelInstruction(item))) : undefined,
  };
}

function deserializeStreamingComputationConfig(data: any): StreamingComputationConfig {
  return {
    ...data,
    instructions: data["instructions"] !== undefined ? data["instructions"].map((item: any) => (deserializeParallelInstruction(item))) : undefined,
  };
}

/**
 * Describes full or partial data disk assignment information of the
 * computation ranges.
 */
export interface StreamingComputationRanges {
  /**
   * The ID of the computation.
   */
  computationId?: string;
  /**
   * Data disk assignments for ranges from this computation.
   */
  rangeAssignments?: KeyRangeDataDiskAssignment[];
}

/**
 * A task which describes what action should be performed for the specified
 * streaming computation ranges.
 */
export interface StreamingComputationTask {
  /**
   * Contains ranges of a streaming computation this task should apply to.
   */
  computationRanges?: StreamingComputationRanges[];
  /**
   * Describes the set of data disks this task should apply to.
   */
  dataDisks?: MountedDataDisk[];
  /**
   * A type of streaming computation task.
   */
  taskType?:  | "STREAMING_COMPUTATION_TASK_UNKNOWN" | "STREAMING_COMPUTATION_TASK_STOP" | "STREAMING_COMPUTATION_TASK_START";
}

/**
 * A task that carries configuration information for streaming computations.
 */
export interface StreamingConfigTask {
  /**
   * Chunk size for commit streams from the harness to windmill.
   */
  commitStreamChunkSizeBytes?: bigint;
  /**
   * Chunk size for get data streams from the harness to windmill.
   */
  getDataStreamChunkSizeBytes?: bigint;
  /**
   * Maximum size for work item commit supported windmill storage layer.
   */
  maxWorkItemCommitBytes?: bigint;
  /**
   * Set of computation configuration information.
   */
  streamingComputationConfigs?: StreamingComputationConfig[];
  /**
   * Map from user step names to state families.
   */
  userStepToStateFamilyNameMap?: {
    [key: string]: string
  };
  /**
   * If present, the worker must use this endpoint to communicate with Windmill
   * Service dispatchers, otherwise the worker must continue to use whatever
   * endpoint it had been using.
   */
  windmillServiceEndpoint?: string;
  /**
   * If present, the worker must use this port to communicate with Windmill
   * Service dispatchers. Only applicable when windmill_service_endpoint is
   * specified.
   */
  windmillServicePort?: bigint;
}

function serializeStreamingConfigTask(data: any): StreamingConfigTask {
  return {
    ...data,
    commitStreamChunkSizeBytes: data["commitStreamChunkSizeBytes"] !== undefined ? String(data["commitStreamChunkSizeBytes"]) : undefined,
    getDataStreamChunkSizeBytes: data["getDataStreamChunkSizeBytes"] !== undefined ? String(data["getDataStreamChunkSizeBytes"]) : undefined,
    maxWorkItemCommitBytes: data["maxWorkItemCommitBytes"] !== undefined ? String(data["maxWorkItemCommitBytes"]) : undefined,
    streamingComputationConfigs: data["streamingComputationConfigs"] !== undefined ? data["streamingComputationConfigs"].map((item: any) => (serializeStreamingComputationConfig(item))) : undefined,
    windmillServicePort: data["windmillServicePort"] !== undefined ? String(data["windmillServicePort"]) : undefined,
  };
}

function deserializeStreamingConfigTask(data: any): StreamingConfigTask {
  return {
    ...data,
    commitStreamChunkSizeBytes: data["commitStreamChunkSizeBytes"] !== undefined ? BigInt(data["commitStreamChunkSizeBytes"]) : undefined,
    getDataStreamChunkSizeBytes: data["getDataStreamChunkSizeBytes"] !== undefined ? BigInt(data["getDataStreamChunkSizeBytes"]) : undefined,
    maxWorkItemCommitBytes: data["maxWorkItemCommitBytes"] !== undefined ? BigInt(data["maxWorkItemCommitBytes"]) : undefined,
    streamingComputationConfigs: data["streamingComputationConfigs"] !== undefined ? data["streamingComputationConfigs"].map((item: any) => (deserializeStreamingComputationConfig(item))) : undefined,
    windmillServicePort: data["windmillServicePort"] !== undefined ? BigInt(data["windmillServicePort"]) : undefined,
  };
}

/**
 * A task which initializes part of a streaming Dataflow job.
 */
export interface StreamingSetupTask {
  /**
   * The user has requested drain.
   */
  drain?: boolean;
  /**
   * The TCP port on which the worker should listen for messages from other
   * streaming computation workers.
   */
  receiveWorkPort?: number;
  /**
   * Configures streaming appliance snapshot.
   */
  snapshotConfig?: StreamingApplianceSnapshotConfig;
  /**
   * The global topology of the streaming Dataflow job.
   */
  streamingComputationTopology?: TopologyConfig;
  /**
   * The TCP port used by the worker to communicate with the Dataflow worker
   * harness.
   */
  workerHarnessPort?: number;
}

/**
 * Identifies the location of a streaming side input.
 */
export interface StreamingSideInputLocation {
  /**
   * Identifies the state family where this side input is stored.
   */
  stateFamily?: string;
  /**
   * Identifies the particular side input within the streaming Dataflow job.
   */
  tag?: string;
}

/**
 * Identifies the location of a streaming computation stage, for stage-to-stage
 * communication.
 */
export interface StreamingStageLocation {
  /**
   * Identifies the particular stream within the streaming Dataflow job.
   */
  streamId?: string;
}

/**
 * Information useful for streaming straggler identification and debugging.
 */
export interface StreamingStragglerInfo {
  /**
   * The event-time watermark lag at the time of the straggler detection.
   */
  dataWatermarkLag?: number /* Duration */;
  /**
   * End time of this straggler.
   */
  endTime?: Date;
  /**
   * Start time of this straggler.
   */
  startTime?: Date;
  /**
   * The system watermark lag at the time of the straggler detection.
   */
  systemWatermarkLag?: number /* Duration */;
  /**
   * Name of the worker where the straggler was detected.
   */
  workerName?: string;
}

function serializeStreamingStragglerInfo(data: any): StreamingStragglerInfo {
  return {
    ...data,
    dataWatermarkLag: data["dataWatermarkLag"] !== undefined ? data["dataWatermarkLag"] : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    systemWatermarkLag: data["systemWatermarkLag"] !== undefined ? data["systemWatermarkLag"] : undefined,
  };
}

function deserializeStreamingStragglerInfo(data: any): StreamingStragglerInfo {
  return {
    ...data,
    dataWatermarkLag: data["dataWatermarkLag"] !== undefined ? data["dataWatermarkLag"] : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    systemWatermarkLag: data["systemWatermarkLag"] !== undefined ? data["systemWatermarkLag"] : undefined,
  };
}

/**
 * Describes a stream of data, either as input to be processed or as output of
 * a streaming Dataflow job.
 */
export interface StreamLocation {
  /**
   * The stream is a custom source.
   */
  customSourceLocation?: CustomSourceLocation;
  /**
   * The stream is a pubsub stream.
   */
  pubsubLocation?: PubsubLocation;
  /**
   * The stream is a streaming side input.
   */
  sideInputLocation?: StreamingSideInputLocation;
  /**
   * The stream is part of another computation within the current streaming
   * Dataflow job.
   */
  streamingStageLocation?: StreamingStageLocation;
}

/**
 * A metric value representing a list of strings.
 */
export interface StringList {
  /**
   * Elements of the list.
   */
  elements?: string[];
}

/**
 * A rich message format, including a human readable string, a key for
 * identifying the message, and structured data associated with the message for
 * programmatic consumption.
 */
export interface StructuredMessage {
  /**
   * Identifier for this message type. Used by external systems to
   * internationalize or personalize message.
   */
  messageKey?: string;
  /**
   * Human-readable version of message.
   */
  messageText?: string;
  /**
   * The structured data associated with this message.
   */
  parameters?: Parameter[];
}

/**
 * Taskrunner configuration settings.
 */
export interface TaskRunnerSettings {
  /**
   * Whether to also send taskrunner log info to stderr.
   */
  alsologtostderr?: boolean;
  /**
   * The location on the worker for task-specific subdirectories.
   */
  baseTaskDir?: string;
  /**
   * The base URL for the taskrunner to use when accessing Google Cloud APIs.
   * When workers access Google Cloud APIs, they logically do so via relative
   * URLs. If this field is specified, it supplies the base URL to use for
   * resolving these relative URLs. The normative algorithm used is defined by
   * RFC 1808, "Relative Uniform Resource Locators". If not specified, the
   * default value is "http://www.googleapis.com/"
   */
  baseUrl?: string;
  /**
   * The file to store preprocessing commands in.
   */
  commandlinesFileName?: string;
  /**
   * Whether to continue taskrunner if an exception is hit.
   */
  continueOnException?: boolean;
  /**
   * The API version of endpoint, e.g. "v1b3"
   */
  dataflowApiVersion?: string;
  /**
   * The command to launch the worker harness.
   */
  harnessCommand?: string;
  /**
   * The suggested backend language.
   */
  languageHint?: string;
  /**
   * The directory on the VM to store logs.
   */
  logDir?: string;
  /**
   * Whether to send taskrunner log info to Google Compute Engine VM serial
   * console.
   */
  logToSerialconsole?: boolean;
  /**
   * Indicates where to put logs. If this is not specified, the logs will not
   * be uploaded. The supported resource type is: Google Cloud Storage:
   * storage.googleapis.com/{bucket}/{object}
   * bucket.storage.googleapis.com/{object}
   */
  logUploadLocation?: string;
  /**
   * The OAuth2 scopes to be requested by the taskrunner in order to access the
   * Cloud Dataflow API.
   */
  oauthScopes?: string[];
  /**
   * The settings to pass to the parallel worker harness.
   */
  parallelWorkerSettings?: WorkerSettings;
  /**
   * The streaming worker main class name.
   */
  streamingWorkerMainClass?: string;
  /**
   * The UNIX group ID on the worker VM to use for tasks launched by
   * taskrunner; e.g. "wheel".
   */
  taskGroup?: string;
  /**
   * The UNIX user ID on the worker VM to use for tasks launched by taskrunner;
   * e.g. "root".
   */
  taskUser?: string;
  /**
   * The prefix of the resources the taskrunner should use for temporary
   * storage. The supported resource type is: Google Cloud Storage:
   * storage.googleapis.com/{bucket}/{object}
   * bucket.storage.googleapis.com/{object}
   */
  tempStoragePrefix?: string;
  /**
   * The ID string of the VM.
   */
  vmId?: string;
  /**
   * The file to store the workflow in.
   */
  workflowFileName?: string;
}

/**
 * Metadata describing a template.
 */
export interface TemplateMetadata {
  /**
   * Optional. A description of the template.
   */
  description?: string;
  /**
   * Required. The name of the template.
   */
  name?: string;
  /**
   * The parameters for the template.
   */
  parameters?: ParameterMetadata[];
}

/**
 * Global topology of the streaming Dataflow job, including all computations
 * and their sharded locations.
 */
export interface TopologyConfig {
  /**
   * The computations associated with a streaming Dataflow job.
   */
  computations?: ComputationTopology[];
  /**
   * The disks assigned to a streaming Dataflow job.
   */
  dataDiskAssignments?: DataDiskAssignment[];
  /**
   * The size (in bits) of keys that will be assigned to source messages.
   */
  forwardingKeyBits?: number;
  /**
   * Version number for persistent state.
   */
  persistentStateVersion?: number;
  /**
   * Maps user stage names to stable computation names.
   */
  userStageToComputationNameMap?: {
    [key: string]: string
  };
}

/**
 * Description of the type, names/ids, and input/outputs for a transform.
 */
export interface TransformSummary {
  /**
   * Transform-specific display data.
   */
  displayData?: DisplayData[];
  /**
   * SDK generated id of this transform instance.
   */
  id?: string;
  /**
   * User names for all collection inputs to this transform.
   */
  inputCollectionName?: string[];
  /**
   * Type of transform.
   */
  kind?:  | "UNKNOWN_KIND" | "PAR_DO_KIND" | "GROUP_BY_KEY_KIND" | "FLATTEN_KIND" | "READ_KIND" | "WRITE_KIND" | "CONSTANT_KIND" | "SINGLETON_KIND" | "SHUFFLE_KIND";
  /**
   * User provided name for this transform instance.
   */
  name?: string;
  /**
   * User names for all collection outputs to this transform.
   */
  outputCollectionName?: string[];
}

function serializeTransformSummary(data: any): TransformSummary {
  return {
    ...data,
    displayData: data["displayData"] !== undefined ? data["displayData"].map((item: any) => (serializeDisplayData(item))) : undefined,
  };
}

function deserializeTransformSummary(data: any): TransformSummary {
  return {
    ...data,
    displayData: data["displayData"] !== undefined ? data["displayData"].map((item: any) => (deserializeDisplayData(item))) : undefined,
  };
}

/**
 * Information about a worker
 */
export interface WorkerDetails {
  /**
   * Name of this worker
   */
  workerName?: string;
  /**
   * Work items processed by this worker, sorted by time.
   */
  workItems?: WorkItemDetails[];
}

function serializeWorkerDetails(data: any): WorkerDetails {
  return {
    ...data,
    workItems: data["workItems"] !== undefined ? data["workItems"].map((item: any) => (serializeWorkItemDetails(item))) : undefined,
  };
}

function deserializeWorkerDetails(data: any): WorkerDetails {
  return {
    ...data,
    workItems: data["workItems"] !== undefined ? data["workItems"].map((item: any) => (deserializeWorkItemDetails(item))) : undefined,
  };
}

/**
 * WorkerHealthReport contains information about the health of a worker. The VM
 * should be identified by the labels attached to the WorkerMessage that this
 * health ping belongs to.
 */
export interface WorkerHealthReport {
  /**
   * Message describing any unusual health reports.
   */
  msg?: string;
  /**
   * The pods running on the worker. See:
   * http://kubernetes.io/v1.1/docs/api-reference/v1/definitions.html#_v1_pod
   * This field is used by the worker to send the status of the indvidual
   * containers running on each worker.
   */
  pods?: {
    [key: string]: any
  }[];
  /**
   * The interval at which the worker is sending health reports. The default
   * value of 0 should be interpreted as the field is not being explicitly set
   * by the worker.
   */
  reportInterval?: number /* Duration */;
  /**
   * Code to describe a specific reason, if known, that a VM has reported
   * broken state.
   */
  vmBrokenCode?: string;
  /**
   * Whether the VM is in a permanently broken state. Broken VMs should be
   * abandoned or deleted ASAP to avoid assigning or completing any work.
   */
  vmIsBroken?: boolean;
  /**
   * Whether the VM is currently healthy.
   */
  vmIsHealthy?: boolean;
  /**
   * The time the VM was booted.
   */
  vmStartupTime?: Date;
}

function serializeWorkerHealthReport(data: any): WorkerHealthReport {
  return {
    ...data,
    reportInterval: data["reportInterval"] !== undefined ? data["reportInterval"] : undefined,
    vmStartupTime: data["vmStartupTime"] !== undefined ? data["vmStartupTime"].toISOString() : undefined,
  };
}

function deserializeWorkerHealthReport(data: any): WorkerHealthReport {
  return {
    ...data,
    reportInterval: data["reportInterval"] !== undefined ? data["reportInterval"] : undefined,
    vmStartupTime: data["vmStartupTime"] !== undefined ? new Date(data["vmStartupTime"]) : undefined,
  };
}

/**
 * WorkerHealthReportResponse contains information returned to the worker in
 * response to a health ping.
 */
export interface WorkerHealthReportResponse {
  /**
   * A positive value indicates the worker should change its reporting interval
   * to the specified value. The default value of zero means no change in report
   * rate is requested by the server.
   */
  reportInterval?: number /* Duration */;
}

function serializeWorkerHealthReportResponse(data: any): WorkerHealthReportResponse {
  return {
    ...data,
    reportInterval: data["reportInterval"] !== undefined ? data["reportInterval"] : undefined,
  };
}

function deserializeWorkerHealthReportResponse(data: any): WorkerHealthReportResponse {
  return {
    ...data,
    reportInterval: data["reportInterval"] !== undefined ? data["reportInterval"] : undefined,
  };
}

/**
 * A report of an event in a worker's lifecycle. The proto contains one event,
 * because the worker is expected to asynchronously send each message
 * immediately after the event. Due to this asynchrony, messages may arrive out
 * of order (or missing), and it is up to the consumer to interpret. The
 * timestamp of the event is in the enclosing WorkerMessage proto.
 */
export interface WorkerLifecycleEvent {
  /**
   * The start time of this container. All events will report this so that
   * events can be grouped together across container/VM restarts.
   */
  containerStartTime?: Date;
  /**
   * The event being reported.
   */
  event?:  | "UNKNOWN_EVENT" | "OS_START" | "CONTAINER_START" | "NETWORK_UP" | "STAGING_FILES_DOWNLOAD_START" | "STAGING_FILES_DOWNLOAD_FINISH" | "SDK_INSTALL_START" | "SDK_INSTALL_FINISH";
  /**
   * Other stats that can accompany an event. E.g. { "downloaded_bytes" :
   * "123456" }
   */
  metadata?: {
    [key: string]: string
  };
}

function serializeWorkerLifecycleEvent(data: any): WorkerLifecycleEvent {
  return {
    ...data,
    containerStartTime: data["containerStartTime"] !== undefined ? data["containerStartTime"].toISOString() : undefined,
  };
}

function deserializeWorkerLifecycleEvent(data: any): WorkerLifecycleEvent {
  return {
    ...data,
    containerStartTime: data["containerStartTime"] !== undefined ? new Date(data["containerStartTime"]) : undefined,
  };
}

/**
 * WorkerMessage provides information to the backend about a worker.
 */
export interface WorkerMessage {
  /**
   * Labels are used to group WorkerMessages. For example, a worker_message
   * about a particular container might have the labels: { "JOB_ID":
   * "2015-04-22", "WORKER_ID": "wordcount-vm-2015…" "CONTAINER_TYPE": "worker",
   * "CONTAINER_ID": "ac1234def"} Label tags typically correspond to Label enum
   * values. However, for ease of development other strings can be used as tags.
   * LABEL_UNSPECIFIED should not be used here.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The timestamp of the worker_message.
   */
  time?: Date;
  /**
   * The health of a worker.
   */
  workerHealthReport?: WorkerHealthReport;
  /**
   * Record of worker lifecycle events.
   */
  workerLifecycleEvent?: WorkerLifecycleEvent;
  /**
   * A worker message code.
   */
  workerMessageCode?: WorkerMessageCode;
  /**
   * Resource metrics reported by workers.
   */
  workerMetrics?: ResourceUtilizationReport;
  /**
   * Shutdown notice by workers.
   */
  workerShutdownNotice?: WorkerShutdownNotice;
  /**
   * Thread scaling information reported by workers.
   */
  workerThreadScalingReport?: WorkerThreadScalingReport;
}

function serializeWorkerMessage(data: any): WorkerMessage {
  return {
    ...data,
    time: data["time"] !== undefined ? data["time"].toISOString() : undefined,
    workerHealthReport: data["workerHealthReport"] !== undefined ? serializeWorkerHealthReport(data["workerHealthReport"]) : undefined,
    workerLifecycleEvent: data["workerLifecycleEvent"] !== undefined ? serializeWorkerLifecycleEvent(data["workerLifecycleEvent"]) : undefined,
    workerMetrics: data["workerMetrics"] !== undefined ? serializeResourceUtilizationReport(data["workerMetrics"]) : undefined,
  };
}

function deserializeWorkerMessage(data: any): WorkerMessage {
  return {
    ...data,
    time: data["time"] !== undefined ? new Date(data["time"]) : undefined,
    workerHealthReport: data["workerHealthReport"] !== undefined ? deserializeWorkerHealthReport(data["workerHealthReport"]) : undefined,
    workerLifecycleEvent: data["workerLifecycleEvent"] !== undefined ? deserializeWorkerLifecycleEvent(data["workerLifecycleEvent"]) : undefined,
    workerMetrics: data["workerMetrics"] !== undefined ? deserializeResourceUtilizationReport(data["workerMetrics"]) : undefined,
  };
}

/**
 * A message code is used to report status and error messages to the service.
 * The message codes are intended to be machine readable. The service will take
 * care of translating these into user understandable messages if necessary.
 * Example use cases: 1. Worker processes reporting successful startup. 2.
 * Worker processes reporting specific errors (e.g. package staging failure).
 */
export interface WorkerMessageCode {
  /**
   * The code is a string intended for consumption by a machine that identifies
   * the type of message being sent. Examples: 1. "HARNESS_STARTED" might be
   * used to indicate the worker harness has started. 2. "GCS_DOWNLOAD_ERROR"
   * might be used to indicate an error downloading a Cloud Storage file as part
   * of the boot process of one of the worker containers. This is a string and
   * not an enum to make it easy to add new codes without waiting for an API
   * change.
   */
  code?: string;
  /**
   * Parameters contains specific information about the code. This is a struct
   * to allow parameters of different types. Examples: 1. For a
   * "HARNESS_STARTED" message parameters might provide the name of the worker
   * and additional data like timing information. 2. For a "GCS_DOWNLOAD_ERROR"
   * parameters might contain fields listing the Cloud Storage objects being
   * downloaded and fields containing errors. In general complex data structures
   * should be avoided. If a worker needs to send a specific and complicated
   * data structure then please consider defining a new proto and adding it to
   * the data oneof in WorkerMessageResponse. Conventions: Parameters should
   * only be used for information that isn't typically passed as a label.
   * hostname and other worker identifiers should almost always be passed as
   * labels since they will be included on most messages.
   */
  parameters?: {
    [key: string]: any
  };
}

/**
 * A worker_message response allows the server to pass information to the
 * sender.
 */
export interface WorkerMessageResponse {
  /**
   * The service's response to a worker's health report.
   */
  workerHealthReportResponse?: WorkerHealthReportResponse;
  /**
   * Service's response to reporting worker metrics (currently empty).
   */
  workerMetricsResponse?: ResourceUtilizationReportResponse;
  /**
   * Service's response to shutdown notice (currently empty).
   */
  workerShutdownNoticeResponse?: WorkerShutdownNoticeResponse;
  /**
   * Service's thread scaling recommendation for workers.
   */
  workerThreadScalingReportResponse?: WorkerThreadScalingReportResponse;
}

function serializeWorkerMessageResponse(data: any): WorkerMessageResponse {
  return {
    ...data,
    workerHealthReportResponse: data["workerHealthReportResponse"] !== undefined ? serializeWorkerHealthReportResponse(data["workerHealthReportResponse"]) : undefined,
  };
}

function deserializeWorkerMessageResponse(data: any): WorkerMessageResponse {
  return {
    ...data,
    workerHealthReportResponse: data["workerHealthReportResponse"] !== undefined ? deserializeWorkerHealthReportResponse(data["workerHealthReportResponse"]) : undefined,
  };
}

/**
 * Describes one particular pool of Cloud Dataflow workers to be instantiated
 * by the Cloud Dataflow service in order to perform the computations required
 * by a job. Note that a workflow job may use multiple pools, in order to match
 * the various computational requirements of the various stages of the job.
 */
export interface WorkerPool {
  /**
   * Settings for autoscaling of this WorkerPool.
   */
  autoscalingSettings?: AutoscalingSettings;
  /**
   * Data disks that are used by a VM in this workflow.
   */
  dataDisks?: Disk[];
  /**
   * The default package set to install. This allows the service to select a
   * default set of packages which are useful to worker harnesses written in a
   * particular language.
   */
  defaultPackageSet?:  | "DEFAULT_PACKAGE_SET_UNKNOWN" | "DEFAULT_PACKAGE_SET_NONE" | "DEFAULT_PACKAGE_SET_JAVA" | "DEFAULT_PACKAGE_SET_PYTHON";
  /**
   * Size of root disk for VMs, in GB. If zero or unspecified, the service will
   * attempt to choose a reasonable default.
   */
  diskSizeGb?: number;
  /**
   * Fully qualified source image for disks.
   */
  diskSourceImage?: string;
  /**
   * Type of root disk for VMs. If empty or unspecified, the service will
   * attempt to choose a reasonable default.
   */
  diskType?: string;
  /**
   * Configuration for VM IPs.
   */
  ipConfiguration?:  | "WORKER_IP_UNSPECIFIED" | "WORKER_IP_PUBLIC" | "WORKER_IP_PRIVATE";
  /**
   * The kind of the worker pool; currently only `harness` and `shuffle` are
   * supported.
   */
  kind?: string;
  /**
   * Machine type (e.g. "n1-standard-1"). If empty or unspecified, the service
   * will attempt to choose a reasonable default.
   */
  machineType?: string;
  /**
   * Metadata to set on the Google Compute Engine VMs.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * Network to which VMs will be assigned. If empty or unspecified, the
   * service will use the network "default".
   */
  network?: string;
  /**
   * The number of threads per worker harness. If empty or unspecified, the
   * service will choose a number of threads (according to the number of cores
   * on the selected machine type for batch, or 1 by convention for streaming).
   */
  numThreadsPerWorker?: number;
  /**
   * Number of Google Compute Engine workers in this pool needed to execute the
   * job. If zero or unspecified, the service will attempt to choose a
   * reasonable default.
   */
  numWorkers?: number;
  /**
   * The action to take on host maintenance, as defined by the Google Compute
   * Engine API.
   */
  onHostMaintenance?: string;
  /**
   * Packages to be installed on workers.
   */
  packages?: Package[];
  /**
   * Extra arguments for this worker pool.
   */
  poolArgs?: {
    [key: string]: any
  };
  /**
   * Set of SDK harness containers needed to execute this pipeline. This will
   * only be set in the Fn API path. For non-cross-language pipelines this
   * should have only one entry. Cross-language pipelines will have two or more
   * entries.
   */
  sdkHarnessContainerImages?: SdkHarnessContainerImage[];
  /**
   * Subnetwork to which VMs will be assigned, if desired. Expected to be of
   * the form "regions/REGION/subnetworks/SUBNETWORK".
   */
  subnetwork?: string;
  /**
   * Settings passed through to Google Compute Engine workers when using the
   * standard Dataflow task runner. Users should ignore this field.
   */
  taskrunnerSettings?: TaskRunnerSettings;
  /**
   * Sets the policy for determining when to turndown worker pool. Allowed
   * values are: `TEARDOWN_ALWAYS`, `TEARDOWN_ON_SUCCESS`, and `TEARDOWN_NEVER`.
   * `TEARDOWN_ALWAYS` means workers are always torn down regardless of whether
   * the job succeeds. `TEARDOWN_ON_SUCCESS` means workers are torn down if the
   * job succeeds. `TEARDOWN_NEVER` means the workers are never torn down. If
   * the workers are not torn down by the service, they will continue to run and
   * use Google Compute Engine VM resources in the user's project until they are
   * explicitly terminated by the user. Because of this, Google recommends using
   * the `TEARDOWN_ALWAYS` policy except for small, manually supervised test
   * jobs. If unknown or unspecified, the service will attempt to choose a
   * reasonable default.
   */
  teardownPolicy?:  | "TEARDOWN_POLICY_UNKNOWN" | "TEARDOWN_ALWAYS" | "TEARDOWN_ON_SUCCESS" | "TEARDOWN_NEVER";
  /**
   * Required. Docker container image that executes the Cloud Dataflow worker
   * harness, residing in Google Container Registry. Deprecated for the Fn API
   * path. Use sdk_harness_container_images instead.
   */
  workerHarnessContainerImage?: string;
  /**
   * Zone to run the worker pools in. If empty or unspecified, the service will
   * attempt to choose a reasonable default.
   */
  zone?: string;
}

/**
 * Provides data to pass through to the worker harness.
 */
export interface WorkerSettings {
  /**
   * The base URL for accessing Google Cloud APIs. When workers access Google
   * Cloud APIs, they logically do so via relative URLs. If this field is
   * specified, it supplies the base URL to use for resolving these relative
   * URLs. The normative algorithm used is defined by RFC 1808, "Relative
   * Uniform Resource Locators". If not specified, the default value is
   * "http://www.googleapis.com/"
   */
  baseUrl?: string;
  /**
   * Whether to send work progress updates to the service.
   */
  reportingEnabled?: boolean;
  /**
   * The Cloud Dataflow service path relative to the root URL, for example,
   * "dataflow/v1b3/projects".
   */
  servicePath?: string;
  /**
   * The Shuffle service path relative to the root URL, for example,
   * "shuffle/v1beta1".
   */
  shuffleServicePath?: string;
  /**
   * The prefix of the resources the system should use for temporary storage.
   * The supported resource type is: Google Cloud Storage:
   * storage.googleapis.com/{bucket}/{object}
   * bucket.storage.googleapis.com/{object}
   */
  tempStoragePrefix?: string;
  /**
   * The ID of the worker running this pipeline.
   */
  workerId?: string;
}

/**
 * Shutdown notification from workers. This is to be sent by the shutdown
 * script of the worker VM so that the backend knows that the VM is being shut
 * down.
 */
export interface WorkerShutdownNotice {
  /**
   * The reason for the worker shutdown. Current possible values are:
   * "UNKNOWN": shutdown reason is unknown. "PREEMPTION": shutdown reason is
   * preemption. Other possible reasons may be added in the future.
   */
  reason?: string;
}

/**
 * Service-side response to WorkerMessage issuing shutdown notice.
 */
export interface WorkerShutdownNoticeResponse {
}

/**
 * Contains information about the thread scaling information of a worker.
 */
export interface WorkerThreadScalingReport {
  /**
   * Current number of active threads in a worker.
   */
  currentThreadCount?: number;
}

/**
 * Contains the thread scaling recommendation for a worker from the backend.
 */
export interface WorkerThreadScalingReportResponse {
  /**
   * Recommended number of threads for a worker.
   */
  recommendedThreadCount?: number;
}

/**
 * WorkItem represents basic information about a WorkItem to be executed in the
 * cloud.
 */
export interface WorkItem {
  /**
   * Work item-specific configuration as an opaque blob.
   */
  configuration?: string;
  /**
   * Identifies this WorkItem.
   */
  id?: bigint;
  /**
   * The initial index to use when reporting the status of the WorkItem.
   */
  initialReportIndex?: bigint;
  /**
   * Identifies the workflow job this WorkItem belongs to.
   */
  jobId?: string;
  /**
   * Time when the lease on this Work will expire.
   */
  leaseExpireTime?: Date;
  /**
   * Additional information for MapTask WorkItems.
   */
  mapTask?: MapTask;
  /**
   * Any required packages that need to be fetched in order to execute this
   * WorkItem.
   */
  packages?: Package[];
  /**
   * Identifies the cloud project this WorkItem belongs to.
   */
  projectId?: string;
  /**
   * Recommended reporting interval.
   */
  reportStatusInterval?: number /* Duration */;
  /**
   * Additional information for SeqMapTask WorkItems.
   */
  seqMapTask?: SeqMapTask;
  /**
   * Additional information for ShellTask WorkItems.
   */
  shellTask?: ShellTask;
  /**
   * Additional information for source operation WorkItems.
   */
  sourceOperationTask?: SourceOperationRequest;
  /**
   * Additional information for StreamingComputationTask WorkItems.
   */
  streamingComputationTask?: StreamingComputationTask;
  /**
   * Additional information for StreamingConfigTask WorkItems.
   */
  streamingConfigTask?: StreamingConfigTask;
  /**
   * Additional information for StreamingSetupTask WorkItems.
   */
  streamingSetupTask?: StreamingSetupTask;
}

function serializeWorkItem(data: any): WorkItem {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
    initialReportIndex: data["initialReportIndex"] !== undefined ? String(data["initialReportIndex"]) : undefined,
    leaseExpireTime: data["leaseExpireTime"] !== undefined ? data["leaseExpireTime"].toISOString() : undefined,
    mapTask: data["mapTask"] !== undefined ? serializeMapTask(data["mapTask"]) : undefined,
    reportStatusInterval: data["reportStatusInterval"] !== undefined ? data["reportStatusInterval"] : undefined,
    seqMapTask: data["seqMapTask"] !== undefined ? serializeSeqMapTask(data["seqMapTask"]) : undefined,
    sourceOperationTask: data["sourceOperationTask"] !== undefined ? serializeSourceOperationRequest(data["sourceOperationTask"]) : undefined,
    streamingConfigTask: data["streamingConfigTask"] !== undefined ? serializeStreamingConfigTask(data["streamingConfigTask"]) : undefined,
  };
}

function deserializeWorkItem(data: any): WorkItem {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
    initialReportIndex: data["initialReportIndex"] !== undefined ? BigInt(data["initialReportIndex"]) : undefined,
    leaseExpireTime: data["leaseExpireTime"] !== undefined ? new Date(data["leaseExpireTime"]) : undefined,
    mapTask: data["mapTask"] !== undefined ? deserializeMapTask(data["mapTask"]) : undefined,
    reportStatusInterval: data["reportStatusInterval"] !== undefined ? data["reportStatusInterval"] : undefined,
    seqMapTask: data["seqMapTask"] !== undefined ? deserializeSeqMapTask(data["seqMapTask"]) : undefined,
    sourceOperationTask: data["sourceOperationTask"] !== undefined ? deserializeSourceOperationRequest(data["sourceOperationTask"]) : undefined,
    streamingConfigTask: data["streamingConfigTask"] !== undefined ? deserializeStreamingConfigTask(data["streamingConfigTask"]) : undefined,
  };
}

/**
 * Information about an individual work item execution.
 */
export interface WorkItemDetails {
  /**
   * Attempt ID of this work item
   */
  attemptId?: string;
  /**
   * End time of this work item attempt. If the work item is completed, this is
   * the actual end time of the work item. Otherwise, it is the predicted end
   * time.
   */
  endTime?: Date;
  /**
   * Metrics for this work item.
   */
  metrics?: MetricUpdate[];
  /**
   * Progress of this work item.
   */
  progress?: ProgressTimeseries;
  /**
   * Start time of this work item attempt.
   */
  startTime?: Date;
  /**
   * State of this work item.
   */
  state?:  | "EXECUTION_STATE_UNKNOWN" | "EXECUTION_STATE_NOT_STARTED" | "EXECUTION_STATE_RUNNING" | "EXECUTION_STATE_SUCCEEDED" | "EXECUTION_STATE_FAILED" | "EXECUTION_STATE_CANCELLED";
  /**
   * Information about straggler detections for this work item.
   */
  stragglerInfo?: StragglerInfo;
  /**
   * Name of this work item.
   */
  taskId?: string;
}

function serializeWorkItemDetails(data: any): WorkItemDetails {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (serializeMetricUpdate(item))) : undefined,
    progress: data["progress"] !== undefined ? serializeProgressTimeseries(data["progress"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    stragglerInfo: data["stragglerInfo"] !== undefined ? serializeStragglerInfo(data["stragglerInfo"]) : undefined,
  };
}

function deserializeWorkItemDetails(data: any): WorkItemDetails {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (deserializeMetricUpdate(item))) : undefined,
    progress: data["progress"] !== undefined ? deserializeProgressTimeseries(data["progress"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    stragglerInfo: data["stragglerInfo"] !== undefined ? deserializeStragglerInfo(data["stragglerInfo"]) : undefined,
  };
}

/**
 * The Dataflow service's idea of the current state of a WorkItem being
 * processed by a worker.
 */
export interface WorkItemServiceState {
  /**
   * If set, a request to complete the work item with the given status. This
   * will not be set to OK, unless supported by the specific kind of WorkItem.
   * It can be used for the backend to indicate a WorkItem must terminate, e.g.,
   * for aborting work.
   */
  completeWorkStatus?: Status;
  /**
   * Other data returned by the service, specific to the particular worker
   * harness.
   */
  harnessData?: {
    [key: string]: any
  };
  /**
   * A hot key is a symptom of poor data distribution in which there are enough
   * elements mapped to a single key to impact pipeline performance. When
   * present, this field includes metadata associated with any hot key.
   */
  hotKeyDetection?: HotKeyDetection;
  /**
   * Time at which the current lease will expire.
   */
  leaseExpireTime?: Date;
  /**
   * The short ids that workers should use in subsequent metric updates.
   * Workers should strive to use short ids whenever possible, but it is ok to
   * request the short_id again if a worker lost track of it (e.g. if the worker
   * is recovering from a crash). NOTE: it is possible that the response may
   * have short ids for a subset of the metrics.
   */
  metricShortId?: MetricShortId[];
  /**
   * The index value to use for the next report sent by the worker. Note: If
   * the report call fails for whatever reason, the worker should reuse this
   * index for subsequent report attempts.
   */
  nextReportIndex?: bigint;
  /**
   * New recommended reporting interval.
   */
  reportStatusInterval?: number /* Duration */;
  /**
   * The progress point in the WorkItem where the Dataflow service suggests
   * that the worker truncate the task.
   */
  splitRequest?: ApproximateSplitRequest;
  /**
   * DEPRECATED in favor of split_request.
   */
  suggestedStopPoint?: ApproximateProgress;
  /**
   * Obsolete, always empty.
   */
  suggestedStopPosition?: Position;
}

function serializeWorkItemServiceState(data: any): WorkItemServiceState {
  return {
    ...data,
    hotKeyDetection: data["hotKeyDetection"] !== undefined ? serializeHotKeyDetection(data["hotKeyDetection"]) : undefined,
    leaseExpireTime: data["leaseExpireTime"] !== undefined ? data["leaseExpireTime"].toISOString() : undefined,
    metricShortId: data["metricShortId"] !== undefined ? data["metricShortId"].map((item: any) => (serializeMetricShortId(item))) : undefined,
    nextReportIndex: data["nextReportIndex"] !== undefined ? String(data["nextReportIndex"]) : undefined,
    reportStatusInterval: data["reportStatusInterval"] !== undefined ? data["reportStatusInterval"] : undefined,
    splitRequest: data["splitRequest"] !== undefined ? serializeApproximateSplitRequest(data["splitRequest"]) : undefined,
    suggestedStopPoint: data["suggestedStopPoint"] !== undefined ? serializeApproximateProgress(data["suggestedStopPoint"]) : undefined,
    suggestedStopPosition: data["suggestedStopPosition"] !== undefined ? serializePosition(data["suggestedStopPosition"]) : undefined,
  };
}

function deserializeWorkItemServiceState(data: any): WorkItemServiceState {
  return {
    ...data,
    hotKeyDetection: data["hotKeyDetection"] !== undefined ? deserializeHotKeyDetection(data["hotKeyDetection"]) : undefined,
    leaseExpireTime: data["leaseExpireTime"] !== undefined ? new Date(data["leaseExpireTime"]) : undefined,
    metricShortId: data["metricShortId"] !== undefined ? data["metricShortId"].map((item: any) => (deserializeMetricShortId(item))) : undefined,
    nextReportIndex: data["nextReportIndex"] !== undefined ? BigInt(data["nextReportIndex"]) : undefined,
    reportStatusInterval: data["reportStatusInterval"] !== undefined ? data["reportStatusInterval"] : undefined,
    splitRequest: data["splitRequest"] !== undefined ? deserializeApproximateSplitRequest(data["splitRequest"]) : undefined,
    suggestedStopPoint: data["suggestedStopPoint"] !== undefined ? deserializeApproximateProgress(data["suggestedStopPoint"]) : undefined,
    suggestedStopPosition: data["suggestedStopPosition"] !== undefined ? deserializePosition(data["suggestedStopPosition"]) : undefined,
  };
}

/**
 * Conveys a worker's progress through the work described by a WorkItem.
 */
export interface WorkItemStatus {
  /**
   * True if the WorkItem was completed (successfully or unsuccessfully).
   */
  completed?: boolean;
  /**
   * Worker output counters for this WorkItem.
   */
  counterUpdates?: CounterUpdate[];
  /**
   * See documentation of stop_position.
   */
  dynamicSourceSplit?: DynamicSourceSplit;
  /**
   * Specifies errors which occurred during processing. If errors are provided,
   * and completed = true, then the WorkItem is considered to have failed.
   */
  errors?: Status[];
  /**
   * DEPRECATED in favor of counter_updates.
   */
  metricUpdates?: MetricUpdate[];
  /**
   * DEPRECATED in favor of reported_progress.
   */
  progress?: ApproximateProgress;
  /**
   * The worker's progress through this WorkItem.
   */
  reportedProgress?: ApproximateReportedProgress;
  /**
   * The report index. When a WorkItem is leased, the lease will contain an
   * initial report index. When a WorkItem's status is reported to the system,
   * the report should be sent with that report index, and the response will
   * contain the index the worker should use for the next report. Reports
   * received with unexpected index values will be rejected by the service. In
   * order to preserve idempotency, the worker should not alter the contents of
   * a report, even if the worker must submit the same report multiple times
   * before getting back a response. The worker should not submit a subsequent
   * report until the response for the previous report had been received from
   * the service.
   */
  reportIndex?: bigint;
  /**
   * Amount of time the worker requests for its lease.
   */
  requestedLeaseDuration?: number /* Duration */;
  /**
   * DEPRECATED in favor of dynamic_source_split.
   */
  sourceFork?: SourceFork;
  /**
   * If the work item represented a SourceOperationRequest, and the work is
   * completed, contains the result of the operation.
   */
  sourceOperationResponse?: SourceOperationResponse;
  /**
   * A worker may split an active map task in two parts, "primary" and
   * "residual", continuing to process the primary part and returning the
   * residual part into the pool of available work. This event is called a
   * "dynamic split" and is critical to the dynamic work rebalancing feature.
   * The two obtained sub-tasks are called "parts" of the split. The parts, if
   * concatenated, must represent the same input as would be read by the current
   * task if the split did not happen. The exact way in which the original task
   * is decomposed into the two parts is specified either as a position
   * demarcating them (stop_position), or explicitly as two DerivedSources, if
   * this task consumes a user-defined source type (dynamic_source_split). The
   * "current" task is adjusted as a result of the split: after a task with
   * range [A, B) sends a stop_position update at C, its range is considered to
   * be [A, C), e.g.: * Progress should be interpreted relative to the new
   * range, e.g. "75% completed" means "75% of [A, C) completed" * The worker
   * should interpret proposed_stop_position relative to the new range, e.g.
   * "split at 68%" should be interpreted as "split at 68% of [A, C)". * If the
   * worker chooses to split again using stop_position, only stop_positions in
   * [A, C) will be accepted. * Etc. dynamic_source_split has similar semantics:
   * e.g., if a task with source S splits using dynamic_source_split into {P, R}
   * (where P and R must be together equivalent to S), then subsequent progress
   * and proposed_stop_position should be interpreted relative to P, and in a
   * potential subsequent dynamic_source_split into {P', R'}, P' and R' must be
   * together equivalent to P, etc.
   */
  stopPosition?: Position;
  /**
   * Total time the worker spent being throttled by external systems.
   */
  totalThrottlerWaitTimeSeconds?: number;
  /**
   * Identifies the WorkItem.
   */
  workItemId?: string;
}

function serializeWorkItemStatus(data: any): WorkItemStatus {
  return {
    ...data,
    counterUpdates: data["counterUpdates"] !== undefined ? data["counterUpdates"].map((item: any) => (serializeCounterUpdate(item))) : undefined,
    dynamicSourceSplit: data["dynamicSourceSplit"] !== undefined ? serializeDynamicSourceSplit(data["dynamicSourceSplit"]) : undefined,
    metricUpdates: data["metricUpdates"] !== undefined ? data["metricUpdates"].map((item: any) => (serializeMetricUpdate(item))) : undefined,
    progress: data["progress"] !== undefined ? serializeApproximateProgress(data["progress"]) : undefined,
    reportedProgress: data["reportedProgress"] !== undefined ? serializeApproximateReportedProgress(data["reportedProgress"]) : undefined,
    reportIndex: data["reportIndex"] !== undefined ? String(data["reportIndex"]) : undefined,
    requestedLeaseDuration: data["requestedLeaseDuration"] !== undefined ? data["requestedLeaseDuration"] : undefined,
    sourceFork: data["sourceFork"] !== undefined ? serializeSourceFork(data["sourceFork"]) : undefined,
    sourceOperationResponse: data["sourceOperationResponse"] !== undefined ? serializeSourceOperationResponse(data["sourceOperationResponse"]) : undefined,
    stopPosition: data["stopPosition"] !== undefined ? serializePosition(data["stopPosition"]) : undefined,
  };
}

function deserializeWorkItemStatus(data: any): WorkItemStatus {
  return {
    ...data,
    counterUpdates: data["counterUpdates"] !== undefined ? data["counterUpdates"].map((item: any) => (deserializeCounterUpdate(item))) : undefined,
    dynamicSourceSplit: data["dynamicSourceSplit"] !== undefined ? deserializeDynamicSourceSplit(data["dynamicSourceSplit"]) : undefined,
    metricUpdates: data["metricUpdates"] !== undefined ? data["metricUpdates"].map((item: any) => (deserializeMetricUpdate(item))) : undefined,
    progress: data["progress"] !== undefined ? deserializeApproximateProgress(data["progress"]) : undefined,
    reportedProgress: data["reportedProgress"] !== undefined ? deserializeApproximateReportedProgress(data["reportedProgress"]) : undefined,
    reportIndex: data["reportIndex"] !== undefined ? BigInt(data["reportIndex"]) : undefined,
    requestedLeaseDuration: data["requestedLeaseDuration"] !== undefined ? data["requestedLeaseDuration"] : undefined,
    sourceFork: data["sourceFork"] !== undefined ? deserializeSourceFork(data["sourceFork"]) : undefined,
    sourceOperationResponse: data["sourceOperationResponse"] !== undefined ? deserializeSourceOperationResponse(data["sourceOperationResponse"]) : undefined,
    stopPosition: data["stopPosition"] !== undefined ? deserializePosition(data["stopPosition"]) : undefined,
  };
}

/**
 * An instruction that writes records. Takes one input, produces no outputs.
 */
export interface WriteInstruction {
  /**
   * The input.
   */
  input?: InstructionInput;
  /**
   * The sink to write to.
   */
  sink?: Sink;
}