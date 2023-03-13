// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Dialogflow API Client for Deno
 * ==============================
 * 
 * Builds conversational interfaces (for example, chatbots, and voice-powered apps and devices).
 * 
 * Docs: https://cloud.google.com/dialogflow/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Builds conversational interfaces (for example, chatbots, and voice-powered
 * apps and devices).
 */
export class Dialogflow {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://dialogflow.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Retrieves the specified Changelog.
   *
   * @param name Required. The name of the changelog to get. Format: `projects//locations//agents//changelogs/`.
   */
  async projectsLocationsAgentsChangelogsGet(name: string): Promise<GoogleCloudDialogflowCxV3Changelog> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDialogflowCxV3Changelog(data);
  }

  /**
   * Returns the list of Changelogs.
   *
   * @param parent Required. The agent containing the changelogs. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsChangelogsList(parent: string, opts: ProjectsLocationsAgentsChangelogsListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListChangelogsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/changelogs`);
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
    return deserializeGoogleCloudDialogflowCxV3ListChangelogsResponse(data);
  }

  /**
   * Creates an agent in the specified location. Note: You should always train
   * flows prior to sending them queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param parent Required. The location to create a agent for. Format: `projects//locations/`.
   */
  async projectsLocationsAgentsCreate(parent: string, req: GoogleCloudDialogflowCxV3Agent): Promise<GoogleCloudDialogflowCxV3Agent> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/agents`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDialogflowCxV3Agent;
  }

  /**
   * Deletes the specified agent.
   *
   * @param name Required. The name of the agent to delete. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Creates an entity type in the specified agent. Note: You should always
   * train a flow prior to sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param parent Required. The agent to create a entity type for. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsEntityTypesCreate(parent: string, req: GoogleCloudDialogflowCxV3EntityType, opts: ProjectsLocationsAgentsEntityTypesCreateOptions = {}): Promise<GoogleCloudDialogflowCxV3EntityType> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/entityTypes`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDialogflowCxV3EntityType;
  }

  /**
   * Deletes the specified entity type. Note: You should always train a flow
   * prior to sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param name Required. The name of the entity type to delete. Format: `projects//locations//agents//entityTypes/`.
   */
  async projectsLocationsAgentsEntityTypesDelete(name: string, opts: ProjectsLocationsAgentsEntityTypesDeleteOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
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
   * Retrieves the specified entity type.
   *
   * @param name Required. The name of the entity type. Format: `projects//locations//agents//entityTypes/`.
   */
  async projectsLocationsAgentsEntityTypesGet(name: string, opts: ProjectsLocationsAgentsEntityTypesGetOptions = {}): Promise<GoogleCloudDialogflowCxV3EntityType> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDialogflowCxV3EntityType;
  }

  /**
   * Returns the list of all entity types in the specified agent.
   *
   * @param parent Required. The agent to list all entity types for. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsEntityTypesList(parent: string, opts: ProjectsLocationsAgentsEntityTypesListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListEntityTypesResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/entityTypes`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
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
    return data as GoogleCloudDialogflowCxV3ListEntityTypesResponse;
  }

  /**
   * Updates the specified entity type. Note: You should always train a flow
   * prior to sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param name The unique identifier of the entity type. Required for EntityTypes.UpdateEntityType. Format: `projects//locations//agents//entityTypes/`.
   */
  async projectsLocationsAgentsEntityTypesPatch(name: string, req: GoogleCloudDialogflowCxV3EntityType, opts: ProjectsLocationsAgentsEntityTypesPatchOptions = {}): Promise<GoogleCloudDialogflowCxV3EntityType> {
    opts = serializeProjectsLocationsAgentsEntityTypesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
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
    return data as GoogleCloudDialogflowCxV3EntityType;
  }

  /**
   * Fetches a list of continuous test results for a given environment.
   *
   * @param parent Required. The environment to list results for. Format: `projects//locations//agents// environments/`.
   */
  async projectsLocationsAgentsEnvironmentsContinuousTestResultsList(parent: string, opts: ProjectsLocationsAgentsEnvironmentsContinuousTestResultsListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/continuousTestResults`);
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
    return deserializeGoogleCloudDialogflowCxV3ListContinuousTestResultsResponse(data);
  }

  /**
   * Creates an Environment in the specified Agent. This method is a
   * [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: An empty [Struct
   * message](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#struct)
   * - `response`: Environment
   *
   * @param parent Required. The Agent to create an Environment for. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsEnvironmentsCreate(parent: string, req: GoogleCloudDialogflowCxV3Environment): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDialogflowCxV3Environment(req);
    const url = new URL(`${this.#baseUrl}v3/${ parent }/environments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes the specified Environment.
   *
   * @param name Required. The name of the Environment to delete. Format: `projects//locations//agents//environments/`.
   */
  async projectsLocationsAgentsEnvironmentsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Deploys a flow to the specified Environment. This method is a
   * [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: DeployFlowMetadata - `response`: DeployFlowResponse
   *
   * @param environment Required. The environment to deploy the flow to. Format: `projects//locations//agents// environments/`.
   */
  async projectsLocationsAgentsEnvironmentsDeployFlow(environment: string, req: GoogleCloudDialogflowCxV3DeployFlowRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v3/${ environment }:deployFlow`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Retrieves the specified Deployment.
   *
   * @param name Required. The name of the Deployment. Format: `projects//locations//agents//environments//deployments/`.
   */
  async projectsLocationsAgentsEnvironmentsDeploymentsGet(name: string): Promise<GoogleCloudDialogflowCxV3Deployment> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDialogflowCxV3Deployment(data);
  }

  /**
   * Returns the list of all deployments in the specified Environment.
   *
   * @param parent Required. The Environment to list all environments for. Format: `projects//locations//agents//environments/`.
   */
  async projectsLocationsAgentsEnvironmentsDeploymentsList(parent: string, opts: ProjectsLocationsAgentsEnvironmentsDeploymentsListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListDeploymentsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/deployments`);
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
    return deserializeGoogleCloudDialogflowCxV3ListDeploymentsResponse(data);
  }

  /**
   * Creates an Experiment in the specified Environment.
   *
   * @param parent Required. The Agent to create an Environment for. Format: `projects//locations//agents//environments/`.
   */
  async projectsLocationsAgentsEnvironmentsExperimentsCreate(parent: string, req: GoogleCloudDialogflowCxV3Experiment): Promise<GoogleCloudDialogflowCxV3Experiment> {
    req = serializeGoogleCloudDialogflowCxV3Experiment(req);
    const url = new URL(`${this.#baseUrl}v3/${ parent }/experiments`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3Experiment(data);
  }

  /**
   * Deletes the specified Experiment.
   *
   * @param name Required. The name of the Environment to delete. Format: `projects//locations//agents//environments//experiments/`.
   */
  async projectsLocationsAgentsEnvironmentsExperimentsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Retrieves the specified Experiment.
   *
   * @param name Required. The name of the Environment. Format: `projects//locations//agents//environments//experiments/`.
   */
  async projectsLocationsAgentsEnvironmentsExperimentsGet(name: string): Promise<GoogleCloudDialogflowCxV3Experiment> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDialogflowCxV3Experiment(data);
  }

  /**
   * Returns the list of all experiments in the specified Environment.
   *
   * @param parent Required. The Environment to list all environments for. Format: `projects//locations//agents//environments/`.
   */
  async projectsLocationsAgentsEnvironmentsExperimentsList(parent: string, opts: ProjectsLocationsAgentsEnvironmentsExperimentsListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListExperimentsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/experiments`);
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
    return deserializeGoogleCloudDialogflowCxV3ListExperimentsResponse(data);
  }

  /**
   * Updates the specified Experiment.
   *
   * @param name The name of the experiment. Format: projects//locations//agents//environments//experiments/..
   */
  async projectsLocationsAgentsEnvironmentsExperimentsPatch(name: string, req: GoogleCloudDialogflowCxV3Experiment, opts: ProjectsLocationsAgentsEnvironmentsExperimentsPatchOptions = {}): Promise<GoogleCloudDialogflowCxV3Experiment> {
    req = serializeGoogleCloudDialogflowCxV3Experiment(req);
    opts = serializeProjectsLocationsAgentsEnvironmentsExperimentsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3Experiment(data);
  }

  /**
   * Starts the specified Experiment. This rpc only changes the state of
   * experiment from PENDING to RUNNING.
   *
   * @param name Required. Resource name of the experiment to start. Format: `projects//locations//agents//environments//experiments/`.
   */
  async projectsLocationsAgentsEnvironmentsExperimentsStart(name: string, req: GoogleCloudDialogflowCxV3StartExperimentRequest): Promise<GoogleCloudDialogflowCxV3Experiment> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:start`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3Experiment(data);
  }

  /**
   * Stops the specified Experiment. This rpc only changes the state of
   * experiment from RUNNING to DONE.
   *
   * @param name Required. Resource name of the experiment to stop. Format: `projects//locations//agents//environments//experiments/`.
   */
  async projectsLocationsAgentsEnvironmentsExperimentsStop(name: string, req: GoogleCloudDialogflowCxV3StopExperimentRequest): Promise<GoogleCloudDialogflowCxV3Experiment> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:stop`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3Experiment(data);
  }

  /**
   * Retrieves the specified Environment.
   *
   * @param name Required. The name of the Environment. Format: `projects//locations//agents//environments/`.
   */
  async projectsLocationsAgentsEnvironmentsGet(name: string): Promise<GoogleCloudDialogflowCxV3Environment> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDialogflowCxV3Environment(data);
  }

  /**
   * Returns the list of all environments in the specified Agent.
   *
   * @param parent Required. The Agent to list all environments for. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsEnvironmentsList(parent: string, opts: ProjectsLocationsAgentsEnvironmentsListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListEnvironmentsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/environments`);
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
    return deserializeGoogleCloudDialogflowCxV3ListEnvironmentsResponse(data);
  }

  /**
   * Looks up the history of the specified Environment.
   *
   * @param name Required. Resource name of the environment to look up the history for. Format: `projects//locations//agents//environments/`.
   */
  async projectsLocationsAgentsEnvironmentsLookupEnvironmentHistory(name: string, opts: ProjectsLocationsAgentsEnvironmentsLookupEnvironmentHistoryOptions = {}): Promise<GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:lookupEnvironmentHistory`);
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
    return deserializeGoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse(data);
  }

  /**
   * Updates the specified Environment. This method is a [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: An empty [Struct
   * message](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#struct)
   * - `response`: Environment
   *
   * @param name The name of the environment. Format: `projects//locations//agents//environments/`.
   */
  async projectsLocationsAgentsEnvironmentsPatch(name: string, req: GoogleCloudDialogflowCxV3Environment, opts: ProjectsLocationsAgentsEnvironmentsPatchOptions = {}): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDialogflowCxV3Environment(req);
    opts = serializeProjectsLocationsAgentsEnvironmentsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
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
   * Kicks off a continuous test under the specified Environment. This method
   * is a [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: RunContinuousTestMetadata - `response`:
   * RunContinuousTestResponse
   *
   * @param environment Required. Format: `projects//locations//agents//environments/`.
   */
  async projectsLocationsAgentsEnvironmentsRunContinuousTest(environment: string, req: GoogleCloudDialogflowCxV3RunContinuousTestRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v3/${ environment }:runContinuousTest`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Processes a natural language query and returns structured, actionable data
   * as a result. This method is not idempotent, because it may cause session
   * entity types to be updated, which in turn might affect results of future
   * queries. Note: Always use agent versions for production traffic. See
   * [Versions and
   * environments](https://cloud.google.com/dialogflow/cx/docs/concept/version).
   *
   * @param session Required. The name of the session this query is sent to. Format: `projects//locations//agents//sessions/` or `projects//locations//agents//environments//sessions/`. If `Environment ID` is not specified, we assume default 'draft' environment. It's up to the API caller to choose an appropriate `Session ID`. It can be a random number or some type of session identifiers (preferably hashed). The length of the `Session ID` must not exceed 36 characters. For more information, see the [sessions guide](https://cloud.google.com/dialogflow/cx/docs/concept/session). Note: Always use agent versions for production traffic. See [Versions and environments](https://cloud.google.com/dialogflow/cx/docs/concept/version).
   */
  async projectsLocationsAgentsEnvironmentsSessionsDetectIntent(session: string, req: GoogleCloudDialogflowCxV3DetectIntentRequest): Promise<GoogleCloudDialogflowCxV3DetectIntentResponse> {
    req = serializeGoogleCloudDialogflowCxV3DetectIntentRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ session }:detectIntent`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3DetectIntentResponse(data);
  }

  /**
   * Creates a session entity type.
   *
   * @param parent Required. The session to create a session entity type for. Format: `projects//locations//agents//sessions/` or `projects//locations//agents//environments//sessions/`. If `Environment ID` is not specified, we assume default 'draft' environment.
   */
  async projectsLocationsAgentsEnvironmentsSessionsEntityTypesCreate(parent: string, req: GoogleCloudDialogflowCxV3SessionEntityType): Promise<GoogleCloudDialogflowCxV3SessionEntityType> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/entityTypes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDialogflowCxV3SessionEntityType;
  }

  /**
   * Deletes the specified session entity type.
   *
   * @param name Required. The name of the session entity type to delete. Format: `projects//locations//agents//sessions//entityTypes/` or `projects//locations//agents//environments//sessions//entityTypes/`. If `Environment ID` is not specified, we assume default 'draft' environment.
   */
  async projectsLocationsAgentsEnvironmentsSessionsEntityTypesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Retrieves the specified session entity type.
   *
   * @param name Required. The name of the session entity type. Format: `projects//locations//agents//sessions//entityTypes/` or `projects//locations//agents//environments//sessions//entityTypes/`. If `Environment ID` is not specified, we assume default 'draft' environment.
   */
  async projectsLocationsAgentsEnvironmentsSessionsEntityTypesGet(name: string): Promise<GoogleCloudDialogflowCxV3SessionEntityType> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDialogflowCxV3SessionEntityType;
  }

  /**
   * Returns the list of all session entity types in the specified session.
   *
   * @param parent Required. The session to list all session entity types from. Format: `projects//locations//agents//sessions/` or `projects//locations//agents//environments//sessions/`. If `Environment ID` is not specified, we assume default 'draft' environment.
   */
  async projectsLocationsAgentsEnvironmentsSessionsEntityTypesList(parent: string, opts: ProjectsLocationsAgentsEnvironmentsSessionsEntityTypesListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/entityTypes`);
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
    return data as GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse;
  }

  /**
   * Updates the specified session entity type.
   *
   * @param name Required. The unique identifier of the session entity type. Format: `projects//locations//agents//sessions//entityTypes/` or `projects//locations//agents//environments//sessions//entityTypes/`. If `Environment ID` is not specified, we assume default 'draft' environment.
   */
  async projectsLocationsAgentsEnvironmentsSessionsEntityTypesPatch(name: string, req: GoogleCloudDialogflowCxV3SessionEntityType, opts: ProjectsLocationsAgentsEnvironmentsSessionsEntityTypesPatchOptions = {}): Promise<GoogleCloudDialogflowCxV3SessionEntityType> {
    opts = serializeProjectsLocationsAgentsEnvironmentsSessionsEntityTypesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudDialogflowCxV3SessionEntityType;
  }

  /**
   * Fulfills a matched intent returned by MatchIntent. Must be called after
   * MatchIntent, with input from MatchIntentResponse. Otherwise, the behavior
   * is undefined.
   *
   * @param session Required. The name of the session this query is sent to. Format: `projects//locations//agents//sessions/` or `projects//locations//agents//environments//sessions/`. If `Environment ID` is not specified, we assume default 'draft' environment. It's up to the API caller to choose an appropriate `Session ID`. It can be a random number or some type of session identifiers (preferably hashed). The length of the `Session ID` must not exceed 36 characters. For more information, see the [sessions guide](https://cloud.google.com/dialogflow/cx/docs/concept/session).
   */
  async projectsLocationsAgentsEnvironmentsSessionsFulfillIntent(session: string, req: GoogleCloudDialogflowCxV3FulfillIntentRequest): Promise<GoogleCloudDialogflowCxV3FulfillIntentResponse> {
    req = serializeGoogleCloudDialogflowCxV3FulfillIntentRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ session }:fulfillIntent`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3FulfillIntentResponse(data);
  }

  /**
   * Returns preliminary intent match results, doesn't change the session
   * status.
   *
   * @param session Required. The name of the session this query is sent to. Format: `projects//locations//agents//sessions/` or `projects//locations//agents//environments//sessions/`. If `Environment ID` is not specified, we assume default 'draft' environment. It's up to the API caller to choose an appropriate `Session ID`. It can be a random number or some type of session identifiers (preferably hashed). The length of the `Session ID` must not exceed 36 characters. For more information, see the [sessions guide](https://cloud.google.com/dialogflow/cx/docs/concept/session).
   */
  async projectsLocationsAgentsEnvironmentsSessionsMatchIntent(session: string, req: GoogleCloudDialogflowCxV3MatchIntentRequest): Promise<GoogleCloudDialogflowCxV3MatchIntentResponse> {
    req = serializeGoogleCloudDialogflowCxV3MatchIntentRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ session }:matchIntent`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDialogflowCxV3MatchIntentResponse;
  }

  /**
   * Exports the specified agent to a binary file. This method is a
   * [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: An empty [Struct
   * message](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#struct)
   * - `response`: ExportAgentResponse
   *
   * @param name Required. The name of the agent to export. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsExport(name: string, req: GoogleCloudDialogflowCxV3ExportAgentRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:export`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Creates a flow in the specified agent. Note: You should always train a
   * flow prior to sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param parent Required. The agent to create a flow for. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsFlowsCreate(parent: string, req: GoogleCloudDialogflowCxV3Flow, opts: ProjectsLocationsAgentsFlowsCreateOptions = {}): Promise<GoogleCloudDialogflowCxV3Flow> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/flows`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDialogflowCxV3Flow;
  }

  /**
   * Deletes a specified flow.
   *
   * @param name Required. The name of the flow to delete. Format: `projects//locations//agents//flows/`.
   */
  async projectsLocationsAgentsFlowsDelete(name: string, opts: ProjectsLocationsAgentsFlowsDeleteOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
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
   * Exports the specified flow to a binary file. This method is a
   * [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: An empty [Struct
   * message](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#struct)
   * - `response`: ExportFlowResponse Note that resources (e.g. intents,
   * entities, webhooks) that the flow references will also be exported.
   *
   * @param name Required. The name of the flow to export. Format: `projects//locations//agents//flows/`.
   */
  async projectsLocationsAgentsFlowsExport(name: string, req: GoogleCloudDialogflowCxV3ExportFlowRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:export`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Retrieves the specified flow.
   *
   * @param name Required. The name of the flow to get. Format: `projects//locations//agents//flows/`.
   */
  async projectsLocationsAgentsFlowsGet(name: string, opts: ProjectsLocationsAgentsFlowsGetOptions = {}): Promise<GoogleCloudDialogflowCxV3Flow> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDialogflowCxV3Flow;
  }

  /**
   * Gets the latest flow validation result. Flow validation is performed when
   * ValidateFlow is called.
   *
   * @param name Required. The flow name. Format: `projects//locations//agents//flows//validationResult`.
   */
  async projectsLocationsAgentsFlowsGetValidationResult(name: string, opts: ProjectsLocationsAgentsFlowsGetValidationResultOptions = {}): Promise<GoogleCloudDialogflowCxV3FlowValidationResult> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDialogflowCxV3FlowValidationResult(data);
  }

  /**
   * Imports the specified flow to the specified agent from a binary file. This
   * method is a [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: An empty [Struct
   * message](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#struct)
   * - `response`: ImportFlowResponse Note: You should always train a flow prior
   * to sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param parent Required. The agent to import the flow into. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsFlowsImport(parent: string, req: GoogleCloudDialogflowCxV3ImportFlowRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDialogflowCxV3ImportFlowRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ parent }/flows:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Returns the list of all flows in the specified agent.
   *
   * @param parent Required. The agent containing the flows. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsFlowsList(parent: string, opts: ProjectsLocationsAgentsFlowsListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListFlowsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/flows`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
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
    return data as GoogleCloudDialogflowCxV3ListFlowsResponse;
  }

  /**
   * Creates a page in the specified flow. Note: You should always train a flow
   * prior to sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param parent Required. The flow to create a page for. Format: `projects//locations//agents//flows/`.
   */
  async projectsLocationsAgentsFlowsPagesCreate(parent: string, req: GoogleCloudDialogflowCxV3Page, opts: ProjectsLocationsAgentsFlowsPagesCreateOptions = {}): Promise<GoogleCloudDialogflowCxV3Page> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/pages`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDialogflowCxV3Page;
  }

  /**
   * Deletes the specified page. Note: You should always train a flow prior to
   * sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param name Required. The name of the page to delete. Format: `projects//locations//agents//Flows//pages/`.
   */
  async projectsLocationsAgentsFlowsPagesDelete(name: string, opts: ProjectsLocationsAgentsFlowsPagesDeleteOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
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
   * Retrieves the specified page.
   *
   * @param name Required. The name of the page. Format: `projects//locations//agents//flows//pages/`.
   */
  async projectsLocationsAgentsFlowsPagesGet(name: string, opts: ProjectsLocationsAgentsFlowsPagesGetOptions = {}): Promise<GoogleCloudDialogflowCxV3Page> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDialogflowCxV3Page;
  }

  /**
   * Returns the list of all pages in the specified flow.
   *
   * @param parent Required. The flow to list all pages for. Format: `projects//locations//agents//flows/`.
   */
  async projectsLocationsAgentsFlowsPagesList(parent: string, opts: ProjectsLocationsAgentsFlowsPagesListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListPagesResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/pages`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
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
    return data as GoogleCloudDialogflowCxV3ListPagesResponse;
  }

  /**
   * Updates the specified page. Note: You should always train a flow prior to
   * sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param name The unique identifier of the page. Required for the Pages.UpdatePage method. Pages.CreatePage populates the name automatically. Format: `projects//locations//agents//flows//pages/`.
   */
  async projectsLocationsAgentsFlowsPagesPatch(name: string, req: GoogleCloudDialogflowCxV3Page, opts: ProjectsLocationsAgentsFlowsPagesPatchOptions = {}): Promise<GoogleCloudDialogflowCxV3Page> {
    opts = serializeProjectsLocationsAgentsFlowsPagesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
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
    return data as GoogleCloudDialogflowCxV3Page;
  }

  /**
   * Updates the specified flow. Note: You should always train a flow prior to
   * sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param name The unique identifier of the flow. Format: `projects//locations//agents//flows/`.
   */
  async projectsLocationsAgentsFlowsPatch(name: string, req: GoogleCloudDialogflowCxV3Flow, opts: ProjectsLocationsAgentsFlowsPatchOptions = {}): Promise<GoogleCloudDialogflowCxV3Flow> {
    opts = serializeProjectsLocationsAgentsFlowsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
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
    return data as GoogleCloudDialogflowCxV3Flow;
  }

  /**
   * Trains the specified flow. Note that only the flow in 'draft' environment
   * is trained. This method is a [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: An empty [Struct
   * message](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#struct)
   * - `response`: An [Empty
   * message](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#empty)
   * Note: You should always train a flow prior to sending it queries. See the
   * [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param name Required. The flow to train. Format: `projects//locations//agents//flows/`.
   */
  async projectsLocationsAgentsFlowsTrain(name: string, req: GoogleCloudDialogflowCxV3TrainFlowRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:train`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Creates an TransitionRouteGroup in the specified flow. Note: You should
   * always train a flow prior to sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param parent Required. The flow to create an TransitionRouteGroup for. Format: `projects//locations//agents//flows/`.
   */
  async projectsLocationsAgentsFlowsTransitionRouteGroupsCreate(parent: string, req: GoogleCloudDialogflowCxV3TransitionRouteGroup, opts: ProjectsLocationsAgentsFlowsTransitionRouteGroupsCreateOptions = {}): Promise<GoogleCloudDialogflowCxV3TransitionRouteGroup> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/transitionRouteGroups`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDialogflowCxV3TransitionRouteGroup;
  }

  /**
   * Deletes the specified TransitionRouteGroup. Note: You should always train
   * a flow prior to sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param name Required. The name of the TransitionRouteGroup to delete. Format: `projects//locations//agents//flows//transitionRouteGroups/`.
   */
  async projectsLocationsAgentsFlowsTransitionRouteGroupsDelete(name: string, opts: ProjectsLocationsAgentsFlowsTransitionRouteGroupsDeleteOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
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
   * Retrieves the specified TransitionRouteGroup.
   *
   * @param name Required. The name of the TransitionRouteGroup. Format: `projects//locations//agents//flows//transitionRouteGroups/`.
   */
  async projectsLocationsAgentsFlowsTransitionRouteGroupsGet(name: string, opts: ProjectsLocationsAgentsFlowsTransitionRouteGroupsGetOptions = {}): Promise<GoogleCloudDialogflowCxV3TransitionRouteGroup> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDialogflowCxV3TransitionRouteGroup;
  }

  /**
   * Returns the list of all transition route groups in the specified flow.
   *
   * @param parent Required. The flow to list all transition route groups for. Format: `projects//locations//agents//flows/`.
   */
  async projectsLocationsAgentsFlowsTransitionRouteGroupsList(parent: string, opts: ProjectsLocationsAgentsFlowsTransitionRouteGroupsListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/transitionRouteGroups`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
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
    return data as GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse;
  }

  /**
   * Updates the specified TransitionRouteGroup. Note: You should always train
   * a flow prior to sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param name The unique identifier of the transition route group. TransitionRouteGroups.CreateTransitionRouteGroup populates the name automatically. Format: `projects//locations//agents//flows//transitionRouteGroups/`.
   */
  async projectsLocationsAgentsFlowsTransitionRouteGroupsPatch(name: string, req: GoogleCloudDialogflowCxV3TransitionRouteGroup, opts: ProjectsLocationsAgentsFlowsTransitionRouteGroupsPatchOptions = {}): Promise<GoogleCloudDialogflowCxV3TransitionRouteGroup> {
    opts = serializeProjectsLocationsAgentsFlowsTransitionRouteGroupsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
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
    return data as GoogleCloudDialogflowCxV3TransitionRouteGroup;
  }

  /**
   * Validates the specified flow and creates or updates validation results.
   * Please call this API after the training is completed to get the complete
   * validation results.
   *
   * @param name Required. The flow to validate. Format: `projects//locations//agents//flows/`.
   */
  async projectsLocationsAgentsFlowsValidate(name: string, req: GoogleCloudDialogflowCxV3ValidateFlowRequest): Promise<GoogleCloudDialogflowCxV3FlowValidationResult> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:validate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3FlowValidationResult(data);
  }

  /**
   * Compares the specified base version with target version.
   *
   * @param baseVersion Required. Name of the base flow version to compare with the target version. Use version ID `0` to indicate the draft version of the specified flow. Format: `projects//locations//agents/ /flows//versions/`.
   */
  async projectsLocationsAgentsFlowsVersionsCompareVersions(baseVersion: string, req: GoogleCloudDialogflowCxV3CompareVersionsRequest): Promise<GoogleCloudDialogflowCxV3CompareVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ baseVersion }:compareVersions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3CompareVersionsResponse(data);
  }

  /**
   * Creates a Version in the specified Flow. This method is a [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: CreateVersionOperationMetadata - `response`: Version
   *
   * @param parent Required. The Flow to create an Version for. Format: `projects//locations//agents//flows/`.
   */
  async projectsLocationsAgentsFlowsVersionsCreate(parent: string, req: GoogleCloudDialogflowCxV3Version): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/versions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes the specified Version.
   *
   * @param name Required. The name of the Version to delete. Format: `projects//locations//agents//flows//versions/`.
   */
  async projectsLocationsAgentsFlowsVersionsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Retrieves the specified Version.
   *
   * @param name Required. The name of the Version. Format: `projects//locations//agents//flows//versions/`.
   */
  async projectsLocationsAgentsFlowsVersionsGet(name: string): Promise<GoogleCloudDialogflowCxV3Version> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDialogflowCxV3Version;
  }

  /**
   * Returns the list of all versions in the specified Flow.
   *
   * @param parent Required. The Flow to list all versions for. Format: `projects//locations//agents//flows/`.
   */
  async projectsLocationsAgentsFlowsVersionsList(parent: string, opts: ProjectsLocationsAgentsFlowsVersionsListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/versions`);
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
    return data as GoogleCloudDialogflowCxV3ListVersionsResponse;
  }

  /**
   * Loads resources in the specified version to the draft flow. This method is
   * a [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: An empty [Struct
   * message](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#struct)
   * - `response`: An [Empty
   * message](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#empty)
   *
   * @param name Required. The Version to be loaded to draft flow. Format: `projects//locations//agents//flows//versions/`.
   */
  async projectsLocationsAgentsFlowsVersionsLoad(name: string, req: GoogleCloudDialogflowCxV3LoadVersionRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:load`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Updates the specified Version.
   *
   * @param name Format: projects//locations//agents//flows//versions/. Version ID is a self-increasing number generated by Dialogflow upon version creation.
   */
  async projectsLocationsAgentsFlowsVersionsPatch(name: string, req: GoogleCloudDialogflowCxV3Version, opts: ProjectsLocationsAgentsFlowsVersionsPatchOptions = {}): Promise<GoogleCloudDialogflowCxV3Version> {
    opts = serializeProjectsLocationsAgentsFlowsVersionsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudDialogflowCxV3Version;
  }

  /**
   * Retrieves the specified agent.
   *
   * @param name Required. The name of the agent. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsGet(name: string): Promise<GoogleCloudDialogflowCxV3Agent> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDialogflowCxV3Agent;
  }

  /**
   * Gets the latest agent validation result. Agent validation is performed
   * when ValidateAgent is called.
   *
   * @param name Required. The agent name. Format: `projects//locations//agents//validationResult`.
   */
  async projectsLocationsAgentsGetValidationResult(name: string, opts: ProjectsLocationsAgentsGetValidationResultOptions = {}): Promise<GoogleCloudDialogflowCxV3AgentValidationResult> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDialogflowCxV3AgentValidationResult(data);
  }

  /**
   * Creates an intent in the specified agent. Note: You should always train a
   * flow prior to sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param parent Required. The agent to create an intent for. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsIntentsCreate(parent: string, req: GoogleCloudDialogflowCxV3Intent, opts: ProjectsLocationsAgentsIntentsCreateOptions = {}): Promise<GoogleCloudDialogflowCxV3Intent> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/intents`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDialogflowCxV3Intent;
  }

  /**
   * Deletes the specified intent. Note: You should always train a flow prior
   * to sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param name Required. The name of the intent to delete. Format: `projects//locations//agents//intents/`.
   */
  async projectsLocationsAgentsIntentsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Retrieves the specified intent.
   *
   * @param name Required. The name of the intent. Format: `projects//locations//agents//intents/`.
   */
  async projectsLocationsAgentsIntentsGet(name: string, opts: ProjectsLocationsAgentsIntentsGetOptions = {}): Promise<GoogleCloudDialogflowCxV3Intent> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDialogflowCxV3Intent;
  }

  /**
   * Returns the list of all intents in the specified agent.
   *
   * @param parent Required. The agent to list all intents for. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsIntentsList(parent: string, opts: ProjectsLocationsAgentsIntentsListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListIntentsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/intents`);
    if (opts.intentView !== undefined) {
      url.searchParams.append("intentView", String(opts.intentView));
    }
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
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
    return data as GoogleCloudDialogflowCxV3ListIntentsResponse;
  }

  /**
   * Updates the specified intent. Note: You should always train a flow prior
   * to sending it queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param name The unique identifier of the intent. Required for the Intents.UpdateIntent method. Intents.CreateIntent populates the name automatically. Format: `projects//locations//agents//intents/`.
   */
  async projectsLocationsAgentsIntentsPatch(name: string, req: GoogleCloudDialogflowCxV3Intent, opts: ProjectsLocationsAgentsIntentsPatchOptions = {}): Promise<GoogleCloudDialogflowCxV3Intent> {
    opts = serializeProjectsLocationsAgentsIntentsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
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
    return data as GoogleCloudDialogflowCxV3Intent;
  }

  /**
   * Returns the list of all agents in the specified location.
   *
   * @param parent Required. The location to list all agents for. Format: `projects//locations/`.
   */
  async projectsLocationsAgentsList(parent: string, opts: ProjectsLocationsAgentsListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListAgentsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/agents`);
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
    return data as GoogleCloudDialogflowCxV3ListAgentsResponse;
  }

  /**
   * Updates the specified agent. Note: You should always train flows prior to
   * sending them queries. See the [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param name The unique identifier of the agent. Required for the Agents.UpdateAgent method. Agents.CreateAgent populates the name automatically. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsPatch(name: string, req: GoogleCloudDialogflowCxV3Agent, opts: ProjectsLocationsAgentsPatchOptions = {}): Promise<GoogleCloudDialogflowCxV3Agent> {
    opts = serializeProjectsLocationsAgentsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudDialogflowCxV3Agent;
  }

  /**
   * Restores the specified agent from a binary file. Replaces the current
   * agent with a new one. Note that all existing resources in agent (e.g.
   * intents, entity types, flows) will be removed. This method is a
   * [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: An empty [Struct
   * message](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#struct)
   * - `response`: An [Empty
   * message](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#empty)
   * Note: You should always train flows prior to sending them queries. See the
   * [training
   * documentation](https://cloud.google.com/dialogflow/cx/docs/concept/training).
   *
   * @param name Required. The name of the agent to restore into. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsRestore(name: string, req: GoogleCloudDialogflowCxV3RestoreAgentRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDialogflowCxV3RestoreAgentRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ name }:restore`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Processes a natural language query and returns structured, actionable data
   * as a result. This method is not idempotent, because it may cause session
   * entity types to be updated, which in turn might affect results of future
   * queries. Note: Always use agent versions for production traffic. See
   * [Versions and
   * environments](https://cloud.google.com/dialogflow/cx/docs/concept/version).
   *
   * @param session Required. The name of the session this query is sent to. Format: `projects//locations//agents//sessions/` or `projects//locations//agents//environments//sessions/`. If `Environment ID` is not specified, we assume default 'draft' environment. It's up to the API caller to choose an appropriate `Session ID`. It can be a random number or some type of session identifiers (preferably hashed). The length of the `Session ID` must not exceed 36 characters. For more information, see the [sessions guide](https://cloud.google.com/dialogflow/cx/docs/concept/session). Note: Always use agent versions for production traffic. See [Versions and environments](https://cloud.google.com/dialogflow/cx/docs/concept/version).
   */
  async projectsLocationsAgentsSessionsDetectIntent(session: string, req: GoogleCloudDialogflowCxV3DetectIntentRequest): Promise<GoogleCloudDialogflowCxV3DetectIntentResponse> {
    req = serializeGoogleCloudDialogflowCxV3DetectIntentRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ session }:detectIntent`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3DetectIntentResponse(data);
  }

  /**
   * Creates a session entity type.
   *
   * @param parent Required. The session to create a session entity type for. Format: `projects//locations//agents//sessions/` or `projects//locations//agents//environments//sessions/`. If `Environment ID` is not specified, we assume default 'draft' environment.
   */
  async projectsLocationsAgentsSessionsEntityTypesCreate(parent: string, req: GoogleCloudDialogflowCxV3SessionEntityType): Promise<GoogleCloudDialogflowCxV3SessionEntityType> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/entityTypes`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDialogflowCxV3SessionEntityType;
  }

  /**
   * Deletes the specified session entity type.
   *
   * @param name Required. The name of the session entity type to delete. Format: `projects//locations//agents//sessions//entityTypes/` or `projects//locations//agents//environments//sessions//entityTypes/`. If `Environment ID` is not specified, we assume default 'draft' environment.
   */
  async projectsLocationsAgentsSessionsEntityTypesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Retrieves the specified session entity type.
   *
   * @param name Required. The name of the session entity type. Format: `projects//locations//agents//sessions//entityTypes/` or `projects//locations//agents//environments//sessions//entityTypes/`. If `Environment ID` is not specified, we assume default 'draft' environment.
   */
  async projectsLocationsAgentsSessionsEntityTypesGet(name: string): Promise<GoogleCloudDialogflowCxV3SessionEntityType> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDialogflowCxV3SessionEntityType;
  }

  /**
   * Returns the list of all session entity types in the specified session.
   *
   * @param parent Required. The session to list all session entity types from. Format: `projects//locations//agents//sessions/` or `projects//locations//agents//environments//sessions/`. If `Environment ID` is not specified, we assume default 'draft' environment.
   */
  async projectsLocationsAgentsSessionsEntityTypesList(parent: string, opts: ProjectsLocationsAgentsSessionsEntityTypesListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/entityTypes`);
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
    return data as GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse;
  }

  /**
   * Updates the specified session entity type.
   *
   * @param name Required. The unique identifier of the session entity type. Format: `projects//locations//agents//sessions//entityTypes/` or `projects//locations//agents//environments//sessions//entityTypes/`. If `Environment ID` is not specified, we assume default 'draft' environment.
   */
  async projectsLocationsAgentsSessionsEntityTypesPatch(name: string, req: GoogleCloudDialogflowCxV3SessionEntityType, opts: ProjectsLocationsAgentsSessionsEntityTypesPatchOptions = {}): Promise<GoogleCloudDialogflowCxV3SessionEntityType> {
    opts = serializeProjectsLocationsAgentsSessionsEntityTypesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudDialogflowCxV3SessionEntityType;
  }

  /**
   * Fulfills a matched intent returned by MatchIntent. Must be called after
   * MatchIntent, with input from MatchIntentResponse. Otherwise, the behavior
   * is undefined.
   *
   * @param session Required. The name of the session this query is sent to. Format: `projects//locations//agents//sessions/` or `projects//locations//agents//environments//sessions/`. If `Environment ID` is not specified, we assume default 'draft' environment. It's up to the API caller to choose an appropriate `Session ID`. It can be a random number or some type of session identifiers (preferably hashed). The length of the `Session ID` must not exceed 36 characters. For more information, see the [sessions guide](https://cloud.google.com/dialogflow/cx/docs/concept/session).
   */
  async projectsLocationsAgentsSessionsFulfillIntent(session: string, req: GoogleCloudDialogflowCxV3FulfillIntentRequest): Promise<GoogleCloudDialogflowCxV3FulfillIntentResponse> {
    req = serializeGoogleCloudDialogflowCxV3FulfillIntentRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ session }:fulfillIntent`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3FulfillIntentResponse(data);
  }

  /**
   * Returns preliminary intent match results, doesn't change the session
   * status.
   *
   * @param session Required. The name of the session this query is sent to. Format: `projects//locations//agents//sessions/` or `projects//locations//agents//environments//sessions/`. If `Environment ID` is not specified, we assume default 'draft' environment. It's up to the API caller to choose an appropriate `Session ID`. It can be a random number or some type of session identifiers (preferably hashed). The length of the `Session ID` must not exceed 36 characters. For more information, see the [sessions guide](https://cloud.google.com/dialogflow/cx/docs/concept/session).
   */
  async projectsLocationsAgentsSessionsMatchIntent(session: string, req: GoogleCloudDialogflowCxV3MatchIntentRequest): Promise<GoogleCloudDialogflowCxV3MatchIntentResponse> {
    req = serializeGoogleCloudDialogflowCxV3MatchIntentRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ session }:matchIntent`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDialogflowCxV3MatchIntentResponse;
  }

  /**
   * Batch deletes test cases.
   *
   * @param parent Required. The agent to delete test cases from. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsTestCasesBatchDelete(parent: string, req: GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/testCases:batchDelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Kicks off a batch run of test cases. This method is a [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: BatchRunTestCasesMetadata - `response`:
   * BatchRunTestCasesResponse
   *
   * @param parent Required. Agent name. Format: `projects//locations//agents/ `.
   */
  async projectsLocationsAgentsTestCasesBatchRun(parent: string, req: GoogleCloudDialogflowCxV3BatchRunTestCasesRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/testCases:batchRun`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Calculates the test coverage for an agent.
   *
   * @param agent Required. The agent to calculate coverage for. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsTestCasesCalculateCoverage(agent: string, opts: ProjectsLocationsAgentsTestCasesCalculateCoverageOptions = {}): Promise<GoogleCloudDialogflowCxV3CalculateCoverageResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ agent }/testCases:calculateCoverage`);
    if (opts.type !== undefined) {
      url.searchParams.append("type", String(opts.type));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDialogflowCxV3CalculateCoverageResponse;
  }

  /**
   * Creates a test case for the given agent.
   *
   * @param parent Required. The agent to create the test case for. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsTestCasesCreate(parent: string, req: GoogleCloudDialogflowCxV3TestCase): Promise<GoogleCloudDialogflowCxV3TestCase> {
    req = serializeGoogleCloudDialogflowCxV3TestCase(req);
    const url = new URL(`${this.#baseUrl}v3/${ parent }/testCases`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3TestCase(data);
  }

  /**
   * Exports the test cases under the agent to a Cloud Storage bucket or a
   * local file. Filter can be applied to export a subset of test cases. This
   * method is a [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: ExportTestCasesMetadata - `response`: ExportTestCasesResponse
   *
   * @param parent Required. The agent where to export test cases from. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsTestCasesExport(parent: string, req: GoogleCloudDialogflowCxV3ExportTestCasesRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/testCases:export`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets a test case.
   *
   * @param name Required. The name of the testcase. Format: `projects//locations//agents//testCases/`.
   */
  async projectsLocationsAgentsTestCasesGet(name: string): Promise<GoogleCloudDialogflowCxV3TestCase> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDialogflowCxV3TestCase(data);
  }

  /**
   * Imports the test cases from a Cloud Storage bucket or a local file. It
   * always creates new test cases and won't overwrite any existing ones. The
   * provided ID in the imported test case is neglected. This method is a
   * [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: ImportTestCasesMetadata - `response`: ImportTestCasesResponse
   *
   * @param parent Required. The agent to import test cases to. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsTestCasesImport(parent: string, req: GoogleCloudDialogflowCxV3ImportTestCasesRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDialogflowCxV3ImportTestCasesRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ parent }/testCases:import`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Fetches a list of test cases for a given agent.
   *
   * @param parent Required. The agent to list all pages for. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsTestCasesList(parent: string, opts: ProjectsLocationsAgentsTestCasesListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListTestCasesResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/testCases`);
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
    return deserializeGoogleCloudDialogflowCxV3ListTestCasesResponse(data);
  }

  /**
   * Updates the specified test case.
   *
   * @param name The unique identifier of the test case. TestCases.CreateTestCase will populate the name automatically. Otherwise use format: `projects//locations//agents/ /testCases/`.
   */
  async projectsLocationsAgentsTestCasesPatch(name: string, req: GoogleCloudDialogflowCxV3TestCase, opts: ProjectsLocationsAgentsTestCasesPatchOptions = {}): Promise<GoogleCloudDialogflowCxV3TestCase> {
    req = serializeGoogleCloudDialogflowCxV3TestCase(req);
    opts = serializeProjectsLocationsAgentsTestCasesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3TestCase(data);
  }

  /**
   * Gets a test case result.
   *
   * @param name Required. The name of the testcase. Format: `projects//locations//agents//testCases//results/`.
   */
  async projectsLocationsAgentsTestCasesResultsGet(name: string): Promise<GoogleCloudDialogflowCxV3TestCaseResult> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDialogflowCxV3TestCaseResult(data);
  }

  /**
   * Fetches a list of results for a given test case.
   *
   * @param parent Required. The test case to list results for. Format: `projects//locations//agents// testCases/`. Specify a `-` as a wildcard for TestCase ID to list results across multiple test cases.
   */
  async projectsLocationsAgentsTestCasesResultsList(parent: string, opts: ProjectsLocationsAgentsTestCasesResultsListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListTestCaseResultsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/results`);
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
    return deserializeGoogleCloudDialogflowCxV3ListTestCaseResultsResponse(data);
  }

  /**
   * Kicks off a test case run. This method is a [long-running
   * operation](https://cloud.google.com/dialogflow/cx/docs/how/long-running-operation).
   * The returned `Operation` type has the following method-specific fields: -
   * `metadata`: RunTestCaseMetadata - `response`: RunTestCaseResponse
   *
   * @param name Required. Format of test case name to run: `projects//locations/ /agents//testCases/`.
   */
  async projectsLocationsAgentsTestCasesRun(name: string, req: GoogleCloudDialogflowCxV3RunTestCaseRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:run`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Validates the specified agent and creates or updates validation results.
   * The agent in draft version is validated. Please call this API after the
   * training is completed to get the complete validation results.
   *
   * @param name Required. The agent to validate. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsValidate(name: string, req: GoogleCloudDialogflowCxV3ValidateAgentRequest): Promise<GoogleCloudDialogflowCxV3AgentValidationResult> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:validate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3AgentValidationResult(data);
  }

  /**
   * Creates a webhook in the specified agent.
   *
   * @param parent Required. The agent to create a webhook for. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsWebhooksCreate(parent: string, req: GoogleCloudDialogflowCxV3Webhook): Promise<GoogleCloudDialogflowCxV3Webhook> {
    req = serializeGoogleCloudDialogflowCxV3Webhook(req);
    const url = new URL(`${this.#baseUrl}v3/${ parent }/webhooks`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3Webhook(data);
  }

  /**
   * Deletes the specified webhook.
   *
   * @param name Required. The name of the webhook to delete. Format: `projects//locations//agents//webhooks/`.
   */
  async projectsLocationsAgentsWebhooksDelete(name: string, opts: ProjectsLocationsAgentsWebhooksDeleteOptions = {}): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
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
   * Retrieves the specified webhook.
   *
   * @param name Required. The name of the webhook. Format: `projects//locations//agents//webhooks/`.
   */
  async projectsLocationsAgentsWebhooksGet(name: string): Promise<GoogleCloudDialogflowCxV3Webhook> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDialogflowCxV3Webhook(data);
  }

  /**
   * Returns the list of all webhooks in the specified agent.
   *
   * @param parent Required. The agent to list all webhooks for. Format: `projects//locations//agents/`.
   */
  async projectsLocationsAgentsWebhooksList(parent: string, opts: ProjectsLocationsAgentsWebhooksListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListWebhooksResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/webhooks`);
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
    return deserializeGoogleCloudDialogflowCxV3ListWebhooksResponse(data);
  }

  /**
   * Updates the specified webhook.
   *
   * @param name The unique identifier of the webhook. Required for the Webhooks.UpdateWebhook method. Webhooks.CreateWebhook populates the name automatically. Format: `projects//locations//agents//webhooks/`.
   */
  async projectsLocationsAgentsWebhooksPatch(name: string, req: GoogleCloudDialogflowCxV3Webhook, opts: ProjectsLocationsAgentsWebhooksPatchOptions = {}): Promise<GoogleCloudDialogflowCxV3Webhook> {
    req = serializeGoogleCloudDialogflowCxV3Webhook(req);
    opts = serializeProjectsLocationsAgentsWebhooksPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoogleCloudDialogflowCxV3Webhook(data);
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<GoogleCloudLocationLocation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudLocationLocation;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async projectsLocationsList(name: string, opts: ProjectsLocationsListOptions = {}): Promise<GoogleCloudLocationListLocationsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ name }/locations`);
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
    const url = new URL(`${this.#baseUrl}v3/${ name }:cancel`);
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
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
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
    const url = new URL(`${this.#baseUrl}v3/${ name }/operations`);
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
   * Create security settings in the specified location.
   *
   * @param parent Required. The location to create an SecuritySettings for. Format: `projects//locations/`.
   */
  async projectsLocationsSecuritySettingsCreate(parent: string, req: GoogleCloudDialogflowCxV3SecuritySettings): Promise<GoogleCloudDialogflowCxV3SecuritySettings> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/securitySettings`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDialogflowCxV3SecuritySettings;
  }

  /**
   * Deletes the specified SecuritySettings.
   *
   * @param name Required. The name of the SecuritySettings to delete. Format: `projects//locations//securitySettings/`.
   */
  async projectsLocationsSecuritySettingsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Retrieves the specified SecuritySettings. The returned settings may be
   * stale by up to 1 minute.
   *
   * @param name Required. Resource name of the settings. Format: `projects//locations//securitySettings/`.
   */
  async projectsLocationsSecuritySettingsGet(name: string): Promise<GoogleCloudDialogflowCxV3SecuritySettings> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDialogflowCxV3SecuritySettings;
  }

  /**
   * Returns the list of all security settings in the specified location.
   *
   * @param parent Required. The location to list all security settings for. Format: `projects//locations/`.
   */
  async projectsLocationsSecuritySettingsList(parent: string, opts: ProjectsLocationsSecuritySettingsListOptions = {}): Promise<GoogleCloudDialogflowCxV3ListSecuritySettingsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/securitySettings`);
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
    return data as GoogleCloudDialogflowCxV3ListSecuritySettingsResponse;
  }

  /**
   * Updates the specified SecuritySettings.
   *
   * @param name Resource name of the settings. Required for the SecuritySettingsService.UpdateSecuritySettings method. SecuritySettingsService.CreateSecuritySettings populates the name automatically. Format: `projects//locations//securitySettings/`.
   */
  async projectsLocationsSecuritySettingsPatch(name: string, req: GoogleCloudDialogflowCxV3SecuritySettings, opts: ProjectsLocationsSecuritySettingsPatchOptions = {}): Promise<GoogleCloudDialogflowCxV3SecuritySettings> {
    opts = serializeProjectsLocationsSecuritySettingsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GoogleCloudDialogflowCxV3SecuritySettings;
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
  async projectsOperationsCancel(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }:cancel`);
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
  async projectsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
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
  async projectsOperationsList(name: string, opts: ProjectsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ name }/operations`);
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
 * Hierarchical advanced settings for agent/flow/page/fulfillment/parameter.
 * Settings exposed at lower level overrides the settings exposed at higher
 * level. Overriding occurs at the sub-setting level. For example, the
 * playback_interruption_settings at fulfillment level only overrides the
 * playback_interruption_settings at the agent level, leaving other settings at
 * the agent level unchanged. DTMF settings does not override each other. DTMF
 * settings set at different levels define DTMF detections running in parallel.
 * Hierarchy: Agent->Flow->Page->Fulfillment/Parameter.
 */
export interface GoogleCloudDialogflowCxV3AdvancedSettings {
  /**
   * If present, incoming audio is exported by Dialogflow to the configured
   * Google Cloud Storage destination. Exposed at the following levels: - Agent
   * level - Flow level
   */
  audioExportGcsDestination?: GoogleCloudDialogflowCxV3GcsDestination;
  /**
   * Settings for logging. Settings for Dialogflow History, Contact Center
   * messages, StackDriver logs, and speech logging. Exposed at the following
   * levels: - Agent level.
   */
  loggingSettings?: GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings;
}

/**
 * Define behaviors on logging.
 */
export interface GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings {
  /**
   * If true, DF Interaction logging is currently enabled.
   */
  enableInteractionLogging?: boolean;
  /**
   * If true, StackDriver logging is currently enabled.
   */
  enableStackdriverLogging?: boolean;
}

/**
 * Agents are best described as Natural Language Understanding (NLU) modules
 * that transform user requests into actionable data. You can include agents in
 * your app, product, or service to determine user intent and respond to the
 * user in a natural way. After you create an agent, you can add Intents, Entity
 * Types, Flows, Fulfillments, Webhooks, and so on to manage the conversation
 * flows..
 */
export interface GoogleCloudDialogflowCxV3Agent {
  /**
   * Hierarchical advanced settings for this agent. The settings exposed at the
   * lower level overrides the settings exposed at the higher level.
   */
  advancedSettings?: GoogleCloudDialogflowCxV3AdvancedSettings;
  /**
   * The URI of the agent's avatar. Avatars are used throughout the Dialogflow
   * console and in the self-hosted [Web
   * Demo](https://cloud.google.com/dialogflow/docs/integrations/web-demo)
   * integration.
   */
  avatarUri?: string;
  /**
   * Required. Immutable. The default language of the agent as a language tag.
   * See [Language
   * Support](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * for a list of the currently supported language codes. This field cannot be
   * set by the Agents.UpdateAgent method.
   */
  defaultLanguageCode?: string;
  /**
   * The description of the agent. The maximum length is 500 characters. If
   * exceeded, the request is rejected.
   */
  description?: string;
  /**
   * Required. The human-readable name of the agent, unique within the
   * location.
   */
  displayName?: string;
  /**
   * Indicates if automatic spell correction is enabled in detect intent
   * requests.
   */
  enableSpellCorrection?: boolean;
  /**
   * Indicates if stackdriver logging is enabled for the agent. Please use
   * agent.advanced_settings instead.
   */
  enableStackdriverLogging?: boolean;
  /**
   * Indicates whether the agent is locked for changes. If the agent is locked,
   * modifications to the agent will be rejected except for RestoreAgent.
   */
  locked?: boolean;
  /**
   * The unique identifier of the agent. Required for the Agents.UpdateAgent
   * method. Agents.CreateAgent populates the name automatically. Format:
   * `projects//locations//agents/`.
   */
  name?: string;
  /**
   * Name of the SecuritySettings reference for the agent. Format:
   * `projects//locations//securitySettings/`.
   */
  securitySettings?: string;
  /**
   * Speech recognition related settings.
   */
  speechToTextSettings?: GoogleCloudDialogflowCxV3SpeechToTextSettings;
  /**
   * Immutable. Name of the start flow in this agent. A start flow will be
   * automatically created when the agent is created, and can only be deleted by
   * deleting the agent. Format: `projects//locations//agents//flows/`.
   */
  startFlow?: string;
  /**
   * The list of all languages supported by the agent (except for the
   * `default_language_code`).
   */
  supportedLanguageCodes?: string[];
  /**
   * Settings on instructing the speech synthesizer on how to generate the
   * output audio content.
   */
  textToSpeechSettings?: GoogleCloudDialogflowCxV3TextToSpeechSettings;
  /**
   * Required. The time zone of the agent from the [time zone
   * database](https://www.iana.org/time-zones), e.g., America/New_York,
   * Europe/Paris.
   */
  timeZone?: string;
}

/**
 * The response message for Agents.GetAgentValidationResult.
 */
export interface GoogleCloudDialogflowCxV3AgentValidationResult {
  /**
   * Contains all flow validation results.
   */
  flowValidationResults?: GoogleCloudDialogflowCxV3FlowValidationResult[];
  /**
   * The unique identifier of the agent validation result. Format:
   * `projects//locations//agents//validationResult`.
   */
  name?: string;
}

function serializeGoogleCloudDialogflowCxV3AgentValidationResult(data: any): GoogleCloudDialogflowCxV3AgentValidationResult {
  return {
    ...data,
    flowValidationResults: data["flowValidationResults"] !== undefined ? data["flowValidationResults"].map((item: any) => (serializeGoogleCloudDialogflowCxV3FlowValidationResult(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3AgentValidationResult(data: any): GoogleCloudDialogflowCxV3AgentValidationResult {
  return {
    ...data,
    flowValidationResults: data["flowValidationResults"] !== undefined ? data["flowValidationResults"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3FlowValidationResult(item))) : undefined,
  };
}

/**
 * Represents the natural speech audio to be processed.
 */
export interface GoogleCloudDialogflowCxV3AudioInput {
  /**
   * The natural language speech audio to be processed. A single request can
   * contain up to 2 minutes of speech audio data. The transcribed text cannot
   * contain more than 256 bytes. For non-streaming audio detect intent, both
   * `config` and `audio` must be provided. For streaming audio detect intent,
   * `config` must be provided in the first request and `audio` must be provided
   * in all following requests.
   */
  audio?: Uint8Array;
  /**
   * Required. Instructs the speech recognizer how to process the speech audio.
   */
  config?: GoogleCloudDialogflowCxV3InputAudioConfig;
}

function serializeGoogleCloudDialogflowCxV3AudioInput(data: any): GoogleCloudDialogflowCxV3AudioInput {
  return {
    ...data,
    audio: data["audio"] !== undefined ? encodeBase64(data["audio"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3AudioInput(data: any): GoogleCloudDialogflowCxV3AudioInput {
  return {
    ...data,
    audio: data["audio"] !== undefined ? decodeBase64(data["audio"] as string) : undefined,
  };
}

/**
 * The request message for TestCases.BatchDeleteTestCases.
 */
export interface GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest {
  /**
   * Required. Format of test case names: `projects//locations/
   * /agents//testCases/`.
   */
  names?: string[];
}

/**
 * Metadata returned for the TestCases.BatchRunTestCases long running
 * operation.
 */
export interface GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata {
  /**
   * The test errors.
   */
  errors?: GoogleCloudDialogflowCxV3TestError[];
}

function serializeGoogleCloudDialogflowCxV3BatchRunTestCasesMetadata(data: any): GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (serializeGoogleCloudDialogflowCxV3TestError(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3BatchRunTestCasesMetadata(data: any): GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3TestError(item))) : undefined,
  };
}

/**
 * The request message for TestCases.BatchRunTestCases.
 */
export interface GoogleCloudDialogflowCxV3BatchRunTestCasesRequest {
  /**
   * Optional. If not set, draft environment is assumed. Format:
   * `projects//locations//agents//environments/`.
   */
  environment?: string;
  /**
   * Required. Format: `projects//locations//agents//testCases/`.
   */
  testCases?: string[];
}

/**
 * The response message for TestCases.BatchRunTestCases.
 */
export interface GoogleCloudDialogflowCxV3BatchRunTestCasesResponse {
  /**
   * The test case results. The detailed conversation turns are empty in this
   * response.
   */
  results?: GoogleCloudDialogflowCxV3TestCaseResult[];
}

function serializeGoogleCloudDialogflowCxV3BatchRunTestCasesResponse(data: any): GoogleCloudDialogflowCxV3BatchRunTestCasesResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeGoogleCloudDialogflowCxV3TestCaseResult(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3BatchRunTestCasesResponse(data: any): GoogleCloudDialogflowCxV3BatchRunTestCasesResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3TestCaseResult(item))) : undefined,
  };
}

/**
 * Represents the natural speech audio to be processed.
 */
export interface GoogleCloudDialogflowCxV3beta1AudioInput {
  /**
   * The natural language speech audio to be processed. A single request can
   * contain up to 2 minutes of speech audio data. The transcribed text cannot
   * contain more than 256 bytes. For non-streaming audio detect intent, both
   * `config` and `audio` must be provided. For streaming audio detect intent,
   * `config` must be provided in the first request and `audio` must be provided
   * in all following requests.
   */
  audio?: Uint8Array;
  /**
   * Required. Instructs the speech recognizer how to process the speech audio.
   */
  config?: GoogleCloudDialogflowCxV3beta1InputAudioConfig;
}

function serializeGoogleCloudDialogflowCxV3beta1AudioInput(data: any): GoogleCloudDialogflowCxV3beta1AudioInput {
  return {
    ...data,
    audio: data["audio"] !== undefined ? encodeBase64(data["audio"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1AudioInput(data: any): GoogleCloudDialogflowCxV3beta1AudioInput {
  return {
    ...data,
    audio: data["audio"] !== undefined ? decodeBase64(data["audio"] as string) : undefined,
  };
}

/**
 * Metadata returned for the TestCases.BatchRunTestCases long running
 * operation.
 */
export interface GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata {
  /**
   * The test errors.
   */
  errors?: GoogleCloudDialogflowCxV3beta1TestError[];
}

function serializeGoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata(data: any): GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (serializeGoogleCloudDialogflowCxV3beta1TestError(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata(data: any): GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3beta1TestError(item))) : undefined,
  };
}

/**
 * The response message for TestCases.BatchRunTestCases.
 */
export interface GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse {
  /**
   * The test case results. The detailed conversation turns are empty in this
   * response.
   */
  results?: GoogleCloudDialogflowCxV3beta1TestCaseResult[];
}

function serializeGoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse(data: any): GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeGoogleCloudDialogflowCxV3beta1TestCaseResult(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse(data: any): GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3beta1TestCaseResult(item))) : undefined,
  };
}

/**
 * Represents a result from running a test case in an agent environment.
 */
export interface GoogleCloudDialogflowCxV3beta1ContinuousTestResult {
  /**
   * The resource name for the continuous test result. Format:
   * `projects//locations//agents//environments//continuousTestResults/`.
   */
  name?: string;
  /**
   * The result of this continuous test run, i.e. whether all the tests in this
   * continuous test run pass or not.
   */
  result?:  | "AGGREGATED_TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED";
  /**
   * Time when the continuous testing run starts.
   */
  runTime?: Date;
  /**
   * A list of individual test case results names in this continuous test run.
   */
  testCaseResults?: string[];
}

function serializeGoogleCloudDialogflowCxV3beta1ContinuousTestResult(data: any): GoogleCloudDialogflowCxV3beta1ContinuousTestResult {
  return {
    ...data,
    runTime: data["runTime"] !== undefined ? data["runTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1ContinuousTestResult(data: any): GoogleCloudDialogflowCxV3beta1ContinuousTestResult {
  return {
    ...data,
    runTime: data["runTime"] !== undefined ? new Date(data["runTime"]) : undefined,
  };
}

/**
 * This message is used to hold all the Conversation Signals data, which will
 * be converted to JSON and exported to BigQuery.
 */
export interface GoogleCloudDialogflowCxV3beta1ConversationSignals {
  /**
   * Required. Turn signals for the current turn.
   */
  turnSignals?: GoogleCloudDialogflowCxV3beta1TurnSignals;
}

/**
 * One interaction between a human and virtual agent. The human provides some
 * input and the virtual agent provides a response.
 */
export interface GoogleCloudDialogflowCxV3beta1ConversationTurn {
  /**
   * The user input.
   */
  userInput?: GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput;
  /**
   * The virtual agent output.
   */
  virtualAgentOutput?: GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput;
}

function serializeGoogleCloudDialogflowCxV3beta1ConversationTurn(data: any): GoogleCloudDialogflowCxV3beta1ConversationTurn {
  return {
    ...data,
    userInput: data["userInput"] !== undefined ? serializeGoogleCloudDialogflowCxV3beta1ConversationTurnUserInput(data["userInput"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1ConversationTurn(data: any): GoogleCloudDialogflowCxV3beta1ConversationTurn {
  return {
    ...data,
    userInput: data["userInput"] !== undefined ? deserializeGoogleCloudDialogflowCxV3beta1ConversationTurnUserInput(data["userInput"]) : undefined,
  };
}

/**
 * The input from the human user.
 */
export interface GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput {
  /**
   * Whether sentiment analysis is enabled.
   */
  enableSentimentAnalysis?: boolean;
  /**
   * Parameters that need to be injected into the conversation during intent
   * detection.
   */
  injectedParameters?: {
    [key: string]: any
  };
  /**
   * Supports text input, event input, dtmf input in the test case.
   */
  input?: GoogleCloudDialogflowCxV3beta1QueryInput;
  /**
   * If webhooks should be allowed to trigger in response to the user
   * utterance. Often if parameters are injected, webhooks should not be
   * enabled.
   */
  isWebhookEnabled?: boolean;
}

function serializeGoogleCloudDialogflowCxV3beta1ConversationTurnUserInput(data: any): GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput {
  return {
    ...data,
    input: data["input"] !== undefined ? serializeGoogleCloudDialogflowCxV3beta1QueryInput(data["input"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1ConversationTurnUserInput(data: any): GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput {
  return {
    ...data,
    input: data["input"] !== undefined ? deserializeGoogleCloudDialogflowCxV3beta1QueryInput(data["input"]) : undefined,
  };
}

/**
 * The output from the virtual agent.
 */
export interface GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput {
  /**
   * The Page on which the utterance was spoken. Only name and displayName will
   * be set.
   */
  currentPage?: GoogleCloudDialogflowCxV3beta1Page;
  /**
   * Required. Input only. The diagnostic info output for the turn. Required to
   * calculate the testing coverage.
   */
  diagnosticInfo?: {
    [key: string]: any
  };
  /**
   * Output only. If this is part of a result conversation turn, the list of
   * differences between the original run and the replay for this output, if
   * any.
   */
  readonly differences?: GoogleCloudDialogflowCxV3beta1TestRunDifference[];
  /**
   * The session parameters available to the bot at this point.
   */
  sessionParameters?: {
    [key: string]: any
  };
  /**
   * Response error from the agent in the test result. If set, other output is
   * empty.
   */
  status?: GoogleRpcStatus;
  /**
   * The text responses from the agent for the turn.
   */
  textResponses?: GoogleCloudDialogflowCxV3beta1ResponseMessageText[];
  /**
   * The Intent that triggered the response. Only name and displayName will be
   * set.
   */
  triggeredIntent?: GoogleCloudDialogflowCxV3beta1Intent;
}

/**
 * Metadata for CreateDocument operation.
 */
export interface GoogleCloudDialogflowCxV3beta1CreateDocumentOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowCxV3beta1GenericKnowledgeOperationMetadata;
}

/**
 * Metadata associated with the long running operation for
 * Versions.CreateVersion.
 */
export interface GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata {
  /**
   * Name of the created version. Format:
   * `projects//locations//agents//flows//versions/`.
   */
  version?: string;
}

/**
 * Metadata for DeleteDocument operation.
 */
export interface GoogleCloudDialogflowCxV3beta1DeleteDocumentOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowCxV3beta1GenericKnowledgeOperationMetadata;
}

/**
 * Metadata returned for the Environments.DeployFlow long running operation.
 */
export interface GoogleCloudDialogflowCxV3beta1DeployFlowMetadata {
  /**
   * Errors of running deployment tests.
   */
  testErrors?: GoogleCloudDialogflowCxV3beta1TestError[];
}

function serializeGoogleCloudDialogflowCxV3beta1DeployFlowMetadata(data: any): GoogleCloudDialogflowCxV3beta1DeployFlowMetadata {
  return {
    ...data,
    testErrors: data["testErrors"] !== undefined ? data["testErrors"].map((item: any) => (serializeGoogleCloudDialogflowCxV3beta1TestError(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1DeployFlowMetadata(data: any): GoogleCloudDialogflowCxV3beta1DeployFlowMetadata {
  return {
    ...data,
    testErrors: data["testErrors"] !== undefined ? data["testErrors"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3beta1TestError(item))) : undefined,
  };
}

/**
 * The response message for Environments.DeployFlow.
 */
export interface GoogleCloudDialogflowCxV3beta1DeployFlowResponse {
  /**
   * The name of the flow version deployment. Format:
   * `projects//locations//agents// environments//deployments/`.
   */
  deployment?: string;
  /**
   * The updated environment where the flow is deployed.
   */
  environment?: GoogleCloudDialogflowCxV3beta1Environment;
}

function serializeGoogleCloudDialogflowCxV3beta1DeployFlowResponse(data: any): GoogleCloudDialogflowCxV3beta1DeployFlowResponse {
  return {
    ...data,
    environment: data["environment"] !== undefined ? serializeGoogleCloudDialogflowCxV3beta1Environment(data["environment"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1DeployFlowResponse(data: any): GoogleCloudDialogflowCxV3beta1DeployFlowResponse {
  return {
    ...data,
    environment: data["environment"] !== undefined ? deserializeGoogleCloudDialogflowCxV3beta1Environment(data["environment"]) : undefined,
  };
}

/**
 * Represents the input for dtmf event.
 */
export interface GoogleCloudDialogflowCxV3beta1DtmfInput {
  /**
   * The dtmf digits.
   */
  digits?: string;
  /**
   * The finish digit (if any).
   */
  finishDigit?: string;
}

/**
 * Represents an environment for an agent. You can create multiple versions of
 * your agent and publish them to separate environments. When you edit an agent,
 * you are editing the draft agent. At any point, you can save the draft agent
 * as an agent version, which is an immutable snapshot of your agent. When you
 * save the draft agent, it is published to the default environment. When you
 * create agent versions, you can publish them to custom environments. You can
 * create a variety of custom environments for testing, development, production,
 * etc.
 */
export interface GoogleCloudDialogflowCxV3beta1Environment {
  /**
   * The human-readable description of the environment. The maximum length is
   * 500 characters. If exceeded, the request is rejected.
   */
  description?: string;
  /**
   * Required. The human-readable name of the environment (unique in an agent).
   * Limit of 64 characters.
   */
  displayName?: string;
  /**
   * The name of the environment. Format:
   * `projects//locations//agents//environments/`.
   */
  name?: string;
  /**
   * The test cases config for continuous tests of this environment.
   */
  testCasesConfig?: GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig;
  /**
   * Output only. Update time of this environment.
   */
  readonly updateTime?: Date;
  /**
   * A list of configurations for flow versions. You should include version
   * configs for all flows that are reachable from `Start Flow` in the agent.
   * Otherwise, an error will be returned.
   */
  versionConfigs?: GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig[];
  /**
   * The webhook configuration for this environment.
   */
  webhookConfig?: GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig;
}

function serializeGoogleCloudDialogflowCxV3beta1Environment(data: any): GoogleCloudDialogflowCxV3beta1Environment {
  return {
    ...data,
    webhookConfig: data["webhookConfig"] !== undefined ? serializeGoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig(data["webhookConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1Environment(data: any): GoogleCloudDialogflowCxV3beta1Environment {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    webhookConfig: data["webhookConfig"] !== undefined ? deserializeGoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig(data["webhookConfig"]) : undefined,
  };
}

/**
 * The configuration for continuous tests.
 */
export interface GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig {
  /**
   * Whether to run test cases in TestCasesConfig.test_cases periodically.
   * Default false. If set to true, run once a day.
   */
  enableContinuousRun?: boolean;
  /**
   * Whether to run test cases in TestCasesConfig.test_cases before deploying a
   * flow version to the environment. Default false.
   */
  enablePredeploymentRun?: boolean;
  /**
   * A list of test case names to run. They should be under the same agent.
   * Format of each test case name: `projects//locations/ /agents//testCases/`
   */
  testCases?: string[];
}

/**
 * Configuration for the version.
 */
export interface GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig {
  /**
   * Required. Format: projects//locations//agents//flows//versions/.
   */
  version?: string;
}

/**
 * Configuration for webhooks.
 */
export interface GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig {
  /**
   * The list of webhooks to override for the agent environment. The webhook
   * must exist in the agent. You can override fields in `generic_web_service`
   * and `service_directory`.
   */
  webhookOverrides?: GoogleCloudDialogflowCxV3beta1Webhook[];
}

function serializeGoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig(data: any): GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig {
  return {
    ...data,
    webhookOverrides: data["webhookOverrides"] !== undefined ? data["webhookOverrides"].map((item: any) => (serializeGoogleCloudDialogflowCxV3beta1Webhook(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig(data: any): GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig {
  return {
    ...data,
    webhookOverrides: data["webhookOverrides"] !== undefined ? data["webhookOverrides"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3beta1Webhook(item))) : undefined,
  };
}

/**
 * An event handler specifies an event that can be handled during a session.
 * When the specified event happens, the following actions are taken in order: *
 * If there is a `trigger_fulfillment` associated with the event, it will be
 * called. * If there is a `target_page` associated with the event, the session
 * will transition into the specified page. * If there is a `target_flow`
 * associated with the event, the session will transition into the specified
 * flow.
 */
export interface GoogleCloudDialogflowCxV3beta1EventHandler {
  /**
   * Required. The name of the event to handle.
   */
  event?: string;
  /**
   * Output only. The unique identifier of this event handler.
   */
  readonly name?: string;
  /**
   * The target flow to transition to. Format:
   * `projects//locations//agents//flows/`.
   */
  targetFlow?: string;
  /**
   * The target page to transition to. Format:
   * `projects//locations//agents//flows//pages/`.
   */
  targetPage?: string;
  /**
   * The fulfillment to call when the event occurs. Handling webhook errors
   * with a fulfillment enabled with webhook could cause infinite loop. It is
   * invalid to specify such fulfillment for a handler handling webhooks.
   */
  triggerFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
}

/**
 * Represents the event to trigger.
 */
export interface GoogleCloudDialogflowCxV3beta1EventInput {
  /**
   * Name of the event.
   */
  event?: string;
}

/**
 * The response message for Agents.ExportAgent.
 */
export interface GoogleCloudDialogflowCxV3beta1ExportAgentResponse {
  /**
   * Uncompressed raw byte content for agent.
   */
  agentContent?: Uint8Array;
  /**
   * The URI to a file containing the exported agent. This field is populated
   * only if `agent_uri` is specified in ExportAgentRequest.
   */
  agentUri?: string;
}

function serializeGoogleCloudDialogflowCxV3beta1ExportAgentResponse(data: any): GoogleCloudDialogflowCxV3beta1ExportAgentResponse {
  return {
    ...data,
    agentContent: data["agentContent"] !== undefined ? encodeBase64(data["agentContent"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1ExportAgentResponse(data: any): GoogleCloudDialogflowCxV3beta1ExportAgentResponse {
  return {
    ...data,
    agentContent: data["agentContent"] !== undefined ? decodeBase64(data["agentContent"] as string) : undefined,
  };
}

/**
 * The response message for Flows.ExportFlow.
 */
export interface GoogleCloudDialogflowCxV3beta1ExportFlowResponse {
  /**
   * Uncompressed raw byte content for flow.
   */
  flowContent?: Uint8Array;
  /**
   * The URI to a file containing the exported flow. This field is populated
   * only if `flow_uri` is specified in ExportFlowRequest.
   */
  flowUri?: string;
}

function serializeGoogleCloudDialogflowCxV3beta1ExportFlowResponse(data: any): GoogleCloudDialogflowCxV3beta1ExportFlowResponse {
  return {
    ...data,
    flowContent: data["flowContent"] !== undefined ? encodeBase64(data["flowContent"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1ExportFlowResponse(data: any): GoogleCloudDialogflowCxV3beta1ExportFlowResponse {
  return {
    ...data,
    flowContent: data["flowContent"] !== undefined ? decodeBase64(data["flowContent"] as string) : undefined,
  };
}

/**
 * Metadata returned for the TestCases.ExportTestCases long running operation.
 * This message currently has no fields.
 */
export interface GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata {
}

/**
 * The response message for TestCases.ExportTestCases.
 */
export interface GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse {
  /**
   * Uncompressed raw byte content for test cases.
   */
  content?: Uint8Array;
  /**
   * The URI to a file containing the exported test cases. This field is
   * populated only if `gcs_uri` is specified in ExportTestCasesRequest.
   */
  gcsUri?: string;
}

function serializeGoogleCloudDialogflowCxV3beta1ExportTestCasesResponse(data: any): GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1ExportTestCasesResponse(data: any): GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * A form is a data model that groups related parameters that can be collected
 * from the user. The process in which the agent prompts the user and collects
 * parameter values from the user is called form filling. A form can be added to
 * a page. When form filling is done, the filled parameters will be written to
 * the session.
 */
export interface GoogleCloudDialogflowCxV3beta1Form {
  /**
   * Parameters to collect from the user.
   */
  parameters?: GoogleCloudDialogflowCxV3beta1FormParameter[];
}

/**
 * Represents a form parameter.
 */
export interface GoogleCloudDialogflowCxV3beta1FormParameter {
  /**
   * The default value of an optional parameter. If the parameter is required,
   * the default value will be ignored.
   */
  defaultValue?: any;
  /**
   * Required. The human-readable name of the parameter, unique within the
   * form.
   */
  displayName?: string;
  /**
   * Required. The entity type of the parameter. Format:
   * `projects/-/locations/-/agents/-/entityTypes/` for system entity types (for
   * example, `projects/-/locations/-/agents/-/entityTypes/sys.date`), or
   * `projects//locations//agents//entityTypes/` for developer entity types.
   */
  entityType?: string;
  /**
   * Required. Defines fill behavior for the parameter.
   */
  fillBehavior?: GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior;
  /**
   * Indicates whether the parameter represents a list of values.
   */
  isList?: boolean;
  /**
   * Indicates whether the parameter content should be redacted in log. If
   * redaction is enabled, the parameter content will be replaced by parameter
   * name during logging. Note: the parameter content is subject to redaction if
   * either parameter level redaction or entity type level redaction is enabled.
   */
  redact?: boolean;
  /**
   * Indicates whether the parameter is required. Optional parameters will not
   * trigger prompts; however, they are filled if the user specifies them.
   * Required parameters must be filled before form filling concludes.
   */
  required?: boolean;
}

/**
 * Configuration for how the filling of a parameter should be handled.
 */
export interface GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior {
  /**
   * Required. The fulfillment to provide the initial prompt that the agent can
   * present to the user in order to fill the parameter.
   */
  initialPromptFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  /**
   * The handlers for parameter-level events, used to provide reprompt for the
   * parameter or transition to a different page/flow. The supported events are:
   * * `sys.no-match-`, where N can be from 1 to 6 * `sys.no-match-default` *
   * `sys.no-input-`, where N can be from 1 to 6 * `sys.no-input-default` *
   * `sys.invalid-parameter` `initial_prompt_fulfillment` provides the first
   * prompt for the parameter. If the user's response does not fill the
   * parameter, a no-match/no-input event will be triggered, and the fulfillment
   * associated with the `sys.no-match-1`/`sys.no-input-1` handler (if defined)
   * will be called to provide a prompt. The `sys.no-match-2`/`sys.no-input-2`
   * handler (if defined) will respond to the next no-match/no-input event, and
   * so on. A `sys.no-match-default` or `sys.no-input-default` handler will be
   * used to handle all following no-match/no-input events after all numbered
   * no-match/no-input handlers for the parameter are consumed. A
   * `sys.invalid-parameter` handler can be defined to handle the case where the
   * parameter values have been `invalidated` by webhook. For example, if the
   * user's response fill the parameter, however the parameter was invalidated
   * by webhook, the fulfillment associated with the `sys.invalid-parameter`
   * handler (if defined) will be called to provide a prompt. If the event
   * handler for the corresponding event can't be found on the parameter,
   * `initial_prompt_fulfillment` will be re-prompted.
   */
  repromptEventHandlers?: GoogleCloudDialogflowCxV3beta1EventHandler[];
}

/**
 * A fulfillment can do one or more of the following actions at the same time:
 * * Generate rich message responses. * Set parameter values. * Call the
 * webhook. Fulfillments can be called at various stages in the Page or Form
 * lifecycle. For example, when a DetectIntentRequest drives a session to enter
 * a new page, the page's entry fulfillment can add a static response to the
 * QueryResult in the returning DetectIntentResponse, call the webhook (for
 * example, to load user data from a database), or both.
 */
export interface GoogleCloudDialogflowCxV3beta1Fulfillment {
  /**
   * Conditional cases for this fulfillment.
   */
  conditionalCases?: GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases[];
  /**
   * The list of rich message responses to present to the user.
   */
  messages?: GoogleCloudDialogflowCxV3beta1ResponseMessage[];
  /**
   * Whether Dialogflow should return currently queued fulfillment response
   * messages in streaming APIs. If a webhook is specified, it happens before
   * Dialogflow invokes webhook. Warning: 1) This flag only affects streaming
   * API. Responses are still queued and returned once in non-streaming API. 2)
   * The flag can be enabled in any fulfillment but only the first 3 partial
   * responses will be returned. You may only want to apply it to fulfillments
   * that have slow webhooks.
   */
  returnPartialResponses?: boolean;
  /**
   * Set parameter values before executing the webhook.
   */
  setParameterActions?: GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction[];
  /**
   * The value of this field will be populated in the WebhookRequest
   * `fulfillmentInfo.tag` field by Dialogflow when the associated webhook is
   * called. The tag is typically used by the webhook service to identify which
   * fulfillment is being called, but it could be used for other purposes. This
   * field is required if `webhook` is specified.
   */
  tag?: string;
  /**
   * The webhook to call. Format: `projects//locations//agents//webhooks/`.
   */
  webhook?: string;
}

/**
 * A list of cascading if-else conditions. Cases are mutually exclusive. The
 * first one with a matching condition is selected, all the rest ignored.
 */
export interface GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases {
  /**
   * A list of cascading if-else conditions.
   */
  cases?: GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase[];
}

/**
 * Each case has a Boolean condition. When it is evaluated to be True, the
 * corresponding messages will be selected and evaluated recursively.
 */
export interface GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase {
  /**
   * A list of case content.
   */
  caseContent?: GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent[];
  /**
   * The condition to activate and select this case. Empty means the condition
   * is always true. The condition is evaluated against form parameters or
   * session parameters. See the [conditions
   * reference](https://cloud.google.com/dialogflow/cx/docs/reference/condition).
   */
  condition?: string;
}

/**
 * The list of messages or conditional cases to activate for this case.
 */
export interface GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent {
  /**
   * Additional cases to be evaluated.
   */
  additionalCases?: GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases;
  /**
   * Returned message.
   */
  message?: GoogleCloudDialogflowCxV3beta1ResponseMessage;
}

/**
 * Setting a parameter value.
 */
export interface GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction {
  /**
   * Display name of the parameter.
   */
  parameter?: string;
  /**
   * The new value of the parameter. A null value clears the parameter.
   */
  value?: any;
}

/**
 * Metadata in google::longrunning::Operation for Knowledge operations.
 */
export interface GoogleCloudDialogflowCxV3beta1GenericKnowledgeOperationMetadata {
  /**
   * Required. Output only. The current state of this operation.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE";
}

/**
 * Metadata for ImportDocuments operation.
 */
export interface GoogleCloudDialogflowCxV3beta1ImportDocumentsOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowCxV3beta1GenericKnowledgeOperationMetadata;
}

/**
 * Response message for Documents.ImportDocuments.
 */
export interface GoogleCloudDialogflowCxV3beta1ImportDocumentsResponse {
  /**
   * Includes details about skipped documents or any other warnings.
   */
  warnings?: GoogleRpcStatus[];
}

/**
 * The response message for Flows.ImportFlow.
 */
export interface GoogleCloudDialogflowCxV3beta1ImportFlowResponse {
  /**
   * The unique identifier of the new flow. Format:
   * `projects//locations//agents//flows/`.
   */
  flow?: string;
}

/**
 * Metadata returned for the TestCases.ImportTestCases long running operation.
 */
export interface GoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata {
  /**
   * Errors for failed test cases.
   */
  errors?: GoogleCloudDialogflowCxV3beta1TestCaseError[];
}

function serializeGoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata(data: any): GoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (serializeGoogleCloudDialogflowCxV3beta1TestCaseError(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata(data: any): GoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3beta1TestCaseError(item))) : undefined,
  };
}

/**
 * The response message for TestCases.ImportTestCases.
 */
export interface GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse {
  /**
   * The unique identifiers of the new test cases. Format:
   * `projects//locations//agents//testCases/`.
   */
  names?: string[];
}

/**
 * Instructs the speech recognizer on how to process the audio content.
 */
export interface GoogleCloudDialogflowCxV3beta1InputAudioConfig {
  /**
   * Required. Audio encoding of the audio content to process.
   */
  audioEncoding?:  | "AUDIO_ENCODING_UNSPECIFIED" | "AUDIO_ENCODING_LINEAR_16" | "AUDIO_ENCODING_FLAC" | "AUDIO_ENCODING_MULAW" | "AUDIO_ENCODING_AMR" | "AUDIO_ENCODING_AMR_WB" | "AUDIO_ENCODING_OGG_OPUS" | "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE";
  /**
   * Optional. If `true`, Dialogflow returns SpeechWordInfo in
   * StreamingRecognitionResult with information about the recognized speech
   * words, e.g. start and end time offsets. If false or unspecified, Speech
   * doesn't return any word-level information.
   */
  enableWordInfo?: boolean;
  /**
   * Optional. Which Speech model to select for the given request. Select the
   * model best suited to your domain to get best results. If a model is not
   * explicitly specified, then we auto-select a model based on the parameters
   * in the InputAudioConfig. If enhanced speech model is enabled for the agent
   * and an enhanced version of the specified model for the language does not
   * exist, then the speech is recognized using the standard version of the
   * specified model. Refer to [Cloud Speech API
   * documentation](https://cloud.google.com/speech-to-text/docs/basics#select-model)
   * for more details.
   */
  model?: string;
  /**
   * Optional. Which variant of the Speech model to use.
   */
  modelVariant?:  | "SPEECH_MODEL_VARIANT_UNSPECIFIED" | "USE_BEST_AVAILABLE" | "USE_STANDARD" | "USE_ENHANCED";
  /**
   * Optional. A list of strings containing words and phrases that the speech
   * recognizer should recognize with higher likelihood. See [the Cloud Speech
   * documentation](https://cloud.google.com/speech-to-text/docs/basics#phrase-hints)
   * for more details.
   */
  phraseHints?: string[];
  /**
   * Sample rate (in Hertz) of the audio content sent in the query. Refer to
   * [Cloud Speech API
   * documentation](https://cloud.google.com/speech-to-text/docs/basics) for
   * more details.
   */
  sampleRateHertz?: number;
  /**
   * Optional. If `false` (default), recognition does not cease until the
   * client closes the stream. If `true`, the recognizer will detect a single
   * spoken utterance in input audio. Recognition ceases when it detects the
   * audio's voice has stopped or paused. In this case, once a detected intent
   * is received, the client should close the stream and start a new request
   * with a new stream as needed. Note: This setting is relevant only for
   * streaming methods.
   */
  singleUtterance?: boolean;
}

/**
 * An intent represents a user's intent to interact with a conversational
 * agent. You can provide information for the Dialogflow API to use to match
 * user input to an intent by adding training phrases (i.e., examples of user
 * input) to your intent.
 */
export interface GoogleCloudDialogflowCxV3beta1Intent {
  /**
   * Human readable description for better understanding an intent like its
   * scope, content, result etc. Maximum character limit: 140 characters.
   */
  description?: string;
  /**
   * Required. The human-readable name of the intent, unique within the agent.
   */
  displayName?: string;
  /**
   * Indicates whether this is a fallback intent. Currently only default
   * fallback intent is allowed in the agent, which is added upon agent
   * creation. Adding training phrases to fallback intent is useful in the case
   * of requests that are mistakenly matched, since training phrases assigned to
   * fallback intents act as negative examples that triggers no-match event.
   */
  isFallback?: boolean;
  /**
   * The key/value metadata to label an intent. Labels can contain lowercase
   * letters, digits and the symbols '-' and '_'. International characters are
   * allowed, including letters from unicase alphabets. Keys must start with a
   * letter. Keys and values can be no longer than 63 characters and no more
   * than 128 bytes. Prefix "sys-" is reserved for Dialogflow defined labels.
   * Currently allowed Dialogflow defined labels include: * sys-head *
   * sys-contextual The above labels do not require value. "sys-head" means the
   * intent is a head intent. "sys-contextual" means the intent is a contextual
   * intent.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The unique identifier of the intent. Required for the Intents.UpdateIntent
   * method. Intents.CreateIntent populates the name automatically. Format:
   * `projects//locations//agents//intents/`.
   */
  name?: string;
  /**
   * The collection of parameters associated with the intent.
   */
  parameters?: GoogleCloudDialogflowCxV3beta1IntentParameter[];
  /**
   * The priority of this intent. Higher numbers represent higher priorities. -
   * If the supplied value is unspecified or 0, the service translates the value
   * to 500,000, which corresponds to the `Normal` priority in the console. - If
   * the supplied value is negative, the intent is ignored in runtime detect
   * intent requests.
   */
  priority?: number;
  /**
   * The collection of training phrases the agent is trained on to identify the
   * intent.
   */
  trainingPhrases?: GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase[];
}

/**
 * Represents the intent to trigger programmatically rather than as a result of
 * natural language processing.
 */
export interface GoogleCloudDialogflowCxV3beta1IntentInput {
  /**
   * Required. The unique identifier of the intent. Format:
   * `projects//locations//agents//intents/`.
   */
  intent?: string;
}

/**
 * Represents an intent parameter.
 */
export interface GoogleCloudDialogflowCxV3beta1IntentParameter {
  /**
   * Required. The entity type of the parameter. Format:
   * `projects/-/locations/-/agents/-/entityTypes/` for system entity types (for
   * example, `projects/-/locations/-/agents/-/entityTypes/sys.date`), or
   * `projects//locations//agents//entityTypes/` for developer entity types.
   */
  entityType?: string;
  /**
   * Required. The unique identifier of the parameter. This field is used by
   * training phrases to annotate their parts.
   */
  id?: string;
  /**
   * Indicates whether the parameter represents a list of values.
   */
  isList?: boolean;
  /**
   * Indicates whether the parameter content should be redacted in log. If
   * redaction is enabled, the parameter content will be replaced by parameter
   * name during logging. Note: the parameter content is subject to redaction if
   * either parameter level redaction or entity type level redaction is enabled.
   */
  redact?: boolean;
}

/**
 * Represents an example that the agent is trained on to identify the intent.
 */
export interface GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase {
  /**
   * Output only. The unique identifier of the training phrase.
   */
  id?: string;
  /**
   * Required. The ordered list of training phrase parts. The parts are
   * concatenated in order to form the training phrase. Note: The API does not
   * automatically annotate training phrases like the Dialogflow Console does.
   * Note: Do not forget to include whitespace at part boundaries, so the
   * training phrase is well formatted when the parts are concatenated. If the
   * training phrase does not need to be annotated with parameters, you just
   * need a single part with only the Part.text field set. If you want to
   * annotate the training phrase, you must create multiple parts, where the
   * fields of each part are populated in one of two ways: - `Part.text` is set
   * to a part of the phrase that has no parameters. - `Part.text` is set to a
   * part of the phrase that you want to annotate, and the `parameter_id` field
   * is set.
   */
  parts?: GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart[];
  /**
   * Indicates how many times this example was added to the intent.
   */
  repeatCount?: number;
}

/**
 * Represents a part of a training phrase.
 */
export interface GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart {
  /**
   * The parameter used to annotate this part of the training phrase. This
   * field is required for annotated parts of the training phrase.
   */
  parameterId?: string;
  /**
   * Required. The text for this part.
   */
  text?: string;
}

/**
 * A Dialogflow CX conversation (session) can be described and visualized as a
 * state machine. The states of a CX session are represented by pages. For each
 * flow, you define many pages, where your combined pages can handle a complete
 * conversation on the topics the flow is designed for. At any given moment,
 * exactly one page is the current page, the current page is considered active,
 * and the flow associated with that page is considered active. Every flow has a
 * special start page. When a flow initially becomes active, the start page page
 * becomes the current page. For each conversational turn, the current page will
 * either stay the same or transition to another page. You configure each page
 * to collect information from the end-user that is relevant for the
 * conversational state represented by the page. For more information, see the
 * [Page guide](https://cloud.google.com/dialogflow/cx/docs/concept/page).
 */
export interface GoogleCloudDialogflowCxV3beta1Page {
  /**
   * Required. The human-readable name of the page, unique within the flow.
   */
  displayName?: string;
  /**
   * The fulfillment to call when the session is entering the page.
   */
  entryFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  /**
   * Handlers associated with the page to handle events such as webhook errors,
   * no match or no input.
   */
  eventHandlers?: GoogleCloudDialogflowCxV3beta1EventHandler[];
  /**
   * The form associated with the page, used for collecting parameters relevant
   * to the page.
   */
  form?: GoogleCloudDialogflowCxV3beta1Form;
  /**
   * The unique identifier of the page. Required for the Pages.UpdatePage
   * method. Pages.CreatePage populates the name automatically. Format:
   * `projects//locations//agents//flows//pages/`.
   */
  name?: string;
  /**
   * Ordered list of `TransitionRouteGroups` associated with the page.
   * Transition route groups must be unique within a page. * If multiple
   * transition routes within a page scope refer to the same intent, then the
   * precedence order is: page's transition route -> page's transition route
   * group -> flow's transition routes. * If multiple transition route groups
   * within a page contain the same intent, then the first group in the ordered
   * list takes precedence.
   * Format:`projects//locations//agents//flows//transitionRouteGroups/`.
   */
  transitionRouteGroups?: string[];
  /**
   * A list of transitions for the transition rules of this page. They route
   * the conversation to another page in the same flow, or another flow. When we
   * are in a certain page, the TransitionRoutes are evalauted in the following
   * order: * TransitionRoutes defined in the page with intent specified. *
   * TransitionRoutes defined in the transition route groups with intent
   * specified. * TransitionRoutes defined in flow with intent specified. *
   * TransitionRoutes defined in the transition route groups with intent
   * specified. * TransitionRoutes defined in the page with only condition
   * specified. * TransitionRoutes defined in the transition route groups with
   * only condition specified.
   */
  transitionRoutes?: GoogleCloudDialogflowCxV3beta1TransitionRoute[];
}

/**
 * Represents page information communicated to and from the webhook.
 */
export interface GoogleCloudDialogflowCxV3beta1PageInfo {
  /**
   * Always present for WebhookRequest. Ignored for WebhookResponse. The unique
   * identifier of the current page. Format:
   * `projects//locations//agents//flows//pages/`.
   */
  currentPage?: string;
  /**
   * Always present for WebhookRequest. Ignored for WebhookResponse. The
   * display name of the current page.
   */
  displayName?: string;
  /**
   * Optional for both WebhookRequest and WebhookResponse. Information about
   * the form.
   */
  formInfo?: GoogleCloudDialogflowCxV3beta1PageInfoFormInfo;
}

/**
 * Represents form information.
 */
export interface GoogleCloudDialogflowCxV3beta1PageInfoFormInfo {
  /**
   * Optional for both WebhookRequest and WebhookResponse. The parameters
   * contained in the form. Note that the webhook cannot add or remove any form
   * parameter.
   */
  parameterInfo?: GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo[];
}

/**
 * Represents parameter information.
 */
export interface GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo {
  /**
   * Always present for WebhookRequest. Required for WebhookResponse. The
   * human-readable name of the parameter, unique within the form. This field
   * cannot be modified by the webhook.
   */
  displayName?: string;
  /**
   * Optional for WebhookRequest. Ignored for WebhookResponse. Indicates if the
   * parameter value was just collected on the last conversation turn.
   */
  justCollected?: boolean;
  /**
   * Optional for both WebhookRequest and WebhookResponse. Indicates whether
   * the parameter is required. Optional parameters will not trigger prompts;
   * however, they are filled if the user specifies them. Required parameters
   * must be filled before form filling concludes.
   */
  required?: boolean;
  /**
   * Always present for WebhookRequest. Required for WebhookResponse. The state
   * of the parameter. This field can be set to INVALID by the webhook to
   * invalidate the parameter; other values set by the webhook will be ignored.
   */
  state?:  | "PARAMETER_STATE_UNSPECIFIED" | "EMPTY" | "INVALID" | "FILLED";
  /**
   * Optional for both WebhookRequest and WebhookResponse. The value of the
   * parameter. This field can be set by the webhook to change the parameter
   * value.
   */
  value?: any;
}

/**
 * Represents the query input. It can contain one of: 1. A conversational query
 * in the form of text. 2. An intent query that specifies which intent to
 * trigger. 3. Natural language speech audio to be processed. 4. An event to be
 * triggered.
 */
export interface GoogleCloudDialogflowCxV3beta1QueryInput {
  /**
   * The natural language speech audio to be processed.
   */
  audio?: GoogleCloudDialogflowCxV3beta1AudioInput;
  /**
   * The DTMF event to be handled.
   */
  dtmf?: GoogleCloudDialogflowCxV3beta1DtmfInput;
  /**
   * The event to be triggered.
   */
  event?: GoogleCloudDialogflowCxV3beta1EventInput;
  /**
   * The intent to be triggered.
   */
  intent?: GoogleCloudDialogflowCxV3beta1IntentInput;
  /**
   * Required. The language of the input. See [Language
   * Support](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * for a list of the currently supported language codes. Note that queries in
   * the same session do not necessarily need to specify the same language.
   */
  languageCode?: string;
  /**
   * The natural language text to be processed.
   */
  text?: GoogleCloudDialogflowCxV3beta1TextInput;
}

function serializeGoogleCloudDialogflowCxV3beta1QueryInput(data: any): GoogleCloudDialogflowCxV3beta1QueryInput {
  return {
    ...data,
    audio: data["audio"] !== undefined ? serializeGoogleCloudDialogflowCxV3beta1AudioInput(data["audio"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1QueryInput(data: any): GoogleCloudDialogflowCxV3beta1QueryInput {
  return {
    ...data,
    audio: data["audio"] !== undefined ? deserializeGoogleCloudDialogflowCxV3beta1AudioInput(data["audio"]) : undefined,
  };
}

/**
 * Metadata for ReloadDocument operation.
 */
export interface GoogleCloudDialogflowCxV3beta1ReloadDocumentOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowCxV3beta1GenericKnowledgeOperationMetadata;
}

/**
 * Represents a response message that can be returned by a conversational
 * agent. Response messages are also used for output audio synthesis. The
 * approach is as follows: * If at least one OutputAudioText response is
 * present, then all OutputAudioText responses are linearly concatenated, and
 * the result is used for output audio synthesis. * If the OutputAudioText
 * responses are a mixture of text and SSML, then the concatenated result is
 * treated as SSML; otherwise, the result is treated as either text or SSML as
 * appropriate. The agent designer should ideally use either text or SSML
 * consistently throughout the bot design. * Otherwise, all Text responses are
 * linearly concatenated, and the result is used for output audio synthesis.
 * This approach allows for more sophisticated user experience scenarios, where
 * the text displayed to the user may differ from what is heard.
 */
export interface GoogleCloudDialogflowCxV3beta1ResponseMessage {
  /**
   * The channel which the response is associated with. Clients can specify the
   * channel via QueryParameters.channel, and only associated channel response
   * will be returned.
   */
  channel?: string;
  /**
   * Indicates that the conversation succeeded.
   */
  conversationSuccess?: GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess;
  /**
   * Output only. A signal that indicates the interaction with the Dialogflow
   * agent has ended. This message is generated by Dialogflow only when the
   * conversation reaches `END_SESSION` page. It is not supposed to be defined
   * by the user. It's guaranteed that there is at most one such message in each
   * response.
   */
  readonly endInteraction?: GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction;
  /**
   * Hands off conversation to a human agent.
   */
  liveAgentHandoff?: GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff;
  /**
   * Output only. An audio response message composed of both the synthesized
   * Dialogflow agent responses and responses defined via play_audio. This
   * message is generated by Dialogflow only and not supposed to be defined by
   * the user.
   */
  readonly mixedAudio?: GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio;
  /**
   * A text or ssml response that is preferentially used for TTS output audio
   * synthesis, as described in the comment on the ResponseMessage message.
   */
  outputAudioText?: GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText;
  /**
   * Returns a response containing a custom, platform-specific payload.
   */
  payload?: {
    [key: string]: any
  };
  /**
   * Signal that the client should play an audio clip hosted at a
   * client-specific URI. Dialogflow uses this to construct mixed_audio.
   * However, Dialogflow itself does not try to read or process the URI in any
   * way.
   */
  playAudio?: GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio;
  /**
   * A signal that the client should transfer the phone call connected to this
   * agent to a third-party endpoint.
   */
  telephonyTransferCall?: GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall;
  /**
   * Returns a text response.
   */
  text?: GoogleCloudDialogflowCxV3beta1ResponseMessageText;
}

/**
 * Indicates that the conversation succeeded, i.e., the bot handled the issue
 * that the customer talked to it about. Dialogflow only uses this to determine
 * which conversations should be counted as successful and doesn't process the
 * metadata in this message in any way. Note that Dialogflow also considers
 * conversations that get to the conversation end page as successful even if
 * they don't return ConversationSuccess. You may set this, for example: * In
 * the entry_fulfillment of a Page if entering the page indicates that the
 * conversation succeeded. * In a webhook response when you determine that you
 * handled the customer issue.
 */
export interface GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess {
  /**
   * Custom metadata. Dialogflow doesn't impose any structure on this.
   */
  metadata?: {
    [key: string]: any
  };
}

/**
 * Indicates that interaction with the Dialogflow agent has ended. This message
 * is generated by Dialogflow only and not supposed to be defined by the user.
 */
export interface GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction {
}

/**
 * Indicates that the conversation should be handed off to a live agent.
 * Dialogflow only uses this to determine which conversations were handed off to
 * a human agent for measurement purposes. What else to do with this signal is
 * up to you and your handoff procedures. You may set this, for example: * In
 * the entry_fulfillment of a Page if entering the page indicates something went
 * extremely wrong in the conversation. * In a webhook response when you
 * determine that the customer issue can only be handled by a human.
 */
export interface GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff {
  /**
   * Custom metadata for your handoff procedure. Dialogflow doesn't impose any
   * structure on this.
   */
  metadata?: {
    [key: string]: any
  };
}

/**
 * Represents an audio message that is composed of both segments synthesized
 * from the Dialogflow agent prompts and ones hosted externally at the specified
 * URIs. The external URIs are specified via play_audio. This message is
 * generated by Dialogflow only and not supposed to be defined by the user.
 */
export interface GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio {
  /**
   * Segments this audio response is composed of.
   */
  segments?: GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment[];
}

function serializeGoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio(data: any): GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio(data: any): GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment(item))) : undefined,
  };
}

/**
 * Represents one segment of audio.
 */
export interface GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment {
  /**
   * Output only. Whether the playback of this segment can be interrupted by
   * the end user's speech and the client should then start the next Dialogflow
   * request.
   */
  readonly allowPlaybackInterruption?: boolean;
  /**
   * Raw audio synthesized from the Dialogflow agent's response using the
   * output config specified in the request.
   */
  audio?: Uint8Array;
  /**
   * Client-specific URI that points to an audio clip accessible to the client.
   * Dialogflow does not impose any validation on it.
   */
  uri?: string;
}

function serializeGoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment(data: any): GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment {
  return {
    ...data,
    audio: data["audio"] !== undefined ? encodeBase64(data["audio"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment(data: any): GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment {
  return {
    ...data,
    audio: data["audio"] !== undefined ? decodeBase64(data["audio"] as string) : undefined,
  };
}

/**
 * A text or ssml response that is preferentially used for TTS output audio
 * synthesis, as described in the comment on the ResponseMessage message.
 */
export interface GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText {
  /**
   * Output only. Whether the playback of this message can be interrupted by
   * the end user's speech and the client can then starts the next Dialogflow
   * request.
   */
  readonly allowPlaybackInterruption?: boolean;
  /**
   * The SSML text to be synthesized. For more information, see
   * [SSML](/speech/text-to-speech/docs/ssml).
   */
  ssml?: string;
  /**
   * The raw text to be synthesized.
   */
  text?: string;
}

/**
 * Specifies an audio clip to be played by the client as part of the response.
 */
export interface GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio {
  /**
   * Output only. Whether the playback of this message can be interrupted by
   * the end user's speech and the client can then starts the next Dialogflow
   * request.
   */
  readonly allowPlaybackInterruption?: boolean;
  /**
   * Required. URI of the audio clip. Dialogflow does not impose any validation
   * on this value. It is specific to the client that reads it.
   */
  audioUri?: string;
}

/**
 * Represents the signal that telles the client to transfer the phone call
 * connected to the agent to a third-party endpoint.
 */
export interface GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall {
  /**
   * Transfer the call to a phone number in [E.164
   * format](https://en.wikipedia.org/wiki/E.164).
   */
  phoneNumber?: string;
}

/**
 * The text response message.
 */
export interface GoogleCloudDialogflowCxV3beta1ResponseMessageText {
  /**
   * Output only. Whether the playback of this message can be interrupted by
   * the end user's speech and the client can then starts the next Dialogflow
   * request.
   */
  readonly allowPlaybackInterruption?: boolean;
  /**
   * Required. A collection of text responses.
   */
  text?: string[];
}

/**
 * Metadata returned for the Environments.RunContinuousTest long running
 * operation.
 */
export interface GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata {
  /**
   * The test errors.
   */
  errors?: GoogleCloudDialogflowCxV3beta1TestError[];
}

function serializeGoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata(data: any): GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (serializeGoogleCloudDialogflowCxV3beta1TestError(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata(data: any): GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3beta1TestError(item))) : undefined,
  };
}

/**
 * The response message for Environments.RunContinuousTest.
 */
export interface GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse {
  /**
   * The result for a continuous test run.
   */
  continuousTestResult?: GoogleCloudDialogflowCxV3beta1ContinuousTestResult;
}

function serializeGoogleCloudDialogflowCxV3beta1RunContinuousTestResponse(data: any): GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse {
  return {
    ...data,
    continuousTestResult: data["continuousTestResult"] !== undefined ? serializeGoogleCloudDialogflowCxV3beta1ContinuousTestResult(data["continuousTestResult"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1RunContinuousTestResponse(data: any): GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse {
  return {
    ...data,
    continuousTestResult: data["continuousTestResult"] !== undefined ? deserializeGoogleCloudDialogflowCxV3beta1ContinuousTestResult(data["continuousTestResult"]) : undefined,
  };
}

/**
 * Metadata returned for the TestCases.RunTestCase long running operation. This
 * message currently has no fields.
 */
export interface GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata {
}

/**
 * The response message for TestCases.RunTestCase.
 */
export interface GoogleCloudDialogflowCxV3beta1RunTestCaseResponse {
  /**
   * The result.
   */
  result?: GoogleCloudDialogflowCxV3beta1TestCaseResult;
}

function serializeGoogleCloudDialogflowCxV3beta1RunTestCaseResponse(data: any): GoogleCloudDialogflowCxV3beta1RunTestCaseResponse {
  return {
    ...data,
    result: data["result"] !== undefined ? serializeGoogleCloudDialogflowCxV3beta1TestCaseResult(data["result"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1RunTestCaseResponse(data: any): GoogleCloudDialogflowCxV3beta1RunTestCaseResponse {
  return {
    ...data,
    result: data["result"] !== undefined ? deserializeGoogleCloudDialogflowCxV3beta1TestCaseResult(data["result"]) : undefined,
  };
}

/**
 * Represents session information communicated to and from the webhook.
 */
export interface GoogleCloudDialogflowCxV3beta1SessionInfo {
  /**
   * Optional for WebhookRequest. Optional for WebhookResponse. All parameters
   * collected from forms and intents during the session. Parameters can be
   * created, updated, or removed by the webhook. To remove a parameter from the
   * session, the webhook should explicitly set the parameter value to null in
   * WebhookResponse. The map is keyed by parameters' display names.
   */
  parameters?: {
    [key: string]: any
  };
  /**
   * Always present for WebhookRequest. Ignored for WebhookResponse. The unique
   * identifier of the session. This field can be used by the webhook to
   * identify a session. Format: `projects//locations//agents//sessions/` or
   * `projects//locations//agents//environments//sessions/` if environment is
   * specified.
   */
  session?: string;
}

/**
 * Represents a test case.
 */
export interface GoogleCloudDialogflowCxV3beta1TestCase {
  /**
   * Output only. When the test was created.
   */
  readonly creationTime?: Date;
  /**
   * Required. The human-readable name of the test case, unique within the
   * agent. Limit of 200 characters.
   */
  displayName?: string;
  /**
   * The latest test result.
   */
  lastTestResult?: GoogleCloudDialogflowCxV3beta1TestCaseResult;
  /**
   * The unique identifier of the test case. TestCases.CreateTestCase will
   * populate the name automatically. Otherwise use format:
   * `projects//locations//agents/ /testCases/`.
   */
  name?: string;
  /**
   * Additional freeform notes about the test case. Limit of 400 characters.
   */
  notes?: string;
  /**
   * Tags are short descriptions that users may apply to test cases for
   * organizational and filtering purposes. Each tag should start with "#" and
   * has a limit of 30 characters.
   */
  tags?: string[];
  /**
   * The conversation turns uttered when the test case was created, in
   * chronological order. These include the canonical set of agent utterances
   * that should occur when the agent is working properly.
   */
  testCaseConversationTurns?: GoogleCloudDialogflowCxV3beta1ConversationTurn[];
  /**
   * Config for the test case.
   */
  testConfig?: GoogleCloudDialogflowCxV3beta1TestConfig;
}

function serializeGoogleCloudDialogflowCxV3beta1TestCase(data: any): GoogleCloudDialogflowCxV3beta1TestCase {
  return {
    ...data,
    lastTestResult: data["lastTestResult"] !== undefined ? serializeGoogleCloudDialogflowCxV3beta1TestCaseResult(data["lastTestResult"]) : undefined,
    testCaseConversationTurns: data["testCaseConversationTurns"] !== undefined ? data["testCaseConversationTurns"].map((item: any) => (serializeGoogleCloudDialogflowCxV3beta1ConversationTurn(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1TestCase(data: any): GoogleCloudDialogflowCxV3beta1TestCase {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
    lastTestResult: data["lastTestResult"] !== undefined ? deserializeGoogleCloudDialogflowCxV3beta1TestCaseResult(data["lastTestResult"]) : undefined,
    testCaseConversationTurns: data["testCaseConversationTurns"] !== undefined ? data["testCaseConversationTurns"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3beta1ConversationTurn(item))) : undefined,
  };
}

/**
 * Error info for importing a test.
 */
export interface GoogleCloudDialogflowCxV3beta1TestCaseError {
  /**
   * The status associated with the test case.
   */
  status?: GoogleRpcStatus;
  /**
   * The test case.
   */
  testCase?: GoogleCloudDialogflowCxV3beta1TestCase;
}

function serializeGoogleCloudDialogflowCxV3beta1TestCaseError(data: any): GoogleCloudDialogflowCxV3beta1TestCaseError {
  return {
    ...data,
    testCase: data["testCase"] !== undefined ? serializeGoogleCloudDialogflowCxV3beta1TestCase(data["testCase"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1TestCaseError(data: any): GoogleCloudDialogflowCxV3beta1TestCaseError {
  return {
    ...data,
    testCase: data["testCase"] !== undefined ? deserializeGoogleCloudDialogflowCxV3beta1TestCase(data["testCase"]) : undefined,
  };
}

/**
 * Represents a result from running a test case in an agent environment.
 */
export interface GoogleCloudDialogflowCxV3beta1TestCaseResult {
  /**
   * The conversation turns uttered during the test case replay in
   * chronological order.
   */
  conversationTurns?: GoogleCloudDialogflowCxV3beta1ConversationTurn[];
  /**
   * Environment where the test was run. If not set, it indicates the draft
   * environment.
   */
  environment?: string;
  /**
   * The resource name for the test case result. Format:
   * `projects//locations//agents//testCases/ /results/`.
   */
  name?: string;
  /**
   * Whether the test case passed in the agent environment.
   */
  testResult?:  | "TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED";
  /**
   * The time that the test was run.
   */
  testTime?: Date;
}

function serializeGoogleCloudDialogflowCxV3beta1TestCaseResult(data: any): GoogleCloudDialogflowCxV3beta1TestCaseResult {
  return {
    ...data,
    conversationTurns: data["conversationTurns"] !== undefined ? data["conversationTurns"].map((item: any) => (serializeGoogleCloudDialogflowCxV3beta1ConversationTurn(item))) : undefined,
    testTime: data["testTime"] !== undefined ? data["testTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1TestCaseResult(data: any): GoogleCloudDialogflowCxV3beta1TestCaseResult {
  return {
    ...data,
    conversationTurns: data["conversationTurns"] !== undefined ? data["conversationTurns"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3beta1ConversationTurn(item))) : undefined,
    testTime: data["testTime"] !== undefined ? new Date(data["testTime"]) : undefined,
  };
}

/**
 * Represents configurations for a test case.
 */
export interface GoogleCloudDialogflowCxV3beta1TestConfig {
  /**
   * Flow name to start the test case with. Format:
   * `projects//locations//agents//flows/`. Only one of `flow` and `page` should
   * be set to indicate the starting point of the test case. If both are set,
   * `page` takes precedence over `flow`. If neither is set, the test case will
   * start with start page on the default start flow.
   */
  flow?: string;
  /**
   * The page to start the test case with. Format:
   * `projects//locations//agents//flows//pages/`. Only one of `flow` and `page`
   * should be set to indicate the starting point of the test case. If both are
   * set, `page` takes precedence over `flow`. If neither is set, the test case
   * will start with start page on the default start flow.
   */
  page?: string;
  /**
   * Session parameters to be compared when calculating differences.
   */
  trackingParameters?: string[];
}

/**
 * Error info for running a test.
 */
export interface GoogleCloudDialogflowCxV3beta1TestError {
  /**
   * The status associated with the test.
   */
  status?: GoogleRpcStatus;
  /**
   * The test case resource name.
   */
  testCase?: string;
  /**
   * The timestamp when the test was completed.
   */
  testTime?: Date;
}

function serializeGoogleCloudDialogflowCxV3beta1TestError(data: any): GoogleCloudDialogflowCxV3beta1TestError {
  return {
    ...data,
    testTime: data["testTime"] !== undefined ? data["testTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1TestError(data: any): GoogleCloudDialogflowCxV3beta1TestError {
  return {
    ...data,
    testTime: data["testTime"] !== undefined ? new Date(data["testTime"]) : undefined,
  };
}

/**
 * The description of differences between original and replayed agent output.
 */
export interface GoogleCloudDialogflowCxV3beta1TestRunDifference {
  /**
   * A description of the diff, showing the actual output vs expected output.
   */
  description?: string;
  /**
   * The type of diff.
   */
  type?:  | "DIFF_TYPE_UNSPECIFIED" | "INTENT" | "PAGE" | "PARAMETERS" | "UTTERANCE";
}

/**
 * Represents the natural language text to be processed.
 */
export interface GoogleCloudDialogflowCxV3beta1TextInput {
  /**
   * Required. The UTF-8 encoded natural language text to be processed. Text
   * length must not exceed 256 characters.
   */
  text?: string;
}

/**
 * A transition route specifies a intent that can be matched and/or a data
 * condition that can be evaluated during a session. When a specified transition
 * is matched, the following actions are taken in order: * If there is a
 * `trigger_fulfillment` associated with the transition, it will be called. * If
 * there is a `target_page` associated with the transition, the session will
 * transition into the specified page. * If there is a `target_flow` associated
 * with the transition, the session will transition into the specified flow.
 */
export interface GoogleCloudDialogflowCxV3beta1TransitionRoute {
  /**
   * The condition to evaluate against form parameters or session parameters.
   * See the [conditions
   * reference](https://cloud.google.com/dialogflow/cx/docs/reference/condition).
   * At least one of `intent` or `condition` must be specified. When both
   * `intent` and `condition` are specified, the transition can only happen when
   * both are fulfilled.
   */
  condition?: string;
  /**
   * The unique identifier of an Intent. Format:
   * `projects//locations//agents//intents/`. Indicates that the transition can
   * only happen when the given intent is matched. At least one of `intent` or
   * `condition` must be specified. When both `intent` and `condition` are
   * specified, the transition can only happen when both are fulfilled.
   */
  intent?: string;
  /**
   * Output only. The unique identifier of this transition route.
   */
  readonly name?: string;
  /**
   * The target flow to transition to. Format:
   * `projects//locations//agents//flows/`.
   */
  targetFlow?: string;
  /**
   * The target page to transition to. Format:
   * `projects//locations//agents//flows//pages/`.
   */
  targetPage?: string;
  /**
   * The fulfillment to call when the condition is satisfied. At least one of
   * `trigger_fulfillment` and `target` must be specified. When both are
   * defined, `trigger_fulfillment` is executed first.
   */
  triggerFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
}

/**
 * Collection of all signals that were extracted for a single turn of the
 * conversation.
 */
export interface GoogleCloudDialogflowCxV3beta1TurnSignals {
  /**
   * Whether agent responded with LiveAgentHandoff fulfillment.
   */
  agentEscalated?: boolean;
  /**
   * Whether user was using DTMF input.
   */
  dtmfUsed?: boolean;
  /**
   * Failure reasons of the turn.
   */
  failureReasons?:  | "FAILURE_REASON_UNSPECIFIED" | "FAILED_INTENT" | "FAILED_WEBHOOK"[];
  /**
   * Whether NLU predicted NO_MATCH.
   */
  noMatch?: boolean;
  /**
   * Whether user provided no input.
   */
  noUserInput?: boolean;
  /**
   * Whether turn resulted in End Session page.
   */
  reachedEndPage?: boolean;
  /**
   * Whether user was specifically asking for a live agent.
   */
  userEscalated?: boolean;
  /**
   * Human-readable statuses of the webhooks triggered during this turn.
   */
  webhookStatuses?: string[];
}

/**
 * Metadata for UpdateDocument operation.
 */
export interface GoogleCloudDialogflowCxV3beta1UpdateDocumentOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowCxV3beta1GenericKnowledgeOperationMetadata;
}

/**
 * Webhooks host the developer's business logic. During a session, webhooks
 * allow the developer to use the data extracted by Dialogflow's natural
 * language processing to generate dynamic responses, validate collected data,
 * or trigger actions on the backend.
 */
export interface GoogleCloudDialogflowCxV3beta1Webhook {
  /**
   * Indicates whether the webhook is disabled.
   */
  disabled?: boolean;
  /**
   * Required. The human-readable name of the webhook, unique within the agent.
   */
  displayName?: string;
  /**
   * Configuration for a generic web service.
   */
  genericWebService?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebService;
  /**
   * The unique identifier of the webhook. Required for the
   * Webhooks.UpdateWebhook method. Webhooks.CreateWebhook populates the name
   * automatically. Format: `projects//locations//agents//webhooks/`.
   */
  name?: string;
  /**
   * Configuration for a [Service
   * Directory](https://cloud.google.com/service-directory) service.
   */
  serviceDirectory?: GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig;
  /**
   * Webhook execution timeout. Execution is considered failed if Dialogflow
   * doesn't receive a response from webhook at the end of the timeout period.
   * Defaults to 5 seconds, maximum allowed timeout is 30 seconds.
   */
  timeout?: number /* Duration */;
}

function serializeGoogleCloudDialogflowCxV3beta1Webhook(data: any): GoogleCloudDialogflowCxV3beta1Webhook {
  return {
    ...data,
    genericWebService: data["genericWebService"] !== undefined ? serializeGoogleCloudDialogflowCxV3beta1WebhookGenericWebService(data["genericWebService"]) : undefined,
    serviceDirectory: data["serviceDirectory"] !== undefined ? serializeGoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig(data["serviceDirectory"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1Webhook(data: any): GoogleCloudDialogflowCxV3beta1Webhook {
  return {
    ...data,
    genericWebService: data["genericWebService"] !== undefined ? deserializeGoogleCloudDialogflowCxV3beta1WebhookGenericWebService(data["genericWebService"]) : undefined,
    serviceDirectory: data["serviceDirectory"] !== undefined ? deserializeGoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig(data["serviceDirectory"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * Represents configuration for a generic web service.
 */
export interface GoogleCloudDialogflowCxV3beta1WebhookGenericWebService {
  /**
   * Optional. Specifies a list of allowed custom CA certificates (in DER
   * format) for HTTPS verification. This overrides the default SSL trust store.
   * If this is empty or unspecified, Dialogflow will use Google's default trust
   * store to verify certificates. N.B. Make sure the HTTPS server certificates
   * are signed with "subject alt name". For instance a certificate can be
   * self-signed using the following command, ``` openssl x509 -req -days 200
   * -in example.com.csr \ -signkey example.com.key \ -out example.com.crt \
   * -extfile <(printf "\nsubjectAltName='DNS:www.example.com'") ```
   */
  allowedCaCerts?: Uint8Array[];
  /**
   * The password for HTTP Basic authentication.
   */
  password?: string;
  /**
   * The HTTP request headers to send together with webhook requests.
   */
  requestHeaders?: {
    [key: string]: string
  };
  /**
   * Required. The webhook URI for receiving POST requests. It must use https
   * protocol.
   */
  uri?: string;
  /**
   * The user name for HTTP Basic authentication.
   */
  username?: string;
}

function serializeGoogleCloudDialogflowCxV3beta1WebhookGenericWebService(data: any): GoogleCloudDialogflowCxV3beta1WebhookGenericWebService {
  return {
    ...data,
    allowedCaCerts: data["allowedCaCerts"] !== undefined ? data["allowedCaCerts"].map((item: any) => (encodeBase64(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1WebhookGenericWebService(data: any): GoogleCloudDialogflowCxV3beta1WebhookGenericWebService {
  return {
    ...data,
    allowedCaCerts: data["allowedCaCerts"] !== undefined ? data["allowedCaCerts"].map((item: any) => (decodeBase64(item as string))) : undefined,
  };
}

/**
 * The request message for a webhook call. The request is sent as a JSON object
 * and the field names will be presented in camel cases. You may see
 * undocumented fields in an actual request. These fields are used internally by
 * Dialogflow and should be ignored.
 */
export interface GoogleCloudDialogflowCxV3beta1WebhookRequest {
  /**
   * Always present. The unique identifier of the DetectIntentResponse that
   * will be returned to the API caller.
   */
  detectIntentResponseId?: string;
  /**
   * Always present. Information about the fulfillment that triggered this
   * webhook call.
   */
  fulfillmentInfo?: GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo;
  /**
   * Information about the last matched intent.
   */
  intentInfo?: GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo;
  /**
   * The language code specified in the original request.
   */
  languageCode?: string;
  /**
   * The list of rich message responses to present to the user. Webhook can
   * choose to append or replace this list in
   * WebhookResponse.fulfillment_response;
   */
  messages?: GoogleCloudDialogflowCxV3beta1ResponseMessage[];
  /**
   * Information about page status.
   */
  pageInfo?: GoogleCloudDialogflowCxV3beta1PageInfo;
  /**
   * Custom data set in QueryParameters.payload.
   */
  payload?: {
    [key: string]: any
  };
  /**
   * The sentiment analysis result of the current user request. The field is
   * filled when sentiment analysis is configured to be enabled for the request.
   */
  sentimentAnalysisResult?: GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult;
  /**
   * Information about session status.
   */
  sessionInfo?: GoogleCloudDialogflowCxV3beta1SessionInfo;
  /**
   * If natural language text was provided as input, this field will contain a
   * copy of the text.
   */
  text?: string;
  /**
   * If natural language speech audio was provided as input, this field will
   * contain the transcript for the audio.
   */
  transcript?: string;
  /**
   * If an event was provided as input, this field will contain the name of the
   * event.
   */
  triggerEvent?: string;
  /**
   * If an intent was provided as input, this field will contain a copy of the
   * intent identifier. Format: `projects//locations//agents//intents/`.
   */
  triggerIntent?: string;
}

/**
 * Represents fulfillment information communicated to the webhook.
 */
export interface GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo {
  /**
   * Always present. The value of the Fulfillment.tag field will be populated
   * in this field by Dialogflow when the associated webhook is called. The tag
   * is typically used by the webhook service to identify which fulfillment is
   * being called, but it could be used for other purposes.
   */
  tag?: string;
}

/**
 * Represents intent information communicated to the webhook.
 */
export interface GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo {
  /**
   * The confidence of the matched intent. Values range from 0.0 (completely
   * uncertain) to 1.0 (completely certain).
   */
  confidence?: number;
  /**
   * Always present. The display name of the last matched intent.
   */
  displayName?: string;
  /**
   * Always present. The unique identifier of the last matched intent. Format:
   * `projects//locations//agents//intents/`.
   */
  lastMatchedIntent?: string;
  /**
   * Parameters identified as a result of intent matching. This is a map of the
   * name of the identified parameter to the value of the parameter identified
   * from the user's utterance. All parameters defined in the matched intent
   * that are identified will be surfaced here.
   */
  parameters?: {
    [key: string]: GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue
  };
}

/**
 * Represents a value for an intent parameter.
 */
export interface GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue {
  /**
   * Always present. Original text value extracted from user utterance.
   */
  originalValue?: string;
  /**
   * Always present. Structured value for the parameter extracted from user
   * utterance.
   */
  resolvedValue?: any;
}

/**
 * Represents the result of sentiment analysis.
 */
export interface GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult {
  /**
   * A non-negative number in the [0, +inf) range, which represents the
   * absolute magnitude of sentiment, regardless of score (positive or
   * negative).
   */
  magnitude?: number;
  /**
   * Sentiment score between -1.0 (negative sentiment) and 1.0 (positive
   * sentiment).
   */
  score?: number;
}

/**
 * The response message for a webhook call.
 */
export interface GoogleCloudDialogflowCxV3beta1WebhookResponse {
  /**
   * The fulfillment response to send to the user. This field can be omitted by
   * the webhook if it does not intend to send any response to the user.
   */
  fulfillmentResponse?: GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse;
  /**
   * Information about page status. This field can be omitted by the webhook if
   * it does not intend to modify page status.
   */
  pageInfo?: GoogleCloudDialogflowCxV3beta1PageInfo;
  /**
   * Value to append directly to QueryResult.webhook_payloads.
   */
  payload?: {
    [key: string]: any
  };
  /**
   * Information about session status. This field can be omitted by the webhook
   * if it does not intend to modify session status.
   */
  sessionInfo?: GoogleCloudDialogflowCxV3beta1SessionInfo;
  /**
   * The target flow to transition to. Format:
   * `projects//locations//agents//flows/`.
   */
  targetFlow?: string;
  /**
   * The target page to transition to. Format:
   * `projects//locations//agents//flows//pages/`.
   */
  targetPage?: string;
}

/**
 * Represents a fulfillment response to the user.
 */
export interface GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse {
  /**
   * Merge behavior for `messages`.
   */
  mergeBehavior?:  | "MERGE_BEHAVIOR_UNSPECIFIED" | "APPEND" | "REPLACE";
  /**
   * The list of rich message responses to present to the user.
   */
  messages?: GoogleCloudDialogflowCxV3beta1ResponseMessage[];
}

/**
 * Represents configuration for a [Service
 * Directory](https://cloud.google.com/service-directory) service.
 */
export interface GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig {
  /**
   * Generic Service configuration of this webhook.
   */
  genericWebService?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebService;
  /**
   * Required. The name of [Service
   * Directory](https://cloud.google.com/service-directory) service. Format:
   * `projects//locations//namespaces//services/`. `Location ID` of the service
   * directory must be the same as the location of the agent.
   */
  service?: string;
}

function serializeGoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig(data: any): GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig {
  return {
    ...data,
    genericWebService: data["genericWebService"] !== undefined ? serializeGoogleCloudDialogflowCxV3beta1WebhookGenericWebService(data["genericWebService"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig(data: any): GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig {
  return {
    ...data,
    genericWebService: data["genericWebService"] !== undefined ? deserializeGoogleCloudDialogflowCxV3beta1WebhookGenericWebService(data["genericWebService"]) : undefined,
  };
}

/**
 * The response message for TestCases.CalculateCoverage.
 */
export interface GoogleCloudDialogflowCxV3CalculateCoverageResponse {
  /**
   * The agent to calculate coverage for. Format:
   * `projects//locations//agents/`.
   */
  agent?: string;
  /**
   * Intent coverage.
   */
  intentCoverage?: GoogleCloudDialogflowCxV3IntentCoverage;
  /**
   * Transition route group coverage.
   */
  routeGroupCoverage?: GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage;
  /**
   * Transition (excluding transition route groups) coverage.
   */
  transitionCoverage?: GoogleCloudDialogflowCxV3TransitionCoverage;
}

/**
 * Changelogs represents a change made to a given agent.
 */
export interface GoogleCloudDialogflowCxV3Changelog {
  /**
   * The action of the change.
   */
  action?: string;
  /**
   * The timestamp of the change.
   */
  createTime?: Date;
  /**
   * The affected resource display name of the change.
   */
  displayName?: string;
  /**
   * The unique identifier of the changelog. Format:
   * `projects//locations//agents//changelogs/`.
   */
  name?: string;
  /**
   * The affected resource name of the change.
   */
  resource?: string;
  /**
   * The affected resource type.
   */
  type?: string;
  /**
   * Email address of the authenticated user.
   */
  userEmail?: string;
}

function serializeGoogleCloudDialogflowCxV3Changelog(data: any): GoogleCloudDialogflowCxV3Changelog {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3Changelog(data: any): GoogleCloudDialogflowCxV3Changelog {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * The request message for Versions.CompareVersions.
 */
export interface GoogleCloudDialogflowCxV3CompareVersionsRequest {
  /**
   * The language to compare the flow versions for. If not specified, the
   * agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/docs/reference/language) are
   * supported. Note: languages must be enabled in the agent before they can be
   * used.
   */
  languageCode?: string;
  /**
   * Required. Name of the target flow version to compare with the base
   * version. Use version ID `0` to indicate the draft version of the specified
   * flow. Format: `projects//locations//agents//flows//versions/`.
   */
  targetVersion?: string;
}

/**
 * The response message for Versions.CompareVersions.
 */
export interface GoogleCloudDialogflowCxV3CompareVersionsResponse {
  /**
   * JSON representation of the base version content.
   */
  baseVersionContentJson?: string;
  /**
   * The timestamp when the two version compares.
   */
  compareTime?: Date;
  /**
   * JSON representation of the target version content.
   */
  targetVersionContentJson?: string;
}

function serializeGoogleCloudDialogflowCxV3CompareVersionsResponse(data: any): GoogleCloudDialogflowCxV3CompareVersionsResponse {
  return {
    ...data,
    compareTime: data["compareTime"] !== undefined ? data["compareTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3CompareVersionsResponse(data: any): GoogleCloudDialogflowCxV3CompareVersionsResponse {
  return {
    ...data,
    compareTime: data["compareTime"] !== undefined ? new Date(data["compareTime"]) : undefined,
  };
}

/**
 * Represents a result from running a test case in an agent environment.
 */
export interface GoogleCloudDialogflowCxV3ContinuousTestResult {
  /**
   * The resource name for the continuous test result. Format:
   * `projects//locations//agents//environments//continuousTestResults/`.
   */
  name?: string;
  /**
   * The result of this continuous test run, i.e. whether all the tests in this
   * continuous test run pass or not.
   */
  result?:  | "AGGREGATED_TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED";
  /**
   * Time when the continuous testing run starts.
   */
  runTime?: Date;
  /**
   * A list of individual test case results names in this continuous test run.
   */
  testCaseResults?: string[];
}

function serializeGoogleCloudDialogflowCxV3ContinuousTestResult(data: any): GoogleCloudDialogflowCxV3ContinuousTestResult {
  return {
    ...data,
    runTime: data["runTime"] !== undefined ? data["runTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ContinuousTestResult(data: any): GoogleCloudDialogflowCxV3ContinuousTestResult {
  return {
    ...data,
    runTime: data["runTime"] !== undefined ? new Date(data["runTime"]) : undefined,
  };
}

/**
 * This message is used to hold all the Conversation Signals data, which will
 * be converted to JSON and exported to BigQuery.
 */
export interface GoogleCloudDialogflowCxV3ConversationSignals {
  /**
   * Required. Turn signals for the current turn.
   */
  turnSignals?: GoogleCloudDialogflowCxV3TurnSignals;
}

/**
 * One interaction between a human and virtual agent. The human provides some
 * input and the virtual agent provides a response.
 */
export interface GoogleCloudDialogflowCxV3ConversationTurn {
  /**
   * The user input.
   */
  userInput?: GoogleCloudDialogflowCxV3ConversationTurnUserInput;
  /**
   * The virtual agent output.
   */
  virtualAgentOutput?: GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput;
}

function serializeGoogleCloudDialogflowCxV3ConversationTurn(data: any): GoogleCloudDialogflowCxV3ConversationTurn {
  return {
    ...data,
    userInput: data["userInput"] !== undefined ? serializeGoogleCloudDialogflowCxV3ConversationTurnUserInput(data["userInput"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ConversationTurn(data: any): GoogleCloudDialogflowCxV3ConversationTurn {
  return {
    ...data,
    userInput: data["userInput"] !== undefined ? deserializeGoogleCloudDialogflowCxV3ConversationTurnUserInput(data["userInput"]) : undefined,
  };
}

/**
 * The input from the human user.
 */
export interface GoogleCloudDialogflowCxV3ConversationTurnUserInput {
  /**
   * Whether sentiment analysis is enabled.
   */
  enableSentimentAnalysis?: boolean;
  /**
   * Parameters that need to be injected into the conversation during intent
   * detection.
   */
  injectedParameters?: {
    [key: string]: any
  };
  /**
   * Supports text input, event input, dtmf input in the test case.
   */
  input?: GoogleCloudDialogflowCxV3QueryInput;
  /**
   * If webhooks should be allowed to trigger in response to the user
   * utterance. Often if parameters are injected, webhooks should not be
   * enabled.
   */
  isWebhookEnabled?: boolean;
}

function serializeGoogleCloudDialogflowCxV3ConversationTurnUserInput(data: any): GoogleCloudDialogflowCxV3ConversationTurnUserInput {
  return {
    ...data,
    input: data["input"] !== undefined ? serializeGoogleCloudDialogflowCxV3QueryInput(data["input"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ConversationTurnUserInput(data: any): GoogleCloudDialogflowCxV3ConversationTurnUserInput {
  return {
    ...data,
    input: data["input"] !== undefined ? deserializeGoogleCloudDialogflowCxV3QueryInput(data["input"]) : undefined,
  };
}

/**
 * The output from the virtual agent.
 */
export interface GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput {
  /**
   * The Page on which the utterance was spoken. Only name and displayName will
   * be set.
   */
  currentPage?: GoogleCloudDialogflowCxV3Page;
  /**
   * Required. Input only. The diagnostic info output for the turn. Required to
   * calculate the testing coverage.
   */
  diagnosticInfo?: {
    [key: string]: any
  };
  /**
   * Output only. If this is part of a result conversation turn, the list of
   * differences between the original run and the replay for this output, if
   * any.
   */
  readonly differences?: GoogleCloudDialogflowCxV3TestRunDifference[];
  /**
   * The session parameters available to the bot at this point.
   */
  sessionParameters?: {
    [key: string]: any
  };
  /**
   * Response error from the agent in the test result. If set, other output is
   * empty.
   */
  status?: GoogleRpcStatus;
  /**
   * The text responses from the agent for the turn.
   */
  textResponses?: GoogleCloudDialogflowCxV3ResponseMessageText[];
  /**
   * The Intent that triggered the response. Only name and displayName will be
   * set.
   */
  triggeredIntent?: GoogleCloudDialogflowCxV3Intent;
}

/**
 * Metadata for CreateDocument operation.
 */
export interface GoogleCloudDialogflowCxV3CreateDocumentOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowCxV3GenericKnowledgeOperationMetadata;
}

/**
 * Metadata associated with the long running operation for
 * Versions.CreateVersion.
 */
export interface GoogleCloudDialogflowCxV3CreateVersionOperationMetadata {
  /**
   * Name of the created version. Format:
   * `projects//locations//agents//flows//versions/`.
   */
  version?: string;
}

/**
 * Metadata for DeleteDocument operation.
 */
export interface GoogleCloudDialogflowCxV3DeleteDocumentOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowCxV3GenericKnowledgeOperationMetadata;
}

/**
 * Metadata returned for the Environments.DeployFlow long running operation.
 */
export interface GoogleCloudDialogflowCxV3DeployFlowMetadata {
  /**
   * Errors of running deployment tests.
   */
  testErrors?: GoogleCloudDialogflowCxV3TestError[];
}

function serializeGoogleCloudDialogflowCxV3DeployFlowMetadata(data: any): GoogleCloudDialogflowCxV3DeployFlowMetadata {
  return {
    ...data,
    testErrors: data["testErrors"] !== undefined ? data["testErrors"].map((item: any) => (serializeGoogleCloudDialogflowCxV3TestError(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3DeployFlowMetadata(data: any): GoogleCloudDialogflowCxV3DeployFlowMetadata {
  return {
    ...data,
    testErrors: data["testErrors"] !== undefined ? data["testErrors"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3TestError(item))) : undefined,
  };
}

/**
 * The request message for Environments.DeployFlow.
 */
export interface GoogleCloudDialogflowCxV3DeployFlowRequest {
  /**
   * Required. The flow version to deploy. Format:
   * `projects//locations//agents// flows//versions/`.
   */
  flowVersion?: string;
}

/**
 * The response message for Environments.DeployFlow.
 */
export interface GoogleCloudDialogflowCxV3DeployFlowResponse {
  /**
   * The name of the flow version Deployment. Format:
   * `projects//locations//agents// environments//deployments/`.
   */
  deployment?: string;
  /**
   * The updated environment where the flow is deployed.
   */
  environment?: GoogleCloudDialogflowCxV3Environment;
}

function serializeGoogleCloudDialogflowCxV3DeployFlowResponse(data: any): GoogleCloudDialogflowCxV3DeployFlowResponse {
  return {
    ...data,
    environment: data["environment"] !== undefined ? serializeGoogleCloudDialogflowCxV3Environment(data["environment"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3DeployFlowResponse(data: any): GoogleCloudDialogflowCxV3DeployFlowResponse {
  return {
    ...data,
    environment: data["environment"] !== undefined ? deserializeGoogleCloudDialogflowCxV3Environment(data["environment"]) : undefined,
  };
}

/**
 * Represents a deployment in an environment. A deployment happens when a flow
 * version configured to be active in the environment. You can configure running
 * pre-deployment steps, e.g. running validation test cases, experiment
 * auto-rollout, etc.
 */
export interface GoogleCloudDialogflowCxV3Deployment {
  /**
   * End time of this deployment.
   */
  endTime?: Date;
  /**
   * The name of the flow version for this deployment. Format:
   * projects//locations//agents//flows//versions/.
   */
  flowVersion?: string;
  /**
   * The name of the deployment. Format:
   * projects//locations//agents//environments//deployments/.
   */
  name?: string;
  /**
   * Result of the deployment.
   */
  result?: GoogleCloudDialogflowCxV3DeploymentResult;
  /**
   * Start time of this deployment.
   */
  startTime?: Date;
  /**
   * The current state of the deployment.
   */
  state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "FAILED";
}

function serializeGoogleCloudDialogflowCxV3Deployment(data: any): GoogleCloudDialogflowCxV3Deployment {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3Deployment(data: any): GoogleCloudDialogflowCxV3Deployment {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Result of the deployment.
 */
export interface GoogleCloudDialogflowCxV3DeploymentResult {
  /**
   * Results of test cases running before the deployment. Format:
   * `projects//locations//agents//testCases//results/`.
   */
  deploymentTestResults?: string[];
  /**
   * The name of the experiment triggered by this deployment. Format:
   * projects//locations//agents//environments//experiments/.
   */
  experiment?: string;
}

/**
 * The request to detect user's intent.
 */
export interface GoogleCloudDialogflowCxV3DetectIntentRequest {
  /**
   * Instructs the speech synthesizer how to generate the output audio.
   */
  outputAudioConfig?: GoogleCloudDialogflowCxV3OutputAudioConfig;
  /**
   * Required. The input specification.
   */
  queryInput?: GoogleCloudDialogflowCxV3QueryInput;
  /**
   * The parameters of this query.
   */
  queryParams?: GoogleCloudDialogflowCxV3QueryParameters;
}

function serializeGoogleCloudDialogflowCxV3DetectIntentRequest(data: any): GoogleCloudDialogflowCxV3DetectIntentRequest {
  return {
    ...data,
    queryInput: data["queryInput"] !== undefined ? serializeGoogleCloudDialogflowCxV3QueryInput(data["queryInput"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3DetectIntentRequest(data: any): GoogleCloudDialogflowCxV3DetectIntentRequest {
  return {
    ...data,
    queryInput: data["queryInput"] !== undefined ? deserializeGoogleCloudDialogflowCxV3QueryInput(data["queryInput"]) : undefined,
  };
}

/**
 * The message returned from the DetectIntent method.
 */
export interface GoogleCloudDialogflowCxV3DetectIntentResponse {
  /**
   * Indicates whether the partial response can be cancelled when a later
   * response arrives. e.g. if the agent specified some music as partial
   * response, it can be cancelled.
   */
  allowCancellation?: boolean;
  /**
   * The audio data bytes encoded as specified in the request. Note: The output
   * audio is generated based on the values of default platform text responses
   * found in the `query_result.response_messages` field. If multiple default
   * text responses exist, they will be concatenated when generating audio. If
   * no default platform text responses exist, the generated audio content will
   * be empty. In some scenarios, multiple output audio fields may be present in
   * the response structure. In these cases, only the top-most-level audio
   * output has content.
   */
  outputAudio?: Uint8Array;
  /**
   * The config used by the speech synthesizer to generate the output audio.
   */
  outputAudioConfig?: GoogleCloudDialogflowCxV3OutputAudioConfig;
  /**
   * The result of the conversational query.
   */
  queryResult?: GoogleCloudDialogflowCxV3QueryResult;
  /**
   * Output only. The unique identifier of the response. It can be used to
   * locate a response in the training example set or for reporting issues.
   */
  responseId?: string;
  /**
   * Response type.
   */
  responseType?:  | "RESPONSE_TYPE_UNSPECIFIED" | "PARTIAL" | "FINAL";
}

function serializeGoogleCloudDialogflowCxV3DetectIntentResponse(data: any): GoogleCloudDialogflowCxV3DetectIntentResponse {
  return {
    ...data,
    outputAudio: data["outputAudio"] !== undefined ? encodeBase64(data["outputAudio"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3DetectIntentResponse(data: any): GoogleCloudDialogflowCxV3DetectIntentResponse {
  return {
    ...data,
    outputAudio: data["outputAudio"] !== undefined ? decodeBase64(data["outputAudio"] as string) : undefined,
  };
}

/**
 * Represents the input for dtmf event.
 */
export interface GoogleCloudDialogflowCxV3DtmfInput {
  /**
   * The dtmf digits.
   */
  digits?: string;
  /**
   * The finish digit (if any).
   */
  finishDigit?: string;
}

/**
 * Entities are extracted from user input and represent parameters that are
 * meaningful to your application. For example, a date range, a proper name such
 * as a geographic location or landmark, and so on. Entities represent
 * actionable data for your application. When you define an entity, you can also
 * include synonyms that all map to that entity. For example, "soft drink",
 * "soda", "pop", and so on. There are three types of entities: * **System** -
 * entities that are defined by the Dialogflow API for common data types such as
 * date, time, currency, and so on. A system entity is represented by the
 * `EntityType` type. * **Custom** - entities that are defined by you that
 * represent actionable data that is meaningful to your application. For
 * example, you could define a `pizza.sauce` entity for red or white pizza
 * sauce, a `pizza.cheese` entity for the different types of cheese on a pizza,
 * a `pizza.topping` entity for different toppings, and so on. A custom entity
 * is represented by the `EntityType` type. * **User** - entities that are built
 * for an individual user such as favorites, preferences, playlists, and so on.
 * A user entity is represented by the SessionEntityType type. For more
 * information about entity types, see the [Dialogflow
 * documentation](https://cloud.google.com/dialogflow/docs/entities-overview).
 */
export interface GoogleCloudDialogflowCxV3EntityType {
  /**
   * Indicates whether the entity type can be automatically expanded.
   */
  autoExpansionMode?:  | "AUTO_EXPANSION_MODE_UNSPECIFIED" | "AUTO_EXPANSION_MODE_DEFAULT";
  /**
   * Required. The human-readable name of the entity type, unique within the
   * agent.
   */
  displayName?: string;
  /**
   * Enables fuzzy entity extraction during classification.
   */
  enableFuzzyExtraction?: boolean;
  /**
   * The collection of entity entries associated with the entity type.
   */
  entities?: GoogleCloudDialogflowCxV3EntityTypeEntity[];
  /**
   * Collection of exceptional words and phrases that shouldn't be matched. For
   * example, if you have a size entity type with entry `giant`(an adjective),
   * you might consider adding `giants`(a noun) as an exclusion. If the kind of
   * entity type is `KIND_MAP`, then the phrases specified by entities and
   * excluded phrases should be mutually exclusive.
   */
  excludedPhrases?: GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase[];
  /**
   * Required. Indicates the kind of entity type.
   */
  kind?:  | "KIND_UNSPECIFIED" | "KIND_MAP" | "KIND_LIST" | "KIND_REGEXP";
  /**
   * The unique identifier of the entity type. Required for
   * EntityTypes.UpdateEntityType. Format:
   * `projects//locations//agents//entityTypes/`.
   */
  name?: string;
  /**
   * Indicates whether parameters of the entity type should be redacted in log.
   * If redaction is enabled, page parameters and intent parameters referring to
   * the entity type will be replaced by parameter name when logging.
   */
  redact?: boolean;
}

/**
 * An **entity entry** for an associated entity type.
 */
export interface GoogleCloudDialogflowCxV3EntityTypeEntity {
  /**
   * Required. A collection of value synonyms. For example, if the entity type
   * is *vegetable*, and `value` is *scallions*, a synonym could be *green
   * onions*. For `KIND_LIST` entity types: * This collection must contain
   * exactly one synonym equal to `value`.
   */
  synonyms?: string[];
  /**
   * Required. The primary value associated with this entity entry. For
   * example, if the entity type is *vegetable*, the value could be *scallions*.
   * For `KIND_MAP` entity types: * A canonical value to be used in place of
   * synonyms. For `KIND_LIST` entity types: * A string that can contain
   * references to other entity types (with or without aliases).
   */
  value?: string;
}

/**
 * An excluded entity phrase that should not be matched.
 */
export interface GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase {
  /**
   * Required. The word or phrase to be excluded.
   */
  value?: string;
}

/**
 * Represents an environment for an agent. You can create multiple versions of
 * your agent and publish them to separate environments. When you edit an agent,
 * you are editing the draft agent. At any point, you can save the draft agent
 * as an agent version, which is an immutable snapshot of your agent. When you
 * save the draft agent, it is published to the default environment. When you
 * create agent versions, you can publish them to custom environments. You can
 * create a variety of custom environments for testing, development, production,
 * etc.
 */
export interface GoogleCloudDialogflowCxV3Environment {
  /**
   * The human-readable description of the environment. The maximum length is
   * 500 characters. If exceeded, the request is rejected.
   */
  description?: string;
  /**
   * Required. The human-readable name of the environment (unique in an agent).
   * Limit of 64 characters.
   */
  displayName?: string;
  /**
   * The name of the environment. Format:
   * `projects//locations//agents//environments/`.
   */
  name?: string;
  /**
   * The test cases config for continuous tests of this environment.
   */
  testCasesConfig?: GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig;
  /**
   * Output only. Update time of this environment.
   */
  readonly updateTime?: Date;
  /**
   * A list of configurations for flow versions. You should include version
   * configs for all flows that are reachable from `Start Flow` in the agent.
   * Otherwise, an error will be returned.
   */
  versionConfigs?: GoogleCloudDialogflowCxV3EnvironmentVersionConfig[];
  /**
   * The webhook configuration for this environment.
   */
  webhookConfig?: GoogleCloudDialogflowCxV3EnvironmentWebhookConfig;
}

function serializeGoogleCloudDialogflowCxV3Environment(data: any): GoogleCloudDialogflowCxV3Environment {
  return {
    ...data,
    webhookConfig: data["webhookConfig"] !== undefined ? serializeGoogleCloudDialogflowCxV3EnvironmentWebhookConfig(data["webhookConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3Environment(data: any): GoogleCloudDialogflowCxV3Environment {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
    webhookConfig: data["webhookConfig"] !== undefined ? deserializeGoogleCloudDialogflowCxV3EnvironmentWebhookConfig(data["webhookConfig"]) : undefined,
  };
}

/**
 * The configuration for continuous tests.
 */
export interface GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig {
  /**
   * Whether to run test cases in TestCasesConfig.test_cases periodically.
   * Default false. If set to true, run once a day.
   */
  enableContinuousRun?: boolean;
  /**
   * Whether to run test cases in TestCasesConfig.test_cases before deploying a
   * flow version to the environment. Default false.
   */
  enablePredeploymentRun?: boolean;
  /**
   * A list of test case names to run. They should be under the same agent.
   * Format of each test case name: `projects//locations/ /agents//testCases/`
   */
  testCases?: string[];
}

/**
 * Configuration for the version.
 */
export interface GoogleCloudDialogflowCxV3EnvironmentVersionConfig {
  /**
   * Required. Format: projects//locations//agents//flows//versions/.
   */
  version?: string;
}

/**
 * Configuration for webhooks.
 */
export interface GoogleCloudDialogflowCxV3EnvironmentWebhookConfig {
  /**
   * The list of webhooks to override for the agent environment. The webhook
   * must exist in the agent. You can override fields in `generic_web_service`
   * and `service_directory`.
   */
  webhookOverrides?: GoogleCloudDialogflowCxV3Webhook[];
}

function serializeGoogleCloudDialogflowCxV3EnvironmentWebhookConfig(data: any): GoogleCloudDialogflowCxV3EnvironmentWebhookConfig {
  return {
    ...data,
    webhookOverrides: data["webhookOverrides"] !== undefined ? data["webhookOverrides"].map((item: any) => (serializeGoogleCloudDialogflowCxV3Webhook(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3EnvironmentWebhookConfig(data: any): GoogleCloudDialogflowCxV3EnvironmentWebhookConfig {
  return {
    ...data,
    webhookOverrides: data["webhookOverrides"] !== undefined ? data["webhookOverrides"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3Webhook(item))) : undefined,
  };
}

/**
 * An event handler specifies an event that can be handled during a session.
 * When the specified event happens, the following actions are taken in order: *
 * If there is a `trigger_fulfillment` associated with the event, it will be
 * called. * If there is a `target_page` associated with the event, the session
 * will transition into the specified page. * If there is a `target_flow`
 * associated with the event, the session will transition into the specified
 * flow.
 */
export interface GoogleCloudDialogflowCxV3EventHandler {
  /**
   * Required. The name of the event to handle.
   */
  event?: string;
  /**
   * Output only. The unique identifier of this event handler.
   */
  readonly name?: string;
  /**
   * The target flow to transition to. Format:
   * `projects//locations//agents//flows/`.
   */
  targetFlow?: string;
  /**
   * The target page to transition to. Format:
   * `projects//locations//agents//flows//pages/`.
   */
  targetPage?: string;
  /**
   * The fulfillment to call when the event occurs. Handling webhook errors
   * with a fulfillment enabled with webhook could cause infinite loop. It is
   * invalid to specify such fulfillment for a handler handling webhooks.
   */
  triggerFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
}

/**
 * Represents the event to trigger.
 */
export interface GoogleCloudDialogflowCxV3EventInput {
  /**
   * Name of the event.
   */
  event?: string;
}

/**
 * Represents an experiment in an environment.
 */
export interface GoogleCloudDialogflowCxV3Experiment {
  /**
   * Creation time of this experiment.
   */
  createTime?: Date;
  /**
   * The definition of the experiment.
   */
  definition?: GoogleCloudDialogflowCxV3ExperimentDefinition;
  /**
   * The human-readable description of the experiment.
   */
  description?: string;
  /**
   * Required. The human-readable name of the experiment (unique in an
   * environment). Limit of 64 characters.
   */
  displayName?: string;
  /**
   * End time of this experiment.
   */
  endTime?: Date;
  /**
   * Maximum number of days to run the experiment/rollout. If auto-rollout is
   * not enabled, default value and maximum will be 30 days. If auto-rollout is
   * enabled, default value and maximum will be 6 days.
   */
  experimentLength?: number /* Duration */;
  /**
   * Last update time of this experiment.
   */
  lastUpdateTime?: Date;
  /**
   * The name of the experiment. Format:
   * projects//locations//agents//environments//experiments/..
   */
  name?: string;
  /**
   * Inference result of the experiment.
   */
  result?: GoogleCloudDialogflowCxV3ExperimentResult;
  /**
   * The configuration for auto rollout. If set, there should be exactly two
   * variants in the experiment (control variant being the default version of
   * the flow), the traffic allocation for the non-control variant will
   * gradually increase to 100% when conditions are met, and eventually replace
   * the control variant to become the default version of the flow.
   */
  rolloutConfig?: GoogleCloudDialogflowCxV3RolloutConfig;
  /**
   * The reason why rollout has failed. Should only be set when state is
   * ROLLOUT_FAILED.
   */
  rolloutFailureReason?: string;
  /**
   * State of the auto rollout process.
   */
  rolloutState?: GoogleCloudDialogflowCxV3RolloutState;
  /**
   * Start time of this experiment.
   */
  startTime?: Date;
  /**
   * The current state of the experiment. Transition triggered by
   * Experiments.StartExperiment: DRAFT->RUNNING. Transition triggered by
   * Experiments.CancelExperiment: DRAFT->DONE or RUNNING->DONE.
   */
  state?:  | "STATE_UNSPECIFIED" | "DRAFT" | "RUNNING" | "DONE" | "ROLLOUT_FAILED";
  /**
   * The history of updates to the experiment variants.
   */
  variantsHistory?: GoogleCloudDialogflowCxV3VariantsHistory[];
}

function serializeGoogleCloudDialogflowCxV3Experiment(data: any): GoogleCloudDialogflowCxV3Experiment {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    experimentLength: data["experimentLength"] !== undefined ? data["experimentLength"] : undefined,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? data["lastUpdateTime"].toISOString() : undefined,
    result: data["result"] !== undefined ? serializeGoogleCloudDialogflowCxV3ExperimentResult(data["result"]) : undefined,
    rolloutConfig: data["rolloutConfig"] !== undefined ? serializeGoogleCloudDialogflowCxV3RolloutConfig(data["rolloutConfig"]) : undefined,
    rolloutState: data["rolloutState"] !== undefined ? serializeGoogleCloudDialogflowCxV3RolloutState(data["rolloutState"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    variantsHistory: data["variantsHistory"] !== undefined ? data["variantsHistory"].map((item: any) => (serializeGoogleCloudDialogflowCxV3VariantsHistory(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3Experiment(data: any): GoogleCloudDialogflowCxV3Experiment {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    experimentLength: data["experimentLength"] !== undefined ? data["experimentLength"] : undefined,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? new Date(data["lastUpdateTime"]) : undefined,
    result: data["result"] !== undefined ? deserializeGoogleCloudDialogflowCxV3ExperimentResult(data["result"]) : undefined,
    rolloutConfig: data["rolloutConfig"] !== undefined ? deserializeGoogleCloudDialogflowCxV3RolloutConfig(data["rolloutConfig"]) : undefined,
    rolloutState: data["rolloutState"] !== undefined ? deserializeGoogleCloudDialogflowCxV3RolloutState(data["rolloutState"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    variantsHistory: data["variantsHistory"] !== undefined ? data["variantsHistory"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3VariantsHistory(item))) : undefined,
  };
}

/**
 * Definition of the experiment.
 */
export interface GoogleCloudDialogflowCxV3ExperimentDefinition {
  /**
   * The condition defines which subset of sessions are selected for this
   * experiment. If not specified, all sessions are eligible. E.g.
   * "query_input.language_code=en" See the [conditions
   * reference](https://cloud.google.com/dialogflow/cx/docs/reference/condition).
   */
  condition?: string;
  /**
   * The flow versions as the variants of this experiment.
   */
  versionVariants?: GoogleCloudDialogflowCxV3VersionVariants;
}

/**
 * The inference result which includes an objective metric to optimize and the
 * confidence interval.
 */
export interface GoogleCloudDialogflowCxV3ExperimentResult {
  /**
   * The last time the experiment's stats data was updated. Will have default
   * value if stats have never been computed for this experiment.
   */
  lastUpdateTime?: Date;
  /**
   * Version variants and metrics.
   */
  versionMetrics?: GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics[];
}

function serializeGoogleCloudDialogflowCxV3ExperimentResult(data: any): GoogleCloudDialogflowCxV3ExperimentResult {
  return {
    ...data,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? data["lastUpdateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ExperimentResult(data: any): GoogleCloudDialogflowCxV3ExperimentResult {
  return {
    ...data,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? new Date(data["lastUpdateTime"]) : undefined,
  };
}

/**
 * A confidence interval is a range of possible values for the experiment
 * objective you are trying to measure.
 */
export interface GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval {
  /**
   * The confidence level used to construct the interval, i.e. there is X%
   * chance that the true value is within this interval.
   */
  confidenceLevel?: number;
  /**
   * Lower bound of the interval.
   */
  lowerBound?: number;
  /**
   * The percent change between an experiment metric's value and the value for
   * its control.
   */
  ratio?: number;
  /**
   * Upper bound of the interval.
   */
  upperBound?: number;
}

/**
 * Metric and corresponding confidence intervals.
 */
export interface GoogleCloudDialogflowCxV3ExperimentResultMetric {
  /**
   * The probability that the treatment is better than all other treatments in
   * the experiment
   */
  confidenceInterval?: GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval;
  /**
   * Count value of a metric.
   */
  count?: number;
  /**
   * Count-based metric type. Only one of type or count_type is specified in
   * each Metric.
   */
  countType?:  | "COUNT_TYPE_UNSPECIFIED" | "TOTAL_NO_MATCH_COUNT" | "TOTAL_TURN_COUNT" | "AVERAGE_TURN_COUNT";
  /**
   * Ratio value of a metric.
   */
  ratio?: number;
  /**
   * Ratio-based metric type. Only one of type or count_type is specified in
   * each Metric.
   */
  type?:  | "METRIC_UNSPECIFIED" | "CONTAINED_SESSION_NO_CALLBACK_RATE" | "LIVE_AGENT_HANDOFF_RATE" | "CALLBACK_SESSION_RATE" | "ABANDONED_SESSION_RATE" | "SESSION_END_RATE";
}

/**
 * Version variant and associated metrics.
 */
export interface GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics {
  /**
   * The metrics and corresponding confidence intervals in the inference
   * result.
   */
  metrics?: GoogleCloudDialogflowCxV3ExperimentResultMetric[];
  /**
   * Number of sessions that were allocated to this version.
   */
  sessionCount?: number;
  /**
   * The name of the flow Version. Format:
   * `projects//locations//agents//flows//versions/`.
   */
  version?: string;
}

/**
 * The request message for Agents.ExportAgent.
 */
export interface GoogleCloudDialogflowCxV3ExportAgentRequest {
  /**
   * Optional. The [Google Cloud
   * Storage](https://cloud.google.com/storage/docs/) URI to export the agent
   * to. The format of this URI must be `gs:///`. If left unspecified, the
   * serialized agent is returned inline. Dialogflow performs a write operation
   * for the Cloud Storage object on the caller's behalf, so your request
   * authentication must have write permissions for the object. For more
   * information, see [Dialogflow access
   * control](https://cloud.google.com/dialogflow/cx/docs/concept/access-control#storage).
   */
  agentUri?: string;
  /**
   * Optional. The data format of the exported agent. If not specified, `BLOB`
   * is assumed.
   */
  dataFormat?:  | "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON_PACKAGE";
  /**
   * Optional. Environment name. If not set, draft environment is assumed.
   * Format: `projects//locations//agents//environments/`.
   */
  environment?: string;
}

/**
 * The response message for Agents.ExportAgent.
 */
export interface GoogleCloudDialogflowCxV3ExportAgentResponse {
  /**
   * Uncompressed raw byte content for agent.
   */
  agentContent?: Uint8Array;
  /**
   * The URI to a file containing the exported agent. This field is populated
   * only if `agent_uri` is specified in ExportAgentRequest.
   */
  agentUri?: string;
}

function serializeGoogleCloudDialogflowCxV3ExportAgentResponse(data: any): GoogleCloudDialogflowCxV3ExportAgentResponse {
  return {
    ...data,
    agentContent: data["agentContent"] !== undefined ? encodeBase64(data["agentContent"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ExportAgentResponse(data: any): GoogleCloudDialogflowCxV3ExportAgentResponse {
  return {
    ...data,
    agentContent: data["agentContent"] !== undefined ? decodeBase64(data["agentContent"] as string) : undefined,
  };
}

/**
 * The request message for Flows.ExportFlow.
 */
export interface GoogleCloudDialogflowCxV3ExportFlowRequest {
  /**
   * Optional. The [Google Cloud
   * Storage](https://cloud.google.com/storage/docs/) URI to export the flow to.
   * The format of this URI must be `gs:///`. If left unspecified, the
   * serialized flow is returned inline. Dialogflow performs a write operation
   * for the Cloud Storage object on the caller's behalf, so your request
   * authentication must have write permissions for the object. For more
   * information, see [Dialogflow access
   * control](https://cloud.google.com/dialogflow/cx/docs/concept/access-control#storage).
   */
  flowUri?: string;
  /**
   * Optional. Whether to export flows referenced by the specified flow.
   */
  includeReferencedFlows?: boolean;
}

/**
 * The response message for Flows.ExportFlow.
 */
export interface GoogleCloudDialogflowCxV3ExportFlowResponse {
  /**
   * Uncompressed raw byte content for flow.
   */
  flowContent?: Uint8Array;
  /**
   * The URI to a file containing the exported flow. This field is populated
   * only if `flow_uri` is specified in ExportFlowRequest.
   */
  flowUri?: string;
}

function serializeGoogleCloudDialogflowCxV3ExportFlowResponse(data: any): GoogleCloudDialogflowCxV3ExportFlowResponse {
  return {
    ...data,
    flowContent: data["flowContent"] !== undefined ? encodeBase64(data["flowContent"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ExportFlowResponse(data: any): GoogleCloudDialogflowCxV3ExportFlowResponse {
  return {
    ...data,
    flowContent: data["flowContent"] !== undefined ? decodeBase64(data["flowContent"] as string) : undefined,
  };
}

/**
 * Metadata returned for the TestCases.ExportTestCases long running operation.
 * This message currently has no fields.
 */
export interface GoogleCloudDialogflowCxV3ExportTestCasesMetadata {
}

/**
 * The request message for TestCases.ExportTestCases.
 */
export interface GoogleCloudDialogflowCxV3ExportTestCasesRequest {
  /**
   * The data format of the exported test cases. If not specified, `BLOB` is
   * assumed.
   */
  dataFormat?:  | "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON";
  /**
   * The filter expression used to filter exported test cases, see [API
   * Filtering](https://aip.dev/160). The expression is case insensitive and
   * supports the following syntax: name = [OR name = ] ... For example: * "name
   * = t1 OR name = t2" matches the test case with the exact resource name "t1"
   * or "t2".
   */
  filter?: string;
  /**
   * The [Google Cloud Storage](https://cloud.google.com/storage/docs/) URI to
   * export the test cases to. The format of this URI must be `gs:///`. If
   * unspecified, the serialized test cases is returned inline. Dialogflow
   * performs a write operation for the Cloud Storage object on the caller's
   * behalf, so your request authentication must have write permissions for the
   * object. For more information, see [Dialogflow access
   * control](https://cloud.google.com/dialogflow/cx/docs/concept/access-control#storage).
   */
  gcsUri?: string;
}

/**
 * The response message for TestCases.ExportTestCases.
 */
export interface GoogleCloudDialogflowCxV3ExportTestCasesResponse {
  /**
   * Uncompressed raw byte content for test cases.
   */
  content?: Uint8Array;
  /**
   * The URI to a file containing the exported test cases. This field is
   * populated only if `gcs_uri` is specified in ExportTestCasesRequest.
   */
  gcsUri?: string;
}

function serializeGoogleCloudDialogflowCxV3ExportTestCasesResponse(data: any): GoogleCloudDialogflowCxV3ExportTestCasesResponse {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ExportTestCasesResponse(data: any): GoogleCloudDialogflowCxV3ExportTestCasesResponse {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * Flows represents the conversation flows when you build your chatbot agent. A
 * flow consists of many pages connected by the transition routes. Conversations
 * always start with the built-in Start Flow (with an all-0 ID). Transition
 * routes can direct the conversation session from the current flow (parent
 * flow) to another flow (sub flow). When the sub flow is finished, Dialogflow
 * will bring the session back to the parent flow, where the sub flow is
 * started. Usually, when a transition route is followed by a matched intent,
 * the intent will be "consumed". This means the intent won't activate more
 * transition routes. However, when the followed transition route moves the
 * conversation session into a different flow, the matched intent can be carried
 * over and to be consumed in the target flow.
 */
export interface GoogleCloudDialogflowCxV3Flow {
  /**
   * The description of the flow. The maximum length is 500 characters. If
   * exceeded, the request is rejected.
   */
  description?: string;
  /**
   * Required. The human-readable name of the flow.
   */
  displayName?: string;
  /**
   * A flow's event handlers serve two purposes: * They are responsible for
   * handling events (e.g. no match, webhook errors) in the flow. * They are
   * inherited by every page's event handlers, which can be used to handle
   * common events regardless of the current page. Event handlers defined in the
   * page have higher priority than those defined in the flow. Unlike
   * transition_routes, these handlers are evaluated on a first-match basis. The
   * first one that matches the event get executed, with the rest being ignored.
   */
  eventHandlers?: GoogleCloudDialogflowCxV3EventHandler[];
  /**
   * The unique identifier of the flow. Format:
   * `projects//locations//agents//flows/`.
   */
  name?: string;
  /**
   * NLU related settings of the flow.
   */
  nluSettings?: GoogleCloudDialogflowCxV3NluSettings;
  /**
   * A flow's transition route group serve two purposes: * They are responsible
   * for matching the user's first utterances in the flow. * They are inherited
   * by every page's transition route groups. Transition route groups defined in
   * the page have higher priority than those defined in the flow.
   * Format:`projects//locations//agents//flows//transitionRouteGroups/`.
   */
  transitionRouteGroups?: string[];
  /**
   * A flow's transition routes serve two purposes: * They are responsible for
   * matching the user's first utterances in the flow. * They are inherited by
   * every page's transition routes and can support use cases such as the user
   * saying "help" or "can I talk to a human?", which can be handled in a common
   * way regardless of the current page. Transition routes defined in the page
   * have higher priority than those defined in the flow. TransitionRoutes are
   * evalauted in the following order: * TransitionRoutes with intent specified.
   * * TransitionRoutes with only condition specified. TransitionRoutes with
   * intent specified are inherited by pages in the flow.
   */
  transitionRoutes?: GoogleCloudDialogflowCxV3TransitionRoute[];
}

/**
 * The response message for Flows.GetFlowValidationResult.
 */
export interface GoogleCloudDialogflowCxV3FlowValidationResult {
  /**
   * The unique identifier of the flow validation result. Format:
   * `projects//locations//agents//flows//validationResult`.
   */
  name?: string;
  /**
   * Last time the flow was validated.
   */
  updateTime?: Date;
  /**
   * Contains all validation messages.
   */
  validationMessages?: GoogleCloudDialogflowCxV3ValidationMessage[];
}

function serializeGoogleCloudDialogflowCxV3FlowValidationResult(data: any): GoogleCloudDialogflowCxV3FlowValidationResult {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3FlowValidationResult(data: any): GoogleCloudDialogflowCxV3FlowValidationResult {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * A form is a data model that groups related parameters that can be collected
 * from the user. The process in which the agent prompts the user and collects
 * parameter values from the user is called form filling. A form can be added to
 * a page. When form filling is done, the filled parameters will be written to
 * the session.
 */
export interface GoogleCloudDialogflowCxV3Form {
  /**
   * Parameters to collect from the user.
   */
  parameters?: GoogleCloudDialogflowCxV3FormParameter[];
}

/**
 * Represents a form parameter.
 */
export interface GoogleCloudDialogflowCxV3FormParameter {
  /**
   * The default value of an optional parameter. If the parameter is required,
   * the default value will be ignored.
   */
  defaultValue?: any;
  /**
   * Required. The human-readable name of the parameter, unique within the
   * form.
   */
  displayName?: string;
  /**
   * Required. The entity type of the parameter. Format:
   * `projects/-/locations/-/agents/-/entityTypes/` for system entity types (for
   * example, `projects/-/locations/-/agents/-/entityTypes/sys.date`), or
   * `projects//locations//agents//entityTypes/` for developer entity types.
   */
  entityType?: string;
  /**
   * Required. Defines fill behavior for the parameter.
   */
  fillBehavior?: GoogleCloudDialogflowCxV3FormParameterFillBehavior;
  /**
   * Indicates whether the parameter represents a list of values.
   */
  isList?: boolean;
  /**
   * Indicates whether the parameter content should be redacted in log. If
   * redaction is enabled, the parameter content will be replaced by parameter
   * name during logging. Note: the parameter content is subject to redaction if
   * either parameter level redaction or entity type level redaction is enabled.
   */
  redact?: boolean;
  /**
   * Indicates whether the parameter is required. Optional parameters will not
   * trigger prompts; however, they are filled if the user specifies them.
   * Required parameters must be filled before form filling concludes.
   */
  required?: boolean;
}

/**
 * Configuration for how the filling of a parameter should be handled.
 */
export interface GoogleCloudDialogflowCxV3FormParameterFillBehavior {
  /**
   * Required. The fulfillment to provide the initial prompt that the agent can
   * present to the user in order to fill the parameter.
   */
  initialPromptFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  /**
   * The handlers for parameter-level events, used to provide reprompt for the
   * parameter or transition to a different page/flow. The supported events are:
   * * `sys.no-match-`, where N can be from 1 to 6 * `sys.no-match-default` *
   * `sys.no-input-`, where N can be from 1 to 6 * `sys.no-input-default` *
   * `sys.invalid-parameter` `initial_prompt_fulfillment` provides the first
   * prompt for the parameter. If the user's response does not fill the
   * parameter, a no-match/no-input event will be triggered, and the fulfillment
   * associated with the `sys.no-match-1`/`sys.no-input-1` handler (if defined)
   * will be called to provide a prompt. The `sys.no-match-2`/`sys.no-input-2`
   * handler (if defined) will respond to the next no-match/no-input event, and
   * so on. A `sys.no-match-default` or `sys.no-input-default` handler will be
   * used to handle all following no-match/no-input events after all numbered
   * no-match/no-input handlers for the parameter are consumed. A
   * `sys.invalid-parameter` handler can be defined to handle the case where the
   * parameter values have been `invalidated` by webhook. For example, if the
   * user's response fill the parameter, however the parameter was invalidated
   * by webhook, the fulfillment associated with the `sys.invalid-parameter`
   * handler (if defined) will be called to provide a prompt. If the event
   * handler for the corresponding event can't be found on the parameter,
   * `initial_prompt_fulfillment` will be re-prompted.
   */
  repromptEventHandlers?: GoogleCloudDialogflowCxV3EventHandler[];
}

/**
 * Request of FulfillIntent
 */
export interface GoogleCloudDialogflowCxV3FulfillIntentRequest {
  /**
   * The matched intent/event to fulfill.
   */
  match?: GoogleCloudDialogflowCxV3Match;
  /**
   * Must be same as the corresponding MatchIntent request, otherwise the
   * behavior is undefined.
   */
  matchIntentRequest?: GoogleCloudDialogflowCxV3MatchIntentRequest;
  /**
   * Instructs the speech synthesizer how to generate output audio.
   */
  outputAudioConfig?: GoogleCloudDialogflowCxV3OutputAudioConfig;
}

function serializeGoogleCloudDialogflowCxV3FulfillIntentRequest(data: any): GoogleCloudDialogflowCxV3FulfillIntentRequest {
  return {
    ...data,
    matchIntentRequest: data["matchIntentRequest"] !== undefined ? serializeGoogleCloudDialogflowCxV3MatchIntentRequest(data["matchIntentRequest"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3FulfillIntentRequest(data: any): GoogleCloudDialogflowCxV3FulfillIntentRequest {
  return {
    ...data,
    matchIntentRequest: data["matchIntentRequest"] !== undefined ? deserializeGoogleCloudDialogflowCxV3MatchIntentRequest(data["matchIntentRequest"]) : undefined,
  };
}

/**
 * Response of FulfillIntent
 */
export interface GoogleCloudDialogflowCxV3FulfillIntentResponse {
  /**
   * The audio data bytes encoded as specified in the request. Note: The output
   * audio is generated based on the values of default platform text responses
   * found in the `query_result.response_messages` field. If multiple default
   * text responses exist, they will be concatenated when generating audio. If
   * no default platform text responses exist, the generated audio content will
   * be empty. In some scenarios, multiple output audio fields may be present in
   * the response structure. In these cases, only the top-most-level audio
   * output has content.
   */
  outputAudio?: Uint8Array;
  /**
   * The config used by the speech synthesizer to generate the output audio.
   */
  outputAudioConfig?: GoogleCloudDialogflowCxV3OutputAudioConfig;
  /**
   * The result of the conversational query.
   */
  queryResult?: GoogleCloudDialogflowCxV3QueryResult;
  /**
   * Output only. The unique identifier of the response. It can be used to
   * locate a response in the training example set or for reporting issues.
   */
  responseId?: string;
}

function serializeGoogleCloudDialogflowCxV3FulfillIntentResponse(data: any): GoogleCloudDialogflowCxV3FulfillIntentResponse {
  return {
    ...data,
    outputAudio: data["outputAudio"] !== undefined ? encodeBase64(data["outputAudio"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3FulfillIntentResponse(data: any): GoogleCloudDialogflowCxV3FulfillIntentResponse {
  return {
    ...data,
    outputAudio: data["outputAudio"] !== undefined ? decodeBase64(data["outputAudio"] as string) : undefined,
  };
}

/**
 * A fulfillment can do one or more of the following actions at the same time:
 * * Generate rich message responses. * Set parameter values. * Call the
 * webhook. Fulfillments can be called at various stages in the Page or Form
 * lifecycle. For example, when a DetectIntentRequest drives a session to enter
 * a new page, the page's entry fulfillment can add a static response to the
 * QueryResult in the returning DetectIntentResponse, call the webhook (for
 * example, to load user data from a database), or both.
 */
export interface GoogleCloudDialogflowCxV3Fulfillment {
  /**
   * Conditional cases for this fulfillment.
   */
  conditionalCases?: GoogleCloudDialogflowCxV3FulfillmentConditionalCases[];
  /**
   * The list of rich message responses to present to the user.
   */
  messages?: GoogleCloudDialogflowCxV3ResponseMessage[];
  /**
   * Whether Dialogflow should return currently queued fulfillment response
   * messages in streaming APIs. If a webhook is specified, it happens before
   * Dialogflow invokes webhook. Warning: 1) This flag only affects streaming
   * API. Responses are still queued and returned once in non-streaming API. 2)
   * The flag can be enabled in any fulfillment but only the first 3 partial
   * responses will be returned. You may only want to apply it to fulfillments
   * that have slow webhooks.
   */
  returnPartialResponses?: boolean;
  /**
   * Set parameter values before executing the webhook.
   */
  setParameterActions?: GoogleCloudDialogflowCxV3FulfillmentSetParameterAction[];
  /**
   * The value of this field will be populated in the WebhookRequest
   * `fulfillmentInfo.tag` field by Dialogflow when the associated webhook is
   * called. The tag is typically used by the webhook service to identify which
   * fulfillment is being called, but it could be used for other purposes. This
   * field is required if `webhook` is specified.
   */
  tag?: string;
  /**
   * The webhook to call. Format: `projects//locations//agents//webhooks/`.
   */
  webhook?: string;
}

/**
 * A list of cascading if-else conditions. Cases are mutually exclusive. The
 * first one with a matching condition is selected, all the rest ignored.
 */
export interface GoogleCloudDialogflowCxV3FulfillmentConditionalCases {
  /**
   * A list of cascading if-else conditions.
   */
  cases?: GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase[];
}

/**
 * Each case has a Boolean condition. When it is evaluated to be True, the
 * corresponding messages will be selected and evaluated recursively.
 */
export interface GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase {
  /**
   * A list of case content.
   */
  caseContent?: GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent[];
  /**
   * The condition to activate and select this case. Empty means the condition
   * is always true. The condition is evaluated against form parameters or
   * session parameters. See the [conditions
   * reference](https://cloud.google.com/dialogflow/cx/docs/reference/condition).
   */
  condition?: string;
}

/**
 * The list of messages or conditional cases to activate for this case.
 */
export interface GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent {
  /**
   * Additional cases to be evaluated.
   */
  additionalCases?: GoogleCloudDialogflowCxV3FulfillmentConditionalCases;
  /**
   * Returned message.
   */
  message?: GoogleCloudDialogflowCxV3ResponseMessage;
}

/**
 * Setting a parameter value.
 */
export interface GoogleCloudDialogflowCxV3FulfillmentSetParameterAction {
  /**
   * Display name of the parameter.
   */
  parameter?: string;
  /**
   * The new value of the parameter. A null value clears the parameter.
   */
  value?: any;
}

/**
 * Google Cloud Storage location for a Dialogflow operation that writes or
 * exports objects (e.g. exported agent or transcripts) outside of Dialogflow.
 */
export interface GoogleCloudDialogflowCxV3GcsDestination {
  /**
   * Required. The Google Cloud Storage URI for the exported objects. A URI is
   * of the form: gs://bucket/object-name-or-prefix Whether a full object name,
   * or just a prefix, its usage depends on the Dialogflow operation.
   */
  uri?: string;
}

/**
 * Metadata in google::longrunning::Operation for Knowledge operations.
 */
export interface GoogleCloudDialogflowCxV3GenericKnowledgeOperationMetadata {
  /**
   * Required. Output only. The current state of this operation.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE";
}

/**
 * Metadata for ImportDocuments operation.
 */
export interface GoogleCloudDialogflowCxV3ImportDocumentsOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowCxV3GenericKnowledgeOperationMetadata;
}

/**
 * Response message for Documents.ImportDocuments.
 */
export interface GoogleCloudDialogflowCxV3ImportDocumentsResponse {
  /**
   * Includes details about skipped documents or any other warnings.
   */
  warnings?: GoogleRpcStatus[];
}

/**
 * The request message for Flows.ImportFlow.
 */
export interface GoogleCloudDialogflowCxV3ImportFlowRequest {
  /**
   * Uncompressed raw byte content for flow.
   */
  flowContent?: Uint8Array;
  /**
   * The [Google Cloud Storage](https://cloud.google.com/storage/docs/) URI to
   * import flow from. The format of this URI must be `gs:///`. Dialogflow
   * performs a read operation for the Cloud Storage object on the caller's
   * behalf, so your request authentication must have read permissions for the
   * object. For more information, see [Dialogflow access
   * control](https://cloud.google.com/dialogflow/cx/docs/concept/access-control#storage).
   */
  flowUri?: string;
  /**
   * Flow import mode. If not specified, `KEEP` is assumed.
   */
  importOption?:  | "IMPORT_OPTION_UNSPECIFIED" | "KEEP" | "FALLBACK";
}

function serializeGoogleCloudDialogflowCxV3ImportFlowRequest(data: any): GoogleCloudDialogflowCxV3ImportFlowRequest {
  return {
    ...data,
    flowContent: data["flowContent"] !== undefined ? encodeBase64(data["flowContent"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ImportFlowRequest(data: any): GoogleCloudDialogflowCxV3ImportFlowRequest {
  return {
    ...data,
    flowContent: data["flowContent"] !== undefined ? decodeBase64(data["flowContent"] as string) : undefined,
  };
}

/**
 * The response message for Flows.ImportFlow.
 */
export interface GoogleCloudDialogflowCxV3ImportFlowResponse {
  /**
   * The unique identifier of the new flow. Format:
   * `projects//locations//agents//flows/`.
   */
  flow?: string;
}

/**
 * Metadata returned for the TestCases.ImportTestCases long running operation.
 */
export interface GoogleCloudDialogflowCxV3ImportTestCasesMetadata {
  /**
   * Errors for failed test cases.
   */
  errors?: GoogleCloudDialogflowCxV3TestCaseError[];
}

function serializeGoogleCloudDialogflowCxV3ImportTestCasesMetadata(data: any): GoogleCloudDialogflowCxV3ImportTestCasesMetadata {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (serializeGoogleCloudDialogflowCxV3TestCaseError(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ImportTestCasesMetadata(data: any): GoogleCloudDialogflowCxV3ImportTestCasesMetadata {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3TestCaseError(item))) : undefined,
  };
}

/**
 * The request message for TestCases.ImportTestCases.
 */
export interface GoogleCloudDialogflowCxV3ImportTestCasesRequest {
  /**
   * Uncompressed raw byte content for test cases.
   */
  content?: Uint8Array;
  /**
   * The [Google Cloud Storage](https://cloud.google.com/storage/docs/) URI to
   * import test cases from. The format of this URI must be `gs:///`. Dialogflow
   * performs a read operation for the Cloud Storage object on the caller's
   * behalf, so your request authentication must have read permissions for the
   * object. For more information, see [Dialogflow access
   * control](https://cloud.google.com/dialogflow/cx/docs/concept/access-control#storage).
   */
  gcsUri?: string;
}

function serializeGoogleCloudDialogflowCxV3ImportTestCasesRequest(data: any): GoogleCloudDialogflowCxV3ImportTestCasesRequest {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ImportTestCasesRequest(data: any): GoogleCloudDialogflowCxV3ImportTestCasesRequest {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * The response message for TestCases.ImportTestCases.
 */
export interface GoogleCloudDialogflowCxV3ImportTestCasesResponse {
  /**
   * The unique identifiers of the new test cases. Format:
   * `projects//locations//agents//testCases/`.
   */
  names?: string[];
}

/**
 * Instructs the speech recognizer on how to process the audio content.
 */
export interface GoogleCloudDialogflowCxV3InputAudioConfig {
  /**
   * Required. Audio encoding of the audio content to process.
   */
  audioEncoding?:  | "AUDIO_ENCODING_UNSPECIFIED" | "AUDIO_ENCODING_LINEAR_16" | "AUDIO_ENCODING_FLAC" | "AUDIO_ENCODING_MULAW" | "AUDIO_ENCODING_AMR" | "AUDIO_ENCODING_AMR_WB" | "AUDIO_ENCODING_OGG_OPUS" | "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE";
  /**
   * Optional. If `true`, Dialogflow returns SpeechWordInfo in
   * StreamingRecognitionResult with information about the recognized speech
   * words, e.g. start and end time offsets. If false or unspecified, Speech
   * doesn't return any word-level information.
   */
  enableWordInfo?: boolean;
  /**
   * Optional. Which Speech model to select for the given request. Select the
   * model best suited to your domain to get best results. If a model is not
   * explicitly specified, then we auto-select a model based on the parameters
   * in the InputAudioConfig. If enhanced speech model is enabled for the agent
   * and an enhanced version of the specified model for the language does not
   * exist, then the speech is recognized using the standard version of the
   * specified model. Refer to [Cloud Speech API
   * documentation](https://cloud.google.com/speech-to-text/docs/basics#select-model)
   * for more details.
   */
  model?: string;
  /**
   * Optional. Which variant of the Speech model to use.
   */
  modelVariant?:  | "SPEECH_MODEL_VARIANT_UNSPECIFIED" | "USE_BEST_AVAILABLE" | "USE_STANDARD" | "USE_ENHANCED";
  /**
   * Optional. A list of strings containing words and phrases that the speech
   * recognizer should recognize with higher likelihood. See [the Cloud Speech
   * documentation](https://cloud.google.com/speech-to-text/docs/basics#phrase-hints)
   * for more details.
   */
  phraseHints?: string[];
  /**
   * Sample rate (in Hertz) of the audio content sent in the query. Refer to
   * [Cloud Speech API
   * documentation](https://cloud.google.com/speech-to-text/docs/basics) for
   * more details.
   */
  sampleRateHertz?: number;
  /**
   * Optional. If `false` (default), recognition does not cease until the
   * client closes the stream. If `true`, the recognizer will detect a single
   * spoken utterance in input audio. Recognition ceases when it detects the
   * audio's voice has stopped or paused. In this case, once a detected intent
   * is received, the client should close the stream and start a new request
   * with a new stream as needed. Note: This setting is relevant only for
   * streaming methods.
   */
  singleUtterance?: boolean;
}

/**
 * An intent represents a user's intent to interact with a conversational
 * agent. You can provide information for the Dialogflow API to use to match
 * user input to an intent by adding training phrases (i.e., examples of user
 * input) to your intent.
 */
export interface GoogleCloudDialogflowCxV3Intent {
  /**
   * Human readable description for better understanding an intent like its
   * scope, content, result etc. Maximum character limit: 140 characters.
   */
  description?: string;
  /**
   * Required. The human-readable name of the intent, unique within the agent.
   */
  displayName?: string;
  /**
   * Indicates whether this is a fallback intent. Currently only default
   * fallback intent is allowed in the agent, which is added upon agent
   * creation. Adding training phrases to fallback intent is useful in the case
   * of requests that are mistakenly matched, since training phrases assigned to
   * fallback intents act as negative examples that triggers no-match event.
   */
  isFallback?: boolean;
  /**
   * The key/value metadata to label an intent. Labels can contain lowercase
   * letters, digits and the symbols '-' and '_'. International characters are
   * allowed, including letters from unicase alphabets. Keys must start with a
   * letter. Keys and values can be no longer than 63 characters and no more
   * than 128 bytes. Prefix "sys-" is reserved for Dialogflow defined labels.
   * Currently allowed Dialogflow defined labels include: * sys-head *
   * sys-contextual The above labels do not require value. "sys-head" means the
   * intent is a head intent. "sys.contextual" means the intent is a contextual
   * intent.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The unique identifier of the intent. Required for the Intents.UpdateIntent
   * method. Intents.CreateIntent populates the name automatically. Format:
   * `projects//locations//agents//intents/`.
   */
  name?: string;
  /**
   * The collection of parameters associated with the intent.
   */
  parameters?: GoogleCloudDialogflowCxV3IntentParameter[];
  /**
   * The priority of this intent. Higher numbers represent higher priorities. -
   * If the supplied value is unspecified or 0, the service translates the value
   * to 500,000, which corresponds to the `Normal` priority in the console. - If
   * the supplied value is negative, the intent is ignored in runtime detect
   * intent requests.
   */
  priority?: number;
  /**
   * The collection of training phrases the agent is trained on to identify the
   * intent.
   */
  trainingPhrases?: GoogleCloudDialogflowCxV3IntentTrainingPhrase[];
}

/**
 * Intent coverage represents the percentage of all possible intents in the
 * agent that are triggered in any of a parent's test cases.
 */
export interface GoogleCloudDialogflowCxV3IntentCoverage {
  /**
   * The percent of intents in the agent that are covered.
   */
  coverageScore?: number;
  /**
   * The list of Intents present in the agent
   */
  intents?: GoogleCloudDialogflowCxV3IntentCoverageIntent[];
}

/**
 * The agent's intent.
 */
export interface GoogleCloudDialogflowCxV3IntentCoverageIntent {
  /**
   * Whether or not the intent is covered by at least one of the agent's test
   * cases.
   */
  covered?: boolean;
  /**
   * The intent full resource name
   */
  intent?: string;
}

/**
 * Represents the intent to trigger programmatically rather than as a result of
 * natural language processing.
 */
export interface GoogleCloudDialogflowCxV3IntentInput {
  /**
   * Required. The unique identifier of the intent. Format:
   * `projects//locations//agents//intents/`.
   */
  intent?: string;
}

/**
 * Represents an intent parameter.
 */
export interface GoogleCloudDialogflowCxV3IntentParameter {
  /**
   * Required. The entity type of the parameter. Format:
   * `projects/-/locations/-/agents/-/entityTypes/` for system entity types (for
   * example, `projects/-/locations/-/agents/-/entityTypes/sys.date`), or
   * `projects//locations//agents//entityTypes/` for developer entity types.
   */
  entityType?: string;
  /**
   * Required. The unique identifier of the parameter. This field is used by
   * training phrases to annotate their parts.
   */
  id?: string;
  /**
   * Indicates whether the parameter represents a list of values.
   */
  isList?: boolean;
  /**
   * Indicates whether the parameter content should be redacted in log. If
   * redaction is enabled, the parameter content will be replaced by parameter
   * name during logging. Note: the parameter content is subject to redaction if
   * either parameter level redaction or entity type level redaction is enabled.
   */
  redact?: boolean;
}

/**
 * Represents an example that the agent is trained on to identify the intent.
 */
export interface GoogleCloudDialogflowCxV3IntentTrainingPhrase {
  /**
   * Output only. The unique identifier of the training phrase.
   */
  id?: string;
  /**
   * Required. The ordered list of training phrase parts. The parts are
   * concatenated in order to form the training phrase. Note: The API does not
   * automatically annotate training phrases like the Dialogflow Console does.
   * Note: Do not forget to include whitespace at part boundaries, so the
   * training phrase is well formatted when the parts are concatenated. If the
   * training phrase does not need to be annotated with parameters, you just
   * need a single part with only the Part.text field set. If you want to
   * annotate the training phrase, you must create multiple parts, where the
   * fields of each part are populated in one of two ways: - `Part.text` is set
   * to a part of the phrase that has no parameters. - `Part.text` is set to a
   * part of the phrase that you want to annotate, and the `parameter_id` field
   * is set.
   */
  parts?: GoogleCloudDialogflowCxV3IntentTrainingPhrasePart[];
  /**
   * Indicates how many times this example was added to the intent.
   */
  repeatCount?: number;
}

/**
 * Represents a part of a training phrase.
 */
export interface GoogleCloudDialogflowCxV3IntentTrainingPhrasePart {
  /**
   * The parameter used to annotate this part of the training phrase. This
   * field is required for annotated parts of the training phrase.
   */
  parameterId?: string;
  /**
   * Required. The text for this part.
   */
  text?: string;
}

/**
 * The response message for Agents.ListAgents.
 */
export interface GoogleCloudDialogflowCxV3ListAgentsResponse {
  /**
   * The list of agents. There will be a maximum number of items returned based
   * on the page_size field in the request.
   */
  agents?: GoogleCloudDialogflowCxV3Agent[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * The response message for Changelogs.ListChangelogs.
 */
export interface GoogleCloudDialogflowCxV3ListChangelogsResponse {
  /**
   * The list of changelogs. There will be a maximum number of items returned
   * based on the page_size field in the request. The changelogs will be ordered
   * by timestamp.
   */
  changelogs?: GoogleCloudDialogflowCxV3Changelog[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDialogflowCxV3ListChangelogsResponse(data: any): GoogleCloudDialogflowCxV3ListChangelogsResponse {
  return {
    ...data,
    changelogs: data["changelogs"] !== undefined ? data["changelogs"].map((item: any) => (serializeGoogleCloudDialogflowCxV3Changelog(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ListChangelogsResponse(data: any): GoogleCloudDialogflowCxV3ListChangelogsResponse {
  return {
    ...data,
    changelogs: data["changelogs"] !== undefined ? data["changelogs"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3Changelog(item))) : undefined,
  };
}

/**
 * The response message for Environments.ListTestCaseResults.
 */
export interface GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse {
  /**
   * The list of continuous test results.
   */
  continuousTestResults?: GoogleCloudDialogflowCxV3ContinuousTestResult[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDialogflowCxV3ListContinuousTestResultsResponse(data: any): GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse {
  return {
    ...data,
    continuousTestResults: data["continuousTestResults"] !== undefined ? data["continuousTestResults"].map((item: any) => (serializeGoogleCloudDialogflowCxV3ContinuousTestResult(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ListContinuousTestResultsResponse(data: any): GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse {
  return {
    ...data,
    continuousTestResults: data["continuousTestResults"] !== undefined ? data["continuousTestResults"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3ContinuousTestResult(item))) : undefined,
  };
}

/**
 * The response message for Deployments.ListDeployments.
 */
export interface GoogleCloudDialogflowCxV3ListDeploymentsResponse {
  /**
   * The list of deployments. There will be a maximum number of items returned
   * based on the page_size field in the request. The list may in some cases be
   * empty or contain fewer entries than page_size even if this isn't the last
   * page.
   */
  deployments?: GoogleCloudDialogflowCxV3Deployment[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDialogflowCxV3ListDeploymentsResponse(data: any): GoogleCloudDialogflowCxV3ListDeploymentsResponse {
  return {
    ...data,
    deployments: data["deployments"] !== undefined ? data["deployments"].map((item: any) => (serializeGoogleCloudDialogflowCxV3Deployment(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ListDeploymentsResponse(data: any): GoogleCloudDialogflowCxV3ListDeploymentsResponse {
  return {
    ...data,
    deployments: data["deployments"] !== undefined ? data["deployments"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3Deployment(item))) : undefined,
  };
}

/**
 * The response message for EntityTypes.ListEntityTypes.
 */
export interface GoogleCloudDialogflowCxV3ListEntityTypesResponse {
  /**
   * The list of entity types. There will be a maximum number of items returned
   * based on the page_size field in the request.
   */
  entityTypes?: GoogleCloudDialogflowCxV3EntityType[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * The response message for Environments.ListEnvironments.
 */
export interface GoogleCloudDialogflowCxV3ListEnvironmentsResponse {
  /**
   * The list of environments. There will be a maximum number of items returned
   * based on the page_size field in the request. The list may in some cases be
   * empty or contain fewer entries than page_size even if this isn't the last
   * page.
   */
  environments?: GoogleCloudDialogflowCxV3Environment[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDialogflowCxV3ListEnvironmentsResponse(data: any): GoogleCloudDialogflowCxV3ListEnvironmentsResponse {
  return {
    ...data,
    environments: data["environments"] !== undefined ? data["environments"].map((item: any) => (serializeGoogleCloudDialogflowCxV3Environment(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ListEnvironmentsResponse(data: any): GoogleCloudDialogflowCxV3ListEnvironmentsResponse {
  return {
    ...data,
    environments: data["environments"] !== undefined ? data["environments"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3Environment(item))) : undefined,
  };
}

/**
 * The response message for Experiments.ListExperiments.
 */
export interface GoogleCloudDialogflowCxV3ListExperimentsResponse {
  /**
   * The list of experiments. There will be a maximum number of items returned
   * based on the page_size field in the request. The list may in some cases be
   * empty or contain fewer entries than page_size even if this isn't the last
   * page.
   */
  experiments?: GoogleCloudDialogflowCxV3Experiment[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDialogflowCxV3ListExperimentsResponse(data: any): GoogleCloudDialogflowCxV3ListExperimentsResponse {
  return {
    ...data,
    experiments: data["experiments"] !== undefined ? data["experiments"].map((item: any) => (serializeGoogleCloudDialogflowCxV3Experiment(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ListExperimentsResponse(data: any): GoogleCloudDialogflowCxV3ListExperimentsResponse {
  return {
    ...data,
    experiments: data["experiments"] !== undefined ? data["experiments"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3Experiment(item))) : undefined,
  };
}

/**
 * The response message for Flows.ListFlows.
 */
export interface GoogleCloudDialogflowCxV3ListFlowsResponse {
  /**
   * The list of flows. There will be a maximum number of items returned based
   * on the page_size field in the request.
   */
  flows?: GoogleCloudDialogflowCxV3Flow[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * The response message for Intents.ListIntents.
 */
export interface GoogleCloudDialogflowCxV3ListIntentsResponse {
  /**
   * The list of intents. There will be a maximum number of items returned
   * based on the page_size field in the request.
   */
  intents?: GoogleCloudDialogflowCxV3Intent[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

/**
 * The response message for Pages.ListPages.
 */
export interface GoogleCloudDialogflowCxV3ListPagesResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The list of pages. There will be a maximum number of items returned based
   * on the page_size field in the request.
   */
  pages?: GoogleCloudDialogflowCxV3Page[];
}

/**
 * The response message for SecuritySettings.ListSecuritySettings.
 */
export interface GoogleCloudDialogflowCxV3ListSecuritySettingsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The list of security settings.
   */
  securitySettings?: GoogleCloudDialogflowCxV3SecuritySettings[];
}

/**
 * The response message for SessionEntityTypes.ListSessionEntityTypes.
 */
export interface GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The list of session entity types. There will be a maximum number of items
   * returned based on the page_size field in the request.
   */
  sessionEntityTypes?: GoogleCloudDialogflowCxV3SessionEntityType[];
}

/**
 * The response message for TestCases.ListTestCaseResults.
 */
export interface GoogleCloudDialogflowCxV3ListTestCaseResultsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The list of test case results.
   */
  testCaseResults?: GoogleCloudDialogflowCxV3TestCaseResult[];
}

function serializeGoogleCloudDialogflowCxV3ListTestCaseResultsResponse(data: any): GoogleCloudDialogflowCxV3ListTestCaseResultsResponse {
  return {
    ...data,
    testCaseResults: data["testCaseResults"] !== undefined ? data["testCaseResults"].map((item: any) => (serializeGoogleCloudDialogflowCxV3TestCaseResult(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ListTestCaseResultsResponse(data: any): GoogleCloudDialogflowCxV3ListTestCaseResultsResponse {
  return {
    ...data,
    testCaseResults: data["testCaseResults"] !== undefined ? data["testCaseResults"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3TestCaseResult(item))) : undefined,
  };
}

/**
 * The response message for TestCases.ListTestCases.
 */
export interface GoogleCloudDialogflowCxV3ListTestCasesResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The list of test cases. There will be a maximum number of items returned
   * based on the page_size field in the request.
   */
  testCases?: GoogleCloudDialogflowCxV3TestCase[];
}

function serializeGoogleCloudDialogflowCxV3ListTestCasesResponse(data: any): GoogleCloudDialogflowCxV3ListTestCasesResponse {
  return {
    ...data,
    testCases: data["testCases"] !== undefined ? data["testCases"].map((item: any) => (serializeGoogleCloudDialogflowCxV3TestCase(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ListTestCasesResponse(data: any): GoogleCloudDialogflowCxV3ListTestCasesResponse {
  return {
    ...data,
    testCases: data["testCases"] !== undefined ? data["testCases"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3TestCase(item))) : undefined,
  };
}

/**
 * The response message for TransitionRouteGroups.ListTransitionRouteGroups.
 */
export interface GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The list of transition route groups. There will be a maximum number of
   * items returned based on the page_size field in the request. The list may in
   * some cases be empty or contain fewer entries than page_size even if this
   * isn't the last page.
   */
  transitionRouteGroups?: GoogleCloudDialogflowCxV3TransitionRouteGroup[];
}

/**
 * The response message for Versions.ListVersions.
 */
export interface GoogleCloudDialogflowCxV3ListVersionsResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * A list of versions. There will be a maximum number of items returned based
   * on the page_size field in the request. The list may in some cases be empty
   * or contain fewer entries than page_size even if this isn't the last page.
   */
  versions?: GoogleCloudDialogflowCxV3Version[];
}

/**
 * The response message for Webhooks.ListWebhooks.
 */
export interface GoogleCloudDialogflowCxV3ListWebhooksResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * The list of webhooks. There will be a maximum number of items returned
   * based on the page_size field in the request.
   */
  webhooks?: GoogleCloudDialogflowCxV3Webhook[];
}

function serializeGoogleCloudDialogflowCxV3ListWebhooksResponse(data: any): GoogleCloudDialogflowCxV3ListWebhooksResponse {
  return {
    ...data,
    webhooks: data["webhooks"] !== undefined ? data["webhooks"].map((item: any) => (serializeGoogleCloudDialogflowCxV3Webhook(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ListWebhooksResponse(data: any): GoogleCloudDialogflowCxV3ListWebhooksResponse {
  return {
    ...data,
    webhooks: data["webhooks"] !== undefined ? data["webhooks"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3Webhook(item))) : undefined,
  };
}

/**
 * The request message for Versions.LoadVersion.
 */
export interface GoogleCloudDialogflowCxV3LoadVersionRequest {
  /**
   * This field is used to prevent accidental overwrite of other agent
   * resources, which can potentially impact other flow's behavior. If
   * `allow_override_agent_resources` is false, conflicted agent-level resources
   * will not be overridden (i.e. intents, entities, webhooks).
   */
  allowOverrideAgentResources?: boolean;
}

/**
 * The response message for Environments.LookupEnvironmentHistory.
 */
export interface GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse {
  /**
   * Represents a list of snapshots for an environment. Time of the snapshots
   * is stored in `update_time`.
   */
  environments?: GoogleCloudDialogflowCxV3Environment[];
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse(data: any): GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse {
  return {
    ...data,
    environments: data["environments"] !== undefined ? data["environments"].map((item: any) => (serializeGoogleCloudDialogflowCxV3Environment(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse(data: any): GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse {
  return {
    ...data,
    environments: data["environments"] !== undefined ? data["environments"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3Environment(item))) : undefined,
  };
}

/**
 * Represents one match result of MatchIntent.
 */
export interface GoogleCloudDialogflowCxV3Match {
  /**
   * The confidence of this match. Values range from 0.0 (completely uncertain)
   * to 1.0 (completely certain). This value is for informational purpose only
   * and is only used to help match the best intent within the classification
   * threshold. This value may change for the same end-user expression at any
   * time due to a model retraining or change in implementation.
   */
  confidence?: number;
  /**
   * The event that matched the query. Filled for `EVENT`, `NO_MATCH` and
   * `NO_INPUT` match types.
   */
  event?: string;
  /**
   * The Intent that matched the query. Some, not all fields are filled in this
   * message, including but not limited to: `name` and `display_name`. Only
   * filled for `INTENT` match type.
   */
  intent?: GoogleCloudDialogflowCxV3Intent;
  /**
   * Type of this Match.
   */
  matchType?:  | "MATCH_TYPE_UNSPECIFIED" | "INTENT" | "DIRECT_INTENT" | "PARAMETER_FILLING" | "NO_MATCH" | "NO_INPUT" | "EVENT";
  /**
   * The collection of parameters extracted from the query. Depending on your
   * protocol or client library language, this is a map, associative array,
   * symbol table, dictionary, or JSON object composed of a collection of
   * (MapKey, MapValue) pairs: * MapKey type: string * MapKey value: parameter
   * name * MapValue type: If parameter's entity type is a composite entity then
   * use map, otherwise, depending on the parameter value type, it could be one
   * of string, number, boolean, null, list or map. * MapValue value: If
   * parameter's entity type is a composite entity then use map from composite
   * entity property names to property values, otherwise, use parameter value.
   */
  parameters?: {
    [key: string]: any
  };
  /**
   * Final text input which was matched during MatchIntent. This value can be
   * different from original input sent in request because of spelling
   * correction or other processing.
   */
  resolvedInput?: string;
}

/**
 * Request of MatchIntent.
 */
export interface GoogleCloudDialogflowCxV3MatchIntentRequest {
  /**
   * Persist session parameter changes from `query_params`.
   */
  persistParameterChanges?: boolean;
  /**
   * Required. The input specification.
   */
  queryInput?: GoogleCloudDialogflowCxV3QueryInput;
  /**
   * The parameters of this query.
   */
  queryParams?: GoogleCloudDialogflowCxV3QueryParameters;
}

function serializeGoogleCloudDialogflowCxV3MatchIntentRequest(data: any): GoogleCloudDialogflowCxV3MatchIntentRequest {
  return {
    ...data,
    queryInput: data["queryInput"] !== undefined ? serializeGoogleCloudDialogflowCxV3QueryInput(data["queryInput"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3MatchIntentRequest(data: any): GoogleCloudDialogflowCxV3MatchIntentRequest {
  return {
    ...data,
    queryInput: data["queryInput"] !== undefined ? deserializeGoogleCloudDialogflowCxV3QueryInput(data["queryInput"]) : undefined,
  };
}

/**
 * Response of MatchIntent.
 */
export interface GoogleCloudDialogflowCxV3MatchIntentResponse {
  /**
   * The current Page. Some, not all fields are filled in this message,
   * including but not limited to `name` and `display_name`.
   */
  currentPage?: GoogleCloudDialogflowCxV3Page;
  /**
   * Match results, if more than one, ordered descendingly by the confidence we
   * have that the particular intent matches the query.
   */
  matches?: GoogleCloudDialogflowCxV3Match[];
  /**
   * If natural language text was provided as input, this field will contain a
   * copy of the text.
   */
  text?: string;
  /**
   * If natural language speech audio was provided as input, this field will
   * contain the transcript for the audio.
   */
  transcript?: string;
  /**
   * If an event was provided as input, this field will contain a copy of the
   * event name.
   */
  triggerEvent?: string;
  /**
   * If an intent was provided as input, this field will contain a copy of the
   * intent identifier. Format: `projects//locations//agents//intents/`.
   */
  triggerIntent?: string;
}

/**
 * Settings related to NLU.
 */
export interface GoogleCloudDialogflowCxV3NluSettings {
  /**
   * To filter out false positive results and still get variety in matched
   * natural language inputs for your agent, you can tune the machine learning
   * classification threshold. If the returned score value is less than the
   * threshold value, then a no-match event will be triggered. The score values
   * range from 0.0 (completely uncertain) to 1.0 (completely certain). If set
   * to 0.0, the default of 0.3 is used.
   */
  classificationThreshold?: number;
  /**
   * Indicates NLU model training mode.
   */
  modelTrainingMode?:  | "MODEL_TRAINING_MODE_UNSPECIFIED" | "MODEL_TRAINING_MODE_AUTOMATIC" | "MODEL_TRAINING_MODE_MANUAL";
  /**
   * Indicates the type of NLU model.
   */
  modelType?:  | "MODEL_TYPE_UNSPECIFIED" | "MODEL_TYPE_STANDARD" | "MODEL_TYPE_ADVANCED";
}

/**
 * Instructs the speech synthesizer how to generate the output audio content.
 */
export interface GoogleCloudDialogflowCxV3OutputAudioConfig {
  /**
   * Required. Audio encoding of the synthesized audio content.
   */
  audioEncoding?:  | "OUTPUT_AUDIO_ENCODING_UNSPECIFIED" | "OUTPUT_AUDIO_ENCODING_LINEAR_16" | "OUTPUT_AUDIO_ENCODING_MP3" | "OUTPUT_AUDIO_ENCODING_MP3_64_KBPS" | "OUTPUT_AUDIO_ENCODING_OGG_OPUS" | "OUTPUT_AUDIO_ENCODING_MULAW";
  /**
   * Optional. The synthesis sample rate (in hertz) for this audio. If not
   * provided, then the synthesizer will use the default sample rate based on
   * the audio encoding. If this is different from the voice's natural sample
   * rate, then the synthesizer will honor this request by converting to the
   * desired sample rate (which might result in worse audio quality).
   */
  sampleRateHertz?: number;
  /**
   * Optional. Configuration of how speech should be synthesized.
   */
  synthesizeSpeechConfig?: GoogleCloudDialogflowCxV3SynthesizeSpeechConfig;
}

/**
 * A Dialogflow CX conversation (session) can be described and visualized as a
 * state machine. The states of a CX session are represented by pages. For each
 * flow, you define many pages, where your combined pages can handle a complete
 * conversation on the topics the flow is designed for. At any given moment,
 * exactly one page is the current page, the current page is considered active,
 * and the flow associated with that page is considered active. Every flow has a
 * special start page. When a flow initially becomes active, the start page page
 * becomes the current page. For each conversational turn, the current page will
 * either stay the same or transition to another page. You configure each page
 * to collect information from the end-user that is relevant for the
 * conversational state represented by the page. For more information, see the
 * [Page guide](https://cloud.google.com/dialogflow/cx/docs/concept/page).
 */
export interface GoogleCloudDialogflowCxV3Page {
  /**
   * Required. The human-readable name of the page, unique within the flow.
   */
  displayName?: string;
  /**
   * The fulfillment to call when the session is entering the page.
   */
  entryFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  /**
   * Handlers associated with the page to handle events such as webhook errors,
   * no match or no input.
   */
  eventHandlers?: GoogleCloudDialogflowCxV3EventHandler[];
  /**
   * The form associated with the page, used for collecting parameters relevant
   * to the page.
   */
  form?: GoogleCloudDialogflowCxV3Form;
  /**
   * The unique identifier of the page. Required for the Pages.UpdatePage
   * method. Pages.CreatePage populates the name automatically. Format:
   * `projects//locations//agents//flows//pages/`.
   */
  name?: string;
  /**
   * Ordered list of `TransitionRouteGroups` associated with the page.
   * Transition route groups must be unique within a page. * If multiple
   * transition routes within a page scope refer to the same intent, then the
   * precedence order is: page's transition route -> page's transition route
   * group -> flow's transition routes. * If multiple transition route groups
   * within a page contain the same intent, then the first group in the ordered
   * list takes precedence.
   * Format:`projects//locations//agents//flows//transitionRouteGroups/`.
   */
  transitionRouteGroups?: string[];
  /**
   * A list of transitions for the transition rules of this page. They route
   * the conversation to another page in the same flow, or another flow. When we
   * are in a certain page, the TransitionRoutes are evalauted in the following
   * order: * TransitionRoutes defined in the page with intent specified. *
   * TransitionRoutes defined in the transition route groups with intent
   * specified. * TransitionRoutes defined in flow with intent specified. *
   * TransitionRoutes defined in the transition route groups with intent
   * specified. * TransitionRoutes defined in the page with only condition
   * specified. * TransitionRoutes defined in the transition route groups with
   * only condition specified.
   */
  transitionRoutes?: GoogleCloudDialogflowCxV3TransitionRoute[];
}

/**
 * Represents page information communicated to and from the webhook.
 */
export interface GoogleCloudDialogflowCxV3PageInfo {
  /**
   * Always present for WebhookRequest. Ignored for WebhookResponse. The unique
   * identifier of the current page. Format:
   * `projects//locations//agents//flows//pages/`.
   */
  currentPage?: string;
  /**
   * Always present for WebhookRequest. Ignored for WebhookResponse. The
   * display name of the current page.
   */
  displayName?: string;
  /**
   * Optional for both WebhookRequest and WebhookResponse. Information about
   * the form.
   */
  formInfo?: GoogleCloudDialogflowCxV3PageInfoFormInfo;
}

/**
 * Represents form information.
 */
export interface GoogleCloudDialogflowCxV3PageInfoFormInfo {
  /**
   * Optional for both WebhookRequest and WebhookResponse. The parameters
   * contained in the form. Note that the webhook cannot add or remove any form
   * parameter.
   */
  parameterInfo?: GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo[];
}

/**
 * Represents parameter information.
 */
export interface GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo {
  /**
   * Always present for WebhookRequest. Required for WebhookResponse. The
   * human-readable name of the parameter, unique within the form. This field
   * cannot be modified by the webhook.
   */
  displayName?: string;
  /**
   * Optional for WebhookRequest. Ignored for WebhookResponse. Indicates if the
   * parameter value was just collected on the last conversation turn.
   */
  justCollected?: boolean;
  /**
   * Optional for both WebhookRequest and WebhookResponse. Indicates whether
   * the parameter is required. Optional parameters will not trigger prompts;
   * however, they are filled if the user specifies them. Required parameters
   * must be filled before form filling concludes.
   */
  required?: boolean;
  /**
   * Always present for WebhookRequest. Required for WebhookResponse. The state
   * of the parameter. This field can be set to INVALID by the webhook to
   * invalidate the parameter; other values set by the webhook will be ignored.
   */
  state?:  | "PARAMETER_STATE_UNSPECIFIED" | "EMPTY" | "INVALID" | "FILLED";
  /**
   * Optional for both WebhookRequest and WebhookResponse. The value of the
   * parameter. This field can be set by the webhook to change the parameter
   * value.
   */
  value?: any;
}

/**
 * Represents the query input. It can contain one of: 1. A conversational query
 * in the form of text. 2. An intent query that specifies which intent to
 * trigger. 3. Natural language speech audio to be processed. 4. An event to be
 * triggered.
 */
export interface GoogleCloudDialogflowCxV3QueryInput {
  /**
   * The natural language speech audio to be processed.
   */
  audio?: GoogleCloudDialogflowCxV3AudioInput;
  /**
   * The DTMF event to be handled.
   */
  dtmf?: GoogleCloudDialogflowCxV3DtmfInput;
  /**
   * The event to be triggered.
   */
  event?: GoogleCloudDialogflowCxV3EventInput;
  /**
   * The intent to be triggered.
   */
  intent?: GoogleCloudDialogflowCxV3IntentInput;
  /**
   * Required. The language of the input. See [Language
   * Support](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * for a list of the currently supported language codes. Note that queries in
   * the same session do not necessarily need to specify the same language.
   */
  languageCode?: string;
  /**
   * The natural language text to be processed.
   */
  text?: GoogleCloudDialogflowCxV3TextInput;
}

function serializeGoogleCloudDialogflowCxV3QueryInput(data: any): GoogleCloudDialogflowCxV3QueryInput {
  return {
    ...data,
    audio: data["audio"] !== undefined ? serializeGoogleCloudDialogflowCxV3AudioInput(data["audio"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3QueryInput(data: any): GoogleCloudDialogflowCxV3QueryInput {
  return {
    ...data,
    audio: data["audio"] !== undefined ? deserializeGoogleCloudDialogflowCxV3AudioInput(data["audio"]) : undefined,
  };
}

/**
 * Represents the parameters of a conversational query.
 */
export interface GoogleCloudDialogflowCxV3QueryParameters {
  /**
   * Configures whether sentiment analysis should be performed. If not
   * provided, sentiment analysis is not performed.
   */
  analyzeQueryTextSentiment?: boolean;
  /**
   * The channel which this query is for. If specified, only the
   * ResponseMessage associated with the channel will be returned. If no
   * ResponseMessage is associated with the channel, it falls back to the
   * ResponseMessage with unspecified channel. If unspecified, the
   * ResponseMessage with unspecified channel will be returned.
   */
  channel?: string;
  /**
   * The unique identifier of the page to override the current page in the
   * session. Format: `projects//locations//agents//flows//pages/`. If
   * `current_page` is specified, the previous state of the session will be
   * ignored by Dialogflow, including the previous page and the previous session
   * parameters. In most cases, current_page and parameters should be configured
   * together to direct a session to a specific state.
   */
  currentPage?: string;
  /**
   * Whether to disable webhook calls for this request.
   */
  disableWebhook?: boolean;
  /**
   * A list of flow versions to override for the request. Format:
   * `projects//locations//agents//flows//versions/`. If version 1 of flow X is
   * included in this list, the traffic of flow X will go through version 1
   * regardless of the version configuration in the environment. Each flow can
   * have at most one version specified in this list.
   */
  flowVersions?: string[];
  /**
   * The geo location of this conversational query.
   */
  geoLocation?: GoogleTypeLatLng;
  /**
   * Additional parameters to be put into session parameters. To remove a
   * parameter from the session, clients should explicitly set the parameter
   * value to null. You can reference the session parameters in the agent with
   * the following format: $session.params.parameter-id. Depending on your
   * protocol or client library language, this is a map, associative array,
   * symbol table, dictionary, or JSON object composed of a collection of
   * (MapKey, MapValue) pairs: * MapKey type: string * MapKey value: parameter
   * name * MapValue type: If parameter's entity type is a composite entity then
   * use map, otherwise, depending on the parameter value type, it could be one
   * of string, number, boolean, null, list or map. * MapValue value: If
   * parameter's entity type is a composite entity then use map from composite
   * entity property names to property values, otherwise, use parameter value.
   */
  parameters?: {
    [key: string]: any
  };
  /**
   * This field can be used to pass custom data into the webhook associated
   * with the agent. Arbitrary JSON objects are supported. Some integrations
   * that query a Dialogflow agent may provide additional information in the
   * payload. In particular, for the Dialogflow Phone Gateway integration, this
   * field has the form: ``` { "telephony": { "caller_id": "+18558363987" } }
   * ```
   */
  payload?: {
    [key: string]: any
  };
  /**
   * Additional session entity types to replace or extend developer entity
   * types with. The entity synonyms apply to all languages and persist for the
   * session of this query.
   */
  sessionEntityTypes?: GoogleCloudDialogflowCxV3SessionEntityType[];
  /**
   * The time zone of this conversational query from the [time zone
   * database](https://www.iana.org/time-zones), e.g., America/New_York,
   * Europe/Paris. If not provided, the time zone specified in the agent is
   * used.
   */
  timeZone?: string;
  /**
   * This field can be used to pass HTTP headers for a webhook call. These
   * headers will be sent to webhook along with the headers that have been
   * configured through Dialogflow web console. The headers defined within this
   * field will overwrite the headers configured through Dialogflow console if
   * there is a conflict. Header names are case-insensitive. Google's specified
   * headers are not allowed. Including: "Host", "Content-Length", "Connection",
   * "From", "User-Agent", "Accept-Encoding", "If-Modified-Since",
   * "If-None-Match", "X-Forwarded-For", etc.
   */
  webhookHeaders?: {
    [key: string]: string
  };
}

/**
 * Represents the result of a conversational query.
 */
export interface GoogleCloudDialogflowCxV3QueryResult {
  /**
   * The current Page. Some, not all fields are filled in this message,
   * including but not limited to `name` and `display_name`.
   */
  currentPage?: GoogleCloudDialogflowCxV3Page;
  /**
   * The free-form diagnostic info. For example, this field could contain
   * webhook call latency. The fields of this data can change without notice, so
   * you should not write code that depends on its structure. One of the fields
   * is called "Alternative Matched Intents", which may aid with debugging. The
   * following describes these intent results: - The list is empty if no intent
   * was matched to end-user input. - Only intents that are referenced in the
   * currently active flow are included. - The matched intent is included. -
   * Other intents that could have matched end-user input, but did not match
   * because they are referenced by intent routes that are out of
   * [scope](https://cloud.google.com/dialogflow/cx/docs/concept/handler#scope),
   * are included. - Other intents referenced by intent routes in scope that
   * matched end-user input, but had a lower confidence score.
   */
  diagnosticInfo?: {
    [key: string]: any
  };
  /**
   * If a DTMF was provided as input, this field will contain a copy of the
   * DTMFInput.
   */
  dtmf?: GoogleCloudDialogflowCxV3DtmfInput;
  /**
   * The Intent that matched the conversational query. Some, not all fields are
   * filled in this message, including but not limited to: `name` and
   * `display_name`. This field is deprecated, please use QueryResult.match
   * instead.
   */
  intent?: GoogleCloudDialogflowCxV3Intent;
  /**
   * The intent detection confidence. Values range from 0.0 (completely
   * uncertain) to 1.0 (completely certain). This value is for informational
   * purpose only and is only used to help match the best intent within the
   * classification threshold. This value may change for the same end-user
   * expression at any time due to a model retraining or change in
   * implementation. This field is deprecated, please use QueryResult.match
   * instead.
   */
  intentDetectionConfidence?: number;
  /**
   * The language that was triggered during intent detection. See [Language
   * Support](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * for a list of the currently supported language codes.
   */
  languageCode?: string;
  /**
   * Intent match result, could be an intent or an event.
   */
  match?: GoogleCloudDialogflowCxV3Match;
  /**
   * The collected session parameters. Depending on your protocol or client
   * library language, this is a map, associative array, symbol table,
   * dictionary, or JSON object composed of a collection of (MapKey, MapValue)
   * pairs: * MapKey type: string * MapKey value: parameter name * MapValue
   * type: If parameter's entity type is a composite entity then use map,
   * otherwise, depending on the parameter value type, it could be one of
   * string, number, boolean, null, list or map. * MapValue value: If
   * parameter's entity type is a composite entity then use map from composite
   * entity property names to property values, otherwise, use parameter value.
   */
  parameters?: {
    [key: string]: any
  };
  /**
   * The list of rich messages returned to the client. Responses vary from
   * simple text messages to more sophisticated, structured payloads used to
   * drive complex logic.
   */
  responseMessages?: GoogleCloudDialogflowCxV3ResponseMessage[];
  /**
   * The sentiment analyss result, which depends on
   * `analyze_query_text_sentiment`, specified in the request.
   */
  sentimentAnalysisResult?: GoogleCloudDialogflowCxV3SentimentAnalysisResult;
  /**
   * If natural language text was provided as input, this field will contain a
   * copy of the text.
   */
  text?: string;
  /**
   * If natural language speech audio was provided as input, this field will
   * contain the transcript for the audio.
   */
  transcript?: string;
  /**
   * If an event was provided as input, this field will contain the name of the
   * event.
   */
  triggerEvent?: string;
  /**
   * If an intent was provided as input, this field will contain a copy of the
   * intent identifier. Format: `projects//locations//agents//intents/`.
   */
  triggerIntent?: string;
  /**
   * The list of webhook payload in WebhookResponse.payload, in the order of
   * call sequence. If some webhook call fails or doesn't return any payload, an
   * empty `Struct` would be used instead.
   */
  webhookPayloads?: {
    [key: string]: any
  }[];
  /**
   * The list of webhook call status in the order of call sequence.
   */
  webhookStatuses?: GoogleRpcStatus[];
}

/**
 * Metadata for ReloadDocument operation.
 */
export interface GoogleCloudDialogflowCxV3ReloadDocumentOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowCxV3GenericKnowledgeOperationMetadata;
}

/**
 * Resource name and display name.
 */
export interface GoogleCloudDialogflowCxV3ResourceName {
  /**
   * Display name.
   */
  displayName?: string;
  /**
   * Name.
   */
  name?: string;
}

/**
 * Represents a response message that can be returned by a conversational
 * agent. Response messages are also used for output audio synthesis. The
 * approach is as follows: * If at least one OutputAudioText response is
 * present, then all OutputAudioText responses are linearly concatenated, and
 * the result is used for output audio synthesis. * If the OutputAudioText
 * responses are a mixture of text and SSML, then the concatenated result is
 * treated as SSML; otherwise, the result is treated as either text or SSML as
 * appropriate. The agent designer should ideally use either text or SSML
 * consistently throughout the bot design. * Otherwise, all Text responses are
 * linearly concatenated, and the result is used for output audio synthesis.
 * This approach allows for more sophisticated user experience scenarios, where
 * the text displayed to the user may differ from what is heard.
 */
export interface GoogleCloudDialogflowCxV3ResponseMessage {
  /**
   * The channel which the response is associated with. Clients can specify the
   * channel via QueryParameters.channel, and only associated channel response
   * will be returned.
   */
  channel?: string;
  /**
   * Indicates that the conversation succeeded.
   */
  conversationSuccess?: GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess;
  /**
   * Output only. A signal that indicates the interaction with the Dialogflow
   * agent has ended. This message is generated by Dialogflow only when the
   * conversation reaches `END_SESSION` page. It is not supposed to be defined
   * by the user. It's guaranteed that there is at most one such message in each
   * response.
   */
  readonly endInteraction?: GoogleCloudDialogflowCxV3ResponseMessageEndInteraction;
  /**
   * Hands off conversation to a human agent.
   */
  liveAgentHandoff?: GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff;
  /**
   * Output only. An audio response message composed of both the synthesized
   * Dialogflow agent responses and responses defined via play_audio. This
   * message is generated by Dialogflow only and not supposed to be defined by
   * the user.
   */
  readonly mixedAudio?: GoogleCloudDialogflowCxV3ResponseMessageMixedAudio;
  /**
   * A text or ssml response that is preferentially used for TTS output audio
   * synthesis, as described in the comment on the ResponseMessage message.
   */
  outputAudioText?: GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText;
  /**
   * Returns a response containing a custom, platform-specific payload.
   */
  payload?: {
    [key: string]: any
  };
  /**
   * Signal that the client should play an audio clip hosted at a
   * client-specific URI. Dialogflow uses this to construct mixed_audio.
   * However, Dialogflow itself does not try to read or process the URI in any
   * way.
   */
  playAudio?: GoogleCloudDialogflowCxV3ResponseMessagePlayAudio;
  /**
   * A signal that the client should transfer the phone call connected to this
   * agent to a third-party endpoint.
   */
  telephonyTransferCall?: GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall;
  /**
   * Returns a text response.
   */
  text?: GoogleCloudDialogflowCxV3ResponseMessageText;
}

/**
 * Indicates that the conversation succeeded, i.e., the bot handled the issue
 * that the customer talked to it about. Dialogflow only uses this to determine
 * which conversations should be counted as successful and doesn't process the
 * metadata in this message in any way. Note that Dialogflow also considers
 * conversations that get to the conversation end page as successful even if
 * they don't return ConversationSuccess. You may set this, for example: * In
 * the entry_fulfillment of a Page if entering the page indicates that the
 * conversation succeeded. * In a webhook response when you determine that you
 * handled the customer issue.
 */
export interface GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess {
  /**
   * Custom metadata. Dialogflow doesn't impose any structure on this.
   */
  metadata?: {
    [key: string]: any
  };
}

/**
 * Indicates that interaction with the Dialogflow agent has ended. This message
 * is generated by Dialogflow only and not supposed to be defined by the user.
 */
export interface GoogleCloudDialogflowCxV3ResponseMessageEndInteraction {
}

/**
 * Indicates that the conversation should be handed off to a live agent.
 * Dialogflow only uses this to determine which conversations were handed off to
 * a human agent for measurement purposes. What else to do with this signal is
 * up to you and your handoff procedures. You may set this, for example: * In
 * the entry_fulfillment of a Page if entering the page indicates something went
 * extremely wrong in the conversation. * In a webhook response when you
 * determine that the customer issue can only be handled by a human.
 */
export interface GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff {
  /**
   * Custom metadata for your handoff procedure. Dialogflow doesn't impose any
   * structure on this.
   */
  metadata?: {
    [key: string]: any
  };
}

/**
 * Represents an audio message that is composed of both segments synthesized
 * from the Dialogflow agent prompts and ones hosted externally at the specified
 * URIs. The external URIs are specified via play_audio. This message is
 * generated by Dialogflow only and not supposed to be defined by the user.
 */
export interface GoogleCloudDialogflowCxV3ResponseMessageMixedAudio {
  /**
   * Segments this audio response is composed of.
   */
  segments?: GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment[];
}

function serializeGoogleCloudDialogflowCxV3ResponseMessageMixedAudio(data: any): GoogleCloudDialogflowCxV3ResponseMessageMixedAudio {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ResponseMessageMixedAudio(data: any): GoogleCloudDialogflowCxV3ResponseMessageMixedAudio {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment(item))) : undefined,
  };
}

/**
 * Represents one segment of audio.
 */
export interface GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment {
  /**
   * Output only. Whether the playback of this segment can be interrupted by
   * the end user's speech and the client should then start the next Dialogflow
   * request.
   */
  readonly allowPlaybackInterruption?: boolean;
  /**
   * Raw audio synthesized from the Dialogflow agent's response using the
   * output config specified in the request.
   */
  audio?: Uint8Array;
  /**
   * Client-specific URI that points to an audio clip accessible to the client.
   * Dialogflow does not impose any validation on it.
   */
  uri?: string;
}

function serializeGoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment(data: any): GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment {
  return {
    ...data,
    audio: data["audio"] !== undefined ? encodeBase64(data["audio"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment(data: any): GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment {
  return {
    ...data,
    audio: data["audio"] !== undefined ? decodeBase64(data["audio"] as string) : undefined,
  };
}

/**
 * A text or ssml response that is preferentially used for TTS output audio
 * synthesis, as described in the comment on the ResponseMessage message.
 */
export interface GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText {
  /**
   * Output only. Whether the playback of this message can be interrupted by
   * the end user's speech and the client can then starts the next Dialogflow
   * request.
   */
  readonly allowPlaybackInterruption?: boolean;
  /**
   * The SSML text to be synthesized. For more information, see
   * [SSML](/speech/text-to-speech/docs/ssml).
   */
  ssml?: string;
  /**
   * The raw text to be synthesized.
   */
  text?: string;
}

/**
 * Specifies an audio clip to be played by the client as part of the response.
 */
export interface GoogleCloudDialogflowCxV3ResponseMessagePlayAudio {
  /**
   * Output only. Whether the playback of this message can be interrupted by
   * the end user's speech and the client can then starts the next Dialogflow
   * request.
   */
  readonly allowPlaybackInterruption?: boolean;
  /**
   * Required. URI of the audio clip. Dialogflow does not impose any validation
   * on this value. It is specific to the client that reads it.
   */
  audioUri?: string;
}

/**
 * Represents the signal that telles the client to transfer the phone call
 * connected to the agent to a third-party endpoint.
 */
export interface GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall {
  /**
   * Transfer the call to a phone number in [E.164
   * format](https://en.wikipedia.org/wiki/E.164).
   */
  phoneNumber?: string;
}

/**
 * The text response message.
 */
export interface GoogleCloudDialogflowCxV3ResponseMessageText {
  /**
   * Output only. Whether the playback of this message can be interrupted by
   * the end user's speech and the client can then starts the next Dialogflow
   * request.
   */
  readonly allowPlaybackInterruption?: boolean;
  /**
   * Required. A collection of text responses.
   */
  text?: string[];
}

/**
 * The request message for Agents.RestoreAgent.
 */
export interface GoogleCloudDialogflowCxV3RestoreAgentRequest {
  /**
   * Uncompressed raw byte content for agent.
   */
  agentContent?: Uint8Array;
  /**
   * The [Google Cloud Storage](https://cloud.google.com/storage/docs/) URI to
   * restore agent from. The format of this URI must be `gs:///`. Dialogflow
   * performs a read operation for the Cloud Storage object on the caller's
   * behalf, so your request authentication must have read permissions for the
   * object. For more information, see [Dialogflow access
   * control](https://cloud.google.com/dialogflow/cx/docs/concept/access-control#storage).
   */
  agentUri?: string;
  /**
   * Agent restore mode. If not specified, `KEEP` is assumed.
   */
  restoreOption?:  | "RESTORE_OPTION_UNSPECIFIED" | "KEEP" | "FALLBACK";
}

function serializeGoogleCloudDialogflowCxV3RestoreAgentRequest(data: any): GoogleCloudDialogflowCxV3RestoreAgentRequest {
  return {
    ...data,
    agentContent: data["agentContent"] !== undefined ? encodeBase64(data["agentContent"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3RestoreAgentRequest(data: any): GoogleCloudDialogflowCxV3RestoreAgentRequest {
  return {
    ...data,
    agentContent: data["agentContent"] !== undefined ? decodeBase64(data["agentContent"] as string) : undefined,
  };
}

/**
 * The configuration for auto rollout.
 */
export interface GoogleCloudDialogflowCxV3RolloutConfig {
  /**
   * The conditions that are used to evaluate the failure of a rollout step. If
   * not specified, no rollout steps will fail. E.g. "containment_rate < 10% OR
   * average_turn_count < 3". See the [conditions
   * reference](https://cloud.google.com/dialogflow/cx/docs/reference/condition).
   */
  failureCondition?: string;
  /**
   * The conditions that are used to evaluate the success of a rollout step. If
   * not specified, all rollout steps will proceed to the next one unless
   * failure conditions are met. E.g. "containment_rate > 60% AND callback_rate
   * < 20%". See the [conditions
   * reference](https://cloud.google.com/dialogflow/cx/docs/reference/condition).
   */
  rolloutCondition?: string;
  /**
   * Steps to roll out a flow version. Steps should be sorted by percentage in
   * ascending order.
   */
  rolloutSteps?: GoogleCloudDialogflowCxV3RolloutConfigRolloutStep[];
}

function serializeGoogleCloudDialogflowCxV3RolloutConfig(data: any): GoogleCloudDialogflowCxV3RolloutConfig {
  return {
    ...data,
    rolloutSteps: data["rolloutSteps"] !== undefined ? data["rolloutSteps"].map((item: any) => (serializeGoogleCloudDialogflowCxV3RolloutConfigRolloutStep(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3RolloutConfig(data: any): GoogleCloudDialogflowCxV3RolloutConfig {
  return {
    ...data,
    rolloutSteps: data["rolloutSteps"] !== undefined ? data["rolloutSteps"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3RolloutConfigRolloutStep(item))) : undefined,
  };
}

/**
 * A single rollout step with specified traffic allocation.
 */
export interface GoogleCloudDialogflowCxV3RolloutConfigRolloutStep {
  /**
   * The name of the rollout step;
   */
  displayName?: string;
  /**
   * The minimum time that this step should last. Should be longer than 1 hour.
   * If not set, the default minimum duration for each step will be 1 hour.
   */
  minDuration?: number /* Duration */;
  /**
   * The percentage of traffic allocated to the flow version of this rollout
   * step. (0%, 100%].
   */
  trafficPercent?: number;
}

function serializeGoogleCloudDialogflowCxV3RolloutConfigRolloutStep(data: any): GoogleCloudDialogflowCxV3RolloutConfigRolloutStep {
  return {
    ...data,
    minDuration: data["minDuration"] !== undefined ? data["minDuration"] : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3RolloutConfigRolloutStep(data: any): GoogleCloudDialogflowCxV3RolloutConfigRolloutStep {
  return {
    ...data,
    minDuration: data["minDuration"] !== undefined ? data["minDuration"] : undefined,
  };
}

/**
 * State of the auto-rollout process.
 */
export interface GoogleCloudDialogflowCxV3RolloutState {
  /**
   * Start time of the current step.
   */
  startTime?: Date;
  /**
   * Display name of the current auto rollout step.
   */
  step?: string;
  /**
   * Index of the current step in the auto rollout steps list.
   */
  stepIndex?: number;
}

function serializeGoogleCloudDialogflowCxV3RolloutState(data: any): GoogleCloudDialogflowCxV3RolloutState {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3RolloutState(data: any): GoogleCloudDialogflowCxV3RolloutState {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Metadata returned for the Environments.RunContinuousTest long running
 * operation.
 */
export interface GoogleCloudDialogflowCxV3RunContinuousTestMetadata {
  /**
   * The test errors.
   */
  errors?: GoogleCloudDialogflowCxV3TestError[];
}

function serializeGoogleCloudDialogflowCxV3RunContinuousTestMetadata(data: any): GoogleCloudDialogflowCxV3RunContinuousTestMetadata {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (serializeGoogleCloudDialogflowCxV3TestError(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3RunContinuousTestMetadata(data: any): GoogleCloudDialogflowCxV3RunContinuousTestMetadata {
  return {
    ...data,
    errors: data["errors"] !== undefined ? data["errors"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3TestError(item))) : undefined,
  };
}

/**
 * The request message for Environments.RunContinuousTest.
 */
export interface GoogleCloudDialogflowCxV3RunContinuousTestRequest {
}

/**
 * The response message for Environments.RunContinuousTest.
 */
export interface GoogleCloudDialogflowCxV3RunContinuousTestResponse {
  /**
   * The result for a continuous test run.
   */
  continuousTestResult?: GoogleCloudDialogflowCxV3ContinuousTestResult;
}

function serializeGoogleCloudDialogflowCxV3RunContinuousTestResponse(data: any): GoogleCloudDialogflowCxV3RunContinuousTestResponse {
  return {
    ...data,
    continuousTestResult: data["continuousTestResult"] !== undefined ? serializeGoogleCloudDialogflowCxV3ContinuousTestResult(data["continuousTestResult"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3RunContinuousTestResponse(data: any): GoogleCloudDialogflowCxV3RunContinuousTestResponse {
  return {
    ...data,
    continuousTestResult: data["continuousTestResult"] !== undefined ? deserializeGoogleCloudDialogflowCxV3ContinuousTestResult(data["continuousTestResult"]) : undefined,
  };
}

/**
 * Metadata returned for the TestCases.RunTestCase long running operation. This
 * message currently has no fields.
 */
export interface GoogleCloudDialogflowCxV3RunTestCaseMetadata {
}

/**
 * The request message for TestCases.RunTestCase.
 */
export interface GoogleCloudDialogflowCxV3RunTestCaseRequest {
  /**
   * Optional. Environment name. If not set, draft environment is assumed.
   * Format: `projects//locations//agents//environments/`.
   */
  environment?: string;
}

/**
 * The response message for TestCases.RunTestCase.
 */
export interface GoogleCloudDialogflowCxV3RunTestCaseResponse {
  /**
   * The result.
   */
  result?: GoogleCloudDialogflowCxV3TestCaseResult;
}

function serializeGoogleCloudDialogflowCxV3RunTestCaseResponse(data: any): GoogleCloudDialogflowCxV3RunTestCaseResponse {
  return {
    ...data,
    result: data["result"] !== undefined ? serializeGoogleCloudDialogflowCxV3TestCaseResult(data["result"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3RunTestCaseResponse(data: any): GoogleCloudDialogflowCxV3RunTestCaseResponse {
  return {
    ...data,
    result: data["result"] !== undefined ? deserializeGoogleCloudDialogflowCxV3TestCaseResult(data["result"]) : undefined,
  };
}

/**
 * Represents the settings related to security issues, such as data redaction
 * and data retention. It may take hours for updates on the settings to
 * propagate to all the related components and take effect.
 */
export interface GoogleCloudDialogflowCxV3SecuritySettings {
  /**
   * Controls audio export settings for post-conversation analytics when
   * ingesting audio to conversations via Participants.AnalyzeContent or
   * Participants.StreamingAnalyzeContent. If retention_strategy is set to
   * REMOVE_AFTER_CONVERSATION or audio_export_settings.gcs_bucket is empty,
   * audio export is disabled. If audio export is enabled, audio is recorded and
   * saved to audio_export_settings.gcs_bucket, subject to retention policy of
   * audio_export_settings.gcs_bucket. This setting won't effect audio input for
   * implicit sessions via Sessions.DetectIntent or
   * Sessions.StreamingDetectIntent.
   */
  audioExportSettings?: GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings;
  /**
   * [DLP](https://cloud.google.com/dlp/docs) deidentify template name. Use
   * this template to define de-identification configuration for the content.
   * The `DLP De-identify Templates Reader` role is needed on the Dialogflow
   * service identity service account (has the form
   * `service-PROJECT_NUMBER@gcp-sa-dialogflow.iam.gserviceaccount.com`) for
   * your agent's project. If empty, Dialogflow replaces sensitive info with
   * `[redacted]` text. The template name will have one of the following
   * formats: `projects//locations//deidentifyTemplates/` OR
   * `organizations//locations//deidentifyTemplates/` Note:
   * `deidentify_template` must be located in the same region as the
   * `SecuritySettings`.
   */
  deidentifyTemplate?: string;
  /**
   * Required. The human-readable name of the security settings, unique within
   * the location.
   */
  displayName?: string;
  /**
   * Controls conversation exporting settings to Insights after conversation is
   * completed. If retention_strategy is set to REMOVE_AFTER_CONVERSATION,
   * Insights export is disabled no matter what you configure here.
   */
  insightsExportSettings?: GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings;
  /**
   * [DLP](https://cloud.google.com/dlp/docs) inspect template name. Use this
   * template to define inspect base settings. The `DLP Inspect Templates
   * Reader` role is needed on the Dialogflow service identity service account
   * (has the form
   * `service-PROJECT_NUMBER@gcp-sa-dialogflow.iam.gserviceaccount.com`) for
   * your agent's project. If empty, we use the default DLP inspect config. The
   * template name will have one of the following formats:
   * `projects//locations//inspectTemplates/` OR
   * `organizations//locations//inspectTemplates/` Note: `inspect_template` must
   * be located in the same region as the `SecuritySettings`.
   */
  inspectTemplate?: string;
  /**
   * Resource name of the settings. Required for the
   * SecuritySettingsService.UpdateSecuritySettings method.
   * SecuritySettingsService.CreateSecuritySettings populates the name
   * automatically. Format: `projects//locations//securitySettings/`.
   */
  name?: string;
  /**
   * List of types of data to remove when retention settings triggers purge.
   */
  purgeDataTypes?:  | "PURGE_DATA_TYPE_UNSPECIFIED" | "DIALOGFLOW_HISTORY"[];
  /**
   * Defines the data for which Dialogflow applies redaction. Dialogflow does
   * not redact data that it does not have access to – for example, Cloud
   * logging.
   */
  redactionScope?:  | "REDACTION_SCOPE_UNSPECIFIED" | "REDACT_DISK_STORAGE";
  /**
   * Strategy that defines how we do redaction.
   */
  redactionStrategy?:  | "REDACTION_STRATEGY_UNSPECIFIED" | "REDACT_WITH_SERVICE";
  /**
   * Retains the data for the specified number of days. User must set a value
   * lower than Dialogflow's default 365d TTL (30 days for Agent Assist
   * traffic), higher value will be ignored and use default. Setting a value
   * higher than that has no effect. A missing value or setting to 0 also means
   * we use default TTL.
   */
  retentionWindowDays?: number;
}

/**
 * Settings for exporting audio.
 */
export interface GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings {
  /**
   * Filename pattern for exported audio.
   */
  audioExportPattern?: string;
  /**
   * File format for exported audio file. Currently only in telephony
   * recordings.
   */
  audioFormat?:  | "AUDIO_FORMAT_UNSPECIFIED" | "MULAW" | "MP3" | "OGG";
  /**
   * Enable audio redaction if it is true.
   */
  enableAudioRedaction?: boolean;
  /**
   * Cloud Storage bucket to export audio record to. Setting this field would
   * grant the Storage Object Creator role to the Dialogflow Service Agent. API
   * caller that tries to modify this field should have the permission of
   * storage.buckets.setIamPolicy.
   */
  gcsBucket?: string;
}

/**
 * Settings for exporting conversations to
 * [Insights](https://cloud.google.com/contact-center/insights/docs).
 */
export interface GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings {
  /**
   * If enabled, we will automatically exports conversations to Insights and
   * Insights runs its analyzers.
   */
  enableInsightsExport?: boolean;
}

/**
 * The result of sentiment analysis. Sentiment analysis inspects user input and
 * identifies the prevailing subjective opinion, especially to determine a
 * user's attitude as positive, negative, or neutral.
 */
export interface GoogleCloudDialogflowCxV3SentimentAnalysisResult {
  /**
   * A non-negative number in the [0, +inf) range, which represents the
   * absolute magnitude of sentiment, regardless of score (positive or
   * negative).
   */
  magnitude?: number;
  /**
   * Sentiment score between -1.0 (negative sentiment) and 1.0 (positive
   * sentiment).
   */
  score?: number;
}

/**
 * Session entity types are referred to as **User** entity types and are
 * entities that are built for an individual user such as favorites,
 * preferences, playlists, and so on. You can redefine a session entity type at
 * the session level to extend or replace a custom entity type at the user
 * session level (we refer to the entity types defined at the agent level as
 * "custom entity types"). Note: session entity types apply to all queries,
 * regardless of the language. For more information about entity types, see the
 * [Dialogflow
 * documentation](https://cloud.google.com/dialogflow/docs/entities-overview).
 */
export interface GoogleCloudDialogflowCxV3SessionEntityType {
  /**
   * Required. The collection of entities to override or supplement the custom
   * entity type.
   */
  entities?: GoogleCloudDialogflowCxV3EntityTypeEntity[];
  /**
   * Required. Indicates whether the additional data should override or
   * supplement the custom entity type definition.
   */
  entityOverrideMode?:  | "ENTITY_OVERRIDE_MODE_UNSPECIFIED" | "ENTITY_OVERRIDE_MODE_OVERRIDE" | "ENTITY_OVERRIDE_MODE_SUPPLEMENT";
  /**
   * Required. The unique identifier of the session entity type. Format:
   * `projects//locations//agents//sessions//entityTypes/` or
   * `projects//locations//agents//environments//sessions//entityTypes/`. If
   * `Environment ID` is not specified, we assume default 'draft' environment.
   */
  name?: string;
}

/**
 * Represents session information communicated to and from the webhook.
 */
export interface GoogleCloudDialogflowCxV3SessionInfo {
  /**
   * Optional for WebhookRequest. Optional for WebhookResponse. All parameters
   * collected from forms and intents during the session. Parameters can be
   * created, updated, or removed by the webhook. To remove a parameter from the
   * session, the webhook should explicitly set the parameter value to null in
   * WebhookResponse. The map is keyed by parameters' display names.
   */
  parameters?: {
    [key: string]: any
  };
  /**
   * Always present for WebhookRequest. Ignored for WebhookResponse. The unique
   * identifier of the session. This field can be used by the webhook to
   * identify a session. Format: `projects//locations//agents//sessions/` or
   * `projects//locations//agents//environments//sessions/` if environment is
   * specified.
   */
  session?: string;
}

/**
 * Settings related to speech recognition.
 */
export interface GoogleCloudDialogflowCxV3SpeechToTextSettings {
  /**
   * Whether to use speech adaptation for speech recognition.
   */
  enableSpeechAdaptation?: boolean;
}

/**
 * The request message for Experiments.StartExperiment.
 */
export interface GoogleCloudDialogflowCxV3StartExperimentRequest {
}

/**
 * The request message for Experiments.StopExperiment.
 */
export interface GoogleCloudDialogflowCxV3StopExperimentRequest {
}

/**
 * Configuration of how speech should be synthesized.
 */
export interface GoogleCloudDialogflowCxV3SynthesizeSpeechConfig {
  /**
   * Optional. An identifier which selects 'audio effects' profiles that are
   * applied on (post synthesized) text to speech. Effects are applied on top of
   * each other in the order they are given.
   */
  effectsProfileId?: string[];
  /**
   * Optional. Speaking pitch, in the range [-20.0, 20.0]. 20 means increase 20
   * semitones from the original pitch. -20 means decrease 20 semitones from the
   * original pitch.
   */
  pitch?: number;
  /**
   * Optional. Speaking rate/speed, in the range [0.25, 4.0]. 1.0 is the normal
   * native speed supported by the specific voice. 2.0 is twice as fast, and 0.5
   * is half as fast. If unset(0.0), defaults to the native 1.0 speed. Any other
   * values < 0.25 or > 4.0 will return an error.
   */
  speakingRate?: number;
  /**
   * Optional. The desired voice of the synthesized audio.
   */
  voice?: GoogleCloudDialogflowCxV3VoiceSelectionParams;
  /**
   * Optional. Volume gain (in dB) of the normal native volume supported by the
   * specific voice, in the range [-96.0, 16.0]. If unset, or set to a value of
   * 0.0 (dB), will play at normal native signal amplitude. A value of -6.0 (dB)
   * will play at approximately half the amplitude of the normal native signal
   * amplitude. A value of +6.0 (dB) will play at approximately twice the
   * amplitude of the normal native signal amplitude. We strongly recommend not
   * to exceed +10 (dB) as there's usually no effective increase in loudness for
   * any value greater than that.
   */
  volumeGainDb?: number;
}

/**
 * Represents a test case.
 */
export interface GoogleCloudDialogflowCxV3TestCase {
  /**
   * Output only. When the test was created.
   */
  readonly creationTime?: Date;
  /**
   * Required. The human-readable name of the test case, unique within the
   * agent. Limit of 200 characters.
   */
  displayName?: string;
  /**
   * The latest test result.
   */
  lastTestResult?: GoogleCloudDialogflowCxV3TestCaseResult;
  /**
   * The unique identifier of the test case. TestCases.CreateTestCase will
   * populate the name automatically. Otherwise use format:
   * `projects//locations//agents/ /testCases/`.
   */
  name?: string;
  /**
   * Additional freeform notes about the test case. Limit of 400 characters.
   */
  notes?: string;
  /**
   * Tags are short descriptions that users may apply to test cases for
   * organizational and filtering purposes. Each tag should start with "#" and
   * has a limit of 30 characters.
   */
  tags?: string[];
  /**
   * The conversation turns uttered when the test case was created, in
   * chronological order. These include the canonical set of agent utterances
   * that should occur when the agent is working properly.
   */
  testCaseConversationTurns?: GoogleCloudDialogflowCxV3ConversationTurn[];
  /**
   * Config for the test case.
   */
  testConfig?: GoogleCloudDialogflowCxV3TestConfig;
}

function serializeGoogleCloudDialogflowCxV3TestCase(data: any): GoogleCloudDialogflowCxV3TestCase {
  return {
    ...data,
    lastTestResult: data["lastTestResult"] !== undefined ? serializeGoogleCloudDialogflowCxV3TestCaseResult(data["lastTestResult"]) : undefined,
    testCaseConversationTurns: data["testCaseConversationTurns"] !== undefined ? data["testCaseConversationTurns"].map((item: any) => (serializeGoogleCloudDialogflowCxV3ConversationTurn(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3TestCase(data: any): GoogleCloudDialogflowCxV3TestCase {
  return {
    ...data,
    creationTime: data["creationTime"] !== undefined ? new Date(data["creationTime"]) : undefined,
    lastTestResult: data["lastTestResult"] !== undefined ? deserializeGoogleCloudDialogflowCxV3TestCaseResult(data["lastTestResult"]) : undefined,
    testCaseConversationTurns: data["testCaseConversationTurns"] !== undefined ? data["testCaseConversationTurns"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3ConversationTurn(item))) : undefined,
  };
}

/**
 * Error info for importing a test.
 */
export interface GoogleCloudDialogflowCxV3TestCaseError {
  /**
   * The status associated with the test case.
   */
  status?: GoogleRpcStatus;
  /**
   * The test case.
   */
  testCase?: GoogleCloudDialogflowCxV3TestCase;
}

function serializeGoogleCloudDialogflowCxV3TestCaseError(data: any): GoogleCloudDialogflowCxV3TestCaseError {
  return {
    ...data,
    testCase: data["testCase"] !== undefined ? serializeGoogleCloudDialogflowCxV3TestCase(data["testCase"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3TestCaseError(data: any): GoogleCloudDialogflowCxV3TestCaseError {
  return {
    ...data,
    testCase: data["testCase"] !== undefined ? deserializeGoogleCloudDialogflowCxV3TestCase(data["testCase"]) : undefined,
  };
}

/**
 * Represents a result from running a test case in an agent environment.
 */
export interface GoogleCloudDialogflowCxV3TestCaseResult {
  /**
   * The conversation turns uttered during the test case replay in
   * chronological order.
   */
  conversationTurns?: GoogleCloudDialogflowCxV3ConversationTurn[];
  /**
   * Environment where the test was run. If not set, it indicates the draft
   * environment.
   */
  environment?: string;
  /**
   * The resource name for the test case result. Format:
   * `projects//locations//agents//testCases/ /results/`.
   */
  name?: string;
  /**
   * Whether the test case passed in the agent environment.
   */
  testResult?:  | "TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED";
  /**
   * The time that the test was run.
   */
  testTime?: Date;
}

function serializeGoogleCloudDialogflowCxV3TestCaseResult(data: any): GoogleCloudDialogflowCxV3TestCaseResult {
  return {
    ...data,
    conversationTurns: data["conversationTurns"] !== undefined ? data["conversationTurns"].map((item: any) => (serializeGoogleCloudDialogflowCxV3ConversationTurn(item))) : undefined,
    testTime: data["testTime"] !== undefined ? data["testTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3TestCaseResult(data: any): GoogleCloudDialogflowCxV3TestCaseResult {
  return {
    ...data,
    conversationTurns: data["conversationTurns"] !== undefined ? data["conversationTurns"].map((item: any) => (deserializeGoogleCloudDialogflowCxV3ConversationTurn(item))) : undefined,
    testTime: data["testTime"] !== undefined ? new Date(data["testTime"]) : undefined,
  };
}

/**
 * Represents configurations for a test case.
 */
export interface GoogleCloudDialogflowCxV3TestConfig {
  /**
   * Flow name to start the test case with. Format:
   * `projects//locations//agents//flows/`. Only one of `flow` and `page` should
   * be set to indicate the starting point of the test case. If both are set,
   * `page` takes precedence over `flow`. If neither is set, the test case will
   * start with start page on the default start flow.
   */
  flow?: string;
  /**
   * The page to start the test case with. Format:
   * `projects//locations//agents//flows//pages/`. Only one of `flow` and `page`
   * should be set to indicate the starting point of the test case. If both are
   * set, `page` takes precedence over `flow`. If neither is set, the test case
   * will start with start page on the default start flow.
   */
  page?: string;
  /**
   * Session parameters to be compared when calculating differences.
   */
  trackingParameters?: string[];
}

/**
 * Error info for running a test.
 */
export interface GoogleCloudDialogflowCxV3TestError {
  /**
   * The status associated with the test.
   */
  status?: GoogleRpcStatus;
  /**
   * The test case resource name.
   */
  testCase?: string;
  /**
   * The timestamp when the test was completed.
   */
  testTime?: Date;
}

function serializeGoogleCloudDialogflowCxV3TestError(data: any): GoogleCloudDialogflowCxV3TestError {
  return {
    ...data,
    testTime: data["testTime"] !== undefined ? data["testTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3TestError(data: any): GoogleCloudDialogflowCxV3TestError {
  return {
    ...data,
    testTime: data["testTime"] !== undefined ? new Date(data["testTime"]) : undefined,
  };
}

/**
 * The description of differences between original and replayed agent output.
 */
export interface GoogleCloudDialogflowCxV3TestRunDifference {
  /**
   * A description of the diff, showing the actual output vs expected output.
   */
  description?: string;
  /**
   * The type of diff.
   */
  type?:  | "DIFF_TYPE_UNSPECIFIED" | "INTENT" | "PAGE" | "PARAMETERS" | "UTTERANCE";
}

/**
 * Represents the natural language text to be processed.
 */
export interface GoogleCloudDialogflowCxV3TextInput {
  /**
   * Required. The UTF-8 encoded natural language text to be processed. Text
   * length must not exceed 256 characters.
   */
  text?: string;
}

/**
 * Settings related to speech generating.
 */
export interface GoogleCloudDialogflowCxV3TextToSpeechSettings {
  /**
   * Configuration of how speech should be synthesized, mapping from language
   * (https://dialogflow.com/docs/reference/language) to SynthesizeSpeechConfig.
   */
  synthesizeSpeechConfigs?: {
    [key: string]: GoogleCloudDialogflowCxV3SynthesizeSpeechConfig
  };
}

/**
 * The request message for Flows.TrainFlow.
 */
export interface GoogleCloudDialogflowCxV3TrainFlowRequest {
}

/**
 * Transition coverage represents the percentage of all possible page
 * transitions (page-level transition routes and event handlers, excluding
 * transition route groups) present within any of a parent's test cases.
 */
export interface GoogleCloudDialogflowCxV3TransitionCoverage {
  /**
   * The percent of transitions in the agent that are covered.
   */
  coverageScore?: number;
  /**
   * The list of Transitions present in the agent.
   */
  transitions?: GoogleCloudDialogflowCxV3TransitionCoverageTransition[];
}

/**
 * A transition in a page.
 */
export interface GoogleCloudDialogflowCxV3TransitionCoverageTransition {
  /**
   * Whether or not the transition is covered by at least one of the agent's
   * test cases.
   */
  covered?: boolean;
  /**
   * Event handler.
   */
  eventHandler?: GoogleCloudDialogflowCxV3EventHandler;
  /**
   * The index of a transition in the transition list. Starting from 0.
   */
  index?: number;
  /**
   * The start node of a transition.
   */
  source?: GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode;
  /**
   * The end node of a transition.
   */
  target?: GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode;
  /**
   * Intent route or condition route.
   */
  transitionRoute?: GoogleCloudDialogflowCxV3TransitionRoute;
}

/**
 * The source or target of a transition.
 */
export interface GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode {
  /**
   * Indicates a transition to a Flow. Only some fields such as name and
   * displayname will be set.
   */
  flow?: GoogleCloudDialogflowCxV3Flow;
  /**
   * Indicates a transition to a Page. Only some fields such as name and
   * displayname will be set.
   */
  page?: GoogleCloudDialogflowCxV3Page;
}

/**
 * A transition route specifies a intent that can be matched and/or a data
 * condition that can be evaluated during a session. When a specified transition
 * is matched, the following actions are taken in order: * If there is a
 * `trigger_fulfillment` associated with the transition, it will be called. * If
 * there is a `target_page` associated with the transition, the session will
 * transition into the specified page. * If there is a `target_flow` associated
 * with the transition, the session will transition into the specified flow.
 */
export interface GoogleCloudDialogflowCxV3TransitionRoute {
  /**
   * The condition to evaluate against form parameters or session parameters.
   * See the [conditions
   * reference](https://cloud.google.com/dialogflow/cx/docs/reference/condition).
   * At least one of `intent` or `condition` must be specified. When both
   * `intent` and `condition` are specified, the transition can only happen when
   * both are fulfilled.
   */
  condition?: string;
  /**
   * The unique identifier of an Intent. Format:
   * `projects//locations//agents//intents/`. Indicates that the transition can
   * only happen when the given intent is matched. At least one of `intent` or
   * `condition` must be specified. When both `intent` and `condition` are
   * specified, the transition can only happen when both are fulfilled.
   */
  intent?: string;
  /**
   * Output only. The unique identifier of this transition route.
   */
  readonly name?: string;
  /**
   * The target flow to transition to. Format:
   * `projects//locations//agents//flows/`.
   */
  targetFlow?: string;
  /**
   * The target page to transition to. Format:
   * `projects//locations//agents//flows//pages/`.
   */
  targetPage?: string;
  /**
   * The fulfillment to call when the condition is satisfied. At least one of
   * `trigger_fulfillment` and `target` must be specified. When both are
   * defined, `trigger_fulfillment` is executed first.
   */
  triggerFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
}

/**
 * An TransitionRouteGroup represents a group of `TransitionRoutes` to be used
 * by a Page.
 */
export interface GoogleCloudDialogflowCxV3TransitionRouteGroup {
  /**
   * Required. The human-readable name of the transition route group, unique
   * within the flow. The display name can be no longer than 30 characters.
   */
  displayName?: string;
  /**
   * The unique identifier of the transition route group.
   * TransitionRouteGroups.CreateTransitionRouteGroup populates the name
   * automatically. Format:
   * `projects//locations//agents//flows//transitionRouteGroups/`.
   */
  name?: string;
  /**
   * Transition routes associated with the TransitionRouteGroup.
   */
  transitionRoutes?: GoogleCloudDialogflowCxV3TransitionRoute[];
}

/**
 * Transition route group coverage represents the percentage of all possible
 * transition routes present within any of a parent's test cases. The results
 * are grouped by the transition route group.
 */
export interface GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage {
  /**
   * Transition route group coverages.
   */
  coverages?: GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage[];
  /**
   * The percent of transition routes in all the transition route groups that
   * are covered.
   */
  coverageScore?: number;
}

/**
 * Coverage result message for one transition route group.
 */
export interface GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage {
  /**
   * The percent of transition routes in the transition route group that are
   * covered.
   */
  coverageScore?: number;
  /**
   * Transition route group metadata. Only name and displayName will be set.
   */
  routeGroup?: GoogleCloudDialogflowCxV3TransitionRouteGroup;
  /**
   * The list of transition routes and coverage in the transition route group.
   */
  transitions?: GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition[];
}

/**
 * A transition coverage in a transition route group.
 */
export interface GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition {
  /**
   * Whether or not the transition route is covered by at least one of the
   * agent's test cases.
   */
  covered?: boolean;
  /**
   * Intent route or condition route.
   */
  transitionRoute?: GoogleCloudDialogflowCxV3TransitionRoute;
}

/**
 * Collection of all signals that were extracted for a single turn of the
 * conversation.
 */
export interface GoogleCloudDialogflowCxV3TurnSignals {
  /**
   * Whether agent responded with LiveAgentHandoff fulfillment.
   */
  agentEscalated?: boolean;
  /**
   * Whether user was using DTMF input.
   */
  dtmfUsed?: boolean;
  /**
   * Failure reasons of the turn.
   */
  failureReasons?:  | "FAILURE_REASON_UNSPECIFIED" | "FAILED_INTENT" | "FAILED_WEBHOOK"[];
  /**
   * Whether NLU predicted NO_MATCH.
   */
  noMatch?: boolean;
  /**
   * Whether user provided no input.
   */
  noUserInput?: boolean;
  /**
   * Whether turn resulted in End Session page.
   */
  reachedEndPage?: boolean;
  /**
   * Whether user was specifically asking for a live agent.
   */
  userEscalated?: boolean;
  /**
   * Human-readable statuses of the webhooks triggered during this turn.
   */
  webhookStatuses?: string[];
}

/**
 * Metadata for UpdateDocument operation.
 */
export interface GoogleCloudDialogflowCxV3UpdateDocumentOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowCxV3GenericKnowledgeOperationMetadata;
}

/**
 * The request message for Agents.ValidateAgent.
 */
export interface GoogleCloudDialogflowCxV3ValidateAgentRequest {
  /**
   * If not specified, the agent's default language is used.
   */
  languageCode?: string;
}

/**
 * The request message for Flows.ValidateFlow.
 */
export interface GoogleCloudDialogflowCxV3ValidateFlowRequest {
  /**
   * If not specified, the agent's default language is used.
   */
  languageCode?: string;
}

/**
 * Agent/flow validation message.
 */
export interface GoogleCloudDialogflowCxV3ValidationMessage {
  /**
   * The message detail.
   */
  detail?: string;
  /**
   * The resource names of the resources where the message is found.
   */
  resourceNames?: GoogleCloudDialogflowCxV3ResourceName[];
  /**
   * The names of the resources where the message is found.
   */
  resources?: string[];
  /**
   * The type of the resources where the message is found.
   */
  resourceType?:  | "RESOURCE_TYPE_UNSPECIFIED" | "AGENT" | "INTENT" | "INTENT_TRAINING_PHRASE" | "INTENT_PARAMETER" | "INTENTS" | "INTENT_TRAINING_PHRASES" | "ENTITY_TYPE" | "ENTITY_TYPES" | "WEBHOOK" | "FLOW" | "PAGE" | "PAGES" | "TRANSITION_ROUTE_GROUP";
  /**
   * Indicates the severity of the message.
   */
  severity?:  | "SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR";
}

/**
 * The history of variants update.
 */
export interface GoogleCloudDialogflowCxV3VariantsHistory {
  /**
   * Update time of the variants.
   */
  updateTime?: Date;
  /**
   * The flow versions as the variants.
   */
  versionVariants?: GoogleCloudDialogflowCxV3VersionVariants;
}

function serializeGoogleCloudDialogflowCxV3VariantsHistory(data: any): GoogleCloudDialogflowCxV3VariantsHistory {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3VariantsHistory(data: any): GoogleCloudDialogflowCxV3VariantsHistory {
  return {
    ...data,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Represents a version of a flow.
 */
export interface GoogleCloudDialogflowCxV3Version {
  /**
   * Output only. Create time of the version.
   */
  readonly createTime?: Date;
  /**
   * The description of the version. The maximum length is 500 characters. If
   * exceeded, the request is rejected.
   */
  description?: string;
  /**
   * Required. The human-readable name of the version. Limit of 64 characters.
   */
  displayName?: string;
  /**
   * Format: projects//locations//agents//flows//versions/. Version ID is a
   * self-increasing number generated by Dialogflow upon version creation.
   */
  name?: string;
  /**
   * Output only. The NLU settings of the flow at version creation.
   */
  readonly nluSettings?: GoogleCloudDialogflowCxV3NluSettings;
  /**
   * Output only. The state of this version. This field is read-only and cannot
   * be set by create and update methods.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "FAILED";
}

/**
 * A list of flow version variants.
 */
export interface GoogleCloudDialogflowCxV3VersionVariants {
  /**
   * A list of flow version variants.
   */
  variants?: GoogleCloudDialogflowCxV3VersionVariantsVariant[];
}

/**
 * A single flow version with specified traffic allocation.
 */
export interface GoogleCloudDialogflowCxV3VersionVariantsVariant {
  /**
   * Whether the variant is for the control group.
   */
  isControlGroup?: boolean;
  /**
   * Percentage of the traffic which should be routed to this version of flow.
   * Traffic allocation for a single flow must sum up to 1.0.
   */
  trafficAllocation?: number;
  /**
   * The name of the flow version. Format:
   * `projects//locations//agents//flows//versions/`.
   */
  version?: string;
}

/**
 * Description of which voice to use for speech synthesis.
 */
export interface GoogleCloudDialogflowCxV3VoiceSelectionParams {
  /**
   * Optional. The name of the voice. If not set, the service will choose a
   * voice based on the other parameters such as language_code and ssml_gender.
   * For the list of available voices, please refer to [Supported voices and
   * languages](https://cloud.google.com/text-to-speech/docs/voices).
   */
  name?: string;
  /**
   * Optional. The preferred gender of the voice. If not set, the service will
   * choose a voice based on the other parameters such as language_code and
   * name. Note that this is only a preference, not requirement. If a voice of
   * the appropriate gender is not available, the synthesizer substitutes a
   * voice with a different gender rather than failing the request.
   */
  ssmlGender?:  | "SSML_VOICE_GENDER_UNSPECIFIED" | "SSML_VOICE_GENDER_MALE" | "SSML_VOICE_GENDER_FEMALE" | "SSML_VOICE_GENDER_NEUTRAL";
}

/**
 * Webhooks host the developer's business logic. During a session, webhooks
 * allow the developer to use the data extracted by Dialogflow's natural
 * language processing to generate dynamic responses, validate collected data,
 * or trigger actions on the backend.
 */
export interface GoogleCloudDialogflowCxV3Webhook {
  /**
   * Indicates whether the webhook is disabled.
   */
  disabled?: boolean;
  /**
   * Required. The human-readable name of the webhook, unique within the agent.
   */
  displayName?: string;
  /**
   * Configuration for a generic web service.
   */
  genericWebService?: GoogleCloudDialogflowCxV3WebhookGenericWebService;
  /**
   * The unique identifier of the webhook. Required for the
   * Webhooks.UpdateWebhook method. Webhooks.CreateWebhook populates the name
   * automatically. Format: `projects//locations//agents//webhooks/`.
   */
  name?: string;
  /**
   * Configuration for a [Service
   * Directory](https://cloud.google.com/service-directory) service.
   */
  serviceDirectory?: GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig;
  /**
   * Webhook execution timeout. Execution is considered failed if Dialogflow
   * doesn't receive a response from webhook at the end of the timeout period.
   * Defaults to 5 seconds, maximum allowed timeout is 30 seconds.
   */
  timeout?: number /* Duration */;
}

function serializeGoogleCloudDialogflowCxV3Webhook(data: any): GoogleCloudDialogflowCxV3Webhook {
  return {
    ...data,
    genericWebService: data["genericWebService"] !== undefined ? serializeGoogleCloudDialogflowCxV3WebhookGenericWebService(data["genericWebService"]) : undefined,
    serviceDirectory: data["serviceDirectory"] !== undefined ? serializeGoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig(data["serviceDirectory"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3Webhook(data: any): GoogleCloudDialogflowCxV3Webhook {
  return {
    ...data,
    genericWebService: data["genericWebService"] !== undefined ? deserializeGoogleCloudDialogflowCxV3WebhookGenericWebService(data["genericWebService"]) : undefined,
    serviceDirectory: data["serviceDirectory"] !== undefined ? deserializeGoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig(data["serviceDirectory"]) : undefined,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

/**
 * Represents configuration for a generic web service.
 */
export interface GoogleCloudDialogflowCxV3WebhookGenericWebService {
  /**
   * Optional. Specifies a list of allowed custom CA certificates (in DER
   * format) for HTTPS verification. This overrides the default SSL trust store.
   * If this is empty or unspecified, Dialogflow will use Google's default trust
   * store to verify certificates. N.B. Make sure the HTTPS server certificates
   * are signed with "subject alt name". For instance a certificate can be
   * self-signed using the following command, ``` openssl x509 -req -days 200
   * -in example.com.csr \ -signkey example.com.key \ -out example.com.crt \
   * -extfile <(printf "\nsubjectAltName='DNS:www.example.com'") ```
   */
  allowedCaCerts?: Uint8Array[];
  /**
   * The password for HTTP Basic authentication.
   */
  password?: string;
  /**
   * The HTTP request headers to send together with webhook requests.
   */
  requestHeaders?: {
    [key: string]: string
  };
  /**
   * Required. The webhook URI for receiving POST requests. It must use https
   * protocol.
   */
  uri?: string;
  /**
   * The user name for HTTP Basic authentication.
   */
  username?: string;
}

function serializeGoogleCloudDialogflowCxV3WebhookGenericWebService(data: any): GoogleCloudDialogflowCxV3WebhookGenericWebService {
  return {
    ...data,
    allowedCaCerts: data["allowedCaCerts"] !== undefined ? data["allowedCaCerts"].map((item: any) => (encodeBase64(item))) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3WebhookGenericWebService(data: any): GoogleCloudDialogflowCxV3WebhookGenericWebService {
  return {
    ...data,
    allowedCaCerts: data["allowedCaCerts"] !== undefined ? data["allowedCaCerts"].map((item: any) => (decodeBase64(item as string))) : undefined,
  };
}

/**
 * The request message for a webhook call. The request is sent as a JSON object
 * and the field names will be presented in camel cases. You may see
 * undocumented fields in an actual request. These fields are used internally by
 * Dialogflow and should be ignored.
 */
export interface GoogleCloudDialogflowCxV3WebhookRequest {
  /**
   * Always present. The unique identifier of the DetectIntentResponse that
   * will be returned to the API caller.
   */
  detectIntentResponseId?: string;
  /**
   * Always present. Information about the fulfillment that triggered this
   * webhook call.
   */
  fulfillmentInfo?: GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo;
  /**
   * Information about the last matched intent.
   */
  intentInfo?: GoogleCloudDialogflowCxV3WebhookRequestIntentInfo;
  /**
   * The language code specified in the original request.
   */
  languageCode?: string;
  /**
   * The list of rich message responses to present to the user. Webhook can
   * choose to append or replace this list in
   * WebhookResponse.fulfillment_response;
   */
  messages?: GoogleCloudDialogflowCxV3ResponseMessage[];
  /**
   * Information about page status.
   */
  pageInfo?: GoogleCloudDialogflowCxV3PageInfo;
  /**
   * Custom data set in QueryParameters.payload.
   */
  payload?: {
    [key: string]: any
  };
  /**
   * The sentiment analysis result of the current user request. The field is
   * filled when sentiment analysis is configured to be enabled for the request.
   */
  sentimentAnalysisResult?: GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult;
  /**
   * Information about session status.
   */
  sessionInfo?: GoogleCloudDialogflowCxV3SessionInfo;
  /**
   * If natural language text was provided as input, this field will contain a
   * copy of the text.
   */
  text?: string;
  /**
   * If natural language speech audio was provided as input, this field will
   * contain the transcript for the audio.
   */
  transcript?: string;
  /**
   * If an event was provided as input, this field will contain the name of the
   * event.
   */
  triggerEvent?: string;
  /**
   * If an intent was provided as input, this field will contain a copy of the
   * intent identifier. Format: `projects//locations//agents//intents/`.
   */
  triggerIntent?: string;
}

/**
 * Represents fulfillment information communicated to the webhook.
 */
export interface GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo {
  /**
   * Always present. The value of the Fulfillment.tag field will be populated
   * in this field by Dialogflow when the associated webhook is called. The tag
   * is typically used by the webhook service to identify which fulfillment is
   * being called, but it could be used for other purposes.
   */
  tag?: string;
}

/**
 * Represents intent information communicated to the webhook.
 */
export interface GoogleCloudDialogflowCxV3WebhookRequestIntentInfo {
  /**
   * The confidence of the matched intent. Values range from 0.0 (completely
   * uncertain) to 1.0 (completely certain).
   */
  confidence?: number;
  /**
   * Always present. The display name of the last matched intent.
   */
  displayName?: string;
  /**
   * Always present. The unique identifier of the last matched intent. Format:
   * `projects//locations//agents//intents/`.
   */
  lastMatchedIntent?: string;
  /**
   * Parameters identified as a result of intent matching. This is a map of the
   * name of the identified parameter to the value of the parameter identified
   * from the user's utterance. All parameters defined in the matched intent
   * that are identified will be surfaced here.
   */
  parameters?: {
    [key: string]: GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue
  };
}

/**
 * Represents a value for an intent parameter.
 */
export interface GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue {
  /**
   * Always present. Original text value extracted from user utterance.
   */
  originalValue?: string;
  /**
   * Always present. Structured value for the parameter extracted from user
   * utterance.
   */
  resolvedValue?: any;
}

/**
 * Represents the result of sentiment analysis.
 */
export interface GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult {
  /**
   * A non-negative number in the [0, +inf) range, which represents the
   * absolute magnitude of sentiment, regardless of score (positive or
   * negative).
   */
  magnitude?: number;
  /**
   * Sentiment score between -1.0 (negative sentiment) and 1.0 (positive
   * sentiment).
   */
  score?: number;
}

/**
 * The response message for a webhook call.
 */
export interface GoogleCloudDialogflowCxV3WebhookResponse {
  /**
   * The fulfillment response to send to the user. This field can be omitted by
   * the webhook if it does not intend to send any response to the user.
   */
  fulfillmentResponse?: GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse;
  /**
   * Information about page status. This field can be omitted by the webhook if
   * it does not intend to modify page status.
   */
  pageInfo?: GoogleCloudDialogflowCxV3PageInfo;
  /**
   * Value to append directly to QueryResult.webhook_payloads.
   */
  payload?: {
    [key: string]: any
  };
  /**
   * Information about session status. This field can be omitted by the webhook
   * if it does not intend to modify session status.
   */
  sessionInfo?: GoogleCloudDialogflowCxV3SessionInfo;
  /**
   * The target flow to transition to. Format:
   * `projects//locations//agents//flows/`.
   */
  targetFlow?: string;
  /**
   * The target page to transition to. Format:
   * `projects//locations//agents//flows//pages/`.
   */
  targetPage?: string;
}

/**
 * Represents a fulfillment response to the user.
 */
export interface GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse {
  /**
   * Merge behavior for `messages`.
   */
  mergeBehavior?:  | "MERGE_BEHAVIOR_UNSPECIFIED" | "APPEND" | "REPLACE";
  /**
   * The list of rich message responses to present to the user.
   */
  messages?: GoogleCloudDialogflowCxV3ResponseMessage[];
}

/**
 * Represents configuration for a [Service
 * Directory](https://cloud.google.com/service-directory) service.
 */
export interface GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig {
  /**
   * Generic Service configuration of this webhook.
   */
  genericWebService?: GoogleCloudDialogflowCxV3WebhookGenericWebService;
  /**
   * Required. The name of [Service
   * Directory](https://cloud.google.com/service-directory) service. Format:
   * `projects//locations//namespaces//services/`. `Location ID` of the service
   * directory must be the same as the location of the agent.
   */
  service?: string;
}

function serializeGoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig(data: any): GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig {
  return {
    ...data,
    genericWebService: data["genericWebService"] !== undefined ? serializeGoogleCloudDialogflowCxV3WebhookGenericWebService(data["genericWebService"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig(data: any): GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig {
  return {
    ...data,
    genericWebService: data["genericWebService"] !== undefined ? deserializeGoogleCloudDialogflowCxV3WebhookGenericWebService(data["genericWebService"]) : undefined,
  };
}

/**
 * Represents a part of a message possibly annotated with an entity. The part
 * can be an entity or purely a part of the message between two entities or
 * message start/end.
 */
export interface GoogleCloudDialogflowV2AnnotatedMessagePart {
  /**
   * The [Dialogflow system entity
   * type](https://cloud.google.com/dialogflow/docs/reference/system-entities)
   * of this message part. If this is empty, Dialogflow could not annotate the
   * phrase part with a system entity.
   */
  entityType?: string;
  /**
   * The [Dialogflow system entity formatted value
   * ](https://cloud.google.com/dialogflow/docs/reference/system-entities) of
   * this message part. For example for a system entity of type
   * `@sys.unit-currency`, this may contain: { "amount": 5, "currency": "USD" }
   */
  formattedValue?: any;
  /**
   * A part of a message possibly annotated with an entity.
   */
  text?: string;
}

/**
 * Represents article answer.
 */
export interface GoogleCloudDialogflowV2ArticleAnswer {
  /**
   * The name of answer record, in the format of
   * "projects//locations//answerRecords/"
   */
  answerRecord?: string;
  /**
   * Article match confidence. The system's confidence score that this article
   * is a good match for this conversation, as a value from 0.0 (completely
   * uncertain) to 1.0 (completely certain).
   */
  confidence?: number;
  /**
   * A map that contains metadata about the answer and the document from which
   * it originates.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * Article snippets.
   */
  snippets?: string[];
  /**
   * The article title.
   */
  title?: string;
  /**
   * The article URI.
   */
  uri?: string;
}

/**
 * Metadata for article suggestion models.
 */
export interface GoogleCloudDialogflowV2ArticleSuggestionModelMetadata {
  /**
   * Optional. Type of the article suggestion model. If not provided,
   * model_type is used.
   */
  trainingModelType?:  | "MODEL_TYPE_UNSPECIFIED" | "SMART_REPLY_DUAL_ENCODER_MODEL" | "SMART_REPLY_BERT_MODEL";
}

/**
 * The response message for EntityTypes.BatchUpdateEntityTypes.
 */
export interface GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse {
  /**
   * The collection of updated or created entity types.
   */
  entityTypes?: GoogleCloudDialogflowV2EntityType[];
}

/**
 * The response message for Intents.BatchUpdateIntents.
 */
export interface GoogleCloudDialogflowV2BatchUpdateIntentsResponse {
  /**
   * The collection of updated or created intents.
   */
  intents?: GoogleCloudDialogflowV2Intent[];
}

/**
 * Represents a part of a message possibly annotated with an entity. The part
 * can be an entity or purely a part of the message between two entities or
 * message start/end.
 */
export interface GoogleCloudDialogflowV2beta1AnnotatedMessagePart {
  /**
   * Optional. The [Dialogflow system entity
   * type](https://cloud.google.com/dialogflow/docs/reference/system-entities)
   * of this message part. If this is empty, Dialogflow could not annotate the
   * phrase part with a system entity.
   */
  entityType?: string;
  /**
   * Optional. The [Dialogflow system entity formatted value
   * ](https://cloud.google.com/dialogflow/docs/reference/system-entities) of
   * this message part. For example for a system entity of type
   * `@sys.unit-currency`, this may contain: { "amount": 5, "currency": "USD" }
   */
  formattedValue?: any;
  /**
   * Required. A part of a message possibly annotated with an entity.
   */
  text?: string;
}

/**
 * Represents article answer.
 */
export interface GoogleCloudDialogflowV2beta1ArticleAnswer {
  /**
   * The name of answer record, in the format of
   * "projects//locations//answerRecords/"
   */
  answerRecord?: string;
  /**
   * A map that contains metadata about the answer and the document from which
   * it originates.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * Output only. Article snippets.
   */
  snippets?: string[];
  /**
   * The article title.
   */
  title?: string;
  /**
   * The article URI.
   */
  uri?: string;
}

/**
 * The response message for EntityTypes.BatchUpdateEntityTypes.
 */
export interface GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse {
  /**
   * The collection of updated or created entity types.
   */
  entityTypes?: GoogleCloudDialogflowV2beta1EntityType[];
}

/**
 * The response message for Intents.BatchUpdateIntents.
 */
export interface GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse {
  /**
   * The collection of updated or created intents.
   */
  intents?: GoogleCloudDialogflowV2beta1Intent[];
}

/**
 * Metadata for a ConversationProfile.ClearSuggestionFeatureConfig operation.
 */
export interface GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata {
  /**
   * The resource name of the conversation profile. Format:
   * `projects//locations//conversationProfiles/`
   */
  conversationProfile?: string;
  /**
   * Timestamp whe the request was created. The time is measured on server
   * side.
   */
  createTime?: Date;
  /**
   * Required. The participant role to remove the suggestion feature config.
   * Only HUMAN_AGENT or END_USER can be used.
   */
  participantRole?:  | "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER";
  /**
   * Required. The type of the suggestion feature to remove.
   */
  suggestionFeatureType?:  | "TYPE_UNSPECIFIED" | "ARTICLE_SUGGESTION" | "FAQ" | "SMART_REPLY" | "CONVERSATION_SUMMARIZATION";
}

function serializeGoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata(data: any): GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata(data: any): GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Dialogflow contexts are similar to natural language context. If a person
 * says to you "they are orange", you need context in order to understand what
 * "they" is referring to. Similarly, for Dialogflow to handle an end-user
 * expression like that, it needs to be provided with context in order to
 * correctly match an intent. Using contexts, you can control the flow of a
 * conversation. You can configure contexts for an intent by setting input and
 * output contexts, which are identified by string names. When an intent is
 * matched, any configured output contexts for that intent become active. While
 * any contexts are active, Dialogflow is more likely to match intents that are
 * configured with input contexts that correspond to the currently active
 * contexts. For more information about context, see the [Contexts
 * guide](https://cloud.google.com/dialogflow/docs/contexts-overview).
 */
export interface GoogleCloudDialogflowV2beta1Context {
  /**
   * Optional. The number of conversational query requests after which the
   * context expires. The default is `0`. If set to `0`, the context expires
   * immediately. Contexts expire automatically after 20 minutes if there are no
   * matching queries.
   */
  lifespanCount?: number;
  /**
   * Required. The unique identifier of the context. Supported formats: -
   * `projects//agent/sessions//contexts/`, -
   * `projects//locations//agent/sessions//contexts/`, -
   * `projects//agent/environments//users//sessions//contexts/`, -
   * `projects//locations//agent/environments//users//sessions//contexts/`, The
   * `Context ID` is always converted to lowercase, may only contain characters
   * in a-zA-Z0-9_-% and may be at most 250 bytes long. If `Environment ID` is
   * not specified, we assume default 'draft' environment. If `User ID` is not
   * specified, we assume default '-' user. The following context names are
   * reserved for internal use by Dialogflow. You should not use these contexts
   * or create contexts with these names: * `__system_counters__` *
   * `*_id_dialog_context` * `*_dialog_params_size`
   */
  name?: string;
  /**
   * Optional. The collection of parameters associated with this context.
   * Depending on your protocol or client library language, this is a map,
   * associative array, symbol table, dictionary, or JSON object composed of a
   * collection of (MapKey, MapValue) pairs: - MapKey type: string - MapKey
   * value: parameter name - MapValue type: - If parameter's entity type is a
   * composite entity: map - Else: depending on parameter value type, could be
   * one of string, number, boolean, null, list or map - MapValue value: - If
   * parameter's entity type is a composite entity: map from composite entity
   * property names to property values - Else: parameter value
   */
  parameters?: {
    [key: string]: any
  };
}

/**
 * Represents a notification sent to Pub/Sub subscribers for conversation
 * lifecycle events.
 */
export interface GoogleCloudDialogflowV2beta1ConversationEvent {
  /**
   * Required. The unique identifier of the conversation this notification
   * refers to. Format: `projects//conversations/`.
   */
  conversation?: string;
  /**
   * Optional. More detailed information about an error. Only set for type
   * UNRECOVERABLE_ERROR_IN_PHONE_CALL.
   */
  errorStatus?: GoogleRpcStatus;
  /**
   * Payload of NEW_MESSAGE event.
   */
  newMessagePayload?: GoogleCloudDialogflowV2beta1Message;
  /**
   * Required. The type of the event that this notification refers to.
   */
  type?:  | "TYPE_UNSPECIFIED" | "CONVERSATION_STARTED" | "CONVERSATION_FINISHED" | "HUMAN_INTERVENTION_NEEDED" | "NEW_MESSAGE" | "UNRECOVERABLE_ERROR";
}

function serializeGoogleCloudDialogflowV2beta1ConversationEvent(data: any): GoogleCloudDialogflowV2beta1ConversationEvent {
  return {
    ...data,
    newMessagePayload: data["newMessagePayload"] !== undefined ? serializeGoogleCloudDialogflowV2beta1Message(data["newMessagePayload"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2beta1ConversationEvent(data: any): GoogleCloudDialogflowV2beta1ConversationEvent {
  return {
    ...data,
    newMessagePayload: data["newMessagePayload"] !== undefined ? deserializeGoogleCloudDialogflowV2beta1Message(data["newMessagePayload"]) : undefined,
  };
}

/**
 * Each intent parameter has a type, called the entity type, which dictates
 * exactly how data from an end-user expression is extracted. Dialogflow
 * provides predefined system entities that can match many common types of data.
 * For example, there are system entities for matching dates, times, colors,
 * email addresses, and so on. You can also create your own custom entities for
 * matching custom data. For example, you could define a vegetable entity that
 * can match the types of vegetables available for purchase with a grocery store
 * agent. For more information, see the [Entity
 * guide](https://cloud.google.com/dialogflow/docs/entities-overview).
 */
export interface GoogleCloudDialogflowV2beta1EntityType {
  /**
   * Optional. Indicates whether the entity type can be automatically expanded.
   */
  autoExpansionMode?:  | "AUTO_EXPANSION_MODE_UNSPECIFIED" | "AUTO_EXPANSION_MODE_DEFAULT";
  /**
   * Required. The name of the entity type.
   */
  displayName?: string;
  /**
   * Optional. Enables fuzzy entity extraction during classification.
   */
  enableFuzzyExtraction?: boolean;
  /**
   * Optional. The collection of entity entries associated with the entity
   * type.
   */
  entities?: GoogleCloudDialogflowV2beta1EntityTypeEntity[];
  /**
   * Required. Indicates the kind of entity type.
   */
  kind?:  | "KIND_UNSPECIFIED" | "KIND_MAP" | "KIND_LIST" | "KIND_REGEXP";
  /**
   * The unique identifier of the entity type. Required for
   * EntityTypes.UpdateEntityType and EntityTypes.BatchUpdateEntityTypes
   * methods. Supported formats: - `projects//agent/entityTypes/` -
   * `projects//locations//agent/entityTypes/`
   */
  name?: string;
}

/**
 * An **entity entry** for an associated entity type.
 */
export interface GoogleCloudDialogflowV2beta1EntityTypeEntity {
  /**
   * Required. A collection of value synonyms. For example, if the entity type
   * is *vegetable*, and `value` is *scallions*, a synonym could be *green
   * onions*. For `KIND_LIST` entity types: * This collection must contain
   * exactly one synonym equal to `value`.
   */
  synonyms?: string[];
  /**
   * Required. The primary value associated with this entity entry. For
   * example, if the entity type is *vegetable*, the value could be *scallions*.
   * For `KIND_MAP` entity types: * A reference value to be used in place of
   * synonyms. For `KIND_LIST` entity types: * A string that can contain
   * references to other entity types (with or without aliases).
   */
  value?: string;
}

/**
 * Events allow for matching intents by event name instead of the natural
 * language input. For instance, input `` can trigger a personalized welcome
 * response. The parameter `name` may be used by the agent in the response:
 * `"Hello #welcome_event.name! What can I do for you today?"`.
 */
export interface GoogleCloudDialogflowV2beta1EventInput {
  /**
   * Required. The language of this query. See [Language
   * Support](https://cloud.google.com/dialogflow/docs/reference/language) for a
   * list of the currently supported language codes. Note that queries in the
   * same session do not necessarily need to specify the same language. This
   * field is ignored when used in the context of a
   * WebhookResponse.followup_event_input field, because the language was
   * already defined in the originating detect intent request.
   */
  languageCode?: string;
  /**
   * Required. The unique identifier of the event.
   */
  name?: string;
  /**
   * The collection of parameters associated with the event. Depending on your
   * protocol or client library language, this is a map, associative array,
   * symbol table, dictionary, or JSON object composed of a collection of
   * (MapKey, MapValue) pairs: - MapKey type: string - MapKey value: parameter
   * name - MapValue type: - If parameter's entity type is a composite entity:
   * map - Else: depending on parameter value type, could be one of string,
   * number, boolean, null, list or map - MapValue value: - If parameter's
   * entity type is a composite entity: map from composite entity property names
   * to property values - Else: parameter value
   */
  parameters?: {
    [key: string]: any
  };
}

/**
 * The response message for Agents.ExportAgent.
 */
export interface GoogleCloudDialogflowV2beta1ExportAgentResponse {
  /**
   * Zip compressed raw byte content for agent.
   */
  agentContent?: Uint8Array;
  /**
   * The URI to a file containing the exported agent. This field is populated
   * only if `agent_uri` is specified in `ExportAgentRequest`.
   */
  agentUri?: string;
}

function serializeGoogleCloudDialogflowV2beta1ExportAgentResponse(data: any): GoogleCloudDialogflowV2beta1ExportAgentResponse {
  return {
    ...data,
    agentContent: data["agentContent"] !== undefined ? encodeBase64(data["agentContent"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2beta1ExportAgentResponse(data: any): GoogleCloudDialogflowV2beta1ExportAgentResponse {
  return {
    ...data,
    agentContent: data["agentContent"] !== undefined ? decodeBase64(data["agentContent"] as string) : undefined,
  };
}

/**
 * Metadata related to the Export Data Operations (e.g. ExportDocument).
 */
export interface GoogleCloudDialogflowV2beta1ExportOperationMetadata {
  /**
   * Cloud Storage file path of the exported data.
   */
  exportedGcsDestination?: GoogleCloudDialogflowV2beta1GcsDestination;
}

/**
 * Represents answer from "frequently asked questions".
 */
export interface GoogleCloudDialogflowV2beta1FaqAnswer {
  /**
   * The piece of text from the `source` knowledge base document.
   */
  answer?: string;
  /**
   * The name of answer record, in the format of
   * "projects//locations//answerRecords/"
   */
  answerRecord?: string;
  /**
   * The system's confidence score that this Knowledge answer is a good match
   * for this conversational query, range from 0.0 (completely uncertain) to 1.0
   * (completely certain).
   */
  confidence?: number;
  /**
   * A map that contains metadata about the answer and the document from which
   * it originates.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * The corresponding FAQ question.
   */
  question?: string;
  /**
   * Indicates which Knowledge Document this answer was extracted from. Format:
   * `projects//locations//agent/knowledgeBases//documents/`.
   */
  source?: string;
}

/**
 * Google Cloud Storage location for the output.
 */
export interface GoogleCloudDialogflowV2beta1GcsDestination {
  /**
   * Required. The Google Cloud Storage URIs for the output. A URI is of the
   * form: gs://bucket/object-prefix-or-name Whether a prefix or name is used
   * depends on the use case. The requesting user must have "write-permission"
   * to the bucket.
   */
  uri?: string;
}

/**
 * Output only. Represents a notification sent to Pub/Sub subscribers for agent
 * assistant events in a specific conversation.
 */
export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent {
  /**
   * The conversation this notification refers to. Format:
   * `projects//conversations/`.
   */
  conversation?: string;
  /**
   * The participant that the suggestion is compiled for. And This field is
   * used to call Participants.ListSuggestions API. Format:
   * `projects//conversations//participants/`. It will not be set in legacy
   * workflow. HumanAgentAssistantConfig.name for more information.
   */
  participant?: string;
  /**
   * The suggestion results payload that this notification refers to. It will
   * only be set when
   * HumanAgentAssistantConfig.SuggestionConfig.group_suggestion_responses sets
   * to true.
   */
  suggestionResults?: GoogleCloudDialogflowV2beta1SuggestionResult[];
}

/**
 * Response message for Documents.ImportDocuments.
 */
export interface GoogleCloudDialogflowV2beta1ImportDocumentsResponse {
  /**
   * Includes details about skipped documents or any other warnings.
   */
  warnings?: GoogleRpcStatus[];
}

/**
 * An intent categorizes an end-user's intention for one conversation turn. For
 * each agent, you define many intents, where your combined intents can handle a
 * complete conversation. When an end-user writes or says something, referred to
 * as an end-user expression or end-user input, Dialogflow matches the end-user
 * input to the best intent in your agent. Matching an intent is also known as
 * intent classification. For more information, see the [intent
 * guide](https://cloud.google.com/dialogflow/docs/intents-overview).
 */
export interface GoogleCloudDialogflowV2beta1Intent {
  /**
   * Optional. The name of the action associated with the intent. Note: The
   * action name must not contain whitespaces.
   */
  action?: string;
  /**
   * Optional. The list of platforms for which the first responses will be
   * copied from the messages in PLATFORM_UNSPECIFIED (i.e. default platform).
   */
  defaultResponsePlatforms?:  | "PLATFORM_UNSPECIFIED" | "FACEBOOK" | "SLACK" | "TELEGRAM" | "KIK" | "SKYPE" | "LINE" | "VIBER" | "ACTIONS_ON_GOOGLE" | "TELEPHONY" | "GOOGLE_HANGOUTS"[];
  /**
   * Required. The name of this intent.
   */
  displayName?: string;
  /**
   * Optional. Indicates that this intent ends an interaction. Some
   * integrations (e.g., Actions on Google or Dialogflow phone gateway) use this
   * information to close interaction with an end user. Default is false.
   */
  endInteraction?: boolean;
  /**
   * Optional. The collection of event names that trigger the intent. If the
   * collection of input contexts is not empty, all of the contexts must be
   * present in the active user session for an event to trigger this intent.
   * Event names are limited to 150 characters.
   */
  events?: string[];
  /**
   * Output only. Information about all followup intents that have this intent
   * as a direct or indirect parent. We populate this field only in the output.
   */
  readonly followupIntentInfo?: GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo[];
  /**
   * Optional. The list of context names required for this intent to be
   * triggered. Formats: - `projects//agent/sessions/-/contexts/` -
   * `projects//locations//agent/sessions/-/contexts/`
   */
  inputContextNames?: string[];
  /**
   * Optional. Indicates whether this is a fallback intent.
   */
  isFallback?: boolean;
  /**
   * Optional. Indicates that a live agent should be brought in to handle the
   * interaction with the user. In most cases, when you set this flag to true,
   * you would also want to set end_interaction to true as well. Default is
   * false.
   */
  liveAgentHandoff?: boolean;
  /**
   * Optional. The collection of rich messages corresponding to the `Response`
   * field in the Dialogflow console.
   */
  messages?: GoogleCloudDialogflowV2beta1IntentMessage[];
  /**
   * Optional. Indicates whether Machine Learning is disabled for the intent.
   * Note: If `ml_disabled` setting is set to true, then this intent is not
   * taken into account during inference in `ML ONLY` match mode. Also,
   * auto-markup in the UI is turned off.
   */
  mlDisabled?: boolean;
  /**
   * Optional. Indicates whether Machine Learning is enabled for the intent.
   * Note: If `ml_enabled` setting is set to false, then this intent is not
   * taken into account during inference in `ML ONLY` match mode. Also,
   * auto-markup in the UI is turned off. DEPRECATED! Please use `ml_disabled`
   * field instead. NOTE: If both `ml_enabled` and `ml_disabled` are either not
   * set or false, then the default value is determined as follows: - Before
   * April 15th, 2018 the default is: ml_enabled = false / ml_disabled = true. -
   * After April 15th, 2018 the default is: ml_enabled = true / ml_disabled =
   * false.
   */
  mlEnabled?: boolean;
  /**
   * Optional. The unique identifier of this intent. Required for
   * Intents.UpdateIntent and Intents.BatchUpdateIntents methods. Supported
   * formats: - `projects//agent/intents/` -
   * `projects//locations//agent/intents/`
   */
  name?: string;
  /**
   * Optional. The collection of contexts that are activated when the intent is
   * matched. Context messages in this collection should not set the parameters
   * field. Setting the `lifespan_count` to 0 will reset the context when the
   * intent is matched. Format: `projects//agent/sessions/-/contexts/`.
   */
  outputContexts?: GoogleCloudDialogflowV2beta1Context[];
  /**
   * Optional. The collection of parameters associated with the intent.
   */
  parameters?: GoogleCloudDialogflowV2beta1IntentParameter[];
  /**
   * Optional. The unique identifier of the parent intent in the chain of
   * followup intents. You can set this field when creating an intent, for
   * example with CreateIntent or BatchUpdateIntents, in order to make this
   * intent a followup intent. It identifies the parent followup intent. Format:
   * `projects//agent/intents/`.
   */
  parentFollowupIntentName?: string;
  /**
   * Optional. The priority of this intent. Higher numbers represent higher
   * priorities. - If the supplied value is unspecified or 0, the service
   * translates the value to 500,000, which corresponds to the `Normal` priority
   * in the console. - If the supplied value is negative, the intent is ignored
   * in runtime detect intent requests.
   */
  priority?: number;
  /**
   * Optional. Indicates whether to delete all contexts in the current session
   * when this intent is matched.
   */
  resetContexts?: boolean;
  /**
   * Output only. The unique identifier of the root intent in the chain of
   * followup intents. It identifies the correct followup intents chain for this
   * intent. Format: `projects//agent/intents/`.
   */
  readonly rootFollowupIntentName?: string;
  /**
   * Optional. The collection of examples that the agent is trained on.
   */
  trainingPhrases?: GoogleCloudDialogflowV2beta1IntentTrainingPhrase[];
  /**
   * Optional. Indicates whether webhooks are enabled for the intent.
   */
  webhookState?:  | "WEBHOOK_STATE_UNSPECIFIED" | "WEBHOOK_STATE_ENABLED" | "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING";
}

/**
 * Represents a single followup intent in the chain.
 */
export interface GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo {
  /**
   * The unique identifier of the followup intent. Format:
   * `projects//agent/intents/`.
   */
  followupIntentName?: string;
  /**
   * The unique identifier of the followup intent's parent. Format:
   * `projects//agent/intents/`.
   */
  parentFollowupIntentName?: string;
}

/**
 * Corresponds to the `Response` field in the Dialogflow console.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessage {
  /**
   * Displays a basic card for Actions on Google.
   */
  basicCard?: GoogleCloudDialogflowV2beta1IntentMessageBasicCard;
  /**
   * Browse carousel card for Actions on Google.
   */
  browseCarouselCard?: GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard;
  /**
   * Displays a card.
   */
  card?: GoogleCloudDialogflowV2beta1IntentMessageCard;
  /**
   * Displays a carousel card for Actions on Google.
   */
  carouselSelect?: GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect;
  /**
   * Displays an image.
   */
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  /**
   * Displays a link out suggestion chip for Actions on Google.
   */
  linkOutSuggestion?: GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion;
  /**
   * Displays a list card for Actions on Google.
   */
  listSelect?: GoogleCloudDialogflowV2beta1IntentMessageListSelect;
  /**
   * The media content card for Actions on Google.
   */
  mediaContent?: GoogleCloudDialogflowV2beta1IntentMessageMediaContent;
  /**
   * A custom platform-specific response.
   */
  payload?: {
    [key: string]: any
  };
  /**
   * Optional. The platform that this message is intended for.
   */
  platform?:  | "PLATFORM_UNSPECIFIED" | "FACEBOOK" | "SLACK" | "TELEGRAM" | "KIK" | "SKYPE" | "LINE" | "VIBER" | "ACTIONS_ON_GOOGLE" | "TELEPHONY" | "GOOGLE_HANGOUTS";
  /**
   * Displays quick replies.
   */
  quickReplies?: GoogleCloudDialogflowV2beta1IntentMessageQuickReplies;
  /**
   * Rich Business Messaging (RBM) carousel rich card response.
   */
  rbmCarouselRichCard?: GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard;
  /**
   * Standalone Rich Business Messaging (RBM) rich card response.
   */
  rbmStandaloneRichCard?: GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard;
  /**
   * Rich Business Messaging (RBM) text response. RBM allows businesses to send
   * enriched and branded versions of SMS. See
   * https://jibe.google.com/business-messaging.
   */
  rbmText?: GoogleCloudDialogflowV2beta1IntentMessageRbmText;
  /**
   * Returns a voice or text-only response for Actions on Google.
   */
  simpleResponses?: GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses;
  /**
   * Displays suggestion chips for Actions on Google.
   */
  suggestions?: GoogleCloudDialogflowV2beta1IntentMessageSuggestions;
  /**
   * Table card for Actions on Google.
   */
  tableCard?: GoogleCloudDialogflowV2beta1IntentMessageTableCard;
  /**
   * Plays audio from a file in Telephony Gateway.
   */
  telephonyPlayAudio?: GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio;
  /**
   * Synthesizes speech in Telephony Gateway.
   */
  telephonySynthesizeSpeech?: GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech;
  /**
   * Transfers the call in Telephony Gateway.
   */
  telephonyTransferCall?: GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall;
  /**
   * Returns a text response.
   */
  text?: GoogleCloudDialogflowV2beta1IntentMessageText;
}

/**
 * The basic card message. Useful for displaying information.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageBasicCard {
  /**
   * Optional. The collection of card buttons.
   */
  buttons?: GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton[];
  /**
   * Required, unless image is present. The body text of the card.
   */
  formattedText?: string;
  /**
   * Optional. The image for the card.
   */
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  /**
   * Optional. The subtitle of the card.
   */
  subtitle?: string;
  /**
   * Optional. The title of the card.
   */
  title?: string;
}

/**
 * The button object that appears at the bottom of a card.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton {
  /**
   * Required. Action to take when a user taps on the button.
   */
  openUriAction?: GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction;
  /**
   * Required. The title of the button.
   */
  title?: string;
}

/**
 * Opens the given URI.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction {
  /**
   * Required. The HTTP or HTTPS scheme URI.
   */
  uri?: string;
}

/**
 * Browse Carousel Card for Actions on Google.
 * https://developers.google.com/actions/assistant/responses#browsing_carousel
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard {
  /**
   * Optional. Settings for displaying the image. Applies to every image in
   * items.
   */
  imageDisplayOptions?:  | "IMAGE_DISPLAY_OPTIONS_UNSPECIFIED" | "GRAY" | "WHITE" | "CROPPED" | "BLURRED_BACKGROUND";
  /**
   * Required. List of items in the Browse Carousel Card. Minimum of two items,
   * maximum of ten.
   */
  items?: GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem[];
}

/**
 * Browsing carousel tile
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem {
  /**
   * Optional. Description of the carousel item. Maximum of four lines of text.
   */
  description?: string;
  /**
   * Optional. Text that appears at the bottom of the Browse Carousel Card.
   * Maximum of one line of text.
   */
  footer?: string;
  /**
   * Optional. Hero image for the carousel item.
   */
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  /**
   * Required. Action to present to the user.
   */
  openUriAction?: GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction;
  /**
   * Required. Title of the carousel item. Maximum of two lines of text.
   */
  title?: string;
}

/**
 * Actions on Google action to open a given url.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction {
  /**
   * Required. URL
   */
  url?: string;
  /**
   * Optional. Specifies the type of viewer that is used when opening the URL.
   * Defaults to opening via web browser.
   */
  urlTypeHint?:  | "URL_TYPE_HINT_UNSPECIFIED" | "AMP_ACTION" | "AMP_CONTENT";
}

/**
 * The card response message.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageCard {
  /**
   * Optional. The collection of card buttons.
   */
  buttons?: GoogleCloudDialogflowV2beta1IntentMessageCardButton[];
  /**
   * Optional. The public URI to an image file for the card.
   */
  imageUri?: string;
  /**
   * Optional. The subtitle of the card.
   */
  subtitle?: string;
  /**
   * Optional. The title of the card.
   */
  title?: string;
}

/**
 * Optional. Contains information about a button.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageCardButton {
  /**
   * Optional. The text to send back to the Dialogflow API or a URI to open.
   */
  postback?: string;
  /**
   * Optional. The text to show on the button.
   */
  text?: string;
}

/**
 * The card for presenting a carousel of options to select from.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect {
  /**
   * Required. Carousel items.
   */
  items?: GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem[];
}

/**
 * An item in the carousel.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem {
  /**
   * Optional. The body text of the card.
   */
  description?: string;
  /**
   * Optional. The image to display.
   */
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  /**
   * Required. Additional info about the option item.
   */
  info?: GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo;
  /**
   * Required. Title of the carousel item.
   */
  title?: string;
}

/**
 * Column properties for TableCard.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageColumnProperties {
  /**
   * Required. Column heading.
   */
  header?: string;
  /**
   * Optional. Defines text alignment for all cells in this column.
   */
  horizontalAlignment?:  | "HORIZONTAL_ALIGNMENT_UNSPECIFIED" | "LEADING" | "CENTER" | "TRAILING";
}

/**
 * The image response message.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageImage {
  /**
   * A text description of the image to be used for accessibility, e.g., screen
   * readers. Required if image_uri is set for CarouselSelect.
   */
  accessibilityText?: string;
  /**
   * Optional. The public URI to an image file.
   */
  imageUri?: string;
}

/**
 * The suggestion chip message that allows the user to jump out to the app or
 * website associated with this agent.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion {
  /**
   * Required. The name of the app or site this chip is linking to.
   */
  destinationName?: string;
  /**
   * Required. The URI of the app or site to open when the user taps the
   * suggestion chip.
   */
  uri?: string;
}

/**
 * The card for presenting a list of options to select from.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageListSelect {
  /**
   * Required. List items.
   */
  items?: GoogleCloudDialogflowV2beta1IntentMessageListSelectItem[];
  /**
   * Optional. Subtitle of the list.
   */
  subtitle?: string;
  /**
   * Optional. The overall title of the list.
   */
  title?: string;
}

/**
 * An item in the list.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageListSelectItem {
  /**
   * Optional. The main text describing the item.
   */
  description?: string;
  /**
   * Optional. The image to display.
   */
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  /**
   * Required. Additional information about this option.
   */
  info?: GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo;
  /**
   * Required. The title of the list item.
   */
  title?: string;
}

/**
 * The media content card for Actions on Google.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageMediaContent {
  /**
   * Required. List of media objects.
   */
  mediaObjects?: GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject[];
  /**
   * Optional. What type of media is the content (ie "audio").
   */
  mediaType?:  | "RESPONSE_MEDIA_TYPE_UNSPECIFIED" | "AUDIO";
}

/**
 * Response media object for media content card.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject {
  /**
   * Required. Url where the media is stored.
   */
  contentUrl?: string;
  /**
   * Optional. Description of media card.
   */
  description?: string;
  /**
   * Optional. Icon to display above media content.
   */
  icon?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  /**
   * Optional. Image to display above media content.
   */
  largeImage?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  /**
   * Required. Name of media card.
   */
  name?: string;
}

/**
 * The quick replies response message.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageQuickReplies {
  /**
   * Optional. The collection of quick replies.
   */
  quickReplies?: string[];
  /**
   * Optional. The title of the collection of quick replies.
   */
  title?: string;
}

/**
 * Rich Business Messaging (RBM) Card content
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent {
  /**
   * Optional. Description of the card (at most 2000 bytes). At least one of
   * the title, description or media must be set.
   */
  description?: string;
  /**
   * Optional. However at least one of the title, description or media must be
   * set. Media (image, GIF or a video) to include in the card.
   */
  media?: GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia;
  /**
   * Optional. List of suggestions to include in the card.
   */
  suggestions?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion[];
  /**
   * Optional. Title of the card (at most 200 bytes). At least one of the
   * title, description or media must be set.
   */
  title?: string;
}

/**
 * Rich Business Messaging (RBM) Media displayed in Cards The following
 * media-types are currently supported: Image Types * image/jpeg * image/jpg' *
 * image/gif * image/png Video Types * video/h263 * video/m4v * video/mp4 *
 * video/mpeg * video/mpeg4 * video/webm
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia {
  /**
   * Required. Publicly reachable URI of the file. The RBM platform determines
   * the MIME type of the file from the content-type field in the HTTP headers
   * when the platform fetches the file. The content-type field must be present
   * and accurate in the HTTP response from the URL.
   */
  fileUri?: string;
  /**
   * Required for cards with vertical orientation. The height of the media
   * within a rich card with a vertical layout. For a standalone card with
   * horizontal layout, height is not customizable, and this field is ignored.
   */
  height?:  | "HEIGHT_UNSPECIFIED" | "SHORT" | "MEDIUM" | "TALL";
  /**
   * Optional. Publicly reachable URI of the thumbnail.If you don't provide a
   * thumbnail URI, the RBM platform displays a blank placeholder thumbnail
   * until the user's device downloads the file. Depending on the user's
   * setting, the file may not download automatically and may require the user
   * to tap a download button.
   */
  thumbnailUri?: string;
}

/**
 * Carousel Rich Business Messaging (RBM) rich card. Rich cards allow you to
 * respond to users with more vivid content, e.g. with media and suggestions. If
 * you want to show a single card with more control over the layout, please use
 * RbmStandaloneCard instead.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard {
  /**
   * Required. The cards in the carousel. A carousel must have at least 2 cards
   * and at most 10.
   */
  cardContents?: GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent[];
  /**
   * Required. The width of the cards in the carousel.
   */
  cardWidth?:  | "CARD_WIDTH_UNSPECIFIED" | "SMALL" | "MEDIUM";
}

/**
 * Standalone Rich Business Messaging (RBM) rich card. Rich cards allow you to
 * respond to users with more vivid content, e.g. with media and suggestions.
 * You can group multiple rich cards into one using RbmCarouselCard but carousel
 * cards will give you less control over the card layout.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard {
  /**
   * Required. Card content.
   */
  cardContent?: GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent;
  /**
   * Required. Orientation of the card.
   */
  cardOrientation?:  | "CARD_ORIENTATION_UNSPECIFIED" | "HORIZONTAL" | "VERTICAL";
  /**
   * Required if orientation is horizontal. Image preview alignment for
   * standalone cards with horizontal layout.
   */
  thumbnailImageAlignment?:  | "THUMBNAIL_IMAGE_ALIGNMENT_UNSPECIFIED" | "LEFT" | "RIGHT";
}

/**
 * Rich Business Messaging (RBM) suggested client-side action that the user can
 * choose from the card.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction {
  /**
   * Suggested client side action: Dial a phone number
   */
  dial?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial;
  /**
   * Suggested client side action: Open a URI on device
   */
  openUrl?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri;
  /**
   * Opaque payload that the Dialogflow receives in a user event when the user
   * taps the suggested action. This data will be also forwarded to webhook to
   * allow performing custom business logic.
   */
  postbackData?: string;
  /**
   * Suggested client side action: Share user location
   */
  shareLocation?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation;
  /**
   * Text to display alongside the action.
   */
  text?: string;
}

/**
 * Opens the user's default dialer app with the specified phone number but does
 * not dial automatically.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial {
  /**
   * Required. The phone number to fill in the default dialer app. This field
   * should be in [E.164](https://en.wikipedia.org/wiki/E.164) format. An
   * example of a correctly formatted phone number: +15556767888.
   */
  phoneNumber?: string;
}

/**
 * Opens the user's default web browser app to the specified uri If the user
 * has an app installed that is registered as the default handler for the URL,
 * then this app will be opened instead, and its icon will be used in the
 * suggested action UI.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri {
  /**
   * Required. The uri to open on the user device
   */
  uri?: string;
}

/**
 * Opens the device's location chooser so the user can pick a location to send
 * back to the agent.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation {
}

/**
 * Rich Business Messaging (RBM) suggested reply that the user can click
 * instead of typing in their own response.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply {
  /**
   * Opaque payload that the Dialogflow receives in a user event when the user
   * taps the suggested reply. This data will be also forwarded to webhook to
   * allow performing custom business logic.
   */
  postbackData?: string;
  /**
   * Suggested reply text.
   */
  text?: string;
}

/**
 * Rich Business Messaging (RBM) suggestion. Suggestions allow user to easily
 * select/click a predefined response or perform an action (like opening a web
 * uri).
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion {
  /**
   * Predefined client side actions that user can choose
   */
  action?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction;
  /**
   * Predefined replies for user to select instead of typing
   */
  reply?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply;
}

/**
 * Rich Business Messaging (RBM) text response with suggestions.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageRbmText {
  /**
   * Optional. One or more suggestions to show to the user.
   */
  rbmSuggestion?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion[];
  /**
   * Required. Text sent and displayed to the user.
   */
  text?: string;
}

/**
 * Additional info about the select item for when it is triggered in a dialog.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo {
  /**
   * Required. A unique key that will be sent back to the agent if this
   * response is given.
   */
  key?: string;
  /**
   * Optional. A list of synonyms that can also be used to trigger this item in
   * dialog.
   */
  synonyms?: string[];
}

/**
 * The simple response message containing speech or text.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse {
  /**
   * Optional. The text to display.
   */
  displayText?: string;
  /**
   * One of text_to_speech or ssml must be provided. Structured spoken response
   * to the user in the SSML format. Mutually exclusive with text_to_speech.
   */
  ssml?: string;
  /**
   * One of text_to_speech or ssml must be provided. The plain text of the
   * speech output. Mutually exclusive with ssml.
   */
  textToSpeech?: string;
}

/**
 * The collection of simple response candidates. This message in
 * `QueryResult.fulfillment_messages` and `WebhookResponse.fulfillment_messages`
 * should contain only one `SimpleResponse`.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses {
  /**
   * Required. The list of simple responses.
   */
  simpleResponses?: GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse[];
}

/**
 * The suggestion chip message that the user can tap to quickly post a reply to
 * the conversation.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageSuggestion {
  /**
   * Required. The text shown the in the suggestion chip.
   */
  title?: string;
}

/**
 * The collection of suggestions.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageSuggestions {
  /**
   * Required. The list of suggested replies.
   */
  suggestions?: GoogleCloudDialogflowV2beta1IntentMessageSuggestion[];
}

/**
 * Table card for Actions on Google.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageTableCard {
  /**
   * Optional. List of buttons for the card.
   */
  buttons?: GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton[];
  /**
   * Optional. Display properties for the columns in this table.
   */
  columnProperties?: GoogleCloudDialogflowV2beta1IntentMessageColumnProperties[];
  /**
   * Optional. Image which should be displayed on the card.
   */
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  /**
   * Optional. Rows in this table of data.
   */
  rows?: GoogleCloudDialogflowV2beta1IntentMessageTableCardRow[];
  /**
   * Optional. Subtitle to the title.
   */
  subtitle?: string;
  /**
   * Required. Title of the card.
   */
  title?: string;
}

/**
 * Cell of TableCardRow.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageTableCardCell {
  /**
   * Required. Text in this cell.
   */
  text?: string;
}

/**
 * Row of TableCard.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageTableCardRow {
  /**
   * Optional. List of cells that make up this row.
   */
  cells?: GoogleCloudDialogflowV2beta1IntentMessageTableCardCell[];
  /**
   * Optional. Whether to add a visual divider after this row.
   */
  dividerAfter?: boolean;
}

/**
 * Plays audio from a file in Telephony Gateway.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio {
  /**
   * Required. URI to a Google Cloud Storage object containing the audio to
   * play, e.g., "gs://bucket/object". The object must contain a single channel
   * (mono) of linear PCM audio (2 bytes / sample) at 8kHz. This object must be
   * readable by the `service-@gcp-sa-dialogflow.iam.gserviceaccount.com`
   * service account where is the number of the Telephony Gateway project
   * (usually the same as the Dialogflow agent project). If the Google Cloud
   * Storage bucket is in the Telephony Gateway project, this permission is
   * added by default when enabling the Dialogflow V2 API. For audio from other
   * sources, consider using the `TelephonySynthesizeSpeech` message with SSML.
   */
  audioUri?: string;
}

/**
 * Synthesizes speech and plays back the synthesized audio to the caller in
 * Telephony Gateway. Telephony Gateway takes the synthesizer settings from
 * `DetectIntentResponse.output_audio_config` which can either be set at
 * request-level or can come from the agent-level synthesizer config.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech {
  /**
   * The SSML to be synthesized. For more information, see
   * [SSML](https://developers.google.com/actions/reference/ssml).
   */
  ssml?: string;
  /**
   * The raw text to be synthesized.
   */
  text?: string;
}

/**
 * Transfers the call in Telephony Gateway.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall {
  /**
   * Required. The phone number to transfer the call to in [E.164
   * format](https://en.wikipedia.org/wiki/E.164). We currently only allow
   * transferring to US numbers (+1xxxyyyzzzz).
   */
  phoneNumber?: string;
}

/**
 * The text response message.
 */
export interface GoogleCloudDialogflowV2beta1IntentMessageText {
  /**
   * Optional. The collection of the agent's responses.
   */
  text?: string[];
}

/**
 * Represents intent parameters.
 */
export interface GoogleCloudDialogflowV2beta1IntentParameter {
  /**
   * Optional. The default value to use when the `value` yields an empty
   * result. Default values can be extracted from contexts by using the
   * following syntax: `#context_name.parameter_name`.
   */
  defaultValue?: string;
  /**
   * Required. The name of the parameter.
   */
  displayName?: string;
  /**
   * Optional. The name of the entity type, prefixed with `@`, that describes
   * values of the parameter. If the parameter is required, this must be
   * provided.
   */
  entityTypeDisplayName?: string;
  /**
   * Optional. Indicates whether the parameter represents a list of values.
   */
  isList?: boolean;
  /**
   * Optional. Indicates whether the parameter is required. That is, whether
   * the intent cannot be completed without collecting the parameter value.
   */
  mandatory?: boolean;
  /**
   * The unique identifier of this parameter.
   */
  name?: string;
  /**
   * Optional. The collection of prompts that the agent can present to the user
   * in order to collect a value for the parameter.
   */
  prompts?: string[];
  /**
   * Optional. The definition of the parameter value. It can be: - a constant
   * string, - a parameter value defined as `$parameter_name`, - an original
   * parameter value defined as `$parameter_name.original`, - a parameter value
   * from some context defined as `#context_name.parameter_name`.
   */
  value?: string;
}

/**
 * Represents an example that the agent is trained on.
 */
export interface GoogleCloudDialogflowV2beta1IntentTrainingPhrase {
  /**
   * Output only. The unique identifier of this training phrase.
   */
  name?: string;
  /**
   * Required. The ordered list of training phrase parts. The parts are
   * concatenated in order to form the training phrase. Note: The API does not
   * automatically annotate training phrases like the Dialogflow Console does.
   * Note: Do not forget to include whitespace at part boundaries, so the
   * training phrase is well formatted when the parts are concatenated. If the
   * training phrase does not need to be annotated with parameters, you just
   * need a single part with only the Part.text field set. If you want to
   * annotate the training phrase, you must create multiple parts, where the
   * fields of each part are populated in one of two ways: - `Part.text` is set
   * to a part of the phrase that has no parameters. - `Part.text` is set to a
   * part of the phrase that you want to annotate, and the `entity_type`,
   * `alias`, and `user_defined` fields are all set.
   */
  parts?: GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart[];
  /**
   * Optional. Indicates how many times this example was added to the intent.
   * Each time a developer adds an existing sample by editing an intent or
   * training, this counter is increased.
   */
  timesAddedCount?: number;
  /**
   * Required. The type of the training phrase.
   */
  type?:  | "TYPE_UNSPECIFIED" | "EXAMPLE" | "TEMPLATE";
}

/**
 * Represents a part of a training phrase.
 */
export interface GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart {
  /**
   * Optional. The parameter name for the value extracted from the annotated
   * part of the example. This field is required for annotated parts of the
   * training phrase.
   */
  alias?: string;
  /**
   * Optional. The entity type name prefixed with `@`. This field is required
   * for annotated parts of the training phrase.
   */
  entityType?: string;
  /**
   * Required. The text for this part.
   */
  text?: string;
  /**
   * Optional. Indicates whether the text was manually annotated. This field is
   * set to true when the Dialogflow Console is used to manually annotate the
   * part. When creating an annotated part with the API, you must set this to
   * true.
   */
  userDefined?: boolean;
}

/**
 * Represents the result of querying a Knowledge base.
 */
export interface GoogleCloudDialogflowV2beta1KnowledgeAnswers {
  /**
   * A list of answers from Knowledge Connector.
   */
  answers?: GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer[];
}

/**
 * An answer from Knowledge Connector.
 */
export interface GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer {
  /**
   * The piece of text from the `source` knowledge base document that answers
   * this conversational query.
   */
  answer?: string;
  /**
   * The corresponding FAQ question if the answer was extracted from a FAQ
   * Document, empty otherwise.
   */
  faqQuestion?: string;
  /**
   * The system's confidence score that this Knowledge answer is a good match
   * for this conversational query. The range is from 0.0 (completely uncertain)
   * to 1.0 (completely certain). Note: The confidence score is likely to vary
   * somewhat (possibly even for identical requests), as the underlying model is
   * under constant improvement. It may be deprecated in the future. We
   * recommend using `match_confidence_level` which should be generally more
   * stable.
   */
  matchConfidence?: number;
  /**
   * The system's confidence level that this knowledge answer is a good match
   * for this conversational query. NOTE: The confidence level for a given ``
   * pair may change without notice, as it depends on models that are constantly
   * being improved. However, it will change less frequently than the confidence
   * score below, and should be preferred for referencing the quality of an
   * answer.
   */
  matchConfidenceLevel?:  | "MATCH_CONFIDENCE_LEVEL_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH";
  /**
   * Indicates which Knowledge Document this answer was extracted from. Format:
   * `projects//knowledgeBases//documents/`.
   */
  source?: string;
}

/**
 * Metadata in google::longrunning::Operation for Knowledge operations.
 */
export interface GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata {
  /**
   * Metadata for the Export Data Operation such as the destination of export.
   */
  exportOperationMetadata?: GoogleCloudDialogflowV2beta1ExportOperationMetadata;
  /**
   * The name of the knowledge base interacted with during the operation.
   */
  knowledgeBase?: string;
  /**
   * Required. Output only. The current state of this operation.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE";
}

/**
 * Represents a message posted into a conversation.
 */
export interface GoogleCloudDialogflowV2beta1Message {
  /**
   * Required. The message content.
   */
  content?: string;
  /**
   * Output only. The time when the message was created in Contact Center AI.
   */
  readonly createTime?: Date;
  /**
   * Optional. The message language. This should be a
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag.
   * Example: "en-US".
   */
  languageCode?: string;
  /**
   * Output only. The annotation for the message.
   */
  readonly messageAnnotation?: GoogleCloudDialogflowV2beta1MessageAnnotation;
  /**
   * Optional. The unique identifier of the message. Format:
   * `projects//locations//conversations//messages/`.
   */
  name?: string;
  /**
   * Output only. The participant that sends this message.
   */
  readonly participant?: string;
  /**
   * Output only. The role of the participant.
   */
  readonly participantRole?:  | "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER";
  /**
   * Optional. The time when the message was sent.
   */
  sendTime?: Date;
  /**
   * Output only. The sentiment analysis result for the message.
   */
  readonly sentimentAnalysis?: GoogleCloudDialogflowV2beta1SentimentAnalysisResult;
}

function serializeGoogleCloudDialogflowV2beta1Message(data: any): GoogleCloudDialogflowV2beta1Message {
  return {
    ...data,
    sendTime: data["sendTime"] !== undefined ? data["sendTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2beta1Message(data: any): GoogleCloudDialogflowV2beta1Message {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    sendTime: data["sendTime"] !== undefined ? new Date(data["sendTime"]) : undefined,
  };
}

/**
 * Represents the result of annotation for the message.
 */
export interface GoogleCloudDialogflowV2beta1MessageAnnotation {
  /**
   * Required. Indicates whether the text message contains entities.
   */
  containEntities?: boolean;
  /**
   * Optional. The collection of annotated message parts ordered by their
   * position in the message. You can recover the annotated message by
   * concatenating [AnnotatedMessagePart.text].
   */
  parts?: GoogleCloudDialogflowV2beta1AnnotatedMessagePart[];
}

/**
 * Represents the contents of the original request that was passed to the
 * `[Streaming]DetectIntent` call.
 */
export interface GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest {
  /**
   * Optional. This field is set to the value of the `QueryParameters.payload`
   * field passed in the request. Some integrations that query a Dialogflow
   * agent may provide additional information in the payload. In particular, for
   * the Dialogflow Phone Gateway integration, this field has the form: {
   * "telephony": { "caller_id": "+18558363987" } } Note: The caller ID field
   * (`caller_id`) will be redacted for Trial Edition agents and populated with
   * the caller ID in [E.164 format](https://en.wikipedia.org/wiki/E.164) for
   * Essentials Edition agents.
   */
  payload?: {
    [key: string]: any
  };
  /**
   * The source of this request, e.g., `google`, `facebook`, `slack`. It is set
   * by Dialogflow-owned servers.
   */
  source?: string;
  /**
   * Optional. The version of the protocol used for this request. This field is
   * AoG-specific.
   */
  version?: string;
}

/**
 * Represents the result of conversational query or event processing.
 */
export interface GoogleCloudDialogflowV2beta1QueryResult {
  /**
   * The action name from the matched intent.
   */
  action?: string;
  /**
   * This field is set to: - `false` if the matched intent has required
   * parameters and not all of the required parameter values have been
   * collected. - `true` if all required parameter values have been collected,
   * or if the matched intent doesn't contain any required parameters.
   */
  allRequiredParamsPresent?: boolean;
  /**
   * Indicates whether the conversational query triggers a cancellation for
   * slot filling. For more information, see the [cancel slot filling
   * documentation](https://cloud.google.com/dialogflow/es/docs/intents-actions-parameters#cancel).
   */
  cancelsSlotFilling?: boolean;
  /**
   * Free-form diagnostic information for the associated detect intent request.
   * The fields of this data can change without notice, so you should not write
   * code that depends on its structure. The data may contain: - webhook call
   * latency - webhook errors
   */
  diagnosticInfo?: {
    [key: string]: any
  };
  /**
   * The collection of rich messages to present to the user.
   */
  fulfillmentMessages?: GoogleCloudDialogflowV2beta1IntentMessage[];
  /**
   * The text to be pronounced to the user or shown on the screen. Note: This
   * is a legacy field, `fulfillment_messages` should be preferred.
   */
  fulfillmentText?: string;
  /**
   * The intent that matched the conversational query. Some, not all fields are
   * filled in this message, including but not limited to: `name`,
   * `display_name`, `end_interaction` and `is_fallback`.
   */
  intent?: GoogleCloudDialogflowV2beta1Intent;
  /**
   * The intent detection confidence. Values range from 0.0 (completely
   * uncertain) to 1.0 (completely certain). This value is for informational
   * purpose only and is only used to help match the best intent within the
   * classification threshold. This value may change for the same end-user
   * expression at any time due to a model retraining or change in
   * implementation. If there are `multiple knowledge_answers` messages, this
   * value is set to the greatest `knowledgeAnswers.match_confidence` value in
   * the list.
   */
  intentDetectionConfidence?: number;
  /**
   * The result from Knowledge Connector (if any), ordered by decreasing
   * `KnowledgeAnswers.match_confidence`.
   */
  knowledgeAnswers?: GoogleCloudDialogflowV2beta1KnowledgeAnswers;
  /**
   * The language that was triggered during intent detection. See [Language
   * Support](https://cloud.google.com/dialogflow/docs/reference/language) for a
   * list of the currently supported language codes.
   */
  languageCode?: string;
  /**
   * The collection of output contexts. If applicable,
   * `output_contexts.parameters` contains entries with name `.original`
   * containing the original parameter values before the query.
   */
  outputContexts?: GoogleCloudDialogflowV2beta1Context[];
  /**
   * The collection of extracted parameters. Depending on your protocol or
   * client library language, this is a map, associative array, symbol table,
   * dictionary, or JSON object composed of a collection of (MapKey, MapValue)
   * pairs: - MapKey type: string - MapKey value: parameter name - MapValue
   * type: - If parameter's entity type is a composite entity: map - Else:
   * depending on parameter value type, could be one of string, number, boolean,
   * null, list or map - MapValue value: - If parameter's entity type is a
   * composite entity: map from composite entity property names to property
   * values - Else: parameter value
   */
  parameters?: {
    [key: string]: any
  };
  /**
   * The original conversational query text: - If natural language text was
   * provided as input, `query_text` contains a copy of the input. - If natural
   * language speech audio was provided as input, `query_text` contains the
   * speech recognition result. If speech recognizer produced multiple
   * alternatives, a particular one is picked. - If automatic spell correction
   * is enabled, `query_text` will contain the corrected user input.
   */
  queryText?: string;
  /**
   * The sentiment analysis result, which depends on the
   * `sentiment_analysis_request_config` specified in the request.
   */
  sentimentAnalysisResult?: GoogleCloudDialogflowV2beta1SentimentAnalysisResult;
  /**
   * The Speech recognition confidence between 0.0 and 1.0. A higher number
   * indicates an estimated greater likelihood that the recognized words are
   * correct. The default of 0.0 is a sentinel value indicating that confidence
   * was not set. This field is not guaranteed to be accurate or set. In
   * particular this field isn't set for StreamingDetectIntent since the
   * streaming endpoint has separate confidence estimates per portion of the
   * audio in StreamingRecognitionResult.
   */
  speechRecognitionConfidence?: number;
  /**
   * If the query was fulfilled by a webhook call, this field is set to the
   * value of the `payload` field returned in the webhook response.
   */
  webhookPayload?: {
    [key: string]: any
  };
  /**
   * If the query was fulfilled by a webhook call, this field is set to the
   * value of the `source` field returned in the webhook response.
   */
  webhookSource?: string;
}

/**
 * The sentiment, such as positive/negative feeling or association, for a unit
 * of analysis, such as the query text. See:
 * https://cloud.google.com/natural-language/docs/basics#interpreting_sentiment_analysis_values
 * for how to interpret the result.
 */
export interface GoogleCloudDialogflowV2beta1Sentiment {
  /**
   * A non-negative number in the [0, +inf) range, which represents the
   * absolute magnitude of sentiment, regardless of score (positive or
   * negative).
   */
  magnitude?: number;
  /**
   * Sentiment score between -1.0 (negative sentiment) and 1.0 (positive
   * sentiment).
   */
  score?: number;
}

/**
 * The result of sentiment analysis. Sentiment analysis inspects user input and
 * identifies the prevailing subjective opinion, especially to determine a
 * user's attitude as positive, negative, or neutral. For
 * Participants.DetectIntent, it needs to be configured in
 * DetectIntentRequest.query_params. For Participants.StreamingDetectIntent, it
 * needs to be configured in StreamingDetectIntentRequest.query_params. And for
 * Participants.AnalyzeContent and Participants.StreamingAnalyzeContent, it
 * needs to be configured in ConversationProfile.human_agent_assistant_config
 */
export interface GoogleCloudDialogflowV2beta1SentimentAnalysisResult {
  /**
   * The sentiment analysis result for `query_text`.
   */
  queryTextSentiment?: GoogleCloudDialogflowV2beta1Sentiment;
}

/**
 * A session represents a conversation between a Dialogflow agent and an
 * end-user. You can create special entities, called session entities, during a
 * session. Session entities can extend or replace custom entity types and only
 * exist during the session that they were created for. All session data,
 * including session entities, is stored by Dialogflow for 20 minutes. For more
 * information, see the [session entity
 * guide](https://cloud.google.com/dialogflow/docs/entities-session).
 */
export interface GoogleCloudDialogflowV2beta1SessionEntityType {
  /**
   * Required. The collection of entities associated with this session entity
   * type.
   */
  entities?: GoogleCloudDialogflowV2beta1EntityTypeEntity[];
  /**
   * Required. Indicates whether the additional data should override or
   * supplement the custom entity type definition.
   */
  entityOverrideMode?:  | "ENTITY_OVERRIDE_MODE_UNSPECIFIED" | "ENTITY_OVERRIDE_MODE_OVERRIDE" | "ENTITY_OVERRIDE_MODE_SUPPLEMENT";
  /**
   * Required. The unique identifier of this session entity type. Supported
   * formats: - `projects//agent/sessions//entityTypes/` -
   * `projects//locations//agent/sessions//entityTypes/` -
   * `projects//agent/environments//users//sessions//entityTypes/` -
   * `projects//locations//agent/environments/ /users//sessions//entityTypes/`
   * If `Location ID` is not specified we assume default 'us' location. If
   * `Environment ID` is not specified, we assume default 'draft' environment.
   * If `User ID` is not specified, we assume default '-' user. `` must be the
   * display name of an existing entity type in the same agent that will be
   * overridden or supplemented.
   */
  name?: string;
}

/**
 * Metadata for a ConversationProfile.SetSuggestionFeatureConfig operation.
 */
export interface GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata {
  /**
   * The resource name of the conversation profile. Format:
   * `projects//locations//conversationProfiles/`
   */
  conversationProfile?: string;
  /**
   * Timestamp whe the request was created. The time is measured on server
   * side.
   */
  createTime?: Date;
  /**
   * Required. The participant role to add or update the suggestion feature
   * config. Only HUMAN_AGENT or END_USER can be used.
   */
  participantRole?:  | "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER";
  /**
   * Required. The type of the suggestion feature to add or update.
   */
  suggestionFeatureType?:  | "TYPE_UNSPECIFIED" | "ARTICLE_SUGGESTION" | "FAQ" | "SMART_REPLY" | "CONVERSATION_SUMMARIZATION";
}

function serializeGoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata(data: any): GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata(data: any): GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Represents a smart reply answer.
 */
export interface GoogleCloudDialogflowV2beta1SmartReplyAnswer {
  /**
   * The name of answer record, in the format of
   * "projects//locations//answerRecords/"
   */
  answerRecord?: string;
  /**
   * Smart reply confidence. The system's confidence score that this reply is a
   * good match for this conversation, as a value from 0.0 (completely
   * uncertain) to 1.0 (completely certain).
   */
  confidence?: number;
  /**
   * The content of the reply.
   */
  reply?: string;
}

/**
 * The response message for Participants.SuggestArticles.
 */
export interface GoogleCloudDialogflowV2beta1SuggestArticlesResponse {
  /**
   * Output only. Articles ordered by score in descending order.
   */
  articleAnswers?: GoogleCloudDialogflowV2beta1ArticleAnswer[];
  /**
   * Number of messages prior to and including latest_message to compile the
   * suggestion. It may be smaller than the SuggestArticlesResponse.context_size
   * field in the request if there aren't that many messages in the
   * conversation.
   */
  contextSize?: number;
  /**
   * The name of the latest conversation message used to compile suggestion
   * for. Format: `projects//locations//conversations//messages/`.
   */
  latestMessage?: string;
}

/**
 * The request message for Participants.SuggestFaqAnswers.
 */
export interface GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse {
  /**
   * Number of messages prior to and including latest_message to compile the
   * suggestion. It may be smaller than the
   * SuggestFaqAnswersRequest.context_size field in the request if there aren't
   * that many messages in the conversation.
   */
  contextSize?: number;
  /**
   * Output only. Answers extracted from FAQ documents.
   */
  faqAnswers?: GoogleCloudDialogflowV2beta1FaqAnswer[];
  /**
   * The name of the latest conversation message used to compile suggestion
   * for. Format: `projects//locations//conversations//messages/`.
   */
  latestMessage?: string;
}

/**
 * One response of different type of suggestion response which is used in the
 * response of Participants.AnalyzeContent and Participants.AnalyzeContent, as
 * well as HumanAgentAssistantEvent.
 */
export interface GoogleCloudDialogflowV2beta1SuggestionResult {
  /**
   * Error status if the request failed.
   */
  error?: GoogleRpcStatus;
  /**
   * SuggestArticlesResponse if request is for ARTICLE_SUGGESTION.
   */
  suggestArticlesResponse?: GoogleCloudDialogflowV2beta1SuggestArticlesResponse;
  /**
   * SuggestFaqAnswersResponse if request is for FAQ_ANSWER.
   */
  suggestFaqAnswersResponse?: GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse;
  /**
   * SuggestSmartRepliesResponse if request is for SMART_REPLY.
   */
  suggestSmartRepliesResponse?: GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse;
}

/**
 * The response message for Participants.SuggestSmartReplies.
 */
export interface GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse {
  /**
   * Number of messages prior to and including latest_message to compile the
   * suggestion. It may be smaller than the
   * SuggestSmartRepliesRequest.context_size field in the request if there
   * aren't that many messages in the conversation.
   */
  contextSize?: number;
  /**
   * The name of the latest conversation message used to compile suggestion
   * for. Format: `projects//locations//conversations//messages/`.
   */
  latestMessage?: string;
  /**
   * Output only. Multiple reply options provided by smart reply service. The
   * order is based on the rank of the model prediction. The maximum number of
   * the returned replies is set in SmartReplyConfig.
   */
  smartReplyAnswers?: GoogleCloudDialogflowV2beta1SmartReplyAnswer[];
}

/**
 * The request message for a webhook call.
 */
export interface GoogleCloudDialogflowV2beta1WebhookRequest {
  /**
   * Alternative query results from KnowledgeService.
   */
  alternativeQueryResults?: GoogleCloudDialogflowV2beta1QueryResult[];
  /**
   * Optional. The contents of the original request that was passed to
   * `[Streaming]DetectIntent` call.
   */
  originalDetectIntentRequest?: GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest;
  /**
   * The result of the conversational query or event processing. Contains the
   * same value as `[Streaming]DetectIntentResponse.query_result`.
   */
  queryResult?: GoogleCloudDialogflowV2beta1QueryResult;
  /**
   * The unique identifier of the response. Contains the same value as
   * `[Streaming]DetectIntentResponse.response_id`.
   */
  responseId?: string;
  /**
   * The unique identifier of detectIntent request session. Can be used to
   * identify end-user inside webhook implementation. Supported formats: -
   * `projects//agent/sessions/, - `projects//locations//agent/sessions/`, -
   * `projects//agent/environments//users//sessions/`, -
   * `projects//locations//agent/environments//users//sessions/`,
   */
  session?: string;
}

/**
 * The response message for a webhook call. This response is validated by the
 * Dialogflow server. If validation fails, an error will be returned in the
 * QueryResult.diagnostic_info field. Setting JSON fields to an empty value with
 * the wrong type is a common error. To avoid this error: - Use `""` for empty
 * strings - Use `{}` or `null` for empty objects - Use `[]` or `null` for empty
 * arrays For more information, see the [Protocol Buffers Language
 * Guide](https://developers.google.com/protocol-buffers/docs/proto3#json).
 */
export interface GoogleCloudDialogflowV2beta1WebhookResponse {
  /**
   * Optional. Indicates that this intent ends an interaction. Some
   * integrations (e.g., Actions on Google or Dialogflow phone gateway) use this
   * information to close interaction with an end user. Default is false.
   */
  endInteraction?: boolean;
  /**
   * Optional. Invokes the supplied events. When this field is set, Dialogflow
   * ignores the `fulfillment_text`, `fulfillment_messages`, and `payload`
   * fields.
   */
  followupEventInput?: GoogleCloudDialogflowV2beta1EventInput;
  /**
   * Optional. The rich response messages intended for the end-user. When
   * provided, Dialogflow uses this field to populate
   * QueryResult.fulfillment_messages sent to the integration or API caller.
   */
  fulfillmentMessages?: GoogleCloudDialogflowV2beta1IntentMessage[];
  /**
   * Optional. The text response message intended for the end-user. It is
   * recommended to use `fulfillment_messages.text.text[0]` instead. When
   * provided, Dialogflow uses this field to populate
   * QueryResult.fulfillment_text sent to the integration or API caller.
   */
  fulfillmentText?: string;
  /**
   * Indicates that a live agent should be brought in to handle the interaction
   * with the user. In most cases, when you set this flag to true, you would
   * also want to set end_interaction to true as well. Default is false.
   */
  liveAgentHandoff?: boolean;
  /**
   * Optional. The collection of output contexts that will overwrite currently
   * active contexts for the session and reset their lifespans. When provided,
   * Dialogflow uses this field to populate QueryResult.output_contexts sent to
   * the integration or API caller.
   */
  outputContexts?: GoogleCloudDialogflowV2beta1Context[];
  /**
   * Optional. This field can be used to pass custom data from your webhook to
   * the integration or API caller. Arbitrary JSON objects are supported. When
   * provided, Dialogflow uses this field to populate
   * QueryResult.webhook_payload sent to the integration or API caller. This
   * field is also used by the [Google Assistant
   * integration](https://cloud.google.com/dialogflow/docs/integrations/aog) for
   * rich response messages. See the format definition at [Google Assistant
   * Dialogflow webhook
   * format](https://developers.google.com/assistant/actions/build/json/dialogflow-webhook-json)
   */
  payload?: {
    [key: string]: any
  };
  /**
   * Optional. Additional session entity types to replace or extend developer
   * entity types with. The entity synonyms apply to all languages and persist
   * for the session. Setting this data from a webhook overwrites the session
   * entity types that have been set using `detectIntent`,
   * `streamingDetectIntent` or SessionEntityType management methods.
   */
  sessionEntityTypes?: GoogleCloudDialogflowV2beta1SessionEntityType[];
  /**
   * Optional. A custom field used to identify the webhook source. Arbitrary
   * strings are supported. When provided, Dialogflow uses this field to
   * populate QueryResult.webhook_source sent to the integration or API caller.
   */
  source?: string;
}

/**
 * Metadata for a ConversationProfile.ClearSuggestionFeatureConfig operation.
 */
export interface GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata {
  /**
   * The resource name of the conversation profile. Format:
   * `projects//locations//conversationProfiles/`
   */
  conversationProfile?: string;
  /**
   * Timestamp whe the request was created. The time is measured on server
   * side.
   */
  createTime?: Date;
  /**
   * Required. The participant role to remove the suggestion feature config.
   * Only HUMAN_AGENT or END_USER can be used.
   */
  participantRole?:  | "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER";
  /**
   * Required. The type of the suggestion feature to remove.
   */
  suggestionFeatureType?:  | "TYPE_UNSPECIFIED" | "ARTICLE_SUGGESTION" | "FAQ" | "SMART_REPLY";
}

function serializeGoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata(data: any): GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata(data: any): GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Dialogflow contexts are similar to natural language context. If a person
 * says to you "they are orange", you need context in order to understand what
 * "they" is referring to. Similarly, for Dialogflow to handle an end-user
 * expression like that, it needs to be provided with context in order to
 * correctly match an intent. Using contexts, you can control the flow of a
 * conversation. You can configure contexts for an intent by setting input and
 * output contexts, which are identified by string names. When an intent is
 * matched, any configured output contexts for that intent become active. While
 * any contexts are active, Dialogflow is more likely to match intents that are
 * configured with input contexts that correspond to the currently active
 * contexts. For more information about context, see the [Contexts
 * guide](https://cloud.google.com/dialogflow/docs/contexts-overview).
 */
export interface GoogleCloudDialogflowV2Context {
  /**
   * Optional. The number of conversational query requests after which the
   * context expires. The default is `0`. If set to `0`, the context expires
   * immediately. Contexts expire automatically after 20 minutes if there are no
   * matching queries.
   */
  lifespanCount?: number;
  /**
   * Required. The unique identifier of the context. Format:
   * `projects//agent/sessions//contexts/`, or
   * `projects//agent/environments//users//sessions//contexts/`. The `Context
   * ID` is always converted to lowercase, may only contain characters in
   * a-zA-Z0-9_-% and may be at most 250 bytes long. If `Environment ID` is not
   * specified, we assume default 'draft' environment. If `User ID` is not
   * specified, we assume default '-' user. The following context names are
   * reserved for internal use by Dialogflow. You should not use these contexts
   * or create contexts with these names: * `__system_counters__` *
   * `*_id_dialog_context` * `*_dialog_params_size`
   */
  name?: string;
  /**
   * Optional. The collection of parameters associated with this context.
   * Depending on your protocol or client library language, this is a map,
   * associative array, symbol table, dictionary, or JSON object composed of a
   * collection of (MapKey, MapValue) pairs: - MapKey type: string - MapKey
   * value: parameter name - MapValue type: - If parameter's entity type is a
   * composite entity: map - Else: depending on parameter value type, could be
   * one of string, number, boolean, null, list or map - MapValue value: - If
   * parameter's entity type is a composite entity: map from composite entity
   * property names to property values - Else: parameter value
   */
  parameters?: {
    [key: string]: any
  };
}

/**
 * Represents a notification sent to Pub/Sub subscribers for conversation
 * lifecycle events.
 */
export interface GoogleCloudDialogflowV2ConversationEvent {
  /**
   * The unique identifier of the conversation this notification refers to.
   * Format: `projects//conversations/`.
   */
  conversation?: string;
  /**
   * More detailed information about an error. Only set for type
   * UNRECOVERABLE_ERROR_IN_PHONE_CALL.
   */
  errorStatus?: GoogleRpcStatus;
  /**
   * Payload of NEW_MESSAGE event.
   */
  newMessagePayload?: GoogleCloudDialogflowV2Message;
  /**
   * The type of the event that this notification refers to.
   */
  type?:  | "TYPE_UNSPECIFIED" | "CONVERSATION_STARTED" | "CONVERSATION_FINISHED" | "HUMAN_INTERVENTION_NEEDED" | "NEW_MESSAGE" | "UNRECOVERABLE_ERROR";
}

function serializeGoogleCloudDialogflowV2ConversationEvent(data: any): GoogleCloudDialogflowV2ConversationEvent {
  return {
    ...data,
    newMessagePayload: data["newMessagePayload"] !== undefined ? serializeGoogleCloudDialogflowV2Message(data["newMessagePayload"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2ConversationEvent(data: any): GoogleCloudDialogflowV2ConversationEvent {
  return {
    ...data,
    newMessagePayload: data["newMessagePayload"] !== undefined ? deserializeGoogleCloudDialogflowV2Message(data["newMessagePayload"]) : undefined,
  };
}

/**
 * Represents a conversation model.
 */
export interface GoogleCloudDialogflowV2ConversationModel {
  /**
   * Metadata for article suggestion models.
   */
  articleSuggestionModelMetadata?: GoogleCloudDialogflowV2ArticleSuggestionModelMetadata;
  /**
   * Output only. Creation time of this model.
   */
  readonly createTime?: Date;
  /**
   * Required. Datasets used to create model.
   */
  datasets?: GoogleCloudDialogflowV2InputDataset[];
  /**
   * Required. The display name of the model. At most 64 bytes long.
   */
  displayName?: string;
  /**
   * Language code for the conversation model. If not specified, the language
   * is en-US. Language at ConversationModel should be set for all non en-us
   * languages. This should be a
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag.
   * Example: "en-US".
   */
  languageCode?: string;
  /**
   * ConversationModel resource name. Format: `projects//conversationModels/`
   */
  name?: string;
  /**
   * Metadata for smart reply models.
   */
  smartReplyModelMetadata?: GoogleCloudDialogflowV2SmartReplyModelMetadata;
  /**
   * Output only. State of the model. A model can only serve prediction
   * requests after it gets deployed.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "CREATING" | "UNDEPLOYED" | "DEPLOYING" | "DEPLOYED" | "UNDEPLOYING" | "DELETING" | "FAILED" | "PENDING";
}

/**
 * Metadata for ConversationDatasets.
 */
export interface GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata {
  /**
   * The resource name of the conversation dataset that will be created.
   * Format: `projects//locations//conversationDatasets/`
   */
  conversationDataset?: string;
}

/**
 * Metadata for a ConversationModels.CreateConversationModelEvaluation
 * operation.
 */
export interface GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata {
  /**
   * The resource name of the conversation model. Format:
   * `projects//locations//conversationModels/`
   */
  conversationModel?: string;
  /**
   * The resource name of the conversation model. Format:
   * `projects//locations//conversationModels//evaluations/`
   */
  conversationModelEvaluation?: string;
  /**
   * Timestamp when the request to create conversation model was submitted. The
   * time is measured on server side.
   */
  createTime?: Date;
  /**
   * State of CreateConversationModel operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "INITIALIZING" | "RUNNING" | "CANCELLED" | "SUCCEEDED" | "FAILED";
}

function serializeGoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata(data: any): GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata(data: any): GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata for a ConversationModels.CreateConversationModel operation.
 */
export interface GoogleCloudDialogflowV2CreateConversationModelOperationMetadata {
  /**
   * The resource name of the conversation model. Format:
   * `projects//conversationModels/`
   */
  conversationModel?: string;
  /**
   * Timestamp when the request to create conversation model is submitted. The
   * time is measured on server side.
   */
  createTime?: Date;
  /**
   * State of CreateConversationModel operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "PENDING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "CANCELLING" | "TRAINING";
}

function serializeGoogleCloudDialogflowV2CreateConversationModelOperationMetadata(data: any): GoogleCloudDialogflowV2CreateConversationModelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2CreateConversationModelOperationMetadata(data: any): GoogleCloudDialogflowV2CreateConversationModelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata for ConversationDatasets.
 */
export interface GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata {
}

/**
 * Metadata for a ConversationModels.DeleteConversationModel operation.
 */
export interface GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata {
  /**
   * The resource name of the conversation model. Format:
   * `projects//conversationModels/`
   */
  conversationModel?: string;
  /**
   * Timestamp when delete conversation model request was created. The time is
   * measured on server side.
   */
  createTime?: Date;
}

function serializeGoogleCloudDialogflowV2DeleteConversationModelOperationMetadata(data: any): GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2DeleteConversationModelOperationMetadata(data: any): GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata for a ConversationModels.DeployConversationModel operation.
 */
export interface GoogleCloudDialogflowV2DeployConversationModelOperationMetadata {
  /**
   * The resource name of the conversation model. Format:
   * `projects//conversationModels/`
   */
  conversationModel?: string;
  /**
   * Timestamp when request to deploy conversation model was submitted. The
   * time is measured on server side.
   */
  createTime?: Date;
}

function serializeGoogleCloudDialogflowV2DeployConversationModelOperationMetadata(data: any): GoogleCloudDialogflowV2DeployConversationModelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2DeployConversationModelOperationMetadata(data: any): GoogleCloudDialogflowV2DeployConversationModelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Each intent parameter has a type, called the entity type, which dictates
 * exactly how data from an end-user expression is extracted. Dialogflow
 * provides predefined system entities that can match many common types of data.
 * For example, there are system entities for matching dates, times, colors,
 * email addresses, and so on. You can also create your own custom entities for
 * matching custom data. For example, you could define a vegetable entity that
 * can match the types of vegetables available for purchase with a grocery store
 * agent. For more information, see the [Entity
 * guide](https://cloud.google.com/dialogflow/docs/entities-overview).
 */
export interface GoogleCloudDialogflowV2EntityType {
  /**
   * Optional. Indicates whether the entity type can be automatically expanded.
   */
  autoExpansionMode?:  | "AUTO_EXPANSION_MODE_UNSPECIFIED" | "AUTO_EXPANSION_MODE_DEFAULT";
  /**
   * Required. The name of the entity type.
   */
  displayName?: string;
  /**
   * Optional. Enables fuzzy entity extraction during classification.
   */
  enableFuzzyExtraction?: boolean;
  /**
   * Optional. The collection of entity entries associated with the entity
   * type.
   */
  entities?: GoogleCloudDialogflowV2EntityTypeEntity[];
  /**
   * Required. Indicates the kind of entity type.
   */
  kind?:  | "KIND_UNSPECIFIED" | "KIND_MAP" | "KIND_LIST" | "KIND_REGEXP";
  /**
   * The unique identifier of the entity type. Required for
   * EntityTypes.UpdateEntityType and EntityTypes.BatchUpdateEntityTypes
   * methods. Format: `projects//agent/entityTypes/`.
   */
  name?: string;
}

/**
 * An **entity entry** for an associated entity type.
 */
export interface GoogleCloudDialogflowV2EntityTypeEntity {
  /**
   * Required. A collection of value synonyms. For example, if the entity type
   * is *vegetable*, and `value` is *scallions*, a synonym could be *green
   * onions*. For `KIND_LIST` entity types: * This collection must contain
   * exactly one synonym equal to `value`.
   */
  synonyms?: string[];
  /**
   * Required. The primary value associated with this entity entry. For
   * example, if the entity type is *vegetable*, the value could be *scallions*.
   * For `KIND_MAP` entity types: * A reference value to be used in place of
   * synonyms. For `KIND_LIST` entity types: * A string that can contain
   * references to other entity types (with or without aliases).
   */
  value?: string;
}

/**
 * Events allow for matching intents by event name instead of the natural
 * language input. For instance, input `` can trigger a personalized welcome
 * response. The parameter `name` may be used by the agent in the response:
 * `"Hello #welcome_event.name! What can I do for you today?"`.
 */
export interface GoogleCloudDialogflowV2EventInput {
  /**
   * Required. The language of this query. See [Language
   * Support](https://cloud.google.com/dialogflow/docs/reference/language) for a
   * list of the currently supported language codes. Note that queries in the
   * same session do not necessarily need to specify the same language. This
   * field is ignored when used in the context of a
   * WebhookResponse.followup_event_input field, because the language was
   * already defined in the originating detect intent request.
   */
  languageCode?: string;
  /**
   * Required. The unique identifier of the event.
   */
  name?: string;
  /**
   * The collection of parameters associated with the event. Depending on your
   * protocol or client library language, this is a map, associative array,
   * symbol table, dictionary, or JSON object composed of a collection of
   * (MapKey, MapValue) pairs: - MapKey type: string - MapKey value: parameter
   * name - MapValue type: - If parameter's entity type is a composite entity:
   * map - Else: depending on parameter value type, could be one of string,
   * number, boolean, null, list or map - MapValue value: - If parameter's
   * entity type is a composite entity: map from composite entity property names
   * to property values - Else: parameter value
   */
  parameters?: {
    [key: string]: any
  };
}

/**
 * The response message for Agents.ExportAgent.
 */
export interface GoogleCloudDialogflowV2ExportAgentResponse {
  /**
   * Zip compressed raw byte content for agent.
   */
  agentContent?: Uint8Array;
  /**
   * The URI to a file containing the exported agent. This field is populated
   * only if `agent_uri` is specified in `ExportAgentRequest`.
   */
  agentUri?: string;
}

function serializeGoogleCloudDialogflowV2ExportAgentResponse(data: any): GoogleCloudDialogflowV2ExportAgentResponse {
  return {
    ...data,
    agentContent: data["agentContent"] !== undefined ? encodeBase64(data["agentContent"]) : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2ExportAgentResponse(data: any): GoogleCloudDialogflowV2ExportAgentResponse {
  return {
    ...data,
    agentContent: data["agentContent"] !== undefined ? decodeBase64(data["agentContent"] as string) : undefined,
  };
}

/**
 * Metadata related to the Export Data Operations (e.g. ExportDocument).
 */
export interface GoogleCloudDialogflowV2ExportOperationMetadata {
  /**
   * Cloud Storage file path of the exported data.
   */
  exportedGcsDestination?: GoogleCloudDialogflowV2GcsDestination;
}

/**
 * Represents answer from "frequently asked questions".
 */
export interface GoogleCloudDialogflowV2FaqAnswer {
  /**
   * The piece of text from the `source` knowledge base document.
   */
  answer?: string;
  /**
   * The name of answer record, in the format of
   * "projects//locations//answerRecords/"
   */
  answerRecord?: string;
  /**
   * The system's confidence score that this Knowledge answer is a good match
   * for this conversational query, range from 0.0 (completely uncertain) to 1.0
   * (completely certain).
   */
  confidence?: number;
  /**
   * A map that contains metadata about the answer and the document from which
   * it originates.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * The corresponding FAQ question.
   */
  question?: string;
  /**
   * Indicates which Knowledge Document this answer was extracted from. Format:
   * `projects//locations//agent/knowledgeBases//documents/`.
   */
  source?: string;
}

/**
 * Google Cloud Storage location for the output.
 */
export interface GoogleCloudDialogflowV2GcsDestination {
  /**
   * The Google Cloud Storage URIs for the output. A URI is of the form:
   * gs://bucket/object-prefix-or-name Whether a prefix or name is used depends
   * on the use case. The requesting user must have "write-permission" to the
   * bucket.
   */
  uri?: string;
}

/**
 * Represents a notification sent to Cloud Pub/Sub subscribers for human agent
 * assistant events in a specific conversation.
 */
export interface GoogleCloudDialogflowV2HumanAgentAssistantEvent {
  /**
   * The conversation this notification refers to. Format:
   * `projects//conversations/`.
   */
  conversation?: string;
  /**
   * The participant that the suggestion is compiled for. Format:
   * `projects//conversations//participants/`. It will not be set in legacy
   * workflow.
   */
  participant?: string;
  /**
   * The suggestion results payload that this notification refers to.
   */
  suggestionResults?: GoogleCloudDialogflowV2SuggestionResult[];
}

/**
 * Metadata for a ConversationDatasets.ImportConversationData operation.
 */
export interface GoogleCloudDialogflowV2ImportConversationDataOperationMetadata {
  /**
   * The resource name of the imported conversation dataset. Format:
   * `projects//locations//conversationDatasets/`
   */
  conversationDataset?: string;
  /**
   * Timestamp when import conversation data request was created. The time is
   * measured on server side.
   */
  createTime?: Date;
  /**
   * Partial failures are failures that don't fail the whole long running
   * operation, e.g. single files that couldn't be read.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDialogflowV2ImportConversationDataOperationMetadata(data: any): GoogleCloudDialogflowV2ImportConversationDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2ImportConversationDataOperationMetadata(data: any): GoogleCloudDialogflowV2ImportConversationDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Response used for ConversationDatasets.ImportConversationData long running
 * operation.
 */
export interface GoogleCloudDialogflowV2ImportConversationDataOperationResponse {
  /**
   * The resource name of the imported conversation dataset. Format:
   * `projects//locations//conversationDatasets/`
   */
  conversationDataset?: string;
  /**
   * Number of conversations imported successfully.
   */
  importCount?: number;
}

/**
 * Response message for Documents.ImportDocuments.
 */
export interface GoogleCloudDialogflowV2ImportDocumentsResponse {
  /**
   * Includes details about skipped documents or any other warnings.
   */
  warnings?: GoogleRpcStatus[];
}

/**
 * InputDataset used to create model or do evaluation. NextID:5
 */
export interface GoogleCloudDialogflowV2InputDataset {
  /**
   * Required. ConversationDataset resource name. Format:
   * `projects//locations//conversationDatasets/`
   */
  dataset?: string;
}

/**
 * An intent categorizes an end-user's intention for one conversation turn. For
 * each agent, you define many intents, where your combined intents can handle a
 * complete conversation. When an end-user writes or says something, referred to
 * as an end-user expression or end-user input, Dialogflow matches the end-user
 * input to the best intent in your agent. Matching an intent is also known as
 * intent classification. For more information, see the [intent
 * guide](https://cloud.google.com/dialogflow/docs/intents-overview).
 */
export interface GoogleCloudDialogflowV2Intent {
  /**
   * Optional. The name of the action associated with the intent. Note: The
   * action name must not contain whitespaces.
   */
  action?: string;
  /**
   * Optional. The list of platforms for which the first responses will be
   * copied from the messages in PLATFORM_UNSPECIFIED (i.e. default platform).
   */
  defaultResponsePlatforms?:  | "PLATFORM_UNSPECIFIED" | "FACEBOOK" | "SLACK" | "TELEGRAM" | "KIK" | "SKYPE" | "LINE" | "VIBER" | "ACTIONS_ON_GOOGLE" | "GOOGLE_HANGOUTS"[];
  /**
   * Required. The name of this intent.
   */
  displayName?: string;
  /**
   * Optional. Indicates that this intent ends an interaction. Some
   * integrations (e.g., Actions on Google or Dialogflow phone gateway) use this
   * information to close interaction with an end user. Default is false.
   */
  endInteraction?: boolean;
  /**
   * Optional. The collection of event names that trigger the intent. If the
   * collection of input contexts is not empty, all of the contexts must be
   * present in the active user session for an event to trigger this intent.
   * Event names are limited to 150 characters.
   */
  events?: string[];
  /**
   * Output only. Read-only. Information about all followup intents that have
   * this intent as a direct or indirect parent. We populate this field only in
   * the output.
   */
  readonly followupIntentInfo?: GoogleCloudDialogflowV2IntentFollowupIntentInfo[];
  /**
   * Optional. The list of context names required for this intent to be
   * triggered. Format: `projects//agent/sessions/-/contexts/`.
   */
  inputContextNames?: string[];
  /**
   * Optional. Indicates whether this is a fallback intent.
   */
  isFallback?: boolean;
  /**
   * Optional. Indicates that a live agent should be brought in to handle the
   * interaction with the user. In most cases, when you set this flag to true,
   * you would also want to set end_interaction to true as well. Default is
   * false.
   */
  liveAgentHandoff?: boolean;
  /**
   * Optional. The collection of rich messages corresponding to the `Response`
   * field in the Dialogflow console.
   */
  messages?: GoogleCloudDialogflowV2IntentMessage[];
  /**
   * Optional. Indicates whether Machine Learning is disabled for the intent.
   * Note: If `ml_disabled` setting is set to true, then this intent is not
   * taken into account during inference in `ML ONLY` match mode. Also,
   * auto-markup in the UI is turned off.
   */
  mlDisabled?: boolean;
  /**
   * Optional. The unique identifier of this intent. Required for
   * Intents.UpdateIntent and Intents.BatchUpdateIntents methods. Format:
   * `projects//agent/intents/`.
   */
  name?: string;
  /**
   * Optional. The collection of contexts that are activated when the intent is
   * matched. Context messages in this collection should not set the parameters
   * field. Setting the `lifespan_count` to 0 will reset the context when the
   * intent is matched. Format: `projects//agent/sessions/-/contexts/`.
   */
  outputContexts?: GoogleCloudDialogflowV2Context[];
  /**
   * Optional. The collection of parameters associated with the intent.
   */
  parameters?: GoogleCloudDialogflowV2IntentParameter[];
  /**
   * Read-only after creation. The unique identifier of the parent intent in
   * the chain of followup intents. You can set this field when creating an
   * intent, for example with CreateIntent or BatchUpdateIntents, in order to
   * make this intent a followup intent. It identifies the parent followup
   * intent. Format: `projects//agent/intents/`.
   */
  parentFollowupIntentName?: string;
  /**
   * Optional. The priority of this intent. Higher numbers represent higher
   * priorities. - If the supplied value is unspecified or 0, the service
   * translates the value to 500,000, which corresponds to the `Normal` priority
   * in the console. - If the supplied value is negative, the intent is ignored
   * in runtime detect intent requests.
   */
  priority?: number;
  /**
   * Optional. Indicates whether to delete all contexts in the current session
   * when this intent is matched.
   */
  resetContexts?: boolean;
  /**
   * Output only. Read-only. The unique identifier of the root intent in the
   * chain of followup intents. It identifies the correct followup intents chain
   * for this intent. We populate this field only in the output. Format:
   * `projects//agent/intents/`.
   */
  readonly rootFollowupIntentName?: string;
  /**
   * Optional. The collection of examples that the agent is trained on.
   */
  trainingPhrases?: GoogleCloudDialogflowV2IntentTrainingPhrase[];
  /**
   * Optional. Indicates whether webhooks are enabled for the intent.
   */
  webhookState?:  | "WEBHOOK_STATE_UNSPECIFIED" | "WEBHOOK_STATE_ENABLED" | "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING";
}

/**
 * Represents a single followup intent in the chain.
 */
export interface GoogleCloudDialogflowV2IntentFollowupIntentInfo {
  /**
   * The unique identifier of the followup intent. Format:
   * `projects//agent/intents/`.
   */
  followupIntentName?: string;
  /**
   * The unique identifier of the followup intent's parent. Format:
   * `projects//agent/intents/`.
   */
  parentFollowupIntentName?: string;
}

/**
 * A rich response message. Corresponds to the intent `Response` field in the
 * Dialogflow console. For more information, see [Rich response
 * messages](https://cloud.google.com/dialogflow/docs/intents-rich-messages).
 */
export interface GoogleCloudDialogflowV2IntentMessage {
  /**
   * The basic card response for Actions on Google.
   */
  basicCard?: GoogleCloudDialogflowV2IntentMessageBasicCard;
  /**
   * Browse carousel card for Actions on Google.
   */
  browseCarouselCard?: GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard;
  /**
   * The card response.
   */
  card?: GoogleCloudDialogflowV2IntentMessageCard;
  /**
   * The carousel card response for Actions on Google.
   */
  carouselSelect?: GoogleCloudDialogflowV2IntentMessageCarouselSelect;
  /**
   * The image response.
   */
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  /**
   * The link out suggestion chip for Actions on Google.
   */
  linkOutSuggestion?: GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion;
  /**
   * The list card response for Actions on Google.
   */
  listSelect?: GoogleCloudDialogflowV2IntentMessageListSelect;
  /**
   * The media content card for Actions on Google.
   */
  mediaContent?: GoogleCloudDialogflowV2IntentMessageMediaContent;
  /**
   * A custom platform-specific response.
   */
  payload?: {
    [key: string]: any
  };
  /**
   * Optional. The platform that this message is intended for.
   */
  platform?:  | "PLATFORM_UNSPECIFIED" | "FACEBOOK" | "SLACK" | "TELEGRAM" | "KIK" | "SKYPE" | "LINE" | "VIBER" | "ACTIONS_ON_GOOGLE" | "GOOGLE_HANGOUTS";
  /**
   * The quick replies response.
   */
  quickReplies?: GoogleCloudDialogflowV2IntentMessageQuickReplies;
  /**
   * The voice and text-only responses for Actions on Google.
   */
  simpleResponses?: GoogleCloudDialogflowV2IntentMessageSimpleResponses;
  /**
   * The suggestion chips for Actions on Google.
   */
  suggestions?: GoogleCloudDialogflowV2IntentMessageSuggestions;
  /**
   * Table card for Actions on Google.
   */
  tableCard?: GoogleCloudDialogflowV2IntentMessageTableCard;
  /**
   * The text response.
   */
  text?: GoogleCloudDialogflowV2IntentMessageText;
}

/**
 * The basic card message. Useful for displaying information.
 */
export interface GoogleCloudDialogflowV2IntentMessageBasicCard {
  /**
   * Optional. The collection of card buttons.
   */
  buttons?: GoogleCloudDialogflowV2IntentMessageBasicCardButton[];
  /**
   * Required, unless image is present. The body text of the card.
   */
  formattedText?: string;
  /**
   * Optional. The image for the card.
   */
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  /**
   * Optional. The subtitle of the card.
   */
  subtitle?: string;
  /**
   * Optional. The title of the card.
   */
  title?: string;
}

/**
 * The button object that appears at the bottom of a card.
 */
export interface GoogleCloudDialogflowV2IntentMessageBasicCardButton {
  /**
   * Required. Action to take when a user taps on the button.
   */
  openUriAction?: GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction;
  /**
   * Required. The title of the button.
   */
  title?: string;
}

/**
 * Opens the given URI.
 */
export interface GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction {
  /**
   * Required. The HTTP or HTTPS scheme URI.
   */
  uri?: string;
}

/**
 * Browse Carousel Card for Actions on Google.
 * https://developers.google.com/actions/assistant/responses#browsing_carousel
 */
export interface GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard {
  /**
   * Optional. Settings for displaying the image. Applies to every image in
   * items.
   */
  imageDisplayOptions?:  | "IMAGE_DISPLAY_OPTIONS_UNSPECIFIED" | "GRAY" | "WHITE" | "CROPPED" | "BLURRED_BACKGROUND";
  /**
   * Required. List of items in the Browse Carousel Card. Minimum of two items,
   * maximum of ten.
   */
  items?: GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem[];
}

/**
 * Browsing carousel tile
 */
export interface GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem {
  /**
   * Optional. Description of the carousel item. Maximum of four lines of text.
   */
  description?: string;
  /**
   * Optional. Text that appears at the bottom of the Browse Carousel Card.
   * Maximum of one line of text.
   */
  footer?: string;
  /**
   * Optional. Hero image for the carousel item.
   */
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  /**
   * Required. Action to present to the user.
   */
  openUriAction?: GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction;
  /**
   * Required. Title of the carousel item. Maximum of two lines of text.
   */
  title?: string;
}

/**
 * Actions on Google action to open a given url.
 */
export interface GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction {
  /**
   * Required. URL
   */
  url?: string;
  /**
   * Optional. Specifies the type of viewer that is used when opening the URL.
   * Defaults to opening via web browser.
   */
  urlTypeHint?:  | "URL_TYPE_HINT_UNSPECIFIED" | "AMP_ACTION" | "AMP_CONTENT";
}

/**
 * The card response message.
 */
export interface GoogleCloudDialogflowV2IntentMessageCard {
  /**
   * Optional. The collection of card buttons.
   */
  buttons?: GoogleCloudDialogflowV2IntentMessageCardButton[];
  /**
   * Optional. The public URI to an image file for the card.
   */
  imageUri?: string;
  /**
   * Optional. The subtitle of the card.
   */
  subtitle?: string;
  /**
   * Optional. The title of the card.
   */
  title?: string;
}

/**
 * Contains information about a button.
 */
export interface GoogleCloudDialogflowV2IntentMessageCardButton {
  /**
   * Optional. The text to send back to the Dialogflow API or a URI to open.
   */
  postback?: string;
  /**
   * Optional. The text to show on the button.
   */
  text?: string;
}

/**
 * The card for presenting a carousel of options to select from.
 */
export interface GoogleCloudDialogflowV2IntentMessageCarouselSelect {
  /**
   * Required. Carousel items.
   */
  items?: GoogleCloudDialogflowV2IntentMessageCarouselSelectItem[];
}

/**
 * An item in the carousel.
 */
export interface GoogleCloudDialogflowV2IntentMessageCarouselSelectItem {
  /**
   * Optional. The body text of the card.
   */
  description?: string;
  /**
   * Optional. The image to display.
   */
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  /**
   * Required. Additional info about the option item.
   */
  info?: GoogleCloudDialogflowV2IntentMessageSelectItemInfo;
  /**
   * Required. Title of the carousel item.
   */
  title?: string;
}

/**
 * Column properties for TableCard.
 */
export interface GoogleCloudDialogflowV2IntentMessageColumnProperties {
  /**
   * Required. Column heading.
   */
  header?: string;
  /**
   * Optional. Defines text alignment for all cells in this column.
   */
  horizontalAlignment?:  | "HORIZONTAL_ALIGNMENT_UNSPECIFIED" | "LEADING" | "CENTER" | "TRAILING";
}

/**
 * The image response message.
 */
export interface GoogleCloudDialogflowV2IntentMessageImage {
  /**
   * Optional. A text description of the image to be used for accessibility,
   * e.g., screen readers.
   */
  accessibilityText?: string;
  /**
   * Optional. The public URI to an image file.
   */
  imageUri?: string;
}

/**
 * The suggestion chip message that allows the user to jump out to the app or
 * website associated with this agent.
 */
export interface GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion {
  /**
   * Required. The name of the app or site this chip is linking to.
   */
  destinationName?: string;
  /**
   * Required. The URI of the app or site to open when the user taps the
   * suggestion chip.
   */
  uri?: string;
}

/**
 * The card for presenting a list of options to select from.
 */
export interface GoogleCloudDialogflowV2IntentMessageListSelect {
  /**
   * Required. List items.
   */
  items?: GoogleCloudDialogflowV2IntentMessageListSelectItem[];
  /**
   * Optional. Subtitle of the list.
   */
  subtitle?: string;
  /**
   * Optional. The overall title of the list.
   */
  title?: string;
}

/**
 * An item in the list.
 */
export interface GoogleCloudDialogflowV2IntentMessageListSelectItem {
  /**
   * Optional. The main text describing the item.
   */
  description?: string;
  /**
   * Optional. The image to display.
   */
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  /**
   * Required. Additional information about this option.
   */
  info?: GoogleCloudDialogflowV2IntentMessageSelectItemInfo;
  /**
   * Required. The title of the list item.
   */
  title?: string;
}

/**
 * The media content card for Actions on Google.
 */
export interface GoogleCloudDialogflowV2IntentMessageMediaContent {
  /**
   * Required. List of media objects.
   */
  mediaObjects?: GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject[];
  /**
   * Optional. What type of media is the content (ie "audio").
   */
  mediaType?:  | "RESPONSE_MEDIA_TYPE_UNSPECIFIED" | "AUDIO";
}

/**
 * Response media object for media content card.
 */
export interface GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject {
  /**
   * Required. Url where the media is stored.
   */
  contentUrl?: string;
  /**
   * Optional. Description of media card.
   */
  description?: string;
  /**
   * Optional. Icon to display above media content.
   */
  icon?: GoogleCloudDialogflowV2IntentMessageImage;
  /**
   * Optional. Image to display above media content.
   */
  largeImage?: GoogleCloudDialogflowV2IntentMessageImage;
  /**
   * Required. Name of media card.
   */
  name?: string;
}

/**
 * The quick replies response message.
 */
export interface GoogleCloudDialogflowV2IntentMessageQuickReplies {
  /**
   * Optional. The collection of quick replies.
   */
  quickReplies?: string[];
  /**
   * Optional. The title of the collection of quick replies.
   */
  title?: string;
}

/**
 * Additional info about the select item for when it is triggered in a dialog.
 */
export interface GoogleCloudDialogflowV2IntentMessageSelectItemInfo {
  /**
   * Required. A unique key that will be sent back to the agent if this
   * response is given.
   */
  key?: string;
  /**
   * Optional. A list of synonyms that can also be used to trigger this item in
   * dialog.
   */
  synonyms?: string[];
}

/**
 * The simple response message containing speech or text.
 */
export interface GoogleCloudDialogflowV2IntentMessageSimpleResponse {
  /**
   * Optional. The text to display.
   */
  displayText?: string;
  /**
   * One of text_to_speech or ssml must be provided. Structured spoken response
   * to the user in the SSML format. Mutually exclusive with text_to_speech.
   */
  ssml?: string;
  /**
   * One of text_to_speech or ssml must be provided. The plain text of the
   * speech output. Mutually exclusive with ssml.
   */
  textToSpeech?: string;
}

/**
 * The collection of simple response candidates. This message in
 * `QueryResult.fulfillment_messages` and `WebhookResponse.fulfillment_messages`
 * should contain only one `SimpleResponse`.
 */
export interface GoogleCloudDialogflowV2IntentMessageSimpleResponses {
  /**
   * Required. The list of simple responses.
   */
  simpleResponses?: GoogleCloudDialogflowV2IntentMessageSimpleResponse[];
}

/**
 * The suggestion chip message that the user can tap to quickly post a reply to
 * the conversation.
 */
export interface GoogleCloudDialogflowV2IntentMessageSuggestion {
  /**
   * Required. The text shown the in the suggestion chip.
   */
  title?: string;
}

/**
 * The collection of suggestions.
 */
export interface GoogleCloudDialogflowV2IntentMessageSuggestions {
  /**
   * Required. The list of suggested replies.
   */
  suggestions?: GoogleCloudDialogflowV2IntentMessageSuggestion[];
}

/**
 * Table card for Actions on Google.
 */
export interface GoogleCloudDialogflowV2IntentMessageTableCard {
  /**
   * Optional. List of buttons for the card.
   */
  buttons?: GoogleCloudDialogflowV2IntentMessageBasicCardButton[];
  /**
   * Optional. Display properties for the columns in this table.
   */
  columnProperties?: GoogleCloudDialogflowV2IntentMessageColumnProperties[];
  /**
   * Optional. Image which should be displayed on the card.
   */
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  /**
   * Optional. Rows in this table of data.
   */
  rows?: GoogleCloudDialogflowV2IntentMessageTableCardRow[];
  /**
   * Optional. Subtitle to the title.
   */
  subtitle?: string;
  /**
   * Required. Title of the card.
   */
  title?: string;
}

/**
 * Cell of TableCardRow.
 */
export interface GoogleCloudDialogflowV2IntentMessageTableCardCell {
  /**
   * Required. Text in this cell.
   */
  text?: string;
}

/**
 * Row of TableCard.
 */
export interface GoogleCloudDialogflowV2IntentMessageTableCardRow {
  /**
   * Optional. List of cells that make up this row.
   */
  cells?: GoogleCloudDialogflowV2IntentMessageTableCardCell[];
  /**
   * Optional. Whether to add a visual divider after this row.
   */
  dividerAfter?: boolean;
}

/**
 * The text response message.
 */
export interface GoogleCloudDialogflowV2IntentMessageText {
  /**
   * Optional. The collection of the agent's responses.
   */
  text?: string[];
}

/**
 * Represents intent parameters.
 */
export interface GoogleCloudDialogflowV2IntentParameter {
  /**
   * Optional. The default value to use when the `value` yields an empty
   * result. Default values can be extracted from contexts by using the
   * following syntax: `#context_name.parameter_name`.
   */
  defaultValue?: string;
  /**
   * Required. The name of the parameter.
   */
  displayName?: string;
  /**
   * Optional. The name of the entity type, prefixed with `@`, that describes
   * values of the parameter. If the parameter is required, this must be
   * provided.
   */
  entityTypeDisplayName?: string;
  /**
   * Optional. Indicates whether the parameter represents a list of values.
   */
  isList?: boolean;
  /**
   * Optional. Indicates whether the parameter is required. That is, whether
   * the intent cannot be completed without collecting the parameter value.
   */
  mandatory?: boolean;
  /**
   * The unique identifier of this parameter.
   */
  name?: string;
  /**
   * Optional. The collection of prompts that the agent can present to the user
   * in order to collect a value for the parameter.
   */
  prompts?: string[];
  /**
   * Optional. The definition of the parameter value. It can be: - a constant
   * string, - a parameter value defined as `$parameter_name`, - an original
   * parameter value defined as `$parameter_name.original`, - a parameter value
   * from some context defined as `#context_name.parameter_name`.
   */
  value?: string;
}

/**
 * Represents an example that the agent is trained on.
 */
export interface GoogleCloudDialogflowV2IntentTrainingPhrase {
  /**
   * Output only. The unique identifier of this training phrase.
   */
  name?: string;
  /**
   * Required. The ordered list of training phrase parts. The parts are
   * concatenated in order to form the training phrase. Note: The API does not
   * automatically annotate training phrases like the Dialogflow Console does.
   * Note: Do not forget to include whitespace at part boundaries, so the
   * training phrase is well formatted when the parts are concatenated. If the
   * training phrase does not need to be annotated with parameters, you just
   * need a single part with only the Part.text field set. If you want to
   * annotate the training phrase, you must create multiple parts, where the
   * fields of each part are populated in one of two ways: - `Part.text` is set
   * to a part of the phrase that has no parameters. - `Part.text` is set to a
   * part of the phrase that you want to annotate, and the `entity_type`,
   * `alias`, and `user_defined` fields are all set.
   */
  parts?: GoogleCloudDialogflowV2IntentTrainingPhrasePart[];
  /**
   * Optional. Indicates how many times this example was added to the intent.
   * Each time a developer adds an existing sample by editing an intent or
   * training, this counter is increased.
   */
  timesAddedCount?: number;
  /**
   * Required. The type of the training phrase.
   */
  type?:  | "TYPE_UNSPECIFIED" | "EXAMPLE" | "TEMPLATE";
}

/**
 * Represents a part of a training phrase.
 */
export interface GoogleCloudDialogflowV2IntentTrainingPhrasePart {
  /**
   * Optional. The parameter name for the value extracted from the annotated
   * part of the example. This field is required for annotated parts of the
   * training phrase.
   */
  alias?: string;
  /**
   * Optional. The entity type name prefixed with `@`. This field is required
   * for annotated parts of the training phrase.
   */
  entityType?: string;
  /**
   * Required. The text for this part.
   */
  text?: string;
  /**
   * Optional. Indicates whether the text was manually annotated. This field is
   * set to true when the Dialogflow Console is used to manually annotate the
   * part. When creating an annotated part with the API, you must set this to
   * true.
   */
  userDefined?: boolean;
}

/**
 * Metadata in google::longrunning::Operation for Knowledge operations.
 */
export interface GoogleCloudDialogflowV2KnowledgeOperationMetadata {
  /**
   * Metadata for the Export Data Operation such as the destination of export.
   */
  exportOperationMetadata?: GoogleCloudDialogflowV2ExportOperationMetadata;
  /**
   * The name of the knowledge base interacted with during the operation.
   */
  knowledgeBase?: string;
  /**
   * Output only. The current state of this operation.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE";
}

/**
 * Represents a message posted into a conversation.
 */
export interface GoogleCloudDialogflowV2Message {
  /**
   * Required. The message content.
   */
  content?: string;
  /**
   * Output only. The time when the message was created in Contact Center AI.
   */
  readonly createTime?: Date;
  /**
   * Optional. The message language. This should be a
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag.
   * Example: "en-US".
   */
  languageCode?: string;
  /**
   * Output only. The annotation for the message.
   */
  readonly messageAnnotation?: GoogleCloudDialogflowV2MessageAnnotation;
  /**
   * Optional. The unique identifier of the message. Format:
   * `projects//locations//conversations//messages/`.
   */
  name?: string;
  /**
   * Output only. The participant that sends this message.
   */
  readonly participant?: string;
  /**
   * Output only. The role of the participant.
   */
  readonly participantRole?:  | "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER";
  /**
   * Optional. The time when the message was sent.
   */
  sendTime?: Date;
  /**
   * Output only. The sentiment analysis result for the message.
   */
  readonly sentimentAnalysis?: GoogleCloudDialogflowV2SentimentAnalysisResult;
}

function serializeGoogleCloudDialogflowV2Message(data: any): GoogleCloudDialogflowV2Message {
  return {
    ...data,
    sendTime: data["sendTime"] !== undefined ? data["sendTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2Message(data: any): GoogleCloudDialogflowV2Message {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    sendTime: data["sendTime"] !== undefined ? new Date(data["sendTime"]) : undefined,
  };
}

/**
 * Represents the result of annotation for the message.
 */
export interface GoogleCloudDialogflowV2MessageAnnotation {
  /**
   * Indicates whether the text message contains entities.
   */
  containEntities?: boolean;
  /**
   * The collection of annotated message parts ordered by their position in the
   * message. You can recover the annotated message by concatenating
   * [AnnotatedMessagePart.text].
   */
  parts?: GoogleCloudDialogflowV2AnnotatedMessagePart[];
}

/**
 * Represents the contents of the original request that was passed to the
 * `[Streaming]DetectIntent` call.
 */
export interface GoogleCloudDialogflowV2OriginalDetectIntentRequest {
  /**
   * Optional. This field is set to the value of the `QueryParameters.payload`
   * field passed in the request. Some integrations that query a Dialogflow
   * agent may provide additional information in the payload. In particular, for
   * the Dialogflow Phone Gateway integration, this field has the form: {
   * "telephony": { "caller_id": "+18558363987" } } Note: The caller ID field
   * (`caller_id`) will be redacted for Trial Edition agents and populated with
   * the caller ID in [E.164 format](https://en.wikipedia.org/wiki/E.164) for
   * Essentials Edition agents.
   */
  payload?: {
    [key: string]: any
  };
  /**
   * The source of this request, e.g., `google`, `facebook`, `slack`. It is set
   * by Dialogflow-owned servers.
   */
  source?: string;
  /**
   * Optional. The version of the protocol used for this request. This field is
   * AoG-specific.
   */
  version?: string;
}

/**
 * Represents the result of conversational query or event processing.
 */
export interface GoogleCloudDialogflowV2QueryResult {
  /**
   * The action name from the matched intent.
   */
  action?: string;
  /**
   * This field is set to: - `false` if the matched intent has required
   * parameters and not all of the required parameter values have been
   * collected. - `true` if all required parameter values have been collected,
   * or if the matched intent doesn't contain any required parameters.
   */
  allRequiredParamsPresent?: boolean;
  /**
   * Indicates whether the conversational query triggers a cancellation for
   * slot filling. For more information, see the [cancel slot filling
   * documentation](https://cloud.google.com/dialogflow/es/docs/intents-actions-parameters#cancel).
   */
  cancelsSlotFilling?: boolean;
  /**
   * Free-form diagnostic information for the associated detect intent request.
   * The fields of this data can change without notice, so you should not write
   * code that depends on its structure. The data may contain: - webhook call
   * latency - webhook errors
   */
  diagnosticInfo?: {
    [key: string]: any
  };
  /**
   * The collection of rich messages to present to the user.
   */
  fulfillmentMessages?: GoogleCloudDialogflowV2IntentMessage[];
  /**
   * The text to be pronounced to the user or shown on the screen. Note: This
   * is a legacy field, `fulfillment_messages` should be preferred.
   */
  fulfillmentText?: string;
  /**
   * The intent that matched the conversational query. Some, not all fields are
   * filled in this message, including but not limited to: `name`,
   * `display_name`, `end_interaction` and `is_fallback`.
   */
  intent?: GoogleCloudDialogflowV2Intent;
  /**
   * The intent detection confidence. Values range from 0.0 (completely
   * uncertain) to 1.0 (completely certain). This value is for informational
   * purpose only and is only used to help match the best intent within the
   * classification threshold. This value may change for the same end-user
   * expression at any time due to a model retraining or change in
   * implementation. If there are `multiple knowledge_answers` messages, this
   * value is set to the greatest `knowledgeAnswers.match_confidence` value in
   * the list.
   */
  intentDetectionConfidence?: number;
  /**
   * The language that was triggered during intent detection. See [Language
   * Support](https://cloud.google.com/dialogflow/docs/reference/language) for a
   * list of the currently supported language codes.
   */
  languageCode?: string;
  /**
   * The collection of output contexts. If applicable,
   * `output_contexts.parameters` contains entries with name `.original`
   * containing the original parameter values before the query.
   */
  outputContexts?: GoogleCloudDialogflowV2Context[];
  /**
   * The collection of extracted parameters. Depending on your protocol or
   * client library language, this is a map, associative array, symbol table,
   * dictionary, or JSON object composed of a collection of (MapKey, MapValue)
   * pairs: - MapKey type: string - MapKey value: parameter name - MapValue
   * type: - If parameter's entity type is a composite entity: map - Else:
   * depending on parameter value type, could be one of string, number, boolean,
   * null, list or map - MapValue value: - If parameter's entity type is a
   * composite entity: map from composite entity property names to property
   * values - Else: parameter value
   */
  parameters?: {
    [key: string]: any
  };
  /**
   * The original conversational query text: - If natural language text was
   * provided as input, `query_text` contains a copy of the input. - If natural
   * language speech audio was provided as input, `query_text` contains the
   * speech recognition result. If speech recognizer produced multiple
   * alternatives, a particular one is picked. - If automatic spell correction
   * is enabled, `query_text` will contain the corrected user input.
   */
  queryText?: string;
  /**
   * The sentiment analysis result, which depends on the
   * `sentiment_analysis_request_config` specified in the request.
   */
  sentimentAnalysisResult?: GoogleCloudDialogflowV2SentimentAnalysisResult;
  /**
   * The Speech recognition confidence between 0.0 and 1.0. A higher number
   * indicates an estimated greater likelihood that the recognized words are
   * correct. The default of 0.0 is a sentinel value indicating that confidence
   * was not set. This field is not guaranteed to be accurate or set. In
   * particular this field isn't set for StreamingDetectIntent since the
   * streaming endpoint has separate confidence estimates per portion of the
   * audio in StreamingRecognitionResult.
   */
  speechRecognitionConfidence?: number;
  /**
   * If the query was fulfilled by a webhook call, this field is set to the
   * value of the `payload` field returned in the webhook response.
   */
  webhookPayload?: {
    [key: string]: any
  };
  /**
   * If the query was fulfilled by a webhook call, this field is set to the
   * value of the `source` field returned in the webhook response.
   */
  webhookSource?: string;
}

/**
 * The sentiment, such as positive/negative feeling or association, for a unit
 * of analysis, such as the query text. See:
 * https://cloud.google.com/natural-language/docs/basics#interpreting_sentiment_analysis_values
 * for how to interpret the result.
 */
export interface GoogleCloudDialogflowV2Sentiment {
  /**
   * A non-negative number in the [0, +inf) range, which represents the
   * absolute magnitude of sentiment, regardless of score (positive or
   * negative).
   */
  magnitude?: number;
  /**
   * Sentiment score between -1.0 (negative sentiment) and 1.0 (positive
   * sentiment).
   */
  score?: number;
}

/**
 * The result of sentiment analysis. Sentiment analysis inspects user input and
 * identifies the prevailing subjective opinion, especially to determine a
 * user's attitude as positive, negative, or neutral. For
 * Participants.DetectIntent, it needs to be configured in
 * DetectIntentRequest.query_params. For Participants.StreamingDetectIntent, it
 * needs to be configured in StreamingDetectIntentRequest.query_params. And for
 * Participants.AnalyzeContent and Participants.StreamingAnalyzeContent, it
 * needs to be configured in ConversationProfile.human_agent_assistant_config
 */
export interface GoogleCloudDialogflowV2SentimentAnalysisResult {
  /**
   * The sentiment analysis result for `query_text`.
   */
  queryTextSentiment?: GoogleCloudDialogflowV2Sentiment;
}

/**
 * A session represents a conversation between a Dialogflow agent and an
 * end-user. You can create special entities, called session entities, during a
 * session. Session entities can extend or replace custom entity types and only
 * exist during the session that they were created for. All session data,
 * including session entities, is stored by Dialogflow for 20 minutes. For more
 * information, see the [session entity
 * guide](https://cloud.google.com/dialogflow/docs/entities-session).
 */
export interface GoogleCloudDialogflowV2SessionEntityType {
  /**
   * Required. The collection of entities associated with this session entity
   * type.
   */
  entities?: GoogleCloudDialogflowV2EntityTypeEntity[];
  /**
   * Required. Indicates whether the additional data should override or
   * supplement the custom entity type definition.
   */
  entityOverrideMode?:  | "ENTITY_OVERRIDE_MODE_UNSPECIFIED" | "ENTITY_OVERRIDE_MODE_OVERRIDE" | "ENTITY_OVERRIDE_MODE_SUPPLEMENT";
  /**
   * Required. The unique identifier of this session entity type. Format:
   * `projects//agent/sessions//entityTypes/`, or
   * `projects//agent/environments//users//sessions//entityTypes/`. If
   * `Environment ID` is not specified, we assume default 'draft' environment.
   * If `User ID` is not specified, we assume default '-' user. `` must be the
   * display name of an existing entity type in the same agent that will be
   * overridden or supplemented.
   */
  name?: string;
}

/**
 * Metadata for a ConversationProfile.SetSuggestionFeatureConfig operation.
 */
export interface GoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata {
  /**
   * The resource name of the conversation profile. Format:
   * `projects//locations//conversationProfiles/`
   */
  conversationProfile?: string;
  /**
   * Timestamp whe the request was created. The time is measured on server
   * side.
   */
  createTime?: Date;
  /**
   * Required. The participant role to add or update the suggestion feature
   * config. Only HUMAN_AGENT or END_USER can be used.
   */
  participantRole?:  | "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER";
  /**
   * Required. The type of the suggestion feature to add or update.
   */
  suggestionFeatureType?:  | "TYPE_UNSPECIFIED" | "ARTICLE_SUGGESTION" | "FAQ" | "SMART_REPLY";
}

function serializeGoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata(data: any): GoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata(data: any): GoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Represents a smart reply answer.
 */
export interface GoogleCloudDialogflowV2SmartReplyAnswer {
  /**
   * The name of answer record, in the format of
   * "projects//locations//answerRecords/"
   */
  answerRecord?: string;
  /**
   * Smart reply confidence. The system's confidence score that this reply is a
   * good match for this conversation, as a value from 0.0 (completely
   * uncertain) to 1.0 (completely certain).
   */
  confidence?: number;
  /**
   * The content of the reply.
   */
  reply?: string;
}

/**
 * Metadata for smart reply models.
 */
export interface GoogleCloudDialogflowV2SmartReplyModelMetadata {
  /**
   * Optional. Type of the smart reply model. If not provided, model_type is
   * used.
   */
  trainingModelType?:  | "MODEL_TYPE_UNSPECIFIED" | "SMART_REPLY_DUAL_ENCODER_MODEL" | "SMART_REPLY_BERT_MODEL";
}

/**
 * The response message for Participants.SuggestArticles.
 */
export interface GoogleCloudDialogflowV2SuggestArticlesResponse {
  /**
   * Articles ordered by score in descending order.
   */
  articleAnswers?: GoogleCloudDialogflowV2ArticleAnswer[];
  /**
   * Number of messages prior to and including latest_message to compile the
   * suggestion. It may be smaller than the SuggestArticlesRequest.context_size
   * field in the request if there aren't that many messages in the
   * conversation.
   */
  contextSize?: number;
  /**
   * The name of the latest conversation message used to compile suggestion
   * for. Format: `projects//locations//conversations//messages/`.
   */
  latestMessage?: string;
}

/**
 * The request message for Participants.SuggestFaqAnswers.
 */
export interface GoogleCloudDialogflowV2SuggestFaqAnswersResponse {
  /**
   * Number of messages prior to and including latest_message to compile the
   * suggestion. It may be smaller than the
   * SuggestFaqAnswersRequest.context_size field in the request if there aren't
   * that many messages in the conversation.
   */
  contextSize?: number;
  /**
   * Answers extracted from FAQ documents.
   */
  faqAnswers?: GoogleCloudDialogflowV2FaqAnswer[];
  /**
   * The name of the latest conversation message used to compile suggestion
   * for. Format: `projects//locations//conversations//messages/`.
   */
  latestMessage?: string;
}

/**
 * One response of different type of suggestion response which is used in the
 * response of Participants.AnalyzeContent and Participants.AnalyzeContent, as
 * well as HumanAgentAssistantEvent.
 */
export interface GoogleCloudDialogflowV2SuggestionResult {
  /**
   * Error status if the request failed.
   */
  error?: GoogleRpcStatus;
  /**
   * SuggestArticlesResponse if request is for ARTICLE_SUGGESTION.
   */
  suggestArticlesResponse?: GoogleCloudDialogflowV2SuggestArticlesResponse;
  /**
   * SuggestFaqAnswersResponse if request is for FAQ_ANSWER.
   */
  suggestFaqAnswersResponse?: GoogleCloudDialogflowV2SuggestFaqAnswersResponse;
  /**
   * SuggestSmartRepliesResponse if request is for SMART_REPLY.
   */
  suggestSmartRepliesResponse?: GoogleCloudDialogflowV2SuggestSmartRepliesResponse;
}

/**
 * The response message for Participants.SuggestSmartReplies.
 */
export interface GoogleCloudDialogflowV2SuggestSmartRepliesResponse {
  /**
   * Number of messages prior to and including latest_message to compile the
   * suggestion. It may be smaller than the
   * SuggestSmartRepliesRequest.context_size field in the request if there
   * aren't that many messages in the conversation.
   */
  contextSize?: number;
  /**
   * The name of the latest conversation message used to compile suggestion
   * for. Format: `projects//locations//conversations//messages/`.
   */
  latestMessage?: string;
  /**
   * Output only. Multiple reply options provided by smart reply service. The
   * order is based on the rank of the model prediction. The maximum number of
   * the returned replies is set in SmartReplyConfig.
   */
  readonly smartReplyAnswers?: GoogleCloudDialogflowV2SmartReplyAnswer[];
}

/**
 * Metadata for a ConversationModels.UndeployConversationModel operation.
 */
export interface GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata {
  /**
   * The resource name of the conversation model. Format:
   * `projects//conversationModels/`
   */
  conversationModel?: string;
  /**
   * Timestamp when the request to undeploy conversation model was submitted.
   * The time is measured on server side.
   */
  createTime?: Date;
}

function serializeGoogleCloudDialogflowV2UndeployConversationModelOperationMetadata(data: any): GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDialogflowV2UndeployConversationModelOperationMetadata(data: any): GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * The request message for a webhook call.
 */
export interface GoogleCloudDialogflowV2WebhookRequest {
  /**
   * Optional. The contents of the original request that was passed to
   * `[Streaming]DetectIntent` call.
   */
  originalDetectIntentRequest?: GoogleCloudDialogflowV2OriginalDetectIntentRequest;
  /**
   * The result of the conversational query or event processing. Contains the
   * same value as `[Streaming]DetectIntentResponse.query_result`.
   */
  queryResult?: GoogleCloudDialogflowV2QueryResult;
  /**
   * The unique identifier of the response. Contains the same value as
   * `[Streaming]DetectIntentResponse.response_id`.
   */
  responseId?: string;
  /**
   * The unique identifier of detectIntent request session. Can be used to
   * identify end-user inside webhook implementation. Format:
   * `projects//agent/sessions/`, or
   * `projects//agent/environments//users//sessions/`.
   */
  session?: string;
}

/**
 * The response message for a webhook call. This response is validated by the
 * Dialogflow server. If validation fails, an error will be returned in the
 * QueryResult.diagnostic_info field. Setting JSON fields to an empty value with
 * the wrong type is a common error. To avoid this error: - Use `""` for empty
 * strings - Use `{}` or `null` for empty objects - Use `[]` or `null` for empty
 * arrays For more information, see the [Protocol Buffers Language
 * Guide](https://developers.google.com/protocol-buffers/docs/proto3#json).
 */
export interface GoogleCloudDialogflowV2WebhookResponse {
  /**
   * Optional. Invokes the supplied events. When this field is set, Dialogflow
   * ignores the `fulfillment_text`, `fulfillment_messages`, and `payload`
   * fields.
   */
  followupEventInput?: GoogleCloudDialogflowV2EventInput;
  /**
   * Optional. The rich response messages intended for the end-user. When
   * provided, Dialogflow uses this field to populate
   * QueryResult.fulfillment_messages sent to the integration or API caller.
   */
  fulfillmentMessages?: GoogleCloudDialogflowV2IntentMessage[];
  /**
   * Optional. The text response message intended for the end-user. It is
   * recommended to use `fulfillment_messages.text.text[0]` instead. When
   * provided, Dialogflow uses this field to populate
   * QueryResult.fulfillment_text sent to the integration or API caller.
   */
  fulfillmentText?: string;
  /**
   * Optional. The collection of output contexts that will overwrite currently
   * active contexts for the session and reset their lifespans. When provided,
   * Dialogflow uses this field to populate QueryResult.output_contexts sent to
   * the integration or API caller.
   */
  outputContexts?: GoogleCloudDialogflowV2Context[];
  /**
   * Optional. This field can be used to pass custom data from your webhook to
   * the integration or API caller. Arbitrary JSON objects are supported. When
   * provided, Dialogflow uses this field to populate
   * QueryResult.webhook_payload sent to the integration or API caller. This
   * field is also used by the [Google Assistant
   * integration](https://cloud.google.com/dialogflow/docs/integrations/aog) for
   * rich response messages. See the format definition at [Google Assistant
   * Dialogflow webhook
   * format](https://developers.google.com/assistant/actions/build/json/dialogflow-webhook-json)
   */
  payload?: {
    [key: string]: any
  };
  /**
   * Optional. Additional session entity types to replace or extend developer
   * entity types with. The entity synonyms apply to all languages and persist
   * for the session. Setting this data from a webhook overwrites the session
   * entity types that have been set using `detectIntent`,
   * `streamingDetectIntent` or SessionEntityType management methods.
   */
  sessionEntityTypes?: GoogleCloudDialogflowV2SessionEntityType[];
  /**
   * Optional. A custom field used to identify the webhook source. Arbitrary
   * strings are supported. When provided, Dialogflow uses this field to
   * populate QueryResult.webhook_source sent to the integration or API caller.
   */
  source?: string;
}

/**
 * This message is used to hold all the Conversation Signals data, which will
 * be converted to JSON and exported to BigQuery.
 */
export interface GoogleCloudDialogflowV3alpha1ConversationSignals {
  /**
   * Required. Turn signals for the current turn.
   */
  turnSignals?: GoogleCloudDialogflowV3alpha1TurnSignals;
}

/**
 * Metadata for CreateDocument operation.
 */
export interface GoogleCloudDialogflowV3alpha1CreateDocumentOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowV3alpha1GenericKnowledgeOperationMetadata;
}

/**
 * Metadata for DeleteDocument operation.
 */
export interface GoogleCloudDialogflowV3alpha1DeleteDocumentOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowV3alpha1GenericKnowledgeOperationMetadata;
}

/**
 * Metadata in google::longrunning::Operation for Knowledge operations.
 */
export interface GoogleCloudDialogflowV3alpha1GenericKnowledgeOperationMetadata {
  /**
   * Required. Output only. The current state of this operation.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE";
}

/**
 * Metadata for ImportDocuments operation.
 */
export interface GoogleCloudDialogflowV3alpha1ImportDocumentsOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowV3alpha1GenericKnowledgeOperationMetadata;
}

/**
 * Response message for Documents.ImportDocuments.
 */
export interface GoogleCloudDialogflowV3alpha1ImportDocumentsResponse {
  /**
   * Includes details about skipped documents or any other warnings.
   */
  warnings?: GoogleRpcStatus[];
}

/**
 * Metadata for ReloadDocument operation.
 */
export interface GoogleCloudDialogflowV3alpha1ReloadDocumentOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowV3alpha1GenericKnowledgeOperationMetadata;
}

/**
 * Collection of all signals that were extracted for a single turn of the
 * conversation.
 */
export interface GoogleCloudDialogflowV3alpha1TurnSignals {
  /**
   * Whether agent responded with LiveAgentHandoff fulfillment.
   */
  agentEscalated?: boolean;
  /**
   * Whether user was using DTMF input.
   */
  dtmfUsed?: boolean;
  /**
   * Failure reasons of the turn.
   */
  failureReasons?:  | "FAILURE_REASON_UNSPECIFIED" | "FAILED_INTENT" | "FAILED_WEBHOOK"[];
  /**
   * Whether NLU predicted NO_MATCH.
   */
  noMatch?: boolean;
  /**
   * Whether user provided no input.
   */
  noUserInput?: boolean;
  /**
   * Whether turn resulted in End Session page.
   */
  reachedEndPage?: boolean;
  /**
   * Whether agent has triggered the event corresponding to user abandoning the
   * conversation.
   */
  triggeredAbandonmentEvent?: boolean;
  /**
   * Whether user was specifically asking for a live agent.
   */
  userEscalated?: boolean;
  /**
   * Human-readable statuses of the webhooks triggered during this turn.
   */
  webhookStatuses?: string[];
}

/**
 * Metadata for UpdateDocument operation.
 */
export interface GoogleCloudDialogflowV3alpha1UpdateDocumentOperationMetadata {
  /**
   * The generic information of the operation.
   */
  genericMetadata?: GoogleCloudDialogflowV3alpha1GenericKnowledgeOperationMetadata;
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
 * An object that represents a latitude/longitude pair. This is expressed as a
 * pair of doubles to represent degrees latitude and degrees longitude. Unless
 * specified otherwise, this object must conform to the WGS84 standard. Values
 * must be within normalized ranges.
 */
export interface GoogleTypeLatLng {
  /**
   * The latitude in degrees. It must be in the range [-90.0, +90.0].
   */
  latitude?: number;
  /**
   * The longitude in degrees. It must be in the range [-180.0, +180.0].
   */
  longitude?: number;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsChangelogsList.
 */
export interface ProjectsLocationsAgentsChangelogsListOptions {
  /**
   * The filter string. Supports filter by user_email, resource, type and
   * create_time. Some examples: 1. By user email: user_email =
   * "someone@google.com" 2. By resource name: resource =
   * "projects/123/locations/global/agents/456/flows/789" 3. By resource display
   * name: display_name = "my agent" 4. By action: action = "Create" 5. By type:
   * type = "flows" 6. By create time. Currently predicates on `create_time` and
   * `create_time_epoch_seconds` are supported: create_time_epoch_seconds >
   * 1551790877 AND create_time <= 2017-01-15T01:30:15.01Z 7. Combination of
   * above filters: resource =
   * "projects/123/locations/global/agents/456/flows/789" AND user_email =
   * "someone@google.com" AND create_time <= 2017-01-15T01:30:15.01Z
   */
  filter?: string;
  /**
   * The maximum number of items to return in a single page. By default 100 and
   * at most 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsEntityTypesCreate.
 */
export interface ProjectsLocationsAgentsEntityTypesCreateOptions {
  /**
   * The language of the following fields in `entity_type`: *
   * `EntityType.entities.value` * `EntityType.entities.synonyms` *
   * `EntityType.excluded_phrases.value` If not specified, the agent's default
   * language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsEntityTypesDelete.
 */
export interface ProjectsLocationsAgentsEntityTypesDeleteOptions {
  /**
   * This field has no effect for entity type not being used. For entity types
   * that are used by intents or pages: * If `force` is set to false, an error
   * will be returned with message indicating the referencing resources. * If
   * `force` is set to true, Dialogflow will remove the entity type, as well as
   * any references to the entity type (i.e. Page parameter of the entity type
   * will be changed to '@sys.any' and intent parameter of the entity type will
   * be removed).
   */
  force?: boolean;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsEntityTypesGet.
 */
export interface ProjectsLocationsAgentsEntityTypesGetOptions {
  /**
   * The language to retrieve the entity type for. The following fields are
   * language dependent: * `EntityType.entities.value` *
   * `EntityType.entities.synonyms` * `EntityType.excluded_phrases.value` If not
   * specified, the agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsEntityTypesList.
 */
export interface ProjectsLocationsAgentsEntityTypesListOptions {
  /**
   * The language to list entity types for. The following fields are language
   * dependent: * `EntityType.entities.value` * `EntityType.entities.synonyms` *
   * `EntityType.excluded_phrases.value` If not specified, the agent's default
   * language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
  /**
   * The maximum number of items to return in a single page. By default 100 and
   * at most 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsEntityTypesPatch.
 */
export interface ProjectsLocationsAgentsEntityTypesPatchOptions {
  /**
   * The language of the following fields in `entity_type`: *
   * `EntityType.entities.value` * `EntityType.entities.synonyms` *
   * `EntityType.excluded_phrases.value` If not specified, the agent's default
   * language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
  /**
   * The mask to control which fields get updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAgentsEntityTypesPatchOptions(data: any): ProjectsLocationsAgentsEntityTypesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAgentsEntityTypesPatchOptions(data: any): ProjectsLocationsAgentsEntityTypesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsEnvironmentsContinuousTestResultsList.
 */
export interface ProjectsLocationsAgentsEnvironmentsContinuousTestResultsListOptions {
  /**
   * The maximum number of items to return in a single page. By default 100 and
   * at most 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsEnvironmentsDeploymentsList.
 */
export interface ProjectsLocationsAgentsEnvironmentsDeploymentsListOptions {
  /**
   * The maximum number of items to return in a single page. By default 20 and
   * at most 100.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsEnvironmentsExperimentsList.
 */
export interface ProjectsLocationsAgentsEnvironmentsExperimentsListOptions {
  /**
   * The maximum number of items to return in a single page. By default 20 and
   * at most 100.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsEnvironmentsExperimentsPatch.
 */
export interface ProjectsLocationsAgentsEnvironmentsExperimentsPatchOptions {
  /**
   * Required. The mask to control which fields get updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAgentsEnvironmentsExperimentsPatchOptions(data: any): ProjectsLocationsAgentsEnvironmentsExperimentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAgentsEnvironmentsExperimentsPatchOptions(data: any): ProjectsLocationsAgentsEnvironmentsExperimentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsEnvironmentsList.
 */
export interface ProjectsLocationsAgentsEnvironmentsListOptions {
  /**
   * The maximum number of items to return in a single page. By default 20 and
   * at most 100.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsEnvironmentsLookupEnvironmentHistory.
 */
export interface ProjectsLocationsAgentsEnvironmentsLookupEnvironmentHistoryOptions {
  /**
   * The maximum number of items to return in a single page. By default 100 and
   * at most 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsEnvironmentsPatch.
 */
export interface ProjectsLocationsAgentsEnvironmentsPatchOptions {
  /**
   * Required. The mask to control which fields get updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAgentsEnvironmentsPatchOptions(data: any): ProjectsLocationsAgentsEnvironmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAgentsEnvironmentsPatchOptions(data: any): ProjectsLocationsAgentsEnvironmentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsEnvironmentsSessionsEntityTypesList.
 */
export interface ProjectsLocationsAgentsEnvironmentsSessionsEntityTypesListOptions {
  /**
   * The maximum number of items to return in a single page. By default 100 and
   * at most 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsEnvironmentsSessionsEntityTypesPatch.
 */
export interface ProjectsLocationsAgentsEnvironmentsSessionsEntityTypesPatchOptions {
  /**
   * The mask to control which fields get updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAgentsEnvironmentsSessionsEntityTypesPatchOptions(data: any): ProjectsLocationsAgentsEnvironmentsSessionsEntityTypesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAgentsEnvironmentsSessionsEntityTypesPatchOptions(data: any): ProjectsLocationsAgentsEnvironmentsSessionsEntityTypesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsFlowsCreate.
 */
export interface ProjectsLocationsAgentsFlowsCreateOptions {
  /**
   * The language of the following fields in `flow`: *
   * `Flow.event_handlers.trigger_fulfillment.messages` *
   * `Flow.event_handlers.trigger_fulfillment.conditional_cases` *
   * `Flow.transition_routes.trigger_fulfillment.messages` *
   * `Flow.transition_routes.trigger_fulfillment.conditional_cases` If not
   * specified, the agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsFlowsDelete.
 */
export interface ProjectsLocationsAgentsFlowsDeleteOptions {
  /**
   * This field has no effect for flows with no incoming transitions. For flows
   * with incoming transitions: * If `force` is set to false, an error will be
   * returned with message indicating the incoming transitions. * If `force` is
   * set to true, Dialogflow will remove the flow, as well as any transitions to
   * the flow (i.e. Target flow in event handlers or Target flow in transition
   * routes that point to this flow will be cleared).
   */
  force?: boolean;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsFlowsGet.
 */
export interface ProjectsLocationsAgentsFlowsGetOptions {
  /**
   * The language to retrieve the flow for. The following fields are language
   * dependent: * `Flow.event_handlers.trigger_fulfillment.messages` *
   * `Flow.event_handlers.trigger_fulfillment.conditional_cases` *
   * `Flow.transition_routes.trigger_fulfillment.messages` *
   * `Flow.transition_routes.trigger_fulfillment.conditional_cases` If not
   * specified, the agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsFlowsGetValidationResult.
 */
export interface ProjectsLocationsAgentsFlowsGetValidationResultOptions {
  /**
   * If not specified, the agent's default language is used.
   */
  languageCode?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsFlowsList.
 */
export interface ProjectsLocationsAgentsFlowsListOptions {
  /**
   * The language to list flows for. The following fields are language
   * dependent: * `Flow.event_handlers.trigger_fulfillment.messages` *
   * `Flow.event_handlers.trigger_fulfillment.conditional_cases` *
   * `Flow.transition_routes.trigger_fulfillment.messages` *
   * `Flow.transition_routes.trigger_fulfillment.conditional_cases` If not
   * specified, the agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
  /**
   * The maximum number of items to return in a single page. By default 100 and
   * at most 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsFlowsPagesCreate.
 */
export interface ProjectsLocationsAgentsFlowsPagesCreateOptions {
  /**
   * The language of the following fields in `page`: *
   * `Page.entry_fulfillment.messages` *
   * `Page.entry_fulfillment.conditional_cases` *
   * `Page.event_handlers.trigger_fulfillment.messages` *
   * `Page.event_handlers.trigger_fulfillment.conditional_cases` *
   * `Page.form.parameters.fill_behavior.initial_prompt_fulfillment.messages` *
   * `Page.form.parameters.fill_behavior.initial_prompt_fulfillment.conditional_cases`
   * * `Page.form.parameters.fill_behavior.reprompt_event_handlers.messages` *
   * `Page.form.parameters.fill_behavior.reprompt_event_handlers.conditional_cases`
   * * `Page.transition_routes.trigger_fulfillment.messages` *
   * `Page.transition_routes.trigger_fulfillment.conditional_cases` If not
   * specified, the agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsFlowsPagesDelete.
 */
export interface ProjectsLocationsAgentsFlowsPagesDeleteOptions {
  /**
   * This field has no effect for pages with no incoming transitions. For pages
   * with incoming transitions: * If `force` is set to false, an error will be
   * returned with message indicating the incoming transitions. * If `force` is
   * set to true, Dialogflow will remove the page, as well as any transitions to
   * the page (i.e. Target page in event handlers or Target page in transition
   * routes that point to this page will be cleared).
   */
  force?: boolean;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsFlowsPagesGet.
 */
export interface ProjectsLocationsAgentsFlowsPagesGetOptions {
  /**
   * The language to retrieve the page for. The following fields are language
   * dependent: * `Page.entry_fulfillment.messages` *
   * `Page.entry_fulfillment.conditional_cases` *
   * `Page.event_handlers.trigger_fulfillment.messages` *
   * `Page.event_handlers.trigger_fulfillment.conditional_cases` *
   * `Page.form.parameters.fill_behavior.initial_prompt_fulfillment.messages` *
   * `Page.form.parameters.fill_behavior.initial_prompt_fulfillment.conditional_cases`
   * * `Page.form.parameters.fill_behavior.reprompt_event_handlers.messages` *
   * `Page.form.parameters.fill_behavior.reprompt_event_handlers.conditional_cases`
   * * `Page.transition_routes.trigger_fulfillment.messages` *
   * `Page.transition_routes.trigger_fulfillment.conditional_cases` If not
   * specified, the agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsFlowsPagesList.
 */
export interface ProjectsLocationsAgentsFlowsPagesListOptions {
  /**
   * The language to list pages for. The following fields are language
   * dependent: * `Page.entry_fulfillment.messages` *
   * `Page.entry_fulfillment.conditional_cases` *
   * `Page.event_handlers.trigger_fulfillment.messages` *
   * `Page.event_handlers.trigger_fulfillment.conditional_cases` *
   * `Page.form.parameters.fill_behavior.initial_prompt_fulfillment.messages` *
   * `Page.form.parameters.fill_behavior.initial_prompt_fulfillment.conditional_cases`
   * * `Page.form.parameters.fill_behavior.reprompt_event_handlers.messages` *
   * `Page.form.parameters.fill_behavior.reprompt_event_handlers.conditional_cases`
   * * `Page.transition_routes.trigger_fulfillment.messages` *
   * `Page.transition_routes.trigger_fulfillment.conditional_cases` If not
   * specified, the agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
  /**
   * The maximum number of items to return in a single page. By default 100 and
   * at most 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsFlowsPagesPatch.
 */
export interface ProjectsLocationsAgentsFlowsPagesPatchOptions {
  /**
   * The language of the following fields in `page`: *
   * `Page.entry_fulfillment.messages` *
   * `Page.entry_fulfillment.conditional_cases` *
   * `Page.event_handlers.trigger_fulfillment.messages` *
   * `Page.event_handlers.trigger_fulfillment.conditional_cases` *
   * `Page.form.parameters.fill_behavior.initial_prompt_fulfillment.messages` *
   * `Page.form.parameters.fill_behavior.initial_prompt_fulfillment.conditional_cases`
   * * `Page.form.parameters.fill_behavior.reprompt_event_handlers.messages` *
   * `Page.form.parameters.fill_behavior.reprompt_event_handlers.conditional_cases`
   * * `Page.transition_routes.trigger_fulfillment.messages` *
   * `Page.transition_routes.trigger_fulfillment.conditional_cases` If not
   * specified, the agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
  /**
   * The mask to control which fields get updated. If the mask is not present,
   * all fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAgentsFlowsPagesPatchOptions(data: any): ProjectsLocationsAgentsFlowsPagesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAgentsFlowsPagesPatchOptions(data: any): ProjectsLocationsAgentsFlowsPagesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsFlowsPatch.
 */
export interface ProjectsLocationsAgentsFlowsPatchOptions {
  /**
   * The language of the following fields in `flow`: *
   * `Flow.event_handlers.trigger_fulfillment.messages` *
   * `Flow.event_handlers.trigger_fulfillment.conditional_cases` *
   * `Flow.transition_routes.trigger_fulfillment.messages` *
   * `Flow.transition_routes.trigger_fulfillment.conditional_cases` If not
   * specified, the agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
  /**
   * The mask to control which fields get updated. If the mask is not present,
   * all fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAgentsFlowsPatchOptions(data: any): ProjectsLocationsAgentsFlowsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAgentsFlowsPatchOptions(data: any): ProjectsLocationsAgentsFlowsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsFlowsTransitionRouteGroupsCreate.
 */
export interface ProjectsLocationsAgentsFlowsTransitionRouteGroupsCreateOptions {
  /**
   * The language of the following fields in `TransitionRouteGroup`: *
   * `TransitionRouteGroup.transition_routes.trigger_fulfillment.messages` *
   * `TransitionRouteGroup.transition_routes.trigger_fulfillment.conditional_cases`
   * If not specified, the agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsFlowsTransitionRouteGroupsDelete.
 */
export interface ProjectsLocationsAgentsFlowsTransitionRouteGroupsDeleteOptions {
  /**
   * This field has no effect for transition route group that no page is using.
   * If the transition route group is referenced by any page: * If `force` is
   * set to false, an error will be returned with message indicating pages that
   * reference the transition route group. * If `force` is set to true,
   * Dialogflow will remove the transition route group, as well as any reference
   * to it.
   */
  force?: boolean;
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsFlowsTransitionRouteGroupsGet.
 */
export interface ProjectsLocationsAgentsFlowsTransitionRouteGroupsGetOptions {
  /**
   * The language to retrieve the transition route group for. The following
   * fields are language dependent: *
   * `TransitionRouteGroup.transition_routes.trigger_fulfillment.messages` *
   * `TransitionRouteGroup.transition_routes.trigger_fulfillment.conditional_cases`
   * If not specified, the agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsFlowsTransitionRouteGroupsList.
 */
export interface ProjectsLocationsAgentsFlowsTransitionRouteGroupsListOptions {
  /**
   * The language to list transition route groups for. The following fields are
   * language dependent: *
   * `TransitionRouteGroup.transition_routes.trigger_fulfillment.messages` *
   * `TransitionRouteGroup.transition_routes.trigger_fulfillment.conditional_cases`
   * If not specified, the agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
  /**
   * The maximum number of items to return in a single page. By default 100 and
   * at most 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsFlowsTransitionRouteGroupsPatch.
 */
export interface ProjectsLocationsAgentsFlowsTransitionRouteGroupsPatchOptions {
  /**
   * The language of the following fields in `TransitionRouteGroup`: *
   * `TransitionRouteGroup.transition_routes.trigger_fulfillment.messages` *
   * `TransitionRouteGroup.transition_routes.trigger_fulfillment.conditional_cases`
   * If not specified, the agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
  /**
   * The mask to control which fields get updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAgentsFlowsTransitionRouteGroupsPatchOptions(data: any): ProjectsLocationsAgentsFlowsTransitionRouteGroupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAgentsFlowsTransitionRouteGroupsPatchOptions(data: any): ProjectsLocationsAgentsFlowsTransitionRouteGroupsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsFlowsVersionsList.
 */
export interface ProjectsLocationsAgentsFlowsVersionsListOptions {
  /**
   * The maximum number of items to return in a single page. By default 20 and
   * at most 100.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsFlowsVersionsPatch.
 */
export interface ProjectsLocationsAgentsFlowsVersionsPatchOptions {
  /**
   * Required. The mask to control which fields get updated. Currently only
   * `description` and `display_name` can be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAgentsFlowsVersionsPatchOptions(data: any): ProjectsLocationsAgentsFlowsVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAgentsFlowsVersionsPatchOptions(data: any): ProjectsLocationsAgentsFlowsVersionsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsGetValidationResult.
 */
export interface ProjectsLocationsAgentsGetValidationResultOptions {
  /**
   * If not specified, the agent's default language is used.
   */
  languageCode?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsIntentsCreate.
 */
export interface ProjectsLocationsAgentsIntentsCreateOptions {
  /**
   * The language of the following fields in `intent`: *
   * `Intent.training_phrases.parts.text` If not specified, the agent's default
   * language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsIntentsGet.
 */
export interface ProjectsLocationsAgentsIntentsGetOptions {
  /**
   * The language to retrieve the intent for. The following fields are language
   * dependent: * `Intent.training_phrases.parts.text` If not specified, the
   * agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsIntentsList.
 */
export interface ProjectsLocationsAgentsIntentsListOptions {
  /**
   * The resource view to apply to the returned intent.
   */
  intentView?:  | "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_PARTIAL" | "INTENT_VIEW_FULL";
  /**
   * The language to list intents for. The following fields are language
   * dependent: * `Intent.training_phrases.parts.text` If not specified, the
   * agent's default language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
  /**
   * The maximum number of items to return in a single page. By default 100 and
   * at most 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsIntentsPatch.
 */
export interface ProjectsLocationsAgentsIntentsPatchOptions {
  /**
   * The language of the following fields in `intent`: *
   * `Intent.training_phrases.parts.text` If not specified, the agent's default
   * language is used. [Many
   * languages](https://cloud.google.com/dialogflow/cx/docs/reference/language)
   * are supported. Note: languages must be enabled in the agent before they can
   * be used.
   */
  languageCode?: string;
  /**
   * The mask to control which fields get updated. If the mask is not present,
   * all fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAgentsIntentsPatchOptions(data: any): ProjectsLocationsAgentsIntentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAgentsIntentsPatchOptions(data: any): ProjectsLocationsAgentsIntentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsList.
 */
export interface ProjectsLocationsAgentsListOptions {
  /**
   * The maximum number of items to return in a single page. By default 100 and
   * at most 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsPatch.
 */
export interface ProjectsLocationsAgentsPatchOptions {
  /**
   * The mask to control which fields get updated. If the mask is not present,
   * all fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAgentsPatchOptions(data: any): ProjectsLocationsAgentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAgentsPatchOptions(data: any): ProjectsLocationsAgentsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsSessionsEntityTypesList.
 */
export interface ProjectsLocationsAgentsSessionsEntityTypesListOptions {
  /**
   * The maximum number of items to return in a single page. By default 100 and
   * at most 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsSessionsEntityTypesPatch.
 */
export interface ProjectsLocationsAgentsSessionsEntityTypesPatchOptions {
  /**
   * The mask to control which fields get updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAgentsSessionsEntityTypesPatchOptions(data: any): ProjectsLocationsAgentsSessionsEntityTypesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAgentsSessionsEntityTypesPatchOptions(data: any): ProjectsLocationsAgentsSessionsEntityTypesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsTestCasesCalculateCoverage.
 */
export interface ProjectsLocationsAgentsTestCasesCalculateCoverageOptions {
  /**
   * Required. The type of coverage requested.
   */
  type?:  | "COVERAGE_TYPE_UNSPECIFIED" | "INTENT" | "PAGE_TRANSITION" | "TRANSITION_ROUTE_GROUP";
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsTestCasesList.
 */
export interface ProjectsLocationsAgentsTestCasesListOptions {
  /**
   * The maximum number of items to return in a single page. By default 20.
   * Note that when TestCaseView = FULL, the maximum page size allowed is 20.
   * When TestCaseView = BASIC, the maximum page size allowed is 500.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
  /**
   * Specifies whether response should include all fields or just the metadata.
   */
  view?:  | "TEST_CASE_VIEW_UNSPECIFIED" | "BASIC" | "FULL";
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsTestCasesPatch.
 */
export interface ProjectsLocationsAgentsTestCasesPatchOptions {
  /**
   * Required. The mask to specify which fields should be updated. The
   * `creationTime` and `lastTestResult` cannot be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAgentsTestCasesPatchOptions(data: any): ProjectsLocationsAgentsTestCasesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAgentsTestCasesPatchOptions(data: any): ProjectsLocationsAgentsTestCasesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for
 * Dialogflow#projectsLocationsAgentsTestCasesResultsList.
 */
export interface ProjectsLocationsAgentsTestCasesResultsListOptions {
  /**
   * The filter expression used to filter test case results. See [API
   * Filtering](https://aip.dev/160). The expression is case insensitive. Only
   * 'AND' is supported for logical operators. The supported syntax is listed
   * below in detail: [AND ] ... [AND latest] The supported fields and operators
   * are: field operator `environment` `=`, `IN` (Use value `draft` for draft
   * environment) `test_time` `>`, `<` `latest` only returns the latest test
   * result in all results for each test case. Examples: * "environment=draft
   * AND latest" matches the latest test result for each test case in the draft
   * environment. * "environment IN (e1,e2)" matches any test case results with
   * an environment resource name of either "e1" or "e2". * "test_time >
   * 1602540713" matches any test case results with test time later than a unix
   * timestamp in seconds 1602540713.
   */
  filter?: string;
  /**
   * The maximum number of items to return in a single page. By default 100 and
   * at most 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsWebhooksDelete.
 */
export interface ProjectsLocationsAgentsWebhooksDeleteOptions {
  /**
   * This field has no effect for webhook not being used. For webhooks that are
   * used by pages/flows/transition route groups: * If `force` is set to false,
   * an error will be returned with message indicating the referenced resources.
   * * If `force` is set to true, Dialogflow will remove the webhook, as well as
   * any references to the webhook (i.e. Webhook and tagin fulfillments that
   * point to this webhook will be removed).
   */
  force?: boolean;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsWebhooksList.
 */
export interface ProjectsLocationsAgentsWebhooksListOptions {
  /**
   * The maximum number of items to return in a single page. By default 100 and
   * at most 1000.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsAgentsWebhooksPatch.
 */
export interface ProjectsLocationsAgentsWebhooksPatchOptions {
  /**
   * The mask to control which fields get updated. If the mask is not present,
   * all fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsAgentsWebhooksPatchOptions(data: any): ProjectsLocationsAgentsWebhooksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsAgentsWebhooksPatchOptions(data: any): ProjectsLocationsAgentsWebhooksPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dialogflow#projectsLocationsList.
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
 * Additional options for Dialogflow#projectsLocationsOperationsList.
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
 * Additional options for Dialogflow#projectsLocationsSecuritySettingsList.
 */
export interface ProjectsLocationsSecuritySettingsListOptions {
  /**
   * The maximum number of items to return in a single page. By default 20 and
   * at most 100.
   */
  pageSize?: number;
  /**
   * The next_page_token value returned from a previous list request.
   */
  pageToken?: string;
}

/**
 * Additional options for Dialogflow#projectsLocationsSecuritySettingsPatch.
 */
export interface ProjectsLocationsSecuritySettingsPatchOptions {
  /**
   * Required. The mask to control which fields get updated. If the mask is not
   * present, all fields will be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsSecuritySettingsPatchOptions(data: any): ProjectsLocationsSecuritySettingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsSecuritySettingsPatchOptions(data: any): ProjectsLocationsSecuritySettingsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for Dialogflow#projectsOperationsList.
 */
export interface ProjectsOperationsListOptions {
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
