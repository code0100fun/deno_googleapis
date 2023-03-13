// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Firebase Rules API Client for Deno
 * ==================================
 * 
 * Creates and manages rules that determine when a Firebase Rules-enabled service should permit a request. 
 * 
 * Docs: https://firebase.google.com/docs/storage/security
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Creates and manages rules that determine when a Firebase Rules-enabled
 * service should permit a request.
 */
export class FirebaseRules {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://firebaserules.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Create a `Release`. Release names should reflect the developer's
   * deployment practices. For example, the release name may include the
   * environment name, application name, application version, or any other name
   * meaningful to the developer. Once a `Release` refers to a `Ruleset`, the
   * rules can be enforced by Firebase Rules-enabled services. More than one
   * `Release` may be 'live' concurrently. Consider the following three
   * `Release` names for `projects/foo` and the `Ruleset` to which they refer.
   * Release Name -> Ruleset Name * projects/foo/releases/prod ->
   * projects/foo/rulesets/uuid123 * projects/foo/releases/prod/beta ->
   * projects/foo/rulesets/uuid123 * projects/foo/releases/prod/v23 ->
   * projects/foo/rulesets/uuid456 The relationships reflect a `Ruleset` rollout
   * in progress. The `prod` and `prod/beta` releases refer to the same
   * `Ruleset`. However, `prod/v23` refers to a new `Ruleset`. The `Ruleset`
   * reference for a `Release` may be updated using the UpdateRelease method.
   *
   * @param name Required. Resource name for the project which owns this `Release`. Format: `projects/{project_id}`
   */
  async projectsReleasesCreate(name: string, req: Release): Promise<Release> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/releases`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Release;
  }

  /**
   * Delete a `Release` by resource name.
   *
   * @param name Required. Resource name for the `Release` to delete. Format: `projects/{project_id}/releases/{release_id}`
   */
  async projectsReleasesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Get a `Release` by name.
   *
   * @param name Required. Resource name of the `Release`. Format: `projects/{project_id}/releases/{release_id}`
   */
  async projectsReleasesGet(name: string): Promise<Release> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Release;
  }

  /**
   * Get the `Release` executable to use when enforcing rules.
   *
   * @param name Required. Resource name of the `Release`. Format: `projects/{project_id}/releases/{release_id}`
   */
  async projectsReleasesGetExecutable(name: string, opts: ProjectsReleasesGetExecutableOptions = {}): Promise<GetReleaseExecutableResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:getExecutable`);
    if (opts.executableVersion !== undefined) {
      url.searchParams.append("executableVersion", String(opts.executableVersion));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetReleaseExecutableResponse(data);
  }

  /**
   * List the `Release` values for a project. This list may optionally be
   * filtered by `Release` name, `Ruleset` name, `TestSuite` name, or any
   * combination thereof.
   *
   * @param name Required. Resource name for the project. Format: `projects/{project_id}`
   */
  async projectsReleasesList(name: string, opts: ProjectsReleasesListOptions = {}): Promise<ListReleasesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/releases`);
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
    return data as ListReleasesResponse;
  }

  /**
   * Update a `Release` via PATCH. Only updates to `ruleset_name` will be
   * honored. `Release` rename is not supported. To create a `Release` use the
   * CreateRelease method.
   *
   * @param name Required. Resource name for the project which owns this `Release`. Format: `projects/{project_id}`
   */
  async projectsReleasesPatch(name: string, req: UpdateReleaseRequest): Promise<Release> {
    req = serializeUpdateReleaseRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Release;
  }

  /**
   * Create a `Ruleset` from `Source`. The `Ruleset` is given a unique
   * generated name which is returned to the caller. `Source` containing
   * syntactic or semantics errors will result in an error response indicating
   * the first error encountered. For a detailed view of `Source` issues, use
   * TestRuleset.
   *
   * @param name Required. Resource name for Project which owns this `Ruleset`. Format: `projects/{project_id}`
   */
  async projectsRulesetsCreate(name: string, req: Ruleset): Promise<Ruleset> {
    req = serializeRuleset(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }/rulesets`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRuleset(data);
  }

  /**
   * Delete a `Ruleset` by resource name. If the `Ruleset` is referenced by a
   * `Release` the operation will fail.
   *
   * @param name Required. Resource name for the ruleset to delete. Format: `projects/{project_id}/rulesets/{ruleset_id}`
   */
  async projectsRulesetsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Get a `Ruleset` by name including the full `Source` contents.
   *
   * @param name Required. Resource name for the ruleset to get. Format: `projects/{project_id}/rulesets/{ruleset_id}`
   */
  async projectsRulesetsGet(name: string): Promise<Ruleset> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRuleset(data);
  }

  /**
   * List `Ruleset` metadata only and optionally filter the results by
   * `Ruleset` name. The full `Source` contents of a `Ruleset` may be retrieved
   * with GetRuleset.
   *
   * @param name Required. Resource name for the project. Format: `projects/{project_id}`
   */
  async projectsRulesetsList(name: string, opts: ProjectsRulesetsListOptions = {}): Promise<ListRulesetsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/rulesets`);
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
    return deserializeListRulesetsResponse(data);
  }

  /**
   * Test `Source` for syntactic and semantic correctness. Issues present, if
   * any, will be returned to the caller with a description, severity, and
   * source location. The test method may be executed with `Source` or a
   * `Ruleset` name. Passing `Source` is useful for unit testing new rules.
   * Passing a `Ruleset` name is useful for regression testing an existing rule.
   * The following is an example of `Source` that permits users to upload images
   * to a bucket bearing their user id and matching the correct metadata:
   * _*Example*_ // Users are allowed to subscribe and unsubscribe to the blog.
   * service firebase.storage { match /users/{userId}/images/{imageName} { allow
   * write: if userId == request.auth.uid && (imageName.matches('*.png$') ||
   * imageName.matches('*.jpg$')) && resource.mimeType.matches('^image/') } }
   *
   * @param name Required. Tests may either provide `source` or a `Ruleset` resource name. For tests against `source`, the resource name must refer to the project: Format: `projects/{project_id}` For tests against a `Ruleset`, this must be the `Ruleset` resource name: Format: `projects/{project_id}/rulesets/{ruleset_id}`
   */
  async projectsTest(name: string, req: TestRulesetRequest): Promise<TestRulesetResponse> {
    req = serializeTestRulesetRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:test`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestRulesetResponse;
  }
}

/**
 * Arg matchers for the mock function.
 */
export interface Arg {
  /**
   * Argument matches any value provided.
   */
  anyValue?: Empty;
  /**
   * Argument exactly matches value provided.
   */
  exactValue?: any;
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
 * Describes where in a file an expression is found and what it was evaluated
 * to over the course of its use.
 */
export interface ExpressionReport {
  /**
   * Subexpressions
   */
  children?: ExpressionReport[];
  /**
   * Position of expression in original rules source.
   */
  sourcePosition?: SourcePosition;
  /**
   * Values that this expression evaluated to when encountered.
   */
  values?: ValueCount[];
}

/**
 * `File` containing source content.
 */
export interface File {
  /**
   * Required. Textual Content.
   */
  content?: string;
  /**
   * Fingerprint (e.g. github sha) associated with the `File`.
   */
  fingerprint?: Uint8Array;
  /**
   * Required. File name.
   */
  name?: string;
}

function serializeFile(data: any): File {
  return {
    ...data,
    fingerprint: data["fingerprint"] !== undefined ? encodeBase64(data["fingerprint"]) : undefined,
  };
}

function deserializeFile(data: any): File {
  return {
    ...data,
    fingerprint: data["fingerprint"] !== undefined ? decodeBase64(data["fingerprint"] as string) : undefined,
  };
}

/**
 * Represents a service-defined function call that was invoked during test
 * execution.
 */
export interface FunctionCall {
  /**
   * The arguments that were provided to the function.
   */
  args?: any[];
  /**
   * Name of the function invoked.
   */
  function?: string;
}

/**
 * Mock function definition. Mocks must refer to a function declared by the
 * target service. The type of the function args and result will be inferred at
 * test time. If either the arg or result values are not compatible with
 * function type declaration, the request will be considered invalid. More than
 * one `FunctionMock` may be provided for a given function name so long as the
 * `Arg` matchers are distinct. There may be only one function for a given
 * overload where all `Arg` values are `Arg.any_value`.
 */
export interface FunctionMock {
  /**
   * The list of `Arg` values to match. The order in which the arguments are
   * provided is the order in which they must appear in the function invocation.
   */
  args?: Arg[];
  /**
   * The name of the function. The function name must match one provided by a
   * service declaration.
   */
  function?: string;
  /**
   * The mock result of the function call.
   */
  result?: Result;
}

/**
 * The response for FirebaseRulesService.GetReleaseExecutable
 */
export interface GetReleaseExecutableResponse {
  /**
   * Executable view of the `Ruleset` referenced by the `Release`.
   */
  executable?: Uint8Array;
  /**
   * The Rules runtime version of the executable.
   */
  executableVersion?:  | "RELEASE_EXECUTABLE_VERSION_UNSPECIFIED" | "FIREBASE_RULES_EXECUTABLE_V1" | "FIREBASE_RULES_EXECUTABLE_V2";
  /**
   * `Language` used to generate the executable bytes.
   */
  language?:  | "LANGUAGE_UNSPECIFIED" | "FIREBASE_RULES" | "EVENT_FLOW_TRIGGERS";
  /**
   * `Ruleset` name associated with the `Release` executable.
   */
  rulesetName?: string;
  /**
   * Optional, indicates the freshness of the result. The response is
   * guaranteed to be the latest within an interval up to the sync_time
   * (inclusive).
   */
  syncTime?: Date;
  /**
   * Timestamp for the most recent `Release.update_time`.
   */
  updateTime?: Date;
}

function serializeGetReleaseExecutableResponse(data: any): GetReleaseExecutableResponse {
  return {
    ...data,
    executable: data["executable"] !== undefined ? encodeBase64(data["executable"]) : undefined,
    syncTime: data["syncTime"] !== undefined ? data["syncTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGetReleaseExecutableResponse(data: any): GetReleaseExecutableResponse {
  return {
    ...data,
    executable: data["executable"] !== undefined ? decodeBase64(data["executable"] as string) : undefined,
    syncTime: data["syncTime"] !== undefined ? new Date(data["syncTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Issues include warnings, errors, and deprecation notices.
 */
export interface Issue {
  /**
   * Short error description.
   */
  description?: string;
  /**
   * The severity of the issue.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "DEPRECATION" | "WARNING" | "ERROR";
  /**
   * Position of the issue in the `Source`.
   */
  sourcePosition?: SourcePosition;
}

/**
 * The response for FirebaseRulesService.ListReleases.
 */
export interface ListReleasesResponse {
  /**
   * The pagination token to retrieve the next page of results. If the value is
   * empty, no further results remain.
   */
  nextPageToken?: string;
  /**
   * List of `Release` instances.
   */
  releases?: Release[];
}

/**
 * The response for FirebaseRulesService.ListRulesets.
 */
export interface ListRulesetsResponse {
  /**
   * The pagination token to retrieve the next page of results. If the value is
   * empty, no further results remain.
   */
  nextPageToken?: string;
  /**
   * List of `Ruleset` instances.
   */
  rulesets?: Ruleset[];
}

function serializeListRulesetsResponse(data: any): ListRulesetsResponse {
  return {
    ...data,
    rulesets: data["rulesets"] !== undefined ? data["rulesets"].map((item: any) => (serializeRuleset(item))) : undefined,
  };
}

function deserializeListRulesetsResponse(data: any): ListRulesetsResponse {
  return {
    ...data,
    rulesets: data["rulesets"] !== undefined ? data["rulesets"].map((item: any) => (deserializeRuleset(item))) : undefined,
  };
}

/**
 * Metadata for a Ruleset.
 */
export interface Metadata {
  /**
   * Services that this ruleset has declarations for (e.g., "cloud.firestore").
   * There may be 0+ of these.
   */
  services?: string[];
}

/**
 * Additional options for FirebaseRules#projectsReleasesGetExecutable.
 */
export interface ProjectsReleasesGetExecutableOptions {
  /**
   * The requested runtime executable version. Defaults to
   * FIREBASE_RULES_EXECUTABLE_V1.
   */
  executableVersion?:  | "RELEASE_EXECUTABLE_VERSION_UNSPECIFIED" | "FIREBASE_RULES_EXECUTABLE_V1" | "FIREBASE_RULES_EXECUTABLE_V2";
}

/**
 * Additional options for FirebaseRules#projectsReleasesList.
 */
export interface ProjectsReleasesListOptions {
  /**
   * `Release` filter. The list method supports filters with restrictions on
   * the `Release.name`, and `Release.ruleset_name`. Example 1: A filter of
   * 'name=prod*' might return `Release`s with names within 'projects/foo'
   * prefixed with 'prod': Name -> Ruleset Name: * projects/foo/releases/prod ->
   * projects/foo/rulesets/uuid1234 * projects/foo/releases/prod/v1 ->
   * projects/foo/rulesets/uuid1234 * projects/foo/releases/prod/v2 ->
   * projects/foo/rulesets/uuid8888 Example 2: A filter of `name=prod*
   * ruleset_name=uuid1234` would return only `Release` instances for
   * 'projects/foo' with names prefixed with 'prod' referring to the same
   * `Ruleset` name of 'uuid1234': Name -> Ruleset Name: *
   * projects/foo/releases/prod -> projects/foo/rulesets/1234 *
   * projects/foo/releases/prod/v1 -> projects/foo/rulesets/1234 In the
   * examples, the filter parameters refer to the search filters are relative to
   * the project. Fully qualified prefixed may also be used.
   */
  filter?: string;
  /**
   * Page size to load. Maximum of 100. Defaults to 10. Note: `page_size` is
   * just a hint and the service may choose to load fewer than `page_size`
   * results due to the size of the output. To traverse all of the releases, the
   * caller should iterate until the `page_token` on the response is empty.
   */
  pageSize?: number;
  /**
   * Next page token for the next batch of `Release` instances.
   */
  pageToken?: string;
}

/**
 * Additional options for FirebaseRules#projectsRulesetsList.
 */
export interface ProjectsRulesetsListOptions {
  /**
   * `Ruleset` filter. The list method supports filters with restrictions on
   * `Ruleset.name`. Filters on `Ruleset.create_time` should use the `date`
   * function which parses strings that conform to the RFC 3339 date/time
   * specifications. Example: `create_time > date("2017-01-01T00:00:00Z") AND
   * name=UUID-*`
   */
  filter?: string;
  /**
   * Page size to load. Maximum of 100. Defaults to 10. Note: `page_size` is
   * just a hint and the service may choose to load less than `page_size` due to
   * the size of the output. To traverse all of the releases, caller should
   * iterate until the `page_token` is empty.
   */
  pageSize?: number;
  /**
   * Next page token for loading the next batch of `Ruleset` instances.
   */
  pageToken?: string;
}

/**
 * `Release` is a named reference to a `Ruleset`. Once a `Release` refers to a
 * `Ruleset`, rules-enabled services will be able to enforce the `Ruleset`.
 */
export interface Release {
  /**
   * Output only. Time the release was created.
   */
  readonly createTime?: Date;
  /**
   * Required. Format: `projects/{project_id}/releases/{release_id}`
   */
  name?: string;
  /**
   * Required. Name of the `Ruleset` referred to by this `Release`. The
   * `Ruleset` must exist for the `Release` to be created.
   */
  rulesetName?: string;
  /**
   * Output only. Time the release was updated.
   */
  readonly updateTime?: Date;
}

/**
 * Possible result values from the function mock invocation.
 */
export interface Result {
  /**
   * The result is undefined, meaning the result could not be computed.
   */
  undefined?: Empty;
  /**
   * The result is an actual value. The type of the value must match that of
   * the type declared by the service.
   */
  value?: any;
}

/**
 * `Ruleset` is an immutable copy of `Source` with a globally unique identifier
 * and a creation time.
 */
export interface Ruleset {
  /**
   * Output only. Time the `Ruleset` was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The metadata for this ruleset.
   */
  readonly metadata?: Metadata;
  /**
   * Output only. Name of the `Ruleset`. The ruleset_id is auto generated by
   * the service. Format: `projects/{project_id}/rulesets/{ruleset_id}`
   */
  readonly name?: string;
  /**
   * Required. `Source` for the `Ruleset`.
   */
  source?: Source;
}

function serializeRuleset(data: any): Ruleset {
  return {
    ...data,
    source: data["source"] !== undefined ? serializeSource(data["source"]) : undefined,
  };
}

function deserializeRuleset(data: any): Ruleset {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    source: data["source"] !== undefined ? deserializeSource(data["source"]) : undefined,
  };
}

/**
 * `Source` is one or more `File` messages comprising a logical set of rules.
 */
export interface Source {
  /**
   * Required. `File` set constituting the `Source` bundle.
   */
  files?: File[];
}

function serializeSource(data: any): Source {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (serializeFile(item))) : undefined,
  };
}

function deserializeSource(data: any): Source {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (deserializeFile(item))) : undefined,
  };
}

/**
 * Position in the `Source` content including its line, column number, and an
 * index of the `File` in the `Source` message. Used for debug purposes.
 */
export interface SourcePosition {
  /**
   * First column on the source line associated with the source fragment.
   */
  column?: number;
  /**
   * Start position relative to the beginning of the file.
   */
  currentOffset?: number;
  /**
   * End position relative to the beginning of the file.
   */
  endOffset?: number;
  /**
   * Name of the `File`.
   */
  fileName?: string;
  /**
   * Line number of the source fragment. 1-based.
   */
  line?: number;
}

/**
 * `TestCase` messages provide the request context and an expectation as to
 * whether the given context will be allowed or denied. Test cases may specify
 * the `request`, `resource`, and `function_mocks` to mock a function call to a
 * service-provided function. The `request` object represents context present at
 * request-time. The `resource` is the value of the target resource as it
 * appears in persistent storage before the request is executed.
 */
export interface TestCase {
  /**
   * Test expectation.
   */
  expectation?:  | "EXPECTATION_UNSPECIFIED" | "ALLOW" | "DENY";
  /**
   * Specifies what should be included in the response.
   */
  expressionReportLevel?:  | "LEVEL_UNSPECIFIED" | "NONE" | "FULL" | "VISITED";
  /**
   * Optional function mocks for service-defined functions. If not set, any
   * service defined function is expected to return an error, which may or may
   * not influence the test outcome.
   */
  functionMocks?: FunctionMock[];
  /**
   * Specifies whether paths (such as request.path) are encoded and how.
   */
  pathEncoding?:  | "ENCODING_UNSPECIFIED" | "URL_ENCODED" | "PLAIN";
  /**
   * Request context. The exact format of the request context is
   * service-dependent. See the appropriate service documentation for
   * information about the supported fields and types on the request. Minimally,
   * all services support the following fields and types: Request field | Type
   * ---------------|----------------- auth.uid | `string` auth.token | `map`
   * headers | `map` method | `string` params | `map` path | `string` time |
   * `google.protobuf.Timestamp` If the request value is not well-formed for the
   * service, the request will be rejected as an invalid argument.
   */
  request?: any;
  /**
   * Optional resource value as it appears in persistent storage before the
   * request is fulfilled. The resource type depends on the `request.path`
   * value.
   */
  resource?: any;
}

/**
 * Test result message containing the state of the test as well as a
 * description and source position for test failures.
 */
export interface TestResult {
  /**
   * Debug messages related to test execution issues encountered during
   * evaluation. Debug messages may be related to too many or too few
   * invocations of function mocks or to runtime errors that occur during
   * evaluation. For example: ```Unable to read variable [name: "resource"]```
   */
  debugMessages?: string[];
  /**
   * Position in the `Source` or `Ruleset` where the principle runtime error
   * occurs. Evaluation of an expression may result in an error. Rules are deny
   * by default, so a `DENY` expectation when an error is generated is valid.
   * When there is a `DENY` with an error, the `SourcePosition` is returned.
   * E.g. `error_position { line: 19 column: 37 }`
   */
  errorPosition?: SourcePosition;
  /**
   * The mapping from expression in the ruleset AST to the values they were
   * evaluated to. Partially-nested to mirror AST structure. Note that this
   * field is actually tracking expressions and not permission statements in
   * contrast to the "visited_expressions" field above. Literal expressions are
   * omitted.
   */
  expressionReports?: ExpressionReport[];
  /**
   * The set of function calls made to service-defined methods. Function calls
   * are included in the order in which they are encountered during evaluation,
   * are provided for both mocked and unmocked functions, and included on the
   * response regardless of the test `state`.
   */
  functionCalls?: FunctionCall[];
  /**
   * State of the test.
   */
  state?:  | "STATE_UNSPECIFIED" | "SUCCESS" | "FAILURE";
  /**
   * The set of visited permission expressions for a given test. This returns
   * the positions and evaluation results of all visited permission expressions
   * which were relevant to the test case, e.g. ``` match /path { allow read if:
   * } ``` For a detailed report of the intermediate evaluation states, see the
   * `expression_reports` field
   */
  visitedExpressions?: VisitedExpression[];
}

/**
 * The request for FirebaseRulesService.TestRuleset.
 */
export interface TestRulesetRequest {
  /**
   * Optional `Source` to be checked for correctness. This field must not be
   * set when the resource name refers to a `Ruleset`.
   */
  source?: Source;
  /**
   * The tests to execute against the `Source`. When `Source` is provided
   * inline, the test cases will only be run if the `Source` is syntactically
   * and semantically valid. Inline `TestSuite` to run.
   */
  testSuite?: TestSuite;
}

function serializeTestRulesetRequest(data: any): TestRulesetRequest {
  return {
    ...data,
    source: data["source"] !== undefined ? serializeSource(data["source"]) : undefined,
  };
}

function deserializeTestRulesetRequest(data: any): TestRulesetRequest {
  return {
    ...data,
    source: data["source"] !== undefined ? deserializeSource(data["source"]) : undefined,
  };
}

/**
 * The response for FirebaseRulesService.TestRuleset.
 */
export interface TestRulesetResponse {
  /**
   * Syntactic and semantic `Source` issues of varying severity. Issues of
   * `ERROR` severity will prevent tests from executing.
   */
  issues?: Issue[];
  /**
   * The set of test results given the test cases in the `TestSuite`. The
   * results will appear in the same order as the test cases appear in the
   * `TestSuite`.
   */
  testResults?: TestResult[];
}

/**
 * `TestSuite` is a collection of `TestCase` instances that validate the
 * logical correctness of a `Ruleset`. The `TestSuite` may be referenced in-line
 * within a `TestRuleset` invocation or as part of a `Release` object as a
 * pre-release check.
 */
export interface TestSuite {
  /**
   * Collection of test cases associated with the `TestSuite`.
   */
  testCases?: TestCase[];
}

/**
 * The request for FirebaseRulesService.UpdateRelease.
 */
export interface UpdateReleaseRequest {
  /**
   * Required. `Release` to update.
   */
  release?: Release;
  /**
   * Specifies which fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeUpdateReleaseRequest(data: any): UpdateReleaseRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUpdateReleaseRequest(data: any): UpdateReleaseRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Tuple for how many times an Expression was evaluated to a particular
 * ExpressionValue.
 */
export interface ValueCount {
  /**
   * The amount of times that expression returned.
   */
  count?: number;
  /**
   * The return value of the expression
   */
  value?: any;
}

/**
 * Store the position and access outcome for an expression visited in rules.
 */
export interface VisitedExpression {
  /**
   * Position in the `Source` or `Ruleset` where an expression was visited.
   */
  sourcePosition?: SourcePosition;
  /**
   * The evaluated value for the visited expression, e.g. true/false
   */
  value?: any;
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
