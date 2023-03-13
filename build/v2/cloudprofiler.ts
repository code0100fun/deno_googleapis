// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Profiler API Client for Deno
 * ==================================
 * 
 * Manages continuous profiling information.
 * 
 * Docs: https://cloud.google.com/profiler/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Manages continuous profiling information.
 */
export class CloudProfiler {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://cloudprofiler.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * CreateProfile creates a new profile resource in the online mode. The
   * server ensures that the new profiles are created at a constant rate per
   * deployment, so the creation request may hang for some time until the next
   * profile session is available. The request may fail with ABORTED error if
   * the creation is not available within ~1m, the response will indicate the
   * duration of the backoff the client should take before attempting creating a
   * profile again. The backoff duration is returned in google.rpc.RetryInfo
   * extension on the response status. To a gRPC client, the extension will be
   * return as a binary-serialized proto in the trailing metadata item named
   * "google.rpc.retryinfo-bin".
   *
   * @param parent Parent project to create the profile in.
   */
  async projectsProfilesCreate(parent: string, req: CreateProfileRequest): Promise<Profile> {
    const url = new URL(`${this.#baseUrl}v2/${ parent }/profiles`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeProfile(data);
  }

  /**
   * CreateOfflineProfile creates a new profile resource in the offline mode.
   * The client provides the profile to create along with the profile bytes, the
   * server records it.
   *
   * @param parent Parent project to create the profile in.
   */
  async projectsProfilesCreateOffline(parent: string, req: Profile): Promise<Profile> {
    req = serializeProfile(req);
    const url = new URL(`${this.#baseUrl}v2/${ parent }/profiles:createOffline`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeProfile(data);
  }

  /**
   * UpdateProfile updates the profile bytes and labels on the profile resource
   * created in the online mode. Updating the bytes for profiles created in the
   * offline mode is currently not supported: the profile content must be
   * provided at the time of the profile creation.
   *
   * @param name Output only. Opaque, server-assigned, unique ID for this profile.
   */
  async projectsProfilesPatch(name: string, req: Profile, opts: ProjectsProfilesPatchOptions = {}): Promise<Profile> {
    req = serializeProfile(req);
    opts = serializeProjectsProfilesPatchOptions(opts);
    const url = new URL(`${this.#baseUrl}v2/${ name }`);
    if (opts.updateMask !== undefined) {
      url.searchParams.append("updateMask", String(opts.updateMask));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "PATCH",
      body,
    });
    return deserializeProfile(data);
  }
}

/**
 * CreateProfileRequest describes a profile resource online creation request.
 * The deployment field must be populated. The profile_type specifies the list
 * of profile types supported by the agent. The creation call will hang until a
 * profile of one of these types needs to be collected.
 */
export interface CreateProfileRequest {
  /**
   * Required. Deployment details.
   */
  deployment?: Deployment;
  /**
   * Required. One or more profile types that the agent is capable of
   * providing.
   */
  profileType?:  | "PROFILE_TYPE_UNSPECIFIED" | "CPU" | "WALL" | "HEAP" | "THREADS" | "CONTENTION" | "PEAK_HEAP" | "HEAP_ALLOC"[];
}

/**
 * Deployment contains the deployment identification information.
 */
export interface Deployment {
  /**
   * Labels identify the deployment within the user universe and same target.
   * Validation regex for label names: `^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$`.
   * Value for an individual label must be <= 512 bytes, the total size of all
   * label names and values must be <= 1024 bytes. Label named "language" can be
   * used to record the programming language of the profiled deployment. The
   * standard choices for the value include "java", "go", "python", "ruby",
   * "nodejs", "php", "dotnet". For deployments running on Google Cloud
   * Platform, "zone" or "region" label should be present describing the
   * deployment location. An example of a zone is "us-central1-a", an example of
   * a region is "us-central1" or "us-central".
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Project ID is the ID of a cloud project. Validation regex:
   * `^a-z{4,61}[a-z0-9]$`.
   */
  projectId?: string;
  /**
   * Target is the service name used to group related deployments: * Service
   * name for App Engine Flex / Standard. * Cluster and container name for GKE.
   * * User-specified string for direct Compute Engine profiling (e.g. Java). *
   * Job name for Dataflow. Validation regex:
   * `^[a-z0-9]([-a-z0-9_.]{0,253}[a-z0-9])?$`.
   */
  target?: string;
}

/**
 * Profile resource.
 */
export interface Profile {
  /**
   * Deployment this profile corresponds to.
   */
  deployment?: Deployment;
  /**
   * Duration of the profiling session. Input (for the offline mode) or output
   * (for the online mode). The field represents requested profiling duration.
   * It may slightly differ from the effective profiling duration, which is
   * recorded in the profile data, in case the profiling can't be stopped
   * immediately (e.g. in case stopping the profiling is handled
   * asynchronously).
   */
  duration?: number /* Duration */;
  /**
   * Input only. Labels associated to this specific profile. These labels will
   * get merged with the deployment labels for the final data set. See
   * documentation on deployment labels for validation rules and limits.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * Output only. Opaque, server-assigned, unique ID for this profile.
   */
  readonly name?: string;
  /**
   * Input only. Profile bytes, as a gzip compressed serialized proto, the
   * format is https://github.com/google/pprof/blob/master/proto/profile.proto.
   */
  profileBytes?: Uint8Array;
  /**
   * Type of profile. For offline mode, this must be specified when creating
   * the profile. For online mode it is assigned and returned by the server.
   */
  profileType?:  | "PROFILE_TYPE_UNSPECIFIED" | "CPU" | "WALL" | "HEAP" | "THREADS" | "CONTENTION" | "PEAK_HEAP" | "HEAP_ALLOC";
}

function serializeProfile(data: any): Profile {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    profileBytes: data["profileBytes"] !== undefined ? encodeBase64(data["profileBytes"]) : undefined,
  };
}

function deserializeProfile(data: any): Profile {
  return {
    ...data,
    duration: data["duration"] !== undefined ? data["duration"] : undefined,
    profileBytes: data["profileBytes"] !== undefined ? decodeBase64(data["profileBytes"] as string) : undefined,
  };
}

/**
 * Additional options for CloudProfiler#projectsProfilesPatch.
 */
export interface ProjectsProfilesPatchOptions {
  /**
   * Field mask used to specify the fields to be overwritten. Currently only
   * profile_bytes and labels fields are supported by UpdateProfile, so only
   * those fields can be specified in the mask. When no mask is provided, all
   * fields are overwritten.
   */
  updateMask?: string /* FieldMask */;
}

function serializeProjectsProfilesPatchOptions(data: any): ProjectsProfilesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
  };
}

function deserializeProjectsProfilesPatchOptions(data: any): ProjectsProfilesPatchOptions {
  return {
    ...data,
    updateMask: data["updateMask"] !== undefined ? data["updateMask"] : undefined,
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
