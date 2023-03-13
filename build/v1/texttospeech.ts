// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Text-to-Speech API Client for Deno
 * ========================================
 * 
 * Synthesizes natural-sounding speech by applying powerful neural network models.
 * 
 * Docs: https://cloud.google.com/text-to-speech/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Synthesizes natural-sounding speech by applying powerful neural network
 * models.
 */
export class texttospeech {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://texttospeech.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
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
  async operationsCancel(name: string, req: CancelOperationRequest): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
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
  async operationsDelete(name: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
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
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name The name of the operation's parent resource.
   */
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<ListOperationsResponse> {
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
    return data as ListOperationsResponse;
  }

  /**
   * Synthesizes long form text asynchronously.
   *
   * @param parent The resource states of the request in the form of `projects/*\/locations/*\/voices/*`.
   */
  async projectsLocationsSynthesizeLongAudio(parent: string, req: SynthesizeLongAudioRequest): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }:synthesizeLongAudio`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Synthesizes speech synchronously: receive results after all text input has
   * been processed.
   *
   */
  async textSynthesize(req: SynthesizeSpeechRequest): Promise<SynthesizeSpeechResponse> {
    const url = new URL(`${this.#baseUrl}v1/text:synthesize`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeSynthesizeSpeechResponse(data);
  }

  /**
   * Returns a list of Voice supported for synthesis.
   *
   */
  async voicesList(opts: VoicesListOptions = {}): Promise<ListVoicesResponse> {
    const url = new URL(`${this.#baseUrl}v1/voices`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as ListVoicesResponse;
  }
}

/**
 * Description of audio data to be synthesized.
 */
export interface AudioConfig {
  /**
   * Required. The format of the audio byte stream.
   */
  audioEncoding?:  | "AUDIO_ENCODING_UNSPECIFIED" | "LINEAR16" | "MP3" | "OGG_OPUS" | "MULAW" | "ALAW";
  /**
   * Optional. Input only. An identifier which selects 'audio effects' profiles
   * that are applied on (post synthesized) text to speech. Effects are applied
   * on top of each other in the order they are given. See [audio
   * profiles](https://cloud.google.com/text-to-speech/docs/audio-profiles) for
   * current supported profile ids.
   */
  effectsProfileId?: string[];
  /**
   * Optional. Input only. Speaking pitch, in the range [-20.0, 20.0]. 20 means
   * increase 20 semitones from the original pitch. -20 means decrease 20
   * semitones from the original pitch.
   */
  pitch?: number;
  /**
   * Optional. The synthesis sample rate (in hertz) for this audio. When this
   * is specified in SynthesizeSpeechRequest, if this is different from the
   * voice's natural sample rate, then the synthesizer will honor this request
   * by converting to the desired sample rate (which might result in worse audio
   * quality), unless the specified sample rate is not supported for the
   * encoding chosen, in which case it will fail the request and return
   * google.rpc.Code.INVALID_ARGUMENT.
   */
  sampleRateHertz?: number;
  /**
   * Optional. Input only. Speaking rate/speed, in the range [0.25, 4.0]. 1.0
   * is the normal native speed supported by the specific voice. 2.0 is twice as
   * fast, and 0.5 is half as fast. If unset(0.0), defaults to the native 1.0
   * speed. Any other values < 0.25 or > 4.0 will return an error.
   */
  speakingRate?: number;
  /**
   * Optional. Input only. Volume gain (in dB) of the normal native volume
   * supported by the specific voice, in the range [-96.0, 16.0]. If unset, or
   * set to a value of 0.0 (dB), will play at normal native signal amplitude. A
   * value of -6.0 (dB) will play at approximately half the amplitude of the
   * normal native signal amplitude. A value of +6.0 (dB) will play at
   * approximately twice the amplitude of the normal native signal amplitude.
   * Strongly recommend not to exceed +10 (dB) as there's usually no effective
   * increase in loudness for any value greater than that.
   */
  volumeGainDb?: number;
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface CancelOperationRequest {
}

/**
 * Description of the custom voice to be synthesized.
 */
export interface CustomVoiceParams {
  /**
   * Required. The name of the AutoML model that synthesizes the custom voice.
   */
  model?: string;
  /**
   * Optional. The usage of the synthesized audio to be reported.
   */
  reportedUsage?:  | "REPORTED_USAGE_UNSPECIFIED" | "REALTIME" | "OFFLINE";
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
 * Metadata for response returned by the `SynthesizeLongAudio` method.
 */
export interface GoogleCloudTexttospeechV1SynthesizeLongAudioMetadata {
  /**
   * The progress of the most recent processing update in percentage, ie.
   * 70.0%.
   */
  progressPercentage?: number;
  /**
   * Time when the request was received.
   */
  startTime?: Date;
}

function serializeGoogleCloudTexttospeechV1SynthesizeLongAudioMetadata(data: any): GoogleCloudTexttospeechV1SynthesizeLongAudioMetadata {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudTexttospeechV1SynthesizeLongAudioMetadata(data: any): GoogleCloudTexttospeechV1SynthesizeLongAudioMetadata {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
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
 * The message returned to the client by the `ListVoices` method.
 */
export interface ListVoicesResponse {
  /**
   * The list of voices.
   */
  voices?: Voice[];
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
 * Additional options for texttospeech#projectsLocationsOperationsList.
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
 * Contains text input to be synthesized. Either `text` or `ssml` must be
 * supplied. Supplying both or neither returns google.rpc.Code.INVALID_ARGUMENT.
 * The input size is limited to 5000 bytes.
 */
export interface SynthesisInput {
  /**
   * The SSML document to be synthesized. The SSML document must be valid and
   * well-formed. Otherwise the RPC will fail and return
   * google.rpc.Code.INVALID_ARGUMENT. For more information, see
   * [SSML](https://cloud.google.com/text-to-speech/docs/ssml).
   */
  ssml?: string;
  /**
   * The raw text to be synthesized.
   */
  text?: string;
}

/**
 * Metadata for response returned by the `SynthesizeLongAudio` method.
 */
export interface SynthesizeLongAudioMetadata {
  /**
   * The progress of the most recent processing update in percentage, ie.
   * 70.0%.
   */
  progressPercentage?: number;
  /**
   * Time when the request was received.
   */
  startTime?: Date;
}

function serializeSynthesizeLongAudioMetadata(data: any): SynthesizeLongAudioMetadata {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeSynthesizeLongAudioMetadata(data: any): SynthesizeLongAudioMetadata {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * The top-level message sent by the client for the `SynthesizeLongAudio`
 * method.
 */
export interface SynthesizeLongAudioRequest {
  /**
   * Required. The configuration of the synthesized audio.
   */
  audioConfig?: AudioConfig;
  /**
   * Required. The Synthesizer requires either plain text or SSML as input.
   */
  input?: SynthesisInput;
  /**
   * Specifies a Cloud Storage URI for the synthesis results. Must be specified
   * in the format: `gs://bucket_name/object_name`, and the bucket must already
   * exist.
   */
  outputGcsUri?: string;
  /**
   * The desired voice of the synthesized audio.
   */
  voice?: VoiceSelectionParams;
}

/**
 * The top-level message sent by the client for the `SynthesizeSpeech` method.
 */
export interface SynthesizeSpeechRequest {
  /**
   * Required. The configuration of the synthesized audio.
   */
  audioConfig?: AudioConfig;
  /**
   * Required. The Synthesizer requires either plain text or SSML as input.
   */
  input?: SynthesisInput;
  /**
   * Required. The desired voice of the synthesized audio.
   */
  voice?: VoiceSelectionParams;
}

/**
 * The message returned to the client by the `SynthesizeSpeech` method.
 */
export interface SynthesizeSpeechResponse {
  /**
   * The audio data bytes encoded as specified in the request, including the
   * header for encodings that are wrapped in containers (e.g. MP3, OGG_OPUS).
   * For LINEAR16 audio, we include the WAV header. Note: as with all bytes
   * fields, protobuffers use a pure binary representation, whereas JSON
   * representations use base64.
   */
  audioContent?: Uint8Array;
}

function serializeSynthesizeSpeechResponse(data: any): SynthesizeSpeechResponse {
  return {
    ...data,
    audioContent: data["audioContent"] !== undefined ? encodeBase64(data["audioContent"]) : undefined,
  };
}

function deserializeSynthesizeSpeechResponse(data: any): SynthesizeSpeechResponse {
  return {
    ...data,
    audioContent: data["audioContent"] !== undefined ? decodeBase64(data["audioContent"] as string) : undefined,
  };
}

/**
 * Description of a voice supported by the TTS service.
 */
export interface Voice {
  /**
   * The languages that this voice supports, expressed as
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tags (e.g.
   * "en-US", "es-419", "cmn-tw").
   */
  languageCodes?: string[];
  /**
   * The name of this voice. Each distinct voice has a unique name.
   */
  name?: string;
  /**
   * The natural sample rate (in hertz) for this voice.
   */
  naturalSampleRateHertz?: number;
  /**
   * The gender of this voice.
   */
  ssmlGender?:  | "SSML_VOICE_GENDER_UNSPECIFIED" | "MALE" | "FEMALE" | "NEUTRAL";
}

/**
 * Description of which voice to use for a synthesis request.
 */
export interface VoiceSelectionParams {
  /**
   * The configuration for a custom voice. If [CustomVoiceParams.model] is set,
   * the service will choose the custom voice matching the specified
   * configuration.
   */
  customVoice?: CustomVoiceParams;
  /**
   * Required. The language (and potentially also the region) of the voice
   * expressed as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt)
   * language tag, e.g. "en-US". This should not include a script tag (e.g. use
   * "cmn-cn" rather than "cmn-Hant-cn"), because the script will be inferred
   * from the input provided in the SynthesisInput. The TTS service will use
   * this parameter to help choose an appropriate voice. Note that the TTS
   * service may choose a voice with a slightly different language code than the
   * one selected; it may substitute a different region (e.g. using en-US rather
   * than en-CA if there isn't a Canadian voice available), or even a different
   * language, e.g. using "nb" (Norwegian Bokmal) instead of "no" (Norwegian)".
   */
  languageCode?: string;
  /**
   * The name of the voice. If not set, the service will choose a voice based
   * on the other parameters such as language_code and gender.
   */
  name?: string;
  /**
   * The preferred gender of the voice. If not set, the service will choose a
   * voice based on the other parameters such as language_code and name. Note
   * that this is only a preference, not requirement; if a voice of the
   * appropriate gender is not available, the synthesizer should substitute a
   * voice with a different gender rather than failing the request.
   */
  ssmlGender?:  | "SSML_VOICE_GENDER_UNSPECIFIED" | "MALE" | "FEMALE" | "NEUTRAL";
}

/**
 * Additional options for texttospeech#voicesList.
 */
export interface VoicesListOptions {
  /**
   * Optional. Recommended.
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag. If not
   * specified, the API will return all supported voices. If specified, the
   * ListVoices call will only return voices that can be used to synthesize this
   * language_code. For example, if you specify `"en-NZ"`, all `"en-NZ"` voices
   * will be returned. If you specify `"no"`, both `"no-\*"` (Norwegian) and
   * `"nb-\*"` (Norwegian Bokmal) voices will be returned.
   */
  languageCode?: string;
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
