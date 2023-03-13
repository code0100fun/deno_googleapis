// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Policy Analyzer API Client for Deno
 * ===================================
 * 
 * 
 * 
 * Docs: https://www.google.com
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

export class PolicyAnalyzer {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://policyanalyzer.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Queries policy activities on Google Cloud resources.
   *
   * @param parent Required. The container resource on which to execute the request. Acceptable formats: `projects/[PROJECT_ID|PROJECT_NUMBER]/locations/[LOCATION]/activityTypes/[ACTIVITY_TYPE]` LOCATION here refers to Google Cloud Locations: https://cloud.google.com/about/locations/
   */
  async projectsLocationsActivityTypesActivitiesQuery(parent: string, opts: ProjectsLocationsActivityTypesActivitiesQueryOptions = {}): Promise<GoogleCloudPolicyanalyzerV1QueryActivityResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/activities:query`);
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
    return deserializeGoogleCloudPolicyanalyzerV1QueryActivityResponse(data);
  }
}

export interface GoogleCloudPolicyanalyzerV1Activity {
  /**
   * A struct of custom fields to explain the activity.
   */
  activity?: {
    [key: string]: any
  };
  /**
   * The type of the activity.
   */
  activityType?: string;
  /**
   * The full resource name that identifies the resource. For examples of full
   * resource names for Google Cloud services, see
   * https://cloud.google.com/iam/help/troubleshooter/full-resource-names.
   */
  fullResourceName?: string;
  /**
   * The data observation period to build the activity.
   */
  observationPeriod?: GoogleCloudPolicyanalyzerV1ObservationPeriod;
}

function serializeGoogleCloudPolicyanalyzerV1Activity(data: any): GoogleCloudPolicyanalyzerV1Activity {
  return {
    ...data,
    observationPeriod: data["observationPeriod"] !== undefined ? serializeGoogleCloudPolicyanalyzerV1ObservationPeriod(data["observationPeriod"]) : undefined,
  };
}

function deserializeGoogleCloudPolicyanalyzerV1Activity(data: any): GoogleCloudPolicyanalyzerV1Activity {
  return {
    ...data,
    observationPeriod: data["observationPeriod"] !== undefined ? deserializeGoogleCloudPolicyanalyzerV1ObservationPeriod(data["observationPeriod"]) : undefined,
  };
}

/**
 * Represents data observation period.
 */
export interface GoogleCloudPolicyanalyzerV1ObservationPeriod {
  /**
   * The observation end time. The time in this timestamp is always
   * `07:00:00Z`.
   */
  endTime?: Date;
  /**
   * The observation start time. The time in this timestamp is always
   * `07:00:00Z`.
   */
  startTime?: Date;
}

function serializeGoogleCloudPolicyanalyzerV1ObservationPeriod(data: any): GoogleCloudPolicyanalyzerV1ObservationPeriod {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeGoogleCloudPolicyanalyzerV1ObservationPeriod(data: any): GoogleCloudPolicyanalyzerV1ObservationPeriod {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Response to the `QueryActivity` method.
 */
export interface GoogleCloudPolicyanalyzerV1QueryActivityResponse {
  /**
   * The set of activities that match the filter included in the request.
   */
  activities?: GoogleCloudPolicyanalyzerV1Activity[];
  /**
   * If there might be more results than those appearing in this response, then
   * `nextPageToken` is included. To get the next set of results, call this
   * method again using the value of `nextPageToken` as `pageToken`.
   */
  nextPageToken?: string;
}

function serializeGoogleCloudPolicyanalyzerV1QueryActivityResponse(data: any): GoogleCloudPolicyanalyzerV1QueryActivityResponse {
  return {
    ...data,
    activities: data["activities"] !== undefined ? data["activities"].map((item: any) => (serializeGoogleCloudPolicyanalyzerV1Activity(item))) : undefined,
  };
}

function deserializeGoogleCloudPolicyanalyzerV1QueryActivityResponse(data: any): GoogleCloudPolicyanalyzerV1QueryActivityResponse {
  return {
    ...data,
    activities: data["activities"] !== undefined ? data["activities"].map((item: any) => (deserializeGoogleCloudPolicyanalyzerV1Activity(item))) : undefined,
  };
}

/**
 * Additional options for
 * PolicyAnalyzer#projectsLocationsActivityTypesActivitiesQuery.
 */
export interface ProjectsLocationsActivityTypesActivitiesQueryOptions {
  /**
   * Optional. Filter expression to restrict the activities returned. For
   * serviceAccountLastAuthentication activities, supported filters are: -
   * `activities.full_resource_name {=} [STRING]` - `activities.fullResourceName
   * {=} [STRING]` where `[STRING]` is the full resource name of the service
   * account. For serviceAccountKeyLastAuthentication activities, supported
   * filters are: - `activities.full_resource_name {=} [STRING]` -
   * `activities.fullResourceName {=} [STRING]` where `[STRING]` is the full
   * resource name of the service account key.
   */
  filter?: string;
  /**
   * Optional. The maximum number of results to return from this request. Max
   * limit is 1000. Non-positive values are ignored. The presence of
   * `nextPageToken` in the response indicates that more results might be
   * available.
   */
  pageSize?: number;
  /**
   * Optional. If present, then retrieve the next batch of results from the
   * preceding call to this method. `pageToken` must be the value of
   * `nextPageToken` from the previous response. The values of other method
   * parameters should be identical to those in the previous call.
   */
  pageToken?: string;
}