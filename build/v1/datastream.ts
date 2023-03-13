// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Datastream API Client for Deno
 * ==============================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/datastream/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class Datastream {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://datastream.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Use this method to create a connection profile in a project and location.
   *
   * @param parent Required. The parent that owns the collection of ConnectionProfiles.
   */
  async projectsLocationsConnectionProfilesCreate(parent: string, req: ConnectionProfile, opts: ProjectsLocationsConnectionProfilesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/connectionProfiles`);
    if (opts.connectionProfileId !== undefined) {
      url.searchParams.append("connectionProfileId", String(opts.connectionProfileId));
    }
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
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
    return data as Operation;
  }

  /**
   * Use this method to delete a connection profile.
   *
   * @param name Required. The name of the connection profile resource to delete.
   */
  async projectsLocationsConnectionProfilesDelete(name: string, opts: ProjectsLocationsConnectionProfilesDeleteOptions = {}): Promise<Operation> {
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
   * Use this method to discover a connection profile. The discover API call
   * exposes the data objects and metadata belonging to the profile. Typically,
   * a request returns children data objects of a parent data object that's
   * optionally supplied in the request.
   *
   * @param parent Required. The parent resource of the connection profile type. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsConnectionProfilesDiscover(parent: string, req: DiscoverConnectionProfileRequest): Promise<DiscoverConnectionProfileResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/connectionProfiles:discover`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as DiscoverConnectionProfileResponse;
  }

  /**
   * Use this method to get details about a connection profile.
   *
   * @param name Required. The name of the connection profile resource to get.
   */
  async projectsLocationsConnectionProfilesGet(name: string): Promise<ConnectionProfile> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ConnectionProfile;
  }

  /**
   * Use this method to list connection profiles created in a project and
   * location.
   *
   * @param parent Required. The parent that owns the collection of connection profiles.
   */
  async projectsLocationsConnectionProfilesList(parent: string, opts: ProjectsLocationsConnectionProfilesListOptions = {}): Promise<ListConnectionProfilesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/connectionProfiles`);
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
    return data as ListConnectionProfilesResponse;
  }

  /**
   * Use this method to update the parameters of a connection profile.
   *
   * @param name Output only. The resource's name.
   */
  async projectsLocationsConnectionProfilesPatch(name: string, req: ConnectionProfile, opts: ProjectsLocationsConnectionProfilesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsConnectionProfilesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
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
    return data as Operation;
  }

  /**
   * The FetchStaticIps API call exposes the static IP addresses used by
   * Datastream.
   *
   * @param name Required. The resource name for the location for which static IPs should be returned. Must be in the format `projects/*\/locations/*`.
   */
  async projectsLocationsFetchStaticIps(name: string, opts: ProjectsLocationsFetchStaticIpsOptions = {}): Promise<FetchStaticIpsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:fetchStaticIps`);
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
    return data as FetchStaticIpsResponse;
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
   * Use this method to create a private connectivity configuration.
   *
   * @param parent Required. The parent that owns the collection of PrivateConnections.
   */
  async projectsLocationsPrivateConnectionsCreate(parent: string, req: PrivateConnection, opts: ProjectsLocationsPrivateConnectionsCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/privateConnections`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    if (opts.privateConnectionId !== undefined) {
      url.searchParams.append("privateConnectionId", String(opts.privateConnectionId));
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
   * Use this method to delete a private connectivity configuration.
   *
   * @param name Required. The name of the private connectivity configuration to delete.
   */
  async projectsLocationsPrivateConnectionsDelete(name: string, opts: ProjectsLocationsPrivateConnectionsDeleteOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
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
   * Use this method to get details about a private connectivity configuration.
   *
   * @param name Required. The name of the private connectivity configuration to get.
   */
  async projectsLocationsPrivateConnectionsGet(name: string): Promise<PrivateConnection> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PrivateConnection;
  }

  /**
   * Use this method to list private connectivity configurations in a project
   * and location.
   *
   * @param parent Required. The parent that owns the collection of private connectivity configurations.
   */
  async projectsLocationsPrivateConnectionsList(parent: string, opts: ProjectsLocationsPrivateConnectionsListOptions = {}): Promise<ListPrivateConnectionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/privateConnections`);
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
    return data as ListPrivateConnectionsResponse;
  }

  /**
   * Use this method to create a route for a private connectivity configuration
   * in a project and location.
   *
   * @param parent Required. The parent that owns the collection of Routes.
   */
  async projectsLocationsPrivateConnectionsRoutesCreate(parent: string, req: Route, opts: ProjectsLocationsPrivateConnectionsRoutesCreateOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/routes`);
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.routeId !== undefined) {
      url.searchParams.append("routeId", String(opts.routeId));
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
   * Use this method to delete a route.
   *
   * @param name Required. The name of the Route resource to delete.
   */
  async projectsLocationsPrivateConnectionsRoutesDelete(name: string, opts: ProjectsLocationsPrivateConnectionsRoutesDeleteOptions = {}): Promise<Operation> {
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
   * Use this method to get details about a route.
   *
   * @param name Required. The name of the Route resource to get.
   */
  async projectsLocationsPrivateConnectionsRoutesGet(name: string): Promise<Route> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Route;
  }

  /**
   * Use this method to list routes created for a private connectivity
   * configuration in a project and location.
   *
   * @param parent Required. The parent that owns the collection of Routess.
   */
  async projectsLocationsPrivateConnectionsRoutesList(parent: string, opts: ProjectsLocationsPrivateConnectionsRoutesListOptions = {}): Promise<ListRoutesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/routes`);
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
    return data as ListRoutesResponse;
  }

  /**
   * Use this method to create a stream.
   *
   * @param parent Required. The parent that owns the collection of streams.
   */
  async projectsLocationsStreamsCreate(parent: string, req: Stream, opts: ProjectsLocationsStreamsCreateOptions = {}): Promise<Operation> {
    req = serializeStream(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/streams`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
    if (opts.streamId !== undefined) {
      url.searchParams.append("streamId", String(opts.streamId));
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
    return data as Operation;
  }

  /**
   * Use this method to delete a stream.
   *
   * @param name Required. The name of the stream resource to delete.
   */
  async projectsLocationsStreamsDelete(name: string, opts: ProjectsLocationsStreamsDeleteOptions = {}): Promise<Operation> {
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
   * Use this method to get details about a stream.
   *
   * @param name Required. The name of the stream resource to get.
   */
  async projectsLocationsStreamsGet(name: string): Promise<Stream> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeStream(data);
  }

  /**
   * Use this method to list streams in a project and location.
   *
   * @param parent Required. The parent that owns the collection of streams.
   */
  async projectsLocationsStreamsList(parent: string, opts: ProjectsLocationsStreamsListOptions = {}): Promise<ListStreamsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/streams`);
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
    return deserializeListStreamsResponse(data);
  }

  /**
   * Use this method to get details about a stream object.
   *
   * @param name Required. The name of the stream object resource to get.
   */
  async projectsLocationsStreamsObjectsGet(name: string): Promise<StreamObject> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as StreamObject;
  }

  /**
   * Use this method to list the objects of a specific stream.
   *
   * @param parent Required. The parent stream that owns the collection of objects.
   */
  async projectsLocationsStreamsObjectsList(parent: string, opts: ProjectsLocationsStreamsObjectsListOptions = {}): Promise<ListStreamObjectsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/objects`);
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
    return data as ListStreamObjectsResponse;
  }

  /**
   * Use this method to look up a stream object by its source object
   * identifier.
   *
   * @param parent Required. The parent stream that owns the collection of objects.
   */
  async projectsLocationsStreamsObjectsLookup(parent: string, req: LookupStreamObjectRequest): Promise<StreamObject> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/objects:lookup`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as StreamObject;
  }

  /**
   * Use this method to start a backfill job for the specified stream object.
   *
   * @param object Required. The name of the stream object resource to start a backfill job for.
   */
  async projectsLocationsStreamsObjectsStartBackfillJob(object: string, req: StartBackfillJobRequest): Promise<StartBackfillJobResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ object }:startBackfillJob`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as StartBackfillJobResponse;
  }

  /**
   * Use this method to stop a backfill job for the specified stream object.
   *
   * @param object Required. The name of the stream object resource to stop the backfill job for.
   */
  async projectsLocationsStreamsObjectsStopBackfillJob(object: string, req: StopBackfillJobRequest): Promise<StopBackfillJobResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ object }:stopBackfillJob`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as StopBackfillJobResponse;
  }

  /**
   * Use this method to update the configuration of a stream.
   *
   * @param name Output only. The stream's name.
   */
  async projectsLocationsStreamsPatch(name: string, req: Stream, opts: ProjectsLocationsStreamsPatchOptions = {}): Promise<Operation> {
    req = serializeStream(req);
    opts = serializeProjectsLocationsStreamsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    if (opts.requestId !== undefined) {
      url.searchParams.append("requestId", String(opts.requestId));
    }
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
    return data as Operation;
  }
}

/**
 * AVRO file format configuration.
 */
export interface AvroFileFormat {
}

/**
 * Backfill strategy to automatically backfill the Stream's objects. Specific
 * objects can be excluded.
 */
export interface BackfillAllStrategy {
  /**
   * MySQL data source objects to avoid backfilling.
   */
  mysqlExcludedObjects?: MysqlRdbms;
  /**
   * Oracle data source objects to avoid backfilling.
   */
  oracleExcludedObjects?: OracleRdbms;
  /**
   * PostgreSQL data source objects to avoid backfilling.
   */
  postgresqlExcludedObjects?: PostgresqlRdbms;
}

/**
 * Represents a backfill job on a specific stream object.
 */
export interface BackfillJob {
  /**
   * Output only. Errors which caused the backfill job to fail.
   */
  readonly errors?: Error[];
  /**
   * Output only. Backfill job's end time.
   */
  readonly lastEndTime?: Date;
  /**
   * Output only. Backfill job's start time.
   */
  readonly lastStartTime?: Date;
  /**
   * Backfill job state.
   */
  state?:  | "STATE_UNSPECIFIED" | "NOT_STARTED" | "PENDING" | "ACTIVE" | "STOPPED" | "FAILED" | "COMPLETED" | "UNSUPPORTED";
  /**
   * Backfill job's triggering reason.
   */
  trigger?:  | "TRIGGER_UNSPECIFIED" | "AUTOMATIC" | "MANUAL";
}

/**
 * Backfill strategy to disable automatic backfill for the Stream's objects.
 */
export interface BackfillNoneStrategy {
}

/**
 * BigQuery destination configuration
 */
export interface BigQueryDestinationConfig {
  /**
   * The guaranteed data freshness (in seconds) when querying tables created by
   * the stream. Editing this field will only affect new tables created in the
   * future, but existing tables will not be impacted. Lower values mean that
   * queries will return fresher data, but may result in higher cost.
   */
  dataFreshness?: number /* Duration */;
  /**
   * Single destination dataset.
   */
  singleTargetDataset?: SingleTargetDataset;
  /**
   * Source hierarchy datasets.
   */
  sourceHierarchyDatasets?: SourceHierarchyDatasets;
}

function serializeBigQueryDestinationConfig(data: any): BigQueryDestinationConfig {
  return {
    ...data,
    dataFreshness: data["dataFreshness"] !== undefined ? data["dataFreshness"] : undefined,
  };
}

function deserializeBigQueryDestinationConfig(data: any): BigQueryDestinationConfig {
  return {
    ...data,
    dataFreshness: data["dataFreshness"] !== undefined ? data["dataFreshness"] : undefined,
  };
}

/**
 * BigQuery warehouse profile.
 */
export interface BigQueryProfile {
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * A set of reusable connection configurations to be used as a source or
 * destination for a stream.
 */
export interface ConnectionProfile {
  /**
   * BigQuery Connection Profile configuration.
   */
  bigqueryProfile?: BigQueryProfile;
  /**
   * Output only. The create time of the resource.
   */
  readonly createTime?: Date;
  /**
   * Required. Display name.
   */
  displayName?: string;
  /**
   * Forward SSH tunnel connectivity.
   */
  forwardSshConnectivity?: ForwardSshTunnelConnectivity;
  /**
   * Cloud Storage ConnectionProfile configuration.
   */
  gcsProfile?: GcsProfile;
  /**
   * Labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * MySQL ConnectionProfile configuration.
   */
  mysqlProfile?: MysqlProfile;
  /**
   * Output only. The resource's name.
   */
  readonly name?: string;
  /**
   * Oracle ConnectionProfile configuration.
   */
  oracleProfile?: OracleProfile;
  /**
   * PostgreSQL Connection Profile configuration.
   */
  postgresqlProfile?: PostgresqlProfile;
  /**
   * Private connectivity.
   */
  privateConnectivity?: PrivateConnectivity;
  /**
   * Static Service IP connectivity.
   */
  staticServiceIpConnectivity?: StaticServiceIpConnectivity;
  /**
   * Output only. The update time of the resource.
   */
  readonly updateTime?: Date;
}

/**
 * Dataset template used for dynamic dataset creation.
 */
export interface DatasetTemplate {
  /**
   * If supplied, every created dataset will have its name prefixed by the
   * provided value. The prefix and name will be separated by an underscore.
   * i.e. _.
   */
  datasetIdPrefix?: string;
  /**
   * Describes the Cloud KMS encryption key that will be used to protect
   * destination BigQuery table. The BigQuery Service Account associated with
   * your project requires access to this encryption key. i.e.
   * projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{cryptoKey}.
   * See https://cloud.google.com/bigquery/docs/customer-managed-encryption for
   * more information.
   */
  kmsKeyName?: string;
  /**
   * Required. The geographic location where the dataset should reside. See
   * https://cloud.google.com/bigquery/docs/locations for supported locations.
   */
  location?: string;
}

/**
 * The configuration of the stream destination.
 */
export interface DestinationConfig {
  /**
   * BigQuery destination configuration.
   */
  bigqueryDestinationConfig?: BigQueryDestinationConfig;
  /**
   * Required. Destination connection profile resource. Format:
   * `projects/{project}/locations/{location}/connectionProfiles/{name}`
   */
  destinationConnectionProfile?: string;
  /**
   * A configuration for how data should be loaded to Cloud Storage.
   */
  gcsDestinationConfig?: GcsDestinationConfig;
}

function serializeDestinationConfig(data: any): DestinationConfig {
  return {
    ...data,
    bigqueryDestinationConfig: data["bigqueryDestinationConfig"] !== undefined ? serializeBigQueryDestinationConfig(data["bigqueryDestinationConfig"]) : undefined,
    gcsDestinationConfig: data["gcsDestinationConfig"] !== undefined ? serializeGcsDestinationConfig(data["gcsDestinationConfig"]) : undefined,
  };
}

function deserializeDestinationConfig(data: any): DestinationConfig {
  return {
    ...data,
    bigqueryDestinationConfig: data["bigqueryDestinationConfig"] !== undefined ? deserializeBigQueryDestinationConfig(data["bigqueryDestinationConfig"]) : undefined,
    gcsDestinationConfig: data["gcsDestinationConfig"] !== undefined ? deserializeGcsDestinationConfig(data["gcsDestinationConfig"]) : undefined,
  };
}

/**
 * Request message for 'discover' ConnectionProfile request.
 */
export interface DiscoverConnectionProfileRequest {
  /**
   * An ad-hoc connection profile configuration.
   */
  connectionProfile?: ConnectionProfile;
  /**
   * A reference to an existing connection profile.
   */
  connectionProfileName?: string;
  /**
   * Whether to retrieve the full hierarchy of data objects (TRUE) or only the
   * current level (FALSE).
   */
  fullHierarchy?: boolean;
  /**
   * The number of hierarchy levels below the current level to be retrieved.
   */
  hierarchyDepth?: number;
  /**
   * MySQL RDBMS to enrich with child data objects and metadata.
   */
  mysqlRdbms?: MysqlRdbms;
  /**
   * Oracle RDBMS to enrich with child data objects and metadata.
   */
  oracleRdbms?: OracleRdbms;
  /**
   * PostgreSQL RDBMS to enrich with child data objects and metadata.
   */
  postgresqlRdbms?: PostgresqlRdbms;
}

/**
 * Response from a discover request.
 */
export interface DiscoverConnectionProfileResponse {
  /**
   * Enriched MySQL RDBMS object.
   */
  mysqlRdbms?: MysqlRdbms;
  /**
   * Enriched Oracle RDBMS object.
   */
  oracleRdbms?: OracleRdbms;
  /**
   * Enriched PostgreSQL RDBMS object.
   */
  postgresqlRdbms?: PostgresqlRdbms;
}

/**
 * Configuration to drop large object values.
 */
export interface DropLargeObjects {
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
 * Represent a user-facing Error.
 */
export interface Error {
  /**
   * Additional information about the error.
   */
  details?: {
    [key: string]: string
  };
  /**
   * The time when the error occurred.
   */
  errorTime?: Date;
  /**
   * A unique identifier for this specific error, allowing it to be traced
   * throughout the system in logs and API responses.
   */
  errorUuid?: string;
  /**
   * A message containing more information about the error that occurred.
   */
  message?: string;
  /**
   * A title that explains the reason for the error.
   */
  reason?: string;
}

function serializeError(data: any): Error {
  return {
    ...data,
    errorTime: data["errorTime"] !== undefined ? data["errorTime"].toISOString() : undefined,
  };
}

function deserializeError(data: any): Error {
  return {
    ...data,
    errorTime: data["errorTime"] !== undefined ? new Date(data["errorTime"]) : undefined,
  };
}

/**
 * Response message for a 'FetchStaticIps' response.
 */
export interface FetchStaticIpsResponse {
  /**
   * A token that can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * list of static ips by account
   */
  staticIps?: string[];
}

/**
 * Forward SSH Tunnel connectivity.
 */
export interface ForwardSshTunnelConnectivity {
  /**
   * Required. Hostname for the SSH tunnel.
   */
  hostname?: string;
  /**
   * Input only. SSH password.
   */
  password?: string;
  /**
   * Port for the SSH tunnel, default value is 22.
   */
  port?: number;
  /**
   * Input only. SSH private key.
   */
  privateKey?: string;
  /**
   * Required. Username for the SSH tunnel.
   */
  username?: string;
}

/**
 * Google Cloud Storage destination configuration
 */
export interface GcsDestinationConfig {
  /**
   * AVRO file format configuration.
   */
  avroFileFormat?: AvroFileFormat;
  /**
   * The maximum duration for which new events are added before a file is
   * closed and a new file is created.
   */
  fileRotationInterval?: number /* Duration */;
  /**
   * The maximum file size to be saved in the bucket.
   */
  fileRotationMb?: number;
  /**
   * JSON file format configuration.
   */
  jsonFileFormat?: JsonFileFormat;
  /**
   * Path inside the Cloud Storage bucket to write data to.
   */
  path?: string;
}

function serializeGcsDestinationConfig(data: any): GcsDestinationConfig {
  return {
    ...data,
    fileRotationInterval: data["fileRotationInterval"] !== undefined ? data["fileRotationInterval"] : undefined,
  };
}

function deserializeGcsDestinationConfig(data: any): GcsDestinationConfig {
  return {
    ...data,
    fileRotationInterval: data["fileRotationInterval"] !== undefined ? data["fileRotationInterval"] : undefined,
  };
}

/**
 * Cloud Storage bucket profile.
 */
export interface GcsProfile {
  /**
   * Required. The Cloud Storage bucket name.
   */
  bucket?: string;
  /**
   * The root path inside the Cloud Storage bucket.
   */
  rootPath?: string;
}

/**
 * JSON file format configuration.
 */
export interface JsonFileFormat {
  /**
   * Compression of the loaded JSON file.
   */
  compression?:  | "JSON_COMPRESSION_UNSPECIFIED" | "NO_COMPRESSION" | "GZIP";
  /**
   * The schema file format along JSON data files.
   */
  schemaFileFormat?:  | "SCHEMA_FILE_FORMAT_UNSPECIFIED" | "NO_SCHEMA_FILE" | "AVRO_SCHEMA_FILE";
}

/**
 * Response message for listing connection profiles.
 */
export interface ListConnectionProfilesResponse {
  /**
   * List of connection profiles.
   */
  connectionProfiles?: ConnectionProfile[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
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
 * Response containing a list of private connection configurations.
 */
export interface ListPrivateConnectionsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * List of private connectivity configurations.
   */
  privateConnections?: PrivateConnection[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Route list response.
 */
export interface ListRoutesResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * List of Routes.
   */
  routes?: Route[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

/**
 * Response containing the objects for a stream.
 */
export interface ListStreamObjectsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page.
   */
  nextPageToken?: string;
  /**
   * List of stream objects.
   */
  streamObjects?: StreamObject[];
}

/**
 * Response message for listing streams.
 */
export interface ListStreamsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * List of streams
   */
  streams?: Stream[];
  /**
   * Locations that could not be reached.
   */
  unreachable?: string[];
}

function serializeListStreamsResponse(data: any): ListStreamsResponse {
  return {
    ...data,
    streams: data["streams"] !== undefined ? data["streams"].map((item: any) => (serializeStream(item))) : undefined,
  };
}

function deserializeListStreamsResponse(data: any): ListStreamsResponse {
  return {
    ...data,
    streams: data["streams"] !== undefined ? data["streams"].map((item: any) => (deserializeStream(item))) : undefined,
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
 * Request for looking up a specific stream object by its source object
 * identifier.
 */
export interface LookupStreamObjectRequest {
  /**
   * Required. The source object identifier which maps to the stream object.
   */
  sourceObjectIdentifier?: SourceObjectIdentifier;
}

/**
 * MySQL Column.
 */
export interface MysqlColumn {
  /**
   * Column collation.
   */
  collation?: string;
  /**
   * Column name.
   */
  column?: string;
  /**
   * The MySQL data type. Full data types list can be found here:
   * https://dev.mysql.com/doc/refman/8.0/en/data-types.html
   */
  dataType?: string;
  /**
   * Column length.
   */
  length?: number;
  /**
   * Whether or not the column can accept a null value.
   */
  nullable?: boolean;
  /**
   * The ordinal position of the column in the table.
   */
  ordinalPosition?: number;
  /**
   * Whether or not the column represents a primary key.
   */
  primaryKey?: boolean;
}

/**
 * MySQL database.
 */
export interface MysqlDatabase {
  /**
   * Database name.
   */
  database?: string;
  /**
   * Tables in the database.
   */
  mysqlTables?: MysqlTable[];
}

/**
 * Mysql data source object identifier.
 */
export interface MysqlObjectIdentifier {
  /**
   * Required. The database name.
   */
  database?: string;
  /**
   * Required. The table name.
   */
  table?: string;
}

/**
 * MySQL database profile.
 */
export interface MysqlProfile {
  /**
   * Required. Hostname for the MySQL connection.
   */
  hostname?: string;
  /**
   * Required. Input only. Password for the MySQL connection.
   */
  password?: string;
  /**
   * Port for the MySQL connection, default value is 3306.
   */
  port?: number;
  /**
   * SSL configuration for the MySQL connection.
   */
  sslConfig?: MysqlSslConfig;
  /**
   * Required. Username for the MySQL connection.
   */
  username?: string;
}

/**
 * MySQL database structure
 */
export interface MysqlRdbms {
  /**
   * Mysql databases on the server
   */
  mysqlDatabases?: MysqlDatabase[];
}

/**
 * MySQL source configuration
 */
export interface MysqlSourceConfig {
  /**
   * MySQL objects to exclude from the stream.
   */
  excludeObjects?: MysqlRdbms;
  /**
   * MySQL objects to retrieve from the source.
   */
  includeObjects?: MysqlRdbms;
  /**
   * Maximum number of concurrent backfill tasks. The number should be non
   * negative. If not set (or set to 0), the system's default value will be
   * used.
   */
  maxConcurrentBackfillTasks?: number;
  /**
   * Maximum number of concurrent CDC tasks. The number should be non negative.
   * If not set (or set to 0), the system's default value will be used.
   */
  maxConcurrentCdcTasks?: number;
}

/**
 * MySQL SSL configuration information.
 */
export interface MysqlSslConfig {
  /**
   * Input only. PEM-encoded certificate of the CA that signed the source
   * database server's certificate.
   */
  caCertificate?: string;
  /**
   * Output only. Indicates whether the ca_certificate field is set.
   */
  readonly caCertificateSet?: boolean;
  /**
   * Input only. PEM-encoded certificate that will be used by the replica to
   * authenticate against the source database server. If this field is used then
   * the 'client_key' and the 'ca_certificate' fields are mandatory.
   */
  clientCertificate?: string;
  /**
   * Output only. Indicates whether the client_certificate field is set.
   */
  readonly clientCertificateSet?: boolean;
  /**
   * Input only. PEM-encoded private key associated with the Client
   * Certificate. If this field is used then the 'client_certificate' and the
   * 'ca_certificate' fields are mandatory.
   */
  clientKey?: string;
  /**
   * Output only. Indicates whether the client_key field is set.
   */
  readonly clientKeySet?: boolean;
}

/**
 * MySQL table.
 */
export interface MysqlTable {
  /**
   * MySQL columns in the database. When unspecified as part of include/exclude
   * objects, includes/excludes everything.
   */
  mysqlColumns?: MysqlColumn[];
  /**
   * Table name.
   */
  table?: string;
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
   * Output only. Results of executed validations if there are any.
   */
  readonly validationResult?: ValidationResult;
  /**
   * Output only. Name of the verb executed by the operation.
   */
  readonly verb?: string;
}

/**
 * Oracle Column.
 */
export interface OracleColumn {
  /**
   * Column name.
   */
  column?: string;
  /**
   * The Oracle data type.
   */
  dataType?: string;
  /**
   * Column encoding.
   */
  encoding?: string;
  /**
   * Column length.
   */
  length?: number;
  /**
   * Whether or not the column can accept a null value.
   */
  nullable?: boolean;
  /**
   * The ordinal position of the column in the table.
   */
  ordinalPosition?: number;
  /**
   * Column precision.
   */
  precision?: number;
  /**
   * Whether or not the column represents a primary key.
   */
  primaryKey?: boolean;
  /**
   * Column scale.
   */
  scale?: number;
}

/**
 * Oracle data source object identifier.
 */
export interface OracleObjectIdentifier {
  /**
   * Required. The schema name.
   */
  schema?: string;
  /**
   * Required. The table name.
   */
  table?: string;
}

/**
 * Oracle database profile.
 */
export interface OracleProfile {
  /**
   * Connection string attributes
   */
  connectionAttributes?: {
    [key: string]: string
  };
  /**
   * Required. Database for the Oracle connection.
   */
  databaseService?: string;
  /**
   * Required. Hostname for the Oracle connection.
   */
  hostname?: string;
  /**
   * Required. Password for the Oracle connection.
   */
  password?: string;
  /**
   * Port for the Oracle connection, default value is 1521.
   */
  port?: number;
  /**
   * Required. Username for the Oracle connection.
   */
  username?: string;
}

/**
 * Oracle database structure.
 */
export interface OracleRdbms {
  /**
   * Oracle schemas/databases in the database server.
   */
  oracleSchemas?: OracleSchema[];
}

/**
 * Oracle schema.
 */
export interface OracleSchema {
  /**
   * Tables in the schema.
   */
  oracleTables?: OracleTable[];
  /**
   * Schema name.
   */
  schema?: string;
}

/**
 * Oracle data source configuration
 */
export interface OracleSourceConfig {
  /**
   * Drop large object values.
   */
  dropLargeObjects?: DropLargeObjects;
  /**
   * Oracle objects to exclude from the stream.
   */
  excludeObjects?: OracleRdbms;
  /**
   * Oracle objects to include in the stream.
   */
  includeObjects?: OracleRdbms;
  /**
   * Maximum number of concurrent backfill tasks. The number should be
   * non-negative. If not set (or set to 0), the system's default value is used.
   */
  maxConcurrentBackfillTasks?: number;
  /**
   * Maximum number of concurrent CDC tasks. The number should be non-negative.
   * If not set (or set to 0), the system's default value is used.
   */
  maxConcurrentCdcTasks?: number;
  /**
   * Stream large object values. NOTE: This feature is currently experimental.
   */
  streamLargeObjects?: StreamLargeObjects;
}

/**
 * Oracle table.
 */
export interface OracleTable {
  /**
   * Oracle columns in the schema. When unspecified as part of include/exclude
   * objects, includes/excludes everything.
   */
  oracleColumns?: OracleColumn[];
  /**
   * Table name.
   */
  table?: string;
}

/**
 * PostgreSQL Column.
 */
export interface PostgresqlColumn {
  /**
   * Column name.
   */
  column?: string;
  /**
   * The PostgreSQL data type.
   */
  dataType?: string;
  /**
   * Column length.
   */
  length?: number;
  /**
   * Whether or not the column can accept a null value.
   */
  nullable?: boolean;
  /**
   * The ordinal position of the column in the table.
   */
  ordinalPosition?: number;
  /**
   * Column precision.
   */
  precision?: number;
  /**
   * Whether or not the column represents a primary key.
   */
  primaryKey?: boolean;
  /**
   * Column scale.
   */
  scale?: number;
}

/**
 * PostgreSQL data source object identifier.
 */
export interface PostgresqlObjectIdentifier {
  /**
   * Required. The schema name.
   */
  schema?: string;
  /**
   * Required. The table name.
   */
  table?: string;
}

/**
 * PostgreSQL database profile.
 */
export interface PostgresqlProfile {
  /**
   * Required. Database for the PostgreSQL connection.
   */
  database?: string;
  /**
   * Required. Hostname for the PostgreSQL connection.
   */
  hostname?: string;
  /**
   * Required. Password for the PostgreSQL connection.
   */
  password?: string;
  /**
   * Port for the PostgreSQL connection, default value is 5432.
   */
  port?: number;
  /**
   * Required. Username for the PostgreSQL connection.
   */
  username?: string;
}

/**
 * PostgreSQL database structure.
 */
export interface PostgresqlRdbms {
  /**
   * PostgreSQL schemas in the database server.
   */
  postgresqlSchemas?: PostgresqlSchema[];
}

/**
 * PostgreSQL schema.
 */
export interface PostgresqlSchema {
  /**
   * Tables in the schema.
   */
  postgresqlTables?: PostgresqlTable[];
  /**
   * Schema name.
   */
  schema?: string;
}

/**
 * PostgreSQL data source configuration
 */
export interface PostgresqlSourceConfig {
  /**
   * PostgreSQL objects to exclude from the stream.
   */
  excludeObjects?: PostgresqlRdbms;
  /**
   * PostgreSQL objects to include in the stream.
   */
  includeObjects?: PostgresqlRdbms;
  /**
   * Maximum number of concurrent backfill tasks. The number should be non
   * negative. If not set (or set to 0), the system's default value will be
   * used.
   */
  maxConcurrentBackfillTasks?: number;
  /**
   * Required. The name of the publication that includes the set of all tables
   * that are defined in the stream's include_objects.
   */
  publication?: string;
  /**
   * Required. Immutable. The name of the logical replication slot that's
   * configured with the pgoutput plugin.
   */
  replicationSlot?: string;
}

/**
 * PostgreSQL table.
 */
export interface PostgresqlTable {
  /**
   * PostgreSQL columns in the schema. When unspecified as part of
   * include/exclude objects, includes/excludes everything.
   */
  postgresqlColumns?: PostgresqlColumn[];
  /**
   * Table name.
   */
  table?: string;
}

/**
 * The PrivateConnection resource is used to establish private connectivity
 * between Datastream and a customer's network.
 */
export interface PrivateConnection {
  /**
   * Output only. The create time of the resource.
   */
  readonly createTime?: Date;
  /**
   * Required. Display name.
   */
  displayName?: string;
  /**
   * Output only. In case of error, the details of the error in a user-friendly
   * format.
   */
  readonly error?: Error;
  /**
   * Labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The resource's name.
   */
  readonly name?: string;
  /**
   * Output only. The state of the Private Connection.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "CREATED" | "FAILED" | "DELETING" | "FAILED_TO_DELETE";
  /**
   * Output only. The update time of the resource.
   */
  readonly updateTime?: Date;
  /**
   * VPC Peering Config.
   */
  vpcPeeringConfig?: VpcPeeringConfig;
}

/**
 * Private Connectivity
 */
export interface PrivateConnectivity {
  /**
   * Required. A reference to a private connection resource. Format:
   * `projects/{project}/locations/{location}/privateConnections/{name}`
   */
  privateConnection?: string;
}

/**
 * Additional options for Datastream#projectsLocationsConnectionProfilesCreate.
 */
export interface ProjectsLocationsConnectionProfilesCreateOptions {
  /**
   * Required. The connection profile identifier.
   */
  connectionProfileId?: string;
  /**
   * Optional. Create the connection profile without validating it.
   */
  force?: boolean;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes since the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. Only validate the connection profile, but don't create any
   * resources. The default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Datastream#projectsLocationsConnectionProfilesDelete.
 */
export interface ProjectsLocationsConnectionProfilesDeleteOptions {
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
 * Additional options for Datastream#projectsLocationsConnectionProfilesList.
 */
export interface ProjectsLocationsConnectionProfilesListOptions {
  /**
   * Filter request.
   */
  filter?: string;
  /**
   * Order by fields for the result.
   */
  orderBy?: string;
  /**
   * Maximum number of connection profiles to return. If unspecified, at most
   * 50 connection profiles will be returned. The maximum value is 1000; values
   * above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Page token received from a previous `ListConnectionProfiles` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListConnectionProfiles` must match the call that provided the
   * page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Datastream#projectsLocationsConnectionProfilesPatch.
 */
export interface ProjectsLocationsConnectionProfilesPatchOptions {
  /**
   * Optional. Update the connection profile without validating it.
   */
  force?: boolean;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes since the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. Field mask is used to specify the fields to be overwritten in
   * the ConnectionProfile resource by the update. The fields specified in the
   * update_mask are relative to the resource, not the full request. A field
   * will be overwritten if it is in the mask. If the user does not provide a
   * mask then all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the connection profile, but don't update any
   * resources. The default is false.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsConnectionProfilesPatchOptions(data: any): ProjectsLocationsConnectionProfilesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsConnectionProfilesPatchOptions(data: any): ProjectsLocationsConnectionProfilesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Datastream#projectsLocationsFetchStaticIps.
 */
export interface ProjectsLocationsFetchStaticIpsOptions {
  /**
   * Maximum number of Ips to return, will likely not be specified.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListStaticIps` call. will likely
   * not be specified.
   */
  pageToken?: string;
}

/**
 * Additional options for Datastream#projectsLocationsList.
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
 * Additional options for Datastream#projectsLocationsOperationsList.
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
 * Additional options for Datastream#projectsLocationsPrivateConnectionsCreate.
 */
export interface ProjectsLocationsPrivateConnectionsCreateOptions {
  /**
   * Optional. If set to true, will skip validations.
   */
  force?: boolean;
  /**
   * Required. The private connectivity identifier.
   */
  privateConnectionId?: string;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes since the first request. For example, consider a
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
 * Additional options for Datastream#projectsLocationsPrivateConnectionsDelete.
 */
export interface ProjectsLocationsPrivateConnectionsDeleteOptions {
  /**
   * Optional. If set to true, any child routes that belong to this
   * PrivateConnection will also be deleted.
   */
  force?: boolean;
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
 * Additional options for Datastream#projectsLocationsPrivateConnectionsList.
 */
export interface ProjectsLocationsPrivateConnectionsListOptions {
  /**
   * Filter request.
   */
  filter?: string;
  /**
   * Order by fields for the result.
   */
  orderBy?: string;
  /**
   * Maximum number of private connectivity configurations to return. If
   * unspecified, at most 50 private connectivity configurations that will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * Page token received from a previous `ListPrivateConnections` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListPrivateConnections` must match the call that provided the
   * page token.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Datastream#projectsLocationsPrivateConnectionsRoutesCreate.
 */
export interface ProjectsLocationsPrivateConnectionsRoutesCreateOptions {
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes since the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. The Route identifier.
   */
  routeId?: string;
}

/**
 * Additional options for
 * Datastream#projectsLocationsPrivateConnectionsRoutesDelete.
 */
export interface ProjectsLocationsPrivateConnectionsRoutesDeleteOptions {
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
 * Datastream#projectsLocationsPrivateConnectionsRoutesList.
 */
export interface ProjectsLocationsPrivateConnectionsRoutesListOptions {
  /**
   * Filter request.
   */
  filter?: string;
  /**
   * Order by fields for the result.
   */
  orderBy?: string;
  /**
   * Maximum number of Routes to return. The service may return fewer than this
   * value. If unspecified, at most 50 Routes will be returned. The maximum
   * value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Page token received from a previous `ListRoutes` call. Provide this to
   * retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListRoutes` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Datastream#projectsLocationsStreamsCreate.
 */
export interface ProjectsLocationsStreamsCreateOptions {
  /**
   * Optional. Create the stream without validating it.
   */
  force?: boolean;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes since the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Required. The stream identifier.
   */
  streamId?: string;
  /**
   * Optional. Only validate the stream, but don't create any resources. The
   * default is false.
   */
  validateOnly?: boolean;
}

/**
 * Additional options for Datastream#projectsLocationsStreamsDelete.
 */
export interface ProjectsLocationsStreamsDeleteOptions {
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
 * Additional options for Datastream#projectsLocationsStreamsList.
 */
export interface ProjectsLocationsStreamsListOptions {
  /**
   * Filter request.
   */
  filter?: string;
  /**
   * Order by fields for the result.
   */
  orderBy?: string;
  /**
   * Maximum number of streams to return. If unspecified, at most 50 streams
   * will be returned. The maximum value is 1000; values above 1000 will be
   * coerced to 1000.
   */
  pageSize?: number;
  /**
   * Page token received from a previous `ListStreams` call. Provide this to
   * retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListStreams` must match the call that provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Datastream#projectsLocationsStreamsObjectsList.
 */
export interface ProjectsLocationsStreamsObjectsListOptions {
  /**
   * Maximum number of objects to return. Default is 50. The maximum value is
   * 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * Page token received from a previous `ListStreamObjectsRequest` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListStreamObjectsRequest` must match the call that
   * provided the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for Datastream#projectsLocationsStreamsPatch.
 */
export interface ProjectsLocationsStreamsPatchOptions {
  /**
   * Optional. Update the stream without validating it.
   */
  force?: boolean;
  /**
   * Optional. A request ID to identify requests. Specify a unique request ID
   * so that if you must retry your request, the server will know to ignore the
   * request if it has already been completed. The server will guarantee that
   * for at least 60 minutes since the first request. For example, consider a
   * situation where you make an initial request and the request times out. If
   * you make the request again with the same request ID, the server can check
   * if original operation with the same request ID was received, and if so,
   * will ignore the second request. This prevents clients from accidentally
   * creating duplicate commitments. The request ID must be a valid UUID with
   * the exception that zero UUID is not supported
   * (00000000-0000-0000-0000-000000000000).
   */
  requestId?: string;
  /**
   * Optional. Field mask is used to specify the fields to be overwritten in
   * the stream resource by the update. The fields specified in the update_mask
   * are relative to the resource, not the full request. A field will be
   * overwritten if it is in the mask. If the user does not provide a mask then
   * all fields will be overwritten.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional. Only validate the stream with the changes, without actually
   * updating it. The default is false.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsStreamsPatchOptions(data: any): ProjectsLocationsStreamsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsStreamsPatchOptions(data: any): ProjectsLocationsStreamsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * The route resource is the child of the private connection resource, used for
 * defining a route for a private connection.
 */
export interface Route {
  /**
   * Output only. The create time of the resource.
   */
  readonly createTime?: Date;
  /**
   * Required. Destination address for connection
   */
  destinationAddress?: string;
  /**
   * Destination port for connection
   */
  destinationPort?: number;
  /**
   * Required. Display name.
   */
  displayName?: string;
  /**
   * Labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The resource's name.
   */
  readonly name?: string;
  /**
   * Output only. The update time of the resource.
   */
  readonly updateTime?: Date;
}

/**
 * A single target dataset to which all data will be streamed.
 */
export interface SingleTargetDataset {
  /**
   * The dataset ID of the target dataset.
   */
  datasetId?: string;
}

/**
 * The configuration of the stream source.
 */
export interface SourceConfig {
  /**
   * MySQL data source configuration.
   */
  mysqlSourceConfig?: MysqlSourceConfig;
  /**
   * Oracle data source configuration.
   */
  oracleSourceConfig?: OracleSourceConfig;
  /**
   * PostgreSQL data source configuration.
   */
  postgresqlSourceConfig?: PostgresqlSourceConfig;
  /**
   * Required. Source connection profile resoource. Format:
   * `projects/{project}/locations/{location}/connectionProfiles/{name}`
   */
  sourceConnectionProfile?: string;
}

/**
 * Destination datasets are created so that hierarchy of the destination data
 * objects matches the source hierarchy.
 */
export interface SourceHierarchyDatasets {
  /**
   * The dataset template to use for dynamic dataset creation.
   */
  datasetTemplate?: DatasetTemplate;
}

/**
 * Represents an identifier of an object in the data source.
 */
export interface SourceObjectIdentifier {
  /**
   * Mysql data source object identifier.
   */
  mysqlIdentifier?: MysqlObjectIdentifier;
  /**
   * Oracle data source object identifier.
   */
  oracleIdentifier?: OracleObjectIdentifier;
  /**
   * PostgreSQL data source object identifier.
   */
  postgresqlIdentifier?: PostgresqlObjectIdentifier;
}

/**
 * Request for manually initiating a backfill job for a specific stream object.
 */
export interface StartBackfillJobRequest {
}

/**
 * Response for manually initiating a backfill job for a specific stream
 * object.
 */
export interface StartBackfillJobResponse {
  /**
   * The stream object resource a backfill job was started for.
   */
  object?: StreamObject;
}

/**
 * Static IP address connectivity. Used when the source database is configured
 * to allow incoming connections from the Datastream public IP addresses for the
 * region specified in the connection profile.
 */
export interface StaticServiceIpConnectivity {
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
 * Request for manually stopping a running backfill job for a specific stream
 * object.
 */
export interface StopBackfillJobRequest {
}

/**
 * Response for manually stop a backfill job for a specific stream object.
 */
export interface StopBackfillJobResponse {
  /**
   * The stream object resource the backfill job was stopped for.
   */
  object?: StreamObject;
}

/**
 * A resource representing streaming data from a source to a destination.
 */
export interface Stream {
  /**
   * Automatically backfill objects included in the stream source
   * configuration. Specific objects can be excluded.
   */
  backfillAll?: BackfillAllStrategy;
  /**
   * Do not automatically backfill any objects.
   */
  backfillNone?: BackfillNoneStrategy;
  /**
   * Output only. The creation time of the stream.
   */
  readonly createTime?: Date;
  /**
   * Immutable. A reference to a KMS encryption key. If provided, it will be
   * used to encrypt the data. If left blank, data will be encrypted using an
   * internal Stream-specific encryption key provisioned through KMS.
   */
  customerManagedEncryptionKey?: string;
  /**
   * Required. Destination connection profile configuration.
   */
  destinationConfig?: DestinationConfig;
  /**
   * Required. Display name.
   */
  displayName?: string;
  /**
   * Output only. Errors on the Stream.
   */
  readonly errors?: Error[];
  /**
   * Labels.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The stream's name.
   */
  readonly name?: string;
  /**
   * Required. Source connection profile configuration.
   */
  sourceConfig?: SourceConfig;
  /**
   * The state of the stream.
   */
  state?:  | "STATE_UNSPECIFIED" | "NOT_STARTED" | "RUNNING" | "PAUSED" | "MAINTENANCE" | "FAILED" | "FAILED_PERMANENTLY" | "STARTING" | "DRAINING";
  /**
   * Output only. The last update time of the stream.
   */
  readonly updateTime?: Date;
}

function serializeStream(data: any): Stream {
  return {
    ...data,
    destinationConfig: data["destinationConfig"] !== undefined ? serializeDestinationConfig(data["destinationConfig"]) : undefined,
  };
}

function deserializeStream(data: any): Stream {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    destinationConfig: data["destinationConfig"] !== undefined ? deserializeDestinationConfig(data["destinationConfig"]) : undefined,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (deserializeError(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Configuration to stream large object values.
 */
export interface StreamLargeObjects {
}

/**
 * A specific stream object (e.g a specific DB table).
 */
export interface StreamObject {
  /**
   * The latest backfill job that was initiated for the stream object.
   */
  backfillJob?: BackfillJob;
  /**
   * Output only. The creation time of the object.
   */
  readonly createTime?: Date;
  /**
   * Required. Display name.
   */
  displayName?: string;
  /**
   * Output only. Active errors on the object.
   */
  readonly errors?: Error[];
  /**
   * Output only. The object resource's name.
   */
  readonly name?: string;
  /**
   * The object identifier in the data source.
   */
  sourceObject?: SourceObjectIdentifier;
  /**
   * Output only. The last update time of the object.
   */
  readonly updateTime?: Date;
}

/**
 * A validation to perform on a stream.
 */
export interface Validation {
  /**
   * A custom code identifying this validation.
   */
  code?: string;
  /**
   * A short description of the validation.
   */
  description?: string;
  /**
   * Messages reflecting the validation results.
   */
  message?: ValidationMessage[];
  /**
   * Validation execution status.
   */
  state?:  | "STATE_UNSPECIFIED" | "NOT_EXECUTED" | "FAILED" | "PASSED";
}

/**
 * Represent user-facing validation result message.
 */
export interface ValidationMessage {
  /**
   * A custom code identifying this specific message.
   */
  code?: string;
  /**
   * Message severity level (warning or error).
   */
  level?:  | "LEVEL_UNSPECIFIED" | "WARNING" | "ERROR";
  /**
   * The result of the validation.
   */
  message?: string;
  /**
   * Additional metadata related to the result.
   */
  metadata?: {
    [key: string]: string
  };
}

/**
 * Contains the current validation results.
 */
export interface ValidationResult {
  /**
   * A list of validations (includes both executed as well as not executed
   * validations).
   */
  validations?: Validation[];
}

/**
 * The VPC Peering configuration is used to create VPC peering between
 * Datastream and the consumer's VPC.
 */
export interface VpcPeeringConfig {
  /**
   * Required. A free subnet for peering. (CIDR of /29)
   */
  subnet?: string;
  /**
   * Required. Fully qualified name of the VPC that Datastream will peer to.
   * Format: `projects/{project}/global/{networks}/{name}`
   */
  vpc?: string;
}