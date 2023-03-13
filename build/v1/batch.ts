// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Batch API Client for Deno
 * =========================
 * 
 * An API to manage the running of batch jobs on Google Cloud Platform.
 * 
 * Docs: https://cloud.google.com/batch/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * An API to manage the running of batch jobs on Google Cloud Platform.
 */
export class Batch {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://batch.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
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
   * Create a Job.
   *
   * @param parent Required. The parent resource name where the Job will be created. Pattern: "projects/{project}/locations/{location}"
   */
  async projectsLocationsJobsCreate(parent: string, req: Job, opts: ProjectsLocationsJobsCreateOptions = {}): Promise<Job> {
    req = serializeJob(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/jobs`);
    if (opts.jobId !== undefined) {
      url.searchParams.append("jobId", String(opts.jobId));
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
    return deserializeJob(data);
  }

  /**
   * Delete a Job.
   *
   * @param name Job name.
   */
  async projectsLocationsJobsDelete(name: string, opts: ProjectsLocationsJobsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.reason !== undefined) {
      url.searchParams.append("reason", String(opts.reason));
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
   * Get a Job specified by its resource name.
   *
   * @param name Required. Job name.
   */
  async projectsLocationsJobsGet(name: string): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeJob(data);
  }

  /**
   * List all Jobs for a project within a region.
   *
   * @param parent Parent path.
   */
  async projectsLocationsJobsList(parent: string, opts: ProjectsLocationsJobsListOptions = {}): Promise<ListJobsResponse> {
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
    return deserializeListJobsResponse(data);
  }

  /**
   * Return a single Task.
   *
   * @param name Required. Task name.
   */
  async projectsLocationsJobsTaskGroupsTasksGet(name: string): Promise<Task> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTask(data);
  }

  /**
   * List Tasks associated with a job.
   *
   * @param parent Required. Name of a TaskGroup from which Tasks are being requested. Pattern: "projects/{project}/locations/{location}/jobs/{job}/taskGroups/{task_group}"
   */
  async projectsLocationsJobsTaskGroupsTasksList(parent: string, opts: ProjectsLocationsJobsTaskGroupsTasksListOptions = {}): Promise<ListTasksResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tasks`);
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
    return deserializeListTasksResponse(data);
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
   * Report agent's state, e.g. agent status and tasks information
   *
   * @param parent Required. Format: projects/{project}/locations/{location} {project} should be a project number.
   */
  async projectsLocationsStateReport(parent: string, req: ReportAgentStateRequest): Promise<ReportAgentStateResponse> {
    req = serializeReportAgentStateRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/state:report`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeReportAgentStateResponse(data);
  }
}

/**
 * Accelerator describes Compute Engine accelerators to be attached to the VM.
 */
export interface Accelerator {
  /**
   * The number of accelerators of this type.
   */
  count?: bigint;
  /**
   * Deprecated: please use instances[0].install_gpu_drivers instead.
   */
  installGpuDrivers?: boolean;
  /**
   * The accelerator type. For example, "nvidia-tesla-t4". See `gcloud compute
   * accelerator-types list`.
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
 * Conditions for actions to deal with task failures.
 */
export interface ActionCondition {
  /**
   * Exit codes of a task execution. If there are more than 1 exit codes, when
   * task executes with any of the exit code in the list, the condition is met
   * and the action will be executed.
   */
  exitCodes?: number[];
}

/**
 * VM Agent Info.
 */
export interface AgentInfo {
  /**
   * The assigned Job ID
   */
  jobId?: string;
  /**
   * When the AgentInfo is generated.
   */
  reportTime?: Date;
  /**
   * Agent state.
   */
  state?:  | "AGENT_STATE_UNSPECIFIED" | "AGENT_STARTING" | "AGENT_RUNNING" | "AGENT_STOPPED";
  /**
   * The assigned task group ID.
   */
  taskGroupId?: string;
  /**
   * Task Info.
   */
  tasks?: AgentTaskInfo[];
}

function serializeAgentInfo(data: any): AgentInfo {
  return {
    ...data,
    reportTime: data["reportTime"] !== undefined ? data["reportTime"].toISOString() : undefined,
    tasks: data["tasks"] !== undefined ? data["tasks"].map((item: any) => (serializeAgentTaskInfo(item))) : undefined,
  };
}

function deserializeAgentInfo(data: any): AgentInfo {
  return {
    ...data,
    reportTime: data["reportTime"] !== undefined ? new Date(data["reportTime"]) : undefined,
    tasks: data["tasks"] !== undefined ? data["tasks"].map((item: any) => (deserializeAgentTaskInfo(item))) : undefined,
  };
}

/**
 * VM Agent Metadata.
 */
export interface AgentMetadata {
  /**
   * When the VM agent started. Use agent_startup_time instead.
   */
  creationTime?: Date;
  /**
   * Full name of the entity that created this vm. For MIG, this path is:
   * projects/{project}/regions/{region}/InstanceGroupManagers/{igm} The value
   * is retrieved from the vm metadata key of "created-by".
   */
  creator?: string;
  /**
   * image version for the VM that this agent is installed on.
   */
  imageVersion?: string;
  /**
   * GCP instance name (go/instance-name).
   */
  instance?: string;
  /**
   * GCP instance ID (go/instance-id).
   */
  instanceId?: bigint;
  /**
   * If the GCP instance has received preemption notice.
   */
  instancePreemptionNoticeReceived?: boolean;
  /**
   * parsed contents of /etc/os-release
   */
  osRelease?: {
    [key: string]: string
  };
  /**
   * agent binary version running on VM
   */
  version?: string;
  /**
   * Agent zone.
   */
  zone?: string;
}

function serializeAgentMetadata(data: any): AgentMetadata {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? data["creationTime"].toISOString() : undefined,
    instanceId: data["instanceId"] !== undefined ? String(data["instanceId"]) : undefined,
  };
}

function deserializeAgentMetadata(data: any): AgentMetadata {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
    instanceId: data["instanceId"] !== undefined ? BigInt(data["instanceId"]) : undefined,
  };
}

/**
 * TODO(b/182501497) The message needs to be redefined when the Agent API
 * server updates data in storage per the backend design.
 */
export interface AgentTask {
  /**
   * The intended state of the task.
   */
  intendedState?:  | "INTENDED_STATE_UNSPECIFIED" | "ASSIGNED" | "CANCELLED" | "DELETED";
  /**
   * The highest barrier reached by all tasks in the task's TaskGroup.
   */
  reachedBarrier?: bigint;
  /**
   * Task Spec.
   */
  spec?: TaskSpec;
  /**
   * Task status.
   */
  status?: TaskStatus;
  /**
   * Task name.
   */
  task?: string;
}

function serializeAgentTask(data: any): AgentTask {
  return {
    ...data,
    reachedBarrier: data["reachedBarrier"] !== undefined ? String(data["reachedBarrier"]) : undefined,
    spec: data["spec"] !== undefined ? serializeTaskSpec(data["spec"]) : undefined,
    status: data["status"] !== undefined ? serializeTaskStatus(data["status"]) : undefined,
  };
}

function deserializeAgentTask(data: any): AgentTask {
  return {
    ...data,
    reachedBarrier: data["reachedBarrier"] !== undefined ? BigInt(data["reachedBarrier"]) : undefined,
    spec: data["spec"] !== undefined ? deserializeTaskSpec(data["spec"]) : undefined,
    status: data["status"] !== undefined ? deserializeTaskStatus(data["status"]) : undefined,
  };
}

/**
 * Task Info
 */
export interface AgentTaskInfo {
  /**
   * The highest index of a runnable started by the agent for this task. The
   * runnables are indexed from 1. Value 0 is undefined.
   */
  runnable?: bigint;
  /**
   * ID of the Task
   */
  taskId?: string;
  /**
   * The status of the Task. If we need agent specific fields we should fork
   * the public TaskStatus into an agent specific one. Or add them below.
   */
  taskStatus?: TaskStatus;
}

function serializeAgentTaskInfo(data: any): AgentTaskInfo {
  return {
    ...data,
    runnable: data["runnable"] !== undefined ? String(data["runnable"]) : undefined,
    taskStatus: data["taskStatus"] !== undefined ? serializeTaskStatus(data["taskStatus"]) : undefined,
  };
}

function deserializeAgentTaskInfo(data: any): AgentTaskInfo {
  return {
    ...data,
    runnable: data["runnable"] !== undefined ? BigInt(data["runnable"]) : undefined,
    taskStatus: data["taskStatus"] !== undefined ? deserializeTaskStatus(data["taskStatus"]) : undefined,
  };
}

/**
 * VM timing information
 */
export interface AgentTimingInfo {
  /**
   * Agent startup time
   */
  agentStartupTime?: Date;
  /**
   * Boot timestamp of the VM OS
   */
  bootTime?: Date;
  /**
   * Startup time of the Batch VM script.
   */
  scriptStartupTime?: Date;
}

function serializeAgentTimingInfo(data: any): AgentTimingInfo {
  return {
    ...data,
    agentStartupTime: data["agentStartupTime"] !== undefined ? data["agentStartupTime"].toISOString() : undefined,
    bootTime: data["bootTime"] !== undefined ? data["bootTime"].toISOString() : undefined,
    scriptStartupTime: data["scriptStartupTime"] !== undefined ? data["scriptStartupTime"].toISOString() : undefined,
  };
}

function deserializeAgentTimingInfo(data: any): AgentTimingInfo {
  return {
    ...data,
    agentStartupTime: data["agentStartupTime"] !== undefined ? new Date(data["agentStartupTime"]) : undefined,
    bootTime: data["bootTime"] !== undefined ? new Date(data["bootTime"]) : undefined,
    scriptStartupTime: data["scriptStartupTime"] !== undefined ? new Date(data["scriptStartupTime"]) : undefined,
  };
}

/**
 * A Job's resource allocation policy describes when, where, and how compute
 * resources should be allocated for the Job.
 */
export interface AllocationPolicy {
  /**
   * Describe instances that can be created by this AllocationPolicy. Only
   * instances[0] is supported now.
   */
  instances?: InstancePolicyOrTemplate[];
  /**
   * Labels applied to all VM instances and other resources created by
   * AllocationPolicy. Labels could be user provided or system generated. You
   * can assign up to 64 labels. [Google Compute Engine label
   * restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions)
   * apply. Label names that start with "goog-" or "google-" are reserved.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Location where compute resources should be allocated for the Job.
   */
  location?: LocationPolicy;
  /**
   * The network policy.
   */
  network?: NetworkPolicy;
  /**
   * Service account that VMs will run as.
   */
  serviceAccount?: ServiceAccount;
}

function serializeAllocationPolicy(data: any): AllocationPolicy {
  return {
    ...data,
    instances: data["instances"] !== undefined ? data["instances"].map((item: any) => (serializeInstancePolicyOrTemplate(item))) : undefined,
  };
}

function deserializeAllocationPolicy(data: any): AllocationPolicy {
  return {
    ...data,
    instances: data["instances"] !== undefined ? data["instances"].map((item: any) => (deserializeInstancePolicyOrTemplate(item))) : undefined,
  };
}

/**
 * A new or an existing persistent disk (PD) or a local ssd attached to a VM
 * instance.
 */
export interface AttachedDisk {
  /**
   * Device name that the guest operating system will see. It is used by
   * Runnable.volumes field to mount disks. So please specify the device_name if
   * you want Batch to help mount the disk, and it should match the device_name
   * field in volumes.
   */
  deviceName?: string;
  /**
   * Name of an existing PD.
   */
  existingDisk?: string;
  newDisk?: Disk;
}

function serializeAttachedDisk(data: any): AttachedDisk {
  return {
    ...data,
    newDisk: data["newDisk"] !== undefined ? serializeDisk(data["newDisk"]) : undefined,
  };
}

function deserializeAttachedDisk(data: any): AttachedDisk {
  return {
    ...data,
    newDisk: data["newDisk"] !== undefined ? deserializeDisk(data["newDisk"]) : undefined,
  };
}

/**
 * Barrier runnable blocks until all tasks in a taskgroup reach it.
 */
export interface Barrier {
  /**
   * Barriers are identified by their index in runnable list. Names are not
   * required, but if present should be an identifier.
   */
  name?: string;
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Compute resource requirements
 */
export interface ComputeResource {
  /**
   * Extra boot disk size in MiB for each task.
   */
  bootDiskMib?: bigint;
  /**
   * The milliCPU count.
   */
  cpuMilli?: bigint;
  /**
   * Memory in MiB.
   */
  memoryMib?: bigint;
}

function serializeComputeResource(data: any): ComputeResource {
  return {
    ...data,
    bootDiskMib: data["bootDiskMib"] !== undefined ? String(data["bootDiskMib"]) : undefined,
    cpuMilli: data["cpuMilli"] !== undefined ? String(data["cpuMilli"]) : undefined,
    memoryMib: data["memoryMib"] !== undefined ? String(data["memoryMib"]) : undefined,
  };
}

function deserializeComputeResource(data: any): ComputeResource {
  return {
    ...data,
    bootDiskMib: data["bootDiskMib"] !== undefined ? BigInt(data["bootDiskMib"]) : undefined,
    cpuMilli: data["cpuMilli"] !== undefined ? BigInt(data["cpuMilli"]) : undefined,
    memoryMib: data["memoryMib"] !== undefined ? BigInt(data["memoryMib"]) : undefined,
  };
}

/**
 * Container runnable.
 */
export interface Container {
  /**
   * If set to true, external network access to and from container will be
   * blocked, containers that are with block_external_network as true can still
   * communicate with each other, network cannot be specified in the
   * `container.options` field.
   */
  blockExternalNetwork?: boolean;
  /**
   * Overrides the `CMD` specified in the container. If there is an ENTRYPOINT
   * (either in the container image or with the entrypoint field below) then
   * commands are appended as arguments to the ENTRYPOINT.
   */
  commands?: string[];
  /**
   * Overrides the `ENTRYPOINT` specified in the container.
   */
  entrypoint?: string;
  /**
   * The URI to pull the container image from.
   */
  imageUri?: string;
  /**
   * Arbitrary additional options to include in the "docker run" command when
   * running this container, e.g. "--network host".
   */
  options?: string;
  /**
   * Optional password for logging in to a docker registry. If password matches
   * `projects/*\/secrets/*\/versions/*` then Batch will read the password from
   * the Secret Manager;
   */
  password?: string;
  /**
   * Optional username for logging in to a docker registry. If username matches
   * `projects/*\/secrets/*\/versions/*` then Batch will read the username from
   * the Secret Manager.
   */
  username?: string;
  /**
   * Volumes to mount (bind mount) from the host machine files or directories
   * into the container, formatted to match docker run's --volume option, e.g.
   * /foo:/bar, or /foo:/bar:ro
   */
  volumes?: string[];
}

/**
 * A new persistent disk or a local ssd. A VM can only have one local SSD
 * setting but multiple local SSD partitions. See
 * https://cloud.google.com/compute/docs/disks#pdspecs and
 * https://cloud.google.com/compute/docs/disks#localssds.
 */
export interface Disk {
  /**
   * Local SSDs are available through both "SCSI" and "NVMe" interfaces. If not
   * indicated, "NVMe" will be the default one for local ssds. We only support
   * "SCSI" for persistent disks now.
   */
  diskInterface?: string;
  /**
   * Name of a public or custom image used as the data source. For example, the
   * following are all valid URLs: * Specify the image by its family name:
   * projects/{project}/global/images/family/{image_family} * Specify the image
   * version: projects/{project}/global/images/{image_version} You can also use
   * Batch customized image in short names. The following image values are
   * supported for a boot disk: * "batch-debian": use Batch Debian images. *
   * "batch-centos": use Batch CentOS images. * "batch-cos": use Batch
   * Container-Optimized images.
   */
  image?: string;
  /**
   * Disk size in GB. For persistent disk, this field is ignored if
   * `data_source` is `image` or `snapshot`. For local SSD, size_gb should be a
   * multiple of 375GB, otherwise, the final size will be the next greater
   * multiple of 375 GB. For boot disk, Batch will calculate the boot disk size
   * based on source image and task requirements if you do not speicify the
   * size. If both this field and the boot_disk_mib field in task spec's
   * compute_resource are defined, Batch will only honor this field.
   */
  sizeGb?: bigint;
  /**
   * Name of a snapshot used as the data source. Snapshot is not supported as
   * boot disk now.
   */
  snapshot?: string;
  /**
   * Disk type as shown in `gcloud compute disk-types list`. For example, local
   * SSD uses type "local-ssd". Persistent disks and boot disks use
   * "pd-balanced", "pd-extreme", "pd-ssd" or "pd-standard".
   */
  type?: string;
}

function serializeDisk(data: any): Disk {
  return {
    ...data,
    sizeGb: data["sizeGb"] !== undefined ? String(data["sizeGb"]) : undefined,
  };
}

function deserializeDisk(data: any): Disk {
  return {
    ...data,
    sizeGb: data["sizeGb"] !== undefined ? BigInt(data["sizeGb"]) : undefined,
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
 * An Environment describes a collection of environment variables to set when
 * executing Tasks.
 */
export interface Environment {
  /**
   * An encrypted JSON dictionary where the key/value pairs correspond to
   * environment variable names and their values.
   */
  encryptedVariables?: KMSEnvMap;
  /**
   * A map of environment variable names to Secret Manager secret names. The VM
   * will access the named secrets to set the value of each environment
   * variable.
   */
  secretVariables?: {
    [key: string]: string
  };
  /**
   * A map of environment variable names to values.
   */
  variables?: {
    [key: string]: string
  };
}

/**
 * Represents a Google Cloud Storage volume.
 */
export interface GCS {
  /**
   * Remote path, either a bucket name or a subdirectory of a bucket, e.g.:
   * bucket_name, bucket_name/subdirectory/
   */
  remotePath?: string;
}

/**
 * InstancePolicy describes an instance type and resources attached to each VM
 * created by this InstancePolicy.
 */
export interface InstancePolicy {
  /**
   * The accelerators attached to each VM instance.
   */
  accelerators?: Accelerator[];
  /**
   * Boot disk to be created and attached to each VM by this InstancePolicy.
   * Boot disk will be deleted when the VM is deleted. Batch API now only
   * supports booting from image.
   */
  bootDisk?: Disk;
  /**
   * Non-boot disks to be attached for each VM created by this InstancePolicy.
   * New disks will be deleted when the VM is deleted.
   */
  disks?: AttachedDisk[];
  /**
   * The Compute Engine machine type.
   */
  machineType?: string;
  /**
   * The minimum CPU platform. See
   * https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform.
   * Not yet implemented.
   */
  minCpuPlatform?: string;
  /**
   * The provisioning model.
   */
  provisioningModel?:  | "PROVISIONING_MODEL_UNSPECIFIED" | "STANDARD" | "SPOT" | "PREEMPTIBLE";
}

function serializeInstancePolicy(data: any): InstancePolicy {
  return {
    ...data,
    accelerators: data["accelerators"] !== undefined ? data["accelerators"].map((item: any) => (serializeAccelerator(item))) : undefined,
    bootDisk: data["bootDisk"] !== undefined ? serializeDisk(data["bootDisk"]) : undefined,
    disks: data["disks"] !== undefined ? data["disks"].map((item: any) => (serializeAttachedDisk(item))) : undefined,
  };
}

function deserializeInstancePolicy(data: any): InstancePolicy {
  return {
    ...data,
    accelerators: data["accelerators"] !== undefined ? data["accelerators"].map((item: any) => (deserializeAccelerator(item))) : undefined,
    bootDisk: data["bootDisk"] !== undefined ? deserializeDisk(data["bootDisk"]) : undefined,
    disks: data["disks"] !== undefined ? data["disks"].map((item: any) => (deserializeAttachedDisk(item))) : undefined,
  };
}

/**
 * Either an InstancePolicy or an instance template.
 */
export interface InstancePolicyOrTemplate {
  /**
   * Set this field true if users want Batch to help fetch drivers from a third
   * party location and install them for GPUs specified in policy.accelerators
   * or instance_template on their behalf. Default is false.
   */
  installGpuDrivers?: boolean;
  /**
   * Name of an instance template used to create VMs. Named the field as
   * 'instance_template' instead of 'template' to avoid c++ keyword conflict.
   */
  instanceTemplate?: string;
  /**
   * InstancePolicy.
   */
  policy?: InstancePolicy;
}

function serializeInstancePolicyOrTemplate(data: any): InstancePolicyOrTemplate {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeInstancePolicy(data["policy"]) : undefined,
  };
}

function deserializeInstancePolicyOrTemplate(data: any): InstancePolicyOrTemplate {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializeInstancePolicy(data["policy"]) : undefined,
  };
}

/**
 * VM instance status.
 */
export interface InstanceStatus {
  /**
   * The VM boot disk.
   */
  bootDisk?: Disk;
  /**
   * The Compute Engine machine type.
   */
  machineType?: string;
  /**
   * The VM instance provisioning model.
   */
  provisioningModel?:  | "PROVISIONING_MODEL_UNSPECIFIED" | "STANDARD" | "SPOT" | "PREEMPTIBLE";
  /**
   * The max number of tasks can be assigned to this instance type.
   */
  taskPack?: bigint;
}

function serializeInstanceStatus(data: any): InstanceStatus {
  return {
    ...data,
    bootDisk: data["bootDisk"] !== undefined ? serializeDisk(data["bootDisk"]) : undefined,
    taskPack: data["taskPack"] !== undefined ? String(data["taskPack"]) : undefined,
  };
}

function deserializeInstanceStatus(data: any): InstanceStatus {
  return {
    ...data,
    bootDisk: data["bootDisk"] !== undefined ? deserializeDisk(data["bootDisk"]) : undefined,
    taskPack: data["taskPack"] !== undefined ? BigInt(data["taskPack"]) : undefined,
  };
}

/**
 * The Cloud Batch Job description.
 */
export interface Job {
  /**
   * Compute resource allocation for all TaskGroups in the Job.
   */
  allocationPolicy?: AllocationPolicy;
  /**
   * Output only. When the Job was created.
   */
  readonly createTime?: Date;
  /**
   * Labels for the Job. Labels could be user provided or system generated. For
   * example, "labels": { "department": "finance", "environment": "test" } You
   * can assign up to 64 labels. [Google Compute Engine label
   * restrictions](https://cloud.google.com/compute/docs/labeling-resources#restrictions)
   * apply. Label names that start with "goog-" or "google-" are reserved.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Log preservation policy for the Job.
   */
  logsPolicy?: LogsPolicy;
  /**
   * Output only. Job name. For example:
   * "projects/123456/locations/us-central1/jobs/job01".
   */
  readonly name?: string;
  /**
   * Notification configurations.
   */
  notifications?: JobNotification[];
  /**
   * Priority of the Job. The valid value range is [0, 100). Default value is
   * 0. Higher value indicates higher priority. A job with higher priority value
   * is more likely to run earlier if all other requirements are satisfied.
   */
  priority?: bigint;
  /**
   * Output only. Job status. It is read only for users.
   */
  readonly status?: JobStatus;
  /**
   * Required. TaskGroups in the Job. Only one TaskGroup is supported now.
   */
  taskGroups?: TaskGroup[];
  /**
   * Output only. A system generated unique ID (in UUID4 format) for the Job.
   */
  readonly uid?: string;
  /**
   * Output only. The last time the Job was updated.
   */
  readonly updateTime?: Date;
}

function serializeJob(data: any): Job {
  return {
    ...data,
    allocationPolicy: data["allocationPolicy"] !== undefined ? serializeAllocationPolicy(data["allocationPolicy"]) : undefined,
    priority: data["priority"] !== undefined ? String(data["priority"]) : undefined,
    taskGroups: data["taskGroups"] !== undefined ? data["taskGroups"].map((item: any) => (serializeTaskGroup(item))) : undefined,
  };
}

function deserializeJob(data: any): Job {
  return {
    ...data,
    allocationPolicy: data["allocationPolicy"] !== undefined ? deserializeAllocationPolicy(data["allocationPolicy"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    priority: data["priority"] !== undefined ? BigInt(data["priority"]) : undefined,
    status: data["status"] !== undefined ? deserializeJobStatus(data["status"]) : undefined,
    taskGroups: data["taskGroups"] !== undefined ? data["taskGroups"].map((item: any) => (deserializeTaskGroup(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Notification configurations.
 */
export interface JobNotification {
  /**
   * The attribute requirements of messages to be sent to this Pub/Sub topic.
   * Without this field, no message will be sent.
   */
  message?: Message;
  /**
   * The Pub/Sub topic where notifications like the job state changes will be
   * published. This topic exist in the same project as the job and billings
   * will be charged to this project. If not specified, no Pub/Sub messages will
   * be sent. Topic format: `projects/{project}/topics/{topic}`.
   */
  pubsubTopic?: string;
}

/**
 * Job status.
 */
export interface JobStatus {
  /**
   * The duration of time that the Job spent in status RUNNING.
   */
  runDuration?: number /* Duration */;
  /**
   * Job state
   */
  state?:  | "STATE_UNSPECIFIED" | "QUEUED" | "SCHEDULED" | "RUNNING" | "SUCCEEDED" | "FAILED" | "DELETION_IN_PROGRESS";
  /**
   * Job status events
   */
  statusEvents?: StatusEvent[];
  /**
   * Aggregated task status for each TaskGroup in the Job. The map key is
   * TaskGroup ID.
   */
  taskGroups?: {
    [key: string]: TaskGroupStatus
  };
}

function serializeJobStatus(data: any): JobStatus {
  return {
    ...data,
    runDuration: data["runDuration"] !== undefined ? data["runDuration"] : undefined,
    statusEvents: data["statusEvents"] !== undefined ? data["statusEvents"].map((item: any) => (serializeStatusEvent(item))) : undefined,
    taskGroups: data["taskGroups"] !== undefined ? Object.fromEntries(Object.entries(data["taskGroups"]).map(([k, v]: [string, any]) => ([k, serializeTaskGroupStatus(v)]))) : undefined,
  };
}

function deserializeJobStatus(data: any): JobStatus {
  return {
    ...data,
    runDuration: data["runDuration"] !== undefined ? data["runDuration"] : undefined,
    statusEvents: data["statusEvents"] !== undefined ? data["statusEvents"].map((item: any) => (deserializeStatusEvent(item))) : undefined,
    taskGroups: data["taskGroups"] !== undefined ? Object.fromEntries(Object.entries(data["taskGroups"]).map(([k, v]: [string, any]) => ([k, deserializeTaskGroupStatus(v)]))) : undefined,
  };
}

export interface KMSEnvMap {
  /**
   * The value of the cipherText response from the `encrypt` method.
   */
  cipherText?: string;
  /**
   * The name of the KMS key that will be used to decrypt the cipher text.
   */
  keyName?: string;
}

/**
 * LifecyclePolicy describes how to deal with task failures based on different
 * conditions.
 */
export interface LifecyclePolicy {
  /**
   * Action to execute when ActionCondition is true. When RETRY_TASK is
   * specified, we will retry failed tasks if we notice any exit code match and
   * fail tasks if no match is found. Likewise, when FAIL_TASK is specified, we
   * will fail tasks if we notice any exit code match and retry tasks if no
   * match is found.
   */
  action?:  | "ACTION_UNSPECIFIED" | "RETRY_TASK" | "FAIL_TASK";
  /**
   * Conditions that decide why a task failure is dealt with a specific action.
   */
  actionCondition?: ActionCondition;
}

/**
 * ListJob Response.
 */
export interface ListJobsResponse {
  /**
   * Jobs.
   */
  jobs?: Job[];
  /**
   * Next page token.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
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
 * ListTasks Response.
 */
export interface ListTasksResponse {
  /**
   * Next page token.
   */
  nextPageToken?: string;
  /**
   * Tasks.
   */
  tasks?: Task[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

function serializeListTasksResponse(data: any): ListTasksResponse {
  return {
    ...data,
    tasks: data["tasks"] !== undefined ? data["tasks"].map((item: any) => (serializeTask(item))) : undefined,
  };
}

function deserializeListTasksResponse(data: any): ListTasksResponse {
  return {
    ...data,
    tasks: data["tasks"] !== undefined ? data["tasks"].map((item: any) => (deserializeTask(item))) : undefined,
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

export interface LocationPolicy {
  /**
   * A list of allowed location names represented by internal URLs. Each
   * location can be a region or a zone. Only one region or multiple zones in
   * one region is supported now. For example, ["regions/us-central1"] allow VMs
   * in any zones in region us-central1. ["zones/us-central1-a",
   * "zones/us-central1-c"] only allow VMs in zones us-central1-a and
   * us-central1-c. All locations end up in different regions would cause
   * errors. For example, ["regions/us-central1", "zones/us-central1-a",
   * "zones/us-central1-b", "zones/us-west1-a"] contains 2 regions "us-central1"
   * and "us-west1". An error is expected in this case.
   */
  allowedLocations?: string[];
}

/**
 * LogsPolicy describes how outputs from a Job's Tasks (stdout/stderr) will be
 * preserved.
 */
export interface LogsPolicy {
  /**
   * Where logs should be saved.
   */
  destination?:  | "DESTINATION_UNSPECIFIED" | "CLOUD_LOGGING" | "PATH";
  /**
   * The path to which logs are saved when the destination = PATH. This can be
   * a local file path on the VM, or under the mount point of a Persistent Disk
   * or Filestore, or a Cloud Storage path.
   */
  logsPath?: string;
}

/**
 * Message details. Describe the attribute that a message should have. Without
 * specified message attributes, no message will be sent by default.
 */
export interface Message {
  /**
   * The new job state.
   */
  newJobState?:  | "STATE_UNSPECIFIED" | "QUEUED" | "SCHEDULED" | "RUNNING" | "SUCCEEDED" | "FAILED" | "DELETION_IN_PROGRESS";
  /**
   * The new task state.
   */
  newTaskState?:  | "STATE_UNSPECIFIED" | "PENDING" | "ASSIGNED" | "RUNNING" | "FAILED" | "SUCCEEDED";
  /**
   * The message type.
   */
  type?:  | "TYPE_UNSPECIFIED" | "JOB_STATE_CHANGED" | "TASK_STATE_CHANGED";
}

/**
 * A network interface.
 */
export interface NetworkInterface {
  /**
   * The URL of an existing network resource. You can specify the network as a
   * full or partial URL. For example, the following are all valid URLs: *
   * https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}
   * * projects/{project}/global/networks/{network} * global/networks/{network}
   */
  network?: string;
  /**
   * Default is false (with an external IP address). Required if no external
   * public IP address is attached to the VM. If no external public IP address,
   * additional configuration is required to allow the VM to access Google
   * Services. See
   * https://cloud.google.com/vpc/docs/configure-private-google-access and
   * https://cloud.google.com/nat/docs/gce-example#create-nat for more
   * information.
   */
  noExternalIpAddress?: boolean;
  /**
   * The URL of an existing subnetwork resource in the network. You can specify
   * the subnetwork as a full or partial URL. For example, the following are all
   * valid URLs: *
   * https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/subnetworks/{subnetwork}
   * * projects/{project}/regions/{region}/subnetworks/{subnetwork} *
   * regions/{region}/subnetworks/{subnetwork}
   */
  subnetwork?: string;
}

/**
 * NetworkPolicy describes VM instance network configurations.
 */
export interface NetworkPolicy {
  /**
   * Network configurations.
   */
  networkInterfaces?: NetworkInterface[];
}

/**
 * Represents an NFS volume.
 */
export interface NFS {
  /**
   * Remote source path exported from the NFS, e.g., "/share".
   */
  remotePath?: string;
  /**
   * The IP address of the NFS.
   */
  server?: string;
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
 * Additional options for Batch#projectsLocationsJobsCreate.
 */
export interface ProjectsLocationsJobsCreateOptions {
  /**
   * ID used to uniquely identify the Job within its parent scope. This field
   * should contain at most 63 characters and must start with lowercase
   * characters. Only lowercase characters, numbers and '-' are accepted. The
   * '-' character cannot be the first or the last one. A system generated ID
   * will be used if the field is not set. The job.name field in the request
   * will be ignored and the created resource name of the Job will be
   * "{parent}/jobs/{job_id}".
   */
  jobId?: string;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes since the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for Batch#projectsLocationsJobsDelete.
 */
export interface ProjectsLocationsJobsDeleteOptions {
  /**
   * Optional. Reason for this deletion.
   */
  reason?: string;
  /**
   * Optional. An optional request ID to identify requests. Specify a unique
   * request ID so that if you must retry your request, the server will know to
   * ignore the request if it has already been completed. The server will
   * guarantee that for at least 60 minutes after the first request. For
   * example, consider a situation where you make an initial request and the
   * request times out. If you make the request again with the same request ID,
   * the server can check if original operation with the same request ID was
   * received, and if so, will ignore the second request. This prevents clients
   * from accidentally creating duplicate commitments. The request ID must be a
   * valid UUID with the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for Batch#projectsLocationsJobsList.
 */
export interface ProjectsLocationsJobsListOptions {
  /**
   * List filter.
   */
  filter?: string;
  /**
   * Page size.
   */
  pageSize?: number;
  /**
   * Page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Batch#projectsLocationsJobsTaskGroupsTasksList.
 */
export interface ProjectsLocationsJobsTaskGroupsTasksListOptions {
  /**
   * Task filter, null filter matches all Tasks. Filter string should be of the
   * format State=TaskStatus.State e.g. State=RUNNING
   */
  filter?: string;
  /**
   * Page size.
   */
  pageSize?: number;
  /**
   * Page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Batch#projectsLocationsList.
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
 * Additional options for Batch#projectsLocationsOperationsList.
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
 * Request to report agent's state. The Request itself implies the agent is
 * healthy.
 */
export interface ReportAgentStateRequest {
  /**
   * Agent info.
   */
  agentInfo?: AgentInfo;
  /**
   * Agent timing info.
   */
  agentTimingInfo?: AgentTimingInfo;
  /**
   * Agent metadata.
   */
  metadata?: AgentMetadata;
}

function serializeReportAgentStateRequest(data: any): ReportAgentStateRequest {
  return {
    ...data,
    agentInfo: data["agentInfo"] !== undefined ? serializeAgentInfo(data["agentInfo"]) : undefined,
    agentTimingInfo: data["agentTimingInfo"] !== undefined ? serializeAgentTimingInfo(data["agentTimingInfo"]) : undefined,
    metadata: data["metadata"] !== undefined ? serializeAgentMetadata(data["metadata"]) : undefined,
  };
}

function deserializeReportAgentStateRequest(data: any): ReportAgentStateRequest {
  return {
    ...data,
    agentInfo: data["agentInfo"] !== undefined ? deserializeAgentInfo(data["agentInfo"]) : undefined,
    agentTimingInfo: data["agentTimingInfo"] !== undefined ? deserializeAgentTimingInfo(data["agentTimingInfo"]) : undefined,
    metadata: data["metadata"] !== undefined ? deserializeAgentMetadata(data["metadata"]) : undefined,
  };
}

/**
 * Response to ReportAgentStateRequest.
 */
export interface ReportAgentStateResponse {
  /**
   * Default report interval override
   */
  defaultReportInterval?: number /* Duration */;
  /**
   * Minimum report interval override
   */
  minReportInterval?: number /* Duration */;
  /**
   * Tasks assigned to the agent
   */
  tasks?: AgentTask[];
}

function serializeReportAgentStateResponse(data: any): ReportAgentStateResponse {
  return {
    ...data,
    defaultReportInterval: data["defaultReportInterval"] !== undefined ? data["defaultReportInterval"] : undefined,
    minReportInterval: data["minReportInterval"] !== undefined ? data["minReportInterval"] : undefined,
    tasks: data["tasks"] !== undefined ? data["tasks"].map((item: any) => (serializeAgentTask(item))) : undefined,
  };
}

function deserializeReportAgentStateResponse(data: any): ReportAgentStateResponse {
  return {
    ...data,
    defaultReportInterval: data["defaultReportInterval"] !== undefined ? data["defaultReportInterval"] : undefined,
    minReportInterval: data["minReportInterval"] !== undefined ? data["minReportInterval"] : undefined,
    tasks: data["tasks"] !== undefined ? data["tasks"].map((item: any) => (deserializeAgentTask(item))) : undefined,
  };
}

/**
 * Runnable describes instructions for executing a specific script or container
 * as part of a Task.
 */
export interface Runnable {
  /**
   * By default, after a Runnable fails, no further Runnable are executed. This
   * flag indicates that this Runnable must be run even if the Task has already
   * failed. This is useful for Runnables that copy output files off of the VM
   * or for debugging. The always_run flag does not override the Task's overall
   * max_run_duration. If the max_run_duration has expired then no further
   * Runnables will execute, not even always_run Runnables.
   */
  alwaysRun?: boolean;
  /**
   * This flag allows a Runnable to continue running in the background while
   * the Task executes subsequent Runnables. This is useful to provide services
   * to other Runnables (or to provide debugging support tools like SSH
   * servers).
   */
  background?: boolean;
  /**
   * Barrier runnable.
   */
  barrier?: Barrier;
  /**
   * Container runnable.
   */
  container?: Container;
  /**
   * Environment variables for this Runnable (overrides variables set for the
   * whole Task or TaskGroup).
   */
  environment?: Environment;
  /**
   * Normally, a non-zero exit status causes the Task to fail. This flag allows
   * execution of other Runnables to continue instead.
   */
  ignoreExitStatus?: boolean;
  /**
   * Script runnable.
   */
  script?: Script;
  /**
   * Timeout for this Runnable.
   */
  timeout?: number /* Duration */;
}

function serializeRunnable(data: any): Runnable {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeRunnable(data: any): Runnable {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * Script runnable.
 */
export interface Script {
  /**
   * Script file path on the host VM. To specify an interpreter, please add a
   * `#!`(also known as [shebang
   * line](https://en.wikipedia.org/wiki/Shebang_(Unix))) as the first line of
   * the file.(For example, to execute the script using bash, `#!/bin/bash`
   * should be the first line of the file. To execute the script using`Python3`,
   * `#!/usr/bin/env python3` should be the first line of the file.) Otherwise,
   * the file will by default be excuted by `/bin/sh`.
   */
  path?: string;
  /**
   * Shell script text. To specify an interpreter, please add a `#!\n` at the
   * beginning of the text.(For example, to execute the script using bash,
   * `#!/bin/bash\n` should be added. To execute the script using`Python3`,
   * `#!/usr/bin/env python3\n` should be added.) Otherwise, the script will by
   * default be excuted by `/bin/sh`.
   */
  text?: string;
}

/**
 * Carries information about a Google Cloud service account.
 */
export interface ServiceAccount {
  /**
   * Email address of the service account. If not specified, the default
   * Compute Engine service account for the project will be used. If instance
   * template is being used, the service account has to be specified in the
   * instance template and it has to match the email field here.
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
 * Status event
 */
export interface StatusEvent {
  /**
   * Description of the event.
   */
  description?: string;
  /**
   * The time this event occurred.
   */
  eventTime?: Date;
  /**
   * Task Execution
   */
  taskExecution?: TaskExecution;
  /**
   * Task State
   */
  taskState?:  | "STATE_UNSPECIFIED" | "PENDING" | "ASSIGNED" | "RUNNING" | "FAILED" | "SUCCEEDED";
  /**
   * Type of the event.
   */
  type?: string;
}

function serializeStatusEvent(data: any): StatusEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? data["eventTime"].toISOString() : undefined,
  };
}

function deserializeStatusEvent(data: any): StatusEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? new Date(data["eventTime"]) : undefined,
  };
}

/**
 * A Cloud Batch task.
 */
export interface Task {
  /**
   * Task name. The name is generated from the parent TaskGroup name and 'id'
   * field. For example:
   * "projects/123456/locations/us-west1/jobs/job01/taskGroups/group01/tasks/task01".
   */
  name?: string;
  /**
   * Task Status.
   */
  status?: TaskStatus;
}

function serializeTask(data: any): Task {
  return {
    ...data,
    status: data["status"] !== undefined ? serializeTaskStatus(data["status"]) : undefined,
  };
}

function deserializeTask(data: any): Task {
  return {
    ...data,
    status: data["status"] !== undefined ? deserializeTaskStatus(data["status"]) : undefined,
  };
}

/**
 * This Task Execution field includes detail information for task execution
 * procedures, based on StatusEvent types.
 */
export interface TaskExecution {
  /**
   * When task is completed as the status of FAILED or SUCCEEDED, exit code is
   * for one task execution result, default is 0 as success.
   */
  exitCode?: number;
}

/**
 * A TaskGroup contains one or multiple Tasks that share the same Runnable but
 * with different runtime parameters.
 */
export interface TaskGroup {
  /**
   * Output only. TaskGroup name. The system generates this field based on
   * parent Job name. For example:
   * "projects/123456/locations/us-west1/jobs/job01/taskGroups/group01".
   */
  readonly name?: string;
  /**
   * Max number of tasks that can run in parallel. Default to min(task_count,
   * 1000).
   */
  parallelism?: bigint;
  /**
   * When true, Batch will configure SSH to allow passwordless login between
   * VMs running the Batch tasks in the same TaskGroup.
   */
  permissiveSsh?: boolean;
  /**
   * When true, Batch will populate a file with a list of all VMs assigned to
   * the TaskGroup and set the BATCH_HOSTS_FILE environment variable to the path
   * of that file. Defaults to false.
   */
  requireHostsFile?: boolean;
  /**
   * Number of Tasks in the TaskGroup. Default is 1.
   */
  taskCount?: bigint;
  /**
   * Max number of tasks that can be run on a VM at the same time. If not
   * specified, the system will decide a value based on available compute
   * resources on a VM and task requirements.
   */
  taskCountPerNode?: bigint;
  /**
   * An array of environment variable mappings, which are passed to Tasks with
   * matching indices. If task_environments is used then task_count should not
   * be specified in the request (and will be ignored). Task count will be the
   * length of task_environments. Tasks get a BATCH_TASK_INDEX and
   * BATCH_TASK_COUNT environment variable, in addition to any environment
   * variables set in task_environments, specifying the number of Tasks in the
   * Task's parent TaskGroup, and the specific Task's index in the TaskGroup (0
   * through BATCH_TASK_COUNT - 1). task_environments supports up to 200
   * entries.
   */
  taskEnvironments?: Environment[];
  /**
   * Required. Tasks in the group share the same task spec.
   */
  taskSpec?: TaskSpec;
}

function serializeTaskGroup(data: any): TaskGroup {
  return {
    ...data,
    parallelism: data["parallelism"] !== undefined ? String(data["parallelism"]) : undefined,
    taskCount: data["taskCount"] !== undefined ? String(data["taskCount"]) : undefined,
    taskCountPerNode: data["taskCountPerNode"] !== undefined ? String(data["taskCountPerNode"]) : undefined,
    taskSpec: data["taskSpec"] !== undefined ? serializeTaskSpec(data["taskSpec"]) : undefined,
  };
}

function deserializeTaskGroup(data: any): TaskGroup {
  return {
    ...data,
    parallelism: data["parallelism"] !== undefined ? BigInt(data["parallelism"]) : undefined,
    taskCount: data["taskCount"] !== undefined ? BigInt(data["taskCount"]) : undefined,
    taskCountPerNode: data["taskCountPerNode"] !== undefined ? BigInt(data["taskCountPerNode"]) : undefined,
    taskSpec: data["taskSpec"] !== undefined ? deserializeTaskSpec(data["taskSpec"]) : undefined,
  };
}

/**
 * Aggregated task status for a TaskGroup.
 */
export interface TaskGroupStatus {
  /**
   * Count of task in each state in the TaskGroup. The map key is task state
   * name.
   */
  counts?: {
    [key: string]: bigint
  };
  /**
   * Status of instances allocated for the TaskGroup.
   */
  instances?: InstanceStatus[];
}

function serializeTaskGroupStatus(data: any): TaskGroupStatus {
  return {
    ...data,
    counts: data["counts"] !== undefined ? Object.fromEntries(Object.entries(data["counts"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
    instances: data["instances"] !== undefined ? data["instances"].map((item: any) => (serializeInstanceStatus(item))) : undefined,
  };
}

function deserializeTaskGroupStatus(data: any): TaskGroupStatus {
  return {
    ...data,
    counts: data["counts"] !== undefined ? Object.fromEntries(Object.entries(data["counts"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
    instances: data["instances"] !== undefined ? data["instances"].map((item: any) => (deserializeInstanceStatus(item))) : undefined,
  };
}

/**
 * Spec of a task
 */
export interface TaskSpec {
  /**
   * ComputeResource requirements.
   */
  computeResource?: ComputeResource;
  /**
   * Environment variables to set before running the Task.
   */
  environment?: Environment;
  /**
   * Deprecated: please use environment(non-plural) instead.
   */
  environments?: {
    [key: string]: string
  };
  /**
   * Lifecycle management schema when any task in a task group is failed.
   * Currently we only support one lifecycle policy. When the lifecycle policy
   * condition is met, the action in the policy will execute. If task execution
   * result does not meet with the defined lifecycle policy, we consider it as
   * the default policy. Default policy means if the exit code is 0, exit task.
   * If task ends with non-zero exit code, retry the task with max_retry_count.
   */
  lifecyclePolicies?: LifecyclePolicy[];
  /**
   * Maximum number of retries on failures. The default, 0, which means never
   * retry. The valid value range is [0, 10].
   */
  maxRetryCount?: number;
  /**
   * Maximum duration the task should run. The task will be killed and marked
   * as FAILED if over this limit.
   */
  maxRunDuration?: number /* Duration */;
  /**
   * The sequence of scripts or containers to run for this Task. Each Task
   * using this TaskSpec executes its list of runnables in order. The Task
   * succeeds if all of its runnables either exit with a zero status or any that
   * exit with a non-zero status have the ignore_exit_status flag. Background
   * runnables are killed automatically (if they have not already exited) a
   * short time after all foreground runnables have completed. Even though this
   * is likely to result in a non-zero exit status for the background runnable,
   * these automatic kills are not treated as Task failures.
   */
  runnables?: Runnable[];
  /**
   * Volumes to mount before running Tasks using this TaskSpec.
   */
  volumes?: Volume[];
}

function serializeTaskSpec(data: any): TaskSpec {
  return {
    ...data,
    computeResource: data["computeResource"] !== undefined ? serializeComputeResource(data["computeResource"]) : undefined,
    maxRunDuration: data["maxRunDuration"] !== undefined ? data["maxRunDuration"] : undefined,
    runnables: data["runnables"] !== undefined ? data["runnables"].map((item: any) => (serializeRunnable(item))) : undefined,
  };
}

function deserializeTaskSpec(data: any): TaskSpec {
  return {
    ...data,
    computeResource: data["computeResource"] !== undefined ? deserializeComputeResource(data["computeResource"]) : undefined,
    maxRunDuration: data["maxRunDuration"] !== undefined ? data["maxRunDuration"] : undefined,
    runnables: data["runnables"] !== undefined ? data["runnables"].map((item: any) => (deserializeRunnable(item))) : undefined,
  };
}

/**
 * Status of a task
 */
export interface TaskStatus {
  /**
   * Task state
   */
  state?:  | "STATE_UNSPECIFIED" | "PENDING" | "ASSIGNED" | "RUNNING" | "FAILED" | "SUCCEEDED";
  /**
   * Detailed info about why the state is reached.
   */
  statusEvents?: StatusEvent[];
}

function serializeTaskStatus(data: any): TaskStatus {
  return {
    ...data,
    statusEvents: data["statusEvents"] !== undefined ? data["statusEvents"].map((item: any) => (serializeStatusEvent(item))) : undefined,
  };
}

function deserializeTaskStatus(data: any): TaskStatus {
  return {
    ...data,
    statusEvents: data["statusEvents"] !== undefined ? data["statusEvents"].map((item: any) => (deserializeStatusEvent(item))) : undefined,
  };
}

/**
 * Volume describes a volume and parameters for it to be mounted to a VM.
 */
export interface Volume {
  /**
   * Device name of an attached disk volume, which should align with a
   * device_name specified by
   * job.allocation_policy.instances[0].policy.disks[i].device_name or defined
   * by the given instance template in
   * job.allocation_policy.instances[0].instance_template.
   */
  deviceName?: string;
  /**
   * A Google Cloud Storage (GCS) volume.
   */
  gcs?: GCS;
  /**
   * For Google Cloud Storage (GCS), mount options are the options supported by
   * the gcsfuse tool (https://github.com/GoogleCloudPlatform/gcsfuse). For
   * existing persistent disks, mount options provided by the mount command
   * (https://man7.org/linux/man-pages/man8/mount.8.html) except writing are
   * supported. This is due to restrictions of multi-writer mode
   * (https://cloud.google.com/compute/docs/disks/sharing-disks-between-vms).
   * For other attached disks and Network File System (NFS), mount options are
   * these supported by the mount command
   * (https://man7.org/linux/man-pages/man8/mount.8.html).
   */
  mountOptions?: string[];
  /**
   * The mount path for the volume, e.g. /mnt/disks/share.
   */
  mountPath?: string;
  /**
   * A Network File System (NFS) volume. For example, a Filestore file share.
   */
  nfs?: NFS;
}