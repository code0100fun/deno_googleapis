// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * versionhistory.googleapis.com API Client for Deno
 * =================================================
 * 
 * Version History API - Prod
 * 
 * Docs: https://developers.chrome.com/versionhistory
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Version History API - Prod
 */
export class versionhistory {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://versionhistory.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Returns list of channels that are available for a given platform.
   *
   * @param parent Required. The platform, which owns this collection of channels. Format: {product}/platforms/{platform}
   */
  async platformsChannelsList(parent: string, opts: PlatformsChannelsListOptions = {}): Promise<ListChannelsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/channels`);
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
    return data as ListChannelsResponse;
  }

  /**
   * Returns list of version for the given platform/channel.
   *
   * @param parent Required. The channel, which owns this collection of versions. Format: {product}/platforms/{platform}/channels/{channel}
   */
  async platformsChannelsVersionsList(parent: string, opts: PlatformsChannelsVersionsListOptions = {}): Promise<ListVersionsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/versions`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
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
    return data as ListVersionsResponse;
  }

  /**
   * Returns list of releases of the given version.
   *
   * @param parent Required. The version, which owns this collection of releases. Format: {product}/platforms/{platform}/channels/{channel}/versions/{version}
   */
  async platformsChannelsVersionsReleasesList(parent: string, opts: PlatformsChannelsVersionsReleasesListOptions = {}): Promise<ListReleasesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/releases`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
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
    return deserializeListReleasesResponse(data);
  }

  /**
   * Returns list of platforms that are available for a given product. The
   * resource "product" has no resource name in its name.
   *
   * @param parent Required. The product, which owns this collection of platforms. Format: {product}
   */
  async platformsList(parent: string, opts: PlatformsListOptions = {}): Promise<ListPlatformsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/platforms`);
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
    return data as ListPlatformsResponse;
  }
}

/**
 * Each Channel is owned by a Platform and owns a collection of versions.
 * Possible Channels are listed in the Channel enum below. Not all Channels are
 * available for every Platform (e.g. CANARY does not exist for LINUX).
 */
export interface Channel {
  /**
   * Type of channel.
   */
  channelType?:  | "CHANNEL_TYPE_UNSPECIFIED" | "STABLE" | "BETA" | "DEV" | "CANARY" | "CANARY_ASAN" | "ALL" | "EXTENDED";
  /**
   * Channel name. Format is
   * "{product}/platforms/{platform}/channels/{channel}"
   */
  name?: string;
}

/**
 * Represents a time interval, encoded as a Timestamp start (inclusive) and a
 * Timestamp end (exclusive). The start must be less than or equal to the end.
 * When the start equals the end, the interval is empty (matches no time). When
 * both start and end are unspecified, the interval matches any time.
 */
export interface Interval {
  /**
   * Optional. Exclusive end of the interval. If specified, a Timestamp
   * matching this interval will have to be before the end.
   */
  endTime?: Date;
  /**
   * Optional. Inclusive start of the interval. If specified, a Timestamp
   * matching this interval will have to be the same or after the start.
   */
  startTime?: Date;
}

function serializeInterval(data: any): Interval {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? data["endTime"].toISOString() : undefined,
    startTime: data["startTime"] !== undefined ? data["startTime"].toISOString() : undefined,
  };
}

function deserializeInterval(data: any): Interval {
  return {
    ...data,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Response message for ListChannels.
 */
export interface ListChannelsResponse {
  /**
   * The list of channels.
   */
  channels?: Channel[];
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
}

/**
 * Response message for ListPlatforms.
 */
export interface ListPlatformsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The list of platforms.
   */
  platforms?: Platform[];
}

/**
 * Response message for ListReleases.
 */
export interface ListReleasesResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The list of releases.
   */
  releases?: Release[];
}

function serializeListReleasesResponse(data: any): ListReleasesResponse {
  return {
    ...data,
    releases: data["releases"] !== undefined ? data["releases"].map((item: any) => (serializeRelease(item))) : undefined,
  };
}

function deserializeListReleasesResponse(data: any): ListReleasesResponse {
  return {
    ...data,
    releases: data["releases"] !== undefined ? data["releases"].map((item: any) => (deserializeRelease(item))) : undefined,
  };
}

/**
 * Response message for ListVersions.
 */
export interface ListVersionsResponse {
  /**
   * A token, which can be sent as `page_token` to retrieve the next page. If
   * this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string;
  /**
   * The list of versions.
   */
  versions?: Version[];
}

/**
 * Each Platform is owned by a Product and owns a collection of channels.
 * Available platforms are listed in Platform enum below. Not all Channels are
 * available for every Platform (e.g. CANARY does not exist for LINUX).
 */
export interface Platform {
  /**
   * Platform name. Format is "{product}/platforms/{platform}"
   */
  name?: string;
  /**
   * Type of platform.
   */
  platformType?:  | "PLATFORM_TYPE_UNSPECIFIED" | "WIN" | "WIN64" | "MAC" | "LINUX" | "ANDROID" | "WEBVIEW" | "IOS" | "ALL" | "MAC_ARM64" | "LACROS" | "LACROS_ARM32" | "CHROMEOS" | "LACROS_ARM64" | "FUCHSIA";
}

/**
 * Additional options for versionhistory#platformsChannelsList.
 */
export interface PlatformsChannelsListOptions {
  /**
   * Optional. Optional limit on the number of channels to include in the
   * response. If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListChannels` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for versionhistory#platformsChannelsVersionsList.
 */
export interface PlatformsChannelsVersionsListOptions {
  /**
   * Optional. Filter string. Format is a comma separated list of All comma
   * separated filter clauses are conjoined with a logical "and". Valid
   * field_names are "version", "name", "platform", and "channel". Valid
   * operators are "<", "<=", "=", ">=", and ">". Channel comparison is done by
   * distance from stable. Ex) stable < beta, beta < dev, canary < canary_asan.
   * Version comparison is done numerically. If version is not entirely written,
   * the version will be appended with 0 in missing fields. Ex) version > 80
   * becoms version > 80.0.0.0 Name and platform are filtered by string
   * comparison. Ex) "...?filter=channel<=beta, version >= 80 Ex)
   * "...?filter=version > 80, version < 81
   */
  filter?: string;
  /**
   * Optional. Ordering string. Valid order_by strings are "version", "name",
   * "platform", and "channel". Optionally, you can append " desc" or " asc" to
   * specify the sorting order. Multiple order_by strings can be used in a comma
   * separated list. Ordering by channel will sort by distance from the stable
   * channel (not alphabetically). A list of channels sorted in this order is:
   * stable, beta, dev, canary, and canary_asan. Sorting by name may cause
   * unexpected behaviour as it is a naive string sort. For example, 1.0.0.8
   * will be before 1.0.0.10 in descending order. If order_by is not specified
   * the response will be sorted by version in descending order. Ex)
   * "...?order_by=version asc" Ex) "...?order_by=platform desc, channel,
   * version"
   */
  orderBy?: string;
  /**
   * Optional. Optional limit on the number of versions to include in the
   * response. If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListVersions` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for versionhistory#platformsChannelsVersionsReleasesList.
 */
export interface PlatformsChannelsVersionsReleasesListOptions {
  /**
   * Optional. Filter string. Format is a comma separated list of All comma
   * separated filter clauses are conjoined with a logical "and". Valid
   * field_names are "version", "name", "platform", "channel", "fraction"
   * "starttime", and "endtime". Valid operators are "<", "<=", "=", ">=", and
   * ">". Channel comparison is done by distance from stable. must be a valid
   * channel when filtering by channel. Ex) stable < beta, beta < dev, canary <
   * canary_asan. Version comparison is done numerically. Ex) 1.0.0.8 <
   * 1.0.0.10. If version is not entirely written, the version will be appended
   * with 0 for the missing fields. Ex) version > 80 becoms version > 80.0.0.0
   * When filtering by starttime or endtime, string must be in RFC 3339 date
   * string format. Name and platform are filtered by string comparison. Ex)
   * "...?filter=channel<=beta, version >= 80 Ex) "...?filter=version > 80,
   * version < 81 Ex) "...?filter=starttime>2020-01-01T00:00:00Z
   */
  filter?: string;
  /**
   * Optional. Ordering string. Valid order_by strings are "version", "name",
   * "starttime", "endtime", "platform", "channel", and "fraction". Optionally,
   * you can append "desc" or "asc" to specify the sorting order. Multiple
   * order_by strings can be used in a comma separated list. Ordering by channel
   * will sort by distance from the stable channel (not alphabetically). A list
   * of channels sorted in this order is: stable, beta, dev, canary, and
   * canary_asan. Sorting by name may cause unexpected behaviour as it is a
   * naive string sort. For example, 1.0.0.8 will be before 1.0.0.10 in
   * descending order. If order_by is not specified the response will be sorted
   * by starttime in descending order. Ex) "...?order_by=starttime asc" Ex)
   * "...?order_by=platform desc, channel, startime desc"
   */
  orderBy?: string;
  /**
   * Optional. Optional limit on the number of releases to include in the
   * response. If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListReleases` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * Additional options for versionhistory#platformsList.
 */
export interface PlatformsListOptions {
  /**
   * Optional. Optional limit on the number of channels to include in the
   * response. If unspecified, the server will pick an appropriate default.
   */
  pageSize?: number;
  /**
   * Optional. A page token, received from a previous `ListChannels` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string;
}

/**
 * A Release is owned by a Version. A Release contains information about the
 * release(s) of its parent version. This includes when the release began and
 * ended, as well as what percentage it was released at. If the version is
 * released again, or if the serving percentage changes, it will create another
 * release under the version.
 */
export interface Release {
  /**
   * Rollout fraction. This fraction indicates the fraction of people that
   * should receive this version in this release. If the fraction is not
   * specified in ReleaseManager, the API will assume fraction is 1.
   */
  fraction?: number;
  /**
   * Rollout fraction group. Only fractions with the same fraction_group are
   * statistically comparable: there may be non-fractional differences between
   * different fraction groups.
   */
  fractionGroup?: bigint;
  /**
   * Release name. Format is
   * "{product}/platforms/{platform}/channels/{channel}/versions/{version}/releases/{release}"
   */
  name?: string;
  /**
   * Timestamp interval of when the release was live. If end_time is
   * unspecified, the release is currently live.
   */
  serving?: Interval;
  /**
   * String containing just the version number. e.g. "84.0.4147.38"
   */
  version?: string;
}

function serializeRelease(data: any): Release {
  return {
    ...data,
    fractionGroup: data["fractionGroup"] !== undefined ? String(data["fractionGroup"]) : undefined,
    serving: data["serving"] !== undefined ? serializeInterval(data["serving"]) : undefined,
  };
}

function deserializeRelease(data: any): Release {
  return {
    ...data,
    fractionGroup: data["fractionGroup"] !== undefined ? BigInt(data["fractionGroup"]) : undefined,
    serving: data["serving"] !== undefined ? deserializeInterval(data["serving"]) : undefined,
  };
}

/**
 * Each Version is owned by a Channel. A Version only displays the Version
 * number (e.g. 84.0.4147.38). A Version owns a collection of releases.
 */
export interface Version {
  /**
   * Version name. Format is
   * "{product}/platforms/{platform}/channels/{channel}/versions/{version}" e.g.
   * "chrome/platforms/win/channels/beta/versions/84.0.4147.38"
   */
  name?: string;
  /**
   * String containing just the version number. e.g. "84.0.4147.38"
   */
  version?: string;
}