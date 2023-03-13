// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Dataplex API Client for Deno
 * ==================================
 * 
 * Dataplex API is used to manage the lifecycle of data lakes.
 * 
 * Docs: https://cloud.google.com/dataplex/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Dataplex API is used to manage the lifecycle of data lakes.
 */
export class Dataplex {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://dataplex.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Create a DataAttributeBinding resource.
   *
   * @param parent Required. The resource name of the parent data taxonomy projects/{project_number}/locations/{location_id}
   */
  async projectsLocationsDataAttributeBindingsCreate(parent: string, req: GoogleCloudDataplexV1DataAttributeBinding, opts: ProjectsLocationsDataAttributeBindingsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dataAttributeBindings`);
    if (opts.dataAttributeBindingId !== undefined) {
      url.searchParams.append("dataAttributeBindingId", String(opts.dataAttributeBindingId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a DataAttributeBinding resource. All attributes within the
   * DataAttributeBinding must be deleted before the DataAttributeBinding can be
   * deleted.
   *
   * @param name Required. The resource name of the DataAttributeBinding: projects/{project_number}/locations/{location_id}/dataAttributeBindings/{data_attribute_binding_id}
   */
  async projectsLocationsDataAttributeBindingsDelete(name: string, opts: ProjectsLocationsDataAttributeBindingsDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Retrieves a DataAttributeBinding resource.
   *
   * @param name Required. The resource name of the DataAttributeBinding: projects/{project_number}/locations/{location_id}/dataAttributeBindings/{data_attribute_binding_id}
   */
  async projectsLocationsDataAttributeBindingsGet(name: string): Promise<GoogleCloudDataplexV1DataAttributeBinding> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDataplexV1DataAttributeBinding;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataAttributeBindingsGetIamPolicy(resource: string, opts: ProjectsLocationsDataAttributeBindingsGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists DataAttributeBinding resources in a project and location.
   *
   * @param parent Required. The resource name of the Location: projects/{project_number}/locations/{location_id}
   */
  async projectsLocationsDataAttributeBindingsList(parent: string, opts: ProjectsLocationsDataAttributeBindingsListOptions = {}): Promise<GoogleCloudDataplexV1ListDataAttributeBindingsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dataAttributeBindings`);
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
    return data as GoogleCloudDataplexV1ListDataAttributeBindingsResponse;
  }

  /**
   * Updates a DataAttributeBinding resource.
   *
   * @param name Output only. The relative resource name of the Data Attribute Binding, of the form: projects/{project_number}/locations/{location}/dataAttributeBindings/{data_attribute_binding_id}
   */
  async projectsLocationsDataAttributeBindingsPatch(name: string, req: GoogleCloudDataplexV1DataAttributeBinding, opts: ProjectsLocationsDataAttributeBindingsPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsDataAttributeBindingsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataAttributeBindingsSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
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
   * resource does not exist, this will return an empty set of permissions, not
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataAttributeBindingsTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Creates a DataScan resource.
   *
   * @param parent Required. The resource name of the parent location: projects/{project}/locations/{location_id} where project refers to a project_id or project_number and location_id refers to a GCP region.
   */
  async projectsLocationsDataScansCreate(parent: string, req: GoogleCloudDataplexV1DataScan, opts: ProjectsLocationsDataScansCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dataScans`);
    if (opts.dataScanId !== undefined) {
      url.searchParams.append("dataScanId", String(opts.dataScanId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a DataScan resource.
   *
   * @param name Required. The resource name of the dataScan: projects/{project}/locations/{location_id}/dataScans/{data_scan_id} where project refers to a project_id or project_number and location_id refers to a GCP region.
   */
  async projectsLocationsDataScansDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets a DataScan resource.
   *
   * @param name Required. The resource name of the dataScan: projects/{project}/locations/{location_id}/dataScans/{data_scan_id} where project refers to a project_id or project_number and location_id refers to a GCP region.
   */
  async projectsLocationsDataScansGet(name: string, opts: ProjectsLocationsDataScansGetOptions = {}): Promise<GoogleCloudDataplexV1DataScan> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDataplexV1DataScan;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataScansGetIamPolicy(resource: string, opts: ProjectsLocationsDataScansGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Gets a DataScanJob resource.
   *
   * @param name Required. The resource name of the DataScanJob: projects/{project}/locations/{location_id}/dataScans/{data_scan_id}/jobs/{data_scan_job_id} where project refers to a project_id or project_number and location_id refers to a GCP region.
   */
  async projectsLocationsDataScansJobsGet(name: string, opts: ProjectsLocationsDataScansJobsGetOptions = {}): Promise<GoogleCloudDataplexV1DataScanJob> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDataplexV1DataScanJob;
  }

  /**
   * Lists DataScanJobs under the given DataScan.
   *
   * @param parent Required. The resource name of the parent environment: projects/{project}/locations/{location_id}/dataScans/{data_scan_id} where project refers to a project_id or project_number and location_id refers to a GCP region.
   */
  async projectsLocationsDataScansJobsList(parent: string, opts: ProjectsLocationsDataScansJobsListOptions = {}): Promise<GoogleCloudDataplexV1ListDataScanJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/jobs`);
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
    return data as GoogleCloudDataplexV1ListDataScanJobsResponse;
  }

  /**
   * Lists DataScans.
   *
   * @param parent Required. The resource name of the parent location: projects/{project}/locations/{location_id} where project refers to a project_id or project_number and location_id refers to a GCP region.
   */
  async projectsLocationsDataScansList(parent: string, opts: ProjectsLocationsDataScansListOptions = {}): Promise<GoogleCloudDataplexV1ListDataScansResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dataScans`);
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
    return data as GoogleCloudDataplexV1ListDataScansResponse;
  }

  /**
   * Updates a DataScan resource.
   *
   * @param name Output only. The relative resource name of the scan, of the form: projects/{project}/locations/{location_id}/dataScans/{datascan_id}, where project refers to a project_id or project_number and location_id refers to a GCP region.
   */
  async projectsLocationsDataScansPatch(name: string, req: GoogleCloudDataplexV1DataScan, opts: ProjectsLocationsDataScansPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsDataScansPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Runs an on-demand execution of a DataScan
   *
   * @param name Required. The resource name of the DataScan: projects/{project}/locations/{location_id}/dataScans/{data_scan_id}. where project refers to a project_id or project_number and location_id refers to a GCP region.Only OnDemand data scans are allowed.
   */
  async projectsLocationsDataScansRun(name: string, req: GoogleCloudDataplexV1RunDataScanRequest): Promise<GoogleCloudDataplexV1RunDataScanResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:run`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDataplexV1RunDataScanResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataScansSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
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
   * resource does not exist, this will return an empty set of permissions, not
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataScansTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Create a DataAttribute resource.
   *
   * @param parent Required. The resource name of the parent data taxonomy projects/{project_number}/locations/{location_id}/dataTaxonomies/{data_taxonomy_id}
   */
  async projectsLocationsDataTaxonomiesAttributesCreate(parent: string, req: GoogleCloudDataplexV1DataAttribute, opts: ProjectsLocationsDataTaxonomiesAttributesCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attributes`);
    if (opts.dataAttributeId !== undefined) {
      url.searchParams.append("dataAttributeId", String(opts.dataAttributeId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a Data Attribute resource.
   *
   * @param name Required. The resource name of the DataAttribute: projects/{project_number}/locations/{location_id}/dataTaxonomies/{dataTaxonomy}/attributes/{data_attribute_id}
   */
  async projectsLocationsDataTaxonomiesAttributesDelete(name: string, opts: ProjectsLocationsDataTaxonomiesAttributesDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Retrieves a Data Attribute resource.
   *
   * @param name Required. The resource name of the dataAttribute: projects/{project_number}/locations/{location_id}/dataTaxonomies/{dataTaxonomy}/attributes/{data_attribute_id}
   */
  async projectsLocationsDataTaxonomiesAttributesGet(name: string): Promise<GoogleCloudDataplexV1DataAttribute> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDataplexV1DataAttribute;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataTaxonomiesAttributesGetIamPolicy(resource: string, opts: ProjectsLocationsDataTaxonomiesAttributesGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists Data Attribute resources in a DataTaxonomy.
   *
   * @param parent Required. The resource name of the DataTaxonomy: projects/{project_number}/locations/{location_id}/dataTaxonomies/{data_taxonomy_id}
   */
  async projectsLocationsDataTaxonomiesAttributesList(parent: string, opts: ProjectsLocationsDataTaxonomiesAttributesListOptions = {}): Promise<GoogleCloudDataplexV1ListDataAttributesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/attributes`);
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
    return data as GoogleCloudDataplexV1ListDataAttributesResponse;
  }

  /**
   * Updates a DataAttribute resource.
   *
   * @param name Output only. The relative resource name of the dataAttribute, of the form: projects/{project_number}/locations/{location_id}/dataTaxonomies/{dataTaxonomy}/attributes/{data_attribute_id}.
   */
  async projectsLocationsDataTaxonomiesAttributesPatch(name: string, req: GoogleCloudDataplexV1DataAttribute, opts: ProjectsLocationsDataTaxonomiesAttributesPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsDataTaxonomiesAttributesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataTaxonomiesAttributesSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
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
   * resource does not exist, this will return an empty set of permissions, not
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataTaxonomiesAttributesTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Create a DataTaxonomy resource.
   *
   * @param parent Required. The resource name of the data taxonomy location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a GCP region.
   */
  async projectsLocationsDataTaxonomiesCreate(parent: string, req: GoogleCloudDataplexV1DataTaxonomy, opts: ProjectsLocationsDataTaxonomiesCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dataTaxonomies`);
    if (opts.dataTaxonomyId !== undefined) {
      url.searchParams.append("dataTaxonomyId", String(opts.dataTaxonomyId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a DataTaxonomy resource. All attributes within the DataTaxonomy
   * must be deleted before the DataTaxonomy can be deleted.
   *
   * @param name Required. The resource name of the DataTaxonomy: projects/{project_number}/locations/{location_id}/dataTaxonomies/{data_taxonomy_id}
   */
  async projectsLocationsDataTaxonomiesDelete(name: string, opts: ProjectsLocationsDataTaxonomiesDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Retrieves a DataTaxonomy resource.
   *
   * @param name Required. The resource name of the DataTaxonomy: projects/{project_number}/locations/{location_id}/dataTaxonomies/{data_taxonomy_id}
   */
  async projectsLocationsDataTaxonomiesGet(name: string): Promise<GoogleCloudDataplexV1DataTaxonomy> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDataplexV1DataTaxonomy;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataTaxonomiesGetIamPolicy(resource: string, opts: ProjectsLocationsDataTaxonomiesGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists DataTaxonomy resources in a project and location.
   *
   * @param parent Required. The resource name of the DataTaxonomy location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a GCP region.
   */
  async projectsLocationsDataTaxonomiesList(parent: string, opts: ProjectsLocationsDataTaxonomiesListOptions = {}): Promise<GoogleCloudDataplexV1ListDataTaxonomiesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dataTaxonomies`);
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
    return data as GoogleCloudDataplexV1ListDataTaxonomiesResponse;
  }

  /**
   * Updates a DataTaxonomy resource.
   *
   * @param name Output only. The relative resource name of the DataTaxonomy, of the form: projects/{project_number}/locations/{location_id}/dataTaxonomies/{data_taxonomy_id}.
   */
  async projectsLocationsDataTaxonomiesPatch(name: string, req: GoogleCloudDataplexV1DataTaxonomy, opts: ProjectsLocationsDataTaxonomiesPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsDataTaxonomiesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataTaxonomiesSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
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
   * resource does not exist, this will return an empty set of permissions, not
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsDataTaxonomiesTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<GoogleCloudLocationLocation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudLocationLocation;
  }

  /**
   * Lists action resources in a lake.
   *
   * @param parent Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}.
   */
  async projectsLocationsLakesActionsList(parent: string, opts: ProjectsLocationsLakesActionsListOptions = {}): Promise<GoogleCloudDataplexV1ListActionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/actions`);
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
    return deserializeGoogleCloudDataplexV1ListActionsResponse(data);
  }

  /**
   * Create a content.
   *
   * @param parent Required. The resource name of the parent lake: projects/{project_id}/locations/{location_id}/lakes/{lake_id}
   */
  async projectsLocationsLakesContentCreate(parent: string, req: GoogleCloudDataplexV1Content, opts: ProjectsLocationsLakesContentCreateOptions = {}): Promise<GoogleCloudDataplexV1Content> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/content`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDataplexV1Content;
  }

  /**
   * Delete a content.
   *
   * @param name Required. The resource name of the content: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id}
   */
  async projectsLocationsLakesContentDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Get a content resource.
   *
   * @param name Required. The resource name of the content: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id}
   */
  async projectsLocationsLakesContentGet(name: string, opts: ProjectsLocationsLakesContentGetOptions = {}): Promise<GoogleCloudDataplexV1Content> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDataplexV1Content;
  }

  /**
   * Gets the access control policy for a contentitem resource. A NOT_FOUND
   * error is returned if the resource does not exist. An empty policy is
   * returned if the resource exists but does not have a policy set on it.Caller
   * must have Google IAM dataplex.content.getIamPolicy permission on the
   * resource.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesContentGetIamPolicy(resource: string, opts: ProjectsLocationsLakesContentGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Create a content.
   *
   * @param parent Required. The resource name of the parent lake: projects/{project_id}/locations/{location_id}/lakes/{lake_id}
   */
  async projectsLocationsLakesContentitemsCreate(parent: string, req: GoogleCloudDataplexV1Content, opts: ProjectsLocationsLakesContentitemsCreateOptions = {}): Promise<GoogleCloudDataplexV1Content> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/contentitems`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDataplexV1Content;
  }

  /**
   * Delete a content.
   *
   * @param name Required. The resource name of the content: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id}
   */
  async projectsLocationsLakesContentitemsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Get a content resource.
   *
   * @param name Required. The resource name of the content: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id}
   */
  async projectsLocationsLakesContentitemsGet(name: string, opts: ProjectsLocationsLakesContentitemsGetOptions = {}): Promise<GoogleCloudDataplexV1Content> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDataplexV1Content;
  }

  /**
   * Gets the access control policy for a contentitem resource. A NOT_FOUND
   * error is returned if the resource does not exist. An empty policy is
   * returned if the resource exists but does not have a policy set on it.Caller
   * must have Google IAM dataplex.content.getIamPolicy permission on the
   * resource.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesContentitemsGetIamPolicy(resource: string, opts: ProjectsLocationsLakesContentitemsGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * List content.
   *
   * @param parent Required. The resource name of the parent lake: projects/{project_id}/locations/{location_id}/lakes/{lake_id}
   */
  async projectsLocationsLakesContentitemsList(parent: string, opts: ProjectsLocationsLakesContentitemsListOptions = {}): Promise<GoogleCloudDataplexV1ListContentResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/contentitems`);
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
    return data as GoogleCloudDataplexV1ListContentResponse;
  }

  /**
   * Update a content. Only supports full resource update.
   *
   * @param name Output only. The relative resource name of the content, of the form: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id}
   */
  async projectsLocationsLakesContentitemsPatch(name: string, req: GoogleCloudDataplexV1Content, opts: ProjectsLocationsLakesContentitemsPatchOptions = {}): Promise<GoogleCloudDataplexV1Content> {
    opts = serializeProjectsLocationsLakesContentitemsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudDataplexV1Content;
  }

  /**
   * Sets the access control policy on the specified contentitem resource.
   * Replaces any existing policy.Caller must have Google IAM
   * dataplex.content.setIamPolicy permission on the resource.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesContentitemsSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Returns the caller's permissions on a resource. If the resource does not
   * exist, an empty set of permissions is returned (a NOT_FOUND error is not
   * returned).A caller is not required to have Google IAM permission to make
   * this request.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesContentitemsTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * List content.
   *
   * @param parent Required. The resource name of the parent lake: projects/{project_id}/locations/{location_id}/lakes/{lake_id}
   */
  async projectsLocationsLakesContentList(parent: string, opts: ProjectsLocationsLakesContentListOptions = {}): Promise<GoogleCloudDataplexV1ListContentResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/content`);
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
    return data as GoogleCloudDataplexV1ListContentResponse;
  }

  /**
   * Update a content. Only supports full resource update.
   *
   * @param name Output only. The relative resource name of the content, of the form: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id}
   */
  async projectsLocationsLakesContentPatch(name: string, req: GoogleCloudDataplexV1Content, opts: ProjectsLocationsLakesContentPatchOptions = {}): Promise<GoogleCloudDataplexV1Content> {
    opts = serializeProjectsLocationsLakesContentPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudDataplexV1Content;
  }

  /**
   * Sets the access control policy on the specified contentitem resource.
   * Replaces any existing policy.Caller must have Google IAM
   * dataplex.content.setIamPolicy permission on the resource.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesContentSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Returns the caller's permissions on a resource. If the resource does not
   * exist, an empty set of permissions is returned (a NOT_FOUND error is not
   * returned).A caller is not required to have Google IAM permission to make
   * this request.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesContentTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Creates a lake resource.
   *
   * @param parent Required. The resource name of the lake location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a GCP region.
   */
  async projectsLocationsLakesCreate(parent: string, req: GoogleCloudDataplexV1Lake, opts: ProjectsLocationsLakesCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/lakes`);
    if (opts.lakeId !== undefined) {
      url.searchParams.append("lakeId", String(opts.lakeId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a lake resource. All zones within the lake must be deleted before
   * the lake can be deleted.
   *
   * @param name Required. The resource name of the lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}.
   */
  async projectsLocationsLakesDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Create an environment resource.
   *
   * @param parent Required. The resource name of the parent lake: projects/{project_id}/locations/{location_id}/lakes/{lake_id}.
   */
  async projectsLocationsLakesEnvironmentsCreate(parent: string, req: GoogleCloudDataplexV1Environment, opts: ProjectsLocationsLakesEnvironmentsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDataplexV1Environment(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/environments`);
    if (opts.environmentId !== undefined) {
      url.searchParams.append("environmentId", String(opts.environmentId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Delete the environment resource. All the child resources must have been
   * deleted before environment deletion can be initiated.
   *
   * @param name Required. The resource name of the environment: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/environments/{environment_id}.
   */
  async projectsLocationsLakesEnvironmentsDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Get environment resource.
   *
   * @param name Required. The resource name of the environment: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/environments/{environment_id}.
   */
  async projectsLocationsLakesEnvironmentsGet(name: string): Promise<GoogleCloudDataplexV1Environment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDataplexV1Environment(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesEnvironmentsGetIamPolicy(resource: string, opts: ProjectsLocationsLakesEnvironmentsGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists environments under the given lake.
   *
   * @param parent Required. The resource name of the parent lake: projects/{project_id}/locations/{location_id}/lakes/{lake_id}.
   */
  async projectsLocationsLakesEnvironmentsList(parent: string, opts: ProjectsLocationsLakesEnvironmentsListOptions = {}): Promise<GoogleCloudDataplexV1ListEnvironmentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/environments`);
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
    return deserializeGoogleCloudDataplexV1ListEnvironmentsResponse(data);
  }

  /**
   * Update the environment resource.
   *
   * @param name Output only. The relative resource name of the environment, of the form: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/environment/{environment_id}
   */
  async projectsLocationsLakesEnvironmentsPatch(name: string, req: GoogleCloudDataplexV1Environment, opts: ProjectsLocationsLakesEnvironmentsPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDataplexV1Environment(req);
    opts = serializeProjectsLocationsLakesEnvironmentsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists session resources in an environment.
   *
   * @param parent Required. The resource name of the parent environment: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/environment/{environment_id}.
   */
  async projectsLocationsLakesEnvironmentsSessionsList(parent: string, opts: ProjectsLocationsLakesEnvironmentsSessionsListOptions = {}): Promise<GoogleCloudDataplexV1ListSessionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/sessions`);
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
    return data as GoogleCloudDataplexV1ListSessionsResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesEnvironmentsSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
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
   * resource does not exist, this will return an empty set of permissions, not
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesEnvironmentsTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Retrieves a lake resource.
   *
   * @param name Required. The resource name of the lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}.
   */
  async projectsLocationsLakesGet(name: string): Promise<GoogleCloudDataplexV1Lake> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDataplexV1Lake;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesGetIamPolicy(resource: string, opts: ProjectsLocationsLakesGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists lake resources in a project and location.
   *
   * @param parent Required. The resource name of the lake location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a GCP region.
   */
  async projectsLocationsLakesList(parent: string, opts: ProjectsLocationsLakesListOptions = {}): Promise<GoogleCloudDataplexV1ListLakesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/lakes`);
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
    return data as GoogleCloudDataplexV1ListLakesResponse;
  }

  /**
   * Updates a lake resource.
   *
   * @param name Output only. The relative resource name of the lake, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}.
   */
  async projectsLocationsLakesPatch(name: string, req: GoogleCloudDataplexV1Lake, opts: ProjectsLocationsLakesPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsLakesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Creates a task resource within a lake.
   *
   * @param parent Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}.
   */
  async projectsLocationsLakesTasksCreate(parent: string, req: GoogleCloudDataplexV1Task, opts: ProjectsLocationsLakesTasksCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDataplexV1Task(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tasks`);
    if (opts.taskId !== undefined) {
      url.searchParams.append("taskId", String(opts.taskId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Delete the task resource.
   *
   * @param name Required. The resource name of the task: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/task/{task_id}.
   */
  async projectsLocationsLakesTasksDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Get task resource.
   *
   * @param name Required. The resource name of the task: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{tasks_id}.
   */
  async projectsLocationsLakesTasksGet(name: string): Promise<GoogleCloudDataplexV1Task> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDataplexV1Task(data);
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesTasksGetIamPolicy(resource: string, opts: ProjectsLocationsLakesTasksGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Cancel jobs running for the task resource.
   *
   * @param name Required. The resource name of the job: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/task/{task_id}/job/{job_id}.
   */
  async projectsLocationsLakesTasksJobsCancel(name: string, req: GoogleCloudDataplexV1CancelJobRequest): Promise<Empty> {
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
   * Get job resource.
   *
   * @param name Required. The resource name of the job: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}/jobs/{job_id}.
   */
  async projectsLocationsLakesTasksJobsGet(name: string): Promise<GoogleCloudDataplexV1Job> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDataplexV1Job;
  }

  /**
   * Lists Jobs under the given task.
   *
   * @param parent Required. The resource name of the parent environment: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}.
   */
  async projectsLocationsLakesTasksJobsList(parent: string, opts: ProjectsLocationsLakesTasksJobsListOptions = {}): Promise<GoogleCloudDataplexV1ListJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/jobs`);
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
    return data as GoogleCloudDataplexV1ListJobsResponse;
  }

  /**
   * Lists tasks under the given lake.
   *
   * @param parent Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}.
   */
  async projectsLocationsLakesTasksList(parent: string, opts: ProjectsLocationsLakesTasksListOptions = {}): Promise<GoogleCloudDataplexV1ListTasksResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/tasks`);
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
    return deserializeGoogleCloudDataplexV1ListTasksResponse(data);
  }

  /**
   * Update the task resource.
   *
   * @param name Output only. The relative resource name of the task, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/ tasks/{task_id}.
   */
  async projectsLocationsLakesTasksPatch(name: string, req: GoogleCloudDataplexV1Task, opts: ProjectsLocationsLakesTasksPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDataplexV1Task(req);
    opts = serializeProjectsLocationsLakesTasksPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Run an on demand execution of a Task.
   *
   * @param name Required. The resource name of the task: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}.
   */
  async projectsLocationsLakesTasksRun(name: string, req: GoogleCloudDataplexV1RunTaskRequest): Promise<GoogleCloudDataplexV1RunTaskResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:run`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDataplexV1RunTaskResponse;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesTasksSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
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
   * resource does not exist, this will return an empty set of permissions, not
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesTasksTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
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
  async projectsLocationsLakesTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Lists action resources in a zone.
   *
   * @param parent Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}.
   */
  async projectsLocationsLakesZonesActionsList(parent: string, opts: ProjectsLocationsLakesZonesActionsListOptions = {}): Promise<GoogleCloudDataplexV1ListActionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/actions`);
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
    return deserializeGoogleCloudDataplexV1ListActionsResponse(data);
  }

  /**
   * Lists action resources in an asset.
   *
   * @param parent Required. The resource name of the parent asset: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}.
   */
  async projectsLocationsLakesZonesAssetsActionsList(parent: string, opts: ProjectsLocationsLakesZonesAssetsActionsListOptions = {}): Promise<GoogleCloudDataplexV1ListActionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/actions`);
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
    return deserializeGoogleCloudDataplexV1ListActionsResponse(data);
  }

  /**
   * Creates an asset resource.
   *
   * @param parent Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}.
   */
  async projectsLocationsLakesZonesAssetsCreate(parent: string, req: GoogleCloudDataplexV1Asset, opts: ProjectsLocationsLakesZonesAssetsCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/assets`);
    if (opts.assetId !== undefined) {
      url.searchParams.append("assetId", String(opts.assetId));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an asset resource. The referenced storage resource is detached
   * (default) or deleted based on the associated Lifecycle policy.
   *
   * @param name Required. The resource name of the asset: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}.
   */
  async projectsLocationsLakesZonesAssetsDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Retrieves an asset resource.
   *
   * @param name Required. The resource name of the asset: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}.
   */
  async projectsLocationsLakesZonesAssetsGet(name: string): Promise<GoogleCloudDataplexV1Asset> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDataplexV1Asset;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesZonesAssetsGetIamPolicy(resource: string, opts: ProjectsLocationsLakesZonesAssetsGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists asset resources in a zone.
   *
   * @param parent Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}.
   */
  async projectsLocationsLakesZonesAssetsList(parent: string, opts: ProjectsLocationsLakesZonesAssetsListOptions = {}): Promise<GoogleCloudDataplexV1ListAssetsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/assets`);
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
    return data as GoogleCloudDataplexV1ListAssetsResponse;
  }

  /**
   * Updates an asset resource.
   *
   * @param name Output only. The relative resource name of the asset, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}.
   */
  async projectsLocationsLakesZonesAssetsPatch(name: string, req: GoogleCloudDataplexV1Asset, opts: ProjectsLocationsLakesZonesAssetsPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsLakesZonesAssetsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesZonesAssetsSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
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
   * resource does not exist, this will return an empty set of permissions, not
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesZonesAssetsTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Creates a zone resource within a lake.
   *
   * @param parent Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}.
   */
  async projectsLocationsLakesZonesCreate(parent: string, req: GoogleCloudDataplexV1Zone, opts: ProjectsLocationsLakesZonesCreateOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/zones`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    if (opts.zoneId !== undefined) {
      url.searchParams.append("zoneId", String(opts.zoneId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes a zone resource. All assets within a zone must be deleted before
   * the zone can be deleted.
   *
   * @param name Required. The resource name of the zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}.
   */
  async projectsLocationsLakesZonesDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Create a metadata entity.
   *
   * @param parent Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}.
   */
  async projectsLocationsLakesZonesEntitiesCreate(parent: string, req: GoogleCloudDataplexV1Entity, opts: ProjectsLocationsLakesZonesEntitiesCreateOptions = {}): Promise<GoogleCloudDataplexV1Entity> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entities`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDataplexV1Entity;
  }

  /**
   * Delete a metadata entity.
   *
   * @param name Required. The resource name of the entity: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}.
   */
  async projectsLocationsLakesZonesEntitiesDelete(name: string, opts: ProjectsLocationsLakesZonesEntitiesDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Get a metadata entity.
   *
   * @param name Required. The resource name of the entity: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}.
   */
  async projectsLocationsLakesZonesEntitiesGet(name: string, opts: ProjectsLocationsLakesZonesEntitiesGetOptions = {}): Promise<GoogleCloudDataplexV1Entity> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDataplexV1Entity;
  }

  /**
   * List metadata entities in a zone.
   *
   * @param parent Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}.
   */
  async projectsLocationsLakesZonesEntitiesList(parent: string, opts: ProjectsLocationsLakesZonesEntitiesListOptions = {}): Promise<GoogleCloudDataplexV1ListEntitiesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/entities`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    return data as GoogleCloudDataplexV1ListEntitiesResponse;
  }

  /**
   * Create a metadata partition.
   *
   * @param parent Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}.
   */
  async projectsLocationsLakesZonesEntitiesPartitionsCreate(parent: string, req: GoogleCloudDataplexV1Partition, opts: ProjectsLocationsLakesZonesEntitiesPartitionsCreateOptions = {}): Promise<GoogleCloudDataplexV1Partition> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/partitions`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDataplexV1Partition;
  }

  /**
   * Delete a metadata partition.
   *
   * @param name Required. The resource name of the partition. format: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}/partitions/{partition_value_path}. The {partition_value_path} segment consists of an ordered sequence of partition values separated by "/". All values must be provided.
   */
  async projectsLocationsLakesZonesEntitiesPartitionsDelete(name: string, opts: ProjectsLocationsLakesZonesEntitiesPartitionsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.etag !== undefined) {
      url.searchParams.append("etag", String(opts.etag));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Get a metadata partition of an entity.
   *
   * @param name Required. The resource name of the partition: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}/partitions/{partition_value_path}. The {partition_value_path} segment consists of an ordered sequence of partition values separated by "/". All values must be provided.
   */
  async projectsLocationsLakesZonesEntitiesPartitionsGet(name: string): Promise<GoogleCloudDataplexV1Partition> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDataplexV1Partition;
  }

  /**
   * List metadata partitions of an entity.
   *
   * @param parent Required. The resource name of the parent entity: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}.
   */
  async projectsLocationsLakesZonesEntitiesPartitionsList(parent: string, opts: ProjectsLocationsLakesZonesEntitiesPartitionsListOptions = {}): Promise<GoogleCloudDataplexV1ListPartitionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/partitions`);
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
    return data as GoogleCloudDataplexV1ListPartitionsResponse;
  }

  /**
   * Update a metadata entity. Only supports full resource update.
   *
   * @param name Output only. The resource name of the entity, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{id}.
   */
  async projectsLocationsLakesZonesEntitiesUpdate(name: string, req: GoogleCloudDataplexV1Entity, opts: ProjectsLocationsLakesZonesEntitiesUpdateOptions = {}): Promise<GoogleCloudDataplexV1Entity> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as GoogleCloudDataplexV1Entity;
  }

  /**
   * Retrieves a zone resource.
   *
   * @param name Required. The resource name of the zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}.
   */
  async projectsLocationsLakesZonesGet(name: string): Promise<GoogleCloudDataplexV1Zone> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDataplexV1Zone;
  }

  /**
   * Gets the access control policy for a resource. Returns an empty policy if
   * the resource exists and does not have a policy set.
   *
   * @param resource REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesZonesGetIamPolicy(resource: string, opts: ProjectsLocationsLakesZonesGetIamPolicyOptions = {}): Promise<GoogleIamV1Policy> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:getIamPolicy`);
    if (opts["options.requestedPolicyVersion"] !== undefined) {
      url.searchParams.append("options.requestedPolicyVersion", String(opts["options.requestedPolicyVersion"]));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleIamV1Policy(data);
  }

  /**
   * Lists zone resources in a lake.
   *
   * @param parent Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}.
   */
  async projectsLocationsLakesZonesList(parent: string, opts: ProjectsLocationsLakesZonesListOptions = {}): Promise<GoogleCloudDataplexV1ListZonesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/zones`);
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
    return data as GoogleCloudDataplexV1ListZonesResponse;
  }

  /**
   * Updates a zone resource.
   *
   * @param name Output only. The relative resource name of the zone, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}.
   */
  async projectsLocationsLakesZonesPatch(name: string, req: GoogleCloudDataplexV1Zone, opts: ProjectsLocationsLakesZonesPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    opts = serializeProjectsLocationsLakesZonesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.validateOnly !== undefined) {
      url.searchParams.append("validateOnly", String(opts.validateOnly));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Sets the access control policy on the specified resource. Replaces any
   * existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and
   * PERMISSION_DENIED errors.
   *
   * @param resource REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesZonesSetIamPolicy(resource: string, req: GoogleIamV1SetIamPolicyRequest): Promise<GoogleIamV1Policy> {
    req = serializeGoogleIamV1SetIamPolicyRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ resource }:setIamPolicy`);
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
   * resource does not exist, this will return an empty set of permissions, not
   * a NOT_FOUND error.Note: This operation is designed to be used for building
   * permission-aware UIs and command-line tools, not for authorization
   * checking. This operation may "fail open" without warning.
   *
   * @param resource REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field.
   */
  async projectsLocationsLakesZonesTestIamPermissions(resource: string, req: GoogleIamV1TestIamPermissionsRequest): Promise<GoogleIamV1TestIamPermissionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:testIamPermissions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleIamV1TestIamPermissionsResponse;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async projectsLocationsList(name: string, opts: ProjectsLocationsListOptions = {}): Promise<GoogleCloudLocationListLocationsResponse> {
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
    return data as GoogleCloudLocationListLocationsResponse;
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
  async projectsLocationsOperationsCancel(name: string, req: GoogleLongrunningCancelOperationRequest): Promise<Empty> {
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
  async projectsLocationsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns UNIMPLEMENTED.NOTE: the name
   * binding allows API services to override the binding to use different
   * resource name schemes, such as users/*\/operations. To override the
   * binding, API services can add a binding such as
   * "/v1/{name=users/*}/operations" to their service configuration. For
   * backwards compatibility, the default name includes the operations
   * collection id, however overriding users must ensure the name binding is the
   * parent resource, without the operations collection id.
   *
   * @param name The name of the operation's parent resource.
   */
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
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
    return data as GoogleLongrunningListOperationsResponse;
  }
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
 * Action represents an issue requiring administrator action for resolution.
 */
export interface GoogleCloudDataplexV1Action {
  /**
   * Output only. The relative resource name of the asset, of the form:
   * projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}.
   */
  readonly asset?: string;
  /**
   * The category of issue associated with the action.
   */
  category?:  | "CATEGORY_UNSPECIFIED" | "RESOURCE_MANAGEMENT" | "SECURITY_POLICY" | "DATA_DISCOVERY";
  /**
   * The list of data locations associated with this action. Cloud Storage
   * locations are represented as URI paths(E.g.
   * gs://bucket/table1/year=2020/month=Jan/). BigQuery locations refer to
   * resource names(E.g.
   * bigquery.googleapis.com/projects/project-id/datasets/dataset-id).
   */
  dataLocations?: string[];
  /**
   * The time that the issue was detected.
   */
  detectTime?: Date;
  /**
   * Details for issues related to applying security policy.
   */
  failedSecurityPolicyApply?: GoogleCloudDataplexV1ActionFailedSecurityPolicyApply;
  /**
   * Details for issues related to incompatible schemas detected within data.
   */
  incompatibleDataSchema?: GoogleCloudDataplexV1ActionIncompatibleDataSchema;
  /**
   * Details for issues related to invalid or unsupported data formats.
   */
  invalidDataFormat?: GoogleCloudDataplexV1ActionInvalidDataFormat;
  /**
   * Details for issues related to invalid data arrangement.
   */
  invalidDataOrganization?: GoogleCloudDataplexV1ActionInvalidDataOrganization;
  /**
   * Details for issues related to invalid or unsupported data partition
   * structure.
   */
  invalidDataPartition?: GoogleCloudDataplexV1ActionInvalidDataPartition;
  /**
   * Detailed description of the issue requiring action.
   */
  issue?: string;
  /**
   * Output only. The relative resource name of the lake, of the form:
   * projects/{project_number}/locations/{location_id}/lakes/{lake_id}.
   */
  readonly lake?: string;
  /**
   * Details for issues related to absence of data within managed resources.
   */
  missingData?: GoogleCloudDataplexV1ActionMissingData;
  /**
   * Details for issues related to absence of a managed resource.
   */
  missingResource?: GoogleCloudDataplexV1ActionMissingResource;
  /**
   * Output only. The relative resource name of the action, of the form:
   * projects/{project}/locations/{location}/lakes/{lake}/actions/{action}
   * projects/{project}/locations/{location}/lakes/{lake}/zones/{zone}/actions/{action}
   * projects/{project}/locations/{location}/lakes/{lake}/zones/{zone}/assets/{asset}/actions/{action}.
   */
  readonly name?: string;
  /**
   * Details for issues related to lack of permissions to access data
   * resources.
   */
  unauthorizedResource?: GoogleCloudDataplexV1ActionUnauthorizedResource;
  /**
   * Output only. The relative resource name of the zone, of the form:
   * projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}.
   */
  readonly zone?: string;
}

function serializeGoogleCloudDataplexV1Action(data: any): GoogleCloudDataplexV1Action {
  return {
    ...data,
    detectTime: data["detectTime"] !== undefined ? data["detectTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDataplexV1Action(data: any): GoogleCloudDataplexV1Action {
  return {
    ...data,
    detectTime: data["detectTime"] !== undefined ? new Date(data["detectTime"]) : undefined,
  };
}

/**
 * Failed to apply security policy to the managed resource(s) under a lake,
 * zone or an asset. For a lake or zone resource, one or more underlying assets
 * has a failure applying security policy to the associated managed resource.
 */
export interface GoogleCloudDataplexV1ActionFailedSecurityPolicyApply {
  /**
   * Resource name of one of the assets with failing security policy
   * application. Populated for a lake or zone resource only.
   */
  asset?: string;
}

/**
 * Action details for incompatible schemas detected by discovery.
 */
export interface GoogleCloudDataplexV1ActionIncompatibleDataSchema {
  /**
   * The existing and expected schema of the table. The schema is provided as a
   * JSON formatted structure listing columns and data types.
   */
  existingSchema?: string;
  /**
   * The new and incompatible schema within the table. The schema is provided
   * as a JSON formatted structured listing columns and data types.
   */
  newSchema?: string;
  /**
   * The list of data locations sampled and used for format/schema inference.
   */
  sampledDataLocations?: string[];
  /**
   * Whether the action relates to a schema that is incompatible or modified.
   */
  schemaChange?:  | "SCHEMA_CHANGE_UNSPECIFIED" | "INCOMPATIBLE" | "MODIFIED";
  /**
   * The name of the table containing invalid data.
   */
  table?: string;
}

/**
 * Action details for invalid or unsupported data files detected by discovery.
 */
export interface GoogleCloudDataplexV1ActionInvalidDataFormat {
  /**
   * The expected data format of the entity.
   */
  expectedFormat?: string;
  /**
   * The new unexpected data format within the entity.
   */
  newFormat?: string;
  /**
   * The list of data locations sampled and used for format/schema inference.
   */
  sampledDataLocations?: string[];
}

/**
 * Action details for invalid data arrangement.
 */
export interface GoogleCloudDataplexV1ActionInvalidDataOrganization {
}

/**
 * Action details for invalid or unsupported partitions detected by discovery.
 */
export interface GoogleCloudDataplexV1ActionInvalidDataPartition {
  /**
   * The issue type of InvalidDataPartition.
   */
  expectedStructure?:  | "PARTITION_STRUCTURE_UNSPECIFIED" | "CONSISTENT_KEYS" | "HIVE_STYLE_KEYS";
}

/**
 * Action details for absence of data detected by discovery.
 */
export interface GoogleCloudDataplexV1ActionMissingData {
}

/**
 * Action details for resource references in assets that cannot be located.
 */
export interface GoogleCloudDataplexV1ActionMissingResource {
}

/**
 * Action details for unauthorized resource issues raised to indicate that the
 * service account associated with the lake instance is not authorized to access
 * or manage the resource associated with an asset.
 */
export interface GoogleCloudDataplexV1ActionUnauthorizedResource {
}

/**
 * An asset represents a cloud resource that is being managed within a lake as
 * a member of a zone.
 */
export interface GoogleCloudDataplexV1Asset {
  /**
   * Output only. The time when the asset was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. Description of the asset.
   */
  description?: string;
  /**
   * Optional. Specification of the discovery feature applied to data
   * referenced by this asset. When this spec is left unset, the asset will use
   * the spec set on the parent zone.
   */
  discoverySpec?: GoogleCloudDataplexV1AssetDiscoverySpec;
  /**
   * Output only. Status of the discovery feature applied to data referenced by
   * this asset.
   */
  readonly discoveryStatus?: GoogleCloudDataplexV1AssetDiscoveryStatus;
  /**
   * Optional. User friendly display name.
   */
  displayName?: string;
  /**
   * Optional. User defined labels for the asset.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The relative resource name of the asset, of the form:
   * projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}.
   */
  readonly name?: string;
  /**
   * Required. Specification of the resource that is referenced by this asset.
   */
  resourceSpec?: GoogleCloudDataplexV1AssetResourceSpec;
  /**
   * Output only. Status of the resource referenced by this asset.
   */
  readonly resourceStatus?: GoogleCloudDataplexV1AssetResourceStatus;
  /**
   * Output only. Status of the security policy applied to resource referenced
   * by this asset.
   */
  readonly securityStatus?: GoogleCloudDataplexV1AssetSecurityStatus;
  /**
   * Output only. Current state of the asset.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED";
  /**
   * Output only. System generated globally unique ID for the asset. This ID
   * will be different if the asset is deleted and re-created with the same
   * name.
   */
  readonly uid?: string;
  /**
   * Output only. The time when the asset was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * Settings to manage the metadata discovery and publishing for an asset.
 */
export interface GoogleCloudDataplexV1AssetDiscoverySpec {
  /**
   * Optional. Configuration for CSV data.
   */
  csvOptions?: GoogleCloudDataplexV1AssetDiscoverySpecCsvOptions;
  /**
   * Optional. Whether discovery is enabled.
   */
  enabled?: boolean;
  /**
   * Optional. The list of patterns to apply for selecting data to exclude
   * during discovery. For Cloud Storage bucket assets, these are interpreted as
   * glob patterns used to match object names. For BigQuery dataset assets,
   * these are interpreted as patterns to match table names.
   */
  excludePatterns?: string[];
  /**
   * Optional. The list of patterns to apply for selecting data to include
   * during discovery if only a subset of the data should considered. For Cloud
   * Storage bucket assets, these are interpreted as glob patterns used to match
   * object names. For BigQuery dataset assets, these are interpreted as
   * patterns to match table names.
   */
  includePatterns?: string[];
  /**
   * Optional. Configuration for Json data.
   */
  jsonOptions?: GoogleCloudDataplexV1AssetDiscoverySpecJsonOptions;
  /**
   * Optional. Cron schedule (https://en.wikipedia.org/wiki/Cron) for running
   * discovery periodically. Successive discovery runs must be scheduled at
   * least 60 minutes apart. The default value is to run discovery every 60
   * minutes. To explicitly set a timezone to the cron tab, apply a prefix in
   * the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or TZ=${IANA_TIME_ZONE}". The
   * ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database.
   * For example, CRON_TZ=America/New_York 1 * * * *, or TZ=America/New_York 1 *
   * * * *.
   */
  schedule?: string;
}

/**
 * Describe CSV and similar semi-structured data formats.
 */
export interface GoogleCloudDataplexV1AssetDiscoverySpecCsvOptions {
  /**
   * Optional. The delimiter being used to separate values. This defaults to
   * ','.
   */
  delimiter?: string;
  /**
   * Optional. Whether to disable the inference of data type for CSV data. If
   * true, all columns will be registered as strings.
   */
  disableTypeInference?: boolean;
  /**
   * Optional. The character encoding of the data. The default is UTF-8.
   */
  encoding?: string;
  /**
   * Optional. The number of rows to interpret as header rows that should be
   * skipped when reading data rows.
   */
  headerRows?: number;
}

/**
 * Describe JSON data format.
 */
export interface GoogleCloudDataplexV1AssetDiscoverySpecJsonOptions {
  /**
   * Optional. Whether to disable the inference of data type for Json data. If
   * true, all columns will be registered as their primitive types (strings,
   * number or boolean).
   */
  disableTypeInference?: boolean;
  /**
   * Optional. The character encoding of the data. The default is UTF-8.
   */
  encoding?: string;
}

/**
 * Status of discovery for an asset.
 */
export interface GoogleCloudDataplexV1AssetDiscoveryStatus {
  /**
   * The duration of the last discovery run.
   */
  lastRunDuration?: number /* Duration */;
  /**
   * The start time of the last discovery run.
   */
  lastRunTime?: Date;
  /**
   * Additional information about the current state.
   */
  message?: string;
  /**
   * The current status of the discovery feature.
   */
  state?:  | "STATE_UNSPECIFIED" | "SCHEDULED" | "IN_PROGRESS" | "PAUSED" | "DISABLED";
  /**
   * Data Stats of the asset reported by discovery.
   */
  stats?: GoogleCloudDataplexV1AssetDiscoveryStatusStats;
  /**
   * Last update time of the status.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDataplexV1AssetDiscoveryStatus(data: any): GoogleCloudDataplexV1AssetDiscoveryStatus {
  return {
    ...data,
    lastRunDuration: data["lastRunDuration"] !== undefined ? data["lastRunDuration"] : undefined,
    lastRunTime: data["lastRunTime"] !== undefined ? data["lastRunTime"].toISOString() : undefined,
    stats: data["stats"] !== undefined ? serializeGoogleCloudDataplexV1AssetDiscoveryStatusStats(data["stats"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDataplexV1AssetDiscoveryStatus(data: any): GoogleCloudDataplexV1AssetDiscoveryStatus {
  return {
    ...data,
    lastRunDuration: data["lastRunDuration"] !== undefined ? data["lastRunDuration"] : undefined,
    lastRunTime: data["lastRunTime"] !== undefined ? new Date(data["lastRunTime"]) : undefined,
    stats: data["stats"] !== undefined ? deserializeGoogleCloudDataplexV1AssetDiscoveryStatusStats(data["stats"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The aggregated data statistics for the asset reported by discovery.
 */
export interface GoogleCloudDataplexV1AssetDiscoveryStatusStats {
  /**
   * The count of data items within the referenced resource.
   */
  dataItems?: bigint;
  /**
   * The number of stored data bytes within the referenced resource.
   */
  dataSize?: bigint;
  /**
   * The count of fileset entities within the referenced resource.
   */
  filesets?: bigint;
  /**
   * The count of table entities within the referenced resource.
   */
  tables?: bigint;
}

function serializeGoogleCloudDataplexV1AssetDiscoveryStatusStats(data: any): GoogleCloudDataplexV1AssetDiscoveryStatusStats {
  return {
    ...data,
    dataItems: data["dataItems"] !== undefined ? String(data["dataItems"]) : undefined,
    dataSize: data["dataSize"] !== undefined ? String(data["dataSize"]) : undefined,
    filesets: data["filesets"] !== undefined ? String(data["filesets"]) : undefined,
    tables: data["tables"] !== undefined ? String(data["tables"]) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1AssetDiscoveryStatusStats(data: any): GoogleCloudDataplexV1AssetDiscoveryStatusStats {
  return {
    ...data,
    dataItems: data["dataItems"] !== undefined ? BigInt(data["dataItems"]) : undefined,
    dataSize: data["dataSize"] !== undefined ? BigInt(data["dataSize"]) : undefined,
    filesets: data["filesets"] !== undefined ? BigInt(data["filesets"]) : undefined,
    tables: data["tables"] !== undefined ? BigInt(data["tables"]) : undefined,
  };
}

/**
 * Identifies the cloud resource that is referenced by this asset.
 */
export interface GoogleCloudDataplexV1AssetResourceSpec {
  /**
   * Immutable. Relative name of the cloud resource that contains the data that
   * is being managed within a lake. For example:
   * projects/{project_number}/buckets/{bucket_id}
   * projects/{project_number}/datasets/{dataset_id}
   */
  name?: string;
  /**
   * Optional. Determines how read permissions are handled for each asset and
   * their associated tables. Only available to storage buckets assets.
   */
  readAccessMode?:  | "ACCESS_MODE_UNSPECIFIED" | "DIRECT" | "MANAGED";
  /**
   * Required. Immutable. Type of resource.
   */
  type?:  | "TYPE_UNSPECIFIED" | "STORAGE_BUCKET" | "BIGQUERY_DATASET";
}

/**
 * Status of the resource referenced by an asset.
 */
export interface GoogleCloudDataplexV1AssetResourceStatus {
  /**
   * Output only. Service account associated with the BigQuery Connection.
   */
  readonly managedAccessIdentity?: string;
  /**
   * Additional information about the current state.
   */
  message?: string;
  /**
   * The current state of the managed resource.
   */
  state?:  | "STATE_UNSPECIFIED" | "READY" | "ERROR";
  /**
   * Last update time of the status.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDataplexV1AssetResourceStatus(data: any): GoogleCloudDataplexV1AssetResourceStatus {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDataplexV1AssetResourceStatus(data: any): GoogleCloudDataplexV1AssetResourceStatus {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Security policy status of the asset. Data security policy, i.e., readers,
 * writers & owners, should be specified in the lake/zone/asset IAM policy.
 */
export interface GoogleCloudDataplexV1AssetSecurityStatus {
  /**
   * Additional information about the current state.
   */
  message?: string;
  /**
   * The current state of the security policy applied to the attached resource.
   */
  state?:  | "STATE_UNSPECIFIED" | "READY" | "APPLYING" | "ERROR";
  /**
   * Last update time of the status.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDataplexV1AssetSecurityStatus(data: any): GoogleCloudDataplexV1AssetSecurityStatus {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDataplexV1AssetSecurityStatus(data: any): GoogleCloudDataplexV1AssetSecurityStatus {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Aggregated status of the underlying assets of a lake or zone.
 */
export interface GoogleCloudDataplexV1AssetStatus {
  /**
   * Number of active assets.
   */
  activeAssets?: number;
  /**
   * Number of assets that are in process of updating the security policy on
   * attached resources.
   */
  securityPolicyApplyingAssets?: number;
  /**
   * Last update time of the status.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDataplexV1AssetStatus(data: any): GoogleCloudDataplexV1AssetStatus {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDataplexV1AssetStatus(data: any): GoogleCloudDataplexV1AssetStatus {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Cancel task jobs.
 */
export interface GoogleCloudDataplexV1CancelJobRequest {
}

/**
 * Content represents a user-visible notebook or a sql script
 */
export interface GoogleCloudDataplexV1Content {
  /**
   * Output only. Content creation time.
   */
  readonly createTime?: Date;
  /**
   * Required. Content data in string format.
   */
  dataText?: string;
  /**
   * Optional. Description of the content.
   */
  description?: string;
  /**
   * Optional. User defined labels for the content.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The relative resource name of the content, of the form:
   * projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id}
   */
  readonly name?: string;
  /**
   * Notebook related configurations.
   */
  notebook?: GoogleCloudDataplexV1ContentNotebook;
  /**
   * Required. The path for the Content file, represented as directory
   * structure. Unique within a lake. Limited to alphanumerics, hyphens,
   * underscores, dots and slashes.
   */
  path?: string;
  /**
   * Sql Script related configurations.
   */
  sqlScript?: GoogleCloudDataplexV1ContentSqlScript;
  /**
   * Output only. System generated globally unique ID for the content. This ID
   * will be different if the content is deleted and re-created with the same
   * name.
   */
  readonly uid?: string;
  /**
   * Output only. The time when the content was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * Configuration for Notebook content.
 */
export interface GoogleCloudDataplexV1ContentNotebook {
  /**
   * Required. Kernel Type of the notebook.
   */
  kernelType?:  | "KERNEL_TYPE_UNSPECIFIED" | "PYTHON3";
}

/**
 * Configuration for the Sql Script content.
 */
export interface GoogleCloudDataplexV1ContentSqlScript {
  /**
   * Required. Query Engine to be used for the Sql Query.
   */
  engine?:  | "QUERY_ENGINE_UNSPECIFIED" | "SPARK";
}

/**
 * DataAccessSpec holds the access control configuration to be enforced on data
 * stored within resources (eg: rows, columns in BigQuery Tables). When
 * associated with data, the data is only accessible to principals explicitly
 * granted access through the DataAccessSpec. Principals with access to the
 * containing resource are not implicitly granted access.
 */
export interface GoogleCloudDataplexV1DataAccessSpec {
  /**
   * Optional. The format of strings follows the pattern followed by IAM in the
   * bindings. user:{email}, serviceAccount:{email} group:{email}. The set of
   * principals to be granted reader role on data stored within resources.
   */
  readers?: string[];
}

/**
 * Denotes one dataAttribute in a dataTaxonomy, for example, PII. DataAttribute
 * resources can be defined in a hierarchy. A single dataAttribute resource can
 * contain specs of multiple types PII - ResourceAccessSpec : - readers
 * :foo@bar.com - DataAccessSpec : - readers :bar@foo.com
 */
export interface GoogleCloudDataplexV1DataAttribute {
  /**
   * Output only. The number of child attributes present for this attribute.
   */
  readonly attributeCount?: number;
  /**
   * Output only. The time when the DataAttribute was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. Specified when applied to data stored on the resource (eg: rows,
   * columns in BigQuery Tables).
   */
  dataAccessSpec?: GoogleCloudDataplexV1DataAccessSpec;
  /**
   * Optional. Description of the DataAttribute.
   */
  description?: string;
  /**
   * Optional. User friendly display name.
   */
  displayName?: string;
  /**
   * This checksum is computed by the server based on the value of other
   * fields, and may be sent on update and delete requests to ensure the client
   * has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Optional. User-defined labels for the DataAttribute.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The relative resource name of the dataAttribute, of the form:
   * projects/{project_number}/locations/{location_id}/dataTaxonomies/{dataTaxonomy}/attributes/{data_attribute_id}.
   */
  readonly name?: string;
  /**
   * Optional. The ID of the parent DataAttribute resource, should belong to
   * the same data taxonomy. Circular dependency in parent chain is not valid.
   * Maximum depth of the hierarchy allowed is 4. a -> b -> c -> d -> e, depth =
   * 4
   */
  parentId?: string;
  /**
   * Optional. Specified when applied to a resource (eg: Cloud Storage bucket,
   * BigQuery dataset, BigQuery table).
   */
  resourceAccessSpec?: GoogleCloudDataplexV1ResourceAccessSpec;
  /**
   * Output only. System generated globally unique ID for the DataAttribute.
   * This ID will be different if the DataAttribute is deleted and re-created
   * with the same name.
   */
  readonly uid?: string;
  /**
   * Output only. The time when the DataAttribute was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * DataAttributeBinding represents binding of attributes to resources. Eg: Bind
 * 'CustomerInfo' entity with 'PII' attribute.
 */
export interface GoogleCloudDataplexV1DataAttributeBinding {
  /**
   * Optional. List of attributes to be associated with the resource, provided
   * in the form:
   * projects/{project}/locations/{location}/dataTaxonomies/{dataTaxonomy}/attributes/{data_attribute_id}
   */
  attributes?: string[];
  /**
   * Output only. The time when the DataAttributeBinding was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. Description of the DataAttributeBinding.
   */
  description?: string;
  /**
   * Optional. User friendly display name.
   */
  displayName?: string;
  /**
   * This checksum is computed by the server based on the value of other
   * fields, and may be sent on update and delete requests to ensure the client
   * has an up-to-date value before proceeding. Etags must be used when calling
   * the DeleteDataAttributeBinding and the UpdateDataAttributeBinding method.
   */
  etag?: string;
  /**
   * Optional. User-defined labels for the DataAttributeBinding.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The relative resource name of the Data Attribute Binding, of
   * the form:
   * projects/{project_number}/locations/{location}/dataAttributeBindings/{data_attribute_binding_id}
   */
  readonly name?: string;
  /**
   * Optional. The list of paths for items within the associated resource (eg.
   * columns within a table) along with attribute bindings.
   */
  paths?: GoogleCloudDataplexV1DataAttributeBindingPath[];
  /**
   * Optional. Immutable. The resource name of the resource that is associated
   * to attributes. Presently, only entity resource is supported in the form:
   * projects/{project}/locations/{location}/lakes/{lake}/zones/{zone}/entities/{entity_id}
   * Must belong in the same project and region as the attribute binding, and
   * there can only exist one active binding for a resource.
   */
  resource?: string;
  /**
   * Output only. System generated globally unique ID for the
   * DataAttributeBinding. This ID will be different if the DataAttributeBinding
   * is deleted and re-created with the same name.
   */
  readonly uid?: string;
  /**
   * Output only. The time when the DataAttributeBinding was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * Represents a subresource of a given resource, and associated bindings with
 * it.
 */
export interface GoogleCloudDataplexV1DataAttributeBindingPath {
  /**
   * Optional. List of attributes to be associated with the path of the
   * resource, provided in the form:
   * projects/{project}/locations/{location}/dataTaxonomies/{dataTaxonomy}/attributes/{data_attribute_id}
   */
  attributes?: string[];
  /**
   * Required. The name identifier of the path. Nested columns should be of the
   * form: 'country.state.city'.
   */
  name?: string;
}

/**
 * DataProfileResult defines the output of DataProfileScan. Each field of the
 * table will have field type specific profile result.
 */
export interface GoogleCloudDataplexV1DataProfileResult {
  /**
   * The profile information per field.
   */
  profile?: GoogleCloudDataplexV1DataProfileResultProfile;
  /**
   * The count of rows scanned.
   */
  rowCount?: bigint;
  /**
   * The data scanned for this result.
   */
  scannedData?: GoogleCloudDataplexV1ScannedData;
}

function serializeGoogleCloudDataplexV1DataProfileResult(data: any): GoogleCloudDataplexV1DataProfileResult {
  return {
    ...data,
    profile: data["profile"] !== undefined ? serializeGoogleCloudDataplexV1DataProfileResultProfile(data["profile"]) : undefined,
    rowCount: data["rowCount"] !== undefined ? String(data["rowCount"]) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1DataProfileResult(data: any): GoogleCloudDataplexV1DataProfileResult {
  return {
    ...data,
    profile: data["profile"] !== undefined ? deserializeGoogleCloudDataplexV1DataProfileResultProfile(data["profile"]) : undefined,
    rowCount: data["rowCount"] !== undefined ? BigInt(data["rowCount"]) : undefined,
  };
}

/**
 * Contains name, type, mode and field type specific profile information.
 */
export interface GoogleCloudDataplexV1DataProfileResultProfile {
  /**
   * List of fields with structural and profile information for each field.
   */
  fields?: GoogleCloudDataplexV1DataProfileResultProfileField[];
}

function serializeGoogleCloudDataplexV1DataProfileResultProfile(data: any): GoogleCloudDataplexV1DataProfileResultProfile {
  return {
    ...data,
    fields: data["fields"] !== undefined ? data["fields"].map((item: any) => (serializeGoogleCloudDataplexV1DataProfileResultProfileField(item))) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1DataProfileResultProfile(data: any): GoogleCloudDataplexV1DataProfileResultProfile {
  return {
    ...data,
    fields: data["fields"] !== undefined ? data["fields"].map((item: any) => (deserializeGoogleCloudDataplexV1DataProfileResultProfileField(item))) : undefined,
  };
}

/**
 * A field within a table.
 */
export interface GoogleCloudDataplexV1DataProfileResultProfileField {
  /**
   * The mode of the field. Possible values include: REQUIRED, if it is a
   * required field. NULLABLE, if it is an optional field. REPEATED, if it is a
   * repeated field.
   */
  mode?: string;
  /**
   * The name of the field.
   */
  name?: string;
  /**
   * Profile information for the corresponding field.
   */
  profile?: GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo;
  /**
   * The field data type. Possible values include: STRING BYTE INT64 INT32
   * INT16 DOUBLE FLOAT DECIMAL BOOLEAN BINARY TIMESTAMP DATE TIME NULL RECORD
   */
  type?: string;
}

function serializeGoogleCloudDataplexV1DataProfileResultProfileField(data: any): GoogleCloudDataplexV1DataProfileResultProfileField {
  return {
    ...data,
    profile: data["profile"] !== undefined ? serializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo(data["profile"]) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1DataProfileResultProfileField(data: any): GoogleCloudDataplexV1DataProfileResultProfileField {
  return {
    ...data,
    profile: data["profile"] !== undefined ? deserializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo(data["profile"]) : undefined,
  };
}

/**
 * The profile information for each field type.
 */
export interface GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo {
  /**
   * Ratio of rows with distinct values against total scanned rows. Not
   * available for complex non-groupable field type RECORD and fields with
   * REPEATABLE mode.
   */
  distinctRatio?: number;
  /**
   * Double type field information.
   */
  doubleProfile?: GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoDoubleFieldInfo;
  /**
   * Integer type field information.
   */
  integerProfile?: GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo;
  /**
   * Ratio of rows with null value against total scanned rows.
   */
  nullRatio?: number;
  /**
   * String type field information.
   */
  stringProfile?: GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo;
  /**
   * The list of top N non-null values and number of times they occur in the
   * scanned data. N is 10 or equal to the number of distinct values in the
   * field, whichever is smaller. Not available for complex non-groupable field
   * type RECORD and fields with REPEATABLE mode.
   */
  topNValues?: GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue[];
}

function serializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo(data: any): GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo {
  return {
    ...data,
    integerProfile: data["integerProfile"] !== undefined ? serializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo(data["integerProfile"]) : undefined,
    stringProfile: data["stringProfile"] !== undefined ? serializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo(data["stringProfile"]) : undefined,
    topNValues: data["topNValues"] !== undefined ? data["topNValues"].map((item: any) => (serializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue(item))) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo(data: any): GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo {
  return {
    ...data,
    integerProfile: data["integerProfile"] !== undefined ? deserializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo(data["integerProfile"]) : undefined,
    stringProfile: data["stringProfile"] !== undefined ? deserializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo(data["stringProfile"]) : undefined,
    topNValues: data["topNValues"] !== undefined ? data["topNValues"].map((item: any) => (deserializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue(item))) : undefined,
  };
}

/**
 * The profile information for a double type field.
 */
export interface GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoDoubleFieldInfo {
  /**
   * Average of non-null values in the scanned data. NaN, if the field has a
   * NaN.
   */
  average?: number;
  /**
   * Maximum of non-null values in the scanned data. NaN, if the field has a
   * NaN.
   */
  max?: number;
  /**
   * Minimum of non-null values in the scanned data. NaN, if the field has a
   * NaN.
   */
  min?: number;
  /**
   * A quartile divides the number of data points into four parts, or quarters,
   * of more-or-less equal size. Three main quartiles used are: The first
   * quartile (Q1) splits off the lowest 25% of data from the highest 75%. It is
   * also known as the lower or 25th empirical quartile, as 25% of the data is
   * below this point. The second quartile (Q2) is the median of a data set. So,
   * 50% of the data lies below this point. The third quartile (Q3) splits off
   * the highest 25% of data from the lowest 75%. It is known as the upper or
   * 75th empirical quartile, as 75% of the data lies below this point. Here,
   * the quartiles is provided as an ordered list of quartile values for the
   * scanned data, occurring in order Q1, median, Q3.
   */
  quartiles?: number[];
  /**
   * Standard deviation of non-null values in the scanned data. NaN, if the
   * field has a NaN.
   */
  standardDeviation?: number;
}

/**
 * The profile information for an integer type field.
 */
export interface GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo {
  /**
   * Average of non-null values in the scanned data. NaN, if the field has a
   * NaN.
   */
  average?: number;
  /**
   * Maximum of non-null values in the scanned data. NaN, if the field has a
   * NaN.
   */
  max?: bigint;
  /**
   * Minimum of non-null values in the scanned data. NaN, if the field has a
   * NaN.
   */
  min?: bigint;
  /**
   * A quartile divides the number of data points into four parts, or quarters,
   * of more-or-less equal size. Three main quartiles used are: The first
   * quartile (Q1) splits off the lowest 25% of data from the highest 75%. It is
   * also known as the lower or 25th empirical quartile, as 25% of the data is
   * below this point. The second quartile (Q2) is the median of a data set. So,
   * 50% of the data lies below this point. The third quartile (Q3) splits off
   * the highest 25% of data from the lowest 75%. It is known as the upper or
   * 75th empirical quartile, as 75% of the data lies below this point. Here,
   * the quartiles is provided as an ordered list of quartile values for the
   * scanned data, occurring in order Q1, median, Q3.
   */
  quartiles?: bigint[];
  /**
   * Standard deviation of non-null values in the scanned data. NaN, if the
   * field has a NaN.
   */
  standardDeviation?: number;
}

function serializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo(data: any): GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo {
  return {
    ...data,
    max: data["max"] !== undefined ? String(data["max"]) : undefined,
    min: data["min"] !== undefined ? String(data["min"]) : undefined,
    quartiles: data["quartiles"] !== undefined ? data["quartiles"].map((item: any) => (String(item))) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo(data: any): GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo {
  return {
    ...data,
    max: data["max"] !== undefined ? BigInt(data["max"]) : undefined,
    min: data["min"] !== undefined ? BigInt(data["min"]) : undefined,
    quartiles: data["quartiles"] !== undefined ? data["quartiles"].map((item: any) => (BigInt(item))) : undefined,
  };
}

/**
 * The profile information for a string type field.
 */
export interface GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo {
  /**
   * Average length of non-null values in the scanned data.
   */
  averageLength?: number;
  /**
   * Maximum length of non-null values in the scanned data.
   */
  maxLength?: bigint;
  /**
   * Minimum length of non-null values in the scanned data.
   */
  minLength?: bigint;
}

function serializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo(data: any): GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo {
  return {
    ...data,
    maxLength: data["maxLength"] !== undefined ? String(data["maxLength"]) : undefined,
    minLength: data["minLength"] !== undefined ? String(data["minLength"]) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo(data: any): GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo {
  return {
    ...data,
    maxLength: data["maxLength"] !== undefined ? BigInt(data["maxLength"]) : undefined,
    minLength: data["minLength"] !== undefined ? BigInt(data["minLength"]) : undefined,
  };
}

/**
 * Top N non-null values in the scanned data.
 */
export interface GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue {
  /**
   * Count of the corresponding value in the scanned data.
   */
  count?: bigint;
  /**
   * String value of a top N non-null value.
   */
  value?: string;
}

function serializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue(data: any): GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue {
  return {
    ...data,
    count: data["count"] !== undefined ? String(data["count"]) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue(data: any): GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue {
  return {
    ...data,
    count: data["count"] !== undefined ? BigInt(data["count"]) : undefined,
  };
}

/**
 * DataProfileScan related setting.
 */
export interface GoogleCloudDataplexV1DataProfileSpec {
}

/**
 * DataQualityDimensionResult provides a more detailed, per-dimension view of
 * the results.
 */
export interface GoogleCloudDataplexV1DataQualityDimensionResult {
  /**
   * Whether the dimension passed or failed.
   */
  passed?: boolean;
}

/**
 * The output of a DataQualityScan.
 */
export interface GoogleCloudDataplexV1DataQualityResult {
  /**
   * A list of results at the dimension level.
   */
  dimensions?: GoogleCloudDataplexV1DataQualityDimensionResult[];
  /**
   * Overall data quality result -- true if all rules passed.
   */
  passed?: boolean;
  /**
   * The count of rows processed.
   */
  rowCount?: bigint;
  /**
   * A list of all the rules in a job, and their results.
   */
  rules?: GoogleCloudDataplexV1DataQualityRuleResult[];
  /**
   * The data scanned for this result.
   */
  scannedData?: GoogleCloudDataplexV1ScannedData;
}

function serializeGoogleCloudDataplexV1DataQualityResult(data: any): GoogleCloudDataplexV1DataQualityResult {
  return {
    ...data,
    rowCount: data["rowCount"] !== undefined ? String(data["rowCount"]) : undefined,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (serializeGoogleCloudDataplexV1DataQualityRuleResult(item))) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1DataQualityResult(data: any): GoogleCloudDataplexV1DataQualityResult {
  return {
    ...data,
    rowCount: data["rowCount"] !== undefined ? BigInt(data["rowCount"]) : undefined,
    rules: data["rules"] !== undefined ? data["rules"].map((item: any) => (deserializeGoogleCloudDataplexV1DataQualityRuleResult(item))) : undefined,
  };
}

/**
 * A rule captures data quality intent about a data source.
 */
export interface GoogleCloudDataplexV1DataQualityRule {
  /**
   * Optional. The unnested column which this rule is evaluated against.
   */
  column?: string;
  /**
   * Required. The dimension a rule belongs to. Results are also aggregated at
   * the dimension level. Supported dimensions are "COMPLETENESS", "ACCURACY",
   * "CONSISTENCY", "VALIDITY", "UNIQUENESS", "INTEGRITY"
   */
  dimension?: string;
  /**
   * Optional. Rows with null values will automatically fail a rule, unless
   * ignore_null is true. In that case, such null rows are trivially considered
   * passing.Only applicable to ColumnMap rules.
   */
  ignoreNull?: boolean;
  /**
   * ColumnMap rule which evaluates whether each column value is null.
   */
  nonNullExpectation?: GoogleCloudDataplexV1DataQualityRuleNonNullExpectation;
  /**
   * ColumnMap rule which evaluates whether each column value lies between a
   * specified range.
   */
  rangeExpectation?: GoogleCloudDataplexV1DataQualityRuleRangeExpectation;
  /**
   * ColumnMap rule which evaluates whether each column value matches a
   * specified regex.
   */
  regexExpectation?: GoogleCloudDataplexV1DataQualityRuleRegexExpectation;
  /**
   * Table rule which evaluates whether each row passes the specified
   * condition.
   */
  rowConditionExpectation?: GoogleCloudDataplexV1DataQualityRuleRowConditionExpectation;
  /**
   * ColumnMap rule which evaluates whether each column value is contained by a
   * specified set.
   */
  setExpectation?: GoogleCloudDataplexV1DataQualityRuleSetExpectation;
  /**
   * ColumnAggregate rule which evaluates whether the column aggregate
   * statistic lies between a specified range.
   */
  statisticRangeExpectation?: GoogleCloudDataplexV1DataQualityRuleStatisticRangeExpectation;
  /**
   * Table rule which evaluates whether the provided expression is true.
   */
  tableConditionExpectation?: GoogleCloudDataplexV1DataQualityRuleTableConditionExpectation;
  /**
   * Optional. The minimum ratio of passing_rows / total_rows required to pass
   * this rule, with a range of 0.0, 1.0.0 indicates default value (i.e. 1.0).
   */
  threshold?: number;
  /**
   * ColumnAggregate rule which evaluates whether the column has duplicates.
   */
  uniquenessExpectation?: GoogleCloudDataplexV1DataQualityRuleUniquenessExpectation;
}

/**
 * Evaluates whether each column value is null.
 */
export interface GoogleCloudDataplexV1DataQualityRuleNonNullExpectation {
}

/**
 * Evaluates whether each column value lies between a specified range.
 */
export interface GoogleCloudDataplexV1DataQualityRuleRangeExpectation {
  /**
   * Optional. The maximum column value allowed for a row to pass this
   * validation. At least one of min_value and max_value need to be provided.
   */
  maxValue?: string;
  /**
   * Optional. The minimum column value allowed for a row to pass this
   * validation. At least one of min_value and max_value need to be provided.
   */
  minValue?: string;
  /**
   * Optional. Whether each value needs to be strictly lesser than ('<') the
   * maximum, or if equality is allowed.Only relevant if a max_value has been
   * defined. Default = false.
   */
  strictMaxEnabled?: boolean;
  /**
   * Optional. Whether each value needs to be strictly greater than ('>') the
   * minimum, or if equality is allowed.Only relevant if a min_value has been
   * defined. Default = false.
   */
  strictMinEnabled?: boolean;
}

/**
 * Evaluates whether each column value matches a specified regex.
 */
export interface GoogleCloudDataplexV1DataQualityRuleRegexExpectation {
  /**
   * A regular expression the column value is expected to match.
   */
  regex?: string;
}

/**
 * DataQualityRuleResult provides a more detailed, per-rule view of the
 * results.
 */
export interface GoogleCloudDataplexV1DataQualityRuleResult {
  /**
   * The number of rows a rule was evaluated against. This field is only valid
   * for ColumnMap type rules.Evaluated count can be configured to either
   * include all rows (default) - with null rows automatically failing rule
   * evaluation, or exclude null rows from the evaluated_count, by setting
   * ignore_nulls = true.
   */
  evaluatedCount?: bigint;
  /**
   * The query to find rows that did not pass this rule. Only applies to
   * ColumnMap and RowCondition rules.
   */
  failingRowsQuery?: string;
  /**
   * The number of rows with null values in the specified column.
   */
  nullCount?: bigint;
  /**
   * Whether the rule passed or failed.
   */
  passed?: boolean;
  /**
   * The number of rows which passed a rule evaluation. This field is only
   * valid for ColumnMap type rules.
   */
  passedCount?: bigint;
  /**
   * The ratio of passed_count / evaluated_count. This field is only valid for
   * ColumnMap type rules.
   */
  passRatio?: number;
  /**
   * The rule specified in the DataQualitySpec, as is.
   */
  rule?: GoogleCloudDataplexV1DataQualityRule;
}

function serializeGoogleCloudDataplexV1DataQualityRuleResult(data: any): GoogleCloudDataplexV1DataQualityRuleResult {
  return {
    ...data,
    evaluatedCount: data["evaluatedCount"] !== undefined ? String(data["evaluatedCount"]) : undefined,
    nullCount: data["nullCount"] !== undefined ? String(data["nullCount"]) : undefined,
    passedCount: data["passedCount"] !== undefined ? String(data["passedCount"]) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1DataQualityRuleResult(data: any): GoogleCloudDataplexV1DataQualityRuleResult {
  return {
    ...data,
    evaluatedCount: data["evaluatedCount"] !== undefined ? BigInt(data["evaluatedCount"]) : undefined,
    nullCount: data["nullCount"] !== undefined ? BigInt(data["nullCount"]) : undefined,
    passedCount: data["passedCount"] !== undefined ? BigInt(data["passedCount"]) : undefined,
  };
}

/**
 * Evaluates whether each row passes the specified condition.The SQL expression
 * needs to use BigQuery standard SQL syntax and should produce a boolean value
 * per row as the result.Example: col1 >= 0 AND col2 < 10
 */
export interface GoogleCloudDataplexV1DataQualityRuleRowConditionExpectation {
  /**
   * The SQL expression.
   */
  sqlExpression?: string;
}

/**
 * Evaluates whether each column value is contained by a specified set.
 */
export interface GoogleCloudDataplexV1DataQualityRuleSetExpectation {
  /**
   * Expected values for the column value.
   */
  values?: string[];
}

/**
 * Evaluates whether the column aggregate statistic lies between a specified
 * range.
 */
export interface GoogleCloudDataplexV1DataQualityRuleStatisticRangeExpectation {
  /**
   * The maximum column statistic value allowed for a row to pass this
   * validation.At least one of min_value and max_value need to be provided.
   */
  maxValue?: string;
  /**
   * The minimum column statistic value allowed for a row to pass this
   * validation.At least one of min_value and max_value need to be provided.
   */
  minValue?: string;
  statistic?:  | "STATISTIC_UNDEFINED" | "MEAN" | "MIN" | "MAX";
  /**
   * Whether column statistic needs to be strictly lesser than ('<') the
   * maximum, or if equality is allowed.Only relevant if a max_value has been
   * defined. Default = false.
   */
  strictMaxEnabled?: boolean;
  /**
   * Whether column statistic needs to be strictly greater than ('>') the
   * minimum, or if equality is allowed.Only relevant if a min_value has been
   * defined. Default = false.
   */
  strictMinEnabled?: boolean;
}

/**
 * Evaluates whether the provided expression is true.The SQL expression needs
 * to use BigQuery standard SQL syntax and should produce a scalar boolean
 * result.Example: MIN(col1) >= 0
 */
export interface GoogleCloudDataplexV1DataQualityRuleTableConditionExpectation {
  /**
   * The SQL expression.
   */
  sqlExpression?: string;
}

/**
 * Evaluates whether the column has duplicates.
 */
export interface GoogleCloudDataplexV1DataQualityRuleUniquenessExpectation {
}

/**
 * DataQualityScan related setting.
 */
export interface GoogleCloudDataplexV1DataQualitySpec {
  /**
   * The list of rules to evaluate against a data source. At least one rule is
   * required.
   */
  rules?: GoogleCloudDataplexV1DataQualityRule[];
}

/**
 * Represents a user-visible job which provides the insights for the related
 * data source.For example: Data Quality: generates queries based on the rules
 * and runs against the data to get data quality check results. Data Profile:
 * analyzes the data in table(s) and generates insights about the structure,
 * content and relationships (such as null percent, cardinality, min/max/mean,
 * etc).
 */
export interface GoogleCloudDataplexV1DataScan {
  /**
   * Output only. The time when the scan was created.
   */
  readonly createTime?: Date;
  /**
   * Required. The data source for DataScan.
   */
  data?: GoogleCloudDataplexV1DataSource;
  /**
   * Output only. The result of the data profile scan.
   */
  readonly dataProfileResult?: GoogleCloudDataplexV1DataProfileResult;
  /**
   * DataProfileScan related setting.
   */
  dataProfileSpec?: GoogleCloudDataplexV1DataProfileSpec;
  /**
   * Output only. The result of the data quality scan.
   */
  readonly dataQualityResult?: GoogleCloudDataplexV1DataQualityResult;
  /**
   * DataQualityScan related setting.
   */
  dataQualitySpec?: GoogleCloudDataplexV1DataQualitySpec;
  /**
   * Optional. Description of the scan. Must be between 1-1024 characters.
   */
  description?: string;
  /**
   * Optional. User friendly display name. Must be between 1-256 characters.
   */
  displayName?: string;
  /**
   * Optional. DataScan execution settings.If not specified, the fields in it
   * will use their default values.
   */
  executionSpec?: GoogleCloudDataplexV1DataScanExecutionSpec;
  /**
   * Output only. Status of the data scan execution.
   */
  readonly executionStatus?: GoogleCloudDataplexV1DataScanExecutionStatus;
  /**
   * Optional. User-defined labels for the scan.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The relative resource name of the scan, of the form:
   * projects/{project}/locations/{location_id}/dataScans/{datascan_id}, where
   * project refers to a project_id or project_number and location_id refers to
   * a GCP region.
   */
  readonly name?: string;
  /**
   * Output only. Current state of the DataScan.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED";
  /**
   * Output only. The type of DataScan.
   */
  readonly type?:  | "DATA_SCAN_TYPE_UNSPECIFIED" | "DATA_QUALITY" | "DATA_PROFILE";
  /**
   * Output only. System generated globally unique ID for the scan. This ID
   * will be different if the scan is deleted and re-created with the same name.
   */
  readonly uid?: string;
  /**
   * Output only. The time when the scan was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * These messages contain information about the execution of a datascan. The
 * monitored resource is 'DataScan'
 */
export interface GoogleCloudDataplexV1DataScanEvent {
  /**
   * Data profile result for data profile type data scan.
   */
  dataProfile?: GoogleCloudDataplexV1DataScanEventDataProfileResult;
  /**
   * Data quality result for data quality type data scan.
   */
  dataQuality?: GoogleCloudDataplexV1DataScanEventDataQualityResult;
  /**
   * The data source of the data scan
   */
  dataSource?: string;
  /**
   * The time when the data scan job finished.
   */
  endTime?: Date;
  /**
   * The identifier of the specific data scan job this log entry is for.
   */
  jobId?: string;
  /**
   * The message describing the data scan job event.
   */
  message?: string;
  /**
   * The scope of the data scan (e.g. full, incremental).
   */
  scope?:  | "SCOPE_UNSPECIFIED" | "FULL" | "INCREMENTAL";
  /**
   * A version identifier of the spec which was used to execute this job.
   */
  specVersion?: string;
  /**
   * The time when the data scan job started to run.
   */
  startTime?: Date;
  /**
   * The status of the data scan job.
   */
  state?:  | "STATE_UNSPECIFIED" | "STARTED" | "SUCCEEDED" | "FAILED" | "CANCELLED";
  /**
   * The trigger type of the data scan job.
   */
  trigger?:  | "TRIGGER_UNSPECIFIED" | "ON_DEMAND" | "SCHEDULE";
  /**
   * The type of the data scan.
   */
  type?:  | "SCAN_TYPE_UNSPECIFIED" | "DATA_PROFILE" | "DATA_QUALITY";
}

function serializeGoogleCloudDataplexV1DataScanEvent(data: any): GoogleCloudDataplexV1DataScanEvent {
  return {
    ...data,
    dataProfile: data["dataProfile"] !== undefined ? serializeGoogleCloudDataplexV1DataScanEventDataProfileResult(data["dataProfile"]) : undefined,
    dataQuality: data["dataQuality"] !== undefined ? serializeGoogleCloudDataplexV1DataScanEventDataQualityResult(data["dataQuality"]) : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDataplexV1DataScanEvent(data: any): GoogleCloudDataplexV1DataScanEvent {
  return {
    ...data,
    dataProfile: data["dataProfile"] !== undefined ? deserializeGoogleCloudDataplexV1DataScanEventDataProfileResult(data["dataProfile"]) : undefined,
    dataQuality: data["dataQuality"] !== undefined ? deserializeGoogleCloudDataplexV1DataScanEventDataQualityResult(data["dataQuality"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Data profile result for data scan job.
 */
export interface GoogleCloudDataplexV1DataScanEventDataProfileResult {
  /**
   * The count of rows processed in the data scan job.
   */
  rowCount?: bigint;
}

function serializeGoogleCloudDataplexV1DataScanEventDataProfileResult(data: any): GoogleCloudDataplexV1DataScanEventDataProfileResult {
  return {
    ...data,
    rowCount: data["rowCount"] !== undefined ? String(data["rowCount"]) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1DataScanEventDataProfileResult(data: any): GoogleCloudDataplexV1DataScanEventDataProfileResult {
  return {
    ...data,
    rowCount: data["rowCount"] !== undefined ? BigInt(data["rowCount"]) : undefined,
  };
}

/**
 * Data quality result for data scan job.
 */
export interface GoogleCloudDataplexV1DataScanEventDataQualityResult {
  /**
   * The result of each dimension for data quality result. The key of the map
   * is the name of the dimension. The value is the bool value depicting whether
   * the dimension result was pass or not.
   */
  dimensionPassed?: {
    [key: string]: boolean
  };
  /**
   * Whether the data quality result was pass or not.
   */
  passed?: boolean;
  /**
   * The count of rows processed in the data scan job.
   */
  rowCount?: bigint;
}

function serializeGoogleCloudDataplexV1DataScanEventDataQualityResult(data: any): GoogleCloudDataplexV1DataScanEventDataQualityResult {
  return {
    ...data,
    rowCount: data["rowCount"] !== undefined ? String(data["rowCount"]) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1DataScanEventDataQualityResult(data: any): GoogleCloudDataplexV1DataScanEventDataQualityResult {
  return {
    ...data,
    rowCount: data["rowCount"] !== undefined ? BigInt(data["rowCount"]) : undefined,
  };
}

/**
 * DataScan execution settings.
 */
export interface GoogleCloudDataplexV1DataScanExecutionSpec {
  /**
   * Immutable. The unnested field (of type Date or Timestamp) that contains
   * values which monotonically increase over time.If not specified, a data scan
   * will run for all data in the table.
   */
  field?: string;
  /**
   * Optional. Spec related to how often and when a scan should be triggered.If
   * not specified, the default is OnDemand, which means the scan will not run
   * until the user calls RunDataScan API.
   */
  trigger?: GoogleCloudDataplexV1Trigger;
}

/**
 * Status of the data scan execution.
 */
export interface GoogleCloudDataplexV1DataScanExecutionStatus {
  /**
   * The time when the latest DataScanJob ended.
   */
  latestJobEndTime?: Date;
  /**
   * The time when the latest DataScanJob started.
   */
  latestJobStartTime?: Date;
}

function serializeGoogleCloudDataplexV1DataScanExecutionStatus(data: any): GoogleCloudDataplexV1DataScanExecutionStatus {
  return {
    ...data,
    latestJobEndTime: data["latestJobEndTime"] !== undefined ? data["latestJobEndTime"].toISOString() : undefined,
    latestJobStartTime: data["latestJobStartTime"] !== undefined ? data["latestJobStartTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDataplexV1DataScanExecutionStatus(data: any): GoogleCloudDataplexV1DataScanExecutionStatus {
  return {
    ...data,
    latestJobEndTime: data["latestJobEndTime"] !== undefined ? new Date(data["latestJobEndTime"]) : undefined,
    latestJobStartTime: data["latestJobStartTime"] !== undefined ? new Date(data["latestJobStartTime"]) : undefined,
  };
}

/**
 * A DataScanJob represents an instance of DataScan execution.
 */
export interface GoogleCloudDataplexV1DataScanJob {
  /**
   * Output only. The result of the data profile scan.
   */
  readonly dataProfileResult?: GoogleCloudDataplexV1DataProfileResult;
  /**
   * Output only. DataProfileScan related setting.
   */
  readonly dataProfileSpec?: GoogleCloudDataplexV1DataProfileSpec;
  /**
   * Output only. The result of the data quality scan.
   */
  readonly dataQualityResult?: GoogleCloudDataplexV1DataQualityResult;
  /**
   * Output only. DataQualityScan related setting.
   */
  readonly dataQualitySpec?: GoogleCloudDataplexV1DataQualitySpec;
  /**
   * Output only. The time when the DataScanJob ended.
   */
  readonly endTime?: Date;
  /**
   * Output only. Additional information about the current state.
   */
  readonly message?: string;
  /**
   * Output only. The relative resource name of the DataScanJob, of the form:
   * projects/{project}/locations/{location_id}/dataScans/{datascan_id}/jobs/{job_id},
   * where project refers to a project_id or project_number and location_id
   * refers to a GCP region.
   */
  readonly name?: string;
  /**
   * Output only. The time when the DataScanJob was started.
   */
  readonly startTime?: Date;
  /**
   * Output only. Execution state for the DataScanJob.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "CANCELING" | "CANCELLED" | "SUCCEEDED" | "FAILED" | "PENDING";
  /**
   * Output only. The type of the parent DataScan.
   */
  readonly type?:  | "DATA_SCAN_TYPE_UNSPECIFIED" | "DATA_QUALITY" | "DATA_PROFILE";
  /**
   * Output only. System generated globally unique ID for the DataScanJob.
   */
  readonly uid?: string;
}

/**
 * The data source for DataScan.
 */
export interface GoogleCloudDataplexV1DataSource {
  /**
   * Immutable. The Dataplex entity that represents the data source (e.g.
   * BigQuery table) for DataScan, of the form:
   * projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}.
   */
  entity?: string;
}

/**
 * DataTaxonomy represents a set of hierarchical DataAttributes resources,
 * grouped with a common theme Eg: 'SensitiveDataTaxonomy' can have attributes
 * to manage PII data. It is defined at project level.
 */
export interface GoogleCloudDataplexV1DataTaxonomy {
  /**
   * Output only. The number of attributes in the DataTaxonomy.
   */
  readonly attributeCount?: number;
  /**
   * Output only. The time when the DataTaxonomy was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. Description of the DataTaxonomy.
   */
  description?: string;
  /**
   * Optional. User friendly display name.
   */
  displayName?: string;
  /**
   * This checksum is computed by the server based on the value of other
   * fields, and may be sent on update and delete requests to ensure the client
   * has an up-to-date value before proceeding.
   */
  etag?: string;
  /**
   * Optional. User-defined labels for the DataTaxonomy.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The relative resource name of the DataTaxonomy, of the form:
   * projects/{project_number}/locations/{location_id}/dataTaxonomies/{data_taxonomy_id}.
   */
  readonly name?: string;
  /**
   * Output only. System generated globally unique ID for the dataTaxonomy.
   * This ID will be different if the DataTaxonomy is deleted and re-created
   * with the same name.
   */
  readonly uid?: string;
  /**
   * Output only. The time when the DataTaxonomy was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * The payload associated with Discovery data processing.
 */
export interface GoogleCloudDataplexV1DiscoveryEvent {
  /**
   * Details about the action associated with the event.
   */
  action?: GoogleCloudDataplexV1DiscoveryEventActionDetails;
  /**
   * The id of the associated asset.
   */
  assetId?: string;
  /**
   * Details about discovery configuration in effect.
   */
  config?: GoogleCloudDataplexV1DiscoveryEventConfigDetails;
  /**
   * The data location associated with the event.
   */
  dataLocation?: string;
  /**
   * Details about the entity associated with the event.
   */
  entity?: GoogleCloudDataplexV1DiscoveryEventEntityDetails;
  /**
   * The id of the associated lake.
   */
  lakeId?: string;
  /**
   * The log message.
   */
  message?: string;
  /**
   * Details about the partition associated with the event.
   */
  partition?: GoogleCloudDataplexV1DiscoveryEventPartitionDetails;
  /**
   * The type of the event being logged.
   */
  type?:  | "EVENT_TYPE_UNSPECIFIED" | "CONFIG" | "ENTITY_CREATED" | "ENTITY_UPDATED" | "ENTITY_DELETED" | "PARTITION_CREATED" | "PARTITION_UPDATED" | "PARTITION_DELETED";
  /**
   * The id of the associated zone.
   */
  zoneId?: string;
}

/**
 * Details about the action.
 */
export interface GoogleCloudDataplexV1DiscoveryEventActionDetails {
  /**
   * The type of action. Eg. IncompatibleDataSchema, InvalidDataFormat
   */
  type?: string;
}

/**
 * Details about configuration events.
 */
export interface GoogleCloudDataplexV1DiscoveryEventConfigDetails {
  /**
   * A list of discovery configuration parameters in effect. The keys are the
   * field paths within DiscoverySpec. Eg. includePatterns, excludePatterns,
   * csvOptions.disableTypeInference, etc.
   */
  parameters?: {
    [key: string]: string
  };
}

/**
 * Details about the entity.
 */
export interface GoogleCloudDataplexV1DiscoveryEventEntityDetails {
  /**
   * The name of the entity resource. The name is the fully-qualified resource
   * name.
   */
  entity?: string;
  /**
   * The type of the entity resource.
   */
  type?:  | "ENTITY_TYPE_UNSPECIFIED" | "TABLE" | "FILESET";
}

/**
 * Details about the partition.
 */
export interface GoogleCloudDataplexV1DiscoveryEventPartitionDetails {
  /**
   * The name to the containing entity resource. The name is the
   * fully-qualified resource name.
   */
  entity?: string;
  /**
   * The name to the partition resource. The name is the fully-qualified
   * resource name.
   */
  partition?: string;
  /**
   * The locations of the data items (e.g., a Cloud Storage objects) sampled
   * for metadata inference.
   */
  sampledDataLocations?: string[];
  /**
   * The type of the containing entity resource.
   */
  type?:  | "ENTITY_TYPE_UNSPECIFIED" | "TABLE" | "FILESET";
}

/**
 * Represents tables and fileset metadata contained within a zone.
 */
export interface GoogleCloudDataplexV1Entity {
  /**
   * Output only. Identifies the access mechanism to the entity. Not user
   * settable.
   */
  readonly access?: GoogleCloudDataplexV1StorageAccess;
  /**
   * Required. Immutable. The ID of the asset associated with the storage
   * location containing the entity data. The entity must be with in the same
   * zone with the asset.
   */
  asset?: string;
  /**
   * Output only. The name of the associated Data Catalog entry.
   */
  readonly catalogEntry?: string;
  /**
   * Output only. Metadata stores that the entity is compatible with.
   */
  readonly compatibility?: GoogleCloudDataplexV1EntityCompatibilityStatus;
  /**
   * Output only. The time when the entity was created.
   */
  readonly createTime?: Date;
  /**
   * Required. Immutable. The storage path of the entity data. For Cloud
   * Storage data, this is the fully-qualified path to the entity, such as
   * gs://bucket/path/to/data. For BigQuery data, this is the name of the table
   * resource, such as projects/project_id/datasets/dataset_id/tables/table_id.
   */
  dataPath?: string;
  /**
   * Optional. The set of items within the data path constituting the data in
   * the entity, represented as a glob path. Example:
   * gs://bucket/path/to/data/**\/*.csv.
   */
  dataPathPattern?: string;
  /**
   * Optional. User friendly longer description text. Must be shorter than or
   * equal to 1024 characters.
   */
  description?: string;
  /**
   * Optional. Display name must be shorter than or equal to 256 characters.
   */
  displayName?: string;
  /**
   * Optional. The etag associated with the entity, which can be retrieved with
   * a GetEntity request. Required for update and delete requests.
   */
  etag?: string;
  /**
   * Required. Identifies the storage format of the entity data. It does not
   * apply to entities with data stored in BigQuery.
   */
  format?: GoogleCloudDataplexV1StorageFormat;
  /**
   * Required. A user-provided entity ID. It is mutable, and will be used as
   * the published table name. Specifying a new ID in an update entity request
   * will override the existing value. The ID must contain only letters (a-z,
   * A-Z), numbers (0-9), and underscores. Must begin with a letter and consist
   * of 256 or fewer characters.
   */
  id?: string;
  /**
   * Output only. The resource name of the entity, of the form:
   * projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{id}.
   */
  readonly name?: string;
  /**
   * Required. The description of the data structure and layout. The schema is
   * not included in list responses. It is only included in SCHEMA and FULL
   * entity views of a GetEntity response.
   */
  schema?: GoogleCloudDataplexV1Schema;
  /**
   * Required. Immutable. Identifies the storage system of the entity data.
   */
  system?:  | "STORAGE_SYSTEM_UNSPECIFIED" | "CLOUD_STORAGE" | "BIGQUERY";
  /**
   * Required. Immutable. The type of entity.
   */
  type?:  | "TYPE_UNSPECIFIED" | "TABLE" | "FILESET";
  /**
   * Output only. System generated unique ID for the Entity. This ID will be
   * different if the Entity is deleted and re-created with the same name.
   */
  readonly uid?: string;
  /**
   * Output only. The time when the entity was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * Provides compatibility information for various metadata stores.
 */
export interface GoogleCloudDataplexV1EntityCompatibilityStatus {
  /**
   * Output only. Whether this entity is compatible with BigQuery.
   */
  readonly bigquery?: GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility;
  /**
   * Output only. Whether this entity is compatible with Hive Metastore.
   */
  readonly hiveMetastore?: GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility;
}

/**
 * Provides compatibility information for a specific metadata store.
 */
export interface GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility {
  /**
   * Output only. Whether the entity is compatible and can be represented in
   * the metadata store.
   */
  readonly compatible?: boolean;
  /**
   * Output only. Provides additional detail if the entity is incompatible with
   * the metadata store.
   */
  readonly reason?: string;
}

/**
 * Environment represents a user-visible compute infrastructure for analytics
 * within a lake.
 */
export interface GoogleCloudDataplexV1Environment {
  /**
   * Output only. Environment creation time.
   */
  readonly createTime?: Date;
  /**
   * Optional. Description of the environment.
   */
  description?: string;
  /**
   * Optional. User friendly display name.
   */
  displayName?: string;
  /**
   * Output only. URI Endpoints to access sessions associated with the
   * Environment.
   */
  readonly endpoints?: GoogleCloudDataplexV1EnvironmentEndpoints;
  /**
   * Required. Infrastructure specification for the Environment.
   */
  infrastructureSpec?: GoogleCloudDataplexV1EnvironmentInfrastructureSpec;
  /**
   * Optional. User defined labels for the environment.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The relative resource name of the environment, of the form:
   * projects/{project_id}/locations/{location_id}/lakes/{lake_id}/environment/{environment_id}
   */
  readonly name?: string;
  /**
   * Optional. Configuration for sessions created for this environment.
   */
  sessionSpec?: GoogleCloudDataplexV1EnvironmentSessionSpec;
  /**
   * Output only. Status of sessions created for this environment.
   */
  readonly sessionStatus?: GoogleCloudDataplexV1EnvironmentSessionStatus;
  /**
   * Output only. Current state of the environment.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED";
  /**
   * Output only. System generated globally unique ID for the environment. This
   * ID will be different if the environment is deleted and re-created with the
   * same name.
   */
  readonly uid?: string;
  /**
   * Output only. The time when the environment was last updated.
   */
  readonly updateTime?: Date;
}

function serializeGoogleCloudDataplexV1Environment(data: any): GoogleCloudDataplexV1Environment {
  return {
    ...data,
    sessionSpec: data["sessionSpec"] !== undefined ? serializeGoogleCloudDataplexV1EnvironmentSessionSpec(data["sessionSpec"]) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1Environment(data: any): GoogleCloudDataplexV1Environment {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    sessionSpec: data["sessionSpec"] !== undefined ? deserializeGoogleCloudDataplexV1EnvironmentSessionSpec(data["sessionSpec"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * URI Endpoints to access sessions associated with the Environment.
 */
export interface GoogleCloudDataplexV1EnvironmentEndpoints {
  /**
   * Output only. URI to serve notebook APIs
   */
  readonly notebooks?: string;
  /**
   * Output only. URI to serve SQL APIs
   */
  readonly sql?: string;
}

/**
 * Configuration for the underlying infrastructure used to run workloads.
 */
export interface GoogleCloudDataplexV1EnvironmentInfrastructureSpec {
  /**
   * Optional. Compute resources needed for analyze interactive workloads.
   */
  compute?: GoogleCloudDataplexV1EnvironmentInfrastructureSpecComputeResources;
  /**
   * Required. Software Runtime Configuration for analyze interactive
   * workloads.
   */
  osImage?: GoogleCloudDataplexV1EnvironmentInfrastructureSpecOsImageRuntime;
}

/**
 * Compute resources associated with the analyze interactive workloads.
 */
export interface GoogleCloudDataplexV1EnvironmentInfrastructureSpecComputeResources {
  /**
   * Optional. Size in GB of the disk. Default is 100 GB.
   */
  diskSizeGb?: number;
  /**
   * Optional. Max configurable nodes. If max_node_count > node_count, then
   * auto-scaling is enabled.
   */
  maxNodeCount?: number;
  /**
   * Optional. Total number of nodes in the sessions created for this
   * environment.
   */
  nodeCount?: number;
}

/**
 * Software Runtime Configuration to run Analyze.
 */
export interface GoogleCloudDataplexV1EnvironmentInfrastructureSpecOsImageRuntime {
  /**
   * Required. Dataplex Image version.
   */
  imageVersion?: string;
  /**
   * Optional. List of Java jars to be included in the runtime environment.
   * Valid input includes Cloud Storage URIs to Jar binaries. For example,
   * gs://bucket-name/my/path/to/file.jar
   */
  javaLibraries?: string[];
  /**
   * Optional. Spark properties to provide configuration for use in sessions
   * created for this environment. The properties to set on daemon config files.
   * Property keys are specified in prefix:property format. The prefix must be
   * "spark".
   */
  properties?: {
    [key: string]: string
  };
  /**
   * Optional. A list of python packages to be installed. Valid formats include
   * Cloud Storage URI to a PIP installable library. For example,
   * gs://bucket-name/my/path/to/lib.tar.gz
   */
  pythonPackages?: string[];
}

/**
 * Configuration for sessions created for this environment.
 */
export interface GoogleCloudDataplexV1EnvironmentSessionSpec {
  /**
   * Optional. If True, this causes sessions to be pre-created and available
   * for faster startup to enable interactive exploration use-cases. This
   * defaults to False to avoid additional billed charges. These can only be set
   * to True for the environment with name set to "default", and with default
   * configuration.
   */
  enableFastStartup?: boolean;
  /**
   * Optional. The idle time configuration of the session. The session will be
   * auto-terminated at the end of this period.
   */
  maxIdleDuration?: number /* Duration */;
}

function serializeGoogleCloudDataplexV1EnvironmentSessionSpec(data: any): GoogleCloudDataplexV1EnvironmentSessionSpec {
  return {
    ...data,
    maxIdleDuration: data["maxIdleDuration"] !== undefined ? data["maxIdleDuration"] : undefined,
  };
}

function deserializeGoogleCloudDataplexV1EnvironmentSessionSpec(data: any): GoogleCloudDataplexV1EnvironmentSessionSpec {
  return {
    ...data,
    maxIdleDuration: data["maxIdleDuration"] !== undefined ? data["maxIdleDuration"] : undefined,
  };
}

/**
 * Status of sessions created for this environment.
 */
export interface GoogleCloudDataplexV1EnvironmentSessionStatus {
  /**
   * Output only. Queries over sessions to mark whether the environment is
   * currently active or not
   */
  readonly active?: boolean;
}

/**
 * A job represents an instance of a task.
 */
export interface GoogleCloudDataplexV1Job {
  /**
   * Output only. The time when the job ended.
   */
  readonly endTime?: Date;
  /**
   * Output only. Additional information about the current state.
   */
  readonly message?: string;
  /**
   * Output only. The relative resource name of the job, of the form:
   * projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}/jobs/{job_id}.
   */
  readonly name?: string;
  /**
   * Output only. The number of times the job has been retried (excluding the
   * initial attempt).
   */
  readonly retryCount?: number;
  /**
   * Output only. The underlying service running a job.
   */
  readonly service?:  | "SERVICE_UNSPECIFIED" | "DATAPROC";
  /**
   * Output only. The full resource name for the job run under a particular
   * service.
   */
  readonly serviceJob?: string;
  /**
   * Output only. The time when the job was started.
   */
  readonly startTime?: Date;
  /**
   * Output only. Execution state for the job.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "CANCELLING" | "CANCELLED" | "SUCCEEDED" | "FAILED" | "ABORTED";
  /**
   * Output only. System generated globally unique ID for the job.
   */
  readonly uid?: string;
}

/**
 * The payload associated with Job logs that contains events describing jobs
 * that have run within a Lake.
 */
export interface GoogleCloudDataplexV1JobEvent {
  /**
   * The time when the job ended running.
   */
  endTime?: Date;
  /**
   * The unique id identifying the job.
   */
  jobId?: string;
  /**
   * The log message.
   */
  message?: string;
  /**
   * The number of retries.
   */
  retries?: number;
  /**
   * The service used to execute the job.
   */
  service?:  | "SERVICE_UNSPECIFIED" | "DATAPROC";
  /**
   * The reference to the job within the service.
   */
  serviceJob?: string;
  /**
   * The time when the job started running.
   */
  startTime?: Date;
  /**
   * The job state on completion.
   */
  state?:  | "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "ABORTED";
  /**
   * The type of the job.
   */
  type?:  | "TYPE_UNSPECIFIED" | "SPARK" | "NOTEBOOK";
}

function serializeGoogleCloudDataplexV1JobEvent(data: any): GoogleCloudDataplexV1JobEvent {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDataplexV1JobEvent(data: any): GoogleCloudDataplexV1JobEvent {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * A lake is a centralized repository for managing enterprise data across the
 * organization distributed across many cloud projects, and stored in a variety
 * of storage services such as Google Cloud Storage and BigQuery. The resources
 * attached to a lake are referred to as managed resources. Data within these
 * managed resources can be structured or unstructured. A lake provides data
 * admins with tools to organize, secure and manage their data at scale, and
 * provides data scientists and data engineers an integrated experience to
 * easily search, discover, analyze and transform data and associated metadata.
 */
export interface GoogleCloudDataplexV1Lake {
  /**
   * Output only. Aggregated status of the underlying assets of the lake.
   */
  readonly assetStatus?: GoogleCloudDataplexV1AssetStatus;
  /**
   * Output only. The time when the lake was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. Description of the lake.
   */
  description?: string;
  /**
   * Optional. User friendly display name.
   */
  displayName?: string;
  /**
   * Optional. User-defined labels for the lake.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. Settings to manage lake and Dataproc Metastore service instance
   * association.
   */
  metastore?: GoogleCloudDataplexV1LakeMetastore;
  /**
   * Output only. Metastore status of the lake.
   */
  readonly metastoreStatus?: GoogleCloudDataplexV1LakeMetastoreStatus;
  /**
   * Output only. The relative resource name of the lake, of the form:
   * projects/{project_number}/locations/{location_id}/lakes/{lake_id}.
   */
  readonly name?: string;
  /**
   * Output only. Service account associated with this lake. This service
   * account must be authorized to access or operate on resources managed by the
   * lake.
   */
  readonly serviceAccount?: string;
  /**
   * Output only. Current state of the lake.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED";
  /**
   * Output only. System generated globally unique ID for the lake. This ID
   * will be different if the lake is deleted and re-created with the same name.
   */
  readonly uid?: string;
  /**
   * Output only. The time when the lake was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * Settings to manage association of Dataproc Metastore with a lake.
 */
export interface GoogleCloudDataplexV1LakeMetastore {
  /**
   * Optional. A relative reference to the Dataproc Metastore
   * (https://cloud.google.com/dataproc-metastore/docs) service associated with
   * the lake:
   * projects/{project_id}/locations/{location_id}/services/{service_id}
   */
  service?: string;
}

/**
 * Status of Lake and Dataproc Metastore service instance association.
 */
export interface GoogleCloudDataplexV1LakeMetastoreStatus {
  /**
   * The URI of the endpoint used to access the Metastore service.
   */
  endpoint?: string;
  /**
   * Additional information about the current status.
   */
  message?: string;
  /**
   * Current state of association.
   */
  state?:  | "STATE_UNSPECIFIED" | "NONE" | "READY" | "UPDATING" | "ERROR";
  /**
   * Last update time of the metastore status of the lake.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDataplexV1LakeMetastoreStatus(data: any): GoogleCloudDataplexV1LakeMetastoreStatus {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDataplexV1LakeMetastoreStatus(data: any): GoogleCloudDataplexV1LakeMetastoreStatus {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * List actions response.
 */
export interface GoogleCloudDataplexV1ListActionsResponse {
  /**
   * Actions under the given parent lake/zone/asset.
   */
  actions?: GoogleCloudDataplexV1Action[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDataplexV1ListActionsResponse(data: any): GoogleCloudDataplexV1ListActionsResponse {
  return {
    ...data,
    actions: data["actions"] !== undefined ? data["actions"].map((item: any) => (serializeGoogleCloudDataplexV1Action(item))) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1ListActionsResponse(data: any): GoogleCloudDataplexV1ListActionsResponse {
  return {
    ...data,
    actions: data["actions"] !== undefined ? data["actions"].map((item: any) => (deserializeGoogleCloudDataplexV1Action(item))) : undefined,
  };
}

/**
 * List assets response.
 */
export interface GoogleCloudDataplexV1ListAssetsResponse {
  /**
   * Asset under the given parent zone.
   */
  assets?: GoogleCloudDataplexV1Asset[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * List content response.
 */
export interface GoogleCloudDataplexV1ListContentResponse {
  /**
   * Content under the given parent lake.
   */
  content?: GoogleCloudDataplexV1Content[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * List DataAttributeBindings response.
 */
export interface GoogleCloudDataplexV1ListDataAttributeBindingsResponse {
  /**
   * DataAttributeBindings under the given parent Location.
   */
  dataAttributeBindings?: GoogleCloudDataplexV1DataAttributeBinding[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachableLocations?: string[];
}

/**
 * List DataAttributes response.
 */
export interface GoogleCloudDataplexV1ListDataAttributesResponse {
  /**
   * DataAttributes under the given parent DataTaxonomy.
   */
  dataAttributes?: GoogleCloudDataplexV1DataAttribute[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachableLocations?: string[];
}

/**
 * List DataScanJobs response.
 */
export interface GoogleCloudDataplexV1ListDataScanJobsResponse {
  /**
   * DataScanJobs (BASIC view only) under a given dataScan.
   */
  dataScanJobs?: GoogleCloudDataplexV1DataScanJob[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * List dataScans response.
 */
export interface GoogleCloudDataplexV1ListDataScansResponse {
  /**
   * DataScans (BASIC view only) under the given parent location.
   */
  dataScans?: GoogleCloudDataplexV1DataScan[];
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
 * List DataTaxonomies response.
 */
export interface GoogleCloudDataplexV1ListDataTaxonomiesResponse {
  /**
   * DataTaxonomies under the given parent location.
   */
  dataTaxonomies?: GoogleCloudDataplexV1DataTaxonomy[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachableLocations?: string[];
}

/**
 * List metadata entities response.
 */
export interface GoogleCloudDataplexV1ListEntitiesResponse {
  /**
   * Entities in the specified parent zone.
   */
  entities?: GoogleCloudDataplexV1Entity[];
  /**
   * Token to retrieve the next page of results, or empty if there are no
   * remaining results in the list.
   */
  nextPageToken?: string;
}

/**
 * List environments response.
 */
export interface GoogleCloudDataplexV1ListEnvironmentsResponse {
  /**
   * Environments under the given parent lake.
   */
  environments?: GoogleCloudDataplexV1Environment[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDataplexV1ListEnvironmentsResponse(data: any): GoogleCloudDataplexV1ListEnvironmentsResponse {
  return {
    ...data,
    environments: data["environments"] !== undefined ? data["environments"].map((item: any) => (serializeGoogleCloudDataplexV1Environment(item))) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1ListEnvironmentsResponse(data: any): GoogleCloudDataplexV1ListEnvironmentsResponse {
  return {
    ...data,
    environments: data["environments"] !== undefined ? data["environments"].map((item: any) => (deserializeGoogleCloudDataplexV1Environment(item))) : undefined,
  };
}

/**
 * List jobs response.
 */
export interface GoogleCloudDataplexV1ListJobsResponse {
  /**
   * Jobs under a given task.
   */
  jobs?: GoogleCloudDataplexV1Job[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * List lakes response.
 */
export interface GoogleCloudDataplexV1ListLakesResponse {
  /**
   * Lakes under the given parent location.
   */
  lakes?: GoogleCloudDataplexV1Lake[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Locations that could not be reached.
   */
  unreachableLocations?: string[];
}

/**
 * List metadata partitions response.
 */
export interface GoogleCloudDataplexV1ListPartitionsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no
   * remaining results in the list.
   */
  nextPageToken?: string;
  /**
   * Partitions under the specified parent entity.
   */
  partitions?: GoogleCloudDataplexV1Partition[];
}

/**
 * List sessions response.
 */
export interface GoogleCloudDataplexV1ListSessionsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Sessions under a given environment.
   */
  sessions?: GoogleCloudDataplexV1Session[];
}

/**
 * List tasks response.
 */
export interface GoogleCloudDataplexV1ListTasksResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Tasks under the given parent lake.
   */
  tasks?: GoogleCloudDataplexV1Task[];
  /**
   * Locations that could not be reached.
   */
  unreachableLocations?: string[];
}

function serializeGoogleCloudDataplexV1ListTasksResponse(data: any): GoogleCloudDataplexV1ListTasksResponse {
  return {
    ...data,
    tasks: data["tasks"] !== undefined ? data["tasks"].map((item: any) => (serializeGoogleCloudDataplexV1Task(item))) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1ListTasksResponse(data: any): GoogleCloudDataplexV1ListTasksResponse {
  return {
    ...data,
    tasks: data["tasks"] !== undefined ? data["tasks"].map((item: any) => (deserializeGoogleCloudDataplexV1Task(item))) : undefined,
  };
}

/**
 * List zones response.
 */
export interface GoogleCloudDataplexV1ListZonesResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * Zones under the given parent lake.
   */
  zones?: GoogleCloudDataplexV1Zone[];
}

/**
 * Represents the metadata of a long-running operation.
 */
export interface GoogleCloudDataplexV1OperationMetadata {
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
 * Represents partition metadata contained within entity instances.
 */
export interface GoogleCloudDataplexV1Partition {
  /**
   * Optional. The etag for this partition.
   */
  etag?: string;
  /**
   * Required. Immutable. The location of the entity data within the partition,
   * for example, gs://bucket/path/to/entity/key1=value1/key2=value2. Or
   * projects//datasets//tables/
   */
  location?: string;
  /**
   * Output only. Partition values used in the HTTP URL must be double encoded.
   * For example, url_encode(url_encode(value)) can be used to encode
   * "US:CA/CA#Sunnyvale so that the request URL ends with
   * "/partitions/US%253ACA/CA%2523Sunnyvale". The name field in the response
   * retains the encoded format.
   */
  readonly name?: string;
  /**
   * Required. Immutable. The set of values representing the partition, which
   * correspond to the partition schema defined in the parent entity.
   */
  values?: string[];
}

/**
 * ResourceAccessSpec holds the access control configuration to be enforced on
 * the resources, for example, Cloud Storage bucket, BigQuery dataset, BigQuery
 * table.
 */
export interface GoogleCloudDataplexV1ResourceAccessSpec {
  /**
   * Optional. The set of principals to be granted owner role on the resource.
   */
  owners?: string[];
  /**
   * Optional. The format of strings follows the pattern followed by IAM in the
   * bindings. user:{email}, serviceAccount:{email} group:{email}. The set of
   * principals to be granted reader role on the resource.
   */
  readers?: string[];
  /**
   * Optional. The set of principals to be granted writer role on the resource.
   */
  writers?: string[];
}

/**
 * Run DataScan Request
 */
export interface GoogleCloudDataplexV1RunDataScanRequest {
}

/**
 * Run DataScan Response.
 */
export interface GoogleCloudDataplexV1RunDataScanResponse {
  /**
   * DataScanJob created by RunDataScan request.
   */
  job?: GoogleCloudDataplexV1DataScanJob;
}

export interface GoogleCloudDataplexV1RunTaskRequest {
}

export interface GoogleCloudDataplexV1RunTaskResponse {
  /**
   * Jobs created by RunTask API.
   */
  job?: GoogleCloudDataplexV1Job;
}

/**
 * The data scanned during processing (e.g. in incremental DataScan)
 */
export interface GoogleCloudDataplexV1ScannedData {
  /**
   * The range denoted by values of an incremental field
   */
  incrementalField?: GoogleCloudDataplexV1ScannedDataIncrementalField;
}

/**
 * A data range denoted by a pair of start/end values of a field.
 */
export interface GoogleCloudDataplexV1ScannedDataIncrementalField {
  /**
   * Value that marks the end of the range.
   */
  end?: string;
  /**
   * The field that contains values which monotonically increases over time
   * (e.g. a timestamp column).
   */
  field?: string;
  /**
   * Value that marks the start of the range.
   */
  start?: string;
}

/**
 * Schema information describing the structure and layout of the data.
 */
export interface GoogleCloudDataplexV1Schema {
  /**
   * Optional. The sequence of fields describing data in table entities. Note:
   * BigQuery SchemaFields are immutable.
   */
  fields?: GoogleCloudDataplexV1SchemaSchemaField[];
  /**
   * Optional. The sequence of fields describing the partition structure in
   * entities. If this field is empty, there are no partitions within the data.
   */
  partitionFields?: GoogleCloudDataplexV1SchemaPartitionField[];
  /**
   * Optional. The structure of paths containing partition data within the
   * entity.
   */
  partitionStyle?:  | "PARTITION_STYLE_UNSPECIFIED" | "HIVE_COMPATIBLE";
  /**
   * Required. Set to true if user-managed or false if managed by Dataplex. The
   * default is false (managed by Dataplex). Set to falseto enable Dataplex
   * discovery to update the schema. including new data discovery, schema
   * inference, and schema evolution. Users retain the ability to input and edit
   * the schema. Dataplex treats schema input by the user as though produced by
   * a previous Dataplex discovery operation, and it will evolve the schema and
   * take action based on that treatment. Set to true to fully manage the entity
   * schema. This setting guarantees that Dataplex will not change schema
   * fields.
   */
  userManaged?: boolean;
}

/**
 * Represents a key field within the entity's partition structure. You could
 * have up to 20 partition fields, but only the first 10 partitions have the
 * filtering ability due to performance consideration. Note: Partition fields
 * are immutable.
 */
export interface GoogleCloudDataplexV1SchemaPartitionField {
  /**
   * Required. Partition field name must consist of letters, numbers, and
   * underscores only, with a maximum of length of 256 characters, and must
   * begin with a letter or underscore..
   */
  name?: string;
  /**
   * Required. Immutable. The type of field.
   */
  type?:  | "TYPE_UNSPECIFIED" | "BOOLEAN" | "BYTE" | "INT16" | "INT32" | "INT64" | "FLOAT" | "DOUBLE" | "DECIMAL" | "STRING" | "BINARY" | "TIMESTAMP" | "DATE" | "TIME" | "RECORD" | "NULL";
}

/**
 * Represents a column field within a table schema.
 */
export interface GoogleCloudDataplexV1SchemaSchemaField {
  /**
   * Optional. User friendly field description. Must be less than or equal to
   * 1024 characters.
   */
  description?: string;
  /**
   * Optional. Any nested field for complex types.
   */
  fields?: GoogleCloudDataplexV1SchemaSchemaField[];
  /**
   * Required. Additional field semantics.
   */
  mode?:  | "MODE_UNSPECIFIED" | "REQUIRED" | "NULLABLE" | "REPEATED";
  /**
   * Required. The name of the field. Must contain only letters, numbers and
   * underscores, with a maximum length of 767 characters, and must begin with a
   * letter or underscore.
   */
  name?: string;
  /**
   * Required. The type of field.
   */
  type?:  | "TYPE_UNSPECIFIED" | "BOOLEAN" | "BYTE" | "INT16" | "INT32" | "INT64" | "FLOAT" | "DOUBLE" | "DECIMAL" | "STRING" | "BINARY" | "TIMESTAMP" | "DATE" | "TIME" | "RECORD" | "NULL";
}

/**
 * Represents an active analyze session running for a user.
 */
export interface GoogleCloudDataplexV1Session {
  /**
   * Output only. Session start time.
   */
  readonly createTime?: Date;
  /**
   * Output only. The relative resource name of the content, of the form:
   * projects/{project_id}/locations/{location_id}/lakes/{lake_id}/environment/{environment_id}/sessions/{session_id}
   */
  readonly name?: string;
  /**
   * Output only. State of Session
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED";
  /**
   * Output only. Email of user running the session.
   */
  readonly userId?: string;
}

/**
 * These messages contain information about sessions within an environment. The
 * monitored resource is 'Environment'.
 */
export interface GoogleCloudDataplexV1SessionEvent {
  /**
   * The status of the event.
   */
  eventSucceeded?: boolean;
  /**
   * If the session is associated with an environment with fast startup
   * enabled, and was created before being assigned to a user.
   */
  fastStartupEnabled?: boolean;
  /**
   * The log message.
   */
  message?: string;
  /**
   * The execution details of the query.
   */
  query?: GoogleCloudDataplexV1SessionEventQueryDetail;
  /**
   * Unique identifier for the session.
   */
  sessionId?: string;
  /**
   * The type of the event.
   */
  type?:  | "EVENT_TYPE_UNSPECIFIED" | "START" | "STOP" | "QUERY" | "CREATE";
  /**
   * The idle duration of a warm pooled session before it is assigned to user.
   */
  unassignedDuration?: number /* Duration */;
  /**
   * The information about the user that created the session. It will be the
   * email address of the user.
   */
  userId?: string;
}

function serializeGoogleCloudDataplexV1SessionEvent(data: any): GoogleCloudDataplexV1SessionEvent {
  return {
    ...data,
    query: data["query"] !== undefined ? serializeGoogleCloudDataplexV1SessionEventQueryDetail(data["query"]) : undefined,
    unassignedDuration: data["unassignedDuration"] !== undefined ? data["unassignedDuration"] : undefined,
  };
}

function deserializeGoogleCloudDataplexV1SessionEvent(data: any): GoogleCloudDataplexV1SessionEvent {
  return {
    ...data,
    query: data["query"] !== undefined ? deserializeGoogleCloudDataplexV1SessionEventQueryDetail(data["query"]) : undefined,
    unassignedDuration: data["unassignedDuration"] !== undefined ? data["unassignedDuration"] : undefined,
  };
}

/**
 * Execution details of the query.
 */
export interface GoogleCloudDataplexV1SessionEventQueryDetail {
  /**
   * The data processed by the query.
   */
  dataProcessedBytes?: bigint;
  /**
   * Time taken for execution of the query.
   */
  duration?: number /* Duration */;
  /**
   * Query Execution engine.
   */
  engine?:  | "ENGINE_UNSPECIFIED" | "SPARK_SQL" | "BIGQUERY";
  /**
   * The unique Query id identifying the query.
   */
  queryId?: string;
  /**
   * The query text executed.
   */
  queryText?: string;
  /**
   * The size of results the query produced.
   */
  resultSizeBytes?: bigint;
}

function serializeGoogleCloudDataplexV1SessionEventQueryDetail(data: any): GoogleCloudDataplexV1SessionEventQueryDetail {
  return {
    ...data,
    dataProcessedBytes: data["dataProcessedBytes"] !== undefined ? String(data["dataProcessedBytes"]) : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    resultSizeBytes: data["resultSizeBytes"] !== undefined ? String(data["resultSizeBytes"]) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1SessionEventQueryDetail(data: any): GoogleCloudDataplexV1SessionEventQueryDetail {
  return {
    ...data,
    dataProcessedBytes: data["dataProcessedBytes"] !== undefined ? BigInt(data["dataProcessedBytes"]) : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    resultSizeBytes: data["resultSizeBytes"] !== undefined ? BigInt(data["resultSizeBytes"]) : undefined,
  };
}

/**
 * Describes the access mechanism of the data within its storage location.
 */
export interface GoogleCloudDataplexV1StorageAccess {
  /**
   * Output only. Describes the read access mechanism of the data. Not user
   * settable.
   */
  readonly read?:  | "ACCESS_MODE_UNSPECIFIED" | "DIRECT" | "MANAGED";
}

/**
 * Describes the format of the data within its storage location.
 */
export interface GoogleCloudDataplexV1StorageFormat {
  /**
   * Optional. The compression type associated with the stored data. If
   * unspecified, the data is uncompressed.
   */
  compressionFormat?:  | "COMPRESSION_FORMAT_UNSPECIFIED" | "GZIP" | "BZIP2";
  /**
   * Optional. Additional information about CSV formatted data.
   */
  csv?: GoogleCloudDataplexV1StorageFormatCsvOptions;
  /**
   * Output only. The data format associated with the stored data, which
   * represents content type values. The value is inferred from mime type.
   */
  readonly format?:  | "FORMAT_UNSPECIFIED" | "PARQUET" | "AVRO" | "ORC" | "CSV" | "JSON" | "IMAGE" | "AUDIO" | "VIDEO" | "TEXT" | "TFRECORD" | "OTHER" | "UNKNOWN";
  /**
   * Optional. Additional information about iceberg tables.
   */
  iceberg?: GoogleCloudDataplexV1StorageFormatIcebergOptions;
  /**
   * Optional. Additional information about CSV formatted data.
   */
  json?: GoogleCloudDataplexV1StorageFormatJsonOptions;
  /**
   * Required. The mime type descriptor for the data. Must match the pattern
   * {type}/{subtype}. Supported values: application/x-parquet
   * application/x-avro application/x-orc application/x-tfrecord
   * application/x-parquet+iceberg application/x-avro+iceberg
   * application/x-orc+iceberg application/json application/{subtypes} text/csv
   * text/ image/{image subtype} video/{video subtype} audio/{audio subtype}
   */
  mimeType?: string;
}

/**
 * Describes CSV and similar semi-structured data formats.
 */
export interface GoogleCloudDataplexV1StorageFormatCsvOptions {
  /**
   * Optional. The delimiter used to separate values. Defaults to ','.
   */
  delimiter?: string;
  /**
   * Optional. The character encoding of the data. Accepts "US-ASCII", "UTF-8",
   * and "ISO-8859-1". Defaults to UTF-8 if unspecified.
   */
  encoding?: string;
  /**
   * Optional. The number of rows to interpret as header rows that should be
   * skipped when reading data rows. Defaults to 0.
   */
  headerRows?: number;
  /**
   * Optional. The character used to quote column values. Accepts '"' (double
   * quotation mark) or ''' (single quotation mark). Defaults to '"' (double
   * quotation mark) if unspecified.
   */
  quote?: string;
}

/**
 * Describes Iceberg data format.
 */
export interface GoogleCloudDataplexV1StorageFormatIcebergOptions {
  /**
   * Optional. The location of where the iceberg metadata is present, must be
   * within the table path
   */
  metadataLocation?: string;
}

/**
 * Describes JSON data format.
 */
export interface GoogleCloudDataplexV1StorageFormatJsonOptions {
  /**
   * Optional. The character encoding of the data. Accepts "US-ASCII", "UTF-8"
   * and "ISO-8859-1". Defaults to UTF-8 if not specified.
   */
  encoding?: string;
}

/**
 * A task represents a user-visible job.
 */
export interface GoogleCloudDataplexV1Task {
  /**
   * Output only. The time when the task was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. Description of the task.
   */
  description?: string;
  /**
   * Optional. User friendly display name.
   */
  displayName?: string;
  /**
   * Required. Spec related to how a task is executed.
   */
  executionSpec?: GoogleCloudDataplexV1TaskExecutionSpec;
  /**
   * Output only. Status of the latest task executions.
   */
  readonly executionStatus?: GoogleCloudDataplexV1TaskExecutionStatus;
  /**
   * Optional. User-defined labels for the task.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The relative resource name of the task, of the form:
   * projects/{project_number}/locations/{location_id}/lakes/{lake_id}/
   * tasks/{task_id}.
   */
  readonly name?: string;
  /**
   * Config related to running scheduled Notebooks.
   */
  notebook?: GoogleCloudDataplexV1TaskNotebookTaskConfig;
  /**
   * Config related to running custom Spark tasks.
   */
  spark?: GoogleCloudDataplexV1TaskSparkTaskConfig;
  /**
   * Output only. Current state of the task.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED";
  /**
   * Required. Spec related to how often and when a task should be triggered.
   */
  triggerSpec?: GoogleCloudDataplexV1TaskTriggerSpec;
  /**
   * Output only. System generated globally unique ID for the task. This ID
   * will be different if the task is deleted and re-created with the same name.
   */
  readonly uid?: string;
  /**
   * Output only. The time when the task was last updated.
   */
  readonly updateTime?: Date;
}

function serializeGoogleCloudDataplexV1Task(data: any): GoogleCloudDataplexV1Task {
  return {
    ...data,
    executionSpec: data["executionSpec"] !== undefined ? serializeGoogleCloudDataplexV1TaskExecutionSpec(data["executionSpec"]) : undefined,
    triggerSpec: data["triggerSpec"] !== undefined ? serializeGoogleCloudDataplexV1TaskTriggerSpec(data["triggerSpec"]) : undefined,
  };
}

function deserializeGoogleCloudDataplexV1Task(data: any): GoogleCloudDataplexV1Task {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    executionSpec: data["executionSpec"] !== undefined ? deserializeGoogleCloudDataplexV1TaskExecutionSpec(data["executionSpec"]) : undefined,
    triggerSpec: data["triggerSpec"] !== undefined ? deserializeGoogleCloudDataplexV1TaskTriggerSpec(data["triggerSpec"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Execution related settings, like retry and service_account.
 */
export interface GoogleCloudDataplexV1TaskExecutionSpec {
  /**
   * Optional. The arguments to pass to the task. The args can use placeholders
   * of the format ${placeholder} as part of key/value string. These will be
   * interpolated before passing the args to the driver. Currently supported
   * placeholders: - ${task_id} - ${job_time} To pass positional args, set the
   * key as TASK_ARGS. The value should be a comma-separated string of all the
   * positional arguments. To use a delimiter other than comma, refer to
   * https://cloud.google.com/sdk/gcloud/reference/topic/escaping. In case of
   * other keys being present in the args, then TASK_ARGS will be passed as the
   * last argument.
   */
  args?: {
    [key: string]: string
  };
  /**
   * Optional. The Cloud KMS key to use for encryption, of the form:
   * projects/{project_number}/locations/{location_id}/keyRings/{key-ring-name}/cryptoKeys/{key-name}.
   */
  kmsKey?: string;
  /**
   * Optional. The maximum duration after which the job execution is expired.
   */
  maxJobExecutionLifetime?: number /* Duration */;
  /**
   * Optional. The project in which jobs are run. By default, the project
   * containing the Lake is used. If a project is provided, the
   * ExecutionSpec.service_account must belong to this project.
   */
  project?: string;
  /**
   * Required. Service account to use to execute a task. If not provided, the
   * default Compute service account for the project is used.
   */
  serviceAccount?: string;
}

function serializeGoogleCloudDataplexV1TaskExecutionSpec(data: any): GoogleCloudDataplexV1TaskExecutionSpec {
  return {
    ...data,
    maxJobExecutionLifetime: data["maxJobExecutionLifetime"] !== undefined ? data["maxJobExecutionLifetime"] : undefined,
  };
}

function deserializeGoogleCloudDataplexV1TaskExecutionSpec(data: any): GoogleCloudDataplexV1TaskExecutionSpec {
  return {
    ...data,
    maxJobExecutionLifetime: data["maxJobExecutionLifetime"] !== undefined ? data["maxJobExecutionLifetime"] : undefined,
  };
}

/**
 * Status of the task execution (e.g. Jobs).
 */
export interface GoogleCloudDataplexV1TaskExecutionStatus {
  /**
   * Output only. latest job execution
   */
  readonly latestJob?: GoogleCloudDataplexV1Job;
  /**
   * Output only. Last update time of the status.
   */
  readonly updateTime?: Date;
}

/**
 * Configuration for the underlying infrastructure used to run workloads.
 */
export interface GoogleCloudDataplexV1TaskInfrastructureSpec {
  /**
   * Compute resources needed for a Task when using Dataproc Serverless.
   */
  batch?: GoogleCloudDataplexV1TaskInfrastructureSpecBatchComputeResources;
  /**
   * Container Image Runtime Configuration.
   */
  containerImage?: GoogleCloudDataplexV1TaskInfrastructureSpecContainerImageRuntime;
  /**
   * Vpc network.
   */
  vpcNetwork?: GoogleCloudDataplexV1TaskInfrastructureSpecVpcNetwork;
}

/**
 * Batch compute resources associated with the task.
 */
export interface GoogleCloudDataplexV1TaskInfrastructureSpecBatchComputeResources {
  /**
   * Optional. Total number of job executors. Executor Count should be between
   * 2 and 100. Default=2
   */
  executorsCount?: number;
  /**
   * Optional. Max configurable executors. If max_executors_count >
   * executors_count, then auto-scaling is enabled. Max Executor Count should be
   * between 2 and 1000. Default=1000
   */
  maxExecutorsCount?: number;
}

/**
 * Container Image Runtime Configuration used with Batch execution.
 */
export interface GoogleCloudDataplexV1TaskInfrastructureSpecContainerImageRuntime {
  /**
   * Optional. Container image to use.
   */
  image?: string;
  /**
   * Optional. A list of Java JARS to add to the classpath. Valid input
   * includes Cloud Storage URIs to Jar binaries. For example,
   * gs://bucket-name/my/path/to/file.jar
   */
  javaJars?: string[];
  /**
   * Optional. Override to common configuration of open source components
   * installed on the Dataproc cluster. The properties to set on daemon config
   * files. Property keys are specified in prefix:property format, for example
   * core:hadoop.tmp.dir. For more information, see Cluster properties
   * (https://cloud.google.com/dataproc/docs/concepts/cluster-properties).
   */
  properties?: {
    [key: string]: string
  };
  /**
   * Optional. A list of python packages to be installed. Valid formats include
   * Cloud Storage URI to a PIP installable library. For example,
   * gs://bucket-name/my/path/to/lib.tar.gz
   */
  pythonPackages?: string[];
}

/**
 * Cloud VPC Network used to run the infrastructure.
 */
export interface GoogleCloudDataplexV1TaskInfrastructureSpecVpcNetwork {
  /**
   * Optional. The Cloud VPC network in which the job is run. By default, the
   * Cloud VPC network named Default within the project is used.
   */
  network?: string;
  /**
   * Optional. List of network tags to apply to the job.
   */
  networkTags?: string[];
  /**
   * Optional. The Cloud VPC sub-network in which the job is run.
   */
  subNetwork?: string;
}

/**
 * Config for running scheduled notebooks.
 */
export interface GoogleCloudDataplexV1TaskNotebookTaskConfig {
  /**
   * Optional. Cloud Storage URIs of archives to be extracted into the working
   * directory of each executor. Supported file types: .jar, .tar, .tar.gz,
   * .tgz, and .zip.
   */
  archiveUris?: string[];
  /**
   * Optional. Cloud Storage URIs of files to be placed in the working
   * directory of each executor.
   */
  fileUris?: string[];
  /**
   * Optional. Infrastructure specification for the execution.
   */
  infrastructureSpec?: GoogleCloudDataplexV1TaskInfrastructureSpec;
  /**
   * Required. Path to input notebook. This can be the Cloud Storage URI of the
   * notebook file or the path to a Notebook Content. The execution args are
   * accessible as environment variables (TASK_key=value).
   */
  notebook?: string;
}

/**
 * User-specified config for running a Spark task.
 */
export interface GoogleCloudDataplexV1TaskSparkTaskConfig {
  /**
   * Optional. Cloud Storage URIs of archives to be extracted into the working
   * directory of each executor. Supported file types: .jar, .tar, .tar.gz,
   * .tgz, and .zip.
   */
  archiveUris?: string[];
  /**
   * Optional. Cloud Storage URIs of files to be placed in the working
   * directory of each executor.
   */
  fileUris?: string[];
  /**
   * Optional. Infrastructure specification for the execution.
   */
  infrastructureSpec?: GoogleCloudDataplexV1TaskInfrastructureSpec;
  /**
   * The name of the driver's main class. The jar file that contains the class
   * must be in the default CLASSPATH or specified in jar_file_uris. The
   * execution args are passed in as a sequence of named process arguments
   * (--key=value).
   */
  mainClass?: string;
  /**
   * The Cloud Storage URI of the jar file that contains the main class. The
   * execution args are passed in as a sequence of named process arguments
   * (--key=value).
   */
  mainJarFileUri?: string;
  /**
   * The Gcloud Storage URI of the main Python file to use as the driver. Must
   * be a .py file. The execution args are passed in as a sequence of named
   * process arguments (--key=value).
   */
  pythonScriptFile?: string;
  /**
   * The query text. The execution args are used to declare a set of script
   * variables (set key="value";).
   */
  sqlScript?: string;
  /**
   * A reference to a query file. This can be the Cloud Storage URI of the
   * query file or it can the path to a SqlScript Content. The execution args
   * are used to declare a set of script variables (set key="value";).
   */
  sqlScriptFile?: string;
}

/**
 * Task scheduling and trigger settings.
 */
export interface GoogleCloudDataplexV1TaskTriggerSpec {
  /**
   * Optional. Prevent the task from executing. This does not cancel already
   * running tasks. It is intended to temporarily disable RECURRING tasks.
   */
  disabled?: boolean;
  /**
   * Optional. Number of retry attempts before aborting. Set to zero to never
   * attempt to retry a failed task.
   */
  maxRetries?: number;
  /**
   * Optional. Cron schedule (https://en.wikipedia.org/wiki/Cron) for running
   * tasks periodically. To explicitly set a timezone to the cron tab, apply a
   * prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or
   * "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string
   * from IANA time zone database. For example, CRON_TZ=America/New_York 1 * * *
   * *, or TZ=America/New_York 1 * * * *. This field is required for RECURRING
   * tasks.
   */
  schedule?: string;
  /**
   * Optional. The first run of the task will be after this time. If not
   * specified, the task will run shortly after being submitted if ON_DEMAND and
   * based on the schedule if RECURRING.
   */
  startTime?: Date;
  /**
   * Required. Immutable. Trigger type of the user-specified Task.
   */
  type?:  | "TYPE_UNSPECIFIED" | "ON_DEMAND" | "RECURRING";
}

function serializeGoogleCloudDataplexV1TaskTriggerSpec(data: any): GoogleCloudDataplexV1TaskTriggerSpec {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDataplexV1TaskTriggerSpec(data: any): GoogleCloudDataplexV1TaskTriggerSpec {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * DataScan scheduling and trigger settings.
 */
export interface GoogleCloudDataplexV1Trigger {
  /**
   * The scan runs once via RunDataScan API.
   */
  onDemand?: GoogleCloudDataplexV1TriggerOnDemand;
  /**
   * The scan is scheduled to run periodically.
   */
  schedule?: GoogleCloudDataplexV1TriggerSchedule;
}

/**
 * The scan runs once via RunDataScan API.
 */
export interface GoogleCloudDataplexV1TriggerOnDemand {
}

/**
 * The scan is scheduled to run periodically.
 */
export interface GoogleCloudDataplexV1TriggerSchedule {
  /**
   * Required. Cron (https://en.wikipedia.org/wiki/Cron) schedule for running
   * scans periodically.To explicitly set a timezone in the cron tab, apply a
   * prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or
   * "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string
   * from IANA time zone database (wikipedia
   * (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)). For
   * example, CRON_TZ=America/New_York 1 * * * *, or TZ=America/New_York 1 * * *
   * *.This field is required for Schedule scans.
   */
  cron?: string;
}

/**
 * A zone represents a logical group of related assets within a lake. A zone
 * can be used to map to organizational structure or represent stages of data
 * readiness from raw to curated. It provides managing behavior that is shared
 * or inherited by all contained assets.
 */
export interface GoogleCloudDataplexV1Zone {
  /**
   * Output only. Aggregated status of the underlying assets of the zone.
   */
  readonly assetStatus?: GoogleCloudDataplexV1AssetStatus;
  /**
   * Output only. The time when the zone was created.
   */
  readonly createTime?: Date;
  /**
   * Optional. Description of the zone.
   */
  description?: string;
  /**
   * Optional. Specification of the discovery feature applied to data in this
   * zone.
   */
  discoverySpec?: GoogleCloudDataplexV1ZoneDiscoverySpec;
  /**
   * Optional. User friendly display name.
   */
  displayName?: string;
  /**
   * Optional. User defined labels for the zone.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The relative resource name of the zone, of the form:
   * projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}.
   */
  readonly name?: string;
  /**
   * Required. Specification of the resources that are referenced by the assets
   * within this zone.
   */
  resourceSpec?: GoogleCloudDataplexV1ZoneResourceSpec;
  /**
   * Output only. Current state of the zone.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED";
  /**
   * Required. Immutable. The type of the zone.
   */
  type?:  | "TYPE_UNSPECIFIED" | "RAW" | "CURATED";
  /**
   * Output only. System generated globally unique ID for the zone. This ID
   * will be different if the zone is deleted and re-created with the same name.
   */
  readonly uid?: string;
  /**
   * Output only. The time when the zone was last updated.
   */
  readonly updateTime?: Date;
}

/**
 * Settings to manage the metadata discovery and publishing in a zone.
 */
export interface GoogleCloudDataplexV1ZoneDiscoverySpec {
  /**
   * Optional. Configuration for CSV data.
   */
  csvOptions?: GoogleCloudDataplexV1ZoneDiscoverySpecCsvOptions;
  /**
   * Required. Whether discovery is enabled.
   */
  enabled?: boolean;
  /**
   * Optional. The list of patterns to apply for selecting data to exclude
   * during discovery. For Cloud Storage bucket assets, these are interpreted as
   * glob patterns used to match object names. For BigQuery dataset assets,
   * these are interpreted as patterns to match table names.
   */
  excludePatterns?: string[];
  /**
   * Optional. The list of patterns to apply for selecting data to include
   * during discovery if only a subset of the data should considered. For Cloud
   * Storage bucket assets, these are interpreted as glob patterns used to match
   * object names. For BigQuery dataset assets, these are interpreted as
   * patterns to match table names.
   */
  includePatterns?: string[];
  /**
   * Optional. Configuration for Json data.
   */
  jsonOptions?: GoogleCloudDataplexV1ZoneDiscoverySpecJsonOptions;
  /**
   * Optional. Cron schedule (https://en.wikipedia.org/wiki/Cron) for running
   * discovery periodically. Successive discovery runs must be scheduled at
   * least 60 minutes apart. The default value is to run discovery every 60
   * minutes. To explicitly set a timezone to the cron tab, apply a prefix in
   * the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or TZ=${IANA_TIME_ZONE}". The
   * ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database.
   * For example, CRON_TZ=America/New_York 1 * * * *, or TZ=America/New_York 1 *
   * * * *.
   */
  schedule?: string;
}

/**
 * Describe CSV and similar semi-structured data formats.
 */
export interface GoogleCloudDataplexV1ZoneDiscoverySpecCsvOptions {
  /**
   * Optional. The delimiter being used to separate values. This defaults to
   * ','.
   */
  delimiter?: string;
  /**
   * Optional. Whether to disable the inference of data type for CSV data. If
   * true, all columns will be registered as strings.
   */
  disableTypeInference?: boolean;
  /**
   * Optional. The character encoding of the data. The default is UTF-8.
   */
  encoding?: string;
  /**
   * Optional. The number of rows to interpret as header rows that should be
   * skipped when reading data rows.
   */
  headerRows?: number;
}

/**
 * Describe JSON data format.
 */
export interface GoogleCloudDataplexV1ZoneDiscoverySpecJsonOptions {
  /**
   * Optional. Whether to disable the inference of data type for Json data. If
   * true, all columns will be registered as their primitive types (strings,
   * number or boolean).
   */
  disableTypeInference?: boolean;
  /**
   * Optional. The character encoding of the data. The default is UTF-8.
   */
  encoding?: string;
}

/**
 * Settings for resources attached as assets within a zone.
 */
export interface GoogleCloudDataplexV1ZoneResourceSpec {
  /**
   * Required. Immutable. The location type of the resources that are allowed
   * to be attached to the assets within this zone.
   */
  locationType?:  | "LOCATION_TYPE_UNSPECIFIED" | "SINGLE_REGION" | "MULTI_REGION";
}

/**
 * The response message for Locations.ListLocations.
 */
export interface GoogleCloudLocationListLocationsResponse {
  /**
   * A list of locations that matches the specified filter in the request.
   */
  locations?: GoogleCloudLocationLocation[];
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
}

/**
 * A resource that represents Google Cloud Platform location.
 */
export interface GoogleCloudLocationLocation {
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
export interface GoogleIamV1AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: GoogleIamV1AuditLogConfig[];
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
 * Associates members, or principals, with a role.
 */
export interface GoogleIamV1Binding {
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
  condition?: GoogleTypeExpr;
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
export interface GoogleIamV1Policy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: GoogleIamV1AuditConfig[];
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
  bindings?: GoogleIamV1Binding[];
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
 * Request message for SetIamPolicy method.
 */
export interface GoogleIamV1SetIamPolicyRequest {
  /**
   * REQUIRED: The complete policy to be applied to the resource. The size of
   * the policy is limited to a few 10s of KB. An empty policy is a valid policy
   * but certain Google Cloud services (such as Projects) might reject them.
   */
  policy?: GoogleIamV1Policy;
  /**
   * OPTIONAL: A FieldMask specifying which fields of the policy to modify.
   * Only the fields in the mask will be modified. If no mask is provided, the
   * following default mask is used:paths: "bindings, etag"
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
 * Request message for TestIamPermissions method.
 */
export interface GoogleIamV1TestIamPermissionsRequest {
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
export interface GoogleIamV1TestIamPermissionsResponse {
  /**
   * A subset of TestPermissionsRequest.permissions that the caller is allowed.
   */
  permissions?: string[];
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface GoogleLongrunningCancelOperationRequest {
}

/**
 * The response message for Operations.ListOperations.
 */
export interface GoogleLongrunningListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: GoogleLongrunningOperation[];
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface GoogleLongrunningOperation {
  /**
   * If the value is false, it means the operation is still in progress. If
   * true, the operation is completed, and either error or response is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: GoogleRpcStatus;
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
 * The Status type defines a logical error model that is suitable for different
 * programming environments, including REST APIs and RPC APIs. It is used by
 * gRPC (https://github.com/grpc). Each Status message contains three pieces of
 * data: error code, error message, and error details.You can find out more
 * about this error model and how to work with it in the API Design Guide
 * (https://cloud.google.com/apis/design/errors).
 */
export interface GoogleRpcStatus {
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
export interface GoogleTypeExpr {
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
 * Additional options for
 * Dataplex#projectsLocationsDataAttributeBindingsCreate.
 */
export interface ProjectsLocationsDataAttributeBindingsCreateOptions {
  /**
   * Required. DataAttributeBinding identifier. * Must contain only lowercase
   * letters, numbers and hyphens. * Must start with a letter. * Must be between
   * 1-63 characters. * Must end with a number or a letter. * Must be unique
   * within the Location.
   */
  dataAttributeBindingId?: string;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * Dataplex#projectsLocationsDataAttributeBindingsDelete.
 */
export interface ProjectsLocationsDataAttributeBindingsDeleteOptions {
  /**
   * Required. If the client provided etag value does not match the current
   * etag value, the DeleteDataAttributeBindingRequest method returns an ABORTED
   * error response. Etags must be used when calling the
   * DeleteDataAttributeBinding.
   */
  etag?: string;
}

/**
 * Additional options for
 * Dataplex#projectsLocationsDataAttributeBindingsGetIamPolicy.
 */
export interface ProjectsLocationsDataAttributeBindingsGetIamPolicyOptions {
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
 * Additional options for Dataplex#projectsLocationsDataAttributeBindingsList.
 */
export interface ProjectsLocationsDataAttributeBindingsListOptions {
  /**
   * Optional. Filter request. Filter using resource:
   * filter=resource:"resource-name" Filter using attribute:
   * filter=attributes:"attribute-name" Filter using attribute in paths list:
   * filter=paths.attributes:"attribute-name"
   */
  filter?: string;
  /**
   * Optional. Order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. Maximum number of DataAttributeBindings to return. The service
   * may return fewer than this value. If unspecified, at most 10
   * DataAttributeBindings will be returned. The maximum value is 1000; values
   * above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListDataAttributeBindings
   * call. Provide this to retrieve the subsequent page. When paginating, all
   * other parameters provided to ListDataAttributeBindings must match the call
   * that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsDataAttributeBindingsPatch.
 */
export interface ProjectsLocationsDataAttributeBindingsPatchOptions {
  /**
   * Required. Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsDataAttributeBindingsPatchOptions(data: any): ProjectsLocationsDataAttributeBindingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDataAttributeBindingsPatchOptions(data: any): ProjectsLocationsDataAttributeBindingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dataplex#projectsLocationsDataScansCreate.
 */
export interface ProjectsLocationsDataScansCreateOptions {
  /**
   * Required. DataScan identifier. Must contain only lowercase letters,
   * numbers and hyphens. Must start with a letter. Must end with a number or a
   * letter. Must be between 1-63 characters. Must be unique within the customer
   * project / location.
   */
  dataScanId?: string;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Dataplex#projectsLocationsDataScansGetIamPolicy.
 */
export interface ProjectsLocationsDataScansGetIamPolicyOptions {
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
 * Additional options for Dataplex#projectsLocationsDataScansGet.
 */
export interface ProjectsLocationsDataScansGetOptions {
  /**
   * Optional. Select the DataScan view to return. Defaults to BASIC.
   */
  view?:  | "DATA_SCAN_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for Dataplex#projectsLocationsDataScansJobsGet.
 */
export interface ProjectsLocationsDataScansJobsGetOptions {
  /**
   * Optional. Select the DataScanJob view to return. Defaults to BASIC.
   */
  view?:  | "DATA_SCAN_JOB_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for Dataplex#projectsLocationsDataScansJobsList.
 */
export interface ProjectsLocationsDataScansJobsListOptions {
  /**
   * Optional. Maximum number of DataScanJobs to return. The service may return
   * fewer than this value. If unspecified, at most 10 DataScanJobs will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListDataScanJobs call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to ListDataScanJobs must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsDataScansList.
 */
export interface ProjectsLocationsDataScansListOptions {
  /**
   * Optional. Filter request.
   */
  filter?: string;
  /**
   * Optional. Order by fields (name or create_time) for the result. If not
   * specified, the ordering is undefined.
   */
  orderBy?: string;
  /**
   * Optional. Maximum number of dataScans to return. The service may return
   * fewer than this value. If unspecified, at most 10 scans will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListDataScans call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to ListDataScans must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsDataScansPatch.
 */
export interface ProjectsLocationsDataScansPatchOptions {
  /**
   * Required. Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsDataScansPatchOptions(data: any): ProjectsLocationsDataScansPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDataScansPatchOptions(data: any): ProjectsLocationsDataScansPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Dataplex#projectsLocationsDataTaxonomiesAttributesCreate.
 */
export interface ProjectsLocationsDataTaxonomiesAttributesCreateOptions {
  /**
   * Required. DataAttribute identifier. * Must contain only lowercase letters,
   * numbers and hyphens. * Must start with a letter. * Must be between 1-63
   * characters. * Must end with a number or a letter. * Must be unique within
   * the DataTaxonomy.
   */
  dataAttributeId?: string;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * Dataplex#projectsLocationsDataTaxonomiesAttributesDelete.
 */
export interface ProjectsLocationsDataTaxonomiesAttributesDeleteOptions {
  /**
   * Optional. If the client provided etag value does not match the current
   * etag value, the DeleteDataAttribute method returns an ABORTED error
   * response.
   */
  etag?: string;
}

/**
 * Additional options for
 * Dataplex#projectsLocationsDataTaxonomiesAttributesGetIamPolicy.
 */
export interface ProjectsLocationsDataTaxonomiesAttributesGetIamPolicyOptions {
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
 * Additional options for
 * Dataplex#projectsLocationsDataTaxonomiesAttributesList.
 */
export interface ProjectsLocationsDataTaxonomiesAttributesListOptions {
  /**
   * Optional. Filter request.
   */
  filter?: string;
  /**
   * Optional. Order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. Maximum number of DataAttributes to return. The service may
   * return fewer than this value. If unspecified, at most 10 dataAttributes
   * will be returned. The maximum value is 1000; values above 1000 will be
   * coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListDataAttributes call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to ListDataAttributes must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dataplex#projectsLocationsDataTaxonomiesAttributesPatch.
 */
export interface ProjectsLocationsDataTaxonomiesAttributesPatchOptions {
  /**
   * Required. Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsDataTaxonomiesAttributesPatchOptions(data: any): ProjectsLocationsDataTaxonomiesAttributesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDataTaxonomiesAttributesPatchOptions(data: any): ProjectsLocationsDataTaxonomiesAttributesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dataplex#projectsLocationsDataTaxonomiesCreate.
 */
export interface ProjectsLocationsDataTaxonomiesCreateOptions {
  /**
   * Required. DataTaxonomy identifier. * Must contain only lowercase letters,
   * numbers and hyphens. * Must start with a letter. * Must be between 1-63
   * characters. * Must end with a number or a letter. * Must be unique within
   * the Project.
   */
  dataTaxonomyId?: string;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Dataplex#projectsLocationsDataTaxonomiesDelete.
 */
export interface ProjectsLocationsDataTaxonomiesDeleteOptions {
  /**
   * Optional. If the client provided etag value does not match the current
   * etag value,the DeleteDataTaxonomy method returns an ABORTED error.
   */
  etag?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsDataTaxonomiesGetIamPolicy.
 */
export interface ProjectsLocationsDataTaxonomiesGetIamPolicyOptions {
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
 * Additional options for Dataplex#projectsLocationsDataTaxonomiesList.
 */
export interface ProjectsLocationsDataTaxonomiesListOptions {
  /**
   * Optional. Filter request.
   */
  filter?: string;
  /**
   * Optional. Order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. Maximum number of DataTaxonomies to return. The service may
   * return fewer than this value. If unspecified, at most 10 DataTaxonomies
   * will be returned. The maximum value is 1000; values above 1000 will be
   * coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListDataTaxonomies call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to ListDataTaxonomies must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsDataTaxonomiesPatch.
 */
export interface ProjectsLocationsDataTaxonomiesPatchOptions {
  /**
   * Required. Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsDataTaxonomiesPatchOptions(data: any): ProjectsLocationsDataTaxonomiesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsDataTaxonomiesPatchOptions(data: any): ProjectsLocationsDataTaxonomiesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dataplex#projectsLocationsLakesActionsList.
 */
export interface ProjectsLocationsLakesActionsListOptions {
  /**
   * Optional. Maximum number of actions to return. The service may return
   * fewer than this value. If unspecified, at most 10 actions will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListLakeActions call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to ListLakeActions must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesContentCreate.
 */
export interface ProjectsLocationsLakesContentCreateOptions {
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesContentGetIamPolicy.
 */
export interface ProjectsLocationsLakesContentGetIamPolicyOptions {
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
 * Additional options for Dataplex#projectsLocationsLakesContentGet.
 */
export interface ProjectsLocationsLakesContentGetOptions {
  /**
   * Optional. Specify content view to make a partial request.
   */
  view?:  | "CONTENT_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for Dataplex#projectsLocationsLakesContentitemsCreate.
 */
export interface ProjectsLocationsLakesContentitemsCreateOptions {
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * Dataplex#projectsLocationsLakesContentitemsGetIamPolicy.
 */
export interface ProjectsLocationsLakesContentitemsGetIamPolicyOptions {
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
 * Additional options for Dataplex#projectsLocationsLakesContentitemsGet.
 */
export interface ProjectsLocationsLakesContentitemsGetOptions {
  /**
   * Optional. Specify content view to make a partial request.
   */
  view?:  | "CONTENT_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for Dataplex#projectsLocationsLakesContentitemsList.
 */
export interface ProjectsLocationsLakesContentitemsListOptions {
  /**
   * Optional. Filter request. Filters are case-sensitive. The following
   * formats are supported:labels.key1 = "value1" labels:key1 type = "NOTEBOOK"
   * type = "SQL_SCRIPT"These restrictions can be coinjoined with AND, OR and
   * NOT conjunctions.
   */
  filter?: string;
  /**
   * Optional. Maximum number of content to return. The service may return
   * fewer than this value. If unspecified, at most 10 content will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListContent call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to ListContent must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesContentitemsPatch.
 */
export interface ProjectsLocationsLakesContentitemsPatchOptions {
  /**
   * Required. Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsLakesContentitemsPatchOptions(data: any): ProjectsLocationsLakesContentitemsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsLakesContentitemsPatchOptions(data: any): ProjectsLocationsLakesContentitemsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dataplex#projectsLocationsLakesContentList.
 */
export interface ProjectsLocationsLakesContentListOptions {
  /**
   * Optional. Filter request. Filters are case-sensitive. The following
   * formats are supported:labels.key1 = "value1" labels:key1 type = "NOTEBOOK"
   * type = "SQL_SCRIPT"These restrictions can be coinjoined with AND, OR and
   * NOT conjunctions.
   */
  filter?: string;
  /**
   * Optional. Maximum number of content to return. The service may return
   * fewer than this value. If unspecified, at most 10 content will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListContent call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to ListContent must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesContentPatch.
 */
export interface ProjectsLocationsLakesContentPatchOptions {
  /**
   * Required. Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsLakesContentPatchOptions(data: any): ProjectsLocationsLakesContentPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsLakesContentPatchOptions(data: any): ProjectsLocationsLakesContentPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dataplex#projectsLocationsLakesCreate.
 */
export interface ProjectsLocationsLakesCreateOptions {
  /**
   * Required. Lake identifier. This ID will be used to generate names such as
   * database and dataset names when publishing metadata to Hive Metastore and
   * BigQuery. * Must contain only lowercase letters, numbers and hyphens. *
   * Must start with a letter. * Must end with a number or a letter. * Must be
   * between 1-63 characters. * Must be unique within the customer project /
   * location.
   */
  lakeId?: string;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesEnvironmentsCreate.
 */
export interface ProjectsLocationsLakesEnvironmentsCreateOptions {
  /**
   * Required. Environment identifier. * Must contain only lowercase letters,
   * numbers and hyphens. * Must start with a letter. * Must be between 1-63
   * characters. * Must end with a number or a letter. * Must be unique within
   * the lake.
   */
  environmentId?: string;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * Dataplex#projectsLocationsLakesEnvironmentsGetIamPolicy.
 */
export interface ProjectsLocationsLakesEnvironmentsGetIamPolicyOptions {
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
 * Additional options for Dataplex#projectsLocationsLakesEnvironmentsList.
 */
export interface ProjectsLocationsLakesEnvironmentsListOptions {
  /**
   * Optional. Filter request.
   */
  filter?: string;
  /**
   * Optional. Order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. Maximum number of environments to return. The service may return
   * fewer than this value. If unspecified, at most 10 environments will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListEnvironments call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to ListEnvironments must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesEnvironmentsPatch.
 */
export interface ProjectsLocationsLakesEnvironmentsPatchOptions {
  /**
   * Required. Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsLakesEnvironmentsPatchOptions(data: any): ProjectsLocationsLakesEnvironmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsLakesEnvironmentsPatchOptions(data: any): ProjectsLocationsLakesEnvironmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Dataplex#projectsLocationsLakesEnvironmentsSessionsList.
 */
export interface ProjectsLocationsLakesEnvironmentsSessionsListOptions {
  /**
   * Optional. Filter request. The following mode filter is supported to return
   * only the sessions belonging to the requester when the mode is USER and
   * return sessions of all the users when the mode is ADMIN. When no filter is
   * sent default to USER mode. NOTE: When the mode is ADMIN, the requester
   * should have dataplex.environments.listAllSessions permission to list all
   * sessions, in absence of the permission, the request fails.mode = ADMIN |
   * USER
   */
  filter?: string;
  /**
   * Optional. Maximum number of sessions to return. The service may return
   * fewer than this value. If unspecified, at most 10 sessions will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListSessions call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to ListSessions must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesGetIamPolicy.
 */
export interface ProjectsLocationsLakesGetIamPolicyOptions {
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
 * Additional options for Dataplex#projectsLocationsLakesList.
 */
export interface ProjectsLocationsLakesListOptions {
  /**
   * Optional. Filter request.
   */
  filter?: string;
  /**
   * Optional. Order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. Maximum number of Lakes to return. The service may return fewer
   * than this value. If unspecified, at most 10 lakes will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListLakes call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to ListLakes must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesPatch.
 */
export interface ProjectsLocationsLakesPatchOptions {
  /**
   * Required. Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsLakesPatchOptions(data: any): ProjectsLocationsLakesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsLakesPatchOptions(data: any): ProjectsLocationsLakesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dataplex#projectsLocationsLakesTasksCreate.
 */
export interface ProjectsLocationsLakesTasksCreateOptions {
  /**
   * Required. Task identifier.
   */
  taskId?: string;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesTasksGetIamPolicy.
 */
export interface ProjectsLocationsLakesTasksGetIamPolicyOptions {
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
 * Additional options for Dataplex#projectsLocationsLakesTasksJobsList.
 */
export interface ProjectsLocationsLakesTasksJobsListOptions {
  /**
   * Optional. Maximum number of jobs to return. The service may return fewer
   * than this value. If unspecified, at most 10 jobs will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListJobs call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to ListJobs must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesTasksList.
 */
export interface ProjectsLocationsLakesTasksListOptions {
  /**
   * Optional. Filter request.
   */
  filter?: string;
  /**
   * Optional. Order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. Maximum number of tasks to return. The service may return fewer
   * than this value. If unspecified, at most 10 tasks will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListZones call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to ListZones must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesTasksPatch.
 */
export interface ProjectsLocationsLakesTasksPatchOptions {
  /**
   * Required. Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsLakesTasksPatchOptions(data: any): ProjectsLocationsLakesTasksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsLakesTasksPatchOptions(data: any): ProjectsLocationsLakesTasksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dataplex#projectsLocationsLakesZonesActionsList.
 */
export interface ProjectsLocationsLakesZonesActionsListOptions {
  /**
   * Optional. Maximum number of actions to return. The service may return
   * fewer than this value. If unspecified, at most 10 actions will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListZoneActions call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to ListZoneActions must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dataplex#projectsLocationsLakesZonesAssetsActionsList.
 */
export interface ProjectsLocationsLakesZonesAssetsActionsListOptions {
  /**
   * Optional. Maximum number of actions to return. The service may return
   * fewer than this value. If unspecified, at most 10 actions will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListAssetActions call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to ListAssetActions must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesZonesAssetsCreate.
 */
export interface ProjectsLocationsLakesZonesAssetsCreateOptions {
  /**
   * Required. Asset identifier. This ID will be used to generate names such as
   * table names when publishing metadata to Hive Metastore and BigQuery. * Must
   * contain only lowercase letters, numbers and hyphens. * Must start with a
   * letter. * Must end with a number or a letter. * Must be between 1-63
   * characters. * Must be unique within the zone.
   */
  assetId?: string;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * Dataplex#projectsLocationsLakesZonesAssetsGetIamPolicy.
 */
export interface ProjectsLocationsLakesZonesAssetsGetIamPolicyOptions {
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
 * Additional options for Dataplex#projectsLocationsLakesZonesAssetsList.
 */
export interface ProjectsLocationsLakesZonesAssetsListOptions {
  /**
   * Optional. Filter request.
   */
  filter?: string;
  /**
   * Optional. Order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. Maximum number of asset to return. The service may return fewer
   * than this value. If unspecified, at most 10 assets will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListAssets call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to ListAssets must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesZonesAssetsPatch.
 */
export interface ProjectsLocationsLakesZonesAssetsPatchOptions {
  /**
   * Required. Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsLakesZonesAssetsPatchOptions(data: any): ProjectsLocationsLakesZonesAssetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsLakesZonesAssetsPatchOptions(data: any): ProjectsLocationsLakesZonesAssetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dataplex#projectsLocationsLakesZonesCreate.
 */
export interface ProjectsLocationsLakesZonesCreateOptions {
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
  /**
   * Required. Zone identifier. This ID will be used to generate names such as
   * database and dataset names when publishing metadata to Hive Metastore and
   * BigQuery. * Must contain only lowercase letters, numbers and hyphens. *
   * Must start with a letter. * Must end with a number or a letter. * Must be
   * between 1-63 characters. * Must be unique across all lakes from all
   * locations in a project. * Must not be one of the reserved IDs (i.e.
   * "default", "global-temp")
   */
  zoneId?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesZonesEntitiesCreate.
 */
export interface ProjectsLocationsLakesZonesEntitiesCreateOptions {
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesZonesEntitiesDelete.
 */
export interface ProjectsLocationsLakesZonesEntitiesDeleteOptions {
  /**
   * Required. The etag associated with the entity, which can be retrieved with
   * a GetEntity request.
   */
  etag?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesZonesEntitiesGet.
 */
export interface ProjectsLocationsLakesZonesEntitiesGetOptions {
  /**
   * Optional. Used to select the subset of entity information to return.
   * Defaults to BASIC.
   */
  view?:  | "ENTITY_VIEW_UNSPECIFIED" | "BASIC" | "SCHEMA" | "FULL";
}

/**
 * Additional options for Dataplex#projectsLocationsLakesZonesEntitiesList.
 */
export interface ProjectsLocationsLakesZonesEntitiesListOptions {
  /**
   * Optional. The following filter parameters can be added to the URL to limit
   * the entities returned by the API: Entity ID: ?filter="id=entityID" Asset
   * ID: ?filter="asset=assetID" Data path ?filter="data_path=gs://my-bucket" Is
   * HIVE compatible: ?filter="hive_compatible=true" Is BigQuery compatible:
   * ?filter="bigquery_compatible=true"
   */
  filter?: string;
  /**
   * Optional. Maximum number of entities to return. The service may return
   * fewer than this value. If unspecified, 100 entities will be returned by
   * default. The maximum value is 500; larger values will will be truncated to
   * 500.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListEntities call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to ListEntities must match the call that provided the page token.
   */
  pageToken?: string;
  /**
   * Required. Specify the entity view to make a partial list request.
   */
  view?:  | "ENTITY_VIEW_UNSPECIFIED" | "TABLES" | "FILESETS";
}

/**
 * Additional options for
 * Dataplex#projectsLocationsLakesZonesEntitiesPartitionsCreate.
 */
export interface ProjectsLocationsLakesZonesEntitiesPartitionsCreateOptions {
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for
 * Dataplex#projectsLocationsLakesZonesEntitiesPartitionsDelete.
 */
export interface ProjectsLocationsLakesZonesEntitiesPartitionsDeleteOptions {
  /**
   * Optional. The etag associated with the partition.
   */
  etag?: string;
}

/**
 * Additional options for
 * Dataplex#projectsLocationsLakesZonesEntitiesPartitionsList.
 */
export interface ProjectsLocationsLakesZonesEntitiesPartitionsListOptions {
  /**
   * Optional. Filter the partitions returned to the caller using a key value
   * pair expression. Supported operators and syntax: logic operators: AND, OR
   * comparison operators: <, >, >=, <= ,=, != LIKE operators: The right hand of
   * a LIKE operator supports "." and "*" for wildcard searches, for example
   * "value1 LIKE ".*oo.*" parenthetical grouping: ( )Sample filter expression:
   * `?filter="key1 < value1 OR key2 > value2"Notes: Keys to the left of
   * operators are case insensitive. Partition results are sorted first by
   * creation time, then by lexicographic order. Up to 20 key value filter pairs
   * are allowed, but due to performance considerations, only the first 10 will
   * be used as a filter.
   */
  filter?: string;
  /**
   * Optional. Maximum number of partitions to return. The service may return
   * fewer than this value. If unspecified, 100 partitions will be returned by
   * default. The maximum page size is 500; larger values will will be truncated
   * to 500.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListPartitions call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to ListPartitions must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesZonesEntitiesUpdate.
 */
export interface ProjectsLocationsLakesZonesEntitiesUpdateOptions {
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesZonesGetIamPolicy.
 */
export interface ProjectsLocationsLakesZonesGetIamPolicyOptions {
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
 * Additional options for Dataplex#projectsLocationsLakesZonesList.
 */
export interface ProjectsLocationsLakesZonesListOptions {
  /**
   * Optional. Filter request.
   */
  filter?: string;
  /**
   * Optional. Order by fields for the result.
   */
  orderBy?: string;
  /**
   * Optional. Maximum number of zones to return. The service may return fewer
   * than this value. If unspecified, at most 10 zones will be returned. The
   * maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Optional. Page token received from a previous ListZones call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to ListZones must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Dataplex#projectsLocationsLakesZonesPatch.
 */
export interface ProjectsLocationsLakesZonesPatchOptions {
  /**
   * Required. Mask of fields to update.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the request, but do not perform mutations. The
   * default is false.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsLakesZonesPatchOptions(data: any): ProjectsLocationsLakesZonesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsLakesZonesPatchOptions(data: any): ProjectsLocationsLakesZonesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dataplex#projectsLocationsList.
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
 * Additional options for Dataplex#projectsLocationsOperationsList.
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
