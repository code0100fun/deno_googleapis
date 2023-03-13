// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Speech-to-Text API Client for Deno
 * ========================================
 * 
 * Converts audio to text by applying powerful neural network models.
 * 
 * Docs: https://cloud.google.com/speech-to-text/docs/quickstart-protocol
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Converts audio to text by applying powerful neural network models.
 */
export class speech {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://speech.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async operationsGet(name: string): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/operations/${ name }`);
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
   */
  async operationsList(opts: OperationsListOptions = {}): Promise<ListOperationsResponse> {
    const url = new URL(`${this.#baseUrl}v1/operations`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
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
   * Create a custom class.
   *
   * @param parent Required. The parent resource where this custom class will be created. Format: `projects/{project}/locations/{location}/customClasses` Speech-to-Text supports three locations: `global`, `us` (US North America), and `eu` (Europe). If you are calling the `speech.googleapis.com` endpoint, use the `global` location. To specify a region, use a [regional endpoint](https://cloud.google.com/speech-to-text/docs/endpoints) with matching `us` or `eu` location value.
   */
  async projectsLocationsCustomClassesCreate(parent: string, req: CreateCustomClassRequest): Promise<CustomClass> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/customClasses`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as CustomClass;
  }

  /**
   * Delete a custom class.
   *
   * @param name Required. The name of the custom class to delete. Format: `projects/{project}/locations/{location}/customClasses/{custom_class}` Speech-to-Text supports three locations: `global`, `us` (US North America), and `eu` (Europe). If you are calling the `speech.googleapis.com` endpoint, use the `global` location. To specify a region, use a [regional endpoint](https://cloud.google.com/speech-to-text/docs/endpoints) with matching `us` or `eu` location value.
   */
  async projectsLocationsCustomClassesDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Get a custom class.
   *
   * @param name Required. The name of the custom class to retrieve. Format: `projects/{project}/locations/{location}/customClasses/{custom_class}`
   */
  async projectsLocationsCustomClassesGet(name: string): Promise<CustomClass> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as CustomClass;
  }

  /**
   * List custom classes.
   *
   * @param parent Required. The parent, which owns this collection of custom classes. Format: `projects/{project}/locations/{location}/customClasses` Speech-to-Text supports three locations: `global`, `us` (US North America), and `eu` (Europe). If you are calling the `speech.googleapis.com` endpoint, use the `global` location. To specify a region, use a [regional endpoint](https://cloud.google.com/speech-to-text/docs/endpoints) with matching `us` or `eu` location value.
   */
  async projectsLocationsCustomClassesList(parent: string, opts: ProjectsLocationsCustomClassesListOptions = {}): Promise<ListCustomClassesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/customClasses`);
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
    return data as ListCustomClassesResponse;
  }

  /**
   * Update a custom class.
   *
   * @param name The resource name of the custom class.
   */
  async projectsLocationsCustomClassesPatch(name: string, req: CustomClass, opts: ProjectsLocationsCustomClassesPatchOptions = {}): Promise<CustomClass> {
    opts = serializeProjectsLocationsCustomClassesPatchOptions(opts);
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
    return data as CustomClass;
  }

  /**
   * Create a set of phrase hints. Each item in the set can be a single word or
   * a multi-word phrase. The items in the PhraseSet are favored by the
   * recognition model when you send a call that includes the PhraseSet.
   *
   * @param parent Required. The parent resource where this phrase set will be created. Format: `projects/{project}/locations/{location}/phraseSets` Speech-to-Text supports three locations: `global`, `us` (US North America), and `eu` (Europe). If you are calling the `speech.googleapis.com` endpoint, use the `global` location. To specify a region, use a [regional endpoint](https://cloud.google.com/speech-to-text/docs/endpoints) with matching `us` or `eu` location value.
   */
  async projectsLocationsPhraseSetsCreate(parent: string, req: CreatePhraseSetRequest): Promise<PhraseSet> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/phraseSets`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as PhraseSet;
  }

  /**
   * Delete a phrase set.
   *
   * @param name Required. The name of the phrase set to delete. Format: `projects/{project}/locations/{location}/phraseSets/{phrase_set}`
   */
  async projectsLocationsPhraseSetsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Get a phrase set.
   *
   * @param name Required. The name of the phrase set to retrieve. Format: `projects/{project}/locations/{location}/phraseSets/{phrase_set}` Speech-to-Text supports three locations: `global`, `us` (US North America), and `eu` (Europe). If you are calling the `speech.googleapis.com` endpoint, use the `global` location. To specify a region, use a [regional endpoint](https://cloud.google.com/speech-to-text/docs/endpoints) with matching `us` or `eu` location value.
   */
  async projectsLocationsPhraseSetsGet(name: string): Promise<PhraseSet> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as PhraseSet;
  }

  /**
   * List phrase sets.
   *
   * @param parent Required. The parent, which owns this collection of phrase set. Format: `projects/{project}/locations/{location}` Speech-to-Text supports three locations: `global`, `us` (US North America), and `eu` (Europe). If you are calling the `speech.googleapis.com` endpoint, use the `global` location. To specify a region, use a [regional endpoint](https://cloud.google.com/speech-to-text/docs/endpoints) with matching `us` or `eu` location value.
   */
  async projectsLocationsPhraseSetsList(parent: string, opts: ProjectsLocationsPhraseSetsListOptions = {}): Promise<ListPhraseSetResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/phraseSets`);
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
    return data as ListPhraseSetResponse;
  }

  /**
   * Update a phrase set.
   *
   * @param name The resource name of the phrase set.
   */
  async projectsLocationsPhraseSetsPatch(name: string, req: PhraseSet, opts: ProjectsLocationsPhraseSetsPatchOptions = {}): Promise<PhraseSet> {
    opts = serializeProjectsLocationsPhraseSetsPatchOptions(opts);
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
    return data as PhraseSet;
  }

  /**
   * Performs asynchronous speech recognition: receive results via the
   * google.longrunning.Operations interface. Returns either an
   * `Operation.error` or an `Operation.response` which contains a
   * `LongRunningRecognizeResponse` message. For more information on
   * asynchronous speech recognition, see the
   * [how-to](https://cloud.google.com/speech-to-text/docs/async-recognize).
   *
   */
  async speechLongrunningrecognize(req: LongRunningRecognizeRequest): Promise<Operation> {
    req = serializeLongRunningRecognizeRequest(req);
    const url = new URL(`${this.#baseUrl}v1/speech:longrunningrecognize`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Performs synchronous speech recognition: receive results after all audio
   * has been sent and processed.
   *
   */
  async speechRecognize(req: RecognizeRequest): Promise<RecognizeResponse> {
    req = serializeRecognizeRequest(req);
    const url = new URL(`${this.#baseUrl}v1/speech:recognize`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeRecognizeResponse(data);
  }
}

export interface ABNFGrammar {
  /**
   * All declarations and rules of an ABNF grammar broken up into multiple
   * strings that will end up concatenated.
   */
  abnfStrings?: string[];
}

/**
 * An item of the class.
 */
export interface ClassItem {
  /**
   * The class item's value.
   */
  value?: string;
}

/**
 * Message sent by the client for the `CreateCustomClass` method.
 */
export interface CreateCustomClassRequest {
  /**
   * Required. The custom class to create.
   */
  customClass?: CustomClass;
  /**
   * Required. The ID to use for the custom class, which will become the final
   * component of the custom class' resource name. This value should restrict to
   * letters, numbers, and hyphens, with the first character a letter, the last
   * a letter or a number, and be 4-63 characters.
   */
  customClassId?: string;
}

/**
 * Message sent by the client for the `CreatePhraseSet` method.
 */
export interface CreatePhraseSetRequest {
  /**
   * Required. The phrase set to create.
   */
  phraseSet?: PhraseSet;
  /**
   * Required. The ID to use for the phrase set, which will become the final
   * component of the phrase set's resource name. This value should restrict to
   * letters, numbers, and hyphens, with the first character a letter, the last
   * a letter or a number, and be 4-63 characters.
   */
  phraseSetId?: string;
}

/**
 * A set of words or phrases that represents a common concept likely to appear
 * in your audio, for example a list of passenger ship names. CustomClass items
 * can be substituted into placeholders that you set in PhraseSet phrases.
 */
export interface CustomClass {
  /**
   * If this custom class is a resource, the custom_class_id is the resource id
   * of the CustomClass. Case sensitive.
   */
  customClassId?: string;
  /**
   * A collection of class items.
   */
  items?: ClassItem[];
  /**
   * The resource name of the custom class.
   */
  name?: string;
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
 * Message returned to the client by the `ListCustomClasses` method.
 */
export interface ListCustomClassesResponse {
  /**
   * The custom classes.
   */
  customClasses?: CustomClass[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
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
 * Message returned to the client by the `ListPhraseSet` method.
 */
export interface ListPhraseSetResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The phrase set.
   */
  phraseSets?: PhraseSet[];
}

/**
 * Describes the progress of a long-running `LongRunningRecognize` call. It is
 * included in the `metadata` field of the `Operation` returned by the
 * `GetOperation` call of the `google::longrunning::Operations` service.
 */
export interface LongRunningRecognizeMetadata {
  /**
   * Time of the most recent processing update.
   */
  lastUpdateTime?: Date;
  /**
   * Approximate percentage of audio processed thus far. Guaranteed to be 100
   * when the audio is fully processed and the results are available.
   */
  progressPercent?: number;
  /**
   * Time when the request was received.
   */
  startTime?: Date;
  /**
   * Output only. The URI of the audio file being transcribed. Empty if the
   * audio was sent as byte content.
   */
  readonly uri?: string;
}

function serializeLongRunningRecognizeMetadata(data: any): LongRunningRecognizeMetadata {
  return {
    ...data,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? data["lastUpdateTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeLongRunningRecognizeMetadata(data: any): LongRunningRecognizeMetadata {
  return {
    ...data,
    lastUpdateTime: data["lastUpdateTime"] !== undefined ? new Date(data["lastUpdateTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The top-level message sent by the client for the `LongRunningRecognize`
 * method.
 */
export interface LongRunningRecognizeRequest {
  /**
   * Required. The audio data to be recognized.
   */
  audio?: RecognitionAudio;
  /**
   * Required. Provides information to the recognizer that specifies how to
   * process the request.
   */
  config?: RecognitionConfig;
  /**
   * Optional. Specifies an optional destination for the recognition results.
   */
  outputConfig?: TranscriptOutputConfig;
}

function serializeLongRunningRecognizeRequest(data: any): LongRunningRecognizeRequest {
  return {
    ...data,
    audio: data["audio"] !== undefined ? serializeRecognitionAudio(data["audio"]) : undefined,
  };
}

function deserializeLongRunningRecognizeRequest(data: any): LongRunningRecognizeRequest {
  return {
    ...data,
    audio: data["audio"] !== undefined ? deserializeRecognitionAudio(data["audio"]) : undefined,
  };
}

/**
 * The only message returned to the client by the `LongRunningRecognize`
 * method. It contains the result as zero or more sequential
 * `SpeechRecognitionResult` messages. It is included in the `result.response`
 * field of the `Operation` returned by the `GetOperation` call of the
 * `google::longrunning::Operations` service.
 */
export interface LongRunningRecognizeResponse {
  /**
   * Original output config if present in the request.
   */
  outputConfig?: TranscriptOutputConfig;
  /**
   * If the transcript output fails this field contains the relevant error.
   */
  outputError?: Status;
  /**
   * The ID associated with the request. This is a unique ID specific only to
   * the given request.
   */
  requestId?: bigint;
  /**
   * Sequential list of transcription results corresponding to sequential
   * portions of audio.
   */
  results?: SpeechRecognitionResult[];
  /**
   * Provides information on speech adaptation behavior in response
   */
  speechAdaptationInfo?: SpeechAdaptationInfo;
  /**
   * When available, billed audio seconds for the corresponding request.
   */
  totalBilledTime?: number /* Duration */;
}

function serializeLongRunningRecognizeResponse(data: any): LongRunningRecognizeResponse {
  return {
    ...data,
    requestId: data["requestId"] !== undefined ? String(data["requestId"]) : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeSpeechRecognitionResult(item))) : undefined,
    totalBilledTime: data["totalBilledTime"] !== undefined ? data["totalBilledTime"] : undefined,
  };
}

function deserializeLongRunningRecognizeResponse(data: any): LongRunningRecognizeResponse {
  return {
    ...data,
    requestId: data["requestId"] !== undefined ? BigInt(data["requestId"]) : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeSpeechRecognitionResult(item))) : undefined,
    totalBilledTime: data["totalBilledTime"] !== undefined ? data["totalBilledTime"] : undefined,
  };
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
 * Additional options for speech#operationsList.
 */
export interface OperationsListOptions {
  /**
   * The standard list filter.
   */
  filter?: string;
  /**
   * The name of the operation's parent resource.
   */
  name?: string;
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
 * A phrases containing words and phrase "hints" so that the speech recognition
 * is more likely to recognize them. This can be used to improve the accuracy
 * for specific words and phrases, for example, if specific commands are
 * typically spoken by the user. This can also be used to add additional words
 * to the vocabulary of the recognizer. See [usage
 * limits](https://cloud.google.com/speech-to-text/quotas#content). List items
 * can also include pre-built or custom classes containing groups of words that
 * represent common concepts that occur in natural language. For example, rather
 * than providing a phrase hint for every month of the year (e.g. "i was born in
 * january", "i was born in febuary", ...), use the pre-built `$MONTH` class
 * improves the likelihood of correctly transcribing audio that includes months
 * (e.g. "i was born in $month"). To refer to pre-built classes, use the class'
 * symbol prepended with `$` e.g. `$MONTH`. To refer to custom classes that were
 * defined inline in the request, set the class's `custom_class_id` to a string
 * unique to all class resources and inline classes. Then use the class' id
 * wrapped in $`{...}` e.g. "${my-months}". To refer to custom classes
 * resources, use the class' id wrapped in `${}` (e.g. `${my-months}`).
 * Speech-to-Text supports three locations: `global`, `us` (US North America),
 * and `eu` (Europe). If you are calling the `speech.googleapis.com` endpoint,
 * use the `global` location. To specify a region, use a [regional
 * endpoint](https://cloud.google.com/speech-to-text/docs/endpoints) with
 * matching `us` or `eu` location value.
 */
export interface Phrase {
  /**
   * Hint Boost. Overrides the boost set at the phrase set level. Positive
   * value will increase the probability that a specific phrase will be
   * recognized over other similar sounding phrases. The higher the boost, the
   * higher the chance of false positive recognition as well. Negative boost
   * will simply be ignored. Though `boost` can accept a wide range of positive
   * values, most use cases are best served with values between 0 and 20. We
   * recommend using a binary search approach to finding the optimal value for
   * your use case as well as adding phrases both with and without boost to your
   * requests.
   */
  boost?: number;
  /**
   * The phrase itself.
   */
  value?: string;
}

/**
 * Provides "hints" to the speech recognizer to favor specific words and
 * phrases in the results.
 */
export interface PhraseSet {
  /**
   * Hint Boost. Positive value will increase the probability that a specific
   * phrase will be recognized over other similar sounding phrases. The higher
   * the boost, the higher the chance of false positive recognition as well.
   * Negative boost values would correspond to anti-biasing. Anti-biasing is not
   * enabled, so negative boost will simply be ignored. Though `boost` can
   * accept a wide range of positive values, most use cases are best served with
   * values between 0 (exclusive) and 20. We recommend using a binary search
   * approach to finding the optimal value for your use case as well as adding
   * phrases both with and without boost to your requests.
   */
  boost?: number;
  /**
   * The resource name of the phrase set.
   */
  name?: string;
  /**
   * A list of word and phrases.
   */
  phrases?: Phrase[];
}

/**
 * Additional options for speech#projectsLocationsCustomClassesList.
 */
export interface ProjectsLocationsCustomClassesListOptions {
  /**
   * The maximum number of custom classes to return. The service may return
   * fewer than this value. If unspecified, at most 50 custom classes will be
   * returned. The maximum value is 1000; values above 1000 will be coerced to
   * 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListCustomClass` call. Provide
   * this to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListCustomClass` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for speech#projectsLocationsCustomClassesPatch.
 */
export interface ProjectsLocationsCustomClassesPatchOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsCustomClassesPatchOptions(data: any): ProjectsLocationsCustomClassesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsCustomClassesPatchOptions(data: any): ProjectsLocationsCustomClassesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Additional options for speech#projectsLocationsPhraseSetsList.
 */
export interface ProjectsLocationsPhraseSetsListOptions {
  /**
   * The maximum number of phrase sets to return. The service may return fewer
   * than this value. If unspecified, at most 50 phrase sets will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number;
  /**
   * A page token, received from a previous `ListPhraseSet` call. Provide this
   * to retrieve the subsequent page. When paginating, all other parameters
   * provided to `ListPhraseSet` must match the call that provided the page
   * token.
   */
  pageToken?: string;
}

/**
 * Additional options for speech#projectsLocationsPhraseSetsPatch.
 */
export interface ProjectsLocationsPhraseSetsPatchOptions {
  /**
   * The list of fields to be updated.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsLocationsPhraseSetsPatchOptions(data: any): ProjectsLocationsPhraseSetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsLocationsPhraseSetsPatchOptions(data: any): ProjectsLocationsPhraseSetsPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Contains audio data in the encoding specified in the `RecognitionConfig`.
 * Either `content` or `uri` must be supplied. Supplying both or neither returns
 * google.rpc.Code.INVALID_ARGUMENT. See [content
 * limits](https://cloud.google.com/speech-to-text/quotas#content).
 */
export interface RecognitionAudio {
  /**
   * The audio data bytes encoded as specified in `RecognitionConfig`. Note: as
   * with all bytes fields, proto buffers use a pure binary representation,
   * whereas JSON representations use base64.
   */
  content?: Uint8Array;
  /**
   * URI that points to a file that contains audio data bytes as specified in
   * `RecognitionConfig`. The file must not be compressed (for example, gzip).
   * Currently, only Google Cloud Storage URIs are supported, which must be
   * specified in the following format: `gs://bucket_name/object_name` (other
   * URI formats return google.rpc.Code.INVALID_ARGUMENT). For more information,
   * see [Request URIs](https://cloud.google.com/storage/docs/reference-uris).
   */
  uri?: string;
}

function serializeRecognitionAudio(data: any): RecognitionAudio {
  return {
    ...data,
    content: data["content"] !== undefined ? encodeBase64(data["content"]) : undefined,
  };
}

function deserializeRecognitionAudio(data: any): RecognitionAudio {
  return {
    ...data,
    content: data["content"] !== undefined ? decodeBase64(data["content"] as string) : undefined,
  };
}

/**
 * Provides information to the recognizer that specifies how to process the
 * request.
 */
export interface RecognitionConfig {
  /**
   * Speech adaptation configuration improves the accuracy of speech
   * recognition. For more information, see the [speech
   * adaptation](https://cloud.google.com/speech-to-text/docs/adaptation)
   * documentation. When speech adaptation is set it supersedes the
   * `speech_contexts` field.
   */
  adaptation?: SpeechAdaptation;
  /**
   * A list of up to 3 additional
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tags,
   * listing possible alternative languages of the supplied audio. See [Language
   * Support](https://cloud.google.com/speech-to-text/docs/languages) for a list
   * of the currently supported language codes. If alternative languages are
   * listed, recognition result will contain recognition in the most likely
   * language detected including the main language_code. The recognition result
   * will include the language tag of the language detected in the audio. Note:
   * This feature is only supported for Voice Command and Voice Search use cases
   * and performance may vary for other use cases (e.g., phone call
   * transcription).
   */
  alternativeLanguageCodes?: string[];
  /**
   * The number of channels in the input audio data. ONLY set this for
   * MULTI-CHANNEL recognition. Valid values for LINEAR16, OGG_OPUS and FLAC are
   * `1`-`8`. Valid value for MULAW, AMR, AMR_WB and SPEEX_WITH_HEADER_BYTE is
   * only `1`. If `0` or omitted, defaults to one channel (mono). Note: We only
   * recognize the first channel by default. To perform independent recognition
   * on each channel set `enable_separate_recognition_per_channel` to 'true'.
   */
  audioChannelCount?: number;
  /**
   * Config to enable speaker diarization and set additional parameters to make
   * diarization better suited for your application. Note: When this is enabled,
   * we send all the words from the beginning of the audio for the top
   * alternative in every consecutive STREAMING responses. This is done in order
   * to improve our speaker tags as our models learn to identify the speakers in
   * the conversation over time. For non-streaming requests, the diarization
   * results will be provided only in the top alternative of the FINAL
   * SpeechRecognitionResult.
   */
  diarizationConfig?: SpeakerDiarizationConfig;
  /**
   * If 'true', adds punctuation to recognition result hypotheses. This feature
   * is only available in select languages. Setting this for requests in other
   * languages has no effect at all. The default 'false' value does not add
   * punctuation to result hypotheses.
   */
  enableAutomaticPunctuation?: boolean;
  /**
   * This needs to be set to `true` explicitly and `audio_channel_count` > 1 to
   * get each channel recognized separately. The recognition result will contain
   * a `channel_tag` field to state which channel that result belongs to. If
   * this is not true, we will only recognize the first channel. The request is
   * billed cumulatively for all channels recognized: `audio_channel_count`
   * multiplied by the length of the audio.
   */
  enableSeparateRecognitionPerChannel?: boolean;
  /**
   * The spoken emoji behavior for the call If not set, uses default behavior
   * based on model of choice If 'true', adds spoken emoji formatting for the
   * request. This will replace spoken emojis with the corresponding Unicode
   * symbols in the final transcript. If 'false', spoken emojis are not
   * replaced.
   */
  enableSpokenEmojis?: boolean;
  /**
   * The spoken punctuation behavior for the call If not set, uses default
   * behavior based on model of choice e.g. command_and_search will enable
   * spoken punctuation by default If 'true', replaces spoken punctuation with
   * the corresponding symbols in the request. For example, "how are you
   * question mark" becomes "how are you?". See
   * https://cloud.google.com/speech-to-text/docs/spoken-punctuation for
   * support. If 'false', spoken punctuation is not replaced.
   */
  enableSpokenPunctuation?: boolean;
  /**
   * If `true`, the top result includes a list of words and the confidence for
   * those words. If `false`, no word-level confidence information is returned.
   * The default is `false`.
   */
  enableWordConfidence?: boolean;
  /**
   * If `true`, the top result includes a list of words and the start and end
   * time offsets (timestamps) for those words. If `false`, no word-level time
   * offset information is returned. The default is `false`.
   */
  enableWordTimeOffsets?: boolean;
  /**
   * Encoding of audio data sent in all `RecognitionAudio` messages. This field
   * is optional for `FLAC` and `WAV` audio files and required for all other
   * audio formats. For details, see AudioEncoding.
   */
  encoding?:  | "ENCODING_UNSPECIFIED" | "LINEAR16" | "FLAC" | "MULAW" | "AMR" | "AMR_WB" | "OGG_OPUS" | "SPEEX_WITH_HEADER_BYTE" | "WEBM_OPUS";
  /**
   * Required. The language of the supplied audio as a
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag.
   * Example: "en-US". See [Language
   * Support](https://cloud.google.com/speech-to-text/docs/languages) for a list
   * of the currently supported language codes.
   */
  languageCode?: string;
  /**
   * Maximum number of recognition hypotheses to be returned. Specifically, the
   * maximum number of `SpeechRecognitionAlternative` messages within each
   * `SpeechRecognitionResult`. The server may return fewer than
   * `max_alternatives`. Valid values are `0`-`30`. A value of `0` or `1` will
   * return a maximum of one. If omitted, will return a maximum of one.
   */
  maxAlternatives?: number;
  /**
   * Metadata regarding this request.
   */
  metadata?: RecognitionMetadata;
  /**
   * Which model to select for the given request. Select the model best suited
   * to your domain to get best results. If a model is not explicitly specified,
   * then we auto-select a model based on the parameters in the
   * RecognitionConfig. *Model* *Description* latest_long Best for long form
   * content like media or conversation. latest_short Best for short form
   * content like commands or single shot directed speech. command_and_search
   * Best for short queries such as voice commands or voice search. phone_call
   * Best for audio that originated from a phone call (typically recorded at an
   * 8khz sampling rate). video Best for audio that originated from video or
   * includes multiple speakers. Ideally the audio is recorded at a 16khz or
   * greater sampling rate. This is a premium model that costs more than the
   * standard rate. default Best for audio that is not one of the specific audio
   * models. For example, long-form audio. Ideally the audio is high-fidelity,
   * recorded at a 16khz or greater sampling rate. medical_conversation Best for
   * audio that originated from a conversation between a medical provider and
   * patient. medical_dictation Best for audio that originated from dictation
   * notes by a medical provider.
   */
  model?: string;
  /**
   * If set to `true`, the server will attempt to filter out profanities,
   * replacing all but the initial character in each filtered word with
   * asterisks, e.g. "f***". If set to `false` or omitted, profanities won't be
   * filtered out.
   */
  profanityFilter?: boolean;
  /**
   * Sample rate in Hertz of the audio data sent in all `RecognitionAudio`
   * messages. Valid values are: 8000-48000. 16000 is optimal. For best results,
   * set the sampling rate of the audio source to 16000 Hz. If that's not
   * possible, use the native sample rate of the audio source (instead of
   * re-sampling). This field is optional for FLAC and WAV audio files, but is
   * required for all other audio formats. For details, see AudioEncoding.
   */
  sampleRateHertz?: number;
  /**
   * Array of SpeechContext. A means to provide context to assist the speech
   * recognition. For more information, see [speech
   * adaptation](https://cloud.google.com/speech-to-text/docs/adaptation).
   */
  speechContexts?: SpeechContext[];
  /**
   * Set to true to use an enhanced model for speech recognition. If
   * `use_enhanced` is set to true and the `model` field is not set, then an
   * appropriate enhanced model is chosen if an enhanced model exists for the
   * audio. If `use_enhanced` is true and an enhanced version of the specified
   * model does not exist, then the speech is recognized using the standard
   * version of the specified model.
   */
  useEnhanced?: boolean;
}

/**
 * Description of audio data to be recognized.
 */
export interface RecognitionMetadata {
  /**
   * Description of the content. Eg. "Recordings of federal supreme court
   * hearings from 2012".
   */
  audioTopic?: string;
  /**
   * The industry vertical to which this speech recognition request most
   * closely applies. This is most indicative of the topics contained in the
   * audio. Use the 6-digit NAICS code to identify the industry vertical - see
   * https://www.naics.com/search/.
   */
  industryNaicsCodeOfAudio?: number;
  /**
   * The use case most closely describing the audio content to be recognized.
   */
  interactionType?:  | "INTERACTION_TYPE_UNSPECIFIED" | "DISCUSSION" | "PRESENTATION" | "PHONE_CALL" | "VOICEMAIL" | "PROFESSIONALLY_PRODUCED" | "VOICE_SEARCH" | "VOICE_COMMAND" | "DICTATION";
  /**
   * The audio type that most closely describes the audio being recognized.
   */
  microphoneDistance?:  | "MICROPHONE_DISTANCE_UNSPECIFIED" | "NEARFIELD" | "MIDFIELD" | "FARFIELD";
  /**
   * The original media the speech was recorded on.
   */
  originalMediaType?:  | "ORIGINAL_MEDIA_TYPE_UNSPECIFIED" | "AUDIO" | "VIDEO";
  /**
   * Mime type of the original audio file. For example `audio/m4a`,
   * `audio/x-alaw-basic`, `audio/mp3`, `audio/3gpp`. A list of possible audio
   * mime types is maintained at
   * http://www.iana.org/assignments/media-types/media-types.xhtml#audio
   */
  originalMimeType?: string;
  /**
   * The device used to make the recording. Examples 'Nexus 5X' or 'Polycom
   * SoundStation IP 6000' or 'POTS' or 'VoIP' or 'Cardioid Microphone'.
   */
  recordingDeviceName?: string;
  /**
   * The type of device the speech was recorded with.
   */
  recordingDeviceType?:  | "RECORDING_DEVICE_TYPE_UNSPECIFIED" | "SMARTPHONE" | "PC" | "PHONE_LINE" | "VEHICLE" | "OTHER_OUTDOOR_DEVICE" | "OTHER_INDOOR_DEVICE";
}

/**
 * The top-level message sent by the client for the `Recognize` method.
 */
export interface RecognizeRequest {
  /**
   * Required. The audio data to be recognized.
   */
  audio?: RecognitionAudio;
  /**
   * Required. Provides information to the recognizer that specifies how to
   * process the request.
   */
  config?: RecognitionConfig;
}

function serializeRecognizeRequest(data: any): RecognizeRequest {
  return {
    ...data,
    audio: data["audio"] !== undefined ? serializeRecognitionAudio(data["audio"]) : undefined,
  };
}

function deserializeRecognizeRequest(data: any): RecognizeRequest {
  return {
    ...data,
    audio: data["audio"] !== undefined ? deserializeRecognitionAudio(data["audio"]) : undefined,
  };
}

/**
 * The only message returned to the client by the `Recognize` method. It
 * contains the result as zero or more sequential `SpeechRecognitionResult`
 * messages.
 */
export interface RecognizeResponse {
  /**
   * The ID associated with the request. This is a unique ID specific only to
   * the given request.
   */
  requestId?: bigint;
  /**
   * Sequential list of transcription results corresponding to sequential
   * portions of audio.
   */
  results?: SpeechRecognitionResult[];
  /**
   * Provides information on adaptation behavior in response
   */
  speechAdaptationInfo?: SpeechAdaptationInfo;
  /**
   * When available, billed audio seconds for the corresponding request.
   */
  totalBilledTime?: number /* Duration */;
}

function serializeRecognizeResponse(data: any): RecognizeResponse {
  return {
    ...data,
    requestId: data["requestId"] !== undefined ? String(data["requestId"]) : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializeSpeechRecognitionResult(item))) : undefined,
    totalBilledTime: data["totalBilledTime"] !== undefined ? data["totalBilledTime"] : undefined,
  };
}

function deserializeRecognizeResponse(data: any): RecognizeResponse {
  return {
    ...data,
    requestId: data["requestId"] !== undefined ? BigInt(data["requestId"]) : undefined,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializeSpeechRecognitionResult(item))) : undefined,
    totalBilledTime: data["totalBilledTime"] !== undefined ? data["totalBilledTime"] : undefined,
  };
}

/**
 * Config to enable speaker diarization.
 */
export interface SpeakerDiarizationConfig {
  /**
   * If 'true', enables speaker detection for each recognized word in the top
   * alternative of the recognition result using a speaker_label provided in the
   * WordInfo.
   */
  enableSpeakerDiarization?: boolean;
  /**
   * Maximum number of speakers in the conversation. This range gives you more
   * flexibility by allowing the system to automatically determine the correct
   * number of speakers. If not set, the default value is 6.
   */
  maxSpeakerCount?: number;
  /**
   * Minimum number of speakers in the conversation. This range gives you more
   * flexibility by allowing the system to automatically determine the correct
   * number of speakers. If not set, the default value is 2.
   */
  minSpeakerCount?: number;
  /**
   * Output only. Unused.
   */
  readonly speakerTag?: number;
}

/**
 * Speech adaptation configuration.
 */
export interface SpeechAdaptation {
  /**
   * Augmented Backus-Naur form (ABNF) is a standardized grammar notation
   * comprised by a set of derivation rules. See specifications:
   * https://www.w3.org/TR/speech-grammar
   */
  abnfGrammar?: ABNFGrammar;
  /**
   * A collection of custom classes. To specify the classes inline, leave the
   * class' `name` blank and fill in the rest of its fields, giving it a unique
   * `custom_class_id`. Refer to the inline defined class in phrase hints by its
   * `custom_class_id`.
   */
  customClasses?: CustomClass[];
  /**
   * A collection of phrase set resource names to use.
   */
  phraseSetReferences?: string[];
  /**
   * A collection of phrase sets. To specify the hints inline, leave the phrase
   * set's `name` blank and fill in the rest of its fields. Any phrase set can
   * use any custom class.
   */
  phraseSets?: PhraseSet[];
}

/**
 * Information on speech adaptation use in results
 */
export interface SpeechAdaptationInfo {
  /**
   * Whether there was a timeout when applying speech adaptation. If true,
   * adaptation had no effect in the response transcript.
   */
  adaptationTimeout?: boolean;
  /**
   * If set, returns a message specifying which part of the speech adaptation
   * request timed out.
   */
  timeoutMessage?: string;
}

/**
 * Provides "hints" to the speech recognizer to favor specific words and
 * phrases in the results.
 */
export interface SpeechContext {
  /**
   * Hint Boost. Positive value will increase the probability that a specific
   * phrase will be recognized over other similar sounding phrases. The higher
   * the boost, the higher the chance of false positive recognition as well.
   * Negative boost values would correspond to anti-biasing. Anti-biasing is not
   * enabled, so negative boost will simply be ignored. Though `boost` can
   * accept a wide range of positive values, most use cases are best served with
   * values between 0 and 20. We recommend using a binary search approach to
   * finding the optimal value for your use case.
   */
  boost?: number;
  /**
   * A list of strings containing words and phrases "hints" so that the speech
   * recognition is more likely to recognize them. This can be used to improve
   * the accuracy for specific words and phrases, for example, if specific
   * commands are typically spoken by the user. This can also be used to add
   * additional words to the vocabulary of the recognizer. See [usage
   * limits](https://cloud.google.com/speech-to-text/quotas#content). List items
   * can also be set to classes for groups of words that represent common
   * concepts that occur in natural language. For example, rather than providing
   * phrase hints for every month of the year, using the $MONTH class improves
   * the likelihood of correctly transcribing audio that includes months.
   */
  phrases?: string[];
}

/**
 * Alternative hypotheses (a.k.a. n-best list).
 */
export interface SpeechRecognitionAlternative {
  /**
   * The confidence estimate between 0.0 and 1.0. A higher number indicates an
   * estimated greater likelihood that the recognized words are correct. This
   * field is set only for the top alternative of a non-streaming result or, of
   * a streaming result where `is_final=true`. This field is not guaranteed to
   * be accurate and users should not rely on it to be always provided. The
   * default of 0.0 is a sentinel value indicating `confidence` was not set.
   */
  confidence?: number;
  /**
   * Transcript text representing the words that the user spoke. In languages
   * that use spaces to separate words, the transcript might have a leading
   * space if it isn't the first result. You can concatenate each result to
   * obtain the full transcript without using a separator.
   */
  transcript?: string;
  /**
   * A list of word-specific information for each recognized word. Note: When
   * `enable_speaker_diarization` is true, you will see all the words from the
   * beginning of the audio.
   */
  words?: WordInfo[];
}

function serializeSpeechRecognitionAlternative(data: any): SpeechRecognitionAlternative {
  return {
    ...data,
    words: data["words"] !== undefined ? data["words"].map((item: any) => (serializeWordInfo(item))) : undefined,
  };
}

function deserializeSpeechRecognitionAlternative(data: any): SpeechRecognitionAlternative {
  return {
    ...data,
    words: data["words"] !== undefined ? data["words"].map((item: any) => (deserializeWordInfo(item))) : undefined,
  };
}

/**
 * A speech recognition result corresponding to a portion of the audio.
 */
export interface SpeechRecognitionResult {
  /**
   * May contain one or more recognition hypotheses (up to the maximum
   * specified in `max_alternatives`). These alternatives are ordered in terms
   * of accuracy, with the top (first) alternative being the most probable, as
   * ranked by the recognizer.
   */
  alternatives?: SpeechRecognitionAlternative[];
  /**
   * For multi-channel audio, this is the channel number corresponding to the
   * recognized result for the audio from that channel. For audio_channel_count
   * = N, its output values can range from '1' to 'N'.
   */
  channelTag?: number;
  /**
   * Output only. The [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt)
   * language tag of the language in this result. This language code was
   * detected to have the most likelihood of being spoken in the audio.
   */
  readonly languageCode?: string;
  /**
   * Time offset of the end of this result relative to the beginning of the
   * audio.
   */
  resultEndTime?: number /* Duration */;
}

function serializeSpeechRecognitionResult(data: any): SpeechRecognitionResult {
  return {
    ...data,
    alternatives: data["alternatives"] !== undefined ? data["alternatives"].map((item: any) => (serializeSpeechRecognitionAlternative(item))) : undefined,
    resultEndTime: data["resultEndTime"] !== undefined ? data["resultEndTime"] : undefined,
  };
}

function deserializeSpeechRecognitionResult(data: any): SpeechRecognitionResult {
  return {
    ...data,
    alternatives: data["alternatives"] !== undefined ? data["alternatives"].map((item: any) => (deserializeSpeechRecognitionAlternative(item))) : undefined,
    resultEndTime: data["resultEndTime"] !== undefined ? data["resultEndTime"] : undefined,
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
 * Specifies an optional destination for the recognition results.
 */
export interface TranscriptOutputConfig {
  /**
   * Specifies a Cloud Storage URI for the recognition results. Must be
   * specified in the format: `gs://bucket_name/object_name`, and the bucket
   * must already exist.
   */
  gcsUri?: string;
}

/**
 * Word-specific information for recognized words.
 */
export interface WordInfo {
  /**
   * The confidence estimate between 0.0 and 1.0. A higher number indicates an
   * estimated greater likelihood that the recognized words are correct. This
   * field is set only for the top alternative of a non-streaming result or, of
   * a streaming result where `is_final=true`. This field is not guaranteed to
   * be accurate and users should not rely on it to be always provided. The
   * default of 0.0 is a sentinel value indicating `confidence` was not set.
   */
  confidence?: number;
  /**
   * Time offset relative to the beginning of the audio, and corresponding to
   * the end of the spoken word. This field is only set if
   * `enable_word_time_offsets=true` and only in the top hypothesis. This is an
   * experimental feature and the accuracy of the time offset can vary.
   */
  endTime?: number /* Duration */;
  /**
   * Output only. A label value assigned for every unique speaker within the
   * audio. This field specifies which speaker was detected to have spoken this
   * word. For some models, like medical_conversation this can be actual speaker
   * role, for example "patient" or "provider", but generally this would be a
   * number identifying a speaker. This field is only set if
   * enable_speaker_diarization = 'true' and only for the top alternative.
   */
  readonly speakerLabel?: string;
  /**
   * Output only. A distinct integer value is assigned for every speaker within
   * the audio. This field specifies which one of those speakers was detected to
   * have spoken this word. Value ranges from '1' to diarization_speaker_count.
   * speaker_tag is set if enable_speaker_diarization = 'true' and only for the
   * top alternative. Note: Use speaker_label instead.
   */
  readonly speakerTag?: number;
  /**
   * Time offset relative to the beginning of the audio, and corresponding to
   * the start of the spoken word. This field is only set if
   * `enable_word_time_offsets=true` and only in the top hypothesis. This is an
   * experimental feature and the accuracy of the time offset can vary.
   */
  startTime?: number /* Duration */;
  /**
   * The word corresponding to this set of information.
   */
  word?: string;
}

function serializeWordInfo(data: any): WordInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"] : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
  };
}

function deserializeWordInfo(data: any): WordInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"] : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
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
