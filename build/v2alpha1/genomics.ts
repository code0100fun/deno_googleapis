// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Genomics API Client for Deno
 * ============================
 * 
 * Uploads, processes, queries, and searches Genomics data in the cloud.
 * 
 * Docs: https://cloud.google.com/genomics
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Uploads, processes, queries, and searches Genomics data in the cloud.
 */
export class Genomics {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://genomics.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Runs a pipeline. The returned Operation's metadata field will contain a
   * google.genomics.v2alpha1.Metadata object describing the status of the
   * pipeline execution. The [response] field will contain a
   * google.genomics.v2alpha1.RunPipelineResponse object if the pipeline
   * completes successfully. **Note:** Before you can use this method, the
   * Genomics Service Agent must have access to your project. This is done
   * automatically when the Cloud Genomics API is first enabled, but if you
   * delete this permission, or if you enabled the Cloud Genomics API before the
   * v2alpha1 API launch, you must disable and re-enable the API to grant the
   * Genomics Service Agent the required permissions. Authorization requires the
   * following [Google IAM](https://cloud.google.com/iam/) permission: *
   * `genomics.operations.create` [1]: /genomics/gsa
   *
   */
  async pipelinesRun(req: RunPipelineRequest): Promise<Operation> {
    req = serializeRunPipelineRequest(req);
    const url = new URL(`${this.#baseUrl}v2alpha1/pipelines:run`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Starts asynchronous cancellation on a long-running operation. The server
   * makes a best effort to cancel the operation, but success is not guaranteed.
   * Clients may use Operations.GetOperation or Operations.ListOperations to
   * check whether the cancellation succeeded or the operation completed despite
   * cancellation. Authorization requires the following [Google
   * IAM](https://cloud.google.com/iam) permission: *
   * `genomics.operations.cancel`
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async projectsOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2alpha1/${ name }:cancel`);
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
   * service. Authorization requires the following [Google
   * IAM](https://cloud.google.com/iam) permission: * `genomics.operations.get`
   *
   * @param name The name of the operation resource.
   */
  async projectsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2alpha1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request.
   * Authorization requires the following [Google
   * IAM](https://cloud.google.com/iam) permission: * `genomics.operations.list`
   *
   * @param name The name of the operation's parent resource.
   */
  async projectsOperationsList(name: string, opts: ProjectsOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v2alpha1/${ name }`);
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
   * The worker uses this method to retrieve the assigned operation and provide
   * periodic status updates.
   *
   * @param id The VM identity token for authenticating the VM instance. https://cloud.google.com/compute/docs/instances/verifying-instance-identity
   */
  async projectsWorkersCheckIn(id: string, req: CheckInRequest): Promise<CheckInResponse> {
    req = serializeCheckInRequest(req);
    const url = new URL(`${this.#baseUrl}v2alpha1/${ id }:checkIn`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCheckInResponse(data);
  }

  /**
   * The worker uses this method to retrieve the assigned operation and provide
   * periodic status updates.
   *
   * @param id The VM identity token for authenticating the VM instance. https://cloud.google.com/compute/docs/instances/verifying-instance-identity
   */
  async workersCheckIn(id: string, req: CheckInRequest): Promise<CheckInResponse> {
    req = serializeCheckInRequest(req);
    const url = new URL(`${this.#baseUrl}v2alpha1/workers/${ id }:checkIn`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeCheckInResponse(data);
  }
}

/**
 * Carries information about an accelerator that can be attached to a VM.
 */
export interface Accelerator {
  /**
   * How many accelerators of this type to attach.
   */
  count?: bigint;
  /**
   * The accelerator type string (for example, "nvidia-tesla-k80"). Only NVIDIA
   * GPU accelerators are currently supported. If an NVIDIA GPU is attached, the
   * required runtime libraries will be made available to all containers under
   * `/usr/local/nvidia`. The driver version to install must be specified using
   * the NVIDIA driver version parameter on the virtual machine specification.
   * Note that attaching a GPU increases the worker VM startup time by a few
   * minutes.
   */
  type?: string;
}

function serializeAccelerator(data: any): Accelerator {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeAccelerator(data: any): Accelerator {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * Specifies a single action that runs a Docker container.
 */
export interface Action {
  /**
   * If specified, overrides the `CMD` specified in the container. If the
   * container also has an `ENTRYPOINT` the values are used as entrypoint
   * arguments. Otherwise, they are used as a command and arguments to run
   * inside the container.
   */
  commands?: string[];
  /**
   * If the specified image is hosted on a private registry other than Google
   * Container Registry, the credentials required to pull the image must be
   * specified here as an encrypted secret. The secret must decrypt to a
   * JSON-encoded dictionary containing both `username` and `password` keys.
   */
  credentials?: Secret;
  /**
   * The encrypted environment to pass into the container. This environment is
   * merged with values specified in the google.genomics.v2alpha1.Pipeline
   * message, overwriting any duplicate values. The secret must decrypt to a
   * JSON-encoded dictionary where key-value pairs serve as environment variable
   * names and their values. The decoded environment variables can overwrite the
   * values specified by the `environment` field.
   */
  encryptedEnvironment?: Secret;
  /**
   * If specified, overrides the `ENTRYPOINT` specified in the container.
   */
  entrypoint?: string;
  /**
   * The environment to pass into the container. This environment is merged
   * with values specified in the google.genomics.v2alpha1.Pipeline message,
   * overwriting any duplicate values. In addition to the values passed here, a
   * few other values are automatically injected into the environment. These
   * cannot be hidden or overwritten. `GOOGLE_PIPELINE_FAILED` will be set to
   * "1" if the pipeline failed because an action has exited with a non-zero
   * status (and did not have the `IGNORE_EXIT_STATUS` flag set). This can be
   * used to determine if additional debug or logging actions should execute.
   * `GOOGLE_LAST_EXIT_STATUS` will be set to the exit status of the last
   * non-background action that executed. This can be used by workflow engine
   * authors to determine whether an individual action has succeeded or failed.
   */
  environment?: {
    [key: string]: string
  };
  /**
   * The set of flags to apply to this action.
   */
  flags?:  | "FLAG_UNSPECIFIED" | "IGNORE_EXIT_STATUS" | "RUN_IN_BACKGROUND" | "ALWAYS_RUN" | "ENABLE_FUSE" | "PUBLISH_EXPOSED_PORTS" | "DISABLE_IMAGE_PREFETCH" | "DISABLE_STANDARD_ERROR_CAPTURE" | "BLOCK_EXTERNAL_NETWORK"[];
  /**
   * Required. The URI to pull the container image from. Note that all images
   * referenced by actions in the pipeline are pulled before the first action
   * runs. If multiple actions reference the same image, it is only pulled once,
   * ensuring that the same image is used for all actions in a single pipeline.
   * The image URI can be either a complete host and image specification (e.g.,
   * quay.io/biocontainers/samtools), a library and image name (e.g.,
   * google/cloud-sdk) or a bare image name ('bash') to pull from the default
   * library. No schema is required in any of these cases. If the specified
   * image is not public, the service account specified for the Virtual Machine
   * must have access to pull the images from GCR, or appropriate credentials
   * must be specified in the google.genomics.v2alpha1.Action.credentials field.
   */
  imageUri?: string;
  /**
   * Labels to associate with the action. This field is provided to assist
   * workflow engine authors in identifying actions (for example, to indicate
   * what sort of action they perform, such as localization or debugging). They
   * are returned in the operation metadata, but are otherwise ignored.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * A list of mounts to make available to the action. In addition to the
   * values specified here, every action has a special virtual disk mounted
   * under `/google` that contains log files and other operational components. -
   * /google/logs All logs written during the pipeline execution. -
   * /google/logs/output The combined standard output and standard error of all
   * actions run as part of the pipeline execution. -
   * /google/logs/action/*\/stdout The complete contents of each individual
   * action's standard output. - /google/logs/action/*\/stderr The complete
   * contents of each individual action's standard error output.
   */
  mounts?: Mount[];
  /**
   * An optional name for the container. The container hostname will be set to
   * this name, making it useful for inter-container communication. The name
   * must contain only upper and lowercase alphanumeric characters and hyphens
   * and cannot start with a hyphen.
   */
  name?: string;
  /**
   * An optional identifier for a PID namespace to run the action inside.
   * Multiple actions should use the same string to share a namespace. If
   * unspecified, a separate isolated namespace is used.
   */
  pidNamespace?: string;
  /**
   * A map of containers to host port mappings for this container. If the
   * container already specifies exposed ports, use the `PUBLISH_EXPOSED_PORTS`
   * flag instead. The host port number must be less than 65536. If it is zero,
   * an unused random port is assigned. To determine the resulting port number,
   * consult the `ContainerStartedEvent` in the operation metadata.
   */
  portMappings?: {
    [key: string]: number
  };
  /**
   * The maximum amount of time to give the action to complete. If the action
   * fails to complete before the timeout, it will be terminated and the exit
   * status will be non-zero. The pipeline will continue or terminate based on
   * the rules defined by the `ALWAYS_RUN` and `IGNORE_EXIT_STATUS` flags.
   */
  timeout?: number /* Duration */;
}

function serializeAction(data: any): Action {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeAction(data: any): Action {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * The parameters to the CheckIn method.
 */
export interface CheckInRequest {
  /**
   * The deadline has expired and the worker needs more time.
   */
  deadlineExpired?: Empty;
  /**
   * A workflow specific event occurred.
   */
  event?: {
    [key: string]: any
  };
  /**
   * A list of timestamped events.
   */
  events?: TimestampedEvent[];
  /**
   * The operation has finished with the given result.
   */
  result?: Status;
  /**
   * An SOS report for an unexpected VM failure.
   */
  sosReport?: Uint8Array;
  /**
   * Data about the status of the worker VM.
   */
  workerStatus?: WorkerStatus;
}

function serializeCheckInRequest(data: any): CheckInRequest {
  return {
    ...data,
    events: data["events"] !== undefined ? data["events"].map((item: any) => (serializeTimestampedEvent(item))) : undefined,
    sosReport: data["sosReport"] !== undefined ? encodeBase64(data["sosReport"]) : undefined,
    workerStatus: data["workerStatus"] !== undefined ? serializeWorkerStatus(data["workerStatus"]) : undefined,
  };
}

function deserializeCheckInRequest(data: any): CheckInRequest {
  return {
    ...data,
    events: data["events"] !== undefined ? data["events"].map((item: any) => (deserializeTimestampedEvent(item))) : undefined,
    sosReport: data["sosReport"] !== undefined ? decodeBase64(data["sosReport"] as string) : undefined,
    workerStatus: data["workerStatus"] !== undefined ? deserializeWorkerStatus(data["workerStatus"]) : undefined,
  };
}

/**
 * The response to the CheckIn method.
 */
export interface CheckInResponse {
  /**
   * The deadline by which the worker must request an extension. The backend
   * will allow for network transmission time and other delays, but the worker
   * must attempt to transmit the extension request no later than the deadline.
   */
  deadline?: Date;
  /**
   * Feature configuration for the operation.
   */
  features?: {
    [key: string]: any
  };
  /**
   * The metadata that describes the operation assigned to the worker.
   */
  metadata?: {
    [key: string]: any
  };
}

function serializeCheckInResponse(data: any): CheckInResponse {
  return {
    ...data,
    deadline: data["deadline"] !== undefined ? data["deadline"].toISOString() : undefined,
  };
}

function deserializeCheckInResponse(data: any): CheckInResponse {
  return {
    ...data,
    deadline: data["deadline"] !== undefined ? new Date(data["deadline"]) : undefined,
  };
}

/**
 * An event generated when a container is forcibly terminated by the worker.
 * Currently, this only occurs when the container outlives the timeout specified
 * by the user.
 */
export interface ContainerKilledEvent {
  /**
   * The numeric ID of the action that started the container.
   */
  actionId?: number;
}

/**
 * An event generated when a container starts.
 */
export interface ContainerStartedEvent {
  /**
   * The numeric ID of the action that started this container.
   */
  actionId?: number;
  /**
   * The public IP address that can be used to connect to the container. This
   * field is only populated when at least one port mapping is present. If the
   * instance was created with a private address, this field will be empty even
   * if port mappings exist.
   */
  ipAddress?: string;
  /**
   * The container-to-host port mappings installed for this container. This set
   * will contain any ports exposed using the `PUBLISH_EXPOSED_PORTS` flag as
   * well as any specified in the `Action` definition.
   */
  portMappings?: {
    [key: string]: number
  };
}

/**
 * An event generated when a container exits.
 */
export interface ContainerStoppedEvent {
  /**
   * The numeric ID of the action that started this container.
   */
  actionId?: number;
  /**
   * The exit status of the container.
   */
  exitStatus?: number;
  /**
   * The tail end of any content written to standard error by the container. If
   * the content emits large amounts of debugging noise or contains sensitive
   * information, you can prevent the content from being printed by setting the
   * `DISABLE_STANDARD_ERROR_CAPTURE` flag. Note that only a small amount of the
   * end of the stream is captured here. The entire stream is stored in the
   * `/google/logs` directory mounted into each action, and can be copied off
   * the machine as described elsewhere.
   */
  stderr?: string;
}

/**
 * An event generated whenever a resource limitation or transient error delays
 * execution of a pipeline that was otherwise ready to run.
 */
export interface DelayedEvent {
  /**
   * A textual description of the cause of the delay. The string can change
   * without notice because it is often generated by another service (such as
   * Compute Engine).
   */
  cause?: string;
  /**
   * If the delay was caused by a resource shortage, this field lists the
   * Compute Engine metrics that are preventing this operation from running (for
   * example, `CPUS` or `INSTANCES`). If the particular metric is not known, a
   * single `UNKNOWN` metric will be present.
   */
  metrics?: string[];
}

/**
 * Carries information about a disk that can be attached to a VM. See
 * https://cloud.google.com/compute/docs/disks/performance for more information
 * about disk type, size, and performance considerations. Specify either
 * `Volume` or `Disk`, but not both.
 */
export interface Disk {
  /**
   * A user-supplied name for the disk. Used when mounting the disk into
   * actions. The name must contain only upper and lowercase alphanumeric
   * characters and hyphens and cannot start with a hyphen.
   */
  name?: string;
  /**
   * The size, in GB, of the disk to attach. If the size is not specified, a
   * default is chosen to ensure reasonable I/O performance. If the disk type is
   * specified as `local-ssd`, multiple local drives are automatically combined
   * to provide the requested size. Note, however, that each physical SSD is
   * 375GB in size, and no more than 8 drives can be attached to a single
   * instance.
   */
  sizeGb?: number;
  /**
   * An optional image to put on the disk before attaching it to the VM.
   */
  sourceImage?: string;
  /**
   * The Compute Engine disk type. If unspecified, `pd-standard` is used.
   */
  type?: string;
}

/**
 * The status of a disk on a VM.
 */
export interface DiskStatus {
  /**
   * Free disk space.
   */
  freeSpaceBytes?: bigint;
  /**
   * Total disk space.
   */
  totalSpaceBytes?: bigint;
}

function serializeDiskStatus(data: any): DiskStatus {
  return {
    ...data,
    freeSpaceBytes: data["freeSpaceBytes"] !== undefined ? String(data["freeSpaceBytes"]) : undefined,
    totalSpaceBytes: data["totalSpaceBytes"] !== undefined ? String(data["totalSpaceBytes"]) : undefined,
  };
}

function deserializeDiskStatus(data: any): DiskStatus {
  return {
    ...data,
    freeSpaceBytes: data["freeSpaceBytes"] !== undefined ? BigInt(data["freeSpaceBytes"]) : undefined,
    totalSpaceBytes: data["totalSpaceBytes"] !== undefined ? BigInt(data["totalSpaceBytes"]) : undefined,
  };
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
 * Carries information about events that occur during pipeline execution.
 */
export interface Event {
  /**
   * A human-readable description of the event. Note that these strings can
   * change at any time without notice. Any application logic must use the
   * information in the `details` field.
   */
  description?: string;
  /**
   * Machine-readable details about the event.
   */
  details?: {
    [key: string]: any
  };
  /**
   * The time at which the event occurred.
   */
  timestamp?: Date;
}

function serializeEvent(data: any): Event {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
  };
}

function deserializeEvent(data: any): Event {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
  };
}

/**
 * Configuration for an existing disk to be attached to the VM.
 */
export interface ExistingDisk {
  /**
   * If `disk` contains slashes, the Cloud Life Sciences API assumes that it is
   * a complete URL for the disk. If `disk` does not contain slashes, the Cloud
   * Life Sciences API assumes that the disk is a zonal disk and a URL will be
   * generated of the form `zones//disks/`, where `` is the zone in which the
   * instance is allocated. The disk must be ext4 formatted. If all `Mount`
   * references to this disk have the `read_only` flag set to true, the disk
   * will be attached in `read-only` mode and can be shared with other
   * instances. Otherwise, the disk will be available for writing but cannot be
   * shared.
   */
  disk?: string;
}

/**
 * An event generated when the execution of a pipeline has failed. Note that
 * other events can continue to occur after this event.
 */
export interface FailedEvent {
  /**
   * The human-readable description of the cause of the failure.
   */
  cause?: string;
  /**
   * The Google standard error code that best describes this failure.
   */
  code?:  | "OK" | "CANCELLED" | "UNKNOWN" | "INVALID_ARGUMENT" | "DEADLINE_EXCEEDED" | "NOT_FOUND" | "ALREADY_EXISTS" | "PERMISSION_DENIED" | "UNAUTHENTICATED" | "RESOURCE_EXHAUSTED" | "FAILED_PRECONDITION" | "ABORTED" | "OUT_OF_RANGE" | "UNIMPLEMENTED" | "INTERNAL" | "UNAVAILABLE" | "DATA_LOSS";
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
 * Carries information about the pipeline execution that is returned in the
 * long running operation's metadata field.
 */
export interface Metadata {
  /**
   * The time at which the operation was created by the API.
   */
  createTime?: Date;
  /**
   * The time at which execution was completed and resources were cleaned up.
   */
  endTime?: Date;
  /**
   * The list of events that have happened so far during the execution of this
   * operation.
   */
  events?: Event[];
  /**
   * The user-defined labels associated with this operation.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The pipeline this operation represents.
   */
  pipeline?: Pipeline;
  /**
   * The first time at which resources were allocated to execute the pipeline.
   */
  startTime?: Date;
}

function serializeMetadata(data: any): Metadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    events: data["events"] !== undefined ? data["events"].map((item: any) => (serializeEvent(item))) : undefined,
    pipeline: data["pipeline"] !== undefined ? serializePipeline(data["pipeline"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeMetadata(data: any): Metadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    events: data["events"] !== undefined ? data["events"].map((item: any) => (deserializeEvent(item))) : undefined,
    pipeline: data["pipeline"] !== undefined ? deserializePipeline(data["pipeline"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Carries information about a particular disk mount inside a container.
 */
export interface Mount {
  /**
   * The name of the disk to mount, as specified in the resources section.
   */
  disk?: string;
  /**
   * The path to mount the disk inside the container.
   */
  path?: string;
  /**
   * If true, the disk is mounted read-only inside the container.
   */
  readOnly?: boolean;
}

/**
 * VM networking options.
 */
export interface Network {
  /**
   * The network name to attach the VM's network interface to. The value will
   * be prefixed with `global/networks/` unless it contains a `/`, in which case
   * it is assumed to be a fully specified network resource URL. If unspecified,
   * the global default network is used.
   */
  name?: string;
  /**
   * If the specified network is configured for custom subnet creation, the
   * name of the subnetwork to attach the instance to must be specified here.
   * The value is prefixed with `regions/*\/subnetworks/` unless it contains a
   * `/`, in which case it is assumed to be a fully specified subnetwork
   * resource URL. If the `*` character appears in the value, it is replaced
   * with the region that the virtual machine has been allocated in.
   */
  subnetwork?: string;
  /**
   * If set to true, do not attach a public IP address to the VM. Note that
   * without a public IP address, additional configuration is required to allow
   * the VM to access Google services. See
   * https://cloud.google.com/vpc/docs/configure-private-google-access for more
   * information.
   */
  usePrivateAddress?: boolean;
}

/**
 * Configuration for an `NFSMount` to be attached to the VM.
 */
export interface NFSMount {
  /**
   * A target NFS mount. The target must be specified as `address:/mount".
   */
  target?: string;
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
   * An OperationMetadata or Metadata object. This will always be returned with
   * the Operation.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * The server-assigned name, which is only unique within the same service
   * that originally returns it. For example:
   * `operations/CJHU7Oi_ChDrveSpBRjfuL-qzoWAgEw`
   */
  name?: string;
  /**
   * An Empty object.
   */
  response?: {
    [key: string]: any
  };
}

/**
 * Configuration for a persistent disk to be attached to the VM. See
 * https://cloud.google.com/compute/docs/disks/performance for more information
 * about disk type, size, and performance considerations.
 */
export interface PersistentDisk {
  /**
   * The size, in GB, of the disk to attach. If the size is not specified, a
   * default is chosen to ensure reasonable I/O performance. If the disk type is
   * specified as `local-ssd`, multiple local drives are automatically combined
   * to provide the requested size. Note, however, that each physical SSD is
   * 375GB in size, and no more than 8 drives can be attached to a single
   * instance.
   */
  sizeGb?: number;
  /**
   * An image to put on the disk before attaching it to the VM.
   */
  sourceImage?: string;
  /**
   * The Compute Engine disk type. If unspecified, `pd-standard` is used.
   */
  type?: string;
}

/**
 * Specifies a series of actions to execute, expressed as Docker containers.
 */
export interface Pipeline {
  /**
   * The list of actions to execute, in the order they are specified.
   */
  actions?: Action[];
  /**
   * The encrypted environment to pass into every action. Each action can also
   * specify its own encrypted environment. The secret must decrypt to a
   * JSON-encoded dictionary where key-value pairs serve as environment variable
   * names and their values. The decoded environment variables can overwrite the
   * values specified by the `environment` field.
   */
  encryptedEnvironment?: Secret;
  /**
   * The environment to pass into every action. Each action can also specify
   * additional environment variables but cannot delete an entry from this map
   * (though they can overwrite it with a different value).
   */
  environment?: {
    [key: string]: string
  };
  /**
   * The resources required for execution.
   */
  resources?: Resources;
  /**
   * The maximum amount of time to give the pipeline to complete. This includes
   * the time spent waiting for a worker to be allocated. If the pipeline fails
   * to complete before the timeout, it will be cancelled and the error code
   * will be set to DEADLINE_EXCEEDED. If unspecified, it will default to 7
   * days.
   */
  timeout?: number /* Duration */;
}

function serializePipeline(data: any): Pipeline {
  return {
    ...data,
    actions: data["actions"] !== undefined ? data["actions"].map((item: any) => (serializeAction(item))) : undefined,
    resources: data["resources"] !== undefined ? serializeResources(data["resources"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializePipeline(data: any): Pipeline {
  return {
    ...data,
    actions: data["actions"] !== undefined ? data["actions"].map((item: any) => (deserializeAction(item))) : undefined,
    resources: data["resources"] !== undefined ? deserializeResources(data["resources"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * Additional options for Genomics#projectsOperationsList.
 */
export interface ProjectsOperationsListOptions {
  /**
   * A string for filtering Operations. In v2alpha1, the following filter
   * fields are supported: * createTime: The time this job was created * events:
   * The set of event (names) that have occurred while running the pipeline. The
   * : operator can be used to determine if a particular event has occurred. *
   * error: If the pipeline is running, this value is NULL. Once the pipeline
   * finishes, the value is the standard Google error code. * labels.key or
   * labels."key with space" where key is a label key. * done: If the pipeline
   * is running, this value is false. Once the pipeline finishes, the value is
   * true. Examples: * `projectId = my-project AND createTime >= 1432140000` *
   * `projectId = my-project AND createTime >= 1432140000 AND createTime <=
   * 1432150000 AND status = RUNNING` * `projectId = my-project AND labels.color
   * = *` * `projectId = my-project AND labels.color = red`
   */
  filter?: string;
  /**
   * The maximum number of results to return. The maximum value is 256.
   */
  pageSize?: number;
  /**
   * The standard list page token.
   */
  pageToken?: string;
}

/**
 * An event generated when the worker starts pulling an image.
 */
export interface PullStartedEvent {
  /**
   * The URI of the image that was pulled.
   */
  imageUri?: string;
}

/**
 * An event generated when the worker stops pulling an image.
 */
export interface PullStoppedEvent {
  /**
   * The URI of the image that was pulled.
   */
  imageUri?: string;
}

/**
 * The system resources for the pipeline run. At least one zone or region must
 * be specified or the pipeline run will fail.
 */
export interface Resources {
  /**
   * The project ID to allocate resources in.
   */
  projectId?: string;
  /**
   * The list of regions allowed for VM allocation. If set, the `zones` field
   * must not be set.
   */
  regions?: string[];
  /**
   * The virtual machine specification.
   */
  virtualMachine?: VirtualMachine;
  /**
   * The list of zones allowed for VM allocation. If set, the `regions` field
   * must not be set.
   */
  zones?: string[];
}

function serializeResources(data: any): Resources {
  return {
    ...data,
    virtualMachine: data["virtualMachine"] !== undefined ? serializeVirtualMachine(data["virtualMachine"]) : undefined,
  };
}

function deserializeResources(data: any): Resources {
  return {
    ...data,
    virtualMachine: data["virtualMachine"] !== undefined ? deserializeVirtualMachine(data["virtualMachine"]) : undefined,
  };
}

/**
 * The arguments to the `RunPipeline` method. The requesting user must have the
 * `iam.serviceAccounts.actAs` permission for the Cloud Genomics service account
 * or the request will fail.
 */
export interface RunPipelineRequest {
  /**
   * User-defined labels to associate with the returned operation. These labels
   * are not propagated to any Google Cloud Platform resources used by the
   * operation, and can be modified at any time. To associate labels with
   * resources created while executing the operation, see the appropriate
   * resource message (for example, `VirtualMachine`).
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. The description of the pipeline to run.
   */
  pipeline?: Pipeline;
  /**
   * The name of an existing Pub/Sub topic. The server will publish messages to
   * this topic whenever the status of the operation changes. The Genomics
   * Service Agent account must have publisher permissions to the specified
   * topic or notifications will not be sent.
   */
  pubSubTopic?: string;
}

function serializeRunPipelineRequest(data: any): RunPipelineRequest {
  return {
    ...data,
    pipeline: data["pipeline"] !== undefined ? serializePipeline(data["pipeline"]) : undefined,
  };
}

function deserializeRunPipelineRequest(data: any): RunPipelineRequest {
  return {
    ...data,
    pipeline: data["pipeline"] !== undefined ? deserializePipeline(data["pipeline"]) : undefined,
  };
}

/**
 * The response to the RunPipeline method, returned in the operation's result
 * field on success.
 */
export interface RunPipelineResponse {
}

/**
 * Holds encrypted information that is only decrypted and stored in RAM by the
 * worker VM when running the pipeline.
 */
export interface Secret {
  /**
   * The value of the cipherText response from the `encrypt` method. This field
   * is intentionally unaudited.
   */
  cipherText?: string;
  /**
   * The name of the Cloud KMS key that will be used to decrypt the secret
   * value. The VM service account must have the required permissions and
   * authentication scopes to invoke the `decrypt` method on the specified key.
   */
  keyName?: string;
}

/**
 * Carries information about a Google Cloud service account.
 */
export interface ServiceAccount {
  /**
   * Email address of the service account. If not specified, the default
   * Compute Engine service account for the project will be used.
   */
  email?: string;
  /**
   * List of scopes to be enabled for this service account on the VM, in
   * addition to the cloud-platform API scope that will be added by default.
   */
  scopes?: string[];
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
 * An event that occured in the operation assigned to the worker and the time
 * of occurance.
 */
export interface TimestampedEvent {
  /**
   * The event data.
   */
  data?: {
    [key: string]: any
  };
  /**
   * The time when the event happened.
   */
  timestamp?: Date;
}

function serializeTimestampedEvent(data: any): TimestampedEvent {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
  };
}

function deserializeTimestampedEvent(data: any): TimestampedEvent {
  return {
    ...data,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
  };
}

/**
 * An event generated when the execution of a container results in a non-zero
 * exit status that was not otherwise ignored. Execution will continue, but only
 * actions that are flagged as `ALWAYS_RUN` will be executed. Other actions will
 * be skipped.
 */
export interface UnexpectedExitStatusEvent {
  /**
   * The numeric ID of the action that started the container.
   */
  actionId?: number;
  /**
   * The exit status of the container.
   */
  exitStatus?: number;
}

/**
 * Carries information about a Compute Engine VM resource.
 */
export interface VirtualMachine {
  /**
   * The list of accelerators to attach to the VM.
   */
  accelerators?: Accelerator[];
  /**
   * The size of the boot disk, in GB. The boot disk must be large enough to
   * accommodate all of the Docker images from each action in the pipeline at
   * the same time. If not specified, a small but reasonable default value is
   * used.
   */
  bootDiskSizeGb?: number;
  /**
   * The host operating system image to use. Currently, only
   * Container-Optimized OS images can be used. The default value is
   * `projects/cos-cloud/global/images/family/cos-stable`, which selects the
   * latest stable release of Container-Optimized OS. This option is provided to
   * allow testing against the beta release of the operating system to ensure
   * that the new version does not interact negatively with production
   * pipelines. To test a pipeline against the beta release of
   * Container-Optimized OS, use the value
   * `projects/cos-cloud/global/images/family/cos-beta`.
   */
  bootImage?: string;
  /**
   * The CPU platform to request. An instance based on a newer platform can be
   * allocated, but never one with fewer capabilities. The value of this
   * parameter must be a valid Compute Engine CPU platform name (such as "Intel
   * Skylake"). This parameter is only useful for carefully optimized work loads
   * where the CPU platform has a significant impact. For more information about
   * the effect of this parameter, see
   * https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform.
   */
  cpuPlatform?: string;
  /**
   * The list of disks to create and attach to the VM. Specify either the
   * `volumes[]` field or the `disks[]` field, but not both.
   */
  disks?: Disk[];
  /**
   * The Compute Engine Disk Images to use as a Docker cache. The disks will be
   * mounted into the Docker folder in a way that the images present in the
   * cache will not need to be pulled. The digests of the cached images must
   * match those of the tags used or the latest version will still be pulled.
   * The root directory of the ext4 image must contain `image` and `overlay2`
   * directories copied from the Docker directory of a VM where the desired
   * Docker images have already been pulled. Any images pulled that are not
   * cached will be stored on the first cache disk instead of the boot disk.
   * Only a single image is supported.
   */
  dockerCacheImages?: string[];
  /**
   * Whether Stackdriver monitoring should be enabled on the VM.
   */
  enableStackdriverMonitoring?: boolean;
  /**
   * Optional set of labels to apply to the VM and any attached disk resources.
   * These labels must adhere to the [name and value
   * restrictions](https://cloud.google.com/compute/docs/labeling-resources) on
   * VM labels imposed by Compute Engine. Labels keys with the prefix 'google-'
   * are reserved for use by Google. Labels applied at creation time to the VM.
   * Applied on a best-effort basis to attached disk resources shortly after VM
   * creation.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. The machine type of the virtual machine to create. Must be the
   * short name of a standard machine type (such as "n1-standard-1") or a custom
   * machine type (such as "custom-1-4096", where "1" indicates the number of
   * vCPUs and "4096" indicates the memory in MB). See [Creating an instance
   * with a custom machine
   * type](https://cloud.google.com/compute/docs/instances/creating-instance-with-custom-machine-type#create)
   * for more specifications on creating a custom machine type.
   */
  machineType?: string;
  /**
   * The VM network configuration.
   */
  network?: Network;
  /**
   * The NVIDIA driver version to use when attaching an NVIDIA GPU accelerator.
   * The version specified here must be compatible with the GPU libraries
   * contained in the container being executed, and must be one of the drivers
   * hosted in the `nvidia-drivers-us-public` bucket on Google Cloud Storage.
   */
  nvidiaDriverVersion?: string;
  /**
   * If true, allocate a preemptible VM.
   */
  preemptible?: boolean;
  /**
   * If specified, the VM will only be allocated inside the matching
   * reservation. It will fail if the VM parameters don't match the reservation.
   */
  reservation?: string;
  /**
   * The service account to install on the VM. This account does not need any
   * permissions other than those required by the pipeline.
   */
  serviceAccount?: ServiceAccount;
  /**
   * The list of disks and other storage to create or attach to the VM. Specify
   * either the `volumes[]` field or the `disks[]` field, but not both.
   */
  volumes?: Volume[];
}

function serializeVirtualMachine(data: any): VirtualMachine {
  return {
    ...data,
    accelerators: data["accelerators"] !== undefined ? data["accelerators"].map((item: any) => (serializeAccelerator(item))) : undefined,
  };
}

function deserializeVirtualMachine(data: any): VirtualMachine {
  return {
    ...data,
    accelerators: data["accelerators"] !== undefined ? data["accelerators"].map((item: any) => (deserializeAccelerator(item))) : undefined,
  };
}

/**
 * Carries information about storage that can be attached to a VM. Specify
 * either `Volume` or `Disk`, but not both.
 */
export interface Volume {
  /**
   * Configuration for a existing disk.
   */
  existingDisk?: ExistingDisk;
  /**
   * Configuration for an NFS mount.
   */
  nfsMount?: NFSMount;
  /**
   * Configuration for a persistent disk.
   */
  persistentDisk?: PersistentDisk;
  /**
   * A user-supplied name for the volume. Used when mounting the volume into
   * `Actions`. The name must contain only upper and lowercase alphanumeric
   * characters and hyphens and cannot start with a hyphen.
   */
  volume?: string;
}

/**
 * An event generated after a worker VM has been assigned to run the pipeline.
 */
export interface WorkerAssignedEvent {
  /**
   * The worker's instance name.
   */
  instance?: string;
  /**
   * The machine type that was assigned for the worker.
   */
  machineType?: string;
  /**
   * The zone the worker is running in.
   */
  zone?: string;
}

/**
 * An event generated when the worker VM that was assigned to the pipeline has
 * been released (deleted).
 */
export interface WorkerReleasedEvent {
  /**
   * The worker's instance name.
   */
  instance?: string;
  /**
   * The zone the worker was running in.
   */
  zone?: string;
}

/**
 * The status of the worker VM.
 */
export interface WorkerStatus {
  /**
   * Status of attached disks.
   */
  attachedDisks?: {
    [key: string]: DiskStatus
  };
  /**
   * Status of the boot disk.
   */
  bootDisk?: DiskStatus;
  /**
   * Free RAM.
   */
  freeRamBytes?: bigint;
  /**
   * Total RAM.
   */
  totalRamBytes?: bigint;
  /**
   * System uptime.
   */
  uptimeSeconds?: bigint;
}

function serializeWorkerStatus(data: any): WorkerStatus {
  return {
    ...data,
    attachedDisks: data["attachedDisks"] !== undefined ? Object.fromEntries(Object.entries(data["attachedDisks"]).map(([k, v]: [string, any]) => ([k, serializeDiskStatus(v)]))) : undefined,
    bootDisk: data["bootDisk"] !== undefined ? serializeDiskStatus(data["bootDisk"]) : undefined,
    freeRamBytes: data["freeRamBytes"] !== undefined ? String(data["freeRamBytes"]) : undefined,
    totalRamBytes: data["totalRamBytes"] !== undefined ? String(data["totalRamBytes"]) : undefined,
    uptimeSeconds: data["uptimeSeconds"] !== undefined ? String(data["uptimeSeconds"]) : undefined,
  };
}

function deserializeWorkerStatus(data: any): WorkerStatus {
  return {
    ...data,
    attachedDisks: data["attachedDisks"] !== undefined ? Object.fromEntries(Object.entries(data["attachedDisks"]).map(([k, v]: [string, any]) => ([k, deserializeDiskStatus(v)]))) : undefined,
    bootDisk: data["bootDisk"] !== undefined ? deserializeDiskStatus(data["bootDisk"]) : undefined,
    freeRamBytes: data["freeRamBytes"] !== undefined ? BigInt(data["freeRamBytes"]) : undefined,
    totalRamBytes: data["totalRamBytes"] !== undefined ? BigInt(data["totalRamBytes"]) : undefined,
    uptimeSeconds: data["uptimeSeconds"] !== undefined ? BigInt(data["uptimeSeconds"]) : undefined,
  };
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
