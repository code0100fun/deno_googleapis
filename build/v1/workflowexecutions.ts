// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Workflow Executions API Client for Deno
 * =======================================
 * 
 * Execute workflows created with Workflows API.
 * 
 * Docs: https://cloud.google.com/workflows
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Execute workflows created with Workflows API.
 */
export class WorkflowExecutions {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://workflowexecutions.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Cancels an execution of the given name.
   *
   * @param name Required. Name of the execution to be cancelled. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution}
   */
  async projectsLocationsWorkflowsExecutionsCancel(name: string, req: CancelExecutionRequest): Promise<Execution> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Execution;
  }

  /**
   * Creates a new execution using the latest revision of the given workflow.
   *
   * @param parent Required. Name of the workflow for which an execution should be created. Format: projects/{project}/locations/{location}/workflows/{workflow} The latest revision of the workflow will be used.
   */
  async projectsLocationsWorkflowsExecutionsCreate(parent: string, req: Execution): Promise<Execution> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/executions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Execution;
  }

  /**
   * Returns an execution of the given name.
   *
   * @param name Required. Name of the execution to be retrieved. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution}
   */
  async projectsLocationsWorkflowsExecutionsGet(name: string, opts: ProjectsLocationsWorkflowsExecutionsGetOptions = {}): Promise<Execution> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Execution;
  }

  /**
   * Returns a list of executions which belong to the workflow with the given
   * name. The method returns executions of all workflow revisions. Returned
   * executions are ordered by their start time (newest first).
   *
   * @param parent Required. Name of the workflow for which the executions should be listed. Format: projects/{project}/locations/{location}/workflows/{workflow}
   */
  async projectsLocationsWorkflowsExecutionsList(parent: string, opts: ProjectsLocationsWorkflowsExecutionsListOptions = {}): Promise<ListExecutionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/executions`);
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
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListExecutionsResponse;
  }

  /**
   * Triggers a new execution using the latest revision of the given workflow
   * by a Pub/Sub push notification.
   *
   * @param workflow Required. Name of the workflow for which an execution should be created. Format: projects/{project}/locations/{location}/workflows/{workflow}
   */
  async projectsLocationsWorkflowsTriggerPubsubExecution(workflow: string, req: TriggerPubsubExecutionRequest): Promise<Execution> {
    req = serializeTriggerPubsubExecutionRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ workflow }:triggerPubsubExecution`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Execution;
  }
}

/**
 * Request for the CancelExecution method.
 */
export interface CancelExecutionRequest {
}

/**
 * Error describes why the execution was abnormally terminated.
 */
export interface Error {
  /**
   * Human-readable stack trace string.
   */
  context?: string;
  /**
   * Error message and data returned represented as a JSON string.
   */
  payload?: string;
  /**
   * Stack trace with detailed information of where error was generated.
   */
  stackTrace?: StackTrace;
}

function serializeError(data: any): Error {
  return {
    ...data,
    stackTrace: data["stackTrace"] !== undefined ? serializeStackTrace(data["stackTrace"]) : undefined,
  };
}

function deserializeError(data: any): Error {
  return {
    ...data,
    stackTrace: data["stackTrace"] !== undefined ? deserializeStackTrace(data["stackTrace"]) : undefined,
  };
}

/**
 * A running instance of a
 * [Workflow](/workflows/docs/reference/rest/v1/projects.locations.workflows).
 */
export interface Execution {
  /**
   * Input parameters of the execution represented as a JSON string. The size
   * limit is 32KB. *Note*: If you are using the REST API directly to run your
   * workflow, you must escape any JSON string value of `argument`. Example:
   * `'{"argument":"{\"firstName\":\"FIRST\",\"lastName\":\"LAST\"}"}'`
   */
  argument?: string;
  /**
   * The call logging level associated to this execution.
   */
  callLogLevel?:  | "CALL_LOG_LEVEL_UNSPECIFIED" | "LOG_ALL_CALLS" | "LOG_ERRORS_ONLY";
  /**
   * Output only. Measures the duration of the execution.
   */
  readonly duration?: number /* Duration */;
  /**
   * Output only. Marks the end of execution, successful or not.
   */
  readonly endTime?: Date;
  /**
   * Output only. The error which caused the execution to finish prematurely.
   * The value is only present if the execution's state is `FAILED` or
   * `CANCELLED`.
   */
  readonly error?: Error;
  /**
   * Labels associated with this execution. Labels can contain at most 64
   * entries. Keys and values can be no longer than 63 characters and can only
   * contain lowercase letters, numeric characters, underscores, and dashes.
   * Label keys must start with a letter. International characters are allowed.
   * By default, labels are inherited from the workflow but are overridden by
   * any labels associated with the execution.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The resource name of the execution. Format:
   * projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution}
   */
  readonly name?: string;
  /**
   * Output only. Output of the execution represented as a JSON string. The
   * value can only be present if the execution's state is `SUCCEEDED`.
   */
  readonly result?: string;
  /**
   * Output only. Marks the beginning of execution.
   */
  readonly startTime?: Date;
  /**
   * Output only. Current state of the execution.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "SUCCEEDED" | "FAILED" | "CANCELLED";
  /**
   * Output only. Status tracks the current steps and progress data of this
   * execution.
   */
  readonly status?: Status;
  /**
   * Output only. Revision of the workflow this execution is using.
   */
  readonly workflowRevisionId?: string;
}

/**
 * Response for the ListExecutions method.
 */
export interface ListExecutionsResponse {
  /**
   * The executions which match the request.
   */
  executions?: Execution[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Position contains source position information about the stack trace element
 * such as line number, column number and length of the code block in bytes.
 */
export interface Position {
  /**
   * The source code column position (of the line) the current instruction was
   * generated from.
   */
  column?: bigint;
  /**
   * The number of bytes of source code making up this stack trace element.
   */
  length?: bigint;
  /**
   * The source code line number the current instruction was generated from.
   */
  line?: bigint;
}

function serializePosition(data: any): Position {
  return {
    ...data,
    column: data["column"] !== undefined ? String(data["column"]) : undefined,
    length: data["length"] !== undefined ? String(data["length"]) : undefined,
    line: data["line"] !== undefined ? String(data["line"]) : undefined,
  };
}

function deserializePosition(data: any): Position {
  return {
    ...data,
    column: data["column"] !== undefined ? BigInt(data["column"]) : undefined,
    length: data["length"] !== undefined ? BigInt(data["length"]) : undefined,
    line: data["line"] !== undefined ? BigInt(data["line"]) : undefined,
  };
}

/**
 * Additional options for
 * WorkflowExecutions#projectsLocationsWorkflowsExecutionsGet.
 */
export interface ProjectsLocationsWorkflowsExecutionsGetOptions {
  /**
   * Optional. A view defining which fields should be filled in the returned
   * execution. The API will default to the FULL view.
   */
  view?:  | "EXECUTION_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for
 * WorkflowExecutions#projectsLocationsWorkflowsExecutionsList.
 */
export interface ProjectsLocationsWorkflowsExecutionsListOptions {
  /**
   * Optional. Filters applied to the [Executions.ListExecutions] results. The
   * following fields are supported for filtering: executionID, state,
   * startTime, endTime, duration, workflowRevisionID, stepName, and label.
   */
  filter?: string;
  /**
   * Optional. The ordering applied to the [Executions.ListExecutions] results.
   * By default the ordering is based on descending start time. The following
   * fields are supported for order by: executionID, startTime, endTime,
   * duration, state, and workflowRevisionID.
   */
  orderBy?: string;
  /**
   * Maximum number of executions to return per call. Max supported value
   * depends on the selected Execution view: it's 1000 for BASIC and 100 for
   * FULL. The default value used if the field is not specified is 100,
   * regardless of the selected view. Values greater than the max value will be
   * coerced down to it.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListExecutions` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListExecutions` must match the call that provided the page
   * token. Note that pagination is applied to dynamic data. The list of
   * executions returned can change between page requests.
   */
  pageToken?: string;
  /**
   * Optional. A view defining which fields should be filled in the returned
   * executions. The API will default to the BASIC view.
   */
  view?:  | "EXECUTION_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * A message that is published by publishers and consumed by subscribers. The
 * message must contain either a non-empty data field or at least one attribute.
 * Note that client libraries represent this object differently depending on the
 * language. See the corresponding [client library
 * documentation](https://cloud.google.com/pubsub/docs/reference/libraries) for
 * more information. See [quotas and limits]
 * (https://cloud.google.com/pubsub/quotas) for more information about message
 * limits.
 */
export interface PubsubMessage {
  /**
   * Attributes for this message. If this field is empty, the message must
   * contain non-empty data. This can be used to filter messages on the
   * subscription.
   */
  attributes?: {
    [key: string]: string
  };
  /**
   * The message data field. If this field is empty, the message must contain
   * at least one attribute.
   */
  data?: Uint8Array;
  /**
   * ID of this message, assigned by the server when the message is published.
   * Guaranteed to be unique within the topic. This value may be read by a
   * subscriber that receives a `PubsubMessage` via a `Pull` call or a push
   * delivery. It must not be populated by the publisher in a `Publish` call.
   */
  messageId?: string;
  /**
   * If non-empty, identifies related messages for which publish order should
   * be respected. If a `Subscription` has `enable_message_ordering` set to
   * `true`, messages published with the same non-empty `ordering_key` value
   * will be delivered to subscribers in the order in which they are received by
   * the Pub/Sub system. All `PubsubMessage`s published in a given
   * `PublishRequest` must specify the same `ordering_key` value. For more
   * information, see [ordering
   * messages](https://cloud.google.com/pubsub/docs/ordering).
   */
  orderingKey?: string;
  /**
   * The time at which the message was published, populated by the server when
   * it receives the `Publish` call. It must not be populated by the publisher
   * in a `Publish` call.
   */
  publishTime?: Date;
}

function serializePubsubMessage(data: any): PubsubMessage {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
    publishTime: data["publishTime"] !== undefined ? data["publishTime"].toISOString() : undefined,
  };
}

function deserializePubsubMessage(data: any): PubsubMessage {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
    publishTime: data["publishTime"] !== undefined ? new Date(data["publishTime"]) : undefined,
  };
}

/**
 * A collection of stack elements (frames) where an error occurred.
 */
export interface StackTrace {
  /**
   * An array of stack elements.
   */
  elements?: StackTraceElement[];
}

function serializeStackTrace(data: any): StackTrace {
  return {
    ...data,
    elements: data["elements"] !== undefined ? data["elements"].map((item: any) => (serializeStackTraceElement(item))) : undefined,
  };
}

function deserializeStackTrace(data: any): StackTrace {
  return {
    ...data,
    elements: data["elements"] !== undefined ? data["elements"].map((item: any) => (deserializeStackTraceElement(item))) : undefined,
  };
}

/**
 * A single stack element (frame) where an error occurred.
 */
export interface StackTraceElement {
  /**
   * The source position information of the stack trace element.
   */
  position?: Position;
  /**
   * The routine where the error occurred.
   */
  routine?: string;
  /**
   * The step the error occurred at.
   */
  step?: string;
}

function serializeStackTraceElement(data: any): StackTraceElement {
  return {
    ...data,
    position: data["position"] !== undefined ? serializePosition(data["position"]) : undefined,
  };
}

function deserializeStackTraceElement(data: any): StackTraceElement {
  return {
    ...data,
    position: data["position"] !== undefined ? deserializePosition(data["position"]) : undefined,
  };
}

/**
 * Represents the current status of this execution.
 */
export interface Status {
  /**
   * A list of currently executing or last executed step names for the workflow
   * execution currently running. If the workflow has succeeded or failed, this
   * is the last attempted or executed step. Presently, if the current step is
   * inside a subworkflow, the list only includes that step. In the future, the
   * list will contain items for each step in the call stack, starting with the
   * outermost step in the `main` subworkflow, and ending with the most deeply
   * nested step.
   */
  currentSteps?: Step[];
}

/**
 * Represents a step of the workflow this execution is running.
 */
export interface Step {
  /**
   * Name of a routine within the workflow.
   */
  routine?: string;
  /**
   * Name of a step within the routine.
   */
  step?: string;
}

/**
 * Request for the TriggerPubsubExecution method.
 */
export interface TriggerPubsubExecutionRequest {
  /**
   * Required. LINT: LEGACY_NAMES The query parameter value for
   * __GCP_CloudEventsMode, set by the Eventarc service when configuring
   * triggers.
   */
  GCPCloudEventsMode?: string;
  /**
   * Required. The message of the Pub/Sub push notification.
   */
  message?: PubsubMessage;
  /**
   * Required. The subscription of the Pub/Sub push notification. Format:
   * projects/{project}/subscriptions/{sub}
   */
  subscription?: string;
}

function serializeTriggerPubsubExecutionRequest(data: any): TriggerPubsubExecutionRequest {
  return {
    ...data,
    message: data["message"] !== undefined ? serializePubsubMessage(data["message"]) : undefined,
  };
}

function deserializeTriggerPubsubExecutionRequest(data: any): TriggerPubsubExecutionRequest {
  return {
    ...data,
    message: data["message"] !== undefined ? deserializePubsubMessage(data["message"]) : undefined,
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
