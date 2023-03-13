// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Street View Publish API Client for Deno
 * =======================================
 * 
 * Publishes 360 photos to Google Maps, along with position, orientation, and connectivity metadata. Apps can offer an interface for positioning, connecting, and uploading user-generated Street View images. 
 * 
 * Docs: https://developers.google.com/streetview/publish/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Publishes 360 photos to Google Maps, along with position, orientation, and
 * connectivity metadata. Apps can offer an interface for positioning,
 * connecting, and uploading user-generated Street View images.
 */
export class StreetViewPublish {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://streetviewpublish.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * After the client finishes uploading the photo with the returned UploadRef,
   * CreatePhoto publishes the uploaded Photo to Street View on Google Maps.
   * Currently, the only way to set heading, pitch, and roll in CreatePhoto is
   * through the [Photo Sphere XMP
   * metadata](https://developers.google.com/streetview/spherical-metadata) in
   * the photo bytes. CreatePhoto ignores the `pose.heading`, `pose.pitch`,
   * `pose.roll`, `pose.altitude`, and `pose.level` fields in Pose. This method
   * returns the following error codes: * google.rpc.Code.INVALID_ARGUMENT if
   * the request is malformed or if the uploaded photo is not a 360 photo. *
   * google.rpc.Code.NOT_FOUND if the upload reference does not exist. *
   * google.rpc.Code.RESOURCE_EXHAUSTED if the account has reached the storage
   * limit.
   *
   */
  async photoCreate(req: Photo): Promise<Photo> {
    req = serializePhoto(req);
    const url = new URL(`${this.#baseUrl}v1/photo`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializePhoto(data);
  }

  /**
   * Deletes a Photo and its metadata. This method returns the following error
   * codes: * google.rpc.Code.PERMISSION_DENIED if the requesting user did not
   * create the requested photo. * google.rpc.Code.NOT_FOUND if the photo ID
   * does not exist.
   *
   * @param photoId Required. ID of the Photo.
   */
  async photoDelete(photoId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/photo/${ photoId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the metadata of the specified Photo. This method returns the
   * following error codes: * google.rpc.Code.PERMISSION_DENIED if the
   * requesting user did not create the requested Photo. *
   * google.rpc.Code.NOT_FOUND if the requested Photo does not exist. *
   * google.rpc.Code.UNAVAILABLE if the requested Photo is still being indexed.
   *
   * @param photoId Required. ID of the Photo.
   */
  async photoGet(photoId: string, opts: PhotoGetOptions = {}): Promise<Photo> {
    const url = new URL(`${this.#baseUrl}v1/photo/${ photoId }`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializePhoto(data);
  }

  /**
   * Deletes a list of Photos and their metadata. Note that if
   * BatchDeletePhotos fails, either critical fields are missing or there is an
   * authentication error. Even if BatchDeletePhotos succeeds, individual photos
   * in the batch may have failures. These failures are specified in each
   * PhotoResponse.status in BatchDeletePhotosResponse.results. See DeletePhoto
   * for specific failures that can occur per photo.
   *
   */
  async photosBatchDelete(req: BatchDeletePhotosRequest): Promise<BatchDeletePhotosResponse> {
    const url = new URL(`${this.#baseUrl}v1/photos:batchDelete`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as BatchDeletePhotosResponse;
  }

  /**
   * Gets the metadata of the specified Photo batch. Note that if
   * BatchGetPhotos fails, either critical fields are missing or there is an
   * authentication error. Even if BatchGetPhotos succeeds, individual photos in
   * the batch may have failures. These failures are specified in each
   * PhotoResponse.status in BatchGetPhotosResponse.results. See GetPhoto for
   * specific failures that can occur per photo.
   *
   */
  async photosBatchGet(opts: PhotosBatchGetOptions = {}): Promise<BatchGetPhotosResponse> {
    const url = new URL(`${this.#baseUrl}v1/photos:batchGet`);
    if (opts.languageCode !== undefined) {
      url.searchParams.append("languageCode", String(opts.languageCode));
    }
    if (opts.photoIds !== undefined) {
      url.searchParams.append("photoIds", String(opts.photoIds));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeBatchGetPhotosResponse(data);
  }

  /**
   * Updates the metadata of Photos, such as pose, place association,
   * connections, etc. Changing the pixels of photos is not supported. Note that
   * if BatchUpdatePhotos fails, either critical fields are missing or there is
   * an authentication error. Even if BatchUpdatePhotos succeeds, individual
   * photos in the batch may have failures. These failures are specified in each
   * PhotoResponse.status in BatchUpdatePhotosResponse.results. See UpdatePhoto
   * for specific failures that can occur per photo. Only the fields specified
   * in updateMask field are used. If `updateMask` is not present, the update
   * applies to all fields. The number of UpdatePhotoRequest messages in a
   * BatchUpdatePhotosRequest must not exceed 20. > Note: To update
   * Pose.altitude, Pose.latLngPair has to be filled as well. Otherwise, the
   * request will fail.
   *
   */
  async photosBatchUpdate(req: BatchUpdatePhotosRequest): Promise<BatchUpdatePhotosResponse> {
    req = serializeBatchUpdatePhotosRequest(req);
    const url = new URL(`${this.#baseUrl}v1/photos:batchUpdate`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeBatchUpdatePhotosResponse(data);
  }

  /**
   * After the client finishes uploading the PhotoSequence with the returned
   * UploadRef, CreatePhotoSequence extracts a sequence of 360 photos from a
   * video or Extensible Device Metadata (XDM, http://www.xdm.org/) to be
   * published to Street View on Google Maps. `CreatePhotoSequence` returns an
   * Operation, with the PhotoSequence Id set in the `Operation.name` field.
   * This method returns the following error codes: *
   * google.rpc.Code.INVALID_ARGUMENT if the request is malformed. *
   * google.rpc.Code.NOT_FOUND if the upload reference does not exist.
   *
   */
  async photoSequenceCreate(req: PhotoSequence, opts: PhotoSequenceCreateOptions = {}): Promise<Operation> {
    req = serializePhotoSequence(req);
    const url = new URL(`${this.#baseUrl}v1/photoSequence`);
    if (opts.inputType !== undefined) {
      url.searchParams.append("inputType", String(opts.inputType));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as Operation;
  }

  /**
   * Deletes a PhotoSequence and its metadata. This method returns the
   * following error codes: * google.rpc.Code.PERMISSION_DENIED if the
   * requesting user did not create the requested photo sequence. *
   * google.rpc.Code.NOT_FOUND if the photo sequence ID does not exist. *
   * google.rpc.Code.FAILED_PRECONDITION if the photo sequence ID is not yet
   * finished processing.
   *
   * @param sequenceId Required. ID of the PhotoSequence.
   */
  async photoSequenceDelete(sequenceId: string): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/photoSequence/${ sequenceId }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Gets the metadata of the specified PhotoSequence via the Operation
   * interface. This method returns the following three types of responses: *
   * `Operation.done` = false, if the processing of PhotoSequence is not
   * finished yet. * `Operation.done` = true and `Operation.error` is populated,
   * if there was an error in processing. * `Operation.done` = true and
   * `Operation.response` is poulated, which contains a PhotoSequence message.
   * This method returns the following error codes: *
   * google.rpc.Code.PERMISSION_DENIED if the requesting user did not create the
   * requested PhotoSequence. * google.rpc.Code.NOT_FOUND if the requested
   * PhotoSequence does not exist.
   *
   * @param sequenceId Required. ID of the photo sequence.
   */
  async photoSequenceGet(sequenceId: string, opts: PhotoSequenceGetOptions = {}): Promise<Operation> {
    const url = new URL(`${this.#baseUrl}v1/photoSequence/${ sequenceId }`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return data as Operation;
  }

  /**
   * Lists all the PhotoSequences that belong to the user, in descending
   * CreatePhotoSequence timestamp order.
   *
   */
  async photoSequencesList(opts: PhotoSequencesListOptions = {}): Promise<ListPhotoSequencesResponse> {
    const url = new URL(`${this.#baseUrl}v1/photoSequences`);
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
    return data as ListPhotoSequencesResponse;
  }

  /**
   * Creates an upload session to start uploading photo sequence data. The
   * upload URL of the returned UploadRef is used to upload the data for the
   * `photoSequence`. After the upload is complete, the UploadRef is used with
   * CreatePhotoSequence to create the PhotoSequence object entry.
   *
   */
  async photoSequenceStartUpload(req: Empty): Promise<UploadRef> {
    const url = new URL(`${this.#baseUrl}v1/photoSequence:startUpload`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UploadRef;
  }

  /**
   * Lists all the Photos that belong to the user. > Note: Recently created
   * photos that are still being indexed are not returned in the response.
   *
   */
  async photosList(opts: PhotosListOptions = {}): Promise<ListPhotosResponse> {
    const url = new URL(`${this.#baseUrl}v1/photos`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
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
    if (opts.view !== undefined) {
      url.searchParams.append("view", String(opts.view));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListPhotosResponse(data);
  }

  /**
   * Creates an upload session to start uploading photo bytes. The method uses
   * the upload URL of the returned UploadRef to upload the bytes for the Photo.
   * In addition to the photo requirements shown in
   * https://support.google.com/maps/answer/7012050?ref_topic=6275604, the photo
   * must meet the following requirements: * Photo Sphere XMP metadata must be
   * included in the photo metadata. See
   * https://developers.google.com/streetview/spherical-metadata for the
   * required fields. * The pixel size of the photo must meet the size
   * requirements listed in
   * https://support.google.com/maps/answer/7012050?ref_topic=6275604, and the
   * photo must be a full 360 horizontally. After the upload completes, the
   * method uses UploadRef with CreatePhoto to create the Photo object entry.
   *
   */
  async photoStartUpload(req: Empty): Promise<UploadRef> {
    const url = new URL(`${this.#baseUrl}v1/photo:startUpload`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as UploadRef;
  }

  /**
   * Updates the metadata of a Photo, such as pose, place association,
   * connections, etc. Changing the pixels of a photo is not supported. Only the
   * fields specified in the updateMask field are used. If `updateMask` is not
   * present, the update applies to all fields. This method returns the
   * following error codes: * google.rpc.Code.PERMISSION_DENIED if the
   * requesting user did not create the requested photo. *
   * google.rpc.Code.INVALID_ARGUMENT if the request is malformed. *
   * google.rpc.Code.NOT_FOUND if the requested photo does not exist. *
   * google.rpc.Code.UNAVAILABLE if the requested Photo is still being indexed.
   *
   * @param id A unique identifier for a photo.
   */
  async photoUpdate(id: string, req: Photo, opts: PhotoUpdateOptions = {}): Promise<Photo> {
    req = serializePhoto(req);
    opts = serializePhotoUpdateOptions(opts);
    const url = new URL(`${this.#baseUrl}v1/photo/${ id }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PUT",
      body,
    });
    return deserializePhoto(data);
  }
}

/**
 * Request to delete multiple Photos.
 */
export interface BatchDeletePhotosRequest {
  /**
   * Required. IDs of the Photos. HTTP GET requests require the following
   * syntax for the URL query parameter: `photoIds=&photoIds=&...`.
   */
  photoIds?: string[];
}

/**
 * Response to batch delete of one or more Photos.
 */
export interface BatchDeletePhotosResponse {
  /**
   * The status for the operation to delete a single Photo in the batch
   * request.
   */
  status?: Status[];
}

/**
 * Response to batch get of Photos.
 */
export interface BatchGetPhotosResponse {
  /**
   * List of results for each individual Photo requested, in the same order as
   * the requests in BatchGetPhotos.
   */
  results?: PhotoResponse[];
}

function serializeBatchGetPhotosResponse(data: any): BatchGetPhotosResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializePhotoResponse(item))) : undefined,
  };
}

function deserializeBatchGetPhotosResponse(data: any): BatchGetPhotosResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializePhotoResponse(item))) : undefined,
  };
}

/**
 * Request to update the metadata of photos. Updating the pixels of photos is
 * not supported.
 */
export interface BatchUpdatePhotosRequest {
  /**
   * Required. List of UpdatePhotoRequests.
   */
  updatePhotoRequests?: UpdatePhotoRequest[];
}

function serializeBatchUpdatePhotosRequest(data: any): BatchUpdatePhotosRequest {
  return {
    ...data,
    updatePhotoRequests: data["updatePhotoRequests"] !== undefined ? data["updatePhotoRequests"].map((item: any) => (serializeUpdatePhotoRequest(item))) : undefined,
  };
}

function deserializeBatchUpdatePhotosRequest(data: any): BatchUpdatePhotosRequest {
  return {
    ...data,
    updatePhotoRequests: data["updatePhotoRequests"] !== undefined ? data["updatePhotoRequests"].map((item: any) => (deserializeUpdatePhotoRequest(item))) : undefined,
  };
}

/**
 * Response to batch update of metadata of one or more Photos.
 */
export interface BatchUpdatePhotosResponse {
  /**
   * List of results for each individual Photo updated, in the same order as
   * the request.
   */
  results?: PhotoResponse[];
}

function serializeBatchUpdatePhotosResponse(data: any): BatchUpdatePhotosResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (serializePhotoResponse(item))) : undefined,
  };
}

function deserializeBatchUpdatePhotosResponse(data: any): BatchUpdatePhotosResponse {
  return {
    ...data,
    results: data["results"] !== undefined ? data["results"].map((item: any) => (deserializePhotoResponse(item))) : undefined,
  };
}

/**
 * A connection is the link from a source photo to a destination photo.
 */
export interface Connection {
  /**
   * Required. The destination of the connection from the containing photo to
   * another photo.
   */
  target?: PhotoId;
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
 * Details related to ProcessingFailureReason#GPS_DATA_GAP. If there are
 * multiple GPS data gaps, only the one with the largest duration is reported
 * here.
 */
export interface GpsDataGapFailureDetails {
  /**
   * The duration of the gap in GPS data that was found.
   */
  gapDuration?: number /* Duration */;
  /**
   * Relative time (from the start of the video stream) when the gap started.
   */
  gapStartTime?: number /* Duration */;
}

function serializeGpsDataGapFailureDetails(data: any): GpsDataGapFailureDetails {
  return {
    ...data,
    gapDuration: data["gapDuration"] !== undefined ? data["gapDuration"] : undefined,
    gapStartTime: data["gapStartTime"] !== undefined ? data["gapStartTime"] : undefined,
  };
}

function deserializeGpsDataGapFailureDetails(data: any): GpsDataGapFailureDetails {
  return {
    ...data,
    gapDuration: data["gapDuration"] !== undefined ? data["gapDuration"] : undefined,
    gapStartTime: data["gapStartTime"] !== undefined ? data["gapStartTime"] : undefined,
  };
}

/**
 * IMU data from the device sensors.
 */
export interface Imu {
  /**
   * The accelerometer measurements in meters/sec^2 with increasing timestamps
   * from devices.
   */
  accelMpsps?: Measurement3d[];
  /**
   * The gyroscope measurements in radians/sec with increasing timestamps from
   * devices.
   */
  gyroRps?: Measurement3d[];
  /**
   * The magnetometer measurements of the magnetic field in microtesla (uT)
   * with increasing timestamps from devices.
   */
  magUt?: Measurement3d[];
}

function serializeImu(data: any): Imu {
  return {
    ...data,
    accelMpsps: data["accelMpsps"] !== undefined ? data["accelMpsps"].map((item: any) => (serializeMeasurement3d(item))) : undefined,
    gyroRps: data["gyroRps"] !== undefined ? data["gyroRps"].map((item: any) => (serializeMeasurement3d(item))) : undefined,
    magUt: data["magUt"] !== undefined ? data["magUt"].map((item: any) => (serializeMeasurement3d(item))) : undefined,
  };
}

function deserializeImu(data: any): Imu {
  return {
    ...data,
    accelMpsps: data["accelMpsps"] !== undefined ? data["accelMpsps"].map((item: any) => (deserializeMeasurement3d(item))) : undefined,
    gyroRps: data["gyroRps"] !== undefined ? data["gyroRps"].map((item: any) => (deserializeMeasurement3d(item))) : undefined,
    magUt: data["magUt"] !== undefined ? data["magUt"].map((item: any) => (deserializeMeasurement3d(item))) : undefined,
  };
}

/**
 * Details related to ProcessingFailureReason#IMU_DATA_GAP. If there are
 * multiple IMU data gaps, only the one with the largest duration is reported
 * here.
 */
export interface ImuDataGapFailureDetails {
  /**
   * The duration of the gap in IMU data that was found.
   */
  gapDuration?: number /* Duration */;
  /**
   * Relative time (from the start of the video stream) when the gap started.
   */
  gapStartTime?: number /* Duration */;
}

function serializeImuDataGapFailureDetails(data: any): ImuDataGapFailureDetails {
  return {
    ...data,
    gapDuration: data["gapDuration"] !== undefined ? data["gapDuration"] : undefined,
    gapStartTime: data["gapStartTime"] !== undefined ? data["gapStartTime"] : undefined,
  };
}

function deserializeImuDataGapFailureDetails(data: any): ImuDataGapFailureDetails {
  return {
    ...data,
    gapDuration: data["gapDuration"] !== undefined ? data["gapDuration"] : undefined,
    gapStartTime: data["gapStartTime"] !== undefined ? data["gapStartTime"] : undefined,
  };
}

/**
 * Details related to ProcessingFailureReason#INSUFFICIENT_GPS.
 */
export interface InsufficientGpsFailureDetails {
  /**
   * The number of GPS points that were found in the video.
   */
  gpsPointsFound?: number;
}

/**
 * An object that represents a latitude/longitude pair. This is expressed as a
 * pair of doubles to represent degrees latitude and degrees longitude. Unless
 * specified otherwise, this object must conform to the WGS84 standard. Values
 * must be within normalized ranges.
 */
export interface LatLng {
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
 * A rectangle in geographical coordinates.
 */
export interface LatLngBounds {
  /**
   * The northeast corner of these bounds.
   */
  northeast?: LatLng;
  /**
   * The southwest corner of these bounds.
   */
  southwest?: LatLng;
}

/**
 * Level information containing level number and its corresponding name.
 */
export interface Level {
  /**
   * Required. A name assigned to this Level, restricted to 3 characters.
   * Consider how the elevator buttons would be labeled for this level if there
   * was an elevator.
   */
  name?: string;
  /**
   * Optional. Floor number, used for ordering. 0 indicates the ground level, 1
   * indicates the first level above ground level, -1 indicates the first level
   * under ground level. Non-integer values are OK.
   */
  number?: number;
}

/**
 * Response to list all photo sequences that belong to a user.
 */
export interface ListPhotoSequencesResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * List of photo sequences via Operation interface. The maximum number of
   * items returned is based on the pageSize field in the request. Each item in
   * the list can have three possible states, * `Operation.done` = false, if the
   * processing of PhotoSequence is not finished yet. * `Operation.done` = true
   * and `Operation.error` is populated, if there was an error in processing. *
   * `Operation.done` = true and `Operation.response` contains a PhotoSequence
   * message, In each sequence, only Id is populated.
   */
  photoSequences?: Operation[];
}

/**
 * Response to list all photos that belong to a user.
 */
export interface ListPhotosResponse {
  /**
   * Token to retrieve the next page of results, or empty if there are no more
   * results in the list.
   */
  nextPageToken?: string;
  /**
   * List of photos. The pageSize field in the request determines the number of
   * items returned.
   */
  photos?: Photo[];
}

function serializeListPhotosResponse(data: any): ListPhotosResponse {
  return {
    ...data,
    photos: data["photos"] !== undefined ? data["photos"].map((item: any) => (serializePhoto(item))) : undefined,
  };
}

function deserializeListPhotosResponse(data: any): ListPhotosResponse {
  return {
    ...data,
    photos: data["photos"] !== undefined ? data["photos"].map((item: any) => (deserializePhoto(item))) : undefined,
  };
}

/**
 * A Generic 3d measurement sample.
 */
export interface Measurement3d {
  /**
   * The timestamp of the IMU measurement.
   */
  captureTime?: Date;
  /**
   * The sensor measurement in the x axis.
   */
  x?: number;
  /**
   * The sensor measurement in the y axis.
   */
  y?: number;
  /**
   * The sensor measurement in the z axis.
   */
  z?: number;
}

function serializeMeasurement3d(data: any): Measurement3d {
  return {
    ...data,
    captureTime: data["captureTime"] !== undefined ? data["captureTime"].toISOString() : undefined,
  };
}

function deserializeMeasurement3d(data: any): Measurement3d {
  return {
    ...data,
    captureTime: data["captureTime"] !== undefined ? new Date(data["captureTime"]) : undefined,
  };
}

/**
 * Details related to PhotoSequenceProcessingFailureReason#NO_OVERLAP_GPS.
 */
export interface NoOverlapGpsFailureDetails {
  /**
   * Time of last recorded GPS point.
   */
  gpsEndTime?: Date;
  /**
   * Time of first recorded GPS point.
   */
  gpsStartTime?: Date;
  /**
   * End time of video.
   */
  videoEndTime?: Date;
  /**
   * Start time of video.
   */
  videoStartTime?: Date;
}

function serializeNoOverlapGpsFailureDetails(data: any): NoOverlapGpsFailureDetails {
  return {
    ...data,
    gpsEndTime: data["gpsEndTime"] !== undefined ? data["gpsEndTime"].toISOString() : undefined,
    gpsStartTime: data["gpsStartTime"] !== undefined ? data["gpsStartTime"].toISOString() : undefined,
    videoEndTime: data["videoEndTime"] !== undefined ? data["videoEndTime"].toISOString() : undefined,
    videoStartTime: data["videoStartTime"] !== undefined ? data["videoStartTime"].toISOString() : undefined,
  };
}

function deserializeNoOverlapGpsFailureDetails(data: any): NoOverlapGpsFailureDetails {
  return {
    ...data,
    gpsEndTime: data["gpsEndTime"] !== undefined ? new Date(data["gpsEndTime"]) : undefined,
    gpsStartTime: data["gpsStartTime"] !== undefined ? new Date(data["gpsStartTime"]) : undefined,
    videoEndTime: data["videoEndTime"] !== undefined ? new Date(data["videoEndTime"]) : undefined,
    videoStartTime: data["videoStartTime"] !== undefined ? new Date(data["videoStartTime"]) : undefined,
  };
}

/**
 * Details related to ProcessingFailureReason#NOT_OUTDOORS. If there are
 * multiple indoor frames found, the first frame is recorded here.
 */
export interface NotOutdoorsFailureDetails {
  /**
   * Relative time (from the start of the video stream) when an indoor frame
   * was found.
   */
  startTime?: number /* Duration */;
}

function serializeNotOutdoorsFailureDetails(data: any): NotOutdoorsFailureDetails {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
  };
}

function deserializeNotOutdoorsFailureDetails(data: any): NotOutdoorsFailureDetails {
  return {
    ...data,
    startTime: data["startTime"] !== undefined ? data["startTime"] : undefined,
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
 * Photo is used to store 360 photos along with photo metadata.
 */
export interface Photo {
  /**
   * Optional. Absolute time when the photo was captured. When the photo has no
   * exif timestamp, this is used to set a timestamp in the photo metadata.
   */
  captureTime?: Date;
  /**
   * Optional. Connections to other photos. A connection represents the link
   * from this photo to another photo.
   */
  connections?: Connection[];
  /**
   * Output only. The download URL for the photo bytes. This field is set only
   * when GetPhotoRequest.view is set to PhotoView.INCLUDE_DOWNLOAD_URL.
   */
  readonly downloadUrl?: string;
  /**
   * Output only. Status in Google Maps, whether this photo was published or
   * rejected.
   */
  readonly mapsPublishStatus?:  | "UNSPECIFIED_MAPS_PUBLISH_STATUS" | "PUBLISHED" | "REJECTED_UNKNOWN";
  /**
   * Required. Output only. Required when updating a photo. Output only when
   * creating a photo. Identifier for the photo, which is unique among all
   * photos in Google.
   */
  readonly photoId?: PhotoId;
  /**
   * Optional. Places where this photo belongs.
   */
  places?: Place[];
  /**
   * Optional. Pose of the photo.
   */
  pose?: Pose;
  /**
   * Output only. The share link for the photo.
   */
  readonly shareLink?: string;
  /**
   * Output only. The thumbnail URL for showing a preview of the given photo.
   */
  readonly thumbnailUrl?: string;
  /**
   * Output only. Status of rights transfer on this photo.
   */
  readonly transferStatus?:  | "TRANSFER_STATUS_UNKNOWN" | "NEVER_TRANSFERRED" | "PENDING" | "COMPLETED" | "REJECTED" | "EXPIRED" | "CANCELLED" | "RECEIVED_VIA_TRANSFER";
  /**
   * Input only. Required when creating a photo. Input only. The resource URL
   * where the photo bytes are uploaded to.
   */
  uploadReference?: UploadRef;
  /**
   * Output only. Time when the image was uploaded.
   */
  readonly uploadTime?: Date;
  /**
   * Output only. View count of the photo.
   */
  readonly viewCount?: bigint;
}

function serializePhoto(data: any): Photo {
  return {
    ...data,
    captureTime: data["captureTime"] !== undefined ? data["captureTime"].toISOString() : undefined,
    pose: data["pose"] !== undefined ? serializePose(data["pose"]) : undefined,
  };
}

function deserializePhoto(data: any): Photo {
  return {
    ...data,
    captureTime: data["captureTime"] !== undefined ? new Date(data["captureTime"]) : undefined,
    pose: data["pose"] !== undefined ? deserializePose(data["pose"]) : undefined,
    uploadTime: data["uploadTime"] !== undefined ? new Date(data["uploadTime"]) : undefined,
    viewCount: data["viewCount"] !== undefined ? BigInt(data["viewCount"]) : undefined,
  };
}

/**
 * Additional options for StreetViewPublish#photoGet.
 */
export interface PhotoGetOptions {
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. If
   * language_code is unspecified, the user's language preference for Google
   * services is used.
   */
  languageCode?: string;
  /**
   * Required. Specifies if a download URL for the photo bytes should be
   * returned in the Photo response.
   */
  view?:  | "BASIC" | "INCLUDE_DOWNLOAD_URL";
}

/**
 * Identifier for a Photo.
 */
export interface PhotoId {
  /**
   * A unique identifier for a photo.
   */
  id?: string;
}

/**
 * Response payload for a single Photo in batch operations including
 * BatchGetPhotos and BatchUpdatePhotos.
 */
export interface PhotoResponse {
  /**
   * The Photo resource, if the request was successful.
   */
  photo?: Photo;
  /**
   * The status for the operation to get or update a single photo in the batch
   * request.
   */
  status?: Status;
}

function serializePhotoResponse(data: any): PhotoResponse {
  return {
    ...data,
    photo: data["photo"] !== undefined ? serializePhoto(data["photo"]) : undefined,
  };
}

function deserializePhotoResponse(data: any): PhotoResponse {
  return {
    ...data,
    photo: data["photo"] !== undefined ? deserializePhoto(data["photo"]) : undefined,
  };
}

/**
 * Additional options for StreetViewPublish#photosBatchGet.
 */
export interface PhotosBatchGetOptions {
  /**
   * Optional. The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. If
   * language_code is unspecified, the user's language preference for Google
   * services is used.
   */
  languageCode?: string;
  /**
   * Required. IDs of the Photos. For HTTP GET requests, the URL query
   * parameter should be `photoIds=&photoIds=&...`.
   */
  photoIds?: string;
  /**
   * Required. Specifies if a download URL for the photo bytes should be
   * returned in the Photo response.
   */
  view?:  | "BASIC" | "INCLUDE_DOWNLOAD_URL";
}

/**
 * A sequence of 360 photos along with metadata.
 */
export interface PhotoSequence {
  /**
   * Optional. Absolute time when the photo sequence starts to be captured. If
   * the photo sequence is a video, this is the start time of the video. If this
   * field is populated in input, it overrides the capture time in the video or
   * XDM file.
   */
  captureTimeOverride?: Date;
  /**
   * Output only. The computed distance of the photo sequence in meters.
   */
  readonly distanceMeters?: number;
  /**
   * Output only. If this sequence has `failure_reason` set, this may contain
   * additional details about the failure.
   */
  readonly failureDetails?: ProcessingFailureDetails;
  /**
   * Output only. If this sequence has processing_state = FAILED, this will
   * contain the reason why it failed. If the processing_state is any other
   * value, this field will be unset.
   */
  readonly failureReason?:  | "PROCESSING_FAILURE_REASON_UNSPECIFIED" | "LOW_RESOLUTION" | "DUPLICATE" | "INSUFFICIENT_GPS" | "NO_OVERLAP_GPS" | "INVALID_GPS" | "FAILED_TO_REFINE_POSITIONS" | "TAKEDOWN" | "CORRUPT_VIDEO" | "INTERNAL" | "INVALID_VIDEO_FORMAT" | "INVALID_VIDEO_DIMENSIONS" | "INVALID_CAPTURE_TIME" | "GPS_DATA_GAP" | "JUMPY_GPS" | "INVALID_IMU" | "INSUFFICIENT_IMU" | "INSUFFICIENT_OVERLAP_TIME_SERIES" | "IMU_DATA_GAP" | "UNSUPPORTED_CAMERA" | "NOT_OUTDOORS" | "INSUFFICIENT_VIDEO_FRAMES" | "INSUFFICIENT_MOVEMENT";
  /**
   * Output only. The filename of the upload. Does not include the directory
   * path. Only available if the sequence was uploaded on a platform that
   * provides the filename.
   */
  readonly filename?: string;
  /**
   * Input only. If both raw_gps_timeline and the Camera Motion Metadata Track
   * (CAMM) contain GPS measurements, indicate which takes precedence.
   */
  gpsSource?:  | "PHOTO_SEQUENCE" | "CAMERA_MOTION_METADATA_TRACK";
  /**
   * Output only. Unique identifier for the photo sequence. This also acts as a
   * long running operation ID if uploading is performed asynchronously.
   */
  readonly id?: string;
  /**
   * Input only. Three axis IMU data for the collection. If this data is too
   * large to put in the request, then it should be put in the CAMM track for
   * the video. This data always takes precedence over the equivalent CAMM data,
   * if it exists.
   */
  imu?: Imu;
  /**
   * Output only. Photos with increasing timestamps.
   */
  readonly photos?: Photo[];
  /**
   * Output only. The processing state of this sequence.
   */
  readonly processingState?:  | "PROCESSING_STATE_UNSPECIFIED" | "PENDING" | "PROCESSING" | "PROCESSED" | "FAILED";
  /**
   * Input only. Raw GPS measurements with increasing timestamps from the
   * device that aren't time synced with each photo. These raw measurements will
   * be used to infer the pose of each frame. Required in input when InputType
   * is VIDEO and raw GPS measurements are not in Camera Motion Metadata Track
   * (CAMM). User can indicate which takes precedence using gps_source if raw
   * GPS measurements are provided in both raw_gps_timeline and Camera Motion
   * Metadata Track (CAMM).
   */
  rawGpsTimeline?: Pose[];
  /**
   * Output only. A rectangular box that encapsulates every image in this photo
   * sequence.
   */
  readonly sequenceBounds?: LatLngBounds;
  /**
   * Input only. Required when creating photo sequence. The resource name where
   * the bytes of the photo sequence (in the form of video) are uploaded.
   */
  uploadReference?: UploadRef;
  /**
   * Output only. The time this photo sequence was created in uSV Store
   * service.
   */
  readonly uploadTime?: Date;
  /**
   * Output only. The total number of views that all the published images in
   * this PhotoSequence have received.
   */
  readonly viewCount?: bigint;
}

function serializePhotoSequence(data: any): PhotoSequence {
  return {
    ...data,
    captureTimeOverride: data["captureTimeOverride"] !== undefined ? data["captureTimeOverride"].toISOString() : undefined,
    imu: data["imu"] !== undefined ? serializeImu(data["imu"]) : undefined,
    rawGpsTimeline: data["rawGpsTimeline"] !== undefined ? data["rawGpsTimeline"].map((item: any) => (serializePose(item))) : undefined,
  };
}

function deserializePhotoSequence(data: any): PhotoSequence {
  return {
    ...data,
    captureTimeOverride: data["captureTimeOverride"] !== undefined ? new Date(data["captureTimeOverride"]) : undefined,
    failureDetails: data["failureDetails"] !== undefined ? deserializeProcessingFailureDetails(data["failureDetails"]) : undefined,
    imu: data["imu"] !== undefined ? deserializeImu(data["imu"]) : undefined,
    photos: data["photos"] !== undefined ? data["photos"].map((item: any) => (deserializePhoto(item))) : undefined,
    rawGpsTimeline: data["rawGpsTimeline"] !== undefined ? data["rawGpsTimeline"].map((item: any) => (deserializePose(item))) : undefined,
    uploadTime: data["uploadTime"] !== undefined ? new Date(data["uploadTime"]) : undefined,
    viewCount: data["viewCount"] !== undefined ? BigInt(data["viewCount"]) : undefined,
  };
}

/**
 * Additional options for StreetViewPublish#photoSequenceCreate.
 */
export interface PhotoSequenceCreateOptions {
  /**
   * Required. The input form of PhotoSequence.
   */
  inputType?:  | "INPUT_TYPE_UNSPECIFIED" | "VIDEO" | "XDM";
}

/**
 * Additional options for StreetViewPublish#photoSequenceGet.
 */
export interface PhotoSequenceGetOptions {
  /**
   * Optional. The filter expression. For example:
   * `published_status=PUBLISHED`. The filters supported are:
   * `published_status`. See https://google.aip.dev/160 for more information.
   */
  filter?: string;
  /**
   * Specifies if a download URL for the photo sequence should be returned in
   * `download_url` of individual photos in the PhotoSequence response. > Note:
   * Currently not implemented.
   */
  view?:  | "BASIC" | "INCLUDE_DOWNLOAD_URL";
}

/**
 * Additional options for StreetViewPublish#photoSequencesList.
 */
export interface PhotoSequencesListOptions {
  /**
   * Optional. The filter expression. For example: `imagery_type=SPHERICAL`.
   * The filters supported are: `imagery_type`, `processing_state`,
   * `min_latitude`, `max_latitude`, `min_longitude`, `max_longitude`, and
   * `filename_query`. See https://google.aip.dev/160 for more information.
   * Filename queries should sent as a Phrase in order to support multple words
   * and special characters by adding escaped quotes. Ex:
   * filename_query="example of a phrase.mp4"
   */
  filter?: string;
  /**
   * Optional. The maximum number of photo sequences to return. `pageSize` must
   * be non-negative. If `pageSize` is zero or is not provided, the default page
   * size of 100 is used. The number of photo sequences returned in the response
   * may be less than `pageSize` if the number of matches is less than
   * `pageSize`. This is currently unimplemented but is in process.
   */
  pageSize?: number;
  /**
   * Optional. The nextPageToken value returned from a previous
   * ListPhotoSequences request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for StreetViewPublish#photosList.
 */
export interface PhotosListOptions {
  /**
   * Optional. The filter expression. For example:
   * `placeId=ChIJj61dQgK6j4AR4GeTYWZsKWw`. The filters supported are:
   * `placeId`, `min_latitude`, `max_latitude`, `min_longitude`, and
   * `max_longitude`. See https://google.aip.dev/160 for more information.
   */
  filter?: string;
  /**
   * Optional. The BCP-47 language code, such as "en-US" or "sr-Latn". For more
   * information, see
   * http://www.unicode.org/reports/tr35/#Unicode_locale_identifier. If
   * language_code is unspecified, the user's language preference for Google
   * services is used.
   */
  languageCode?: string;
  /**
   * Optional. The maximum number of photos to return. `pageSize` must be
   * non-negative. If `pageSize` is zero or is not provided, the default page
   * size of 100 is used. The number of photos returned in the response may be
   * less than `pageSize` if the number of photos that belong to the user is
   * less than `pageSize`.
   */
  pageSize?: number;
  /**
   * Optional. The nextPageToken value returned from a previous ListPhotos
   * request, if any.
   */
  pageToken?: string;
  /**
   * Required. Specifies if a download URL for the photos bytes should be
   * returned in the Photos response.
   */
  view?:  | "BASIC" | "INCLUDE_DOWNLOAD_URL";
}

/**
 * Additional options for StreetViewPublish#photoUpdate.
 */
export interface PhotoUpdateOptions {
  /**
   * Required. Mask that identifies fields on the photo metadata to update. If
   * not present, the old Photo metadata is entirely replaced with the new Photo
   * metadata in this request. The update fails if invalid fields are specified.
   * Multiple fields can be specified in a comma-delimited list. The following
   * fields are valid: * `pose.heading` * `pose.lat_lng_pair` * `pose.pitch` *
   * `pose.roll` * `pose.level` * `pose.altitude` * `connections` * `places` >
   * Note: When updateMask contains repeated fields, the entire set of repeated
   * values get replaced with the new contents. For example, if updateMask
   * contains `connections` and `UpdatePhotoRequest.photo.connections` is empty,
   * all connections are removed.
   */
  updateMask?: string /* FieldMask */;
}

function serializePhotoUpdateOptions(data: any): PhotoUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializePhotoUpdateOptions(data: any): PhotoUpdateOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Place metadata for an entity.
 */
export interface Place {
  /**
   * Output only. The language_code that the name is localized with. This
   * should be the language_code specified in the request, but may be a
   * fallback.
   */
  readonly languageCode?: string;
  /**
   * Output only. The name of the place, localized to the language_code.
   */
  readonly name?: string;
  /**
   * Place identifier, as described in
   * https://developers.google.com/places/place-id.
   */
  placeId?: string;
}

/**
 * Raw pose measurement for an entity.
 */
export interface Pose {
  /**
   * The estimated horizontal accuracy of this pose in meters with 68%
   * confidence (one standard deviation). For example, on Android, this value is
   * available from this method:
   * https://developer.android.com/reference/android/location/Location#getAccuracy().
   * Other platforms have different methods of obtaining similar accuracy
   * estimations.
   */
  accuracyMeters?: number;
  /**
   * Altitude of the pose in meters above WGS84 ellipsoid. NaN indicates an
   * unmeasured quantity.
   */
  altitude?: number;
  /**
   * Time of the GPS record since UTC epoch.
   */
  gpsRecordTimestampUnixEpoch?: Date;
  /**
   * The following pose parameters pertain to the center of the photo. They
   * match https://developers.google.com/streetview/spherical-metadata. Compass
   * heading, measured at the center of the photo in degrees clockwise from
   * North. Value must be >=0 and <360. NaN indicates an unmeasured quantity.
   */
  heading?: number;
  /**
   * Latitude and longitude pair of the pose, as explained here:
   * https://cloud.google.com/datastore/docs/reference/rest/Shared.Types/LatLng
   * When creating a Photo, if the latitude and longitude pair are not provided,
   * the geolocation from the exif header is used. A latitude and longitude pair
   * not provided in the photo or exif header causes the photo process to fail.
   */
  latLngPair?: LatLng;
  /**
   * Level (the floor in a building) used to configure vertical navigation.
   */
  level?: Level;
  /**
   * Pitch, measured at the center of the photo in degrees. Value must be >=-90
   * and <= 90. A value of -90 means looking directly down, and a value of 90
   * means looking directly up. NaN indicates an unmeasured quantity.
   */
  pitch?: number;
  /**
   * Roll, measured in degrees. Value must be >= 0 and <360. A value of 0 means
   * level with the horizon. NaN indicates an unmeasured quantity.
   */
  roll?: number;
}

function serializePose(data: any): Pose {
  return {
    ...data,
    gpsRecordTimestampUnixEpoch: data["gpsRecordTimestampUnixEpoch"] !== undefined ? data["gpsRecordTimestampUnixEpoch"].toISOString() : undefined,
  };
}

function deserializePose(data: any): Pose {
  return {
    ...data,
    gpsRecordTimestampUnixEpoch: data["gpsRecordTimestampUnixEpoch"] !== undefined ? new Date(data["gpsRecordTimestampUnixEpoch"]) : undefined,
  };
}

/**
 * Additional details to accompany the ProcessingFailureReason enum. This
 * message is always expected to be used in conjunction with
 * ProcessingFailureReason, and the oneof value set in this message should match
 * the FailureReason.
 */
export interface ProcessingFailureDetails {
  /**
   * See GpsDataGapFailureDetails.
   */
  gpsDataGapDetails?: GpsDataGapFailureDetails;
  /**
   * See ImuDataGapFailureDetails.
   */
  imuDataGapDetails?: ImuDataGapFailureDetails;
  /**
   * See InsufficientGpsFailureDetails.
   */
  insufficientGpsDetails?: InsufficientGpsFailureDetails;
  /**
   * See NoOverlapGpsFailureDetails.
   */
  noOverlapGpsDetails?: NoOverlapGpsFailureDetails;
  /**
   * See NotOutdoorsFailureDetails.
   */
  notOutdoorsDetails?: NotOutdoorsFailureDetails;
}

function serializeProcessingFailureDetails(data: any): ProcessingFailureDetails {
  return {
    ...data,
    gpsDataGapDetails: data["gpsDataGapDetails"] !== undefined ? serializeGpsDataGapFailureDetails(data["gpsDataGapDetails"]) : undefined,
    imuDataGapDetails: data["imuDataGapDetails"] !== undefined ? serializeImuDataGapFailureDetails(data["imuDataGapDetails"]) : undefined,
    noOverlapGpsDetails: data["noOverlapGpsDetails"] !== undefined ? serializeNoOverlapGpsFailureDetails(data["noOverlapGpsDetails"]) : undefined,
    notOutdoorsDetails: data["notOutdoorsDetails"] !== undefined ? serializeNotOutdoorsFailureDetails(data["notOutdoorsDetails"]) : undefined,
  };
}

function deserializeProcessingFailureDetails(data: any): ProcessingFailureDetails {
  return {
    ...data,
    gpsDataGapDetails: data["gpsDataGapDetails"] !== undefined ? deserializeGpsDataGapFailureDetails(data["gpsDataGapDetails"]) : undefined,
    imuDataGapDetails: data["imuDataGapDetails"] !== undefined ? deserializeImuDataGapFailureDetails(data["imuDataGapDetails"]) : undefined,
    noOverlapGpsDetails: data["noOverlapGpsDetails"] !== undefined ? deserializeNoOverlapGpsFailureDetails(data["noOverlapGpsDetails"]) : undefined,
    notOutdoorsDetails: data["notOutdoorsDetails"] !== undefined ? deserializeNotOutdoorsFailureDetails(data["notOutdoorsDetails"]) : undefined,
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
 * Request to update the metadata of a Photo. Updating the pixels of a photo is
 * not supported.
 */
export interface UpdatePhotoRequest {
  /**
   * Required. Photo object containing the new metadata.
   */
  photo?: Photo;
  /**
   * Required. Mask that identifies fields on the photo metadata to update. If
   * not present, the old Photo metadata is entirely replaced with the new Photo
   * metadata in this request. The update fails if invalid fields are specified.
   * Multiple fields can be specified in a comma-delimited list. The following
   * fields are valid: * `pose.heading` * `pose.lat_lng_pair` * `pose.pitch` *
   * `pose.roll` * `pose.level` * `pose.altitude` * `connections` * `places` >
   * Note: When updateMask contains repeated fields, the entire set of repeated
   * values get replaced with the new contents. For example, if updateMask
   * contains `connections` and `UpdatePhotoRequest.photo.connections` is empty,
   * all connections are removed.
   */
  updateMask?: string /* FieldMask */;
}

function serializeUpdatePhotoRequest(data: any): UpdatePhotoRequest {
  return {
    ...data,
    photo: data["photo"] !== undefined ? serializePhoto(data["photo"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeUpdatePhotoRequest(data: any): UpdatePhotoRequest {
  return {
    ...data,
    photo: data["photo"] !== undefined ? deserializePhoto(data["photo"]) : undefined,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

/**
 * Upload reference for media files.
 */
export interface UploadRef {
  /**
   * An upload reference should be unique for each user. It follows the form:
   * "https://streetviewpublish.googleapis.com/media/user/{account_id}/photo/{upload_reference}"
   */
  uploadUrl?: string;
}