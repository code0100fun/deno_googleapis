// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Apps Script API Client for Deno
 * ===============================
 * 
 * Manages and executes Google Apps Script projects. 
 * 
 * Docs: https://developers.google.com/apps-script/api/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages and executes Google Apps Script projects.
 */
export class Script {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://script.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * List information about processes made by or on behalf of a user, such as
   * process type and current status.
   *
   */
  async processesList(opts: ProcessesListOptions = {}): Promise<ListUserProcessesResponse> {
    opts = serializeProcessesListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/processes`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts["userProcessFilter.deploymentId"] !== undefined) {
      url.searchParams.append("userProcessFilter.deploymentId", String(opts["userProcessFilter.deploymentId"]));
    }
    if (opts["userProcessFilter.endTime"] !== undefined) {
      url.searchParams.append("userProcessFilter.endTime", String(opts["userProcessFilter.endTime"]));
    }
    if (opts["userProcessFilter.functionName"] !== undefined) {
      url.searchParams.append("userProcessFilter.functionName", String(opts["userProcessFilter.functionName"]));
    }
    if (opts["userProcessFilter.projectName"] !== undefined) {
      url.searchParams.append("userProcessFilter.projectName", String(opts["userProcessFilter.projectName"]));
    }
    if (opts["userProcessFilter.scriptId"] !== undefined) {
      url.searchParams.append("userProcessFilter.scriptId", String(opts["userProcessFilter.scriptId"]));
    }
    if (opts["userProcessFilter.startTime"] !== undefined) {
      url.searchParams.append("userProcessFilter.startTime", String(opts["userProcessFilter.startTime"]));
    }
    if (opts["userProcessFilter.statuses"] !== undefined) {
      url.searchParams.append("userProcessFilter.statuses", String(opts["userProcessFilter.statuses"]));
    }
    if (opts["userProcessFilter.types"] !== undefined) {
      url.searchParams.append("userProcessFilter.types", String(opts["userProcessFilter.types"]));
    }
    if (opts["userProcessFilter.userAccessLevels"] !== undefined) {
      url.searchParams.append("userProcessFilter.userAccessLevels", String(opts["userProcessFilter.userAccessLevels"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListUserProcessesResponse(data);
  }

  /**
   * List information about a script's executed processes, such as process type
   * and current status.
   *
   */
  async processesListScriptProcesses(opts: ProcessesListScriptProcessesOptions = {}): Promise<ListScriptProcessesResponse> {
    opts = serializeProcessesListScriptProcessesOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/processes:listScriptProcesses`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.scriptId !== undefined) {
      url.searchParams.append("scriptId", String(opts.scriptId));
    }
    if (opts["scriptProcessFilter.deploymentId"] !== undefined) {
      url.searchParams.append("scriptProcessFilter.deploymentId", String(opts["scriptProcessFilter.deploymentId"]));
    }
    if (opts["scriptProcessFilter.endTime"] !== undefined) {
      url.searchParams.append("scriptProcessFilter.endTime", String(opts["scriptProcessFilter.endTime"]));
    }
    if (opts["scriptProcessFilter.functionName"] !== undefined) {
      url.searchParams.append("scriptProcessFilter.functionName", String(opts["scriptProcessFilter.functionName"]));
    }
    if (opts["scriptProcessFilter.startTime"] !== undefined) {
      url.searchParams.append("scriptProcessFilter.startTime", String(opts["scriptProcessFilter.startTime"]));
    }
    if (opts["scriptProcessFilter.statuses"] !== undefined) {
      url.searchParams.append("scriptProcessFilter.statuses", String(opts["scriptProcessFilter.statuses"]));
    }
    if (opts["scriptProcessFilter.types"] !== undefined) {
      url.searchParams.append("scriptProcessFilter.types", String(opts["scriptProcessFilter.types"]));
    }
    if (opts["scriptProcessFilter.userAccessLevels"] !== undefined) {
      url.searchParams.append("scriptProcessFilter.userAccessLevels", String(opts["scriptProcessFilter.userAccessLevels"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListScriptProcessesResponse(data);
  }

  /**
   * Creates a new, empty script project with no script files and a base
   * manifest file.
   *
   */
  async projectsCreate(req: CreateProjectRequest): Promise<Project> {
    const url = new URL(`${this.#baseUrl}v1/projects`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeProject(data);
  }

  /**
   * Creates a deployment of an Apps Script project.
   *
   * @param scriptId The script project's Drive ID.
   */
  async projectsDeploymentsCreate(scriptId: string, req: DeploymentConfig): Promise<Deployment> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ scriptId }/deployments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeDeployment(data);
  }

  /**
   * Deletes a deployment of an Apps Script project.
   *
   * @param deploymentId The deployment ID to be undeployed.
   * @param scriptId The script project's Drive ID.
   */
  async projectsDeploymentsDelete(deploymentId: string, scriptId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ scriptId }/deployments/${ deploymentId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a deployment of an Apps Script project.
   *
   * @param deploymentId The deployment ID.
   * @param scriptId The script project's Drive ID.
   */
  async projectsDeploymentsGet(deploymentId: string, scriptId: string): Promise<Deployment> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ scriptId }/deployments/${ deploymentId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDeployment(data);
  }

  /**
   * Lists the deployments of an Apps Script project.
   *
   * @param scriptId The script project's Drive ID.
   */
  async projectsDeploymentsList(scriptId: string, opts: ProjectsDeploymentsListOptions = {}): Promise<ListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ scriptId }/deployments`);
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
    return deserializeListDeploymentsResponse(data);
  }

  /**
   * Updates a deployment of an Apps Script project.
   *
   * @param deploymentId The deployment ID for this deployment.
   * @param scriptId The script project's Drive ID.
   */
  async projectsDeploymentsUpdate(deploymentId: string, scriptId: string, req: UpdateDeploymentRequest): Promise<Deployment> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ scriptId }/deployments/${ deploymentId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeDeployment(data);
  }

  /**
   * Gets a script project's metadata.
   *
   * @param scriptId The script project's Drive ID.
   */
  async projectsGet(scriptId: string): Promise<Project> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ scriptId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeProject(data);
  }

  /**
   * Gets the content of the script project, including the code source and
   * metadata for each script file.
   *
   * @param scriptId The script project's Drive ID.
   */
  async projectsGetContent(scriptId: string, opts: ProjectsGetContentOptions = {}): Promise<Content> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ scriptId }/content`);
    if (opts.versionNumber !== undefined) {
      url.searchParams.append("versionNumber", String(opts.versionNumber));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeContent(data);
  }

  /**
   * Get metrics data for scripts, such as number of executions and active
   * users.
   *
   * @param scriptId Required field indicating the script to get metrics for.
   */
  async projectsGetMetrics(scriptId: string, opts: ProjectsGetMetricsOptions = {}): Promise<Metrics> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ scriptId }/metrics`);
    if (opts["metricsFilter.deploymentId"] !== undefined) {
      url.searchParams.append("metricsFilter.deploymentId", String(opts["metricsFilter.deploymentId"]));
    }
    if (opts.metricsGranularity !== undefined) {
      url.searchParams.append("metricsGranularity", String(opts.metricsGranularity));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMetrics(data);
  }

  /**
   * Updates the content of the specified script project. This content is
   * stored as the HEAD version, and is used when the script is executed as a
   * trigger, in the script editor, in add-on preview mode, or as a web app or
   * Apps Script API in development mode. This clears all the existing files in
   * the project.
   *
   * @param scriptId The script project's Drive ID.
   */
  async projectsUpdateContent(scriptId: string, req: Content): Promise<Content> {
    req = serializeContent(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ scriptId }/content`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeContent(data);
  }

  /**
   * Creates a new immutable version using the current code, with a unique
   * version number.
   *
   * @param scriptId The script project's Drive ID.
   */
  async projectsVersionsCreate(scriptId: string, req: Version): Promise<Version> {
    req = serializeVersion(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ scriptId }/versions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeVersion(data);
  }

  /**
   * Gets a version of a script project.
   *
   * @param scriptId The script project's Drive ID.
   * @param versionNumber The version number.
   */
  async projectsVersionsGet(scriptId: string, versionNumber: number): Promise<Version> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ scriptId }/versions/${ versionNumber }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVersion(data);
  }

  /**
   * List the versions of a script project.
   *
   * @param scriptId The script project's Drive ID.
   */
  async projectsVersionsList(scriptId: string, opts: ProjectsVersionsListOptions = {}): Promise<ListVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ scriptId }/versions`);
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
    return deserializeListVersionsResponse(data);
  }

  /**
   * Runs a function in an Apps Script project. The script project must be
   * deployed for use with the Apps Script API and the calling application must
   * share the same Cloud Platform project. This method requires authorization
   * with an OAuth 2.0 token that includes at least one of the scopes listed in
   * the [Authorization](#authorization-scopes) section; script projects that do
   * not require authorization cannot be executed through this API. To find the
   * correct scopes to include in the authentication token, open the script
   * project **Overview** page and scroll down to "Project OAuth Scopes." The
   * error `403, PERMISSION_DENIED: The caller does not have permission`
   * indicates that the Cloud Platform project used to authorize the request is
   * not the same as the one used by the script.
   *
   * @param scriptId The script ID of the script to be executed. Find the script ID on the **Project settings** page under "IDs."
   */
  async scriptsRun(scriptId: string, req: ExecutionRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/scripts/${ scriptId }:run`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }
}

/**
 * The Content resource.
 */
export interface Content {
  /**
   * The list of script project files. One of the files is a script manifest;
   * it must be named "appsscript", must have type of JSON, and include the
   * manifest configurations for the project.
   */
  files?: File[];
  /**
   * The script project's Drive ID.
   */
  scriptId?: string;
}

function serializeContent(data: any): Content {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (serializeFile(item))) : undefined,
  };
}

function deserializeContent(data: any): Content {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (deserializeFile(item))) : undefined,
  };
}

/**
 * Request to create a script project. Request to create a script project.
 */
export interface CreateProjectRequest {
  /**
   * The Drive ID of a parent file that the created script project is bound to.
   * This is usually the ID of a Google Doc, Google Sheet, Google Form, or
   * Google Slides file. If not set, a standalone script project is created.
   */
  parentId?: string;
  /**
   * The title for the project.
   */
  title?: string;
}

/**
 * Representation of a single script deployment.
 */
export interface Deployment {
  /**
   * The deployment configuration.
   */
  deploymentConfig?: DeploymentConfig;
  /**
   * The deployment ID for this deployment.
   */
  deploymentId?: string;
  /**
   * The deployment's entry points.
   */
  entryPoints?: EntryPoint[];
  /**
   * Last modified date time stamp.
   */
  updateTime?: Date;
}

function serializeDeployment(data: any): Deployment {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeDeployment(data: any): Deployment {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Metadata the defines how a deployment is configured.
 */
export interface DeploymentConfig {
  /**
   * The description for this deployment.
   */
  description?: string;
  /**
   * The manifest file name for this deployment.
   */
  manifestFileName?: string;
  /**
   * The script project's Drive ID.
   */
  scriptId?: string;
  /**
   * The version number on which this deployment is based.
   */
  versionNumber?: number;
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
 * A configuration that defines how a deployment is accessed externally.
 */
export interface EntryPoint {
  /**
   * Add-on properties.
   */
  addOn?: GoogleAppsScriptTypeAddOnEntryPoint;
  /**
   * The type of the entry point.
   */
  entryPointType?:  | "ENTRY_POINT_TYPE_UNSPECIFIED" | "WEB_APP" | "EXECUTION_API" | "ADD_ON";
  /**
   * An entry point specification for Apps Script API execution calls.
   */
  executionApi?: GoogleAppsScriptTypeExecutionApiEntryPoint;
  /**
   * An entry point specification for web apps.
   */
  webApp?: GoogleAppsScriptTypeWebAppEntryPoint;
}

/**
 * The response for executing or debugging a function in an Apps Script
 * project.
 */
export interface ExecuteStreamResponse {
  /**
   * The result of the execution.
   */
  result?: ScriptExecutionResult;
}

function serializeExecuteStreamResponse(data: any): ExecuteStreamResponse {
  return {
    ...data,
    result: data["result"] !== undefined ? serializeScriptExecutionResult(data["result"]) : undefined,
  };
}

function deserializeExecuteStreamResponse(data: any): ExecuteStreamResponse {
  return {
    ...data,
    result: data["result"] !== undefined ? deserializeScriptExecutionResult(data["result"]) : undefined,
  };
}

/**
 * An object that provides information about the nature of an error resulting
 * from an attempted execution of a script function using the Apps Script API.
 * If a run call succeeds but the script function (or Apps Script itself) throws
 * an exception, the response body's error field contains a Status object. The
 * `Status` object's `details` field contains an array with a single one of
 * these `ExecutionError` objects.
 */
export interface ExecutionError {
  /**
   * The error message thrown by Apps Script, usually localized into the user's
   * language.
   */
  errorMessage?: string;
  /**
   * The error type, for example `TypeError` or `ReferenceError`. If the error
   * type is unavailable, this field is not included.
   */
  errorType?: string;
  /**
   * An array of objects that provide a stack trace through the script to show
   * where the execution failed, with the deepest call first.
   */
  scriptStackTraceElements?: ScriptStackTraceElement[];
}

/**
 * A request to run the function in a script. The script is identified by the
 * specified `script_id`. Executing a function on a script returns results based
 * on the implementation of the script.
 */
export interface ExecutionRequest {
  /**
   * If `true` and the user is an owner of the script, the script runs at the
   * most recently saved version rather than the version deployed for use with
   * the Apps Script API. Optional; default is `false`.
   */
  devMode?: boolean;
  /**
   * The name of the function to execute in the given script. The name does not
   * include parentheses or parameters. It can reference a function in an
   * included library such as `Library.libFunction1`.
   */
  function?: string;
  /**
   * The parameters to be passed to the function being executed. The object
   * type for each parameter should match the expected type in Apps Script.
   * Parameters cannot be Apps Script-specific object types (such as a
   * `Document` or a `Calendar`); they can only be primitive types such as
   * `string`, `number`, `array`, `object`, or `boolean`. Optional.
   */
  parameters?: any[];
  /**
   * *Deprecated*. For use with Android add-ons only. An ID that represents the
   * user's current session in the Android app for Google Docs or Sheets,
   * included as extra data in the
   * [Intent](https://developer.android.com/guide/components/intents-filters.html)
   * that launches the add-on. When an Android add-on is run with a session
   * state, it gains the privileges of a
   * [bound](https://developers.google.com/apps-script/guides/bound) script—that
   * is, it can access information like the user's current cursor position (in
   * Docs) or selected cell (in Sheets). To retrieve the state, call
   * `Intent.getStringExtra("com.google.android.apps.docs.addons.SessionState")`.
   * Optional.
   */
  sessionState?: string;
}

/**
 * An object that provides the return value of a function executed using the
 * Apps Script API. If the script function returns successfully, the response
 * body's response field contains this `ExecutionResponse` object.
 */
export interface ExecutionResponse {
  /**
   * The return value of the script function. The type matches the object type
   * returned in Apps Script. Functions called using the Apps Script API cannot
   * return Apps Script-specific objects (such as a `Document` or a `Calendar`);
   * they can only return primitive types such as a `string`, `number`, `array`,
   * `object`, or `boolean`.
   */
  result?: any;
}

/**
 * An individual file within a script project. A file is a third-party source
 * code created by one or more developers. It can be a server-side JS code,
 * HTML, or a configuration file. Each script project can contain multiple
 * files.
 */
export interface File {
  /**
   * Creation date timestamp. This read-only field is only visible to users who
   * have WRITER permission for the script project.
   */
  createTime?: Date;
  /**
   * The defined set of functions in the script file, if any.
   */
  functionSet?: GoogleAppsScriptTypeFunctionSet;
  /**
   * The user who modified the file most recently. This read-only field is only
   * visible to users who have WRITER permission for the script project.
   */
  lastModifyUser?: GoogleAppsScriptTypeUser;
  /**
   * The name of the file. The file extension is not part of the file name,
   * which can be identified from the type field.
   */
  name?: string;
  /**
   * The file content.
   */
  source?: string;
  /**
   * The type of the file.
   */
  type?:  | "ENUM_TYPE_UNSPECIFIED" | "SERVER_JS" | "HTML" | "JSON";
  /**
   * Last modified date timestamp. This read-only field is only visible to
   * users who have WRITER permission for the script project.
   */
  updateTime?: Date;
}

function serializeFile(data: any): File {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeFile(data: any): File {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * An add-on entry point.
 */
export interface GoogleAppsScriptTypeAddOnEntryPoint {
  /**
   * The add-on's required list of supported container types.
   */
  addOnType?:  | "UNKNOWN_ADDON_TYPE" | "GMAIL" | "DATA_STUDIO";
  /**
   * The add-on's optional description.
   */
  description?: string;
  /**
   * The add-on's optional help URL.
   */
  helpUrl?: string;
  /**
   * The add-on's required post install tip URL.
   */
  postInstallTipUrl?: string;
  /**
   * The add-on's optional report issue URL.
   */
  reportIssueUrl?: string;
  /**
   * The add-on's required title.
   */
  title?: string;
}

/**
 * API executable entry point configuration.
 */
export interface GoogleAppsScriptTypeExecutionApiConfig {
  /**
   * Who has permission to run the API executable.
   */
  access?:  | "UNKNOWN_ACCESS" | "MYSELF" | "DOMAIN" | "ANYONE" | "ANYONE_ANONYMOUS";
}

/**
 * An API executable entry point.
 */
export interface GoogleAppsScriptTypeExecutionApiEntryPoint {
  /**
   * The entry point's configuration.
   */
  entryPointConfig?: GoogleAppsScriptTypeExecutionApiConfig;
}

/**
 * Represents a function in a script project.
 */
export interface GoogleAppsScriptTypeFunction {
  /**
   * The function name in the script project.
   */
  name?: string;
  /**
   * The ordered list of parameter names of the function in the script project.
   */
  parameters?: string[];
}

/**
 * A set of functions. No duplicates are permitted.
 */
export interface GoogleAppsScriptTypeFunctionSet {
  /**
   * A list of functions composing the set.
   */
  values?: GoogleAppsScriptTypeFunction[];
}

/**
 * Representation of a single script process execution that was started from
 * the script editor, a trigger, an application, or using the Apps Script API.
 * This is distinct from the `Operation` resource, which only represents
 * executions started via the Apps Script API.
 */
export interface GoogleAppsScriptTypeProcess {
  /**
   * Duration the execution spent executing.
   */
  duration?: number /* Duration */;
  /**
   * Name of the function the started the execution.
   */
  functionName?: string;
  /**
   * The executions status.
   */
  processStatus?:  | "PROCESS_STATUS_UNSPECIFIED" | "RUNNING" | "PAUSED" | "COMPLETED" | "CANCELED" | "FAILED" | "TIMED_OUT" | "UNKNOWN" | "DELAYED";
  /**
   * The executions type.
   */
  processType?:  | "PROCESS_TYPE_UNSPECIFIED" | "ADD_ON" | "EXECUTION_API" | "TIME_DRIVEN" | "TRIGGER" | "WEBAPP" | "EDITOR" | "SIMPLE_TRIGGER" | "MENU" | "BATCH_TASK";
  /**
   * Name of the script being executed.
   */
  projectName?: string;
  /**
   * Time the execution started.
   */
  startTime?: Date;
  /**
   * The executing users access level to the script.
   */
  userAccessLevel?:  | "USER_ACCESS_LEVEL_UNSPECIFIED" | "NONE" | "READ" | "WRITE" | "OWNER";
}

function serializeGoogleAppsScriptTypeProcess(data: any): GoogleAppsScriptTypeProcess {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleAppsScriptTypeProcess(data: any): GoogleAppsScriptTypeProcess {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * A simple user profile resource.
 */
export interface GoogleAppsScriptTypeUser {
  /**
   * The user's domain.
   */
  domain?: string;
  /**
   * The user's identifying email address.
   */
  email?: string;
  /**
   * The user's display name.
   */
  name?: string;
  /**
   * The user's photo.
   */
  photoUrl?: string;
}

/**
 * Web app entry point configuration.
 */
export interface GoogleAppsScriptTypeWebAppConfig {
  /**
   * Who has permission to run the web app.
   */
  access?:  | "UNKNOWN_ACCESS" | "MYSELF" | "DOMAIN" | "ANYONE" | "ANYONE_ANONYMOUS";
  /**
   * Who to execute the web app as.
   */
  executeAs?:  | "UNKNOWN_EXECUTE_AS" | "USER_ACCESSING" | "USER_DEPLOYING";
}

/**
 * A web application entry point.
 */
export interface GoogleAppsScriptTypeWebAppEntryPoint {
  /**
   * The entry point's configuration.
   */
  entryPointConfig?: GoogleAppsScriptTypeWebAppConfig;
  /**
   * The URL for the web application.
   */
  url?: string;
}

/**
 * Response with the list of deployments for the specified Apps Script project.
 */
export interface ListDeploymentsResponse {
  /**
   * The list of deployments.
   */
  deployments?: Deployment[];
  /**
   * The token that can be used in the next call to get the next page of
   * results.
   */
  nextPageToken?: string;
}

function serializeListDeploymentsResponse(data: any): ListDeploymentsResponse {
  return {
    ...data,
    deployments: data["deployments"] !== undefined ? data["deployments"].map((item: any) => (serializeDeployment(item))) : undefined,
  };
}

function deserializeListDeploymentsResponse(data: any): ListDeploymentsResponse {
  return {
    ...data,
    deployments: data["deployments"] !== undefined ? data["deployments"].map((item: any) => (deserializeDeployment(item))) : undefined,
  };
}

/**
 * Response with the list of Process resources.
 */
export interface ListScriptProcessesResponse {
  /**
   * Token for the next page of results. If empty, there are no more pages
   * remaining.
   */
  nextPageToken?: string;
  /**
   * List of processes matching request parameters.
   */
  processes?: GoogleAppsScriptTypeProcess[];
}

function serializeListScriptProcessesResponse(data: any): ListScriptProcessesResponse {
  return {
    ...data,
    processes: data["processes"] !== undefined ? data["processes"].map((item: any) => (serializeGoogleAppsScriptTypeProcess(item))) : undefined,
  };
}

function deserializeListScriptProcessesResponse(data: any): ListScriptProcessesResponse {
  return {
    ...data,
    processes: data["processes"] !== undefined ? data["processes"].map((item: any) => (deserializeGoogleAppsScriptTypeProcess(item))) : undefined,
  };
}

/**
 * Response with the list of Process resources.
 */
export interface ListUserProcessesResponse {
  /**
   * Token for the next page of results. If empty, there are no more pages
   * remaining.
   */
  nextPageToken?: string;
  /**
   * List of processes matching request parameters.
   */
  processes?: GoogleAppsScriptTypeProcess[];
}

function serializeListUserProcessesResponse(data: any): ListUserProcessesResponse {
  return {
    ...data,
    processes: data["processes"] !== undefined ? data["processes"].map((item: any) => (serializeGoogleAppsScriptTypeProcess(item))) : undefined,
  };
}

function deserializeListUserProcessesResponse(data: any): ListUserProcessesResponse {
  return {
    ...data,
    processes: data["processes"] !== undefined ? data["processes"].map((item: any) => (deserializeGoogleAppsScriptTypeProcess(item))) : undefined,
  };
}

/**
 * `ListValue` is a wrapper around a repeated field of values.
 */
export interface ListValue {
  /**
   * Repeated field of dynamically typed values.
   */
  values?: Value[];
}

function serializeListValue(data: any): ListValue {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (serializeValue(item))) : undefined,
  };
}

function deserializeListValue(data: any): ListValue {
  return {
    ...data,
    values: data["values"] !== undefined ? data["values"].map((item: any) => (deserializeValue(item))) : undefined,
  };
}

/**
 * Response with the list of the versions for the specified script project.
 */
export interface ListVersionsResponse {
  /**
   * The token use to fetch the next page of records. if not exist in the
   * response, that means no more versions to list.
   */
  nextPageToken?: string;
  /**
   * The list of versions.
   */
  versions?: Version[];
}

function serializeListVersionsResponse(data: any): ListVersionsResponse {
  return {
    ...data,
    versions: data["versions"] !== undefined ? data["versions"].map((item: any) => (serializeVersion(item))) : undefined,
  };
}

function deserializeListVersionsResponse(data: any): ListVersionsResponse {
  return {
    ...data,
    versions: data["versions"] !== undefined ? data["versions"].map((item: any) => (deserializeVersion(item))) : undefined,
  };
}

/**
 * Resource containing usage stats for a given script, based on the supplied
 * filter and mask present in the request.
 */
export interface Metrics {
  /**
   * Number of active users.
   */
  activeUsers?: MetricsValue[];
  /**
   * Number of failed executions.
   */
  failedExecutions?: MetricsValue[];
  /**
   * Number of total executions.
   */
  totalExecutions?: MetricsValue[];
}

function serializeMetrics(data: any): Metrics {
  return {
    ...data,
    activeUsers: data["activeUsers"] !== undefined ? data["activeUsers"].map((item: any) => (serializeMetricsValue(item))) : undefined,
    failedExecutions: data["failedExecutions"] !== undefined ? data["failedExecutions"].map((item: any) => (serializeMetricsValue(item))) : undefined,
    totalExecutions: data["totalExecutions"] !== undefined ? data["totalExecutions"].map((item: any) => (serializeMetricsValue(item))) : undefined,
  };
}

function deserializeMetrics(data: any): Metrics {
  return {
    ...data,
    activeUsers: data["activeUsers"] !== undefined ? data["activeUsers"].map((item: any) => (deserializeMetricsValue(item))) : undefined,
    failedExecutions: data["failedExecutions"] !== undefined ? data["failedExecutions"].map((item: any) => (deserializeMetricsValue(item))) : undefined,
    totalExecutions: data["totalExecutions"] !== undefined ? data["totalExecutions"].map((item: any) => (deserializeMetricsValue(item))) : undefined,
  };
}

/**
 * Metrics value that holds number of executions counted.
 */
export interface MetricsValue {
  /**
   * Required field indicating the end time of the interval.
   */
  endTime?: Date;
  /**
   * Required field indicating the start time of the interval.
   */
  startTime?: Date;
  /**
   * Indicates the number of executions counted.
   */
  value?: bigint;
}

function serializeMetricsValue(data: any): MetricsValue {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    value: data["value"] !== undefined ? String(data["value"]) : undefined,
  };
}

function deserializeMetricsValue(data: any): MetricsValue {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    value: data["value"] !== undefined ? BigInt(data["value"]) : undefined,
  };
}

/**
 * A representation of an execution of an Apps Script function started with
 * run. The execution response does not arrive until the function finishes
 * executing. The maximum execution runtime is listed in the [Apps Script quotas
 * guide](/apps-script/guides/services/quotas#current_limitations). After
 * execution has started, it can have one of four outcomes: - If the script
 * function returns successfully, the response field contains an
 * ExecutionResponse object with the function's return value in the object's
 * `result` field. - If the script function (or Apps Script itself) throws an
 * exception, the error field contains a Status object. The `Status` object's
 * `details` field contains an array with a single ExecutionError object that
 * provides information about the nature of the error. - If the execution has
 * not yet completed, the done field is `false` and the neither the `response`
 * nor `error` fields are present. - If the `run` call itself fails (for
 * example, because of a malformed request or an authorization error), the
 * method returns an HTTP response code in the 4XX range with a different format
 * for the response body. Client libraries automatically convert a 4XX response
 * into an exception class.
 */
export interface Operation {
  /**
   * This field indicates whether the script execution has completed. A
   * completed execution has a populated `response` field containing the
   * ExecutionResponse from function that was executed.
   */
  done?: boolean;
  /**
   * If a `run` call succeeds but the script function (or Apps Script itself)
   * throws an exception, this field contains a Status object. The `Status`
   * object's `details` field contains an array with a single ExecutionError
   * object that provides information about the nature of the error.
   */
  error?: Status;
  /**
   * If the script function returns successfully, this field contains an
   * ExecutionResponse object with the function's return value.
   */
  response?: {
    [key: string]: any
  };
}

/**
 * Additional options for Script#processesList.
 */
export interface ProcessesListOptions {
  /**
   * The maximum number of returned processes per page of results. Defaults to
   * 50.
   */
  pageSize?: number;
  /**
   * The token for continuing a previous list request on the next page. This
   * should be set to the value of `nextPageToken` from a previous response.
   */
  pageToken?: string;
  /**
   * Optional field used to limit returned processes to those originating from
   * projects with a specific deployment ID.
   */
  ["userProcessFilter.deploymentId"]?: string;
  /**
   * Optional field used to limit returned processes to those that completed on
   * or before the given timestamp.
   */
  ["userProcessFilter.endTime"]?: Date;
  /**
   * Optional field used to limit returned processes to those originating from
   * a script function with the given function name.
   */
  ["userProcessFilter.functionName"]?: string;
  /**
   * Optional field used to limit returned processes to those originating from
   * projects with project names containing a specific string.
   */
  ["userProcessFilter.projectName"]?: string;
  /**
   * Optional field used to limit returned processes to those originating from
   * projects with a specific script ID.
   */
  ["userProcessFilter.scriptId"]?: string;
  /**
   * Optional field used to limit returned processes to those that were started
   * on or after the given timestamp.
   */
  ["userProcessFilter.startTime"]?: Date;
  /**
   * Optional field used to limit returned processes to those having one of the
   * specified process statuses.
   */
  ["userProcessFilter.statuses"]?:  | "PROCESS_STATUS_UNSPECIFIED" | "RUNNING" | "PAUSED" | "COMPLETED" | "CANCELED" | "FAILED" | "TIMED_OUT" | "UNKNOWN" | "DELAYED";
  /**
   * Optional field used to limit returned processes to those having one of the
   * specified process types.
   */
  ["userProcessFilter.types"]?:  | "PROCESS_TYPE_UNSPECIFIED" | "ADD_ON" | "EXECUTION_API" | "TIME_DRIVEN" | "TRIGGER" | "WEBAPP" | "EDITOR" | "SIMPLE_TRIGGER" | "MENU" | "BATCH_TASK";
  /**
   * Optional field used to limit returned processes to those having one of the
   * specified user access levels.
   */
  ["userProcessFilter.userAccessLevels"]?:  | "USER_ACCESS_LEVEL_UNSPECIFIED" | "NONE" | "READ" | "WRITE" | "OWNER";
}

function serializeProcessesListOptions(data: any): ProcessesListOptions {
  return {
    ...data,
    ["userProcessFilter.endTime"]: data["userProcessFilter.endTime"] !== undefined ? data["userProcessFilter.endTime"].toISOString() : undefined,
    ["userProcessFilter.startTime"]: data["userProcessFilter.startTime"] !== undefined ? data["userProcessFilter.startTime"].toISOString() : undefined,
  };
}

function deserializeProcessesListOptions(data: any): ProcessesListOptions {
  return {
    ...data,
    ["userProcessFilter.endTime"]: data["userProcessFilter.endTime"] !== undefined ? new Date(data["userProcessFilter.endTime"]) : undefined,
    ["userProcessFilter.startTime"]: data["userProcessFilter.startTime"] !== undefined ? new Date(data["userProcessFilter.startTime"]) : undefined,
  };
}

/**
 * Additional options for Script#processesListScriptProcesses.
 */
export interface ProcessesListScriptProcessesOptions {
  /**
   * The maximum number of returned processes per page of results. Defaults to
   * 50.
   */
  pageSize?: number;
  /**
   * The token for continuing a previous list request on the next page. This
   * should be set to the value of `nextPageToken` from a previous response.
   */
  pageToken?: string;
  /**
   * The script ID of the project whose processes are listed.
   */
  scriptId?: string;
  /**
   * Optional field used to limit returned processes to those originating from
   * projects with a specific deployment ID.
   */
  ["scriptProcessFilter.deploymentId"]?: string;
  /**
   * Optional field used to limit returned processes to those that completed on
   * or before the given timestamp.
   */
  ["scriptProcessFilter.endTime"]?: Date;
  /**
   * Optional field used to limit returned processes to those originating from
   * a script function with the given function name.
   */
  ["scriptProcessFilter.functionName"]?: string;
  /**
   * Optional field used to limit returned processes to those that were started
   * on or after the given timestamp.
   */
  ["scriptProcessFilter.startTime"]?: Date;
  /**
   * Optional field used to limit returned processes to those having one of the
   * specified process statuses.
   */
  ["scriptProcessFilter.statuses"]?:  | "PROCESS_STATUS_UNSPECIFIED" | "RUNNING" | "PAUSED" | "COMPLETED" | "CANCELED" | "FAILED" | "TIMED_OUT" | "UNKNOWN" | "DELAYED";
  /**
   * Optional field used to limit returned processes to those having one of the
   * specified process types.
   */
  ["scriptProcessFilter.types"]?:  | "PROCESS_TYPE_UNSPECIFIED" | "ADD_ON" | "EXECUTION_API" | "TIME_DRIVEN" | "TRIGGER" | "WEBAPP" | "EDITOR" | "SIMPLE_TRIGGER" | "MENU" | "BATCH_TASK";
  /**
   * Optional field used to limit returned processes to those having one of the
   * specified user access levels.
   */
  ["scriptProcessFilter.userAccessLevels"]?:  | "USER_ACCESS_LEVEL_UNSPECIFIED" | "NONE" | "READ" | "WRITE" | "OWNER";
}

function serializeProcessesListScriptProcessesOptions(data: any): ProcessesListScriptProcessesOptions {
  return {
    ...data,
    ["scriptProcessFilter.endTime"]: data["scriptProcessFilter.endTime"] !== undefined ? data["scriptProcessFilter.endTime"].toISOString() : undefined,
    ["scriptProcessFilter.startTime"]: data["scriptProcessFilter.startTime"] !== undefined ? data["scriptProcessFilter.startTime"].toISOString() : undefined,
  };
}

function deserializeProcessesListScriptProcessesOptions(data: any): ProcessesListScriptProcessesOptions {
  return {
    ...data,
    ["scriptProcessFilter.endTime"]: data["scriptProcessFilter.endTime"] !== undefined ? new Date(data["scriptProcessFilter.endTime"]) : undefined,
    ["scriptProcessFilter.startTime"]: data["scriptProcessFilter.startTime"] !== undefined ? new Date(data["scriptProcessFilter.startTime"]) : undefined,
  };
}

/**
 * The script project resource.
 */
export interface Project {
  /**
   * When the script was created.
   */
  createTime?: Date;
  /**
   * User who originally created the script.
   */
  creator?: GoogleAppsScriptTypeUser;
  /**
   * User who last modified the script.
   */
  lastModifyUser?: GoogleAppsScriptTypeUser;
  /**
   * The parent's Drive ID that the script will be attached to. This is usually
   * the ID of a Google Document or Google Sheet. This filed is optional, and if
   * not set, a stand-alone script will be created.
   */
  parentId?: string;
  /**
   * The script project's Drive ID.
   */
  scriptId?: string;
  /**
   * The title for the project.
   */
  title?: string;
  /**
   * When the script was last updated.
   */
  updateTime?: Date;
}

function serializeProject(data: any): Project {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeProject(data: any): Project {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Additional options for Script#projectsDeploymentsList.
 */
export interface ProjectsDeploymentsListOptions {
  /**
   * The maximum number of deployments on each returned page. Defaults to 50.
   */
  pageSize?: number;
  /**
   * The token for continuing a previous list request on the next page. This
   * should be set to the value of `nextPageToken` from a previous response.
   */
  pageToken?: string;
}

/**
 * Additional options for Script#projectsGetContent.
 */
export interface ProjectsGetContentOptions {
  /**
   * The version number of the project to retrieve. If not provided, the
   * project's HEAD version is returned.
   */
  versionNumber?: number;
}

/**
 * Additional options for Script#projectsGetMetrics.
 */
export interface ProjectsGetMetricsOptions {
  /**
   * Optional field indicating a specific deployment to retrieve metrics from.
   */
  ["metricsFilter.deploymentId"]?: string;
  /**
   * Required field indicating what granularity of metrics are returned.
   */
  metricsGranularity?:  | "UNSPECIFIED_GRANULARITY" | "WEEKLY" | "DAILY";
}

/**
 * Additional options for Script#projectsVersionsList.
 */
export interface ProjectsVersionsListOptions {
  /**
   * The maximum number of versions on each returned page. Defaults to 50.
   */
  pageSize?: number;
  /**
   * The token for continuing a previous list request on the next page. This
   * should be set to the value of `nextPageToken` from a previous response.
   */
  pageToken?: string;
}

/**
 * The result of an execution.
 */
export interface ScriptExecutionResult {
  /**
   * The returned value of the execution.
   */
  returnValue?: Value;
}

function serializeScriptExecutionResult(data: any): ScriptExecutionResult {
  return {
    ...data,
    returnValue: data["returnValue"] !== undefined ? serializeValue(data["returnValue"]) : undefined,
  };
}

function deserializeScriptExecutionResult(data: any): ScriptExecutionResult {
  return {
    ...data,
    returnValue: data["returnValue"] !== undefined ? deserializeValue(data["returnValue"]) : undefined,
  };
}

/**
 * A stack trace through the script that shows where the execution failed.
 */
export interface ScriptStackTraceElement {
  /**
   * The name of the function that failed.
   */
  function?: string;
  /**
   * The line number where the script failed.
   */
  lineNumber?: number;
}

/**
 * If a `run` call succeeds but the script function (or Apps Script itself)
 * throws an exception, the response body's error field contains this `Status`
 * object.
 */
export interface Status {
  /**
   * The status code. For this API, this value either: - 10, indicating a
   * `SCRIPT_TIMEOUT` error, - 3, indicating an `INVALID_ARGUMENT` error, or -
   * 1, indicating a `CANCELLED` execution.
   */
  code?: number;
  /**
   * An array that contains a single ExecutionError object that provides
   * information about the nature of the error.
   */
  details?: {
    [key: string]: any
  }[];
  /**
   * A developer-facing error message, which is in English. Any user-facing
   * error message is localized and sent in the details field, or localized by
   * the client.
   */
  message?: string;
}

/**
 * `Struct` represents a structured data value, consisting of fields which map
 * to dynamically typed values.
 */
export interface Struct {
  /**
   * Unordered map of dynamically typed values.
   */
  fields?: {
    [key: string]: Value
  };
}

function serializeStruct(data: any): Struct {
  return {
    ...data,
    fields: data["fields"] !== undefined ? Object.fromEntries(Object.entries(data["fields"]).map(([k, v]: [string, any]) => ([k, serializeValue(v)]))) : undefined,
  };
}

function deserializeStruct(data: any): Struct {
  return {
    ...data,
    fields: data["fields"] !== undefined ? Object.fromEntries(Object.entries(data["fields"]).map(([k, v]: [string, any]) => ([k, deserializeValue(v)]))) : undefined,
  };
}

/**
 * Request with deployment information to update an existing deployment.
 */
export interface UpdateDeploymentRequest {
  /**
   * The deployment configuration.
   */
  deploymentConfig?: DeploymentConfig;
}

/**
 * `Value` represents a dynamically typed value which is the outcome of an
 * executed script.
 */
export interface Value {
  /**
   * Represents a boolean value.
   */
  boolValue?: boolean;
  /**
   * Represents raw byte values.
   */
  bytesValue?: Uint8Array;
  /**
   * Represents a date in ms since the epoch.
   */
  dateValue?: bigint;
  /**
   * Represents a repeated `Value`.
   */
  listValue?: ListValue;
  /**
   * Represents a null value.
   */
  nullValue?:  | "NULL_VALUE";
  /**
   * Represents a double value.
   */
  numberValue?: number;
  /**
   * Represents a structured proto value.
   */
  protoValue?: {
    [key: string]: any
  };
  /**
   * Represents a string value.
   */
  stringValue?: string;
  /**
   * Represents a structured value.
   */
  structValue?: Struct;
}

function serializeValue(data: any): Value {
  return {
    ...data,
    bytesValue: data["bytesValue"] !== undefined ? encodeBase64(data["bytesValue"]) : undefined,
    dateValue: data["dateValue"] !== undefined ? String(data["dateValue"]) : undefined,
    listValue: data["listValue"] !== undefined ? serializeListValue(data["listValue"]) : undefined,
    structValue: data["structValue"] !== undefined ? serializeStruct(data["structValue"]) : undefined,
  };
}

function deserializeValue(data: any): Value {
  return {
    ...data,
    bytesValue: data["bytesValue"] !== undefined ? decodeBase64(data["bytesValue"] as string) : undefined,
    dateValue: data["dateValue"] !== undefined ? BigInt(data["dateValue"]) : undefined,
    listValue: data["listValue"] !== undefined ? deserializeListValue(data["listValue"]) : undefined,
    structValue: data["structValue"] !== undefined ? deserializeStruct(data["structValue"]) : undefined,
  };
}

/**
 * A resource representing a script project version. A version is a "snapshot"
 * of a script project and is similar to a read-only branched release. When
 * creating deployments, the version to use must be specified.
 */
export interface Version {
  /**
   * When the version was created.
   */
  createTime?: Date;
  /**
   * The description for this version.
   */
  description?: string;
  /**
   * The script project's Drive ID.
   */
  scriptId?: string;
  /**
   * The incremental ID that is created by Apps Script when a version is
   * created. This is system assigned number and is immutable once created.
   */
  versionNumber?: number;
}

function serializeVersion(data: any): Version {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeVersion(data: any): Version {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
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
