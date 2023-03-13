// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Google Analytics API Client for Deno
 * ====================================
 * 
 * Views and manages your Google Analytics data.
 * 
 * Docs: https://developers.google.com/analytics/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Views and manages your Google Analytics data.
 */
export class Analytics {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://analytics.googleapis.com/analytics/v3/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns Analytics data for a view (profile).
   *
   */
  async dataGaGet(opts: DataGaGetOptions = {}): Promise<GaData> {
    const url = new URL(`${this.#baseUrl}data/ga`);
    if (opts.dimensions !== undefined) {
      url.searchParams.append("dimensions", String(opts.dimensions));
    }
    if (opts.end-date !== undefined) {
      url.searchParams.append("end-date", String(opts.end-date));
    }
    if (opts.filters !== undefined) {
      url.searchParams.append("filters", String(opts.filters));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.include-empty-rows !== undefined) {
      url.searchParams.append("include-empty-rows", String(opts.include-empty-rows));
    }
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.metrics !== undefined) {
      url.searchParams.append("metrics", String(opts.metrics));
    }
    if (opts.output !== undefined) {
      url.searchParams.append("output", String(opts.output));
    }
    if (opts.samplingLevel !== undefined) {
      url.searchParams.append("samplingLevel", String(opts.samplingLevel));
    }
    if (opts.segment !== undefined) {
      url.searchParams.append("segment", String(opts.segment));
    }
    if (opts.sort !== undefined) {
      url.searchParams.append("sort", String(opts.sort));
    }
    if (opts.start-date !== undefined) {
      url.searchParams.append("start-date", String(opts.start-date));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGaData(data);
  }

  /**
   * Returns Analytics Multi-Channel Funnels data for a view (profile).
   *
   */
  async dataMcfGet(opts: DataMcfGetOptions = {}): Promise<McfData> {
    const url = new URL(`${this.#baseUrl}data/mcf`);
    if (opts.dimensions !== undefined) {
      url.searchParams.append("dimensions", String(opts.dimensions));
    }
    if (opts.end-date !== undefined) {
      url.searchParams.append("end-date", String(opts.end-date));
    }
    if (opts.filters !== undefined) {
      url.searchParams.append("filters", String(opts.filters));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.metrics !== undefined) {
      url.searchParams.append("metrics", String(opts.metrics));
    }
    if (opts.samplingLevel !== undefined) {
      url.searchParams.append("samplingLevel", String(opts.samplingLevel));
    }
    if (opts.sort !== undefined) {
      url.searchParams.append("sort", String(opts.sort));
    }
    if (opts.start-date !== undefined) {
      url.searchParams.append("start-date", String(opts.start-date));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeMcfData(data);
  }

  /**
   * Returns real time data for a view (profile).
   *
   */
  async dataRealtimeGet(opts: DataRealtimeGetOptions = {}): Promise<RealtimeData> {
    const url = new URL(`${this.#baseUrl}data/realtime`);
    if (opts.dimensions !== undefined) {
      url.searchParams.append("dimensions", String(opts.dimensions));
    }
    if (opts.filters !== undefined) {
      url.searchParams.append("filters", String(opts.filters));
    }
    if (opts.ids !== undefined) {
      url.searchParams.append("ids", String(opts.ids));
    }
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.metrics !== undefined) {
      url.searchParams.append("metrics", String(opts.metrics));
    }
    if (opts.sort !== undefined) {
      url.searchParams.append("sort", String(opts.sort));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as RealtimeData;
  }

  /**
   * Lists all accounts to which the user has access.
   *
   */
  async managementAccountsList(opts: ManagementAccountsListOptions = {}): Promise<Accounts> {
    const url = new URL(`${this.#baseUrl}management/accounts`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAccounts(data);
  }

  /**
   * Lists account summaries (lightweight tree comprised of
   * accounts/properties/profiles) to which the user has access.
   *
   */
  async managementAccountSummariesList(opts: ManagementAccountSummariesListOptions = {}): Promise<AccountSummaries> {
    const url = new URL(`${this.#baseUrl}management/accountSummaries`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AccountSummaries;
  }

  /**
   * Removes a user from the given account.
   *
   * @param accountId Account ID to delete the user link for.
   * @param linkId Link ID to delete the user link for.
   */
  async managementAccountUserLinksDelete(accountId: string, linkId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/entityUserLinks/${ linkId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Adds a new user to the given account.
   *
   * @param accountId Account ID to create the user link for.
   */
  async managementAccountUserLinksInsert(accountId: string, req: EntityUserLink): Promise<EntityUserLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/entityUserLinks`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as EntityUserLink;
  }

  /**
   * Lists account-user links for a given account.
   *
   * @param accountId Account ID to retrieve the user links for.
   */
  async managementAccountUserLinksList(accountId: string, opts: ManagementAccountUserLinksListOptions = {}): Promise<EntityUserLinks> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/entityUserLinks`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as EntityUserLinks;
  }

  /**
   * Updates permissions for an existing user on the given account.
   *
   * @param accountId Account ID to update the account-user link for.
   * @param linkId Link ID to update the account-user link for.
   */
  async managementAccountUserLinksUpdate(accountId: string, linkId: string, req: EntityUserLink): Promise<EntityUserLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/entityUserLinks/${ linkId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as EntityUserLink;
  }

  /**
   * Hashes the given Client ID.
   *
   */
  async managementClientIdHashClientId(req: HashClientIdRequest): Promise<HashClientIdResponse> {
    const url = new URL(`${this.#baseUrl}management/clientId:hashClientId`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as HashClientIdResponse;
  }

  /**
   * List custom data sources to which the user has access.
   *
   * @param accountId Account Id for the custom data sources to retrieve.
   * @param webPropertyId Web property Id for the custom data sources to retrieve.
   */
  async managementCustomDataSourcesList(accountId: string, webPropertyId: string, opts: ManagementCustomDataSourcesListOptions = {}): Promise<CustomDataSources> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customDataSources`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeCustomDataSources(data);
  }

  /**
   * Get a custom dimension to which the user has access.
   *
   * @param accountId Account ID for the custom dimension to retrieve.
   * @param customDimensionId The ID of the custom dimension to retrieve.
   * @param webPropertyId Web property ID for the custom dimension to retrieve.
   */
  async managementCustomDimensionsGet(accountId: string, customDimensionId: string, webPropertyId: string): Promise<CustomDimension> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customDimensions/${ customDimensionId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomDimension;
  }

  /**
   * Create a new custom dimension.
   *
   * @param accountId Account ID for the custom dimension to create.
   * @param webPropertyId Web property ID for the custom dimension to create.
   */
  async managementCustomDimensionsInsert(accountId: string, webPropertyId: string, req: CustomDimension): Promise<CustomDimension> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customDimensions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CustomDimension;
  }

  /**
   * Lists custom dimensions to which the user has access.
   *
   * @param accountId Account ID for the custom dimensions to retrieve.
   * @param webPropertyId Web property ID for the custom dimensions to retrieve.
   */
  async managementCustomDimensionsList(accountId: string, webPropertyId: string, opts: ManagementCustomDimensionsListOptions = {}): Promise<CustomDimensions> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customDimensions`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomDimensions;
  }

  /**
   * Updates an existing custom dimension. This method supports patch
   * semantics.
   *
   * @param accountId Account ID for the custom dimension to update.
   * @param customDimensionId Custom dimension ID for the custom dimension to update.
   * @param webPropertyId Web property ID for the custom dimension to update.
   */
  async managementCustomDimensionsPatch(accountId: string, customDimensionId: string, webPropertyId: string, req: CustomDimension, opts: ManagementCustomDimensionsPatchOptions = {}): Promise<CustomDimension> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customDimensions/${ customDimensionId }`);
    if (opts.ignoreCustomDataSourceLinks !== undefined) {
      url.searchParams.append("ignoreCustomDataSourceLinks", String(opts.ignoreCustomDataSourceLinks));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as CustomDimension;
  }

  /**
   * Updates an existing custom dimension.
   *
   * @param accountId Account ID for the custom dimension to update.
   * @param customDimensionId Custom dimension ID for the custom dimension to update.
   * @param webPropertyId Web property ID for the custom dimension to update.
   */
  async managementCustomDimensionsUpdate(accountId: string, customDimensionId: string, webPropertyId: string, req: CustomDimension, opts: ManagementCustomDimensionsUpdateOptions = {}): Promise<CustomDimension> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customDimensions/${ customDimensionId }`);
    if (opts.ignoreCustomDataSourceLinks !== undefined) {
      url.searchParams.append("ignoreCustomDataSourceLinks", String(opts.ignoreCustomDataSourceLinks));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as CustomDimension;
  }

  /**
   * Get a custom metric to which the user has access.
   *
   * @param accountId Account ID for the custom metric to retrieve.
   * @param customMetricId The ID of the custom metric to retrieve.
   * @param webPropertyId Web property ID for the custom metric to retrieve.
   */
  async managementCustomMetricsGet(accountId: string, customMetricId: string, webPropertyId: string): Promise<CustomMetric> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customMetrics/${ customMetricId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomMetric;
  }

  /**
   * Create a new custom metric.
   *
   * @param accountId Account ID for the custom metric to create.
   * @param webPropertyId Web property ID for the custom dimension to create.
   */
  async managementCustomMetricsInsert(accountId: string, webPropertyId: string, req: CustomMetric): Promise<CustomMetric> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customMetrics`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CustomMetric;
  }

  /**
   * Lists custom metrics to which the user has access.
   *
   * @param accountId Account ID for the custom metrics to retrieve.
   * @param webPropertyId Web property ID for the custom metrics to retrieve.
   */
  async managementCustomMetricsList(accountId: string, webPropertyId: string, opts: ManagementCustomMetricsListOptions = {}): Promise<CustomMetrics> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customMetrics`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomMetrics;
  }

  /**
   * Updates an existing custom metric. This method supports patch semantics.
   *
   * @param accountId Account ID for the custom metric to update.
   * @param customMetricId Custom metric ID for the custom metric to update.
   * @param webPropertyId Web property ID for the custom metric to update.
   */
  async managementCustomMetricsPatch(accountId: string, customMetricId: string, webPropertyId: string, req: CustomMetric, opts: ManagementCustomMetricsPatchOptions = {}): Promise<CustomMetric> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customMetrics/${ customMetricId }`);
    if (opts.ignoreCustomDataSourceLinks !== undefined) {
      url.searchParams.append("ignoreCustomDataSourceLinks", String(opts.ignoreCustomDataSourceLinks));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as CustomMetric;
  }

  /**
   * Updates an existing custom metric.
   *
   * @param accountId Account ID for the custom metric to update.
   * @param customMetricId Custom metric ID for the custom metric to update.
   * @param webPropertyId Web property ID for the custom metric to update.
   */
  async managementCustomMetricsUpdate(accountId: string, customMetricId: string, webPropertyId: string, req: CustomMetric, opts: ManagementCustomMetricsUpdateOptions = {}): Promise<CustomMetric> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customMetrics/${ customMetricId }`);
    if (opts.ignoreCustomDataSourceLinks !== undefined) {
      url.searchParams.append("ignoreCustomDataSourceLinks", String(opts.ignoreCustomDataSourceLinks));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as CustomMetric;
  }

  /**
   * Delete an experiment.
   *
   * @param accountId Account ID to which the experiment belongs
   * @param experimentId ID of the experiment to delete
   * @param profileId View (Profile) ID to which the experiment belongs
   * @param webPropertyId Web property ID to which the experiment belongs
   */
  async managementExperimentsDelete(accountId: string, experimentId: string, profileId: string, webPropertyId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/experiments/${ experimentId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns an experiment to which the user has access.
   *
   * @param accountId Account ID to retrieve the experiment for.
   * @param experimentId Experiment ID to retrieve the experiment for.
   * @param profileId View (Profile) ID to retrieve the experiment for.
   * @param webPropertyId Web property ID to retrieve the experiment for.
   */
  async managementExperimentsGet(accountId: string, experimentId: string, profileId: string, webPropertyId: string): Promise<Experiment> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/experiments/${ experimentId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeExperiment(data);
  }

  /**
   * Create a new experiment.
   *
   * @param accountId Account ID to create the experiment for.
   * @param profileId View (Profile) ID to create the experiment for.
   * @param webPropertyId Web property ID to create the experiment for.
   */
  async managementExperimentsInsert(accountId: string, profileId: string, webPropertyId: string, req: Experiment): Promise<Experiment> {
    req = serializeExperiment(req);
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/experiments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeExperiment(data);
  }

  /**
   * Lists experiments to which the user has access.
   *
   * @param accountId Account ID to retrieve experiments for.
   * @param profileId View (Profile) ID to retrieve experiments for.
   * @param webPropertyId Web property ID to retrieve experiments for.
   */
  async managementExperimentsList(accountId: string, profileId: string, webPropertyId: string, opts: ManagementExperimentsListOptions = {}): Promise<Experiments> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/experiments`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeExperiments(data);
  }

  /**
   * Update an existing experiment. This method supports patch semantics.
   *
   * @param accountId Account ID of the experiment to update.
   * @param experimentId Experiment ID of the experiment to update.
   * @param profileId View (Profile) ID of the experiment to update.
   * @param webPropertyId Web property ID of the experiment to update.
   */
  async managementExperimentsPatch(accountId: string, experimentId: string, profileId: string, webPropertyId: string, req: Experiment): Promise<Experiment> {
    req = serializeExperiment(req);
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/experiments/${ experimentId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeExperiment(data);
  }

  /**
   * Update an existing experiment.
   *
   * @param accountId Account ID of the experiment to update.
   * @param experimentId Experiment ID of the experiment to update.
   * @param profileId View (Profile) ID of the experiment to update.
   * @param webPropertyId Web property ID of the experiment to update.
   */
  async managementExperimentsUpdate(accountId: string, experimentId: string, profileId: string, webPropertyId: string, req: Experiment): Promise<Experiment> {
    req = serializeExperiment(req);
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/experiments/${ experimentId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeExperiment(data);
  }

  /**
   * Delete a filter.
   *
   * @param accountId Account ID to delete the filter for.
   * @param filterId ID of the filter to be deleted.
   */
  async managementFiltersDelete(accountId: string, filterId: string): Promise<Filter> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/filters/${ filterId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Filter;
  }

  /**
   * Returns filters to which the user has access.
   *
   * @param accountId Account ID to retrieve filters for.
   * @param filterId Filter ID to retrieve filters for.
   */
  async managementFiltersGet(accountId: string, filterId: string): Promise<Filter> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/filters/${ filterId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Filter;
  }

  /**
   * Create a new filter.
   *
   * @param accountId Account ID to create filter for.
   */
  async managementFiltersInsert(accountId: string, req: Filter): Promise<Filter> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/filters`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Filter;
  }

  /**
   * Lists all filters for an account
   *
   * @param accountId Account ID to retrieve filters for.
   */
  async managementFiltersList(accountId: string, opts: ManagementFiltersListOptions = {}): Promise<Filters> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/filters`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Filters;
  }

  /**
   * Updates an existing filter. This method supports patch semantics.
   *
   * @param accountId Account ID to which the filter belongs.
   * @param filterId ID of the filter to be updated.
   */
  async managementFiltersPatch(accountId: string, filterId: string, req: Filter): Promise<Filter> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/filters/${ filterId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Filter;
  }

  /**
   * Updates an existing filter.
   *
   * @param accountId Account ID to which the filter belongs.
   * @param filterId ID of the filter to be updated.
   */
  async managementFiltersUpdate(accountId: string, filterId: string, req: Filter): Promise<Filter> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/filters/${ filterId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Filter;
  }

  /**
   * Gets a goal to which the user has access.
   *
   * @param accountId Account ID to retrieve the goal for.
   * @param goalId Goal ID to retrieve the goal for.
   * @param profileId View (Profile) ID to retrieve the goal for.
   * @param webPropertyId Web property ID to retrieve the goal for.
   */
  async managementGoalsGet(accountId: string, goalId: string, profileId: string, webPropertyId: string): Promise<Goal> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/goals/${ goalId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoal(data);
  }

  /**
   * Create a new goal.
   *
   * @param accountId Account ID to create the goal for.
   * @param profileId View (Profile) ID to create the goal for.
   * @param webPropertyId Web property ID to create the goal for.
   */
  async managementGoalsInsert(accountId: string, profileId: string, webPropertyId: string, req: Goal): Promise<Goal> {
    req = serializeGoal(req);
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/goals`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoal(data);
  }

  /**
   * Lists goals to which the user has access.
   *
   * @param accountId Account ID to retrieve goals for. Can either be a specific account ID or '~all', which refers to all the accounts that user has access to.
   * @param profileId View (Profile) ID to retrieve goals for. Can either be a specific view (profile) ID or '~all', which refers to all the views (profiles) that user has access to.
   * @param webPropertyId Web property ID to retrieve goals for. Can either be a specific web property ID or '~all', which refers to all the web properties that user has access to.
   */
  async managementGoalsList(accountId: string, profileId: string, webPropertyId: string, opts: ManagementGoalsListOptions = {}): Promise<Goals> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/goals`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoals(data);
  }

  /**
   * Updates an existing goal. This method supports patch semantics.
   *
   * @param accountId Account ID to update the goal.
   * @param goalId Index of the goal to be updated.
   * @param profileId View (Profile) ID to update the goal.
   * @param webPropertyId Web property ID to update the goal.
   */
  async managementGoalsPatch(accountId: string, goalId: string, profileId: string, webPropertyId: string, req: Goal): Promise<Goal> {
    req = serializeGoal(req);
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/goals/${ goalId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoal(data);
  }

  /**
   * Updates an existing goal.
   *
   * @param accountId Account ID to update the goal.
   * @param goalId Index of the goal to be updated.
   * @param profileId View (Profile) ID to update the goal.
   * @param webPropertyId Web property ID to update the goal.
   */
  async managementGoalsUpdate(accountId: string, goalId: string, profileId: string, webPropertyId: string, req: Goal): Promise<Goal> {
    req = serializeGoal(req);
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/goals/${ goalId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeGoal(data);
  }

  /**
   * Delete a profile filter link.
   *
   * @param accountId Account ID to which the profile filter link belongs.
   * @param linkId ID of the profile filter link to delete.
   * @param profileId Profile ID to which the filter link belongs.
   * @param webPropertyId Web property Id to which the profile filter link belongs.
   */
  async managementProfileFilterLinksDelete(accountId: string, linkId: string, profileId: string, webPropertyId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/profileFilterLinks/${ linkId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns a single profile filter link.
   *
   * @param accountId Account ID to retrieve profile filter link for.
   * @param linkId ID of the profile filter link.
   * @param profileId Profile ID to retrieve filter link for.
   * @param webPropertyId Web property Id to retrieve profile filter link for.
   */
  async managementProfileFilterLinksGet(accountId: string, linkId: string, profileId: string, webPropertyId: string): Promise<ProfileFilterLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/profileFilterLinks/${ linkId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ProfileFilterLink;
  }

  /**
   * Create a new profile filter link.
   *
   * @param accountId Account ID to create profile filter link for.
   * @param profileId Profile ID to create filter link for.
   * @param webPropertyId Web property Id to create profile filter link for.
   */
  async managementProfileFilterLinksInsert(accountId: string, profileId: string, webPropertyId: string, req: ProfileFilterLink): Promise<ProfileFilterLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/profileFilterLinks`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ProfileFilterLink;
  }

  /**
   * Lists all profile filter links for a profile.
   *
   * @param accountId Account ID to retrieve profile filter links for.
   * @param profileId Profile ID to retrieve filter links for. Can either be a specific profile ID or '~all', which refers to all the profiles that user has access to.
   * @param webPropertyId Web property Id for profile filter links for. Can either be a specific web property ID or '~all', which refers to all the web properties that user has access to.
   */
  async managementProfileFilterLinksList(accountId: string, profileId: string, webPropertyId: string, opts: ManagementProfileFilterLinksListOptions = {}): Promise<ProfileFilterLinks> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/profileFilterLinks`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ProfileFilterLinks;
  }

  /**
   * Update an existing profile filter link. This method supports patch
   * semantics.
   *
   * @param accountId Account ID to which profile filter link belongs.
   * @param linkId ID of the profile filter link to be updated.
   * @param profileId Profile ID to which filter link belongs
   * @param webPropertyId Web property Id to which profile filter link belongs
   */
  async managementProfileFilterLinksPatch(accountId: string, linkId: string, profileId: string, webPropertyId: string, req: ProfileFilterLink): Promise<ProfileFilterLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/profileFilterLinks/${ linkId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as ProfileFilterLink;
  }

  /**
   * Update an existing profile filter link.
   *
   * @param accountId Account ID to which profile filter link belongs.
   * @param linkId ID of the profile filter link to be updated.
   * @param profileId Profile ID to which filter link belongs
   * @param webPropertyId Web property Id to which profile filter link belongs
   */
  async managementProfileFilterLinksUpdate(accountId: string, linkId: string, profileId: string, webPropertyId: string, req: ProfileFilterLink): Promise<ProfileFilterLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/profileFilterLinks/${ linkId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as ProfileFilterLink;
  }

  /**
   * Deletes a view (profile).
   *
   * @param accountId Account ID to delete the view (profile) for.
   * @param profileId ID of the view (profile) to be deleted.
   * @param webPropertyId Web property ID to delete the view (profile) for.
   */
  async managementProfilesDelete(accountId: string, profileId: string, webPropertyId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a view (profile) to which the user has access.
   *
   * @param accountId Account ID to retrieve the view (profile) for.
   * @param profileId View (Profile) ID to retrieve the view (profile) for.
   * @param webPropertyId Web property ID to retrieve the view (profile) for.
   */
  async managementProfilesGet(accountId: string, profileId: string, webPropertyId: string): Promise<Profile> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Profile;
  }

  /**
   * Create a new view (profile).
   *
   * @param accountId Account ID to create the view (profile) for.
   * @param webPropertyId Web property ID to create the view (profile) for.
   */
  async managementProfilesInsert(accountId: string, webPropertyId: string, req: Profile): Promise<Profile> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Profile;
  }

  /**
   * Lists views (profiles) to which the user has access.
   *
   * @param accountId Account ID for the view (profiles) to retrieve. Can either be a specific account ID or '~all', which refers to all the accounts to which the user has access.
   * @param webPropertyId Web property ID for the views (profiles) to retrieve. Can either be a specific web property ID or '~all', which refers to all the web properties to which the user has access.
   */
  async managementProfilesList(accountId: string, webPropertyId: string, opts: ManagementProfilesListOptions = {}): Promise<Profiles> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Profiles;
  }

  /**
   * Updates an existing view (profile). This method supports patch semantics.
   *
   * @param accountId Account ID to which the view (profile) belongs
   * @param profileId ID of the view (profile) to be updated.
   * @param webPropertyId Web property ID to which the view (profile) belongs
   */
  async managementProfilesPatch(accountId: string, profileId: string, webPropertyId: string, req: Profile): Promise<Profile> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Profile;
  }

  /**
   * Updates an existing view (profile).
   *
   * @param accountId Account ID to which the view (profile) belongs
   * @param profileId ID of the view (profile) to be updated.
   * @param webPropertyId Web property ID to which the view (profile) belongs
   */
  async managementProfilesUpdate(accountId: string, profileId: string, webPropertyId: string, req: Profile): Promise<Profile> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as Profile;
  }

  /**
   * Removes a user from the given view (profile).
   *
   * @param accountId Account ID to delete the user link for.
   * @param linkId Link ID to delete the user link for.
   * @param profileId View (Profile) ID to delete the user link for.
   * @param webPropertyId Web Property ID to delete the user link for.
   */
  async managementProfileUserLinksDelete(accountId: string, linkId: string, profileId: string, webPropertyId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/entityUserLinks/${ linkId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Adds a new user to the given view (profile).
   *
   * @param accountId Account ID to create the user link for.
   * @param profileId View (Profile) ID to create the user link for.
   * @param webPropertyId Web Property ID to create the user link for.
   */
  async managementProfileUserLinksInsert(accountId: string, profileId: string, webPropertyId: string, req: EntityUserLink): Promise<EntityUserLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/entityUserLinks`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as EntityUserLink;
  }

  /**
   * Lists profile-user links for a given view (profile).
   *
   * @param accountId Account ID which the given view (profile) belongs to.
   * @param profileId View (Profile) ID to retrieve the profile-user links for. Can either be a specific profile ID or '~all', which refers to all the profiles that user has access to.
   * @param webPropertyId Web Property ID which the given view (profile) belongs to. Can either be a specific web property ID or '~all', which refers to all the web properties that user has access to.
   */
  async managementProfileUserLinksList(accountId: string, profileId: string, webPropertyId: string, opts: ManagementProfileUserLinksListOptions = {}): Promise<EntityUserLinks> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/entityUserLinks`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as EntityUserLinks;
  }

  /**
   * Updates permissions for an existing user on the given view (profile).
   *
   * @param accountId Account ID to update the user link for.
   * @param linkId Link ID to update the user link for.
   * @param profileId View (Profile ID) to update the user link for.
   * @param webPropertyId Web Property ID to update the user link for.
   */
  async managementProfileUserLinksUpdate(accountId: string, linkId: string, profileId: string, webPropertyId: string, req: EntityUserLink): Promise<EntityUserLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/entityUserLinks/${ linkId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as EntityUserLink;
  }

  /**
   * Delete a remarketing audience.
   *
   * @param accountId Account ID to which the remarketing audience belongs.
   * @param remarketingAudienceId The ID of the remarketing audience to delete.
   * @param webPropertyId Web property ID to which the remarketing audience belongs.
   */
  async managementRemarketingAudienceDelete(accountId: string, remarketingAudienceId: string, webPropertyId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/remarketingAudiences/${ remarketingAudienceId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Gets a remarketing audience to which the user has access.
   *
   * @param accountId The account ID of the remarketing audience to retrieve.
   * @param remarketingAudienceId The ID of the remarketing audience to retrieve.
   * @param webPropertyId The web property ID of the remarketing audience to retrieve.
   */
  async managementRemarketingAudienceGet(accountId: string, remarketingAudienceId: string, webPropertyId: string): Promise<RemarketingAudience> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/remarketingAudiences/${ remarketingAudienceId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as RemarketingAudience;
  }

  /**
   * Creates a new remarketing audience.
   *
   * @param accountId The account ID for which to create the remarketing audience.
   * @param webPropertyId Web property ID for which to create the remarketing audience.
   */
  async managementRemarketingAudienceInsert(accountId: string, webPropertyId: string, req: RemarketingAudience): Promise<RemarketingAudience> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/remarketingAudiences`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as RemarketingAudience;
  }

  /**
   * Lists remarketing audiences to which the user has access.
   *
   * @param accountId The account ID of the remarketing audiences to retrieve.
   * @param webPropertyId The web property ID of the remarketing audiences to retrieve.
   */
  async managementRemarketingAudienceList(accountId: string, webPropertyId: string, opts: ManagementRemarketingAudienceListOptions = {}): Promise<RemarketingAudiences> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/remarketingAudiences`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as RemarketingAudiences;
  }

  /**
   * Updates an existing remarketing audience. This method supports patch
   * semantics.
   *
   * @param accountId The account ID of the remarketing audience to update.
   * @param remarketingAudienceId The ID of the remarketing audience to update.
   * @param webPropertyId The web property ID of the remarketing audience to update.
   */
  async managementRemarketingAudiencePatch(accountId: string, remarketingAudienceId: string, webPropertyId: string, req: RemarketingAudience): Promise<RemarketingAudience> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/remarketingAudiences/${ remarketingAudienceId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as RemarketingAudience;
  }

  /**
   * Updates an existing remarketing audience.
   *
   * @param accountId The account ID of the remarketing audience to update.
   * @param remarketingAudienceId The ID of the remarketing audience to update.
   * @param webPropertyId The web property ID of the remarketing audience to update.
   */
  async managementRemarketingAudienceUpdate(accountId: string, remarketingAudienceId: string, webPropertyId: string, req: RemarketingAudience): Promise<RemarketingAudience> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/remarketingAudiences/${ remarketingAudienceId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as RemarketingAudience;
  }

  /**
   * Lists segments to which the user has access.
   *
   */
  async managementSegmentsList(opts: ManagementSegmentsListOptions = {}): Promise<Segments> {
    const url = new URL(`${this.#baseUrl}management/segments`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSegments(data);
  }

  /**
   * Deletes an unsampled report.
   *
   * @param accountId Account ID to delete the unsampled report for.
   * @param profileId View (Profile) ID to delete the unsampled report for.
   * @param unsampledReportId ID of the unsampled report to be deleted.
   * @param webPropertyId Web property ID to delete the unsampled reports for.
   */
  async managementUnsampledReportsDelete(accountId: string, profileId: string, unsampledReportId: string, webPropertyId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/unsampledReports/${ unsampledReportId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns a single unsampled report.
   *
   * @param accountId Account ID to retrieve unsampled report for.
   * @param profileId View (Profile) ID to retrieve unsampled report for.
   * @param unsampledReportId ID of the unsampled report to retrieve.
   * @param webPropertyId Web property ID to retrieve unsampled reports for.
   */
  async managementUnsampledReportsGet(accountId: string, profileId: string, unsampledReportId: string, webPropertyId: string): Promise<UnsampledReport> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/unsampledReports/${ unsampledReportId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as UnsampledReport;
  }

  /**
   * Create a new unsampled report.
   *
   * @param accountId Account ID to create the unsampled report for.
   * @param profileId View (Profile) ID to create the unsampled report for.
   * @param webPropertyId Web property ID to create the unsampled report for.
   */
  async managementUnsampledReportsInsert(accountId: string, profileId: string, webPropertyId: string, req: UnsampledReport): Promise<UnsampledReport> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/unsampledReports`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UnsampledReport;
  }

  /**
   * Lists unsampled reports to which the user has access.
   *
   * @param accountId Account ID to retrieve unsampled reports for. Must be a specific account ID, ~all is not supported.
   * @param profileId View (Profile) ID to retrieve unsampled reports for. Must be a specific view (profile) ID, ~all is not supported.
   * @param webPropertyId Web property ID to retrieve unsampled reports for. Must be a specific web property ID, ~all is not supported.
   */
  async managementUnsampledReportsList(accountId: string, profileId: string, webPropertyId: string, opts: ManagementUnsampledReportsListOptions = {}): Promise<UnsampledReports> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/profiles/${ profileId }/unsampledReports`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as UnsampledReports;
  }

  /**
   * Delete data associated with a previous upload.
   *
   * @param accountId Account Id for the uploads to be deleted.
   * @param customDataSourceId Custom data source Id for the uploads to be deleted.
   * @param webPropertyId Web property Id for the uploads to be deleted.
   */
  async managementUploadsDeleteUploadData(accountId: string, customDataSourceId: string, webPropertyId: string, req: AnalyticsDataimportDeleteUploadDataRequest): Promise<void> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customDataSources/${ customDataSourceId }/deleteUploadData`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
  }

  /**
   * List uploads to which the user has access.
   *
   * @param accountId Account Id for the upload to retrieve.
   * @param customDataSourceId Custom data source Id for upload to retrieve.
   * @param uploadId Upload Id to retrieve.
   * @param webPropertyId Web property Id for the upload to retrieve.
   */
  async managementUploadsGet(accountId: string, customDataSourceId: string, uploadId: string, webPropertyId: string): Promise<Upload> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customDataSources/${ customDataSourceId }/uploads/${ uploadId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUpload(data);
  }

  /**
   * List uploads to which the user has access.
   *
   * @param accountId Account Id for the uploads to retrieve.
   * @param customDataSourceId Custom data source Id for uploads to retrieve.
   * @param webPropertyId Web property Id for the uploads to retrieve.
   */
  async managementUploadsList(accountId: string, customDataSourceId: string, webPropertyId: string, opts: ManagementUploadsListOptions = {}): Promise<Uploads> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customDataSources/${ customDataSourceId }/uploads`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeUploads(data);
  }

  /**
   * Upload data for a custom data source.
   *
   * @param accountId Account Id associated with the upload.
   * @param customDataSourceId Custom data source Id to which the data being uploaded belongs.
   * @param webPropertyId Web property UA-string associated with the upload.
   */
  async managementUploadsUploadData(accountId: string, customDataSourceId: string, webPropertyId: string): Promise<Upload> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/customDataSources/${ customDataSourceId }/uploads`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return deserializeUpload(data);
  }

  /**
   * Gets a web property to which the user has access.
   *
   * @param accountId Account ID to retrieve the web property for.
   * @param webPropertyId ID to retrieve the web property for.
   */
  async managementWebpropertiesGet(accountId: string, webPropertyId: string): Promise<Webproperty> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeWebproperty(data);
  }

  /**
   * Create a new property if the account has fewer than 20 properties. Web
   * properties are visible in the Google Analytics interface only if they have
   * at least one profile.
   *
   * @param accountId Account ID to create the web property for.
   */
  async managementWebpropertiesInsert(accountId: string, req: Webproperty): Promise<Webproperty> {
    req = serializeWebproperty(req);
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeWebproperty(data);
  }

  /**
   * Lists web properties to which the user has access.
   *
   * @param accountId Account ID to retrieve web properties for. Can either be a specific account ID or '~all', which refers to all the accounts that user has access to.
   */
  async managementWebpropertiesList(accountId: string, opts: ManagementWebpropertiesListOptions = {}): Promise<Webproperties> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeWebproperties(data);
  }

  /**
   * Updates an existing web property. This method supports patch semantics.
   *
   * @param accountId Account ID to which the web property belongs
   * @param webPropertyId Web property ID
   */
  async managementWebpropertiesPatch(accountId: string, webPropertyId: string, req: Webproperty): Promise<Webproperty> {
    req = serializeWebproperty(req);
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeWebproperty(data);
  }

  /**
   * Updates an existing web property.
   *
   * @param accountId Account ID to which the web property belongs
   * @param webPropertyId Web property ID
   */
  async managementWebpropertiesUpdate(accountId: string, webPropertyId: string, req: Webproperty): Promise<Webproperty> {
    req = serializeWebproperty(req);
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializeWebproperty(data);
  }

  /**
   * Deletes a web property-Google Ads link.
   *
   * @param accountId ID of the account which the given web property belongs to.
   * @param webPropertyAdWordsLinkId Web property Google Ads link ID.
   * @param webPropertyId Web property ID to delete the Google Ads link for.
   */
  async managementWebPropertyAdWordsLinksDelete(accountId: string, webPropertyAdWordsLinkId: string, webPropertyId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/entityAdWordsLinks/${ webPropertyAdWordsLinkId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Returns a web property-Google Ads link to which the user has access.
   *
   * @param accountId ID of the account which the given web property belongs to.
   * @param webPropertyAdWordsLinkId Web property-Google Ads link ID.
   * @param webPropertyId Web property ID to retrieve the Google Ads link for.
   */
  async managementWebPropertyAdWordsLinksGet(accountId: string, webPropertyAdWordsLinkId: string, webPropertyId: string): Promise<EntityAdWordsLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/entityAdWordsLinks/${ webPropertyAdWordsLinkId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as EntityAdWordsLink;
  }

  /**
   * Creates a webProperty-Google Ads link.
   *
   * @param accountId ID of the Google Analytics account to create the link for.
   * @param webPropertyId Web property ID to create the link for.
   */
  async managementWebPropertyAdWordsLinksInsert(accountId: string, webPropertyId: string, req: EntityAdWordsLink): Promise<EntityAdWordsLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/entityAdWordsLinks`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as EntityAdWordsLink;
  }

  /**
   * Lists webProperty-Google Ads links for a given web property.
   *
   * @param accountId ID of the account which the given web property belongs to.
   * @param webPropertyId Web property ID to retrieve the Google Ads links for.
   */
  async managementWebPropertyAdWordsLinksList(accountId: string, webPropertyId: string, opts: ManagementWebPropertyAdWordsLinksListOptions = {}): Promise<EntityAdWordsLinks> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/entityAdWordsLinks`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as EntityAdWordsLinks;
  }

  /**
   * Updates an existing webProperty-Google Ads link. This method supports
   * patch semantics.
   *
   * @param accountId ID of the account which the given web property belongs to.
   * @param webPropertyAdWordsLinkId Web property-Google Ads link ID.
   * @param webPropertyId Web property ID to retrieve the Google Ads link for.
   */
  async managementWebPropertyAdWordsLinksPatch(accountId: string, webPropertyAdWordsLinkId: string, webPropertyId: string, req: EntityAdWordsLink): Promise<EntityAdWordsLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/entityAdWordsLinks/${ webPropertyAdWordsLinkId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as EntityAdWordsLink;
  }

  /**
   * Updates an existing webProperty-Google Ads link.
   *
   * @param accountId ID of the account which the given web property belongs to.
   * @param webPropertyAdWordsLinkId Web property-Google Ads link ID.
   * @param webPropertyId Web property ID to retrieve the Google Ads link for.
   */
  async managementWebPropertyAdWordsLinksUpdate(accountId: string, webPropertyAdWordsLinkId: string, webPropertyId: string, req: EntityAdWordsLink): Promise<EntityAdWordsLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/entityAdWordsLinks/${ webPropertyAdWordsLinkId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as EntityAdWordsLink;
  }

  /**
   * Removes a user from the given web property.
   *
   * @param accountId Account ID to delete the user link for.
   * @param linkId Link ID to delete the user link for.
   * @param webPropertyId Web Property ID to delete the user link for.
   */
  async managementWebpropertyUserLinksDelete(accountId: string, linkId: string, webPropertyId: string): Promise<void> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/entityUserLinks/${ linkId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
  }

  /**
   * Adds a new user to the given web property.
   *
   * @param accountId Account ID to create the user link for.
   * @param webPropertyId Web Property ID to create the user link for.
   */
  async managementWebpropertyUserLinksInsert(accountId: string, webPropertyId: string, req: EntityUserLink): Promise<EntityUserLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/entityUserLinks`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as EntityUserLink;
  }

  /**
   * Lists webProperty-user links for a given web property.
   *
   * @param accountId Account ID which the given web property belongs to.
   * @param webPropertyId Web Property ID for the webProperty-user links to retrieve. Can either be a specific web property ID or '~all', which refers to all the web properties that user has access to.
   */
  async managementWebpropertyUserLinksList(accountId: string, webPropertyId: string, opts: ManagementWebpropertyUserLinksListOptions = {}): Promise<EntityUserLinks> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/entityUserLinks`);
    if (opts.max-results !== undefined) {
      url.searchParams.append("max-results", String(opts.max-results));
    }
    if (opts.start-index !== undefined) {
      url.searchParams.append("start-index", String(opts.start-index));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as EntityUserLinks;
  }

  /**
   * Updates permissions for an existing user on the given web property.
   *
   * @param accountId Account ID to update the account-user link for.
   * @param linkId Link ID to update the account-user link for.
   * @param webPropertyId Web property ID to update the account-user link for.
   */
  async managementWebpropertyUserLinksUpdate(accountId: string, linkId: string, webPropertyId: string, req: EntityUserLink): Promise<EntityUserLink> {
    const url = new URL(`${this.#baseUrl}management/accounts/${ accountId }/webproperties/${ webPropertyId }/entityUserLinks/${ linkId }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return data as EntityUserLink;
  }

  /**
   * Lists all columns for a report type
   *
   * @param reportType Report type. Allowed Values: 'ga'. Where 'ga' corresponds to the Core Reporting API
   */
  async metadataColumnsList(reportType: string): Promise<Columns> {
    const url = new URL(`${this.#baseUrl}metadata/${ reportType }/columns`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Columns;
  }

  /**
   * Creates an account ticket.
   *
   */
  async provisioningCreateAccountTicket(req: AccountTicket): Promise<AccountTicket> {
    req = serializeAccountTicket(req);
    const url = new URL(`${this.#baseUrl}provisioning/createAccountTicket`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAccountTicket(data);
  }

  /**
   * Provision account.
   *
   */
  async provisioningCreateAccountTree(req: AccountTreeRequest): Promise<AccountTreeResponse> {
    const url = new URL(`${this.#baseUrl}provisioning/createAccountTree`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeAccountTreeResponse(data);
  }

  /**
   * Insert or update a user deletion requests.
   *
   */
  async userDeletionUserDeletionRequestUpsert(req: UserDeletionRequest): Promise<UserDeletionRequest> {
    const url = new URL(`${this.#baseUrl}userDeletion/userDeletionRequests:upsert`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UserDeletionRequest;
  }
}

/**
 * JSON template for Analytics account entry.
 */
export interface Account {
  /**
   * Child link for an account entry. Points to the list of web properties for
   * this account.
   */
  childLink?: {
    href?: string;
    type?: string;
  };
  /**
   * Time the account was created.
   */
  created?: Date;
  /**
   * Account ID.
   */
  id?: string;
  /**
   * Resource type for Analytics account.
   */
  kind?: string;
  /**
   * Account name.
   */
  name?: string;
  /**
   * Permissions the user has for this account.
   */
  permissions?: {
    effective?: string[];
  };
  /**
   * Link for this account.
   */
  selfLink?: string;
  /**
   * Indicates whether this account is starred or not.
   */
  starred?: boolean;
  /**
   * Time the account was last modified.
   */
  updated?: Date;
}

function serializeAccount(data: any): Account {
  return {
    ...data,
    created: data["created"] !== undefined ? data["created"].toISOString() : undefined,
    updated: data["updated"] !== undefined ? data["updated"].toISOString() : undefined,
  };
}

function deserializeAccount(data: any): Account {
  return {
    ...data,
    created: data["created"] !== undefined ? new Date(data["created"]) : undefined,
    updated: data["updated"] !== undefined ? new Date(data["updated"]) : undefined,
  };
}

/**
 * JSON template for a linked account.
 */
export interface AccountRef {
  /**
   * Link for this account.
   */
  href?: string;
  /**
   * Account ID.
   */
  id?: string;
  /**
   * Analytics account reference.
   */
  kind?: string;
  /**
   * Account name.
   */
  name?: string;
}

/**
 * An account collection provides a list of Analytics accounts to which a user
 * has access. The account collection is the entry point to all management
 * information. Each resource in the collection corresponds to a single
 * Analytics account.
 */
export interface Accounts {
  /**
   * A list of accounts.
   */
  items?: Account[];
  /**
   * The maximum number of entries the response can contain, regardless of the
   * actual number of entries returned. Its value ranges from 1 to 1000 with a
   * value of 1000 by default, or otherwise specified by the max-results query
   * parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Next link for this account collection.
   */
  nextLink?: string;
  /**
   * Previous link for this account collection.
   */
  previousLink?: string;
  /**
   * The starting index of the entries, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * results in the response.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

function serializeAccounts(data: any): Accounts {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeAccount(item))) : undefined,
  };
}

function deserializeAccounts(data: any): Accounts {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeAccount(item))) : undefined,
  };
}

/**
 * An AccountSummary collection lists a summary of accounts, properties and
 * views (profiles) to which the user has access. Each resource in the
 * collection corresponds to a single AccountSummary.
 */
export interface AccountSummaries {
  /**
   * A list of AccountSummaries.
   */
  items?: AccountSummary[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Link to next page for this AccountSummary collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this AccountSummary collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * results in the response.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

/**
 * JSON template for an Analytics AccountSummary. An AccountSummary is a
 * lightweight tree comprised of properties/profiles.
 */
export interface AccountSummary {
  /**
   * Account ID.
   */
  id?: string;
  /**
   * Resource type for Analytics AccountSummary.
   */
  kind?: string;
  /**
   * Account name.
   */
  name?: string;
  /**
   * Indicates whether this account is starred or not.
   */
  starred?: boolean;
  /**
   * List of web properties under this account.
   */
  webProperties?: WebPropertySummary[];
}

/**
 * JSON template for an Analytics account ticket. The account ticket consists
 * of the ticket ID and the basic information for the account, property and
 * profile.
 */
export interface AccountTicket {
  /**
   * Account for this ticket.
   */
  account?: Account;
  /**
   * Account ticket ID used to access the account ticket.
   */
  id?: string;
  /**
   * Resource type for account ticket.
   */
  kind?: string;
  /**
   * View (Profile) for the account.
   */
  profile?: Profile;
  /**
   * Redirect URI where the user will be sent after accepting Terms of Service.
   * Must be configured in APIs console as a callback URL.
   */
  redirectUri?: string;
  /**
   * Web property for the account.
   */
  webproperty?: Webproperty;
}

function serializeAccountTicket(data: any): AccountTicket {
  return {
    ...data,
    account: data["account"] !== undefined ? serializeAccount(data["account"]) : undefined,
    webproperty: data["webproperty"] !== undefined ? serializeWebproperty(data["webproperty"]) : undefined,
  };
}

function deserializeAccountTicket(data: any): AccountTicket {
  return {
    ...data,
    account: data["account"] !== undefined ? deserializeAccount(data["account"]) : undefined,
    webproperty: data["webproperty"] !== undefined ? deserializeWebproperty(data["webproperty"]) : undefined,
  };
}

/**
 * JSON template for an Analytics account tree requests. The account tree
 * request is used in the provisioning api to create an account, property, and
 * view (profile). It contains the basic information required to make these
 * fields.
 */
export interface AccountTreeRequest {
  accountName?: string;
  /**
   * Resource type for account ticket.
   */
  kind?: string;
  profileName?: string;
  timezone?: string;
  webpropertyName?: string;
  websiteUrl?: string;
}

/**
 * JSON template for an Analytics account tree response. The account tree
 * response is used in the provisioning api to return the result of creating an
 * account, property, and view (profile).
 */
export interface AccountTreeResponse {
  /**
   * The account created.
   */
  account?: Account;
  /**
   * Resource type for account ticket.
   */
  kind?: string;
  /**
   * View (Profile) for the account.
   */
  profile?: Profile;
  /**
   * Web property for the account.
   */
  webproperty?: Webproperty;
}

function serializeAccountTreeResponse(data: any): AccountTreeResponse {
  return {
    ...data,
    account: data["account"] !== undefined ? serializeAccount(data["account"]) : undefined,
    webproperty: data["webproperty"] !== undefined ? serializeWebproperty(data["webproperty"]) : undefined,
  };
}

function deserializeAccountTreeResponse(data: any): AccountTreeResponse {
  return {
    ...data,
    account: data["account"] !== undefined ? deserializeAccount(data["account"]) : undefined,
    webproperty: data["webproperty"] !== undefined ? deserializeWebproperty(data["webproperty"]) : undefined,
  };
}

/**
 * JSON template for an Google Ads account.
 */
export interface AdWordsAccount {
  /**
   * True if auto-tagging is enabled on the Google Ads account. Read-only after
   * the insert operation.
   */
  autoTaggingEnabled?: boolean;
  /**
   * Customer ID. This field is required when creating a Google Ads link.
   */
  customerId?: string;
  /**
   * Resource type for Google Ads account.
   */
  kind?: string;
}

/**
 * Request template for the delete upload data request.
 */
export interface AnalyticsDataimportDeleteUploadDataRequest {
  /**
   * A list of upload UIDs.
   */
  customDataImportUids?: string[];
}

/**
 * JSON template for a metadata column.
 */
export interface Column {
  /**
   * Map of attribute name and value for this column.
   */
  attributes?: {
    [key: string]: string
  };
  /**
   * Column id.
   */
  id?: string;
  /**
   * Resource type for Analytics column.
   */
  kind?: string;
}

/**
 * Lists columns (dimensions and metrics) for a particular report type.
 */
export interface Columns {
  /**
   * List of attributes names returned by columns.
   */
  attributeNames?: string[];
  /**
   * Etag of collection. This etag can be compared with the last response etag
   * to check if response has changed.
   */
  etag?: string;
  /**
   * List of columns for a report type.
   */
  items?: Column[];
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Total number of columns returned in the response.
   */
  totalResults?: number;
}

/**
 * JSON template for an Analytics custom data source.
 */
export interface CustomDataSource {
  /**
   * Account ID to which this custom data source belongs.
   */
  accountId?: string;
  childLink?: {
    href?: string;
    type?: string;
  };
  /**
   * Time this custom data source was created.
   */
  created?: Date;
  /**
   * Description of custom data source.
   */
  description?: string;
  /**
   * Custom data source ID.
   */
  id?: string;
  importBehavior?: string;
  /**
   * Resource type for Analytics custom data source.
   */
  kind?: string;
  /**
   * Name of this custom data source.
   */
  name?: string;
  /**
   * Parent link for this custom data source. Points to the web property to
   * which this custom data source belongs.
   */
  parentLink?: {
    href?: string;
    type?: string;
  };
  /**
   * IDs of views (profiles) linked to the custom data source.
   */
  profilesLinked?: string[];
  /**
   * Collection of schema headers of the custom data source.
   */
  schema?: string[];
  /**
   * Link for this Analytics custom data source.
   */
  selfLink?: string;
  /**
   * Type of the custom data source.
   */
  type?: string;
  /**
   * Time this custom data source was last modified.
   */
  updated?: Date;
  /**
   * Upload type of the custom data source.
   */
  uploadType?: string;
  /**
   * Web property ID of the form UA-XXXXX-YY to which this custom data source
   * belongs.
   */
  webPropertyId?: string;
}

function serializeCustomDataSource(data: any): CustomDataSource {
  return {
    ...data,
    created: data["created"] !== undefined ? data["created"].toISOString() : undefined,
    updated: data["updated"] !== undefined ? data["updated"].toISOString() : undefined,
  };
}

function deserializeCustomDataSource(data: any): CustomDataSource {
  return {
    ...data,
    created: data["created"] !== undefined ? new Date(data["created"]) : undefined,
    updated: data["updated"] !== undefined ? new Date(data["updated"]) : undefined,
  };
}

/**
 * Lists Analytics custom data sources to which the user has access. Each
 * resource in the collection corresponds to a single Analytics custom data
 * source.
 */
export interface CustomDataSources {
  /**
   * Collection of custom data sources.
   */
  items?: CustomDataSource[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Link to next page for this custom data source collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this custom data source collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * results in the response.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

function serializeCustomDataSources(data: any): CustomDataSources {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeCustomDataSource(item))) : undefined,
  };
}

function deserializeCustomDataSources(data: any): CustomDataSources {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeCustomDataSource(item))) : undefined,
  };
}

/**
 * JSON template for Analytics Custom Dimension.
 */
export interface CustomDimension {
  /**
   * Account ID.
   */
  accountId?: string;
  /**
   * Boolean indicating whether the custom dimension is active.
   */
  active?: boolean;
  /**
   * Time the custom dimension was created.
   */
  readonly created?: Date;
  /**
   * Custom dimension ID.
   */
  id?: string;
  /**
   * Index of the custom dimension.
   */
  readonly index?: number;
  /**
   * Kind value for a custom dimension. Set to "analytics#customDimension". It
   * is a read-only field.
   */
  readonly kind?: string;
  /**
   * Name of the custom dimension.
   */
  name?: string;
  /**
   * Parent link for the custom dimension. Points to the property to which the
   * custom dimension belongs.
   */
  parentLink?: {
    href?: string;
    type?: string;
  };
  /**
   * Scope of the custom dimension: HIT, SESSION, USER or PRODUCT.
   */
  scope?: string;
  /**
   * Link for the custom dimension
   */
  readonly selfLink?: string;
  /**
   * Time the custom dimension was last modified.
   */
  readonly updated?: Date;
  /**
   * Property ID.
   */
  webPropertyId?: string;
}

/**
 * A custom dimension collection lists Analytics custom dimensions to which the
 * user has access. Each resource in the collection corresponds to a single
 * Analytics custom dimension.
 */
export interface CustomDimensions {
  /**
   * Collection of custom dimensions.
   */
  items?: CustomDimension[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Link to next page for this custom dimension collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this custom dimension collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * results in the response.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

/**
 * JSON template for Analytics Custom Metric.
 */
export interface CustomMetric {
  /**
   * Account ID.
   */
  accountId?: string;
  /**
   * Boolean indicating whether the custom metric is active.
   */
  active?: boolean;
  /**
   * Time the custom metric was created.
   */
  readonly created?: Date;
  /**
   * Custom metric ID.
   */
  id?: string;
  /**
   * Index of the custom metric.
   */
  readonly index?: number;
  /**
   * Kind value for a custom metric. Set to "analytics#customMetric". It is a
   * read-only field.
   */
  readonly kind?: string;
  /**
   * Max value of custom metric.
   */
  max_value?: string;
  /**
   * Min value of custom metric.
   */
  min_value?: string;
  /**
   * Name of the custom metric.
   */
  name?: string;
  /**
   * Parent link for the custom metric. Points to the property to which the
   * custom metric belongs.
   */
  parentLink?: {
    href?: string;
    type?: string;
  };
  /**
   * Scope of the custom metric: HIT or PRODUCT.
   */
  scope?: string;
  /**
   * Link for the custom metric
   */
  readonly selfLink?: string;
  /**
   * Data type of custom metric.
   */
  type?: string;
  /**
   * Time the custom metric was last modified.
   */
  readonly updated?: Date;
  /**
   * Property ID.
   */
  webPropertyId?: string;
}

/**
 * A custom metric collection lists Analytics custom metrics to which the user
 * has access. Each resource in the collection corresponds to a single Analytics
 * custom metric.
 */
export interface CustomMetrics {
  /**
   * Collection of custom metrics.
   */
  items?: CustomMetric[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Link to next page for this custom metric collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this custom metric collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * results in the response.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

/**
 * Additional options for Analytics#dataGaGet.
 */
export interface DataGaGetOptions {
  /**
   * A comma-separated list of Analytics dimensions. E.g.,
   * 'ga:browser,ga:city'.
   */
  dimensions?: string;
  /**
   * End date for fetching Analytics data. Request can should specify an end
   * date formatted as YYYY-MM-DD, or as a relative date (e.g., today,
   * yesterday, or 7daysAgo). The default value is yesterday.
   */
  end-date: string;
  /**
   * A comma-separated list of dimension or metric filters to be applied to
   * Analytics data.
   */
  filters?: string;
  /**
   * Unique table ID for retrieving Analytics data. Table ID is of the form
   * ga:XXXX, where XXXX is the Analytics view (profile) ID.
   */
  ids: string;
  /**
   * The response will include empty rows if this parameter is set to true, the
   * default is true
   */
  include-empty-rows?: boolean;
  /**
   * The maximum number of entries to include in this feed.
   */
  max-results?: number;
  /**
   * A comma-separated list of Analytics metrics. E.g.,
   * 'ga:sessions,ga:pageviews'. At least one metric must be specified.
   */
  metrics: string;
  /**
   * The selected format for the response. Default format is JSON.
   */
  output?:  | "dataTable" | "json";
  /**
   * The desired sampling level.
   */
  samplingLevel?:  | "DEFAULT" | "FASTER" | "HIGHER_PRECISION";
  /**
   * An Analytics segment to be applied to data.
   */
  segment?: string;
  /**
   * A comma-separated list of dimensions or metrics that determine the sort
   * order for Analytics data.
   */
  sort?: string;
  /**
   * Start date for fetching Analytics data. Requests can specify a start date
   * formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or
   * 7daysAgo). The default value is 7daysAgo.
   */
  start-date: string;
  /**
   * An index of the first entity to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#dataMcfGet.
 */
export interface DataMcfGetOptions {
  /**
   * A comma-separated list of Multi-Channel Funnels dimensions. E.g.,
   * 'mcf:source,mcf:medium'.
   */
  dimensions?: string;
  /**
   * End date for fetching Analytics data. Requests can specify a start date
   * formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or
   * 7daysAgo). The default value is 7daysAgo.
   */
  end-date: string;
  /**
   * A comma-separated list of dimension or metric filters to be applied to the
   * Analytics data.
   */
  filters?: string;
  /**
   * Unique table ID for retrieving Analytics data. Table ID is of the form
   * ga:XXXX, where XXXX is the Analytics view (profile) ID.
   */
  ids: string;
  /**
   * The maximum number of entries to include in this feed.
   */
  max-results?: number;
  /**
   * A comma-separated list of Multi-Channel Funnels metrics. E.g.,
   * 'mcf:totalConversions,mcf:totalConversionValue'. At least one metric must
   * be specified.
   */
  metrics: string;
  /**
   * The desired sampling level.
   */
  samplingLevel?:  | "DEFAULT" | "FASTER" | "HIGHER_PRECISION";
  /**
   * A comma-separated list of dimensions or metrics that determine the sort
   * order for the Analytics data.
   */
  sort?: string;
  /**
   * Start date for fetching Analytics data. Requests can specify a start date
   * formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or
   * 7daysAgo). The default value is 7daysAgo.
   */
  start-date: string;
  /**
   * An index of the first entity to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#dataRealtimeGet.
 */
export interface DataRealtimeGetOptions {
  /**
   * A comma-separated list of real time dimensions. E.g., 'rt:medium,rt:city'.
   */
  dimensions?: string;
  /**
   * A comma-separated list of dimension or metric filters to be applied to
   * real time data.
   */
  filters?: string;
  /**
   * Unique table ID for retrieving real time data. Table ID is of the form
   * ga:XXXX, where XXXX is the Analytics view (profile) ID.
   */
  ids: string;
  /**
   * The maximum number of entries to include in this feed.
   */
  max-results?: number;
  /**
   * A comma-separated list of real time metrics. E.g., 'rt:activeUsers'. At
   * least one metric must be specified.
   */
  metrics: string;
  /**
   * A comma-separated list of dimensions or metrics that determine the sort
   * order for real time data.
   */
  sort?: string;
}

/**
 * JSON template for Analytics Entity Google Ads Link.
 */
export interface EntityAdWordsLink {
  /**
   * A list of Google Ads client accounts. These cannot be MCC accounts. This
   * field is required when creating a Google Ads link. It cannot be empty.
   */
  adWordsAccounts?: AdWordsAccount[];
  /**
   * Web property being linked.
   */
  entity?: {
    webPropertyRef?: WebPropertyRef;
  };
  /**
   * Entity Google Ads link ID
   */
  id?: string;
  /**
   * Resource type for entity Google Ads link.
   */
  kind?: string;
  /**
   * Name of the link. This field is required when creating a Google Ads link.
   */
  name?: string;
  /**
   * IDs of linked Views (Profiles) represented as strings.
   */
  profileIds?: string[];
  /**
   * URL link for this Google Analytics - Google Ads link.
   */
  selfLink?: string;
}

/**
 * An entity Google Ads link collection provides a list of GA-Google Ads links
 * Each resource in this collection corresponds to a single link.
 */
export interface EntityAdWordsLinks {
  /**
   * A list of entity Google Ads links.
   */
  items?: EntityAdWordsLink[];
  /**
   * The maximum number of entries the response can contain, regardless of the
   * actual number of entries returned. Its value ranges from 1 to 1000 with a
   * value of 1000 by default, or otherwise specified by the max-results query
   * parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Next link for this Google Ads link collection.
   */
  nextLink?: string;
  /**
   * Previous link for this Google Ads link collection.
   */
  previousLink?: string;
  /**
   * The starting index of the entries, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * results in the response.
   */
  totalResults?: number;
}

/**
 * JSON template for an Analytics Entity-User Link. Returns permissions that a
 * user has for an entity.
 */
export interface EntityUserLink {
  /**
   * Entity for this link. It can be an account, a web property, or a view
   * (profile).
   */
  entity?: {
    accountRef?: AccountRef;
    profileRef?: ProfileRef;
    webPropertyRef?: WebPropertyRef;
  };
  /**
   * Entity user link ID
   */
  id?: string;
  /**
   * Resource type for entity user link.
   */
  kind?: string;
  /**
   * Permissions the user has for this entity.
   */
  permissions?: {
    effective?: string[];
    local?: string[];
  };
  /**
   * Self link for this resource.
   */
  selfLink?: string;
  /**
   * User reference.
   */
  userRef?: UserRef;
}

/**
 * An entity user link collection provides a list of Analytics ACL links Each
 * resource in this collection corresponds to a single link.
 */
export interface EntityUserLinks {
  /**
   * A list of entity user links.
   */
  items?: EntityUserLink[];
  /**
   * The maximum number of entries the response can contain, regardless of the
   * actual number of entries returned. Its value ranges from 1 to 1000 with a
   * value of 1000 by default, or otherwise specified by the max-results query
   * parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Next link for this account collection.
   */
  nextLink?: string;
  /**
   * Previous link for this account collection.
   */
  previousLink?: string;
  /**
   * The starting index of the entries, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * results in the response.
   */
  totalResults?: number;
}

/**
 * JSON template for Analytics experiment resource.
 */
export interface Experiment {
  /**
   * Account ID to which this experiment belongs. This field is read-only.
   */
  accountId?: string;
  /**
   * Time the experiment was created. This field is read-only.
   */
  created?: Date;
  /**
   * Notes about this experiment.
   */
  description?: string;
  /**
   * If true, the end user will be able to edit the experiment via the Google
   * Analytics user interface.
   */
  editableInGaUi?: boolean;
  /**
   * The ending time of the experiment (the time the status changed from
   * RUNNING to ENDED). This field is present only if the experiment has ended.
   * This field is read-only.
   */
  endTime?: Date;
  /**
   * Boolean specifying whether to distribute traffic evenly across all
   * variations. If the value is False, content experiments follows the default
   * behavior of adjusting traffic dynamically based on variation performance.
   * Optional -- defaults to False. This field may not be changed for an
   * experiment whose status is ENDED.
   */
  equalWeighting?: boolean;
  /**
   * Experiment ID. Required for patch and update. Disallowed for create.
   */
  id?: string;
  /**
   * Internal ID for the web property to which this experiment belongs. This
   * field is read-only.
   */
  internalWebPropertyId?: string;
  /**
   * Resource type for an Analytics experiment. This field is read-only.
   */
  kind?: string;
  /**
   * An integer number in [3, 90]. Specifies the minimum length of the
   * experiment. Can be changed for a running experiment. This field may not be
   * changed for an experiments whose status is ENDED.
   */
  minimumExperimentLengthInDays?: number;
  /**
   * Experiment name. This field may not be changed for an experiment whose
   * status is ENDED. This field is required when creating an experiment.
   */
  name?: string;
  /**
   * The metric that the experiment is optimizing. Valid values:
   * "ga:goal(n)Completions", "ga:adsenseAdsClicks", "ga:adsenseAdsViewed",
   * "ga:adsenseRevenue", "ga:bounces", "ga:pageviews", "ga:sessionDuration",
   * "ga:transactions", "ga:transactionRevenue". This field is required if
   * status is "RUNNING" and servingFramework is one of "REDIRECT" or "API".
   */
  objectiveMetric?: string;
  /**
   * Whether the objectiveMetric should be minimized or maximized. Possible
   * values: "MAXIMUM", "MINIMUM". Optional--defaults to "MAXIMUM". Cannot be
   * specified without objectiveMetric. Cannot be modified when status is
   * "RUNNING" or "ENDED".
   */
  optimizationType?: string;
  /**
   * Parent link for an experiment. Points to the view (profile) to which this
   * experiment belongs.
   */
  parentLink?: {
    href?: string;
    type?: string;
  };
  /**
   * View (Profile) ID to which this experiment belongs. This field is
   * read-only.
   */
  profileId?: string;
  /**
   * Why the experiment ended. Possible values: "STOPPED_BY_USER",
   * "WINNER_FOUND", "EXPERIMENT_EXPIRED", "ENDED_WITH_NO_WINNER",
   * "GOAL_OBJECTIVE_CHANGED". "ENDED_WITH_NO_WINNER" means that the experiment
   * didn't expire but no winner was projected to be found. If the experiment
   * status is changed via the API to ENDED this field is set to
   * STOPPED_BY_USER. This field is read-only.
   */
  reasonExperimentEnded?: string;
  /**
   * Boolean specifying whether variations URLS are rewritten to match those of
   * the original. This field may not be changed for an experiments whose status
   * is ENDED.
   */
  rewriteVariationUrlsAsOriginal?: boolean;
  /**
   * Link for this experiment. This field is read-only.
   */
  selfLink?: string;
  /**
   * The framework used to serve the experiment variations and evaluate the
   * results. One of: - REDIRECT: Google Analytics redirects traffic to
   * different variation pages, reports the chosen variation and evaluates the
   * results. - API: Google Analytics chooses and reports the variation to serve
   * and evaluates the results; the caller is responsible for serving the
   * selected variation. - EXTERNAL: The variations will be served externally
   * and the chosen variation reported to Google Analytics. The caller is
   * responsible for serving the selected variation and evaluating the results.
   */
  servingFramework?: string;
  /**
   * The snippet of code to include on the control page(s). This field is
   * read-only.
   */
  snippet?: string;
  /**
   * The starting time of the experiment (the time the status changed from
   * READY_TO_RUN to RUNNING). This field is present only if the experiment has
   * started. This field is read-only.
   */
  startTime?: Date;
  /**
   * Experiment status. Possible values: "DRAFT", "READY_TO_RUN", "RUNNING",
   * "ENDED". Experiments can be created in the "DRAFT", "READY_TO_RUN" or
   * "RUNNING" state. This field is required when creating an experiment.
   */
  status?: string;
  /**
   * A floating-point number in (0, 1]. Specifies the fraction of the traffic
   * that participates in the experiment. Can be changed for a running
   * experiment. This field may not be changed for an experiments whose status
   * is ENDED.
   */
  trafficCoverage?: number;
  /**
   * Time the experiment was last modified. This field is read-only.
   */
  updated?: Date;
  /**
   * Array of variations. The first variation in the array is the original. The
   * number of variations may not change once an experiment is in the RUNNING
   * state. At least two variations are required before status can be set to
   * RUNNING.
   */
  variations?: {
    name?: string;
    status?: string;
    url?: string;
    weight?: number;
    won?: boolean;
  }[];
  /**
   * Web property ID to which this experiment belongs. The web property ID is
   * of the form UA-XXXXX-YY. This field is read-only.
   */
  webPropertyId?: string;
  /**
   * A floating-point number in (0, 1). Specifies the necessary confidence
   * level to choose a winner. This field may not be changed for an experiments
   * whose status is ENDED.
   */
  winnerConfidenceLevel?: number;
  /**
   * Boolean specifying whether a winner has been found for this experiment.
   * This field is read-only.
   */
  winnerFound?: boolean;
}

function serializeExperiment(data: any): Experiment {
  return {
    ...data,
    created: data["created"] !== undefined ? data["created"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updated: data["updated"] !== undefined ? data["updated"].toISOString() : undefined,
  };
}

function deserializeExperiment(data: any): Experiment {
  return {
    ...data,
    created: data["created"] !== undefined ? new Date(data["created"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updated: data["updated"] !== undefined ? new Date(data["updated"]) : undefined,
  };
}

/**
 * An experiment collection lists Analytics experiments to which the user has
 * access. Each view (profile) can have a set of experiments. Each resource in
 * the Experiment collection corresponds to a single Analytics experiment.
 */
export interface Experiments {
  /**
   * A list of experiments.
   */
  items?: Experiment[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Link to next page for this experiment collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this experiment collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * resources in the result.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

function serializeExperiments(data: any): Experiments {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeExperiment(item))) : undefined,
  };
}

function deserializeExperiments(data: any): Experiments {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeExperiment(item))) : undefined,
  };
}

/**
 * JSON template for an Analytics account filter.
 */
export interface Filter {
  /**
   * Account ID to which this filter belongs.
   */
  accountId?: string;
  /**
   * Details for the filter of the type ADVANCED.
   */
  advancedDetails?: {
    caseSensitive?: boolean;
    extractA?: string;
    extractB?: string;
    fieldA?: string;
    fieldAIndex?: number;
    fieldARequired?: boolean;
    fieldB?: string;
    fieldBIndex?: number;
    fieldBRequired?: boolean;
    outputConstructor?: string;
    outputToField?: string;
    outputToFieldIndex?: number;
    overrideOutputField?: boolean;
  };
  /**
   * Time this filter was created.
   */
  readonly created?: Date;
  /**
   * Details for the filter of the type EXCLUDE.
   */
  excludeDetails?: FilterExpression;
  /**
   * Filter ID.
   */
  id?: string;
  /**
   * Details for the filter of the type INCLUDE.
   */
  includeDetails?: FilterExpression;
  /**
   * Resource type for Analytics filter.
   */
  readonly kind?: string;
  /**
   * Details for the filter of the type LOWER.
   */
  lowercaseDetails?: {
    field?: string;
    fieldIndex?: number;
  };
  /**
   * Name of this filter.
   */
  name?: string;
  /**
   * Parent link for this filter. Points to the account to which this filter
   * belongs.
   */
  parentLink?: {
    href?: string;
    type?: string;
  };
  /**
   * Details for the filter of the type SEARCH_AND_REPLACE.
   */
  searchAndReplaceDetails?: {
    caseSensitive?: boolean;
    field?: string;
    fieldIndex?: number;
    replaceString?: string;
    searchString?: string;
  };
  /**
   * Link for this filter.
   */
  readonly selfLink?: string;
  /**
   * Type of this filter. Possible values are INCLUDE, EXCLUDE, LOWERCASE,
   * UPPERCASE, SEARCH_AND_REPLACE and ADVANCED.
   */
  type?: string;
  /**
   * Time this filter was last modified.
   */
  readonly updated?: Date;
  /**
   * Details for the filter of the type UPPER.
   */
  uppercaseDetails?: {
    field?: string;
    fieldIndex?: number;
  };
}

/**
 * JSON template for an Analytics filter expression.
 */
export interface FilterExpression {
  /**
   * Determines if the filter is case sensitive.
   */
  caseSensitive?: boolean;
  /**
   * Filter expression value
   */
  expressionValue?: string;
  /**
   * Field to filter. Possible values: - Content and Traffic -
   * PAGE_REQUEST_URI, - PAGE_HOSTNAME, - PAGE_TITLE, - REFERRAL, -
   * COST_DATA_URI (Campaign target URL), - HIT_TYPE, - INTERNAL_SEARCH_TERM, -
   * INTERNAL_SEARCH_TYPE, - SOURCE_PROPERTY_TRACKING_ID, - Campaign or AdGroup
   * - CAMPAIGN_SOURCE, - CAMPAIGN_MEDIUM, - CAMPAIGN_NAME, - CAMPAIGN_AD_GROUP,
   * - CAMPAIGN_TERM, - CAMPAIGN_CONTENT, - CAMPAIGN_CODE, -
   * CAMPAIGN_REFERRAL_PATH, - E-Commerce - TRANSACTION_COUNTRY, -
   * TRANSACTION_REGION, - TRANSACTION_CITY, - TRANSACTION_AFFILIATION (Store or
   * order location), - ITEM_NAME, - ITEM_CODE, - ITEM_VARIATION, -
   * TRANSACTION_ID, - TRANSACTION_CURRENCY_CODE, - PRODUCT_ACTION_TYPE, -
   * Audience/Users - BROWSER, - BROWSER_VERSION, - BROWSER_SIZE, - PLATFORM, -
   * PLATFORM_VERSION, - LANGUAGE, - SCREEN_RESOLUTION, - SCREEN_COLORS, -
   * JAVA_ENABLED (Boolean Field), - FLASH_VERSION, - GEO_SPEED (Connection
   * speed), - VISITOR_TYPE, - GEO_ORGANIZATION (ISP organization), -
   * GEO_DOMAIN, - GEO_IP_ADDRESS, - GEO_IP_VERSION, - Location - GEO_COUNTRY, -
   * GEO_REGION, - GEO_CITY, - Event - EVENT_CATEGORY, - EVENT_ACTION, -
   * EVENT_LABEL, - Other - CUSTOM_FIELD_1, - CUSTOM_FIELD_2, -
   * USER_DEFINED_VALUE, - Application - APP_ID, - APP_INSTALLER_ID, - APP_NAME,
   * - APP_VERSION, - SCREEN, - IS_APP (Boolean Field), - IS_FATAL_EXCEPTION
   * (Boolean Field), - EXCEPTION_DESCRIPTION, - Mobile device - IS_MOBILE
   * (Boolean Field, Deprecated. Use DEVICE_CATEGORY=mobile), - IS_TABLET
   * (Boolean Field, Deprecated. Use DEVICE_CATEGORY=tablet), - DEVICE_CATEGORY,
   * - MOBILE_HAS_QWERTY_KEYBOARD (Boolean Field), - MOBILE_HAS_NFC_SUPPORT
   * (Boolean Field), - MOBILE_HAS_CELLULAR_RADIO (Boolean Field), -
   * MOBILE_HAS_WIFI_SUPPORT (Boolean Field), - MOBILE_BRAND_NAME, -
   * MOBILE_MODEL_NAME, - MOBILE_MARKETING_NAME, - MOBILE_POINTING_METHOD, -
   * Social - SOCIAL_NETWORK, - SOCIAL_ACTION, - SOCIAL_ACTION_TARGET, - Custom
   * dimension - CUSTOM_DIMENSION (See accompanying field index),
   */
  field?: string;
  /**
   * The Index of the custom dimension. Set only if the field is a is
   * CUSTOM_DIMENSION.
   */
  fieldIndex?: number;
  /**
   * Kind value for filter expression
   */
  kind?: string;
  /**
   * Match type for this filter. Possible values are BEGINS_WITH, EQUAL,
   * ENDS_WITH, CONTAINS, or MATCHES. GEO_DOMAIN, GEO_IP_ADDRESS,
   * PAGE_REQUEST_URI, or PAGE_HOSTNAME filters can use any match type; all
   * other filters must use MATCHES.
   */
  matchType?: string;
}

/**
 * JSON template for a profile filter link.
 */
export interface FilterRef {
  /**
   * Account ID to which this filter belongs.
   */
  readonly accountId?: string;
  /**
   * Link for this filter.
   */
  href?: string;
  /**
   * Filter ID.
   */
  id?: string;
  /**
   * Kind value for filter reference.
   */
  kind?: string;
  /**
   * Name of this filter.
   */
  readonly name?: string;
}

/**
 * A filter collection lists filters created by users in an Analytics account.
 * Each resource in the collection corresponds to a filter.
 */
export interface Filters {
  /**
   * A list of filters.
   */
  items?: Filter[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1,000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Link to next page for this filter collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this filter collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * results in the response.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

/**
 * Analytics data for a given view (profile).
 */
export interface GaData {
  /**
   * Column headers that list dimension names followed by the metric names. The
   * order of dimensions and metrics is same as specified in the request.
   */
  columnHeaders?: {
    columnType?: string;
    dataType?: string;
    name?: string;
  }[];
  /**
   * Determines if Analytics data contains samples.
   */
  containsSampledData?: boolean;
  /**
   * The last refreshed time in seconds for Analytics data.
   */
  dataLastRefreshed?: bigint;
  dataTable?: {
    cols?: {
      id?: string;
      label?: string;
      type?: string;
    }[];
    rows?: {
      c?: {
        v?: string;
      }[];
    }[];
  };
  /**
   * Unique ID for this data response.
   */
  id?: string;
  /**
   * The maximum number of rows the response can contain, regardless of the
   * actual number of rows returned. Its value ranges from 1 to 10,000 with a
   * value of 1000 by default, or otherwise specified by the max-results query
   * parameter.
   */
  itemsPerPage?: number;
  /**
   * Resource type.
   */
  kind?: string;
  /**
   * Link to next page for this Analytics data query.
   */
  nextLink?: string;
  /**
   * Link to previous page for this Analytics data query.
   */
  previousLink?: string;
  /**
   * Information for the view (profile), for which the Analytics data was
   * requested.
   */
  profileInfo?: {
    accountId?: string;
    internalWebPropertyId?: string;
    profileId?: string;
    profileName?: string;
    tableId?: string;
    webPropertyId?: string;
  };
  /**
   * Analytics data request query parameters.
   */
  query?: {
    dimensions?: string;
    end-date?: string;
    filters?: string;
    ids?: string;
    max-results?: number;
    metrics?: string[];
    samplingLevel?: string;
    segment?: string;
    sort?: string[];
    start-date?: string;
    start-index?: number;
  };
  /**
   * Analytics data rows, where each row contains a list of dimension values
   * followed by the metric values. The order of dimensions and metrics is same
   * as specified in the request.
   */
  rows?: string[][];
  /**
   * The number of samples used to calculate the result.
   */
  sampleSize?: bigint;
  /**
   * Total size of the sample space from which the samples were selected.
   */
  sampleSpace?: bigint;
  /**
   * Link to this page.
   */
  selfLink?: string;
  /**
   * The total number of rows for the query, regardless of the number of rows
   * in the response.
   */
  totalResults?: number;
  /**
   * Total values for the requested metrics over all the results, not just the
   * results returned in this response. The order of the metric totals is same
   * as the metric order specified in the request.
   */
  totalsForAllResults?: {
    [key: string]: string
  };
}

function serializeGaData(data: any): GaData {
  return {
    ...data,
    dataLastRefreshed: data["dataLastRefreshed"] !== undefined ? String(data["dataLastRefreshed"]) : undefined,
    sampleSize: data["sampleSize"] !== undefined ? String(data["sampleSize"]) : undefined,
    sampleSpace: data["sampleSpace"] !== undefined ? String(data["sampleSpace"]) : undefined,
  };
}

function deserializeGaData(data: any): GaData {
  return {
    ...data,
    dataLastRefreshed: data["dataLastRefreshed"] !== undefined ? BigInt(data["dataLastRefreshed"]) : undefined,
    sampleSize: data["sampleSize"] !== undefined ? BigInt(data["sampleSize"]) : undefined,
    sampleSpace: data["sampleSpace"] !== undefined ? BigInt(data["sampleSpace"]) : undefined,
  };
}

/**
 * JSON template for Analytics goal resource.
 */
export interface Goal {
  /**
   * Account ID to which this goal belongs.
   */
  accountId?: string;
  /**
   * Determines whether this goal is active.
   */
  active?: boolean;
  /**
   * Time this goal was created.
   */
  created?: Date;
  /**
   * Details for the goal of the type EVENT.
   */
  eventDetails?: {
    eventConditions?: {
      comparisonType?: string;
      comparisonValue?: bigint;
      expression?: string;
      matchType?: string;
      type?: string;
    }[];
    useEventValue?: boolean;
  };
  /**
   * Goal ID.
   */
  id?: string;
  /**
   * Internal ID for the web property to which this goal belongs.
   */
  internalWebPropertyId?: string;
  /**
   * Resource type for an Analytics goal.
   */
  kind?: string;
  /**
   * Goal name.
   */
  name?: string;
  /**
   * Parent link for a goal. Points to the view (profile) to which this goal
   * belongs.
   */
  parentLink?: {
    href?: string;
    type?: string;
  };
  /**
   * View (Profile) ID to which this goal belongs.
   */
  profileId?: string;
  /**
   * Link for this goal.
   */
  selfLink?: string;
  /**
   * Goal type. Possible values are URL_DESTINATION, VISIT_TIME_ON_SITE,
   * VISIT_NUM_PAGES, AND EVENT.
   */
  type?: string;
  /**
   * Time this goal was last modified.
   */
  updated?: Date;
  /**
   * Details for the goal of the type URL_DESTINATION.
   */
  urlDestinationDetails?: {
    caseSensitive?: boolean;
    firstStepRequired?: boolean;
    matchType?: string;
    steps?: {
      name?: string;
      number?: number;
      url?: string;
    }[];
    url?: string;
  };
  /**
   * Goal value.
   */
  value?: number;
  /**
   * Details for the goal of the type VISIT_NUM_PAGES.
   */
  visitNumPagesDetails?: {
    comparisonType?: string;
    comparisonValue?: bigint;
  };
  /**
   * Details for the goal of the type VISIT_TIME_ON_SITE.
   */
  visitTimeOnSiteDetails?: {
    comparisonType?: string;
    comparisonValue?: bigint;
  };
  /**
   * Web property ID to which this goal belongs. The web property ID is of the
   * form UA-XXXXX-YY.
   */
  webPropertyId?: string;
}

function serializeGoal(data: any): Goal {
  return {
    ...data,
    created: data["created"] !== undefined ? data["created"].toISOString() : undefined,
    eventDetails: data["eventDetails"] !== undefined ? {
      ...data["eventDetails"],
      eventConditions: data["eventDetails"]["eventConditions"] !== undefined ? data["eventDetails"]["eventConditions"].map((item: any) => ({
        ...item,
        comparisonValue: item["comparisonValue"] !== undefined ? String(item["comparisonValue"]) : undefined,
      })) : undefined,
    } : undefined,
    updated: data["updated"] !== undefined ? data["updated"].toISOString() : undefined,
    visitNumPagesDetails: data["visitNumPagesDetails"] !== undefined ? {
      ...data["visitNumPagesDetails"],
      comparisonValue: data["visitNumPagesDetails"]["comparisonValue"] !== undefined ? String(data["visitNumPagesDetails"]["comparisonValue"]) : undefined,
    } : undefined,
    visitTimeOnSiteDetails: data["visitTimeOnSiteDetails"] !== undefined ? {
      ...data["visitTimeOnSiteDetails"],
      comparisonValue: data["visitTimeOnSiteDetails"]["comparisonValue"] !== undefined ? String(data["visitTimeOnSiteDetails"]["comparisonValue"]) : undefined,
    } : undefined,
  };
}

function deserializeGoal(data: any): Goal {
  return {
    ...data,
    created: data["created"] !== undefined ? new Date(data["created"]) : undefined,
    eventDetails: data["eventDetails"] !== undefined ? {
      ...data["eventDetails"],
      eventConditions: data["eventDetails"]["eventConditions"] !== undefined ? data["eventDetails"]["eventConditions"].map((item: any) => ({
        ...item,
        comparisonValue: item["comparisonValue"] !== undefined ? BigInt(item["comparisonValue"]) : undefined,
      })) : undefined,
    } : undefined,
    updated: data["updated"] !== undefined ? new Date(data["updated"]) : undefined,
    visitNumPagesDetails: data["visitNumPagesDetails"] !== undefined ? {
      ...data["visitNumPagesDetails"],
      comparisonValue: data["visitNumPagesDetails"]["comparisonValue"] !== undefined ? BigInt(data["visitNumPagesDetails"]["comparisonValue"]) : undefined,
    } : undefined,
    visitTimeOnSiteDetails: data["visitTimeOnSiteDetails"] !== undefined ? {
      ...data["visitTimeOnSiteDetails"],
      comparisonValue: data["visitTimeOnSiteDetails"]["comparisonValue"] !== undefined ? BigInt(data["visitTimeOnSiteDetails"]["comparisonValue"]) : undefined,
    } : undefined,
  };
}

/**
 * A goal collection lists Analytics goals to which the user has access. Each
 * view (profile) can have a set of goals. Each resource in the Goal collection
 * corresponds to a single Analytics goal.
 */
export interface Goals {
  /**
   * A list of goals.
   */
  items?: Goal[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Link to next page for this goal collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this goal collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * resources in the result.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

function serializeGoals(data: any): Goals {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeGoal(item))) : undefined,
  };
}

function deserializeGoals(data: any): Goals {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeGoal(item))) : undefined,
  };
}

/**
 * JSON template for a hash Client Id request resource.
 */
export interface HashClientIdRequest {
  clientId?: string;
  kind?: string;
  webPropertyId?: string;
}

/**
 * JSON template for a hash Client Id response resource.
 */
export interface HashClientIdResponse {
  clientId?: string;
  hashedClientId?: string;
  kind?: string;
  webPropertyId?: string;
}

/**
 * JSON template for an Analytics Remarketing Include Conditions.
 */
export interface IncludeConditions {
  /**
   * The look-back window lets you specify a time frame for evaluating the
   * behavior that qualifies users for your audience. For example, if your
   * filters include users from Central Asia, and Transactions Greater than 2,
   * and you set the look-back window to 14 days, then any user from Central
   * Asia whose cumulative transactions exceed 2 during the last 14 days is
   * added to the audience.
   */
  daysToLookBack?: number;
  /**
   * Boolean indicating whether this segment is a smart list.
   * https://support.google.com/analytics/answer/4628577
   */
  isSmartList?: boolean;
  /**
   * Resource type for include conditions.
   */
  kind?: string;
  /**
   * Number of days (in the range 1 to 540) a user remains in the audience.
   */
  membershipDurationDays?: number;
  /**
   * The segment condition that will cause a user to be added to an audience.
   */
  segment?: string;
}

/**
 * JSON template for an Analytics Remarketing Audience Foreign Link.
 */
export interface LinkedForeignAccount {
  /**
   * Account ID to which this linked foreign account belongs.
   */
  accountId?: string;
  /**
   * Boolean indicating whether this is eligible for search.
   */
  readonly eligibleForSearch?: boolean;
  /**
   * Entity ad account link ID.
   */
  id?: string;
  /**
   * Internal ID for the web property to which this linked foreign account
   * belongs.
   */
  readonly internalWebPropertyId?: string;
  /**
   * Resource type for linked foreign account.
   */
  kind?: string;
  /**
   * The foreign account ID. For example the an Google Ads `linkedAccountId`
   * has the following format XXX-XXX-XXXX.
   */
  linkedAccountId?: string;
  /**
   * Remarketing audience ID to which this linked foreign account belongs.
   */
  remarketingAudienceId?: string;
  /**
   * The status of this foreign account link.
   */
  status?: string;
  /**
   * The type of the foreign account. For example, `ADWORDS_LINKS`,
   * `DBM_LINKS`, `MCC_LINKS` or `OPTIMIZE`.
   */
  type?: string;
  /**
   * Web property ID of the form UA-XXXXX-YY to which this linked foreign
   * account belongs.
   */
  webPropertyId?: string;
}

/**
 * Additional options for Analytics#managementAccountsList.
 */
export interface ManagementAccountsListOptions {
  /**
   * The maximum number of accounts to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first account to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementAccountSummariesList.
 */
export interface ManagementAccountSummariesListOptions {
  /**
   * The maximum number of account summaries to include in this response, where
   * the largest acceptable value is 1000.
   */
  max-results?: number;
  /**
   * An index of the first entity to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementAccountUserLinksList.
 */
export interface ManagementAccountUserLinksListOptions {
  /**
   * The maximum number of account-user links to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first account-user link to retrieve. Use this parameter as
   * a pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementCustomDataSourcesList.
 */
export interface ManagementCustomDataSourcesListOptions {
  /**
   * The maximum number of custom data sources to include in this response.
   */
  max-results?: number;
  /**
   * A 1-based index of the first custom data source to retrieve. Use this
   * parameter as a pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementCustomDimensionsList.
 */
export interface ManagementCustomDimensionsListOptions {
  /**
   * The maximum number of custom dimensions to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first entity to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementCustomDimensionsPatch.
 */
export interface ManagementCustomDimensionsPatchOptions {
  /**
   * Force the update and ignore any warnings related to the custom dimension
   * being linked to a custom data source / data set.
   */
  ignoreCustomDataSourceLinks?: boolean;
}

/**
 * Additional options for Analytics#managementCustomDimensionsUpdate.
 */
export interface ManagementCustomDimensionsUpdateOptions {
  /**
   * Force the update and ignore any warnings related to the custom dimension
   * being linked to a custom data source / data set.
   */
  ignoreCustomDataSourceLinks?: boolean;
}

/**
 * Additional options for Analytics#managementCustomMetricsList.
 */
export interface ManagementCustomMetricsListOptions {
  /**
   * The maximum number of custom metrics to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first entity to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementCustomMetricsPatch.
 */
export interface ManagementCustomMetricsPatchOptions {
  /**
   * Force the update and ignore any warnings related to the custom metric
   * being linked to a custom data source / data set.
   */
  ignoreCustomDataSourceLinks?: boolean;
}

/**
 * Additional options for Analytics#managementCustomMetricsUpdate.
 */
export interface ManagementCustomMetricsUpdateOptions {
  /**
   * Force the update and ignore any warnings related to the custom metric
   * being linked to a custom data source / data set.
   */
  ignoreCustomDataSourceLinks?: boolean;
}

/**
 * Additional options for Analytics#managementExperimentsList.
 */
export interface ManagementExperimentsListOptions {
  /**
   * The maximum number of experiments to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first experiment to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementFiltersList.
 */
export interface ManagementFiltersListOptions {
  /**
   * The maximum number of filters to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first entity to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementGoalsList.
 */
export interface ManagementGoalsListOptions {
  /**
   * The maximum number of goals to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first goal to retrieve. Use this parameter as a pagination
   * mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementProfileFilterLinksList.
 */
export interface ManagementProfileFilterLinksListOptions {
  /**
   * The maximum number of profile filter links to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first entity to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementProfilesList.
 */
export interface ManagementProfilesListOptions {
  /**
   * The maximum number of views (profiles) to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first entity to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementProfileUserLinksList.
 */
export interface ManagementProfileUserLinksListOptions {
  /**
   * The maximum number of profile-user links to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first profile-user link to retrieve. Use this parameter as
   * a pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementRemarketingAudienceList.
 */
export interface ManagementRemarketingAudienceListOptions {
  /**
   * The maximum number of remarketing audiences to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first entity to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
  type?: string;
}

/**
 * Additional options for Analytics#managementSegmentsList.
 */
export interface ManagementSegmentsListOptions {
  /**
   * The maximum number of segments to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first segment to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementUnsampledReportsList.
 */
export interface ManagementUnsampledReportsListOptions {
  /**
   * The maximum number of unsampled reports to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first unsampled report to retrieve. Use this parameter as
   * a pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementUploadsList.
 */
export interface ManagementUploadsListOptions {
  /**
   * The maximum number of uploads to include in this response.
   */
  max-results?: number;
  /**
   * A 1-based index of the first upload to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementWebpropertiesList.
 */
export interface ManagementWebpropertiesListOptions {
  /**
   * The maximum number of web properties to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first entity to retrieve. Use this parameter as a
   * pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementWebPropertyAdWordsLinksList.
 */
export interface ManagementWebPropertyAdWordsLinksListOptions {
  /**
   * The maximum number of webProperty-Google Ads links to include in this
   * response.
   */
  max-results?: number;
  /**
   * An index of the first webProperty-Google Ads link to retrieve. Use this
   * parameter as a pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Additional options for Analytics#managementWebpropertyUserLinksList.
 */
export interface ManagementWebpropertyUserLinksListOptions {
  /**
   * The maximum number of webProperty-user Links to include in this response.
   */
  max-results?: number;
  /**
   * An index of the first webProperty-user link to retrieve. Use this
   * parameter as a pagination mechanism along with the max-results parameter.
   */
  start-index?: number;
}

/**
 * Multi-Channel Funnels data for a given view (profile).
 */
export interface McfData {
  /**
   * Column headers that list dimension names followed by the metric names. The
   * order of dimensions and metrics is same as specified in the request.
   */
  columnHeaders?: {
    columnType?: string;
    dataType?: string;
    name?: string;
  }[];
  /**
   * Determines if the Analytics data contains sampled data.
   */
  containsSampledData?: boolean;
  /**
   * Unique ID for this data response.
   */
  id?: string;
  /**
   * The maximum number of rows the response can contain, regardless of the
   * actual number of rows returned. Its value ranges from 1 to 10,000 with a
   * value of 1000 by default, or otherwise specified by the max-results query
   * parameter.
   */
  itemsPerPage?: number;
  /**
   * Resource type.
   */
  kind?: string;
  /**
   * Link to next page for this Analytics data query.
   */
  nextLink?: string;
  /**
   * Link to previous page for this Analytics data query.
   */
  previousLink?: string;
  /**
   * Information for the view (profile), for which the Analytics data was
   * requested.
   */
  profileInfo?: {
    accountId?: string;
    internalWebPropertyId?: string;
    profileId?: string;
    profileName?: string;
    tableId?: string;
    webPropertyId?: string;
  };
  /**
   * Analytics data request query parameters.
   */
  query?: {
    dimensions?: string;
    end-date?: string;
    filters?: string;
    ids?: string;
    max-results?: number;
    metrics?: string[];
    samplingLevel?: string;
    segment?: string;
    sort?: string[];
    start-date?: string;
    start-index?: number;
  };
  /**
   * Analytics data rows, where each row contains a list of dimension values
   * followed by the metric values. The order of dimensions and metrics is same
   * as specified in the request.
   */
  rows?: {
    conversionPathValue?: {
      interactionType?: string;
      nodeValue?: string;
    }[];
    primitiveValue?: string;
  }[][];
  /**
   * The number of samples used to calculate the result.
   */
  sampleSize?: bigint;
  /**
   * Total size of the sample space from which the samples were selected.
   */
  sampleSpace?: bigint;
  /**
   * Link to this page.
   */
  selfLink?: string;
  /**
   * The total number of rows for the query, regardless of the number of rows
   * in the response.
   */
  totalResults?: number;
  /**
   * Total values for the requested metrics over all the results, not just the
   * results returned in this response. The order of the metric totals is same
   * as the metric order specified in the request.
   */
  totalsForAllResults?: {
    [key: string]: string
  };
}

function serializeMcfData(data: any): McfData {
  return {
    ...data,
    sampleSize: data["sampleSize"] !== undefined ? String(data["sampleSize"]) : undefined,
    sampleSpace: data["sampleSpace"] !== undefined ? String(data["sampleSpace"]) : undefined,
  };
}

function deserializeMcfData(data: any): McfData {
  return {
    ...data,
    sampleSize: data["sampleSize"] !== undefined ? BigInt(data["sampleSize"]) : undefined,
    sampleSpace: data["sampleSpace"] !== undefined ? BigInt(data["sampleSpace"]) : undefined,
  };
}

/**
 * JSON template for an Analytics view (profile).
 */
export interface Profile {
  /**
   * Account ID to which this view (profile) belongs.
   */
  accountId?: string;
  /**
   * Indicates whether bot filtering is enabled for this view (profile).
   */
  botFilteringEnabled?: boolean;
  /**
   * Child link for this view (profile). Points to the list of goals for this
   * view (profile).
   */
  childLink?: {
    href?: string;
    type?: string;
  };
  /**
   * Time this view (profile) was created.
   */
  readonly created?: Date;
  /**
   * The currency type associated with this view (profile), defaults to USD.
   * The supported values are: USD, JPY, EUR, GBP, AUD, KRW, BRL, CNY, DKK, RUB,
   * SEK, NOK, PLN, TRY, TWD, HKD, THB, IDR, ARS, MXN, VND, PHP, INR, CHF, CAD,
   * CZK, NZD, HUF, BGN, LTL, ZAR, UAH, AED, BOB, CLP, COP, EGP, HRK, ILS, MAD,
   * MYR, PEN, PKR, RON, RSD, SAR, SGD, VEF, LVL
   */
  currency?: string;
  /**
   * Default page for this view (profile).
   */
  defaultPage?: string;
  /**
   * Indicates whether ecommerce tracking is enabled for this view (profile).
   */
  eCommerceTracking?: boolean;
  /**
   * Indicates whether enhanced ecommerce tracking is enabled for this view
   * (profile). This property can only be enabled if ecommerce tracking is
   * enabled.
   */
  enhancedECommerceTracking?: boolean;
  /**
   * The query parameters that are excluded from this view (profile).
   */
  excludeQueryParameters?: string;
  /**
   * View (Profile) ID.
   */
  id?: string;
  /**
   * Internal ID for the web property to which this view (profile) belongs.
   */
  readonly internalWebPropertyId?: string;
  /**
   * Resource type for Analytics view (profile).
   */
  readonly kind?: string;
  /**
   * Name of this view (profile).
   */
  name?: string;
  /**
   * Parent link for this view (profile). Points to the web property to which
   * this view (profile) belongs.
   */
  parentLink?: {
    href?: string;
    type?: string;
  };
  /**
   * Permissions the user has for this view (profile).
   */
  permissions?: {
    effective?: string[];
  };
  /**
   * Link for this view (profile).
   */
  readonly selfLink?: string;
  /**
   * Site search category parameters for this view (profile).
   */
  siteSearchCategoryParameters?: string;
  /**
   * The site search query parameters for this view (profile).
   */
  siteSearchQueryParameters?: string;
  /**
   * Indicates whether this view (profile) is starred or not.
   */
  starred?: boolean;
  /**
   * Whether or not Analytics will strip search category parameters from the
   * URLs in your reports.
   */
  stripSiteSearchCategoryParameters?: boolean;
  /**
   * Whether or not Analytics will strip search query parameters from the URLs
   * in your reports.
   */
  stripSiteSearchQueryParameters?: boolean;
  /**
   * Time zone for which this view (profile) has been configured. Time zones
   * are identified by strings from the TZ database.
   */
  timezone?: string;
  /**
   * View (Profile) type. Supported types: WEB or APP.
   */
  type?: string;
  /**
   * Time this view (profile) was last modified.
   */
  readonly updated?: Date;
  /**
   * Web property ID of the form UA-XXXXX-YY to which this view (profile)
   * belongs.
   */
  readonly webPropertyId?: string;
  /**
   * Website URL for this view (profile).
   */
  websiteUrl?: string;
}

/**
 * JSON template for an Analytics profile filter link.
 */
export interface ProfileFilterLink {
  /**
   * Filter for this link.
   */
  filterRef?: FilterRef;
  /**
   * Profile filter link ID.
   */
  id?: string;
  /**
   * Resource type for Analytics filter.
   */
  readonly kind?: string;
  /**
   * View (Profile) for this link.
   */
  profileRef?: ProfileRef;
  /**
   * The rank of this profile filter link relative to the other filters linked
   * to the same profile. For readonly (i.e., list and get) operations, the rank
   * always starts at 1. For write (i.e., create, update, or delete) operations,
   * you may specify a value between 0 and 255 inclusively, [0, 255]. In order
   * to insert a link at the end of the list, either don't specify a rank or set
   * a rank to a number greater than the largest rank in the list. In order to
   * insert a link to the beginning of the list specify a rank that is less than
   * or equal to 1. The new link will move all existing filters with the same or
   * lower rank down the list. After the link is inserted/updated/deleted all
   * profile filter links will be renumbered starting at 1.
   */
  rank?: number;
  /**
   * Link for this profile filter link.
   */
  readonly selfLink?: string;
}

/**
 * A profile filter link collection lists profile filter links between profiles
 * and filters. Each resource in the collection corresponds to a profile filter
 * link.
 */
export interface ProfileFilterLinks {
  /**
   * A list of profile filter links.
   */
  items?: ProfileFilterLink[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1,000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Link to next page for this profile filter link collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this profile filter link collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * results in the response.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

/**
 * JSON template for a linked view (profile).
 */
export interface ProfileRef {
  /**
   * Account ID to which this view (profile) belongs.
   */
  accountId?: string;
  /**
   * Link for this view (profile).
   */
  href?: string;
  /**
   * View (Profile) ID.
   */
  id?: string;
  /**
   * Internal ID for the web property to which this view (profile) belongs.
   */
  internalWebPropertyId?: string;
  /**
   * Analytics view (profile) reference.
   */
  kind?: string;
  /**
   * Name of this view (profile).
   */
  name?: string;
  /**
   * Web property ID of the form UA-XXXXX-YY to which this view (profile)
   * belongs.
   */
  webPropertyId?: string;
}

/**
 * A view (profile) collection lists Analytics views (profiles) to which the
 * user has access. Each resource in the collection corresponds to a single
 * Analytics view (profile).
 */
export interface Profiles {
  /**
   * A list of views (profiles).
   */
  items?: Profile[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Link to next page for this view (profile) collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this view (profile) collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * results in the response.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

/**
 * JSON template for an Analytics ProfileSummary. ProfileSummary returns basic
 * information (i.e., summary) for a profile.
 */
export interface ProfileSummary {
  /**
   * View (profile) ID.
   */
  id?: string;
  /**
   * Resource type for Analytics ProfileSummary.
   */
  kind?: string;
  /**
   * View (profile) name.
   */
  name?: string;
  /**
   * Indicates whether this view (profile) is starred or not.
   */
  starred?: boolean;
  /**
   * View (Profile) type. Supported types: WEB or APP.
   */
  type?: string;
}

/**
 * Real time data for a given view (profile).
 */
export interface RealtimeData {
  /**
   * Column headers that list dimension names followed by the metric names. The
   * order of dimensions and metrics is same as specified in the request.
   */
  columnHeaders?: {
    columnType?: string;
    dataType?: string;
    name?: string;
  }[];
  /**
   * Unique ID for this data response.
   */
  id?: string;
  /**
   * Resource type.
   */
  kind?: string;
  /**
   * Information for the view (profile), for which the real time data was
   * requested.
   */
  profileInfo?: {
    accountId?: string;
    internalWebPropertyId?: string;
    profileId?: string;
    profileName?: string;
    tableId?: string;
    webPropertyId?: string;
  };
  /**
   * Real time data request query parameters.
   */
  query?: {
    dimensions?: string;
    filters?: string;
    ids?: string;
    max-results?: number;
    metrics?: string[];
    sort?: string[];
  };
  /**
   * Real time data rows, where each row contains a list of dimension values
   * followed by the metric values. The order of dimensions and metrics is same
   * as specified in the request.
   */
  rows?: string[][];
  /**
   * Link to this page.
   */
  selfLink?: string;
  /**
   * The total number of rows for the query, regardless of the number of rows
   * in the response.
   */
  totalResults?: number;
  /**
   * Total values for the requested metrics over all the results, not just the
   * results returned in this response. The order of the metric totals is same
   * as the metric order specified in the request.
   */
  totalsForAllResults?: {
    [key: string]: string
  };
}

/**
 * JSON template for an Analytics remarketing audience.
 */
export interface RemarketingAudience {
  /**
   * Account ID to which this remarketing audience belongs.
   */
  accountId?: string;
  /**
   * The simple audience definition that will cause a user to be added to an
   * audience.
   */
  audienceDefinition?: {
    includeConditions?: IncludeConditions;
  };
  /**
   * The type of audience, either SIMPLE or STATE_BASED.
   */
  audienceType?: string;
  /**
   * Time this remarketing audience was created.
   */
  readonly created?: Date;
  /**
   * The description of this remarketing audience.
   */
  readonly description?: string;
  /**
   * Remarketing Audience ID.
   */
  id?: string;
  /**
   * Internal ID for the web property to which this remarketing audience
   * belongs.
   */
  readonly internalWebPropertyId?: string;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * The linked ad accounts associated with this remarketing audience. A
   * remarketing audience can have only one linkedAdAccount currently.
   */
  linkedAdAccounts?: LinkedForeignAccount[];
  /**
   * The views (profiles) that this remarketing audience is linked to.
   */
  linkedViews?: string[];
  /**
   * The name of this remarketing audience.
   */
  name?: string;
  /**
   * A state based audience definition that will cause a user to be added or
   * removed from an audience.
   */
  stateBasedAudienceDefinition?: {
    excludeConditions?: {
      exclusionDuration?: string;
      segment?: string;
    };
    includeConditions?: IncludeConditions;
  };
  /**
   * Time this remarketing audience was last modified.
   */
  readonly updated?: Date;
  /**
   * Web property ID of the form UA-XXXXX-YY to which this remarketing audience
   * belongs.
   */
  webPropertyId?: string;
}

/**
 * A remarketing audience collection lists Analytics remarketing audiences to
 * which the user has access. Each resource in the collection corresponds to a
 * single Analytics remarketing audience.
 */
export interface RemarketingAudiences {
  /**
   * A list of remarketing audiences.
   */
  items?: RemarketingAudience[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Link to next page for this remarketing audience collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this view (profile) collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * results in the response.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

/**
 * JSON template for an Analytics segment.
 */
export interface Segment {
  /**
   * Time the segment was created.
   */
  created?: Date;
  /**
   * Segment definition.
   */
  definition?: string;
  /**
   * Segment ID.
   */
  id?: string;
  /**
   * Resource type for Analytics segment.
   */
  kind?: string;
  /**
   * Segment name.
   */
  name?: string;
  /**
   * Segment ID. Can be used with the 'segment' parameter in Core Reporting
   * API.
   */
  segmentId?: string;
  /**
   * Link for this segment.
   */
  selfLink?: string;
  /**
   * Type for a segment. Possible values are "BUILT_IN" or "CUSTOM".
   */
  type?: string;
  /**
   * Time the segment was last modified.
   */
  updated?: Date;
}

function serializeSegment(data: any): Segment {
  return {
    ...data,
    created: data["created"] !== undefined ? data["created"].toISOString() : undefined,
    updated: data["updated"] !== undefined ? data["updated"].toISOString() : undefined,
  };
}

function deserializeSegment(data: any): Segment {
  return {
    ...data,
    created: data["created"] !== undefined ? new Date(data["created"]) : undefined,
    updated: data["updated"] !== undefined ? new Date(data["updated"]) : undefined,
  };
}

/**
 * An segment collection lists Analytics segments that the user has access to.
 * Each resource in the collection corresponds to a single Analytics segment.
 */
export interface Segments {
  /**
   * A list of segments.
   */
  items?: Segment[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type for segments.
   */
  kind?: string;
  /**
   * Link to next page for this segment collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this segment collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * results in the response.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

function serializeSegments(data: any): Segments {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeSegment(item))) : undefined,
  };
}

function deserializeSegments(data: any): Segments {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeSegment(item))) : undefined,
  };
}

/**
 * JSON template for Analytics unsampled report resource.
 */
export interface UnsampledReport {
  /**
   * Account ID to which this unsampled report belongs.
   */
  accountId?: string;
  /**
   * Download details for a file stored in Google Cloud Storage.
   */
  readonly cloudStorageDownloadDetails?: {
    bucketId?: string;
    objectId?: string;
  };
  /**
   * Time this unsampled report was created.
   */
  readonly created?: Date;
  /**
   * The dimensions for the unsampled report.
   */
  dimensions?: string;
  /**
   * The type of download you need to use for the report data file. Possible
   * values include `GOOGLE_DRIVE` and `GOOGLE_CLOUD_STORAGE`. If the value is
   * `GOOGLE_DRIVE`, see the `driveDownloadDetails` field. If the value is
   * `GOOGLE_CLOUD_STORAGE`, see the `cloudStorageDownloadDetails` field.
   */
  readonly downloadType?: string;
  /**
   * Download details for a file stored in Google Drive.
   */
  readonly driveDownloadDetails?: {
    documentId?: string;
  };
  /**
   * The end date for the unsampled report.
   */
  end-date?: string;
  /**
   * The filters for the unsampled report.
   */
  filters?: string;
  /**
   * Unsampled report ID.
   */
  id?: string;
  /**
   * Resource type for an Analytics unsampled report.
   */
  readonly kind?: string;
  /**
   * The metrics for the unsampled report.
   */
  metrics?: string;
  /**
   * View (Profile) ID to which this unsampled report belongs.
   */
  profileId?: string;
  /**
   * The segment for the unsampled report.
   */
  segment?: string;
  /**
   * Link for this unsampled report.
   */
  readonly selfLink?: string;
  /**
   * The start date for the unsampled report.
   */
  start-date?: string;
  /**
   * Status of this unsampled report. Possible values are PENDING, COMPLETED,
   * or FAILED.
   */
  readonly status?: string;
  /**
   * Title of the unsampled report.
   */
  title?: string;
  /**
   * Time this unsampled report was last modified.
   */
  readonly updated?: Date;
  /**
   * Web property ID to which this unsampled report belongs. The web property
   * ID is of the form UA-XXXXX-YY.
   */
  webPropertyId?: string;
}

/**
 * An unsampled report collection lists Analytics unsampled reports to which
 * the user has access. Each view (profile) can have a set of unsampled reports.
 * Each resource in the unsampled report collection corresponds to a single
 * Analytics unsampled report.
 */
export interface UnsampledReports {
  /**
   * A list of unsampled reports.
   */
  items?: UnsampledReport[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Link to next page for this unsampled report collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this unsampled report collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * resources in the result.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

/**
 * Metadata returned for an upload operation.
 */
export interface Upload {
  /**
   * Account Id to which this upload belongs.
   */
  accountId?: bigint;
  /**
   * Custom data source Id to which this data import belongs.
   */
  customDataSourceId?: string;
  /**
   * Data import errors collection.
   */
  errors?: string[];
  /**
   * A unique ID for this upload.
   */
  id?: string;
  /**
   * Resource type for Analytics upload.
   */
  kind?: string;
  /**
   * Upload status. Possible values: PENDING, COMPLETED, FAILED, DELETING,
   * DELETED.
   */
  status?: string;
  /**
   * Time this file is uploaded.
   */
  uploadTime?: Date;
}

function serializeUpload(data: any): Upload {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? String(data["accountId"]) : undefined,
    uploadTime: data["uploadTime"] !== undefined ? data["uploadTime"].toISOString() : undefined,
  };
}

function deserializeUpload(data: any): Upload {
  return {
    ...data,
    accountId: data["accountId"] !== undefined ? BigInt(data["accountId"]) : undefined,
    uploadTime: data["uploadTime"] !== undefined ? new Date(data["uploadTime"]) : undefined,
  };
}

/**
 * Upload collection lists Analytics uploads to which the user has access. Each
 * custom data source can have a set of uploads. Each resource in the upload
 * collection corresponds to a single Analytics data upload.
 */
export interface Uploads {
  /**
   * A list of uploads.
   */
  items?: Upload[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Link to next page for this upload collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this upload collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * resources in the result.
   */
  totalResults?: number;
}

function serializeUploads(data: any): Uploads {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeUpload(item))) : undefined,
  };
}

function deserializeUploads(data: any): Uploads {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeUpload(item))) : undefined,
  };
}

/**
 * JSON template for a user deletion request resource.
 */
export interface UserDeletionRequest {
  /**
   * This marks the point in time for which all user data before should be
   * deleted
   */
  readonly deletionRequestTime?: Date;
  /**
   * Firebase Project Id
   */
  firebaseProjectId?: string;
  /**
   * User ID.
   */
  id?: {
    type?: string;
    userId?: string;
  };
  /**
   * Value is "analytics#userDeletionRequest".
   */
  kind?: string;
  /**
   * Property ID
   */
  propertyId?: string;
  /**
   * Web property ID of the form UA-XXXXX-YY.
   */
  webPropertyId?: string;
}

/**
 * JSON template for a user reference.
 */
export interface UserRef {
  /**
   * Email ID of this user.
   */
  email?: string;
  /**
   * User ID.
   */
  id?: string;
  kind?: string;
}

/**
 * A web property collection lists Analytics web properties to which the user
 * has access. Each resource in the collection corresponds to a single Analytics
 * web property.
 */
export interface Webproperties {
  /**
   * A list of web properties.
   */
  items?: Webproperty[];
  /**
   * The maximum number of resources the response can contain, regardless of
   * the actual number of resources returned. Its value ranges from 1 to 1000
   * with a value of 1000 by default, or otherwise specified by the max-results
   * query parameter.
   */
  itemsPerPage?: number;
  /**
   * Collection type.
   */
  kind?: string;
  /**
   * Link to next page for this web property collection.
   */
  nextLink?: string;
  /**
   * Link to previous page for this web property collection.
   */
  previousLink?: string;
  /**
   * The starting index of the resources, which is 1 by default or otherwise
   * specified by the start-index query parameter.
   */
  startIndex?: number;
  /**
   * The total number of results for the query, regardless of the number of
   * results in the response.
   */
  totalResults?: number;
  /**
   * Email ID of the authenticated user
   */
  username?: string;
}

function serializeWebproperties(data: any): Webproperties {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (serializeWebproperty(item))) : undefined,
  };
}

function deserializeWebproperties(data: any): Webproperties {
  return {
    ...data,
    items: data["items"] !== undefined ? data["items"].map((item: any) => (deserializeWebproperty(item))) : undefined,
  };
}

/**
 * JSON template for an Analytics web property.
 */
export interface Webproperty {
  /**
   * Account ID to which this web property belongs.
   */
  accountId?: string;
  /**
   * Child link for this web property. Points to the list of views (profiles)
   * for this web property.
   */
  childLink?: {
    href?: string;
    type?: string;
  };
  /**
   * Time this web property was created.
   */
  readonly created?: Date;
  /**
   * Set to true to reset the retention period of the user identifier with each
   * new event from that user (thus setting the expiration date to current time
   * plus retention period). Set to false to delete data associated with the
   * user identifier automatically after the rentention period. This property
   * cannot be set on insert.
   */
  dataRetentionResetOnNewActivity?: boolean;
  /**
   * The length of time for which user and event data is retained. This
   * property cannot be set on insert.
   */
  dataRetentionTtl?: string;
  /**
   * Default view (profile) ID.
   */
  defaultProfileId?: bigint;
  /**
   * Web property ID of the form UA-XXXXX-YY.
   */
  id?: string;
  /**
   * The industry vertical/category selected for this web property.
   */
  industryVertical?: string;
  /**
   * Internal ID for this web property.
   */
  readonly internalWebPropertyId?: string;
  /**
   * Resource type for Analytics WebProperty.
   */
  readonly kind?: string;
  /**
   * Level for this web property. Possible values are STANDARD or PREMIUM.
   */
  readonly level?: string;
  /**
   * Name of this web property.
   */
  name?: string;
  /**
   * Parent link for this web property. Points to the account to which this web
   * property belongs.
   */
  parentLink?: {
    href?: string;
    type?: string;
  };
  /**
   * Permissions the user has for this web property.
   */
  permissions?: {
    effective?: string[];
  };
  /**
   * View (Profile) count for this web property.
   */
  readonly profileCount?: number;
  /**
   * Link for this web property.
   */
  readonly selfLink?: string;
  /**
   * Indicates whether this web property is starred or not.
   */
  starred?: boolean;
  /**
   * Time this web property was last modified.
   */
  readonly updated?: Date;
  /**
   * Website url for this web property.
   */
  websiteUrl?: string;
}

function serializeWebproperty(data: any): Webproperty {
  return {
    ...data,
    defaultProfileId: data["defaultProfileId"] !== undefined ? String(data["defaultProfileId"]) : undefined,
  };
}

function deserializeWebproperty(data: any): Webproperty {
  return {
    ...data,
    created: data["created"] !== undefined ? new Date(data["created"]) : undefined,
    defaultProfileId: data["defaultProfileId"] !== undefined ? BigInt(data["defaultProfileId"]) : undefined,
    updated: data["updated"] !== undefined ? new Date(data["updated"]) : undefined,
  };
}

/**
 * JSON template for a web property reference.
 */
export interface WebPropertyRef {
  /**
   * Account ID to which this web property belongs.
   */
  accountId?: string;
  /**
   * Link for this web property.
   */
  href?: string;
  /**
   * Web property ID of the form UA-XXXXX-YY.
   */
  id?: string;
  /**
   * Internal ID for this web property.
   */
  internalWebPropertyId?: string;
  /**
   * Analytics web property reference.
   */
  kind?: string;
  /**
   * Name of this web property.
   */
  name?: string;
}

/**
 * JSON template for an Analytics WebPropertySummary. WebPropertySummary
 * returns basic information (i.e., summary) for a web property.
 */
export interface WebPropertySummary {
  /**
   * Web property ID of the form UA-XXXXX-YY.
   */
  id?: string;
  /**
   * Internal ID for this web property.
   */
  internalWebPropertyId?: string;
  /**
   * Resource type for Analytics WebPropertySummary.
   */
  kind?: string;
  /**
   * Level for this web property. Possible values are STANDARD or PREMIUM.
   */
  level?: string;
  /**
   * Web property name.
   */
  name?: string;
  /**
   * List of profiles under this web property.
   */
  profiles?: ProfileSummary[];
  /**
   * Indicates whether this web property is starred or not.
   */
  starred?: boolean;
  /**
   * Website url for this web property.
   */
  websiteUrl?: string;
}