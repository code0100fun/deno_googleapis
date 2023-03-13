// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Data pipelines API Client for Deno
 * ==================================
 * 
 * Data Pipelines provides an interface for creating, updating, and managing recurring Data Analytics jobs.
 * 
 * Docs: https://cloud.google.com/dataflow/docs/guides/data-pipelines
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Data Pipelines provides an interface for creating, updating, and managing
 * recurring Data Analytics jobs.
 */
export class Datapipelines {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://datapipelines.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a pipeline. For a batch pipeline, you can pass scheduler
   * information. Data Pipelines uses the scheduler information to create an
   * internal scheduler that runs jobs periodically. If the internal scheduler
   * is not configured, you can use RunPipeline to run jobs.
   *
   * @param parent Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID`.
   */
  async projectsLocationsPipelinesCreate(parent: string, req: GoogleCloudDatapipelinesV1Pipeline): Promise<GoogleCloudDatapipelinesV1Pipeline> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/pipelines`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatapipelinesV1Pipeline;
  }

  /**
   * Deletes a pipeline. If a scheduler job is attached to the pipeline, it
   * will be deleted.
   *
   * @param name Required. The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`.
   */
  async projectsLocationsPipelinesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Looks up a single pipeline. Returns a "NOT_FOUND" error if no such
   * pipeline exists. Returns a "FORBIDDEN" error if the caller doesn't have
   * permission to access it.
   *
   * @param name Required. The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`.
   */
  async projectsLocationsPipelinesGet(name: string): Promise<GoogleCloudDatapipelinesV1Pipeline> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDatapipelinesV1Pipeline;
  }

  /**
   * Lists jobs for a given pipeline. Throws a "FORBIDDEN" error if the caller
   * doesn't have permission to access it.
   *
   * @param parent Required. The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`.
   */
  async projectsLocationsPipelinesJobsList(parent: string, opts: ProjectsLocationsPipelinesJobsListOptions = {}): Promise<GoogleCloudDatapipelinesV1ListJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/jobs`);
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
    return data as GoogleCloudDatapipelinesV1ListJobsResponse;
  }

  /**
   * Lists pipelines. Returns a "FORBIDDEN" error if the caller doesn't have
   * permission to access it.
   *
   * @param parent Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID`.
   */
  async projectsLocationsPipelinesList(parent: string, opts: ProjectsLocationsPipelinesListOptions = {}): Promise<GoogleCloudDatapipelinesV1ListPipelinesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/pipelines`);
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
    return data as GoogleCloudDatapipelinesV1ListPipelinesResponse;
  }

  /**
   * Updates a pipeline. If successful, the updated Pipeline is returned.
   * Returns `NOT_FOUND` if the pipeline doesn't exist. If UpdatePipeline does
   * not return successfully, you can retry the UpdatePipeline request until you
   * receive a successful response.
   *
   * @param name The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`. * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]), hyphens (-), colons (:), and periods (.). For more information, see [Identifying projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects). * `LOCATION_ID` is the canonical ID for the pipeline's location. The list of available locations can be obtained by calling `google.cloud.location.Locations.ListLocations`. Note that the Data Pipelines service is not available in all regions. It depends on Cloud Scheduler, an App Engine application, so it's only available in [App Engine regions](https://cloud.google.com/about/locations#region). * `PIPELINE_ID` is the ID of the pipeline. Must be unique for the selected project and location.
   */
  async projectsLocationsPipelinesPatch(name: string, req: GoogleCloudDatapipelinesV1Pipeline, opts: ProjectsLocationsPipelinesPatchOptions = {}): Promise<GoogleCloudDatapipelinesV1Pipeline> {
    opts = serializeProjectsLocationsPipelinesPatchOptions(opts);
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
    return data as GoogleCloudDatapipelinesV1Pipeline;
  }

  /**
   * Creates a job for the specified pipeline directly. You can use this method
   * when the internal scheduler is not configured and you want to trigger the
   * job directly or through an external system. Returns a "NOT_FOUND" error if
   * the pipeline doesn't exist. Returns a "FORBIDDEN" error if the user doesn't
   * have permission to access the pipeline or run jobs for the pipeline.
   *
   * @param name Required. The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`.
   */
  async projectsLocationsPipelinesRun(name: string, req: GoogleCloudDatapipelinesV1RunPipelineRequest): Promise<GoogleCloudDatapipelinesV1RunPipelineResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:run`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatapipelinesV1RunPipelineResponse;
  }

  /**
   * Freezes pipeline execution permanently. If there's a corresponding
   * scheduler entry, it's deleted, and the pipeline state is changed to
   * "ARCHIVED". However, pipeline metadata is retained.
   *
   * @param name Required. The pipeline name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`.
   */
  async projectsLocationsPipelinesStop(name: string, req: GoogleCloudDatapipelinesV1StopPipelineRequest): Promise<GoogleCloudDatapipelinesV1Pipeline> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:stop`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatapipelinesV1Pipeline;
  }
}

/**
 * Pipeline job details specific to the Dataflow API. This is encapsulated here
 * to allow for more executors to store their specific details separately.
 */
export interface GoogleCloudDatapipelinesV1DataflowJobDetails {
  /**
   * Output only. The current number of workers used to run the jobs. Only set
   * to a value if the job is still running.
   */
  readonly currentWorkers?: number;
  /**
   * Cached version of all the metrics of interest for the job. This value gets
   * stored here when the job is terminated. As long as the job is running, this
   * field is populated from the Dataflow API.
   */
  resourceInfo?: {
    [key: string]: number
  };
  /**
   * Output only. The SDK version used to run the job.
   */
  readonly sdkVersion?: GoogleCloudDatapipelinesV1SdkVersion;
}

/**
 * The environment values to be set at runtime for a Flex Template.
 */
export interface GoogleCloudDatapipelinesV1FlexTemplateRuntimeEnvironment {
  /**
   * Additional experiment flags for the job.
   */
  additionalExperiments?: string[];
  /**
   * Additional user labels to be specified for the job. Keys and values must
   * follow the restrictions specified in the [labeling
   * restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions).
   * An object containing a list of key/value pairs. Example: `{ "name":
   * "wrench", "mass": "1kg", "count": "3" }`.
   */
  additionalUserLabels?: {
    [key: string]: string
  };
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
   * The machine type to use for the job. Defaults to the value from the
   * template if not specified.
   */
  machineType?: string;
  /**
   * The maximum number of Compute Engine instances to be made available to
   * your pipeline during execution, from 1 to 1000.
   */
  maxWorkers?: number;
  /**
   * Network to which VMs will be assigned. If empty or unspecified, the
   * service will use the network "default".
   */
  network?: string;
  /**
   * The initial number of Compute Engine instances for the job.
   */
  numWorkers?: number;
  /**
   * The email address of the service account to run the job as.
   */
  serviceAccountEmail?: string;
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
   * defaults to the control plane region.
   */
  workerRegion?: string;
  /**
   * The Compute Engine zone
   * (https://cloud.google.com/compute/docs/regions-zones/regions-zones) in
   * which worker processing should occur, e.g. "us-west1-a". Mutually exclusive
   * with worker_region. If neither worker_region nor worker_zone is specified,
   * a zone in the control plane region is chosen based on available capacity.
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
 * Definition of the job information maintained by the pipeline. Fields in this
 * entity are retrieved from the executor API (e.g. Dataflow API).
 */
export interface GoogleCloudDatapipelinesV1Job {
  /**
   * Output only. The time of job creation.
   */
  readonly createTime?: Date;
  /**
   * All the details that are specific to a Dataflow job.
   */
  dataflowJobDetails?: GoogleCloudDatapipelinesV1DataflowJobDetails;
  /**
   * Output only. The time of job termination. This is absent if the job is
   * still running.
   */
  readonly endTime?: Date;
  /**
   * Output only. The internal ID for the job.
   */
  readonly id?: string;
  /**
   * Required. The fully qualified resource name for the job.
   */
  name?: string;
  /**
   * The current state of the job.
   */
  state?:  | "STATE_UNSPECIFIED" | "STATE_PENDING" | "STATE_RUNNING" | "STATE_DONE" | "STATE_FAILED" | "STATE_CANCELLED";
  /**
   * Status capturing any error code or message related to job creation or
   * execution.
   */
  status?: GoogleRpcStatus;
}

/**
 * Launch Flex Template parameter.
 */
export interface GoogleCloudDatapipelinesV1LaunchFlexTemplateParameter {
  /**
   * Cloud Storage path to a file with a JSON-serialized ContainerSpec as
   * content.
   */
  containerSpecGcsPath?: string;
  /**
   * The runtime environment for the Flex Template job.
   */
  environment?: GoogleCloudDatapipelinesV1FlexTemplateRuntimeEnvironment;
  /**
   * Required. The job name to use for the created job. For an update job
   * request, the job name should be the same as the existing running job.
   */
  jobName?: string;
  /**
   * Launch options for this Flex Template job. This is a common set of options
   * across languages and templates. This should not be used to pass job
   * parameters.
   */
  launchOptions?: {
    [key: string]: string
  };
  /**
   * The parameters for the Flex Template. Example: `{"num_workers":"5"}`
   */
  parameters?: {
    [key: string]: string
  };
  /**
   * Use this to pass transform name mappings for streaming update jobs.
   * Example: `{"oldTransformName":"newTransformName",...}`
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
 * A request to launch a Dataflow job from a Flex Template.
 */
export interface GoogleCloudDatapipelinesV1LaunchFlexTemplateRequest {
  /**
   * Required. Parameter to launch a job from a Flex Template.
   */
  launchParameter?: GoogleCloudDatapipelinesV1LaunchFlexTemplateParameter;
  /**
   * Required. The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to
   * which to direct the request. For example, `us-central1`, `us-west1`.
   */
  location?: string;
  /**
   * Required. The ID of the Cloud Platform project that the job belongs to.
   */
  projectId?: string;
  /**
   * If true, the request is validated but not actually executed. Defaults to
   * false.
   */
  validateOnly?: boolean;
}

/**
 * Parameters to provide to the template being launched.
 */
export interface GoogleCloudDatapipelinesV1LaunchTemplateParameters {
  /**
   * The runtime environment for the job.
   */
  environment?: GoogleCloudDatapipelinesV1RuntimeEnvironment;
  /**
   * Required. The job name to use for the created job.
   */
  jobName?: string;
  /**
   * The runtime parameters to pass to the job.
   */
  parameters?: {
    [key: string]: string
  };
  /**
   * Map of transform name prefixes of the job to be replaced to the
   * corresponding name prefixes of the new job. Only applicable when updating a
   * pipeline.
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
 * A request to launch a template.
 */
export interface GoogleCloudDatapipelinesV1LaunchTemplateRequest {
  /**
   * A Cloud Storage path to the template from which to create the job. Must be
   * a valid Cloud Storage URL, beginning with 'gs://'.
   */
  gcsPath?: string;
  /**
   * The parameters of the template to launch. This should be part of the body
   * of the POST request.
   */
  launchParameters?: GoogleCloudDatapipelinesV1LaunchTemplateParameters;
  /**
   * The [regional endpoint]
   * (https://cloud.google.com/dataflow/docs/concepts/regional-endpoints) to
   * which to direct the request.
   */
  location?: string;
  /**
   * Required. The ID of the Cloud Platform project that the job belongs to.
   */
  projectId?: string;
  /**
   * If true, the request is validated but not actually executed. Defaults to
   * false.
   */
  validateOnly?: boolean;
}

/**
 * Response message for ListJobs
 */
export interface GoogleCloudDatapipelinesV1ListJobsResponse {
  /**
   * Results that were accessible to the caller. Results are always in
   * descending order of job creation date.
   */
  jobs?: GoogleCloudDatapipelinesV1Job[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListPipelines.
 */
export interface GoogleCloudDatapipelinesV1ListPipelinesResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Results that matched the filter criteria and were accessible to the
   * caller. Results are always in descending order of pipeline creation date.
   */
  pipelines?: GoogleCloudDatapipelinesV1Pipeline[];
}

/**
 * The main pipeline entity and all the necessary metadata for launching and
 * managing linked jobs.
 */
export interface GoogleCloudDatapipelinesV1Pipeline {
  /**
   * Output only. Immutable. The timestamp when the pipeline was initially
   * created. Set by the Data Pipelines service.
   */
  readonly createTime?: Date;
  /**
   * Required. The display name of the pipeline. It can contain only letters
   * ([A-Za-z]), numbers ([0-9]), hyphens (-), and underscores (_).
   */
  displayName?: string;
  /**
   * Output only. Number of jobs.
   */
  readonly jobCount?: number;
  /**
   * Output only. Immutable. The timestamp when the pipeline was last modified.
   * Set by the Data Pipelines service.
   */
  readonly lastUpdateTime?: Date;
  /**
   * The pipeline name. For example:
   * `projects/PROJECT_ID/locations/LOCATION_ID/pipelines/PIPELINE_ID`. *
   * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]), hyphens (-),
   * colons (:), and periods (.). For more information, see [Identifying
   * projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
   * * `LOCATION_ID` is the canonical ID for the pipeline's location. The list
   * of available locations can be obtained by calling
   * `google.cloud.location.Locations.ListLocations`. Note that the Data
   * Pipelines service is not available in all regions. It depends on Cloud
   * Scheduler, an App Engine application, so it's only available in [App Engine
   * regions](https://cloud.google.com/about/locations#region). * `PIPELINE_ID`
   * is the ID of the pipeline. Must be unique for the selected project and
   * location.
   */
  name?: string;
  /**
   * Immutable. The sources of the pipeline (for example, Dataplex). The keys
   * and values are set by the corresponding sources during pipeline creation.
   */
  pipelineSources?: {
    [key: string]: string
  };
  /**
   * Internal scheduling information for a pipeline. If this information is
   * provided, periodic jobs will be created per the schedule. If not, users are
   * responsible for creating jobs externally.
   */
  scheduleInfo?: GoogleCloudDatapipelinesV1ScheduleSpec;
  /**
   * Optional. A service account email to be used with the Cloud Scheduler job.
   * If not specified, the default compute engine service account will be used.
   */
  schedulerServiceAccountEmail?: string;
  /**
   * Required. The state of the pipeline. When the pipeline is created, the
   * state is set to 'PIPELINE_STATE_ACTIVE' by default. State changes can be
   * requested by setting the state to stopping, paused, or resuming. State
   * cannot be changed through UpdatePipeline requests.
   */
  state?:  | "STATE_UNSPECIFIED" | "STATE_RESUMING" | "STATE_ACTIVE" | "STATE_STOPPING" | "STATE_ARCHIVED" | "STATE_PAUSED";
  /**
   * Required. The type of the pipeline. This field affects the scheduling of
   * the pipeline and the type of metrics to show for the pipeline.
   */
  type?:  | "PIPELINE_TYPE_UNSPECIFIED" | "PIPELINE_TYPE_BATCH" | "PIPELINE_TYPE_STREAMING";
  /**
   * Workload information for creating new jobs.
   */
  workload?: GoogleCloudDatapipelinesV1Workload;
}

/**
 * Request message for RunPipeline
 */
export interface GoogleCloudDatapipelinesV1RunPipelineRequest {
}

/**
 * Response message for RunPipeline
 */
export interface GoogleCloudDatapipelinesV1RunPipelineResponse {
  /**
   * Job that was created as part of RunPipeline operation.
   */
  job?: GoogleCloudDatapipelinesV1Job;
}

/**
 * The environment values to set at runtime.
 */
export interface GoogleCloudDatapipelinesV1RuntimeEnvironment {
  /**
   * Additional experiment flags for the job.
   */
  additionalExperiments?: string[];
  /**
   * Additional user labels to be specified for the job. Keys and values should
   * follow the restrictions specified in the [labeling
   * restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions)
   * page. An object containing a list of key/value pairs. Example: { "name":
   * "wrench", "mass": "1kg", "count": "3" }.
   */
  additionalUserLabels?: {
    [key: string]: string
  };
  /**
   * Whether to bypass the safety checks for the job's temporary directory. Use
   * with caution.
   */
  bypassTempDirValidation?: boolean;
  /**
   * Whether to enable Streaming Engine for the job.
   */
  enableStreamingEngine?: boolean;
  /**
   * Configuration for VM IPs.
   */
  ipConfiguration?:  | "WORKER_IP_UNSPECIFIED" | "WORKER_IP_PUBLIC" | "WORKER_IP_PRIVATE";
  /**
   * Name for the Cloud KMS key for the job. The key format is:
   * projects//locations//keyRings//cryptoKeys/
   */
  kmsKeyName?: string;
  /**
   * The machine type to use for the job. Defaults to the value from the
   * template if not specified.
   */
  machineType?: string;
  /**
   * The maximum number of Compute Engine instances to be made available to
   * your pipeline during execution, from 1 to 1000.
   */
  maxWorkers?: number;
  /**
   * Network to which VMs will be assigned. If empty or unspecified, the
   * service will use the network "default".
   */
  network?: string;
  /**
   * The initial number of Compute Engine instances for the job.
   */
  numWorkers?: number;
  /**
   * The email address of the service account to run the job as.
   */
  serviceAccountEmail?: string;
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
 * Details of the schedule the pipeline runs on.
 */
export interface GoogleCloudDatapipelinesV1ScheduleSpec {
  /**
   * Output only. When the next Scheduler job is going to run.
   */
  readonly nextJobTime?: Date;
  /**
   * Unix-cron format of the schedule. This information is retrieved from the
   * linked Cloud Scheduler.
   */
  schedule?: string;
  /**
   * Timezone ID. This matches the timezone IDs used by the Cloud Scheduler
   * API. If empty, UTC time is assumed.
   */
  timeZone?: string;
}

/**
 * The version of the SDK used to run the job.
 */
export interface GoogleCloudDatapipelinesV1SdkVersion {
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
 * Request message for StopPipeline.
 */
export interface GoogleCloudDatapipelinesV1StopPipelineRequest {
}

/**
 * Workload details for creating the pipeline jobs.
 */
export interface GoogleCloudDatapipelinesV1Workload {
  /**
   * Template information and additional parameters needed to launch a Dataflow
   * job using the flex launch API.
   */
  dataflowFlexTemplateRequest?: GoogleCloudDatapipelinesV1LaunchFlexTemplateRequest;
  /**
   * Template information and additional parameters needed to launch a Dataflow
   * job using the standard launch API.
   */
  dataflowLaunchTemplateRequest?: GoogleCloudDatapipelinesV1LaunchTemplateRequest;
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
 * Additional options for Datapipelines#projectsLocationsPipelinesJobsList.
 */
export interface ProjectsLocationsPipelinesJobsListOptions {
  /**
   * The maximum number of entities to return. The service may return fewer
   * than this value, even if there are additional pages. If unspecified, the
   * max limit will be determined by the backend implementation.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListJobs` call. Provide this to
   * retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListJobs` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Datapipelines#projectsLocationsPipelinesList.
 */
export interface ProjectsLocationsPipelinesListOptions {
  /**
   * An expression for filtering the results of the request. If unspecified,
   * all pipelines will be returned. Multiple filters can be applied and must be
   * comma separated. Fields eligible for filtering are: + `type`: The type of
   * the pipeline (streaming or batch). Allowed values are `ALL`, `BATCH`, and
   * `STREAMING`. + `status`: The activity status of the pipeline. Allowed
   * values are `ALL`, `ACTIVE`, `ARCHIVED`, and `PAUSED`. For example, to limit
   * results to active batch processing pipelines: type:BATCH,status:ACTIVE
   */
  filter?: string;
  /**
   * The maximum number of entities to return. The service may return fewer
   * than this value, even if there are additional pages. If unspecified, the
   * max limit is yet to be determined by the backend implementation.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListPipelines` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListPipelines` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for Datapipelines#projectsLocationsPipelinesPatch.
 */
export interface ProjectsLocationsPipelinesPatchOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsPipelinesPatchOptions(data: any): ProjectsLocationsPipelinesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsPipelinesPatchOptions(data: any): ProjectsLocationsPipelinesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}