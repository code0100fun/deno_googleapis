// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Service Management API Client for Deno
 * ======================================
 * 
 * Google Service Management allows service producers to publish their services on Google Cloud Platform so that they can be discovered and used by service consumers.
 * 
 * Docs: https://cloud.google.com/service-management/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Google Service Management allows service producers to publish their services
 * on Google Cloud Platform so that they can be discovered and used by service
 * consumers.
 */
export class ServiceManagement {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://servicemanagement.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async operationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists service operations that match the specified filter in the request.
   *
   */
  async operationsList(opts: OperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/operations`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
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
   * Creates a new service configuration (version) for a managed service. This
   * method only stores the service configuration. To roll out the service
   * configuration to backend systems please call CreateServiceRollout. Only the
   * 100 most recent service configurations and ones referenced by existing
   * rollouts are kept for each service. The rest will be deleted eventually.
   *
   * @param serviceName Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`.
   */
  async servicesConfigsCreate(serviceName: string, req: Service): Promise<Service> {
    req = serializeService(req);
    const url = new URL(`${this.#baseUrl}v1/services/${ serviceName }/configs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeService(data);
  }

  /**
   * Gets a service configuration (version) for a managed service.
   *
   * @param configId Required. The id of the service configuration resource. This field must be specified for the server to return all fields, including `SourceInfo`.
   * @param serviceName Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`.
   */
  async servicesConfigsGet(configId: string, serviceName: string, opts: ServicesConfigsGetOptions = {}): Promise<Service> {
    const url = new URL(`${this.#baseUrl}v1/services/${ serviceName }/configs/${ configId }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeService(data);
  }

  /**
   * Lists the history of the service configuration for a managed service, from
   * the newest to the oldest.
   *
   * @param serviceName Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`.
   */
  async servicesConfigsList(serviceName: string, opts: ServicesConfigsListOptions = {}): Promise<ListServiceConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/services/${ serviceName }/configs`);
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
    return deserializeListServiceConfigsResponse(data);
  }

  /**
   * Creates a new service configuration (version) for a managed service based
   * on user-supplied configuration source files (for example: OpenAPI
   * Specification). This method stores the source configurations as well as the
   * generated service configuration. To rollout the service configuration to
   * other services, please call CreateServiceRollout. Only the 100 most recent
   * configuration sources and ones referenced by existing service configurtions
   * are kept for each service. The rest will be deleted eventually. Operation
   *
   * @param serviceName Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`.
   */
  async servicesConfigsSubmit(serviceName: string, req: SubmitConfigSourceRequest): Promise<Operation> {
    req = serializeSubmitConfigSourceRequest(req);
    const url = new URL(`${this.#baseUrl}v1/services/${ serviceName }/configs:submit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async servicesConsumersGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async servicesConsumersSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
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
  async servicesConsumersTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Creates a new managed service. A managed service is immutable, and is
   * subject to mandatory 30-day data retention. You cannot move a service or
   * recreate it within 30 days after deletion. One producer project can own no
   * more than 500 services. For security and reliability purposes, a production
   * service should be hosted in a dedicated producer project. Operation
   *
   */
  async servicesCreate(req: ManagedService): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/services`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a managed service. This method will change the service to the
   * `Soft-Delete` state for 30 days. Within this period, service producers may
   * call UndeleteService to restore the service. After 30 days, the service
   * will be permanently deleted. Operation
   *
   * @param serviceName Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`.
   */
  async servicesDelete(serviceName: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/services/${ serviceName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Generates and returns a report (errors, warnings and changes from existing
   * configurations) associated with GenerateConfigReportRequest.new_value If
   * GenerateConfigReportRequest.old_value is specified,
   * GenerateConfigReportRequest will contain a single ChangeReport based on the
   * comparison between GenerateConfigReportRequest.new_value and
   * GenerateConfigReportRequest.old_value. If
   * GenerateConfigReportRequest.old_value is not specified, this method will
   * compare GenerateConfigReportRequest.new_value with the last pushed service
   * configuration.
   *
   */
  async servicesGenerateConfigReport(req: GenerateConfigReportRequest): Promise<GenerateConfigReportResponse> {
    const url = new URL(`${this.#baseUrl}v1/services:generateConfigReport`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GenerateConfigReportResponse;
  }

  /**
   * Gets a managed service. Authentication is required unless the service is
   * public.
   *
   * @param serviceName Required. The name of the service. See the `ServiceManager` overview for naming requirements. For example: `example.googleapis.com`.
   */
  async servicesGet(serviceName: string): Promise<ManagedService> {
    const url = new URL(`${this.#baseUrl}v1/services/${ serviceName }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ManagedService;
  }

  /**
   * Gets a service configuration (version) for a managed service.
   *
   * @param serviceName Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`.
   */
  async servicesGetConfig(serviceName: string, opts: ServicesGetConfigOptions = {}): Promise<Service> {
    const url = new URL(`${this.#baseUrl}v1/services/${ serviceName }/config`);
    if (opts.configId !== undefined) {
      url.searchParams.append("configId", String(opts.configId));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeService(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async servicesGetIamPolicy(resource: string, req: GetIamPolicyRequest): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Lists managed services. Returns all public services. For authenticated
   * users, also returns all services the calling user has
   * "servicemanagement.services.get" permission for.
   *
   */
  async servicesList(opts: ServicesListOptions = {}): Promise<ListServicesResponse> {
    const url = new URL(`${this.#baseUrl}v1/services`);
    if (opts.consumerId !== undefined) {
      url.searchParams.append("consumerId", String(opts.consumerId));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.producerProjectId !== undefined) {
      url.searchParams.append("producerProjectId", String(opts.producerProjectId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListServicesResponse;
  }

  /**
   * Creates a new service configuration rollout. Based on rollout, the Google
   * Service Management will roll out the service configurations to different
   * backend services. For example, the logging configuration will be pushed to
   * Google Cloud Logging. Please note that any previous pending and running
   * Rollouts and associated Operations will be automatically cancelled so that
   * the latest Rollout will not be blocked by previous Rollouts. Only the 100
   * most recent (in any state) and the last 10 successful (if not already part
   * of the set of 100 most recent) rollouts are kept for each service. The rest
   * will be deleted eventually. Operation
   *
   * @param serviceName Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`.
   */
  async servicesRolloutsCreate(serviceName: string, req: Rollout): Promise<Operation> {
    req = serializeRollout(req);
    const url = new URL(`${this.#baseUrl}v1/services/${ serviceName }/rollouts`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets a service configuration rollout.
   *
   * @param rolloutId Required. The id of the rollout resource.
   * @param serviceName Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`.
   */
  async servicesRolloutsGet(rolloutId: string, serviceName: string): Promise<Rollout> {
    const url = new URL(`${this.#baseUrl}v1/services/${ serviceName }/rollouts/${ rolloutId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRollout(data);
  }

  /**
   * Lists the history of the service configuration rollouts for a managed
   * service, from the newest to the oldest.
   *
   * @param serviceName Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`.
   */
  async servicesRolloutsList(serviceName: string, opts: ServicesRolloutsListOptions = {}): Promise<ListServiceRolloutsResponse> {
    const url = new URL(`${this.#baseUrl}v1/services/${ serviceName }/rollouts`);
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
    return deserializeListServiceRolloutsResponse(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async servicesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
    req = serializeSetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
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
  async servicesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }

  /**
   * Revives a previously deleted managed service. The method restores the
   * service using the configuration at the time the service was deleted. The
   * target service must exist and must have been deleted within the last 30
   * days. Operation
   *
   * @param serviceName Required. The name of the service. See the [overview](https://cloud.google.com/service-management/overview) for naming requirements. For example: `example.googleapis.com`.
   */
  async servicesUndelete(serviceName: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/services/${ serviceName }:undelete`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as Operation;
  }
}

/**
 * Generated advice about this change, used for providing more information
 * about how a change will affect the existing service.
 */
export interface Advice {
  /**
   * Useful description for why this advice was applied and what actions should
   * be taken to mitigate any implied risks.
   */
  description?: string;
}

/**
 * Api is a light-weight descriptor for an API Interface. Interfaces are also
 * described as "protocol buffer services" in some contexts, such as by the
 * "service" keyword in a .proto file, but they are different from API Services,
 * which represent a concrete implementation of an interface as opposed to
 * simply a description of methods and bindings. They are also sometimes simply
 * referred to as "APIs" in other contexts, such as the name of this message
 * itself. See https://cloud.google.com/apis/design/glossary for detailed
 * terminology.
 */
export interface Api {
  /**
   * The methods of this interface, in unspecified order.
   */
  methods?: Method[];
  /**
   * Included interfaces. See Mixin.
   */
  mixins?: Mixin[];
  /**
   * The fully qualified name of this interface, including package name
   * followed by the interface's simple name.
   */
  name?: string;
  /**
   * Any metadata attached to the interface.
   */
  options?: Option[];
  /**
   * Source context for the protocol buffer service represented by this
   * message.
   */
  sourceContext?: SourceContext;
  /**
   * The source syntax of the service.
   */
  syntax?:  | "SYNTAX_PROTO2" | "SYNTAX_PROTO3";
  /**
   * A version string for this interface. If specified, must have the form
   * `major-version.minor-version`, as in `1.10`. If the minor version is
   * omitted, it defaults to zero. If the entire version field is empty, the
   * major version is derived from the package name, as outlined below. If the
   * field is not empty, the version in the package name will be verified to be
   * consistent with what is provided here. The versioning schema uses [semantic
   * versioning](http://semver.org) where the major version number indicates a
   * breaking change and the minor version an additive, non-breaking change.
   * Both version numbers are signals to users what to expect from different
   * versions, and should be carefully chosen based on the product plan. The
   * major version is also reflected in the package name of the interface, which
   * must end in `v`, as in `google.feature.v1`. For major versions 0 and 1, the
   * suffix can be omitted. Zero major versions must only be used for
   * experimental, non-GA interfaces.
   */
  version?: string;
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
 * `Authentication` defines the authentication configuration for API methods
 * provided by an API service. Example: name: calendar.googleapis.com
 * authentication: providers: - id: google_calendar_auth jwks_uri:
 * https://www.googleapis.com/oauth2/v1/certs issuer:
 * https://securetoken.google.com rules: - selector: "*" requirements:
 * provider_id: google_calendar_auth - selector: google.calendar.Delegate oauth:
 * canonical_scopes: https://www.googleapis.com/auth/calendar.read
 */
export interface Authentication {
  /**
   * Defines a set of authentication providers that a service supports.
   */
  providers?: AuthProvider[];
  /**
   * A list of authentication rules that apply to individual API methods.
   * **NOTE:** All service configuration rules follow "last one wins" order.
   */
  rules?: AuthenticationRule[];
}

/**
 * Authentication rules for the service. By default, if a method has any
 * authentication requirements, every request must include a valid credential
 * matching one of the requirements. It's an error to include more than one kind
 * of credential in a single request. If a method doesn't have any auth
 * requirements, request credentials will be ignored.
 */
export interface AuthenticationRule {
  /**
   * If true, the service accepts API keys without any other credential. This
   * flag only applies to HTTP and gRPC requests.
   */
  allowWithoutCredential?: boolean;
  /**
   * The requirements for OAuth credentials.
   */
  oauth?: OAuthRequirements;
  /**
   * Requirements for additional authentication providers.
   */
  requirements?: AuthRequirement[];
  /**
   * Selects the methods to which this rule applies. Refer to selector for
   * syntax details.
   */
  selector?: string;
}

/**
 * Configuration for an authentication provider, including support for [JSON
 * Web Token
 * (JWT)](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32).
 */
export interface AuthProvider {
  /**
   * The list of JWT
   * [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3).
   * that are allowed to access. A JWT containing any of these audiences will be
   * accepted. When this setting is absent, JWTs with audiences: -
   * "https://[service.name]/[google.protobuf.Api.name]" -
   * "https://[service.name]/" will be accepted. For example, if no audiences
   * are in the setting, LibraryService API will accept JWTs with the following
   * audiences: -
   * https://library-example.googleapis.com/google.example.library.v1.LibraryService
   * - https://library-example.googleapis.com/ Example: audiences:
   * bookstore_android.apps.googleusercontent.com,
   * bookstore_web.apps.googleusercontent.com
   */
  audiences?: string;
  /**
   * Redirect URL if JWT token is required but not present or is expired.
   * Implement authorizationUrl of securityDefinitions in OpenAPI spec.
   */
  authorizationUrl?: string;
  /**
   * The unique identifier of the auth provider. It will be referred to by
   * `AuthRequirement.provider_id`. Example: "bookstore_auth".
   */
  id?: string;
  /**
   * Identifies the principal that issued the JWT. See
   * https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.1
   * Usually a URL or an email address. Example: https://securetoken.google.com
   * Example: 1234567-compute@developer.gserviceaccount.com
   */
  issuer?: string;
  /**
   * URL of the provider's public key set to validate signature of the JWT. See
   * [OpenID
   * Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   * Optional if the key set document: - can be retrieved from [OpenID
   * Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) of
   * the issuer. - can be inferred from the email domain of the issuer (e.g. a
   * Google service account). Example:
   * https://www.googleapis.com/oauth2/v1/certs
   */
  jwksUri?: string;
  /**
   * Defines the locations to extract the JWT. For now it is only used by the
   * Cloud Endpoints to store the OpenAPI extension [x-google-jwt-locations]
   * (https://cloud.google.com/endpoints/docs/openapi/openapi-extensions#x-google-jwt-locations)
   * JWT locations can be one of HTTP headers, URL query parameters or cookies.
   * The rule is that the first match wins. If not specified, default to use
   * following 3 locations: 1) Authorization: Bearer 2) x-goog-iap-jwt-assertion
   * 3) access_token query parameter Default locations can be specified as
   * followings: jwt_locations: - header: Authorization value_prefix: "Bearer "
   * - header: x-goog-iap-jwt-assertion - query: access_token
   */
  jwtLocations?: JwtLocation[];
}

/**
 * User-defined authentication requirements, including support for [JSON Web
 * Token (JWT)](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32).
 */
export interface AuthRequirement {
  /**
   * NOTE: This will be deprecated soon, once AuthProvider.audiences is
   * implemented and accepted in all the runtime components. The list of JWT
   * [audiences](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3).
   * that are allowed to access. A JWT containing any of these audiences will be
   * accepted. When this setting is absent, only JWTs with audience
   * "https://Service_name/API_name" will be accepted. For example, if no
   * audiences are in the setting, LibraryService API will only accept JWTs with
   * the following audience
   * "https://library-example.googleapis.com/google.example.library.v1.LibraryService".
   * Example: audiences: bookstore_android.apps.googleusercontent.com,
   * bookstore_web.apps.googleusercontent.com
   */
  audiences?: string;
  /**
   * id from authentication provider. Example: provider_id: bookstore_auth
   */
  providerId?: string;
}

/**
 * `Backend` defines the backend configuration for a service.
 */
export interface Backend {
  /**
   * A list of API backend rules that apply to individual API methods.
   * **NOTE:** All service configuration rules follow "last one wins" order.
   */
  rules?: BackendRule[];
}

/**
 * A backend rule provides configuration for an individual API element.
 */
export interface BackendRule {
  /**
   * The address of the API backend. The scheme is used to determine the
   * backend protocol and security. The following schemes are accepted: SCHEME
   * PROTOCOL SECURITY http:// HTTP None https:// HTTP TLS grpc:// gRPC None
   * grpcs:// gRPC TLS It is recommended to explicitly include a scheme. Leaving
   * out the scheme may cause constrasting behaviors across platforms. If the
   * port is unspecified, the default is: - 80 for schemes without TLS - 443 for
   * schemes with TLS For HTTP backends, use protocol to specify the protocol
   * version.
   */
  address?: string;
  /**
   * The number of seconds to wait for a response from a request. The default
   * varies based on the request protocol and deployment environment.
   */
  deadline?: number;
  /**
   * When disable_auth is true, a JWT ID token won't be generated and the
   * original "Authorization" HTTP header will be preserved. If the header is
   * used to carry the original token and is expected by the backend, this field
   * must be set to true to preserve the header.
   */
  disableAuth?: boolean;
  /**
   * The JWT audience is used when generating a JWT ID token for the backend.
   * This ID token will be added in the HTTP "authorization" header, and sent to
   * the backend.
   */
  jwtAudience?: string;
  /**
   * Deprecated, do not use.
   */
  minDeadline?: number;
  /**
   * The number of seconds to wait for the completion of a long running
   * operation. The default is no deadline.
   */
  operationDeadline?: number;
  /**
   * The map between request protocol and the backend address.
   */
  overridesByRequestProtocol?: {
    [key: string]: BackendRule
  };
  pathTranslation?:  | "PATH_TRANSLATION_UNSPECIFIED" | "CONSTANT_ADDRESS" | "APPEND_PATH_TO_ADDRESS";
  /**
   * The protocol used for sending a request to the backend. The supported
   * values are "http/1.1" and "h2". The default value is inferred from the
   * scheme in the address field: SCHEME PROTOCOL http:// http/1.1 https://
   * http/1.1 grpc:// h2 grpcs:// h2 For secure HTTP backends (https://) that
   * support HTTP/2, set this field to "h2" for improved performance.
   * Configuring this field to non-default values is only supported for secure
   * HTTP backends. This field will be ignored for all other backends. See
   * https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids
   * for more details on the supported values.
   */
  protocol?: string;
  /**
   * Selects the methods to which this rule applies. Refer to selector for
   * syntax details.
   */
  selector?: string;
}

/**
 * Billing related configuration of the service. The following example shows
 * how to configure monitored resources and metrics for billing,
 * `consumer_destinations` is the only supported destination and the monitored
 * resources need at least one label key `cloud.googleapis.com/location` to
 * indicate the location of the billing usage, using different monitored
 * resources between monitoring and billing is recommended so they can be
 * evolved independently: monitored_resources: - type:
 * library.googleapis.com/billing_branch labels: - key:
 * cloud.googleapis.com/location description: | Predefined label to support
 * billing location restriction. - key: city description: | Custom label to
 * define the city where the library branch is located in. - key: name
 * description: Custom label to define the name of the library branch. metrics:
 * - name: library.googleapis.com/book/borrowed_count metric_kind: DELTA
 * value_type: INT64 unit: "1" billing: consumer_destinations: -
 * monitored_resource: library.googleapis.com/billing_branch metrics: -
 * library.googleapis.com/book/borrowed_count
 */
export interface Billing {
  /**
   * Billing configurations for sending metrics to the consumer project. There
   * can be multiple consumer destinations per service, each one must have a
   * different monitored resource type. A metric can be used in at most one
   * consumer destination.
   */
  consumerDestinations?: BillingDestination[];
}

/**
 * Configuration of a specific billing destination (Currently only support bill
 * against consumer project).
 */
export interface BillingDestination {
  /**
   * Names of the metrics to report to this billing destination. Each name must
   * be defined in Service.metrics section.
   */
  metrics?: string[];
  /**
   * The monitored resource type. The type must be defined in
   * Service.monitored_resources section.
   */
  monitoredResource?: string;
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
 * Change report associated with a particular service configuration. It
 * contains a list of ConfigChanges based on the comparison between two service
 * configurations.
 */
export interface ChangeReport {
  /**
   * List of changes between two service configurations. The changes will be
   * alphabetically sorted based on the identifier of each change. A
   * ConfigChange identifier is a dot separated path to the configuration.
   * Example: visibility.rules[selector='LibraryService.CreateBook'].restriction
   */
  configChanges?: ConfigChange[];
}

/**
 * Details about how and where to publish client libraries.
 */
export interface ClientLibrarySettings {
  /**
   * Settings for C++ client libraries.
   */
  cppSettings?: CppSettings;
  /**
   * Settings for .NET client libraries.
   */
  dotnetSettings?: DotnetSettings;
  /**
   * Settings for Go client libraries.
   */
  goSettings?: GoSettings;
  /**
   * Settings for legacy Java features, supported in the Service YAML.
   */
  javaSettings?: JavaSettings;
  /**
   * Launch stage of this version of the API.
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * Settings for Node client libraries.
   */
  nodeSettings?: NodeSettings;
  /**
   * Settings for PHP client libraries.
   */
  phpSettings?: PhpSettings;
  /**
   * Settings for Python client libraries.
   */
  pythonSettings?: PythonSettings;
  /**
   * When using transport=rest, the client request will encode enums as numbers
   * rather than strings.
   */
  restNumericEnums?: boolean;
  /**
   * Settings for Ruby client libraries.
   */
  rubySettings?: RubySettings;
  /**
   * Version of the API to apply these settings to.
   */
  version?: string;
}

/**
 * Required information for every language.
 */
export interface CommonLanguageSettings {
  /**
   * The destination where API teams want this client library to be published.
   */
  destinations?:  | "CLIENT_LIBRARY_DESTINATION_UNSPECIFIED" | "GITHUB" | "PACKAGE_MANAGER"[];
  /**
   * Link to automatically generated reference documentation. Example:
   * https://cloud.google.com/nodejs/docs/reference/asset/latest
   */
  referenceDocsUri?: string;
}

/**
 * Output generated from semantically comparing two versions of a service
 * configuration. Includes detailed information about a field that have changed
 * with applicable advice about potential consequences for the change, such as
 * backwards-incompatibility.
 */
export interface ConfigChange {
  /**
   * Collection of advice provided for this change, useful for determining the
   * possible impact of this change.
   */
  advices?: Advice[];
  /**
   * The type for this change, either ADDED, REMOVED, or MODIFIED.
   */
  changeType?:  | "CHANGE_TYPE_UNSPECIFIED" | "ADDED" | "REMOVED" | "MODIFIED";
  /**
   * Object hierarchy path to the change, with levels separated by a '.'
   * character. For repeated fields, an applicable unique identifier field is
   * used for the index (usually selector, name, or id). For maps, the term
   * 'key' is used. If the field has no unique identifier, the numeric index is
   * used. Examples: -
   * visibility.rules[selector=="google.LibraryService.ListBooks"].restriction -
   * quota.metric_rules[selector=="google"].metric_costs[key=="reads"].value -
   * logging.producer_destinations[0]
   */
  element?: string;
  /**
   * Value of the changed object in the new Service configuration, in JSON
   * format. This field will not be populated if ChangeType == REMOVED.
   */
  newValue?: string;
  /**
   * Value of the changed object in the old Service configuration, in JSON
   * format. This field will not be populated if ChangeType == ADDED.
   */
  oldValue?: string;
}

/**
 * Generic specification of a source configuration file
 */
export interface ConfigFile {
  /**
   * The bytes that constitute the file.
   */
  fileContents?: Uint8Array;
  /**
   * The file name of the configuration file (full or relative path).
   */
  filePath?: string;
  /**
   * The type of configuration file this represents.
   */
  fileType?:  | "FILE_TYPE_UNSPECIFIED" | "SERVICE_CONFIG_YAML" | "OPEN_API_JSON" | "OPEN_API_YAML" | "FILE_DESCRIPTOR_SET_PROTO" | "PROTO_FILE";
}

function serializeConfigFile(data: any): ConfigFile {
  return {
    ...data,
    fileContents: data["fileContents"] !== undefined ? encodeBase64(data["fileContents"]) : undefined,
  };
}

function deserializeConfigFile(data: any): ConfigFile {
  return {
    ...data,
    fileContents: data["fileContents"] !== undefined ? decodeBase64(data["fileContents"] as string) : undefined,
  };
}

/**
 * Represents a service configuration with its name and id.
 */
export interface ConfigRef {
  /**
   * Resource name of a service config. It must have the following format:
   * "services/{service name}/configs/{config id}".
   */
  name?: string;
}

/**
 * Represents a source file which is used to generate the service configuration
 * defined by `google.api.Service`.
 */
export interface ConfigSource {
  /**
   * Set of source configuration files that are used to generate a service
   * configuration (`google.api.Service`).
   */
  files?: ConfigFile[];
  /**
   * A unique ID for a specific instance of this message, typically assigned by
   * the client for tracking purpose. If empty, the server may choose to
   * generate one instead.
   */
  id?: string;
}

function serializeConfigSource(data: any): ConfigSource {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (serializeConfigFile(item))) : undefined,
  };
}

function deserializeConfigSource(data: any): ConfigSource {
  return {
    ...data,
    files: data["files"] !== undefined ? data["files"].map((item: any) => (deserializeConfigFile(item))) : undefined,
  };
}

/**
 * `Context` defines which contexts an API requests. Example: context: rules: -
 * selector: "*" requested: - google.rpc.context.ProjectContext -
 * google.rpc.context.OriginContext The above specifies that all methods in the
 * API request `google.rpc.context.ProjectContext` and
 * `google.rpc.context.OriginContext`. Available context types are defined in
 * package `google.rpc.context`. This also provides mechanism to allowlist any
 * protobuf message extension that can be sent in grpc metadata using
 * “x-goog-ext--bin” and “x-goog-ext--jspb” format. For example, list any
 * service specific protobuf types that can appear in grpc metadata as follows
 * in your yaml file: Example: context: rules: - selector:
 * "google.example.library.v1.LibraryService.CreateBook"
 * allowed_request_extensions: - google.foo.v1.NewExtension
 * allowed_response_extensions: - google.foo.v1.NewExtension You can also
 * specify extension ID instead of fully qualified extension name here.
 */
export interface Context {
  /**
   * A list of RPC context rules that apply to individual API methods.
   * **NOTE:** All service configuration rules follow "last one wins" order.
   */
  rules?: ContextRule[];
}

/**
 * A context rule provides information about the context for an individual API
 * element.
 */
export interface ContextRule {
  /**
   * A list of full type names or extension IDs of extensions allowed in grpc
   * side channel from client to backend.
   */
  allowedRequestExtensions?: string[];
  /**
   * A list of full type names or extension IDs of extensions allowed in grpc
   * side channel from backend to client.
   */
  allowedResponseExtensions?: string[];
  /**
   * A list of full type names of provided contexts.
   */
  provided?: string[];
  /**
   * A list of full type names of requested contexts.
   */
  requested?: string[];
  /**
   * Selects the methods to which this rule applies. Refer to selector for
   * syntax details.
   */
  selector?: string;
}

/**
 * Selects and configures the service controller used by the service. Example:
 * control: environment: servicecontrol.googleapis.com
 */
export interface Control {
  /**
   * The service controller environment to use. If empty, no control plane
   * feature (like quota and billing) will be enabled. The recommended value for
   * most services is servicecontrol.googleapis.com
   */
  environment?: string;
}

/**
 * Settings for C++ client libraries.
 */
export interface CppSettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
}

/**
 * Customize service error responses. For example, list any service specific
 * protobuf types that can appear in error detail lists of error responses.
 * Example: custom_error: types: - google.foo.v1.CustomError -
 * google.foo.v1.AnotherError
 */
export interface CustomError {
  /**
   * The list of custom error rules that apply to individual API messages.
   * **NOTE:** All service configuration rules follow "last one wins" order.
   */
  rules?: CustomErrorRule[];
  /**
   * The list of custom error detail types, e.g. 'google.foo.v1.CustomError'.
   */
  types?: string[];
}

/**
 * A custom error rule.
 */
export interface CustomErrorRule {
  /**
   * Mark this message as possible payload in error response. Otherwise,
   * objects of this type will be filtered when they appear in error payload.
   */
  isErrorType?: boolean;
  /**
   * Selects messages to which this rule applies. Refer to selector for syntax
   * details.
   */
  selector?: string;
}

/**
 * A custom pattern is used for defining custom HTTP verb.
 */
export interface CustomHttpPattern {
  /**
   * The name of this custom HTTP verb.
   */
  kind?: string;
  /**
   * The path matched by this custom verb.
   */
  path?: string;
}

/**
 * Strategy used to delete a service. This strategy is a placeholder only used
 * by the system generated rollout to delete a service.
 */
export interface DeleteServiceStrategy {
}

/**
 * Represents a diagnostic message (error or warning)
 */
export interface Diagnostic {
  /**
   * The kind of diagnostic information provided.
   */
  kind?:  | "WARNING" | "ERROR";
  /**
   * File name and line number of the error or warning.
   */
  location?: string;
  /**
   * Message describing the error or warning.
   */
  message?: string;
}

/**
 * `Documentation` provides the information for describing a service. Example:
 * documentation: summary: > The Google Calendar API gives access to most
 * calendar features. pages: - name: Overview content: (== include
 * google/foo/overview.md ==) - name: Tutorial content: (== include
 * google/foo/tutorial.md ==) subpages; - name: Java content: (== include
 * google/foo/tutorial_java.md ==) rules: - selector:
 * google.calendar.Calendar.Get description: > ... - selector:
 * google.calendar.Calendar.Put description: > ... Documentation is provided in
 * markdown syntax. In addition to standard markdown features, definition lists,
 * tables and fenced code blocks are supported. Section headers can be provided
 * and are interpreted relative to the section nesting of the context where a
 * documentation fragment is embedded. Documentation from the IDL is merged with
 * documentation defined via the config at normalization time, where
 * documentation provided by config rules overrides IDL provided. A number of
 * constructs specific to the API platform are supported in documentation text.
 * In order to reference a proto element, the following notation can be used:
 * [fully.qualified.proto.name][] To override the display text used for the
 * link, this can be used: [display text][fully.qualified.proto.name] Text can
 * be excluded from doc using the following notation: (-- internal comment --) A
 * few directives are available in documentation. Note that directives must
 * appear on a single line to be properly identified. The `include` directive
 * includes a markdown file from an external source: (== include path/to/file
 * ==) The `resource_for` directive marks a message to be the resource of a
 * collection in REST view. If it is not specified, tools attempt to infer the
 * resource from the operations in a collection: (== resource_for
 * v1.shelves.books ==) The directive `suppress_warning` does not directly
 * affect documentation and is documented together with service config
 * validation.
 */
export interface Documentation {
  /**
   * The URL to the root of documentation.
   */
  documentationRootUrl?: string;
  /**
   * Declares a single overview page. For example: documentation: summary: ...
   * overview: (== include overview.md ==) This is a shortcut for the following
   * declaration (using pages style): documentation: summary: ... pages: - name:
   * Overview content: (== include overview.md ==) Note: you cannot specify both
   * `overview` field and `pages` field.
   */
  overview?: string;
  /**
   * The top level pages for the documentation set.
   */
  pages?: Page[];
  /**
   * A list of documentation rules that apply to individual API elements.
   * **NOTE:** All service configuration rules follow "last one wins" order.
   */
  rules?: DocumentationRule[];
  /**
   * Specifies the service root url if the default one (the service name from
   * the yaml file) is not suitable. This can be seen in any fully specified
   * service urls as well as sections that show a base that other urls are
   * relative to.
   */
  serviceRootUrl?: string;
  /**
   * A short description of what the service does. The summary must be plain
   * text. It becomes the overview of the service displayed in Google Cloud
   * Console. NOTE: This field is equivalent to the standard field
   * `description`.
   */
  summary?: string;
}

/**
 * A documentation rule provides information about individual API elements.
 */
export interface DocumentationRule {
  /**
   * Deprecation description of the selected element(s). It can be provided if
   * an element is marked as `deprecated`.
   */
  deprecationDescription?: string;
  /**
   * Description of the selected proto element (e.g. a message, a method, a
   * 'service' definition, or a field). Defaults to leading & trailing comments
   * taken from the proto source definition of the proto element.
   */
  description?: string;
  /**
   * The selector is a comma-separated list of patterns for any element such as
   * a method, a field, an enum value. Each pattern is a qualified name of the
   * element which may end in "*", indicating a wildcard. Wildcards are only
   * allowed at the end and for a whole component of the qualified name, i.e.
   * "foo.*" is ok, but not "foo.b*" or "foo.*.bar". A wildcard will match one
   * or more components. To specify a default for all applicable elements, the
   * whole pattern "*" is used.
   */
  selector?: string;
}

/**
 * Settings for Dotnet client libraries.
 */
export interface DotnetSettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
}

/**
 * Operation payload for EnableService method.
 */
export interface EnableServiceResponse {
}

/**
 * `Endpoint` describes a network address of a service that serves a set of
 * APIs. It is commonly known as a service endpoint. A service may expose any
 * number of service endpoints, and all service endpoints share the same service
 * definition, such as quota limits and monitoring metrics. Example: type:
 * google.api.Service name: library-example.googleapis.com endpoints: # Declares
 * network address `https://library-example.googleapis.com` # for service
 * `library-example.googleapis.com`. The `https` scheme # is implicit for all
 * service endpoints. Other schemes may be # supported in the future. - name:
 * library-example.googleapis.com allow_cors: false - name:
 * content-staging-library-example.googleapis.com # Allows HTTP OPTIONS calls to
 * be passed to the API frontend, for it # to decide whether the subsequent
 * cross-origin request is allowed # to proceed. allow_cors: true
 */
export interface Endpoint {
  /**
   * Unimplemented. Dot not use. DEPRECATED: This field is no longer supported.
   * Instead of using aliases, please specify multiple google.api.Endpoint for
   * each of the intended aliases. Additional names that this endpoint will be
   * hosted on.
   */
  aliases?: string[];
  /**
   * Allowing
   * [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), aka
   * cross-domain traffic, would allow the backends served from this endpoint to
   * receive and respond to HTTP OPTIONS requests. The response will be used by
   * the browser to determine whether the subsequent cross-origin request is
   * allowed to proceed.
   */
  allowCors?: boolean;
  /**
   * The canonical name of this endpoint.
   */
  name?: string;
  /**
   * The specification of an Internet routable address of API frontend that
   * will handle requests to this [API
   * Endpoint](https://cloud.google.com/apis/design/glossary). It should be
   * either a valid IPv4 address or a fully-qualified domain name. For example,
   * "8.8.8.8" or "myservice.appspot.com".
   */
  target?: string;
}

/**
 * Enum type definition.
 */
export interface Enum {
  /**
   * Enum value definitions.
   */
  enumvalue?: EnumValue[];
  /**
   * Enum type name.
   */
  name?: string;
  /**
   * Protocol buffer options.
   */
  options?: Option[];
  /**
   * The source context.
   */
  sourceContext?: SourceContext;
  /**
   * The source syntax.
   */
  syntax?:  | "SYNTAX_PROTO2" | "SYNTAX_PROTO3";
}

/**
 * Enum value definition.
 */
export interface EnumValue {
  /**
   * Enum value name.
   */
  name?: string;
  /**
   * Enum value number.
   */
  number?: number;
  /**
   * Protocol buffer options.
   */
  options?: Option[];
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
 * A single field of a message type.
 */
export interface Field {
  /**
   * The field cardinality.
   */
  cardinality?:  | "CARDINALITY_UNKNOWN" | "CARDINALITY_OPTIONAL" | "CARDINALITY_REQUIRED" | "CARDINALITY_REPEATED";
  /**
   * The string value of the default value of this field. Proto2 syntax only.
   */
  defaultValue?: string;
  /**
   * The field JSON name.
   */
  jsonName?: string;
  /**
   * The field type.
   */
  kind?:  | "TYPE_UNKNOWN" | "TYPE_DOUBLE" | "TYPE_FLOAT" | "TYPE_INT64" | "TYPE_UINT64" | "TYPE_INT32" | "TYPE_FIXED64" | "TYPE_FIXED32" | "TYPE_BOOL" | "TYPE_STRING" | "TYPE_GROUP" | "TYPE_MESSAGE" | "TYPE_BYTES" | "TYPE_UINT32" | "TYPE_ENUM" | "TYPE_SFIXED32" | "TYPE_SFIXED64" | "TYPE_SINT32" | "TYPE_SINT64";
  /**
   * The field name.
   */
  name?: string;
  /**
   * The field number.
   */
  number?: number;
  /**
   * The index of the field type in `Type.oneofs`, for message or enumeration
   * types. The first type has index 1; zero means the type is not in the list.
   */
  oneofIndex?: number;
  /**
   * The protocol buffer options.
   */
  options?: Option[];
  /**
   * Whether to use alternative packed wire representation.
   */
  packed?: boolean;
  /**
   * The field type URL, without the scheme, for message or enumeration types.
   * Example: `"type.googleapis.com/google.protobuf.Timestamp"`.
   */
  typeUrl?: string;
}

/**
 * Encapsulation of flow-specific error details for debugging. Used as a
 * details field on an error Status, not intended for external use.
 */
export interface FlowErrorDetails {
  /**
   * The type of exception (as a class name).
   */
  exceptionType?: string;
  /**
   * The step that failed.
   */
  flowStepId?: string;
}

/**
 * Request message for GenerateConfigReport method.
 */
export interface GenerateConfigReportRequest {
  /**
   * Required. Service configuration for which we want to generate the report.
   * For this version of API, the supported types are
   * google.api.servicemanagement.v1.ConfigRef,
   * google.api.servicemanagement.v1.ConfigSource, and google.api.Service
   */
  newConfig?: {
    [key: string]: any
  };
  /**
   * Optional. Service configuration against which the comparison will be done.
   * For this version of API, the supported types are
   * google.api.servicemanagement.v1.ConfigRef,
   * google.api.servicemanagement.v1.ConfigSource, and google.api.Service
   */
  oldConfig?: {
    [key: string]: any
  };
}

/**
 * Response message for GenerateConfigReport method.
 */
export interface GenerateConfigReportResponse {
  /**
   * list of ChangeReport, each corresponding to comparison between two service
   * configurations.
   */
  changeReports?: ChangeReport[];
  /**
   * Errors / Linter warnings associated with the service definition this
   * report belongs to.
   */
  diagnostics?: Diagnostic[];
  /**
   * ID of the service configuration this report belongs to.
   */
  id?: string;
  /**
   * Name of the service this report belongs to.
   */
  serviceName?: string;
}

/**
 * Request message for `GetIamPolicy` method.
 */
export interface GetIamPolicyRequest {
  /**
   * OPTIONAL: A `GetPolicyOptions` object for specifying options to
   * `GetIamPolicy`.
   */
  options?: GetPolicyOptions;
}

/**
 * Encapsulates settings provided to GetIamPolicy.
 */
export interface GetPolicyOptions {
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
  requestedPolicyVersion?: number;
}

/**
 * Settings for Go client libraries.
 */
export interface GoSettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
}

/**
 * Defines the HTTP configuration for an API service. It contains a list of
 * HttpRule, each specifying the mapping of an RPC method to one or more HTTP
 * REST API methods.
 */
export interface Http {
  /**
   * When set to true, URL path parameters will be fully URI-decoded except in
   * cases of single segment matches in reserved expansion, where "%2F" will be
   * left encoded. The default behavior is to not decode RFC 6570 reserved
   * characters in multi segment matches.
   */
  fullyDecodeReservedExpansion?: boolean;
  /**
   * A list of HTTP configuration rules that apply to individual API methods.
   * **NOTE:** All service configuration rules follow "last one wins" order.
   */
  rules?: HttpRule[];
}

/**
 * # gRPC Transcoding gRPC Transcoding is a feature for mapping between a gRPC
 * method and one or more HTTP REST endpoints. It allows developers to build a
 * single API service that supports both gRPC APIs and REST APIs. Many systems,
 * including [Google APIs](https://github.com/googleapis/googleapis), [Cloud
 * Endpoints](https://cloud.google.com/endpoints), [gRPC
 * Gateway](https://github.com/grpc-ecosystem/grpc-gateway), and
 * [Envoy](https://github.com/envoyproxy/envoy) proxy support this feature and
 * use it for large scale production services. `HttpRule` defines the schema of
 * the gRPC/REST mapping. The mapping specifies how different portions of the
 * gRPC request message are mapped to the URL path, URL query parameters, and
 * HTTP request body. It also controls how the gRPC response message is mapped
 * to the HTTP response body. `HttpRule` is typically specified as an
 * `google.api.http` annotation on the gRPC method. Each mapping specifies a URL
 * path template and an HTTP method. The path template may refer to one or more
 * fields in the gRPC request message, as long as each field is a non-repeated
 * field with a primitive (non-message) type. The path template controls how
 * fields of the request message are mapped to the URL path. Example: service
 * Messaging { rpc GetMessage(GetMessageRequest) returns (Message) { option
 * (google.api.http) = { get: "/v1/{name=messages/*}" }; } } message
 * GetMessageRequest { string name = 1; // Mapped to URL path. } message Message
 * { string text = 1; // The resource content. } This enables an HTTP REST to
 * gRPC mapping as below: HTTP | gRPC -----|----- `GET /v1/messages/123456` |
 * `GetMessage(name: "messages/123456")` Any fields in the request message which
 * are not bound by the path template automatically become HTTP query parameters
 * if there is no HTTP request body. For example: service Messaging { rpc
 * GetMessage(GetMessageRequest) returns (Message) { option (google.api.http) =
 * { get:"/v1/messages/{message_id}" }; } } message GetMessageRequest { message
 * SubMessage { string subfield = 1; } string message_id = 1; // Mapped to URL
 * path. int64 revision = 2; // Mapped to URL query parameter `revision`.
 * SubMessage sub = 3; // Mapped to URL query parameter `sub.subfield`. } This
 * enables a HTTP JSON to RPC mapping as below: HTTP | gRPC -----|----- `GET
 * /v1/messages/123456?revision=2&sub.subfield=foo` | `GetMessage(message_id:
 * "123456" revision: 2 sub: SubMessage(subfield: "foo"))` Note that fields
 * which are mapped to URL query parameters must have a primitive type or a
 * repeated primitive type or a non-repeated message type. In the case of a
 * repeated type, the parameter can be repeated in the URL as
 * `...?param=A&param=B`. In the case of a message type, each field of the
 * message is mapped to a separate parameter, such as
 * `...?foo.a=A&foo.b=B&foo.c=C`. For HTTP methods that allow a request body,
 * the `body` field specifies the mapping. Consider a REST update method on the
 * message resource collection: service Messaging { rpc
 * UpdateMessage(UpdateMessageRequest) returns (Message) { option
 * (google.api.http) = { patch: "/v1/messages/{message_id}" body: "message" }; }
 * } message UpdateMessageRequest { string message_id = 1; // mapped to the URL
 * Message message = 2; // mapped to the body } The following HTTP JSON to RPC
 * mapping is enabled, where the representation of the JSON in the request body
 * is determined by protos JSON encoding: HTTP | gRPC -----|----- `PATCH
 * /v1/messages/123456 { "text": "Hi!" }` | `UpdateMessage(message_id: "123456"
 * message { text: "Hi!" })` The special name `*` can be used in the body
 * mapping to define that every field not bound by the path template should be
 * mapped to the request body. This enables the following alternative definition
 * of the update method: service Messaging { rpc UpdateMessage(Message) returns
 * (Message) { option (google.api.http) = { patch: "/v1/messages/{message_id}"
 * body: "*" }; } } message Message { string message_id = 1; string text = 2; }
 * The following HTTP JSON to RPC mapping is enabled: HTTP | gRPC -----|-----
 * `PATCH /v1/messages/123456 { "text": "Hi!" }` | `UpdateMessage(message_id:
 * "123456" text: "Hi!")` Note that when using `*` in the body mapping, it is
 * not possible to have HTTP parameters, as all fields not bound by the path end
 * in the body. This makes this option more rarely used in practice when
 * defining REST APIs. The common usage of `*` is in custom methods which don't
 * use the URL at all for transferring data. It is possible to define multiple
 * HTTP methods for one RPC by using the `additional_bindings` option. Example:
 * service Messaging { rpc GetMessage(GetMessageRequest) returns (Message) {
 * option (google.api.http) = { get: "/v1/messages/{message_id}"
 * additional_bindings { get: "/v1/users/{user_id}/messages/{message_id}" } }; }
 * } message GetMessageRequest { string message_id = 1; string user_id = 2; }
 * This enables the following two alternative HTTP JSON to RPC mappings: HTTP |
 * gRPC -----|----- `GET /v1/messages/123456` | `GetMessage(message_id:
 * "123456")` `GET /v1/users/me/messages/123456` | `GetMessage(user_id: "me"
 * message_id: "123456")` ## Rules for HTTP mapping 1. Leaf request fields
 * (recursive expansion nested messages in the request message) are classified
 * into three categories: - Fields referred by the path template. They are
 * passed via the URL path. - Fields referred by the HttpRule.body. They are
 * passed via the HTTP request body. - All other fields are passed via the URL
 * query parameters, and the parameter name is the field path in the request
 * message. A repeated field can be represented as multiple query parameters
 * under the same name. 2. If HttpRule.body is "*", there is no URL query
 * parameter, all fields are passed via URL path and HTTP request body. 3. If
 * HttpRule.body is omitted, there is no HTTP request body, all fields are
 * passed via URL path and URL query parameters. ### Path template syntax
 * Template = "/" Segments [ Verb ] ; Segments = Segment { "/" Segment } ;
 * Segment = "*" | "**" | LITERAL | Variable ; Variable = "{" FieldPath [ "="
 * Segments ] "}" ; FieldPath = IDENT { "." IDENT } ; Verb = ":" LITERAL ; The
 * syntax `*` matches a single URL path segment. The syntax `**` matches zero or
 * more URL path segments, which must be the last part of the URL path except
 * the `Verb`. The syntax `Variable` matches part of the URL path as specified
 * by its template. A variable template must not contain other variables. If a
 * variable matches a single path segment, its template may be omitted, e.g.
 * `{var}` is equivalent to `{var=*}`. The syntax `LITERAL` matches literal text
 * in the URL path. If the `LITERAL` contains any reserved character, such
 * characters should be percent-encoded before the matching. If a variable
 * contains exactly one path segment, such as `"{var}"` or `"{var=*}"`, when
 * such a variable is expanded into a URL path on the client side, all
 * characters except `[-_.~0-9a-zA-Z]` are percent-encoded. The server side does
 * the reverse decoding. Such variables show up in the [Discovery
 * Document](https://developers.google.com/discovery/v1/reference/apis) as
 * `{var}`. If a variable contains multiple path segments, such as
 * `"{var=foo/*}"` or `"{var=**}"`, when such a variable is expanded into a URL
 * path on the client side, all characters except `[-_.~/0-9a-zA-Z]` are
 * percent-encoded. The server side does the reverse decoding, except "%2F" and
 * "%2f" are left unchanged. Such variables show up in the [Discovery
 * Document](https://developers.google.com/discovery/v1/reference/apis) as
 * `{+var}`. ## Using gRPC API Service Configuration gRPC API Service
 * Configuration (service config) is a configuration language for configuring a
 * gRPC service to become a user-facing product. The service config is simply
 * the YAML representation of the `google.api.Service` proto message. As an
 * alternative to annotating your proto file, you can configure gRPC transcoding
 * in your service config YAML files. You do this by specifying a `HttpRule`
 * that maps the gRPC method to a REST endpoint, achieving the same effect as
 * the proto annotation. This can be particularly useful if you have a proto
 * that is reused in multiple services. Note that any transcoding specified in
 * the service config will override any matching transcoding configuration in
 * the proto. Example: http: rules: # Selects a gRPC method and applies HttpRule
 * to it. - selector: example.v1.Messaging.GetMessage get:
 * /v1/messages/{message_id}/{sub.subfield} ## Special notes When gRPC
 * Transcoding is used to map a gRPC to JSON REST endpoints, the proto to JSON
 * conversion must follow the [proto3
 * specification](https://developers.google.com/protocol-buffers/docs/proto3#json).
 * While the single segment variable follows the semantics of [RFC
 * 6570](https://tools.ietf.org/html/rfc6570) Section 3.2.2 Simple String
 * Expansion, the multi segment variable **does not** follow RFC 6570 Section
 * 3.2.3 Reserved Expansion. The reason is that the Reserved Expansion does not
 * expand special characters like `?` and `#`, which would lead to invalid URLs.
 * As the result, gRPC Transcoding uses a custom encoding for multi segment
 * variables. The path variables **must not** refer to any repeated or mapped
 * field, because client libraries are not capable of handling such variable
 * expansion. The path variables **must not** capture the leading "/" character.
 * The reason is that the most common use case "{var}" does not capture the
 * leading "/" character. For consistency, all path variables must share the
 * same behavior. Repeated message fields must not be mapped to URL query
 * parameters, because no client library can support such complicated mapping.
 * If an API needs to use a JSON array for request or response body, it can map
 * the request or response body to a repeated field. However, some gRPC
 * Transcoding implementations may not support this feature.
 */
export interface HttpRule {
  /**
   * Additional HTTP bindings for the selector. Nested bindings must not
   * contain an `additional_bindings` field themselves (that is, the nesting may
   * only be one level deep).
   */
  additionalBindings?: HttpRule[];
  /**
   * The name of the request field whose value is mapped to the HTTP request
   * body, or `*` for mapping all request fields not captured by the path
   * pattern to the HTTP body, or omitted for not having any HTTP request body.
   * NOTE: the referred field must be present at the top-level of the request
   * message type.
   */
  body?: string;
  /**
   * The custom pattern is used for specifying an HTTP method that is not
   * included in the `pattern` field, such as HEAD, or "*" to leave the HTTP
   * method unspecified for this rule. The wild-card rule is useful for services
   * that provide content to Web (HTML) clients.
   */
  custom?: CustomHttpPattern;
  /**
   * Maps to HTTP DELETE. Used for deleting a resource.
   */
  delete?: string;
  /**
   * Maps to HTTP GET. Used for listing and getting information about
   * resources.
   */
  get?: string;
  /**
   * Maps to HTTP PATCH. Used for updating a resource.
   */
  patch?: string;
  /**
   * Maps to HTTP POST. Used for creating a resource or performing an action.
   */
  post?: string;
  /**
   * Maps to HTTP PUT. Used for replacing a resource.
   */
  put?: string;
  /**
   * Optional. The name of the response field whose value is mapped to the HTTP
   * response body. When omitted, the entire response message will be used as
   * the HTTP response body. NOTE: The referred field must be present at the
   * top-level of the response message type.
   */
  responseBody?: string;
  /**
   * Selects a method to which this rule applies. Refer to selector for syntax
   * details.
   */
  selector?: string;
}

/**
 * Settings for Java client libraries.
 */
export interface JavaSettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
  /**
   * The package name to use in Java. Clobbers the java_package option set in
   * the protobuf. This should be used **only** by APIs who have already set the
   * language_settings.java.package_name" field in gapic.yaml. API teams should
   * use the protobuf java_package option where possible. Example of a YAML
   * configuration:: publishing: java_settings: library_package:
   * com.google.cloud.pubsub.v1
   */
  libraryPackage?: string;
  /**
   * Configure the Java class name to use instead of the service's for its
   * corresponding generated GAPIC client. Keys are fully-qualified service
   * names as they appear in the protobuf (including the full the
   * language_settings.java.interface_names" field in gapic.yaml. API teams
   * should otherwise use the service name as it appears in the protobuf.
   * Example of a YAML configuration:: publishing: java_settings:
   * service_class_names: - google.pubsub.v1.Publisher: TopicAdmin -
   * google.pubsub.v1.Subscriber: SubscriptionAdmin
   */
  serviceClassNames?: {
    [key: string]: string
  };
}

/**
 * Specifies a location to extract JWT from an API request.
 */
export interface JwtLocation {
  /**
   * Specifies cookie name to extract JWT token.
   */
  cookie?: string;
  /**
   * Specifies HTTP header name to extract JWT token.
   */
  header?: string;
  /**
   * Specifies URL query parameter name to extract JWT token.
   */
  query?: string;
  /**
   * The value prefix. The value format is "value_prefix{token}" Only applies
   * to "in" header type. Must be empty for "in" query type. If not empty, the
   * header value has to match (case sensitive) this prefix. If not matched, JWT
   * will not be extracted. If matched, JWT will be extracted after the prefix
   * is removed. For example, for "Authorization: Bearer {JWT}",
   * value_prefix="Bearer " with a space at the end.
   */
  valuePrefix?: string;
}

/**
 * A description of a label.
 */
export interface LabelDescriptor {
  /**
   * A human-readable description for the label.
   */
  description?: string;
  /**
   * The label key.
   */
  key?: string;
  /**
   * The type of data that can be assigned to the label.
   */
  valueType?:  | "STRING" | "BOOL" | "INT64";
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
 * Response message for ListServiceConfigs method.
 */
export interface ListServiceConfigsResponse {
  /**
   * The token of the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of service configuration resources.
   */
  serviceConfigs?: Service[];
}

function serializeListServiceConfigsResponse(data: any): ListServiceConfigsResponse {
  return {
    ...data,
    serviceConfigs: data["serviceConfigs"] !== undefined ? data["serviceConfigs"].map((item: any) => (serializeService(item))) : undefined,
  };
}

function deserializeListServiceConfigsResponse(data: any): ListServiceConfigsResponse {
  return {
    ...data,
    serviceConfigs: data["serviceConfigs"] !== undefined ? data["serviceConfigs"].map((item: any) => (deserializeService(item))) : undefined,
  };
}

/**
 * Response message for ListServiceRollouts method.
 */
export interface ListServiceRolloutsResponse {
  /**
   * The token of the next page of results.
   */
  nextPageToken?: string;
  /**
   * The list of rollout resources.
   */
  rollouts?: Rollout[];
}

function serializeListServiceRolloutsResponse(data: any): ListServiceRolloutsResponse {
  return {
    ...data,
    rollouts: data["rollouts"] !== undefined ? data["rollouts"].map((item: any) => (serializeRollout(item))) : undefined,
  };
}

function deserializeListServiceRolloutsResponse(data: any): ListServiceRolloutsResponse {
  return {
    ...data,
    rollouts: data["rollouts"] !== undefined ? data["rollouts"].map((item: any) => (deserializeRollout(item))) : undefined,
  };
}

/**
 * Response message for `ListServices` method.
 */
export interface ListServicesResponse {
  /**
   * Token that can be passed to `ListServices` to resume a paginated query.
   */
  nextPageToken?: string;
  /**
   * The returned services will only have the name field set.
   */
  services?: ManagedService[];
}

/**
 * A description of a log type. Example in YAML format: - name:
 * library.googleapis.com/activity_history description: The history of borrowing
 * and returning library items. display_name: Activity labels: - key:
 * /customer_id description: Identifier of a library customer
 */
export interface LogDescriptor {
  /**
   * A human-readable description of this log. This information appears in the
   * documentation and can contain details.
   */
  description?: string;
  /**
   * The human-readable name for this log. This information appears on the user
   * interface and should be concise.
   */
  displayName?: string;
  /**
   * The set of labels that are available to describe a specific log entry.
   * Runtime requests that contain labels not specified here are considered
   * invalid.
   */
  labels?: LabelDescriptor[];
  /**
   * The name of the log. It must be less than 512 characters long and can
   * include the following characters: upper- and lower-case alphanumeric
   * characters [A-Za-z0-9], and punctuation characters including slash,
   * underscore, hyphen, period [/_-.].
   */
  name?: string;
}

/**
 * Logging configuration of the service. The following example shows how to
 * configure logs to be sent to the producer and consumer projects. In the
 * example, the `activity_history` log is sent to both the producer and consumer
 * projects, whereas the `purchase_history` log is only sent to the producer
 * project. monitored_resources: - type: library.googleapis.com/branch labels: -
 * key: /city description: The city where the library branch is located in. -
 * key: /name description: The name of the branch. logs: - name:
 * activity_history labels: - key: /customer_id - name: purchase_history
 * logging: producer_destinations: - monitored_resource:
 * library.googleapis.com/branch logs: - activity_history - purchase_history
 * consumer_destinations: - monitored_resource: library.googleapis.com/branch
 * logs: - activity_history
 */
export interface Logging {
  /**
   * Logging configurations for sending logs to the consumer project. There can
   * be multiple consumer destinations, each one must have a different monitored
   * resource type. A log can be used in at most one consumer destination.
   */
  consumerDestinations?: LoggingDestination[];
  /**
   * Logging configurations for sending logs to the producer project. There can
   * be multiple producer destinations, each one must have a different monitored
   * resource type. A log can be used in at most one producer destination.
   */
  producerDestinations?: LoggingDestination[];
}

/**
 * Configuration of a specific logging destination (the producer project or the
 * consumer project).
 */
export interface LoggingDestination {
  /**
   * Names of the logs to be sent to this destination. Each name must be
   * defined in the Service.logs section. If the log name is not a domain scoped
   * name, it will be automatically prefixed with the service name followed by
   * "/".
   */
  logs?: string[];
  /**
   * The monitored resource type. The type must be defined in the
   * Service.monitored_resources section.
   */
  monitoredResource?: string;
}

/**
 * Describes settings to use when generating API methods that use the
 * long-running operation pattern. All default values below are from those used
 * in the client library generators (e.g.
 * [Java](https://github.com/googleapis/gapic-generator-java/blob/04c2faa191a9b5a10b92392fe8482279c4404803/src/main/java/com/google/api/generator/gapic/composer/common/RetrySettingsComposer.java)).
 */
export interface LongRunning {
  /**
   * Initial delay after which the first poll request will be made. Default
   * value: 5 seconds.
   */
  initialPollDelay?: number /* Duration */;
  /**
   * Maximum time between two subsequent poll requests. Default value: 45
   * seconds.
   */
  maxPollDelay?: number /* Duration */;
  /**
   * Multiplier to gradually increase delay between subsequent polls until it
   * reaches max_poll_delay. Default value: 1.5.
   */
  pollDelayMultiplier?: number;
  /**
   * Total polling timeout. Default value: 5 minutes.
   */
  totalPollTimeout?: number /* Duration */;
}

function serializeLongRunning(data: any): LongRunning {
  return {
    ...data,
    initialPollDelay: data["initialPollDelay"] !== undefined ? data["initialPollDelay"] : undefined,
    maxPollDelay: data["maxPollDelay"] !== undefined ? data["maxPollDelay"] : undefined,
    totalPollTimeout: data["totalPollTimeout"] !== undefined ? data["totalPollTimeout"] : undefined,
  };
}

function deserializeLongRunning(data: any): LongRunning {
  return {
    ...data,
    initialPollDelay: data["initialPollDelay"] !== undefined ? data["initialPollDelay"] : undefined,
    maxPollDelay: data["maxPollDelay"] !== undefined ? data["maxPollDelay"] : undefined,
    totalPollTimeout: data["totalPollTimeout"] !== undefined ? data["totalPollTimeout"] : undefined,
  };
}

/**
 * The full representation of a Service that is managed by Google Service
 * Management.
 */
export interface ManagedService {
  /**
   * ID of the project that produces and owns this service.
   */
  producerProjectId?: string;
  /**
   * The name of the service. See the
   * [overview](https://cloud.google.com/service-infrastructure/docs/overview)
   * for naming requirements.
   */
  serviceName?: string;
}

/**
 * Method represents a method of an API interface.
 */
export interface Method {
  /**
   * The simple name of this method.
   */
  name?: string;
  /**
   * Any metadata attached to the method.
   */
  options?: Option[];
  /**
   * If true, the request is streamed.
   */
  requestStreaming?: boolean;
  /**
   * A URL of the input message type.
   */
  requestTypeUrl?: string;
  /**
   * If true, the response is streamed.
   */
  responseStreaming?: boolean;
  /**
   * The URL of the output message type.
   */
  responseTypeUrl?: string;
  /**
   * The source syntax of this method.
   */
  syntax?:  | "SYNTAX_PROTO2" | "SYNTAX_PROTO3";
}

/**
 * Describes the generator configuration for a method.
 */
export interface MethodSettings {
  /**
   * Describes settings to use for long-running operations when generating API
   * methods for RPCs. Complements RPCs that use the annotations in
   * google/longrunning/operations.proto. Example of a YAML configuration::
   * publishing: method_behavior: - selector: CreateAdDomain long_running:
   * initial_poll_delay: seconds: 60 # 1 minute poll_delay_multiplier: 1.5
   * max_poll_delay: seconds: 360 # 6 minutes total_poll_timeout: seconds: 54000
   * # 90 minutes
   */
  longRunning?: LongRunning;
  /**
   * The fully qualified name of the method, for which the options below apply.
   * This is used to find the method to apply the options.
   */
  selector?: string;
}

function serializeMethodSettings(data: any): MethodSettings {
  return {
    ...data,
    longRunning: data["longRunning"] !== undefined ? serializeLongRunning(data["longRunning"]) : undefined,
  };
}

function deserializeMethodSettings(data: any): MethodSettings {
  return {
    ...data,
    longRunning: data["longRunning"] !== undefined ? deserializeLongRunning(data["longRunning"]) : undefined,
  };
}

/**
 * Defines a metric type and its schema. Once a metric descriptor is created,
 * deleting or altering it stops data collection and makes the metric type's
 * existing data unusable.
 */
export interface MetricDescriptor {
  /**
   * A detailed description of the metric, which can be used in documentation.
   */
  description?: string;
  /**
   * A concise name for the metric, which can be displayed in user interfaces.
   * Use sentence case without an ending period, for example "Request count".
   * This field is optional but it is recommended to be set for any metrics
   * associated with user-visible concepts, such as Quota.
   */
  displayName?: string;
  /**
   * The set of labels that can be used to describe a specific instance of this
   * metric type. For example, the
   * `appengine.googleapis.com/http/server/response_latencies` metric type has a
   * label for the HTTP response code, `response_code`, so you can look at
   * latencies for successful responses or just for responses that failed.
   */
  labels?: LabelDescriptor[];
  /**
   * Optional. The launch stage of the metric definition.
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * Optional. Metadata which can be used to guide usage of the metric.
   */
  metadata?: MetricDescriptorMetadata;
  /**
   * Whether the metric records instantaneous values, changes to a value, etc.
   * Some combinations of `metric_kind` and `value_type` might not be supported.
   */
  metricKind?:  | "METRIC_KIND_UNSPECIFIED" | "GAUGE" | "DELTA" | "CUMULATIVE";
  /**
   * Read-only. If present, then a time series, which is identified partially
   * by a metric type and a MonitoredResourceDescriptor, that is associated with
   * this metric type can only be associated with one of the monitored resource
   * types listed here.
   */
  monitoredResourceTypes?: string[];
  /**
   * The resource name of the metric descriptor.
   */
  name?: string;
  /**
   * The metric type, including its DNS name prefix. The type is not
   * URL-encoded. All user-defined metric types have the DNS name
   * `custom.googleapis.com` or `external.googleapis.com`. Metric types should
   * use a natural hierarchical grouping. For example:
   * "custom.googleapis.com/invoice/paid/amount"
   * "external.googleapis.com/prometheus/up"
   * "appengine.googleapis.com/http/server/response_latencies"
   */
  type?: string;
  /**
   * The units in which the metric value is reported. It is only applicable if
   * the `value_type` is `INT64`, `DOUBLE`, or `DISTRIBUTION`. The `unit`
   * defines the representation of the stored metric values. Different systems
   * might scale the values to be more easily displayed (so a value of `0.02kBy`
   * _might_ be displayed as `20By`, and a value of `3523kBy` _might_ be
   * displayed as `3.5MBy`). However, if the `unit` is `kBy`, then the value of
   * the metric is always in thousands of bytes, no matter how it might be
   * displayed. If you want a custom metric to record the exact number of
   * CPU-seconds used by a job, you can create an `INT64 CUMULATIVE` metric
   * whose `unit` is `s{CPU}` (or equivalently `1s{CPU}` or just `s`). If the
   * job uses 12,005 CPU-seconds, then the value is written as `12005`.
   * Alternatively, if you want a custom metric to record data in a more
   * granular way, you can create a `DOUBLE CUMULATIVE` metric whose `unit` is
   * `ks{CPU}`, and then write the value `12.005` (which is `12005/1000`), or
   * use `Kis{CPU}` and write `11.723` (which is `12005/1024`). The supported
   * units are a subset of [The Unified Code for Units of
   * Measure](https://unitsofmeasure.org/ucum.html) standard: **Basic units
   * (UNIT)** * `bit` bit * `By` byte * `s` second * `min` minute * `h` hour *
   * `d` day * `1` dimensionless **Prefixes (PREFIX)** * `k` kilo (10^3) * `M`
   * mega (10^6) * `G` giga (10^9) * `T` tera (10^12) * `P` peta (10^15) * `E`
   * exa (10^18) * `Z` zetta (10^21) * `Y` yotta (10^24) * `m` milli (10^-3) *
   * `u` micro (10^-6) * `n` nano (10^-9) * `p` pico (10^-12) * `f` femto
   * (10^-15) * `a` atto (10^-18) * `z` zepto (10^-21) * `y` yocto (10^-24) *
   * `Ki` kibi (2^10) * `Mi` mebi (2^20) * `Gi` gibi (2^30) * `Ti` tebi (2^40) *
   * `Pi` pebi (2^50) **Grammar** The grammar also includes these connectors: *
   * `/` division or ratio (as an infix operator). For examples, `kBy/{email}`
   * or `MiBy/10ms` (although you should almost never have `/s` in a metric
   * `unit`; rates should always be computed at query time from the underlying
   * cumulative or delta value). * `.` multiplication or composition (as an
   * infix operator). For examples, `GBy.d` or `k{watt}.h`. The grammar for a
   * unit is as follows: Expression = Component { "." Component } { "/"
   * Component } ; Component = ( [ PREFIX ] UNIT | "%" ) [ Annotation ] |
   * Annotation | "1" ; Annotation = "{" NAME "}" ; Notes: * `Annotation` is
   * just a comment if it follows a `UNIT`. If the annotation is used alone,
   * then the unit is equivalent to `1`. For examples, `{request}/s == 1/s`,
   * `By{transmitted}/s == By/s`. * `NAME` is a sequence of non-blank printable
   * ASCII characters not containing `{` or `}`. * `1` represents a unitary
   * [dimensionless unit](https://en.wikipedia.org/wiki/Dimensionless_quantity)
   * of 1, such as in `1/s`. It is typically used when none of the basic units
   * are appropriate. For example, "new users per day" can be represented as
   * `1/d` or `{new-users}/d` (and a metric value `5` would mean "5 new users).
   * Alternatively, "thousands of page views per day" would be represented as
   * `1000/d` or `k1/d` or `k{page_views}/d` (and a metric value of `5.3` would
   * mean "5300 page views per day"). * `%` represents dimensionless value of
   * 1/100, and annotates values giving a percentage (so the metric values are
   * typically in the range of 0..100, and a metric value `3` means "3
   * percent"). * `10^2.%` indicates a metric contains a ratio, typically in the
   * range 0..1, that will be multiplied by 100 and displayed as a percentage
   * (so a metric value `0.03` means "3 percent").
   */
  unit?: string;
  /**
   * Whether the measurement is an integer, a floating-point number, etc. Some
   * combinations of `metric_kind` and `value_type` might not be supported.
   */
  valueType?:  | "VALUE_TYPE_UNSPECIFIED" | "BOOL" | "INT64" | "DOUBLE" | "STRING" | "DISTRIBUTION" | "MONEY";
}

function serializeMetricDescriptor(data: any): MetricDescriptor {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? serializeMetricDescriptorMetadata(data["metadata"]) : undefined,
  };
}

function deserializeMetricDescriptor(data: any): MetricDescriptor {
  return {
    ...data,
    metadata: data["metadata"] !== undefined ? deserializeMetricDescriptorMetadata(data["metadata"]) : undefined,
  };
}

/**
 * Additional annotations that can be used to guide the usage of a metric.
 */
export interface MetricDescriptorMetadata {
  /**
   * The delay of data points caused by ingestion. Data points older than this
   * age are guaranteed to be ingested and available to be read, excluding data
   * loss due to errors.
   */
  ingestDelay?: number /* Duration */;
  /**
   * Deprecated. Must use the MetricDescriptor.launch_stage instead.
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * The sampling period of metric data points. For metrics which are written
   * periodically, consecutive data points are stored at this time interval,
   * excluding data loss due to errors. Metrics with a higher granularity have a
   * smaller sampling period.
   */
  samplePeriod?: number /* Duration */;
}

function serializeMetricDescriptorMetadata(data: any): MetricDescriptorMetadata {
  return {
    ...data,
    ingestDelay: data["ingestDelay"] !== undefined ? data["ingestDelay"] : undefined,
    samplePeriod: data["samplePeriod"] !== undefined ? data["samplePeriod"] : undefined,
  };
}

function deserializeMetricDescriptorMetadata(data: any): MetricDescriptorMetadata {
  return {
    ...data,
    ingestDelay: data["ingestDelay"] !== undefined ? data["ingestDelay"] : undefined,
    samplePeriod: data["samplePeriod"] !== undefined ? data["samplePeriod"] : undefined,
  };
}

/**
 * Bind API methods to metrics. Binding a method to a metric causes that
 * metric's configured quota behaviors to apply to the method call.
 */
export interface MetricRule {
  /**
   * Metrics to update when the selected methods are called, and the associated
   * cost applied to each metric. The key of the map is the metric name, and the
   * values are the amount increased for the metric against which the quota
   * limits are defined. The value must not be negative.
   */
  metricCosts?: {
    [key: string]: bigint
  };
  /**
   * Selects the methods to which this rule applies. Refer to selector for
   * syntax details.
   */
  selector?: string;
}

function serializeMetricRule(data: any): MetricRule {
  return {
    ...data,
    metricCosts: data["metricCosts"] !== undefined ? Object.fromEntries(Object.entries(data["metricCosts"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
  };
}

function deserializeMetricRule(data: any): MetricRule {
  return {
    ...data,
    metricCosts: data["metricCosts"] !== undefined ? Object.fromEntries(Object.entries(data["metricCosts"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
  };
}

/**
 * Declares an API Interface to be included in this interface. The including
 * interface must redeclare all the methods from the included interface, but
 * documentation and options are inherited as follows: - If after comment and
 * whitespace stripping, the documentation string of the redeclared method is
 * empty, it will be inherited from the original method. - Each annotation
 * belonging to the service config (http, visibility) which is not set in the
 * redeclared method will be inherited. - If an http annotation is inherited,
 * the path pattern will be modified as follows. Any version prefix will be
 * replaced by the version of the including interface plus the root path if
 * specified. Example of a simple mixin: package google.acl.v1; service
 * AccessControl { // Get the underlying ACL object. rpc GetAcl(GetAclRequest)
 * returns (Acl) { option (google.api.http).get = "/v1/{resource=**}:getAcl"; }
 * } package google.storage.v2; service Storage { // rpc GetAcl(GetAclRequest)
 * returns (Acl); // Get a data record. rpc GetData(GetDataRequest) returns
 * (Data) { option (google.api.http).get = "/v2/{resource=**}"; } } Example of a
 * mixin configuration: apis: - name: google.storage.v2.Storage mixins: - name:
 * google.acl.v1.AccessControl The mixin construct implies that all methods in
 * `AccessControl` are also declared with same name and request/response types
 * in `Storage`. A documentation generator or annotation processor will see the
 * effective `Storage.GetAcl` method after inheriting documentation and
 * annotations as follows: service Storage { // Get the underlying ACL object.
 * rpc GetAcl(GetAclRequest) returns (Acl) { option (google.api.http).get =
 * "/v2/{resource=**}:getAcl"; } ... } Note how the version in the path pattern
 * changed from `v1` to `v2`. If the `root` field in the mixin is specified, it
 * should be a relative path under which inherited HTTP paths are placed.
 * Example: apis: - name: google.storage.v2.Storage mixins: - name:
 * google.acl.v1.AccessControl root: acls This implies the following inherited
 * HTTP annotation: service Storage { // Get the underlying ACL object. rpc
 * GetAcl(GetAclRequest) returns (Acl) { option (google.api.http).get =
 * "/v2/acls/{resource=**}:getAcl"; } ... }
 */
export interface Mixin {
  /**
   * The fully qualified name of the interface which is included.
   */
  name?: string;
  /**
   * If non-empty specifies a path under which inherited HTTP paths are rooted.
   */
  root?: string;
}

/**
 * An object that describes the schema of a MonitoredResource object using a
 * type name and a set of labels. For example, the monitored resource descriptor
 * for Google Compute Engine VM instances has a type of `"gce_instance"` and
 * specifies the use of the labels `"instance_id"` and `"zone"` to identify
 * particular VM instances. Different APIs can support different monitored
 * resource types. APIs generally provide a `list` method that returns the
 * monitored resource descriptors used by the API.
 */
export interface MonitoredResourceDescriptor {
  /**
   * Optional. A detailed description of the monitored resource type that might
   * be used in documentation.
   */
  description?: string;
  /**
   * Optional. A concise name for the monitored resource type that might be
   * displayed in user interfaces. It should be a Title Cased Noun Phrase,
   * without any article or other determiners. For example, `"Google Cloud SQL
   * Database"`.
   */
  displayName?: string;
  /**
   * Required. A set of labels used to describe instances of this monitored
   * resource type. For example, an individual Google Cloud SQL database is
   * identified by values for the labels `"database_id"` and `"zone"`.
   */
  labels?: LabelDescriptor[];
  /**
   * Optional. The launch stage of the monitored resource definition.
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * Optional. The resource name of the monitored resource descriptor:
   * `"projects/{project_id}/monitoredResourceDescriptors/{type}"` where {type}
   * is the value of the `type` field in this object and {project_id} is a
   * project ID that provides API-specific context for accessing the type. APIs
   * that do not use project information can use the resource name format
   * `"monitoredResourceDescriptors/{type}"`.
   */
  name?: string;
  /**
   * Required. The monitored resource type. For example, the type
   * `"cloudsql_database"` represents databases in Google Cloud SQL. For a list
   * of types, see [Monitoring resource
   * types](https://cloud.google.com/monitoring/api/resources) and [Logging
   * resource
   * types](https://cloud.google.com/logging/docs/api/v2/resource-list).
   */
  type?: string;
}

/**
 * Monitoring configuration of the service. The example below shows how to
 * configure monitored resources and metrics for monitoring. In the example, a
 * monitored resource and two metrics are defined. The
 * `library.googleapis.com/book/returned_count` metric is sent to both producer
 * and consumer projects, whereas the `library.googleapis.com/book/num_overdue`
 * metric is only sent to the consumer project. monitored_resources: - type:
 * library.googleapis.com/Branch display_name: "Library Branch" description: "A
 * branch of a library." launch_stage: GA labels: - key: resource_container
 * description: "The Cloud container (ie. project id) for the Branch." - key:
 * location description: "The location of the library branch." - key: branch_id
 * description: "The id of the branch." metrics: - name:
 * library.googleapis.com/book/returned_count display_name: "Books Returned"
 * description: "The count of books that have been returned." launch_stage: GA
 * metric_kind: DELTA value_type: INT64 unit: "1" labels: - key: customer_id
 * description: "The id of the customer." - name:
 * library.googleapis.com/book/num_overdue display_name: "Books Overdue"
 * description: "The current number of overdue books." launch_stage: GA
 * metric_kind: GAUGE value_type: INT64 unit: "1" labels: - key: customer_id
 * description: "The id of the customer." monitoring: producer_destinations: -
 * monitored_resource: library.googleapis.com/Branch metrics: -
 * library.googleapis.com/book/returned_count consumer_destinations: -
 * monitored_resource: library.googleapis.com/Branch metrics: -
 * library.googleapis.com/book/returned_count -
 * library.googleapis.com/book/num_overdue
 */
export interface Monitoring {
  /**
   * Monitoring configurations for sending metrics to the consumer project.
   * There can be multiple consumer destinations. A monitored resource type may
   * appear in multiple monitoring destinations if different aggregations are
   * needed for different sets of metrics associated with that monitored
   * resource type. A monitored resource and metric pair may only be used once
   * in the Monitoring configuration.
   */
  consumerDestinations?: MonitoringDestination[];
  /**
   * Monitoring configurations for sending metrics to the producer project.
   * There can be multiple producer destinations. A monitored resource type may
   * appear in multiple monitoring destinations if different aggregations are
   * needed for different sets of metrics associated with that monitored
   * resource type. A monitored resource and metric pair may only be used once
   * in the Monitoring configuration.
   */
  producerDestinations?: MonitoringDestination[];
}

/**
 * Configuration of a specific monitoring destination (the producer project or
 * the consumer project).
 */
export interface MonitoringDestination {
  /**
   * Types of the metrics to report to this monitoring destination. Each type
   * must be defined in Service.metrics section.
   */
  metrics?: string[];
  /**
   * The monitored resource type. The type must be defined in
   * Service.monitored_resources section.
   */
  monitoredResource?: string;
}

/**
 * Settings for Node client libraries.
 */
export interface NodeSettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
}

/**
 * OAuth scopes are a way to define data and permissions on data. For example,
 * there are scopes defined for "Read-only access to Google Calendar" and
 * "Access to Cloud Platform". Users can consent to a scope for an application,
 * giving it permission to access that data on their behalf. OAuth scope
 * specifications should be fairly coarse grained; a user will need to see and
 * understand the text description of what your scope means. In most cases: use
 * one or at most two OAuth scopes for an entire family of products. If your
 * product has multiple APIs, you should probably be sharing the OAuth scope
 * across all of those APIs. When you need finer grained OAuth consent screens:
 * talk with your product management about how developers will use them in
 * practice. Please note that even though each of the canonical scopes is enough
 * for a request to be accepted and passed to the backend, a request can still
 * fail due to the backend requiring additional scopes or permissions.
 */
export interface OAuthRequirements {
  /**
   * The list of publicly documented OAuth scopes that are allowed access. An
   * OAuth token containing any of these scopes will be accepted. Example:
   * canonical_scopes: https://www.googleapis.com/auth/calendar,
   * https://www.googleapis.com/auth/calendar.read
   */
  canonicalScopes?: string;
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
 * A message representing the message types used by a long-running operation.
 * Example: rpc Export(ExportRequest) returns (google.longrunning.Operation) {
 * option (google.longrunning.operation_info) = { response_type:
 * "ExportResponse" metadata_type: "ExportMetadata" }; }
 */
export interface OperationInfo {
  /**
   * Required. The message name of the metadata type for this long-running
   * operation. If the response is in a different package from the rpc, a
   * fully-qualified message name must be used (e.g. `google.protobuf.Struct`).
   * Note: Altering this value constitutes a breaking change.
   */
  metadataType?: string;
  /**
   * Required. The message name of the primary return type for this
   * long-running operation. This type will be used to deserialize the LRO's
   * response. If the response is in a different package from the rpc, a
   * fully-qualified message name must be used (e.g. `google.protobuf.Struct`).
   * Note: Altering this value constitutes a breaking change.
   */
  responseType?: string;
}

/**
 * The metadata associated with a long running operation resource.
 */
export interface OperationMetadata {
  /**
   * Percentage of completion of this operation, ranging from 0 to 100.
   */
  progressPercentage?: number;
  /**
   * The full name of the resources that this operation is directly associated
   * with.
   */
  resourceNames?: string[];
  /**
   * The start time of the operation.
   */
  startTime?: Date;
  /**
   * Detailed status information for each step. The order is undetermined.
   */
  steps?: Step[];
}

function serializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Additional options for ServiceManagement#operationsList.
 */
export interface OperationsListOptions {
  /**
   * A string for filtering Operations. The following filter fields are
   * supported: * serviceName: Required. Only `=` operator is allowed. *
   * startTime: The time this job was started, in ISO 8601 format. Allowed
   * operators are `>=`, `>`, `<=`, and `<`. * status: Can be `done`,
   * `in_progress`, or `failed`. Allowed operators are `=`, and `!=`. Filter
   * expression supports conjunction (AND) and disjunction (OR) logical
   * operators. However, the serviceName restriction must be at the top-level
   * and can only be combined with other restrictions via the AND logical
   * operator. Examples: * `serviceName={some-service}.googleapis.com` *
   * `serviceName={some-service}.googleapis.com AND startTime>="2017-02-01"` *
   * `serviceName={some-service}.googleapis.com AND status=done` *
   * `serviceName={some-service}.googleapis.com AND (status=done OR
   * startTime>="2017-02-01")`
   */
  filter?: string;
  /**
   * Not used.
   */
  name?: string;
  /**
   * The maximum number of operations to return. If unspecified, defaults to
   * 50. The maximum value is 100.
   */
  pageSize?: number;
  /**
   * The standard list page token.
   */
  pageToken?: string;
}

/**
 * A protocol buffer option, which can be attached to a message, field,
 * enumeration, etc.
 */
export interface Option {
  /**
   * The option's name. For protobuf built-in options (options defined in
   * descriptor.proto), this is the short name. For example, `"map_entry"`. For
   * custom options, it should be the fully-qualified name. For example,
   * `"google.api.http"`.
   */
  name?: string;
  /**
   * The option's value packed in an Any message. If the value is a primitive,
   * the corresponding wrapper type defined in google/protobuf/wrappers.proto
   * should be used. If the value is an enum, it should be stored as an int32
   * value using the google.protobuf.Int32Value type.
   */
  value?: {
    [key: string]: any
  };
}

/**
 * Represents a documentation page. A page can contain subpages to represent
 * nested documentation set structure.
 */
export interface Page {
  /**
   * The Markdown content of the page. You can use (== include {path} ==) to
   * include content from a Markdown file. The content can be used to produce
   * the documentation page such as HTML format page.
   */
  content?: string;
  /**
   * The name of the page. It will be used as an identity of the page to
   * generate URI of the page, text of the link to this page in navigation, etc.
   * The full page name (start from the root page name to this page concatenated
   * with `.`) can be used as reference to the page in your documentation. For
   * example: pages: - name: Tutorial content: (== include tutorial.md ==)
   * subpages: - name: Java content: (== include tutorial_java.md ==) You can
   * reference `Java` page using Markdown reference link syntax: `Java`.
   */
  name?: string;
  /**
   * Subpages of this page. The order of subpages specified here will be
   * honored in the generated docset.
   */
  subpages?: Page[];
}

/**
 * Settings for Php client libraries.
 */
export interface PhpSettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
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
 * This message configures the settings for publishing [Google Cloud Client
 * libraries](https://cloud.google.com/apis/docs/cloud-client-libraries)
 * generated from the service config.
 */
export interface Publishing {
  /**
   * Used as a tracking tag when collecting data about the APIs developer
   * relations artifacts like docs, packages delivered to package managers, etc.
   * Example: "speech".
   */
  apiShortName?: string;
  /**
   * GitHub teams to be added to CODEOWNERS in the directory in GitHub
   * containing source code for the client libraries for this API.
   */
  codeownerGithubTeams?: string[];
  /**
   * A prefix used in sample code when demarking regions to be included in
   * documentation.
   */
  docTagPrefix?: string;
  /**
   * Link to product home page. Example:
   * https://cloud.google.com/asset-inventory/docs/overview
   */
  documentationUri?: string;
  /**
   * GitHub label to apply to issues and pull requests opened for this API.
   */
  githubLabel?: string;
  /**
   * Client library settings. If the same version string appears multiple times
   * in this list, then the last one wins. Settings from earlier settings with
   * the same version string are discarded.
   */
  librarySettings?: ClientLibrarySettings[];
  /**
   * A list of API method settings, e.g. the behavior for methods that use the
   * long-running operation pattern.
   */
  methodSettings?: MethodSettings[];
  /**
   * Link to a place that API users can report issues. Example:
   * https://issuetracker.google.com/issues/new?component=190865&template=1161103
   */
  newIssueUri?: string;
  /**
   * For whom the client library is being published.
   */
  organization?:  | "CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED" | "CLOUD" | "ADS" | "PHOTOS" | "STREET_VIEW";
  /**
   * Optional link to proto reference documentation. Example:
   * https://cloud.google.com/pubsub/lite/docs/reference/rpc
   */
  protoReferenceDocumentationUri?: string;
}

function serializePublishing(data: any): Publishing {
  return {
    ...data,
    methodSettings: data["methodSettings"] !== undefined ? data["methodSettings"].map((item: any) => (serializeMethodSettings(item))) : undefined,
  };
}

function deserializePublishing(data: any): Publishing {
  return {
    ...data,
    methodSettings: data["methodSettings"] !== undefined ? data["methodSettings"].map((item: any) => (deserializeMethodSettings(item))) : undefined,
  };
}

/**
 * Settings for Python client libraries.
 */
export interface PythonSettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
}

/**
 * Quota configuration helps to achieve fairness and budgeting in service
 * usage. The metric based quota configuration works this way: - The service
 * configuration defines a set of metrics. - For API calls, the
 * quota.metric_rules maps methods to metrics with corresponding costs. - The
 * quota.limits defines limits on the metrics, which will be used for quota
 * checks at runtime. An example quota configuration in yaml format: quota:
 * limits: - name: apiWriteQpsPerProject metric:
 * library.googleapis.com/write_calls unit: "1/min/{project}" # rate limit for
 * consumer projects values: STANDARD: 10000 (The metric rules bind all methods
 * to the read_calls metric, except for the UpdateBook and DeleteBook methods.
 * These two methods are mapped to the write_calls metric, with the UpdateBook
 * method consuming at twice rate as the DeleteBook method.) metric_rules: -
 * selector: "*" metric_costs: library.googleapis.com/read_calls: 1 - selector:
 * google.example.library.v1.LibraryService.UpdateBook metric_costs:
 * library.googleapis.com/write_calls: 2 - selector:
 * google.example.library.v1.LibraryService.DeleteBook metric_costs:
 * library.googleapis.com/write_calls: 1 Corresponding Metric definition:
 * metrics: - name: library.googleapis.com/read_calls display_name: Read
 * requests metric_kind: DELTA value_type: INT64 - name:
 * library.googleapis.com/write_calls display_name: Write requests metric_kind:
 * DELTA value_type: INT64
 */
export interface Quota {
  /**
   * List of QuotaLimit definitions for the service.
   */
  limits?: QuotaLimit[];
  /**
   * List of MetricRule definitions, each one mapping a selected method to one
   * or more metrics.
   */
  metricRules?: MetricRule[];
}

function serializeQuota(data: any): Quota {
  return {
    ...data,
    limits: data["limits"] !== undefined ? data["limits"].map((item: any) => (serializeQuotaLimit(item))) : undefined,
    metricRules: data["metricRules"] !== undefined ? data["metricRules"].map((item: any) => (serializeMetricRule(item))) : undefined,
  };
}

function deserializeQuota(data: any): Quota {
  return {
    ...data,
    limits: data["limits"] !== undefined ? data["limits"].map((item: any) => (deserializeQuotaLimit(item))) : undefined,
    metricRules: data["metricRules"] !== undefined ? data["metricRules"].map((item: any) => (deserializeMetricRule(item))) : undefined,
  };
}

/**
 * `QuotaLimit` defines a specific limit that applies over a specified duration
 * for a limit type. There can be at most one limit for a duration and limit
 * type combination defined within a `QuotaGroup`.
 */
export interface QuotaLimit {
  /**
   * Default number of tokens that can be consumed during the specified
   * duration. This is the number of tokens assigned when a client application
   * developer activates the service for his/her project. Specifying a value of
   * 0 will block all requests. This can be used if you are provisioning quota
   * to selected consumers and blocking others. Similarly, a value of -1 will
   * indicate an unlimited quota. No other negative values are allowed. Used by
   * group-based quotas only.
   */
  defaultLimit?: bigint;
  /**
   * Optional. User-visible, extended description for this quota limit. Should
   * be used only when more context is needed to understand this limit than
   * provided by the limit's display name (see: `display_name`).
   */
  description?: string;
  /**
   * User-visible display name for this limit. Optional. If not set, the UI
   * will provide a default display name based on the quota configuration. This
   * field can be used to override the default display name generated from the
   * configuration.
   */
  displayName?: string;
  /**
   * Duration of this limit in textual notation. Must be "100s" or "1d". Used
   * by group-based quotas only.
   */
  duration?: string;
  /**
   * Free tier value displayed in the Developers Console for this limit. The
   * free tier is the number of tokens that will be subtracted from the billed
   * amount when billing is enabled. This field can only be set on a limit with
   * duration "1d", in a billable group; it is invalid on any other limit. If
   * this field is not set, it defaults to 0, indicating that there is no free
   * tier for this service. Used by group-based quotas only.
   */
  freeTier?: bigint;
  /**
   * Maximum number of tokens that can be consumed during the specified
   * duration. Client application developers can override the default limit up
   * to this maximum. If specified, this value cannot be set to a value less
   * than the default limit. If not specified, it is set to the default limit.
   * To allow clients to apply overrides with no upper bound, set this to -1,
   * indicating unlimited maximum quota. Used by group-based quotas only.
   */
  maxLimit?: bigint;
  /**
   * The name of the metric this quota limit applies to. The quota limits with
   * the same metric will be checked together during runtime. The metric must be
   * defined within the service config.
   */
  metric?: string;
  /**
   * Name of the quota limit. The name must be provided, and it must be unique
   * within the service. The name can only include alphanumeric characters as
   * well as '-'. The maximum length of the limit name is 64 characters.
   */
  name?: string;
  /**
   * Specify the unit of the quota limit. It uses the same syntax as
   * Metric.unit. The supported unit kinds are determined by the quota backend
   * system. Here are some examples: * "1/min/{project}" for quota per minute
   * per project. Note: the order of unit components is insignificant. The "1"
   * at the beginning is required to follow the metric unit syntax.
   */
  unit?: string;
  /**
   * Tiered limit values. You must specify this as a key:value pair, with an
   * integer value that is the maximum number of requests allowed for the
   * specified unit. Currently only STANDARD is supported.
   */
  values?: {
    [key: string]: bigint
  };
}

function serializeQuotaLimit(data: any): QuotaLimit {
  return {
    ...data,
    defaultLimit: data["defaultLimit"] !== undefined ? String(data["defaultLimit"]) : undefined,
    freeTier: data["freeTier"] !== undefined ? String(data["freeTier"]) : undefined,
    maxLimit: data["maxLimit"] !== undefined ? String(data["maxLimit"]) : undefined,
    values: data["values"] !== undefined ? Object.fromEntries(Object.entries(data["values"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
  };
}

function deserializeQuotaLimit(data: any): QuotaLimit {
  return {
    ...data,
    defaultLimit: data["defaultLimit"] !== undefined ? BigInt(data["defaultLimit"]) : undefined,
    freeTier: data["freeTier"] !== undefined ? BigInt(data["freeTier"]) : undefined,
    maxLimit: data["maxLimit"] !== undefined ? BigInt(data["maxLimit"]) : undefined,
    values: data["values"] !== undefined ? Object.fromEntries(Object.entries(data["values"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
  };
}

/**
 * Defines a proto annotation that describes a string field that refers to an
 * API resource.
 */
export interface ResourceReference {
  /**
   * The resource type of a child collection that the annotated field
   * references. This is useful for annotating the `parent` field that doesn't
   * have a fixed resource type. Example: message ListLogEntriesRequest { string
   * parent = 1 [(google.api.resource_reference) = { child_type:
   * "logging.googleapis.com/LogEntry" }; }
   */
  childType?: string;
  /**
   * The resource type that the annotated field references. Example: message
   * Subscription { string topic = 2 [(google.api.resource_reference) = { type:
   * "pubsub.googleapis.com/Topic" }]; } Occasionally, a field may reference an
   * arbitrary resource. In this case, APIs use the special value * in their
   * resource reference. Example: message GetIamPolicyRequest { string resource
   * = 2 [(google.api.resource_reference) = { type: "*" }]; }
   */
  type?: string;
}

/**
 * A rollout resource that defines how service configuration versions are
 * pushed to control plane systems. Typically, you create a new version of the
 * service config, and then create a Rollout to push the service config.
 */
export interface Rollout {
  /**
   * The user who created the Rollout. Readonly.
   */
  createdBy?: string;
  /**
   * Creation time of the rollout. Readonly.
   */
  createTime?: Date;
  /**
   * The strategy associated with a rollout to delete a `ManagedService`.
   * Readonly.
   */
  deleteServiceStrategy?: DeleteServiceStrategy;
  /**
   * Optional. Unique identifier of this Rollout. Must be no longer than 63
   * characters and only lower case letters, digits, '.', '_' and '-' are
   * allowed. If not specified by client, the server will generate one. The
   * generated id will have the form of , where "date" is the create date in ISO
   * 8601 format. "revision number" is a monotonically increasing positive
   * number that is reset every day for each service. An example of the
   * generated rollout_id is '2016-02-16r1'
   */
  rolloutId?: string;
  /**
   * The name of the service associated with this Rollout.
   */
  serviceName?: string;
  /**
   * The status of this rollout. Readonly. In case of a failed rollout, the
   * system will automatically rollback to the current Rollout version.
   * Readonly.
   */
  status?:  | "ROLLOUT_STATUS_UNSPECIFIED" | "IN_PROGRESS" | "SUCCESS" | "CANCELLED" | "FAILED" | "PENDING" | "FAILED_ROLLED_BACK";
  /**
   * Google Service Control selects service configurations based on traffic
   * percentage.
   */
  trafficPercentStrategy?: TrafficPercentStrategy;
}

function serializeRollout(data: any): Rollout {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeRollout(data: any): Rollout {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Settings for Ruby client libraries.
 */
export interface RubySettings {
  /**
   * Some settings.
   */
  common?: CommonLanguageSettings;
}

/**
 * `Service` is the root object of Google API service configuration (service
 * config). It describes the basic information about a logical service, such as
 * the service name and the user-facing title, and delegates other aspects to
 * sub-sections. Each sub-section is either a proto message or a repeated proto
 * message that configures a specific aspect, such as auth. For more
 * information, see each proto message definition. Example: type:
 * google.api.Service name: calendar.googleapis.com title: Google Calendar API
 * apis: - name: google.calendar.v3.Calendar visibility: rules: - selector:
 * "google.calendar.v3.*" restriction: PREVIEW backend: rules: - selector:
 * "google.calendar.v3.*" address: calendar.example.com authentication:
 * providers: - id: google_calendar_auth jwks_uri:
 * https://www.googleapis.com/oauth2/v1/certs issuer:
 * https://securetoken.google.com rules: - selector: "*" requirements:
 * provider_id: google_calendar_auth
 */
export interface Service {
  /**
   * A list of API interfaces exported by this service. Only the `name` field
   * of the google.protobuf.Api needs to be provided by the configuration
   * author, as the remaining fields will be derived from the IDL during the
   * normalization process. It is an error to specify an API interface here
   * which cannot be resolved against the associated IDL files.
   */
  apis?: Api[];
  /**
   * Auth configuration.
   */
  authentication?: Authentication;
  /**
   * API backend configuration.
   */
  backend?: Backend;
  /**
   * Billing configuration.
   */
  billing?: Billing;
  /**
   * Obsolete. Do not use. This field has no semantic meaning. The service
   * config compiler always sets this field to `3`.
   */
  configVersion?: number;
  /**
   * Context configuration.
   */
  context?: Context;
  /**
   * Configuration for the service control plane.
   */
  control?: Control;
  /**
   * Custom error configuration.
   */
  customError?: CustomError;
  /**
   * Additional API documentation.
   */
  documentation?: Documentation;
  /**
   * Configuration for network endpoints. If this is empty, then an endpoint
   * with the same name as the service is automatically generated to service all
   * defined APIs.
   */
  endpoints?: Endpoint[];
  /**
   * A list of all enum types included in this API service. Enums referenced
   * directly or indirectly by the `apis` are automatically included. Enums
   * which are not referenced but shall be included should be listed here by
   * name by the configuration author. Example: enums: - name:
   * google.someapi.v1.SomeEnum
   */
  enums?: Enum[];
  /**
   * HTTP configuration.
   */
  http?: Http;
  /**
   * A unique ID for a specific instance of this message, typically assigned by
   * the client for tracking purpose. Must be no longer than 63 characters and
   * only lower case letters, digits, '.', '_' and '-' are allowed. If empty,
   * the server may choose to generate one instead.
   */
  id?: string;
  /**
   * Logging configuration.
   */
  logging?: Logging;
  /**
   * Defines the logs used by this service.
   */
  logs?: LogDescriptor[];
  /**
   * Defines the metrics used by this service.
   */
  metrics?: MetricDescriptor[];
  /**
   * Defines the monitored resources used by this service. This is required by
   * the Service.monitoring and Service.logging configurations.
   */
  monitoredResources?: MonitoredResourceDescriptor[];
  /**
   * Monitoring configuration.
   */
  monitoring?: Monitoring;
  /**
   * The service name, which is a DNS-like logical identifier for the service,
   * such as `calendar.googleapis.com`. The service name typically goes through
   * DNS verification to make sure the owner of the service also owns the DNS
   * name.
   */
  name?: string;
  /**
   * The Google project that owns this service.
   */
  producerProjectId?: string;
  /**
   * Settings for [Google Cloud Client
   * libraries](https://cloud.google.com/apis/docs/cloud-client-libraries)
   * generated from APIs defined as protocol buffers.
   */
  publishing?: Publishing;
  /**
   * Quota configuration.
   */
  quota?: Quota;
  /**
   * Output only. The source information for this configuration if available.
   */
  sourceInfo?: SourceInfo;
  /**
   * System parameter configuration.
   */
  systemParameters?: SystemParameters;
  /**
   * A list of all proto message types included in this API service. It serves
   * similar purpose as [google.api.Service.types], except that these types are
   * not needed by user-defined APIs. Therefore, they will not show up in the
   * generated discovery doc. This field should only be used to define system
   * APIs in ESF.
   */
  systemTypes?: Type[];
  /**
   * The product title for this service, it is the name displayed in Google
   * Cloud Console.
   */
  title?: string;
  /**
   * A list of all proto message types included in this API service. Types
   * referenced directly or indirectly by the `apis` are automatically included.
   * Messages which are not referenced but shall be included, such as types used
   * by the `google.protobuf.Any` type, should be listed here by name by the
   * configuration author. Example: types: - name: google.protobuf.Int32
   */
  types?: Type[];
  /**
   * Configuration controlling usage of this service.
   */
  usage?: Usage;
}

function serializeService(data: any): Service {
  return {
    ...data,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (serializeMetricDescriptor(item))) : undefined,
    publishing: data["publishing"] !== undefined ? serializePublishing(data["publishing"]) : undefined,
    quota: data["quota"] !== undefined ? serializeQuota(data["quota"]) : undefined,
  };
}

function deserializeService(data: any): Service {
  return {
    ...data,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (deserializeMetricDescriptor(item))) : undefined,
    publishing: data["publishing"] !== undefined ? deserializePublishing(data["publishing"]) : undefined,
    quota: data["quota"] !== undefined ? deserializeQuota(data["quota"]) : undefined,
  };
}

/**
 * Additional options for ServiceManagement#servicesConfigsGet.
 */
export interface ServicesConfigsGetOptions {
  /**
   * Specifies which parts of the Service Config should be returned in the
   * response.
   */
  view?:  | "BASIC" | "FULL";
}

/**
 * Additional options for ServiceManagement#servicesConfigsList.
 */
export interface ServicesConfigsListOptions {
  /**
   * The max number of items to include in the response list. Page size is 50
   * if not specified. Maximum value is 100.
   */
  pageSize?: number;
  /**
   * The token of the page to retrieve.
   */
  pageToken?: string;
}

/**
 * Additional options for ServiceManagement#servicesGetConfig.
 */
export interface ServicesGetConfigOptions {
  /**
   * Required. The id of the service configuration resource. This field must be
   * specified for the server to return all fields, including `SourceInfo`.
   */
  configId?: string;
  /**
   * Specifies which parts of the Service Config should be returned in the
   * response.
   */
  view?:  | "BASIC" | "FULL";
}

/**
 * Additional options for ServiceManagement#servicesList.
 */
export interface ServicesListOptions {
  /**
   * Include services consumed by the specified consumer. The Google Service
   * Management implementation accepts the following forms: - project:
   */
  consumerId?: string;
  /**
   * The max number of items to include in the response list. Page size is 50
   * if not specified. Maximum value is 500.
   */
  pageSize?: number;
  /**
   * Token identifying which result to start with; returned by a previous list
   * call.
   */
  pageToken?: string;
  /**
   * Include services produced by the specified project.
   */
  producerProjectId?: string;
}

/**
 * Additional options for ServiceManagement#servicesRolloutsList.
 */
export interface ServicesRolloutsListOptions {
  /**
   * Required. Use `filter` to return subset of rollouts. The following filters
   * are supported: -- By status. For example, `filter='status=SUCCESS'` -- By
   * strategy. For example, `filter='strategy=TrafficPercentStrategy'`
   */
  filter?: string;
  /**
   * The max number of items to include in the response list. Page size is 50
   * if not specified. Maximum value is 100.
   */
  pageSize?: number;
  /**
   * The token of the page to retrieve.
   */
  pageToken?: string;
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
 * `SourceContext` represents information about the source of a protobuf
 * element, like the file in which it is defined.
 */
export interface SourceContext {
  /**
   * The path-qualified name of the .proto file that contained the associated
   * protobuf element. For example: `"google/protobuf/source_context.proto"`.
   */
  fileName?: string;
}

/**
 * Source information used to create a Service Config
 */
export interface SourceInfo {
  /**
   * All files used during config generation.
   */
  sourceFiles?: {
    [key: string]: any
  }[];
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
 * Represents the status of one operation step.
 */
export interface Step {
  /**
   * The short description of the step.
   */
  description?: string;
  /**
   * The status code.
   */
  status?:  | "STATUS_UNSPECIFIED" | "DONE" | "NOT_STARTED" | "IN_PROGRESS" | "FAILED" | "CANCELLED";
}

/**
 * Request message for SubmitConfigSource method.
 */
export interface SubmitConfigSourceRequest {
  /**
   * Required. The source configuration for the service.
   */
  configSource?: ConfigSource;
  /**
   * Optional. If set, this will result in the generation of a
   * `google.api.Service` configuration based on the `ConfigSource` provided,
   * but the generated config and the sources will NOT be persisted.
   */
  validateOnly?: boolean;
}

function serializeSubmitConfigSourceRequest(data: any): SubmitConfigSourceRequest {
  return {
    ...data,
    configSource: data["configSource"] !== undefined ? serializeConfigSource(data["configSource"]) : undefined,
  };
}

function deserializeSubmitConfigSourceRequest(data: any): SubmitConfigSourceRequest {
  return {
    ...data,
    configSource: data["configSource"] !== undefined ? deserializeConfigSource(data["configSource"]) : undefined,
  };
}

/**
 * Response message for SubmitConfigSource method.
 */
export interface SubmitConfigSourceResponse {
  /**
   * The generated service configuration.
   */
  serviceConfig?: Service;
}

function serializeSubmitConfigSourceResponse(data: any): SubmitConfigSourceResponse {
  return {
    ...data,
    serviceConfig: data["serviceConfig"] !== undefined ? serializeService(data["serviceConfig"]) : undefined,
  };
}

function deserializeSubmitConfigSourceResponse(data: any): SubmitConfigSourceResponse {
  return {
    ...data,
    serviceConfig: data["serviceConfig"] !== undefined ? deserializeService(data["serviceConfig"]) : undefined,
  };
}

/**
 * Define a parameter's name and location. The parameter may be passed as
 * either an HTTP header or a URL query parameter, and if both are passed the
 * behavior is implementation-dependent.
 */
export interface SystemParameter {
  /**
   * Define the HTTP header name to use for the parameter. It is case
   * insensitive.
   */
  httpHeader?: string;
  /**
   * Define the name of the parameter, such as "api_key" . It is case
   * sensitive.
   */
  name?: string;
  /**
   * Define the URL query parameter name to use for the parameter. It is case
   * sensitive.
   */
  urlQueryParameter?: string;
}

/**
 * Define a system parameter rule mapping system parameter definitions to
 * methods.
 */
export interface SystemParameterRule {
  /**
   * Define parameters. Multiple names may be defined for a parameter. For a
   * given method call, only one of them should be used. If multiple names are
   * used the behavior is implementation-dependent. If none of the specified
   * names are present the behavior is parameter-dependent.
   */
  parameters?: SystemParameter[];
  /**
   * Selects the methods to which this rule applies. Use '*' to indicate all
   * methods in all APIs. Refer to selector for syntax details.
   */
  selector?: string;
}

/**
 * ### System parameter configuration A system parameter is a special kind of
 * parameter defined by the API system, not by an individual API. It is
 * typically mapped to an HTTP header and/or a URL query parameter. This
 * configuration specifies which methods change the names of the system
 * parameters.
 */
export interface SystemParameters {
  /**
   * Define system parameters. The parameters defined here will override the
   * default parameters implemented by the system. If this field is missing from
   * the service config, default system parameters will be used. Default system
   * parameters and names is implementation-dependent. Example: define api key
   * for all methods system_parameters rules: - selector: "*" parameters: -
   * name: api_key url_query_parameter: api_key Example: define 2 api key names
   * for a specific method. system_parameters rules: - selector: "/ListShelves"
   * parameters: - name: api_key http_header: Api-Key1 - name: api_key
   * http_header: Api-Key2 **NOTE:** All service configuration rules follow
   * "last one wins" order.
   */
  rules?: SystemParameterRule[];
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

/**
 * Strategy that specifies how clients of Google Service Controller want to
 * send traffic to use different config versions. This is generally used by API
 * proxy to split traffic based on your configured percentage for each config
 * version. One example of how to gradually rollout a new service configuration
 * using this strategy: Day 1 Rollout { id:
 * "example.googleapis.com/rollout_20160206" traffic_percent_strategy {
 * percentages: { "example.googleapis.com/20160201": 70.00
 * "example.googleapis.com/20160206": 30.00 } } } Day 2 Rollout { id:
 * "example.googleapis.com/rollout_20160207" traffic_percent_strategy: {
 * percentages: { "example.googleapis.com/20160206": 100.00 } } }
 */
export interface TrafficPercentStrategy {
  /**
   * Maps service configuration IDs to their corresponding traffic percentage.
   * Key is the service configuration ID, Value is the traffic percentage which
   * must be greater than 0.0 and the sum must equal to 100.0.
   */
  percentages?: {
    [key: string]: number
  };
}

/**
 * A protocol buffer message type.
 */
export interface Type {
  /**
   * The list of fields.
   */
  fields?: Field[];
  /**
   * The fully qualified message name.
   */
  name?: string;
  /**
   * The list of types appearing in `oneof` definitions in this type.
   */
  oneofs?: string[];
  /**
   * The protocol buffer options.
   */
  options?: Option[];
  /**
   * The source context.
   */
  sourceContext?: SourceContext;
  /**
   * The source syntax.
   */
  syntax?:  | "SYNTAX_PROTO2" | "SYNTAX_PROTO3";
}

/**
 * Response message for UndeleteService method.
 */
export interface UndeleteServiceResponse {
  /**
   * Revived service resource.
   */
  service?: ManagedService;
}

/**
 * Configuration controlling usage of a service.
 */
export interface Usage {
  /**
   * The full resource name of a channel used for sending notifications to the
   * service producer. Google Service Management currently only supports [Google
   * Cloud Pub/Sub](https://cloud.google.com/pubsub) as a notification channel.
   * To use Google Cloud Pub/Sub as the channel, this must be the name of a
   * Cloud Pub/Sub topic that uses the Cloud Pub/Sub topic name format
   * documented in https://cloud.google.com/pubsub/docs/overview.
   */
  producerNotificationChannel?: string;
  /**
   * Requirements that must be satisfied before a consumer project can use the
   * service. Each requirement is of the form /; for example
   * 'serviceusage.googleapis.com/billing-enabled'. For Google APIs, a Terms of
   * Service requirement must be included here. Google Cloud APIs must include
   * "serviceusage.googleapis.com/tos/cloud". Other Google APIs should include
   * "serviceusage.googleapis.com/tos/universal". Additional ToS can be included
   * based on the business needs.
   */
  requirements?: string[];
  /**
   * A list of usage rules that apply to individual API methods. **NOTE:** All
   * service configuration rules follow "last one wins" order.
   */
  rules?: UsageRule[];
}

/**
 * Usage configuration rules for the service. NOTE: Under development. Use this
 * rule to configure unregistered calls for the service. Unregistered calls are
 * calls that do not contain consumer project identity. (Example: calls that do
 * not contain an API key). By default, API methods do not allow unregistered
 * calls, and each method call must be identified by a consumer project
 * identity. Use this rule to allow/disallow unregistered calls. Example of an
 * API that wants to allow unregistered calls for entire service. usage: rules:
 * - selector: "*" allow_unregistered_calls: true Example of a method that wants
 * to allow unregistered calls. usage: rules: - selector:
 * "google.example.library.v1.LibraryService.CreateBook"
 * allow_unregistered_calls: true
 */
export interface UsageRule {
  /**
   * If true, the selected method allows unregistered calls, e.g. calls that
   * don't identify any user or application.
   */
  allowUnregisteredCalls?: boolean;
  /**
   * Selects the methods to which this rule applies. Use '*' to indicate all
   * methods in all APIs. Refer to selector for syntax details.
   */
  selector?: string;
  /**
   * If true, the selected method should skip service control and the control
   * plane features, such as quota and billing, will not be available. This flag
   * is used by Google Cloud Endpoints to bypass checks for internal methods,
   * such as service health check methods.
   */
  skipServiceControl?: boolean;
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