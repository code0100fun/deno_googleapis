// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Domains API Client for Deno
 * =================================
 * 
 * Enables management and configuration of domain names.
 * 
 * Docs: https://cloud.google.com/domains/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Enables management and configuration of domain names.
 */
export class Domains {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://domains.googleapis.com/") {
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
   * Updates a `Registration`'s contact settings. Some changes require
   * confirmation by the domain's registrant contact .
   *
   * @param registration Required. The name of the `Registration` whose contact settings are being updated, in the format `projects/*\/locations/*\/registrations/*`.
   */
  async projectsLocationsRegistrationsConfigureContactSettings(registration: string, req: ConfigureContactSettingsRequest): Promise<Operation> {
    req = serializeConfigureContactSettingsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ registration }:configureContactSettings`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates a `Registration`'s DNS settings.
   *
   * @param registration Required. The name of the `Registration` whose DNS settings are being updated, in the format `projects/*\/locations/*\/registrations/*`.
   */
  async projectsLocationsRegistrationsConfigureDnsSettings(registration: string, req: ConfigureDnsSettingsRequest): Promise<Operation> {
    req = serializeConfigureDnsSettingsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ registration }:configureDnsSettings`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates a `Registration`'s management settings.
   *
   * @param registration Required. The name of the `Registration` whose management settings are being updated, in the format `projects/*\/locations/*\/registrations/*`.
   */
  async projectsLocationsRegistrationsConfigureManagementSettings(registration: string, req: ConfigureManagementSettingsRequest): Promise<Operation> {
    req = serializeConfigureManagementSettingsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ registration }:configureManagementSettings`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a `Registration` resource. This method works on any `Registration`
   * resource using [Subscription or Commitment
   * billing](/domains/pricing#billing-models), provided that the resource was
   * created at least 1 day in the past. For `Registration` resources using
   * [Monthly billing](/domains/pricing#billing-models), this method works if: *
   * `state` is `EXPORTED` with `expire_time` in the past * `state` is
   * `REGISTRATION_FAILED` * `state` is `TRANSFER_FAILED` When an active
   * registration is successfully deleted, you can continue to use the domain in
   * [Google Domains](https://domains.google/) until it expires. The calling
   * user becomes the domain's sole owner in Google Domains, and permissions for
   * the domain are subsequently managed there. The domain does not renew
   * automatically unless the new owner sets up billing in Google Domains.
   *
   * @param name Required. The name of the `Registration` to delete, in the format `projects/*\/locations/*\/registrations/*`.
   */
  async projectsLocationsRegistrationsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Exports a `Registration` resource, such that it is no longer managed by
   * Cloud Domains. When an active domain is successfully exported, you can
   * continue to use the domain in [Google Domains](https://domains.google/)
   * until it expires. The calling user becomes the domain's sole owner in
   * Google Domains, and permissions for the domain are subsequently managed
   * there. The domain does not renew automatically unless the new owner sets up
   * billing in Google Domains.
   *
   * @param name Required. The name of the `Registration` to export, in the format `projects/*\/locations/*\/registrations/*`.
   */
  async projectsLocationsRegistrationsExport(name: string, req: ExportRegistrationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:export`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the details of a `Registration` resource.
   *
   * @param name Required. The name of the `Registration` to get, in the format `projects/*\/locations/*\/registrations/*`.
   */
  async projectsLocationsRegistrationsGet(name: string): Promise<Registration> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Registration;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRegistrationsGetIamPolicy(resource: string, opts: ProjectsLocationsRegistrationsGetIamPolicyOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
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
   * Imports a domain name from [Google Domains](https://domains.google/) for
   * use in Cloud Domains. To transfer a domain from another registrar, use the
   * `TransferDomain` method instead. Since individual users can own domains in
   * Google Domains, the calling user must have ownership permission on the
   * domain.
   *
   * @param parent Required. The parent resource of the Registration. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsRegistrationsImport(parent: string, req: ImportDomainRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/registrations:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists the `Registration` resources in a project.
   *
   * @param parent Required. The project and location from which to list `Registration`s, specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsRegistrationsList(parent: string, opts: ProjectsLocationsRegistrationsListOptions = {}): Promise<ListRegistrationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/registrations`);
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
    return data as ListRegistrationsResponse;
  }

  /**
   * Updates select fields of a `Registration` resource, notably `labels`. To
   * update other fields, use the appropriate custom update method: * To update
   * management settings, see `ConfigureManagementSettings` * To update DNS
   * configuration, see `ConfigureDnsSettings` * To update contact information,
   * see `ConfigureContactSettings`
   *
   * @param name Output only. Name of the `Registration` resource, in the format `projects/*\/locations/*\/registrations/`.
   */
  async projectsLocationsRegistrationsPatch(name: string, req: Registration, opts: ProjectsLocationsRegistrationsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsRegistrationsPatchOptions(opts);
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
    return data as Operation;
  }

  /**
   * Registers a new domain name and creates a corresponding `Registration`
   * resource. Call `RetrieveRegisterParameters` first to check availability of
   * the domain name and determine parameters like price that are needed to
   * build a call to this method. A successful call creates a `Registration`
   * resource in state `REGISTRATION_PENDING`, which resolves to `ACTIVE` within
   * 1-2 minutes, indicating that the domain was successfully registered. If the
   * resource ends up in state `REGISTRATION_FAILED`, it indicates that the
   * domain was not registered successfully, and you can safely delete the
   * resource and retry registration.
   *
   * @param parent Required. The parent resource of the `Registration`. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsRegistrationsRegister(parent: string, req: RegisterDomainRequest): Promise<Operation> {
    req = serializeRegisterDomainRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/registrations:register`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Resets the authorization code of the `Registration` to a new random
   * string. You can call this method only after 60 days have elapsed since the
   * initial domain registration.
   *
   * @param registration Required. The name of the `Registration` whose authorization code is being reset, in the format `projects/*\/locations/*\/registrations/*`.
   */
  async projectsLocationsRegistrationsResetAuthorizationCode(registration: string, req: ResetAuthorizationCodeRequest): Promise<AuthorizationCode> {
    const url = new URL(`${this.#baseUrl}v1/${ registration }:resetAuthorizationCode`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AuthorizationCode;
  }

  /**
   * Gets the authorization code of the `Registration` for the purpose of
   * transferring the domain to another registrar. You can call this method only
   * after 60 days have elapsed since the initial domain registration.
   *
   * @param registration Required. The name of the `Registration` whose authorization code is being retrieved, in the format `projects/*\/locations/*\/registrations/*`.
   */
  async projectsLocationsRegistrationsRetrieveAuthorizationCode(registration: string): Promise<AuthorizationCode> {
    const url = new URL(`${this.#baseUrl}v1/${ registration }:retrieveAuthorizationCode`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AuthorizationCode;
  }

  /**
   * Lists domain names from [Google Domains](https://domains.google/) that can
   * be imported to Cloud Domains using the `ImportDomain` method. Since
   * individual users can own domains in Google Domains, the list of domains
   * returned depends on the individual user making the call. Domains already
   * managed by Cloud Domains are not returned.
   *
   * @param location Required. The location. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsRegistrationsRetrieveImportableDomains(location: string, opts: ProjectsLocationsRegistrationsRetrieveImportableDomainsOptions = {}): Promise<RetrieveImportableDomainsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ location }/registrations:retrieveImportableDomains`);
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
    return deserializeRetrieveImportableDomainsResponse(data);
  }

  /**
   * Gets parameters needed to register a new domain name, including price and
   * up-to-date availability. Use the returned values to call `RegisterDomain`.
   *
   * @param location Required. The location. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsRegistrationsRetrieveRegisterParameters(location: string, opts: ProjectsLocationsRegistrationsRetrieveRegisterParametersOptions = {}): Promise<RetrieveRegisterParametersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ location }/registrations:retrieveRegisterParameters`);
    if (opts.domainName !== undefined) {
      url.searchParams.append("domainName", String(opts.domainName));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRetrieveRegisterParametersResponse(data);
  }

  /**
   * Gets parameters needed to transfer a domain name from another registrar to
   * Cloud Domains. For domains already managed by [Google
   * Domains](https://domains.google/), use `ImportDomain` instead. Use the
   * returned values to call `TransferDomain`.
   *
   * @param location Required. The location. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsRegistrationsRetrieveTransferParameters(location: string, opts: ProjectsLocationsRegistrationsRetrieveTransferParametersOptions = {}): Promise<RetrieveTransferParametersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ location }/registrations:retrieveTransferParameters`);
    if (opts.domainName !== undefined) {
      url.searchParams.append("domainName", String(opts.domainName));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeRetrieveTransferParametersResponse(data);
  }

  /**
   * Searches for available domain names similar to the provided query.
   * Availability results from this method are approximate; call
   * `RetrieveRegisterParameters` on a domain before registering to confirm
   * availability.
   *
   * @param location Required. The location. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsRegistrationsSearchDomains(location: string, opts: ProjectsLocationsRegistrationsSearchDomainsOptions = {}): Promise<SearchDomainsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ location }/registrations:searchDomains`);
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSearchDomainsResponse(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsRegistrationsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsRegistrationsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Transfers a domain name from another registrar to Cloud Domains. For
   * domains already managed by [Google Domains](https://domains.google/), use
   * `ImportDomain` instead. Before calling this method, go to the domain's
   * current registrar to unlock the domain for transfer and retrieve the
   * domain's transfer authorization code. Then call
   * `RetrieveTransferParameters` to confirm that the domain is unlocked and to
   * get values needed to build a call to this method. A successful call creates
   * a `Registration` resource in state `TRANSFER_PENDING`. It can take several
   * days to complete the transfer process. The registrant can often speed up
   * this process by approving the transfer through the current registrar,
   * either by clicking a link in an email from the registrar or by visiting the
   * registrar's website. A few minutes after transfer approval, the resource
   * transitions to state `ACTIVE`, indicating that the transfer was successful.
   * If the transfer is rejected or the request expires without being approved,
   * the resource can end up in state `TRANSFER_FAILED`. If transfer fails, you
   * can safely delete the resource and retry the transfer.
   *
   * @param parent Required. The parent resource of the `Registration`. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsRegistrationsTransfer(parent: string, req: TransferDomainRequest): Promise<Operation> {
    req = serializeTransferDomainRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/registrations:transfer`);
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
 * Defines an authorization code.
 */
export interface AuthorizationCode {
  /**
   * The Authorization Code in ASCII. It can be used to transfer the domain to
   * or from another registrar.
   */
  code?: string;
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
 * Request for the `ConfigureContactSettings` method.
 */
export interface ConfigureContactSettingsRequest {
  /**
   * The list of contact notices that the caller acknowledges. The notices
   * needed here depend on the values specified in `contact_settings`.
   */
  contactNotices?:  | "CONTACT_NOTICE_UNSPECIFIED" | "PUBLIC_CONTACT_DATA_ACKNOWLEDGEMENT"[];
  /**
   * Fields of the `ContactSettings` to update.
   */
  contactSettings?: ContactSettings;
  /**
   * Required. The field mask describing which fields to update as a
   * comma-separated list. For example, if only the registrant contact is being
   * updated, the `update_mask` is `"registrant_contact"`.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Validate the request without actually updating the contact settings.
   */
  validateOnly?: boolean;
}

function serializeConfigureContactSettingsRequest(data: any): ConfigureContactSettingsRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeConfigureContactSettingsRequest(data: any): ConfigureContactSettingsRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request for the `ConfigureDnsSettings` method.
 */
export interface ConfigureDnsSettingsRequest {
  /**
   * Fields of the `DnsSettings` to update.
   */
  dnsSettings?: DnsSettings;
  /**
   * Required. The field mask describing which fields to update as a
   * comma-separated list. For example, if only the name servers are being
   * updated for an existing Custom DNS configuration, the `update_mask` is
   * `"custom_dns.name_servers"`. When changing the DNS provider from one type
   * to another, pass the new provider's field name as part of the field mask.
   * For example, when changing from a Google Domains DNS configuration to a
   * Custom DNS configuration, the `update_mask` is `"custom_dns"`. //
   */
  updateMask?: string /* FieldMask */;
  /**
   * Validate the request without actually updating the DNS settings.
   */
  validateOnly?: boolean;
}

function serializeConfigureDnsSettingsRequest(data: any): ConfigureDnsSettingsRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeConfigureDnsSettingsRequest(data: any): ConfigureDnsSettingsRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request for the `ConfigureManagementSettings` method.
 */
export interface ConfigureManagementSettingsRequest {
  /**
   * Fields of the `ManagementSettings` to update.
   */
  managementSettings?: ManagementSettings;
  /**
   * Required. The field mask describing which fields to update as a
   * comma-separated list. For example, if only the transfer lock is being
   * updated, the `update_mask` is `"transfer_lock_state"`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeConfigureManagementSettingsRequest(data: any): ConfigureManagementSettingsRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeConfigureManagementSettingsRequest(data: any): ConfigureManagementSettingsRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Details required for a contact associated with a `Registration`.
 */
export interface Contact {
  /**
   * Required. Email address of the contact.
   */
  email?: string;
  /**
   * Fax number of the contact in international format. For example,
   * `"+1-800-555-0123"`.
   */
  faxNumber?: string;
  /**
   * Required. Phone number of the contact in international format. For
   * example, `"+1-800-555-0123"`.
   */
  phoneNumber?: string;
  /**
   * Required. Postal address of the contact.
   */
  postalAddress?: PostalAddress;
}

/**
 * Defines the contact information associated with a `Registration`.
 * [ICANN](https://icann.org/) requires all domain names to have associated
 * contact information. The `registrant_contact` is considered the domain's
 * legal owner, and often the other contacts are identical.
 */
export interface ContactSettings {
  /**
   * Required. The administrative contact for the `Registration`.
   */
  adminContact?: Contact;
  /**
   * Required. Privacy setting for the contacts associated with the
   * `Registration`.
   */
  privacy?:  | "CONTACT_PRIVACY_UNSPECIFIED" | "PUBLIC_CONTACT_DATA" | "PRIVATE_CONTACT_DATA" | "REDACTED_CONTACT_DATA";
  /**
   * Required. The registrant contact for the `Registration`. *Caution: Anyone
   * with access to this email address, phone number, and/or postal address can
   * take control of the domain.* *Warning: For new `Registration`s, the
   * registrant receives an email confirmation that they must complete within 15
   * days to avoid domain suspension.*
   */
  registrantContact?: Contact;
  /**
   * Required. The technical contact for the `Registration`.
   */
  technicalContact?: Contact;
}

/**
 * Configuration for an arbitrary DNS provider.
 */
export interface CustomDns {
  /**
   * The list of DS records for this domain, which are used to enable DNSSEC.
   * The domain's DNS provider can provide the values to set here. If this field
   * is empty, DNSSEC is disabled.
   */
  dsRecords?: DsRecord[];
  /**
   * Required. A list of name servers that store the DNS zone for this domain.
   * Each name server is a domain name, with Unicode domain names expressed in
   * Punycode format.
   */
  nameServers?: string[];
}

/**
 * Defines the DNS configuration of a `Registration`, including name servers,
 * DNSSEC, and glue records.
 */
export interface DnsSettings {
  /**
   * An arbitrary DNS provider identified by its name servers.
   */
  customDns?: CustomDns;
  /**
   * The list of glue records for this `Registration`. Commonly empty.
   */
  glueRecords?: GlueRecord[];
  /**
   * The free DNS zone provided by [Google Domains](https://domains.google/).
   */
  googleDomainsDns?: GoogleDomainsDns;
}

/**
 * A domain that the calling user manages in Google Domains.
 */
export interface Domain {
  /**
   * The domain name. Unicode domain names are expressed in Punycode format.
   */
  domainName?: string;
  /**
   * The state of this domain as a `Registration` resource.
   */
  resourceState?:  | "RESOURCE_STATE_UNSPECIFIED" | "IMPORTABLE" | "UNSUPPORTED" | "SUSPENDED" | "EXPIRED" | "DELETED";
  /**
   * Price to renew the domain for one year. Only set when `resource_state` is
   * `IMPORTABLE`.
   */
  yearlyPrice?: Money;
}

function serializeDomain(data: any): Domain {
  return {
    ...data,
    yearlyPrice: data["yearlyPrice"] !== undefined ? serializeMoney(data["yearlyPrice"]) : undefined,
  };
}

function deserializeDomain(data: any): Domain {
  return {
    ...data,
    yearlyPrice: data["yearlyPrice"] !== undefined ? deserializeMoney(data["yearlyPrice"]) : undefined,
  };
}

/**
 * Defines a Delegation Signer (DS) record, which is needed to enable DNSSEC
 * for a domain. It contains a digest (hash) of a DNSKEY record that must be
 * present in the domain's DNS zone.
 */
export interface DsRecord {
  /**
   * The algorithm used to generate the referenced DNSKEY.
   */
  algorithm?:  | "ALGORITHM_UNSPECIFIED" | "RSAMD5" | "DH" | "DSA" | "ECC" | "RSASHA1" | "DSANSEC3SHA1" | "RSASHA1NSEC3SHA1" | "RSASHA256" | "RSASHA512" | "ECCGOST" | "ECDSAP256SHA256" | "ECDSAP384SHA384" | "ED25519" | "ED448" | "INDIRECT" | "PRIVATEDNS" | "PRIVATEOID";
  /**
   * The digest generated from the referenced DNSKEY.
   */
  digest?: string;
  /**
   * The hash function used to generate the digest of the referenced DNSKEY.
   */
  digestType?:  | "DIGEST_TYPE_UNSPECIFIED" | "SHA1" | "SHA256" | "GOST3411" | "SHA384";
  /**
   * The key tag of the record. Must be set in range 0 -- 65535.
   */
  keyTag?: number;
}

/**
 * Request for the `ExportRegistration` method.
 */
export interface ExportRegistrationRequest {
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
 * Defines a host on your domain that is a DNS name server for your domain
 * and/or other domains. Glue records are a way of making the IP address of a
 * name server known, even when it serves DNS queries for its parent domain. For
 * example, when `ns.example.com` is a name server for `example.com`, the host
 * `ns.example.com` must have a glue record to break the circular DNS reference.
 */
export interface GlueRecord {
  /**
   * Required. Domain name of the host in Punycode format.
   */
  hostName?: string;
  /**
   * List of IPv4 addresses corresponding to this host in the standard decimal
   * format (e.g. `198.51.100.1`). At least one of `ipv4_address` and
   * `ipv6_address` must be set.
   */
  ipv4Addresses?: string[];
  /**
   * List of IPv6 addresses corresponding to this host in the standard
   * hexadecimal format (e.g. `2001:db8::`). At least one of `ipv4_address` and
   * `ipv6_address` must be set.
   */
  ipv6Addresses?: string[];
}

/**
 * Configuration for using the free DNS zone provided by Google Domains as a
 * `Registration`'s `dns_provider`. You cannot configure the DNS zone itself
 * using the API. To configure the DNS zone, go to [Google
 * Domains](https://domains.google/).
 */
export interface GoogleDomainsDns {
  /**
   * Output only. The list of DS records published for this domain. The list is
   * automatically populated when `ds_state` is `DS_RECORDS_PUBLISHED`,
   * otherwise it remains empty.
   */
  readonly dsRecords?: DsRecord[];
  /**
   * Required. The state of DS records for this domain. Used to enable or
   * disable automatic DNSSEC.
   */
  dsState?:  | "DS_STATE_UNSPECIFIED" | "DS_RECORDS_UNPUBLISHED" | "DS_RECORDS_PUBLISHED";
  /**
   * Output only. A list of name servers that store the DNS zone for this
   * domain. Each name server is a domain name, with Unicode domain names
   * expressed in Punycode format. This field is automatically populated with
   * the name servers assigned to the Google Domains DNS zone.
   */
  readonly nameServers?: string[];
}

/**
 * Request for the `ImportDomain` method.
 */
export interface ImportDomainRequest {
  /**
   * Required. The domain name. Unicode domain names must be expressed in
   * Punycode format.
   */
  domainName?: string;
  /**
   * Set of labels associated with the `Registration`.
   */
  labels?: {
    [key: string]: string
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
 * Response for the `ListRegistrations` method.
 */
export interface ListRegistrationsResponse {
  /**
   * When present, there are more results to retrieve. Set `page_token` to this
   * value on a subsequent call to get the next page of results.
   */
  nextPageToken?: string;
  /**
   * A list of `Registration`s.
   */
  registrations?: Registration[];
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
 * Defines renewal, billing, and transfer settings for a `Registration`.
 */
export interface ManagementSettings {
  /**
   * Output only. The renewal method for this `Registration`.
   */
  readonly renewalMethod?:  | "RENEWAL_METHOD_UNSPECIFIED" | "AUTOMATIC_RENEWAL" | "MANUAL_RENEWAL";
  /**
   * Controls whether the domain can be transferred to another registrar.
   */
  transferLockState?:  | "TRANSFER_LOCK_STATE_UNSPECIFIED" | "UNLOCKED" | "LOCKED";
}

/**
 * Represents an amount of money with its currency type.
 */
export interface Money {
  /**
   * The three-letter currency code defined in ISO 4217.
   */
  currencyCode?: string;
  /**
   * Number of nano (10^-9) units of the amount. The value must be between
   * -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos`
   * must be positive or zero. If `units` is zero, `nanos` can be positive,
   * zero, or negative. If `units` is negative, `nanos` must be negative or
   * zero. For example $-1.75 is represented as `units`=-1 and
   * `nanos`=-750,000,000.
   */
  nanos?: number;
  /**
   * The whole units of the amount. For example if `currencyCode` is `"USD"`,
   * then 1 unit is one US dollar.
   */
  units?: bigint;
}

function serializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? String(data["units"]) : undefined,
  };
}

function deserializeMoney(data: any): Money {
  return {
    ...data,
    units: data["units"] !== undefined ? BigInt(data["units"]) : undefined,
  };
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
 * Represents the metadata of the long-running operation. Output only.
 */
export interface OperationMetadata {
  /**
   * API version used to start the operation.
   */
  apiVersion?: string;
  /**
   * The time the operation was created.
   */
  createTime?: Date;
  /**
   * The time the operation finished running.
   */
  endTime?: Date;
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

function serializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeOperationMetadata(data: any): OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
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
 * Represents a postal address, e.g. for postal delivery or payments addresses.
 * Given a postal address, a postal service can deliver items to a premise, P.O.
 * Box or similar. It is not intended to model geographical locations (roads,
 * towns, mountains). In typical usage an address would be created via user
 * input or from importing existing data, depending on the type of process.
 * Advice on address input / editing: - Use an internationalization-ready
 * address widget such as https://github.com/google/libaddressinput) - Users
 * should not be presented with UI elements for input or editing of fields
 * outside countries where that field is used. For more guidance on how to use
 * this schema, please see: https://support.google.com/business/answer/6397478
 */
export interface PostalAddress {
  /**
   * Unstructured address lines describing the lower levels of an address.
   * Because values in address_lines do not have type information and may
   * sometimes contain multiple values in a single field (e.g. "Austin, TX"), it
   * is important that the line order is clear. The order of address lines
   * should be "envelope order" for the country/region of the address. In places
   * where this can vary (e.g. Japan), address_language is used to make it
   * explicit (e.g. "ja" for large-to-small ordering and "ja-Latn" or "en" for
   * small-to-large). This way, the most specific line of an address can be
   * selected based on the language. The minimum permitted structural
   * representation of an address consists of a region_code with all remaining
   * information placed in the address_lines. It would be possible to format
   * such an address very approximately without geocoding, but no semantic
   * reasoning could be made about any of the address components until it was at
   * least partially resolved. Creating an address only containing a region_code
   * and address_lines, and then geocoding is the recommended way to handle
   * completely unstructured addresses (as opposed to guessing which parts of
   * the address should be localities or administrative areas).
   */
  addressLines?: string[];
  /**
   * Optional. Highest administrative subdivision which is used for postal
   * addresses of a country or region. For example, this can be a state, a
   * province, an oblast, or a prefecture. Specifically, for Spain this is the
   * province and not the autonomous community (e.g. "Barcelona" and not
   * "Catalonia"). Many countries don't use an administrative area in postal
   * addresses. E.g. in Switzerland this should be left unpopulated.
   */
  administrativeArea?: string;
  /**
   * Optional. BCP-47 language code of the contents of this address (if known).
   * This is often the UI language of the input form or is expected to match one
   * of the languages used in the address' country/region, or their
   * transliterated equivalents. This can affect formatting in certain
   * countries, but is not critical to the correctness of the data and will
   * never affect any validation or other non-formatting related operations. If
   * this value is not known, it should be omitted (rather than specifying a
   * possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".
   */
  languageCode?: string;
  /**
   * Optional. Generally refers to the city/town portion of the address.
   * Examples: US city, IT comune, UK post town. In regions of the world where
   * localities are not well defined or do not fit into this structure well,
   * leave locality empty and use address_lines.
   */
  locality?: string;
  /**
   * Optional. The name of the organization at the address.
   */
  organization?: string;
  /**
   * Optional. Postal code of the address. Not all countries use or require
   * postal codes to be present, but where they are used, they may trigger
   * additional validation with other parts of the address (e.g. state/zip
   * validation in the U.S.A.).
   */
  postalCode?: string;
  /**
   * Optional. The recipient at the address. This field may, under certain
   * circumstances, contain multiline information. For example, it might contain
   * "care of" information.
   */
  recipients?: string[];
  /**
   * Required. CLDR region code of the country/region of the address. This is
   * never inferred and it is up to the user to ensure the value is correct. See
   * https://cldr.unicode.org/ and
   * https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html
   * for details. Example: "CH" for Switzerland.
   */
  regionCode?: string;
  /**
   * The schema revision of the `PostalAddress`. This must be set to 0, which
   * is the latest revision. All new revisions **must** be backward compatible
   * with old revisions.
   */
  revision?: number;
  /**
   * Optional. Additional, country-specific, sorting code. This is not used in
   * most regions. Where it is used, the value is either a string like "CEDEX",
   * optionally followed by a number (e.g. "CEDEX 7"), or just a number alone,
   * representing the "sector code" (Jamaica), "delivery area indicator"
   * (Malawi) or "post office indicator" (e.g. Côte d'Ivoire).
   */
  sortingCode?: string;
  /**
   * Optional. Sublocality of the address. For example, this can be
   * neighborhoods, boroughs, districts.
   */
  sublocality?: string;
}

/**
 * Additional options for Domains#projectsLocationsList.
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
 * Additional options for Domains#projectsLocationsOperationsList.
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
 * Additional options for Domains#projectsLocationsRegistrationsGetIamPolicy.
 */
export interface ProjectsLocationsRegistrationsGetIamPolicyOptions {
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
 * Additional options for Domains#projectsLocationsRegistrationsList.
 */
export interface ProjectsLocationsRegistrationsListOptions {
  /**
   * Filter expression to restrict the `Registration`s returned. The expression
   * must specify the field name, a comparison operator, and the value that you
   * want to use for filtering. The value must be a string, a number, a boolean,
   * or an enum value. The comparison operator should be one of =, !=, >, <, >=,
   * <=, or : for prefix or wildcard matches. For example, to filter to a
   * specific domain name, use an expression like `domainName="example.com"`.
   * You can also check for the existence of a field; for example, to find
   * domains using custom DNS settings, use an expression like
   * `dnsSettings.customDns:*`. You can also create compound filters by
   * combining expressions with the `AND` and `OR` operators. For example, to
   * find domains that are suspended or have specific issues flagged, use an
   * expression like `(state=SUSPENDED) OR (issue:*)`.
   */
  filter?: string;
  /**
   * Maximum number of results to return.
   */
  pageSize?: number;
  /**
   * When set to the `next_page_token` from a prior response, provides the next
   * page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for Domains#projectsLocationsRegistrationsPatch.
 */
export interface ProjectsLocationsRegistrationsPatchOptions {
  /**
   * Required. The field mask describing which fields to update as a
   * comma-separated list. For example, if only the labels are being updated,
   * the `update_mask` is `"labels"`.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsRegistrationsPatchOptions(data: any): ProjectsLocationsRegistrationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsRegistrationsPatchOptions(data: any): ProjectsLocationsRegistrationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Domains#projectsLocationsRegistrationsRetrieveImportableDomains.
 */
export interface ProjectsLocationsRegistrationsRetrieveImportableDomainsOptions {
  /**
   * Maximum number of results to return.
   */
  pageSize?: number;
  /**
   * When set to the `next_page_token` from a prior response, provides the next
   * page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Domains#projectsLocationsRegistrationsRetrieveRegisterParameters.
 */
export interface ProjectsLocationsRegistrationsRetrieveRegisterParametersOptions {
  /**
   * Required. The domain name. Unicode domain names must be expressed in
   * Punycode format.
   */
  domainName?: string;
}

/**
 * Additional options for
 * Domains#projectsLocationsRegistrationsRetrieveTransferParameters.
 */
export interface ProjectsLocationsRegistrationsRetrieveTransferParametersOptions {
  /**
   * Required. The domain name. Unicode domain names must be expressed in
   * Punycode format.
   */
  domainName?: string;
}

/**
 * Additional options for Domains#projectsLocationsRegistrationsSearchDomains.
 */
export interface ProjectsLocationsRegistrationsSearchDomainsOptions {
  /**
   * Required. String used to search for available domain names.
   */
  query?: string;
}

/**
 * Request for the `RegisterDomain` method.
 */
export interface RegisterDomainRequest {
  /**
   * The list of contact notices that the caller acknowledges. The notices
   * needed here depend on the values specified in
   * `registration.contact_settings`.
   */
  contactNotices?:  | "CONTACT_NOTICE_UNSPECIFIED" | "PUBLIC_CONTACT_DATA_ACKNOWLEDGEMENT"[];
  /**
   * The list of domain notices that you acknowledge. Call
   * `RetrieveRegisterParameters` to see the notices that need acknowledgement.
   */
  domainNotices?:  | "DOMAIN_NOTICE_UNSPECIFIED" | "HSTS_PRELOADED"[];
  /**
   * Required. The complete `Registration` resource to be created.
   */
  registration?: Registration;
  /**
   * When true, only validation is performed, without actually registering the
   * domain. Follows:
   * https://cloud.google.com/apis/design/design_patterns#request_validation
   */
  validateOnly?: boolean;
  /**
   * Required. Yearly price to register or renew the domain. The value that
   * should be put here can be obtained from RetrieveRegisterParameters or
   * SearchDomains calls.
   */
  yearlyPrice?: Money;
}

function serializeRegisterDomainRequest(data: any): RegisterDomainRequest {
  return {
    ...data,
    yearlyPrice: data["yearlyPrice"] !== undefined ? serializeMoney(data["yearlyPrice"]) : undefined,
  };
}

function deserializeRegisterDomainRequest(data: any): RegisterDomainRequest {
  return {
    ...data,
    yearlyPrice: data["yearlyPrice"] !== undefined ? deserializeMoney(data["yearlyPrice"]) : undefined,
  };
}

/**
 * Parameters required to register a new domain.
 */
export interface RegisterParameters {
  /**
   * Indicates whether the domain is available for registration. This value is
   * accurate when obtained by calling `RetrieveRegisterParameters`, but is
   * approximate when obtained by calling `SearchDomains`.
   */
  availability?:  | "AVAILABILITY_UNSPECIFIED" | "AVAILABLE" | "UNAVAILABLE" | "UNSUPPORTED" | "UNKNOWN";
  /**
   * The domain name. Unicode domain names are expressed in Punycode format.
   */
  domainName?: string;
  /**
   * Notices about special properties of the domain.
   */
  domainNotices?:  | "DOMAIN_NOTICE_UNSPECIFIED" | "HSTS_PRELOADED"[];
  /**
   * Contact privacy options that the domain supports.
   */
  supportedPrivacy?:  | "CONTACT_PRIVACY_UNSPECIFIED" | "PUBLIC_CONTACT_DATA" | "PRIVATE_CONTACT_DATA" | "REDACTED_CONTACT_DATA"[];
  /**
   * Price to register or renew the domain for one year.
   */
  yearlyPrice?: Money;
}

function serializeRegisterParameters(data: any): RegisterParameters {
  return {
    ...data,
    yearlyPrice: data["yearlyPrice"] !== undefined ? serializeMoney(data["yearlyPrice"]) : undefined,
  };
}

function deserializeRegisterParameters(data: any): RegisterParameters {
  return {
    ...data,
    yearlyPrice: data["yearlyPrice"] !== undefined ? deserializeMoney(data["yearlyPrice"]) : undefined,
  };
}

/**
 * The `Registration` resource facilitates managing and configuring domain name
 * registrations. There are several ways to create a new `Registration`
 * resource: To create a new `Registration` resource, find a suitable domain
 * name by calling the `SearchDomains` method with a query to see available
 * domain name options. After choosing a name, call `RetrieveRegisterParameters`
 * to ensure availability and obtain information like pricing, which is needed
 * to build a call to `RegisterDomain`. Another way to create a new
 * `Registration` is to transfer an existing domain from another registrar.
 * First, go to the current registrar to unlock the domain for transfer and
 * retrieve the domain's transfer authorization code. Then call
 * `RetrieveTransferParameters` to confirm that the domain is unlocked and to
 * get values needed to build a call to `TransferDomain`. Finally, you can
 * create a new `Registration` by importing an existing domain managed with
 * [Google Domains](https://domains.google/). First, call
 * `RetrieveImportableDomains` to list domains to which the calling user has
 * sufficient access. Then call `ImportDomain` on any domain names you want to
 * use with Cloud Domains.
 */
export interface Registration {
  /**
   * Required. Settings for contact information linked to the `Registration`.
   * You cannot update these with the `UpdateRegistration` method. To update
   * these settings, use the `ConfigureContactSettings` method.
   */
  contactSettings?: ContactSettings;
  /**
   * Output only. The creation timestamp of the `Registration` resource.
   */
  readonly createTime?: Date;
  /**
   * Settings controlling the DNS configuration of the `Registration`. You
   * cannot update these with the `UpdateRegistration` method. To update these
   * settings, use the `ConfigureDnsSettings` method.
   */
  dnsSettings?: DnsSettings;
  /**
   * Required. Immutable. The domain name. Unicode domain names must be
   * expressed in Punycode format.
   */
  domainName?: string;
  /**
   * Output only. The expiration timestamp of the `Registration`.
   */
  readonly expireTime?: Date;
  /**
   * Output only. The set of issues with the `Registration` that require
   * attention.
   */
  readonly issues?:  | "ISSUE_UNSPECIFIED" | "CONTACT_SUPPORT" | "UNVERIFIED_EMAIL"[];
  /**
   * Set of labels associated with the `Registration`.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Settings for management of the `Registration`, including renewal, billing,
   * and transfer. You cannot update these with the `UpdateRegistration` method.
   * To update these settings, use the `ConfigureManagementSettings` method.
   */
  managementSettings?: ManagementSettings;
  /**
   * Output only. Name of the `Registration` resource, in the format
   * `projects/*\/locations/*\/registrations/`.
   */
  readonly name?: string;
  /**
   * Output only. Pending contact settings for the `Registration`. Updates to
   * the `contact_settings` field that change its `registrant_contact` or
   * `privacy` fields require email confirmation by the `registrant_contact`
   * before taking effect. This field is set only if there are pending updates
   * to the `contact_settings` that have not been confirmed. To confirm the
   * changes, the `registrant_contact` must follow the instructions in the email
   * they receive.
   */
  readonly pendingContactSettings?: ContactSettings;
  /**
   * Output only. The reason the domain registration failed. Only set for
   * domains in REGISTRATION_FAILED state.
   */
  readonly registerFailureReason?:  | "REGISTER_FAILURE_REASON_UNSPECIFIED" | "REGISTER_FAILURE_REASON_UNKNOWN" | "DOMAIN_NOT_AVAILABLE" | "INVALID_CONTACTS";
  /**
   * Output only. The state of the `Registration`
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "REGISTRATION_PENDING" | "REGISTRATION_FAILED" | "TRANSFER_PENDING" | "TRANSFER_FAILED" | "IMPORT_PENDING" | "ACTIVE" | "SUSPENDED" | "EXPORTED";
  /**
   * Output only. Set of options for the `contact_settings.privacy` field that
   * this `Registration` supports.
   */
  readonly supportedPrivacy?:  | "CONTACT_PRIVACY_UNSPECIFIED" | "PUBLIC_CONTACT_DATA" | "PRIVATE_CONTACT_DATA" | "REDACTED_CONTACT_DATA"[];
  /**
   * Output only. The reason the domain transfer failed. Only set for domains
   * in TRANSFER_FAILED state.
   */
  readonly transferFailureReason?:  | "TRANSFER_FAILURE_REASON_UNSPECIFIED" | "TRANSFER_FAILURE_REASON_UNKNOWN" | "EMAIL_CONFIRMATION_FAILURE" | "DOMAIN_NOT_REGISTERED" | "DOMAIN_HAS_TRANSFER_LOCK" | "INVALID_AUTHORIZATION_CODE" | "TRANSFER_CANCELLED" | "TRANSFER_REJECTED" | "INVALID_REGISTRANT_EMAIL_ADDRESS" | "DOMAIN_NOT_ELIGIBLE_FOR_TRANSFER" | "TRANSFER_ALREADY_PENDING";
}

/**
 * Request for the `ResetAuthorizationCode` method.
 */
export interface ResetAuthorizationCodeRequest {
}

/**
 * Response for the `RetrieveImportableDomains` method.
 */
export interface RetrieveImportableDomainsResponse {
  /**
   * A list of domains that the calling user manages in Google Domains.
   */
  domains?: Domain[];
  /**
   * When present, there are more results to retrieve. Set `page_token` to this
   * value on a subsequent call to get the next page of results.
   */
  nextPageToken?: string;
}

function serializeRetrieveImportableDomainsResponse(data: any): RetrieveImportableDomainsResponse {
  return {
    ...data,
    domains: data["domains"] !== undefined ? data["domains"].map((item: any) => (serializeDomain(item))) : undefined,
  };
}

function deserializeRetrieveImportableDomainsResponse(data: any): RetrieveImportableDomainsResponse {
  return {
    ...data,
    domains: data["domains"] !== undefined ? data["domains"].map((item: any) => (deserializeDomain(item))) : undefined,
  };
}

/**
 * Response for the `RetrieveRegisterParameters` method.
 */
export interface RetrieveRegisterParametersResponse {
  /**
   * Parameters to use when calling the `RegisterDomain` method.
   */
  registerParameters?: RegisterParameters;
}

function serializeRetrieveRegisterParametersResponse(data: any): RetrieveRegisterParametersResponse {
  return {
    ...data,
    registerParameters: data["registerParameters"] !== undefined ? serializeRegisterParameters(data["registerParameters"]) : undefined,
  };
}

function deserializeRetrieveRegisterParametersResponse(data: any): RetrieveRegisterParametersResponse {
  return {
    ...data,
    registerParameters: data["registerParameters"] !== undefined ? deserializeRegisterParameters(data["registerParameters"]) : undefined,
  };
}

/**
 * Response for the `RetrieveTransferParameters` method.
 */
export interface RetrieveTransferParametersResponse {
  /**
   * Parameters to use when calling the `TransferDomain` method.
   */
  transferParameters?: TransferParameters;
}

function serializeRetrieveTransferParametersResponse(data: any): RetrieveTransferParametersResponse {
  return {
    ...data,
    transferParameters: data["transferParameters"] !== undefined ? serializeTransferParameters(data["transferParameters"]) : undefined,
  };
}

function deserializeRetrieveTransferParametersResponse(data: any): RetrieveTransferParametersResponse {
  return {
    ...data,
    transferParameters: data["transferParameters"] !== undefined ? deserializeTransferParameters(data["transferParameters"]) : undefined,
  };
}

/**
 * Response for the `SearchDomains` method.
 */
export interface SearchDomainsResponse {
  /**
   * Results of the domain name search.
   */
  registerParameters?: RegisterParameters[];
}

function serializeSearchDomainsResponse(data: any): SearchDomainsResponse {
  return {
    ...data,
    registerParameters: data["registerParameters"] !== undefined ? data["registerParameters"].map((item: any) => (serializeRegisterParameters(item))) : undefined,
  };
}

function deserializeSearchDomainsResponse(data: any): SearchDomainsResponse {
  return {
    ...data,
    registerParameters: data["registerParameters"] !== undefined ? data["registerParameters"].map((item: any) => (deserializeRegisterParameters(item))) : undefined,
  };
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
 * Request for the `TransferDomain` method.
 */
export interface TransferDomainRequest {
  /**
   * The domain's transfer authorization code. You can obtain this from the
   * domain's current registrar.
   */
  authorizationCode?: AuthorizationCode;
  /**
   * The list of contact notices that you acknowledge. The notices needed here
   * depend on the values specified in `registration.contact_settings`.
   */
  contactNotices?:  | "CONTACT_NOTICE_UNSPECIFIED" | "PUBLIC_CONTACT_DATA_ACKNOWLEDGEMENT"[];
  /**
   * Required. The complete `Registration` resource to be created. You can
   * leave `registration.dns_settings` unset to import the domain's current DNS
   * configuration from its current registrar. Use this option only if you are
   * sure that the domain's current DNS service does not cease upon transfer, as
   * is often the case for DNS services provided for free by the registrar.
   */
  registration?: Registration;
  /**
   * Validate the request without actually transferring the domain.
   */
  validateOnly?: boolean;
  /**
   * Required. Acknowledgement of the price to transfer or renew the domain for
   * one year. Call `RetrieveTransferParameters` to obtain the price, which you
   * must acknowledge.
   */
  yearlyPrice?: Money;
}

function serializeTransferDomainRequest(data: any): TransferDomainRequest {
  return {
    ...data,
    yearlyPrice: data["yearlyPrice"] !== undefined ? serializeMoney(data["yearlyPrice"]) : undefined,
  };
}

function deserializeTransferDomainRequest(data: any): TransferDomainRequest {
  return {
    ...data,
    yearlyPrice: data["yearlyPrice"] !== undefined ? deserializeMoney(data["yearlyPrice"]) : undefined,
  };
}

/**
 * Parameters required to transfer a domain from another registrar.
 */
export interface TransferParameters {
  /**
   * The registrar that currently manages the domain.
   */
  currentRegistrar?: string;
  /**
   * The URL of the registrar that currently manages the domain.
   */
  currentRegistrarUri?: string;
  /**
   * The domain name. Unicode domain names are expressed in Punycode format.
   */
  domainName?: string;
  /**
   * The name servers that currently store the configuration of the domain.
   */
  nameServers?: string[];
  /**
   * Contact privacy options that the domain supports.
   */
  supportedPrivacy?:  | "CONTACT_PRIVACY_UNSPECIFIED" | "PUBLIC_CONTACT_DATA" | "PRIVATE_CONTACT_DATA" | "REDACTED_CONTACT_DATA"[];
  /**
   * Indicates whether the domain is protected by a transfer lock. For a
   * transfer to succeed, this must show `UNLOCKED`. To unlock a domain, go to
   * its current registrar.
   */
  transferLockState?:  | "TRANSFER_LOCK_STATE_UNSPECIFIED" | "UNLOCKED" | "LOCKED";
  /**
   * Price to transfer or renew the domain for one year.
   */
  yearlyPrice?: Money;
}

function serializeTransferParameters(data: any): TransferParameters {
  return {
    ...data,
    yearlyPrice: data["yearlyPrice"] !== undefined ? serializeMoney(data["yearlyPrice"]) : undefined,
  };
}

function deserializeTransferParameters(data: any): TransferParameters {
  return {
    ...data,
    yearlyPrice: data["yearlyPrice"] !== undefined ? deserializeMoney(data["yearlyPrice"]) : undefined,
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
