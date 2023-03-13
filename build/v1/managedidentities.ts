// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Managed Service for Microsoft Active Directory API Client for Deno
 * ==================================================================
 * 
 * The Managed Service for Microsoft Active Directory API is used for managing a highly available, hardened service running Microsoft Active Directory (AD).
 * 
 * Docs: https://cloud.google.com/managed-microsoft-ad/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Managed Service for Microsoft Active Directory API is used for managing
 * a highly available, hardened service running Microsoft Active Directory (AD).
 */
export class Managedidentities {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://managedidentities.googleapis.com/") {
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
   * Adds an AD trust to a domain.
   *
   * @param name Required. The resource domain name, project name and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}`
   */
  async projectsLocationsGlobalDomainsAttachTrust(name: string, req: AttachTrustRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:attachTrust`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a Backup for a domain.
   *
   * @param parent Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}`
   */
  async projectsLocationsGlobalDomainsBackupsCreate(parent: string, req: Backup, opts: ProjectsLocationsGlobalDomainsBackupsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/backups`);
    if (opts.backupId !== undefined) {
      url.searchParams.append("backupId", String(opts.backupId));
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
   * Deletes identified Backup.
   *
   * @param name Required. The backup resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}/backups/{backup_id}`
   */
  async projectsLocationsGlobalDomainsBackupsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single Backup.
   *
   * @param name Required. The backup resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}/backups/{backup_id}`
   */
  async projectsLocationsGlobalDomainsBackupsGet(name: string): Promise<Backup> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Backup;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGlobalDomainsBackupsGetIamPolicy(resource: string, opts: ProjectsLocationsGlobalDomainsBackupsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists Backup in a given project.
   *
   * @param parent Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}`
   */
  async projectsLocationsGlobalDomainsBackupsList(parent: string, opts: ProjectsLocationsGlobalDomainsBackupsListOptions = {}): Promise<ListBackupsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/backups`);
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
    return data as ListBackupsResponse;
  }

  /**
   * Updates the labels for specified Backup.
   *
   * @param name Output only. The unique name of the Backup in the form of `projects/{project_id}/locations/global/domains/{domain_name}/backups/{name}`
   */
  async projectsLocationsGlobalDomainsBackupsPatch(name: string, req: Backup, opts: ProjectsLocationsGlobalDomainsBackupsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsGlobalDomainsBackupsPatchOptions(opts);
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGlobalDomainsBackupsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsGlobalDomainsBackupsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Creates a Microsoft AD domain.
   *
   * @param parent Required. The resource project name and location using the form: `projects/{project_id}/locations/global`
   */
  async projectsLocationsGlobalDomainsCreate(parent: string, req: Domain, opts: ProjectsLocationsGlobalDomainsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/domains`);
    if (opts.domainName !== undefined) {
      url.searchParams.append("domainName", String(opts.domainName));
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
   * Deletes a domain.
   *
   * @param name Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}`
   */
  async projectsLocationsGlobalDomainsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Removes an AD trust.
   *
   * @param name Required. The resource domain name, project name, and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}`
   */
  async projectsLocationsGlobalDomainsDetachTrust(name: string, req: DetachTrustRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:detachTrust`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Extend Schema for Domain
   *
   * @param domain Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}`
   */
  async projectsLocationsGlobalDomainsExtendSchema(domain: string, req: ExtendSchemaRequest): Promise<Operation> {
    req = serializeExtendSchemaRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ domain }:extendSchema`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets information about a domain.
   *
   * @param name Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}`
   */
  async projectsLocationsGlobalDomainsGet(name: string): Promise<Domain> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Domain;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGlobalDomainsGetIamPolicy(resource: string, opts: ProjectsLocationsGlobalDomainsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Gets the domain ldaps settings.
   *
   * @param name Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}`
   */
  async projectsLocationsGlobalDomainsGetLdapssettings(name: string): Promise<LDAPSSettings> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/ldapssettings`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLDAPSSettings(data);
  }

  /**
   * Lists domains in a project.
   *
   * @param parent Required. The resource name of the domain location using the form: `projects/{project_id}/locations/global`
   */
  async projectsLocationsGlobalDomainsList(parent: string, opts: ProjectsLocationsGlobalDomainsListOptions = {}): Promise<ListDomainsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/domains`);
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
    return data as ListDomainsResponse;
  }

  /**
   * Updates the metadata and configuration of a domain.
   *
   * @param name Required. The unique name of the domain using the form: `projects/{project_id}/locations/global/domains/{domain_name}`.
   */
  async projectsLocationsGlobalDomainsPatch(name: string, req: Domain, opts: ProjectsLocationsGlobalDomainsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsGlobalDomainsPatchOptions(opts);
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
   * Updates the DNS conditional forwarder.
   *
   * @param name Required. The resource domain name, project name and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}`
   */
  async projectsLocationsGlobalDomainsReconfigureTrust(name: string, req: ReconfigureTrustRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:reconfigureTrust`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Resets a domain's administrator password.
   *
   * @param name Required. The domain resource name using the form: `projects/{project_id}/locations/global/domains/{domain_name}`
   */
  async projectsLocationsGlobalDomainsResetAdminPassword(name: string, req: ResetAdminPasswordRequest): Promise<ResetAdminPasswordResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:resetAdminPassword`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ResetAdminPasswordResponse;
  }

  /**
   * RestoreDomain restores domain backup mentioned in the RestoreDomainRequest
   *
   * @param name Required. Resource name for the domain to which the backup belongs
   */
  async projectsLocationsGlobalDomainsRestore(name: string, req: RestoreDomainRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:restore`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
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
  async projectsLocationsGlobalDomainsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Gets details of a single sqlIntegration.
   *
   * @param name Required. SQLIntegration resource name using the form: `projects/{project_id}/locations/global/domains/{domain}/sqlIntegrations/{name}`
   */
  async projectsLocationsGlobalDomainsSqlIntegrationsGet(name: string): Promise<SqlIntegration> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SqlIntegration;
  }

  /**
   * Lists SqlIntegrations in a given domain.
   *
   * @param parent Required. The resource name of the SqlIntegrations using the form: `projects/{project_id}/locations/global/domains/*`
   */
  async projectsLocationsGlobalDomainsSqlIntegrationsList(parent: string, opts: ProjectsLocationsGlobalDomainsSqlIntegrationsListOptions = {}): Promise<ListSqlIntegrationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/sqlIntegrations`);
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
    return data as ListSqlIntegrationsResponse;
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
  async projectsLocationsGlobalDomainsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Patches a single ldaps settings.
   *
   * @param name The resource name of the LDAPS settings. Uses the form: `projects/{project}/locations/{location}/domains/{domain}`.
   */
  async projectsLocationsGlobalDomainsUpdateLdapssettings(name: string, req: LDAPSSettings, opts: ProjectsLocationsGlobalDomainsUpdateLdapssettingsOptions = {}): Promise<Operation> {
    req = serializeLDAPSSettings(req);
    opts = serializeProjectsLocationsGlobalDomainsUpdateLdapssettingsOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }/ldapssettings`);
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
   * Validates a trust state, that the target domain is reachable, and that the
   * target domain is able to accept incoming trust requests.
   *
   * @param name Required. The resource domain name, project name, and location using the form: `projects/{project_id}/locations/global/domains/{domain_name}`
   */
  async projectsLocationsGlobalDomainsValidateTrust(name: string, req: ValidateTrustRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:validateTrust`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Starts asynchronous cancellation on a long-running operation. The server
   * makes a best effort to cancel the operation, but success is not guaranteed.
   * If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   *
   * @param name The name of the operation resource to be cancelled.
   */
  async projectsLocationsGlobalOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async projectsLocationsGlobalOperationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsGlobalOperationsGet(name: string): Promise<Operation> {
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
  async projectsLocationsGlobalOperationsList(name: string, opts: ProjectsLocationsGlobalOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * Creates a Peering for Managed AD instance.
   *
   * @param parent Required. Resource project name and location using the form: `projects/{project_id}/locations/global`
   */
  async projectsLocationsGlobalPeeringsCreate(parent: string, req: Peering, opts: ProjectsLocationsGlobalPeeringsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/peerings`);
    if (opts.peeringId !== undefined) {
      url.searchParams.append("peeringId", String(opts.peeringId));
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
   * Deletes identified Peering.
   *
   * @param name Required. Peering resource name using the form: `projects/{project_id}/locations/global/peerings/{peering_id}`
   */
  async projectsLocationsGlobalPeeringsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single Peering.
   *
   * @param name Required. Peering resource name using the form: `projects/{project_id}/locations/global/peerings/{peering_id}`
   */
  async projectsLocationsGlobalPeeringsGet(name: string): Promise<Peering> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Peering;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGlobalPeeringsGetIamPolicy(resource: string, opts: ProjectsLocationsGlobalPeeringsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists Peerings in a given project.
   *
   * @param parent Required. The resource name of the peering location using the form: `projects/{project_id}/locations/global`
   */
  async projectsLocationsGlobalPeeringsList(parent: string, opts: ProjectsLocationsGlobalPeeringsListOptions = {}): Promise<ListPeeringsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/peerings`);
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
    return data as ListPeeringsResponse;
  }

  /**
   * Updates the labels for specified Peering.
   *
   * @param name Output only. Unique name of the peering in this scope including projects and location using the form: `projects/{project_id}/locations/global/peerings/{peering_id}`.
   */
  async projectsLocationsGlobalPeeringsPatch(name: string, req: Peering, opts: ProjectsLocationsGlobalPeeringsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsGlobalPeeringsPatchOptions(opts);
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsGlobalPeeringsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
  async projectsLocationsGlobalPeeringsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
 * Request message for AttachTrust
 */
export interface AttachTrustRequest {
  /**
   * Required. The domain trust resource.
   */
  trust?: Trust;
}

/**
 * Represents a Managed Microsoft Identities backup.
 */
export interface Backup {
  /**
   * Output only. The time the backups was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. Resource labels to represent user provided metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The unique name of the Backup in the form of
   * `projects/{project_id}/locations/global/domains/{domain_name}/backups/{name}`
   */
  readonly name?: string;
  /**
   * Output only. The current state of the backup.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "FAILED" | "DELETING";
  /**
   * Output only. Additional information about the current status of this
   * backup, if available.
   */
  readonly statusMessage?: string;
  /**
   * Output only. Indicates whether it’s an on-demand backup or scheduled.
   */
  readonly type?:  | "TYPE_UNSPECIFIED" | "ON_DEMAND" | "SCHEDULED";
  /**
   * Output only. Last update time.
   */
  readonly updateTime?: Date;
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
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Certificate used to configure LDAPS.
 */
export interface Certificate {
  /**
   * The certificate expire time.
   */
  expireTime?: Date;
  /**
   * The issuer of this certificate.
   */
  issuingCertificate?: Certificate;
  /**
   * The certificate subject.
   */
  subject?: string;
  /**
   * The additional hostnames for the domain.
   */
  subjectAlternativeName?: string[];
  /**
   * The certificate thumbprint which uniquely identifies the certificate.
   */
  thumbprint?: string;
}

function serializeCertificate(data: any): Certificate {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
    issuingCertificate: data["issuingCertificate"] !== undefined ? serializeCertificate(data["issuingCertificate"]) : undefined,
  };
}

function deserializeCertificate(data: any): Certificate {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    issuingCertificate: data["issuingCertificate"] !== undefined ? deserializeCertificate(data["issuingCertificate"]) : undefined,
  };
}

/**
 * Time window specified for daily operations.
 */
export interface DailyCycle {
  /**
   * Output only. Duration of the time window, set by service producer.
   */
  duration?: number /* Duration */;
  /**
   * Time within the day to start the operations.
   */
  startTime?: TimeOfDay;
}

function serializeDailyCycle(data: any): DailyCycle {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeDailyCycle(data: any): DailyCycle {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

/**
 * Represents a whole or partial calendar date, such as a birthday. The time of
 * day and time zone are either specified elsewhere or are insignificant. The
 * date is relative to the Gregorian Calendar. This can represent one of the
 * following: * A full date, with non-zero year, month, and day values. * A
 * month and day, with a zero year (for example, an anniversary). * A year on
 * its own, with a zero month and a zero day. * A year and month, with a zero
 * day (for example, a credit card expiration date). Related types: *
 * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp
 */
export interface Date {
  /**
   * Day of a month. Must be from 1 to 31 and valid for the year and month, or
   * 0 to specify a year by itself or a year and month where the day isn't
   * significant.
   */
  day?: number;
  /**
   * Month of a year. Must be from 1 to 12, or 0 to specify a year without a
   * month and day.
   */
  month?: number;
  /**
   * Year of the date. Must be from 1 to 9999, or 0 to specify a date without a
   * year.
   */
  year?: number;
}

/**
 * DenyMaintenancePeriod definition. Maintenance is forbidden within the deny
 * period. The start_date must be less than the end_date.
 */
export interface DenyMaintenancePeriod {
  /**
   * Deny period end date. This can be: * A full date, with non-zero year,
   * month and day values. * A month and day value, with a zero year. Allows
   * recurring deny periods each year. Date matching this period will have to be
   * before the end.
   */
  endDate?: Date;
  /**
   * Deny period start date. This can be: * A full date, with non-zero year,
   * month and day values. * A month and day value, with a zero year. Allows
   * recurring deny periods each year. Date matching this period will have to be
   * the same or after the start.
   */
  startDate?: Date;
  /**
   * Time in UTC when the Blackout period starts on start_date and ends on
   * end_date. This can be: * Full time. * All zeros for 00:00:00 UTC
   */
  time?: TimeOfDay;
}

/**
 * Request message for DetachTrust
 */
export interface DetachTrustRequest {
  /**
   * Required. The domain trust resource to removed.
   */
  trust?: Trust;
}

/**
 * Represents a managed Microsoft Active Directory domain. If the domain is
 * being changed, it will be placed into the UPDATING state, which indicates
 * that the resource is being reconciled. At this point, Get will reflect an
 * intermediate state.
 */
export interface Domain {
  /**
   * Optional. The name of delegated administrator account used to perform
   * Active Directory operations. If not specified, `setupadmin` will be used.
   */
  admin?: string;
  /**
   * Optional. Configuration for audit logs. True if audit logs are enabled,
   * else false. Default is audit logs disabled.
   */
  auditLogsEnabled?: boolean;
  /**
   * Optional. The full names of the Google Compute Engine
   * [networks](/compute/docs/networks-and-firewalls#networks) the domain
   * instance is connected to. Networks can be added using UpdateDomain. The
   * domain is only available on networks listed in `authorized_networks`. If
   * CIDR subnets overlap between networks, domain creation will fail.
   */
  authorizedNetworks?: string[];
  /**
   * Output only. The time the instance was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The fully-qualified domain name of the exposed domain used by
   * clients to connect to the service. Similar to what would be chosen for an
   * Active Directory set up on an internal network.
   */
  readonly fqdn?: string;
  /**
   * Optional. Resource labels that can contain user-provided metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. Locations where domain needs to be provisioned. regions e.g.
   * us-west1 or us-east4 Service supports up to 4 locations at once. Each
   * location will use a /26 block.
   */
  locations?: string[];
  /**
   * Required. The unique name of the domain using the form:
   * `projects/{project_id}/locations/global/domains/{domain_name}`.
   */
  name?: string;
  /**
   * Required. The CIDR range of internal addresses that are reserved for this
   * domain. Reserved networks must be /24 or larger. Ranges must be unique and
   * non-overlapping with existing subnets in [Domain].[authorized_networks].
   */
  reservedIpRange?: string;
  /**
   * Output only. The current state of this domain.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY" | "UPDATING" | "DELETING" | "REPAIRING" | "PERFORMING_MAINTENANCE" | "UNAVAILABLE";
  /**
   * Output only. Additional information about the current status of this
   * domain, if available.
   */
  readonly statusMessage?: string;
  /**
   * Output only. The current trusts associated with the domain.
   */
  readonly trusts?: Trust[];
  /**
   * Output only. The last update time.
   */
  readonly updateTime?: Date;
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
 * ExtendSchemaRequest is the request message for ExtendSchema method.
 */
export interface ExtendSchemaRequest {
  /**
   * Required. Description for Schema Change.
   */
  description?: string;
  /**
   * File uploaded as a byte stream input.
   */
  fileContents?: Uint8Array;
  /**
   * File stored in Cloud Storage bucket and represented in the form
   * projects/{project_id}/buckets/{bucket_name}/objects/{object_name} File
   * should be in the same project as the domain.
   */
  gcsPath?: string;
}

function serializeExtendSchemaRequest(data: any): ExtendSchemaRequest {
  return {
    ...data,
    fileContents: data["fileContents"] !== undefined ? encodeBase64(data["fileContents"]) : undefined,
  };
}

function deserializeExtendSchemaRequest(data: any): ExtendSchemaRequest {
  return {
    ...data,
    fileContents: data["fileContents"] !== undefined ? decodeBase64(data["fileContents"] as string) : undefined,
  };
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudManagedidentitiesV1alpha1OpMetadata {
  /**
   * Output only. API version used to start the operation.
   */
  readonly apiVersion?: string;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Identifies whether the user has requested cancellation of the
   * operation. Operations that have successfully been cancelled have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   */
  readonly requestedCancellation?: boolean;
  /**
   * Output only. Server-defined resource path for the target of the operation.
   */
  readonly target?: string;
  /**
   * Output only. Name of the verb executed by the operation.
   */
  readonly verb?: string;
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudManagedidentitiesV1beta1OpMetadata {
  /**
   * Output only. API version used to start the operation.
   */
  readonly apiVersion?: string;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Identifies whether the user has requested cancellation of the
   * operation. Operations that have successfully been cancelled have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   */
  readonly requestedCancellation?: boolean;
  /**
   * Output only. Server-defined resource path for the target of the operation.
   */
  readonly target?: string;
  /**
   * Output only. Name of the verb executed by the operation.
   */
  readonly verb?: string;
}

/**
 * Represents the metadata of the long-running operation.
 */
export interface GoogleCloudManagedidentitiesV1OpMetadata {
  /**
   * Output only. API version used to start the operation.
   */
  readonly apiVersion?: string;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Identifies whether the user has requested cancellation of the
   * operation. Operations that have successfully been cancelled have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   */
  readonly requestedCancellation?: boolean;
  /**
   * Output only. Server-defined resource path for the target of the operation.
   */
  readonly target?: string;
  /**
   * Output only. Name of the verb executed by the operation.
   */
  readonly verb?: string;
}

/**
 * Instance represents the interface for SLM services to actuate the state of
 * control plane resources. Example Instance in JSON, where
 * consumer-project-number=123456, producer-project-id=cloud-sql: ```json
 * Instance: { "name":
 * "projects/123456/locations/us-east1/instances/prod-instance", "create_time":
 * { "seconds": 1526406431, }, "labels": { "env": "prod", "foo": "bar" },
 * "state": READY, "software_versions": { "software_update":
 * "cloud-sql-09-28-2018", }, "maintenance_policy_names": { "UpdatePolicy":
 * "projects/123456/locations/us-east1/maintenancePolicies/prod-update-policy",
 * } "tenant_project_id": "cloud-sql-test-tenant", "producer_metadata": {
 * "cloud-sql-tier": "basic", "cloud-sql-instance-size": "1G", },
 * "provisioned_resources": [ { "resource-type": "compute-instance",
 * "resource-url":
 * "https://www.googleapis.com/compute/v1/projects/cloud-sql/zones/us-east1-b/instances/vm-1",
 * } ], "maintenance_schedules": { "csa_rollout": { "start_time": { "seconds":
 * 1526406431, }, "end_time": { "seconds": 1535406431, }, }, "ncsa_rollout": {
 * "start_time": { "seconds": 1526406431, }, "end_time": { "seconds":
 * 1535406431, }, } }, "consumer_defined_name": "my-sql-instance1", } ```
 * LINT.IfChange
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1Instance {
  /**
   * consumer_defined_name is the name of the instance set by the service
   * consumers. Generally this is different from the `name` field which
   * reperesents the system-assigned id of the instance which the service
   * consumers do not recognize. This is a required field for tenants onboarding
   * to Maintenance Window notifications
   * (go/slm-rollout-maintenance-policies#prerequisites).
   */
  consumerDefinedName?: string;
  /**
   * Output only. Timestamp when the resource was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. The instance_type of this instance of format:
   * projects/{project_number}/locations/{location_id}/instanceTypes/{instance_type_id}.
   * Instance Type represents a high-level tier or SKU of the service that this
   * instance belong to. When enabled(eg: Maintenance Rollout), Rollout uses
   * 'instance_type' along with 'software_versions' to determine whether
   * instance needs an update or not.
   */
  instanceType?: string;
  /**
   * Optional. Resource labels to represent user provided metadata. Each label
   * is a key-value pair, where both the key and the value are arbitrary strings
   * provided by the user.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. The MaintenancePolicies that have been attached to the instance.
   * The key must be of the type name of the oneof policy name defined in
   * MaintenancePolicy, and the referenced policy must define the same policy
   * type. For details, please refer to go/cloud-saas-mw-ug. Should not be set
   * if maintenance_settings.maintenance_policies is set.
   */
  maintenancePolicyNames?: {
    [key: string]: string
  };
  /**
   * The MaintenanceSchedule contains the scheduling information of published
   * maintenance schedule with same key as software_versions.
   */
  maintenanceSchedules?: {
    [key: string]: GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule
  };
  /**
   * Optional. The MaintenanceSettings associated with instance.
   */
  maintenanceSettings?: GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings;
  /**
   * Unique name of the resource. It uses the form:
   * `projects/{project_number}/locations/{location_id}/instances/{instance_id}`
   * Note: This name is passed, stored and logged across the rollout system. So
   * use of consumer project_id or any other consumer PII in the name is
   * strongly discouraged for wipeout (go/wipeout) compliance. See
   * go/elysium/project_ids#storage-guidance for more details.
   */
  name?: string;
  /**
   * Optional. notification_parameter are information that service producers
   * may like to include that is not relevant to Rollout. This parameter will
   * only be passed to Gamma and Cloud Logging for notification/logging purpose.
   */
  notificationParameters?: {
    [key: string]: GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter
  };
  /**
   * Output only. Custom string attributes used primarily to expose
   * producer-specific information in monitoring dashboards. See
   * go/get-instance-metadata.
   */
  readonly producerMetadata?: {
    [key: string]: string
  };
  /**
   * Output only. The list of data plane resources provisioned for this
   * instance, e.g. compute VMs. See go/get-instance-metadata.
   */
  readonly provisionedResources?: GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource[];
  /**
   * Link to the SLM instance template. Only populated when updating SLM
   * instances via SSA's Actuation service adaptor. Service producers with
   * custom control plane (e.g. Cloud SQL) doesn't need to populate this field.
   * Instead they should use software_versions.
   */
  slmInstanceTemplate?: string;
  /**
   * Output only. SLO metadata for instance classification in the Standardized
   * dataplane SLO platform. See go/cloud-ssa-standard-slo for feature
   * description.
   */
  readonly sloMetadata?: GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata;
  /**
   * Software versions that are used to deploy this instance. This can be
   * mutated by rollout services.
   */
  softwareVersions?: {
    [key: string]: string
  };
  /**
   * Output only. Current lifecycle state of the resource (e.g. if it's being
   * created or ready to use).
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY" | "UPDATING" | "REPAIRING" | "DELETING" | "ERROR";
  /**
   * Output only. ID of the associated GCP tenant project. See
   * go/get-instance-metadata.
   */
  readonly tenantProjectId?: string;
  /**
   * Output only. Timestamp when the resource was last modified.
   */
  readonly updateTime?: Date;
}

function serializeGoogleCloudSaasacceleratorManagementProvidersV1Instance(data: any): GoogleCloudSaasacceleratorManagementProvidersV1Instance {
  return {
    ...data,
    maintenanceSchedules: data["maintenanceSchedules"] !== undefined ? Object.fromEntries(Object.entries(data["maintenanceSchedules"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule(v)]))) : undefined,
    maintenanceSettings: data["maintenanceSettings"] !== undefined ? serializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings(data["maintenanceSettings"]) : undefined,
  };
}

function deserializeGoogleCloudSaasacceleratorManagementProvidersV1Instance(data: any): GoogleCloudSaasacceleratorManagementProvidersV1Instance {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    maintenanceSchedules: data["maintenanceSchedules"] !== undefined ? Object.fromEntries(Object.entries(data["maintenanceSchedules"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule(v)]))) : undefined,
    maintenanceSettings: data["maintenanceSettings"] !== undefined ? deserializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings(data["maintenanceSettings"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Maintenance schedule which is exposed to customer and potentially end user,
 * indicating published upcoming future maintenance schedule
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule {
  /**
   * This field is deprecated, and will be always set to true since reschedule
   * can happen multiple times now. This field should not be removed until all
   * service producers remove this for their customers.
   */
  canReschedule?: boolean;
  /**
   * The scheduled end time for the maintenance.
   */
  endTime?: Date;
  /**
   * The rollout management policy this maintenance schedule is associated
   * with. When doing reschedule update request, the reschedule should be
   * against this given policy.
   */
  rolloutManagementPolicy?: string;
  /**
   * schedule_deadline_time is the time deadline any schedule start time cannot
   * go beyond, including reschedule. It's normally the initial schedule start
   * time plus maintenance window length (1 day or 1 week). Maintenance cannot
   * be scheduled to start beyond this deadline.
   */
  scheduleDeadlineTime?: Date;
  /**
   * The scheduled start time for the maintenance.
   */
  startTime?: Date;
}

function serializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule(data: any): GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    scheduleDeadlineTime: data["scheduleDeadlineTime"] !== undefined ? data["scheduleDeadlineTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule(data: any): GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSchedule {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    scheduleDeadlineTime: data["scheduleDeadlineTime"] !== undefined ? new Date(data["scheduleDeadlineTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Maintenance settings associated with instance. Allows service producers and
 * end users to assign settings that controls maintenance on this instance.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings {
  /**
   * Optional. Exclude instance from maintenance. When true, rollout service
   * will not attempt maintenance on the instance. Rollout service will include
   * the instance in reported rollout progress as not attempted.
   */
  exclude?: boolean;
  /**
   * Optional. If the update call is triggered from rollback, set the value as
   * true.
   */
  isRollback?: boolean;
  /**
   * Optional. The MaintenancePolicies that have been attached to the instance.
   * The key must be of the type name of the oneof policy name defined in
   * MaintenancePolicy, and the embedded policy must define the same policy
   * type. For details, please refer to go/cloud-saas-mw-ug. Should not be set
   * if maintenance_policy_names is set. If only the name is needed, then only
   * populate MaintenancePolicy.name.
   */
  maintenancePolicies?: {
    [key: string]: MaintenancePolicy
  };
}

function serializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings(data: any): GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings {
  return {
    ...data,
    maintenancePolicies: data["maintenancePolicies"] !== undefined ? Object.fromEntries(Object.entries(data["maintenancePolicies"]).map(([k, v]: [string, any]) => ([k, serializeMaintenancePolicy(v)]))) : undefined,
  };
}

function deserializeGoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings(data: any): GoogleCloudSaasacceleratorManagementProvidersV1MaintenanceSettings {
  return {
    ...data,
    maintenancePolicies: data["maintenancePolicies"] !== undefined ? Object.fromEntries(Object.entries(data["maintenancePolicies"]).map(([k, v]: [string, any]) => ([k, deserializeMaintenancePolicy(v)]))) : undefined,
  };
}

/**
 * Node information for custom per-node SLO implementations. SSA does not
 * support per-node SLO, but producers can populate per-node information in
 * SloMetadata for custom precomputations. SSA Eligibility Exporter will emit
 * per-node metric based on this information.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata {
  /**
   * The location of the node, if different from instance location.
   */
  location?: string;
  /**
   * The id of the node. This should be equal to SaasInstanceNode.node_id.
   */
  nodeId?: string;
  /**
   * If present, this will override eligibility for the node coming from
   * instance or exclusions for specified SLIs.
   */
  perSliEligibility?: GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility;
}

/**
 * Contains notification related data.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1NotificationParameter {
  /**
   * Optional. Array of string values. e.g. instance's replica information.
   */
  values?: string[];
}

/**
 * PerSliSloEligibility is a mapping from an SLI name to eligibility.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility {
  /**
   * An entry in the eligibilities map specifies an eligibility for a
   * particular SLI for the given instance. The SLI key in the name must be a
   * valid SLI name specified in the Eligibility Exporter binary flags otherwise
   * an error will be emitted by Eligibility Exporter and the oncaller will be
   * alerted. If an SLI has been defined in the binary flags but the
   * eligibilities map does not contain it, the corresponding SLI time series
   * will not be emitted by the Eligibility Exporter. This ensures a smooth
   * rollout and compatibility between the data produced by different versions
   * of the Eligibility Exporters. If eligibilities map contains a key for an
   * SLI which has not been declared in the binary flags, there will be an error
   * message emitted in the Eligibility Exporter log and the metric for the SLI
   * in question will not be emitted.
   */
  eligibilities?: {
    [key: string]: GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility
  };
}

/**
 * Describes provisioned dataplane resources.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1ProvisionedResource {
  /**
   * Type of the resource. This can be either a GCP resource or a custom one
   * (e.g. another cloud provider's VM). For GCP compute resources use singular
   * form of the names listed in GCP compute API documentation
   * (https://cloud.google.com/compute/docs/reference/rest/v1/), prefixed with
   * 'compute-', for example: 'compute-instance', 'compute-disk',
   * 'compute-autoscaler'.
   */
  resourceType?: string;
  /**
   * URL identifying the resource, e.g.
   * "https://www.googleapis.com/compute/v1/projects/...)".
   */
  resourceUrl?: string;
}

/**
 * SloEligibility is a tuple containing eligibility value: true if an instance
 * is eligible for SLO calculation or false if it should be excluded from all
 * SLO-related calculations along with a user-defined reason.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1SloEligibility {
  /**
   * Whether an instance is eligible or ineligible.
   */
  eligible?: boolean;
  /**
   * User-defined reason for the current value of instance eligibility.
   * Usually, this can be directly mapped to the internal state. An empty reason
   * is allowed.
   */
  reason?: string;
}

/**
 * SloMetadata contains resources required for proper SLO classification of the
 * instance.
 */
export interface GoogleCloudSaasacceleratorManagementProvidersV1SloMetadata {
  /**
   * Optional. List of nodes. Some producers need to use per-node metadata to
   * calculate SLO. This field allows such producers to publish per-node SLO
   * meta data, which will be consumed by SSA Eligibility Exporter and published
   * in the form of per node metric to Monarch.
   */
  nodes?: GoogleCloudSaasacceleratorManagementProvidersV1NodeSloMetadata[];
  /**
   * Optional. Multiple per-instance SLI eligibilities which apply for
   * individual SLIs.
   */
  perSliEligibility?: GoogleCloudSaasacceleratorManagementProvidersV1PerSliSloEligibility;
  /**
   * Name of the SLO tier the Instance belongs to. This name will be expected
   * to match the tiers specified in the service SLO configuration. Field is
   * mandatory and must not be empty.
   */
  tier?: string;
}

/**
 * LDAPSSettings represents the ldaps settings for domain resource. LDAP is the
 * Lightweight Directory Access Protocol, defined in
 * https://tools.ietf.org/html/rfc4511. The settings object configures LDAP over
 * SSL/TLS, whether it is over port 636 or the StartTLS operation. If
 * LDAPSSettings is being changed, it will be placed into the UPDATING state,
 * which indicates that the resource is being reconciled. At this point, Get
 * will reflect an intermediate state.
 */
export interface LDAPSSettings {
  /**
   * Output only. The certificate used to configure LDAPS. Certificates can be
   * chained with a maximum length of 15.
   */
  readonly certificate?: Certificate;
  /**
   * Input only. The password used to encrypt the uploaded PFX certificate.
   */
  certificatePassword?: string;
  /**
   * Input only. The uploaded PKCS12-formatted certificate to configure LDAPS
   * with. It will enable the domain controllers in this domain to accept LDAPS
   * connections (either LDAP over SSL/TLS or the StartTLS operation). A valid
   * certificate chain must form a valid x.509 certificate chain (or be
   * comprised of a single self-signed certificate. It must be encrypted with
   * either: 1) PBES2 + PBKDF2 + AES256 encryption and SHA256 PRF; or 2)
   * pbeWithSHA1And3-KeyTripleDES-CBC Private key must be included for the leaf
   * / single self-signed certificate. Note: For a fqdn your-example-domain.com,
   * the wildcard fqdn is *.your-example-domain.com. Specifically the leaf
   * certificate must have: - Either a blank subject or a subject with CN
   * matching the wildcard fqdn. - Exactly two SANs - the fqdn and wildcard
   * fqdn. - Encipherment and digital key signature key usages. - Server
   * authentication extended key usage (OID=1.3.6.1.5.5.7.3.1) - Private key
   * must be in one of the following formats: RSA, ECDSA, ED25519. - Private key
   * must have appropriate key length: 2048 for RSA, 256 for ECDSA - Signature
   * algorithm of the leaf certificate cannot be MD2, MD5 or SHA1.
   */
  certificatePfx?: Uint8Array;
  /**
   * The resource name of the LDAPS settings. Uses the form:
   * `projects/{project}/locations/{location}/domains/{domain}`.
   */
  name?: string;
  /**
   * Output only. The current state of this LDAPS settings.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "UPDATING" | "ACTIVE" | "FAILED";
  /**
   * Output only. Last update time.
   */
  readonly updateTime?: Date;
}

function serializeLDAPSSettings(data: any): LDAPSSettings {
  return {
    ...data,
    certificatePfx: data["certificatePfx"] !== undefined ? encodeBase64(data["certificatePfx"]) : undefined,
  };
}

function deserializeLDAPSSettings(data: any): LDAPSSettings {
  return {
    ...data,
    certificate: data["certificate"] !== undefined ? deserializeCertificate(data["certificate"]) : undefined,
    certificatePfx: data["certificatePfx"] !== undefined ? decodeBase64(data["certificatePfx"] as string) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * ListBackupsResponse is the response message for ListBackups method.
 */
export interface ListBackupsResponse {
  /**
   * A list of Cloud AD backups in the domain.
   */
  backups?: Backup[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Response message for ListDomains
 */
export interface ListDomainsResponse {
  /**
   * A list of Managed Identities Service domains in the project.
   */
  domains?: Domain[];
  /**
   * A token to retrieve the next page of results, or empty if there are no
   * more results in the list.
   */
  nextPageToken?: string;
  /**
   * A list of locations that could not be reached.
   */
  unreachable?: string[];
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
 * ListPeeringsResponse is the response message for ListPeerings method.
 */
export interface ListPeeringsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * A list of Managed Identities Service Peerings in the project.
   */
  peerings?: Peering[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * ListSqlIntegrationsResponse is the response message for ListSqlIntegrations
 * method.
 */
export interface ListSqlIntegrationsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * A list of SQLIntegrations of a domain.
   */
  sqlIntegrations?: SqlIntegration[];
  /**
   * A list of locations that could not be reached.
   */
  unreachable?: string[];
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
 * LINT.IfChange Defines policies to service maintenance events.
 */
export interface MaintenancePolicy {
  /**
   * Output only. The time when the resource was created.
   */
  createTime?: Date;
  /**
   * Optional. Description of what this policy is for. Create/Update methods
   * return INVALID_ARGUMENT if the length is greater than 512.
   */
  description?: string;
  /**
   * Optional. Resource labels to represent user provided metadata. Each label
   * is a key-value pair, where both the key and the value are arbitrary strings
   * provided by the user.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Required. MaintenancePolicy name using the form:
   * `projects/{project_id}/locations/{location_id}/maintenancePolicies/{maintenance_policy_id}`
   * where {project_id} refers to a GCP consumer project ID, {location_id}
   * refers to a GCP region/zone, {maintenance_policy_id} must be 1-63
   * characters long and match the regular expression
   * `[a-z0-9]([-a-z0-9]*[a-z0-9])?`.
   */
  name?: string;
  /**
   * Optional. The state of the policy.
   */
  state?:  | "STATE_UNSPECIFIED" | "READY" | "DELETING";
  /**
   * Maintenance policy applicable to instance update.
   */
  updatePolicy?: UpdatePolicy;
  /**
   * Output only. The time when the resource was updated.
   */
  updateTime?: Date;
}

function serializeMaintenancePolicy(data: any): MaintenancePolicy {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updatePolicy: data["updatePolicy"] !== undefined ? serializeUpdatePolicy(data["updatePolicy"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeMaintenancePolicy(data: any): MaintenancePolicy {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updatePolicy: data["updatePolicy"] !== undefined ? deserializeUpdatePolicy(data["updatePolicy"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * MaintenanceWindow definition.
 */
export interface MaintenanceWindow {
  /**
   * Daily cycle.
   */
  dailyCycle?: DailyCycle;
  /**
   * Weekly cycle.
   */
  weeklyCycle?: WeeklyCycle;
}

function serializeMaintenanceWindow(data: any): MaintenanceWindow {
  return {
    ...data,
    dailyCycle: data["dailyCycle"] !== undefined ? serializeDailyCycle(data["dailyCycle"]) : undefined,
    weeklyCycle: data["weeklyCycle"] !== undefined ? serializeWeeklyCycle(data["weeklyCycle"]) : undefined,
  };
}

function deserializeMaintenanceWindow(data: any): MaintenanceWindow {
  return {
    ...data,
    dailyCycle: data["dailyCycle"] !== undefined ? deserializeDailyCycle(data["dailyCycle"]) : undefined,
    weeklyCycle: data["weeklyCycle"] !== undefined ? deserializeWeeklyCycle(data["weeklyCycle"]) : undefined,
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
 * Represents the metadata of the long-running operation.
 */
export interface OperationMetadata {
  /**
   * Output only. API version used to start the operation.
   */
  readonly apiVersion?: string;
  /**
   * Output only. Identifies whether the user has requested cancellation of the
   * operation. Operations that have been cancelled successfully have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * `Code.CANCELLED`.
   */
  readonly cancelRequested?: boolean;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Human-readable status of the operation, if any.
   */
  readonly statusDetail?: string;
  /**
   * Output only. Server-defined resource path for the target of the operation.
   */
  readonly target?: string;
  /**
   * Output only. Name of the verb executed by the operation.
   */
  readonly verb?: string;
}

/**
 * Represents a Managed Service for Microsoft Active Directory Peering.
 */
export interface Peering {
  /**
   * Required. The full names of the Google Compute Engine
   * [networks](/compute/docs/networks-and-firewalls#networks) to which the
   * instance is connected. Caller needs to make sure that CIDR subnets do not
   * overlap between networks, else peering creation will fail.
   */
  authorizedNetwork?: string;
  /**
   * Output only. The time the instance was created.
   */
  readonly createTime?: Date;
  /**
   * Required. Full domain resource path for the Managed AD Domain involved in
   * peering. The resource path should be in the form:
   * `projects/{project_id}/locations/global/domains/{domain_name}`
   */
  domainResource?: string;
  /**
   * Optional. Resource labels to represent user-provided metadata.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. Unique name of the peering in this scope including projects
   * and location using the form:
   * `projects/{project_id}/locations/global/peerings/{peering_id}`.
   */
  readonly name?: string;
  /**
   * Output only. The current state of this Peering.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "CONNECTED" | "DISCONNECTED" | "DELETING";
  /**
   * Output only. Additional information about the current status of this
   * peering, if available.
   */
  readonly statusMessage?: string;
  /**
   * Output only. Last update time.
   */
  readonly updateTime?: Date;
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
 * Additional options for
 * Managedidentities#projectsLocationsGlobalDomainsBackupsCreate.
 */
export interface ProjectsLocationsGlobalDomainsBackupsCreateOptions {
  /**
   * Required. Backup Id, unique name to identify the backups with the
   * following restrictions: * Must be lowercase letters, numbers, and hyphens *
   * Must start with a letter. * Must contain between 1-63 characters. * Must
   * end with a number or a letter. * Must be unique within the domain.
   */
  backupId?: string;
}

/**
 * Additional options for
 * Managedidentities#projectsLocationsGlobalDomainsBackupsGetIamPolicy.
 */
export interface ProjectsLocationsGlobalDomainsBackupsGetIamPolicyOptions {
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
 * Additional options for
 * Managedidentities#projectsLocationsGlobalDomainsBackupsList.
 */
export interface ProjectsLocationsGlobalDomainsBackupsListOptions {
  /**
   * Optional. Filter specifying constraints of a list operation.
   */
  filter?: string;
  /**
   * Optional. Specifies the ordering of results following syntax at
   * https://cloud.google.com/apis/design/design_patterns#sorting_order.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of items to return. If not specified, a
   * default value of 1000 will be used by the service. Regardless of the
   * page_size value, the response may include a partial list and a caller
   * should only rely on response's next_page_token to determine if there are
   * more instances left to be queried.
   */
  pageSize?: number;
  /**
   * Optional. The `next_page_token` value returned from a previous List
   * request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Managedidentities#projectsLocationsGlobalDomainsBackupsPatch.
 */
export interface ProjectsLocationsGlobalDomainsBackupsPatchOptions {
  /**
   * Required. Mask of fields to update. At least one path must be supplied in
   * this field. The elements of the repeated paths field may only include these
   * fields from Backup: * `labels`
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsGlobalDomainsBackupsPatchOptions(data: any): ProjectsLocationsGlobalDomainsBackupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsGlobalDomainsBackupsPatchOptions(data: any): ProjectsLocationsGlobalDomainsBackupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Managedidentities#projectsLocationsGlobalDomainsCreate.
 */
export interface ProjectsLocationsGlobalDomainsCreateOptions {
  /**
   * Required. The fully qualified domain name. e.g.
   * mydomain.myorganization.com, with the following restrictions: * Must
   * contain only lowercase letters, numbers, periods and hyphens. * Must start
   * with a letter. * Must contain between 2-64 characters. * Must end with a
   * number or a letter. * Must not start with period. * First segment length
   * (mydomain for example above) shouldn't exceed 15 chars. * The last segment
   * cannot be fully numeric. * Must be unique within the customer project.
   */
  domainName?: string;
}

/**
 * Additional options for
 * Managedidentities#projectsLocationsGlobalDomainsGetIamPolicy.
 */
export interface ProjectsLocationsGlobalDomainsGetIamPolicyOptions {
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
 * Additional options for Managedidentities#projectsLocationsGlobalDomainsList.
 */
export interface ProjectsLocationsGlobalDomainsListOptions {
  /**
   * Optional. A filter specifying constraints of a list operation. For
   * example, `Domain.fqdn="mydomain.myorginization"`.
   */
  filter?: string;
  /**
   * Optional. Specifies the ordering of results. See [Sorting
   * order](https://cloud.google.com/apis/design/design_patterns#sorting_order)
   * for more information.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of items to return. If not specified, a
   * default value of 1000 will be used. Regardless of the page_size value, the
   * response may include a partial list. Callers should rely on a response's
   * next_page_token to determine if there are additional results to list.
   */
  pageSize?: number;
  /**
   * Optional. The `next_page_token` value returned from a previous
   * ListDomainsRequest request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Managedidentities#projectsLocationsGlobalDomainsPatch.
 */
export interface ProjectsLocationsGlobalDomainsPatchOptions {
  /**
   * Required. Mask of fields to update. At least one path must be supplied in
   * this field. The elements of the repeated paths field may only include
   * fields from Domain: * `labels` * `locations` * `authorized_networks` *
   * `audit_logs_enabled`
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsGlobalDomainsPatchOptions(data: any): ProjectsLocationsGlobalDomainsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsGlobalDomainsPatchOptions(data: any): ProjectsLocationsGlobalDomainsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Managedidentities#projectsLocationsGlobalDomainsSqlIntegrationsList.
 */
export interface ProjectsLocationsGlobalDomainsSqlIntegrationsListOptions {
  /**
   * Optional. Filter specifying constraints of a list operation. For example,
   * `SqlIntegration.name="sql"`.
   */
  filter?: string;
  /**
   * Optional. Specifies the ordering of results following syntax at
   * https://cloud.google.com/apis/design/design_patterns#sorting_order.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of items to return. If not specified, a
   * default value of 1000 will be used by the service. Regardless of the
   * page_size value, the response may include a partial list and a caller
   * should only rely on response'ANIZATIONs next_page_token to determine if
   * there are more instances left to be queried.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token value returned from a previous List request,
   * if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Managedidentities#projectsLocationsGlobalDomainsUpdateLdapssettings.
 */
export interface ProjectsLocationsGlobalDomainsUpdateLdapssettingsOptions {
  /**
   * Required. Mask of fields to update. At least one path must be supplied in
   * this field. For the `FieldMask` definition, see
   * https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsGlobalDomainsUpdateLdapssettingsOptions(data: any): ProjectsLocationsGlobalDomainsUpdateLdapssettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsGlobalDomainsUpdateLdapssettingsOptions(data: any): ProjectsLocationsGlobalDomainsUpdateLdapssettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Managedidentities#projectsLocationsGlobalOperationsList.
 */
export interface ProjectsLocationsGlobalOperationsListOptions {
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
 * Additional options for
 * Managedidentities#projectsLocationsGlobalPeeringsCreate.
 */
export interface ProjectsLocationsGlobalPeeringsCreateOptions {
  /**
   * Required. Peering Id, unique name to identify peering. It should follow
   * the regex format "^(?:[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?)$"
   */
  peeringId?: string;
}

/**
 * Additional options for
 * Managedidentities#projectsLocationsGlobalPeeringsGetIamPolicy.
 */
export interface ProjectsLocationsGlobalPeeringsGetIamPolicyOptions {
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
 * Additional options for
 * Managedidentities#projectsLocationsGlobalPeeringsList.
 */
export interface ProjectsLocationsGlobalPeeringsListOptions {
  /**
   * Optional. Filter specifying constraints of a list operation. For example,
   * `peering.authorized_network="projects/myprojectid/global/networks/mynetwork"`.
   */
  filter?: string;
  /**
   * Optional. Specifies the ordering of results following syntax at
   * https://cloud.google.com/apis/design/design_patterns#sorting_order.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of items to return. If not specified, a
   * default value of 1000 will be used by the service. Regardless of the
   * page_size value, the response may include a partial list and a caller
   * should only rely on response's next_page_token to determine if there are
   * more instances left to be queried.
   */
  pageSize?: number;
  /**
   * Optional. The next_page_token value returned from a previous List request,
   * if any.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Managedidentities#projectsLocationsGlobalPeeringsPatch.
 */
export interface ProjectsLocationsGlobalPeeringsPatchOptions {
  /**
   * Required. Mask of fields to update. At least one path must be supplied in
   * this field. The elements of the repeated paths field may only include these
   * fields from Peering: * `labels`
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsGlobalPeeringsPatchOptions(data: any): ProjectsLocationsGlobalPeeringsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsGlobalPeeringsPatchOptions(data: any): ProjectsLocationsGlobalPeeringsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Managedidentities#projectsLocationsList.
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
 * Request message for ReconfigureTrust
 */
export interface ReconfigureTrustRequest {
  /**
   * Required. The target DNS server IP addresses to resolve the remote domain
   * involved in the trust.
   */
  targetDnsIpAddresses?: string[];
  /**
   * Required. The fully-qualified target domain name which will be in trust
   * with current domain.
   */
  targetDomainName?: string;
}

/**
 * Request message for ResetAdminPassword
 */
export interface ResetAdminPasswordRequest {
}

/**
 * Response message for ResetAdminPassword
 */
export interface ResetAdminPasswordResponse {
  /**
   * A random password. See admin for more information.
   */
  password?: string;
}

/**
 * RestoreDomainRequest is the request received by RestoreDomain rpc
 */
export interface RestoreDomainRequest {
  /**
   * Required. ID of the backup to be restored
   */
  backupId?: string;
}

/**
 * Configure the schedule.
 */
export interface Schedule {
  /**
   * Allows to define schedule that runs specified day of the week.
   */
  day?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * Output only. Duration of the time window, set by service producer.
   */
  duration?: number /* Duration */;
  /**
   * Time within the window to start the operations.
   */
  startTime?: TimeOfDay;
}

function serializeSchedule(data: any): Schedule {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeSchedule(data: any): Schedule {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
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
}

function serializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
  };
}

function deserializeSetIamPolicyRequest(data: any): SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
  };
}

/**
 * Represents the SQL instance integrated with Managed AD.
 */
export interface SqlIntegration {
  /**
   * Output only. The time the SQL integration was created.
   */
  readonly createTime?: Date;
  /**
   * The unique name of the SQL integration in the form of
   * `projects/{project_id}/locations/global/domains/{domain_name}/sqlIntegrations/{sql_integration}`
   */
  name?: string;
  /**
   * The full resource name of an integrated SQL instance
   */
  sqlInstance?: string;
  /**
   * Output only. The current state of the SQL integration.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "DELETING" | "READY";
  /**
   * Output only. The time the SQL integration was updated.
   */
  readonly updateTime?: Date;
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
 * Represents a time of day. The date and time zone are either not significant
 * or are specified elsewhere. An API may choose to allow leap seconds. Related
 * types are google.type.Date and `google.protobuf.Timestamp`.
 */
export interface TimeOfDay {
  /**
   * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose
   * to allow the value "24:00:00" for scenarios like business closing time.
   */
  hours?: number;
  /**
   * Minutes of hour of day. Must be from 0 to 59.
   */
  minutes?: number;
  /**
   * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
   */
  nanos?: number;
  /**
   * Seconds of minutes of the time. Must normally be from 0 to 59. An API may
   * allow the value 60 if it allows leap-seconds.
   */
  seconds?: number;
}

/**
 * Represents a relationship between two domains. This allows a controller in
 * one domain to authenticate a user in another domain. If the trust is being
 * changed, it will be placed into the UPDATING state, which indicates that the
 * resource is being reconciled. At this point, Get will reflect an intermediate
 * state.
 */
export interface Trust {
  /**
   * Output only. The time the instance was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The last heartbeat time when the trust was known to be
   * connected.
   */
  readonly lastTrustHeartbeatTime?: Date;
  /**
   * Optional. The trust authentication type, which decides whether the trusted
   * side has forest/domain wide access or selective access to an approved set
   * of resources.
   */
  selectiveAuthentication?: boolean;
  /**
   * Output only. The current state of the trust.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "UPDATING" | "DELETING" | "CONNECTED" | "DISCONNECTED";
  /**
   * Output only. Additional information about the current state of the trust,
   * if available.
   */
  readonly stateDescription?: string;
  /**
   * Required. The target DNS server IP addresses which can resolve the remote
   * domain involved in the trust.
   */
  targetDnsIpAddresses?: string[];
  /**
   * Required. The fully qualified target domain name which will be in trust
   * with the current domain.
   */
  targetDomainName?: string;
  /**
   * Required. The trust direction, which decides if the current domain is
   * trusted, trusting, or both.
   */
  trustDirection?:  | "TRUST_DIRECTION_UNSPECIFIED" | "INBOUND" | "OUTBOUND" | "BIDIRECTIONAL";
  /**
   * Required. The trust secret used for the handshake with the target domain.
   * This will not be stored.
   */
  trustHandshakeSecret?: string;
  /**
   * Required. The type of trust represented by the trust resource.
   */
  trustType?:  | "TRUST_TYPE_UNSPECIFIED" | "FOREST" | "EXTERNAL";
  /**
   * Output only. The last update time.
   */
  readonly updateTime?: Date;
}

/**
 * Maintenance policy applicable to instance updates.
 */
export interface UpdatePolicy {
  /**
   * Optional. Relative scheduling channel applied to resource.
   */
  channel?:  | "UPDATE_CHANNEL_UNSPECIFIED" | "EARLIER" | "LATER" | "WEEK1" | "WEEK2" | "WEEK5";
  /**
   * Deny Maintenance Period that is applied to resource to indicate when
   * maintenance is forbidden. User can specify zero or more non-overlapping
   * deny periods. Maximum number of deny_maintenance_periods expected is one.
   */
  denyMaintenancePeriods?: DenyMaintenancePeriod[];
  /**
   * Optional. Maintenance window that is applied to resources covered by this
   * policy.
   */
  window?: MaintenanceWindow;
}

function serializeUpdatePolicy(data: any): UpdatePolicy {
  return {
    ...data,
    window: data["window"] !== undefined ? serializeMaintenanceWindow(data["window"]) : undefined,
  };
}

function deserializeUpdatePolicy(data: any): UpdatePolicy {
  return {
    ...data,
    window: data["window"] !== undefined ? deserializeMaintenanceWindow(data["window"]) : undefined,
  };
}

/**
 * Request message for ValidateTrust
 */
export interface ValidateTrustRequest {
  /**
   * Required. The domain trust to validate trust state for.
   */
  trust?: Trust;
}

/**
 * Time window specified for weekly operations.
 */
export interface WeeklyCycle {
  /**
   * User can specify multiple windows in a week. Minimum of 1 window.
   */
  schedule?: Schedule[];
}

function serializeWeeklyCycle(data: any): WeeklyCycle {
  return {
    ...data,
    schedule: data["schedule"] !== undefined ? data["schedule"].map((item: any) => (serializeSchedule(item))) : undefined,
  };
}

function deserializeWeeklyCycle(data: any): WeeklyCycle {
  return {
    ...data,
    schedule: data["schedule"] !== undefined ? data["schedule"].map((item: any) => (deserializeSchedule(item))) : undefined,
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
