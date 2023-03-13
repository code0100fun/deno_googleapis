// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Composer API Client for Deno
 * ==================================
 * 
 * Manages Apache Airflow environments on Google Cloud Platform.
 * 
 * Docs: https://cloud.google.com/composer/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages Apache Airflow environments on Google Cloud Platform.
 */
export class Composer {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://composer.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Create a new environment.
   *
   * @param parent The parent must be of the form "projects/{projectId}/locations/{locationId}".
   */
  async projectsLocationsEnvironmentsCreate(parent: string, req: Environment): Promise<Operation> {
    req = serializeEnvironment(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/environments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Delete an environment.
   *
   * @param name The environment to delete, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
   */
  async projectsLocationsEnvironmentsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Get an existing environment.
   *
   * @param name The resource name of the environment to get, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
   */
  async projectsLocationsEnvironmentsGet(name: string): Promise<Environment> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeEnvironment(data);
  }

  /**
   * List environments.
   *
   * @param parent List environments in the given project and location, in the form: "projects/{projectId}/locations/{locationId}"
   */
  async projectsLocationsEnvironmentsList(parent: string, opts: ProjectsLocationsEnvironmentsListOptions = {}): Promise<ListEnvironmentsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/environments`);
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
    return deserializeListEnvironmentsResponse(data);
  }

  /**
   * Loads a snapshot of a Cloud Composer environment. As a result of this
   * operation, a snapshot of environment's specified in LoadSnapshotRequest is
   * loaded into the environment.
   *
   * @param environment The resource name of the target environment in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
   */
  async projectsLocationsEnvironmentsLoadSnapshot(environment: string, req: LoadSnapshotRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ environment }:loadSnapshot`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Update an environment.
   *
   * @param name The relative resource name of the environment to update, in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
   */
  async projectsLocationsEnvironmentsPatch(name: string, req: Environment, opts: ProjectsLocationsEnvironmentsPatchOptions = {}): Promise<Operation> {
    req = serializeEnvironment(req);
    opts = serializeProjectsLocationsEnvironmentsPatchOptions(opts);
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
   * Creates a snapshots of a Cloud Composer environment. As a result of this
   * operation, snapshot of environment's state is stored in a location
   * specified in the SaveSnapshotRequest.
   *
   * @param environment The resource name of the source environment in the form: "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
   */
  async projectsLocationsEnvironmentsSaveSnapshot(environment: string, req: SaveSnapshotRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ environment }:saveSnapshot`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * List ImageVersions for provided location.
   *
   * @param parent List ImageVersions in the given project and location, in the form: "projects/{projectId}/locations/{locationId}"
   */
  async projectsLocationsImageVersionsList(parent: string, opts: ProjectsLocationsImageVersionsListOptions = {}): Promise<ListImageVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/imageVersions`);
    if (opts.includePastReleases !== undefined) {
      url.searchParams.append("includePastReleases", String(opts.includePastReleases));
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
    return data as ListImageVersionsResponse;
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
}

/**
 * Allowed IP range with user-provided description.
 */
export interface AllowedIpRange {
  /**
   * Optional. User-provided description. It must contain at most 300
   * characters.
   */
  description?: string;
  /**
   * IP address or range, defined using CIDR notation, of requests that this
   * rule applies to. Examples: `192.168.1.1` or `192.168.0.0/16` or
   * `2001:db8::/32` or `2001:0db8:0000:0042:0000:8a2e:0370:7334`. IP range
   * prefixes should be properly truncated. For example, `1.2.3.4/24` should be
   * truncated to `1.2.3.0/24`. Similarly, for IPv6, `2001:db8::1/32` should be
   * truncated to `2001:db8::/32`.
   */
  value?: string;
}

/**
 * Message containing information about the result of an upgrade check
 * operation.
 */
export interface CheckUpgradeResponse {
  /**
   * Output only. Url for a docker build log of an upgraded image.
   */
  readonly buildLogUri?: string;
  /**
   * Output only. Whether build has succeeded or failed on modules conflicts.
   */
  readonly containsPypiModulesConflict?:  | "CONFLICT_RESULT_UNSPECIFIED" | "CONFLICT" | "NO_CONFLICT";
  /**
   * Composer image for which the build was happening.
   */
  imageVersion?: string;
  /**
   * Output only. Extract from a docker image build log containing information
   * about pypi modules conflicts.
   */
  readonly pypiConflictBuildLogExtract?: string;
  /**
   * Pypi dependencies specified in the environment configuration, at the time
   * when the build was triggered.
   */
  pypiDependencies?: {
    [key: string]: string
  };
}

/**
 * CIDR block with an optional name.
 */
export interface CidrBlock {
  /**
   * CIDR block that must be specified in CIDR notation.
   */
  cidrBlock?: string;
  /**
   * User-defined name that identifies the CIDR block.
   */
  displayName?: string;
}

/**
 * The configuration of Cloud SQL instance that is used by the Apache Airflow
 * software.
 */
export interface DatabaseConfig {
  /**
   * Optional. Cloud SQL machine type used by Airflow database. It has to be
   * one of: db-n1-standard-2, db-n1-standard-4, db-n1-standard-8 or
   * db-n1-standard-16. If not specified, db-n1-standard-2 will be used.
   * Supported for Cloud Composer environments in versions
   * composer-1.*.*-airflow-*.*.*.
   */
  machineType?: string;
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
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface Empty {
}

/**
 * The encryption options for the Cloud Composer environment and its
 * dependencies.Supported for Cloud Composer environments in versions
 * composer-1.*.*-airflow-*.*.*.
 */
export interface EncryptionConfig {
  /**
   * Optional. Customer-managed Encryption Key available through Google's Key
   * Management Service. Cannot be updated. If not specified, Google-managed key
   * will be used.
   */
  kmsKeyName?: string;
}

/**
 * An environment for running orchestration tasks.
 */
export interface Environment {
  /**
   * Configuration parameters for this environment.
   */
  config?: EnvironmentConfig;
  /**
   * Output only. The time at which this environment was created.
   */
  createTime?: Date;
  /**
   * Optional. User-defined labels for this environment. The labels map can
   * contain no more than 64 entries. Entries of the labels map are UTF8 strings
   * that comply with the following restrictions: * Keys must conform to regexp:
   * \p{Ll}\p{Lo}{0,62} * Values must conform to regexp:
   * [\p{Ll}\p{Lo}\p{N}_-]{0,63} * Both keys and values are additionally
   * constrained to be <= 128 bytes in size.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The resource name of the environment, in the form:
   * "projects/{projectId}/locations/{locationId}/environments/{environmentId}"
   * EnvironmentId must start with a lowercase letter followed by up to 63
   * lowercase letters, numbers, or hyphens, and cannot end with a hyphen.
   */
  name?: string;
  /**
   * The current state of the environment.
   */
  state?:  | "STATE_UNSPECIFIED" | "CREATING" | "RUNNING" | "UPDATING" | "DELETING" | "ERROR";
  /**
   * Output only. The time at which this environment was last modified.
   */
  updateTime?: Date;
  /**
   * Output only. The UUID (Universally Unique IDentifier) associated with this
   * environment. This value is generated when the environment is created.
   */
  uuid?: string;
}

function serializeEnvironment(data: any): Environment {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeEnvironmentConfig(data["config"]) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeEnvironment(data: any): Environment {
  return {
    ...data,
    config: data["config"] !== undefined ? deserializeEnvironmentConfig(data["config"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Configuration information for an environment.
 */
export interface EnvironmentConfig {
  /**
   * Output only. The URI of the Apache Airflow Web UI hosted within this
   * environment (see [Airflow web
   * interface](/composer/docs/how-to/accessing/airflow-web-interface)).
   */
  airflowUri?: string;
  /**
   * Output only. The Cloud Storage prefix of the DAGs for this environment.
   * Although Cloud Storage objects reside in a flat namespace, a hierarchical
   * file tree can be simulated using "/"-delimited object name prefixes. DAG
   * objects for this environment reside in a simulated directory with the given
   * prefix.
   */
  dagGcsPrefix?: string;
  /**
   * Optional. The configuration settings for Cloud SQL instance used
   * internally by Apache Airflow software.
   */
  databaseConfig?: DatabaseConfig;
  /**
   * Optional. The encryption options for the Cloud Composer environment and
   * its dependencies. Cannot be updated.
   */
  encryptionConfig?: EncryptionConfig;
  /**
   * Optional. The size of the Cloud Composer environment. This field is
   * supported for Cloud Composer environments in versions
   * composer-2.*.*-airflow-*.*.* and newer.
   */
  environmentSize?:  | "ENVIRONMENT_SIZE_UNSPECIFIED" | "ENVIRONMENT_SIZE_SMALL" | "ENVIRONMENT_SIZE_MEDIUM" | "ENVIRONMENT_SIZE_LARGE";
  /**
   * Output only. The Kubernetes Engine cluster used to run this environment.
   */
  gkeCluster?: string;
  /**
   * Optional. The maintenance window is the period when Cloud Composer
   * components may undergo maintenance. It is defined so that maintenance is
   * not executed during peak hours or critical time periods. The system will
   * not be under maintenance for every occurrence of this window, but when
   * maintenance is planned, it will be scheduled during the window. The
   * maintenance window period must encompass at least 12 hours per week. This
   * may be split into multiple chunks, each with a size of at least 4 hours. If
   * this value is omitted, the default value for maintenance window will be
   * applied. The default value is Saturday and Sunday 00-06 GMT.
   */
  maintenanceWindow?: MaintenanceWindow;
  /**
   * Optional. The configuration options for GKE cluster master authorized
   * networks. By default master authorized networks feature is: - in case of
   * private environment: enabled with no external networks allowlisted. - in
   * case of public environment: disabled.
   */
  masterAuthorizedNetworksConfig?: MasterAuthorizedNetworksConfig;
  /**
   * The configuration used for the Kubernetes Engine cluster.
   */
  nodeConfig?: NodeConfig;
  /**
   * The number of nodes in the Kubernetes Engine cluster that will be used to
   * run this environment. This field is supported for Cloud Composer
   * environments in versions composer-1.*.*-airflow-*.*.*.
   */
  nodeCount?: number;
  /**
   * The configuration used for the Private IP Cloud Composer environment.
   */
  privateEnvironmentConfig?: PrivateEnvironmentConfig;
  /**
   * Optional. The Recovery settings configuration of an environment. This
   * field is supported for Cloud Composer environments in versions
   * composer-2.*.*-airflow-*.*.* and newer.
   */
  recoveryConfig?: RecoveryConfig;
  /**
   * The configuration settings for software inside the environment.
   */
  softwareConfig?: SoftwareConfig;
  /**
   * Optional. The configuration settings for the Airflow web server App Engine
   * instance.
   */
  webServerConfig?: WebServerConfig;
  /**
   * Optional. The network-level access control policy for the Airflow web
   * server. If unspecified, no network-level access restrictions will be
   * applied.
   */
  webServerNetworkAccessControl?: WebServerNetworkAccessControl;
  /**
   * Optional. The workloads configuration settings for the GKE cluster
   * associated with the Cloud Composer environment. The GKE cluster runs
   * Airflow scheduler, web server and workers workloads. This field is
   * supported for Cloud Composer environments in versions
   * composer-2.*.*-airflow-*.*.* and newer.
   */
  workloadsConfig?: WorkloadsConfig;
}

function serializeEnvironmentConfig(data: any): EnvironmentConfig {
  return {
    ...data,
    maintenanceWindow: data["maintenanceWindow"] !== undefined ? serializeMaintenanceWindow(data["maintenanceWindow"]) : undefined,
  };
}

function deserializeEnvironmentConfig(data: any): EnvironmentConfig {
  return {
    ...data,
    maintenanceWindow: data["maintenanceWindow"] !== undefined ? deserializeMaintenanceWindow(data["maintenanceWindow"]) : undefined,
  };
}

/**
 * ImageVersion information
 */
export interface ImageVersion {
  /**
   * Whether it is impossible to create an environment with the image version.
   */
  creationDisabled?: boolean;
  /**
   * The string identifier of the ImageVersion, in the form:
   * "composer-x.y.z-airflow-a.b.c"
   */
  imageVersionId?: string;
  /**
   * Whether this is the default ImageVersion used by Composer during
   * environment creation if no input ImageVersion is specified.
   */
  isDefault?: boolean;
  /**
   * The date of the version release.
   */
  releaseDate?: Date;
  /**
   * supported python versions
   */
  supportedPythonVersions?: string[];
  /**
   * Whether it is impossible to upgrade an environment running with the image
   * version.
   */
  upgradeDisabled?: boolean;
}

/**
 * Configuration for controlling how IPs are allocated in the GKE cluster
 * running the Apache Airflow software.
 */
export interface IPAllocationPolicy {
  /**
   * Optional. The IP address range used to allocate IP addresses to pods in
   * the GKE cluster. For Cloud Composer environments in versions
   * composer-1.*.*-airflow-*.*.*, this field is applicable only when
   * `use_ip_aliases` is true. Set to blank to have GKE choose a range with the
   * default size. Set to /netmask (e.g. `/14`) to have GKE choose a range with
   * a specific netmask. Set to a
   * [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
   * notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g.
   * `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range
   * to use.
   */
  clusterIpv4CidrBlock?: string;
  /**
   * Optional. The name of the GKE cluster's secondary range used to allocate
   * IP addresses to pods. For Cloud Composer environments in versions
   * composer-1.*.*-airflow-*.*.*, this field is applicable only when
   * `use_ip_aliases` is true.
   */
  clusterSecondaryRangeName?: string;
  /**
   * Optional. The IP address range of the services IP addresses in this GKE
   * cluster. For Cloud Composer environments in versions
   * composer-1.*.*-airflow-*.*.*, this field is applicable only when
   * `use_ip_aliases` is true. Set to blank to have GKE choose a range with the
   * default size. Set to /netmask (e.g. `/14`) to have GKE choose a range with
   * a specific netmask. Set to a
   * [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
   * notation (e.g. `10.96.0.0/14`) from the RFC-1918 private networks (e.g.
   * `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) to pick a specific range
   * to use.
   */
  servicesIpv4CidrBlock?: string;
  /**
   * Optional. The name of the services' secondary range used to allocate IP
   * addresses to the GKE cluster. For Cloud Composer environments in versions
   * composer-1.*.*-airflow-*.*.*, this field is applicable only when
   * `use_ip_aliases` is true.
   */
  servicesSecondaryRangeName?: string;
  /**
   * Optional. Whether or not to enable Alias IPs in the GKE cluster. If
   * `true`, a VPC-native cluster is created. This field is only supported for
   * Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.
   * Environments in newer versions always use VPC-native GKE clusters.
   */
  useIpAliases?: boolean;
}

/**
 * The environments in a project and location.
 */
export interface ListEnvironmentsResponse {
  /**
   * The list of environments returned by a ListEnvironmentsRequest.
   */
  environments?: Environment[];
  /**
   * The page token used to query for the next page if one exists.
   */
  nextPageToken?: string;
}

function serializeListEnvironmentsResponse(data: any): ListEnvironmentsResponse {
  return {
    ...data,
    environments: data["environments"] !== undefined ? data["environments"].map((item: any) => (serializeEnvironment(item))) : undefined,
  };
}

function deserializeListEnvironmentsResponse(data: any): ListEnvironmentsResponse {
  return {
    ...data,
    environments: data["environments"] !== undefined ? data["environments"].map((item: any) => (deserializeEnvironment(item))) : undefined,
  };
}

/**
 * The ImageVersions in a project and location.
 */
export interface ListImageVersionsResponse {
  /**
   * The list of supported ImageVersions in a location.
   */
  imageVersions?: ImageVersion[];
  /**
   * The page token used to query for the next page if one exists.
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
 * Request to load a snapshot into a Cloud Composer environment.
 */
export interface LoadSnapshotRequest {
  /**
   * Whether or not to skip setting Airflow overrides when loading the
   * environment's state.
   */
  skipAirflowOverridesSetting?: boolean;
  /**
   * Whether or not to skip setting environment variables when loading the
   * environment's state.
   */
  skipEnvironmentVariablesSetting?: boolean;
  /**
   * Whether or not to skip copying Cloud Storage data when loading the
   * environment's state.
   */
  skipGcsDataCopying?: boolean;
  /**
   * Whether or not to skip installing Pypi packages when loading the
   * environment's state.
   */
  skipPypiPackagesInstallation?: boolean;
  /**
   * A Cloud Storage path to a snapshot to load, e.g.:
   * "gs://my-bucket/snapshots/project_location_environment_timestamp".
   */
  snapshotPath?: string;
}

/**
 * Response to LoadSnapshotRequest.
 */
export interface LoadSnapshotResponse {
}

/**
 * The configuration settings for Cloud Composer maintenance window. The
 * following example: ``` { "startTime":"2019-08-01T01:00:00Z"
 * "endTime":"2019-08-01T07:00:00Z" "recurrence":"FREQ=WEEKLY;BYDAY=TU,WE" } ```
 * would define a maintenance window between 01 and 07 hours UTC during each
 * Tuesday and Wednesday.
 */
export interface MaintenanceWindow {
  /**
   * Required. Maintenance window end time. It is used only to calculate the
   * duration of the maintenance window. The value for end-time must be in the
   * future, relative to `start_time`.
   */
  endTime?: Date;
  /**
   * Required. Maintenance window recurrence. Format is a subset of
   * [RFC-5545](https://tools.ietf.org/html/rfc5545) `RRULE`. The only allowed
   * values for `FREQ` field are `FREQ=DAILY` and `FREQ=WEEKLY;BYDAY=...`
   * Example values: `FREQ=WEEKLY;BYDAY=TU,WE`, `FREQ=DAILY`.
   */
  recurrence?: string;
  /**
   * Required. Start time of the first recurrence of the maintenance window.
   */
  startTime?: Date;
}

function serializeMaintenanceWindow(data: any): MaintenanceWindow {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeMaintenanceWindow(data: any): MaintenanceWindow {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Configuration options for the master authorized networks feature. Enabled
 * master authorized networks will disallow all external traffic to access
 * Kubernetes master through HTTPS except traffic from the given CIDR blocks,
 * Google Compute Engine Public IPs and Google Prod IPs.
 */
export interface MasterAuthorizedNetworksConfig {
  /**
   * Up to 50 external networks that could access Kubernetes master through
   * HTTPS.
   */
  cidrBlocks?: CidrBlock[];
  /**
   * Whether or not master authorized networks feature is enabled.
   */
  enabled?: boolean;
}

/**
 * Configuration options for networking connections in the Composer 2
 * environment.
 */
export interface NetworkingConfig {
  /**
   * Optional. Indicates the user requested specifc connection type between
   * Tenant and Customer projects. You cannot set networking connection type in
   * public IP environment.
   */
  connectionType?:  | "CONNECTION_TYPE_UNSPECIFIED" | "VPC_PEERING" | "PRIVATE_SERVICE_CONNECT";
}

/**
 * The configuration information for the Kubernetes Engine nodes running the
 * Apache Airflow software.
 */
export interface NodeConfig {
  /**
   * Optional. The disk size in GB used for node VMs. Minimum size is 30GB. If
   * unspecified, defaults to 100GB. Cannot be updated. This field is supported
   * for Cloud Composer environments in versions composer-1.*.*-airflow-*.*.*.
   */
  diskSizeGb?: number;
  /**
   * Optional. Deploys 'ip-masq-agent' daemon set in the GKE cluster and
   * defines nonMasqueradeCIDRs equals to pod IP range so IP masquerading is
   * used for all destination addresses, except between pods traffic. See:
   * https://cloud.google.com/kubernetes-engine/docs/how-to/ip-masquerade-agent
   */
  enableIpMasqAgent?: boolean;
  /**
   * Optional. The configuration for controlling how IPs are allocated in the
   * GKE cluster.
   */
  ipAllocationPolicy?: IPAllocationPolicy;
  /**
   * Optional. The Compute Engine [zone](/compute/docs/regions-zones) in which
   * to deploy the VMs used to run the Apache Airflow software, specified as a
   * [relative resource
   * name](/apis/design/resource_names#relative_resource_name). For example:
   * "projects/{projectId}/zones/{zoneId}". This `location` must belong to the
   * enclosing environment's project and location. If both this field and
   * `nodeConfig.machineType` are specified, `nodeConfig.machineType` must
   * belong to this `location`; if both are unspecified, the service will pick a
   * zone in the Compute Engine region corresponding to the Cloud Composer
   * location, and propagate that choice to both fields. If only one field
   * (`location` or `nodeConfig.machineType`) is specified, the location
   * information from the specified field will be propagated to the unspecified
   * field. This field is supported for Cloud Composer environments in versions
   * composer-1.*.*-airflow-*.*.*.
   */
  location?: string;
  /**
   * Optional. The Compute Engine [machine type](/compute/docs/machine-types)
   * used for cluster instances, specified as a [relative resource
   * name](/apis/design/resource_names#relative_resource_name). For example:
   * "projects/{projectId}/zones/{zoneId}/machineTypes/{machineTypeId}". The
   * `machineType` must belong to the enclosing environment's project and
   * location. If both this field and `nodeConfig.location` are specified, this
   * `machineType` must belong to the `nodeConfig.location`; if both are
   * unspecified, the service will pick a zone in the Compute Engine region
   * corresponding to the Cloud Composer location, and propagate that choice to
   * both fields. If exactly one of this field and `nodeConfig.location` is
   * specified, the location information from the specified field will be
   * propagated to the unspecified field. The `machineTypeId` must not be a
   * [shared-core machine type](/compute/docs/machine-types#sharedcore). If this
   * field is unspecified, the `machineTypeId` defaults to "n1-standard-1". This
   * field is supported for Cloud Composer environments in versions
   * composer-1.*.*-airflow-*.*.*.
   */
  machineType?: string;
  /**
   * Optional. The Compute Engine network to be used for machine
   * communications, specified as a [relative resource
   * name](/apis/design/resource_names#relative_resource_name). For example:
   * "projects/{projectId}/global/networks/{networkId}". If unspecified, the
   * "default" network ID in the environment's project is used. If a [Custom
   * Subnet Network](/vpc/docs/vpc#vpc_networks_and_subnets) is provided,
   * `nodeConfig.subnetwork` must also be provided. For [Shared
   * VPC](/vpc/docs/shared-vpc) subnetwork requirements, see
   * `nodeConfig.subnetwork`.
   */
  network?: string;
  /**
   * Optional. The set of Google API scopes to be made available on all node
   * VMs. If `oauth_scopes` is empty, defaults to
   * ["https://www.googleapis.com/auth/cloud-platform"]. Cannot be updated. This
   * field is supported for Cloud Composer environments in versions
   * composer-1.*.*-airflow-*.*.*.
   */
  oauthScopes?: string[];
  /**
   * Optional. The Google Cloud Platform Service Account to be used by the node
   * VMs. If a service account is not specified, the "default" Compute Engine
   * service account is used. Cannot be updated.
   */
  serviceAccount?: string;
  /**
   * Optional. The Compute Engine subnetwork to be used for machine
   * communications, specified as a [relative resource
   * name](/apis/design/resource_names#relative_resource_name). For example:
   * "projects/{projectId}/regions/{regionId}/subnetworks/{subnetworkId}" If a
   * subnetwork is provided, `nodeConfig.network` must also be provided, and the
   * subnetwork must belong to the enclosing environment's project and location.
   */
  subnetwork?: string;
  /**
   * Optional. The list of instance tags applied to all node VMs. Tags are used
   * to identify valid sources or targets for network firewalls. Each tag within
   * the list must comply with [RFC1035](https://www.ietf.org/rfc/rfc1035.txt).
   * Cannot be updated.
   */
  tags?: string[];
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
 * Metadata describing an operation.
 */
export interface OperationMetadata {
  /**
   * Output only. The time the operation was submitted to the server.
   */
  createTime?: Date;
  /**
   * Output only. The time when the operation terminated, regardless of its
   * success. This field is unset if the operation is still ongoing.
   */
  endTime?: Date;
  /**
   * Output only. The type of operation being performed.
   */
  operationType?:  | "TYPE_UNSPECIFIED" | "CREATE" | "DELETE" | "UPDATE" | "CHECK" | "SAVE_SNAPSHOT" | "LOAD_SNAPSHOT";
  /**
   * Output only. The resource being operated on, as a [relative resource
   * name]( /apis/design/resource_names#relative_resource_name).
   */
  resource?: string;
  /**
   * Output only. The UUID of the resource being operated on.
   */
  resourceUuid?: string;
  /**
   * Output only. The current operation state.
   */
  state?:  | "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "SUCCESSFUL" | "FAILED";
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
 * Configuration options for the private GKE cluster in a Cloud Composer
 * environment.
 */
export interface PrivateClusterConfig {
  /**
   * Optional. If `true`, access to the public endpoint of the GKE cluster is
   * denied.
   */
  enablePrivateEndpoint?: boolean;
  /**
   * Optional. The CIDR block from which IPv4 range for GKE master will be
   * reserved. If left blank, the default value of '172.16.0.0/23' is used.
   */
  masterIpv4CidrBlock?: string;
  /**
   * Output only. The IP range in CIDR notation to use for the hosted master
   * network. This range is used for assigning internal IP addresses to the GKE
   * cluster master or set of masters and to the internal load balancer virtual
   * IP. This range must not overlap with any other ranges in use within the
   * cluster's network.
   */
  readonly masterIpv4ReservedRange?: string;
}

/**
 * The configuration information for configuring a Private IP Cloud Composer
 * environment.
 */
export interface PrivateEnvironmentConfig {
  /**
   * Optional. When specified, the environment will use Private Service Connect
   * instead of VPC peerings to connect to Cloud SQL in the Tenant Project, and
   * the PSC endpoint in the Customer Project will use an IP address from this
   * subnetwork.
   */
  cloudComposerConnectionSubnetwork?: string;
  /**
   * Optional. The CIDR block from which IP range for Cloud Composer Network in
   * tenant project will be reserved. Needs to be disjoint from
   * private_cluster_config.master_ipv4_cidr_block and
   * cloud_sql_ipv4_cidr_block. This field is supported for Cloud Composer
   * environments in versions composer-2.*.*-airflow-*.*.* and newer.
   */
  cloudComposerNetworkIpv4CidrBlock?: string;
  /**
   * Output only. The IP range reserved for the tenant project's Cloud Composer
   * network. This field is supported for Cloud Composer environments in
   * versions composer-2.*.*-airflow-*.*.* and newer.
   */
  readonly cloudComposerNetworkIpv4ReservedRange?: string;
  /**
   * Optional. The CIDR block from which IP range in tenant project will be
   * reserved for Cloud SQL. Needs to be disjoint from
   * `web_server_ipv4_cidr_block`.
   */
  cloudSqlIpv4CidrBlock?: string;
  /**
   * Optional. If `true`, a Private IP Cloud Composer environment is created.
   * If this field is set to true, `IPAllocationPolicy.use_ip_aliases` must be
   * set to true for Cloud Composer environments in versions
   * composer-1.*.*-airflow-*.*.*.
   */
  enablePrivateEnvironment?: boolean;
  /**
   * Optional. When enabled, IPs from public (non-RFC1918) ranges can be used
   * for `IPAllocationPolicy.cluster_ipv4_cidr_block` and
   * `IPAllocationPolicy.service_ipv4_cidr_block`.
   */
  enablePrivatelyUsedPublicIps?: boolean;
  /**
   * Optional. Configuration for the network connections configuration in the
   * environment.
   */
  networkingConfig?: NetworkingConfig;
  /**
   * Optional. Configuration for the private GKE cluster for a Private IP Cloud
   * Composer environment.
   */
  privateClusterConfig?: PrivateClusterConfig;
  /**
   * Optional. The CIDR block from which IP range for web server will be
   * reserved. Needs to be disjoint from
   * `private_cluster_config.master_ipv4_cidr_block` and
   * `cloud_sql_ipv4_cidr_block`. This field is supported for Cloud Composer
   * environments in versions composer-1.*.*-airflow-*.*.*.
   */
  webServerIpv4CidrBlock?: string;
  /**
   * Output only. The IP range reserved for the tenant project's App Engine
   * VMs. This field is supported for Cloud Composer environments in versions
   * composer-1.*.*-airflow-*.*.*.
   */
  readonly webServerIpv4ReservedRange?: string;
}

/**
 * Additional options for Composer#projectsLocationsEnvironmentsList.
 */
export interface ProjectsLocationsEnvironmentsListOptions {
  /**
   * The maximum number of environments to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for Composer#projectsLocationsEnvironmentsPatch.
 */
export interface ProjectsLocationsEnvironmentsPatchOptions {
  /**
   * Required. A comma-separated list of paths, relative to `Environment`, of
   * fields to update. For example, to set the version of scikit-learn to
   * install in the environment to 0.19.0 and to remove an existing installation
   * of numpy, the `updateMask` parameter would include the following two
   * `paths` values: "config.softwareConfig.pypiPackages.scikit-learn" and
   * "config.softwareConfig.pypiPackages.numpy". The included patch environment
   * would specify the scikit-learn version as follows: { "config":{
   * "softwareConfig":{ "pypiPackages":{ "scikit-learn":"==0.19.0" } } } } Note
   * that in the above example, any existing PyPI packages other than
   * scikit-learn and numpy will be unaffected. Only one update type may be
   * included in a single request's `updateMask`. For example, one cannot update
   * both the PyPI packages and labels in the same request. However, it is
   * possible to update multiple members of a map field simultaneously in the
   * same request. For example, to set the labels "label1" and "label2" while
   * clearing "label3" (assuming it already exists), one can provide the paths
   * "labels.label1", "labels.label2", and "labels.label3" and populate the
   * patch environment as follows: { "labels":{ "label1":"new-label1-value"
   * "label2":"new-label2-value" } } Note that in the above example, any
   * existing labels that are not included in the `updateMask` will be
   * unaffected. It is also possible to replace an entire map field by providing
   * the map field's path in the `updateMask`. The new value of the field will
   * be that which is provided in the patch environment. For example, to delete
   * all pre-existing user-specified PyPI packages and install botocore at
   * version 1.7.14, the `updateMask` would contain the path
   * "config.softwareConfig.pypiPackages", and the patch environment would be
   * the following: { "config":{ "softwareConfig":{ "pypiPackages":{
   * "botocore":"==1.7.14" } } } } **Note:** Only the following fields can be
   * updated: * `config.softwareConfig.pypiPackages` * Replace all custom custom
   * PyPI packages. If a replacement package map is not included in
   * `environment`, all custom PyPI packages are cleared. It is an error to
   * provide both this mask and a mask specifying an individual package. *
   * `config.softwareConfig.pypiPackages.`packagename * Update the custom PyPI
   * package *packagename*, preserving other packages. To delete the package,
   * include it in `updateMask`, and omit the mapping for it in
   * `environment.config.softwareConfig.pypiPackages`. It is an error to provide
   * both a mask of this form and the `config.softwareConfig.pypiPackages` mask.
   * * `labels` * Replace all environment labels. If a replacement labels map is
   * not included in `environment`, all labels are cleared. It is an error to
   * provide both this mask and a mask specifying one or more individual labels.
   * * `labels.`labelName * Set the label named *labelName*, while preserving
   * other labels. To delete the label, include it in `updateMask` and omit its
   * mapping in `environment.labels`. It is an error to provide both a mask of
   * this form and the `labels` mask. * `config.nodeCount` * Horizontally scale
   * the number of nodes in the environment. An integer greater than or equal to
   * 3 must be provided in the `config.nodeCount` field. Supported for Cloud
   * Composer environments in versions composer-1.*.*-airflow-*.*.*. *
   * `config.webServerNetworkAccessControl` * Replace the environment's current
   * `WebServerNetworkAccessControl`. *
   * `config.softwareConfig.airflowConfigOverrides` * Replace all Apache Airflow
   * config overrides. If a replacement config overrides map is not included in
   * `environment`, all config overrides are cleared. It is an error to provide
   * both this mask and a mask specifying one or more individual config
   * overrides. * `config.softwareConfig.airflowConfigOverrides.`section-name *
   * Override the Apache Airflow config property *name* in the section named
   * *section*, preserving other properties. To delete the property override,
   * include it in `updateMask` and omit its mapping in
   * `environment.config.softwareConfig.airflowConfigOverrides`. It is an error
   * to provide both a mask of this form and the
   * `config.softwareConfig.airflowConfigOverrides` mask. *
   * `config.softwareConfig.envVariables` * Replace all environment variables.
   * If a replacement environment variable map is not included in `environment`,
   * all custom environment variables are cleared. *
   * `config.softwareConfig.schedulerCount` * Horizontally scale the number of
   * schedulers in Airflow. A positive integer not greater than the number of
   * nodes must be provided in the `config.softwareConfig.schedulerCount` field.
   * Supported for Cloud Composer environments in versions
   * composer-1.*.*-airflow-2.*.*. * `config.databaseConfig.machineType` * Cloud
   * SQL machine type used by Airflow database. It has to be one of:
   * db-n1-standard-2, db-n1-standard-4, db-n1-standard-8 or db-n1-standard-16.
   * Supported for Cloud Composer environments in versions
   * composer-1.*.*-airflow-*.*.*. * `config.webServerConfig.machineType` *
   * Machine type on which Airflow web server is running. It has to be one of:
   * composer-n1-webserver-2, composer-n1-webserver-4 or
   * composer-n1-webserver-8. Supported for Cloud Composer environments in
   * versions composer-1.*.*-airflow-*.*.*.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsEnvironmentsPatchOptions(data: any): ProjectsLocationsEnvironmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsEnvironmentsPatchOptions(data: any): ProjectsLocationsEnvironmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Composer#projectsLocationsImageVersionsList.
 */
export interface ProjectsLocationsImageVersionsListOptions {
  /**
   * Whether or not image versions from old releases should be included.
   */
  includePastReleases?: boolean;
  /**
   * The maximum number of image_versions to return.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for Composer#projectsLocationsOperationsList.
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
 * The Recovery settings of an environment.
 */
export interface RecoveryConfig {
  /**
   * Optional. The configuration for scheduled snapshot creation mechanism.
   */
  scheduledSnapshotsConfig?: ScheduledSnapshotsConfig;
}

/**
 * Request to create a snapshot of a Cloud Composer environment.
 */
export interface SaveSnapshotRequest {
  /**
   * Location in a Cloud Storage where the snapshot is going to be stored,
   * e.g.: "gs://my-bucket/snapshots".
   */
  snapshotLocation?: string;
}

/**
 * Response to SaveSnapshotRequest.
 */
export interface SaveSnapshotResponse {
  /**
   * The fully-resolved Cloud Storage path of the created snapshot, e.g.:
   * "gs://my-bucket/snapshots/project_location_environment_timestamp". This
   * field is populated only if the snapshot creation was successful.
   */
  snapshotPath?: string;
}

/**
 * The configuration for scheduled snapshot creation mechanism.
 */
export interface ScheduledSnapshotsConfig {
  /**
   * Optional. Whether scheduled snapshots creation is enabled.
   */
  enabled?: boolean;
  /**
   * Optional. The cron expression representing the time when snapshots
   * creation mechanism runs. This field is subject to additional validation
   * around frequency of execution.
   */
  snapshotCreationSchedule?: string;
  /**
   * Optional. The Cloud Storage location for storing automatically created
   * snapshots.
   */
  snapshotLocation?: string;
  /**
   * Optional. Time zone that sets the context to interpret
   * snapshot_creation_schedule.
   */
  timeZone?: string;
}

/**
 * Configuration for resources used by Airflow schedulers.
 */
export interface SchedulerResource {
  /**
   * Optional. The number of schedulers.
   */
  count?: number;
  /**
   * Optional. CPU request and limit for a single Airflow scheduler replica.
   */
  cpu?: number;
  /**
   * Optional. Memory (GB) request and limit for a single Airflow scheduler
   * replica.
   */
  memoryGb?: number;
  /**
   * Optional. Storage (GB) request and limit for a single Airflow scheduler
   * replica.
   */
  storageGb?: number;
}

/**
 * Specifies the selection and configuration of software inside the
 * environment.
 */
export interface SoftwareConfig {
  /**
   * Optional. Apache Airflow configuration properties to override. Property
   * keys contain the section and property names, separated by a hyphen, for
   * example "core-dags_are_paused_at_creation". Section names must not contain
   * hyphens ("-"), opening square brackets ("["), or closing square brackets
   * ("]"). The property name must not be empty and must not contain an equals
   * sign ("=") or semicolon (";"). Section and property names must not contain
   * a period ("."). Apache Airflow configuration property names must be written
   * in [snake_case](https://en.wikipedia.org/wiki/Snake_case). Property values
   * can contain any character, and can be written in any lower/upper case
   * format. Certain Apache Airflow configuration property values are
   * [blocked](/composer/docs/concepts/airflow-configurations), and cannot be
   * overridden.
   */
  airflowConfigOverrides?: {
    [key: string]: string
  };
  /**
   * Optional. Additional environment variables to provide to the Apache
   * Airflow scheduler, worker, and webserver processes. Environment variable
   * names must match the regular expression `a-zA-Z_*`. They cannot specify
   * Apache Airflow software configuration overrides (they cannot match the
   * regular expression `AIRFLOW__[A-Z0-9_]+__[A-Z0-9_]+`), and they cannot
   * match any of the following reserved names: * `AIRFLOW_HOME` *
   * `C_FORCE_ROOT` * `CONTAINER_NAME` * `DAGS_FOLDER` * `GCP_PROJECT` *
   * `GCS_BUCKET` * `GKE_CLUSTER_NAME` * `SQL_DATABASE` * `SQL_INSTANCE` *
   * `SQL_PASSWORD` * `SQL_PROJECT` * `SQL_REGION` * `SQL_USER`
   */
  envVariables?: {
    [key: string]: string
  };
  /**
   * The version of the software running in the environment. This encapsulates
   * both the version of Cloud Composer functionality and the version of Apache
   * Airflow. It must match the regular expression
   * `composer-([0-9]+(\.[0-9]+\.[0-9]+(-preview\.[0-9]+)?)?|latest)-airflow-([0-9]+(\.[0-9]+(\.[0-9]+)?)?)`.
   * When used as input, the server also checks if the provided version is
   * supported and denies the request for an unsupported version. The Cloud
   * Composer portion of the image version is a full [semantic
   * version](https://semver.org), or an alias in the form of major version
   * number or `latest`. When an alias is provided, the server replaces it with
   * the current Cloud Composer version that satisfies the alias. The Apache
   * Airflow portion of the image version is a full semantic version that points
   * to one of the supported Apache Airflow versions, or an alias in the form of
   * only major or major.minor versions specified. When an alias is provided,
   * the server replaces it with the latest Apache Airflow version that
   * satisfies the alias and is supported in the given Cloud Composer version.
   * In all cases, the resolved image version is stored in the same field. See
   * also [version list](/composer/docs/concepts/versioning/composer-versions)
   * and [versioning
   * overview](/composer/docs/concepts/versioning/composer-versioning-overview).
   */
  imageVersion?: string;
  /**
   * Optional. Custom Python Package Index (PyPI) packages to be installed in
   * the environment. Keys refer to the lowercase package name such as "numpy"
   * and values are the lowercase extras and version specifier such as
   * "==1.12.0", "[devel,gcp_api]", or "[devel]>=1.8.2, <1.9.2". To specify a
   * package without pinning it to a version specifier, use the empty string as
   * the value.
   */
  pypiPackages?: {
    [key: string]: string
  };
  /**
   * Optional. The major version of Python used to run the Apache Airflow
   * scheduler, worker, and webserver processes. Can be set to '2' or '3'. If
   * not specified, the default is '3'. Cannot be updated. This field is only
   * supported for Cloud Composer environments in versions
   * composer-1.*.*-airflow-*.*.*. Environments in newer versions always use
   * Python major version 3.
   */
  pythonVersion?: string;
  /**
   * Optional. The number of schedulers for Airflow. This field is supported
   * for Cloud Composer environments in versions composer-1.*.*-airflow-2.*.*.
   */
  schedulerCount?: number;
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
 * The configuration settings for the Airflow web server App Engine instance.
 * Supported for Cloud Composer environments in versions
 * composer-1.*.*-airflow-*.*.*
 */
export interface WebServerConfig {
  /**
   * Optional. Machine type on which Airflow web server is running. It has to
   * be one of: composer-n1-webserver-2, composer-n1-webserver-4 or
   * composer-n1-webserver-8. If not specified, composer-n1-webserver-2 will be
   * used. Value custom is returned only in response, if Airflow web server
   * parameters were manually changed to a non-standard values.
   */
  machineType?: string;
}

/**
 * Network-level access control policy for the Airflow web server.
 */
export interface WebServerNetworkAccessControl {
  /**
   * A collection of allowed IP ranges with descriptions.
   */
  allowedIpRanges?: AllowedIpRange[];
}

/**
 * Configuration for resources used by Airflow web server.
 */
export interface WebServerResource {
  /**
   * Optional. CPU request and limit for Airflow web server.
   */
  cpu?: number;
  /**
   * Optional. Memory (GB) request and limit for Airflow web server.
   */
  memoryGb?: number;
  /**
   * Optional. Storage (GB) request and limit for Airflow web server.
   */
  storageGb?: number;
}

/**
 * Configuration for resources used by Airflow workers.
 */
export interface WorkerResource {
  /**
   * Optional. CPU request and limit for a single Airflow worker replica.
   */
  cpu?: number;
  /**
   * Optional. Maximum number of workers for autoscaling.
   */
  maxCount?: number;
  /**
   * Optional. Memory (GB) request and limit for a single Airflow worker
   * replica.
   */
  memoryGb?: number;
  /**
   * Optional. Minimum number of workers for autoscaling.
   */
  minCount?: number;
  /**
   * Optional. Storage (GB) request and limit for a single Airflow worker
   * replica.
   */
  storageGb?: number;
}

/**
 * The Kubernetes workloads configuration for GKE cluster associated with the
 * Cloud Composer environment. Supported for Cloud Composer environments in
 * versions composer-2.*.*-airflow-*.*.* and newer.
 */
export interface WorkloadsConfig {
  /**
   * Optional. Resources used by Airflow schedulers.
   */
  scheduler?: SchedulerResource;
  /**
   * Optional. Resources used by Airflow web server.
   */
  webServer?: WebServerResource;
  /**
   * Optional. Resources used by Airflow workers.
   */
  worker?: WorkerResource;
}