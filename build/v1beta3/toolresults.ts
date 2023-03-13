// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Tool Results API Client for Deno
 * ======================================
 * 
 * API to publish and access results from developer tools.
 * 
 * Docs: https://firebase.google.com/docs/test-lab/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * API to publish and access results from developer tools.
 */
export class ToolResults {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://toolresults.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets the Tool Results settings for a project. May return any of the
   * following canonical error codes: - PERMISSION_DENIED - if the user is not
   * authorized to read from project
   *
   * @param projectId A Project id. Required.
   */
  async projectsGetSettings(projectId: string): Promise<ProjectSettings> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/settings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ProjectSettings;
  }

  /**
   * Creates a History. The returned History will have the id set. May return
   * any of the following canonical error codes: - PERMISSION_DENIED - if the
   * user is not authorized to write to project - INVALID_ARGUMENT - if the
   * request is malformed - NOT_FOUND - if the containing project does not exist
   *
   * @param projectId A Project id. Required.
   */
  async projectsHistoriesCreate(projectId: string, req: History, opts: ProjectsHistoriesCreateOptions = {}): Promise<History> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as History;
  }

  /**
   * Retrieves a single screenshot cluster by its ID
   *
   * @param clusterId A Cluster id Required.
   * @param executionId An Execution id. Required.
   * @param historyId A History id. Required.
   * @param projectId A Project id. Required.
   */
  async projectsHistoriesExecutionsClustersGet(clusterId: string, executionId: string, historyId: string, projectId: string): Promise<ScreenshotCluster> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/clusters/${ clusterId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ScreenshotCluster;
  }

  /**
   * Lists Screenshot Clusters Returns the list of screenshot clusters
   * corresponding to an execution. Screenshot clusters are created after the
   * execution is finished. Clusters are created from a set of screenshots.
   * Between any two screenshots, a matching score is calculated based off their
   * metadata that determines how similar they are. Screenshots are placed in
   * the cluster that has screens which have the highest matching scores.
   *
   * @param executionId An Execution id. Required.
   * @param historyId A History id. Required.
   * @param projectId A Project id. Required.
   */
  async projectsHistoriesExecutionsClustersList(executionId: string, historyId: string, projectId: string): Promise<ListScreenshotClustersResponse> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/clusters`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListScreenshotClustersResponse;
  }

  /**
   * Creates an Execution. The returned Execution will have the id set. May
   * return any of the following canonical error codes: - PERMISSION_DENIED - if
   * the user is not authorized to write to project - INVALID_ARGUMENT - if the
   * request is malformed - NOT_FOUND - if the containing History does not exist
   *
   * @param historyId A History id. Required.
   * @param projectId A Project id. Required.
   */
  async projectsHistoriesExecutionsCreate(historyId: string, projectId: string, req: Execution, opts: ProjectsHistoriesExecutionsCreateOptions = {}): Promise<Execution> {
    req = serializeExecution(req);
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeExecution(data);
  }

  /**
   * Gets an Environment. May return any of the following canonical error
   * codes: - PERMISSION_DENIED - if the user is not authorized to read project
   * - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the
   * Environment does not exist
   *
   * @param environmentId Required. An Environment id.
   * @param executionId Required. An Execution id.
   * @param historyId Required. A History id.
   * @param projectId Required. A Project id.
   */
  async projectsHistoriesExecutionsEnvironmentsGet(environmentId: string, executionId: string, historyId: string, projectId: string): Promise<Environment> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/environments/${ environmentId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeEnvironment(data);
  }

  /**
   * Lists Environments for a given Execution. The Environments are sorted by
   * display name. May return any of the following canonical error codes: -
   * PERMISSION_DENIED - if the user is not authorized to read project -
   * INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the
   * containing Execution does not exist
   *
   * @param executionId Required. An Execution id.
   * @param historyId Required. A History id.
   * @param projectId Required. A Project id.
   */
  async projectsHistoriesExecutionsEnvironmentsList(executionId: string, historyId: string, projectId: string, opts: ProjectsHistoriesExecutionsEnvironmentsListOptions = {}): Promise<ListEnvironmentsResponse> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/environments`);
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
    return deserializeListEnvironmentsResponse(data);
  }

  /**
   * Gets an Execution. May return any of the following canonical error codes:
   * - PERMISSION_DENIED - if the user is not authorized to write to project -
   * INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the
   * Execution does not exist
   *
   * @param executionId An Execution id. Required.
   * @param historyId A History id. Required.
   * @param projectId A Project id. Required.
   */
  async projectsHistoriesExecutionsGet(executionId: string, historyId: string, projectId: string): Promise<Execution> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeExecution(data);
  }

  /**
   * Lists Executions for a given History. The executions are sorted by
   * creation_time in descending order. The execution_id key will be used to
   * order the executions with the same creation_time. May return any of the
   * following canonical error codes: - PERMISSION_DENIED - if the user is not
   * authorized to read project - INVALID_ARGUMENT - if the request is malformed
   * - NOT_FOUND - if the containing History does not exist
   *
   * @param historyId A History id. Required.
   * @param projectId A Project id. Required.
   */
  async projectsHistoriesExecutionsList(historyId: string, projectId: string, opts: ProjectsHistoriesExecutionsListOptions = {}): Promise<ListExecutionsResponse> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions`);
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
    return deserializeListExecutionsResponse(data);
  }

  /**
   * Updates an existing Execution with the supplied partial entity. May return
   * any of the following canonical error codes: - PERMISSION_DENIED - if the
   * user is not authorized to write to project - INVALID_ARGUMENT - if the
   * request is malformed - FAILED_PRECONDITION - if the requested state
   * transition is illegal - NOT_FOUND - if the containing History does not
   * exist
   *
   * @param executionId Required.
   * @param historyId Required.
   * @param projectId A Project id. Required.
   */
  async projectsHistoriesExecutionsPatch(executionId: string, historyId: string, projectId: string, req: Execution, opts: ProjectsHistoriesExecutionsPatchOptions = {}): Promise<Execution> {
    req = serializeExecution(req);
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeExecution(data);
  }

  /**
   * Lists accessibility clusters for a given Step May return any of the
   * following canonical error codes: - PERMISSION_DENIED - if the user is not
   * authorized to read project - INVALID_ARGUMENT - if the request is malformed
   * - FAILED_PRECONDITION - if an argument in the request happens to be
   * invalid; e.g. if the locale format is incorrect - NOT_FOUND - if the
   * containing Step does not exist
   *
   * @param name A full resource name of the step. For example, projects/my-project/histories/bh.1234567890abcdef/executions/ 1234567890123456789/steps/bs.1234567890abcdef Required.
   */
  async projectsHistoriesExecutionsStepsAccessibilityClusters(name: string, opts: ProjectsHistoriesExecutionsStepsAccessibilityClustersOptions = {}): Promise<ListStepAccessibilityClustersResponse> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/${ name }:accessibilityClusters`);
    if (opts.locale !== undefined) {
      url.searchParams.append("locale", String(opts.locale));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListStepAccessibilityClustersResponse;
  }

  /**
   * Creates a Step. The returned Step will have the id set. May return any of
   * the following canonical error codes: - PERMISSION_DENIED - if the user is
   * not authorized to write to project - INVALID_ARGUMENT - if the request is
   * malformed - FAILED_PRECONDITION - if the step is too large (more than
   * 10Mib) - NOT_FOUND - if the containing Execution does not exist
   *
   * @param executionId Required. An Execution id.
   * @param historyId Required. A History id.
   * @param projectId Required. A Project id.
   */
  async projectsHistoriesExecutionsStepsCreate(executionId: string, historyId: string, projectId: string, req: Step, opts: ProjectsHistoriesExecutionsStepsCreateOptions = {}): Promise<Step> {
    req = serializeStep(req);
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeStep(data);
  }

  /**
   * Gets a Step. May return any of the following canonical error codes: -
   * PERMISSION_DENIED - if the user is not authorized to read project -
   * INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the Step
   * does not exist
   *
   * @param executionId A Execution id. Required.
   * @param historyId A History id. Required.
   * @param projectId A Project id. Required.
   * @param stepId A Step id. Required.
   */
  async projectsHistoriesExecutionsStepsGet(executionId: string, historyId: string, projectId: string, stepId: string): Promise<Step> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps/${ stepId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeStep(data);
  }

  /**
   * Retrieves a PerfMetricsSummary. May return any of the following error
   * code(s): - NOT_FOUND - The specified PerfMetricsSummary does not exist
   *
   * @param executionId A tool results execution ID.
   * @param historyId A tool results history ID.
   * @param projectId The cloud project
   * @param stepId A tool results step ID.
   */
  async projectsHistoriesExecutionsStepsGetPerfMetricsSummary(executionId: string, historyId: string, projectId: string, stepId: string): Promise<PerfMetricsSummary> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps/${ stepId }/perfMetricsSummary`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePerfMetricsSummary(data);
  }

  /**
   * Lists Steps for a given Execution. The steps are sorted by creation_time
   * in descending order. The step_id key will be used to order the steps with
   * the same creation_time. May return any of the following canonical error
   * codes: - PERMISSION_DENIED - if the user is not authorized to read project
   * - INVALID_ARGUMENT - if the request is malformed - FAILED_PRECONDITION - if
   * an argument in the request happens to be invalid; e.g. if an attempt is
   * made to list the children of a nonexistent Step - NOT_FOUND - if the
   * containing Execution does not exist
   *
   * @param executionId A Execution id. Required.
   * @param historyId A History id. Required.
   * @param projectId A Project id. Required.
   */
  async projectsHistoriesExecutionsStepsList(executionId: string, historyId: string, projectId: string, opts: ProjectsHistoriesExecutionsStepsListOptions = {}): Promise<ListStepsResponse> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps`);
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
    return deserializeListStepsResponse(data);
  }

  /**
   * Updates an existing Step with the supplied partial entity. May return any
   * of the following canonical error codes: - PERMISSION_DENIED - if the user
   * is not authorized to write project - INVALID_ARGUMENT - if the request is
   * malformed - FAILED_PRECONDITION - if the requested state transition is
   * illegal (e.g try to upload a duplicate xml file), if the updated step is
   * too large (more than 10Mib) - NOT_FOUND - if the containing Execution does
   * not exist
   *
   * @param executionId A Execution id. Required.
   * @param historyId A History id. Required.
   * @param projectId A Project id. Required.
   * @param stepId A Step id. Required.
   */
  async projectsHistoriesExecutionsStepsPatch(executionId: string, historyId: string, projectId: string, stepId: string, req: Step, opts: ProjectsHistoriesExecutionsStepsPatchOptions = {}): Promise<Step> {
    req = serializeStep(req);
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps/${ stepId }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeStep(data);
  }

  /**
   * Creates a PerfMetricsSummary resource. Returns the existing one if it has
   * already been created. May return any of the following error code(s): -
   * NOT_FOUND - The containing Step does not exist
   *
   * @param executionId A tool results execution ID.
   * @param historyId A tool results history ID.
   * @param projectId The cloud project
   * @param stepId A tool results step ID.
   */
  async projectsHistoriesExecutionsStepsPerfMetricsSummaryCreate(executionId: string, historyId: string, projectId: string, stepId: string, req: PerfMetricsSummary): Promise<PerfMetricsSummary> {
    req = serializePerfMetricsSummary(req);
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps/${ stepId }/perfMetricsSummary`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePerfMetricsSummary(data);
  }

  /**
   * Creates a PerfSampleSeries. May return any of the following error code(s):
   * - ALREADY_EXISTS - PerfMetricSummary already exists for the given Step -
   * NOT_FOUND - The containing Step does not exist
   *
   * @param executionId A tool results execution ID.
   * @param historyId A tool results history ID.
   * @param projectId The cloud project
   * @param stepId A tool results step ID.
   */
  async projectsHistoriesExecutionsStepsPerfSampleSeriesCreate(executionId: string, historyId: string, projectId: string, stepId: string, req: PerfSampleSeries): Promise<PerfSampleSeries> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps/${ stepId }/perfSampleSeries`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as PerfSampleSeries;
  }

  /**
   * Gets a PerfSampleSeries. May return any of the following error code(s): -
   * NOT_FOUND - The specified PerfSampleSeries does not exist
   *
   * @param executionId A tool results execution ID.
   * @param historyId A tool results history ID.
   * @param projectId The cloud project
   * @param sampleSeriesId A sample series id
   * @param stepId A tool results step ID.
   */
  async projectsHistoriesExecutionsStepsPerfSampleSeriesGet(executionId: string, historyId: string, projectId: string, sampleSeriesId: string, stepId: string): Promise<PerfSampleSeries> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps/${ stepId }/perfSampleSeries/${ sampleSeriesId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PerfSampleSeries;
  }

  /**
   * Lists PerfSampleSeries for a given Step. The request provides an optional
   * filter which specifies one or more PerfMetricsType to include in the
   * result; if none returns all. The resulting PerfSampleSeries are sorted by
   * ids. May return any of the following canonical error codes: - NOT_FOUND -
   * The containing Step does not exist
   *
   * @param executionId A tool results execution ID.
   * @param historyId A tool results history ID.
   * @param projectId The cloud project
   * @param stepId A tool results step ID.
   */
  async projectsHistoriesExecutionsStepsPerfSampleSeriesList(executionId: string, historyId: string, projectId: string, stepId: string, opts: ProjectsHistoriesExecutionsStepsPerfSampleSeriesListOptions = {}): Promise<ListPerfSampleSeriesResponse> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps/${ stepId }/perfSampleSeries`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListPerfSampleSeriesResponse;
  }

  /**
   * Creates a batch of PerfSamples - a client can submit multiple batches of
   * Perf Samples through repeated calls to this method in order to split up a
   * large request payload - duplicates and existing timestamp entries will be
   * ignored. - the batch operation may partially succeed - the set of elements
   * successfully inserted is returned in the response (omits items which
   * already existed in the database). May return any of the following canonical
   * error codes: - NOT_FOUND - The containing PerfSampleSeries does not exist
   *
   * @param executionId A tool results execution ID.
   * @param historyId A tool results history ID.
   * @param projectId The cloud project
   * @param sampleSeriesId A sample series id
   * @param stepId A tool results step ID.
   */
  async projectsHistoriesExecutionsStepsPerfSampleSeriesSamplesBatchCreate(executionId: string, historyId: string, projectId: string, sampleSeriesId: string, stepId: string, req: BatchCreatePerfSamplesRequest): Promise<BatchCreatePerfSamplesResponse> {
    req = serializeBatchCreatePerfSamplesRequest(req);
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps/${ stepId }/perfSampleSeries/${ sampleSeriesId }/samples:batchCreate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchCreatePerfSamplesResponse(data);
  }

  /**
   * Lists the Performance Samples of a given Sample Series - The list results
   * are sorted by timestamps ascending - The default page size is 500 samples;
   * and maximum size allowed 5000 - The response token indicates the last
   * returned PerfSample timestamp - When the results size exceeds the page
   * size, submit a subsequent request including the page token to return the
   * rest of the samples up to the page limit May return any of the following
   * canonical error codes: - OUT_OF_RANGE - The specified request page_token is
   * out of valid range - NOT_FOUND - The containing PerfSampleSeries does not
   * exist
   *
   * @param executionId A tool results execution ID.
   * @param historyId A tool results history ID.
   * @param projectId The cloud project
   * @param sampleSeriesId A sample series id
   * @param stepId A tool results step ID.
   */
  async projectsHistoriesExecutionsStepsPerfSampleSeriesSamplesList(executionId: string, historyId: string, projectId: string, sampleSeriesId: string, stepId: string, opts: ProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesListOptions = {}): Promise<ListPerfSamplesResponse> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps/${ stepId }/perfSampleSeries/${ sampleSeriesId }/samples`);
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
    return deserializeListPerfSamplesResponse(data);
  }

  /**
   * Publish xml files to an existing Step. May return any of the following
   * canonical error codes: - PERMISSION_DENIED - if the user is not authorized
   * to write project - INVALID_ARGUMENT - if the request is malformed -
   * FAILED_PRECONDITION - if the requested state transition is illegal, e.g try
   * to upload a duplicate xml file or a file too large. - NOT_FOUND - if the
   * containing Execution does not exist
   *
   * @param executionId A Execution id. Required.
   * @param historyId A History id. Required.
   * @param projectId A Project id. Required.
   * @param stepId A Step id. Note: This step must include a TestExecutionStep. Required.
   */
  async projectsHistoriesExecutionsStepsPublishXunitXmlFiles(executionId: string, historyId: string, projectId: string, stepId: string, req: PublishXunitXmlFilesRequest): Promise<Step> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps/${ stepId }:publishXunitXmlFiles`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeStep(data);
  }

  /**
   * Gets details of a Test Case for a Step. Experimental test cases API. Still
   * in active development. May return any of the following canonical error
   * codes: - PERMISSION_DENIED - if the user is not authorized to write to
   * project - INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if
   * the containing Test Case does not exist
   *
   * @param executionId A Execution id Required.
   * @param historyId A History id. Required.
   * @param projectId A Project id. Required.
   * @param stepId A Step id. Note: This step must include a TestExecutionStep. Required.
   * @param testCaseId A Test Case id. Required.
   */
  async projectsHistoriesExecutionsStepsTestCasesGet(executionId: string, historyId: string, projectId: string, stepId: string, testCaseId: string): Promise<TestCase> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps/${ stepId }/testCases/${ testCaseId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTestCase(data);
  }

  /**
   * Lists Test Cases attached to a Step. Experimental test cases API. Still in
   * active development. May return any of the following canonical error codes:
   * - PERMISSION_DENIED - if the user is not authorized to write to project -
   * INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the
   * containing Step does not exist
   *
   * @param executionId A Execution id Required.
   * @param historyId A History id. Required.
   * @param projectId A Project id. Required.
   * @param stepId A Step id. Note: This step must include a TestExecutionStep. Required.
   */
  async projectsHistoriesExecutionsStepsTestCasesList(executionId: string, historyId: string, projectId: string, stepId: string, opts: ProjectsHistoriesExecutionsStepsTestCasesListOptions = {}): Promise<ListTestCasesResponse> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps/${ stepId }/testCases`);
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
    return deserializeListTestCasesResponse(data);
  }

  /**
   * Lists thumbnails of images attached to a step. May return any of the
   * following canonical error codes: - PERMISSION_DENIED - if the user is not
   * authorized to read from the project, or from any of the images -
   * INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the step
   * does not exist, or if any of the images do not exist
   *
   * @param executionId An Execution id. Required.
   * @param historyId A History id. Required.
   * @param projectId A Project id. Required.
   * @param stepId A Step id. Required.
   */
  async projectsHistoriesExecutionsStepsThumbnailsList(executionId: string, historyId: string, projectId: string, stepId: string, opts: ProjectsHistoriesExecutionsStepsThumbnailsListOptions = {}): Promise<ListStepThumbnailsResponse> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }/executions/${ executionId }/steps/${ stepId }/thumbnails`);
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
    return deserializeListStepThumbnailsResponse(data);
  }

  /**
   * Gets a History. May return any of the following canonical error codes: -
   * PERMISSION_DENIED - if the user is not authorized to read project -
   * INVALID_ARGUMENT - if the request is malformed - NOT_FOUND - if the History
   * does not exist
   *
   * @param historyId A History id. Required.
   * @param projectId A Project id. Required.
   */
  async projectsHistoriesGet(historyId: string, projectId: string): Promise<History> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories/${ historyId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as History;
  }

  /**
   * Lists Histories for a given Project. The histories are sorted by
   * modification time in descending order. The history_id key will be used to
   * order the history with the same modification time. May return any of the
   * following canonical error codes: - PERMISSION_DENIED - if the user is not
   * authorized to read project - INVALID_ARGUMENT - if the request is malformed
   * - NOT_FOUND - if the History does not exist
   *
   * @param projectId A Project id. Required.
   */
  async projectsHistoriesList(projectId: string, opts: ProjectsHistoriesListOptions = {}): Promise<ListHistoriesResponse> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }/histories`);
    if (opts.filterByName !== undefined) {
      url.searchParams.append("filterByName", String(opts.filterByName));
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
    return data as ListHistoriesResponse;
  }

  /**
   * Creates resources for settings which have not yet been set. Currently,
   * this creates a single resource: a Google Cloud Storage bucket, to be used
   * as the default bucket for this project. The bucket is created in an FTL-own
   * storage project. Except for in rare cases, calling this method in parallel
   * from multiple clients will only create a single bucket. In order to avoid
   * unnecessary storage charges, the bucket is configured to automatically
   * delete objects older than 90 days. The bucket is created with the following
   * permissions: - Owner access for owners of central storage project
   * (FTL-owned) - Writer access for owners/editors of customer project - Reader
   * access for viewers of customer project The default ACL on objects created
   * in the bucket is: - Owner access for owners of central storage project -
   * Reader access for owners/editors/viewers of customer project See Google
   * Cloud Storage documentation for more details. If there is already a default
   * bucket set and the project can access the bucket, this call does nothing.
   * However, if the project doesn't have the permission to access the bucket or
   * the bucket is deleted, a new bucket will be created. May return any
   * canonical error codes, including the following: - PERMISSION_DENIED - if
   * the user is not authorized to write to project - Any error code raised by
   * Google Cloud Storage
   *
   * @param projectId A Project id. Required.
   */
  async projectsInitializeSettings(projectId: string): Promise<ProjectSettings> {
    const url = new URL(`${this.#baseUrl}toolresults/v1beta3/projects/${ projectId }:initializeSettings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as ProjectSettings;
  }
}

/**
 * Android app information.
 */
export interface AndroidAppInfo {
  /**
   * The name of the app. Optional
   */
  name?: string;
  /**
   * The package name of the app. Required.
   */
  packageName?: string;
  /**
   * The internal version code of the app. Optional.
   */
  versionCode?: string;
  /**
   * The version name of the app. Optional.
   */
  versionName?: string;
}

/**
 * A test of an Android application that can control an Android component
 * independently of its normal lifecycle. See for more information on types of
 * Android tests.
 */
export interface AndroidInstrumentationTest {
  /**
   * The java package for the test to be executed. Required
   */
  testPackageId?: string;
  /**
   * The InstrumentationTestRunner class. Required
   */
  testRunnerClass?: string;
  /**
   * Each target must be fully qualified with the package name or class name,
   * in one of these formats: - "package package_name" - "class
   * package_name.class_name" - "class package_name.class_name#method_name" If
   * empty, all targets in the module will be run.
   */
  testTargets?: string[];
  /**
   * The flag indicates whether Android Test Orchestrator will be used to run
   * test or not.
   */
  useOrchestrator?: boolean;
}

/**
 * A test of an android application that explores the application on a virtual
 * or physical Android device, finding culprits and crashes as it goes.
 */
export interface AndroidRoboTest {
  /**
   * The initial activity that should be used to start the app. Optional
   */
  appInitialActivity?: string;
  /**
   * The java package for the bootstrap. Optional
   */
  bootstrapPackageId?: string;
  /**
   * The runner class for the bootstrap. Optional
   */
  bootstrapRunnerClass?: string;
  /**
   * The max depth of the traversal stack Robo can explore. Optional
   */
  maxDepth?: number;
  /**
   * The max number of steps/actions Robo can execute. Default is no limit (0).
   * Optional
   */
  maxSteps?: number;
}

/**
 * An Android mobile test specification.
 */
export interface AndroidTest {
  /**
   * Information about the application under test.
   */
  androidAppInfo?: AndroidAppInfo;
  /**
   * An Android instrumentation test.
   */
  androidInstrumentationTest?: AndroidInstrumentationTest;
  /**
   * An Android robo test.
   */
  androidRoboTest?: AndroidRoboTest;
  /**
   * An Android test loop.
   */
  androidTestLoop?: AndroidTestLoop;
  /**
   * Max time a test is allowed to run before it is automatically cancelled.
   */
  testTimeout?: Duration;
}

function serializeAndroidTest(data: any): AndroidTest {
  return {
    ...data,
    testTimeout: data["testTimeout"] !== undefined ? serializeDuration(data["testTimeout"]) : undefined,
  };
}

function deserializeAndroidTest(data: any): AndroidTest {
  return {
    ...data,
    testTimeout: data["testTimeout"] !== undefined ? deserializeDuration(data["testTimeout"]) : undefined,
  };
}

/**
 * Test Loops are tests that can be launched by the app itself, determining
 * when to run by listening for an intent.
 */
export interface AndroidTestLoop {
}

/**
 * Additional details for an ANR crash.
 */
export interface ANR {
  /**
   * The stack trace of the ANR crash. Optional.
   */
  stackTrace?: StackTrace;
}

/**
 * `Any` contains an arbitrary serialized protocol buffer message along with a
 * URL that describes the type of the serialized message. Protobuf library
 * provides support to pack/unpack Any values in the form of utility functions
 * or additional generated methods of the Any type. Example 1: Pack and unpack a
 * message in C++. Foo foo = ...; Any any; any.PackFrom(foo); ... if
 * (any.UnpackTo(&foo)) { ... } Example 2: Pack and unpack a message in Java.
 * Foo foo = ...; Any any = Any.pack(foo); ... if (any.is(Foo.class)) { foo =
 * any.unpack(Foo.class); } Example 3: Pack and unpack a message in Python. foo
 * = Foo(...) any = Any() any.Pack(foo) ... if any.Is(Foo.DESCRIPTOR):
 * any.Unpack(foo) ... Example 4: Pack and unpack a message in Go foo :=
 * &pb.Foo{...} any, err := ptypes.MarshalAny(foo) ... foo := &pb.Foo{} if err
 * := ptypes.UnmarshalAny(any, foo); err != nil { ... } The pack methods
 * provided by protobuf library will by default use
 * 'type.googleapis.com/full.type.name' as the type URL and the unpack methods
 * only use the fully qualified type name after the last '/' in the type URL,
 * for example "foo.bar.com/x/y.z" will yield type name "y.z". # JSON The JSON
 * representation of an `Any` value uses the regular representation of the
 * deserialized, embedded message, with an additional field `@type` which
 * contains the type URL. Example: package google.profile; message Person {
 * string first_name = 1; string last_name = 2; } { "@type":
 * "type.googleapis.com/google.profile.Person", "firstName": , "lastName": } If
 * the embedded message type is well-known and has a custom JSON representation,
 * that representation will be embedded adding a field `value` which holds the
 * custom JSON in addition to the `@type` field. Example (for message
 * google.protobuf.Duration): { "@type":
 * "type.googleapis.com/google.protobuf.Duration", "value": "1.212s" }
 */
export interface Any {
  /**
   * A URL/resource name that uniquely identifies the type of the serialized
   * protocol buffer message. This string must contain at least one "/"
   * character. The last segment of the URL's path must represent the fully
   * qualified name of the type (as in `path/google.protobuf.Duration`). The
   * name should be in a canonical form (e.g., leading "." is not accepted). In
   * practice, teams usually precompile into the binary all types that they
   * expect it to use in the context of Any. However, for URLs which use the
   * scheme `http`, `https`, or no scheme, one can optionally set up a type
   * server that maps type URLs to message definitions as follows: * If no
   * scheme is provided, `https` is assumed. * An HTTP GET on the URL must yield
   * a google.protobuf.Type value in binary format, or produce an error. *
   * Applications are allowed to cache lookup results based on the URL, or have
   * them precompiled into a binary to avoid any lookup. Therefore, binary
   * compatibility needs to be preserved on changes to types. (Use versioned
   * type names to manage breaking changes.) Note: this functionality is not
   * currently available in the official protobuf release, and it is not used
   * for type URLs beginning with type.googleapis.com. Schemes other than
   * `http`, `https` (or the empty scheme) might be used with implementation
   * specific semantics.
   */
  typeUrl?: string;
  /**
   * Must be a valid serialized protocol buffer of the above specified type.
   */
  value?: Uint8Array;
}

function serializeAny(data: any): Any {
  return {
    ...data,
    value: data["value"] !== undefined ? encodeBase64(data["value"]) : undefined,
  };
}

function deserializeAny(data: any): Any {
  return {
    ...data,
    value: data["value"] !== undefined ? decodeBase64(data["value"] as string) : undefined,
  };
}

export interface AppStartTime {
  /**
   * Optional. The time from app start to reaching the developer-reported
   * "fully drawn" time. This is only stored if the app includes a call to
   * Activity.reportFullyDrawn(). See
   * https://developer.android.com/topic/performance/launch-time.html#time-full
   */
  fullyDrawnTime?: Duration;
  /**
   * The time from app start to the first displayed activity being drawn, as
   * reported in Logcat. See
   * https://developer.android.com/topic/performance/launch-time.html#time-initial
   */
  initialDisplayTime?: Duration;
}

function serializeAppStartTime(data: any): AppStartTime {
  return {
    ...data,
    fullyDrawnTime: data["fullyDrawnTime"] !== undefined ? serializeDuration(data["fullyDrawnTime"]) : undefined,
    initialDisplayTime: data["initialDisplayTime"] !== undefined ? serializeDuration(data["initialDisplayTime"]) : undefined,
  };
}

function deserializeAppStartTime(data: any): AppStartTime {
  return {
    ...data,
    fullyDrawnTime: data["fullyDrawnTime"] !== undefined ? deserializeDuration(data["fullyDrawnTime"]) : undefined,
    initialDisplayTime: data["initialDisplayTime"] !== undefined ? deserializeDuration(data["initialDisplayTime"]) : undefined,
  };
}

/**
 * A suggestion to use deep links for a Robo run.
 */
export interface AvailableDeepLinks {
}

/**
 * Encapsulates the metadata for basic sample series represented by a line
 * chart
 */
export interface BasicPerfSampleSeries {
  perfMetricType?:  | "perfMetricTypeUnspecified" | "memory" | "cpu" | "network" | "graphics";
  perfUnit?:  | "perfUnitUnspecified" | "kibibyte" | "percent" | "bytesPerSecond" | "framesPerSecond" | "byte";
  sampleSeriesLabel?:  | "sampleSeriesTypeUnspecified" | "memoryRssPrivate" | "memoryRssShared" | "memoryRssTotal" | "memoryTotal" | "cpuUser" | "cpuKernel" | "cpuTotal" | "ntBytesTransferred" | "ntBytesReceived" | "networkSent" | "networkReceived" | "graphicsFrameRate";
}

/**
 * The request must provide up to a maximum of 5000 samples to be created; a
 * larger sample size will cause an INVALID_ARGUMENT error
 */
export interface BatchCreatePerfSamplesRequest {
  /**
   * The set of PerfSamples to create should not include existing timestamps
   */
  perfSamples?: PerfSample[];
}

function serializeBatchCreatePerfSamplesRequest(data: any): BatchCreatePerfSamplesRequest {
  return {
    ...data,
    perfSamples: data["perfSamples"] !== undefined ? data["perfSamples"].map((item: any) => (serializePerfSample(item))) : undefined,
  };
}

function deserializeBatchCreatePerfSamplesRequest(data: any): BatchCreatePerfSamplesRequest {
  return {
    ...data,
    perfSamples: data["perfSamples"] !== undefined ? data["perfSamples"].map((item: any) => (deserializePerfSample(item))) : undefined,
  };
}

export interface BatchCreatePerfSamplesResponse {
  perfSamples?: PerfSample[];
}

function serializeBatchCreatePerfSamplesResponse(data: any): BatchCreatePerfSamplesResponse {
  return {
    ...data,
    perfSamples: data["perfSamples"] !== undefined ? data["perfSamples"].map((item: any) => (serializePerfSample(item))) : undefined,
  };
}

function deserializeBatchCreatePerfSamplesResponse(data: any): BatchCreatePerfSamplesResponse {
  return {
    ...data,
    perfSamples: data["perfSamples"] !== undefined ? data["perfSamples"].map((item: any) => (deserializePerfSample(item))) : undefined,
  };
}

/**
 * A warning that Robo encountered a screen that was mostly blank; this may
 * indicate a problem with the app.
 */
export interface BlankScreen {
  /**
   * The screen id of the element
   */
  screenId?: string;
}

export interface CPUInfo {
  /**
   * description of the device processor ie '1.8 GHz hexa core 64-bit ARMv8-A'
   */
  cpuProcessor?: string;
  /**
   * the CPU clock speed in GHz
   */
  cpuSpeedInGhz?: number;
  /**
   * the number of CPU cores
   */
  numberOfCores?: number;
}

/**
 * Crash dialog was detected during the test execution
 */
export interface CrashDialogError {
  /**
   * The name of the package that caused the dialog.
   */
  crashPackage?: string;
}

/**
 * A notification that Robo detected a splash screen provided by app (vs.
 * Android OS splash screen).
 */
export interface DetectedAppSplashScreen {
}

/**
 * A warning that device ran out of memory
 */
export interface DeviceOutOfMemory {
}

/**
 * A Duration represents a signed, fixed-length span of time represented as a
 * count of seconds and fractions of seconds at nanosecond resolution. It is
 * independent of any calendar and concepts like "day" or "month". It is related
 * to Timestamp in that the difference between two Timestamp values is a
 * Duration and it can be added or subtracted from a Timestamp. Range is
 * approximately +-10,000 years.
 */
export interface Duration {
  /**
   * Signed fractions of a second at nanosecond resolution of the span of time.
   * Durations less than one second are represented with a 0 `seconds` field and
   * a positive or negative `nanos` field. For durations of one second or more,
   * a non-zero value for the `nanos` field must be of the same sign as the
   * `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.
   */
  nanos?: number;
  /**
   * Signed seconds of the span of time. Must be from -315,576,000,000 to
   * +315,576,000,000 inclusive. Note: these bounds are computed from: 60
   * sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years
   */
  seconds?: bigint;
}

function serializeDuration(data: any): Duration {
  return {
    ...data,
    seconds: data["seconds"] !== undefined ? String(data["seconds"]) : undefined,
  };
}

function deserializeDuration(data: any): Duration {
  return {
    ...data,
    seconds: data["seconds"] !== undefined ? BigInt(data["seconds"]) : undefined,
  };
}

/**
 * Additional details about encountered login screens.
 */
export interface EncounteredLoginScreen {
  /**
   * Number of encountered distinct login screens.
   */
  distinctScreens?: number;
  /**
   * Subset of login screens.
   */
  screenIds?: string[];
}

/**
 * Additional details about encountered screens with elements that are not
 * Android UI widgets.
 */
export interface EncounteredNonAndroidUiWidgetScreen {
  /**
   * Number of encountered distinct screens with non Android UI widgets.
   */
  distinctScreens?: number;
  /**
   * Subset of screens which contain non Android UI widgets.
   */
  screenIds?: string[];
}

/**
 * An Environment represents the set of test runs (Steps) from the parent
 * Execution that are configured with the same set of dimensions (Model,
 * Version, Locale, and Orientation). Multiple such runs occur particularly
 * because of features like sharding (splitting up a test suite to run in
 * parallel across devices) and reruns (running a test multiple times to check
 * for different outcomes).
 */
export interface Environment {
  /**
   * Output only. The time when the Environment status was set to complete.
   * This value will be set automatically when state transitions to COMPLETE.
   */
  completionTime?: Timestamp;
  /**
   * Output only. The time when the Environment was created.
   */
  creationTime?: Timestamp;
  /**
   * Dimension values describing the environment. Dimension values always
   * consist of "Model", "Version", "Locale", and "Orientation". - In response:
   * always set - In create request: always set - In update request: never set
   */
  dimensionValue?: EnvironmentDimensionValueEntry[];
  /**
   * A short human-readable name to display in the UI. Maximum of 100
   * characters. For example: Nexus 5, API 27.
   */
  displayName?: string;
  /**
   * Output only. An Environment id.
   */
  environmentId?: string;
  /**
   * Merged result of the environment.
   */
  environmentResult?: MergedResult;
  /**
   * Output only. An Execution id.
   */
  executionId?: string;
  /**
   * Output only. A History id.
   */
  historyId?: string;
  /**
   * Output only. A Project id.
   */
  projectId?: string;
  /**
   * The location where output files are stored in the user bucket.
   */
  resultsStorage?: ResultsStorage;
  /**
   * Output only. Summaries of shards. Only one shard will present unless
   * sharding feature is enabled in TestExecutionService.
   */
  shardSummaries?: ShardSummary[];
}

function serializeEnvironment(data: any): Environment {
  return {
    ...data,
    completionTime: data["completionTime"] !== undefined ? serializeTimestamp(data["completionTime"]) : undefined,
    creationTime: data["creationTime"] !== undefined ? serializeTimestamp(data["creationTime"]) : undefined,
    environmentResult: data["environmentResult"] !== undefined ? serializeMergedResult(data["environmentResult"]) : undefined,
    shardSummaries: data["shardSummaries"] !== undefined ? data["shardSummaries"].map((item: any) => (serializeShardSummary(item))) : undefined,
  };
}

function deserializeEnvironment(data: any): Environment {
  return {
    ...data,
    completionTime: data["completionTime"] !== undefined ? deserializeTimestamp(data["completionTime"]) : undefined,
    creationTime: data["creationTime"] !== undefined ? deserializeTimestamp(data["creationTime"]) : undefined,
    environmentResult: data["environmentResult"] !== undefined ? deserializeMergedResult(data["environmentResult"]) : undefined,
    shardSummaries: data["shardSummaries"] !== undefined ? data["shardSummaries"].map((item: any) => (deserializeShardSummary(item))) : undefined,
  };
}

export interface EnvironmentDimensionValueEntry {
  key?: string;
  value?: string;
}

/**
 * An Execution represents a collection of Steps. For instance, it could
 * represent: - a mobile test executed across a range of device configurations -
 * a jenkins job with a build step followed by a test step The maximum size of
 * an execution message is 1 MiB. An Execution can be updated until its state is
 * set to COMPLETE at which point it becomes immutable. Next tag: 16
 */
export interface Execution {
  /**
   * The time when the Execution status transitioned to COMPLETE. This value
   * will be set automatically when state transitions to COMPLETE. - In
   * response: set if the execution state is COMPLETE. - In create/update
   * request: never set
   */
  completionTime?: Timestamp;
  /**
   * The time when the Execution was created. This value will be set
   * automatically when CreateExecution is called. - In response: always set -
   * In create/update request: never set
   */
  creationTime?: Timestamp;
  /**
   * The dimensions along which different steps in this execution may vary.
   * This must remain fixed over the life of the execution. Returns
   * INVALID_ARGUMENT if this field is set in an update request. Returns
   * INVALID_ARGUMENT if the same name occurs in more than one
   * dimension_definition. Returns INVALID_ARGUMENT if the size of the list is
   * over 100. - In response: present if set by create - In create request:
   * optional - In update request: never set
   */
  dimensionDefinitions?: MatrixDimensionDefinition[];
  /**
   * A unique identifier within a History for this Execution. Returns
   * INVALID_ARGUMENT if this field is set or overwritten by the caller. - In
   * response always set - In create/update request: never set
   */
  executionId?: string;
  /**
   * Classify the result, for example into SUCCESS or FAILURE - In response:
   * present if set by create/update request - In create/update request:
   * optional
   */
  outcome?: Outcome;
  /**
   * Lightweight information about execution request. - In response: present if
   * set by create - In create: optional - In update: optional
   */
  specification?: Specification;
  /**
   * The initial state is IN_PROGRESS. The only legal state transitions is from
   * IN_PROGRESS to COMPLETE. A PRECONDITION_FAILED will be returned if an
   * invalid transition is requested. The state can only be set to COMPLETE
   * once. A FAILED_PRECONDITION will be returned if the state is set to
   * COMPLETE multiple times. If the state is set to COMPLETE, all the
   * in-progress steps within the execution will be set as COMPLETE. If the
   * outcome of the step is not set, the outcome will be set to INCONCLUSIVE. -
   * In response always set - In create/update request: optional
   */
  state?:  | "unknownState" | "pending" | "inProgress" | "complete";
  /**
   * TestExecution Matrix ID that the TestExecutionService uses. - In response:
   * present if set by create - In create: optional - In update: never set
   */
  testExecutionMatrixId?: string;
}

function serializeExecution(data: any): Execution {
  return {
    ...data,
    completionTime: data["completionTime"] !== undefined ? serializeTimestamp(data["completionTime"]) : undefined,
    creationTime: data["creationTime"] !== undefined ? serializeTimestamp(data["creationTime"]) : undefined,
    specification: data["specification"] !== undefined ? serializeSpecification(data["specification"]) : undefined,
  };
}

function deserializeExecution(data: any): Execution {
  return {
    ...data,
    completionTime: data["completionTime"] !== undefined ? deserializeTimestamp(data["completionTime"]) : undefined,
    creationTime: data["creationTime"] !== undefined ? deserializeTimestamp(data["creationTime"]) : undefined,
    specification: data["specification"] !== undefined ? deserializeSpecification(data["specification"]) : undefined,
  };
}

/**
 * Failed to install the APK.
 */
export interface FailedToInstall {
}

/**
 * Details for an outcome with a FAILURE outcome summary.
 */
export interface FailureDetail {
  /**
   * If the failure was severe because the system (app) under test crashed.
   */
  crashed?: boolean;
  /**
   * If the device ran out of memory during a test, causing the test to crash.
   */
  deviceOutOfMemory?: boolean;
  /**
   * If the Roboscript failed to complete successfully, e.g., because a
   * Roboscript action or assertion failed or a Roboscript action could not be
   * matched during the entire crawl.
   */
  failedRoboscript?: boolean;
  /**
   * If an app is not installed and thus no test can be run with the app. This
   * might be caused by trying to run a test on an unsupported platform.
   */
  notInstalled?: boolean;
  /**
   * If a native process (including any other than the app) crashed.
   */
  otherNativeCrash?: boolean;
  /**
   * If the test overran some time limit, and that is why it failed.
   */
  timedOut?: boolean;
  /**
   * If the robo was unable to crawl the app; perhaps because the app did not
   * start.
   */
  unableToCrawl?: boolean;
}

/**
 * Additional details for a fatal exception.
 */
export interface FatalException {
  /**
   * The stack trace of the fatal exception. Optional.
   */
  stackTrace?: StackTrace;
}

/**
 * A reference to a file.
 */
export interface FileReference {
  /**
   * The URI of a file stored in Google Cloud Storage. For example:
   * http://storage.googleapis.com/mybucket/path/to/test.xml or in gsutil
   * format: gs://mybucket/path/to/test.xml with version-specific info,
   * gs://mybucket/path/to/test.xml#1360383693690000 An INVALID_ARGUMENT error
   * will be returned if the URI format is not supported. - In response: always
   * set - In create/update request: always set
   */
  fileUri?: string;
}

/**
 * Graphics statistics for the App. The information is collected from 'adb
 * shell dumpsys graphicsstats'. For more info see:
 * https://developer.android.com/training/testing/performance.html Statistics
 * will only be present for API 23+.
 */
export interface GraphicsStats {
  /**
   * Histogram of frame render times. There should be 154 buckets ranging from
   * [5ms, 6ms) to [4950ms, infinity)
   */
  buckets?: GraphicsStatsBucket[];
  /**
   * Total "high input latency" events.
   */
  highInputLatencyCount?: bigint;
  /**
   * Total frames with slow render time. Should be <= total_frames.
   */
  jankyFrames?: bigint;
  /**
   * Total "missed vsync" events.
   */
  missedVsyncCount?: bigint;
  /**
   * 50th percentile frame render time in milliseconds.
   */
  p50Millis?: bigint;
  /**
   * 90th percentile frame render time in milliseconds.
   */
  p90Millis?: bigint;
  /**
   * 95th percentile frame render time in milliseconds.
   */
  p95Millis?: bigint;
  /**
   * 99th percentile frame render time in milliseconds.
   */
  p99Millis?: bigint;
  /**
   * Total "slow bitmap upload" events.
   */
  slowBitmapUploadCount?: bigint;
  /**
   * Total "slow draw" events.
   */
  slowDrawCount?: bigint;
  /**
   * Total "slow UI thread" events.
   */
  slowUiThreadCount?: bigint;
  /**
   * Total frames rendered by package.
   */
  totalFrames?: bigint;
}

function serializeGraphicsStats(data: any): GraphicsStats {
  return {
    ...data,
    buckets: data["buckets"] !== undefined ? data["buckets"].map((item: any) => (serializeGraphicsStatsBucket(item))) : undefined,
    highInputLatencyCount: data["highInputLatencyCount"] !== undefined ? String(data["highInputLatencyCount"]) : undefined,
    jankyFrames: data["jankyFrames"] !== undefined ? String(data["jankyFrames"]) : undefined,
    missedVsyncCount: data["missedVsyncCount"] !== undefined ? String(data["missedVsyncCount"]) : undefined,
    p50Millis: data["p50Millis"] !== undefined ? String(data["p50Millis"]) : undefined,
    p90Millis: data["p90Millis"] !== undefined ? String(data["p90Millis"]) : undefined,
    p95Millis: data["p95Millis"] !== undefined ? String(data["p95Millis"]) : undefined,
    p99Millis: data["p99Millis"] !== undefined ? String(data["p99Millis"]) : undefined,
    slowBitmapUploadCount: data["slowBitmapUploadCount"] !== undefined ? String(data["slowBitmapUploadCount"]) : undefined,
    slowDrawCount: data["slowDrawCount"] !== undefined ? String(data["slowDrawCount"]) : undefined,
    slowUiThreadCount: data["slowUiThreadCount"] !== undefined ? String(data["slowUiThreadCount"]) : undefined,
    totalFrames: data["totalFrames"] !== undefined ? String(data["totalFrames"]) : undefined,
  };
}

function deserializeGraphicsStats(data: any): GraphicsStats {
  return {
    ...data,
    buckets: data["buckets"] !== undefined ? data["buckets"].map((item: any) => (deserializeGraphicsStatsBucket(item))) : undefined,
    highInputLatencyCount: data["highInputLatencyCount"] !== undefined ? BigInt(data["highInputLatencyCount"]) : undefined,
    jankyFrames: data["jankyFrames"] !== undefined ? BigInt(data["jankyFrames"]) : undefined,
    missedVsyncCount: data["missedVsyncCount"] !== undefined ? BigInt(data["missedVsyncCount"]) : undefined,
    p50Millis: data["p50Millis"] !== undefined ? BigInt(data["p50Millis"]) : undefined,
    p90Millis: data["p90Millis"] !== undefined ? BigInt(data["p90Millis"]) : undefined,
    p95Millis: data["p95Millis"] !== undefined ? BigInt(data["p95Millis"]) : undefined,
    p99Millis: data["p99Millis"] !== undefined ? BigInt(data["p99Millis"]) : undefined,
    slowBitmapUploadCount: data["slowBitmapUploadCount"] !== undefined ? BigInt(data["slowBitmapUploadCount"]) : undefined,
    slowDrawCount: data["slowDrawCount"] !== undefined ? BigInt(data["slowDrawCount"]) : undefined,
    slowUiThreadCount: data["slowUiThreadCount"] !== undefined ? BigInt(data["slowUiThreadCount"]) : undefined,
    totalFrames: data["totalFrames"] !== undefined ? BigInt(data["totalFrames"]) : undefined,
  };
}

export interface GraphicsStatsBucket {
  /**
   * Number of frames in the bucket.
   */
  frameCount?: bigint;
  /**
   * Lower bound of render time in milliseconds.
   */
  renderMillis?: bigint;
}

function serializeGraphicsStatsBucket(data: any): GraphicsStatsBucket {
  return {
    ...data,
    frameCount: data["frameCount"] !== undefined ? String(data["frameCount"]) : undefined,
    renderMillis: data["renderMillis"] !== undefined ? String(data["renderMillis"]) : undefined,
  };
}

function deserializeGraphicsStatsBucket(data: any): GraphicsStatsBucket {
  return {
    ...data,
    frameCount: data["frameCount"] !== undefined ? BigInt(data["frameCount"]) : undefined,
    renderMillis: data["renderMillis"] !== undefined ? BigInt(data["renderMillis"]) : undefined,
  };
}

/**
 * A History represents a sorted list of Executions ordered by the
 * start_timestamp_millis field (descending). It can be used to group all the
 * Executions of a continuous build. Note that the ordering only operates on
 * one-dimension. If a repository has multiple branches, it means that multiple
 * histories will need to be used in order to order Executions per branch.
 */
export interface History {
  /**
   * A short human-readable (plain text) name to display in the UI. Maximum of
   * 100 characters. - In response: present if set during create. - In create
   * request: optional
   */
  displayName?: string;
  /**
   * A unique identifier within a project for this History. Returns
   * INVALID_ARGUMENT if this field is set or overwritten by the caller. - In
   * response always set - In create request: never set
   */
  historyId?: string;
  /**
   * A name to uniquely identify a history within a project. Maximum of 200
   * characters. - In response always set - In create request: always set
   */
  name?: string;
  /**
   * The platform of the test history. - In response: always set. Returns the
   * platform of the last execution if unknown.
   */
  testPlatform?:  | "unknownPlatform" | "android" | "ios";
}

/**
 * An image, with a link to the main image and a thumbnail.
 */
export interface Image {
  /**
   * An error explaining why the thumbnail could not be rendered.
   */
  error?: Status;
  /**
   * A reference to the full-size, original image. This is the same as the
   * tool_outputs entry for the image under its Step. Always set.
   */
  sourceImage?: ToolOutputReference;
  /**
   * The step to which the image is attached. Always set.
   */
  stepId?: string;
  /**
   * The thumbnail.
   */
  thumbnail?: Thumbnail;
}

function serializeImage(data: any): Image {
  return {
    ...data,
    sourceImage: data["sourceImage"] !== undefined ? serializeToolOutputReference(data["sourceImage"]) : undefined,
    thumbnail: data["thumbnail"] !== undefined ? serializeThumbnail(data["thumbnail"]) : undefined,
  };
}

function deserializeImage(data: any): Image {
  return {
    ...data,
    sourceImage: data["sourceImage"] !== undefined ? deserializeToolOutputReference(data["sourceImage"]) : undefined,
    thumbnail: data["thumbnail"] !== undefined ? deserializeThumbnail(data["thumbnail"]) : undefined,
  };
}

/**
 * Additional details of in-app purchases encountered during the crawl.
 */
export interface InAppPurchasesFound {
  /**
   * The total number of in-app purchases flows explored: how many times the
   * robo tries to buy a SKU.
   */
  inAppPurchasesFlowsExplored?: number;
  /**
   * The total number of in-app purchases flows started.
   */
  inAppPurchasesFlowsStarted?: number;
}

/**
 * Details for an outcome with an INCONCLUSIVE outcome summary.
 */
export interface InconclusiveDetail {
  /**
   * If the end user aborted the test execution before a pass or fail could be
   * determined. For example, the user pressed ctrl-c which sent a kill signal
   * to the test runner while the test was running.
   */
  abortedByUser?: boolean;
  /**
   * If results are being provided to the user in certain cases of
   * infrastructure failures
   */
  hasErrorLogs?: boolean;
  /**
   * If the test runner could not determine success or failure because the test
   * depends on a component other than the system under test which failed. For
   * example, a mobile test requires provisioning a device where the test
   * executes, and that provisioning can fail.
   */
  infrastructureFailure?: boolean;
}

/**
 * Step Id and outcome of each individual step that was run as a group with
 * other steps with the same configuration.
 */
export interface IndividualOutcome {
  /**
   * Unique int given to each step. Ranges from 0(inclusive) to total number of
   * steps(exclusive). The primary step is 0.
   */
  multistepNumber?: number;
  outcomeSummary?:  | "unset" | "success" | "failure" | "inconclusive" | "skipped" | "flaky";
  /**
   * How long it took for this step to run.
   */
  runDuration?: Duration;
  stepId?: string;
}

function serializeIndividualOutcome(data: any): IndividualOutcome {
  return {
    ...data,
    runDuration: data["runDuration"] !== undefined ? serializeDuration(data["runDuration"]) : undefined,
  };
}

function deserializeIndividualOutcome(data: any): IndividualOutcome {
  return {
    ...data,
    runDuration: data["runDuration"] !== undefined ? deserializeDuration(data["runDuration"]) : undefined,
  };
}

/**
 * A warning that Robo did not crawl potentially important parts of the app.
 */
export interface InsufficientCoverage {
}

/**
 * Additional details for an iOS app crash.
 */
export interface IosAppCrashed {
  /**
   * The stack trace, if one is available. Optional.
   */
  stackTrace?: StackTrace;
}

/**
 * iOS app information
 */
export interface IosAppInfo {
  /**
   * The name of the app. Required
   */
  name?: string;
}

/**
 * A Robo test for an iOS application.
 */
export interface IosRoboTest {
}

/**
 * A iOS mobile test specification
 */
export interface IosTest {
  /**
   * Information about the application under test.
   */
  iosAppInfo?: IosAppInfo;
  /**
   * An iOS Robo test.
   */
  iosRoboTest?: IosRoboTest;
  /**
   * An iOS test loop.
   */
  iosTestLoop?: IosTestLoop;
  /**
   * An iOS XCTest.
   */
  iosXcTest?: IosXcTest;
  /**
   * Max time a test is allowed to run before it is automatically cancelled.
   */
  testTimeout?: Duration;
}

function serializeIosTest(data: any): IosTest {
  return {
    ...data,
    testTimeout: data["testTimeout"] !== undefined ? serializeDuration(data["testTimeout"]) : undefined,
  };
}

function deserializeIosTest(data: any): IosTest {
  return {
    ...data,
    testTimeout: data["testTimeout"] !== undefined ? deserializeDuration(data["testTimeout"]) : undefined,
  };
}

/**
 * A game loop test of an iOS application.
 */
export interface IosTestLoop {
  /**
   * Bundle ID of the app.
   */
  bundleId?: string;
}

/**
 * A test of an iOS application that uses the XCTest framework.
 */
export interface IosXcTest {
  /**
   * Bundle ID of the app.
   */
  bundleId?: string;
  /**
   * Xcode version that the test was run with.
   */
  xcodeVersion?: string;
}

/**
 * Failed to find the launcher activity of an app.
 */
export interface LauncherActivityNotFound {
}

/**
 * Response message for EnvironmentService.ListEnvironments.
 */
export interface ListEnvironmentsResponse {
  /**
   * Environments. Always set.
   */
  environments?: Environment[];
  /**
   * A Execution id Always set.
   */
  executionId?: string;
  /**
   * A History id. Always set.
   */
  historyId?: string;
  /**
   * A continuation token to resume the query at the next item. Will only be
   * set if there are more Environments to fetch.
   */
  nextPageToken?: string;
  /**
   * A Project id. Always set.
   */
  projectId?: string;
}

function serializeListEnvironmentsResponse(data: any): ListEnvironmentsResponse {
  return {
    ...data,
    environments: data["environments"] !== undefined ? data["environments"].map((item: any) => (serializeEnvironment(item))) : undefined,
  };
}

function deserializeListEnvironmentsResponse(data: any): ListEnvironmentsResponse {
  return {
    ...data,
    environments: data["environments"] !== undefined ? data["environments"].map((item: any) => (deserializeEnvironment(item))) : undefined,
  };
}

export interface ListExecutionsResponse {
  /**
   * Executions. Always set.
   */
  executions?: Execution[];
  /**
   * A continuation token to resume the query at the next item. Will only be
   * set if there are more Executions to fetch.
   */
  nextPageToken?: string;
}

function serializeListExecutionsResponse(data: any): ListExecutionsResponse {
  return {
    ...data,
    executions: data["executions"] !== undefined ? data["executions"].map((item: any) => (serializeExecution(item))) : undefined,
  };
}

function deserializeListExecutionsResponse(data: any): ListExecutionsResponse {
  return {
    ...data,
    executions: data["executions"] !== undefined ? data["executions"].map((item: any) => (deserializeExecution(item))) : undefined,
  };
}

/**
 * Response message for HistoryService.List
 */
export interface ListHistoriesResponse {
  /**
   * Histories.
   */
  histories?: History[];
  /**
   * A continuation token to resume the query at the next item. Will only be
   * set if there are more histories to fetch. Tokens are valid for up to one
   * hour from the time of the first list request. For instance, if you make a
   * list request at 1PM and use the token from this first request 10 minutes
   * later, the token from this second response will only be valid for 50
   * minutes.
   */
  nextPageToken?: string;
}

export interface ListPerfSampleSeriesResponse {
  /**
   * The resulting PerfSampleSeries sorted by id
   */
  perfSampleSeries?: PerfSampleSeries[];
}

export interface ListPerfSamplesResponse {
  /**
   * Optional, returned if result size exceeds the page size specified in the
   * request (or the default page size, 500, if unspecified). It indicates the
   * last sample timestamp to be used as page_token in subsequent request
   */
  nextPageToken?: string;
  perfSamples?: PerfSample[];
}

function serializeListPerfSamplesResponse(data: any): ListPerfSamplesResponse {
  return {
    ...data,
    perfSamples: data["perfSamples"] !== undefined ? data["perfSamples"].map((item: any) => (serializePerfSample(item))) : undefined,
  };
}

function deserializeListPerfSamplesResponse(data: any): ListPerfSamplesResponse {
  return {
    ...data,
    perfSamples: data["perfSamples"] !== undefined ? data["perfSamples"].map((item: any) => (deserializePerfSample(item))) : undefined,
  };
}

export interface ListScreenshotClustersResponse {
  /**
   * The set of clusters associated with an execution Always set
   */
  clusters?: ScreenshotCluster[];
}

/**
 * Response message for AccessibilityService.ListStepAccessibilityClusters.
 */
export interface ListStepAccessibilityClustersResponse {
  /**
   * A sequence of accessibility suggestions, grouped into clusters. Within the
   * sequence, clusters that belong to the same SuggestionCategory should be
   * adjacent. Within each category, clusters should be ordered by their
   * SuggestionPriority (ERRORs first). The categories should be ordered by
   * their highest priority cluster.
   */
  clusters?: SuggestionClusterProto[];
  /**
   * A full resource name of the step. For example,
   * projects/my-project/histories/bh.1234567890abcdef/executions/
   * 1234567890123456789/steps/bs.1234567890abcdef Always presents.
   */
  name?: string;
}

/**
 * Response message for StepService.List.
 */
export interface ListStepsResponse {
  /**
   * A continuation token to resume the query at the next item. If set,
   * indicates that there are more steps to read, by calling list again with
   * this value in the page_token field.
   */
  nextPageToken?: string;
  /**
   * Steps.
   */
  steps?: Step[];
}

function serializeListStepsResponse(data: any): ListStepsResponse {
  return {
    ...data,
    steps: data["steps"] !== undefined ? data["steps"].map((item: any) => (serializeStep(item))) : undefined,
  };
}

function deserializeListStepsResponse(data: any): ListStepsResponse {
  return {
    ...data,
    steps: data["steps"] !== undefined ? data["steps"].map((item: any) => (deserializeStep(item))) : undefined,
  };
}

/**
 * A response containing the thumbnails in a step.
 */
export interface ListStepThumbnailsResponse {
  /**
   * A continuation token to resume the query at the next item. If set,
   * indicates that there are more thumbnails to read, by calling list again
   * with this value in the page_token field.
   */
  nextPageToken?: string;
  /**
   * A list of image data. Images are returned in a deterministic order; they
   * are ordered by these factors, in order of importance: * First, by their
   * associated test case. Images without a test case are considered greater
   * than images with one. * Second, by their creation time. Images without a
   * creation time are greater than images with one. * Third, by the order in
   * which they were added to the step (by calls to CreateStep or UpdateStep).
   */
  thumbnails?: Image[];
}

function serializeListStepThumbnailsResponse(data: any): ListStepThumbnailsResponse {
  return {
    ...data,
    thumbnails: data["thumbnails"] !== undefined ? data["thumbnails"].map((item: any) => (serializeImage(item))) : undefined,
  };
}

function deserializeListStepThumbnailsResponse(data: any): ListStepThumbnailsResponse {
  return {
    ...data,
    thumbnails: data["thumbnails"] !== undefined ? data["thumbnails"].map((item: any) => (deserializeImage(item))) : undefined,
  };
}

/**
 * Response message for StepService.ListTestCases.
 */
export interface ListTestCasesResponse {
  nextPageToken?: string;
  /**
   * List of test cases.
   */
  testCases?: TestCase[];
}

function serializeListTestCasesResponse(data: any): ListTestCasesResponse {
  return {
    ...data,
    testCases: data["testCases"] !== undefined ? data["testCases"].map((item: any) => (serializeTestCase(item))) : undefined,
  };
}

function deserializeListTestCasesResponse(data: any): ListTestCasesResponse {
  return {
    ...data,
    testCases: data["testCases"] !== undefined ? data["testCases"].map((item: any) => (deserializeTestCase(item))) : undefined,
  };
}

/**
 * A warning that there were issues in logcat collection.
 */
export interface LogcatCollectionError {
}

/**
 * One dimension of the matrix of different runs of a step.
 */
export interface MatrixDimensionDefinition {
}

export interface MemoryInfo {
  /**
   * Maximum memory that can be allocated to the process in KiB
   */
  memoryCapInKibibyte?: bigint;
  /**
   * Total memory available on the device in KiB
   */
  memoryTotalInKibibyte?: bigint;
}

function serializeMemoryInfo(data: any): MemoryInfo {
  return {
    ...data,
    memoryCapInKibibyte: data["memoryCapInKibibyte"] !== undefined ? String(data["memoryCapInKibibyte"]) : undefined,
    memoryTotalInKibibyte: data["memoryTotalInKibibyte"] !== undefined ? String(data["memoryTotalInKibibyte"]) : undefined,
  };
}

function deserializeMemoryInfo(data: any): MemoryInfo {
  return {
    ...data,
    memoryCapInKibibyte: data["memoryCapInKibibyte"] !== undefined ? BigInt(data["memoryCapInKibibyte"]) : undefined,
    memoryTotalInKibibyte: data["memoryTotalInKibibyte"] !== undefined ? BigInt(data["memoryTotalInKibibyte"]) : undefined,
  };
}

/**
 * Merged test result for environment. If the environment has only one step (no
 * reruns or shards), then the merged result is the same as the step result. If
 * the environment has multiple shards and/or reruns, then the results of shards
 * and reruns that belong to the same environment are merged into one
 * environment result.
 */
export interface MergedResult {
  /**
   * Outcome of the resource
   */
  outcome?: Outcome;
  /**
   * State of the resource
   */
  state?:  | "unknownState" | "pending" | "inProgress" | "complete";
  /**
   * The combined and rolled-up result of each test suite that was run as part
   * of this environment. Combining: When the test cases from a suite are run in
   * different steps (sharding), the results are added back together in one
   * overview. (e.g., if shard1 has 2 failures and shard2 has 1 failure than the
   * overview failure_count = 3). Rollup: When test cases from the same suite
   * are run multiple times (flaky), the results are combined (e.g., if
   * testcase1.run1 fails, testcase1.run2 passes, and both testcase2.run1 and
   * testcase2.run2 fail then the overview flaky_count = 1 and failure_count =
   * 1).
   */
  testSuiteOverviews?: TestSuiteOverview[];
}

function serializeMergedResult(data: any): MergedResult {
  return {
    ...data,
    testSuiteOverviews: data["testSuiteOverviews"] !== undefined ? data["testSuiteOverviews"].map((item: any) => (serializeTestSuiteOverview(item))) : undefined,
  };
}

function deserializeMergedResult(data: any): MergedResult {
  return {
    ...data,
    testSuiteOverviews: data["testSuiteOverviews"] !== undefined ? data["testSuiteOverviews"].map((item: any) => (deserializeTestSuiteOverview(item))) : undefined,
  };
}

/**
 * Details when multiple steps are run with the same configuration as a group.
 */
export interface MultiStep {
  /**
   * Unique int given to each step. Ranges from 0(inclusive) to total number of
   * steps(exclusive). The primary step is 0.
   */
  multistepNumber?: number;
  /**
   * Present if it is a primary (original) step.
   */
  primaryStep?: PrimaryStep;
  /**
   * Step Id of the primary (original) step, which might be this step.
   */
  primaryStepId?: string;
}

function serializeMultiStep(data: any): MultiStep {
  return {
    ...data,
    primaryStep: data["primaryStep"] !== undefined ? serializePrimaryStep(data["primaryStep"]) : undefined,
  };
}

function deserializeMultiStep(data: any): MultiStep {
  return {
    ...data,
    primaryStep: data["primaryStep"] !== undefined ? deserializePrimaryStep(data["primaryStep"]) : undefined,
  };
}

/**
 * Additional details for a native crash.
 */
export interface NativeCrash {
  /**
   * The stack trace of the native crash. Optional.
   */
  stackTrace?: StackTrace;
}

/**
 * A non-sdk API and examples of it being called along with other metadata See
 * https://developer.android.com/distribute/best-practices/develop/restrictions-non-sdk-interfaces
 */
export interface NonSdkApi {
  /**
   * The signature of the Non-SDK API
   */
  apiSignature?: string;
  /**
   * Example stack traces of this API being called.
   */
  exampleStackTraces?: string[];
  /**
   * Optional debugging insights for non-SDK API violations.
   */
  insights?: NonSdkApiInsight[];
  /**
   * The total number of times this API was observed to have been called.
   */
  invocationCount?: number;
  /**
   * Which list this API appears on
   */
  list?:  | "NONE" | "WHITE" | "BLACK" | "GREY" | "GREY_MAX_O" | "GREY_MAX_P" | "GREY_MAX_Q" | "GREY_MAX_R";
}

/**
 * Non-SDK API insights (to address debugging solutions).
 */
export interface NonSdkApiInsight {
  /**
   * Optional sample stack traces, for which this insight applies (there should
   * be at least one).
   */
  exampleTraceMessages?: string[];
  /**
   * A unique ID, to be used for determining the effectiveness of this
   * particular insight in the context of a matcher. (required)
   */
  matcherId?: string;
  /**
   * An insight indicating that the hidden API usage originates from a
   * Google-provided library.
   */
  pendingGoogleUpdateInsight?: PendingGoogleUpdateInsight;
  /**
   * An insight indicating that the hidden API usage originates from the use of
   * a library that needs to be upgraded.
   */
  upgradeInsight?: UpgradeInsight;
}

/**
 * Additional details for a non-sdk API usage violation.
 */
export interface NonSdkApiUsageViolation {
  /**
   * Signatures of a subset of those hidden API's.
   */
  apiSignatures?: string[];
  /**
   * Total number of unique hidden API's accessed.
   */
  uniqueApis?: number;
}

/**
 * Contains a summary and examples of non-sdk API usage violations.
 */
export interface NonSdkApiUsageViolationReport {
  /**
   * Examples of the detected API usages.
   */
  exampleApis?: NonSdkApi[];
  /**
   * Minimum API level required for the application to run.
   */
  minSdkVersion?: number;
  /**
   * Specifies the API Level on which the application is designed to run.
   */
  targetSdkVersion?: number;
  /**
   * Total number of unique Non-SDK API's accessed.
   */
  uniqueApis?: number;
}

/**
 * Interprets a result so that humans and machines can act on it.
 */
export interface Outcome {
  /**
   * More information about a FAILURE outcome. Returns INVALID_ARGUMENT if this
   * field is set but the summary is not FAILURE. Optional
   */
  failureDetail?: FailureDetail;
  /**
   * More information about an INCONCLUSIVE outcome. Returns INVALID_ARGUMENT
   * if this field is set but the summary is not INCONCLUSIVE. Optional
   */
  inconclusiveDetail?: InconclusiveDetail;
  /**
   * More information about a SKIPPED outcome. Returns INVALID_ARGUMENT if this
   * field is set but the summary is not SKIPPED. Optional
   */
  skippedDetail?: SkippedDetail;
  /**
   * More information about a SUCCESS outcome. Returns INVALID_ARGUMENT if this
   * field is set but the summary is not SUCCESS. Optional
   */
  successDetail?: SuccessDetail;
  /**
   * The simplest way to interpret a result. Required
   */
  summary?:  | "unset" | "success" | "failure" | "inconclusive" | "skipped" | "flaky";
}

/**
 * A warning that Robo encountered a screen that has overlapping clickable
 * elements; this may indicate a potential UI issue.
 */
export interface OverlappingUIElements {
  /**
   * Resource names of the overlapping screen elements
   */
  resourceName?: string[];
  /**
   * The screen id of the elements
   */
  screenId?: string;
}

/**
 * This insight indicates that the hidden API usage originates from a
 * Google-provided library. Users need not take any action.
 */
export interface PendingGoogleUpdateInsight {
  /**
   * The name of the Google-provided library with the non-SDK API dependency.
   */
  nameOfGoogleLibrary?: string;
}

/**
 * Encapsulates performance environment info
 */
export interface PerfEnvironment {
  /**
   * CPU related environment info
   */
  cpuInfo?: CPUInfo;
  /**
   * Memory related environment info
   */
  memoryInfo?: MemoryInfo;
}

function serializePerfEnvironment(data: any): PerfEnvironment {
  return {
    ...data,
    memoryInfo: data["memoryInfo"] !== undefined ? serializeMemoryInfo(data["memoryInfo"]) : undefined,
  };
}

function deserializePerfEnvironment(data: any): PerfEnvironment {
  return {
    ...data,
    memoryInfo: data["memoryInfo"] !== undefined ? deserializeMemoryInfo(data["memoryInfo"]) : undefined,
  };
}

/**
 * A summary of perf metrics collected and performance environment info
 */
export interface PerfMetricsSummary {
  appStartTime?: AppStartTime;
  /**
   * A tool results execution ID. @OutputOnly
   */
  executionId?: string;
  /**
   * Graphics statistics for the entire run. Statistics are reset at the
   * beginning of the run and collected at the end of the run.
   */
  graphicsStats?: GraphicsStats;
  /**
   * A tool results history ID. @OutputOnly
   */
  historyId?: string;
  /**
   * Describes the environment in which the performance metrics were collected
   */
  perfEnvironment?: PerfEnvironment;
  /**
   * Set of resource collected
   */
  perfMetrics?:  | "perfMetricTypeUnspecified" | "memory" | "cpu" | "network" | "graphics"[];
  /**
   * The cloud project @OutputOnly
   */
  projectId?: string;
  /**
   * A tool results step ID. @OutputOnly
   */
  stepId?: string;
}

function serializePerfMetricsSummary(data: any): PerfMetricsSummary {
  return {
    ...data,
    appStartTime: data["appStartTime"] !== undefined ? serializeAppStartTime(data["appStartTime"]) : undefined,
    graphicsStats: data["graphicsStats"] !== undefined ? serializeGraphicsStats(data["graphicsStats"]) : undefined,
    perfEnvironment: data["perfEnvironment"] !== undefined ? serializePerfEnvironment(data["perfEnvironment"]) : undefined,
  };
}

function deserializePerfMetricsSummary(data: any): PerfMetricsSummary {
  return {
    ...data,
    appStartTime: data["appStartTime"] !== undefined ? deserializeAppStartTime(data["appStartTime"]) : undefined,
    graphicsStats: data["graphicsStats"] !== undefined ? deserializeGraphicsStats(data["graphicsStats"]) : undefined,
    perfEnvironment: data["perfEnvironment"] !== undefined ? deserializePerfEnvironment(data["perfEnvironment"]) : undefined,
  };
}

/**
 * A notification that Robo signed in with Google.
 */
export interface PerformedGoogleLogin {
}

/**
 * A notification that Robo performed some monkey actions.
 */
export interface PerformedMonkeyActions {
  /**
   * The total number of monkey actions performed during the crawl.
   */
  totalActions?: number;
}

/**
 * Resource representing a single performance measure or data point
 */
export interface PerfSample {
  /**
   * Timestamp of collection.
   */
  sampleTime?: Timestamp;
  /**
   * Value observed
   */
  value?: number;
}

function serializePerfSample(data: any): PerfSample {
  return {
    ...data,
    sampleTime: data["sampleTime"] !== undefined ? serializeTimestamp(data["sampleTime"]) : undefined,
  };
}

function deserializePerfSample(data: any): PerfSample {
  return {
    ...data,
    sampleTime: data["sampleTime"] !== undefined ? deserializeTimestamp(data["sampleTime"]) : undefined,
  };
}

/**
 * Resource representing a collection of performance samples (or data points)
 */
export interface PerfSampleSeries {
  /**
   * Basic series represented by a line chart
   */
  basicPerfSampleSeries?: BasicPerfSampleSeries;
  /**
   * A tool results execution ID. @OutputOnly
   */
  executionId?: string;
  /**
   * A tool results history ID. @OutputOnly
   */
  historyId?: string;
  /**
   * The cloud project @OutputOnly
   */
  projectId?: string;
  /**
   * A sample series id @OutputOnly
   */
  sampleSeriesId?: string;
  /**
   * A tool results step ID. @OutputOnly
   */
  stepId?: string;
}

/**
 * Stores rollup test status of multiple steps that were run as a group and
 * outcome of each individual step.
 */
export interface PrimaryStep {
  /**
   * Step Id and outcome of each individual step.
   */
  individualOutcome?: IndividualOutcome[];
  /**
   * Rollup test status of multiple steps that were run with the same
   * configuration as a group.
   */
  rollUp?:  | "unset" | "success" | "failure" | "inconclusive" | "skipped" | "flaky";
}

function serializePrimaryStep(data: any): PrimaryStep {
  return {
    ...data,
    individualOutcome: data["individualOutcome"] !== undefined ? data["individualOutcome"].map((item: any) => (serializeIndividualOutcome(item))) : undefined,
  };
}

function deserializePrimaryStep(data: any): PrimaryStep {
  return {
    ...data,
    individualOutcome: data["individualOutcome"] !== undefined ? data["individualOutcome"].map((item: any) => (deserializeIndividualOutcome(item))) : undefined,
  };
}

/**
 * Per-project settings for the Tool Results service.
 */
export interface ProjectSettings {
  /**
   * The name of the Google Cloud Storage bucket to which results are written.
   * By default, this is unset. In update request: optional In response:
   * optional
   */
  defaultBucket?: string;
  /**
   * The name of the project's settings. Always of the form:
   * projects/{project-id}/settings In update request: never set In response:
   * always set
   */
  name?: string;
}

/**
 * Additional options for ToolResults#projectsHistoriesCreate.
 */
export interface ProjectsHistoriesCreateOptions {
  /**
   * A unique request ID for server to detect duplicated requests. For example,
   * a UUID. Optional, but strongly recommended.
   */
  requestId?: string;
}

/**
 * Additional options for ToolResults#projectsHistoriesExecutionsCreate.
 */
export interface ProjectsHistoriesExecutionsCreateOptions {
  /**
   * A unique request ID for server to detect duplicated requests. For example,
   * a UUID. Optional, but strongly recommended.
   */
  requestId?: string;
}

/**
 * Additional options for
 * ToolResults#projectsHistoriesExecutionsEnvironmentsList.
 */
export interface ProjectsHistoriesExecutionsEnvironmentsListOptions {
  /**
   * The maximum number of Environments to fetch. Default value: 25. The server
   * will use this default if the field is not set or has a value of 0.
   */
  pageSize?: number;
  /**
   * A continuation token to resume the query at the next item.
   */
  pageToken?: string;
}

/**
 * Additional options for ToolResults#projectsHistoriesExecutionsList.
 */
export interface ProjectsHistoriesExecutionsListOptions {
  /**
   * The maximum number of Executions to fetch. Default value: 25. The server
   * will use this default if the field is not set or has a value of 0.
   * Optional.
   */
  pageSize?: number;
  /**
   * A continuation token to resume the query at the next item. Optional.
   */
  pageToken?: string;
}

/**
 * Additional options for ToolResults#projectsHistoriesExecutionsPatch.
 */
export interface ProjectsHistoriesExecutionsPatchOptions {
  /**
   * A unique request ID for server to detect duplicated requests. For example,
   * a UUID. Optional, but strongly recommended.
   */
  requestId?: string;
}

/**
 * Additional options for
 * ToolResults#projectsHistoriesExecutionsStepsAccessibilityClusters.
 */
export interface ProjectsHistoriesExecutionsStepsAccessibilityClustersOptions {
  /**
   * The accepted format is the canonical Unicode format with hyphen as a
   * delimiter. Language must be lowercase, Language Script - Capitalized,
   * Region - UPPERCASE. See
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier for details.
   * Required.
   */
  locale?: string;
}

/**
 * Additional options for ToolResults#projectsHistoriesExecutionsStepsCreate.
 */
export interface ProjectsHistoriesExecutionsStepsCreateOptions {
  /**
   * A unique request ID for server to detect duplicated requests. For example,
   * a UUID. Optional, but strongly recommended.
   */
  requestId?: string;
}

/**
 * Additional options for ToolResults#projectsHistoriesExecutionsStepsList.
 */
export interface ProjectsHistoriesExecutionsStepsListOptions {
  /**
   * The maximum number of Steps to fetch. Default value: 25. The server will
   * use this default if the field is not set or has a value of 0. Optional.
   */
  pageSize?: number;
  /**
   * A continuation token to resume the query at the next item. Optional.
   */
  pageToken?: string;
}

/**
 * Additional options for ToolResults#projectsHistoriesExecutionsStepsPatch.
 */
export interface ProjectsHistoriesExecutionsStepsPatchOptions {
  /**
   * A unique request ID for server to detect duplicated requests. For example,
   * a UUID. Optional, but strongly recommended.
   */
  requestId?: string;
}

/**
 * Additional options for
 * ToolResults#projectsHistoriesExecutionsStepsPerfSampleSeriesList.
 */
export interface ProjectsHistoriesExecutionsStepsPerfSampleSeriesListOptions {
  /**
   * Specify one or more PerfMetricType values such as CPU to filter the result
   */
  filter?:  | "perfMetricTypeUnspecified" | "memory" | "cpu" | "network" | "graphics";
}

/**
 * Additional options for
 * ToolResults#projectsHistoriesExecutionsStepsPerfSampleSeriesSamplesList.
 */
export interface ProjectsHistoriesExecutionsStepsPerfSampleSeriesSamplesListOptions {
  /**
   * The default page size is 500 samples, and the maximum size is 5000. If the
   * page_size is greater than 5000, the effective page size will be 5000
   */
  pageSize?: number;
  /**
   * Optional, the next_page_token returned in the previous response
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ToolResults#projectsHistoriesExecutionsStepsTestCasesList.
 */
export interface ProjectsHistoriesExecutionsStepsTestCasesListOptions {
  /**
   * The maximum number of TestCases to fetch. Default value: 100. The server
   * will use this default if the field is not set or has a value of 0.
   * Optional.
   */
  pageSize?: number;
  /**
   * A continuation token to resume the query at the next item. Optional.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ToolResults#projectsHistoriesExecutionsStepsThumbnailsList.
 */
export interface ProjectsHistoriesExecutionsStepsThumbnailsListOptions {
  /**
   * The maximum number of thumbnails to fetch. Default value: 50. The server
   * will use this default if the field is not set or has a value of 0.
   * Optional.
   */
  pageSize?: number;
  /**
   * A continuation token to resume the query at the next item. Optional.
   */
  pageToken?: string;
}

/**
 * Additional options for ToolResults#projectsHistoriesList.
 */
export interface ProjectsHistoriesListOptions {
  /**
   * If set, only return histories with the given name. Optional.
   */
  filterByName?: string;
  /**
   * The maximum number of Histories to fetch. Default value: 20. The server
   * will use this default if the field is not set or has a value of 0. Any
   * value greater than 100 will be treated as 100. Optional.
   */
  pageSize?: number;
  /**
   * A continuation token to resume the query at the next item. Optional.
   */
  pageToken?: string;
}

/**
 * Request message for StepService.PublishXunitXmlFiles.
 */
export interface PublishXunitXmlFilesRequest {
  /**
   * URI of the Xunit XML files to publish. The maximum size of the file this
   * reference is pointing to is 50MB. Required.
   */
  xunitXmlFiles?: FileReference[];
}

/**
 * A rectangular region.
 */
export interface RegionProto {
  /**
   * The height, in pixels. Always set.
   */
  heightPx?: number;
  /**
   * The left side of the rectangle, in pixels. Always set.
   */
  leftPx?: number;
  /**
   * The top of the rectangle, in pixels. Always set.
   */
  topPx?: number;
  /**
   * The width, in pixels. Always set.
   */
  widthPx?: number;
}

/**
 * The storage for test results.
 */
export interface ResultsStorage {
  /**
   * The root directory for test results.
   */
  resultsStoragePath?: FileReference;
  /**
   * The path to the Xunit XML file.
   */
  xunitXmlFile?: FileReference;
}

/**
 * Execution stats for a user-provided Robo script.
 */
export interface RoboScriptExecution {
  /**
   * The number of Robo script actions executed successfully.
   */
  successfulActions?: number;
  /**
   * The total number of actions in the Robo script.
   */
  totalActions?: number;
}

/**
 * IMPORTANT: It is unsafe to accept this message from an untrusted source,
 * since it's trivial for an attacker to forge serialized messages that don't
 * fulfill the type's safety contract -- for example, it could contain attacker
 * controlled script. A system which receives a SafeHtmlProto implicitly trusts
 * the producer of the SafeHtmlProto. So, it's generally safe to return this
 * message in RPC responses, but generally unsafe to accept it in RPC requests.
 */
export interface SafeHtmlProto {
  /**
   * IMPORTANT: Never set or read this field, even from tests, it is private.
   * See documentation at the top of .proto file for programming language
   * packages with which to create or read this message.
   */
  privateDoNotAccessOrElseSafeHtmlWrappedValue?: string;
}

export interface Screen {
  /**
   * File reference of the png file. Required.
   */
  fileReference?: string;
  /**
   * Locale of the device that the screenshot was taken on. Required.
   */
  locale?: string;
  /**
   * Model of the device that the screenshot was taken on. Required.
   */
  model?: string;
  /**
   * OS version of the device that the screenshot was taken on. Required.
   */
  version?: string;
}

export interface ScreenshotCluster {
  /**
   * A string that describes the activity of every screen in the cluster.
   */
  activity?: string;
  /**
   * A unique identifier for the cluster. @OutputOnly
   */
  clusterId?: string;
  /**
   * A singular screen that represents the cluster as a whole. This screen will
   * act as the "cover" of the entire cluster. When users look at the clusters,
   * only the key screen from each cluster will be shown. Which screen is the
   * key screen is determined by the ClusteringAlgorithm
   */
  keyScreen?: Screen;
  /**
   * Full list of screens.
   */
  screens?: Screen[];
}

/**
 * Result summary for a shard in an environment.
 */
export interface ShardSummary {
  /**
   * Summaries of the steps belonging to the shard. With flaky_test_attempts
   * enabled from TestExecutionService, more than one run (Step) can present.
   * And the runs will be sorted by multistep_number.
   */
  runs?: StepSummary[];
  /**
   * Merged result of the shard.
   */
  shardResult?: MergedResult;
}

function serializeShardSummary(data: any): ShardSummary {
  return {
    ...data,
    shardResult: data["shardResult"] !== undefined ? serializeMergedResult(data["shardResult"]) : undefined,
  };
}

function deserializeShardSummary(data: any): ShardSummary {
  return {
    ...data,
    shardResult: data["shardResult"] !== undefined ? deserializeMergedResult(data["shardResult"]) : undefined,
  };
}

/**
 * Details for an outcome with a SKIPPED outcome summary.
 */
export interface SkippedDetail {
  /**
   * If the App doesn't support the specific API level.
   */
  incompatibleAppVersion?: boolean;
  /**
   * If the App doesn't run on the specific architecture, for example, x86.
   */
  incompatibleArchitecture?: boolean;
  /**
   * If the requested OS version doesn't run on the specific device model.
   */
  incompatibleDevice?: boolean;
}

/**
 * The details about how to run the execution.
 */
export interface Specification {
  /**
   * An Android mobile test execution specification.
   */
  androidTest?: AndroidTest;
  /**
   * An iOS mobile test execution specification.
   */
  iosTest?: IosTest;
}

function serializeSpecification(data: any): Specification {
  return {
    ...data,
    androidTest: data["androidTest"] !== undefined ? serializeAndroidTest(data["androidTest"]) : undefined,
    iosTest: data["iosTest"] !== undefined ? serializeIosTest(data["iosTest"]) : undefined,
  };
}

function deserializeSpecification(data: any): Specification {
  return {
    ...data,
    androidTest: data["androidTest"] !== undefined ? deserializeAndroidTest(data["androidTest"]) : undefined,
    iosTest: data["iosTest"] !== undefined ? deserializeIosTest(data["iosTest"]) : undefined,
  };
}

/**
 * A stacktrace.
 */
export interface StackTrace {
  /**
   * The stack trace message. Required
   */
  exception?: string;
}

/**
 * User provided intent failed to resolve to an activity.
 */
export interface StartActivityNotFound {
  action?: string;
  uri?: string;
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
 * A Step represents a single operation performed as part of Execution. A step
 * can be used to represent the execution of a tool ( for example a test runner
 * execution or an execution of a compiler). Steps can overlap (for instance two
 * steps might have the same start time if some operations are done in
 * parallel). Here is an example, let's consider that we have a continuous build
 * is executing a test runner for each iteration. The workflow would look like:
 * - user creates a Execution with id 1 - user creates an TestExecutionStep with
 * id 100 for Execution 1 - user update TestExecutionStep with id 100 to add a
 * raw xml log + the service parses the xml logs and returns a TestExecutionStep
 * with updated TestResult(s). - user update the status of TestExecutionStep
 * with id 100 to COMPLETE A Step can be updated until its state is set to
 * COMPLETE at which points it becomes immutable. Next tag: 27
 */
export interface Step {
  /**
   * The time when the step status was set to complete. This value will be set
   * automatically when state transitions to COMPLETE. - In response: set if the
   * execution state is COMPLETE. - In create/update request: never set
   */
  completionTime?: Timestamp;
  /**
   * The time when the step was created. - In response: always set - In
   * create/update request: never set
   */
  creationTime?: Timestamp;
  /**
   * A description of this tool For example: mvn clean package -D
   * skipTests=true - In response: present if set by create/update request - In
   * create/update request: optional
   */
  description?: string;
  /**
   * How much the device resource is used to perform the test. This is the
   * device usage used for billing purpose, which is different from the
   * run_duration, for example, infrastructure failure won't be charged for
   * device usage. PRECONDITION_FAILED will be returned if one attempts to set a
   * device_usage on a step which already has this field set. - In response:
   * present if previously set. - In create request: optional - In update
   * request: optional
   */
  deviceUsageDuration?: Duration;
  /**
   * If the execution containing this step has any dimension_definition set,
   * then this field allows the child to specify the values of the dimensions.
   * The keys must exactly match the dimension_definition of the execution. For
   * example, if the execution has `dimension_definition = ['attempt',
   * 'device']` then a step must define values for those dimensions, eg.
   * `dimension_value = ['attempt': '1', 'device': 'Nexus 6']` If a step does
   * not participate in one dimension of the matrix, the value for that
   * dimension should be empty string. For example, if one of the tests is
   * executed by a runner which does not support retries, the step could have
   * `dimension_value = ['attempt': '', 'device': 'Nexus 6']` If the step does
   * not participate in any dimensions of the matrix, it may leave
   * dimension_value unset. A PRECONDITION_FAILED will be returned if any of the
   * keys do not exist in the dimension_definition of the execution. A
   * PRECONDITION_FAILED will be returned if another step in this execution
   * already has the same name and dimension_value, but differs on other data
   * fields, for example, step field is different. A PRECONDITION_FAILED will be
   * returned if dimension_value is set, and there is a dimension_definition in
   * the execution which is not specified as one of the keys. - In response:
   * present if set by create - In create request: optional - In update request:
   * never set
   */
  dimensionValue?: StepDimensionValueEntry[];
  /**
   * Whether any of the outputs of this step are images whose thumbnails can be
   * fetched with ListThumbnails. - In response: always set - In create/update
   * request: never set
   */
  hasImages?: boolean;
  /**
   * Arbitrary user-supplied key/value pairs that are associated with the step.
   * Users are responsible for managing the key namespace such that keys don't
   * accidentally collide. An INVALID_ARGUMENT will be returned if the number of
   * labels exceeds 100 or if the length of any of the keys or values exceeds
   * 100 characters. - In response: always set - In create request: optional -
   * In update request: optional; any new key/value pair will be added to the
   * map, and any new value for an existing key will update that key's value
   */
  labels?: StepLabelsEntry[];
  /**
   * Details when multiple steps are run with the same configuration as a
   * group. These details can be used identify which group this step is part of.
   * It also identifies the groups 'primary step' which indexes all the group
   * members. - In response: present if previously set. - In create request:
   * optional, set iff this step was performed more than once. - In update
   * request: optional
   */
  multiStep?: MultiStep;
  /**
   * A short human-readable name to display in the UI. Maximum of 100
   * characters. For example: Clean build A PRECONDITION_FAILED will be returned
   * upon creating a new step if it shares its name and dimension_value with an
   * existing step. If two steps represent a similar action, but have different
   * dimension values, they should share the same name. For instance, if the
   * same set of tests is run on two different platforms, the two steps should
   * have the same name. - In response: always set - In create request: always
   * set - In update request: never set
   */
  name?: string;
  /**
   * Classification of the result, for example into SUCCESS or FAILURE - In
   * response: present if set by create/update request - In create/update
   * request: optional
   */
  outcome?: Outcome;
  /**
   * How long it took for this step to run. If unset, this is set to the
   * difference between creation_time and completion_time when the step is set
   * to the COMPLETE state. In some cases, it is appropriate to set this value
   * separately: For instance, if a step is created, but the operation it
   * represents is queued for a few minutes before it executes, it would be
   * appropriate not to include the time spent queued in its run_duration.
   * PRECONDITION_FAILED will be returned if one attempts to set a run_duration
   * on a step which already has this field set. - In response: present if
   * previously set; always present on COMPLETE step - In create request:
   * optional - In update request: optional
   */
  runDuration?: Duration;
  /**
   * The initial state is IN_PROGRESS. The only legal state transitions are *
   * IN_PROGRESS -> COMPLETE A PRECONDITION_FAILED will be returned if an
   * invalid transition is requested. It is valid to create Step with a state
   * set to COMPLETE. The state can only be set to COMPLETE once. A
   * PRECONDITION_FAILED will be returned if the state is set to COMPLETE
   * multiple times. - In response: always set - In create/update request:
   * optional
   */
  state?:  | "unknownState" | "pending" | "inProgress" | "complete";
  /**
   * A unique identifier within a Execution for this Step. Returns
   * INVALID_ARGUMENT if this field is set or overwritten by the caller. - In
   * response: always set - In create/update request: never set
   */
  stepId?: string;
  /**
   * An execution of a test runner.
   */
  testExecutionStep?: TestExecutionStep;
  /**
   * An execution of a tool (used for steps we don't explicitly support).
   */
  toolExecutionStep?: ToolExecutionStep;
}

function serializeStep(data: any): Step {
  return {
    ...data,
    completionTime: data["completionTime"] !== undefined ? serializeTimestamp(data["completionTime"]) : undefined,
    creationTime: data["creationTime"] !== undefined ? serializeTimestamp(data["creationTime"]) : undefined,
    deviceUsageDuration: data["deviceUsageDuration"] !== undefined ? serializeDuration(data["deviceUsageDuration"]) : undefined,
    multiStep: data["multiStep"] !== undefined ? serializeMultiStep(data["multiStep"]) : undefined,
    runDuration: data["runDuration"] !== undefined ? serializeDuration(data["runDuration"]) : undefined,
    testExecutionStep: data["testExecutionStep"] !== undefined ? serializeTestExecutionStep(data["testExecutionStep"]) : undefined,
    toolExecutionStep: data["toolExecutionStep"] !== undefined ? serializeToolExecutionStep(data["toolExecutionStep"]) : undefined,
  };
}

function deserializeStep(data: any): Step {
  return {
    ...data,
    completionTime: data["completionTime"] !== undefined ? deserializeTimestamp(data["completionTime"]) : undefined,
    creationTime: data["creationTime"] !== undefined ? deserializeTimestamp(data["creationTime"]) : undefined,
    deviceUsageDuration: data["deviceUsageDuration"] !== undefined ? deserializeDuration(data["deviceUsageDuration"]) : undefined,
    multiStep: data["multiStep"] !== undefined ? deserializeMultiStep(data["multiStep"]) : undefined,
    runDuration: data["runDuration"] !== undefined ? deserializeDuration(data["runDuration"]) : undefined,
    testExecutionStep: data["testExecutionStep"] !== undefined ? deserializeTestExecutionStep(data["testExecutionStep"]) : undefined,
    toolExecutionStep: data["toolExecutionStep"] !== undefined ? deserializeToolExecutionStep(data["toolExecutionStep"]) : undefined,
  };
}

export interface StepDimensionValueEntry {
  key?: string;
  value?: string;
}

export interface StepLabelsEntry {
  key?: string;
  value?: string;
}

/**
 * Lightweight summary of a step within this execution.
 */
export interface StepSummary {
}

/**
 * Details for an outcome with a SUCCESS outcome summary. LINT.IfChange
 */
export interface SuccessDetail {
  /**
   * If a native process other than the app crashed.
   */
  otherNativeCrash?: boolean;
}

/**
 * A set of similar suggestions that we suspect are closely related. This proto
 * and most of the nested protos are branched from
 * foxandcrown.prelaunchreport.service.SuggestionClusterProto, replacing PLR's
 * dependencies with FTL's.
 */
export interface SuggestionClusterProto {
  /**
   * Category in which these types of suggestions should appear. Always set.
   */
  category?:  | "unknownCategory" | "contentLabeling" | "touchTargetSize" | "lowContrast" | "implementation";
  /**
   * A sequence of suggestions. All of the suggestions within a cluster must
   * have the same SuggestionPriority and belong to the same SuggestionCategory.
   * Suggestions with the same screenshot URL should be adjacent.
   */
  suggestions?: SuggestionProto[];
}

export interface SuggestionProto {
  /**
   * Reference to a help center article concerning this type of suggestion.
   * Always set.
   */
  helpUrl?: string;
  /**
   * Message, in the user's language, explaining the suggestion, which may
   * contain markup. Always set.
   */
  longMessage?: SafeHtmlProto;
  /**
   * Relative importance of a suggestion. Always set.
   */
  priority?:  | "unknownPriority" | "error" | "warning" | "info";
  /**
   * A somewhat human readable identifier of the source view, if it does not
   * have a resource_name. This is a path within the accessibility hierarchy, an
   * element with resource name; similar to an XPath.
   */
  pseudoResourceId?: string;
  /**
   * Region within the screenshot that is relevant to this suggestion.
   * Optional.
   */
  region?: RegionProto;
  /**
   * Reference to a view element, identified by its resource name, if it has
   * one.
   */
  resourceName?: string;
  /**
   * ID of the screen for the suggestion. It is used for getting the
   * corresponding screenshot path. For example, screen_id "1" corresponds to
   * "1.png" file in GCS. Always set.
   */
  screenId?: string;
  /**
   * Relative importance of a suggestion as compared with other suggestions
   * that have the same priority and category. This is a meaningless value that
   * can be used to order suggestions that are in the same category and have the
   * same priority. The larger values have higher priority (i.e., are more
   * important). Optional.
   */
  secondaryPriority?: number;
  /**
   * Concise message, in the user's language, representing the suggestion,
   * which may contain markup. Always set.
   */
  shortMessage?: SafeHtmlProto;
  /**
   * General title for the suggestion, in the user's language, without markup.
   * Always set.
   */
  title?: string;
}

export interface TestCase {
  /**
   * The elapsed run time of the test case. Required.
   */
  elapsedTime?: Duration;
  /**
   * The end time of the test case.
   */
  endTime?: Timestamp;
  /**
   * Why the test case was skipped. Present only for skipped test case
   */
  skippedMessage?: string;
  /**
   * The stack trace details if the test case failed or encountered an error.
   * The maximum size of the stack traces is 100KiB, beyond which the stack
   * track will be truncated. Zero if the test case passed.
   */
  stackTraces?: StackTrace[];
  /**
   * The start time of the test case.
   */
  startTime?: Timestamp;
  /**
   * The status of the test case. Required.
   */
  status?:  | "passed" | "failed" | "error" | "skipped" | "flaky";
  /**
   * A unique identifier within a Step for this Test Case.
   */
  testCaseId?: string;
  /**
   * Test case reference, e.g. name, class name and test suite name. Required.
   */
  testCaseReference?: TestCaseReference;
  /**
   * References to opaque files of any format output by the tool execution.
   * @OutputOnly
   */
  toolOutputs?: ToolOutputReference[];
}

function serializeTestCase(data: any): TestCase {
  return {
    ...data,
    elapsedTime: data["elapsedTime"] !== undefined ? serializeDuration(data["elapsedTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? serializeTimestamp(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? serializeTimestamp(data["startTime"]) : undefined,
    toolOutputs: data["toolOutputs"] !== undefined ? data["toolOutputs"].map((item: any) => (serializeToolOutputReference(item))) : undefined,
  };
}

function deserializeTestCase(data: any): TestCase {
  return {
    ...data,
    elapsedTime: data["elapsedTime"] !== undefined ? deserializeDuration(data["elapsedTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? deserializeTimestamp(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? deserializeTimestamp(data["startTime"]) : undefined,
    toolOutputs: data["toolOutputs"] !== undefined ? data["toolOutputs"].map((item: any) => (deserializeToolOutputReference(item))) : undefined,
  };
}

/**
 * A reference to a test case. Test case references are canonically ordered
 * lexicographically by these three factors: * First, by test_suite_name. *
 * Second, by class_name. * Third, by name.
 */
export interface TestCaseReference {
  /**
   * The name of the class.
   */
  className?: string;
  /**
   * The name of the test case. Required.
   */
  name?: string;
  /**
   * The name of the test suite to which this test case belongs.
   */
  testSuiteName?: string;
}

/**
 * A step that represents running tests. It accepts ant-junit xml files which
 * will be parsed into structured test results by the service. Xml file paths
 * are updated in order to append more files, however they can't be deleted.
 * Users can also add test results manually by using the test_result field.
 */
export interface TestExecutionStep {
  /**
   * Issues observed during the test execution. For example, if the mobile app
   * under test crashed during the test, the error message and the stack trace
   * content can be recorded here to assist debugging. - In response: present if
   * set by create or update - In create/update request: optional
   */
  testIssues?: TestIssue[];
  /**
   * List of test suite overview contents. This could be parsed from xUnit XML
   * log by server, or uploaded directly by user. This references should only be
   * called when test suites are fully parsed or uploaded. The maximum allowed
   * number of test suite overviews per step is 1000. - In response: always set
   * - In create request: optional - In update request: never (use
   * publishXunitXmlFiles custom method instead)
   */
  testSuiteOverviews?: TestSuiteOverview[];
  /**
   * The timing break down of the test execution. - In response: present if set
   * by create or update - In create/update request: optional
   */
  testTiming?: TestTiming;
  /**
   * Represents the execution of the test runner. The exit code of this tool
   * will be used to determine if the test passed. - In response: always set -
   * In create/update request: optional
   */
  toolExecution?: ToolExecution;
}

function serializeTestExecutionStep(data: any): TestExecutionStep {
  return {
    ...data,
    testIssues: data["testIssues"] !== undefined ? data["testIssues"].map((item: any) => (serializeTestIssue(item))) : undefined,
    testSuiteOverviews: data["testSuiteOverviews"] !== undefined ? data["testSuiteOverviews"].map((item: any) => (serializeTestSuiteOverview(item))) : undefined,
    testTiming: data["testTiming"] !== undefined ? serializeTestTiming(data["testTiming"]) : undefined,
    toolExecution: data["toolExecution"] !== undefined ? serializeToolExecution(data["toolExecution"]) : undefined,
  };
}

function deserializeTestExecutionStep(data: any): TestExecutionStep {
  return {
    ...data,
    testIssues: data["testIssues"] !== undefined ? data["testIssues"].map((item: any) => (deserializeTestIssue(item))) : undefined,
    testSuiteOverviews: data["testSuiteOverviews"] !== undefined ? data["testSuiteOverviews"].map((item: any) => (deserializeTestSuiteOverview(item))) : undefined,
    testTiming: data["testTiming"] !== undefined ? deserializeTestTiming(data["testTiming"]) : undefined,
    toolExecution: data["toolExecution"] !== undefined ? deserializeToolExecution(data["toolExecution"]) : undefined,
  };
}

/**
 * An issue detected occurring during a test execution.
 */
export interface TestIssue {
  /**
   * Category of issue. Required.
   */
  category?:  | "unspecifiedCategory" | "common" | "robo";
  /**
   * A brief human-readable message describing the issue. Required.
   */
  errorMessage?: string;
  /**
   * Severity of issue. Required.
   */
  severity?:  | "unspecifiedSeverity" | "info" | "suggestion" | "warning" | "severe";
  /**
   * Deprecated in favor of stack trace fields inside specific warnings.
   */
  stackTrace?: StackTrace;
  /**
   * Type of issue. Required.
   */
  type?:  | "unspecifiedType" | "fatalException" | "nativeCrash" | "anr" | "unusedRoboDirective" | "compatibleWithOrchestrator" | "launcherActivityNotFound" | "startActivityNotFound" | "incompleteRoboScriptExecution" | "completeRoboScriptExecution" | "failedToInstall" | "availableDeepLinks" | "nonSdkApiUsageViolation" | "nonSdkApiUsageReport" | "encounteredNonAndroidUiWidgetScreen" | "encounteredLoginScreen" | "performedGoogleLogin" | "iosException" | "iosCrash" | "performedMonkeyActions" | "usedRoboDirective" | "usedRoboIgnoreDirective" | "insufficientCoverage" | "inAppPurchases" | "crashDialogError" | "uiElementsTooDeep" | "blankScreen" | "overlappingUiElements" | "unityException" | "deviceOutOfMemory" | "logcatCollectionError" | "detectedAppSplashScreen";
  /**
   * Warning message with additional details of the issue. Should always be a
   * message from com.google.devtools.toolresults.v1.warnings
   */
  warning?: Any;
}

function serializeTestIssue(data: any): TestIssue {
  return {
    ...data,
    warning: data["warning"] !== undefined ? serializeAny(data["warning"]) : undefined,
  };
}

function deserializeTestIssue(data: any): TestIssue {
  return {
    ...data,
    warning: data["warning"] !== undefined ? deserializeAny(data["warning"]) : undefined,
  };
}

/**
 * A summary of a test suite result either parsed from XML or uploaded directly
 * by a user. Note: the API related comments are for StepService only. This
 * message is also being used in ExecutionService in a read only mode for the
 * corresponding step.
 */
export interface TestSuiteOverview {
  /**
   * Elapsed time of test suite.
   */
  elapsedTime?: Duration;
  /**
   * Number of test cases in error, typically set by the service by parsing the
   * xml_source. - In create/response: always set - In update request: never
   */
  errorCount?: number;
  /**
   * Number of failed test cases, typically set by the service by parsing the
   * xml_source. May also be set by the user. - In create/response: always set -
   * In update request: never
   */
  failureCount?: number;
  /**
   * Number of flaky test cases, set by the service by rolling up flaky test
   * attempts. Present only for rollup test suite overview at environment level.
   * A step cannot have flaky test cases.
   */
  flakyCount?: number;
  /**
   * The name of the test suite. - In create/response: always set - In update
   * request: never
   */
  name?: string;
  /**
   * Number of test cases not run, typically set by the service by parsing the
   * xml_source. - In create/response: always set - In update request: never
   */
  skippedCount?: number;
  /**
   * Number of test cases, typically set by the service by parsing the
   * xml_source. - In create/response: always set - In update request: never
   */
  totalCount?: number;
  /**
   * If this test suite was parsed from XML, this is the URI where the original
   * XML file is stored. Note: Multiple test suites can share the same
   * xml_source Returns INVALID_ARGUMENT if the uri format is not supported. -
   * In create/response: optional - In update request: never
   */
  xmlSource?: FileReference;
}

function serializeTestSuiteOverview(data: any): TestSuiteOverview {
  return {
    ...data,
    elapsedTime: data["elapsedTime"] !== undefined ? serializeDuration(data["elapsedTime"]) : undefined,
  };
}

function deserializeTestSuiteOverview(data: any): TestSuiteOverview {
  return {
    ...data,
    elapsedTime: data["elapsedTime"] !== undefined ? deserializeDuration(data["elapsedTime"]) : undefined,
  };
}

/**
 * Testing timing break down to know phases.
 */
export interface TestTiming {
  /**
   * How long it took to run the test process. - In response: present if
   * previously set. - In create/update request: optional
   */
  testProcessDuration?: Duration;
}

function serializeTestTiming(data: any): TestTiming {
  return {
    ...data,
    testProcessDuration: data["testProcessDuration"] !== undefined ? serializeDuration(data["testProcessDuration"]) : undefined,
  };
}

function deserializeTestTiming(data: any): TestTiming {
  return {
    ...data,
    testProcessDuration: data["testProcessDuration"] !== undefined ? deserializeDuration(data["testProcessDuration"]) : undefined,
  };
}

/**
 * A single thumbnail, with its size and format.
 */
export interface Thumbnail {
  /**
   * The thumbnail's content type, i.e. "image/png". Always set.
   */
  contentType?: string;
  /**
   * The thumbnail file itself. That is, the bytes here are precisely the bytes
   * that make up the thumbnail file; they can be served as an image as-is (with
   * the appropriate content type.) Always set.
   */
  data?: Uint8Array;
  /**
   * The height of the thumbnail, in pixels. Always set.
   */
  heightPx?: number;
  /**
   * The width of the thumbnail, in pixels. Always set.
   */
  widthPx?: number;
}

function serializeThumbnail(data: any): Thumbnail {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializeThumbnail(data: any): Thumbnail {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

/**
 * A Timestamp represents a point in time independent of any time zone or local
 * calendar, encoded as a count of seconds and fractions of seconds at
 * nanosecond resolution. The count is relative to an epoch at UTC midnight on
 * January 1, 1970, in the proleptic Gregorian calendar which extends the
 * Gregorian calendar backwards to year one. All minutes are 60 seconds long.
 * Leap seconds are "smeared" so that no leap second table is needed for
 * interpretation, using a [24-hour linear
 * smear](https://developers.google.com/time/smear). The range is from
 * 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By restricting to
 * that range, we ensure that we can convert to and from [RFC
 * 3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.
 */
export interface Timestamp {
  /**
   * Non-negative fractions of a second at nanosecond resolution. Negative
   * second values with fractions must still have non-negative nanos values that
   * count forward in time. Must be from 0 to 999,999,999 inclusive.
   */
  nanos?: number;
  /**
   * Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must
   * be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.
   */
  seconds?: bigint;
}

function serializeTimestamp(data: any): Timestamp {
  return {
    ...data,
    seconds: data["seconds"] !== undefined ? String(data["seconds"]) : undefined,
  };
}

function deserializeTimestamp(data: any): Timestamp {
  return {
    ...data,
    seconds: data["seconds"] !== undefined ? BigInt(data["seconds"]) : undefined,
  };
}

/**
 * An execution of an arbitrary tool. It could be a test runner or a tool
 * copying artifacts or deploying code.
 */
export interface ToolExecution {
  /**
   * The full tokenized command line including the program name (equivalent to
   * argv in a C program). - In response: present if set by create request - In
   * create request: optional - In update request: never set
   */
  commandLineArguments?: string[];
  /**
   * Tool execution exit code. This field will be set once the tool has exited.
   * - In response: present if set by create/update request - In create request:
   * optional - In update request: optional, a FAILED_PRECONDITION error will be
   * returned if an exit_code is already set.
   */
  exitCode?: ToolExitCode;
  /**
   * References to any plain text logs output the tool execution. This field
   * can be set before the tool has exited in order to be able to have access to
   * a live view of the logs while the tool is running. The maximum allowed
   * number of tool logs per step is 1000. - In response: present if set by
   * create/update request - In create request: optional - In update request:
   * optional, any value provided will be appended to the existing list
   */
  toolLogs?: FileReference[];
  /**
   * References to opaque files of any format output by the tool execution. The
   * maximum allowed number of tool outputs per step is 1000. - In response:
   * present if set by create/update request - In create request: optional - In
   * update request: optional, any value provided will be appended to the
   * existing list
   */
  toolOutputs?: ToolOutputReference[];
}

function serializeToolExecution(data: any): ToolExecution {
  return {
    ...data,
    toolOutputs: data["toolOutputs"] !== undefined ? data["toolOutputs"].map((item: any) => (serializeToolOutputReference(item))) : undefined,
  };
}

function deserializeToolExecution(data: any): ToolExecution {
  return {
    ...data,
    toolOutputs: data["toolOutputs"] !== undefined ? data["toolOutputs"].map((item: any) => (deserializeToolOutputReference(item))) : undefined,
  };
}

/**
 * Generic tool step to be used for binaries we do not explicitly support. For
 * example: running cp to copy artifacts from one location to another.
 */
export interface ToolExecutionStep {
  /**
   * A Tool execution. - In response: present if set by create/update request -
   * In create/update request: optional
   */
  toolExecution?: ToolExecution;
}

function serializeToolExecutionStep(data: any): ToolExecutionStep {
  return {
    ...data,
    toolExecution: data["toolExecution"] !== undefined ? serializeToolExecution(data["toolExecution"]) : undefined,
  };
}

function deserializeToolExecutionStep(data: any): ToolExecutionStep {
  return {
    ...data,
    toolExecution: data["toolExecution"] !== undefined ? deserializeToolExecution(data["toolExecution"]) : undefined,
  };
}

/**
 * Exit code from a tool execution.
 */
export interface ToolExitCode {
  /**
   * Tool execution exit code. A value of 0 means that the execution was
   * successful. - In response: always set - In create/update request: always
   * set
   */
  number?: number;
}

/**
 * A reference to a ToolExecution output file.
 */
export interface ToolOutputReference {
  /**
   * The creation time of the file. - In response: present if set by
   * create/update request - In create/update request: optional
   */
  creationTime?: Timestamp;
  /**
   * A FileReference to an output file. - In response: always set - In
   * create/update request: always set
   */
  output?: FileReference;
  /**
   * The test case to which this output file belongs. - In response: present if
   * set by create/update request - In create/update request: optional
   */
  testCase?: TestCaseReference;
}

function serializeToolOutputReference(data: any): ToolOutputReference {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? serializeTimestamp(data["creationTime"]) : undefined,
  };
}

function deserializeToolOutputReference(data: any): ToolOutputReference {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? deserializeTimestamp(data["creationTime"]) : undefined,
  };
}

/**
 * A warning that the screen hierarchy is deeper than the recommended
 * threshold.
 */
export interface UIElementTooDeep {
  /**
   * The depth of the screen element
   */
  depth?: number;
  /**
   * The screen id of the element
   */
  screenId?: string;
  /**
   * The screen state id of the element
   */
  screenStateId?: string;
}

/**
 * Default unspecified warning.
 */
export interface UnspecifiedWarning {
}

/**
 * Additional details of an unused robodirective.
 */
export interface UnusedRoboDirective {
  /**
   * The name of the resource that was unused.
   */
  resourceName?: string;
}

/**
 * This insight is a recommendation to upgrade a given library to the specified
 * version, in order to avoid dependencies on non-SDK APIs.
 */
export interface UpgradeInsight {
  /**
   * The name of the package to be upgraded.
   */
  packageName?: string;
  /**
   * The suggested version to upgrade to. Optional: In case we are not sure
   * which version solves this problem
   */
  upgradeToVersion?: string;
}

/**
 * Additional details of a used Robo directive.
 */
export interface UsedRoboDirective {
  /**
   * The name of the resource that was used.
   */
  resourceName?: string;
}

/**
 * Additional details of a used Robo directive with an ignore action. Note:
 * This is a different scenario than unused directive.
 */
export interface UsedRoboIgnoreDirective {
  /**
   * The name of the resource that was ignored.
   */
  resourceName?: string;
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
