// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Error Reporting API Client for Deno
 * ===================================
 * 
 * Groups and counts similar errors from cloud services and applications, reports new errors, and provides access to error groups and their associated errors. 
 * 
 * Docs: https://cloud.google.com/error-reporting/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Groups and counts similar errors from cloud services and applications,
 * reports new errors, and provides access to error groups and their associated
 * errors.
 */
export class cloudErrorReporting {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://clouderrorreporting.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Deletes all error events of a given project.
   *
   * @param projectName Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}`, where `{projectID}` is the [Google Cloud Platform project ID](https://support.google.com/cloud/answer/6158840). Example: `projects/my-project-123`.
   */
  async projectsDeleteEvents(projectName: string): Promise<DeleteEventsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ projectName }/events`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as DeleteEventsResponse;
  }

  /**
   * Lists the specified events.
   *
   * @param projectName Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}`, where `{projectID}` is the [Google Cloud Platform project ID](https://support.google.com/cloud/answer/6158840). Example: `projects/my-project-123`.
   */
  async projectsEventsList(projectName: string, opts: ProjectsEventsListOptions = {}): Promise<ListEventsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ projectName }/events`);
    if (opts.groupId !== undefined) {
      url.searchParams.append("groupId", String(opts.groupId));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts["serviceFilter.resourceType"] !== undefined) {
      url.searchParams.append("serviceFilter.resourceType", String(opts["serviceFilter.resourceType"]));
    }
    if (opts["serviceFilter.service"] !== undefined) {
      url.searchParams.append("serviceFilter.service", String(opts["serviceFilter.service"]));
    }
    if (opts["serviceFilter.version"] !== undefined) {
      url.searchParams.append("serviceFilter.version", String(opts["serviceFilter.version"]));
    }
    if (opts["timeRange.period"] !== undefined) {
      url.searchParams.append("timeRange.period", String(opts["timeRange.period"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListEventsResponse(data);
  }

  /**
   * Report an individual error event and record the event to a log. This
   * endpoint accepts **either** an OAuth token, **or** an [API
   * key](https://support.google.com/cloud/answer/6158862) for authentication.
   * To use an API key, append it to the URL as the value of a `key` parameter.
   * For example: `POST
   * https://clouderrorreporting.googleapis.com/v1beta1/{projectName}/events:report?key=123ABC456`
   * **Note:** [Error Reporting] (https://cloud.google.com/error-reporting) is a
   * global service built on Cloud Logging and doesn't analyze logs stored in
   * regional log buckets or logs routed to other Google Cloud projects.
   *
   * @param projectName Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectId}`, where `{projectId}` is the [Google Cloud Platform project ID](https://support.google.com/cloud/answer/6158840). Example: // `projects/my-project-123`.
   */
  async projectsEventsReport(projectName: string, req: ReportedErrorEvent): Promise<ReportErrorEventResponse> {
    req = serializeReportedErrorEvent(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ projectName }/events:report`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReportErrorEventResponse;
  }

  /**
   * Get the specified group.
   *
   * @param groupName Required. The group resource name. Written as `projects/{projectID}/groups/{group_name}`. Call groupStats.list to return a list of groups belonging to this project. Example: `projects/my-project-123/groups/my-group`
   */
  async projectsGroupsGet(groupName: string): Promise<ErrorGroup> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ groupName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ErrorGroup;
  }

  /**
   * Lists the specified groups.
   *
   * @param projectName Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}` or `projects/{projectNumber}`, where `{projectID}` and `{projectNumber}` can be found in the [Google Cloud console](https://support.google.com/cloud/answer/6158840). Examples: `projects/my-project-123`, `projects/5551234`.
   */
  async projectsGroupStatsList(projectName: string, opts: ProjectsGroupStatsListOptions = {}): Promise<ListGroupStatsResponse> {
    opts = serializeProjectsGroupStatsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta1/${ projectName }/groupStats`);
    if (opts.alignment !== undefined) {
      url.searchParams.append("alignment", String(opts.alignment));
    }
    if (opts.alignmentTime !== undefined) {
      url.searchParams.append("alignmentTime", String(opts.alignmentTime));
    }
    if (opts.groupId !== undefined) {
      url.searchParams.append("groupId", String(opts.groupId));
    }
    if (opts.order !== undefined) {
      url.searchParams.append("order", String(opts.order));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts["serviceFilter.resourceType"] !== undefined) {
      url.searchParams.append("serviceFilter.resourceType", String(opts["serviceFilter.resourceType"]));
    }
    if (opts["serviceFilter.service"] !== undefined) {
      url.searchParams.append("serviceFilter.service", String(opts["serviceFilter.service"]));
    }
    if (opts["serviceFilter.version"] !== undefined) {
      url.searchParams.append("serviceFilter.version", String(opts["serviceFilter.version"]));
    }
    if (opts.timedCountDuration !== undefined) {
      url.searchParams.append("timedCountDuration", String(opts.timedCountDuration));
    }
    if (opts["timeRange.period"] !== undefined) {
      url.searchParams.append("timeRange.period", String(opts["timeRange.period"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListGroupStatsResponse(data);
  }

  /**
   * Replace the data for the specified group. Fails if the group does not
   * exist.
   *
   * @param name The group resource name. Example: projects/my-project-123/groups/CNSgkpnppqKCUw
   */
  async projectsGroupsUpdate(name: string, req: ErrorGroup): Promise<ErrorGroup> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as ErrorGroup;
  }
}

/**
 * Response message for deleting error events.
 */
export interface DeleteEventsResponse {
}

/**
 * A description of the context in which an error occurred. This data should be
 * provided by the application when reporting an error, unless the error report
 * has been generated automatically from Google App Engine logs.
 */
export interface ErrorContext {
  /**
   * The HTTP request which was processed when the error was triggered.
   */
  httpRequest?: HttpRequestContext;
  /**
   * The location in the source code where the decision was made to report the
   * error, usually the place where it was logged. For a logged exception this
   * would be the source line where the exception is logged, usually close to
   * the place where it was caught.
   */
  reportLocation?: SourceLocation;
  /**
   * Source code that was used to build the executable which has caused the
   * given error message.
   */
  sourceReferences?: SourceReference[];
  /**
   * The user who caused or was affected by the crash. This can be a user ID,
   * an email address, or an arbitrary token that uniquely identifies the user.
   * When sending an error report, leave this field empty if the user was not
   * logged in. In this case the Error Reporting system will use other data,
   * such as remote IP address, to distinguish affected users. See
   * `affected_users_count` in `ErrorGroupStats`.
   */
  user?: string;
}

/**
 * An error event which is returned by the Error Reporting system.
 */
export interface ErrorEvent {
  /**
   * Data about the context in which the error occurred.
   */
  context?: ErrorContext;
  /**
   * Time when the event occurred as provided in the error report. If the
   * report did not contain a timestamp, the time the error was received by the
   * Error Reporting system is used.
   */
  eventTime?: Date;
  /**
   * The stack trace that was reported or logged by the service.
   */
  message?: string;
  /**
   * The `ServiceContext` for which this error was reported.
   */
  serviceContext?: ServiceContext;
}

function serializeErrorEvent(data: any): ErrorEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? data["eventTime"].toISOString() : undefined,
  };
}

function deserializeErrorEvent(data: any): ErrorEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? new Date(data["eventTime"]) : undefined,
  };
}

/**
 * Description of a group of similar error events.
 */
export interface ErrorGroup {
  /**
   * Group IDs are unique for a given project. If the same kind of error occurs
   * in different service contexts, it will receive the same group ID.
   */
  groupId?: string;
  /**
   * The group resource name. Example:
   * projects/my-project-123/groups/CNSgkpnppqKCUw
   */
  name?: string;
  /**
   * Error group's resolution status. An unspecified resolution status will be
   * interpreted as OPEN
   */
  resolutionStatus?:  | "RESOLUTION_STATUS_UNSPECIFIED" | "OPEN" | "ACKNOWLEDGED" | "RESOLVED" | "MUTED";
  /**
   * Associated tracking issues.
   */
  trackingIssues?: TrackingIssue[];
}

/**
 * Data extracted for a specific group based on certain filter criteria, such
 * as a given time period and/or service filter.
 */
export interface ErrorGroupStats {
  /**
   * Service contexts with a non-zero error count for the given filter
   * criteria. This list can be truncated if multiple services are affected.
   * Refer to `num_affected_services` for the total count.
   */
  affectedServices?: ServiceContext[];
  /**
   * Approximate number of affected users in the given group that match the
   * filter criteria. Users are distinguished by data in the ErrorContext of the
   * individual error events, such as their login name or their remote IP
   * address in case of HTTP requests. The number of affected users can be zero
   * even if the number of errors is non-zero if no data was provided from which
   * the affected user could be deduced. Users are counted based on data in the
   * request context that was provided in the error report. If more users are
   * implicitly affected, such as due to a crash of the whole service, this is
   * not reflected here.
   */
  affectedUsersCount?: bigint;
  /**
   * Approximate total number of events in the given group that match the
   * filter criteria.
   */
  count?: bigint;
  /**
   * Approximate first occurrence that was ever seen for this group and which
   * matches the given filter criteria, ignoring the time_range that was
   * specified in the request.
   */
  firstSeenTime?: Date;
  /**
   * Group data that is independent of the filter criteria.
   */
  group?: ErrorGroup;
  /**
   * Approximate last occurrence that was ever seen for this group and which
   * matches the given filter criteria, ignoring the time_range that was
   * specified in the request.
   */
  lastSeenTime?: Date;
  /**
   * The total number of services with a non-zero error count for the given
   * filter criteria.
   */
  numAffectedServices?: number;
  /**
   * An arbitrary event that is chosen as representative for the whole group.
   * The representative event is intended to be used as a quick preview for the
   * whole group. Events in the group are usually sufficiently similar to each
   * other such that showing an arbitrary representative provides insight into
   * the characteristics of the group as a whole.
   */
  representative?: ErrorEvent;
  /**
   * Approximate number of occurrences over time. Timed counts returned by
   * ListGroups are guaranteed to be: - Inside the requested time interval -
   * Non-overlapping, and - Ordered by ascending time.
   */
  timedCounts?: TimedCount[];
}

function serializeErrorGroupStats(data: any): ErrorGroupStats {
  return {
    ...data,
    affectedUsersCount: data["affectedUsersCount"] !== undefined ? String(data["affectedUsersCount"]) : undefined,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
    firstSeenTime: data["firstSeenTime"] !== undefined ? data["firstSeenTime"].toISOString() : undefined,
    lastSeenTime: data["lastSeenTime"] !== undefined ? data["lastSeenTime"].toISOString() : undefined,
    representative: data["representative"] !== undefined ? serializeErrorEvent(data["representative"]) : undefined,
    timedCounts: data["timedCounts"] !== undefined ? data["timedCounts"].map((item: any) => (serializeTimedCount(item))) : undefined,
  };
}

function deserializeErrorGroupStats(data: any): ErrorGroupStats {
  return {
    ...data,
    affectedUsersCount: data["affectedUsersCount"] !== undefined ? BigInt(data["affectedUsersCount"]) : undefined,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
    firstSeenTime: data["firstSeenTime"] !== undefined ? new Date(data["firstSeenTime"]) : undefined,
    lastSeenTime: data["lastSeenTime"] !== undefined ? new Date(data["lastSeenTime"]) : undefined,
    representative: data["representative"] !== undefined ? deserializeErrorEvent(data["representative"]) : undefined,
    timedCounts: data["timedCounts"] !== undefined ? data["timedCounts"].map((item: any) => (deserializeTimedCount(item))) : undefined,
  };
}

/**
 * HTTP request data that is related to a reported error. This data should be
 * provided by the application when reporting an error, unless the error report
 * has been generated automatically from Google App Engine logs.
 */
export interface HttpRequestContext {
  /**
   * The type of HTTP request, such as `GET`, `POST`, etc.
   */
  method?: string;
  /**
   * The referrer information that is provided with the request.
   */
  referrer?: string;
  /**
   * The IP address from which the request originated. This can be IPv4, IPv6,
   * or a token which is derived from the IP address, depending on the data that
   * has been provided in the error report.
   */
  remoteIp?: string;
  /**
   * The HTTP response status code for the request.
   */
  responseStatusCode?: number;
  /**
   * The URL of the request.
   */
  url?: string;
  /**
   * The user agent information that is provided with the request.
   */
  userAgent?: string;
}

/**
 * Contains a set of requested error events.
 */
export interface ListEventsResponse {
  /**
   * The error events which match the given request.
   */
  errorEvents?: ErrorEvent[];
  /**
   * If non-empty, more results are available. Pass this token, along with the
   * same query parameters as the first request, to view the next page of
   * results.
   */
  nextPageToken?: string;
  /**
   * The timestamp specifies the start time to which the request was
   * restricted.
   */
  timeRangeBegin?: Date;
}

function serializeListEventsResponse(data: any): ListEventsResponse {
  return {
    ...data,
    errorEvents: data["errorEvents"] !== undefined ? data["errorEvents"].map((item: any) => (serializeErrorEvent(item))) : undefined,
    timeRangeBegin: data["timeRangeBegin"] !== undefined ? data["timeRangeBegin"].toISOString() : undefined,
  };
}

function deserializeListEventsResponse(data: any): ListEventsResponse {
  return {
    ...data,
    errorEvents: data["errorEvents"] !== undefined ? data["errorEvents"].map((item: any) => (deserializeErrorEvent(item))) : undefined,
    timeRangeBegin: data["timeRangeBegin"] !== undefined ? new Date(data["timeRangeBegin"]) : undefined,
  };
}

/**
 * Contains a set of requested error group stats.
 */
export interface ListGroupStatsResponse {
  /**
   * The error group stats which match the given request.
   */
  errorGroupStats?: ErrorGroupStats[];
  /**
   * If non-empty, more results are available. Pass this token, along with the
   * same query parameters as the first request, to view the next page of
   * results.
   */
  nextPageToken?: string;
  /**
   * The timestamp specifies the start time to which the request was
   * restricted. The start time is set based on the requested time range. It may
   * be adjusted to a later time if a project has exceeded the storage quota and
   * older data has been deleted.
   */
  timeRangeBegin?: Date;
}

function serializeListGroupStatsResponse(data: any): ListGroupStatsResponse {
  return {
    ...data,
    errorGroupStats: data["errorGroupStats"] !== undefined ? data["errorGroupStats"].map((item: any) => (serializeErrorGroupStats(item))) : undefined,
    timeRangeBegin: data["timeRangeBegin"] !== undefined ? data["timeRangeBegin"].toISOString() : undefined,
  };
}

function deserializeListGroupStatsResponse(data: any): ListGroupStatsResponse {
  return {
    ...data,
    errorGroupStats: data["errorGroupStats"] !== undefined ? data["errorGroupStats"].map((item: any) => (deserializeErrorGroupStats(item))) : undefined,
    timeRangeBegin: data["timeRangeBegin"] !== undefined ? new Date(data["timeRangeBegin"]) : undefined,
  };
}

/**
 * Additional options for cloudErrorReporting#projectsEventsList.
 */
export interface ProjectsEventsListOptions {
  /**
   * Required. The group for which events shall be returned.
   */
  groupId?: string;
  /**
   * Optional. The maximum number of results to return per response.
   */
  pageSize?: number;
  /**
   * Optional. A `next_page_token` provided by a previous response.
   */
  pageToken?: string;
  /**
   * Optional. The exact value to match against
   * [`ServiceContext.resource_type`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type).
   */
  ["serviceFilter.resourceType"]?: string;
  /**
   * Optional. The exact value to match against
   * [`ServiceContext.service`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service).
   */
  ["serviceFilter.service"]?: string;
  /**
   * Optional. The exact value to match against
   * [`ServiceContext.version`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version).
   */
  ["serviceFilter.version"]?: string;
  /**
   * Restricts the query to the specified time range.
   */
  ["timeRange.period"]?:  | "PERIOD_UNSPECIFIED" | "PERIOD_1_HOUR" | "PERIOD_6_HOURS" | "PERIOD_1_DAY" | "PERIOD_1_WEEK" | "PERIOD_30_DAYS";
}

/**
 * Additional options for cloudErrorReporting#projectsGroupStatsList.
 */
export interface ProjectsGroupStatsListOptions {
  /**
   * Optional. The alignment of the timed counts to be returned. Default is
   * `ALIGNMENT_EQUAL_AT_END`.
   */
  alignment?:  | "ERROR_COUNT_ALIGNMENT_UNSPECIFIED" | "ALIGNMENT_EQUAL_ROUNDED" | "ALIGNMENT_EQUAL_AT_END";
  /**
   * Optional. Time where the timed counts shall be aligned if rounded
   * alignment is chosen. Default is 00:00 UTC.
   */
  alignmentTime?: Date;
  /**
   * Optional. List all ErrorGroupStats with these IDs.
   */
  groupId?: string;
  /**
   * Optional. The sort order in which the results are returned. Default is
   * `COUNT_DESC`.
   */
  order?:  | "GROUP_ORDER_UNSPECIFIED" | "COUNT_DESC" | "LAST_SEEN_DESC" | "CREATED_DESC" | "AFFECTED_USERS_DESC";
  /**
   * Optional. The maximum number of results to return per response. Default is
   * 20.
   */
  pageSize?: number;
  /**
   * Optional. A next_page_token provided by a previous response. To view
   * additional results, pass this token along with the identical query
   * parameters as the first request.
   */
  pageToken?: string;
  /**
   * Optional. The exact value to match against
   * [`ServiceContext.resource_type`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type).
   */
  ["serviceFilter.resourceType"]?: string;
  /**
   * Optional. The exact value to match against
   * [`ServiceContext.service`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service).
   */
  ["serviceFilter.service"]?: string;
  /**
   * Optional. The exact value to match against
   * [`ServiceContext.version`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version).
   */
  ["serviceFilter.version"]?: string;
  /**
   * Optional. The preferred duration for a single returned TimedCount. If not
   * set, no timed counts are returned.
   */
  timedCountDuration?: number /* Duration */;
  /**
   * Restricts the query to the specified time range.
   */
  ["timeRange.period"]?:  | "PERIOD_UNSPECIFIED" | "PERIOD_1_HOUR" | "PERIOD_6_HOURS" | "PERIOD_1_DAY" | "PERIOD_1_WEEK" | "PERIOD_30_DAYS";
}

function serializeProjectsGroupStatsListOptions(data: any): ProjectsGroupStatsListOptions {
  return {
    ...data,
    alignmentTime: data["alignmentTime"] !== undefined ? data["alignmentTime"].toISOString() : undefined,
    timedCountDuration: data["timedCountDuration"] !== undefined ? data["timedCountDuration"] : undefined,
  };
}

function deserializeProjectsGroupStatsListOptions(data: any): ProjectsGroupStatsListOptions {
  return {
    ...data,
    alignmentTime: data["alignmentTime"] !== undefined ? new Date(data["alignmentTime"]) : undefined,
    timedCountDuration: data["timedCountDuration"] !== undefined ? data["timedCountDuration"] : undefined,
  };
}

/**
 * An error event which is reported to the Error Reporting system.
 */
export interface ReportedErrorEvent {
  /**
   * Optional. A description of the context in which the error occurred.
   */
  context?: ErrorContext;
  /**
   * Optional. Time when the event occurred. If not provided, the time when the
   * event was received by the Error Reporting system is used. If provided, the
   * time must not exceed the [logs retention
   * period](https://cloud.google.com/logging/quotas#logs_retention_periods) in
   * the past, or be more than 24 hours in the future. If an invalid time is
   * provided, then an error is returned.
   */
  eventTime?: Date;
  /**
   * Required. The error message. If no `context.reportLocation` is provided,
   * the message must contain a header (typically consisting of the exception
   * type name and an error message) and an exception stack trace in one of the
   * supported programming languages and formats. Supported languages are Java,
   * Python, JavaScript, Ruby, C#, PHP, and Go. Supported stack trace formats
   * are: * **Java**: Must be the return value of
   * [`Throwable.printStackTrace()`](https://docs.oracle.com/javase/7/docs/api/java/lang/Throwable.html#printStackTrace%28%29).
   * * **Python**: Must be the return value of
   * [`traceback.format_exc()`](https://docs.python.org/2/library/traceback.html#traceback.format_exc).
   * * **JavaScript**: Must be the value of
   * [`error.stack`](https://github.com/v8/v8/wiki/Stack-Trace-API) as returned
   * by V8. * **Ruby**: Must contain frames returned by
   * [`Exception.backtrace`](https://ruby-doc.org/core-2.2.0/Exception.html#method-i-backtrace).
   * * **C#**: Must be the return value of
   * [`Exception.ToString()`](https://msdn.microsoft.com/en-us/library/system.exception.tostring.aspx).
   * * **PHP**: Must be prefixed with `"PHP (Notice|Parse error|Fatal
   * error|Warning): "` and contain the result of
   * [`(string)$exception`](https://php.net/manual/en/exception.tostring.php). *
   * **Go**: Must be the return value of
   * [`runtime.Stack()`](https://golang.org/pkg/runtime/debug/#Stack).
   */
  message?: string;
  /**
   * Required. The service context in which this error has occurred.
   */
  serviceContext?: ServiceContext;
}

function serializeReportedErrorEvent(data: any): ReportedErrorEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? data["eventTime"].toISOString() : undefined,
  };
}

function deserializeReportedErrorEvent(data: any): ReportedErrorEvent {
  return {
    ...data,
    eventTime: data["eventTime"] !== undefined ? new Date(data["eventTime"]) : undefined,
  };
}

/**
 * Response for reporting an individual error event. Data may be added to this
 * message in the future.
 */
export interface ReportErrorEventResponse {
}

/**
 * Describes a running service that sends errors. Its version changes over time
 * and multiple versions can run in parallel.
 */
export interface ServiceContext {
  /**
   * Type of the MonitoredResource. List of possible values:
   * https://cloud.google.com/monitoring/api/resources Value is set
   * automatically for incoming errors and must not be set when reporting
   * errors.
   */
  resourceType?: string;
  /**
   * An identifier of the service, such as the name of the executable, job, or
   * Google App Engine service name. This field is expected to have a low number
   * of values that are relatively stable over time, as opposed to `version`,
   * which can be changed whenever new code is deployed. Contains the service
   * name for error reports extracted from Google App Engine logs or `default`
   * if the App Engine default service is used.
   */
  service?: string;
  /**
   * Represents the source code version that the developer provided, which
   * could represent a version label or a Git SHA-1 hash, for example. For App
   * Engine standard environment, the version is set to the version of the app.
   */
  version?: string;
}

/**
 * Indicates a location in the source code of the service for which errors are
 * reported. `functionName` must be provided by the application when reporting
 * an error, unless the error report contains a `message` with a supported
 * exception stack trace. All fields are optional for the later case.
 */
export interface SourceLocation {
  /**
   * The source code filename, which can include a truncated relative path, or
   * a full path from a production machine.
   */
  filePath?: string;
  /**
   * Human-readable name of a function or method. The value can include
   * optional context like the class or package name. For example,
   * `my.package.MyClass.method` in case of Java.
   */
  functionName?: string;
  /**
   * 1-based. 0 indicates that the line number is unknown.
   */
  lineNumber?: number;
}

/**
 * A reference to a particular snapshot of the source tree used to build and
 * deploy an application.
 */
export interface SourceReference {
  /**
   * Optional. A URI string identifying the repository. Example:
   * "https://github.com/GoogleCloudPlatform/kubernetes.git"
   */
  repository?: string;
  /**
   * The canonical and persistent identifier of the deployed revision. Example
   * (git): "0035781c50ec7aa23385dc841529ce8a4b70db1b"
   */
  revisionId?: string;
}

/**
 * The number of errors in a given time period. All numbers are approximate
 * since the error events are sampled before counting them.
 */
export interface TimedCount {
  /**
   * Approximate number of occurrences in the given time period.
   */
  count?: bigint;
  /**
   * End of the time period to which `count` refers (excluded).
   */
  endTime?: Date;
  /**
   * Start of the time period to which `count` refers (included).
   */
  startTime?: Date;
}

function serializeTimedCount(data: any): TimedCount {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeTimedCount(data: any): TimedCount {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Information related to tracking the progress on resolving the error.
 */
export interface TrackingIssue {
  /**
   * A URL pointing to a related entry in an issue tracking system. Example:
   * `https://github.com/user/project/issues/4`
   */
  url?: string;
}