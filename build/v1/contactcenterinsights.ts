// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Contact Center AI Insights API Client for Deno
 * ==============================================
 * 
 * 
 * 
 * Docs: https://cloud.google.com/contact-center/insights/docs
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class ContactCenterInsights {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://contactcenterinsights.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates an analysis. The long running operation is done when the analysis
   * has completed.
   *
   * @param parent Required. The parent resource of the analysis.
   */
  async projectsLocationsConversationsAnalysesCreate(parent: string, req: GoogleCloudContactcenterinsightsV1Analysis): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/analyses`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an analysis.
   *
   * @param name Required. The name of the analysis to delete.
   */
  async projectsLocationsConversationsAnalysesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an analysis.
   *
   * @param name Required. The name of the analysis to get.
   */
  async projectsLocationsConversationsAnalysesGet(name: string): Promise<GoogleCloudContactcenterinsightsV1Analysis> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudContactcenterinsightsV1Analysis;
  }

  /**
   * Lists analyses.
   *
   * @param parent Required. The parent resource of the analyses.
   */
  async projectsLocationsConversationsAnalysesList(parent: string, opts: ProjectsLocationsConversationsAnalysesListOptions = {}): Promise<GoogleCloudContactcenterinsightsV1ListAnalysesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/analyses`);
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
    return data as GoogleCloudContactcenterinsightsV1ListAnalysesResponse;
  }

  /**
   * Analyzes multiple conversations in a single request.
   *
   * @param parent Required. The parent resource to create analyses in.
   */
  async projectsLocationsConversationsBulkAnalyze(parent: string, req: GoogleCloudContactcenterinsightsV1BulkAnalyzeConversationsRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/conversations:bulkAnalyze`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets conversation statistics.
   *
   * @param location Required. The location of the conversations.
   */
  async projectsLocationsConversationsCalculateStats(location: string, opts: ProjectsLocationsConversationsCalculateStatsOptions = {}): Promise<GoogleCloudContactcenterinsightsV1CalculateStatsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ location }/conversations:calculateStats`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudContactcenterinsightsV1CalculateStatsResponse(data);
  }

  /**
   * Creates a conversation.
   *
   * @param parent Required. The parent resource of the conversation.
   */
  async projectsLocationsConversationsCreate(parent: string, req: GoogleCloudContactcenterinsightsV1Conversation, opts: ProjectsLocationsConversationsCreateOptions = {}): Promise<GoogleCloudContactcenterinsightsV1Conversation> {
    req = serializeGoogleCloudContactcenterinsightsV1Conversation(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/conversations`);
    if (opts.conversationId !== undefined) {
      url.searchParams.append("conversationId", String(opts.conversationId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudContactcenterinsightsV1Conversation(data);
  }

  /**
   * Deletes a conversation.
   *
   * @param name Required. The name of the conversation to delete.
   */
  async projectsLocationsConversationsDelete(name: string, opts: ProjectsLocationsConversationsDeleteOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.force !== undefined) {
      url.searchParams.append("force", String(opts.force));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a conversation.
   *
   * @param name Required. The name of the conversation to get.
   */
  async projectsLocationsConversationsGet(name: string, opts: ProjectsLocationsConversationsGetOptions = {}): Promise<GoogleCloudContactcenterinsightsV1Conversation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudContactcenterinsightsV1Conversation(data);
  }

  /**
   * Imports conversations and processes them according to the user's
   * configuration.
   *
   * @param parent Required. The parent resource for new conversations.
   */
  async projectsLocationsConversationsIngest(parent: string, req: GoogleCloudContactcenterinsightsV1IngestConversationsRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/conversations:ingest`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists conversations.
   *
   * @param parent Required. The parent resource of the conversation.
   */
  async projectsLocationsConversationsList(parent: string, opts: ProjectsLocationsConversationsListOptions = {}): Promise<GoogleCloudContactcenterinsightsV1ListConversationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/conversations`);
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
    return deserializeGoogleCloudContactcenterinsightsV1ListConversationsResponse(data);
  }

  /**
   * Updates a conversation.
   *
   * @param name Immutable. The resource name of the conversation. Format: projects/{project}/locations/{location}/conversations/{conversation}
   */
  async projectsLocationsConversationsPatch(name: string, req: GoogleCloudContactcenterinsightsV1Conversation, opts: ProjectsLocationsConversationsPatchOptions = {}): Promise<GoogleCloudContactcenterinsightsV1Conversation> {
    req = serializeGoogleCloudContactcenterinsightsV1Conversation(req);
    opts = serializeProjectsLocationsConversationsPatchOptions(opts);
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
    return deserializeGoogleCloudContactcenterinsightsV1Conversation(data);
  }

  /**
   * Gets project-level settings.
   *
   * @param name Required. The name of the settings resource to get.
   */
  async projectsLocationsGetSettings(name: string): Promise<GoogleCloudContactcenterinsightsV1Settings> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudContactcenterinsightsV1Settings(data);
  }

  /**
   * Export insights data to a destination defined in the request body.
   *
   * @param parent Required. The parent resource to export data from.
   */
  async projectsLocationsInsightsdataExport(parent: string, req: GoogleCloudContactcenterinsightsV1ExportInsightsDataRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/insightsdata:export`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets an issue model's statistics.
   *
   * @param issueModel Required. The resource name of the issue model to query against.
   */
  async projectsLocationsIssueModelsCalculateIssueModelStats(issueModel: string): Promise<GoogleCloudContactcenterinsightsV1CalculateIssueModelStatsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ issueModel }:calculateIssueModelStats`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudContactcenterinsightsV1CalculateIssueModelStatsResponse(data);
  }

  /**
   * Creates an issue model.
   *
   * @param parent Required. The parent resource of the issue model.
   */
  async projectsLocationsIssueModelsCreate(parent: string, req: GoogleCloudContactcenterinsightsV1IssueModel): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/issueModels`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an issue model.
   *
   * @param name Required. The name of the issue model to delete.
   */
  async projectsLocationsIssueModelsDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deploys an issue model. Returns an error if a model is already deployed.
   * An issue model can only be used in analysis after it has been deployed.
   *
   * @param name Required. The issue model to deploy.
   */
  async projectsLocationsIssueModelsDeploy(name: string, req: GoogleCloudContactcenterinsightsV1DeployIssueModelRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:deploy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets an issue model.
   *
   * @param name Required. The name of the issue model to get.
   */
  async projectsLocationsIssueModelsGet(name: string): Promise<GoogleCloudContactcenterinsightsV1IssueModel> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudContactcenterinsightsV1IssueModel;
  }

  /**
   * Deletes an issue.
   *
   * @param name Required. The name of the issue to delete.
   */
  async projectsLocationsIssueModelsIssuesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an issue.
   *
   * @param name Required. The name of the issue to get.
   */
  async projectsLocationsIssueModelsIssuesGet(name: string): Promise<GoogleCloudContactcenterinsightsV1Issue> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudContactcenterinsightsV1Issue;
  }

  /**
   * Lists issues.
   *
   * @param parent Required. The parent resource of the issue.
   */
  async projectsLocationsIssueModelsIssuesList(parent: string): Promise<GoogleCloudContactcenterinsightsV1ListIssuesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/issues`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudContactcenterinsightsV1ListIssuesResponse;
  }

  /**
   * Updates an issue.
   *
   * @param name Immutable. The resource name of the issue. Format: projects/{project}/locations/{location}/issueModels/{issue_model}/issues/{issue}
   */
  async projectsLocationsIssueModelsIssuesPatch(name: string, req: GoogleCloudContactcenterinsightsV1Issue, opts: ProjectsLocationsIssueModelsIssuesPatchOptions = {}): Promise<GoogleCloudContactcenterinsightsV1Issue> {
    opts = serializeProjectsLocationsIssueModelsIssuesPatchOptions(opts);
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
    return data as GoogleCloudContactcenterinsightsV1Issue;
  }

  /**
   * Lists issue models.
   *
   * @param parent Required. The parent resource of the issue model.
   */
  async projectsLocationsIssueModelsList(parent: string): Promise<GoogleCloudContactcenterinsightsV1ListIssueModelsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/issueModels`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudContactcenterinsightsV1ListIssueModelsResponse;
  }

  /**
   * Updates an issue model.
   *
   * @param name Immutable. The resource name of the issue model. Format: projects/{project}/locations/{location}/issueModels/{issue_model}
   */
  async projectsLocationsIssueModelsPatch(name: string, req: GoogleCloudContactcenterinsightsV1IssueModel, opts: ProjectsLocationsIssueModelsPatchOptions = {}): Promise<GoogleCloudContactcenterinsightsV1IssueModel> {
    opts = serializeProjectsLocationsIssueModelsPatchOptions(opts);
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
    return data as GoogleCloudContactcenterinsightsV1IssueModel;
  }

  /**
   * Undeploys an issue model. An issue model can not be used in analysis after
   * it has been undeployed.
   *
   * @param name Required. The issue model to undeploy.
   */
  async projectsLocationsIssueModelsUndeploy(name: string, req: GoogleCloudContactcenterinsightsV1UndeployIssueModelRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:undeploy`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
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
  async projectsLocationsOperationsCancel(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
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
   * Creates a phrase matcher.
   *
   * @param parent Required. The parent resource of the phrase matcher. Required. The location to create a phrase matcher for. Format: `projects//locations/` or `projects//locations/`
   */
  async projectsLocationsPhraseMatchersCreate(parent: string, req: GoogleCloudContactcenterinsightsV1PhraseMatcher): Promise<GoogleCloudContactcenterinsightsV1PhraseMatcher> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/phraseMatchers`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudContactcenterinsightsV1PhraseMatcher;
  }

  /**
   * Deletes a phrase matcher.
   *
   * @param name Required. The name of the phrase matcher to delete.
   */
  async projectsLocationsPhraseMatchersDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a phrase matcher.
   *
   * @param name Required. The name of the phrase matcher to get.
   */
  async projectsLocationsPhraseMatchersGet(name: string): Promise<GoogleCloudContactcenterinsightsV1PhraseMatcher> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudContactcenterinsightsV1PhraseMatcher;
  }

  /**
   * Lists phrase matchers.
   *
   * @param parent Required. The parent resource of the phrase matcher.
   */
  async projectsLocationsPhraseMatchersList(parent: string, opts: ProjectsLocationsPhraseMatchersListOptions = {}): Promise<GoogleCloudContactcenterinsightsV1ListPhraseMatchersResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/phraseMatchers`);
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
    return data as GoogleCloudContactcenterinsightsV1ListPhraseMatchersResponse;
  }

  /**
   * Updates a phrase matcher.
   *
   * @param name The resource name of the phrase matcher. Format: projects/{project}/locations/{location}/phraseMatchers/{phrase_matcher}
   */
  async projectsLocationsPhraseMatchersPatch(name: string, req: GoogleCloudContactcenterinsightsV1PhraseMatcher, opts: ProjectsLocationsPhraseMatchersPatchOptions = {}): Promise<GoogleCloudContactcenterinsightsV1PhraseMatcher> {
    opts = serializeProjectsLocationsPhraseMatchersPatchOptions(opts);
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
    return data as GoogleCloudContactcenterinsightsV1PhraseMatcher;
  }

  /**
   * Updates project-level settings.
   *
   * @param name Immutable. The resource name of the settings resource. Format: projects/{project}/locations/{location}/settings
   */
  async projectsLocationsUpdateSettings(name: string, req: GoogleCloudContactcenterinsightsV1Settings, opts: ProjectsLocationsUpdateSettingsOptions = {}): Promise<GoogleCloudContactcenterinsightsV1Settings> {
    req = serializeGoogleCloudContactcenterinsightsV1Settings(req);
    opts = serializeProjectsLocationsUpdateSettingsOptions(opts);
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
    return deserializeGoogleCloudContactcenterinsightsV1Settings(data);
  }

  /**
   * Creates a view.
   *
   * @param parent Required. The parent resource of the view. Required. The location to create a view for. Format: `projects//locations/` or `projects//locations/`
   */
  async projectsLocationsViewsCreate(parent: string, req: GoogleCloudContactcenterinsightsV1View): Promise<GoogleCloudContactcenterinsightsV1View> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/views`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudContactcenterinsightsV1View;
  }

  /**
   * Deletes a view.
   *
   * @param name Required. The name of the view to delete.
   */
  async projectsLocationsViewsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets a view.
   *
   * @param name Required. The name of the view to get.
   */
  async projectsLocationsViewsGet(name: string): Promise<GoogleCloudContactcenterinsightsV1View> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudContactcenterinsightsV1View;
  }

  /**
   * Lists views.
   *
   * @param parent Required. The parent resource of the views.
   */
  async projectsLocationsViewsList(parent: string, opts: ProjectsLocationsViewsListOptions = {}): Promise<GoogleCloudContactcenterinsightsV1ListViewsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/views`);
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
    return data as GoogleCloudContactcenterinsightsV1ListViewsResponse;
  }

  /**
   * Updates a view.
   *
   * @param name Immutable. The resource name of the view. Format: projects/{project}/locations/{location}/views/{view}
   */
  async projectsLocationsViewsPatch(name: string, req: GoogleCloudContactcenterinsightsV1View, opts: ProjectsLocationsViewsPatchOptions = {}): Promise<GoogleCloudContactcenterinsightsV1View> {
    opts = serializeProjectsLocationsViewsPatchOptions(opts);
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
    return data as GoogleCloudContactcenterinsightsV1View;
  }
}

/**
 * Selector of all available annotators and phrase matchers to run.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1AnnotatorSelector {
  /**
   * The issue model to run. If not provided, the most recently deployed topic
   * model will be used. The provided issue model will only be used for
   * inference if the issue model is deployed and if run_issue_model_annotator
   * is set to true. If more than one issue model is provided, only the first
   * provided issue model will be used for inference.
   */
  issueModels?: string[];
  /**
   * The list of phrase matchers to run. If not provided, all active phrase
   * matchers will be used. If inactive phrase matchers are provided, they will
   * not be used. Phrase matchers will be run only if
   * run_phrase_matcher_annotator is set to true. Format:
   * projects/{project}/locations/{location}/phraseMatchers/{phrase_matcher}
   */
  phraseMatchers?: string[];
  /**
   * Whether to run the entity annotator.
   */
  runEntityAnnotator?: boolean;
  /**
   * Whether to run the intent annotator.
   */
  runIntentAnnotator?: boolean;
  /**
   * Whether to run the interruption annotator.
   */
  runInterruptionAnnotator?: boolean;
  /**
   * Whether to run the issue model annotator. A model should have already been
   * deployed for this to take effect.
   */
  runIssueModelAnnotator?: boolean;
  /**
   * Whether to run the active phrase matcher annotator(s).
   */
  runPhraseMatcherAnnotator?: boolean;
  /**
   * Whether to run the sentiment annotator.
   */
  runSentimentAnnotator?: boolean;
  /**
   * Whether to run the silence annotator.
   */
  runSilenceAnnotator?: boolean;
}

/**
 * The metadata for a bulk analyze conversations operation.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1BulkAnalyzeConversationsMetadata {
  /**
   * The number of requested analyses that have completed successfully so far.
   */
  completedAnalysesCount?: number;
  /**
   * The time the operation was created.
   */
  createTime?: Date;
  /**
   * The time the operation finished running.
   */
  endTime?: Date;
  /**
   * The number of requested analyses that have failed so far.
   */
  failedAnalysesCount?: number;
  /**
   * The original request for bulk analyze.
   */
  request?: GoogleCloudContactcenterinsightsV1alpha1BulkAnalyzeConversationsRequest;
  /**
   * Total number of analyses requested. Computed by the number of
   * conversations returned by `filter` multiplied by `analysis_percentage` in
   * the request.
   */
  totalRequestedAnalysesCount?: number;
}

function serializeGoogleCloudContactcenterinsightsV1alpha1BulkAnalyzeConversationsMetadata(data: any): GoogleCloudContactcenterinsightsV1alpha1BulkAnalyzeConversationsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1alpha1BulkAnalyzeConversationsMetadata(data: any): GoogleCloudContactcenterinsightsV1alpha1BulkAnalyzeConversationsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * The request to analyze conversations in bulk.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1BulkAnalyzeConversationsRequest {
  /**
   * Required. Percentage of selected conversation to analyze, between [0,
   * 100].
   */
  analysisPercentage?: number;
  /**
   * To select the annotators to run and the phrase matchers to use (if any).
   * If not specified, all annotators will be run.
   */
  annotatorSelector?: GoogleCloudContactcenterinsightsV1alpha1AnnotatorSelector;
  /**
   * Required. Filter used to select the subset of conversations to analyze.
   */
  filter?: string;
  /**
   * Required. The parent resource to create analyses in.
   */
  parent?: string;
}

/**
 * The response for a bulk analyze conversations operation.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1BulkAnalyzeConversationsResponse {
  /**
   * Count of failed analyses.
   */
  failedAnalysisCount?: number;
  /**
   * Count of successful analyses.
   */
  successfulAnalysisCount?: number;
}

/**
 * Metadata for a create analysis operation.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1CreateAnalysisOperationMetadata {
  /**
   * Output only. The annotator selector used for the analysis (if any).
   */
  readonly annotatorSelector?: GoogleCloudContactcenterinsightsV1alpha1AnnotatorSelector;
  /**
   * Output only. The Conversation that this Analysis Operation belongs to.
   */
  readonly conversation?: string;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
}

/**
 * Metadata for creating an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1CreateIssueModelMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * The original request for creation.
   */
  request?: GoogleCloudContactcenterinsightsV1alpha1CreateIssueModelRequest;
}

/**
 * The request to create an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1CreateIssueModelRequest {
  /**
   * Required. The issue model to create.
   */
  issueModel?: GoogleCloudContactcenterinsightsV1alpha1IssueModel;
  /**
   * Required. The parent resource of the issue model.
   */
  parent?: string;
}

/**
 * Metadata for deleting an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1DeleteIssueModelMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * The original request for deletion.
   */
  request?: GoogleCloudContactcenterinsightsV1alpha1DeleteIssueModelRequest;
}

/**
 * The request to delete an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1DeleteIssueModelRequest {
  /**
   * Required. The name of the issue model to delete.
   */
  name?: string;
}

/**
 * Metadata for deploying an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1DeployIssueModelMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * The original request for deployment.
   */
  request?: GoogleCloudContactcenterinsightsV1alpha1DeployIssueModelRequest;
}

/**
 * The request to deploy an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1DeployIssueModelRequest {
  /**
   * Required. The issue model to deploy.
   */
  name?: string;
}

/**
 * The response to deploy an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1DeployIssueModelResponse {
}

/**
 * Metadata for an export insights operation.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1ExportInsightsDataMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Partial errors during export operation that might cause the operation
   * output to be incomplete.
   */
  partialErrors?: GoogleRpcStatus[];
  /**
   * The original request for export.
   */
  request?: GoogleCloudContactcenterinsightsV1alpha1ExportInsightsDataRequest;
}

/**
 * The request to export insights.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1ExportInsightsDataRequest {
  /**
   * Specified if sink is a BigQuery table.
   */
  bigQueryDestination?: GoogleCloudContactcenterinsightsV1alpha1ExportInsightsDataRequestBigQueryDestination;
  /**
   * A filter to reduce results to a specific subset. Useful for exporting
   * conversations with specific properties.
   */
  filter?: string;
  /**
   * A fully qualified KMS key name for BigQuery tables protected by CMEK.
   * Format:
   * projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}/cryptoKeyVersions/{version}
   */
  kmsKey?: string;
  /**
   * Required. The parent resource to export data from.
   */
  parent?: string;
  /**
   * Options for what to do if the destination table already exists.
   */
  writeDisposition?:  | "WRITE_DISPOSITION_UNSPECIFIED" | "WRITE_TRUNCATE" | "WRITE_APPEND";
}

/**
 * A BigQuery Table Reference.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1ExportInsightsDataRequestBigQueryDestination {
  /**
   * Required. The name of the BigQuery dataset that the snapshot result should
   * be exported to. If this dataset does not exist, the export call returns an
   * INVALID_ARGUMENT error.
   */
  dataset?: string;
  /**
   * A project ID or number. If specified, then export will attempt to write
   * data to this project instead of the resource project. Otherwise, the
   * resource project will be used.
   */
  projectId?: string;
  /**
   * The BigQuery table name to which the insights data should be written. If
   * this table does not exist, the export call returns an INVALID_ARGUMENT
   * error.
   */
  table?: string;
}

/**
 * Response for an export insights operation.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1ExportInsightsDataResponse {
}

/**
 * The metadata for an IngestConversations operation.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1IngestConversationsMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Statistics for IngestConversations operation.
   */
  readonly ingestConversationsStats?: GoogleCloudContactcenterinsightsV1alpha1IngestConversationsMetadataIngestConversationsStats;
  /**
   * Output only. Partial errors during ingest operation that might cause the
   * operation output to be incomplete.
   */
  readonly partialErrors?: GoogleRpcStatus[];
  /**
   * Output only. The original request for ingest.
   */
  readonly request?: GoogleCloudContactcenterinsightsV1alpha1IngestConversationsRequest;
}

/**
 * Statistics for IngestConversations operation.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1IngestConversationsMetadataIngestConversationsStats {
  /**
   * Output only. The number of objects skipped because another conversation
   * with the same transcript uri had already been ingested.
   */
  readonly duplicatesSkippedCount?: number;
  /**
   * Output only. The number of objects which were unable to be ingested due to
   * errors. The errors are populated in the partial_errors field.
   */
  readonly failedIngestCount?: number;
  /**
   * Output only. The number of objects processed during the ingest operation.
   */
  readonly processedObjectCount?: number;
  /**
   * Output only. The number of new conversations added during this ingest
   * operation.
   */
  readonly successfulIngestCount?: number;
}

/**
 * The request to ingest conversations.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1IngestConversationsRequest {
  /**
   * Configuration that applies to all conversations.
   */
  conversationConfig?: GoogleCloudContactcenterinsightsV1alpha1IngestConversationsRequestConversationConfig;
  /**
   * A cloud storage bucket source.
   */
  gcsSource?: GoogleCloudContactcenterinsightsV1alpha1IngestConversationsRequestGcsSource;
  /**
   * Required. The parent resource for new conversations.
   */
  parent?: string;
  /**
   * Configuration for when `source` contains conversation transcripts.
   */
  transcriptObjectConfig?: GoogleCloudContactcenterinsightsV1alpha1IngestConversationsRequestTranscriptObjectConfig;
}

/**
 * Configuration that applies to all conversations.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1IngestConversationsRequestConversationConfig {
  /**
   * An opaque, user-specified string representing the human agent who handled
   * the conversations.
   */
  agentId?: string;
}

/**
 * Configuration for Cloud Storage bucket sources.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1IngestConversationsRequestGcsSource {
  /**
   * Required. The Cloud Storage bucket containing source objects.
   */
  bucketUri?: string;
}

/**
 * Configuration for processing transcript objects.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1IngestConversationsRequestTranscriptObjectConfig {
  /**
   * Required. The medium transcript objects represent.
   */
  medium?:  | "MEDIUM_UNSPECIFIED" | "PHONE_CALL" | "CHAT";
}

/**
 * The response to an IngestConversations operation.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1IngestConversationsResponse {
}

/**
 * The issue model resource.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1IssueModel {
  /**
   * Output only. The time at which this issue model was created.
   */
  readonly createTime?: Date;
  /**
   * The representative name for the issue model.
   */
  displayName?: string;
  /**
   * Configs for the input data that used to create the issue model.
   */
  inputDataConfig?: GoogleCloudContactcenterinsightsV1alpha1IssueModelInputDataConfig;
  /**
   * Output only. Number of issues in this issue model.
   */
  readonly issueCount?: bigint;
  /**
   * Immutable. The resource name of the issue model. Format:
   * projects/{project}/locations/{location}/issueModels/{issue_model}
   */
  name?: string;
  /**
   * Output only. State of the model.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "UNDEPLOYED" | "DEPLOYING" | "DEPLOYED" | "UNDEPLOYING" | "DELETING";
  /**
   * Output only. Immutable. The issue model's label statistics on its training
   * data.
   */
  readonly trainingStats?: GoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStats;
  /**
   * Output only. The most recent time at which the issue model was updated.
   */
  readonly updateTime?: Date;
}

/**
 * Configs for the input data used to create the issue model.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1IssueModelInputDataConfig {
  /**
   * A filter to reduce the conversations used for training the model to a
   * specific subset.
   */
  filter?: string;
  /**
   * Medium of conversations used in training data. This field is being
   * deprecated. To specify the medium to be used in training a new issue model,
   * set the `medium` field on `filter`.
   */
  medium?:  | "MEDIUM_UNSPECIFIED" | "PHONE_CALL" | "CHAT";
  /**
   * Output only. Number of conversations used in training. Output only.
   */
  readonly trainingConversationsCount?: bigint;
}

/**
 * Aggregated statistics about an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStats {
  /**
   * Number of conversations the issue model has analyzed at this point in
   * time.
   */
  analyzedConversationsCount?: bigint;
  /**
   * Statistics on each issue. Key is the issue's resource name.
   */
  issueStats?: {
    [key: string]: GoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStatsIssueStats
  };
  /**
   * Number of analyzed conversations for which no issue was applicable at this
   * point in time.
   */
  unclassifiedConversationsCount?: bigint;
}

function serializeGoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStats(data: any): GoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStats {
  return {
    ...data,
    analyzedConversationsCount: data["analyzedConversationsCount"] !== undefined ? String(data["analyzedConversationsCount"]) : undefined,
    issueStats: data["issueStats"] !== undefined ? Object.fromEntries(Object.entries(data["issueStats"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStatsIssueStats(v)]))) : undefined,
    unclassifiedConversationsCount: data["unclassifiedConversationsCount"] !== undefined ? String(data["unclassifiedConversationsCount"]) : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStats(data: any): GoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStats {
  return {
    ...data,
    analyzedConversationsCount: data["analyzedConversationsCount"] !== undefined ? BigInt(data["analyzedConversationsCount"]) : undefined,
    issueStats: data["issueStats"] !== undefined ? Object.fromEntries(Object.entries(data["issueStats"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStatsIssueStats(v)]))) : undefined,
    unclassifiedConversationsCount: data["unclassifiedConversationsCount"] !== undefined ? BigInt(data["unclassifiedConversationsCount"]) : undefined,
  };
}

/**
 * Aggregated statistics about an issue.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStatsIssueStats {
  /**
   * Display name of the issue.
   */
  displayName?: string;
  /**
   * Issue resource. Format:
   * projects/{project}/locations/{location}/issueModels/{issue_model}/issues/{issue}
   */
  issue?: string;
  /**
   * Number of conversations attached to the issue at this point in time.
   */
  labeledConversationsCount?: bigint;
}

function serializeGoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStatsIssueStats(data: any): GoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStatsIssueStats {
  return {
    ...data,
    labeledConversationsCount: data["labeledConversationsCount"] !== undefined ? String(data["labeledConversationsCount"]) : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStatsIssueStats(data: any): GoogleCloudContactcenterinsightsV1alpha1IssueModelLabelStatsIssueStats {
  return {
    ...data,
    labeledConversationsCount: data["labeledConversationsCount"] !== undefined ? BigInt(data["labeledConversationsCount"]) : undefined,
  };
}

/**
 * Metadata for undeploying an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1UndeployIssueModelMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * The original request for undeployment.
   */
  request?: GoogleCloudContactcenterinsightsV1alpha1UndeployIssueModelRequest;
}

/**
 * The request to undeploy an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1UndeployIssueModelRequest {
  /**
   * Required. The issue model to undeploy.
   */
  name?: string;
}

/**
 * The response to undeploy an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1alpha1UndeployIssueModelResponse {
}

/**
 * The analysis resource.
 */
export interface GoogleCloudContactcenterinsightsV1Analysis {
  /**
   * Output only. The result of the analysis, which is populated when the
   * analysis finishes.
   */
  readonly analysisResult?: GoogleCloudContactcenterinsightsV1AnalysisResult;
  /**
   * To select the annotators to run and the phrase matchers to use (if any).
   * If not specified, all annotators will be run.
   */
  annotatorSelector?: GoogleCloudContactcenterinsightsV1AnnotatorSelector;
  /**
   * Output only. The time at which the analysis was created, which occurs when
   * the long-running operation completes.
   */
  readonly createTime?: Date;
  /**
   * Immutable. The resource name of the analysis. Format:
   * projects/{project}/locations/{location}/conversations/{conversation}/analyses/{analysis}
   */
  name?: string;
  /**
   * Output only. The time at which the analysis was requested.
   */
  readonly requestTime?: Date;
}

/**
 * The result of an analysis.
 */
export interface GoogleCloudContactcenterinsightsV1AnalysisResult {
  /**
   * Call-specific metadata created by the analysis.
   */
  callAnalysisMetadata?: GoogleCloudContactcenterinsightsV1AnalysisResultCallAnalysisMetadata;
  /**
   * The time at which the analysis ended.
   */
  endTime?: Date;
}

function serializeGoogleCloudContactcenterinsightsV1AnalysisResult(data: any): GoogleCloudContactcenterinsightsV1AnalysisResult {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1AnalysisResult(data: any): GoogleCloudContactcenterinsightsV1AnalysisResult {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * Call-specific metadata created during analysis.
 */
export interface GoogleCloudContactcenterinsightsV1AnalysisResultCallAnalysisMetadata {
  /**
   * A list of call annotations that apply to this call.
   */
  annotations?: GoogleCloudContactcenterinsightsV1CallAnnotation[];
  /**
   * All the entities in the call.
   */
  entities?: {
    [key: string]: GoogleCloudContactcenterinsightsV1Entity
  };
  /**
   * All the matched intents in the call.
   */
  intents?: {
    [key: string]: GoogleCloudContactcenterinsightsV1Intent
  };
  /**
   * Overall conversation-level issue modeling result.
   */
  issueModelResult?: GoogleCloudContactcenterinsightsV1IssueModelResult;
  /**
   * All the matched phrase matchers in the call.
   */
  phraseMatchers?: {
    [key: string]: GoogleCloudContactcenterinsightsV1PhraseMatchData
  };
  /**
   * Overall conversation-level sentiment for each channel of the call.
   */
  sentiments?: GoogleCloudContactcenterinsightsV1ConversationLevelSentiment[];
}

/**
 * A point in a conversation that marks the start or the end of an annotation.
 */
export interface GoogleCloudContactcenterinsightsV1AnnotationBoundary {
  /**
   * The index in the sequence of transcribed pieces of the conversation where
   * the boundary is located. This index starts at zero.
   */
  transcriptIndex?: number;
  /**
   * The word index of this boundary with respect to the first word in the
   * transcript piece. This index starts at zero.
   */
  wordIndex?: number;
}

/**
 * Selector of all available annotators and phrase matchers to run.
 */
export interface GoogleCloudContactcenterinsightsV1AnnotatorSelector {
  /**
   * The issue model to run. If not provided, the most recently deployed topic
   * model will be used. The provided issue model will only be used for
   * inference if the issue model is deployed and if run_issue_model_annotator
   * is set to true. If more than one issue model is provided, only the first
   * provided issue model will be used for inference.
   */
  issueModels?: string[];
  /**
   * The list of phrase matchers to run. If not provided, all active phrase
   * matchers will be used. If inactive phrase matchers are provided, they will
   * not be used. Phrase matchers will be run only if
   * run_phrase_matcher_annotator is set to true. Format:
   * projects/{project}/locations/{location}/phraseMatchers/{phrase_matcher}
   */
  phraseMatchers?: string[];
  /**
   * Whether to run the entity annotator.
   */
  runEntityAnnotator?: boolean;
  /**
   * Whether to run the intent annotator.
   */
  runIntentAnnotator?: boolean;
  /**
   * Whether to run the interruption annotator.
   */
  runInterruptionAnnotator?: boolean;
  /**
   * Whether to run the issue model annotator. A model should have already been
   * deployed for this to take effect.
   */
  runIssueModelAnnotator?: boolean;
  /**
   * Whether to run the active phrase matcher annotator(s).
   */
  runPhraseMatcherAnnotator?: boolean;
  /**
   * Whether to run the sentiment annotator.
   */
  runSentimentAnnotator?: boolean;
  /**
   * Whether to run the silence annotator.
   */
  runSilenceAnnotator?: boolean;
}

/**
 * The feedback that the customer has about a certain answer in the
 * conversation.
 */
export interface GoogleCloudContactcenterinsightsV1AnswerFeedback {
  /**
   * Indicates whether an answer or item was clicked by the human agent.
   */
  clicked?: boolean;
  /**
   * The correctness level of an answer.
   */
  correctnessLevel?:  | "CORRECTNESS_LEVEL_UNSPECIFIED" | "NOT_CORRECT" | "PARTIALLY_CORRECT" | "FULLY_CORRECT";
  /**
   * Indicates whether an answer or item was displayed to the human agent in
   * the agent desktop UI.
   */
  displayed?: boolean;
}

/**
 * Agent Assist Article Suggestion data.
 */
export interface GoogleCloudContactcenterinsightsV1ArticleSuggestionData {
  /**
   * The system's confidence score that this article is a good match for this
   * conversation, ranging from 0.0 (completely uncertain) to 1.0 (completely
   * certain).
   */
  confidenceScore?: number;
  /**
   * Map that contains metadata about the Article Suggestion and the document
   * that it originates from.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * The name of the answer record. Format:
   * projects/{project}/locations/{location}/answerRecords/{answer_record}
   */
  queryRecord?: string;
  /**
   * The knowledge document that this answer was extracted from. Format:
   * projects/{project}/knowledgeBases/{knowledge_base}/documents/{document}
   */
  source?: string;
  /**
   * Article title.
   */
  title?: string;
  /**
   * Article URI.
   */
  uri?: string;
}

/**
 * The metadata for a bulk analyze conversations operation.
 */
export interface GoogleCloudContactcenterinsightsV1BulkAnalyzeConversationsMetadata {
  /**
   * The number of requested analyses that have completed successfully so far.
   */
  completedAnalysesCount?: number;
  /**
   * The time the operation was created.
   */
  createTime?: Date;
  /**
   * The time the operation finished running.
   */
  endTime?: Date;
  /**
   * The number of requested analyses that have failed so far.
   */
  failedAnalysesCount?: number;
  /**
   * The original request for bulk analyze.
   */
  request?: GoogleCloudContactcenterinsightsV1BulkAnalyzeConversationsRequest;
  /**
   * Total number of analyses requested. Computed by the number of
   * conversations returned by `filter` multiplied by `analysis_percentage` in
   * the request.
   */
  totalRequestedAnalysesCount?: number;
}

function serializeGoogleCloudContactcenterinsightsV1BulkAnalyzeConversationsMetadata(data: any): GoogleCloudContactcenterinsightsV1BulkAnalyzeConversationsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1BulkAnalyzeConversationsMetadata(data: any): GoogleCloudContactcenterinsightsV1BulkAnalyzeConversationsMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
  };
}

/**
 * The request to analyze conversations in bulk.
 */
export interface GoogleCloudContactcenterinsightsV1BulkAnalyzeConversationsRequest {
  /**
   * Required. Percentage of selected conversation to analyze, between [0,
   * 100].
   */
  analysisPercentage?: number;
  /**
   * To select the annotators to run and the phrase matchers to use (if any).
   * If not specified, all annotators will be run.
   */
  annotatorSelector?: GoogleCloudContactcenterinsightsV1AnnotatorSelector;
  /**
   * Required. Filter used to select the subset of conversations to analyze.
   */
  filter?: string;
  /**
   * Required. The parent resource to create analyses in.
   */
  parent?: string;
}

/**
 * The response for a bulk analyze conversations operation.
 */
export interface GoogleCloudContactcenterinsightsV1BulkAnalyzeConversationsResponse {
  /**
   * Count of failed analyses.
   */
  failedAnalysisCount?: number;
  /**
   * Count of successful analyses.
   */
  successfulAnalysisCount?: number;
}

/**
 * Response of querying an issue model's statistics.
 */
export interface GoogleCloudContactcenterinsightsV1CalculateIssueModelStatsResponse {
  /**
   * The latest label statistics for the queried issue model. Includes results
   * on both training data and data labeled after deployment.
   */
  currentStats?: GoogleCloudContactcenterinsightsV1IssueModelLabelStats;
}

function serializeGoogleCloudContactcenterinsightsV1CalculateIssueModelStatsResponse(data: any): GoogleCloudContactcenterinsightsV1CalculateIssueModelStatsResponse {
  return {
    ...data,
    currentStats: data["currentStats"] !== undefined ? serializeGoogleCloudContactcenterinsightsV1IssueModelLabelStats(data["currentStats"]) : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1CalculateIssueModelStatsResponse(data: any): GoogleCloudContactcenterinsightsV1CalculateIssueModelStatsResponse {
  return {
    ...data,
    currentStats: data["currentStats"] !== undefined ? deserializeGoogleCloudContactcenterinsightsV1IssueModelLabelStats(data["currentStats"]) : undefined,
  };
}

/**
 * The response for calculating conversation statistics.
 */
export interface GoogleCloudContactcenterinsightsV1CalculateStatsResponse {
  /**
   * The average duration of all conversations. The average is calculated using
   * only conversations that have a time duration.
   */
  averageDuration?: number /* Duration */;
  /**
   * The average number of turns per conversation.
   */
  averageTurnCount?: number;
  /**
   * The total number of conversations.
   */
  conversationCount?: number;
  /**
   * A time series representing the count of conversations created over time
   * that match that requested filter criteria.
   */
  conversationCountTimeSeries?: GoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeries;
  /**
   * A map associating each custom highlighter resource name with its
   * respective number of matches in the set of conversations.
   */
  customHighlighterMatches?: {
    [key: string]: number
  };
  /**
   * A map associating each issue resource name with its respective number of
   * matches in the set of conversations. Key has the format:
   * `projects//locations//issueModels//issues/` Deprecated, use
   * `issue_matches_stats` field instead.
   */
  issueMatches?: {
    [key: string]: number
  };
  /**
   * A map associating each issue resource name with its respective number of
   * matches in the set of conversations. Key has the format:
   * `projects//locations//issueModels//issues/`
   */
  issueMatchesStats?: {
    [key: string]: GoogleCloudContactcenterinsightsV1IssueModelLabelStatsIssueStats
  };
  /**
   * A map associating each smart highlighter display name with its respective
   * number of matches in the set of conversations.
   */
  smartHighlighterMatches?: {
    [key: string]: number
  };
}

function serializeGoogleCloudContactcenterinsightsV1CalculateStatsResponse(data: any): GoogleCloudContactcenterinsightsV1CalculateStatsResponse {
  return {
    ...data,
    averageDuration: data["averageDuration"] !== undefined ? data["averageDuration"] : undefined,
    conversationCountTimeSeries: data["conversationCountTimeSeries"] !== undefined ? serializeGoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeries(data["conversationCountTimeSeries"]) : undefined,
    issueMatchesStats: data["issueMatchesStats"] !== undefined ? Object.fromEntries(Object.entries(data["issueMatchesStats"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudContactcenterinsightsV1IssueModelLabelStatsIssueStats(v)]))) : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1CalculateStatsResponse(data: any): GoogleCloudContactcenterinsightsV1CalculateStatsResponse {
  return {
    ...data,
    averageDuration: data["averageDuration"] !== undefined ? data["averageDuration"] : undefined,
    conversationCountTimeSeries: data["conversationCountTimeSeries"] !== undefined ? deserializeGoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeries(data["conversationCountTimeSeries"]) : undefined,
    issueMatchesStats: data["issueMatchesStats"] !== undefined ? Object.fromEntries(Object.entries(data["issueMatchesStats"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudContactcenterinsightsV1IssueModelLabelStatsIssueStats(v)]))) : undefined,
  };
}

/**
 * A time series representing conversations over time.
 */
export interface GoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeries {
  /**
   * The duration of each interval.
   */
  intervalDuration?: number /* Duration */;
  /**
   * An ordered list of intervals from earliest to latest, where each interval
   * represents the number of conversations that transpired during the time
   * window.
   */
  points?: GoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeriesInterval[];
}

function serializeGoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeries(data: any): GoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeries {
  return {
    ...data,
    intervalDuration: data["intervalDuration"] !== undefined ? data["intervalDuration"] : undefined,
    points: data["points"] !== undefined ? data["points"].map((item: any) => (serializeGoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeriesInterval(item))) : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeries(data: any): GoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeries {
  return {
    ...data,
    intervalDuration: data["intervalDuration"] !== undefined ? data["intervalDuration"] : undefined,
    points: data["points"] !== undefined ? data["points"].map((item: any) => (deserializeGoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeriesInterval(item))) : undefined,
  };
}

/**
 * A single interval in a time series.
 */
export interface GoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeriesInterval {
  /**
   * The number of conversations created in this interval.
   */
  conversationCount?: number;
  /**
   * The start time of this interval.
   */
  startTime?: Date;
}

function serializeGoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeriesInterval(data: any): GoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeriesInterval {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeriesInterval(data: any): GoogleCloudContactcenterinsightsV1CalculateStatsResponseTimeSeriesInterval {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * A piece of metadata that applies to a window of a call.
 */
export interface GoogleCloudContactcenterinsightsV1CallAnnotation {
  /**
   * The boundary in the conversation where the annotation ends, inclusive.
   */
  annotationEndBoundary?: GoogleCloudContactcenterinsightsV1AnnotationBoundary;
  /**
   * The boundary in the conversation where the annotation starts, inclusive.
   */
  annotationStartBoundary?: GoogleCloudContactcenterinsightsV1AnnotationBoundary;
  /**
   * The channel of the audio where the annotation occurs. For single-channel
   * audio, this field is not populated.
   */
  channelTag?: number;
  /**
   * Data specifying an entity mention.
   */
  entityMentionData?: GoogleCloudContactcenterinsightsV1EntityMentionData;
  /**
   * Data specifying a hold.
   */
  holdData?: GoogleCloudContactcenterinsightsV1HoldData;
  /**
   * Data specifying an intent match.
   */
  intentMatchData?: GoogleCloudContactcenterinsightsV1IntentMatchData;
  /**
   * Data specifying an interruption.
   */
  interruptionData?: GoogleCloudContactcenterinsightsV1InterruptionData;
  /**
   * Data specifying an issue match.
   */
  issueMatchData?: GoogleCloudContactcenterinsightsV1IssueMatchData;
  /**
   * Data specifying a phrase match.
   */
  phraseMatchData?: GoogleCloudContactcenterinsightsV1PhraseMatchData;
  /**
   * Data specifying sentiment.
   */
  sentimentData?: GoogleCloudContactcenterinsightsV1SentimentData;
  /**
   * Data specifying silence.
   */
  silenceData?: GoogleCloudContactcenterinsightsV1SilenceData;
}

/**
 * The conversation resource.
 */
export interface GoogleCloudContactcenterinsightsV1Conversation {
  /**
   * An opaque, user-specified string representing the human agent who handled
   * the conversation.
   */
  agentId?: string;
  /**
   * Call-specific metadata.
   */
  callMetadata?: GoogleCloudContactcenterinsightsV1ConversationCallMetadata;
  /**
   * Output only. The time at which the conversation was created.
   */
  readonly createTime?: Date;
  /**
   * The source of the audio and transcription for the conversation.
   */
  dataSource?: GoogleCloudContactcenterinsightsV1ConversationDataSource;
  /**
   * Output only. All the matched Dialogflow intents in the call. The key
   * corresponds to a Dialogflow intent, format:
   * projects/{project}/agent/{agent}/intents/{intent}
   */
  readonly dialogflowIntents?: {
    [key: string]: GoogleCloudContactcenterinsightsV1DialogflowIntent
  };
  /**
   * Output only. The duration of the conversation.
   */
  readonly duration?: number /* Duration */;
  /**
   * The time at which this conversation should expire. After this time, the
   * conversation data and any associated analyses will be deleted.
   */
  expireTime?: Date;
  /**
   * A map for the user to specify any custom fields. A maximum of 20 labels
   * per conversation is allowed, with a maximum of 256 characters per entry.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * A user-specified language code for the conversation.
   */
  languageCode?: string;
  /**
   * Output only. The conversation's latest analysis, if one exists.
   */
  readonly latestAnalysis?: GoogleCloudContactcenterinsightsV1Analysis;
  /**
   * Immutable. The conversation medium, if unspecified will default to
   * PHONE_CALL.
   */
  medium?:  | "MEDIUM_UNSPECIFIED" | "PHONE_CALL" | "CHAT";
  /**
   * Immutable. The resource name of the conversation. Format:
   * projects/{project}/locations/{location}/conversations/{conversation}
   */
  name?: string;
  /**
   * Obfuscated user ID which the customer sent to us.
   */
  obfuscatedUserId?: string;
  /**
   * Output only. The annotations that were generated during the customer and
   * agent interaction.
   */
  readonly runtimeAnnotations?: GoogleCloudContactcenterinsightsV1RuntimeAnnotation[];
  /**
   * The time at which the conversation started.
   */
  startTime?: Date;
  /**
   * Output only. The conversation transcript.
   */
  readonly transcript?: GoogleCloudContactcenterinsightsV1ConversationTranscript;
  /**
   * Input only. The TTL for this resource. If specified, then this TTL will be
   * used to calculate the expire time.
   */
  ttl?: number /* Duration */;
  /**
   * Output only. The number of turns in the conversation.
   */
  readonly turnCount?: number;
  /**
   * Output only. The most recent time at which the conversation was updated.
   */
  readonly updateTime?: Date;
}

function serializeGoogleCloudContactcenterinsightsV1Conversation(data: any): GoogleCloudContactcenterinsightsV1Conversation {
  return {
    ...data,
    expireTime: data["expireTime"] !== undefined ? data["expireTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1Conversation(data: any): GoogleCloudContactcenterinsightsV1Conversation {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    expireTime: data["expireTime"] !== undefined ? new Date(data["expireTime"]) : undefined,
    runtimeAnnotations: data["runtimeAnnotations"] !== undefined ? data["runtimeAnnotations"].map((item: any) => (deserializeGoogleCloudContactcenterinsightsV1RuntimeAnnotation(item))) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    transcript: data["transcript"] !== undefined ? deserializeGoogleCloudContactcenterinsightsV1ConversationTranscript(data["transcript"]) : undefined,
    ttl: data["ttl"] !== undefined ? data["ttl"] : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Call-specific metadata.
 */
export interface GoogleCloudContactcenterinsightsV1ConversationCallMetadata {
  /**
   * The audio channel that contains the agent.
   */
  agentChannel?: number;
  /**
   * The audio channel that contains the customer.
   */
  customerChannel?: number;
}

/**
 * The conversation source, which is a combination of transcript and audio.
 */
export interface GoogleCloudContactcenterinsightsV1ConversationDataSource {
  /**
   * The source when the conversation comes from Dialogflow.
   */
  dialogflowSource?: GoogleCloudContactcenterinsightsV1DialogflowSource;
  /**
   * A Cloud Storage location specification for the audio and transcript.
   */
  gcsSource?: GoogleCloudContactcenterinsightsV1GcsSource;
}

/**
 * One channel of conversation-level sentiment data.
 */
export interface GoogleCloudContactcenterinsightsV1ConversationLevelSentiment {
  /**
   * The channel of the audio that the data applies to.
   */
  channelTag?: number;
  /**
   * Data specifying sentiment.
   */
  sentimentData?: GoogleCloudContactcenterinsightsV1SentimentData;
}

/**
 * The call participant speaking for a given utterance.
 */
export interface GoogleCloudContactcenterinsightsV1ConversationParticipant {
  /**
   * Deprecated. Use `dialogflow_participant_name` instead. The name of the
   * Dialogflow participant. Format:
   * projects/{project}/locations/{location}/conversations/{conversation}/participants/{participant}
   */
  dialogflowParticipant?: string;
  /**
   * The name of the participant provided by Dialogflow. Format:
   * projects/{project}/locations/{location}/conversations/{conversation}/participants/{participant}
   */
  dialogflowParticipantName?: string;
  /**
   * Obfuscated user ID from Dialogflow.
   */
  obfuscatedExternalUserId?: string;
  /**
   * The role of the participant.
   */
  role?:  | "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | "ANY_AGENT";
  /**
   * A user-specified ID representing the participant.
   */
  userId?: string;
}

/**
 * A message representing the transcript of a conversation.
 */
export interface GoogleCloudContactcenterinsightsV1ConversationTranscript {
  /**
   * A list of sequential transcript segments that comprise the conversation.
   */
  transcriptSegments?: GoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegment[];
}

function serializeGoogleCloudContactcenterinsightsV1ConversationTranscript(data: any): GoogleCloudContactcenterinsightsV1ConversationTranscript {
  return {
    ...data,
    transcriptSegments: data["transcriptSegments"] !== undefined ? data["transcriptSegments"].map((item: any) => (serializeGoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1ConversationTranscript(data: any): GoogleCloudContactcenterinsightsV1ConversationTranscript {
  return {
    ...data,
    transcriptSegments: data["transcriptSegments"] !== undefined ? data["transcriptSegments"].map((item: any) => (deserializeGoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegment(item))) : undefined,
  };
}

/**
 * A segment of a full transcript.
 */
export interface GoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegment {
  /**
   * For conversations derived from multi-channel audio, this is the channel
   * number corresponding to the audio from that channel. For audioChannelCount
   * = N, its output values can range from '1' to 'N'. A channel tag of 0
   * indicates that the audio is mono.
   */
  channelTag?: number;
  /**
   * A confidence estimate between 0.0 and 1.0 of the fidelity of this segment.
   * A default value of 0.0 indicates that the value is unset.
   */
  confidence?: number;
  /**
   * CCAI metadata relating to the current transcript segment.
   */
  dialogflowSegmentMetadata?: GoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegmentDialogflowSegmentMetadata;
  /**
   * The language code of this segment as a
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag.
   * Example: "en-US".
   */
  languageCode?: string;
  /**
   * The time that the message occurred, if provided.
   */
  messageTime?: Date;
  /**
   * The participant of this segment.
   */
  segmentParticipant?: GoogleCloudContactcenterinsightsV1ConversationParticipant;
  /**
   * The sentiment for this transcript segment.
   */
  sentiment?: GoogleCloudContactcenterinsightsV1SentimentData;
  /**
   * The text of this segment.
   */
  text?: string;
  /**
   * A list of the word-specific information for each word in the segment.
   */
  words?: GoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegmentWordInfo[];
}

function serializeGoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegment(data: any): GoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegment {
  return {
    ...data,
    messageTime: data["messageTime"] !== undefined ? data["messageTime"].toISOString() : undefined,
    words: data["words"] !== undefined ? data["words"].map((item: any) => (serializeGoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegmentWordInfo(item))) : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegment(data: any): GoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegment {
  return {
    ...data,
    messageTime: data["messageTime"] !== undefined ? new Date(data["messageTime"]) : undefined,
    words: data["words"] !== undefined ? data["words"].map((item: any) => (deserializeGoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegmentWordInfo(item))) : undefined,
  };
}

/**
 * Metadata from Dialogflow relating to the current transcript segment.
 */
export interface GoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegmentDialogflowSegmentMetadata {
  /**
   * Whether the transcript segment was covered under the configured smart
   * reply allowlist in Agent Assist.
   */
  smartReplyAllowlistCovered?: boolean;
}

/**
 * Word-level info for words in a transcript.
 */
export interface GoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegmentWordInfo {
  /**
   * A confidence estimate between 0.0 and 1.0 of the fidelity of this word. A
   * default value of 0.0 indicates that the value is unset.
   */
  confidence?: number;
  /**
   * Time offset of the end of this word relative to the beginning of the total
   * conversation.
   */
  endOffset?: number /* Duration */;
  /**
   * Time offset of the start of this word relative to the beginning of the
   * total conversation.
   */
  startOffset?: number /* Duration */;
  /**
   * The word itself. Includes punctuation marks that surround the word.
   */
  word?: string;
}

function serializeGoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegmentWordInfo(data: any): GoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegmentWordInfo {
  return {
    ...data,
    endOffset: data["endOffset"] !== undefined ? data["endOffset"] : undefined,
    startOffset: data["startOffset"] !== undefined ? data["startOffset"] : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegmentWordInfo(data: any): GoogleCloudContactcenterinsightsV1ConversationTranscriptTranscriptSegmentWordInfo {
  return {
    ...data,
    endOffset: data["endOffset"] !== undefined ? data["endOffset"] : undefined,
    startOffset: data["startOffset"] !== undefined ? data["startOffset"] : undefined,
  };
}

/**
 * Metadata for a create analysis operation.
 */
export interface GoogleCloudContactcenterinsightsV1CreateAnalysisOperationMetadata {
  /**
   * Output only. The annotator selector used for the analysis (if any).
   */
  readonly annotatorSelector?: GoogleCloudContactcenterinsightsV1AnnotatorSelector;
  /**
   * Output only. The Conversation that this Analysis Operation belongs to.
   */
  readonly conversation?: string;
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
}

/**
 * Metadata for creating an issue.
 */
export interface GoogleCloudContactcenterinsightsV1CreateIssueMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * The original request for creation.
   */
  request?: GoogleCloudContactcenterinsightsV1CreateIssueRequest;
}

/**
 * Metadata for creating an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1CreateIssueModelMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * The original request for creation.
   */
  request?: GoogleCloudContactcenterinsightsV1CreateIssueModelRequest;
}

/**
 * The request to create an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1CreateIssueModelRequest {
  /**
   * Required. The issue model to create.
   */
  issueModel?: GoogleCloudContactcenterinsightsV1IssueModel;
  /**
   * Required. The parent resource of the issue model.
   */
  parent?: string;
}

/**
 * The request to create an issue.
 */
export interface GoogleCloudContactcenterinsightsV1CreateIssueRequest {
  /**
   * Required. The values for the new issue.
   */
  issue?: GoogleCloudContactcenterinsightsV1Issue;
  /**
   * Required. The parent resource of the issue.
   */
  parent?: string;
}

/**
 * Metadata for deleting an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1DeleteIssueModelMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * The original request for deletion.
   */
  request?: GoogleCloudContactcenterinsightsV1DeleteIssueModelRequest;
}

/**
 * The request to delete an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1DeleteIssueModelRequest {
  /**
   * Required. The name of the issue model to delete.
   */
  name?: string;
}

/**
 * Metadata for deploying an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1DeployIssueModelMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * The original request for deployment.
   */
  request?: GoogleCloudContactcenterinsightsV1DeployIssueModelRequest;
}

/**
 * The request to deploy an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1DeployIssueModelRequest {
  /**
   * Required. The issue model to deploy.
   */
  name?: string;
}

/**
 * The response to deploy an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1DeployIssueModelResponse {
}

/**
 * The data for a Dialogflow intent. Represents a detected intent in the
 * conversation, e.g. MAKES_PROMISE.
 */
export interface GoogleCloudContactcenterinsightsV1DialogflowIntent {
  /**
   * The human-readable name of the intent.
   */
  displayName?: string;
}

/**
 * Dialogflow interaction data.
 */
export interface GoogleCloudContactcenterinsightsV1DialogflowInteractionData {
  /**
   * The confidence of the match ranging from 0.0 (completely uncertain) to 1.0
   * (completely certain).
   */
  confidence?: number;
  /**
   * The Dialogflow intent resource path. Format:
   * projects/{project}/agent/{agent}/intents/{intent}
   */
  dialogflowIntentId?: string;
}

/**
 * A Dialogflow source of conversation data.
 */
export interface GoogleCloudContactcenterinsightsV1DialogflowSource {
  /**
   * Cloud Storage URI that points to a file that contains the conversation
   * audio.
   */
  audioUri?: string;
  /**
   * Output only. The name of the Dialogflow conversation that this
   * conversation resource is derived from. Format:
   * projects/{project}/locations/{location}/conversations/{conversation}
   */
  readonly dialogflowConversation?: string;
}

/**
 * The data for an entity annotation. Represents a phrase in the conversation
 * that is a known entity, such as a person, an organization, or location.
 */
export interface GoogleCloudContactcenterinsightsV1Entity {
  /**
   * The representative name for the entity.
   */
  displayName?: string;
  /**
   * Metadata associated with the entity. For most entity types, the metadata
   * is a Wikipedia URL (`wikipedia_url`) and Knowledge Graph MID (`mid`), if
   * they are available. For the metadata associated with other entity types,
   * see the Type table below.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * The salience score associated with the entity in the [0, 1.0] range. The
   * salience score for an entity provides information about the importance or
   * centrality of that entity to the entire document text. Scores closer to 0
   * are less salient, while scores closer to 1.0 are highly salient.
   */
  salience?: number;
  /**
   * The aggregate sentiment expressed for this entity in the conversation.
   */
  sentiment?: GoogleCloudContactcenterinsightsV1SentimentData;
  /**
   * The entity type.
   */
  type?:  | "TYPE_UNSPECIFIED" | "PERSON" | "LOCATION" | "ORGANIZATION" | "EVENT" | "WORK_OF_ART" | "CONSUMER_GOOD" | "OTHER" | "PHONE_NUMBER" | "ADDRESS" | "DATE" | "NUMBER" | "PRICE";
}

/**
 * The data for an entity mention annotation. This represents a mention of an
 * `Entity` in the conversation.
 */
export interface GoogleCloudContactcenterinsightsV1EntityMentionData {
  /**
   * The key of this entity in conversation entities. Can be used to retrieve
   * the exact `Entity` this mention is attached to.
   */
  entityUniqueId?: string;
  /**
   * Sentiment expressed for this mention of the entity.
   */
  sentiment?: GoogleCloudContactcenterinsightsV1SentimentData;
  /**
   * The type of the entity mention.
   */
  type?:  | "MENTION_TYPE_UNSPECIFIED" | "PROPER" | "COMMON";
}

/**
 * Exact match configuration.
 */
export interface GoogleCloudContactcenterinsightsV1ExactMatchConfig {
  /**
   * Whether to consider case sensitivity when performing an exact match.
   */
  caseSensitive?: boolean;
}

/**
 * Metadata for an export insights operation.
 */
export interface GoogleCloudContactcenterinsightsV1ExportInsightsDataMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Partial errors during export operation that might cause the operation
   * output to be incomplete.
   */
  partialErrors?: GoogleRpcStatus[];
  /**
   * The original request for export.
   */
  request?: GoogleCloudContactcenterinsightsV1ExportInsightsDataRequest;
}

/**
 * The request to export insights.
 */
export interface GoogleCloudContactcenterinsightsV1ExportInsightsDataRequest {
  /**
   * Specified if sink is a BigQuery table.
   */
  bigQueryDestination?: GoogleCloudContactcenterinsightsV1ExportInsightsDataRequestBigQueryDestination;
  /**
   * A filter to reduce results to a specific subset. Useful for exporting
   * conversations with specific properties.
   */
  filter?: string;
  /**
   * A fully qualified KMS key name for BigQuery tables protected by CMEK.
   * Format:
   * projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}/cryptoKeyVersions/{version}
   */
  kmsKey?: string;
  /**
   * Required. The parent resource to export data from.
   */
  parent?: string;
  /**
   * Options for what to do if the destination table already exists.
   */
  writeDisposition?:  | "WRITE_DISPOSITION_UNSPECIFIED" | "WRITE_TRUNCATE" | "WRITE_APPEND";
}

/**
 * A BigQuery Table Reference.
 */
export interface GoogleCloudContactcenterinsightsV1ExportInsightsDataRequestBigQueryDestination {
  /**
   * Required. The name of the BigQuery dataset that the snapshot result should
   * be exported to. If this dataset does not exist, the export call returns an
   * INVALID_ARGUMENT error.
   */
  dataset?: string;
  /**
   * A project ID or number. If specified, then export will attempt to write
   * data to this project instead of the resource project. Otherwise, the
   * resource project will be used.
   */
  projectId?: string;
  /**
   * The BigQuery table name to which the insights data should be written. If
   * this table does not exist, the export call returns an INVALID_ARGUMENT
   * error.
   */
  table?: string;
}

/**
 * Response for an export insights operation.
 */
export interface GoogleCloudContactcenterinsightsV1ExportInsightsDataResponse {
}

/**
 * Agent Assist frequently-asked-question answer data.
 */
export interface GoogleCloudContactcenterinsightsV1FaqAnswerData {
  /**
   * The piece of text from the `source` knowledge base document.
   */
  answer?: string;
  /**
   * The system's confidence score that this answer is a good match for this
   * conversation, ranging from 0.0 (completely uncertain) to 1.0 (completely
   * certain).
   */
  confidenceScore?: number;
  /**
   * Map that contains metadata about the FAQ answer and the document that it
   * originates from.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * The name of the answer record. Format:
   * projects/{project}/locations/{location}/answerRecords/{answer_record}
   */
  queryRecord?: string;
  /**
   * The corresponding FAQ question.
   */
  question?: string;
  /**
   * The knowledge document that this answer was extracted from. Format:
   * projects/{project}/knowledgeBases/{knowledge_base}/documents/{document}.
   */
  source?: string;
}

/**
 * A Cloud Storage source of conversation data.
 */
export interface GoogleCloudContactcenterinsightsV1GcsSource {
  /**
   * Cloud Storage URI that points to a file that contains the conversation
   * audio.
   */
  audioUri?: string;
  /**
   * Immutable. Cloud Storage URI that points to a file that contains the
   * conversation transcript.
   */
  transcriptUri?: string;
}

/**
 * The data for a hold annotation.
 */
export interface GoogleCloudContactcenterinsightsV1HoldData {
}

/**
 * The metadata for an IngestConversations operation.
 */
export interface GoogleCloudContactcenterinsightsV1IngestConversationsMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * Output only. Statistics for IngestConversations operation.
   */
  readonly ingestConversationsStats?: GoogleCloudContactcenterinsightsV1IngestConversationsMetadataIngestConversationsStats;
  /**
   * Output only. Partial errors during ingest operation that might cause the
   * operation output to be incomplete.
   */
  readonly partialErrors?: GoogleRpcStatus[];
  /**
   * Output only. The original request for ingest.
   */
  readonly request?: GoogleCloudContactcenterinsightsV1IngestConversationsRequest;
}

/**
 * Statistics for IngestConversations operation.
 */
export interface GoogleCloudContactcenterinsightsV1IngestConversationsMetadataIngestConversationsStats {
  /**
   * Output only. The number of objects skipped because another conversation
   * with the same transcript uri had already been ingested.
   */
  readonly duplicatesSkippedCount?: number;
  /**
   * Output only. The number of objects which were unable to be ingested due to
   * errors. The errors are populated in the partial_errors field.
   */
  readonly failedIngestCount?: number;
  /**
   * Output only. The number of objects processed during the ingest operation.
   */
  readonly processedObjectCount?: number;
  /**
   * Output only. The number of new conversations added during this ingest
   * operation.
   */
  readonly successfulIngestCount?: number;
}

/**
 * The request to ingest conversations.
 */
export interface GoogleCloudContactcenterinsightsV1IngestConversationsRequest {
  /**
   * Configuration that applies to all conversations.
   */
  conversationConfig?: GoogleCloudContactcenterinsightsV1IngestConversationsRequestConversationConfig;
  /**
   * A cloud storage bucket source.
   */
  gcsSource?: GoogleCloudContactcenterinsightsV1IngestConversationsRequestGcsSource;
  /**
   * Required. The parent resource for new conversations.
   */
  parent?: string;
  /**
   * Configuration for when `source` contains conversation transcripts.
   */
  transcriptObjectConfig?: GoogleCloudContactcenterinsightsV1IngestConversationsRequestTranscriptObjectConfig;
}

/**
 * Configuration that applies to all conversations.
 */
export interface GoogleCloudContactcenterinsightsV1IngestConversationsRequestConversationConfig {
  /**
   * An opaque, user-specified string representing the human agent who handled
   * the conversations.
   */
  agentId?: string;
}

/**
 * Configuration for Cloud Storage bucket sources.
 */
export interface GoogleCloudContactcenterinsightsV1IngestConversationsRequestGcsSource {
  /**
   * Required. The Cloud Storage bucket containing source objects.
   */
  bucketUri?: string;
}

/**
 * Configuration for processing transcript objects.
 */
export interface GoogleCloudContactcenterinsightsV1IngestConversationsRequestTranscriptObjectConfig {
  /**
   * Required. The medium transcript objects represent.
   */
  medium?:  | "MEDIUM_UNSPECIFIED" | "PHONE_CALL" | "CHAT";
}

/**
 * The response to an IngestConversations operation.
 */
export interface GoogleCloudContactcenterinsightsV1IngestConversationsResponse {
}

/**
 * The data for an intent. Represents a detected intent in the conversation,
 * for example MAKES_PROMISE.
 */
export interface GoogleCloudContactcenterinsightsV1Intent {
  /**
   * The human-readable name of the intent.
   */
  displayName?: string;
  /**
   * The unique identifier of the intent.
   */
  id?: string;
}

/**
 * The data for an intent match. Represents an intent match for a text segment
 * in the conversation. A text segment can be part of a sentence, a complete
 * sentence, or an utterance with multiple sentences.
 */
export interface GoogleCloudContactcenterinsightsV1IntentMatchData {
  /**
   * The id of the matched intent. Can be used to retrieve the corresponding
   * intent information.
   */
  intentUniqueId?: string;
}

/**
 * The data for an interruption annotation.
 */
export interface GoogleCloudContactcenterinsightsV1InterruptionData {
}

/**
 * The issue resource.
 */
export interface GoogleCloudContactcenterinsightsV1Issue {
  /**
   * Output only. The time at which this issue was created.
   */
  readonly createTime?: Date;
  /**
   * The representative name for the issue.
   */
  displayName?: string;
  /**
   * Immutable. The resource name of the issue. Format:
   * projects/{project}/locations/{location}/issueModels/{issue_model}/issues/{issue}
   */
  name?: string;
  /**
   * Output only. Resource names of the sample representative utterances that
   * match to this issue.
   */
  readonly sampleUtterances?: string[];
  /**
   * Output only. The most recent time that this issue was updated.
   */
  readonly updateTime?: Date;
}

/**
 * Information about the issue.
 */
export interface GoogleCloudContactcenterinsightsV1IssueAssignment {
  /**
   * Immutable. Display name of the assigned issue. This field is set at time
   * of analyis and immutable since then.
   */
  displayName?: string;
  /**
   * Resource name of the assigned issue.
   */
  issue?: string;
  /**
   * Score indicating the likelihood of the issue assignment. currently bounded
   * on [0,1].
   */
  score?: number;
}

/**
 * The data for an issue match annotation.
 */
export interface GoogleCloudContactcenterinsightsV1IssueMatchData {
  /**
   * Information about the issue's assignment.
   */
  issueAssignment?: GoogleCloudContactcenterinsightsV1IssueAssignment;
}

/**
 * The issue model resource.
 */
export interface GoogleCloudContactcenterinsightsV1IssueModel {
  /**
   * Output only. The time at which this issue model was created.
   */
  readonly createTime?: Date;
  /**
   * The representative name for the issue model.
   */
  displayName?: string;
  /**
   * Configs for the input data that used to create the issue model.
   */
  inputDataConfig?: GoogleCloudContactcenterinsightsV1IssueModelInputDataConfig;
  /**
   * Output only. Number of issues in this issue model.
   */
  readonly issueCount?: bigint;
  /**
   * Immutable. The resource name of the issue model. Format:
   * projects/{project}/locations/{location}/issueModels/{issue_model}
   */
  name?: string;
  /**
   * Output only. State of the model.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "UNDEPLOYED" | "DEPLOYING" | "DEPLOYED" | "UNDEPLOYING" | "DELETING";
  /**
   * Output only. Immutable. The issue model's label statistics on its training
   * data.
   */
  readonly trainingStats?: GoogleCloudContactcenterinsightsV1IssueModelLabelStats;
  /**
   * Output only. The most recent time at which the issue model was updated.
   */
  readonly updateTime?: Date;
}

/**
 * Configs for the input data used to create the issue model.
 */
export interface GoogleCloudContactcenterinsightsV1IssueModelInputDataConfig {
  /**
   * A filter to reduce the conversations used for training the model to a
   * specific subset.
   */
  filter?: string;
  /**
   * Medium of conversations used in training data. This field is being
   * deprecated. To specify the medium to be used in training a new issue model,
   * set the `medium` field on `filter`.
   */
  medium?:  | "MEDIUM_UNSPECIFIED" | "PHONE_CALL" | "CHAT";
  /**
   * Output only. Number of conversations used in training. Output only.
   */
  readonly trainingConversationsCount?: bigint;
}

/**
 * Aggregated statistics about an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1IssueModelLabelStats {
  /**
   * Number of conversations the issue model has analyzed at this point in
   * time.
   */
  analyzedConversationsCount?: bigint;
  /**
   * Statistics on each issue. Key is the issue's resource name.
   */
  issueStats?: {
    [key: string]: GoogleCloudContactcenterinsightsV1IssueModelLabelStatsIssueStats
  };
  /**
   * Number of analyzed conversations for which no issue was applicable at this
   * point in time.
   */
  unclassifiedConversationsCount?: bigint;
}

function serializeGoogleCloudContactcenterinsightsV1IssueModelLabelStats(data: any): GoogleCloudContactcenterinsightsV1IssueModelLabelStats {
  return {
    ...data,
    analyzedConversationsCount: data["analyzedConversationsCount"] !== undefined ? String(data["analyzedConversationsCount"]) : undefined,
    issueStats: data["issueStats"] !== undefined ? Object.fromEntries(Object.entries(data["issueStats"]).map(([k, v]: [string, any]) => ([k, serializeGoogleCloudContactcenterinsightsV1IssueModelLabelStatsIssueStats(v)]))) : undefined,
    unclassifiedConversationsCount: data["unclassifiedConversationsCount"] !== undefined ? String(data["unclassifiedConversationsCount"]) : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1IssueModelLabelStats(data: any): GoogleCloudContactcenterinsightsV1IssueModelLabelStats {
  return {
    ...data,
    analyzedConversationsCount: data["analyzedConversationsCount"] !== undefined ? BigInt(data["analyzedConversationsCount"]) : undefined,
    issueStats: data["issueStats"] !== undefined ? Object.fromEntries(Object.entries(data["issueStats"]).map(([k, v]: [string, any]) => ([k, deserializeGoogleCloudContactcenterinsightsV1IssueModelLabelStatsIssueStats(v)]))) : undefined,
    unclassifiedConversationsCount: data["unclassifiedConversationsCount"] !== undefined ? BigInt(data["unclassifiedConversationsCount"]) : undefined,
  };
}

/**
 * Aggregated statistics about an issue.
 */
export interface GoogleCloudContactcenterinsightsV1IssueModelLabelStatsIssueStats {
  /**
   * Display name of the issue.
   */
  displayName?: string;
  /**
   * Issue resource. Format:
   * projects/{project}/locations/{location}/issueModels/{issue_model}/issues/{issue}
   */
  issue?: string;
  /**
   * Number of conversations attached to the issue at this point in time.
   */
  labeledConversationsCount?: bigint;
}

function serializeGoogleCloudContactcenterinsightsV1IssueModelLabelStatsIssueStats(data: any): GoogleCloudContactcenterinsightsV1IssueModelLabelStatsIssueStats {
  return {
    ...data,
    labeledConversationsCount: data["labeledConversationsCount"] !== undefined ? String(data["labeledConversationsCount"]) : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1IssueModelLabelStatsIssueStats(data: any): GoogleCloudContactcenterinsightsV1IssueModelLabelStatsIssueStats {
  return {
    ...data,
    labeledConversationsCount: data["labeledConversationsCount"] !== undefined ? BigInt(data["labeledConversationsCount"]) : undefined,
  };
}

/**
 * Issue Modeling result on a conversation.
 */
export interface GoogleCloudContactcenterinsightsV1IssueModelResult {
  /**
   * Issue model that generates the result. Format:
   * projects/{project}/locations/{location}/issueModels/{issue_model}
   */
  issueModel?: string;
  /**
   * All the matched issues.
   */
  issues?: GoogleCloudContactcenterinsightsV1IssueAssignment[];
}

/**
 * The response to list analyses.
 */
export interface GoogleCloudContactcenterinsightsV1ListAnalysesResponse {
  /**
   * The analyses that match the request.
   */
  analyses?: GoogleCloudContactcenterinsightsV1Analysis[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * The response of listing conversations.
 */
export interface GoogleCloudContactcenterinsightsV1ListConversationsResponse {
  /**
   * The conversations that match the request.
   */
  conversations?: GoogleCloudContactcenterinsightsV1Conversation[];
  /**
   * A token which can be sent as `page_token` to retrieve the next page. If
   * this field is set, it means there is another page available. If it is not
   * set, it means no other pages are available.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudContactcenterinsightsV1ListConversationsResponse(data: any): GoogleCloudContactcenterinsightsV1ListConversationsResponse {
  return {
    ...data,
    conversations: data["conversations"] !== undefined ? data["conversations"].map((item: any) => (serializeGoogleCloudContactcenterinsightsV1Conversation(item))) : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1ListConversationsResponse(data: any): GoogleCloudContactcenterinsightsV1ListConversationsResponse {
  return {
    ...data,
    conversations: data["conversations"] !== undefined ? data["conversations"].map((item: any) => (deserializeGoogleCloudContactcenterinsightsV1Conversation(item))) : undefined,
  };
}

/**
 * The response of listing issue models.
 */
export interface GoogleCloudContactcenterinsightsV1ListIssueModelsResponse {
  /**
   * The issue models that match the request.
   */
  issueModels?: GoogleCloudContactcenterinsightsV1IssueModel[];
}

/**
 * The response of listing issues.
 */
export interface GoogleCloudContactcenterinsightsV1ListIssuesResponse {
  /**
   * The issues that match the request.
   */
  issues?: GoogleCloudContactcenterinsightsV1Issue[];
}

/**
 * The response of listing phrase matchers.
 */
export interface GoogleCloudContactcenterinsightsV1ListPhraseMatchersResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The phrase matchers that match the request.
   */
  phraseMatchers?: GoogleCloudContactcenterinsightsV1PhraseMatcher[];
}

/**
 * The response of listing views.
 */
export interface GoogleCloudContactcenterinsightsV1ListViewsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The views that match the request.
   */
  views?: GoogleCloudContactcenterinsightsV1View[];
}

/**
 * The data for a matched phrase matcher. Represents information identifying a
 * phrase matcher for a given match.
 */
export interface GoogleCloudContactcenterinsightsV1PhraseMatchData {
  /**
   * The human-readable name of the phrase matcher.
   */
  displayName?: string;
  /**
   * The unique identifier (the resource name) of the phrase matcher.
   */
  phraseMatcher?: string;
}

/**
 * The phrase matcher resource.
 */
export interface GoogleCloudContactcenterinsightsV1PhraseMatcher {
  /**
   * Output only. The most recent time at which the activation status was
   * updated.
   */
  readonly activationUpdateTime?: Date;
  /**
   * Applies the phrase matcher only when it is active.
   */
  active?: boolean;
  /**
   * The human-readable name of the phrase matcher.
   */
  displayName?: string;
  /**
   * The resource name of the phrase matcher. Format:
   * projects/{project}/locations/{location}/phraseMatchers/{phrase_matcher}
   */
  name?: string;
  /**
   * A list of phase match rule groups that are included in this matcher.
   */
  phraseMatchRuleGroups?: GoogleCloudContactcenterinsightsV1PhraseMatchRuleGroup[];
  /**
   * Output only. The timestamp of when the revision was created. It is also
   * the create time when a new matcher is added.
   */
  readonly revisionCreateTime?: Date;
  /**
   * Output only. Immutable. The revision ID of the phrase matcher. A new
   * revision is committed whenever the matcher is changed, except when it is
   * activated or deactivated. A server generated random ID will be used.
   * Example: locations/global/phraseMatchers/my-first-matcher@1234567
   */
  readonly revisionId?: string;
  /**
   * The role whose utterances the phrase matcher should be matched against. If
   * the role is ROLE_UNSPECIFIED it will be matched against any utterances in
   * the transcript.
   */
  roleMatch?:  | "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | "ANY_AGENT";
  /**
   * Required. The type of this phrase matcher.
   */
  type?:  | "PHRASE_MATCHER_TYPE_UNSPECIFIED" | "ALL_OF" | "ANY_OF";
  /**
   * Output only. The most recent time at which the phrase matcher was updated.
   */
  readonly updateTime?: Date;
  /**
   * The customized version tag to use for the phrase matcher. If not
   * specified, it will default to `revision_id`.
   */
  versionTag?: string;
}

/**
 * The data for a phrase match rule.
 */
export interface GoogleCloudContactcenterinsightsV1PhraseMatchRule {
  /**
   * Provides additional information about the rule that specifies how to apply
   * the rule.
   */
  config?: GoogleCloudContactcenterinsightsV1PhraseMatchRuleConfig;
  /**
   * Specifies whether the phrase must be missing from the transcript segment
   * or present in the transcript segment.
   */
  negated?: boolean;
  /**
   * Required. The phrase to be matched.
   */
  query?: string;
}

/**
 * Configuration information of a phrase match rule.
 */
export interface GoogleCloudContactcenterinsightsV1PhraseMatchRuleConfig {
  /**
   * The configuration for the exact match rule.
   */
  exactMatchConfig?: GoogleCloudContactcenterinsightsV1ExactMatchConfig;
}

/**
 * A message representing a rule in the phrase matcher.
 */
export interface GoogleCloudContactcenterinsightsV1PhraseMatchRuleGroup {
  /**
   * A list of phase match rules that are included in this group.
   */
  phraseMatchRules?: GoogleCloudContactcenterinsightsV1PhraseMatchRule[];
  /**
   * Required. The type of this phrase match rule group.
   */
  type?:  | "PHRASE_MATCH_RULE_GROUP_TYPE_UNSPECIFIED" | "ALL_OF" | "ANY_OF";
}

/**
 * An annotation that was generated during the customer and agent interaction.
 */
export interface GoogleCloudContactcenterinsightsV1RuntimeAnnotation {
  /**
   * The unique identifier of the annotation. Format:
   * projects/{project}/locations/{location}/conversationDatasets/{dataset}/conversationDataItems/{data_item}/conversationAnnotations/{annotation}
   */
  annotationId?: string;
  /**
   * The feedback that the customer has about the answer in `data`.
   */
  answerFeedback?: GoogleCloudContactcenterinsightsV1AnswerFeedback;
  /**
   * Agent Assist Article Suggestion data.
   */
  articleSuggestion?: GoogleCloudContactcenterinsightsV1ArticleSuggestionData;
  /**
   * The time at which this annotation was created.
   */
  createTime?: Date;
  /**
   * Dialogflow interaction data.
   */
  dialogflowInteraction?: GoogleCloudContactcenterinsightsV1DialogflowInteractionData;
  /**
   * The boundary in the conversation where the annotation ends, inclusive.
   */
  endBoundary?: GoogleCloudContactcenterinsightsV1AnnotationBoundary;
  /**
   * Agent Assist FAQ answer data.
   */
  faqAnswer?: GoogleCloudContactcenterinsightsV1FaqAnswerData;
  /**
   * Agent Assist Smart Compose suggestion data.
   */
  smartComposeSuggestion?: GoogleCloudContactcenterinsightsV1SmartComposeSuggestionData;
  /**
   * Agent Assist Smart Reply data.
   */
  smartReply?: GoogleCloudContactcenterinsightsV1SmartReplyData;
  /**
   * The boundary in the conversation where the annotation starts, inclusive.
   */
  startBoundary?: GoogleCloudContactcenterinsightsV1AnnotationBoundary;
}

function serializeGoogleCloudContactcenterinsightsV1RuntimeAnnotation(data: any): GoogleCloudContactcenterinsightsV1RuntimeAnnotation {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1RuntimeAnnotation(data: any): GoogleCloudContactcenterinsightsV1RuntimeAnnotation {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * The data for a sentiment annotation.
 */
export interface GoogleCloudContactcenterinsightsV1SentimentData {
  /**
   * A non-negative number from 0 to infinity which represents the abolute
   * magnitude of sentiment regardless of score.
   */
  magnitude?: number;
  /**
   * The sentiment score between -1.0 (negative) and 1.0 (positive).
   */
  score?: number;
}

/**
 * The settings resource.
 */
export interface GoogleCloudContactcenterinsightsV1Settings {
  /**
   * Default analysis settings.
   */
  analysisConfig?: GoogleCloudContactcenterinsightsV1SettingsAnalysisConfig;
  /**
   * The default TTL for newly-created conversations. If a conversation has a
   * specified expiration, that value will be used instead. Changing this value
   * will not change the expiration of existing conversations. Conversations
   * with no expire time persist until they are deleted.
   */
  conversationTtl?: number /* Duration */;
  /**
   * Output only. The time at which the settings was created.
   */
  readonly createTime?: Date;
  /**
   * A language code to be applied to each transcript segment unless the
   * segment already specifies a language code. Language code defaults to
   * "en-US" if it is neither specified on the segment nor here.
   */
  languageCode?: string;
  /**
   * Immutable. The resource name of the settings resource. Format:
   * projects/{project}/locations/{location}/settings
   */
  name?: string;
  /**
   * A map that maps a notification trigger to a Pub/Sub topic. Each time a
   * specified trigger occurs, Insights will notify the corresponding Pub/Sub
   * topic. Keys are notification triggers. Supported keys are: *
   * "all-triggers": Notify each time any of the supported triggers occurs. *
   * "create-analysis": Notify each time an analysis is created. *
   * "create-conversation": Notify each time a conversation is created. *
   * "export-insights-data": Notify each time an export is complete. *
   * "update-conversation": Notify each time a conversation is updated via
   * UpdateConversation. Values are Pub/Sub topics. The format of each Pub/Sub
   * topic is: projects/{project}/topics/{topic}
   */
  pubsubNotificationSettings?: {
    [key: string]: string
  };
  /**
   * Output only. The time at which the settings were last updated.
   */
  readonly updateTime?: Date;
}

function serializeGoogleCloudContactcenterinsightsV1Settings(data: any): GoogleCloudContactcenterinsightsV1Settings {
  return {
    ...data,
    conversationTtl: data["conversationTtl"] !== undefined ? data["conversationTtl"] : undefined,
  };
}

function deserializeGoogleCloudContactcenterinsightsV1Settings(data: any): GoogleCloudContactcenterinsightsV1Settings {
  return {
    ...data,
    conversationTtl: data["conversationTtl"] !== undefined ? data["conversationTtl"] : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Default configuration when creating Analyses in Insights.
 */
export interface GoogleCloudContactcenterinsightsV1SettingsAnalysisConfig {
  /**
   * To select the annotators to run and the phrase matchers to use (if any).
   * If not specified, all annotators will be run.
   */
  annotatorSelector?: GoogleCloudContactcenterinsightsV1AnnotatorSelector;
  /**
   * Percentage of conversations created using Dialogflow runtime integration
   * to analyze automatically, between [0, 100].
   */
  runtimeIntegrationAnalysisPercentage?: number;
  /**
   * Percentage of conversations created using the UploadConversation endpoint
   * to analyze automatically, between [0, 100].
   */
  uploadConversationAnalysisPercentage?: number;
}

/**
 * The data for a silence annotation.
 */
export interface GoogleCloudContactcenterinsightsV1SilenceData {
}

/**
 * Agent Assist Smart Compose suggestion data.
 */
export interface GoogleCloudContactcenterinsightsV1SmartComposeSuggestionData {
  /**
   * The system's confidence score that this suggestion is a good match for
   * this conversation, ranging from 0.0 (completely uncertain) to 1.0
   * (completely certain).
   */
  confidenceScore?: number;
  /**
   * Map that contains metadata about the Smart Compose suggestion and the
   * document from which it originates.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * The name of the answer record. Format:
   * projects/{project}/locations/{location}/answerRecords/{answer_record}
   */
  queryRecord?: string;
  /**
   * The content of the suggestion.
   */
  suggestion?: string;
}

/**
 * Agent Assist Smart Reply data.
 */
export interface GoogleCloudContactcenterinsightsV1SmartReplyData {
  /**
   * The system's confidence score that this reply is a good match for this
   * conversation, ranging from 0.0 (completely uncertain) to 1.0 (completely
   * certain).
   */
  confidenceScore?: number;
  /**
   * Map that contains metadata about the Smart Reply and the document from
   * which it originates.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * The name of the answer record. Format:
   * projects/{project}/locations/{location}/answerRecords/{answer_record}
   */
  queryRecord?: string;
  /**
   * The content of the reply.
   */
  reply?: string;
}

/**
 * Metadata for undeploying an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1UndeployIssueModelMetadata {
  /**
   * Output only. The time the operation was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the operation finished running.
   */
  readonly endTime?: Date;
  /**
   * The original request for undeployment.
   */
  request?: GoogleCloudContactcenterinsightsV1UndeployIssueModelRequest;
}

/**
 * The request to undeploy an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1UndeployIssueModelRequest {
  /**
   * Required. The issue model to undeploy.
   */
  name?: string;
}

/**
 * The response to undeploy an issue model.
 */
export interface GoogleCloudContactcenterinsightsV1UndeployIssueModelResponse {
}

/**
 * The View resource.
 */
export interface GoogleCloudContactcenterinsightsV1View {
  /**
   * Output only. The time at which this view was created.
   */
  readonly createTime?: Date;
  /**
   * The human-readable display name of the view.
   */
  displayName?: string;
  /**
   * Immutable. The resource name of the view. Format:
   * projects/{project}/locations/{location}/views/{view}
   */
  name?: string;
  /**
   * Output only. The most recent time at which the view was updated.
   */
  readonly updateTime?: Date;
  /**
   * String with specific view properties, must be non-empty.
   */
  value?: string;
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
 * Additional options for
 * ContactCenterInsights#projectsLocationsConversationsAnalysesList.
 */
export interface ProjectsLocationsConversationsAnalysesListOptions {
  /**
   * A filter to reduce results to a specific subset. Useful for querying
   * conversations with specific properties.
   */
  filter?: string;
  /**
   * The maximum number of analyses to return in the response. If this value is
   * zero, the service will select a default size. A call might return fewer
   * objects than requested. A non-empty `next_page_token` in the response
   * indicates that more data is available.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListAnalysesResponse`; indicates that this
   * is a continuation of a prior `ListAnalyses` call and the system should
   * return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ContactCenterInsights#projectsLocationsConversationsCalculateStats.
 */
export interface ProjectsLocationsConversationsCalculateStatsOptions {
  /**
   * A filter to reduce results to a specific subset. This field is useful for
   * getting statistics about conversations with specific properties.
   */
  filter?: string;
}

/**
 * Additional options for
 * ContactCenterInsights#projectsLocationsConversationsCreate.
 */
export interface ProjectsLocationsConversationsCreateOptions {
  /**
   * A unique ID for the new conversation. This ID will become the final
   * component of the conversation's resource name. If no ID is specified, a
   * server-generated ID will be used. This value should be 4-64 characters and
   * must match the regular expression `^[a-z0-9-]{4,64}$`. Valid characters are
   * `a-z-`
   */
  conversationId?: string;
}

/**
 * Additional options for
 * ContactCenterInsights#projectsLocationsConversationsDelete.
 */
export interface ProjectsLocationsConversationsDeleteOptions {
  /**
   * If set to true, all of this conversation's analyses will also be deleted.
   * Otherwise, the request will only succeed if the conversation has no
   * analyses.
   */
  force?: boolean;
}

/**
 * Additional options for
 * ContactCenterInsights#projectsLocationsConversationsGet.
 */
export interface ProjectsLocationsConversationsGetOptions {
  /**
   * The level of details of the conversation. Default is `FULL`.
   */
  view?:  | "CONVERSATION_VIEW_UNSPECIFIED" | "FULL" | "BASIC";
}

/**
 * Additional options for
 * ContactCenterInsights#projectsLocationsConversationsList.
 */
export interface ProjectsLocationsConversationsListOptions {
  /**
   * A filter to reduce results to a specific subset. Useful for querying
   * conversations with specific properties.
   */
  filter?: string;
  /**
   * The maximum number of conversations to return in the response. A valid
   * page size ranges from 0 to 1,000 inclusive. If the page size is zero or
   * unspecified, a default page size of 100 will be chosen. Note that a call
   * might return fewer results than the requested page size.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListConversationsResponse`. This value
   * indicates that this is a continuation of a prior `ListConversations` call
   * and that the system should return the next page of data.
   */
  pageToken?: string;
  /**
   * The level of details of the conversation. Default is `BASIC`.
   */
  view?:  | "CONVERSATION_VIEW_UNSPECIFIED" | "FULL" | "BASIC";
}

/**
 * Additional options for
 * ContactCenterInsights#projectsLocationsConversationsPatch.
 */
export interface ProjectsLocationsConversationsPatchOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsConversationsPatchOptions(data: any): ProjectsLocationsConversationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsConversationsPatchOptions(data: any): ProjectsLocationsConversationsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * ContactCenterInsights#projectsLocationsIssueModelsIssuesPatch.
 */
export interface ProjectsLocationsIssueModelsIssuesPatchOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsIssueModelsIssuesPatchOptions(data: any): ProjectsLocationsIssueModelsIssuesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsIssueModelsIssuesPatchOptions(data: any): ProjectsLocationsIssueModelsIssuesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * ContactCenterInsights#projectsLocationsIssueModelsPatch.
 */
export interface ProjectsLocationsIssueModelsPatchOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsIssueModelsPatchOptions(data: any): ProjectsLocationsIssueModelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsIssueModelsPatchOptions(data: any): ProjectsLocationsIssueModelsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * ContactCenterInsights#projectsLocationsOperationsList.
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
 * Additional options for
 * ContactCenterInsights#projectsLocationsPhraseMatchersList.
 */
export interface ProjectsLocationsPhraseMatchersListOptions {
  /**
   * A filter to reduce results to a specific subset. Useful for querying
   * phrase matchers with specific properties.
   */
  filter?: string;
  /**
   * The maximum number of phrase matchers to return in the response. If this
   * value is zero, the service will select a default size. A call might return
   * fewer objects than requested. A non-empty `next_page_token` in the response
   * indicates that more data is available.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListPhraseMatchersResponse`. This value
   * indicates that this is a continuation of a prior `ListPhraseMatchers` call
   * and that the system should return the next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * ContactCenterInsights#projectsLocationsPhraseMatchersPatch.
 */
export interface ProjectsLocationsPhraseMatchersPatchOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsPhraseMatchersPatchOptions(data: any): ProjectsLocationsPhraseMatchersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsPhraseMatchersPatchOptions(data: any): ProjectsLocationsPhraseMatchersPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * ContactCenterInsights#projectsLocationsUpdateSettings.
 */
export interface ProjectsLocationsUpdateSettingsOptions {
  /**
   * Required. The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsUpdateSettingsOptions(data: any): ProjectsLocationsUpdateSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsUpdateSettingsOptions(data: any): ProjectsLocationsUpdateSettingsOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for ContactCenterInsights#projectsLocationsViewsList.
 */
export interface ProjectsLocationsViewsListOptions {
  /**
   * The maximum number of views to return in the response. If this value is
   * zero, the service will select a default size. A call may return fewer
   * objects than requested. A non-empty `next_page_token` in the response
   * indicates that more data is available.
   */
  pageSize?: number;
  /**
   * The value returned by the last `ListViewsResponse`; indicates that this is
   * a continuation of a prior `ListViews` call and the system should return the
   * next page of data.
   */
  pageToken?: string;
}

/**
 * Additional options for ContactCenterInsights#projectsLocationsViewsPatch.
 */
export interface ProjectsLocationsViewsPatchOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsViewsPatchOptions(data: any): ProjectsLocationsViewsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsViewsPatchOptions(data: any): ProjectsLocationsViewsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}