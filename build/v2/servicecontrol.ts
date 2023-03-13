// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Service Control API Client for Deno
 * ===================================
 * 
 * Provides admission control and telemetry reporting for services integrated with Service Infrastructure. 
 * 
 * Docs: https://cloud.google.com/service-control/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Provides admission control and telemetry reporting for services integrated
 * with Service Infrastructure.
 */
export class ServiceControl {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://servicecontrol.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Private Preview. This feature is only available for approved services.
   * This method provides admission control for services that are integrated
   * with [Service
   * Infrastructure](https://cloud.google.com/service-infrastructure). It checks
   * whether an operation should be allowed based on the service configuration
   * and relevant policies. It must be called before the operation is executed.
   * For more information, see [Admission
   * Control](https://cloud.google.com/service-infrastructure/docs/admission-control).
   * NOTE: The admission control has an expected policy propagation delay of
   * 60s. The caller **must** not depend on the most recent policy changes.
   * NOTE: The admission control has a hard limit of 1 referenced resources per
   * call. If an operation refers to more than 1 resources, the caller must call
   * the Check method multiple times. This method requires the
   * `servicemanagement.services.check` permission on the specified service. For
   * more information, see [Service Control API Access
   * Control](https://cloud.google.com/service-infrastructure/docs/service-control/access-control).
   *
   * @param serviceName The service name as specified in its service configuration. For example, `"pubsub.googleapis.com"`. See [google.api.Service](https://cloud.google.com/service-management/reference/rpc/google.api#google.api.Service) for the definition of a service name.
   */
  async servicesCheck(serviceName: string, req: CheckRequest): Promise<CheckResponse> {
    req = serializeCheckRequest(req);
    const url = new URL(`${this.#baseUrl}v2/services/${ serviceName }:check`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CheckResponse;
  }

  /**
   * Private Preview. This feature is only available for approved services.
   * This method provides telemetry reporting for services that are integrated
   * with [Service
   * Infrastructure](https://cloud.google.com/service-infrastructure). It
   * reports a list of operations that have occurred on a service. It must be
   * called after the operations have been executed. For more information, see
   * [Telemetry
   * Reporting](https://cloud.google.com/service-infrastructure/docs/telemetry-reporting).
   * NOTE: The telemetry reporting has a hard limit of 1000 operations and 1MB
   * per Report call. It is recommended to have no more than 100 operations per
   * call. This method requires the `servicemanagement.services.report`
   * permission on the specified service. For more information, see [Service
   * Control API Access
   * Control](https://cloud.google.com/service-infrastructure/docs/service-control/access-control).
   *
   * @param serviceName The service name as specified in its service configuration. For example, `"pubsub.googleapis.com"`. See [google.api.Service](https://cloud.google.com/service-management/reference/rpc/google.api#google.api.Service) for the definition of a service name.
   */
  async servicesReport(serviceName: string, req: ReportRequest): Promise<ReportResponse> {
    req = serializeReportRequest(req);
    const url = new URL(`${this.#baseUrl}v2/services/${ serviceName }:report`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ReportResponse;
  }
}

/**
 * This message defines attributes associated with API operations, such as a
 * network API request. The terminology is based on the conventions used by
 * Google APIs, Istio, and OpenAPI.
 */
export interface Api {
  /**
   * The API operation name. For gRPC requests, it is the fully qualified API
   * method name, such as "google.pubsub.v1.Publisher.Publish". For OpenAPI
   * requests, it is the `operationId`, such as "getPet".
   */
  operation?: string;
  /**
   * The API protocol used for sending the request, such as "http", "https",
   * "grpc", or "internal".
   */
  protocol?: string;
  /**
   * The API service name. It is a logical identifier for a networked API, such
   * as "pubsub.googleapis.com". The naming syntax depends on the API management
   * system being used for handling the request.
   */
  service?: string;
  /**
   * The API version associated with the API operation above, such as "v1" or
   * "v1alpha1".
   */
  version?: string;
}

/**
 * This message defines the standard attribute vocabulary for Google APIs. An
 * attribute is a piece of metadata that describes an activity on a network
 * service. For example, the size of an HTTP request, or the status code of an
 * HTTP response. Each attribute has a type and a name, which is logically
 * defined as a proto message field in `AttributeContext`. The field type
 * becomes the attribute type, and the field path becomes the attribute name.
 * For example, the attribute `source.ip` maps to field
 * `AttributeContext.source.ip`. This message definition is guaranteed not to
 * have any wire breaking change. So you can use it directly for passing
 * attributes across different systems. NOTE: Different system may generate
 * different subset of attributes. Please verify the system specification before
 * relying on an attribute generated a system.
 */
export interface AttributeContext {
  /**
   * Represents an API operation that is involved to a network activity.
   */
  api?: Api;
  /**
   * The destination of a network activity, such as accepting a TCP connection.
   * In a multi hop network activity, the destination represents the receiver of
   * the last hop.
   */
  destination?: Peer;
  /**
   * Supports extensions for advanced use cases, such as logs and metrics.
   */
  extensions?: {
    [key: string]: any
  }[];
  /**
   * The origin of a network activity. In a multi hop network activity, the
   * origin represents the sender of the first hop. For the first hop, the
   * `source` and the `origin` must have the same content.
   */
  origin?: Peer;
  /**
   * Represents a network request, such as an HTTP request.
   */
  request?: Request;
  /**
   * Represents a target resource that is involved with a network activity. If
   * multiple resources are involved with an activity, this must be the primary
   * one.
   */
  resource?: Resource;
  /**
   * Represents a network response, such as an HTTP response.
   */
  response?: Response;
  /**
   * The source of a network activity, such as starting a TCP connection. In a
   * multi hop network activity, the source represents the sender of the last
   * hop.
   */
  source?: Peer;
}

function serializeAttributeContext(data: any): AttributeContext {
  return {
    ...data,
    destination: data["destination"] !== undefined ? serializePeer(data["destination"]) : undefined,
    origin: data["origin"] !== undefined ? serializePeer(data["origin"]) : undefined,
    request: data["request"] !== undefined ? serializeRequest(data["request"]) : undefined,
    resource: data["resource"] !== undefined ? serializeResource(data["resource"]) : undefined,
    response: data["response"] !== undefined ? serializeResponse(data["response"]) : undefined,
    source: data["source"] !== undefined ? serializePeer(data["source"]) : undefined,
  };
}

function deserializeAttributeContext(data: any): AttributeContext {
  return {
    ...data,
    destination: data["destination"] !== undefined ? deserializePeer(data["destination"]) : undefined,
    origin: data["origin"] !== undefined ? deserializePeer(data["origin"]) : undefined,
    request: data["request"] !== undefined ? deserializeRequest(data["request"]) : undefined,
    resource: data["resource"] !== undefined ? deserializeResource(data["resource"]) : undefined,
    response: data["response"] !== undefined ? deserializeResponse(data["response"]) : undefined,
    source: data["source"] !== undefined ? deserializePeer(data["source"]) : undefined,
  };
}

/**
 * Common audit log format for Google Cloud Platform API operations.
 */
export interface AuditLog {
  /**
   * Authentication information.
   */
  authenticationInfo?: AuthenticationInfo;
  /**
   * Authorization information. If there are multiple resources or permissions
   * involved, then there is one AuthorizationInfo element for each {resource,
   * permission} tuple.
   */
  authorizationInfo?: AuthorizationInfo[];
  /**
   * Other service-specific data about the request, response, and other
   * information associated with the current audited event.
   */
  metadata?: {
    [key: string]: any
  };
  /**
   * The name of the service method or operation. For API calls, this should be
   * the name of the API method. For example,
   * "google.cloud.bigquery.v2.TableService.InsertTable"
   * "google.logging.v2.ConfigServiceV2.CreateSink"
   */
  methodName?: string;
  /**
   * The number of items returned from a List or Query API method, if
   * applicable.
   */
  numResponseItems?: bigint;
  /**
   * Indicates the policy violations for this request. If the request is denied
   * by the policy, violation information will be logged here.
   */
  policyViolationInfo?: PolicyViolationInfo;
  /**
   * The operation request. This may not include all request parameters, such
   * as those that are too large, privacy-sensitive, or duplicated elsewhere in
   * the log record. It should never include user-generated data, such as file
   * contents. When the JSON object represented here has a proto equivalent, the
   * proto name will be indicated in the `@type` property.
   */
  request?: {
    [key: string]: any
  };
  /**
   * Metadata about the operation.
   */
  requestMetadata?: RequestMetadata;
  /**
   * The resource location information.
   */
  resourceLocation?: ResourceLocation;
  /**
   * The resource or collection that is the target of the operation. The name
   * is a scheme-less URI, not including the API service name. For example:
   * "projects/PROJECT_ID/zones/us-central1-a/instances"
   * "projects/PROJECT_ID/datasets/DATASET_ID"
   */
  resourceName?: string;
  /**
   * The resource's original state before mutation. Present only for operations
   * which have successfully modified the targeted resource(s). In general, this
   * field should contain all changed fields, except those that are already been
   * included in `request`, `response`, `metadata` or `service_data` fields.
   * When the JSON object represented here has a proto equivalent, the proto
   * name will be indicated in the `@type` property.
   */
  resourceOriginalState?: {
    [key: string]: any
  };
  /**
   * The operation response. This may not include all response elements, such
   * as those that are too large, privacy-sensitive, or duplicated elsewhere in
   * the log record. It should never include user-generated data, such as file
   * contents. When the JSON object represented here has a proto equivalent, the
   * proto name will be indicated in the `@type` property.
   */
  response?: {
    [key: string]: any
  };
  /**
   * Deprecated. Use the `metadata` field instead. Other service-specific data
   * about the request, response, and other activities.
   */
  serviceData?: {
    [key: string]: any
  };
  /**
   * The name of the API service performing the operation. For example,
   * `"compute.googleapis.com"`.
   */
  serviceName?: string;
  /**
   * The status of the overall operation.
   */
  status?: Status;
}

function serializeAuditLog(data: any): AuditLog {
  return {
    ...data,
    authorizationInfo: data["authorizationInfo"] !== undefined ? data["authorizationInfo"].map((item: any) => (serializeAuthorizationInfo(item))) : undefined,
    numResponseItems: data["numResponseItems"] !== undefined ? String(data["numResponseItems"]) : undefined,
    requestMetadata: data["requestMetadata"] !== undefined ? serializeRequestMetadata(data["requestMetadata"]) : undefined,
  };
}

function deserializeAuditLog(data: any): AuditLog {
  return {
    ...data,
    authorizationInfo: data["authorizationInfo"] !== undefined ? data["authorizationInfo"].map((item: any) => (deserializeAuthorizationInfo(item))) : undefined,
    numResponseItems: data["numResponseItems"] !== undefined ? BigInt(data["numResponseItems"]) : undefined,
    requestMetadata: data["requestMetadata"] !== undefined ? deserializeRequestMetadata(data["requestMetadata"]) : undefined,
  };
}

/**
 * This message defines request authentication attributes. Terminology is based
 * on the JSON Web Token (JWT) standard, but the terms also correlate to
 * concepts in other standards.
 */
export interface Auth {
  /**
   * A list of access level resource names that allow resources to be accessed
   * by authenticated requester. It is part of Secure GCP processing for the
   * incoming request. An access level string has the format:
   * "//{api_service_name}/accessPolicies/{policy_id}/accessLevels/{short_name}"
   * Example:
   * "//accesscontextmanager.googleapis.com/accessPolicies/MY_POLICY_ID/accessLevels/MY_LEVEL"
   */
  accessLevels?: string[];
  /**
   * The intended audience(s) for this authentication information. Reflects the
   * audience (`aud`) claim within a JWT. The audience value(s) depends on the
   * `issuer`, but typically include one or more of the following pieces of
   * information: * The services intended to receive the credential. For
   * example, ["https://pubsub.googleapis.com/",
   * "https://storage.googleapis.com/"]. * A set of service-based scopes. For
   * example, ["https://www.googleapis.com/auth/cloud-platform"]. * The client
   * id of an app, such as the Firebase project id for JWTs from Firebase Auth.
   * Consult the documentation for the credential issuer to determine the
   * information provided.
   */
  audiences?: string[];
  /**
   * Structured claims presented with the credential. JWTs include `{key:
   * value}` pairs for standard and private claims. The following is a subset of
   * the standard required and optional claims that would typically be presented
   * for a Google-based JWT: {'iss': 'accounts.google.com', 'sub':
   * '113289723416554971153', 'aud': ['123456789012', 'pubsub.googleapis.com'],
   * 'azp': '123456789012.apps.googleusercontent.com', 'email':
   * 'jsmith@example.com', 'iat': 1353601026, 'exp': 1353604926} SAML assertions
   * are similarly specified, but with an identity provider dependent structure.
   */
  claims?: {
    [key: string]: any
  };
  /**
   * The authorized presenter of the credential. Reflects the optional
   * Authorized Presenter (`azp`) claim within a JWT or the OAuth client id. For
   * example, a Google Cloud Platform client id looks as follows:
   * "123456789012.apps.googleusercontent.com".
   */
  presenter?: string;
  /**
   * The authenticated principal. Reflects the issuer (`iss`) and subject
   * (`sub`) claims within a JWT. The issuer and subject should be `/`
   * delimited, with `/` percent-encoded within the subject fragment. For Google
   * accounts, the principal format is: "https://accounts.google.com/{id}"
   */
  principal?: string;
}

/**
 * Authentication information for the operation.
 */
export interface AuthenticationInfo {
  /**
   * The authority selector specified by the requestor, if any. It is not
   * guaranteed that the principal was allowed to use this authority.
   */
  authoritySelector?: string;
  /**
   * The email address of the authenticated user (or service account on behalf
   * of third party principal) making the request. For third party identity
   * callers, the `principal_subject` field is populated instead of this field.
   * For privacy reasons, the principal email address is sometimes redacted. For
   * more information, see [Caller identities in audit
   * logs](https://cloud.google.com/logging/docs/audit#user-id).
   */
  principalEmail?: string;
  /**
   * String representation of identity of requesting party. Populated for both
   * first and third party identities.
   */
  principalSubject?: string;
  /**
   * Identity delegation history of an authenticated service account that makes
   * the request. It contains information on the real authorities that try to
   * access GCP resources by delegating on a service account. When multiple
   * authorities present, they are guaranteed to be sorted based on the original
   * ordering of the identity delegation events.
   */
  serviceAccountDelegationInfo?: ServiceAccountDelegationInfo[];
  /**
   * The name of the service account key used to create or exchange credentials
   * for authenticating the service account making the request. This is a
   * scheme-less URI full resource name. For example:
   * "//iam.googleapis.com/projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}"
   */
  serviceAccountKeyName?: string;
  /**
   * The third party identification (if any) of the authenticated user making
   * the request. When the JSON object represented here has a proto equivalent,
   * the proto name will be indicated in the `@type` property.
   */
  thirdPartyPrincipal?: {
    [key: string]: any
  };
}

/**
 * Authorization information for the operation.
 */
export interface AuthorizationInfo {
  /**
   * Whether or not authorization for `resource` and `permission` was granted.
   */
  granted?: boolean;
  /**
   * The required IAM permission.
   */
  permission?: string;
  /**
   * The resource being accessed, as a REST-style or cloud resource string. For
   * example: bigquery.googleapis.com/projects/PROJECTID/datasets/DATASETID or
   * projects/PROJECTID/datasets/DATASETID
   */
  resource?: string;
  /**
   * Resource attributes used in IAM condition evaluation. This field contains
   * resource attributes like resource type and resource name. To get the whole
   * view of the attributes used in IAM condition evaluation, the user must also
   * look into `AuditLog.request_metadata.request_attributes`.
   */
  resourceAttributes?: Resource;
}

function serializeAuthorizationInfo(data: any): AuthorizationInfo {
  return {
    ...data,
    resourceAttributes: data["resourceAttributes"] !== undefined ? serializeResource(data["resourceAttributes"]) : undefined,
  };
}

function deserializeAuthorizationInfo(data: any): AuthorizationInfo {
  return {
    ...data,
    resourceAttributes: data["resourceAttributes"] !== undefined ? deserializeResource(data["resourceAttributes"]) : undefined,
  };
}

/**
 * Request message for the Check method.
 */
export interface CheckRequest {
  /**
   * Describes attributes about the operation being executed by the service.
   */
  attributes?: AttributeContext;
  /**
   * Optional. Contains a comma-separated list of flags.
   */
  flags?: string;
  /**
   * Describes the resources and the policies applied to each resource.
   */
  resources?: ResourceInfo[];
  /**
   * Specifies the version of the service configuration that should be used to
   * process the request. Must not be empty. Set this field to 'latest' to
   * specify using the latest configuration.
   */
  serviceConfigId?: string;
}

function serializeCheckRequest(data: any): CheckRequest {
  return {
    ...data,
    attributes: data["attributes"] !== undefined ? serializeAttributeContext(data["attributes"]) : undefined,
  };
}

function deserializeCheckRequest(data: any): CheckRequest {
  return {
    ...data,
    attributes: data["attributes"] !== undefined ? deserializeAttributeContext(data["attributes"]) : undefined,
  };
}

/**
 * Response message for the Check method.
 */
export interface CheckResponse {
  /**
   * Returns a set of request contexts generated from the `CheckRequest`.
   */
  headers?: {
    [key: string]: string
  };
  /**
   * Operation is allowed when this field is not set. Any non-'OK' status
   * indicates a denial; google.rpc.Status.details would contain additional
   * details about the denial.
   */
  status?: Status;
}

/**
 * First party identity principal.
 */
export interface FirstPartyPrincipal {
  /**
   * The email address of a Google account. .
   */
  principalEmail?: string;
  /**
   * Metadata about the service that uses the service account. .
   */
  serviceMetadata?: {
    [key: string]: any
  };
}

/**
 * Represents OrgPolicy Violation information.
 */
export interface OrgPolicyViolationInfo {
  /**
   * Optional. Resource payload that is currently in scope and is subjected to
   * orgpolicy conditions. This payload may be the subset of the actual Resource
   * that may come in the request. This payload should not contain any core
   * content.
   */
  payload?: {
    [key: string]: any
  };
  /**
   * Optional. Tags referenced on the resource at the time of evaluation. These
   * also include the federated tags, if they are supplied in the CheckOrgPolicy
   * or CheckCustomConstraints Requests. Optional field as of now. These tags
   * are the Cloud tags that are available on the resource during the policy
   * evaluation and will be available as part of the OrgPolicy check response
   * for logging purposes.
   */
  resourceTags?: {
    [key: string]: string
  };
  /**
   * Optional. Resource type that the orgpolicy is checked against. Example:
   * compute.googleapis.com/Instance, store.googleapis.com/bucket
   */
  resourceType?: string;
  /**
   * Optional. Policy violations
   */
  violationInfo?: ViolationInfo[];
}

/**
 * This message defines attributes for a node that handles a network request.
 * The node can be either a service or an application that sends, forwards, or
 * receives the request. Service peers should fill in `principal` and `labels`
 * as appropriate.
 */
export interface Peer {
  /**
   * The IP address of the peer.
   */
  ip?: string;
  /**
   * The labels associated with the peer.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The network port of the peer.
   */
  port?: bigint;
  /**
   * The identity of this peer. Similar to `Request.auth.principal`, but
   * relative to the peer instead of the request. For example, the identity
   * associated with a load balancer that forwarded the request.
   */
  principal?: string;
  /**
   * The CLDR country/region code associated with the above IP address. If the
   * IP address is private, the `region_code` should reflect the physical
   * location where this peer is running.
   */
  regionCode?: string;
}

function serializePeer(data: any): Peer {
  return {
    ...data,
    port: data["port"] !== undefined ? String(data["port"]) : undefined,
  };
}

function deserializePeer(data: any): Peer {
  return {
    ...data,
    port: data["port"] !== undefined ? BigInt(data["port"]) : undefined,
  };
}

/**
 * Information related to policy violations for this request.
 */
export interface PolicyViolationInfo {
  /**
   * Indicates the orgpolicy violations for this resource.
   */
  orgPolicyViolationInfo?: OrgPolicyViolationInfo;
}

/**
 * Request message for the Report method.
 */
export interface ReportRequest {
  /**
   * Describes the list of operations to be reported. Each operation is
   * represented as an AttributeContext, and contains all attributes around an
   * API access.
   */
  operations?: AttributeContext[];
  /**
   * Specifies the version of the service configuration that should be used to
   * process the request. Must not be empty. Set this field to 'latest' to
   * specify using the latest configuration.
   */
  serviceConfigId?: string;
}

function serializeReportRequest(data: any): ReportRequest {
  return {
    ...data,
    operations: data["operations"] !== undefined ? data["operations"].map((item: any) => (serializeAttributeContext(item))) : undefined,
  };
}

function deserializeReportRequest(data: any): ReportRequest {
  return {
    ...data,
    operations: data["operations"] !== undefined ? data["operations"].map((item: any) => (deserializeAttributeContext(item))) : undefined,
  };
}

/**
 * Response message for the Report method. If the request contains any invalid
 * data, the server returns an RPC error.
 */
export interface ReportResponse {
}

/**
 * This message defines attributes for an HTTP request. If the actual request
 * is not an HTTP request, the runtime system should try to map the actual
 * request to an equivalent HTTP request.
 */
export interface Request {
  /**
   * The request authentication. May be absent for unauthenticated requests.
   * Derived from the HTTP request `Authorization` header or equivalent.
   */
  auth?: Auth;
  /**
   * The HTTP request headers. If multiple headers share the same key, they
   * must be merged according to the HTTP spec. All header keys must be
   * lowercased, because HTTP header keys are case-insensitive.
   */
  headers?: {
    [key: string]: string
  };
  /**
   * The HTTP request `Host` header value.
   */
  host?: string;
  /**
   * The unique ID for a request, which can be propagated to downstream
   * systems. The ID should have low probability of collision within a single
   * day for a specific service.
   */
  id?: string;
  /**
   * The HTTP request method, such as `GET`, `POST`.
   */
  method?: string;
  /**
   * The HTTP URL path, excluding the query parameters.
   */
  path?: string;
  /**
   * The network protocol used with the request, such as "http/1.1", "spdy/3",
   * "h2", "h2c", "webrtc", "tcp", "udp", "quic". See
   * https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids
   * for details.
   */
  protocol?: string;
  /**
   * The HTTP URL query in the format of `name1=value1&name2=value2`, as it
   * appears in the first line of the HTTP request. No decoding is performed.
   */
  query?: string;
  /**
   * A special parameter for request reason. It is used by security systems to
   * associate auditing information with a request.
   */
  reason?: string;
  /**
   * The HTTP URL scheme, such as `http` and `https`.
   */
  scheme?: string;
  /**
   * The HTTP request size in bytes. If unknown, it must be -1.
   */
  size?: bigint;
  /**
   * The timestamp when the `destination` service receives the last byte of the
   * request.
   */
  time?: Date;
}

function serializeRequest(data: any): Request {
  return {
    ...data,
    size: data["size"] !== undefined ? String(data["size"]) : undefined,
    time: data["time"] !== undefined ? data["time"].toISOString() : undefined,
  };
}

function deserializeRequest(data: any): Request {
  return {
    ...data,
    size: data["size"] !== undefined ? BigInt(data["size"]) : undefined,
    time: data["time"] !== undefined ? new Date(data["time"]) : undefined,
  };
}

/**
 * Metadata about the request.
 */
export interface RequestMetadata {
  /**
   * The IP address of the caller. For a caller from the internet, this will be
   * the public IPv4 or IPv6 address. For calls made from inside Google's
   * internal production network from one GCP service to another, `caller_ip`
   * will be redacted to "private". For a caller from a Compute Engine VM with a
   * external IP address, `caller_ip` will be the VM's external IP address. For
   * a caller from a Compute Engine VM without a external IP address, if the VM
   * is in the same organization (or project) as the accessed resource,
   * `caller_ip` will be the VM's internal IPv4 address, otherwise `caller_ip`
   * will be redacted to "gce-internal-ip". See
   * https://cloud.google.com/compute/docs/vpc/ for more information.
   */
  callerIp?: string;
  /**
   * The network of the caller. Set only if the network host project is part of
   * the same GCP organization (or project) as the accessed resource. See
   * https://cloud.google.com/compute/docs/vpc/ for more information. This is a
   * scheme-less URI full resource name. For example:
   * "//compute.googleapis.com/projects/PROJECT_ID/global/networks/NETWORK_ID"
   */
  callerNetwork?: string;
  /**
   * The user agent of the caller. This information is not authenticated and
   * should be treated accordingly. For example: +
   * `google-api-python-client/1.4.0`: The request was made by the Google API
   * client for Python. + `Cloud SDK Command Line Tool apitools-client/1.0
   * gcloud/0.9.62`: The request was made by the Google Cloud SDK CLI (gcloud).
   * + `AppEngine-Google; (+http://code.google.com/appengine; appid:
   * s~my-project`: The request was made from the `my-project` App Engine app.
   */
  callerSuppliedUserAgent?: string;
  /**
   * The destination of a network activity, such as accepting a TCP connection.
   * In a multi hop network activity, the destination represents the receiver of
   * the last hop. Only two fields are used in this message, Peer.port and
   * Peer.ip. These fields are optionally populated by those services utilizing
   * the IAM condition feature.
   */
  destinationAttributes?: Peer;
  /**
   * Request attributes used in IAM condition evaluation. This field contains
   * request attributes like request time and access levels associated with the
   * request. To get the whole view of the attributes used in IAM condition
   * evaluation, the user must also look into
   * `AuditLog.authentication_info.resource_attributes`.
   */
  requestAttributes?: Request;
}

function serializeRequestMetadata(data: any): RequestMetadata {
  return {
    ...data,
    destinationAttributes: data["destinationAttributes"] !== undefined ? serializePeer(data["destinationAttributes"]) : undefined,
    requestAttributes: data["requestAttributes"] !== undefined ? serializeRequest(data["requestAttributes"]) : undefined,
  };
}

function deserializeRequestMetadata(data: any): RequestMetadata {
  return {
    ...data,
    destinationAttributes: data["destinationAttributes"] !== undefined ? deserializePeer(data["destinationAttributes"]) : undefined,
    requestAttributes: data["requestAttributes"] !== undefined ? deserializeRequest(data["requestAttributes"]) : undefined,
  };
}

/**
 * This message defines core attributes for a resource. A resource is an
 * addressable (named) entity provided by the destination service. For example,
 * a file stored on a network storage service.
 */
export interface Resource {
  /**
   * Annotations is an unstructured key-value map stored with a resource that
   * may be set by external tools to store and retrieve arbitrary metadata. They
   * are not queryable and should be preserved when modifying objects. More
   * info: https://kubernetes.io/docs/user-guide/annotations
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * Output only. The timestamp when the resource was created. This may be
   * either the time creation was initiated or when it was completed.
   */
  createTime?: Date;
  /**
   * Output only. The timestamp when the resource was deleted. If the resource
   * is not deleted, this must be empty.
   */
  deleteTime?: Date;
  /**
   * Mutable. The display name set by clients. Must be <= 63 characters.
   */
  displayName?: string;
  /**
   * Output only. An opaque value that uniquely identifies a version or
   * generation of a resource. It can be used to confirm that the client and
   * server agree on the ordering of a resource being written.
   */
  etag?: string;
  /**
   * The labels or tags on the resource, such as AWS resource tags and
   * Kubernetes resource labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Immutable. The location of the resource. The location encoding is specific
   * to the service provider, and new encoding may be introduced as the service
   * evolves. For Google Cloud products, the encoding is what is used by Google
   * Cloud APIs, such as `us-east1`, `aws-us-east-1`, and `azure-eastus2`. The
   * semantics of `location` is identical to the `cloud.googleapis.com/location`
   * label used by some Google Cloud APIs.
   */
  location?: string;
  /**
   * The stable identifier (name) of a resource on the `service`. A resource
   * can be logically identified as "//{resource.service}/{resource.name}". The
   * differences between a resource name and a URI are: * Resource name is a
   * logical identifier, independent of network protocol and API version. For
   * example, `//pubsub.googleapis.com/projects/123/topics/news-feed`. * URI
   * often includes protocol and version information, so it can be used directly
   * by applications. For example,
   * `https://pubsub.googleapis.com/v1/projects/123/topics/news-feed`. See
   * https://cloud.google.com/apis/design/resource_names for details.
   */
  name?: string;
  /**
   * The name of the service that this resource belongs to, such as
   * `pubsub.googleapis.com`. The service may be different from the DNS hostname
   * that actually serves the request.
   */
  service?: string;
  /**
   * The type of the resource. The syntax is platform-specific because
   * different platforms define their resources differently. For Google APIs,
   * the type format must be "{service}/{kind}", such as
   * "pubsub.googleapis.com/Topic".
   */
  type?: string;
  /**
   * The unique identifier of the resource. UID is unique in the time and space
   * for this resource within the scope of the service. It is typically
   * generated by the server on successful creation of a resource and must not
   * be changed. UID is used to uniquely identify resources with resource name
   * reuses. This should be a UUID4.
   */
  uid?: string;
  /**
   * Output only. The timestamp when the resource was last updated. Any change
   * to the resource made by users must refresh this value. Changes to a
   * resource made by the service should refresh this value.
   */
  updateTime?: Date;
}

function serializeResource(data: any): Resource {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    deleteTime: data["deleteTime"] !== undefined ? data["deleteTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeResource(data: any): Resource {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deleteTime: data["deleteTime"] !== undefined ? new Date(data["deleteTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Describes a resource referenced in the request.
 */
export interface ResourceInfo {
  /**
   * Optional. The identifier of the container of this resource. For Google
   * Cloud APIs, the resource container must be one of the following formats: -
   * `projects/` - `folders/` - `organizations/` For the policy enforcement on
   * the container level (VPCSC and Location Policy check), this field takes
   * precedence on the container extracted from name when presents.
   */
  container?: string;
  /**
   * Optional. The location of the resource. The value must be a valid zone,
   * region or multiregion. For example: "europe-west4" or
   * "northamerica-northeast1-a"
   */
  location?: string;
  /**
   * The name of the resource referenced in the request.
   */
  name?: string;
  /**
   * The resource permission needed for this request. The format must be
   * "{service}/{plural}.{verb}".
   */
  permission?: string;
  /**
   * The resource type in the format of "{service}/{kind}".
   */
  type?: string;
}

/**
 * Location information about a resource.
 */
export interface ResourceLocation {
  /**
   * The locations of a resource after the execution of the operation. Requests
   * to create or delete a location based resource must populate the
   * 'current_locations' field and not the 'original_locations' field. For
   * example: "europe-west1-a" "us-east1" "nam3"
   */
  currentLocations?: string[];
  /**
   * The locations of a resource prior to the execution of the operation.
   * Requests that mutate the resource's location must populate both the
   * 'original_locations' as well as the 'current_locations' fields. For
   * example: "europe-west1-a" "us-east1" "nam3"
   */
  originalLocations?: string[];
}

/**
 * This message defines attributes for a typical network response. It generally
 * models semantics of an HTTP response.
 */
export interface Response {
  /**
   * The amount of time it takes the backend service to fully respond to a
   * request. Measured from when the destination service starts to send the
   * request to the backend until when the destination service receives the
   * complete response from the backend.
   */
  backendLatency?: number /* Duration */;
  /**
   * The HTTP response status code, such as `200` and `404`.
   */
  code?: bigint;
  /**
   * The HTTP response headers. If multiple headers share the same key, they
   * must be merged according to HTTP spec. All header keys must be lowercased,
   * because HTTP header keys are case-insensitive.
   */
  headers?: {
    [key: string]: string
  };
  /**
   * The HTTP response size in bytes. If unknown, it must be -1.
   */
  size?: bigint;
  /**
   * The timestamp when the `destination` service sends the last byte of the
   * response.
   */
  time?: Date;
}

function serializeResponse(data: any): Response {
  return {
    ...data,
    backendLatency: data["backendLatency"] !== undefined ? data["backendLatency"] : undefined,
    code: data["code"] !== undefined ? String(data["code"]) : undefined,
    size: data["size"] !== undefined ? String(data["size"]) : undefined,
    time: data["time"] !== undefined ? data["time"].toISOString() : undefined,
  };
}

function deserializeResponse(data: any): Response {
  return {
    ...data,
    backendLatency: data["backendLatency"] !== undefined ? data["backendLatency"] : undefined,
    code: data["code"] !== undefined ? BigInt(data["code"]) : undefined,
    size: data["size"] !== undefined ? BigInt(data["size"]) : undefined,
    time: data["time"] !== undefined ? new Date(data["time"]) : undefined,
  };
}

/**
 * Identity delegation history of an authenticated service account.
 */
export interface ServiceAccountDelegationInfo {
  /**
   * First party (Google) identity as the real authority.
   */
  firstPartyPrincipal?: FirstPartyPrincipal;
  /**
   * A string representing the principal_subject associated with the identity.
   * For most identities, the format will be
   * `principal://iam.googleapis.com/{identity pool name}/subject/{subject)`
   * except for some GKE identities (GKE_WORKLOAD, FREEFORM, GKE_HUB_WORKLOAD)
   * that are still in the legacy format `serviceAccount:{identity pool
   * name}[{subject}]`
   */
  principalSubject?: string;
  /**
   * Third party identity as the real authority.
   */
  thirdPartyPrincipal?: ThirdPartyPrincipal;
}

/**
 * The context of a span. This is attached to an Exemplar in Distribution
 * values during aggregation. It contains the name of a span with format:
 * projects/[PROJECT_ID_OR_NUMBER]/traces/[TRACE_ID]/spans/[SPAN_ID]
 */
export interface SpanContext {
  /**
   * The resource name of the span. The format is:
   * projects/[PROJECT_ID_OR_NUMBER]/traces/[TRACE_ID]/spans/[SPAN_ID]
   * `[TRACE_ID]` is a unique identifier for a trace within a project; it is a
   * 32-character hexadecimal encoding of a 16-byte array. `[SPAN_ID]` is a
   * unique identifier for a span within a trace; it is a 16-character
   * hexadecimal encoding of an 8-byte array.
   */
  spanName?: string;
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
 * Third party identity principal.
 */
export interface ThirdPartyPrincipal {
  /**
   * Metadata about third party identity.
   */
  thirdPartyClaims?: {
    [key: string]: any
  };
}

/**
 * A common proto for logging HTTP requests. Only contains semantics defined by
 * the HTTP specification. Product-specific logging information MUST be defined
 * in a separate message.
 */
export interface V2HttpRequest {
  /**
   * The number of HTTP response bytes inserted into cache. Set only when a
   * cache fill was attempted.
   */
  cacheFillBytes?: bigint;
  /**
   * Whether or not an entity was served from cache (with or without
   * validation).
   */
  cacheHit?: boolean;
  /**
   * Whether or not a cache lookup was attempted.
   */
  cacheLookup?: boolean;
  /**
   * Whether or not the response was validated with the origin server before
   * being served from cache. This field is only meaningful if `cache_hit` is
   * True.
   */
  cacheValidatedWithOriginServer?: boolean;
  /**
   * The request processing latency on the server, from the time the request
   * was received until the response was sent.
   */
  latency?: number /* Duration */;
  /**
   * Protocol used for the request. Examples: "HTTP/1.1", "HTTP/2", "websocket"
   */
  protocol?: string;
  /**
   * The referer URL of the request, as defined in [HTTP/1.1 Header Field
   * Definitions](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html).
   */
  referer?: string;
  /**
   * The IP address (IPv4 or IPv6) of the client that issued the HTTP request.
   * Examples: `"192.168.1.1"`, `"FE80::0202:B3FF:FE1E:8329"`.
   */
  remoteIp?: string;
  /**
   * The request method. Examples: `"GET"`, `"HEAD"`, `"PUT"`, `"POST"`.
   */
  requestMethod?: string;
  /**
   * The size of the HTTP request message in bytes, including the request
   * headers and the request body.
   */
  requestSize?: bigint;
  /**
   * The scheme (http, https), the host name, the path, and the query portion
   * of the URL that was requested. Example:
   * `"http://example.com/some/info?color=red"`.
   */
  requestUrl?: string;
  /**
   * The size of the HTTP response message sent back to the client, in bytes,
   * including the response headers and the response body.
   */
  responseSize?: bigint;
  /**
   * The IP address (IPv4 or IPv6) of the origin server that the request was
   * sent to.
   */
  serverIp?: string;
  /**
   * The response code indicating the status of the response. Examples: 200,
   * 404.
   */
  status?: number;
  /**
   * The user agent sent by the client. Example: `"Mozilla/4.0 (compatible;
   * MSIE 6.0; Windows 98; Q312461; .NET CLR 1.0.3705)"`.
   */
  userAgent?: string;
}

function serializeV2HttpRequest(data: any): V2HttpRequest {
  return {
    ...data,
    cacheFillBytes: data["cacheFillBytes"] !== undefined ? String(data["cacheFillBytes"]) : undefined,
    latency: data["latency"] !== undefined ? data["latency"] : undefined,
    requestSize: data["requestSize"] !== undefined ? String(data["requestSize"]) : undefined,
    responseSize: data["responseSize"] !== undefined ? String(data["responseSize"]) : undefined,
  };
}

function deserializeV2HttpRequest(data: any): V2HttpRequest {
  return {
    ...data,
    cacheFillBytes: data["cacheFillBytes"] !== undefined ? BigInt(data["cacheFillBytes"]) : undefined,
    latency: data["latency"] !== undefined ? data["latency"] : undefined,
    requestSize: data["requestSize"] !== undefined ? BigInt(data["requestSize"]) : undefined,
    responseSize: data["responseSize"] !== undefined ? BigInt(data["responseSize"]) : undefined,
  };
}

/**
 * An individual log entry.
 */
export interface V2LogEntry {
  /**
   * Optional. Information about the HTTP request associated with this log
   * entry, if applicable.
   */
  httpRequest?: V2HttpRequest;
  /**
   * A unique ID for the log entry used for deduplication. If omitted, the
   * implementation will generate one based on operation_id.
   */
  insertId?: string;
  /**
   * A set of user-defined (key, value) data that provides additional
   * information about the log entry.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * A set of user-defined (key, value) data that provides additional
   * information about the moniotored resource that the log entry belongs to.
   */
  monitoredResourceLabels?: {
    [key: string]: string
  };
  /**
   * Required. The log to which this log entry belongs. Examples: `"syslog"`,
   * `"book_log"`.
   */
  name?: string;
  /**
   * Optional. Information about an operation associated with the log entry, if
   * applicable.
   */
  operation?: V2LogEntryOperation;
  /**
   * The log entry payload, represented as a protocol buffer that is expressed
   * as a JSON object. The only accepted type currently is AuditLog.
   */
  protoPayload?: {
    [key: string]: any
  };
  /**
   * The severity of the log entry. The default value is `LogSeverity.DEFAULT`.
   */
  severity?:  | "DEFAULT" | "DEBUG" | "INFO" | "NOTICE" | "WARNING" | "ERROR" | "CRITICAL" | "ALERT" | "EMERGENCY";
  /**
   * Optional. Source code location information associated with the log entry,
   * if any.
   */
  sourceLocation?: V2LogEntrySourceLocation;
  /**
   * The log entry payload, represented as a structure that is expressed as a
   * JSON object.
   */
  structPayload?: {
    [key: string]: any
  };
  /**
   * The log entry payload, represented as a Unicode string (UTF-8).
   */
  textPayload?: string;
  /**
   * The time the event described by the log entry occurred. If omitted,
   * defaults to operation start time.
   */
  timestamp?: Date;
  /**
   * Optional. Resource name of the trace associated with the log entry, if
   * any. If this field contains a relative resource name, you can assume the
   * name is relative to `//tracing.googleapis.com`. Example:
   * `projects/my-projectid/traces/06796866738c859f2f19b7cfb3214824`
   */
  trace?: string;
}

function serializeV2LogEntry(data: any): V2LogEntry {
  return {
    ...data,
    httpRequest: data["httpRequest"] !== undefined ? serializeV2HttpRequest(data["httpRequest"]) : undefined,
    sourceLocation: data["sourceLocation"] !== undefined ? serializeV2LogEntrySourceLocation(data["sourceLocation"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? data["timestamp"].toISOString() : undefined,
  };
}

function deserializeV2LogEntry(data: any): V2LogEntry {
  return {
    ...data,
    httpRequest: data["httpRequest"] !== undefined ? deserializeV2HttpRequest(data["httpRequest"]) : undefined,
    sourceLocation: data["sourceLocation"] !== undefined ? deserializeV2LogEntrySourceLocation(data["sourceLocation"]) : undefined,
    timestamp: data["timestamp"] !== undefined ? new Date(data["timestamp"]) : undefined,
  };
}

/**
 * Additional information about a potentially long-running operation with which
 * a log entry is associated.
 */
export interface V2LogEntryOperation {
  /**
   * Optional. Set this to True if this is the first log entry in the
   * operation.
   */
  first?: boolean;
  /**
   * Optional. An arbitrary operation identifier. Log entries with the same
   * identifier are assumed to be part of the same operation.
   */
  id?: string;
  /**
   * Optional. Set this to True if this is the last log entry in the operation.
   */
  last?: boolean;
  /**
   * Optional. An arbitrary producer identifier. The combination of `id` and
   * `producer` must be globally unique. Examples for `producer`:
   * `"MyDivision.MyBigCompany.com"`, `"github.com/MyProject/MyApplication"`.
   */
  producer?: string;
}

/**
 * Additional information about the source code location that produced the log
 * entry.
 */
export interface V2LogEntrySourceLocation {
  /**
   * Optional. Source file name. Depending on the runtime environment, this
   * might be a simple name or a fully-qualified name.
   */
  file?: string;
  /**
   * Optional. Human-readable name of the function or method being invoked,
   * with optional context such as the class or package name. This information
   * may be used in contexts such as the logs viewer, where a file and line
   * number are less meaningful. The format can vary by language. For example:
   * `qual.if.ied.Class.method` (Java), `dir/package.func` (Go), `function`
   * (Python).
   */
  function?: string;
  /**
   * Optional. Line within the source file. 1-based; 0 indicates no line number
   * available.
   */
  line?: bigint;
}

function serializeV2LogEntrySourceLocation(data: any): V2LogEntrySourceLocation {
  return {
    ...data,
    line: data["line"] !== undefined ? String(data["line"]) : undefined,
  };
}

function deserializeV2LogEntrySourceLocation(data: any): V2LogEntrySourceLocation {
  return {
    ...data,
    line: data["line"] !== undefined ? BigInt(data["line"]) : undefined,
  };
}

/**
 * Provides information about the Policy violation info for this request.
 */
export interface ViolationInfo {
  /**
   * Optional. Value that is being checked for the policy. This could be in
   * encrypted form (if pii sensitive). This field will only be emitted in
   * LIST_POLICY types
   */
  checkedValue?: string;
  /**
   * Optional. Constraint name
   */
  constraint?: string;
  /**
   * Optional. Error message that policy is indicating.
   */
  errorMessage?: string;
  /**
   * Optional. Indicates the type of the policy.
   */
  policyType?:  | "POLICY_TYPE_UNSPECIFIED" | "BOOLEAN_CONSTRAINT" | "LIST_CONSTRAINT" | "CUSTOM_CONSTRAINT";
}