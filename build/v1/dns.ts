// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud DNS API Client for Deno
 * =============================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/dns/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class DNS {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://dns.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Atomically updates the ResourceRecordSet collection.
   *
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param project Identifies the project addressed by this request.
   */
  async changesCreate(managedZone: string, project: string, req: Change, opts: ChangesCreateOptions = {}): Promise<Change> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }/changes`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Change;
  }

  /**
   * Fetches the representation of an existing Change.
   *
   * @param changeId The identifier of the requested change, from a previous ResourceRecordSetsChangeResponse.
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param project Identifies the project addressed by this request.
   */
  async changesGet(changeId: string, managedZone: string, project: string, opts: ChangesGetOptions = {}): Promise<Change> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }/changes/${ changeId }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Change;
  }

  /**
   * Enumerates Changes to a ResourceRecordSet collection.
   *
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param project Identifies the project addressed by this request.
   */
  async changesList(managedZone: string, project: string, opts: ChangesListOptions = {}): Promise<ChangesListResponse> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }/changes`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.sortBy !== undefined) {
      url.searchParams.append("sortBy", String(opts.sortBy));
    }
    if (opts.sortOrder !== undefined) {
      url.searchParams.append("sortOrder", String(opts.sortOrder));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ChangesListResponse;
  }

  /**
   * Fetches the representation of an existing DnsKey.
   *
   * @param dnsKeyId The identifier of the requested DnsKey.
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param project Identifies the project addressed by this request.
   */
  async dnsKeysGet(dnsKeyId: string, managedZone: string, project: string, opts: DnsKeysGetOptions = {}): Promise<DnsKey> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }/dnsKeys/${ dnsKeyId }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    if (opts.digestType !== undefined) {
      url.searchParams.append("digestType", String(opts.digestType));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as DnsKey;
  }

  /**
   * Enumerates DnsKeys to a ResourceRecordSet collection.
   *
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param project Identifies the project addressed by this request.
   */
  async dnsKeysList(managedZone: string, project: string, opts: DnsKeysListOptions = {}): Promise<DnsKeysListResponse> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }/dnsKeys`);
    if (opts.digestType !== undefined) {
      url.searchParams.append("digestType", String(opts.digestType));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as DnsKeysListResponse;
  }

  /**
   * Fetches the representation of an existing Operation.
   *
   * @param managedZone Identifies the managed zone addressed by this request.
   * @param operation Identifies the operation addressed by this request (ID of the operation).
   * @param project Identifies the project addressed by this request.
   */
  async managedZoneOperationsGet(managedZone: string, operation: string, project: string, opts: ManagedZoneOperationsGetOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }/operations/${ operation }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeOperation(data);
  }

  /**
   * Enumerates Operations for the given ManagedZone.
   *
   * @param managedZone Identifies the managed zone addressed by this request.
   * @param project Identifies the project addressed by this request.
   */
  async managedZoneOperationsList(managedZone: string, project: string, opts: ManagedZoneOperationsListOptions = {}): Promise<ManagedZoneOperationsListResponse> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }/operations`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.sortBy !== undefined) {
      url.searchParams.append("sortBy", String(opts.sortBy));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeManagedZoneOperationsListResponse(data);
  }

  /**
   * Creates a new ManagedZone.
   *
   * @param project Identifies the project addressed by this request.
   */
  async managedZonesCreate(project: string, req: ManagedZone, opts: ManagedZonesCreateOptions = {}): Promise<ManagedZone> {
    req = serializeManagedZone(req);
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeManagedZone(data);
  }

  /**
   * Deletes a previously created ManagedZone.
   *
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param project Identifies the project addressed by this request.
   */
  async managedZonesDelete(managedZone: string, project: string, opts: ManagedZonesDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Fetches the representation of an existing ManagedZone.
   *
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param project Identifies the project addressed by this request.
   */
  async managedZonesGet(managedZone: string, project: string, opts: ManagedZonesGetOptions = {}): Promise<ManagedZone> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeManagedZone(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async managedZonesGetIamPolicy(resource: string, req: GoogleIamV1GetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}dns/v1/${ resource }:getIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Enumerates ManagedZones that have been created but not yet deleted.
   *
   * @param project Identifies the project addressed by this request.
   */
  async managedZonesList(project: string, opts: ManagedZonesListOptions = {}): Promise<ManagedZonesListResponse> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones`);
    if (opts.dnsName !== undefined) {
      url.searchParams.append("dnsName", String(opts.dnsName));
    }
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeManagedZonesListResponse(data);
  }

  /**
   * Applies a partial update to an existing ManagedZone.
   *
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param project Identifies the project addressed by this request.
   */
  async managedZonesPatch(managedZone: string, project: string, req: ManagedZone, opts: ManagedZonesPatchOptions = {}): Promise<Operation> {
    req = serializeManagedZone(req);
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and
   * `PERMISSION_DENIED` errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async managedZonesSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}dns/v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Returns permissions that a caller has on the specified resource. If the
   * resource does not exist, this returns an empty set of permissions, not a
   * `NOT_FOUND` error. Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async managedZonesTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}dns/v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Updates an existing ManagedZone.
   *
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param project Identifies the project addressed by this request.
   */
  async managedZonesUpdate(managedZone: string, project: string, req: ManagedZone, opts: ManagedZonesUpdateOptions = {}): Promise<Operation> {
    req = serializeManagedZone(req);
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeOperation(data);
  }

  /**
   * Creates a new Policy.
   *
   * @param project Identifies the project addressed by this request.
   */
  async policiesCreate(project: string, req: Policy, opts: PoliciesCreateOptions = {}): Promise<Policy> {
    req = serializePolicy(req);
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/policies`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePolicy(data);
  }

  /**
   * Deletes a previously created Policy. Fails if the policy is still being
   * referenced by a network.
   *
   * @param policy User given friendly name of the policy addressed by this request.
   * @param project Identifies the project addressed by this request.
   */
  async policiesDelete(policy: string, project: string, opts: PoliciesDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/policies/${ policy }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Fetches the representation of an existing Policy.
   *
   * @param policy User given friendly name of the policy addressed by this request.
   * @param project Identifies the project addressed by this request.
   */
  async policiesGet(policy: string, project: string, opts: PoliciesGetOptions = {}): Promise<Policy> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/policies/${ policy }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePolicy(data);
  }

  /**
   * Enumerates all Policies associated with a project.
   *
   * @param project Identifies the project addressed by this request.
   */
  async policiesList(project: string, opts: PoliciesListOptions = {}): Promise<PoliciesListResponse> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/policies`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePoliciesListResponse(data);
  }

  /**
   * Applies a partial update to an existing Policy.
   *
   * @param policy User given friendly name of the policy addressed by this request.
   * @param project Identifies the project addressed by this request.
   */
  async policiesPatch(policy: string, project: string, req: Policy, opts: PoliciesPatchOptions = {}): Promise<PoliciesPatchResponse> {
    req = serializePolicy(req);
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/policies/${ policy }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializePoliciesPatchResponse(data);
  }

  /**
   * Updates an existing Policy.
   *
   * @param policy User given friendly name of the policy addressed by this request.
   * @param project Identifies the project addressed by this request.
   */
  async policiesUpdate(policy: string, project: string, req: Policy, opts: PoliciesUpdateOptions = {}): Promise<PoliciesUpdateResponse> {
    req = serializePolicy(req);
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/policies/${ policy }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializePoliciesUpdateResponse(data);
  }

  /**
   * Fetches the representation of an existing Project.
   *
   * @param project Identifies the project addressed by this request.
   */
  async projectsGet(project: string, opts: ProjectsGetOptions = {}): Promise<Project> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeProject(data);
  }

  /**
   * Creates a new ResourceRecordSet.
   *
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param project Identifies the project addressed by this request.
   */
  async resourceRecordSetsCreate(managedZone: string, project: string, req: ResourceRecordSet, opts: ResourceRecordSetsCreateOptions = {}): Promise<ResourceRecordSet> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }/rrsets`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ResourceRecordSet;
  }

  /**
   * Deletes a previously created ResourceRecordSet.
   *
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param name Fully qualified domain name.
   * @param project Identifies the project addressed by this request.
   * @param type RRSet type.
   */
  async resourceRecordSetsDelete(managedZone: string, name: string, project: string, type: string, opts: ResourceRecordSetsDeleteOptions = {}): Promise<ResourceRecordSetsDeleteResponse> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }/rrsets/${ name }/${ type }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as ResourceRecordSetsDeleteResponse;
  }

  /**
   * Fetches the representation of an existing ResourceRecordSet.
   *
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param name Fully qualified domain name.
   * @param project Identifies the project addressed by this request.
   * @param type RRSet type.
   */
  async resourceRecordSetsGet(managedZone: string, name: string, project: string, type: string, opts: ResourceRecordSetsGetOptions = {}): Promise<ResourceRecordSet> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }/rrsets/${ name }/${ type }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ResourceRecordSet;
  }

  /**
   * Enumerates ResourceRecordSets that you have created but not yet deleted.
   *
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param project Identifies the project addressed by this request.
   */
  async resourceRecordSetsList(managedZone: string, project: string, opts: ResourceRecordSetsListOptions = {}): Promise<ResourceRecordSetsListResponse> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }/rrsets`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ResourceRecordSetsListResponse;
  }

  /**
   * Applies a partial update to an existing ResourceRecordSet.
   *
   * @param managedZone Identifies the managed zone addressed by this request. Can be the managed zone name or ID.
   * @param name Fully qualified domain name.
   * @param project Identifies the project addressed by this request.
   * @param type RRSet type.
   */
  async resourceRecordSetsPatch(managedZone: string, name: string, project: string, type: string, req: ResourceRecordSet, opts: ResourceRecordSetsPatchOptions = {}): Promise<ResourceRecordSet> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/managedZones/${ managedZone }/rrsets/${ name }/${ type }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as ResourceRecordSet;
  }

  /**
   * Creates a new Response Policy
   *
   * @param project Identifies the project addressed by this request.
   */
  async responsePoliciesCreate(project: string, req: ResponsePolicy, opts: ResponsePoliciesCreateOptions = {}): Promise<ResponsePolicy> {
    req = serializeResponsePolicy(req);
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/responsePolicies`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeResponsePolicy(data);
  }

  /**
   * Deletes a previously created Response Policy. Fails if the response policy
   * is non-empty or still being referenced by a network.
   *
   * @param project Identifies the project addressed by this request.
   * @param responsePolicy User assigned name of the Response Policy addressed by this request.
   */
  async responsePoliciesDelete(project: string, responsePolicy: string, opts: ResponsePoliciesDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/responsePolicies/${ responsePolicy }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Fetches the representation of an existing Response Policy.
   *
   * @param project Identifies the project addressed by this request.
   * @param responsePolicy User assigned name of the Response Policy addressed by this request.
   */
  async responsePoliciesGet(project: string, responsePolicy: string, opts: ResponsePoliciesGetOptions = {}): Promise<ResponsePolicy> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/responsePolicies/${ responsePolicy }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeResponsePolicy(data);
  }

  /**
   * Enumerates all Response Policies associated with a project.
   *
   * @param project Identifies the project addressed by this request.
   */
  async responsePoliciesList(project: string, opts: ResponsePoliciesListOptions = {}): Promise<ResponsePoliciesListResponse> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/responsePolicies`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeResponsePoliciesListResponse(data);
  }

  /**
   * Applies a partial update to an existing Response Policy.
   *
   * @param project Identifies the project addressed by this request.
   * @param responsePolicy User assigned name of the response policy addressed by this request.
   */
  async responsePoliciesPatch(project: string, responsePolicy: string, req: ResponsePolicy, opts: ResponsePoliciesPatchOptions = {}): Promise<ResponsePoliciesPatchResponse> {
    req = serializeResponsePolicy(req);
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/responsePolicies/${ responsePolicy }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeResponsePoliciesPatchResponse(data);
  }

  /**
   * Updates an existing Response Policy.
   *
   * @param project Identifies the project addressed by this request.
   * @param responsePolicy User assigned name of the Response Policy addressed by this request.
   */
  async responsePoliciesUpdate(project: string, responsePolicy: string, req: ResponsePolicy, opts: ResponsePoliciesUpdateOptions = {}): Promise<ResponsePoliciesUpdateResponse> {
    req = serializeResponsePolicy(req);
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/responsePolicies/${ responsePolicy }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeResponsePoliciesUpdateResponse(data);
  }

  /**
   * Creates a new Response Policy Rule.
   *
   * @param project Identifies the project addressed by this request.
   * @param responsePolicy User assigned name of the Response Policy containing the Response Policy Rule.
   */
  async responsePolicyRulesCreate(project: string, responsePolicy: string, req: ResponsePolicyRule, opts: ResponsePolicyRulesCreateOptions = {}): Promise<ResponsePolicyRule> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/responsePolicies/${ responsePolicy }/rules`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ResponsePolicyRule;
  }

  /**
   * Deletes a previously created Response Policy Rule.
   *
   * @param project Identifies the project addressed by this request.
   * @param responsePolicy User assigned name of the Response Policy containing the Response Policy Rule.
   * @param responsePolicyRule User assigned name of the Response Policy Rule addressed by this request.
   */
  async responsePolicyRulesDelete(project: string, responsePolicy: string, responsePolicyRule: string, opts: ResponsePolicyRulesDeleteOptions = {}): Promise<void> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/responsePolicies/${ responsePolicy }/rules/${ responsePolicyRule }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Fetches the representation of an existing Response Policy Rule.
   *
   * @param project Identifies the project addressed by this request.
   * @param responsePolicy User assigned name of the Response Policy containing the Response Policy Rule.
   * @param responsePolicyRule User assigned name of the Response Policy Rule addressed by this request.
   */
  async responsePolicyRulesGet(project: string, responsePolicy: string, responsePolicyRule: string, opts: ResponsePolicyRulesGetOptions = {}): Promise<ResponsePolicyRule> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/responsePolicies/${ responsePolicy }/rules/${ responsePolicyRule }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ResponsePolicyRule;
  }

  /**
   * Enumerates all Response Policy Rules associated with a project.
   *
   * @param project Identifies the project addressed by this request.
   * @param responsePolicy User assigned name of the Response Policy to list.
   */
  async responsePolicyRulesList(project: string, responsePolicy: string, opts: ResponsePolicyRulesListOptions = {}): Promise<ResponsePolicyRulesListResponse> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/responsePolicies/${ responsePolicy }/rules`);
    if (opts.maxResults !== undefined) {
      url.searchParams.append("maxResults", String(opts.maxResults));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ResponsePolicyRulesListResponse;
  }

  /**
   * Applies a partial update to an existing Response Policy Rule.
   *
   * @param project Identifies the project addressed by this request.
   * @param responsePolicy User assigned name of the Response Policy containing the Response Policy Rule.
   * @param responsePolicyRule User assigned name of the Response Policy Rule addressed by this request.
   */
  async responsePolicyRulesPatch(project: string, responsePolicy: string, responsePolicyRule: string, req: ResponsePolicyRule, opts: ResponsePolicyRulesPatchOptions = {}): Promise<ResponsePolicyRulesPatchResponse> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/responsePolicies/${ responsePolicy }/rules/${ responsePolicyRule }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as ResponsePolicyRulesPatchResponse;
  }

  /**
   * Updates an existing Response Policy Rule.
   *
   * @param project Identifies the project addressed by this request.
   * @param responsePolicy User assigned name of the Response Policy containing the Response Policy Rule.
   * @param responsePolicyRule User assigned name of the Response Policy Rule addressed by this request.
   */
  async responsePolicyRulesUpdate(project: string, responsePolicy: string, responsePolicyRule: string, req: ResponsePolicyRule, opts: ResponsePolicyRulesUpdateOptions = {}): Promise<ResponsePolicyRulesUpdateResponse> {
    const url = new URL(`${this.#baseUrl}dns/v1/projects/${ project }/responsePolicies/${ responsePolicy }/rules/${ responsePolicyRule }`);
    if (opts.clientOperationId !== undefined) {
      url.searchParams.append("clientOperationId", String(opts.clientOperationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as ResponsePolicyRulesUpdateResponse;
  }
}

/**
 * A Change represents a set of ResourceRecordSet additions and deletions
 * applied atomically to a ManagedZone. ResourceRecordSets within a ManagedZone
 * are modified by creating a new Change element in the Changes collection. In
 * turn the Changes collection also records the past modifications to the
 * ResourceRecordSets in a ManagedZone. The current state of the ManagedZone is
 * the sum effect of applying all Change elements in the Changes collection in
 * sequence.
 */
export interface Change {
  /**
   * Which ResourceRecordSets to add?
   */
  additions?: ResourceRecordSet[];
  /**
   * Which ResourceRecordSets to remove? Must match existing data exactly.
   */
  deletions?: ResourceRecordSet[];
  /**
   * Unique identifier for the resource; defined by the server (output only).
   */
  id?: string;
  /**
   * If the DNS queries for the zone will be served.
   */
  isServing?: boolean;
  kind?: string;
  /**
   * The time that this operation was started by the server (output only). This
   * is in RFC3339 text format.
   */
  startTime?: string;
  /**
   * Status of the operation (output only). A status of "done" means that the
   * request to update the authoritative servers has been sent, but the servers
   * might not be updated yet.
   */
  status?:  | "pending" | "done";
}

/**
 * Additional options for DNS#changesCreate.
 */
export interface ChangesCreateOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#changesGet.
 */
export interface ChangesGetOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#changesList.
 */
export interface ChangesListOptions {
  /**
   * Optional. Maximum number of results to be returned. If unspecified, the
   * server decides how many results to return.
   */
  maxResults?: number;
  /**
   * Optional. A tag returned by a previous list request that was truncated.
   * Use this parameter to continue a previous list request.
   */
  pageToken?: string;
  /**
   * Sorting criterion. The only supported value is change sequence.
   */
  sortBy?:  | "changeSequence";
  /**
   * Sorting order direction: 'ascending' or 'descending'.
   */
  sortOrder?: string;
}

/**
 * The response to a request to enumerate Changes to a ResourceRecordSets
 * collection.
 */
export interface ChangesListResponse {
  /**
   * The requested changes.
   */
  changes?: Change[];
  header?: ResponseHeader;
  /**
   * Type of resource.
   */
  kind?: string;
  /**
   * The presence of this field indicates that there exist more results
   * following your last page of results in pagination order. To fetch them,
   * make another list request using this value as your pagination token. This
   * lets you retrieve the complete contents of even very large collections one
   * page at a time. However, if the contents of the collection change between
   * the first and last paginated list request, the set of all elements returned
   * are an inconsistent view of the collection. You cannot retrieve a
   * "snapshot" of collections larger than the maximum page size.
   */
  nextPageToken?: string;
}

/**
 * A DNSSEC key pair.
 */
export interface DnsKey {
  /**
   * String mnemonic specifying the DNSSEC algorithm of this key. Immutable
   * after creation time.
   */
  algorithm?:  | "rsasha1" | "rsasha256" | "rsasha512" | "ecdsap256sha256" | "ecdsap384sha384";
  /**
   * The time that this resource was created in the control plane. This is in
   * RFC3339 text format. Output only.
   */
  creationTime?: string;
  /**
   * A mutable string of at most 1024 characters associated with this resource
   * for the user's convenience. Has no effect on the resource's function.
   */
  description?: string;
  /**
   * Cryptographic hashes of the DNSKEY resource record associated with this
   * DnsKey. These digests are needed to construct a DS record that points at
   * this DNS key. Output only.
   */
  digests?: DnsKeyDigest[];
  /**
   * Unique identifier for the resource; defined by the server (output only).
   */
  id?: string;
  /**
   * Active keys are used to sign subsequent changes to the ManagedZone.
   * Inactive keys are still present as DNSKEY Resource Records for the use of
   * resolvers validating existing signatures.
   */
  isActive?: boolean;
  /**
   * Length of the key in bits. Specified at creation time, and then immutable.
   */
  keyLength?: number;
  /**
   * The key tag is a non-cryptographic hash of the a DNSKEY resource record
   * associated with this DnsKey. The key tag can be used to identify a DNSKEY
   * more quickly (but it is not a unique identifier). In particular, the key
   * tag is used in a parent zone's DS record to point at the DNSKEY in this
   * child ManagedZone. The key tag is a number in the range [0, 65535] and the
   * algorithm to calculate it is specified in RFC4034 Appendix B. Output only.
   */
  keyTag?: number;
  kind?: string;
  /**
   * Base64 encoded public half of this key. Output only.
   */
  publicKey?: string;
  /**
   * One of "KEY_SIGNING" or "ZONE_SIGNING". Keys of type KEY_SIGNING have the
   * Secure Entry Point flag set and, when active, are used to sign only
   * resource record sets of type DNSKEY. Otherwise, the Secure Entry Point flag
   * is cleared, and this key is used to sign only resource record sets of other
   * types. Immutable after creation time.
   */
  type?:  | "keySigning" | "zoneSigning";
}

export interface DnsKeyDigest {
  /**
   * The base-16 encoded bytes of this digest. Suitable for use in a DS
   * resource record.
   */
  digest?: string;
  /**
   * Specifies the algorithm used to calculate this digest.
   */
  type?:  | "sha1" | "sha256" | "sha384";
}

/**
 * Additional options for DNS#dnsKeysGet.
 */
export interface DnsKeysGetOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
  /**
   * An optional comma-separated list of digest types to compute and display
   * for key signing keys. If omitted, the recommended digest type is computed
   * and displayed.
   */
  digestType?: string;
}

/**
 * Additional options for DNS#dnsKeysList.
 */
export interface DnsKeysListOptions {
  /**
   * An optional comma-separated list of digest types to compute and display
   * for key signing keys. If omitted, the recommended digest type is computed
   * and displayed.
   */
  digestType?: string;
  /**
   * Optional. Maximum number of results to be returned. If unspecified, the
   * server decides how many results to return.
   */
  maxResults?: number;
  /**
   * Optional. A tag returned by a previous list request that was truncated.
   * Use this parameter to continue a previous list request.
   */
  pageToken?: string;
}

/**
 * The response to a request to enumerate DnsKeys in a ManagedZone.
 */
export interface DnsKeysListResponse {
  /**
   * The requested resources.
   */
  dnsKeys?: DnsKey[];
  header?: ResponseHeader;
  /**
   * Type of resource.
   */
  kind?: string;
  /**
   * The presence of this field indicates that there exist more results
   * following your last page of results in pagination order. To fetch them,
   * make another list request using this value as your pagination token. In
   * this way you can retrieve the complete contents of even very large
   * collections one page at a time. However, if the contents of the collection
   * change between the first and last paginated list request, the set of all
   * elements returned are an inconsistent view of the collection. There is no
   * way to retrieve a "snapshot" of collections larger than the maximum page
   * size.
   */
  nextPageToken?: string;
}

/**
 * Parameters for DnsKey key generation. Used for generating initial keys for a
 * new ManagedZone and as default when adding a new DnsKey.
 */
export interface DnsKeySpec {
  /**
   * String mnemonic specifying the DNSSEC algorithm of this key.
   */
  algorithm?:  | "rsasha1" | "rsasha256" | "rsasha512" | "ecdsap256sha256" | "ecdsap384sha384";
  /**
   * Length of the keys in bits.
   */
  keyLength?: number;
  /**
   * Specifies whether this is a key signing key (KSK) or a zone signing key
   * (ZSK). Key signing keys have the Secure Entry Point flag set and, when
   * active, are only used to sign resource record sets of type DNSKEY. Zone
   * signing keys do not have the Secure Entry Point flag set and are used to
   * sign all other types of resource record sets.
   */
  keyType?:  | "keySigning" | "zoneSigning";
  kind?: string;
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
export interface GoogleIamV1AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: GoogleIamV1AuditLogConfig[];
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
export interface GoogleIamV1AuditLogConfig {
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
export interface GoogleIamV1Binding {
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
 * Request message for `GetIamPolicy` method.
 */
export interface GoogleIamV1GetIamPolicyRequest {
  /**
   * OPTIONAL: A `GetPolicyOptions` object for specifying options to
   * `GetIamPolicy`.
   */
  options?: GoogleIamV1GetPolicyOptions;
}

/**
 * Encapsulates settings provided to GetIamPolicy.
 */
export interface GoogleIamV1GetPolicyOptions {
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
export interface GoogleIamV1Policy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: GoogleIamV1AuditConfig[];
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
  bindings?: GoogleIamV1Binding[];
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

function serializeGoogleIamV1Policy(data: any): GoogleIamV1Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
  };
}

function deserializeGoogleIamV1Policy(data: any): GoogleIamV1Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
  };
}

/**
 * Request message for `SetIamPolicy` method.
 */
export interface GoogleIamV1SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the `resource`. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: GoogleIamV1Policy;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify.
   * Only the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used: `paths: "bindings, etag"`
   */
  updateMask?: string /* FieldMask */;
}

function serializeGoogleIamV1SetIamPolicyRequest(data: any): GoogleIamV1SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeGoogleIamV1Policy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeGoogleIamV1SetIamPolicyRequest(data: any): GoogleIamV1SetIamPolicyRequest {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializeGoogleIamV1Policy(data["policy"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request message for `TestIamPermissions` method.
 */
export interface GoogleIamV1TestIamPermissionsRequest {
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
export interface GoogleIamV1TestIamPermissionsResponse {
  /**
   * A subset of `TestPermissionsRequest.permissions` that the caller is
   * allowed.
   */
  permissions?: string[];
}

/**
 * A zone is a subtree of the DNS namespace under one administrative
 * responsibility. A ManagedZone is a resource that represents a DNS zone hosted
 * by the Cloud DNS service.
 */
export interface ManagedZone {
  cloudLoggingConfig?: ManagedZoneCloudLoggingConfig;
  /**
   * The time that this resource was created on the server. This is in RFC3339
   * text format. Output only.
   */
  creationTime?: string;
  /**
   * A mutable string of at most 1024 characters associated with this resource
   * for the user's convenience. Has no effect on the managed zone's function.
   */
  description?: string;
  /**
   * The DNS name of this managed zone, for instance "example.com.".
   */
  dnsName?: string;
  /**
   * DNSSEC configuration.
   */
  dnssecConfig?: ManagedZoneDnsSecConfig;
  /**
   * The presence for this field indicates that outbound forwarding is enabled
   * for this zone. The value of this field contains the set of destinations to
   * forward to.
   */
  forwardingConfig?: ManagedZoneForwardingConfig;
  /**
   * Unique identifier for the resource; defined by the server (output only)
   */
  id?: bigint;
  kind?: string;
  /**
   * User labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * User assigned name for this resource. Must be unique within the project.
   * The name must be 1-63 characters long, must begin with a letter, end with a
   * letter or digit, and only contain lowercase letters, digits or dashes.
   */
  name?: string;
  /**
   * Delegate your managed_zone to these virtual name servers; defined by the
   * server (output only)
   */
  nameServers?: string[];
  /**
   * Optionally specifies the NameServerSet for this ManagedZone. A
   * NameServerSet is a set of DNS name servers that all host the same
   * ManagedZones. Most users leave this field unset. If you need to use this
   * field, contact your account team.
   */
  nameServerSet?: string;
  /**
   * The presence of this field indicates that DNS Peering is enabled for this
   * zone. The value of this field contains the network to peer with.
   */
  peeringConfig?: ManagedZonePeeringConfig;
  /**
   * For privately visible zones, the set of Virtual Private Cloud resources
   * that the zone is visible from.
   */
  privateVisibilityConfig?: ManagedZonePrivateVisibilityConfig;
  /**
   * The presence of this field indicates that this is a managed reverse lookup
   * zone and Cloud DNS resolves reverse lookup queries using automatically
   * configured records for VPC resources. This only applies to networks listed
   * under private_visibility_config.
   */
  reverseLookupConfig?: ManagedZoneReverseLookupConfig;
  /**
   * This field links to the associated service directory namespace. Do not set
   * this field for public zones or forwarding zones.
   */
  serviceDirectoryConfig?: ManagedZoneServiceDirectoryConfig;
  /**
   * The zone's visibility: public zones are exposed to the Internet, while
   * private zones are visible only to Virtual Private Cloud resources.
   */
  visibility?:  | "public" | "private";
}

function serializeManagedZone(data: any): ManagedZone {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeManagedZone(data: any): ManagedZone {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

/**
 * Cloud Logging configurations for publicly visible zones.
 */
export interface ManagedZoneCloudLoggingConfig {
  /**
   * If set, enable query logging for this ManagedZone. False by default,
   * making logging opt-in.
   */
  enableLogging?: boolean;
  kind?: string;
}

export interface ManagedZoneDnsSecConfig {
  /**
   * Specifies parameters for generating initial DnsKeys for this ManagedZone.
   * Can only be changed while the state is OFF.
   */
  defaultKeySpecs?: DnsKeySpec[];
  kind?: string;
  /**
   * Specifies the mechanism for authenticated denial-of-existence responses.
   * Can only be changed while the state is OFF.
   */
  nonExistence?:  | "nsec" | "nsec3";
  /**
   * Specifies whether DNSSEC is enabled, and what mode it is in.
   */
  state?:  | "off" | "on" | "transfer";
}

export interface ManagedZoneForwardingConfig {
  kind?: string;
  /**
   * List of target name servers to forward to. Cloud DNS selects the best
   * available name server if more than one target is given.
   */
  targetNameServers?: ManagedZoneForwardingConfigNameServerTarget[];
}

export interface ManagedZoneForwardingConfigNameServerTarget {
  /**
   * Forwarding path for this NameServerTarget. If unset or set to DEFAULT,
   * Cloud DNS makes forwarding decisions based on IP address ranges; that is,
   * RFC1918 addresses go to the VPC network, non-RFC1918 addresses go to the
   * internet. When set to PRIVATE, Cloud DNS always sends queries through the
   * VPC network for this target.
   */
  forwardingPath?:  | "default" | "private";
  /**
   * IPv4 address of a target name server.
   */
  ipv4Address?: string;
  /**
   * IPv6 address of a target name server. Does not accept both fields (ipv4 &
   * ipv6) being populated. Public preview as of November 2022.
   */
  ipv6Address?: string;
  kind?: string;
}

/**
 * Additional options for DNS#managedZoneOperationsGet.
 */
export interface ManagedZoneOperationsGetOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#managedZoneOperationsList.
 */
export interface ManagedZoneOperationsListOptions {
  /**
   * Optional. Maximum number of results to be returned. If unspecified, the
   * server decides how many results to return.
   */
  maxResults?: number;
  /**
   * Optional. A tag returned by a previous list request that was truncated.
   * Use this parameter to continue a previous list request.
   */
  pageToken?: string;
  /**
   * Sorting criterion. The only supported values are START_TIME and ID.
   */
  sortBy?:  | "startTime" | "id";
}

export interface ManagedZoneOperationsListResponse {
  header?: ResponseHeader;
  /**
   * Type of resource.
   */
  kind?: string;
  /**
   * The presence of this field indicates that there exist more results
   * following your last page of results in pagination order. To fetch them,
   * make another list request using this value as your page token. This lets
   * you retrieve the complete contents of even very large collections one page
   * at a time. However, if the contents of the collection change between the
   * first and last paginated list request, the set of all elements returned are
   * an inconsistent view of the collection. You cannot retrieve a consistent
   * snapshot of a collection larger than the maximum page size.
   */
  nextPageToken?: string;
  /**
   * The operation resources.
   */
  operations?: Operation[];
}

function serializeManagedZoneOperationsListResponse(data: any): ManagedZoneOperationsListResponse {
  return {
    ...data,
    operations: data["operations"] !== undefined ? data["operations"].map((item: any) => (serializeOperation(item))) : undefined,
  };
}

function deserializeManagedZoneOperationsListResponse(data: any): ManagedZoneOperationsListResponse {
  return {
    ...data,
    operations: data["operations"] !== undefined ? data["operations"].map((item: any) => (deserializeOperation(item))) : undefined,
  };
}

export interface ManagedZonePeeringConfig {
  kind?: string;
  /**
   * The network with which to peer.
   */
  targetNetwork?: ManagedZonePeeringConfigTargetNetwork;
}

export interface ManagedZonePeeringConfigTargetNetwork {
  /**
   * The time at which the zone was deactivated, in RFC 3339 date-time format.
   * An empty string indicates that the peering connection is active. The
   * producer network can deactivate a zone. The zone is automatically
   * deactivated if the producer network that the zone targeted is deleted.
   * Output only.
   */
  deactivateTime?: string;
  kind?: string;
  /**
   * The fully qualified URL of the VPC network to forward queries to. This
   * should be formatted like
   * https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}
   */
  networkUrl?: string;
}

export interface ManagedZonePrivateVisibilityConfig {
  /**
   * The list of Google Kubernetes Engine clusters that can see this zone.
   */
  gkeClusters?: ManagedZonePrivateVisibilityConfigGKECluster[];
  kind?: string;
  /**
   * The list of VPC networks that can see this zone.
   */
  networks?: ManagedZonePrivateVisibilityConfigNetwork[];
}

export interface ManagedZonePrivateVisibilityConfigGKECluster {
  /**
   * The resource name of the cluster to bind this ManagedZone to. This should
   * be specified in the format like: projects/*\/locations/*\/clusters/*. This
   * is referenced from GKE projects.locations.clusters.get API:
   * https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/get
   */
  gkeClusterName?: string;
  kind?: string;
}

export interface ManagedZonePrivateVisibilityConfigNetwork {
  kind?: string;
  /**
   * The fully qualified URL of the VPC network to bind to. Format this URL
   * like
   * https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}
   */
  networkUrl?: string;
}

export interface ManagedZoneReverseLookupConfig {
  kind?: string;
}

/**
 * Additional options for DNS#managedZonesCreate.
 */
export interface ManagedZonesCreateOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#managedZonesDelete.
 */
export interface ManagedZonesDeleteOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Contains information about Service Directory-backed zones.
 */
export interface ManagedZoneServiceDirectoryConfig {
  kind?: string;
  /**
   * Contains information about the namespace associated with the zone.
   */
  namespace?: ManagedZoneServiceDirectoryConfigNamespace;
}

export interface ManagedZoneServiceDirectoryConfigNamespace {
  /**
   * The time that the namespace backing this zone was deleted; an empty string
   * if it still exists. This is in RFC3339 text format. Output only.
   */
  deletionTime?: string;
  kind?: string;
  /**
   * The fully qualified URL of the namespace associated with the zone. Format
   * must be
   * https://servicedirectory.googleapis.com/v1/projects/{project}/locations/{location}/namespaces/{namespace}
   */
  namespaceUrl?: string;
}

/**
 * Additional options for DNS#managedZonesGet.
 */
export interface ManagedZonesGetOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#managedZonesList.
 */
export interface ManagedZonesListOptions {
  /**
   * Restricts the list to return only zones with this domain name.
   */
  dnsName?: string;
  /**
   * Optional. Maximum number of results to be returned. If unspecified, the
   * server decides how many results to return.
   */
  maxResults?: number;
  /**
   * Optional. A tag returned by a previous list request that was truncated.
   * Use this parameter to continue a previous list request.
   */
  pageToken?: string;
}

export interface ManagedZonesListResponse {
  header?: ResponseHeader;
  /**
   * Type of resource.
   */
  kind?: string;
  /**
   * The managed zone resources.
   */
  managedZones?: ManagedZone[];
  /**
   * The presence of this field indicates that there exist more results
   * following your last page of results in pagination order. To fetch them,
   * make another list request using this value as your page token. This lets
   * you the complete contents of even very large collections one page at a
   * time. However, if the contents of the collection change between the first
   * and last paginated list request, the set of all elements returned are an
   * inconsistent view of the collection. You cannot retrieve a consistent
   * snapshot of a collection larger than the maximum page size.
   */
  nextPageToken?: string;
}

function serializeManagedZonesListResponse(data: any): ManagedZonesListResponse {
  return {
    ...data,
    managedZones: data["managedZones"] !== undefined ? data["managedZones"].map((item: any) => (serializeManagedZone(item))) : undefined,
  };
}

function deserializeManagedZonesListResponse(data: any): ManagedZonesListResponse {
  return {
    ...data,
    managedZones: data["managedZones"] !== undefined ? data["managedZones"].map((item: any) => (deserializeManagedZone(item))) : undefined,
  };
}

/**
 * Additional options for DNS#managedZonesPatch.
 */
export interface ManagedZonesPatchOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#managedZonesUpdate.
 */
export interface ManagedZonesUpdateOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * An operation represents a successful mutation performed on a Cloud DNS
 * resource. Operations provide: - An audit log of server resource mutations. -
 * A way to recover/retry API calls in the case where the response is never
 * received by the caller. Use the caller specified client_operation_id.
 */
export interface Operation {
  /**
   * Only populated if the operation targeted a DnsKey (output only).
   */
  dnsKeyContext?: OperationDnsKeyContext;
  /**
   * Unique identifier for the resource. This is the client_operation_id if the
   * client specified it when the mutation was initiated, otherwise, it is
   * generated by the server. The name must be 1-63 characters long and match
   * the regular expression [-a-z0-9]? (output only)
   */
  id?: string;
  kind?: string;
  /**
   * The time that this operation was started by the server. This is in RFC3339
   * text format (output only).
   */
  startTime?: string;
  /**
   * Status of the operation. Can be one of the following: "PENDING" or "DONE"
   * (output only). A status of "DONE" means that the request to update the
   * authoritative servers has been sent, but the servers might not be updated
   * yet.
   */
  status?:  | "pending" | "done";
  /**
   * Type of the operation. Operations include insert, update, and delete
   * (output only).
   */
  type?: string;
  /**
   * User who requested the operation, for example: user@example.com.
   * cloud-dns-system for operations automatically done by the system. (output
   * only)
   */
  user?: string;
  /**
   * Only populated if the operation targeted a ManagedZone (output only).
   */
  zoneContext?: OperationManagedZoneContext;
}

function serializeOperation(data: any): Operation {
  return {
    ...data,
    zoneContext: data["zoneContext"] !== undefined ? serializeOperationManagedZoneContext(data["zoneContext"]) : undefined,
  };
}

function deserializeOperation(data: any): Operation {
  return {
    ...data,
    zoneContext: data["zoneContext"] !== undefined ? deserializeOperationManagedZoneContext(data["zoneContext"]) : undefined,
  };
}

export interface OperationDnsKeyContext {
  /**
   * The post-operation DnsKey resource.
   */
  newValue?: DnsKey;
  /**
   * The pre-operation DnsKey resource.
   */
  oldValue?: DnsKey;
}

export interface OperationManagedZoneContext {
  /**
   * The post-operation ManagedZone resource.
   */
  newValue?: ManagedZone;
  /**
   * The pre-operation ManagedZone resource.
   */
  oldValue?: ManagedZone;
}

function serializeOperationManagedZoneContext(data: any): OperationManagedZoneContext {
  return {
    ...data,
    newValue: data["newValue"] !== undefined ? serializeManagedZone(data["newValue"]) : undefined,
    oldValue: data["oldValue"] !== undefined ? serializeManagedZone(data["oldValue"]) : undefined,
  };
}

function deserializeOperationManagedZoneContext(data: any): OperationManagedZoneContext {
  return {
    ...data,
    newValue: data["newValue"] !== undefined ? deserializeManagedZone(data["newValue"]) : undefined,
    oldValue: data["oldValue"] !== undefined ? deserializeManagedZone(data["oldValue"]) : undefined,
  };
}

/**
 * Additional options for DNS#policiesCreate.
 */
export interface PoliciesCreateOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#policiesDelete.
 */
export interface PoliciesDeleteOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#policiesGet.
 */
export interface PoliciesGetOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#policiesList.
 */
export interface PoliciesListOptions {
  /**
   * Optional. Maximum number of results to be returned. If unspecified, the
   * server decides how many results to return.
   */
  maxResults?: number;
  /**
   * Optional. A tag returned by a previous list request that was truncated.
   * Use this parameter to continue a previous list request.
   */
  pageToken?: string;
}

export interface PoliciesListResponse {
  header?: ResponseHeader;
  /**
   * Type of resource.
   */
  kind?: string;
  /**
   * The presence of this field indicates that there exist more results
   * following your last page of results in pagination order. To fetch them,
   * make another list request using this value as your page token. This lets
   * you the complete contents of even very large collections one page at a
   * time. However, if the contents of the collection change between the first
   * and last paginated list request, the set of all elements returned are an
   * inconsistent view of the collection. You cannot retrieve a consistent
   * snapshot of a collection larger than the maximum page size.
   */
  nextPageToken?: string;
  /**
   * The policy resources.
   */
  policies?: Policy[];
}

function serializePoliciesListResponse(data: any): PoliciesListResponse {
  return {
    ...data,
    policies: data["policies"] !== undefined ? data["policies"].map((item: any) => (serializePolicy(item))) : undefined,
  };
}

function deserializePoliciesListResponse(data: any): PoliciesListResponse {
  return {
    ...data,
    policies: data["policies"] !== undefined ? data["policies"].map((item: any) => (deserializePolicy(item))) : undefined,
  };
}

/**
 * Additional options for DNS#policiesPatch.
 */
export interface PoliciesPatchOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

export interface PoliciesPatchResponse {
  header?: ResponseHeader;
  policy?: Policy;
}

function serializePoliciesPatchResponse(data: any): PoliciesPatchResponse {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
  };
}

function deserializePoliciesPatchResponse(data: any): PoliciesPatchResponse {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
  };
}

/**
 * Additional options for DNS#policiesUpdate.
 */
export interface PoliciesUpdateOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

export interface PoliciesUpdateResponse {
  header?: ResponseHeader;
  policy?: Policy;
}

function serializePoliciesUpdateResponse(data: any): PoliciesUpdateResponse {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
  };
}

function deserializePoliciesUpdateResponse(data: any): PoliciesUpdateResponse {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
  };
}

/**
 * A policy is a collection of DNS rules applied to one or more Virtual Private
 * Cloud resources.
 */
export interface Policy {
  /**
   * Sets an alternative name server for the associated networks. When
   * specified, all DNS queries are forwarded to a name server that you choose.
   * Names such as .internal are not available when an alternative name server
   * is specified.
   */
  alternativeNameServerConfig?: PolicyAlternativeNameServerConfig;
  /**
   * A mutable string of at most 1024 characters associated with this resource
   * for the user's convenience. Has no effect on the policy's function.
   */
  description?: string;
  /**
   * Allows networks bound to this policy to receive DNS queries sent by VMs or
   * applications over VPN connections. When enabled, a virtual IP address is
   * allocated from each of the subnetworks that are bound to this policy.
   */
  enableInboundForwarding?: boolean;
  /**
   * Controls whether logging is enabled for the networks bound to this policy.
   * Defaults to no logging if not set.
   */
  enableLogging?: boolean;
  /**
   * Unique identifier for the resource; defined by the server (output only).
   */
  id?: bigint;
  kind?: string;
  /**
   * User-assigned name for this policy.
   */
  name?: string;
  /**
   * List of network names specifying networks to which this policy is applied.
   */
  networks?: PolicyNetwork[];
}

function serializePolicy(data: any): Policy {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializePolicy(data: any): Policy {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

export interface PolicyAlternativeNameServerConfig {
  kind?: string;
  /**
   * Sets an alternative name server for the associated networks. When
   * specified, all DNS queries are forwarded to a name server that you choose.
   * Names such as .internal are not available when an alternative name server
   * is specified.
   */
  targetNameServers?: PolicyAlternativeNameServerConfigTargetNameServer[];
}

export interface PolicyAlternativeNameServerConfigTargetNameServer {
  /**
   * Forwarding path for this TargetNameServer. If unset or set to DEFAULT,
   * Cloud DNS makes forwarding decisions based on address ranges; that is,
   * RFC1918 addresses go to the VPC network, non-RFC1918 addresses go to the
   * internet. When set to PRIVATE, Cloud DNS always sends queries through the
   * VPC network for this target.
   */
  forwardingPath?:  | "default" | "private";
  /**
   * IPv4 address to forward queries to.
   */
  ipv4Address?: string;
  /**
   * IPv6 address to forward to. Does not accept both fields (ipv4 & ipv6)
   * being populated. Public preview as of November 2022.
   */
  ipv6Address?: string;
  kind?: string;
}

export interface PolicyNetwork {
  kind?: string;
  /**
   * The fully qualified URL of the VPC network to bind to. This should be
   * formatted like
   * https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}
   */
  networkUrl?: string;
}

/**
 * A project resource. The project is a top level container for resources
 * including Cloud DNS ManagedZones. Projects can be created only in the APIs
 * console. Next tag: 7.
 */
export interface Project {
  /**
   * User assigned unique identifier for the resource (output only).
   */
  id?: string;
  kind?: string;
  /**
   * Unique numeric identifier for the resource; defined by the server (output
   * only).
   */
  number?: bigint;
  /**
   * Quotas assigned to this project (output only).
   */
  quota?: Quota;
}

function serializeProject(data: any): Project {
  return {
    ...data,
    number: data["number"] !== undefined ? String(data["number"]) : undefined,
  };
}

function deserializeProject(data: any): Project {
  return {
    ...data,
    number: data["number"] !== undefined ? BigInt(data["number"]) : undefined,
  };
}

/**
 * Additional options for DNS#projectsGet.
 */
export interface ProjectsGetOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Limits associated with a Project.
 */
export interface Quota {
  /**
   * Maximum allowed number of DnsKeys per ManagedZone.
   */
  dnsKeysPerManagedZone?: number;
  /**
   * Maximum allowed number of GKE clusters to which a privately scoped zone
   * can be attached.
   */
  gkeClustersPerManagedZone?: number;
  /**
   * Maximum allowed number of GKE clusters per policy.
   */
  gkeClustersPerPolicy?: number;
  /**
   * Maximum allowed number of GKE clusters per response policy.
   */
  gkeClustersPerResponsePolicy?: number;
  /**
   * Maximum allowed number of items per routing policy.
   */
  itemsPerRoutingPolicy?: number;
  kind?: string;
  /**
   * Maximum allowed number of managed zones in the project.
   */
  managedZones?: number;
  /**
   * Maximum allowed number of managed zones which can be attached to a GKE
   * cluster.
   */
  managedZonesPerGkeCluster?: number;
  /**
   * Maximum allowed number of managed zones which can be attached to a
   * network.
   */
  managedZonesPerNetwork?: number;
  /**
   * Maximum allowed number of networks to which a privately scoped zone can be
   * attached.
   */
  networksPerManagedZone?: number;
  /**
   * Maximum allowed number of networks per policy.
   */
  networksPerPolicy?: number;
  /**
   * Maximum allowed number of networks per response policy.
   */
  networksPerResponsePolicy?: number;
  /**
   * Maximum allowed number of consumer peering zones per target network owned
   * by this producer project
   */
  peeringZonesPerTargetNetwork?: number;
  /**
   * Maximum allowed number of policies per project.
   */
  policies?: number;
  /**
   * Maximum allowed number of ResourceRecords per ResourceRecordSet.
   */
  resourceRecordsPerRrset?: number;
  /**
   * Maximum allowed number of response policies per project.
   */
  responsePolicies?: number;
  /**
   * Maximum allowed number of rules per response policy.
   */
  responsePolicyRulesPerResponsePolicy?: number;
  /**
   * Maximum allowed number of ResourceRecordSets to add per
   * ChangesCreateRequest.
   */
  rrsetAdditionsPerChange?: number;
  /**
   * Maximum allowed number of ResourceRecordSets to delete per
   * ChangesCreateRequest.
   */
  rrsetDeletionsPerChange?: number;
  /**
   * Maximum allowed number of ResourceRecordSets per zone in the project.
   */
  rrsetsPerManagedZone?: number;
  /**
   * Maximum allowed number of target name servers per managed forwarding zone.
   */
  targetNameServersPerManagedZone?: number;
  /**
   * Maximum allowed number of alternative target name servers per policy.
   */
  targetNameServersPerPolicy?: number;
  /**
   * Maximum allowed size for total rrdata in one ChangesCreateRequest in
   * bytes.
   */
  totalRrdataSizePerChange?: number;
  /**
   * DNSSEC algorithm and key length types that can be used for DnsKeys.
   */
  whitelistedKeySpecs?: DnsKeySpec[];
}

/**
 * A unit of data that is returned by the DNS servers.
 */
export interface ResourceRecordSet {
  kind?: string;
  /**
   * For example, www.example.com.
   */
  name?: string;
  /**
   * Configures dynamic query responses based on geo location of querying user
   * or a weighted round robin based routing policy. A ResourceRecordSet should
   * only have either rrdata (static) or routing_policy (dynamic). An error is
   * returned otherwise.
   */
  routingPolicy?: RRSetRoutingPolicy;
  /**
   * As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see
   * examples.
   */
  rrdatas?: string[];
  /**
   * As defined in RFC 4034 (section 3.2).
   */
  signatureRrdatas?: string[];
  /**
   * Number of seconds that this ResourceRecordSet can be cached by resolvers.
   */
  ttl?: number;
  /**
   * The identifier of a supported record type. See the list of Supported DNS
   * record types.
   */
  type?: string;
}

/**
 * Additional options for DNS#resourceRecordSetsCreate.
 */
export interface ResourceRecordSetsCreateOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#resourceRecordSetsDelete.
 */
export interface ResourceRecordSetsDeleteOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

export interface ResourceRecordSetsDeleteResponse {
}

/**
 * Additional options for DNS#resourceRecordSetsGet.
 */
export interface ResourceRecordSetsGetOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#resourceRecordSetsList.
 */
export interface ResourceRecordSetsListOptions {
  /**
   * Optional. Maximum number of results to be returned. If unspecified, the
   * server decides how many results to return.
   */
  maxResults?: number;
  /**
   * Restricts the list to return only records with this fully qualified domain
   * name.
   */
  name?: string;
  /**
   * Optional. A tag returned by a previous list request that was truncated.
   * Use this parameter to continue a previous list request.
   */
  pageToken?: string;
  /**
   * Restricts the list to return only records of this type. If present, the
   * "name" parameter must also be present.
   */
  type?: string;
}

export interface ResourceRecordSetsListResponse {
  header?: ResponseHeader;
  /**
   * Type of resource.
   */
  kind?: string;
  /**
   * The presence of this field indicates that there exist more results
   * following your last page of results in pagination order. To fetch them,
   * make another list request using this value as your pagination token. This
   * lets you retrieve complete contents of even larger collections, one page at
   * a time. However, if the contents of the collection change between the first
   * and last paginated list request, the set of elements returned are an
   * inconsistent view of the collection. You cannot retrieve a consistent
   * snapshot of a collection larger than the maximum page size.
   */
  nextPageToken?: string;
  /**
   * The resource record set resources.
   */
  rrsets?: ResourceRecordSet[];
}

/**
 * Additional options for DNS#resourceRecordSetsPatch.
 */
export interface ResourceRecordSetsPatchOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Elements common to every response.
 */
export interface ResponseHeader {
  /**
   * For mutating operation requests that completed successfully. This is the
   * client_operation_id if the client specified it, otherwise it is generated
   * by the server (output only).
   */
  operationId?: string;
}

/**
 * Additional options for DNS#responsePoliciesCreate.
 */
export interface ResponsePoliciesCreateOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#responsePoliciesDelete.
 */
export interface ResponsePoliciesDeleteOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#responsePoliciesGet.
 */
export interface ResponsePoliciesGetOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#responsePoliciesList.
 */
export interface ResponsePoliciesListOptions {
  /**
   * Optional. Maximum number of results to be returned. If unspecified, the
   * server decides how many results to return.
   */
  maxResults?: number;
  /**
   * Optional. A tag returned by a previous list request that was truncated.
   * Use this parameter to continue a previous list request.
   */
  pageToken?: string;
}

export interface ResponsePoliciesListResponse {
  header?: ResponseHeader;
  /**
   * The presence of this field indicates that more results exist following
   * your last page of results in pagination order. To fetch them, make another
   * list request by using this value as your page token. This lets you view the
   * complete contents of even very large collections one page at a time.
   * However, if the contents of the collection change between the first and
   * last paginated list request, the set of all elements returned are an
   * inconsistent view of the collection. You cannot retrieve a consistent
   * snapshot of a collection larger than the maximum page size.
   */
  nextPageToken?: string;
  /**
   * The Response Policy resources.
   */
  responsePolicies?: ResponsePolicy[];
}

function serializeResponsePoliciesListResponse(data: any): ResponsePoliciesListResponse {
  return {
    ...data,
    responsePolicies: data["responsePolicies"] !== undefined ? data["responsePolicies"].map((item: any) => (serializeResponsePolicy(item))) : undefined,
  };
}

function deserializeResponsePoliciesListResponse(data: any): ResponsePoliciesListResponse {
  return {
    ...data,
    responsePolicies: data["responsePolicies"] !== undefined ? data["responsePolicies"].map((item: any) => (deserializeResponsePolicy(item))) : undefined,
  };
}

/**
 * Additional options for DNS#responsePoliciesPatch.
 */
export interface ResponsePoliciesPatchOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

export interface ResponsePoliciesPatchResponse {
  header?: ResponseHeader;
  responsePolicy?: ResponsePolicy;
}

function serializeResponsePoliciesPatchResponse(data: any): ResponsePoliciesPatchResponse {
  return {
    ...data,
    responsePolicy: data["responsePolicy"] !== undefined ? serializeResponsePolicy(data["responsePolicy"]) : undefined,
  };
}

function deserializeResponsePoliciesPatchResponse(data: any): ResponsePoliciesPatchResponse {
  return {
    ...data,
    responsePolicy: data["responsePolicy"] !== undefined ? deserializeResponsePolicy(data["responsePolicy"]) : undefined,
  };
}

/**
 * Additional options for DNS#responsePoliciesUpdate.
 */
export interface ResponsePoliciesUpdateOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

export interface ResponsePoliciesUpdateResponse {
  header?: ResponseHeader;
  responsePolicy?: ResponsePolicy;
}

function serializeResponsePoliciesUpdateResponse(data: any): ResponsePoliciesUpdateResponse {
  return {
    ...data,
    responsePolicy: data["responsePolicy"] !== undefined ? serializeResponsePolicy(data["responsePolicy"]) : undefined,
  };
}

function deserializeResponsePoliciesUpdateResponse(data: any): ResponsePoliciesUpdateResponse {
  return {
    ...data,
    responsePolicy: data["responsePolicy"] !== undefined ? deserializeResponsePolicy(data["responsePolicy"]) : undefined,
  };
}

/**
 * A Response Policy is a collection of selectors that apply to queries made
 * against one or more Virtual Private Cloud networks.
 */
export interface ResponsePolicy {
  /**
   * User-provided description for this Response Policy.
   */
  description?: string;
  /**
   * The list of Google Kubernetes Engine clusters to which this response
   * policy is applied.
   */
  gkeClusters?: ResponsePolicyGKECluster[];
  /**
   * Unique identifier for the resource; defined by the server (output only).
   */
  id?: bigint;
  kind?: string;
  /**
   * User labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * List of network names specifying networks to which this policy is applied.
   */
  networks?: ResponsePolicyNetwork[];
  /**
   * User assigned name for this Response Policy.
   */
  responsePolicyName?: string;
}

function serializeResponsePolicy(data: any): ResponsePolicy {
  return {
    ...data,
    id: data["id"] !== undefined ? String(data["id"]) : undefined,
  };
}

function deserializeResponsePolicy(data: any): ResponsePolicy {
  return {
    ...data,
    id: data["id"] !== undefined ? BigInt(data["id"]) : undefined,
  };
}

export interface ResponsePolicyGKECluster {
  /**
   * The resource name of the cluster to bind this response policy to. This
   * should be specified in the format like:
   * projects/*\/locations/*\/clusters/*. This is referenced from GKE
   * projects.locations.clusters.get API:
   * https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/get
   */
  gkeClusterName?: string;
  kind?: string;
}

export interface ResponsePolicyNetwork {
  kind?: string;
  /**
   * The fully qualified URL of the VPC network to bind to. This should be
   * formatted like
   * https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}
   */
  networkUrl?: string;
}

/**
 * A Response Policy Rule is a selector that applies its behavior to queries
 * that match the selector. Selectors are DNS names, which may be wildcards or
 * exact matches. Each DNS query subject to a Response Policy matches at most
 * one ResponsePolicyRule, as identified by the dns_name field with the longest
 * matching suffix.
 */
export interface ResponsePolicyRule {
  /**
   * Answer this query with a behavior rather than DNS data.
   */
  behavior?:  | "behaviorUnspecified" | "bypassResponsePolicy";
  /**
   * The DNS name (wildcard or exact) to apply this rule to. Must be unique
   * within the Response Policy Rule.
   */
  dnsName?: string;
  kind?: string;
  /**
   * Answer this query directly with DNS data. These ResourceRecordSets
   * override any other DNS behavior for the matched name; in particular they
   * override private zones, the public internet, and GCP internal DNS. No SOA
   * nor NS types are allowed.
   */
  localData?: ResponsePolicyRuleLocalData;
  /**
   * An identifier for this rule. Must be unique with the ResponsePolicy.
   */
  ruleName?: string;
}

export interface ResponsePolicyRuleLocalData {
  /**
   * All resource record sets for this selector, one per resource record type.
   * The name must match the dns_name.
   */
  localDatas?: ResourceRecordSet[];
}

/**
 * Additional options for DNS#responsePolicyRulesCreate.
 */
export interface ResponsePolicyRulesCreateOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#responsePolicyRulesDelete.
 */
export interface ResponsePolicyRulesDeleteOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#responsePolicyRulesGet.
 */
export interface ResponsePolicyRulesGetOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

/**
 * Additional options for DNS#responsePolicyRulesList.
 */
export interface ResponsePolicyRulesListOptions {
  /**
   * Optional. Maximum number of results to be returned. If unspecified, the
   * server decides how many results to return.
   */
  maxResults?: number;
  /**
   * Optional. A tag returned by a previous list request that was truncated.
   * Use this parameter to continue a previous list request.
   */
  pageToken?: string;
}

export interface ResponsePolicyRulesListResponse {
  header?: ResponseHeader;
  /**
   * The presence of this field indicates that there exist more results
   * following your last page of results in pagination order. To fetch them,
   * make another list request using this value as your page token. This lets
   * you the complete contents of even very large collections one page at a
   * time. However, if the contents of the collection change between the first
   * and last paginated list request, the set of all elements returned are an
   * inconsistent view of the collection. You cannot retrieve a consistent
   * snapshot of a collection larger than the maximum page size.
   */
  nextPageToken?: string;
  /**
   * The Response Policy Rule resources.
   */
  responsePolicyRules?: ResponsePolicyRule[];
}

/**
 * Additional options for DNS#responsePolicyRulesPatch.
 */
export interface ResponsePolicyRulesPatchOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

export interface ResponsePolicyRulesPatchResponse {
  header?: ResponseHeader;
  responsePolicyRule?: ResponsePolicyRule;
}

/**
 * Additional options for DNS#responsePolicyRulesUpdate.
 */
export interface ResponsePolicyRulesUpdateOptions {
  /**
   * For mutating operation requests only. An optional identifier specified by
   * the client. Must be unique for operation resources in the Operations
   * collection.
   */
  clientOperationId?: string;
}

export interface ResponsePolicyRulesUpdateResponse {
  header?: ResponseHeader;
  responsePolicyRule?: ResponsePolicyRule;
}

/**
 * A RRSetRoutingPolicy represents ResourceRecordSet data that is returned
 * dynamically with the response varying based on configured properties such as
 * geolocation or by weighted random selection.
 */
export interface RRSetRoutingPolicy {
  geo?: RRSetRoutingPolicyGeoPolicy;
  kind?: string;
  primaryBackup?: RRSetRoutingPolicyPrimaryBackupPolicy;
  wrr?: RRSetRoutingPolicyWrrPolicy;
}

/**
 * Configures a RRSetRoutingPolicy that routes based on the geo location of the
 * querying user.
 */
export interface RRSetRoutingPolicyGeoPolicy {
  /**
   * Without fencing, if health check fails for all configured items in the
   * current geo bucket, we'll failover to the next nearest geo bucket. With
   * fencing, if health check is enabled, as long as some targets in the current
   * geo bucket are healthy, we'll return only the healthy targets. However, if
   * they're all unhealthy, we won't failover to the next nearest bucket, we'll
   * simply return all the items in the current bucket even though they're
   * unhealthy.
   */
  enableFencing?: boolean;
  /**
   * The primary geo routing configuration. If there are multiple items with
   * the same location, an error is returned instead.
   */
  items?: RRSetRoutingPolicyGeoPolicyGeoPolicyItem[];
  kind?: string;
}

/**
 * ResourceRecordSet data for one geo location.
 */
export interface RRSetRoutingPolicyGeoPolicyGeoPolicyItem {
  /**
   * For A and AAAA types only. Endpoints to return in the query result only if
   * they are healthy. These can be specified along with rrdata within this
   * item.
   */
  healthCheckedTargets?: RRSetRoutingPolicyHealthCheckTargets;
  kind?: string;
  /**
   * The geo-location granularity is a GCP region. This location string should
   * correspond to a GCP region. e.g. "us-east1", "southamerica-east1",
   * "asia-east1", etc.
   */
  location?: string;
  rrdatas?: string[];
  /**
   * DNSSEC generated signatures for all the rrdata within this item. Note that
   * if health checked targets are provided for DNSSEC enabled zones, there's a
   * restriction of 1 ip per item. .
   */
  signatureRrdatas?: string[];
}

/**
 * HealthCheckTargets describes endpoints to health-check when responding to
 * Routing Policy queries. Only the healthy endpoints will be included in the
 * response.
 */
export interface RRSetRoutingPolicyHealthCheckTargets {
  internalLoadBalancers?: RRSetRoutingPolicyLoadBalancerTarget[];
}

export interface RRSetRoutingPolicyLoadBalancerTarget {
  /**
   * The frontend IP address of the
   */
  ipAddress?: string;
  ipProtocol?:  | "undefined" | "tcp" | "udp";
  kind?: string;
  loadBalancerType?:  | "none" | "regionalL4ilb";
  /**
   * The fully qualified url of the network on which the ILB is
   */
  networkUrl?: string;
  /**
   * Load Balancer to health check. The configured port of the Load Balancer.
   */
  port?: string;
  /**
   * present. This should be formatted like
   * https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}
   * The project ID in which the ILB exists.
   */
  project?: string;
  /**
   * The region for regional ILBs.
   */
  region?: string;
}

/**
 * Configures a RRSetRoutingPolicy such that all queries are responded with the
 * primary_targets if they are healthy. And if all of them are unhealthy, then
 * we fallback to a geo localized policy.
 */
export interface RRSetRoutingPolicyPrimaryBackupPolicy {
  /**
   * Backup targets provide a regional failover policy for the otherwise global
   * primary targets. If serving state is set to BACKUP, this policy essentially
   * becomes a geo routing policy.
   */
  backupGeoTargets?: RRSetRoutingPolicyGeoPolicy;
  kind?: string;
  primaryTargets?: RRSetRoutingPolicyHealthCheckTargets;
  /**
   * When serving state is PRIMARY, this field provides the option of sending a
   * small percentage of the traffic to the backup targets.
   */
  trickleTraffic?: number;
}

/**
 * Configures a RRSetRoutingPolicy that routes in a weighted round robin
 * fashion.
 */
export interface RRSetRoutingPolicyWrrPolicy {
  items?: RRSetRoutingPolicyWrrPolicyWrrPolicyItem[];
  kind?: string;
}

/**
 * A routing block which contains the routing information for one WRR item.
 */
export interface RRSetRoutingPolicyWrrPolicyWrrPolicyItem {
  /**
   * endpoints that need to be health checked before making the routing
   * decision. The unhealthy endpoints will be omitted from the result. If all
   * endpoints within a buckete are unhealthy, we'll choose a different bucket
   * (sampled w.r.t. its weight) for responding. Note that if DNSSEC is enabled
   * for this zone, only one of rrdata or health_checked_targets can be set.
   */
  healthCheckedTargets?: RRSetRoutingPolicyHealthCheckTargets;
  kind?: string;
  rrdatas?: string[];
  /**
   * DNSSEC generated signatures for all the rrdata within this item. Note that
   * if health checked targets are provided for DNSSEC enabled zones, there's a
   * restriction of 1 ip per item. .
   */
  signatureRrdatas?: string[];
  /**
   * The weight corresponding to this subset of rrdata. When multiple
   * WeightedRoundRobinPolicyItems are configured, the probability of returning
   * an rrset is proportional to its weight relative to the sum of weights
   * configured for all items. This weight should be non-negative.
   */
  weight?: number;
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
