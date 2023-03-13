// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Kubernetes Engine API Client for Deno
 * =====================================
 * 
 * Builds and manages container-based applications, powered by the open source Kubernetes technology.
 * 
 * Docs: https://cloud.google.com/container-engine/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Builds and manages container-based applications, powered by the open source
 * Kubernetes technology.
 */
export class container {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://container.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Lists subnetworks that are usable for creating clusters in a project.
   *
   * @param parent The parent project where subnetworks are usable. Specified in the format `projects/*`.
   */
  async projectsAggregatedUsableSubnetworksList(parent: string, opts: ProjectsAggregatedUsableSubnetworksListOptions = {}): Promise<ListUsableSubnetworksResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/aggregated/usableSubnetworks`);
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
    return data as ListUsableSubnetworksResponse;
  }

  /**
   * Completes master IP rotation.
   *
   * @param name The name (project, location, cluster name) of the cluster to complete IP rotation. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersCompleteIpRotation(name: string, req: CompleteIPRotationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:completeIpRotation`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a cluster, consisting of the specified number and type of Google
   * Compute Engine instances. By default, the cluster is created in the
   * project's [default
   * network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks).
   * One firewall is added for the cluster. After cluster creation, the Kubelet
   * creates routes for each node to allow the containers on that node to
   * communicate with all other instances in the cluster. Finally, an entry is
   * added to the project's global metadata indicating which CIDR range the
   * cluster is using.
   *
   * @param parent The parent (project and location) where the cluster will be created. Specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsClustersCreate(parent: string, req: CreateClusterRequest): Promise<Operation> {
    req = serializeCreateClusterRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/clusters`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes the cluster, including the Kubernetes endpoint and all worker
   * nodes. Firewalls and routes that were configured during cluster creation
   * are also deleted. Other Google Compute Engine resources that might be in
   * use by the cluster, such as load balancer resources, are not deleted if
   * they weren't present when the cluster was initially created.
   *
   * @param name The name (project, location, cluster) of the cluster to delete. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersDelete(name: string, opts: ProjectsLocationsClustersDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.clusterId !== undefined) {
      url.searchParams.append("clusterId", String(opts.clusterId));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.zone !== undefined) {
      url.searchParams.append("zone", String(opts.zone));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the details of a specific cluster.
   *
   * @param name The name (project, location, cluster) of the cluster to retrieve. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersGet(name: string, opts: ProjectsLocationsClustersGetOptions = {}): Promise<Cluster> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.clusterId !== undefined) {
      url.searchParams.append("clusterId", String(opts.clusterId));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.zone !== undefined) {
      url.searchParams.append("zone", String(opts.zone));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCluster(data);
  }

  /**
   * Gets the public component of the cluster signing keys in JSON Web Key
   * format. This API is not yet intended for general use, and is not available
   * for all clusters.
   *
   * @param parent The cluster (project, location, cluster name) to get keys for. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersGetJwks(parent: string): Promise<GetJSONWebKeysResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/jwks`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetJSONWebKeysResponse(data);
  }

  /**
   * Lists all clusters owned by a project in either the specified zone or all
   * zones.
   *
   * @param parent The parent (project and location) where the clusters will be listed. Specified in the format `projects/*\/locations/*`. Location "-" matches all zones and all regions.
   */
  async projectsLocationsClustersList(parent: string, opts: ProjectsLocationsClustersListOptions = {}): Promise<ListClustersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/clusters`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.zone !== undefined) {
      url.searchParams.append("zone", String(opts.zone));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListClustersResponse(data);
  }

  /**
   * CompleteNodePoolUpgrade will signal an on-going node pool upgrade to
   * complete.
   *
   * @param name The name (project, location, cluster, node pool id) of the node pool to complete upgrade. Specified in the format `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  async projectsLocationsClustersNodePoolsCompleteUpgrade(name: string, req: CompleteNodePoolUpgradeRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:completeUpgrade`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Creates a node pool for a cluster.
   *
   * @param parent The parent (project, location, cluster name) where the node pool will be created. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersNodePoolsCreate(parent: string, req: CreateNodePoolRequest): Promise<Operation> {
    req = serializeCreateNodePoolRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/nodePools`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a node pool from a cluster.
   *
   * @param name The name (project, location, cluster, node pool id) of the node pool to delete. Specified in the format `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  async projectsLocationsClustersNodePoolsDelete(name: string, opts: ProjectsLocationsClustersNodePoolsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.clusterId !== undefined) {
      url.searchParams.append("clusterId", String(opts.clusterId));
    }
    if (opts.nodePoolId !== undefined) {
      url.searchParams.append("nodePoolId", String(opts.nodePoolId));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.zone !== undefined) {
      url.searchParams.append("zone", String(opts.zone));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieves the requested node pool.
   *
   * @param name The name (project, location, cluster, node pool id) of the node pool to get. Specified in the format `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  async projectsLocationsClustersNodePoolsGet(name: string, opts: ProjectsLocationsClustersNodePoolsGetOptions = {}): Promise<NodePool> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.clusterId !== undefined) {
      url.searchParams.append("clusterId", String(opts.clusterId));
    }
    if (opts.nodePoolId !== undefined) {
      url.searchParams.append("nodePoolId", String(opts.nodePoolId));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.zone !== undefined) {
      url.searchParams.append("zone", String(opts.zone));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeNodePool(data);
  }

  /**
   * Lists the node pools for a cluster.
   *
   * @param parent The parent (project, location, cluster name) where the node pools will be listed. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersNodePoolsList(parent: string, opts: ProjectsLocationsClustersNodePoolsListOptions = {}): Promise<ListNodePoolsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/nodePools`);
    if (opts.clusterId !== undefined) {
      url.searchParams.append("clusterId", String(opts.clusterId));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.zone !== undefined) {
      url.searchParams.append("zone", String(opts.zone));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListNodePoolsResponse(data);
  }

  /**
   * Rolls back a previously Aborted or Failed NodePool upgrade. This makes no
   * changes if the last upgrade successfully completed.
   *
   * @param name The name (project, location, cluster, node pool id) of the node poll to rollback upgrade. Specified in the format `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  async projectsLocationsClustersNodePoolsRollback(name: string, req: RollbackNodePoolUpgradeRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:rollback`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the autoscaling settings for the specified node pool.
   *
   * @param name The name (project, location, cluster, node pool) of the node pool to set autoscaler settings. Specified in the format `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  async projectsLocationsClustersNodePoolsSetAutoscaling(name: string, req: SetNodePoolAutoscalingRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setAutoscaling`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the NodeManagement options for a node pool.
   *
   * @param name The name (project, location, cluster, node pool id) of the node pool to set management properties. Specified in the format `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  async projectsLocationsClustersNodePoolsSetManagement(name: string, req: SetNodePoolManagementRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setManagement`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the size for a specific node pool. The new size will be used for all
   * replicas, including future replicas created by modifying
   * NodePool.locations.
   *
   * @param name The name (project, location, cluster, node pool id) of the node pool to set size. Specified in the format `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  async projectsLocationsClustersNodePoolsSetSize(name: string, req: SetNodePoolSizeRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setSize`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates the version and/or image type for the specified node pool.
   *
   * @param name The name (project, location, cluster, node pool) of the node pool to update. Specified in the format `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  async projectsLocationsClustersNodePoolsUpdate(name: string, req: UpdateNodePoolRequest): Promise<Operation> {
    req = serializeUpdateNodePoolRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the addons for a specific cluster.
   *
   * @param name The name (project, location, cluster) of the cluster to set addons. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersSetAddons(name: string, req: SetAddonsConfigRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setAddons`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Enables or disables the ABAC authorization mechanism on a cluster.
   *
   * @param name The name (project, location, cluster name) of the cluster to set legacy abac. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersSetLegacyAbac(name: string, req: SetLegacyAbacRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setLegacyAbac`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the locations for a specific cluster. Deprecated. Use
   * [projects.locations.clusters.update](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/update)
   * instead.
   *
   * @param name The name (project, location, cluster) of the cluster to set locations. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersSetLocations(name: string, req: SetLocationsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setLocations`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the logging service for a specific cluster.
   *
   * @param name The name (project, location, cluster) of the cluster to set logging. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersSetLogging(name: string, req: SetLoggingServiceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setLogging`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the maintenance policy for a cluster.
   *
   * @param name The name (project, location, cluster name) of the cluster to set maintenance policy. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersSetMaintenancePolicy(name: string, req: SetMaintenancePolicyRequest): Promise<Operation> {
    req = serializeSetMaintenancePolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:setMaintenancePolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets master auth materials. Currently supports changing the admin password
   * or a specific cluster, either via password generation or explicitly setting
   * the password.
   *
   * @param name The name (project, location, cluster) of the cluster to set auth. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersSetMasterAuth(name: string, req: SetMasterAuthRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setMasterAuth`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the monitoring service for a specific cluster.
   *
   * @param name The name (project, location, cluster) of the cluster to set monitoring. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersSetMonitoring(name: string, req: SetMonitoringServiceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setMonitoring`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Enables or disables Network Policy for a cluster.
   *
   * @param name The name (project, location, cluster name) of the cluster to set networking policy. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersSetNetworkPolicy(name: string, req: SetNetworkPolicyRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setNetworkPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets labels on a cluster.
   *
   * @param name The name (project, location, cluster name) of the cluster to set labels. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersSetResourceLabels(name: string, req: SetLabelsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:setResourceLabels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Starts master IP rotation.
   *
   * @param name The name (project, location, cluster name) of the cluster to start IP rotation. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersStartIpRotation(name: string, req: StartIPRotationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:startIpRotation`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates the settings of a specific cluster.
   *
   * @param name The name (project, location, cluster) of the cluster to update. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersUpdate(name: string, req: UpdateClusterRequest): Promise<Operation> {
    req = serializeUpdateClusterRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates the master for a specific cluster.
   *
   * @param name The name (project, location, cluster) of the cluster to update. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersUpdateMaster(name: string, req: UpdateMasterRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:updateMaster`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the OIDC discovery document for the cluster. See the [OpenID Connect
   * Discovery 1.0
   * specification](https://openid.net/specs/openid-connect-discovery-1_0.html)
   * for details. This API is not yet intended for general use, and is not
   * available for all clusters.
   *
   * @param parent The cluster (project, location, cluster name) to get the discovery document for. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  async projectsLocationsClustersWell-knownGetOpenid-configuration(parent: string): Promise<GetOpenIDConfigResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/.well-known/openid-configuration`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGetOpenIDConfigResponse(data);
  }

  /**
   * Returns configuration info about the Google Kubernetes Engine service.
   *
   * @param name The name (project and location) of the server config to get, specified in the format `projects/*\/locations/*`.
   */
  async projectsLocationsGetServerConfig(name: string, opts: ProjectsLocationsGetServerConfigOptions = {}): Promise<ServerConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }/serverConfig`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.zone !== undefined) {
      url.searchParams.append("zone", String(opts.zone));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ServerConfig;
  }

  /**
   * Cancels the specified operation.
   *
   * @param name The name (project, location, operation id) of the operation to cancel. Specified in the format `projects/*\/locations/*\/operations/*`.
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
   * Gets the specified operation.
   *
   * @param name The name (project, location, operation id) of the operation to get. Specified in the format `projects/*\/locations/*\/operations/*`.
   */
  async projectsLocationsOperationsGet(name: string, opts: ProjectsLocationsOperationsGetOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.operationId !== undefined) {
      url.searchParams.append("operationId", String(opts.operationId));
    }
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.zone !== undefined) {
      url.searchParams.append("zone", String(opts.zone));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists all operations in a project in a specific zone or all zones.
   *
   * @param parent The parent (project and location) where the operations will be listed. Specified in the format `projects/*\/locations/*`. Location "-" matches all zones and all regions.
   */
  async projectsLocationsOperationsList(parent: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/operations`);
    if (opts.projectId !== undefined) {
      url.searchParams.append("projectId", String(opts.projectId));
    }
    if (opts.zone !== undefined) {
      url.searchParams.append("zone", String(opts.zone));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListOperationsResponse;
  }

  /**
   * Sets the addons for a specific cluster.
   *
   * @param clusterId Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersAddons(clusterId: string, projectId: string, zone: string, req: SetAddonsConfigRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/addons`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Completes master IP rotation.
   *
   * @param clusterId Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersCompleteIpRotation(clusterId: string, projectId: string, zone: string, req: CompleteIPRotationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }:completeIpRotation`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a cluster, consisting of the specified number and type of Google
   * Compute Engine instances. By default, the cluster is created in the
   * project's [default
   * network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks).
   * One firewall is added for the cluster. After cluster creation, the Kubelet
   * creates routes for each node to allow the containers on that node to
   * communicate with all other instances in the cluster. Finally, an entry is
   * added to the project's global metadata indicating which CIDR range the
   * cluster is using.
   *
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field.
   */
  async projectsZonesClustersCreate(projectId: string, zone: string, req: CreateClusterRequest): Promise<Operation> {
    req = serializeCreateClusterRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes the cluster, including the Kubernetes endpoint and all worker
   * nodes. Firewalls and routes that were configured during cluster creation
   * are also deleted. Other Google Compute Engine resources that might be in
   * use by the cluster, such as load balancer resources, are not deleted if
   * they weren't present when the cluster was initially created.
   *
   * @param clusterId Deprecated. The name of the cluster to delete. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersDelete(clusterId: string, projectId: string, zone: string, opts: ProjectsZonesClustersDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets the details of a specific cluster.
   *
   * @param clusterId Deprecated. The name of the cluster to retrieve. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersGet(clusterId: string, projectId: string, zone: string, opts: ProjectsZonesClustersGetOptions = {}): Promise<Cluster> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCluster(data);
  }

  /**
   * Enables or disables the ABAC authorization mechanism on a cluster.
   *
   * @param clusterId Deprecated. The name of the cluster to update. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersLegacyAbac(clusterId: string, projectId: string, zone: string, req: SetLegacyAbacRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/legacyAbac`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists all clusters owned by a project in either the specified zone or all
   * zones.
   *
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides, or "-" for all zones. This field has been deprecated and replaced by the parent field.
   */
  async projectsZonesClustersList(projectId: string, zone: string, opts: ProjectsZonesClustersListOptions = {}): Promise<ListClustersResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters`);
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListClustersResponse(data);
  }

  /**
   * Sets the locations for a specific cluster. Deprecated. Use
   * [projects.locations.clusters.update](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/update)
   * instead.
   *
   * @param clusterId Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersLocations(clusterId: string, projectId: string, zone: string, req: SetLocationsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/locations`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the logging service for a specific cluster.
   *
   * @param clusterId Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersLogging(clusterId: string, projectId: string, zone: string, req: SetLoggingServiceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/logging`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates the master for a specific cluster.
   *
   * @param clusterId Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersMaster(clusterId: string, projectId: string, zone: string, req: UpdateMasterRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/master`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the monitoring service for a specific cluster.
   *
   * @param clusterId Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersMonitoring(clusterId: string, projectId: string, zone: string, req: SetMonitoringServiceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/monitoring`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the autoscaling settings for the specified node pool.
   *
   * @param clusterId Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field.
   * @param nodePoolId Deprecated. The name of the node pool to upgrade. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersNodePoolsAutoscaling(clusterId: string, nodePoolId: string, projectId: string, zone: string, req: SetNodePoolAutoscalingRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/nodePools/${ nodePoolId }/autoscaling`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a node pool for a cluster.
   *
   * @param clusterId Deprecated. The name of the cluster. This field has been deprecated and replaced by the parent field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field.
   */
  async projectsZonesClustersNodePoolsCreate(clusterId: string, projectId: string, zone: string, req: CreateNodePoolRequest): Promise<Operation> {
    req = serializeCreateNodePoolRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/nodePools`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a node pool from a cluster.
   *
   * @param clusterId Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field.
   * @param nodePoolId Deprecated. The name of the node pool to delete. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersNodePoolsDelete(clusterId: string, nodePoolId: string, projectId: string, zone: string, opts: ProjectsZonesClustersNodePoolsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/nodePools/${ nodePoolId }`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Retrieves the requested node pool.
   *
   * @param clusterId Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field.
   * @param nodePoolId Deprecated. The name of the node pool. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersNodePoolsGet(clusterId: string, nodePoolId: string, projectId: string, zone: string, opts: ProjectsZonesClustersNodePoolsGetOptions = {}): Promise<NodePool> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/nodePools/${ nodePoolId }`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeNodePool(data);
  }

  /**
   * Lists the node pools for a cluster.
   *
   * @param clusterId Deprecated. The name of the cluster. This field has been deprecated and replaced by the parent field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the parent field.
   */
  async projectsZonesClustersNodePoolsList(clusterId: string, projectId: string, zone: string, opts: ProjectsZonesClustersNodePoolsListOptions = {}): Promise<ListNodePoolsResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/nodePools`);
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListNodePoolsResponse(data);
  }

  /**
   * Rolls back a previously Aborted or Failed NodePool upgrade. This makes no
   * changes if the last upgrade successfully completed.
   *
   * @param clusterId Deprecated. The name of the cluster to rollback. This field has been deprecated and replaced by the name field.
   * @param nodePoolId Deprecated. The name of the node pool to rollback. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersNodePoolsRollback(clusterId: string, nodePoolId: string, projectId: string, zone: string, req: RollbackNodePoolUpgradeRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/nodePools/${ nodePoolId }:rollback`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the NodeManagement options for a node pool.
   *
   * @param clusterId Deprecated. The name of the cluster to update. This field has been deprecated and replaced by the name field.
   * @param nodePoolId Deprecated. The name of the node pool to update. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersNodePoolsSetManagement(clusterId: string, nodePoolId: string, projectId: string, zone: string, req: SetNodePoolManagementRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/nodePools/${ nodePoolId }/setManagement`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the size for a specific node pool. The new size will be used for all
   * replicas, including future replicas created by modifying
   * NodePool.locations.
   *
   * @param clusterId Deprecated. The name of the cluster to update. This field has been deprecated and replaced by the name field.
   * @param nodePoolId Deprecated. The name of the node pool to update. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersNodePoolsSetSize(clusterId: string, nodePoolId: string, projectId: string, zone: string, req: SetNodePoolSizeRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/nodePools/${ nodePoolId }/setSize`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates the version and/or image type for the specified node pool.
   *
   * @param clusterId Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field.
   * @param nodePoolId Deprecated. The name of the node pool to upgrade. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersNodePoolsUpdate(clusterId: string, nodePoolId: string, projectId: string, zone: string, req: UpdateNodePoolRequest): Promise<Operation> {
    req = serializeUpdateNodePoolRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/nodePools/${ nodePoolId }/update`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets labels on a cluster.
   *
   * @param clusterId Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersResourceLabels(clusterId: string, projectId: string, zone: string, req: SetLabelsRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }/resourceLabels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets the maintenance policy for a cluster.
   *
   * @param clusterId Required. The name of the cluster to update.
   * @param projectId Required. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * @param zone Required. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides.
   */
  async projectsZonesClustersSetMaintenancePolicy(clusterId: string, projectId: string, zone: string, req: SetMaintenancePolicyRequest): Promise<Operation> {
    req = serializeSetMaintenancePolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }:setMaintenancePolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Sets master auth materials. Currently supports changing the admin password
   * or a specific cluster, either via password generation or explicitly setting
   * the password.
   *
   * @param clusterId Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersSetMasterAuth(clusterId: string, projectId: string, zone: string, req: SetMasterAuthRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }:setMasterAuth`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Enables or disables Network Policy for a cluster.
   *
   * @param clusterId Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersSetNetworkPolicy(clusterId: string, projectId: string, zone: string, req: SetNetworkPolicyRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }:setNetworkPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Starts master IP rotation.
   *
   * @param clusterId Deprecated. The name of the cluster. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersStartIpRotation(clusterId: string, projectId: string, zone: string, req: StartIPRotationRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }:startIpRotation`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Updates the settings of a specific cluster.
   *
   * @param clusterId Deprecated. The name of the cluster to upgrade. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesClustersUpdate(clusterId: string, projectId: string, zone: string, req: UpdateClusterRequest): Promise<Operation> {
    req = serializeUpdateClusterRequest(req);
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/clusters/${ clusterId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Operation;
  }

  /**
   * Returns configuration info about the Google Kubernetes Engine service.
   *
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) to return operations for. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesGetServerconfig(projectId: string, zone: string, opts: ProjectsZonesGetServerconfigOptions = {}): Promise<ServerConfig> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/serverconfig`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ServerConfig;
  }

  /**
   * Cancels the specified operation.
   *
   * @param operationId Deprecated. The server-assigned `name` of the operation. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the operation resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesOperationsCancel(operationId: string, projectId: string, zone: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/operations/${ operationId }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Gets the specified operation.
   *
   * @param operationId Deprecated. The server-assigned `name` of the operation. This field has been deprecated and replaced by the name field.
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the name field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) in which the cluster resides. This field has been deprecated and replaced by the name field.
   */
  async projectsZonesOperationsGet(operationId: string, projectId: string, zone: string, opts: ProjectsZonesOperationsGetOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/operations/${ operationId }`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists all operations in a project in a specific zone or all zones.
   *
   * @param projectId Deprecated. The Google Developers Console [project ID or project number](https://cloud.google.com/resource-manager/docs/creating-managing-projects). This field has been deprecated and replaced by the parent field.
   * @param zone Deprecated. The name of the Google Compute Engine [zone](https://cloud.google.com/compute/docs/zones#available) to return operations for, or `-` for all zones. This field has been deprecated and replaced by the parent field.
   */
  async projectsZonesOperationsList(projectId: string, zone: string, opts: ProjectsZonesOperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/projects/${ projectId }/zones/${ zone }/operations`);
    if (opts.parent !== undefined) {
      url.searchParams.append("parent", String(opts.parent));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListOperationsResponse;
  }
}

/**
 * AcceleratorConfig represents a Hardware Accelerator request.
 */
export interface AcceleratorConfig {
  /**
   * The number of the accelerator cards exposed to an instance.
   */
  acceleratorCount?: bigint;
  /**
   * The accelerator type resource name. List of supported accelerators
   * [here](https://cloud.google.com/compute/docs/gpus)
   */
  acceleratorType?: string;
  /**
   * Size of partitions to create on the GPU. Valid values are described in the
   * NVIDIA [mig user
   * guide](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/#partitioning).
   */
  gpuPartitionSize?: string;
  /**
   * The configuration for GPU sharing options.
   */
  gpuSharingConfig?: GPUSharingConfig;
}

function serializeAcceleratorConfig(data: any): AcceleratorConfig {
  return {
    ...data,
    acceleratorCount: data["acceleratorCount"] !== undefined ? String(data["acceleratorCount"]) : undefined,
    gpuSharingConfig: data["gpuSharingConfig"] !== undefined ? serializeGPUSharingConfig(data["gpuSharingConfig"]) : undefined,
  };
}

function deserializeAcceleratorConfig(data: any): AcceleratorConfig {
  return {
    ...data,
    acceleratorCount: data["acceleratorCount"] !== undefined ? BigInt(data["acceleratorCount"]) : undefined,
    gpuSharingConfig: data["gpuSharingConfig"] !== undefined ? deserializeGPUSharingConfig(data["gpuSharingConfig"]) : undefined,
  };
}

/**
 * Configuration for the addons that can be automatically spun up in the
 * cluster, enabling additional functionality.
 */
export interface AddonsConfig {
  /**
   * Configuration for the Cloud Run addon, which allows the user to use a
   * managed Knative service.
   */
  cloudRunConfig?: CloudRunConfig;
  /**
   * Configuration for the ConfigConnector add-on, a Kubernetes extension to
   * manage hosted GCP services through the Kubernetes API
   */
  configConnectorConfig?: ConfigConnectorConfig;
  /**
   * Configuration for NodeLocalDNS, a dns cache running on cluster nodes
   */
  dnsCacheConfig?: DnsCacheConfig;
  /**
   * Configuration for the Compute Engine Persistent Disk CSI driver.
   */
  gcePersistentDiskCsiDriverConfig?: GcePersistentDiskCsiDriverConfig;
  /**
   * Configuration for the GCP Filestore CSI driver.
   */
  gcpFilestoreCsiDriverConfig?: GcpFilestoreCsiDriverConfig;
  /**
   * Configuration for the Backup for GKE agent addon.
   */
  gkeBackupAgentConfig?: GkeBackupAgentConfig;
  /**
   * Configuration for the horizontal pod autoscaling feature, which increases
   * or decreases the number of replica pods a replication controller has based
   * on the resource usage of the existing pods.
   */
  horizontalPodAutoscaling?: HorizontalPodAutoscaling;
  /**
   * Configuration for the HTTP (L7) load balancing controller addon, which
   * makes it easy to set up HTTP load balancers for services in a cluster.
   */
  httpLoadBalancing?: HttpLoadBalancing;
  /**
   * Configuration for the Kubernetes Dashboard. This addon is deprecated, and
   * will be disabled in 1.15. It is recommended to use the Cloud Console to
   * manage and monitor your Kubernetes clusters, workloads and applications.
   * For more information, see:
   * https://cloud.google.com/kubernetes-engine/docs/concepts/dashboards
   */
  kubernetesDashboard?: KubernetesDashboard;
  /**
   * Configuration for NetworkPolicy. This only tracks whether the addon is
   * enabled or not on the Master, it does not track whether network policy is
   * enabled for the nodes.
   */
  networkPolicyConfig?: NetworkPolicyConfig;
}

/**
 * Specifies options for controlling advanced machine features.
 */
export interface AdvancedMachineFeatures {
  /**
   * The number of threads per physical core. To disable simultaneous
   * multithreading (SMT) set this to 1. If unset, the maximum number of threads
   * supported per core by the underlying processor is assumed.
   */
  threadsPerCore?: bigint;
}

function serializeAdvancedMachineFeatures(data: any): AdvancedMachineFeatures {
  return {
    ...data,
    threadsPerCore: data["threadsPerCore"] !== undefined ? String(data["threadsPerCore"]) : undefined,
  };
}

function deserializeAdvancedMachineFeatures(data: any): AdvancedMachineFeatures {
  return {
    ...data,
    threadsPerCore: data["threadsPerCore"] !== undefined ? BigInt(data["threadsPerCore"]) : undefined,
  };
}

/**
 * Configuration for returning group information from authenticators.
 */
export interface AuthenticatorGroupsConfig {
  /**
   * Whether this cluster should return group membership lookups during
   * authentication using a group of security groups.
   */
  enabled?: boolean;
  /**
   * The name of the security group-of-groups to be used. Only relevant if
   * enabled = true.
   */
  securityGroup?: string;
}

/**
 * Autopilot is the configuration for Autopilot settings on the cluster.
 */
export interface Autopilot {
  /**
   * Enable Autopilot
   */
  enabled?: boolean;
}

/**
 * AutoprovisioningNodePoolDefaults contains defaults for a node pool created
 * by NAP.
 */
export interface AutoprovisioningNodePoolDefaults {
  /**
   * The Customer Managed Encryption Key used to encrypt the boot disk attached
   * to each node in the node pool. This should be of the form
   * projects/[KEY_PROJECT_ID]/locations/[LOCATION]/keyRings/[RING_NAME]/cryptoKeys/[KEY_NAME].
   * For more information about protecting resources with Cloud KMS Keys please
   * see:
   * https://cloud.google.com/compute/docs/disks/customer-managed-encryption
   */
  bootDiskKmsKey?: string;
  /**
   * Size of the disk attached to each node, specified in GB. The smallest
   * allowed disk size is 10GB. If unspecified, the default disk size is 100GB.
   */
  diskSizeGb?: number;
  /**
   * Type of the disk attached to each node (e.g. 'pd-standard', 'pd-ssd' or
   * 'pd-balanced') If unspecified, the default disk type is 'pd-standard'
   */
  diskType?: string;
  /**
   * The image type to use for NAP created node. Please see
   * https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for
   * available image types.
   */
  imageType?: string;
  /**
   * Specifies the node management options for NAP created node-pools.
   */
  management?: NodeManagement;
  /**
   * Deprecated. Minimum CPU platform to be used for NAP created node pools.
   * The instance may be scheduled on the specified or newer CPU platform.
   * Applicable values are the friendly names of CPU platforms, such as
   * minCpuPlatform: Intel Haswell or minCpuPlatform: Intel Sandy Bridge. For
   * more information, read [how to specify min CPU
   * platform](https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform).
   * This field is deprecated, min_cpu_platform should be specified using
   * `cloud.google.com/requested-min-cpu-platform` label selector on the pod. To
   * unset the min cpu platform field pass "automatic" as field value.
   */
  minCpuPlatform?: string;
  /**
   * Scopes that are used by NAP when creating node pools.
   */
  oauthScopes?: string[];
  /**
   * The Google Cloud Platform Service Account to be used by the node VMs.
   */
  serviceAccount?: string;
  /**
   * Shielded Instance options.
   */
  shieldedInstanceConfig?: ShieldedInstanceConfig;
  /**
   * Specifies the upgrade settings for NAP created node pools
   */
  upgradeSettings?: UpgradeSettings;
}

function serializeAutoprovisioningNodePoolDefaults(data: any): AutoprovisioningNodePoolDefaults {
  return {
    ...data,
    upgradeSettings: data["upgradeSettings"] !== undefined ? serializeUpgradeSettings(data["upgradeSettings"]) : undefined,
  };
}

function deserializeAutoprovisioningNodePoolDefaults(data: any): AutoprovisioningNodePoolDefaults {
  return {
    ...data,
    upgradeSettings: data["upgradeSettings"] !== undefined ? deserializeUpgradeSettings(data["upgradeSettings"]) : undefined,
  };
}

/**
 * AutoUpgradeOptions defines the set of options for the user to control how
 * the Auto Upgrades will proceed.
 */
export interface AutoUpgradeOptions {
  /**
   * [Output only] This field is set when upgrades are about to commence with
   * the approximate start time for the upgrades, in
   * [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.
   */
  autoUpgradeStartTime?: string;
  /**
   * [Output only] This field is set when upgrades are about to commence with
   * the description of the upgrade.
   */
  description?: string;
}

/**
 * Parameters for using BigQuery as the destination of resource usage export.
 */
export interface BigQueryDestination {
  /**
   * The ID of a BigQuery Dataset.
   */
  datasetId?: string;
}

/**
 * Configuration for Binary Authorization.
 */
export interface BinaryAuthorization {
  /**
   * This field is deprecated. Leave this unset and instead configure
   * BinaryAuthorization using evaluation_mode. If evaluation_mode is set to
   * anything other than EVALUATION_MODE_UNSPECIFIED, this field is ignored.
   */
  enabled?: boolean;
  /**
   * Mode of operation for binauthz policy evaluation. If unspecified, defaults
   * to DISABLED.
   */
  evaluationMode?:  | "EVALUATION_MODE_UNSPECIFIED" | "DISABLED" | "PROJECT_SINGLETON_POLICY_ENFORCE";
}

/**
 * Information relevant to blue-green upgrade.
 */
export interface BlueGreenInfo {
  /**
   * The resource URLs of the [managed instance groups]
   * (/compute/docs/instance-groups/creating-groups-of-managed-instances)
   * associated with blue pool.
   */
  blueInstanceGroupUrls?: string[];
  /**
   * Time to start deleting blue pool to complete blue-green upgrade, in
   * [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.
   */
  bluePoolDeletionStartTime?: string;
  /**
   * The resource URLs of the [managed instance groups]
   * (/compute/docs/instance-groups/creating-groups-of-managed-instances)
   * associated with green pool.
   */
  greenInstanceGroupUrls?: string[];
  /**
   * Version of green pool.
   */
  greenPoolVersion?: string;
  /**
   * Current blue-green upgrade phase.
   */
  phase?:  | "PHASE_UNSPECIFIED" | "UPDATE_STARTED" | "CREATING_GREEN_POOL" | "CORDONING_BLUE_POOL" | "DRAINING_BLUE_POOL" | "NODE_POOL_SOAKING" | "DELETING_BLUE_POOL" | "ROLLBACK_STARTED";
}

/**
 * Settings for blue-green upgrade.
 */
export interface BlueGreenSettings {
  /**
   * Time needed after draining entire blue pool. After this period, blue pool
   * will be cleaned up.
   */
  nodePoolSoakDuration?: number /* Duration */;
  /**
   * Standard policy for the blue-green upgrade.
   */
  standardRolloutPolicy?: StandardRolloutPolicy;
}

function serializeBlueGreenSettings(data: any): BlueGreenSettings {
  return {
    ...data,
    nodePoolSoakDuration: data["nodePoolSoakDuration"] !== undefined ? data["nodePoolSoakDuration"] : undefined,
    standardRolloutPolicy: data["standardRolloutPolicy"] !== undefined ? serializeStandardRolloutPolicy(data["standardRolloutPolicy"]) : undefined,
  };
}

function deserializeBlueGreenSettings(data: any): BlueGreenSettings {
  return {
    ...data,
    nodePoolSoakDuration: data["nodePoolSoakDuration"] !== undefined ? data["nodePoolSoakDuration"] : undefined,
    standardRolloutPolicy: data["standardRolloutPolicy"] !== undefined ? deserializeStandardRolloutPolicy(data["standardRolloutPolicy"]) : undefined,
  };
}

/**
 * CancelOperationRequest cancels a single operation.
 */
export interface CancelOperationRequest {
  /**
   * The name (project, location, operation id) of the operation to cancel.
   * Specified in the format `projects/*\/locations/*\/operations/*`.
   */
  name?: string;
  /**
   * Deprecated. The server-assigned `name` of the operation. This field has
   * been deprecated and replaced by the name field.
   */
  operationId?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * operation resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * CidrBlock contains an optional name and one CIDR block.
 */
export interface CidrBlock {
  /**
   * cidr_block must be specified in CIDR notation.
   */
  cidrBlock?: string;
  /**
   * display_name is an optional field for users to identify CIDR blocks.
   */
  displayName?: string;
}

/**
 * Configuration for client certificates on the cluster.
 */
export interface ClientCertificateConfig {
  /**
   * Issue a client certificate.
   */
  issueClientCertificate?: boolean;
}

/**
 * Configuration options for the Cloud Run feature.
 */
export interface CloudRunConfig {
  /**
   * Whether Cloud Run addon is enabled for this cluster.
   */
  disabled?: boolean;
  /**
   * Which load balancer type is installed for Cloud Run.
   */
  loadBalancerType?:  | "LOAD_BALANCER_TYPE_UNSPECIFIED" | "LOAD_BALANCER_TYPE_EXTERNAL" | "LOAD_BALANCER_TYPE_INTERNAL";
}

/**
 * A Google Kubernetes Engine cluster.
 */
export interface Cluster {
  /**
   * Configurations for the various addons available to run in the cluster.
   */
  addonsConfig?: AddonsConfig;
  /**
   * Configuration controlling RBAC group membership information.
   */
  authenticatorGroupsConfig?: AuthenticatorGroupsConfig;
  /**
   * Autopilot configuration for the cluster.
   */
  autopilot?: Autopilot;
  /**
   * Cluster-level autoscaling configuration.
   */
  autoscaling?: ClusterAutoscaling;
  /**
   * Configuration for Binary Authorization.
   */
  binaryAuthorization?: BinaryAuthorization;
  /**
   * The IP address range of the container pods in this cluster, in
   * [CIDR](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
   * notation (e.g. `10.96.0.0/14`). Leave blank to have one automatically
   * chosen or specify a `/14` block in `10.0.0.0/8`.
   */
  clusterIpv4Cidr?: string;
  /**
   * Which conditions caused the current cluster state.
   */
  conditions?: StatusCondition[];
  /**
   * Configuration of Confidential Nodes. All the nodes in the cluster will be
   * Confidential VM once enabled.
   */
  confidentialNodes?: ConfidentialNodes;
  /**
   * Configuration for the fine-grained cost management feature.
   */
  costManagementConfig?: CostManagementConfig;
  /**
   * [Output only] The time the cluster was created, in
   * [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.
   */
  createTime?: string;
  /**
   * [Output only] The current software version of the master endpoint.
   */
  currentMasterVersion?: string;
  /**
   * [Output only] The number of nodes currently in the cluster. Deprecated.
   * Call Kubernetes API directly to retrieve node information.
   */
  currentNodeCount?: number;
  /**
   * [Output only] Deprecated, use
   * [NodePools.version](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools)
   * instead. The current version of the node software components. If they are
   * currently at multiple versions because they're in the process of being
   * upgraded, this reflects the minimum version of all nodes.
   */
  currentNodeVersion?: string;
  /**
   * Configuration of etcd encryption.
   */
  databaseEncryption?: DatabaseEncryption;
  /**
   * The default constraint on the maximum number of pods that can be run
   * simultaneously on a node in the node pool of this cluster. Only honored if
   * cluster created with IP Alias support.
   */
  defaultMaxPodsConstraint?: MaxPodsConstraint;
  /**
   * An optional description of this cluster.
   */
  description?: string;
  /**
   * Kubernetes alpha features are enabled on this cluster. This includes alpha
   * API groups (e.g. v1alpha1) and features that may not be production ready in
   * the kubernetes version of the master and nodes. The cluster has no SLA for
   * uptime and master/node upgrades are disabled. Alpha enabled clusters are
   * automatically deleted thirty days after creation.
   */
  enableKubernetesAlpha?: boolean;
  /**
   * Enable the ability to use Cloud TPUs in this cluster.
   */
  enableTpu?: boolean;
  /**
   * [Output only] The IP address of this cluster's master endpoint. The
   * endpoint can be accessed from the internet at
   * `https://username:password@endpoint/`. See the `masterAuth` property of
   * this resource for username and password information.
   */
  endpoint?: string;
  /**
   * This checksum is computed by the server based on the value of cluster
   * fields, and may be sent on update requests to ensure the client has an
   * up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * [Output only] The time the cluster will be automatically deleted in
   * [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.
   */
  expireTime?: string;
  /**
   * Output only. Unique id for the cluster.
   */
  readonly id?: string;
  /**
   * Configuration for Identity Service component.
   */
  identityServiceConfig?: IdentityServiceConfig;
  /**
   * The initial Kubernetes version for this cluster. Valid versions are those
   * found in validMasterVersions returned by getServerConfig. The version can
   * be upgraded over time; such upgrades are reflected in currentMasterVersion
   * and currentNodeVersion. Users may specify either explicit versions offered
   * by Kubernetes Engine or version aliases, which have the following behavior:
   * - "latest": picks the highest valid Kubernetes version - "1.X": picks the
   * highest valid patch+gke.N patch in the 1.X version - "1.X.Y": picks the
   * highest valid gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an
   * explicit Kubernetes version - "","-": picks the default Kubernetes version
   */
  initialClusterVersion?: string;
  /**
   * The number of nodes to create in this cluster. You must ensure that your
   * Compute Engine [resource quota](https://cloud.google.com/compute/quotas) is
   * sufficient for this number of instances. You must also have available
   * firewall and routes quota. For requests, this field should only be used in
   * lieu of a "node_pool" object, since this configuration (along with the
   * "node_config") will be used to create a "NodePool" object with an
   * auto-generated name. Do not use this and a node_pool at the same time. This
   * field is deprecated, use node_pool.initial_node_count instead.
   */
  initialNodeCount?: number;
  /**
   * Deprecated. Use node_pools.instance_group_urls.
   */
  instanceGroupUrls?: string[];
  /**
   * Configuration for cluster IP allocation.
   */
  ipAllocationPolicy?: IPAllocationPolicy;
  /**
   * The fingerprint of the set of labels for this cluster.
   */
  labelFingerprint?: string;
  /**
   * Configuration for the legacy ABAC authorization mode.
   */
  legacyAbac?: LegacyAbac;
  /**
   * [Output only] The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones#available)
   * or
   * [region](https://cloud.google.com/compute/docs/regions-zones/regions-zones#available)
   * in which the cluster resides.
   */
  location?: string;
  /**
   * The list of Google Compute Engine
   * [zones](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster's nodes should be located. This field provides a default value if
   * [NodePool.Locations](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools#NodePool.FIELDS.locations)
   * are not specified during node pool creation. Warning: changing cluster
   * locations will update the
   * [NodePool.Locations](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters.nodePools#NodePool.FIELDS.locations)
   * of all node pools and will result in nodes being added and/or removed.
   */
  locations?: string[];
  /**
   * Logging configuration for the cluster.
   */
  loggingConfig?: LoggingConfig;
  /**
   * The logging service the cluster should use to write logs. Currently
   * available options: * `logging.googleapis.com/kubernetes` - The Cloud
   * Logging service with a Kubernetes-native resource model *
   * `logging.googleapis.com` - The legacy Cloud Logging service (no longer
   * available as of GKE 1.15). * `none` - no logs will be exported from the
   * cluster. If left as an empty string,`logging.googleapis.com/kubernetes`
   * will be used for GKE 1.14+ or `logging.googleapis.com` for earlier
   * versions.
   */
  loggingService?: string;
  /**
   * Configure the maintenance policy for this cluster.
   */
  maintenancePolicy?: MaintenancePolicy;
  /**
   * The authentication information for accessing the master endpoint. If
   * unspecified, the defaults are used: For clusters before v1.12, if
   * master_auth is unspecified, `username` will be set to "admin", a random
   * password will be generated, and a client certificate will be issued.
   */
  masterAuth?: MasterAuth;
  /**
   * The configuration options for master authorized networks feature.
   */
  masterAuthorizedNetworksConfig?: MasterAuthorizedNetworksConfig;
  /**
   * Configuration for issuance of mTLS keys and certificates to Kubernetes
   * pods.
   */
  meshCertificates?: MeshCertificates;
  /**
   * Monitoring configuration for the cluster.
   */
  monitoringConfig?: MonitoringConfig;
  /**
   * The monitoring service the cluster should use to write metrics. Currently
   * available options: * "monitoring.googleapis.com/kubernetes" - The Cloud
   * Monitoring service with a Kubernetes-native resource model *
   * `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no
   * longer available as of GKE 1.15). * `none` - No metrics will be exported
   * from the cluster. If left as an empty
   * string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or
   * `monitoring.googleapis.com` for earlier versions.
   */
  monitoringService?: string;
  /**
   * The name of this cluster. The name must be unique within this project and
   * location (e.g. zone or region), and can be up to 40 characters with the
   * following restrictions: * Lowercase letters, numbers, and hyphens only. *
   * Must start with a letter. * Must end with a number or a letter.
   */
  name?: string;
  /**
   * The name of the Google Compute Engine
   * [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks)
   * to which the cluster is connected. If left unspecified, the `default`
   * network will be used.
   */
  network?: string;
  /**
   * Configuration for cluster networking.
   */
  networkConfig?: NetworkConfig;
  /**
   * Configuration options for the NetworkPolicy feature.
   */
  networkPolicy?: NetworkPolicy;
  /**
   * Parameters used in creating the cluster's nodes. For requests, this field
   * should only be used in lieu of a "node_pool" object, since this
   * configuration (along with the "initial_node_count") will be used to create
   * a "NodePool" object with an auto-generated name. Do not use this and a
   * node_pool at the same time. For responses, this field will be populated
   * with the node configuration of the first node pool. (For configuration of
   * each node pool, see `node_pool.config`) If unspecified, the defaults are
   * used. This field is deprecated, use node_pool.config instead.
   */
  nodeConfig?: NodeConfig;
  /**
   * [Output only] The size of the address space on each node for hosting
   * containers. This is provisioned from within the `container_ipv4_cidr`
   * range. This field will only be set when cluster is in route-based network
   * mode.
   */
  nodeIpv4CidrSize?: number;
  /**
   * Node pool configs that apply to all auto-provisioned node pools in
   * autopilot clusters and node auto-provisioning enabled clusters.
   */
  nodePoolAutoConfig?: NodePoolAutoConfig;
  /**
   * Default NodePool settings for the entire cluster. These settings are
   * overridden if specified on the specific NodePool object.
   */
  nodePoolDefaults?: NodePoolDefaults;
  /**
   * The node pools associated with this cluster. This field should not be set
   * if "node_config" or "initial_node_count" are specified.
   */
  nodePools?: NodePool[];
  /**
   * Notification configuration of the cluster.
   */
  notificationConfig?: NotificationConfig;
  /**
   * Configuration for private cluster.
   */
  privateClusterConfig?: PrivateClusterConfig;
  /**
   * Release channel configuration.
   */
  releaseChannel?: ReleaseChannel;
  /**
   * The resource labels for the cluster to use to annotate any related Google
   * Compute Engine resources.
   */
  resourceLabels?: {
    [key: string]: string
  };
  /**
   * Configuration for exporting resource usages. Resource usage export is
   * disabled when this config is unspecified.
   */
  resourceUsageExportConfig?: ResourceUsageExportConfig;
  /**
   * [Output only] Server-defined URL for the resource.
   */
  selfLink?: string;
  /**
   * [Output only] The IP address range of the Kubernetes services in this
   * cluster, in
   * [CIDR](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
   * notation (e.g. `1.2.3.4/29`). Service addresses are typically put in the
   * last `/16` from the container CIDR.
   */
  servicesIpv4Cidr?: string;
  /**
   * Shielded Nodes configuration.
   */
  shieldedNodes?: ShieldedNodes;
  /**
   * [Output only] The current status of this cluster.
   */
  status?:  | "STATUS_UNSPECIFIED" | "PROVISIONING" | "RUNNING" | "RECONCILING" | "STOPPING" | "ERROR" | "DEGRADED";
  /**
   * [Output only] Deprecated. Use conditions instead. Additional information
   * about the current status of this cluster, if available.
   */
  statusMessage?: string;
  /**
   * The name of the Google Compute Engine
   * [subnetwork](https://cloud.google.com/compute/docs/subnetworks) to which
   * the cluster is connected.
   */
  subnetwork?: string;
  /**
   * [Output only] The IP address range of the Cloud TPUs in this cluster, in
   * [CIDR](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
   * notation (e.g. `1.2.3.4/29`).
   */
  tpuIpv4CidrBlock?: string;
  /**
   * Cluster-level Vertical Pod Autoscaling configuration.
   */
  verticalPodAutoscaling?: VerticalPodAutoscaling;
  /**
   * Configuration for the use of Kubernetes Service Accounts in GCP IAM
   * policies.
   */
  workloadIdentityConfig?: WorkloadIdentityConfig;
  /**
   * [Output only] The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field is deprecated, use location instead.
   */
  zone?: string;
}

function serializeCluster(data: any): Cluster {
  return {
    ...data,
    autoscaling: data["autoscaling"] !== undefined ? serializeClusterAutoscaling(data["autoscaling"]) : undefined,
    defaultMaxPodsConstraint: data["defaultMaxPodsConstraint"] !== undefined ? serializeMaxPodsConstraint(data["defaultMaxPodsConstraint"]) : undefined,
    maintenancePolicy: data["maintenancePolicy"] !== undefined ? serializeMaintenancePolicy(data["maintenancePolicy"]) : undefined,
    nodeConfig: data["nodeConfig"] !== undefined ? serializeNodeConfig(data["nodeConfig"]) : undefined,
    nodePools: data["nodePools"] !== undefined ? data["nodePools"].map((item: any) => (serializeNodePool(item))) : undefined,
  };
}

function deserializeCluster(data: any): Cluster {
  return {
    ...data,
    autoscaling: data["autoscaling"] !== undefined ? deserializeClusterAutoscaling(data["autoscaling"]) : undefined,
    defaultMaxPodsConstraint: data["defaultMaxPodsConstraint"] !== undefined ? deserializeMaxPodsConstraint(data["defaultMaxPodsConstraint"]) : undefined,
    maintenancePolicy: data["maintenancePolicy"] !== undefined ? deserializeMaintenancePolicy(data["maintenancePolicy"]) : undefined,
    nodeConfig: data["nodeConfig"] !== undefined ? deserializeNodeConfig(data["nodeConfig"]) : undefined,
    nodePools: data["nodePools"] !== undefined ? data["nodePools"].map((item: any) => (deserializeNodePool(item))) : undefined,
  };
}

/**
 * ClusterAutoscaling contains global, per-cluster information required by
 * Cluster Autoscaler to automatically adjust the size of the cluster and
 * create/delete node pools based on the current needs.
 */
export interface ClusterAutoscaling {
  /**
   * The list of Google Compute Engine
   * [zones](https://cloud.google.com/compute/docs/zones#available) in which the
   * NodePool's nodes can be created by NAP.
   */
  autoprovisioningLocations?: string[];
  /**
   * AutoprovisioningNodePoolDefaults contains defaults for a node pool created
   * by NAP.
   */
  autoprovisioningNodePoolDefaults?: AutoprovisioningNodePoolDefaults;
  /**
   * Defines autoscaling behaviour.
   */
  autoscalingProfile?:  | "PROFILE_UNSPECIFIED" | "OPTIMIZE_UTILIZATION" | "BALANCED";
  /**
   * Enables automatic node pool creation and deletion.
   */
  enableNodeAutoprovisioning?: boolean;
  /**
   * Contains global constraints regarding minimum and maximum amount of
   * resources in the cluster.
   */
  resourceLimits?: ResourceLimit[];
}

function serializeClusterAutoscaling(data: any): ClusterAutoscaling {
  return {
    ...data,
    autoprovisioningNodePoolDefaults: data["autoprovisioningNodePoolDefaults"] !== undefined ? serializeAutoprovisioningNodePoolDefaults(data["autoprovisioningNodePoolDefaults"]) : undefined,
    resourceLimits: data["resourceLimits"] !== undefined ? data["resourceLimits"].map((item: any) => (serializeResourceLimit(item))) : undefined,
  };
}

function deserializeClusterAutoscaling(data: any): ClusterAutoscaling {
  return {
    ...data,
    autoprovisioningNodePoolDefaults: data["autoprovisioningNodePoolDefaults"] !== undefined ? deserializeAutoprovisioningNodePoolDefaults(data["autoprovisioningNodePoolDefaults"]) : undefined,
    resourceLimits: data["resourceLimits"] !== undefined ? data["resourceLimits"].map((item: any) => (deserializeResourceLimit(item))) : undefined,
  };
}

/**
 * ClusterUpdate describes an update to the cluster. Exactly one update can be
 * applied to a cluster with each request, so at most one field can be provided.
 */
export interface ClusterUpdate {
  /**
   * Configurations for the various addons available to run in the cluster.
   */
  desiredAddonsConfig?: AddonsConfig;
  /**
   * The desired authenticator groups config for the cluster.
   */
  desiredAuthenticatorGroupsConfig?: AuthenticatorGroupsConfig;
  /**
   * The desired configuration options for the Binary Authorization feature.
   */
  desiredBinaryAuthorization?: BinaryAuthorization;
  /**
   * Cluster-level autoscaling configuration.
   */
  desiredClusterAutoscaling?: ClusterAutoscaling;
  /**
   * The desired configuration for the fine-grained cost management feature.
   */
  desiredCostManagementConfig?: CostManagementConfig;
  /**
   * Configuration of etcd encryption.
   */
  desiredDatabaseEncryption?: DatabaseEncryption;
  /**
   * The desired datapath provider for the cluster.
   */
  desiredDatapathProvider?:  | "DATAPATH_PROVIDER_UNSPECIFIED" | "LEGACY_DATAPATH" | "ADVANCED_DATAPATH";
  /**
   * The desired status of whether to disable default sNAT for this cluster.
   */
  desiredDefaultSnatStatus?: DefaultSnatStatus;
  /**
   * DNSConfig contains clusterDNS config for this cluster.
   */
  desiredDnsConfig?: DNSConfig;
  /**
   * Enable/Disable private endpoint for the cluster's master.
   */
  desiredEnablePrivateEndpoint?: boolean;
  /**
   * The desired config of Gateway API on this cluster.
   */
  desiredGatewayApiConfig?: GatewayAPIConfig;
  /**
   * The desired GCFS config for the cluster
   */
  desiredGcfsConfig?: GcfsConfig;
  /**
   * The desired Identity Service component configuration.
   */
  desiredIdentityServiceConfig?: IdentityServiceConfig;
  /**
   * The desired image type for the node pool. NOTE: Set the
   * "desired_node_pool" field as well.
   */
  desiredImageType?: string;
  /**
   * The desired config of Intra-node visibility.
   */
  desiredIntraNodeVisibilityConfig?: IntraNodeVisibilityConfig;
  /**
   * The desired L4 Internal Load Balancer Subsetting configuration.
   */
  desiredL4ilbSubsettingConfig?: ILBSubsettingConfig;
  /**
   * The desired list of Google Compute Engine
   * [zones](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster's nodes should be located. This list must always include the
   * cluster's primary zone. Warning: changing cluster locations will update the
   * locations of all node pools and will result in nodes being added and/or
   * removed.
   */
  desiredLocations?: string[];
  /**
   * The desired logging configuration.
   */
  desiredLoggingConfig?: LoggingConfig;
  /**
   * The logging service the cluster should use to write logs. Currently
   * available options: * `logging.googleapis.com/kubernetes` - The Cloud
   * Logging service with a Kubernetes-native resource model *
   * `logging.googleapis.com` - The legacy Cloud Logging service (no longer
   * available as of GKE 1.15). * `none` - no logs will be exported from the
   * cluster. If left as an empty string,`logging.googleapis.com/kubernetes`
   * will be used for GKE 1.14+ or `logging.googleapis.com` for earlier
   * versions.
   */
  desiredLoggingService?: string;
  /**
   * The desired configuration options for master authorized networks feature.
   */
  desiredMasterAuthorizedNetworksConfig?: MasterAuthorizedNetworksConfig;
  /**
   * The Kubernetes version to change the master to. Users may specify either
   * explicit versions offered by Kubernetes Engine or version aliases, which
   * have the following behavior: - "latest": picks the highest valid Kubernetes
   * version - "1.X": picks the highest valid patch+gke.N patch in the 1.X
   * version - "1.X.Y": picks the highest valid gke.N patch in the 1.X.Y version
   * - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-": picks the
   * default Kubernetes version
   */
  desiredMasterVersion?: string;
  /**
   * Configuration for issuance of mTLS keys and certificates to Kubernetes
   * pods.
   */
  desiredMeshCertificates?: MeshCertificates;
  /**
   * The desired monitoring configuration.
   */
  desiredMonitoringConfig?: MonitoringConfig;
  /**
   * The monitoring service the cluster should use to write metrics. Currently
   * available options: * "monitoring.googleapis.com/kubernetes" - The Cloud
   * Monitoring service with a Kubernetes-native resource model *
   * `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no
   * longer available as of GKE 1.15). * `none` - No metrics will be exported
   * from the cluster. If left as an empty
   * string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or
   * `monitoring.googleapis.com` for earlier versions.
   */
  desiredMonitoringService?: string;
  /**
   * The desired network tags that apply to all auto-provisioned node pools in
   * autopilot clusters and node auto-provisioning enabled clusters.
   */
  desiredNodePoolAutoConfigNetworkTags?: NetworkTags;
  /**
   * Autoscaler configuration for the node pool specified in
   * desired_node_pool_id. If there is only one pool in the cluster and
   * desired_node_pool_id is not provided then the change applies to that single
   * node pool.
   */
  desiredNodePoolAutoscaling?: NodePoolAutoscaling;
  /**
   * The node pool to be upgraded. This field is mandatory if
   * "desired_node_version", "desired_image_family" or
   * "desired_node_pool_autoscaling" is specified and there is more than one
   * node pool on the cluster.
   */
  desiredNodePoolId?: string;
  /**
   * The desired node pool logging configuration defaults for the cluster.
   */
  desiredNodePoolLoggingConfig?: NodePoolLoggingConfig;
  /**
   * The Kubernetes version to change the nodes to (typically an upgrade).
   * Users may specify either explicit versions offered by Kubernetes Engine or
   * version aliases, which have the following behavior: - "latest": picks the
   * highest valid Kubernetes version - "1.X": picks the highest valid
   * patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid
   * gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit
   * Kubernetes version - "-": picks the Kubernetes master version
   */
  desiredNodeVersion?: string;
  /**
   * The desired notification configuration.
   */
  desiredNotificationConfig?: NotificationConfig;
  /**
   * The desired private cluster configuration.
   */
  desiredPrivateClusterConfig?: PrivateClusterConfig;
  /**
   * The desired state of IPv6 connectivity to Google Services.
   */
  desiredPrivateIpv6GoogleAccess?:  | "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED" | "PRIVATE_IPV6_GOOGLE_ACCESS_DISABLED" | "PRIVATE_IPV6_GOOGLE_ACCESS_TO_GOOGLE" | "PRIVATE_IPV6_GOOGLE_ACCESS_BIDIRECTIONAL";
  /**
   * The desired release channel configuration.
   */
  desiredReleaseChannel?: ReleaseChannel;
  /**
   * The desired configuration for exporting resource usage.
   */
  desiredResourceUsageExportConfig?: ResourceUsageExportConfig;
  /**
   * ServiceExternalIPsConfig specifies the config for the use of Services with
   * ExternalIPs field.
   */
  desiredServiceExternalIpsConfig?: ServiceExternalIPsConfig;
  /**
   * Configuration for Shielded Nodes.
   */
  desiredShieldedNodes?: ShieldedNodes;
  /**
   * The desired stack type of the cluster. If a stack type is provided and
   * does not match the current stack type of the cluster, update will attempt
   * to change the stack type to the new type.
   */
  desiredStackType?:  | "STACK_TYPE_UNSPECIFIED" | "IPV4" | "IPV4_IPV6";
  /**
   * Cluster-level Vertical Pod Autoscaling configuration.
   */
  desiredVerticalPodAutoscaling?: VerticalPodAutoscaling;
  /**
   * Configuration for Workload Identity.
   */
  desiredWorkloadIdentityConfig?: WorkloadIdentityConfig;
  /**
   * The current etag of the cluster. If an etag is provided and does not match
   * the current etag of the cluster, update will be blocked and an ABORTED
   * error will be returned.
   */
  etag?: string;
}

function serializeClusterUpdate(data: any): ClusterUpdate {
  return {
    ...data,
    desiredClusterAutoscaling: data["desiredClusterAutoscaling"] !== undefined ? serializeClusterAutoscaling(data["desiredClusterAutoscaling"]) : undefined,
  };
}

function deserializeClusterUpdate(data: any): ClusterUpdate {
  return {
    ...data,
    desiredClusterAutoscaling: data["desiredClusterAutoscaling"] !== undefined ? deserializeClusterAutoscaling(data["desiredClusterAutoscaling"]) : undefined,
  };
}

/**
 * CompleteIPRotationRequest moves the cluster master back into single-IP mode.
 */
export interface CompleteIPRotationRequest {
  /**
   * Deprecated. The name of the cluster. This field has been deprecated and
   * replaced by the name field.
   */
  clusterId?: string;
  /**
   * The name (project, location, cluster name) of the cluster to complete IP
   * rotation. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * CompleteNodePoolUpgradeRequest sets the name of target node pool to complete
 * upgrade.
 */
export interface CompleteNodePoolUpgradeRequest {
}

/**
 * ConfidentialNodes is configuration for the confidential nodes feature, which
 * makes nodes run on confidential VMs.
 */
export interface ConfidentialNodes {
  /**
   * Whether Confidential Nodes feature is enabled.
   */
  enabled?: boolean;
}

/**
 * Configuration options for the Config Connector add-on.
 */
export interface ConfigConnectorConfig {
  /**
   * Whether Cloud Connector is enabled for this cluster.
   */
  enabled?: boolean;
}

/**
 * Parameters for controlling consumption metering.
 */
export interface ConsumptionMeteringConfig {
  /**
   * Whether to enable consumption metering for this cluster. If enabled, a
   * second BigQuery table will be created to hold resource consumption records.
   */
  enabled?: boolean;
}

/**
 * Configuration for fine-grained cost management feature.
 */
export interface CostManagementConfig {
  /**
   * Whether the feature is enabled or not.
   */
  enabled?: boolean;
}

/**
 * CreateClusterRequest creates a cluster.
 */
export interface CreateClusterRequest {
  /**
   * Required. A [cluster
   * resource](https://cloud.google.com/container-engine/reference/rest/v1/projects.locations.clusters)
   */
  cluster?: Cluster;
  /**
   * The parent (project and location) where the cluster will be created.
   * Specified in the format `projects/*\/locations/*`.
   */
  parent?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the parent field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the parent
   * field.
   */
  zone?: string;
}

function serializeCreateClusterRequest(data: any): CreateClusterRequest {
  return {
    ...data,
    cluster: data["cluster"] !== undefined ? serializeCluster(data["cluster"]) : undefined,
  };
}

function deserializeCreateClusterRequest(data: any): CreateClusterRequest {
  return {
    ...data,
    cluster: data["cluster"] !== undefined ? deserializeCluster(data["cluster"]) : undefined,
  };
}

/**
 * CreateNodePoolRequest creates a node pool for a cluster.
 */
export interface CreateNodePoolRequest {
  /**
   * Deprecated. The name of the cluster. This field has been deprecated and
   * replaced by the parent field.
   */
  clusterId?: string;
  /**
   * Required. The node pool to create.
   */
  nodePool?: NodePool;
  /**
   * The parent (project, location, cluster name) where the node pool will be
   * created. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  parent?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the parent field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the parent
   * field.
   */
  zone?: string;
}

function serializeCreateNodePoolRequest(data: any): CreateNodePoolRequest {
  return {
    ...data,
    nodePool: data["nodePool"] !== undefined ? serializeNodePool(data["nodePool"]) : undefined,
  };
}

function deserializeCreateNodePoolRequest(data: any): CreateNodePoolRequest {
  return {
    ...data,
    nodePool: data["nodePool"] !== undefined ? deserializeNodePool(data["nodePool"]) : undefined,
  };
}

/**
 * Time window specified for daily maintenance operations.
 */
export interface DailyMaintenanceWindow {
  /**
   * [Output only] Duration of the time window, automatically chosen to be
   * smallest possible in the given scenario. Duration will be in
   * [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) format "PTnHnMnS".
   */
  duration?: string;
  /**
   * Time within the maintenance window to start the maintenance operations.
   * Time format should be in [RFC3339](https://www.ietf.org/rfc/rfc3339.txt)
   * format "HH:MM", where HH : [00-23] and MM : [00-59] GMT.
   */
  startTime?: string;
}

/**
 * Configuration of etcd encryption.
 */
export interface DatabaseEncryption {
  /**
   * Name of CloudKMS key to use for the encryption of secrets in etcd. Ex.
   * projects/my-project/locations/global/keyRings/my-ring/cryptoKeys/my-key
   */
  keyName?: string;
  /**
   * Denotes the state of etcd encryption.
   */
  state?:  | "UNKNOWN" | "ENCRYPTED" | "DECRYPTED";
}

/**
 * DefaultSnatStatus contains the desired state of whether default sNAT should
 * be disabled on the cluster.
 */
export interface DefaultSnatStatus {
  /**
   * Disables cluster default sNAT rules.
   */
  disabled?: boolean;
}

/**
 * Configuration for NodeLocal DNSCache
 */
export interface DnsCacheConfig {
  /**
   * Whether NodeLocal DNSCache is enabled for this cluster.
   */
  enabled?: boolean;
}

/**
 * DNSConfig contains the desired set of options for configuring clusterDNS.
 */
export interface DNSConfig {
  /**
   * cluster_dns indicates which in-cluster DNS provider should be used.
   */
  clusterDns?:  | "PROVIDER_UNSPECIFIED" | "PLATFORM_DEFAULT" | "CLOUD_DNS";
  /**
   * cluster_dns_domain is the suffix used for all cluster service records.
   */
  clusterDnsDomain?: string;
  /**
   * cluster_dns_scope indicates the scope of access to cluster DNS records.
   */
  clusterDnsScope?:  | "DNS_SCOPE_UNSPECIFIED" | "CLUSTER_SCOPE" | "VPC_SCOPE";
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
 * EphemeralStorageLocalSsdConfig contains configuration for the node ephemeral
 * storage using Local SSD.
 */
export interface EphemeralStorageLocalSsdConfig {
  /**
   * Number of local SSDs to use to back ephemeral storage. Uses NVMe
   * interfaces. Each local SSD is 375 GB in size. If zero, it means to disable
   * using local SSDs as ephemeral storage. The limit for this value is
   * dependent upon the maximum number of disks available on a machine per zone.
   * See: https://cloud.google.com/compute/docs/disks/local-ssd for more
   * information.
   */
  localSsdCount?: number;
}

/**
 * Configuration of Fast Socket feature.
 */
export interface FastSocket {
  /**
   * Whether Fast Socket features are enabled in the node pool.
   */
  enabled?: boolean;
}

/**
 * Allows filtering to one or more specific event types. If event types are
 * present, those and only those event types will be transmitted to the cluster.
 * Other types will be skipped. If no filter is specified, or no event types are
 * present, all event types will be sent
 */
export interface Filter {
  /**
   * Event types to allowlist.
   */
  eventType?:  | "EVENT_TYPE_UNSPECIFIED" | "UPGRADE_AVAILABLE_EVENT" | "UPGRADE_EVENT" | "SECURITY_BULLETIN_EVENT"[];
}

/**
 * GatewayAPIConfig contains the desired config of Gateway API on this cluster.
 */
export interface GatewayAPIConfig {
  /**
   * The Gateway API release channel to use for Gateway API.
   */
  channel?:  | "CHANNEL_UNSPECIFIED" | "CHANNEL_DISABLED" | "CHANNEL_EXPERIMENTAL" | "CHANNEL_STANDARD";
}

/**
 * Configuration for the Compute Engine PD CSI driver.
 */
export interface GcePersistentDiskCsiDriverConfig {
  /**
   * Whether the Compute Engine PD CSI driver is enabled for this cluster.
   */
  enabled?: boolean;
}

/**
 * GcfsConfig contains configurations of Google Container File System (image
 * streaming).
 */
export interface GcfsConfig {
  /**
   * Whether to use GCFS.
   */
  enabled?: boolean;
}

/**
 * Configuration for the GCP Filestore CSI driver.
 */
export interface GcpFilestoreCsiDriverConfig {
  /**
   * Whether the GCP Filestore CSI driver is enabled for this cluster.
   */
  enabled?: boolean;
}

/**
 * GetJSONWebKeysResponse is a valid JSON Web Key Set as specififed in rfc 7517
 */
export interface GetJSONWebKeysResponse {
  /**
   * OnePlatform automatically extracts this field and uses it to set the HTTP
   * Cache-Control header.
   */
  cacheHeader?: HttpCacheControlResponseHeader;
  /**
   * The public component of the keys used by the cluster to sign token
   * requests.
   */
  keys?: Jwk[];
}

function serializeGetJSONWebKeysResponse(data: any): GetJSONWebKeysResponse {
  return {
    ...data,
    cacheHeader: data["cacheHeader"] !== undefined ? serializeHttpCacheControlResponseHeader(data["cacheHeader"]) : undefined,
  };
}

function deserializeGetJSONWebKeysResponse(data: any): GetJSONWebKeysResponse {
  return {
    ...data,
    cacheHeader: data["cacheHeader"] !== undefined ? deserializeHttpCacheControlResponseHeader(data["cacheHeader"]) : undefined,
  };
}

/**
 * GetOpenIDConfigResponse is an OIDC discovery document for the cluster. See
 * the OpenID Connect Discovery 1.0 specification for details.
 */
export interface GetOpenIDConfigResponse {
  /**
   * OnePlatform automatically extracts this field and uses it to set the HTTP
   * Cache-Control header.
   */
  cacheHeader?: HttpCacheControlResponseHeader;
  /**
   * Supported claims.
   */
  claims_supported?: string[];
  /**
   * Supported grant types.
   */
  grant_types?: string[];
  /**
   * supported ID Token signing Algorithms.
   */
  id_token_signing_alg_values_supported?: string[];
  /**
   * OIDC Issuer.
   */
  issuer?: string;
  /**
   * JSON Web Key uri.
   */
  jwks_uri?: string;
  /**
   * Supported response types.
   */
  response_types_supported?: string[];
  /**
   * Supported subject types.
   */
  subject_types_supported?: string[];
}

function serializeGetOpenIDConfigResponse(data: any): GetOpenIDConfigResponse {
  return {
    ...data,
    cacheHeader: data["cacheHeader"] !== undefined ? serializeHttpCacheControlResponseHeader(data["cacheHeader"]) : undefined,
  };
}

function deserializeGetOpenIDConfigResponse(data: any): GetOpenIDConfigResponse {
  return {
    ...data,
    cacheHeader: data["cacheHeader"] !== undefined ? deserializeHttpCacheControlResponseHeader(data["cacheHeader"]) : undefined,
  };
}

/**
 * Configuration for the Backup for GKE Agent.
 */
export interface GkeBackupAgentConfig {
  /**
   * Whether the Backup for GKE agent is enabled for this cluster.
   */
  enabled?: boolean;
}

/**
 * GPUSharingConfig represents the GPU sharing configuration for Hardware
 * Accelerators.
 */
export interface GPUSharingConfig {
  /**
   * The type of GPU sharing strategy to enable on the GPU node.
   */
  gpuSharingStrategy?:  | "GPU_SHARING_STRATEGY_UNSPECIFIED" | "TIME_SHARING";
  /**
   * The max number of containers that can share a physical GPU.
   */
  maxSharedClientsPerGpu?: bigint;
}

function serializeGPUSharingConfig(data: any): GPUSharingConfig {
  return {
    ...data,
    maxSharedClientsPerGpu: data["maxSharedClientsPerGpu"] !== undefined ? String(data["maxSharedClientsPerGpu"]) : undefined,
  };
}

function deserializeGPUSharingConfig(data: any): GPUSharingConfig {
  return {
    ...data,
    maxSharedClientsPerGpu: data["maxSharedClientsPerGpu"] !== undefined ? BigInt(data["maxSharedClientsPerGpu"]) : undefined,
  };
}

/**
 * Configuration options for the horizontal pod autoscaling feature, which
 * increases or decreases the number of replica pods a replication controller
 * has based on the resource usage of the existing pods.
 */
export interface HorizontalPodAutoscaling {
  /**
   * Whether the Horizontal Pod Autoscaling feature is enabled in the cluster.
   * When enabled, it ensures that metrics are collected into Stackdriver
   * Monitoring.
   */
  disabled?: boolean;
}

/**
 * RFC-2616: cache control support
 */
export interface HttpCacheControlResponseHeader {
  /**
   * 14.6 response cache age, in seconds since the response is generated
   */
  age?: bigint;
  /**
   * 14.9 request and response directives
   */
  directive?: string;
  /**
   * 14.21 response cache expires, in RFC 1123 date format
   */
  expires?: string;
}

function serializeHttpCacheControlResponseHeader(data: any): HttpCacheControlResponseHeader {
  return {
    ...data,
    age: data["age"] !== undefined ? String(data["age"]) : undefined,
  };
}

function deserializeHttpCacheControlResponseHeader(data: any): HttpCacheControlResponseHeader {
  return {
    ...data,
    age: data["age"] !== undefined ? BigInt(data["age"]) : undefined,
  };
}

/**
 * Configuration options for the HTTP (L7) load balancing controller addon,
 * which makes it easy to set up HTTP load balancers for services in a cluster.
 */
export interface HttpLoadBalancing {
  /**
   * Whether the HTTP Load Balancing controller is enabled in the cluster. When
   * enabled, it runs a small pod in the cluster that manages the load
   * balancers.
   */
  disabled?: boolean;
}

/**
 * IdentityServiceConfig is configuration for Identity Service which allows
 * customers to use external identity providers with the K8S API
 */
export interface IdentityServiceConfig {
  /**
   * Whether to enable the Identity Service component
   */
  enabled?: boolean;
}

/**
 * ILBSubsettingConfig contains the desired config of L4 Internal LoadBalancer
 * subsetting on this cluster.
 */
export interface ILBSubsettingConfig {
  /**
   * Enables l4 ILB subsetting for this cluster.
   */
  enabled?: boolean;
}

/**
 * IntraNodeVisibilityConfig contains the desired config of the intra-node
 * visibility on this cluster.
 */
export interface IntraNodeVisibilityConfig {
  /**
   * Enables intra node visibility for this cluster.
   */
  enabled?: boolean;
}

/**
 * Configuration for controlling how IPs are allocated in the cluster.
 */
export interface IPAllocationPolicy {
  /**
   * This field is deprecated, use cluster_ipv4_cidr_block.
   */
  clusterIpv4Cidr?: string;
  /**
   * The IP address range for the cluster pod IPs. If this field is set, then
   * `cluster.cluster_ipv4_cidr` must be left blank. This field is only
   * applicable when `use_ip_aliases` is true. Set to blank to have a range
   * chosen with the default size. Set to /netmask (e.g. `/14`) to have a range
   * chosen with a specific netmask. Set to a
   * [CIDR](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
   * notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g.
   * `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range
   * to use.
   */
  clusterIpv4CidrBlock?: string;
  /**
   * The name of the secondary range to be used for the cluster CIDR block. The
   * secondary range will be used for pod IP addresses. This must be an existing
   * secondary range associated with the cluster subnetwork. This field is only
   * applicable with use_ip_aliases is true and create_subnetwork is false.
   */
  clusterSecondaryRangeName?: string;
  /**
   * Whether a new subnetwork will be created automatically for the cluster.
   * This field is only applicable when `use_ip_aliases` is true.
   */
  createSubnetwork?: boolean;
  /**
   * The ipv6 access type (internal or external) when create_subnetwork is true
   */
  ipv6AccessType?:  | "IPV6_ACCESS_TYPE_UNSPECIFIED" | "INTERNAL" | "EXTERNAL";
  /**
   * This field is deprecated, use node_ipv4_cidr_block.
   */
  nodeIpv4Cidr?: string;
  /**
   * The IP address range of the instance IPs in this cluster. This is
   * applicable only if `create_subnetwork` is true. Set to blank to have a
   * range chosen with the default size. Set to /netmask (e.g. `/14`) to have a
   * range chosen with a specific netmask. Set to a
   * [CIDR](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
   * notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g.
   * `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range
   * to use.
   */
  nodeIpv4CidrBlock?: string;
  /**
   * This field is deprecated, use services_ipv4_cidr_block.
   */
  servicesIpv4Cidr?: string;
  /**
   * The IP address range of the services IPs in this cluster. If blank, a
   * range will be automatically chosen with the default size. This field is
   * only applicable when `use_ip_aliases` is true. Set to blank to have a range
   * chosen with the default size. Set to /netmask (e.g. `/14`) to have a range
   * chosen with a specific netmask. Set to a
   * [CIDR](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
   * notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g.
   * `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range
   * to use.
   */
  servicesIpv4CidrBlock?: string;
  /**
   * Output only. [Output only] The services IPv6 CIDR block for the cluster.
   */
  readonly servicesIpv6CidrBlock?: string;
  /**
   * The name of the secondary range to be used as for the services CIDR block.
   * The secondary range will be used for service ClusterIPs. This must be an
   * existing secondary range associated with the cluster subnetwork. This field
   * is only applicable with use_ip_aliases is true and create_subnetwork is
   * false.
   */
  servicesSecondaryRangeName?: string;
  /**
   * The IP stack type of the cluster
   */
  stackType?:  | "STACK_TYPE_UNSPECIFIED" | "IPV4" | "IPV4_IPV6";
  /**
   * Output only. [Output only] The subnet's IPv6 CIDR block used by nodes and
   * pods.
   */
  readonly subnetIpv6CidrBlock?: string;
  /**
   * A custom subnetwork name to be used if `create_subnetwork` is true. If
   * this field is empty, then an automatic name will be chosen for the new
   * subnetwork.
   */
  subnetworkName?: string;
  /**
   * The IP address range of the Cloud TPUs in this cluster. If unspecified, a
   * range will be automatically chosen with the default size. This field is
   * only applicable when `use_ip_aliases` is true. If unspecified, the range
   * will use the default size. Set to /netmask (e.g. `/14`) to have a range
   * chosen with a specific netmask. Set to a
   * [CIDR](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
   * notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g.
   * `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range
   * to use.
   */
  tpuIpv4CidrBlock?: string;
  /**
   * Whether alias IPs will be used for pod IPs in the cluster. This is used in
   * conjunction with use_routes. It cannot be true if use_routes is true. If
   * both use_ip_aliases and use_routes are false, then the server picks the
   * default IP allocation mode
   */
  useIpAliases?: boolean;
  /**
   * Whether routes will be used for pod IPs in the cluster. This is used in
   * conjunction with use_ip_aliases. It cannot be true if use_ip_aliases is
   * true. If both use_ip_aliases and use_routes are false, then the server
   * picks the default IP allocation mode
   */
  useRoutes?: boolean;
}

/**
 * Jwk is a JSON Web Key as specified in RFC 7517
 */
export interface Jwk {
  /**
   * Algorithm.
   */
  alg?: string;
  /**
   * Used for ECDSA keys.
   */
  crv?: string;
  /**
   * Used for RSA keys.
   */
  e?: string;
  /**
   * Key ID.
   */
  kid?: string;
  /**
   * Key Type.
   */
  kty?: string;
  /**
   * Used for RSA keys.
   */
  n?: string;
  /**
   * Permitted uses for the public keys.
   */
  use?: string;
  /**
   * Used for ECDSA keys.
   */
  x?: string;
  /**
   * Used for ECDSA keys.
   */
  y?: string;
}

/**
 * Configuration for the Kubernetes Dashboard.
 */
export interface KubernetesDashboard {
  /**
   * Whether the Kubernetes Dashboard is enabled for this cluster.
   */
  disabled?: boolean;
}

/**
 * Configuration for the legacy Attribute Based Access Control authorization
 * mode.
 */
export interface LegacyAbac {
  /**
   * Whether the ABAC authorizer is enabled for this cluster. When enabled,
   * identities in the system, including service accounts, nodes, and
   * controllers, will have statically granted permissions beyond those provided
   * by the RBAC configuration or IAM.
   */
  enabled?: boolean;
}

/**
 * Parameters that can be configured on Linux nodes.
 */
export interface LinuxNodeConfig {
  /**
   * cgroup_mode specifies the cgroup mode to be used on the node.
   */
  cgroupMode?:  | "CGROUP_MODE_UNSPECIFIED" | "CGROUP_MODE_V1" | "CGROUP_MODE_V2";
  /**
   * The Linux kernel parameters to be applied to the nodes and all pods
   * running on the nodes. The following parameters are supported.
   * net.core.busy_poll net.core.busy_read net.core.netdev_max_backlog
   * net.core.rmem_max net.core.wmem_default net.core.wmem_max
   * net.core.optmem_max net.core.somaxconn net.ipv4.tcp_rmem net.ipv4.tcp_wmem
   * net.ipv4.tcp_tw_reuse
   */
  sysctls?: {
    [key: string]: string
  };
}

/**
 * ListClustersResponse is the result of ListClustersRequest.
 */
export interface ListClustersResponse {
  /**
   * A list of clusters in the project in the specified zone, or across all
   * ones.
   */
  clusters?: Cluster[];
  /**
   * If any zones are listed here, the list of clusters returned may be missing
   * those zones.
   */
  missingZones?: string[];
}

function serializeListClustersResponse(data: any): ListClustersResponse {
  return {
    ...data,
    clusters: data["clusters"] !== undefined ? data["clusters"].map((item: any) => (serializeCluster(item))) : undefined,
  };
}

function deserializeListClustersResponse(data: any): ListClustersResponse {
  return {
    ...data,
    clusters: data["clusters"] !== undefined ? data["clusters"].map((item: any) => (deserializeCluster(item))) : undefined,
  };
}

/**
 * ListNodePoolsResponse is the result of ListNodePoolsRequest.
 */
export interface ListNodePoolsResponse {
  /**
   * A list of node pools for a cluster.
   */
  nodePools?: NodePool[];
}

function serializeListNodePoolsResponse(data: any): ListNodePoolsResponse {
  return {
    ...data,
    nodePools: data["nodePools"] !== undefined ? data["nodePools"].map((item: any) => (serializeNodePool(item))) : undefined,
  };
}

function deserializeListNodePoolsResponse(data: any): ListNodePoolsResponse {
  return {
    ...data,
    nodePools: data["nodePools"] !== undefined ? data["nodePools"].map((item: any) => (deserializeNodePool(item))) : undefined,
  };
}

/**
 * ListOperationsResponse is the result of ListOperationsRequest.
 */
export interface ListOperationsResponse {
  /**
   * If any zones are listed here, the list of operations returned may be
   * missing the operations from those zones.
   */
  missingZones?: string[];
  /**
   * A list of operations in the project in the specified zone.
   */
  operations?: Operation[];
}

/**
 * ListUsableSubnetworksResponse is the response of
 * ListUsableSubnetworksRequest.
 */
export interface ListUsableSubnetworksResponse {
  /**
   * This token allows you to get the next page of results for list requests.
   * If the number of results is larger than `page_size`, use the
   * `next_page_token` as a value for the query parameter `page_token` in the
   * next request. The value will become empty when there are no more pages.
   */
  nextPageToken?: string;
  /**
   * A list of usable subnetworks in the specified network project.
   */
  subnetworks?: UsableSubnetwork[];
}

/**
 * LocalNvmeSsdBlockConfig contains configuration for using raw-block local
 * NVMe SSD.
 */
export interface LocalNvmeSsdBlockConfig {
  /**
   * The number of raw-block local NVMe SSD disks to be attached to the node.
   * Each local SSD is 375 GB in size. If zero, it means no raw-block local NVMe
   * SSD disks to be attached to the node. The limit for this value is dependent
   * upon the maximum number of disks available on a machine per zone. See:
   * https://cloud.google.com/compute/docs/disks/local-ssd for more information.
   */
  localSsdCount?: number;
}

/**
 * LoggingComponentConfig is cluster logging component configuration.
 */
export interface LoggingComponentConfig {
  /**
   * Select components to collect logs. An empty set would disable all logging.
   */
  enableComponents?:  | "COMPONENT_UNSPECIFIED" | "SYSTEM_COMPONENTS" | "WORKLOADS" | "APISERVER" | "SCHEDULER" | "CONTROLLER_MANAGER"[];
}

/**
 * LoggingConfig is cluster logging configuration.
 */
export interface LoggingConfig {
  /**
   * Logging components configuration
   */
  componentConfig?: LoggingComponentConfig;
}

/**
 * LoggingVariantConfig specifies the behaviour of the logging component.
 */
export interface LoggingVariantConfig {
  /**
   * Logging variant deployed on nodes.
   */
  variant?:  | "VARIANT_UNSPECIFIED" | "DEFAULT" | "MAX_THROUGHPUT";
}

/**
 * Represents the Maintenance exclusion option.
 */
export interface MaintenanceExclusionOptions {
  /**
   * Scope specifies the upgrade scope which upgrades are blocked by the
   * exclusion.
   */
  scope?:  | "NO_UPGRADES" | "NO_MINOR_UPGRADES" | "NO_MINOR_OR_NODE_UPGRADES";
}

/**
 * MaintenancePolicy defines the maintenance policy to be used for the cluster.
 */
export interface MaintenancePolicy {
  /**
   * A hash identifying the version of this policy, so that updates to fields
   * of the policy won't accidentally undo intermediate changes (and so that
   * users of the API unaware of some fields won't accidentally remove other
   * fields). Make a `get()` request to the cluster to get the current resource
   * version and include it with requests to set the policy.
   */
  resourceVersion?: string;
  /**
   * Specifies the maintenance window in which maintenance may be performed.
   */
  window?: MaintenanceWindow;
}

function serializeMaintenancePolicy(data: any): MaintenancePolicy {
  return {
    ...data,
    window: data["window"] !== undefined ? serializeMaintenanceWindow(data["window"]) : undefined,
  };
}

function deserializeMaintenancePolicy(data: any): MaintenancePolicy {
  return {
    ...data,
    window: data["window"] !== undefined ? deserializeMaintenanceWindow(data["window"]) : undefined,
  };
}

/**
 * MaintenanceWindow defines the maintenance window to be used for the cluster.
 */
export interface MaintenanceWindow {
  /**
   * DailyMaintenanceWindow specifies a daily maintenance operation window.
   */
  dailyMaintenanceWindow?: DailyMaintenanceWindow;
  /**
   * Exceptions to maintenance window. Non-emergency maintenance should not
   * occur in these windows.
   */
  maintenanceExclusions?: {
    [key: string]: TimeWindow
  };
  /**
   * RecurringWindow specifies some number of recurring time periods for
   * maintenance to occur. The time windows may be overlapping. If no
   * maintenance windows are set, maintenance can occur at any time.
   */
  recurringWindow?: RecurringTimeWindow;
}

function serializeMaintenanceWindow(data: any): MaintenanceWindow {
  return {
    ...data,
    maintenanceExclusions: data["maintenanceExclusions"] !== undefined ? Object.fromEntries(Object.entries(data["maintenanceExclusions"]).map(([k, v]: [string, any]) => ([k, serializeTimeWindow(v)]))) : undefined,
    recurringWindow: data["recurringWindow"] !== undefined ? serializeRecurringTimeWindow(data["recurringWindow"]) : undefined,
  };
}

function deserializeMaintenanceWindow(data: any): MaintenanceWindow {
  return {
    ...data,
    maintenanceExclusions: data["maintenanceExclusions"] !== undefined ? Object.fromEntries(Object.entries(data["maintenanceExclusions"]).map(([k, v]: [string, any]) => ([k, deserializeTimeWindow(v)]))) : undefined,
    recurringWindow: data["recurringWindow"] !== undefined ? deserializeRecurringTimeWindow(data["recurringWindow"]) : undefined,
  };
}

/**
 * ManagedPrometheusConfig defines the configuration for Google Cloud Managed
 * Service for Prometheus.
 */
export interface ManagedPrometheusConfig {
  /**
   * Enable Managed Collection.
   */
  enabled?: boolean;
}

/**
 * The authentication information for accessing the master endpoint.
 * Authentication can be done using HTTP basic auth or using client
 * certificates.
 */
export interface MasterAuth {
  /**
   * [Output only] Base64-encoded public certificate used by clients to
   * authenticate to the cluster endpoint.
   */
  clientCertificate?: string;
  /**
   * Configuration for client certificate authentication on the cluster. For
   * clusters before v1.12, if no configuration is specified, a client
   * certificate is issued.
   */
  clientCertificateConfig?: ClientCertificateConfig;
  /**
   * [Output only] Base64-encoded private key used by clients to authenticate
   * to the cluster endpoint.
   */
  clientKey?: string;
  /**
   * [Output only] Base64-encoded public certificate that is the root of trust
   * for the cluster.
   */
  clusterCaCertificate?: string;
  /**
   * The password to use for HTTP basic authentication to the master endpoint.
   * Because the master endpoint is open to the Internet, you should create a
   * strong password. If a password is provided for cluster creation, username
   * must be non-empty. Warning: basic authentication is deprecated, and will be
   * removed in GKE control plane versions 1.19 and newer. For a list of
   * recommended authentication methods, see:
   * https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication
   */
  password?: string;
  /**
   * The username to use for HTTP basic authentication to the master endpoint.
   * For clusters v1.6.0 and later, basic authentication can be disabled by
   * leaving username unspecified (or setting it to the empty string). Warning:
   * basic authentication is deprecated, and will be removed in GKE control
   * plane versions 1.19 and newer. For a list of recommended authentication
   * methods, see:
   * https://cloud.google.com/kubernetes-engine/docs/how-to/api-server-authentication
   */
  username?: string;
}

/**
 * Configuration options for the master authorized networks feature. Enabled
 * master authorized networks will disallow all external traffic to access
 * Kubernetes master through HTTPS except traffic from the given CIDR blocks,
 * Google Compute Engine Public IPs and Google Prod IPs.
 */
export interface MasterAuthorizedNetworksConfig {
  /**
   * cidr_blocks define up to 50 external networks that could access Kubernetes
   * master through HTTPS.
   */
  cidrBlocks?: CidrBlock[];
  /**
   * Whether or not master authorized networks is enabled.
   */
  enabled?: boolean;
  /**
   * Whether master is accessbile via Google Compute Engine Public IP
   * addresses.
   */
  gcpPublicCidrsAccessEnabled?: boolean;
}

/**
 * Constraints applied to pods.
 */
export interface MaxPodsConstraint {
  /**
   * Constraint enforced on the max num of pods per node.
   */
  maxPodsPerNode?: bigint;
}

function serializeMaxPodsConstraint(data: any): MaxPodsConstraint {
  return {
    ...data,
    maxPodsPerNode: data["maxPodsPerNode"] !== undefined ? String(data["maxPodsPerNode"]) : undefined,
  };
}

function deserializeMaxPodsConstraint(data: any): MaxPodsConstraint {
  return {
    ...data,
    maxPodsPerNode: data["maxPodsPerNode"] !== undefined ? BigInt(data["maxPodsPerNode"]) : undefined,
  };
}

/**
 * Configuration for issuance of mTLS keys and certificates to Kubernetes pods.
 */
export interface MeshCertificates {
  /**
   * enable_certificates controls issuance of workload mTLS certificates. If
   * set, the GKE Workload Identity Certificates controller and node agent will
   * be deployed in the cluster, which can then be configured by creating a
   * WorkloadCertificateConfig Custom Resource. Requires Workload Identity
   * (workload_pool must be non-empty).
   */
  enableCertificates?: boolean;
}

/**
 * Progress metric is (string, int|float|string) pair.
 */
export interface Metric {
  /**
   * For metrics with floating point value.
   */
  doubleValue?: number;
  /**
   * For metrics with integer value.
   */
  intValue?: bigint;
  /**
   * Required. Metric name, e.g., "nodes total", "percent done".
   */
  name?: string;
  /**
   * For metrics with custom values (ratios, visual progress, etc.).
   */
  stringValue?: string;
}

function serializeMetric(data: any): Metric {
  return {
    ...data,
    intValue: data["intValue"] !== undefined ? String(data["intValue"]) : undefined,
  };
}

function deserializeMetric(data: any): Metric {
  return {
    ...data,
    intValue: data["intValue"] !== undefined ? BigInt(data["intValue"]) : undefined,
  };
}

/**
 * MonitoringComponentConfig is cluster monitoring component configuration.
 */
export interface MonitoringComponentConfig {
  /**
   * Select components to collect metrics. An empty set would disable all
   * monitoring.
   */
  enableComponents?:  | "COMPONENT_UNSPECIFIED" | "SYSTEM_COMPONENTS" | "APISERVER" | "SCHEDULER" | "CONTROLLER_MANAGER"[];
}

/**
 * MonitoringConfig is cluster monitoring configuration.
 */
export interface MonitoringConfig {
  /**
   * Monitoring components configuration
   */
  componentConfig?: MonitoringComponentConfig;
  /**
   * Enable Google Cloud Managed Service for Prometheus in the cluster.
   */
  managedPrometheusConfig?: ManagedPrometheusConfig;
}

/**
 * NetworkConfig reports the relative names of network & subnetwork.
 */
export interface NetworkConfig {
  /**
   * The desired datapath provider for this cluster. By default, uses the
   * IPTables-based kube-proxy implementation.
   */
  datapathProvider?:  | "DATAPATH_PROVIDER_UNSPECIFIED" | "LEGACY_DATAPATH" | "ADVANCED_DATAPATH";
  /**
   * Whether the cluster disables default in-node sNAT rules. In-node sNAT
   * rules will be disabled when default_snat_status is disabled. When disabled
   * is set to false, default IP masquerade rules will be applied to the nodes
   * to prevent sNAT on cluster internal traffic.
   */
  defaultSnatStatus?: DefaultSnatStatus;
  /**
   * DNSConfig contains clusterDNS config for this cluster.
   */
  dnsConfig?: DNSConfig;
  /**
   * Whether Intra-node visibility is enabled for this cluster. This makes same
   * node pod to pod traffic visible for VPC network.
   */
  enableIntraNodeVisibility?: boolean;
  /**
   * Whether L4ILB Subsetting is enabled for this cluster.
   */
  enableL4ilbSubsetting?: boolean;
  /**
   * GatewayAPIConfig contains the desired config of Gateway API on this
   * cluster.
   */
  gatewayApiConfig?: GatewayAPIConfig;
  /**
   * Output only. The relative name of the Google Compute Engine
   * network(https://cloud.google.com/compute/docs/networks-and-firewalls#networks)
   * to which the cluster is connected. Example:
   * projects/my-project/global/networks/my-network
   */
  network?: string;
  /**
   * The desired state of IPv6 connectivity to Google Services. By default, no
   * private IPv6 access to or from Google Services (all access will be via
   * IPv4)
   */
  privateIpv6GoogleAccess?:  | "PRIVATE_IPV6_GOOGLE_ACCESS_UNSPECIFIED" | "PRIVATE_IPV6_GOOGLE_ACCESS_DISABLED" | "PRIVATE_IPV6_GOOGLE_ACCESS_TO_GOOGLE" | "PRIVATE_IPV6_GOOGLE_ACCESS_BIDIRECTIONAL";
  /**
   * ServiceExternalIPsConfig specifies if services with externalIPs field are
   * blocked or not.
   */
  serviceExternalIpsConfig?: ServiceExternalIPsConfig;
  /**
   * Output only. The relative name of the Google Compute Engine
   * [subnetwork](https://cloud.google.com/compute/docs/vpc) to which the
   * cluster is connected. Example:
   * projects/my-project/regions/us-central1/subnetworks/my-subnet
   */
  subnetwork?: string;
}

/**
 * Configuration of all network bandwidth tiers
 */
export interface NetworkPerformanceConfig {
  /**
   * Specifies the total network bandwidth tier for the NodePool.
   */
  totalEgressBandwidthTier?:  | "TIER_UNSPECIFIED" | "TIER_1";
}

/**
 * Configuration options for the NetworkPolicy feature.
 * https://kubernetes.io/docs/concepts/services-networking/networkpolicies/
 */
export interface NetworkPolicy {
  /**
   * Whether network policy is enabled on the cluster.
   */
  enabled?: boolean;
  /**
   * The selected network policy provider.
   */
  provider?:  | "PROVIDER_UNSPECIFIED" | "CALICO";
}

/**
 * Configuration for NetworkPolicy. This only tracks whether the addon is
 * enabled or not on the Master, it does not track whether network policy is
 * enabled for the nodes.
 */
export interface NetworkPolicyConfig {
  /**
   * Whether NetworkPolicy is enabled for this cluster.
   */
  disabled?: boolean;
}

/**
 * Collection of Compute Engine network tags that can be applied to a node's
 * underlying VM instance.
 */
export interface NetworkTags {
  /**
   * List of network tags.
   */
  tags?: string[];
}

/**
 * Parameters that describe the nodes in a cluster. GKE Autopilot clusters do
 * not recognize parameters in `NodeConfig`. Use
 * AutoprovisioningNodePoolDefaults instead.
 */
export interface NodeConfig {
  /**
   * A list of hardware accelerators to be attached to each node. See
   * https://cloud.google.com/compute/docs/gpus for more information about
   * support for GPUs.
   */
  accelerators?: AcceleratorConfig[];
  /**
   * Advanced features for the Compute Engine VM.
   */
  advancedMachineFeatures?: AdvancedMachineFeatures;
  /**
   * The Customer Managed Encryption Key used to encrypt the boot disk
   * attached to each node in the node pool. This should be of the form
   * projects/[KEY_PROJECT_ID]/locations/[LOCATION]/keyRings/[RING_NAME]/cryptoKeys/[KEY_NAME].
   * For more information about protecting resources with Cloud KMS Keys please
   * see:
   * https://cloud.google.com/compute/docs/disks/customer-managed-encryption
   */
  bootDiskKmsKey?: string;
  /**
   * Confidential nodes config. All the nodes in the node pool will be
   * Confidential VM once enabled.
   */
  confidentialNodes?: ConfidentialNodes;
  /**
   * Size of the disk attached to each node, specified in GB. The smallest
   * allowed disk size is 10GB. If unspecified, the default disk size is 100GB.
   */
  diskSizeGb?: number;
  /**
   * Type of the disk attached to each node (e.g. 'pd-standard', 'pd-ssd' or
   * 'pd-balanced') If unspecified, the default disk type is 'pd-standard'
   */
  diskType?: string;
  /**
   * Parameters for the node ephemeral storage using Local SSDs. If
   * unspecified, ephemeral storage is backed by the boot disk.
   */
  ephemeralStorageLocalSsdConfig?: EphemeralStorageLocalSsdConfig;
  /**
   * Enable or disable NCCL fast socket for the node pool.
   */
  fastSocket?: FastSocket;
  /**
   * Google Container File System (image streaming) configs.
   */
  gcfsConfig?: GcfsConfig;
  /**
   * Enable or disable gvnic in the node pool.
   */
  gvnic?: VirtualNIC;
  /**
   * The image type to use for this node. Note that for a given image type, the
   * latest version of it will be used. Please see
   * https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for
   * available image types.
   */
  imageType?: string;
  /**
   * Node kubelet configs.
   */
  kubeletConfig?: NodeKubeletConfig;
  /**
   * The map of Kubernetes labels (key/value pairs) to be applied to each node.
   * These will added in addition to any default label(s) that Kubernetes may
   * apply to the node. In case of conflict in label keys, the applied set may
   * differ depending on the Kubernetes version -- it's best to assume the
   * behavior is undefined and conflicts should be avoided. For more
   * information, including usage and the valid values, see:
   * https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Parameters that can be configured on Linux nodes.
   */
  linuxNodeConfig?: LinuxNodeConfig;
  /**
   * Parameters for using raw-block Local NVMe SSDs.
   */
  localNvmeSsdBlockConfig?: LocalNvmeSsdBlockConfig;
  /**
   * The number of local SSD disks to be attached to the node. The limit for
   * this value is dependent upon the maximum number of disks available on a
   * machine per zone. See:
   * https://cloud.google.com/compute/docs/disks/local-ssd for more information.
   */
  localSsdCount?: number;
  /**
   * Logging configuration.
   */
  loggingConfig?: NodePoolLoggingConfig;
  /**
   * The name of a Google Compute Engine [machine
   * type](https://cloud.google.com/compute/docs/machine-types) If unspecified,
   * the default machine type is `e2-medium`.
   */
  machineType?: string;
  /**
   * The metadata key/value pairs assigned to instances in the cluster. Keys
   * must conform to the regexp `[a-zA-Z0-9-_]+` and be less than 128 bytes in
   * length. These are reflected as part of a URL in the metadata server.
   * Additionally, to avoid ambiguity, keys must not conflict with any other
   * metadata keys for the project or be one of the reserved keys: -
   * "cluster-location" - "cluster-name" - "cluster-uid" - "configure-sh" -
   * "containerd-configure-sh" - "enable-os-login" - "gci-ensure-gke-docker" -
   * "gci-metrics-enabled" - "gci-update-strategy" - "instance-template" -
   * "kube-env" - "startup-script" - "user-data" - "disable-address-manager" -
   * "windows-startup-script-ps1" - "common-psm1" - "k8s-node-setup-psm1" -
   * "install-ssh-psm1" - "user-profile-psm1" Values are free-form strings, and
   * only have meaning as interpreted by the image running in the instance. The
   * only restriction placed on them is that each value's size must be less than
   * or equal to 32 KB. The total size of all keys and values must be less than
   * 512 KB.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * Minimum CPU platform to be used by this instance. The instance may be
   * scheduled on the specified or newer CPU platform. Applicable values are the
   * friendly names of CPU platforms, such as `minCpuPlatform: "Intel Haswell"`
   * or `minCpuPlatform: "Intel Sandy Bridge"`. For more information, read [how
   * to specify min CPU
   * platform](https://cloud.google.com/compute/docs/instances/specify-min-cpu-platform)
   */
  minCpuPlatform?: string;
  /**
   * Setting this field will assign instances of this pool to run on the
   * specified node group. This is useful for running workloads on [sole tenant
   * nodes](https://cloud.google.com/compute/docs/nodes/sole-tenant-nodes).
   */
  nodeGroup?: string;
  /**
   * The set of Google API scopes to be made available on all of the node VMs
   * under the "default" service account. The following scopes are recommended,
   * but not required, and by default are not included: *
   * `https://www.googleapis.com/auth/compute` is required for mounting
   * persistent storage on your nodes. *
   * `https://www.googleapis.com/auth/devstorage.read_only` is required for
   * communicating with **gcr.io** (the [Google Container
   * Registry](https://cloud.google.com/container-registry/)). If unspecified,
   * no scopes are added, unless Cloud Logging or Cloud Monitoring are enabled,
   * in which case their required scopes will be added.
   */
  oauthScopes?: string[];
  /**
   * Whether the nodes are created as preemptible VM instances. See:
   * https://cloud.google.com/compute/docs/instances/preemptible for more
   * information about preemptible VM instances.
   */
  preemptible?: boolean;
  /**
   * The optional reservation affinity. Setting this field will apply the
   * specified [Zonal Compute
   * Reservation](https://cloud.google.com/compute/docs/instances/reserving-zonal-resources)
   * to this node pool.
   */
  reservationAffinity?: ReservationAffinity;
  /**
   * The resource labels for the node pool to use to annotate any related
   * Google Compute Engine resources.
   */
  resourceLabels?: {
    [key: string]: string
  };
  /**
   * Sandbox configuration for this node.
   */
  sandboxConfig?: SandboxConfig;
  /**
   * The Google Cloud Platform Service Account to be used by the node VMs.
   * Specify the email address of the Service Account; otherwise, if no Service
   * Account is specified, the "default" service account is used.
   */
  serviceAccount?: string;
  /**
   * Shielded Instance options.
   */
  shieldedInstanceConfig?: ShieldedInstanceConfig;
  /**
   * Spot flag for enabling Spot VM, which is a rebrand of the existing
   * preemptible flag.
   */
  spot?: boolean;
  /**
   * The list of instance tags applied to all nodes. Tags are used to identify
   * valid sources or targets for network firewalls and are specified by the
   * client during cluster or node pool creation. Each tag within the list must
   * comply with RFC1035.
   */
  tags?: string[];
  /**
   * List of kubernetes taints to be applied to each node. For more
   * information, including usage and the valid values, see:
   * https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
   */
  taints?: NodeTaint[];
  /**
   * Parameters that can be configured on Windows nodes.
   */
  windowsNodeConfig?: WindowsNodeConfig;
  /**
   * The workload metadata configuration for this node.
   */
  workloadMetadataConfig?: WorkloadMetadataConfig;
}

function serializeNodeConfig(data: any): NodeConfig {
  return {
    ...data,
    accelerators: data["accelerators"] !== undefined ? data["accelerators"].map((item: any) => (serializeAcceleratorConfig(item))) : undefined,
    advancedMachineFeatures: data["advancedMachineFeatures"] !== undefined ? serializeAdvancedMachineFeatures(data["advancedMachineFeatures"]) : undefined,
    kubeletConfig: data["kubeletConfig"] !== undefined ? serializeNodeKubeletConfig(data["kubeletConfig"]) : undefined,
  };
}

function deserializeNodeConfig(data: any): NodeConfig {
  return {
    ...data,
    accelerators: data["accelerators"] !== undefined ? data["accelerators"].map((item: any) => (deserializeAcceleratorConfig(item))) : undefined,
    advancedMachineFeatures: data["advancedMachineFeatures"] !== undefined ? deserializeAdvancedMachineFeatures(data["advancedMachineFeatures"]) : undefined,
    kubeletConfig: data["kubeletConfig"] !== undefined ? deserializeNodeKubeletConfig(data["kubeletConfig"]) : undefined,
  };
}

/**
 * Subset of NodeConfig message that has defaults.
 */
export interface NodeConfigDefaults {
  /**
   * GCFS (Google Container File System, also known as Riptide) options.
   */
  gcfsConfig?: GcfsConfig;
  /**
   * Logging configuration for node pools.
   */
  loggingConfig?: NodePoolLoggingConfig;
}

/**
 * Node kubelet configs.
 */
export interface NodeKubeletConfig {
  /**
   * Enable CPU CFS quota enforcement for containers that specify CPU limits.
   * This option is enabled by default which makes kubelet use CFS quota
   * (https://www.kernel.org/doc/Documentation/scheduler/sched-bwc.txt) to
   * enforce container CPU limits. Otherwise, CPU limits will not be enforced at
   * all. Disable this option to mitigate CPU throttling problems while still
   * having your pods to be in Guaranteed QoS class by specifying the CPU
   * limits. The default value is 'true' if unspecified.
   */
  cpuCfsQuota?: boolean;
  /**
   * Set the CPU CFS quota period value 'cpu.cfs_period_us'. The string must be
   * a sequence of decimal numbers, each with optional fraction and a unit
   * suffix, such as "300ms". Valid time units are "ns", "us" (or "µs"), "ms",
   * "s", "m", "h". The value must be a positive duration.
   */
  cpuCfsQuotaPeriod?: string;
  /**
   * Control the CPU management policy on the node. See
   * https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/
   * The following values are allowed. * "none": the default, which represents
   * the existing scheduling behavior. * "static": allows pods with certain
   * resource characteristics to be granted increased CPU affinity and
   * exclusivity on the node. The default value is 'none' if unspecified.
   */
  cpuManagerPolicy?: string;
  /**
   * Set the Pod PID limits. See
   * https://kubernetes.io/docs/concepts/policy/pid-limiting/#pod-pid-limits
   * Controls the maximum number of processes allowed to run in a pod. The value
   * must be greater than or equal to 1024 and less than 4194304.
   */
  podPidsLimit?: bigint;
}

function serializeNodeKubeletConfig(data: any): NodeKubeletConfig {
  return {
    ...data,
    podPidsLimit: data["podPidsLimit"] !== undefined ? String(data["podPidsLimit"]) : undefined,
  };
}

function deserializeNodeKubeletConfig(data: any): NodeKubeletConfig {
  return {
    ...data,
    podPidsLimit: data["podPidsLimit"] !== undefined ? BigInt(data["podPidsLimit"]) : undefined,
  };
}

/**
 * Collection of node-level [Kubernetes
 * labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels).
 */
export interface NodeLabels {
  /**
   * Map of node label keys and node label values.
   */
  labels?: {
    [key: string]: string
  };
}

/**
 * NodeManagement defines the set of node management services turned on for the
 * node pool.
 */
export interface NodeManagement {
  /**
   * A flag that specifies whether the node auto-repair is enabled for the node
   * pool. If enabled, the nodes in this node pool will be monitored and, if
   * they fail health checks too many times, an automatic repair action will be
   * triggered.
   */
  autoRepair?: boolean;
  /**
   * A flag that specifies whether node auto-upgrade is enabled for the node
   * pool. If enabled, node auto-upgrade helps keep the nodes in your node pool
   * up to date with the latest release version of Kubernetes.
   */
  autoUpgrade?: boolean;
  /**
   * Specifies the Auto Upgrade knobs for the node pool.
   */
  upgradeOptions?: AutoUpgradeOptions;
}

/**
 * Parameters for node pool-level network config.
 */
export interface NodeNetworkConfig {
  /**
   * Input only. Whether to create a new range for pod IPs in this node pool.
   * Defaults are provided for `pod_range` and `pod_ipv4_cidr_block` if they are
   * not specified. If neither `create_pod_range` or `pod_range` are specified,
   * the cluster-level default (`ip_allocation_policy.cluster_ipv4_cidr_block`)
   * is used. Only applicable if `ip_allocation_policy.use_ip_aliases` is true.
   * This field cannot be changed after the node pool has been created.
   */
  createPodRange?: boolean;
  /**
   * Whether nodes have internal IP addresses only. If enable_private_nodes is
   * not specified, then the value is derived from
   * cluster.privateClusterConfig.enablePrivateNodes
   */
  enablePrivateNodes?: boolean;
  /**
   * Network bandwidth tier configuration.
   */
  networkPerformanceConfig?: NetworkPerformanceConfig;
  /**
   * The IP address range for pod IPs in this node pool. Only applicable if
   * `create_pod_range` is true. Set to blank to have a range chosen with the
   * default size. Set to /netmask (e.g. `/14`) to have a range chosen with a
   * specific netmask. Set to a
   * [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
   * notation (e.g. `10.96.0.0/14`) to pick a specific range to use. Only
   * applicable if `ip_allocation_policy.use_ip_aliases` is true. This field
   * cannot be changed after the node pool has been created.
   */
  podIpv4CidrBlock?: string;
  /**
   * The ID of the secondary range for pod IPs. If `create_pod_range` is true,
   * this ID is used for the new range. If `create_pod_range` is false, uses an
   * existing secondary range with this ID. Only applicable if
   * `ip_allocation_policy.use_ip_aliases` is true. This field cannot be changed
   * after the node pool has been created.
   */
  podRange?: string;
}

/**
 * NodePool contains the name and configuration for a cluster's node pool. Node
 * pools are a set of nodes (i.e. VM's), with a common configuration and
 * specification, under the control of the cluster master. They may have a set
 * of Kubernetes labels applied to them, which may be used to reference them
 * during pod scheduling. They may also be resized up or down, to accommodate
 * the workload.
 */
export interface NodePool {
  /**
   * Autoscaler configuration for this NodePool. Autoscaler is enabled only if
   * a valid configuration is present.
   */
  autoscaling?: NodePoolAutoscaling;
  /**
   * Which conditions caused the current node pool state.
   */
  conditions?: StatusCondition[];
  /**
   * The node configuration of the pool.
   */
  config?: NodeConfig;
  /**
   * This checksum is computed by the server based on the value of node pool
   * fields, and may be sent on update requests to ensure the client has an
   * up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * The initial node count for the pool. You must ensure that your Compute
   * Engine [resource quota](https://cloud.google.com/compute/quotas) is
   * sufficient for this number of instances. You must also have available
   * firewall and routes quota.
   */
  initialNodeCount?: number;
  /**
   * [Output only] The resource URLs of the [managed instance
   * groups](https://cloud.google.com/compute/docs/instance-groups/creating-groups-of-managed-instances)
   * associated with this node pool. During the node pool blue-green upgrade
   * operation, the URLs contain both blue and green resources.
   */
  instanceGroupUrls?: string[];
  /**
   * The list of Google Compute Engine
   * [zones](https://cloud.google.com/compute/docs/zones#available) in which the
   * NodePool's nodes should be located. If this value is unspecified during
   * node pool creation, the
   * [Cluster.Locations](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters#Cluster.FIELDS.locations)
   * value will be used, instead. Warning: changing node pool locations will
   * result in nodes being added and/or removed.
   */
  locations?: string[];
  /**
   * NodeManagement configuration for this NodePool.
   */
  management?: NodeManagement;
  /**
   * The constraint on the maximum number of pods that can be run
   * simultaneously on a node in the node pool.
   */
  maxPodsConstraint?: MaxPodsConstraint;
  /**
   * The name of the node pool.
   */
  name?: string;
  /**
   * Networking configuration for this NodePool. If specified, it overrides the
   * cluster-level defaults.
   */
  networkConfig?: NodeNetworkConfig;
  /**
   * Specifies the node placement policy.
   */
  placementPolicy?: PlacementPolicy;
  /**
   * [Output only] The pod CIDR block size per node in this node pool.
   */
  podIpv4CidrSize?: number;
  /**
   * [Output only] Server-defined URL for the resource.
   */
  selfLink?: string;
  /**
   * [Output only] The status of the nodes in this pool instance.
   */
  status?:  | "STATUS_UNSPECIFIED" | "PROVISIONING" | "RUNNING" | "RUNNING_WITH_ERROR" | "RECONCILING" | "STOPPING" | "ERROR";
  /**
   * [Output only] Deprecated. Use conditions instead. Additional information
   * about the current status of this node pool instance, if available.
   */
  statusMessage?: string;
  /**
   * Output only. [Output only] Update info contains relevant information
   * during a node pool update.
   */
  readonly updateInfo?: UpdateInfo;
  /**
   * Upgrade settings control disruption and speed of the upgrade.
   */
  upgradeSettings?: UpgradeSettings;
  /**
   * The version of Kubernetes running on this NodePool's nodes. If
   * unspecified, it defaults as described
   * [here](https://cloud.google.com/kubernetes-engine/versioning#specifying_node_version).
   */
  version?: string;
}

function serializeNodePool(data: any): NodePool {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeNodeConfig(data["config"]) : undefined,
    maxPodsConstraint: data["maxPodsConstraint"] !== undefined ? serializeMaxPodsConstraint(data["maxPodsConstraint"]) : undefined,
    upgradeSettings: data["upgradeSettings"] !== undefined ? serializeUpgradeSettings(data["upgradeSettings"]) : undefined,
  };
}

function deserializeNodePool(data: any): NodePool {
  return {
    ...data,
    config: data["config"] !== undefined ? deserializeNodeConfig(data["config"]) : undefined,
    maxPodsConstraint: data["maxPodsConstraint"] !== undefined ? deserializeMaxPodsConstraint(data["maxPodsConstraint"]) : undefined,
    upgradeSettings: data["upgradeSettings"] !== undefined ? deserializeUpgradeSettings(data["upgradeSettings"]) : undefined,
  };
}

/**
 * Node pool configs that apply to all auto-provisioned node pools in autopilot
 * clusters and node auto-provisioning enabled clusters.
 */
export interface NodePoolAutoConfig {
  /**
   * The list of instance tags applied to all nodes. Tags are used to identify
   * valid sources or targets for network firewalls and are specified by the
   * client during cluster creation. Each tag within the list must comply with
   * RFC1035.
   */
  networkTags?: NetworkTags;
}

/**
 * NodePoolAutoscaling contains information required by cluster autoscaler to
 * adjust the size of the node pool to the current cluster usage.
 */
export interface NodePoolAutoscaling {
  /**
   * Can this node pool be deleted automatically.
   */
  autoprovisioned?: boolean;
  /**
   * Is autoscaling enabled for this node pool.
   */
  enabled?: boolean;
  /**
   * Location policy used when scaling up a nodepool.
   */
  locationPolicy?:  | "LOCATION_POLICY_UNSPECIFIED" | "BALANCED" | "ANY";
  /**
   * Maximum number of nodes for one location in the NodePool. Must be >=
   * min_node_count. There has to be enough quota to scale up the cluster.
   */
  maxNodeCount?: number;
  /**
   * Minimum number of nodes for one location in the NodePool. Must be >= 1 and
   * <= max_node_count.
   */
  minNodeCount?: number;
  /**
   * Maximum number of nodes in the node pool. Must be greater than
   * total_min_node_count. There has to be enough quota to scale up the cluster.
   * The total_*_node_count fields are mutually exclusive with the *_node_count
   * fields.
   */
  totalMaxNodeCount?: number;
  /**
   * Minimum number of nodes in the node pool. Must be greater than 1 less than
   * total_max_node_count. The total_*_node_count fields are mutually exclusive
   * with the *_node_count fields.
   */
  totalMinNodeCount?: number;
}

/**
 * Subset of Nodepool message that has defaults.
 */
export interface NodePoolDefaults {
  /**
   * Subset of NodeConfig message that has defaults.
   */
  nodeConfigDefaults?: NodeConfigDefaults;
}

/**
 * NodePoolLoggingConfig specifies logging configuration for nodepools.
 */
export interface NodePoolLoggingConfig {
  /**
   * Logging variant configuration.
   */
  variantConfig?: LoggingVariantConfig;
}

/**
 * Kubernetes taint is composed of three fields: key, value, and effect. Effect
 * can only be one of three types: NoSchedule, PreferNoSchedule or NoExecute.
 * See
 * [here](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration)
 * for more information, including usage and the valid values.
 */
export interface NodeTaint {
  /**
   * Effect for taint.
   */
  effect?:  | "EFFECT_UNSPECIFIED" | "NO_SCHEDULE" | "PREFER_NO_SCHEDULE" | "NO_EXECUTE";
  /**
   * Key for taint.
   */
  key?: string;
  /**
   * Value for taint.
   */
  value?: string;
}

/**
 * Collection of Kubernetes [node
 * taints](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration).
 */
export interface NodeTaints {
  /**
   * List of node taints.
   */
  taints?: NodeTaint[];
}

/**
 * NotificationConfig is the configuration of notifications.
 */
export interface NotificationConfig {
  /**
   * Notification config for Pub/Sub.
   */
  pubsub?: PubSub;
}

/**
 * This operation resource represents operations that may have happened or are
 * happening on the cluster. All fields are output only.
 */
export interface Operation {
  /**
   * Which conditions caused the current cluster state. Deprecated. Use field
   * error instead.
   */
  clusterConditions?: StatusCondition[];
  /**
   * Detailed operation progress, if available.
   */
  detail?: string;
  /**
   * [Output only] The time the operation completed, in
   * [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.
   */
  endTime?: string;
  /**
   * The error result of the operation in case of failure.
   */
  error?: Status;
  /**
   * [Output only] The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/regions-zones/regions-zones#available)
   * or
   * [region](https://cloud.google.com/compute/docs/regions-zones/regions-zones#available)
   * in which the cluster resides.
   */
  location?: string;
  /**
   * The server-assigned ID for the operation.
   */
  name?: string;
  /**
   * Which conditions caused the current node pool state. Deprecated. Use field
   * error instead.
   */
  nodepoolConditions?: StatusCondition[];
  /**
   * The operation type.
   */
  operationType?:  | "TYPE_UNSPECIFIED" | "CREATE_CLUSTER" | "DELETE_CLUSTER" | "UPGRADE_MASTER" | "UPGRADE_NODES" | "REPAIR_CLUSTER" | "UPDATE_CLUSTER" | "CREATE_NODE_POOL" | "DELETE_NODE_POOL" | "SET_NODE_POOL_MANAGEMENT" | "AUTO_REPAIR_NODES" | "AUTO_UPGRADE_NODES" | "SET_LABELS" | "SET_MASTER_AUTH" | "SET_NODE_POOL_SIZE" | "SET_NETWORK_POLICY" | "SET_MAINTENANCE_POLICY";
  /**
   * Output only. [Output only] Progress information for an operation.
   */
  readonly progress?: OperationProgress;
  /**
   * Server-defined URL for the resource.
   */
  selfLink?: string;
  /**
   * [Output only] The time the operation started, in
   * [RFC3339](https://www.ietf.org/rfc/rfc3339.txt) text format.
   */
  startTime?: string;
  /**
   * The current status of the operation.
   */
  status?:  | "STATUS_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE" | "ABORTING";
  /**
   * Output only. If an error has occurred, a textual description of the error.
   * Deprecated. Use the field error instead.
   */
  readonly statusMessage?: string;
  /**
   * Server-defined URL for the target of the operation.
   */
  targetLink?: string;
  /**
   * The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * operation is taking place. This field is deprecated, use location instead.
   */
  zone?: string;
}

/**
 * Information about operation (or operation stage) progress.
 */
export interface OperationProgress {
  /**
   * Progress metric bundle, for example: metrics: [{name: "nodes done",
   * int_value: 15}, {name: "nodes total", int_value: 32}] or metrics: [{name:
   * "progress", double_value: 0.56}, {name: "progress scale", double_value:
   * 1.0}]
   */
  metrics?: Metric[];
  /**
   * A non-parameterized string describing an operation stage. Unset for
   * single-stage operations.
   */
  name?: string;
  /**
   * Substages of an operation or a stage.
   */
  stages?: OperationProgress[];
  /**
   * Status of an operation stage. Unset for single-stage operations.
   */
  status?:  | "STATUS_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE" | "ABORTING";
}

function serializeOperationProgress(data: any): OperationProgress {
  return {
    ...data,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (serializeMetric(item))) : undefined,
    stages: data["stages"] !== undefined ? data["stages"].map((item: any) => (serializeOperationProgress(item))) : undefined,
  };
}

function deserializeOperationProgress(data: any): OperationProgress {
  return {
    ...data,
    metrics: data["metrics"] !== undefined ? data["metrics"].map((item: any) => (deserializeMetric(item))) : undefined,
    stages: data["stages"] !== undefined ? data["stages"].map((item: any) => (deserializeOperationProgress(item))) : undefined,
  };
}

/**
 * PlacementPolicy defines the placement policy used by the node pool.
 */
export interface PlacementPolicy {
  /**
   * The type of placement.
   */
  type?:  | "TYPE_UNSPECIFIED" | "COMPACT";
}

/**
 * Configuration options for private clusters.
 */
export interface PrivateClusterConfig {
  /**
   * Whether the master's internal IP address is used as the cluster endpoint.
   */
  enablePrivateEndpoint?: boolean;
  /**
   * Whether nodes have internal IP addresses only. If enabled, all nodes are
   * given only RFC 1918 private addresses and communicate with the master via
   * private networking.
   */
  enablePrivateNodes?: boolean;
  /**
   * Controls master global access settings.
   */
  masterGlobalAccessConfig?: PrivateClusterMasterGlobalAccessConfig;
  /**
   * The IP range in CIDR notation to use for the hosted master network. This
   * range will be used for assigning internal IP addresses to the master or set
   * of masters, as well as the ILB VIP. This range must not overlap with any
   * other ranges in use within the cluster's network.
   */
  masterIpv4CidrBlock?: string;
  /**
   * Output only. The peering name in the customer VPC used by this cluster.
   */
  peeringName?: string;
  /**
   * Output only. The internal IP address of this cluster's master endpoint.
   */
  privateEndpoint?: string;
  /**
   * Subnet to provision the master's private endpoint during cluster creation.
   * Specified in projects/*\/regions/*\/subnetworks/* format.
   */
  privateEndpointSubnetwork?: string;
  /**
   * Output only. The external IP address of this cluster's master endpoint.
   */
  publicEndpoint?: string;
}

/**
 * Configuration for controlling master global access settings.
 */
export interface PrivateClusterMasterGlobalAccessConfig {
  /**
   * Whenever master is accessible globally or not.
   */
  enabled?: boolean;
}

/**
 * Additional options for container#projectsAggregatedUsableSubnetworksList.
 */
export interface ProjectsAggregatedUsableSubnetworksListOptions {
  /**
   * Filtering currently only supports equality on the networkProjectId and
   * must be in the form: "networkProjectId=[PROJECTID]", where
   * `networkProjectId` is the project which owns the listed subnetworks. This
   * defaults to the parent project ID.
   */
  filter?: string;
  /**
   * The max number of results per page that should be returned. If the number
   * of available results is larger than `page_size`, a `next_page_token` is
   * returned which can be used to get the next page of results in subsequent
   * requests. Acceptable values are 0 to 500, inclusive. (Default: 500)
   */
  pageSize?: number;
  /**
   * Specifies a page token to use. Set this to the nextPageToken returned by
   * previous list requests to get the next page of results.
   */
  pageToken?: string;
}

/**
 * Additional options for container#projectsLocationsClustersDelete.
 */
export interface ProjectsLocationsClustersDeleteOptions {
  /**
   * Deprecated. The name of the cluster to delete. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * Additional options for container#projectsLocationsClustersGet.
 */
export interface ProjectsLocationsClustersGetOptions {
  /**
   * Deprecated. The name of the cluster to retrieve. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * Additional options for container#projectsLocationsClustersList.
 */
export interface ProjectsLocationsClustersListOptions {
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the parent field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides, or "-" for all zones. This field has been deprecated and
   * replaced by the parent field.
   */
  zone?: string;
}

/**
 * Additional options for container#projectsLocationsClustersNodePoolsDelete.
 */
export interface ProjectsLocationsClustersNodePoolsDeleteOptions {
  /**
   * Deprecated. The name of the cluster. This field has been deprecated and
   * replaced by the name field.
   */
  clusterId?: string;
  /**
   * Deprecated. The name of the node pool to delete. This field has been
   * deprecated and replaced by the name field.
   */
  nodePoolId?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * Additional options for container#projectsLocationsClustersNodePoolsGet.
 */
export interface ProjectsLocationsClustersNodePoolsGetOptions {
  /**
   * Deprecated. The name of the cluster. This field has been deprecated and
   * replaced by the name field.
   */
  clusterId?: string;
  /**
   * Deprecated. The name of the node pool. This field has been deprecated and
   * replaced by the name field.
   */
  nodePoolId?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * Additional options for container#projectsLocationsClustersNodePoolsList.
 */
export interface ProjectsLocationsClustersNodePoolsListOptions {
  /**
   * Deprecated. The name of the cluster. This field has been deprecated and
   * replaced by the parent field.
   */
  clusterId?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the parent field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the parent
   * field.
   */
  zone?: string;
}

/**
 * Additional options for container#projectsLocationsGetServerConfig.
 */
export interface ProjectsLocationsGetServerConfigOptions {
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) to return
   * operations for. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * Additional options for container#projectsLocationsOperationsGet.
 */
export interface ProjectsLocationsOperationsGetOptions {
  /**
   * Deprecated. The server-assigned `name` of the operation. This field has
   * been deprecated and replaced by the name field.
   */
  operationId?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * Additional options for container#projectsLocationsOperationsList.
 */
export interface ProjectsLocationsOperationsListOptions {
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the parent field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) to return
   * operations for, or `-` for all zones. This field has been deprecated and
   * replaced by the parent field.
   */
  zone?: string;
}

/**
 * Additional options for container#projectsZonesClustersDelete.
 */
export interface ProjectsZonesClustersDeleteOptions {
  /**
   * The name (project, location, cluster) of the cluster to delete. Specified
   * in the format `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
}

/**
 * Additional options for container#projectsZonesClustersGet.
 */
export interface ProjectsZonesClustersGetOptions {
  /**
   * The name (project, location, cluster) of the cluster to retrieve.
   * Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
}

/**
 * Additional options for container#projectsZonesClustersList.
 */
export interface ProjectsZonesClustersListOptions {
  /**
   * The parent (project and location) where the clusters will be listed.
   * Specified in the format `projects/*\/locations/*`. Location "-" matches all
   * zones and all regions.
   */
  parent?: string;
}

/**
 * Additional options for container#projectsZonesClustersNodePoolsDelete.
 */
export interface ProjectsZonesClustersNodePoolsDeleteOptions {
  /**
   * The name (project, location, cluster, node pool id) of the node pool to
   * delete. Specified in the format
   * `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  name?: string;
}

/**
 * Additional options for container#projectsZonesClustersNodePoolsGet.
 */
export interface ProjectsZonesClustersNodePoolsGetOptions {
  /**
   * The name (project, location, cluster, node pool id) of the node pool to
   * get. Specified in the format
   * `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  name?: string;
}

/**
 * Additional options for container#projectsZonesClustersNodePoolsList.
 */
export interface ProjectsZonesClustersNodePoolsListOptions {
  /**
   * The parent (project, location, cluster name) where the node pools will be
   * listed. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  parent?: string;
}

/**
 * Additional options for container#projectsZonesGetServerconfig.
 */
export interface ProjectsZonesGetServerconfigOptions {
  /**
   * The name (project and location) of the server config to get, specified in
   * the format `projects/*\/locations/*`.
   */
  name?: string;
}

/**
 * Additional options for container#projectsZonesOperationsGet.
 */
export interface ProjectsZonesOperationsGetOptions {
  /**
   * The name (project, location, operation id) of the operation to get.
   * Specified in the format `projects/*\/locations/*\/operations/*`.
   */
  name?: string;
}

/**
 * Additional options for container#projectsZonesOperationsList.
 */
export interface ProjectsZonesOperationsListOptions {
  /**
   * The parent (project and location) where the operations will be listed.
   * Specified in the format `projects/*\/locations/*`. Location "-" matches all
   * zones and all regions.
   */
  parent?: string;
}

/**
 * Pub/Sub specific notification config.
 */
export interface PubSub {
  /**
   * Enable notifications for Pub/Sub.
   */
  enabled?: boolean;
  /**
   * Allows filtering to one or more specific event types. If no filter is
   * specified, or if a filter is specified with no event types, all event types
   * will be sent
   */
  filter?: Filter;
  /**
   * The desired Pub/Sub topic to which notifications will be sent by GKE.
   * Format is `projects/{project}/topics/{topic}`.
   */
  topic?: string;
}

/**
 * Represents an arbitrary window of time that recurs.
 */
export interface RecurringTimeWindow {
  /**
   * An RRULE (https://tools.ietf.org/html/rfc5545#section-3.8.5.3) for how
   * this window reccurs. They go on for the span of time between the start and
   * end time. For example, to have something repeat every weekday, you'd use:
   * `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR` To repeat some window daily (equivalent
   * to the DailyMaintenanceWindow): `FREQ=DAILY` For the first weekend of every
   * month: `FREQ=MONTHLY;BYSETPOS=1;BYDAY=SA,SU` This specifies how frequently
   * the window starts. Eg, if you wanted to have a 9-5 UTC-4 window every
   * weekday, you'd use something like: ``` start time =
   * 2019-01-01T09:00:00-0400 end time = 2019-01-01T17:00:00-0400 recurrence =
   * FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR ``` Windows can span multiple days. Eg, to
   * make the window encompass every weekend from midnight Saturday till the
   * last minute of Sunday UTC: ``` start time = 2019-01-05T00:00:00Z end time =
   * 2019-01-07T23:59:00Z recurrence = FREQ=WEEKLY;BYDAY=SA ``` Note the start
   * and end time's specific dates are largely arbitrary except to specify
   * duration of the window and when it first starts. The FREQ values of HOURLY,
   * MINUTELY, and SECONDLY are not supported.
   */
  recurrence?: string;
  /**
   * The window of the first recurrence.
   */
  window?: TimeWindow;
}

function serializeRecurringTimeWindow(data: any): RecurringTimeWindow {
  return {
    ...data,
    window: data["window"] !== undefined ? serializeTimeWindow(data["window"]) : undefined,
  };
}

function deserializeRecurringTimeWindow(data: any): RecurringTimeWindow {
  return {
    ...data,
    window: data["window"] !== undefined ? deserializeTimeWindow(data["window"]) : undefined,
  };
}

/**
 * ReleaseChannel indicates which release channel a cluster is subscribed to.
 * Release channels are arranged in order of risk. When a cluster is subscribed
 * to a release channel, Google maintains both the master version and the node
 * version. Node auto-upgrade defaults to true and cannot be disabled.
 */
export interface ReleaseChannel {
  /**
   * channel specifies which release channel the cluster is subscribed to.
   */
  channel?:  | "UNSPECIFIED" | "RAPID" | "REGULAR" | "STABLE";
}

/**
 * ReleaseChannelConfig exposes configuration for a release channel.
 */
export interface ReleaseChannelConfig {
  /**
   * The release channel this configuration applies to.
   */
  channel?:  | "UNSPECIFIED" | "RAPID" | "REGULAR" | "STABLE";
  /**
   * The default version for newly created clusters on the channel.
   */
  defaultVersion?: string;
  /**
   * List of valid versions for the channel.
   */
  validVersions?: string[];
}

/**
 * 
 * [ReservationAffinity](https://cloud.google.com/compute/docs/instances/reserving-zonal-resources)
 * is the configuration of desired reservation which instances could take
 * capacity from.
 */
export interface ReservationAffinity {
  /**
   * Corresponds to the type of reservation consumption.
   */
  consumeReservationType?:  | "UNSPECIFIED" | "NO_RESERVATION" | "ANY_RESERVATION" | "SPECIFIC_RESERVATION";
  /**
   * Corresponds to the label key of a reservation resource. To target a
   * SPECIFIC_RESERVATION by name, specify
   * "compute.googleapis.com/reservation-name" as the key and specify the name
   * of your reservation as its value.
   */
  key?: string;
  /**
   * Corresponds to the label value(s) of reservation resource(s).
   */
  values?: string[];
}

/**
 * Collection of [GCP
 * labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels).
 */
export interface ResourceLabels {
  /**
   * Map of node label keys and node label values.
   */
  labels?: {
    [key: string]: string
  };
}

/**
 * Contains information about amount of some resource in the cluster. For
 * memory, value should be in GB.
 */
export interface ResourceLimit {
  /**
   * Maximum amount of the resource in the cluster.
   */
  maximum?: bigint;
  /**
   * Minimum amount of the resource in the cluster.
   */
  minimum?: bigint;
  /**
   * Resource name "cpu", "memory" or gpu-specific string.
   */
  resourceType?: string;
}

function serializeResourceLimit(data: any): ResourceLimit {
  return {
    ...data,
    maximum: data["maximum"] !== undefined ? String(data["maximum"]) : undefined,
    minimum: data["minimum"] !== undefined ? String(data["minimum"]) : undefined,
  };
}

function deserializeResourceLimit(data: any): ResourceLimit {
  return {
    ...data,
    maximum: data["maximum"] !== undefined ? BigInt(data["maximum"]) : undefined,
    minimum: data["minimum"] !== undefined ? BigInt(data["minimum"]) : undefined,
  };
}

/**
 * Configuration for exporting cluster resource usages.
 */
export interface ResourceUsageExportConfig {
  /**
   * Configuration to use BigQuery as usage export destination.
   */
  bigqueryDestination?: BigQueryDestination;
  /**
   * Configuration to enable resource consumption metering.
   */
  consumptionMeteringConfig?: ConsumptionMeteringConfig;
  /**
   * Whether to enable network egress metering for this cluster. If enabled, a
   * daemonset will be created in the cluster to meter network egress traffic.
   */
  enableNetworkEgressMetering?: boolean;
}

/**
 * RollbackNodePoolUpgradeRequest rollbacks the previously Aborted or Failed
 * NodePool upgrade. This will be an no-op if the last upgrade successfully
 * completed.
 */
export interface RollbackNodePoolUpgradeRequest {
  /**
   * Deprecated. The name of the cluster to rollback. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * The name (project, location, cluster, node pool id) of the node poll to
   * rollback upgrade. Specified in the format
   * `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  name?: string;
  /**
   * Deprecated. The name of the node pool to rollback. This field has been
   * deprecated and replaced by the name field.
   */
  nodePoolId?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Option for rollback to ignore the PodDisruptionBudget. Default value is
   * false.
   */
  respectPdb?: boolean;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * SandboxConfig contains configurations of the sandbox to use for the node.
 */
export interface SandboxConfig {
  /**
   * Type of the sandbox to use for the node.
   */
  type?:  | "UNSPECIFIED" | "GVISOR";
}

/**
 * SecurityBulletinEvent is a notification sent to customers when a security
 * bulletin has been posted that they are vulnerable to.
 */
export interface SecurityBulletinEvent {
  /**
   * The GKE minor versions affected by this vulnerability.
   */
  affectedSupportedMinors?: string[];
  /**
   * A brief description of the bulletin. See the bulletin pointed to by the
   * bulletin_uri field for an expanded description.
   */
  briefDescription?: string;
  /**
   * The ID of the bulletin corresponding to the vulnerability.
   */
  bulletinId?: string;
  /**
   * The URI link to the bulletin on the website for more information.
   */
  bulletinUri?: string;
  /**
   * The CVEs associated with this bulletin.
   */
  cveIds?: string[];
  /**
   * If this field is specified, it means there are manual steps that the user
   * must take to make their clusters safe.
   */
  manualStepsRequired?: boolean;
  /**
   * The GKE versions where this vulnerability is patched.
   */
  patchedVersions?: string[];
  /**
   * The resource type (node/control plane) that has the vulnerability.
   * Multiple notifications (1 notification per resource type) will be sent for
   * a vulnerability that affects > 1 resource type.
   */
  resourceTypeAffected?: string;
  /**
   * The severity of this bulletin as it relates to GKE.
   */
  severity?: string;
  /**
   * This represents a version selected from the patched_versions field that
   * the cluster receiving this notification should most likely want to upgrade
   * to based on its current version. Note that if this notification is being
   * received by a given cluster, it means that this version is currently
   * available as an upgrade target in that cluster's location.
   */
  suggestedUpgradeTarget?: string;
}

/**
 * Kubernetes Engine service configuration.
 */
export interface ServerConfig {
  /**
   * List of release channel configurations.
   */
  channels?: ReleaseChannelConfig[];
  /**
   * Version of Kubernetes the service deploys by default.
   */
  defaultClusterVersion?: string;
  /**
   * Default image type.
   */
  defaultImageType?: string;
  /**
   * List of valid image types.
   */
  validImageTypes?: string[];
  /**
   * List of valid master versions, in descending order.
   */
  validMasterVersions?: string[];
  /**
   * List of valid node upgrade target versions, in descending order.
   */
  validNodeVersions?: string[];
}

/**
 * Config to block services with externalIPs field.
 */
export interface ServiceExternalIPsConfig {
  /**
   * Whether Services with ExternalIPs field are allowed or not.
   */
  enabled?: boolean;
}

/**
 * SetAddonsConfigRequest sets the addons associated with the cluster.
 */
export interface SetAddonsConfigRequest {
  /**
   * Required. The desired configurations for the various addons available to
   * run in the cluster.
   */
  addonsConfig?: AddonsConfig;
  /**
   * Deprecated. The name of the cluster to upgrade. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * The name (project, location, cluster) of the cluster to set addons.
   * Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * SetLabelsRequest sets the Google Cloud Platform labels on a Google Container
 * Engine cluster, which will in turn set them for Google Compute Engine
 * resources used by that cluster
 */
export interface SetLabelsRequest {
  /**
   * Deprecated. The name of the cluster. This field has been deprecated and
   * replaced by the name field.
   */
  clusterId?: string;
  /**
   * Required. The fingerprint of the previous set of labels for this resource,
   * used to detect conflicts. The fingerprint is initially generated by
   * Kubernetes Engine and changes after every request to modify or update
   * labels. You must always provide an up-to-date fingerprint hash when
   * updating or changing labels. Make a `get()` request to the resource to get
   * the latest fingerprint.
   */
  labelFingerprint?: string;
  /**
   * The name (project, location, cluster name) of the cluster to set labels.
   * Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Required. The labels to set for that cluster.
   */
  resourceLabels?: {
    [key: string]: string
  };
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * SetLegacyAbacRequest enables or disables the ABAC authorization mechanism
 * for a cluster.
 */
export interface SetLegacyAbacRequest {
  /**
   * Deprecated. The name of the cluster to update. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * Required. Whether ABAC authorization will be enabled in the cluster.
   */
  enabled?: boolean;
  /**
   * The name (project, location, cluster name) of the cluster to set legacy
   * abac. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * SetLocationsRequest sets the locations of the cluster.
 */
export interface SetLocationsRequest {
  /**
   * Deprecated. The name of the cluster to upgrade. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * Required. The desired list of Google Compute Engine
   * [zones](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster's nodes should be located. Changing the locations a cluster is in
   * will result in nodes being either created or removed from the cluster,
   * depending on whether locations are being added or removed. This list must
   * always include the cluster's primary zone.
   */
  locations?: string[];
  /**
   * The name (project, location, cluster) of the cluster to set locations.
   * Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * SetLoggingServiceRequest sets the logging service of a cluster.
 */
export interface SetLoggingServiceRequest {
  /**
   * Deprecated. The name of the cluster to upgrade. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * Required. The logging service the cluster should use to write logs.
   * Currently available options: * `logging.googleapis.com/kubernetes` - The
   * Cloud Logging service with a Kubernetes-native resource model *
   * `logging.googleapis.com` - The legacy Cloud Logging service (no longer
   * available as of GKE 1.15). * `none` - no logs will be exported from the
   * cluster. If left as an empty string,`logging.googleapis.com/kubernetes`
   * will be used for GKE 1.14+ or `logging.googleapis.com` for earlier
   * versions.
   */
  loggingService?: string;
  /**
   * The name (project, location, cluster) of the cluster to set logging.
   * Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * SetMaintenancePolicyRequest sets the maintenance policy for a cluster.
 */
export interface SetMaintenancePolicyRequest {
  /**
   * Required. The name of the cluster to update.
   */
  clusterId?: string;
  /**
   * Required. The maintenance policy to be set for the cluster. An empty field
   * clears the existing maintenance policy.
   */
  maintenancePolicy?: MaintenancePolicy;
  /**
   * The name (project, location, cluster name) of the cluster to set
   * maintenance policy. Specified in the format
   * `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
  /**
   * Required. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   */
  projectId?: string;
  /**
   * Required. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides.
   */
  zone?: string;
}

function serializeSetMaintenancePolicyRequest(data: any): SetMaintenancePolicyRequest {
  return {
    ...data,
    maintenancePolicy: data["maintenancePolicy"] !== undefined ? serializeMaintenancePolicy(data["maintenancePolicy"]) : undefined,
  };
}

function deserializeSetMaintenancePolicyRequest(data: any): SetMaintenancePolicyRequest {
  return {
    ...data,
    maintenancePolicy: data["maintenancePolicy"] !== undefined ? deserializeMaintenancePolicy(data["maintenancePolicy"]) : undefined,
  };
}

/**
 * SetMasterAuthRequest updates the admin password of a cluster.
 */
export interface SetMasterAuthRequest {
  /**
   * Required. The exact form of action to be taken on the master auth.
   */
  action?:  | "UNKNOWN" | "SET_PASSWORD" | "GENERATE_PASSWORD" | "SET_USERNAME";
  /**
   * Deprecated. The name of the cluster to upgrade. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * The name (project, location, cluster) of the cluster to set auth.
   * Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Required. A description of the update.
   */
  update?: MasterAuth;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * SetMonitoringServiceRequest sets the monitoring service of a cluster.
 */
export interface SetMonitoringServiceRequest {
  /**
   * Deprecated. The name of the cluster to upgrade. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * Required. The monitoring service the cluster should use to write metrics.
   * Currently available options: * "monitoring.googleapis.com/kubernetes" - The
   * Cloud Monitoring service with a Kubernetes-native resource model *
   * `monitoring.googleapis.com` - The legacy Cloud Monitoring service (no
   * longer available as of GKE 1.15). * `none` - No metrics will be exported
   * from the cluster. If left as an empty
   * string,`monitoring.googleapis.com/kubernetes` will be used for GKE 1.14+ or
   * `monitoring.googleapis.com` for earlier versions.
   */
  monitoringService?: string;
  /**
   * The name (project, location, cluster) of the cluster to set monitoring.
   * Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * SetNetworkPolicyRequest enables/disables network policy for a cluster.
 */
export interface SetNetworkPolicyRequest {
  /**
   * Deprecated. The name of the cluster. This field has been deprecated and
   * replaced by the name field.
   */
  clusterId?: string;
  /**
   * The name (project, location, cluster name) of the cluster to set
   * networking policy. Specified in the format
   * `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
  /**
   * Required. Configuration options for the NetworkPolicy feature.
   */
  networkPolicy?: NetworkPolicy;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * SetNodePoolAutoscalingRequest sets the autoscaler settings of a node pool.
 */
export interface SetNodePoolAutoscalingRequest {
  /**
   * Required. Autoscaling configuration for the node pool.
   */
  autoscaling?: NodePoolAutoscaling;
  /**
   * Deprecated. The name of the cluster to upgrade. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * The name (project, location, cluster, node pool) of the node pool to set
   * autoscaler settings. Specified in the format
   * `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  name?: string;
  /**
   * Deprecated. The name of the node pool to upgrade. This field has been
   * deprecated and replaced by the name field.
   */
  nodePoolId?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * SetNodePoolManagementRequest sets the node management properties of a node
 * pool.
 */
export interface SetNodePoolManagementRequest {
  /**
   * Deprecated. The name of the cluster to update. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * Required. NodeManagement configuration for the node pool.
   */
  management?: NodeManagement;
  /**
   * The name (project, location, cluster, node pool id) of the node pool to
   * set management properties. Specified in the format
   * `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  name?: string;
  /**
   * Deprecated. The name of the node pool to update. This field has been
   * deprecated and replaced by the name field.
   */
  nodePoolId?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * SetNodePoolSizeRequest sets the size of a node pool.
 */
export interface SetNodePoolSizeRequest {
  /**
   * Deprecated. The name of the cluster to update. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * The name (project, location, cluster, node pool id) of the node pool to
   * set size. Specified in the format
   * `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  name?: string;
  /**
   * Required. The desired node count for the pool.
   */
  nodeCount?: number;
  /**
   * Deprecated. The name of the node pool to update. This field has been
   * deprecated and replaced by the name field.
   */
  nodePoolId?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * A set of Shielded Instance options.
 */
export interface ShieldedInstanceConfig {
  /**
   * Defines whether the instance has integrity monitoring enabled. Enables
   * monitoring and attestation of the boot integrity of the instance. The
   * attestation is performed against the integrity policy baseline. This
   * baseline is initially derived from the implicitly trusted boot image when
   * the instance is created.
   */
  enableIntegrityMonitoring?: boolean;
  /**
   * Defines whether the instance has Secure Boot enabled. Secure Boot helps
   * ensure that the system only runs authentic software by verifying the
   * digital signature of all boot components, and halting the boot process if
   * signature verification fails.
   */
  enableSecureBoot?: boolean;
}

/**
 * Configuration of Shielded Nodes feature.
 */
export interface ShieldedNodes {
  /**
   * Whether Shielded Nodes features are enabled on all nodes in this cluster.
   */
  enabled?: boolean;
}

/**
 * Standard rollout policy is the default policy for blue-green.
 */
export interface StandardRolloutPolicy {
  /**
   * Number of blue nodes to drain in a batch.
   */
  batchNodeCount?: number;
  /**
   * Percentage of the blue pool nodes to drain in a batch. The range of this
   * field should be (0.0, 1.0].
   */
  batchPercentage?: number;
  /**
   * Soak time after each batch gets drained. Default to zero.
   */
  batchSoakDuration?: number /* Duration */;
}

function serializeStandardRolloutPolicy(data: any): StandardRolloutPolicy {
  return {
    ...data,
    batchSoakDuration: data["batchSoakDuration"] !== undefined ? data["batchSoakDuration"] : undefined,
  };
}

function deserializeStandardRolloutPolicy(data: any): StandardRolloutPolicy {
  return {
    ...data,
    batchSoakDuration: data["batchSoakDuration"] !== undefined ? data["batchSoakDuration"] : undefined,
  };
}

/**
 * StartIPRotationRequest creates a new IP for the cluster and then performs a
 * node upgrade on each node pool to point to the new IP.
 */
export interface StartIPRotationRequest {
  /**
   * Deprecated. The name of the cluster. This field has been deprecated and
   * replaced by the name field.
   */
  clusterId?: string;
  /**
   * The name (project, location, cluster name) of the cluster to start IP
   * rotation. Specified in the format `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Whether to rotate credentials during IP rotation.
   */
  rotateCredentials?: boolean;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
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
 * StatusCondition describes why a cluster or a node pool has a certain status
 * (e.g., ERROR or DEGRADED).
 */
export interface StatusCondition {
  /**
   * Canonical code of the condition.
   */
  canonicalCode?:  | "OK" | "CANCELLED" | "UNKNOWN" | "INVALID_ARGUMENT" | "DEADLINE_EXCEEDED" | "NOT_FOUND" | "ALREADY_EXISTS" | "PERMISSION_DENIED" | "UNAUTHENTICATED" | "RESOURCE_EXHAUSTED" | "FAILED_PRECONDITION" | "ABORTED" | "OUT_OF_RANGE" | "UNIMPLEMENTED" | "INTERNAL" | "UNAVAILABLE" | "DATA_LOSS";
  /**
   * Machine-friendly representation of the condition Deprecated. Use
   * canonical_code instead.
   */
  code?:  | "UNKNOWN" | "GCE_STOCKOUT" | "GKE_SERVICE_ACCOUNT_DELETED" | "GCE_QUOTA_EXCEEDED" | "SET_BY_OPERATOR" | "CLOUD_KMS_KEY_ERROR" | "CA_EXPIRING";
  /**
   * Human-friendly representation of the condition
   */
  message?: string;
}

/**
 * Represents an arbitrary window of time.
 */
export interface TimeWindow {
  /**
   * The time that the window ends. The end time should take place after the
   * start time.
   */
  endTime?: Date;
  /**
   * MaintenanceExclusionOptions provides maintenance exclusion related
   * options.
   */
  maintenanceExclusionOptions?: MaintenanceExclusionOptions;
  /**
   * The time that the window first starts.
   */
  startTime?: Date;
}

function serializeTimeWindow(data: any): TimeWindow {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeTimeWindow(data: any): TimeWindow {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * UpdateClusterRequest updates the settings of a cluster.
 */
export interface UpdateClusterRequest {
  /**
   * Deprecated. The name of the cluster to upgrade. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * The name (project, location, cluster) of the cluster to update. Specified
   * in the format `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Required. A description of the update.
   */
  update?: ClusterUpdate;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

function serializeUpdateClusterRequest(data: any): UpdateClusterRequest {
  return {
    ...data,
    update: data["update"] !== undefined ? serializeClusterUpdate(data["update"]) : undefined,
  };
}

function deserializeUpdateClusterRequest(data: any): UpdateClusterRequest {
  return {
    ...data,
    update: data["update"] !== undefined ? deserializeClusterUpdate(data["update"]) : undefined,
  };
}

/**
 * UpdateInfo contains resource (instance groups, etc), status and other
 * intermediate information relevant to a node pool upgrade.
 */
export interface UpdateInfo {
  /**
   * Information of a blue-green upgrade.
   */
  blueGreenInfo?: BlueGreenInfo;
}

/**
 * UpdateMasterRequest updates the master of the cluster.
 */
export interface UpdateMasterRequest {
  /**
   * Deprecated. The name of the cluster to upgrade. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * Required. The Kubernetes version to change the master to. Users may
   * specify either explicit versions offered by Kubernetes Engine or version
   * aliases, which have the following behavior: - "latest": picks the highest
   * valid Kubernetes version - "1.X": picks the highest valid patch+gke.N patch
   * in the 1.X version - "1.X.Y": picks the highest valid gke.N patch in the
   * 1.X.Y version - "1.X.Y-gke.N": picks an explicit Kubernetes version - "-":
   * picks the default Kubernetes version
   */
  masterVersion?: string;
  /**
   * The name (project, location, cluster) of the cluster to update. Specified
   * in the format `projects/*\/locations/*\/clusters/*`.
   */
  name?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

/**
 * UpdateNodePoolRequests update a node pool's image and/or version.
 */
export interface UpdateNodePoolRequest {
  /**
   * Deprecated. The name of the cluster to upgrade. This field has been
   * deprecated and replaced by the name field.
   */
  clusterId?: string;
  /**
   * Confidential nodes config. All the nodes in the node pool will be
   * Confidential VM once enabled.
   */
  confidentialNodes?: ConfidentialNodes;
  /**
   * The current etag of the node pool. If an etag is provided and does not
   * match the current etag of the node pool, update will be blocked and an
   * ABORTED error will be returned.
   */
  etag?: string;
  /**
   * Enable or disable NCCL fast socket for the node pool.
   */
  fastSocket?: FastSocket;
  /**
   * GCFS config.
   */
  gcfsConfig?: GcfsConfig;
  /**
   * Enable or disable gvnic on the node pool.
   */
  gvnic?: VirtualNIC;
  /**
   * Required. The desired image type for the node pool. Please see
   * https://cloud.google.com/kubernetes-engine/docs/concepts/node-images for
   * available image types.
   */
  imageType?: string;
  /**
   * Node kubelet configs.
   */
  kubeletConfig?: NodeKubeletConfig;
  /**
   * The desired node labels to be applied to all nodes in the node pool. If
   * this field is not present, the labels will not be changed. Otherwise, the
   * existing node labels will be *replaced* with the provided labels.
   */
  labels?: NodeLabels;
  /**
   * Parameters that can be configured on Linux nodes.
   */
  linuxNodeConfig?: LinuxNodeConfig;
  /**
   * The desired list of Google Compute Engine
   * [zones](https://cloud.google.com/compute/docs/zones#available) in which the
   * node pool's nodes should be located. Changing the locations for a node pool
   * will result in nodes being either created or removed from the node pool,
   * depending on whether locations are being added or removed.
   */
  locations?: string[];
  /**
   * Logging configuration.
   */
  loggingConfig?: NodePoolLoggingConfig;
  /**
   * The name (project, location, cluster, node pool) of the node pool to
   * update. Specified in the format
   * `projects/*\/locations/*\/clusters/*\/nodePools/*`.
   */
  name?: string;
  /**
   * Node network config.
   */
  nodeNetworkConfig?: NodeNetworkConfig;
  /**
   * Deprecated. The name of the node pool to upgrade. This field has been
   * deprecated and replaced by the name field.
   */
  nodePoolId?: string;
  /**
   * Required. The Kubernetes version to change the nodes to (typically an
   * upgrade). Users may specify either explicit versions offered by Kubernetes
   * Engine or version aliases, which have the following behavior: - "latest":
   * picks the highest valid Kubernetes version - "1.X": picks the highest valid
   * patch+gke.N patch in the 1.X version - "1.X.Y": picks the highest valid
   * gke.N patch in the 1.X.Y version - "1.X.Y-gke.N": picks an explicit
   * Kubernetes version - "-": picks the Kubernetes master version
   */
  nodeVersion?: string;
  /**
   * Deprecated. The Google Developers Console [project ID or project
   * number](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   * This field has been deprecated and replaced by the name field.
   */
  projectId?: string;
  /**
   * The resource labels for the node pool to use to annotate any related
   * Google Compute Engine resources.
   */
  resourceLabels?: ResourceLabels;
  /**
   * The desired network tags to be applied to all nodes in the node pool. If
   * this field is not present, the tags will not be changed. Otherwise, the
   * existing network tags will be *replaced* with the provided tags.
   */
  tags?: NetworkTags;
  /**
   * The desired node taints to be applied to all nodes in the node pool. If
   * this field is not present, the taints will not be changed. Otherwise, the
   * existing node taints will be *replaced* with the provided taints.
   */
  taints?: NodeTaints;
  /**
   * Upgrade settings control disruption and speed of the upgrade.
   */
  upgradeSettings?: UpgradeSettings;
  /**
   * Parameters that can be configured on Windows nodes.
   */
  windowsNodeConfig?: WindowsNodeConfig;
  /**
   * The desired workload metadata config for the node pool.
   */
  workloadMetadataConfig?: WorkloadMetadataConfig;
  /**
   * Deprecated. The name of the Google Compute Engine
   * [zone](https://cloud.google.com/compute/docs/zones#available) in which the
   * cluster resides. This field has been deprecated and replaced by the name
   * field.
   */
  zone?: string;
}

function serializeUpdateNodePoolRequest(data: any): UpdateNodePoolRequest {
  return {
    ...data,
    kubeletConfig: data["kubeletConfig"] !== undefined ? serializeNodeKubeletConfig(data["kubeletConfig"]) : undefined,
    upgradeSettings: data["upgradeSettings"] !== undefined ? serializeUpgradeSettings(data["upgradeSettings"]) : undefined,
  };
}

function deserializeUpdateNodePoolRequest(data: any): UpdateNodePoolRequest {
  return {
    ...data,
    kubeletConfig: data["kubeletConfig"] !== undefined ? deserializeNodeKubeletConfig(data["kubeletConfig"]) : undefined,
    upgradeSettings: data["upgradeSettings"] !== undefined ? deserializeUpgradeSettings(data["upgradeSettings"]) : undefined,
  };
}

/**
 * UpgradeAvailableEvent is a notification sent to customers when a new
 * available version is released.
 */
export interface UpgradeAvailableEvent {
  /**
   * The release channel of the version. If empty, it means a non-channel
   * release.
   */
  releaseChannel?: ReleaseChannel;
  /**
   * Optional relative path to the resource. For example, the relative path of
   * the node pool.
   */
  resource?: string;
  /**
   * The resource type of the release version.
   */
  resourceType?:  | "UPGRADE_RESOURCE_TYPE_UNSPECIFIED" | "MASTER" | "NODE_POOL";
  /**
   * The release version available for upgrade.
   */
  version?: string;
}

/**
 * UpgradeEvent is a notification sent to customers by the cluster server when
 * a resource is upgrading.
 */
export interface UpgradeEvent {
  /**
   * The current version before the upgrade.
   */
  currentVersion?: string;
  /**
   * The operation associated with this upgrade.
   */
  operation?: string;
  /**
   * The time when the operation was started.
   */
  operationStartTime?: Date;
  /**
   * Optional relative path to the resource. For example in node pool upgrades,
   * the relative path of the node pool.
   */
  resource?: string;
  /**
   * The resource type that is upgrading.
   */
  resourceType?:  | "UPGRADE_RESOURCE_TYPE_UNSPECIFIED" | "MASTER" | "NODE_POOL";
  /**
   * The target version for the upgrade.
   */
  targetVersion?: string;
}

function serializeUpgradeEvent(data: any): UpgradeEvent {
  return {
    ...data,
    operationStartTime: data["operationStartTime"] !== undefined ? data["operationStartTime"].toISOString() : undefined,
  };
}

function deserializeUpgradeEvent(data: any): UpgradeEvent {
  return {
    ...data,
    operationStartTime: data["operationStartTime"] !== undefined ? new Date(data["operationStartTime"]) : undefined,
  };
}

/**
 * These upgrade settings control the level of parallelism and the level of
 * disruption caused by an upgrade. maxUnavailable controls the number of nodes
 * that can be simultaneously unavailable. maxSurge controls the number of
 * additional nodes that can be added to the node pool temporarily for the time
 * of the upgrade to increase the number of available nodes. (maxUnavailable +
 * maxSurge) determines the level of parallelism (how many nodes are being
 * upgraded at the same time). Note: upgrades inevitably introduce some
 * disruption since workloads need to be moved from old nodes to new, upgraded
 * ones. Even if maxUnavailable=0, this holds true. (Disruption stays within the
 * limits of PodDisruptionBudget, if it is configured.) Consider a hypothetical
 * node pool with 5 nodes having maxSurge=2, maxUnavailable=1. This means the
 * upgrade process upgrades 3 nodes simultaneously. It creates 2 additional
 * (upgraded) nodes, then it brings down 3 old (not yet upgraded) nodes at the
 * same time. This ensures that there are always at least 4 nodes available.
 * These upgrade settings configure the upgrade strategy for the node pool. Use
 * strategy to switch between the strategies applied to the node pool. If the
 * strategy is ROLLING, use max_surge and max_unavailable to control the level
 * of parallelism and the level of disruption caused by upgrade. 1. maxSurge
 * controls the number of additional nodes that can be added to the node pool
 * temporarily for the time of the upgrade to increase the number of available
 * nodes. 2. maxUnavailable controls the number of nodes that can be
 * simultaneously unavailable. 3. (maxUnavailable + maxSurge) determines the
 * level of parallelism (how many nodes are being upgraded at the same time). If
 * the strategy is BLUE_GREEN, use blue_green_settings to configure the
 * blue-green upgrade related settings. 1. standard_rollout_policy is the
 * default policy. The policy is used to control the way blue pool gets drained.
 * The draining is executed in the batch mode. The batch size could be specified
 * as either percentage of the node pool size or the number of nodes.
 * batch_soak_duration is the soak time after each batch gets drained. 2.
 * node_pool_soak_duration is the soak time after all blue nodes are drained.
 * After this period, the blue pool nodes will be deleted.
 */
export interface UpgradeSettings {
  /**
   * Settings for blue-green upgrade strategy.
   */
  blueGreenSettings?: BlueGreenSettings;
  /**
   * The maximum number of nodes that can be created beyond the current size of
   * the node pool during the upgrade process.
   */
  maxSurge?: number;
  /**
   * The maximum number of nodes that can be simultaneously unavailable during
   * the upgrade process. A node is considered available if its status is Ready.
   */
  maxUnavailable?: number;
  /**
   * Update strategy of the node pool.
   */
  strategy?:  | "NODE_POOL_UPDATE_STRATEGY_UNSPECIFIED" | "BLUE_GREEN" | "SURGE";
}

function serializeUpgradeSettings(data: any): UpgradeSettings {
  return {
    ...data,
    blueGreenSettings: data["blueGreenSettings"] !== undefined ? serializeBlueGreenSettings(data["blueGreenSettings"]) : undefined,
  };
}

function deserializeUpgradeSettings(data: any): UpgradeSettings {
  return {
    ...data,
    blueGreenSettings: data["blueGreenSettings"] !== undefined ? deserializeBlueGreenSettings(data["blueGreenSettings"]) : undefined,
  };
}

/**
 * UsableSubnetwork resource returns the subnetwork name, its associated
 * network and the primary CIDR range.
 */
export interface UsableSubnetwork {
  /**
   * The range of internal addresses that are owned by this subnetwork.
   */
  ipCidrRange?: string;
  /**
   * Network Name. Example: projects/my-project/global/networks/my-network
   */
  network?: string;
  /**
   * Secondary IP ranges.
   */
  secondaryIpRanges?: UsableSubnetworkSecondaryRange[];
  /**
   * A human readable status message representing the reasons for cases where
   * the caller cannot use the secondary ranges under the subnet. For example if
   * the secondary_ip_ranges is empty due to a permission issue, an insufficient
   * permission message will be given by status_message.
   */
  statusMessage?: string;
  /**
   * Subnetwork Name. Example:
   * projects/my-project/regions/us-central1/subnetworks/my-subnet
   */
  subnetwork?: string;
}

/**
 * Secondary IP range of a usable subnetwork.
 */
export interface UsableSubnetworkSecondaryRange {
  /**
   * The range of IP addresses belonging to this subnetwork secondary range.
   */
  ipCidrRange?: string;
  /**
   * The name associated with this subnetwork secondary range, used when adding
   * an alias IP range to a VM instance.
   */
  rangeName?: string;
  /**
   * This field is to determine the status of the secondary range programmably.
   */
  status?:  | "UNKNOWN" | "UNUSED" | "IN_USE_SERVICE" | "IN_USE_SHAREABLE_POD" | "IN_USE_MANAGED_POD";
}

/**
 * VerticalPodAutoscaling contains global, per-cluster information required by
 * Vertical Pod Autoscaler to automatically adjust the resources of pods
 * controlled by it.
 */
export interface VerticalPodAutoscaling {
  /**
   * Enables vertical pod autoscaling.
   */
  enabled?: boolean;
}

/**
 * Configuration of gVNIC feature.
 */
export interface VirtualNIC {
  /**
   * Whether gVNIC features are enabled in the node pool.
   */
  enabled?: boolean;
}

/**
 * Parameters that can be configured on Windows nodes. Windows Node Config that
 * define the parameters that will be used to configure the Windows node pool
 * settings
 */
export interface WindowsNodeConfig {
  /**
   * OSVersion specifies the Windows node config to be used on the node
   */
  osVersion?:  | "OS_VERSION_UNSPECIFIED" | "OS_VERSION_LTSC2019" | "OS_VERSION_LTSC2022";
}

/**
 * Configuration for the use of Kubernetes Service Accounts in GCP IAM
 * policies.
 */
export interface WorkloadIdentityConfig {
  /**
   * The workload pool to attach all Kubernetes service accounts to.
   */
  workloadPool?: string;
}

/**
 * WorkloadMetadataConfig defines the metadata configuration to expose to
 * workloads on the node pool.
 */
export interface WorkloadMetadataConfig {
  /**
   * Mode is the configuration for how to expose metadata to workloads running
   * on the node pool.
   */
  mode?:  | "MODE_UNSPECIFIED" | "GCE_METADATA" | "GKE_METADATA";
}