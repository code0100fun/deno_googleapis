// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Video Intelligence API Client for Deno
 * ============================================
 * 
 * Detects objects, explicit content, and scene changes in videos. It also specifies the region for annotation and transcribes speech to text. Supports both asynchronous API and streaming API.
 * 
 * Docs: https://cloud.google.com/video-intelligence/docs/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Detects objects, explicit content, and scene changes in videos. It also
 * specifies the region for annotation and transcribes speech to text. Supports
 * both asynchronous API and streaming API.
 */
export class VideoIntelligence {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://videointelligence.googleapis.com/") {
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
  async operationsProjectsLocationsOperationsCancel(name: string): Promise<GoogleProtobuf_Empty> {
    const url = new URL(`${this.#baseUrl}v1/operations/${ name }:cancel`);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
    });
    return data as GoogleProtobuf_Empty;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async operationsProjectsLocationsOperationsDelete(name: string): Promise<GoogleProtobuf_Empty> {
    const url = new URL(`${this.#baseUrl}v1/operations/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobuf_Empty;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async operationsProjectsLocationsOperationsGet(name: string): Promise<GoogleLongrunning_Operation> {
    const url = new URL(`${this.#baseUrl}v1/operations/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunning_Operation;
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
  async projectsLocationsOperationsCancel(name: string, req: GoogleLongrunning_CancelOperationRequest): Promise<GoogleProtobuf_Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }:cancel`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleProtobuf_Empty;
  }

  /**
   * Deletes a long-running operation. This method indicates that the client is
   * no longer interested in the operation result. It does not cancel the
   * operation. If the server doesn't support this method, it returns
   * `google.rpc.Code.UNIMPLEMENTED`.
   *
   * @param name The name of the operation resource to be deleted.
   */
  async projectsLocationsOperationsDelete(name: string): Promise<GoogleProtobuf_Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as GoogleProtobuf_Empty;
  }

  /**
   * Gets the latest state of a long-running operation. Clients can use this
   * method to poll the operation result at intervals as recommended by the API
   * service.
   *
   * @param name The name of the operation resource.
   */
  async projectsLocationsOperationsGet(name: string): Promise<GoogleLongrunning_Operation> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as GoogleLongrunning_Operation;
  }

  /**
   * Lists operations that match the specified filter in the request. If the
   * server doesn't support this method, it returns `UNIMPLEMENTED`.
   *
   * @param name The name of the operation's parent resource.
   */
  async projectsLocationsOperationsList(name: string, opts: ProjectsLocationsOperationsListOptions = {}): Promise<GoogleLongrunning_ListOperationsResponse> {
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
    return data as GoogleLongrunning_ListOperationsResponse;
  }

  /**
   * Performs asynchronous video annotation. Progress and results can be
   * retrieved through the `google.longrunning.Operations` interface.
   * `Operation.metadata` contains `AnnotateVideoProgress` (progress).
   * `Operation.response` contains `AnnotateVideoResponse` (results).
   *
   */
  async videosAnnotate(req: GoogleCloudVideointelligenceV1_AnnotateVideoRequest): Promise<GoogleLongrunning_Operation> {
    req = serializeGoogleCloudVideointelligenceV1_AnnotateVideoRequest(req);
    const url = new URL(`${this.#baseUrl}v1/videos:annotate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as GoogleLongrunning_Operation;
  }
}

/**
 * Video annotation progress. Included in the `metadata` field of the
 * `Operation` returned by the `GetOperation` call of the
 * `google::longrunning::Operations` service.
 */
export interface GoogleCloudVideointelligenceV1_AnnotateVideoProgress {
  /**
   * Progress metadata for all videos specified in `AnnotateVideoRequest`.
   */
  annotationProgress?: GoogleCloudVideointelligenceV1_VideoAnnotationProgress[];
}

function serializeGoogleCloudVideointelligenceV1_AnnotateVideoProgress(data: any): GoogleCloudVideointelligenceV1_AnnotateVideoProgress {
  return {
    ...data,
    annotationProgress: data["annotationProgress"] !== undefined ? data["annotationProgress"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_VideoAnnotationProgress(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_AnnotateVideoProgress(data: any): GoogleCloudVideointelligenceV1_AnnotateVideoProgress {
  return {
    ...data,
    annotationProgress: data["annotationProgress"] !== undefined ? data["annotationProgress"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_VideoAnnotationProgress(item))) : undefined,
  };
}

/**
 * Video annotation request.
 */
export interface GoogleCloudVideointelligenceV1_AnnotateVideoRequest {
  /**
   * Required. Requested video annotation features.
   */
  features?:  | "FEATURE_UNSPECIFIED" | "LABEL_DETECTION" | "SHOT_CHANGE_DETECTION" | "EXPLICIT_CONTENT_DETECTION" | "FACE_DETECTION" | "SPEECH_TRANSCRIPTION" | "TEXT_DETECTION" | "OBJECT_TRACKING" | "LOGO_RECOGNITION" | "PERSON_DETECTION"[];
  /**
   * The video data bytes. If unset, the input video(s) should be specified via
   * the `input_uri`. If set, `input_uri` must be unset.
   */
  inputContent?: Uint8Array;
  /**
   * Input video location. Currently, only [Cloud
   * Storage](https://cloud.google.com/storage/) URIs are supported. URIs must
   * be specified in the following format: `gs://bucket-id/object-id` (other URI
   * formats return google.rpc.Code.INVALID_ARGUMENT). For more information, see
   * [Request URIs](https://cloud.google.com/storage/docs/request-endpoints). To
   * identify multiple videos, a video URI may include wildcards in the
   * `object-id`. Supported wildcards: '*' to match 0 or more characters; '?' to
   * match 1 character. If unset, the input video should be embedded in the
   * request as `input_content`. If set, `input_content` must be unset.
   */
  inputUri?: string;
  /**
   * Optional. Cloud region where annotation should take place. Supported cloud
   * regions are: `us-east1`, `us-west1`, `europe-west1`, `asia-east1`. If no
   * region is specified, the region will be determined based on video file
   * location.
   */
  locationId?: string;
  /**
   * Optional. Location where the output (in JSON format) should be stored.
   * Currently, only [Cloud Storage](https://cloud.google.com/storage/) URIs are
   * supported. These must be specified in the following format:
   * `gs://bucket-id/object-id` (other URI formats return
   * google.rpc.Code.INVALID_ARGUMENT). For more information, see [Request
   * URIs](https://cloud.google.com/storage/docs/request-endpoints).
   */
  outputUri?: string;
  /**
   * Additional video context and/or feature-specific parameters.
   */
  videoContext?: GoogleCloudVideointelligenceV1_VideoContext;
}

function serializeGoogleCloudVideointelligenceV1_AnnotateVideoRequest(data: any): GoogleCloudVideointelligenceV1_AnnotateVideoRequest {
  return {
    ...data,
    inputContent: data["inputContent"] !== undefined ? encodeBase64(data["inputContent"]) : undefined,
    videoContext: data["videoContext"] !== undefined ? serializeGoogleCloudVideointelligenceV1_VideoContext(data["videoContext"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_AnnotateVideoRequest(data: any): GoogleCloudVideointelligenceV1_AnnotateVideoRequest {
  return {
    ...data,
    inputContent: data["inputContent"] !== undefined ? decodeBase64(data["inputContent"] as string) : undefined,
    videoContext: data["videoContext"] !== undefined ? deserializeGoogleCloudVideointelligenceV1_VideoContext(data["videoContext"]) : undefined,
  };
}

/**
 * Video annotation response. Included in the `response` field of the
 * `Operation` returned by the `GetOperation` call of the
 * `google::longrunning::Operations` service.
 */
export interface GoogleCloudVideointelligenceV1_AnnotateVideoResponse {
  /**
   * Annotation results for all videos specified in `AnnotateVideoRequest`.
   */
  annotationResults?: GoogleCloudVideointelligenceV1_VideoAnnotationResults[];
}

function serializeGoogleCloudVideointelligenceV1_AnnotateVideoResponse(data: any): GoogleCloudVideointelligenceV1_AnnotateVideoResponse {
  return {
    ...data,
    annotationResults: data["annotationResults"] !== undefined ? data["annotationResults"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_VideoAnnotationResults(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_AnnotateVideoResponse(data: any): GoogleCloudVideointelligenceV1_AnnotateVideoResponse {
  return {
    ...data,
    annotationResults: data["annotationResults"] !== undefined ? data["annotationResults"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_VideoAnnotationResults(item))) : undefined,
  };
}

/**
 * A generic detected attribute represented by name in string format.
 */
export interface GoogleCloudVideointelligenceV1_DetectedAttribute {
  /**
   * Detected attribute confidence. Range [0, 1].
   */
  confidence?: number;
  /**
   * The name of the attribute, for example, glasses, dark_glasses, mouth_open.
   * A full list of supported type names will be provided in the document.
   */
  name?: string;
  /**
   * Text value of the detection result. For example, the value for "HairColor"
   * can be "black", "blonde", etc.
   */
  value?: string;
}

/**
 * A generic detected landmark represented by name in string format and a 2D
 * location.
 */
export interface GoogleCloudVideointelligenceV1_DetectedLandmark {
  /**
   * The confidence score of the detected landmark. Range [0, 1].
   */
  confidence?: number;
  /**
   * The name of this landmark, for example, left_hand, right_shoulder.
   */
  name?: string;
  /**
   * The 2D point of the detected landmark using the normalized image
   * coordindate system. The normalized coordinates have the range from 0 to 1.
   */
  point?: GoogleCloudVideointelligenceV1_NormalizedVertex;
}

/**
 * Detected entity from video analysis.
 */
export interface GoogleCloudVideointelligenceV1_Entity {
  /**
   * Textual description, e.g., `Fixed-gear bicycle`.
   */
  description?: string;
  /**
   * Opaque entity ID. Some IDs may be available in [Google Knowledge Graph
   * Search API](https://developers.google.com/knowledge-graph/).
   */
  entityId?: string;
  /**
   * Language code for `description` in BCP-47 format.
   */
  languageCode?: string;
}

/**
 * Explicit content annotation (based on per-frame visual signals only). If no
 * explicit content has been detected in a frame, no annotations are present for
 * that frame.
 */
export interface GoogleCloudVideointelligenceV1_ExplicitContentAnnotation {
  /**
   * All video frames where explicit content was detected.
   */
  frames?: GoogleCloudVideointelligenceV1_ExplicitContentFrame[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1_ExplicitContentAnnotation(data: any): GoogleCloudVideointelligenceV1_ExplicitContentAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_ExplicitContentFrame(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_ExplicitContentAnnotation(data: any): GoogleCloudVideointelligenceV1_ExplicitContentAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_ExplicitContentFrame(item))) : undefined,
  };
}

/**
 * Config for EXPLICIT_CONTENT_DETECTION.
 */
export interface GoogleCloudVideointelligenceV1_ExplicitContentDetectionConfig {
  /**
   * Model to use for explicit content detection. Supported values:
   * "builtin/stable" (the default if unset) and "builtin/latest".
   */
  model?: string;
}

/**
 * Video frame level annotation results for explicit content.
 */
export interface GoogleCloudVideointelligenceV1_ExplicitContentFrame {
  /**
   * Likelihood of the pornography content..
   */
  pornographyLikelihood?:  | "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1_ExplicitContentFrame(data: any): GoogleCloudVideointelligenceV1_ExplicitContentFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_ExplicitContentFrame(data: any): GoogleCloudVideointelligenceV1_ExplicitContentFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Deprecated. No effect.
 */
export interface GoogleCloudVideointelligenceV1_FaceAnnotation {
  /**
   * All video frames where a face was detected.
   */
  frames?: GoogleCloudVideointelligenceV1_FaceFrame[];
  /**
   * All video segments where a face was detected.
   */
  segments?: GoogleCloudVideointelligenceV1_FaceSegment[];
  /**
   * Thumbnail of a representative face view (in JPEG format).
   */
  thumbnail?: Uint8Array;
}

function serializeGoogleCloudVideointelligenceV1_FaceAnnotation(data: any): GoogleCloudVideointelligenceV1_FaceAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_FaceFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_FaceSegment(item))) : undefined,
    thumbnail: data["thumbnail"] !== undefined ? encodeBase64(data["thumbnail"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_FaceAnnotation(data: any): GoogleCloudVideointelligenceV1_FaceAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_FaceFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_FaceSegment(item))) : undefined,
    thumbnail: data["thumbnail"] !== undefined ? decodeBase64(data["thumbnail"] as string) : undefined,
  };
}

/**
 * Face detection annotation.
 */
export interface GoogleCloudVideointelligenceV1_FaceDetectionAnnotation {
  /**
   * The thumbnail of a person's face.
   */
  thumbnail?: Uint8Array;
  /**
   * The face tracks with attributes.
   */
  tracks?: GoogleCloudVideointelligenceV1_Track[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1_FaceDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1_FaceDetectionAnnotation {
  return {
    ...data,
    thumbnail: data["thumbnail"] !== undefined ? encodeBase64(data["thumbnail"]) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_FaceDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1_FaceDetectionAnnotation {
  return {
    ...data,
    thumbnail: data["thumbnail"] !== undefined ? decodeBase64(data["thumbnail"] as string) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_Track(item))) : undefined,
  };
}

/**
 * Config for FACE_DETECTION.
 */
export interface GoogleCloudVideointelligenceV1_FaceDetectionConfig {
  /**
   * Whether to enable face attributes detection, such as glasses,
   * dark_glasses, mouth_open etc. Ignored if 'include_bounding_boxes' is set to
   * false.
   */
  includeAttributes?: boolean;
  /**
   * Whether bounding boxes are included in the face annotation output.
   */
  includeBoundingBoxes?: boolean;
  /**
   * Model to use for face detection. Supported values: "builtin/stable" (the
   * default if unset) and "builtin/latest".
   */
  model?: string;
}

/**
 * Deprecated. No effect.
 */
export interface GoogleCloudVideointelligenceV1_FaceFrame {
  /**
   * Normalized Bounding boxes in a frame. There can be more than one boxes if
   * the same face is detected in multiple locations within the current frame.
   */
  normalizedBoundingBoxes?: GoogleCloudVideointelligenceV1_NormalizedBoundingBox[];
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1_FaceFrame(data: any): GoogleCloudVideointelligenceV1_FaceFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_FaceFrame(data: any): GoogleCloudVideointelligenceV1_FaceFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for face detection.
 */
export interface GoogleCloudVideointelligenceV1_FaceSegment {
  /**
   * Video segment where a face was detected.
   */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1_FaceSegment(data: any): GoogleCloudVideointelligenceV1_FaceSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_FaceSegment(data: any): GoogleCloudVideointelligenceV1_FaceSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * Label annotation.
 */
export interface GoogleCloudVideointelligenceV1_LabelAnnotation {
  /**
   * Common categories for the detected entity. For example, when the label is
   * `Terrier`, the category is likely `dog`. And in some cases there might be
   * more than one categories e.g., `Terrier` could also be a `pet`.
   */
  categoryEntities?: GoogleCloudVideointelligenceV1_Entity[];
  /**
   * Detected entity.
   */
  entity?: GoogleCloudVideointelligenceV1_Entity;
  /**
   * All video frames where a label was detected.
   */
  frames?: GoogleCloudVideointelligenceV1_LabelFrame[];
  /**
   * All video segments where a label was detected.
   */
  segments?: GoogleCloudVideointelligenceV1_LabelSegment[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1_LabelAnnotation(data: any): GoogleCloudVideointelligenceV1_LabelAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_LabelFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_LabelSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_LabelAnnotation(data: any): GoogleCloudVideointelligenceV1_LabelAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_LabelFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_LabelSegment(item))) : undefined,
  };
}

/**
 * Config for LABEL_DETECTION.
 */
export interface GoogleCloudVideointelligenceV1_LabelDetectionConfig {
  /**
   * The confidence threshold we perform filtering on the labels from
   * frame-level detection. If not set, it is set to 0.4 by default. The valid
   * range for this threshold is [0.1, 0.9]. Any value set outside of this range
   * will be clipped. Note: For best results, follow the default threshold. We
   * will update the default threshold everytime when we release a new model.
   */
  frameConfidenceThreshold?: number;
  /**
   * What labels should be detected with LABEL_DETECTION, in addition to
   * video-level labels or segment-level labels. If unspecified, defaults to
   * `SHOT_MODE`.
   */
  labelDetectionMode?:  | "LABEL_DETECTION_MODE_UNSPECIFIED" | "SHOT_MODE" | "FRAME_MODE" | "SHOT_AND_FRAME_MODE";
  /**
   * Model to use for label detection. Supported values: "builtin/stable" (the
   * default if unset) and "builtin/latest".
   */
  model?: string;
  /**
   * Whether the video has been shot from a stationary (i.e., non-moving)
   * camera. When set to true, might improve detection accuracy for moving
   * objects. Should be used with `SHOT_AND_FRAME_MODE` enabled.
   */
  stationaryCamera?: boolean;
  /**
   * The confidence threshold we perform filtering on the labels from
   * video-level and shot-level detections. If not set, it's set to 0.3 by
   * default. The valid range for this threshold is [0.1, 0.9]. Any value set
   * outside of this range will be clipped. Note: For best results, follow the
   * default threshold. We will update the default threshold everytime when we
   * release a new model.
   */
  videoConfidenceThreshold?: number;
}

/**
 * Video frame level annotation results for label detection.
 */
export interface GoogleCloudVideointelligenceV1_LabelFrame {
  /**
   * Confidence that the label is accurate. Range: [0, 1].
   */
  confidence?: number;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1_LabelFrame(data: any): GoogleCloudVideointelligenceV1_LabelFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_LabelFrame(data: any): GoogleCloudVideointelligenceV1_LabelFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for label detection.
 */
export interface GoogleCloudVideointelligenceV1_LabelSegment {
  /**
   * Confidence that the label is accurate. Range: [0, 1].
   */
  confidence?: number;
  /**
   * Video segment where a label was detected.
   */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1_LabelSegment(data: any): GoogleCloudVideointelligenceV1_LabelSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_LabelSegment(data: any): GoogleCloudVideointelligenceV1_LabelSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * Annotation corresponding to one detected, tracked and recognized logo class.
 */
export interface GoogleCloudVideointelligenceV1_LogoRecognitionAnnotation {
  /**
   * Entity category information to specify the logo class that all the logo
   * tracks within this LogoRecognitionAnnotation are recognized as.
   */
  entity?: GoogleCloudVideointelligenceV1_Entity;
  /**
   * All video segments where the recognized logo appears. There might be
   * multiple instances of the same logo class appearing in one VideoSegment.
   */
  segments?: GoogleCloudVideointelligenceV1_VideoSegment[];
  /**
   * All logo tracks where the recognized logo appears. Each track corresponds
   * to one logo instance appearing in consecutive frames.
   */
  tracks?: GoogleCloudVideointelligenceV1_Track[];
}

function serializeGoogleCloudVideointelligenceV1_LogoRecognitionAnnotation(data: any): GoogleCloudVideointelligenceV1_LogoRecognitionAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_VideoSegment(item))) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_LogoRecognitionAnnotation(data: any): GoogleCloudVideointelligenceV1_LogoRecognitionAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_VideoSegment(item))) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_Track(item))) : undefined,
  };
}

/**
 * Normalized bounding box. The normalized vertex coordinates are relative to
 * the original image. Range: [0, 1].
 */
export interface GoogleCloudVideointelligenceV1_NormalizedBoundingBox {
  /**
   * Bottom Y coordinate.
   */
  bottom?: number;
  /**
   * Left X coordinate.
   */
  left?: number;
  /**
   * Right X coordinate.
   */
  right?: number;
  /**
   * Top Y coordinate.
   */
  top?: number;
}

/**
 * Normalized bounding polygon for text (that might not be aligned with axis).
 * Contains list of the corner points in clockwise order starting from top-left
 * corner. For example, for a rectangular bounding box: When the text is
 * horizontal it might look like: 0----1 | | 3----2 When it's clockwise rotated
 * 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the
 * vertex order will still be (0, 1, 2, 3). Note that values can be less than 0,
 * or greater than 1 due to trignometric calculations for location of the box.
 */
export interface GoogleCloudVideointelligenceV1_NormalizedBoundingPoly {
  /**
   * Normalized vertices of the bounding polygon.
   */
  vertices?: GoogleCloudVideointelligenceV1_NormalizedVertex[];
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface GoogleCloudVideointelligenceV1_NormalizedVertex {
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
 * Annotations corresponding to one tracked object.
 */
export interface GoogleCloudVideointelligenceV1_ObjectTrackingAnnotation {
  /**
   * Object category's labeling confidence of this track.
   */
  confidence?: number;
  /**
   * Entity to specify the object category that this track is labeled as.
   */
  entity?: GoogleCloudVideointelligenceV1_Entity;
  /**
   * Information corresponding to all frames where this object track appears.
   * Non-streaming batch mode: it may be one or multiple ObjectTrackingFrame
   * messages in frames. Streaming mode: it can only be one ObjectTrackingFrame
   * message in frames.
   */
  frames?: GoogleCloudVideointelligenceV1_ObjectTrackingFrame[];
  /**
   * Non-streaming batch mode ONLY. Each object track corresponds to one video
   * segment where it appears.
   */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
  /**
   * Streaming mode ONLY. In streaming mode, we do not know the end time of a
   * tracked object before it is completed. Hence, there is no VideoSegment info
   * returned. Instead, we provide a unique identifiable integer track_id so
   * that the customers can correlate the results of the ongoing
   * ObjectTrackAnnotation of the same track_id over time.
   */
  trackId?: bigint;
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1_ObjectTrackingAnnotation(data: any): GoogleCloudVideointelligenceV1_ObjectTrackingAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_ObjectTrackingFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
    trackId: data["trackId"] !== undefined ? String(data["trackId"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_ObjectTrackingAnnotation(data: any): GoogleCloudVideointelligenceV1_ObjectTrackingAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_ObjectTrackingFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
    trackId: data["trackId"] !== undefined ? BigInt(data["trackId"]) : undefined,
  };
}

/**
 * Config for OBJECT_TRACKING.
 */
export interface GoogleCloudVideointelligenceV1_ObjectTrackingConfig {
  /**
   * Model to use for object tracking. Supported values: "builtin/stable" (the
   * default if unset) and "builtin/latest".
   */
  model?: string;
}

/**
 * Video frame level annotations for object detection and tracking. This field
 * stores per frame location, time offset, and confidence.
 */
export interface GoogleCloudVideointelligenceV1_ObjectTrackingFrame {
  /**
   * The normalized bounding box location of this object track for the frame.
   */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1_NormalizedBoundingBox;
  /**
   * The timestamp of the frame in microseconds.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1_ObjectTrackingFrame(data: any): GoogleCloudVideointelligenceV1_ObjectTrackingFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_ObjectTrackingFrame(data: any): GoogleCloudVideointelligenceV1_ObjectTrackingFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Person detection annotation per video.
 */
export interface GoogleCloudVideointelligenceV1_PersonDetectionAnnotation {
  /**
   * The detected tracks of a person.
   */
  tracks?: GoogleCloudVideointelligenceV1_Track[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1_PersonDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1_PersonDetectionAnnotation {
  return {
    ...data,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_PersonDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1_PersonDetectionAnnotation {
  return {
    ...data,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_Track(item))) : undefined,
  };
}

/**
 * Config for PERSON_DETECTION.
 */
export interface GoogleCloudVideointelligenceV1_PersonDetectionConfig {
  /**
   * Whether to enable person attributes detection, such as cloth color (black,
   * blue, etc), type (coat, dress, etc), pattern (plain, floral, etc), hair,
   * etc. Ignored if 'include_bounding_boxes' is set to false.
   */
  includeAttributes?: boolean;
  /**
   * Whether bounding boxes are included in the person detection annotation
   * output.
   */
  includeBoundingBoxes?: boolean;
  /**
   * Whether to enable pose landmarks detection. Ignored if
   * 'include_bounding_boxes' is set to false.
   */
  includePoseLandmarks?: boolean;
}

/**
 * Config for SHOT_CHANGE_DETECTION.
 */
export interface GoogleCloudVideointelligenceV1_ShotChangeDetectionConfig {
  /**
   * Model to use for shot change detection. Supported values: "builtin/stable"
   * (the default if unset), "builtin/latest", and "builtin/legacy".
   */
  model?: string;
}

/**
 * Provides "hints" to the speech recognizer to favor specific words and
 * phrases in the results.
 */
export interface GoogleCloudVideointelligenceV1_SpeechContext {
  /**
   * Optional. A list of strings containing words and phrases "hints" so that
   * the speech recognition is more likely to recognize them. This can be used
   * to improve the accuracy for specific words and phrases, for example, if
   * specific commands are typically spoken by the user. This can also be used
   * to add additional words to the vocabulary of the recognizer. See [usage
   * limits](https://cloud.google.com/speech/limits#content).
   */
  phrases?: string[];
}

/**
 * Alternative hypotheses (a.k.a. n-best list).
 */
export interface GoogleCloudVideointelligenceV1_SpeechRecognitionAlternative {
  /**
   * Output only. The confidence estimate between 0.0 and 1.0. A higher number
   * indicates an estimated greater likelihood that the recognized words are
   * correct. This field is set only for the top alternative. This field is not
   * guaranteed to be accurate and users should not rely on it to be always
   * provided. The default of 0.0 is a sentinel value indicating `confidence`
   * was not set.
   */
  readonly confidence?: number;
  /**
   * Transcript text representing the words that the user spoke.
   */
  transcript?: string;
  /**
   * Output only. A list of word-specific information for each recognized word.
   * Note: When `enable_speaker_diarization` is set to true, you will see all
   * the words from the beginning of the audio.
   */
  readonly words?: GoogleCloudVideointelligenceV1_WordInfo[];
}

/**
 * A speech recognition result corresponding to a portion of the audio.
 */
export interface GoogleCloudVideointelligenceV1_SpeechTranscription {
  /**
   * May contain one or more recognition hypotheses (up to the maximum
   * specified in `max_alternatives`). These alternatives are ordered in terms
   * of accuracy, with the top (first) alternative being the most probable, as
   * ranked by the recognizer.
   */
  alternatives?: GoogleCloudVideointelligenceV1_SpeechRecognitionAlternative[];
  /**
   * Output only. The [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt)
   * language tag of the language in this result. This language code was
   * detected to have the most likelihood of being spoken in the audio.
   */
  readonly languageCode?: string;
}

/**
 * Config for SPEECH_TRANSCRIPTION.
 */
export interface GoogleCloudVideointelligenceV1_SpeechTranscriptionConfig {
  /**
   * Optional. For file formats, such as MXF or MKV, supporting multiple audio
   * tracks, specify up to two tracks. Default: track 0.
   */
  audioTracks?: number[];
  /**
   * Optional. If set, specifies the estimated number of speakers in the
   * conversation. If not set, defaults to '2'. Ignored unless
   * enable_speaker_diarization is set to true.
   */
  diarizationSpeakerCount?: number;
  /**
   * Optional. If 'true', adds punctuation to recognition result hypotheses.
   * This feature is only available in select languages. Setting this for
   * requests in other languages has no effect at all. The default 'false' value
   * does not add punctuation to result hypotheses. NOTE: "This is currently
   * offered as an experimental service, complimentary to all users. In the
   * future this may be exclusively available as a premium feature."
   */
  enableAutomaticPunctuation?: boolean;
  /**
   * Optional. If 'true', enables speaker detection for each recognized word in
   * the top alternative of the recognition result using a speaker_tag provided
   * in the WordInfo. Note: When this is true, we send all the words from the
   * beginning of the audio for the top alternative in every consecutive
   * response. This is done in order to improve our speaker tags as our models
   * learn to identify the speakers in the conversation over time.
   */
  enableSpeakerDiarization?: boolean;
  /**
   * Optional. If `true`, the top result includes a list of words and the
   * confidence for those words. If `false`, no word-level confidence
   * information is returned. The default is `false`.
   */
  enableWordConfidence?: boolean;
  /**
   * Optional. If set to `true`, the server will attempt to filter out
   * profanities, replacing all but the initial character in each filtered word
   * with asterisks, e.g. "f***". If set to `false` or omitted, profanities
   * won't be filtered out.
   */
  filterProfanity?: boolean;
  /**
   * Required. *Required* The language of the supplied audio as a
   * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag.
   * Example: "en-US". See [Language
   * Support](https://cloud.google.com/speech/docs/languages) for a list of the
   * currently supported language codes.
   */
  languageCode?: string;
  /**
   * Optional. Maximum number of recognition hypotheses to be returned.
   * Specifically, the maximum number of `SpeechRecognitionAlternative` messages
   * within each `SpeechTranscription`. The server may return fewer than
   * `max_alternatives`. Valid values are `0`-`30`. A value of `0` or `1` will
   * return a maximum of one. If omitted, will return a maximum of one.
   */
  maxAlternatives?: number;
  /**
   * Optional. A means to provide context to assist the speech recognition.
   */
  speechContexts?: GoogleCloudVideointelligenceV1_SpeechContext[];
}

/**
 * Annotations related to one detected OCR text snippet. This will contain the
 * corresponding text, confidence value, and frame level information for each
 * detection.
 */
export interface GoogleCloudVideointelligenceV1_TextAnnotation {
  /**
   * All video segments where OCR detected text appears.
   */
  segments?: GoogleCloudVideointelligenceV1_TextSegment[];
  /**
   * The detected text.
   */
  text?: string;
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1_TextAnnotation(data: any): GoogleCloudVideointelligenceV1_TextAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_TextSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_TextAnnotation(data: any): GoogleCloudVideointelligenceV1_TextAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_TextSegment(item))) : undefined,
  };
}

/**
 * Config for TEXT_DETECTION.
 */
export interface GoogleCloudVideointelligenceV1_TextDetectionConfig {
  /**
   * Language hint can be specified if the language to be detected is known a
   * priori. It can increase the accuracy of the detection. Language hint must
   * be language code in BCP-47 format. Automatic language detection is
   * performed if no hint is provided.
   */
  languageHints?: string[];
  /**
   * Model to use for text detection. Supported values: "builtin/stable" (the
   * default if unset) and "builtin/latest".
   */
  model?: string;
}

/**
 * Video frame level annotation results for text annotation (OCR). Contains
 * information regarding timestamp and bounding box locations for the frames
 * containing detected OCR text snippets.
 */
export interface GoogleCloudVideointelligenceV1_TextFrame {
  /**
   * Bounding polygon of the detected text for this frame.
   */
  rotatedBoundingBox?: GoogleCloudVideointelligenceV1_NormalizedBoundingPoly;
  /**
   * Timestamp of this frame.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1_TextFrame(data: any): GoogleCloudVideointelligenceV1_TextFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_TextFrame(data: any): GoogleCloudVideointelligenceV1_TextFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for text detection.
 */
export interface GoogleCloudVideointelligenceV1_TextSegment {
  /**
   * Confidence for the track of detected text. It is calculated as the highest
   * over all frames where OCR detected text appears.
   */
  confidence?: number;
  /**
   * Information related to the frames where OCR detected text appears.
   */
  frames?: GoogleCloudVideointelligenceV1_TextFrame[];
  /**
   * Video segment where a text snippet was detected.
   */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1_TextSegment(data: any): GoogleCloudVideointelligenceV1_TextSegment {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_TextFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_TextSegment(data: any): GoogleCloudVideointelligenceV1_TextSegment {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_TextFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * For tracking related features. An object at time_offset with attributes, and
 * located with normalized_bounding_box.
 */
export interface GoogleCloudVideointelligenceV1_TimestampedObject {
  /**
   * Optional. The attributes of the object in the bounding box.
   */
  attributes?: GoogleCloudVideointelligenceV1_DetectedAttribute[];
  /**
   * Optional. The detected landmarks.
   */
  landmarks?: GoogleCloudVideointelligenceV1_DetectedLandmark[];
  /**
   * Normalized Bounding box in a frame, where the object is located.
   */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1_NormalizedBoundingBox;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this object.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1_TimestampedObject(data: any): GoogleCloudVideointelligenceV1_TimestampedObject {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_TimestampedObject(data: any): GoogleCloudVideointelligenceV1_TimestampedObject {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * A track of an object instance.
 */
export interface GoogleCloudVideointelligenceV1_Track {
  /**
   * Optional. Attributes in the track level.
   */
  attributes?: GoogleCloudVideointelligenceV1_DetectedAttribute[];
  /**
   * Optional. The confidence score of the tracked object.
   */
  confidence?: number;
  /**
   * Video segment of a track.
   */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
  /**
   * The object with timestamp and attributes per frame in the track.
   */
  timestampedObjects?: GoogleCloudVideointelligenceV1_TimestampedObject[];
}

function serializeGoogleCloudVideointelligenceV1_Track(data: any): GoogleCloudVideointelligenceV1_Track {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
    timestampedObjects: data["timestampedObjects"] !== undefined ? data["timestampedObjects"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_TimestampedObject(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_Track(data: any): GoogleCloudVideointelligenceV1_Track {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
    timestampedObjects: data["timestampedObjects"] !== undefined ? data["timestampedObjects"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_TimestampedObject(item))) : undefined,
  };
}

/**
 * Annotation progress for a single video.
 */
export interface GoogleCloudVideointelligenceV1_VideoAnnotationProgress {
  /**
   * Specifies which feature is being tracked if the request contains more than
   * one feature.
   */
  feature?:  | "FEATURE_UNSPECIFIED" | "LABEL_DETECTION" | "SHOT_CHANGE_DETECTION" | "EXPLICIT_CONTENT_DETECTION" | "FACE_DETECTION" | "SPEECH_TRANSCRIPTION" | "TEXT_DETECTION" | "OBJECT_TRACKING" | "LOGO_RECOGNITION" | "PERSON_DETECTION";
  /**
   * Video file location in [Cloud Storage](https://cloud.google.com/storage/).
   */
  inputUri?: string;
  /**
   * Approximate percentage processed thus far. Guaranteed to be 100 when fully
   * processed.
   */
  progressPercent?: number;
  /**
   * Specifies which segment is being tracked if the request contains more than
   * one segment.
   */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
  /**
   * Time when the request was received.
   */
  startTime?: Date;
  /**
   * Time of the most recent update.
   */
  updateTime?: Date;
}

function serializeGoogleCloudVideointelligenceV1_VideoAnnotationProgress(data: any): GoogleCloudVideointelligenceV1_VideoAnnotationProgress {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_VideoAnnotationProgress(data: any): GoogleCloudVideointelligenceV1_VideoAnnotationProgress {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Annotation results for a single video.
 */
export interface GoogleCloudVideointelligenceV1_VideoAnnotationResults {
  /**
   * If set, indicates an error. Note that for a single `AnnotateVideoRequest`
   * some videos may succeed and some may fail.
   */
  error?: GoogleRpc_Status;
  /**
   * Explicit content annotation.
   */
  explicitAnnotation?: GoogleCloudVideointelligenceV1_ExplicitContentAnnotation;
  /**
   * Deprecated. Please use `face_detection_annotations` instead.
   */
  faceAnnotations?: GoogleCloudVideointelligenceV1_FaceAnnotation[];
  /**
   * Face detection annotations.
   */
  faceDetectionAnnotations?: GoogleCloudVideointelligenceV1_FaceDetectionAnnotation[];
  /**
   * Label annotations on frame level. There is exactly one element for each
   * unique label.
   */
  frameLabelAnnotations?: GoogleCloudVideointelligenceV1_LabelAnnotation[];
  /**
   * Video file location in [Cloud Storage](https://cloud.google.com/storage/).
   */
  inputUri?: string;
  /**
   * Annotations for list of logos detected, tracked and recognized in video.
   */
  logoRecognitionAnnotations?: GoogleCloudVideointelligenceV1_LogoRecognitionAnnotation[];
  /**
   * Annotations for list of objects detected and tracked in video.
   */
  objectAnnotations?: GoogleCloudVideointelligenceV1_ObjectTrackingAnnotation[];
  /**
   * Person detection annotations.
   */
  personDetectionAnnotations?: GoogleCloudVideointelligenceV1_PersonDetectionAnnotation[];
  /**
   * Video segment on which the annotation is run.
   */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
  /**
   * Topical label annotations on video level or user-specified segment level.
   * There is exactly one element for each unique label.
   */
  segmentLabelAnnotations?: GoogleCloudVideointelligenceV1_LabelAnnotation[];
  /**
   * Presence label annotations on video level or user-specified segment level.
   * There is exactly one element for each unique label. Compared to the
   * existing topical `segment_label_annotations`, this field presents more
   * fine-grained, segment-level labels detected in video content and is made
   * available only when the client sets `LabelDetectionConfig.model` to
   * "builtin/latest" in the request.
   */
  segmentPresenceLabelAnnotations?: GoogleCloudVideointelligenceV1_LabelAnnotation[];
  /**
   * Shot annotations. Each shot is represented as a video segment.
   */
  shotAnnotations?: GoogleCloudVideointelligenceV1_VideoSegment[];
  /**
   * Topical label annotations on shot level. There is exactly one element for
   * each unique label.
   */
  shotLabelAnnotations?: GoogleCloudVideointelligenceV1_LabelAnnotation[];
  /**
   * Presence label annotations on shot level. There is exactly one element for
   * each unique label. Compared to the existing topical
   * `shot_label_annotations`, this field presents more fine-grained, shot-level
   * labels detected in video content and is made available only when the client
   * sets `LabelDetectionConfig.model` to "builtin/latest" in the request.
   */
  shotPresenceLabelAnnotations?: GoogleCloudVideointelligenceV1_LabelAnnotation[];
  /**
   * Speech transcription.
   */
  speechTranscriptions?: GoogleCloudVideointelligenceV1_SpeechTranscription[];
  /**
   * OCR text detection and tracking. Annotations for list of detected text
   * snippets. Each will have list of frame information associated with it.
   */
  textAnnotations?: GoogleCloudVideointelligenceV1_TextAnnotation[];
}

function serializeGoogleCloudVideointelligenceV1_VideoAnnotationResults(data: any): GoogleCloudVideointelligenceV1_VideoAnnotationResults {
  return {
    ...data,
    explicitAnnotation: data["explicitAnnotation"] !== undefined ? serializeGoogleCloudVideointelligenceV1_ExplicitContentAnnotation(data["explicitAnnotation"]) : undefined,
    faceAnnotations: data["faceAnnotations"] !== undefined ? data["faceAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_FaceAnnotation(item))) : undefined,
    faceDetectionAnnotations: data["faceDetectionAnnotations"] !== undefined ? data["faceDetectionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_FaceDetectionAnnotation(item))) : undefined,
    frameLabelAnnotations: data["frameLabelAnnotations"] !== undefined ? data["frameLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_LabelAnnotation(item))) : undefined,
    logoRecognitionAnnotations: data["logoRecognitionAnnotations"] !== undefined ? data["logoRecognitionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_LogoRecognitionAnnotation(item))) : undefined,
    objectAnnotations: data["objectAnnotations"] !== undefined ? data["objectAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_ObjectTrackingAnnotation(item))) : undefined,
    personDetectionAnnotations: data["personDetectionAnnotations"] !== undefined ? data["personDetectionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_PersonDetectionAnnotation(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
    segmentLabelAnnotations: data["segmentLabelAnnotations"] !== undefined ? data["segmentLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_LabelAnnotation(item))) : undefined,
    segmentPresenceLabelAnnotations: data["segmentPresenceLabelAnnotations"] !== undefined ? data["segmentPresenceLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_LabelAnnotation(item))) : undefined,
    shotAnnotations: data["shotAnnotations"] !== undefined ? data["shotAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_VideoSegment(item))) : undefined,
    shotLabelAnnotations: data["shotLabelAnnotations"] !== undefined ? data["shotLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_LabelAnnotation(item))) : undefined,
    shotPresenceLabelAnnotations: data["shotPresenceLabelAnnotations"] !== undefined ? data["shotPresenceLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_LabelAnnotation(item))) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_TextAnnotation(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_VideoAnnotationResults(data: any): GoogleCloudVideointelligenceV1_VideoAnnotationResults {
  return {
    ...data,
    explicitAnnotation: data["explicitAnnotation"] !== undefined ? deserializeGoogleCloudVideointelligenceV1_ExplicitContentAnnotation(data["explicitAnnotation"]) : undefined,
    faceAnnotations: data["faceAnnotations"] !== undefined ? data["faceAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_FaceAnnotation(item))) : undefined,
    faceDetectionAnnotations: data["faceDetectionAnnotations"] !== undefined ? data["faceDetectionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_FaceDetectionAnnotation(item))) : undefined,
    frameLabelAnnotations: data["frameLabelAnnotations"] !== undefined ? data["frameLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_LabelAnnotation(item))) : undefined,
    logoRecognitionAnnotations: data["logoRecognitionAnnotations"] !== undefined ? data["logoRecognitionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_LogoRecognitionAnnotation(item))) : undefined,
    objectAnnotations: data["objectAnnotations"] !== undefined ? data["objectAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_ObjectTrackingAnnotation(item))) : undefined,
    personDetectionAnnotations: data["personDetectionAnnotations"] !== undefined ? data["personDetectionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_PersonDetectionAnnotation(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1_VideoSegment(data["segment"]) : undefined,
    segmentLabelAnnotations: data["segmentLabelAnnotations"] !== undefined ? data["segmentLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_LabelAnnotation(item))) : undefined,
    segmentPresenceLabelAnnotations: data["segmentPresenceLabelAnnotations"] !== undefined ? data["segmentPresenceLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_LabelAnnotation(item))) : undefined,
    shotAnnotations: data["shotAnnotations"] !== undefined ? data["shotAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_VideoSegment(item))) : undefined,
    shotLabelAnnotations: data["shotLabelAnnotations"] !== undefined ? data["shotLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_LabelAnnotation(item))) : undefined,
    shotPresenceLabelAnnotations: data["shotPresenceLabelAnnotations"] !== undefined ? data["shotPresenceLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_LabelAnnotation(item))) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_TextAnnotation(item))) : undefined,
  };
}

/**
 * Video context and/or feature-specific parameters.
 */
export interface GoogleCloudVideointelligenceV1_VideoContext {
  /**
   * Config for EXPLICIT_CONTENT_DETECTION.
   */
  explicitContentDetectionConfig?: GoogleCloudVideointelligenceV1_ExplicitContentDetectionConfig;
  /**
   * Config for FACE_DETECTION.
   */
  faceDetectionConfig?: GoogleCloudVideointelligenceV1_FaceDetectionConfig;
  /**
   * Config for LABEL_DETECTION.
   */
  labelDetectionConfig?: GoogleCloudVideointelligenceV1_LabelDetectionConfig;
  /**
   * Config for OBJECT_TRACKING.
   */
  objectTrackingConfig?: GoogleCloudVideointelligenceV1_ObjectTrackingConfig;
  /**
   * Config for PERSON_DETECTION.
   */
  personDetectionConfig?: GoogleCloudVideointelligenceV1_PersonDetectionConfig;
  /**
   * Video segments to annotate. The segments may overlap and are not required
   * to be contiguous or span the whole video. If unspecified, each video is
   * treated as a single segment.
   */
  segments?: GoogleCloudVideointelligenceV1_VideoSegment[];
  /**
   * Config for SHOT_CHANGE_DETECTION.
   */
  shotChangeDetectionConfig?: GoogleCloudVideointelligenceV1_ShotChangeDetectionConfig;
  /**
   * Config for SPEECH_TRANSCRIPTION.
   */
  speechTranscriptionConfig?: GoogleCloudVideointelligenceV1_SpeechTranscriptionConfig;
  /**
   * Config for TEXT_DETECTION.
   */
  textDetectionConfig?: GoogleCloudVideointelligenceV1_TextDetectionConfig;
}

function serializeGoogleCloudVideointelligenceV1_VideoContext(data: any): GoogleCloudVideointelligenceV1_VideoContext {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1_VideoSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_VideoContext(data: any): GoogleCloudVideointelligenceV1_VideoContext {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1_VideoSegment(item))) : undefined,
  };
}

/**
 * Video segment.
 */
export interface GoogleCloudVideointelligenceV1_VideoSegment {
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * end of the segment (inclusive).
   */
  endTimeOffset?: number /* Duration */;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * start of the segment (inclusive).
   */
  startTimeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1_VideoSegment(data: any): GoogleCloudVideointelligenceV1_VideoSegment {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_VideoSegment(data: any): GoogleCloudVideointelligenceV1_VideoSegment {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

/**
 * Word-specific information for recognized words. Word information is only
 * included in the response when certain request parameters are set, such as
 * `enable_word_time_offsets`.
 */
export interface GoogleCloudVideointelligenceV1_WordInfo {
  /**
   * Output only. The confidence estimate between 0.0 and 1.0. A higher number
   * indicates an estimated greater likelihood that the recognized words are
   * correct. This field is set only for the top alternative. This field is not
   * guaranteed to be accurate and users should not rely on it to be always
   * provided. The default of 0.0 is a sentinel value indicating `confidence`
   * was not set.
   */
  readonly confidence?: number;
  /**
   * Time offset relative to the beginning of the audio, and corresponding to
   * the end of the spoken word. This field is only set if
   * `enable_word_time_offsets=true` and only in the top hypothesis. This is an
   * experimental feature and the accuracy of the time offset can vary.
   */
  endTime?: number /* Duration */;
  /**
   * Output only. A distinct integer value is assigned for every speaker within
   * the audio. This field specifies which one of those speakers was detected to
   * have spoken this word. Value ranges from 1 up to diarization_speaker_count,
   * and is only set if speaker diarization is enabled.
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

function serializeGoogleCloudVideointelligenceV1_WordInfo(data: any): GoogleCloudVideointelligenceV1_WordInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"] : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1_WordInfo(data: any): GoogleCloudVideointelligenceV1_WordInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"] : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
  };
}

/**
 * Video annotation progress. Included in the `metadata` field of the
 * `Operation` returned by the `GetOperation` call of the
 * `google::longrunning::Operations` service.
 */
export interface GoogleCloudVideointelligenceV1beta2_AnnotateVideoProgress {
  /**
   * Progress metadata for all videos specified in `AnnotateVideoRequest`.
   */
  annotationProgress?: GoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress[];
}

function serializeGoogleCloudVideointelligenceV1beta2_AnnotateVideoProgress(data: any): GoogleCloudVideointelligenceV1beta2_AnnotateVideoProgress {
  return {
    ...data,
    annotationProgress: data["annotationProgress"] !== undefined ? data["annotationProgress"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_AnnotateVideoProgress(data: any): GoogleCloudVideointelligenceV1beta2_AnnotateVideoProgress {
  return {
    ...data,
    annotationProgress: data["annotationProgress"] !== undefined ? data["annotationProgress"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress(item))) : undefined,
  };
}

/**
 * Video annotation response. Included in the `response` field of the
 * `Operation` returned by the `GetOperation` call of the
 * `google::longrunning::Operations` service.
 */
export interface GoogleCloudVideointelligenceV1beta2_AnnotateVideoResponse {
  /**
   * Annotation results for all videos specified in `AnnotateVideoRequest`.
   */
  annotationResults?: GoogleCloudVideointelligenceV1beta2_VideoAnnotationResults[];
}

function serializeGoogleCloudVideointelligenceV1beta2_AnnotateVideoResponse(data: any): GoogleCloudVideointelligenceV1beta2_AnnotateVideoResponse {
  return {
    ...data,
    annotationResults: data["annotationResults"] !== undefined ? data["annotationResults"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_VideoAnnotationResults(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_AnnotateVideoResponse(data: any): GoogleCloudVideointelligenceV1beta2_AnnotateVideoResponse {
  return {
    ...data,
    annotationResults: data["annotationResults"] !== undefined ? data["annotationResults"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_VideoAnnotationResults(item))) : undefined,
  };
}

/**
 * A generic detected attribute represented by name in string format.
 */
export interface GoogleCloudVideointelligenceV1beta2_DetectedAttribute {
  /**
   * Detected attribute confidence. Range [0, 1].
   */
  confidence?: number;
  /**
   * The name of the attribute, for example, glasses, dark_glasses, mouth_open.
   * A full list of supported type names will be provided in the document.
   */
  name?: string;
  /**
   * Text value of the detection result. For example, the value for "HairColor"
   * can be "black", "blonde", etc.
   */
  value?: string;
}

/**
 * A generic detected landmark represented by name in string format and a 2D
 * location.
 */
export interface GoogleCloudVideointelligenceV1beta2_DetectedLandmark {
  /**
   * The confidence score of the detected landmark. Range [0, 1].
   */
  confidence?: number;
  /**
   * The name of this landmark, for example, left_hand, right_shoulder.
   */
  name?: string;
  /**
   * The 2D point of the detected landmark using the normalized image
   * coordindate system. The normalized coordinates have the range from 0 to 1.
   */
  point?: GoogleCloudVideointelligenceV1beta2_NormalizedVertex;
}

/**
 * Detected entity from video analysis.
 */
export interface GoogleCloudVideointelligenceV1beta2_Entity {
  /**
   * Textual description, e.g., `Fixed-gear bicycle`.
   */
  description?: string;
  /**
   * Opaque entity ID. Some IDs may be available in [Google Knowledge Graph
   * Search API](https://developers.google.com/knowledge-graph/).
   */
  entityId?: string;
  /**
   * Language code for `description` in BCP-47 format.
   */
  languageCode?: string;
}

/**
 * Explicit content annotation (based on per-frame visual signals only). If no
 * explicit content has been detected in a frame, no annotations are present for
 * that frame.
 */
export interface GoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation {
  /**
   * All video frames where explicit content was detected.
   */
  frames?: GoogleCloudVideointelligenceV1beta2_ExplicitContentFrame[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_ExplicitContentFrame(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_ExplicitContentFrame(item))) : undefined,
  };
}

/**
 * Video frame level annotation results for explicit content.
 */
export interface GoogleCloudVideointelligenceV1beta2_ExplicitContentFrame {
  /**
   * Likelihood of the pornography content..
   */
  pornographyLikelihood?:  | "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1beta2_ExplicitContentFrame(data: any): GoogleCloudVideointelligenceV1beta2_ExplicitContentFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_ExplicitContentFrame(data: any): GoogleCloudVideointelligenceV1beta2_ExplicitContentFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Deprecated. No effect.
 */
export interface GoogleCloudVideointelligenceV1beta2_FaceAnnotation {
  /**
   * All video frames where a face was detected.
   */
  frames?: GoogleCloudVideointelligenceV1beta2_FaceFrame[];
  /**
   * All video segments where a face was detected.
   */
  segments?: GoogleCloudVideointelligenceV1beta2_FaceSegment[];
  /**
   * Thumbnail of a representative face view (in JPEG format).
   */
  thumbnail?: Uint8Array;
}

function serializeGoogleCloudVideointelligenceV1beta2_FaceAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_FaceAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_FaceFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_FaceSegment(item))) : undefined,
    thumbnail: data["thumbnail"] !== undefined ? encodeBase64(data["thumbnail"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_FaceAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_FaceAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_FaceFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_FaceSegment(item))) : undefined,
    thumbnail: data["thumbnail"] !== undefined ? decodeBase64(data["thumbnail"] as string) : undefined,
  };
}

/**
 * Face detection annotation.
 */
export interface GoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation {
  /**
   * The thumbnail of a person's face.
   */
  thumbnail?: Uint8Array;
  /**
   * The face tracks with attributes.
   */
  tracks?: GoogleCloudVideointelligenceV1beta2_Track[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation {
  return {
    ...data,
    thumbnail: data["thumbnail"] !== undefined ? encodeBase64(data["thumbnail"]) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation {
  return {
    ...data,
    thumbnail: data["thumbnail"] !== undefined ? decodeBase64(data["thumbnail"] as string) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_Track(item))) : undefined,
  };
}

/**
 * Deprecated. No effect.
 */
export interface GoogleCloudVideointelligenceV1beta2_FaceFrame {
  /**
   * Normalized Bounding boxes in a frame. There can be more than one boxes if
   * the same face is detected in multiple locations within the current frame.
   */
  normalizedBoundingBoxes?: GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox[];
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1beta2_FaceFrame(data: any): GoogleCloudVideointelligenceV1beta2_FaceFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_FaceFrame(data: any): GoogleCloudVideointelligenceV1beta2_FaceFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for face detection.
 */
export interface GoogleCloudVideointelligenceV1beta2_FaceSegment {
  /**
   * Video segment where a face was detected.
   */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1beta2_FaceSegment(data: any): GoogleCloudVideointelligenceV1beta2_FaceSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_FaceSegment(data: any): GoogleCloudVideointelligenceV1beta2_FaceSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * Label annotation.
 */
export interface GoogleCloudVideointelligenceV1beta2_LabelAnnotation {
  /**
   * Common categories for the detected entity. For example, when the label is
   * `Terrier`, the category is likely `dog`. And in some cases there might be
   * more than one categories e.g., `Terrier` could also be a `pet`.
   */
  categoryEntities?: GoogleCloudVideointelligenceV1beta2_Entity[];
  /**
   * Detected entity.
   */
  entity?: GoogleCloudVideointelligenceV1beta2_Entity;
  /**
   * All video frames where a label was detected.
   */
  frames?: GoogleCloudVideointelligenceV1beta2_LabelFrame[];
  /**
   * All video segments where a label was detected.
   */
  segments?: GoogleCloudVideointelligenceV1beta2_LabelSegment[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1beta2_LabelAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_LabelAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_LabelFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_LabelSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_LabelAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_LabelAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_LabelFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_LabelSegment(item))) : undefined,
  };
}

/**
 * Video frame level annotation results for label detection.
 */
export interface GoogleCloudVideointelligenceV1beta2_LabelFrame {
  /**
   * Confidence that the label is accurate. Range: [0, 1].
   */
  confidence?: number;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1beta2_LabelFrame(data: any): GoogleCloudVideointelligenceV1beta2_LabelFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_LabelFrame(data: any): GoogleCloudVideointelligenceV1beta2_LabelFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for label detection.
 */
export interface GoogleCloudVideointelligenceV1beta2_LabelSegment {
  /**
   * Confidence that the label is accurate. Range: [0, 1].
   */
  confidence?: number;
  /**
   * Video segment where a label was detected.
   */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1beta2_LabelSegment(data: any): GoogleCloudVideointelligenceV1beta2_LabelSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_LabelSegment(data: any): GoogleCloudVideointelligenceV1beta2_LabelSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * Annotation corresponding to one detected, tracked and recognized logo class.
 */
export interface GoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation {
  /**
   * Entity category information to specify the logo class that all the logo
   * tracks within this LogoRecognitionAnnotation are recognized as.
   */
  entity?: GoogleCloudVideointelligenceV1beta2_Entity;
  /**
   * All video segments where the recognized logo appears. There might be
   * multiple instances of the same logo class appearing in one VideoSegment.
   */
  segments?: GoogleCloudVideointelligenceV1beta2_VideoSegment[];
  /**
   * All logo tracks where the recognized logo appears. Each track corresponds
   * to one logo instance appearing in consecutive frames.
   */
  tracks?: GoogleCloudVideointelligenceV1beta2_Track[];
}

function serializeGoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_VideoSegment(item))) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_VideoSegment(item))) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_Track(item))) : undefined,
  };
}

/**
 * Normalized bounding box. The normalized vertex coordinates are relative to
 * the original image. Range: [0, 1].
 */
export interface GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox {
  /**
   * Bottom Y coordinate.
   */
  bottom?: number;
  /**
   * Left X coordinate.
   */
  left?: number;
  /**
   * Right X coordinate.
   */
  right?: number;
  /**
   * Top Y coordinate.
   */
  top?: number;
}

/**
 * Normalized bounding polygon for text (that might not be aligned with axis).
 * Contains list of the corner points in clockwise order starting from top-left
 * corner. For example, for a rectangular bounding box: When the text is
 * horizontal it might look like: 0----1 | | 3----2 When it's clockwise rotated
 * 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the
 * vertex order will still be (0, 1, 2, 3). Note that values can be less than 0,
 * or greater than 1 due to trignometric calculations for location of the box.
 */
export interface GoogleCloudVideointelligenceV1beta2_NormalizedBoundingPoly {
  /**
   * Normalized vertices of the bounding polygon.
   */
  vertices?: GoogleCloudVideointelligenceV1beta2_NormalizedVertex[];
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface GoogleCloudVideointelligenceV1beta2_NormalizedVertex {
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
 * Annotations corresponding to one tracked object.
 */
export interface GoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation {
  /**
   * Object category's labeling confidence of this track.
   */
  confidence?: number;
  /**
   * Entity to specify the object category that this track is labeled as.
   */
  entity?: GoogleCloudVideointelligenceV1beta2_Entity;
  /**
   * Information corresponding to all frames where this object track appears.
   * Non-streaming batch mode: it may be one or multiple ObjectTrackingFrame
   * messages in frames. Streaming mode: it can only be one ObjectTrackingFrame
   * message in frames.
   */
  frames?: GoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame[];
  /**
   * Non-streaming batch mode ONLY. Each object track corresponds to one video
   * segment where it appears.
   */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
  /**
   * Streaming mode ONLY. In streaming mode, we do not know the end time of a
   * tracked object before it is completed. Hence, there is no VideoSegment info
   * returned. Instead, we provide a unique identifiable integer track_id so
   * that the customers can correlate the results of the ongoing
   * ObjectTrackAnnotation of the same track_id over time.
   */
  trackId?: bigint;
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
    trackId: data["trackId"] !== undefined ? String(data["trackId"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
    trackId: data["trackId"] !== undefined ? BigInt(data["trackId"]) : undefined,
  };
}

/**
 * Video frame level annotations for object detection and tracking. This field
 * stores per frame location, time offset, and confidence.
 */
export interface GoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame {
  /**
   * The normalized bounding box location of this object track for the frame.
   */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox;
  /**
   * The timestamp of the frame in microseconds.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame(data: any): GoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame(data: any): GoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Person detection annotation per video.
 */
export interface GoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation {
  /**
   * The detected tracks of a person.
   */
  tracks?: GoogleCloudVideointelligenceV1beta2_Track[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation {
  return {
    ...data,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation {
  return {
    ...data,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_Track(item))) : undefined,
  };
}

/**
 * Alternative hypotheses (a.k.a. n-best list).
 */
export interface GoogleCloudVideointelligenceV1beta2_SpeechRecognitionAlternative {
  /**
   * Output only. The confidence estimate between 0.0 and 1.0. A higher number
   * indicates an estimated greater likelihood that the recognized words are
   * correct. This field is set only for the top alternative. This field is not
   * guaranteed to be accurate and users should not rely on it to be always
   * provided. The default of 0.0 is a sentinel value indicating `confidence`
   * was not set.
   */
  readonly confidence?: number;
  /**
   * Transcript text representing the words that the user spoke.
   */
  transcript?: string;
  /**
   * Output only. A list of word-specific information for each recognized word.
   * Note: When `enable_speaker_diarization` is set to true, you will see all
   * the words from the beginning of the audio.
   */
  readonly words?: GoogleCloudVideointelligenceV1beta2_WordInfo[];
}

/**
 * A speech recognition result corresponding to a portion of the audio.
 */
export interface GoogleCloudVideointelligenceV1beta2_SpeechTranscription {
  /**
   * May contain one or more recognition hypotheses (up to the maximum
   * specified in `max_alternatives`). These alternatives are ordered in terms
   * of accuracy, with the top (first) alternative being the most probable, as
   * ranked by the recognizer.
   */
  alternatives?: GoogleCloudVideointelligenceV1beta2_SpeechRecognitionAlternative[];
  /**
   * Output only. The [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt)
   * language tag of the language in this result. This language code was
   * detected to have the most likelihood of being spoken in the audio.
   */
  readonly languageCode?: string;
}

/**
 * Annotations related to one detected OCR text snippet. This will contain the
 * corresponding text, confidence value, and frame level information for each
 * detection.
 */
export interface GoogleCloudVideointelligenceV1beta2_TextAnnotation {
  /**
   * All video segments where OCR detected text appears.
   */
  segments?: GoogleCloudVideointelligenceV1beta2_TextSegment[];
  /**
   * The detected text.
   */
  text?: string;
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1beta2_TextAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_TextAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_TextSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_TextAnnotation(data: any): GoogleCloudVideointelligenceV1beta2_TextAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_TextSegment(item))) : undefined,
  };
}

/**
 * Video frame level annotation results for text annotation (OCR). Contains
 * information regarding timestamp and bounding box locations for the frames
 * containing detected OCR text snippets.
 */
export interface GoogleCloudVideointelligenceV1beta2_TextFrame {
  /**
   * Bounding polygon of the detected text for this frame.
   */
  rotatedBoundingBox?: GoogleCloudVideointelligenceV1beta2_NormalizedBoundingPoly;
  /**
   * Timestamp of this frame.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1beta2_TextFrame(data: any): GoogleCloudVideointelligenceV1beta2_TextFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_TextFrame(data: any): GoogleCloudVideointelligenceV1beta2_TextFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for text detection.
 */
export interface GoogleCloudVideointelligenceV1beta2_TextSegment {
  /**
   * Confidence for the track of detected text. It is calculated as the highest
   * over all frames where OCR detected text appears.
   */
  confidence?: number;
  /**
   * Information related to the frames where OCR detected text appears.
   */
  frames?: GoogleCloudVideointelligenceV1beta2_TextFrame[];
  /**
   * Video segment where a text snippet was detected.
   */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1beta2_TextSegment(data: any): GoogleCloudVideointelligenceV1beta2_TextSegment {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_TextFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_TextSegment(data: any): GoogleCloudVideointelligenceV1beta2_TextSegment {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_TextFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * For tracking related features. An object at time_offset with attributes, and
 * located with normalized_bounding_box.
 */
export interface GoogleCloudVideointelligenceV1beta2_TimestampedObject {
  /**
   * Optional. The attributes of the object in the bounding box.
   */
  attributes?: GoogleCloudVideointelligenceV1beta2_DetectedAttribute[];
  /**
   * Optional. The detected landmarks.
   */
  landmarks?: GoogleCloudVideointelligenceV1beta2_DetectedLandmark[];
  /**
   * Normalized Bounding box in a frame, where the object is located.
   */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this object.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1beta2_TimestampedObject(data: any): GoogleCloudVideointelligenceV1beta2_TimestampedObject {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_TimestampedObject(data: any): GoogleCloudVideointelligenceV1beta2_TimestampedObject {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * A track of an object instance.
 */
export interface GoogleCloudVideointelligenceV1beta2_Track {
  /**
   * Optional. Attributes in the track level.
   */
  attributes?: GoogleCloudVideointelligenceV1beta2_DetectedAttribute[];
  /**
   * Optional. The confidence score of the tracked object.
   */
  confidence?: number;
  /**
   * Video segment of a track.
   */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
  /**
   * The object with timestamp and attributes per frame in the track.
   */
  timestampedObjects?: GoogleCloudVideointelligenceV1beta2_TimestampedObject[];
}

function serializeGoogleCloudVideointelligenceV1beta2_Track(data: any): GoogleCloudVideointelligenceV1beta2_Track {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
    timestampedObjects: data["timestampedObjects"] !== undefined ? data["timestampedObjects"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_TimestampedObject(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_Track(data: any): GoogleCloudVideointelligenceV1beta2_Track {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
    timestampedObjects: data["timestampedObjects"] !== undefined ? data["timestampedObjects"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_TimestampedObject(item))) : undefined,
  };
}

/**
 * Annotation progress for a single video.
 */
export interface GoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress {
  /**
   * Specifies which feature is being tracked if the request contains more than
   * one feature.
   */
  feature?:  | "FEATURE_UNSPECIFIED" | "LABEL_DETECTION" | "SHOT_CHANGE_DETECTION" | "EXPLICIT_CONTENT_DETECTION" | "FACE_DETECTION" | "SPEECH_TRANSCRIPTION" | "TEXT_DETECTION" | "OBJECT_TRACKING" | "LOGO_RECOGNITION" | "PERSON_DETECTION";
  /**
   * Video file location in [Cloud Storage](https://cloud.google.com/storage/).
   */
  inputUri?: string;
  /**
   * Approximate percentage processed thus far. Guaranteed to be 100 when fully
   * processed.
   */
  progressPercent?: number;
  /**
   * Specifies which segment is being tracked if the request contains more than
   * one segment.
   */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
  /**
   * Time when the request was received.
   */
  startTime?: Date;
  /**
   * Time of the most recent update.
   */
  updateTime?: Date;
}

function serializeGoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress(data: any): GoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress(data: any): GoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Annotation results for a single video.
 */
export interface GoogleCloudVideointelligenceV1beta2_VideoAnnotationResults {
  /**
   * If set, indicates an error. Note that for a single `AnnotateVideoRequest`
   * some videos may succeed and some may fail.
   */
  error?: GoogleRpc_Status;
  /**
   * Explicit content annotation.
   */
  explicitAnnotation?: GoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation;
  /**
   * Deprecated. Please use `face_detection_annotations` instead.
   */
  faceAnnotations?: GoogleCloudVideointelligenceV1beta2_FaceAnnotation[];
  /**
   * Face detection annotations.
   */
  faceDetectionAnnotations?: GoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation[];
  /**
   * Label annotations on frame level. There is exactly one element for each
   * unique label.
   */
  frameLabelAnnotations?: GoogleCloudVideointelligenceV1beta2_LabelAnnotation[];
  /**
   * Video file location in [Cloud Storage](https://cloud.google.com/storage/).
   */
  inputUri?: string;
  /**
   * Annotations for list of logos detected, tracked and recognized in video.
   */
  logoRecognitionAnnotations?: GoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation[];
  /**
   * Annotations for list of objects detected and tracked in video.
   */
  objectAnnotations?: GoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation[];
  /**
   * Person detection annotations.
   */
  personDetectionAnnotations?: GoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation[];
  /**
   * Video segment on which the annotation is run.
   */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
  /**
   * Topical label annotations on video level or user-specified segment level.
   * There is exactly one element for each unique label.
   */
  segmentLabelAnnotations?: GoogleCloudVideointelligenceV1beta2_LabelAnnotation[];
  /**
   * Presence label annotations on video level or user-specified segment level.
   * There is exactly one element for each unique label. Compared to the
   * existing topical `segment_label_annotations`, this field presents more
   * fine-grained, segment-level labels detected in video content and is made
   * available only when the client sets `LabelDetectionConfig.model` to
   * "builtin/latest" in the request.
   */
  segmentPresenceLabelAnnotations?: GoogleCloudVideointelligenceV1beta2_LabelAnnotation[];
  /**
   * Shot annotations. Each shot is represented as a video segment.
   */
  shotAnnotations?: GoogleCloudVideointelligenceV1beta2_VideoSegment[];
  /**
   * Topical label annotations on shot level. There is exactly one element for
   * each unique label.
   */
  shotLabelAnnotations?: GoogleCloudVideointelligenceV1beta2_LabelAnnotation[];
  /**
   * Presence label annotations on shot level. There is exactly one element for
   * each unique label. Compared to the existing topical
   * `shot_label_annotations`, this field presents more fine-grained, shot-level
   * labels detected in video content and is made available only when the client
   * sets `LabelDetectionConfig.model` to "builtin/latest" in the request.
   */
  shotPresenceLabelAnnotations?: GoogleCloudVideointelligenceV1beta2_LabelAnnotation[];
  /**
   * Speech transcription.
   */
  speechTranscriptions?: GoogleCloudVideointelligenceV1beta2_SpeechTranscription[];
  /**
   * OCR text detection and tracking. Annotations for list of detected text
   * snippets. Each will have list of frame information associated with it.
   */
  textAnnotations?: GoogleCloudVideointelligenceV1beta2_TextAnnotation[];
}

function serializeGoogleCloudVideointelligenceV1beta2_VideoAnnotationResults(data: any): GoogleCloudVideointelligenceV1beta2_VideoAnnotationResults {
  return {
    ...data,
    explicitAnnotation: data["explicitAnnotation"] !== undefined ? serializeGoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation(data["explicitAnnotation"]) : undefined,
    faceAnnotations: data["faceAnnotations"] !== undefined ? data["faceAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_FaceAnnotation(item))) : undefined,
    faceDetectionAnnotations: data["faceDetectionAnnotations"] !== undefined ? data["faceDetectionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation(item))) : undefined,
    frameLabelAnnotations: data["frameLabelAnnotations"] !== undefined ? data["frameLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_LabelAnnotation(item))) : undefined,
    logoRecognitionAnnotations: data["logoRecognitionAnnotations"] !== undefined ? data["logoRecognitionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation(item))) : undefined,
    objectAnnotations: data["objectAnnotations"] !== undefined ? data["objectAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation(item))) : undefined,
    personDetectionAnnotations: data["personDetectionAnnotations"] !== undefined ? data["personDetectionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
    segmentLabelAnnotations: data["segmentLabelAnnotations"] !== undefined ? data["segmentLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_LabelAnnotation(item))) : undefined,
    segmentPresenceLabelAnnotations: data["segmentPresenceLabelAnnotations"] !== undefined ? data["segmentPresenceLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_LabelAnnotation(item))) : undefined,
    shotAnnotations: data["shotAnnotations"] !== undefined ? data["shotAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_VideoSegment(item))) : undefined,
    shotLabelAnnotations: data["shotLabelAnnotations"] !== undefined ? data["shotLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_LabelAnnotation(item))) : undefined,
    shotPresenceLabelAnnotations: data["shotPresenceLabelAnnotations"] !== undefined ? data["shotPresenceLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_LabelAnnotation(item))) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1beta2_TextAnnotation(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_VideoAnnotationResults(data: any): GoogleCloudVideointelligenceV1beta2_VideoAnnotationResults {
  return {
    ...data,
    explicitAnnotation: data["explicitAnnotation"] !== undefined ? deserializeGoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation(data["explicitAnnotation"]) : undefined,
    faceAnnotations: data["faceAnnotations"] !== undefined ? data["faceAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_FaceAnnotation(item))) : undefined,
    faceDetectionAnnotations: data["faceDetectionAnnotations"] !== undefined ? data["faceDetectionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation(item))) : undefined,
    frameLabelAnnotations: data["frameLabelAnnotations"] !== undefined ? data["frameLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_LabelAnnotation(item))) : undefined,
    logoRecognitionAnnotations: data["logoRecognitionAnnotations"] !== undefined ? data["logoRecognitionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation(item))) : undefined,
    objectAnnotations: data["objectAnnotations"] !== undefined ? data["objectAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation(item))) : undefined,
    personDetectionAnnotations: data["personDetectionAnnotations"] !== undefined ? data["personDetectionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data["segment"]) : undefined,
    segmentLabelAnnotations: data["segmentLabelAnnotations"] !== undefined ? data["segmentLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_LabelAnnotation(item))) : undefined,
    segmentPresenceLabelAnnotations: data["segmentPresenceLabelAnnotations"] !== undefined ? data["segmentPresenceLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_LabelAnnotation(item))) : undefined,
    shotAnnotations: data["shotAnnotations"] !== undefined ? data["shotAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_VideoSegment(item))) : undefined,
    shotLabelAnnotations: data["shotLabelAnnotations"] !== undefined ? data["shotLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_LabelAnnotation(item))) : undefined,
    shotPresenceLabelAnnotations: data["shotPresenceLabelAnnotations"] !== undefined ? data["shotPresenceLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_LabelAnnotation(item))) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1beta2_TextAnnotation(item))) : undefined,
  };
}

/**
 * Video segment.
 */
export interface GoogleCloudVideointelligenceV1beta2_VideoSegment {
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * end of the segment (inclusive).
   */
  endTimeOffset?: number /* Duration */;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * start of the segment (inclusive).
   */
  startTimeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data: any): GoogleCloudVideointelligenceV1beta2_VideoSegment {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_VideoSegment(data: any): GoogleCloudVideointelligenceV1beta2_VideoSegment {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

/**
 * Word-specific information for recognized words. Word information is only
 * included in the response when certain request parameters are set, such as
 * `enable_word_time_offsets`.
 */
export interface GoogleCloudVideointelligenceV1beta2_WordInfo {
  /**
   * Output only. The confidence estimate between 0.0 and 1.0. A higher number
   * indicates an estimated greater likelihood that the recognized words are
   * correct. This field is set only for the top alternative. This field is not
   * guaranteed to be accurate and users should not rely on it to be always
   * provided. The default of 0.0 is a sentinel value indicating `confidence`
   * was not set.
   */
  readonly confidence?: number;
  /**
   * Time offset relative to the beginning of the audio, and corresponding to
   * the end of the spoken word. This field is only set if
   * `enable_word_time_offsets=true` and only in the top hypothesis. This is an
   * experimental feature and the accuracy of the time offset can vary.
   */
  endTime?: number /* Duration */;
  /**
   * Output only. A distinct integer value is assigned for every speaker within
   * the audio. This field specifies which one of those speakers was detected to
   * have spoken this word. Value ranges from 1 up to diarization_speaker_count,
   * and is only set if speaker diarization is enabled.
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

function serializeGoogleCloudVideointelligenceV1beta2_WordInfo(data: any): GoogleCloudVideointelligenceV1beta2_WordInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"] : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1beta2_WordInfo(data: any): GoogleCloudVideointelligenceV1beta2_WordInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"] : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
  };
}

/**
 * Video annotation progress. Included in the `metadata` field of the
 * `Operation` returned by the `GetOperation` call of the
 * `google::longrunning::Operations` service.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoProgress {
  /**
   * Progress metadata for all videos specified in `AnnotateVideoRequest`.
   */
  annotationProgress?: GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress[];
}

function serializeGoogleCloudVideointelligenceV1p1beta1_AnnotateVideoProgress(data: any): GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoProgress {
  return {
    ...data,
    annotationProgress: data["annotationProgress"] !== undefined ? data["annotationProgress"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_AnnotateVideoProgress(data: any): GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoProgress {
  return {
    ...data,
    annotationProgress: data["annotationProgress"] !== undefined ? data["annotationProgress"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress(item))) : undefined,
  };
}

/**
 * Video annotation response. Included in the `response` field of the
 * `Operation` returned by the `GetOperation` call of the
 * `google::longrunning::Operations` service.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoResponse {
  /**
   * Annotation results for all videos specified in `AnnotateVideoRequest`.
   */
  annotationResults?: GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults[];
}

function serializeGoogleCloudVideointelligenceV1p1beta1_AnnotateVideoResponse(data: any): GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoResponse {
  return {
    ...data,
    annotationResults: data["annotationResults"] !== undefined ? data["annotationResults"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_AnnotateVideoResponse(data: any): GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoResponse {
  return {
    ...data,
    annotationResults: data["annotationResults"] !== undefined ? data["annotationResults"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults(item))) : undefined,
  };
}

/**
 * A generic detected attribute represented by name in string format.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_DetectedAttribute {
  /**
   * Detected attribute confidence. Range [0, 1].
   */
  confidence?: number;
  /**
   * The name of the attribute, for example, glasses, dark_glasses, mouth_open.
   * A full list of supported type names will be provided in the document.
   */
  name?: string;
  /**
   * Text value of the detection result. For example, the value for "HairColor"
   * can be "black", "blonde", etc.
   */
  value?: string;
}

/**
 * A generic detected landmark represented by name in string format and a 2D
 * location.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_DetectedLandmark {
  /**
   * The confidence score of the detected landmark. Range [0, 1].
   */
  confidence?: number;
  /**
   * The name of this landmark, for example, left_hand, right_shoulder.
   */
  name?: string;
  /**
   * The 2D point of the detected landmark using the normalized image
   * coordindate system. The normalized coordinates have the range from 0 to 1.
   */
  point?: GoogleCloudVideointelligenceV1p1beta1_NormalizedVertex;
}

/**
 * Detected entity from video analysis.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_Entity {
  /**
   * Textual description, e.g., `Fixed-gear bicycle`.
   */
  description?: string;
  /**
   * Opaque entity ID. Some IDs may be available in [Google Knowledge Graph
   * Search API](https://developers.google.com/knowledge-graph/).
   */
  entityId?: string;
  /**
   * Language code for `description` in BCP-47 format.
   */
  languageCode?: string;
}

/**
 * Explicit content annotation (based on per-frame visual signals only). If no
 * explicit content has been detected in a frame, no annotations are present for
 * that frame.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation {
  /**
   * All video frames where explicit content was detected.
   */
  frames?: GoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame(item))) : undefined,
  };
}

/**
 * Video frame level annotation results for explicit content.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame {
  /**
   * Likelihood of the pornography content..
   */
  pornographyLikelihood?:  | "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame(data: any): GoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame(data: any): GoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Deprecated. No effect.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_FaceAnnotation {
  /**
   * All video frames where a face was detected.
   */
  frames?: GoogleCloudVideointelligenceV1p1beta1_FaceFrame[];
  /**
   * All video segments where a face was detected.
   */
  segments?: GoogleCloudVideointelligenceV1p1beta1_FaceSegment[];
  /**
   * Thumbnail of a representative face view (in JPEG format).
   */
  thumbnail?: Uint8Array;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_FaceAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_FaceAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_FaceFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_FaceSegment(item))) : undefined,
    thumbnail: data["thumbnail"] !== undefined ? encodeBase64(data["thumbnail"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_FaceAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_FaceAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_FaceFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_FaceSegment(item))) : undefined,
    thumbnail: data["thumbnail"] !== undefined ? decodeBase64(data["thumbnail"] as string) : undefined,
  };
}

/**
 * Face detection annotation.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation {
  /**
   * The thumbnail of a person's face.
   */
  thumbnail?: Uint8Array;
  /**
   * The face tracks with attributes.
   */
  tracks?: GoogleCloudVideointelligenceV1p1beta1_Track[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation {
  return {
    ...data,
    thumbnail: data["thumbnail"] !== undefined ? encodeBase64(data["thumbnail"]) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation {
  return {
    ...data,
    thumbnail: data["thumbnail"] !== undefined ? decodeBase64(data["thumbnail"] as string) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_Track(item))) : undefined,
  };
}

/**
 * Deprecated. No effect.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_FaceFrame {
  /**
   * Normalized Bounding boxes in a frame. There can be more than one boxes if
   * the same face is detected in multiple locations within the current frame.
   */
  normalizedBoundingBoxes?: GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox[];
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_FaceFrame(data: any): GoogleCloudVideointelligenceV1p1beta1_FaceFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_FaceFrame(data: any): GoogleCloudVideointelligenceV1p1beta1_FaceFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for face detection.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_FaceSegment {
  /**
   * Video segment where a face was detected.
   */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_FaceSegment(data: any): GoogleCloudVideointelligenceV1p1beta1_FaceSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_FaceSegment(data: any): GoogleCloudVideointelligenceV1p1beta1_FaceSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * Label annotation.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation {
  /**
   * Common categories for the detected entity. For example, when the label is
   * `Terrier`, the category is likely `dog`. And in some cases there might be
   * more than one categories e.g., `Terrier` could also be a `pet`.
   */
  categoryEntities?: GoogleCloudVideointelligenceV1p1beta1_Entity[];
  /**
   * Detected entity.
   */
  entity?: GoogleCloudVideointelligenceV1p1beta1_Entity;
  /**
   * All video frames where a label was detected.
   */
  frames?: GoogleCloudVideointelligenceV1p1beta1_LabelFrame[];
  /**
   * All video segments where a label was detected.
   */
  segments?: GoogleCloudVideointelligenceV1p1beta1_LabelSegment[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_LabelAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_LabelFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_LabelSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_LabelAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_LabelFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_LabelSegment(item))) : undefined,
  };
}

/**
 * Video frame level annotation results for label detection.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_LabelFrame {
  /**
   * Confidence that the label is accurate. Range: [0, 1].
   */
  confidence?: number;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_LabelFrame(data: any): GoogleCloudVideointelligenceV1p1beta1_LabelFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_LabelFrame(data: any): GoogleCloudVideointelligenceV1p1beta1_LabelFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for label detection.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_LabelSegment {
  /**
   * Confidence that the label is accurate. Range: [0, 1].
   */
  confidence?: number;
  /**
   * Video segment where a label was detected.
   */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_LabelSegment(data: any): GoogleCloudVideointelligenceV1p1beta1_LabelSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_LabelSegment(data: any): GoogleCloudVideointelligenceV1p1beta1_LabelSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * Annotation corresponding to one detected, tracked and recognized logo class.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation {
  /**
   * Entity category information to specify the logo class that all the logo
   * tracks within this LogoRecognitionAnnotation are recognized as.
   */
  entity?: GoogleCloudVideointelligenceV1p1beta1_Entity;
  /**
   * All video segments where the recognized logo appears. There might be
   * multiple instances of the same logo class appearing in one VideoSegment.
   */
  segments?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment[];
  /**
   * All logo tracks where the recognized logo appears. Each track corresponds
   * to one logo instance appearing in consecutive frames.
   */
  tracks?: GoogleCloudVideointelligenceV1p1beta1_Track[];
}

function serializeGoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(item))) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(item))) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_Track(item))) : undefined,
  };
}

/**
 * Normalized bounding box. The normalized vertex coordinates are relative to
 * the original image. Range: [0, 1].
 */
export interface GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox {
  /**
   * Bottom Y coordinate.
   */
  bottom?: number;
  /**
   * Left X coordinate.
   */
  left?: number;
  /**
   * Right X coordinate.
   */
  right?: number;
  /**
   * Top Y coordinate.
   */
  top?: number;
}

/**
 * Normalized bounding polygon for text (that might not be aligned with axis).
 * Contains list of the corner points in clockwise order starting from top-left
 * corner. For example, for a rectangular bounding box: When the text is
 * horizontal it might look like: 0----1 | | 3----2 When it's clockwise rotated
 * 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the
 * vertex order will still be (0, 1, 2, 3). Note that values can be less than 0,
 * or greater than 1 due to trignometric calculations for location of the box.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingPoly {
  /**
   * Normalized vertices of the bounding polygon.
   */
  vertices?: GoogleCloudVideointelligenceV1p1beta1_NormalizedVertex[];
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_NormalizedVertex {
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
 * Annotations corresponding to one tracked object.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation {
  /**
   * Object category's labeling confidence of this track.
   */
  confidence?: number;
  /**
   * Entity to specify the object category that this track is labeled as.
   */
  entity?: GoogleCloudVideointelligenceV1p1beta1_Entity;
  /**
   * Information corresponding to all frames where this object track appears.
   * Non-streaming batch mode: it may be one or multiple ObjectTrackingFrame
   * messages in frames. Streaming mode: it can only be one ObjectTrackingFrame
   * message in frames.
   */
  frames?: GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame[];
  /**
   * Non-streaming batch mode ONLY. Each object track corresponds to one video
   * segment where it appears.
   */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
  /**
   * Streaming mode ONLY. In streaming mode, we do not know the end time of a
   * tracked object before it is completed. Hence, there is no VideoSegment info
   * returned. Instead, we provide a unique identifiable integer track_id so
   * that the customers can correlate the results of the ongoing
   * ObjectTrackAnnotation of the same track_id over time.
   */
  trackId?: bigint;
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
    trackId: data["trackId"] !== undefined ? String(data["trackId"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
    trackId: data["trackId"] !== undefined ? BigInt(data["trackId"]) : undefined,
  };
}

/**
 * Video frame level annotations for object detection and tracking. This field
 * stores per frame location, time offset, and confidence.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame {
  /**
   * The normalized bounding box location of this object track for the frame.
   */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox;
  /**
   * The timestamp of the frame in microseconds.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame(data: any): GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame(data: any): GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Person detection annotation per video.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation {
  /**
   * The detected tracks of a person.
   */
  tracks?: GoogleCloudVideointelligenceV1p1beta1_Track[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation {
  return {
    ...data,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation {
  return {
    ...data,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_Track(item))) : undefined,
  };
}

/**
 * Alternative hypotheses (a.k.a. n-best list).
 */
export interface GoogleCloudVideointelligenceV1p1beta1_SpeechRecognitionAlternative {
  /**
   * Output only. The confidence estimate between 0.0 and 1.0. A higher number
   * indicates an estimated greater likelihood that the recognized words are
   * correct. This field is set only for the top alternative. This field is not
   * guaranteed to be accurate and users should not rely on it to be always
   * provided. The default of 0.0 is a sentinel value indicating `confidence`
   * was not set.
   */
  readonly confidence?: number;
  /**
   * Transcript text representing the words that the user spoke.
   */
  transcript?: string;
  /**
   * Output only. A list of word-specific information for each recognized word.
   * Note: When `enable_speaker_diarization` is set to true, you will see all
   * the words from the beginning of the audio.
   */
  readonly words?: GoogleCloudVideointelligenceV1p1beta1_WordInfo[];
}

/**
 * A speech recognition result corresponding to a portion of the audio.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_SpeechTranscription {
  /**
   * May contain one or more recognition hypotheses (up to the maximum
   * specified in `max_alternatives`). These alternatives are ordered in terms
   * of accuracy, with the top (first) alternative being the most probable, as
   * ranked by the recognizer.
   */
  alternatives?: GoogleCloudVideointelligenceV1p1beta1_SpeechRecognitionAlternative[];
  /**
   * Output only. The [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt)
   * language tag of the language in this result. This language code was
   * detected to have the most likelihood of being spoken in the audio.
   */
  readonly languageCode?: string;
}

/**
 * Annotations related to one detected OCR text snippet. This will contain the
 * corresponding text, confidence value, and frame level information for each
 * detection.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_TextAnnotation {
  /**
   * All video segments where OCR detected text appears.
   */
  segments?: GoogleCloudVideointelligenceV1p1beta1_TextSegment[];
  /**
   * The detected text.
   */
  text?: string;
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_TextAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_TextAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_TextSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_TextAnnotation(data: any): GoogleCloudVideointelligenceV1p1beta1_TextAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_TextSegment(item))) : undefined,
  };
}

/**
 * Video frame level annotation results for text annotation (OCR). Contains
 * information regarding timestamp and bounding box locations for the frames
 * containing detected OCR text snippets.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_TextFrame {
  /**
   * Bounding polygon of the detected text for this frame.
   */
  rotatedBoundingBox?: GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingPoly;
  /**
   * Timestamp of this frame.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_TextFrame(data: any): GoogleCloudVideointelligenceV1p1beta1_TextFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_TextFrame(data: any): GoogleCloudVideointelligenceV1p1beta1_TextFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for text detection.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_TextSegment {
  /**
   * Confidence for the track of detected text. It is calculated as the highest
   * over all frames where OCR detected text appears.
   */
  confidence?: number;
  /**
   * Information related to the frames where OCR detected text appears.
   */
  frames?: GoogleCloudVideointelligenceV1p1beta1_TextFrame[];
  /**
   * Video segment where a text snippet was detected.
   */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_TextSegment(data: any): GoogleCloudVideointelligenceV1p1beta1_TextSegment {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_TextFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_TextSegment(data: any): GoogleCloudVideointelligenceV1p1beta1_TextSegment {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_TextFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * For tracking related features. An object at time_offset with attributes, and
 * located with normalized_bounding_box.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_TimestampedObject {
  /**
   * Optional. The attributes of the object in the bounding box.
   */
  attributes?: GoogleCloudVideointelligenceV1p1beta1_DetectedAttribute[];
  /**
   * Optional. The detected landmarks.
   */
  landmarks?: GoogleCloudVideointelligenceV1p1beta1_DetectedLandmark[];
  /**
   * Normalized Bounding box in a frame, where the object is located.
   */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this object.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_TimestampedObject(data: any): GoogleCloudVideointelligenceV1p1beta1_TimestampedObject {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_TimestampedObject(data: any): GoogleCloudVideointelligenceV1p1beta1_TimestampedObject {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * A track of an object instance.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_Track {
  /**
   * Optional. Attributes in the track level.
   */
  attributes?: GoogleCloudVideointelligenceV1p1beta1_DetectedAttribute[];
  /**
   * Optional. The confidence score of the tracked object.
   */
  confidence?: number;
  /**
   * Video segment of a track.
   */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
  /**
   * The object with timestamp and attributes per frame in the track.
   */
  timestampedObjects?: GoogleCloudVideointelligenceV1p1beta1_TimestampedObject[];
}

function serializeGoogleCloudVideointelligenceV1p1beta1_Track(data: any): GoogleCloudVideointelligenceV1p1beta1_Track {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
    timestampedObjects: data["timestampedObjects"] !== undefined ? data["timestampedObjects"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_TimestampedObject(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_Track(data: any): GoogleCloudVideointelligenceV1p1beta1_Track {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
    timestampedObjects: data["timestampedObjects"] !== undefined ? data["timestampedObjects"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_TimestampedObject(item))) : undefined,
  };
}

/**
 * Annotation progress for a single video.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress {
  /**
   * Specifies which feature is being tracked if the request contains more than
   * one feature.
   */
  feature?:  | "FEATURE_UNSPECIFIED" | "LABEL_DETECTION" | "SHOT_CHANGE_DETECTION" | "EXPLICIT_CONTENT_DETECTION" | "FACE_DETECTION" | "SPEECH_TRANSCRIPTION" | "TEXT_DETECTION" | "OBJECT_TRACKING" | "LOGO_RECOGNITION" | "PERSON_DETECTION";
  /**
   * Video file location in [Cloud Storage](https://cloud.google.com/storage/).
   */
  inputUri?: string;
  /**
   * Approximate percentage processed thus far. Guaranteed to be 100 when fully
   * processed.
   */
  progressPercent?: number;
  /**
   * Specifies which segment is being tracked if the request contains more than
   * one segment.
   */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
  /**
   * Time when the request was received.
   */
  startTime?: Date;
  /**
   * Time of the most recent update.
   */
  updateTime?: Date;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress(data: any): GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress(data: any): GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Annotation results for a single video.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults {
  /**
   * If set, indicates an error. Note that for a single `AnnotateVideoRequest`
   * some videos may succeed and some may fail.
   */
  error?: GoogleRpc_Status;
  /**
   * Explicit content annotation.
   */
  explicitAnnotation?: GoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation;
  /**
   * Deprecated. Please use `face_detection_annotations` instead.
   */
  faceAnnotations?: GoogleCloudVideointelligenceV1p1beta1_FaceAnnotation[];
  /**
   * Face detection annotations.
   */
  faceDetectionAnnotations?: GoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation[];
  /**
   * Label annotations on frame level. There is exactly one element for each
   * unique label.
   */
  frameLabelAnnotations?: GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation[];
  /**
   * Video file location in [Cloud Storage](https://cloud.google.com/storage/).
   */
  inputUri?: string;
  /**
   * Annotations for list of logos detected, tracked and recognized in video.
   */
  logoRecognitionAnnotations?: GoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation[];
  /**
   * Annotations for list of objects detected and tracked in video.
   */
  objectAnnotations?: GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation[];
  /**
   * Person detection annotations.
   */
  personDetectionAnnotations?: GoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation[];
  /**
   * Video segment on which the annotation is run.
   */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
  /**
   * Topical label annotations on video level or user-specified segment level.
   * There is exactly one element for each unique label.
   */
  segmentLabelAnnotations?: GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation[];
  /**
   * Presence label annotations on video level or user-specified segment level.
   * There is exactly one element for each unique label. Compared to the
   * existing topical `segment_label_annotations`, this field presents more
   * fine-grained, segment-level labels detected in video content and is made
   * available only when the client sets `LabelDetectionConfig.model` to
   * "builtin/latest" in the request.
   */
  segmentPresenceLabelAnnotations?: GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation[];
  /**
   * Shot annotations. Each shot is represented as a video segment.
   */
  shotAnnotations?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment[];
  /**
   * Topical label annotations on shot level. There is exactly one element for
   * each unique label.
   */
  shotLabelAnnotations?: GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation[];
  /**
   * Presence label annotations on shot level. There is exactly one element for
   * each unique label. Compared to the existing topical
   * `shot_label_annotations`, this field presents more fine-grained, shot-level
   * labels detected in video content and is made available only when the client
   * sets `LabelDetectionConfig.model` to "builtin/latest" in the request.
   */
  shotPresenceLabelAnnotations?: GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation[];
  /**
   * Speech transcription.
   */
  speechTranscriptions?: GoogleCloudVideointelligenceV1p1beta1_SpeechTranscription[];
  /**
   * OCR text detection and tracking. Annotations for list of detected text
   * snippets. Each will have list of frame information associated with it.
   */
  textAnnotations?: GoogleCloudVideointelligenceV1p1beta1_TextAnnotation[];
}

function serializeGoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults(data: any): GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults {
  return {
    ...data,
    explicitAnnotation: data["explicitAnnotation"] !== undefined ? serializeGoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation(data["explicitAnnotation"]) : undefined,
    faceAnnotations: data["faceAnnotations"] !== undefined ? data["faceAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_FaceAnnotation(item))) : undefined,
    faceDetectionAnnotations: data["faceDetectionAnnotations"] !== undefined ? data["faceDetectionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation(item))) : undefined,
    frameLabelAnnotations: data["frameLabelAnnotations"] !== undefined ? data["frameLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_LabelAnnotation(item))) : undefined,
    logoRecognitionAnnotations: data["logoRecognitionAnnotations"] !== undefined ? data["logoRecognitionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation(item))) : undefined,
    objectAnnotations: data["objectAnnotations"] !== undefined ? data["objectAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation(item))) : undefined,
    personDetectionAnnotations: data["personDetectionAnnotations"] !== undefined ? data["personDetectionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
    segmentLabelAnnotations: data["segmentLabelAnnotations"] !== undefined ? data["segmentLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_LabelAnnotation(item))) : undefined,
    segmentPresenceLabelAnnotations: data["segmentPresenceLabelAnnotations"] !== undefined ? data["segmentPresenceLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_LabelAnnotation(item))) : undefined,
    shotAnnotations: data["shotAnnotations"] !== undefined ? data["shotAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(item))) : undefined,
    shotLabelAnnotations: data["shotLabelAnnotations"] !== undefined ? data["shotLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_LabelAnnotation(item))) : undefined,
    shotPresenceLabelAnnotations: data["shotPresenceLabelAnnotations"] !== undefined ? data["shotPresenceLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_LabelAnnotation(item))) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p1beta1_TextAnnotation(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults(data: any): GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults {
  return {
    ...data,
    explicitAnnotation: data["explicitAnnotation"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation(data["explicitAnnotation"]) : undefined,
    faceAnnotations: data["faceAnnotations"] !== undefined ? data["faceAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_FaceAnnotation(item))) : undefined,
    faceDetectionAnnotations: data["faceDetectionAnnotations"] !== undefined ? data["faceDetectionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation(item))) : undefined,
    frameLabelAnnotations: data["frameLabelAnnotations"] !== undefined ? data["frameLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_LabelAnnotation(item))) : undefined,
    logoRecognitionAnnotations: data["logoRecognitionAnnotations"] !== undefined ? data["logoRecognitionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation(item))) : undefined,
    objectAnnotations: data["objectAnnotations"] !== undefined ? data["objectAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation(item))) : undefined,
    personDetectionAnnotations: data["personDetectionAnnotations"] !== undefined ? data["personDetectionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data["segment"]) : undefined,
    segmentLabelAnnotations: data["segmentLabelAnnotations"] !== undefined ? data["segmentLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_LabelAnnotation(item))) : undefined,
    segmentPresenceLabelAnnotations: data["segmentPresenceLabelAnnotations"] !== undefined ? data["segmentPresenceLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_LabelAnnotation(item))) : undefined,
    shotAnnotations: data["shotAnnotations"] !== undefined ? data["shotAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(item))) : undefined,
    shotLabelAnnotations: data["shotLabelAnnotations"] !== undefined ? data["shotLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_LabelAnnotation(item))) : undefined,
    shotPresenceLabelAnnotations: data["shotPresenceLabelAnnotations"] !== undefined ? data["shotPresenceLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_LabelAnnotation(item))) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p1beta1_TextAnnotation(item))) : undefined,
  };
}

/**
 * Video segment.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_VideoSegment {
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * end of the segment (inclusive).
   */
  endTimeOffset?: number /* Duration */;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * start of the segment (inclusive).
   */
  startTimeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data: any): GoogleCloudVideointelligenceV1p1beta1_VideoSegment {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_VideoSegment(data: any): GoogleCloudVideointelligenceV1p1beta1_VideoSegment {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

/**
 * Word-specific information for recognized words. Word information is only
 * included in the response when certain request parameters are set, such as
 * `enable_word_time_offsets`.
 */
export interface GoogleCloudVideointelligenceV1p1beta1_WordInfo {
  /**
   * Output only. The confidence estimate between 0.0 and 1.0. A higher number
   * indicates an estimated greater likelihood that the recognized words are
   * correct. This field is set only for the top alternative. This field is not
   * guaranteed to be accurate and users should not rely on it to be always
   * provided. The default of 0.0 is a sentinel value indicating `confidence`
   * was not set.
   */
  readonly confidence?: number;
  /**
   * Time offset relative to the beginning of the audio, and corresponding to
   * the end of the spoken word. This field is only set if
   * `enable_word_time_offsets=true` and only in the top hypothesis. This is an
   * experimental feature and the accuracy of the time offset can vary.
   */
  endTime?: number /* Duration */;
  /**
   * Output only. A distinct integer value is assigned for every speaker within
   * the audio. This field specifies which one of those speakers was detected to
   * have spoken this word. Value ranges from 1 up to diarization_speaker_count,
   * and is only set if speaker diarization is enabled.
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

function serializeGoogleCloudVideointelligenceV1p1beta1_WordInfo(data: any): GoogleCloudVideointelligenceV1p1beta1_WordInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"] : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p1beta1_WordInfo(data: any): GoogleCloudVideointelligenceV1p1beta1_WordInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"] : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
  };
}

/**
 * Video annotation progress. Included in the `metadata` field of the
 * `Operation` returned by the `GetOperation` call of the
 * `google::longrunning::Operations` service.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoProgress {
  /**
   * Progress metadata for all videos specified in `AnnotateVideoRequest`.
   */
  annotationProgress?: GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress[];
}

function serializeGoogleCloudVideointelligenceV1p2beta1_AnnotateVideoProgress(data: any): GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoProgress {
  return {
    ...data,
    annotationProgress: data["annotationProgress"] !== undefined ? data["annotationProgress"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_AnnotateVideoProgress(data: any): GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoProgress {
  return {
    ...data,
    annotationProgress: data["annotationProgress"] !== undefined ? data["annotationProgress"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress(item))) : undefined,
  };
}

/**
 * Video annotation response. Included in the `response` field of the
 * `Operation` returned by the `GetOperation` call of the
 * `google::longrunning::Operations` service.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoResponse {
  /**
   * Annotation results for all videos specified in `AnnotateVideoRequest`.
   */
  annotationResults?: GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults[];
}

function serializeGoogleCloudVideointelligenceV1p2beta1_AnnotateVideoResponse(data: any): GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoResponse {
  return {
    ...data,
    annotationResults: data["annotationResults"] !== undefined ? data["annotationResults"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_AnnotateVideoResponse(data: any): GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoResponse {
  return {
    ...data,
    annotationResults: data["annotationResults"] !== undefined ? data["annotationResults"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults(item))) : undefined,
  };
}

/**
 * A generic detected attribute represented by name in string format.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_DetectedAttribute {
  /**
   * Detected attribute confidence. Range [0, 1].
   */
  confidence?: number;
  /**
   * The name of the attribute, for example, glasses, dark_glasses, mouth_open.
   * A full list of supported type names will be provided in the document.
   */
  name?: string;
  /**
   * Text value of the detection result. For example, the value for "HairColor"
   * can be "black", "blonde", etc.
   */
  value?: string;
}

/**
 * A generic detected landmark represented by name in string format and a 2D
 * location.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_DetectedLandmark {
  /**
   * The confidence score of the detected landmark. Range [0, 1].
   */
  confidence?: number;
  /**
   * The name of this landmark, for example, left_hand, right_shoulder.
   */
  name?: string;
  /**
   * The 2D point of the detected landmark using the normalized image
   * coordindate system. The normalized coordinates have the range from 0 to 1.
   */
  point?: GoogleCloudVideointelligenceV1p2beta1_NormalizedVertex;
}

/**
 * Detected entity from video analysis.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_Entity {
  /**
   * Textual description, e.g., `Fixed-gear bicycle`.
   */
  description?: string;
  /**
   * Opaque entity ID. Some IDs may be available in [Google Knowledge Graph
   * Search API](https://developers.google.com/knowledge-graph/).
   */
  entityId?: string;
  /**
   * Language code for `description` in BCP-47 format.
   */
  languageCode?: string;
}

/**
 * Explicit content annotation (based on per-frame visual signals only). If no
 * explicit content has been detected in a frame, no annotations are present for
 * that frame.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation {
  /**
   * All video frames where explicit content was detected.
   */
  frames?: GoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame(item))) : undefined,
  };
}

/**
 * Video frame level annotation results for explicit content.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame {
  /**
   * Likelihood of the pornography content..
   */
  pornographyLikelihood?:  | "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame(data: any): GoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame(data: any): GoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Deprecated. No effect.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_FaceAnnotation {
  /**
   * All video frames where a face was detected.
   */
  frames?: GoogleCloudVideointelligenceV1p2beta1_FaceFrame[];
  /**
   * All video segments where a face was detected.
   */
  segments?: GoogleCloudVideointelligenceV1p2beta1_FaceSegment[];
  /**
   * Thumbnail of a representative face view (in JPEG format).
   */
  thumbnail?: Uint8Array;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_FaceAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_FaceAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_FaceFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_FaceSegment(item))) : undefined,
    thumbnail: data["thumbnail"] !== undefined ? encodeBase64(data["thumbnail"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_FaceAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_FaceAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_FaceFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_FaceSegment(item))) : undefined,
    thumbnail: data["thumbnail"] !== undefined ? decodeBase64(data["thumbnail"] as string) : undefined,
  };
}

/**
 * Face detection annotation.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation {
  /**
   * The thumbnail of a person's face.
   */
  thumbnail?: Uint8Array;
  /**
   * The face tracks with attributes.
   */
  tracks?: GoogleCloudVideointelligenceV1p2beta1_Track[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation {
  return {
    ...data,
    thumbnail: data["thumbnail"] !== undefined ? encodeBase64(data["thumbnail"]) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation {
  return {
    ...data,
    thumbnail: data["thumbnail"] !== undefined ? decodeBase64(data["thumbnail"] as string) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_Track(item))) : undefined,
  };
}

/**
 * Deprecated. No effect.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_FaceFrame {
  /**
   * Normalized Bounding boxes in a frame. There can be more than one boxes if
   * the same face is detected in multiple locations within the current frame.
   */
  normalizedBoundingBoxes?: GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox[];
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_FaceFrame(data: any): GoogleCloudVideointelligenceV1p2beta1_FaceFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_FaceFrame(data: any): GoogleCloudVideointelligenceV1p2beta1_FaceFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for face detection.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_FaceSegment {
  /**
   * Video segment where a face was detected.
   */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_FaceSegment(data: any): GoogleCloudVideointelligenceV1p2beta1_FaceSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_FaceSegment(data: any): GoogleCloudVideointelligenceV1p2beta1_FaceSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * Label annotation.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation {
  /**
   * Common categories for the detected entity. For example, when the label is
   * `Terrier`, the category is likely `dog`. And in some cases there might be
   * more than one categories e.g., `Terrier` could also be a `pet`.
   */
  categoryEntities?: GoogleCloudVideointelligenceV1p2beta1_Entity[];
  /**
   * Detected entity.
   */
  entity?: GoogleCloudVideointelligenceV1p2beta1_Entity;
  /**
   * All video frames where a label was detected.
   */
  frames?: GoogleCloudVideointelligenceV1p2beta1_LabelFrame[];
  /**
   * All video segments where a label was detected.
   */
  segments?: GoogleCloudVideointelligenceV1p2beta1_LabelSegment[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_LabelAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_LabelFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_LabelSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_LabelAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_LabelFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_LabelSegment(item))) : undefined,
  };
}

/**
 * Video frame level annotation results for label detection.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_LabelFrame {
  /**
   * Confidence that the label is accurate. Range: [0, 1].
   */
  confidence?: number;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_LabelFrame(data: any): GoogleCloudVideointelligenceV1p2beta1_LabelFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_LabelFrame(data: any): GoogleCloudVideointelligenceV1p2beta1_LabelFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for label detection.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_LabelSegment {
  /**
   * Confidence that the label is accurate. Range: [0, 1].
   */
  confidence?: number;
  /**
   * Video segment where a label was detected.
   */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_LabelSegment(data: any): GoogleCloudVideointelligenceV1p2beta1_LabelSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_LabelSegment(data: any): GoogleCloudVideointelligenceV1p2beta1_LabelSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * Annotation corresponding to one detected, tracked and recognized logo class.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation {
  /**
   * Entity category information to specify the logo class that all the logo
   * tracks within this LogoRecognitionAnnotation are recognized as.
   */
  entity?: GoogleCloudVideointelligenceV1p2beta1_Entity;
  /**
   * All video segments where the recognized logo appears. There might be
   * multiple instances of the same logo class appearing in one VideoSegment.
   */
  segments?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment[];
  /**
   * All logo tracks where the recognized logo appears. Each track corresponds
   * to one logo instance appearing in consecutive frames.
   */
  tracks?: GoogleCloudVideointelligenceV1p2beta1_Track[];
}

function serializeGoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(item))) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(item))) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_Track(item))) : undefined,
  };
}

/**
 * Normalized bounding box. The normalized vertex coordinates are relative to
 * the original image. Range: [0, 1].
 */
export interface GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox {
  /**
   * Bottom Y coordinate.
   */
  bottom?: number;
  /**
   * Left X coordinate.
   */
  left?: number;
  /**
   * Right X coordinate.
   */
  right?: number;
  /**
   * Top Y coordinate.
   */
  top?: number;
}

/**
 * Normalized bounding polygon for text (that might not be aligned with axis).
 * Contains list of the corner points in clockwise order starting from top-left
 * corner. For example, for a rectangular bounding box: When the text is
 * horizontal it might look like: 0----1 | | 3----2 When it's clockwise rotated
 * 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the
 * vertex order will still be (0, 1, 2, 3). Note that values can be less than 0,
 * or greater than 1 due to trignometric calculations for location of the box.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingPoly {
  /**
   * Normalized vertices of the bounding polygon.
   */
  vertices?: GoogleCloudVideointelligenceV1p2beta1_NormalizedVertex[];
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_NormalizedVertex {
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
 * Annotations corresponding to one tracked object.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation {
  /**
   * Object category's labeling confidence of this track.
   */
  confidence?: number;
  /**
   * Entity to specify the object category that this track is labeled as.
   */
  entity?: GoogleCloudVideointelligenceV1p2beta1_Entity;
  /**
   * Information corresponding to all frames where this object track appears.
   * Non-streaming batch mode: it may be one or multiple ObjectTrackingFrame
   * messages in frames. Streaming mode: it can only be one ObjectTrackingFrame
   * message in frames.
   */
  frames?: GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame[];
  /**
   * Non-streaming batch mode ONLY. Each object track corresponds to one video
   * segment where it appears.
   */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
  /**
   * Streaming mode ONLY. In streaming mode, we do not know the end time of a
   * tracked object before it is completed. Hence, there is no VideoSegment info
   * returned. Instead, we provide a unique identifiable integer track_id so
   * that the customers can correlate the results of the ongoing
   * ObjectTrackAnnotation of the same track_id over time.
   */
  trackId?: bigint;
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
    trackId: data["trackId"] !== undefined ? String(data["trackId"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
    trackId: data["trackId"] !== undefined ? BigInt(data["trackId"]) : undefined,
  };
}

/**
 * Video frame level annotations for object detection and tracking. This field
 * stores per frame location, time offset, and confidence.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame {
  /**
   * The normalized bounding box location of this object track for the frame.
   */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox;
  /**
   * The timestamp of the frame in microseconds.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame(data: any): GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame(data: any): GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Person detection annotation per video.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation {
  /**
   * The detected tracks of a person.
   */
  tracks?: GoogleCloudVideointelligenceV1p2beta1_Track[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation {
  return {
    ...data,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation {
  return {
    ...data,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_Track(item))) : undefined,
  };
}

/**
 * Alternative hypotheses (a.k.a. n-best list).
 */
export interface GoogleCloudVideointelligenceV1p2beta1_SpeechRecognitionAlternative {
  /**
   * Output only. The confidence estimate between 0.0 and 1.0. A higher number
   * indicates an estimated greater likelihood that the recognized words are
   * correct. This field is set only for the top alternative. This field is not
   * guaranteed to be accurate and users should not rely on it to be always
   * provided. The default of 0.0 is a sentinel value indicating `confidence`
   * was not set.
   */
  readonly confidence?: number;
  /**
   * Transcript text representing the words that the user spoke.
   */
  transcript?: string;
  /**
   * Output only. A list of word-specific information for each recognized word.
   * Note: When `enable_speaker_diarization` is set to true, you will see all
   * the words from the beginning of the audio.
   */
  readonly words?: GoogleCloudVideointelligenceV1p2beta1_WordInfo[];
}

/**
 * A speech recognition result corresponding to a portion of the audio.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_SpeechTranscription {
  /**
   * May contain one or more recognition hypotheses (up to the maximum
   * specified in `max_alternatives`). These alternatives are ordered in terms
   * of accuracy, with the top (first) alternative being the most probable, as
   * ranked by the recognizer.
   */
  alternatives?: GoogleCloudVideointelligenceV1p2beta1_SpeechRecognitionAlternative[];
  /**
   * Output only. The [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt)
   * language tag of the language in this result. This language code was
   * detected to have the most likelihood of being spoken in the audio.
   */
  readonly languageCode?: string;
}

/**
 * Annotations related to one detected OCR text snippet. This will contain the
 * corresponding text, confidence value, and frame level information for each
 * detection.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_TextAnnotation {
  /**
   * All video segments where OCR detected text appears.
   */
  segments?: GoogleCloudVideointelligenceV1p2beta1_TextSegment[];
  /**
   * The detected text.
   */
  text?: string;
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_TextAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_TextAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_TextSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_TextAnnotation(data: any): GoogleCloudVideointelligenceV1p2beta1_TextAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_TextSegment(item))) : undefined,
  };
}

/**
 * Video frame level annotation results for text annotation (OCR). Contains
 * information regarding timestamp and bounding box locations for the frames
 * containing detected OCR text snippets.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_TextFrame {
  /**
   * Bounding polygon of the detected text for this frame.
   */
  rotatedBoundingBox?: GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingPoly;
  /**
   * Timestamp of this frame.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_TextFrame(data: any): GoogleCloudVideointelligenceV1p2beta1_TextFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_TextFrame(data: any): GoogleCloudVideointelligenceV1p2beta1_TextFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for text detection.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_TextSegment {
  /**
   * Confidence for the track of detected text. It is calculated as the highest
   * over all frames where OCR detected text appears.
   */
  confidence?: number;
  /**
   * Information related to the frames where OCR detected text appears.
   */
  frames?: GoogleCloudVideointelligenceV1p2beta1_TextFrame[];
  /**
   * Video segment where a text snippet was detected.
   */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_TextSegment(data: any): GoogleCloudVideointelligenceV1p2beta1_TextSegment {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_TextFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_TextSegment(data: any): GoogleCloudVideointelligenceV1p2beta1_TextSegment {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_TextFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * For tracking related features. An object at time_offset with attributes, and
 * located with normalized_bounding_box.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_TimestampedObject {
  /**
   * Optional. The attributes of the object in the bounding box.
   */
  attributes?: GoogleCloudVideointelligenceV1p2beta1_DetectedAttribute[];
  /**
   * Optional. The detected landmarks.
   */
  landmarks?: GoogleCloudVideointelligenceV1p2beta1_DetectedLandmark[];
  /**
   * Normalized Bounding box in a frame, where the object is located.
   */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this object.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_TimestampedObject(data: any): GoogleCloudVideointelligenceV1p2beta1_TimestampedObject {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_TimestampedObject(data: any): GoogleCloudVideointelligenceV1p2beta1_TimestampedObject {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * A track of an object instance.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_Track {
  /**
   * Optional. Attributes in the track level.
   */
  attributes?: GoogleCloudVideointelligenceV1p2beta1_DetectedAttribute[];
  /**
   * Optional. The confidence score of the tracked object.
   */
  confidence?: number;
  /**
   * Video segment of a track.
   */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
  /**
   * The object with timestamp and attributes per frame in the track.
   */
  timestampedObjects?: GoogleCloudVideointelligenceV1p2beta1_TimestampedObject[];
}

function serializeGoogleCloudVideointelligenceV1p2beta1_Track(data: any): GoogleCloudVideointelligenceV1p2beta1_Track {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
    timestampedObjects: data["timestampedObjects"] !== undefined ? data["timestampedObjects"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_TimestampedObject(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_Track(data: any): GoogleCloudVideointelligenceV1p2beta1_Track {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
    timestampedObjects: data["timestampedObjects"] !== undefined ? data["timestampedObjects"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_TimestampedObject(item))) : undefined,
  };
}

/**
 * Annotation progress for a single video.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress {
  /**
   * Specifies which feature is being tracked if the request contains more than
   * one feature.
   */
  feature?:  | "FEATURE_UNSPECIFIED" | "LABEL_DETECTION" | "SHOT_CHANGE_DETECTION" | "EXPLICIT_CONTENT_DETECTION" | "FACE_DETECTION" | "SPEECH_TRANSCRIPTION" | "TEXT_DETECTION" | "OBJECT_TRACKING" | "LOGO_RECOGNITION" | "PERSON_DETECTION";
  /**
   * Video file location in [Cloud Storage](https://cloud.google.com/storage/).
   */
  inputUri?: string;
  /**
   * Approximate percentage processed thus far. Guaranteed to be 100 when fully
   * processed.
   */
  progressPercent?: number;
  /**
   * Specifies which segment is being tracked if the request contains more than
   * one segment.
   */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
  /**
   * Time when the request was received.
   */
  startTime?: Date;
  /**
   * Time of the most recent update.
   */
  updateTime?: Date;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress(data: any): GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress(data: any): GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Annotation results for a single video.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults {
  /**
   * If set, indicates an error. Note that for a single `AnnotateVideoRequest`
   * some videos may succeed and some may fail.
   */
  error?: GoogleRpc_Status;
  /**
   * Explicit content annotation.
   */
  explicitAnnotation?: GoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation;
  /**
   * Deprecated. Please use `face_detection_annotations` instead.
   */
  faceAnnotations?: GoogleCloudVideointelligenceV1p2beta1_FaceAnnotation[];
  /**
   * Face detection annotations.
   */
  faceDetectionAnnotations?: GoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation[];
  /**
   * Label annotations on frame level. There is exactly one element for each
   * unique label.
   */
  frameLabelAnnotations?: GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation[];
  /**
   * Video file location in [Cloud Storage](https://cloud.google.com/storage/).
   */
  inputUri?: string;
  /**
   * Annotations for list of logos detected, tracked and recognized in video.
   */
  logoRecognitionAnnotations?: GoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation[];
  /**
   * Annotations for list of objects detected and tracked in video.
   */
  objectAnnotations?: GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation[];
  /**
   * Person detection annotations.
   */
  personDetectionAnnotations?: GoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation[];
  /**
   * Video segment on which the annotation is run.
   */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
  /**
   * Topical label annotations on video level or user-specified segment level.
   * There is exactly one element for each unique label.
   */
  segmentLabelAnnotations?: GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation[];
  /**
   * Presence label annotations on video level or user-specified segment level.
   * There is exactly one element for each unique label. Compared to the
   * existing topical `segment_label_annotations`, this field presents more
   * fine-grained, segment-level labels detected in video content and is made
   * available only when the client sets `LabelDetectionConfig.model` to
   * "builtin/latest" in the request.
   */
  segmentPresenceLabelAnnotations?: GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation[];
  /**
   * Shot annotations. Each shot is represented as a video segment.
   */
  shotAnnotations?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment[];
  /**
   * Topical label annotations on shot level. There is exactly one element for
   * each unique label.
   */
  shotLabelAnnotations?: GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation[];
  /**
   * Presence label annotations on shot level. There is exactly one element for
   * each unique label. Compared to the existing topical
   * `shot_label_annotations`, this field presents more fine-grained, shot-level
   * labels detected in video content and is made available only when the client
   * sets `LabelDetectionConfig.model` to "builtin/latest" in the request.
   */
  shotPresenceLabelAnnotations?: GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation[];
  /**
   * Speech transcription.
   */
  speechTranscriptions?: GoogleCloudVideointelligenceV1p2beta1_SpeechTranscription[];
  /**
   * OCR text detection and tracking. Annotations for list of detected text
   * snippets. Each will have list of frame information associated with it.
   */
  textAnnotations?: GoogleCloudVideointelligenceV1p2beta1_TextAnnotation[];
}

function serializeGoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults(data: any): GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults {
  return {
    ...data,
    explicitAnnotation: data["explicitAnnotation"] !== undefined ? serializeGoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation(data["explicitAnnotation"]) : undefined,
    faceAnnotations: data["faceAnnotations"] !== undefined ? data["faceAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_FaceAnnotation(item))) : undefined,
    faceDetectionAnnotations: data["faceDetectionAnnotations"] !== undefined ? data["faceDetectionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation(item))) : undefined,
    frameLabelAnnotations: data["frameLabelAnnotations"] !== undefined ? data["frameLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_LabelAnnotation(item))) : undefined,
    logoRecognitionAnnotations: data["logoRecognitionAnnotations"] !== undefined ? data["logoRecognitionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation(item))) : undefined,
    objectAnnotations: data["objectAnnotations"] !== undefined ? data["objectAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation(item))) : undefined,
    personDetectionAnnotations: data["personDetectionAnnotations"] !== undefined ? data["personDetectionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
    segmentLabelAnnotations: data["segmentLabelAnnotations"] !== undefined ? data["segmentLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_LabelAnnotation(item))) : undefined,
    segmentPresenceLabelAnnotations: data["segmentPresenceLabelAnnotations"] !== undefined ? data["segmentPresenceLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_LabelAnnotation(item))) : undefined,
    shotAnnotations: data["shotAnnotations"] !== undefined ? data["shotAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(item))) : undefined,
    shotLabelAnnotations: data["shotLabelAnnotations"] !== undefined ? data["shotLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_LabelAnnotation(item))) : undefined,
    shotPresenceLabelAnnotations: data["shotPresenceLabelAnnotations"] !== undefined ? data["shotPresenceLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_LabelAnnotation(item))) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p2beta1_TextAnnotation(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults(data: any): GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults {
  return {
    ...data,
    explicitAnnotation: data["explicitAnnotation"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation(data["explicitAnnotation"]) : undefined,
    faceAnnotations: data["faceAnnotations"] !== undefined ? data["faceAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_FaceAnnotation(item))) : undefined,
    faceDetectionAnnotations: data["faceDetectionAnnotations"] !== undefined ? data["faceDetectionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation(item))) : undefined,
    frameLabelAnnotations: data["frameLabelAnnotations"] !== undefined ? data["frameLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_LabelAnnotation(item))) : undefined,
    logoRecognitionAnnotations: data["logoRecognitionAnnotations"] !== undefined ? data["logoRecognitionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation(item))) : undefined,
    objectAnnotations: data["objectAnnotations"] !== undefined ? data["objectAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation(item))) : undefined,
    personDetectionAnnotations: data["personDetectionAnnotations"] !== undefined ? data["personDetectionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data["segment"]) : undefined,
    segmentLabelAnnotations: data["segmentLabelAnnotations"] !== undefined ? data["segmentLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_LabelAnnotation(item))) : undefined,
    segmentPresenceLabelAnnotations: data["segmentPresenceLabelAnnotations"] !== undefined ? data["segmentPresenceLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_LabelAnnotation(item))) : undefined,
    shotAnnotations: data["shotAnnotations"] !== undefined ? data["shotAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(item))) : undefined,
    shotLabelAnnotations: data["shotLabelAnnotations"] !== undefined ? data["shotLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_LabelAnnotation(item))) : undefined,
    shotPresenceLabelAnnotations: data["shotPresenceLabelAnnotations"] !== undefined ? data["shotPresenceLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_LabelAnnotation(item))) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p2beta1_TextAnnotation(item))) : undefined,
  };
}

/**
 * Video segment.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_VideoSegment {
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * end of the segment (inclusive).
   */
  endTimeOffset?: number /* Duration */;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * start of the segment (inclusive).
   */
  startTimeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data: any): GoogleCloudVideointelligenceV1p2beta1_VideoSegment {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_VideoSegment(data: any): GoogleCloudVideointelligenceV1p2beta1_VideoSegment {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

/**
 * Word-specific information for recognized words. Word information is only
 * included in the response when certain request parameters are set, such as
 * `enable_word_time_offsets`.
 */
export interface GoogleCloudVideointelligenceV1p2beta1_WordInfo {
  /**
   * Output only. The confidence estimate between 0.0 and 1.0. A higher number
   * indicates an estimated greater likelihood that the recognized words are
   * correct. This field is set only for the top alternative. This field is not
   * guaranteed to be accurate and users should not rely on it to be always
   * provided. The default of 0.0 is a sentinel value indicating `confidence`
   * was not set.
   */
  readonly confidence?: number;
  /**
   * Time offset relative to the beginning of the audio, and corresponding to
   * the end of the spoken word. This field is only set if
   * `enable_word_time_offsets=true` and only in the top hypothesis. This is an
   * experimental feature and the accuracy of the time offset can vary.
   */
  endTime?: number /* Duration */;
  /**
   * Output only. A distinct integer value is assigned for every speaker within
   * the audio. This field specifies which one of those speakers was detected to
   * have spoken this word. Value ranges from 1 up to diarization_speaker_count,
   * and is only set if speaker diarization is enabled.
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

function serializeGoogleCloudVideointelligenceV1p2beta1_WordInfo(data: any): GoogleCloudVideointelligenceV1p2beta1_WordInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"] : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p2beta1_WordInfo(data: any): GoogleCloudVideointelligenceV1p2beta1_WordInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"] : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
  };
}

/**
 * Video annotation progress. Included in the `metadata` field of the
 * `Operation` returned by the `GetOperation` call of the
 * `google::longrunning::Operations` service.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoProgress {
  /**
   * Progress metadata for all videos specified in `AnnotateVideoRequest`.
   */
  annotationProgress?: GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress[];
}

function serializeGoogleCloudVideointelligenceV1p3beta1_AnnotateVideoProgress(data: any): GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoProgress {
  return {
    ...data,
    annotationProgress: data["annotationProgress"] !== undefined ? data["annotationProgress"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_AnnotateVideoProgress(data: any): GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoProgress {
  return {
    ...data,
    annotationProgress: data["annotationProgress"] !== undefined ? data["annotationProgress"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress(item))) : undefined,
  };
}

/**
 * Video annotation response. Included in the `response` field of the
 * `Operation` returned by the `GetOperation` call of the
 * `google::longrunning::Operations` service.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoResponse {
  /**
   * Annotation results for all videos specified in `AnnotateVideoRequest`.
   */
  annotationResults?: GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults[];
}

function serializeGoogleCloudVideointelligenceV1p3beta1_AnnotateVideoResponse(data: any): GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoResponse {
  return {
    ...data,
    annotationResults: data["annotationResults"] !== undefined ? data["annotationResults"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_AnnotateVideoResponse(data: any): GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoResponse {
  return {
    ...data,
    annotationResults: data["annotationResults"] !== undefined ? data["annotationResults"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults(item))) : undefined,
  };
}

/**
 * Celebrity definition.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_Celebrity {
  /**
   * Textual description of additional information about the celebrity, if
   * applicable.
   */
  description?: string;
  /**
   * The celebrity name.
   */
  displayName?: string;
  /**
   * The resource name of the celebrity. Have the format
   * `video-intelligence/kg-mid` indicates a celebrity from preloaded gallery.
   * kg-mid is the id in Google knowledge graph, which is unique for the
   * celebrity.
   */
  name?: string;
}

/**
 * Celebrity recognition annotation per video.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation {
  /**
   * The tracks detected from the input video, including recognized celebrities
   * and other detected faces in the video.
   */
  celebrityTracks?: GoogleCloudVideointelligenceV1p3beta1_CelebrityTrack[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation {
  return {
    ...data,
    celebrityTracks: data["celebrityTracks"] !== undefined ? data["celebrityTracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_CelebrityTrack(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation {
  return {
    ...data,
    celebrityTracks: data["celebrityTracks"] !== undefined ? data["celebrityTracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_CelebrityTrack(item))) : undefined,
  };
}

/**
 * The annotation result of a celebrity face track. RecognizedCelebrity field
 * could be empty if the face track does not have any matched celebrities.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_CelebrityTrack {
  /**
   * Top N match of the celebrities for the face in this track.
   */
  celebrities?: GoogleCloudVideointelligenceV1p3beta1_RecognizedCelebrity[];
  /**
   * A track of a person's face.
   */
  faceTrack?: GoogleCloudVideointelligenceV1p3beta1_Track;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_CelebrityTrack(data: any): GoogleCloudVideointelligenceV1p3beta1_CelebrityTrack {
  return {
    ...data,
    faceTrack: data["faceTrack"] !== undefined ? serializeGoogleCloudVideointelligenceV1p3beta1_Track(data["faceTrack"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_CelebrityTrack(data: any): GoogleCloudVideointelligenceV1p3beta1_CelebrityTrack {
  return {
    ...data,
    faceTrack: data["faceTrack"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p3beta1_Track(data["faceTrack"]) : undefined,
  };
}

/**
 * A generic detected attribute represented by name in string format.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_DetectedAttribute {
  /**
   * Detected attribute confidence. Range [0, 1].
   */
  confidence?: number;
  /**
   * The name of the attribute, for example, glasses, dark_glasses, mouth_open.
   * A full list of supported type names will be provided in the document.
   */
  name?: string;
  /**
   * Text value of the detection result. For example, the value for "HairColor"
   * can be "black", "blonde", etc.
   */
  value?: string;
}

/**
 * A generic detected landmark represented by name in string format and a 2D
 * location.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_DetectedLandmark {
  /**
   * The confidence score of the detected landmark. Range [0, 1].
   */
  confidence?: number;
  /**
   * The name of this landmark, for example, left_hand, right_shoulder.
   */
  name?: string;
  /**
   * The 2D point of the detected landmark using the normalized image
   * coordindate system. The normalized coordinates have the range from 0 to 1.
   */
  point?: GoogleCloudVideointelligenceV1p3beta1_NormalizedVertex;
}

/**
 * Detected entity from video analysis.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_Entity {
  /**
   * Textual description, e.g., `Fixed-gear bicycle`.
   */
  description?: string;
  /**
   * Opaque entity ID. Some IDs may be available in [Google Knowledge Graph
   * Search API](https://developers.google.com/knowledge-graph/).
   */
  entityId?: string;
  /**
   * Language code for `description` in BCP-47 format.
   */
  languageCode?: string;
}

/**
 * Explicit content annotation (based on per-frame visual signals only). If no
 * explicit content has been detected in a frame, no annotations are present for
 * that frame.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation {
  /**
   * All video frames where explicit content was detected.
   */
  frames?: GoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame(item))) : undefined,
  };
}

/**
 * Video frame level annotation results for explicit content.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame {
  /**
   * Likelihood of the pornography content..
   */
  pornographyLikelihood?:  | "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY";
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame(data: any): GoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame(data: any): GoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Deprecated. No effect.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_FaceAnnotation {
  /**
   * All video frames where a face was detected.
   */
  frames?: GoogleCloudVideointelligenceV1p3beta1_FaceFrame[];
  /**
   * All video segments where a face was detected.
   */
  segments?: GoogleCloudVideointelligenceV1p3beta1_FaceSegment[];
  /**
   * Thumbnail of a representative face view (in JPEG format).
   */
  thumbnail?: Uint8Array;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_FaceAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_FaceAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_FaceFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_FaceSegment(item))) : undefined,
    thumbnail: data["thumbnail"] !== undefined ? encodeBase64(data["thumbnail"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_FaceAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_FaceAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_FaceFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_FaceSegment(item))) : undefined,
    thumbnail: data["thumbnail"] !== undefined ? decodeBase64(data["thumbnail"] as string) : undefined,
  };
}

/**
 * Face detection annotation.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation {
  /**
   * The thumbnail of a person's face.
   */
  thumbnail?: Uint8Array;
  /**
   * The face tracks with attributes.
   */
  tracks?: GoogleCloudVideointelligenceV1p3beta1_Track[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation {
  return {
    ...data,
    thumbnail: data["thumbnail"] !== undefined ? encodeBase64(data["thumbnail"]) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation {
  return {
    ...data,
    thumbnail: data["thumbnail"] !== undefined ? decodeBase64(data["thumbnail"] as string) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_Track(item))) : undefined,
  };
}

/**
 * Deprecated. No effect.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_FaceFrame {
  /**
   * Normalized Bounding boxes in a frame. There can be more than one boxes if
   * the same face is detected in multiple locations within the current frame.
   */
  normalizedBoundingBoxes?: GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox[];
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_FaceFrame(data: any): GoogleCloudVideointelligenceV1p3beta1_FaceFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_FaceFrame(data: any): GoogleCloudVideointelligenceV1p3beta1_FaceFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for face detection.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_FaceSegment {
  /**
   * Video segment where a face was detected.
   */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_FaceSegment(data: any): GoogleCloudVideointelligenceV1p3beta1_FaceSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_FaceSegment(data: any): GoogleCloudVideointelligenceV1p3beta1_FaceSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * Label annotation.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation {
  /**
   * Common categories for the detected entity. For example, when the label is
   * `Terrier`, the category is likely `dog`. And in some cases there might be
   * more than one categories e.g., `Terrier` could also be a `pet`.
   */
  categoryEntities?: GoogleCloudVideointelligenceV1p3beta1_Entity[];
  /**
   * Detected entity.
   */
  entity?: GoogleCloudVideointelligenceV1p3beta1_Entity;
  /**
   * All video frames where a label was detected.
   */
  frames?: GoogleCloudVideointelligenceV1p3beta1_LabelFrame[];
  /**
   * All video segments where a label was detected.
   */
  segments?: GoogleCloudVideointelligenceV1p3beta1_LabelSegment[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_LabelFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_LabelSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_LabelFrame(item))) : undefined,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_LabelSegment(item))) : undefined,
  };
}

/**
 * Video frame level annotation results for label detection.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_LabelFrame {
  /**
   * Confidence that the label is accurate. Range: [0, 1].
   */
  confidence?: number;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this location.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_LabelFrame(data: any): GoogleCloudVideointelligenceV1p3beta1_LabelFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_LabelFrame(data: any): GoogleCloudVideointelligenceV1p3beta1_LabelFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for label detection.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_LabelSegment {
  /**
   * Confidence that the label is accurate. Range: [0, 1].
   */
  confidence?: number;
  /**
   * Video segment where a label was detected.
   */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_LabelSegment(data: any): GoogleCloudVideointelligenceV1p3beta1_LabelSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_LabelSegment(data: any): GoogleCloudVideointelligenceV1p3beta1_LabelSegment {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * Annotation corresponding to one detected, tracked and recognized logo class.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation {
  /**
   * Entity category information to specify the logo class that all the logo
   * tracks within this LogoRecognitionAnnotation are recognized as.
   */
  entity?: GoogleCloudVideointelligenceV1p3beta1_Entity;
  /**
   * All video segments where the recognized logo appears. There might be
   * multiple instances of the same logo class appearing in one VideoSegment.
   */
  segments?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment[];
  /**
   * All logo tracks where the recognized logo appears. Each track corresponds
   * to one logo instance appearing in consecutive frames.
   */
  tracks?: GoogleCloudVideointelligenceV1p3beta1_Track[];
}

function serializeGoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(item))) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(item))) : undefined,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_Track(item))) : undefined,
  };
}

/**
 * Normalized bounding box. The normalized vertex coordinates are relative to
 * the original image. Range: [0, 1].
 */
export interface GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox {
  /**
   * Bottom Y coordinate.
   */
  bottom?: number;
  /**
   * Left X coordinate.
   */
  left?: number;
  /**
   * Right X coordinate.
   */
  right?: number;
  /**
   * Top Y coordinate.
   */
  top?: number;
}

/**
 * Normalized bounding polygon for text (that might not be aligned with axis).
 * Contains list of the corner points in clockwise order starting from top-left
 * corner. For example, for a rectangular bounding box: When the text is
 * horizontal it might look like: 0----1 | | 3----2 When it's clockwise rotated
 * 180 degrees around the top-left corner it becomes: 2----3 | | 1----0 and the
 * vertex order will still be (0, 1, 2, 3). Note that values can be less than 0,
 * or greater than 1 due to trignometric calculations for location of the box.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingPoly {
  /**
   * Normalized vertices of the bounding polygon.
   */
  vertices?: GoogleCloudVideointelligenceV1p3beta1_NormalizedVertex[];
}

/**
 * A vertex represents a 2D point in the image. NOTE: the normalized vertex
 * coordinates are relative to the original image and range from 0 to 1.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_NormalizedVertex {
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
 * Annotations corresponding to one tracked object.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation {
  /**
   * Object category's labeling confidence of this track.
   */
  confidence?: number;
  /**
   * Entity to specify the object category that this track is labeled as.
   */
  entity?: GoogleCloudVideointelligenceV1p3beta1_Entity;
  /**
   * Information corresponding to all frames where this object track appears.
   * Non-streaming batch mode: it may be one or multiple ObjectTrackingFrame
   * messages in frames. Streaming mode: it can only be one ObjectTrackingFrame
   * message in frames.
   */
  frames?: GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame[];
  /**
   * Non-streaming batch mode ONLY. Each object track corresponds to one video
   * segment where it appears.
   */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
  /**
   * Streaming mode ONLY. In streaming mode, we do not know the end time of a
   * tracked object before it is completed. Hence, there is no VideoSegment info
   * returned. Instead, we provide a unique identifiable integer track_id so
   * that the customers can correlate the results of the ongoing
   * ObjectTrackAnnotation of the same track_id over time.
   */
  trackId?: bigint;
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
    trackId: data["trackId"] !== undefined ? String(data["trackId"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
    trackId: data["trackId"] !== undefined ? BigInt(data["trackId"]) : undefined,
  };
}

/**
 * Video frame level annotations for object detection and tracking. This field
 * stores per frame location, time offset, and confidence.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame {
  /**
   * The normalized bounding box location of this object track for the frame.
   */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox;
  /**
   * The timestamp of the frame in microseconds.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame(data: any): GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame(data: any): GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Person detection annotation per video.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation {
  /**
   * The detected tracks of a person.
   */
  tracks?: GoogleCloudVideointelligenceV1p3beta1_Track[];
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation {
  return {
    ...data,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_Track(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation {
  return {
    ...data,
    tracks: data["tracks"] !== undefined ? data["tracks"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_Track(item))) : undefined,
  };
}

/**
 * The recognized celebrity with confidence score.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_RecognizedCelebrity {
  /**
   * The recognized celebrity.
   */
  celebrity?: GoogleCloudVideointelligenceV1p3beta1_Celebrity;
  /**
   * Recognition confidence. Range [0, 1].
   */
  confidence?: number;
}

/**
 * Alternative hypotheses (a.k.a. n-best list).
 */
export interface GoogleCloudVideointelligenceV1p3beta1_SpeechRecognitionAlternative {
  /**
   * Output only. The confidence estimate between 0.0 and 1.0. A higher number
   * indicates an estimated greater likelihood that the recognized words are
   * correct. This field is set only for the top alternative. This field is not
   * guaranteed to be accurate and users should not rely on it to be always
   * provided. The default of 0.0 is a sentinel value indicating `confidence`
   * was not set.
   */
  readonly confidence?: number;
  /**
   * Transcript text representing the words that the user spoke.
   */
  transcript?: string;
  /**
   * Output only. A list of word-specific information for each recognized word.
   * Note: When `enable_speaker_diarization` is set to true, you will see all
   * the words from the beginning of the audio.
   */
  readonly words?: GoogleCloudVideointelligenceV1p3beta1_WordInfo[];
}

/**
 * A speech recognition result corresponding to a portion of the audio.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_SpeechTranscription {
  /**
   * May contain one or more recognition hypotheses (up to the maximum
   * specified in `max_alternatives`). These alternatives are ordered in terms
   * of accuracy, with the top (first) alternative being the most probable, as
   * ranked by the recognizer.
   */
  alternatives?: GoogleCloudVideointelligenceV1p3beta1_SpeechRecognitionAlternative[];
  /**
   * Output only. The [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt)
   * language tag of the language in this result. This language code was
   * detected to have the most likelihood of being spoken in the audio.
   */
  readonly languageCode?: string;
}

/**
 * `StreamingAnnotateVideoResponse` is the only message returned to the client
 * by `StreamingAnnotateVideo`. A series of zero or more
 * `StreamingAnnotateVideoResponse` messages are streamed back to the client.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_StreamingAnnotateVideoResponse {
  /**
   * Streaming annotation results.
   */
  annotationResults?: GoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults;
  /**
   * Google Cloud Storage URI that stores annotation results of one streaming
   * session in JSON format. It is the annotation_result_storage_directory from
   * the request followed by '/cloud_project_number-session_id'.
   */
  annotationResultsUri?: string;
  /**
   * If set, returns a google.rpc.Status message that specifies the error for
   * the operation.
   */
  error?: GoogleRpc_Status;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_StreamingAnnotateVideoResponse(data: any): GoogleCloudVideointelligenceV1p3beta1_StreamingAnnotateVideoResponse {
  return {
    ...data,
    annotationResults: data["annotationResults"] !== undefined ? serializeGoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults(data["annotationResults"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_StreamingAnnotateVideoResponse(data: any): GoogleCloudVideointelligenceV1p3beta1_StreamingAnnotateVideoResponse {
  return {
    ...data,
    annotationResults: data["annotationResults"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults(data["annotationResults"]) : undefined,
  };
}

/**
 * Streaming annotation results corresponding to a portion of the video that is
 * currently being processed. Only ONE type of annotation will be specified in
 * the response.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults {
  /**
   * Explicit content annotation results.
   */
  explicitAnnotation?: GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation;
  /**
   * Timestamp of the processed frame in microseconds.
   */
  frameTimestamp?: number /* Duration */;
  /**
   * Label annotation results.
   */
  labelAnnotations?: GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation[];
  /**
   * Object tracking results.
   */
  objectAnnotations?: GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation[];
  /**
   * Shot annotation results. Each shot is represented as a video segment.
   */
  shotAnnotations?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment[];
}

function serializeGoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults(data: any): GoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults {
  return {
    ...data,
    explicitAnnotation: data["explicitAnnotation"] !== undefined ? serializeGoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation(data["explicitAnnotation"]) : undefined,
    frameTimestamp: data["frameTimestamp"] !== undefined ? data["frameTimestamp"] : undefined,
    labelAnnotations: data["labelAnnotations"] !== undefined ? data["labelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(item))) : undefined,
    objectAnnotations: data["objectAnnotations"] !== undefined ? data["objectAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation(item))) : undefined,
    shotAnnotations: data["shotAnnotations"] !== undefined ? data["shotAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults(data: any): GoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults {
  return {
    ...data,
    explicitAnnotation: data["explicitAnnotation"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation(data["explicitAnnotation"]) : undefined,
    frameTimestamp: data["frameTimestamp"] !== undefined ? data["frameTimestamp"] : undefined,
    labelAnnotations: data["labelAnnotations"] !== undefined ? data["labelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(item))) : undefined,
    objectAnnotations: data["objectAnnotations"] !== undefined ? data["objectAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation(item))) : undefined,
    shotAnnotations: data["shotAnnotations"] !== undefined ? data["shotAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(item))) : undefined,
  };
}

/**
 * Annotations related to one detected OCR text snippet. This will contain the
 * corresponding text, confidence value, and frame level information for each
 * detection.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_TextAnnotation {
  /**
   * All video segments where OCR detected text appears.
   */
  segments?: GoogleCloudVideointelligenceV1p3beta1_TextSegment[];
  /**
   * The detected text.
   */
  text?: string;
  /**
   * Feature version.
   */
  version?: string;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_TextAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_TextAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_TextSegment(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_TextAnnotation(data: any): GoogleCloudVideointelligenceV1p3beta1_TextAnnotation {
  return {
    ...data,
    segments: data["segments"] !== undefined ? data["segments"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_TextSegment(item))) : undefined,
  };
}

/**
 * Video frame level annotation results for text annotation (OCR). Contains
 * information regarding timestamp and bounding box locations for the frames
 * containing detected OCR text snippets.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_TextFrame {
  /**
   * Bounding polygon of the detected text for this frame.
   */
  rotatedBoundingBox?: GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingPoly;
  /**
   * Timestamp of this frame.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_TextFrame(data: any): GoogleCloudVideointelligenceV1p3beta1_TextFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_TextFrame(data: any): GoogleCloudVideointelligenceV1p3beta1_TextFrame {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * Video segment level annotation results for text detection.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_TextSegment {
  /**
   * Confidence for the track of detected text. It is calculated as the highest
   * over all frames where OCR detected text appears.
   */
  confidence?: number;
  /**
   * Information related to the frames where OCR detected text appears.
   */
  frames?: GoogleCloudVideointelligenceV1p3beta1_TextFrame[];
  /**
   * Video segment where a text snippet was detected.
   */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_TextSegment(data: any): GoogleCloudVideointelligenceV1p3beta1_TextSegment {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_TextFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_TextSegment(data: any): GoogleCloudVideointelligenceV1p3beta1_TextSegment {
  return {
    ...data,
    frames: data["frames"] !== undefined ? data["frames"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_TextFrame(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
  };
}

/**
 * For tracking related features. An object at time_offset with attributes, and
 * located with normalized_bounding_box.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_TimestampedObject {
  /**
   * Optional. The attributes of the object in the bounding box.
   */
  attributes?: GoogleCloudVideointelligenceV1p3beta1_DetectedAttribute[];
  /**
   * Optional. The detected landmarks.
   */
  landmarks?: GoogleCloudVideointelligenceV1p3beta1_DetectedLandmark[];
  /**
   * Normalized Bounding box in a frame, where the object is located.
   */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * video frame for this object.
   */
  timeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_TimestampedObject(data: any): GoogleCloudVideointelligenceV1p3beta1_TimestampedObject {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_TimestampedObject(data: any): GoogleCloudVideointelligenceV1p3beta1_TimestampedObject {
  return {
    ...data,
    timeOffset: data["timeOffset"] !== undefined ? data["timeOffset"] : undefined,
  };
}

/**
 * A track of an object instance.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_Track {
  /**
   * Optional. Attributes in the track level.
   */
  attributes?: GoogleCloudVideointelligenceV1p3beta1_DetectedAttribute[];
  /**
   * Optional. The confidence score of the tracked object.
   */
  confidence?: number;
  /**
   * Video segment of a track.
   */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
  /**
   * The object with timestamp and attributes per frame in the track.
   */
  timestampedObjects?: GoogleCloudVideointelligenceV1p3beta1_TimestampedObject[];
}

function serializeGoogleCloudVideointelligenceV1p3beta1_Track(data: any): GoogleCloudVideointelligenceV1p3beta1_Track {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
    timestampedObjects: data["timestampedObjects"] !== undefined ? data["timestampedObjects"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_TimestampedObject(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_Track(data: any): GoogleCloudVideointelligenceV1p3beta1_Track {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
    timestampedObjects: data["timestampedObjects"] !== undefined ? data["timestampedObjects"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_TimestampedObject(item))) : undefined,
  };
}

/**
 * Annotation progress for a single video.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress {
  /**
   * Specifies which feature is being tracked if the request contains more than
   * one feature.
   */
  feature?:  | "FEATURE_UNSPECIFIED" | "LABEL_DETECTION" | "SHOT_CHANGE_DETECTION" | "EXPLICIT_CONTENT_DETECTION" | "FACE_DETECTION" | "SPEECH_TRANSCRIPTION" | "TEXT_DETECTION" | "OBJECT_TRACKING" | "LOGO_RECOGNITION" | "CELEBRITY_RECOGNITION" | "PERSON_DETECTION";
  /**
   * Video file location in [Cloud Storage](https://cloud.google.com/storage/).
   */
  inputUri?: string;
  /**
   * Approximate percentage processed thus far. Guaranteed to be 100 when fully
   * processed.
   */
  progressPercent?: number;
  /**
   * Specifies which segment is being tracked if the request contains more than
   * one segment.
   */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
  /**
   * Time when the request was received.
   */
  startTime?: Date;
  /**
   * Time of the most recent update.
   */
  updateTime?: Date;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress(data: any): GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress {
  return {
    ...data,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
    updateTime: data["updateTime"] !== undefined ? data["updateTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress(data: any): GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress {
  return {
    ...data,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
    updateTime: data["updateTime"] !== undefined ? new Date(data["updateTime"]) : undefined,
  };
}

/**
 * Annotation results for a single video.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults {
  /**
   * Celebrity recognition annotations.
   */
  celebrityRecognitionAnnotations?: GoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation;
  /**
   * If set, indicates an error. Note that for a single `AnnotateVideoRequest`
   * some videos may succeed and some may fail.
   */
  error?: GoogleRpc_Status;
  /**
   * Explicit content annotation.
   */
  explicitAnnotation?: GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation;
  /**
   * Deprecated. Please use `face_detection_annotations` instead.
   */
  faceAnnotations?: GoogleCloudVideointelligenceV1p3beta1_FaceAnnotation[];
  /**
   * Face detection annotations.
   */
  faceDetectionAnnotations?: GoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation[];
  /**
   * Label annotations on frame level. There is exactly one element for each
   * unique label.
   */
  frameLabelAnnotations?: GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation[];
  /**
   * Video file location in [Cloud Storage](https://cloud.google.com/storage/).
   */
  inputUri?: string;
  /**
   * Annotations for list of logos detected, tracked and recognized in video.
   */
  logoRecognitionAnnotations?: GoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation[];
  /**
   * Annotations for list of objects detected and tracked in video.
   */
  objectAnnotations?: GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation[];
  /**
   * Person detection annotations.
   */
  personDetectionAnnotations?: GoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation[];
  /**
   * Video segment on which the annotation is run.
   */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
  /**
   * Topical label annotations on video level or user-specified segment level.
   * There is exactly one element for each unique label.
   */
  segmentLabelAnnotations?: GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation[];
  /**
   * Presence label annotations on video level or user-specified segment level.
   * There is exactly one element for each unique label. Compared to the
   * existing topical `segment_label_annotations`, this field presents more
   * fine-grained, segment-level labels detected in video content and is made
   * available only when the client sets `LabelDetectionConfig.model` to
   * "builtin/latest" in the request.
   */
  segmentPresenceLabelAnnotations?: GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation[];
  /**
   * Shot annotations. Each shot is represented as a video segment.
   */
  shotAnnotations?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment[];
  /**
   * Topical label annotations on shot level. There is exactly one element for
   * each unique label.
   */
  shotLabelAnnotations?: GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation[];
  /**
   * Presence label annotations on shot level. There is exactly one element for
   * each unique label. Compared to the existing topical
   * `shot_label_annotations`, this field presents more fine-grained, shot-level
   * labels detected in video content and is made available only when the client
   * sets `LabelDetectionConfig.model` to "builtin/latest" in the request.
   */
  shotPresenceLabelAnnotations?: GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation[];
  /**
   * Speech transcription.
   */
  speechTranscriptions?: GoogleCloudVideointelligenceV1p3beta1_SpeechTranscription[];
  /**
   * OCR text detection and tracking. Annotations for list of detected text
   * snippets. Each will have list of frame information associated with it.
   */
  textAnnotations?: GoogleCloudVideointelligenceV1p3beta1_TextAnnotation[];
}

function serializeGoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults(data: any): GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults {
  return {
    ...data,
    celebrityRecognitionAnnotations: data["celebrityRecognitionAnnotations"] !== undefined ? serializeGoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation(data["celebrityRecognitionAnnotations"]) : undefined,
    explicitAnnotation: data["explicitAnnotation"] !== undefined ? serializeGoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation(data["explicitAnnotation"]) : undefined,
    faceAnnotations: data["faceAnnotations"] !== undefined ? data["faceAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_FaceAnnotation(item))) : undefined,
    faceDetectionAnnotations: data["faceDetectionAnnotations"] !== undefined ? data["faceDetectionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation(item))) : undefined,
    frameLabelAnnotations: data["frameLabelAnnotations"] !== undefined ? data["frameLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(item))) : undefined,
    logoRecognitionAnnotations: data["logoRecognitionAnnotations"] !== undefined ? data["logoRecognitionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation(item))) : undefined,
    objectAnnotations: data["objectAnnotations"] !== undefined ? data["objectAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation(item))) : undefined,
    personDetectionAnnotations: data["personDetectionAnnotations"] !== undefined ? data["personDetectionAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation(item))) : undefined,
    segment: data["segment"] !== undefined ? serializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
    segmentLabelAnnotations: data["segmentLabelAnnotations"] !== undefined ? data["segmentLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(item))) : undefined,
    segmentPresenceLabelAnnotations: data["segmentPresenceLabelAnnotations"] !== undefined ? data["segmentPresenceLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(item))) : undefined,
    shotAnnotations: data["shotAnnotations"] !== undefined ? data["shotAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(item))) : undefined,
    shotLabelAnnotations: data["shotLabelAnnotations"] !== undefined ? data["shotLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(item))) : undefined,
    shotPresenceLabelAnnotations: data["shotPresenceLabelAnnotations"] !== undefined ? data["shotPresenceLabelAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(item))) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (serializeGoogleCloudVideointelligenceV1p3beta1_TextAnnotation(item))) : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults(data: any): GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults {
  return {
    ...data,
    celebrityRecognitionAnnotations: data["celebrityRecognitionAnnotations"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation(data["celebrityRecognitionAnnotations"]) : undefined,
    explicitAnnotation: data["explicitAnnotation"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation(data["explicitAnnotation"]) : undefined,
    faceAnnotations: data["faceAnnotations"] !== undefined ? data["faceAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_FaceAnnotation(item))) : undefined,
    faceDetectionAnnotations: data["faceDetectionAnnotations"] !== undefined ? data["faceDetectionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation(item))) : undefined,
    frameLabelAnnotations: data["frameLabelAnnotations"] !== undefined ? data["frameLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(item))) : undefined,
    logoRecognitionAnnotations: data["logoRecognitionAnnotations"] !== undefined ? data["logoRecognitionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation(item))) : undefined,
    objectAnnotations: data["objectAnnotations"] !== undefined ? data["objectAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation(item))) : undefined,
    personDetectionAnnotations: data["personDetectionAnnotations"] !== undefined ? data["personDetectionAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation(item))) : undefined,
    segment: data["segment"] !== undefined ? deserializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data["segment"]) : undefined,
    segmentLabelAnnotations: data["segmentLabelAnnotations"] !== undefined ? data["segmentLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(item))) : undefined,
    segmentPresenceLabelAnnotations: data["segmentPresenceLabelAnnotations"] !== undefined ? data["segmentPresenceLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(item))) : undefined,
    shotAnnotations: data["shotAnnotations"] !== undefined ? data["shotAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(item))) : undefined,
    shotLabelAnnotations: data["shotLabelAnnotations"] !== undefined ? data["shotLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(item))) : undefined,
    shotPresenceLabelAnnotations: data["shotPresenceLabelAnnotations"] !== undefined ? data["shotPresenceLabelAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_LabelAnnotation(item))) : undefined,
    textAnnotations: data["textAnnotations"] !== undefined ? data["textAnnotations"].map((item: any) => (deserializeGoogleCloudVideointelligenceV1p3beta1_TextAnnotation(item))) : undefined,
  };
}

/**
 * Video segment.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_VideoSegment {
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * end of the segment (inclusive).
   */
  endTimeOffset?: number /* Duration */;
  /**
   * Time-offset, relative to the beginning of the video, corresponding to the
   * start of the segment (inclusive).
   */
  startTimeOffset?: number /* Duration */;
}

function serializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data: any): GoogleCloudVideointelligenceV1p3beta1_VideoSegment {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_VideoSegment(data: any): GoogleCloudVideointelligenceV1p3beta1_VideoSegment {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

/**
 * Word-specific information for recognized words. Word information is only
 * included in the response when certain request parameters are set, such as
 * `enable_word_time_offsets`.
 */
export interface GoogleCloudVideointelligenceV1p3beta1_WordInfo {
  /**
   * Output only. The confidence estimate between 0.0 and 1.0. A higher number
   * indicates an estimated greater likelihood that the recognized words are
   * correct. This field is set only for the top alternative. This field is not
   * guaranteed to be accurate and users should not rely on it to be always
   * provided. The default of 0.0 is a sentinel value indicating `confidence`
   * was not set.
   */
  readonly confidence?: number;
  /**
   * Time offset relative to the beginning of the audio, and corresponding to
   * the end of the spoken word. This field is only set if
   * `enable_word_time_offsets=true` and only in the top hypothesis. This is an
   * experimental feature and the accuracy of the time offset can vary.
   */
  endTime?: number /* Duration */;
  /**
   * Output only. A distinct integer value is assigned for every speaker within
   * the audio. This field specifies which one of those speakers was detected to
   * have spoken this word. Value ranges from 1 up to diarization_speaker_count,
   * and is only set if speaker diarization is enabled.
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

function serializeGoogleCloudVideointelligenceV1p3beta1_WordInfo(data: any): GoogleCloudVideointelligenceV1p3beta1_WordInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"] : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
  };
}

function deserializeGoogleCloudVideointelligenceV1p3beta1_WordInfo(data: any): GoogleCloudVideointelligenceV1p3beta1_WordInfo {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"] : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
  };
}

/**
 * The request message for Operations.CancelOperation.
 */
export interface GoogleLongrunning_CancelOperationRequest {
}

/**
 * The response message for Operations.ListOperations.
 */
export interface GoogleLongrunning_ListOperationsResponse {
  /**
   * The standard List next-page token.
   */
  nextPageToken?: string;
  /**
   * A list of operations that matches the specified filter in the request.
   */
  operations?: GoogleLongrunning_Operation[];
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface GoogleLongrunning_Operation {
  /**
   * If the value is `false`, it means the operation is still in progress. If
   * `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean;
  /**
   * The error result of the operation in case of failure or cancellation.
   */
  error?: GoogleRpc_Status;
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
export interface GoogleProtobuf_Empty {
}

/**
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
 */
export interface GoogleRpc_Status {
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
 * Additional options for VideoIntelligence#projectsLocationsOperationsList.
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
