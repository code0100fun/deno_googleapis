// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Asset API Client for Deno
 * ===============================
 * 
 * The Cloud Asset API manages the history and inventory of Google Cloud resources.
 * 
 * Docs: https://cloud.google.com/asset-inventory/docs/quickstart
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * The Cloud Asset API manages the history and inventory of Google Cloud
 * resources.
 */
export class CloudAsset {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudasset.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Lists assets with time and resource types and returns paged results in
   * response.
   *
   * @param parent Required. Name of the organization, folder, or project the assets belong to. Format: "organizations/[organization-number]" (such as "organizations/123"), "projects/[project-id]" (such as "projects/my-project-id"), "projects/[project-number]" (such as "projects/12345"), or "folders/[folder-number]" (such as "folders/12345").
   */
  async assetsList(parent: string, opts: AssetsListOptions = {}): Promise<ListAssetsResponse> {
    opts = serializeAssetsListOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/assets`);
    if (opts.assetTypes !== undefined) {
      url.searchParams.append("assetTypes", String(opts.assetTypes));
    }
    if (opts.contentType !== undefined) {
      url.searchParams.append("contentType", String(opts.contentType));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    if (opts.readTime !== undefined) {
      url.searchParams.append("readTime", String(opts.readTime));
    }
    if (opts.relationshipTypes !== undefined) {
      url.searchParams.append("relationshipTypes", String(opts.relationshipTypes));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListAssetsResponse(data);
  }

  /**
   * Gets effective IAM policies for a batch of resources.
   *
   * @param scope Required. Only IAM policies on or below the scope will be returned. This can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). To know how to get organization id, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-organization#retrieving_your_organization_id). To know how to get folder or project id, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-folders#viewing_or_listing_folders_and_projects).
   */
  async effectiveIamPoliciesBatchGet(scope: string, opts: EffectiveIamPoliciesBatchGetOptions = {}): Promise<BatchGetEffectiveIamPoliciesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ scope }/effectiveIamPolicies:batchGet`);
    if (opts.names !== undefined) {
      url.searchParams.append("names", String(opts.names));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBatchGetEffectiveIamPoliciesResponse(data);
  }

  /**
   * Creates a feed in a parent project/folder/organization to listen to its
   * asset updates.
   *
   * @param parent Required. The name of the project/folder/organization where this feed should be created in. It can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345").
   */
  async feedsCreate(parent: string, req: CreateFeedRequest): Promise<Feed> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/feeds`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Feed;
  }

  /**
   * Deletes an asset feed.
   *
   * @param name Required. The name of the feed and it must be in the format of: projects/project_number/feeds/feed_id folders/folder_number/feeds/feed_id organizations/organization_number/feeds/feed_id
   */
  async feedsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets details about an asset feed.
   *
   * @param name Required. The name of the Feed and it must be in the format of: projects/project_number/feeds/feed_id folders/folder_number/feeds/feed_id organizations/organization_number/feeds/feed_id
   */
  async feedsGet(name: string): Promise<Feed> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Feed;
  }

  /**
   * Lists all asset feeds in a parent project/folder/organization.
   *
   * @param parent Required. The parent project/folder/organization whose feeds are to be listed. It can only be using project/folder/organization number (such as "folders/12345")", or a project ID (such as "projects/my-project-id").
   */
  async feedsList(parent: string): Promise<ListFeedsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/feeds`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListFeedsResponse;
  }

  /**
   * Updates an asset feed configuration.
   *
   * @param name Required. The format will be projects/{project_number}/feeds/{client-assigned_feed_identifier} or folders/{folder_number}/feeds/{client-assigned_feed_identifier} or organizations/{organization_number}/feeds/{client-assigned_feed_identifier} The client-assigned feed identifier must be unique within the parent project/folder/organization.
   */
  async feedsPatch(name: string, req: UpdateFeedRequest): Promise<Feed> {
    req = serializeUpdateFeedRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as Feed;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async operationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Creates a saved query in a parent project/folder/organization.
   *
   * @param parent Required. The name of the project/folder/organization where this saved_query should be created in. It can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345").
   */
  async savedQueriesCreate(parent: string, req: SavedQuery, opts: SavedQueriesCreateOptions = {}): Promise<SavedQuery> {
    req = serializeSavedQuery(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/savedQueries`);
    if (opts.savedQueryId !== undefined) {
      url.searchParams.append("savedQueryId", String(opts.savedQueryId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSavedQuery(data);
  }

  /**
   * Deletes a saved query.
   *
   * @param name Required. The name of the saved query to delete. It must be in the format of: * projects/project_number/savedQueries/saved_query_id * folders/folder_number/savedQueries/saved_query_id * organizations/organization_number/savedQueries/saved_query_id
   */
  async savedQueriesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets details about a saved query.
   *
   * @param name Required. The name of the saved query and it must be in the format of: * projects/project_number/savedQueries/saved_query_id * folders/folder_number/savedQueries/saved_query_id * organizations/organization_number/savedQueries/saved_query_id
   */
  async savedQueriesGet(name: string): Promise<SavedQuery> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSavedQuery(data);
  }

  /**
   * Lists all saved queries in a parent project/folder/organization.
   *
   * @param parent Required. The parent project/folder/organization whose savedQueries are to be listed. It can only be using project/folder/organization number (such as "folders/12345")", or a project ID (such as "projects/my-project-id").
   */
  async savedQueriesList(parent: string, opts: SavedQueriesListOptions = {}): Promise<ListSavedQueriesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/savedQueries`);
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
    return deserializeListSavedQueriesResponse(data);
  }

  /**
   * Updates a saved query.
   *
   * @param name The resource name of the saved query. The format must be: * projects/project_number/savedQueries/saved_query_id * folders/folder_number/savedQueries/saved_query_id * organizations/organization_number/savedQueries/saved_query_id
   */
  async savedQueriesPatch(name: string, req: SavedQuery, opts: SavedQueriesPatchOptions = {}): Promise<SavedQuery> {
    req = serializeSavedQuery(req);
    opts = serializeSavedQueriesPatchOptions(opts);
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
    return deserializeSavedQuery(data);
  }

  /**
   * Analyzes IAM policies to answer which identities have what accesses on
   * which resources.
   *
   * @param scope Required. The relative name of the root asset. Only resources and IAM policies within the scope will be analyzed. This can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). To know how to get organization id, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-organization#retrieving_your_organization_id). To know how to get folder or project id, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-folders#viewing_or_listing_folders_and_projects).
   */
  async v1AnalyzeIamPolicy(scope: string, opts: V1AnalyzeIamPolicyOptions = {}): Promise<AnalyzeIamPolicyResponse> {
    opts = serializeV1AnalyzeIamPolicyOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ scope }:analyzeIamPolicy`);
    if (opts["analysisQuery.accessSelector.permissions"] !== undefined) {
      url.searchParams.append("analysisQuery.accessSelector.permissions", String(opts["analysisQuery.accessSelector.permissions"]));
    }
    if (opts["analysisQuery.accessSelector.roles"] !== undefined) {
      url.searchParams.append("analysisQuery.accessSelector.roles", String(opts["analysisQuery.accessSelector.roles"]));
    }
    if (opts["analysisQuery.conditionContext.accessTime"] !== undefined) {
      url.searchParams.append("analysisQuery.conditionContext.accessTime", String(opts["analysisQuery.conditionContext.accessTime"]));
    }
    if (opts["analysisQuery.identitySelector.identity"] !== undefined) {
      url.searchParams.append("analysisQuery.identitySelector.identity", String(opts["analysisQuery.identitySelector.identity"]));
    }
    if (opts["analysisQuery.options.analyzeServiceAccountImpersonation"] !== undefined) {
      url.searchParams.append("analysisQuery.options.analyzeServiceAccountImpersonation", String(opts["analysisQuery.options.analyzeServiceAccountImpersonation"]));
    }
    if (opts["analysisQuery.options.expandGroups"] !== undefined) {
      url.searchParams.append("analysisQuery.options.expandGroups", String(opts["analysisQuery.options.expandGroups"]));
    }
    if (opts["analysisQuery.options.expandResources"] !== undefined) {
      url.searchParams.append("analysisQuery.options.expandResources", String(opts["analysisQuery.options.expandResources"]));
    }
    if (opts["analysisQuery.options.expandRoles"] !== undefined) {
      url.searchParams.append("analysisQuery.options.expandRoles", String(opts["analysisQuery.options.expandRoles"]));
    }
    if (opts["analysisQuery.options.outputGroupEdges"] !== undefined) {
      url.searchParams.append("analysisQuery.options.outputGroupEdges", String(opts["analysisQuery.options.outputGroupEdges"]));
    }
    if (opts["analysisQuery.options.outputResourceEdges"] !== undefined) {
      url.searchParams.append("analysisQuery.options.outputResourceEdges", String(opts["analysisQuery.options.outputResourceEdges"]));
    }
    if (opts["analysisQuery.resourceSelector.fullResourceName"] !== undefined) {
      url.searchParams.append("analysisQuery.resourceSelector.fullResourceName", String(opts["analysisQuery.resourceSelector.fullResourceName"]));
    }
    if (opts.executionTimeout !== undefined) {
      url.searchParams.append("executionTimeout", String(opts.executionTimeout));
    }
    if (opts.savedAnalysisQuery !== undefined) {
      url.searchParams.append("savedAnalysisQuery", String(opts.savedAnalysisQuery));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeAnalyzeIamPolicyResponse(data);
  }

  /**
   * Analyzes IAM policies asynchronously to answer which identities have what
   * accesses on which resources, and writes the analysis results to a Google
   * Cloud Storage or a BigQuery destination. For Cloud Storage destination, the
   * output format is the JSON format that represents a
   * AnalyzeIamPolicyResponse. This method implements the
   * google.longrunning.Operation, which allows you to track the operation
   * status. We recommend intervals of at least 2 seconds with exponential
   * backoff retry to poll the operation result. The metadata contains the
   * metadata for the long-running operation.
   *
   * @param scope Required. The relative name of the root asset. Only resources and IAM policies within the scope will be analyzed. This can only be an organization number (such as "organizations/123"), a folder number (such as "folders/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"). To know how to get organization id, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-organization#retrieving_your_organization_id). To know how to get folder or project id, visit [here ](https://cloud.google.com/resource-manager/docs/creating-managing-folders#viewing_or_listing_folders_and_projects).
   */
  async v1AnalyzeIamPolicyLongrunning(scope: string, req: AnalyzeIamPolicyLongrunningRequest): Promise<Operation> {
    req = serializeAnalyzeIamPolicyLongrunningRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ scope }:analyzeIamPolicyLongrunning`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Analyze moving a resource to a specified destination without kicking off
   * the actual move. The analysis is best effort depending on the user's
   * permissions of viewing different hierarchical policies and configurations.
   * The policies and configuration are subject to change before the actual
   * resource migration takes place.
   *
   * @param resource Required. Name of the resource to perform the analysis against. Only Google Cloud projects are supported as of today. Hence, this can only be a project ID (such as "projects/my-project-id") or a project number (such as "projects/12345").
   */
  async v1AnalyzeMove(resource: string, opts: V1AnalyzeMoveOptions = {}): Promise<AnalyzeMoveResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ resource }:analyzeMove`);
    if (opts.destinationParent !== undefined) {
      url.searchParams.append("destinationParent", String(opts.destinationParent));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as AnalyzeMoveResponse;
  }

  /**
   * Analyzes organization policies under a scope.
   *
   * @param scope Required. The organization to scope the request. Only organization policies within the scope will be analyzed. * organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456")
   */
  async v1AnalyzeOrgPolicies(scope: string, opts: V1AnalyzeOrgPoliciesOptions = {}): Promise<AnalyzeOrgPoliciesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ scope }:analyzeOrgPolicies`);
    if (opts.constraint !== undefined) {
      url.searchParams.append("constraint", String(opts.constraint));
    }
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
    return data as AnalyzeOrgPoliciesResponse;
  }

  /**
   * Analyzes organization policies governed assets (Google Cloud resources or
   * policies) under a scope. This RPC supports custom constraints and the
   * following 10 canned constraints: * storage.uniformBucketLevelAccess *
   * iam.disableServiceAccountKeyCreation * iam.allowedPolicyMemberDomains *
   * compute.vmExternalIpAccess * appengine.enforceServiceAccountActAsCheck *
   * gcp.resourceLocations * compute.trustedImageProjects *
   * compute.skipDefaultNetworkCreation * compute.requireOsLogin *
   * compute.disableNestedVirtualization This RPC only returns either resources
   * of types supported by [searchable asset
   * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types#searchable_asset_types),
   * or IAM policies.
   *
   * @param scope Required. The organization to scope the request. Only organization policies within the scope will be analyzed. The output assets will also be limited to the ones governed by those in-scope organization policies. * organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456")
   */
  async v1AnalyzeOrgPolicyGovernedAssets(scope: string, opts: V1AnalyzeOrgPolicyGovernedAssetsOptions = {}): Promise<AnalyzeOrgPolicyGovernedAssetsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ scope }:analyzeOrgPolicyGovernedAssets`);
    if (opts.constraint !== undefined) {
      url.searchParams.append("constraint", String(opts.constraint));
    }
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
    return deserializeAnalyzeOrgPolicyGovernedAssetsResponse(data);
  }

  /**
   * Analyzes organization policies governed containers (projects, folders or
   * organization) under a scope.
   *
   * @param scope Required. The organization to scope the request. Only organization policies within the scope will be analyzed. The output containers will also be limited to the ones governed by those in-scope organization policies. * organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456")
   */
  async v1AnalyzeOrgPolicyGovernedContainers(scope: string, opts: V1AnalyzeOrgPolicyGovernedContainersOptions = {}): Promise<AnalyzeOrgPolicyGovernedContainersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ scope }:analyzeOrgPolicyGovernedContainers`);
    if (opts.constraint !== undefined) {
      url.searchParams.append("constraint", String(opts.constraint));
    }
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
    return data as AnalyzeOrgPolicyGovernedContainersResponse;
  }

  /**
   * Batch gets the update history of assets that overlap a time window. For
   * IAM_POLICY content, this API outputs history when the asset and its
   * attached IAM POLICY both exist. This can create gaps in the output history.
   * Otherwise, this API outputs history with asset in both non-delete or
   * deleted status. If a specified asset does not exist, this API returns an
   * INVALID_ARGUMENT error.
   *
   * @param parent Required. The relative name of the root asset. It can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id")", or a project number (such as "projects/12345").
   */
  async v1BatchGetAssetsHistory(parent: string, opts: V1BatchGetAssetsHistoryOptions = {}): Promise<BatchGetAssetsHistoryResponse> {
    opts = serializeV1BatchGetAssetsHistoryOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:batchGetAssetsHistory`);
    if (opts.assetNames !== undefined) {
      url.searchParams.append("assetNames", String(opts.assetNames));
    }
    if (opts.contentType !== undefined) {
      url.searchParams.append("contentType", String(opts.contentType));
    }
    if (opts["readTimeWindow.endTime"] !== undefined) {
      url.searchParams.append("readTimeWindow.endTime", String(opts["readTimeWindow.endTime"]));
    }
    if (opts["readTimeWindow.startTime"] !== undefined) {
      url.searchParams.append("readTimeWindow.startTime", String(opts["readTimeWindow.startTime"]));
    }
    if (opts.relationshipTypes !== undefined) {
      url.searchParams.append("relationshipTypes", String(opts.relationshipTypes));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBatchGetAssetsHistoryResponse(data);
  }

  /**
   * Exports assets with time and resource types to a given Cloud Storage
   * location/BigQuery table. For Cloud Storage location destinations, the
   * output format is newline-delimited JSON. Each line represents a
   * google.cloud.asset.v1.Asset in the JSON format; for BigQuery table
   * destinations, the output table stores the fields in asset Protobuf as
   * columns. This API implements the google.longrunning.Operation API, which
   * allows you to keep track of the export. We recommend intervals of at least
   * 2 seconds with exponential retry to poll the export operation result. For
   * regular-size resource parent, the export operation usually finishes within
   * 5 minutes.
   *
   * @param parent Required. The relative name of the root asset. This can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"), or a folder number (such as "folders/123").
   */
  async v1ExportAssets(parent: string, req: ExportAssetsRequest): Promise<Operation> {
    req = serializeExportAssetsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:exportAssets`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Issue a job that queries assets using a SQL statement compatible with
   * [BigQuery Standard
   * SQL](http://cloud/bigquery/docs/reference/standard-sql/enabling-standard-sql).
   * If the query execution finishes within timeout and there's no pagination,
   * the full query results will be returned in the `QueryAssetsResponse`.
   * Otherwise, full query results can be obtained by issuing extra requests
   * with the `job_reference` from the a previous `QueryAssets` call. Note, the
   * query result has approximately 10 GB limitation enforced by BigQuery
   * https://cloud.google.com/bigquery/docs/best-practices-performance-output,
   * queries return larger results will result in errors.
   *
   * @param parent Required. The relative name of the root asset. This can only be an organization number (such as "organizations/123"), a project ID (such as "projects/my-project-id"), or a project number (such as "projects/12345"), or a folder number (such as "folders/123"). Only assets belonging to the `parent` will be returned.
   */
  async v1QueryAssets(parent: string, req: QueryAssetsRequest): Promise<QueryAssetsResponse> {
    req = serializeQueryAssetsRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }:queryAssets`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeQueryAssetsResponse(data);
  }

  /**
   * Searches all IAM policies within the specified scope, such as a project,
   * folder, or organization. The caller must be granted the
   * `cloudasset.assets.searchAllIamPolicies` permission on the desired scope,
   * otherwise the request will be rejected.
   *
   * @param scope Required. A scope can be a project, a folder, or an organization. The search is limited to the IAM policies within the `scope`. The caller must be granted the [`cloudasset.assets.searchAllIamPolicies`](https://cloud.google.com/asset-inventory/docs/access-control#required_permissions) permission on the desired scope. The allowed values are: * projects/{PROJECT_ID} (e.g., "projects/foo-bar") * projects/{PROJECT_NUMBER} (e.g., "projects/12345678") * folders/{FOLDER_NUMBER} (e.g., "folders/1234567") * organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456")
   */
  async v1SearchAllIamPolicies(scope: string, opts: V1SearchAllIamPoliciesOptions = {}): Promise<SearchAllIamPoliciesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ scope }:searchAllIamPolicies`);
    if (opts.assetTypes !== undefined) {
      url.searchParams.append("assetTypes", String(opts.assetTypes));
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
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSearchAllIamPoliciesResponse(data);
  }

  /**
   * Searches all Google Cloud resources within the specified scope, such as a
   * project, folder, or organization. The caller must be granted the
   * `cloudasset.assets.searchAllResources` permission on the desired scope,
   * otherwise the request will be rejected.
   *
   * @param scope Required. A scope can be a project, a folder, or an organization. The search is limited to the resources within the `scope`. The caller must be granted the [`cloudasset.assets.searchAllResources`](https://cloud.google.com/asset-inventory/docs/access-control#required_permissions) permission on the desired scope. The allowed values are: * projects/{PROJECT_ID} (e.g., "projects/foo-bar") * projects/{PROJECT_NUMBER} (e.g., "projects/12345678") * folders/{FOLDER_NUMBER} (e.g., "folders/1234567") * organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456")
   */
  async v1SearchAllResources(scope: string, opts: V1SearchAllResourcesOptions = {}): Promise<SearchAllResourcesResponse> {
    opts = serializeV1SearchAllResourcesOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/${ scope }:searchAllResources`);
    if (opts.assetTypes !== undefined) {
      url.searchParams.append("assetTypes", String(opts.assetTypes));
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
    if (opts.query !== undefined) {
      url.searchParams.append("query", String(opts.query));
    }
    if (opts.readMask !== undefined) {
      url.searchParams.append("readMask", String(opts.readMask));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeSearchAllResourcesResponse(data);
  }
}

/**
 * Specifies roles and/or permissions to analyze, to determine both the
 * identities possessing them and the resources they control. If multiple values
 * are specified, results will include roles or permissions matching any of
 * them. The total number of roles and permissions should be equal or less than
 * 10.
 */
export interface AccessSelector {
  /**
   * Optional. The permissions to appear in result.
   */
  permissions?: string[];
  /**
   * Optional. The roles to appear in result.
   */
  roles?: string[];
}

/**
 * Represents the metadata of the longrunning operation for the
 * AnalyzeIamPolicyLongrunning RPC.
 */
export interface AnalyzeIamPolicyLongrunningMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
}

/**
 * A request message for AssetService.AnalyzeIamPolicyLongrunning.
 */
export interface AnalyzeIamPolicyLongrunningRequest {
  /**
   * Required. The request query.
   */
  analysisQuery?: IamPolicyAnalysisQuery;
  /**
   * Required. Output configuration indicating where the results will be output
   * to.
   */
  outputConfig?: IamPolicyAnalysisOutputConfig;
  /**
   * Optional. The name of a saved query, which must be in the format of: *
   * projects/project_number/savedQueries/saved_query_id *
   * folders/folder_number/savedQueries/saved_query_id *
   * organizations/organization_number/savedQueries/saved_query_id If both
   * `analysis_query` and `saved_analysis_query` are provided, they will be
   * merged together with the `saved_analysis_query` as base and the
   * `analysis_query` as overrides. For more details of the merge behavior,
   * please refer to the
   * [MergeFrom](https://developers.google.com/protocol-buffers/docs/reference/cpp/google.protobuf.message#Message.MergeFrom.details)
   * doc. Note that you cannot override primitive fields with default value,
   * such as 0 or empty string, etc., because we use proto3, which doesn't
   * support field presence yet.
   */
  savedAnalysisQuery?: string;
}

function serializeAnalyzeIamPolicyLongrunningRequest(data: any): AnalyzeIamPolicyLongrunningRequest {
  return {
    ...data,
    analysisQuery: data["analysisQuery"] !== undefined ? serializeIamPolicyAnalysisQuery(data["analysisQuery"]) : undefined,
  };
}

function deserializeAnalyzeIamPolicyLongrunningRequest(data: any): AnalyzeIamPolicyLongrunningRequest {
  return {
    ...data,
    analysisQuery: data["analysisQuery"] !== undefined ? deserializeIamPolicyAnalysisQuery(data["analysisQuery"]) : undefined,
  };
}

/**
 * A response message for AssetService.AnalyzeIamPolicyLongrunning.
 */
export interface AnalyzeIamPolicyLongrunningResponse {
}

/**
 * A response message for AssetService.AnalyzeIamPolicy.
 */
export interface AnalyzeIamPolicyResponse {
  /**
   * Represents whether all entries in the main_analysis and
   * service_account_impersonation_analysis have been fully explored to answer
   * the query in the request.
   */
  fullyExplored?: boolean;
  /**
   * The main analysis that matches the original request.
   */
  mainAnalysis?: IamPolicyAnalysis;
  /**
   * The service account impersonation analysis if
   * AnalyzeIamPolicyRequest.analyze_service_account_impersonation is enabled.
   */
  serviceAccountImpersonationAnalysis?: IamPolicyAnalysis[];
}

function serializeAnalyzeIamPolicyResponse(data: any): AnalyzeIamPolicyResponse {
  return {
    ...data,
    mainAnalysis: data["mainAnalysis"] !== undefined ? serializeIamPolicyAnalysis(data["mainAnalysis"]) : undefined,
    serviceAccountImpersonationAnalysis: data["serviceAccountImpersonationAnalysis"] !== undefined ? data["serviceAccountImpersonationAnalysis"].map((item: any) => (serializeIamPolicyAnalysis(item))) : undefined,
  };
}

function deserializeAnalyzeIamPolicyResponse(data: any): AnalyzeIamPolicyResponse {
  return {
    ...data,
    mainAnalysis: data["mainAnalysis"] !== undefined ? deserializeIamPolicyAnalysis(data["mainAnalysis"]) : undefined,
    serviceAccountImpersonationAnalysis: data["serviceAccountImpersonationAnalysis"] !== undefined ? data["serviceAccountImpersonationAnalysis"].map((item: any) => (deserializeIamPolicyAnalysis(item))) : undefined,
  };
}

/**
 * The response message for resource move analysis.
 */
export interface AnalyzeMoveResponse {
  /**
   * The list of analyses returned from performing the intended resource move
   * analysis. The analysis is grouped by different Google Cloud services.
   */
  moveAnalysis?: MoveAnalysis[];
}

/**
 * The response message for AssetService.AnalyzeOrgPolicies.
 */
export interface AnalyzeOrgPoliciesResponse {
  /**
   * The definition of the constraint in the request.
   */
  constraint?: AnalyzerOrgPolicyConstraint;
  /**
   * The page token to fetch the next page for
   * AnalyzeOrgPoliciesResponse.org_policy_results.
   */
  nextPageToken?: string;
  /**
   * The organization policies under the AnalyzeOrgPoliciesRequest.scope with
   * the AnalyzeOrgPoliciesRequest.constraint.
   */
  orgPolicyResults?: OrgPolicyResult[];
}

/**
 * The response message for AssetService.AnalyzeOrgPolicyGovernedAssets.
 */
export interface AnalyzeOrgPolicyGovernedAssetsResponse {
  /**
   * The definition of the constraint in the request.
   */
  constraint?: AnalyzerOrgPolicyConstraint;
  /**
   * The list of the analyzed governed assets.
   */
  governedAssets?: GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset[];
  /**
   * The page token to fetch the next page for
   * AnalyzeOrgPolicyGovernedAssetsResponse.governed_assets.
   */
  nextPageToken?: string;
}

function serializeAnalyzeOrgPolicyGovernedAssetsResponse(data: any): AnalyzeOrgPolicyGovernedAssetsResponse {
  return {
    ...data,
    governedAssets: data["governedAssets"] !== undefined ? data["governedAssets"].map((item: any) => (serializeGoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset(item))) : undefined,
  };
}

function deserializeAnalyzeOrgPolicyGovernedAssetsResponse(data: any): AnalyzeOrgPolicyGovernedAssetsResponse {
  return {
    ...data,
    governedAssets: data["governedAssets"] !== undefined ? data["governedAssets"].map((item: any) => (deserializeGoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset(item))) : undefined,
  };
}

/**
 * The response message for AssetService.AnalyzeOrgPolicyGovernedContainers.
 */
export interface AnalyzeOrgPolicyGovernedContainersResponse {
  /**
   * The definition of the constraint in the request.
   */
  constraint?: AnalyzerOrgPolicyConstraint;
  /**
   * The list of the analyzed governed containers.
   */
  governedContainers?: GoogleCloudAssetV1GovernedContainer[];
  /**
   * The page token to fetch the next page for
   * AnalyzeOrgPolicyGovernedContainersResponse.governed_containers.
   */
  nextPageToken?: string;
}

/**
 * This organization policy message is a modified version of the one defined in
 * the Organization Policy system. This message contains several fields defined
 * in the original organization policy with some new fields for analysis
 * purpose.
 */
export interface AnalyzerOrgPolicy {
  /**
   * The [full resource name]
   * (https://cloud.google.com/asset-inventory/docs/resource-name-format) of an
   * organization/folder/project resource where this organization policy applies
   * to. For any user defined org policies, this field has the same value as the
   * [attached_resource] field. Only for default policy, this field has the
   * different value.
   */
  appliedResource?: string;
  /**
   * The [full resource name]
   * (https://cloud.google.com/asset-inventory/docs/resource-name-format) of an
   * organization/folder/project resource where this organization policy is set.
   * Notice that some type of constraints are defined with default policy. This
   * field will be empty for them.
   */
  attachedResource?: string;
  /**
   * If `inherit_from_parent` is true, Rules set higher up in the hierarchy (up
   * to the closest root) are inherited and present in the effective policy. If
   * it is false, then no rules are inherited, and this policy becomes the
   * effective root for evaluation.
   */
  inheritFromParent?: boolean;
  /**
   * Ignores policies set above this resource and restores the default behavior
   * of the constraint at this resource. This field can be set in policies for
   * either list or boolean constraints. If set, `rules` must be empty and
   * `inherit_from_parent` must be set to false.
   */
  reset?: boolean;
  /**
   * List of rules for this organization policy.
   */
  rules?: GoogleCloudAssetV1Rule[];
}

/**
 * The organization policy constraint definition.
 */
export interface AnalyzerOrgPolicyConstraint {
  /**
   * The definition of the custom constraint.
   */
  customConstraint?: GoogleCloudAssetV1CustomConstraint;
  /**
   * The definition of the canned constraint defined by Google.
   */
  googleDefinedConstraint?: GoogleCloudAssetV1Constraint;
}

/**
 * An asset in Google Cloud. An asset can be any resource in the Google Cloud
 * [resource
 * hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy),
 * a resource outside the Google Cloud resource hierarchy (such as Google
 * Kubernetes Engine clusters and objects), or a policy (e.g. IAM policy), or a
 * relationship (e.g. an INSTANCE_TO_INSTANCEGROUP relationship). See [Supported
 * asset
 * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types)
 * for more information.
 */
export interface Asset {
  /**
   * Please also refer to the [access level user
   * guide](https://cloud.google.com/access-context-manager/docs/overview#access-levels).
   */
  accessLevel?: GoogleIdentityAccesscontextmanagerV1AccessLevel;
  /**
   * Please also refer to the [access policy user
   * guide](https://cloud.google.com/access-context-manager/docs/overview#access-policies).
   */
  accessPolicy?: GoogleIdentityAccesscontextmanagerV1AccessPolicy;
  /**
   * The ancestry path of an asset in Google Cloud [resource
   * hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy),
   * represented as a list of relative resource names. An ancestry path starts
   * with the closest ancestor in the hierarchy and ends at root. If the asset
   * is a project, folder, or organization, the ancestry path starts from the
   * asset itself. Example: `["projects/123456789", "folders/5432",
   * "organizations/1234"]`
   */
  ancestors?: string[];
  /**
   * The type of the asset. Example: `compute.googleapis.com/Disk` See
   * [Supported asset
   * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types)
   * for more information.
   */
  assetType?: string;
  /**
   * A representation of the IAM policy set on a Google Cloud resource. There
   * can be a maximum of one IAM policy set on any given resource. In addition,
   * IAM policies inherit their granted access scope from any policies set on
   * parent resources in the resource hierarchy. Therefore, the effectively
   * policy is the union of both the policy set on this resource and each policy
   * set on all of the resource's ancestry resource levels in the hierarchy. See
   * [this topic](https://cloud.google.com/iam/help/allow-policies/inheritance)
   * for more information.
   */
  iamPolicy?: Policy;
  /**
   * The full name of the asset. Example:
   * `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`
   * See [Resource
   * names](https://cloud.google.com/apis/design/resource_names#full_resource_name)
   * for more information.
   */
  name?: string;
  /**
   * A representation of an [organization
   * policy](https://cloud.google.com/resource-manager/docs/organization-policy/overview#organization_policy).
   * There can be more than one organization policy with different constraints
   * set on a given resource.
   */
  orgPolicy?: GoogleCloudOrgpolicyV1Policy[];
  /**
   * A representation of runtime OS Inventory information. See [this
   * topic](https://cloud.google.com/compute/docs/instances/os-inventory-management)
   * for more information.
   */
  osInventory?: Inventory;
  /**
   * One related asset of the current asset.
   */
  relatedAsset?: RelatedAsset;
  /**
   * DEPRECATED. This field only presents for the purpose of
   * backward-compatibility. The server will never generate responses with this
   * field. The related assets of the asset of one relationship type. One asset
   * only represents one type of relationship.
   */
  relatedAssets?: RelatedAssets;
  /**
   * A representation of the resource.
   */
  resource?: Resource;
  /**
   * Please also refer to the [service perimeter user
   * guide](https://cloud.google.com/vpc-service-controls/docs/overview).
   */
  servicePerimeter?: GoogleIdentityAccesscontextmanagerV1ServicePerimeter;
  /**
   * The last update timestamp of an asset. update_time is updated when
   * create/update/delete operation is performed.
   */
  updateTime?: Date;
}

function serializeAsset(data: any): Asset {
  return {
    ...data,
    iamPolicy: data["iamPolicy"] !== undefined ? serializePolicy(data["iamPolicy"]) : undefined,
    orgPolicy: data["orgPolicy"] !== undefined ? data["orgPolicy"].map((item: any) => (serializeGoogleCloudOrgpolicyV1Policy(item))) : undefined,
    osInventory: data["osInventory"] !== undefined ? serializeInventory(data["osInventory"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeAsset(data: any): Asset {
  return {
    ...data,
    iamPolicy: data["iamPolicy"] !== undefined ? deserializePolicy(data["iamPolicy"]) : undefined,
    orgPolicy: data["orgPolicy"] !== undefined ? data["orgPolicy"].map((item: any) => (deserializeGoogleCloudOrgpolicyV1Policy(item))) : undefined,
    osInventory: data["osInventory"] !== undefined ? deserializeInventory(data["osInventory"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Additional options for CloudAsset#assetsList.
 */
export interface AssetsListOptions {
  /**
   * A list of asset types to take a snapshot for. For example:
   * "compute.googleapis.com/Disk". Regular expression is also supported. For
   * example: * "compute.googleapis.com.*" snapshots resources whose asset type
   * starts with "compute.googleapis.com". * ".*Instance" snapshots resources
   * whose asset type ends with "Instance". * ".*Instance.*" snapshots resources
   * whose asset type contains "Instance". See
   * [RE2](https://github.com/google/re2/wiki/Syntax) for all supported regular
   * expression syntax. If the regular expression does not match any supported
   * asset type, an INVALID_ARGUMENT error will be returned. If specified, only
   * matching assets will be returned, otherwise, it will snapshot all asset
   * types. See [Introduction to Cloud Asset
   * Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all
   * supported asset types.
   */
  assetTypes?: string;
  /**
   * Asset content type. If not specified, no content but the asset name will
   * be returned.
   */
  contentType?:  | "CONTENT_TYPE_UNSPECIFIED" | "RESOURCE" | "IAM_POLICY" | "ORG_POLICY" | "ACCESS_POLICY" | "OS_INVENTORY" | "RELATIONSHIP";
  /**
   * The maximum number of assets to be returned in a single response. Default
   * is 100, minimum is 1, and maximum is 1000.
   */
  pageSize?: number;
  /**
   * The `next_page_token` returned from the previous `ListAssetsResponse`, or
   * unspecified for the first `ListAssetsRequest`. It is a continuation of a
   * prior `ListAssets` call, and the API should return the next page of assets.
   */
  pageToken?: string;
  /**
   * Timestamp to take an asset snapshot. This can only be set to a timestamp
   * between the current time and the current time minus 35 days (inclusive). If
   * not specified, the current time will be used. Due to delays in resource
   * data collection and indexing, there is a volatile window during which
   * running the same query may get different results.
   */
  readTime?: Date;
  /**
   * A list of relationship types to output, for example:
   * `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if
   * content_type=RELATIONSHIP. * If specified: it snapshots specified
   * relationships. It returns an error if any of the [relationship_types]
   * doesn't belong to the supported relationship types of the [asset_types] or
   * if any of the [asset_types] doesn't belong to the source types of the
   * [relationship_types]. * Otherwise: it snapshots the supported relationships
   * for all [asset_types] or returns an error if any of the [asset_types] has
   * no relationship support. An unspecified asset types field means all
   * supported asset_types. See [Introduction to Cloud Asset
   * Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all
   * supported asset types and relationship types.
   */
  relationshipTypes?: string;
}

function serializeAssetsListOptions(data: any): AssetsListOptions {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeAssetsListOptions(data: any): AssetsListOptions {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Attached resource representation, which is defined by the corresponding
 * service provider. It represents an attached resource's payload.
 */
export interface AttachedResource {
  /**
   * The type of this attached resource. Example:
   * `osconfig.googleapis.com/Inventory` You can find the supported attached
   * asset types of each resource in this table:
   * `https://cloud.google.com/asset-inventory/docs/supported-asset-types#searchable_asset_types`
   */
  assetType?: string;
  /**
   * Versioned resource representations of this attached resource. This is
   * repeated because there could be multiple versions of the attached resource
   * representations during version migration.
   */
  versionedResources?: VersionedResource[];
}

/**
 * Specifies the audit configuration for a service. The configuration
 * determines which permission types are logged, and what identities, if any,
 * are exempted from logging. An AuditConfig must have one or more
 * AuditLogConfigs. If there are AuditConfigs for both `allServices` and a
 * specific service, the union of the two AuditConfigs is used for that service:
 * the log_types specified in each AuditConfig are enabled, and the
 * exempted_members in each AuditLogConfig are exempted. Example Policy with
 * multiple AuditConfigs: { "audit_configs": [ { "service": "allServices",
 * "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [
 * "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" }, { "log_type":
 * "ADMIN_READ" } ] }, { "service": "sampleservice.googleapis.com",
 * "audit_log_configs": [ { "log_type": "DATA_READ" }, { "log_type":
 * "DATA_WRITE", "exempted_members": [ "user:aliya@example.com" ] } ] } ] } For
 * sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ
 * logging. It also exempts `jose@example.com` from DATA_READ logging, and
 * `aliya@example.com` from DATA_WRITE logging.
 */
export interface AuditConfig {
  /**
   * The configuration for logging of each type of permission.
   */
  auditLogConfigs?: AuditLogConfig[];
  /**
   * Specifies a service that will be enabled for audit logging. For example,
   * `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a
   * special value that covers all services.
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
 * Batch get assets history response.
 */
export interface BatchGetAssetsHistoryResponse {
  /**
   * A list of assets with valid time windows.
   */
  assets?: TemporalAsset[];
}

function serializeBatchGetAssetsHistoryResponse(data: any): BatchGetAssetsHistoryResponse {
  return {
    ...data,
    assets: data["assets"] !== undefined ? data["assets"].map((item: any) => (serializeTemporalAsset(item))) : undefined,
  };
}

function deserializeBatchGetAssetsHistoryResponse(data: any): BatchGetAssetsHistoryResponse {
  return {
    ...data,
    assets: data["assets"] !== undefined ? data["assets"].map((item: any) => (deserializeTemporalAsset(item))) : undefined,
  };
}

/**
 * A response message for AssetService.BatchGetEffectiveIamPolicies.
 */
export interface BatchGetEffectiveIamPoliciesResponse {
  /**
   * The effective policies for a batch of resources. Note that the results
   * order is the same as the order of
   * BatchGetEffectiveIamPoliciesRequest.names. When a resource does not have
   * any effective IAM policies, its corresponding policy_result will contain
   * empty EffectiveIamPolicy.policies.
   */
  policyResults?: EffectiveIamPolicy[];
}

function serializeBatchGetEffectiveIamPoliciesResponse(data: any): BatchGetEffectiveIamPoliciesResponse {
  return {
    ...data,
    policyResults: data["policyResults"] !== undefined ? data["policyResults"].map((item: any) => (serializeEffectiveIamPolicy(item))) : undefined,
  };
}

function deserializeBatchGetEffectiveIamPoliciesResponse(data: any): BatchGetEffectiveIamPoliciesResponse {
  return {
    ...data,
    policyResults: data["policyResults"] !== undefined ? data["policyResults"].map((item: any) => (deserializeEffectiveIamPolicy(item))) : undefined,
  };
}

/**
 * A BigQuery destination for exporting assets to.
 */
export interface BigQueryDestination {
  /**
   * Required. The BigQuery dataset in format
   * "projects/projectId/datasets/datasetId", to which the snapshot result
   * should be exported. If this dataset does not exist, the export call returns
   * an INVALID_ARGUMENT error. Setting the `contentType` for `exportAssets`
   * determines the
   * [schema](/asset-inventory/docs/exporting-to-bigquery#bigquery-schema) of
   * the BigQuery table. Setting `separateTablesPerAssetType` to `TRUE` also
   * influences the schema.
   */
  dataset?: string;
  /**
   * If the destination table already exists and this flag is `TRUE`, the table
   * will be overwritten by the contents of assets snapshot. If the flag is
   * `FALSE` or unset and the destination table already exists, the export call
   * returns an INVALID_ARGUMEMT error.
   */
  force?: boolean;
  /**
   * [partition_spec] determines whether to export to partitioned table(s) and
   * how to partition the data. If [partition_spec] is unset or
   * [partition_spec.partition_key] is unset or `PARTITION_KEY_UNSPECIFIED`, the
   * snapshot results will be exported to non-partitioned table(s). [force] will
   * decide whether to overwrite existing table(s). If [partition_spec] is
   * specified. First, the snapshot results will be written to partitioned
   * table(s) with two additional timestamp columns, readTime and requestTime,
   * one of which will be the partition key. Secondly, in the case when any
   * destination table already exists, it will first try to update existing
   * table's schema as necessary by appending additional columns. Then, if
   * [force] is `TRUE`, the corresponding partition will be overwritten by the
   * snapshot results (data in different partitions will remain intact); if
   * [force] is unset or `FALSE`, it will append the data. An error will be
   * returned if the schema update or data appension fails.
   */
  partitionSpec?: PartitionSpec;
  /**
   * If this flag is `TRUE`, the snapshot results will be written to one or
   * multiple tables, each of which contains results of one asset type. The
   * [force] and [partition_spec] fields will apply to each of them. Field
   * [table] will be concatenated with "_" and the asset type names (see
   * https://cloud.google.com/asset-inventory/docs/supported-asset-types for
   * supported asset types) to construct per-asset-type table names, in which
   * all non-alphanumeric characters like "." and "/" will be substituted by
   * "_". Example: if field [table] is "mytable" and snapshot results contain
   * "storage.googleapis.com/Bucket" assets, the corresponding table name will
   * be "mytable_storage_googleapis_com_Bucket". If any of these tables does not
   * exist, a new table with the concatenated name will be created. When
   * [content_type] in the ExportAssetsRequest is `RESOURCE`, the schema of each
   * table will include RECORD-type columns mapped to the nested fields in the
   * Asset.resource.data field of that asset type (up to the 15 nested level
   * BigQuery supports
   * (https://cloud.google.com/bigquery/docs/nested-repeated#limitations)). The
   * fields in >15 nested levels will be stored in JSON format string as a child
   * column of its parent RECORD column. If error occurs when exporting to any
   * table, the whole export call will return an error but the export results
   * that already succeed will persist. Example: if exporting to table_type_A
   * succeeds when exporting to table_type_B fails during one export call, the
   * results in table_type_A will persist and there will not be partial results
   * persisting in a table.
   */
  separateTablesPerAssetType?: boolean;
  /**
   * Required. The BigQuery table to which the snapshot result should be
   * written. If this table does not exist, a new table with the given name will
   * be created.
   */
  table?: string;
}

/**
 * Associates `members`, or principals, with a `role`.
 */
export interface Binding {
  /**
   * The condition that is associated with this binding. If the condition
   * evaluates to `true`, then this binding applies to the current request. If
   * the condition evaluates to `false`, then this binding does not apply to the
   * current request. However, a different role binding might grant the same
   * role to one or more of the principals in this binding. To learn which
   * resources support conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
   */
  condition?: Expr;
  /**
   * Specifies the principals requesting access for a Google Cloud resource.
   * `members` can have the following values: * `allUsers`: A special identifier
   * that represents anyone who is on the internet; with or without a Google
   * account. * `allAuthenticatedUsers`: A special identifier that represents
   * anyone who is authenticated with a Google account or a service account.
   * Does not include identities that come from external identity providers
   * (IdPs) through identity federation. * `user:{emailid}`: An email address
   * that represents a specific Google account. For example, `alice@example.com`
   * . * `serviceAccount:{emailid}`: An email address that represents a Google
   * service account. For example, `my-other-app@appspot.gserviceaccount.com`. *
   * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An
   * identifier for a [Kubernetes service
   * account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts).
   * For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. *
   * `group:{emailid}`: An email address that represents a Google group. For
   * example, `admins@example.com`. * `domain:{domain}`: The G Suite domain
   * (primary) that represents all the users of that domain. For example,
   * `google.com` or `example.com`. * `deleted:user:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a user that has been
   * recently deleted. For example,
   * `alice@example.com?uid=123456789012345678901`. If the user is recovered,
   * this value reverts to `user:{emailid}` and the recovered user retains the
   * role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`:
   * An email address (plus unique identifier) representing a service account
   * that has been recently deleted. For example,
   * `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If
   * the service account is undeleted, this value reverts to
   * `serviceAccount:{emailid}` and the undeleted service account retains the
   * role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email
   * address (plus unique identifier) representing a Google group that has been
   * recently deleted. For example,
   * `admins@example.com?uid=123456789012345678901`. If the group is recovered,
   * this value reverts to `group:{emailid}` and the recovered group retains the
   * role in the binding.
   */
  members?: string[];
  /**
   * Role that is assigned to the list of `members`, or principals. For
   * example, `roles/viewer`, `roles/editor`, or `roles/owner`.
   */
  role?: string;
}

/**
 * The IAM conditions context.
 */
export interface ConditionContext {
  /**
   * The hypothetical access timestamp to evaluate IAM conditions. Note that
   * this value must not be earlier than the current time; otherwise, an
   * INVALID_ARGUMENT error will be returned.
   */
  accessTime?: Date;
}

function serializeConditionContext(data: any): ConditionContext {
  return {
    ...data,
    accessTime: data["accessTime"] !== undefined ? data["accessTime"].toISOString() : undefined,
  };
}

function deserializeConditionContext(data: any): ConditionContext {
  return {
    ...data,
    accessTime: data["accessTime"] !== undefined ? new Date(data["accessTime"]) : undefined,
  };
}

/**
 * The Condition evaluation.
 */
export interface ConditionEvaluation {
  /**
   * The evaluation result.
   */
  evaluationValue?:  | "EVALUATION_VALUE_UNSPECIFIED" | "TRUE" | "FALSE" | "CONDITIONAL";
}

/**
 * Create asset feed request.
 */
export interface CreateFeedRequest {
  /**
   * Required. The feed details. The field `name` must be empty and it will be
   * generated in the format of: projects/project_number/feeds/feed_id
   * folders/folder_number/feeds/feed_id
   * organizations/organization_number/feeds/feed_id
   */
  feed?: Feed;
  /**
   * Required. This is the client-assigned asset feed identifier and it needs
   * to be unique under a specific parent project/folder/organization.
   */
  feedId?: string;
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
 * Additional options for CloudAsset#effectiveIamPoliciesBatchGet.
 */
export interface EffectiveIamPoliciesBatchGetOptions {
  /**
   * Required. The names refer to the [full_resource_names]
   * (https://cloud.google.com/asset-inventory/docs/resource-name-format) of
   * [searchable asset
   * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types#searchable_asset_types).
   * A maximum of 20 resources' effective policies can be retrieved in a batch.
   */
  names?: string;
}

/**
 * The effective IAM policies on one resource.
 */
export interface EffectiveIamPolicy {
  /**
   * The [full_resource_name]
   * (https://cloud.google.com/asset-inventory/docs/resource-name-format) for
   * which the policies are computed. This is one of the
   * BatchGetEffectiveIamPoliciesRequest.names the caller provides in the
   * request.
   */
  fullResourceName?: string;
  /**
   * The effective policies for the full_resource_name. These policies include
   * the policy set on the full_resource_name and those set on its parents and
   * ancestors up to the BatchGetEffectiveIamPoliciesRequest.scope. Note that
   * these policies are not filtered according to the resource type of the
   * full_resource_name. These policies are hierarchically ordered by
   * PolicyInfo.attached_resource starting from full_resource_name itself to its
   * parents and ancestors, such that policies[i]'s PolicyInfo.attached_resource
   * is the child of policies[i+1]'s PolicyInfo.attached_resource, if
   * policies[i+1] exists.
   */
  policies?: PolicyInfo[];
}

function serializeEffectiveIamPolicy(data: any): EffectiveIamPolicy {
  return {
    ...data,
    policies: data["policies"] !== undefined ? data["policies"].map((item: any) => (serializePolicyInfo(item))) : undefined,
  };
}

function deserializeEffectiveIamPolicy(data: any): EffectiveIamPolicy {
  return {
    ...data,
    policies: data["policies"] !== undefined ? data["policies"].map((item: any) => (deserializePolicyInfo(item))) : undefined,
  };
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
 * Explanation about the IAM policy search result.
 */
export interface Explanation {
  /**
   * The map from roles to their included permissions that match the permission
   * query (i.e., a query containing `policy.role.permissions:`). Example: if
   * query `policy.role.permissions:compute.disk.get` matches a policy binding
   * that contains owner role, the matched_permissions will be `{"roles/owner":
   * ["compute.disk.get"]}`. The roles can also be found in the returned
   * `policy` bindings. Note that the map is populated only for requests with
   * permission queries.
   */
  matchedPermissions?: {
    [key: string]: Permissions
  };
}

/**
 * Export asset request.
 */
export interface ExportAssetsRequest {
  /**
   * A list of asset types to take a snapshot for. For example:
   * "compute.googleapis.com/Disk". Regular expressions are also supported. For
   * example: * "compute.googleapis.com.*" snapshots resources whose asset type
   * starts with "compute.googleapis.com". * ".*Instance" snapshots resources
   * whose asset type ends with "Instance". * ".*Instance.*" snapshots resources
   * whose asset type contains "Instance". See
   * [RE2](https://github.com/google/re2/wiki/Syntax) for all supported regular
   * expression syntax. If the regular expression does not match any supported
   * asset type, an INVALID_ARGUMENT error will be returned. If specified, only
   * matching assets will be returned, otherwise, it will snapshot all asset
   * types. See [Introduction to Cloud Asset
   * Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all
   * supported asset types.
   */
  assetTypes?: string[];
  /**
   * Asset content type. If not specified, no content but the asset name will
   * be returned.
   */
  contentType?:  | "CONTENT_TYPE_UNSPECIFIED" | "RESOURCE" | "IAM_POLICY" | "ORG_POLICY" | "ACCESS_POLICY" | "OS_INVENTORY" | "RELATIONSHIP";
  /**
   * Required. Output configuration indicating where the results will be output
   * to.
   */
  outputConfig?: OutputConfig;
  /**
   * Timestamp to take an asset snapshot. This can only be set to a timestamp
   * between the current time and the current time minus 35 days (inclusive). If
   * not specified, the current time will be used. Due to delays in resource
   * data collection and indexing, there is a volatile window during which
   * running the same query may get different results.
   */
  readTime?: Date;
  /**
   * A list of relationship types to export, for example:
   * `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if
   * content_type=RELATIONSHIP. * If specified: it snapshots specified
   * relationships. It returns an error if any of the [relationship_types]
   * doesn't belong to the supported relationship types of the [asset_types] or
   * if any of the [asset_types] doesn't belong to the source types of the
   * [relationship_types]. * Otherwise: it snapshots the supported relationships
   * for all [asset_types] or returns an error if any of the [asset_types] has
   * no relationship support. An unspecified asset types field means all
   * supported asset_types. See [Introduction to Cloud Asset
   * Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all
   * supported asset types and relationship types.
   */
  relationshipTypes?: string[];
}

function serializeExportAssetsRequest(data: any): ExportAssetsRequest {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeExportAssetsRequest(data: any): ExportAssetsRequest {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

/**
 * Represents a textual expression in the Common Expression Language (CEL)
 * syntax. CEL is a C-like expression language. The syntax and semantics of CEL
 * are documented at https://github.com/google/cel-spec. Example (Comparison):
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
 * An asset feed used to export asset updates to a destinations. An asset feed
 * filter controls what updates are exported. The asset feed must be created
 * within a project, organization, or folder. Supported destinations are:
 * Pub/Sub topics.
 */
export interface Feed {
  /**
   * A list of the full names of the assets to receive updates. You must
   * specify either or both of asset_names and asset_types. Only asset updates
   * matching specified asset_names or asset_types are exported to the feed.
   * Example:
   * `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`.
   * For a list of the full names for supported asset types, see [Resource name
   * format](/asset-inventory/docs/resource-name-format).
   */
  assetNames?: string[];
  /**
   * A list of types of the assets to receive updates. You must specify either
   * or both of asset_names and asset_types. Only asset updates matching
   * specified asset_names or asset_types are exported to the feed. Example:
   * `"compute.googleapis.com/Disk"` For a list of all supported asset types,
   * see [Supported asset types](/asset-inventory/docs/supported-asset-types).
   */
  assetTypes?: string[];
  /**
   * A condition which determines whether an asset update should be published.
   * If specified, an asset will be returned only when the expression evaluates
   * to true. When set, `expression` field in the `Expr` must be a valid [CEL
   * expression] (https://github.com/google/cel-spec) on a TemporalAsset with
   * name `temporal_asset`. Example: a Feed with expression
   * ("temporal_asset.deleted == true") will only publish Asset deletions. Other
   * fields of `Expr` are optional. See our [user
   * guide](https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes-with-condition)
   * for detailed instructions.
   */
  condition?: Expr;
  /**
   * Asset content type. If not specified, no content but the asset name and
   * type will be returned.
   */
  contentType?:  | "CONTENT_TYPE_UNSPECIFIED" | "RESOURCE" | "IAM_POLICY" | "ORG_POLICY" | "ACCESS_POLICY" | "OS_INVENTORY" | "RELATIONSHIP";
  /**
   * Required. Feed output configuration defining where the asset updates are
   * published to.
   */
  feedOutputConfig?: FeedOutputConfig;
  /**
   * Required. The format will be
   * projects/{project_number}/feeds/{client-assigned_feed_identifier} or
   * folders/{folder_number}/feeds/{client-assigned_feed_identifier} or
   * organizations/{organization_number}/feeds/{client-assigned_feed_identifier}
   * The client-assigned feed identifier must be unique within the parent
   * project/folder/organization.
   */
  name?: string;
  /**
   * A list of relationship types to output, for example:
   * `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if
   * content_type=RELATIONSHIP. * If specified: it outputs specified
   * relationship updates on the [asset_names] or the [asset_types]. It returns
   * an error if any of the [relationship_types] doesn't belong to the supported
   * relationship types of the [asset_names] or [asset_types], or any of the
   * [asset_names] or the [asset_types] doesn't belong to the source types of
   * the [relationship_types]. * Otherwise: it outputs the supported
   * relationships of the types of [asset_names] and [asset_types] or returns an
   * error if any of the [asset_names] or the [asset_types] has no replationship
   * support. See [Introduction to Cloud Asset
   * Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all
   * supported asset types and relationship types.
   */
  relationshipTypes?: string[];
}

/**
 * Output configuration for asset feed destination.
 */
export interface FeedOutputConfig {
  /**
   * Destination on Pub/Sub.
   */
  pubsubDestination?: PubsubDestination;
}

/**
 * A Cloud Storage location.
 */
export interface GcsDestination {
  /**
   * The URI of the Cloud Storage object. It's the same URI that is used by
   * gsutil. Example: "gs://bucket_name/object_name". See [Viewing and Editing
   * Object
   * Metadata](https://cloud.google.com/storage/docs/viewing-editing-metadata)
   * for more information. If the specified Cloud Storage object already exists
   * and there is no [hold](https://cloud.google.com/storage/docs/object-holds),
   * it will be overwritten with the exported result.
   */
  uri?: string;
  /**
   * The URI prefix of all generated Cloud Storage objects. Example:
   * "gs://bucket_name/object_name_prefix". Each object URI is in format:
   * "gs://bucket_name/object_name_prefix// and only contains assets for that
   * type. starts from 0. Example:
   * "gs://bucket_name/object_name_prefix/compute.googleapis.com/Disk/0" is the
   * first shard of output objects containing all compute.googleapis.com/Disk
   * assets. An INVALID_ARGUMENT error will be returned if file with the same
   * name "gs://bucket_name/object_name_prefix" already exists.
   */
  uriPrefix?: string;
}

/**
 * An IAM role or permission under analysis.
 */
export interface GoogleCloudAssetV1Access {
  /**
   * The analysis state of this access.
   */
  analysisState?: IamPolicyAnalysisState;
  /**
   * The permission.
   */
  permission?: string;
  /**
   * The role.
   */
  role?: string;
}

/**
 * An access control list, derived from the above IAM policy binding, which
 * contains a set of resources and accesses. May include one item from each set
 * to compose an access control entry. NOTICE that there could be multiple
 * access control lists for one IAM policy binding. The access control lists are
 * created based on resource and access combinations. For example, assume we
 * have the following cases in one IAM policy binding: - Permission P1 and P2
 * apply to resource R1 and R2; - Permission P3 applies to resource R2 and R3;
 * This will result in the following access control lists: - AccessControlList
 * 1: [R1, R2], [P1, P2] - AccessControlList 2: [R2, R3], [P3]
 */
export interface GoogleCloudAssetV1AccessControlList {
  /**
   * The accesses that match one of the following conditions: - The
   * access_selector, if it is specified in request; - Otherwise, access
   * specifiers reachable from the policy binding's role.
   */
  accesses?: GoogleCloudAssetV1Access[];
  /**
   * Condition evaluation for this AccessControlList, if there is a condition
   * defined in the above IAM policy binding.
   */
  conditionEvaluation?: ConditionEvaluation;
  /**
   * Resource edges of the graph starting from the policy attached resource to
   * any descendant resources. The Edge.source_node contains the full resource
   * name of a parent resource and Edge.target_node contains the full resource
   * name of a child resource. This field is present only if the
   * output_resource_edges option is enabled in request.
   */
  resourceEdges?: GoogleCloudAssetV1Edge[];
  /**
   * The resources that match one of the following conditions: - The
   * resource_selector, if it is specified in request; - Otherwise, resources
   * reachable from the policy attached resource.
   */
  resources?: GoogleCloudAssetV1Resource[];
}

/**
 * Represents a Google Cloud asset(resource or IAM policy) governed by the
 * organization policies of the
 * AnalyzeOrgPolicyGovernedAssetsRequest.constraint.
 */
export interface GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset {
  /**
   * The consolidated policy for the analyzed asset. The consolidated policy is
   * computed by merging and evaluating
   * AnalyzeOrgPolicyGovernedAssetsResponse.GovernedAsset.policy_bundle. The
   * evaluation will respect the organization policy [hierarchy
   * rules](https://cloud.google.com/resource-manager/docs/organization-policy/understanding-hierarchy).
   */
  consolidatedPolicy?: AnalyzerOrgPolicy;
  /**
   * An IAM policy governed by the organization policies of the
   * AnalyzeOrgPolicyGovernedAssetsRequest.constraint.
   */
  governedIamPolicy?: GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy;
  /**
   * A Google Cloud resource governed by the organization policies of the
   * AnalyzeOrgPolicyGovernedAssetsRequest.constraint.
   */
  governedResource?: GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedResource;
  /**
   * The ordered list of all organization policies from the
   * AnalyzeOrgPoliciesResponse.OrgPolicyResult.consolidated_policy.attached_resource
   * to the scope specified in the request. If the constraint is defined with
   * default policy, it will also appear in the list.
   */
  policyBundle?: AnalyzerOrgPolicy[];
}

function serializeGoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset(data: any): GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset {
  return {
    ...data,
    governedIamPolicy: data["governedIamPolicy"] !== undefined ? serializeGoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy(data["governedIamPolicy"]) : undefined,
  };
}

function deserializeGoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset(data: any): GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedAsset {
  return {
    ...data,
    governedIamPolicy: data["governedIamPolicy"] !== undefined ? deserializeGoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy(data["governedIamPolicy"]) : undefined,
  };
}

/**
 * The IAM policies governed by the organization policies of the
 * AnalyzeOrgPolicyGovernedAssetsRequest.constraint.
 */
export interface GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy {
  /**
   * The full resource name of the resource associated with this IAM policy.
   * Example:
   * `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`.
   * See [Cloud Asset Inventory Resource Name
   * Format](https://cloud.google.com/asset-inventory/docs/resource-name-format)
   * for more information.
   */
  attachedResource?: string;
  /**
   * The folder(s) that this IAM policy belongs to, in the format of
   * folders/{FOLDER_NUMBER}. This field is available when the IAM policy
   * belongs (directly or cascadingly) to one or more folders.
   */
  folders?: string[];
  /**
   * The organization that this IAM policy belongs to, in the format of
   * organizations/{ORGANIZATION_NUMBER}. This field is available when the IAM
   * policy belongs (directly or cascadingly) to an organization.
   */
  organization?: string;
  /**
   * The IAM policy directly set on the given resource.
   */
  policy?: Policy;
  /**
   * The project that this IAM policy belongs to, in the format of
   * projects/{PROJECT_NUMBER}. This field is available when the IAM policy
   * belongs to a project.
   */
  project?: string;
}

function serializeGoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy(data: any): GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
  };
}

function deserializeGoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy(data: any): GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedIamPolicy {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
  };
}

/**
 * The Google Cloud resources governed by the organization policies of the
 * AnalyzeOrgPolicyGovernedAssetsRequest.constraint.
 */
export interface GoogleCloudAssetV1AnalyzeOrgPolicyGovernedAssetsResponseGovernedResource {
  /**
   * The folder(s) that this resource belongs to, in the format of
   * folders/{FOLDER_NUMBER}. This field is available when the resource belongs
   * (directly or cascadingly) to one or more folders.
   */
  folders?: string[];
  /**
   * The [full resource name]
   * (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the
   * Google Cloud resource.
   */
  fullResourceName?: string;
  /**
   * The organization that this resource belongs to, in the format of
   * organizations/{ORGANIZATION_NUMBER}. This field is available when the
   * resource belongs (directly or cascadingly) to an organization.
   */
  organization?: string;
  /**
   * The [full resource name]
   * (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the
   * parent of
   * AnalyzeOrgPolicyGovernedAssetsResponse.GovernedResource.full_resource_name.
   */
  parent?: string;
  /**
   * The project that this resource belongs to, in the format of
   * projects/{PROJECT_NUMBER}. This field is available when the resource
   * belongs to a project.
   */
  project?: string;
}

/**
 * A BigQuery destination.
 */
export interface GoogleCloudAssetV1BigQueryDestination {
  /**
   * Required. The BigQuery dataset in format
   * "projects/projectId/datasets/datasetId", to which the analysis results
   * should be exported. If this dataset does not exist, the export call will
   * return an INVALID_ARGUMENT error.
   */
  dataset?: string;
  /**
   * The partition key for BigQuery partitioned table.
   */
  partitionKey?:  | "PARTITION_KEY_UNSPECIFIED" | "REQUEST_TIME";
  /**
   * Required. The prefix of the BigQuery tables to which the analysis results
   * will be written. Tables will be created based on this table_prefix if not
   * exist: * _analysis table will contain export operation's metadata. *
   * _analysis_result will contain all the IamPolicyAnalysisResult. When
   * [partition_key] is specified, both tables will be partitioned based on the
   * [partition_key].
   */
  tablePrefix?: string;
  /**
   * Optional. Specifies the action that occurs if the destination table or
   * partition already exists. The following values are supported: *
   * WRITE_TRUNCATE: If the table or partition already exists, BigQuery
   * overwrites the entire table or all the partitions data. * WRITE_APPEND: If
   * the table or partition already exists, BigQuery appends the data to the
   * table or the latest partition. * WRITE_EMPTY: If the table already exists
   * and contains data, an error is returned. The default value is WRITE_APPEND.
   * Each action is atomic and only occurs if BigQuery is able to complete the
   * job successfully. Details are at
   * https://cloud.google.com/bigquery/docs/loading-data-local#appending_to_or_overwriting_a_table_using_a_local_file.
   */
  writeDisposition?: string;
}

/**
 * A `Constraint` that is either enforced or not. For example a constraint
 * `constraints/compute.disableSerialPortAccess`. If it is enforced on a VM
 * instance, serial port connections will not be opened to that instance.
 */
export interface GoogleCloudAssetV1BooleanConstraint {
}

/**
 * The definition of a constraint.
 */
export interface GoogleCloudAssetV1Constraint {
  /**
   * Defines this constraint as being a BooleanConstraint.
   */
  booleanConstraint?: GoogleCloudAssetV1BooleanConstraint;
  /**
   * The evaluation behavior of this constraint in the absence of 'Policy'.
   */
  constraintDefault?:  | "CONSTRAINT_DEFAULT_UNSPECIFIED" | "ALLOW" | "DENY";
  /**
   * Detailed description of what this `Constraint` controls as well as how and
   * where it is enforced.
   */
  description?: string;
  /**
   * The human readable name of the constraint.
   */
  displayName?: string;
  /**
   * Defines this constraint as being a ListConstraint.
   */
  listConstraint?: GoogleCloudAssetV1ListConstraint;
  /**
   * The unique name of the constraint. Format of the name should be *
   * `constraints/{constraint_name}` For example,
   * `constraints/compute.disableSerialPortAccess`.
   */
  name?: string;
}

/**
 * The definition of a custom constraint.
 */
export interface GoogleCloudAssetV1CustomConstraint {
  /**
   * Allow or deny type.
   */
  actionType?:  | "ACTION_TYPE_UNSPECIFIED" | "ALLOW" | "DENY";
  /**
   * Organization Policy condition/expression. For example:
   * `resource.instanceName.matches("[production|test]_.*_(\d)+")'` or,
   * `resource.management.auto_upgrade == true`
   */
  condition?: string;
  /**
   * Detailed information about this custom policy constraint.
   */
  description?: string;
  /**
   * One line display name for the UI.
   */
  displayName?: string;
  /**
   * All the operations being applied for this constraint.
   */
  methodTypes?:  | "METHOD_TYPE_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE"[];
  /**
   * Name of the constraint. This is unique within the organization. Format of
   * the name should be *
   * `organizations/{organization_id}/customConstraints/{custom_constraint_id}`
   * Example : "organizations/123/customConstraints/custom.createOnlyE2TypeVms"
   */
  name?: string;
  /**
   * The Resource Instance type on which this policy applies to. Format will be
   * of the form : "/" Example: * `compute.googleapis.com/Instance`.
   */
  resourceTypes?: string[];
}

/**
 * A directional edge.
 */
export interface GoogleCloudAssetV1Edge {
  /**
   * The source node of the edge. For example, it could be a full resource name
   * for a resource node or an email of an identity.
   */
  sourceNode?: string;
  /**
   * The target node of the edge. For example, it could be a full resource name
   * for a resource node or an email of an identity.
   */
  targetNode?: string;
}

/**
 * A Cloud Storage location.
 */
export interface GoogleCloudAssetV1GcsDestination {
  /**
   * Required. The URI of the Cloud Storage object. It's the same URI that is
   * used by gsutil. Example: "gs://bucket_name/object_name". See [Viewing and
   * Editing Object
   * Metadata](https://cloud.google.com/storage/docs/viewing-editing-metadata)
   * for more information. If the specified Cloud Storage object already exists
   * and there is no [hold](https://cloud.google.com/storage/docs/object-holds),
   * it will be overwritten with the analysis result.
   */
  uri?: string;
}

/**
 * The organization/folder/project resource governed by organization policies
 * of AnalyzeOrgPolicyGovernedContainersRequest.constraint.
 */
export interface GoogleCloudAssetV1GovernedContainer {
  /**
   * The consolidated organization policy for the analyzed resource. The
   * consolidated organization policy is computed by merging and evaluating
   * AnalyzeOrgPolicyGovernedContainersResponse.GovernedContainer.policy_bundle.
   * The evaluation will respect the organization policy [hierarchy
   * rules](https://cloud.google.com/resource-manager/docs/organization-policy/understanding-hierarchy).
   */
  consolidatedPolicy?: AnalyzerOrgPolicy;
  /**
   * The [full resource name]
   * (https://cloud.google.com/asset-inventory/docs/resource-name-format) of an
   * organization/folder/project resource.
   */
  fullResourceName?: string;
  /**
   * The [full resource name]
   * (https://cloud.google.com/asset-inventory/docs/resource-name-format) of the
   * parent of
   * AnalyzeOrgPolicyGovernedContainersResponse.GovernedContainer.full_resource_name.
   */
  parent?: string;
  /**
   * The ordered list of all organization policies from the
   * AnalyzeOrgPoliciesResponse.OrgPolicyResult.consolidated_policy.attached_resource.
   * to the scope specified in the request. If the constraint is defined with
   * default policy, it will also appear in the list.
   */
  policyBundle?: AnalyzerOrgPolicy[];
}

/**
 * An identity under analysis.
 */
export interface GoogleCloudAssetV1Identity {
  /**
   * The analysis state of this identity.
   */
  analysisState?: IamPolicyAnalysisState;
  /**
   * The identity name in any form of members appear in [IAM policy
   * binding](https://cloud.google.com/iam/reference/rest/v1/Binding), such as:
   * - user:foo@google.com - group:group1@google.com -
   * serviceAccount:s1@prj1.iam.gserviceaccount.com -
   * projectOwner:some_project_id - domain:google.com - allUsers - etc.
   */
  name?: string;
}

/**
 * The identities and group edges.
 */
export interface GoogleCloudAssetV1IdentityList {
  /**
   * Group identity edges of the graph starting from the binding's group
   * members to any node of the identities. The Edge.source_node contains a
   * group, such as `group:parent@google.com`. The Edge.target_node contains a
   * member of the group, such as `group:child@google.com` or
   * `user:foo@google.com`. This field is present only if the output_group_edges
   * option is enabled in request.
   */
  groupEdges?: GoogleCloudAssetV1Edge[];
  /**
   * Only the identities that match one of the following conditions will be
   * presented: - The identity_selector, if it is specified in request; -
   * Otherwise, identities reachable from the policy binding's members.
   */
  identities?: GoogleCloudAssetV1Identity[];
}

/**
 * A `Constraint` that allows or disallows a list of string values, which are
 * configured by an organization's policy administrator with a `Policy`.
 */
export interface GoogleCloudAssetV1ListConstraint {
  /**
   * Indicates whether values grouped into categories can be used in
   * `Policy.allowed_values` and `Policy.denied_values`. For example,
   * `"in:Python"` would match any value in the 'Python' group.
   */
  supportsIn?: boolean;
  /**
   * Indicates whether subtrees of Cloud Resource Manager resource hierarchy
   * can be used in `Policy.allowed_values` and `Policy.denied_values`. For
   * example, `"under:folders/123"` would match any resource under the
   * 'folders/123' folder.
   */
  supportsUnder?: boolean;
}

/**
 * An asset in Google Cloud. An asset can be any resource in the Google Cloud
 * [resource
 * hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy),
 * a resource outside the Google Cloud resource hierarchy (such as Google
 * Kubernetes Engine clusters and objects), or a policy (e.g. IAM policy). See
 * [Supported asset
 * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types)
 * for more information.
 */
export interface GoogleCloudAssetV1p7beta1Asset {
  /**
   * Please also refer to the [access level user
   * guide](https://cloud.google.com/access-context-manager/docs/overview#access-levels).
   */
  accessLevel?: GoogleIdentityAccesscontextmanagerV1AccessLevel;
  /**
   * Please also refer to the [access policy user
   * guide](https://cloud.google.com/access-context-manager/docs/overview#access-policies).
   */
  accessPolicy?: GoogleIdentityAccesscontextmanagerV1AccessPolicy;
  /**
   * The ancestry path of an asset in Google Cloud [resource
   * hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy),
   * represented as a list of relative resource names. An ancestry path starts
   * with the closest ancestor in the hierarchy and ends at root. If the asset
   * is a project, folder, or organization, the ancestry path starts from the
   * asset itself. Example: `["projects/123456789", "folders/5432",
   * "organizations/1234"]`
   */
  ancestors?: string[];
  /**
   * The type of the asset. Example: `compute.googleapis.com/Disk` See
   * [Supported asset
   * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types)
   * for more information.
   */
  assetType?: string;
  /**
   * A representation of the IAM policy set on a Google Cloud resource. There
   * can be a maximum of one IAM policy set on any given resource. In addition,
   * IAM policies inherit their granted access scope from any policies set on
   * parent resources in the resource hierarchy. Therefore, the effectively
   * policy is the union of both the policy set on this resource and each policy
   * set on all of the resource's ancestry resource levels in the hierarchy. See
   * [this topic](https://cloud.google.com/iam/help/allow-policies/inheritance)
   * for more information.
   */
  iamPolicy?: Policy;
  /**
   * The full name of the asset. Example:
   * `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`
   * See [Resource
   * names](https://cloud.google.com/apis/design/resource_names#full_resource_name)
   * for more information.
   */
  name?: string;
  /**
   * A representation of an [organization
   * policy](https://cloud.google.com/resource-manager/docs/organization-policy/overview#organization_policy).
   * There can be more than one organization policy with different constraints
   * set on a given resource.
   */
  orgPolicy?: GoogleCloudOrgpolicyV1Policy[];
  /**
   * The related assets of the asset of one relationship type. One asset only
   * represents one type of relationship.
   */
  relatedAssets?: GoogleCloudAssetV1p7beta1RelatedAssets;
  /**
   * A representation of the resource.
   */
  resource?: GoogleCloudAssetV1p7beta1Resource;
  /**
   * Please also refer to the [service perimeter user
   * guide](https://cloud.google.com/vpc-service-controls/docs/overview).
   */
  servicePerimeter?: GoogleIdentityAccesscontextmanagerV1ServicePerimeter;
  /**
   * The last update timestamp of an asset. update_time is updated when
   * create/update/delete operation is performed.
   */
  updateTime?: Date;
}

function serializeGoogleCloudAssetV1p7beta1Asset(data: any): GoogleCloudAssetV1p7beta1Asset {
  return {
    ...data,
    iamPolicy: data["iamPolicy"] !== undefined ? serializePolicy(data["iamPolicy"]) : undefined,
    orgPolicy: data["orgPolicy"] !== undefined ? data["orgPolicy"].map((item: any) => (serializeGoogleCloudOrgpolicyV1Policy(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudAssetV1p7beta1Asset(data: any): GoogleCloudAssetV1p7beta1Asset {
  return {
    ...data,
    iamPolicy: data["iamPolicy"] !== undefined ? deserializePolicy(data["iamPolicy"]) : undefined,
    orgPolicy: data["orgPolicy"] !== undefined ? data["orgPolicy"].map((item: any) => (deserializeGoogleCloudOrgpolicyV1Policy(item))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * An asset identify in Google Cloud which contains its name, type and
 * ancestors. An asset can be any resource in the Google Cloud [resource
 * hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy),
 * a resource outside the Google Cloud resource hierarchy (such as Google
 * Kubernetes Engine clusters and objects), or a policy (e.g. IAM policy). See
 * [Supported asset
 * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types)
 * for more information.
 */
export interface GoogleCloudAssetV1p7beta1RelatedAsset {
  /**
   * The ancestors of an asset in Google Cloud [resource
   * hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy),
   * represented as a list of relative resource names. An ancestry path starts
   * with the closest ancestor in the hierarchy and ends at root. Example:
   * `["projects/123456789", "folders/5432", "organizations/1234"]`
   */
  ancestors?: string[];
  /**
   * The full name of the asset. Example:
   * `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`
   * See [Resource
   * names](https://cloud.google.com/apis/design/resource_names#full_resource_name)
   * for more information.
   */
  asset?: string;
  /**
   * The type of the asset. Example: `compute.googleapis.com/Disk` See
   * [Supported asset
   * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types)
   * for more information.
   */
  assetType?: string;
}

/**
 * The detailed related assets with the `relationship_type`.
 */
export interface GoogleCloudAssetV1p7beta1RelatedAssets {
  /**
   * The peer resources of the relationship.
   */
  assets?: GoogleCloudAssetV1p7beta1RelatedAsset[];
  /**
   * The detailed relation attributes.
   */
  relationshipAttributes?: GoogleCloudAssetV1p7beta1RelationshipAttributes;
}

/**
 * The relationship attributes which include `type`, `source_resource_type`,
 * `target_resource_type` and `action`.
 */
export interface GoogleCloudAssetV1p7beta1RelationshipAttributes {
  /**
   * The detail of the relationship, e.g. `contains`, `attaches`
   */
  action?: string;
  /**
   * The source asset type. Example: `compute.googleapis.com/Instance`
   */
  sourceResourceType?: string;
  /**
   * The target asset type. Example: `compute.googleapis.com/Disk`
   */
  targetResourceType?: string;
  /**
   * The unique identifier of the relationship type. Example:
   * `INSTANCE_TO_INSTANCEGROUP`
   */
  type?: string;
}

/**
 * A representation of a Google Cloud resource.
 */
export interface GoogleCloudAssetV1p7beta1Resource {
  /**
   * The content of the resource, in which some sensitive fields are removed
   * and may not be present.
   */
  data?: {
    [key: string]: any
  };
  /**
   * The URL of the discovery document containing the resource's JSON schema.
   * Example: `https://www.googleapis.com/discovery/v1/apis/compute/v1/rest`
   * This value is unspecified for resources that do not have an API based on a
   * discovery document, such as Cloud Bigtable.
   */
  discoveryDocumentUri?: string;
  /**
   * The JSON schema name listed in the discovery document. Example: `Project`
   * This value is unspecified for resources that do not have an API based on a
   * discovery document, such as Cloud Bigtable.
   */
  discoveryName?: string;
  /**
   * The location of the resource in Google Cloud, such as its zone and region.
   * For more information, see https://cloud.google.com/about/locations/.
   */
  location?: string;
  /**
   * The full name of the immediate parent of this resource. See [Resource
   * Names](https://cloud.google.com/apis/design/resource_names#full_resource_name)
   * for more information. For Google Cloud assets, this value is the parent
   * resource defined in the [IAM policy
   * hierarchy](https://cloud.google.com/iam/docs/overview#policy_hierarchy).
   * Example: `//cloudresourcemanager.googleapis.com/projects/my_project_123`
   * For third-party assets, this field may be set differently.
   */
  parent?: string;
  /**
   * The REST URL for accessing the resource. An HTTP `GET` request using this
   * URL returns the resource itself. Example:
   * `https://cloudresourcemanager.googleapis.com/v1/projects/my-project-123`
   * This value is unspecified for resources without a REST API.
   */
  resourceUrl?: string;
  /**
   * The API version. Example: `v1`
   */
  version?: string;
}

/**
 * BigQuery destination.
 */
export interface GoogleCloudAssetV1QueryAssetsOutputConfigBigQueryDestination {
  /**
   * Required. The BigQuery dataset where the query results will be saved. It
   * has the format of "projects/{projectId}/datasets/{datasetId}".
   */
  dataset?: string;
  /**
   * Required. The BigQuery table where the query results will be saved. If
   * this table does not exist, a new table with the given name will be created.
   */
  table?: string;
  /**
   * Specifies the action that occurs if the destination table or partition
   * already exists. The following values are supported: * WRITE_TRUNCATE: If
   * the table or partition already exists, BigQuery overwrites the entire table
   * or all the partitions data. * WRITE_APPEND: If the table or partition
   * already exists, BigQuery appends the data to the table or the latest
   * partition. * WRITE_EMPTY: If the table already exists and contains data, a
   * 'duplicate' error is returned in the job result. The default value is
   * WRITE_EMPTY.
   */
  writeDisposition?: string;
}

/**
 * A Google Cloud resource under analysis.
 */
export interface GoogleCloudAssetV1Resource {
  /**
   * The analysis state of this resource.
   */
  analysisState?: IamPolicyAnalysisState;
  /**
   * The [full resource
   * name](https://cloud.google.com/asset-inventory/docs/resource-name-format)
   */
  fullResourceName?: string;
}

/**
 * Represents a rule defined in an organization policy
 */
export interface GoogleCloudAssetV1Rule {
  /**
   * Setting this to true means that all values are allowed. This field can be
   * set only in Policies for list constraints.
   */
  allowAll?: boolean;
  /**
   * The evaluating condition for this rule.
   */
  condition?: Expr;
  /**
   * Setting this to true means that all values are denied. This field can be
   * set only in Policies for list constraints.
   */
  denyAll?: boolean;
  /**
   * If `true`, then the `Policy` is enforced. If `false`, then any
   * configuration is acceptable. This field can be set only in Policies for
   * boolean constraints.
   */
  enforce?: boolean;
  /**
   * List of values to be used for this PolicyRule. This field can be set only
   * in Policies for list constraints.
   */
  values?: GoogleCloudAssetV1StringValues;
}

/**
 * The string values for the list constraints.
 */
export interface GoogleCloudAssetV1StringValues {
  /**
   * List of values allowed at this resource.
   */
  allowedValues?: string[];
  /**
   * List of values denied at this resource.
   */
  deniedValues?: string[];
}

/**
 * Used in `policy_type` to specify how `boolean_policy` will behave at this
 * resource.
 */
export interface GoogleCloudOrgpolicyV1BooleanPolicy {
  /**
   * If `true`, then the `Policy` is enforced. If `false`, then any
   * configuration is acceptable. Suppose you have a `Constraint`
   * `constraints/compute.disableSerialPortAccess` with `constraint_default` set
   * to `ALLOW`. A `Policy` for that `Constraint` exhibits the following
   * behavior: - If the `Policy` at this resource has enforced set to `false`,
   * serial port connection attempts will be allowed. - If the `Policy` at this
   * resource has enforced set to `true`, serial port connection attempts will
   * be refused. - If the `Policy` at this resource is `RestoreDefault`, serial
   * port connection attempts will be allowed. - If no `Policy` is set at this
   * resource or anywhere higher in the resource hierarchy, serial port
   * connection attempts will be allowed. - If no `Policy` is set at this
   * resource, but one exists higher in the resource hierarchy, the behavior is
   * as if the`Policy` were set at this resource. The following examples
   * demonstrate the different possible layerings: Example 1 (nearest
   * `Constraint` wins): `organizations/foo` has a `Policy` with: {enforced:
   * false} `projects/bar` has no `Policy` set. The constraint at `projects/bar`
   * and `organizations/foo` will not be enforced. Example 2 (enforcement gets
   * replaced): `organizations/foo` has a `Policy` with: {enforced: false}
   * `projects/bar` has a `Policy` with: {enforced: true} The constraint at
   * `organizations/foo` is not enforced. The constraint at `projects/bar` is
   * enforced. Example 3 (RestoreDefault): `organizations/foo` has a `Policy`
   * with: {enforced: true} `projects/bar` has a `Policy` with: {RestoreDefault:
   * {}} The constraint at `organizations/foo` is enforced. The constraint at
   * `projects/bar` is not enforced, because `constraint_default` for the
   * `Constraint` is `ALLOW`.
   */
  enforced?: boolean;
}

/**
 * Used in `policy_type` to specify how `list_policy` behaves at this resource.
 * `ListPolicy` can define specific values and subtrees of Cloud Resource
 * Manager resource hierarchy (`Organizations`, `Folders`, `Projects`) that are
 * allowed or denied by setting the `allowed_values` and `denied_values` fields.
 * This is achieved by using the `under:` and optional `is:` prefixes. The
 * `under:` prefix is used to denote resource subtree values. The `is:` prefix
 * is used to denote specific values, and is required only if the value contains
 * a ":". Values prefixed with "is:" are treated the same as values with no
 * prefix. Ancestry subtrees must be in one of the following formats: -
 * "projects/", e.g. "projects/tokyo-rain-123" - "folders/", e.g. "folders/1234"
 * - "organizations/", e.g. "organizations/1234" The `supports_under` field of
 * the associated `Constraint` defines whether ancestry prefixes can be used.
 * You can set `allowed_values` and `denied_values` in the same `Policy` if
 * `all_values` is `ALL_VALUES_UNSPECIFIED`. `ALLOW` or `DENY` are used to allow
 * or deny all values. If `all_values` is set to either `ALLOW` or `DENY`,
 * `allowed_values` and `denied_values` must be unset.
 */
export interface GoogleCloudOrgpolicyV1ListPolicy {
  /**
   * List of values allowed at this resource. Can only be set if `all_values`
   * is set to `ALL_VALUES_UNSPECIFIED`.
   */
  allowedValues?: string[];
  /**
   * The policy all_values state.
   */
  allValues?:  | "ALL_VALUES_UNSPECIFIED" | "ALLOW" | "DENY";
  /**
   * List of values denied at this resource. Can only be set if `all_values` is
   * set to `ALL_VALUES_UNSPECIFIED`.
   */
  deniedValues?: string[];
  /**
   * Determines the inheritance behavior for this `Policy`. By default, a
   * `ListPolicy` set at a resource supersedes any `Policy` set anywhere up the
   * resource hierarchy. However, if `inherit_from_parent` is set to `true`,
   * then the values from the effective `Policy` of the parent resource are
   * inherited, meaning the values set in this `Policy` are added to the values
   * inherited up the hierarchy. Setting `Policy` hierarchies that inherit both
   * allowed values and denied values isn't recommended in most circumstances to
   * keep the configuration simple and understandable. However, it is possible
   * to set a `Policy` with `allowed_values` set that inherits a `Policy` with
   * `denied_values` set. In this case, the values that are allowed must be in
   * `allowed_values` and not present in `denied_values`. For example, suppose
   * you have a `Constraint` `constraints/serviceuser.services`, which has a
   * `constraint_type` of `list_constraint`, and with `constraint_default` set
   * to `ALLOW`. Suppose that at the Organization level, a `Policy` is applied
   * that restricts the allowed API activations to {`E1`, `E2`}. Then, if a
   * `Policy` is applied to a project below the Organization that has
   * `inherit_from_parent` set to `false` and field all_values set to DENY, then
   * an attempt to activate any API will be denied. The following examples
   * demonstrate different possible layerings for `projects/bar` parented by
   * `organizations/foo`: Example 1 (no inherited values): `organizations/foo`
   * has a `Policy` with values: {allowed_values: "E1" allowed_values:"E2"}
   * `projects/bar` has `inherit_from_parent` `false` and values:
   * {allowed_values: "E3" allowed_values: "E4"} The accepted values at
   * `organizations/foo` are `E1`, `E2`. The accepted values at `projects/bar`
   * are `E3`, and `E4`. Example 2 (inherited values): `organizations/foo` has a
   * `Policy` with values: {allowed_values: "E1" allowed_values:"E2"}
   * `projects/bar` has a `Policy` with values: {value: "E3" value: "E4"
   * inherit_from_parent: true} The accepted values at `organizations/foo` are
   * `E1`, `E2`. The accepted values at `projects/bar` are `E1`, `E2`, `E3`, and
   * `E4`. Example 3 (inheriting both allowed and denied values):
   * `organizations/foo` has a `Policy` with values: {allowed_values: "E1"
   * allowed_values: "E2"} `projects/bar` has a `Policy` with: {denied_values:
   * "E1"} The accepted values at `organizations/foo` are `E1`, `E2`. The value
   * accepted at `projects/bar` is `E2`. Example 4 (RestoreDefault):
   * `organizations/foo` has a `Policy` with values: {allowed_values: "E1"
   * allowed_values:"E2"} `projects/bar` has a `Policy` with values:
   * {RestoreDefault: {}} The accepted values at `organizations/foo` are `E1`,
   * `E2`. The accepted values at `projects/bar` are either all or none
   * depending on the value of `constraint_default` (if `ALLOW`, all; if `DENY`,
   * none). Example 5 (no policy inherits parent policy): `organizations/foo`
   * has no `Policy` set. `projects/bar` has no `Policy` set. The accepted
   * values at both levels are either all or none depending on the value of
   * `constraint_default` (if `ALLOW`, all; if `DENY`, none). Example 6
   * (ListConstraint allowing all): `organizations/foo` has a `Policy` with
   * values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a
   * `Policy` with: {all: ALLOW} The accepted values at `organizations/foo` are
   * `E1`, E2`. Any value is accepted at `projects/bar`. Example 7
   * (ListConstraint allowing none): `organizations/foo` has a `Policy` with
   * values: {allowed_values: "E1" allowed_values: "E2"} `projects/bar` has a
   * `Policy` with: {all: DENY} The accepted values at `organizations/foo` are
   * `E1`, E2`. No value is accepted at `projects/bar`. Example 10 (allowed and
   * denied subtrees of Resource Manager hierarchy): Given the following
   * resource hierarchy O1->{F1, F2}; F1->{P1}; F2->{P2, P3},
   * `organizations/foo` has a `Policy` with values: {allowed_values:
   * "under:organizations/O1"} `projects/bar` has a `Policy` with:
   * {allowed_values: "under:projects/P3"} {denied_values: "under:folders/F2"}
   * The accepted values at `organizations/foo` are `organizations/O1`,
   * `folders/F1`, `folders/F2`, `projects/P1`, `projects/P2`, `projects/P3`.
   * The accepted values at `projects/bar` are `organizations/O1`, `folders/F1`,
   * `projects/P1`.
   */
  inheritFromParent?: boolean;
  /**
   * Optional. The Google Cloud Console will try to default to a configuration
   * that matches the value specified in this `Policy`. If `suggested_value` is
   * not set, it will inherit the value specified higher in the hierarchy,
   * unless `inherit_from_parent` is `false`.
   */
  suggestedValue?: string;
}

/**
 * Defines a Cloud Organization `Policy` which is used to specify `Constraints`
 * for configurations of Cloud Platform resources.
 */
export interface GoogleCloudOrgpolicyV1Policy {
  /**
   * For boolean `Constraints`, whether to enforce the `Constraint` or not.
   */
  booleanPolicy?: GoogleCloudOrgpolicyV1BooleanPolicy;
  /**
   * The name of the `Constraint` the `Policy` is configuring, for example,
   * `constraints/serviceuser.services`. A [list of available
   * constraints](/resource-manager/docs/organization-policy/org-policy-constraints)
   * is available. Immutable after creation.
   */
  constraint?: string;
  /**
   * An opaque tag indicating the current version of the `Policy`, used for
   * concurrency control. When the `Policy` is returned from either a
   * `GetPolicy` or a `ListOrgPolicy` request, this `etag` indicates the version
   * of the current `Policy` to use when executing a read-modify-write loop.
   * When the `Policy` is returned from a `GetEffectivePolicy` request, the
   * `etag` will be unset. When the `Policy` is used in a `SetOrgPolicy` method,
   * use the `etag` value that was returned from a `GetOrgPolicy` request as
   * part of a read-modify-write loop for concurrency control. Not setting the
   * `etag`in a `SetOrgPolicy` request will result in an unconditional write of
   * the `Policy`.
   */
  etag?: Uint8Array;
  /**
   * List of values either allowed or disallowed.
   */
  listPolicy?: GoogleCloudOrgpolicyV1ListPolicy;
  /**
   * Restores the default behavior of the constraint; independent of
   * `Constraint` type.
   */
  restoreDefault?: GoogleCloudOrgpolicyV1RestoreDefault;
  /**
   * The time stamp the `Policy` was previously updated. This is set by the
   * server, not specified by the caller, and represents the last time a call to
   * `SetOrgPolicy` was made for that `Policy`. Any value set by the client will
   * be ignored.
   */
  updateTime?: Date;
  /**
   * Version of the `Policy`. Default version is 0;
   */
  version?: number;
}

function serializeGoogleCloudOrgpolicyV1Policy(data: any): GoogleCloudOrgpolicyV1Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? encodeBase64(data["etag"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudOrgpolicyV1Policy(data: any): GoogleCloudOrgpolicyV1Policy {
  return {
    ...data,
    etag: data["etag"] !== undefined ? decodeBase64(data["etag"] as string) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Ignores policies set above this resource and restores the
 * `constraint_default` enforcement behavior of the specific `Constraint` at
 * this resource. Suppose that `constraint_default` is set to `ALLOW` for the
 * `Constraint` `constraints/serviceuser.services`. Suppose that organization
 * foo.com sets a `Policy` at their Organization resource node that restricts
 * the allowed service activations to deny all service activations. They could
 * then set a `Policy` with the `policy_type` `restore_default` on several
 * experimental projects, restoring the `constraint_default` enforcement of the
 * `Constraint` for only those projects, allowing those projects to have all
 * services activated.
 */
export interface GoogleCloudOrgpolicyV1RestoreDefault {
}

/**
 * An `AccessLevel` is a label that can be applied to requests to Google Cloud
 * services, along with a list of requirements necessary for the label to be
 * applied.
 */
export interface GoogleIdentityAccesscontextmanagerV1AccessLevel {
  /**
   * A `BasicLevel` composed of `Conditions`.
   */
  basic?: GoogleIdentityAccesscontextmanagerV1BasicLevel;
  /**
   * A `CustomLevel` written in the Common Expression Language.
   */
  custom?: GoogleIdentityAccesscontextmanagerV1CustomLevel;
  /**
   * Description of the `AccessLevel` and its use. Does not affect behavior.
   */
  description?: string;
  /**
   * Resource name for the `AccessLevel`. Format:
   * `accessPolicies/{access_policy}/accessLevels/{access_level}`. The
   * `access_level` component must begin with a letter, followed by alphanumeric
   * characters or `_`. Its maximum length is 50 characters. After you create an
   * `AccessLevel`, you cannot change its `name`.
   */
  name?: string;
  /**
   * Human readable title. Must be unique within the Policy.
   */
  title?: string;
}

/**
 * `AccessPolicy` is a container for `AccessLevels` (which define the necessary
 * attributes to use Google Cloud services) and `ServicePerimeters` (which
 * define regions of services able to freely pass data within a perimeter). An
 * access policy is globally visible within an organization, and the
 * restrictions it specifies apply to all projects within an organization.
 */
export interface GoogleIdentityAccesscontextmanagerV1AccessPolicy {
  /**
   * Output only. An opaque identifier for the current version of the
   * `AccessPolicy`. This will always be a strongly validated etag, meaning that
   * two Access Polices will be identical if and only if their etags are
   * identical. Clients should not expect this to be in any specific format.
   */
  etag?: string;
  /**
   * Output only. Resource name of the `AccessPolicy`. Format:
   * `accessPolicies/{access_policy}`
   */
  name?: string;
  /**
   * Required. The parent of this `AccessPolicy` in the Cloud Resource
   * Hierarchy. Currently immutable once created. Format:
   * `organizations/{organization_id}`
   */
  parent?: string;
  /**
   * The scopes of a policy define which resources an ACM policy can restrict,
   * and where ACM resources can be referenced. For example, a policy with
   * scopes=["folders/123"] has the following behavior: - vpcsc perimeters can
   * only restrict projects within folders/123 - access levels can only be
   * referenced by resources within folders/123. If empty, there are no
   * limitations on which resources can be restricted by an ACM policy, and
   * there are no limitations on where ACM resources can be referenced. Only one
   * policy can include a given scope (attempting to create a second policy
   * which includes "folders/123" will result in an error). Currently, scopes
   * cannot be modified after a policy is created. Currently, policies can only
   * have a single scope. Format: list of `folders/{folder_number}` or
   * `projects/{project_number}`
   */
  scopes?: string[];
  /**
   * Required. Human readable title. Does not affect behavior.
   */
  title?: string;
}

/**
 * Identification for an API Operation.
 */
export interface GoogleIdentityAccesscontextmanagerV1ApiOperation {
  /**
   * API methods or permissions to allow. Method or permission must belong to
   * the service specified by `service_name` field. A single MethodSelector
   * entry with `*` specified for the `method` field will allow all methods AND
   * permissions for the service specified in `service_name`.
   */
  methodSelectors?: GoogleIdentityAccesscontextmanagerV1MethodSelector[];
  /**
   * The name of the API whose methods or permissions the IngressPolicy or
   * EgressPolicy want to allow. A single ApiOperation with `service_name` field
   * set to `*` will allow all methods AND permissions for all services.
   */
  serviceName?: string;
}

/**
 * `BasicLevel` is an `AccessLevel` using a set of recommended features.
 */
export interface GoogleIdentityAccesscontextmanagerV1BasicLevel {
  /**
   * How the `conditions` list should be combined to determine if a request is
   * granted this `AccessLevel`. If AND is used, each `Condition` in
   * `conditions` must be satisfied for the `AccessLevel` to be applied. If OR
   * is used, at least one `Condition` in `conditions` must be satisfied for the
   * `AccessLevel` to be applied. Default behavior is AND.
   */
  combiningFunction?:  | "AND" | "OR";
  /**
   * Required. A list of requirements for the `AccessLevel` to be granted.
   */
  conditions?: GoogleIdentityAccesscontextmanagerV1Condition[];
}

/**
 * A condition necessary for an `AccessLevel` to be granted. The Condition is
 * an AND over its fields. So a Condition is true if: 1) the request IP is from
 * one of the listed subnetworks AND 2) the originating device complies with the
 * listed device policy AND 3) all listed access levels are granted AND 4) the
 * request was sent at a time allowed by the DateTimeRestriction.
 */
export interface GoogleIdentityAccesscontextmanagerV1Condition {
  /**
   * Device specific restrictions, all restrictions must hold for the Condition
   * to be true. If not specified, all devices are allowed.
   */
  devicePolicy?: GoogleIdentityAccesscontextmanagerV1DevicePolicy;
  /**
   * CIDR block IP subnetwork specification. May be IPv4 or IPv6. Note that for
   * a CIDR IP address block, the specified IP address portion must be properly
   * truncated (i.e. all the host bits must be zero) or the input is considered
   * malformed. For example, "192.0.2.0/24" is accepted but "192.0.2.1/24" is
   * not. Similarly, for IPv6, "2001:db8::/32" is accepted whereas
   * "2001:db8::1/32" is not. The originating IP of a request must be in one of
   * the listed subnets in order for this Condition to be true. If empty, all IP
   * addresses are allowed.
   */
  ipSubnetworks?: string[];
  /**
   * The request must be made by one of the provided user or service accounts.
   * Groups are not supported. Syntax: `user:{emailid}`
   * `serviceAccount:{emailid}` If not specified, a request may come from any
   * user.
   */
  members?: string[];
  /**
   * Whether to negate the Condition. If true, the Condition becomes a NAND
   * over its non-empty fields, each field must be false for the Condition
   * overall to be satisfied. Defaults to false.
   */
  negate?: boolean;
  /**
   * The request must originate from one of the provided countries/regions.
   * Must be valid ISO 3166-1 alpha-2 codes.
   */
  regions?: string[];
  /**
   * A list of other access levels defined in the same `Policy`, referenced by
   * resource name. Referencing an `AccessLevel` which does not exist is an
   * error. All access levels listed must be granted for the Condition to be
   * true. Example: "`accessPolicies/MY_POLICY/accessLevels/LEVEL_NAME"`
   */
  requiredAccessLevels?: string[];
}

/**
 * `CustomLevel` is an `AccessLevel` using the Cloud Common Expression Language
 * to represent the necessary conditions for the level to apply to a request.
 * See CEL spec at: https://github.com/google/cel-spec
 */
export interface GoogleIdentityAccesscontextmanagerV1CustomLevel {
  /**
   * Required. A Cloud CEL expression evaluating to a boolean.
   */
  expr?: Expr;
}

/**
 * `DevicePolicy` specifies device specific restrictions necessary to acquire a
 * given access level. A `DevicePolicy` specifies requirements for requests from
 * devices to be granted access levels, it does not do any enforcement on the
 * device. `DevicePolicy` acts as an AND over all specified fields, and each
 * repeated field is an OR over its elements. Any unset fields are ignored. For
 * example, if the proto is { os_type : DESKTOP_WINDOWS, os_type :
 * DESKTOP_LINUX, encryption_status: ENCRYPTED}, then the DevicePolicy will be
 * true for requests originating from encrypted Linux desktops and encrypted
 * Windows desktops.
 */
export interface GoogleIdentityAccesscontextmanagerV1DevicePolicy {
  /**
   * Allowed device management levels, an empty list allows all management
   * levels.
   */
  allowedDeviceManagementLevels?:  | "MANAGEMENT_UNSPECIFIED" | "NONE" | "BASIC" | "COMPLETE"[];
  /**
   * Allowed encryptions statuses, an empty list allows all statuses.
   */
  allowedEncryptionStatuses?:  | "ENCRYPTION_UNSPECIFIED" | "ENCRYPTION_UNSUPPORTED" | "UNENCRYPTED" | "ENCRYPTED"[];
  /**
   * Allowed OS versions, an empty list allows all types and all versions.
   */
  osConstraints?: GoogleIdentityAccesscontextmanagerV1OsConstraint[];
  /**
   * Whether the device needs to be approved by the customer admin.
   */
  requireAdminApproval?: boolean;
  /**
   * Whether the device needs to be corp owned.
   */
  requireCorpOwned?: boolean;
  /**
   * Whether or not screenlock is required for the DevicePolicy to be true.
   * Defaults to `false`.
   */
  requireScreenlock?: boolean;
}

/**
 * Defines the conditions under which an EgressPolicy matches a request.
 * Conditions based on information about the source of the request. Note that if
 * the destination of the request is also protected by a ServicePerimeter, then
 * that ServicePerimeter must have an IngressPolicy which allows access in order
 * for this request to succeed.
 */
export interface GoogleIdentityAccesscontextmanagerV1EgressFrom {
  /**
   * A list of identities that are allowed access through this [EgressPolicy].
   * Should be in the format of email address. The email address should
   * represent individual user or service account only.
   */
  identities?: string[];
  /**
   * Specifies the type of identities that are allowed access to outside the
   * perimeter. If left unspecified, then members of `identities` field will be
   * allowed access.
   */
  identityType?:  | "IDENTITY_TYPE_UNSPECIFIED" | "ANY_IDENTITY" | "ANY_USER_ACCOUNT" | "ANY_SERVICE_ACCOUNT";
}

/**
 * Policy for egress from perimeter. EgressPolicies match requests based on
 * `egress_from` and `egress_to` stanzas. For an EgressPolicy to match, both
 * `egress_from` and `egress_to` stanzas must be matched. If an EgressPolicy
 * matches a request, the request is allowed to span the ServicePerimeter
 * boundary. For example, an EgressPolicy can be used to allow VMs on networks
 * within the ServicePerimeter to access a defined set of projects outside the
 * perimeter in certain contexts (e.g. to read data from a Cloud Storage bucket
 * or query against a BigQuery dataset). EgressPolicies are concerned with the
 * *resources* that a request relates as well as the API services and API
 * actions being used. They do not related to the direction of data movement.
 * More detailed documentation for this concept can be found in the descriptions
 * of EgressFrom and EgressTo.
 */
export interface GoogleIdentityAccesscontextmanagerV1EgressPolicy {
  /**
   * Defines conditions on the source of a request causing this EgressPolicy to
   * apply.
   */
  egressFrom?: GoogleIdentityAccesscontextmanagerV1EgressFrom;
  /**
   * Defines the conditions on the ApiOperation and destination resources that
   * cause this EgressPolicy to apply.
   */
  egressTo?: GoogleIdentityAccesscontextmanagerV1EgressTo;
}

/**
 * Defines the conditions under which an EgressPolicy matches a request.
 * Conditions are based on information about the ApiOperation intended to be
 * performed on the `resources` specified. Note that if the destination of the
 * request is also protected by a ServicePerimeter, then that ServicePerimeter
 * must have an IngressPolicy which allows access in order for this request to
 * succeed. The request must match `operations` AND `resources` fields in order
 * to be allowed egress out of the perimeter.
 */
export interface GoogleIdentityAccesscontextmanagerV1EgressTo {
  /**
   * A list of external resources that are allowed to be accessed. Only AWS and
   * Azure resources are supported. For Amazon S3, the supported format is
   * s3://BUCKET_NAME. For Azure Storage, the supported format is
   * azure://myaccount.blob.core.windows.net/CONTAINER_NAME. A request matches
   * if it contains an external resource in this list (Example:
   * s3://bucket/path). Currently '*' is not allowed.
   */
  externalResources?: string[];
  /**
   * A list of ApiOperations allowed to be performed by the sources specified
   * in the corresponding EgressFrom. A request matches if it uses an
   * operation/service in this list.
   */
  operations?: GoogleIdentityAccesscontextmanagerV1ApiOperation[];
  /**
   * A list of resources, currently only projects in the form `projects/`, that
   * are allowed to be accessed by sources defined in the corresponding
   * EgressFrom. A request matches if it contains a resource in this list. If
   * `*` is specified for `resources`, then this EgressTo rule will authorize
   * access to all resources outside the perimeter.
   */
  resources?: string[];
}

/**
 * Defines the conditions under which an IngressPolicy matches a request.
 * Conditions are based on information about the source of the request. The
 * request must satisfy what is defined in `sources` AND identity related fields
 * in order to match.
 */
export interface GoogleIdentityAccesscontextmanagerV1IngressFrom {
  /**
   * A list of identities that are allowed access through this ingress policy.
   * Should be in the format of email address. The email address should
   * represent individual user or service account only.
   */
  identities?: string[];
  /**
   * Specifies the type of identities that are allowed access from outside the
   * perimeter. If left unspecified, then members of `identities` field will be
   * allowed access.
   */
  identityType?:  | "IDENTITY_TYPE_UNSPECIFIED" | "ANY_IDENTITY" | "ANY_USER_ACCOUNT" | "ANY_SERVICE_ACCOUNT";
  /**
   * Sources that this IngressPolicy authorizes access from.
   */
  sources?: GoogleIdentityAccesscontextmanagerV1IngressSource[];
}

/**
 * Policy for ingress into ServicePerimeter. IngressPolicies match requests
 * based on `ingress_from` and `ingress_to` stanzas. For an ingress policy to
 * match, both the `ingress_from` and `ingress_to` stanzas must be matched. If
 * an IngressPolicy matches a request, the request is allowed through the
 * perimeter boundary from outside the perimeter. For example, access from the
 * internet can be allowed either based on an AccessLevel or, for traffic hosted
 * on Google Cloud, the project of the source network. For access from private
 * networks, using the project of the hosting network is required. Individual
 * ingress policies can be limited by restricting which services and/or actions
 * they match using the `ingress_to` field.
 */
export interface GoogleIdentityAccesscontextmanagerV1IngressPolicy {
  /**
   * Defines the conditions on the source of a request causing this
   * IngressPolicy to apply.
   */
  ingressFrom?: GoogleIdentityAccesscontextmanagerV1IngressFrom;
  /**
   * Defines the conditions on the ApiOperation and request destination that
   * cause this IngressPolicy to apply.
   */
  ingressTo?: GoogleIdentityAccesscontextmanagerV1IngressTo;
}

/**
 * The source that IngressPolicy authorizes access from.
 */
export interface GoogleIdentityAccesscontextmanagerV1IngressSource {
  /**
   * An AccessLevel resource name that allow resources within the
   * ServicePerimeters to be accessed from the internet. AccessLevels listed
   * must be in the same policy as this ServicePerimeter. Referencing a
   * nonexistent AccessLevel will cause an error. If no AccessLevel names are
   * listed, resources within the perimeter can only be accessed via Google
   * Cloud calls with request origins within the perimeter. Example:
   * `accessPolicies/MY_POLICY/accessLevels/MY_LEVEL`. If a single `*` is
   * specified for `access_level`, then all IngressSources will be allowed.
   */
  accessLevel?: string;
  /**
   * A Google Cloud resource that is allowed to ingress the perimeter. Requests
   * from these resources will be allowed to access perimeter data. Currently
   * only projects and VPCs are allowed. Project format:
   * `projects/{project_number}` VPC network format:
   * `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`.
   * The project may be in any Google Cloud organization, not just the
   * organization that the perimeter is defined in. `*` is not allowed, the case
   * of allowing all Google Cloud resources only is not supported.
   */
  resource?: string;
}

/**
 * Defines the conditions under which an IngressPolicy matches a request.
 * Conditions are based on information about the ApiOperation intended to be
 * performed on the target resource of the request. The request must satisfy
 * what is defined in `operations` AND `resources` in order to match.
 */
export interface GoogleIdentityAccesscontextmanagerV1IngressTo {
  /**
   * A list of ApiOperations allowed to be performed by the sources specified
   * in corresponding IngressFrom in this ServicePerimeter.
   */
  operations?: GoogleIdentityAccesscontextmanagerV1ApiOperation[];
  /**
   * A list of resources, currently only projects in the form `projects/`,
   * protected by this ServicePerimeter that are allowed to be accessed by
   * sources defined in the corresponding IngressFrom. If a single `*` is
   * specified, then access to all resources inside the perimeter are allowed.
   */
  resources?: string[];
}

/**
 * An allowed method or permission of a service specified in ApiOperation.
 */
export interface GoogleIdentityAccesscontextmanagerV1MethodSelector {
  /**
   * Value for `method` should be a valid method name for the corresponding
   * `service_name` in ApiOperation. If `*` used as value for `method`, then ALL
   * methods and permissions are allowed.
   */
  method?: string;
  /**
   * Value for `permission` should be a valid Cloud IAM permission for the
   * corresponding `service_name` in ApiOperation.
   */
  permission?: string;
}

/**
 * A restriction on the OS type and version of devices making requests.
 */
export interface GoogleIdentityAccesscontextmanagerV1OsConstraint {
  /**
   * The minimum allowed OS version. If not set, any version of this OS
   * satisfies the constraint. Format: `"major.minor.patch"`. Examples:
   * `"10.5.301"`, `"9.2.1"`.
   */
  minimumVersion?: string;
  /**
   * Required. The allowed OS type.
   */
  osType?:  | "OS_UNSPECIFIED" | "DESKTOP_MAC" | "DESKTOP_WINDOWS" | "DESKTOP_LINUX" | "DESKTOP_CHROME_OS" | "ANDROID" | "IOS";
  /**
   * Only allows requests from devices with a verified Chrome OS. Verifications
   * includes requirements that the device is enterprise-managed, conformant to
   * domain policies, and the caller has permission to call the API targeted by
   * the request.
   */
  requireVerifiedChromeOs?: boolean;
}

/**
 * `ServicePerimeter` describes a set of Google Cloud resources which can
 * freely import and export data amongst themselves, but not export outside of
 * the `ServicePerimeter`. If a request with a source within this
 * `ServicePerimeter` has a target outside of the `ServicePerimeter`, the
 * request will be blocked. Otherwise the request is allowed. There are two
 * types of Service Perimeter - Regular and Bridge. Regular Service Perimeters
 * cannot overlap, a single Google Cloud project or VPC network can only belong
 * to a single regular Service Perimeter. Service Perimeter Bridges can contain
 * only Google Cloud projects as members, a single Google Cloud project may
 * belong to multiple Service Perimeter Bridges.
 */
export interface GoogleIdentityAccesscontextmanagerV1ServicePerimeter {
  /**
   * Description of the `ServicePerimeter` and its use. Does not affect
   * behavior.
   */
  description?: string;
  /**
   * Resource name for the `ServicePerimeter`. Format:
   * `accessPolicies/{access_policy}/servicePerimeters/{service_perimeter}`. The
   * `service_perimeter` component must begin with a letter, followed by
   * alphanumeric characters or `_`. After you create a `ServicePerimeter`, you
   * cannot change its `name`.
   */
  name?: string;
  /**
   * Perimeter type indicator. A single project or VPC network is allowed to be
   * a member of single regular perimeter, but multiple service perimeter
   * bridges. A project cannot be a included in a perimeter bridge without being
   * included in regular perimeter. For perimeter bridges, the restricted
   * service list as well as access level lists must be empty.
   */
  perimeterType?:  | "PERIMETER_TYPE_REGULAR" | "PERIMETER_TYPE_BRIDGE";
  /**
   * Proposed (or dry run) ServicePerimeter configuration. This configuration
   * allows to specify and test ServicePerimeter configuration without enforcing
   * actual access restrictions. Only allowed to be set when the
   * "use_explicit_dry_run_spec" flag is set.
   */
  spec?: GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig;
  /**
   * Current ServicePerimeter configuration. Specifies sets of resources,
   * restricted services and access levels that determine perimeter content and
   * boundaries.
   */
  status?: GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig;
  /**
   * Human readable title. Must be unique within the Policy.
   */
  title?: string;
  /**
   * Use explicit dry run spec flag. Ordinarily, a dry-run spec implicitly
   * exists for all Service Perimeters, and that spec is identical to the status
   * for those Service Perimeters. When this flag is set, it inhibits the
   * generation of the implicit spec, thereby allowing the user to explicitly
   * provide a configuration ("spec") to use in a dry-run version of the Service
   * Perimeter. This allows the user to test changes to the enforced config
   * ("status") without actually enforcing them. This testing is done through
   * analyzing the differences between currently enforced and suggested
   * restrictions. use_explicit_dry_run_spec must bet set to True if any of the
   * fields in the spec are set to non-default values.
   */
  useExplicitDryRunSpec?: boolean;
}

/**
 * `ServicePerimeterConfig` specifies a set of Google Cloud resources that
 * describe specific Service Perimeter configuration.
 */
export interface GoogleIdentityAccesscontextmanagerV1ServicePerimeterConfig {
  /**
   * A list of `AccessLevel` resource names that allow resources within the
   * `ServicePerimeter` to be accessed from the internet. `AccessLevels` listed
   * must be in the same policy as this `ServicePerimeter`. Referencing a
   * nonexistent `AccessLevel` is a syntax error. If no `AccessLevel` names are
   * listed, resources within the perimeter can only be accessed via Google
   * Cloud calls with request origins within the perimeter. Example:
   * `"accessPolicies/MY_POLICY/accessLevels/MY_LEVEL"`. For Service Perimeter
   * Bridge, must be empty.
   */
  accessLevels?: string[];
  /**
   * List of EgressPolicies to apply to the perimeter. A perimeter may have
   * multiple EgressPolicies, each of which is evaluated separately. Access is
   * granted if any EgressPolicy grants it. Must be empty for a perimeter
   * bridge.
   */
  egressPolicies?: GoogleIdentityAccesscontextmanagerV1EgressPolicy[];
  /**
   * List of IngressPolicies to apply to the perimeter. A perimeter may have
   * multiple IngressPolicies, each of which is evaluated separately. Access is
   * granted if any Ingress Policy grants it. Must be empty for a perimeter
   * bridge.
   */
  ingressPolicies?: GoogleIdentityAccesscontextmanagerV1IngressPolicy[];
  /**
   * A list of Google Cloud resources that are inside of the service perimeter.
   * Currently only projects and VPCs are allowed. Project format:
   * `projects/{project_number}` VPC network format:
   * `//compute.googleapis.com/projects/{PROJECT_ID}/global/networks/{NAME}`.
   */
  resources?: string[];
  /**
   * Google Cloud services that are subject to the Service Perimeter
   * restrictions. For example, if `storage.googleapis.com` is specified, access
   * to the storage buckets inside the perimeter must meet the perimeter's
   * access restrictions.
   */
  restrictedServices?: string[];
  /**
   * Configuration for APIs allowed within Perimeter.
   */
  vpcAccessibleServices?: GoogleIdentityAccesscontextmanagerV1VpcAccessibleServices;
}

/**
 * Specifies how APIs are allowed to communicate within the Service Perimeter.
 */
export interface GoogleIdentityAccesscontextmanagerV1VpcAccessibleServices {
  /**
   * The list of APIs usable within the Service Perimeter. Must be empty unless
   * 'enable_restriction' is True. You can specify a list of individual
   * services, as well as include the 'RESTRICTED-SERVICES' value, which
   * automatically includes all of the services protected by the perimeter.
   */
  allowedServices?: string[];
  /**
   * Whether to restrict API calls within the Service Perimeter to the list of
   * APIs specified in 'allowed_services'.
   */
  enableRestriction?: boolean;
}

/**
 * An analysis message to group the query and results.
 */
export interface IamPolicyAnalysis {
  /**
   * The analysis query.
   */
  analysisQuery?: IamPolicyAnalysisQuery;
  /**
   * A list of IamPolicyAnalysisResult that matches the analysis query, or
   * empty if no result is found.
   */
  analysisResults?: IamPolicyAnalysisResult[];
  /**
   * Represents whether all entries in the analysis_results have been fully
   * explored to answer the query.
   */
  fullyExplored?: boolean;
  /**
   * A list of non-critical errors happened during the query handling.
   */
  nonCriticalErrors?: IamPolicyAnalysisState[];
}

function serializeIamPolicyAnalysis(data: any): IamPolicyAnalysis {
  return {
    ...data,
    analysisQuery: data["analysisQuery"] !== undefined ? serializeIamPolicyAnalysisQuery(data["analysisQuery"]) : undefined,
  };
}

function deserializeIamPolicyAnalysis(data: any): IamPolicyAnalysis {
  return {
    ...data,
    analysisQuery: data["analysisQuery"] !== undefined ? deserializeIamPolicyAnalysisQuery(data["analysisQuery"]) : undefined,
  };
}

/**
 * Output configuration for export IAM policy analysis destination.
 */
export interface IamPolicyAnalysisOutputConfig {
  /**
   * Destination on BigQuery.
   */
  bigqueryDestination?: GoogleCloudAssetV1BigQueryDestination;
  /**
   * Destination on Cloud Storage.
   */
  gcsDestination?: GoogleCloudAssetV1GcsDestination;
}

/**
 * IAM policy analysis query message.
 */
export interface IamPolicyAnalysisQuery {
  /**
   * Optional. Specifies roles or permissions for analysis. This is optional.
   */
  accessSelector?: AccessSelector;
  /**
   * Optional. The hypothetical context for IAM conditions evaluation.
   */
  conditionContext?: ConditionContext;
  /**
   * Optional. Specifies an identity for analysis.
   */
  identitySelector?: IdentitySelector;
  /**
   * Optional. The query options.
   */
  options?: Options;
  /**
   * Optional. Specifies a resource for analysis.
   */
  resourceSelector?: ResourceSelector;
  /**
   * Required. The relative name of the root asset. Only resources and IAM
   * policies within the scope will be analyzed. This can only be an
   * organization number (such as "organizations/123"), a folder number (such as
   * "folders/123"), a project ID (such as "projects/my-project-id"), or a
   * project number (such as "projects/12345"). To know how to get organization
   * id, visit [here
   * ](https://cloud.google.com/resource-manager/docs/creating-managing-organization#retrieving_your_organization_id).
   * To know how to get folder or project id, visit [here
   * ](https://cloud.google.com/resource-manager/docs/creating-managing-folders#viewing_or_listing_folders_and_projects).
   */
  scope?: string;
}

function serializeIamPolicyAnalysisQuery(data: any): IamPolicyAnalysisQuery {
  return {
    ...data,
    conditionContext: data["conditionContext"] !== undefined ? serializeConditionContext(data["conditionContext"]) : undefined,
  };
}

function deserializeIamPolicyAnalysisQuery(data: any): IamPolicyAnalysisQuery {
  return {
    ...data,
    conditionContext: data["conditionContext"] !== undefined ? deserializeConditionContext(data["conditionContext"]) : undefined,
  };
}

/**
 * IAM Policy analysis result, consisting of one IAM policy binding and derived
 * access control lists.
 */
export interface IamPolicyAnalysisResult {
  /**
   * The access control lists derived from the iam_binding that match or
   * potentially match resource and access selectors specified in the request.
   */
  accessControlLists?: GoogleCloudAssetV1AccessControlList[];
  /**
   * The [full resource
   * name](https://cloud.google.com/asset-inventory/docs/resource-name-format)
   * of the resource to which the iam_binding policy attaches.
   */
  attachedResourceFullName?: string;
  /**
   * Represents whether all analyses on the iam_binding have successfully
   * finished.
   */
  fullyExplored?: boolean;
  /**
   * The IAM policy binding under analysis.
   */
  iamBinding?: Binding;
  /**
   * The identity list derived from members of the iam_binding that match or
   * potentially match identity selector specified in the request.
   */
  identityList?: GoogleCloudAssetV1IdentityList;
}

/**
 * Represents the detailed state of an entity under analysis, such as a
 * resource, an identity or an access.
 */
export interface IamPolicyAnalysisState {
  /**
   * The human-readable description of the cause of failure.
   */
  cause?: string;
  /**
   * The Google standard error code that best describes the state. For example:
   * - OK means the analysis on this entity has been successfully finished; -
   * PERMISSION_DENIED means an access denied error is encountered; -
   * DEADLINE_EXCEEDED means the analysis on this entity hasn't been started in
   * time;
   */
  code?:  | "OK" | "CANCELLED" | "UNKNOWN" | "INVALID_ARGUMENT" | "DEADLINE_EXCEEDED" | "NOT_FOUND" | "ALREADY_EXISTS" | "PERMISSION_DENIED" | "UNAUTHENTICATED" | "RESOURCE_EXHAUSTED" | "FAILED_PRECONDITION" | "ABORTED" | "OUT_OF_RANGE" | "UNIMPLEMENTED" | "INTERNAL" | "UNAVAILABLE" | "DATA_LOSS";
}

/**
 * A result of IAM Policy search, containing information of an IAM policy.
 */
export interface IamPolicySearchResult {
  /**
   * The type of the resource associated with this IAM policy. Example:
   * `compute.googleapis.com/Disk`. To search against the `asset_type`: *
   * specify the `asset_types` field in your search request.
   */
  assetType?: string;
  /**
   * Explanation about the IAM policy search result. It contains additional
   * information to explain why the search result matches the query.
   */
  explanation?: Explanation;
  /**
   * The folder(s) that the IAM policy belongs to, in the form of
   * folders/{FOLDER_NUMBER}. This field is available when the IAM policy
   * belongs to one or more folders. To search against `folders`: * use a field
   * query. Example: `folders:(123 OR 456)` * use a free text query. Example:
   * `123` * specify the `scope` field as this folder in your search request.
   */
  folders?: string[];
  /**
   * The organization that the IAM policy belongs to, in the form of
   * organizations/{ORGANIZATION_NUMBER}. This field is available when the IAM
   * policy belongs to an organization. To search against `organization`: * use
   * a field query. Example: `organization:123` * use a free text query.
   * Example: `123` * specify the `scope` field as this organization in your
   * search request.
   */
  organization?: string;
  /**
   * The IAM policy directly set on the given resource. Note that the original
   * IAM policy can contain multiple bindings. This only contains the bindings
   * that match the given query. For queries that don't contain a constrain on
   * policies (e.g., an empty query), this contains all the bindings. To search
   * against the `policy` bindings: * use a field query: - query by the policy
   * contained members. Example: `policy:amy@gmail.com` - query by the policy
   * contained roles. Example: `policy:roles/compute.admin` - query by the
   * policy contained roles' included permissions. Example:
   * `policy.role.permissions:compute.instances.create`
   */
  policy?: Policy;
  /**
   * The project that the associated Google Cloud resource belongs to, in the
   * form of projects/{PROJECT_NUMBER}. If an IAM policy is set on a resource
   * (like VM instance, Cloud Storage bucket), the project field will indicate
   * the project that contains the resource. If an IAM policy is set on a folder
   * or orgnization, this field will be empty. To search against the `project`:
   * * specify the `scope` field as this project in your search request.
   */
  project?: string;
  /**
   * The full resource name of the resource associated with this IAM policy.
   * Example:
   * `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`.
   * See [Cloud Asset Inventory Resource Name
   * Format](https://cloud.google.com/asset-inventory/docs/resource-name-format)
   * for more information. To search against the `resource`: * use a field
   * query. Example: `resource:organizations/123`
   */
  resource?: string;
}

function serializeIamPolicySearchResult(data: any): IamPolicySearchResult {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
  };
}

function deserializeIamPolicySearchResult(data: any): IamPolicySearchResult {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
  };
}

/**
 * Specifies an identity for which to determine resource access, based on roles
 * assigned either directly to them or to the groups they belong to, directly or
 * indirectly.
 */
export interface IdentitySelector {
  /**
   * Required. The identity appear in the form of principals in [IAM policy
   * binding](https://cloud.google.com/iam/reference/rest/v1/Binding). The
   * examples of supported forms are: "user:mike@example.com",
   * "group:admins@example.com", "domain:google.com",
   * "serviceAccount:my-project-id@appspot.gserviceaccount.com". Notice that
   * wildcard characters (such as * and ?) are not supported. You must give a
   * specific identity.
   */
  identity?: string;
}

/**
 * This API resource represents the available inventory data for a Compute
 * Engine virtual machine (VM) instance at a given point in time. You can use
 * this API resource to determine the inventory data of your VM. For more
 * information, see [Information provided by OS inventory
 * management](https://cloud.google.com/compute/docs/instances/os-inventory-management#data-collected).
 */
export interface Inventory {
  /**
   * Inventory items related to the VM keyed by an opaque unique identifier for
   * each inventory item. The identifier is unique to each distinct and
   * addressable inventory item and will change, when there is a new package
   * version.
   */
  items?: {
    [key: string]: Item
  };
  /**
   * Output only. The `Inventory` API resource name. Format:
   * `projects/{project_number}/locations/{location}/instances/{instance_id}/inventory`
   */
  readonly name?: string;
  /**
   * Base level operating system information for the VM.
   */
  osInfo?: OsInfo;
  /**
   * Output only. Timestamp of the last reported inventory for the VM.
   */
  readonly updateTime?: Date;
}

function serializeInventory(data: any): Inventory {
  return {
    ...data,
    items: data["items"] !== undefined ? Object.fromEntries(Object.entries(data["items"]).map(([k, v]: [string, any]) => ([k, serializeItem(v)]))) : undefined,
  };
}

function deserializeInventory(data: any): Inventory {
  return {
    ...data,
    items: data["items"] !== undefined ? Object.fromEntries(Object.entries(data["items"]).map(([k, v]: [string, any]) => ([k, deserializeItem(v)]))) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A single piece of inventory on a VM.
 */
export interface Item {
  /**
   * Software package available to be installed on the VM instance.
   */
  availablePackage?: SoftwarePackage;
  /**
   * When this inventory item was first detected.
   */
  createTime?: Date;
  /**
   * Identifier for this item, unique across items for this VM.
   */
  id?: string;
  /**
   * Software package present on the VM instance.
   */
  installedPackage?: SoftwarePackage;
  /**
   * The origin of this inventory item.
   */
  originType?:  | "ORIGIN_TYPE_UNSPECIFIED" | "INVENTORY_REPORT";
  /**
   * The specific type of inventory, correlating to its specific details.
   */
  type?:  | "TYPE_UNSPECIFIED" | "INSTALLED_PACKAGE" | "AVAILABLE_PACKAGE";
  /**
   * When this inventory item was last modified.
   */
  updateTime?: Date;
}

function serializeItem(data: any): Item {
  return {
    ...data,
    availablePackage: data["availablePackage"] !== undefined ? serializeSoftwarePackage(data["availablePackage"]) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    installedPackage: data["installedPackage"] !== undefined ? serializeSoftwarePackage(data["installedPackage"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeItem(data: any): Item {
  return {
    ...data,
    availablePackage: data["availablePackage"] !== undefined ? deserializeSoftwarePackage(data["availablePackage"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    installedPackage: data["installedPackage"] !== undefined ? deserializeSoftwarePackage(data["installedPackage"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * ListAssets response.
 */
export interface ListAssetsResponse {
  /**
   * Assets.
   */
  assets?: Asset[];
  /**
   * Token to retrieve the next page of results. It expires 72 hours after the
   * page token for the first page is generated. Set to empty if there are no
   * remaining results.
   */
  nextPageToken?: string;
  /**
   * Time the snapshot was taken.
   */
  readTime?: Date;
}

function serializeListAssetsResponse(data: any): ListAssetsResponse {
  return {
    ...data,
    assets: data["assets"] !== undefined ? data["assets"].map((item: any) => (serializeAsset(item))) : undefined,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
  };
}

function deserializeListAssetsResponse(data: any): ListAssetsResponse {
  return {
    ...data,
    assets: data["assets"] !== undefined ? data["assets"].map((item: any) => (deserializeAsset(item))) : undefined,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
  };
}

export interface ListFeedsResponse {
  /**
   * A list of feeds.
   */
  feeds?: Feed[];
}

/**
 * Response of listing saved queries.
 */
export interface ListSavedQueriesResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * A list of savedQueries.
   */
  savedQueries?: SavedQuery[];
}

function serializeListSavedQueriesResponse(data: any): ListSavedQueriesResponse {
  return {
    ...data,
    savedQueries: data["savedQueries"] !== undefined ? data["savedQueries"].map((item: any) => (serializeSavedQuery(item))) : undefined,
  };
}

function deserializeListSavedQueriesResponse(data: any): ListSavedQueriesResponse {
  return {
    ...data,
    savedQueries: data["savedQueries"] !== undefined ? data["savedQueries"].map((item: any) => (deserializeSavedQuery(item))) : undefined,
  };
}

/**
 * A message to group the analysis information.
 */
export interface MoveAnalysis {
  /**
   * Analysis result of moving the target resource.
   */
  analysis?: MoveAnalysisResult;
  /**
   * The user friendly display name of the analysis. E.g. IAM, organization
   * policy etc.
   */
  displayName?: string;
  /**
   * Description of error encountered when performing the analysis.
   */
  error?: Status;
}

/**
 * An analysis result including blockers and warnings.
 */
export interface MoveAnalysisResult {
  /**
   * Blocking information that would prevent the target resource from moving to
   * the specified destination at runtime.
   */
  blockers?: MoveImpact[];
  /**
   * Warning information indicating that moving the target resource to the
   * specified destination might be unsafe. This can include important policy
   * information and configuration changes, but will not block moves at runtime.
   */
  warnings?: MoveImpact[];
}

/**
 * A message to group impacts of moving the target resource.
 */
export interface MoveImpact {
  /**
   * User friendly impact detail in a free form message.
   */
  detail?: string;
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
 * Contains query options.
 */
export interface Options {
  /**
   * Optional. If true, the response will include access analysis from
   * identities to resources via service account impersonation. This is a very
   * expensive operation, because many derived queries will be executed. We
   * highly recommend you use AssetService.AnalyzeIamPolicyLongrunning RPC
   * instead. For example, if the request analyzes for which resources user A
   * has permission P, and there's an IAM policy states user A has
   * iam.serviceAccounts.getAccessToken permission to a service account SA, and
   * there's another IAM policy states service account SA has permission P to a
   * Google Cloud folder F, then user A potentially has access to the Google
   * Cloud folder F. And those advanced analysis results will be included in
   * AnalyzeIamPolicyResponse.service_account_impersonation_analysis. Another
   * example, if the request analyzes for who has permission P to a Google Cloud
   * folder F, and there's an IAM policy states user A has
   * iam.serviceAccounts.actAs permission to a service account SA, and there's
   * another IAM policy states service account SA has permission P to the Google
   * Cloud folder F, then user A potentially has access to the Google Cloud
   * folder F. And those advanced analysis results will be included in
   * AnalyzeIamPolicyResponse.service_account_impersonation_analysis. Only the
   * following permissions are considered in this analysis: *
   * `iam.serviceAccounts.actAs` * `iam.serviceAccounts.signBlob` *
   * `iam.serviceAccounts.signJwt` * `iam.serviceAccounts.getAccessToken` *
   * `iam.serviceAccounts.getOpenIdToken` *
   * `iam.serviceAccounts.implicitDelegation` Default is false.
   */
  analyzeServiceAccountImpersonation?: boolean;
  /**
   * Optional. If true, the identities section of the result will expand any
   * Google groups appearing in an IAM policy binding. If
   * IamPolicyAnalysisQuery.identity_selector is specified, the identity in the
   * result will be determined by the selector, and this flag is not allowed to
   * set. If true, the default max expansion per group is 1000 for
   * AssetService.AnalyzeIamPolicy][]. Default is false.
   */
  expandGroups?: boolean;
  /**
   * Optional. If true and IamPolicyAnalysisQuery.resource_selector is not
   * specified, the resource section of the result will expand any resource
   * attached to an IAM policy to include resources lower in the resource
   * hierarchy. For example, if the request analyzes for which resources user A
   * has permission P, and the results include an IAM policy with P on a Google
   * Cloud folder, the results will also include resources in that folder with
   * permission P. If true and IamPolicyAnalysisQuery.resource_selector is
   * specified, the resource section of the result will expand the specified
   * resource to include resources lower in the resource hierarchy. Only project
   * or lower resources are supported. Folder and organization resources cannot
   * be used together with this option. For example, if the request analyzes for
   * which users have permission P on a Google Cloud project with this option
   * enabled, the results will include all users who have permission P on that
   * project or any lower resource. If true, the default max expansion per
   * resource is 1000 for AssetService.AnalyzeIamPolicy][] and 100000 for
   * AssetService.AnalyzeIamPolicyLongrunning][]. Default is false.
   */
  expandResources?: boolean;
  /**
   * Optional. If true, the access section of result will expand any roles
   * appearing in IAM policy bindings to include their permissions. If
   * IamPolicyAnalysisQuery.access_selector is specified, the access section of
   * the result will be determined by the selector, and this flag is not allowed
   * to set. Default is false.
   */
  expandRoles?: boolean;
  /**
   * Optional. If true, the result will output the relevant membership
   * relationships between groups and other groups, and between groups and
   * principals. Default is false.
   */
  outputGroupEdges?: boolean;
  /**
   * Optional. If true, the result will output the relevant parent/child
   * relationships between resources. Default is false.
   */
  outputResourceEdges?: boolean;
}

/**
 * The organization policy result to the query.
 */
export interface OrgPolicyResult {
  /**
   * The consolidated organization policy for the analyzed resource. The
   * consolidated organization policy is computed by merging and evaluating
   * AnalyzeOrgPoliciesResponse.policy_bundle. The evaluation will respect the
   * organization policy [hierarchy
   * rules](https://cloud.google.com/resource-manager/docs/organization-policy/understanding-hierarchy).
   */
  consolidatedPolicy?: AnalyzerOrgPolicy;
  /**
   * The ordered list of all organization policies from the
   * AnalyzeOrgPoliciesResponse.OrgPolicyResult.consolidated_policy.attached_resource.
   * to the scope specified in the request. If the constraint is defined with
   * default policy, it will also appear in the list.
   */
  policyBundle?: AnalyzerOrgPolicy[];
}

/**
 * Operating system information for the VM.
 */
export interface OsInfo {
  /**
   * The system architecture of the operating system.
   */
  architecture?: string;
  /**
   * The VM hostname.
   */
  hostname?: string;
  /**
   * The kernel release of the operating system.
   */
  kernelRelease?: string;
  /**
   * The kernel version of the operating system.
   */
  kernelVersion?: string;
  /**
   * The operating system long name. For example 'Debian GNU/Linux 9' or
   * 'Microsoft Window Server 2019 Datacenter'.
   */
  longName?: string;
  /**
   * The current version of the OS Config agent running on the VM.
   */
  osconfigAgentVersion?: string;
  /**
   * The operating system short name. For example, 'windows' or 'debian'.
   */
  shortName?: string;
  /**
   * The version of the operating system.
   */
  version?: string;
}

/**
 * Output configuration for export assets destination.
 */
export interface OutputConfig {
  /**
   * Destination on BigQuery. The output table stores the fields in asset
   * Protobuf as columns in BigQuery.
   */
  bigqueryDestination?: BigQueryDestination;
  /**
   * Destination on Cloud Storage.
   */
  gcsDestination?: GcsDestination;
}

/**
 * Specifications of BigQuery partitioned table as export destination.
 */
export interface PartitionSpec {
  /**
   * The partition key for BigQuery partitioned table.
   */
  partitionKey?:  | "PARTITION_KEY_UNSPECIFIED" | "READ_TIME" | "REQUEST_TIME";
}

/**
 * IAM permissions
 */
export interface Permissions {
  /**
   * A list of permissions. A sample permission string: `compute.disk.get`.
   */
  permissions?: string[];
}

/**
 * An Identity and Access Management (IAM) policy, which specifies access
 * controls for Google Cloud resources. A `Policy` is a collection of
 * `bindings`. A `binding` binds one or more `members`, or principals, to a
 * single `role`. Principals can be user accounts, service accounts, Google
 * groups, and domains (such as G Suite). A `role` is a named list of
 * permissions; each `role` can be an IAM predefined role or a user-created
 * custom role. For some types of Google Cloud resources, a `binding` can also
 * specify a `condition`, which is a logical expression that allows access to a
 * resource only if the expression evaluates to `true`. A condition can add
 * constraints based on attributes of the request, the resource, or both. To
 * learn which resources support conditions in their IAM policies, see the [IAM
 * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
 * **JSON example:** { "bindings": [ { "role":
 * "roles/resourcemanager.organizationAdmin", "members": [
 * "user:mike@example.com", "group:admins@example.com", "domain:google.com",
 * "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role":
 * "roles/resourcemanager.organizationViewer", "members": [
 * "user:eve@example.com" ], "condition": { "title": "expirable access",
 * "description": "Does not grant access after Sep 2020", "expression":
 * "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } ], "etag":
 * "BwWWja0YfJA=", "version": 3 } **YAML example:** bindings: - members: -
 * user:mike@example.com - group:admins@example.com - domain:google.com -
 * serviceAccount:my-project-id@appspot.gserviceaccount.com role:
 * roles/resourcemanager.organizationAdmin - members: - user:eve@example.com
 * role: roles/resourcemanager.organizationViewer condition: title: expirable
 * access description: Does not grant access after Sep 2020 expression:
 * request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA=
 * version: 3 For a description of IAM and its features, see the [IAM
 * documentation](https://cloud.google.com/iam/docs/).
 */
export interface Policy {
  /**
   * Specifies cloud audit logging configuration for this policy.
   */
  auditConfigs?: AuditConfig[];
  /**
   * Associates a list of `members`, or principals, with a `role`. Optionally,
   * may specify a `condition` that determines how and when the `bindings` are
   * applied. Each of the `bindings` must contain at least one principal. The
   * `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of
   * these principals can be Google groups. Each occurrence of a principal
   * counts towards these limits. For example, if the `bindings` grant 50
   * different roles to `user:alice@example.com`, and not to any other
   * principal, then you can add another 1,450 principals to the `bindings` in
   * the `Policy`.
   */
  bindings?: Binding[];
  /**
   * `etag` is used for optimistic concurrency control as a way to help prevent
   * simultaneous updates of a policy from overwriting each other. It is
   * strongly suggested that systems make use of the `etag` in the
   * read-modify-write cycle to perform policy updates in order to avoid race
   * conditions: An `etag` is returned in the response to `getIamPolicy`, and
   * systems are expected to put that etag in the request to `setIamPolicy` to
   * ensure that their change will be applied to the same version of the policy.
   * **Important:** If you use IAM Conditions, you must include the `etag` field
   * whenever you call `setIamPolicy`. If you omit this field, then IAM allows
   * you to overwrite a version `3` policy with a version `1` policy, and all of
   * the conditions in the version `3` policy are lost.
   */
  etag?: Uint8Array;
  /**
   * Specifies the format of the policy. Valid values are `0`, `1`, and `3`.
   * Requests that specify an invalid value are rejected. Any operation that
   * affects conditional role bindings must specify version `3`. This
   * requirement applies to the following operations: * Getting a policy that
   * includes a conditional role binding * Adding a conditional role binding to
   * a policy * Changing a conditional role binding in a policy * Removing any
   * role binding, with or without a condition, from a policy that includes
   * conditions **Important:** If you use IAM Conditions, you must include the
   * `etag` field whenever you call `setIamPolicy`. If you omit this field, then
   * IAM allows you to overwrite a version `3` policy with a version `1` policy,
   * and all of the conditions in the version `3` policy are lost. If a policy
   * does not include any conditions, operations on that policy may specify any
   * valid version or leave the field unset. To learn which resources support
   * conditions in their IAM policies, see the [IAM
   * documentation](https://cloud.google.com/iam/help/conditions/resource-policies).
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
 * The IAM policy and its attached resource.
 */
export interface PolicyInfo {
  /**
   * The full resource name the policy is directly attached to.
   */
  attachedResource?: string;
  /**
   * The IAM policy that's directly attached to the attached_resource.
   */
  policy?: Policy;
}

function serializePolicyInfo(data: any): PolicyInfo {
  return {
    ...data,
    policy: data["policy"] !== undefined ? serializePolicy(data["policy"]) : undefined,
  };
}

function deserializePolicyInfo(data: any): PolicyInfo {
  return {
    ...data,
    policy: data["policy"] !== undefined ? deserializePolicy(data["policy"]) : undefined,
  };
}

/**
 * A Pub/Sub destination.
 */
export interface PubsubDestination {
  /**
   * The name of the Pub/Sub topic to publish to. Example:
   * `projects/PROJECT_ID/topics/TOPIC_ID`.
   */
  topic?: string;
}

/**
 * Output configuration query assets.
 */
export interface QueryAssetsOutputConfig {
  /**
   * BigQuery destination where the query results will be saved.
   */
  bigqueryDestination?: GoogleCloudAssetV1QueryAssetsOutputConfigBigQueryDestination;
}

/**
 * QueryAssets request.
 */
export interface QueryAssetsRequest {
  /**
   * Optional. Reference to the query job, which is from the
   * `QueryAssetsResponse` of previous `QueryAssets` call.
   */
  jobReference?: string;
  /**
   * Optional. Destination where the query results will be saved. When this
   * field is specified, the query results won't be saved in the
   * [QueryAssetsResponse.query_result]. Instead
   * [QueryAssetsResponse.output_config] will be set. Meanwhile,
   * [QueryAssetsResponse.job_reference] will be set and can be used to check
   * the status of the query job when passed to a following [QueryAssets] API
   * call.
   */
  outputConfig?: QueryAssetsOutputConfig;
  /**
   * Optional. The maximum number of rows to return in the results. Responses
   * are limited to 10 MB and 1000 rows. By default, the maximum row count is
   * 1000. When the byte or row count limit is reached, the rest of the query
   * results will be paginated. The field will be ignored when [output_config]
   * is specified.
   */
  pageSize?: number;
  /**
   * Optional. A page token received from previous `QueryAssets`. The field
   * will be ignored when [output_config] is specified.
   */
  pageToken?: string;
  /**
   * Optional. Queries cloud assets as they appeared at the specified point in
   * time.
   */
  readTime?: Date;
  /**
   * Optional. [start_time] is required. [start_time] must be less than
   * [end_time] Defaults [end_time] to now if [start_time] is set and [end_time]
   * isn't. Maximum permitted time range is 7 days.
   */
  readTimeWindow?: TimeWindow;
  /**
   * Optional. A SQL statement that's compatible with [BigQuery Standard
   * SQL](http://cloud/bigquery/docs/reference/standard-sql/enabling-standard-sql).
   */
  statement?: string;
  /**
   * Optional. Specifies the maximum amount of time that the client is willing
   * to wait for the query to complete. By default, this limit is 5 min for the
   * first query, and 1 minute for the following queries. If the query is
   * complete, the `done` field in the `QueryAssetsResponse` is true, otherwise
   * false. Like BigQuery [jobs.query
   * API](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query#queryrequest)
   * The call is not guaranteed to wait for the specified timeout; it typically
   * returns after around 200 seconds (200,000 milliseconds), even if the query
   * is not complete. The field will be ignored when [output_config] is
   * specified.
   */
  timeout?: number /* Duration */;
}

function serializeQueryAssetsRequest(data: any): QueryAssetsRequest {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? data["readTime"].toISOString() : undefined,
    readTimeWindow: data["readTimeWindow"] !== undefined ? serializeTimeWindow(data["readTimeWindow"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeQueryAssetsRequest(data: any): QueryAssetsRequest {
  return {
    ...data,
    readTime: data["readTime"] !== undefined ? new Date(data["readTime"]) : undefined,
    readTimeWindow: data["readTimeWindow"] !== undefined ? deserializeTimeWindow(data["readTimeWindow"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * QueryAssets response.
 */
export interface QueryAssetsResponse {
  /**
   * The query response, which can be either an `error` or a valid `response`.
   * If `done` == `false` and the query result is being saved in a output, the
   * output_config field will be set. If `done` == `true`, exactly one of
   * `error`, `query_result` or `output_config` will be set.
   */
  done?: boolean;
  /**
   * Error status.
   */
  error?: Status;
  /**
   * Reference to a query job.
   */
  jobReference?: string;
  /**
   * Output configuration which indicates instead of being returned in API
   * response on the fly, the query result will be saved in a specific output.
   */
  outputConfig?: QueryAssetsOutputConfig;
  /**
   * Result of the query.
   */
  queryResult?: QueryResult;
}

function serializeQueryAssetsResponse(data: any): QueryAssetsResponse {
  return {
    ...data,
    queryResult: data["queryResult"] !== undefined ? serializeQueryResult(data["queryResult"]) : undefined,
  };
}

function deserializeQueryAssetsResponse(data: any): QueryAssetsResponse {
  return {
    ...data,
    queryResult: data["queryResult"] !== undefined ? deserializeQueryResult(data["queryResult"]) : undefined,
  };
}

/**
 * The query content.
 */
export interface QueryContent {
  /**
   * An IAM Policy Analysis query, which could be used in the
   * AssetService.AnalyzeIamPolicy RPC or the
   * AssetService.AnalyzeIamPolicyLongrunning RPC.
   */
  iamPolicyAnalysisQuery?: IamPolicyAnalysisQuery;
}

function serializeQueryContent(data: any): QueryContent {
  return {
    ...data,
    iamPolicyAnalysisQuery: data["iamPolicyAnalysisQuery"] !== undefined ? serializeIamPolicyAnalysisQuery(data["iamPolicyAnalysisQuery"]) : undefined,
  };
}

function deserializeQueryContent(data: any): QueryContent {
  return {
    ...data,
    iamPolicyAnalysisQuery: data["iamPolicyAnalysisQuery"] !== undefined ? deserializeIamPolicyAnalysisQuery(data["iamPolicyAnalysisQuery"]) : undefined,
  };
}

/**
 * Execution results of the query. The result is formatted as rows represented
 * by BigQuery compatible [schema]. When pagination is necessary, it will
 * contains the page token to retrieve the results of following pages.
 */
export interface QueryResult {
  /**
   * Token to retrieve the next page of the results.
   */
  nextPageToken?: string;
  /**
   * Each row hold a query result in the format of `Struct`.
   */
  rows?: {
    [key: string]: any
  }[];
  /**
   * Describes the format of the [rows].
   */
  schema?: TableSchema;
  /**
   * Total rows of the whole query results.
   */
  totalRows?: bigint;
}

function serializeQueryResult(data: any): QueryResult {
  return {
    ...data,
    totalRows: data["totalRows"] !== undefined ? String(data["totalRows"]) : undefined,
  };
}

function deserializeQueryResult(data: any): QueryResult {
  return {
    ...data,
    totalRows: data["totalRows"] !== undefined ? BigInt(data["totalRows"]) : undefined,
  };
}

/**
 * An asset identifier in Google Cloud which contains its name, type and
 * ancestors. An asset can be any resource in the Google Cloud [resource
 * hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy),
 * a resource outside the Google Cloud resource hierarchy (such as Google
 * Kubernetes Engine clusters and objects), or a policy (e.g. IAM policy). See
 * [Supported asset
 * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types)
 * for more information.
 */
export interface RelatedAsset {
  /**
   * The ancestors of an asset in Google Cloud [resource
   * hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy),
   * represented as a list of relative resource names. An ancestry path starts
   * with the closest ancestor in the hierarchy and ends at root. Example:
   * `["projects/123456789", "folders/5432", "organizations/1234"]`
   */
  ancestors?: string[];
  /**
   * The full name of the asset. Example:
   * `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`
   * See [Resource
   * names](https://cloud.google.com/apis/design/resource_names#full_resource_name)
   * for more information.
   */
  asset?: string;
  /**
   * The type of the asset. Example: `compute.googleapis.com/Disk` See
   * [Supported asset
   * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types)
   * for more information.
   */
  assetType?: string;
  /**
   * The unique identifier of the relationship type. Example:
   * `INSTANCE_TO_INSTANCEGROUP`
   */
  relationshipType?: string;
}

/**
 * DEPRECATED. This message only presents for the purpose of
 * backward-compatibility. The server will never populate this message in
 * responses. The detailed related assets with the `relationship_type`.
 */
export interface RelatedAssets {
  /**
   * The peer resources of the relationship.
   */
  assets?: RelatedAsset[];
  /**
   * The detailed relationship attributes.
   */
  relationshipAttributes?: RelationshipAttributes;
}

/**
 * The detailed related resource.
 */
export interface RelatedResource {
  /**
   * The type of the asset. Example: `compute.googleapis.com/Instance`
   */
  assetType?: string;
  /**
   * The full resource name of the related resource. Example:
   * `//compute.googleapis.com/projects/my_proj_123/zones/instance/instance123`
   */
  fullResourceName?: string;
}

/**
 * The related resources of the primary resource.
 */
export interface RelatedResources {
  /**
   * The detailed related resources of the primary resource.
   */
  relatedResources?: RelatedResource[];
}

/**
 * DEPRECATED. This message only presents for the purpose of
 * backward-compatibility. The server will never populate this message in
 * responses. The relationship attributes which include `type`,
 * `source_resource_type`, `target_resource_type` and `action`.
 */
export interface RelationshipAttributes {
  /**
   * The detail of the relationship, e.g. `contains`, `attaches`
   */
  action?: string;
  /**
   * The source asset type. Example: `compute.googleapis.com/Instance`
   */
  sourceResourceType?: string;
  /**
   * The target asset type. Example: `compute.googleapis.com/Disk`
   */
  targetResourceType?: string;
  /**
   * The unique identifier of the relationship type. Example:
   * `INSTANCE_TO_INSTANCEGROUP`
   */
  type?: string;
}

/**
 * A representation of a Google Cloud resource.
 */
export interface Resource {
  /**
   * The content of the resource, in which some sensitive fields are removed
   * and may not be present.
   */
  data?: {
    [key: string]: any
  };
  /**
   * The URL of the discovery document containing the resource's JSON schema.
   * Example: `https://www.googleapis.com/discovery/v1/apis/compute/v1/rest`
   * This value is unspecified for resources that do not have an API based on a
   * discovery document, such as Cloud Bigtable.
   */
  discoveryDocumentUri?: string;
  /**
   * The JSON schema name listed in the discovery document. Example: `Project`
   * This value is unspecified for resources that do not have an API based on a
   * discovery document, such as Cloud Bigtable.
   */
  discoveryName?: string;
  /**
   * The location of the resource in Google Cloud, such as its zone and region.
   * For more information, see https://cloud.google.com/about/locations/.
   */
  location?: string;
  /**
   * The full name of the immediate parent of this resource. See [Resource
   * Names](https://cloud.google.com/apis/design/resource_names#full_resource_name)
   * for more information. For Google Cloud assets, this value is the parent
   * resource defined in the [IAM policy
   * hierarchy](https://cloud.google.com/iam/docs/overview#policy_hierarchy).
   * Example: `//cloudresourcemanager.googleapis.com/projects/my_project_123`
   * For third-party assets, this field may be set differently.
   */
  parent?: string;
  /**
   * The REST URL for accessing the resource. An HTTP `GET` request using this
   * URL returns the resource itself. Example:
   * `https://cloudresourcemanager.googleapis.com/v1/projects/my-project-123`
   * This value is unspecified for resources without a REST API.
   */
  resourceUrl?: string;
  /**
   * The API version. Example: `v1`
   */
  version?: string;
}

/**
 * A result of Resource Search, containing information of a cloud resource.
 * Next ID: 32
 */
export interface ResourceSearchResult {
  /**
   * The additional searchable attributes of this resource. The attributes may
   * vary from one resource type to another. Examples: `projectId` for Project,
   * `dnsName` for DNS ManagedZone. This field contains a subset of the resource
   * metadata fields that are returned by the List or Get APIs provided by the
   * corresponding Google Cloud service (e.g., Compute Engine). see [API
   * references and supported searchable
   * attributes](https://cloud.google.com/asset-inventory/docs/supported-asset-types#searchable_asset_types)
   * to see which fields are included. You can search values of these fields
   * through free text search. However, you should not consume the field
   * programically as the field names and values may change as the Google Cloud
   * service updates to a new incompatible API version. To search against the
   * `additional_attributes`: * Use a free text query to match the attributes
   * values. Example: to search `additional_attributes = { dnsName: "foobar" }`,
   * you can issue a query `foobar`.
   */
  additionalAttributes?: {
    [key: string]: any
  };
  /**
   * The type of this resource. Example: `compute.googleapis.com/Disk`. To
   * search against the `asset_type`: * Specify the `asset_type` field in your
   * search request.
   */
  assetType?: string;
  /**
   * Attached resources of this resource. For example, an OSConfig Inventory is
   * an attached resource of a Compute Instance. This field is repeated because
   * a resource could have multiple attached resources. This
   * `attached_resources` field is not searchable. Some attributes of the
   * attached resources are exposed in `additional_attributes` field, so as to
   * allow users to search on them.
   */
  attachedResources?: AttachedResource[];
  /**
   * The create timestamp of this resource, at which the resource was created.
   * The granularity is in seconds. Timestamp.nanos will always be 0. This field
   * is available only when the resource's Protobuf contains it. To search
   * against `create_time`: * Use a field query. - value in seconds since unix
   * epoch. Example: `createTime > 1609459200` - value in date string. Example:
   * `createTime > 2021-01-01` - value in date-time string (must be quoted).
   * Example: `createTime > "2021-01-01T00:00:00"`
   */
  createTime?: Date;
  /**
   * One or more paragraphs of text description of this resource. Maximum
   * length could be up to 1M bytes. This field is available only when the
   * resource's Protobuf contains it. To search against the `description`: * Use
   * a field query. Example: `description:"important instance"` * Use a free
   * text query. Example: `"important instance"`
   */
  description?: string;
  /**
   * The display name of this resource. This field is available only when the
   * resource's Protobuf contains it. To search against the `display_name`: *
   * Use a field query. Example: `displayName:"My Instance"` * Use a free text
   * query. Example: `"My Instance"`
   */
  displayName?: string;
  /**
   * The folder(s) that this resource belongs to, in the form of
   * folders/{FOLDER_NUMBER}. This field is available when the resource belongs
   * to one or more folders. To search against `folders`: * Use a field query.
   * Example: `folders:(123 OR 456)` * Use a free text query. Example: `123` *
   * Specify the `scope` field as this folder in your search request.
   */
  folders?: string[];
  /**
   * The Cloud KMS
   * [CryptoKey](https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys)
   * name or
   * [CryptoKeyVersion](https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions)
   * name. This field only presents for the purpose of backward compatibility.
   * Please use the `kms_keys` field to retrieve Cloud KMS key information. This
   * field is available only when the resource's Protobuf contains it and will
   * only be populated for [these resource
   * types](https://cloud.google.com/asset-inventory/docs/legacy-field-names#resource_types_with_the_to_be_deprecated_kmskey_field)
   * for backward compatible purposes. To search against the `kms_key`: * Use a
   * field query. Example: `kmsKey:key` * Use a free text query. Example: `key`
   */
  kmsKey?: string;
  /**
   * The Cloud KMS
   * [CryptoKey](https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys)
   * names or
   * [CryptoKeyVersion](https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions)
   * names. This field is available only when the resource's Protobuf contains
   * it. To search against the `kms_keys`: * Use a field query. Example:
   * `kmsKeys:key` * Use a free text query. Example: `key`
   */
  kmsKeys?: string[];
  /**
   * Labels associated with this resource. See [Labelling and grouping Google
   * Cloud
   * resources](https://cloud.google.com/blog/products/gcp/labelling-and-grouping-your-google-cloud-platform-resources)
   * for more information. This field is available only when the resource's
   * Protobuf contains it. To search against the `labels`: * Use a field query:
   * - query on any label's key or value. Example: `labels:prod` - query by a
   * given label. Example: `labels.env:prod` - query by a given label's
   * existence. Example: `labels.env:*` * Use a free text query. Example: `prod`
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Location can be `global`, regional like `us-east1`, or zonal like
   * `us-west1-b`. This field is available only when the resource's Protobuf
   * contains it. To search against the `location`: * Use a field query.
   * Example: `location:us-west*` * Use a free text query. Example: `us-west*`
   */
  location?: string;
  /**
   * The full resource name of this resource. Example:
   * `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`.
   * See [Cloud Asset Inventory Resource Name
   * Format](https://cloud.google.com/asset-inventory/docs/resource-name-format)
   * for more information. To search against the `name`: * Use a field query.
   * Example: `name:instance1` * Use a free text query. Example: `instance1`
   */
  name?: string;
  /**
   * Network tags associated with this resource. Like labels, network tags are
   * a type of annotations used to group Google Cloud resources. See [Labelling
   * Google Cloud
   * resources](https://cloud.google.com/blog/products/gcp/labelling-and-grouping-your-google-cloud-platform-resources)
   * for more information. This field is available only when the resource's
   * Protobuf contains it. To search against the `network_tags`: * Use a field
   * query. Example: `networkTags:internal` * Use a free text query. Example:
   * `internal`
   */
  networkTags?: string[];
  /**
   * The organization that this resource belongs to, in the form of
   * organizations/{ORGANIZATION_NUMBER}. This field is available when the
   * resource belongs to an organization. To search against `organization`: *
   * Use a field query. Example: `organization:123` * Use a free text query.
   * Example: `123` * Specify the `scope` field as this organization in your
   * search request.
   */
  organization?: string;
  /**
   * The type of this resource's immediate parent, if there is one. To search
   * against the `parent_asset_type`: * Use a field query. Example:
   * `parentAssetType:"cloudresourcemanager.googleapis.com/Project"` * Use a
   * free text query. Example: `cloudresourcemanager.googleapis.com/Project`
   */
  parentAssetType?: string;
  /**
   * The full resource name of this resource's parent, if it has one. To search
   * against the `parent_full_resource_name`: * Use a field query. Example:
   * `parentFullResourceName:"project-name"` * Use a free text query. Example:
   * `project-name`
   */
  parentFullResourceName?: string;
  /**
   * The project that this resource belongs to, in the form of
   * projects/{PROJECT_NUMBER}. This field is available when the resource
   * belongs to a project. To search against `project`: * Use a field query.
   * Example: `project:12345` * Use a free text query. Example: `12345` *
   * Specify the `scope` field as this project in your search request.
   */
  project?: string;
  /**
   * A map of related resources of this resource, keyed by the relationship
   * type. A relationship type is in the format of
   * {SourceType}_{ACTION}_{DestType}. Example: `DISK_TO_INSTANCE`,
   * `DISK_TO_NETWORK`, `INSTANCE_TO_INSTANCEGROUP`. See [supported relationship
   * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types#supported_relationship_types).
   */
  relationships?: {
    [key: string]: RelatedResources
  };
  /**
   * The state of this resource. Different resources types have different state
   * definitions that are mapped from various fields of different resource
   * types. This field is available only when the resource's Protobuf contains
   * it. Example: If the resource is an instance provided by Compute Engine, its
   * state will include PROVISIONING, STAGING, RUNNING, STOPPING, SUSPENDING,
   * SUSPENDED, REPAIRING, and TERMINATED. See `status` definition in [API
   * Reference](https://cloud.google.com/compute/docs/reference/rest/v1/instances).
   * If the resource is a project provided by Resource Manager, its state will
   * include LIFECYCLE_STATE_UNSPECIFIED, ACTIVE, DELETE_REQUESTED and
   * DELETE_IN_PROGRESS. See `lifecycleState` definition in [API
   * Reference](https://cloud.google.com/resource-manager/reference/rest/v1/projects).
   * To search against the `state`: * Use a field query. Example:
   * `state:RUNNING` * Use a free text query. Example: `RUNNING`
   */
  state?: string;
  /**
   * TagKey namespaced names, in the format of {ORG_ID}/{TAG_KEY_SHORT_NAME}.
   * To search against the `tagKeys`: * Use a field query. Example: -
   * `tagKeys:"123456789/env*"` - `tagKeys="123456789/env"` - `tagKeys:"env"` *
   * Use a free text query. Example: - `env`
   */
  tagKeys?: string[];
  /**
   * TagValue IDs, in the format of tagValues/{TAG_VALUE_ID}. To search against
   * the `tagValueIds`: * Use a field query. Example: - `tagValueIds:"456"` -
   * `tagValueIds="tagValues/456"` * Use a free text query. Example: - `456`
   */
  tagValueIds?: string[];
  /**
   * TagValue namespaced names, in the format of
   * {ORG_ID}/{TAG_KEY_SHORT_NAME}/{TAG_VALUE_SHORT_NAME}. To search against the
   * `tagValues`: * Use a field query. Example: - `tagValues:"env"` -
   * `tagValues:"env/prod"` - `tagValues:"123456789/env/prod*"` -
   * `tagValues="123456789/env/prod"` * Use a free text query. Example: - `prod`
   */
  tagValues?: string[];
  /**
   * The last update timestamp of this resource, at which the resource was last
   * modified or deleted. The granularity is in seconds. Timestamp.nanos will
   * always be 0. This field is available only when the resource's Protobuf
   * contains it. To search against `update_time`: * Use a field query. - value
   * in seconds since unix epoch. Example: `updateTime < 1609459200` - value in
   * date string. Example: `updateTime < 2021-01-01` - value in date-time string
   * (must be quoted). Example: `updateTime < "2021-01-01T00:00:00"`
   */
  updateTime?: Date;
  /**
   * Versioned resource representations of this resource. This is repeated
   * because there could be multiple versions of resource representations during
   * version migration. This `versioned_resources` field is not searchable. Some
   * attributes of the resource representations are exposed in
   * `additional_attributes` field, so as to allow users to search on them.
   */
  versionedResources?: VersionedResource[];
}

function serializeResourceSearchResult(data: any): ResourceSearchResult {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeResourceSearchResult(data: any): ResourceSearchResult {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Specifies the resource to analyze for access policies, which may be set
 * directly on the resource, or on ancestors such as organizations, folders or
 * projects.
 */
export interface ResourceSelector {
  /**
   * Required. The [full resource name]
   * (https://cloud.google.com/asset-inventory/docs/resource-name-format) of a
   * resource of [supported resource
   * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types#analyzable_asset_types).
   */
  fullResourceName?: string;
}

/**
 * Additional options for CloudAsset#savedQueriesCreate.
 */
export interface SavedQueriesCreateOptions {
  /**
   * Required. The ID to use for the saved query, which must be unique in the
   * specified parent. It will become the final component of the saved query's
   * resource name. This value should be 4-63 characters, and valid characters
   * are `a-z-`. Notice that this field is required in the saved query creation,
   * and the `name` field of the `saved_query` will be ignored.
   */
  savedQueryId?: string;
}

/**
 * Additional options for CloudAsset#savedQueriesList.
 */
export interface SavedQueriesListOptions {
  /**
   * Optional. The expression to filter resources. The expression is a list of
   * zero or more restrictions combined via logical operators `AND` and `OR`.
   * When `AND` and `OR` are both used in the expression, parentheses must be
   * appropriately used to group the combinations. The expression may also
   * contain regular expressions. See https://google.aip.dev/160 for more
   * information on the grammar.
   */
  filter?: string;
  /**
   * Optional. The maximum number of saved queries to return per page. The
   * service may return fewer than this value. If unspecified, at most 50 will
   * be returned. The maximum value is 1000; values above 1000 will be coerced
   * to 1000.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListSavedQueries` call.
   * Provide this to retrieve the subsequent page. When paginating, all other
   * parameters provided to `ListSavedQueries` must match the call that provided
   * the page token.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudAsset#savedQueriesPatch.
 */
export interface SavedQueriesPatchOptions {
  /**
   * Required. The list of fields to update.
   */
  updateMask?: string /* FieldMask */;
}

function serializeSavedQueriesPatchOptions(data: any): SavedQueriesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeSavedQueriesPatchOptions(data: any): SavedQueriesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * A saved query which can be shared with others or used later.
 */
export interface SavedQuery {
  /**
   * The query content.
   */
  content?: QueryContent;
  /**
   * Output only. The create time of this saved query.
   */
  readonly createTime?: Date;
  /**
   * Output only. The account's email address who has created this saved query.
   */
  readonly creator?: string;
  /**
   * The description of this saved query. This value should be fewer than 255
   * characters.
   */
  description?: string;
  /**
   * Labels applied on the resource. This value should not contain more than 10
   * entries. The key and value of each entry must be non-empty and fewer than
   * 64 characters.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. The account's email address who has updated this saved query
   * most recently.
   */
  readonly lastUpdater?: string;
  /**
   * Output only. The last update time of this saved query.
   */
  readonly lastUpdateTime?: Date;
  /**
   * The resource name of the saved query. The format must be: *
   * projects/project_number/savedQueries/saved_query_id *
   * folders/folder_number/savedQueries/saved_query_id *
   * organizations/organization_number/savedQueries/saved_query_id
   */
  name?: string;
}

function serializeSavedQuery(data: any): SavedQuery {
  return {
    ...data,
    content: data["content"] !== undefined ? serializeQueryContent(data["content"]) : undefined,
  };
}

function deserializeSavedQuery(data: any): SavedQuery {
  return {
    ...data,
    content: data["content"] !== undefined ? deserializeQueryContent(data["content"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? new Date(data["lastUpdateTime"]) : undefined,
  };
}

/**
 * Search all IAM policies response.
 */
export interface SearchAllIamPoliciesResponse {
  /**
   * Set if there are more results than those appearing in this response; to
   * get the next set of results, call this method again, using this value as
   * the `page_token`.
   */
  nextPageToken?: string;
  /**
   * A list of IAM policies that match the search query. Related information
   * such as the associated resource is returned along with the policy.
   */
  results?: IamPolicySearchResult[];
}

function serializeSearchAllIamPoliciesResponse(data: any): SearchAllIamPoliciesResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeIamPolicySearchResult(item))) : undefined,
  };
}

function deserializeSearchAllIamPoliciesResponse(data: any): SearchAllIamPoliciesResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeIamPolicySearchResult(item))) : undefined,
  };
}

/**
 * Search all resources response.
 */
export interface SearchAllResourcesResponse {
  /**
   * If there are more results than those appearing in this response, then
   * `next_page_token` is included. To get the next set of results, call this
   * method again using the value of `next_page_token` as `page_token`.
   */
  nextPageToken?: string;
  /**
   * A list of Resources that match the search query. It contains the resource
   * standard metadata information.
   */
  results?: ResourceSearchResult[];
}

function serializeSearchAllResourcesResponse(data: any): SearchAllResourcesResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeResourceSearchResult(item))) : undefined,
  };
}

function deserializeSearchAllResourcesResponse(data: any): SearchAllResourcesResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeResourceSearchResult(item))) : undefined,
  };
}

/**
 * Software package information of the operating system.
 */
export interface SoftwarePackage {
  /**
   * Details of an APT package. For details about the apt package manager, see
   * https://wiki.debian.org/Apt.
   */
  aptPackage?: VersionedPackage;
  /**
   * Details of a COS package.
   */
  cosPackage?: VersionedPackage;
  /**
   * Details of a Googet package. For details about the googet package manager,
   * see https://github.com/google/googet.
   */
  googetPackage?: VersionedPackage;
  /**
   * Details of a Windows Quick Fix engineering package. See
   * https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering
   * for info in Windows Quick Fix Engineering.
   */
  qfePackage?: WindowsQuickFixEngineeringPackage;
  /**
   * Details of Windows Application.
   */
  windowsApplication?: WindowsApplication;
  /**
   * Details of a Windows Update package. See
   * https://docs.microsoft.com/en-us/windows/win32/api/_wua/ for information
   * about Windows Update.
   */
  wuaPackage?: WindowsUpdatePackage;
  /**
   * Yum package info. For details about the yum package manager, see
   * https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/deployment_guide/ch-yum.
   */
  yumPackage?: VersionedPackage;
  /**
   * Details of a Zypper package. For details about the Zypper package manager,
   * see https://en.opensuse.org/SDB:Zypper_manual.
   */
  zypperPackage?: VersionedPackage;
  /**
   * Details of a Zypper patch. For details about the Zypper package manager,
   * see https://en.opensuse.org/SDB:Zypper_manual.
   */
  zypperPatch?: ZypperPatch;
}

function serializeSoftwarePackage(data: any): SoftwarePackage {
  return {
    ...data,
    qfePackage: data["qfePackage"] !== undefined ? serializeWindowsQuickFixEngineeringPackage(data["qfePackage"]) : undefined,
    wuaPackage: data["wuaPackage"] !== undefined ? serializeWindowsUpdatePackage(data["wuaPackage"]) : undefined,
  };
}

function deserializeSoftwarePackage(data: any): SoftwarePackage {
  return {
    ...data,
    qfePackage: data["qfePackage"] !== undefined ? deserializeWindowsQuickFixEngineeringPackage(data["qfePackage"]) : undefined,
    wuaPackage: data["wuaPackage"] !== undefined ? deserializeWindowsUpdatePackage(data["wuaPackage"]) : undefined,
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
 * A field in TableSchema.
 */
export interface TableFieldSchema {
  /**
   * The field name. The name must contain only letters (a-z, A-Z), numbers
   * (0-9), or underscores (_), and must start with a letter or underscore. The
   * maximum length is 128 characters.
   */
  field?: string;
  /**
   * Describes the nested schema fields if the type property is set to RECORD.
   */
  fields?: TableFieldSchema[];
  /**
   * The field mode. Possible values include NULLABLE, REQUIRED and REPEATED.
   * The default value is NULLABLE.
   */
  mode?: string;
  /**
   * The field data type. Possible values include * STRING * BYTES * INTEGER *
   * FLOAT * BOOLEAN * TIMESTAMP * DATE * TIME * DATETIME * GEOGRAPHY, *
   * NUMERIC, * BIGNUMERIC, * RECORD (where RECORD indicates that the field
   * contains a nested schema).
   */
  type?: string;
}

/**
 * BigQuery Compatible table schema.
 */
export interface TableSchema {
  /**
   * Describes the fields in a table.
   */
  fields?: TableFieldSchema[];
}

/**
 * An asset in Google Cloud and its temporal metadata, including the time
 * window when it was observed and its status during that window.
 */
export interface TemporalAsset {
  /**
   * An asset in Google Cloud.
   */
  asset?: Asset;
  /**
   * Whether the asset has been deleted or not.
   */
  deleted?: boolean;
  /**
   * Prior copy of the asset. Populated if prior_asset_state is PRESENT.
   * Currently this is only set for responses in Real-Time Feed.
   */
  priorAsset?: Asset;
  /**
   * State of prior_asset.
   */
  priorAssetState?:  | "PRIOR_ASSET_STATE_UNSPECIFIED" | "PRESENT" | "INVALID" | "DOES_NOT_EXIST" | "DELETED";
  /**
   * The time window when the asset data and state was observed.
   */
  window?: TimeWindow;
}

function serializeTemporalAsset(data: any): TemporalAsset {
  return {
    ...data,
    asset: data["asset"] !== undefined ? serializeAsset(data["asset"]) : undefined,
    priorAsset: data["priorAsset"] !== undefined ? serializeAsset(data["priorAsset"]) : undefined,
    window: data["window"] !== undefined ? serializeTimeWindow(data["window"]) : undefined,
  };
}

function deserializeTemporalAsset(data: any): TemporalAsset {
  return {
    ...data,
    asset: data["asset"] !== undefined ? deserializeAsset(data["asset"]) : undefined,
    priorAsset: data["priorAsset"] !== undefined ? deserializeAsset(data["priorAsset"]) : undefined,
    window: data["window"] !== undefined ? deserializeTimeWindow(data["window"]) : undefined,
  };
}

/**
 * A time window specified by its `start_time` and `end_time`.
 */
export interface TimeWindow {
  /**
   * End time of the time window (inclusive). If not specified, the current
   * timestamp is used instead.
   */
  endTime?: Date;
  /**
   * Start time of the time window (exclusive).
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
 * Update asset feed request.
 */
export interface UpdateFeedRequest {
  /**
   * Required. The new values of feed details. It must match an existing feed
   * and the field `name` must be in the format of:
   * projects/project_number/feeds/feed_id or
   * folders/folder_number/feeds/feed_id or
   * organizations/organization_number/feeds/feed_id.
   */
  feed?: Feed;
  /**
   * Required. Only updates the `feed` fields indicated by this mask. The field
   * mask must not be empty, and it must not contain fields that are immutable
   * or only set by the server.
   */
  updateMask?: string /* FieldMask */;
}

function serializeUpdateFeedRequest(data: any): UpdateFeedRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUpdateFeedRequest(data: any): UpdateFeedRequest {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for CloudAsset#v1AnalyzeIamPolicy.
 */
export interface V1AnalyzeIamPolicyOptions {
  /**
   * Optional. The permissions to appear in result.
   */
  ["analysisQuery.accessSelector.permissions"]?: string;
  /**
   * Optional. The roles to appear in result.
   */
  ["analysisQuery.accessSelector.roles"]?: string;
  /**
   * The hypothetical access timestamp to evaluate IAM conditions. Note that
   * this value must not be earlier than the current time; otherwise, an
   * INVALID_ARGUMENT error will be returned.
   */
  ["analysisQuery.conditionContext.accessTime"]?: Date;
  /**
   * Required. The identity appear in the form of principals in [IAM policy
   * binding](https://cloud.google.com/iam/reference/rest/v1/Binding). The
   * examples of supported forms are: "user:mike@example.com",
   * "group:admins@example.com", "domain:google.com",
   * "serviceAccount:my-project-id@appspot.gserviceaccount.com". Notice that
   * wildcard characters (such as * and ?) are not supported. You must give a
   * specific identity.
   */
  ["analysisQuery.identitySelector.identity"]?: string;
  /**
   * Optional. If true, the response will include access analysis from
   * identities to resources via service account impersonation. This is a very
   * expensive operation, because many derived queries will be executed. We
   * highly recommend you use AssetService.AnalyzeIamPolicyLongrunning RPC
   * instead. For example, if the request analyzes for which resources user A
   * has permission P, and there's an IAM policy states user A has
   * iam.serviceAccounts.getAccessToken permission to a service account SA, and
   * there's another IAM policy states service account SA has permission P to a
   * Google Cloud folder F, then user A potentially has access to the Google
   * Cloud folder F. And those advanced analysis results will be included in
   * AnalyzeIamPolicyResponse.service_account_impersonation_analysis. Another
   * example, if the request analyzes for who has permission P to a Google Cloud
   * folder F, and there's an IAM policy states user A has
   * iam.serviceAccounts.actAs permission to a service account SA, and there's
   * another IAM policy states service account SA has permission P to the Google
   * Cloud folder F, then user A potentially has access to the Google Cloud
   * folder F. And those advanced analysis results will be included in
   * AnalyzeIamPolicyResponse.service_account_impersonation_analysis. Only the
   * following permissions are considered in this analysis: *
   * `iam.serviceAccounts.actAs` * `iam.serviceAccounts.signBlob` *
   * `iam.serviceAccounts.signJwt` * `iam.serviceAccounts.getAccessToken` *
   * `iam.serviceAccounts.getOpenIdToken` *
   * `iam.serviceAccounts.implicitDelegation` Default is false.
   */
  ["analysisQuery.options.analyzeServiceAccountImpersonation"]?: boolean;
  /**
   * Optional. If true, the identities section of the result will expand any
   * Google groups appearing in an IAM policy binding. If
   * IamPolicyAnalysisQuery.identity_selector is specified, the identity in the
   * result will be determined by the selector, and this flag is not allowed to
   * set. If true, the default max expansion per group is 1000 for
   * AssetService.AnalyzeIamPolicy][]. Default is false.
   */
  ["analysisQuery.options.expandGroups"]?: boolean;
  /**
   * Optional. If true and IamPolicyAnalysisQuery.resource_selector is not
   * specified, the resource section of the result will expand any resource
   * attached to an IAM policy to include resources lower in the resource
   * hierarchy. For example, if the request analyzes for which resources user A
   * has permission P, and the results include an IAM policy with P on a Google
   * Cloud folder, the results will also include resources in that folder with
   * permission P. If true and IamPolicyAnalysisQuery.resource_selector is
   * specified, the resource section of the result will expand the specified
   * resource to include resources lower in the resource hierarchy. Only project
   * or lower resources are supported. Folder and organization resources cannot
   * be used together with this option. For example, if the request analyzes for
   * which users have permission P on a Google Cloud project with this option
   * enabled, the results will include all users who have permission P on that
   * project or any lower resource. If true, the default max expansion per
   * resource is 1000 for AssetService.AnalyzeIamPolicy][] and 100000 for
   * AssetService.AnalyzeIamPolicyLongrunning][]. Default is false.
   */
  ["analysisQuery.options.expandResources"]?: boolean;
  /**
   * Optional. If true, the access section of result will expand any roles
   * appearing in IAM policy bindings to include their permissions. If
   * IamPolicyAnalysisQuery.access_selector is specified, the access section of
   * the result will be determined by the selector, and this flag is not allowed
   * to set. Default is false.
   */
  ["analysisQuery.options.expandRoles"]?: boolean;
  /**
   * Optional. If true, the result will output the relevant membership
   * relationships between groups and other groups, and between groups and
   * principals. Default is false.
   */
  ["analysisQuery.options.outputGroupEdges"]?: boolean;
  /**
   * Optional. If true, the result will output the relevant parent/child
   * relationships between resources. Default is false.
   */
  ["analysisQuery.options.outputResourceEdges"]?: boolean;
  /**
   * Required. The [full resource name]
   * (https://cloud.google.com/asset-inventory/docs/resource-name-format) of a
   * resource of [supported resource
   * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types#analyzable_asset_types).
   */
  ["analysisQuery.resourceSelector.fullResourceName"]?: string;
  /**
   * Optional. Amount of time executable has to complete. See JSON
   * representation of
   * [Duration](https://developers.google.com/protocol-buffers/docs/proto3#json).
   * If this field is set with a value less than the RPC deadline, and the
   * execution of your query hasn't finished in the specified execution timeout,
   * you will get a response with partial result. Otherwise, your query's
   * execution will continue until the RPC deadline. If it's not finished until
   * then, you will get a DEADLINE_EXCEEDED error. Default is empty.
   */
  executionTimeout?: number /* Duration */;
  /**
   * Optional. The name of a saved query, which must be in the format of: *
   * projects/project_number/savedQueries/saved_query_id *
   * folders/folder_number/savedQueries/saved_query_id *
   * organizations/organization_number/savedQueries/saved_query_id If both
   * `analysis_query` and `saved_analysis_query` are provided, they will be
   * merged together with the `saved_analysis_query` as base and the
   * `analysis_query` as overrides. For more details of the merge behavior,
   * please refer to the
   * [MergeFrom](https://developers.google.com/protocol-buffers/docs/reference/cpp/google.protobuf.message#Message.MergeFrom.details)
   * page. Note that you cannot override primitive fields with default value,
   * such as 0 or empty string, etc., because we use proto3, which doesn't
   * support field presence yet.
   */
  savedAnalysisQuery?: string;
}

function serializeV1AnalyzeIamPolicyOptions(data: any): V1AnalyzeIamPolicyOptions {
  return {
    ...data,
    ["analysisQuery.conditionContext.accessTime"]: data["analysisQuery.conditionContext.accessTime"] !== undefined ? data["analysisQuery.conditionContext.accessTime"].toISOString() : undefined,
    executionTimeout: data["executionTimeout"] !== undefined ? data["executionTimeout"] : undefined,
  };
}

function deserializeV1AnalyzeIamPolicyOptions(data: any): V1AnalyzeIamPolicyOptions {
  return {
    ...data,
    ["analysisQuery.conditionContext.accessTime"]: data["analysisQuery.conditionContext.accessTime"] !== undefined ? new Date(data["analysisQuery.conditionContext.accessTime"]) : undefined,
    executionTimeout: data["executionTimeout"] !== undefined ? data["executionTimeout"] : undefined,
  };
}

/**
 * Additional options for CloudAsset#v1AnalyzeMove.
 */
export interface V1AnalyzeMoveOptions {
  /**
   * Required. Name of the Google Cloud folder or organization to reparent the
   * target resource. The analysis will be performed against hypothetically
   * moving the resource to this specified desitination parent. This can only be
   * a folder number (such as "folders/123") or an organization number (such as
   * "organizations/123").
   */
  destinationParent?: string;
  /**
   * Analysis view indicating what information should be included in the
   * analysis response. If unspecified, the default view is FULL.
   */
  view?:  | "ANALYSIS_VIEW_UNSPECIFIED" | "FULL" | "BASIC";
}

/**
 * Additional options for CloudAsset#v1AnalyzeOrgPolicies.
 */
export interface V1AnalyzeOrgPoliciesOptions {
  /**
   * Required. The name of the constraint to analyze organization policies for.
   * The response only contains analyzed organization policies for the provided
   * constraint.
   */
  constraint?: string;
  /**
   * The expression to filter AnalyzeOrgPoliciesResponse.org_policy_results.
   * The only supported field is `consolidated_policy.attached_resource`, and
   * the only supported operator is `=`. Example:
   * consolidated_policy.attached_resource="//cloudresourcemanager.googleapis.com/folders/001"
   * will return the org policy results of"folders/001".
   */
  filter?: string;
  /**
   * The maximum number of items to return per page. If unspecified,
   * AnalyzeOrgPoliciesResponse.org_policy_results will contain 20 items with a
   * maximum of 200.
   */
  pageSize?: number;
  /**
   * The pagination token to retrieve the next page.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudAsset#v1AnalyzeOrgPolicyGovernedAssets.
 */
export interface V1AnalyzeOrgPolicyGovernedAssetsOptions {
  /**
   * Required. The name of the constraint to analyze governed assets for. The
   * analysis only contains analyzed organization policies for the provided
   * constraint.
   */
  constraint?: string;
  /**
   * The expression to filter the governed assets in result. The only supported
   * fields for governed resources are `governed_resource.project` and
   * `governed_resource.folders`. The only supported fields for governed iam
   * policies are `governed_iam_policy.project` and
   * `governed_iam_policy.folders`. The only supported operator is `=`. Example
   * 1: governed_resource.project="projects/12345678" filter will return all
   * governed resources under projects/12345678 including the project ifself, if
   * applicable. Example 2: governed_iam_policy.folders="folders/12345678"
   * filter will return all governed iam policies under folders/12345678, if
   * applicable.
   */
  filter?: string;
  /**
   * The maximum number of items to return per page. If unspecified,
   * AnalyzeOrgPolicyGovernedAssetsResponse.governed_assets will contain 100
   * items with a maximum of 200.
   */
  pageSize?: number;
  /**
   * The pagination token to retrieve the next page.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudAsset#v1AnalyzeOrgPolicyGovernedContainers.
 */
export interface V1AnalyzeOrgPolicyGovernedContainersOptions {
  /**
   * Required. The name of the constraint to analyze governed containers for.
   * The analysis only contains organization policies for the provided
   * constraint.
   */
  constraint?: string;
  /**
   * The expression to filter the governed containers in result. The only
   * supported field is `parent`, and the only supported operator is `=`.
   * Example: parent="//cloudresourcemanager.googleapis.com/folders/001" will
   * return all containers under "folders/001".
   */
  filter?: string;
  /**
   * The maximum number of items to return per page. If unspecified,
   * AnalyzeOrgPolicyGovernedContainersResponse.governed_containers will contain
   * 100 items with a maximum of 200.
   */
  pageSize?: number;
  /**
   * The pagination token to retrieve the next page.
   */
  pageToken?: string;
}

/**
 * Additional options for CloudAsset#v1BatchGetAssetsHistory.
 */
export interface V1BatchGetAssetsHistoryOptions {
  /**
   * A list of the full names of the assets. See:
   * https://cloud.google.com/asset-inventory/docs/resource-name-format Example:
   * `//compute.googleapis.com/projects/my_project_123/zones/zone1/instances/instance1`.
   * The request becomes a no-op if the asset name list is empty, and the max
   * size of the asset name list is 100 in one request.
   */
  assetNames?: string;
  /**
   * Optional. The content type.
   */
  contentType?:  | "CONTENT_TYPE_UNSPECIFIED" | "RESOURCE" | "IAM_POLICY" | "ORG_POLICY" | "ACCESS_POLICY" | "OS_INVENTORY" | "RELATIONSHIP";
  /**
   * End time of the time window (inclusive). If not specified, the current
   * timestamp is used instead.
   */
  ["readTimeWindow.endTime"]?: Date;
  /**
   * Start time of the time window (exclusive).
   */
  ["readTimeWindow.startTime"]?: Date;
  /**
   * Optional. A list of relationship types to output, for example:
   * `INSTANCE_TO_INSTANCEGROUP`. This field should only be specified if
   * content_type=RELATIONSHIP. * If specified: it outputs specified
   * relationships' history on the [asset_names]. It returns an error if any of
   * the [relationship_types] doesn't belong to the supported relationship types
   * of the [asset_names] or if any of the [asset_names]'s types doesn't belong
   * to the source types of the [relationship_types]. * Otherwise: it outputs
   * the supported relationships' history on the [asset_names] or returns an
   * error if any of the [asset_names]'s types has no relationship support. See
   * [Introduction to Cloud Asset
   * Inventory](https://cloud.google.com/asset-inventory/docs/overview) for all
   * supported asset types and relationship types.
   */
  relationshipTypes?: string;
}

function serializeV1BatchGetAssetsHistoryOptions(data: any): V1BatchGetAssetsHistoryOptions {
  return {
    ...data,
    ["readTimeWindow.endTime"]: data["readTimeWindow.endTime"] !== undefined ? data["readTimeWindow.endTime"].toISOString() : undefined,
    ["readTimeWindow.startTime"]: data["readTimeWindow.startTime"] !== undefined ? data["readTimeWindow.startTime"].toISOString() : undefined,
  };
}

function deserializeV1BatchGetAssetsHistoryOptions(data: any): V1BatchGetAssetsHistoryOptions {
  return {
    ...data,
    ["readTimeWindow.endTime"]: data["readTimeWindow.endTime"] !== undefined ? new Date(data["readTimeWindow.endTime"]) : undefined,
    ["readTimeWindow.startTime"]: data["readTimeWindow.startTime"] !== undefined ? new Date(data["readTimeWindow.startTime"]) : undefined,
  };
}

/**
 * Additional options for CloudAsset#v1SearchAllIamPolicies.
 */
export interface V1SearchAllIamPoliciesOptions {
  /**
   * Optional. A list of asset types that the IAM policies are attached to. If
   * empty, it will search the IAM policies that are attached to all the
   * [searchable asset
   * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types#searchable_asset_types).
   * Regular expressions are also supported. For example: *
   * "compute.googleapis.com.*" snapshots IAM policies attached to asset type
   * starts with "compute.googleapis.com". * ".*Instance" snapshots IAM policies
   * attached to asset type ends with "Instance". * ".*Instance.*" snapshots IAM
   * policies attached to asset type contains "Instance". See
   * [RE2](https://github.com/google/re2/wiki/Syntax) for all supported regular
   * expression syntax. If the regular expression does not match any supported
   * asset type, an INVALID_ARGUMENT error will be returned.
   */
  assetTypes?: string;
  /**
   * Optional. A comma-separated list of fields specifying the sorting order of
   * the results. The default order is ascending. Add " DESC" after the field
   * name to indicate descending order. Redundant space characters are ignored.
   * Example: "assetType DESC, resource". Only singular primitive fields in the
   * response are sortable: * resource * assetType * project All the other
   * fields such as repeated fields (e.g., `folders`) and non-primitive fields
   * (e.g., `policy`) are not supported.
   */
  orderBy?: string;
  /**
   * Optional. The page size for search result pagination. Page size is capped
   * at 500 even if a larger value is given. If set to zero, server will pick an
   * appropriate default. Returned results may be fewer than requested. When
   * this happens, there could be more results as long as `next_page_token` is
   * returned.
   */
  pageSize?: number;
  /**
   * Optional. If present, retrieve the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of all other
   * method parameters must be identical to those in the previous call.
   */
  pageToken?: string;
  /**
   * Optional. The query statement. See [how to construct a
   * query](https://cloud.google.com/asset-inventory/docs/searching-iam-policies#how_to_construct_a_query)
   * for more information. If not specified or empty, it will search all the IAM
   * policies within the specified `scope`. Note that the query string is
   * compared against each IAM policy binding, including its principals, roles,
   * and IAM conditions. The returned IAM policies will only contain the
   * bindings that match your query. To learn more about the IAM policy
   * structure, see the [IAM policy
   * documentation](https://cloud.google.com/iam/help/allow-policies/structure).
   * Examples: * `policy:amy@gmail.com` to find IAM policy bindings that specify
   * user "amy@gmail.com". * `policy:roles/compute.admin` to find IAM policy
   * bindings that specify the Compute Admin role. * `policy:comp*` to find IAM
   * policy bindings that contain "comp" as a prefix of any word in the binding.
   * * `policy.role.permissions:storage.buckets.update` to find IAM policy
   * bindings that specify a role containing "storage.buckets.update"
   * permission. Note that if callers don't have `iam.roles.get` access to a
   * role's included permissions, policy bindings that specify this role will be
   * dropped from the search results. * `policy.role.permissions:upd*` to find
   * IAM policy bindings that specify a role containing "upd" as a prefix of any
   * word in the role permission. Note that if callers don't have
   * `iam.roles.get` access to a role's included permissions, policy bindings
   * that specify this role will be dropped from the search results. *
   * `resource:organizations/123456` to find IAM policy bindings that are set on
   * "organizations/123456". *
   * `resource=//cloudresourcemanager.googleapis.com/projects/myproject` to find
   * IAM policy bindings that are set on the project named "myproject". *
   * `Important` to find IAM policy bindings that contain "Important" as a word
   * in any of the searchable fields (except for the included permissions). *
   * `resource:(instance1 OR instance2) policy:amy` to find IAM policy bindings
   * that are set on resources "instance1" or "instance2" and also specify user
   * "amy". * `roles:roles/compute.admin` to find IAM policy bindings that
   * specify the Compute Admin role. * `memberTypes:user` to find IAM policy
   * bindings that contain the principal type "user".
   */
  query?: string;
}

/**
 * Additional options for CloudAsset#v1SearchAllResources.
 */
export interface V1SearchAllResourcesOptions {
  /**
   * Optional. A list of asset types that this request searches for. If empty,
   * it will search all the [searchable asset
   * types](https://cloud.google.com/asset-inventory/docs/supported-asset-types#searchable_asset_types).
   * Regular expressions are also supported. For example: *
   * "compute.googleapis.com.*" snapshots resources whose asset type starts with
   * "compute.googleapis.com". * ".*Instance" snapshots resources whose asset
   * type ends with "Instance". * ".*Instance.*" snapshots resources whose asset
   * type contains "Instance". See
   * [RE2](https://github.com/google/re2/wiki/Syntax) for all supported regular
   * expression syntax. If the regular expression does not match any supported
   * asset type, an INVALID_ARGUMENT error will be returned.
   */
  assetTypes?: string;
  /**
   * Optional. A comma-separated list of fields specifying the sorting order of
   * the results. The default order is ascending. Add " DESC" after the field
   * name to indicate descending order. Redundant space characters are ignored.
   * Example: "location DESC, name". Only singular primitive fields in the
   * response are sortable: * name * assetType * project * displayName *
   * description * location * createTime * updateTime * state *
   * parentFullResourceName * parentAssetType All the other fields such as
   * repeated fields (e.g., `networkTags`, `kmsKeys`), map fields (e.g.,
   * `labels`) and struct fields (e.g., `additionalAttributes`) are not
   * supported.
   */
  orderBy?: string;
  /**
   * Optional. The page size for search result pagination. Page size is capped
   * at 500 even if a larger value is given. If set to zero, server will pick an
   * appropriate default. Returned results may be fewer than requested. When
   * this happens, there could be more results as long as `next_page_token` is
   * returned.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. `page_token` must be the value of
   * `next_page_token` from the previous response. The values of all other
   * method parameters, must be identical to those in the previous call.
   */
  pageToken?: string;
  /**
   * Optional. The query statement. See [how to construct a
   * query](https://cloud.google.com/asset-inventory/docs/searching-resources#how_to_construct_a_query)
   * for more information. If not specified or empty, it will search all the
   * resources within the specified `scope`. Examples: * `name:Important` to
   * find Google Cloud resources whose name contains "Important" as a word. *
   * `name=Important` to find the Google Cloud resource whose name is exactly
   * "Important". * `displayName:Impor*` to find Google Cloud resources whose
   * display name contains "Impor" as a prefix of any word in the field. *
   * `location:us-west*` to find Google Cloud resources whose location contains
   * both "us" and "west" as prefixes. * `labels:prod` to find Google Cloud
   * resources whose labels contain "prod" as a key or value. *
   * `labels.env:prod` to find Google Cloud resources that have a label "env"
   * and its value is "prod". * `labels.env:*` to find Google Cloud resources
   * that have a label "env". * `kmsKey:key` to find Google Cloud resources
   * encrypted with a customer-managed encryption key whose name contains "key"
   * as a word. This field is deprecated. Please use the `kmsKeys` field to
   * retrieve Cloud KMS key information. * `kmsKeys:key` to find Google Cloud
   * resources encrypted with customer-managed encryption keys whose name
   * contains the word "key". * `relationships:instance-group-1` to find Google
   * Cloud resources that have relationships with "instance-group-1" in the
   * related resource name. * `relationships:INSTANCE_TO_INSTANCEGROUP` to find
   * Compute Engine instances that have relationships of type
   * "INSTANCE_TO_INSTANCEGROUP". *
   * `relationships.INSTANCE_TO_INSTANCEGROUP:instance-group-1` to find Compute
   * Engine instances that have relationships with "instance-group-1" in the
   * Compute Engine instance group resource name, for relationship type
   * "INSTANCE_TO_INSTANCEGROUP". * `state:ACTIVE` to find Google Cloud
   * resources whose state contains "ACTIVE" as a word. * `NOT state:ACTIVE` to
   * find Google Cloud resources whose state doesn't contain "ACTIVE" as a word.
   * * `createTime<1609459200` to find Google Cloud resources that were created
   * before "2021-01-01 00:00:00 UTC". 1609459200 is the epoch timestamp of
   * "2021-01-01 00:00:00 UTC" in seconds. * `updateTime>1609459200` to find
   * Google Cloud resources that were updated after "2021-01-01 00:00:00 UTC".
   * 1609459200 is the epoch timestamp of "2021-01-01 00:00:00 UTC" in seconds.
   * * `Important` to find Google Cloud resources that contain "Important" as a
   * word in any of the searchable fields. * `Impor*` to find Google Cloud
   * resources that contain "Impor" as a prefix of any word in any of the
   * searchable fields. * `Important location:(us-west1 OR global)` to find
   * Google Cloud resources that contain "Important" as a word in any of the
   * searchable fields and are also located in the "us-west1" region or the
   * "global" location.
   */
  query?: string;
  /**
   * Optional. A comma-separated list of fields specifying which fields to be
   * returned in ResourceSearchResult. Only '*' or combination of top level
   * fields can be specified. Field names of both snake_case and camelCase are
   * supported. Examples: `"*"`, `"name,location"`, `"name,versionedResources"`.
   * The read_mask paths must be valid field paths listed but not limited to
   * (both snake_case and camelCase are supported): * name * assetType * project
   * * displayName * description * location * tagKeys * tagValues * tagValueIds
   * * labels * networkTags * kmsKey (This field is deprecated. Please use the
   * `kmsKeys` field to retrieve Cloud KMS key information.) * kmsKeys *
   * createTime * updateTime * state * additionalAttributes * versionedResources
   * If read_mask is not specified, all fields except versionedResources will be
   * returned. If only '*' is specified, all fields including versionedResources
   * will be returned. Any invalid field path will trigger INVALID_ARGUMENT
   * error.
   */
  readMask?: string /* FieldMask */;
}

function serializeV1SearchAllResourcesOptions(data: any): V1SearchAllResourcesOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

function deserializeV1SearchAllResourcesOptions(data: any): V1SearchAllResourcesOptions {
  return {
    ...data,
    readMask: data["readMask"] !== undefined ? data["readMask"] : undefined,
  };
}

/**
 * Information related to the a standard versioned package. This includes
 * package info for APT, Yum, Zypper, and Googet package managers.
 */
export interface VersionedPackage {
  /**
   * The system architecture this package is intended for.
   */
  architecture?: string;
  /**
   * The name of the package.
   */
  packageName?: string;
  /**
   * The version of the package.
   */
  version?: string;
}

/**
 * Resource representation as defined by the corresponding service providing
 * the resource for a given API version.
 */
export interface VersionedResource {
  /**
   * JSON representation of the resource as defined by the corresponding
   * service providing this resource. Example: If the resource is an instance
   * provided by Compute Engine, this field will contain the JSON representation
   * of the instance as defined by Compute Engine:
   * `https://cloud.google.com/compute/docs/reference/rest/v1/instances`. You
   * can find the resource definition for each supported resource type in this
   * table:
   * `https://cloud.google.com/asset-inventory/docs/supported-asset-types#searchable_asset_types`
   */
  resource?: {
    [key: string]: any
  };
  /**
   * API version of the resource. Example: If the resource is an instance
   * provided by Compute Engine v1 API as defined in
   * `https://cloud.google.com/compute/docs/reference/rest/v1/instances`,
   * version will be "v1".
   */
  version?: string;
}

/**
 * Contains information about a Windows application that is retrieved from the
 * Windows Registry. For more information about these fields, see:
 * https://docs.microsoft.com/en-us/windows/win32/msi/uninstall-registry-key
 */
export interface WindowsApplication {
  /**
   * The name of the application or product.
   */
  displayName?: string;
  /**
   * The version of the product or application in string format.
   */
  displayVersion?: string;
  /**
   * The internet address for technical support.
   */
  helpLink?: string;
  /**
   * The last time this product received service. The value of this property is
   * replaced each time a patch is applied or removed from the product or the
   * command-line option is used to repair the product.
   */
  installDate?: Date;
  /**
   * The name of the manufacturer for the product or application.
   */
  publisher?: string;
}

/**
 * Information related to a Quick Fix Engineering package. Fields are taken
 * from Windows QuickFixEngineering Interface and match the source names:
 * https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/win32-quickfixengineering
 */
export interface WindowsQuickFixEngineeringPackage {
  /**
   * A short textual description of the QFE update.
   */
  caption?: string;
  /**
   * A textual description of the QFE update.
   */
  description?: string;
  /**
   * Unique identifier associated with a particular QFE update.
   */
  hotFixId?: string;
  /**
   * Date that the QFE update was installed. Mapped from installed_on field.
   */
  installTime?: Date;
}

function serializeWindowsQuickFixEngineeringPackage(data: any): WindowsQuickFixEngineeringPackage {
  return {
    ...data,
    installTime: data["installTime"] !== undefined ? data["installTime"].toISOString() : undefined,
  };
}

function deserializeWindowsQuickFixEngineeringPackage(data: any): WindowsQuickFixEngineeringPackage {
  return {
    ...data,
    installTime: data["installTime"] !== undefined ? new Date(data["installTime"]) : undefined,
  };
}

/**
 * Categories specified by the Windows Update.
 */
export interface WindowsUpdateCategory {
  /**
   * The identifier of the windows update category.
   */
  id?: string;
  /**
   * The name of the windows update category.
   */
  name?: string;
}

/**
 * Details related to a Windows Update package. Field data and names are taken
 * from Windows Update API IUpdate Interface:
 * https://docs.microsoft.com/en-us/windows/win32/api/_wua/ Descriptive fields
 * like title, and description are localized based on the locale of the VM being
 * updated.
 */
export interface WindowsUpdatePackage {
  /**
   * The categories that are associated with this update package.
   */
  categories?: WindowsUpdateCategory[];
  /**
   * The localized description of the update package.
   */
  description?: string;
  /**
   * A collection of Microsoft Knowledge Base article IDs that are associated
   * with the update package.
   */
  kbArticleIds?: string[];
  /**
   * The last published date of the update, in (UTC) date and time.
   */
  lastDeploymentChangeTime?: Date;
  /**
   * A collection of URLs that provide more information about the update
   * package.
   */
  moreInfoUrls?: string[];
  /**
   * The revision number of this update package.
   */
  revisionNumber?: number;
  /**
   * A hyperlink to the language-specific support information for the update.
   */
  supportUrl?: string;
  /**
   * The localized title of the update package.
   */
  title?: string;
  /**
   * Gets the identifier of an update package. Stays the same across revisions.
   */
  updateId?: string;
}

function serializeWindowsUpdatePackage(data: any): WindowsUpdatePackage {
  return {
    ...data,
    lastDeploymentChangeTime: data["lastDeploymentChangeTime"] !== undefined ? data["lastDeploymentChangeTime"].toISOString() : undefined,
  };
}

function deserializeWindowsUpdatePackage(data: any): WindowsUpdatePackage {
  return {
    ...data,
    lastDeploymentChangeTime: data["lastDeploymentChangeTime"] !== undefined ? new Date(data["lastDeploymentChangeTime"]) : undefined,
  };
}

/**
 * Details related to a Zypper Patch.
 */
export interface ZypperPatch {
  /**
   * The category of the patch.
   */
  category?: string;
  /**
   * The name of the patch.
   */
  patchName?: string;
  /**
   * The severity specified for this patch
   */
  severity?: string;
  /**
   * Any summary information provided about this patch.
   */
  summary?: string;
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