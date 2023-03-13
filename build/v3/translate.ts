// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Translation API Client for Deno
 * =====================================
 * 
 * Integrates text translation into your website or application.
 * 
 * Docs: https://cloud.google.com/translate/docs/quickstarts
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Integrates text translation into your website or application.
 */
export class translate {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://translation.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Detects the language of text within a request.
   *
   * @param parent Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}/locations/{location-id}` or `projects/{project-number-or-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Only models within the same region (has same location-id) can be used. Otherwise an INVALID_ARGUMENT (400) error is returned.
   */
  async projectsDetectLanguage(parent: string, req: DetectLanguageRequest): Promise<DetectLanguageResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }:detectLanguage`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as DetectLanguageResponse;
  }

  /**
   * Returns a list of supported languages for translation.
   *
   * @param parent Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}` or `projects/{project-number-or-id}/locations/{location-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Non-global location is required for AutoML models. Only models within the same region (have same location-id) can be used, otherwise an INVALID_ARGUMENT (400) error is returned.
   */
  async projectsGetSupportedLanguages(parent: string, opts: ProjectsGetSupportedLanguagesOptions = {}): Promise<SupportedLanguages> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/supportedLanguages`);
    if (opts.displayLanguageCode !== undefined) {
      url.searchParams.append("displayLanguageCode", String(opts.displayLanguageCode));
    }
    if (opts.model !== undefined) {
      url.searchParams.append("model", String(opts.model));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SupportedLanguages;
  }

  /**
   * Translates a large volume of document in asynchronous batch mode. This
   * function provides real-time output as the inputs are being processed. If
   * caller cancels a request, the partial results (for an input file, it's all
   * or nothing) may still be available on the specified output location. This
   * call returns immediately and you can use google.longrunning.Operation.name
   * to poll the status of the call.
   *
   * @param parent Required. Location to make a regional call. Format: `projects/{project-number-or-id}/locations/{location-id}`. The `global` location is not supported for batch translation. Only AutoML Translation models or glossaries within the same region (have the same location-id) can be used, otherwise an INVALID_ARGUMENT (400) error is returned.
   */
  async projectsLocationsBatchTranslateDocument(parent: string, req: BatchTranslateDocumentRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }:batchTranslateDocument`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Translates a large volume of text in asynchronous batch mode. This
   * function provides real-time output as the inputs are being processed. If
   * caller cancels a request, the partial results (for an input file, it's all
   * or nothing) may still be available on the specified output location. This
   * call returns immediately and you can use google.longrunning.Operation.name
   * to poll the status of the call.
   *
   * @param parent Required. Location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}/locations/{location-id}`. The `global` location is not supported for batch translation. Only AutoML Translation models or glossaries within the same region (have the same location-id) can be used, otherwise an INVALID_ARGUMENT (400) error is returned.
   */
  async projectsLocationsBatchTranslateText(parent: string, req: BatchTranslateTextRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }:batchTranslateText`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Creates a Dataset.
   *
   * @param parent Required. The project name.
   */
  async projectsLocationsDatasetsCreate(parent: string, req: Dataset): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/datasets`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a dataset and all of its contents.
   *
   * @param name Required. The name of the dataset to delete.
   */
  async projectsLocationsDatasetsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Lists sentence pairs in the dataset.
   *
   * @param parent Required. Name of the parent dataset. In form of `projects/{project-number-or-id}/locations/{location-id}/datasets/{dataset-id}`
   */
  async projectsLocationsDatasetsExamplesList(parent: string, opts: ProjectsLocationsDatasetsExamplesListOptions = {}): Promise<ListExamplesResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/examples`);
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
    return data as ListExamplesResponse;
  }

  /**
   * Exports dataset's data to the provided output location.
   *
   * @param dataset Required. Name of the dataset. In form of `projects/{project-number-or-id}/locations/{location-id}/datasets/{dataset-id}`
   */
  async projectsLocationsDatasetsExportData(dataset: string, req: ExportDataRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ dataset }:exportData`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Gets a Dataset.
   *
   * @param name Required. The resource name of the dataset to retrieve.
   */
  async projectsLocationsDatasetsGet(name: string): Promise<Dataset> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Dataset;
  }

  /**
   * Import sentence pairs into translation Dataset.
   *
   * @param dataset Required. Name of the dataset. In form of `projects/{project-number-or-id}/locations/{location-id}/datasets/{dataset-id}`
   */
  async projectsLocationsDatasetsImportData(dataset: string, req: ImportDataRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ dataset }:importData`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Lists datasets.
   *
   * @param parent Required. Name of the parent project. In form of `projects/{project-number-or-id}/locations/{location-id}`
   */
  async projectsLocationsDatasetsList(parent: string, opts: ProjectsLocationsDatasetsListOptions = {}): Promise<ListDatasetsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/datasets`);
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
    return data as ListDatasetsResponse;
  }

  /**
   * Detects the language of text within a request.
   *
   * @param parent Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}/locations/{location-id}` or `projects/{project-number-or-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Only models within the same region (has same location-id) can be used. Otherwise an INVALID_ARGUMENT (400) error is returned.
   */
  async projectsLocationsDetectLanguage(parent: string, req: DetectLanguageRequest): Promise<DetectLanguageResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }:detectLanguage`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as DetectLanguageResponse;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<Location> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Location;
  }

  /**
   * Returns a list of supported languages for translation.
   *
   * @param parent Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}` or `projects/{project-number-or-id}/locations/{location-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Non-global location is required for AutoML models. Only models within the same region (have same location-id) can be used, otherwise an INVALID_ARGUMENT (400) error is returned.
   */
  async projectsLocationsGetSupportedLanguages(parent: string, opts: ProjectsLocationsGetSupportedLanguagesOptions = {}): Promise<SupportedLanguages> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/supportedLanguages`);
    if (opts.displayLanguageCode !== undefined) {
      url.searchParams.append("displayLanguageCode", String(opts.displayLanguageCode));
    }
    if (opts.model !== undefined) {
      url.searchParams.append("model", String(opts.model));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as SupportedLanguages;
  }

  /**
   * Creates a glossary and returns the long-running operation. Returns
   * NOT_FOUND, if the project doesn't exist.
   *
   * @param parent Required. The project name.
   */
  async projectsLocationsGlossariesCreate(parent: string, req: Glossary): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/glossaries`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a glossary, or cancels glossary construction if the glossary isn't
   * created yet. Returns NOT_FOUND, if the glossary doesn't exist.
   *
   * @param name Required. The name of the glossary to delete.
   */
  async projectsLocationsGlossariesDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a glossary. Returns NOT_FOUND, if the glossary doesn't exist.
   *
   * @param name Required. The name of the glossary to retrieve.
   */
  async projectsLocationsGlossariesGet(name: string): Promise<Glossary> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Glossary;
  }

  /**
   * Creates a glossary entry.
   *
   * @param parent Required. The resource name of the glossary to create the entry under.
   */
  async projectsLocationsGlossariesGlossaryEntriesCreate(parent: string, req: GlossaryEntry): Promise<GlossaryEntry> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/glossaryEntries`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GlossaryEntry;
  }

  /**
   * Deletes a single entry from the glossary
   *
   * @param name Required. The resource name of the glossary entry to delete
   */
  async projectsLocationsGlossariesGlossaryEntriesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets a single glossary entry by the given id.
   *
   * @param name Required. The resource name of the glossary entry to get
   */
  async projectsLocationsGlossariesGlossaryEntriesGet(name: string): Promise<GlossaryEntry> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GlossaryEntry;
  }

  /**
   * List the entries for the glossary.
   *
   * @param parent Required. The parent glossary resource name for listing the glossary's entries.
   */
  async projectsLocationsGlossariesGlossaryEntriesList(parent: string, opts: ProjectsLocationsGlossariesGlossaryEntriesListOptions = {}): Promise<ListGlossaryEntriesResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/glossaryEntries`);
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
    return data as ListGlossaryEntriesResponse;
  }

  /**
   * Updates a glossary entry.
   *
   * @param name Required. The resource name of the entry. Format: "projects/*\/locations/*\/glossaries/*\/glossaryEntries/*"
   */
  async projectsLocationsGlossariesGlossaryEntriesPatch(name: string, req: GlossaryEntry): Promise<GlossaryEntry> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return data as GlossaryEntry;
  }

  /**
   * Lists glossaries in a project. Returns NOT_FOUND, if the project doesn't
   * exist.
   *
   * @param parent Required. The name of the project from which to list all of the glossaries.
   */
  async projectsLocationsGlossariesList(parent: string, opts: ProjectsLocationsGlossariesListOptions = {}): Promise<ListGlossariesResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/glossaries`);
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
    return data as ListGlossariesResponse;
  }

  /**
   * Updates a glossary. A LRO is used since the update can be async if the
   * glossary's entry file is updated.
   *
   * @param name Required. The resource name of the glossary. Glossary names have the form `projects/{project-number-or-id}/locations/{location-id}/glossaries/{glossary-id}`.
   */
  async projectsLocationsGlossariesPatch(name: string, req: Glossary, opts: ProjectsLocationsGlossariesPatchOptions = {}): Promise<Operation> {
    opts = serializeProjectsLocationsGlossariesPatchOptions(opts);
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
    return data as Operation;
  }

  /**
   * Lists information about the supported locations for this service.
   *
   * @param name The resource that owns the locations collection, if applicable.
   */
  async projectsLocationsList(name: string, opts: ProjectsLocationsListOptions = {}): Promise<ListLocationsResponse> {
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
    return data as ListLocationsResponse;
  }

  /**
   * Creates a Model.
   *
   * @param parent Required. The project name, in form of `projects/{project}/locations/{location}`
   */
  async projectsLocationsModelsCreate(parent: string, req: Model): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/models`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a model.
   *
   * @param name Required. The name of the model to delete.
   */
  async projectsLocationsModelsDelete(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Operation;
  }

  /**
   * Gets a model.
   *
   * @param name Required. The resource name of the model to retrieve.
   */
  async projectsLocationsModelsGet(name: string): Promise<Model> {
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Model;
  }

  /**
   * Lists models.
   *
   * @param parent Required. Name of the parent project. In form of `projects/{project-number-or-id}/locations/{location-id}`
   */
  async projectsLocationsModelsList(parent: string, opts: ProjectsLocationsModelsListOptions = {}): Promise<ListModelsResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }/models`);
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
    return data as ListModelsResponse;
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
    const url = new URL(`${this.#baseUrl}v3/${ name }:cancel`);
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
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
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
    const url = new URL(`${this.#baseUrl}v3/${ name }`);
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
    return data as ListOperationsResponse;
  }

  /**
   * Waits until the specified long-running operation is done or reaches at
   * most a specified timeout, returning the latest state. If the operation is
   * already done, the latest state is immediately returned. If the timeout
   * specified is greater than the default HTTP/RPC timeout, the HTTP/RPC
   * timeout is used. If the server does not support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort
   * basis. It may return the latest state before the specified timeout
   * (including immediately), meaning even an immediate response is no guarantee
   * that the operation is done.
   *
   * @param name The name of the operation resource to wait on.
   */
  async projectsLocationsOperationsWait(name: string, req: WaitOperationRequest): Promise<Operation> {
    req = serializeWaitOperationRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ name }:wait`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Translates documents in synchronous mode.
   *
   * @param parent Required. Location to make a regional call. Format: `projects/{project-number-or-id}/locations/{location-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Non-global location is required for requests using AutoML models or custom glossaries. Models and glossaries must be within the same region (have the same location-id), otherwise an INVALID_ARGUMENT (400) error is returned.
   */
  async projectsLocationsTranslateDocument(parent: string, req: TranslateDocumentRequest): Promise<TranslateDocumentResponse> {
    req = serializeTranslateDocumentRequest(req);
    const url = new URL(`${this.#baseUrl}v3/${ parent }:translateDocument`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeTranslateDocumentResponse(data);
  }

  /**
   * Translates input text and returns translated text.
   *
   * @param parent Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}` or `projects/{project-number-or-id}/locations/{location-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Non-global location is required for requests using AutoML models or custom glossaries. Models and glossaries must be within the same region (have same location-id), otherwise an INVALID_ARGUMENT (400) error is returned.
   */
  async projectsLocationsTranslateText(parent: string, req: TranslateTextRequest): Promise<TranslateTextResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }:translateText`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TranslateTextResponse;
  }

  /**
   * Translates input text and returns translated text.
   *
   * @param parent Required. Project or location to make a call. Must refer to a caller's project. Format: `projects/{project-number-or-id}` or `projects/{project-number-or-id}/locations/{location-id}`. For global calls, use `projects/{project-number-or-id}/locations/global` or `projects/{project-number-or-id}`. Non-global location is required for requests using AutoML models or custom glossaries. Models and glossaries must be within the same region (have same location-id), otherwise an INVALID_ARGUMENT (400) error is returned.
   */
  async projectsTranslateText(parent: string, req: TranslateTextRequest): Promise<TranslateTextResponse> {
    const url = new URL(`${this.#baseUrl}v3/${ parent }:translateText`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as TranslateTextResponse;
  }
}

/**
 * Input configuration for BatchTranslateDocument request.
 */
export interface BatchDocumentInputConfig {
  /**
   * Google Cloud Storage location for the source input. This can be a single
   * file (for example, `gs://translation-test/input.docx`) or a wildcard (for
   * example, `gs://translation-test/*`). File mime type is determined based on
   * extension. Supported mime type includes: - `pdf`, application/pdf - `docx`,
   * application/vnd.openxmlformats-officedocument.wordprocessingml.document -
   * `pptx`,
   * application/vnd.openxmlformats-officedocument.presentationml.presentation -
   * `xlsx`, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
   * The max file size to support for `.docx`, `.pptx` and `.xlsx` is 100MB. The
   * max file size to support for `.pdf` is 1GB and the max page limit is 1000
   * pages. The max file size to support for all input documents is 1GB.
   */
  gcsSource?: GcsSource;
}

/**
 * Output configuration for BatchTranslateDocument request.
 */
export interface BatchDocumentOutputConfig {
  /**
   * Google Cloud Storage destination for output content. For every single
   * input document (for example, gs://a/b/c.[extension]), we generate at most 2
   * * n output files. (n is the # of target_language_codes in the
   * BatchTranslateDocumentRequest). While the input documents are being
   * processed, we write/update an index file `index.csv` under
   * `gcs_destination.output_uri_prefix` (for example,
   * gs://translation_output/index.csv) The index file is generated/updated as
   * new files are being translated. The format is:
   * input_document,target_language_code,translation_output,error_output,
   * glossary_translation_output,glossary_error_output `input_document` is one
   * file we matched using gcs_source.input_uri. `target_language_code` is
   * provided in the request. `translation_output` contains the translations.
   * (details provided below) `error_output` contains the error message during
   * processing of the file. Both translations_file and errors_file could be
   * empty strings if we have no content to output.
   * `glossary_translation_output` and `glossary_error_output` are the
   * translated output/error when we apply glossaries. They could also be empty
   * if we have no content to output. Once a row is present in index.csv, the
   * input/output matching never changes. Callers should also expect all the
   * content in input_file are processed and ready to be consumed (that is, no
   * partial output file is written). Since index.csv will be keeping updated
   * during the process, please make sure there is no custom retention policy
   * applied on the output bucket that may avoid file updating.
   * (https://cloud.google.com/storage/docs/bucket-lock#retention-policy) The
   * naming format of translation output files follows (for target language code
   * [trg]): `translation_output`:
   * gs://translation_output/a_b_c_[trg]_translation.[extension]
   * `glossary_translation_output`:
   * gs://translation_test/a_b_c_[trg]_glossary_translation.[extension] The
   * output document will maintain the same file format as the input document.
   * The naming format of error output files follows (for target language code
   * [trg]): `error_output`: gs://translation_test/a_b_c_[trg]_errors.txt
   * `glossary_error_output`:
   * gs://translation_test/a_b_c_[trg]_glossary_translation.txt The error output
   * is a txt file containing error details.
   */
  gcsDestination?: GcsDestination;
}

/**
 * The BatchTranslateDocument request.
 */
export interface BatchTranslateDocumentRequest {
  /**
   * Optional. This flag is to support user customized attribution. If not
   * provided, the default is `Machine Translated by Google`. Customized
   * attribution should follow rules in
   * https://cloud.google.com/translate/attribution#attribution_and_logos
   */
  customizedAttribution?: string;
  /**
   * Optional.
   */
  formatConversions?: {
    [key: string]: string
  };
  /**
   * Optional. Glossaries to be applied. It's keyed by target language code.
   */
  glossaries?: {
    [key: string]: TranslateTextGlossaryConfig
  };
  /**
   * Required. Input configurations. The total number of files matched should
   * be <= 100. The total content size to translate should be <= 100M Unicode
   * codepoints. The files must use UTF-8 encoding.
   */
  inputConfigs?: BatchDocumentInputConfig[];
  /**
   * Optional. The models to use for translation. Map's key is target language
   * code. Map's value is the model name. Value can be a built-in general model,
   * or an AutoML Translation model. The value format depends on model type: -
   * AutoML Translation models:
   * `projects/{project-number-or-id}/locations/{location-id}/models/{model-id}`
   * - General (built-in) models:
   * `projects/{project-number-or-id}/locations/{location-id}/models/general/nmt`,
   * If the map is empty or a specific model is not requested for a language
   * pair, then default google model (nmt) is used.
   */
  models?: {
    [key: string]: string
  };
  /**
   * Required. Output configuration. If 2 input configs match to the same file
   * (that is, same input path), we don't generate output for duplicate inputs.
   */
  outputConfig?: BatchDocumentOutputConfig;
  /**
   * Required. The ISO-639 language code of the input document if known, for
   * example, "en-US" or "sr-Latn". Supported language codes are listed in
   * [Language Support](https://cloud.google.com/translate/docs/languages).
   */
  sourceLanguageCode?: string;
  /**
   * Required. The ISO-639 language code to use for translation of the input
   * document. Specify up to 10 language codes here.
   */
  targetLanguageCodes?: string[];
}

/**
 * The batch translation request.
 */
export interface BatchTranslateTextRequest {
  /**
   * Optional. Glossaries to be applied for translation. It's keyed by target
   * language code.
   */
  glossaries?: {
    [key: string]: TranslateTextGlossaryConfig
  };
  /**
   * Required. Input configurations. The total number of files matched should
   * be <= 100. The total content size should be <= 100M Unicode codepoints. The
   * files must use UTF-8 encoding.
   */
  inputConfigs?: InputConfig[];
  /**
   * Optional. The labels with user-defined metadata for the request. Label
   * keys and values can be no longer than 63 characters (Unicode codepoints),
   * can only contain lowercase letters, numeric characters, underscores and
   * dashes. International characters are allowed. Label values are optional.
   * Label keys must start with a letter. See
   * https://cloud.google.com/translate/docs/advanced/labels for more
   * information.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. The models to use for translation. Map's key is target language
   * code. Map's value is model name. Value can be a built-in general model, or
   * an AutoML Translation model. The value format depends on model type: -
   * AutoML Translation models:
   * `projects/{project-number-or-id}/locations/{location-id}/models/{model-id}`
   * - General (built-in) models:
   * `projects/{project-number-or-id}/locations/{location-id}/models/general/nmt`,
   * If the map is empty or a specific model is not requested for a language
   * pair, then default google model (nmt) is used.
   */
  models?: {
    [key: string]: string
  };
  /**
   * Required. Output configuration. If 2 input configs match to the same file
   * (that is, same input path), we don't generate output for duplicate inputs.
   */
  outputConfig?: OutputConfig;
  /**
   * Required. Source language code.
   */
  sourceLanguageCode?: string;
  /**
   * Required. Specify up to 10 language codes here.
   */
  targetLanguageCodes?: string[];
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * A dataset that hosts the examples (sentence pairs) used for translation
 * models.
 */
export interface Dataset {
  /**
   * Output only. Timestamp when this dataset was created.
   */
  readonly createTime?: Date;
  /**
   * The name of the dataset to show in the interface. The name can be up to 32
   * characters long and can consist only of ASCII Latin letters A-Z and a-z,
   * underscores (_), and ASCII digits 0-9.
   */
  displayName?: string;
  /**
   * Output only. The number of examples in the dataset.
   */
  readonly exampleCount?: number;
  /**
   * The resource name of the dataset, in form of
   * `projects/{project-number-or-id}/locations/{location_id}/datasets/{dataset_id}`
   */
  name?: string;
  /**
   * The BCP-47 language code of the source language.
   */
  sourceLanguageCode?: string;
  /**
   * The BCP-47 language code of the target language.
   */
  targetLanguageCode?: string;
  /**
   * Output only. Number of test examples (sentence pairs).
   */
  readonly testExampleCount?: number;
  /**
   * Output only. Number of training examples (sentence pairs).
   */
  readonly trainExampleCount?: number;
  /**
   * Output only. Timestamp when this dataset was last updated.
   */
  readonly updateTime?: Date;
  /**
   * Output only. Number of validation examples (sentence pairs).
   */
  readonly validateExampleCount?: number;
}

/**
 * Input configuration for datasets.
 */
export interface DatasetInputConfig {
  /**
   * Files containing the sentence pairs to be imported to the dataset.
   */
  inputFiles?: InputFile[];
}

/**
 * Output configuration for datasets.
 */
export interface DatasetOutputConfig {
  /**
   * Google Cloud Storage destination to write the output.
   */
  gcsDestination?: GcsOutputDestination;
}

/**
 * The response message for language detection.
 */
export interface DetectedLanguage {
  /**
   * The confidence of the detection result for this language.
   */
  confidence?: number;
  /**
   * The ISO-639 language code of the source content in the request, detected
   * automatically.
   */
  languageCode?: string;
}

/**
 * The request message for language detection.
 */
export interface DetectLanguageRequest {
  /**
   * The content of the input stored as a string.
   */
  content?: string;
  /**
   * Optional. The labels with user-defined metadata for the request. Label
   * keys and values can be no longer than 63 characters (Unicode codepoints),
   * can only contain lowercase letters, numeric characters, underscores and
   * dashes. International characters are allowed. Label values are optional.
   * Label keys must start with a letter. See
   * https://cloud.google.com/translate/docs/advanced/labels for more
   * information.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. The format of the source text, for example, "text/html",
   * "text/plain". If left blank, the MIME type defaults to "text/html".
   */
  mimeType?: string;
  /**
   * Optional. The language detection model to be used. Format:
   * `projects/{project-number-or-id}/locations/{location-id}/models/language-detection/{model-id}`
   * Only one language detection model is currently supported:
   * `projects/{project-number-or-id}/locations/{location-id}/models/language-detection/default`.
   * If not specified, the default model is used.
   */
  model?: string;
}

/**
 * The response message for language detection.
 */
export interface DetectLanguageResponse {
  /**
   * The most probable language detected by the Translation API. For each
   * request, the Translation API will always return only one result.
   */
  languages?: DetectedLanguage[];
}

/**
 * A document translation request input config.
 */
export interface DocumentInputConfig {
  /**
   * Document's content represented as a stream of bytes.
   */
  content?: Uint8Array;
  /**
   * Google Cloud Storage location. This must be a single file. For example:
   * gs://example_bucket/example_file.pdf
   */
  gcsSource?: GcsSource;
  /**
   * Specifies the input document's mime_type. If not specified it will be
   * determined using the file extension for gcs_source provided files. For a
   * file provided through bytes content the mime_type must be provided.
   * Currently supported mime types are: - application/pdf -
   * application/vnd.openxmlformats-officedocument.wordprocessingml.document -
   * application/vnd.openxmlformats-officedocument.presentationml.presentation -
   * application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
   */
  mimeType?: string;
}

function serializeDocumentInputConfig(data: any): DocumentInputConfig {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeDocumentInputConfig(data: any): DocumentInputConfig {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * A document translation request output config.
 */
export interface DocumentOutputConfig {
  /**
   * Optional. Google Cloud Storage destination for the translation output,
   * e.g., `gs://my_bucket/my_directory/`. The destination directory provided
   * does not have to be empty, but the bucket must exist. If a file with the
   * same name as the output file already exists in the destination an error
   * will be returned. For a DocumentInputConfig.contents provided document, the
   * output file will have the name "output_[trg]_translations.[ext]", where -
   * [trg] corresponds to the translated file's language code, - [ext]
   * corresponds to the translated file's extension according to its mime type.
   * For a DocumentInputConfig.gcs_uri provided document, the output file will
   * have a name according to its URI. For example: an input file with URI:
   * "gs://a/b/c.[extension]" stored in a gcs_destination bucket with name
   * "my_bucket" will have an output URI:
   * "gs://my_bucket/a_b_c_[trg]_translations.[ext]", where - [trg] corresponds
   * to the translated file's language code, - [ext] corresponds to the
   * translated file's extension according to its mime type. If the document was
   * directly provided through the request, then the output document will have
   * the format: "gs://my_bucket/translated_document_[trg]_translations.[ext],
   * where - [trg] corresponds to the translated file's language code, - [ext]
   * corresponds to the translated file's extension according to its mime type.
   * If a glossary was provided, then the output URI for the glossary
   * translation will be equal to the default output URI but have
   * `glossary_translations` instead of `translations`. For the previous
   * example, its glossary URI would be:
   * "gs://my_bucket/a_b_c_[trg]_glossary_translations.[ext]". Thus the max
   * number of output files will be 2 (Translated document, Glossary translated
   * document). Callers should expect no partial outputs. If there is any error
   * during document translation, no output will be stored in the Cloud Storage
   * bucket.
   */
  gcsDestination?: GcsDestination;
  /**
   * Optional. Specifies the translated document's mime_type. If not specified,
   * the translated file's mime type will be the same as the input file's mime
   * type. Currently only support the output mime type to be the same as input
   * mime type. - application/pdf -
   * application/vnd.openxmlformats-officedocument.wordprocessingml.document -
   * application/vnd.openxmlformats-officedocument.presentationml.presentation -
   * application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
   */
  mimeType?: string;
}

/**
 * A translated document message.
 */
export interface DocumentTranslation {
  /**
   * The array of translated documents. It is expected to be size 1 for now. We
   * may produce multiple translated documents in the future for other type of
   * file formats.
   */
  byteStreamOutputs?: Uint8Array[];
  /**
   * The detected language for the input document. If the user did not provide
   * the source language for the input document, this field will have the
   * language code automatically detected. If the source language was passed,
   * auto-detection of the language does not occur and this field is empty.
   */
  detectedLanguageCode?: string;
  /**
   * The translated document's mime type.
   */
  mimeType?: string;
}

function serializeDocumentTranslation(data: any): DocumentTranslation {
  return {
    ...data,
    byteStreamOutputs: data["byteStreamOutputs"] !== undefined ? data["byteStreamOutputs"].map((item: any) => (encodeBase64(item))) : undefined,
  };
}

function deserializeDocumentTranslation(data: any): DocumentTranslation {
  return {
    ...data,
    byteStreamOutputs: data["byteStreamOutputs"] !== undefined ? data["byteStreamOutputs"].map((item: any) => (decodeBase64(item as string))) : undefined,
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
 * A sentence pair.
 */
export interface Example {
  /**
   * Output only. The resource name of the example, in form of
   * `projects/{project-number-or-id}/locations/{location_id}/datasets/{dataset_id}/examples/{example_id}'
   */
  readonly name?: string;
  /**
   * Sentence in source language.
   */
  sourceText?: string;
  /**
   * Sentence in target language.
   */
  targetText?: string;
  /**
   * Output only. Usage of the sentence pair. Options are
   * TRAIN|VALIDATION|TEST.
   */
  readonly usage?: string;
}

/**
 * Request message for ExportData.
 */
export interface ExportDataRequest {
  /**
   * Required. The config for the output content.
   */
  outputConfig?: DatasetOutputConfig;
}

/**
 * The Google Cloud Storage location for the output content.
 */
export interface GcsDestination {
  /**
   * Required. The bucket used in 'output_uri_prefix' must exist and there must
   * be no files under 'output_uri_prefix'. 'output_uri_prefix' must end with
   * "/" and start with "gs://". One 'output_uri_prefix' can only be used by one
   * batch translation job at a time. Otherwise an INVALID_ARGUMENT (400) error
   * is returned.
   */
  outputUriPrefix?: string;
}

/**
 * The Google Cloud Storage location for the input content.
 */
export interface GcsInputSource {
  /**
   * Required. Source data URI. For example, `gs://my_bucket/my_object`.
   */
  inputUri?: string;
}

/**
 * The Google Cloud Storage location for the output content.
 */
export interface GcsOutputDestination {
  /**
   * Required. Google Cloud Storage URI to output directory. For example,
   * `gs://bucket/directory`. The requesting user must have write permission to
   * the bucket. The directory will be created if it doesn't exist.
   */
  outputUriPrefix?: string;
}

/**
 * The Google Cloud Storage location for the input content.
 */
export interface GcsSource {
  /**
   * Required. Source data URI. For example, `gs://my_bucket/my_object`.
   */
  inputUri?: string;
}

/**
 * Represents a glossary built from user-provided data.
 */
export interface Glossary {
  /**
   * Optional. The display name of the glossary.
   */
  displayName?: string;
  /**
   * Output only. When the glossary creation was finished.
   */
  readonly endTime?: Date;
  /**
   * Output only. The number of entries defined in the glossary.
   */
  readonly entryCount?: number;
  /**
   * Required. Provides examples to build the glossary from. Total glossary
   * must not exceed 10M Unicode codepoints.
   */
  inputConfig?: GlossaryInputConfig;
  /**
   * Used with equivalent term set glossaries.
   */
  languageCodesSet?: LanguageCodesSet;
  /**
   * Used with unidirectional glossaries.
   */
  languagePair?: LanguageCodePair;
  /**
   * Required. The resource name of the glossary. Glossary names have the form
   * `projects/{project-number-or-id}/locations/{location-id}/glossaries/{glossary-id}`.
   */
  name?: string;
  /**
   * Output only. When CreateGlossary was called.
   */
  readonly submitTime?: Date;
}

/**
 * Represents a single entry in a glossary.
 */
export interface GlossaryEntry {
  /**
   * Describes the glossary entry.
   */
  description?: string;
  /**
   * Required. The resource name of the entry. Format:
   * "projects/*\/locations/*\/glossaries/*\/glossaryEntries/*"
   */
  name?: string;
  /**
   * Used for an unidirectional glossary.
   */
  termsPair?: GlossaryTermsPair;
  /**
   * Used for an equivalent term sets glossary.
   */
  termsSet?: GlossaryTermsSet;
}

/**
 * Input configuration for glossaries.
 */
export interface GlossaryInputConfig {
  /**
   * Required. Google Cloud Storage location of glossary data. File format is
   * determined based on the filename extension. API returns
   * [google.rpc.Code.INVALID_ARGUMENT] for unsupported URI-s and file formats.
   * Wildcards are not allowed. This must be a single file in one of the
   * following formats: For unidirectional glossaries: - TSV/CSV
   * (`.tsv`/`.csv`): Two column file, tab- or comma-separated. The first column
   * is source text. The second column is target text. No headers in this file.
   * The first row contains data and not column names. - TMX (`.tmx`): TMX file
   * with parallel data defining source/target term pairs. For equivalent term
   * sets glossaries: - CSV (`.csv`): Multi-column CSV file defining equivalent
   * glossary terms in multiple languages. See documentation for more
   * information -
   * [glossaries](https://cloud.google.com/translate/docs/advanced/glossary).
   */
  gcsSource?: GcsSource;
}

/**
 * Represents a single glossary term
 */
export interface GlossaryTerm {
  /**
   * The language for this glossary term.
   */
  languageCode?: string;
  /**
   * The text for the glossary term.
   */
  text?: string;
}

/**
 * Represents a single entry for an unidirectional glossary.
 */
export interface GlossaryTermsPair {
  /**
   * The source term is the term that will get match in the text,
   */
  sourceTerm?: GlossaryTerm;
  /**
   * The term that will replace the match source term.
   */
  targetTerm?: GlossaryTerm;
}

/**
 * Represents a single entry for an equivalent term set glossary. This is used
 * for equivalent term sets where each term can be replaced by the other terms
 * in the set.
 */
export interface GlossaryTermsSet {
  /**
   * Each term in the set represents a term that can be replaced by the other
   * terms.
   */
  terms?: GlossaryTerm[];
}

/**
 * Request message for ImportData.
 */
export interface ImportDataRequest {
  /**
   * Required. The config for the input content.
   */
  inputConfig?: DatasetInputConfig;
}

/**
 * Input configuration for BatchTranslateText request.
 */
export interface InputConfig {
  /**
   * Required. Google Cloud Storage location for the source input. This can be
   * a single file (for example, `gs://translation-test/input.tsv`) or a
   * wildcard (for example, `gs://translation-test/*`). If a file extension is
   * `.tsv`, it can contain either one or two columns. The first column
   * (optional) is the id of the text request. If the first column is missing,
   * we use the row number (0-based) from the input file as the ID in the output
   * file. The second column is the actual text to be translated. We recommend
   * each row be <= 10K Unicode codepoints, otherwise an error might be
   * returned. Note that the input tsv must be RFC 4180 compliant. You could use
   * https://github.com/Clever/csvlint to check potential formatting errors in
   * your tsv file. csvlint --delimiter='\t' your_input_file.tsv The other
   * supported file extensions are `.txt` or `.html`, which is treated as a
   * single large chunk of text.
   */
  gcsSource?: GcsSource;
  /**
   * Optional. Can be "text/plain" or "text/html". For `.tsv`, "text/html" is
   * used if mime_type is missing. For `.html`, this field must be "text/html"
   * or empty. For `.txt`, this field must be "text/plain" or empty.
   */
  mimeType?: string;
}

/**
 * An input file.
 */
export interface InputFile {
  /**
   * Google Cloud Storage file source.
   */
  gcsSource?: GcsInputSource;
  /**
   * Optional. Usage of the file contents. Options are TRAIN|VALIDATION|TEST,
   * or UNASSIGNED (by default) for auto split.
   */
  usage?: string;
}

/**
 * Used with unidirectional glossaries.
 */
export interface LanguageCodePair {
  /**
   * Required. The ISO-639 language code of the input text, for example,
   * "en-US". Expected to be an exact match for GlossaryTerm.language_code.
   */
  sourceLanguageCode?: string;
  /**
   * Required. The ISO-639 language code for translation output, for example,
   * "zh-CN". Expected to be an exact match for GlossaryTerm.language_code.
   */
  targetLanguageCode?: string;
}

/**
 * Used with equivalent term set glossaries.
 */
export interface LanguageCodesSet {
  /**
   * The ISO-639 language code(s) for terms defined in the glossary. All
   * entries are unique. The list contains at least two entries. Expected to be
   * an exact match for GlossaryTerm.language_code.
   */
  languageCodes?: string[];
}

/**
 * Response message for ListDatasets.
 */
export interface ListDatasetsResponse {
  /**
   * The datasets read.
   */
  datasets?: Dataset[];
  /**
   * A token to retrieve next page of results. Pass this token to the
   * page_token field in the ListDatasetsRequest to obtain the corresponding
   * page.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListExamples.
 */
export interface ListExamplesResponse {
  /**
   * The sentence pairs.
   */
  examples?: Example[];
  /**
   * A token to retrieve next page of results. Pass this token to the
   * page_token field in the ListExamplesRequest to obtain the corresponding
   * page.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListGlossaries.
 */
export interface ListGlossariesResponse {
  /**
   * The list of glossaries for a project.
   */
  glossaries?: Glossary[];
  /**
   * A token to retrieve a page of results. Pass this value in the
   * [ListGlossariesRequest.page_token] field in the subsequent call to
   * `ListGlossaries` method to retrieve the next page of results.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListGlossaryEntries
 */
export interface ListGlossaryEntriesResponse {
  /**
   * Optional. The Glossary Entries
   */
  glossaryEntries?: GlossaryEntry[];
  /**
   * Optional. A token to retrieve a page of results. Pass this value in the
   * [ListGLossaryEntriesRequest.page_token] field in the subsequent calls.
   */
  nextPageToken?: string;
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
 * Response message for ListModels.
 */
export interface ListModelsResponse {
  /**
   * The models read.
   */
  models?: Model[];
  /**
   * A token to retrieve next page of results. Pass this token to the
   * page_token field in the ListModelsRequest to obtain the corresponding page.
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
 * A trained translation model.
 */
export interface Model {
  /**
   * Output only. Timestamp when the model resource was created, which is also
   * when the training started.
   */
  readonly createTime?: Date;
  /**
   * The dataset from which the model is trained, in form of
   * `projects/{project-number-or-id}/locations/{location_id}/datasets/{dataset_id}`
   */
  dataset?: string;
  /**
   * Output only. Timestamp when the model training finished and ready to be
   * used for translation.
   */
  readonly deployTime?: Date;
  /**
   * The name of the model to show in the interface. The name can be up to 32
   * characters long and can consist only of ASCII Latin letters A-Z and a-z,
   * underscores (_), and ASCII digits 0-9.
   */
  displayName?: string;
  /**
   * The resource name of the model, in form of
   * `projects/{project-number-or-id}/locations/{location_id}/models/{model_id}`
   */
  name?: string;
  /**
   * Output only. The BCP-47 language code of the source language.
   */
  readonly sourceLanguageCode?: string;
  /**
   * Output only. The BCP-47 language code of the target language.
   */
  readonly targetLanguageCode?: string;
  /**
   * Output only. Number of examples (sentence pairs) used to test the model.
   */
  readonly testExampleCount?: number;
  /**
   * Output only. Number of examples (sentence pairs) used to train the model.
   */
  readonly trainExampleCount?: number;
  /**
   * Output only. Timestamp when this model was last updated.
   */
  readonly updateTime?: Date;
  /**
   * Output only. Number of examples (sentence pairs) used to validate the
   * model.
   */
  readonly validateExampleCount?: number;
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
 * Output configuration for BatchTranslateText request.
 */
export interface OutputConfig {
  /**
   * Google Cloud Storage destination for output content. For every single
   * input file (for example, gs://a/b/c.[extension]), we generate at most 2 * n
   * output files. (n is the # of target_language_codes in the
   * BatchTranslateTextRequest). Output files (tsv) generated are compliant with
   * RFC 4180 except that record delimiters are '\n' instead of '\r\n'. We don't
   * provide any way to change record delimiters. While the input files are
   * being processed, we write/update an index file 'index.csv' under
   * 'output_uri_prefix' (for example, gs://translation-test/index.csv) The
   * index file is generated/updated as new files are being translated. The
   * format is: input_file,target_language_code,translations_file,errors_file,
   * glossary_translations_file,glossary_errors_file input_file is one file we
   * matched using gcs_source.input_uri. target_language_code is provided in the
   * request. translations_file contains the translations. (details provided
   * below) errors_file contains the errors during processing of the file.
   * (details below). Both translations_file and errors_file could be empty
   * strings if we have no content to output. glossary_translations_file and
   * glossary_errors_file are always empty strings if the input_file is tsv.
   * They could also be empty if we have no content to output. Once a row is
   * present in index.csv, the input/output matching never changes. Callers
   * should also expect all the content in input_file are processed and ready to
   * be consumed (that is, no partial output file is written). Since index.csv
   * will be keeping updated during the process, please make sure there is no
   * custom retention policy applied on the output bucket that may avoid file
   * updating.
   * (https://cloud.google.com/storage/docs/bucket-lock#retention-policy) The
   * format of translations_file (for target language code 'trg') is:
   * `gs://translation_test/a_b_c_'trg'_translations.[extension]` If the input
   * file extension is tsv, the output has the following columns: Column 1: ID
   * of the request provided in the input, if it's not provided in the input,
   * then the input row number is used (0-based). Column 2: source sentence.
   * Column 3: translation without applying a glossary. Empty string if there is
   * an error. Column 4 (only present if a glossary is provided in the request):
   * translation after applying the glossary. Empty string if there is an error
   * applying the glossary. Could be same string as column 3 if there is no
   * glossary applied. If input file extension is a txt or html, the translation
   * is directly written to the output file. If glossary is requested, a
   * separate glossary_translations_file has format of
   * gs://translation_test/a_b_c_'trg'_glossary_translations.[extension] The
   * format of errors file (for target language code 'trg') is:
   * gs://translation_test/a_b_c_'trg'_errors.[extension] If the input file
   * extension is tsv, errors_file contains the following: Column 1: ID of the
   * request provided in the input, if it's not provided in the input, then the
   * input row number is used (0-based). Column 2: source sentence. Column 3:
   * Error detail for the translation. Could be empty. Column 4 (only present if
   * a glossary is provided in the request): Error when applying the glossary.
   * If the input file extension is txt or html, glossary_error_file will be
   * generated that contains error details. glossary_error_file has format of
   * gs://translation_test/a_b_c_'trg'_glossary_errors.[extension]
   */
  gcsDestination?: GcsDestination;
}

/**
 * Additional options for translate#projectsGetSupportedLanguages.
 */
export interface ProjectsGetSupportedLanguagesOptions {
  /**
   * Optional. The language to use to return localized, human readable names of
   * supported languages. If missing, then display names are not returned in a
   * response.
   */
  displayLanguageCode?: string;
  /**
   * Optional. Get supported languages of this model. The format depends on
   * model type: - AutoML Translation models:
   * `projects/{project-number-or-id}/locations/{location-id}/models/{model-id}`
   * - General (built-in) models:
   * `projects/{project-number-or-id}/locations/{location-id}/models/general/nmt`,
   * Returns languages supported by the specified model. If missing, we get
   * supported languages of Google general NMT model.
   */
  model?: string;
}

/**
 * Additional options for translate#projectsLocationsDatasetsExamplesList.
 */
export interface ProjectsLocationsDatasetsExamplesListOptions {
  /**
   * Optional. An expression for filtering the examples that will be returned.
   * Example filter: * `usage=TRAIN`
   */
  filter?: string;
  /**
   * Optional. Requested page size. The server can return fewer results than
   * requested.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained from next_page_token field in the response of a
   * ListExamples call.
   */
  pageToken?: string;
}

/**
 * Additional options for translate#projectsLocationsDatasetsList.
 */
export interface ProjectsLocationsDatasetsListOptions {
  /**
   * Optional. Requested page size. The server can return fewer results than
   * requested.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained from next_page_token field in the response of a
   * ListDatasets call.
   */
  pageToken?: string;
}

/**
 * Additional options for translate#projectsLocationsGetSupportedLanguages.
 */
export interface ProjectsLocationsGetSupportedLanguagesOptions {
  /**
   * Optional. The language to use to return localized, human readable names of
   * supported languages. If missing, then display names are not returned in a
   * response.
   */
  displayLanguageCode?: string;
  /**
   * Optional. Get supported languages of this model. The format depends on
   * model type: - AutoML Translation models:
   * `projects/{project-number-or-id}/locations/{location-id}/models/{model-id}`
   * - General (built-in) models:
   * `projects/{project-number-or-id}/locations/{location-id}/models/general/nmt`,
   * Returns languages supported by the specified model. If missing, we get
   * supported languages of Google general NMT model.
   */
  model?: string;
}

/**
 * Additional options for
 * translate#projectsLocationsGlossariesGlossaryEntriesList.
 */
export interface ProjectsLocationsGlossariesGlossaryEntriesListOptions {
  /**
   * Optional. Requested page size. The server may return fewer glossary
   * entries than requested. If unspecified, the server picks an appropriate
   * default.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results the server should return.
   * Typically, this is the value of
   * [ListGlossaryEntriesResponse.next_page_token] returned from the previous
   * call. The first page is returned if `page_token`is empty or missing.
   */
  pageToken?: string;
}

/**
 * Additional options for translate#projectsLocationsGlossariesList.
 */
export interface ProjectsLocationsGlossariesListOptions {
  /**
   * Optional. Filter specifying constraints of a list operation. Specify the
   * constraint by the format of "key=value", where key must be "src" or "tgt",
   * and the value must be a valid language code. For multiple restrictions,
   * concatenate them by "AND" (uppercase only), such as: "src=en-US AND
   * tgt=zh-CN". Notice that the exact match is used here, which means using
   * 'en-US' and 'en' can lead to different results, which depends on the
   * language code you used when you create the glossary. For the unidirectional
   * glossaries, the "src" and "tgt" add restrictions on the source and target
   * language code separately. For the equivalent term set glossaries, the "src"
   * and/or "tgt" add restrictions on the term set. For example: "src=en-US AND
   * tgt=zh-CN" will only pick the unidirectional glossaries which exactly match
   * the source language code as "en-US" and the target language code "zh-CN",
   * but all equivalent term set glossaries which contain "en-US" and "zh-CN" in
   * their language set will be picked. If missing, no filtering is performed.
   */
  filter?: string;
  /**
   * Optional. Requested page size. The server may return fewer glossaries than
   * requested. If unspecified, the server picks an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results the server should return.
   * Typically, this is the value of [ListGlossariesResponse.next_page_token]
   * returned from the previous call to `ListGlossaries` method. The first page
   * is returned if `page_token`is empty or missing.
   */
  pageToken?: string;
}

/**
 * Additional options for translate#projectsLocationsGlossariesPatch.
 */
export interface ProjectsLocationsGlossariesPatchOptions {
  /**
   * The list of fields to be updated. Currently only `display_name` and
   * 'input_config'
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsGlossariesPatchOptions(data: any): ProjectsLocationsGlossariesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsGlossariesPatchOptions(data: any): ProjectsLocationsGlossariesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for translate#projectsLocationsList.
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
 * Additional options for translate#projectsLocationsModelsList.
 */
export interface ProjectsLocationsModelsListOptions {
  /**
   * Optional. An expression for filtering the models that will be returned.
   * Supported filter: `dataset_id=${dataset_id}`
   */
  filter?: string;
  /**
   * Optional. Requested page size. The server can return fewer results than
   * requested.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained from next_page_token field in the response of a
   * ListModels call.
   */
  pageToken?: string;
}

/**
 * Additional options for translate#projectsLocationsOperationsList.
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
 * A single supported language response corresponds to information related to
 * one supported language.
 */
export interface SupportedLanguage {
  /**
   * Human-readable name of the language localized in the display language
   * specified in the request.
   */
  displayName?: string;
  /**
   * Supported language code, generally consisting of its ISO 639-1 identifier,
   * for example, 'en', 'ja'. In certain cases, ISO-639 codes including language
   * and region identifiers are returned (for example, 'zh-TW' and 'zh-CN').
   */
  languageCode?: string;
  /**
   * Can be used as a source language.
   */
  supportSource?: boolean;
  /**
   * Can be used as a target language.
   */
  supportTarget?: boolean;
}

/**
 * The response message for discovering supported languages.
 */
export interface SupportedLanguages {
  /**
   * A list of supported language responses. This list contains an entry for
   * each language the Translation API supports.
   */
  languages?: SupportedLanguage[];
}

/**
 * A document translation request.
 */
export interface TranslateDocumentRequest {
  /**
   * Optional. This flag is to support user customized attribution. If not
   * provided, the default is `Machine Translated by Google`. Customized
   * attribution should follow rules in
   * https://cloud.google.com/translate/attribution#attribution_and_logos
   */
  customizedAttribution?: string;
  /**
   * Required. Input configurations.
   */
  documentInputConfig?: DocumentInputConfig;
  /**
   * Optional. Output configurations. Defines if the output file should be
   * stored within Cloud Storage as well as the desired output format. If not
   * provided the translated file will only be returned through a byte-stream
   * and its output mime type will be the same as the input file's mime type.
   */
  documentOutputConfig?: DocumentOutputConfig;
  /**
   * Optional. If true, use the text removal server to remove the shadow text
   * on background image for native pdf translation. Shadow removal feature can
   * only be enabled when is_translate_native_pdf_only: false &&
   * pdf_native_only: false
   */
  enableShadowRemovalNativePdf?: boolean;
  /**
   * Optional. Glossary to be applied. The glossary must be within the same
   * region (have the same location-id) as the model, otherwise an
   * INVALID_ARGUMENT (400) error is returned.
   */
  glossaryConfig?: TranslateTextGlossaryConfig;
  /**
   * Optional. is_translate_native_pdf_only field for external customers. If
   * true, the page limit of online native pdf translation is 300 and only
   * native pdf pages will be translated.
   */
  isTranslateNativePdfOnly?: boolean;
  /**
   * Optional. The labels with user-defined metadata for the request. Label
   * keys and values can be no longer than 63 characters (Unicode codepoints),
   * can only contain lowercase letters, numeric characters, underscores and
   * dashes. International characters are allowed. Label values are optional.
   * Label keys must start with a letter. See
   * https://cloud.google.com/translate/docs/advanced/labels for more
   * information.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. The `model` type requested for this translation. The format
   * depends on model type: - AutoML Translation models:
   * `projects/{project-number-or-id}/locations/{location-id}/models/{model-id}`
   * - General (built-in) models:
   * `projects/{project-number-or-id}/locations/{location-id}/models/general/nmt`,
   * If not provided, the default Google model (NMT) will be used for
   * translation.
   */
  model?: string;
  /**
   * Optional. The ISO-639 language code of the input document if known, for
   * example, "en-US" or "sr-Latn". Supported language codes are listed in
   * Language Support. If the source language isn't specified, the API attempts
   * to identify the source language automatically and returns the source
   * language within the response. Source language must be specified if the
   * request contains a glossary or a custom model.
   */
  sourceLanguageCode?: string;
  /**
   * Required. The ISO-639 language code to use for translation of the input
   * document, set to one of the language codes listed in Language Support.
   */
  targetLanguageCode?: string;
}

function serializeTranslateDocumentRequest(data: any): TranslateDocumentRequest {
  return {
    ...data,
    documentInputConfig: data["documentInputConfig"] !== undefined ? serializeDocumentInputConfig(data["documentInputConfig"]) : undefined,
  };
}

function deserializeTranslateDocumentRequest(data: any): TranslateDocumentRequest {
  return {
    ...data,
    documentInputConfig: data["documentInputConfig"] !== undefined ? deserializeDocumentInputConfig(data["documentInputConfig"]) : undefined,
  };
}

/**
 * A translated document response message.
 */
export interface TranslateDocumentResponse {
  /**
   * Translated document.
   */
  documentTranslation?: DocumentTranslation;
  /**
   * The `glossary_config` used for this translation.
   */
  glossaryConfig?: TranslateTextGlossaryConfig;
  /**
   * The document's translation output if a glossary is provided in the
   * request. This can be the same as
   * [TranslateDocumentResponse.document_translation] if no glossary terms
   * apply.
   */
  glossaryDocumentTranslation?: DocumentTranslation;
  /**
   * Only present when 'model' is present in the request. 'model' is normalized
   * to have a project number. For example: If the 'model' field in
   * TranslateDocumentRequest is:
   * `projects/{project-id}/locations/{location-id}/models/general/nmt` then
   * `model` here would be normalized to
   * `projects/{project-number}/locations/{location-id}/models/general/nmt`.
   */
  model?: string;
}

function serializeTranslateDocumentResponse(data: any): TranslateDocumentResponse {
  return {
    ...data,
    documentTranslation: data["documentTranslation"] !== undefined ? serializeDocumentTranslation(data["documentTranslation"]) : undefined,
    glossaryDocumentTranslation: data["glossaryDocumentTranslation"] !== undefined ? serializeDocumentTranslation(data["glossaryDocumentTranslation"]) : undefined,
  };
}

function deserializeTranslateDocumentResponse(data: any): TranslateDocumentResponse {
  return {
    ...data,
    documentTranslation: data["documentTranslation"] !== undefined ? deserializeDocumentTranslation(data["documentTranslation"]) : undefined,
    glossaryDocumentTranslation: data["glossaryDocumentTranslation"] !== undefined ? deserializeDocumentTranslation(data["glossaryDocumentTranslation"]) : undefined,
  };
}

/**
 * Configures which glossary is used for a specific target language and defines
 * options for applying that glossary.
 */
export interface TranslateTextGlossaryConfig {
  /**
   * Required. The `glossary` to be applied for this translation. The format
   * depends on the glossary: - User-provided custom glossary:
   * `projects/{project-number-or-id}/locations/{location-id}/glossaries/{glossary-id}`
   */
  glossary?: string;
  /**
   * Optional. Indicates match is case insensitive. The default value is
   * `false` if missing.
   */
  ignoreCase?: boolean;
}

/**
 * The request message for synchronous translation.
 */
export interface TranslateTextRequest {
  /**
   * Required. The content of the input in string format. We recommend the
   * total content be less than 30,000 codepoints. The max length of this field
   * is 1024. Use BatchTranslateText for larger text.
   */
  contents?: string[];
  /**
   * Optional. Glossary to be applied. The glossary must be within the same
   * region (have the same location-id) as the model, otherwise an
   * INVALID_ARGUMENT (400) error is returned.
   */
  glossaryConfig?: TranslateTextGlossaryConfig;
  /**
   * Optional. The labels with user-defined metadata for the request. Label
   * keys and values can be no longer than 63 characters (Unicode codepoints),
   * can only contain lowercase letters, numeric characters, underscores and
   * dashes. International characters are allowed. Label values are optional.
   * Label keys must start with a letter. See
   * https://cloud.google.com/translate/docs/advanced/labels for more
   * information.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Optional. The format of the source text, for example, "text/html",
   * "text/plain". If left blank, the MIME type defaults to "text/html".
   */
  mimeType?: string;
  /**
   * Optional. The `model` type requested for this translation. The format
   * depends on model type: - AutoML Translation models:
   * `projects/{project-number-or-id}/locations/{location-id}/models/{model-id}`
   * - General (built-in) models:
   * `projects/{project-number-or-id}/locations/{location-id}/models/general/nmt`,
   * For global (non-regionalized) requests, use `location-id` `global`. For
   * example,
   * `projects/{project-number-or-id}/locations/global/models/general/nmt`. If
   * not provided, the default Google model (NMT) will be used
   */
  model?: string;
  /**
   * Optional. The ISO-639 language code of the input text if known, for
   * example, "en-US" or "sr-Latn". Supported language codes are listed in
   * Language Support. If the source language isn't specified, the API attempts
   * to identify the source language automatically and returns the source
   * language within the response.
   */
  sourceLanguageCode?: string;
  /**
   * Required. The ISO-639 language code to use for translation of the input
   * text, set to one of the language codes listed in Language Support.
   */
  targetLanguageCode?: string;
}

export interface TranslateTextResponse {
  /**
   * Text translation responses if a glossary is provided in the request. This
   * can be the same as `translations` if no terms apply. This field has the
   * same length as `contents`.
   */
  glossaryTranslations?: Translation[];
  /**
   * Text translation responses with no glossary applied. This field has the
   * same length as `contents`.
   */
  translations?: Translation[];
}

/**
 * A single translation response.
 */
export interface Translation {
  /**
   * The ISO-639 language code of source text in the initial request, detected
   * automatically, if no source language was passed within the initial request.
   * If the source language was passed, auto-detection of the language does not
   * occur and this field is empty.
   */
  detectedLanguageCode?: string;
  /**
   * The `glossary_config` used for this translation.
   */
  glossaryConfig?: TranslateTextGlossaryConfig;
  /**
   * Only present when `model` is present in the request. `model` here is
   * normalized to have project number. For example: If the `model` requested in
   * TranslationTextRequest is
   * `projects/{project-id}/locations/{location-id}/models/general/nmt` then
   * `model` here would be normalized to
   * `projects/{project-number}/locations/{location-id}/models/general/nmt`.
   */
  model?: string;
  /**
   * Text translated into the target language. If an error occurs during
   * translation, this field might be excluded from the response.
   */
  translatedText?: string;
}

/**
 * The request message for Operations.WaitOperation.
 */
export interface WaitOperationRequest {
  /**
   * The maximum duration to wait before timing out. If left blank, the wait
   * will be at most the time permitted by the underlying HTTP/RPC protocol. If
   * RPC context deadline is also specified, the shorter one will be used.
   */
  timeout?: number /* Duration */;
}

function serializeWaitOperationRequest(data: any): WaitOperationRequest {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
}

function deserializeWaitOperationRequest(data: any): WaitOperationRequest {
  return {
    ...data,
    timeout: data["timeout"] !== undefined ? data["timeout"] : undefined,
  };
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
