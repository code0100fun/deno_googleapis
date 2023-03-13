// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * VM Migration API Client for Deno
 * ================================
 * 
 * Use the Migrate to Virtual Machines API to programmatically migrate workloads. 
 * 
 * Docs: https://cloud.google.com/migrate/virtual-machines
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Use the Migrate to Virtual Machines API to programmatically migrate
 * workloads.
 */
export class VMMigration {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://vmmigration.googleapis.com/") {
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
   * Adds a MigratingVm to a Group.
   *
   * @param group Required. The full path name of the Group to add to.
   */
  async projectsLocationsGroupsAddGroupMigration(group: string, req: AddGroupMigrationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ group }:addGroupMigration`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a new Group in a given project and location.
   *
   * @param parent Required. The Group's parent.
   */
  async projectsLocationsGroupsCreate(parent: string, req: Group, opts: ProjectsLocationsGroupsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/groups`);
    if (opts.groupId !== undefined) {
      url.searchParams.append("groupId", String(opts.groupId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Deletes a single Group.
   *
   * @param name Required. The Group name.
   */
  async projectsLocationsGroupsDelete(name: string, opts: ProjectsLocationsGroupsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single Group.
   *
   * @param name Required. The group name.
   */
  async projectsLocationsGroupsGet(name: string): Promise<Group> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Group;
  }

  /**
   * Lists Groups in a given project and location.
   *
   * @param parent Required. The parent, which owns this collection of groups.
   */
  async projectsLocationsGroupsList(parent: string, opts: ProjectsLocationsGroupsListOptions = {}): Promise<ListGroupsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/groups`);
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
    return data as ListGroupsResponse;
  }

  /**
   * Updates the parameters of a single Group.
   *
   * @param name Output only. The Group name.
   */
  async projectsLocationsGroupsPatch(name: string, req: Group, opts: ProjectsLocationsGroupsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsGroupsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
    return data as Operation;
  }

  /**
   * Removes a MigratingVm from a Group.
   *
   * @param group Required. The name of the Group.
   */
  async projectsLocationsGroupsRemoveGroupMigration(group: string, req: RemoveGroupMigrationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ group }:removeGroupMigration`);
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
  async projectsLocationsOperationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
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
  async projectsLocationsOperationsDelete(name: string): Promise<Empty> {
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
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
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
   * Creates a new Source in a given project and location.
   *
   * @param parent Required. The Source's parent.
   */
  async projectsLocationsSourcesCreate(parent: string, req: Source, opts: ProjectsLocationsSourcesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/sources`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.sourceId !== undefined) {
      url.searchParams.append("sourceId", String(opts.sourceId));
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
   * Creates a new DatacenterConnector in a given Source.
   *
   * @param parent Required. The DatacenterConnector's parent. Required. The Source in where the new DatacenterConnector will be created. For example: `projects/my-project/locations/us-central1/sources/my-source`
   */
  async projectsLocationsSourcesDatacenterConnectorsCreate(parent: string, req: DatacenterConnector, opts: ProjectsLocationsSourcesDatacenterConnectorsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/datacenterConnectors`);
    if (opts.datacenterConnectorId !== undefined) {
      url.searchParams.append("datacenterConnectorId", String(opts.datacenterConnectorId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Deletes a single DatacenterConnector.
   *
   * @param name Required. The DatacenterConnector name.
   */
  async projectsLocationsSourcesDatacenterConnectorsDelete(name: string, opts: ProjectsLocationsSourcesDatacenterConnectorsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single DatacenterConnector.
   *
   * @param name Required. The name of the DatacenterConnector.
   */
  async projectsLocationsSourcesDatacenterConnectorsGet(name: string): Promise<DatacenterConnector> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as DatacenterConnector;
  }

  /**
   * Lists DatacenterConnectors in a given Source.
   *
   * @param parent Required. The parent, which owns this collection of connectors.
   */
  async projectsLocationsSourcesDatacenterConnectorsList(parent: string, opts: ProjectsLocationsSourcesDatacenterConnectorsListOptions = {}): Promise<ListDatacenterConnectorsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/datacenterConnectors`);
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
    return data as ListDatacenterConnectorsResponse;
  }

  /**
   * Upgrades the appliance relate to this DatacenterConnector to the in-place
   * updateable version.
   *
   * @param datacenterConnector Required. The DatacenterConnector name.
   */
  async projectsLocationsSourcesDatacenterConnectorsUpgradeAppliance(datacenterConnector: string, req: UpgradeApplianceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ datacenterConnector }:upgradeAppliance`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a single Source.
   *
   * @param name Required. The Source name.
   */
  async projectsLocationsSourcesDelete(name: string, opts: ProjectsLocationsSourcesDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * List remote source's inventory of VMs. The remote source is the onprem
   * vCenter (remote in the sense it's not in Compute Engine). The inventory
   * describes the list of existing VMs in that source. Note that this operation
   * lists the VMs on the remote source, as opposed to listing the MigratingVms
   * resources in the vmmigration service.
   *
   * @param source Required. The name of the Source.
   */
  async projectsLocationsSourcesFetchInventory(source: string, opts: ProjectsLocationsSourcesFetchInventoryOptions = {}): Promise<FetchInventoryResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ source }:fetchInventory`);
    if (opts.forceRefresh !== undefined) {
      url.searchParams.append("forceRefresh", String(opts.forceRefresh));
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
    return deserializeFetchInventoryResponse(data);
  }

  /**
   * Gets details of a single Source.
   *
   * @param name Required. The Source name.
   */
  async projectsLocationsSourcesGet(name: string): Promise<Source> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Source;
  }

  /**
   * Lists Sources in a given project and location.
   *
   * @param parent Required. The parent, which owns this collection of sources.
   */
  async projectsLocationsSourcesList(parent: string, opts: ProjectsLocationsSourcesListOptions = {}): Promise<ListSourcesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/sources`);
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
    return data as ListSourcesResponse;
  }

  /**
   * Initiates the cancellation of a running clone job.
   *
   * @param name Required. The clone job id
   */
  async projectsLocationsSourcesMigratingVmsCloneJobsCancel(name: string, req: CancelCloneJobRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Initiates a Clone of a specific migrating VM.
   *
   * @param parent Required. The Clone's parent.
   */
  async projectsLocationsSourcesMigratingVmsCloneJobsCreate(parent: string, req: CloneJob, opts: ProjectsLocationsSourcesMigratingVmsCloneJobsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/cloneJobs`);
    if (opts.cloneJobId !== undefined) {
      url.searchParams.append("cloneJobId", String(opts.cloneJobId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Gets details of a single CloneJob.
   *
   * @param name Required. The name of the CloneJob.
   */
  async projectsLocationsSourcesMigratingVmsCloneJobsGet(name: string): Promise<CloneJob> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CloneJob;
  }

  /**
   * Lists CloneJobs of a given migrating VM.
   *
   * @param parent Required. The parent, which owns this collection of source VMs.
   */
  async projectsLocationsSourcesMigratingVmsCloneJobsList(parent: string, opts: ProjectsLocationsSourcesMigratingVmsCloneJobsListOptions = {}): Promise<ListCloneJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/cloneJobs`);
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
    return data as ListCloneJobsResponse;
  }

  /**
   * Creates a new MigratingVm in a given Source.
   *
   * @param parent Required. The MigratingVm's parent.
   */
  async projectsLocationsSourcesMigratingVmsCreate(parent: string, req: MigratingVm, opts: ProjectsLocationsSourcesMigratingVmsCreateOptions = {}): Promise<Operation> {
    req = serializeMigratingVm(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/migratingVms`);
    if (opts.migratingVmId !== undefined) {
      url.searchParams.append("migratingVmId", String(opts.migratingVmId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Initiates the cancellation of a running cutover job.
   *
   * @param name Required. The cutover job id
   */
  async projectsLocationsSourcesMigratingVmsCutoverJobsCancel(name: string, req: CancelCutoverJobRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Initiates a Cutover of a specific migrating VM. The returned LRO is
   * completed when the cutover job resource is created and the job is
   * initiated.
   *
   * @param parent Required. The Cutover's parent.
   */
  async projectsLocationsSourcesMigratingVmsCutoverJobsCreate(parent: string, req: CutoverJob, opts: ProjectsLocationsSourcesMigratingVmsCutoverJobsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/cutoverJobs`);
    if (opts.cutoverJobId !== undefined) {
      url.searchParams.append("cutoverJobId", String(opts.cutoverJobId));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
   * Gets details of a single CutoverJob.
   *
   * @param name Required. The name of the CutoverJob.
   */
  async projectsLocationsSourcesMigratingVmsCutoverJobsGet(name: string): Promise<CutoverJob> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CutoverJob;
  }

  /**
   * Lists CutoverJobs of a given migrating VM.
   *
   * @param parent Required. The parent, which owns this collection of migrating VMs.
   */
  async projectsLocationsSourcesMigratingVmsCutoverJobsList(parent: string, opts: ProjectsLocationsSourcesMigratingVmsCutoverJobsListOptions = {}): Promise<ListCutoverJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/cutoverJobs`);
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
    return data as ListCutoverJobsResponse;
  }

  /**
   * Deletes a single MigratingVm.
   *
   * @param name Required. The name of the MigratingVm.
   */
  async projectsLocationsSourcesMigratingVmsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Marks a migration as completed, deleting migration resources that are no
   * longer being used. Only applicable after cutover is done.
   *
   * @param migratingVm Required. The name of the MigratingVm.
   */
  async projectsLocationsSourcesMigratingVmsFinalizeMigration(migratingVm: string, req: FinalizeMigrationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ migratingVm }:finalizeMigration`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets details of a single MigratingVm.
   *
   * @param name Required. The name of the MigratingVm.
   */
  async projectsLocationsSourcesMigratingVmsGet(name: string, opts: ProjectsLocationsSourcesMigratingVmsGetOptions = {}): Promise<MigratingVm> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMigratingVm(data);
  }

  /**
   * Lists MigratingVms in a given Source.
   *
   * @param parent Required. The parent, which owns this collection of MigratingVms.
   */
  async projectsLocationsSourcesMigratingVmsList(parent: string, opts: ProjectsLocationsSourcesMigratingVmsListOptions = {}): Promise<ListMigratingVmsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/migratingVms`);
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
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListMigratingVmsResponse;
  }

  /**
   * Updates the parameters of a single MigratingVm.
   *
   * @param name Output only. The identifier of the MigratingVm.
   */
  async projectsLocationsSourcesMigratingVmsPatch(name: string, req: MigratingVm, opts: ProjectsLocationsSourcesMigratingVmsPatchOptions = {}): Promise<Operation> {
    req = serializeMigratingVm(req);
    opts = serializeProjectsLocationsSourcesMigratingVmsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
    return data as Operation;
  }

  /**
   * Pauses a migration for a VM. If cycle tasks are running they will be
   * cancelled, preserving source task data. Further replication cycles will not
   * be triggered while the VM is paused.
   *
   * @param migratingVm Required. The name of the MigratingVm.
   */
  async projectsLocationsSourcesMigratingVmsPauseMigration(migratingVm: string, req: PauseMigrationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ migratingVm }:pauseMigration`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets details of a single ReplicationCycle.
   *
   * @param name Required. The name of the ReplicationCycle.
   */
  async projectsLocationsSourcesMigratingVmsReplicationCyclesGet(name: string): Promise<ReplicationCycle> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeReplicationCycle(data);
  }

  /**
   * Lists ReplicationCycles in a given MigratingVM.
   *
   * @param parent Required. The parent, which owns this collection of ReplicationCycles.
   */
  async projectsLocationsSourcesMigratingVmsReplicationCyclesList(parent: string, opts: ProjectsLocationsSourcesMigratingVmsReplicationCyclesListOptions = {}): Promise<ListReplicationCyclesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/replicationCycles`);
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
    return data as ListReplicationCyclesResponse;
  }

  /**
   * Resumes a migration for a VM. When called on a paused migration, will
   * start the process of uploading data and creating snapshots; when called on
   * a completed cut-over migration, will update the migration to active state
   * and start the process of uploading data and creating snapshots.
   *
   * @param migratingVm Required. The name of the MigratingVm.
   */
  async projectsLocationsSourcesMigratingVmsResumeMigration(migratingVm: string, req: ResumeMigrationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ migratingVm }:resumeMigration`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Starts migration for a VM. Starts the process of uploading data and
   * creating snapshots, in replication cycles scheduled by the policy.
   *
   * @param migratingVm Required. The name of the MigratingVm.
   */
  async projectsLocationsSourcesMigratingVmsStartMigration(migratingVm: string, req: StartMigrationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ migratingVm }:startMigration`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates the parameters of a single Source.
   *
   * @param name Output only. The Source name.
   */
  async projectsLocationsSourcesPatch(name: string, req: Source, opts: ProjectsLocationsSourcesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsSourcesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
    return data as Operation;
  }

  /**
   * Creates a new UtilizationReport.
   *
   * @param parent Required. The Utilization Report's parent.
   */
  async projectsLocationsSourcesUtilizationReportsCreate(parent: string, req: UtilizationReport, opts: ProjectsLocationsSourcesUtilizationReportsCreateOptions = {}): Promise<Operation> {
    req = serializeUtilizationReport(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/utilizationReports`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.utilizationReportId !== undefined) {
      url.searchParams.append("utilizationReportId", String(opts.utilizationReportId));
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
   * Deletes a single Utilization Report.
   *
   * @param name Required. The Utilization Report name.
   */
  async projectsLocationsSourcesUtilizationReportsDelete(name: string, opts: ProjectsLocationsSourcesUtilizationReportsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a single Utilization Report.
   *
   * @param name Required. The Utilization Report name.
   */
  async projectsLocationsSourcesUtilizationReportsGet(name: string, opts: ProjectsLocationsSourcesUtilizationReportsGetOptions = {}): Promise<UtilizationReport> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUtilizationReport(data);
  }

  /**
   * Lists Utilization Reports of the given Source.
   *
   * @param parent Required. The Utilization Reports parent.
   */
  async projectsLocationsSourcesUtilizationReportsList(parent: string, opts: ProjectsLocationsSourcesUtilizationReportsListOptions = {}): Promise<ListUtilizationReportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/utilizationReports`);
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
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListUtilizationReportsResponse;
  }

  /**
   * Creates a new TargetProject in a given project. NOTE: TargetProject is a
   * global resource; hence the only supported value for location is `global`.
   *
   * @param parent Required. The TargetProject's parent.
   */
  async projectsLocationsTargetProjectsCreate(parent: string, req: TargetProject, opts: ProjectsLocationsTargetProjectsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/targetProjects`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.targetProjectId !== undefined) {
      url.searchParams.append("targetProjectId", String(opts.targetProjectId));
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
   * Deletes a single TargetProject. NOTE: TargetProject is a global resource;
   * hence the only supported value for location is `global`.
   *
   * @param name Required. The TargetProject name.
   */
  async projectsLocationsTargetProjectsDelete(name: string, opts: ProjectsLocationsTargetProjectsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets details of a single TargetProject. NOTE: TargetProject is a global
   * resource; hence the only supported value for location is `global`.
   *
   * @param name Required. The TargetProject name.
   */
  async projectsLocationsTargetProjectsGet(name: string): Promise<TargetProject> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as TargetProject;
  }

  /**
   * Lists TargetProjects in a given project. NOTE: TargetProject is a global
   * resource; hence the only supported value for location is `global`.
   *
   * @param parent Required. The parent, which owns this collection of targets.
   */
  async projectsLocationsTargetProjectsList(parent: string, opts: ProjectsLocationsTargetProjectsListOptions = {}): Promise<ListTargetProjectsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/targetProjects`);
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
    return data as ListTargetProjectsResponse;
  }

  /**
   * Updates the parameters of a single TargetProject. NOTE: TargetProject is a
   * global resource; hence the only supported value for location is `global`.
   *
   * @param name Output only. The name of the target project.
   */
  async projectsLocationsTargetProjectsPatch(name: string, req: TargetProject, opts: ProjectsLocationsTargetProjectsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsTargetProjectsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
    return data as Operation;
  }
}

/**
 * Message describing AWS Credentials using access key id and secret.
 */
export interface AccessKeyCredentials {
  /**
   * AWS access key ID.
   */
  accessKeyId?: string;
  /**
   * Input only. AWS secret access key.
   */
  secretAccessKey?: string;
}

/**
 * AdaptingOSStep contains specific step details.
 */
export interface AdaptingOSStep {
}

/**
 * Request message for 'AddGroupMigration' request.
 */
export interface AddGroupMigrationRequest {
  /**
   * The full path name of the MigratingVm to add.
   */
  migratingVm?: string;
}

/**
 * Describes an appliance version.
 */
export interface ApplianceVersion {
  /**
   * Determine whether it's critical to upgrade the appliance to this version.
   */
  critical?: boolean;
  /**
   * Link to a page that contains the version release notes.
   */
  releaseNotesUri?: string;
  /**
   * A link for downloading the version.
   */
  uri?: string;
  /**
   * The appliance version.
   */
  version?: string;
}

/**
 * AppliedLicense holds the license data returned by adaptation module report.
 */
export interface AppliedLicense {
  /**
   * The OS license returned from the adaptation module's report.
   */
  osLicense?: string;
  /**
   * The license type that was used in OS adaptation.
   */
  type?:  | "TYPE_UNSPECIFIED" | "NONE" | "PAYG" | "BYOL";
}

/**
 * Holds informatiom about the available versions for upgrade.
 */
export interface AvailableUpdates {
  /**
   * The latest version for in place update. The current appliance can be
   * updated to this version using the API or m4c CLI.
   */
  inPlaceUpdate?: ApplianceVersion;
  /**
   * The newest deployable version of the appliance. The current appliance
   * can't be updated into this version, and the owner must manually deploy this
   * OVA to a new appliance.
   */
  newDeployableAppliance?: ApplianceVersion;
}

/**
 * AwsSecurityGroup describes a security group of an AWS VM.
 */
export interface AwsSecurityGroup {
  /**
   * The AWS security group id.
   */
  id?: string;
  /**
   * The AWS security group name.
   */
  name?: string;
}

/**
 * AwsSourceDetails message describes a specific source details for the AWS
 * source type.
 */
export interface AwsSourceDetails {
  /**
   * AWS Credentials using access key id and secret.
   */
  accessKeyCreds?: AccessKeyCredentials;
  /**
   * Immutable. The AWS region that the source VMs will be migrated from.
   */
  awsRegion?: string;
  /**
   * Output only. Provides details on the state of the Source in case of an
   * error.
   */
  readonly error?: Status;
  /**
   * AWS security group names to limit the scope of the source inventory.
   */
  inventorySecurityGroupNames?: string[];
  /**
   * AWS resource tags to limit the scope of the source inventory.
   */
  inventoryTagList?: Tag[];
  /**
   * User specified tags to add to every M2VM generated resource in AWS. These
   * tags will be set in addition to the default tags that are set as part of
   * the migration process. The tags must not begin with the reserved prefix
   * `m2vm`.
   */
  migrationResourcesUserTags?: {
    [key: string]: string
  };
  /**
   * Output only. The source's public IP. All communication initiated by this
   * source will originate from this IP.
   */
  readonly publicIp?: string;
  /**
   * Output only. State of the source as determined by the health check.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "FAILED" | "ACTIVE";
}

/**
 * Represent the source AWS VM details.
 */
export interface AwsSourceVmDetails {
  /**
   * The total size of the disks being migrated in bytes.
   */
  committedStorageBytes?: bigint;
  /**
   * The firmware type of the source VM.
   */
  firmware?:  | "FIRMWARE_UNSPECIFIED" | "EFI" | "BIOS";
}

function serializeAwsSourceVmDetails(data: any): AwsSourceVmDetails {
  return {
    ...data,
    committedStorageBytes: data["committedStorageBytes"] !== undefined ? String(data["committedStorageBytes"]) : undefined,
  };
}

function deserializeAwsSourceVmDetails(data: any): AwsSourceVmDetails {
  return {
    ...data,
    committedStorageBytes: data["committedStorageBytes"] !== undefined ? BigInt(data["committedStorageBytes"]) : undefined,
  };
}

/**
 * AwsVmDetails describes a VM in AWS.
 */
export interface AwsVmDetails {
  /**
   * The CPU architecture.
   */
  architecture?:  | "VM_ARCHITECTURE_UNSPECIFIED" | "I386" | "X86_64" | "ARM64" | "X86_64_MAC";
  /**
   * The VM Boot Option.
   */
  bootOption?:  | "BOOT_OPTION_UNSPECIFIED" | "EFI" | "BIOS";
  /**
   * The total size of the storage allocated to the VM in MB.
   */
  committedStorageMb?: bigint;
  /**
   * The number of cpus the VM has.
   */
  cpuCount?: number;
  /**
   * The number of disks the VM has.
   */
  diskCount?: number;
  /**
   * The display name of the VM. Note that this value is not necessarily
   * unique.
   */
  displayName?: string;
  /**
   * The instance type of the VM.
   */
  instanceType?: string;
  /**
   * The memory size of the VM in MB.
   */
  memoryMb?: number;
  /**
   * The VM's OS.
   */
  osDescription?: string;
  /**
   * Output only. The power state of the VM at the moment list was taken.
   */
  readonly powerState?:  | "POWER_STATE_UNSPECIFIED" | "ON" | "OFF" | "SUSPENDED" | "PENDING";
  /**
   * The security groups the VM belongs to.
   */
  securityGroups?: AwsSecurityGroup[];
  /**
   * The descriptive name of the AWS's source this VM is connected to.
   */
  sourceDescription?: string;
  /**
   * The id of the AWS's source this VM is connected to.
   */
  sourceId?: string;
  /**
   * The tags of the VM.
   */
  tags?: {
    [key: string]: string
  };
  /**
   * The virtualization type.
   */
  virtualizationType?:  | "VM_VIRTUALIZATION_TYPE_UNSPECIFIED" | "HVM" | "PARAVIRTUAL";
  /**
   * The VM ID in AWS.
   */
  vmId?: string;
  /**
   * The VPC ID the VM belongs to.
   */
  vpcId?: string;
  /**
   * The AWS zone of the VM.
   */
  zone?: string;
}

function serializeAwsVmDetails(data: any): AwsVmDetails {
  return {
    ...data,
    committedStorageMb: data["committedStorageMb"] !== undefined ? String(data["committedStorageMb"]) : undefined,
  };
}

function deserializeAwsVmDetails(data: any): AwsVmDetails {
  return {
    ...data,
    committedStorageMb: data["committedStorageMb"] !== undefined ? BigInt(data["committedStorageMb"]) : undefined,
  };
}

/**
 * AWSVmsDetails describes VMs in AWS.
 */
export interface AwsVmsDetails {
  /**
   * The details of the AWS VMs.
   */
  details?: AwsVmDetails[];
}

function serializeAwsVmsDetails(data: any): AwsVmsDetails {
  return {
    ...data,
    details: data["details"] !== undefined ? data["details"].map((item: any) => (serializeAwsVmDetails(item))) : undefined,
  };
}

function deserializeAwsVmsDetails(data: any): AwsVmsDetails {
  return {
    ...data,
    details: data["details"] !== undefined ? data["details"].map((item: any) => (deserializeAwsVmDetails(item))) : undefined,
  };
}

/**
 * Request message for 'CancelCloneJob' request.
 */
export interface CancelCloneJobRequest {
}

/**
 * Request message for 'CancelCutoverJob' request.
 */
export interface CancelCutoverJobRequest {
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * CloneJob describes the process of creating a clone of a MigratingVM to the
 * requested target based on the latest successful uploaded snapshots. While the
 * migration cycles of a MigratingVm take place, it is possible to verify the
 * uploaded VM can be started in the cloud, by creating a clone. The clone can
 * be created without any downtime, and it is created using the latest snapshots
 * which are already in the cloud. The cloneJob is only responsible for its
 * work, not its products, which means once it is finished, it will never touch
 * the instance it created. It will only delete it in case of the CloneJob being
 * cancelled or upon failure to clone.
 */
export interface CloneJob {
  /**
   * Output only. Details of the target VM in Compute Engine.
   */
  readonly computeEngineTargetDetails?: ComputeEngineTargetDetails;
  /**
   * Output only. The time the clone job was created (as an API call, not when
   * it was actually created in the target).
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the clone job was ended.
   */
  readonly endTime?: Date;
  /**
   * Output only. Provides details for the errors that led to the Clone Job's
   * state.
   */
  readonly error?: Status;
  /**
   * Output only. The name of the clone.
   */
  readonly name?: string;
  /**
   * Output only. State of the clone job.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "ACTIVE" | "FAILED" | "SUCCEEDED" | "CANCELLED" | "CANCELLING" | "ADAPTING_OS";
  /**
   * Output only. The time the state was last updated.
   */
  readonly stateTime?: Date;
  /**
   * Output only. The clone steps list representing its progress.
   */
  readonly steps?: CloneStep[];
}

/**
 * CloneStep holds information about the clone step progress.
 */
export interface CloneStep {
  /**
   * Adapting OS step.
   */
  adaptingOs?: AdaptingOSStep;
  /**
   * The time the step has ended.
   */
  endTime?: Date;
  /**
   * Instantiating migrated VM step.
   */
  instantiatingMigratedVm?: InstantiatingMigratedVMStep;
  /**
   * Preparing VM disks step.
   */
  preparingVmDisks?: PreparingVMDisksStep;
  /**
   * The time the step has started.
   */
  startTime?: Date;
}

function serializeCloneStep(data: any): CloneStep {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeCloneStep(data: any): CloneStep {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * ComputeEngineTargetDefaults is a collection of details for creating a VM in
 * a target Compute Engine project.
 */
export interface ComputeEngineTargetDefaults {
  /**
   * Additional licenses to assign to the VM.
   */
  additionalLicenses?: string[];
  /**
   * Output only. The OS license returned from the adaptation module report.
   */
  readonly appliedLicense?: AppliedLicense;
  /**
   * Output only. The VM Boot Option, as set in the source vm.
   */
  readonly bootOption?:  | "COMPUTE_ENGINE_BOOT_OPTION_UNSPECIFIED" | "COMPUTE_ENGINE_BOOT_OPTION_EFI" | "COMPUTE_ENGINE_BOOT_OPTION_BIOS";
  /**
   * Compute instance scheduling information (if empty default is used).
   */
  computeScheduling?: ComputeScheduling;
  /**
   * The disk type to use in the VM.
   */
  diskType?:  | "COMPUTE_ENGINE_DISK_TYPE_UNSPECIFIED" | "COMPUTE_ENGINE_DISK_TYPE_STANDARD" | "COMPUTE_ENGINE_DISK_TYPE_SSD" | "COMPUTE_ENGINE_DISK_TYPE_BALANCED";
  /**
   * The hostname to assign to the VM.
   */
  hostname?: string;
  /**
   * A map of labels to associate with the VM.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The license type to use in OS adaptation.
   */
  licenseType?:  | "COMPUTE_ENGINE_LICENSE_TYPE_DEFAULT" | "COMPUTE_ENGINE_LICENSE_TYPE_PAYG" | "COMPUTE_ENGINE_LICENSE_TYPE_BYOL";
  /**
   * The machine type to create the VM with.
   */
  machineType?: string;
  /**
   * The machine type series to create the VM with.
   */
  machineTypeSeries?: string;
  /**
   * The metadata key/value pairs to assign to the VM.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * List of NICs connected to this VM.
   */
  networkInterfaces?: NetworkInterface[];
  /**
   * A map of network tags to associate with the VM.
   */
  networkTags?: string[];
  /**
   * Defines whether the instance has Secure Boot enabled. This can be set to
   * true only if the vm boot option is EFI.
   */
  secureBoot?: boolean;
  /**
   * The service account to associate the VM with.
   */
  serviceAccount?: string;
  /**
   * The full path of the resource of type TargetProject which represents the
   * Compute Engine project in which to create this VM.
   */
  targetProject?: string;
  /**
   * The name of the VM to create.
   */
  vmName?: string;
  /**
   * The zone in which to create the VM.
   */
  zone?: string;
}

/**
 * ComputeEngineTargetDetails is a collection of details for creating a VM in a
 * target Compute Engine project.
 */
export interface ComputeEngineTargetDetails {
  /**
   * Additional licenses to assign to the VM.
   */
  additionalLicenses?: string[];
  /**
   * The OS license returned from the adaptation module report.
   */
  appliedLicense?: AppliedLicense;
  /**
   * The VM Boot Option, as set in the source vm.
   */
  bootOption?:  | "COMPUTE_ENGINE_BOOT_OPTION_UNSPECIFIED" | "COMPUTE_ENGINE_BOOT_OPTION_EFI" | "COMPUTE_ENGINE_BOOT_OPTION_BIOS";
  /**
   * Compute instance scheduling information (if empty default is used).
   */
  computeScheduling?: ComputeScheduling;
  /**
   * The disk type to use in the VM.
   */
  diskType?:  | "COMPUTE_ENGINE_DISK_TYPE_UNSPECIFIED" | "COMPUTE_ENGINE_DISK_TYPE_STANDARD" | "COMPUTE_ENGINE_DISK_TYPE_SSD" | "COMPUTE_ENGINE_DISK_TYPE_BALANCED";
  /**
   * The hostname to assign to the VM.
   */
  hostname?: string;
  /**
   * A map of labels to associate with the VM.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The license type to use in OS adaptation.
   */
  licenseType?:  | "COMPUTE_ENGINE_LICENSE_TYPE_DEFAULT" | "COMPUTE_ENGINE_LICENSE_TYPE_PAYG" | "COMPUTE_ENGINE_LICENSE_TYPE_BYOL";
  /**
   * The machine type to create the VM with.
   */
  machineType?: string;
  /**
   * The machine type series to create the VM with.
   */
  machineTypeSeries?: string;
  /**
   * The metadata key/value pairs to assign to the VM.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * List of NICs connected to this VM.
   */
  networkInterfaces?: NetworkInterface[];
  /**
   * A map of network tags to associate with the VM.
   */
  networkTags?: string[];
  /**
   * The Google Cloud target project ID or project name.
   */
  project?: string;
  /**
   * Defines whether the instance has Secure Boot enabled. This can be set to
   * true only if the vm boot option is EFI.
   */
  secureBoot?: boolean;
  /**
   * The service account to associate the VM with.
   */
  serviceAccount?: string;
  /**
   * The name of the VM to create.
   */
  vmName?: string;
  /**
   * The zone in which to create the VM.
   */
  zone?: string;
}

/**
 * Scheduling information for VM on maintenance/restart behaviour and node
 * allocation in sole tenant nodes.
 */
export interface ComputeScheduling {
  /**
   * The minimum number of virtual CPUs this instance will consume when running
   * on a sole-tenant node. Ignored if no node_affinites are configured.
   */
  minNodeCpus?: number;
  /**
   * A set of node affinity and anti-affinity configurations for sole tenant
   * nodes.
   */
  nodeAffinities?: SchedulingNodeAffinity[];
  /**
   * How the instance should behave when the host machine undergoes maintenance
   * that may temporarily impact instance performance.
   */
  onHostMaintenance?:  | "ON_HOST_MAINTENANCE_UNSPECIFIED" | "TERMINATE" | "MIGRATE";
  /**
   * Whether the Instance should be automatically restarted whenever it is
   * terminated by Compute Engine (not terminated by user). This configuration
   * is identical to `automaticRestart` field in Compute Engine create instance
   * under scheduling. It was changed to an enum (instead of a boolean) to match
   * the default value in Compute Engine which is automatic restart.
   */
  restartType?:  | "RESTART_TYPE_UNSPECIFIED" | "AUTOMATIC_RESTART" | "NO_AUTOMATIC_RESTART";
}

/**
 * CutoverJob message describes a cutover of a migrating VM. The CutoverJob is
 * the operation of shutting down the VM, creating a snapshot and clonning the
 * VM using the replicated snapshot.
 */
export interface CutoverJob {
  /**
   * Output only. Details of the target VM in Compute Engine.
   */
  readonly computeEngineTargetDetails?: ComputeEngineTargetDetails;
  /**
   * Output only. The time the cutover job was created (as an API call, not
   * when it was actually created in the target).
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the cutover job had finished.
   */
  readonly endTime?: Date;
  /**
   * Output only. Provides details for the errors that led to the Cutover Job's
   * state.
   */
  readonly error?: Status;
  /**
   * Output only. The name of the cutover job.
   */
  readonly name?: string;
  /**
   * Output only. The current progress in percentage of the cutover job.
   */
  readonly progressPercent?: number;
  /**
   * Output only. State of the cutover job.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "FAILED" | "SUCCEEDED" | "CANCELLED" | "CANCELLING" | "ACTIVE" | "ADAPTING_OS";
  /**
   * Output only. A message providing possible extra details about the current
   * state.
   */
  readonly stateMessage?: string;
  /**
   * Output only. The time the state was last updated.
   */
  readonly stateTime?: Date;
  /**
   * Output only. The cutover steps list representing its progress.
   */
  readonly steps?: CutoverStep[];
}

/**
 * CutoverStep holds information about the cutover step progress.
 */
export interface CutoverStep {
  /**
   * The time the step has ended.
   */
  endTime?: Date;
  /**
   * Final sync step.
   */
  finalSync?: ReplicationCycle;
  /**
   * Instantiating migrated VM step.
   */
  instantiatingMigratedVm?: InstantiatingMigratedVMStep;
  /**
   * Preparing VM disks step.
   */
  preparingVmDisks?: PreparingVMDisksStep;
  /**
   * A replication cycle prior cutover step.
   */
  previousReplicationCycle?: ReplicationCycle;
  /**
   * Shutting down VM step.
   */
  shuttingDownSourceVm?: ShuttingDownSourceVMStep;
  /**
   * The time the step has started.
   */
  startTime?: Date;
}

function serializeCutoverStep(data: any): CutoverStep {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    finalSync: data["finalSync"] !== undefined ? serializeReplicationCycle(data["finalSync"]) : undefined,
    previousReplicationCycle: data["previousReplicationCycle"] !== undefined ? serializeReplicationCycle(data["previousReplicationCycle"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeCutoverStep(data: any): CutoverStep {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    finalSync: data["finalSync"] !== undefined ? deserializeReplicationCycle(data["finalSync"]) : undefined,
    previousReplicationCycle: data["previousReplicationCycle"] !== undefined ? deserializeReplicationCycle(data["previousReplicationCycle"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * CycleStep holds information about a step progress.
 */
export interface CycleStep {
  /**
   * The time the cycle step has ended.
   */
  endTime?: Date;
  /**
   * Initializing replication step.
   */
  initializingReplication?: InitializingReplicationStep;
  /**
   * Post processing step.
   */
  postProcessing?: PostProcessingStep;
  /**
   * Replicating step.
   */
  replicating?: ReplicatingStep;
  /**
   * The time the cycle step has started.
   */
  startTime?: Date;
}

function serializeCycleStep(data: any): CycleStep {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    replicating: data["replicating"] !== undefined ? serializeReplicatingStep(data["replicating"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeCycleStep(data: any): CycleStep {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    replicating: data["replicating"] !== undefined ? deserializeReplicatingStep(data["replicating"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * DatacenterConnector message describes a connector between the Source and
 * Google Cloud, which is installed on a vmware datacenter (an OVA vm installed
 * by the user) to connect the Datacenter to Google Cloud and support vm
 * migration data transfer.
 */
export interface DatacenterConnector {
  /**
   * Output only. Appliance OVA version. This is the OVA which is manually
   * installed by the user and contains the infrastructure for the automatically
   * updatable components on the appliance.
   */
  readonly applianceInfrastructureVersion?: string;
  /**
   * Output only. Appliance last installed update bundle version. This is the
   * version of the automatically updatable components on the appliance.
   */
  readonly applianceSoftwareVersion?: string;
  /**
   * Output only. The available versions for updating this appliance.
   */
  readonly availableVersions?: AvailableUpdates;
  /**
   * Output only. The communication channel between the datacenter connector
   * and Google Cloud.
   */
  readonly bucket?: string;
  /**
   * Output only. The time the connector was created (as an API call, not when
   * it was actually installed).
   */
  readonly createTime?: Date;
  /**
   * Output only. Provides details on the state of the Datacenter Connector in
   * case of an error.
   */
  readonly error?: Status;
  /**
   * Output only. The connector's name.
   */
  readonly name?: string;
  /**
   * Immutable. A unique key for this connector. This key is internal to the
   * OVA connector and is supplied with its creation during the registration
   * process and can not be modified.
   */
  registrationId?: string;
  /**
   * The service account to use in the connector when communicating with the
   * cloud.
   */
  serviceAccount?: string;
  /**
   * Output only. State of the DatacenterConnector, as determined by the health
   * checks.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "OFFLINE" | "FAILED" | "ACTIVE";
  /**
   * Output only. The time the state was last set.
   */
  readonly stateTime?: Date;
  /**
   * Output only. The last time the connector was updated with an API call.
   */
  readonly updateTime?: Date;
  /**
   * Output only. The status of the current / last upgradeAppliance operation.
   */
  readonly upgradeStatus?: UpgradeStatus;
  /**
   * The version running in the DatacenterConnector. This is supplied by the
   * OVA connector during the registration process and can not be modified.
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
 * Response message for fetchInventory.
 */
export interface FetchInventoryResponse {
  /**
   * The description of the VMs in a Source of type AWS.
   */
  awsVms?: AwsVmsDetails;
  /**
   * Output only. A token, which can be sent as `page_token` to retrieve the
   * next page. If this field is omitted, there are no subsequent pages.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. The timestamp when the source was last queried (if the result
   * is from the cache).
   */
  readonly updateTime?: Date;
  /**
   * The description of the VMs in a Source of type Vmware.
   */
  vmwareVms?: VmwareVmsDetails;
}

function serializeFetchInventoryResponse(data: any): FetchInventoryResponse {
  return {
    ...data,
    awsVms: data["awsVms"] !== undefined ? serializeAwsVmsDetails(data["awsVms"]) : undefined,
    vmwareVms: data["vmwareVms"] !== undefined ? serializeVmwareVmsDetails(data["vmwareVms"]) : undefined,
  };
}

function deserializeFetchInventoryResponse(data: any): FetchInventoryResponse {
  return {
    ...data,
    awsVms: data["awsVms"] !== undefined ? deserializeAwsVmsDetails(data["awsVms"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    vmwareVms: data["vmwareVms"] !== undefined ? deserializeVmwareVmsDetails(data["vmwareVms"]) : undefined,
  };
}

/**
 * Request message for 'FinalizeMigration' request.
 */
export interface FinalizeMigrationRequest {
}

/**
 * Describes message for 'Group' resource. The Group is a collections of
 * several MigratingVms.
 */
export interface Group {
  /**
   * Output only. The create time timestamp.
   */
  readonly createTime?: Date;
  /**
   * User-provided description of the group.
   */
  description?: string;
  /**
   * Display name is a user defined name for this group which can be updated.
   */
  displayName?: string;
  /**
   * Output only. The Group name.
   */
  readonly name?: string;
  /**
   * Output only. The update time timestamp.
   */
  readonly updateTime?: Date;
}

/**
 * InitializingReplicationStep contains specific step details.
 */
export interface InitializingReplicationStep {
}

/**
 * InstantiatingMigratedVMStep contains specific step details.
 */
export interface InstantiatingMigratedVMStep {
}

/**
 * Describes a URL link.
 */
export interface Link {
  /**
   * Describes what the link offers.
   */
  description?: string;
  /**
   * The URL of the link.
   */
  url?: string;
}

/**
 * Response message for 'ListCloneJobs' request.
 */
export interface ListCloneJobsResponse {
  /**
   * Output only. The list of clone jobs response.
   */
  readonly cloneJobs?: CloneJob[];
  /**
   * Output only. A token, which can be sent as `page_token` to retrieve the
   * next page. If this field is omitted, there are no subsequent pages.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. Locations that could not be reached.
   */
  readonly unreachable?: string[];
}

/**
 * Response message for 'ListCutoverJobs' request.
 */
export interface ListCutoverJobsResponse {
  /**
   * Output only. The list of cutover jobs response.
   */
  readonly cutoverJobs?: CutoverJob[];
  /**
   * Output only. A token, which can be sent as `page_token` to retrieve the
   * next page. If this field is omitted, there are no subsequent pages.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. Locations that could not be reached.
   */
  readonly unreachable?: string[];
}

/**
 * Response message for 'ListDatacenterConnectors' request.
 */
export interface ListDatacenterConnectorsResponse {
  /**
   * Output only. The list of sources response.
   */
  readonly datacenterConnectors?: DatacenterConnector[];
  /**
   * Output only. A token, which can be sent as `page_token` to retrieve the
   * next page. If this field is omitted, there are no subsequent pages.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. Locations that could not be reached.
   */
  readonly unreachable?: string[];
}

/**
 * Response message for 'ListGroups' request.
 */
export interface ListGroupsResponse {
  /**
   * Output only. The list of groups response.
   */
  readonly groups?: Group[];
  /**
   * Output only. A token, which can be sent as `page_token` to retrieve the
   * next page. If this field is omitted, there are no subsequent pages.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. Locations that could not be reached.
   */
  readonly unreachable?: string[];
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
 * Response message for 'ListMigratingVms' request.
 */
export interface ListMigratingVmsResponse {
  /**
   * Output only. The list of Migrating VMs response.
   */
  readonly migratingVms?: MigratingVm[];
  /**
   * Output only. A token, which can be sent as `page_token` to retrieve the
   * next page. If this field is omitted, there are no subsequent pages.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. Locations that could not be reached.
   */
  readonly unreachable?: string[];
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
 * Response message for 'ListReplicationCycles' request.
 */
export interface ListReplicationCyclesResponse {
  /**
   * Output only. A token, which can be sent as `page_token` to retrieve the
   * next page. If this field is omitted, there are no subsequent pages.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. The list of replication cycles response.
   */
  readonly replicationCycles?: ReplicationCycle[];
  /**
   * Output only. Locations that could not be reached.
   */
  readonly unreachable?: string[];
}

/**
 * Response message for 'ListSources' request.
 */
export interface ListSourcesResponse {
  /**
   * Output only. A token, which can be sent as `page_token` to retrieve the
   * next page. If this field is omitted, there are no subsequent pages.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. The list of sources response.
   */
  readonly sources?: Source[];
  /**
   * Output only. Locations that could not be reached.
   */
  readonly unreachable?: string[];
}

/**
 * Response message for 'ListTargetProjects' call.
 */
export interface ListTargetProjectsResponse {
  /**
   * Output only. A token, which can be sent as `page_token` to retrieve the
   * next page. If this field is omitted, there are no subsequent pages.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. The list of target response.
   */
  readonly targetProjects?: TargetProject[];
  /**
   * Output only. Locations that could not be reached.
   */
  readonly unreachable?: string[];
}

/**
 * Response message for 'ListUtilizationReports' request.
 */
export interface ListUtilizationReportsResponse {
  /**
   * Output only. A token, which can be sent as `page_token` to retrieve the
   * next page. If this field is omitted, there are no subsequent pages.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. Locations that could not be reached.
   */
  readonly unreachable?: string[];
  /**
   * Output only. The list of reports.
   */
  readonly utilizationReports?: UtilizationReport[];
}

/**
 * Provides a localized error message that is safe to return to the user which
 * can be attached to an RPC error.
 */
export interface LocalizedMessage {
  /**
   * The locale used following the specification defined at
   * https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US",
   * "fr-CH", "es-MX"
   */
  locale?: string;
  /**
   * The localized error message in the above locale.
   */
  message?: string;
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
 * MigratingVm describes the VM that will be migrated from a Source environment
 * and its replication state.
 */
export interface MigratingVm {
  /**
   * Output only. Details of the VM from an AWS source.
   */
  readonly awsSourceVmDetails?: AwsSourceVmDetails;
  /**
   * Details of the target VM in Compute Engine.
   */
  computeEngineTargetDefaults?: ComputeEngineTargetDefaults;
  /**
   * Output only. The time the migrating VM was created (this refers to this
   * resource and not to the time it was installed in the source).
   */
  readonly createTime?: Date;
  /**
   * Output only. Details of the current running replication cycle.
   */
  readonly currentSyncInfo?: ReplicationCycle;
  /**
   * The description attached to the migrating VM by the user.
   */
  description?: string;
  /**
   * The display name attached to the MigratingVm by the user.
   */
  displayName?: string;
  /**
   * Output only. Provides details on the state of the Migrating VM in case of
   * an error in replication.
   */
  readonly error?: Status;
  /**
   * Output only. The group this migrating vm is included in, if any. The group
   * is represented by the full path of the appropriate Group resource.
   */
  readonly group?: string;
  /**
   * The labels of the migrating VM.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. Details of the last replication cycle. This will be updated
   * whenever a replication cycle is finished and is not to be confused with
   * last_sync which is only updated on successful replication cycles.
   */
  readonly lastReplicationCycle?: ReplicationCycle;
  /**
   * Output only. The most updated snapshot created time in the source that
   * finished replication.
   */
  readonly lastSync?: ReplicationSync;
  /**
   * Output only. The identifier of the MigratingVm.
   */
  readonly name?: string;
  /**
   * The replication schedule policy.
   */
  policy?: SchedulePolicy;
  /**
   * Output only. The recent clone jobs performed on the migrating VM. This
   * field holds the vm's last completed clone job and the vm's running clone
   * job, if one exists. Note: To have this field populated you need to
   * explicitly request it via the "view" parameter of the Get/List request.
   */
  readonly recentCloneJobs?: CloneJob[];
  /**
   * Output only. The recent cutover jobs performed on the migrating VM. This
   * field holds the vm's last completed cutover job and the vm's running
   * cutover job, if one exists. Note: To have this field populated you need to
   * explicitly request it via the "view" parameter of the Get/List request.
   */
  readonly recentCutoverJobs?: CutoverJob[];
  /**
   * The unique ID of the VM in the source. The VM's name in vSphere can be
   * changed, so this is not the VM's name but rather its moRef id. This id is
   * of the form vm-.
   */
  sourceVmId?: string;
  /**
   * Output only. State of the MigratingVm.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "READY" | "FIRST_SYNC" | "ACTIVE" | "CUTTING_OVER" | "CUTOVER" | "FINAL_SYNC" | "PAUSED" | "FINALIZING" | "FINALIZED" | "ERROR";
  /**
   * Output only. The last time the migrating VM state was updated.
   */
  readonly stateTime?: Date;
  /**
   * Output only. The last time the migrating VM resource was updated.
   */
  readonly updateTime?: Date;
}

function serializeMigratingVm(data: any): MigratingVm {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializeSchedulePolicy(data["policy"]) : undefined,
  };
}

function deserializeMigratingVm(data: any): MigratingVm {
  return {
    ...data,
    awsSourceVmDetails: data["awsSourceVmDetails"] !== undefined ? deserializeAwsSourceVmDetails(data["awsSourceVmDetails"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    currentSyncInfo: data["currentSyncInfo"] !== undefined ? deserializeReplicationCycle(data["currentSyncInfo"]) : undefined,
    lastReplicationCycle: data["lastReplicationCycle"] !== undefined ? deserializeReplicationCycle(data["lastReplicationCycle"]) : undefined,
    lastSync: data["lastSync"] !== undefined ? deserializeReplicationSync(data["lastSync"]) : undefined,
    policy: data["policy"] !== undefined ? deserializeSchedulePolicy(data["policy"]) : undefined,
    stateTime: data["stateTime"] !== undefined ? new Date(data["stateTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Represents migration resource error information that can be used with
 * google.rpc.Status message. MigrationError is used to present the user with
 * error information in migration operations.
 */
export interface MigrationError {
  /**
   * Output only. Suggested action for solving the error.
   */
  readonly actionItem?: LocalizedMessage;
  /**
   * Output only. The error code.
   */
  readonly code?:  | "ERROR_CODE_UNSPECIFIED" | "UNKNOWN_ERROR" | "SOURCE_VALIDATION_ERROR" | "SOURCE_REPLICATION_ERROR" | "TARGET_REPLICATION_ERROR" | "OS_ADAPTATION_ERROR" | "CLONE_ERROR" | "CUTOVER_ERROR" | "UTILIZATION_REPORT_ERROR" | "APPLIANCE_UPGRADE_ERROR";
  /**
   * Output only. The localized error message.
   */
  readonly errorMessage?: LocalizedMessage;
  /**
   * Output only. The time the error occurred.
   */
  readonly errorTime?: Date;
  /**
   * Output only. URL(s) pointing to additional information on handling the
   * current error.
   */
  readonly helpLinks?: Link[];
}

/**
 * Represents migration resource warning information that can be used with
 * google.rpc.Status message. MigrationWarning is used to present the user with
 * warning information in migration operations.
 */
export interface MigrationWarning {
  /**
   * Suggested action for solving the warning.
   */
  actionItem?: LocalizedMessage;
  /**
   * The warning code.
   */
  code?:  | "WARNING_CODE_UNSPECIFIED" | "ADAPTATION_WARNING";
  /**
   * URL(s) pointing to additional information on handling the current warning.
   */
  helpLinks?: Link[];
  /**
   * The localized warning message.
   */
  warningMessage?: LocalizedMessage;
  /**
   * The time the warning occurred.
   */
  warningTime?: Date;
}

function serializeMigrationWarning(data: any): MigrationWarning {
  return {
    ...data,
    warningTime: data["warningTime"] !== undefined ? data["warningTime"].toISOString() : undefined,
  };
}

function deserializeMigrationWarning(data: any): MigrationWarning {
  return {
    ...data,
    warningTime: data["warningTime"] !== undefined ? new Date(data["warningTime"]) : undefined,
  };
}

/**
 * NetworkInterface represents a NIC of a VM.
 */
export interface NetworkInterface {
  /**
   * The external IP to define in the NIC.
   */
  externalIp?: string;
  /**
   * The internal IP to define in the NIC. The formats accepted are:
   * `ephemeral` \ ipv4 address \ a named address resource full path.
   */
  internalIp?: string;
  /**
   * The network to connect the NIC to.
   */
  network?: string;
  /**
   * The subnetwork to connect the NIC to.
   */
  subnetwork?: string;
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
   * Output only. Human-readable status of the operation, if any.
   */
  readonly statusMessage?: string;
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
 * Request message for 'PauseMigration' request.
 */
export interface PauseMigrationRequest {
}

/**
 * PostProcessingStep contains specific step details.
 */
export interface PostProcessingStep {
}

/**
 * PreparingVMDisksStep contains specific step details.
 */
export interface PreparingVMDisksStep {
}

/**
 * Additional options for VMMigration#projectsLocationsGroupsCreate.
 */
export interface ProjectsLocationsGroupsCreateOptions {
  /**
   * Required. The group identifier.
   */
  groupId?: string;
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes since the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for VMMigration#projectsLocationsGroupsDelete.
 */
export interface ProjectsLocationsGroupsDeleteOptions {
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes after the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for VMMigration#projectsLocationsGroupsList.
 */
export interface ProjectsLocationsGroupsListOptions {
  /**
   * Optional. The filter request.
   */
  filter?: string;
  /**
   * Optional. the order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of groups to return. The service may return
   * fewer than this value. If unspecified, at most 500 groups will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Required. A page token, received from a previous `ListGroups` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListGroups` must match the call that provided the
   * page token.
   */
  pageToken?: string;
}

/**
 * Additional options for VMMigration#projectsLocationsGroupsPatch.
 */
export interface ProjectsLocationsGroupsPatchOptions {
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes since the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Field mask is used to specify the fields to be overwritten in the Group
   * resource by the update. The fields specified in the update_mask are
   * relative to the resource, not the full request. A field will be overwritten
   * if it is in the mask. If the user does not provide a mask then all fields
   * will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsGroupsPatchOptions(data: any): ProjectsLocationsGroupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsGroupsPatchOptions(data: any): ProjectsLocationsGroupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for VMMigration#projectsLocationsList.
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
 * Additional options for VMMigration#projectsLocationsOperationsList.
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
 * Additional options for VMMigration#projectsLocationsSourcesCreate.
 */
export interface ProjectsLocationsSourcesCreateOptions {
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes since the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. The source identifier.
   */
  sourceId?: string;
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesDatacenterConnectorsCreate.
 */
export interface ProjectsLocationsSourcesDatacenterConnectorsCreateOptions {
  /**
   * Required. The datacenterConnector identifier.
   */
  datacenterConnectorId?: string;
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes since the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesDatacenterConnectorsDelete.
 */
export interface ProjectsLocationsSourcesDatacenterConnectorsDeleteOptions {
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes after the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesDatacenterConnectorsList.
 */
export interface ProjectsLocationsSourcesDatacenterConnectorsListOptions {
  /**
   * Optional. The filter request.
   */
  filter?: string;
  /**
   * Optional. the order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of connectors to return. The service may
   * return fewer than this value. If unspecified, at most 500 sources will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * Required. A page token, received from a previous
   * `ListDatacenterConnectors` call. Provide this to retrieve the subsequent
   * page. When paginating, all other parameters provided to
   * `ListDatacenterConnectors` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for VMMigration#projectsLocationsSourcesDelete.
 */
export interface ProjectsLocationsSourcesDeleteOptions {
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes after the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for VMMigration#projectsLocationsSourcesFetchInventory.
 */
export interface ProjectsLocationsSourcesFetchInventoryOptions {
  /**
   * If this flag is set to true, the source will be queried instead of using
   * cached results. Using this flag will make the call slower.
   */
  forceRefresh?: boolean;
  /**
   * The maximum number of VMs to return. The service may return fewer than
   * this value. For AWS source: If unspecified, at most 500 VMs will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000. For VMWare source: If unspecified, all VMs will be returned. There is
   * no limit for maximum value.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `FetchInventory` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `FetchInventory` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for VMMigration#projectsLocationsSourcesList.
 */
export interface ProjectsLocationsSourcesListOptions {
  /**
   * Optional. The filter request.
   */
  filter?: string;
  /**
   * Optional. the order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of sources to return. The service may return
   * fewer than this value. If unspecified, at most 500 sources will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * Required. A page token, received from a previous `ListSources` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListSources` must match the call that provided the
   * page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesMigratingVmsCloneJobsCreate.
 */
export interface ProjectsLocationsSourcesMigratingVmsCloneJobsCreateOptions {
  /**
   * Required. The clone job identifier.
   */
  cloneJobId?: string;
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes since the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesMigratingVmsCloneJobsList.
 */
export interface ProjectsLocationsSourcesMigratingVmsCloneJobsListOptions {
  /**
   * Optional. The filter request.
   */
  filter?: string;
  /**
   * Optional. the order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of clone jobs to return. The service may
   * return fewer than this value. If unspecified, at most 500 clone jobs will
   * be returned. The maximum value is 1000; values above 1000 will be coerced
   * to 1000.
   */
  pageSize?: number;
  /**
   * Required. A page token, received from a previous `ListCloneJobs` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListCloneJobs` must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesMigratingVmsCreate.
 */
export interface ProjectsLocationsSourcesMigratingVmsCreateOptions {
  /**
   * Required. The migratingVm identifier.
   */
  migratingVmId?: string;
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes since the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesMigratingVmsCutoverJobsCreate.
 */
export interface ProjectsLocationsSourcesMigratingVmsCutoverJobsCreateOptions {
  /**
   * Required. The cutover job identifier.
   */
  cutoverJobId?: string;
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes since the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesMigratingVmsCutoverJobsList.
 */
export interface ProjectsLocationsSourcesMigratingVmsCutoverJobsListOptions {
  /**
   * Optional. The filter request.
   */
  filter?: string;
  /**
   * Optional. the order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of cutover jobs to return. The service may
   * return fewer than this value. If unspecified, at most 500 cutover jobs will
   * be returned. The maximum value is 1000; values above 1000 will be coerced
   * to 1000.
   */
  pageSize?: number;
  /**
   * Required. A page token, received from a previous `ListCutoverJobs` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListCutoverJobs` must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for VMMigration#projectsLocationsSourcesMigratingVmsGet.
 */
export interface ProjectsLocationsSourcesMigratingVmsGetOptions {
  /**
   * Optional. The level of details of the migrating VM.
   */
  view?:  | "MIGRATING_VM_VIEW_UNSPECIFIED" | "MIGRATING_VM_VIEW_BASIC" | "MIGRATING_VM_VIEW_FULL";
}

/**
 * Additional options for VMMigration#projectsLocationsSourcesMigratingVmsList.
 */
export interface ProjectsLocationsSourcesMigratingVmsListOptions {
  /**
   * Optional. The filter request.
   */
  filter?: string;
  /**
   * Optional. the order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of migrating VMs to return. The service may
   * return fewer than this value. If unspecified, at most 500 migrating VMs
   * will be returned. The maximum value is 1000; values above 1000 will be
   * coerced to 1000.
   */
  pageSize?: number;
  /**
   * Required. A page token, received from a previous `ListMigratingVms` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListMigratingVms` must match the call that provided
   * the page token.
   */
  pageToken?: string;
  /**
   * Optional. The level of details of each migrating VM.
   */
  view?:  | "MIGRATING_VM_VIEW_UNSPECIFIED" | "MIGRATING_VM_VIEW_BASIC" | "MIGRATING_VM_VIEW_FULL";
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesMigratingVmsPatch.
 */
export interface ProjectsLocationsSourcesMigratingVmsPatchOptions {
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes since the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Field mask is used to specify the fields to be overwritten in the
   * MigratingVm resource by the update. The fields specified in the update_mask
   * are relative to the resource, not the full request. A field will be
   * overwritten if it is in the mask. If the user does not provide a mask then
   * all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsSourcesMigratingVmsPatchOptions(data: any): ProjectsLocationsSourcesMigratingVmsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsSourcesMigratingVmsPatchOptions(data: any): ProjectsLocationsSourcesMigratingVmsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesMigratingVmsReplicationCyclesList.
 */
export interface ProjectsLocationsSourcesMigratingVmsReplicationCyclesListOptions {
  /**
   * Optional. The filter request.
   */
  filter?: string;
  /**
   * Optional. the order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of replication cycles to return. The service
   * may return fewer than this value. If unspecified, at most 100 migrating VMs
   * will be returned. The maximum value is 100; values above 100 will be
   * coerced to 100.
   */
  pageSize?: number;
  /**
   * Required. A page token, received from a previous `ListReplicationCycles`
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to `ListReplicationCycles` must match the call
   * that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for VMMigration#projectsLocationsSourcesPatch.
 */
export interface ProjectsLocationsSourcesPatchOptions {
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes since the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Field mask is used to specify the fields to be overwritten in the Source
   * resource by the update. The fields specified in the update_mask are
   * relative to the resource, not the full request. A field will be overwritten
   * if it is in the mask. If the user does not provide a mask then all fields
   * will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsSourcesPatchOptions(data: any): ProjectsLocationsSourcesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsSourcesPatchOptions(data: any): ProjectsLocationsSourcesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesUtilizationReportsCreate.
 */
export interface ProjectsLocationsSourcesUtilizationReportsCreateOptions {
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes since the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. The ID to use for the report, which will become the final
   * component of the reports's resource name. This value maximum length is 63
   * characters, and valid characters are /a-z-/. It must start with an english
   * letter and must not end with a hyphen.
   */
  utilizationReportId?: string;
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesUtilizationReportsDelete.
 */
export interface ProjectsLocationsSourcesUtilizationReportsDeleteOptions {
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes after the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesUtilizationReportsGet.
 */
export interface ProjectsLocationsSourcesUtilizationReportsGetOptions {
  /**
   * Optional. The level of details of the report. Defaults to FULL
   */
  view?:  | "UTILIZATION_REPORT_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for
 * VMMigration#projectsLocationsSourcesUtilizationReportsList.
 */
export interface ProjectsLocationsSourcesUtilizationReportsListOptions {
  /**
   * Optional. The filter request.
   */
  filter?: string;
  /**
   * Optional. the order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of reports to return. The service may return
   * fewer than this value. If unspecified, at most 500 reports will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * Required. A page token, received from a previous `ListUtilizationReports`
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to `ListUtilizationReports` must match the call
   * that provided the page token.
   */
  pageToken?: string;
  /**
   * Optional. The level of details of each report. Defaults to BASIC.
   */
  view?:  | "UTILIZATION_REPORT_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for VMMigration#projectsLocationsTargetProjectsCreate.
 */
export interface ProjectsLocationsTargetProjectsCreateOptions {
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes since the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. The target_project identifier.
   */
  targetProjectId?: string;
}

/**
 * Additional options for VMMigration#projectsLocationsTargetProjectsDelete.
 */
export interface ProjectsLocationsTargetProjectsDeleteOptions {
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes after the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * Additional options for VMMigration#projectsLocationsTargetProjectsList.
 */
export interface ProjectsLocationsTargetProjectsListOptions {
  /**
   * Optional. The filter request.
   */
  filter?: string;
  /**
   * Optional. the order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of targets to return. The service may return
   * fewer than this value. If unspecified, at most 500 targets will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * Required. A page token, received from a previous `ListTargets` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListTargets` must match the call that provided the
   * page token.
   */
  pageToken?: string;
}

/**
 * Additional options for VMMigration#projectsLocationsTargetProjectsPatch.
 */
export interface ProjectsLocationsTargetProjectsPatchOptions {
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes since the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Field mask is used to specify the fields to be overwritten in the
   * TargetProject resource by the update. The fields specified in the
   * update_mask are relative to the resource, not the full request. A field
   * will be overwritten if it is in the mask. If the user does not provide a
   * mask then all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsTargetProjectsPatchOptions(data: any): ProjectsLocationsTargetProjectsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsTargetProjectsPatchOptions(data: any): ProjectsLocationsTargetProjectsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Request message for 'RemoveMigration' request.
 */
export interface RemoveGroupMigrationRequest {
  /**
   * The MigratingVm to remove.
   */
  migratingVm?: string;
}

/**
 * ReplicatingStep contains specific step details.
 */
export interface ReplicatingStep {
  /**
   * The source disks replication rate for the last 30 minutes in bytes per
   * second.
   */
  lastThirtyMinutesAverageBytesPerSecond?: bigint;
  /**
   * The source disks replication rate for the last 2 minutes in bytes per
   * second.
   */
  lastTwoMinutesAverageBytesPerSecond?: bigint;
  /**
   * Replicated bytes in the step.
   */
  replicatedBytes?: bigint;
  /**
   * Total bytes to be handled in the step.
   */
  totalBytes?: bigint;
}

function serializeReplicatingStep(data: any): ReplicatingStep {
  return {
    ...data,
    lastThirtyMinutesAverageBytesPerSecond: data["lastThirtyMinutesAverageBytesPerSecond"] !== undefined ? String(data["lastThirtyMinutesAverageBytesPerSecond"]) : undefined,
    lastTwoMinutesAverageBytesPerSecond: data["lastTwoMinutesAverageBytesPerSecond"] !== undefined ? String(data["lastTwoMinutesAverageBytesPerSecond"]) : undefined,
    replicatedBytes: data["replicatedBytes"] !== undefined ? String(data["replicatedBytes"]) : undefined,
    totalBytes: data["totalBytes"] !== undefined ? String(data["totalBytes"]) : undefined,
  };
}

function deserializeReplicatingStep(data: any): ReplicatingStep {
  return {
    ...data,
    lastThirtyMinutesAverageBytesPerSecond: data["lastThirtyMinutesAverageBytesPerSecond"] !== undefined ? BigInt(data["lastThirtyMinutesAverageBytesPerSecond"]) : undefined,
    lastTwoMinutesAverageBytesPerSecond: data["lastTwoMinutesAverageBytesPerSecond"] !== undefined ? BigInt(data["lastTwoMinutesAverageBytesPerSecond"]) : undefined,
    replicatedBytes: data["replicatedBytes"] !== undefined ? BigInt(data["replicatedBytes"]) : undefined,
    totalBytes: data["totalBytes"] !== undefined ? BigInt(data["totalBytes"]) : undefined,
  };
}

/**
 * ReplicationCycle contains information about the current replication cycle
 * status.
 */
export interface ReplicationCycle {
  /**
   * The cycle's ordinal number.
   */
  cycleNumber?: number;
  /**
   * The time the replication cycle has ended.
   */
  endTime?: Date;
  /**
   * Provides details on the state of the cycle in case of an error.
   */
  error?: Status;
  /**
   * The identifier of the ReplicationCycle.
   */
  name?: string;
  /**
   * The current progress in percentage of this cycle. Was replaced by 'steps'
   * field, which breaks down the cycle progression more accurately.
   */
  progressPercent?: number;
  /**
   * The time the replication cycle has started.
   */
  startTime?: Date;
  /**
   * State of the ReplicationCycle.
   */
  state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "PAUSED" | "FAILED" | "SUCCEEDED";
  /**
   * The cycle's steps list representing its progress.
   */
  steps?: CycleStep[];
  /**
   * The accumulated duration the replication cycle was paused.
   */
  totalPauseDuration?: number /* Duration */;
  /**
   * Output only. Warnings that occurred during the cycle.
   */
  readonly warnings?: MigrationWarning[];
}

function serializeReplicationCycle(data: any): ReplicationCycle {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    steps: data["steps"] !== undefined ? data["steps"].map((item: any) => (serializeCycleStep(item))) : undefined,
    totalPauseDuration: data["totalPauseDuration"] !== undefined ? data["totalPauseDuration"] : undefined,
  };
}

function deserializeReplicationCycle(data: any): ReplicationCycle {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    steps: data["steps"] !== undefined ? data["steps"].map((item: any) => (deserializeCycleStep(item))) : undefined,
    totalPauseDuration: data["totalPauseDuration"] !== undefined ? data["totalPauseDuration"] : undefined,
    warnings: data["warnings"] !== undefined ? data["warnings"].map((item: any) => (deserializeMigrationWarning(item))) : undefined,
  };
}

/**
 * ReplicationSync contain information about the last replica sync to the
 * cloud.
 */
export interface ReplicationSync {
  /**
   * The most updated snapshot created time in the source that finished
   * replication.
   */
  lastSyncTime?: Date;
}

function serializeReplicationSync(data: any): ReplicationSync {
  return {
    ...data,
    lastSyncTime: data["lastSyncTime"] !== undefined ? data["lastSyncTime"].toISOString() : undefined,
  };
}

function deserializeReplicationSync(data: any): ReplicationSync {
  return {
    ...data,
    lastSyncTime: data["lastSyncTime"] !== undefined ? new Date(data["lastSyncTime"]) : undefined,
  };
}

/**
 * Request message for 'ResumeMigration' request.
 */
export interface ResumeMigrationRequest {
}

/**
 * A policy for scheduling replications.
 */
export interface SchedulePolicy {
  /**
   * The idle duration between replication stages.
   */
  idleDuration?: number /* Duration */;
  /**
   * A flag to indicate whether to skip OS adaptation during the replication
   * sync. OS adaptation is a process where the VM's operating system undergoes
   * changes and adaptations to fully function on Compute Engine.
   */
  skipOsAdaptation?: boolean;
}

function serializeSchedulePolicy(data: any): SchedulePolicy {
  return {
    ...data,
    idleDuration: data["idleDuration"] !== undefined ? data["idleDuration"] : undefined,
  };
}

function deserializeSchedulePolicy(data: any): SchedulePolicy {
  return {
    ...data,
    idleDuration: data["idleDuration"] !== undefined ? data["idleDuration"] : undefined,
  };
}

/**
 * Node Affinity: the configuration of desired nodes onto which this Instance
 * could be scheduled. Based on
 * https://cloud.google.com/compute/docs/reference/rest/v1/instances/setScheduling
 */
export interface SchedulingNodeAffinity {
  /**
   * The label key of Node resource to reference.
   */
  key?: string;
  /**
   * The operator to use for the node resources specified in the `values`
   * parameter.
   */
  operator?:  | "OPERATOR_UNSPECIFIED" | "IN" | "NOT_IN";
  /**
   * Corresponds to the label values of Node resource.
   */
  values?: string[];
}

/**
 * ShuttingDownSourceVMStep contains specific step details.
 */
export interface ShuttingDownSourceVMStep {
}

/**
 * Source message describes a specific vm migration Source resource. It
 * contains the source environment information.
 */
export interface Source {
  /**
   * AWS type source details.
   */
  aws?: AwsSourceDetails;
  /**
   * Output only. The create time timestamp.
   */
  readonly createTime?: Date;
  /**
   * User-provided description of the source.
   */
  description?: string;
  /**
   * The labels of the source.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The Source name.
   */
  readonly name?: string;
  /**
   * Output only. The update time timestamp.
   */
  readonly updateTime?: Date;
  /**
   * Vmware type source details.
   */
  vmware?: VmwareSourceDetails;
}

/**
 * Request message for 'StartMigrationRequest' request.
 */
export interface StartMigrationRequest {
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
 * Tag is an AWS tag representation.
 */
export interface Tag {
  /**
   * Key of tag.
   */
  key?: string;
  /**
   * Value of tag.
   */
  value?: string;
}

/**
 * TargetProject message represents a target Compute Engine project for a
 * migration or a clone.
 */
export interface TargetProject {
  /**
   * Output only. The time this target project resource was created (not
   * related to when the Compute Engine project it points to was created).
   */
  readonly createTime?: Date;
  /**
   * The target project's description.
   */
  description?: string;
  /**
   * Output only. The name of the target project.
   */
  readonly name?: string;
  /**
   * The target project ID (number) or project name.
   */
  project?: string;
  /**
   * Output only. The last time the target project resource was updated.
   */
  readonly updateTime?: Date;
}

/**
 * Request message for 'UpgradeAppliance' request.
 */
export interface UpgradeApplianceRequest {
  /**
   * A request ID to identify requests. Specify a unique request ID so that if
   * you must retry your request, the server will know to ignore the request if
   * it has already been completed. The server will guarantee that for at least
   * 60 minutes after the first request. For example, consider a situation where
   * you make an initial request and the request times out. If you make the
   * request again with the same request ID, the server can check if original
   * operation with the same request ID was received, and if so, will ignore the
   * second request. This prevents clients from accidentally creating duplicate
   * commitments. The request ID must be a valid UUID with the exception that
   * zero UUID is not supported (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
}

/**
 * UpgradeStatus contains information about upgradeAppliance operation.
 */
export interface UpgradeStatus {
  /**
   * Provides details on the state of the upgrade operation in case of an
   * error.
   */
  error?: Status;
  /**
   * The version from which we upgraded.
   */
  previousVersion?: string;
  /**
   * The time the operation was started.
   */
  startTime?: Date;
  /**
   * The state of the upgradeAppliance operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "FAILED" | "SUCCEEDED";
  /**
   * The version to upgrade to.
   */
  version?: string;
}

function serializeUpgradeStatus(data: any): UpgradeStatus {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeUpgradeStatus(data: any): UpgradeStatus {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Utilization report details the utilization (CPU, memory, etc.) of selected
 * source VMs.
 */
export interface UtilizationReport {
  /**
   * Output only. The time the report was created (this refers to the time of
   * the request, not the time the report creation completed).
   */
  readonly createTime?: Date;
  /**
   * The report display name, as assigned by the user.
   */
  displayName?: string;
  /**
   * Output only. Provides details on the state of the report in case of an
   * error.
   */
  readonly error?: Status;
  /**
   * Output only. The point in time when the time frame ends. Notice that the
   * time frame is counted backwards. For instance if the "frame_end_time" value
   * is 2021/01/20 and the time frame is WEEK then the report covers the week
   * between 2021/01/20 and 2021/01/14.
   */
  readonly frameEndTime?: Date;
  /**
   * Output only. The report unique name.
   */
  readonly name?: string;
  /**
   * Output only. Current state of the report.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "SUCCEEDED" | "FAILED";
  /**
   * Output only. The time the state was last set.
   */
  readonly stateTime?: Date;
  /**
   * Time frame of the report.
   */
  timeFrame?:  | "TIME_FRAME_UNSPECIFIED" | "WEEK" | "MONTH" | "YEAR";
  /**
   * Output only. Total number of VMs included in the report.
   */
  readonly vmCount?: number;
  /**
   * List of utilization information per VM. When sent as part of the request,
   * the "vm_id" field is used in order to specify which VMs to include in the
   * report. In that case all other fields are ignored.
   */
  vms?: VmUtilizationInfo[];
}

function serializeUtilizationReport(data: any): UtilizationReport {
  return {
    ...data,
    vms: data["vms"] !== undefined ? data["vms"].map((item: any) => (serializeVmUtilizationInfo(item))) : undefined,
  };
}

function deserializeUtilizationReport(data: any): UtilizationReport {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    frameEndTime: data["frameEndTime"] !== undefined ? new Date(data["frameEndTime"]) : undefined,
    stateTime: data["stateTime"] !== undefined ? new Date(data["stateTime"]) : undefined,
    vms: data["vms"] !== undefined ? data["vms"].map((item: any) => (deserializeVmUtilizationInfo(item))) : undefined,
  };
}

/**
 * Utilization information of a single VM.
 */
export interface VmUtilizationInfo {
  /**
   * Utilization metrics for this VM.
   */
  utilization?: VmUtilizationMetrics;
  /**
   * The VM's ID in the source.
   */
  vmId?: string;
  /**
   * The description of the VM in a Source of type Vmware.
   */
  vmwareVmDetails?: VmwareVmDetails;
}

function serializeVmUtilizationInfo(data: any): VmUtilizationInfo {
  return {
    ...data,
    utilization: data["utilization"] !== undefined ? serializeVmUtilizationMetrics(data["utilization"]) : undefined,
    vmwareVmDetails: data["vmwareVmDetails"] !== undefined ? serializeVmwareVmDetails(data["vmwareVmDetails"]) : undefined,
  };
}

function deserializeVmUtilizationInfo(data: any): VmUtilizationInfo {
  return {
    ...data,
    utilization: data["utilization"] !== undefined ? deserializeVmUtilizationMetrics(data["utilization"]) : undefined,
    vmwareVmDetails: data["vmwareVmDetails"] !== undefined ? deserializeVmwareVmDetails(data["vmwareVmDetails"]) : undefined,
  };
}

/**
 * Utilization metrics values for a single VM.
 */
export interface VmUtilizationMetrics {
  /**
   * Average CPU usage, percent.
   */
  cpuAveragePercent?: number;
  /**
   * Max CPU usage, percent.
   */
  cpuMaxPercent?: number;
  /**
   * Average disk IO rate, in kilobytes per second.
   */
  diskIoRateAverageKbps?: bigint;
  /**
   * Max disk IO rate, in kilobytes per second.
   */
  diskIoRateMaxKbps?: bigint;
  /**
   * Average memory usage, percent.
   */
  memoryAveragePercent?: number;
  /**
   * Max memory usage, percent.
   */
  memoryMaxPercent?: number;
  /**
   * Average network throughput (combined transmit-rates and receive-rates), in
   * kilobytes per second.
   */
  networkThroughputAverageKbps?: bigint;
  /**
   * Max network throughput (combined transmit-rates and receive-rates), in
   * kilobytes per second.
   */
  networkThroughputMaxKbps?: bigint;
}

function serializeVmUtilizationMetrics(data: any): VmUtilizationMetrics {
  return {
    ...data,
    diskIoRateAverageKbps: data["diskIoRateAverageKbps"] !== undefined ? String(data["diskIoRateAverageKbps"]) : undefined,
    diskIoRateMaxKbps: data["diskIoRateMaxKbps"] !== undefined ? String(data["diskIoRateMaxKbps"]) : undefined,
    networkThroughputAverageKbps: data["networkThroughputAverageKbps"] !== undefined ? String(data["networkThroughputAverageKbps"]) : undefined,
    networkThroughputMaxKbps: data["networkThroughputMaxKbps"] !== undefined ? String(data["networkThroughputMaxKbps"]) : undefined,
  };
}

function deserializeVmUtilizationMetrics(data: any): VmUtilizationMetrics {
  return {
    ...data,
    diskIoRateAverageKbps: data["diskIoRateAverageKbps"] !== undefined ? BigInt(data["diskIoRateAverageKbps"]) : undefined,
    diskIoRateMaxKbps: data["diskIoRateMaxKbps"] !== undefined ? BigInt(data["diskIoRateMaxKbps"]) : undefined,
    networkThroughputAverageKbps: data["networkThroughputAverageKbps"] !== undefined ? BigInt(data["networkThroughputAverageKbps"]) : undefined,
    networkThroughputMaxKbps: data["networkThroughputMaxKbps"] !== undefined ? BigInt(data["networkThroughputMaxKbps"]) : undefined,
  };
}

/**
 * VmwareSourceDetails message describes a specific source details for the
 * vmware source type.
 */
export interface VmwareSourceDetails {
  /**
   * Input only. The credentials password. This is write only and can not be
   * read in a GET operation.
   */
  password?: string;
  /**
   * The thumbprint representing the certificate for the vcenter.
   */
  thumbprint?: string;
  /**
   * The credentials username.
   */
  username?: string;
  /**
   * The ip address of the vcenter this Source represents.
   */
  vcenterIp?: string;
}

/**
 * VmwareVmDetails describes a VM in vCenter.
 */
export interface VmwareVmDetails {
  /**
   * Output only. The VM Boot Option.
   */
  readonly bootOption?:  | "BOOT_OPTION_UNSPECIFIED" | "EFI" | "BIOS";
  /**
   * The total size of the storage allocated to the VM in MB.
   */
  committedStorageMb?: bigint;
  /**
   * The number of cpus in the VM.
   */
  cpuCount?: number;
  /**
   * The descriptive name of the vCenter's datacenter this VM is contained in.
   */
  datacenterDescription?: string;
  /**
   * The id of the vCenter's datacenter this VM is contained in.
   */
  datacenterId?: string;
  /**
   * The number of disks the VM has.
   */
  diskCount?: number;
  /**
   * The display name of the VM. Note that this is not necessarily unique.
   */
  displayName?: string;
  /**
   * The VM's OS. See for example
   * https://vdc-repo.vmware.com/vmwb-repository/dcr-public/da47f910-60ac-438b-8b9b-6122f4d14524/16b7274a-bf8b-4b4c-a05e-746f2aa93c8c/doc/vim.vm.GuestOsDescriptor.GuestOsIdentifier.html
   * for types of strings this might hold.
   */
  guestDescription?: string;
  /**
   * The size of the memory of the VM in MB.
   */
  memoryMb?: number;
  /**
   * The power state of the VM at the moment list was taken.
   */
  powerState?:  | "POWER_STATE_UNSPECIFIED" | "ON" | "OFF" | "SUSPENDED";
  /**
   * The unique identifier of the VM in vCenter.
   */
  uuid?: string;
  /**
   * The VM's id in the source (note that this is not the MigratingVm's id).
   * This is the moref id of the VM.
   */
  vmId?: string;
}

function serializeVmwareVmDetails(data: any): VmwareVmDetails {
  return {
    ...data,
    committedStorageMb: data["committedStorageMb"] !== undefined ? String(data["committedStorageMb"]) : undefined,
  };
}

function deserializeVmwareVmDetails(data: any): VmwareVmDetails {
  return {
    ...data,
    committedStorageMb: data["committedStorageMb"] !== undefined ? BigInt(data["committedStorageMb"]) : undefined,
  };
}

/**
 * VmwareVmsDetails describes VMs in vCenter.
 */
export interface VmwareVmsDetails {
  /**
   * The details of the vmware VMs.
   */
  details?: VmwareVmDetails[];
}

function serializeVmwareVmsDetails(data: any): VmwareVmsDetails {
  return {
    ...data,
    details: data["details"] !== undefined ? data["details"].map((item: any) => (serializeVmwareVmDetails(item))) : undefined,
  };
}

function deserializeVmwareVmsDetails(data: any): VmwareVmsDetails {
  return {
    ...data,
    details: data["details"] !== undefined ? data["details"].map((item: any) => (deserializeVmwareVmDetails(item))) : undefined,
  };
}