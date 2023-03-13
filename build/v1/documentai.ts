// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Document AI API Client for Deno
 * =====================================
 * 
 * Service to parse structured information from unstructured or semi-structured documents using state-of-the-art Google AI such as natural language, computer vision, translation, and AutoML.
 * 
 * Docs: https://cloud.google.com/document-ai/docs/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Service to parse structured information from unstructured or semi-structured
 * documents using state-of-the-art Google AI such as natural language, computer
 * vision, translation, and AutoML.
 */
export class DocumentAI {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://documentai.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async operationsDelete(name: string): Promise<GoogleProtobufEmpty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobufEmpty;
  }

  /**
   * Fetches processor types. Note that we do not use ListProcessorTypes here
   * because it is not paginated.
   *
   * @param parent Required. The project of processor type to list. The available processor types may depend on the allow-listing on projects. Format: `projects/{project}/locations/{location}`
   */
  async projectsLocationsFetchProcessorTypes(parent: string): Promise<GoogleCloudDocumentaiV1FetchProcessorTypesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:fetchProcessorTypes`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDocumentaiV1FetchProcessorTypesResponse;
  }

  /**
   * Gets information about a location.
   *
   * @param name Resource name for the location.
   */
  async projectsLocationsGet(name: string): Promise<GoogleCloudLocationLocation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<GoogleLongrunningListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
   * LRO endpoint to batch process many documents. The output is written to
   * Cloud Storage as JSON in the [Document] format.
   *
   * @param name Required. The resource name of Processor or ProcessorVersion. Format: `projects/{project}/locations/{location}/processors/{processor}`, or `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}`
   */
  async projectsLocationsProcessorsBatchProcess(name: string, req: GoogleCloudDocumentaiV1BatchProcessRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDocumentaiV1BatchProcessRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:batchProcess`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Creates a processor from the type processor that the user chose. The
   * processor will be at "ENABLED" state by default after its creation.
   *
   * @param parent Required. The parent (project and location) under which to create the processor. Format: `projects/{project}/locations/{location}`
   */
  async projectsLocationsProcessorsCreate(parent: string, req: GoogleCloudDocumentaiV1Processor): Promise<GoogleCloudDocumentaiV1Processor> {
    req = serializeGoogleCloudDocumentaiV1Processor(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/processors`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDocumentaiV1Processor(data);
  }

  /**
   * Deletes the processor, unloads all deployed model artifacts if it was
   * enabled and then deletes all artifacts associated with this processor.
   *
   * @param name Required. The processor resource name to be deleted.
   */
  async projectsLocationsProcessorsDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Disables a processor
   *
   * @param name Required. The processor resource name to be disabled.
   */
  async projectsLocationsProcessorsDisable(name: string, req: GoogleCloudDocumentaiV1DisableProcessorRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:disable`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Enables a processor
   *
   * @param name Required. The processor resource name to be enabled.
   */
  async projectsLocationsProcessorsEnable(name: string, req: GoogleCloudDocumentaiV1EnableProcessorRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:enable`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets a processor detail.
   *
   * @param name Required. The processor resource name.
   */
  async projectsLocationsProcessorsGet(name: string): Promise<GoogleCloudDocumentaiV1Processor> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDocumentaiV1Processor(data);
  }

  /**
   * Send a document for Human Review. The input document should be processed
   * by the specified processor.
   *
   * @param humanReviewConfig Required. The resource name of the HumanReviewConfig that the document will be reviewed with.
   */
  async projectsLocationsProcessorsHumanReviewConfigReviewDocument(humanReviewConfig: string, req: GoogleCloudDocumentaiV1ReviewDocumentRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDocumentaiV1ReviewDocumentRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ humanReviewConfig }:reviewDocument`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Lists all processors which belong to this project.
   *
   * @param parent Required. The parent (project and location) which owns this collection of Processors. Format: `projects/{project}/locations/{location}`
   */
  async projectsLocationsProcessorsList(parent: string, opts: ProjectsLocationsProcessorsListOptions = {}): Promise<GoogleCloudDocumentaiV1ListProcessorsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/processors`);
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
    return deserializeGoogleCloudDocumentaiV1ListProcessorsResponse(data);
  }

  /**
   * Processes a single document.
   *
   * @param name Required. The resource name of the Processor or ProcessorVersion to use for processing. If a Processor is specified, the server will use its default version. Format: `projects/{project}/locations/{location}/processors/{processor}`, or `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}`
   */
  async projectsLocationsProcessorsProcess(name: string, req: GoogleCloudDocumentaiV1ProcessRequest): Promise<GoogleCloudDocumentaiV1ProcessResponse> {
    req = serializeGoogleCloudDocumentaiV1ProcessRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:process`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDocumentaiV1ProcessResponse(data);
  }

  /**
   * LRO endpoint to batch process many documents. The output is written to
   * Cloud Storage as JSON in the [Document] format.
   *
   * @param name Required. The resource name of Processor or ProcessorVersion. Format: `projects/{project}/locations/{location}/processors/{processor}`, or `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}`
   */
  async projectsLocationsProcessorsProcessorVersionsBatchProcess(name: string, req: GoogleCloudDocumentaiV1BatchProcessRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDocumentaiV1BatchProcessRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:batchProcess`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deletes the processor version, all artifacts under the processor version
   * will be deleted.
   *
   * @param name Required. The processor version resource name to be deleted.
   */
  async projectsLocationsProcessorsProcessorVersionsDelete(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Deploys the processor version.
   *
   * @param name Required. The processor version resource name to be deployed.
   */
  async projectsLocationsProcessorsProcessorVersionsDeploy(name: string, req: GoogleCloudDocumentaiV1DeployProcessorVersionRequest): Promise<GoogleLongrunningOperation> {
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
   * Evaluates a ProcessorVersion against annotated documents, producing an
   * Evaluation.
   *
   * @param processorVersion Required. The resource name of the ProcessorVersion to evaluate. `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}`
   */
  async projectsLocationsProcessorsProcessorVersionsEvaluateProcessorVersion(processorVersion: string, req: GoogleCloudDocumentaiV1EvaluateProcessorVersionRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ processorVersion }:evaluateProcessorVersion`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Retrieves a specific evaluation.
   *
   * @param name Required. The resource name of the Evaluation to get. `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}/evaluations/{evaluation}`
   */
  async projectsLocationsProcessorsProcessorVersionsEvaluationsGet(name: string): Promise<GoogleCloudDocumentaiV1Evaluation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDocumentaiV1Evaluation(data);
  }

  /**
   * Retrieves a set of evaluations for a given processor version.
   *
   * @param parent Required. The resource name of the ProcessorVersion to list evaluations for. `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}`
   */
  async projectsLocationsProcessorsProcessorVersionsEvaluationsList(parent: string, opts: ProjectsLocationsProcessorsProcessorVersionsEvaluationsListOptions = {}): Promise<GoogleCloudDocumentaiV1ListEvaluationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/evaluations`);
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
    return deserializeGoogleCloudDocumentaiV1ListEvaluationsResponse(data);
  }

  /**
   * Gets a processor version detail.
   *
   * @param name Required. The processor resource name.
   */
  async projectsLocationsProcessorsProcessorVersionsGet(name: string): Promise<GoogleCloudDocumentaiV1ProcessorVersion> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeGoogleCloudDocumentaiV1ProcessorVersion(data);
  }

  /**
   * Lists all versions of a processor.
   *
   * @param parent Required. The parent (project, location and processor) to list all versions. Format: `projects/{project}/locations/{location}/processors/{processor}`
   */
  async projectsLocationsProcessorsProcessorVersionsList(parent: string, opts: ProjectsLocationsProcessorsProcessorVersionsListOptions = {}): Promise<GoogleCloudDocumentaiV1ListProcessorVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/processorVersions`);
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
    return deserializeGoogleCloudDocumentaiV1ListProcessorVersionsResponse(data);
  }

  /**
   * Processes a single document.
   *
   * @param name Required. The resource name of the Processor or ProcessorVersion to use for processing. If a Processor is specified, the server will use its default version. Format: `projects/{project}/locations/{location}/processors/{processor}`, or `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}`
   */
  async projectsLocationsProcessorsProcessorVersionsProcess(name: string, req: GoogleCloudDocumentaiV1ProcessRequest): Promise<GoogleCloudDocumentaiV1ProcessResponse> {
    req = serializeGoogleCloudDocumentaiV1ProcessRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ name }:process`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeGoogleCloudDocumentaiV1ProcessResponse(data);
  }

  /**
   * Trains a new processor version. Operation metadata is returned as
   * cloud_documentai_core.TrainProcessorVersionMetadata.
   *
   * @param parent Required. The parent (project, location and processor) to create the new version for. Format: `projects/{project}/locations/{location}/processors/{processor}`.
   */
  async projectsLocationsProcessorsProcessorVersionsTrain(parent: string, req: GoogleCloudDocumentaiV1TrainProcessorVersionRequest): Promise<GoogleLongrunningOperation> {
    req = serializeGoogleCloudDocumentaiV1TrainProcessorVersionRequest(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/processorVersions:train`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Undeploys the processor version.
   *
   * @param name Required. The processor version resource name to be undeployed.
   */
  async projectsLocationsProcessorsProcessorVersionsUndeploy(name: string, req: GoogleCloudDocumentaiV1UndeployProcessorVersionRequest): Promise<GoogleLongrunningOperation> {
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
   * Set the default (active) version of a Processor that will be used in
   * ProcessDocument and BatchProcessDocuments.
   *
   * @param processor Required. The resource name of the Processor to change default version.
   */
  async projectsLocationsProcessorsSetDefaultProcessorVersion(processor: string, req: GoogleCloudDocumentaiV1SetDefaultProcessorVersionRequest): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ processor }:setDefaultProcessorVersion`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunningOperation;
  }

  /**
   * Gets a processor type detail.
   *
   * @param name Required. The processor type resource name.
   */
  async projectsLocationsProcessorTypesGet(name: string): Promise<GoogleCloudDocumentaiV1ProcessorType> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleCloudDocumentaiV1ProcessorType;
  }

  /**
   * Lists the processor types that exist.
   *
   * @param parent Required. The location of processor type to list. The available processor types may depend on the allow-listing on projects. Format: `projects/{project}/locations/{location}`
   */
  async projectsLocationsProcessorTypesList(parent: string, opts: ProjectsLocationsProcessorTypesListOptions = {}): Promise<GoogleCloudDocumentaiV1ListProcessorTypesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/processorTypes`);
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
    return data as GoogleCloudDocumentaiV1ListProcessorTypesResponse;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsOperationsGet(name: string): Promise<GoogleLongrunningOperation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunningOperation;
  }
}

/**
 * Metadata of the auto-labeling documents operation.
 */
export interface GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /**
   * The list of individual auto-labeling statuses of the dataset documents.
   */
  individualAutoLabelStatuses?: GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadataIndividualAutoLabelStatus[];
  /**
   * Total number of the auto-labeling documents.
   */
  totalDocumentCount?: number;
}

function serializeGoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadata(data: any): GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadata(data: any): GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The status of individual documents in the auto-labeling process.
 */
export interface GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsMetadataIndividualAutoLabelStatus {
  /**
   * The gcs_uri of the auto-labeling document, which uniquely identifies a
   * dataset document.
   */
  gcsUri?: string;
  /**
   * The status of the document auto-labeling.
   */
  status?: GoogleRpcStatus;
}

/**
 * The response proto of AutoLabelDocuments method.
 */
export interface GoogleCloudDocumentaiUiv1beta3AutoLabelDocumentsResponse {
}

export interface GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /**
   * Total number of documents that failed to be deleted in storage.
   */
  errorDocumentCount?: number;
  /**
   * The list of response details of each document.
   */
  individualBatchDeleteStatuses?: GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus[];
  /**
   * Total number of documents deleting from dataset.
   */
  totalDocumentCount?: number;
}

function serializeGoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadata(data: any): GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadata(data: any): GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The status of each individual document in the batch delete process.
 */
export interface GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsMetadataIndividualBatchDeleteStatus {
  /**
   * The document id of the document.
   */
  documentId?: GoogleCloudDocumentaiUiv1beta3DocumentId;
  /**
   * The status of deleting the document in storage.
   */
  status?: GoogleRpcStatus;
}

/**
 * Response of the delete documents operation.
 */
export interface GoogleCloudDocumentaiUiv1beta3BatchDeleteDocumentsResponse {
}

export interface GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /**
   * The destination dataset split type.
   */
  destDatasetType?:  | "DATASET_SPLIT_TYPE_UNSPECIFIED" | "DATASET_SPLIT_TRAIN" | "DATASET_SPLIT_TEST" | "DATASET_SPLIT_UNASSIGNED";
  /**
   * The destination dataset split type.
   */
  destSplitType?:  | "DATASET_SPLIT_TYPE_UNSPECIFIED" | "DATASET_SPLIT_TRAIN" | "DATASET_SPLIT_TEST" | "DATASET_SPLIT_UNASSIGNED";
  /**
   * The list of response details of each document.
   */
  individualBatchMoveStatuses?: GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadataIndividualBatchMoveStatus[];
}

function serializeGoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadata(data: any): GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadata(data: any): GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The status of each individual document in the batch move process.
 */
export interface GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsMetadataIndividualBatchMoveStatus {
  /**
   * The document id of the document.
   */
  documentId?: GoogleCloudDocumentaiUiv1beta3DocumentId;
  /**
   * The status of moving the document.
   */
  status?: GoogleRpcStatus;
}

/**
 * Response of the batch move documents operation.
 */
export interface GoogleCloudDocumentaiUiv1beta3BatchMoveDocumentsResponse {
}

/**
 * The common metadata for long running operations.
 */
export interface GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata {
  /**
   * The creation time of the operation.
   */
  createTime?: Date;
  /**
   * A related resource to this operation.
   */
  resource?: string;
  /**
   * The state of the operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "CANCELLING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
  /**
   * A message providing more details about the current state of processing.
   */
  stateMessage?: string;
  /**
   * The last update time of the operation.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data: any): GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data: any): GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The long running operation metadata for CreateLabelerPool.
 */
export interface GoogleCloudDocumentaiUiv1beta3CreateLabelerPoolOperationMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3CreateLabelerPoolOperationMetadata(data: any): GoogleCloudDocumentaiUiv1beta3CreateLabelerPoolOperationMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3CreateLabelerPoolOperationMetadata(data: any): GoogleCloudDocumentaiUiv1beta3CreateLabelerPoolOperationMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The long running operation metadata for DeleteLabelerPool.
 */
export interface GoogleCloudDocumentaiUiv1beta3DeleteLabelerPoolOperationMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3DeleteLabelerPoolOperationMetadata(data: any): GoogleCloudDocumentaiUiv1beta3DeleteLabelerPoolOperationMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3DeleteLabelerPoolOperationMetadata(data: any): GoogleCloudDocumentaiUiv1beta3DeleteLabelerPoolOperationMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The long running operation metadata for delete processor method.
 */
export interface GoogleCloudDocumentaiUiv1beta3DeleteProcessorMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3DeleteProcessorMetadata(data: any): GoogleCloudDocumentaiUiv1beta3DeleteProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3DeleteProcessorMetadata(data: any): GoogleCloudDocumentaiUiv1beta3DeleteProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The long running operation metadata for delete processor version method.
 */
export interface GoogleCloudDocumentaiUiv1beta3DeleteProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3DeleteProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3DeleteProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3DeleteProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3DeleteProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The long running operation metadata for deploy processor version method.
 */
export interface GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3DeployProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3DeployProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Response message for the deploy processor version method.
 */
export interface GoogleCloudDocumentaiUiv1beta3DeployProcessorVersionResponse {
}

/**
 * The long running operation metadata for disable processor method.
 */
export interface GoogleCloudDocumentaiUiv1beta3DisableProcessorMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3DisableProcessorMetadata(data: any): GoogleCloudDocumentaiUiv1beta3DisableProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3DisableProcessorMetadata(data: any): GoogleCloudDocumentaiUiv1beta3DisableProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Response message for the disable processor method. Intentionally empty proto
 * for adding fields in future.
 */
export interface GoogleCloudDocumentaiUiv1beta3DisableProcessorResponse {
}

/**
 * Document Identifier.
 */
export interface GoogleCloudDocumentaiUiv1beta3DocumentId {
  gcsManagedDocId?: GoogleCloudDocumentaiUiv1beta3DocumentIdGCSManagedDocumentId;
  /**
   * Points to a specific revision of the document if set.
   */
  revisionRef?: GoogleCloudDocumentaiUiv1beta3RevisionRef;
}

/**
 * Identifies a document uniquely within the scope of a dataset in the Cloud
 * Storage option.
 */
export interface GoogleCloudDocumentaiUiv1beta3DocumentIdGCSManagedDocumentId {
  /**
   * Id of the document (indexed) managed by Content Warehouse.
   */
  cwDocId?: string;
  /**
   * Required. The Cloud Storage uri where the actual document is stored.
   */
  gcsUri?: string;
}

/**
 * The long running operation metadata for enable processor method.
 */
export interface GoogleCloudDocumentaiUiv1beta3EnableProcessorMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3EnableProcessorMetadata(data: any): GoogleCloudDocumentaiUiv1beta3EnableProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3EnableProcessorMetadata(data: any): GoogleCloudDocumentaiUiv1beta3EnableProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Response message for the enable processor method. Intentionally empty proto
 * for adding fields in future.
 */
export interface GoogleCloudDocumentaiUiv1beta3EnableProcessorResponse {
}

/**
 * Metadata of the EvaluateProcessorVersion method.
 */
export interface GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Metadata of the EvaluateProcessorVersion method.
 */
export interface GoogleCloudDocumentaiUiv1beta3EvaluateProcessorVersionResponse {
  /**
   * The resource name of the created evaluation.
   */
  evaluation?: string;
}

/**
 * Metadata of the batch export documents operation.
 */
export interface GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /**
   * The list of response details of each document.
   */
  individualExportStatuses?: GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataIndividualExportStatus[];
  /**
   * The list of statistics for each dataset split type.
   */
  splitExportStats?: GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataSplitExportStat[];
}

function serializeGoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadata(data: any): GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadata(data: any): GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The status of each individual document in the export process.
 */
export interface GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataIndividualExportStatus {
  /**
   * The path to source docproto of the document.
   */
  documentId?: GoogleCloudDocumentaiUiv1beta3DocumentId;
  /**
   * The output_gcs_destination of the exported document if it was successful,
   * otherwise empty.
   */
  outputGcsDestination?: string;
  /**
   * The status of the exporting of the document.
   */
  status?: GoogleRpcStatus;
}

/**
 * The statistic representing a dataset split type for this export.
 */
export interface GoogleCloudDocumentaiUiv1beta3ExportDocumentsMetadataSplitExportStat {
  /**
   * The dataset split type.
   */
  splitType?:  | "DATASET_SPLIT_TYPE_UNSPECIFIED" | "DATASET_SPLIT_TRAIN" | "DATASET_SPLIT_TEST" | "DATASET_SPLIT_UNASSIGNED";
  /**
   * Total number of documents with the given dataset split type to be
   * exported.
   */
  totalDocumentCount?: number;
}

/**
 * The response proto of ExportDocuments method.
 */
export interface GoogleCloudDocumentaiUiv1beta3ExportDocumentsResponse {
}

/**
 * Metadata message associated with the ExportProcessorVersion operation.
 */
export interface GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionMetadata {
  /**
   * The common metadata about the operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3ExportProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3ExportProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Response message associated with the ExportProcessorVersion operation.
 */
export interface GoogleCloudDocumentaiUiv1beta3ExportProcessorVersionResponse {
  /**
   * The Cloud Storage URI containing the output artifacts.
   */
  gcsUri?: string;
}

/**
 * Metadata of the import document operation.
 */
export interface GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /**
   * Validation statuses of the batch documents import config.
   */
  importConfigValidationResults?: GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataImportConfigValidationResult[];
  /**
   * The list of response details of each document.
   */
  individualImportStatuses?: GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataIndividualImportStatus[];
  /**
   * Total number of the documents that are qualified for importing.
   */
  totalDocumentCount?: number;
}

function serializeGoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadata(data: any): GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadata(data: any): GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The validation status of each import config. Status is set to errors if
 * there is no documents to import in the import_config, or OK if the operation
 * will try to proceed at least one document.
 */
export interface GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataImportConfigValidationResult {
  /**
   * The source Cloud Storage URI specified in the import config.
   */
  inputGcsSource?: string;
  /**
   * The validation status of import config.
   */
  status?: GoogleRpcStatus;
}

/**
 * The status of each individual document in the import process.
 */
export interface GoogleCloudDocumentaiUiv1beta3ImportDocumentsMetadataIndividualImportStatus {
  /**
   * The source Cloud Storage URI of the document.
   */
  inputGcsSource?: string;
  /**
   * The output_gcs_destination of the processed document if it was successful,
   * otherwise empty.
   */
  outputGcsDestination?: string;
  /**
   * The status of the importing of the document.
   */
  status?: GoogleRpcStatus;
}

/**
 * Response of the import document operation.
 */
export interface GoogleCloudDocumentaiUiv1beta3ImportDocumentsResponse {
}

/**
 * The long running operation metadata for the ImportProcessorVersion method.
 */
export interface GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionMetadata {
  /**
   * The basic metadata for the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3ImportProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3ImportProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The response message for the ImportProcessorVersion method.
 */
export interface GoogleCloudDocumentaiUiv1beta3ImportProcessorVersionResponse {
  /**
   * The destination processor version name.
   */
  processorVersion?: string;
}

/**
 * The metadata proto of ResyncDataset method.
 */
export interface GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /**
   * The list of dataset resync statuses. Not checked when `dataset_documents`
   * is specified in ResyncRequest.
   */
  datasetResyncStatuses?: GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataDatasetResyncStatus[];
  /**
   * The list of document resync statuses. The same document could have
   * multiple `individual_document_resync_statuses` if it has multiple
   * inconsistencies.
   */
  individualDocumentResyncStatuses?: GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataIndividualDocumentResyncStatus[];
}

function serializeGoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadata(data: any): GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadata(data: any): GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Resync status against inconsistency types on the dataset level.
 */
export interface GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataDatasetResyncStatus {
  /**
   * The type of the inconsistency of the dataset.
   */
  datasetInconsistencyType?:  | "DATASET_INCONSISTENCY_TYPE_UNSPECIFIED" | "DATASET_INCONSISTENCY_TYPE_NO_STORAGE_MARKER";
  /**
   * The status of resyncing the dataset with regards to the detected
   * inconsistency. Empty if `validate_only` is true in the request.
   */
  status?: GoogleRpcStatus;
}

/**
 * Resync status for each document per inconsistency type.
 */
export interface GoogleCloudDocumentaiUiv1beta3ResyncDatasetMetadataIndividualDocumentResyncStatus {
  /**
   * The document identifier.
   */
  documentId?: GoogleCloudDocumentaiUiv1beta3DocumentId;
  /**
   * The type of document inconsistency.
   */
  documentInconsistencyType?:  | "DOCUMENT_INCONSISTENCY_TYPE_UNSPECIFIED" | "DOCUMENT_INCONSISTENCY_TYPE_INVALID_DOCPROTO" | "DOCUMENT_INCONSISTENCY_TYPE_MISMATCHED_METADATA" | "DOCUMENT_INCONSISTENCY_TYPE_NO_PAGE_IMAGE";
  /**
   * The status of resyncing the document with regards to the detected
   * inconsistency. Empty if `validate_only` is true in the request.
   */
  status?: GoogleRpcStatus;
}

/**
 * The response proto of ResyncDataset method.
 */
export interface GoogleCloudDocumentaiUiv1beta3ResyncDatasetResponse {
}

/**
 * The revision reference specifies which revision on the document to read.
 */
export interface GoogleCloudDocumentaiUiv1beta3RevisionRef {
  /**
   * Reads the revision generated by the processor version. The format takes
   * the full resource name of processor version.
   * `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}`
   */
  latestProcessorVersion?: string;
  /**
   * Reads the revision by the predefined case.
   */
  revisionCase?:  | "REVISION_CASE_UNSPECIFIED" | "LATEST_HUMAN_REVIEW" | "LATEST_TIMESTAMP" | "BASE_OCR_REVISION";
  /**
   * Reads the revision given by the id.
   */
  revisionId?: string;
}

/**
 * The long running operation metadata for set default processor version
 * method.
 */
export interface GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Response message for set default processor version method.
 */
export interface GoogleCloudDocumentaiUiv1beta3SetDefaultProcessorVersionResponse {
}

/**
 * The metadata that represents a processor version being created.
 */
export interface GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
  /**
   * The test dataset validation information.
   */
  testDatasetValidation?: GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadataDatasetValidation;
  /**
   * The training dataset validation information.
   */
  trainingDatasetValidation?: GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadataDatasetValidation;
}

function serializeGoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The dataset validation information. This includes any and all errors with
 * documents and the dataset.
 */
export interface GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionMetadataDatasetValidation {
  /**
   * The total number of dataset errors.
   */
  datasetErrorCount?: number;
  /**
   * Error information for the dataset as a whole. A maximum of 10 dataset
   * errors will be returned. A single dataset error is terminal for training.
   */
  datasetErrors?: GoogleRpcStatus[];
  /**
   * The total number of document errors.
   */
  documentErrorCount?: number;
  /**
   * Error information pertaining to specific documents. A maximum of 10
   * document errors will be returned. Any document with errors will not be used
   * throughout training.
   */
  documentErrors?: GoogleRpcStatus[];
}

/**
 * The response for the TrainProcessorVersion method.
 */
export interface GoogleCloudDocumentaiUiv1beta3TrainProcessorVersionResponse {
  /**
   * The resource name of the processor version produced by training.
   */
  processorVersion?: string;
}

/**
 * The long running operation metadata for the undeploy processor version
 * method.
 */
export interface GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionMetadata(data: any): GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Response message for the undeploy processor version method.
 */
export interface GoogleCloudDocumentaiUiv1beta3UndeployProcessorVersionResponse {
}

export interface GoogleCloudDocumentaiUiv1beta3UpdateDatasetOperationMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3UpdateDatasetOperationMetadata(data: any): GoogleCloudDocumentaiUiv1beta3UpdateDatasetOperationMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3UpdateDatasetOperationMetadata(data: any): GoogleCloudDocumentaiUiv1beta3UpdateDatasetOperationMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The long running operation metadata for updating the human review
 * configuration.
 */
export interface GoogleCloudDocumentaiUiv1beta3UpdateHumanReviewConfigMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3UpdateHumanReviewConfigMetadata(data: any): GoogleCloudDocumentaiUiv1beta3UpdateHumanReviewConfigMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3UpdateHumanReviewConfigMetadata(data: any): GoogleCloudDocumentaiUiv1beta3UpdateHumanReviewConfigMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The long running operation metadata for UpdateLabelerPool.
 */
export interface GoogleCloudDocumentaiUiv1beta3UpdateLabelerPoolOperationMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiUiv1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiUiv1beta3UpdateLabelerPoolOperationMetadata(data: any): GoogleCloudDocumentaiUiv1beta3UpdateLabelerPoolOperationMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiUiv1beta3UpdateLabelerPoolOperationMetadata(data: any): GoogleCloudDocumentaiUiv1beta3UpdateLabelerPoolOperationMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiUiv1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Encodes the detailed information of a barcode.
 */
export interface GoogleCloudDocumentaiV1Barcode {
  /**
   * Format of a barcode. The supported formats are: - `CODE_128`: Code 128
   * type. - `CODE_39`: Code 39 type. - `CODE_93`: Code 93 type. - `CODABAR`:
   * Codabar type. - `DATA_MATRIX`: 2D Data Matrix type. - `ITF`: ITF type. -
   * `EAN_13`: EAN-13 type. - `EAN_8`: EAN-8 type. - `QR_CODE`: 2D QR code type.
   * - `UPC_A`: UPC-A type. - `UPC_E`: UPC-E type. - `PDF417`: PDF417 type. -
   * `AZTEC`: 2D Aztec code type. - `DATABAR`: GS1 DataBar code type.
   */
  format?: string;
  /**
   * Raw value encoded in the barcode. For example:
   * `'MEBKM:TITLE:Google;URL:https://www.google.com;;'`.
   */
  rawValue?: string;
  /**
   * Value format describes the format of the value that a barcode encodes. The
   * supported formats are: - `CONTACT_INFO`: Contact information. - `EMAIL`:
   * Email address. - `ISBN`: ISBN identifier. - `PHONE`: Phone number. -
   * `PRODUCT`: Product. - `SMS`: SMS message. - `TEXT`: Text string. - `URL`:
   * URL address. - `WIFI`: Wifi information. - `GEO`: Geo-localization. -
   * `CALENDAR_EVENT`: Calendar event. - `DRIVER_LICENSE`: Driver's license.
   */
  valueFormat?: string;
}

/**
 * The common config to specify a set of documents used as input.
 */
export interface GoogleCloudDocumentaiV1BatchDocumentsInputConfig {
  /**
   * The set of documents individually specified on Cloud Storage.
   */
  gcsDocuments?: GoogleCloudDocumentaiV1GcsDocuments;
  /**
   * The set of documents that match the specified Cloud Storage `gcs_prefix`.
   */
  gcsPrefix?: GoogleCloudDocumentaiV1GcsPrefix;
}

/**
 * The long running operation metadata for batch process method.
 */
export interface GoogleCloudDocumentaiV1BatchProcessMetadata {
  /**
   * The creation time of the operation.
   */
  createTime?: Date;
  /**
   * The list of response details of each document.
   */
  individualProcessStatuses?: GoogleCloudDocumentaiV1BatchProcessMetadataIndividualProcessStatus[];
  /**
   * The state of the current batch processing.
   */
  state?:  | "STATE_UNSPECIFIED" | "WAITING" | "RUNNING" | "SUCCEEDED" | "CANCELLING" | "CANCELLED" | "FAILED";
  /**
   * A message providing more details about the current state of processing.
   * For example, the error message if the operation is failed.
   */
  stateMessage?: string;
  /**
   * The last update time of the operation.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDocumentaiV1BatchProcessMetadata(data: any): GoogleCloudDocumentaiV1BatchProcessMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1BatchProcessMetadata(data: any): GoogleCloudDocumentaiV1BatchProcessMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The status of a each individual document in the batch process.
 */
export interface GoogleCloudDocumentaiV1BatchProcessMetadataIndividualProcessStatus {
  /**
   * The status of human review on the processed document.
   */
  humanReviewStatus?: GoogleCloudDocumentaiV1HumanReviewStatus;
  /**
   * The source of the document, same as the [input_gcs_source] field in the
   * request when the batch process started. The batch process is started by
   * take snapshot of that document, since a user can move or change that
   * document during the process.
   */
  inputGcsSource?: string;
  /**
   * The output_gcs_destination (in the request as `output_gcs_destination`) of
   * the processed document if it was successful, otherwise empty.
   */
  outputGcsDestination?: string;
  /**
   * The status processing the document.
   */
  status?: GoogleRpcStatus;
}

/**
 * Request message for batch process document method.
 */
export interface GoogleCloudDocumentaiV1BatchProcessRequest {
  /**
   * The overall output config for batch process.
   */
  documentOutputConfig?: GoogleCloudDocumentaiV1DocumentOutputConfig;
  /**
   * The input documents for batch process.
   */
  inputDocuments?: GoogleCloudDocumentaiV1BatchDocumentsInputConfig;
  /**
   * Whether Human Review feature should be skipped for this request. Default
   * to false.
   */
  skipHumanReview?: boolean;
}

function serializeGoogleCloudDocumentaiV1BatchProcessRequest(data: any): GoogleCloudDocumentaiV1BatchProcessRequest {
  return {
    ...data,
    documentOutputConfig: data["documentOutputConfig"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentOutputConfig(data["documentOutputConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1BatchProcessRequest(data: any): GoogleCloudDocumentaiV1BatchProcessRequest {
  return {
    ...data,
    documentOutputConfig: data["documentOutputConfig"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentOutputConfig(data["documentOutputConfig"]) : undefined,
  };
}

/**
 * Response message for batch process document method.
 */
export interface GoogleCloudDocumentaiV1BatchProcessResponse {
}

/**
 * Encodes the detailed information of a barcode.
 */
export interface GoogleCloudDocumentaiV1beta1Barcode {
  /**
   * Format of a barcode. The supported formats are: - `CODE_128`: Code 128
   * type. - `CODE_39`: Code 39 type. - `CODE_93`: Code 93 type. - `CODABAR`:
   * Codabar type. - `DATA_MATRIX`: 2D Data Matrix type. - `ITF`: ITF type. -
   * `EAN_13`: EAN-13 type. - `EAN_8`: EAN-8 type. - `QR_CODE`: 2D QR code type.
   * - `UPC_A`: UPC-A type. - `UPC_E`: UPC-E type. - `PDF417`: PDF417 type. -
   * `AZTEC`: 2D Aztec code type. - `DATABAR`: GS1 DataBar code type.
   */
  format?: string;
  /**
   * Raw value encoded in the barcode. For example:
   * `'MEBKM:TITLE:Google;URL:https://www.google.com;;'`.
   */
  rawValue?: string;
  /**
   * Value format describes the format of the value that a barcode encodes. The
   * supported formats are: - `CONTACT_INFO`: Contact information. - `EMAIL`:
   * Email address. - `ISBN`: ISBN identifier. - `PHONE`: Phone number. -
   * `PRODUCT`: Product. - `SMS`: SMS message. - `TEXT`: Text string. - `URL`:
   * URL address. - `WIFI`: Wifi information. - `GEO`: Geo-localization. -
   * `CALENDAR_EVENT`: Calendar event. - `DRIVER_LICENSE`: Driver's license.
   */
  valueFormat?: string;
}

/**
 * Response to an batch document processing request. This is returned in the
 * LRO Operation after the operation is complete.
 */
export interface GoogleCloudDocumentaiV1beta1BatchProcessDocumentsResponse {
  /**
   * Responses for each individual document.
   */
  responses?: GoogleCloudDocumentaiV1beta1ProcessDocumentResponse[];
}

/**
 * A bounding polygon for the detected image annotation.
 */
export interface GoogleCloudDocumentaiV1beta1BoundingPoly {
  /**
   * The bounding polygon normalized vertices.
   */
  normalizedVertices?: GoogleCloudDocumentaiV1beta1NormalizedVertex[];
  /**
   * The bounding polygon vertices.
   */
  vertices?: GoogleCloudDocumentaiV1beta1Vertex[];
}

/**
 * Document represents the canonical document resource in Document AI. It is an
 * interchange format that provides insights into documents and allows for
 * collaboration between users and Document AI to iterate and optimize for
 * quality.
 */
export interface GoogleCloudDocumentaiV1beta1Document {
  /**
   * Optional. Inline document content, represented as a stream of bytes. Note:
   * As with all `bytes` fields, protobuffers use a pure binary representation,
   * whereas JSON representations use base64.
   */
  content?: Uint8Array;
  /**
   * A list of entities detected on Document.text. For document shards,
   * entities in this list may cross shard boundaries.
   */
  entities?: GoogleCloudDocumentaiV1beta1DocumentEntity[];
  /**
   * Placeholder. Relationship among Document.entities.
   */
  entityRelations?: GoogleCloudDocumentaiV1beta1DocumentEntityRelation[];
  /**
   * Any error that occurred while processing this document.
   */
  error?: GoogleRpcStatus;
  /**
   * An IANA published MIME type (also referred to as media type). For more
   * information, see
   * https://www.iana.org/assignments/media-types/media-types.xhtml.
   */
  mimeType?: string;
  /**
   * Visual page layout for the Document.
   */
  pages?: GoogleCloudDocumentaiV1beta1DocumentPage[];
  /**
   * Placeholder. Revision history of this document.
   */
  revisions?: GoogleCloudDocumentaiV1beta1DocumentRevision[];
  /**
   * Information about the sharding if this document is sharded part of a
   * larger document. If the document is not sharded, this message is not
   * specified.
   */
  shardInfo?: GoogleCloudDocumentaiV1beta1DocumentShardInfo;
  /**
   * Optional. UTF-8 encoded text in reading order from the document.
   */
  text?: string;
  /**
   * Placeholder. A list of text corrections made to Document.text. This is
   * usually used for annotating corrections to OCR mistakes. Text changes for a
   * given revision may not overlap with each other.
   */
  textChanges?: GoogleCloudDocumentaiV1beta1DocumentTextChange[];
  /**
   * Styles for the Document.text.
   */
  textStyles?: GoogleCloudDocumentaiV1beta1DocumentStyle[];
  /**
   * Optional. Currently supports Google Cloud Storage URI of the form
   * `gs://bucket_name/object_name`. Object versioning is not supported. See
   * [Google Cloud Storage Request
   * URIs](https://cloud.google.com/storage/docs/reference-uris) for more info.
   */
  uri?: string;
}

function serializeGoogleCloudDocumentaiV1beta1Document(data: any): GoogleCloudDocumentaiV1beta1Document {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
    entities: data["entities"] !== undefined ? data["entities"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentEntity(item))) : undefined,
    pages: data["pages"] !== undefined ? data["pages"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPage(item))) : undefined,
    revisions: data["revisions"] !== undefined ? data["revisions"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentRevision(item))) : undefined,
    shardInfo: data["shardInfo"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentShardInfo(data["shardInfo"]) : undefined,
    textChanges: data["textChanges"] !== undefined ? data["textChanges"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentTextChange(item))) : undefined,
    textStyles: data["textStyles"] !== undefined ? data["textStyles"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentStyle(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1Document(data: any): GoogleCloudDocumentaiV1beta1Document {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
    entities: data["entities"] !== undefined ? data["entities"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentEntity(item))) : undefined,
    pages: data["pages"] !== undefined ? data["pages"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPage(item))) : undefined,
    revisions: data["revisions"] !== undefined ? data["revisions"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentRevision(item))) : undefined,
    shardInfo: data["shardInfo"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentShardInfo(data["shardInfo"]) : undefined,
    textChanges: data["textChanges"] !== undefined ? data["textChanges"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentTextChange(item))) : undefined,
    textStyles: data["textStyles"] !== undefined ? data["textStyles"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentStyle(item))) : undefined,
  };
}

/**
 * An entity that could be a phrase in the text or a property that belongs to
 * the document. It is a known entity type, such as a person, an organization,
 * or location.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentEntity {
  /**
   * Optional. Confidence of detected Schema entity. Range `[0, 1]`.
   */
  confidence?: number;
  /**
   * Optional. Canonical id. This will be a unique value in the entity list for
   * this document.
   */
  id?: string;
  /**
   * Optional. Deprecated. Use `id` field instead.
   */
  mentionId?: string;
  /**
   * Optional. Text value of the entity e.g. `1600 Amphitheatre Pkwy`.
   */
  mentionText?: string;
  /**
   * Optional. Normalized entity value. Absent if the extracted value could not
   * be converted or the type (e.g. address) is not supported for certain
   * parsers. This field is also only populated for certain supported document
   * types.
   */
  normalizedValue?: GoogleCloudDocumentaiV1beta1DocumentEntityNormalizedValue;
  /**
   * Optional. Represents the provenance of this entity wrt. the location on
   * the page where it was found.
   */
  pageAnchor?: GoogleCloudDocumentaiV1beta1DocumentPageAnchor;
  /**
   * Optional. Entities can be nested to form a hierarchical data structure
   * representing the content in the document.
   */
  properties?: GoogleCloudDocumentaiV1beta1DocumentEntity[];
  /**
   * Optional. The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta1DocumentProvenance;
  /**
   * Optional. Whether the entity will be redacted for de-identification
   * purposes.
   */
  redacted?: boolean;
  /**
   * Optional. Provenance of the entity. Text anchor indexing into the
   * Document.text.
   */
  textAnchor?: GoogleCloudDocumentaiV1beta1DocumentTextAnchor;
  /**
   * Required. Entity type from a schema e.g. `Address`.
   */
  type?: string;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentEntity(data: any): GoogleCloudDocumentaiV1beta1DocumentEntity {
  return {
    ...data,
    normalizedValue: data["normalizedValue"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentEntityNormalizedValue(data["normalizedValue"]) : undefined,
    pageAnchor: data["pageAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageAnchor(data["pageAnchor"]) : undefined,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentEntity(item))) : undefined,
    textAnchor: data["textAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentEntity(data: any): GoogleCloudDocumentaiV1beta1DocumentEntity {
  return {
    ...data,
    normalizedValue: data["normalizedValue"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentEntityNormalizedValue(data["normalizedValue"]) : undefined,
    pageAnchor: data["pageAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageAnchor(data["pageAnchor"]) : undefined,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentEntity(item))) : undefined,
    textAnchor: data["textAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

/**
 * Parsed and normalized entity value.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentEntityNormalizedValue {
  /**
   * Postal address. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/postal_address.proto
   */
  addressValue?: GoogleTypePostalAddress;
  /**
   * Boolean value. Can be used for entities with binary values, or for
   * checkboxes.
   */
  booleanValue?: boolean;
  /**
   * DateTime value. Includes date, time, and timezone. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/datetime.proto
   */
  datetimeValue?: GoogleTypeDateTime;
  /**
   * Date value. Includes year, month, day. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/date.proto
   */
  dateValue?: GoogleTypeDate;
  /**
   * Float value.
   */
  floatValue?: number;
  /**
   * Integer value.
   */
  integerValue?: number;
  /**
   * Money value. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/money.proto
   */
  moneyValue?: GoogleTypeMoney;
  /**
   * Optional. An optional field to store a normalized string. For some entity
   * types, one of respective `structured_value` fields may also be populated.
   * Also not all the types of `structured_value` will be normalized. For
   * example, some processors may not generate `float` or `integer` normalized
   * text by default. Below are sample formats mapped to structured values. -
   * Money/Currency type (`money_value`) is in the ISO 4217 text format. - Date
   * type (`date_value`) is in the ISO 8601 text format. - Datetime type
   * (`datetime_value`) is in the ISO 8601 text format.
   */
  text?: string;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentEntityNormalizedValue(data: any): GoogleCloudDocumentaiV1beta1DocumentEntityNormalizedValue {
  return {
    ...data,
    datetimeValue: data["datetimeValue"] !== undefined ? serializeGoogleTypeDateTime(data["datetimeValue"]) : undefined,
    moneyValue: data["moneyValue"] !== undefined ? serializeGoogleTypeMoney(data["moneyValue"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentEntityNormalizedValue(data: any): GoogleCloudDocumentaiV1beta1DocumentEntityNormalizedValue {
  return {
    ...data,
    datetimeValue: data["datetimeValue"] !== undefined ? deserializeGoogleTypeDateTime(data["datetimeValue"]) : undefined,
    moneyValue: data["moneyValue"] !== undefined ? deserializeGoogleTypeMoney(data["moneyValue"]) : undefined,
  };
}

/**
 * Relationship between Entities.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentEntityRelation {
  /**
   * Object entity id.
   */
  objectId?: string;
  /**
   * Relationship description.
   */
  relation?: string;
  /**
   * Subject entity id.
   */
  subjectId?: string;
}

/**
 * A page in a Document.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPage {
  /**
   * A list of visually detected text blocks on the page. A block has a set of
   * lines (collected into paragraphs) that have a common line-spacing and
   * orientation.
   */
  blocks?: GoogleCloudDocumentaiV1beta1DocumentPageBlock[];
  /**
   * A list of detected barcodes.
   */
  detectedBarcodes?: GoogleCloudDocumentaiV1beta1DocumentPageDetectedBarcode[];
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta1DocumentPageDetectedLanguage[];
  /**
   * Physical dimension of the page.
   */
  dimension?: GoogleCloudDocumentaiV1beta1DocumentPageDimension;
  /**
   * A list of visually detected form fields on the page.
   */
  formFields?: GoogleCloudDocumentaiV1beta1DocumentPageFormField[];
  /**
   * Rendered image for this page. This image is preprocessed to remove any
   * skew, rotation, and distortions such that the annotation bounding boxes can
   * be upright and axis-aligned.
   */
  image?: GoogleCloudDocumentaiV1beta1DocumentPageImage;
  /**
   * Image Quality Scores.
   */
  imageQualityScores?: GoogleCloudDocumentaiV1beta1DocumentPageImageQualityScores;
  /**
   * Layout for the page.
   */
  layout?: GoogleCloudDocumentaiV1beta1DocumentPageLayout;
  /**
   * A list of visually detected text lines on the page. A collection of tokens
   * that a human would perceive as a line.
   */
  lines?: GoogleCloudDocumentaiV1beta1DocumentPageLine[];
  /**
   * 1-based index for current Page in a parent Document. Useful when a page is
   * taken out of a Document for individual processing.
   */
  pageNumber?: number;
  /**
   * A list of visually detected text paragraphs on the page. A collection of
   * lines that a human would perceive as a paragraph.
   */
  paragraphs?: GoogleCloudDocumentaiV1beta1DocumentPageParagraph[];
  /**
   * The history of this page.
   */
  provenance?: GoogleCloudDocumentaiV1beta1DocumentProvenance;
  /**
   * A list of visually detected symbols on the page.
   */
  symbols?: GoogleCloudDocumentaiV1beta1DocumentPageSymbol[];
  /**
   * A list of visually detected tables on the page.
   */
  tables?: GoogleCloudDocumentaiV1beta1DocumentPageTable[];
  /**
   * A list of visually detected tokens on the page.
   */
  tokens?: GoogleCloudDocumentaiV1beta1DocumentPageToken[];
  /**
   * Transformation matrices that were applied to the original document image
   * to produce Page.image.
   */
  transforms?: GoogleCloudDocumentaiV1beta1DocumentPageMatrix[];
  /**
   * A list of detected non-text visual elements e.g. checkbox, signature etc.
   * on the page.
   */
  visualElements?: GoogleCloudDocumentaiV1beta1DocumentPageVisualElement[];
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPage(data: any): GoogleCloudDocumentaiV1beta1DocumentPage {
  return {
    ...data,
    blocks: data["blocks"] !== undefined ? data["blocks"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageBlock(item))) : undefined,
    detectedBarcodes: data["detectedBarcodes"] !== undefined ? data["detectedBarcodes"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageDetectedBarcode(item))) : undefined,
    formFields: data["formFields"] !== undefined ? data["formFields"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageFormField(item))) : undefined,
    image: data["image"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageImage(data["image"]) : undefined,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
    lines: data["lines"] !== undefined ? data["lines"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageLine(item))) : undefined,
    paragraphs: data["paragraphs"] !== undefined ? data["paragraphs"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageParagraph(item))) : undefined,
    symbols: data["symbols"] !== undefined ? data["symbols"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageSymbol(item))) : undefined,
    tables: data["tables"] !== undefined ? data["tables"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageTable(item))) : undefined,
    tokens: data["tokens"] !== undefined ? data["tokens"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageToken(item))) : undefined,
    transforms: data["transforms"] !== undefined ? data["transforms"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageMatrix(item))) : undefined,
    visualElements: data["visualElements"] !== undefined ? data["visualElements"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageVisualElement(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPage(data: any): GoogleCloudDocumentaiV1beta1DocumentPage {
  return {
    ...data,
    blocks: data["blocks"] !== undefined ? data["blocks"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageBlock(item))) : undefined,
    detectedBarcodes: data["detectedBarcodes"] !== undefined ? data["detectedBarcodes"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageDetectedBarcode(item))) : undefined,
    formFields: data["formFields"] !== undefined ? data["formFields"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageFormField(item))) : undefined,
    image: data["image"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageImage(data["image"]) : undefined,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
    lines: data["lines"] !== undefined ? data["lines"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageLine(item))) : undefined,
    paragraphs: data["paragraphs"] !== undefined ? data["paragraphs"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageParagraph(item))) : undefined,
    symbols: data["symbols"] !== undefined ? data["symbols"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageSymbol(item))) : undefined,
    tables: data["tables"] !== undefined ? data["tables"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageTable(item))) : undefined,
    tokens: data["tokens"] !== undefined ? data["tokens"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageToken(item))) : undefined,
    transforms: data["transforms"] !== undefined ? data["transforms"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageMatrix(item))) : undefined,
    visualElements: data["visualElements"] !== undefined ? data["visualElements"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageVisualElement(item))) : undefined,
  };
}

/**
 * Referencing the visual context of the entity in the Document.pages. Page
 * anchors can be cross-page, consist of multiple bounding polygons and
 * optionally reference specific layout element types.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageAnchor {
  /**
   * One or more references to visual page elements
   */
  pageRefs?: GoogleCloudDocumentaiV1beta1DocumentPageAnchorPageRef[];
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageAnchor(data: any): GoogleCloudDocumentaiV1beta1DocumentPageAnchor {
  return {
    ...data,
    pageRefs: data["pageRefs"] !== undefined ? data["pageRefs"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageAnchorPageRef(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageAnchor(data: any): GoogleCloudDocumentaiV1beta1DocumentPageAnchor {
  return {
    ...data,
    pageRefs: data["pageRefs"] !== undefined ? data["pageRefs"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageAnchorPageRef(item))) : undefined,
  };
}

/**
 * Represents a weak reference to a page element within a document.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageAnchorPageRef {
  /**
   * Optional. Identifies the bounding polygon of a layout element on the page.
   */
  boundingPoly?: GoogleCloudDocumentaiV1beta1BoundingPoly;
  /**
   * Optional. Confidence of detected page element, if applicable. Range `[0,
   * 1]`.
   */
  confidence?: number;
  /**
   * Optional. Deprecated. Use PageRef.bounding_poly instead.
   */
  layoutId?: string;
  /**
   * Optional. The type of the layout element that is being referenced if any.
   */
  layoutType?:  | "LAYOUT_TYPE_UNSPECIFIED" | "BLOCK" | "PARAGRAPH" | "LINE" | "TOKEN" | "VISUAL_ELEMENT" | "TABLE" | "FORM_FIELD";
  /**
   * Required. Index into the Document.pages element, for example using
   * `Document.pages` to locate the related page element. This field is skipped
   * when its value is the default `0`. See
   * https://developers.google.com/protocol-buffers/docs/proto3#json.
   */
  page?: bigint;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageAnchorPageRef(data: any): GoogleCloudDocumentaiV1beta1DocumentPageAnchorPageRef {
  return {
    ...data,
    page: data["page"] !== undefined ? String(data["page"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageAnchorPageRef(data: any): GoogleCloudDocumentaiV1beta1DocumentPageAnchorPageRef {
  return {
    ...data,
    page: data["page"] !== undefined ? BigInt(data["page"]) : undefined,
  };
}

/**
 * A block has a set of lines (collected into paragraphs) that have a common
 * line-spacing and orientation.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageBlock {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta1DocumentPageDetectedLanguage[];
  /**
   * Layout for Block.
   */
  layout?: GoogleCloudDocumentaiV1beta1DocumentPageLayout;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta1DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageBlock(data: any): GoogleCloudDocumentaiV1beta1DocumentPageBlock {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageBlock(data: any): GoogleCloudDocumentaiV1beta1DocumentPageBlock {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A detected barcode.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageDetectedBarcode {
  /**
   * Detailed barcode information of the DetectedBarcode.
   */
  barcode?: GoogleCloudDocumentaiV1beta1Barcode;
  /**
   * Layout for DetectedBarcode.
   */
  layout?: GoogleCloudDocumentaiV1beta1DocumentPageLayout;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageDetectedBarcode(data: any): GoogleCloudDocumentaiV1beta1DocumentPageDetectedBarcode {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageDetectedBarcode(data: any): GoogleCloudDocumentaiV1beta1DocumentPageDetectedBarcode {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * Detected language for a structural component.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageDetectedLanguage {
  /**
   * Confidence of detected language. Range `[0, 1]`.
   */
  confidence?: number;
  /**
   * The BCP-47 language code, such as `en-US` or `sr-Latn`. For more
   * information, see
   * https://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

/**
 * Dimension for the page.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageDimension {
  /**
   * Page height.
   */
  height?: number;
  /**
   * Dimension unit.
   */
  unit?: string;
  /**
   * Page width.
   */
  width?: number;
}

/**
 * A form field detected on the page.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageFormField {
  /**
   * Created for Labeling UI to export key text. If corrections were made to
   * the text identified by the `field_name.text_anchor`, this field will
   * contain the correction.
   */
  correctedKeyText?: string;
  /**
   * Created for Labeling UI to export value text. If corrections were made to
   * the text identified by the `field_value.text_anchor`, this field will
   * contain the correction.
   */
  correctedValueText?: string;
  /**
   * Layout for the FormField name. e.g. `Address`, `Email`, `Grand total`,
   * `Phone number`, etc.
   */
  fieldName?: GoogleCloudDocumentaiV1beta1DocumentPageLayout;
  /**
   * Layout for the FormField value.
   */
  fieldValue?: GoogleCloudDocumentaiV1beta1DocumentPageLayout;
  /**
   * A list of detected languages for name together with confidence.
   */
  nameDetectedLanguages?: GoogleCloudDocumentaiV1beta1DocumentPageDetectedLanguage[];
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta1DocumentProvenance;
  /**
   * A list of detected languages for value together with confidence.
   */
  valueDetectedLanguages?: GoogleCloudDocumentaiV1beta1DocumentPageDetectedLanguage[];
  /**
   * If the value is non-textual, this field represents the type. Current valid
   * values are: - blank (this indicates the `field_value` is normal text) -
   * `unfilled_checkbox` - `filled_checkbox`
   */
  valueType?: string;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageFormField(data: any): GoogleCloudDocumentaiV1beta1DocumentPageFormField {
  return {
    ...data,
    fieldName: data["fieldName"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["fieldName"]) : undefined,
    fieldValue: data["fieldValue"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["fieldValue"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageFormField(data: any): GoogleCloudDocumentaiV1beta1DocumentPageFormField {
  return {
    ...data,
    fieldName: data["fieldName"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["fieldName"]) : undefined,
    fieldValue: data["fieldValue"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["fieldValue"]) : undefined,
  };
}

/**
 * Rendered image contents for this page.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageImage {
  /**
   * Raw byte content of the image.
   */
  content?: Uint8Array;
  /**
   * Height of the image in pixels.
   */
  height?: number;
  /**
   * Encoding mime type for the image.
   */
  mimeType?: string;
  /**
   * Width of the image in pixels.
   */
  width?: number;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageImage(data: any): GoogleCloudDocumentaiV1beta1DocumentPageImage {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageImage(data: any): GoogleCloudDocumentaiV1beta1DocumentPageImage {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * Image Quality Scores for the page image
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageImageQualityScores {
  /**
   * A list of detected defects.
   */
  detectedDefects?: GoogleCloudDocumentaiV1beta1DocumentPageImageQualityScoresDetectedDefect[];
  /**
   * The overall quality score. Range `[0, 1]` where 1 is perfect quality.
   */
  qualityScore?: number;
}

/**
 * Image Quality Defects
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageImageQualityScoresDetectedDefect {
  /**
   * Confidence of detected defect. Range `[0, 1]` where 1 indicates strong
   * confidence of that the defect exists.
   */
  confidence?: number;
  /**
   * Name of the defect type. Supported values are: - `quality/defect_blurry` -
   * `quality/defect_noisy` - `quality/defect_dark` - `quality/defect_faint` -
   * `quality/defect_text_too_small` - `quality/defect_document_cutoff` -
   * `quality/defect_text_cutoff` - `quality/defect_glare`
   */
  type?: string;
}

/**
 * Visual element describing a layout unit on a page.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageLayout {
  /**
   * The bounding polygon for the Layout.
   */
  boundingPoly?: GoogleCloudDocumentaiV1beta1BoundingPoly;
  /**
   * Confidence of the current Layout within context of the object this layout
   * is for. e.g. confidence can be for a single token, a table, a visual
   * element, etc. depending on context. Range `[0, 1]`.
   */
  confidence?: number;
  /**
   * Detected orientation for the Layout.
   */
  orientation?:  | "ORIENTATION_UNSPECIFIED" | "PAGE_UP" | "PAGE_RIGHT" | "PAGE_DOWN" | "PAGE_LEFT";
  /**
   * Text anchor indexing into the Document.text.
   */
  textAnchor?: GoogleCloudDocumentaiV1beta1DocumentTextAnchor;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data: any): GoogleCloudDocumentaiV1beta1DocumentPageLayout {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data: any): GoogleCloudDocumentaiV1beta1DocumentPageLayout {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

/**
 * A collection of tokens that a human would perceive as a line. Does not cross
 * column boundaries, can be horizontal, vertical, etc.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageLine {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta1DocumentPageDetectedLanguage[];
  /**
   * Layout for Line.
   */
  layout?: GoogleCloudDocumentaiV1beta1DocumentPageLayout;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta1DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageLine(data: any): GoogleCloudDocumentaiV1beta1DocumentPageLine {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageLine(data: any): GoogleCloudDocumentaiV1beta1DocumentPageLine {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * Representation for transformation matrix, intended to be compatible and used
 * with OpenCV format for image manipulation.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageMatrix {
  /**
   * Number of columns in the matrix.
   */
  cols?: number;
  /**
   * The matrix data.
   */
  data?: Uint8Array;
  /**
   * Number of rows in the matrix.
   */
  rows?: number;
  /**
   * This encodes information about what data type the matrix uses. For
   * example, 0 (CV_8U) is an unsigned 8-bit image. For the full list of OpenCV
   * primitive data types, please refer to
   * https://docs.opencv.org/4.3.0/d1/d1b/group__core__hal__interface.html
   */
  type?: number;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageMatrix(data: any): GoogleCloudDocumentaiV1beta1DocumentPageMatrix {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageMatrix(data: any): GoogleCloudDocumentaiV1beta1DocumentPageMatrix {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

/**
 * A collection of lines that a human would perceive as a paragraph.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageParagraph {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta1DocumentPageDetectedLanguage[];
  /**
   * Layout for Paragraph.
   */
  layout?: GoogleCloudDocumentaiV1beta1DocumentPageLayout;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta1DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageParagraph(data: any): GoogleCloudDocumentaiV1beta1DocumentPageParagraph {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageParagraph(data: any): GoogleCloudDocumentaiV1beta1DocumentPageParagraph {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A detected symbol.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageSymbol {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta1DocumentPageDetectedLanguage[];
  /**
   * Layout for Symbol.
   */
  layout?: GoogleCloudDocumentaiV1beta1DocumentPageLayout;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageSymbol(data: any): GoogleCloudDocumentaiV1beta1DocumentPageSymbol {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageSymbol(data: any): GoogleCloudDocumentaiV1beta1DocumentPageSymbol {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A table representation similar to HTML table structure.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageTable {
  /**
   * Body rows of the table.
   */
  bodyRows?: GoogleCloudDocumentaiV1beta1DocumentPageTableTableRow[];
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta1DocumentPageDetectedLanguage[];
  /**
   * Header rows of the table.
   */
  headerRows?: GoogleCloudDocumentaiV1beta1DocumentPageTableTableRow[];
  /**
   * Layout for Table.
   */
  layout?: GoogleCloudDocumentaiV1beta1DocumentPageLayout;
  /**
   * The history of this table.
   */
  provenance?: GoogleCloudDocumentaiV1beta1DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageTable(data: any): GoogleCloudDocumentaiV1beta1DocumentPageTable {
  return {
    ...data,
    bodyRows: data["bodyRows"] !== undefined ? data["bodyRows"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageTableTableRow(item))) : undefined,
    headerRows: data["headerRows"] !== undefined ? data["headerRows"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageTableTableRow(item))) : undefined,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageTable(data: any): GoogleCloudDocumentaiV1beta1DocumentPageTable {
  return {
    ...data,
    bodyRows: data["bodyRows"] !== undefined ? data["bodyRows"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageTableTableRow(item))) : undefined,
    headerRows: data["headerRows"] !== undefined ? data["headerRows"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageTableTableRow(item))) : undefined,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A cell representation inside the table.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageTableTableCell {
  /**
   * How many columns this cell spans.
   */
  colSpan?: number;
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta1DocumentPageDetectedLanguage[];
  /**
   * Layout for TableCell.
   */
  layout?: GoogleCloudDocumentaiV1beta1DocumentPageLayout;
  /**
   * How many rows this cell spans.
   */
  rowSpan?: number;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageTableTableCell(data: any): GoogleCloudDocumentaiV1beta1DocumentPageTableTableCell {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageTableTableCell(data: any): GoogleCloudDocumentaiV1beta1DocumentPageTableTableCell {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A row of table cells.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageTableTableRow {
  /**
   * Cells that make up this row.
   */
  cells?: GoogleCloudDocumentaiV1beta1DocumentPageTableTableCell[];
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageTableTableRow(data: any): GoogleCloudDocumentaiV1beta1DocumentPageTableTableRow {
  return {
    ...data,
    cells: data["cells"] !== undefined ? data["cells"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentPageTableTableCell(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageTableTableRow(data: any): GoogleCloudDocumentaiV1beta1DocumentPageTableTableRow {
  return {
    ...data,
    cells: data["cells"] !== undefined ? data["cells"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentPageTableTableCell(item))) : undefined,
  };
}

/**
 * A detected token.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageToken {
  /**
   * Detected break at the end of a Token.
   */
  detectedBreak?: GoogleCloudDocumentaiV1beta1DocumentPageTokenDetectedBreak;
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta1DocumentPageDetectedLanguage[];
  /**
   * Layout for Token.
   */
  layout?: GoogleCloudDocumentaiV1beta1DocumentPageLayout;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta1DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageToken(data: any): GoogleCloudDocumentaiV1beta1DocumentPageToken {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageToken(data: any): GoogleCloudDocumentaiV1beta1DocumentPageToken {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * Detected break at the end of a Token.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageTokenDetectedBreak {
  /**
   * Detected break type.
   */
  type?:  | "TYPE_UNSPECIFIED" | "SPACE" | "WIDE_SPACE" | "HYPHEN";
}

/**
 * Detected non-text visual elements e.g. checkbox, signature etc. on the page.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentPageVisualElement {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta1DocumentPageDetectedLanguage[];
  /**
   * Layout for VisualElement.
   */
  layout?: GoogleCloudDocumentaiV1beta1DocumentPageLayout;
  /**
   * Type of the VisualElement.
   */
  type?: string;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentPageVisualElement(data: any): GoogleCloudDocumentaiV1beta1DocumentPageVisualElement {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentPageVisualElement(data: any): GoogleCloudDocumentaiV1beta1DocumentPageVisualElement {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * Structure to identify provenance relationships between annotations in
 * different revisions.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentProvenance {
  /**
   * The Id of this operation. Needs to be unique within the scope of the
   * revision.
   */
  id?: number;
  /**
   * References to the original elements that are replaced.
   */
  parents?: GoogleCloudDocumentaiV1beta1DocumentProvenanceParent[];
  /**
   * The index of the revision that produced this element.
   */
  revision?: number;
  /**
   * The type of provenance operation.
   */
  type?:  | "OPERATION_TYPE_UNSPECIFIED" | "ADD" | "REMOVE" | "UPDATE" | "REPLACE" | "EVAL_REQUESTED" | "EVAL_APPROVED" | "EVAL_SKIPPED";
}

/**
 * The parent element the current element is based on. Used for
 * referencing/aligning, removal and replacement operations.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentProvenanceParent {
  /**
   * The id of the parent provenance.
   */
  id?: number;
  /**
   * The index of the parent item in the corresponding item list (eg. list of
   * entities, properties within entities, etc.) in the parent revision.
   */
  index?: number;
  /**
   * The index of the index into current revision's parent_ids list.
   */
  revision?: number;
}

/**
 * Contains past or forward revisions of this document.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentRevision {
  /**
   * If the change was made by a person specify the name or id of that person.
   */
  agent?: string;
  /**
   * The time that the revision was created, internally generated by doc proto
   * storage at the time of create.
   */
  createTime?: Date;
  /**
   * Human Review information of this revision.
   */
  humanReview?: GoogleCloudDocumentaiV1beta1DocumentRevisionHumanReview;
  /**
   * Id of the revision, internally generated by doc proto storage. Unique
   * within the context of the document.
   */
  id?: string;
  /**
   * The revisions that this revision is based on. This can include one or more
   * parent (when documents are merged.) This field represents the index into
   * the `revisions` field.
   */
  parent?: number[];
  /**
   * The revisions that this revision is based on. Must include all the ids
   * that have anything to do with this revision - eg. there are
   * `provenance.parent.revision` fields that index into this field.
   */
  parentIds?: string[];
  /**
   * If the annotation was made by processor identify the processor by its
   * resource name.
   */
  processor?: string;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentRevision(data: any): GoogleCloudDocumentaiV1beta1DocumentRevision {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentRevision(data: any): GoogleCloudDocumentaiV1beta1DocumentRevision {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Human Review information of the document.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentRevisionHumanReview {
  /**
   * Human review state. e.g. `requested`, `succeeded`, `rejected`.
   */
  state?: string;
  /**
   * A message providing more details about the current state of processing.
   * For example, the rejection reason when the state is `rejected`.
   */
  stateMessage?: string;
}

/**
 * For a large document, sharding may be performed to produce several document
 * shards. Each document shard contains this field to detail which shard it is.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentShardInfo {
  /**
   * Total number of shards.
   */
  shardCount?: bigint;
  /**
   * The 0-based index of this shard.
   */
  shardIndex?: bigint;
  /**
   * The index of the first character in Document.text in the overall document
   * global text.
   */
  textOffset?: bigint;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentShardInfo(data: any): GoogleCloudDocumentaiV1beta1DocumentShardInfo {
  return {
    ...data,
    shardCount: data["shardCount"] !== undefined ? String(data["shardCount"]) : undefined,
    shardIndex: data["shardIndex"] !== undefined ? String(data["shardIndex"]) : undefined,
    textOffset: data["textOffset"] !== undefined ? String(data["textOffset"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentShardInfo(data: any): GoogleCloudDocumentaiV1beta1DocumentShardInfo {
  return {
    ...data,
    shardCount: data["shardCount"] !== undefined ? BigInt(data["shardCount"]) : undefined,
    shardIndex: data["shardIndex"] !== undefined ? BigInt(data["shardIndex"]) : undefined,
    textOffset: data["textOffset"] !== undefined ? BigInt(data["textOffset"]) : undefined,
  };
}

/**
 * Annotation for common text style attributes. This adheres to CSS conventions
 * as much as possible.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentStyle {
  /**
   * Text background color.
   */
  backgroundColor?: GoogleTypeColor;
  /**
   * Text color.
   */
  color?: GoogleTypeColor;
  /**
   * Font family such as `Arial`, `Times New Roman`.
   * https://www.w3schools.com/cssref/pr_font_font-family.asp
   */
  fontFamily?: string;
  /**
   * Font size.
   */
  fontSize?: GoogleCloudDocumentaiV1beta1DocumentStyleFontSize;
  /**
   * Font weight. Possible values are normal, bold, bolder, and lighter.
   * https://www.w3schools.com/cssref/pr_font_weight.asp
   */
  fontWeight?: string;
  /**
   * Text anchor indexing into the Document.text.
   */
  textAnchor?: GoogleCloudDocumentaiV1beta1DocumentTextAnchor;
  /**
   * Text decoration. Follows CSS standard.
   * https://www.w3schools.com/cssref/pr_text_text-decoration.asp
   */
  textDecoration?: string;
  /**
   * Text style. Possible values are normal, italic, and oblique.
   * https://www.w3schools.com/cssref/pr_font_font-style.asp
   */
  textStyle?: string;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentStyle(data: any): GoogleCloudDocumentaiV1beta1DocumentStyle {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentStyle(data: any): GoogleCloudDocumentaiV1beta1DocumentStyle {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

/**
 * Font size with unit.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentStyleFontSize {
  /**
   * Font size for the text.
   */
  size?: number;
  /**
   * Unit for the font size. Follows CSS naming (in, px, pt, etc.).
   */
  unit?: string;
}

/**
 * Text reference indexing into the Document.text.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentTextAnchor {
  /**
   * Contains the content of the text span so that users do not have to look it
   * up in the text_segments. It is always populated for formFields.
   */
  content?: string;
  /**
   * The text segments from the Document.text.
   */
  textSegments?: GoogleCloudDocumentaiV1beta1DocumentTextAnchorTextSegment[];
}

function serializeGoogleCloudDocumentaiV1beta1DocumentTextAnchor(data: any): GoogleCloudDocumentaiV1beta1DocumentTextAnchor {
  return {
    ...data,
    textSegments: data["textSegments"] !== undefined ? data["textSegments"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta1DocumentTextAnchorTextSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentTextAnchor(data: any): GoogleCloudDocumentaiV1beta1DocumentTextAnchor {
  return {
    ...data,
    textSegments: data["textSegments"] !== undefined ? data["textSegments"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta1DocumentTextAnchorTextSegment(item))) : undefined,
  };
}

/**
 * A text segment in the Document.text. The indices may be out of bounds which
 * indicate that the text extends into another document shard for large sharded
 * documents. See ShardInfo.text_offset
 */
export interface GoogleCloudDocumentaiV1beta1DocumentTextAnchorTextSegment {
  /**
   * TextSegment half open end UTF-8 char index in the Document.text.
   */
  endIndex?: bigint;
  /**
   * TextSegment start UTF-8 char index in the Document.text.
   */
  startIndex?: bigint;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentTextAnchorTextSegment(data: any): GoogleCloudDocumentaiV1beta1DocumentTextAnchorTextSegment {
  return {
    ...data,
    endIndex: data["endIndex"] !== undefined ? String(data["endIndex"]) : undefined,
    startIndex: data["startIndex"] !== undefined ? String(data["startIndex"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentTextAnchorTextSegment(data: any): GoogleCloudDocumentaiV1beta1DocumentTextAnchorTextSegment {
  return {
    ...data,
    endIndex: data["endIndex"] !== undefined ? BigInt(data["endIndex"]) : undefined,
    startIndex: data["startIndex"] !== undefined ? BigInt(data["startIndex"]) : undefined,
  };
}

/**
 * This message is used for text changes aka. OCR corrections.
 */
export interface GoogleCloudDocumentaiV1beta1DocumentTextChange {
  /**
   * The text that replaces the text identified in the `text_anchor`.
   */
  changedText?: string;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta1DocumentProvenance[];
  /**
   * Provenance of the correction. Text anchor indexing into the Document.text.
   * There can only be a single `TextAnchor.text_segments` element. If the start
   * and end index of the text segment are the same, the text change is inserted
   * before that index.
   */
  textAnchor?: GoogleCloudDocumentaiV1beta1DocumentTextAnchor;
}

function serializeGoogleCloudDocumentaiV1beta1DocumentTextChange(data: any): GoogleCloudDocumentaiV1beta1DocumentTextChange {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1beta1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1DocumentTextChange(data: any): GoogleCloudDocumentaiV1beta1DocumentTextChange {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

/**
 * The Google Cloud Storage location where the output file will be written to.
 */
export interface GoogleCloudDocumentaiV1beta1GcsDestination {
  uri?: string;
}

/**
 * The Google Cloud Storage location where the input file will be read from.
 */
export interface GoogleCloudDocumentaiV1beta1GcsSource {
  uri?: string;
}

/**
 * The desired input location and metadata.
 */
export interface GoogleCloudDocumentaiV1beta1InputConfig {
  /**
   * The Google Cloud Storage location to read the input from. This must be a
   * single file.
   */
  gcsSource?: GoogleCloudDocumentaiV1beta1GcsSource;
  /**
   * Required. Mimetype of the input. Current supported mimetypes are
   * application/pdf, image/tiff, and image/gif. In addition, application/json
   * type is supported for requests with ProcessDocumentRequest.automl_params
   * field set. The JSON file needs to be in Document format.
   */
  mimeType?: string;
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface GoogleCloudDocumentaiV1beta1NormalizedVertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate (starts from the top of the image).
   */
  y?: number;
}

/**
 * Contains metadata for the BatchProcessDocuments operation.
 */
export interface GoogleCloudDocumentaiV1beta1OperationMetadata {
  /**
   * The creation time of the operation.
   */
  createTime?: Date;
  /**
   * The state of the current batch processing.
   */
  state?:  | "STATE_UNSPECIFIED" | "ACCEPTED" | "WAITING" | "RUNNING" | "SUCCEEDED" | "CANCELLED" | "FAILED";
  /**
   * A message providing more details about the current state of processing.
   */
  stateMessage?: string;
  /**
   * The last update time of the operation.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDocumentaiV1beta1OperationMetadata(data: any): GoogleCloudDocumentaiV1beta1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta1OperationMetadata(data: any): GoogleCloudDocumentaiV1beta1OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The desired output location and metadata.
 */
export interface GoogleCloudDocumentaiV1beta1OutputConfig {
  /**
   * The Google Cloud Storage location to write the output to.
   */
  gcsDestination?: GoogleCloudDocumentaiV1beta1GcsDestination;
  /**
   * The max number of pages to include into each output Document shard JSON on
   * Google Cloud Storage. The valid range is [1, 100]. If not specified, the
   * default value is 20. For example, for one pdf file with 100 pages, 100
   * parsed pages will be produced. If `pages_per_shard` = 20, then 5 Document
   * shard JSON files each containing 20 parsed pages will be written under the
   * prefix OutputConfig.gcs_destination.uri and suffix pages-x-to-y.json where
   * x and y are 1-indexed page numbers. Example GCS outputs with 157 pages and
   * pages_per_shard = 50: pages-001-to-050.json pages-051-to-100.json
   * pages-101-to-150.json pages-151-to-157.json
   */
  pagesPerShard?: number;
}

/**
 * Response to a single document processing request.
 */
export interface GoogleCloudDocumentaiV1beta1ProcessDocumentResponse {
  /**
   * Information about the input file. This is the same as the corresponding
   * input config in the request.
   */
  inputConfig?: GoogleCloudDocumentaiV1beta1InputConfig;
  /**
   * The output location of the parsed responses. The responses are written to
   * this location as JSON-serialized `Document` objects.
   */
  outputConfig?: GoogleCloudDocumentaiV1beta1OutputConfig;
}

/**
 * A vertex represents a 2D point in the image. NOTE: the vertex coordinates
 * are in the same scale as the original image.
 */
export interface GoogleCloudDocumentaiV1beta1Vertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate (starts from the top of the image).
   */
  y?: number;
}

/**
 * Encodes the detailed information of a barcode.
 */
export interface GoogleCloudDocumentaiV1beta2Barcode {
  /**
   * Format of a barcode. The supported formats are: - `CODE_128`: Code 128
   * type. - `CODE_39`: Code 39 type. - `CODE_93`: Code 93 type. - `CODABAR`:
   * Codabar type. - `DATA_MATRIX`: 2D Data Matrix type. - `ITF`: ITF type. -
   * `EAN_13`: EAN-13 type. - `EAN_8`: EAN-8 type. - `QR_CODE`: 2D QR code type.
   * - `UPC_A`: UPC-A type. - `UPC_E`: UPC-E type. - `PDF417`: PDF417 type. -
   * `AZTEC`: 2D Aztec code type. - `DATABAR`: GS1 DataBar code type.
   */
  format?: string;
  /**
   * Raw value encoded in the barcode. For example:
   * `'MEBKM:TITLE:Google;URL:https://www.google.com;;'`.
   */
  rawValue?: string;
  /**
   * Value format describes the format of the value that a barcode encodes. The
   * supported formats are: - `CONTACT_INFO`: Contact information. - `EMAIL`:
   * Email address. - `ISBN`: ISBN identifier. - `PHONE`: Phone number. -
   * `PRODUCT`: Product. - `SMS`: SMS message. - `TEXT`: Text string. - `URL`:
   * URL address. - `WIFI`: Wifi information. - `GEO`: Geo-localization. -
   * `CALENDAR_EVENT`: Calendar event. - `DRIVER_LICENSE`: Driver's license.
   */
  valueFormat?: string;
}

/**
 * Response to an batch document processing request. This is returned in the
 * LRO Operation after the operation is complete.
 */
export interface GoogleCloudDocumentaiV1beta2BatchProcessDocumentsResponse {
  /**
   * Responses for each individual document.
   */
  responses?: GoogleCloudDocumentaiV1beta2ProcessDocumentResponse[];
}

function serializeGoogleCloudDocumentaiV1beta2BatchProcessDocumentsResponse(data: any): GoogleCloudDocumentaiV1beta2BatchProcessDocumentsResponse {
  return {
    ...data,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2ProcessDocumentResponse(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2BatchProcessDocumentsResponse(data: any): GoogleCloudDocumentaiV1beta2BatchProcessDocumentsResponse {
  return {
    ...data,
    responses: data["responses"] !== undefined ? data["responses"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2ProcessDocumentResponse(item))) : undefined,
  };
}

/**
 * A bounding polygon for the detected image annotation.
 */
export interface GoogleCloudDocumentaiV1beta2BoundingPoly {
  /**
   * The bounding polygon normalized vertices.
   */
  normalizedVertices?: GoogleCloudDocumentaiV1beta2NormalizedVertex[];
  /**
   * The bounding polygon vertices.
   */
  vertices?: GoogleCloudDocumentaiV1beta2Vertex[];
}

/**
 * Document represents the canonical document resource in Document AI. It is an
 * interchange format that provides insights into documents and allows for
 * collaboration between users and Document AI to iterate and optimize for
 * quality.
 */
export interface GoogleCloudDocumentaiV1beta2Document {
  /**
   * Optional. Inline document content, represented as a stream of bytes. Note:
   * As with all `bytes` fields, protobuffers use a pure binary representation,
   * whereas JSON representations use base64.
   */
  content?: Uint8Array;
  /**
   * A list of entities detected on Document.text. For document shards,
   * entities in this list may cross shard boundaries.
   */
  entities?: GoogleCloudDocumentaiV1beta2DocumentEntity[];
  /**
   * Placeholder. Relationship among Document.entities.
   */
  entityRelations?: GoogleCloudDocumentaiV1beta2DocumentEntityRelation[];
  /**
   * Any error that occurred while processing this document.
   */
  error?: GoogleRpcStatus;
  /**
   * Labels for this document.
   */
  labels?: GoogleCloudDocumentaiV1beta2DocumentLabel[];
  /**
   * An IANA published MIME type (also referred to as media type). For more
   * information, see
   * https://www.iana.org/assignments/media-types/media-types.xhtml.
   */
  mimeType?: string;
  /**
   * Visual page layout for the Document.
   */
  pages?: GoogleCloudDocumentaiV1beta2DocumentPage[];
  /**
   * Placeholder. Revision history of this document.
   */
  revisions?: GoogleCloudDocumentaiV1beta2DocumentRevision[];
  /**
   * Information about the sharding if this document is sharded part of a
   * larger document. If the document is not sharded, this message is not
   * specified.
   */
  shardInfo?: GoogleCloudDocumentaiV1beta2DocumentShardInfo;
  /**
   * Optional. UTF-8 encoded text in reading order from the document.
   */
  text?: string;
  /**
   * Placeholder. A list of text corrections made to Document.text. This is
   * usually used for annotating corrections to OCR mistakes. Text changes for a
   * given revision may not overlap with each other.
   */
  textChanges?: GoogleCloudDocumentaiV1beta2DocumentTextChange[];
  /**
   * Styles for the Document.text.
   */
  textStyles?: GoogleCloudDocumentaiV1beta2DocumentStyle[];
  /**
   * Optional. Currently supports Google Cloud Storage URI of the form
   * `gs://bucket_name/object_name`. Object versioning is not supported. See
   * [Google Cloud Storage Request
   * URIs](https://cloud.google.com/storage/docs/reference-uris) for more info.
   */
  uri?: string;
}

function serializeGoogleCloudDocumentaiV1beta2Document(data: any): GoogleCloudDocumentaiV1beta2Document {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
    entities: data["entities"] !== undefined ? data["entities"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentEntity(item))) : undefined,
    pages: data["pages"] !== undefined ? data["pages"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPage(item))) : undefined,
    revisions: data["revisions"] !== undefined ? data["revisions"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentRevision(item))) : undefined,
    shardInfo: data["shardInfo"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentShardInfo(data["shardInfo"]) : undefined,
    textChanges: data["textChanges"] !== undefined ? data["textChanges"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentTextChange(item))) : undefined,
    textStyles: data["textStyles"] !== undefined ? data["textStyles"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentStyle(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2Document(data: any): GoogleCloudDocumentaiV1beta2Document {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
    entities: data["entities"] !== undefined ? data["entities"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentEntity(item))) : undefined,
    pages: data["pages"] !== undefined ? data["pages"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPage(item))) : undefined,
    revisions: data["revisions"] !== undefined ? data["revisions"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentRevision(item))) : undefined,
    shardInfo: data["shardInfo"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentShardInfo(data["shardInfo"]) : undefined,
    textChanges: data["textChanges"] !== undefined ? data["textChanges"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentTextChange(item))) : undefined,
    textStyles: data["textStyles"] !== undefined ? data["textStyles"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentStyle(item))) : undefined,
  };
}

/**
 * An entity that could be a phrase in the text or a property that belongs to
 * the document. It is a known entity type, such as a person, an organization,
 * or location.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentEntity {
  /**
   * Optional. Confidence of detected Schema entity. Range `[0, 1]`.
   */
  confidence?: number;
  /**
   * Optional. Canonical id. This will be a unique value in the entity list for
   * this document.
   */
  id?: string;
  /**
   * Optional. Deprecated. Use `id` field instead.
   */
  mentionId?: string;
  /**
   * Optional. Text value of the entity e.g. `1600 Amphitheatre Pkwy`.
   */
  mentionText?: string;
  /**
   * Optional. Normalized entity value. Absent if the extracted value could not
   * be converted or the type (e.g. address) is not supported for certain
   * parsers. This field is also only populated for certain supported document
   * types.
   */
  normalizedValue?: GoogleCloudDocumentaiV1beta2DocumentEntityNormalizedValue;
  /**
   * Optional. Represents the provenance of this entity wrt. the location on
   * the page where it was found.
   */
  pageAnchor?: GoogleCloudDocumentaiV1beta2DocumentPageAnchor;
  /**
   * Optional. Entities can be nested to form a hierarchical data structure
   * representing the content in the document.
   */
  properties?: GoogleCloudDocumentaiV1beta2DocumentEntity[];
  /**
   * Optional. The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta2DocumentProvenance;
  /**
   * Optional. Whether the entity will be redacted for de-identification
   * purposes.
   */
  redacted?: boolean;
  /**
   * Optional. Provenance of the entity. Text anchor indexing into the
   * Document.text.
   */
  textAnchor?: GoogleCloudDocumentaiV1beta2DocumentTextAnchor;
  /**
   * Required. Entity type from a schema e.g. `Address`.
   */
  type?: string;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentEntity(data: any): GoogleCloudDocumentaiV1beta2DocumentEntity {
  return {
    ...data,
    normalizedValue: data["normalizedValue"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentEntityNormalizedValue(data["normalizedValue"]) : undefined,
    pageAnchor: data["pageAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageAnchor(data["pageAnchor"]) : undefined,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentEntity(item))) : undefined,
    textAnchor: data["textAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentEntity(data: any): GoogleCloudDocumentaiV1beta2DocumentEntity {
  return {
    ...data,
    normalizedValue: data["normalizedValue"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentEntityNormalizedValue(data["normalizedValue"]) : undefined,
    pageAnchor: data["pageAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageAnchor(data["pageAnchor"]) : undefined,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentEntity(item))) : undefined,
    textAnchor: data["textAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

/**
 * Parsed and normalized entity value.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentEntityNormalizedValue {
  /**
   * Postal address. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/postal_address.proto
   */
  addressValue?: GoogleTypePostalAddress;
  /**
   * Boolean value. Can be used for entities with binary values, or for
   * checkboxes.
   */
  booleanValue?: boolean;
  /**
   * DateTime value. Includes date, time, and timezone. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/datetime.proto
   */
  datetimeValue?: GoogleTypeDateTime;
  /**
   * Date value. Includes year, month, day. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/date.proto
   */
  dateValue?: GoogleTypeDate;
  /**
   * Float value.
   */
  floatValue?: number;
  /**
   * Integer value.
   */
  integerValue?: number;
  /**
   * Money value. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/money.proto
   */
  moneyValue?: GoogleTypeMoney;
  /**
   * Optional. An optional field to store a normalized string. For some entity
   * types, one of respective `structured_value` fields may also be populated.
   * Also not all the types of `structured_value` will be normalized. For
   * example, some processors may not generate `float` or `integer` normalized
   * text by default. Below are sample formats mapped to structured values. -
   * Money/Currency type (`money_value`) is in the ISO 4217 text format. - Date
   * type (`date_value`) is in the ISO 8601 text format. - Datetime type
   * (`datetime_value`) is in the ISO 8601 text format.
   */
  text?: string;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentEntityNormalizedValue(data: any): GoogleCloudDocumentaiV1beta2DocumentEntityNormalizedValue {
  return {
    ...data,
    datetimeValue: data["datetimeValue"] !== undefined ? serializeGoogleTypeDateTime(data["datetimeValue"]) : undefined,
    moneyValue: data["moneyValue"] !== undefined ? serializeGoogleTypeMoney(data["moneyValue"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentEntityNormalizedValue(data: any): GoogleCloudDocumentaiV1beta2DocumentEntityNormalizedValue {
  return {
    ...data,
    datetimeValue: data["datetimeValue"] !== undefined ? deserializeGoogleTypeDateTime(data["datetimeValue"]) : undefined,
    moneyValue: data["moneyValue"] !== undefined ? deserializeGoogleTypeMoney(data["moneyValue"]) : undefined,
  };
}

/**
 * Relationship between Entities.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentEntityRelation {
  /**
   * Object entity id.
   */
  objectId?: string;
  /**
   * Relationship description.
   */
  relation?: string;
  /**
   * Subject entity id.
   */
  subjectId?: string;
}

/**
 * Label attaches schema information and/or other metadata to segments within a
 * Document. Multiple Labels on a single field can denote either different
 * labels, different instances of the same label created at different times, or
 * some combination of both.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentLabel {
  /**
   * Label is generated AutoML model. This field stores the full resource name
   * of the AutoML model. Format:
   * `projects/{project-id}/locations/{location-id}/models/{model-id}`
   */
  automlModel?: string;
  /**
   * Confidence score between 0 and 1 for label assignment.
   */
  confidence?: number;
  /**
   * Name of the label. When the label is generated from AutoML Text
   * Classification model, this field represents the name of the category.
   */
  name?: string;
}

/**
 * A page in a Document.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPage {
  /**
   * A list of visually detected text blocks on the page. A block has a set of
   * lines (collected into paragraphs) that have a common line-spacing and
   * orientation.
   */
  blocks?: GoogleCloudDocumentaiV1beta2DocumentPageBlock[];
  /**
   * A list of detected barcodes.
   */
  detectedBarcodes?: GoogleCloudDocumentaiV1beta2DocumentPageDetectedBarcode[];
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta2DocumentPageDetectedLanguage[];
  /**
   * Physical dimension of the page.
   */
  dimension?: GoogleCloudDocumentaiV1beta2DocumentPageDimension;
  /**
   * A list of visually detected form fields on the page.
   */
  formFields?: GoogleCloudDocumentaiV1beta2DocumentPageFormField[];
  /**
   * Rendered image for this page. This image is preprocessed to remove any
   * skew, rotation, and distortions such that the annotation bounding boxes can
   * be upright and axis-aligned.
   */
  image?: GoogleCloudDocumentaiV1beta2DocumentPageImage;
  /**
   * Image Quality Scores.
   */
  imageQualityScores?: GoogleCloudDocumentaiV1beta2DocumentPageImageQualityScores;
  /**
   * Layout for the page.
   */
  layout?: GoogleCloudDocumentaiV1beta2DocumentPageLayout;
  /**
   * A list of visually detected text lines on the page. A collection of tokens
   * that a human would perceive as a line.
   */
  lines?: GoogleCloudDocumentaiV1beta2DocumentPageLine[];
  /**
   * 1-based index for current Page in a parent Document. Useful when a page is
   * taken out of a Document for individual processing.
   */
  pageNumber?: number;
  /**
   * A list of visually detected text paragraphs on the page. A collection of
   * lines that a human would perceive as a paragraph.
   */
  paragraphs?: GoogleCloudDocumentaiV1beta2DocumentPageParagraph[];
  /**
   * The history of this page.
   */
  provenance?: GoogleCloudDocumentaiV1beta2DocumentProvenance;
  /**
   * A list of visually detected symbols on the page.
   */
  symbols?: GoogleCloudDocumentaiV1beta2DocumentPageSymbol[];
  /**
   * A list of visually detected tables on the page.
   */
  tables?: GoogleCloudDocumentaiV1beta2DocumentPageTable[];
  /**
   * A list of visually detected tokens on the page.
   */
  tokens?: GoogleCloudDocumentaiV1beta2DocumentPageToken[];
  /**
   * Transformation matrices that were applied to the original document image
   * to produce Page.image.
   */
  transforms?: GoogleCloudDocumentaiV1beta2DocumentPageMatrix[];
  /**
   * A list of detected non-text visual elements e.g. checkbox, signature etc.
   * on the page.
   */
  visualElements?: GoogleCloudDocumentaiV1beta2DocumentPageVisualElement[];
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPage(data: any): GoogleCloudDocumentaiV1beta2DocumentPage {
  return {
    ...data,
    blocks: data["blocks"] !== undefined ? data["blocks"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageBlock(item))) : undefined,
    detectedBarcodes: data["detectedBarcodes"] !== undefined ? data["detectedBarcodes"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageDetectedBarcode(item))) : undefined,
    formFields: data["formFields"] !== undefined ? data["formFields"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageFormField(item))) : undefined,
    image: data["image"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageImage(data["image"]) : undefined,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
    lines: data["lines"] !== undefined ? data["lines"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageLine(item))) : undefined,
    paragraphs: data["paragraphs"] !== undefined ? data["paragraphs"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageParagraph(item))) : undefined,
    symbols: data["symbols"] !== undefined ? data["symbols"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageSymbol(item))) : undefined,
    tables: data["tables"] !== undefined ? data["tables"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageTable(item))) : undefined,
    tokens: data["tokens"] !== undefined ? data["tokens"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageToken(item))) : undefined,
    transforms: data["transforms"] !== undefined ? data["transforms"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageMatrix(item))) : undefined,
    visualElements: data["visualElements"] !== undefined ? data["visualElements"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageVisualElement(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPage(data: any): GoogleCloudDocumentaiV1beta2DocumentPage {
  return {
    ...data,
    blocks: data["blocks"] !== undefined ? data["blocks"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageBlock(item))) : undefined,
    detectedBarcodes: data["detectedBarcodes"] !== undefined ? data["detectedBarcodes"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageDetectedBarcode(item))) : undefined,
    formFields: data["formFields"] !== undefined ? data["formFields"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageFormField(item))) : undefined,
    image: data["image"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageImage(data["image"]) : undefined,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
    lines: data["lines"] !== undefined ? data["lines"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageLine(item))) : undefined,
    paragraphs: data["paragraphs"] !== undefined ? data["paragraphs"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageParagraph(item))) : undefined,
    symbols: data["symbols"] !== undefined ? data["symbols"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageSymbol(item))) : undefined,
    tables: data["tables"] !== undefined ? data["tables"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageTable(item))) : undefined,
    tokens: data["tokens"] !== undefined ? data["tokens"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageToken(item))) : undefined,
    transforms: data["transforms"] !== undefined ? data["transforms"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageMatrix(item))) : undefined,
    visualElements: data["visualElements"] !== undefined ? data["visualElements"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageVisualElement(item))) : undefined,
  };
}

/**
 * Referencing the visual context of the entity in the Document.pages. Page
 * anchors can be cross-page, consist of multiple bounding polygons and
 * optionally reference specific layout element types.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageAnchor {
  /**
   * One or more references to visual page elements
   */
  pageRefs?: GoogleCloudDocumentaiV1beta2DocumentPageAnchorPageRef[];
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageAnchor(data: any): GoogleCloudDocumentaiV1beta2DocumentPageAnchor {
  return {
    ...data,
    pageRefs: data["pageRefs"] !== undefined ? data["pageRefs"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageAnchorPageRef(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageAnchor(data: any): GoogleCloudDocumentaiV1beta2DocumentPageAnchor {
  return {
    ...data,
    pageRefs: data["pageRefs"] !== undefined ? data["pageRefs"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageAnchorPageRef(item))) : undefined,
  };
}

/**
 * Represents a weak reference to a page element within a document.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageAnchorPageRef {
  /**
   * Optional. Identifies the bounding polygon of a layout element on the page.
   */
  boundingPoly?: GoogleCloudDocumentaiV1beta2BoundingPoly;
  /**
   * Optional. Confidence of detected page element, if applicable. Range `[0,
   * 1]`.
   */
  confidence?: number;
  /**
   * Optional. Deprecated. Use PageRef.bounding_poly instead.
   */
  layoutId?: string;
  /**
   * Optional. The type of the layout element that is being referenced if any.
   */
  layoutType?:  | "LAYOUT_TYPE_UNSPECIFIED" | "BLOCK" | "PARAGRAPH" | "LINE" | "TOKEN" | "VISUAL_ELEMENT" | "TABLE" | "FORM_FIELD";
  /**
   * Required. Index into the Document.pages element, for example using
   * `Document.pages` to locate the related page element. This field is skipped
   * when its value is the default `0`. See
   * https://developers.google.com/protocol-buffers/docs/proto3#json.
   */
  page?: bigint;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageAnchorPageRef(data: any): GoogleCloudDocumentaiV1beta2DocumentPageAnchorPageRef {
  return {
    ...data,
    page: data["page"] !== undefined ? String(data["page"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageAnchorPageRef(data: any): GoogleCloudDocumentaiV1beta2DocumentPageAnchorPageRef {
  return {
    ...data,
    page: data["page"] !== undefined ? BigInt(data["page"]) : undefined,
  };
}

/**
 * A block has a set of lines (collected into paragraphs) that have a common
 * line-spacing and orientation.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageBlock {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta2DocumentPageDetectedLanguage[];
  /**
   * Layout for Block.
   */
  layout?: GoogleCloudDocumentaiV1beta2DocumentPageLayout;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta2DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageBlock(data: any): GoogleCloudDocumentaiV1beta2DocumentPageBlock {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageBlock(data: any): GoogleCloudDocumentaiV1beta2DocumentPageBlock {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A detected barcode.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageDetectedBarcode {
  /**
   * Detailed barcode information of the DetectedBarcode.
   */
  barcode?: GoogleCloudDocumentaiV1beta2Barcode;
  /**
   * Layout for DetectedBarcode.
   */
  layout?: GoogleCloudDocumentaiV1beta2DocumentPageLayout;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageDetectedBarcode(data: any): GoogleCloudDocumentaiV1beta2DocumentPageDetectedBarcode {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageDetectedBarcode(data: any): GoogleCloudDocumentaiV1beta2DocumentPageDetectedBarcode {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * Detected language for a structural component.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageDetectedLanguage {
  /**
   * Confidence of detected language. Range `[0, 1]`.
   */
  confidence?: number;
  /**
   * The BCP-47 language code, such as `en-US` or `sr-Latn`. For more
   * information, see
   * https://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

/**
 * Dimension for the page.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageDimension {
  /**
   * Page height.
   */
  height?: number;
  /**
   * Dimension unit.
   */
  unit?: string;
  /**
   * Page width.
   */
  width?: number;
}

/**
 * A form field detected on the page.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageFormField {
  /**
   * Created for Labeling UI to export key text. If corrections were made to
   * the text identified by the `field_name.text_anchor`, this field will
   * contain the correction.
   */
  correctedKeyText?: string;
  /**
   * Created for Labeling UI to export value text. If corrections were made to
   * the text identified by the `field_value.text_anchor`, this field will
   * contain the correction.
   */
  correctedValueText?: string;
  /**
   * Layout for the FormField name. e.g. `Address`, `Email`, `Grand total`,
   * `Phone number`, etc.
   */
  fieldName?: GoogleCloudDocumentaiV1beta2DocumentPageLayout;
  /**
   * Layout for the FormField value.
   */
  fieldValue?: GoogleCloudDocumentaiV1beta2DocumentPageLayout;
  /**
   * A list of detected languages for name together with confidence.
   */
  nameDetectedLanguages?: GoogleCloudDocumentaiV1beta2DocumentPageDetectedLanguage[];
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta2DocumentProvenance;
  /**
   * A list of detected languages for value together with confidence.
   */
  valueDetectedLanguages?: GoogleCloudDocumentaiV1beta2DocumentPageDetectedLanguage[];
  /**
   * If the value is non-textual, this field represents the type. Current valid
   * values are: - blank (this indicates the `field_value` is normal text) -
   * `unfilled_checkbox` - `filled_checkbox`
   */
  valueType?: string;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageFormField(data: any): GoogleCloudDocumentaiV1beta2DocumentPageFormField {
  return {
    ...data,
    fieldName: data["fieldName"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["fieldName"]) : undefined,
    fieldValue: data["fieldValue"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["fieldValue"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageFormField(data: any): GoogleCloudDocumentaiV1beta2DocumentPageFormField {
  return {
    ...data,
    fieldName: data["fieldName"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["fieldName"]) : undefined,
    fieldValue: data["fieldValue"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["fieldValue"]) : undefined,
  };
}

/**
 * Rendered image contents for this page.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageImage {
  /**
   * Raw byte content of the image.
   */
  content?: Uint8Array;
  /**
   * Height of the image in pixels.
   */
  height?: number;
  /**
   * Encoding mime type for the image.
   */
  mimeType?: string;
  /**
   * Width of the image in pixels.
   */
  width?: number;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageImage(data: any): GoogleCloudDocumentaiV1beta2DocumentPageImage {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageImage(data: any): GoogleCloudDocumentaiV1beta2DocumentPageImage {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * Image Quality Scores for the page image
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageImageQualityScores {
  /**
   * A list of detected defects.
   */
  detectedDefects?: GoogleCloudDocumentaiV1beta2DocumentPageImageQualityScoresDetectedDefect[];
  /**
   * The overall quality score. Range `[0, 1]` where 1 is perfect quality.
   */
  qualityScore?: number;
}

/**
 * Image Quality Defects
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageImageQualityScoresDetectedDefect {
  /**
   * Confidence of detected defect. Range `[0, 1]` where 1 indicates strong
   * confidence of that the defect exists.
   */
  confidence?: number;
  /**
   * Name of the defect type. Supported values are: - `quality/defect_blurry` -
   * `quality/defect_noisy` - `quality/defect_dark` - `quality/defect_faint` -
   * `quality/defect_text_too_small` - `quality/defect_document_cutoff` -
   * `quality/defect_text_cutoff` - `quality/defect_glare`
   */
  type?: string;
}

/**
 * Visual element describing a layout unit on a page.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageLayout {
  /**
   * The bounding polygon for the Layout.
   */
  boundingPoly?: GoogleCloudDocumentaiV1beta2BoundingPoly;
  /**
   * Confidence of the current Layout within context of the object this layout
   * is for. e.g. confidence can be for a single token, a table, a visual
   * element, etc. depending on context. Range `[0, 1]`.
   */
  confidence?: number;
  /**
   * Detected orientation for the Layout.
   */
  orientation?:  | "ORIENTATION_UNSPECIFIED" | "PAGE_UP" | "PAGE_RIGHT" | "PAGE_DOWN" | "PAGE_LEFT";
  /**
   * Text anchor indexing into the Document.text.
   */
  textAnchor?: GoogleCloudDocumentaiV1beta2DocumentTextAnchor;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data: any): GoogleCloudDocumentaiV1beta2DocumentPageLayout {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data: any): GoogleCloudDocumentaiV1beta2DocumentPageLayout {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

/**
 * A collection of tokens that a human would perceive as a line. Does not cross
 * column boundaries, can be horizontal, vertical, etc.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageLine {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta2DocumentPageDetectedLanguage[];
  /**
   * Layout for Line.
   */
  layout?: GoogleCloudDocumentaiV1beta2DocumentPageLayout;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta2DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageLine(data: any): GoogleCloudDocumentaiV1beta2DocumentPageLine {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageLine(data: any): GoogleCloudDocumentaiV1beta2DocumentPageLine {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * Representation for transformation matrix, intended to be compatible and used
 * with OpenCV format for image manipulation.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageMatrix {
  /**
   * Number of columns in the matrix.
   */
  cols?: number;
  /**
   * The matrix data.
   */
  data?: Uint8Array;
  /**
   * Number of rows in the matrix.
   */
  rows?: number;
  /**
   * This encodes information about what data type the matrix uses. For
   * example, 0 (CV_8U) is an unsigned 8-bit image. For the full list of OpenCV
   * primitive data types, please refer to
   * https://docs.opencv.org/4.3.0/d1/d1b/group__core__hal__interface.html
   */
  type?: number;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageMatrix(data: any): GoogleCloudDocumentaiV1beta2DocumentPageMatrix {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageMatrix(data: any): GoogleCloudDocumentaiV1beta2DocumentPageMatrix {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

/**
 * A collection of lines that a human would perceive as a paragraph.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageParagraph {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta2DocumentPageDetectedLanguage[];
  /**
   * Layout for Paragraph.
   */
  layout?: GoogleCloudDocumentaiV1beta2DocumentPageLayout;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta2DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageParagraph(data: any): GoogleCloudDocumentaiV1beta2DocumentPageParagraph {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageParagraph(data: any): GoogleCloudDocumentaiV1beta2DocumentPageParagraph {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A detected symbol.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageSymbol {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta2DocumentPageDetectedLanguage[];
  /**
   * Layout for Symbol.
   */
  layout?: GoogleCloudDocumentaiV1beta2DocumentPageLayout;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageSymbol(data: any): GoogleCloudDocumentaiV1beta2DocumentPageSymbol {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageSymbol(data: any): GoogleCloudDocumentaiV1beta2DocumentPageSymbol {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A table representation similar to HTML table structure.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageTable {
  /**
   * Body rows of the table.
   */
  bodyRows?: GoogleCloudDocumentaiV1beta2DocumentPageTableTableRow[];
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta2DocumentPageDetectedLanguage[];
  /**
   * Header rows of the table.
   */
  headerRows?: GoogleCloudDocumentaiV1beta2DocumentPageTableTableRow[];
  /**
   * Layout for Table.
   */
  layout?: GoogleCloudDocumentaiV1beta2DocumentPageLayout;
  /**
   * The history of this table.
   */
  provenance?: GoogleCloudDocumentaiV1beta2DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageTable(data: any): GoogleCloudDocumentaiV1beta2DocumentPageTable {
  return {
    ...data,
    bodyRows: data["bodyRows"] !== undefined ? data["bodyRows"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageTableTableRow(item))) : undefined,
    headerRows: data["headerRows"] !== undefined ? data["headerRows"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageTableTableRow(item))) : undefined,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageTable(data: any): GoogleCloudDocumentaiV1beta2DocumentPageTable {
  return {
    ...data,
    bodyRows: data["bodyRows"] !== undefined ? data["bodyRows"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageTableTableRow(item))) : undefined,
    headerRows: data["headerRows"] !== undefined ? data["headerRows"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageTableTableRow(item))) : undefined,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A cell representation inside the table.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageTableTableCell {
  /**
   * How many columns this cell spans.
   */
  colSpan?: number;
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta2DocumentPageDetectedLanguage[];
  /**
   * Layout for TableCell.
   */
  layout?: GoogleCloudDocumentaiV1beta2DocumentPageLayout;
  /**
   * How many rows this cell spans.
   */
  rowSpan?: number;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageTableTableCell(data: any): GoogleCloudDocumentaiV1beta2DocumentPageTableTableCell {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageTableTableCell(data: any): GoogleCloudDocumentaiV1beta2DocumentPageTableTableCell {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A row of table cells.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageTableTableRow {
  /**
   * Cells that make up this row.
   */
  cells?: GoogleCloudDocumentaiV1beta2DocumentPageTableTableCell[];
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageTableTableRow(data: any): GoogleCloudDocumentaiV1beta2DocumentPageTableTableRow {
  return {
    ...data,
    cells: data["cells"] !== undefined ? data["cells"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentPageTableTableCell(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageTableTableRow(data: any): GoogleCloudDocumentaiV1beta2DocumentPageTableTableRow {
  return {
    ...data,
    cells: data["cells"] !== undefined ? data["cells"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentPageTableTableCell(item))) : undefined,
  };
}

/**
 * A detected token.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageToken {
  /**
   * Detected break at the end of a Token.
   */
  detectedBreak?: GoogleCloudDocumentaiV1beta2DocumentPageTokenDetectedBreak;
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta2DocumentPageDetectedLanguage[];
  /**
   * Layout for Token.
   */
  layout?: GoogleCloudDocumentaiV1beta2DocumentPageLayout;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta2DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageToken(data: any): GoogleCloudDocumentaiV1beta2DocumentPageToken {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageToken(data: any): GoogleCloudDocumentaiV1beta2DocumentPageToken {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * Detected break at the end of a Token.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageTokenDetectedBreak {
  /**
   * Detected break type.
   */
  type?:  | "TYPE_UNSPECIFIED" | "SPACE" | "WIDE_SPACE" | "HYPHEN";
}

/**
 * Detected non-text visual elements e.g. checkbox, signature etc. on the page.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentPageVisualElement {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1beta2DocumentPageDetectedLanguage[];
  /**
   * Layout for VisualElement.
   */
  layout?: GoogleCloudDocumentaiV1beta2DocumentPageLayout;
  /**
   * Type of the VisualElement.
   */
  type?: string;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentPageVisualElement(data: any): GoogleCloudDocumentaiV1beta2DocumentPageVisualElement {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentPageVisualElement(data: any): GoogleCloudDocumentaiV1beta2DocumentPageVisualElement {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * Structure to identify provenance relationships between annotations in
 * different revisions.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentProvenance {
  /**
   * The Id of this operation. Needs to be unique within the scope of the
   * revision.
   */
  id?: number;
  /**
   * References to the original elements that are replaced.
   */
  parents?: GoogleCloudDocumentaiV1beta2DocumentProvenanceParent[];
  /**
   * The index of the revision that produced this element.
   */
  revision?: number;
  /**
   * The type of provenance operation.
   */
  type?:  | "OPERATION_TYPE_UNSPECIFIED" | "ADD" | "REMOVE" | "UPDATE" | "REPLACE" | "EVAL_REQUESTED" | "EVAL_APPROVED" | "EVAL_SKIPPED";
}

/**
 * The parent element the current element is based on. Used for
 * referencing/aligning, removal and replacement operations.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentProvenanceParent {
  /**
   * The id of the parent provenance.
   */
  id?: number;
  /**
   * The index of the parent item in the corresponding item list (eg. list of
   * entities, properties within entities, etc.) in the parent revision.
   */
  index?: number;
  /**
   * The index of the index into current revision's parent_ids list.
   */
  revision?: number;
}

/**
 * Contains past or forward revisions of this document.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentRevision {
  /**
   * If the change was made by a person specify the name or id of that person.
   */
  agent?: string;
  /**
   * The time that the revision was created, internally generated by doc proto
   * storage at the time of create.
   */
  createTime?: Date;
  /**
   * Human Review information of this revision.
   */
  humanReview?: GoogleCloudDocumentaiV1beta2DocumentRevisionHumanReview;
  /**
   * Id of the revision, internally generated by doc proto storage. Unique
   * within the context of the document.
   */
  id?: string;
  /**
   * The revisions that this revision is based on. This can include one or more
   * parent (when documents are merged.) This field represents the index into
   * the `revisions` field.
   */
  parent?: number[];
  /**
   * The revisions that this revision is based on. Must include all the ids
   * that have anything to do with this revision - eg. there are
   * `provenance.parent.revision` fields that index into this field.
   */
  parentIds?: string[];
  /**
   * If the annotation was made by processor identify the processor by its
   * resource name.
   */
  processor?: string;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentRevision(data: any): GoogleCloudDocumentaiV1beta2DocumentRevision {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentRevision(data: any): GoogleCloudDocumentaiV1beta2DocumentRevision {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Human Review information of the document.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentRevisionHumanReview {
  /**
   * Human review state. e.g. `requested`, `succeeded`, `rejected`.
   */
  state?: string;
  /**
   * A message providing more details about the current state of processing.
   * For example, the rejection reason when the state is `rejected`.
   */
  stateMessage?: string;
}

/**
 * For a large document, sharding may be performed to produce several document
 * shards. Each document shard contains this field to detail which shard it is.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentShardInfo {
  /**
   * Total number of shards.
   */
  shardCount?: bigint;
  /**
   * The 0-based index of this shard.
   */
  shardIndex?: bigint;
  /**
   * The index of the first character in Document.text in the overall document
   * global text.
   */
  textOffset?: bigint;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentShardInfo(data: any): GoogleCloudDocumentaiV1beta2DocumentShardInfo {
  return {
    ...data,
    shardCount: data["shardCount"] !== undefined ? String(data["shardCount"]) : undefined,
    shardIndex: data["shardIndex"] !== undefined ? String(data["shardIndex"]) : undefined,
    textOffset: data["textOffset"] !== undefined ? String(data["textOffset"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentShardInfo(data: any): GoogleCloudDocumentaiV1beta2DocumentShardInfo {
  return {
    ...data,
    shardCount: data["shardCount"] !== undefined ? BigInt(data["shardCount"]) : undefined,
    shardIndex: data["shardIndex"] !== undefined ? BigInt(data["shardIndex"]) : undefined,
    textOffset: data["textOffset"] !== undefined ? BigInt(data["textOffset"]) : undefined,
  };
}

/**
 * Annotation for common text style attributes. This adheres to CSS conventions
 * as much as possible.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentStyle {
  /**
   * Text background color.
   */
  backgroundColor?: GoogleTypeColor;
  /**
   * Text color.
   */
  color?: GoogleTypeColor;
  /**
   * Font family such as `Arial`, `Times New Roman`.
   * https://www.w3schools.com/cssref/pr_font_font-family.asp
   */
  fontFamily?: string;
  /**
   * Font size.
   */
  fontSize?: GoogleCloudDocumentaiV1beta2DocumentStyleFontSize;
  /**
   * Font weight. Possible values are normal, bold, bolder, and lighter.
   * https://www.w3schools.com/cssref/pr_font_weight.asp
   */
  fontWeight?: string;
  /**
   * Text anchor indexing into the Document.text.
   */
  textAnchor?: GoogleCloudDocumentaiV1beta2DocumentTextAnchor;
  /**
   * Text decoration. Follows CSS standard.
   * https://www.w3schools.com/cssref/pr_text_text-decoration.asp
   */
  textDecoration?: string;
  /**
   * Text style. Possible values are normal, italic, and oblique.
   * https://www.w3schools.com/cssref/pr_font_font-style.asp
   */
  textStyle?: string;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentStyle(data: any): GoogleCloudDocumentaiV1beta2DocumentStyle {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentStyle(data: any): GoogleCloudDocumentaiV1beta2DocumentStyle {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

/**
 * Font size with unit.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentStyleFontSize {
  /**
   * Font size for the text.
   */
  size?: number;
  /**
   * Unit for the font size. Follows CSS naming (in, px, pt, etc.).
   */
  unit?: string;
}

/**
 * Text reference indexing into the Document.text.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentTextAnchor {
  /**
   * Contains the content of the text span so that users do not have to look it
   * up in the text_segments. It is always populated for formFields.
   */
  content?: string;
  /**
   * The text segments from the Document.text.
   */
  textSegments?: GoogleCloudDocumentaiV1beta2DocumentTextAnchorTextSegment[];
}

function serializeGoogleCloudDocumentaiV1beta2DocumentTextAnchor(data: any): GoogleCloudDocumentaiV1beta2DocumentTextAnchor {
  return {
    ...data,
    textSegments: data["textSegments"] !== undefined ? data["textSegments"].map((item: any) => (serializeGoogleCloudDocumentaiV1beta2DocumentTextAnchorTextSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentTextAnchor(data: any): GoogleCloudDocumentaiV1beta2DocumentTextAnchor {
  return {
    ...data,
    textSegments: data["textSegments"] !== undefined ? data["textSegments"].map((item: any) => (deserializeGoogleCloudDocumentaiV1beta2DocumentTextAnchorTextSegment(item))) : undefined,
  };
}

/**
 * A text segment in the Document.text. The indices may be out of bounds which
 * indicate that the text extends into another document shard for large sharded
 * documents. See ShardInfo.text_offset
 */
export interface GoogleCloudDocumentaiV1beta2DocumentTextAnchorTextSegment {
  /**
   * TextSegment half open end UTF-8 char index in the Document.text.
   */
  endIndex?: bigint;
  /**
   * TextSegment start UTF-8 char index in the Document.text.
   */
  startIndex?: bigint;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentTextAnchorTextSegment(data: any): GoogleCloudDocumentaiV1beta2DocumentTextAnchorTextSegment {
  return {
    ...data,
    endIndex: data["endIndex"] !== undefined ? String(data["endIndex"]) : undefined,
    startIndex: data["startIndex"] !== undefined ? String(data["startIndex"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentTextAnchorTextSegment(data: any): GoogleCloudDocumentaiV1beta2DocumentTextAnchorTextSegment {
  return {
    ...data,
    endIndex: data["endIndex"] !== undefined ? BigInt(data["endIndex"]) : undefined,
    startIndex: data["startIndex"] !== undefined ? BigInt(data["startIndex"]) : undefined,
  };
}

/**
 * This message is used for text changes aka. OCR corrections.
 */
export interface GoogleCloudDocumentaiV1beta2DocumentTextChange {
  /**
   * The text that replaces the text identified in the `text_anchor`.
   */
  changedText?: string;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1beta2DocumentProvenance[];
  /**
   * Provenance of the correction. Text anchor indexing into the Document.text.
   * There can only be a single `TextAnchor.text_segments` element. If the start
   * and end index of the text segment are the same, the text change is inserted
   * before that index.
   */
  textAnchor?: GoogleCloudDocumentaiV1beta2DocumentTextAnchor;
}

function serializeGoogleCloudDocumentaiV1beta2DocumentTextChange(data: any): GoogleCloudDocumentaiV1beta2DocumentTextChange {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2DocumentTextChange(data: any): GoogleCloudDocumentaiV1beta2DocumentTextChange {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

/**
 * The Google Cloud Storage location where the output file will be written to.
 */
export interface GoogleCloudDocumentaiV1beta2GcsDestination {
  uri?: string;
}

/**
 * The Google Cloud Storage location where the input file will be read from.
 */
export interface GoogleCloudDocumentaiV1beta2GcsSource {
  uri?: string;
}

/**
 * The desired input location and metadata.
 */
export interface GoogleCloudDocumentaiV1beta2InputConfig {
  /**
   * Content in bytes, represented as a stream of bytes. Note: As with all
   * `bytes` fields, proto buffer messages use a pure binary representation,
   * whereas JSON representations use base64. This field only works for
   * synchronous ProcessDocument method.
   */
  contents?: Uint8Array;
  /**
   * The Google Cloud Storage location to read the input from. This must be a
   * single file.
   */
  gcsSource?: GoogleCloudDocumentaiV1beta2GcsSource;
  /**
   * Required. Mimetype of the input. Current supported mimetypes are
   * application/pdf, image/tiff, and image/gif. In addition, application/json
   * type is supported for requests with ProcessDocumentRequest.automl_params
   * field set. The JSON file needs to be in Document format.
   */
  mimeType?: string;
}

function serializeGoogleCloudDocumentaiV1beta2InputConfig(data: any): GoogleCloudDocumentaiV1beta2InputConfig {
  return {
    ...data,
    contents: data["contents"] !== undefined ? encodeBase64(data["contents"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2InputConfig(data: any): GoogleCloudDocumentaiV1beta2InputConfig {
  return {
    ...data,
    contents: data["contents"] !== undefined ? decodeBase64(data["contents"] as string) : undefined,
  };
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface GoogleCloudDocumentaiV1beta2NormalizedVertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate (starts from the top of the image).
   */
  y?: number;
}

/**
 * Contains metadata for the BatchProcessDocuments operation.
 */
export interface GoogleCloudDocumentaiV1beta2OperationMetadata {
  /**
   * The creation time of the operation.
   */
  createTime?: Date;
  /**
   * The state of the current batch processing.
   */
  state?:  | "STATE_UNSPECIFIED" | "ACCEPTED" | "WAITING" | "RUNNING" | "SUCCEEDED" | "CANCELLED" | "FAILED";
  /**
   * A message providing more details about the current state of processing.
   */
  stateMessage?: string;
  /**
   * The last update time of the operation.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDocumentaiV1beta2OperationMetadata(data: any): GoogleCloudDocumentaiV1beta2OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2OperationMetadata(data: any): GoogleCloudDocumentaiV1beta2OperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The desired output location and metadata.
 */
export interface GoogleCloudDocumentaiV1beta2OutputConfig {
  /**
   * The Google Cloud Storage location to write the output to.
   */
  gcsDestination?: GoogleCloudDocumentaiV1beta2GcsDestination;
  /**
   * The max number of pages to include into each output Document shard JSON on
   * Google Cloud Storage. The valid range is [1, 100]. If not specified, the
   * default value is 20. For example, for one pdf file with 100 pages, 100
   * parsed pages will be produced. If `pages_per_shard` = 20, then 5 Document
   * shard JSON files each containing 20 parsed pages will be written under the
   * prefix OutputConfig.gcs_destination.uri and suffix pages-x-to-y.json where
   * x and y are 1-indexed page numbers. Example GCS outputs with 157 pages and
   * pages_per_shard = 50: pages-001-to-050.json pages-051-to-100.json
   * pages-101-to-150.json pages-151-to-157.json
   */
  pagesPerShard?: number;
}

/**
 * Response to a single document processing request.
 */
export interface GoogleCloudDocumentaiV1beta2ProcessDocumentResponse {
  /**
   * Information about the input file. This is the same as the corresponding
   * input config in the request.
   */
  inputConfig?: GoogleCloudDocumentaiV1beta2InputConfig;
  /**
   * The output location of the parsed responses. The responses are written to
   * this location as JSON-serialized `Document` objects.
   */
  outputConfig?: GoogleCloudDocumentaiV1beta2OutputConfig;
}

function serializeGoogleCloudDocumentaiV1beta2ProcessDocumentResponse(data: any): GoogleCloudDocumentaiV1beta2ProcessDocumentResponse {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? serializeGoogleCloudDocumentaiV1beta2InputConfig(data["inputConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta2ProcessDocumentResponse(data: any): GoogleCloudDocumentaiV1beta2ProcessDocumentResponse {
  return {
    ...data,
    inputConfig: data["inputConfig"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta2InputConfig(data["inputConfig"]) : undefined,
  };
}

/**
 * A vertex represents a 2D point in the image. NOTE: the vertex coordinates
 * are in the same scale as the original image.
 */
export interface GoogleCloudDocumentaiV1beta2Vertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate (starts from the top of the image).
   */
  y?: number;
}

/**
 * The long running operation metadata for batch process method.
 */
export interface GoogleCloudDocumentaiV1beta3BatchProcessMetadata {
  /**
   * The creation time of the operation.
   */
  createTime?: Date;
  /**
   * The list of response details of each document.
   */
  individualProcessStatuses?: GoogleCloudDocumentaiV1beta3BatchProcessMetadataIndividualProcessStatus[];
  /**
   * The state of the current batch processing.
   */
  state?:  | "STATE_UNSPECIFIED" | "WAITING" | "RUNNING" | "SUCCEEDED" | "CANCELLING" | "CANCELLED" | "FAILED";
  /**
   * A message providing more details about the current state of processing.
   * For example, the error message if the operation is failed.
   */
  stateMessage?: string;
  /**
   * The last update time of the operation.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDocumentaiV1beta3BatchProcessMetadata(data: any): GoogleCloudDocumentaiV1beta3BatchProcessMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta3BatchProcessMetadata(data: any): GoogleCloudDocumentaiV1beta3BatchProcessMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The status of a each individual document in the batch process.
 */
export interface GoogleCloudDocumentaiV1beta3BatchProcessMetadataIndividualProcessStatus {
  /**
   * The name of the operation triggered by the processed document. If the
   * human review process is not triggered, this field will be empty. It has the
   * same response type and metadata as the long running operation returned by
   * ReviewDocument method.
   */
  humanReviewOperation?: string;
  /**
   * The status of human review on the processed document.
   */
  humanReviewStatus?: GoogleCloudDocumentaiV1beta3HumanReviewStatus;
  /**
   * The source of the document, same as the [input_gcs_source] field in the
   * request when the batch process started. The batch process is started by
   * take snapshot of that document, since a user can move or change that
   * document during the process.
   */
  inputGcsSource?: string;
  /**
   * The output_gcs_destination (in the request as `output_gcs_destination`) of
   * the processed document if it was successful, otherwise empty.
   */
  outputGcsDestination?: string;
  /**
   * The status processing the document.
   */
  status?: GoogleRpcStatus;
}

/**
 * Response message for batch process document method.
 */
export interface GoogleCloudDocumentaiV1beta3BatchProcessResponse {
}

/**
 * The common metadata for long running operations.
 */
export interface GoogleCloudDocumentaiV1beta3CommonOperationMetadata {
  /**
   * The creation time of the operation.
   */
  createTime?: Date;
  /**
   * A related resource to this operation.
   */
  resource?: string;
  /**
   * The state of the operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "CANCELLING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
  /**
   * A message providing more details about the current state of processing.
   */
  stateMessage?: string;
  /**
   * The last update time of the operation.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data: any): GoogleCloudDocumentaiV1beta3CommonOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data: any): GoogleCloudDocumentaiV1beta3CommonOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The long running operation metadata for delete processor method.
 */
export interface GoogleCloudDocumentaiV1beta3DeleteProcessorMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1beta3DeleteProcessorMetadata(data: any): GoogleCloudDocumentaiV1beta3DeleteProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta3DeleteProcessorMetadata(data: any): GoogleCloudDocumentaiV1beta3DeleteProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The long running operation metadata for delete processor version method.
 */
export interface GoogleCloudDocumentaiV1beta3DeleteProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1beta3DeleteProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1beta3DeleteProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta3DeleteProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1beta3DeleteProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The long running operation metadata for deploy processor version method.
 */
export interface GoogleCloudDocumentaiV1beta3DeployProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1beta3DeployProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1beta3DeployProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta3DeployProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1beta3DeployProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Response message for the deploy processor version method.
 */
export interface GoogleCloudDocumentaiV1beta3DeployProcessorVersionResponse {
}

/**
 * The long running operation metadata for disable processor method.
 */
export interface GoogleCloudDocumentaiV1beta3DisableProcessorMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1beta3DisableProcessorMetadata(data: any): GoogleCloudDocumentaiV1beta3DisableProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta3DisableProcessorMetadata(data: any): GoogleCloudDocumentaiV1beta3DisableProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Response message for the disable processor method. Intentionally empty proto
 * for adding fields in future.
 */
export interface GoogleCloudDocumentaiV1beta3DisableProcessorResponse {
}

/**
 * The long running operation metadata for enable processor method.
 */
export interface GoogleCloudDocumentaiV1beta3EnableProcessorMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1beta3EnableProcessorMetadata(data: any): GoogleCloudDocumentaiV1beta3EnableProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta3EnableProcessorMetadata(data: any): GoogleCloudDocumentaiV1beta3EnableProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Response message for the enable processor method. Intentionally empty proto
 * for adding fields in future.
 */
export interface GoogleCloudDocumentaiV1beta3EnableProcessorResponse {
}

/**
 * Metadata of the EvaluateProcessorVersion method.
 */
export interface GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1beta3EvaluateProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta3EvaluateProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Metadata of the EvaluateProcessorVersion method.
 */
export interface GoogleCloudDocumentaiV1beta3EvaluateProcessorVersionResponse {
  /**
   * The resource name of the created evaluation.
   */
  evaluation?: string;
}

/**
 * The status of human review on a processed document.
 */
export interface GoogleCloudDocumentaiV1beta3HumanReviewStatus {
  /**
   * The name of the operation triggered by the processed document. This field
   * is populated only when the [state] is [HUMAN_REVIEW_IN_PROGRESS]. It has
   * the same response type and metadata as the long running operation returned
   * by [ReviewDocument] method.
   */
  humanReviewOperation?: string;
  /**
   * The state of human review on the processing request.
   */
  state?:  | "STATE_UNSPECIFIED" | "SKIPPED" | "VALIDATION_PASSED" | "IN_PROGRESS" | "ERROR";
  /**
   * A message providing more details about the human review state.
   */
  stateMessage?: string;
}

/**
 * The long running operation metadata for review document method.
 */
export interface GoogleCloudDocumentaiV1beta3ReviewDocumentOperationMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
  /**
   * The creation time of the operation.
   */
  createTime?: Date;
  /**
   * The Crowd Compute question ID.
   */
  questionId?: string;
  /**
   * Used only when Operation.done is false.
   */
  state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "CANCELLING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
  /**
   * A message providing more details about the current state of processing.
   * For example, the error message if the operation is failed.
   */
  stateMessage?: string;
  /**
   * The last update time of the operation.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDocumentaiV1beta3ReviewDocumentOperationMetadata(data: any): GoogleCloudDocumentaiV1beta3ReviewDocumentOperationMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta3ReviewDocumentOperationMetadata(data: any): GoogleCloudDocumentaiV1beta3ReviewDocumentOperationMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Response message for review document method.
 */
export interface GoogleCloudDocumentaiV1beta3ReviewDocumentResponse {
  /**
   * The Cloud Storage uri for the human reviewed document if the review is
   * succeeded.
   */
  gcsDestination?: string;
  /**
   * The reason why the review is rejected by reviewer.
   */
  rejectionReason?: string;
  /**
   * The state of the review operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "REJECTED" | "SUCCEEDED";
}

/**
 * The long running operation metadata for set default processor version
 * method.
 */
export interface GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Response message for set default processor version method.
 */
export interface GoogleCloudDocumentaiV1beta3SetDefaultProcessorVersionResponse {
}

/**
 * The metadata that represents a processor version being created.
 */
export interface GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
  /**
   * The test dataset validation information.
   */
  testDatasetValidation?: GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadataDatasetValidation;
  /**
   * The training dataset validation information.
   */
  trainingDatasetValidation?: GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadataDatasetValidation;
}

function serializeGoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The dataset validation information. This includes any and all errors with
 * documents and the dataset.
 */
export interface GoogleCloudDocumentaiV1beta3TrainProcessorVersionMetadataDatasetValidation {
  /**
   * The total number of dataset errors.
   */
  datasetErrorCount?: number;
  /**
   * Error information for the dataset as a whole. A maximum of 10 dataset
   * errors will be returned. A single dataset error is terminal for training.
   */
  datasetErrors?: GoogleRpcStatus[];
  /**
   * The total number of document errors.
   */
  documentErrorCount?: number;
  /**
   * Error information pertaining to specific documents. A maximum of 10
   * document errors will be returned. Any document with errors will not be used
   * throughout training.
   */
  documentErrors?: GoogleRpcStatus[];
}

/**
 * The response for the TrainProcessorVersion method.
 */
export interface GoogleCloudDocumentaiV1beta3TrainProcessorVersionResponse {
  /**
   * The resource name of the processor version produced by training.
   */
  processorVersion?: string;
}

/**
 * The long running operation metadata for the undeploy processor version
 * method.
 */
export interface GoogleCloudDocumentaiV1beta3UndeployProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1beta3CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1beta3UndeployProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1beta3UndeployProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1beta3UndeployProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1beta3UndeployProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1beta3CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Response message for the undeploy processor version method.
 */
export interface GoogleCloudDocumentaiV1beta3UndeployProcessorVersionResponse {
}

/**
 * A bounding polygon for the detected image annotation.
 */
export interface GoogleCloudDocumentaiV1BoundingPoly {
  /**
   * The bounding polygon normalized vertices.
   */
  normalizedVertices?: GoogleCloudDocumentaiV1NormalizedVertex[];
  /**
   * The bounding polygon vertices.
   */
  vertices?: GoogleCloudDocumentaiV1Vertex[];
}

/**
 * The common metadata for long running operations.
 */
export interface GoogleCloudDocumentaiV1CommonOperationMetadata {
  /**
   * The creation time of the operation.
   */
  createTime?: Date;
  /**
   * A related resource to this operation.
   */
  resource?: string;
  /**
   * The state of the operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "RUNNING" | "CANCELLING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
  /**
   * A message providing more details about the current state of processing.
   */
  stateMessage?: string;
  /**
   * The last update time of the operation.
   */
  updateTime?: Date;
}

function serializeGoogleCloudDocumentaiV1CommonOperationMetadata(data: any): GoogleCloudDocumentaiV1CommonOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1CommonOperationMetadata(data: any): GoogleCloudDocumentaiV1CommonOperationMetadata {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * The long running operation metadata for delete processor method.
 */
export interface GoogleCloudDocumentaiV1DeleteProcessorMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1DeleteProcessorMetadata(data: any): GoogleCloudDocumentaiV1DeleteProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DeleteProcessorMetadata(data: any): GoogleCloudDocumentaiV1DeleteProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The long running operation metadata for delete processor version method.
 */
export interface GoogleCloudDocumentaiV1DeleteProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1DeleteProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1DeleteProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DeleteProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1DeleteProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The long running operation metadata for deploy processor version method.
 */
export interface GoogleCloudDocumentaiV1DeployProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1DeployProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1DeployProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DeployProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1DeployProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Request message for the deploy processor version method.
 */
export interface GoogleCloudDocumentaiV1DeployProcessorVersionRequest {
}

/**
 * Response message for the deploy processor version method.
 */
export interface GoogleCloudDocumentaiV1DeployProcessorVersionResponse {
}

/**
 * The long running operation metadata for disable processor method.
 */
export interface GoogleCloudDocumentaiV1DisableProcessorMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1DisableProcessorMetadata(data: any): GoogleCloudDocumentaiV1DisableProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DisableProcessorMetadata(data: any): GoogleCloudDocumentaiV1DisableProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Request message for the disable processor method.
 */
export interface GoogleCloudDocumentaiV1DisableProcessorRequest {
}

/**
 * Response message for the disable processor method. Intentionally empty proto
 * for adding fields in future.
 */
export interface GoogleCloudDocumentaiV1DisableProcessorResponse {
}

/**
 * Document represents the canonical document resource in Document AI. It is an
 * interchange format that provides insights into documents and allows for
 * collaboration between users and Document AI to iterate and optimize for
 * quality.
 */
export interface GoogleCloudDocumentaiV1Document {
  /**
   * Optional. Inline document content, represented as a stream of bytes. Note:
   * As with all `bytes` fields, protobuffers use a pure binary representation,
   * whereas JSON representations use base64.
   */
  content?: Uint8Array;
  /**
   * A list of entities detected on Document.text. For document shards,
   * entities in this list may cross shard boundaries.
   */
  entities?: GoogleCloudDocumentaiV1DocumentEntity[];
  /**
   * Placeholder. Relationship among Document.entities.
   */
  entityRelations?: GoogleCloudDocumentaiV1DocumentEntityRelation[];
  /**
   * Any error that occurred while processing this document.
   */
  error?: GoogleRpcStatus;
  /**
   * An IANA published MIME type (also referred to as media type). For more
   * information, see
   * https://www.iana.org/assignments/media-types/media-types.xhtml.
   */
  mimeType?: string;
  /**
   * Visual page layout for the Document.
   */
  pages?: GoogleCloudDocumentaiV1DocumentPage[];
  /**
   * Placeholder. Revision history of this document.
   */
  revisions?: GoogleCloudDocumentaiV1DocumentRevision[];
  /**
   * Information about the sharding if this document is sharded part of a
   * larger document. If the document is not sharded, this message is not
   * specified.
   */
  shardInfo?: GoogleCloudDocumentaiV1DocumentShardInfo;
  /**
   * Optional. UTF-8 encoded text in reading order from the document.
   */
  text?: string;
  /**
   * Placeholder. A list of text corrections made to Document.text. This is
   * usually used for annotating corrections to OCR mistakes. Text changes for a
   * given revision may not overlap with each other.
   */
  textChanges?: GoogleCloudDocumentaiV1DocumentTextChange[];
  /**
   * Styles for the Document.text.
   */
  textStyles?: GoogleCloudDocumentaiV1DocumentStyle[];
  /**
   * Optional. Currently supports Google Cloud Storage URI of the form
   * `gs://bucket_name/object_name`. Object versioning is not supported. See
   * [Google Cloud Storage Request
   * URIs](https://cloud.google.com/storage/docs/reference-uris) for more info.
   */
  uri?: string;
}

function serializeGoogleCloudDocumentaiV1Document(data: any): GoogleCloudDocumentaiV1Document {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
    entities: data["entities"] !== undefined ? data["entities"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentEntity(item))) : undefined,
    pages: data["pages"] !== undefined ? data["pages"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPage(item))) : undefined,
    revisions: data["revisions"] !== undefined ? data["revisions"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentRevision(item))) : undefined,
    shardInfo: data["shardInfo"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentShardInfo(data["shardInfo"]) : undefined,
    textChanges: data["textChanges"] !== undefined ? data["textChanges"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentTextChange(item))) : undefined,
    textStyles: data["textStyles"] !== undefined ? data["textStyles"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentStyle(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1Document(data: any): GoogleCloudDocumentaiV1Document {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
    entities: data["entities"] !== undefined ? data["entities"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentEntity(item))) : undefined,
    pages: data["pages"] !== undefined ? data["pages"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPage(item))) : undefined,
    revisions: data["revisions"] !== undefined ? data["revisions"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentRevision(item))) : undefined,
    shardInfo: data["shardInfo"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentShardInfo(data["shardInfo"]) : undefined,
    textChanges: data["textChanges"] !== undefined ? data["textChanges"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentTextChange(item))) : undefined,
    textStyles: data["textStyles"] !== undefined ? data["textStyles"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentStyle(item))) : undefined,
  };
}

/**
 * An entity that could be a phrase in the text or a property that belongs to
 * the document. It is a known entity type, such as a person, an organization,
 * or location.
 */
export interface GoogleCloudDocumentaiV1DocumentEntity {
  /**
   * Optional. Confidence of detected Schema entity. Range `[0, 1]`.
   */
  confidence?: number;
  /**
   * Optional. Canonical id. This will be a unique value in the entity list for
   * this document.
   */
  id?: string;
  /**
   * Optional. Deprecated. Use `id` field instead.
   */
  mentionId?: string;
  /**
   * Optional. Text value of the entity e.g. `1600 Amphitheatre Pkwy`.
   */
  mentionText?: string;
  /**
   * Optional. Normalized entity value. Absent if the extracted value could not
   * be converted or the type (e.g. address) is not supported for certain
   * parsers. This field is also only populated for certain supported document
   * types.
   */
  normalizedValue?: GoogleCloudDocumentaiV1DocumentEntityNormalizedValue;
  /**
   * Optional. Represents the provenance of this entity wrt. the location on
   * the page where it was found.
   */
  pageAnchor?: GoogleCloudDocumentaiV1DocumentPageAnchor;
  /**
   * Optional. Entities can be nested to form a hierarchical data structure
   * representing the content in the document.
   */
  properties?: GoogleCloudDocumentaiV1DocumentEntity[];
  /**
   * Optional. The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
  /**
   * Optional. Whether the entity will be redacted for de-identification
   * purposes.
   */
  redacted?: boolean;
  /**
   * Optional. Provenance of the entity. Text anchor indexing into the
   * Document.text.
   */
  textAnchor?: GoogleCloudDocumentaiV1DocumentTextAnchor;
  /**
   * Required. Entity type from a schema e.g. `Address`.
   */
  type?: string;
}

function serializeGoogleCloudDocumentaiV1DocumentEntity(data: any): GoogleCloudDocumentaiV1DocumentEntity {
  return {
    ...data,
    normalizedValue: data["normalizedValue"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentEntityNormalizedValue(data["normalizedValue"]) : undefined,
    pageAnchor: data["pageAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageAnchor(data["pageAnchor"]) : undefined,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentEntity(item))) : undefined,
    textAnchor: data["textAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentEntity(data: any): GoogleCloudDocumentaiV1DocumentEntity {
  return {
    ...data,
    normalizedValue: data["normalizedValue"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentEntityNormalizedValue(data["normalizedValue"]) : undefined,
    pageAnchor: data["pageAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageAnchor(data["pageAnchor"]) : undefined,
    properties: data["properties"] !== undefined ? data["properties"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentEntity(item))) : undefined,
    textAnchor: data["textAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

/**
 * Parsed and normalized entity value.
 */
export interface GoogleCloudDocumentaiV1DocumentEntityNormalizedValue {
  /**
   * Postal address. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/postal_address.proto
   */
  addressValue?: GoogleTypePostalAddress;
  /**
   * Boolean value. Can be used for entities with binary values, or for
   * checkboxes.
   */
  booleanValue?: boolean;
  /**
   * DateTime value. Includes date, time, and timezone. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/datetime.proto
   */
  datetimeValue?: GoogleTypeDateTime;
  /**
   * Date value. Includes year, month, day. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/date.proto
   */
  dateValue?: GoogleTypeDate;
  /**
   * Float value.
   */
  floatValue?: number;
  /**
   * Integer value.
   */
  integerValue?: number;
  /**
   * Money value. See also:
   * https://github.com/googleapis/googleapis/blob/master/google/type/money.proto
   */
  moneyValue?: GoogleTypeMoney;
  /**
   * Optional. An optional field to store a normalized string. For some entity
   * types, one of respective `structured_value` fields may also be populated.
   * Also not all the types of `structured_value` will be normalized. For
   * example, some processors may not generate `float` or `integer` normalized
   * text by default. Below are sample formats mapped to structured values. -
   * Money/Currency type (`money_value`) is in the ISO 4217 text format. - Date
   * type (`date_value`) is in the ISO 8601 text format. - Datetime type
   * (`datetime_value`) is in the ISO 8601 text format.
   */
  text?: string;
}

function serializeGoogleCloudDocumentaiV1DocumentEntityNormalizedValue(data: any): GoogleCloudDocumentaiV1DocumentEntityNormalizedValue {
  return {
    ...data,
    datetimeValue: data["datetimeValue"] !== undefined ? serializeGoogleTypeDateTime(data["datetimeValue"]) : undefined,
    moneyValue: data["moneyValue"] !== undefined ? serializeGoogleTypeMoney(data["moneyValue"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentEntityNormalizedValue(data: any): GoogleCloudDocumentaiV1DocumentEntityNormalizedValue {
  return {
    ...data,
    datetimeValue: data["datetimeValue"] !== undefined ? deserializeGoogleTypeDateTime(data["datetimeValue"]) : undefined,
    moneyValue: data["moneyValue"] !== undefined ? deserializeGoogleTypeMoney(data["moneyValue"]) : undefined,
  };
}

/**
 * Relationship between Entities.
 */
export interface GoogleCloudDocumentaiV1DocumentEntityRelation {
  /**
   * Object entity id.
   */
  objectId?: string;
  /**
   * Relationship description.
   */
  relation?: string;
  /**
   * Subject entity id.
   */
  subjectId?: string;
}

/**
 * Config that controls the output of documents. All documents will be written
 * as a JSON file.
 */
export interface GoogleCloudDocumentaiV1DocumentOutputConfig {
  /**
   * Output config to write the results to Cloud Storage.
   */
  gcsOutputConfig?: GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig;
}

function serializeGoogleCloudDocumentaiV1DocumentOutputConfig(data: any): GoogleCloudDocumentaiV1DocumentOutputConfig {
  return {
    ...data,
    gcsOutputConfig: data["gcsOutputConfig"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig(data["gcsOutputConfig"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentOutputConfig(data: any): GoogleCloudDocumentaiV1DocumentOutputConfig {
  return {
    ...data,
    gcsOutputConfig: data["gcsOutputConfig"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig(data["gcsOutputConfig"]) : undefined,
  };
}

/**
 * The configuration used when outputting documents.
 */
export interface GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig {
  /**
   * Specifies which fields to include in the output documents. Only supports
   * top level document and pages field so it must be in the form of
   * `{document_field_name}` or `pages.{page_field_name}`.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * The Cloud Storage uri (a directory) of the output.
   */
  gcsUri?: string;
  /**
   * Specifies the sharding config for the output document.
   */
  shardingConfig?: GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfigShardingConfig;
}

function serializeGoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig(data: any): GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig(data: any): GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfig {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
  };
}

/**
 * The sharding config for the output document.
 */
export interface GoogleCloudDocumentaiV1DocumentOutputConfigGcsOutputConfigShardingConfig {
  /**
   * The number of overlapping pages between consecutive shards.
   */
  pagesOverlap?: number;
  /**
   * The number of pages per shard.
   */
  pagesPerShard?: number;
}

/**
 * A page in a Document.
 */
export interface GoogleCloudDocumentaiV1DocumentPage {
  /**
   * A list of visually detected text blocks on the page. A block has a set of
   * lines (collected into paragraphs) that have a common line-spacing and
   * orientation.
   */
  blocks?: GoogleCloudDocumentaiV1DocumentPageBlock[];
  /**
   * A list of detected barcodes.
   */
  detectedBarcodes?: GoogleCloudDocumentaiV1DocumentPageDetectedBarcode[];
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1DocumentPageDetectedLanguage[];
  /**
   * Physical dimension of the page.
   */
  dimension?: GoogleCloudDocumentaiV1DocumentPageDimension;
  /**
   * A list of visually detected form fields on the page.
   */
  formFields?: GoogleCloudDocumentaiV1DocumentPageFormField[];
  /**
   * Rendered image for this page. This image is preprocessed to remove any
   * skew, rotation, and distortions such that the annotation bounding boxes can
   * be upright and axis-aligned.
   */
  image?: GoogleCloudDocumentaiV1DocumentPageImage;
  /**
   * Image Quality Scores.
   */
  imageQualityScores?: GoogleCloudDocumentaiV1DocumentPageImageQualityScores;
  /**
   * Layout for the page.
   */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /**
   * A list of visually detected text lines on the page. A collection of tokens
   * that a human would perceive as a line.
   */
  lines?: GoogleCloudDocumentaiV1DocumentPageLine[];
  /**
   * 1-based index for current Page in a parent Document. Useful when a page is
   * taken out of a Document for individual processing.
   */
  pageNumber?: number;
  /**
   * A list of visually detected text paragraphs on the page. A collection of
   * lines that a human would perceive as a paragraph.
   */
  paragraphs?: GoogleCloudDocumentaiV1DocumentPageParagraph[];
  /**
   * The history of this page.
   */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
  /**
   * A list of visually detected symbols on the page.
   */
  symbols?: GoogleCloudDocumentaiV1DocumentPageSymbol[];
  /**
   * A list of visually detected tables on the page.
   */
  tables?: GoogleCloudDocumentaiV1DocumentPageTable[];
  /**
   * A list of visually detected tokens on the page.
   */
  tokens?: GoogleCloudDocumentaiV1DocumentPageToken[];
  /**
   * Transformation matrices that were applied to the original document image
   * to produce Page.image.
   */
  transforms?: GoogleCloudDocumentaiV1DocumentPageMatrix[];
  /**
   * A list of detected non-text visual elements e.g. checkbox, signature etc.
   * on the page.
   */
  visualElements?: GoogleCloudDocumentaiV1DocumentPageVisualElement[];
}

function serializeGoogleCloudDocumentaiV1DocumentPage(data: any): GoogleCloudDocumentaiV1DocumentPage {
  return {
    ...data,
    blocks: data["blocks"] !== undefined ? data["blocks"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageBlock(item))) : undefined,
    detectedBarcodes: data["detectedBarcodes"] !== undefined ? data["detectedBarcodes"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageDetectedBarcode(item))) : undefined,
    formFields: data["formFields"] !== undefined ? data["formFields"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageFormField(item))) : undefined,
    image: data["image"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageImage(data["image"]) : undefined,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
    lines: data["lines"] !== undefined ? data["lines"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageLine(item))) : undefined,
    paragraphs: data["paragraphs"] !== undefined ? data["paragraphs"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageParagraph(item))) : undefined,
    symbols: data["symbols"] !== undefined ? data["symbols"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageSymbol(item))) : undefined,
    tables: data["tables"] !== undefined ? data["tables"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageTable(item))) : undefined,
    tokens: data["tokens"] !== undefined ? data["tokens"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageToken(item))) : undefined,
    transforms: data["transforms"] !== undefined ? data["transforms"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageMatrix(item))) : undefined,
    visualElements: data["visualElements"] !== undefined ? data["visualElements"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageVisualElement(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPage(data: any): GoogleCloudDocumentaiV1DocumentPage {
  return {
    ...data,
    blocks: data["blocks"] !== undefined ? data["blocks"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageBlock(item))) : undefined,
    detectedBarcodes: data["detectedBarcodes"] !== undefined ? data["detectedBarcodes"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageDetectedBarcode(item))) : undefined,
    formFields: data["formFields"] !== undefined ? data["formFields"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageFormField(item))) : undefined,
    image: data["image"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageImage(data["image"]) : undefined,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
    lines: data["lines"] !== undefined ? data["lines"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageLine(item))) : undefined,
    paragraphs: data["paragraphs"] !== undefined ? data["paragraphs"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageParagraph(item))) : undefined,
    symbols: data["symbols"] !== undefined ? data["symbols"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageSymbol(item))) : undefined,
    tables: data["tables"] !== undefined ? data["tables"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageTable(item))) : undefined,
    tokens: data["tokens"] !== undefined ? data["tokens"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageToken(item))) : undefined,
    transforms: data["transforms"] !== undefined ? data["transforms"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageMatrix(item))) : undefined,
    visualElements: data["visualElements"] !== undefined ? data["visualElements"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageVisualElement(item))) : undefined,
  };
}

/**
 * Referencing the visual context of the entity in the Document.pages. Page
 * anchors can be cross-page, consist of multiple bounding polygons and
 * optionally reference specific layout element types.
 */
export interface GoogleCloudDocumentaiV1DocumentPageAnchor {
  /**
   * One or more references to visual page elements
   */
  pageRefs?: GoogleCloudDocumentaiV1DocumentPageAnchorPageRef[];
}

function serializeGoogleCloudDocumentaiV1DocumentPageAnchor(data: any): GoogleCloudDocumentaiV1DocumentPageAnchor {
  return {
    ...data,
    pageRefs: data["pageRefs"] !== undefined ? data["pageRefs"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageAnchorPageRef(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageAnchor(data: any): GoogleCloudDocumentaiV1DocumentPageAnchor {
  return {
    ...data,
    pageRefs: data["pageRefs"] !== undefined ? data["pageRefs"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageAnchorPageRef(item))) : undefined,
  };
}

/**
 * Represents a weak reference to a page element within a document.
 */
export interface GoogleCloudDocumentaiV1DocumentPageAnchorPageRef {
  /**
   * Optional. Identifies the bounding polygon of a layout element on the page.
   */
  boundingPoly?: GoogleCloudDocumentaiV1BoundingPoly;
  /**
   * Optional. Confidence of detected page element, if applicable. Range `[0,
   * 1]`.
   */
  confidence?: number;
  /**
   * Optional. Deprecated. Use PageRef.bounding_poly instead.
   */
  layoutId?: string;
  /**
   * Optional. The type of the layout element that is being referenced if any.
   */
  layoutType?:  | "LAYOUT_TYPE_UNSPECIFIED" | "BLOCK" | "PARAGRAPH" | "LINE" | "TOKEN" | "VISUAL_ELEMENT" | "TABLE" | "FORM_FIELD";
  /**
   * Required. Index into the Document.pages element, for example using
   * `Document.pages` to locate the related page element. This field is skipped
   * when its value is the default `0`. See
   * https://developers.google.com/protocol-buffers/docs/proto3#json.
   */
  page?: bigint;
}

function serializeGoogleCloudDocumentaiV1DocumentPageAnchorPageRef(data: any): GoogleCloudDocumentaiV1DocumentPageAnchorPageRef {
  return {
    ...data,
    page: data["page"] !== undefined ? String(data["page"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageAnchorPageRef(data: any): GoogleCloudDocumentaiV1DocumentPageAnchorPageRef {
  return {
    ...data,
    page: data["page"] !== undefined ? BigInt(data["page"]) : undefined,
  };
}

/**
 * A block has a set of lines (collected into paragraphs) that have a common
 * line-spacing and orientation.
 */
export interface GoogleCloudDocumentaiV1DocumentPageBlock {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1DocumentPageDetectedLanguage[];
  /**
   * Layout for Block.
   */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1DocumentPageBlock(data: any): GoogleCloudDocumentaiV1DocumentPageBlock {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageBlock(data: any): GoogleCloudDocumentaiV1DocumentPageBlock {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A detected barcode.
 */
export interface GoogleCloudDocumentaiV1DocumentPageDetectedBarcode {
  /**
   * Detailed barcode information of the DetectedBarcode.
   */
  barcode?: GoogleCloudDocumentaiV1Barcode;
  /**
   * Layout for DetectedBarcode.
   */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
}

function serializeGoogleCloudDocumentaiV1DocumentPageDetectedBarcode(data: any): GoogleCloudDocumentaiV1DocumentPageDetectedBarcode {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageDetectedBarcode(data: any): GoogleCloudDocumentaiV1DocumentPageDetectedBarcode {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * Detected language for a structural component.
 */
export interface GoogleCloudDocumentaiV1DocumentPageDetectedLanguage {
  /**
   * Confidence of detected language. Range `[0, 1]`.
   */
  confidence?: number;
  /**
   * The BCP-47 language code, such as `en-US` or `sr-Latn`. For more
   * information, see
   * https://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
}

/**
 * Dimension for the page.
 */
export interface GoogleCloudDocumentaiV1DocumentPageDimension {
  /**
   * Page height.
   */
  height?: number;
  /**
   * Dimension unit.
   */
  unit?: string;
  /**
   * Page width.
   */
  width?: number;
}

/**
 * A form field detected on the page.
 */
export interface GoogleCloudDocumentaiV1DocumentPageFormField {
  /**
   * Created for Labeling UI to export key text. If corrections were made to
   * the text identified by the `field_name.text_anchor`, this field will
   * contain the correction.
   */
  correctedKeyText?: string;
  /**
   * Created for Labeling UI to export value text. If corrections were made to
   * the text identified by the `field_value.text_anchor`, this field will
   * contain the correction.
   */
  correctedValueText?: string;
  /**
   * Layout for the FormField name. e.g. `Address`, `Email`, `Grand total`,
   * `Phone number`, etc.
   */
  fieldName?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /**
   * Layout for the FormField value.
   */
  fieldValue?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /**
   * A list of detected languages for name together with confidence.
   */
  nameDetectedLanguages?: GoogleCloudDocumentaiV1DocumentPageDetectedLanguage[];
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
  /**
   * A list of detected languages for value together with confidence.
   */
  valueDetectedLanguages?: GoogleCloudDocumentaiV1DocumentPageDetectedLanguage[];
  /**
   * If the value is non-textual, this field represents the type. Current valid
   * values are: - blank (this indicates the `field_value` is normal text) -
   * `unfilled_checkbox` - `filled_checkbox`
   */
  valueType?: string;
}

function serializeGoogleCloudDocumentaiV1DocumentPageFormField(data: any): GoogleCloudDocumentaiV1DocumentPageFormField {
  return {
    ...data,
    fieldName: data["fieldName"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageLayout(data["fieldName"]) : undefined,
    fieldValue: data["fieldValue"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageLayout(data["fieldValue"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageFormField(data: any): GoogleCloudDocumentaiV1DocumentPageFormField {
  return {
    ...data,
    fieldName: data["fieldName"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageLayout(data["fieldName"]) : undefined,
    fieldValue: data["fieldValue"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageLayout(data["fieldValue"]) : undefined,
  };
}

/**
 * Rendered image contents for this page.
 */
export interface GoogleCloudDocumentaiV1DocumentPageImage {
  /**
   * Raw byte content of the image.
   */
  content?: Uint8Array;
  /**
   * Height of the image in pixels.
   */
  height?: number;
  /**
   * Encoding mime type for the image.
   */
  mimeType?: string;
  /**
   * Width of the image in pixels.
   */
  width?: number;
}

function serializeGoogleCloudDocumentaiV1DocumentPageImage(data: any): GoogleCloudDocumentaiV1DocumentPageImage {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageImage(data: any): GoogleCloudDocumentaiV1DocumentPageImage {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * Image Quality Scores for the page image
 */
export interface GoogleCloudDocumentaiV1DocumentPageImageQualityScores {
  /**
   * A list of detected defects.
   */
  detectedDefects?: GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect[];
  /**
   * The overall quality score. Range `[0, 1]` where 1 is perfect quality.
   */
  qualityScore?: number;
}

/**
 * Image Quality Defects
 */
export interface GoogleCloudDocumentaiV1DocumentPageImageQualityScoresDetectedDefect {
  /**
   * Confidence of detected defect. Range `[0, 1]` where 1 indicates strong
   * confidence of that the defect exists.
   */
  confidence?: number;
  /**
   * Name of the defect type. Supported values are: - `quality/defect_blurry` -
   * `quality/defect_noisy` - `quality/defect_dark` - `quality/defect_faint` -
   * `quality/defect_text_too_small` - `quality/defect_document_cutoff` -
   * `quality/defect_text_cutoff` - `quality/defect_glare`
   */
  type?: string;
}

/**
 * Visual element describing a layout unit on a page.
 */
export interface GoogleCloudDocumentaiV1DocumentPageLayout {
  /**
   * The bounding polygon for the Layout.
   */
  boundingPoly?: GoogleCloudDocumentaiV1BoundingPoly;
  /**
   * Confidence of the current Layout within context of the object this layout
   * is for. e.g. confidence can be for a single token, a table, a visual
   * element, etc. depending on context. Range `[0, 1]`.
   */
  confidence?: number;
  /**
   * Detected orientation for the Layout.
   */
  orientation?:  | "ORIENTATION_UNSPECIFIED" | "PAGE_UP" | "PAGE_RIGHT" | "PAGE_DOWN" | "PAGE_LEFT";
  /**
   * Text anchor indexing into the Document.text.
   */
  textAnchor?: GoogleCloudDocumentaiV1DocumentTextAnchor;
}

function serializeGoogleCloudDocumentaiV1DocumentPageLayout(data: any): GoogleCloudDocumentaiV1DocumentPageLayout {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageLayout(data: any): GoogleCloudDocumentaiV1DocumentPageLayout {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

/**
 * A collection of tokens that a human would perceive as a line. Does not cross
 * column boundaries, can be horizontal, vertical, etc.
 */
export interface GoogleCloudDocumentaiV1DocumentPageLine {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1DocumentPageDetectedLanguage[];
  /**
   * Layout for Line.
   */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1DocumentPageLine(data: any): GoogleCloudDocumentaiV1DocumentPageLine {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageLine(data: any): GoogleCloudDocumentaiV1DocumentPageLine {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * Representation for transformation matrix, intended to be compatible and used
 * with OpenCV format for image manipulation.
 */
export interface GoogleCloudDocumentaiV1DocumentPageMatrix {
  /**
   * Number of columns in the matrix.
   */
  cols?: number;
  /**
   * The matrix data.
   */
  data?: Uint8Array;
  /**
   * Number of rows in the matrix.
   */
  rows?: number;
  /**
   * This encodes information about what data type the matrix uses. For
   * example, 0 (CV_8U) is an unsigned 8-bit image. For the full list of OpenCV
   * primitive data types, please refer to
   * https://docs.opencv.org/4.3.0/d1/d1b/group__core__hal__interface.html
   */
  type?: number;
}

function serializeGoogleCloudDocumentaiV1DocumentPageMatrix(data: any): GoogleCloudDocumentaiV1DocumentPageMatrix {
  return {
    ...data,
    data: data["data"] !== undefined ? encodeBase64(data["data"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageMatrix(data: any): GoogleCloudDocumentaiV1DocumentPageMatrix {
  return {
    ...data,
    data: data["data"] !== undefined ? decodeBase64(data["data"] as string) : undefined,
  };
}

/**
 * A collection of lines that a human would perceive as a paragraph.
 */
export interface GoogleCloudDocumentaiV1DocumentPageParagraph {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1DocumentPageDetectedLanguage[];
  /**
   * Layout for Paragraph.
   */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1DocumentPageParagraph(data: any): GoogleCloudDocumentaiV1DocumentPageParagraph {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageParagraph(data: any): GoogleCloudDocumentaiV1DocumentPageParagraph {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A detected symbol.
 */
export interface GoogleCloudDocumentaiV1DocumentPageSymbol {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1DocumentPageDetectedLanguage[];
  /**
   * Layout for Symbol.
   */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
}

function serializeGoogleCloudDocumentaiV1DocumentPageSymbol(data: any): GoogleCloudDocumentaiV1DocumentPageSymbol {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageSymbol(data: any): GoogleCloudDocumentaiV1DocumentPageSymbol {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A table representation similar to HTML table structure.
 */
export interface GoogleCloudDocumentaiV1DocumentPageTable {
  /**
   * Body rows of the table.
   */
  bodyRows?: GoogleCloudDocumentaiV1DocumentPageTableTableRow[];
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1DocumentPageDetectedLanguage[];
  /**
   * Header rows of the table.
   */
  headerRows?: GoogleCloudDocumentaiV1DocumentPageTableTableRow[];
  /**
   * Layout for Table.
   */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /**
   * The history of this table.
   */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1DocumentPageTable(data: any): GoogleCloudDocumentaiV1DocumentPageTable {
  return {
    ...data,
    bodyRows: data["bodyRows"] !== undefined ? data["bodyRows"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageTableTableRow(item))) : undefined,
    headerRows: data["headerRows"] !== undefined ? data["headerRows"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageTableTableRow(item))) : undefined,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageTable(data: any): GoogleCloudDocumentaiV1DocumentPageTable {
  return {
    ...data,
    bodyRows: data["bodyRows"] !== undefined ? data["bodyRows"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageTableTableRow(item))) : undefined,
    headerRows: data["headerRows"] !== undefined ? data["headerRows"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageTableTableRow(item))) : undefined,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A cell representation inside the table.
 */
export interface GoogleCloudDocumentaiV1DocumentPageTableTableCell {
  /**
   * How many columns this cell spans.
   */
  colSpan?: number;
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1DocumentPageDetectedLanguage[];
  /**
   * Layout for TableCell.
   */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /**
   * How many rows this cell spans.
   */
  rowSpan?: number;
}

function serializeGoogleCloudDocumentaiV1DocumentPageTableTableCell(data: any): GoogleCloudDocumentaiV1DocumentPageTableTableCell {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageTableTableCell(data: any): GoogleCloudDocumentaiV1DocumentPageTableTableCell {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * A row of table cells.
 */
export interface GoogleCloudDocumentaiV1DocumentPageTableTableRow {
  /**
   * Cells that make up this row.
   */
  cells?: GoogleCloudDocumentaiV1DocumentPageTableTableCell[];
}

function serializeGoogleCloudDocumentaiV1DocumentPageTableTableRow(data: any): GoogleCloudDocumentaiV1DocumentPageTableTableRow {
  return {
    ...data,
    cells: data["cells"] !== undefined ? data["cells"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentPageTableTableCell(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageTableTableRow(data: any): GoogleCloudDocumentaiV1DocumentPageTableTableRow {
  return {
    ...data,
    cells: data["cells"] !== undefined ? data["cells"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentPageTableTableCell(item))) : undefined,
  };
}

/**
 * A detected token.
 */
export interface GoogleCloudDocumentaiV1DocumentPageToken {
  /**
   * Detected break at the end of a Token.
   */
  detectedBreak?: GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak;
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1DocumentPageDetectedLanguage[];
  /**
   * Layout for Token.
   */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance;
}

function serializeGoogleCloudDocumentaiV1DocumentPageToken(data: any): GoogleCloudDocumentaiV1DocumentPageToken {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageToken(data: any): GoogleCloudDocumentaiV1DocumentPageToken {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * Detected break at the end of a Token.
 */
export interface GoogleCloudDocumentaiV1DocumentPageTokenDetectedBreak {
  /**
   * Detected break type.
   */
  type?:  | "TYPE_UNSPECIFIED" | "SPACE" | "WIDE_SPACE" | "HYPHEN";
}

/**
 * Detected non-text visual elements e.g. checkbox, signature etc. on the page.
 */
export interface GoogleCloudDocumentaiV1DocumentPageVisualElement {
  /**
   * A list of detected languages together with confidence.
   */
  detectedLanguages?: GoogleCloudDocumentaiV1DocumentPageDetectedLanguage[];
  /**
   * Layout for VisualElement.
   */
  layout?: GoogleCloudDocumentaiV1DocumentPageLayout;
  /**
   * Type of the VisualElement.
   */
  type?: string;
}

function serializeGoogleCloudDocumentaiV1DocumentPageVisualElement(data: any): GoogleCloudDocumentaiV1DocumentPageVisualElement {
  return {
    ...data,
    layout: data["layout"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentPageVisualElement(data: any): GoogleCloudDocumentaiV1DocumentPageVisualElement {
  return {
    ...data,
    layout: data["layout"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentPageLayout(data["layout"]) : undefined,
  };
}

/**
 * Structure to identify provenance relationships between annotations in
 * different revisions.
 */
export interface GoogleCloudDocumentaiV1DocumentProvenance {
  /**
   * The Id of this operation. Needs to be unique within the scope of the
   * revision.
   */
  id?: number;
  /**
   * References to the original elements that are replaced.
   */
  parents?: GoogleCloudDocumentaiV1DocumentProvenanceParent[];
  /**
   * The index of the revision that produced this element.
   */
  revision?: number;
  /**
   * The type of provenance operation.
   */
  type?:  | "OPERATION_TYPE_UNSPECIFIED" | "ADD" | "REMOVE" | "UPDATE" | "REPLACE" | "EVAL_REQUESTED" | "EVAL_APPROVED" | "EVAL_SKIPPED";
}

/**
 * The parent element the current element is based on. Used for
 * referencing/aligning, removal and replacement operations.
 */
export interface GoogleCloudDocumentaiV1DocumentProvenanceParent {
  /**
   * The id of the parent provenance.
   */
  id?: number;
  /**
   * The index of the parent item in the corresponding item list (eg. list of
   * entities, properties within entities, etc.) in the parent revision.
   */
  index?: number;
  /**
   * The index of the index into current revision's parent_ids list.
   */
  revision?: number;
}

/**
 * Contains past or forward revisions of this document.
 */
export interface GoogleCloudDocumentaiV1DocumentRevision {
  /**
   * If the change was made by a person specify the name or id of that person.
   */
  agent?: string;
  /**
   * The time that the revision was created, internally generated by doc proto
   * storage at the time of create.
   */
  createTime?: Date;
  /**
   * Human Review information of this revision.
   */
  humanReview?: GoogleCloudDocumentaiV1DocumentRevisionHumanReview;
  /**
   * Id of the revision, internally generated by doc proto storage. Unique
   * within the context of the document.
   */
  id?: string;
  /**
   * The revisions that this revision is based on. This can include one or more
   * parent (when documents are merged.) This field represents the index into
   * the `revisions` field.
   */
  parent?: number[];
  /**
   * The revisions that this revision is based on. Must include all the ids
   * that have anything to do with this revision - eg. there are
   * `provenance.parent.revision` fields that index into this field.
   */
  parentIds?: string[];
  /**
   * If the annotation was made by processor identify the processor by its
   * resource name.
   */
  processor?: string;
}

function serializeGoogleCloudDocumentaiV1DocumentRevision(data: any): GoogleCloudDocumentaiV1DocumentRevision {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentRevision(data: any): GoogleCloudDocumentaiV1DocumentRevision {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Human Review information of the document.
 */
export interface GoogleCloudDocumentaiV1DocumentRevisionHumanReview {
  /**
   * Human review state. e.g. `requested`, `succeeded`, `rejected`.
   */
  state?: string;
  /**
   * A message providing more details about the current state of processing.
   * For example, the rejection reason when the state is `rejected`.
   */
  stateMessage?: string;
}

/**
 * The schema defines the output of the processed document by a processor.
 */
export interface GoogleCloudDocumentaiV1DocumentSchema {
  /**
   * Description of the schema.
   */
  description?: string;
  /**
   * Display name to show to users.
   */
  displayName?: string;
  /**
   * Entity types of the schema.
   */
  entityTypes?: GoogleCloudDocumentaiV1DocumentSchemaEntityType[];
  /**
   * Metadata of the schema.
   */
  metadata?: GoogleCloudDocumentaiV1DocumentSchemaMetadata;
}

/**
 * EntityType is the wrapper of a label of the corresponding model with
 * detailed attributes and limitations for entity-based processors. Multiple
 * types can also compose a dependency tree to represent nested types.
 */
export interface GoogleCloudDocumentaiV1DocumentSchemaEntityType {
  /**
   * The entity type that this type is derived from. For now, one and only one
   * should be set.
   */
  baseTypes?: string[];
  /**
   * User defined name for the type.
   */
  displayName?: string;
  /**
   * If specified, lists all the possible values for this entity. This should
   * not be more than a handful of values. If the number of values is >10 or
   * could change frequently use the `EntityType.value_ontology` field and
   * specify a list of all possible values in a value ontology file.
   */
  enumValues?: GoogleCloudDocumentaiV1DocumentSchemaEntityTypeEnumValues;
  /**
   * Name of the type. It must be unique within the schema file and cannot be a
   * 'Common Type'. Besides that we use the following naming conventions: - *use
   * `snake_casing`* - name matching is case-sensitive - Maximum 64 characters.
   * - Must start with a letter. - Allowed characters: ASCII letters
   * `[a-z0-9_-]`. (For backward compatibility internal infrastructure and
   * tooling can handle any ascii character) - The `/` is sometimes used to
   * denote a property of a type. For example `line_item/amount`. This
   * convention is deprecated, but will still be honored for backward
   * compatibility.
   */
  name?: string;
  /**
   * Description the nested structure, or composition of an entity.
   */
  properties?: GoogleCloudDocumentaiV1DocumentSchemaEntityTypeProperty[];
}

/**
 * Defines the a list of enum values.
 */
export interface GoogleCloudDocumentaiV1DocumentSchemaEntityTypeEnumValues {
  /**
   * The individual values that this enum values type can include.
   */
  values?: string[];
}

/**
 * Defines properties that can be part of the entity type.
 */
export interface GoogleCloudDocumentaiV1DocumentSchemaEntityTypeProperty {
  /**
   * The name of the property. Follows the same guidelines as the EntityType
   * name.
   */
  name?: string;
  /**
   * Occurrence type limits the number of instances an entity type appears in
   * the document.
   */
  occurrenceType?:  | "OCCURRENCE_TYPE_UNSPECIFIED" | "OPTIONAL_ONCE" | "OPTIONAL_MULTIPLE" | "REQUIRED_ONCE" | "REQUIRED_MULTIPLE";
  /**
   * A reference to the value type of the property. This type is subject to the
   * same conventions as the `Entity.base_types` field.
   */
  valueType?: string;
}

/**
 * Metadata for global schema behavior.
 */
export interface GoogleCloudDocumentaiV1DocumentSchemaMetadata {
  /**
   * If true, on a given page, there can be multiple `document` annotations
   * covering it.
   */
  documentAllowMultipleLabels?: boolean;
  /**
   * If true, a `document` entity type can be applied to subdocument (
   * splitting). Otherwise, it can only be applied to the entire document
   * (classification).
   */
  documentSplitter?: boolean;
  /**
   * If set, all the nested entities must be prefixed with the parents.
   */
  prefixedNamingOnProperties?: boolean;
  /**
   * If set, we will skip the naming format validation in the schema. So the
   * string values in `DocumentSchema.EntityType.name` and
   * `DocumentSchema.EntityType.Property.name` will not be checked.
   */
  skipNamingValidation?: boolean;
}

/**
 * For a large document, sharding may be performed to produce several document
 * shards. Each document shard contains this field to detail which shard it is.
 */
export interface GoogleCloudDocumentaiV1DocumentShardInfo {
  /**
   * Total number of shards.
   */
  shardCount?: bigint;
  /**
   * The 0-based index of this shard.
   */
  shardIndex?: bigint;
  /**
   * The index of the first character in Document.text in the overall document
   * global text.
   */
  textOffset?: bigint;
}

function serializeGoogleCloudDocumentaiV1DocumentShardInfo(data: any): GoogleCloudDocumentaiV1DocumentShardInfo {
  return {
    ...data,
    shardCount: data["shardCount"] !== undefined ? String(data["shardCount"]) : undefined,
    shardIndex: data["shardIndex"] !== undefined ? String(data["shardIndex"]) : undefined,
    textOffset: data["textOffset"] !== undefined ? String(data["textOffset"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentShardInfo(data: any): GoogleCloudDocumentaiV1DocumentShardInfo {
  return {
    ...data,
    shardCount: data["shardCount"] !== undefined ? BigInt(data["shardCount"]) : undefined,
    shardIndex: data["shardIndex"] !== undefined ? BigInt(data["shardIndex"]) : undefined,
    textOffset: data["textOffset"] !== undefined ? BigInt(data["textOffset"]) : undefined,
  };
}

/**
 * Annotation for common text style attributes. This adheres to CSS conventions
 * as much as possible.
 */
export interface GoogleCloudDocumentaiV1DocumentStyle {
  /**
   * Text background color.
   */
  backgroundColor?: GoogleTypeColor;
  /**
   * Text color.
   */
  color?: GoogleTypeColor;
  /**
   * Font family such as `Arial`, `Times New Roman`.
   * https://www.w3schools.com/cssref/pr_font_font-family.asp
   */
  fontFamily?: string;
  /**
   * Font size.
   */
  fontSize?: GoogleCloudDocumentaiV1DocumentStyleFontSize;
  /**
   * Font weight. Possible values are normal, bold, bolder, and lighter.
   * https://www.w3schools.com/cssref/pr_font_weight.asp
   */
  fontWeight?: string;
  /**
   * Text anchor indexing into the Document.text.
   */
  textAnchor?: GoogleCloudDocumentaiV1DocumentTextAnchor;
  /**
   * Text decoration. Follows CSS standard.
   * https://www.w3schools.com/cssref/pr_text_text-decoration.asp
   */
  textDecoration?: string;
  /**
   * Text style. Possible values are normal, italic, and oblique.
   * https://www.w3schools.com/cssref/pr_font_font-style.asp
   */
  textStyle?: string;
}

function serializeGoogleCloudDocumentaiV1DocumentStyle(data: any): GoogleCloudDocumentaiV1DocumentStyle {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentStyle(data: any): GoogleCloudDocumentaiV1DocumentStyle {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

/**
 * Font size with unit.
 */
export interface GoogleCloudDocumentaiV1DocumentStyleFontSize {
  /**
   * Font size for the text.
   */
  size?: number;
  /**
   * Unit for the font size. Follows CSS naming (in, px, pt, etc.).
   */
  unit?: string;
}

/**
 * Text reference indexing into the Document.text.
 */
export interface GoogleCloudDocumentaiV1DocumentTextAnchor {
  /**
   * Contains the content of the text span so that users do not have to look it
   * up in the text_segments. It is always populated for formFields.
   */
  content?: string;
  /**
   * The text segments from the Document.text.
   */
  textSegments?: GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment[];
}

function serializeGoogleCloudDocumentaiV1DocumentTextAnchor(data: any): GoogleCloudDocumentaiV1DocumentTextAnchor {
  return {
    ...data,
    textSegments: data["textSegments"] !== undefined ? data["textSegments"].map((item: any) => (serializeGoogleCloudDocumentaiV1DocumentTextAnchorTextSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentTextAnchor(data: any): GoogleCloudDocumentaiV1DocumentTextAnchor {
  return {
    ...data,
    textSegments: data["textSegments"] !== undefined ? data["textSegments"].map((item: any) => (deserializeGoogleCloudDocumentaiV1DocumentTextAnchorTextSegment(item))) : undefined,
  };
}

/**
 * A text segment in the Document.text. The indices may be out of bounds which
 * indicate that the text extends into another document shard for large sharded
 * documents. See ShardInfo.text_offset
 */
export interface GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment {
  /**
   * TextSegment half open end UTF-8 char index in the Document.text.
   */
  endIndex?: bigint;
  /**
   * TextSegment start UTF-8 char index in the Document.text.
   */
  startIndex?: bigint;
}

function serializeGoogleCloudDocumentaiV1DocumentTextAnchorTextSegment(data: any): GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment {
  return {
    ...data,
    endIndex: data["endIndex"] !== undefined ? String(data["endIndex"]) : undefined,
    startIndex: data["startIndex"] !== undefined ? String(data["startIndex"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentTextAnchorTextSegment(data: any): GoogleCloudDocumentaiV1DocumentTextAnchorTextSegment {
  return {
    ...data,
    endIndex: data["endIndex"] !== undefined ? BigInt(data["endIndex"]) : undefined,
    startIndex: data["startIndex"] !== undefined ? BigInt(data["startIndex"]) : undefined,
  };
}

/**
 * This message is used for text changes aka. OCR corrections.
 */
export interface GoogleCloudDocumentaiV1DocumentTextChange {
  /**
   * The text that replaces the text identified in the `text_anchor`.
   */
  changedText?: string;
  /**
   * The history of this annotation.
   */
  provenance?: GoogleCloudDocumentaiV1DocumentProvenance[];
  /**
   * Provenance of the correction. Text anchor indexing into the Document.text.
   * There can only be a single `TextAnchor.text_segments` element. If the start
   * and end index of the text segment are the same, the text change is inserted
   * before that index.
   */
  textAnchor?: GoogleCloudDocumentaiV1DocumentTextAnchor;
}

function serializeGoogleCloudDocumentaiV1DocumentTextChange(data: any): GoogleCloudDocumentaiV1DocumentTextChange {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? serializeGoogleCloudDocumentaiV1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1DocumentTextChange(data: any): GoogleCloudDocumentaiV1DocumentTextChange {
  return {
    ...data,
    textAnchor: data["textAnchor"] !== undefined ? deserializeGoogleCloudDocumentaiV1DocumentTextAnchor(data["textAnchor"]) : undefined,
  };
}

/**
 * The long running operation metadata for enable processor method.
 */
export interface GoogleCloudDocumentaiV1EnableProcessorMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1EnableProcessorMetadata(data: any): GoogleCloudDocumentaiV1EnableProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1EnableProcessorMetadata(data: any): GoogleCloudDocumentaiV1EnableProcessorMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Request message for the enable processor method.
 */
export interface GoogleCloudDocumentaiV1EnableProcessorRequest {
}

/**
 * Response message for the enable processor method. Intentionally empty proto
 * for adding fields in future.
 */
export interface GoogleCloudDocumentaiV1EnableProcessorResponse {
}

/**
 * Metadata of the EvaluateProcessorVersion method.
 */
export interface GoogleCloudDocumentaiV1EvaluateProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1EvaluateProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1EvaluateProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1EvaluateProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1EvaluateProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Evaluates the given ProcessorVersion against the supplied documents.
 */
export interface GoogleCloudDocumentaiV1EvaluateProcessorVersionRequest {
  /**
   * Optional. The documents used in the evaluation. If unspecified, use the
   * processor's dataset as evaluation input.
   */
  evaluationDocuments?: GoogleCloudDocumentaiV1BatchDocumentsInputConfig;
}

/**
 * Metadata of the EvaluateProcessorVersion method.
 */
export interface GoogleCloudDocumentaiV1EvaluateProcessorVersionResponse {
  /**
   * The resource name of the created evaluation.
   */
  evaluation?: string;
}

/**
 * An evaluation of a ProcessorVersion's performance.
 */
export interface GoogleCloudDocumentaiV1Evaluation {
  /**
   * Metrics for all the entities in aggregate.
   */
  allEntitiesMetrics?: GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics;
  /**
   * The time that the evaluation was created.
   */
  createTime?: Date;
  /**
   * Counters for the documents used in the evaluation.
   */
  documentCounters?: GoogleCloudDocumentaiV1EvaluationCounters;
  /**
   * Metrics across confidence levels, for different entities.
   */
  entityMetrics?: {
    [key: string]: GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics
  };
  /**
   * The KMS key name used for encryption.
   */
  kmsKeyName?: string;
  /**
   * The KMS key version with which data is encrypted.
   */
  kmsKeyVersionName?: string;
  /**
   * The resource name of the evaluation. Format:
   * `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processor_version}/evaluations/{evaluation}`
   */
  name?: string;
}

function serializeGoogleCloudDocumentaiV1Evaluation(data: any): GoogleCloudDocumentaiV1Evaluation {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1Evaluation(data: any): GoogleCloudDocumentaiV1Evaluation {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * Evaluations metrics, at a specific confidence level.
 */
export interface GoogleCloudDocumentaiV1EvaluationConfidenceLevelMetrics {
  /**
   * The confidence level.
   */
  confidenceLevel?: number;
  /**
   * The metrics at the specific confidence level.
   */
  metrics?: GoogleCloudDocumentaiV1EvaluationMetrics;
}

/**
 * Evaluation counters for the documents that were used.
 */
export interface GoogleCloudDocumentaiV1EvaluationCounters {
  /**
   * How many documents were used in the evaluation.
   */
  evaluatedDocumentsCount?: number;
  /**
   * How many documents were not included in the evaluation as Document AI
   * failed to process them.
   */
  failedDocumentsCount?: number;
  /**
   * How many documents were sent for evaluation.
   */
  inputDocumentsCount?: number;
  /**
   * How many documents were not included in the evaluation as they didn't pass
   * validation.
   */
  invalidDocumentsCount?: number;
}

/**
 * Evaluation metrics, either in aggregate or about a specific entity.
 */
export interface GoogleCloudDocumentaiV1EvaluationMetrics {
  /**
   * The calculated f1 score.
   */
  f1Score?: number;
  /**
   * The amount of false negatives.
   */
  falseNegativesCount?: number;
  /**
   * The amount of false positives.
   */
  falsePositivesCount?: number;
  /**
   * The amount of documents with a ground truth occurrence.
   */
  groundTruthDocumentCount?: number;
  /**
   * The amount of occurrences in ground truth documents.
   */
  groundTruthOccurrencesCount?: number;
  /**
   * The calculated precision.
   */
  precision?: number;
  /**
   * The amount of documents with a predicted occurrence.
   */
  predictedDocumentCount?: number;
  /**
   * The amount of occurrences in predicted documents.
   */
  predictedOccurrencesCount?: number;
  /**
   * The calculated recall.
   */
  recall?: number;
  /**
   * The amount of documents that had an occurrence of this label.
   */
  totalDocumentsCount?: number;
  /**
   * The amount of true positives.
   */
  truePositivesCount?: number;
}

/**
 * Metrics across multiple confidence levels.
 */
export interface GoogleCloudDocumentaiV1EvaluationMultiConfidenceMetrics {
  /**
   * The calculated area under the precision recall curve (AUPRC), computed by
   * integrating over all confidence thresholds.
   */
  auprc?: number;
  /**
   * The AUPRC for metrics with fuzzy matching disabled, i.e., exact matching
   * only.
   */
  auprcExact?: number;
  /**
   * Metrics across confidence levels with fuzzy matching enabled.
   */
  confidenceLevelMetrics?: GoogleCloudDocumentaiV1EvaluationConfidenceLevelMetrics[];
  /**
   * Metrics across confidence levels with only exact matching.
   */
  confidenceLevelMetricsExact?: GoogleCloudDocumentaiV1EvaluationConfidenceLevelMetrics[];
  /**
   * The Estimated Calibration Error (ECE) of the confidence of the predicted
   * entities.
   */
  estimatedCalibrationError?: number;
  /**
   * The ECE for the predicted entities with fuzzy matching disabled, i.e.,
   * exact matching only.
   */
  estimatedCalibrationErrorExact?: number;
  /**
   * The metrics type for the label.
   */
  metricsType?:  | "METRICS_TYPE_UNSPECIFIED" | "AGGREGATE";
}

/**
 * Gives a short summary of an evaluation, and links to the evaluation itself.
 */
export interface GoogleCloudDocumentaiV1EvaluationReference {
  /**
   * An aggregate of the statistics for the evaluation with fuzzy matching on.
   */
  aggregateMetrics?: GoogleCloudDocumentaiV1EvaluationMetrics;
  /**
   * An aggregate of the statistics for the evaluation with fuzzy matching off.
   */
  aggregateMetricsExact?: GoogleCloudDocumentaiV1EvaluationMetrics;
  /**
   * The resource name of the evaluation.
   */
  evaluation?: string;
  /**
   * The resource name of the Long Running Operation for the evaluation.
   */
  operation?: string;
}

/**
 * Response message for fetch processor types.
 */
export interface GoogleCloudDocumentaiV1FetchProcessorTypesResponse {
  /**
   * The list of processor types.
   */
  processorTypes?: GoogleCloudDocumentaiV1ProcessorType[];
}

/**
 * Specifies a document stored on Cloud Storage.
 */
export interface GoogleCloudDocumentaiV1GcsDocument {
  /**
   * The Cloud Storage object uri.
   */
  gcsUri?: string;
  /**
   * An IANA MIME type (RFC6838) of the content.
   */
  mimeType?: string;
}

/**
 * Specifies a set of documents on Cloud Storage.
 */
export interface GoogleCloudDocumentaiV1GcsDocuments {
  /**
   * The list of documents.
   */
  documents?: GoogleCloudDocumentaiV1GcsDocument[];
}

/**
 * Specifies all documents on Cloud Storage with a common prefix.
 */
export interface GoogleCloudDocumentaiV1GcsPrefix {
  /**
   * The URI prefix.
   */
  gcsUriPrefix?: string;
}

/**
 * The status of human review on a processed document.
 */
export interface GoogleCloudDocumentaiV1HumanReviewStatus {
  /**
   * The name of the operation triggered by the processed document. This field
   * is populated only when the [state] is [HUMAN_REVIEW_IN_PROGRESS]. It has
   * the same response type and metadata as the long running operation returned
   * by [ReviewDocument] method.
   */
  humanReviewOperation?: string;
  /**
   * The state of human review on the processing request.
   */
  state?:  | "STATE_UNSPECIFIED" | "SKIPPED" | "VALIDATION_PASSED" | "IN_PROGRESS" | "ERROR";
  /**
   * A message providing more details about the human review state.
   */
  stateMessage?: string;
}

/**
 * The response from ListEvaluations.
 */
export interface GoogleCloudDocumentaiV1ListEvaluationsResponse {
  /**
   * The evaluations requested.
   */
  evaluations?: GoogleCloudDocumentaiV1Evaluation[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudDocumentaiV1ListEvaluationsResponse(data: any): GoogleCloudDocumentaiV1ListEvaluationsResponse {
  return {
    ...data,
    evaluations: data["evaluations"] !== undefined ? data["evaluations"].map((item: any) => (serializeGoogleCloudDocumentaiV1Evaluation(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1ListEvaluationsResponse(data: any): GoogleCloudDocumentaiV1ListEvaluationsResponse {
  return {
    ...data,
    evaluations: data["evaluations"] !== undefined ? data["evaluations"].map((item: any) => (deserializeGoogleCloudDocumentaiV1Evaluation(item))) : undefined,
  };
}

/**
 * Response message for list processors.
 */
export interface GoogleCloudDocumentaiV1ListProcessorsResponse {
  /**
   * Points to the next processor, otherwise empty.
   */
  nextPageToken?: string;
  /**
   * The list of processors.
   */
  processors?: GoogleCloudDocumentaiV1Processor[];
}

function serializeGoogleCloudDocumentaiV1ListProcessorsResponse(data: any): GoogleCloudDocumentaiV1ListProcessorsResponse {
  return {
    ...data,
    processors: data["processors"] !== undefined ? data["processors"].map((item: any) => (serializeGoogleCloudDocumentaiV1Processor(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1ListProcessorsResponse(data: any): GoogleCloudDocumentaiV1ListProcessorsResponse {
  return {
    ...data,
    processors: data["processors"] !== undefined ? data["processors"].map((item: any) => (deserializeGoogleCloudDocumentaiV1Processor(item))) : undefined,
  };
}

/**
 * Response message for list processor types.
 */
export interface GoogleCloudDocumentaiV1ListProcessorTypesResponse {
  /**
   * Points to the next page, otherwise empty.
   */
  nextPageToken?: string;
  /**
   * The processor types.
   */
  processorTypes?: GoogleCloudDocumentaiV1ProcessorType[];
}

/**
 * Response message for list processors.
 */
export interface GoogleCloudDocumentaiV1ListProcessorVersionsResponse {
  /**
   * Points to the next processor, otherwise empty.
   */
  nextPageToken?: string;
  /**
   * The list of processors.
   */
  processorVersions?: GoogleCloudDocumentaiV1ProcessorVersion[];
}

function serializeGoogleCloudDocumentaiV1ListProcessorVersionsResponse(data: any): GoogleCloudDocumentaiV1ListProcessorVersionsResponse {
  return {
    ...data,
    processorVersions: data["processorVersions"] !== undefined ? data["processorVersions"].map((item: any) => (serializeGoogleCloudDocumentaiV1ProcessorVersion(item))) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1ListProcessorVersionsResponse(data: any): GoogleCloudDocumentaiV1ListProcessorVersionsResponse {
  return {
    ...data,
    processorVersions: data["processorVersions"] !== undefined ? data["processorVersions"].map((item: any) => (deserializeGoogleCloudDocumentaiV1ProcessorVersion(item))) : undefined,
  };
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface GoogleCloudDocumentaiV1NormalizedVertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate (starts from the top of the image).
   */
  y?: number;
}

/**
 * The first-class citizen for Document AI. Each processor defines how to
 * extract structural information from a document.
 */
export interface GoogleCloudDocumentaiV1Processor {
  /**
   * The time the processor was created.
   */
  createTime?: Date;
  /**
   * The default processor version.
   */
  defaultProcessorVersion?: string;
  /**
   * The display name of the processor.
   */
  displayName?: string;
  /**
   * The KMS key used for encryption/decryption in CMEK scenarios. See
   * https://cloud.google.com/security-key-management.
   */
  kmsKeyName?: string;
  /**
   * Output only. Immutable. The resource name of the processor. Format:
   * `projects/{project}/locations/{location}/processors/{processor}`
   */
  readonly name?: string;
  /**
   * Output only. Immutable. The http endpoint that can be called to invoke
   * processing.
   */
  readonly processEndpoint?: string;
  /**
   * Output only. The state of the processor.
   */
  readonly state?:  | "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | "ENABLING" | "DISABLING" | "CREATING" | "FAILED" | "DELETING";
  /**
   * The processor type, e.g., `OCR_PROCESSOR`, `INVOICE_PROCESSOR`, etc. To
   * get a list of processors types, see FetchProcessorTypes.
   */
  type?: string;
}

function serializeGoogleCloudDocumentaiV1Processor(data: any): GoogleCloudDocumentaiV1Processor {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1Processor(data: any): GoogleCloudDocumentaiV1Processor {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
  };
}

/**
 * A processor type is responsible for performing a certain document
 * understanding task on a certain type of document.
 */
export interface GoogleCloudDocumentaiV1ProcessorType {
  /**
   * Whether the processor type allows creation. If true, users can create a
   * processor of this processor type. Otherwise, users need to request access.
   */
  allowCreation?: boolean;
  /**
   * The locations in which this processor is available.
   */
  availableLocations?: GoogleCloudDocumentaiV1ProcessorTypeLocationInfo[];
  /**
   * The processor category, used by UI to group processor types.
   */
  category?: string;
  /**
   * Launch stage of the processor type
   */
  launchStage?:  | "LAUNCH_STAGE_UNSPECIFIED" | "UNIMPLEMENTED" | "PRELAUNCH" | "EARLY_ACCESS" | "ALPHA" | "BETA" | "GA" | "DEPRECATED";
  /**
   * The resource name of the processor type. Format:
   * `projects/{project}/processorTypes/{processor_type}`
   */
  name?: string;
  /**
   * A set of Cloud Storage URIs of sample documents for this processor.
   */
  sampleDocumentUris?: string[];
  /**
   * The processor type, e.g., `OCR_PROCESSOR`, `INVOICE_PROCESSOR`, etc.
   */
  type?: string;
}

/**
 * The location information about where the processor is available.
 */
export interface GoogleCloudDocumentaiV1ProcessorTypeLocationInfo {
  /**
   * The location id, currently must be one of [us, eu].
   */
  locationId?: string;
}

/**
 * A processor version is an implementation of a processor. Each processor can
 * have multiple versions, pre-trained by Google internally or up-trained by the
 * customer. At a time, a processor can only have one default version version.
 * So the processor's behavior (when processing documents) is defined by a
 * default version
 */
export interface GoogleCloudDocumentaiV1ProcessorVersion {
  /**
   * The time the processor version was created.
   */
  createTime?: Date;
  /**
   * If set, information about the eventual deprecation of this version.
   */
  deprecationInfo?: GoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo;
  /**
   * The display name of the processor version.
   */
  displayName?: string;
  /**
   * The schema of the processor version. Describes the output.
   */
  documentSchema?: GoogleCloudDocumentaiV1DocumentSchema;
  /**
   * Denotes that this ProcessorVersion is managed by google.
   */
  googleManaged?: boolean;
  /**
   * The KMS key name used for encryption.
   */
  kmsKeyName?: string;
  /**
   * The KMS key version with which data is encrypted.
   */
  kmsKeyVersionName?: string;
  /**
   * The most recently invoked evaluation for the processor version.
   */
  latestEvaluation?: GoogleCloudDocumentaiV1EvaluationReference;
  /**
   * The resource name of the processor version. Format:
   * `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processor_version}`
   */
  name?: string;
  /**
   * The state of the processor version.
   */
  state?:  | "STATE_UNSPECIFIED" | "DEPLOYED" | "DEPLOYING" | "UNDEPLOYED" | "UNDEPLOYING" | "CREATING" | "DELETING" | "FAILED";
}

function serializeGoogleCloudDocumentaiV1ProcessorVersion(data: any): GoogleCloudDocumentaiV1ProcessorVersion {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? data["createTime"].toISOString() : undefined,
    deprecationInfo: data["deprecationInfo"] !== undefined ? serializeGoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo(data["deprecationInfo"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1ProcessorVersion(data: any): GoogleCloudDocumentaiV1ProcessorVersion {
  return {
    ...data,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    deprecationInfo: data["deprecationInfo"] !== undefined ? deserializeGoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo(data["deprecationInfo"]) : undefined,
  };
}

/**
 * Information about the upcoming deprecation of this processor version.
 */
export interface GoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo {
  /**
   * The time at which this processor version will be deprecated.
   */
  deprecationTime?: Date;
  /**
   * If set, the processor version that will be used as a replacement.
   */
  replacementProcessorVersion?: string;
}

function serializeGoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo(data: any): GoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo {
  return {
    ...data,
    deprecationTime: data["deprecationTime"] !== undefined ? data["deprecationTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo(data: any): GoogleCloudDocumentaiV1ProcessorVersionDeprecationInfo {
  return {
    ...data,
    deprecationTime: data["deprecationTime"] !== undefined ? new Date(data["deprecationTime"]) : undefined,
  };
}

/**
 * Request message for the process document method.
 */
export interface GoogleCloudDocumentaiV1ProcessRequest {
  /**
   * Specifies which fields to include in ProcessResponse's document. Only
   * supports top level document and pages field so it must be in the form of
   * `{document_field_name}` or `pages.{page_field_name}`.
   */
  fieldMask?: string /* FieldMask */;
  /**
   * An inline document proto.
   */
  inlineDocument?: GoogleCloudDocumentaiV1Document;
  /**
   * A raw document content (bytes).
   */
  rawDocument?: GoogleCloudDocumentaiV1RawDocument;
  /**
   * Whether Human Review feature should be skipped for this request. Default
   * to false.
   */
  skipHumanReview?: boolean;
}

function serializeGoogleCloudDocumentaiV1ProcessRequest(data: any): GoogleCloudDocumentaiV1ProcessRequest {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    inlineDocument: data["inlineDocument"] !== undefined ? serializeGoogleCloudDocumentaiV1Document(data["inlineDocument"]) : undefined,
    rawDocument: data["rawDocument"] !== undefined ? serializeGoogleCloudDocumentaiV1RawDocument(data["rawDocument"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1ProcessRequest(data: any): GoogleCloudDocumentaiV1ProcessRequest {
  return {
    ...data,
    fieldMask: data["fieldMask"] !== undefined ? data["fieldMask"] : undefined,
    inlineDocument: data["inlineDocument"] !== undefined ? deserializeGoogleCloudDocumentaiV1Document(data["inlineDocument"]) : undefined,
    rawDocument: data["rawDocument"] !== undefined ? deserializeGoogleCloudDocumentaiV1RawDocument(data["rawDocument"]) : undefined,
  };
}

/**
 * Response message for the process document method.
 */
export interface GoogleCloudDocumentaiV1ProcessResponse {
  /**
   * The document payload, will populate fields based on the processor's
   * behavior.
   */
  document?: GoogleCloudDocumentaiV1Document;
  /**
   * The status of human review on the processed document.
   */
  humanReviewStatus?: GoogleCloudDocumentaiV1HumanReviewStatus;
}

function serializeGoogleCloudDocumentaiV1ProcessResponse(data: any): GoogleCloudDocumentaiV1ProcessResponse {
  return {
    ...data,
    document: data["document"] !== undefined ? serializeGoogleCloudDocumentaiV1Document(data["document"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1ProcessResponse(data: any): GoogleCloudDocumentaiV1ProcessResponse {
  return {
    ...data,
    document: data["document"] !== undefined ? deserializeGoogleCloudDocumentaiV1Document(data["document"]) : undefined,
  };
}

/**
 * Payload message of raw document content (bytes).
 */
export interface GoogleCloudDocumentaiV1RawDocument {
  /**
   * Inline document content.
   */
  content?: Uint8Array;
  /**
   * An IANA MIME type (RFC6838) indicating the nature and format of the
   * content.
   */
  mimeType?: string;
}

function serializeGoogleCloudDocumentaiV1RawDocument(data: any): GoogleCloudDocumentaiV1RawDocument {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1RawDocument(data: any): GoogleCloudDocumentaiV1RawDocument {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * The long running operation metadata for review document method.
 */
export interface GoogleCloudDocumentaiV1ReviewDocumentOperationMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
  /**
   * The Crowd Compute question ID.
   */
  questionId?: string;
}

function serializeGoogleCloudDocumentaiV1ReviewDocumentOperationMetadata(data: any): GoogleCloudDocumentaiV1ReviewDocumentOperationMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1ReviewDocumentOperationMetadata(data: any): GoogleCloudDocumentaiV1ReviewDocumentOperationMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Request message for review document method.
 */
export interface GoogleCloudDocumentaiV1ReviewDocumentRequest {
  /**
   * The document schema of the human review task.
   */
  documentSchema?: GoogleCloudDocumentaiV1DocumentSchema;
  /**
   * Whether the validation should be performed on the ad-hoc review request.
   */
  enableSchemaValidation?: boolean;
  /**
   * An inline document proto.
   */
  inlineDocument?: GoogleCloudDocumentaiV1Document;
  /**
   * The priority of the human review task.
   */
  priority?:  | "DEFAULT" | "URGENT";
}

function serializeGoogleCloudDocumentaiV1ReviewDocumentRequest(data: any): GoogleCloudDocumentaiV1ReviewDocumentRequest {
  return {
    ...data,
    inlineDocument: data["inlineDocument"] !== undefined ? serializeGoogleCloudDocumentaiV1Document(data["inlineDocument"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1ReviewDocumentRequest(data: any): GoogleCloudDocumentaiV1ReviewDocumentRequest {
  return {
    ...data,
    inlineDocument: data["inlineDocument"] !== undefined ? deserializeGoogleCloudDocumentaiV1Document(data["inlineDocument"]) : undefined,
  };
}

/**
 * Response message for review document method.
 */
export interface GoogleCloudDocumentaiV1ReviewDocumentResponse {
  /**
   * The Cloud Storage uri for the human reviewed document if the review is
   * succeeded.
   */
  gcsDestination?: string;
  /**
   * The reason why the review is rejected by reviewer.
   */
  rejectionReason?: string;
  /**
   * The state of the review operation.
   */
  state?:  | "STATE_UNSPECIFIED" | "REJECTED" | "SUCCEEDED";
}

/**
 * The long running operation metadata for set default processor version
 * method.
 */
export interface GoogleCloudDocumentaiV1SetDefaultProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1SetDefaultProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1SetDefaultProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1SetDefaultProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1SetDefaultProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Request message for the set default processor version method.
 */
export interface GoogleCloudDocumentaiV1SetDefaultProcessorVersionRequest {
  /**
   * Required. The resource name of child ProcessorVersion to use as default.
   * Format:
   * `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{version}`
   */
  defaultProcessorVersion?: string;
}

/**
 * Response message for set default processor version method.
 */
export interface GoogleCloudDocumentaiV1SetDefaultProcessorVersionResponse {
}

/**
 * The metadata that represents a processor version being created.
 */
export interface GoogleCloudDocumentaiV1TrainProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
  /**
   * The test dataset validation information.
   */
  testDatasetValidation?: GoogleCloudDocumentaiV1TrainProcessorVersionMetadataDatasetValidation;
  /**
   * The training dataset validation information.
   */
  trainingDatasetValidation?: GoogleCloudDocumentaiV1TrainProcessorVersionMetadataDatasetValidation;
}

function serializeGoogleCloudDocumentaiV1TrainProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1TrainProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1TrainProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1TrainProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * The dataset validation information. This includes any and all errors with
 * documents and the dataset.
 */
export interface GoogleCloudDocumentaiV1TrainProcessorVersionMetadataDatasetValidation {
  /**
   * The total number of dataset errors.
   */
  datasetErrorCount?: number;
  /**
   * Error information for the dataset as a whole. A maximum of 10 dataset
   * errors will be returned. A single dataset error is terminal for training.
   */
  datasetErrors?: GoogleRpcStatus[];
  /**
   * The total number of document errors.
   */
  documentErrorCount?: number;
  /**
   * Error information pertaining to specific documents. A maximum of 10
   * document errors will be returned. Any document with errors will not be used
   * throughout training.
   */
  documentErrors?: GoogleRpcStatus[];
}

/**
 * Request message for the create processor version method.
 */
export interface GoogleCloudDocumentaiV1TrainProcessorVersionRequest {
  /**
   * Optional. The processor version to use as a base for training. This
   * processor version must be a child of `parent`. Format:
   * `projects/{project}/locations/{location}/processors/{processor}/processorVersions/{processorVersion}`.
   */
  baseProcessorVersion?: string;
  /**
   * Optional. The schema the processor version will be trained with.
   */
  documentSchema?: GoogleCloudDocumentaiV1DocumentSchema;
  /**
   * Optional. The input data used to train the `ProcessorVersion`.
   */
  inputData?: GoogleCloudDocumentaiV1TrainProcessorVersionRequestInputData;
  /**
   * Required. The processor version to be created.
   */
  processorVersion?: GoogleCloudDocumentaiV1ProcessorVersion;
}

function serializeGoogleCloudDocumentaiV1TrainProcessorVersionRequest(data: any): GoogleCloudDocumentaiV1TrainProcessorVersionRequest {
  return {
    ...data,
    processorVersion: data["processorVersion"] !== undefined ? serializeGoogleCloudDocumentaiV1ProcessorVersion(data["processorVersion"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1TrainProcessorVersionRequest(data: any): GoogleCloudDocumentaiV1TrainProcessorVersionRequest {
  return {
    ...data,
    processorVersion: data["processorVersion"] !== undefined ? deserializeGoogleCloudDocumentaiV1ProcessorVersion(data["processorVersion"]) : undefined,
  };
}

/**
 * The input data used to train a new `ProcessorVersion`.
 */
export interface GoogleCloudDocumentaiV1TrainProcessorVersionRequestInputData {
  /**
   * The documents used for testing the trained version.
   */
  testDocuments?: GoogleCloudDocumentaiV1BatchDocumentsInputConfig;
  /**
   * The documents used for training the new version.
   */
  trainingDocuments?: GoogleCloudDocumentaiV1BatchDocumentsInputConfig;
}

/**
 * The response for the TrainProcessorVersion method.
 */
export interface GoogleCloudDocumentaiV1TrainProcessorVersionResponse {
  /**
   * The resource name of the processor version produced by training.
   */
  processorVersion?: string;
}

/**
 * The long running operation metadata for the undeploy processor version
 * method.
 */
export interface GoogleCloudDocumentaiV1UndeployProcessorVersionMetadata {
  /**
   * The basic metadata of the long running operation.
   */
  commonMetadata?: GoogleCloudDocumentaiV1CommonOperationMetadata;
}

function serializeGoogleCloudDocumentaiV1UndeployProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1UndeployProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? serializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

function deserializeGoogleCloudDocumentaiV1UndeployProcessorVersionMetadata(data: any): GoogleCloudDocumentaiV1UndeployProcessorVersionMetadata {
  return {
    ...data,
    commonMetadata: data["commonMetadata"] !== undefined ? deserializeGoogleCloudDocumentaiV1CommonOperationMetadata(data["commonMetadata"]) : undefined,
  };
}

/**
 * Request message for the undeploy processor version method.
 */
export interface GoogleCloudDocumentaiV1UndeployProcessorVersionRequest {
}

/**
 * Response message for the undeploy processor version method.
 */
export interface GoogleCloudDocumentaiV1UndeployProcessorVersionResponse {
}

/**
 * A vertex represents a 2D point in the image. NOTE: the vertex coordinates
 * are in the same scale as the original image.
 */
export interface GoogleCloudDocumentaiV1Vertex {
  /**
   * X coordinate.
   */
  x?: number;
  /**
   * Y coordinate (starts from the top of the image).
   */
  y?: number;
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
 * Represents a color in the RGBA color space. This representation is designed
 * for simplicity of conversion to/from color representations in various
 * languages over compactness. For example, the fields of this representation
 * can be trivially provided to the constructor of `java.awt.Color` in Java; it
 * can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha`
 * method in iOS; and, with just a little work, it can be easily formatted into
 * a CSS `rgba()` string in JavaScript. This reference page doesn't carry
 * information about the absolute color space that should be used to interpret
 * the RGB value (e.g. sRGB, Adobe RGB, DCI-P3, BT.2020, etc.). By default,
 * applications should assume the sRGB color space. When color equality needs to
 * be decided, implementations, unless documented otherwise, treat two colors as
 * equal if all their red, green, blue, and alpha values each differ by at most
 * 1e-5. Example (Java): import com.google.type.Color; // ... public static
 * java.awt.Color fromProto(Color protocolor) { float alpha =
 * protocolor.hasAlpha() ? protocolor.getAlpha().getValue() : 1.0; return new
 * java.awt.Color( protocolor.getRed(), protocolor.getGreen(),
 * protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color
 * color) { float red = (float) color.getRed(); float green = (float)
 * color.getGreen(); float blue = (float) color.getBlue(); float denominator =
 * 255.0; Color.Builder resultBuilder = Color .newBuilder() .setRed(red /
 * denominator) .setGreen(green / denominator) .setBlue(blue / denominator); int
 * alpha = color.getAlpha(); if (alpha != 255) { result.setAlpha( FloatValue
 * .newBuilder() .setValue(((float) alpha) / denominator) .build()); } return
 * resultBuilder.build(); } // ... Example (iOS / Obj-C): // ... static UIColor*
 * fromProto(Color* protocolor) { float red = [protocolor red]; float green =
 * [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper
 * = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper != nil) { alpha =
 * [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green
 * blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat
 * red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue
 * alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result
 * setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <=
 * 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result
 * autorelease]; return result; } // ... Example (JavaScript): // ... var
 * protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0;
 * var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0;
 * var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255);
 * var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return
 * rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value ||
 * 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(',
 * rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor =
 * function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green
 * << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 -
 * hexString.length; var resultBuilder = ['#']; for (var i = 0; i <
 * missingZeros; i++) { resultBuilder.push('0'); }
 * resultBuilder.push(hexString); return resultBuilder.join(''); }; // ...
 */
export interface GoogleTypeColor {
  /**
   * The fraction of this color that should be applied to the pixel. That is,
   * the final pixel color is defined by the equation: `pixel color = alpha *
   * (this color) + (1.0 - alpha) * (background color)` This means that a value
   * of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to
   * a completely transparent color. This uses a wrapper message rather than a
   * simple float scalar so that it is possible to distinguish between a default
   * value and the value being unset. If omitted, this color object is rendered
   * as a solid color (as if the alpha value had been explicitly given a value
   * of 1.0).
   */
  alpha?: number;
  /**
   * The amount of blue in the color as a value in the interval [0, 1].
   */
  blue?: number;
  /**
   * The amount of green in the color as a value in the interval [0, 1].
   */
  green?: number;
  /**
   * The amount of red in the color as a value in the interval [0, 1].
   */
  red?: number;
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
export interface GoogleTypeDate {
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
 * Represents civil time (or occasionally physical time). This type can
 * represent a civil time in one of a few possible ways: * When utc_offset is
 * set and time_zone is unset: a civil time on a calendar day with a particular
 * offset from UTC. * When time_zone is set and utc_offset is unset: a civil
 * time on a calendar day in a particular time zone. * When neither time_zone
 * nor utc_offset is set: a civil time on a calendar day in local time. The date
 * is relative to the Proleptic Gregorian Calendar. If year, month, or day are
 * 0, the DateTime is considered not to have a specific year, month, or day
 * respectively. This type may also be used to represent a physical time if all
 * the date and time fields are set and either case of the `time_offset` oneof
 * is set. Consider using `Timestamp` message for physical time instead. If your
 * use case also would like to store the user's timezone, that can be done in
 * another field. This type is more flexible than some applications may want.
 * Make sure to document and validate your application's limitations.
 */
export interface GoogleTypeDateTime {
  /**
   * Optional. Day of month. Must be from 1 to 31 and valid for the year and
   * month, or 0 if specifying a datetime without a day.
   */
  day?: number;
  /**
   * Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults
   * to 0 (midnight). An API may choose to allow the value "24:00:00" for
   * scenarios like business closing time.
   */
  hours?: number;
  /**
   * Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0.
   */
  minutes?: number;
  /**
   * Optional. Month of year. Must be from 1 to 12, or 0 if specifying a
   * datetime without a month.
   */
  month?: number;
  /**
   * Optional. Fractions of seconds in nanoseconds. Must be from 0 to
   * 999,999,999, defaults to 0.
   */
  nanos?: number;
  /**
   * Optional. Seconds of minutes of the time. Must normally be from 0 to 59,
   * defaults to 0. An API may allow the value 60 if it allows leap-seconds.
   */
  seconds?: number;
  /**
   * Time zone.
   */
  timeZone?: GoogleTypeTimeZone;
  /**
   * UTC offset. Must be whole seconds, between -18 hours and +18 hours. For
   * example, a UTC offset of -4:00 would be represented as { seconds: -14400 }.
   */
  utcOffset?: number /* Duration */;
  /**
   * Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a
   * datetime without a year.
   */
  year?: number;
}

function serializeGoogleTypeDateTime(data: any): GoogleTypeDateTime {
  return {
    ...data,
    utcOffset: data["utcOffset"] !== undefined ? data["utcOffset"] : undefined,
  };
}

function deserializeGoogleTypeDateTime(data: any): GoogleTypeDateTime {
  return {
    ...data,
    utcOffset: data["utcOffset"] !== undefined ? data["utcOffset"] : undefined,
  };
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
 * Represents a postal address, e.g. for postal delivery or payments addresses.
 * Given a postal address, a postal service can deliver items to a premise, P.O.
 * Box or similar. It is not intended to model geographical locations (roads,
 * towns, mountains). In typical usage an address would be created via user
 * input or from importing existing data, depending on the type of process.
 * Advice on address input / editing: - Use an internationalization-ready
 * address widget such as https://github.com/google/libaddressinput) - Users
 * should not be presented with UI elements for input or editing of fields
 * outside countries where that field is used. For more guidance on how to use
 * this schema, please see: https://support.google.com/business/answer/6397478
 */
export interface GoogleTypePostalAddress {
  /**
   * Unstructured address lines describing the lower levels of an address.
   * Because values in address_lines do not have type information and may
   * sometimes contain multiple values in a single field (e.g. "Austin, TX"), it
   * is important that the line order is clear. The order of address lines
   * should be "envelope order" for the country/region of the address. In places
   * where this can vary (e.g. Japan), address_language is used to make it
   * explicit (e.g. "ja" for large-to-small ordering and "ja-Latn" or "en" for
   * small-to-large). This way, the most specific line of an address can be
   * selected based on the language. The minimum permitted structural
   * representation of an address consists of a region_code with all remaining
   * information placed in the address_lines. It would be possible to format
   * such an address very approximately without geocoding, but no semantic
   * reasoning could be made about any of the address components until it was at
   * least partially resolved. Creating an address only containing a region_code
   * and address_lines, and then geocoding is the recommended way to handle
   * completely unstructured addresses (as opposed to guessing which parts of
   * the address should be localities or administrative areas).
   */
  addressLines?: string[];
  /**
   * Optional. Highest administrative subdivision which is used for postal
   * addresses of a country or region. For example, this can be a state, a
   * province, an oblast, or a prefecture. Specifically, for Spain this is the
   * province and not the autonomous community (e.g. "Barcelona" and not
   * "Catalonia"). Many countries don't use an administrative area in postal
   * addresses. E.g. in Switzerland this should be left unpopulated.
   */
  administrativeArea?: string;
  /**
   * Optional. BCP-47 language code of the contents of this address (if known).
   * This is often the UI language of the input form or is expected to match one
   * of the languages used in the address' country/region, or their
   * transliterated equivalents. This can affect formatting in certain
   * countries, but is not critical to the correctness of the data and will
   * never affect any validation or other non-formatting related operations. If
   * this value is not known, it should be omitted (rather than specifying a
   * possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".
   */
  languageCode?: string;
  /**
   * Optional. Generally refers to the city/town portion of the address.
   * Examples: US city, IT comune, UK post town. In regions of the world where
   * localities are not well defined or do not fit into this structure well,
   * leave locality empty and use address_lines.
   */
  locality?: string;
  /**
   * Optional. The name of the organization at the address.
   */
  organization?: string;
  /**
   * Optional. Postal code of the address. Not all countries use or require
   * postal codes to be present, but where they are used, they may trigger
   * additional validation with other parts of the address (e.g. state/zip
   * validation in the U.S.A.).
   */
  postalCode?: string;
  /**
   * Optional. The recipient at the address. This field may, under certain
   * circumstances, contain multiline information. For example, it might contain
   * "care of" information.
   */
  recipients?: string[];
  /**
   * Required. CLDR region code of the country/region of the address. This is
   * never inferred and it is up to the user to ensure the value is correct. See
   * https://cldr.unicode.org/ and
   * https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html
   * for details. Example: "CH" for Switzerland.
   */
  regionCode?: string;
  /**
   * The schema revision of the `PostalAddress`. This must be set to 0, which
   * is the latest revision. All new revisions **must** be backward compatible
   * with old revisions.
   */
  revision?: number;
  /**
   * Optional. Additional, country-specific, sorting code. This is not used in
   * most regions. Where it is used, the value is either a string like "CEDEX",
   * optionally followed by a number (e.g. "CEDEX 7"), or just a number alone,
   * representing the "sector code" (Jamaica), "delivery area indicator"
   * (Malawi) or "post office indicator" (e.g. Côte d'Ivoire).
   */
  sortingCode?: string;
  /**
   * Optional. Sublocality of the address. For example, this can be
   * neighborhoods, boroughs, districts.
   */
  sublocality?: string;
}

/**
 * Represents a time zone from the [IANA Time Zone
 * Database](https://www.iana.org/time-zones).
 */
export interface GoogleTypeTimeZone {
  /**
   * IANA Time Zone Database time zone, e.g. "America/New_York".
   */
  id?: string;
  /**
   * Optional. IANA Time Zone Database version number, e.g. "2019a".
   */
  version?: string;
}

/**
 * Additional options for DocumentAI#projectsLocationsList.
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
 * Additional options for DocumentAI#projectsLocationsOperationsList.
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
 * Additional options for DocumentAI#projectsLocationsProcessorsList.
 */
export interface ProjectsLocationsProcessorsListOptions {
  /**
   * The maximum number of processors to return. If unspecified, at most 50
   * processors will be returned. The maximum value is 100; values above 100
   * will be coerced to 100.
   */
  pageSize?: number;
  /**
   * We will return the processors sorted by creation time. The page token will
   * point to the next processor.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DocumentAI#projectsLocationsProcessorsProcessorVersionsEvaluationsList.
 */
export interface ProjectsLocationsProcessorsProcessorVersionsEvaluationsListOptions {
  /**
   * The standard list page size. If unspecified, at most 5 evaluations will be
   * returned. The maximum value is 100; values above 100 will be coerced to
   * 100.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListEvaluations` call. Provide
   * this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for
 * DocumentAI#projectsLocationsProcessorsProcessorVersionsList.
 */
export interface ProjectsLocationsProcessorsProcessorVersionsListOptions {
  /**
   * The maximum number of processor versions to return. If unspecified, at
   * most 10 processor versions will be returned. The maximum value is 20;
   * values above 20 will be coerced to 20.
   */
  pageSize?: number;
  /**
   * We will return the processor versions sorted by creation time. The page
   * token will point to the next processor version.
   */
  pageToken?: string;
}

/**
 * Additional options for DocumentAI#projectsLocationsProcessorTypesList.
 */
export interface ProjectsLocationsProcessorTypesListOptions {
  /**
   * The maximum number of processor types to return. If unspecified, at most
   * 100 processor types will be returned. The maximum value is 500; values
   * above 500 will be coerced to 500.
   */
  pageSize?: number;
  /**
   * Used to retrieve the next page of results, empty if at the end of the
   * list.
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
