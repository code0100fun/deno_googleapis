// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Data Lineage API Client for Deno
 * ================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/data-catalog
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class DataLineage {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://datalineage.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Retrieve information about LineageProcesses associated with specific
   * links. LineageProcesses are transformation pipelines that result in data
   * flowing from **source** to **target** assets. Links between assets
   * represent this operation. If you have specific link names, you can use this
   * method to verify which LineageProcesses contribute to creating those links.
   * See the SearchLinks method for more information on how to retrieve link
   * name. You can retrieve the LineageProcess information in every project
   * where you have the `datalineage.events.get` permission. The project
   * provided in the URL is used for Billing and Quota.
   *
   * @param parent Required. The project and location where you want to search.
   */
  async projectsLocationsBatchSearchLinkProcesses(parent: string, req: GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesRequest): Promise<GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:batchSearchLinkProcesses`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse(data);
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
  async projectsLocationsOperationsCancel(name: string, req: GoogleLongrunningCancelOperationRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async projectsLocationsOperationsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
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
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
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

  /**
   * Creates a new process.
   *
   * @param parent Required. The name of the project and its location that should own the process.
   */
  async projectsLocationsProcessesCreate(parent: string, req: GoogleCloudDatacatalogLineageV1Process, opts: ProjectsLocationsProcessesCreateOptions = {}): Promise<GoogleCloudDatacatalogLineageV1Process> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/processes`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatacatalogLineageV1Process;
  }

  /**
   * Deletes the process with the specified name.
   *
   * @param name Required. The name of the process to delete.
   */
  async projectsLocationsProcessesDelete(name: string, opts: ProjectsLocationsProcessesDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets the details of the specified process.
   *
   * @param name Required. The name of the process to get.
   */
  async projectsLocationsProcessesGet(name: string): Promise<GoogleCloudDatacatalogLineageV1Process> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDatacatalogLineageV1Process;
  }

  /**
   * List processes in the given project and location. List order is descending
   * by insertion time.
   *
   * @param parent Required. The name of the project and its location that owns this collection of processes.
   */
  async projectsLocationsProcessesList(parent: string, opts: ProjectsLocationsProcessesListOptions = {}): Promise<GoogleCloudDatacatalogLineageV1ListProcessesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/processes`);
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
    return data as GoogleCloudDatacatalogLineageV1ListProcessesResponse;
  }

  /**
   * Updates a process.
   *
   * @param name Immutable. The resource name of the lineage process. Format: `projects/{project}/locations/{location}/processes/{process}`. Can be specified or auto-assigned. {process} must be not longer than 200 characters and only contain characters in a set: `a-zA-Z0-9_-:.`
   */
  async projectsLocationsProcessesPatch(name: string, req: GoogleCloudDatacatalogLineageV1Process, opts: ProjectsLocationsProcessesPatchOptions = {}): Promise<GoogleCloudDatacatalogLineageV1Process> {
    opts = serializeProjectsLocationsProcessesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
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
    return data as GoogleCloudDatacatalogLineageV1Process;
  }

  /**
   * Creates a new run.
   *
   * @param parent Required. The name of the process that should own the run.
   */
  async projectsLocationsProcessesRunsCreate(parent: string, req: GoogleCloudDatacatalogLineageV1Run, opts: ProjectsLocationsProcessesRunsCreateOptions = {}): Promise<GoogleCloudDatacatalogLineageV1Run> {
    req = serializeGoogleCloudDatacatalogLineageV1Run(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/runs`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDatacatalogLineageV1Run(data);
  }

  /**
   * Deletes the run with the specified name.
   *
   * @param name Required. The name of the run to delete.
   */
  async projectsLocationsProcessesRunsDelete(name: string, opts: ProjectsLocationsProcessesRunsDeleteOptions = {}): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets the details of the specified run.
   *
   * @param name Required. The name of the run to get.
   */
  async projectsLocationsProcessesRunsGet(name: string): Promise<GoogleCloudDatacatalogLineageV1Run> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatacatalogLineageV1Run(data);
  }

  /**
   * Creates a new lineage event.
   *
   * @param parent Required. The name of the run that should own the lineage event.
   */
  async projectsLocationsProcessesRunsLineageEventsCreate(parent: string, req: GoogleCloudDatacatalogLineageV1LineageEvent, opts: ProjectsLocationsProcessesRunsLineageEventsCreateOptions = {}): Promise<GoogleCloudDatacatalogLineageV1LineageEvent> {
    req = serializeGoogleCloudDatacatalogLineageV1LineageEvent(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/lineageEvents`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDatacatalogLineageV1LineageEvent(data);
  }

  /**
   * Deletes the lineage event with the specified name.
   *
   * @param name Required. The name of the lineage event to delete.
   */
  async projectsLocationsProcessesRunsLineageEventsDelete(name: string, opts: ProjectsLocationsProcessesRunsLineageEventsDeleteOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets details of a specified lineage event.
   *
   * @param name Required. The name of the lineage event to get.
   */
  async projectsLocationsProcessesRunsLineageEventsGet(name: string): Promise<GoogleCloudDatacatalogLineageV1LineageEvent> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatacatalogLineageV1LineageEvent(data);
  }

  /**
   * Lists lineage events in the given project and location. The list order is
   * not defined.
   *
   * @param parent Required. The name of the run that owns the collection of lineage events to get.
   */
  async projectsLocationsProcessesRunsLineageEventsList(parent: string, opts: ProjectsLocationsProcessesRunsLineageEventsListOptions = {}): Promise<GoogleCloudDatacatalogLineageV1ListLineageEventsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/lineageEvents`);
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
    return deserializeGoogleCloudDatacatalogLineageV1ListLineageEventsResponse(data);
  }

  /**
   * Lists runs in the given project and location. List order is descending by
   * `start_time`.
   *
   * @param parent Required. The name of process that owns this collection of runs.
   */
  async projectsLocationsProcessesRunsList(parent: string, opts: ProjectsLocationsProcessesRunsListOptions = {}): Promise<GoogleCloudDatacatalogLineageV1ListRunsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/runs`);
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
    return deserializeGoogleCloudDatacatalogLineageV1ListRunsResponse(data);
  }

  /**
   * Updates a run.
   *
   * @param name Immutable. The resource name of the run. Format: `projects/{project}/locations/{location}/processes/{process}/runs/{run}`. Can be specified or auto-assigned. {run} must be not longer than 200 characters and only contain characters in a set: `a-zA-Z0-9_-:.`
   */
  async projectsLocationsProcessesRunsPatch(name: string, req: GoogleCloudDatacatalogLineageV1Run, opts: ProjectsLocationsProcessesRunsPatchOptions = {}): Promise<GoogleCloudDatacatalogLineageV1Run> {
    req = serializeGoogleCloudDatacatalogLineageV1Run(req);
    opts = serializeProjectsLocationsProcessesRunsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
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
    return deserializeGoogleCloudDatacatalogLineageV1Run(data);
  }

  /**
   * Retrieve a list of links connected to a specific asset. Links represent
   * the data flow between **source** (upstream) and **target** (downstream)
   * assets in transformation pipelines. Links are stored in the same project as
   * the Lineage Events that create them. You can retrieve links in every
   * project where you have the `datalineage.events.get` permission. The project
   * provided in the URL is used for Billing and Quota.
   *
   * @param parent Required. The project and location you want search in.
   */
  async projectsLocationsSearchLinks(parent: string, req: GoogleCloudDatacatalogLineageV1SearchLinksRequest): Promise<GoogleCloudDatacatalogLineageV1SearchLinksResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:searchLinks`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDatacatalogLineageV1SearchLinksResponse(data);
  }
}

/**
 * Request message for BatchSearchLinkProcesses.
 */
export interface GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesRequest {
  /**
   * Required. An array of links to check for their associated
   * LineageProcesses. The maximum number of items in this array is 100. If the
   * request contains more than 100 links, it returns the `INVALID_ARGUMENT`
   * error. Format: `projects/{project}/locations/{location}/links/{link}`.
   */
  links?: string[];
  /**
   * The maximum number of processes to return in a single page of the
   * response. A page may contain fewer results than this value.
   */
  pageSize?: number;
  /**
   * The page token received from a previous `BatchSearchLinkProcesses` call.
   * Use it to get the next page. When requesting subsequent pages of a
   * response, remember that all parameters must match the values you provided
   * in the original request.
   */
  pageToken?: string;
}

/**
 * Response message for BatchSearchLinkProcesses.
 */
export interface GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse {
  /**
   * The token to specify as `page_token` in the subsequent call to get the
   * next page. Omitted if there are no more pages in the response.
   */
  nextPageToken?: string;
  /**
   * An array of processes associated with the specified links.
   */
  processLinks?: GoogleCloudDatacatalogLineageV1ProcessLinks[];
}

function serializeGoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse(data: any): GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse {
  return {
    ...data,
    processLinks: data["processLinks"] !== undefined ? data["processLinks"].map((item: any) => (serializeGoogleCloudDatacatalogLineageV1ProcessLinks(item))) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse(data: any): GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse {
  return {
    ...data,
    processLinks: data["processLinks"] !== undefined ? data["processLinks"].map((item: any) => (deserializeGoogleCloudDatacatalogLineageV1ProcessLinks(item))) : undefined,
  };
}

/**
 * The soft reference to everything you can attach a lineage event to.
 */
export interface GoogleCloudDatacatalogLineageV1EntityReference {
  /**
   * Required. Fully Qualified Name of the entity. Useful for referencing
   * entities that aren't represented as Google Cloud resources, for example,
   * tables in Dataproc Metastore API. Examples: *
   * `bigquery:dataset.project_id.dataset_id` *
   * `bigquery:table.project_id.dataset_id.table_id` *
   * `pubsub:project_id.topic_id` *
   * `dataproc_metastore:projectId.locationId.instanceId.databaseId.tableId`
   */
  fullyQualifiedName?: string;
}

/**
 * A lineage between source and target entities.
 */
export interface GoogleCloudDatacatalogLineageV1EventLink {
  /**
   * Required. Reference to the source entity
   */
  source?: GoogleCloudDatacatalogLineageV1EntityReference;
  /**
   * Required. Reference to the target entity
   */
  target?: GoogleCloudDatacatalogLineageV1EntityReference;
}

/**
 * A lineage event represents an operation on assets. Within the operation, the
 * data flows from the source to the target defined in the links field.
 */
export interface GoogleCloudDatacatalogLineageV1LineageEvent {
  /**
   * Optional. The end of the transformation which resulted in this lineage
   * event. For streaming scenarios, it should be the end of the period from
   * which the lineage is being reported.
   */
  endTime?: Date;
  /**
   * Optional. List of source-target pairs. Can't contain more than 100 tuples.
   */
  links?: GoogleCloudDatacatalogLineageV1EventLink[];
  /**
   * Immutable. The resource name of the lineage event. Format:
   * `projects/{project}/locations/{location}/processes/{process}/runs/{run}/lineageEvents/{lineage_event}`.
   * Can be specified or auto-assigned. {lineage_event} must be not longer than
   * 200 characters and only contain characters in a set: `a-zA-Z0-9_-:.`
   */
  name?: string;
  /**
   * Optional. The beginning of the transformation which resulted in this
   * lineage event. For streaming scenarios, it should be the beginning of the
   * period from which the lineage is being reported.
   */
  startTime?: Date;
}

function serializeGoogleCloudDatacatalogLineageV1LineageEvent(data: any): GoogleCloudDatacatalogLineageV1LineageEvent {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatacatalogLineageV1LineageEvent(data: any): GoogleCloudDatacatalogLineageV1LineageEvent {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Links represent the data flow between **source** (upstream) and **target**
 * (downstream) assets in transformation pipelines. Links are created when
 * LineageEvents record data transformation between related assets.
 */
export interface GoogleCloudDatacatalogLineageV1Link {
  /**
   * The end of the last event establishing this link.
   */
  endTime?: Date;
  /**
   * Output only. Immutable. The name of the link. Format:
   * `projects/{project}/locations/{location}/links/{link}`.
   */
  readonly name?: string;
  /**
   * The pointer to the entity that is the **source** of this link.
   */
  source?: GoogleCloudDatacatalogLineageV1EntityReference;
  /**
   * The start of the first event establishing this link.
   */
  startTime?: Date;
  /**
   * The pointer to the entity that is the **target** of this link.
   */
  target?: GoogleCloudDatacatalogLineageV1EntityReference;
}

function serializeGoogleCloudDatacatalogLineageV1Link(data: any): GoogleCloudDatacatalogLineageV1Link {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatacatalogLineageV1Link(data: any): GoogleCloudDatacatalogLineageV1Link {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Response message for ListLineageEvents.
 */
export interface GoogleCloudDatacatalogLineageV1ListLineageEventsResponse {
  /**
   * Lineage events from the specified project and location.
   */
  lineageEvents?: GoogleCloudDatacatalogLineageV1LineageEvent[];
  /**
   * The token to specify as `page_token` in the next call to get the next
   * page. If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDatacatalogLineageV1ListLineageEventsResponse(data: any): GoogleCloudDatacatalogLineageV1ListLineageEventsResponse {
  return {
    ...data,
    lineageEvents: data["lineageEvents"] !== undefined ? data["lineageEvents"].map((item: any) => (serializeGoogleCloudDatacatalogLineageV1LineageEvent(item))) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogLineageV1ListLineageEventsResponse(data: any): GoogleCloudDatacatalogLineageV1ListLineageEventsResponse {
  return {
    ...data,
    lineageEvents: data["lineageEvents"] !== undefined ? data["lineageEvents"].map((item: any) => (deserializeGoogleCloudDatacatalogLineageV1LineageEvent(item))) : undefined,
  };
}

/**
 * Response message for ListProcesses.
 */
export interface GoogleCloudDatacatalogLineageV1ListProcessesResponse {
  /**
   * The token to specify as `page_token` in the next call to get the next
   * page. If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The processes from the specified project and location.
   */
  processes?: GoogleCloudDatacatalogLineageV1Process[];
}

/**
 * Response message for ListRuns.
 */
export interface GoogleCloudDatacatalogLineageV1ListRunsResponse {
  /**
   * The token to specify as `page_token` in the next call to get the next
   * page. If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The runs from the specified project and location.
   */
  runs?: GoogleCloudDatacatalogLineageV1Run[];
}

function serializeGoogleCloudDatacatalogLineageV1ListRunsResponse(data: any): GoogleCloudDatacatalogLineageV1ListRunsResponse {
  return {
    ...data,
    runs: data["runs"] !== undefined ? data["runs"].map((item: any) => (serializeGoogleCloudDatacatalogLineageV1Run(item))) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogLineageV1ListRunsResponse(data: any): GoogleCloudDatacatalogLineageV1ListRunsResponse {
  return {
    ...data,
    runs: data["runs"] !== undefined ? data["runs"].map((item: any) => (deserializeGoogleCloudDatacatalogLineageV1Run(item))) : undefined,
  };
}

/**
 * Metadata describing the operation.
 */
export interface GoogleCloudDatacatalogLineageV1OperationMetadata {
  /**
   * Output only. The timestamp of the operation submission to the server.
   */
  readonly createTime?: Date;
  /**
   * Output only. The timestamp of the operation termination, regardless of its
   * success. This field is unset if the operation is still ongoing.
   */
  readonly endTime?: Date;
  /**
   * Output only. The type of the operation being performed.
   */
  readonly operationType?:  | "TYPE_UNSPECIFIED" | "DELETE";
  /**
   * Output only. The [relative name]
   * (https://cloud.google.com//apis/design/resource_names#relative_resource_name)
   * of the resource being operated on.
   */
  readonly resource?: string;
  /**
   * Output only. The UUID of the resource being operated on.
   */
  readonly resourceUuid?: string;
  /**
   * Output only. The current operation state.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED";
}

/**
 * Origin of a process.
 */
export interface GoogleCloudDatacatalogLineageV1Origin {
  /**
   * If the source_type isn't CUSTOM, the value of this field should be a
   * Google Cloud resource name of the system, which reports lineage. The
   * project and location parts of the resource name must match the project and
   * location of the lineage resource being created. Examples: - `{source_type:
   * COMPOSER, name: "projects/foo/locations/us/environments/bar"}` -
   * `{source_type: BIGQUERY, name: "projects/foo/locations/eu"}` -
   * `{source_type: CUSTOM, name: "myCustomIntegration"}`
   */
  name?: string;
  /**
   * Type of the source.
   */
  sourceType?:  | "SOURCE_TYPE_UNSPECIFIED" | "CUSTOM" | "BIGQUERY" | "DATA_FUSION" | "COMPOSER" | "LOOKER_STUDIO" | "DATAPROC";
}

/**
 * A process is the definition of a data transformation operation.
 */
export interface GoogleCloudDatacatalogLineageV1Process {
  /**
   * Optional. The attributes of the process. Should only be used for the
   * purpose of non-semantic management (classifying, describing or labeling the
   * process). Up to 100 attributes are allowed.
   */
  attributes?: {
    [key: string]: any
  };
  /**
   * Optional. A human-readable name you can set to display in a user
   * interface. Must be not longer than 200 characters and only contain UTF-8
   * letters or numbers, spaces or characters like `_-:&.`
   */
  displayName?: string;
  /**
   * Immutable. The resource name of the lineage process. Format:
   * `projects/{project}/locations/{location}/processes/{process}`. Can be
   * specified or auto-assigned. {process} must be not longer than 200
   * characters and only contain characters in a set: `a-zA-Z0-9_-:.`
   */
  name?: string;
  /**
   * Optional. The origin of this process and its runs and lineage events.
   */
  origin?: GoogleCloudDatacatalogLineageV1Origin;
}

/**
 * Link details.
 */
export interface GoogleCloudDatacatalogLineageV1ProcessLinkInfo {
  /**
   * The end of the last event establishing this link-process tuple.
   */
  endTime?: Date;
  /**
   * The name of the link in the format of
   * `projects/{project}/locations/{location}/links/{link}`.
   */
  link?: string;
  /**
   * The start of the first event establishing this link-process tuple.
   */
  startTime?: Date;
}

function serializeGoogleCloudDatacatalogLineageV1ProcessLinkInfo(data: any): GoogleCloudDatacatalogLineageV1ProcessLinkInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatacatalogLineageV1ProcessLinkInfo(data: any): GoogleCloudDatacatalogLineageV1ProcessLinkInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Links associated with a specific process.
 */
export interface GoogleCloudDatacatalogLineageV1ProcessLinks {
  /**
   * An array containing link details objects of the links provided in the
   * original request. A single process can result in creating multiple links.
   * If any of the links you provide in the request are created by the same
   * process, they all are included in this array.
   */
  links?: GoogleCloudDatacatalogLineageV1ProcessLinkInfo[];
  /**
   * The process name in the format of
   * `projects/{project}/locations/{location}/processes/{process}`.
   */
  process?: string;
}

function serializeGoogleCloudDatacatalogLineageV1ProcessLinks(data: any): GoogleCloudDatacatalogLineageV1ProcessLinks {
  return {
    ...data,
    links: data["links"] !== undefined ? data["links"].map((item: any) => (serializeGoogleCloudDatacatalogLineageV1ProcessLinkInfo(item))) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogLineageV1ProcessLinks(data: any): GoogleCloudDatacatalogLineageV1ProcessLinks {
  return {
    ...data,
    links: data["links"] !== undefined ? data["links"].map((item: any) => (deserializeGoogleCloudDatacatalogLineageV1ProcessLinkInfo(item))) : undefined,
  };
}

/**
 * A lineage run represents an execution of a process that creates lineage
 * events.
 */
export interface GoogleCloudDatacatalogLineageV1Run {
  /**
   * Optional. The attributes of the run. Should only be used for the purpose
   * of non-semantic management (classifying, describing or labeling the run).
   * Up to 100 attributes are allowed.
   */
  attributes?: {
    [key: string]: any
  };
  /**
   * Optional. A human-readable name you can set to display in a user
   * interface. Must be not longer than 1024 characters and only contain UTF-8
   * letters or numbers, spaces or characters like `_-:&.`
   */
  displayName?: string;
  /**
   * Optional. The timestamp of the end of the run.
   */
  endTime?: Date;
  /**
   * Immutable. The resource name of the run. Format:
   * `projects/{project}/locations/{location}/processes/{process}/runs/{run}`.
   * Can be specified or auto-assigned. {run} must be not longer than 200
   * characters and only contain characters in a set: `a-zA-Z0-9_-:.`
   */
  name?: string;
  /**
   * Required. The timestamp of the start of the run.
   */
  startTime?: Date;
  /**
   * Required. The state of the run.
   */
  state?:  | "UNKNOWN" | "STARTED" | "COMPLETED" | "FAILED" | "ABORTED";
}

function serializeGoogleCloudDatacatalogLineageV1Run(data: any): GoogleCloudDatacatalogLineageV1Run {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatacatalogLineageV1Run(data: any): GoogleCloudDatacatalogLineageV1Run {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Request message for SearchLinks.
 */
export interface GoogleCloudDatacatalogLineageV1SearchLinksRequest {
  /**
   * Optional. The maximum number of links to return in a single page of the
   * response. A page may contain fewer links than this value. If unspecified,
   * at most 10 links are returned. Maximum value is 100; values greater than
   * 100 are reduced to 100.
   */
  pageSize?: number;
  /**
   * Optional. The page token received from a previous `SearchLinksRequest`
   * call. Use it to get the next page. When requesting subsequent pages of a
   * response, remember that all parameters must match the values you provided
   * in the original request.
   */
  pageToken?: string;
  /**
   * Optional. Send asset information in the **source** field to retrieve all
   * links that lead from the specified asset to downstream assets.
   */
  source?: GoogleCloudDatacatalogLineageV1EntityReference;
  /**
   * Optional. Send asset information in the **target** field to retrieve all
   * links that lead from upstream assets to the specified asset.
   */
  target?: GoogleCloudDatacatalogLineageV1EntityReference;
}

/**
 * Response message for SearchLinks.
 */
export interface GoogleCloudDatacatalogLineageV1SearchLinksResponse {
  /**
   * The list of links for a given asset. Can be empty if the asset has no
   * relations of requested type (source or target).
   */
  links?: GoogleCloudDatacatalogLineageV1Link[];
  /**
   * The token to specify as `page_token` in the subsequent call to get the
   * next page. Omitted if there are no more pages in the response.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDatacatalogLineageV1SearchLinksResponse(data: any): GoogleCloudDatacatalogLineageV1SearchLinksResponse {
  return {
    ...data,
    links: data["links"] !== undefined ? data["links"].map((item: any) => (serializeGoogleCloudDatacatalogLineageV1Link(item))) : undefined,
  };
}

function deserializeGoogleCloudDatacatalogLineageV1SearchLinksResponse(data: any): GoogleCloudDatacatalogLineageV1SearchLinksResponse {
  return {
    ...data,
    links: data["links"] !== undefined ? data["links"].map((item: any) => (deserializeGoogleCloudDatacatalogLineageV1Link(item))) : undefined,
  };
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
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
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
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface GoogleProtobufEmpty {
}

/**
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
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
 * Additional options for DataLineage#projectsLocationsOperationsList.
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
 * Additional options for DataLineage#projectsLocationsProcessesCreate.
 */
export interface ProjectsLocationsProcessesCreateOptions {
  /**
   * A unique identifier for this request. Restricted to 36 ASCII characters. A
   * random UUID is recommended. This request is idempotent only if a
   * `request_id` is provided.
   */
  requestId?: string;
}

/**
 * Additional options for DataLineage#projectsLocationsProcessesDelete.
 */
export interface ProjectsLocationsProcessesDeleteOptions {
  /**
   * If set to true and the process is not found, the request succeeds but the
   * server doesn't perform any actions.
   */
  allowMissing?: boolean;
}

/**
 * Additional options for DataLineage#projectsLocationsProcessesList.
 */
export interface ProjectsLocationsProcessesListOptions {
  /**
   * The maximum number of processes to return. The service may return fewer
   * than this value. If unspecified, at most 50 processes are returned. The
   * maximum value is 100; values greater than 100 are cut to 100.
   */
  pageSize?: number;
  /**
   * The page token received from a previous `ListProcesses` call. Specify it
   * to get the next page. When paginating, all other parameters specified in
   * this call must match the parameters of the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for DataLineage#projectsLocationsProcessesPatch.
 */
export interface ProjectsLocationsProcessesPatchOptions {
  /**
   * If set to true and the process is not found, the request inserts it.
   */
  allowMissing?: boolean;
  /**
   * The list of fields to update. Currently not used. The whole message is
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProcessesPatchOptions(data: any): ProjectsLocationsProcessesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsProcessesPatchOptions(data: any): ProjectsLocationsProcessesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DataLineage#projectsLocationsProcessesRunsCreate.
 */
export interface ProjectsLocationsProcessesRunsCreateOptions {
  /**
   * A unique identifier for this request. Restricted to 36 ASCII characters. A
   * random UUID is recommended. This request is idempotent only if a
   * `request_id` is provided.
   */
  requestId?: string;
}

/**
 * Additional options for DataLineage#projectsLocationsProcessesRunsDelete.
 */
export interface ProjectsLocationsProcessesRunsDeleteOptions {
  /**
   * If set to true and the run is not found, the request succeeds but the
   * server doesn't perform any actions.
   */
  allowMissing?: boolean;
}

/**
 * Additional options for
 * DataLineage#projectsLocationsProcessesRunsLineageEventsCreate.
 */
export interface ProjectsLocationsProcessesRunsLineageEventsCreateOptions {
  /**
   * A unique identifier for this request. Restricted to 36 ASCII characters. A
   * random UUID is recommended. This request is idempotent only if a
   * `request_id` is provided.
   */
  requestId?: string;
}

/**
 * Additional options for
 * DataLineage#projectsLocationsProcessesRunsLineageEventsDelete.
 */
export interface ProjectsLocationsProcessesRunsLineageEventsDeleteOptions {
  /**
   * If set to true and the lineage event is not found, the request succeeds
   * but the server doesn't perform any actions.
   */
  allowMissing?: boolean;
}

/**
 * Additional options for
 * DataLineage#projectsLocationsProcessesRunsLineageEventsList.
 */
export interface ProjectsLocationsProcessesRunsLineageEventsListOptions {
  /**
   * The maximum number of lineage events to return. The service may return
   * fewer events than this value. If unspecified, at most 50 events are
   * returned. The maximum value is 100; values greater than 100 are cut to 100.
   */
  pageSize?: number;
  /**
   * The page token received from a previous `ListLineageEvents` call. Specify
   * it to get the next page. When paginating, all other parameters specified in
   * this call must match the parameters of the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for DataLineage#projectsLocationsProcessesRunsList.
 */
export interface ProjectsLocationsProcessesRunsListOptions {
  /**
   * The maximum number of runs to return. The service may return fewer than
   * this value. If unspecified, at most 50 runs are returned. The maximum value
   * is 100; values greater than 100 are cut to 100.
   */
  pageSize?: number;
  /**
   * The page token received from a previous `ListRuns` call. Specify it to get
   * the next page. When paginating, all other parameters specified in this call
   * must match the parameters of the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for DataLineage#projectsLocationsProcessesRunsPatch.
 */
export interface ProjectsLocationsProcessesRunsPatchOptions {
  /**
   * If set to true and the run is not found, the request creates it.
   */
  allowMissing?: boolean;
  /**
   * The list of fields to update. Currently not used. The whole message is
   * updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsProcessesRunsPatchOptions(data: any): ProjectsLocationsProcessesRunsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsProcessesRunsPatchOptions(data: any): ProjectsLocationsProcessesRunsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}