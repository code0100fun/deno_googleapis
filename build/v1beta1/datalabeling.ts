// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Data Labeling API Client for Deno
 * =================================
 * 
 * Public API for Google Cloud AI Data Labeling Service.
 * 
 * Docs: https://cloud.google.com/data-labeling/docs/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Public API for Google Cloud AI Data Labeling Service.
 */
export class DataLabeling {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://datalabeling.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates an annotation spec set by providing a set of labels.
   *
   * @param parent Required. AnnotationSpecSet resource parent, format: projects/{project_id}
   */
  async projectsAnnotationSpecSetsCreate(parent: string, req: GoogleCloudDatalabelingV1beta1CreateAnnotationSpecSetRequest): Promise<GoogleCloudDatalabelingV1beta1AnnotationSpecSet> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/annotationSpecSets`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleCloudDatalabelingV1beta1AnnotationSpecSet;
  }

  /**
   * Deletes an annotation spec set by resource name.
   *
   * @param name Required. AnnotationSpec resource name, format: `projects/{project_id}/annotationSpecSets/{annotation_spec_set_id}`.
   */
  async projectsAnnotationSpecSetsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an annotation spec set by resource name.
   *
   * @param name Required. AnnotationSpecSet resource name, format: projects/{project_id}/annotationSpecSets/{annotation_spec_set_id}
   */
  async projectsAnnotationSpecSetsGet(name: string): Promise<GoogleCloudDatalabelingV1beta1AnnotationSpecSet> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDatalabelingV1beta1AnnotationSpecSet;
  }

  /**
   * Lists annotation spec sets for a project. Pagination is supported.
   *
   * @param parent Required. Parent of AnnotationSpecSet resource, format: projects/{project_id}
   */
  async projectsAnnotationSpecSetsList(parent: string, opts: ProjectsAnnotationSpecSetsListOptions = {}): Promise<GoogleCloudDatalabelingV1beta1ListAnnotationSpecSetsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/annotationSpecSets`);
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
    return data as GoogleCloudDatalabelingV1beta1ListAnnotationSpecSetsResponse;
  }

  /**
   * Gets a data item in a dataset by resource name. This API can be called
   * after data are imported into dataset.
   *
   * @param name Required. The name of the data item to get, format: projects/{project_id}/datasets/{dataset_id}/dataItems/{data_item_id}
   */
  async projectsDatasetsAnnotatedDatasetsDataItemsGet(name: string): Promise<GoogleCloudDatalabelingV1beta1DataItem> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatalabelingV1beta1DataItem(data);
  }

  /**
   * Lists data items in a dataset. This API can be called after data are
   * imported into dataset. Pagination is supported.
   *
   * @param parent Required. Name of the dataset to list data items, format: projects/{project_id}/datasets/{dataset_id}
   */
  async projectsDatasetsAnnotatedDatasetsDataItemsList(parent: string, opts: ProjectsDatasetsAnnotatedDatasetsDataItemsListOptions = {}): Promise<GoogleCloudDatalabelingV1beta1ListDataItemsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/dataItems`);
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
    return deserializeGoogleCloudDatalabelingV1beta1ListDataItemsResponse(data);
  }

  /**
   * Deletes an annotated dataset by resource name.
   *
   * @param name Required. Name of the annotated dataset to delete, format: projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/ {annotated_dataset_id}
   */
  async projectsDatasetsAnnotatedDatasetsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an example by resource name, including both data and annotation.
   *
   * @param name Required. Name of example, format: projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/ {annotated_dataset_id}/examples/{example_id}
   */
  async projectsDatasetsAnnotatedDatasetsExamplesGet(name: string, opts: ProjectsDatasetsAnnotatedDatasetsExamplesGetOptions = {}): Promise<GoogleCloudDatalabelingV1beta1Example> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatalabelingV1beta1Example(data);
  }

  /**
   * Lists examples in an annotated dataset. Pagination is supported.
   *
   * @param parent Required. Example resource parent.
   */
  async projectsDatasetsAnnotatedDatasetsExamplesList(parent: string, opts: ProjectsDatasetsAnnotatedDatasetsExamplesListOptions = {}): Promise<GoogleCloudDatalabelingV1beta1ListExamplesResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/examples`);
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
    return deserializeGoogleCloudDatalabelingV1beta1ListExamplesResponse(data);
  }

  /**
   * Delete a FeedbackThread.
   *
   * @param name Required. Name of the FeedbackThread that is going to be deleted. Format: 'projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}'.
   */
  async projectsDatasetsAnnotatedDatasetsFeedbackThreadsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Create a FeedbackMessage object.
   *
   * @param parent Required. FeedbackMessage resource parent, format: projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}.
   */
  async projectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesCreate(parent: string, req: GoogleCloudDatalabelingV1beta1FeedbackMessage): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDatalabelingV1beta1FeedbackMessage(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/feedbackMessages`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Delete a FeedbackMessage.
   *
   * @param name Required. Name of the FeedbackMessage that is going to be deleted. Format: 'projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}/feedbackMessages/{feedback_message_id}'.
   */
  async projectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Get a FeedbackMessage object.
   *
   * @param name Required. Name of the feedback. Format: 'projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}/feedbackMessages/{feedback_message_id}'.
   */
  async projectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesGet(name: string): Promise<GoogleCloudDatalabelingV1beta1FeedbackMessage> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatalabelingV1beta1FeedbackMessage(data);
  }

  /**
   * List FeedbackMessages with pagination.
   *
   * @param parent Required. FeedbackMessage resource parent. Format: "projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}"
   */
  async projectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesList(parent: string, opts: ProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesListOptions = {}): Promise<GoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/feedbackMessages`);
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
    return deserializeGoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse(data);
  }

  /**
   * Get a FeedbackThread object.
   *
   * @param name Required. Name of the feedback. Format: 'projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}'.
   */
  async projectsDatasetsAnnotatedDatasetsFeedbackThreadsGet(name: string): Promise<GoogleCloudDatalabelingV1beta1FeedbackThread> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatalabelingV1beta1FeedbackThread(data);
  }

  /**
   * List FeedbackThreads with pagination.
   *
   * @param parent Required. FeedbackThread resource parent. Format: "projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}"
   */
  async projectsDatasetsAnnotatedDatasetsFeedbackThreadsList(parent: string, opts: ProjectsDatasetsAnnotatedDatasetsFeedbackThreadsListOptions = {}): Promise<GoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/feedbackThreads`);
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
    return deserializeGoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse(data);
  }

  /**
   * Gets an annotated dataset by resource name.
   *
   * @param name Required. Name of the annotated dataset to get, format: projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/ {annotated_dataset_id}
   */
  async projectsDatasetsAnnotatedDatasetsGet(name: string): Promise<GoogleCloudDatalabelingV1beta1AnnotatedDataset> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatalabelingV1beta1AnnotatedDataset(data);
  }

  /**
   * Lists annotated datasets for a dataset. Pagination is supported.
   *
   * @param parent Required. Name of the dataset to list annotated datasets, format: projects/{project_id}/datasets/{dataset_id}
   */
  async projectsDatasetsAnnotatedDatasetsList(parent: string, opts: ProjectsDatasetsAnnotatedDatasetsListOptions = {}): Promise<GoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/annotatedDatasets`);
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
    return deserializeGoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse(data);
  }

  /**
   * Creates dataset. If success return a Dataset resource.
   *
   * @param parent Required. Dataset resource parent, format: projects/{project_id}
   */
  async projectsDatasetsCreate(parent: string, req: GoogleCloudDatalabelingV1beta1CreateDatasetRequest): Promise<GoogleCloudDatalabelingV1beta1Dataset> {
    req = serializeGoogleCloudDatalabelingV1beta1CreateDatasetRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/datasets`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDatalabelingV1beta1Dataset(data);
  }

  /**
   * Gets a data item in a dataset by resource name. This API can be called
   * after data are imported into dataset.
   *
   * @param name Required. The name of the data item to get, format: projects/{project_id}/datasets/{dataset_id}/dataItems/{data_item_id}
   */
  async projectsDatasetsDataItemsGet(name: string): Promise<GoogleCloudDatalabelingV1beta1DataItem> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatalabelingV1beta1DataItem(data);
  }

  /**
   * Lists data items in a dataset. This API can be called after data are
   * imported into dataset. Pagination is supported.
   *
   * @param parent Required. Name of the dataset to list data items, format: projects/{project_id}/datasets/{dataset_id}
   */
  async projectsDatasetsDataItemsList(parent: string, opts: ProjectsDatasetsDataItemsListOptions = {}): Promise<GoogleCloudDatalabelingV1beta1ListDataItemsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/dataItems`);
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
    return deserializeGoogleCloudDatalabelingV1beta1ListDataItemsResponse(data);
  }

  /**
   * Deletes a dataset by resource name.
   *
   * @param name Required. Dataset resource name, format: projects/{project_id}/datasets/{dataset_id}
   */
  async projectsDatasetsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Searches example comparisons from an evaluation. The return format is a
   * list of example comparisons that show ground truth and prediction(s) for a
   * single input. Search by providing an evaluation ID.
   *
   * @param parent Required. Name of the Evaluation resource to search for example comparisons from. Format: "projects/{project_id}/datasets/{dataset_id}/evaluations/ {evaluation_id}"
   */
  async projectsDatasetsEvaluationsExampleComparisonsSearch(parent: string, req: GoogleCloudDatalabelingV1beta1SearchExampleComparisonsRequest): Promise<GoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/exampleComparisons:search`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse(data);
  }

  /**
   * Gets an evaluation by resource name (to search, use
   * projects.evaluations.search).
   *
   * @param name Required. Name of the evaluation. Format: "projects/{project_id}/datasets/ {dataset_id}/evaluations/{evaluation_id}'
   */
  async projectsDatasetsEvaluationsGet(name: string): Promise<GoogleCloudDatalabelingV1beta1Evaluation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatalabelingV1beta1Evaluation(data);
  }

  /**
   * Exports data and annotations from dataset.
   *
   * @param name Required. Dataset resource name, format: projects/{project_id}/datasets/{dataset_id}
   */
  async projectsDatasetsExportData(name: string, req: GoogleCloudDatalabelingV1beta1ExportDataRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:exportData`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets dataset by resource name.
   *
   * @param name Required. Dataset resource name, format: projects/{project_id}/datasets/{dataset_id}
   */
  async projectsDatasetsGet(name: string): Promise<GoogleCloudDatalabelingV1beta1Dataset> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatalabelingV1beta1Dataset(data);
  }

  /**
   * Starts a labeling task for image. The type of image labeling task is
   * configured by feature in the request.
   *
   * @param parent Required. Name of the dataset to request labeling task, format: projects/{project_id}/datasets/{dataset_id}
   */
  async projectsDatasetsImageLabel(parent: string, req: GoogleCloudDatalabelingV1beta1LabelImageRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDatalabelingV1beta1LabelImageRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/image:label`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Imports data into dataset based on source locations defined in request. It
   * can be called multiple times for the same dataset. Each dataset can only
   * have one long running operation running on it. For example, no labeling
   * task (also long running operation) can be started while importing is still
   * ongoing. Vice versa.
   *
   * @param name Required. Dataset resource name, format: projects/{project_id}/datasets/{dataset_id}
   */
  async projectsDatasetsImportData(name: string, req: GoogleCloudDatalabelingV1beta1ImportDataRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:importData`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists datasets under a project. Pagination is supported.
   *
   * @param parent Required. Dataset resource parent, format: projects/{project_id}
   */
  async projectsDatasetsList(parent: string, opts: ProjectsDatasetsListOptions = {}): Promise<GoogleCloudDatalabelingV1beta1ListDatasetsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/datasets`);
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
    return deserializeGoogleCloudDatalabelingV1beta1ListDatasetsResponse(data);
  }

  /**
   * Starts a labeling task for text. The type of text labeling task is
   * configured by feature in the request.
   *
   * @param parent Required. Name of the data set to request labeling task, format: projects/{project_id}/datasets/{dataset_id}
   */
  async projectsDatasetsTextLabel(parent: string, req: GoogleCloudDatalabelingV1beta1LabelTextRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDatalabelingV1beta1LabelTextRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/text:label`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Starts a labeling task for video. The type of video labeling task is
   * configured by feature in the request.
   *
   * @param parent Required. Name of the dataset to request labeling task, format: projects/{project_id}/datasets/{dataset_id}
   */
  async projectsDatasetsVideoLabel(parent: string, req: GoogleCloudDatalabelingV1beta1LabelVideoRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDatalabelingV1beta1LabelVideoRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/video:label`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Creates an evaluation job.
   *
   * @param parent Required. Evaluation job resource parent. Format: "projects/{project_id}"
   */
  async projectsEvaluationJobsCreate(parent: string, req: GoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest): Promise<GoogleCloudDatalabelingV1beta1EvaluationJob> {
    req = serializeGoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/evaluationJobs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDatalabelingV1beta1EvaluationJob(data);
  }

  /**
   * Stops and deletes an evaluation job.
   *
   * @param name Required. Name of the evaluation job that is going to be deleted. Format: "projects/{project_id}/evaluationJobs/{evaluation_job_id}"
   */
  async projectsEvaluationJobsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an evaluation job by resource name.
   *
   * @param name Required. Name of the evaluation job. Format: "projects/{project_id} /evaluationJobs/{evaluation_job_id}"
   */
  async projectsEvaluationJobsGet(name: string): Promise<GoogleCloudDatalabelingV1beta1EvaluationJob> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatalabelingV1beta1EvaluationJob(data);
  }

  /**
   * Lists all evaluation jobs within a project with possible filters.
   * Pagination is supported.
   *
   * @param parent Required. Evaluation job resource parent. Format: "projects/{project_id}"
   */
  async projectsEvaluationJobsList(parent: string, opts: ProjectsEvaluationJobsListOptions = {}): Promise<GoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/evaluationJobs`);
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
    return deserializeGoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse(data);
  }

  /**
   * Updates an evaluation job. You can only update certain fields of the job's
   * EvaluationJobConfig: `humanAnnotationConfig.instruction`, `exampleCount`,
   * and `exampleSamplePercentage`. If you want to change any other aspect of
   * the evaluation job, you must delete the job and create a new one.
   *
   * @param name Output only. After you create a job, Data Labeling Service assigns a name to the job with the following format: "projects/{project_id}/evaluationJobs/ {evaluation_job_id}"
   */
  async projectsEvaluationJobsPatch(name: string, req: GoogleCloudDatalabelingV1beta1EvaluationJob, opts: ProjectsEvaluationJobsPatchOptions = {}): Promise<GoogleCloudDatalabelingV1beta1EvaluationJob> {
    req = serializeGoogleCloudDatalabelingV1beta1EvaluationJob(req);
    opts = serializeProjectsEvaluationJobsPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeGoogleCloudDatalabelingV1beta1EvaluationJob(data);
  }

  /**
   * Pauses an evaluation job. Pausing an evaluation job that is already in a
   * `PAUSED` state is a no-op.
   *
   * @param name Required. Name of the evaluation job that is going to be paused. Format: "projects/{project_id}/evaluationJobs/{evaluation_job_id}"
   */
  async projectsEvaluationJobsPause(name: string, req: GoogleCloudDatalabelingV1beta1PauseEvaluationJobRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:pause`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Resumes a paused evaluation job. A deleted evaluation job can't be
   * resumed. Resuming a running or scheduled evaluation job is a no-op.
   *
   * @param name Required. Name of the evaluation job that is going to be resumed. Format: "projects/{project_id}/evaluationJobs/{evaluation_job_id}"
   */
  async projectsEvaluationJobsResume(name: string, req: GoogleCloudDatalabelingV1beta1ResumeEvaluationJobRequest): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:resume`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Searches evaluations within a project.
   *
   * @param parent Required. Evaluation search parent (project ID). Format: "projects/ {project_id}"
   */
  async projectsEvaluationsSearch(parent: string, opts: ProjectsEvaluationsSearchOptions = {}): Promise<GoogleCloudDatalabelingV1beta1SearchEvaluationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/evaluations:search`);
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
    return deserializeGoogleCloudDatalabelingV1beta1SearchEvaluationsResponse(data);
  }

  /**
   * Creates an instruction for how data should be labeled.
   *
   * @param parent Required. Instruction resource parent, format: projects/{project_id}
   */
  async projectsInstructionsCreate(parent: string, req: GoogleCloudDatalabelingV1beta1CreateInstructionRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDatalabelingV1beta1CreateInstructionRequest(req);
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/instructions`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes an instruction object by resource name.
   *
   * @param name Required. Instruction resource name, format: projects/{project_id}/instructions/{instruction_id}
   */
  async projectsInstructionsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Gets an instruction by resource name.
   *
   * @param name Required. Instruction resource name, format: projects/{project_id}/instructions/{instruction_id}
   */
  async projectsInstructionsGet(name: string): Promise<GoogleCloudDatalabelingV1beta1Instruction> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDatalabelingV1beta1Instruction(data);
  }

  /**
   * Lists instructions for a project. Pagination is supported.
   *
   * @param parent Required. Instruction resource parent, format: projects/{project_id}
   */
  async projectsInstructionsList(parent: string, opts: ProjectsInstructionsListOptions = {}): Promise<GoogleCloudDatalabelingV1beta1ListInstructionsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ parent }/instructions`);
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
    return deserializeGoogleCloudDatalabelingV1beta1ListInstructionsResponse(data);
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
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }:cancel`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
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
  async projectsOperationsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
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
  async projectsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
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
  async projectsOperationsList(name: string, opts: ProjectsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1beta1/${ name }/operations`);
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
 * Metadata of a CreateInstruction operation.
 */
export interface GoogleCloudDatalabelingV1alpha1CreateInstructionMetadata {
  /**
   * Timestamp when create instruction request was created.
   */
  createTime?: Date;
  /**
   * The name of the created Instruction.
   * projects/{project_id}/instructions/{instruction_id}
   */
  instruction?: string;
  /**
   * Partial failures encountered. E.g. single files that couldn't be read.
   * Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDatalabelingV1alpha1CreateInstructionMetadata(data: any): GoogleCloudDatalabelingV1alpha1CreateInstructionMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1CreateInstructionMetadata(data: any): GoogleCloudDatalabelingV1alpha1CreateInstructionMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata of an ExportData operation.
 */
export interface GoogleCloudDatalabelingV1alpha1ExportDataOperationMetadata {
  /**
   * Output only. The name of annotated dataset in format
   * "projects/*\/datasets/*\/annotatedDatasets/*".
   */
  annotatedDataset?: string;
  /**
   * Output only. Timestamp when export dataset request was created.
   */
  createTime?: Date;
  /**
   * Output only. The name of dataset to be exported. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Output only. Partial failures encountered. E.g. single files that couldn't
   * be read. Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDatalabelingV1alpha1ExportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1ExportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1ExportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1ExportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Response used for ExportDataset longrunning operation.
 */
export interface GoogleCloudDatalabelingV1alpha1ExportDataOperationResponse {
  /**
   * Output only. The name of annotated dataset in format
   * "projects/*\/datasets/*\/annotatedDatasets/*".
   */
  annotatedDataset?: string;
  /**
   * Ouptut only. The name of dataset. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Output only. Number of examples exported successfully.
   */
  exportCount?: number;
  /**
   * Output only. Statistic infos of labels in the exported dataset.
   */
  labelStats?: GoogleCloudDatalabelingV1alpha1LabelStats;
  /**
   * Output only. output_config in the ExportData request.
   */
  outputConfig?: GoogleCloudDatalabelingV1alpha1OutputConfig;
  /**
   * Output only. Total number of examples requested to export
   */
  totalCount?: number;
}

function serializeGoogleCloudDatalabelingV1alpha1ExportDataOperationResponse(data: any): GoogleCloudDatalabelingV1alpha1ExportDataOperationResponse {
  return {
    ...data,
    labelStats: data["labelStats"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1LabelStats(data["labelStats"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1ExportDataOperationResponse(data: any): GoogleCloudDatalabelingV1alpha1ExportDataOperationResponse {
  return {
    ...data,
    labelStats: data["labelStats"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1LabelStats(data["labelStats"]) : undefined,
  };
}

/**
 * Export destination of the data.Only gcs path is allowed in output_uri.
 */
export interface GoogleCloudDatalabelingV1alpha1GcsDestination {
  /**
   * Required. The format of the gcs destination. Only "text/csv" and
   * "application/json" are supported.
   */
  mimeType?: string;
  /**
   * Required. The output uri of destination file.
   */
  outputUri?: string;
}

/**
 * Export folder destination of the data.
 */
export interface GoogleCloudDatalabelingV1alpha1GcsFolderDestination {
  /**
   * Required. Cloud Storage directory to export data to.
   */
  outputFolderUri?: string;
}

/**
 * Configuration for how human labeling task should be done.
 */
export interface GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig {
  /**
   * Optional. A human-readable description for AnnotatedDataset. The
   * description can be up to 10000 characters long.
   */
  annotatedDatasetDescription?: string;
  /**
   * Required. A human-readable name for AnnotatedDataset defined by users.
   * Maximum of 64 characters .
   */
  annotatedDatasetDisplayName?: string;
  /**
   * Optional. If you want your own labeling contributors to manage and work on
   * this labeling request, you can set these contributors here. We will give
   * them access to the question types in crowdcompute. Note that these emails
   * must be registered in crowdcompute worker UI:
   * https://crowd-compute.appspot.com/
   */
  contributorEmails?: string[];
  /**
   * Required. Instruction resource name.
   */
  instruction?: string;
  /**
   * Optional. A human-readable label used to logically group labeling tasks.
   * This string must match the regular expression `[a-zA-Z\\d_-]{0,128}`.
   */
  labelGroup?: string;
  /**
   * Optional. The Language of this question, as a
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is
   * en-US. Only need to set this when task is language related. For example,
   * French text classification.
   */
  languageCode?: string;
  /**
   * Optional. Maximum duration for contributors to answer a question. Maximum
   * is 3600 seconds. Default is 3600 seconds.
   */
  questionDuration?: number /* Duration */;
  /**
   * Optional. Replication of questions. Each question will be sent to up to
   * this number of contributors to label. Aggregated answers will be returned.
   * Default is set to 1. For image related labeling, valid values are 1, 3, 5.
   */
  replicaCount?: number;
  /**
   * Email of the user who started the labeling task and should be notified by
   * email. If empty no notification will be sent.
   */
  userEmailAddress?: string;
}

function serializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data: any): GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig {
  return {
    ...data,
    questionDuration: data["questionDuration"] !== undefined ? data["questionDuration"] : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data: any): GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig {
  return {
    ...data,
    questionDuration: data["questionDuration"] !== undefined ? data["questionDuration"] : undefined,
  };
}

/**
 * Metadata of an ImportData operation.
 */
export interface GoogleCloudDatalabelingV1alpha1ImportDataOperationMetadata {
  /**
   * Output only. Timestamp when import dataset request was created.
   */
  createTime?: Date;
  /**
   * Output only. The name of imported dataset. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Output only. Partial failures encountered. E.g. single files that couldn't
   * be read. Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDatalabelingV1alpha1ImportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1ImportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1ImportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1ImportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Response used for ImportData longrunning operation.
 */
export interface GoogleCloudDatalabelingV1alpha1ImportDataOperationResponse {
  /**
   * Ouptut only. The name of imported dataset.
   */
  dataset?: string;
  /**
   * Output only. Number of examples imported successfully.
   */
  importCount?: number;
  /**
   * Output only. Total number of examples requested to import
   */
  totalCount?: number;
}

/**
 * Details of a LabelImageBoundingBox operation metadata.
 */
export interface GoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of LabelImageBoundingPoly operation metadata.
 */
export interface GoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Metadata of a LabelImageClassification operation.
 */
export interface GoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelImageOrientedBoundingBox operation metadata.
 */
export interface GoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata {
  /**
   * Basic human annotation config.
   */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of LabelImagePolyline operation metadata.
 */
export interface GoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelImageSegmentation operation metadata.
 */
export interface GoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata {
  /**
   * Basic human annotation config.
   */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Metadata of a labeling operation, such as LabelImage or LabelVideo. Next
 * tag: 23
 */
export interface GoogleCloudDatalabelingV1alpha1LabelOperationMetadata {
  /**
   * Output only. The name of annotated dataset in format
   * "projects/*\/datasets/*\/annotatedDatasets/*".
   */
  annotatedDataset?: string;
  /**
   * Output only. Timestamp when labeling request was created.
   */
  createTime?: Date;
  /**
   * Output only. The name of dataset to be labeled. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Details of label image bounding box operation.
   */
  imageBoundingBoxDetails?: GoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata;
  /**
   * Details of label image bounding poly operation.
   */
  imageBoundingPolyDetails?: GoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata;
  /**
   * Details of label image classification operation.
   */
  imageClassificationDetails?: GoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata;
  /**
   * Details of label image oriented bounding box operation.
   */
  imageOrientedBoundingBoxDetails?: GoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata;
  /**
   * Details of label image polyline operation.
   */
  imagePolylineDetails?: GoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata;
  /**
   * Details of label image segmentation operation.
   */
  imageSegmentationDetails?: GoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata;
  /**
   * Output only. Partial failures encountered. E.g. single files that couldn't
   * be read. Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
  /**
   * Output only. Progress of label operation. Range: [0, 100].
   */
  progressPercent?: number;
  /**
   * Details of label text classification operation.
   */
  textClassificationDetails?: GoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata;
  /**
   * Details of label text entity extraction operation.
   */
  textEntityExtractionDetails?: GoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata;
  /**
   * Details of label video classification operation.
   */
  videoClassificationDetails?: GoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata;
  /**
   * Details of label video event operation.
   */
  videoEventDetails?: GoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata;
  /**
   * Details of label video object detection operation.
   */
  videoObjectDetectionDetails?: GoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata;
  /**
   * Details of label video object tracking operation.
   */
  videoObjectTrackingDetails?: GoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata;
}

function serializeGoogleCloudDatalabelingV1alpha1LabelOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    imageBoundingBoxDetails: data["imageBoundingBoxDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata(data["imageBoundingBoxDetails"]) : undefined,
    imageBoundingPolyDetails: data["imageBoundingPolyDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata(data["imageBoundingPolyDetails"]) : undefined,
    imageClassificationDetails: data["imageClassificationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata(data["imageClassificationDetails"]) : undefined,
    imageOrientedBoundingBoxDetails: data["imageOrientedBoundingBoxDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata(data["imageOrientedBoundingBoxDetails"]) : undefined,
    imagePolylineDetails: data["imagePolylineDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata(data["imagePolylineDetails"]) : undefined,
    imageSegmentationDetails: data["imageSegmentationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata(data["imageSegmentationDetails"]) : undefined,
    textClassificationDetails: data["textClassificationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata(data["textClassificationDetails"]) : undefined,
    textEntityExtractionDetails: data["textEntityExtractionDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata(data["textEntityExtractionDetails"]) : undefined,
    videoClassificationDetails: data["videoClassificationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata(data["videoClassificationDetails"]) : undefined,
    videoEventDetails: data["videoEventDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata(data["videoEventDetails"]) : undefined,
    videoObjectDetectionDetails: data["videoObjectDetectionDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata(data["videoObjectDetectionDetails"]) : undefined,
    videoObjectTrackingDetails: data["videoObjectTrackingDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata(data["videoObjectTrackingDetails"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    imageBoundingBoxDetails: data["imageBoundingBoxDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1LabelImageBoundingBoxOperationMetadata(data["imageBoundingBoxDetails"]) : undefined,
    imageBoundingPolyDetails: data["imageBoundingPolyDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1LabelImageBoundingPolyOperationMetadata(data["imageBoundingPolyDetails"]) : undefined,
    imageClassificationDetails: data["imageClassificationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1LabelImageClassificationOperationMetadata(data["imageClassificationDetails"]) : undefined,
    imageOrientedBoundingBoxDetails: data["imageOrientedBoundingBoxDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1LabelImageOrientedBoundingBoxOperationMetadata(data["imageOrientedBoundingBoxDetails"]) : undefined,
    imagePolylineDetails: data["imagePolylineDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1LabelImagePolylineOperationMetadata(data["imagePolylineDetails"]) : undefined,
    imageSegmentationDetails: data["imageSegmentationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1LabelImageSegmentationOperationMetadata(data["imageSegmentationDetails"]) : undefined,
    textClassificationDetails: data["textClassificationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata(data["textClassificationDetails"]) : undefined,
    textEntityExtractionDetails: data["textEntityExtractionDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata(data["textEntityExtractionDetails"]) : undefined,
    videoClassificationDetails: data["videoClassificationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata(data["videoClassificationDetails"]) : undefined,
    videoEventDetails: data["videoEventDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata(data["videoEventDetails"]) : undefined,
    videoObjectDetectionDetails: data["videoObjectDetectionDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata(data["videoObjectDetectionDetails"]) : undefined,
    videoObjectTrackingDetails: data["videoObjectTrackingDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata(data["videoObjectTrackingDetails"]) : undefined,
  };
}

/**
 * Statistics about annotation specs.
 */
export interface GoogleCloudDatalabelingV1alpha1LabelStats {
  /**
   * Map of each annotation spec's example count. Key is the annotation spec
   * name and value is the number of examples for that annotation spec. If the
   * annotated dataset does not have annotation spec, the map will return a pair
   * where the key is empty string and value is the total number of annotations.
   */
  exampleCount?: {
    [key: string]: bigint
  };
}

function serializeGoogleCloudDatalabelingV1alpha1LabelStats(data: any): GoogleCloudDatalabelingV1alpha1LabelStats {
  return {
    ...data,
    exampleCount: data["exampleCount"] !== undefined ? Object.fromEntries(Object.entries(data["exampleCount"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelStats(data: any): GoogleCloudDatalabelingV1alpha1LabelStats {
  return {
    ...data,
    exampleCount: data["exampleCount"] !== undefined ? Object.fromEntries(Object.entries(data["exampleCount"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
  };
}

/**
 * Details of a LabelTextClassification operation metadata.
 */
export interface GoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelTextClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelTextEntityExtraction operation metadata.
 */
export interface GoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelTextEntityExtractionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoClassification operation metadata.
 */
export interface GoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelVideoClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoEvent operation metadata.
 */
export interface GoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelVideoEventOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoObjectDetection operation metadata.
 */
export interface GoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelVideoObjectDetectionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoObjectTracking operation metadata.
 */
export interface GoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata(data: any): GoogleCloudDatalabelingV1alpha1LabelVideoObjectTrackingOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * The configuration of output data.
 */
export interface GoogleCloudDatalabelingV1alpha1OutputConfig {
  /**
   * Output to a file in Cloud Storage. Should be used for labeling output
   * other than image segmentation.
   */
  gcsDestination?: GoogleCloudDatalabelingV1alpha1GcsDestination;
  /**
   * Output to a folder in Cloud Storage. Should be used for image segmentation
   * or document de-identification labeling outputs.
   */
  gcsFolderDestination?: GoogleCloudDatalabelingV1alpha1GcsFolderDestination;
}

/**
 * AnnotatedDataset is a set holding annotations for data in a Dataset. Each
 * labeling task will generate an AnnotatedDataset under the Dataset that the
 * task is requested for.
 */
export interface GoogleCloudDatalabelingV1beta1AnnotatedDataset {
  /**
   * Output only. Source of the annotation.
   */
  annotationSource?:  | "ANNOTATION_SOURCE_UNSPECIFIED" | "OPERATOR";
  /**
   * Output only. Type of the annotation. It is specified when starting
   * labeling task.
   */
  annotationType?:  | "ANNOTATION_TYPE_UNSPECIFIED" | "IMAGE_CLASSIFICATION_ANNOTATION" | "IMAGE_BOUNDING_BOX_ANNOTATION" | "IMAGE_ORIENTED_BOUNDING_BOX_ANNOTATION" | "IMAGE_BOUNDING_POLY_ANNOTATION" | "IMAGE_POLYLINE_ANNOTATION" | "IMAGE_SEGMENTATION_ANNOTATION" | "VIDEO_SHOTS_CLASSIFICATION_ANNOTATION" | "VIDEO_OBJECT_TRACKING_ANNOTATION" | "VIDEO_OBJECT_DETECTION_ANNOTATION" | "VIDEO_EVENT_ANNOTATION" | "TEXT_CLASSIFICATION_ANNOTATION" | "TEXT_ENTITY_EXTRACTION_ANNOTATION" | "GENERAL_CLASSIFICATION_ANNOTATION";
  /**
   * Output only. The names of any related resources that are blocking changes
   * to the annotated dataset.
   */
  blockingResources?: string[];
  /**
   * Output only. Number of examples that have annotation in the annotated
   * dataset.
   */
  completedExampleCount?: bigint;
  /**
   * Output only. Time the AnnotatedDataset was created.
   */
  createTime?: Date;
  /**
   * Output only. The description of the AnnotatedDataset. It is specified in
   * HumanAnnotationConfig when user starts a labeling task. Maximum of 10000
   * characters.
   */
  description?: string;
  /**
   * Output only. The display name of the AnnotatedDataset. It is specified in
   * HumanAnnotationConfig when user starts a labeling task. Maximum of 64
   * characters.
   */
  displayName?: string;
  /**
   * Output only. Number of examples in the annotated dataset.
   */
  exampleCount?: bigint;
  /**
   * Output only. Per label statistics.
   */
  labelStats?: GoogleCloudDatalabelingV1beta1LabelStats;
  /**
   * Output only. Additional information about AnnotatedDataset.
   */
  metadata?: GoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata;
  /**
   * Output only. AnnotatedDataset resource name in format of:
   * projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/
   * {annotated_dataset_id}
   */
  name?: string;
}

function serializeGoogleCloudDatalabelingV1beta1AnnotatedDataset(data: any): GoogleCloudDatalabelingV1beta1AnnotatedDataset {
  return {
    ...data,
    completedExampleCount: data["completedExampleCount"] !== undefined ? String(data["completedExampleCount"]) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    exampleCount: data["exampleCount"] !== undefined ? String(data["exampleCount"]) : undefined,
    labelStats: data["labelStats"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelStats(data["labelStats"]) : undefined,
    metadata: data["metadata"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata(data["metadata"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1AnnotatedDataset(data: any): GoogleCloudDatalabelingV1beta1AnnotatedDataset {
  return {
    ...data,
    completedExampleCount: data["completedExampleCount"] !== undefined ? BigInt(data["completedExampleCount"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    exampleCount: data["exampleCount"] !== undefined ? BigInt(data["exampleCount"]) : undefined,
    labelStats: data["labelStats"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelStats(data["labelStats"]) : undefined,
    metadata: data["metadata"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata(data["metadata"]) : undefined,
  };
}

/**
 * Metadata on AnnotatedDataset.
 */
export interface GoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata {
  /**
   * Configuration for image bounding box and bounding poly task.
   */
  boundingPolyConfig?: GoogleCloudDatalabelingV1beta1BoundingPolyConfig;
  /**
   * Configuration for video event labeling task.
   */
  eventConfig?: GoogleCloudDatalabelingV1beta1EventConfig;
  /**
   * HumanAnnotationConfig used when requesting the human labeling task for
   * this AnnotatedDataset.
   */
  humanAnnotationConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
  /**
   * Configuration for image classification task.
   */
  imageClassificationConfig?: GoogleCloudDatalabelingV1beta1ImageClassificationConfig;
  /**
   * Configuration for video object detection task.
   */
  objectDetectionConfig?: GoogleCloudDatalabelingV1beta1ObjectDetectionConfig;
  /**
   * Configuration for video object tracking task.
   */
  objectTrackingConfig?: GoogleCloudDatalabelingV1beta1ObjectTrackingConfig;
  /**
   * Configuration for image polyline task.
   */
  polylineConfig?: GoogleCloudDatalabelingV1beta1PolylineConfig;
  /**
   * Configuration for image segmentation task.
   */
  segmentationConfig?: GoogleCloudDatalabelingV1beta1SegmentationConfig;
  /**
   * Configuration for text classification task.
   */
  textClassificationConfig?: GoogleCloudDatalabelingV1beta1TextClassificationConfig;
  /**
   * Configuration for text entity extraction task.
   */
  textEntityExtractionConfig?: GoogleCloudDatalabelingV1beta1TextEntityExtractionConfig;
  /**
   * Configuration for video classification task.
   */
  videoClassificationConfig?: GoogleCloudDatalabelingV1beta1VideoClassificationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata(data: any): GoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata {
  return {
    ...data,
    humanAnnotationConfig: data["humanAnnotationConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["humanAnnotationConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata(data: any): GoogleCloudDatalabelingV1beta1AnnotatedDatasetMetadata {
  return {
    ...data,
    humanAnnotationConfig: data["humanAnnotationConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["humanAnnotationConfig"]) : undefined,
  };
}

/**
 * Annotation for Example. Each example may have one or more annotations. For
 * example in image classification problem, each image might have one or more
 * labels. We call labels binded with this image an Annotation.
 */
export interface GoogleCloudDatalabelingV1beta1Annotation {
  /**
   * Output only. Annotation metadata, including information like votes for
   * labels.
   */
  annotationMetadata?: GoogleCloudDatalabelingV1beta1AnnotationMetadata;
  /**
   * Output only. Sentiment for this annotation.
   */
  annotationSentiment?:  | "ANNOTATION_SENTIMENT_UNSPECIFIED" | "NEGATIVE" | "POSITIVE";
  /**
   * Output only. The source of the annotation.
   */
  annotationSource?:  | "ANNOTATION_SOURCE_UNSPECIFIED" | "OPERATOR";
  /**
   * Output only. This is the actual annotation value, e.g classification,
   * bounding box values are stored here.
   */
  annotationValue?: GoogleCloudDatalabelingV1beta1AnnotationValue;
  /**
   * Output only. Unique name of this annotation, format is:
   * projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset}/examples/{example_id}/annotations/{annotation_id}
   */
  name?: string;
}

function serializeGoogleCloudDatalabelingV1beta1Annotation(data: any): GoogleCloudDatalabelingV1beta1Annotation {
  return {
    ...data,
    annotationValue: data["annotationValue"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1AnnotationValue(data["annotationValue"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1Annotation(data: any): GoogleCloudDatalabelingV1beta1Annotation {
  return {
    ...data,
    annotationValue: data["annotationValue"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1AnnotationValue(data["annotationValue"]) : undefined,
  };
}

/**
 * Additional information associated with the annotation.
 */
export interface GoogleCloudDatalabelingV1beta1AnnotationMetadata {
  /**
   * Metadata related to human labeling.
   */
  operatorMetadata?: GoogleCloudDatalabelingV1beta1OperatorMetadata;
}

/**
 * Container of information related to one possible annotation that can be used
 * in a labeling task. For example, an image classification task where images
 * are labeled as `dog` or `cat` must reference an AnnotationSpec for `dog` and
 * an AnnotationSpec for `cat`.
 */
export interface GoogleCloudDatalabelingV1beta1AnnotationSpec {
  /**
   * Optional. User-provided description of the annotation specification. The
   * description can be up to 10,000 characters long.
   */
  description?: string;
  /**
   * Required. The display name of the AnnotationSpec. Maximum of 64
   * characters.
   */
  displayName?: string;
  /**
   * Output only. This is the integer index of the AnnotationSpec. The index
   * for the whole AnnotationSpecSet is sequential starting from 0. For example,
   * an AnnotationSpecSet with classes `dog` and `cat`, might contain one
   * AnnotationSpec with `{ display_name: "dog", index: 0 }` and one
   * AnnotationSpec with `{ display_name: "cat", index: 1 }`. This is especially
   * useful for model training as it encodes the string labels into numeric
   * values.
   */
  index?: number;
}

/**
 * An AnnotationSpecSet is a collection of label definitions. For example, in
 * image classification tasks, you define a set of possible labels for images as
 * an AnnotationSpecSet. An AnnotationSpecSet is immutable upon creation.
 */
export interface GoogleCloudDatalabelingV1beta1AnnotationSpecSet {
  /**
   * Required. The array of AnnotationSpecs that you define when you create the
   * AnnotationSpecSet. These are the possible labels for the labeling task.
   */
  annotationSpecs?: GoogleCloudDatalabelingV1beta1AnnotationSpec[];
  /**
   * Output only. The names of any related resources that are blocking changes
   * to the annotation spec set.
   */
  blockingResources?: string[];
  /**
   * Optional. User-provided description of the annotation specification set.
   * The description can be up to 10,000 characters long.
   */
  description?: string;
  /**
   * Required. The display name for AnnotationSpecSet that you define when you
   * create it. Maximum of 64 characters.
   */
  displayName?: string;
  /**
   * Output only. The AnnotationSpecSet resource name in the following format:
   * "projects/{project_id}/annotationSpecSets/{annotation_spec_set_id}"
   */
  name?: string;
}

/**
 * Annotation spec set with the setting of allowing multi labels or not.
 */
export interface GoogleCloudDatalabelingV1beta1AnnotationSpecSetConfig {
  /**
   * Optional. If allow_multi_label is true, contributors are able to choose
   * multiple labels from one annotation spec set.
   */
  allowMultiLabel?: boolean;
  /**
   * Required. Annotation spec set resource name.
   */
  annotationSpecSet?: string;
}

/**
 * Annotation value for an example.
 */
export interface GoogleCloudDatalabelingV1beta1AnnotationValue {
  /**
   * Annotation value for image bounding box, oriented bounding box and polygon
   * cases.
   */
  imageBoundingPolyAnnotation?: GoogleCloudDatalabelingV1beta1ImageBoundingPolyAnnotation;
  /**
   * Annotation value for image classification case.
   */
  imageClassificationAnnotation?: GoogleCloudDatalabelingV1beta1ImageClassificationAnnotation;
  /**
   * Annotation value for image polyline cases. Polyline here is different from
   * BoundingPoly. It is formed by line segments connected to each other but not
   * closed form(Bounding Poly). The line segments can cross each other.
   */
  imagePolylineAnnotation?: GoogleCloudDatalabelingV1beta1ImagePolylineAnnotation;
  /**
   * Annotation value for image segmentation.
   */
  imageSegmentationAnnotation?: GoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation;
  /**
   * Annotation value for text classification case.
   */
  textClassificationAnnotation?: GoogleCloudDatalabelingV1beta1TextClassificationAnnotation;
  /**
   * Annotation value for text entity extraction case.
   */
  textEntityExtractionAnnotation?: GoogleCloudDatalabelingV1beta1TextEntityExtractionAnnotation;
  /**
   * Annotation value for video classification case.
   */
  videoClassificationAnnotation?: GoogleCloudDatalabelingV1beta1VideoClassificationAnnotation;
  /**
   * Annotation value for video event case.
   */
  videoEventAnnotation?: GoogleCloudDatalabelingV1beta1VideoEventAnnotation;
  /**
   * Annotation value for video object detection and tracking case.
   */
  videoObjectTrackingAnnotation?: GoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation;
}

function serializeGoogleCloudDatalabelingV1beta1AnnotationValue(data: any): GoogleCloudDatalabelingV1beta1AnnotationValue {
  return {
    ...data,
    imageSegmentationAnnotation: data["imageSegmentationAnnotation"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation(data["imageSegmentationAnnotation"]) : undefined,
    videoClassificationAnnotation: data["videoClassificationAnnotation"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1VideoClassificationAnnotation(data["videoClassificationAnnotation"]) : undefined,
    videoEventAnnotation: data["videoEventAnnotation"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1VideoEventAnnotation(data["videoEventAnnotation"]) : undefined,
    videoObjectTrackingAnnotation: data["videoObjectTrackingAnnotation"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation(data["videoObjectTrackingAnnotation"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1AnnotationValue(data: any): GoogleCloudDatalabelingV1beta1AnnotationValue {
  return {
    ...data,
    imageSegmentationAnnotation: data["imageSegmentationAnnotation"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation(data["imageSegmentationAnnotation"]) : undefined,
    videoClassificationAnnotation: data["videoClassificationAnnotation"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1VideoClassificationAnnotation(data["videoClassificationAnnotation"]) : undefined,
    videoEventAnnotation: data["videoEventAnnotation"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1VideoEventAnnotation(data["videoEventAnnotation"]) : undefined,
    videoObjectTrackingAnnotation: data["videoObjectTrackingAnnotation"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation(data["videoObjectTrackingAnnotation"]) : undefined,
  };
}

/**
 * Records a failed evaluation job run.
 */
export interface GoogleCloudDatalabelingV1beta1Attempt {
  attemptTime?: Date;
  /**
   * Details of errors that occurred.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDatalabelingV1beta1Attempt(data: any): GoogleCloudDatalabelingV1beta1Attempt {
  return {
    ...data,
    attemptTime: data["attemptTime"] !== undefined ? data["attemptTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1Attempt(data: any): GoogleCloudDatalabelingV1beta1Attempt {
  return {
    ...data,
    attemptTime: data["attemptTime"] !== undefined ? new Date(data["attemptTime"]) : undefined,
  };
}

/**
 * The BigQuery location for input data. If used in an EvaluationJob, this is
 * where the service saves the prediction input and output sampled from the
 * model version.
 */
export interface GoogleCloudDatalabelingV1beta1BigQuerySource {
  /**
   * Required. BigQuery URI to a table, up to 2,000 characters long. If you
   * specify the URI of a table that does not exist, Data Labeling Service
   * creates a table at the URI with the correct schema when you create your
   * EvaluationJob. If you specify the URI of a table that already exists, it
   * must have the [correct
   * schema](/ml-engine/docs/continuous-evaluation/create-job#table-schema).
   * Provide the table URI in the following format: "bq://{your_project_id}/
   * {your_dataset_name}/{your_table_name}" [Learn
   * more](/ml-engine/docs/continuous-evaluation/create-job#table-schema).
   */
  inputUri?: string;
}

/**
 * Options regarding evaluation between bounding boxes.
 */
export interface GoogleCloudDatalabelingV1beta1BoundingBoxEvaluationOptions {
  /**
   * Minimum [intersection-over-union
   * (IOU)](/vision/automl/object-detection/docs/evaluate#intersection-over-union)
   * required for 2 bounding boxes to be considered a match. This must be a
   * number between 0 and 1.
   */
  iouThreshold?: number;
}

/**
 * A bounding polygon in the image.
 */
export interface GoogleCloudDatalabelingV1beta1BoundingPoly {
  /**
   * The bounding polygon vertices.
   */
  vertices?: GoogleCloudDatalabelingV1beta1Vertex[];
}

/**
 * Config for image bounding poly (and bounding box) human labeling task.
 */
export interface GoogleCloudDatalabelingV1beta1BoundingPolyConfig {
  /**
   * Required. Annotation spec set resource name.
   */
  annotationSpecSet?: string;
  /**
   * Optional. Instruction message showed on contributors UI.
   */
  instructionMessage?: string;
}

/**
 * Metadata for classification annotations.
 */
export interface GoogleCloudDatalabelingV1beta1ClassificationMetadata {
  /**
   * Whether the classification task is multi-label or not.
   */
  isMultiLabel?: boolean;
}

/**
 * Metrics calculated for a classification model.
 */
export interface GoogleCloudDatalabelingV1beta1ClassificationMetrics {
  /**
   * Confusion matrix of predicted labels vs. ground truth labels.
   */
  confusionMatrix?: GoogleCloudDatalabelingV1beta1ConfusionMatrix;
  /**
   * Precision-recall curve based on ground truth labels, predicted labels, and
   * scores for the predicted labels.
   */
  prCurve?: GoogleCloudDatalabelingV1beta1PrCurve;
}

export interface GoogleCloudDatalabelingV1beta1ConfidenceMetricsEntry {
  /**
   * Threshold used for this entry. For classification tasks, this is a
   * classification threshold: a predicted label is categorized as positive or
   * negative (in the context of this point on the PR curve) based on whether
   * the label's score meets this threshold. For image object detection
   * (bounding box) tasks, this is the [intersection-over-union
   * (IOU)](/vision/automl/object-detection/docs/evaluate#intersection-over-union)
   * threshold for the context of this point on the PR curve.
   */
  confidenceThreshold?: number;
  /**
   * Harmonic mean of recall and precision.
   */
  f1Score?: number;
  /**
   * The harmonic mean of recall_at1 and precision_at1.
   */
  f1ScoreAt1?: number;
  /**
   * The harmonic mean of recall_at5 and precision_at5.
   */
  f1ScoreAt5?: number;
  /**
   * Precision value.
   */
  precision?: number;
  /**
   * Precision value for entries with label that has highest score.
   */
  precisionAt1?: number;
  /**
   * Precision value for entries with label that has highest 5 scores.
   */
  precisionAt5?: number;
  /**
   * Recall value.
   */
  recall?: number;
  /**
   * Recall value for entries with label that has highest score.
   */
  recallAt1?: number;
  /**
   * Recall value for entries with label that has highest 5 scores.
   */
  recallAt5?: number;
}

/**
 * Confusion matrix of the model running the classification. Only applicable
 * when the metrics entry aggregates multiple labels. Not applicable when the
 * entry is for a single label.
 */
export interface GoogleCloudDatalabelingV1beta1ConfusionMatrix {
  row?: GoogleCloudDatalabelingV1beta1Row[];
}

export interface GoogleCloudDatalabelingV1beta1ConfusionMatrixEntry {
  /**
   * The annotation spec of a predicted label.
   */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
  /**
   * Number of items predicted to have this label. (The ground truth label for
   * these items is the `Row.annotationSpec` of this entry's parent.)
   */
  itemCount?: number;
}

/**
 * Request message for CreateAnnotationSpecSet.
 */
export interface GoogleCloudDatalabelingV1beta1CreateAnnotationSpecSetRequest {
  /**
   * Required. Annotation spec set to create. Annotation specs must be
   * included. Only one annotation spec will be accepted for annotation specs
   * with same display_name.
   */
  annotationSpecSet?: GoogleCloudDatalabelingV1beta1AnnotationSpecSet;
}

/**
 * Request message for CreateDataset.
 */
export interface GoogleCloudDatalabelingV1beta1CreateDatasetRequest {
  /**
   * Required. The dataset to be created.
   */
  dataset?: GoogleCloudDatalabelingV1beta1Dataset;
}

function serializeGoogleCloudDatalabelingV1beta1CreateDatasetRequest(data: any): GoogleCloudDatalabelingV1beta1CreateDatasetRequest {
  return {
    ...data,
    dataset: data["dataset"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1Dataset(data["dataset"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1CreateDatasetRequest(data: any): GoogleCloudDatalabelingV1beta1CreateDatasetRequest {
  return {
    ...data,
    dataset: data["dataset"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1Dataset(data["dataset"]) : undefined,
  };
}

/**
 * Request message for CreateEvaluationJob.
 */
export interface GoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest {
  /**
   * Required. The evaluation job to create.
   */
  job?: GoogleCloudDatalabelingV1beta1EvaluationJob;
}

function serializeGoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest(data: any): GoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest {
  return {
    ...data,
    job: data["job"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1EvaluationJob(data["job"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest(data: any): GoogleCloudDatalabelingV1beta1CreateEvaluationJobRequest {
  return {
    ...data,
    job: data["job"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1EvaluationJob(data["job"]) : undefined,
  };
}

/**
 * Metadata of a CreateInstruction operation.
 */
export interface GoogleCloudDatalabelingV1beta1CreateInstructionMetadata {
  /**
   * Timestamp when create instruction request was created.
   */
  createTime?: Date;
  /**
   * The name of the created Instruction.
   * projects/{project_id}/instructions/{instruction_id}
   */
  instruction?: string;
  /**
   * Partial failures encountered. E.g. single files that couldn't be read.
   * Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDatalabelingV1beta1CreateInstructionMetadata(data: any): GoogleCloudDatalabelingV1beta1CreateInstructionMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1CreateInstructionMetadata(data: any): GoogleCloudDatalabelingV1beta1CreateInstructionMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Request message for CreateInstruction.
 */
export interface GoogleCloudDatalabelingV1beta1CreateInstructionRequest {
  /**
   * Required. Instruction of how to perform the labeling task.
   */
  instruction?: GoogleCloudDatalabelingV1beta1Instruction;
}

function serializeGoogleCloudDatalabelingV1beta1CreateInstructionRequest(data: any): GoogleCloudDatalabelingV1beta1CreateInstructionRequest {
  return {
    ...data,
    instruction: data["instruction"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1Instruction(data["instruction"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1CreateInstructionRequest(data: any): GoogleCloudDatalabelingV1beta1CreateInstructionRequest {
  return {
    ...data,
    instruction: data["instruction"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1Instruction(data["instruction"]) : undefined,
  };
}

/**
 * Deprecated: this instruction format is not supported any more. Instruction
 * from a CSV file.
 */
export interface GoogleCloudDatalabelingV1beta1CsvInstruction {
  /**
   * CSV file for the instruction. Only gcs path is allowed.
   */
  gcsFileUri?: string;
}

/**
 * DataItem is a piece of data, without annotation. For example, an image.
 */
export interface GoogleCloudDatalabelingV1beta1DataItem {
  /**
   * The image payload, a container of the image bytes/uri.
   */
  imagePayload?: GoogleCloudDatalabelingV1beta1ImagePayload;
  /**
   * Output only. Name of the data item, in format of:
   * projects/{project_id}/datasets/{dataset_id}/dataItems/{data_item_id}
   */
  name?: string;
  /**
   * The text payload, a container of text content.
   */
  textPayload?: GoogleCloudDatalabelingV1beta1TextPayload;
  /**
   * The video payload, a container of the video uri.
   */
  videoPayload?: GoogleCloudDatalabelingV1beta1VideoPayload;
}

function serializeGoogleCloudDatalabelingV1beta1DataItem(data: any): GoogleCloudDatalabelingV1beta1DataItem {
  return {
    ...data,
    imagePayload: data["imagePayload"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1ImagePayload(data["imagePayload"]) : undefined,
    videoPayload: data["videoPayload"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1VideoPayload(data["videoPayload"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1DataItem(data: any): GoogleCloudDatalabelingV1beta1DataItem {
  return {
    ...data,
    imagePayload: data["imagePayload"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1ImagePayload(data["imagePayload"]) : undefined,
    videoPayload: data["videoPayload"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1VideoPayload(data["videoPayload"]) : undefined,
  };
}

/**
 * Dataset is the resource to hold your data. You can request multiple labeling
 * tasks for a dataset while each one will generate an AnnotatedDataset.
 */
export interface GoogleCloudDatalabelingV1beta1Dataset {
  /**
   * Output only. The names of any related resources that are blocking changes
   * to the dataset.
   */
  blockingResources?: string[];
  /**
   * Output only. Time the dataset is created.
   */
  createTime?: Date;
  /**
   * Output only. The number of data items in the dataset.
   */
  dataItemCount?: bigint;
  /**
   * Optional. User-provided description of the annotation specification set.
   * The description can be up to 10000 characters long.
   */
  description?: string;
  /**
   * Required. The display name of the dataset. Maximum of 64 characters.
   */
  displayName?: string;
  /**
   * Output only. This is populated with the original input configs where
   * ImportData is called. It is available only after the clients import data to
   * this dataset.
   */
  inputConfigs?: GoogleCloudDatalabelingV1beta1InputConfig[];
  /**
   * Last time that the Dataset is migrated to AI Platform V2. If any of the
   * AnnotatedDataset is migrated, the last_migration_time in Dataset is also
   * updated.
   */
  lastMigrateTime?: Date;
  /**
   * Output only. Dataset resource name, format is:
   * projects/{project_id}/datasets/{dataset_id}
   */
  name?: string;
}

function serializeGoogleCloudDatalabelingV1beta1Dataset(data: any): GoogleCloudDatalabelingV1beta1Dataset {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    dataItemCount: data["dataItemCount"] !== undefined ? String(data["dataItemCount"]) : undefined,
    lastMigrateTime: data["lastMigrateTime"] !== undefined ? data["lastMigrateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1Dataset(data: any): GoogleCloudDatalabelingV1beta1Dataset {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    dataItemCount: data["dataItemCount"] !== undefined ? BigInt(data["dataItemCount"]) : undefined,
    lastMigrateTime: data["lastMigrateTime"] !== undefined ? new Date(data["lastMigrateTime"]) : undefined,
  };
}

/**
 * Describes an evaluation between a machine learning model's predictions and
 * ground truth labels. Created when an EvaluationJob runs successfully.
 */
export interface GoogleCloudDatalabelingV1beta1Evaluation {
  /**
   * Output only. Type of task that the model version being evaluated performs,
   * as defined in the evaluationJobConfig.inputConfig.annotationType field of
   * the evaluation job that created this evaluation.
   */
  annotationType?:  | "ANNOTATION_TYPE_UNSPECIFIED" | "IMAGE_CLASSIFICATION_ANNOTATION" | "IMAGE_BOUNDING_BOX_ANNOTATION" | "IMAGE_ORIENTED_BOUNDING_BOX_ANNOTATION" | "IMAGE_BOUNDING_POLY_ANNOTATION" | "IMAGE_POLYLINE_ANNOTATION" | "IMAGE_SEGMENTATION_ANNOTATION" | "VIDEO_SHOTS_CLASSIFICATION_ANNOTATION" | "VIDEO_OBJECT_TRACKING_ANNOTATION" | "VIDEO_OBJECT_DETECTION_ANNOTATION" | "VIDEO_EVENT_ANNOTATION" | "TEXT_CLASSIFICATION_ANNOTATION" | "TEXT_ENTITY_EXTRACTION_ANNOTATION" | "GENERAL_CLASSIFICATION_ANNOTATION";
  /**
   * Output only. Options used in the evaluation job that created this
   * evaluation.
   */
  config?: GoogleCloudDatalabelingV1beta1EvaluationConfig;
  /**
   * Output only. Timestamp for when this evaluation was created.
   */
  createTime?: Date;
  /**
   * Output only. The number of items in the ground truth dataset that were
   * used for this evaluation. Only populated when the evaulation is for certain
   * AnnotationTypes.
   */
  evaluatedItemCount?: bigint;
  /**
   * Output only. Timestamp for when the evaluation job that created this
   * evaluation ran.
   */
  evaluationJobRunTime?: Date;
  /**
   * Output only. Metrics comparing predictions to ground truth labels.
   */
  evaluationMetrics?: GoogleCloudDatalabelingV1beta1EvaluationMetrics;
  /**
   * Output only. Resource name of an evaluation. The name has the following
   * format: "projects/{project_id}/datasets/{dataset_id}/evaluations/
   * {evaluation_id}'
   */
  name?: string;
}

function serializeGoogleCloudDatalabelingV1beta1Evaluation(data: any): GoogleCloudDatalabelingV1beta1Evaluation {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    evaluatedItemCount: data["evaluatedItemCount"] !== undefined ? String(data["evaluatedItemCount"]) : undefined,
    evaluationJobRunTime: data["evaluationJobRunTime"] !== undefined ? data["evaluationJobRunTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1Evaluation(data: any): GoogleCloudDatalabelingV1beta1Evaluation {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    evaluatedItemCount: data["evaluatedItemCount"] !== undefined ? BigInt(data["evaluatedItemCount"]) : undefined,
    evaluationJobRunTime: data["evaluationJobRunTime"] !== undefined ? new Date(data["evaluationJobRunTime"]) : undefined,
  };
}

/**
 * Configuration details used for calculating evaluation metrics and creating
 * an Evaluation.
 */
export interface GoogleCloudDatalabelingV1beta1EvaluationConfig {
  /**
   * Only specify this field if the related model performs image object
   * detection (`IMAGE_BOUNDING_BOX_ANNOTATION`). Describes how to evaluate
   * bounding boxes.
   */
  boundingBoxEvaluationOptions?: GoogleCloudDatalabelingV1beta1BoundingBoxEvaluationOptions;
}

/**
 * Defines an evaluation job that runs periodically to generate Evaluations.
 * [Creating an evaluation
 * job](/ml-engine/docs/continuous-evaluation/create-job) is the starting point
 * for using continuous evaluation.
 */
export interface GoogleCloudDatalabelingV1beta1EvaluationJob {
  /**
   * Required. Name of the AnnotationSpecSet describing all the labels that
   * your machine learning model outputs. You must create this resource before
   * you create an evaluation job and provide its name in the following format:
   * "projects/{project_id}/annotationSpecSets/{annotation_spec_set_id}"
   */
  annotationSpecSet?: string;
  /**
   * Output only. Every time the evaluation job runs and an error occurs, the
   * failed attempt is appended to this array.
   */
  attempts?: GoogleCloudDatalabelingV1beta1Attempt[];
  /**
   * Output only. Timestamp of when this evaluation job was created.
   */
  createTime?: Date;
  /**
   * Required. Description of the job. The description can be up to 25,000
   * characters long.
   */
  description?: string;
  /**
   * Required. Configuration details for the evaluation job.
   */
  evaluationJobConfig?: GoogleCloudDatalabelingV1beta1EvaluationJobConfig;
  /**
   * Required. Whether you want Data Labeling Service to provide ground truth
   * labels for prediction input. If you want the service to assign human
   * labelers to annotate your data, set this to `true`. If you want to provide
   * your own ground truth labels in the evaluation job's BigQuery table, set
   * this to `false`.
   */
  labelMissingGroundTruth?: boolean;
  /**
   * Required. The [AI Platform Prediction model
   * version](/ml-engine/docs/prediction-overview) to be evaluated. Prediction
   * input and output is sampled from this model version. When creating an
   * evaluation job, specify the model version in the following format:
   * "projects/{project_id}/models/{model_name}/versions/{version_name}" There
   * can only be one evaluation job per model version.
   */
  modelVersion?: string;
  /**
   * Output only. After you create a job, Data Labeling Service assigns a name
   * to the job with the following format:
   * "projects/{project_id}/evaluationJobs/ {evaluation_job_id}"
   */
  name?: string;
  /**
   * Required. Describes the interval at which the job runs. This interval must
   * be at least 1 day, and it is rounded to the nearest day. For example, if
   * you specify a 50-hour interval, the job runs every 2 days. You can provide
   * the schedule in [crontab
   * format](/scheduler/docs/configuring/cron-job-schedules) or in an
   * [English-like
   * format](/appengine/docs/standard/python/config/cronref#schedule_format).
   * Regardless of what you specify, the job will run at 10:00 AM UTC. Only the
   * interval from this schedule is used, not the specific time of day.
   */
  schedule?: string;
  /**
   * Output only. Describes the current state of the job.
   */
  state?:  | "STATE_UNSPECIFIED" | "SCHEDULED" | "RUNNING" | "PAUSED" | "STOPPED";
}

function serializeGoogleCloudDatalabelingV1beta1EvaluationJob(data: any): GoogleCloudDatalabelingV1beta1EvaluationJob {
  return {
    ...data,
    attempts: data["attempts"] !== undefined ? data["attempts"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1Attempt(item))) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    evaluationJobConfig: data["evaluationJobConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1EvaluationJobConfig(data["evaluationJobConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1EvaluationJob(data: any): GoogleCloudDatalabelingV1beta1EvaluationJob {
  return {
    ...data,
    attempts: data["attempts"] !== undefined ? data["attempts"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1Attempt(item))) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    evaluationJobConfig: data["evaluationJobConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1EvaluationJobConfig(data["evaluationJobConfig"]) : undefined,
  };
}

/**
 * Provides details for how an evaluation job sends email alerts based on the
 * results of a run.
 */
export interface GoogleCloudDatalabelingV1beta1EvaluationJobAlertConfig {
  /**
   * Required. An email address to send alerts to.
   */
  email?: string;
  /**
   * Required. A number between 0 and 1 that describes a minimum mean average
   * precision threshold. When the evaluation job runs, if it calculates that
   * your model version's predictions from the recent interval have
   * meanAveragePrecision below this threshold, then it sends an alert to your
   * specified email.
   */
  minAcceptableMeanAveragePrecision?: number;
}

/**
 * Configures specific details of how a continuous evaluation job works.
 * Provide this configuration when you create an EvaluationJob.
 */
export interface GoogleCloudDatalabelingV1beta1EvaluationJobConfig {
  /**
   * Required. Prediction keys that tell Data Labeling Service where to find
   * the data for evaluation in your BigQuery table. When the service samples
   * prediction input and output from your model version and saves it to
   * BigQuery, the data gets stored as JSON strings in the BigQuery table. These
   * keys tell Data Labeling Service how to parse the JSON. You can provide the
   * following entries in this field: * `data_json_key`: the data key for
   * prediction input. You must provide either this key or `reference_json_key`.
   * * `reference_json_key`: the data reference key for prediction input. You
   * must provide either this key or `data_json_key`. * `label_json_key`: the
   * label key for prediction output. Required. * `label_score_json_key`: the
   * score key for prediction output. Required. * `bounding_box_json_key`: the
   * bounding box key for prediction output. Required if your model version
   * perform image object detection. Learn [how to configure prediction
   * keys](/ml-engine/docs/continuous-evaluation/create-job#prediction-keys).
   */
  bigqueryImportKeys?: {
    [key: string]: string
  };
  /**
   * Specify this field if your model version performs image object detection
   * (bounding box detection). `annotationSpecSet` in this configuration must
   * match EvaluationJob.annotationSpecSet.
   */
  boundingPolyConfig?: GoogleCloudDatalabelingV1beta1BoundingPolyConfig;
  /**
   * Required. Details for calculating evaluation metrics and creating
   * Evaulations. If your model version performs image object detection, you
   * must specify the `boundingBoxEvaluationOptions` field within this
   * configuration. Otherwise, provide an empty object for this configuration.
   */
  evaluationConfig?: GoogleCloudDatalabelingV1beta1EvaluationConfig;
  /**
   * Optional. Configuration details for evaluation job alerts. Specify this
   * field if you want to receive email alerts if the evaluation job finds that
   * your predictions have low mean average precision during a run.
   */
  evaluationJobAlertConfig?: GoogleCloudDatalabelingV1beta1EvaluationJobAlertConfig;
  /**
   * Required. The maximum number of predictions to sample and save to BigQuery
   * during each evaluation interval. This limit overrides
   * `example_sample_percentage`: even if the service has not sampled enough
   * predictions to fulfill `example_sample_perecentage` during an interval, it
   * stops sampling predictions when it meets this limit.
   */
  exampleCount?: number;
  /**
   * Required. Fraction of predictions to sample and save to BigQuery during
   * each evaluation interval. For example, 0.1 means 10% of predictions served
   * by your model version get saved to BigQuery.
   */
  exampleSamplePercentage?: number;
  /**
   * Optional. Details for human annotation of your data. If you set
   * labelMissingGroundTruth to `true` for this evaluation job, then you must
   * specify this field. If you plan to provide your own ground truth labels,
   * then omit this field. Note that you must create an Instruction resource
   * before you can specify this field. Provide the name of the instruction
   * resource in the `instruction` field within this configuration.
   */
  humanAnnotationConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
  /**
   * Specify this field if your model version performs image classification or
   * general classification. `annotationSpecSet` in this configuration must
   * match EvaluationJob.annotationSpecSet. `allowMultiLabel` in this
   * configuration must match `classificationMetadata.isMultiLabel` in
   * input_config.
   */
  imageClassificationConfig?: GoogleCloudDatalabelingV1beta1ImageClassificationConfig;
  /**
   * Rquired. Details for the sampled prediction input. Within this
   * configuration, there are requirements for several fields: * `dataType` must
   * be one of `IMAGE`, `TEXT`, or `GENERAL_DATA`. * `annotationType` must be
   * one of `IMAGE_CLASSIFICATION_ANNOTATION`, `TEXT_CLASSIFICATION_ANNOTATION`,
   * `GENERAL_CLASSIFICATION_ANNOTATION`, or `IMAGE_BOUNDING_BOX_ANNOTATION`
   * (image object detection). * If your machine learning model performs
   * classification, you must specify `classificationMetadata.isMultiLabel`. *
   * You must specify `bigquerySource` (not `gcsSource`).
   */
  inputConfig?: GoogleCloudDatalabelingV1beta1InputConfig;
  /**
   * Specify this field if your model version performs text classification.
   * `annotationSpecSet` in this configuration must match
   * EvaluationJob.annotationSpecSet. `allowMultiLabel` in this configuration
   * must match `classificationMetadata.isMultiLabel` in input_config.
   */
  textClassificationConfig?: GoogleCloudDatalabelingV1beta1TextClassificationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1EvaluationJobConfig(data: any): GoogleCloudDatalabelingV1beta1EvaluationJobConfig {
  return {
    ...data,
    humanAnnotationConfig: data["humanAnnotationConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["humanAnnotationConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1EvaluationJobConfig(data: any): GoogleCloudDatalabelingV1beta1EvaluationJobConfig {
  return {
    ...data,
    humanAnnotationConfig: data["humanAnnotationConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["humanAnnotationConfig"]) : undefined,
  };
}

export interface GoogleCloudDatalabelingV1beta1EvaluationMetrics {
  classificationMetrics?: GoogleCloudDatalabelingV1beta1ClassificationMetrics;
  objectDetectionMetrics?: GoogleCloudDatalabelingV1beta1ObjectDetectionMetrics;
}

/**
 * Config for video event human labeling task.
 */
export interface GoogleCloudDatalabelingV1beta1EventConfig {
  /**
   * Required. The list of annotation spec set resource name. Similar to video
   * classification, we support selecting event from multiple AnnotationSpecSet
   * at the same time.
   */
  annotationSpecSets?: string[];
  /**
   * Videos will be cut to smaller clips to make it easier for labelers to work
   * on. Users can configure is field in seconds, if not set, default value is
   * 60s.
   */
  clipLength?: number;
  /**
   * The overlap length between different video clips. Users can configure is
   * field in seconds, if not set, default value is 1s.
   */
  overlapLength?: number;
}

/**
 * An Example is a piece of data and its annotation. For example, an image with
 * label "house".
 */
export interface GoogleCloudDatalabelingV1beta1Example {
  /**
   * Output only. Annotations for the piece of data in Example. One piece of
   * data can have multiple annotations.
   */
  annotations?: GoogleCloudDatalabelingV1beta1Annotation[];
  /**
   * The image payload, a container of the image bytes/uri.
   */
  imagePayload?: GoogleCloudDatalabelingV1beta1ImagePayload;
  /**
   * Output only. Name of the example, in format of:
   * projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/
   * {annotated_dataset_id}/examples/{example_id}
   */
  name?: string;
  /**
   * The text payload, a container of the text content.
   */
  textPayload?: GoogleCloudDatalabelingV1beta1TextPayload;
  /**
   * The video payload, a container of the video uri.
   */
  videoPayload?: GoogleCloudDatalabelingV1beta1VideoPayload;
}

function serializeGoogleCloudDatalabelingV1beta1Example(data: any): GoogleCloudDatalabelingV1beta1Example {
  return {
    ...data,
    annotations: data["annotations"] !== undefined ? data["annotations"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1Annotation(item))) : undefined,
    imagePayload: data["imagePayload"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1ImagePayload(data["imagePayload"]) : undefined,
    videoPayload: data["videoPayload"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1VideoPayload(data["videoPayload"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1Example(data: any): GoogleCloudDatalabelingV1beta1Example {
  return {
    ...data,
    annotations: data["annotations"] !== undefined ? data["annotations"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1Annotation(item))) : undefined,
    imagePayload: data["imagePayload"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1ImagePayload(data["imagePayload"]) : undefined,
    videoPayload: data["videoPayload"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1VideoPayload(data["videoPayload"]) : undefined,
  };
}

/**
 * Example comparisons comparing ground truth output and predictions for a
 * specific input.
 */
export interface GoogleCloudDatalabelingV1beta1ExampleComparison {
  /**
   * The ground truth output for the input.
   */
  groundTruthExample?: GoogleCloudDatalabelingV1beta1Example;
  /**
   * Predictions by the model for the input.
   */
  modelCreatedExamples?: GoogleCloudDatalabelingV1beta1Example[];
}

function serializeGoogleCloudDatalabelingV1beta1ExampleComparison(data: any): GoogleCloudDatalabelingV1beta1ExampleComparison {
  return {
    ...data,
    groundTruthExample: data["groundTruthExample"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1Example(data["groundTruthExample"]) : undefined,
    modelCreatedExamples: data["modelCreatedExamples"] !== undefined ? data["modelCreatedExamples"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1Example(item))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ExampleComparison(data: any): GoogleCloudDatalabelingV1beta1ExampleComparison {
  return {
    ...data,
    groundTruthExample: data["groundTruthExample"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1Example(data["groundTruthExample"]) : undefined,
    modelCreatedExamples: data["modelCreatedExamples"] !== undefined ? data["modelCreatedExamples"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1Example(item))) : undefined,
  };
}

/**
 * Metadata of an ExportData operation.
 */
export interface GoogleCloudDatalabelingV1beta1ExportDataOperationMetadata {
  /**
   * Output only. The name of annotated dataset in format
   * "projects/*\/datasets/*\/annotatedDatasets/*".
   */
  annotatedDataset?: string;
  /**
   * Output only. Timestamp when export dataset request was created.
   */
  createTime?: Date;
  /**
   * Output only. The name of dataset to be exported. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Output only. Partial failures encountered. E.g. single files that couldn't
   * be read. Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDatalabelingV1beta1ExportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1ExportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ExportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1ExportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Response used for ExportDataset longrunning operation.
 */
export interface GoogleCloudDatalabelingV1beta1ExportDataOperationResponse {
  /**
   * Output only. The name of annotated dataset in format
   * "projects/*\/datasets/*\/annotatedDatasets/*".
   */
  annotatedDataset?: string;
  /**
   * Ouptut only. The name of dataset. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Output only. Number of examples exported successfully.
   */
  exportCount?: number;
  /**
   * Output only. Statistic infos of labels in the exported dataset.
   */
  labelStats?: GoogleCloudDatalabelingV1beta1LabelStats;
  /**
   * Output only. output_config in the ExportData request.
   */
  outputConfig?: GoogleCloudDatalabelingV1beta1OutputConfig;
  /**
   * Output only. Total number of examples requested to export
   */
  totalCount?: number;
}

function serializeGoogleCloudDatalabelingV1beta1ExportDataOperationResponse(data: any): GoogleCloudDatalabelingV1beta1ExportDataOperationResponse {
  return {
    ...data,
    labelStats: data["labelStats"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelStats(data["labelStats"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ExportDataOperationResponse(data: any): GoogleCloudDatalabelingV1beta1ExportDataOperationResponse {
  return {
    ...data,
    labelStats: data["labelStats"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelStats(data["labelStats"]) : undefined,
  };
}

/**
 * Request message for ExportData API.
 */
export interface GoogleCloudDatalabelingV1beta1ExportDataRequest {
  /**
   * Required. Annotated dataset resource name. DataItem in Dataset and their
   * annotations in specified annotated dataset will be exported. It's in format
   * of projects/{project_id}/datasets/{dataset_id}/annotatedDatasets/
   * {annotated_dataset_id}
   */
  annotatedDataset?: string;
  /**
   * Optional. Filter is not supported at this moment.
   */
  filter?: string;
  /**
   * Required. Specify the output destination.
   */
  outputConfig?: GoogleCloudDatalabelingV1beta1OutputConfig;
  /**
   * Email of the user who started the export task and should be notified by
   * email. If empty no notification will be sent.
   */
  userEmailAddress?: string;
}

/**
 * A feedback message inside a feedback thread.
 */
export interface GoogleCloudDatalabelingV1beta1FeedbackMessage {
  /**
   * String content of the feedback. Maximum of 10000 characters.
   */
  body?: string;
  /**
   * Create time.
   */
  createTime?: Date;
  /**
   * The image storing this feedback if the feedback is an image representing
   * operator's comments.
   */
  image?: Uint8Array;
  /**
   * Name of the feedback message in a feedback thread. Format:
   * 'project/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}/feedbackMessage/{feedback_message_id}'
   */
  name?: string;
  operatorFeedbackMetadata?: GoogleCloudDatalabelingV1beta1OperatorFeedbackMetadata;
  requesterFeedbackMetadata?: GoogleCloudDatalabelingV1beta1RequesterFeedbackMetadata;
}

function serializeGoogleCloudDatalabelingV1beta1FeedbackMessage(data: any): GoogleCloudDatalabelingV1beta1FeedbackMessage {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    image: data["image"] !== undefined ? encodeBase64(data["image"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1FeedbackMessage(data: any): GoogleCloudDatalabelingV1beta1FeedbackMessage {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    image: data["image"] !== undefined ? decodeBase64(data["image"] as string) : undefined,
  };
}

/**
 * A feedback thread of a certain labeling task on a certain annotated dataset.
 */
export interface GoogleCloudDatalabelingV1beta1FeedbackThread {
  /**
   * Metadata regarding the feedback thread.
   */
  feedbackThreadMetadata?: GoogleCloudDatalabelingV1beta1FeedbackThreadMetadata;
  /**
   * Name of the feedback thread. Format:
   * 'project/{project_id}/datasets/{dataset_id}/annotatedDatasets/{annotated_dataset_id}/feedbackThreads/{feedback_thread_id}'
   */
  name?: string;
}

function serializeGoogleCloudDatalabelingV1beta1FeedbackThread(data: any): GoogleCloudDatalabelingV1beta1FeedbackThread {
  return {
    ...data,
    feedbackThreadMetadata: data["feedbackThreadMetadata"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1FeedbackThreadMetadata(data["feedbackThreadMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1FeedbackThread(data: any): GoogleCloudDatalabelingV1beta1FeedbackThread {
  return {
    ...data,
    feedbackThreadMetadata: data["feedbackThreadMetadata"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1FeedbackThreadMetadata(data["feedbackThreadMetadata"]) : undefined,
  };
}

export interface GoogleCloudDatalabelingV1beta1FeedbackThreadMetadata {
  /**
   * When the thread is created
   */
  createTime?: Date;
  /**
   * When the thread is last updated.
   */
  lastUpdateTime?: Date;
  status?:  | "FEEDBACK_THREAD_STATUS_UNSPECIFIED" | "NEW" | "REPLIED";
  /**
   * An image thumbnail of this thread.
   */
  thumbnail?: Uint8Array;
}

function serializeGoogleCloudDatalabelingV1beta1FeedbackThreadMetadata(data: any): GoogleCloudDatalabelingV1beta1FeedbackThreadMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? data["lastUpdateTime"].toISOString() : undefined,
    thumbnail: data["thumbnail"] !== undefined ? encodeBase64(data["thumbnail"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1FeedbackThreadMetadata(data: any): GoogleCloudDatalabelingV1beta1FeedbackThreadMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? new Date(data["lastUpdateTime"]) : undefined,
    thumbnail: data["thumbnail"] !== undefined ? decodeBase64(data["thumbnail"] as string) : undefined,
  };
}

/**
 * Export destination of the data.Only gcs path is allowed in output_uri.
 */
export interface GoogleCloudDatalabelingV1beta1GcsDestination {
  /**
   * Required. The format of the gcs destination. Only "text/csv" and
   * "application/json" are supported.
   */
  mimeType?: string;
  /**
   * Required. The output uri of destination file.
   */
  outputUri?: string;
}

/**
 * Export folder destination of the data.
 */
export interface GoogleCloudDatalabelingV1beta1GcsFolderDestination {
  /**
   * Required. Cloud Storage directory to export data to.
   */
  outputFolderUri?: string;
}

/**
 * Source of the Cloud Storage file to be imported.
 */
export interface GoogleCloudDatalabelingV1beta1GcsSource {
  /**
   * Required. The input URI of source file. This must be a Cloud Storage path
   * (`gs://...`).
   */
  inputUri?: string;
  /**
   * Required. The format of the source file. Only "text/csv" is supported.
   */
  mimeType?: string;
}

/**
 * Configuration for how human labeling task should be done.
 */
export interface GoogleCloudDatalabelingV1beta1HumanAnnotationConfig {
  /**
   * Optional. A human-readable description for AnnotatedDataset. The
   * description can be up to 10000 characters long.
   */
  annotatedDatasetDescription?: string;
  /**
   * Required. A human-readable name for AnnotatedDataset defined by users.
   * Maximum of 64 characters .
   */
  annotatedDatasetDisplayName?: string;
  /**
   * Optional. If you want your own labeling contributors to manage and work on
   * this labeling request, you can set these contributors here. We will give
   * them access to the question types in crowdcompute. Note that these emails
   * must be registered in crowdcompute worker UI:
   * https://crowd-compute.appspot.com/
   */
  contributorEmails?: string[];
  /**
   * Required. Instruction resource name.
   */
  instruction?: string;
  /**
   * Optional. A human-readable label used to logically group labeling tasks.
   * This string must match the regular expression `[a-zA-Z\\d_-]{0,128}`.
   */
  labelGroup?: string;
  /**
   * Optional. The Language of this question, as a
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is
   * en-US. Only need to set this when task is language related. For example,
   * French text classification.
   */
  languageCode?: string;
  /**
   * Optional. Maximum duration for contributors to answer a question. Maximum
   * is 3600 seconds. Default is 3600 seconds.
   */
  questionDuration?: number /* Duration */;
  /**
   * Optional. Replication of questions. Each question will be sent to up to
   * this number of contributors to label. Aggregated answers will be returned.
   * Default is set to 1. For image related labeling, valid values are 1, 3, 5.
   */
  replicaCount?: number;
  /**
   * Email of the user who started the labeling task and should be notified by
   * email. If empty no notification will be sent.
   */
  userEmailAddress?: string;
}

function serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data: any): GoogleCloudDatalabelingV1beta1HumanAnnotationConfig {
  return {
    ...data,
    questionDuration: data["questionDuration"] !== undefined ? data["questionDuration"] : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data: any): GoogleCloudDatalabelingV1beta1HumanAnnotationConfig {
  return {
    ...data,
    questionDuration: data["questionDuration"] !== undefined ? data["questionDuration"] : undefined,
  };
}

/**
 * Image bounding poly annotation. It represents a polygon including bounding
 * box in the image.
 */
export interface GoogleCloudDatalabelingV1beta1ImageBoundingPolyAnnotation {
  /**
   * Label of object in this bounding polygon.
   */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
  boundingPoly?: GoogleCloudDatalabelingV1beta1BoundingPoly;
  normalizedBoundingPoly?: GoogleCloudDatalabelingV1beta1NormalizedBoundingPoly;
}

/**
 * Image classification annotation definition.
 */
export interface GoogleCloudDatalabelingV1beta1ImageClassificationAnnotation {
  /**
   * Label of image.
   */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
}

/**
 * Config for image classification human labeling task.
 */
export interface GoogleCloudDatalabelingV1beta1ImageClassificationConfig {
  /**
   * Optional. If allow_multi_label is true, contributors are able to choose
   * multiple labels for one image.
   */
  allowMultiLabel?: boolean;
  /**
   * Required. Annotation spec set resource name.
   */
  annotationSpecSet?: string;
  /**
   * Optional. The type of how to aggregate answers.
   */
  answerAggregationType?:  | "STRING_AGGREGATION_TYPE_UNSPECIFIED" | "MAJORITY_VOTE" | "UNANIMOUS_VOTE" | "NO_AGGREGATION";
}

/**
 * Container of information about an image.
 */
export interface GoogleCloudDatalabelingV1beta1ImagePayload {
  /**
   * A byte string of a thumbnail image.
   */
  imageThumbnail?: Uint8Array;
  /**
   * Image uri from the user bucket.
   */
  imageUri?: string;
  /**
   * Image format.
   */
  mimeType?: string;
  /**
   * Signed uri of the image file in the service bucket.
   */
  signedUri?: string;
}

function serializeGoogleCloudDatalabelingV1beta1ImagePayload(data: any): GoogleCloudDatalabelingV1beta1ImagePayload {
  return {
    ...data,
    imageThumbnail: data["imageThumbnail"] !== undefined ? encodeBase64(data["imageThumbnail"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ImagePayload(data: any): GoogleCloudDatalabelingV1beta1ImagePayload {
  return {
    ...data,
    imageThumbnail: data["imageThumbnail"] !== undefined ? decodeBase64(data["imageThumbnail"] as string) : undefined,
  };
}

/**
 * A polyline for the image annotation.
 */
export interface GoogleCloudDatalabelingV1beta1ImagePolylineAnnotation {
  /**
   * Label of this polyline.
   */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
  normalizedPolyline?: GoogleCloudDatalabelingV1beta1NormalizedPolyline;
  polyline?: GoogleCloudDatalabelingV1beta1Polyline;
}

/**
 * Image segmentation annotation.
 */
export interface GoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation {
  /**
   * The mapping between rgb color and annotation spec. The key is the rgb
   * color represented in format of rgb(0, 0, 0). The value is the
   * AnnotationSpec.
   */
  annotationColors?: {
    [key: string]: GoogleCloudDatalabelingV1beta1AnnotationSpec
  };
  /**
   * A byte string of a full image's color map.
   */
  imageBytes?: Uint8Array;
  /**
   * Image format.
   */
  mimeType?: string;
}

function serializeGoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation(data: any): GoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation {
  return {
    ...data,
    imageBytes: data["imageBytes"] !== undefined ? encodeBase64(data["imageBytes"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation(data: any): GoogleCloudDatalabelingV1beta1ImageSegmentationAnnotation {
  return {
    ...data,
    imageBytes: data["imageBytes"] !== undefined ? decodeBase64(data["imageBytes"] as string) : undefined,
  };
}

/**
 * Metadata of an ImportData operation.
 */
export interface GoogleCloudDatalabelingV1beta1ImportDataOperationMetadata {
  /**
   * Output only. Timestamp when import dataset request was created.
   */
  createTime?: Date;
  /**
   * Output only. The name of imported dataset. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Output only. Partial failures encountered. E.g. single files that couldn't
   * be read. Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDatalabelingV1beta1ImportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1ImportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ImportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1ImportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Response used for ImportData longrunning operation.
 */
export interface GoogleCloudDatalabelingV1beta1ImportDataOperationResponse {
  /**
   * Ouptut only. The name of imported dataset.
   */
  dataset?: string;
  /**
   * Output only. Number of examples imported successfully.
   */
  importCount?: number;
  /**
   * Output only. Total number of examples requested to import
   */
  totalCount?: number;
}

/**
 * Request message for ImportData API.
 */
export interface GoogleCloudDatalabelingV1beta1ImportDataRequest {
  /**
   * Required. Specify the input source of the data.
   */
  inputConfig?: GoogleCloudDatalabelingV1beta1InputConfig;
  /**
   * Email of the user who started the import task and should be notified by
   * email. If empty no notification will be sent.
   */
  userEmailAddress?: string;
}

/**
 * The configuration of input data, including data type, location, etc.
 */
export interface GoogleCloudDatalabelingV1beta1InputConfig {
  /**
   * Optional. The type of annotation to be performed on this data. You must
   * specify this field if you are using this InputConfig in an EvaluationJob.
   */
  annotationType?:  | "ANNOTATION_TYPE_UNSPECIFIED" | "IMAGE_CLASSIFICATION_ANNOTATION" | "IMAGE_BOUNDING_BOX_ANNOTATION" | "IMAGE_ORIENTED_BOUNDING_BOX_ANNOTATION" | "IMAGE_BOUNDING_POLY_ANNOTATION" | "IMAGE_POLYLINE_ANNOTATION" | "IMAGE_SEGMENTATION_ANNOTATION" | "VIDEO_SHOTS_CLASSIFICATION_ANNOTATION" | "VIDEO_OBJECT_TRACKING_ANNOTATION" | "VIDEO_OBJECT_DETECTION_ANNOTATION" | "VIDEO_EVENT_ANNOTATION" | "TEXT_CLASSIFICATION_ANNOTATION" | "TEXT_ENTITY_EXTRACTION_ANNOTATION" | "GENERAL_CLASSIFICATION_ANNOTATION";
  /**
   * Source located in BigQuery. You must specify this field if you are using
   * this InputConfig in an EvaluationJob.
   */
  bigquerySource?: GoogleCloudDatalabelingV1beta1BigQuerySource;
  /**
   * Optional. Metadata about annotations for the input. You must specify this
   * field if you are using this InputConfig in an EvaluationJob for a model
   * version that performs classification.
   */
  classificationMetadata?: GoogleCloudDatalabelingV1beta1ClassificationMetadata;
  /**
   * Required. Data type must be specifed when user tries to import data.
   */
  dataType?:  | "DATA_TYPE_UNSPECIFIED" | "IMAGE" | "VIDEO" | "TEXT" | "GENERAL_DATA";
  /**
   * Source located in Cloud Storage.
   */
  gcsSource?: GoogleCloudDatalabelingV1beta1GcsSource;
  /**
   * Required for text import, as language code must be specified.
   */
  textMetadata?: GoogleCloudDatalabelingV1beta1TextMetadata;
}

/**
 * Instruction of how to perform the labeling task for human operators.
 * Currently only PDF instruction is supported.
 */
export interface GoogleCloudDatalabelingV1beta1Instruction {
  /**
   * Output only. The names of any related resources that are blocking changes
   * to the instruction.
   */
  blockingResources?: string[];
  /**
   * Output only. Creation time of instruction.
   */
  createTime?: Date;
  /**
   * Deprecated: this instruction format is not supported any more. Instruction
   * from a CSV file, such as for classification task. The CSV file should have
   * exact two columns, in the following format: * The first column is labeled
   * data, such as an image reference, text. * The second column is comma
   * separated labels associated with data.
   */
  csvInstruction?: GoogleCloudDatalabelingV1beta1CsvInstruction;
  /**
   * Required. The data type of this instruction.
   */
  dataType?:  | "DATA_TYPE_UNSPECIFIED" | "IMAGE" | "VIDEO" | "TEXT" | "GENERAL_DATA";
  /**
   * Optional. User-provided description of the instruction. The description
   * can be up to 10000 characters long.
   */
  description?: string;
  /**
   * Required. The display name of the instruction. Maximum of 64 characters.
   */
  displayName?: string;
  /**
   * Output only. Instruction resource name, format:
   * projects/{project_id}/instructions/{instruction_id}
   */
  name?: string;
  /**
   * Instruction from a PDF document. The PDF should be in a Cloud Storage
   * bucket.
   */
  pdfInstruction?: GoogleCloudDatalabelingV1beta1PdfInstruction;
  /**
   * Output only. Last update time of instruction.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDatalabelingV1beta1Instruction(data: any): GoogleCloudDatalabelingV1beta1Instruction {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1Instruction(data: any): GoogleCloudDatalabelingV1beta1Instruction {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Details of a LabelImageBoundingBox operation metadata.
 */
export interface GoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of LabelImageBoundingPoly operation metadata.
 */
export interface GoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Metadata of a LabelImageClassification operation.
 */
export interface GoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelImageOrientedBoundingBox operation metadata.
 */
export interface GoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata {
  /**
   * Basic human annotation config.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of LabelImagePolyline operation metadata.
 */
export interface GoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Request message for starting an image labeling task.
 */
export interface GoogleCloudDatalabelingV1beta1LabelImageRequest {
  /**
   * Required. Basic human annotation config.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
  /**
   * Configuration for bounding box and bounding poly task. One of
   * image_classification_config, bounding_poly_config, polyline_config and
   * segmentation_config are required.
   */
  boundingPolyConfig?: GoogleCloudDatalabelingV1beta1BoundingPolyConfig;
  /**
   * Required. The type of image labeling task.
   */
  feature?:  | "FEATURE_UNSPECIFIED" | "CLASSIFICATION" | "BOUNDING_BOX" | "ORIENTED_BOUNDING_BOX" | "BOUNDING_POLY" | "POLYLINE" | "SEGMENTATION";
  /**
   * Configuration for image classification task. One of
   * image_classification_config, bounding_poly_config, polyline_config and
   * segmentation_config are required.
   */
  imageClassificationConfig?: GoogleCloudDatalabelingV1beta1ImageClassificationConfig;
  /**
   * Configuration for polyline task. One of image_classification_config,
   * bounding_poly_config, polyline_config and segmentation_config are required.
   */
  polylineConfig?: GoogleCloudDatalabelingV1beta1PolylineConfig;
  /**
   * Configuration for segmentation task. One of image_classification_config,
   * bounding_poly_config, polyline_config and segmentation_config are required.
   */
  segmentationConfig?: GoogleCloudDatalabelingV1beta1SegmentationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelImageRequest(data: any): GoogleCloudDatalabelingV1beta1LabelImageRequest {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelImageRequest(data: any): GoogleCloudDatalabelingV1beta1LabelImageRequest {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelImageSegmentation operation metadata.
 */
export interface GoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata {
  /**
   * Basic human annotation config.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Metadata of a labeling operation, such as LabelImage or LabelVideo. Next
 * tag: 23
 */
export interface GoogleCloudDatalabelingV1beta1LabelOperationMetadata {
  /**
   * Output only. The name of annotated dataset in format
   * "projects/*\/datasets/*\/annotatedDatasets/*".
   */
  annotatedDataset?: string;
  /**
   * Output only. Timestamp when labeling request was created.
   */
  createTime?: Date;
  /**
   * Output only. The name of dataset to be labeled. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Details of label image bounding box operation.
   */
  imageBoundingBoxDetails?: GoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata;
  /**
   * Details of label image bounding poly operation.
   */
  imageBoundingPolyDetails?: GoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata;
  /**
   * Details of label image classification operation.
   */
  imageClassificationDetails?: GoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata;
  /**
   * Details of label image oriented bounding box operation.
   */
  imageOrientedBoundingBoxDetails?: GoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata;
  /**
   * Details of label image polyline operation.
   */
  imagePolylineDetails?: GoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata;
  /**
   * Details of label image segmentation operation.
   */
  imageSegmentationDetails?: GoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata;
  /**
   * Output only. Partial failures encountered. E.g. single files that couldn't
   * be read. Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
  /**
   * Output only. Progress of label operation. Range: [0, 100].
   */
  progressPercent?: number;
  /**
   * Details of label text classification operation.
   */
  textClassificationDetails?: GoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata;
  /**
   * Details of label text entity extraction operation.
   */
  textEntityExtractionDetails?: GoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata;
  /**
   * Details of label video classification operation.
   */
  videoClassificationDetails?: GoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata;
  /**
   * Details of label video event operation.
   */
  videoEventDetails?: GoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata;
  /**
   * Details of label video object detection operation.
   */
  videoObjectDetectionDetails?: GoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata;
  /**
   * Details of label video object tracking operation.
   */
  videoObjectTrackingDetails?: GoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata;
}

function serializeGoogleCloudDatalabelingV1beta1LabelOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    imageBoundingBoxDetails: data["imageBoundingBoxDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata(data["imageBoundingBoxDetails"]) : undefined,
    imageBoundingPolyDetails: data["imageBoundingPolyDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata(data["imageBoundingPolyDetails"]) : undefined,
    imageClassificationDetails: data["imageClassificationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata(data["imageClassificationDetails"]) : undefined,
    imageOrientedBoundingBoxDetails: data["imageOrientedBoundingBoxDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata(data["imageOrientedBoundingBoxDetails"]) : undefined,
    imagePolylineDetails: data["imagePolylineDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata(data["imagePolylineDetails"]) : undefined,
    imageSegmentationDetails: data["imageSegmentationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata(data["imageSegmentationDetails"]) : undefined,
    textClassificationDetails: data["textClassificationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata(data["textClassificationDetails"]) : undefined,
    textEntityExtractionDetails: data["textEntityExtractionDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata(data["textEntityExtractionDetails"]) : undefined,
    videoClassificationDetails: data["videoClassificationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata(data["videoClassificationDetails"]) : undefined,
    videoEventDetails: data["videoEventDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata(data["videoEventDetails"]) : undefined,
    videoObjectDetectionDetails: data["videoObjectDetectionDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata(data["videoObjectDetectionDetails"]) : undefined,
    videoObjectTrackingDetails: data["videoObjectTrackingDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata(data["videoObjectTrackingDetails"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    imageBoundingBoxDetails: data["imageBoundingBoxDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelImageBoundingBoxOperationMetadata(data["imageBoundingBoxDetails"]) : undefined,
    imageBoundingPolyDetails: data["imageBoundingPolyDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelImageBoundingPolyOperationMetadata(data["imageBoundingPolyDetails"]) : undefined,
    imageClassificationDetails: data["imageClassificationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelImageClassificationOperationMetadata(data["imageClassificationDetails"]) : undefined,
    imageOrientedBoundingBoxDetails: data["imageOrientedBoundingBoxDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelImageOrientedBoundingBoxOperationMetadata(data["imageOrientedBoundingBoxDetails"]) : undefined,
    imagePolylineDetails: data["imagePolylineDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelImagePolylineOperationMetadata(data["imagePolylineDetails"]) : undefined,
    imageSegmentationDetails: data["imageSegmentationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelImageSegmentationOperationMetadata(data["imageSegmentationDetails"]) : undefined,
    textClassificationDetails: data["textClassificationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata(data["textClassificationDetails"]) : undefined,
    textEntityExtractionDetails: data["textEntityExtractionDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata(data["textEntityExtractionDetails"]) : undefined,
    videoClassificationDetails: data["videoClassificationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata(data["videoClassificationDetails"]) : undefined,
    videoEventDetails: data["videoEventDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata(data["videoEventDetails"]) : undefined,
    videoObjectDetectionDetails: data["videoObjectDetectionDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata(data["videoObjectDetectionDetails"]) : undefined,
    videoObjectTrackingDetails: data["videoObjectTrackingDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata(data["videoObjectTrackingDetails"]) : undefined,
  };
}

/**
 * Statistics about annotation specs.
 */
export interface GoogleCloudDatalabelingV1beta1LabelStats {
  /**
   * Map of each annotation spec's example count. Key is the annotation spec
   * name and value is the number of examples for that annotation spec. If the
   * annotated dataset does not have annotation spec, the map will return a pair
   * where the key is empty string and value is the total number of annotations.
   */
  exampleCount?: {
    [key: string]: bigint
  };
}

function serializeGoogleCloudDatalabelingV1beta1LabelStats(data: any): GoogleCloudDatalabelingV1beta1LabelStats {
  return {
    ...data,
    exampleCount: data["exampleCount"] !== undefined ? Object.fromEntries(Object.entries(data["exampleCount"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelStats(data: any): GoogleCloudDatalabelingV1beta1LabelStats {
  return {
    ...data,
    exampleCount: data["exampleCount"] !== undefined ? Object.fromEntries(Object.entries(data["exampleCount"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
  };
}

/**
 * Details of a LabelTextClassification operation metadata.
 */
export interface GoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelTextClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelTextEntityExtraction operation metadata.
 */
export interface GoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelTextEntityExtractionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Request message for LabelText.
 */
export interface GoogleCloudDatalabelingV1beta1LabelTextRequest {
  /**
   * Required. Basic human annotation config.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
  /**
   * Required. The type of text labeling task.
   */
  feature?:  | "FEATURE_UNSPECIFIED" | "TEXT_CLASSIFICATION" | "TEXT_ENTITY_EXTRACTION";
  /**
   * Configuration for text classification task. One of
   * text_classification_config and text_entity_extraction_config is required.
   */
  textClassificationConfig?: GoogleCloudDatalabelingV1beta1TextClassificationConfig;
  /**
   * Configuration for entity extraction task. One of
   * text_classification_config and text_entity_extraction_config is required.
   */
  textEntityExtractionConfig?: GoogleCloudDatalabelingV1beta1TextEntityExtractionConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelTextRequest(data: any): GoogleCloudDatalabelingV1beta1LabelTextRequest {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelTextRequest(data: any): GoogleCloudDatalabelingV1beta1LabelTextRequest {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoClassification operation metadata.
 */
export interface GoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelVideoClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoEvent operation metadata.
 */
export interface GoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelVideoEventOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoObjectDetection operation metadata.
 */
export interface GoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelVideoObjectDetectionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoObjectTracking operation metadata.
 */
export interface GoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata(data: any): GoogleCloudDatalabelingV1beta1LabelVideoObjectTrackingOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Request message for LabelVideo.
 */
export interface GoogleCloudDatalabelingV1beta1LabelVideoRequest {
  /**
   * Required. Basic human annotation config.
   */
  basicConfig?: GoogleCloudDatalabelingV1beta1HumanAnnotationConfig;
  /**
   * Configuration for video event task. One of video_classification_config,
   * object_detection_config, object_tracking_config and event_config is
   * required.
   */
  eventConfig?: GoogleCloudDatalabelingV1beta1EventConfig;
  /**
   * Required. The type of video labeling task.
   */
  feature?:  | "FEATURE_UNSPECIFIED" | "CLASSIFICATION" | "OBJECT_DETECTION" | "OBJECT_TRACKING" | "EVENT";
  /**
   * Configuration for video object detection task. One of
   * video_classification_config, object_detection_config,
   * object_tracking_config and event_config is required.
   */
  objectDetectionConfig?: GoogleCloudDatalabelingV1beta1ObjectDetectionConfig;
  /**
   * Configuration for video object tracking task. One of
   * video_classification_config, object_detection_config,
   * object_tracking_config and event_config is required.
   */
  objectTrackingConfig?: GoogleCloudDatalabelingV1beta1ObjectTrackingConfig;
  /**
   * Configuration for video classification task. One of
   * video_classification_config, object_detection_config,
   * object_tracking_config and event_config is required.
   */
  videoClassificationConfig?: GoogleCloudDatalabelingV1beta1VideoClassificationConfig;
}

function serializeGoogleCloudDatalabelingV1beta1LabelVideoRequest(data: any): GoogleCloudDatalabelingV1beta1LabelVideoRequest {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1LabelVideoRequest(data: any): GoogleCloudDatalabelingV1beta1LabelVideoRequest {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Results of listing annotated datasets for a dataset.
 */
export interface GoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse {
  /**
   * The list of annotated datasets to return.
   */
  annotatedDatasets?: GoogleCloudDatalabelingV1beta1AnnotatedDataset[];
  /**
   * A token to retrieve next page of results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse(data: any): GoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse {
  return {
    ...data,
    annotatedDatasets: data["annotatedDatasets"] !== undefined ? data["annotatedDatasets"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1AnnotatedDataset(item))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse(data: any): GoogleCloudDatalabelingV1beta1ListAnnotatedDatasetsResponse {
  return {
    ...data,
    annotatedDatasets: data["annotatedDatasets"] !== undefined ? data["annotatedDatasets"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1AnnotatedDataset(item))) : undefined,
  };
}

/**
 * Results of listing annotation spec set under a project.
 */
export interface GoogleCloudDatalabelingV1beta1ListAnnotationSpecSetsResponse {
  /**
   * The list of annotation spec sets.
   */
  annotationSpecSets?: GoogleCloudDatalabelingV1beta1AnnotationSpecSet[];
  /**
   * A token to retrieve next page of results.
   */
  nextPageToken?: string;
}

/**
 * Results of listing data items in a dataset.
 */
export interface GoogleCloudDatalabelingV1beta1ListDataItemsResponse {
  /**
   * The list of data items to return.
   */
  dataItems?: GoogleCloudDatalabelingV1beta1DataItem[];
  /**
   * A token to retrieve next page of results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDatalabelingV1beta1ListDataItemsResponse(data: any): GoogleCloudDatalabelingV1beta1ListDataItemsResponse {
  return {
    ...data,
    dataItems: data["dataItems"] !== undefined ? data["dataItems"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1DataItem(item))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ListDataItemsResponse(data: any): GoogleCloudDatalabelingV1beta1ListDataItemsResponse {
  return {
    ...data,
    dataItems: data["dataItems"] !== undefined ? data["dataItems"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1DataItem(item))) : undefined,
  };
}

/**
 * Results of listing datasets within a project.
 */
export interface GoogleCloudDatalabelingV1beta1ListDatasetsResponse {
  /**
   * The list of datasets to return.
   */
  datasets?: GoogleCloudDatalabelingV1beta1Dataset[];
  /**
   * A token to retrieve next page of results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDatalabelingV1beta1ListDatasetsResponse(data: any): GoogleCloudDatalabelingV1beta1ListDatasetsResponse {
  return {
    ...data,
    datasets: data["datasets"] !== undefined ? data["datasets"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1Dataset(item))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ListDatasetsResponse(data: any): GoogleCloudDatalabelingV1beta1ListDatasetsResponse {
  return {
    ...data,
    datasets: data["datasets"] !== undefined ? data["datasets"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1Dataset(item))) : undefined,
  };
}

/**
 * Results for listing evaluation jobs.
 */
export interface GoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse {
  /**
   * The list of evaluation jobs to return.
   */
  evaluationJobs?: GoogleCloudDatalabelingV1beta1EvaluationJob[];
  /**
   * A token to retrieve next page of results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse(data: any): GoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse {
  return {
    ...data,
    evaluationJobs: data["evaluationJobs"] !== undefined ? data["evaluationJobs"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1EvaluationJob(item))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse(data: any): GoogleCloudDatalabelingV1beta1ListEvaluationJobsResponse {
  return {
    ...data,
    evaluationJobs: data["evaluationJobs"] !== undefined ? data["evaluationJobs"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1EvaluationJob(item))) : undefined,
  };
}

/**
 * Results of listing Examples in and annotated dataset.
 */
export interface GoogleCloudDatalabelingV1beta1ListExamplesResponse {
  /**
   * The list of examples to return.
   */
  examples?: GoogleCloudDatalabelingV1beta1Example[];
  /**
   * A token to retrieve next page of results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDatalabelingV1beta1ListExamplesResponse(data: any): GoogleCloudDatalabelingV1beta1ListExamplesResponse {
  return {
    ...data,
    examples: data["examples"] !== undefined ? data["examples"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1Example(item))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ListExamplesResponse(data: any): GoogleCloudDatalabelingV1beta1ListExamplesResponse {
  return {
    ...data,
    examples: data["examples"] !== undefined ? data["examples"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1Example(item))) : undefined,
  };
}

/**
 * Results for listing FeedbackMessages.
 */
export interface GoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse {
  /**
   * The list of feedback messages to return.
   */
  feedbackMessages?: GoogleCloudDatalabelingV1beta1FeedbackMessage[];
  /**
   * A token to retrieve next page of results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse(data: any): GoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse {
  return {
    ...data,
    feedbackMessages: data["feedbackMessages"] !== undefined ? data["feedbackMessages"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1FeedbackMessage(item))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse(data: any): GoogleCloudDatalabelingV1beta1ListFeedbackMessagesResponse {
  return {
    ...data,
    feedbackMessages: data["feedbackMessages"] !== undefined ? data["feedbackMessages"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1FeedbackMessage(item))) : undefined,
  };
}

/**
 * Results for listing FeedbackThreads.
 */
export interface GoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse {
  /**
   * The list of feedback threads to return.
   */
  feedbackThreads?: GoogleCloudDatalabelingV1beta1FeedbackThread[];
  /**
   * A token to retrieve next page of results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse(data: any): GoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse {
  return {
    ...data,
    feedbackThreads: data["feedbackThreads"] !== undefined ? data["feedbackThreads"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1FeedbackThread(item))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse(data: any): GoogleCloudDatalabelingV1beta1ListFeedbackThreadsResponse {
  return {
    ...data,
    feedbackThreads: data["feedbackThreads"] !== undefined ? data["feedbackThreads"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1FeedbackThread(item))) : undefined,
  };
}

/**
 * Results of listing instructions under a project.
 */
export interface GoogleCloudDatalabelingV1beta1ListInstructionsResponse {
  /**
   * The list of Instructions to return.
   */
  instructions?: GoogleCloudDatalabelingV1beta1Instruction[];
  /**
   * A token to retrieve next page of results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDatalabelingV1beta1ListInstructionsResponse(data: any): GoogleCloudDatalabelingV1beta1ListInstructionsResponse {
  return {
    ...data,
    instructions: data["instructions"] !== undefined ? data["instructions"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1Instruction(item))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ListInstructionsResponse(data: any): GoogleCloudDatalabelingV1beta1ListInstructionsResponse {
  return {
    ...data,
    instructions: data["instructions"] !== undefined ? data["instructions"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1Instruction(item))) : undefined,
  };
}

/**
 * Normalized bounding polygon.
 */
export interface GoogleCloudDatalabelingV1beta1NormalizedBoundingPoly {
  /**
   * The bounding polygon normalized vertices.
   */
  normalizedVertices?: GoogleCloudDatalabelingV1beta1NormalizedVertex[];
}

/**
 * Normalized polyline.
 */
export interface GoogleCloudDatalabelingV1beta1NormalizedPolyline {
  /**
   * The normalized polyline vertices.
   */
  normalizedVertices?: GoogleCloudDatalabelingV1beta1NormalizedVertex[];
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface GoogleCloudDatalabelingV1beta1NormalizedVertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
}

/**
 * Config for video object detection human labeling task. Object detection will
 * be conducted on the images extracted from the video, and those objects will
 * be labeled with bounding boxes. User need to specify the number of images to
 * be extracted per second as the extraction frame rate.
 */
export interface GoogleCloudDatalabelingV1beta1ObjectDetectionConfig {
  /**
   * Required. Annotation spec set resource name.
   */
  annotationSpecSet?: string;
  /**
   * Required. Number of frames per second to be extracted from the video.
   */
  extractionFrameRate?: number;
}

/**
 * Metrics calculated for an image object detection (bounding box) model.
 */
export interface GoogleCloudDatalabelingV1beta1ObjectDetectionMetrics {
  /**
   * Precision-recall curve.
   */
  prCurve?: GoogleCloudDatalabelingV1beta1PrCurve;
}

/**
 * Config for video object tracking human labeling task.
 */
export interface GoogleCloudDatalabelingV1beta1ObjectTrackingConfig {
  /**
   * Required. Annotation spec set resource name.
   */
  annotationSpecSet?: string;
  /**
   * Videos will be cut to smaller clips to make it easier for labelers to work
   * on. Users can configure is field in seconds, if not set, default value is
   * 20s.
   */
  clipLength?: number;
  /**
   * The overlap length between different video clips. Users can configure is
   * field in seconds, if not set, default value is 0.3s.
   */
  overlapLength?: number;
}

/**
 * Video frame level annotation for object detection and tracking.
 */
export interface GoogleCloudDatalabelingV1beta1ObjectTrackingFrame {
  boundingPoly?: GoogleCloudDatalabelingV1beta1BoundingPoly;
  normalizedBoundingPoly?: GoogleCloudDatalabelingV1beta1NormalizedBoundingPoly;
  /**
   * The time offset of this frame relative to the beginning of the video.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudDatalabelingV1beta1ObjectTrackingFrame(data: any): GoogleCloudDatalabelingV1beta1ObjectTrackingFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1ObjectTrackingFrame(data: any): GoogleCloudDatalabelingV1beta1ObjectTrackingFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Metadata describing the feedback from the operator.
 */
export interface GoogleCloudDatalabelingV1beta1OperatorFeedbackMetadata {
}

/**
 * General information useful for labels coming from contributors.
 */
export interface GoogleCloudDatalabelingV1beta1OperatorMetadata {
  /**
   * Comments from contributors.
   */
  comments?: string[];
  /**
   * The total number of contributors that choose this label.
   */
  labelVotes?: number;
  /**
   * Confidence score corresponding to a label. For examle, if 3 contributors
   * have answered the question and 2 of them agree on the final label, the
   * confidence score will be 0.67 (2/3).
   */
  score?: number;
  /**
   * The total number of contributors that answer this question.
   */
  totalVotes?: number;
}

/**
 * The configuration of output data.
 */
export interface GoogleCloudDatalabelingV1beta1OutputConfig {
  /**
   * Output to a file in Cloud Storage. Should be used for labeling output
   * other than image segmentation.
   */
  gcsDestination?: GoogleCloudDatalabelingV1beta1GcsDestination;
  /**
   * Output to a folder in Cloud Storage. Should be used for image segmentation
   * or document de-identification labeling outputs.
   */
  gcsFolderDestination?: GoogleCloudDatalabelingV1beta1GcsFolderDestination;
}

/**
 * Request message for PauseEvaluationJob.
 */
export interface GoogleCloudDatalabelingV1beta1PauseEvaluationJobRequest {
}

/**
 * Instruction from a PDF file.
 */
export interface GoogleCloudDatalabelingV1beta1PdfInstruction {
  /**
   * PDF file for the instruction. Only gcs path is allowed.
   */
  gcsFileUri?: string;
}

/**
 * A line with multiple line segments.
 */
export interface GoogleCloudDatalabelingV1beta1Polyline {
  /**
   * The polyline vertices.
   */
  vertices?: GoogleCloudDatalabelingV1beta1Vertex[];
}

/**
 * Config for image polyline human labeling task.
 */
export interface GoogleCloudDatalabelingV1beta1PolylineConfig {
  /**
   * Required. Annotation spec set resource name.
   */
  annotationSpecSet?: string;
  /**
   * Optional. Instruction message showed on contributors UI.
   */
  instructionMessage?: string;
}

export interface GoogleCloudDatalabelingV1beta1PrCurve {
  /**
   * The annotation spec of the label for which the precision-recall curve
   * calculated. If this field is empty, that means the precision-recall curve
   * is an aggregate curve for all labels.
   */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
  /**
   * Area under the precision-recall curve. Not to be confused with area under
   * a receiver operating characteristic (ROC) curve.
   */
  areaUnderCurve?: number;
  /**
   * Entries that make up the precision-recall graph. Each entry is a "point"
   * on the graph drawn for a different `confidence_threshold`.
   */
  confidenceMetricsEntries?: GoogleCloudDatalabelingV1beta1ConfidenceMetricsEntry[];
  /**
   * Mean average prcision of this curve.
   */
  meanAveragePrecision?: number;
}

/**
 * Metadata describing the feedback from the labeling task requester.
 */
export interface GoogleCloudDatalabelingV1beta1RequesterFeedbackMetadata {
}

/**
 * Request message ResumeEvaluationJob.
 */
export interface GoogleCloudDatalabelingV1beta1ResumeEvaluationJobRequest {
}

/**
 * A row in the confusion matrix. Each entry in this row has the same ground
 * truth label.
 */
export interface GoogleCloudDatalabelingV1beta1Row {
  /**
   * The annotation spec of the ground truth label for this row.
   */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
  /**
   * A list of the confusion matrix entries. One entry for each possible
   * predicted label.
   */
  entries?: GoogleCloudDatalabelingV1beta1ConfusionMatrixEntry[];
}

/**
 * Results of searching evaluations.
 */
export interface GoogleCloudDatalabelingV1beta1SearchEvaluationsResponse {
  /**
   * The list of evaluations matching the search.
   */
  evaluations?: GoogleCloudDatalabelingV1beta1Evaluation[];
  /**
   * A token to retrieve next page of results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDatalabelingV1beta1SearchEvaluationsResponse(data: any): GoogleCloudDatalabelingV1beta1SearchEvaluationsResponse {
  return {
    ...data,
    evaluations: data["evaluations"] !== undefined ? data["evaluations"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1Evaluation(item))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1SearchEvaluationsResponse(data: any): GoogleCloudDatalabelingV1beta1SearchEvaluationsResponse {
  return {
    ...data,
    evaluations: data["evaluations"] !== undefined ? data["evaluations"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1Evaluation(item))) : undefined,
  };
}

/**
 * Request message of SearchExampleComparisons.
 */
export interface GoogleCloudDatalabelingV1beta1SearchExampleComparisonsRequest {
  /**
   * Optional. Requested page size. Server may return fewer results than
   * requested. Default value is 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained by the nextPageToken of the response to a previous
   * search rquest. If you don't specify this field, the API call requests the
   * first page of the search.
   */
  pageToken?: string;
}

/**
 * Results of searching example comparisons.
 */
export interface GoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse {
  /**
   * A list of example comparisons matching the search criteria.
   */
  exampleComparisons?: GoogleCloudDatalabelingV1beta1ExampleComparison[];
  /**
   * A token to retrieve next page of results.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse(data: any): GoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse {
  return {
    ...data,
    exampleComparisons: data["exampleComparisons"] !== undefined ? data["exampleComparisons"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1ExampleComparison(item))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse(data: any): GoogleCloudDatalabelingV1beta1SearchExampleComparisonsResponse {
  return {
    ...data,
    exampleComparisons: data["exampleComparisons"] !== undefined ? data["exampleComparisons"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1ExampleComparison(item))) : undefined,
  };
}

/**
 * Config for image segmentation
 */
export interface GoogleCloudDatalabelingV1beta1SegmentationConfig {
  /**
   * Required. Annotation spec set resource name. format:
   * projects/{project_id}/annotationSpecSets/{annotation_spec_set_id}
   */
  annotationSpecSet?: string;
  /**
   * Instruction message showed on labelers UI.
   */
  instructionMessage?: string;
}

/**
 * Config for setting up sentiments.
 */
export interface GoogleCloudDatalabelingV1beta1SentimentConfig {
  /**
   * If set to true, contributors will have the option to select sentiment of
   * the label they selected, to mark it as negative or positive label. Default
   * is false.
   */
  enableLabelSentimentSelection?: boolean;
}

/**
 * Start and end position in a sequence (e.g. text segment).
 */
export interface GoogleCloudDatalabelingV1beta1SequentialSegment {
  /**
   * End position (exclusive).
   */
  end?: number;
  /**
   * Start position (inclusive).
   */
  start?: number;
}

/**
 * Text classification annotation.
 */
export interface GoogleCloudDatalabelingV1beta1TextClassificationAnnotation {
  /**
   * Label of the text.
   */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
}

/**
 * Config for text classification human labeling task.
 */
export interface GoogleCloudDatalabelingV1beta1TextClassificationConfig {
  /**
   * Optional. If allow_multi_label is true, contributors are able to choose
   * multiple labels for one text segment.
   */
  allowMultiLabel?: boolean;
  /**
   * Required. Annotation spec set resource name.
   */
  annotationSpecSet?: string;
  /**
   * Optional. Configs for sentiment selection. We deprecate sentiment analysis
   * in data labeling side as it is incompatible with uCAIP.
   */
  sentimentConfig?: GoogleCloudDatalabelingV1beta1SentimentConfig;
}

/**
 * Text entity extraction annotation.
 */
export interface GoogleCloudDatalabelingV1beta1TextEntityExtractionAnnotation {
  /**
   * Label of the text entities.
   */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
  /**
   * Position of the entity.
   */
  sequentialSegment?: GoogleCloudDatalabelingV1beta1SequentialSegment;
}

/**
 * Config for text entity extraction human labeling task.
 */
export interface GoogleCloudDatalabelingV1beta1TextEntityExtractionConfig {
  /**
   * Required. Annotation spec set resource name.
   */
  annotationSpecSet?: string;
}

/**
 * Metadata for the text.
 */
export interface GoogleCloudDatalabelingV1beta1TextMetadata {
  /**
   * The language of this text, as a
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is
   * en-US.
   */
  languageCode?: string;
}

/**
 * Container of information about a piece of text.
 */
export interface GoogleCloudDatalabelingV1beta1TextPayload {
  /**
   * Text content.
   */
  textContent?: string;
}

/**
 * A time period inside of an example that has a time dimension (e.g. video).
 */
export interface GoogleCloudDatalabelingV1beta1TimeSegment {
  /**
   * End of the time segment (exclusive), represented as the duration since the
   * example start.
   */
  endTimeOffset?: number /* Duration */;
  /**
   * Start of the time segment (inclusive), represented as the duration since
   * the example start.
   */
  startTimeOffset?: number /* Duration */;
}

function serializeGoogleCloudDatalabelingV1beta1TimeSegment(data: any): GoogleCloudDatalabelingV1beta1TimeSegment {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1TimeSegment(data: any): GoogleCloudDatalabelingV1beta1TimeSegment {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

/**
 * A vertex represents a 2D point in the image. NOTE: the vertex coordinates
 * are in the same scale as the original image.
 */
export interface GoogleCloudDatalabelingV1beta1Vertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate.
   */
  y?: number;
}

/**
 * Video classification annotation.
 */
export interface GoogleCloudDatalabelingV1beta1VideoClassificationAnnotation {
  /**
   * Label of the segment specified by time_segment.
   */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
  /**
   * The time segment of the video to which the annotation applies.
   */
  timeSegment?: GoogleCloudDatalabelingV1beta1TimeSegment;
}

function serializeGoogleCloudDatalabelingV1beta1VideoClassificationAnnotation(data: any): GoogleCloudDatalabelingV1beta1VideoClassificationAnnotation {
  return {
    ...data,
    timeSegment: data["timeSegment"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1TimeSegment(data["timeSegment"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1VideoClassificationAnnotation(data: any): GoogleCloudDatalabelingV1beta1VideoClassificationAnnotation {
  return {
    ...data,
    timeSegment: data["timeSegment"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1TimeSegment(data["timeSegment"]) : undefined,
  };
}

/**
 * Config for video classification human labeling task. Currently two types of
 * video classification are supported: 1. Assign labels on the entire video. 2.
 * Split the video into multiple video clips based on camera shot, and assign
 * labels on each video clip.
 */
export interface GoogleCloudDatalabelingV1beta1VideoClassificationConfig {
  /**
   * Required. The list of annotation spec set configs. Since watching a video
   * clip takes much longer time than an image, we support label with multiple
   * AnnotationSpecSet at the same time. Labels in each AnnotationSpecSet will
   * be shown in a group to contributors. Contributors can select one or more
   * (depending on whether to allow multi label) from each group.
   */
  annotationSpecSetConfigs?: GoogleCloudDatalabelingV1beta1AnnotationSpecSetConfig[];
  /**
   * Optional. Option to apply shot detection on the video.
   */
  applyShotDetection?: boolean;
}

/**
 * Video event annotation.
 */
export interface GoogleCloudDatalabelingV1beta1VideoEventAnnotation {
  /**
   * Label of the event in this annotation.
   */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
  /**
   * The time segment of the video to which the annotation applies.
   */
  timeSegment?: GoogleCloudDatalabelingV1beta1TimeSegment;
}

function serializeGoogleCloudDatalabelingV1beta1VideoEventAnnotation(data: any): GoogleCloudDatalabelingV1beta1VideoEventAnnotation {
  return {
    ...data,
    timeSegment: data["timeSegment"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1TimeSegment(data["timeSegment"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1VideoEventAnnotation(data: any): GoogleCloudDatalabelingV1beta1VideoEventAnnotation {
  return {
    ...data,
    timeSegment: data["timeSegment"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1TimeSegment(data["timeSegment"]) : undefined,
  };
}

/**
 * Video object tracking annotation.
 */
export interface GoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation {
  /**
   * Label of the object tracked in this annotation.
   */
  annotationSpec?: GoogleCloudDatalabelingV1beta1AnnotationSpec;
  /**
   * The list of frames where this object track appears.
   */
  objectTrackingFrames?: GoogleCloudDatalabelingV1beta1ObjectTrackingFrame[];
  /**
   * The time segment of the video to which object tracking applies.
   */
  timeSegment?: GoogleCloudDatalabelingV1beta1TimeSegment;
}

function serializeGoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation(data: any): GoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation {
  return {
    ...data,
    objectTrackingFrames: data["objectTrackingFrames"] !== undefined ? data["objectTrackingFrames"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1ObjectTrackingFrame(item))) : undefined,
    timeSegment: data["timeSegment"] !== undefined ? serializeGoogleCloudDatalabelingV1beta1TimeSegment(data["timeSegment"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation(data: any): GoogleCloudDatalabelingV1beta1VideoObjectTrackingAnnotation {
  return {
    ...data,
    objectTrackingFrames: data["objectTrackingFrames"] !== undefined ? data["objectTrackingFrames"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1ObjectTrackingFrame(item))) : undefined,
    timeSegment: data["timeSegment"] !== undefined ? deserializeGoogleCloudDatalabelingV1beta1TimeSegment(data["timeSegment"]) : undefined,
  };
}

/**
 * Container of information of a video.
 */
export interface GoogleCloudDatalabelingV1beta1VideoPayload {
  /**
   * FPS of the video.
   */
  frameRate?: number;
  /**
   * Video format.
   */
  mimeType?: string;
  /**
   * Signed uri of the video file in the service bucket.
   */
  signedUri?: string;
  /**
   * The list of video thumbnails.
   */
  videoThumbnails?: GoogleCloudDatalabelingV1beta1VideoThumbnail[];
  /**
   * Video uri from the user bucket.
   */
  videoUri?: string;
}

function serializeGoogleCloudDatalabelingV1beta1VideoPayload(data: any): GoogleCloudDatalabelingV1beta1VideoPayload {
  return {
    ...data,
    videoThumbnails: data["videoThumbnails"] !== undefined ? data["videoThumbnails"].map((item: any) => (serializeGoogleCloudDatalabelingV1beta1VideoThumbnail(item))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1VideoPayload(data: any): GoogleCloudDatalabelingV1beta1VideoPayload {
  return {
    ...data,
    videoThumbnails: data["videoThumbnails"] !== undefined ? data["videoThumbnails"].map((item: any) => (deserializeGoogleCloudDatalabelingV1beta1VideoThumbnail(item))) : undefined,
  };
}

/**
 * Container of information of a video thumbnail.
 */
export interface GoogleCloudDatalabelingV1beta1VideoThumbnail {
  /**
   * A byte string of the video frame.
   */
  thumbnail?: Uint8Array;
  /**
   * Time offset relative to the beginning of the video, corresponding to the
   * video frame where the thumbnail has been extracted from.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudDatalabelingV1beta1VideoThumbnail(data: any): GoogleCloudDatalabelingV1beta1VideoThumbnail {
  return {
    ...data,
    thumbnail: data["thumbnail"] !== undefined ? encodeBase64(data["thumbnail"]) : undefined,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1beta1VideoThumbnail(data: any): GoogleCloudDatalabelingV1beta1VideoThumbnail {
  return {
    ...data,
    thumbnail: data["thumbnail"] !== undefined ? decodeBase64(data["thumbnail"] as string) : undefined,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Metadata of a CreateInstruction operation.
 */
export interface GoogleCloudDatalabelingV1p1alpha1CreateInstructionMetadata {
  /**
   * Timestamp when create instruction request was created.
   */
  createTime?: Date;
  /**
   * The name of the created Instruction.
   * projects/{project_id}/instructions/{instruction_id}
   */
  instruction?: string;
  /**
   * Partial failures encountered. E.g. single files that couldn't be read.
   * Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDatalabelingV1p1alpha1CreateInstructionMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1CreateInstructionMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1CreateInstructionMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1CreateInstructionMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata of an ExportData operation.
 */
export interface GoogleCloudDatalabelingV1p1alpha1ExportDataOperationMetadata {
  /**
   * Output only. The name of annotated dataset in format
   * "projects/*\/datasets/*\/annotatedDatasets/*".
   */
  annotatedDataset?: string;
  /**
   * Output only. Timestamp when export dataset request was created.
   */
  createTime?: Date;
  /**
   * Output only. The name of dataset to be exported. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Output only. Partial failures encountered. E.g. single files that couldn't
   * be read. Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDatalabelingV1p1alpha1ExportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1ExportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1ExportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1ExportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Response used for ExportDataset longrunning operation.
 */
export interface GoogleCloudDatalabelingV1p1alpha1ExportDataOperationResponse {
  /**
   * Output only. The name of annotated dataset in format
   * "projects/*\/datasets/*\/annotatedDatasets/*".
   */
  annotatedDataset?: string;
  /**
   * Ouptut only. The name of dataset. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Output only. Number of examples exported successfully.
   */
  exportCount?: number;
  /**
   * Output only. Statistic infos of labels in the exported dataset.
   */
  labelStats?: GoogleCloudDatalabelingV1p1alpha1LabelStats;
  /**
   * Output only. output_config in the ExportData request.
   */
  outputConfig?: GoogleCloudDatalabelingV1p1alpha1OutputConfig;
  /**
   * Output only. Total number of examples requested to export
   */
  totalCount?: number;
}

function serializeGoogleCloudDatalabelingV1p1alpha1ExportDataOperationResponse(data: any): GoogleCloudDatalabelingV1p1alpha1ExportDataOperationResponse {
  return {
    ...data,
    labelStats: data["labelStats"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1LabelStats(data["labelStats"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1ExportDataOperationResponse(data: any): GoogleCloudDatalabelingV1p1alpha1ExportDataOperationResponse {
  return {
    ...data,
    labelStats: data["labelStats"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1LabelStats(data["labelStats"]) : undefined,
  };
}

/**
 * Export destination of the data.Only gcs path is allowed in output_uri.
 */
export interface GoogleCloudDatalabelingV1p1alpha1GcsDestination {
  /**
   * Required. The format of the gcs destination. Only "text/csv" and
   * "application/json" are supported.
   */
  mimeType?: string;
  /**
   * Required. The output uri of destination file.
   */
  outputUri?: string;
}

/**
 * Export folder destination of the data.
 */
export interface GoogleCloudDatalabelingV1p1alpha1GcsFolderDestination {
  /**
   * Required. Cloud Storage directory to export data to.
   */
  outputFolderUri?: string;
}

/**
 * Metadata of an GenerateAnalysisReport operation.
 */
export interface GoogleCloudDatalabelingV1p1alpha1GenerateAnalysisReportOperationMetadata {
  /**
   * Timestamp when generate report request was created.
   */
  createTime?: Date;
  /**
   * The name of the dataset for which the analysis report is generated.
   * Format: "projects/*\/datasets/*"
   */
  dataset?: string;
}

function serializeGoogleCloudDatalabelingV1p1alpha1GenerateAnalysisReportOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1GenerateAnalysisReportOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1GenerateAnalysisReportOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1GenerateAnalysisReportOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Configuration for how human labeling task should be done.
 */
export interface GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig {
  /**
   * Optional. A human-readable description for AnnotatedDataset. The
   * description can be up to 10000 characters long.
   */
  annotatedDatasetDescription?: string;
  /**
   * Required. A human-readable name for AnnotatedDataset defined by users.
   * Maximum of 64 characters .
   */
  annotatedDatasetDisplayName?: string;
  /**
   * Optional. If you want your own labeling contributors to manage and work on
   * this labeling request, you can set these contributors here. We will give
   * them access to the question types in crowdcompute. Note that these emails
   * must be registered in crowdcompute worker UI:
   * https://crowd-compute.appspot.com/
   */
  contributorEmails?: string[];
  /**
   * Required. Instruction resource name.
   */
  instruction?: string;
  /**
   * Optional. A human-readable label used to logically group labeling tasks.
   * This string must match the regular expression `[a-zA-Z\\d_-]{0,128}`.
   */
  labelGroup?: string;
  /**
   * Optional. The Language of this question, as a
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is
   * en-US. Only need to set this when task is language related. For example,
   * French text classification.
   */
  languageCode?: string;
  /**
   * Optional. Maximum duration for contributors to answer a question. Maximum
   * is 3600 seconds. Default is 3600 seconds.
   */
  questionDuration?: number /* Duration */;
  /**
   * Optional. Replication of questions. Each question will be sent to up to
   * this number of contributors to label. Aggregated answers will be returned.
   * Default is set to 1. For image related labeling, valid values are 1, 3, 5.
   */
  replicaCount?: number;
  /**
   * Email of the user who started the labeling task and should be notified by
   * email. If empty no notification will be sent.
   */
  userEmailAddress?: string;
}

function serializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data: any): GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig {
  return {
    ...data,
    questionDuration: data["questionDuration"] !== undefined ? data["questionDuration"] : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data: any): GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig {
  return {
    ...data,
    questionDuration: data["questionDuration"] !== undefined ? data["questionDuration"] : undefined,
  };
}

/**
 * Metadata of an ImportData operation.
 */
export interface GoogleCloudDatalabelingV1p1alpha1ImportDataOperationMetadata {
  /**
   * Output only. Timestamp when import dataset request was created.
   */
  createTime?: Date;
  /**
   * Output only. The name of imported dataset. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Output only. Partial failures encountered. E.g. single files that couldn't
   * be read. Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDatalabelingV1p1alpha1ImportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1ImportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1ImportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1ImportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Response used for ImportData longrunning operation.
 */
export interface GoogleCloudDatalabelingV1p1alpha1ImportDataOperationResponse {
  /**
   * Ouptut only. The name of imported dataset.
   */
  dataset?: string;
  /**
   * Output only. Number of examples imported successfully.
   */
  importCount?: number;
  /**
   * Output only. Total number of examples requested to import
   */
  totalCount?: number;
}

/**
 * Details of a LabelImageBoundingBox operation metadata.
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of LabelImageBoundingPoly operation metadata.
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Metadata of a LabelImageClassification operation.
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelImageOrientedBoundingBox operation metadata.
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata {
  /**
   * Basic human annotation config.
   */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of LabelImagePolyline operation metadata.
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelImageSegmentation operation metadata.
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata {
  /**
   * Basic human annotation config.
   */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Metadata of a labeling operation, such as LabelImage or LabelVideo. Next
 * tag: 23
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelOperationMetadata {
  /**
   * Output only. The name of annotated dataset in format
   * "projects/*\/datasets/*\/annotatedDatasets/*".
   */
  annotatedDataset?: string;
  /**
   * Output only. Timestamp when labeling request was created.
   */
  createTime?: Date;
  /**
   * Output only. The name of dataset to be labeled. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Details of label image bounding box operation.
   */
  imageBoundingBoxDetails?: GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata;
  /**
   * Details of label image bounding poly operation.
   */
  imageBoundingPolyDetails?: GoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata;
  /**
   * Details of label image classification operation.
   */
  imageClassificationDetails?: GoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata;
  /**
   * Details of label image oriented bounding box operation.
   */
  imageOrientedBoundingBoxDetails?: GoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata;
  /**
   * Details of label image polyline operation.
   */
  imagePolylineDetails?: GoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata;
  /**
   * Details of label image segmentation operation.
   */
  imageSegmentationDetails?: GoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata;
  /**
   * Output only. Partial failures encountered. E.g. single files that couldn't
   * be read. Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
  /**
   * Output only. Progress of label operation. Range: [0, 100].
   */
  progressPercent?: number;
  /**
   * Details of label text classification operation.
   */
  textClassificationDetails?: GoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata;
  /**
   * Details of label text entity extraction operation.
   */
  textEntityExtractionDetails?: GoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata;
  /**
   * Details of label video classification operation.
   */
  videoClassificationDetails?: GoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata;
  /**
   * Details of label video event operation.
   */
  videoEventDetails?: GoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata;
  /**
   * Details of label video object detection operation.
   */
  videoObjectDetectionDetails?: GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata;
  /**
   * Details of label video object tracking operation.
   */
  videoObjectTrackingDetails?: GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata;
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    imageBoundingBoxDetails: data["imageBoundingBoxDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata(data["imageBoundingBoxDetails"]) : undefined,
    imageBoundingPolyDetails: data["imageBoundingPolyDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata(data["imageBoundingPolyDetails"]) : undefined,
    imageClassificationDetails: data["imageClassificationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata(data["imageClassificationDetails"]) : undefined,
    imageOrientedBoundingBoxDetails: data["imageOrientedBoundingBoxDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata(data["imageOrientedBoundingBoxDetails"]) : undefined,
    imagePolylineDetails: data["imagePolylineDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata(data["imagePolylineDetails"]) : undefined,
    imageSegmentationDetails: data["imageSegmentationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata(data["imageSegmentationDetails"]) : undefined,
    textClassificationDetails: data["textClassificationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata(data["textClassificationDetails"]) : undefined,
    textEntityExtractionDetails: data["textEntityExtractionDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata(data["textEntityExtractionDetails"]) : undefined,
    videoClassificationDetails: data["videoClassificationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata(data["videoClassificationDetails"]) : undefined,
    videoEventDetails: data["videoEventDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata(data["videoEventDetails"]) : undefined,
    videoObjectDetectionDetails: data["videoObjectDetectionDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata(data["videoObjectDetectionDetails"]) : undefined,
    videoObjectTrackingDetails: data["videoObjectTrackingDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata(data["videoObjectTrackingDetails"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    imageBoundingBoxDetails: data["imageBoundingBoxDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1LabelImageBoundingBoxOperationMetadata(data["imageBoundingBoxDetails"]) : undefined,
    imageBoundingPolyDetails: data["imageBoundingPolyDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1LabelImageBoundingPolyOperationMetadata(data["imageBoundingPolyDetails"]) : undefined,
    imageClassificationDetails: data["imageClassificationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1LabelImageClassificationOperationMetadata(data["imageClassificationDetails"]) : undefined,
    imageOrientedBoundingBoxDetails: data["imageOrientedBoundingBoxDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1LabelImageOrientedBoundingBoxOperationMetadata(data["imageOrientedBoundingBoxDetails"]) : undefined,
    imagePolylineDetails: data["imagePolylineDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1LabelImagePolylineOperationMetadata(data["imagePolylineDetails"]) : undefined,
    imageSegmentationDetails: data["imageSegmentationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1LabelImageSegmentationOperationMetadata(data["imageSegmentationDetails"]) : undefined,
    textClassificationDetails: data["textClassificationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata(data["textClassificationDetails"]) : undefined,
    textEntityExtractionDetails: data["textEntityExtractionDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata(data["textEntityExtractionDetails"]) : undefined,
    videoClassificationDetails: data["videoClassificationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata(data["videoClassificationDetails"]) : undefined,
    videoEventDetails: data["videoEventDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata(data["videoEventDetails"]) : undefined,
    videoObjectDetectionDetails: data["videoObjectDetectionDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata(data["videoObjectDetectionDetails"]) : undefined,
    videoObjectTrackingDetails: data["videoObjectTrackingDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata(data["videoObjectTrackingDetails"]) : undefined,
  };
}

/**
 * Statistics about annotation specs.
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelStats {
  /**
   * Map of each annotation spec's example count. Key is the annotation spec
   * name and value is the number of examples for that annotation spec. If the
   * annotated dataset does not have annotation spec, the map will return a pair
   * where the key is empty string and value is the total number of annotations.
   */
  exampleCount?: {
    [key: string]: bigint
  };
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelStats(data: any): GoogleCloudDatalabelingV1p1alpha1LabelStats {
  return {
    ...data,
    exampleCount: data["exampleCount"] !== undefined ? Object.fromEntries(Object.entries(data["exampleCount"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelStats(data: any): GoogleCloudDatalabelingV1p1alpha1LabelStats {
  return {
    ...data,
    exampleCount: data["exampleCount"] !== undefined ? Object.fromEntries(Object.entries(data["exampleCount"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
  };
}

/**
 * Details of a LabelTextClassification operation metadata.
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelTextClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelTextEntityExtraction operation metadata.
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelTextEntityExtractionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoClassification operation metadata.
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelVideoClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoEvent operation metadata.
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelVideoEventOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoObjectDetection operation metadata.
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectDetectionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoObjectTracking operation metadata.
 */
export interface GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata(data: any): GoogleCloudDatalabelingV1p1alpha1LabelVideoObjectTrackingOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p1alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * The configuration of output data.
 */
export interface GoogleCloudDatalabelingV1p1alpha1OutputConfig {
  /**
   * Output to a file in Cloud Storage. Should be used for labeling output
   * other than image segmentation.
   */
  gcsDestination?: GoogleCloudDatalabelingV1p1alpha1GcsDestination;
  /**
   * Output to a folder in Cloud Storage. Should be used for image segmentation
   * or document de-identification labeling outputs.
   */
  gcsFolderDestination?: GoogleCloudDatalabelingV1p1alpha1GcsFolderDestination;
}

/**
 * Metadata of a CreateInstruction operation.
 */
export interface GoogleCloudDatalabelingV1p2alpha1CreateInstructionMetadata {
  /**
   * Timestamp when create instruction request was created.
   */
  createTime?: Date;
  /**
   * The name of the created Instruction.
   * projects/{project_id}/instructions/{instruction_id}
   */
  instruction?: string;
  /**
   * Partial failures encountered. E.g. single files that couldn't be read.
   * Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDatalabelingV1p2alpha1CreateInstructionMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1CreateInstructionMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1CreateInstructionMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1CreateInstructionMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Metadata of an ExportData operation.
 */
export interface GoogleCloudDatalabelingV1p2alpha1ExportDataOperationMetadata {
  /**
   * Output only. The name of annotated dataset in format
   * "projects/*\/datasets/*\/annotatedDatasets/*".
   */
  annotatedDataset?: string;
  /**
   * Output only. Timestamp when export dataset request was created.
   */
  createTime?: Date;
  /**
   * Output only. The name of dataset to be exported. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Output only. Partial failures encountered. E.g. single files that couldn't
   * be read. Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDatalabelingV1p2alpha1ExportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1ExportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1ExportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1ExportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Response used for ExportDataset longrunning operation.
 */
export interface GoogleCloudDatalabelingV1p2alpha1ExportDataOperationResponse {
  /**
   * Output only. The name of annotated dataset in format
   * "projects/*\/datasets/*\/annotatedDatasets/*".
   */
  annotatedDataset?: string;
  /**
   * Ouptut only. The name of dataset. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Output only. Number of examples exported successfully.
   */
  exportCount?: number;
  /**
   * Output only. Statistic infos of labels in the exported dataset.
   */
  labelStats?: GoogleCloudDatalabelingV1p2alpha1LabelStats;
  /**
   * Output only. output_config in the ExportData request.
   */
  outputConfig?: GoogleCloudDatalabelingV1p2alpha1OutputConfig;
  /**
   * Output only. Total number of examples requested to export
   */
  totalCount?: number;
}

function serializeGoogleCloudDatalabelingV1p2alpha1ExportDataOperationResponse(data: any): GoogleCloudDatalabelingV1p2alpha1ExportDataOperationResponse {
  return {
    ...data,
    labelStats: data["labelStats"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1LabelStats(data["labelStats"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1ExportDataOperationResponse(data: any): GoogleCloudDatalabelingV1p2alpha1ExportDataOperationResponse {
  return {
    ...data,
    labelStats: data["labelStats"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1LabelStats(data["labelStats"]) : undefined,
  };
}

/**
 * Export destination of the data.Only gcs path is allowed in output_uri.
 */
export interface GoogleCloudDatalabelingV1p2alpha1GcsDestination {
  /**
   * Required. The format of the gcs destination. Only "text/csv" and
   * "application/json" are supported.
   */
  mimeType?: string;
  /**
   * Required. The output uri of destination file.
   */
  outputUri?: string;
}

/**
 * Export folder destination of the data.
 */
export interface GoogleCloudDatalabelingV1p2alpha1GcsFolderDestination {
  /**
   * Required. Cloud Storage directory to export data to.
   */
  outputFolderUri?: string;
}

/**
 * Configuration for how human labeling task should be done.
 */
export interface GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig {
  /**
   * Optional. A human-readable description for AnnotatedDataset. The
   * description can be up to 10000 characters long.
   */
  annotatedDatasetDescription?: string;
  /**
   * Required. A human-readable name for AnnotatedDataset defined by users.
   * Maximum of 64 characters .
   */
  annotatedDatasetDisplayName?: string;
  /**
   * Optional. If you want your own labeling contributors to manage and work on
   * this labeling request, you can set these contributors here. We will give
   * them access to the question types in crowdcompute. Note that these emails
   * must be registered in crowdcompute worker UI:
   * https://crowd-compute.appspot.com/
   */
  contributorEmails?: string[];
  /**
   * Required. Instruction resource name.
   */
  instruction?: string;
  /**
   * Optional. A human-readable label used to logically group labeling tasks.
   * This string must match the regular expression `[a-zA-Z\\d_-]{0,128}`.
   */
  labelGroup?: string;
  /**
   * Optional. The Language of this question, as a
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). Default value is
   * en-US. Only need to set this when task is language related. For example,
   * French text classification.
   */
  languageCode?: string;
  /**
   * Optional. Maximum duration for contributors to answer a question. Maximum
   * is 3600 seconds. Default is 3600 seconds.
   */
  questionDuration?: number /* Duration */;
  /**
   * Optional. Replication of questions. Each question will be sent to up to
   * this number of contributors to label. Aggregated answers will be returned.
   * Default is set to 1. For image related labeling, valid values are 1, 3, 5.
   */
  replicaCount?: number;
  /**
   * Email of the user who started the labeling task and should be notified by
   * email. If empty no notification will be sent.
   */
  userEmailAddress?: string;
}

function serializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data: any): GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig {
  return {
    ...data,
    questionDuration: data["questionDuration"] !== undefined ? data["questionDuration"] : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data: any): GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig {
  return {
    ...data,
    questionDuration: data["questionDuration"] !== undefined ? data["questionDuration"] : undefined,
  };
}

/**
 * Metadata of an ImportData operation.
 */
export interface GoogleCloudDatalabelingV1p2alpha1ImportDataOperationMetadata {
  /**
   * Output only. Timestamp when import dataset request was created.
   */
  createTime?: Date;
  /**
   * Output only. The name of imported dataset. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Output only. Partial failures encountered. E.g. single files that couldn't
   * be read. Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
}

function serializeGoogleCloudDatalabelingV1p2alpha1ImportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1ImportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1ImportDataOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1ImportDataOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Response used for ImportData longrunning operation.
 */
export interface GoogleCloudDatalabelingV1p2alpha1ImportDataOperationResponse {
  /**
   * Ouptut only. The name of imported dataset.
   */
  dataset?: string;
  /**
   * Output only. Number of examples imported successfully.
   */
  importCount?: number;
  /**
   * Output only. Total number of examples requested to import
   */
  totalCount?: number;
}

/**
 * Details of a LabelImageBoundingBox operation metadata.
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of LabelImageBoundingPoly operation metadata.
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Metadata of a LabelImageClassification operation.
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelImageOrientedBoundingBox operation metadata.
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata {
  /**
   * Basic human annotation config.
   */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of LabelImagePolyline operation metadata.
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelImageSegmentation operation metadata.
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata {
  /**
   * Basic human annotation config.
   */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Metadata of a labeling operation, such as LabelImage or LabelVideo. Next
 * tag: 23
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelOperationMetadata {
  /**
   * Output only. The name of annotated dataset in format
   * "projects/*\/datasets/*\/annotatedDatasets/*".
   */
  annotatedDataset?: string;
  /**
   * Output only. Timestamp when labeling request was created.
   */
  createTime?: Date;
  /**
   * Output only. The name of dataset to be labeled. "projects/*\/datasets/*"
   */
  dataset?: string;
  /**
   * Details of label image bounding box operation.
   */
  imageBoundingBoxDetails?: GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata;
  /**
   * Details of label image bounding poly operation.
   */
  imageBoundingPolyDetails?: GoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata;
  /**
   * Details of label image classification operation.
   */
  imageClassificationDetails?: GoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata;
  /**
   * Details of label image oriented bounding box operation.
   */
  imageOrientedBoundingBoxDetails?: GoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata;
  /**
   * Details of label image polyline operation.
   */
  imagePolylineDetails?: GoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata;
  /**
   * Details of label image segmentation operation.
   */
  imageSegmentationDetails?: GoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata;
  /**
   * Output only. Partial failures encountered. E.g. single files that couldn't
   * be read. Status details field will contain standard GCP error details.
   */
  partialFailures?: GoogleRpcStatus[];
  /**
   * Output only. Progress of label operation. Range: [0, 100].
   */
  progressPercent?: number;
  /**
   * Details of label text classification operation.
   */
  textClassificationDetails?: GoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata;
  /**
   * Details of label text entity extraction operation.
   */
  textEntityExtractionDetails?: GoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata;
  /**
   * Details of label video classification operation.
   */
  videoClassificationDetails?: GoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata;
  /**
   * Details of label video event operation.
   */
  videoEventDetails?: GoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata;
  /**
   * Details of label video object detection operation.
   */
  videoObjectDetectionDetails?: GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata;
  /**
   * Details of label video object tracking operation.
   */
  videoObjectTrackingDetails?: GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata;
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    imageBoundingBoxDetails: data["imageBoundingBoxDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata(data["imageBoundingBoxDetails"]) : undefined,
    imageBoundingPolyDetails: data["imageBoundingPolyDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata(data["imageBoundingPolyDetails"]) : undefined,
    imageClassificationDetails: data["imageClassificationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata(data["imageClassificationDetails"]) : undefined,
    imageOrientedBoundingBoxDetails: data["imageOrientedBoundingBoxDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata(data["imageOrientedBoundingBoxDetails"]) : undefined,
    imagePolylineDetails: data["imagePolylineDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata(data["imagePolylineDetails"]) : undefined,
    imageSegmentationDetails: data["imageSegmentationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata(data["imageSegmentationDetails"]) : undefined,
    textClassificationDetails: data["textClassificationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata(data["textClassificationDetails"]) : undefined,
    textEntityExtractionDetails: data["textEntityExtractionDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata(data["textEntityExtractionDetails"]) : undefined,
    videoClassificationDetails: data["videoClassificationDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata(data["videoClassificationDetails"]) : undefined,
    videoEventDetails: data["videoEventDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata(data["videoEventDetails"]) : undefined,
    videoObjectDetectionDetails: data["videoObjectDetectionDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata(data["videoObjectDetectionDetails"]) : undefined,
    videoObjectTrackingDetails: data["videoObjectTrackingDetails"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata(data["videoObjectTrackingDetails"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    imageBoundingBoxDetails: data["imageBoundingBoxDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1LabelImageBoundingBoxOperationMetadata(data["imageBoundingBoxDetails"]) : undefined,
    imageBoundingPolyDetails: data["imageBoundingPolyDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1LabelImageBoundingPolyOperationMetadata(data["imageBoundingPolyDetails"]) : undefined,
    imageClassificationDetails: data["imageClassificationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1LabelImageClassificationOperationMetadata(data["imageClassificationDetails"]) : undefined,
    imageOrientedBoundingBoxDetails: data["imageOrientedBoundingBoxDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1LabelImageOrientedBoundingBoxOperationMetadata(data["imageOrientedBoundingBoxDetails"]) : undefined,
    imagePolylineDetails: data["imagePolylineDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1LabelImagePolylineOperationMetadata(data["imagePolylineDetails"]) : undefined,
    imageSegmentationDetails: data["imageSegmentationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1LabelImageSegmentationOperationMetadata(data["imageSegmentationDetails"]) : undefined,
    textClassificationDetails: data["textClassificationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata(data["textClassificationDetails"]) : undefined,
    textEntityExtractionDetails: data["textEntityExtractionDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata(data["textEntityExtractionDetails"]) : undefined,
    videoClassificationDetails: data["videoClassificationDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata(data["videoClassificationDetails"]) : undefined,
    videoEventDetails: data["videoEventDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata(data["videoEventDetails"]) : undefined,
    videoObjectDetectionDetails: data["videoObjectDetectionDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata(data["videoObjectDetectionDetails"]) : undefined,
    videoObjectTrackingDetails: data["videoObjectTrackingDetails"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata(data["videoObjectTrackingDetails"]) : undefined,
  };
}

/**
 * Statistics about annotation specs.
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelStats {
  /**
   * Map of each annotation spec's example count. Key is the annotation spec
   * name and value is the number of examples for that annotation spec. If the
   * annotated dataset does not have annotation spec, the map will return a pair
   * where the key is empty string and value is the total number of annotations.
   */
  exampleCount?: {
    [key: string]: bigint
  };
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelStats(data: any): GoogleCloudDatalabelingV1p2alpha1LabelStats {
  return {
    ...data,
    exampleCount: data["exampleCount"] !== undefined ? Object.fromEntries(Object.entries(data["exampleCount"]).map(([k, v]: [string, any]) => ([k, String(v)]))) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelStats(data: any): GoogleCloudDatalabelingV1p2alpha1LabelStats {
  return {
    ...data,
    exampleCount: data["exampleCount"] !== undefined ? Object.fromEntries(Object.entries(data["exampleCount"]).map(([k, v]: [string, any]) => ([k, BigInt(v)]))) : undefined,
  };
}

/**
 * Details of a LabelTextClassification operation metadata.
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelTextClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelTextEntityExtraction operation metadata.
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelTextEntityExtractionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoClassification operation metadata.
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelVideoClassificationOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoEvent operation metadata.
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelVideoEventOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoObjectDetection operation metadata.
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectDetectionOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * Details of a LabelVideoObjectTracking operation metadata.
 */
export interface GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata {
  /**
   * Basic human annotation config used in labeling request.
   */
  basicConfig?: GoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig;
}

function serializeGoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? serializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata(data: any): GoogleCloudDatalabelingV1p2alpha1LabelVideoObjectTrackingOperationMetadata {
  return {
    ...data,
    basicConfig: data["basicConfig"] !== undefined ? deserializeGoogleCloudDatalabelingV1p2alpha1HumanAnnotationConfig(data["basicConfig"]) : undefined,
  };
}

/**
 * The configuration of output data.
 */
export interface GoogleCloudDatalabelingV1p2alpha1OutputConfig {
  /**
   * Output to a file in Cloud Storage. Should be used for labeling output
   * other than image segmentation.
   */
  gcsDestination?: GoogleCloudDatalabelingV1p2alpha1GcsDestination;
  /**
   * Output to a folder in Cloud Storage. Should be used for image segmentation
   * or document de-identification labeling outputs.
   */
  gcsFolderDestination?: GoogleCloudDatalabelingV1p2alpha1GcsFolderDestination;
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
 * Additional options for DataLabeling#projectsAnnotationSpecSetsList.
 */
export interface ProjectsAnnotationSpecSetsListOptions {
  /**
   * Optional. Filter is not supported at this moment.
   */
  filter?: string;
  /**
   * Optional. Requested page size. Server may return fewer results than
   * requested. Default value is 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained by ListAnnotationSpecSetsResponse.next_page_token of the
   * previous [DataLabelingService.ListAnnotationSpecSets] call. Return first
   * page if empty.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DataLabeling#projectsDatasetsAnnotatedDatasetsDataItemsList.
 */
export interface ProjectsDatasetsAnnotatedDatasetsDataItemsListOptions {
  /**
   * Optional. Filter is not supported at this moment.
   */
  filter?: string;
  /**
   * Optional. Requested page size. Server may return fewer results than
   * requested. Default value is 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained by ListDataItemsResponse.next_page_token of the previous
   * [DataLabelingService.ListDataItems] call. Return first page if empty.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DataLabeling#projectsDatasetsAnnotatedDatasetsExamplesGet.
 */
export interface ProjectsDatasetsAnnotatedDatasetsExamplesGetOptions {
  /**
   * Optional. An expression for filtering Examples. Filter by
   * annotation_spec.display_name is supported. Format
   * "annotation_spec.display_name = {display_name}"
   */
  filter?: string;
}

/**
 * Additional options for
 * DataLabeling#projectsDatasetsAnnotatedDatasetsExamplesList.
 */
export interface ProjectsDatasetsAnnotatedDatasetsExamplesListOptions {
  /**
   * Optional. An expression for filtering Examples. For annotated datasets
   * that have annotation spec set, filter by annotation_spec.display_name is
   * supported. Format "annotation_spec.display_name = {display_name}"
   */
  filter?: string;
  /**
   * Optional. Requested page size. Server may return fewer results than
   * requested. Default value is 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained by ListExamplesResponse.next_page_token of the previous
   * [DataLabelingService.ListExamples] call. Return first page if empty.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DataLabeling#projectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesList.
 */
export interface ProjectsDatasetsAnnotatedDatasetsFeedbackThreadsFeedbackMessagesListOptions {
  /**
   * Optional. Requested page size. Server may return fewer results than
   * requested. Default value is 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained by ListFeedbackMessages.next_page_token of the previous
   * [DataLabelingService.ListFeedbackMessages] call. Return first page if
   * empty.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DataLabeling#projectsDatasetsAnnotatedDatasetsFeedbackThreadsList.
 */
export interface ProjectsDatasetsAnnotatedDatasetsFeedbackThreadsListOptions {
  /**
   * Optional. Requested page size. Server may return fewer results than
   * requested. Default value is 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained by ListFeedbackThreads.next_page_token of the previous
   * [DataLabelingService.ListFeedbackThreads] call. Return first page if empty.
   */
  pageToken?: string;
}

/**
 * Additional options for DataLabeling#projectsDatasetsAnnotatedDatasetsList.
 */
export interface ProjectsDatasetsAnnotatedDatasetsListOptions {
  /**
   * Optional. Filter is not supported at this moment.
   */
  filter?: string;
  /**
   * Optional. Requested page size. Server may return fewer results than
   * requested. Default value is 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained by ListAnnotatedDatasetsResponse.next_page_token of the
   * previous [DataLabelingService.ListAnnotatedDatasets] call. Return first
   * page if empty.
   */
  pageToken?: string;
}

/**
 * Additional options for DataLabeling#projectsDatasetsDataItemsList.
 */
export interface ProjectsDatasetsDataItemsListOptions {
  /**
   * Optional. Filter is not supported at this moment.
   */
  filter?: string;
  /**
   * Optional. Requested page size. Server may return fewer results than
   * requested. Default value is 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained by ListDataItemsResponse.next_page_token of the previous
   * [DataLabelingService.ListDataItems] call. Return first page if empty.
   */
  pageToken?: string;
}

/**
 * Additional options for DataLabeling#projectsDatasetsList.
 */
export interface ProjectsDatasetsListOptions {
  /**
   * Optional. Filter on dataset is not supported at this moment.
   */
  filter?: string;
  /**
   * Optional. Requested page size. Server may return fewer results than
   * requested. Default value is 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained by ListDatasetsResponse.next_page_token of the previous
   * [DataLabelingService.ListDatasets] call. Returns the first page if empty.
   */
  pageToken?: string;
}

/**
 * Additional options for DataLabeling#projectsEvaluationJobsList.
 */
export interface ProjectsEvaluationJobsListOptions {
  /**
   * Optional. You can filter the jobs to list by model_id (also known as
   * model_name, as described in EvaluationJob.modelVersion) or by evaluation
   * job state (as described in EvaluationJob.state). To filter by both
   * criteria, use the `AND` operator or the `OR` operator. For example, you can
   * use the following string for your filter: "evaluation_job.model_id =
   * {model_name} AND evaluation_job.state = {evaluation_job_state}"
   */
  filter?: string;
  /**
   * Optional. Requested page size. Server may return fewer results than
   * requested. Default value is 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained by the nextPageToken in the response to the previous
   * request. The request returns the first page if this is empty.
   */
  pageToken?: string;
}

/**
 * Additional options for DataLabeling#projectsEvaluationJobsPatch.
 */
export interface ProjectsEvaluationJobsPatchOptions {
  /**
   * Optional. Mask for which fields to update. You can only provide the
   * following fields: * `evaluationJobConfig.humanAnnotationConfig.instruction`
   * * `evaluationJobConfig.exampleCount` *
   * `evaluationJobConfig.exampleSamplePercentage` You can provide more than one
   * of these fields by separating them with commas.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsEvaluationJobsPatchOptions(data: any): ProjectsEvaluationJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsEvaluationJobsPatchOptions(data: any): ProjectsEvaluationJobsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for DataLabeling#projectsEvaluationsSearch.
 */
export interface ProjectsEvaluationsSearchOptions {
  /**
   * Optional. To search evaluations, you can filter by the following: *
   * evaluation_job.evaluation_job_id (the last part of EvaluationJob.name) *
   * evaluation_job.model_id (the {model_name} portion of
   * EvaluationJob.modelVersion) * evaluation_job.evaluation_job_run_time_start
   * (Minimum threshold for the evaluationJobRunTime that created the
   * evaluation) * evaluation_job.evaluation_job_run_time_end (Maximum threshold
   * for the evaluationJobRunTime that created the evaluation) *
   * evaluation_job.job_state (EvaluationJob.state) *
   * annotation_spec.display_name (the Evaluation contains a metric for the
   * annotation spec with this displayName) To filter by multiple critiera, use
   * the `AND` operator or the `OR` operator. The following examples shows a
   * string that filters by several critiera: "evaluation_job.evaluation_job_id
   * = {evaluation_job_id} AND evaluation_job.model_id = {model_name} AND
   * evaluation_job.evaluation_job_run_time_start = {timestamp_1} AND
   * evaluation_job.evaluation_job_run_time_end = {timestamp_2} AND
   * annotation_spec.display_name = {display_name}"
   */
  filter?: string;
  /**
   * Optional. Requested page size. Server may return fewer results than
   * requested. Default value is 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained by the nextPageToken of the response to a previous
   * search request. If you don't specify this field, the API call requests the
   * first page of the search.
   */
  pageToken?: string;
}

/**
 * Additional options for DataLabeling#projectsInstructionsList.
 */
export interface ProjectsInstructionsListOptions {
  /**
   * Optional. Filter is not supported at this moment.
   */
  filter?: string;
  /**
   * Optional. Requested page size. Server may return fewer results than
   * requested. Default value is 100.
   */
  pageSize?: number;
  /**
   * Optional. A token identifying a page of results for the server to return.
   * Typically obtained by ListInstructionsResponse.next_page_token of the
   * previous [DataLabelingService.ListInstructions] call. Return first page if
   * empty.
   */
  pageToken?: string;
}

/**
 * Additional options for DataLabeling#projectsOperationsList.
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
