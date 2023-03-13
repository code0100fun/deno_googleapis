// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Bare Metal Solution API Client for Deno
 * =======================================
 * 
 * Provides ways to manage Bare Metal Solution hardware installed in a regional extension located near a Google Cloud data center.
 * 
 * Docs: https://cloud.google.com/bare-metal
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Provides ways to manage Bare Metal Solution hardware installed in a regional
 * extension located near a Google Cloud data center.
 */
export class BareMetalSolution {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://baremetalsolution.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Location;
  }

  /**
   * Get instance provisioning settings for a given project. This is hidden
   * method used by UI only.
   *
   * @param location Required. The parent project and location containing the ProvisioningSettings.
   */
  async projectsLocationsInstanceProvisioningSettingsFetch(location: string): Promise<FetchInstanceProvisioningSettingsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ location }/instanceProvisioningSettings:fetch`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as FetchInstanceProvisioningSettingsResponse;
  }

  /**
   * Create an Instance.
   *
   * @param parent Required. The parent project and location.
   */
  async projectsLocationsInstancesCreate(parent: string, req: Instance): Promise<Operation> {
    req = serializeInstance(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/instances`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Detach LUN from Instance.
   *
   * @param instance Required. Name of the instance.
   */
  async projectsLocationsInstancesDetachLun(instance: string, req: DetachLunRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ instance }:detachLun`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Disable the interactive serial console feature on an instance.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsInstancesDisableInteractiveSerialConsole(name: string, req: DisableInteractiveSerialConsoleRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:disableInteractiveSerialConsole`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Enable the interactive serial console feature on an instance.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsInstancesEnableInteractiveSerialConsole(name: string, req: EnableInteractiveSerialConsoleRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:enableInteractiveSerialConsole`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Get details about a single server.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsInstancesGet(name: string): Promise<Instance> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeInstance(data);
  }

  /**
   * List servers in a given project and location.
   *
   * @param parent Required. Parent value for ListInstancesRequest.
   */
  async projectsLocationsInstancesList(parent: string, opts: ProjectsLocationsInstancesListOptions = {}): Promise<ListInstancesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/instances`);
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
    return deserializeListInstancesResponse(data);
  }

  /**
   * Update details of a single server.
   *
   * @param name Immutable. The resource name of this `Instance`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. Format: `projects/{project}/locations/{location}/instances/{instance}`
   */
  async projectsLocationsInstancesPatch(name: string, req: Instance, opts: ProjectsLocationsInstancesPatchOptions = {}): Promise<Operation> {
    req = serializeInstance(req);
    opts = serializeProjectsLocationsInstancesPatchOptions(opts);
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
   * RenameInstance sets a new name for an instance. Use with caution, previous
   * names become immediately invalidated.
   *
   * @param name Required. The `name` field is used to identify the instance. Format: projects/{project}/locations/{location}/instances/{instance}
   */
  async projectsLocationsInstancesRename(name: string, req: RenameInstanceRequest): Promise<Instance> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:rename`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeInstance(data);
  }

  /**
   * Perform an ungraceful, hard reset on a server. Equivalent to shutting the
   * power off and then turning it back on.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsInstancesReset(name: string, req: ResetInstanceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:reset`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Starts a server that was shutdown.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsInstancesStart(name: string, req: StartInstanceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:start`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Stop a running server.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsInstancesStop(name: string, req: StopInstanceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:stop`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
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
   * Get details of a single network.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsNetworksGet(name: string): Promise<Network> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeNetwork(data);
  }

  /**
   * List network in a given project and location.
   *
   * @param parent Required. Parent value for ListNetworksRequest.
   */
  async projectsLocationsNetworksList(parent: string, opts: ProjectsLocationsNetworksListOptions = {}): Promise<ListNetworksResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/networks`);
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
    return deserializeListNetworksResponse(data);
  }

  /**
   * List all Networks (and used IPs for each Network) in the vendor account
   * associated with the specified project.
   *
   * @param location Required. Parent value (project and location).
   */
  async projectsLocationsNetworksListNetworkUsage(location: string): Promise<ListNetworkUsageResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ location }/networks:listNetworkUsage`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListNetworkUsageResponse(data);
  }

  /**
   * Update details of a single network.
   *
   * @param name Output only. The resource name of this `Network`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. Format: `projects/{project}/locations/{location}/networks/{network}`
   */
  async projectsLocationsNetworksPatch(name: string, req: Network, opts: ProjectsLocationsNetworksPatchOptions = {}): Promise<Operation> {
    req = serializeNetwork(req);
    opts = serializeProjectsLocationsNetworksPatchOptions(opts);
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
   * RenameNetwork sets a new name for a network. Use with caution, previous
   * names become immediately invalidated.
   *
   * @param name Required. The `name` field is used to identify the network. Format: projects/{project}/locations/{location}/networks/{network}
   */
  async projectsLocationsNetworksRename(name: string, req: RenameNetworkRequest): Promise<Network> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:rename`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeNetwork(data);
  }

  /**
   * Create an NFS share.
   *
   * @param parent Required. The parent project and location.
   */
  async projectsLocationsNfsSharesCreate(parent: string, req: NfsShare): Promise<Operation> {
    req = serializeNfsShare(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/nfsShares`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Delete an NFS share. The underlying volume is automatically deleted.
   *
   * @param name Required. The name of the NFS share to delete.
   */
  async projectsLocationsNfsSharesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Get details of a single NFS share.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsNfsSharesGet(name: string): Promise<NfsShare> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeNfsShare(data);
  }

  /**
   * List NFS shares.
   *
   * @param parent Required. Parent value for ListNfsSharesRequest.
   */
  async projectsLocationsNfsSharesList(parent: string, opts: ProjectsLocationsNfsSharesListOptions = {}): Promise<ListNfsSharesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/nfsShares`);
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
    return deserializeListNfsSharesResponse(data);
  }

  /**
   * Update details of a single NFS share.
   *
   * @param name Immutable. The name of the NFS share.
   */
  async projectsLocationsNfsSharesPatch(name: string, req: NfsShare, opts: ProjectsLocationsNfsSharesPatchOptions = {}): Promise<Operation> {
    req = serializeNfsShare(req);
    opts = serializeProjectsLocationsNfsSharesPatchOptions(opts);
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
   * RenameNfsShare sets a new name for an nfsshare. Use with caution, previous
   * names become immediately invalidated.
   *
   * @param name Required. The `name` field is used to identify the nfsshare. Format: projects/{project}/locations/{location}/nfsshares/{nfsshare}
   */
  async projectsLocationsNfssharesRename(name: string, req: RenameNfsShareRequest): Promise<NfsShare> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:rename`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeNfsShare(data);
  }

  /**
   * Get details about an operation.
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
   * Create new ProvisioningConfig.
   *
   * @param parent Required. The parent project and location containing the ProvisioningConfig.
   */
  async projectsLocationsProvisioningConfigsCreate(parent: string, req: ProvisioningConfig, opts: ProjectsLocationsProvisioningConfigsCreateOptions = {}): Promise<ProvisioningConfig> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/provisioningConfigs`);
    if (opts.email !== undefined) {
      url.searchParams.append("email", String(opts.email));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ProvisioningConfig;
  }

  /**
   * Get ProvisioningConfig by name.
   *
   * @param name Required. Name of the ProvisioningConfig.
   */
  async projectsLocationsProvisioningConfigsGet(name: string): Promise<ProvisioningConfig> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ProvisioningConfig;
  }

  /**
   * Update existing ProvisioningConfig.
   *
   * @param name Output only. The system-generated name of the provisioning config. This follows the UUID format.
   */
  async projectsLocationsProvisioningConfigsPatch(name: string, req: ProvisioningConfig, opts: ProjectsLocationsProvisioningConfigsPatchOptions = {}): Promise<ProvisioningConfig> {
    opts = serializeProjectsLocationsProvisioningConfigsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.email !== undefined) {
      url.searchParams.append("email", String(opts.email));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as ProvisioningConfig;
  }

  /**
   * Submit a provisiong configuration for a given project.
   *
   * @param parent Required. The parent project and location containing the ProvisioningConfig.
   */
  async projectsLocationsProvisioningConfigsSubmit(parent: string, req: SubmitProvisioningConfigRequest): Promise<SubmitProvisioningConfigResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/provisioningConfigs:submit`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SubmitProvisioningConfigResponse;
  }

  /**
   * List the budget details to provision resources on a given project.
   *
   * @param parent Required. Parent value for ListProvisioningQuotasRequest.
   */
  async projectsLocationsProvisioningQuotasList(parent: string, opts: ProjectsLocationsProvisioningQuotasListOptions = {}): Promise<ListProvisioningQuotasResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/provisioningQuotas`);
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
    return deserializeListProvisioningQuotasResponse(data);
  }

  /**
   * Register a public SSH key in the specified project for use with the
   * interactive serial console feature.
   *
   * @param parent Required. The parent containing the SSH keys.
   */
  async projectsLocationsSshKeysCreate(parent: string, req: SSHKey, opts: ProjectsLocationsSshKeysCreateOptions = {}): Promise<SSHKey> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/sshKeys`);
    if (opts.sshKeyId !== undefined) {
      url.searchParams.append("sshKeyId", String(opts.sshKeyId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as SSHKey;
  }

  /**
   * Deletes a public SSH key registered in the specified project.
   *
   * @param name Required. The name of the SSH key to delete. Currently, the only valid value for the location is "global".
   */
  async projectsLocationsSshKeysDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Lists the public SSH keys registered for the specified project. These SSH
   * keys are used only for the interactive serial console feature.
   *
   * @param parent Required. The parent containing the SSH keys. Currently, the only valid value for the location is "global".
   */
  async projectsLocationsSshKeysList(parent: string, opts: ProjectsLocationsSshKeysListOptions = {}): Promise<ListSSHKeysResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/sshKeys`);
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
    return data as ListSSHKeysResponse;
  }

  /**
   * Skips volume's cooloff and deletes it now. Volume must be in cooloff
   * state.
   *
   * @param name Required. The name of the Volume.
   */
  async projectsLocationsVolumesEvict(name: string, req: EvictVolumeRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:evict`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Get details of a single storage volume.
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsVolumesGet(name: string): Promise<Volume> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeVolume(data);
  }

  /**
   * List storage volumes in a given project and location.
   *
   * @param parent Required. Parent value for ListVolumesRequest.
   */
  async projectsLocationsVolumesList(parent: string, opts: ProjectsLocationsVolumesListOptions = {}): Promise<ListVolumesResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/volumes`);
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
    return deserializeListVolumesResponse(data);
  }

  /**
   * Skips lun's cooloff and deletes it now. Lun must be in cooloff state.
   *
   * @param name Required. The name of the lun.
   */
  async projectsLocationsVolumesLunsEvict(name: string, req: EvictLunRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:evict`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Get details of a single storage logical unit number(LUN).
   *
   * @param name Required. Name of the resource.
   */
  async projectsLocationsVolumesLunsGet(name: string): Promise<Lun> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeLun(data);
  }

  /**
   * List storage volume luns for given storage volume.
   *
   * @param parent Required. Parent value for ListLunsRequest.
   */
  async projectsLocationsVolumesLunsList(parent: string, opts: ProjectsLocationsVolumesLunsListOptions = {}): Promise<ListLunsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/luns`);
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
    return deserializeListLunsResponse(data);
  }

  /**
   * Update details of a single storage volume.
   *
   * @param name Output only. The resource name of this `Volume`. Resource names are schemeless URIs that follow the conventions in https://cloud.google.com/apis/design/resource_names. Format: `projects/{project}/locations/{location}/volumes/{volume}`
   */
  async projectsLocationsVolumesPatch(name: string, req: Volume, opts: ProjectsLocationsVolumesPatchOptions = {}): Promise<Operation> {
    req = serializeVolume(req);
    opts = serializeProjectsLocationsVolumesPatchOptions(opts);
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
   * RenameVolume sets a new name for a volume. Use with caution, previous
   * names become immediately invalidated.
   *
   * @param name Required. The `name` field is used to identify the volume. Format: projects/{project}/locations/{location}/volumes/{volume}
   */
  async projectsLocationsVolumesRename(name: string, req: RenameVolumeRequest): Promise<Volume> {
    const url = new URL(`${this.#baseUrl}v2/${ name }:rename`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeVolume(data);
  }

  /**
   * Emergency Volume resize.
   *
   * @param volume Required. Volume to resize.
   */
  async projectsLocationsVolumesResize(volume: string, req: ResizeVolumeRequest): Promise<Operation> {
    req = serializeResizeVolumeRequest(req);
    const url = new URL(`${this.#baseUrl}v2/${ volume }:resize`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Takes a snapshot of a boot volume. Returns INVALID_ARGUMENT if called for
   * a non-boot volume.
   *
   * @param parent Required. The volume to snapshot.
   */
  async projectsLocationsVolumesSnapshotsCreate(parent: string, req: VolumeSnapshot): Promise<VolumeSnapshot> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/snapshots`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as VolumeSnapshot;
  }

  /**
   * Deletes a volume snapshot. Returns INVALID_ARGUMENT if called for a
   * non-boot volume.
   *
   * @param name Required. The name of the snapshot to delete.
   */
  async projectsLocationsVolumesSnapshotsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns the specified snapshot resource. Returns INVALID_ARGUMENT if
   * called for a non-boot volume.
   *
   * @param name Required. The name of the snapshot.
   */
  async projectsLocationsVolumesSnapshotsGet(name: string): Promise<VolumeSnapshot> {
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as VolumeSnapshot;
  }

  /**
   * Retrieves the list of snapshots for the specified volume. Returns a
   * response with an empty list of snapshots if called for a non-boot volume.
   *
   * @param parent Required. Parent value for ListVolumesRequest.
   */
  async projectsLocationsVolumesSnapshotsList(parent: string, opts: ProjectsLocationsVolumesSnapshotsListOptions = {}): Promise<ListVolumeSnapshotsResponse> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/snapshots`);
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
    return data as ListVolumeSnapshotsResponse;
  }

  /**
   * Uses the specified snapshot to restore its parent volume. Returns
   * INVALID_ARGUMENT if called for a non-boot volume.
   *
   * @param volumeSnapshot Required. Name of the snapshot which will be used to restore its parent volume.
   */
  async projectsLocationsVolumesSnapshotsRestoreVolumeSnapshot(volumeSnapshot: string, req: RestoreVolumeSnapshotRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v2/${ volumeSnapshot }:restoreVolumeSnapshot`);
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
 * Represents an 'access point' for the share.
 */
export interface AllowedClient {
  /**
   * Allow dev flag. Which controls whether to allow creation of devices.
   */
  allowDev?: boolean;
  /**
   * The subnet of IP addresses permitted to access the share.
   */
  allowedClientsCidr?: string;
  /**
   * Allow the setuid flag.
   */
  allowSuid?: boolean;
  /**
   * Mount permissions.
   */
  mountPermissions?:  | "MOUNT_PERMISSIONS_UNSPECIFIED" | "READ" | "READ_WRITE";
  /**
   * The network the access point sits on.
   */
  network?: string;
  /**
   * Output only. The path to access NFS, in format shareIP:/InstanceID
   * InstanceID is the generated ID instead of customer provided name. example
   * like "10.0.0.0:/g123456789-nfs001"
   */
  readonly nfsPath?: string;
  /**
   * Disable root squashing, which is a feature of NFS. Root squash is a
   * special mapping of the remote superuser (root) identity when using identity
   * authentication.
   */
  noRootSquash?: boolean;
  /**
   * Output only. The IP address of the share on this network. Assigned
   * automatically during provisioning based on the network's services_cidr.
   */
  readonly shareIp?: string;
}

/**
 * Message for detach specific LUN from an Instance.
 */
export interface DetachLunRequest {
  /**
   * Required. Name of the Lun to detach.
   */
  lun?: string;
  /**
   * If true, performs lun unmapping without instance reboot.
   */
  skipReboot?: boolean;
}

/**
 * Message for disabling the interactive serial console on an instance.
 */
export interface DisableInteractiveSerialConsoleRequest {
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
 * Message for enabling the interactive serial console on an instance.
 */
export interface EnableInteractiveSerialConsoleRequest {
}

/**
 * Request for skip lun cooloff and delete it.
 */
export interface EvictLunRequest {
}

/**
 * Request for skip volume cooloff and delete it.
 */
export interface EvictVolumeRequest {
}

/**
 * Response with all provisioning settings.
 */
export interface FetchInstanceProvisioningSettingsResponse {
  /**
   * The OS images available.
   */
  images?: OSImage[];
}

/**
 * Each logical interface represents a logical abstraction of the underlying
 * physical interface (for eg. bond, nic) of the instance. Each logical
 * interface can effectively map to multiple network-IP pairs and still be
 * mapped to one underlying physical interface.
 */
export interface GoogleCloudBaremetalsolutionV2LogicalInterface {
  /**
   * The index of the logical interface mapping to the index of the hardware
   * bond or nic on the chosen network template. This field is deprecated.
   */
  interfaceIndex?: number;
  /**
   * List of logical network interfaces within a logical interface.
   */
  logicalNetworkInterfaces?: LogicalNetworkInterface[];
  /**
   * Interface name. This is of syntax or and forms part of the network
   * template name.
   */
  name?: string;
}

/**
 * Logical interface.
 */
export interface GoogleCloudBaremetalsolutionV2ServerNetworkTemplateLogicalInterface {
  /**
   * Interface name. This is not a globally unique identifier. Name is unique
   * only inside the ServerNetworkTemplate. This is of syntax or and forms part
   * of the network template name.
   */
  name?: string;
  /**
   * If true, interface must have network connected.
   */
  required?: boolean;
  /**
   * Interface type.
   */
  type?:  | "INTERFACE_TYPE_UNSPECIFIED" | "BOND" | "NIC";
}

/**
 * A server.
 */
export interface Instance {
  /**
   * Output only. Create a time stamp.
   */
  readonly createTime?: Date;
  /**
   * Output only. The firmware version for the instance.
   */
  readonly firmwareVersion?: string;
  /**
   * True if you enable hyperthreading for the server, otherwise false. The
   * default value is false.
   */
  hyperthreadingEnabled?: boolean;
  /**
   * Output only. An identifier for the `Instance`, generated by the backend.
   */
  readonly id?: string;
  /**
   * Output only. True if the interactive serial console feature is enabled for
   * the instance, false otherwise. The default value is false.
   */
  readonly interactiveSerialConsoleEnabled?: boolean;
  /**
   * Labels as key value pairs.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * List of logical interfaces for the instance. The number of logical
   * interfaces will be the same as number of hardware bond/nic on the chosen
   * network template. For the non-multivlan configurations (for eg, existing
   * servers) that use existing default network template (bondaa-bondaa), both
   * the Instance.networks field and the Instance.logical_interfaces fields will
   * be filled to ensure backward compatibility. For the others, only
   * Instance.logical_interfaces will be filled.
   */
  logicalInterfaces?: GoogleCloudBaremetalsolutionV2LogicalInterface[];
  /**
   * Output only. Text field about info for logging in.
   */
  readonly loginInfo?: string;
  /**
   * Immutable. List of LUNs associated with this server.
   */
  luns?: Lun[];
  /**
   * Immutable. The server type. [Available server
   * types](https://cloud.google.com/bare-metal/docs/bms-planning#server_configurations)
   */
  machineType?: string;
  /**
   * Immutable. The resource name of this `Instance`. Resource names are
   * schemeless URIs that follow the conventions in
   * https://cloud.google.com/apis/design/resource_names. Format:
   * `projects/{project}/locations/{location}/instances/{instance}`
   */
  name?: string;
  /**
   * Output only. List of networks associated with this server.
   */
  readonly networks?: Network[];
  /**
   * Instance network template name. For eg, bondaa-bondaa, bondab-nic, etc.
   * Generally, the template name follows the syntax of "bond" or "nic".
   */
  networkTemplate?: string;
  /**
   * The OS image currently installed on the server.
   */
  osImage?: string;
  /**
   * Immutable. Pod name. Pod is an independent part of infrastructure.
   * Instance can be connected to the assets (networks, volumes) allocated in
   * the same pod only.
   */
  pod?: string;
  /**
   * Output only. The state of the server.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PROVISIONING" | "RUNNING" | "DELETED" | "UPDATING" | "STARTING" | "STOPPING" | "SHUTDOWN";
  /**
   * Output only. Update a time stamp.
   */
  readonly updateTime?: Date;
  /**
   * Input only. List of Volumes to attach to this Instance on creation. This
   * field won't be populated in Get/List responses.
   */
  volumes?: Volume[];
  /**
   * The workload profile for the instance.
   */
  workloadProfile?:  | "WORKLOAD_PROFILE_UNSPECIFIED" | "WORKLOAD_PROFILE_GENERIC" | "WORKLOAD_PROFILE_HANA";
}

function serializeInstance(data: any): Instance {
  return {
    ...data,
    luns: data["luns"] !== undefined ? data["luns"].map((item: any) => (serializeLun(item))) : undefined,
    volumes: data["volumes"] !== undefined ? data["volumes"].map((item: any) => (serializeVolume(item))) : undefined,
  };
}

function deserializeInstance(data: any): Instance {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    luns: data["luns"] !== undefined ? data["luns"].map((item: any) => (deserializeLun(item))) : undefined,
    networks: data["networks"] !== undefined ? data["networks"].map((item: any) => (deserializeNetwork(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    volumes: data["volumes"] !== undefined ? data["volumes"].map((item: any) => (deserializeVolume(item))) : undefined,
  };
}

/**
 * Configuration parameters for a new instance.
 */
export interface InstanceConfig {
  /**
   * If true networks can be from different projects of the same vendor
   * account.
   */
  accountNetworksEnabled?: boolean;
  /**
   * Client network address. Filled if InstanceConfig.multivlan_config is
   * false.
   */
  clientNetwork?: NetworkAddress;
  /**
   * Whether the instance should be provisioned with Hyperthreading enabled.
   */
  hyperthreading?: boolean;
  /**
   * A transient unique identifier to idenfity an instance within an
   * ProvisioningConfig request.
   */
  id?: string;
  /**
   * Instance type. [Available
   * types](https://cloud.google.com/bare-metal/docs/bms-planning#server_configurations)
   */
  instanceType?: string;
  /**
   * List of logical interfaces for the instance. The number of logical
   * interfaces will be the same as number of hardware bond/nic on the chosen
   * network template. Filled if InstanceConfig.multivlan_config is true.
   */
  logicalInterfaces?: GoogleCloudBaremetalsolutionV2LogicalInterface[];
  /**
   * Output only. The name of the instance config.
   */
  readonly name?: string;
  /**
   * The type of network configuration on the instance.
   */
  networkConfig?:  | "NETWORKCONFIG_UNSPECIFIED" | "SINGLE_VLAN" | "MULTI_VLAN";
  /**
   * Server network template name. Filled if InstanceConfig.multivlan_config is
   * true.
   */
  networkTemplate?: string;
  /**
   * OS image to initialize the instance. [Available
   * images](https://cloud.google.com/bare-metal/docs/bms-planning#server_configurations)
   */
  osImage?: string;
  /**
   * Private network address, if any. Filled if InstanceConfig.multivlan_config
   * is false.
   */
  privateNetwork?: NetworkAddress;
  /**
   * User note field, it can be used by customers to add additional information
   * for the BMS Ops team .
   */
  userNote?: string;
}

/**
 * A resource budget.
 */
export interface InstanceQuota {
  /**
   * Number of machines than can be created for the given location and
   * instance_type.
   */
  availableMachineCount?: number;
  /**
   * The gcp service of the provisioning quota.
   */
  gcpService?: string;
  /**
   * Instance type. Deprecated: use gcp_service.
   */
  instanceType?: string;
  /**
   * Location where the quota applies.
   */
  location?: string;
  /**
   * Output only. The name of the instance quota.
   */
  readonly name?: string;
}

/**
 * A GCP vlan attachment.
 */
export interface IntakeVlanAttachment {
  /**
   * Identifier of the VLAN attachment.
   */
  id?: string;
  /**
   * Attachment pairing key.
   */
  pairingKey?: string;
}

/**
 * Response message for the list of servers.
 */
export interface ListInstancesResponse {
  /**
   * The list of servers.
   */
  instances?: Instance[];
  /**
   * A token identifying a page of results from the server.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

function serializeListInstancesResponse(data: any): ListInstancesResponse {
  return {
    ...data,
    instances: data["instances"] !== undefined ? data["instances"].map((item: any) => (serializeInstance(item))) : undefined,
  };
}

function deserializeListInstancesResponse(data: any): ListInstancesResponse {
  return {
    ...data,
    instances: data["instances"] !== undefined ? data["instances"].map((item: any) => (deserializeInstance(item))) : undefined,
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
 * Response message containing the list of storage volume luns.
 */
export interface ListLunsResponse {
  /**
   * The list of luns.
   */
  luns?: Lun[];
  /**
   * A token identifying a page of results from the server.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

function serializeListLunsResponse(data: any): ListLunsResponse {
  return {
    ...data,
    luns: data["luns"] !== undefined ? data["luns"].map((item: any) => (serializeLun(item))) : undefined,
  };
}

function deserializeListLunsResponse(data: any): ListLunsResponse {
  return {
    ...data,
    luns: data["luns"] !== undefined ? data["luns"].map((item: any) => (deserializeLun(item))) : undefined,
  };
}

/**
 * Response message containing the list of networks.
 */
export interface ListNetworksResponse {
  /**
   * The list of networks.
   */
  networks?: Network[];
  /**
   * A token identifying a page of results from the server.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

function serializeListNetworksResponse(data: any): ListNetworksResponse {
  return {
    ...data,
    networks: data["networks"] !== undefined ? data["networks"].map((item: any) => (serializeNetwork(item))) : undefined,
  };
}

function deserializeListNetworksResponse(data: any): ListNetworksResponse {
  return {
    ...data,
    networks: data["networks"] !== undefined ? data["networks"].map((item: any) => (deserializeNetwork(item))) : undefined,
  };
}

/**
 * Response with Networks with IPs
 */
export interface ListNetworkUsageResponse {
  /**
   * Networks with IPs.
   */
  networks?: NetworkUsage[];
}

function serializeListNetworkUsageResponse(data: any): ListNetworkUsageResponse {
  return {
    ...data,
    networks: data["networks"] !== undefined ? data["networks"].map((item: any) => (serializeNetworkUsage(item))) : undefined,
  };
}

function deserializeListNetworkUsageResponse(data: any): ListNetworkUsageResponse {
  return {
    ...data,
    networks: data["networks"] !== undefined ? data["networks"].map((item: any) => (deserializeNetworkUsage(item))) : undefined,
  };
}

/**
 * Response message containing the list of NFS shares.
 */
export interface ListNfsSharesResponse {
  /**
   * A token identifying a page of results from the server.
   */
  nextPageToken?: string;
  /**
   * The list of NFS shares.
   */
  nfsShares?: NfsShare[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

function serializeListNfsSharesResponse(data: any): ListNfsSharesResponse {
  return {
    ...data,
    nfsShares: data["nfsShares"] !== undefined ? data["nfsShares"].map((item: any) => (serializeNfsShare(item))) : undefined,
  };
}

function deserializeListNfsSharesResponse(data: any): ListNfsSharesResponse {
  return {
    ...data,
    nfsShares: data["nfsShares"] !== undefined ? data["nfsShares"].map((item: any) => (deserializeNfsShare(item))) : undefined,
  };
}

/**
 * Response message for the list of provisioning quotas.
 */
export interface ListProvisioningQuotasResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The provisioning quotas registered in this project.
   */
  provisioningQuotas?: ProvisioningQuota[];
}

function serializeListProvisioningQuotasResponse(data: any): ListProvisioningQuotasResponse {
  return {
    ...data,
    provisioningQuotas: data["provisioningQuotas"] !== undefined ? data["provisioningQuotas"].map((item: any) => (serializeProvisioningQuota(item))) : undefined,
  };
}

function deserializeListProvisioningQuotasResponse(data: any): ListProvisioningQuotasResponse {
  return {
    ...data,
    provisioningQuotas: data["provisioningQuotas"] !== undefined ? data["provisioningQuotas"].map((item: any) => (deserializeProvisioningQuota(item))) : undefined,
  };
}

/**
 * Message for response of ListSSHKeys.
 */
export interface ListSSHKeysResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The SSH keys registered in the project.
   */
  sshKeys?: SSHKey[];
}

/**
 * Response message containing the list of volume snapshots.
 */
export interface ListVolumeSnapshotsResponse {
  /**
   * A token identifying a page of results from the server.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
  /**
   * The list of snapshots.
   */
  volumeSnapshots?: VolumeSnapshot[];
}

/**
 * Response message containing the list of storage volumes.
 */
export interface ListVolumesResponse {
  /**
   * A token identifying a page of results from the server.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
  /**
   * The list of storage volumes.
   */
  volumes?: Volume[];
}

function serializeListVolumesResponse(data: any): ListVolumesResponse {
  return {
    ...data,
    volumes: data["volumes"] !== undefined ? data["volumes"].map((item: any) => (serializeVolume(item))) : undefined,
  };
}

function deserializeListVolumesResponse(data: any): ListVolumesResponse {
  return {
    ...data,
    volumes: data["volumes"] !== undefined ? data["volumes"].map((item: any) => (deserializeVolume(item))) : undefined,
  };
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
 * Each logical network interface is effectively a network and IP pair.
 */
export interface LogicalNetworkInterface {
  /**
   * Whether this interface is the default gateway for the instance. Only one
   * interface can be the default gateway for the instance.
   */
  defaultGateway?: boolean;
  /**
   * An identifier for the `Network`, generated by the backend.
   */
  id?: string;
  /**
   * IP address in the network
   */
  ipAddress?: string;
  /**
   * Name of the network
   */
  network?: string;
  /**
   * Type of network.
   */
  networkType?:  | "TYPE_UNSPECIFIED" | "CLIENT" | "PRIVATE";
}

/**
 * A storage volume logical unit number (LUN).
 */
export interface Lun {
  /**
   * Display if this LUN is a boot LUN.
   */
  bootLun?: boolean;
  /**
   * Output only. Time after which LUN will be fully deleted. It is filled only
   * for LUNs in COOL_OFF state.
   */
  readonly expireTime?: Date;
  /**
   * An identifier for the LUN, generated by the backend.
   */
  id?: string;
  /**
   * The LUN multiprotocol type ensures the characteristics of the LUN are
   * optimized for each operating system.
   */
  multiprotocolType?:  | "MULTIPROTOCOL_TYPE_UNSPECIFIED" | "LINUX";
  /**
   * Output only. The name of the LUN.
   */
  readonly name?: string;
  /**
   * Display if this LUN can be shared between multiple physical servers.
   */
  shareable?: boolean;
  /**
   * The size of this LUN, in gigabytes.
   */
  sizeGb?: bigint;
  /**
   * The state of this storage volume.
   */
  state?:  | "STATE_UNSPECIFIED" | "CREATING" | "UPDATING" | "READY" | "DELETING" | "COOL_OFF";
  /**
   * The storage type for this LUN.
   */
  storageType?:  | "STORAGE_TYPE_UNSPECIFIED" | "SSD" | "HDD";
  /**
   * Display the storage volume for this LUN.
   */
  storageVolume?: string;
  /**
   * The WWID for this LUN.
   */
  wwid?: string;
}

function serializeLun(data: any): Lun {
  return {
    ...data,
    sizeGb: data["sizeGb"] !== undefined ? String(data["sizeGb"]) : undefined,
  };
}

function deserializeLun(data: any): Lun {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    sizeGb: data["sizeGb"] !== undefined ? BigInt(data["sizeGb"]) : undefined,
  };
}

/**
 * A LUN(Logical Unit Number) range.
 */
export interface LunRange {
  /**
   * Number of LUNs to create.
   */
  quantity?: number;
  /**
   * The requested size of each LUN, in GB.
   */
  sizeGb?: number;
}

/**
 * A Network.
 */
export interface Network {
  /**
   * The cidr of the Network.
   */
  cidr?: string;
  /**
   * Output only. Gateway ip address.
   */
  readonly gatewayIp?: string;
  /**
   * An identifier for the `Network`, generated by the backend.
   */
  id?: string;
  /**
   * IP address configured.
   */
  ipAddress?: string;
  /**
   * Whether network uses standard frames or jumbo ones.
   */
  jumboFramesEnabled?: boolean;
  /**
   * Labels as key value pairs.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * List of physical interfaces.
   */
  macAddress?: string[];
  /**
   * Input only. List of mount points to attach the network to.
   */
  mountPoints?: NetworkMountPoint[];
  /**
   * Output only. The resource name of this `Network`. Resource names are
   * schemeless URIs that follow the conventions in
   * https://cloud.google.com/apis/design/resource_names. Format:
   * `projects/{project}/locations/{location}/networks/{network}`
   */
  readonly name?: string;
  /**
   * Output only. Pod name.
   */
  readonly pod?: string;
  /**
   * List of IP address reservations in this network. When updating this field,
   * an error will be generated if a reservation conflicts with an IP address
   * already allocated to a physical server.
   */
  reservations?: NetworkAddressReservation[];
  /**
   * IP range for reserved for services (e.g. NFS).
   */
  servicesCidr?: string;
  /**
   * The Network state.
   */
  state?:  | "STATE_UNSPECIFIED" | "PROVISIONING" | "PROVISIONED" | "DEPROVISIONING" | "UPDATING";
  /**
   * The type of this network.
   */
  type?:  | "TYPE_UNSPECIFIED" | "CLIENT" | "PRIVATE";
  /**
   * The vlan id of the Network.
   */
  vlanId?: string;
  /**
   * The vrf for the Network.
   */
  vrf?: VRF;
}

function serializeNetwork(data: any): Network {
  return {
    ...data,
    vrf: data["vrf"] !== undefined ? serializeVRF(data["vrf"]) : undefined,
  };
}

function deserializeNetwork(data: any): Network {
  return {
    ...data,
    vrf: data["vrf"] !== undefined ? deserializeVRF(data["vrf"]) : undefined,
  };
}

/**
 * A network.
 */
export interface NetworkAddress {
  /**
   * IPv4 address to be assigned to the server.
   */
  address?: string;
  /**
   * Name of the existing network to use.
   */
  existingNetworkId?: string;
  /**
   * Id of the network to use, within the same ProvisioningConfig request.
   */
  networkId?: string;
}

/**
 * A reservation of one or more addresses in a network.
 */
export interface NetworkAddressReservation {
  /**
   * The last address of this reservation block, inclusive. I.e., for cases
   * when reservations are only single addresses, end_address and start_address
   * will be the same. Must be specified as a single IPv4 address, e.g.
   * 10.1.2.2.
   */
  endAddress?: string;
  /**
   * A note about this reservation, intended for human consumption.
   */
  note?: string;
  /**
   * The first address of this reservation block. Must be specified as a single
   * IPv4 address, e.g. 10.1.2.2.
   */
  startAddress?: string;
}

/**
 * Configuration parameters for a new network.
 */
export interface NetworkConfig {
  /**
   * Interconnect bandwidth. Set only when type is CLIENT.
   */
  bandwidth?:  | "BANDWIDTH_UNSPECIFIED" | "BW_1_GBPS" | "BW_2_GBPS" | "BW_5_GBPS" | "BW_10_GBPS";
  /**
   * CIDR range of the network.
   */
  cidr?: string;
  /**
   * The GCP service of the network. Available gcp_service are in
   * https://cloud.google.com/bare-metal/docs/bms-planning.
   */
  gcpService?: string;
  /**
   * A transient unique identifier to identify a volume within an
   * ProvisioningConfig request.
   */
  id?: string;
  /**
   * The JumboFramesEnabled option for customer to set.
   */
  jumboFramesEnabled?: boolean;
  /**
   * Output only. The name of the network config.
   */
  readonly name?: string;
  /**
   * Service CIDR, if any.
   */
  serviceCidr?:  | "SERVICE_CIDR_UNSPECIFIED" | "DISABLED" | "HIGH_26" | "HIGH_27" | "HIGH_28";
  /**
   * The type of this network, either Client or Private.
   */
  type?:  | "TYPE_UNSPECIFIED" | "CLIENT" | "PRIVATE";
  /**
   * User note field, it can be used by customers to add additional information
   * for the BMS Ops team .
   */
  userNote?: string;
  /**
   * List of VLAN attachments. As of now there are always 2 attachments, but it
   * is going to change in the future (multi vlan).
   */
  vlanAttachments?: IntakeVlanAttachment[];
  /**
   * Whether the VLAN attachment pair is located in the same project.
   */
  vlanSameProject?: boolean;
}

/**
 * Mount point for a network.
 */
export interface NetworkMountPoint {
  /**
   * Network should be a default gateway.
   */
  defaultGateway?: boolean;
  /**
   * Instance to attach network to.
   */
  instance?: string;
  /**
   * Ip address of the server.
   */
  ipAddress?: string;
  /**
   * Logical interface to detach from.
   */
  logicalInterface?: string;
}

/**
 * Network with all used IP addresses.
 */
export interface NetworkUsage {
  /**
   * Network.
   */
  network?: Network;
  /**
   * All used IP addresses in this network.
   */
  usedIps?: string[];
}

function serializeNetworkUsage(data: any): NetworkUsage {
  return {
    ...data,
    network: data["network"] !== undefined ? serializeNetwork(data["network"]) : undefined,
  };
}

function deserializeNetworkUsage(data: any): NetworkUsage {
  return {
    ...data,
    network: data["network"] !== undefined ? deserializeNetwork(data["network"]) : undefined,
  };
}

/**
 * A NFS export entry.
 */
export interface NfsExport {
  /**
   * Allow dev flag in NfsShare AllowedClientsRequest.
   */
  allowDev?: boolean;
  /**
   * Allow the setuid flag.
   */
  allowSuid?: boolean;
  /**
   * A CIDR range.
   */
  cidr?: string;
  /**
   * Either a single machine, identified by an ID, or a comma-separated list of
   * machine IDs.
   */
  machineId?: string;
  /**
   * Network to use to publish the export.
   */
  networkId?: string;
  /**
   * Disable root squashing, which is a feature of NFS. Root squash is a
   * special mapping of the remote superuser (root) identity when using identity
   * authentication.
   */
  noRootSquash?: boolean;
  /**
   * Export permissions.
   */
  permissions?:  | "PERMISSIONS_UNSPECIFIED" | "READ_ONLY" | "READ_WRITE";
}

/**
 * An NFS share.
 */
export interface NfsShare {
  /**
   * List of allowed access points.
   */
  allowedClients?: AllowedClient[];
  /**
   * Output only. An identifier for the NFS share, generated by the backend.
   * This is the same value as nfs_share_id and will replace it in the future.
   */
  readonly id?: string;
  /**
   * Labels as key value pairs.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Immutable. The name of the NFS share.
   */
  name?: string;
  /**
   * Output only. An identifier for the NFS share, generated by the backend.
   * This field will be deprecated in the future, use `id` instead.
   */
  readonly nfsShareId?: string;
  /**
   * The requested size, in GiB.
   */
  requestedSizeGib?: bigint;
  /**
   * Output only. The state of the NFS share.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PROVISIONED" | "CREATING" | "UPDATING" | "DELETING";
  /**
   * Immutable. The storage type of the underlying volume.
   */
  storageType?:  | "STORAGE_TYPE_UNSPECIFIED" | "SSD" | "HDD";
  /**
   * Output only. The underlying volume of the share. Created automatically
   * during provisioning.
   */
  readonly volume?: string;
}

function serializeNfsShare(data: any): NfsShare {
  return {
    ...data,
    requestedSizeGib: data["requestedSizeGib"] !== undefined ? String(data["requestedSizeGib"]) : undefined,
  };
}

function deserializeNfsShare(data: any): NfsShare {
  return {
    ...data,
    requestedSizeGib: data["requestedSizeGib"] !== undefined ? BigInt(data["requestedSizeGib"]) : undefined,
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
 * Operation System image.
 */
export interface OSImage {
  /**
   * Instance types this image is applicable to. [Available
   * types](https://cloud.google.com/bare-metal/docs/bms-planning#server_configurations)
   */
  applicableInstanceTypes?: string[];
  /**
   * OS Image code.
   */
  code?: string;
  /**
   * OS Image description.
   */
  description?: string;
  /**
   * Output only. OS Image's unique name.
   */
  readonly name?: string;
  /**
   * Network templates that can be used with this OS Image.
   */
  supportedNetworkTemplates?: ServerNetworkTemplate[];
}

/**
 * Additional options for BareMetalSolution#projectsLocationsInstancesList.
 */
export interface ProjectsLocationsInstancesListOptions {
  /**
   * List filter.
   */
  filter?: string;
  /**
   * Requested page size. Server may return fewer items than requested. If
   * unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results from the server.
   */
  pageToken?: string;
}

/**
 * Additional options for BareMetalSolution#projectsLocationsInstancesPatch.
 */
export interface ProjectsLocationsInstancesPatchOptions {
  /**
   * The list of fields to update. The currently supported fields are: `labels`
   * `hyperthreading_enabled` `os_image`
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsInstancesPatchOptions(data: any): ProjectsLocationsInstancesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsInstancesPatchOptions(data: any): ProjectsLocationsInstancesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for BareMetalSolution#projectsLocationsList.
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
 * Additional options for BareMetalSolution#projectsLocationsNetworksList.
 */
export interface ProjectsLocationsNetworksListOptions {
  /**
   * List filter.
   */
  filter?: string;
  /**
   * Requested page size. The server might return fewer items than requested.
   * If unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results from the server.
   */
  pageToken?: string;
}

/**
 * Additional options for BareMetalSolution#projectsLocationsNetworksPatch.
 */
export interface ProjectsLocationsNetworksPatchOptions {
  /**
   * The list of fields to update. The only currently supported fields are:
   * `labels`, `reservations`, `vrf.vlan_attachments`
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsNetworksPatchOptions(data: any): ProjectsLocationsNetworksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsNetworksPatchOptions(data: any): ProjectsLocationsNetworksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for BareMetalSolution#projectsLocationsNfsSharesList.
 */
export interface ProjectsLocationsNfsSharesListOptions {
  /**
   * List filter.
   */
  filter?: string;
  /**
   * Requested page size. The server might return fewer items than requested.
   * If unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results from the server.
   */
  pageToken?: string;
}

/**
 * Additional options for BareMetalSolution#projectsLocationsNfsSharesPatch.
 */
export interface ProjectsLocationsNfsSharesPatchOptions {
  /**
   * The list of fields to update. The only currently supported fields are:
   * `labels` `allowed_clients`
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsNfsSharesPatchOptions(data: any): ProjectsLocationsNfsSharesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsNfsSharesPatchOptions(data: any): ProjectsLocationsNfsSharesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * BareMetalSolution#projectsLocationsProvisioningConfigsCreate.
 */
export interface ProjectsLocationsProvisioningConfigsCreateOptions {
  /**
   * Optional. Email provided to send a confirmation with provisioning config
   * to.
   */
  email?: string;
}

/**
 * Additional options for
 * BareMetalSolution#projectsLocationsProvisioningConfigsPatch.
 */
export interface ProjectsLocationsProvisioningConfigsPatchOptions {
  /**
   * Optional. Email provided to send a confirmation with provisioning config
   * to.
   */
  email?: string;
  /**
   * Required. The list of fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProvisioningConfigsPatchOptions(data: any): ProjectsLocationsProvisioningConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsProvisioningConfigsPatchOptions(data: any): ProjectsLocationsProvisioningConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * BareMetalSolution#projectsLocationsProvisioningQuotasList.
 */
export interface ProjectsLocationsProvisioningQuotasListOptions {
  /**
   * Requested page size. The server might return fewer items than requested.
   * If unspecified, server will pick an appropriate default. Notice that
   * page_size field is not supported and won't be respected in the API request
   * for now, will be updated when pagination is supported.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results from the server.
   */
  pageToken?: string;
}

/**
 * Additional options for BareMetalSolution#projectsLocationsSshKeysCreate.
 */
export interface ProjectsLocationsSshKeysCreateOptions {
  /**
   * Required. The ID to use for the key, which will become the final component
   * of the key's resource name. This value must match the regex:
   * [a-zA-Z0-9@.\-_]{1,64}
   */
  sshKeyId?: string;
}

/**
 * Additional options for BareMetalSolution#projectsLocationsSshKeysList.
 */
export interface ProjectsLocationsSshKeysListOptions {
  /**
   * The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for BareMetalSolution#projectsLocationsVolumesList.
 */
export interface ProjectsLocationsVolumesListOptions {
  /**
   * List filter.
   */
  filter?: string;
  /**
   * Requested page size. The server might return fewer items than requested.
   * If unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results from the server.
   */
  pageToken?: string;
}

/**
 * Additional options for BareMetalSolution#projectsLocationsVolumesLunsList.
 */
export interface ProjectsLocationsVolumesLunsListOptions {
  /**
   * Requested page size. The server might return fewer items than requested.
   * If unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results from the server.
   */
  pageToken?: string;
}

/**
 * Additional options for BareMetalSolution#projectsLocationsVolumesPatch.
 */
export interface ProjectsLocationsVolumesPatchOptions {
  /**
   * The list of fields to update. The only currently supported fields are:
   * 'labels'
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsVolumesPatchOptions(data: any): ProjectsLocationsVolumesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsVolumesPatchOptions(data: any): ProjectsLocationsVolumesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * BareMetalSolution#projectsLocationsVolumesSnapshotsList.
 */
export interface ProjectsLocationsVolumesSnapshotsListOptions {
  /**
   * Requested page size. The server might return fewer items than requested.
   * If unspecified, server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * A token identifying a page of results from the server.
   */
  pageToken?: string;
}

/**
 * A provisioning configuration.
 */
export interface ProvisioningConfig {
  /**
   * Output only. URI to Cloud Console UI view of this provisioning config.
   */
  readonly cloudConsoleUri?: string;
  /**
   * Optional. The user-defined identifier of the provisioning config.
   */
  customId?: string;
  /**
   * Email provided to send a confirmation with provisioning config to.
   * Deprecated in favour of email field in request messages.
   */
  email?: string;
  /**
   * A service account to enable customers to access instance credentials upon
   * handover.
   */
  handoverServiceAccount?: string;
  /**
   * Instances to be created.
   */
  instances?: InstanceConfig[];
  /**
   * Optional. Location name of this ProvisioningConfig. It is optional only
   * for Intake UI transition period.
   */
  location?: string;
  /**
   * Output only. The system-generated name of the provisioning config. This
   * follows the UUID format.
   */
  readonly name?: string;
  /**
   * Networks to be created.
   */
  networks?: NetworkConfig[];
  /**
   * Output only. State of ProvisioningConfig.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "DRAFT" | "SUBMITTED" | "PROVISIONING" | "PROVISIONED" | "VALIDATED" | "CANCELLED" | "FAILED";
  /**
   * Optional status messages associated with the FAILED state.
   */
  statusMessage?: string;
  /**
   * A generated ticket id to track provisioning request.
   */
  ticketId?: string;
  /**
   * Output only. Last update timestamp.
   */
  readonly updateTime?: Date;
  /**
   * Volumes to be created.
   */
  volumes?: VolumeConfig[];
  /**
   * If true, VPC SC is enabled for the cluster.
   */
  vpcScEnabled?: boolean;
}

/**
 * A provisioning quota for a given project.
 */
export interface ProvisioningQuota {
  /**
   * The asset type of this provisioning quota.
   */
  assetType?:  | "ASSET_TYPE_UNSPECIFIED" | "ASSET_TYPE_SERVER" | "ASSET_TYPE_STORAGE" | "ASSET_TYPE_NETWORK";
  /**
   * The available count of the provisioning quota.
   */
  availableCount?: number;
  /**
   * The gcp service of the provisioning quota.
   */
  gcpService?: string;
  /**
   * Instance quota.
   */
  instanceQuota?: InstanceQuota;
  /**
   * The specific location of the provisioining quota.
   */
  location?: string;
  /**
   * Output only. The name of the provisioning quota.
   */
  readonly name?: string;
  /**
   * Network bandwidth, Gbps
   */
  networkBandwidth?: bigint;
  /**
   * Server count.
   */
  serverCount?: bigint;
  /**
   * Storage size (GB).
   */
  storageGib?: bigint;
}

function serializeProvisioningQuota(data: any): ProvisioningQuota {
  return {
    ...data,
    networkBandwidth: data["networkBandwidth"] !== undefined ? String(data["networkBandwidth"]) : undefined,
    serverCount: data["serverCount"] !== undefined ? String(data["serverCount"]) : undefined,
    storageGib: data["storageGib"] !== undefined ? String(data["storageGib"]) : undefined,
  };
}

function deserializeProvisioningQuota(data: any): ProvisioningQuota {
  return {
    ...data,
    networkBandwidth: data["networkBandwidth"] !== undefined ? BigInt(data["networkBandwidth"]) : undefined,
    serverCount: data["serverCount"] !== undefined ? BigInt(data["serverCount"]) : undefined,
    storageGib: data["storageGib"] !== undefined ? BigInt(data["storageGib"]) : undefined,
  };
}

/**
 * QOS policy parameters.
 */
export interface QosPolicy {
  /**
   * The bandwidth permitted by the QOS policy, in gbps.
   */
  bandwidthGbps?: number;
}

/**
 * Message requesting rename of a server.
 */
export interface RenameInstanceRequest {
  /**
   * Required. The new `id` of the instance.
   */
  newInstanceId?: string;
}

/**
 * Message requesting rename of a server.
 */
export interface RenameNetworkRequest {
  /**
   * Required. The new `id` of the network.
   */
  newNetworkId?: string;
}

/**
 * Message requesting rename of a server.
 */
export interface RenameNfsShareRequest {
  /**
   * Required. The new `id` of the nfsshare.
   */
  newNfsshareId?: string;
}

/**
 * Message requesting rename of a server.
 */
export interface RenameVolumeRequest {
  /**
   * Required. The new `id` of the volume.
   */
  newVolumeId?: string;
}

/**
 * Message requesting to reset a server.
 */
export interface ResetInstanceRequest {
}

/**
 * Request for emergency resize Volume.
 */
export interface ResizeVolumeRequest {
  /**
   * New Volume size, in GiB.
   */
  sizeGib?: bigint;
}

function serializeResizeVolumeRequest(data: any): ResizeVolumeRequest {
  return {
    ...data,
    sizeGib: data["sizeGib"] !== undefined ? String(data["sizeGib"]) : undefined,
  };
}

function deserializeResizeVolumeRequest(data: any): ResizeVolumeRequest {
  return {
    ...data,
    sizeGib: data["sizeGib"] !== undefined ? BigInt(data["sizeGib"]) : undefined,
  };
}

/**
 * Message for restoring a volume snapshot.
 */
export interface RestoreVolumeSnapshotRequest {
}

/**
 * Network template.
 */
export interface ServerNetworkTemplate {
  /**
   * Instance types this template is applicable to.
   */
  applicableInstanceTypes?: string[];
  /**
   * Logical interfaces.
   */
  logicalInterfaces?: GoogleCloudBaremetalsolutionV2ServerNetworkTemplateLogicalInterface[];
  /**
   * Output only. Template's unique name. The full resource name follows the
   * pattern:
   * `projects/{project}/locations/{location}/serverNetworkTemplate/{server_network_template}`
   * Generally, the {server_network_template} follows the syntax of "bond" or
   * "nic".
   */
  readonly name?: string;
}

/**
 * Details about snapshot space reservation and usage on the storage volume.
 */
export interface SnapshotReservationDetail {
  /**
   * The space on this storage volume reserved for snapshots, shown in GiB.
   */
  reservedSpaceGib?: bigint;
  /**
   * Percent of the total Volume size reserved for snapshot copies. Enabling
   * snapshots requires reserving 20% or more of the storage volume space for
   * snapshots. Maximum reserved space for snapshots is 40%. Setting this field
   * will effectively set snapshot_enabled to true.
   */
  reservedSpacePercent?: number;
  /**
   * The amount, in GiB, of available space in this storage volume's reserved
   * snapshot space.
   */
  reservedSpaceRemainingGib?: bigint;
  /**
   * The percent of snapshot space on this storage volume actually being used
   * by the snapshot copies. This value might be higher than 100% if the
   * snapshot copies have overflowed into the data portion of the storage
   * volume.
   */
  reservedSpaceUsedPercent?: number;
}

function serializeSnapshotReservationDetail(data: any): SnapshotReservationDetail {
  return {
    ...data,
    reservedSpaceGib: data["reservedSpaceGib"] !== undefined ? String(data["reservedSpaceGib"]) : undefined,
    reservedSpaceRemainingGib: data["reservedSpaceRemainingGib"] !== undefined ? String(data["reservedSpaceRemainingGib"]) : undefined,
  };
}

function deserializeSnapshotReservationDetail(data: any): SnapshotReservationDetail {
  return {
    ...data,
    reservedSpaceGib: data["reservedSpaceGib"] !== undefined ? BigInt(data["reservedSpaceGib"]) : undefined,
    reservedSpaceRemainingGib: data["reservedSpaceRemainingGib"] !== undefined ? BigInt(data["reservedSpaceRemainingGib"]) : undefined,
  };
}

/**
 * An SSH key, used for authorizing with the interactive serial console
 * feature.
 */
export interface SSHKey {
  /**
   * Output only. The name of this SSH key. Currently, the only valid value for
   * the location is "global".
   */
  readonly name?: string;
  /**
   * The public SSH key. This must be in OpenSSH .authorized_keys format.
   */
  publicKey?: string;
}

/**
 * Message requesting to start a server.
 */
export interface StartInstanceRequest {
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
 * Message requesting to stop a server.
 */
export interface StopInstanceRequest {
}

/**
 * Request for SubmitProvisioningConfig.
 */
export interface SubmitProvisioningConfigRequest {
  /**
   * Optional. Email provided to send a confirmation with provisioning config
   * to.
   */
  email?: string;
  /**
   * Required. The ProvisioningConfig to create.
   */
  provisioningConfig?: ProvisioningConfig;
}

/**
 * Response for SubmitProvisioningConfig.
 */
export interface SubmitProvisioningConfigResponse {
  /**
   * The submitted provisioning config.
   */
  provisioningConfig?: ProvisioningConfig;
}

/**
 * VLAN attachment details.
 */
export interface VlanAttachment {
  /**
   * Immutable. The identifier of the attachment within vrf.
   */
  id?: string;
  /**
   * Input only. Pairing key.
   */
  pairingKey?: string;
  /**
   * The peer IP of the attachment.
   */
  peerIp?: string;
  /**
   * The peer vlan ID of the attachment.
   */
  peerVlanId?: bigint;
  /**
   * The QOS policy applied to this VLAN attachment. This value should be
   * preferred to using qos at vrf level.
   */
  qosPolicy?: QosPolicy;
  /**
   * The router IP of the attachment.
   */
  routerIp?: string;
}

function serializeVlanAttachment(data: any): VlanAttachment {
  return {
    ...data,
    peerVlanId: data["peerVlanId"] !== undefined ? String(data["peerVlanId"]) : undefined,
  };
}

function deserializeVlanAttachment(data: any): VlanAttachment {
  return {
    ...data,
    peerVlanId: data["peerVlanId"] !== undefined ? BigInt(data["peerVlanId"]) : undefined,
  };
}

/**
 * A storage volume.
 */
export interface Volume {
  /**
   * The size, in GiB, that this storage volume has expanded as a result of an
   * auto grow policy. In the absence of auto-grow, the value is 0.
   */
  autoGrownSizeGib?: bigint;
  /**
   * Output only. Whether this volume is a boot volume. A boot volume is one
   * which contains a boot LUN.
   */
  readonly bootVolume?: boolean;
  /**
   * The current size of this storage volume, in GiB, including space reserved
   * for snapshots. This size might be different than the requested size if the
   * storage volume has been configured with auto grow or auto shrink.
   */
  currentSizeGib?: bigint;
  /**
   * Additional emergency size that was requested for this Volume, in GiB.
   * current_size_gib includes this value.
   */
  emergencySizeGib?: bigint;
  /**
   * Output only. Time after which volume will be fully deleted. It is filled
   * only for volumes in COOLOFF state.
   */
  readonly expireTime?: Date;
  /**
   * An identifier for the `Volume`, generated by the backend.
   */
  id?: string;
  /**
   * Labels as key value pairs.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Maximum size volume can be expanded to in case of evergency, in GiB.
   */
  maxSizeGib?: bigint;
  /**
   * Output only. The resource name of this `Volume`. Resource names are
   * schemeless URIs that follow the conventions in
   * https://cloud.google.com/apis/design/resource_names. Format:
   * `projects/{project}/locations/{location}/volumes/{volume}`
   */
  readonly name?: string;
  /**
   * Input only. User-specified notes for new Volume. Used to provision Volumes
   * that require manual intervention.
   */
  notes?: string;
  /**
   * Originally requested size, in GiB.
   */
  originallyRequestedSizeGib?: bigint;
  /**
   * Immutable. Performance tier of the Volume. Default is SHARED.
   */
  performanceTier?:  | "VOLUME_PERFORMANCE_TIER_UNSPECIFIED" | "VOLUME_PERFORMANCE_TIER_SHARED" | "VOLUME_PERFORMANCE_TIER_ASSIGNED" | "VOLUME_PERFORMANCE_TIER_HT";
  /**
   * Immutable. Pod name.
   */
  pod?: string;
  /**
   * Output only. Storage protocol for the Volume.
   */
  readonly protocol?:  | "PROTOCOL_UNSPECIFIED" | "FIBRE_CHANNEL" | "NFS";
  /**
   * The space remaining in the storage volume for new LUNs, in GiB, excluding
   * space reserved for snapshots.
   */
  remainingSpaceGib?: bigint;
  /**
   * The requested size of this storage volume, in GiB.
   */
  requestedSizeGib?: bigint;
  /**
   * The behavior to use when snapshot reserved space is full.
   */
  snapshotAutoDeleteBehavior?:  | "SNAPSHOT_AUTO_DELETE_BEHAVIOR_UNSPECIFIED" | "DISABLED" | "OLDEST_FIRST" | "NEWEST_FIRST";
  /**
   * Whether snapshots are enabled.
   */
  snapshotEnabled?: boolean;
  /**
   * Details about snapshot space reservation and usage on the storage volume.
   */
  snapshotReservationDetail?: SnapshotReservationDetail;
  /**
   * The name of the snapshot schedule policy in use for this volume, if any.
   */
  snapshotSchedulePolicy?: string;
  /**
   * The state of this storage volume.
   */
  state?:  | "STATE_UNSPECIFIED" | "CREATING" | "READY" | "DELETING" | "UPDATING" | "COOL_OFF";
  /**
   * Input only. Name of the storage aggregate pool to allocate the volume in.
   * Can be used only for VOLUME_PERFORMANCE_TIER_ASSIGNED volumes.
   */
  storageAggregatePool?: string;
  /**
   * The storage type for this volume.
   */
  storageType?:  | "STORAGE_TYPE_UNSPECIFIED" | "SSD" | "HDD";
  /**
   * The workload profile for the volume.
   */
  workloadProfile?:  | "WORKLOAD_PROFILE_UNSPECIFIED" | "GENERIC" | "HANA";
}

function serializeVolume(data: any): Volume {
  return {
    ...data,
    autoGrownSizeGib: data["autoGrownSizeGib"] !== undefined ? String(data["autoGrownSizeGib"]) : undefined,
    currentSizeGib: data["currentSizeGib"] !== undefined ? String(data["currentSizeGib"]) : undefined,
    emergencySizeGib: data["emergencySizeGib"] !== undefined ? String(data["emergencySizeGib"]) : undefined,
    maxSizeGib: data["maxSizeGib"] !== undefined ? String(data["maxSizeGib"]) : undefined,
    originallyRequestedSizeGib: data["originallyRequestedSizeGib"] !== undefined ? String(data["originallyRequestedSizeGib"]) : undefined,
    remainingSpaceGib: data["remainingSpaceGib"] !== undefined ? String(data["remainingSpaceGib"]) : undefined,
    requestedSizeGib: data["requestedSizeGib"] !== undefined ? String(data["requestedSizeGib"]) : undefined,
    snapshotReservationDetail: data["snapshotReservationDetail"] !== undefined ? serializeSnapshotReservationDetail(data["snapshotReservationDetail"]) : undefined,
  };
}

function deserializeVolume(data: any): Volume {
  return {
    ...data,
    autoGrownSizeGib: data["autoGrownSizeGib"] !== undefined ? BigInt(data["autoGrownSizeGib"]) : undefined,
    currentSizeGib: data["currentSizeGib"] !== undefined ? BigInt(data["currentSizeGib"]) : undefined,
    emergencySizeGib: data["emergencySizeGib"] !== undefined ? BigInt(data["emergencySizeGib"]) : undefined,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    maxSizeGib: data["maxSizeGib"] !== undefined ? BigInt(data["maxSizeGib"]) : undefined,
    originallyRequestedSizeGib: data["originallyRequestedSizeGib"] !== undefined ? BigInt(data["originallyRequestedSizeGib"]) : undefined,
    remainingSpaceGib: data["remainingSpaceGib"] !== undefined ? BigInt(data["remainingSpaceGib"]) : undefined,
    requestedSizeGib: data["requestedSizeGib"] !== undefined ? BigInt(data["requestedSizeGib"]) : undefined,
    snapshotReservationDetail: data["snapshotReservationDetail"] !== undefined ? deserializeSnapshotReservationDetail(data["snapshotReservationDetail"]) : undefined,
  };
}

/**
 * Configuration parameters for a new volume.
 */
export interface VolumeConfig {
  /**
   * The GCP service of the storage volume. Available gcp_service are in
   * https://cloud.google.com/bare-metal/docs/bms-planning.
   */
  gcpService?: string;
  /**
   * A transient unique identifier to identify a volume within an
   * ProvisioningConfig request.
   */
  id?: string;
  /**
   * LUN ranges to be configured. Set only when protocol is PROTOCOL_FC.
   */
  lunRanges?: LunRange[];
  /**
   * Machine ids connected to this volume. Set only when protocol is
   * PROTOCOL_FC.
   */
  machineIds?: string[];
  /**
   * Output only. The name of the volume config.
   */
  readonly name?: string;
  /**
   * NFS exports. Set only when protocol is PROTOCOL_NFS.
   */
  nfsExports?: NfsExport[];
  /**
   * Performance tier of the Volume. Default is SHARED.
   */
  performanceTier?:  | "VOLUME_PERFORMANCE_TIER_UNSPECIFIED" | "VOLUME_PERFORMANCE_TIER_SHARED" | "VOLUME_PERFORMANCE_TIER_ASSIGNED" | "VOLUME_PERFORMANCE_TIER_HT";
  /**
   * Volume protocol.
   */
  protocol?:  | "PROTOCOL_UNSPECIFIED" | "PROTOCOL_FC" | "PROTOCOL_NFS";
  /**
   * The requested size of this volume, in GB.
   */
  sizeGb?: number;
  /**
   * Whether snapshots should be enabled.
   */
  snapshotsEnabled?: boolean;
  /**
   * Input only. Name of the storage aggregate pool to allocate the volume in.
   * Can be used only for VOLUME_PERFORMANCE_TIER_ASSIGNED volumes.
   */
  storageAggregatePool?: string;
  /**
   * The type of this Volume.
   */
  type?:  | "TYPE_UNSPECIFIED" | "FLASH" | "DISK";
  /**
   * User note field, it can be used by customers to add additional information
   * for the BMS Ops team .
   */
  userNote?: string;
}

/**
 * A snapshot of a volume. Only boot volumes can have snapshots.
 */
export interface VolumeSnapshot {
  /**
   * Output only. The creation time of the snapshot.
   */
  readonly createTime?: Date;
  /**
   * The description of the snapshot.
   */
  description?: string;
  /**
   * Output only. An identifier for the snapshot, generated by the backend.
   */
  readonly id?: string;
  /**
   * The name of the snapshot.
   */
  name?: string;
  /**
   * Output only. The name of the volume which this snapshot belongs to.
   */
  readonly storageVolume?: string;
  /**
   * Output only. The type of the snapshot which indicates whether it was
   * scheduled or manual/ad-hoc.
   */
  readonly type?:  | "SNAPSHOT_TYPE_UNSPECIFIED" | "AD_HOC" | "SCHEDULED";
}

/**
 * A network VRF.
 */
export interface VRF {
  /**
   * The name of the VRF.
   */
  name?: string;
  /**
   * The QOS policy applied to this VRF. The value is only meaningful when all
   * the vlan attachments have the same QoS. This field should not be used for
   * new integrations, use vlan attachment level qos instead. The field is left
   * for backward-compatibility.
   */
  qosPolicy?: QosPolicy;
  /**
   * The possible state of VRF.
   */
  state?:  | "STATE_UNSPECIFIED" | "PROVISIONING" | "PROVISIONED";
  /**
   * The list of VLAN attachments for the VRF.
   */
  vlanAttachments?: VlanAttachment[];
}

function serializeVRF(data: any): VRF {
  return {
    ...data,
    vlanAttachments: data["vlanAttachments"] !== undefined ? data["vlanAttachments"].map((item: any) => (serializeVlanAttachment(item))) : undefined,
  };
}

function deserializeVRF(data: any): VRF {
  return {
    ...data,
    vlanAttachments: data["vlanAttachments"] !== undefined ? data["vlanAttachments"].map((item: any) => (deserializeVlanAttachment(item))) : undefined,
  };
}