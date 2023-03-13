// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Scheduler API Client for Deno
 * ===================================
 * 
 * Creates and manages jobs run on a regular recurring schedule.
 * 
 * Docs: https://cloud.google.com/scheduler/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Creates and manages jobs run on a regular recurring schedule.
 */
export class CloudScheduler {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudscheduler.googleapis.com/") {
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
   * Creates a job.
   *
   * @param parent Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID`.
   */
  async projectsLocationsJobsCreate(parent: string, req: Job): Promise<Job> {
    req = serializeJob(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/jobs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeJob(data);
  }

  /**
   * Deletes a job.
   *
   * @param name Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`.
   */
  async projectsLocationsJobsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a job.
   *
   * @param name Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`.
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
   * Lists jobs.
   *
   * @param parent Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID`.
   */
  async projectsLocationsJobsList(parent: string, opts: ProjectsLocationsJobsListOptions = {}): Promise<ListJobsResponse> {
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
    return deserializeListJobsResponse(data);
  }

  /**
   * Updates a job. If successful, the updated Job is returned. If the job does
   * not exist, `NOT_FOUND` is returned. If UpdateJob does not successfully
   * return, it is possible for the job to be in an Job.State.UPDATE_FAILED
   * state. A job in this state may not be executed. If this happens, retry the
   * UpdateJob request until a successful response is received.
   *
   * @param name Optionally caller-specified in CreateJob, after which it becomes output only. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]), hyphens (-), colons (:), or periods (.). For more information, see [Identifying projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects) * `LOCATION_ID` is the canonical ID for the job's location. The list of available locations can be obtained by calling ListLocations. For more information, see https://cloud.google.com/about/locations/. * `JOB_ID` can contain only letters ([A-Za-z]), numbers ([0-9]), hyphens (-), or underscores (_). The maximum length is 500 characters.
   */
  async projectsLocationsJobsPatch(name: string, req: Job, opts: ProjectsLocationsJobsPatchOptions = {}): Promise<Job> {
    req = serializeJob(req);
    opts = serializeProjectsLocationsJobsPatchOptions(opts);
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
    return deserializeJob(data);
  }

  /**
   * Pauses a job. If a job is paused then the system will stop executing the
   * job until it is re-enabled via ResumeJob. The state of the job is stored in
   * state; if paused it will be set to Job.State.PAUSED. A job must be in
   * Job.State.ENABLED to be paused.
   *
   * @param name Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`.
   */
  async projectsLocationsJobsPause(name: string, req: PauseJobRequest): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:pause`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeJob(data);
  }

  /**
   * Resume a job. This method reenables a job after it has been
   * Job.State.PAUSED. The state of a job is stored in Job.state; after calling
   * this method it will be set to Job.State.ENABLED. A job must be in
   * Job.State.PAUSED to be resumed.
   *
   * @param name Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`.
   */
  async projectsLocationsJobsResume(name: string, req: ResumeJobRequest): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:resume`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeJob(data);
  }

  /**
   * Forces a job to run now. When this method is called, Cloud Scheduler will
   * dispatch the job, even if the job is already running.
   *
   * @param name Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`.
   */
  async projectsLocationsJobsRun(name: string, req: RunJobRequest): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:run`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeJob(data);
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
}

/**
 * App Engine target. The job will be pushed to a job handler by means of an
 * HTTP request via an http_method such as HTTP POST, HTTP GET, etc. The job is
 * acknowledged by means of an HTTP response code in the range [200 - 299].
 * Error 503 is considered an App Engine system error instead of an application
 * error. Requests returning error 503 will be retried regardless of retry
 * configuration and not counted against retry counts. Any other response code,
 * or a failure to receive a response before the deadline, constitutes a failed
 * attempt.
 */
export interface AppEngineHttpTarget {
  /**
   * App Engine Routing setting for the job.
   */
  appEngineRouting?: AppEngineRouting;
  /**
   * Body. HTTP request body. A request body is allowed only if the HTTP method
   * is POST or PUT. It will result in invalid argument error to set a body on a
   * job with an incompatible HttpMethod.
   */
  body?: Uint8Array;
  /**
   * HTTP request headers. This map contains the header field names and values.
   * Headers can be set when the job is created. Cloud Scheduler sets some
   * headers to default values: * `User-Agent`: By default, this header is
   * `"AppEngine-Google; (+http://code.google.com/appengine)"`. This header can
   * be modified, but Cloud Scheduler will append `"AppEngine-Google;
   * (+http://code.google.com/appengine)"` to the modified `User-Agent`. *
   * `X-CloudScheduler`: This header will be set to true. *
   * `X-CloudScheduler-JobName`: This header will contain the job name. *
   * `X-CloudScheduler-ScheduleTime`: For Cloud Scheduler jobs specified in the
   * unix-cron format, this header will contain the job schedule time in RFC3339
   * UTC "Zulu" format. If the job has an body, Cloud Scheduler sets the
   * following headers: * `Content-Type`: By default, the `Content-Type` header
   * is set to `"application/octet-stream"`. The default can be overridden by
   * explictly setting `Content-Type` to a particular media type when the job is
   * created. For example, `Content-Type` can be set to `"application/json"`. *
   * `Content-Length`: This is computed by Cloud Scheduler. This value is output
   * only. It cannot be changed. The headers below are output only. They cannot
   * be set or overridden: * `X-Google-*`: For Google internal use only. *
   * `X-AppEngine-*`: For Google internal use only. In addition, some App Engine
   * headers, which contain job-specific information, are also be sent to the
   * job handler.
   */
  headers?: {
    [key: string]: string
  };
  /**
   * The HTTP method to use for the request. PATCH and OPTIONS are not
   * permitted.
   */
  httpMethod?:  | "HTTP_METHOD_UNSPECIFIED" | "POST" | "GET" | "HEAD" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";
  /**
   * The relative URI. The relative URL must begin with "/" and must be a valid
   * HTTP relative URL. It can contain a path, query string arguments, and `#`
   * fragments. If the relative URL is empty, then the root path "/" will be
   * used. No spaces are allowed, and the maximum length allowed is 2083
   * characters.
   */
  relativeUri?: string;
}

function serializeAppEngineHttpTarget(data: any): AppEngineHttpTarget {
  return {
    ...data,
    body: data["body"] !== undefined ? encodeBase64(data["body"]) : undefined,
  };
}

function deserializeAppEngineHttpTarget(data: any): AppEngineHttpTarget {
  return {
    ...data,
    body: data["body"] !== undefined ? decodeBase64(data["body"] as string) : undefined,
  };
}

/**
 * App Engine Routing. For more information about services, versions, and
 * instances see [An Overview of App
 * Engine](https://cloud.google.com/appengine/docs/python/an-overview-of-app-engine),
 * [Microservices Architecture on Google App
 * Engine](https://cloud.google.com/appengine/docs/python/microservices-on-app-engine),
 * [App Engine Standard request
 * routing](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed),
 * and [App Engine Flex request
 * routing](https://cloud.google.com/appengine/docs/flexible/python/how-requests-are-routed).
 */
export interface AppEngineRouting {
  /**
   * Output only. The host that the job is sent to. For more information about
   * how App Engine requests are routed, see
   * [here](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed).
   * The host is constructed as: * `host = [application_domain_name]` `|
   * [service] + '.' + [application_domain_name]` `| [version] + '.' +
   * [application_domain_name]` `| [version_dot_service]+ '.' +
   * [application_domain_name]` `| [instance] + '.' + [application_domain_name]`
   * `| [instance_dot_service] + '.' + [application_domain_name]` `|
   * [instance_dot_version] + '.' + [application_domain_name]` `|
   * [instance_dot_version_dot_service] + '.' + [application_domain_name]` *
   * `application_domain_name` = The domain name of the app, for example
   * .appspot.com, which is associated with the job's project ID. * `service =`
   * service * `version =` version * `version_dot_service =` version `+ '.' +`
   * service * `instance =` instance * `instance_dot_service =` instance `+ '.'
   * +` service * `instance_dot_version =` instance `+ '.' +` version *
   * `instance_dot_version_dot_service =` instance `+ '.' +` version `+ '.' +`
   * service If service is empty, then the job will be sent to the service which
   * is the default service when the job is attempted. If version is empty, then
   * the job will be sent to the version which is the default version when the
   * job is attempted. If instance is empty, then the job will be sent to an
   * instance which is available when the job is attempted. If service, version,
   * or instance is invalid, then the job will be sent to the default version of
   * the default service when the job is attempted.
   */
  host?: string;
  /**
   * App instance. By default, the job is sent to an instance which is
   * available when the job is attempted. Requests can only be sent to a
   * specific instance if [manual scaling is used in App Engine
   * Standard](https://cloud.google.com/appengine/docs/python/an-overview-of-app-engine?#scaling_types_and_instance_classes).
   * App Engine Flex does not support instances. For more information, see [App
   * Engine Standard request
   * routing](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed)
   * and [App Engine Flex request
   * routing](https://cloud.google.com/appengine/docs/flexible/python/how-requests-are-routed).
   */
  instance?: string;
  /**
   * App service. By default, the job is sent to the service which is the
   * default service when the job is attempted.
   */
  service?: string;
  /**
   * App version. By default, the job is sent to the version which is the
   * default version when the job is attempted.
   */
  version?: string;
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
 * Http target. The job will be pushed to the job handler by means of an HTTP
 * request via an http_method such as HTTP POST, HTTP GET, etc. The job is
 * acknowledged by means of an HTTP response code in the range [200 - 299]. A
 * failure to receive a response constitutes a failed execution. For a
 * redirected request, the response returned by the redirected request is
 * considered.
 */
export interface HttpTarget {
  /**
   * HTTP request body. A request body is allowed only if the HTTP method is
   * POST, PUT, or PATCH. It is an error to set body on a job with an
   * incompatible HttpMethod.
   */
  body?: Uint8Array;
  /**
   * The user can specify HTTP request headers to send with the job's HTTP
   * request. This map contains the header field names and values. Repeated
   * headers are not supported, but a header value can contain commas. These
   * headers represent a subset of the headers that will accompany the job's
   * HTTP request. Some HTTP request headers will be ignored or replaced. A
   * partial list of headers that will be ignored or replaced is below: - Host:
   * This will be computed by Cloud Scheduler and derived from uri. *
   * `Content-Length`: This will be computed by Cloud Scheduler. * `User-Agent`:
   * This will be set to `"Google-Cloud-Scheduler"`. * `X-Google-*`: Google
   * internal use only. * `X-AppEngine-*`: Google internal use only. *
   * `X-CloudScheduler`: This header will be set to true. *
   * `X-CloudScheduler-JobName`: This header will contain the job name. *
   * `X-CloudScheduler-ScheduleTime`: For Cloud Scheduler jobs specified in the
   * unix-cron format, this header will contain the job schedule time in RFC3339
   * UTC "Zulu" format. The total size of headers must be less than 80KB.
   */
  headers?: {
    [key: string]: string
  };
  /**
   * Which HTTP method to use for the request.
   */
  httpMethod?:  | "HTTP_METHOD_UNSPECIFIED" | "POST" | "GET" | "HEAD" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";
  /**
   * If specified, an [OAuth
   * token](https://developers.google.com/identity/protocols/OAuth2) will be
   * generated and attached as an `Authorization` header in the HTTP request.
   * This type of authorization should generally only be used when calling
   * Google APIs hosted on *.googleapis.com.
   */
  oauthToken?: OAuthToken;
  /**
   * If specified, an
   * [OIDC](https://developers.google.com/identity/protocols/OpenIDConnect)
   * token will be generated and attached as an `Authorization` header in the
   * HTTP request. This type of authorization can be used for many scenarios,
   * including calling Cloud Run, or endpoints where you intend to validate the
   * token yourself.
   */
  oidcToken?: OidcToken;
  /**
   * Required. The full URI path that the request will be sent to. This string
   * must begin with either "http://" or "https://". Some examples of valid
   * values for uri are: `http://acme.com` and `https://acme.com/sales:8080`.
   * Cloud Scheduler will encode some characters for safety and compatibility.
   * The maximum allowed URL length is 2083 characters after encoding.
   */
  uri?: string;
}

function serializeHttpTarget(data: any): HttpTarget {
  return {
    ...data,
    body: data["body"] !== undefined ? encodeBase64(data["body"]) : undefined,
  };
}

function deserializeHttpTarget(data: any): HttpTarget {
  return {
    ...data,
    body: data["body"] !== undefined ? decodeBase64(data["body"] as string) : undefined,
  };
}

/**
 * Configuration for a job. The maximum allowed size for a job is 1MB.
 */
export interface Job {
  /**
   * App Engine HTTP target.
   */
  appEngineHttpTarget?: AppEngineHttpTarget;
  /**
   * The deadline for job attempts. If the request handler does not respond by
   * this deadline then the request is cancelled and the attempt is marked as a
   * `DEADLINE_EXCEEDED` failure. The failed attempt can be viewed in execution
   * logs. Cloud Scheduler will retry the job according to the RetryConfig. The
   * default and the allowed values depend on the type of target: * For HTTP
   * targets, the default is 3 minutes. The deadline must be in the interval [15
   * seconds, 30 minutes]. * For App Engine HTTP targets, 0 indicates that the
   * request has the default deadline. The default deadline depends on the
   * scaling type of the service: 10 minutes for standard apps with automatic
   * scaling, 24 hours for standard apps with manual and basic scaling, and 60
   * minutes for flex apps. If the request deadline is set, it must be in the
   * interval [15 seconds, 24 hours 15 seconds]. * For Pub/Sub targets, this
   * field is ignored.
   */
  attemptDeadline?: number /* Duration */;
  /**
   * Optionally caller-specified in CreateJob or UpdateJob. A human-readable
   * description for the job. This string must not contain more than 500
   * characters.
   */
  description?: string;
  /**
   * HTTP target.
   */
  httpTarget?: HttpTarget;
  /**
   * Output only. The time the last job attempt started.
   */
  lastAttemptTime?: Date;
  /**
   * Optionally caller-specified in CreateJob, after which it becomes output
   * only. The job name. For example:
   * `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. * `PROJECT_ID` can
   * contain letters ([A-Za-z]), numbers ([0-9]), hyphens (-), colons (:), or
   * periods (.). For more information, see [Identifying
   * projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects)
   * * `LOCATION_ID` is the canonical ID for the job's location. The list of
   * available locations can be obtained by calling ListLocations. For more
   * information, see https://cloud.google.com/about/locations/. * `JOB_ID` can
   * contain only letters ([A-Za-z]), numbers ([0-9]), hyphens (-), or
   * underscores (_). The maximum length is 500 characters.
   */
  name?: string;
  /**
   * Pub/Sub target.
   */
  pubsubTarget?: PubsubTarget;
  /**
   * Settings that determine the retry behavior.
   */
  retryConfig?: RetryConfig;
  /**
   * Required, except when used with UpdateJob. Describes the schedule on which
   * the job will be executed. The schedule can be either of the following
   * types: * [Crontab](https://en.wikipedia.org/wiki/Cron#Overview) *
   * English-like
   * [schedule](https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules)
   * As a general rule, execution `n + 1` of a job will not begin until
   * execution `n` has finished. Cloud Scheduler will never allow two
   * simultaneously outstanding executions. For example, this implies that if
   * the `n+1`th execution is scheduled to run at 16:00 but the `n`th execution
   * takes until 16:15, the `n+1`th execution will not start until `16:15`. A
   * scheduled start time will be delayed if the previous execution has not
   * ended when its scheduled time occurs. If retry_count > 0 and a job attempt
   * fails, the job will be tried a total of retry_count times, with exponential
   * backoff, until the next scheduled start time.
   */
  schedule?: string;
  /**
   * Output only. The next time the job is scheduled. Note that this may be a
   * retry of a previously failed attempt or the next execution time according
   * to the schedule.
   */
  scheduleTime?: Date;
  /**
   * Output only. State of the job.
   */
  state?:  | "STATE_UNSPECIFIED" | "ENABLED" | "PAUSED" | "DISABLED" | "UPDATE_FAILED";
  /**
   * Output only. The response from the target for the last attempted
   * execution.
   */
  status?: Status;
  /**
   * Specifies the time zone to be used in interpreting schedule. The value of
   * this field must be a time zone name from the [tz
   * database](http://en.wikipedia.org/wiki/Tz_database). Note that some time
   * zones include a provision for daylight savings time. The rules for daylight
   * saving time are determined by the chosen tz. For UTC use the string "utc".
   * If a time zone is not specified, the default will be in UTC (also known as
   * GMT).
   */
  timeZone?: string;
  /**
   * Output only. The creation time of the job.
   */
  userUpdateTime?: Date;
}

function serializeJob(data: any): Job {
  return {
    ...data,
    appEngineHttpTarget: data["appEngineHttpTarget"] !== undefined ? serializeAppEngineHttpTarget(data["appEngineHttpTarget"]) : undefined,
    attemptDeadline: data["attemptDeadline"] !== undefined ? data["attemptDeadline"] : undefined,
    httpTarget: data["httpTarget"] !== undefined ? serializeHttpTarget(data["httpTarget"]) : undefined,
    lastAttemptTime: data["lastAttemptTime"] !== undefined ? data["lastAttemptTime"].toISOString() : undefined,
    pubsubTarget: data["pubsubTarget"] !== undefined ? serializePubsubTarget(data["pubsubTarget"]) : undefined,
    retryConfig: data["retryConfig"] !== undefined ? serializeRetryConfig(data["retryConfig"]) : undefined,
    scheduleTime: data["scheduleTime"] !== undefined ? data["scheduleTime"].toISOString() : undefined,
    userUpdateTime: data["userUpdateTime"] !== undefined ? data["userUpdateTime"].toISOString() : undefined,
  };
}

function deserializeJob(data: any): Job {
  return {
    ...data,
    appEngineHttpTarget: data["appEngineHttpTarget"] !== undefined ? deserializeAppEngineHttpTarget(data["appEngineHttpTarget"]) : undefined,
    attemptDeadline: data["attemptDeadline"] !== undefined ? data["attemptDeadline"] : undefined,
    httpTarget: data["httpTarget"] !== undefined ? deserializeHttpTarget(data["httpTarget"]) : undefined,
    lastAttemptTime: data["lastAttemptTime"] !== undefined ? new Date(data["lastAttemptTime"]) : undefined,
    pubsubTarget: data["pubsubTarget"] !== undefined ? deserializePubsubTarget(data["pubsubTarget"]) : undefined,
    retryConfig: data["retryConfig"] !== undefined ? deserializeRetryConfig(data["retryConfig"]) : undefined,
    scheduleTime: data["scheduleTime"] !== undefined ? new Date(data["scheduleTime"]) : undefined,
    userUpdateTime: data["userUpdateTime"] !== undefined ? new Date(data["userUpdateTime"]) : undefined,
  };
}

/**
 * Response message for listing jobs using ListJobs.
 */
export interface ListJobsResponse {
  /**
   * The list of jobs.
   */
  jobs?: Job[];
  /**
   * A token to retrieve next page of results. Pass this value in the
   * page_token field in the subsequent call to ListJobs to retrieve the next
   * page of results. If this is empty it indicates that there are no more
   * results through which to paginate. The page token is valid for only 2
   * hours.
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

/**
 * Contains information needed for generating an [OAuth
 * token](https://developers.google.com/identity/protocols/OAuth2). This type of
 * authorization should generally only be used when calling Google APIs hosted
 * on *.googleapis.com.
 */
export interface OAuthToken {
  /**
   * OAuth scope to be used for generating OAuth access token. If not
   * specified, "https://www.googleapis.com/auth/cloud-platform" will be used.
   */
  scope?: string;
  /**
   * [Service account
   * email](https://cloud.google.com/iam/docs/service-accounts) to be used for
   * generating OAuth token. The service account must be within the same project
   * as the job. The caller must have iam.serviceAccounts.actAs permission for
   * the service account.
   */
  serviceAccountEmail?: string;
}

/**
 * Contains information needed for generating an [OpenID Connect
 * token](https://developers.google.com/identity/protocols/OpenIDConnect). This
 * type of authorization can be used for many scenarios, including calling Cloud
 * Run, or endpoints where you intend to validate the token yourself.
 */
export interface OidcToken {
  /**
   * Audience to be used when generating OIDC token. If not specified, the URI
   * specified in target will be used.
   */
  audience?: string;
  /**
   * [Service account
   * email](https://cloud.google.com/iam/docs/service-accounts) to be used for
   * generating OIDC token. The service account must be within the same project
   * as the job. The caller must have iam.serviceAccounts.actAs permission for
   * the service account.
   */
  serviceAccountEmail?: string;
}

/**
 * Request message for PauseJob.
 */
export interface PauseJobRequest {
}

/**
 * Additional options for CloudScheduler#projectsLocationsJobsList.
 */
export interface ProjectsLocationsJobsListOptions {
  /**
   * Requested page size. The maximum page size is 500. If unspecified, the
   * page size will be the maximum. Fewer jobs than requested might be returned,
   * even if more jobs exist; use next_page_token to determine if more jobs
   * exist.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results the server will return. To request
   * the first page results, page_token must be empty. To request the next page
   * of results, page_token must be the value of next_page_token returned from
   * the previous call to ListJobs. It is an error to switch the value of filter
   * or order_by while iterating through pages.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudScheduler#projectsLocationsJobsPatch.
 */
export interface ProjectsLocationsJobsPatchOptions {
  /**
   * A mask used to specify which fields of the job are being updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsJobsPatchOptions(data: any): ProjectsLocationsJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsJobsPatchOptions(data: any): ProjectsLocationsJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudScheduler#projectsLocationsList.
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
 * Pub/Sub target. The job will be delivered by publishing a message to the
 * given Pub/Sub topic.
 */
export interface PubsubTarget {
  /**
   * Attributes for PubsubMessage. Pubsub message must contain either non-empty
   * data, or at least one attribute.
   */
  attributes?: {
    [key: string]: string
  };
  /**
   * The message payload for PubsubMessage. Pubsub message must contain either
   * non-empty data, or at least one attribute.
   */
  data?: Uint8Array;
  /**
   * Required. The name of the Cloud Pub/Sub topic to which messages will be
   * published when a job is delivered. The topic name must be in the same
   * format as required by Pub/Sub's
   * [PublishRequest.name](https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#publishrequest),
   * for example `projects/PROJECT_ID/topics/TOPIC_ID`. The topic must be in the
   * same project as the Cloud Scheduler job.
   */
  topicName?: string;
}

function serializePubsubTarget(data: any): PubsubTarget {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializePubsubTarget(data: any): PubsubTarget {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

/**
 * Request message for ResumeJob.
 */
export interface ResumeJobRequest {
}

/**
 * Settings that determine the retry behavior. By default, if a job does not
 * complete successfully (meaning that an acknowledgement is not received from
 * the handler, then it will be retried with exponential backoff according to
 * the settings in RetryConfig.
 */
export interface RetryConfig {
  /**
   * The maximum amount of time to wait before retrying a job after it fails.
   * The default value of this field is 1 hour.
   */
  maxBackoffDuration?: number /* Duration */;
  /**
   * The time between retries will double `max_doublings` times. A job's retry
   * interval starts at min_backoff_duration, then doubles `max_doublings`
   * times, then increases linearly, and finally retries at intervals of
   * max_backoff_duration up to retry_count times. For example, if
   * min_backoff_duration is 10s, max_backoff_duration is 300s, and
   * `max_doublings` is 3, then the a job will first be retried in 10s. The
   * retry interval will double three times, and then increase linearly by 2^3 *
   * 10s. Finally, the job will retry at intervals of max_backoff_duration until
   * the job has been attempted retry_count times. Thus, the requests will retry
   * at 10s, 20s, 40s, 80s, 160s, 240s, 300s, 300s, .... The default value of
   * this field is 5.
   */
  maxDoublings?: number;
  /**
   * The time limit for retrying a failed job, measured from time when an
   * execution was first attempted. If specified with retry_count, the job will
   * be retried until both limits are reached. The default value for
   * max_retry_duration is zero, which means retry duration is unlimited.
   */
  maxRetryDuration?: number /* Duration */;
  /**
   * The minimum amount of time to wait before retrying a job after it fails.
   * The default value of this field is 5 seconds.
   */
  minBackoffDuration?: number /* Duration */;
  /**
   * The number of attempts that the system will make to run a job using the
   * exponential backoff procedure described by max_doublings. The default value
   * of retry_count is zero. If retry_count is zero, a job attempt will *not* be
   * retried if it fails. Instead the Cloud Scheduler system will wait for the
   * next scheduled execution time. If retry_count is set to a non-zero number
   * then Cloud Scheduler will retry failed attempts, using exponential backoff,
   * retry_count times, or until the next scheduled execution time, whichever
   * comes first. Values greater than 5 and negative values are not allowed.
   */
  retryCount?: number;
}

function serializeRetryConfig(data: any): RetryConfig {
  return {
    ...data,
    maxBackoffDuration: data["maxBackoffDuration"] !== undefined ? data["maxBackoffDuration"] : undefined,
    maxRetryDuration: data["maxRetryDuration"] !== undefined ? data["maxRetryDuration"] : undefined,
    minBackoffDuration: data["minBackoffDuration"] !== undefined ? data["minBackoffDuration"] : undefined,
  };
}

function deserializeRetryConfig(data: any): RetryConfig {
  return {
    ...data,
    maxBackoffDuration: data["maxBackoffDuration"] !== undefined ? data["maxBackoffDuration"] : undefined,
    maxRetryDuration: data["maxRetryDuration"] !== undefined ? data["maxRetryDuration"] : undefined,
    minBackoffDuration: data["minBackoffDuration"] !== undefined ? data["minBackoffDuration"] : undefined,
  };
}

/**
 * Request message for forcing a job to run now using RunJob.
 */
export interface RunJobRequest {
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