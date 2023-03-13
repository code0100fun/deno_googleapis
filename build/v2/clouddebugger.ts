// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Debugger API Client for Deno
 * ==================================
 * 
 * Examines the call stack and variables of a running application without stopping or slowing it down. 
 * 
 * Docs: https://cloud.google.com/debugger
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Examines the call stack and variables of a running application without
 * stopping or slowing it down.
 */
export class CloudDebugger {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://clouddebugger.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns the list of all active breakpoints for the debuggee. The
   * breakpoint specification (`location`, `condition`, and `expressions`
   * fields) is semantically immutable, although the field values may change.
   * For example, an agent may update the location line number to reflect the
   * actual line where the breakpoint was set, but this doesn't change the
   * breakpoint semantics. This means that an agent does not need to check if a
   * breakpoint has changed when it encounters the same breakpoint on a
   * successive call. Moreover, an agent should remember the breakpoints that
   * are completed until the controller removes them from the active list to
   * avoid setting those breakpoints again.
   *
   * @param debuggeeId Required. Identifies the debuggee.
   */
  async controllerDebuggeesBreakpointsList(debuggeeId: string, opts: ControllerDebuggeesBreakpointsListOptions = {}): Promise<ListActiveBreakpointsResponse> {
    const url = new URL(`${this.#baseUrl}v2/controller/debuggees/${ debuggeeId }/breakpoints`);
    if (opts.agentId !== undefined) {
      url.searchParams.append("agentId", String(opts.agentId));
    }
    if (opts.successOnTimeout !== undefined) {
      url.searchParams.append("successOnTimeout", String(opts.successOnTimeout));
    }
    if (opts.waitToken !== undefined) {
      url.searchParams.append("waitToken", String(opts.waitToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListActiveBreakpointsResponse(data);
  }

  /**
   * Updates the breakpoint state or mutable fields. The entire Breakpoint
   * message must be sent back to the controller service. Updates to active
   * breakpoint fields are only allowed if the new value does not change the
   * breakpoint specification. Updates to the `location`, `condition` and
   * `expressions` fields should not alter the breakpoint semantics. These may
   * only make changes such as canonicalizing a value or snapping the location
   * to the correct line of code.
   *
   * @param debuggeeId Required. Identifies the debuggee being debugged.
   * @param id Breakpoint identifier, unique in the scope of the debuggee.
   */
  async controllerDebuggeesBreakpointsUpdate(debuggeeId: string, id: string, req: UpdateActiveBreakpointRequest): Promise<UpdateActiveBreakpointResponse> {
    req = serializeUpdateActiveBreakpointRequest(req);
    const url = new URL(`${this.#baseUrl}v2/controller/debuggees/${ debuggeeId }/breakpoints/${ id }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as UpdateActiveBreakpointResponse;
  }

  /**
   * Registers the debuggee with the controller service. All agents attached to
   * the same application must call this method with exactly the same request
   * content to get back the same stable `debuggee_id`. Agents should call this
   * method again whenever `google.rpc.Code.NOT_FOUND` is returned from any
   * controller method. This protocol allows the controller service to disable
   * debuggees, recover from data loss, or change the `debuggee_id` format.
   * Agents must handle `debuggee_id` value changing upon re-registration.
   *
   */
  async controllerDebuggeesRegister(req: RegisterDebuggeeRequest): Promise<RegisterDebuggeeResponse> {
    const url = new URL(`${this.#baseUrl}v2/controller/debuggees/register`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as RegisterDebuggeeResponse;
  }

  /**
   * Deletes the breakpoint from the debuggee.
   *
   * @param breakpointId Required. ID of the breakpoint to delete.
   * @param debuggeeId Required. ID of the debuggee whose breakpoint to delete.
   */
  async debuggerDebuggeesBreakpointsDelete(breakpointId: string, debuggeeId: string, opts: DebuggerDebuggeesBreakpointsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/debugger/debuggees/${ debuggeeId }/breakpoints/${ breakpointId }`);
    if (opts.clientVersion !== undefined) {
      url.searchParams.append("clientVersion", String(opts.clientVersion));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets breakpoint information.
   *
   * @param breakpointId Required. ID of the breakpoint to get.
   * @param debuggeeId Required. ID of the debuggee whose breakpoint to get.
   */
  async debuggerDebuggeesBreakpointsGet(breakpointId: string, debuggeeId: string, opts: DebuggerDebuggeesBreakpointsGetOptions = {}): Promise<GetBreakpointResponse> {
    const url = new URL(`${this.#baseUrl}v2/debugger/debuggees/${ debuggeeId }/breakpoints/${ breakpointId }`);
    if (opts.clientVersion !== undefined) {
      url.searchParams.append("clientVersion", String(opts.clientVersion));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetBreakpointResponse(data);
  }

  /**
   * Lists all breakpoints for the debuggee.
   *
   * @param debuggeeId Required. ID of the debuggee whose breakpoints to list.
   */
  async debuggerDebuggeesBreakpointsList(debuggeeId: string, opts: DebuggerDebuggeesBreakpointsListOptions = {}): Promise<ListBreakpointsResponse> {
    const url = new URL(`${this.#baseUrl}v2/debugger/debuggees/${ debuggeeId }/breakpoints`);
    if (opts["action.value"] !== undefined) {
      url.searchParams.append("action.value", String(opts["action.value"]));
    }
    if (opts.clientVersion !== undefined) {
      url.searchParams.append("clientVersion", String(opts.clientVersion));
    }
    if (opts.includeAllUsers !== undefined) {
      url.searchParams.append("includeAllUsers", String(opts.includeAllUsers));
    }
    if (opts.includeInactive !== undefined) {
      url.searchParams.append("includeInactive", String(opts.includeInactive));
    }
    if (opts.stripResults !== undefined) {
      url.searchParams.append("stripResults", String(opts.stripResults));
    }
    if (opts.waitToken !== undefined) {
      url.searchParams.append("waitToken", String(opts.waitToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListBreakpointsResponse(data);
  }

  /**
   * Sets the breakpoint to the debuggee.
   *
   * @param debuggeeId Required. ID of the debuggee where the breakpoint is to be set.
   */
  async debuggerDebuggeesBreakpointsSet(debuggeeId: string, req: Breakpoint, opts: DebuggerDebuggeesBreakpointsSetOptions = {}): Promise<SetBreakpointResponse> {
    req = serializeBreakpoint(req);
    const url = new URL(`${this.#baseUrl}v2/debugger/debuggees/${ debuggeeId }/breakpoints/set`);
    if (opts.canaryOption !== undefined) {
      url.searchParams.append("canaryOption", String(opts.canaryOption));
    }
    if (opts.clientVersion !== undefined) {
      url.searchParams.append("clientVersion", String(opts.clientVersion));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSetBreakpointResponse(data);
  }

  /**
   * Lists all the debuggees that the user has access to.
   *
   */
  async debuggerDebuggeesList(opts: DebuggerDebuggeesListOptions = {}): Promise<ListDebuggeesResponse> {
    const url = new URL(`${this.#baseUrl}v2/debugger/debuggees`);
    if (opts.clientVersion !== undefined) {
      url.searchParams.append("clientVersion", String(opts.clientVersion));
    }
    if (opts.includeInactive !== undefined) {
      url.searchParams.append("includeInactive", String(opts.includeInactive));
    }
    if (opts.project !== undefined) {
      url.searchParams.append("project", String(opts.project));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListDebuggeesResponse;
  }
}

/**
 * An alias to a repo revision.
 */
export interface AliasContext {
  /**
   * The alias kind.
   */
  kind?:  | "ANY" | "FIXED" | "MOVABLE" | "OTHER";
  /**
   * The alias name.
   */
  name?: string;
}

/**
 * 
 * ------------------------------------------------------------------------------
 * ## Breakpoint (the resource) Represents the breakpoint specification, status
 * and results.
 */
export interface Breakpoint {
  /**
   * Action that the agent should perform when the code at the breakpoint
   * location is hit.
   */
  action?:  | "CAPTURE" | "LOG";
  /**
   * The deadline for the breakpoint to stay in CANARY_ACTIVE state. The value
   * is meaningless when the breakpoint is not in CANARY_ACTIVE state.
   */
  canaryExpireTime?: Date;
  /**
   * Condition that triggers the breakpoint. The condition is a compound
   * boolean expression composed using expressions in a programming language at
   * the source location.
   */
  condition?: string;
  /**
   * Time this breakpoint was created by the server in seconds resolution.
   */
  createTime?: Date;
  /**
   * Values of evaluated expressions at breakpoint time. The evaluated
   * expressions appear in exactly the same order they are listed in the
   * `expressions` field. The `name` field holds the original expression text,
   * the `value` or `members` field holds the result of the evaluated
   * expression. If the expression cannot be evaluated, the `status` inside the
   * `Variable` will indicate an error and contain the error text.
   */
  evaluatedExpressions?: Variable[];
  /**
   * List of read-only expressions to evaluate at the breakpoint location. The
   * expressions are composed using expressions in the programming language at
   * the source location. If the breakpoint action is `LOG`, the evaluated
   * expressions are included in log statements.
   */
  expressions?: string[];
  /**
   * Time this breakpoint was finalized as seen by the server in seconds
   * resolution.
   */
  finalTime?: Date;
  /**
   * Breakpoint identifier, unique in the scope of the debuggee.
   */
  id?: string;
  /**
   * When true, indicates that this is a final result and the breakpoint state
   * will not change from here on.
   */
  isFinalState?: boolean;
  /**
   * A set of custom breakpoint properties, populated by the agent, to be
   * displayed to the user.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Breakpoint source location.
   */
  location?: SourceLocation;
  /**
   * Indicates the severity of the log. Only relevant when action is `LOG`.
   */
  logLevel?:  | "INFO" | "WARNING" | "ERROR";
  /**
   * Only relevant when action is `LOG`. Defines the message to log when the
   * breakpoint hits. The message may include parameter placeholders `$0`, `$1`,
   * etc. These placeholders are replaced with the evaluated value of the
   * appropriate expression. Expressions not referenced in `log_message_format`
   * are not logged. Example: `Message received, id = $0, count = $1` with
   * `expressions` = `[ message.id, message.count ]`.
   */
  logMessageFormat?: string;
  /**
   * The stack at breakpoint time, where stack_frames[0] represents the most
   * recently entered function.
   */
  stackFrames?: StackFrame[];
  /**
   * The current state of the breakpoint.
   */
  state?:  | "STATE_UNSPECIFIED" | "STATE_CANARY_PENDING_AGENTS" | "STATE_CANARY_ACTIVE" | "STATE_ROLLING_TO_ALL" | "STATE_IS_FINAL";
  /**
   * Breakpoint status. The status includes an error flag and a human readable
   * message. This field is usually unset. The message can be either
   * informational or an error message. Regardless, clients should always
   * display the text message back to the user. Error status indicates complete
   * failure of the breakpoint. Example (non-final state): `Still loading
   * symbols...` Examples (final state): * `Invalid line number` referring to
   * location * `Field f not found in class C` referring to condition
   */
  status?: StatusMessage;
  /**
   * E-mail address of the user that created this breakpoint
   */
  userEmail?: string;
  /**
   * The `variable_table` exists to aid with computation, memory and network
   * traffic optimization. It enables storing a variable once and reference it
   * from multiple variables, including variables stored in the `variable_table`
   * itself. For example, the same `this` object, which may appear at many
   * levels of the stack, can have all of its data stored once in this table.
   * The stack frame variables then would hold only a reference to it. The
   * variable `var_table_index` field is an index into this repeated field. The
   * stored objects are nameless and get their name from the referencing
   * variable. The effective variable is a merge of the referencing variable and
   * the referenced variable.
   */
  variableTable?: Variable[];
}

function serializeBreakpoint(data: any): Breakpoint {
  return {
    ...data,
    canaryExpireTime: data["canaryExpireTime"] !== undefined ? data["canaryExpireTime"].toISOString() : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    finalTime: data["finalTime"] !== undefined ? data["finalTime"].toISOString() : undefined,
  };
}

function deserializeBreakpoint(data: any): Breakpoint {
  return {
    ...data,
    canaryExpireTime: data["canaryExpireTime"] !== undefined ? new Date(data["canaryExpireTime"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    finalTime: data["finalTime"] !== undefined ? new Date(data["finalTime"]) : undefined,
  };
}

/**
 * A CloudRepoSourceContext denotes a particular revision in a cloud repo (a
 * repo hosted by the Google Cloud Platform).
 */
export interface CloudRepoSourceContext {
  /**
   * An alias, which may be a branch or tag.
   */
  aliasContext?: AliasContext;
  /**
   * The name of an alias (branch, tag, etc.).
   */
  aliasName?: string;
  /**
   * The ID of the repo.
   */
  repoId?: RepoId;
  /**
   * A revision ID.
   */
  revisionId?: string;
}

/**
 * A CloudWorkspaceId is a unique identifier for a cloud workspace. A cloud
 * workspace is a place associated with a repo where modified files can be
 * stored before they are committed.
 */
export interface CloudWorkspaceId {
  /**
   * The unique name of the workspace within the repo. This is the name chosen
   * by the client in the Source API's CreateWorkspace method.
   */
  name?: string;
  /**
   * The ID of the repo containing the workspace.
   */
  repoId?: RepoId;
}

/**
 * A CloudWorkspaceSourceContext denotes a workspace at a particular snapshot.
 */
export interface CloudWorkspaceSourceContext {
  /**
   * The ID of the snapshot. An empty snapshot_id refers to the most recent
   * snapshot.
   */
  snapshotId?: string;
  /**
   * The ID of the workspace.
   */
  workspaceId?: CloudWorkspaceId;
}

/**
 * Additional options for CloudDebugger#controllerDebuggeesBreakpointsList.
 */
export interface ControllerDebuggeesBreakpointsListOptions {
  /**
   * Identifies the agent. This is the ID returned in the RegisterDebuggee
   * response.
   */
  agentId?: string;
  /**
   * If set to `true` (recommended), returns `google.rpc.Code.OK` status and
   * sets the `wait_expired` response field to `true` when the server-selected
   * timeout has expired. If set to `false` (deprecated), returns
   * `google.rpc.Code.ABORTED` status when the server-selected timeout has
   * expired.
   */
  successOnTimeout?: boolean;
  /**
   * A token that, if specified, blocks the method call until the list of
   * active breakpoints has changed, or a server-selected timeout has expired.
   * The value should be set from the `next_wait_token` field in the last
   * response. The initial value should be set to `"init"`.
   */
  waitToken?: string;
}

/**
 * Represents the debugged application. The application may include one or more
 * replicated processes executing the same code. Each of these processes is
 * attached with a debugger agent, carrying out the debugging commands. Agents
 * attached to the same debuggee identify themselves as such by using exactly
 * the same Debuggee message value when registering.
 */
export interface Debuggee {
  /**
   * Version ID of the agent. Schema: `domain/language-platform/vmajor.minor`
   * (for example `google.com/java-gcp/v1.1`).
   */
  agentVersion?: string;
  /**
   * Used when setting breakpoint canary for this debuggee.
   */
  canaryMode?:  | "CANARY_MODE_UNSPECIFIED" | "CANARY_MODE_ALWAYS_ENABLED" | "CANARY_MODE_ALWAYS_DISABLED" | "CANARY_MODE_DEFAULT_ENABLED" | "CANARY_MODE_DEFAULT_DISABLED";
  /**
   * Human readable description of the debuggee. Including a human-readable
   * project name, environment name and version information is recommended.
   */
  description?: string;
  /**
   * References to the locations and revisions of the source code used in the
   * deployed application.
   */
  extSourceContexts?: ExtendedSourceContext[];
  /**
   * Unique identifier for the debuggee generated by the controller service.
   */
  id?: string;
  /**
   * If set to `true`, indicates that the agent should disable itself and
   * detach from the debuggee.
   */
  isDisabled?: boolean;
  /**
   * If set to `true`, indicates that Controller service does not detect any
   * activity from the debuggee agents and the application is possibly stopped.
   */
  isInactive?: boolean;
  /**
   * A set of custom debuggee properties, populated by the agent, to be
   * displayed to the user.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Project the debuggee is associated with. Use project number or id when
   * registering a Google Cloud Platform project.
   */
  project?: string;
  /**
   * References to the locations and revisions of the source code used in the
   * deployed application.
   */
  sourceContexts?: SourceContext[];
  /**
   * Human readable message to be displayed to the user about this debuggee.
   * Absence of this field indicates no status. The message can be either
   * informational or an error status.
   */
  status?: StatusMessage;
  /**
   * Uniquifier to further distinguish the application. It is possible that
   * different applications might have identical values in the debuggee message,
   * thus, incorrectly identified as a single application by the Controller
   * service. This field adds salt to further distinguish the application.
   * Agents should consider seeding this field with value that identifies the
   * code, binary, configuration and environment.
   */
  uniquifier?: string;
}

/**
 * Additional options for CloudDebugger#debuggerDebuggeesBreakpointsDelete.
 */
export interface DebuggerDebuggeesBreakpointsDeleteOptions {
  /**
   * Required. The client version making the call. Schema:
   * `domain/type/version` (e.g., `google.com/intellij/v1`).
   */
  clientVersion?: string;
}

/**
 * Additional options for CloudDebugger#debuggerDebuggeesBreakpointsGet.
 */
export interface DebuggerDebuggeesBreakpointsGetOptions {
  /**
   * Required. The client version making the call. Schema:
   * `domain/type/version` (e.g., `google.com/intellij/v1`).
   */
  clientVersion?: string;
}

/**
 * Additional options for CloudDebugger#debuggerDebuggeesBreakpointsList.
 */
export interface DebuggerDebuggeesBreakpointsListOptions {
  /**
   * Only breakpoints with the specified action will pass the filter.
   */
  ["action.value"]?:  | "CAPTURE" | "LOG";
  /**
   * Required. The client version making the call. Schema:
   * `domain/type/version` (e.g., `google.com/intellij/v1`).
   */
  clientVersion?: string;
  /**
   * When set to `true`, the response includes the list of breakpoints set by
   * any user. Otherwise, it includes only breakpoints set by the caller.
   */
  includeAllUsers?: boolean;
  /**
   * When set to `true`, the response includes active and inactive breakpoints.
   * Otherwise, it includes only active breakpoints.
   */
  includeInactive?: boolean;
  /**
   * This field is deprecated. The following fields are always stripped out of
   * the result: `stack_frames`, `evaluated_expressions` and `variable_table`.
   */
  stripResults?: boolean;
  /**
   * A wait token that, if specified, blocks the call until the breakpoints
   * list has changed, or a server selected timeout has expired. The value
   * should be set from the last response. The error code
   * `google.rpc.Code.ABORTED` (RPC) is returned on wait timeout, which should
   * be called again with the same `wait_token`.
   */
  waitToken?: string;
}

/**
 * Additional options for CloudDebugger#debuggerDebuggeesBreakpointsSet.
 */
export interface DebuggerDebuggeesBreakpointsSetOptions {
  /**
   * The canary option set by the user upon setting breakpoint.
   */
  canaryOption?:  | "CANARY_OPTION_UNSPECIFIED" | "CANARY_OPTION_TRY_ENABLE" | "CANARY_OPTION_TRY_DISABLE";
  /**
   * Required. The client version making the call. Schema:
   * `domain/type/version` (e.g., `google.com/intellij/v1`).
   */
  clientVersion?: string;
}

/**
 * Additional options for CloudDebugger#debuggerDebuggeesList.
 */
export interface DebuggerDebuggeesListOptions {
  /**
   * Required. The client version making the call. Schema:
   * `domain/type/version` (e.g., `google.com/intellij/v1`).
   */
  clientVersion?: string;
  /**
   * When set to `true`, the result includes all debuggees. Otherwise, the
   * result includes only debuggees that are active.
   */
  includeInactive?: boolean;
  /**
   * Required. Project number of a Google Cloud project whose debuggees to
   * list.
   */
  project?: string;
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
 * An ExtendedSourceContext is a SourceContext combined with additional details
 * describing the context.
 */
export interface ExtendedSourceContext {
  /**
   * Any source context.
   */
  context?: SourceContext;
  /**
   * Labels with user defined metadata.
   */
  labels?: {
    [key: string]: string
  };
}

/**
 * Represents a message with parameters.
 */
export interface FormatMessage {
  /**
   * Format template for the message. The `format` uses placeholders `$0`,
   * `$1`, etc. to reference parameters. `$$` can be used to denote the `$`
   * character. Examples: * `Failed to load '$0' which helps debug $1 the first
   * time it is loaded. Again, $0 is very important.` * `Please pay $$10 to use
   * $0 instead of $1.`
   */
  format?: string;
  /**
   * Optional parameters to be embedded into the message.
   */
  parameters?: string[];
}

/**
 * A SourceContext referring to a Gerrit project.
 */
export interface GerritSourceContext {
  /**
   * An alias, which may be a branch or tag.
   */
  aliasContext?: AliasContext;
  /**
   * The name of an alias (branch, tag, etc.).
   */
  aliasName?: string;
  /**
   * The full project name within the host. Projects may be nested, so
   * "project/subproject" is a valid project name. The "repo name" is
   * hostURI/project.
   */
  gerritProject?: string;
  /**
   * The URI of a running Gerrit instance.
   */
  hostUri?: string;
  /**
   * A revision (commit) ID.
   */
  revisionId?: string;
}

/**
 * Response for getting breakpoint information.
 */
export interface GetBreakpointResponse {
  /**
   * Complete breakpoint state. The fields `id` and `location` are guaranteed
   * to be set.
   */
  breakpoint?: Breakpoint;
}

function serializeGetBreakpointResponse(data: any): GetBreakpointResponse {
  return {
    ...data,
    breakpoint: data["breakpoint"] !== undefined ? serializeBreakpoint(data["breakpoint"]) : undefined,
  };
}

function deserializeGetBreakpointResponse(data: any): GetBreakpointResponse {
  return {
    ...data,
    breakpoint: data["breakpoint"] !== undefined ? deserializeBreakpoint(data["breakpoint"]) : undefined,
  };
}

/**
 * A GitSourceContext denotes a particular revision in a third party Git
 * repository (e.g. GitHub).
 */
export interface GitSourceContext {
  /**
   * Git commit hash. required.
   */
  revisionId?: string;
  /**
   * Git repository URL.
   */
  url?: string;
}

/**
 * Response for listing active breakpoints.
 */
export interface ListActiveBreakpointsResponse {
  /**
   * List of all active breakpoints. The fields `id` and `location` are
   * guaranteed to be set on each breakpoint.
   */
  breakpoints?: Breakpoint[];
  /**
   * A token that can be used in the next method call to block until the list
   * of breakpoints changes.
   */
  nextWaitToken?: string;
  /**
   * If set to `true`, indicates that there is no change to the list of active
   * breakpoints and the server-selected timeout has expired. The `breakpoints`
   * field would be empty and should be ignored.
   */
  waitExpired?: boolean;
}

function serializeListActiveBreakpointsResponse(data: any): ListActiveBreakpointsResponse {
  return {
    ...data,
    breakpoints: data["breakpoints"] !== undefined ? data["breakpoints"].map((item: any) => (serializeBreakpoint(item))) : undefined,
  };
}

function deserializeListActiveBreakpointsResponse(data: any): ListActiveBreakpointsResponse {
  return {
    ...data,
    breakpoints: data["breakpoints"] !== undefined ? data["breakpoints"].map((item: any) => (deserializeBreakpoint(item))) : undefined,
  };
}

/**
 * Response for listing breakpoints.
 */
export interface ListBreakpointsResponse {
  /**
   * List of breakpoints matching the request. The fields `id` and `location`
   * are guaranteed to be set on each breakpoint. The fields: `stack_frames`,
   * `evaluated_expressions` and `variable_table` are cleared on each breakpoint
   * regardless of its status.
   */
  breakpoints?: Breakpoint[];
  /**
   * A wait token that can be used in the next call to `list` (REST) or
   * `ListBreakpoints` (RPC) to block until the list of breakpoints has changes.
   */
  nextWaitToken?: string;
}

function serializeListBreakpointsResponse(data: any): ListBreakpointsResponse {
  return {
    ...data,
    breakpoints: data["breakpoints"] !== undefined ? data["breakpoints"].map((item: any) => (serializeBreakpoint(item))) : undefined,
  };
}

function deserializeListBreakpointsResponse(data: any): ListBreakpointsResponse {
  return {
    ...data,
    breakpoints: data["breakpoints"] !== undefined ? data["breakpoints"].map((item: any) => (deserializeBreakpoint(item))) : undefined,
  };
}

/**
 * Response for listing debuggees.
 */
export interface ListDebuggeesResponse {
  /**
   * List of debuggees accessible to the calling user. The fields `debuggee.id`
   * and `description` are guaranteed to be set. The `description` field is a
   * human readable field provided by agents and can be displayed to users.
   */
  debuggees?: Debuggee[];
}

/**
 * Selects a repo using a Google Cloud Platform project ID (e.g.
 * winged-cargo-31) and a repo name within that project.
 */
export interface ProjectRepoId {
  /**
   * The ID of the project.
   */
  projectId?: string;
  /**
   * The name of the repo. Leave empty for the default repo.
   */
  repoName?: string;
}

/**
 * Request to register a debuggee.
 */
export interface RegisterDebuggeeRequest {
  /**
   * Required. Debuggee information to register. The fields `project`,
   * `uniquifier`, `description` and `agent_version` of the debuggee must be
   * set.
   */
  debuggee?: Debuggee;
}

/**
 * Response for registering a debuggee.
 */
export interface RegisterDebuggeeResponse {
  /**
   * A unique ID generated for the agent. Each RegisterDebuggee request will
   * generate a new agent ID.
   */
  agentId?: string;
  /**
   * Debuggee resource. The field `id` is guaranteed to be set (in addition to
   * the echoed fields). If the field `is_disabled` is set to `true`, the agent
   * should disable itself by removing all breakpoints and detaching from the
   * application. It should however continue to poll `RegisterDebuggee` until
   * reenabled.
   */
  debuggee?: Debuggee;
}

/**
 * A unique identifier for a cloud repo.
 */
export interface RepoId {
  /**
   * A combination of a project ID and a repo name.
   */
  projectRepoId?: ProjectRepoId;
  /**
   * A server-assigned, globally unique identifier.
   */
  uid?: string;
}

/**
 * Response for setting a breakpoint.
 */
export interface SetBreakpointResponse {
  /**
   * Breakpoint resource. The field `id` is guaranteed to be set (in addition
   * to the echoed fields).
   */
  breakpoint?: Breakpoint;
}

function serializeSetBreakpointResponse(data: any): SetBreakpointResponse {
  return {
    ...data,
    breakpoint: data["breakpoint"] !== undefined ? serializeBreakpoint(data["breakpoint"]) : undefined,
  };
}

function deserializeSetBreakpointResponse(data: any): SetBreakpointResponse {
  return {
    ...data,
    breakpoint: data["breakpoint"] !== undefined ? deserializeBreakpoint(data["breakpoint"]) : undefined,
  };
}

/**
 * A SourceContext is a reference to a tree of files. A SourceContext together
 * with a path point to a unique revision of a single file or directory.
 */
export interface SourceContext {
  /**
   * A SourceContext referring to a revision in a cloud repo.
   */
  cloudRepo?: CloudRepoSourceContext;
  /**
   * A SourceContext referring to a snapshot in a cloud workspace.
   */
  cloudWorkspace?: CloudWorkspaceSourceContext;
  /**
   * A SourceContext referring to a Gerrit project.
   */
  gerrit?: GerritSourceContext;
  /**
   * A SourceContext referring to any third party Git repo (e.g. GitHub).
   */
  git?: GitSourceContext;
}

/**
 * Represents a location in the source code.
 */
export interface SourceLocation {
  /**
   * Column within a line. The first column in a line as the value `1`. Agents
   * that do not support setting breakpoints on specific columns ignore this
   * field.
   */
  column?: number;
  /**
   * Line inside the file. The first line in the file has the value `1`.
   */
  line?: number;
  /**
   * Path to the source file within the source context of the target binary.
   */
  path?: string;
}

/**
 * Represents a stack frame context.
 */
export interface StackFrame {
  /**
   * Set of arguments passed to this function. Note that this might not be
   * populated for all stack frames.
   */
  arguments?: Variable[];
  /**
   * Demangled function name at the call site.
   */
  function?: string;
  /**
   * Set of local variables at the stack frame location. Note that this might
   * not be populated for all stack frames.
   */
  locals?: Variable[];
  /**
   * Source location of the call site.
   */
  location?: SourceLocation;
}

/**
 * Represents a contextual status message. The message can indicate an error or
 * informational status, and refer to specific parts of the containing object.
 * For example, the `Breakpoint.status` field can indicate an error referring to
 * the `BREAKPOINT_SOURCE_LOCATION` with the message `Location not found`.
 */
export interface StatusMessage {
  /**
   * Status message text.
   */
  description?: FormatMessage;
  /**
   * Distinguishes errors from informational messages.
   */
  isError?: boolean;
  /**
   * Reference to which the message applies.
   */
  refersTo?:  | "UNSPECIFIED" | "BREAKPOINT_SOURCE_LOCATION" | "BREAKPOINT_CONDITION" | "BREAKPOINT_EXPRESSION" | "BREAKPOINT_AGE" | "BREAKPOINT_CANARY_FAILED" | "VARIABLE_NAME" | "VARIABLE_VALUE";
}

/**
 * Request to update an active breakpoint.
 */
export interface UpdateActiveBreakpointRequest {
  /**
   * Required. Updated breakpoint information. The field `id` must be set. The
   * agent must echo all Breakpoint specification fields in the update.
   */
  breakpoint?: Breakpoint;
}

function serializeUpdateActiveBreakpointRequest(data: any): UpdateActiveBreakpointRequest {
  return {
    ...data,
    breakpoint: data["breakpoint"] !== undefined ? serializeBreakpoint(data["breakpoint"]) : undefined,
  };
}

function deserializeUpdateActiveBreakpointRequest(data: any): UpdateActiveBreakpointRequest {
  return {
    ...data,
    breakpoint: data["breakpoint"] !== undefined ? deserializeBreakpoint(data["breakpoint"]) : undefined,
  };
}

/**
 * Response for updating an active breakpoint. The message is defined to allow
 * future extensions.
 */
export interface UpdateActiveBreakpointResponse {
}

/**
 * Represents a variable or an argument possibly of a compound object type.
 * Note how the following variables are represented: 1) A simple variable: int x
 * = 5 { name: "x", value: "5", type: "int" } // Captured variable 2) A compound
 * object: struct T { int m1; int m2; }; T x = { 3, 7 }; { // Captured variable
 * name: "x", type: "T", members { name: "m1", value: "3", type: "int" },
 * members { name: "m2", value: "7", type: "int" } } 3) A pointer where the
 * pointee was captured: T x = { 3, 7 }; T* p = &x; { // Captured variable name:
 * "p", type: "T*", value: "0x00500500", members { name: "m1", value: "3", type:
 * "int" }, members { name: "m2", value: "7", type: "int" } } 4) A pointer where
 * the pointee was not captured: T* p = new T; { // Captured variable name: "p",
 * type: "T*", value: "0x00400400" status { is_error: true, description {
 * format: "unavailable" } } } The status should describe the reason for the
 * missing value, such as ``, ``, ``. Note that a null pointer should not have
 * members. 5) An unnamed value: int* p = new int(7); { // Captured variable
 * name: "p", value: "0x00500500", type: "int*", members { value: "7", type:
 * "int" } } 6) An unnamed pointer where the pointee was not captured: int* p =
 * new int(7); int** pp = &p; { // Captured variable name: "pp", value:
 * "0x00500500", type: "int**", members { value: "0x00400400", type: "int*"
 * status { is_error: true, description: { format: "unavailable" } } } } } To
 * optimize computation, memory and network traffic, variables that repeat in
 * the output multiple times can be stored once in a shared variable table and
 * be referenced using the `var_table_index` field. The variables stored in the
 * shared table are nameless and are essentially a partition of the complete
 * variable. To reconstruct the complete variable, merge the referencing
 * variable with the referenced variable. When using the shared variable table,
 * the following variables: T x = { 3, 7 }; T* p = &x; T& r = x; { name: "x",
 * var_table_index: 3, type: "T" } // Captured variables { name: "p", value
 * "0x00500500", type="T*", var_table_index: 3 } { name: "r", type="T&",
 * var_table_index: 3 } { // Shared variable table entry #3: members { name:
 * "m1", value: "3", type: "int" }, members { name: "m2", value: "7", type:
 * "int" } } Note that the pointer address is stored with the referencing
 * variable and not with the referenced variable. This allows the referenced
 * variable to be shared between pointers and references. The type field is
 * optional. The debugger agent may or may not support it.
 */
export interface Variable {
  /**
   * Members contained or pointed to by the variable.
   */
  members?: Variable[];
  /**
   * Name of the variable, if any.
   */
  name?: string;
  /**
   * Status associated with the variable. This field will usually stay unset. A
   * status of a single variable only applies to that variable or expression.
   * The rest of breakpoint data still remains valid. Variables might be
   * reported in error state even when breakpoint is not in final state. The
   * message may refer to variable name with `refers_to` set to `VARIABLE_NAME`.
   * Alternatively `refers_to` will be set to `VARIABLE_VALUE`. In either case
   * variable value and members will be unset. Example of error message applied
   * to name: `Invalid expression syntax`. Example of information message
   * applied to value: `Not captured`. Examples of error message applied to
   * value: * `Malformed string`, * `Field f not found in class C` * `Null
   * pointer dereference`
   */
  status?: StatusMessage;
  /**
   * Variable type (e.g. `MyClass`). If the variable is split with
   * `var_table_index`, `type` goes next to `value`. The interpretation of a
   * type is agent specific. It is recommended to include the dynamic type
   * rather than a static type of an object.
   */
  type?: string;
  /**
   * Simple value of the variable.
   */
  value?: string;
  /**
   * Reference to a variable in the shared variable table. More than one
   * variable can reference the same variable in the table. The
   * `var_table_index` field is an index into `variable_table` in Breakpoint.
   */
  varTableIndex?: number;
}