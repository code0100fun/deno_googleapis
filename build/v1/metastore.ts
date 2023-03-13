// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Dataproc Metastore API Client for Deno
 * ======================================
 * 
 * The Dataproc Metastore API is used to manage the lifecycle and configuration of metastore services.
 * 
 * Docs: https://cloud.google.com/dataproc-metastore/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Dataproc Metastore API is used to manage the lifecycle and configuration
 * of metastore services.
 */
export class Metastore {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://metastore.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a metastore federation in a project and location.
   *
   * @param parent Required. The relative resource name of the location in which to create a federation service, in the following form:projects/{project_number}/locations/{location_id}.
   */
  async projectsLocationsFederationsCreate(parent: string, req: Federation, opts: ProjectsLocationsFederationsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/federations`);
    if (opts.federationId !== undefined) {
      url.searchParams.append("federationId", String(opts.federationId));
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
   * Deletes a single federation.
   *
   * @param name Required. The relative resource name of the metastore federation to delete, in the following form:projects/{project_number}/locations/{location_id}/federations/{federation_id}.
   */
  async projectsLocationsFederationsDelete(name: string, opts: ProjectsLocationsFederationsDeleteOptions = {}): Promise<Operation> {
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
   * Gets the details of a single federation.
   *
   * @param name Required. The relative resource name of the metastore federation to retrieve, in the following form:projects/{project_number}/locations/{location_id}/federations/{federation_id}.
   */
  async projectsLocationsFederationsGet(name: string): Promise<Federation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Federation;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsFederationsGetIamPolicy(resource: string, opts: ProjectsLocationsFederationsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists federations in a project and location.
   *
   * @param parent Required. The relative resource name of the location of metastore federations to list, in the following form: projects/{project_number}/locations/{location_id}.
   */
  async projectsLocationsFederationsList(parent: string, opts: ProjectsLocationsFederationsListOptions = {}): Promise<ListFederationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/federations`);
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
    return data as ListFederationsResponse;
  }

  /**
   * Updates the fields of a federation.
   *
   * @param name Immutable. The relative resource name of the federation, of the form: projects/{project_number}/locations/{location_id}/federations/{federation_id}`.
   */
  async projectsLocationsFederationsPatch(name: string, req: Federation, opts: ProjectsLocationsFederationsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsFederationsPatchOptions(opts);
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsFederationsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsFederationsTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
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
   * Starts asynchronous cancellation on a long-running operation. The server
   * makes a best effort to cancel the operation, but success is not guaranteed.
   * If the server doesn't support this method, it returns
   * google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or
   * other methods to check whether the cancellation succeeded or whether the
   * operation completed despite cancellation. On successful cancellation, the
   * operation is not deleted; instead, it becomes an operation with an
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * Code.CANCELLED.
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
   * google.rpc.Code.UNIMPLEMENTED.
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
   * server doesn't support this method, it returns UNIMPLEMENTED.
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
   * Creates a new backup in a given project and location.
   *
   * @param parent Required. The relative resource name of the service in which to create a backup of the following form:projects/{project_number}/locations/{location_id}/services/{service_id}.
   */
  async projectsLocationsServicesBackupsCreate(parent: string, req: Backup, opts: ProjectsLocationsServicesBackupsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/backups`);
    if (opts.backupId !== undefined) {
      url.searchParams.append("backupId", String(opts.backupId));
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
   * Deletes a single backup.
   *
   * @param name Required. The relative resource name of the backup to delete, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/backups/{backup_id}.
   */
  async projectsLocationsServicesBackupsDelete(name: string, opts: ProjectsLocationsServicesBackupsDeleteOptions = {}): Promise<Operation> {
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
   * Gets details of a single backup.
   *
   * @param name Required. The relative resource name of the backup to retrieve, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/backups/{backup_id}.
   */
  async projectsLocationsServicesBackupsGet(name: string): Promise<Backup> {
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
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServicesBackupsGetIamPolicy(resource: string, opts: ProjectsLocationsServicesBackupsGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists backups in a service.
   *
   * @param parent Required. The relative resource name of the service whose backups to list, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/backups.
   */
  async projectsLocationsServicesBackupsList(parent: string, opts: ProjectsLocationsServicesBackupsListOptions = {}): Promise<ListBackupsResponse> {
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
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServicesBackupsSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * Creates a metastore service in a project and location.
   *
   * @param parent Required. The relative resource name of the location in which to create a metastore service, in the following form:projects/{project_number}/locations/{location_id}.
   */
  async projectsLocationsServicesCreate(parent: string, req: Service, opts: ProjectsLocationsServicesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/services`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.serviceId !== undefined) {
      url.searchParams.append("serviceId", String(opts.serviceId));
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
   * Deletes a single service.
   *
   * @param name Required. The relative resource name of the metastore service to delete, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}.
   */
  async projectsLocationsServicesDelete(name: string, opts: ProjectsLocationsServicesDeleteOptions = {}): Promise<Operation> {
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
   * Exports metadata from a service.
   *
   * @param service Required. The relative resource name of the metastore service to run export, in the following form:projects/{project_id}/locations/{location_id}/services/{service_id}.
   */
  async projectsLocationsServicesExportMetadata(service: string, req: ExportMetadataRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ service }:exportMetadata`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets the details of a single service.
   *
   * @param name Required. The relative resource name of the metastore service to retrieve, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}.
   */
  async projectsLocationsServicesGet(name: string): Promise<Service> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Service;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServicesGetIamPolicy(resource: string, opts: ProjectsLocationsServicesGetIamPolicyOptions = {}): Promise<Policy> {
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
   * Lists services in a project and location.
   *
   * @param parent Required. The relative resource name of the location of metastore services to list, in the following form:projects/{project_number}/locations/{location_id}.
   */
  async projectsLocationsServicesList(parent: string, opts: ProjectsLocationsServicesListOptions = {}): Promise<ListServicesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/services`);
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
    return data as ListServicesResponse;
  }

  /**
   * Creates a new MetadataImport in a given project and location.
   *
   * @param parent Required. The relative resource name of the service in which to create a metastore import, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}.
   */
  async projectsLocationsServicesMetadataImportsCreate(parent: string, req: MetadataImport, opts: ProjectsLocationsServicesMetadataImportsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/metadataImports`);
    if (opts.metadataImportId !== undefined) {
      url.searchParams.append("metadataImportId", String(opts.metadataImportId));
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
   * Gets details of a single import.
   *
   * @param name Required. The relative resource name of the metadata import to retrieve, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/metadataImports/{import_id}.
   */
  async projectsLocationsServicesMetadataImportsGet(name: string): Promise<MetadataImport> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as MetadataImport;
  }

  /**
   * Lists imports in a service.
   *
   * @param parent Required. The relative resource name of the service whose metadata imports to list, in the following form:projects/{project_number}/locations/{location_id}/services/{service_id}/metadataImports.
   */
  async projectsLocationsServicesMetadataImportsList(parent: string, opts: ProjectsLocationsServicesMetadataImportsListOptions = {}): Promise<ListMetadataImportsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/metadataImports`);
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
    return data as ListMetadataImportsResponse;
  }

  /**
   * Updates a single import. Only the description field of MetadataImport is
   * supported to be updated.
   *
   * @param name Immutable. The relative resource name of the metadata import, of the form:projects/{project_number}/locations/{location_id}/services/{service_id}/metadataImports/{metadata_import_id}.
   */
  async projectsLocationsServicesMetadataImportsPatch(name: string, req: MetadataImport, opts: ProjectsLocationsServicesMetadataImportsPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsServicesMetadataImportsPatchOptions(opts);
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
   * Updates the parameters of a single service.
   *
   * @param name Immutable. The relative resource name of the metastore service, in the following format:projects/{project_number}/locations/{location_id}/services/{service_id}.
   */
  async projectsLocationsServicesPatch(name: string, req: Service, opts: ProjectsLocationsServicesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsServicesPatchOptions(opts);
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
   * Restores a service from a backup.
   *
   * @param service Required. The relative resource name of the metastore service to run restore, in the following form:projects/{project_id}/locations/{location_id}/services/{service_id}.
   */
  async projectsLocationsServicesRestore(service: string, req: RestoreServiceRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ service }:restore`);
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
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServicesSetIamPolicy(resource: string, req: SetIamPolicyRequest): Promise<Policy> {
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
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsServicesTestIamPermissions(resource: string, req: TestIamPermissionsRequest): Promise<TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TestIamPermissionsResponse;
  }
}

/**
 * Specifies the audit configuration for a service. The configuration
 * determines which permission types are logged, and what identities, if any,
 * are exempted from logging. An AuditConfig must have one or more
 * AuditLogConfigs.If there are AuditConfigs for both allServices and a specific
 * service, the union of the two AuditConfigs is used for that service: the
 * log_types specified in each AuditConfig are enabled, and the exempted_members
 * in each AuditLogConfig are exempted.Example Policy with multiple
 * AuditConfigs: { "audit_configs": [ { "service": "allServices",
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" }, { "log_type":
 * "ADMIN_READ" } ] }, { "service": "sampleservice.googleapis.com",
 * "audit_log_configs": [ { "log_type": "DATA_READ" }, { "log_type":
 * "DATA_WRITE", "exempted_members": [ "user:aliya@example.com" ] } ] } ] } For
 * sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ
 * logging. It also exempts jose@example.com from DATA_READ logging, and
 * aliya@example.com from DATA_WRITE logging.
 */
export interface AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: AuditLogConfig[];
  /**
   * Specifies a service that will be enabled for audit logging. For example,
   * storage.googleapis.com, cloudsql.googleapis.com. allServices is a special
   * value that covers all services.
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
 * Configuration information for the auxiliary service versions.
 */
export interface AuxiliaryVersionConfig {
  /**
   * A mapping of Hive metastore configuration key-value pairs to apply to the
   * auxiliary Hive metastore (configured in hive-site.xml) in addition to the
   * primary version's overrides. If keys are present in both the auxiliary
   * version's overrides and the primary version's overrides, the value from the
   * auxiliary version's overrides takes precedence.
   */
  configOverrides?: {
    [key: string]: string
  };
  /**
   * Output only. The network configuration contains the endpoint URI(s) of the
   * auxiliary Hive metastore service.
   */
  readonly networkConfig?: NetworkConfig;
  /**
   * The Hive metastore version of the auxiliary service. It must be less than
   * the primary Hive metastore service's version.
   */
  version?: string;
}

/**
 * Represents a backend metastore for the federation.
 */
export interface BackendMetastore {
  /**
   * The type of the backend metastore.
   */
  metastoreType?:  | "METASTORE_TYPE_UNSPECIFIED" | "DATAPROC_METASTORE";
  /**
   * The relative resource name of the metastore that is being federated. The
   * formats of the relative resource names for the currently supported
   * metastores are listed below: BigQuery projects/{project_id} Dataproc
   * Metastore projects/{project_id}/locations/{location}/services/{service_id}
   */
  name?: string;
}

/**
 * The details of a backup resource.
 */
export interface Backup {
  /**
   * Output only. The time when the backup was started.
   */
  readonly createTime?: Date;
  /**
   * The description of the backup.
   */
  description?: string;
  /**
   * Output only. The time when the backup finished creating.
   */
  readonly endTime?: Date;
  /**
   * Immutable. The relative resource name of the backup, in the following
   * form:projects/{project_number}/locations/{location_id}/services/{service_id}/backups/{backup_id}
   */
  name?: string;
  /**
   * Output only. Services that are restoring from the backup.
   */
  readonly restoringServices?: string[];
  /**
   * Output only. The revision of the service at the time of backup.
   */
  readonly serviceRevision?: Service;
  /**
   * Output only. The current state of the backup.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "DELETING" | "ACTIVE" | "FAILED" | "RESTORING";
}

/**
 * Associates members, or principals, with a role.
 */
export interface Binding {
  /**
   * The condition that is associated with this binding.If the condition
   * evaluates to true, then this binding applies to the current request.If the
   * condition evaluates to false, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding.To learn which
   * resources support conditions in their IAM policies, see the IAM
   * documentation
   * (https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: Expr;
  /**
   * Specifies the principals requesting access for a Google Cloud resource.
   * members can have the following values: allUsers: A special identifier that
   * represents anyone who is on the internet; with or without a Google account.
   * allAuthenticatedUsers: A special identifier that represents anyone who is
   * authenticated with a Google account or a service account. Does not include
   * identities that come from external identity providers (IdPs) through
   * identity federation. user:{emailid}: An email address that represents a
   * specific Google account. For example, alice@example.com .
   * serviceAccount:{emailid}: An email address that represents a Google service
   * account. For example, my-other-app@appspot.gserviceaccount.com.
   * serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]: An
   * identifier for a Kubernetes service account
   * (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts).
   * For example, my-project.svc.id.goog[my-namespace/my-kubernetes-sa].
   * group:{emailid}: An email address that represents a Google group. For
   * example, admins@example.com. domain:{domain}: The G Suite domain (primary)
   * that represents all the users of that domain. For example, google.com or
   * example.com. deleted:user:{emailid}?uid={uniqueid}: An email address (plus
   * unique identifier) representing a user that has been recently deleted. For
   * example, alice@example.com?uid=123456789012345678901. If the user is
   * recovered, this value reverts to user:{emailid} and the recovered user
   * retains the role in the binding.
   * deleted:serviceAccount:{emailid}?uid={uniqueid}: An email address (plus
   * unique identifier) representing a service account that has been recently
   * deleted. For example,
   * my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901. If the
   * service account is undeleted, this value reverts to
   * serviceAccount:{emailid} and the undeleted service account retains the role
   * in the binding. deleted:group:{emailid}?uid={uniqueid}: An email address
   * (plus unique identifier) representing a Google group that has been recently
   * deleted. For example, admins@example.com?uid=123456789012345678901. If the
   * group is recovered, this value reverts to group:{emailid} and the recovered
   * group retains the role in the binding.
   */
  members?: string[];
  /**
   * Role that is assigned to the list of members, or principals. For example,
   * roles/viewer, roles/editor, or roles/owner.
   */
  role?: string;
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Contains information of the customer's network configurations.
 */
export interface Consumer {
  /**
   * Output only. The URI of the endpoint used to access the metastore service.
   */
  readonly endpointUri?: string;
  /**
   * Immutable. The subnetwork of the customer project from which an IP address
   * is reserved and used as the Dataproc Metastore service's endpoint. It is
   * accessible to hosts in the subnet and to all hosts in a subnet in the same
   * region and same network. There must be at least one IP address available in
   * the subnet's primary range. The subnet is specified in the following
   * form:projects/{project_number}/regions/{region_id}/subnetworks/{subnetwork_id}
   */
  subnetwork?: string;
}

/**
 * A specification of the location of and metadata about a database dump from a
 * relational database management system.
 */
export interface DatabaseDump {
  /**
   * The type of the database.
   */
  databaseType?:  | "DATABASE_TYPE_UNSPECIFIED" | "MYSQL";
  /**
   * A Cloud Storage object or folder URI that specifies the source from which
   * to import metadata. It must begin with gs://.
   */
  gcsUri?: string;
  /**
   * The name of the source database.
   */
  sourceDatabase?: string;
  /**
   * Optional. The type of the database dump. If unspecified, defaults to
   * MYSQL.
   */
  type?:  | "TYPE_UNSPECIFIED" | "MYSQL" | "AVRO";
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
 * Encryption settings for the service.
 */
export interface EncryptionConfig {
  /**
   * The fully qualified customer provided Cloud KMS key name to use for
   * customer data encryption, in the following
   * form:projects/{project_number}/locations/{location_id}/keyRings/{key_ring_id}/cryptoKeys/{crypto_key_id}.
   */
  kmsKey?: string;
}

/**
 * Request message for DataprocMetastore.ExportMetadata.
 */
export interface ExportMetadataRequest {
  /**
   * Optional. The type of the database dump. If unspecified, defaults to
   * MYSQL.
   */
  databaseDumpType?:  | "TYPE_UNSPECIFIED" | "MYSQL" | "AVRO";
  /**
   * A Cloud Storage URI of a folder, in the format gs:///. A sub-folder
   * containing exported files will be created below it.
   */
  destinationGcsFolder?: string;
  /**
   * Optional. A request ID. Specify a unique request ID to allow the server to
   * ignore the request if it has completed. The server will ignore subsequent
   * requests that provide a duplicate request ID for at least 60 minutes after
   * the first request.For example, if an initial request times out, followed by
   * another request with the same request ID, the server ignores the second
   * request to prevent the creation of duplicate commitments.The request ID
   * must be a valid UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format). A
   * zero UUID (00000000-0000-0000-0000-000000000000) is not supported.
   */
  requestId?: string;
}

/**
 * Represents a textual expression in the Common Expression Language (CEL)
 * syntax. CEL is a C-like expression language. The syntax and semantics of CEL
 * are documented at https://github.com/google/cel-spec.Example (Comparison):
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
 * Represents a federation of multiple backend metastores.
 */
export interface Federation {
  /**
   * A map from BackendMetastore rank to BackendMetastores from which the
   * federation service serves metadata at query time. The map key represents
   * the order in which BackendMetastores should be evaluated to resolve
   * database names at query time and should be greater than or equal to zero. A
   * BackendMetastore with a lower number will be evaluated before a
   * BackendMetastore with a higher number.
   */
  backendMetastores?: {
    [key: string]: BackendMetastore
  };
  /**
   * Output only. The time when the metastore federation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The federation endpoint.
   */
  readonly endpointUri?: string;
  /**
   * User-defined labels for the metastore federation.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Immutable. The relative resource name of the federation, of the form:
   * projects/{project_number}/locations/{location_id}/federations/{federation_id}`.
   */
  name?: string;
  /**
   * Output only. The current state of the federation.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "UPDATING" | "DELETING" | "ERROR";
  /**
   * Output only. Additional information about the current state of the
   * metastore federation, if available.
   */
  readonly stateMessage?: string;
  /**
   * Output only. The globally unique resource identifier of the metastore
   * federation.
   */
  readonly uid?: string;
  /**
   * Output only. The time when the metastore federation was last updated.
   */
  readonly updateTime?: Date;
  /**
   * Immutable. The Apache Hive metastore version of the federation. All
   * backend metastore versions must be compatible with the federation version.
   */
  version?: string;
}

/**
 * Specifies configuration information specific to running Hive metastore
 * software as the metastore service.
 */
export interface HiveMetastoreConfig {
  /**
   * A mapping of Hive metastore version to the auxiliary version
   * configuration. When specified, a secondary Hive metastore service is
   * created along with the primary service. All auxiliary versions must be less
   * than the service's primary version. The key is the auxiliary service name
   * and it must match the regular expression a-z?. This means that the first
   * character must be a lowercase letter, and all the following characters must
   * be hyphens, lowercase letters, or digits, except the last character, which
   * cannot be a hyphen.
   */
  auxiliaryVersions?: {
    [key: string]: AuxiliaryVersionConfig
  };
  /**
   * A mapping of Hive metastore configuration key-value pairs to apply to the
   * Hive metastore (configured in hive-site.xml). The mappings override system
   * defaults (some keys cannot be overridden). These overrides are also applied
   * to auxiliary versions and can be further customized in the auxiliary
   * version's AuxiliaryVersionConfig.
   */
  configOverrides?: {
    [key: string]: string
  };
  /**
   * Information used to configure the Hive metastore service as a service
   * principal in a Kerberos realm. To disable Kerberos, use the UpdateService
   * method and specify this field's path
   * (hive_metastore_config.kerberos_config) in the request's update_mask while
   * omitting this field from the request's service.
   */
  kerberosConfig?: KerberosConfig;
  /**
   * Immutable. The Hive metastore schema version.
   */
  version?: string;
}

/**
 * A specification of a supported version of the Hive Metastore software.
 */
export interface HiveMetastoreVersion {
  /**
   * Whether version will be chosen by the server if a metastore service is
   * created with a HiveMetastoreConfig that omits the version.
   */
  isDefault?: boolean;
  /**
   * The semantic version of the Hive Metastore software.
   */
  version?: string;
}

/**
 * Configuration information for a Kerberos principal.
 */
export interface KerberosConfig {
  /**
   * A Kerberos keytab file that can be used to authenticate a service
   * principal with a Kerberos Key Distribution Center (KDC).
   */
  keytab?: Secret;
  /**
   * A Cloud Storage URI that specifies the path to a krb5.conf file. It is of
   * the form gs://{bucket_name}/path/to/krb5.conf, although the file does not
   * need to be named krb5.conf explicitly.
   */
  krb5ConfigGcsUri?: string;
  /**
   * A Kerberos principal that exists in the both the keytab the KDC to
   * authenticate as. A typical principal is of the form primary/instance@REALM,
   * but there is no exact format.
   */
  principal?: string;
}

/**
 * Response message for DataprocMetastore.ListBackups.
 */
export interface ListBackupsResponse {
  /**
   * The backups of the specified service.
   */
  backups?: Backup[];
  /**
   * A token that can be sent as page_token to retrieve the next page. If this
   * field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Response message for ListFederations
 */
export interface ListFederationsResponse {
  /**
   * The services in the specified location.
   */
  federations?: Federation[];
  /**
   * A token that can be sent as page_token to retrieve the next page. If this
   * field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
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
 * Response message for DataprocMetastore.ListMetadataImports.
 */
export interface ListMetadataImportsResponse {
  /**
   * The imports in the specified service.
   */
  metadataImports?: MetadataImport[];
  /**
   * A token that can be sent as page_token to retrieve the next page. If this
   * field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
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
 * Response message for DataprocMetastore.ListServices.
 */
export interface ListServicesResponse {
  /**
   * A token that can be sent as page_token to retrieve the next page. If this
   * field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The services in the specified location.
   */
  services?: Service[];
  /**
   * Locations that could not be reached.
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
   * The canonical id for this location. For example: "us-east1".
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
   * For example: "projects/example-project/locations/us-east1"
   */
  name?: string;
}

/**
 * Metadata about the service in a location.
 */
export interface LocationMetadata {
  /**
   * The versions of Hive Metastore that can be used when creating a new
   * metastore service in this location. The server guarantees that exactly one
   * HiveMetastoreVersion in the list will set is_default.
   */
  supportedHiveMetastoreVersions?: HiveMetastoreVersion[];
}

/**
 * Maintenance window. This specifies when Dataproc Metastore may perform
 * system maintenance operation to the service.
 */
export interface MaintenanceWindow {
  /**
   * The day of week, when the window starts.
   */
  dayOfWeek?:  | "DAY_OF_WEEK_UNSPECIFIED" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  /**
   * The hour of day (0-23) when the window starts.
   */
  hourOfDay?: number;
}

/**
 * The details of a metadata export operation.
 */
export interface MetadataExport {
  /**
   * Output only. The type of the database dump.
   */
  readonly databaseDumpType?:  | "TYPE_UNSPECIFIED" | "MYSQL" | "AVRO";
  /**
   * Output only. A Cloud Storage URI of a folder that metadata are exported
   * to, in the form of gs:////, where is automatically generated.
   */
  readonly destinationGcsUri?: string;
  /**
   * Output only. The time when the export ended.
   */
  readonly endTime?: Date;
  /**
   * Output only. The time when the export started.
   */
  readonly startTime?: Date;
  /**
   * Output only. The current state of the export.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
}

/**
 * A metastore resource that imports metadata.
 */
export interface MetadataImport {
  /**
   * Output only. The time when the metadata import was started.
   */
  readonly createTime?: Date;
  /**
   * Immutable. A database dump from a pre-existing metastore's database.
   */
  databaseDump?: DatabaseDump;
  /**
   * The description of the metadata import.
   */
  description?: string;
  /**
   * Output only. The time when the metadata import finished.
   */
  readonly endTime?: Date;
  /**
   * Immutable. The relative resource name of the metadata import, of the
   * form:projects/{project_number}/locations/{location_id}/services/{service_id}/metadataImports/{metadata_import_id}.
   */
  name?: string;
  /**
   * Output only. The current state of the metadata import.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "UPDATING" | "FAILED";
  /**
   * Output only. The time when the metadata import was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * The metadata management activities of the metastore service.
 */
export interface MetadataManagementActivity {
  /**
   * Output only. The latest metadata exports of the metastore service.
   */
  readonly metadataExports?: MetadataExport[];
  /**
   * Output only. The latest restores of the metastore service.
   */
  readonly restores?: Restore[];
}

/**
 * Network configuration for the Dataproc Metastore service.
 */
export interface NetworkConfig {
  /**
   * Immutable. The consumer-side network configuration for the Dataproc
   * Metastore instance.
   */
  consumers?: Consumer[];
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface Operation {
  /**
   * If the value is false, it means the operation is still in progress. If
   * true, the operation is completed, and either error or response is
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
   * that originally returns it. If you use the default HTTP mapping, the name
   * should be a resource name ending with operations/{unique_id}.
   */
  name?: string;
  /**
   * The normal response of the operation in case of success. If the original
   * method returns no data on success, such as Delete, the response is
   * google.protobuf.Empty. If the original method is standard
   * Get/Create/Update, the response should be the resource. For other methods,
   * the response should have the type XxxResponse, where Xxx is the original
   * method name. For example, if the original method name is TakeSnapshot(),
   * the inferred response type is TakeSnapshotResponse.
   */
  response?: {
    [key: string]: any
  };
}

/**
 * Represents the metadata of a long-running operation.
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
   * Output only. Identifies whether the caller has requested cancellation of
   * the operation. Operations that have successfully been cancelled have
   * Operation.error value with a google.rpc.Status.code of 1, corresponding to
   * Code.CANCELLED.
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
 * An Identity and Access Management (IAM) policy, which specifies access
 * controls for Google Cloud resources.A Policy is a collection of bindings. A
 * binding binds one or more members, or principals, to a single role.
 * Principals can be user accounts, service accounts, Google groups, and domains
 * (such as G Suite). A role is a named list of permissions; each role can be an
 * IAM predefined role or a user-created custom role.For some types of Google
 * Cloud resources, a binding can also specify a condition, which is a logical
 * expression that allows access to a resource only if the expression evaluates
 * to true. A condition can add constraints based on attributes of the request,
 * the resource, or both. To learn which resources support conditions in their
 * IAM policies, see the IAM documentation
 * (https://cloud.google.com/iam/help/conditions/resource-policies).JSON
 * example: { "bindings": [ { "role": "roles/resourcemanager.organizationAdmin",
 * "members": [ "user:mike@example.com", "group:admins@example.com",
 * "domain:google.com",
 * "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role":
 * "roles/resourcemanager.organizationViewer", "members": [
 * "user:eve@example.com" ], "condition": { "title": "expirable access",
 * "description": "Does not grant access after Sep 2020", "expression":
 * "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } ], "etag":
 * "BwWWja0YfJA=", "version": 3 } YAML example: bindings: - members: -
 * user:mike@example.com - group:admins@example.com - domain:google.com -
 * serviceAccount:my-project-id@appspot.gserviceaccount.com role:
 * roles/resourcemanager.organizationAdmin - members: - user:eve@example.com
 * role: roles/resourcemanager.organizationViewer condition: title: expirable
 * access description: Does not grant access after Sep 2020 expression:
 * request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA=
 * version: 3 For a description of IAM and its features, see the IAM
 * documentation (https://cloud.google.com/iam/docs/).
 */
export interface Policy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: AuditConfig[];
  /**
   * Associates a list of members, or principals, with a role. Optionally, may
   * specify a condition that determines how and when the bindings are applied.
   * Each of the bindings must contain at least one principal.The bindings in a
   * Policy can refer to up to 1,500 principals; up to 250 of these principals
   * can be Google groups. Each occurrence of a principal counts towards these
   * limits. For example, if the bindings grant 50 different roles to
   * user:alice@example.com, and not to any other principal, then you can add
   * another 1,450 principals to the bindings in the Policy.
   */
  bindings?: Binding[];
  /**
   * etag is used for optimistic concurrency control as a way to help prevent
   * simultaneous updates of a policy from overwriting each other. It is
   * strongly suggested that systems make use of the etag in the
   * read-modify-write cycle to perform policy updates in order to avoid race
   * conditions: An etag is returned in the response to getIamPolicy, and
   * systems are expected to put that etag in the request to setIamPolicy to
   * ensure that their change will be applied to the same version of the
   * policy.Important: If you use IAM Conditions, you must include the etag
   * field whenever you call setIamPolicy. If you omit this field, then IAM
   * allows you to overwrite a version 3 policy with a version 1 policy, and all
   * of the conditions in the version 3 policy are lost.
   */
  etag?: Uint8Array;
  /**
   * Specifies the format of the policy.Valid values are 0, 1, and 3. Requests
   * that specify an invalid value are rejected.Any operation that affects
   * conditional role bindings must specify version 3. This requirement applies
   * to the following operations: Getting a policy that includes a conditional
   * role binding Adding a conditional role binding to a policy Changing a
   * conditional role binding in a policy Removing any role binding, with or
   * without a condition, from a policy that includes conditionsImportant: If
   * you use IAM Conditions, you must include the etag field whenever you call
   * setIamPolicy. If you omit this field, then IAM allows you to overwrite a
   * version 3 policy with a version 1 policy, and all of the conditions in the
   * version 3 policy are lost.If a policy does not include any conditions,
   * operations on that policy may specify any valid version or leave the field
   * unset.To learn which resources support conditions in their IAM policies,
   * see the IAM documentation
   * (https://cloud.google.com/iam/help/conditions/resource-policies).
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
 * Additional options for Metastore#projectsLocationsFederationsCreate.
 */
export interface ProjectsLocationsFederationsCreateOptions {
  /**
   * Required. The ID of the metastore federation, which is used as the final
   * component of the metastore federation's name.This value must be between 2
   * and 63 characters long inclusive, begin with a letter, end with a letter or
   * number, and consist of alpha-numeric ASCII characters or hyphens.
   */
  federationId?: string;
  /**
   * Optional. A request ID. Specify a unique request ID to allow the server to
   * ignore the request if it has completed. The server will ignore subsequent
   * requests that provide a duplicate request ID for at least 60 minutes after
   * the first request.For example, if an initial request times out, followed by
   * another request with the same request ID, the server ignores the second
   * request to prevent the creation of duplicate commitments.The request ID
   * must be a valid UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero
   * UUID (00000000-0000-0000-0000-000000000000) is not supported.
   */
  requestId?: string;
}

/**
 * Additional options for Metastore#projectsLocationsFederationsDelete.
 */
export interface ProjectsLocationsFederationsDeleteOptions {
  /**
   * Optional. A request ID. Specify a unique request ID to allow the server to
   * ignore the request if it has completed. The server will ignore subsequent
   * requests that provide a duplicate request ID for at least 60 minutes after
   * the first request.For example, if an initial request times out, followed by
   * another request with the same request ID, the server ignores the second
   * request to prevent the creation of duplicate commitments.The request ID
   * must be a valid UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero
   * UUID (00000000-0000-0000-0000-000000000000) is not supported.
   */
  requestId?: string;
}

/**
 * Additional options for Metastore#projectsLocationsFederationsGetIamPolicy.
 */
export interface ProjectsLocationsFederationsGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy.Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected.Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset.The policy in the response
   * might use the policy version that you specified, or it might use a lower
   * policy version. For example, if you specify version 3, but the policy has
   * no conditional role bindings, the response uses version 1.To learn which
   * resources support conditions in their IAM policies, see the IAM
   * documentation
   * (https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for Metastore#projectsLocationsFederationsList.
 */
export interface ProjectsLocationsFederationsListOptions {
  /**
   * Optional. The filter to apply to list results.
   */
  filter?: string;
  /**
   * Optional. Specify the ordering of results as described in Sorting Order
   * (https://cloud.google.com/apis/design/design_patterns#sorting_order). If
   * not specified, the results will be sorted in the default order.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of federations to return. The response may
   * contain less than the maximum number. If unspecified, no more than 500
   * services are returned. The maximum value is 1000; values above 1000 are
   * changed to 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous ListFederationServices
   * call. Provide this token to retrieve the subsequent page.To retrieve the
   * first page, supply an empty page token.When paginating, other parameters
   * provided to ListFederationServices must match the call that provided the
   * page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Metastore#projectsLocationsFederationsPatch.
 */
export interface ProjectsLocationsFederationsPatchOptions {
  /**
   * Optional. A request ID. Specify a unique request ID to allow the server to
   * ignore the request if it has completed. The server will ignore subsequent
   * requests that provide a duplicate request ID for at least 60 minutes after
   * the first request.For example, if an initial request times out, followed by
   * another request with the same request ID, the server ignores the second
   * request to prevent the creation of duplicate commitments.The request ID
   * must be a valid UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero
   * UUID (00000000-0000-0000-0000-000000000000) is not supported.
   */
  requestId?: string;
  /**
   * Required. A field mask used to specify the fields to be overwritten in the
   * metastore federation resource by the update. Fields specified in the
   * update_mask are relative to the resource (not to the full request). A field
   * is overwritten if it is in the mask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsFederationsPatchOptions(data: any): ProjectsLocationsFederationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsFederationsPatchOptions(data: any): ProjectsLocationsFederationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Metastore#projectsLocationsList.
 */
export interface ProjectsLocationsListOptions {
  /**
   * A filter to narrow down results to a preferred subset. The filtering
   * language accepts strings like "displayName=tokyo", and is documented in
   * more detail in AIP-160 (https://google.aip.dev/160).
   */
  filter?: string;
  /**
   * The maximum number of results to return. If not set, the service selects a
   * default.
   */
  pageSize?: number;
  /**
   * A page token received from the next_page_token field in the response. Send
   * that page token to receive the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for Metastore#projectsLocationsOperationsList.
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
 * Additional options for Metastore#projectsLocationsServicesBackupsCreate.
 */
export interface ProjectsLocationsServicesBackupsCreateOptions {
  /**
   * Required. The ID of the backup, which is used as the final component of
   * the backup's name.This value must be between 1 and 64 characters long,
   * begin with a letter, end with a letter or number, and consist of
   * alpha-numeric ASCII characters or hyphens.
   */
  backupId?: string;
  /**
   * Optional. A request ID. Specify a unique request ID to allow the server to
   * ignore the request if it has completed. The server will ignore subsequent
   * requests that provide a duplicate request ID for at least 60 minutes after
   * the first request.For example, if an initial request times out, followed by
   * another request with the same request ID, the server ignores the second
   * request to prevent the creation of duplicate commitments.The request ID
   * must be a valid UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero
   * UUID (00000000-0000-0000-0000-000000000000) is not supported.
   */
  requestId?: string;
}

/**
 * Additional options for Metastore#projectsLocationsServicesBackupsDelete.
 */
export interface ProjectsLocationsServicesBackupsDeleteOptions {
  /**
   * Optional. A request ID. Specify a unique request ID to allow the server to
   * ignore the request if it has completed. The server will ignore subsequent
   * requests that provide a duplicate request ID for at least 60 minutes after
   * the first request.For example, if an initial request times out, followed by
   * another request with the same request ID, the server ignores the second
   * request to prevent the creation of duplicate commitments.The request ID
   * must be a valid UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero
   * UUID (00000000-0000-0000-0000-000000000000) is not supported.
   */
  requestId?: string;
}

/**
 * Additional options for
 * Metastore#projectsLocationsServicesBackupsGetIamPolicy.
 */
export interface ProjectsLocationsServicesBackupsGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy.Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected.Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset.The policy in the response
   * might use the policy version that you specified, or it might use a lower
   * policy version. For example, if you specify version 3, but the policy has
   * no conditional role bindings, the response uses version 1.To learn which
   * resources support conditions in their IAM policies, see the IAM
   * documentation
   * (https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for Metastore#projectsLocationsServicesBackupsList.
 */
export interface ProjectsLocationsServicesBackupsListOptions {
  /**
   * Optional. The filter to apply to list results.
   */
  filter?: string;
  /**
   * Optional. Specify the ordering of results as described in Sorting Order
   * (https://cloud.google.com/apis/design/design_patterns#sorting_order). If
   * not specified, the results will be sorted in the default order.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of backups to return. The response may
   * contain less than the maximum number. If unspecified, no more than 500
   * backups are returned. The maximum value is 1000; values above 1000 are
   * changed to 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous
   * DataprocMetastore.ListBackups call. Provide this token to retrieve the
   * subsequent page.To retrieve the first page, supply an empty page token.When
   * paginating, other parameters provided to DataprocMetastore.ListBackups must
   * match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Metastore#projectsLocationsServicesCreate.
 */
export interface ProjectsLocationsServicesCreateOptions {
  /**
   * Optional. A request ID. Specify a unique request ID to allow the server to
   * ignore the request if it has completed. The server will ignore subsequent
   * requests that provide a duplicate request ID for at least 60 minutes after
   * the first request.For example, if an initial request times out, followed by
   * another request with the same request ID, the server ignores the second
   * request to prevent the creation of duplicate commitments.The request ID
   * must be a valid UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero
   * UUID (00000000-0000-0000-0000-000000000000) is not supported.
   */
  requestId?: string;
  /**
   * Required. The ID of the metastore service, which is used as the final
   * component of the metastore service's name.This value must be between 2 and
   * 63 characters long inclusive, begin with a letter, end with a letter or
   * number, and consist of alpha-numeric ASCII characters or hyphens.
   */
  serviceId?: string;
}

/**
 * Additional options for Metastore#projectsLocationsServicesDelete.
 */
export interface ProjectsLocationsServicesDeleteOptions {
  /**
   * Optional. A request ID. Specify a unique request ID to allow the server to
   * ignore the request if it has completed. The server will ignore subsequent
   * requests that provide a duplicate request ID for at least 60 minutes after
   * the first request.For example, if an initial request times out, followed by
   * another request with the same request ID, the server ignores the second
   * request to prevent the creation of duplicate commitments.The request ID
   * must be a valid UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero
   * UUID (00000000-0000-0000-0000-000000000000) is not supported.
   */
  requestId?: string;
}

/**
 * Additional options for Metastore#projectsLocationsServicesGetIamPolicy.
 */
export interface ProjectsLocationsServicesGetIamPolicyOptions {
  /**
   * Optional. The maximum policy version that will be used to format the
   * policy.Valid values are 0, 1, and 3. Requests specifying an invalid value
   * will be rejected.Requests for policies with any conditional role bindings
   * must specify version 3. Policies with no conditional role bindings may
   * specify any valid value or leave the field unset.The policy in the response
   * might use the policy version that you specified, or it might use a lower
   * policy version. For example, if you specify version 3, but the policy has
   * no conditional role bindings, the response uses version 1.To learn which
   * resources support conditions in their IAM policies, see the IAM
   * documentation
   * (https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  ["options.requestedPolicyVersion"]?: number;
}

/**
 * Additional options for Metastore#projectsLocationsServicesList.
 */
export interface ProjectsLocationsServicesListOptions {
  /**
   * Optional. The filter to apply to list results.
   */
  filter?: string;
  /**
   * Optional. Specify the ordering of results as described in Sorting Order
   * (https://cloud.google.com/apis/design/design_patterns#sorting_order). If
   * not specified, the results will be sorted in the default order.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of services to return. The response may
   * contain less than the maximum number. If unspecified, no more than 500
   * services are returned. The maximum value is 1000; values above 1000 are
   * changed to 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous
   * DataprocMetastore.ListServices call. Provide this token to retrieve the
   * subsequent page.To retrieve the first page, supply an empty page token.When
   * paginating, other parameters provided to DataprocMetastore.ListServices
   * must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Metastore#projectsLocationsServicesMetadataImportsCreate.
 */
export interface ProjectsLocationsServicesMetadataImportsCreateOptions {
  /**
   * Required. The ID of the metadata import, which is used as the final
   * component of the metadata import's name.This value must be between 1 and 64
   * characters long, begin with a letter, end with a letter or number, and
   * consist of alpha-numeric ASCII characters or hyphens.
   */
  metadataImportId?: string;
  /**
   * Optional. A request ID. Specify a unique request ID to allow the server to
   * ignore the request if it has completed. The server will ignore subsequent
   * requests that provide a duplicate request ID for at least 60 minutes after
   * the first request.For example, if an initial request times out, followed by
   * another request with the same request ID, the server ignores the second
   * request to prevent the creation of duplicate commitments.The request ID
   * must be a valid UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero
   * UUID (00000000-0000-0000-0000-000000000000) is not supported.
   */
  requestId?: string;
}

/**
 * Additional options for
 * Metastore#projectsLocationsServicesMetadataImportsList.
 */
export interface ProjectsLocationsServicesMetadataImportsListOptions {
  /**
   * Optional. The filter to apply to list results.
   */
  filter?: string;
  /**
   * Optional. Specify the ordering of results as described in Sorting Order
   * (https://cloud.google.com/apis/design/design_patterns#sorting_order). If
   * not specified, the results will be sorted in the default order.
   */
  orderBy?: string;
  /**
   * Optional. The maximum number of imports to return. The response may
   * contain less than the maximum number. If unspecified, no more than 500
   * imports are returned. The maximum value is 1000; values above 1000 are
   * changed to 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous
   * DataprocMetastore.ListServices call. Provide this token to retrieve the
   * subsequent page.To retrieve the first page, supply an empty page token.When
   * paginating, other parameters provided to DataprocMetastore.ListServices
   * must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Metastore#projectsLocationsServicesMetadataImportsPatch.
 */
export interface ProjectsLocationsServicesMetadataImportsPatchOptions {
  /**
   * Optional. A request ID. Specify a unique request ID to allow the server to
   * ignore the request if it has completed. The server will ignore subsequent
   * requests that provide a duplicate request ID for at least 60 minutes after
   * the first request.For example, if an initial request times out, followed by
   * another request with the same request ID, the server ignores the second
   * request to prevent the creation of duplicate commitments.The request ID
   * must be a valid UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero
   * UUID (00000000-0000-0000-0000-000000000000) is not supported.
   */
  requestId?: string;
  /**
   * Required. A field mask used to specify the fields to be overwritten in the
   * metadata import resource by the update. Fields specified in the update_mask
   * are relative to the resource (not to the full request). A field is
   * overwritten if it is in the mask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsServicesMetadataImportsPatchOptions(data: any): ProjectsLocationsServicesMetadataImportsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsServicesMetadataImportsPatchOptions(data: any): ProjectsLocationsServicesMetadataImportsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Metastore#projectsLocationsServicesPatch.
 */
export interface ProjectsLocationsServicesPatchOptions {
  /**
   * Optional. A request ID. Specify a unique request ID to allow the server to
   * ignore the request if it has completed. The server will ignore subsequent
   * requests that provide a duplicate request ID for at least 60 minutes after
   * the first request.For example, if an initial request times out, followed by
   * another request with the same request ID, the server ignores the second
   * request to prevent the creation of duplicate commitments.The request ID
   * must be a valid UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format) A zero
   * UUID (00000000-0000-0000-0000-000000000000) is not supported.
   */
  requestId?: string;
  /**
   * Required. A field mask used to specify the fields to be overwritten in the
   * metastore service resource by the update. Fields specified in the
   * update_mask are relative to the resource (not to the full request). A field
   * is overwritten if it is in the mask.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsServicesPatchOptions(data: any): ProjectsLocationsServicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsServicesPatchOptions(data: any): ProjectsLocationsServicesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * The details of a metadata restore operation.
 */
export interface Restore {
  /**
   * Output only. The relative resource name of the metastore service backup to
   * restore from, in the following
   * form:projects/{project_id}/locations/{location_id}/services/{service_id}/backups/{backup_id}.
   */
  readonly backup?: string;
  /**
   * Output only. The restore details containing the revision of the service to
   * be restored to, in format of JSON.
   */
  readonly details?: string;
  /**
   * Output only. The time when the restore ended.
   */
  readonly endTime?: Date;
  /**
   * Output only. The time when the restore started.
   */
  readonly startTime?: Date;
  /**
   * Output only. The current state of the restore.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
  /**
   * Output only. The type of restore.
   */
  readonly type?:  | "RESTORE_TYPE_UNSPECIFIED" | "FULL" | "METADATA_ONLY";
}

/**
 * Request message for DataprocMetastore.Restore.
 */
export interface RestoreServiceRequest {
  /**
   * Required. The relative resource name of the metastore service backup to
   * restore from, in the following
   * form:projects/{project_id}/locations/{location_id}/services/{service_id}/backups/{backup_id}.
   */
  backup?: string;
  /**
   * Optional. A request ID. Specify a unique request ID to allow the server to
   * ignore the request if it has completed. The server will ignore subsequent
   * requests that provide a duplicate request ID for at least 60 minutes after
   * the first request.For example, if an initial request times out, followed by
   * another request with the same request ID, the server ignores the second
   * request to prevent the creation of duplicate commitments.The request ID
   * must be a valid UUID
   * (https://en.wikipedia.org/wiki/Universally_unique_identifier#Format). A
   * zero UUID (00000000-0000-0000-0000-000000000000) is not supported.
   */
  requestId?: string;
  /**
   * Optional. The type of restore. If unspecified, defaults to METADATA_ONLY.
   */
  restoreType?:  | "RESTORE_TYPE_UNSPECIFIED" | "FULL" | "METADATA_ONLY";
}

/**
 * Represents the scaling configuration of a metastore service.
 */
export interface ScalingConfig {
  /**
   * An enum of readable instance sizes, with each instance size mapping to a
   * float value (e.g. InstanceSize.EXTRA_SMALL = scaling_factor(0.1))
   */
  instanceSize?:  | "INSTANCE_SIZE_UNSPECIFIED" | "EXTRA_SMALL" | "SMALL" | "MEDIUM" | "LARGE" | "EXTRA_LARGE";
  /**
   * Scaling factor, increments of 0.1 for values less than 1.0, and increments
   * of 1.0 for values greater than 1.0.
   */
  scalingFactor?: number;
}

/**
 * A securely stored value.
 */
export interface Secret {
  /**
   * The relative resource name of a Secret Manager secret version, in the
   * following
   * form:projects/{project_number}/secrets/{secret_id}/versions/{version_id}.
   */
  cloudSecret?: string;
}

/**
 * A managed metastore service that serves metadata queries.
 */
export interface Service {
  /**
   * Output only. A Cloud Storage URI (starting with gs://) that specifies
   * where artifacts related to the metastore service are stored.
   */
  readonly artifactGcsUri?: string;
  /**
   * Output only. The time when the metastore service was created.
   */
  readonly createTime?: Date;
  /**
   * Immutable. The database type that the Metastore service stores its data.
   */
  databaseType?:  | "DATABASE_TYPE_UNSPECIFIED" | "MYSQL" | "SPANNER";
  /**
   * Immutable. Information used to configure the Dataproc Metastore service to
   * encrypt customer data at rest. Cannot be updated.
   */
  encryptionConfig?: EncryptionConfig;
  /**
   * Output only. The URI of the endpoint used to access the metastore service.
   */
  readonly endpointUri?: string;
  /**
   * Configuration information specific to running Hive metastore software as
   * the metastore service.
   */
  hiveMetastoreConfig?: HiveMetastoreConfig;
  /**
   * User-defined labels for the metastore service.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The one hour maintenance window of the metastore service. This specifies
   * when the service can be restarted for maintenance purposes in UTC time.
   * Maintenance window is not needed for services with the SPANNER database
   * type.
   */
  maintenanceWindow?: MaintenanceWindow;
  /**
   * Output only. The metadata management activities of the metastore service.
   */
  readonly metadataManagementActivity?: MetadataManagementActivity;
  /**
   * Immutable. The relative resource name of the metastore service, in the
   * following
   * format:projects/{project_number}/locations/{location_id}/services/{service_id}.
   */
  name?: string;
  /**
   * Immutable. The relative resource name of the VPC network on which the
   * instance can be accessed. It is specified in the following
   * form:projects/{project_number}/global/networks/{network_id}.
   */
  network?: string;
  /**
   * The configuration specifying the network settings for the Dataproc
   * Metastore service.
   */
  networkConfig?: NetworkConfig;
  /**
   * The TCP port at which the metastore service is reached. Default: 9083.
   */
  port?: number;
  /**
   * Immutable. The release channel of the service. If unspecified, defaults to
   * STABLE.
   */
  releaseChannel?:  | "RELEASE_CHANNEL_UNSPECIFIED" | "CANARY" | "STABLE";
  /**
   * Scaling configuration of the metastore service.
   */
  scalingConfig?: ScalingConfig;
  /**
   * Output only. The current state of the metastore service.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "SUSPENDING" | "SUSPENDED" | "UPDATING" | "DELETING" | "ERROR";
  /**
   * Output only. Additional information about the current state of the
   * metastore service, if available.
   */
  readonly stateMessage?: string;
  /**
   * The configuration specifying telemetry settings for the Dataproc Metastore
   * service. If unspecified defaults to JSON.
   */
  telemetryConfig?: TelemetryConfig;
  /**
   * The tier of the service.
   */
  tier?:  | "TIER_UNSPECIFIED" | "DEVELOPER" | "ENTERPRISE";
  /**
   * Output only. The globally unique resource identifier of the metastore
   * service.
   */
  readonly uid?: string;
  /**
   * Output only. The time when the metastore service was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * Request message for SetIamPolicy method.
 */
export interface SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the resource. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: Policy;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify.
   * Only the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used:paths: "bindings, etag"
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
 * The Status type defines a logical error model that is suitable for different
 * programming environments, including REST APIs and RPC APIs. It is used by
 * gRPC (https://github.com/grpc). Each Status message contains three pieces of
 * data: error code, error message, and error details.You can find out more
 * about this error model and how to work with it in the API Design Guide
 * (https://cloud.google.com/apis/design/errors).
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
 * Telemetry Configuration for the Dataproc Metastore service.
 */
export interface TelemetryConfig {
  /**
   * The output format of the Dataproc Metastore service's logs.
   */
  logFormat?:  | "LOG_FORMAT_UNSPECIFIED" | "LEGACY" | "JSON";
}

/**
 * Request message for TestIamPermissions method.
 */
export interface TestIamPermissionsRequest {
  /**
   * The set of permissions to check for the resource. Permissions with
   * wildcards (such as * or storage.*) are not allowed. For more information
   * see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions).
   */
  permissions?: string[];
}

/**
 * Response message for TestIamPermissions method.
 */
export interface TestIamPermissionsResponse {
  /**
   * A subset of TestPermissionsRequest.permissions that the caller is allowed.
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
