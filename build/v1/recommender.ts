// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Recommender API Client for Deno
 * ===============================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/recommender/docs/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class Recommender {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://recommender.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets the requested InsightTypeConfig. There is only one instance of the
   * config for each InsightType.
   *
   * @param name Required. Name of the InsightTypeConfig to get. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config`
   */
  async billingAccountsLocationsInsightTypesGetConfig(name: string): Promise<GoogleCloudRecommenderV1InsightTypeConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1InsightTypeConfig(data);
  }

  /**
   * Gets the requested insight. Requires the recommender.*.get IAM permission
   * for the specified insight type.
   *
   * @param name Required. Name of the insight.
   */
  async billingAccountsLocationsInsightTypesInsightsGet(name: string): Promise<GoogleCloudRecommenderV1Insight> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1Insight(data);
  }

  /**
   * Lists insights for the specified Cloud Resource. Requires the
   * recommender.*.list IAM permission for the specified insight type.
   *
   * @param parent Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ INSIGHT_TYPE_ID refers to supported insight types: https://cloud.google.com/recommender/docs/insights/insight-types.
   */
  async billingAccountsLocationsInsightTypesInsightsList(parent: string, opts: BillingAccountsLocationsInsightTypesInsightsListOptions = {}): Promise<GoogleCloudRecommenderV1ListInsightsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/insights`);
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
    return deserializeGoogleCloudRecommenderV1ListInsightsResponse(data);
  }

  /**
   * Marks the Insight State as Accepted. Users can use this method to indicate
   * to the Recommender API that they have applied some action based on the
   * insight. This stops the insight content from being updated.
   * MarkInsightAccepted can be applied to insights in ACTIVE state. Requires
   * the recommender.*.update IAM permission for the specified insight.
   *
   * @param name Required. Name of the insight.
   */
  async billingAccountsLocationsInsightTypesInsightsMarkAccepted(name: string, req: GoogleCloudRecommenderV1MarkInsightAcceptedRequest): Promise<GoogleCloudRecommenderV1Insight> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markAccepted`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Insight(data);
  }

  /**
   * Updates an InsightTypeConfig change. This will create a new revision of
   * the config.
   *
   * @param name Name of insight type config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config
   */
  async billingAccountsLocationsInsightTypesUpdateConfig(name: string, req: GoogleCloudRecommenderV1InsightTypeConfig, opts: BillingAccountsLocationsInsightTypesUpdateConfigOptions = {}): Promise<GoogleCloudRecommenderV1InsightTypeConfig> {
    req = serializeGoogleCloudRecommenderV1InsightTypeConfig(req);
    opts = serializeBillingAccountsLocationsInsightTypesUpdateConfigOptions(opts);
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
    return deserializeGoogleCloudRecommenderV1InsightTypeConfig(data);
  }

  /**
   * Gets the requested Recommender Config. There is only one instance of the
   * config for each Recommender.
   *
   * @param name Required. Name of the Recommendation Config to get. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config`
   */
  async billingAccountsLocationsRecommendersGetConfig(name: string): Promise<GoogleCloudRecommenderV1RecommenderConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1RecommenderConfig(data);
  }

  /**
   * Gets the requested recommendation. Requires the recommender.*.get IAM
   * permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async billingAccountsLocationsRecommendersRecommendationsGet(name: string): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Lists recommendations for the specified Cloud Resource. Requires the
   * recommender.*.list IAM permission for the specified recommender.
   *
   * @param parent Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ RECOMMENDER_ID refers to supported recommenders: https://cloud.google.com/recommender/docs/recommenders.
   */
  async billingAccountsLocationsRecommendersRecommendationsList(parent: string, opts: BillingAccountsLocationsRecommendersRecommendationsListOptions = {}): Promise<GoogleCloudRecommenderV1ListRecommendationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/recommendations`);
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
    return deserializeGoogleCloudRecommenderV1ListRecommendationsResponse(data);
  }

  /**
   * Marks the Recommendation State as Claimed. Users can use this method to
   * indicate to the Recommender API that they are starting to apply the
   * recommendation themselves. This stops the recommendation content from being
   * updated. Associated insights are frozen and placed in the ACCEPTED state.
   * MarkRecommendationClaimed can be applied to recommendations in CLAIMED,
   * SUCCEEDED, FAILED, or ACTIVE state. Requires the recommender.*.update IAM
   * permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async billingAccountsLocationsRecommendersRecommendationsMarkClaimed(name: string, req: GoogleCloudRecommenderV1MarkRecommendationClaimedRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markClaimed`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Mark the Recommendation State as Dismissed. Users can use this method to
   * indicate to the Recommender API that an ACTIVE recommendation has to be
   * marked back as DISMISSED. MarkRecommendationDismissed can be applied to
   * recommendations in ACTIVE state. Requires the recommender.*.update IAM
   * permission for the specified recommender.
   *
   * @param name Name of the recommendation.
   */
  async billingAccountsLocationsRecommendersRecommendationsMarkDismissed(name: string, req: GoogleCloudRecommenderV1MarkRecommendationDismissedRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markDismissed`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Marks the Recommendation State as Failed. Users can use this method to
   * indicate to the Recommender API that they have applied the recommendation
   * themselves, and the operation failed. This stops the recommendation content
   * from being updated. Associated insights are frozen and placed in the
   * ACCEPTED state. MarkRecommendationFailed can be applied to recommendations
   * in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the
   * recommender.*.update IAM permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async billingAccountsLocationsRecommendersRecommendationsMarkFailed(name: string, req: GoogleCloudRecommenderV1MarkRecommendationFailedRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markFailed`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Marks the Recommendation State as Succeeded. Users can use this method to
   * indicate to the Recommender API that they have applied the recommendation
   * themselves, and the operation was successful. This stops the recommendation
   * content from being updated. Associated insights are frozen and placed in
   * the ACCEPTED state. MarkRecommendationSucceeded can be applied to
   * recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires
   * the recommender.*.update IAM permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async billingAccountsLocationsRecommendersRecommendationsMarkSucceeded(name: string, req: GoogleCloudRecommenderV1MarkRecommendationSucceededRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markSucceeded`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Updates a Recommender Config. This will create a new revision of the
   * config.
   *
   * @param name Name of recommender config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config
   */
  async billingAccountsLocationsRecommendersUpdateConfig(name: string, req: GoogleCloudRecommenderV1RecommenderConfig, opts: BillingAccountsLocationsRecommendersUpdateConfigOptions = {}): Promise<GoogleCloudRecommenderV1RecommenderConfig> {
    req = serializeGoogleCloudRecommenderV1RecommenderConfig(req);
    opts = serializeBillingAccountsLocationsRecommendersUpdateConfigOptions(opts);
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
    return deserializeGoogleCloudRecommenderV1RecommenderConfig(data);
  }

  /**
   * Gets the requested insight. Requires the recommender.*.get IAM permission
   * for the specified insight type.
   *
   * @param name Required. Name of the insight.
   */
  async foldersLocationsInsightTypesInsightsGet(name: string): Promise<GoogleCloudRecommenderV1Insight> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1Insight(data);
  }

  /**
   * Lists insights for the specified Cloud Resource. Requires the
   * recommender.*.list IAM permission for the specified insight type.
   *
   * @param parent Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ INSIGHT_TYPE_ID refers to supported insight types: https://cloud.google.com/recommender/docs/insights/insight-types.
   */
  async foldersLocationsInsightTypesInsightsList(parent: string, opts: FoldersLocationsInsightTypesInsightsListOptions = {}): Promise<GoogleCloudRecommenderV1ListInsightsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/insights`);
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
    return deserializeGoogleCloudRecommenderV1ListInsightsResponse(data);
  }

  /**
   * Marks the Insight State as Accepted. Users can use this method to indicate
   * to the Recommender API that they have applied some action based on the
   * insight. This stops the insight content from being updated.
   * MarkInsightAccepted can be applied to insights in ACTIVE state. Requires
   * the recommender.*.update IAM permission for the specified insight.
   *
   * @param name Required. Name of the insight.
   */
  async foldersLocationsInsightTypesInsightsMarkAccepted(name: string, req: GoogleCloudRecommenderV1MarkInsightAcceptedRequest): Promise<GoogleCloudRecommenderV1Insight> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markAccepted`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Insight(data);
  }

  /**
   * Gets the requested recommendation. Requires the recommender.*.get IAM
   * permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async foldersLocationsRecommendersRecommendationsGet(name: string): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Lists recommendations for the specified Cloud Resource. Requires the
   * recommender.*.list IAM permission for the specified recommender.
   *
   * @param parent Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ RECOMMENDER_ID refers to supported recommenders: https://cloud.google.com/recommender/docs/recommenders.
   */
  async foldersLocationsRecommendersRecommendationsList(parent: string, opts: FoldersLocationsRecommendersRecommendationsListOptions = {}): Promise<GoogleCloudRecommenderV1ListRecommendationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/recommendations`);
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
    return deserializeGoogleCloudRecommenderV1ListRecommendationsResponse(data);
  }

  /**
   * Marks the Recommendation State as Claimed. Users can use this method to
   * indicate to the Recommender API that they are starting to apply the
   * recommendation themselves. This stops the recommendation content from being
   * updated. Associated insights are frozen and placed in the ACCEPTED state.
   * MarkRecommendationClaimed can be applied to recommendations in CLAIMED,
   * SUCCEEDED, FAILED, or ACTIVE state. Requires the recommender.*.update IAM
   * permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async foldersLocationsRecommendersRecommendationsMarkClaimed(name: string, req: GoogleCloudRecommenderV1MarkRecommendationClaimedRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markClaimed`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Mark the Recommendation State as Dismissed. Users can use this method to
   * indicate to the Recommender API that an ACTIVE recommendation has to be
   * marked back as DISMISSED. MarkRecommendationDismissed can be applied to
   * recommendations in ACTIVE state. Requires the recommender.*.update IAM
   * permission for the specified recommender.
   *
   * @param name Name of the recommendation.
   */
  async foldersLocationsRecommendersRecommendationsMarkDismissed(name: string, req: GoogleCloudRecommenderV1MarkRecommendationDismissedRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markDismissed`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Marks the Recommendation State as Failed. Users can use this method to
   * indicate to the Recommender API that they have applied the recommendation
   * themselves, and the operation failed. This stops the recommendation content
   * from being updated. Associated insights are frozen and placed in the
   * ACCEPTED state. MarkRecommendationFailed can be applied to recommendations
   * in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the
   * recommender.*.update IAM permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async foldersLocationsRecommendersRecommendationsMarkFailed(name: string, req: GoogleCloudRecommenderV1MarkRecommendationFailedRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markFailed`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Marks the Recommendation State as Succeeded. Users can use this method to
   * indicate to the Recommender API that they have applied the recommendation
   * themselves, and the operation was successful. This stops the recommendation
   * content from being updated. Associated insights are frozen and placed in
   * the ACCEPTED state. MarkRecommendationSucceeded can be applied to
   * recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires
   * the recommender.*.update IAM permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async foldersLocationsRecommendersRecommendationsMarkSucceeded(name: string, req: GoogleCloudRecommenderV1MarkRecommendationSucceededRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markSucceeded`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Gets the requested InsightTypeConfig. There is only one instance of the
   * config for each InsightType.
   *
   * @param name Required. Name of the InsightTypeConfig to get. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config`
   */
  async organizationsLocationsInsightTypesGetConfig(name: string): Promise<GoogleCloudRecommenderV1InsightTypeConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1InsightTypeConfig(data);
  }

  /**
   * Gets the requested insight. Requires the recommender.*.get IAM permission
   * for the specified insight type.
   *
   * @param name Required. Name of the insight.
   */
  async organizationsLocationsInsightTypesInsightsGet(name: string): Promise<GoogleCloudRecommenderV1Insight> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1Insight(data);
  }

  /**
   * Lists insights for the specified Cloud Resource. Requires the
   * recommender.*.list IAM permission for the specified insight type.
   *
   * @param parent Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ INSIGHT_TYPE_ID refers to supported insight types: https://cloud.google.com/recommender/docs/insights/insight-types.
   */
  async organizationsLocationsInsightTypesInsightsList(parent: string, opts: OrganizationsLocationsInsightTypesInsightsListOptions = {}): Promise<GoogleCloudRecommenderV1ListInsightsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/insights`);
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
    return deserializeGoogleCloudRecommenderV1ListInsightsResponse(data);
  }

  /**
   * Marks the Insight State as Accepted. Users can use this method to indicate
   * to the Recommender API that they have applied some action based on the
   * insight. This stops the insight content from being updated.
   * MarkInsightAccepted can be applied to insights in ACTIVE state. Requires
   * the recommender.*.update IAM permission for the specified insight.
   *
   * @param name Required. Name of the insight.
   */
  async organizationsLocationsInsightTypesInsightsMarkAccepted(name: string, req: GoogleCloudRecommenderV1MarkInsightAcceptedRequest): Promise<GoogleCloudRecommenderV1Insight> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markAccepted`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Insight(data);
  }

  /**
   * Updates an InsightTypeConfig change. This will create a new revision of
   * the config.
   *
   * @param name Name of insight type config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config
   */
  async organizationsLocationsInsightTypesUpdateConfig(name: string, req: GoogleCloudRecommenderV1InsightTypeConfig, opts: OrganizationsLocationsInsightTypesUpdateConfigOptions = {}): Promise<GoogleCloudRecommenderV1InsightTypeConfig> {
    req = serializeGoogleCloudRecommenderV1InsightTypeConfig(req);
    opts = serializeOrganizationsLocationsInsightTypesUpdateConfigOptions(opts);
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
    return deserializeGoogleCloudRecommenderV1InsightTypeConfig(data);
  }

  /**
   * Gets the requested Recommender Config. There is only one instance of the
   * config for each Recommender.
   *
   * @param name Required. Name of the Recommendation Config to get. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config`
   */
  async organizationsLocationsRecommendersGetConfig(name: string): Promise<GoogleCloudRecommenderV1RecommenderConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1RecommenderConfig(data);
  }

  /**
   * Gets the requested recommendation. Requires the recommender.*.get IAM
   * permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async organizationsLocationsRecommendersRecommendationsGet(name: string): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Lists recommendations for the specified Cloud Resource. Requires the
   * recommender.*.list IAM permission for the specified recommender.
   *
   * @param parent Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ RECOMMENDER_ID refers to supported recommenders: https://cloud.google.com/recommender/docs/recommenders.
   */
  async organizationsLocationsRecommendersRecommendationsList(parent: string, opts: OrganizationsLocationsRecommendersRecommendationsListOptions = {}): Promise<GoogleCloudRecommenderV1ListRecommendationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/recommendations`);
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
    return deserializeGoogleCloudRecommenderV1ListRecommendationsResponse(data);
  }

  /**
   * Marks the Recommendation State as Claimed. Users can use this method to
   * indicate to the Recommender API that they are starting to apply the
   * recommendation themselves. This stops the recommendation content from being
   * updated. Associated insights are frozen and placed in the ACCEPTED state.
   * MarkRecommendationClaimed can be applied to recommendations in CLAIMED,
   * SUCCEEDED, FAILED, or ACTIVE state. Requires the recommender.*.update IAM
   * permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async organizationsLocationsRecommendersRecommendationsMarkClaimed(name: string, req: GoogleCloudRecommenderV1MarkRecommendationClaimedRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markClaimed`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Mark the Recommendation State as Dismissed. Users can use this method to
   * indicate to the Recommender API that an ACTIVE recommendation has to be
   * marked back as DISMISSED. MarkRecommendationDismissed can be applied to
   * recommendations in ACTIVE state. Requires the recommender.*.update IAM
   * permission for the specified recommender.
   *
   * @param name Name of the recommendation.
   */
  async organizationsLocationsRecommendersRecommendationsMarkDismissed(name: string, req: GoogleCloudRecommenderV1MarkRecommendationDismissedRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markDismissed`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Marks the Recommendation State as Failed. Users can use this method to
   * indicate to the Recommender API that they have applied the recommendation
   * themselves, and the operation failed. This stops the recommendation content
   * from being updated. Associated insights are frozen and placed in the
   * ACCEPTED state. MarkRecommendationFailed can be applied to recommendations
   * in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the
   * recommender.*.update IAM permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async organizationsLocationsRecommendersRecommendationsMarkFailed(name: string, req: GoogleCloudRecommenderV1MarkRecommendationFailedRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markFailed`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Marks the Recommendation State as Succeeded. Users can use this method to
   * indicate to the Recommender API that they have applied the recommendation
   * themselves, and the operation was successful. This stops the recommendation
   * content from being updated. Associated insights are frozen and placed in
   * the ACCEPTED state. MarkRecommendationSucceeded can be applied to
   * recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires
   * the recommender.*.update IAM permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async organizationsLocationsRecommendersRecommendationsMarkSucceeded(name: string, req: GoogleCloudRecommenderV1MarkRecommendationSucceededRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markSucceeded`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Updates a Recommender Config. This will create a new revision of the
   * config.
   *
   * @param name Name of recommender config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config
   */
  async organizationsLocationsRecommendersUpdateConfig(name: string, req: GoogleCloudRecommenderV1RecommenderConfig, opts: OrganizationsLocationsRecommendersUpdateConfigOptions = {}): Promise<GoogleCloudRecommenderV1RecommenderConfig> {
    req = serializeGoogleCloudRecommenderV1RecommenderConfig(req);
    opts = serializeOrganizationsLocationsRecommendersUpdateConfigOptions(opts);
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
    return deserializeGoogleCloudRecommenderV1RecommenderConfig(data);
  }

  /**
   * Gets the requested InsightTypeConfig. There is only one instance of the
   * config for each InsightType.
   *
   * @param name Required. Name of the InsightTypeConfig to get. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config`
   */
  async projectsLocationsInsightTypesGetConfig(name: string): Promise<GoogleCloudRecommenderV1InsightTypeConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1InsightTypeConfig(data);
  }

  /**
   * Gets the requested insight. Requires the recommender.*.get IAM permission
   * for the specified insight type.
   *
   * @param name Required. Name of the insight.
   */
  async projectsLocationsInsightTypesInsightsGet(name: string): Promise<GoogleCloudRecommenderV1Insight> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1Insight(data);
  }

  /**
   * Lists insights for the specified Cloud Resource. Requires the
   * recommender.*.list IAM permission for the specified insight type.
   *
   * @param parent Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ INSIGHT_TYPE_ID refers to supported insight types: https://cloud.google.com/recommender/docs/insights/insight-types.
   */
  async projectsLocationsInsightTypesInsightsList(parent: string, opts: ProjectsLocationsInsightTypesInsightsListOptions = {}): Promise<GoogleCloudRecommenderV1ListInsightsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/insights`);
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
    return deserializeGoogleCloudRecommenderV1ListInsightsResponse(data);
  }

  /**
   * Marks the Insight State as Accepted. Users can use this method to indicate
   * to the Recommender API that they have applied some action based on the
   * insight. This stops the insight content from being updated.
   * MarkInsightAccepted can be applied to insights in ACTIVE state. Requires
   * the recommender.*.update IAM permission for the specified insight.
   *
   * @param name Required. Name of the insight.
   */
  async projectsLocationsInsightTypesInsightsMarkAccepted(name: string, req: GoogleCloudRecommenderV1MarkInsightAcceptedRequest): Promise<GoogleCloudRecommenderV1Insight> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markAccepted`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Insight(data);
  }

  /**
   * Updates an InsightTypeConfig change. This will create a new revision of
   * the config.
   *
   * @param name Name of insight type config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config
   */
  async projectsLocationsInsightTypesUpdateConfig(name: string, req: GoogleCloudRecommenderV1InsightTypeConfig, opts: ProjectsLocationsInsightTypesUpdateConfigOptions = {}): Promise<GoogleCloudRecommenderV1InsightTypeConfig> {
    req = serializeGoogleCloudRecommenderV1InsightTypeConfig(req);
    opts = serializeProjectsLocationsInsightTypesUpdateConfigOptions(opts);
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
    return deserializeGoogleCloudRecommenderV1InsightTypeConfig(data);
  }

  /**
   * Gets the requested Recommender Config. There is only one instance of the
   * config for each Recommender.
   *
   * @param name Required. Name of the Recommendation Config to get. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config`
   */
  async projectsLocationsRecommendersGetConfig(name: string): Promise<GoogleCloudRecommenderV1RecommenderConfig> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1RecommenderConfig(data);
  }

  /**
   * Gets the requested recommendation. Requires the recommender.*.get IAM
   * permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async projectsLocationsRecommendersRecommendationsGet(name: string): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Lists recommendations for the specified Cloud Resource. Requires the
   * recommender.*.list IAM permission for the specified recommender.
   *
   * @param parent Required. The container resource on which to execute the request. Acceptable formats: * `projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `projects/[PROJECT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `folders/[FOLDER_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` * `organizations/[ORGANIZATION_ID]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]` LOCATION here refers to GCP Locations: https://cloud.google.com/about/locations/ RECOMMENDER_ID refers to supported recommenders: https://cloud.google.com/recommender/docs/recommenders.
   */
  async projectsLocationsRecommendersRecommendationsList(parent: string, opts: ProjectsLocationsRecommendersRecommendationsListOptions = {}): Promise<GoogleCloudRecommenderV1ListRecommendationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/recommendations`);
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
    return deserializeGoogleCloudRecommenderV1ListRecommendationsResponse(data);
  }

  /**
   * Marks the Recommendation State as Claimed. Users can use this method to
   * indicate to the Recommender API that they are starting to apply the
   * recommendation themselves. This stops the recommendation content from being
   * updated. Associated insights are frozen and placed in the ACCEPTED state.
   * MarkRecommendationClaimed can be applied to recommendations in CLAIMED,
   * SUCCEEDED, FAILED, or ACTIVE state. Requires the recommender.*.update IAM
   * permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async projectsLocationsRecommendersRecommendationsMarkClaimed(name: string, req: GoogleCloudRecommenderV1MarkRecommendationClaimedRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markClaimed`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Mark the Recommendation State as Dismissed. Users can use this method to
   * indicate to the Recommender API that an ACTIVE recommendation has to be
   * marked back as DISMISSED. MarkRecommendationDismissed can be applied to
   * recommendations in ACTIVE state. Requires the recommender.*.update IAM
   * permission for the specified recommender.
   *
   * @param name Name of the recommendation.
   */
  async projectsLocationsRecommendersRecommendationsMarkDismissed(name: string, req: GoogleCloudRecommenderV1MarkRecommendationDismissedRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markDismissed`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Marks the Recommendation State as Failed. Users can use this method to
   * indicate to the Recommender API that they have applied the recommendation
   * themselves, and the operation failed. This stops the recommendation content
   * from being updated. Associated insights are frozen and placed in the
   * ACCEPTED state. MarkRecommendationFailed can be applied to recommendations
   * in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires the
   * recommender.*.update IAM permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async projectsLocationsRecommendersRecommendationsMarkFailed(name: string, req: GoogleCloudRecommenderV1MarkRecommendationFailedRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markFailed`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Marks the Recommendation State as Succeeded. Users can use this method to
   * indicate to the Recommender API that they have applied the recommendation
   * themselves, and the operation was successful. This stops the recommendation
   * content from being updated. Associated insights are frozen and placed in
   * the ACCEPTED state. MarkRecommendationSucceeded can be applied to
   * recommendations in ACTIVE, CLAIMED, SUCCEEDED, or FAILED state. Requires
   * the recommender.*.update IAM permission for the specified recommender.
   *
   * @param name Required. Name of the recommendation.
   */
  async projectsLocationsRecommendersRecommendationsMarkSucceeded(name: string, req: GoogleCloudRecommenderV1MarkRecommendationSucceededRequest): Promise<GoogleCloudRecommenderV1Recommendation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:markSucceeded`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudRecommenderV1Recommendation(data);
  }

  /**
   * Updates a Recommender Config. This will create a new revision of the
   * config.
   *
   * @param name Name of recommender config. Eg, projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config
   */
  async projectsLocationsRecommendersUpdateConfig(name: string, req: GoogleCloudRecommenderV1RecommenderConfig, opts: ProjectsLocationsRecommendersUpdateConfigOptions = {}): Promise<GoogleCloudRecommenderV1RecommenderConfig> {
    req = serializeGoogleCloudRecommenderV1RecommenderConfig(req);
    opts = serializeProjectsLocationsRecommendersUpdateConfigOptions(opts);
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
    return deserializeGoogleCloudRecommenderV1RecommenderConfig(data);
  }
}

/**
 * Additional options for
 * Recommender#billingAccountsLocationsInsightTypesInsightsList.
 */
export interface BillingAccountsLocationsInsightTypesInsightsListOptions {
  /**
   * Optional. Filter expression to restrict the insights returned. Supported
   * filter fields: * `stateInfo.state` * `insightSubtype` * `severity`
   * Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` *
   * `insightSubtype = PERMISSIONS_USAGE` * `severity = CRITICAL OR severity =
   * HIGH` * `stateInfo.state = ACTIVE AND (severity = CRITICAL OR severity =
   * HIGH)` (These expressions are based on the filter language described at
   * https://google.aip.dev/160)
   */
  filter?: string;
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. If not specified, the server will
   * determine the number of results to return.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters must be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Recommender#billingAccountsLocationsInsightTypesUpdateConfig.
 */
export interface BillingAccountsLocationsInsightTypesUpdateConfigOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
  /**
   * If true, validate the request and preview the change, but do not actually
   * update it.
   */
  validateOnly?: boolean;
}

function serializeBillingAccountsLocationsInsightTypesUpdateConfigOptions(data: any): BillingAccountsLocationsInsightTypesUpdateConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBillingAccountsLocationsInsightTypesUpdateConfigOptions(data: any): BillingAccountsLocationsInsightTypesUpdateConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Recommender#billingAccountsLocationsRecommendersRecommendationsList.
 */
export interface BillingAccountsLocationsRecommendersRecommendationsListOptions {
  /**
   * Filter expression to restrict the recommendations returned. Supported
   * filter fields: * `state_info.state` * `recommenderSubtype` * `priority`
   * Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` *
   * `recommenderSubtype = REMOVE_ROLE OR recommenderSubtype = REPLACE_ROLE` *
   * `priority = P1 OR priority = P2` * `stateInfo.state = ACTIVE AND (priority
   * = P1 OR priority = P2)` (These expressions are based on the filter language
   * described at https://google.aip.dev/160)
   */
  filter?: string;
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. If not specified, the server will
   * determine the number of results to return.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters must be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Recommender#billingAccountsLocationsRecommendersUpdateConfig.
 */
export interface BillingAccountsLocationsRecommendersUpdateConfigOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
  /**
   * If true, validate the request and preview the change, but do not actually
   * update it.
   */
  validateOnly?: boolean;
}

function serializeBillingAccountsLocationsRecommendersUpdateConfigOptions(data: any): BillingAccountsLocationsRecommendersUpdateConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeBillingAccountsLocationsRecommendersUpdateConfigOptions(data: any): BillingAccountsLocationsRecommendersUpdateConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Recommender#foldersLocationsInsightTypesInsightsList.
 */
export interface FoldersLocationsInsightTypesInsightsListOptions {
  /**
   * Optional. Filter expression to restrict the insights returned. Supported
   * filter fields: * `stateInfo.state` * `insightSubtype` * `severity`
   * Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` *
   * `insightSubtype = PERMISSIONS_USAGE` * `severity = CRITICAL OR severity =
   * HIGH` * `stateInfo.state = ACTIVE AND (severity = CRITICAL OR severity =
   * HIGH)` (These expressions are based on the filter language described at
   * https://google.aip.dev/160)
   */
  filter?: string;
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. If not specified, the server will
   * determine the number of results to return.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters must be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Recommender#foldersLocationsRecommendersRecommendationsList.
 */
export interface FoldersLocationsRecommendersRecommendationsListOptions {
  /**
   * Filter expression to restrict the recommendations returned. Supported
   * filter fields: * `state_info.state` * `recommenderSubtype` * `priority`
   * Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` *
   * `recommenderSubtype = REMOVE_ROLE OR recommenderSubtype = REPLACE_ROLE` *
   * `priority = P1 OR priority = P2` * `stateInfo.state = ACTIVE AND (priority
   * = P1 OR priority = P2)` (These expressions are based on the filter language
   * described at https://google.aip.dev/160)
   */
  filter?: string;
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. If not specified, the server will
   * determine the number of results to return.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters must be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Contains metadata about how much money a recommendation can save or incur.
 */
export interface GoogleCloudRecommenderV1CostProjection {
  /**
   * An approximate projection on amount saved or amount incurred. Negative
   * cost units indicate cost savings and positive cost units indicate increase.
   * See google.type.Money documentation for positive/negative units. A user's
   * permissions may affect whether the cost is computed using list prices or
   * custom contract prices.
   */
  cost?: GoogleTypeMoney;
  /**
   * Duration for which this cost applies.
   */
  duration?: number /* Duration */;
}

function serializeGoogleCloudRecommenderV1CostProjection(data: any): GoogleCloudRecommenderV1CostProjection {
  return {
    ...data,
    cost: data["cost"] !== undefined ? serializeGoogleTypeMoney(data["cost"]) : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeGoogleCloudRecommenderV1CostProjection(data: any): GoogleCloudRecommenderV1CostProjection {
  return {
    ...data,
    cost: data["cost"] !== undefined ? deserializeGoogleTypeMoney(data["cost"]) : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

/**
 * Contains the impact a recommendation can have for a given category.
 */
export interface GoogleCloudRecommenderV1Impact {
  /**
   * Category that is being targeted.
   */
  category?:  | "CATEGORY_UNSPECIFIED" | "COST" | "SECURITY" | "PERFORMANCE" | "MANAGEABILITY" | "SUSTAINABILITY" | "RELIABILITY";
  /**
   * Use with CategoryType.COST
   */
  costProjection?: GoogleCloudRecommenderV1CostProjection;
  /**
   * Use with CategoryType.RELAIBILITY
   */
  reliabilityProjection?: GoogleCloudRecommenderV1ReliabilityProjection;
  /**
   * Use with CategoryType.SECURITY
   */
  securityProjection?: GoogleCloudRecommenderV1SecurityProjection;
  /**
   * Use with CategoryType.SUSTAINABILITY
   */
  sustainabilityProjection?: GoogleCloudRecommenderV1SustainabilityProjection;
}

function serializeGoogleCloudRecommenderV1Impact(data: any): GoogleCloudRecommenderV1Impact {
  return {
    ...data,
    costProjection: data["costProjection"] !== undefined ? serializeGoogleCloudRecommenderV1CostProjection(data["costProjection"]) : undefined,
    sustainabilityProjection: data["sustainabilityProjection"] !== undefined ? serializeGoogleCloudRecommenderV1SustainabilityProjection(data["sustainabilityProjection"]) : undefined,
  };
}

function deserializeGoogleCloudRecommenderV1Impact(data: any): GoogleCloudRecommenderV1Impact {
  return {
    ...data,
    costProjection: data["costProjection"] !== undefined ? deserializeGoogleCloudRecommenderV1CostProjection(data["costProjection"]) : undefined,
    sustainabilityProjection: data["sustainabilityProjection"] !== undefined ? deserializeGoogleCloudRecommenderV1SustainabilityProjection(data["sustainabilityProjection"]) : undefined,
  };
}

/**
 * An insight along with the information used to derive the insight. The
 * insight may have associated recommendations as well.
 */
export interface GoogleCloudRecommenderV1Insight {
  /**
   * Recommendations derived from this insight.
   */
  associatedRecommendations?: GoogleCloudRecommenderV1InsightRecommendationReference[];
  /**
   * Category being targeted by the insight.
   */
  category?:  | "CATEGORY_UNSPECIFIED" | "COST" | "SECURITY" | "PERFORMANCE" | "MANAGEABILITY" | "SUSTAINABILITY" | "RELIABILITY";
  /**
   * A struct of custom fields to explain the insight. Example:
   * "grantedPermissionsCount": "1000"
   */
  content?: {
    [key: string]: any
  };
  /**
   * Free-form human readable summary in English. The maximum length is 500
   * characters.
   */
  description?: string;
  /**
   * Fingerprint of the Insight. Provides optimistic locking when updating
   * states.
   */
  etag?: string;
  /**
   * Insight subtype. Insight content schema will be stable for a given
   * subtype.
   */
  insightSubtype?: string;
  /**
   * Timestamp of the latest data used to generate the insight.
   */
  lastRefreshTime?: Date;
  /**
   * Name of the insight.
   */
  name?: string;
  /**
   * Observation period that led to the insight. The source data used to
   * generate the insight ends at last_refresh_time and begins at
   * (last_refresh_time - observation_period).
   */
  observationPeriod?: number /* Duration */;
  /**
   * Insight's severity.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  /**
   * Information state and metadata.
   */
  stateInfo?: GoogleCloudRecommenderV1InsightStateInfo;
  /**
   * Fully qualified resource names that this insight is targeting.
   */
  targetResources?: string[];
}

function serializeGoogleCloudRecommenderV1Insight(data: any): GoogleCloudRecommenderV1Insight {
  return {
    ...data,
    lastRefreshTime: data["lastRefreshTime"] !== undefined ? data["lastRefreshTime"].toISOString() : undefined,
    observationPeriod: data["observationPeriod"] !== undefined ? data["observationPeriod"] : undefined,
  };
}

function deserializeGoogleCloudRecommenderV1Insight(data: any): GoogleCloudRecommenderV1Insight {
  return {
    ...data,
    lastRefreshTime: data["lastRefreshTime"] !== undefined ? new Date(data["lastRefreshTime"]) : undefined,
    observationPeriod: data["observationPeriod"] !== undefined ? data["observationPeriod"] : undefined,
  };
}

/**
 * Reference to an associated recommendation.
 */
export interface GoogleCloudRecommenderV1InsightRecommendationReference {
  /**
   * Recommendation resource name, e.g.
   * projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/recommendations/[RECOMMENDATION_ID]
   */
  recommendation?: string;
}

/**
 * Information related to insight state.
 */
export interface GoogleCloudRecommenderV1InsightStateInfo {
  /**
   * Insight state.
   */
  state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "ACCEPTED" | "DISMISSED";
  /**
   * A map of metadata for the state, provided by user or automations systems.
   */
  stateMetadata?: {
    [key: string]: string
  };
}

/**
 * Configuration for an InsightType.
 */
export interface GoogleCloudRecommenderV1InsightTypeConfig {
  /**
   * Allows clients to store small amounts of arbitrary data. Annotations must
   * follow the Kubernetes syntax. The total size of all keys and values
   * combined is limited to 256k. Key can have 2 segments: prefix (optional) and
   * name (required), separated by a slash (/). Prefix must be a DNS subdomain.
   * Name must be 63 characters or less, begin and end with alphanumerics, with
   * dashes (-), underscores (_), dots (.), and alphanumerics between.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * A user-settable field to provide a human-readable name to be used in user
   * interfaces.
   */
  displayName?: string;
  /**
   * Fingerprint of the InsightTypeConfig. Provides optimistic locking when
   * updating.
   */
  etag?: string;
  /**
   * InsightTypeGenerationConfig which configures the generation of insights
   * for this insight type.
   */
  insightTypeGenerationConfig?: GoogleCloudRecommenderV1InsightTypeGenerationConfig;
  /**
   * Name of insight type config. Eg,
   * projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/config
   */
  name?: string;
  /**
   * Output only. Immutable. The revision ID of the config. A new revision is
   * committed whenever the config is changed in any way. The format is an
   * 8-character hexadecimal string.
   */
  readonly revisionId?: string;
  /**
   * Last time when the config was updated.
   */
  updateTime?: Date;
}

function serializeGoogleCloudRecommenderV1InsightTypeConfig(data: any): GoogleCloudRecommenderV1InsightTypeConfig {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRecommenderV1InsightTypeConfig(data: any): GoogleCloudRecommenderV1InsightTypeConfig {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A configuration to customize the generation of insights. Eg, customizing the
 * lookback period considered when generating a insight.
 */
export interface GoogleCloudRecommenderV1InsightTypeGenerationConfig {
  /**
   * Parameters for this InsightTypeGenerationConfig. These configs can be used
   * by or are applied to all subtypes.
   */
  params?: {
    [key: string]: any
  };
}

/**
 * Response to the `ListInsights` method.
 */
export interface GoogleCloudRecommenderV1ListInsightsResponse {
  /**
   * The set of insights for the `parent` resource.
   */
  insights?: GoogleCloudRecommenderV1Insight[];
  /**
   * A token that can be used to request the next page of results. This field
   * is empty if there are no additional results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudRecommenderV1ListInsightsResponse(data: any): GoogleCloudRecommenderV1ListInsightsResponse {
  return {
    ...data,
    insights: data["insights"] !== undefined ? data["insights"].map((item: any) => (serializeGoogleCloudRecommenderV1Insight(item))) : undefined,
  };
}

function deserializeGoogleCloudRecommenderV1ListInsightsResponse(data: any): GoogleCloudRecommenderV1ListInsightsResponse {
  return {
    ...data,
    insights: data["insights"] !== undefined ? data["insights"].map((item: any) => (deserializeGoogleCloudRecommenderV1Insight(item))) : undefined,
  };
}

/**
 * Response to the `ListRecommendations` method.
 */
export interface GoogleCloudRecommenderV1ListRecommendationsResponse {
  /**
   * A token that can be used to request the next page of results. This field
   * is empty if there are no additional results.
   */
  nextPageToken?: string;
  /**
   * The set of recommendations for the `parent` resource.
   */
  recommendations?: GoogleCloudRecommenderV1Recommendation[];
}

function serializeGoogleCloudRecommenderV1ListRecommendationsResponse(data: any): GoogleCloudRecommenderV1ListRecommendationsResponse {
  return {
    ...data,
    recommendations: data["recommendations"] !== undefined ? data["recommendations"].map((item: any) => (serializeGoogleCloudRecommenderV1Recommendation(item))) : undefined,
  };
}

function deserializeGoogleCloudRecommenderV1ListRecommendationsResponse(data: any): GoogleCloudRecommenderV1ListRecommendationsResponse {
  return {
    ...data,
    recommendations: data["recommendations"] !== undefined ? data["recommendations"].map((item: any) => (deserializeGoogleCloudRecommenderV1Recommendation(item))) : undefined,
  };
}

/**
 * Request for the `MarkInsightAccepted` method.
 */
export interface GoogleCloudRecommenderV1MarkInsightAcceptedRequest {
  /**
   * Required. Fingerprint of the Insight. Provides optimistic locking.
   */
  etag?: string;
  /**
   * Optional. State properties user wish to include with this state. Full
   * replace of the current state_metadata.
   */
  stateMetadata?: {
    [key: string]: string
  };
}

/**
 * Request for the `MarkRecommendationClaimed` Method.
 */
export interface GoogleCloudRecommenderV1MarkRecommendationClaimedRequest {
  /**
   * Required. Fingerprint of the Recommendation. Provides optimistic locking.
   */
  etag?: string;
  /**
   * State properties to include with this state. Overwrites any existing
   * `state_metadata`. Keys must match the regex `/^a-z0-9{0,62}$/`. Values must
   * match the regex `/^[a-zA-Z0-9_./-]{0,255}$/`.
   */
  stateMetadata?: {
    [key: string]: string
  };
}

/**
 * Request for the `MarkRecommendationDismissed` Method.
 */
export interface GoogleCloudRecommenderV1MarkRecommendationDismissedRequest {
  /**
   * Fingerprint of the Recommendation. Provides optimistic locking.
   */
  etag?: string;
}

/**
 * Request for the `MarkRecommendationFailed` Method.
 */
export interface GoogleCloudRecommenderV1MarkRecommendationFailedRequest {
  /**
   * Required. Fingerprint of the Recommendation. Provides optimistic locking.
   */
  etag?: string;
  /**
   * State properties to include with this state. Overwrites any existing
   * `state_metadata`. Keys must match the regex `/^a-z0-9{0,62}$/`. Values must
   * match the regex `/^[a-zA-Z0-9_./-]{0,255}$/`.
   */
  stateMetadata?: {
    [key: string]: string
  };
}

/**
 * Request for the `MarkRecommendationSucceeded` Method.
 */
export interface GoogleCloudRecommenderV1MarkRecommendationSucceededRequest {
  /**
   * Required. Fingerprint of the Recommendation. Provides optimistic locking.
   */
  etag?: string;
  /**
   * State properties to include with this state. Overwrites any existing
   * `state_metadata`. Keys must match the regex `/^a-z0-9{0,62}$/`. Values must
   * match the regex `/^[a-zA-Z0-9_./-]{0,255}$/`.
   */
  stateMetadata?: {
    [key: string]: string
  };
}

/**
 * Contains an operation for a resource loosely based on the JSON-PATCH format
 * with support for: * Custom filters for describing partial array patch. *
 * Extended path values for describing nested arrays. * Custom fields for
 * describing the resource for which the operation is being described. * Allows
 * extension to custom operations not natively supported by RFC6902. See
 * https://tools.ietf.org/html/rfc6902 for details on the original RFC.
 */
export interface GoogleCloudRecommenderV1Operation {
  /**
   * Type of this operation. Contains one of 'add', 'remove', 'replace',
   * 'move', 'copy', 'test' and custom operations. This field is
   * case-insensitive and always populated.
   */
  action?: string;
  /**
   * Path to the target field being operated on. If the operation is at the
   * resource level, then path should be "/". This field is always populated.
   */
  path?: string;
  /**
   * Set of filters to apply if `path` refers to array elements or nested array
   * elements in order to narrow down to a single unique element that is being
   * tested/modified. This is intended to be an exact match per filter. To
   * perform advanced matching, use path_value_matchers. * Example: ``` {
   * "/versions/*\/name" : "it-123" "/versions/*\/targetSize/percent": 20 } ```
   * * Example: ``` { "/bindings/*\/role": "roles/owner"
   * "/bindings/*\/condition" : null } ``` * Example: ``` { "/bindings/*\/role":
   * "roles/owner" "/bindings/*\/members/*" : ["x@example.com", "y@example.com"]
   * } ``` When both path_filters and path_value_matchers are set, an implicit
   * AND must be performed.
   */
  pathFilters?: {
    [key: string]: any
  };
  /**
   * Similar to path_filters, this contains set of filters to apply if `path`
   * field refers to array elements. This is meant to support value matching
   * beyond exact match. To perform exact match, use path_filters. When both
   * path_filters and path_value_matchers are set, an implicit AND must be
   * performed.
   */
  pathValueMatchers?: {
    [key: string]: GoogleCloudRecommenderV1ValueMatcher
  };
  /**
   * Contains the fully qualified resource name. This field is always
   * populated. ex: //cloudresourcemanager.googleapis.com/projects/foo.
   */
  resource?: string;
  /**
   * Type of GCP resource being modified/tested. This field is always
   * populated. Example: cloudresourcemanager.googleapis.com/Project,
   * compute.googleapis.com/Instance
   */
  resourceType?: string;
  /**
   * Can be set with action 'copy' or 'move' to indicate the source field
   * within resource or source_resource, ignored if provided for other operation
   * types.
   */
  sourcePath?: string;
  /**
   * Can be set with action 'copy' to copy resource configuration across
   * different resources of the same type. Example: A resource clone can be done
   * via action = 'copy', path = "/", from = "/", source_resource = and
   * resource_name = . This field is empty for all other values of `action`.
   */
  sourceResource?: string;
  /**
   * Value for the `path` field. Will be set for actions:'add'/'replace'. Maybe
   * set for action: 'test'. Either this or `value_matcher` will be set for
   * 'test' operation. An exact match must be performed.
   */
  value?: any;
  /**
   * Can be set for action 'test' for advanced matching for the value of 'path'
   * field. Either this or `value` will be set for 'test' operation.
   */
  valueMatcher?: GoogleCloudRecommenderV1ValueMatcher;
}

/**
 * Group of operations that need to be performed atomically.
 */
export interface GoogleCloudRecommenderV1OperationGroup {
  /**
   * List of operations across one or more resources that belong to this group.
   * Loosely based on RFC6902 and should be performed in the order they appear.
   */
  operations?: GoogleCloudRecommenderV1Operation[];
}

/**
 * A recommendation along with a suggested action. E.g., a rightsizing
 * recommendation for an underutilized VM, IAM role recommendations, etc
 */
export interface GoogleCloudRecommenderV1Recommendation {
  /**
   * Optional set of additional impact that this recommendation may have when
   * trying to optimize for the primary category. These may be positive or
   * negative.
   */
  additionalImpact?: GoogleCloudRecommenderV1Impact[];
  /**
   * Insights that led to this recommendation.
   */
  associatedInsights?: GoogleCloudRecommenderV1RecommendationInsightReference[];
  /**
   * Content of the recommendation describing recommended changes to resources.
   */
  content?: GoogleCloudRecommenderV1RecommendationContent;
  /**
   * Free-form human readable summary in English. The maximum length is 500
   * characters.
   */
  description?: string;
  /**
   * Fingerprint of the Recommendation. Provides optimistic locking when
   * updating states.
   */
  etag?: string;
  /**
   * Last time this recommendation was refreshed by the system that created it
   * in the first place.
   */
  lastRefreshTime?: Date;
  /**
   * Name of recommendation.
   */
  name?: string;
  /**
   * The primary impact that this recommendation can have while trying to
   * optimize for one category.
   */
  primaryImpact?: GoogleCloudRecommenderV1Impact;
  /**
   * Recommendation's priority.
   */
  priority?:  | "PRIORITY_UNSPECIFIED" | "P4" | "P3" | "P2" | "P1";
  /**
   * Contains an identifier for a subtype of recommendations produced for the
   * same recommender. Subtype is a function of content and impact, meaning a
   * new subtype might be added when significant changes to `content` or
   * `primary_impact.category` are introduced. See the Recommenders section to
   * see a list of subtypes for a given Recommender. Examples: For recommender =
   * "google.iam.policy.Recommender", recommender_subtype can be one of
   * "REMOVE_ROLE"/"REPLACE_ROLE"
   */
  recommenderSubtype?: string;
  /**
   * Information for state. Contains state and metadata.
   */
  stateInfo?: GoogleCloudRecommenderV1RecommendationStateInfo;
  /**
   * Corresponds to a mutually exclusive group ID within a recommender. A
   * non-empty ID indicates that the recommendation belongs to a mutually
   * exclusive group. This means that only one recommendation within the group
   * is suggested to be applied.
   */
  xorGroupId?: string;
}

function serializeGoogleCloudRecommenderV1Recommendation(data: any): GoogleCloudRecommenderV1Recommendation {
  return {
    ...data,
    additionalImpact: data["additionalImpact"] !== undefined ? data["additionalImpact"].map((item: any) => (serializeGoogleCloudRecommenderV1Impact(item))) : undefined,
    lastRefreshTime: data["lastRefreshTime"] !== undefined ? data["lastRefreshTime"].toISOString() : undefined,
    primaryImpact: data["primaryImpact"] !== undefined ? serializeGoogleCloudRecommenderV1Impact(data["primaryImpact"]) : undefined,
  };
}

function deserializeGoogleCloudRecommenderV1Recommendation(data: any): GoogleCloudRecommenderV1Recommendation {
  return {
    ...data,
    additionalImpact: data["additionalImpact"] !== undefined ? data["additionalImpact"].map((item: any) => (deserializeGoogleCloudRecommenderV1Impact(item))) : undefined,
    lastRefreshTime: data["lastRefreshTime"] !== undefined ? new Date(data["lastRefreshTime"]) : undefined,
    primaryImpact: data["primaryImpact"] !== undefined ? deserializeGoogleCloudRecommenderV1Impact(data["primaryImpact"]) : undefined,
  };
}

/**
 * Contains what resources are changing and how they are changing.
 */
export interface GoogleCloudRecommenderV1RecommendationContent {
  /**
   * Operations to one or more Google Cloud resources grouped in such a way
   * that, all operations within one group are expected to be performed
   * atomically and in an order.
   */
  operationGroups?: GoogleCloudRecommenderV1OperationGroup[];
  /**
   * Condensed overview information about the recommendation.
   */
  overview?: {
    [key: string]: any
  };
}

/**
 * Reference to an associated insight.
 */
export interface GoogleCloudRecommenderV1RecommendationInsightReference {
  /**
   * Insight resource name, e.g.
   * projects/[PROJECT_NUMBER]/locations/[LOCATION]/insightTypes/[INSIGHT_TYPE_ID]/insights/[INSIGHT_ID]
   */
  insight?: string;
}

/**
 * Information for state. Contains state and metadata.
 */
export interface GoogleCloudRecommenderV1RecommendationStateInfo {
  /**
   * The state of the recommendation, Eg ACTIVE, SUCCEEDED, FAILED.
   */
  state?:  | "STATE_UNSPECIFIED" | "ACTIVE" | "CLAIMED" | "SUCCEEDED" | "FAILED" | "DISMISSED";
  /**
   * A map of metadata for the state, provided by user or automations systems.
   */
  stateMetadata?: {
    [key: string]: string
  };
}

/**
 * Configuration for a Recommender.
 */
export interface GoogleCloudRecommenderV1RecommenderConfig {
  /**
   * Allows clients to store small amounts of arbitrary data. Annotations must
   * follow the Kubernetes syntax. The total size of all keys and values
   * combined is limited to 256k. Key can have 2 segments: prefix (optional) and
   * name (required), separated by a slash (/). Prefix must be a DNS subdomain.
   * Name must be 63 characters or less, begin and end with alphanumerics, with
   * dashes (-), underscores (_), dots (.), and alphanumerics between.
   */
  annotations?: {
    [key: string]: string
  };
  /**
   * A user-settable field to provide a human-readable name to be used in user
   * interfaces.
   */
  displayName?: string;
  /**
   * Fingerprint of the RecommenderConfig. Provides optimistic locking when
   * updating.
   */
  etag?: string;
  /**
   * Name of recommender config. Eg,
   * projects/[PROJECT_NUMBER]/locations/[LOCATION]/recommenders/[RECOMMENDER_ID]/config
   */
  name?: string;
  /**
   * RecommenderGenerationConfig which configures the Generation of
   * recommendations for this recommender.
   */
  recommenderGenerationConfig?: GoogleCloudRecommenderV1RecommenderGenerationConfig;
  /**
   * Output only. Immutable. The revision ID of the config. A new revision is
   * committed whenever the config is changed in any way. The format is an
   * 8-character hexadecimal string.
   */
  readonly revisionId?: string;
  /**
   * Last time when the config was updated.
   */
  updateTime?: Date;
}

function serializeGoogleCloudRecommenderV1RecommenderConfig(data: any): GoogleCloudRecommenderV1RecommenderConfig {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudRecommenderV1RecommenderConfig(data: any): GoogleCloudRecommenderV1RecommenderConfig {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A Configuration to customize the generation of recommendations. Eg,
 * customizing the lookback period considered when generating a recommendation.
 */
export interface GoogleCloudRecommenderV1RecommenderGenerationConfig {
  /**
   * Parameters for this RecommenderGenerationConfig. These configs can be used
   * by or are applied to all subtypes.
   */
  params?: {
    [key: string]: any
  };
}

/**
 * Contains information on the impact of a reliability recommendation.
 */
export interface GoogleCloudRecommenderV1ReliabilityProjection {
  /**
   * Per-recommender projection.
   */
  details?: {
    [key: string]: any
  };
  /**
   * Reliability risks mitigated by this recommendation.
   */
  risks?:  | "RISK_TYPE_UNSPECIFIED" | "SERVICE_DISRUPTION" | "DATA_LOSS" | "ACCESS_DENY"[];
}

/**
 * Contains various ways of describing the impact on Security.
 */
export interface GoogleCloudRecommenderV1SecurityProjection {
  /**
   * Additional security impact details that is provided by the recommender.
   */
  details?: {
    [key: string]: any
  };
}

/**
 * Contains metadata about how much sustainability a recommendation can save or
 * incur.
 */
export interface GoogleCloudRecommenderV1SustainabilityProjection {
  /**
   * Duration for which this sustainability applies.
   */
  duration?: number /* Duration */;
  /**
   * Carbon Footprint generated in kg of CO2 equivalent. Chose kg_c_o2e so that
   * the name renders correctly in camelCase (kgCO2e).
   */
  kgCO2e?: number;
}

function serializeGoogleCloudRecommenderV1SustainabilityProjection(data: any): GoogleCloudRecommenderV1SustainabilityProjection {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

function deserializeGoogleCloudRecommenderV1SustainabilityProjection(data: any): GoogleCloudRecommenderV1SustainabilityProjection {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
  };
}

/**
 * Contains various matching options for values for a GCP resource field.
 */
export interface GoogleCloudRecommenderV1ValueMatcher {
  /**
   * To be used for full regex matching. The regular expression is using the
   * Google RE2 syntax (https://github.com/google/re2/wiki/Syntax), so to be
   * used with RE2::FullMatch
   */
  matchesPattern?: string;
}

/**
 * Represents an amount of money with its currency type.
 */
export interface GoogleTypeMoney {
  /**
   * The three-letter currency code defined in ISO 4217.
   */
  currencyCode?: string;
  /**
   * Number of nano (10^-9) units of the amount. The value must be between
   * -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos`
   * must be positive or zero. If `units` is zero, `nanos` can be positive,
   * zero, or negative. If `units` is negative, `nanos` must be negative or
   * zero. For example $-1.75 is represented as `units`=-1 and
   * `nanos`=-750,000,000.
   */
  nanos?: number;
  /**
   * The whole units of the amount. For example if `currencyCode` is `"USD"`,
   * then 1 unit is one US dollar.
   */
  units?: bigint;
}

function serializeGoogleTypeMoney(data: any): GoogleTypeMoney {
  return {
    ...data,
    units: data["units"] !== undefined ? String(data["units"]) : undefined,
  };
}

function deserializeGoogleTypeMoney(data: any): GoogleTypeMoney {
  return {
    ...data,
    units: data["units"] !== undefined ? BigInt(data["units"]) : undefined,
  };
}

/**
 * Additional options for
 * Recommender#organizationsLocationsInsightTypesInsightsList.
 */
export interface OrganizationsLocationsInsightTypesInsightsListOptions {
  /**
   * Optional. Filter expression to restrict the insights returned. Supported
   * filter fields: * `stateInfo.state` * `insightSubtype` * `severity`
   * Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` *
   * `insightSubtype = PERMISSIONS_USAGE` * `severity = CRITICAL OR severity =
   * HIGH` * `stateInfo.state = ACTIVE AND (severity = CRITICAL OR severity =
   * HIGH)` (These expressions are based on the filter language described at
   * https://google.aip.dev/160)
   */
  filter?: string;
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. If not specified, the server will
   * determine the number of results to return.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters must be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Recommender#organizationsLocationsInsightTypesUpdateConfig.
 */
export interface OrganizationsLocationsInsightTypesUpdateConfigOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
  /**
   * If true, validate the request and preview the change, but do not actually
   * update it.
   */
  validateOnly?: boolean;
}

function serializeOrganizationsLocationsInsightTypesUpdateConfigOptions(data: any): OrganizationsLocationsInsightTypesUpdateConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsLocationsInsightTypesUpdateConfigOptions(data: any): OrganizationsLocationsInsightTypesUpdateConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Recommender#organizationsLocationsRecommendersRecommendationsList.
 */
export interface OrganizationsLocationsRecommendersRecommendationsListOptions {
  /**
   * Filter expression to restrict the recommendations returned. Supported
   * filter fields: * `state_info.state` * `recommenderSubtype` * `priority`
   * Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` *
   * `recommenderSubtype = REMOVE_ROLE OR recommenderSubtype = REPLACE_ROLE` *
   * `priority = P1 OR priority = P2` * `stateInfo.state = ACTIVE AND (priority
   * = P1 OR priority = P2)` (These expressions are based on the filter language
   * described at https://google.aip.dev/160)
   */
  filter?: string;
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. If not specified, the server will
   * determine the number of results to return.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters must be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Recommender#organizationsLocationsRecommendersUpdateConfig.
 */
export interface OrganizationsLocationsRecommendersUpdateConfigOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
  /**
   * If true, validate the request and preview the change, but do not actually
   * update it.
   */
  validateOnly?: boolean;
}

function serializeOrganizationsLocationsRecommendersUpdateConfigOptions(data: any): OrganizationsLocationsRecommendersUpdateConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeOrganizationsLocationsRecommendersUpdateConfigOptions(data: any): OrganizationsLocationsRecommendersUpdateConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Recommender#projectsLocationsInsightTypesInsightsList.
 */
export interface ProjectsLocationsInsightTypesInsightsListOptions {
  /**
   * Optional. Filter expression to restrict the insights returned. Supported
   * filter fields: * `stateInfo.state` * `insightSubtype` * `severity`
   * Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` *
   * `insightSubtype = PERMISSIONS_USAGE` * `severity = CRITICAL OR severity =
   * HIGH` * `stateInfo.state = ACTIVE AND (severity = CRITICAL OR severity =
   * HIGH)` (These expressions are based on the filter language described at
   * https://google.aip.dev/160)
   */
  filter?: string;
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. If not specified, the server will
   * determine the number of results to return.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters must be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Recommender#projectsLocationsInsightTypesUpdateConfig.
 */
export interface ProjectsLocationsInsightTypesUpdateConfigOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
  /**
   * If true, validate the request and preview the change, but do not actually
   * update it.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsInsightTypesUpdateConfigOptions(data: any): ProjectsLocationsInsightTypesUpdateConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsInsightTypesUpdateConfigOptions(data: any): ProjectsLocationsInsightTypesUpdateConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Recommender#projectsLocationsRecommendersRecommendationsList.
 */
export interface ProjectsLocationsRecommendersRecommendationsListOptions {
  /**
   * Filter expression to restrict the recommendations returned. Supported
   * filter fields: * `state_info.state` * `recommenderSubtype` * `priority`
   * Examples: * `stateInfo.state = ACTIVE OR stateInfo.state = DISMISSED` *
   * `recommenderSubtype = REMOVE_ROLE OR recommenderSubtype = REPLACE_ROLE` *
   * `priority = P1 OR priority = P2` * `stateInfo.state = ACTIVE AND (priority
   * = P1 OR priority = P2)` (These expressions are based on the filter language
   * described at https://google.aip.dev/160)
   */
  filter?: string;
  /**
   * Optional. The maximum number of results to return from this request.
   * Non-positive values are ignored. If not specified, the server will
   * determine the number of results to return.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieves the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of other method
   * parameters must be identical to those in the previous call.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Recommender#projectsLocationsRecommendersUpdateConfig.
 */
export interface ProjectsLocationsRecommendersUpdateConfigOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
  /**
   * If true, validate the request and preview the change, but do not actually
   * update it.
   */
  validateOnly?: boolean;
}

function serializeProjectsLocationsRecommendersUpdateConfigOptions(data: any): ProjectsLocationsRecommendersUpdateConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsRecommendersUpdateConfigOptions(data: any): ProjectsLocationsRecommendersUpdateConfigOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}