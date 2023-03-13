// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Functions API Client for Deno
 * ===================================
 * 
 * Manages lightweight user-provided functions executed in response to events.
 * 
 * Docs: https://cloud.google.com/functions
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages lightweight user-provided functions executed in response to events.
 */
export class CloudFunctions {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudfunctions.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a new function. If a function with the given name already exists
   * in the specified project, the long running operation will return
   * `ALREADY_EXISTS` error.
   *
   * @param parent Required. The project and location in which the function should be created, specified in the format `projects/*\/locations/*`
   */
  async projectsLocationsFunctionsCreate(parent: string, req: Function, opts: ProjectsLocationsFunctionsCreateOptions = {}): Promise<Operation> {
    req = serializeFunction(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/functions`);
    if (opts.functionId !== undefined) {
      url.searchParams.append("functionId", String(opts.functionId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a function with the given name from the specified project. If the
   * given function is used by some trigger, the trigger will be updated to
   * remove this function.
   *
   * @param name Required. The name of the function which should be deleted.
   */
  async projectsLocationsFunctionsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Returns a signed URL for downloading deployed function source code. The
   * URL is only valid for a limited period and should be used within 30 minutes
   * of generation. For more information about the signed URL usage see:
   * https://cloud.google.com/storage/docs/access-control/signed-urls
   *
   * @param name Required. The name of function for which source code Google Cloud Storage signed URL should be generated.
   */
  async projectsLocationsFunctionsGenerateDownloadUrl(name: string, req: GenerateDownloadUrlRequest): Promise<GenerateDownloadUrlResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:generateDownloadUrl`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GenerateDownloadUrlResponse;
  }

  /**
   * Returns a signed URL for uploading a function source code. For more
   * information about the signed URL usage see:
   * https://cloud.google.com/storage/docs/access-control/signed-urls. Once the
   * function source code upload is complete, the used signed URL should be
   * provided in CreateFunction or UpdateFunction request as a reference to the
   * function source code. When uploading source code to the generated signed
   * URL, please follow these restrictions: * Source file type should be a zip
   * file. * No credentials should be attached - the signed URLs provide access
   * to the target bucket using internal service identity; if credentials were
   * attached, the identity from the credentials would be used, but that
   * identity does not have permissions to upload files to the URL. When making
   * a HTTP PUT request, these two headers need to be specified: *
   * `content-type: application/zip` And this header SHOULD NOT be specified: *
   * `Authorization: Bearer YOUR_TOKEN`
   *
   * @param parent Required. The project and location in which the Google Cloud Storage signed URL should be generated, specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsFunctionsGenerateUploadUrl(parent: string, req: GenerateUploadUrlRequest): Promise<GenerateUploadUrlResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/functions:generateUploadUrl`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGenerateUploadUrlResponse(data);
  }

  /**
   * Returns a function with the given name from the requested project.
   *
   * @param name Required. The name of the function which details should be obtained.
   */
  async projectsLocationsFunctionsGet(name: string): Promise<Function> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeFunction(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsFunctionsGetIamPolicy(resource: string, opts: ProjectsLocationsFunctionsGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v2/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Returns a list of functions that belong to the requested project.
   *
   * @param parent Required. The project and location from which the function should be listed, specified in the format `projects/*\/locations/*` If you want to list functions in all locations, use "-" in place of a location. When listing functions in all locations, if one or more location(s) are unreachable, the response will contain functions from all reachable locations along with the names of any unreachable locations.
   */
  async projectsLocationsFunctionsList(parent: string, opts: ProjectsLocationsFunctionsListOptions = {}): Promise<ListFunctionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/functions`);
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
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListFunctionsResponse(data);
  }

  /**
   * Updates existing function.
   *
   * @param name A user-defined name of the function. Function names must be unique globally and match pattern `projects/*\/locations/*\/functions/*`
   */
  async projectsLocationsFunctionsPatch(name: string, req: Function, opts: ProjectsLocationsFunctionsPatchOptions = {}): Promise<Operation> {
    req = serializeFunction(req);
    opts = serializeProjectsLocationsFunctionsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsFunctionsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this will return an empty set of permissions, not
   * a `NOT_FOUND` error. Note: This operation is designed to be used for
   * building permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsFunctionsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async projectsLocationsList(name: string, opts: ProjectsLocationsListOptions = {}): Promise<ListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/locations`);
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
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsOperationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name Must not be set.
   */
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ name }/operations`);
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
   * Returns a list of runtimes that are supported for the requested project.
   *
   * @param parent Required. The project and location from which the runtimes should be listed, specified in the format `projects/*\/locations/*`
   */
  async projectsLocationsRuntimesList(parent: string, opts: ProjectsLocationsRuntimesListOptions = {}): Promise<ListRuntimesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/runtimes`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListRuntimesResponse;
  }
}

/**
 * Specifies the audit configuration for a service. The configuration
 * determines which permission types are logged, and what identities, if any,
 * are exempted from logging. An AuditConfig must have one or more
 * AuditLogConfigs. If there are AuditConfigs for both `allServices` and a
 * specific service, the union of the two AuditConfigs is used for that service:
 * the log_types specified in each AuditConfig are enabled, and the
 * exempted_members in each AuditLogConfig are exempted. Example Policy with
 * multiple AuditConfigs: { "audit_configs": [ { "service": "allServices",
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" }, { "log_type":
 * "ADMIN_READ" } ] }, { "service": "sampleservice.googleapis.com",
 * "audit_log_configs": [ { "log_type": "DATA_READ" }, { "log_type":
 * "DATA_WRITE", "exempted_members": [ "user:aliya@example.com" ] } ] } ] } For
 * sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ
 * logging. It also exempts `jose@example.com` from DATA_READ logging, and
 * `aliya@example.com` from DATA_WRITE logging.
 */
export interface AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: AuditLogConfig[];
  /**
   * Specifies a service that will be enabled for audit logging. For example,
   * `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a
   * special value that covers all services.
   */
  service?: string;
}

/**
 * Provides the configuration for logging a type of permissions. Example: {
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" } ] } This enables
 * 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from
 * DATA_READ logging.
 */
export interface AuditLogConfig {
  /**
   * Specifies the identities that do not cause logging for this type of
   * permission. Follows the same format of Binding.members.
   */
  exemptedMembers?: string[];
  /**
   * The log type that this config enables.
   */
  logType?:  | "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ";
}

/**
 * Associates `members`, or principals, with a `role`.
 */
export interface Binding {
  /**
   * The condition that is associated with this binding. If the condition
   * evaluates to `true`, then this binding applies to the current request. If
   * the condition evaluates to `false`, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding. To learn which
   * resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: Expr;
  /**
   * Specifies the principals requesting access for a Google Cloud resource.
   * `members` can have the following values: * `allUsers`: A special identifier
   * that represents anyone who is on the internet; with or without a Google
   * account. * `allAuthenticatedUsers`: A special identifier that represents
   * anyone who is authenticated with a Google account or a service account.
   * Does not include identities that come from external identity providers
   * (IdPs) through identity federation. * `user:{emailid}`: An email address
   * that represents a specific Google account. For example, `alice@example.com`
   * . * `serviceAccount:{emailid}`: An email address that represents a Google
   * service account. For example, `my-other-app@appspot.gserviceaccount.com`. *
   * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An
   * identifier for a [Kubernetes service
   * account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts).
   * For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. *
   * `group:{emailid}`: An email address that represents a Google group. For
   * example, `admins@example.com`. * `domain:{domain}`: The G Suite domain
   * (primary) that represents all the users of that domain. For example,
   * `google.com` or `example.com`. * `deleted:user:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a user that has been
   * recently deleted. For example,
   * `alice@example.com?uid=123456789012345678901`. If the user is recovered,
   * this value reverts to `user:{emailid}` and the recovered user retains the
   * role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a service account
   * that has been recently deleted. For example,
   * `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If
   * the service account is undeleted, this value reverts to
   * `serviceAccount:{emailid}` and the undeleted service account retains the
   * role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email
   * address (plus unique identifier) representing a Google group that has been
   * recently deleted. For example,
   * `admins@example.com?uid=123456789012345678901`. If the group is recovered,
   * this value reverts to `group:{emailid}` and the recovered group retains the
   * role in the binding.
   */
  members?: string[];
  /**
   * Role that is assigned to the list of `members`, or principals. For
   * example, `roles/viewer`, `roles/editor`, or `roles/owner`.
   */
  role?: string;
}

/**
 * Describes the Build step of the function that builds a container from the
 * given source.
 */
export interface BuildConfig {
  /**
   * Output only. The Cloud Build name of the latest successful deployment of
   * the function.
   */
  readonly build?: string;
  /**
   * Specifies one of the Google provided buildpack stacks.
   */
  buildpackStack?: string;
  /**
   * Optional. Docker Registry to use for this deployment. This configuration
   * is only applicable to 1st Gen functions, 2nd Gen functions can only use
   * Artifact Registry. If `docker_repository` field is specified, this field
   * will be automatically set as `ARTIFACT_REGISTRY`. If unspecified, it
   * currently defaults to `CONTAINER_REGISTRY`. This field may be overridden by
   * the backend for eligible deployments.
   */
  dockerRegistry?:  | "DOCKER_REGISTRY_UNSPECIFIED" | "CONTAINER_REGISTRY" | "ARTIFACT_REGISTRY";
  /**
   * User managed repository created in Artifact Registry optionally with a
   * customer managed encryption key. This is the repository to which the
   * function docker image will be pushed after it is built by Cloud Build. If
   * unspecified, GCF will create and use a repository named 'gcf-artifacts' for
   * every deployed region. It must match the pattern
   * `projects/{project}/locations/{location}/repositories/{repository}`.
   * Cross-project repositories are not supported. Cross-location repositories
   * are not supported. Repository format must be 'DOCKER'.
   */
  dockerRepository?: string;
  /**
   * The name of the function (as defined in source code) that will be
   * executed. Defaults to the resource name suffix, if not specified. For
   * backward compatibility, if function with given name is not found, then the
   * system will try to use function named "function". For Node.js this is name
   * of a function exported by the module specified in `source_location`.
   */
  entryPoint?: string;
  /**
   * User-provided build-time environment variables for the function
   */
  environmentVariables?: {
    [key: string]: string
  };
  /**
   * The runtime in which to run the function. Required when deploying a new
   * function, optional when updating an existing function. For a complete list
   * of possible choices, see the [`gcloud` command
   * reference](https://cloud.google.com/sdk/gcloud/reference/functions/deploy#--runtime).
   */
  runtime?: string;
  /**
   * The location of the function source code.
   */
  source?: Source;
  /**
   * Output only. A permanent fixed identifier for source.
   */
  readonly sourceProvenance?: SourceProvenance;
  /**
   * Name of the Cloud Build Custom Worker Pool that should be used to build
   * the function. The format of this field is
   * `projects/{project}/locations/{region}/workerPools/{workerPool}` where
   * {project} and {region} are the project id and region respectively where the
   * worker pool is defined and {workerPool} is the short name of the worker
   * pool. If the project id is not the same as the function, then the Cloud
   * Functions Service Agent (service-@gcf-admin-robot.iam.gserviceaccount.com)
   * must be granted the role Cloud Build Custom Workers Builder
   * (roles/cloudbuild.customworkers.builder) in the project.
   */
  workerPool?: string;
}

function serializeBuildConfig(data: any): BuildConfig {
  return {
    ...data,
    source: data["source"] !== undefined ? serializeSource(data["source"]) : undefined,
  };
}

function deserializeBuildConfig(data: any): BuildConfig {
  return {
    ...data,
    source: data["source"] !== undefined ? deserializeSource(data["source"]) : undefined,
    sourceProvenance: data["sourceProvenance"] !== undefined ? deserializeSourceProvenance(data["sourceProvenance"]) : undefined,
  };
}

/**
 * Filters events based on exact matches on the CloudEvents attributes.
 */
export interface EventFilter {
  /**
   * Required. The name of a CloudEvents attribute.
   */
  attribute?: string;
  /**
   * Optional. The operator used for matching the events with the value of the
   * filter. If not specified, only events that have an exact key-value pair
   * specified in the filter are matched. The only allowed value is
   * `match-path-pattern`.
   */
  operator?: string;
  /**
   * Required. The value for the attribute.
   */
  value?: string;
}

/**
 * Describes EventTrigger, used to request events to be sent from another
 * service.
 */
export interface EventTrigger {
  /**
   * Optional. The name of the channel associated with the trigger in
   * `projects/{project}/locations/{location}/channels/{channel}` format. You
   * must provide a channel to receive events from Eventarc SaaS partners.
   */
  channel?: string;
  /**
   * Criteria used to filter events.
   */
  eventFilters?: EventFilter[];
  /**
   * Required. The type of event to observe. For example:
   * `google.cloud.audit.log.v1.written` or
   * `google.cloud.pubsub.topic.v1.messagePublished`.
   */
  eventType?: string;
  /**
   * Optional. The name of a Pub/Sub topic in the same project that will be
   * used as the transport topic for the event delivery. Format:
   * `projects/{project}/topics/{topic}`. This is only valid for events of type
   * `google.cloud.pubsub.topic.v1.messagePublished`. The topic provided here
   * will not be deleted at function deletion.
   */
  pubsubTopic?: string;
  /**
   * Optional. If unset, then defaults to ignoring failures (i.e. not retrying
   * them).
   */
  retryPolicy?:  | "RETRY_POLICY_UNSPECIFIED" | "RETRY_POLICY_DO_NOT_RETRY" | "RETRY_POLICY_RETRY";
  /**
   * Optional. The email of the trigger's service account. The service account
   * must have permission to invoke Cloud Run services, the permission is
   * `run.routes.invoke`. If empty, defaults to the Compute Engine default
   * service account: `{project_number}-compute@developer.gserviceaccount.com`.
   */
  serviceAccountEmail?: string;
  /**
   * Output only. The resource name of the Eventarc trigger. The format of this
   * field is `projects/{project}/locations/{region}/triggers/{trigger}`.
   */
  readonly trigger?: string;
  /**
   * The region that the trigger will be in. The trigger will only receive
   * events originating in this region. It can be the same region as the
   * function, a different region or multi-region, or the global region. If not
   * provided, defaults to the same region as the function.
   */
  triggerRegion?: string;
}

/**
 * Represents a textual expression in the Common Expression Language (CEL)
 * syntax. CEL is a C-like expression language. The syntax and semantics of CEL
 * are documented at https://github.com/google/cel-spec. Example (Comparison):
 * title: "Summary size limit" description: "Determines if a summary is less
 * than 100 chars" expression: "document.summary.size() < 100" Example
 * (Equality): title: "Requestor is owner" description: "Determines if requestor
 * is the document owner" expression: "document.owner ==
 * request.auth.claims.email" Example (Logic): title: "Public documents"
 * description: "Determine whether the document should be publicly visible"
 * expression: "document.type != 'private' && document.type != 'internal'"
 * Example (Data Manipulation): title: "Notification string" description:
 * "Create a notification string with a timestamp." expression: "'New message
 * received at ' + string(document.create_time)" The exact variables and
 * functions that may be referenced within an expression are determined by the
 * service that evaluates it. See the service documentation for additional
 * information.
 */
export interface Expr {
  /**
   * Optional. Description of the expression. This is a longer text which
   * describes the expression, e.g. when hovered over it in a UI.
   */
  description?: string;
  /**
   * Textual representation of an expression in Common Expression Language
   * syntax.
   */
  expression?: string;
  /**
   * Optional. String indicating the location of the expression for error
   * reporting, e.g. a file name and a position in the file.
   */
  location?: string;
  /**
   * Optional. Title for the expression, i.e. a short string describing its
   * purpose. This can be used e.g. in UIs which allow to enter the expression.
   */
  title?: string;
}

/**
 * Describes a Cloud Function that contains user computation executed in
 * response to an event. It encapsulates function and trigger configurations.
 */
export interface Function {
  /**
   * Describes the Build step of the function that builds a container from the
   * given source.
   */
  buildConfig?: BuildConfig;
  /**
   * User-provided description of a function.
   */
  description?: string;
  /**
   * Describe whether the function is 1st Gen or 2nd Gen.
   */
  environment?:  | "ENVIRONMENT_UNSPECIFIED" | "GEN_1" | "GEN_2";
  /**
   * An Eventarc trigger managed by Google Cloud Functions that fires events in
   * response to a condition in another service.
   */
  eventTrigger?: EventTrigger;
  /**
   * Resource name of a KMS crypto key (managed by the user) used to
   * encrypt/decrypt function resources. It must match the pattern
   * `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.
   */
  kmsKeyName?: string;
  /**
   * Labels associated with this Cloud Function.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * A user-defined name of the function. Function names must be unique
   * globally and match pattern `projects/*\/locations/*\/functions/*`
   */
  name?: string;
  /**
   * Describes the Service being deployed. Currently deploys services to Cloud
   * Run (fully managed).
   */
  serviceConfig?: ServiceConfig;
  /**
   * Output only. State of the function.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "FAILED" | "DEPLOYING" | "DELETING" | "UNKNOWN";
  /**
   * Output only. State Messages for this Cloud Function.
   */
  readonly stateMessages?: GoogleCloudFunctionsV2StateMessage[];
  /**
   * Output only. The last update timestamp of a Cloud Function.
   */
  readonly updateTime?: Date;
}

function serializeFunction(data: any): Function {
  return {
    ...data,
    buildConfig: data["buildConfig"] !== undefined ? serializeBuildConfig(data["buildConfig"]) : undefined,
  };
}

function deserializeFunction(data: any): Function {
  return {
    ...data,
    buildConfig: data["buildConfig"] !== undefined ? deserializeBuildConfig(data["buildConfig"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Request of `GenerateDownloadUrl` method.
 */
export interface GenerateDownloadUrlRequest {
}

/**
 * Response of `GenerateDownloadUrl` method.
 */
export interface GenerateDownloadUrlResponse {
  /**
   * The generated Google Cloud Storage signed URL that should be used for
   * function source code download.
   */
  downloadUrl?: string;
}

/**
 * Request of `GenerateSourceUploadUrl` method.
 */
export interface GenerateUploadUrlRequest {
  /**
   * Resource name of a KMS crypto key (managed by the user) used to
   * encrypt/decrypt function source code objects in intermediate Cloud Storage
   * buckets. When you generate an upload url and upload your source code, it
   * gets copied to an intermediate Cloud Storage bucket. The source code is
   * then copied to a versioned directory in the sources bucket in the consumer
   * project during the function deployment. It must match the pattern
   * `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.
   * The Google Cloud Functions service account
   * (service-{project_number}@gcf-admin-robot.iam.gserviceaccount.com) must be
   * granted the role 'Cloud KMS CryptoKey Encrypter/Decrypter
   * (roles/cloudkms.cryptoKeyEncrypterDecrypter)' on the
   * Key/KeyRing/Project/Organization (least access preferred).
   */
  kmsKeyName?: string;
}

/**
 * Response of `GenerateSourceUploadUrl` method.
 */
export interface GenerateUploadUrlResponse {
  /**
   * The location of the source code in the upload bucket. Once the archive is
   * uploaded using the `upload_url` use this field to set the
   * `function.build_config.source.storage_source` during CreateFunction and
   * UpdateFunction. Generation defaults to 0, as Cloud Storage provides a new
   * generation only upon uploading a new object or version of an object.
   */
  storageSource?: StorageSource;
  /**
   * The generated Google Cloud Storage signed URL that should be used for a
   * function source code upload. The uploaded file should be a zip archive
   * which contains a function.
   */
  uploadUrl?: string;
}

function serializeGenerateUploadUrlResponse(data: any): GenerateUploadUrlResponse {
  return {
    ...data,
    storageSource: data["storageSource"] !== undefined ? serializeStorageSource(data["storageSource"]) : undefined,
  };
}

function deserializeGenerateUploadUrlResponse(data: any): GenerateUploadUrlResponse {
  return {
    ...data,
    storageSource: data["storageSource"] !== undefined ? deserializeStorageSource(data["storageSource"]) : undefined,
  };
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudFunctionsV2alphaOperationMetadata {
  /**
   * API version used to start the operation.
   */
  apiVersion?: string;
  /**
   * Identifies whether the user has requested cancellation of the operation.
   * Operations that have successfully been cancelled have Operation.error value
   * with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
   */
  cancelRequested?: boolean;
  /**
   * The time the operation was created.
   */
  createTime?: Date;
  /**
   * The time the operation finished running.
   */
  endTime?: Date;
  /**
   * The original request that started the operation.
   */
  requestResource?: {
    [key: string]: any
  };
  /**
   * Mechanism for reporting in-progress stages
   */
  stages?: GoogleCloudFunctionsV2alphaStage[];
  /**
   * Human-readable status of the operation, if any.
   */
  statusDetail?: string;
  /**
   * Server-defined resource path for the target of the operation.
   */
  target?: string;
  /**
   * Name of the verb executed by the operation.
   */
  verb?: string;
}

function serializeGoogleCloudFunctionsV2alphaOperationMetadata(data: any): GoogleCloudFunctionsV2alphaOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudFunctionsV2alphaOperationMetadata(data: any): GoogleCloudFunctionsV2alphaOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * Each Stage of the deployment process
 */
export interface GoogleCloudFunctionsV2alphaStage {
  /**
   * Message describing the Stage
   */
  message?: string;
  /**
   * Name of the Stage. This will be unique for each Stage.
   */
  name?:  | "NAME_UNSPECIFIED" | "ARTIFACT_REGISTRY" | "BUILD" | "SERVICE" | "TRIGGER" | "SERVICE_ROLLBACK" | "TRIGGER_ROLLBACK";
  /**
   * Resource of the Stage
   */
  resource?: string;
  /**
   * Link to the current Stage resource
   */
  resourceUri?: string;
  /**
   * Current state of the Stage
   */
  state?:  | "STATE_UNSPECIFIED" | "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE";
  /**
   * State messages from the current Stage.
   */
  stateMessages?: GoogleCloudFunctionsV2alphaStateMessage[];
}

/**
 * Informational messages about the state of the Cloud Function or Operation.
 */
export interface GoogleCloudFunctionsV2alphaStateMessage {
  /**
   * The message.
   */
  message?: string;
  /**
   * Severity of the state message.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO";
  /**
   * One-word CamelCase type of the state message.
   */
  type?: string;
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudFunctionsV2betaOperationMetadata {
  /**
   * API version used to start the operation.
   */
  apiVersion?: string;
  /**
   * Identifies whether the user has requested cancellation of the operation.
   * Operations that have successfully been cancelled have Operation.error value
   * with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
   */
  cancelRequested?: boolean;
  /**
   * The time the operation was created.
   */
  createTime?: Date;
  /**
   * The time the operation finished running.
   */
  endTime?: Date;
  /**
   * The original request that started the operation.
   */
  requestResource?: {
    [key: string]: any
  };
  /**
   * Mechanism for reporting in-progress stages
   */
  stages?: GoogleCloudFunctionsV2betaStage[];
  /**
   * Human-readable status of the operation, if any.
   */
  statusDetail?: string;
  /**
   * Server-defined resource path for the target of the operation.
   */
  target?: string;
  /**
   * Name of the verb executed by the operation.
   */
  verb?: string;
}

function serializeGoogleCloudFunctionsV2betaOperationMetadata(data: any): GoogleCloudFunctionsV2betaOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudFunctionsV2betaOperationMetadata(data: any): GoogleCloudFunctionsV2betaOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * Each Stage of the deployment process
 */
export interface GoogleCloudFunctionsV2betaStage {
  /**
   * Message describing the Stage
   */
  message?: string;
  /**
   * Name of the Stage. This will be unique for each Stage.
   */
  name?:  | "NAME_UNSPECIFIED" | "ARTIFACT_REGISTRY" | "BUILD" | "SERVICE" | "TRIGGER" | "SERVICE_ROLLBACK" | "TRIGGER_ROLLBACK";
  /**
   * Resource of the Stage
   */
  resource?: string;
  /**
   * Link to the current Stage resource
   */
  resourceUri?: string;
  /**
   * Current state of the Stage
   */
  state?:  | "STATE_UNSPECIFIED" | "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE";
  /**
   * State messages from the current Stage.
   */
  stateMessages?: GoogleCloudFunctionsV2betaStateMessage[];
}

/**
 * Informational messages about the state of the Cloud Function or Operation.
 */
export interface GoogleCloudFunctionsV2betaStateMessage {
  /**
   * The message.
   */
  message?: string;
  /**
   * Severity of the state message.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO";
  /**
   * One-word CamelCase type of the state message.
   */
  type?: string;
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudFunctionsV2OperationMetadata {
  /**
   * API version used to start the operation.
   */
  apiVersion?: string;
  /**
   * Identifies whether the user has requested cancellation of the operation.
   * Operations that have successfully been cancelled have Operation.error value
   * with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`.
   */
  cancelRequested?: boolean;
  /**
   * The time the operation was created.
   */
  createTime?: Date;
  /**
   * The time the operation finished running.
   */
  endTime?: Date;
  /**
   * The original request that started the operation.
   */
  requestResource?: {
    [key: string]: any
  };
  /**
   * Mechanism for reporting in-progress stages
   */
  stages?: GoogleCloudFunctionsV2Stage[];
  /**
   * Human-readable status of the operation, if any.
   */
  statusDetail?: string;
  /**
   * Server-defined resource path for the target of the operation.
   */
  target?: string;
  /**
   * Name of the verb executed by the operation.
   */
  verb?: string;
}

function serializeGoogleCloudFunctionsV2OperationMetadata(data: any): GoogleCloudFunctionsV2OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudFunctionsV2OperationMetadata(data: any): GoogleCloudFunctionsV2OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * Each Stage of the deployment process
 */
export interface GoogleCloudFunctionsV2Stage {
  /**
   * Message describing the Stage
   */
  message?: string;
  /**
   * Name of the Stage. This will be unique for each Stage.
   */
  name?:  | "NAME_UNSPECIFIED" | "ARTIFACT_REGISTRY" | "BUILD" | "SERVICE" | "TRIGGER" | "SERVICE_ROLLBACK" | "TRIGGER_ROLLBACK";
  /**
   * Resource of the Stage
   */
  resource?: string;
  /**
   * Link to the current Stage resource
   */
  resourceUri?: string;
  /**
   * Current state of the Stage
   */
  state?:  | "STATE_UNSPECIFIED" | "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE";
  /**
   * State messages from the current Stage.
   */
  stateMessages?: GoogleCloudFunctionsV2StateMessage[];
}

/**
 * Informational messages about the state of the Cloud Function or Operation.
 */
export interface GoogleCloudFunctionsV2StateMessage {
  /**
   * The message.
   */
  message?: string;
  /**
   * Severity of the state message.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "ERROR" | "WARNING" | "INFO";
  /**
   * One-word CamelCase type of the state message.
   */
  type?: string;
}

/**
 * Response for the `ListFunctions` method.
 */
export interface ListFunctionsResponse {
  /**
   * The functions that match the request.
   */
  functions?: Function[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached. The response does not include any
   * functions from these locations.
   */
  unreachable?: string[];
}

function serializeListFunctionsResponse(data: any): ListFunctionsResponse {
  return {
    ...data,
    functions: data["functions"] !== undefined ? data["functions"].map((item: any) => (serializeFunction(item))) : undefined,
  };
}

function deserializeListFunctionsResponse(data: any): ListFunctionsResponse {
  return {
    ...data,
    functions: data["functions"] !== undefined ? data["functions"].map((item: any) => (deserializeFunction(item))) : undefined,
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
 * Response for the `ListRuntimes` method.
 */
export interface ListRuntimesResponse {
  /**
   * The runtimes that match the request.
   */
  runtimes?: Runtime[];
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
 * Metadata describing an Operation
 */
export interface OperationMetadataV1 {
  /**
   * The Cloud Build ID of the function created or updated by an API call. This
   * field is only populated for Create and Update operations.
   */
  buildId?: string;
  /**
   * The Cloud Build Name of the function deployment. This field is only
   * populated for Create and Update operations. `projects//locations//builds/`.
   */
  buildName?: string;
  /**
   * The original request that started the operation.
   */
  request?: {
    [key: string]: any
  };
  /**
   * An identifier for Firebase function sources. Disclaimer: This field is
   * only supported for Firebase function deployments.
   */
  sourceToken?: string;
  /**
   * Target of the operation - for example
   * `projects/project-1/locations/region-1/functions/function-1`
   */
  target?: string;
  /**
   * Type of operation.
   */
  type?:  | "OPERATION_UNSPECIFIED" | "CREATE_FUNCTION" | "UPDATE_FUNCTION" | "DELETE_FUNCTION";
  /**
   * The last update timestamp of the operation.
   */
  updateTime?: Date;
  /**
   * Version id of the function created or updated by an API call. This field
   * is only populated for Create and Update operations.
   */
  versionId?: bigint;
}

function serializeOperationMetadataV1(data: any): OperationMetadataV1 {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
    versionId: data["versionId"] !== undefined ? String(data["versionId"]) : undefined,
  };
}

function deserializeOperationMetadataV1(data: any): OperationMetadataV1 {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    versionId: data["versionId"] !== undefined ? BigInt(data["versionId"]) : undefined,
  };
}

/**
 * An Identity and Access Management (IAM) policy, which specifies access
 * controls for Google Cloud resources. A `Policy` is a collection of
 * `bindings`. A `binding` binds one or more `members`, or principals, to a
 * single `role`. Principals can be user accounts, service accounts, Google
 * groups, and domains (such as G Suite). A `role` is a named list of
 * permissions; each `role` can be an IAM predefined role or a user-created
 * custom role. For some types of Google Cloud resources, a `binding` can also
 * specify a `condition`, which is a logical expression that allows access to a
 * resource only if the expression evaluates to `true`. A condition can add
 * constraints based on attributes of the request, the resource, or both. To
 * learn which resources support conditions in their IAM policies, see the [IAM
 * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
 * **JSON example:** { "bindings": [ { "role":
 * "roles/resourcemanager.organizationAdmin", "members": [
 * "user:mike@example.com", "group:admins@example.com", "domain:google.com",
 * "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role":
 * "roles/resourcemanager.organizationViewer", "members": [
 * "user:eve@example.com" ], "condition": { "title": "expirable access",
 * "description": "Does not grant access after Sep 2020", "expression":
 * "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } ], "etag":
 * "BwWWja0YfJA=", "version": 3 } **YAML example:** bindings: - members: -
 * user:mike@example.com - group:admins@example.com - domain:google.com -
 * serviceAccount:my-project-id@appspot.gserviceaccount.com role:
 * roles/resourcemanager.organizationAdmin - members: - user:eve@example.com
 * role: roles/resourcemanager.organizationViewer condition: title: expirable
 * access description: Does not grant access after Sep 2020 expression:
 * request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA=
 * version: 3 For a description of IAM and its features, see the [IAM
 * documentation](https://cloud.google.com/iam/docs/).
 */
export interface Policy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: AuditConfig[];
  /**
   * Associates a list of `members`, or principals, with a `role`. Optionally,
   * may specify a `condition` that determines how and when the `bindings` are
   * applied. Each of the `bindings` must contain at least one principal. The
   * `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of
   * these principals can be Google groups. Each occurrence of a principal
   * counts towards these limits. For example, if the `bindings` grant 50
   * different roles to `user:alice@example.com`, and not to any other
   * principal, then you can add another 1,450 principals to the `bindings` in
   * the `Policy`.
   */
  bindings?: Binding[];
  /**
   * `etag` is used for optimistic concurrency control as a way to help prevent
   * simultaneous updates of a policy from overwriting each other. It is
   * strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform policy updates in order to avoid race
   * conditions: An `etag` is returned in the response to `getIamPolicy`, and
   * systems are expected to put that etag in the request to `setIamPolicy` to
   * ensure that their change will be applied to the same version of the policy.
   * **Important:** If you use IAM Conditions, you must include the `etag` field
   * whenever you call `setIamPolicy`. If you omit this field, then IAM allows
   * you to overwrite a version `3` policy with a version `1` policy, and all of
   * the conditions in the version `3` policy are lost.
   */
  etag?: Uint8Array;
  /**
   * Specifies the format of the policy. Valid values are `0`, `1`, and `3`.
   * Requests that specify an invalid value are rejected. Any operation that
   * affects conditional role bindings must specify version `3`. This
   * requirement applies to the following operations: * Getting a policy that
   * includes a conditional role binding * Adding a conditional role binding to
   * a policy * Changing a conditional role binding in a policy * Removing any
   * role binding, with or without a condition, from a policy that includes
   * conditions **Important:** If you use IAM Conditions, you must include the
   * `etag` field whenever you call `setIamPolicy`. If you omit this field, then
   * IAM allows you to overwrite a version `3` policy with a version `1` policy,
   * and all of the conditions in the version `3` policy are lost. If a policy
   * does not include any conditions, operations on that policy may specify any
   * valid version or leave the field unset. To learn which resources support
   * conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  version?: number;
}

function serializePolicy(data: any): Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializePolicy(data: any): Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * Additional options for CloudFunctions#projectsLocationsFunctionsCreate.
 */
export interface ProjectsLocationsFunctionsCreateOptions {
  /**
   * The ID to use for the function, which will become the final component of
   * the function's resource name. This value should be 4-63 characters, and
   * valid characters are /a-z-/.
   */
  functionId?: string;
}

/**
 * Additional options for
 * CloudFunctions#projectsLocationsFunctionsGetIamPolicy.
 */
export interface ProjectsLocationsFunctionsGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy. Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected. Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset. The policy in the
   * response might use the policy version that you specified, or it might use a
   * lower policy version. For example, if you specify version 3, but the policy
   * has no conditional role bindings, the response uses version 1. To learn
   * which resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for CloudFunctions#projectsLocationsFunctionsList.
 */
export interface ProjectsLocationsFunctionsListOptions {
  /**
   * The filter for Functions that match the filter expression, following the
   * syntax outlined in https://google.aip.dev/160.
   */
  filter?: string;
  /**
   * The sorting order of the resources returned. Value should be a comma
   * separated list of fields. The default sorting oder is ascending. See
   * https://google.aip.dev/132#ordering.
   */
  orderBy?: string;
  /**
   * Maximum number of functions to return per call. The largest allowed
   * page_size is 1,000, if the page_size is omitted or specified as greater
   * than 1,000 then it will be replaced as 1,000. The size of the list response
   * can be less than specified when used with filters.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListFunctionsResponse`; indicates that
   * this is a continuation of a prior `ListFunctions` call, and that the system
   * should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudFunctions#projectsLocationsFunctionsPatch.
 */
export interface ProjectsLocationsFunctionsPatchOptions {
  /**
   * The list of fields to be updated. If no field mask is provided, all
   * provided fields in the request will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsFunctionsPatchOptions(data: any): ProjectsLocationsFunctionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsFunctionsPatchOptions(data: any): ProjectsLocationsFunctionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudFunctions#projectsLocationsList.
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
 * Additional options for CloudFunctions#projectsLocationsOperationsList.
 */
export interface ProjectsLocationsOperationsListOptions {
  /**
   * Required. A filter for matching the requested operations. The supported
   * formats of *filter* are: To query for a specific function:
   * project:*,location:*,function:* To query for all of the latest operations
   * for a project: project:*,latest:true
   */
  filter?: string;
  /**
   * The maximum number of records that should be returned. Requested page size
   * cannot exceed 100. If not set, the default page size is 100. Pagination is
   * only supported when querying for a specific function.
   */
  pageSize?: number;
  /**
   * Token identifying which result to start with, which is returned by a
   * previous list call. Pagination is only supported when querying for a
   * specific function.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudFunctions#projectsLocationsRuntimesList.
 */
export interface ProjectsLocationsRuntimesListOptions {
  /**
   * The filter for Runtimes that match the filter expression, following the
   * syntax outlined in https://google.aip.dev/160.
   */
  filter?: string;
}

/**
 * Location of the source in a Google Cloud Source Repository.
 */
export interface RepoSource {
  /**
   * Regex matching branches to build. The syntax of the regular expressions
   * accepted is the syntax accepted by RE2 and described at
   * https://github.com/google/re2/wiki/Syntax
   */
  branchName?: string;
  /**
   * Explicit commit SHA to build.
   */
  commitSha?: string;
  /**
   * Directory, relative to the source root, in which to run the build. This
   * must be a relative path. If a step's `dir` is specified and is an absolute
   * path, this value is ignored for that step's execution. eg. helloworld (no
   * leading slash allowed)
   */
  dir?: string;
  /**
   * Only trigger a build if the revision regex does NOT match the revision
   * regex.
   */
  invertRegex?: boolean;
  /**
   * ID of the project that owns the Cloud Source Repository. If omitted, the
   * project ID requesting the build is assumed.
   */
  projectId?: string;
  /**
   * Name of the Cloud Source Repository.
   */
  repoName?: string;
  /**
   * Regex matching tags to build. The syntax of the regular expressions
   * accepted is the syntax accepted by RE2 and described at
   * https://github.com/google/re2/wiki/Syntax
   */
  tagName?: string;
}

/**
 * Describes a runtime and any special information (e.g., deprecation status)
 * related to it.
 */
export interface Runtime {
  /**
   * The user facing name, eg 'Go 1.13', 'Node.js 12', etc.
   */
  displayName?: string;
  /**
   * The environment for the runtime.
   */
  environment?:  | "ENVIRONMENT_UNSPECIFIED" | "GEN_1" | "GEN_2";
  /**
   * The name of the runtime, e.g., 'go113', 'nodejs12', etc.
   */
  name?: string;
  /**
   * The stage of life this runtime is in, e.g., BETA, GA, etc.
   */
  stage?:  | "RUNTIME_STAGE_UNSPECIFIED" | "DEVELOPMENT" | "ALPHA" | "BETA" | "GA" | "DEPRECATED" | "DECOMMISSIONED";
  /**
   * Warning messages, e.g., a deprecation warning.
   */
  warnings?: string[];
}

/**
 * Configuration for a secret environment variable. It has the information
 * necessary to fetch the secret value from secret manager and expose it as an
 * environment variable.
 */
export interface SecretEnvVar {
  /**
   * Name of the environment variable.
   */
  key?: string;
  /**
   * Project identifier (preferably project number but can also be the project
   * ID) of the project that contains the secret. If not set, it is assumed that
   * the secret is in the same project as the function.
   */
  projectId?: string;
  /**
   * Name of the secret in secret manager (not the full resource name).
   */
  secret?: string;
  /**
   * Version of the secret (version number or the string 'latest'). It is
   * recommended to use a numeric version for secret environment variables as
   * any updates to the secret value is not reflected until new instances start.
   */
  version?: string;
}

/**
 * Configuration for a single version.
 */
export interface SecretVersion {
  /**
   * Relative path of the file under the mount path where the secret value for
   * this version will be fetched and made available. For example, setting the
   * mount_path as '/etc/secrets' and path as `secret_foo` would mount the
   * secret value file at `/etc/secrets/secret_foo`.
   */
  path?: string;
  /**
   * Version of the secret (version number or the string 'latest'). It is
   * preferable to use `latest` version with secret volumes as secret value
   * changes are reflected immediately.
   */
  version?: string;
}

/**
 * Configuration for a secret volume. It has the information necessary to fetch
 * the secret value from secret manager and make it available as files mounted
 * at the requested paths within the application container.
 */
export interface SecretVolume {
  /**
   * The path within the container to mount the secret volume. For example,
   * setting the mount_path as `/etc/secrets` would mount the secret value files
   * under the `/etc/secrets` directory. This directory will also be completely
   * shadowed and unavailable to mount any other secrets. Recommended mount
   * path: /etc/secrets
   */
  mountPath?: string;
  /**
   * Project identifier (preferably project number but can also be the project
   * ID) of the project that contains the secret. If not set, it is assumed that
   * the secret is in the same project as the function.
   */
  projectId?: string;
  /**
   * Name of the secret in secret manager (not the full resource name).
   */
  secret?: string;
  /**
   * List of secret versions to mount for this secret. If empty, the `latest`
   * version of the secret will be made available in a file named after the
   * secret under the mount point.
   */
  versions?: SecretVersion[];
}

/**
 * Describes the Service being deployed. Currently Supported : Cloud Run (fully
 * managed). Next tag: 23
 */
export interface ServiceConfig {
  /**
   * Whether 100% of traffic is routed to the latest revision. On
   * CreateFunction and UpdateFunction, when set to true, the revision being
   * deployed will serve 100% of traffic, ignoring any traffic split settings,
   * if any. On GetFunction, true will be returned if the latest revision is
   * serving 100% of traffic.
   */
  allTrafficOnLatestRevision?: boolean;
  /**
   * The number of CPUs used in a single container instance. Default value is
   * calculated from available memory. Supports the same values as Cloud Run,
   * see
   * https://cloud.google.com/run/docs/reference/rest/v1/Container#resourcerequirements
   * Example: "1" indicates 1 vCPU
   */
  availableCpu?: string;
  /**
   * The amount of memory available for a function. Defaults to 256M. Supported
   * units are k, M, G, Mi, Gi. If no unit is supplied the value is interpreted
   * as bytes. See
   * https://github.com/kubernetes/kubernetes/blob/master/staging/src/k8s.io/apimachinery/pkg/api/resource/quantity.go
   * a full description.
   */
  availableMemory?: string;
  /**
   * Environment variables that shall be available during function execution.
   */
  environmentVariables?: {
    [key: string]: string
  };
  /**
   * The ingress settings for the function, controlling what traffic can reach
   * it.
   */
  ingressSettings?:  | "INGRESS_SETTINGS_UNSPECIFIED" | "ALLOW_ALL" | "ALLOW_INTERNAL_ONLY" | "ALLOW_INTERNAL_AND_GCLB";
  /**
   * The limit on the maximum number of function instances that may coexist at
   * a given time. In some cases, such as rapid traffic surges, Cloud Functions
   * may, for a short period of time, create more instances than the specified
   * max instances limit. If your function cannot tolerate this temporary
   * behavior, you may want to factor in a safety margin and set a lower max
   * instances value than your function can tolerate. See the [Max
   * Instances](https://cloud.google.com/functions/docs/max-instances) Guide for
   * more details.
   */
  maxInstanceCount?: number;
  /**
   * Sets the maximum number of concurrent requests that each instance can
   * receive. Defaults to 1.
   */
  maxInstanceRequestConcurrency?: number;
  /**
   * The limit on the minimum number of function instances that may coexist at
   * a given time. Function instances are kept in idle state for a short period
   * after they finished executing the request to reduce cold start time for
   * subsequent requests. Setting a minimum instance count will ensure that the
   * given number of instances are kept running in idle state always. This can
   * help with cold start times when jump in incoming request count occurs after
   * the idle instance would have been stopped in the default case.
   */
  minInstanceCount?: number;
  /**
   * Output only. The name of service revision.
   */
  readonly revision?: string;
  /**
   * Secret environment variables configuration.
   */
  secretEnvironmentVariables?: SecretEnvVar[];
  /**
   * Secret volumes configuration.
   */
  secretVolumes?: SecretVolume[];
  /**
   * Security level configure whether the function only accepts https. This
   * configuration is only applicable to 1st Gen functions with Http trigger. By
   * default https is optional for 1st Gen functions; 2nd Gen functions are
   * https ONLY.
   */
  securityLevel?:  | "SECURITY_LEVEL_UNSPECIFIED" | "SECURE_ALWAYS" | "SECURE_OPTIONAL";
  /**
   * Output only. Name of the service associated with a Function. The format of
   * this field is `projects/{project}/locations/{region}/services/{service}`
   */
  readonly service?: string;
  /**
   * The email of the service's service account. If empty, defaults to
   * `{project_number}-compute@developer.gserviceaccount.com`.
   */
  serviceAccountEmail?: string;
  /**
   * The function execution timeout. Execution is considered failed and can be
   * terminated if the function is not completed at the end of the timeout
   * period. Defaults to 60 seconds.
   */
  timeoutSeconds?: number;
  /**
   * Output only. URI of the Service deployed.
   */
  readonly uri?: string;
  /**
   * The Serverless VPC Access connector that this cloud function can connect
   * to. The format of this field is `projects/*\/locations/*\/connectors/*`.
   */
  vpcConnector?: string;
  /**
   * The egress settings for the connector, controlling what traffic is
   * diverted through it.
   */
  vpcConnectorEgressSettings?:  | "VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED" | "PRIVATE_RANGES_ONLY" | "ALL_TRAFFIC";
}

/**
 * Request message for `SetIamPolicy` method.
 */
export interface SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: Policy;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify.
   * Only the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used: `paths: "bindings, etag"`
   */
  updateMask?: string /* FieldMask */;
}

function serializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * The location of the function source code.
 */
export interface Source {
  /**
   * If provided, get the source from this location in a Cloud Source
   * Repository.
   */
  repoSource?: RepoSource;
  /**
   * If provided, get the source from this location in Google Cloud Storage.
   */
  storageSource?: StorageSource;
}

function serializeSource(data: any): Source {
  return {
    ...data,
    storageSource: data["storageSource"] !== undefined ? serializeStorageSource(data["storageSource"]) : undefined,
  };
}

function deserializeSource(data: any): Source {
  return {
    ...data,
    storageSource: data["storageSource"] !== undefined ? deserializeStorageSource(data["storageSource"]) : undefined,
  };
}

/**
 * Provenance of the source. Ways to find the original source, or verify that
 * some source was used for this build.
 */
export interface SourceProvenance {
  /**
   * A copy of the build's `source.repo_source`, if exists, with any revisions
   * resolved.
   */
  resolvedRepoSource?: RepoSource;
  /**
   * A copy of the build's `source.storage_source`, if exists, with any
   * generations resolved.
   */
  resolvedStorageSource?: StorageSource;
}

function serializeSourceProvenance(data: any): SourceProvenance {
  return {
    ...data,
    resolvedStorageSource: data["resolvedStorageSource"] !== undefined ? serializeStorageSource(data["resolvedStorageSource"]) : undefined,
  };
}

function deserializeSourceProvenance(data: any): SourceProvenance {
  return {
    ...data,
    resolvedStorageSource: data["resolvedStorageSource"] !== undefined ? deserializeStorageSource(data["resolvedStorageSource"]) : undefined,
  };
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
 * Location of the source in an archive file in Google Cloud Storage.
 */
export interface StorageSource {
  /**
   * Google Cloud Storage bucket containing the source (see [Bucket Name
   * Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)).
   */
  bucket?: string;
  /**
   * Google Cloud Storage generation for the object. If the generation is
   * omitted, the latest generation will be used.
   */
  generation?: bigint;
  /**
   * Google Cloud Storage object containing the source. This object must be a
   * gzipped archive file (`.tar.gz`) containing source to build.
   */
  object?: string;
}

function serializeStorageSource(data: any): StorageSource {
  return {
    ...data,
    generation: data["generation"] !== undefined ? String(data["generation"]) : undefined,
  };
}

function deserializeStorageSource(data: any): StorageSource {
  return {
    ...data,
    generation: data["generation"] !== undefined ? BigInt(data["generation"]) : undefined,
  };
}

/**
 * Request message for `TestIamPermissions` method.
 */
export interface TestIamPermissionsRequest {
  /**
   * The set of permissions to check for the `resource`. Permissions with
   * wildcards (such as `*` or `storage.*`) are not allowed. For more
   * information see [IAM
   * Overview](https://cloud.google.com/iam/docs/overview#permissions).
   */
  permissions?: string[];
}

/**
 * Response message for `TestIamPermissions` method.
 */
export interface TestIamPermissionsResponse {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
   */
  permissions?: string[];
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
