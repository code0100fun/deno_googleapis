// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * BigQuery Data Transfer API Client for Deno
 * ==========================================
 * 
 * Schedule queries or transfer external data from SaaS applications to Google BigQuery on a regular basis.
 * 
 * Docs: https://cloud.google.com/bigquery-transfer/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Schedule queries or transfer external data from SaaS applications to Google
 * BigQuery on a regular basis.
 */
export class BigQueryDataTransfer {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://bigquerydatatransfer.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns true if valid credentials exist for the given data source and
   * requesting user.
   *
   * @param name Required. The data source in the form: `projects/{project_id}/dataSources/{data_source_id}` or `projects/{project_id}/locations/{location_id}/dataSources/{data_source_id}`.
   */
  async projectsDataSourcesCheckValidCreds(name: string, req: CheckValidCredsRequest): Promise<CheckValidCredsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:checkValidCreds`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CheckValidCredsResponse;
  }

  /**
   * Retrieves a supported data source and returns its settings.
   *
   * @param name Required. The field will contain name of the resource requested, for example: `projects/{project_id}/dataSources/{data_source_id}` or `projects/{project_id}/locations/{location_id}/dataSources/{data_source_id}`
   */
  async projectsDataSourcesGet(name: string): Promise<DataSource> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDataSource(data);
  }

  /**
   * Lists supported data sources and returns their settings.
   *
   * @param parent Required. The BigQuery project id for which data sources should be returned. Must be in the form: `projects/{project_id}` or `projects/{project_id}/locations/{location_id}`
   */
  async projectsDataSourcesList(parent: string, opts: ProjectsDataSourcesListOptions = {}): Promise<ListDataSourcesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dataSources`);
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
    return deserializeListDataSourcesResponse(data);
  }

  /**
   * Enroll data sources in a user project. This allows users to create
   * transfer configurations for these data sources. They will also appear in
   * the ListDataSources RPC and as such, will appear in the [BigQuery
   * UI](https://console.cloud.google.com/bigquery), and the documents can be
   * found in the public guide for [BigQuery Web
   * UI](https://cloud.google.com/bigquery/bigquery-web-ui) and [Data Transfer
   * Service](https://cloud.google.com/bigquery/docs/working-with-transfers).
   *
   * @param name The name of the project resource in the form: `projects/{project_id}`
   */
  async projectsEnrollDataSources(name: string, req: EnrollDataSourcesRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:enrollDataSources`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
  }

  /**
   * Returns true if valid credentials exist for the given data source and
   * requesting user.
   *
   * @param name Required. The data source in the form: `projects/{project_id}/dataSources/{data_source_id}` or `projects/{project_id}/locations/{location_id}/dataSources/{data_source_id}`.
   */
  async projectsLocationsDataSourcesCheckValidCreds(name: string, req: CheckValidCredsRequest): Promise<CheckValidCredsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:checkValidCreds`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CheckValidCredsResponse;
  }

  /**
   * Retrieves a supported data source and returns its settings.
   *
   * @param name Required. The field will contain name of the resource requested, for example: `projects/{project_id}/dataSources/{data_source_id}` or `projects/{project_id}/locations/{location_id}/dataSources/{data_source_id}`
   */
  async projectsLocationsDataSourcesGet(name: string): Promise<DataSource> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeDataSource(data);
  }

  /**
   * Lists supported data sources and returns their settings.
   *
   * @param parent Required. The BigQuery project id for which data sources should be returned. Must be in the form: `projects/{project_id}` or `projects/{project_id}/locations/{location_id}`
   */
  async projectsLocationsDataSourcesList(parent: string, opts: ProjectsLocationsDataSourcesListOptions = {}): Promise<ListDataSourcesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/dataSources`);
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
    return deserializeListDataSourcesResponse(data);
  }

  /**
   * Enroll data sources in a user project. This allows users to create
   * transfer configurations for these data sources. They will also appear in
   * the ListDataSources RPC and as such, will appear in the [BigQuery
   * UI](https://console.cloud.google.com/bigquery), and the documents can be
   * found in the public guide for [BigQuery Web
   * UI](https://cloud.google.com/bigquery/bigquery-web-ui) and [Data Transfer
   * Service](https://cloud.google.com/bigquery/docs/working-with-transfers).
   *
   * @param name The name of the project resource in the form: `projects/{project_id}`
   */
  async projectsLocationsEnrollDataSources(name: string, req: EnrollDataSourcesRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:enrollDataSources`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Empty;
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
   * Creates a new data transfer configuration.
   *
   * @param parent Required. The BigQuery project id where the transfer configuration should be created. Must be in the format projects/{project_id}/locations/{location_id} or projects/{project_id}. If specified location and location of the destination bigquery dataset do not match - the request will fail.
   */
  async projectsLocationsTransferConfigsCreate(parent: string, req: TransferConfig, opts: ProjectsLocationsTransferConfigsCreateOptions = {}): Promise<TransferConfig> {
    req = serializeTransferConfig(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/transferConfigs`);
    if (opts.authorizationCode !== undefined) {
      url.searchParams.append("authorizationCode", String(opts.authorizationCode));
    }
    if (opts.serviceAccountName !== undefined) {
      url.searchParams.append("serviceAccountName", String(opts.serviceAccountName));
    }
    if (opts.versionInfo !== undefined) {
      url.searchParams.append("versionInfo", String(opts.versionInfo));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTransferConfig(data);
  }

  /**
   * Deletes a data transfer configuration, including any associated transfer
   * runs and logs.
   *
   * @param name Required. The field will contain name of the resource requested, for example: `projects/{project_id}/transferConfigs/{config_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}`
   */
  async projectsLocationsTransferConfigsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns information about a data transfer config.
   *
   * @param name Required. The field will contain name of the resource requested, for example: `projects/{project_id}/transferConfigs/{config_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}`
   */
  async projectsLocationsTransferConfigsGet(name: string): Promise<TransferConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTransferConfig(data);
  }

  /**
   * Returns information about all transfer configs owned by a project in the
   * specified location.
   *
   * @param parent Required. The BigQuery project id for which transfer configs should be returned: `projects/{project_id}` or `projects/{project_id}/locations/{location_id}`
   */
  async projectsLocationsTransferConfigsList(parent: string, opts: ProjectsLocationsTransferConfigsListOptions = {}): Promise<ListTransferConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/transferConfigs`);
    if (opts.dataSourceIds !== undefined) {
      url.searchParams.append("dataSourceIds", String(opts.dataSourceIds));
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
    return data as ListTransferConfigsResponse;
  }

  /**
   * Updates a data transfer configuration. All fields must be set, even if
   * they are not updated.
   *
   * @param name The resource name of the transfer config. Transfer config names have the form `projects/{project_id}/locations/{region}/transferConfigs/{config_id}`. Where `config_id` is usually a uuid, even though it is not guaranteed or required. The name is ignored when creating a transfer config.
   */
  async projectsLocationsTransferConfigsPatch(name: string, req: TransferConfig, opts: ProjectsLocationsTransferConfigsPatchOptions = {}): Promise<TransferConfig> {
    req = serializeTransferConfig(req);
    opts = serializeProjectsLocationsTransferConfigsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.authorizationCode !== undefined) {
      url.searchParams.append("authorizationCode", String(opts.authorizationCode));
    }
    if (opts.serviceAccountName !== undefined) {
      url.searchParams.append("serviceAccountName", String(opts.serviceAccountName));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.versionInfo !== undefined) {
      url.searchParams.append("versionInfo", String(opts.versionInfo));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeTransferConfig(data);
  }

  /**
   * Deletes the specified transfer run.
   *
   * @param name Required. The field will contain name of the resource requested, for example: `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}`
   */
  async projectsLocationsTransferConfigsRunsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns information about the particular transfer run.
   *
   * @param name Required. The field will contain name of the resource requested, for example: `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}`
   */
  async projectsLocationsTransferConfigsRunsGet(name: string): Promise<TransferRun> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTransferRun(data);
  }

  /**
   * Returns information about running and completed transfer runs.
   *
   * @param parent Required. Name of transfer configuration for which transfer runs should be retrieved. Format of transfer configuration resource name is: `projects/{project_id}/transferConfigs/{config_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}`.
   */
  async projectsLocationsTransferConfigsRunsList(parent: string, opts: ProjectsLocationsTransferConfigsRunsListOptions = {}): Promise<ListTransferRunsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/runs`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.runAttempt !== undefined) {
      url.searchParams.append("runAttempt", String(opts.runAttempt));
    }
    if (opts.states !== undefined) {
      url.searchParams.append("states", String(opts.states));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListTransferRunsResponse;
  }

  /**
   * Returns log messages for the transfer run.
   *
   * @param parent Required. Transfer run name in the form: `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}`
   */
  async projectsLocationsTransferConfigsRunsTransferLogsList(parent: string, opts: ProjectsLocationsTransferConfigsRunsTransferLogsListOptions = {}): Promise<ListTransferLogsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/transferLogs`);
    if (opts.messageTypes !== undefined) {
      url.searchParams.append("messageTypes", String(opts.messageTypes));
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
    return data as ListTransferLogsResponse;
  }

  /**
   * Creates transfer runs for a time range [start_time, end_time]. For each
   * date - or whatever granularity the data source supports - in the range, one
   * transfer run is created. Note that runs are created per UTC time in the
   * time range. DEPRECATED: use StartManualTransferRuns instead.
   *
   * @param parent Required. Transfer configuration name in the form: `projects/{project_id}/transferConfigs/{config_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}`.
   */
  async projectsLocationsTransferConfigsScheduleRuns(parent: string, req: ScheduleTransferRunsRequest): Promise<ScheduleTransferRunsResponse> {
    req = serializeScheduleTransferRunsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:scheduleRuns`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeScheduleTransferRunsResponse(data);
  }

  /**
   * Start manual transfer runs to be executed now with schedule_time equal to
   * current time. The transfer runs can be created for a time range where the
   * run_time is between start_time (inclusive) and end_time (exclusive), or for
   * a specific run_time.
   *
   * @param parent Transfer configuration name in the form: `projects/{project_id}/transferConfigs/{config_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}`.
   */
  async projectsLocationsTransferConfigsStartManualRuns(parent: string, req: StartManualTransferRunsRequest): Promise<StartManualTransferRunsResponse> {
    req = serializeStartManualTransferRunsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:startManualRuns`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeStartManualTransferRunsResponse(data);
  }

  /**
   * Creates a new data transfer configuration.
   *
   * @param parent Required. The BigQuery project id where the transfer configuration should be created. Must be in the format projects/{project_id}/locations/{location_id} or projects/{project_id}. If specified location and location of the destination bigquery dataset do not match - the request will fail.
   */
  async projectsTransferConfigsCreate(parent: string, req: TransferConfig, opts: ProjectsTransferConfigsCreateOptions = {}): Promise<TransferConfig> {
    req = serializeTransferConfig(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/transferConfigs`);
    if (opts.authorizationCode !== undefined) {
      url.searchParams.append("authorizationCode", String(opts.authorizationCode));
    }
    if (opts.serviceAccountName !== undefined) {
      url.searchParams.append("serviceAccountName", String(opts.serviceAccountName));
    }
    if (opts.versionInfo !== undefined) {
      url.searchParams.append("versionInfo", String(opts.versionInfo));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTransferConfig(data);
  }

  /**
   * Deletes a data transfer configuration, including any associated transfer
   * runs and logs.
   *
   * @param name Required. The field will contain name of the resource requested, for example: `projects/{project_id}/transferConfigs/{config_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}`
   */
  async projectsTransferConfigsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns information about a data transfer config.
   *
   * @param name Required. The field will contain name of the resource requested, for example: `projects/{project_id}/transferConfigs/{config_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}`
   */
  async projectsTransferConfigsGet(name: string): Promise<TransferConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTransferConfig(data);
  }

  /**
   * Returns information about all transfer configs owned by a project in the
   * specified location.
   *
   * @param parent Required. The BigQuery project id for which transfer configs should be returned: `projects/{project_id}` or `projects/{project_id}/locations/{location_id}`
   */
  async projectsTransferConfigsList(parent: string, opts: ProjectsTransferConfigsListOptions = {}): Promise<ListTransferConfigsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/transferConfigs`);
    if (opts.dataSourceIds !== undefined) {
      url.searchParams.append("dataSourceIds", String(opts.dataSourceIds));
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
    return data as ListTransferConfigsResponse;
  }

  /**
   * Updates a data transfer configuration. All fields must be set, even if
   * they are not updated.
   *
   * @param name The resource name of the transfer config. Transfer config names have the form `projects/{project_id}/locations/{region}/transferConfigs/{config_id}`. Where `config_id` is usually a uuid, even though it is not guaranteed or required. The name is ignored when creating a transfer config.
   */
  async projectsTransferConfigsPatch(name: string, req: TransferConfig, opts: ProjectsTransferConfigsPatchOptions = {}): Promise<TransferConfig> {
    req = serializeTransferConfig(req);
    opts = serializeProjectsTransferConfigsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.authorizationCode !== undefined) {
      url.searchParams.append("authorizationCode", String(opts.authorizationCode));
    }
    if (opts.serviceAccountName !== undefined) {
      url.searchParams.append("serviceAccountName", String(opts.serviceAccountName));
    }
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    if (opts.versionInfo !== undefined) {
      url.searchParams.append("versionInfo", String(opts.versionInfo));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeTransferConfig(data);
  }

  /**
   * Deletes the specified transfer run.
   *
   * @param name Required. The field will contain name of the resource requested, for example: `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}`
   */
  async projectsTransferConfigsRunsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns information about the particular transfer run.
   *
   * @param name Required. The field will contain name of the resource requested, for example: `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}`
   */
  async projectsTransferConfigsRunsGet(name: string): Promise<TransferRun> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeTransferRun(data);
  }

  /**
   * Returns information about running and completed transfer runs.
   *
   * @param parent Required. Name of transfer configuration for which transfer runs should be retrieved. Format of transfer configuration resource name is: `projects/{project_id}/transferConfigs/{config_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}`.
   */
  async projectsTransferConfigsRunsList(parent: string, opts: ProjectsTransferConfigsRunsListOptions = {}): Promise<ListTransferRunsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/runs`);
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.runAttempt !== undefined) {
      url.searchParams.append("runAttempt", String(opts.runAttempt));
    }
    if (opts.states !== undefined) {
      url.searchParams.append("states", String(opts.states));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListTransferRunsResponse;
  }

  /**
   * Returns log messages for the transfer run.
   *
   * @param parent Required. Transfer run name in the form: `projects/{project_id}/transferConfigs/{config_id}/runs/{run_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}/runs/{run_id}`
   */
  async projectsTransferConfigsRunsTransferLogsList(parent: string, opts: ProjectsTransferConfigsRunsTransferLogsListOptions = {}): Promise<ListTransferLogsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/transferLogs`);
    if (opts.messageTypes !== undefined) {
      url.searchParams.append("messageTypes", String(opts.messageTypes));
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
    return data as ListTransferLogsResponse;
  }

  /**
   * Creates transfer runs for a time range [start_time, end_time]. For each
   * date - or whatever granularity the data source supports - in the range, one
   * transfer run is created. Note that runs are created per UTC time in the
   * time range. DEPRECATED: use StartManualTransferRuns instead.
   *
   * @param parent Required. Transfer configuration name in the form: `projects/{project_id}/transferConfigs/{config_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}`.
   */
  async projectsTransferConfigsScheduleRuns(parent: string, req: ScheduleTransferRunsRequest): Promise<ScheduleTransferRunsResponse> {
    req = serializeScheduleTransferRunsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:scheduleRuns`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeScheduleTransferRunsResponse(data);
  }

  /**
   * Start manual transfer runs to be executed now with schedule_time equal to
   * current time. The transfer runs can be created for a time range where the
   * run_time is between start_time (inclusive) and end_time (exclusive), or for
   * a specific run_time.
   *
   * @param parent Transfer configuration name in the form: `projects/{project_id}/transferConfigs/{config_id}` or `projects/{project_id}/locations/{location_id}/transferConfigs/{config_id}`.
   */
  async projectsTransferConfigsStartManualRuns(parent: string, req: StartManualTransferRunsRequest): Promise<StartManualTransferRunsResponse> {
    req = serializeStartManualTransferRunsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:startManualRuns`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeStartManualTransferRunsResponse(data);
  }
}

/**
 * A request to determine whether the user has valid credentials. This method
 * is used to limit the number of OAuth popups in the user interface. The user
 * id is inferred from the API call context. If the data source has the Google+
 * authorization type, this method returns false, as it cannot be determined
 * whether the credentials are already valid merely based on the user id.
 */
export interface CheckValidCredsRequest {
}

/**
 * A response indicating whether the credentials exist and are valid.
 */
export interface CheckValidCredsResponse {
  /**
   * If set to `true`, the credentials exist and are valid.
   */
  hasValidCreds?: boolean;
}

/**
 * Defines the properties and custom parameters for a data source.
 */
export interface DataSource {
  /**
   * Indicates the type of authorization.
   */
  authorizationType?:  | "AUTHORIZATION_TYPE_UNSPECIFIED" | "AUTHORIZATION_CODE" | "GOOGLE_PLUS_AUTHORIZATION_CODE" | "FIRST_PARTY_OAUTH";
  /**
   * Data source client id which should be used to receive refresh token.
   */
  clientId?: string;
  /**
   * Specifies whether the data source supports automatic data refresh for the
   * past few days, and how it's supported. For some data sources, data might
   * not be complete until a few days later, so it's useful to refresh data
   * automatically.
   */
  dataRefreshType?:  | "DATA_REFRESH_TYPE_UNSPECIFIED" | "SLIDING_WINDOW" | "CUSTOM_SLIDING_WINDOW";
  /**
   * Data source id.
   */
  dataSourceId?: string;
  /**
   * Default data refresh window on days. Only meaningful when
   * `data_refresh_type` = `SLIDING_WINDOW`.
   */
  defaultDataRefreshWindowDays?: number;
  /**
   * Default data transfer schedule. Examples of valid schedules include:
   * `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and
   * `first sunday of quarter 00:00`.
   */
  defaultSchedule?: string;
  /**
   * User friendly data source description string.
   */
  description?: string;
  /**
   * User friendly data source name.
   */
  displayName?: string;
  /**
   * Url for the help document for this data source.
   */
  helpUrl?: string;
  /**
   * Disables backfilling and manual run scheduling for the data source.
   */
  manualRunsDisabled?: boolean;
  /**
   * The minimum interval for scheduler to schedule runs.
   */
  minimumScheduleInterval?: number /* Duration */;
  /**
   * Output only. Data source resource name.
   */
  readonly name?: string;
  /**
   * Data source parameters.
   */
  parameters?: DataSourceParameter[];
  /**
   * Api auth scopes for which refresh token needs to be obtained. These are
   * scopes needed by a data source to prepare data and ingest them into
   * BigQuery, e.g., https://www.googleapis.com/auth/bigquery
   */
  scopes?: string[];
  /**
   * Specifies whether the data source supports a user defined schedule, or
   * operates on the default schedule. When set to `true`, user can override
   * default schedule.
   */
  supportsCustomSchedule?: boolean;
  /**
   * Deprecated. This field has no effect.
   */
  supportsMultipleTransfers?: boolean;
  /**
   * Deprecated. This field has no effect.
   */
  transferType?:  | "TRANSFER_TYPE_UNSPECIFIED" | "BATCH" | "STREAMING";
  /**
   * The number of seconds to wait for an update from the data source before
   * the Data Transfer Service marks the transfer as FAILED.
   */
  updateDeadlineSeconds?: number;
}

function serializeDataSource(data: any): DataSource {
  return {
    ...data,
    minimumScheduleInterval: data["minimumScheduleInterval"] !== undefined ? data["minimumScheduleInterval"] : undefined,
  };
}

function deserializeDataSource(data: any): DataSource {
  return {
    ...data,
    minimumScheduleInterval: data["minimumScheduleInterval"] !== undefined ? data["minimumScheduleInterval"] : undefined,
  };
}

/**
 * A parameter used to define custom fields in a data source definition.
 */
export interface DataSourceParameter {
  /**
   * All possible values for the parameter.
   */
  allowedValues?: string[];
  /**
   * If true, it should not be used in new transfers, and it should not be
   * visible to users.
   */
  deprecated?: boolean;
  /**
   * Parameter description.
   */
  description?: string;
  /**
   * Parameter display name in the user interface.
   */
  displayName?: string;
  /**
   * Deprecated. This field has no effect.
   */
  fields?: DataSourceParameter[];
  /**
   * Cannot be changed after initial creation.
   */
  immutable?: boolean;
  /**
   * For integer and double values specifies maximum allowed value.
   */
  maxValue?: number;
  /**
   * For integer and double values specifies minimum allowed value.
   */
  minValue?: number;
  /**
   * Parameter identifier.
   */
  paramId?: string;
  /**
   * Deprecated. This field has no effect.
   */
  recurse?: boolean;
  /**
   * Deprecated. This field has no effect.
   */
  repeated?: boolean;
  /**
   * Is parameter required.
   */
  required?: boolean;
  /**
   * Parameter type.
   */
  type?:  | "TYPE_UNSPECIFIED" | "STRING" | "INTEGER" | "DOUBLE" | "BOOLEAN" | "RECORD" | "PLUS_PAGE";
  /**
   * Description of the requirements for this field, in case the user input
   * does not fulfill the regex pattern or min/max values.
   */
  validationDescription?: string;
  /**
   * URL to a help document to further explain the naming requirements.
   */
  validationHelpUrl?: string;
  /**
   * Regular expression which can be used for parameter validation.
   */
  validationRegex?: string;
}

/**
 * Represents preferences for sending email notifications for transfer run
 * events.
 */
export interface EmailPreferences {
  /**
   * If true, email notifications will be sent on transfer run failures.
   */
  enableFailureEmail?: boolean;
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
 * A request to enroll a set of data sources so they are visible in the
 * BigQuery UI's `Transfer` tab.
 */
export interface EnrollDataSourcesRequest {
  /**
   * Data sources that are enrolled. It is required to provide at least one
   * data source id.
   */
  dataSourceIds?: string[];
}

/**
 * Returns list of supported data sources and their metadata.
 */
export interface ListDataSourcesResponse {
  /**
   * List of supported data sources and their transfer settings.
   */
  dataSources?: DataSource[];
  /**
   * Output only. The next-pagination token. For multiple-page list results,
   * this token can be used as the `ListDataSourcesRequest.page_token` to
   * request the next page of list results.
   */
  readonly nextPageToken?: string;
}

function serializeListDataSourcesResponse(data: any): ListDataSourcesResponse {
  return {
    ...data,
    dataSources: data["dataSources"] !== undefined ? data["dataSources"].map((item: any) => (serializeDataSource(item))) : undefined,
  };
}

function deserializeListDataSourcesResponse(data: any): ListDataSourcesResponse {
  return {
    ...data,
    dataSources: data["dataSources"] !== undefined ? data["dataSources"].map((item: any) => (deserializeDataSource(item))) : undefined,
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
 * The returned list of pipelines in the project.
 */
export interface ListTransferConfigsResponse {
  /**
   * Output only. The next-pagination token. For multiple-page list results,
   * this token can be used as the `ListTransferConfigsRequest.page_token` to
   * request the next page of list results.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. The stored pipeline transfer configurations.
   */
  readonly transferConfigs?: TransferConfig[];
}

/**
 * The returned list transfer run messages.
 */
export interface ListTransferLogsResponse {
  /**
   * Output only. The next-pagination token. For multiple-page list results,
   * this token can be used as the `GetTransferRunLogRequest.page_token` to
   * request the next page of list results.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. The stored pipeline transfer messages.
   */
  readonly transferMessages?: TransferMessage[];
}

/**
 * The returned list of pipelines in the project.
 */
export interface ListTransferRunsResponse {
  /**
   * Output only. The next-pagination token. For multiple-page list results,
   * this token can be used as the `ListTransferRunsRequest.page_token` to
   * request the next page of list results.
   */
  readonly nextPageToken?: string;
  /**
   * Output only. The stored pipeline transfer runs.
   */
  readonly transferRuns?: TransferRun[];
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
 * Additional options for BigQueryDataTransfer#projectsDataSourcesList.
 */
export interface ProjectsDataSourcesListOptions {
  /**
   * Page size. The default page size is the maximum value of 1000 results.
   */
  pageSize?: number;
  /**
   * Pagination token, which can be used to request a specific page of
   * `ListDataSourcesRequest` list results. For multiple-page results,
   * `ListDataSourcesResponse` outputs a `next_page` token, which can be used as
   * the `page_token` value to request the next page of list results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * BigQueryDataTransfer#projectsLocationsDataSourcesList.
 */
export interface ProjectsLocationsDataSourcesListOptions {
  /**
   * Page size. The default page size is the maximum value of 1000 results.
   */
  pageSize?: number;
  /**
   * Pagination token, which can be used to request a specific page of
   * `ListDataSourcesRequest` list results. For multiple-page results,
   * `ListDataSourcesResponse` outputs a `next_page` token, which can be used as
   * the `page_token` value to request the next page of list results.
   */
  pageToken?: string;
}

/**
 * Additional options for BigQueryDataTransfer#projectsLocationsList.
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
 * Additional options for
 * BigQueryDataTransfer#projectsLocationsTransferConfigsCreate.
 */
export interface ProjectsLocationsTransferConfigsCreateOptions {
  /**
   * Optional OAuth2 authorization code to use with this transfer
   * configuration. This is required only if `transferConfig.dataSourceId` is
   * 'youtube_channel' and new credentials are needed, as indicated by
   * `CheckValidCreds`. In order to obtain authorization_code, make a request to
   * the following URL:
   * https://www.gstatic.com/bigquerydatatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=authorization_code&client_id=client_id&scope=data_source_scopes
   * * The client_id is the OAuth client_id of the a data source as returned by
   * ListDataSources method. * data_source_scopes are the scopes returned by
   * ListDataSources method. Note that this should not be set when
   * `service_account_name` is used to create the transfer config.
   */
  authorizationCode?: string;
  /**
   * Optional service account email. If this field is set, the transfer config
   * will be created with this service account's credentials. It requires that
   * the requesting user calling this API has permissions to act as this service
   * account. Note that not all data sources support service account credentials
   * when creating a transfer config. For the latest list of data sources, read
   * about [using service
   * accounts](https://cloud.google.com/bigquery-transfer/docs/use-service-accounts).
   */
  serviceAccountName?: string;
  /**
   * Optional version info. This is required only if
   * `transferConfig.dataSourceId` is not 'youtube_channel' and new credentials
   * are needed, as indicated by `CheckValidCreds`. In order to obtain version
   * info, make a request to the following URL:
   * https://www.gstatic.com/bigquerydatatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes
   * * The client_id is the OAuth client_id of the a data source as returned by
   * ListDataSources method. * data_source_scopes are the scopes returned by
   * ListDataSources method. Note that this should not be set when
   * `service_account_name` is used to create the transfer config.
   */
  versionInfo?: string;
}

/**
 * Additional options for
 * BigQueryDataTransfer#projectsLocationsTransferConfigsList.
 */
export interface ProjectsLocationsTransferConfigsListOptions {
  /**
   * When specified, only configurations of requested data sources are
   * returned.
   */
  dataSourceIds?: string;
  /**
   * Page size. The default page size is the maximum value of 1000 results.
   */
  pageSize?: number;
  /**
   * Pagination token, which can be used to request a specific page of
   * `ListTransfersRequest` list results. For multiple-page results,
   * `ListTransfersResponse` outputs a `next_page` token, which can be used as
   * the `page_token` value to request the next page of list results.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * BigQueryDataTransfer#projectsLocationsTransferConfigsPatch.
 */
export interface ProjectsLocationsTransferConfigsPatchOptions {
  /**
   * Optional OAuth2 authorization code to use with this transfer
   * configuration. This is required only if `transferConfig.dataSourceId` is
   * 'youtube_channel' and new credentials are needed, as indicated by
   * `CheckValidCreds`. In order to obtain authorization_code, make a request to
   * the following URL:
   * https://www.gstatic.com/bigquerydatatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=authorization_code&client_id=client_id&scope=data_source_scopes
   * * The client_id is the OAuth client_id of the a data source as returned by
   * ListDataSources method. * data_source_scopes are the scopes returned by
   * ListDataSources method. Note that this should not be set when
   * `service_account_name` is used to update the transfer config.
   */
  authorizationCode?: string;
  /**
   * Optional service account email. If this field is set, the transfer config
   * will be created with this service account's credentials. It requires that
   * the requesting user calling this API has permissions to act as this service
   * account. Note that not all data sources support service account credentials
   * when creating a transfer config. For the latest list of data sources, read
   * about [using service
   * accounts](https://cloud.google.com/bigquery-transfer/docs/use-service-accounts).
   */
  serviceAccountName?: string;
  /**
   * Required. Required list of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional version info. This is required only if
   * `transferConfig.dataSourceId` is not 'youtube_channel' and new credentials
   * are needed, as indicated by `CheckValidCreds`. In order to obtain version
   * info, make a request to the following URL:
   * https://www.gstatic.com/bigquerydatatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes
   * * The client_id is the OAuth client_id of the a data source as returned by
   * ListDataSources method. * data_source_scopes are the scopes returned by
   * ListDataSources method. Note that this should not be set when
   * `service_account_name` is used to update the transfer config.
   */
  versionInfo?: string;
}

function serializeProjectsLocationsTransferConfigsPatchOptions(data: any): ProjectsLocationsTransferConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsTransferConfigsPatchOptions(data: any): ProjectsLocationsTransferConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * BigQueryDataTransfer#projectsLocationsTransferConfigsRunsList.
 */
export interface ProjectsLocationsTransferConfigsRunsListOptions {
  /**
   * Page size. The default page size is the maximum value of 1000 results.
   */
  pageSize?: number;
  /**
   * Pagination token, which can be used to request a specific page of
   * `ListTransferRunsRequest` list results. For multiple-page results,
   * `ListTransferRunsResponse` outputs a `next_page` token, which can be used
   * as the `page_token` value to request the next page of list results.
   */
  pageToken?: string;
  /**
   * Indicates how run attempts are to be pulled.
   */
  runAttempt?:  | "RUN_ATTEMPT_UNSPECIFIED" | "LATEST";
  /**
   * When specified, only transfer runs with requested states are returned.
   */
  states?:  | "TRANSFER_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
}

/**
 * Additional options for
 * BigQueryDataTransfer#projectsLocationsTransferConfigsRunsTransferLogsList.
 */
export interface ProjectsLocationsTransferConfigsRunsTransferLogsListOptions {
  /**
   * Message types to return. If not populated - INFO, WARNING and ERROR
   * messages are returned.
   */
  messageTypes?:  | "MESSAGE_SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR";
  /**
   * Page size. The default page size is the maximum value of 1000 results.
   */
  pageSize?: number;
  /**
   * Pagination token, which can be used to request a specific page of
   * `ListTransferLogsRequest` list results. For multiple-page results,
   * `ListTransferLogsResponse` outputs a `next_page` token, which can be used
   * as the `page_token` value to request the next page of list results.
   */
  pageToken?: string;
}

/**
 * Additional options for BigQueryDataTransfer#projectsTransferConfigsCreate.
 */
export interface ProjectsTransferConfigsCreateOptions {
  /**
   * Optional OAuth2 authorization code to use with this transfer
   * configuration. This is required only if `transferConfig.dataSourceId` is
   * 'youtube_channel' and new credentials are needed, as indicated by
   * `CheckValidCreds`. In order to obtain authorization_code, make a request to
   * the following URL:
   * https://www.gstatic.com/bigquerydatatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=authorization_code&client_id=client_id&scope=data_source_scopes
   * * The client_id is the OAuth client_id of the a data source as returned by
   * ListDataSources method. * data_source_scopes are the scopes returned by
   * ListDataSources method. Note that this should not be set when
   * `service_account_name` is used to create the transfer config.
   */
  authorizationCode?: string;
  /**
   * Optional service account email. If this field is set, the transfer config
   * will be created with this service account's credentials. It requires that
   * the requesting user calling this API has permissions to act as this service
   * account. Note that not all data sources support service account credentials
   * when creating a transfer config. For the latest list of data sources, read
   * about [using service
   * accounts](https://cloud.google.com/bigquery-transfer/docs/use-service-accounts).
   */
  serviceAccountName?: string;
  /**
   * Optional version info. This is required only if
   * `transferConfig.dataSourceId` is not 'youtube_channel' and new credentials
   * are needed, as indicated by `CheckValidCreds`. In order to obtain version
   * info, make a request to the following URL:
   * https://www.gstatic.com/bigquerydatatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes
   * * The client_id is the OAuth client_id of the a data source as returned by
   * ListDataSources method. * data_source_scopes are the scopes returned by
   * ListDataSources method. Note that this should not be set when
   * `service_account_name` is used to create the transfer config.
   */
  versionInfo?: string;
}

/**
 * Additional options for BigQueryDataTransfer#projectsTransferConfigsList.
 */
export interface ProjectsTransferConfigsListOptions {
  /**
   * When specified, only configurations of requested data sources are
   * returned.
   */
  dataSourceIds?: string;
  /**
   * Page size. The default page size is the maximum value of 1000 results.
   */
  pageSize?: number;
  /**
   * Pagination token, which can be used to request a specific page of
   * `ListTransfersRequest` list results. For multiple-page results,
   * `ListTransfersResponse` outputs a `next_page` token, which can be used as
   * the `page_token` value to request the next page of list results.
   */
  pageToken?: string;
}

/**
 * Additional options for BigQueryDataTransfer#projectsTransferConfigsPatch.
 */
export interface ProjectsTransferConfigsPatchOptions {
  /**
   * Optional OAuth2 authorization code to use with this transfer
   * configuration. This is required only if `transferConfig.dataSourceId` is
   * 'youtube_channel' and new credentials are needed, as indicated by
   * `CheckValidCreds`. In order to obtain authorization_code, make a request to
   * the following URL:
   * https://www.gstatic.com/bigquerydatatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=authorization_code&client_id=client_id&scope=data_source_scopes
   * * The client_id is the OAuth client_id of the a data source as returned by
   * ListDataSources method. * data_source_scopes are the scopes returned by
   * ListDataSources method. Note that this should not be set when
   * `service_account_name` is used to update the transfer config.
   */
  authorizationCode?: string;
  /**
   * Optional service account email. If this field is set, the transfer config
   * will be created with this service account's credentials. It requires that
   * the requesting user calling this API has permissions to act as this service
   * account. Note that not all data sources support service account credentials
   * when creating a transfer config. For the latest list of data sources, read
   * about [using service
   * accounts](https://cloud.google.com/bigquery-transfer/docs/use-service-accounts).
   */
  serviceAccountName?: string;
  /**
   * Required. Required list of fields to be updated in this request.
   */
  updateMask?: string /* FieldMask */;
  /**
   * Optional version info. This is required only if
   * `transferConfig.dataSourceId` is not 'youtube_channel' and new credentials
   * are needed, as indicated by `CheckValidCreds`. In order to obtain version
   * info, make a request to the following URL:
   * https://www.gstatic.com/bigquerydatatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes
   * * The client_id is the OAuth client_id of the a data source as returned by
   * ListDataSources method. * data_source_scopes are the scopes returned by
   * ListDataSources method. Note that this should not be set when
   * `service_account_name` is used to update the transfer config.
   */
  versionInfo?: string;
}

function serializeProjectsTransferConfigsPatchOptions(data: any): ProjectsTransferConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsTransferConfigsPatchOptions(data: any): ProjectsTransferConfigsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for BigQueryDataTransfer#projectsTransferConfigsRunsList.
 */
export interface ProjectsTransferConfigsRunsListOptions {
  /**
   * Page size. The default page size is the maximum value of 1000 results.
   */
  pageSize?: number;
  /**
   * Pagination token, which can be used to request a specific page of
   * `ListTransferRunsRequest` list results. For multiple-page results,
   * `ListTransferRunsResponse` outputs a `next_page` token, which can be used
   * as the `page_token` value to request the next page of list results.
   */
  pageToken?: string;
  /**
   * Indicates how run attempts are to be pulled.
   */
  runAttempt?:  | "RUN_ATTEMPT_UNSPECIFIED" | "LATEST";
  /**
   * When specified, only transfer runs with requested states are returned.
   */
  states?:  | "TRANSFER_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
}

/**
 * Additional options for
 * BigQueryDataTransfer#projectsTransferConfigsRunsTransferLogsList.
 */
export interface ProjectsTransferConfigsRunsTransferLogsListOptions {
  /**
   * Message types to return. If not populated - INFO, WARNING and ERROR
   * messages are returned.
   */
  messageTypes?:  | "MESSAGE_SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR";
  /**
   * Page size. The default page size is the maximum value of 1000 results.
   */
  pageSize?: number;
  /**
   * Pagination token, which can be used to request a specific page of
   * `ListTransferLogsRequest` list results. For multiple-page results,
   * `ListTransferLogsResponse` outputs a `next_page` token, which can be used
   * as the `page_token` value to request the next page of list results.
   */
  pageToken?: string;
}

/**
 * Options customizing the data transfer schedule.
 */
export interface ScheduleOptions {
  /**
   * If true, automatic scheduling of data transfer runs for this configuration
   * will be disabled. The runs can be started on ad-hoc basis using
   * StartManualTransferRuns API. When automatic scheduling is disabled, the
   * TransferConfig.schedule field will be ignored.
   */
  disableAutoScheduling?: boolean;
  /**
   * Defines time to stop scheduling transfer runs. A transfer run cannot be
   * scheduled at or after the end time. The end time can be changed at any
   * moment. The time when a data transfer can be trigerred manually is not
   * limited by this option.
   */
  endTime?: Date;
  /**
   * Specifies time to start scheduling transfer runs. The first run will be
   * scheduled at or after the start time according to a recurrence pattern
   * defined in the schedule string. The start time can be changed at any
   * moment. The time when a data transfer can be trigerred manually is not
   * limited by this option.
   */
  startTime?: Date;
}

function serializeScheduleOptions(data: any): ScheduleOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeScheduleOptions(data: any): ScheduleOptions {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * A request to schedule transfer runs for a time range.
 */
export interface ScheduleTransferRunsRequest {
  /**
   * Required. End time of the range of transfer runs. For example,
   * `"2017-05-30T00:00:00+00:00"`.
   */
  endTime?: Date;
  /**
   * Required. Start time of the range of transfer runs. For example,
   * `"2017-05-25T00:00:00+00:00"`.
   */
  startTime?: Date;
}

function serializeScheduleTransferRunsRequest(data: any): ScheduleTransferRunsRequest {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeScheduleTransferRunsRequest(data: any): ScheduleTransferRunsRequest {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * A response to schedule transfer runs for a time range.
 */
export interface ScheduleTransferRunsResponse {
  /**
   * The transfer runs that were scheduled.
   */
  runs?: TransferRun[];
}

function serializeScheduleTransferRunsResponse(data: any): ScheduleTransferRunsResponse {
  return {
    ...data,
    runs: data["runs"] !== undefined ? data["runs"].map((item: any) => (serializeTransferRun(item))) : undefined,
  };
}

function deserializeScheduleTransferRunsResponse(data: any): ScheduleTransferRunsResponse {
  return {
    ...data,
    runs: data["runs"] !== undefined ? data["runs"].map((item: any) => (deserializeTransferRun(item))) : undefined,
  };
}

/**
 * A request to start manual transfer runs.
 */
export interface StartManualTransferRunsRequest {
  /**
   * Specific run_time for a transfer run to be started. The requested_run_time
   * must not be in the future.
   */
  requestedRunTime?: Date;
  /**
   * Time range for the transfer runs that should be started.
   */
  requestedTimeRange?: TimeRange;
}

function serializeStartManualTransferRunsRequest(data: any): StartManualTransferRunsRequest {
  return {
    ...data,
    requestedRunTime: data["requestedRunTime"] !== undefined ? data["requestedRunTime"].toISOString() : undefined,
    requestedTimeRange: data["requestedTimeRange"] !== undefined ? serializeTimeRange(data["requestedTimeRange"]) : undefined,
  };
}

function deserializeStartManualTransferRunsRequest(data: any): StartManualTransferRunsRequest {
  return {
    ...data,
    requestedRunTime: data["requestedRunTime"] !== undefined ? new Date(data["requestedRunTime"]) : undefined,
    requestedTimeRange: data["requestedTimeRange"] !== undefined ? deserializeTimeRange(data["requestedTimeRange"]) : undefined,
  };
}

/**
 * A response to start manual transfer runs.
 */
export interface StartManualTransferRunsResponse {
  /**
   * The transfer runs that were created.
   */
  runs?: TransferRun[];
}

function serializeStartManualTransferRunsResponse(data: any): StartManualTransferRunsResponse {
  return {
    ...data,
    runs: data["runs"] !== undefined ? data["runs"].map((item: any) => (serializeTransferRun(item))) : undefined,
  };
}

function deserializeStartManualTransferRunsResponse(data: any): StartManualTransferRunsResponse {
  return {
    ...data,
    runs: data["runs"] !== undefined ? data["runs"].map((item: any) => (deserializeTransferRun(item))) : undefined,
  };
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
 * A specification for a time range, this will request transfer runs with
 * run_time between start_time (inclusive) and end_time (exclusive).
 */
export interface TimeRange {
  /**
   * End time of the range of transfer runs. For example,
   * `"2017-05-30T00:00:00+00:00"`. The end_time must not be in the future.
   * Creates transfer runs where run_time is in the range between start_time
   * (inclusive) and end_time (exclusive).
   */
  endTime?: Date;
  /**
   * Start time of the range of transfer runs. For example,
   * `"2017-05-25T00:00:00+00:00"`. The start_time must be strictly less than
   * the end_time. Creates transfer runs where run_time is in the range between
   * start_time (inclusive) and end_time (exclusive).
   */
  startTime?: Date;
}

function serializeTimeRange(data: any): TimeRange {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeTimeRange(data: any): TimeRange {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Represents a data transfer configuration. A transfer configuration contains
 * all metadata needed to perform a data transfer. For example,
 * `destination_dataset_id` specifies where data should be stored. When a new
 * transfer configuration is created, the specified `destination_dataset_id` is
 * created when needed and shared with the appropriate data source service
 * account.
 */
export interface TransferConfig {
  /**
   * The number of days to look back to automatically refresh the data. For
   * example, if `data_refresh_window_days = 10`, then every day BigQuery
   * reingests data for [today-10, today-1], rather than ingesting data for just
   * [today-1]. Only valid if the data source supports the feature. Set the
   * value to 0 to use the default value.
   */
  dataRefreshWindowDays?: number;
  /**
   * Output only. Region in which BigQuery dataset is located.
   */
  readonly datasetRegion?: string;
  /**
   * Data source ID. This cannot be changed once data transfer is created. The
   * full list of available data source IDs can be returned through an API call:
   * https://cloud.google.com/bigquery-transfer/docs/reference/datatransfer/rest/v1/projects.locations.dataSources/list
   */
  dataSourceId?: string;
  /**
   * The BigQuery target dataset id.
   */
  destinationDatasetId?: string;
  /**
   * Is this config disabled. When set to true, no runs are scheduled for a
   * given transfer.
   */
  disabled?: boolean;
  /**
   * User specified display name for the data transfer.
   */
  displayName?: string;
  /**
   * Email notifications will be sent according to these preferences to the
   * email address of the user who owns this transfer config.
   */
  emailPreferences?: EmailPreferences;
  /**
   * The resource name of the transfer config. Transfer config names have the
   * form
   * `projects/{project_id}/locations/{region}/transferConfigs/{config_id}`.
   * Where `config_id` is usually a uuid, even though it is not guaranteed or
   * required. The name is ignored when creating a transfer config.
   */
  name?: string;
  /**
   * Output only. Next time when data transfer will run.
   */
  readonly nextRunTime?: Date;
  /**
   * Pub/Sub topic where notifications will be sent after transfer runs
   * associated with this transfer config finish. The format for specifying a
   * pubsub topic is: `projects/{project}/topics/{topic}`
   */
  notificationPubsubTopic?: string;
  /**
   * Output only. Information about the user whose credentials are used to
   * transfer data. Populated only for `transferConfigs.get` requests. In case
   * the user information is not available, this field will not be populated.
   */
  readonly ownerInfo?: UserInfo;
  /**
   * Parameters specific to each data source. For more information see the bq
   * tab in the 'Setting up a data transfer' section for each data source. For
   * example the parameters for Cloud Storage transfers are listed here:
   * https://cloud.google.com/bigquery-transfer/docs/cloud-storage-transfer#bq
   */
  params?: {
    [key: string]: any
  };
  /**
   * Data transfer schedule. If the data source does not support a custom
   * schedule, this should be empty. If it is empty, the default value for the
   * data source will be used. The specified times are in UTC. Examples of valid
   * format: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`,
   * and `first sunday of quarter 00:00`. See more explanation about the format
   * here:
   * https://cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#the_schedule_format
   * NOTE: The minimum interval time between recurring transfers depends on the
   * data source; refer to the documentation for your data source.
   */
  schedule?: string;
  /**
   * Options customizing the data transfer schedule.
   */
  scheduleOptions?: ScheduleOptions;
  /**
   * Output only. State of the most recently updated transfer run.
   */
  readonly state?:  | "TRANSFER_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
  /**
   * Output only. Data transfer modification time. Ignored by server on input.
   */
  readonly updateTime?: Date;
  /**
   * Deprecated. Unique ID of the user on whose behalf transfer is done.
   */
  userId?: bigint;
}

function serializeTransferConfig(data: any): TransferConfig {
  return {
    ...data,
    scheduleOptions: data["scheduleOptions"] !== undefined ? serializeScheduleOptions(data["scheduleOptions"]) : undefined,
    userId: data["userId"] !== undefined ? String(data["userId"]) : undefined,
  };
}

function deserializeTransferConfig(data: any): TransferConfig {
  return {
    ...data,
    nextRunTime: data["nextRunTime"] !== undefined ? new Date(data["nextRunTime"]) : undefined,
    scheduleOptions: data["scheduleOptions"] !== undefined ? deserializeScheduleOptions(data["scheduleOptions"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    userId: data["userId"] !== undefined ? BigInt(data["userId"]) : undefined,
  };
}

/**
 * Represents a user facing message for a particular data transfer run.
 */
export interface TransferMessage {
  /**
   * Message text.
   */
  messageText?: string;
  /**
   * Time when message was logged.
   */
  messageTime?: Date;
  /**
   * Message severity.
   */
  severity?:  | "MESSAGE_SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR";
}

function serializeTransferMessage(data: any): TransferMessage {
  return {
    ...data,
    messageTime: data["messageTime"] !== undefined ? data["messageTime"].toISOString() : undefined,
  };
}

function deserializeTransferMessage(data: any): TransferMessage {
  return {
    ...data,
    messageTime: data["messageTime"] !== undefined ? new Date(data["messageTime"]) : undefined,
  };
}

/**
 * Represents a data transfer run.
 */
export interface TransferRun {
  /**
   * Output only. Data source id.
   */
  readonly dataSourceId?: string;
  /**
   * Output only. The BigQuery target dataset id.
   */
  readonly destinationDatasetId?: string;
  /**
   * Output only. Email notifications will be sent according to these
   * preferences to the email address of the user who owns the transfer config
   * this run was derived from.
   */
  readonly emailPreferences?: EmailPreferences;
  /**
   * Output only. Time when transfer run ended. Parameter ignored by server for
   * input requests.
   */
  readonly endTime?: Date;
  /**
   * Status of the transfer run.
   */
  errorStatus?: Status;
  /**
   * The resource name of the transfer run. Transfer run names have the form
   * `projects/{project_id}/locations/{location}/transferConfigs/{config_id}/runs/{run_id}`.
   * The name is ignored when creating a transfer run.
   */
  name?: string;
  /**
   * Output only. Pub/Sub topic where a notification will be sent after this
   * transfer run finishes. The format for specifying a pubsub topic is:
   * `projects/{project}/topics/{topic}`
   */
  readonly notificationPubsubTopic?: string;
  /**
   * Output only. Parameters specific to each data source. For more information
   * see the bq tab in the 'Setting up a data transfer' section for each data
   * source. For example the parameters for Cloud Storage transfers are listed
   * here:
   * https://cloud.google.com/bigquery-transfer/docs/cloud-storage-transfer#bq
   */
  readonly params?: {
    [key: string]: any
  };
  /**
   * For batch transfer runs, specifies the date and time of the data should be
   * ingested.
   */
  runTime?: Date;
  /**
   * Output only. Describes the schedule of this transfer run if it was created
   * as part of a regular schedule. For batch transfer runs that are scheduled
   * manually, this is empty. NOTE: the system might choose to delay the
   * schedule depending on the current load, so `schedule_time` doesn't always
   * match this.
   */
  readonly schedule?: string;
  /**
   * Minimum time after which a transfer run can be started.
   */
  scheduleTime?: Date;
  /**
   * Output only. Time when transfer run was started. Parameter ignored by
   * server for input requests.
   */
  readonly startTime?: Date;
  /**
   * Data transfer run state. Ignored for input requests.
   */
  state?:  | "TRANSFER_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
  /**
   * Output only. Last time the data transfer run state was updated.
   */
  readonly updateTime?: Date;
  /**
   * Deprecated. Unique ID of the user on whose behalf transfer is done.
   */
  userId?: bigint;
}

function serializeTransferRun(data: any): TransferRun {
  return {
    ...data,
    runTime: data["runTime"] !== undefined ? data["runTime"].toISOString() : undefined,
    scheduleTime: data["scheduleTime"] !== undefined ? data["scheduleTime"].toISOString() : undefined,
    userId: data["userId"] !== undefined ? String(data["userId"]) : undefined,
  };
}

function deserializeTransferRun(data: any): TransferRun {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    runTime: data["runTime"] !== undefined ? new Date(data["runTime"]) : undefined,
    scheduleTime: data["scheduleTime"] !== undefined ? new Date(data["scheduleTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    userId: data["userId"] !== undefined ? BigInt(data["userId"]) : undefined,
  };
}

/**
 * Information about a user.
 */
export interface UserInfo {
  /**
   * E-mail address of the user.
   */
  email?: string;
}